---
title: "Proxy de Dominio Personalizado de Caddy"
---

# Proxy de Dominio Personalizado de Caddy

<div class="article-intro">

Los dominios de iglesia personalizados (`mychurch.org` → el sitio web B1 de la iglesia) terminan en una única caja Windows EC2 ejecutando Caddy. La caja posee los certificados TLS, resuelve cada dominio en su sitio `{sub}.b1.church`, y hace proxy inverso con un encabezado Host reescrito. Su configuración entera son dos archivos — un `Caddyfile` estático y un `hosts.map` actualizado desde la Api de Membresía — para que sobreviva reinicios con cero estado de ejecución. Esta página cubre cómo se construye la caja desde cero, cómo opera, y los gotchas comprobados en campo que picarán a cualquiera que la reconstruya.

</div>

Para cómo se resuelve una solicitud a una iglesia/sitio una vez que llega a B1App, ver [Enrutamiento de Sitios Web y Multi-Sitio](../architecture/websites).

## Componentes

| Pieza | Qué es |
|---|---|
| Instancia EC2 | Windows Server; IP Elástica **`3.23.251.61`** (incorporada en DNS de iglesia en todo el mundo — la IP es permanente, las instancias son desechables) |
| `C:\caddy\caddy.exe` | Compilación **Personalizada** de Caddy con el módulo de almacenamiento `techknowlogick/certmagic-s3` — Caddy de stock no puede leer el almacén de certs |
| `C:\caddy\Caddyfile` | La configuración de proxy entera: TLS bajo demanda, mapa de host→corriente ascendente `map`, redirecciones www→ápice, `:80`→https |
| `C:\caddy\hosts.map` | Una línea `{domain} {sub}.b1.church` por dominio enrutable, importada al bloque `map` del Caddyfile |
| `sync-hostmap.ps1` + tarea `CaddyHostmapSync` | Tarea programada (cada 5 min + al arrancar, como SYSTEM) actualiza `hosts.map` desde la Api y recarga Caddy elegantemente solo en cambio |
| Servicio Windows `caddy` (envoltura WinSW) | Ejecuta `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile`; reinicio automático en fallo. Caddy no es consciente de SCM, así que se requiere un envoltorio |
| Cubeta S3 `churchapps-caddy-certs` | Almacenamiento de certificados compartido (`región us-east-2`, prefijo `certs`) — los certs sobreviven reconstrucciones de instancia |
| Rol IAM `CaddyRole` | Otorga acceso S3 a la instancia; Caddy usa la cadena de credencial predeterminada de AWS (sin claves en configuración) |

## Los dos extremos de Api de los que la caja depende

Ambos son anónimos, en la Api de Membresía:

| Extremo | Rol |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Puerta **TLS bajo demanda `ask`** de Caddy: `200 {"authorized":true}` cuando el host (o, para un host `www.`, su ápice) es una fila en `domains`; `404` de lo contrario. Este es el control de abuso — Caddy no emitirá un certificado para un host que este extremo rechaza |
| `GET /membership/domains/hostmap` | `text/plain`, líneas `{domain} {sub}.b1.church` ordenadas, deduplicadas (site-consciente: un dominio asignado a un sitio secundario marca ese subdominio del sitio). Fuente del `map` |

## Flujo de Solicitud

1. Navegador resuelve `mychurch.org` → `3.23.251.61` (registro `A` de ápice, o `CNAME proxy.b1.church`).
2. Caddy termina TLS. Certificado a mano en S3 → servir; SNI desconocido → `authorize` es preguntado; 200 → emitir bajo demanda vía Let's Encrypt; 404 → **el apretón es rechazado** (sin certificado, sin respuesta — un host desconocido obtiene TLS-rechazado, no un error HTTP).
3. El `map` resuelve el Host en `{sub}.b1.church`; `www.{apex}` obtiene un 302 al ápice; un host autorizado pero aún no mapeado (un dominio nuevo dentro de la ventana de sincronización ≤5 minutos) obtiene un 404 limpio.
4. `reverse_proxy` marca `{sub}.b1.church:443` con SNI y Host reescritos en la corriente ascendente, para que el borde de Vercel sirva el sitio B1App.
5. El puerto 80 pasa desafíos HTTP-01 de ACME y 308-redirige todo lo demás a https.

Propagación de dominio nuevo: un dominio guardado en B1Admin se vuelve enrutable dentro de ~5 minutos (la tarea de sincronización); su certificado se acuña en el primer golpe HTTPS.

## Construir la Caja Desde Cero

Condensado del procedimiento comprobado en campo (el paso a paso completo con comandos de copiar-pegar vive en el espacio de trabajo de ops, no en este repositorio). Primero los requisitos previos — la compilación está muerta sin ellos:

1. **IAM**: adjunta `CaddyRole` (acceso S3 al cubeta de certs) a la instancia. Verifica a través de IMDSv2 desde la caja — tenga en cuenta un GET de IMDS desnudo devolviendo 401 solo significa que IMDSv2 se aplica, no "sin rol".
2. **Salud de Api**: `authorize` debe devolver 404 para un dominio falso y `hostmap` debe devolver 200 antes de nada más.

