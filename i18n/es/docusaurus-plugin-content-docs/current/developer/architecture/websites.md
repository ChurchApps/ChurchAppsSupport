---
title: "Enrutamiento de Sitios Web y Multi-Sitio"
---

# Enrutamiento de Sitios Web y Multi-Sitio

<div class="article-intro">

Una iglesia única ahora puede servir más de un sitio web distinto, y cada uno puede vivir en un subdominio `*.b1.church` o en un dominio completamente personalizado de propiedad de la iglesia. Esta página mapea la capa de enrutamiento que se sienta *bajo* el constructor: cómo una solicitud entrante se resuelve a una iglesia **y** a un sitio específico, el modelo de datos multi-sitio (el centinela `siteId` que mantiene cada sitio previamente existente renderizándose sin cambios), y el borde de dominio personalizado — un proxy Caddy autogestionado en EC2 que termina TLS y reescribe cada dominio de iglesia en su `*.b1.church` corriente ascendente. Para qué realmente se renderiza una vez que una solicitud se ha resuelto — el árbol página/sección/elemento — ver [Constructor de Sitios Web](./website-builder).

</div>

## Descripción General

```
   grace.b1.church              www.gracechurch.org  (dominio personalizado)
   (subdominio b1.church)                  │
          │                               ▼
          │             ┌──────────────────────────────────────────┐
          │             │ Borde Caddy — EC2 3.23.251.61             │
          │             │             (proxy.b1.church)             │
          │             │  • termina TLS (cert LE por dominio)    │
          │             │  • reescribe Host → {sub}.b1.church        │
          │             │  • proxy inverso a B1App                  │
          │             └────────────────────┬─────────────────────┘
          │                  Host = {sub}.b1.church
          ▼                                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │ B1App src/middleware.ts                                     │
   │  • siempre: eliminar cualquier x-site suministrado por cliente│
   │  • Host *.b1.church interno ⇒ búsqueda de dominios inerte  │
   │  • Host personalizado sin procesar (omitiendo Caddy) ⇒ búsqueda → establecer x-site
   └───────────────────────────┬────────────────────────────────┘
                               ▼  next.config.mjs → etiqueta primera del host → /[sdSlug]/…
              ┌─────────────────────────────────────────────────┐
              │ [sdSlug] · ConfigHelper.load(sdSlug)             │
              │   GET /membership/churches/lookup/?subDomain=…   │
              │   → { id, name, subDomain, siteId? }             │
              │   enhebra ?siteId= en cada llamada de contenido: │
              │   /content/pages/:id/tree · /globalStyles ·      │
              │   /blocks/public/footer · /links · sitemap       │
              └─────────────────────────────────────────────────┘

  guardado de dominio/eliminación (B1Admin Configuración→Dominios → POST /membership/domains)
        └─ CaddyHelper.updateCaddy() de mejor esfuerzo  (envuelto, no fatal, tiempo de espera 10s)
  Caddy lee la tabla de dominios misma a través de dos extremos anónimos:
        GET /membership/domains/authorize  — TLS bajo demanda `ask` (200 conocido / 404 desconocido)
        GET /membership/domains/hostmap    — mapa host→{sub}.b1.church (actualización 5 min)
```

Tres reglas se mantienen en esta capa:

1. **Un centinela mantiene todo hacia atrás compatible.** `siteId = ''` es el sitio primario. Cada página, bloque, enlace, estilo global, y fila de dominio que existía antes de esta característica lleva `''` y se renderiza exactamente como lo hacía. Un *segundo* sitio web es simplemente un conjunto de filas con un `siteId` que no es vacío, y cualquier extremo de contenido llamado sin `?siteId=` devuelve el sitio primario — byte a byte la solicitud antigua.
2. **La resolución se basa en etiqueta de host y converge.** Un subdominio `*.b1.church` enruta por su etiqueta de host directamente; un dominio personalizado se reescribe a su etiqueta `{sub}.b1.church` en el borde de Caddy antes de que B1App lo vea (con una búsqueda de BD del middleware que marca un encabezado `x-site` como retroceso para cualquier `Host` personalizado sin procesar). Ambas patas aterrizan en la misma ruta `[sdSlug]` y la misma llamada `churches/lookup`, para que el renderizado descendente sea idéntico.
3. **El borde Caddy es sin estado sobre una fuente única de verdad.** Los dominios personalizados terminan en un proxy Caddy autogestionado en EC2 que reescribe cada dominio en su corriente ascendente `{sub}.b1.church`. Un guardado de dominio dispara un único `CaddyHelper.updateCaddy()` de mejor esfuerzo, y Caddy también lee la tabla `domains` directamente (los extremos `authorize` y `hostmap` abajo). La tabla es autoritaria — un Caddy inaccesible nunca puede fallar un guardado.

