---
title: "Proxy de dominio personalizado con Caddy"
description: "Compile y ejecute el proxy inverso Caddy que sirve dominios personalizados de iglesias para los sitios de B1.church, con certificados TLS, asignación de hosts y problemas conocidos."
---

# Proxy de dominio personalizado con Caddy

<div class="article-intro">

Los dominios personalizados de las iglesias (`miiglesia.org` → el sitio web de B1 de la iglesia) llegan a una sola máquina EC2 de Windows que ejecuta Caddy. La máquina administra los certificados TLS, resuelve cada dominio a su sitio `{sub}.b1.church` y hace proxy inverso con un encabezado Host reescrito. Toda su configuración son dos archivos: un `Caddyfile` estático y un `hosts.map` que se actualiza desde la API de Membership; por eso sobrevive a los reinicios sin estado en tiempo de ejecución. Esta página explica cómo se construye la máquina desde cero, cómo opera y las trampas probadas en la práctica que afectarán a cualquiera que la reconstruya.

</div>

Para saber cómo una solicitud se resuelve en una iglesia o sitio una vez que llega a B1App, consulte [Enrutamiento de sitios web y multisitio](../architecture/websites.md).

## Componentes

| Elemento | Qué es |
|---|---|
| Instancia EC2 | Windows Server; IP elástica **`3.23.251.61`** (incluida en el DNS de las iglesias en todo el mundo: la IP es permanente, las instancias son desechables) |
| `C:\caddy\caddy.exe` | Compilación **personalizada** de Caddy con el módulo de almacenamiento `techknowlogick/certmagic-s3`; Caddy estándar no puede leer el almacén de certificados |
| `C:\caddy\Caddyfile` | Toda la configuración del proxy: TLS bajo demanda, `map` de host a upstream, redirecciones de www al dominio raíz, `:80` a https |
| `C:\caddy\hosts.map` | Una línea `{dominio} {sub}.b1.church` por cada dominio enrutable, importada en el bloque `map` del Caddyfile |
| `sync-hostmap.ps1` + tarea `CaddyHostmapSync` | Tarea programada (cada 5 minutos y al arrancar, como SYSTEM) que actualiza `hosts.map` desde la API y recarga Caddy de forma controlada solo si hubo cambios |
| Servicio de Windows `caddy` (envoltorio WinSW) | Ejecuta `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile`; reinicio automático si falla. Caddy no es compatible con el SCM de Windows, por eso se necesita un envoltorio |
| Bucket de S3 `churchapps-caddy-certs` | Almacenamiento compartido de certificados (`region us-east-2`, prefijo `certs`); los certificados sobreviven a la reconstrucción de instancias |
| Rol de IAM `CaddyRole` | Concede acceso a S3 a la instancia; Caddy usa la cadena de credenciales predeterminada de AWS (sin claves en la configuración) |

## Los dos endpoints de la API de los que depende la máquina

Ambos están en la API de Membership. `authorize` es anónimo; `hostmap` requiere desde Api PR #67 (2026-08-16) el encabezado `x-internal-key: <INTERNAL_API_KEY>`; `sync-hostmap.ps1` lo lee de `C:\caddy\internal-key.txt`:

| Endpoint | Función |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Compuerta `ask` de **TLS bajo demanda** de Caddy: `200 {"authorized":true}` cuando el host (o, para un host `www.`, su dominio raíz) es una fila de `domains`; `404` en otro caso. Es el control contra el abuso: Caddy no emitirá un certificado para un host que este endpoint rechace |
| `GET /membership/domains/hostmap` | Requiere `x-internal-key` (o un JWT de administrador de servidor). `text/plain`, líneas `{domain} {sub}.b1.church` ordenadas y sin duplicados (consciente del sitio: un dominio asignado a un sitio secundario apunta al subdominio de ese sitio). Es la fuente del `map` |

## Flujo de una solicitud

