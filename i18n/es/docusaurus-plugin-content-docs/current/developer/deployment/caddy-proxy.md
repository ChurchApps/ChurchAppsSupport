---
title: "Proxy Caddy para dominios personalizados"
---

# Proxy Caddy para dominios personalizados

<div class="article-intro">

Los dominios personalizados de las iglesias (`mychurch.org` → el sitio web B1 de la iglesia) terminan en una única caja Windows EC2 que ejecuta Caddy. La caja administra los certificados TLS, resuelve cada dominio a su sitio `{sub}.b1.church` y reenvía las solicitudes con un encabezado Host reescrito. Toda su configuración se compone de dos archivos — un `Caddyfile` estático y un `hosts.map` que se actualiza desde la API de Membership — así que sobrevive a los reinicios sin estado en tiempo de ejecución. Esta página cubre cómo se construye la caja desde cero, cómo se opera y las trampas probadas en campo que afectarán a quien la reconstruya.

</div>

Para saber cómo se resuelve una solicitud a una iglesia/sitio una vez que llega a B1App, consulte [Enrutamiento de sitios web y multisitio](../architecture/websites).

## Componentes

| Componente | Descripción |
|---|---|
| Instancia EC2 | Windows Server; IP elástica **`3.23.251.61`** (incorporada en el DNS de las iglesias de todo el mundo; la IP es permanente, las instancias son desechables) |
| `C:\caddy\caddy.exe` | Compilación **personalizada** de Caddy con el módulo de almacenamiento `techknowlogick/certmagic-s3`: el Caddy estándar no puede leer el almacén de certificados |
| `C:\caddy\Caddyfile` | Toda la configuración del proxy: TLS bajo demanda, `map` de host→upstream, redirecciones de www→apex, `:80`→https |
| `C:\caddy\hosts.map` | Una línea `{domain} {sub}.b1.church` por dominio enrutable, importada en el bloque `map` del Caddyfile |
| `sync-hostmap.ps1` + tarea `CaddyHostmapSync` | Tarea programada (cada 5 min y al arrancar, como SYSTEM) que actualiza `hosts.map` desde la API y recarga Caddy de forma controlada solo cuando hay cambios |
| Servicio de Windows `caddy` (envoltorio WinSW) | Ejecuta `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile`; reinicio automático ante fallos. Caddy no es compatible con SCM, por lo que se requiere un envoltorio |
| Bucket de S3 `churchapps-caddy-certs` | Almacenamiento compartido de certificados (`region us-east-2`, prefijo `certs`): los certificados sobreviven a la reconstrucción de instancias |
| Rol de IAM `CaddyRole` | Concede a la instancia acceso a S3; Caddy usa la cadena de credenciales predeterminada de AWS (sin claves en la configuración) |

## Los dos endpoints de la API de los que depende la caja

Ambos están en la API de Membership. `authorize` es anónimo; `hostmap` requiere el encabezado `x-internal-key: <INTERNAL_API_KEY>` desde la PR 67 de la Api (2026-08-16): `sync-hostmap.ps1` lo lee de `C:\caddy\internal-key.txt`:

| Endpoint | Función |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | El **gate `ask` de TLS bajo demanda** de Caddy: `200 {"authorized":true}` cuando el host (o, para un host `www.`, su apex) es una fila en `domains`; `404` en caso contrario. Es el control contra abusos: Caddy no emitirá un certificado para un host que este endpoint rechace |
| `GET /membership/domains/hostmap` | Requiere `x-internal-key` (o un JWT de administrador del servidor). `text/plain`, líneas `{domain} {sub}.b1.church` ordenadas y sin duplicados (consciente del sitio: un dominio asignado a un sitio secundario apunta al subdominio de ese sitio). Origen del `map` |

## Flujo de la solicitud

1. El navegador resuelve `mychurch.org` → `3.23.251.61` (registro `A` del apex, o `CNAME proxy.b1.church`).
2. Caddy termina TLS. Si el certificado está disponible en S3 → lo sirve; si el SNI es desconocido → se consulta `authorize`; 200 → se emite bajo demanda con Let's Encrypt; 404 → **se rechaza el handshake** (sin certificado, sin respuesta: un host desconocido recibe un rechazo TLS, no un error HTTP).
3. El `map` resuelve el Host a `{sub}.b1.church`; `www.{apex}` recibe un 302 al apex; un host autorizado pero sin mapear (un dominio nuevo dentro de la ventana de sincronización de ≤5 minutos) recibe un 404 limpio.
4. `reverse_proxy` se conecta a `{sub}.b1.church:443` con SNI y Host reescritos al upstream, de modo que el edge de Vercel sirve el sitio de B1App.
   Caddy además envía el dominio original del visitante como `X-Church-Host` (Vercel sobrescribe `X-Forwarded-Host` con el Host reescrito). El middleware de B1App lo acepta solo cuando `/domains/public/lookup/{host}` lo asigna al mismo `{sub}` que el host de la solicitud, y luego lo expone como `x-public-host` para el encabezado `Link` canónico, `robots.txt` y `sitemap.xml`; un `x-public-host` enviado por el cliente siempre se elimina. El `ChurchJsonLd` de schema.org sigue usando la URL de `b1.church` (leer encabezados allí haría dinámicas las páginas).
5. El puerto 80 atiende los desafíos ACME HTTP-01 y redirige con 308 todo lo demás a https.

Propagación de nuevos dominios: un dominio guardado en B1Admin se puede enrutar en unos 5 minutos (la tarea de sincronización); su certificado se crea en el primer acceso HTTPS.

## Construir la caja desde cero

Condensado a partir del procedimiento probado en campo (el paso a paso completo con comandos listos para copiar está en el espacio de trabajo de operaciones, no en este repositorio). Primero los requisitos previos: sin ellos, la construcción no funciona:

1. **IAM**: adjunte `CaddyRole` (acceso a S3 al bucket de certificados) a la instancia. Verifique mediante IMDSv2 desde la caja: tenga en cuenta que un GET simple a IMDS que devuelve 401 solo significa que IMDSv2 está forzado, no que "no hay rol".
2. **Salud de la API**: `authorize` debe devolver 404 para un dominio falso, y `hostmap` (con el encabezado `x-internal-key`) debe devolver 200 antes de cualquier otra cosa.

Luego:

3. **Binario**: descargue una compilación personalizada desde el servicio de compilación de Caddy: `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 MB frente a ~45 MB del estándar; v2.11.4 al momento de escribir). La elección del módulo importa: `techknowlogick/certmagic-s3` usa las claves `bucket`/`region`/`prefix`, que coinciden con la disposición actual de los certificados; la bifurcación `ss098` usa `host`/`endpoint` y **no** encontrará los certificados existentes.
4. **Archivos**: `Caddyfile` + `sync-hostmap.ps1` + `internal-key.txt` (`INTERNAL_API_KEY` de producción, una línea) en `C:\caddy\`; siembre el mapa una vez con `sync-hostmap.ps1 -NoReload`.
5. **Controles antes del primer arranque**: `caddy list-modules` debe mostrar el módulo de almacenamiento s3; `caddy adapt` debe emitir `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` en su bloque de almacenamiento; `caddy validate` debe pasar.
6. **Servicio**: instálelo mediante WinSW (id de servicio `caddy`, reinicio automático ante fallos, registros rotativos). Se ejecuta como LocalSystem, que alcanza IMDS para las credenciales del rol.
7. **Tarea de sincronización**: registre `CaddyHostmapSync` (SYSTEM, cada 5 min y al arrancar, límite de ejecución de 4 minutos).
8. **Verificación previa al corte** forzando la resolución de los dominios a `127.0.0.1` con `curl --resolve` (la caja no tiene tráfico real hasta que se mueva la IP elástica): un dominio existente debe servir con un certificado válido conservado; `www.` debe recibir un 302; un host desconocido debe recibir rechazo TLS; y `Restart-Service caddy` debe volver a servir **sin re-cebado manual**. Esa prueba de reinicio es precisamente el objetivo del diseño estático.
9. **Salida en producción**: reasocie la IP elástica `3.23.251.61` a la nueva instancia. El DNS de las iglesias nunca cambia.

## Trampas probadas en campo (aprendidas por las malas: no las repita)

| Trampa | Síntoma | Solución |
|---|---|---|
| `tls_server_name {vars.upstream}` en el transporte de reverse_proxy | Cada dominio proxied devuelve 502: los marcadores del mapa se resuelven **vacíos en el momento de la conexión TLS** ("either ServerName or InsecureSkipVerify must be specified") | Use el marcador nativo del transporte: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Claves duplicadas o líneas basura en `hosts.map` | El manejador `map` de Caddy **falla de forma grave ante una clave de entrada duplicada**: una sola línea mala puede tumbar toda la configuración | El script de sincronización normaliza los espacios, descarta las líneas mal formadas (rechazando todo solo si más del 20% son malas), elimina duplicados conservando el primero, y escribe UTF-8 **sin BOM** (un BOM corrompe la primera clave del mapa). La API además filtra las filas de dominio vacías o con espacios en el origen |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | El registro de la tarea **falla en silencio** (XML fuera de rango, error no terminante) | Construya la repetición como una instancia CIM `MSFT_TaskRepetitionPattern` con `Interval = "PT5M"` y sin duración; agregue un `ExecutionTimeLimit` de 4 minutos (la primera ejecución como SYSTEM puede quedarse colgada en una consulta fría de TLS/CRL) |

:::warning
La API de administración se enlaza solo a `localhost:2019`. El modo heredado en tiempo de ejecución la exponía de forma remota para que la API de Membership pudiera enviar configuraciones de rutas; el diseño estático no necesita envíos remotos, y la superficie más pequeña es deliberada. `caddy reload` (ejecutado localmente por el script de sincronización) es el único consumidor de la API de administración.
:::

:::info Empuje heredado en tiempo de ejecución
`CaddyHelper` en la API (y los endpoints `/membership/domains/caddy` + `/caddy/init`) siguen existiendo como ruta de reversión al antiguo modo configurado en tiempo de ejecución. Están programados para eliminarse cuando la caja estática haya sido estable durante un par de semanas; después de eso, `authorize` + `hostmap` son los únicos puntos de integración.
:::

## Operaciones

- **Registros**: registros rotativos de WinSW en `C:\caddy\` (stdout/stderr del servicio; los errores del reverse-proxy aparecen en `caddy-service.err.log`); el historial de sincronización está en `C:\caddy\sync-hostmap.log`.
- **Forzar una actualización del mapa**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Cambio de configuración**: edite `C:\caddy\Caddyfile`, y luego ejecute `caddy validate` + `caddy reload` (o `Restart-Service caddy`; los reinicios son seguros por diseño).
- **La eliminación masiva de dominios** activa a propósito la protección de reducción del script de sincronización; mueva el `hosts.map` anterior a otro lugar y vuelva a ejecutar la tarea para aceptar una reducción grande intencional.
- **Las instrucciones de DNS para las iglesias no cambian nunca**: `A` del apex `3.23.251.61` o `CNAME proxy.b1.church`.

## Páginas relacionadas

- [Enrutamiento de sitios web y multisitio](../architecture/websites) — cómo la solicitud reenviada se resuelve a una iglesia/sitio en B1App
- [Despliegue de la API](./apis) — despliegue de la API de Membership que sirve `authorize`/`hostmap`