## Resolución del sitio

### Subdominios `*.b1.church`

`B1App/next.config.mjs` reescribe solicitudes entrantes por host. Una regla de host con el patrón `(?<subdomain>.*?)\..*` captura la **primera etiqueta** del host y reescribe `/` y `/:path*` en `/{subdomain}` — el segmento de App-Router `[sdSlug]`. Así que `grace.b1.church/about` se convierte en `/grace/about`.

Dentro de `src/app/[sdSlug]/`, `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) llama a `GET /membership/churches/lookup/?subDomain={sdSlug}`. La respuesta `ChurchController.getBySubDomain` ahora tiene dos ramas:

| Slug coincide | Respuesta | Significado |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Sitio primario de esa iglesia |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Un **sitio secundario** — el controlador se retrocede a `sites`, resuelve la iglesia propietaria, y repite la etiqueta consultada más el `siteId` adicional |

Ese `siteId` adicional es la única cosa que distingue una solicitud de sitio secundario de una primaria; todo lo demás en la canalización se comparte.

### Dominios Personalizados

Un dominio propiedad de la iglesia termina en el **borde Caddy** (detallado abajo), que reescribe el encabezado `Host` en el subdominio del sitio antes de hacer proxy a B1App. Así que en el camino normal B1App recibe un *internal* `*.b1.church` host y lo resuelve por etiqueta de host exactamente como un subdominio nativo — la búsqueda de BD del middleware nunca se dispara. `src/middleware.ts` aún se ejecuta en cada solicitud, pero con un trabajo siempre activado y un retroceso:

1. **Siempre** — **elimina cualquier encabezado `x-site` suministrado por cliente**. Ese encabezado es entrada reescrita suplantable y solo se confía cuando el middleware lo establece; eliminarlo es el trabajo real del middleware detrás de Caddy.
2. **Retroceso, solo `Host` que no sea interno** — para un `Host` de dominio personalizado sin procesar que alcanza B1App *sin* la reescritura de Caddy, llama a `GET /membership/domains/public/lookup/{host}` y, si eso devuelve un `subDomain`, establece `x-site: {subDomain}.b1.church`. Detrás de Caddy esta rama es inerte porque el `Host` ya es `*.b1.church`.

Los hosts internos — `localhost`, `b1.church`, y los sufijos `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — omiten la búsqueda completamente (ya están resueltos por la reescritura de etiqueta de host, o son hosts de vista previa/despliegue).

La búsqueda misma (`DomainRepo.loadByName`) se une a la izquierda `domains → churches` y `domains → sites` y devuelve `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` — el subdominio del sitio secundario asignado si el dominio apunta a uno, de lo contrario el de la iglesia. Coincide el host exacto primero; si ese host comenzó con `www.` y falló, reintentos **una vez** contra el ápice desnudo.

De vuelta en `next.config.mjs`, las reglas de reescritura de `x-site` se colocan **adelante de** las reglas genéricas de host, así que ganan. `x-site: grace.b1.church` → primera etiqueta `grace` → `[sdSlug] = grace`, y desde allí la resolución es idéntica al camino del subdominio (mismo `churches/lookup`, mismo `siteId`).

:::info
El encabezado `x-site` no es confiable desde afuera. El middleware elimina incondicionalmente cualquier `x-site` entrante antes de opcionalmente establecer el propio, y las reglas de reescritura solo ven el valor establecido por middleware — un cliente no puede forzarse a sí mismo al contenido de otra iglesia enviando un encabezado.
:::

Dos detalles operativos en el middleware:

- **Cache.** El resultado de cada host (un golpe *o* una falta confirmada — nunca un error de red) se cachea durante **10 minutos** en un `Map` en memoria, por aislante sin servidor.
- **Matcher.** El matcher deliberadamente re-incluye `/sitemap.xml`, `/robots.txt`, y `/manifest.webmanifest`. Su primer patrón excluye rutas punteadas, que de lo contrario las soltarían; se agregan de nuevo para que los archivos SEO/PWA por dominio personalizado también reciban el encabezado `x-site`.

### Enhebrado de `siteId`