1. El navegador resuelve `miiglesia.org` → `3.23.251.61` (registro `A` del dominio raíz, o `CNAME proxy.b1.church`).
2. Caddy termina TLS. Si el certificado está en S3, lo sirve; si el SNI es desconocido, pregunta a `authorize`; 200 → emite el certificado bajo demanda con Let's Encrypt; 404 → **el handshake se rechaza** (sin certificado y sin respuesta: un host desconocido recibe un rechazo de TLS, no un error HTTP).
3. El `map` resuelve el Host a `{sub}.b1.church`; `www.{dominio}` recibe un 302 al dominio raíz; un host autorizado pero sin mapeo (un dominio recién creado dentro de la ventana de sincronización de ≤5 minutos) recibe un 404 limpio.
4. `reverse_proxy` se conecta a `{sub}.b1.church:443` con SNI y Host reescritos al upstream, de modo que el edge de Vercel sirve el sitio de B1App.
   Caddy también envía el dominio original del visitante como `X-Church-Host` (Vercel sobrescribe `X-Forwarded-Host` con el Host reescrito). El middleware de B1App solo lo acepta cuando `/domains/public/lookup/{host}` lo asigna al mismo `{sub}` que el host de la solicitud, y luego lo expone como `x-public-host` para el encabezado canónico `Link`, `robots.txt` y `sitemap.xml`; un `x-public-host` enviado por el cliente siempre se elimina. El `ChurchJsonLd` de Schema.org sigue usando la URL de `b1.church` (leer encabezados ahí haría dinámicas las páginas).
5. El puerto 80 atiende los desafíos ACME HTTP-01 y redirige con 308 todo lo demás a https.

Propagación de dominios nuevos: un dominio guardado en B1Admin se vuelve enrutable en unos 5 minutos (la tarea de sincronización); su certificado se emite en la primera visita HTTPS.

## Construir la máquina desde cero

Resumen del procedimiento probado en la práctica (el paso a paso completo con comandos listos para copiar está en el espacio de trabajo de operaciones, no en este repositorio). Los requisitos previos van primero; sin ellos la construcción no funciona:

1. **IAM**: asocie `CaddyRole` (acceso a S3 para el bucket de certificados) a la instancia. Verifique vía IMDSv2 desde la máquina: tenga en cuenta que una solicitud simple a IMDS que devuelve 401 solo significa que IMDSv2 está forzado, no que "no hay rol".
2. **Salud de la API**: `authorize` debe devolver 404 para un dominio falso, y `hostmap` (con el encabezado `x-internal-key`) debe devolver 200 antes de cualquier otro paso.

Luego:

3. **Binario**: descargue una compilación personalizada desde el servicio de compilación de Caddy: `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 MB frente a ~45 MB de la versión estándar; v2.11.4 al momento de escribir). La elección del módulo importa: `techknowlogick/certmagic-s3` usa las claves `bucket`/`region`/`prefix`, que coinciden con el diseño actual de certificados; la bifurcación `ss098` usa `host`/`endpoint` y **no** encontrará los certificados existentes.
4. **Archivos**: `Caddyfile` + `sync-hostmap.ps1` + `internal-key.txt` (`INTERNAL_API_KEY` de producción, una línea) en `C:\caddy\`; cargue el mapa una vez con `sync-hostmap.ps1 -NoReload`.
5. **Controles antes del primer arranque**: `caddy list-modules` debe mostrar el módulo de almacenamiento s3; `caddy adapt` debe emitir `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` en su bloque de almacenamiento; `caddy validate` debe pasar.
6. **Servicio**: instálelo con WinSW (id de servicio `caddy`, reinicio automático ante fallos, registros rotativos). Se ejecuta como LocalSystem, que llega a IMDS para las credenciales del rol.
7. **Tarea de sincronización**: registre `CaddyHostmapSync` (SYSTEM, cada 5 minutos y al iniciar, con límite de ejecución de 4 minutos).
8. **Verifique antes del corte**: fuerce la resolución de los dominios a `127.0.0.1` con `curl --resolve` (la máquina no tiene tráfico real hasta que se mueva la IP elástica). Un dominio existente debe servir con un certificado válido heredado; `www.` debe devolver 302; un host desconocido debe recibir rechazo de TLS; y `Restart-Service caddy` debe volver a servir **sin necesidad de volver a cargar nada manualmente**. Esa prueba de reinicio es el objetivo completo del diseño estático.
9. **Puesta en producción**: reasocie la IP elástica `3.23.251.61` a la nueva instancia. El DNS de las iglesias nunca cambia.

## Trampas probadas en la práctica (aprendidas por las malas; no las repita)

| Trampa | Síntoma | Solución |
|---|---|---|
| `tls_server_name {vars.upstream}` en el transporte de reverse_proxy | Todos los dominios con proxy devuelven 502: los marcadores del mapa se resuelven **vacíos en el momento de conectar TLS** ("either ServerName or InsecureSkipVerify must be specified") | Use el marcador nativo del transporte: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Claves duplicadas o líneas basura en `hosts.map` | El manejador `map` de Caddy **falla con error si la clave de entrada está duplicada**; una sola línea mala puede tumbar toda la configuración | El script de sincronización normaliza los espacios, descarta las líneas mal formadas (rechazando todo solo si más del 20% son malas), elimina duplicados conservando el primero y escribe UTF-8 **sin BOM** (un BOM corrompe la primera clave del mapa). La API también filtra en origen las filas de dominio vacías o con espacios |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | El registro de la tarea **falla en silencio** (XML fuera de rango, error no terminante) | Construya la repetición como una instancia CIM de `MSFT_TaskRepetitionPattern` con `Interval = "PT5M"` y sin duración; agregue un `ExecutionTimeLimit` de 4 minutos (la primera ejecución como SYSTEM puede colgarse en una búsqueda fría de TLS/CRL) |

:::warning
La API de administración solo escucha en `localhost:2019`. El modo de ejecución heredado la exponía de forma remota para que la API de Membership enviara configuraciones de rutas; el diseño estático no necesita envíos remotos, y la superficie más pequeña es deliberada. `caddy reload` (ejecutado localmente por el script de sincronización) es el único consumidor de la API de administración.
:::

:::info Envío heredado en tiempo de ejecución
`CaddyHelper` en la API (y los endpoints `/membership/domains/caddy` + `/caddy/init`) todavía existen como ruta de reversión hacia el modo antiguo configurado en tiempo de ejecución. Están programados para eliminarse cuando la máquina estática lleve un par de semanas estable; después de eso, `authorize` + `hostmap` serán los únicos puntos de integración.
:::

## Operación

- **Registros**: registros rotativos de WinSW en `C:\caddy\` (stdout/err del servicio; los errores del proxy inverso caen en `caddy-service.err.log`); historial de sincronización en `C:\caddy\sync-hostmap.log`.
- **Forzar la actualización del mapa**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Cambio de configuración**: edite `C:\caddy\Caddyfile` y luego ejecute `caddy validate` + `caddy reload` (o `Restart-Service caddy`; los reinicios son seguros por diseño).
- **Eliminación masiva de dominios**: activa a propósito la protección de reducción del script de sincronización; mueva el `hosts.map` anterior a un lado y vuelva a ejecutar la tarea para aceptar una reducción grande e intencional.
- **Las instrucciones de DNS para las iglesias no cambian nunca**: `A` del dominio raíz a `3.23.251.61` o `CNAME proxy.b1.church`.

## Páginas relacionadas

- [Enrutamiento de sitios web y multisitio](../architecture/websites.md): cómo la solicitud con proxy se resuelve en una iglesia o sitio dentro de B1App
- [Despliegue de la API](./apis.md): despliegue de la API de Membership que atiende `authorize`/`hostmap`
