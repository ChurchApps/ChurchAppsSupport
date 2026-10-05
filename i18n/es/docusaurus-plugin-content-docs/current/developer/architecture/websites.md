---
title: "Enrutamiento de Sitios Web y Multi-Sitio"
---

# Enrutamiento de Sitios Web y Multi-Sitio

<div class="article-intro">

Ahora una iglesia puede servir más de un sitio web distinto, y cada uno puede vivir en un subdominio `*.b1.church` o en un dominio completamente personalizado propiedad de la iglesia. Esta página mapea la capa de enrutamiento que se encuentra *debajo* del constructor: cómo una solicitud entrante se resuelve en una iglesia **y** en un sitio específico, el modelo de datos de multi-sitio (el centinela `siteId` que mantiene cada sitio preexistente renderizándose sin cambios), y el borde de dominio personalizado — un proxy Caddy autogestionado en EC2 que termina TLS y reescribe cada dominio de iglesia en su upstream `*.b1.church`. Para lo que realmente se renderiza una vez que una solicitud se ha resuelto — el árbol página/sección/elemento — ver [Website Builder](./website-builder).

</div>

## Descripción General

```
   grace.b1.church              www.gracechurch.org  (custom domain)
   (b1.church subdomain)                  │
          │                               ▼
          │             ┌──────────────────────────────────────────┐
          │             │ Caddy edge — EC2 3.23.251.61              │
          │             │             (proxy.b1.church)             │
          │             │  • terminates TLS (per-domain LE cert)    │
          │             │  • rewrites Host → {sub}.b1.church        │
          │             │  • reverse-proxies to B1App               │
          │             └────────────────────┬─────────────────────┘
          │                  Host = {sub}.b1.church
          ▼                                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │ B1App src/middleware.ts                                     │
   │  • always: delete any client-supplied x-site (anti-spoof)   │
   │  • internal *.b1.church Host ⇒ domains lookup stays inert   │
   │  • raw custom Host (bypassing Caddy) ⇒ lookup → set x-site  │
   └───────────────────────────┬────────────────────────────────┘
                               ▼  next.config.mjs → host first-label → /[sdSlug]/…
              ┌─────────────────────────────────────────────────┐
              │ [sdSlug] · ConfigHelper.load(sdSlug)             │
              │   GET /membership/churches/lookup/?subDomain=…   │
              │   → { id, name, subDomain, siteId? }             │
              │   threads ?siteId= into every content call:      │
              │   /content/pages/:id/tree · /globalStyles ·      │
              │   /blocks/public/footer · /links · sitemap       │
              └─────────────────────────────────────────────────┘

  domain save/delete (B1Admin Settings→Domains → POST /membership/domains)
        └─ best-effort CaddyHelper.updateCaddy()  (wrapped, non-fatal, 10s timeout)
  Caddy reads the domains table itself via two anonymous endpoints:
        GET /membership/domains/authorize  — on-demand-TLS `ask` (200 known / 404 unknown)
        GET /membership/domains/hostmap    — host→{sub}.b1.church map (5-min refresh)
```

Tres reglas se mantienen a través de esta capa:

1. **Un centinela mantiene todo hacia atrás compatible.** `siteId = ''` es el sitio principal. Cada página, bloque, enlace, estilo global, y fila de dominio que existía antes de esta característica lleva `''` y se renderiza exactamente como lo hacía. Un *segundo* sitio web es simplemente un conjunto de filas con un `siteId` no vacío, y cualquier punto final de contenido llamado sin `?siteId=` devuelve el sitio principal — byte por byte la solicitud antigua.
2. **La resolución es basada en etiqueta de host y converge.** Un subdominio `*.b1.church` se enruta por su etiqueta de host directamente; un dominio personalizado se reescribe a su etiqueta `{sub}.b1.church` en el borde Caddy antes de que B1App lo vea (con una búsqueda BD de middleware que estampa un encabezado `x-site` como respaldo para cualquier `Host` personalizado sin procesar). Ambas piernas aterrizan en la misma ruta `[sdSlug]` y la misma llamada `churches/lookup`, por lo que la renderización descendente es idéntica.
3. **El borde Caddy es apátrida sobre una fuente única de verdad.** Un proxy Caddy autogestionado en EC2 termina los dominios personalizados que reescribe cada dominio en su upstream `{sub}.b1.church`. Un guardado de dominio dispara una única `CaddyHelper.updateCaddy()` de mejor esfuerzo, y Caddy también lee la tabla `domains` directamente (los puntos finales `authorize` y `hostmap` abajo). La tabla es autoritaria — un Caddy inaccesible nunca puede fallar en un guardado.