`ConfigHelper` almacena el `siteId` resuelto en su `ConfigurationInterface` por solicitud (memorizado con React `cache()`) y añade `?siteId=` a las llamadas de contenido que hace — **condicionalmente**: un `siteId` vacío (un subdominio de iglesia primaria) omite el parámetro completamente. Los extremos enhebrados son el árbol de página (`/content/pages/:id/tree`), la lista de página pública utilizada por el mapa del sitio (`/content/pages/public/:id`), estilos globales (`/content/globalStyles/church/:id`), enlaces de navegación (`/content/links/church/:id`), y el bloque de pie de página independiente (`/content/blocks/public/footer/:id`). En el camino de renderizado normal el pie llega dentro del árbol de página (secciones etiquetadas `zone: "siteFooter"`), ya obtido con `siteId`, por lo que no hay brecha de pie sin alcance.

El portal de miembros (B1App `mobile`) intencionalmente se sienta fuera: `loadChurchAppearance.ts` resuelve la iglesia a través de `churches/lookup` pero lee `/settings/public/{id}` a nivel de iglesia y nunca enhebra `siteId` — el portal es a nivel de iglesia en v1 (ver abajo).

## Múltiples sitios web por iglesia

### Modelo de datos

La nueva tabla `membership.sites` es deliberadamente diminuta:

| Columna | Tipo | Notas |
|--------|------|-------|
| `id` | PK `char(11)` | |
| `churchId` | `char(11)` | Iglesia propietaria |
| `name` | `varchar(255)` | Nombre de pantalla (p. ej. "Español", "Juventud") |
| `subDomain` | `varchar(45)` | **Índice único** — espacio de nombres global (abajo) |

El alcance del sitio es entonces una única columna sin nulos agregada a las tablas de contenido y dominio:

| Tabla (módulo) | Columna | `''` significa |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Dominio sirve el sitio primario |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Sitio primario — y en **`blocks`**, `''` adicionalmente significa *compartido en todos los sitios* |