Luego:

3. **Binario**: descarga una compilación personalizada desde el servicio de compilación de Caddy — `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 MB vs ~45 MB de stock; v2.11.4 al momento de escribir). La opción de módulo importa: `techknowlogick/certmagic-s3` usa claves `bucket`/`region`/`prefix` que coinciden con el diseño de cert existente; el tenedor `ss098` usa `host`/`endpoint` y **no** encontrará los certificados existentes.
4. **Archivos**: `Caddyfile` + `sync-hostmap.ps1` en `C:\caddy\`; semilla el mapa una vez con `sync-hostmap.ps1 -NoReload`.
5. **Puertas antes del primer inicio**: `caddy list-modules` debe mostrar el módulo de almacenamiento s3; `caddy adapt` debe emitir `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` en su bloque de almacenamiento; `caddy validate` debe pasar.
6. **Servicio**: instalar a través de WinSW (id de servicio `caddy`, reinicio automático en fallo, registros rodantes). Se ejecuta como LocalSystem, que alcanza IMDS para las credenciales de rol.
7. **Tarea de sincronización**: registrar `CaddyHostmapSync` (SYSTEM, cada 5 min + al inicio, límite de ejecución de 4 minutos).
8. **Verificar pre-cambio** forzando resolución de dominios a `127.0.0.1` con `curl --resolve` (la caja no tiene tráfico real hasta que se mueve el EIP): un dominio existente debe servir con un cert llevado válido; `www.` debe 302; un host desconocido debe ser TLS-rechazado; y `Restart-Service caddy` debe volver sirviendo **sin re-imprimación manual** — esa prueba de reinicio es el punto entero del diseño estático.
9. **Go-live**: reasociar el IP Elástica `3.23.251.61` a la nueva instancia. El DNS de la iglesia nunca cambia.

## Gotchas Comprobados en Campo (Aprendidos de la Manera Difícil — no Regresión)

| Gotcha | Síntoma | Arreglo |
|---|---|---|
| `tls_server_name {vars.upstream}` en el transporte de reverse_proxy | Cada dominio proxificado obtiene 502: los placeholders de mapa se resuelven **vacíos en tiempo de marcación TLS** ("either ServerName or InsecureSkipVerify must be specified") | Usa el placeholder nativo del transporte: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Claves duplicadas o líneas basura en `hosts.map` | El controlador `map` de Caddy **error duro en una clave de entrada duplicada** — una línea mala puede derribar la configuración completa | El script de sincronización normaliza espacios en blanco, cae líneas deformadas (rechazando completamente solo si >20% son malas), dedup primero-gana, y escribe **UTF-8 libre de BOM** (un BOM corrompe la primera clave del mapa). La Api también filtra filas de dominio vacío/espacio-que-contiene en la fuente |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | El registro de tarea **falla silenciosamente** (XML fuera de rango, error no-terminante) | Construye la repetición como una instancia CIM `MSFT_TaskRepetitionPattern` con `Interval = "PT5M"` y sin duración; agrega un `ExecutionTimeLimit` de 4 minutos (la primera ejecución SYSTEM puede colgar en una búsqueda CRL/TLS fría) |

:::warning
El API de administrador se vincula solo a `localhost:2019`. El modo de runtime heredado lo expuso remotamente para que la Api de Membresía pudiera empujar configuraciones de rutas; el diseño estático no necesita empujes remotos, y la superficie más pequeña es deliberada. `caddy reload` (ejecutado localmente por el script de sincronización) es el único consumidor API de administrador.
:::

:::info Empuje de runtime heredado
`CaddyHelper` en la Api (y los extremos `GET /membership/domains/caddy` + `GET /caddy/init` / ) aún existen como el camino de retroceso al antiguo modo configurado en runtime. Están programados para eliminación una vez que la caja estática ha sido estable durante un par de semanas — después de eso, `authorize` + `hostmap` son los únicos puntos de integración.
:::

## Operaciones

- **Registros**: Registros rodantes de WinSW en `C:\caddy\` (stdout/err de servicio — los errores de proxy inverso aterrizan en `caddy-service.err.log`); historial de sincronización en `C:\caddy\sync-hostmap.log`.
- **Fuerza una actualización de mapa**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Cambio de configuración**: edita `C:\caddy\Caddyfile`, luego `caddy validate` + `caddy reload` (o `Restart-Service caddy` — los reinicios son seguros por diseño).
- **Eliminación masiva de dominios** activa la guardia de contracción del script de sincronización por diseño; mueve el antiguo `hosts.map` a un lado y re-ejecuta la tarea para aceptar una contracción intencional grande.
- **Instrucciones de DNS para iglesias son iguales para siempre**: ápice `A 3.23.251.61` o `CNAME proxy.b1.church`.

## Páginas Relacionadas

- [Enrutamiento de Sitios Web y Multi-Sitio](../architecture/websites) — cómo la solicitud proxificada se resuelve a una iglesia/sitio en B1App
- [Despliegue de Api](./apis) — desplegar la Api de Membresía que sirve `authorize`/`hostmap`