## Resolución de sitio

### Subdominios `*.b1.church`

`B1App/next.config.mjs` reescribe solicitudes entrantes por host. Una regla de host con el patrón `(?<subdomain>.*?)\..*` captura la **primera etiqueta** del host y reescribe `/` y `/:path*` en `/{subdomain}` — el segmento `[sdSlug]` del App-Router. Así que `grace.b1.church/about` se convierte en `/grace/about`.

Dentro de `src/app/[sdSlug]/`, `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) llama a `GET /membership/churches/lookup/?subDomain={sdSlug}`. La respuesta `ChurchController.getBySubDomain` ahora tiene dos ramas:

| Slug coincide | Respuesta | Significado |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Sitio principal de esa iglesia |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Un **sitio secundario** — el controlador se retracta a `sites`, resuelve la iglesia propietaria, y repite la slug consultada más el `siteId` extra |

Ese `siteId` extra es la única cosa que distingue una solicitud de sitio secundario de una principal; todo lo demás en la tubería se comparte.

### Dominios personalizados

Un dominio propiedad de iglesia termina en el **borde Caddy** (detallado abajo), que reescribe el encabezado `Host` al `{sub}.b1.church` del sitio antes de hacer proxy a B1App. Por lo que en el camino normal B1App recibe un host *interno* `*.b1.church` y lo resuelve por etiqueta de host exactamente como un subdominio nativo — la búsqueda BD del middleware nunca dispara. `src/middleware.ts` aún se ejecuta en cada solicitud, pero con un trabajo siempre activado y un respaldo:

1. **Siempre** — **elimina cualquier encabezado `x-site` suministrado por cliente**. Ese encabezado es entrada de reescritura falsificable y solo se confía cuando el middleware lo establece a sí mismo; eliminarlo es el trabajo real del middleware detrás de Caddy.
2. **Respaldo, solo `Host` no interno** — para un `Host` de dominio personalizado sin procesar que llega a B1App *sin* la reescritura de Caddy, llama a `GET /membership/domains/public/lookup/{host}` y, si eso devuelve un `subDomain`, establece `x-site: {subDomain}.b1.church`. Detrás de Caddy esta rama es inerte porque el `Host` ya es `*.b1.church`.

Los hosts internos — `localhost`, `b1.church`, y los sufijos `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — omiten completamente la búsqueda (ya se resuelven por la reescritura de etiqueta de host, u hospeda vista previa/despliegue).

La búsqueda en sí (`DomainRepo.loadByName`) une izquierda `domains → churches` y `domains → sites` y devuelve `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` — el subdominio del sitio secundario asignado si el dominio apunta a uno, de lo contrario el de la iglesia. Coincide con el host exacto primero; si ese host comenzaba con `www.` y falló, reintenta **una sola vez** contra el ápice desnudo.

De vuelta en `next.config.mjs`, las reglas de reescritura `x-site` se colocan **delante de** las reglas de host genérico, por lo que ganan. `x-site: grace.b1.church` → primera etiqueta `grace` → `[sdSlug] = grace`, y desde allí la resolución es idéntica al camino de subdominio (misma `churches/lookup`, mismo `siteId`).

:::info
El encabezado `x-site` no es de confianza desde el exterior. El middleware elimina incondicionalmente cualquier `x-site` entrante antes de establecer opcionalmente el suyo, y las reglas de reescritura solo ven el valor establecido por middleware — un cliente no puede forzarse a sí mismo en el contenido de otra iglesia enviando un encabezado.
:::