Dos migraciones agregan todo esto (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Porque la columna por defecto a `''`, cada fila existente mantiene el comportamiento de hoy sin relleno.

**Espacio de nombres de subdominio global.** `sites.subDomain` comparte *un* espacio de nombres con `churches.subDomain` — un subdominio de sitio nunca puede chocar con un subdominio de iglesia u otro sitio. Esto se aplica en **ambos** caminos de guardado: `SiteController.save` rechaza una etiqueta que golpea `churches` o `sites`, y `ChurchController.validateSave` hace lo inverso. Un índice único en `sites.subDomain` lo respalda a nivel de base de datos.

**La unicidad de las páginas** se amplió de `(churchId, url)` a `(churchId, siteId, url)`, para que dos sitios de una iglesia puedan cada uno poseer su propio `/about`.

### Contenido por sitio, con retrocesos

Cada extremo **lista/árbol** de contenido con alcance de sitio toma un `?siteId=` opcional (ausente ⇒ `''` = primario): árbol/lista/página pública, lista/por-tipo/pie de bloque, enlaces (anon / filtrado / todo), y estilos globales. Las secciones y elementos son *no* alcanzados directamente — heredan a través de su página de padre o bloque.

Dos cadenas de resolución hacen el trabajo interesante:

- **Estilos globales — `site → primario → predeterminado`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` devuelve la fila del sitio; si un sitio secundario no tiene ninguno, devuelve la fila **primaria (`''`) tal cual** (manteniendo el `id`/`siteId` primario, que el cliente usa para copia en escritura); si tampoco hay primario, `GlobalStyleController` devuelve una paleta/fuentes de código duro predeterminadas.
- **Bloque de pie — site-específico gana, compartido se retrocede.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` devuelve filas `''` *y* site-específicas; el resolutor elige el pie de la página propio si está presente, sino el compartido. La misma lógica se ejecuta tanto en `TreeHelper.insertBlocks` (árbol de página) como en el extremo `/content/blocks/public/footer/:churchId` independiente.

### Cascada de eliminación de sitio

`SiteController.delete` (cerrado en el permiso Settings→Edit de membresía) derriba un sitio secundario en tres pasos:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` cascada todo contenido que el sitio posee: sus **páginas** → sus secciones, elementos, `pageHistory`, y `posts`; sus propios **bloques** → sus secciones, elementos, y `pageHistory`; sus **enlaces** y **globalStyles**. Una guardia rechaza ejecutarse por `''` — el centinela primario/compartido nunca se cascada.
2. `DomainRepo.clearSiteId` **reasigna** los dominios del sitio de vuelta al primario (`siteId → ''`) en lugar de eliminarse, para que un dominio personalizado sobreviva a la eliminación del sitio.
3. La fila `sites` se elimina y las rutas de Caddy se re-sincronizan (mejor esfuerzo).

### Superficie B1Admin

| Capacidad | Donde | Mecanismo |
|-----------|-------|-----------|
| Cambiador de sitio | `useSiteSelection` + `SiteSwitcher` (vacío = "Sitio Web Principal") | Lee un parámetro URL `?site=` y lo enhebra como `?siteId=` en llamadas ContentApi. Presente en los tres **listados** de sitio — **Páginas**, **Bloques**, **Apariencia** — pero *no* los editores de página/bloque, que llevan `siteId` en el registro |
| Creación/eliminación de sitios | `SitesDialog`, abierto desde la entrada "Administrar sitios web…" del cambiador | `POST /membership/sites` / `DELETE /membership/sites/:id` (nombre + subDomain). Cerrado en el permiso Settings→Edit de membresía (`Permissions.settings.edit` lado servidor; `Permissions.membershipApi.settings.edit` en B1Admin). **Solo crear/eliminar — no hay interfaz de usuario de renombrado en v1** |
| Asignación de sitio por dominio | `DomainSettingsEdit` bajo Settings→Dominios | Un desplegable de sitio por fila publica `siteId` por dominio a `/membership/domains`. La columna se oculta si la API devuelve sin sitios (backend más antiguo) |
| Estilos de copia en escritura | `StylesManager.prepareForSave` | Cuando la fila de estilo global cargada `siteId` no coincide con el sitio seleccionado (es decir, la API devolvió el primario heredado como retroceso), cae el `id` primario y marca el `siteId` actual, forzando un **insertar** de una fila site-específica nueva en lugar de sobrescribir la primaria. El mismo fork-on-mismatch aplica al bloque de pie de página del sitio |

:::info
**Qué se mantiene a nivel de iglesia en v1 (una opción de alcance deliberada, no una limitación del modelo de datos):** el **blog** (`BlogPage` no tiene cambiador y carga `/posts` sin `siteId`), los **widgets del sitio** (pancarta de anuncio + lanzador), **redirecciones**, el **logo / GA4 / configuración de iglesia**, y el **portal de miembros** (B1App móvil). Tenga en cuenta que esto es *no* "toda la Apariencia" — el estilo global de un sitio secundario (paleta, fuentes, tipografía, espaciado, navegación, CSS personalizado) **es** por sitio a través de la ruta copia en escritura anterior; solo los subpaneles de banner/lanzador/redirecciones/logo de la página Apariencia se mantienen a nivel de iglesia.
:::

## Dominios Personalizados: Borde Caddy (plan de configuración estática)

:::info
**Dirección revisada 2026-07-02.** Un plan anterior para mover alojamiento de dominio personalizado a dominios administrados por Vercel fue **cancelado**, y todo código de registro de dominios de Vercel (`VercelHelper`, sus variables de ambiente `vercelToken`/`vercelProjectId`/`vercelTeamId`, parámetros SSM, y entradas de salud) fue eliminado de la Api. El proxy **Caddy autogestionado en EC2 permanece** como el borde de dominio personalizado permanente. El único trabajo restante es interno: cambiar la configuración *runtime* de Caddy por una *estática* que sobrevive reinicios.
:::

### El borde

Cada dominio de iglesia personalizado apunta DNS a una caja EC2 única — `3.23.251.61`, también alcanzable como `proxy.b1.church`. La pantalla Settings→Dominios de B1Admin instruye iglesias para agregar un ápice `A → 3.23.251.61` o un `CNAME → proxy.b1.church`. Caddy termina TLS con un cert Let's Encrypt por dominio, reescribe el encabezado `Host` en el subdominio `{sub}.b1.church` corriente ascendente, y hace proxy inverso a B1App — que luego lo enruta por etiqueta de host como cualquier subdominio nativo (ver [Dominios Personalizados](#custom-domains) arriba).

El mapeo corriente ascendente viene de `DomainRepo.loadPairs`, cuya marcación **COALESCE el subdominio del sitio asignado** para que un dominio haga proxy al sitio *secundario* correcto, retrocediendo al primario de la iglesia:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Las filas `www.*` se excluyen del mapa; Caddy sirve `www.{host}` a través de un redireccionamiento `302` al ápice en su lugar.

### Dos extremos anónimos alimentan el borde

`DomainController` expone dos extremos sin autenticar, de solo lectura que la caja consume directamente — anónimos por necesidad, ya que el borde los consulta antes de que cualquier contexto de iglesia exista:

| Extremo | Devuelve | Rol |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | `200` si el dominio — o, para una falta `www.`, su ápice desnudo — existe en `domains`; `404` de lo contrario (incluyendo un `domain` vacío) | **TLS bajo demanda de Caddy `ask`**: el control de abuso decidiendo si emitir un cert para un SNI entrante |
| `GET /membership/domains/hostmap` | `text/plain`, una línea por dominio enrutable `{domain} {sub}.b1.church` ordenada | El archivo de mapa host→corriente ascendente que la caja actualiza en un temporizador |

`authorize` reutiliza `DomainRepo.loadByName` (host exacto, luego un único reintento `www.`→ápice); `hostmap` reutiliza `loadPairs` — así es site-consciente y excluido `www.*`, idéntico a las rutas del proxy — y solo elimina el sufijo `:443`.

### Guardado de dominio/eliminación — un empujón de mejor esfuerzo único

`DomainController.save` escribe las filas `domains` y luego hace una llamada **único mejor esfuerzo** `CaddyHelper.updateCaddy()`, envuelta en un `try/catch` que registra (`console.error`) y rechaza; `delete` hace lo mismo (que también fijó un bug anterior de ruta obsoleta al eliminar), igual que eliminación de sitio secundario (`SiteController.delete`). `updateCaddy` está mismo acotado por un tiempo de espera **10s** de Axios, así que un Caddy inaccesible o parado nunca puede `500` un guardado de dominio — la tabla `domains` es la fuente de verdad.

### Estado actual — configuración estática, sin estado de ejecución

La caja (Windows EC2 detrás de la IP Elástica permanente) ejecuta Caddy desde un **Caddyfile estático**: TLS bajo demanda cuyo `ask` apunta a `/membership/domains/authorize`, plus un archivo de mapa host→corriente ascendente actualizado cada 5 minutos desde `/membership/domains/hostmap` por una tarea programada que termina en un `caddy reload` elegante. La configuración sobrevive reinicios con cero estado de ejecución — sin danza de re-imprimación — y un SNI desconocido es **rechazado por TLS** (ningún cert se acuña para un host que `authorize` rechaza), mientras un host autorizado pero aún no mapeado (un dominio nuevo dentro de la ventana de sincronización ≤5 minutos) obtiene un 404 limpio. Los nuevos dominios se vuelven enrutables dentro de ~5 minutos de un guardado; sus certificados se acuñan en el primer golpe HTTPS. Compilación/configuración, operaciones, y gotchas comprobados en campo: [Proxy de Dominio Personalizado de Caddy](../deployment/caddy-proxy).

### Empuje de runtime heredado — camino de retroceso, pendiente de eliminación

`CaddyHelper` (módulo de membresía) aún puede impulsar Caddy a través de su **API de administrador** en `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; sin-op cuando se deja; expuesto bajo el grupo Integraciones de `ServerHealthController`): `updateCaddy()` PATCH una matriz de rutas completa, e `initializeCaddy()` + los extremos `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` reconstruyen un servidor configurado en runtime desde cero. Ese modo de configuración vivía solo en memoria de Caddy — la amnesia de reinicio que esta arquitectura reemplazó. La maquinaria permanece únicamente como el camino de retroceso y está programada para eliminación una vez que la caja estática ha sido estable; el empuje `updateCaddy()` de mejor esfuerzo en guardado/eliminación de dominio es un no-op inofensivo contra la caja estática (su API de administrador es localhost-solamente).

## Páginas Relacionadas

- [Proxy de Dominio Personalizado de Caddy](../deployment/caddy-proxy) — la caja de borde misma: configuración de caja nueva, servicio WinSW, tarea de sincronización de mapa, y gotchas operacionales
- [Constructor de Sitios Web](./website-builder) — el árbol página/sección/elemento, renderizadores, blog, SEO, y generación de IA (qué se renderiza una vez que una solicitud se ha resuelto a una iglesia/sitio)
- [Extremos de Contenido](../api/endpoints/content) — la superficie REST para páginas, bloques, enlaces, y estilos globales, todos ahora conscientes de `?siteId=`
- [B1App](../web-apps/b1-app) — la aplicación Next.js que aloja el middleware y enrutamiento `[sdSlug]`
- [Despliegue de Aplicación Web](../deployment/web-apps) — cómo se despliega B1App a Vercel