Dos detalles operacionales en el middleware:

- **Caché.** El resultado de cada host (un acierto *o* una pérdida confirmada — nunca un error de red) se almacena en caché durante **10 minutos** en un `Map` en memoria, por aislamiento sin servidor.
- **Matcher.** El matcher deliberadamente vuelve a incluir `/sitemap.xml`, `/robots.txt`, y `/manifest.webmanifest`. Su primer patrón excluye rutas con puntos, que de otro modo caerían esos archivos; se vuelven a agregar para que los archivos SEO/PWA de la iglesia de un dominio personalizado también reciban el encabezado `x-site`.
- **Encabezado canónico.** Para páginas de iglesia el middleware agrega un encabezado de respuesta `Link: <{proto}://{host}{path}>; rel="canonical"` llamando al host desde el que se sirvió la página — subdominio o dominio personalizado (`helpers/canonicalLink.ts`). Se omite en hosts no-iglesia (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) y en `/mobile`, `/login`, `/logout`, y los archivos de robots/sitemap/manifest generados.

### Sitio web público deshabilitado

Una iglesia puede activar **Disable Public Website** en B1Admin (configuración de contenido a nivel de iglesia `hidePublicSite = "true"`). El sitio luego sirve solo sus rutas orientadas a miembros:

- **El middleware B1App** busca el subdominio (`/membership/churches/lookup` entonces `/content/settings/public/:churchId`) y redirige solicitudes anónimas de cualquier ruta fuera de la lista permitida a `/login?returnUrl={path}{query}`. La lista permitida (`helpers/publicSite.ts`) es `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register`, y los archivos manifest/robots/sitemap. Solo las respuestas confirmadas se almacenan en caché (60 segundos en producción, ya que la llamada de revalidación del admin no puede borrar este mapa por instancia; sin caché en dev/test). Un error de API sirve el sitio en lugar de bloquear a todos.
- **Los miembros conectados ven el sitio completo.** Una solicitud que lleva una cookie `jwt` sin expiración (el middleware's `hasSession()` decodifica el `exp` de la carga sin verificar la firma -- esto es una puerta suave, no control de acceso) omite la redirección, por lo que después de conectarse un miembro regresa a la página que solicitó y ve las páginas normales, páginas integradas (Groups, Sermons, etc.), y navegación de encabezado. Los componentes de página y `Header` ya no comprueban `hidePublicSite` a sí mismos.
- **`robots.txt`** desaprueba todo, como en hosts noindex.
- **API.** `GET /content/pages/public/:churchId` (la lista de páginas del sitemap) devuelve `[]`, por lo que los llamadores anónimos no pueden listar las páginas.

### Threading `siteId`

`ConfigHelper` almacena el `siteId` resuelto en su `ConfigurationInterface` por solicitud (memoizado con React `cache()`) y agrega `?siteId=` a las llamadas de contenido que hace y los componentes de página hacen — **condicionalmente**: un `siteId` vacío (un subdominio de iglesia principal) omite el parámetro completamente. Los puntos finales enhebradores son el árbol de página (`/content/pages/:id/tree`), la lista de página pública usada por el sitemap (`/content/pages/public/:id`), estilos globales (`/content/globalStyles/church/:id`), enlaces de navegación (`/content/links/church/:id`), y el bloque de pie de página independiente (`/content/blocks/public/footer/:id`). En la ruta de renderización normal el pie de página llega dentro del árbol de página (secciones etiquetadas `zone: "siteFooter"`), ya buscado con `siteId`, por lo que no hay brecha de pie de página sin ámbito.

El portal de miembros (B1App `mobile`) intencionalmente se sienta fuera de esto: `loadChurchAppearance.ts` resuelve la iglesia a través de `churches/lookup` pero lee la iglesia a nivel `/settings/public/{id}` y nunca enhebra `siteId` — el portal es iglesia-amplio en v1 (ver abajo).

## Múltiples sitios web por iglesia

### Modelo de datos

La nueva tabla `membership.sites` es deliberadamente pequeña:

| Columna | Tipo | Notas |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Iglesia propietaria |
| `name` | `varchar(255)` | Nombre de visualización (p. ej. "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Índice único** — espacio de nombres global (abajo) |

El ámbito del sitio es luego una única columna sin nulos agregada a las tablas de contenido y dominio:

| Tabla (módulo) | Columna | `''` significa |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | El dominio sirve el sitio principal |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Sitio principal — y en **`blocks`**, `''` además significa *compartido entre todos los sitios* |

Dos migraciones agregan todo esto (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Porque la columna predetermina a `''`, cada fila existente mantiene el comportamiento de hoy sin relleno.

**Espacio de nombres de subdominio global.** `sites.subDomain` comparte *un* espacio de nombres con `churches.subDomain` — un subdominio de sitio nunca puede colisionar con un subdominio de iglesia u otro sitio. Esto se aplica en **ambas** rutas de guardado: `SiteController.save` rechaza una slug que golpea `churches` o `sites`, y `ChurchController.validateSave` hace lo mismo en inversa. Un índice único en `sites.subDomain` lo respalda a nivel de base de datos.

**La unicidad de páginas** se amplió de `(churchId, url)` a `(churchId, siteId, url)`, por lo que dos sitios de una iglesia pueden cada uno poseer su propio `/about`.

### Contenido por sitio, con respaldos

Cada punto final de lista/árbol de contenido de ámbito de sitio toma un `?siteId=` opcional (ausente ⇒ `''` = principal): árbol/lista/público de páginas, lista/por-tipo/pie de página de bloques, enlaces (anón/filtrado/todos), y estilos globales. Las secciones y elementos *no* se limitan directamente — heredan a través de su página o bloque padre.

Dos cadenas de resolución hacen el trabajo interesante:

- **Estilos globales — `site → primary → default`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` devuelve la fila del sitio; si un sitio secundario no tiene ninguno, devuelve la fila **principal (`''`) tal cual** (manteniendo el `id`/`siteId` principal, que el cliente usa para copiar-al-escribir); si tampoco hay un principal, `GlobalStyleController` devuelve una paleta/fuentes codificadas de forma rígida.
- **Bloque de pie de página — específico del sitio gana, compartido retrocede.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` devuelve las filas compartidas (`''`) *y* específicas del sitio; el resolver elige el pie de página del sitio si está presente, de lo contrario el compartido. La misma lógica se ejecuta tanto en `TreeHelper.insertBlocks` (árbol de página) como en el punto final independiente `/content/blocks/public/footer/:churchId`.

### Cascada de eliminación de sitio

`SiteController.delete` (puerta en el permiso Configuración de pertenencia→Edición) desmorona un sitio secundario en tres pasos:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` cascada todo el contenido que el sitio posee: sus **páginas** → sus secciones, elementos, `pageHistory`, y `posts`; sus propios **bloques** → sus secciones, elementos, y `pageHistory`; sus **enlaces** y **estilos globales**. Una guardia se niega a ejecutarse para `''` — el centinela principal/compartido nunca se cascada.
2. `DomainRepo.clearSiteId` **reasigna** los dominios del sitio de vuelta al principal (`siteId → ''`) en lugar de eliminarlos, por lo que un dominio personalizado sobrevive a una eliminación de sitio.
3. La fila `sites` se elimina y las rutas de Caddy se re-sincronizan (mejor esfuerzo).

### Superficie B1Admin

| Capacidad | Dónde | Mecanismo |
|-----------|-------|-----------|
| Selector de sitio | `useSiteSelection` + `SiteSwitcher` (vacío = "Main Website") | Lee un parámetro URL `?site=` y lo enhebra como `?siteId=` en llamadas ContentApi. Presente en las tres áreas de lista de **Sitio** — **Páginas**, **Bloques**, **Apariencia** — pero *no* en los editores de página/bloque, que llevan `siteId` en el registro |
| Crear/eliminar sitios | `SitesDialog`, abierto desde la entrada "Manage websites…" del selector | `POST /membership/sites` / `DELETE /membership/sites/:id` (name + subDomain). Puerta en el permiso Configuración de pertenencia→Edición (`Permissions.settings.edit` lado del servidor; `Permissions.membershipApi.settings.edit` en B1Admin). **Solo crear/eliminar — no hay UI de renombrar en v1** |
| Asignación de sitio por dominio | `DomainSettingsEdit` bajo Configuración→Dominios | Un menú desplegable de sitio por fila publica `siteId` por dominio a `/membership/domains`. La columna se oculta si la API devuelve sin sitios (backend más antiguo) |
| Estilos de copia-al-escribir | `StylesManager.prepareForSave` | Cuando el `siteId` de la fila de estilo global cargado no coincide con el sitio seleccionado (es decir, la API devolvió el principal heredado como respaldo), suelta el `id` principal y estampa el `siteId` actual, forzando una **inserción** de una nueva fila específica del sitio en lugar de sobrescribir la principal. La misma bifurcación-en-desajuste se aplica al bloque de pie de página del sitio |

:::info
**Lo que permanece iglesia-ancho en v1 (una opción de ámbito deliberado, no un límite del modelo de datos):** el **blog** (`BlogPage` no tiene un selector y carga `/posts` sin `siteId`), los **widgets del sitio** (banner de anuncio + lanzador), **redirecciones**, el **logo / GA4 / configuración de iglesia**, y el **portal de miembros** (B1App mobile). Tenga en cuenta que esto *no* es "todo de Apariencia" — los estilos globales de un sitio secundario (paleta, fuentes, tipografía, espaciado, navegación, CSS personalizado) **son** por sitio a través de la ruta de copia-al-escribir anterior; solo los sub-paneles de banner/lanzador/redirecciones/logo de la página de Apariencia permanecen iglesia-ancho.
:::

## Dominios personalizados: Borde Caddy (plan estático-config)

:::info
**Dirección revisada 2026-07-02.** Un plan anterior para mover el hospedaje de dominio personalizado a dominios administrados por Vercel fue **cancelado**, y todo el código de registro de dominio de Vercel (`VercelHelper`, sus variables de entorno `vercelToken`/`vercelProjectId`/`vercelTeamId`, parámetros SSM, y entradas de salud) fue removido de la Api. El proxy **Caddy autogestionado en EC2 permanece** como el borde de dominio personalizado permanente. El único trabajo restante es interno: intercambiar la configuración de *ejecución* de Caddy por un config *estático* que sobreviva reinicios.
:::

### El borde

Cada dominio de iglesia personalizado apunta DNS en una caja EC2 — `3.23.251.61`, también alcanzable como `proxy.b1.church`. La pantalla Configuración→Dominios de B1Admin instruye a las iglesias a agregar un ápice `A → 3.23.251.61` o un `CNAME → proxy.b1.church`. Caddy termina TLS con un certificado Let's Encrypt por dominio, reescribe el encabezado `Host` al upstream `{sub}.b1.church` del dominio, e inversa-proxy a B1App — que luego lo enruta por etiqueta de host como cualquier subdominio nativo (ver [Dominios personalizados](#custom-domains) arriba).

El mapeo de upstream viene de `DomainRepo.loadPairs`, cuyo dial **COALESCE el subdominio del sitio asignado** para que un dominio proxy al sitio *secundario* correcto, retrocediendo al principal de la iglesia:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Las filas `www.*` se excluyen del mapa; Caddy sirve `www.{host}` a través de una redirección `302` al ápice en su lugar.

### Dos puntos finales anónimos alimentan el borde

`DomainController` expone dos puntos finales sin autenticación, de solo lectura que la caja consume directamente — anónimos por necesidad, ya que el borde los consulta antes de que exista cualquier contexto de iglesia:

| Punto final | Devuelve | Rol |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | `200` si el dominio — o, para una pérdida `www.`, su ápice desnudo — existe en `domains`; `404` de lo contrario (incluyendo un `domain` vacío) | `ask` TLS bajo demanda de Caddy: el control de abuso decidiendo si emitir un certificado para un SNI entrante |
| `GET /membership/domains/hostmap` | `text/plain`, una línea clasificada `{domain} {sub}.b1.church` por dominio enrutable | El archivo mapa host→upstream que la caja refresca en un temporizador |

`authorize` reutiliza `DomainRepo.loadByName` (host exacto, luego un reintento único `www.`→ápice); `hostmap` reutiliza `loadPairs` — por lo que es consciente del sitio y excluye `www.*`, idéntica a las rutas de proxy — y solo quita el sufijo `:443`.

### Guardado/eliminación de dominio — un único mejor esfuerzo

`DomainController.save` escribe las filas `domains` y luego hace una única llamada de **mejor esfuerzo** de `CaddyHelper.updateCaddy()`, envuelta en un `try/catch` que registra (`console.error`) y traga; `delete` hace lo mismo (que también arregló un anterior bug de ruta obsoleta-en-eliminar), como la eliminación de sitio secundario (`SiteController.delete`). `updateCaddy` se limita a sí misma por un tiempo de espera de **10s** de Axios, por lo que un Caddy inaccesible o detenido nunca puede `500` un guardado de dominio — la tabla `domains` es la fuente de verdad.

### Estado actual — config estática, sin estado de ejecución

La caja (Windows EC2 detrás de la IP Elastic permanente) ejecuta Caddy desde un **Caddyfile estático**: TLS bajo demanda cuyo `ask` apunta a `/membership/domains/authorize`, más un archivo mapa host→upstream refrescado cada 5 minutos desde `/membership/domains/hostmap` por una tarea programada que termina en una `caddy reload` elegante. El config sobrevive reinicios con cero estado de ejecución — sin danza de re-imprimación — y un SNI desconocido es **TLS-rechazado** (sin certificado se acuña para un host `authorize` rechaza), mientras que un host autorizado-pero-no-aún-mapeado (un dominio completamente nuevo dentro de la ventana de sincronización) obtiene un 404 limpio. Los nuevos dominios se vuelven enrutables dentro de ~5 minutos de un guardado; sus certificados se acuñan en el primer golpe. Construcción/configuración, operaciones, y gotchas probados en campo: [Caddy Custom-Domain Proxy](../deployment/caddy-proxy).

### Empuje de ejecución heredado — ruta de retroceso, pendiente de eliminación

`CaddyHelper` (módulo de pertenencia) todavía puede conducir Caddy a través de su **API admin** en `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; no-op cuando no está establecido; superficie bajo el grupo Integraciones de `ServerHealthController`): `updateCaddy()` PATCH una matriz de rutas completa, e `initializeCaddy()` + los puntos finales `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` reconstruyen un servidor configurado en tiempo de ejecución desde cero. El config de ese modo vivía solo en la memoria de Caddy — la amnesia de reinicio que esta arquitectura reemplazó. La maquinaria permanece únicamente como la ruta de retroceso y está programada para eliminación una vez que la caja estática ha sido estable; el `updateCaddy()` de mejor esfuerzo en guardado/eliminación de dominio es un no-op inofensivo contra la caja estática (su API admin es localhost-only).

## Páginas Relacionadas

- [Caddy Custom-Domain Proxy](../deployment/caddy-proxy) — la caja de borde en sí: configuración de caja fresca, servicio WinSW, tarea de sincronización de mapa, y gotchas operacionales
- [Website Builder](./website-builder) — el árbol página/sección/elemento, renderizadores, blog, SEO, y generación de AI (lo que se renderiza una vez que una solicitud se ha resuelto en una iglesia/sitio)
- [Content Endpoints](../api/endpoints/content) — la superficie REST para páginas, bloques, enlaces, y estilos globales, todos ahora conscientes de `?siteId=`
- [B1App](../web-apps/b1-app) — la app Next.js que hospeda el middleware y enrutamiento de `[sdSlug]`
- [Web App Deployment](../deployment/web-apps) — cómo B1App se desplega a Vercel
