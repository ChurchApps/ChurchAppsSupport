---
title: "Enrutamiento de sitios web y multisitio"
---

# Enrutamiento de sitios web y multisitio

<div class="article-intro">

Una sola iglesia ahora puede servir más de un sitio web distinto, y cada uno puede vivir en un subdominio `*.b1.church` o en un dominio personalizado completamente propio de la iglesia. Esta página describe la capa de enrutamiento que está *debajo* del creador: cómo una solicitud entrante se resuelve a una iglesia **y** a un sitio específico, el modelo de datos multisitio (el centinela `siteId` que mantiene funcionando sin cambios a todos los sitios preexistentes), y el borde de dominios personalizados: un proxy Caddy autogestionado en EC2 que termina TLS y reescribe cada dominio de la iglesia hacia su upstream `*.b1.church`. Para lo que realmente se renderiza una vez resuelta la solicitud (el árbol de páginas, secciones y elementos), consulte [Creador de sitios web](./website-builder).

</div>

## Descripción general

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

Tres reglas se cumplen en esta capa:

1. **Un centinela mantiene todo compatible con versiones anteriores.** `siteId = ''` es el sitio primario. Cada página, bloque, enlace, estilo global y fila de dominio que existía antes de esta función lleva `''` y se renderiza exactamente como antes. Un *segundo* sitio web es simplemente un conjunto de filas con un `siteId` no vacío, y cualquier endpoint de contenido llamado sin `?siteId=` devuelve el sitio primario: exactamente la solicitud antigua, byte por byte.
2. **La resolución se basa en la etiqueta del host y converge.** Un subdominio `*.b1.church` se enruta directamente por su etiqueta de host; un dominio personalizado se reescribe a su etiqueta `{sub}.b1.church` en el borde de Caddy antes de que B1App lo vea (con una búsqueda en la base de datos en el middleware que establece un encabezado `x-site` como alternativa para cualquier `Host` personalizado sin procesar). Ambos caminos llegan a la misma ruta `[sdSlug]` y a la misma llamada `churches/lookup`, así que el renderizado posterior es idéntico.
3. **El borde de Caddy no tiene estado sobre una única fuente de verdad.** Los dominios personalizados terminan en un proxy Caddy autogestionado en EC2 que reescribe cada dominio hacia su upstream `{sub}.b1.church`. Al guardar un dominio se dispara una única llamada `CaddyHelper.updateCaddy()` de mejor esfuerzo, y Caddy además lee directamente la tabla `domains` (los endpoints `authorize` y `hostmap` de abajo). La tabla es la autoridad: un Caddy inaccesible nunca puede hacer fallar un guardado.

## Resolución de sitios

### Subdominios `*.b1.church`

`B1App/next.config.mjs` reescribe las solicitudes entrantes según el host. Una regla de host con el patrón `(?<subdomain>.*?)\..*` captura la **primera etiqueta** del host y reescribe `/` y `/:path*` a `/{subdomain}`: el segmento de App Router `[sdSlug]`. Así, `grace.b1.church/about` se convierte en `/grace/about`.

Dentro de `src/app/[sdSlug]/`, `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) llama a `GET /membership/churches/lookup/?subDomain={sdSlug}`. La respuesta de `ChurchController.getBySubDomain` tiene ahora dos ramas:

| El slug coincide con | Respuesta | Significado |
|----------------------|-----------|-------------|
| `churches.subDomain` | `{ id, name, subDomain }` | Sitio primario de esa iglesia |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Un **sitio secundario**: el controlador recurre a `sites`, resuelve la iglesia propietaria y devuelve el slug consultado más el `siteId` adicional |

Ese `siteId` adicional es lo único que distingue una solicitud a un sitio secundario de una primaria; todo lo demás en la canalización es compartido.

Un slug que no coincide con ninguna de las dos tablas devuelve `{}` con un `200`. `ConfigHelper.load` trata una respuesta sin `id` como un sitio desconocido y llama a `notFound()` de Next, de modo que un subdominio desconocido recibe un 404 real en lugar de que cada llamada posterior pida `/…/undefined`. La página del creador también construye su ruta de árbol con `pageTreePath()` (`src/helpers/pageTreePath.ts`), que codifica el slug como URL, de modo que un slug mal formado (barras invertidas, espacios) devuelve 404 en lugar de convertir el `400` de la API en un 500.

### Dominios personalizados

Un dominio propiedad de la iglesia termina en el **borde de Caddy** (detallado más abajo), que reescribe el encabezado `Host` al `{sub}.b1.church` del sitio antes de reenviarlo a B1App. Así, en la ruta normal B1App recibe un host *interno* `*.b1.church` y lo resuelve por etiqueta de host igual que un subdominio nativo: la búsqueda en base de datos del middleware nunca se activa. `src/middleware.ts` se ejecuta en cada solicitud, pero con un trabajo fijo y una alternativa:

1. **Siempre** — **elimina cualquier encabezado `x-site` enviado por el cliente**. Ese encabezado es una entrada de reescritura falsificable y solo se confía en él cuando el propio middleware lo establece; quitarlo es el trabajo real del middleware detrás de Caddy.
2. **Alternativa, solo para un `Host` no interno** — para un `Host` de dominio personalizado sin procesar que llega a B1App *sin* la reescritura de Caddy, llama a `GET /membership/domains/public/lookup/{host}` y, si devuelve un `subDomain`, establece `x-site: {subDomain}.b1.church`. Detrás de Caddy esta rama es inactiva porque el `Host` ya es `*.b1.church`.

Los hosts internos — `localhost`, `b1.church`, y los sufijos `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — omiten la búsqueda por completo (ya se resuelven mediante la reescritura por etiqueta de host, o son hosts de vista previa/despliegue).

La búsqueda en sí (`DomainRepo.loadByName`) hace un left join de `domains → churches` y `domains → sites` y devuelve `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)`: el subdominio del sitio secundario asignado si el dominio apunta a uno, o si no el de la iglesia. Primero busca el host exacto; si ese host empezaba por `www.` y no lo encontró, reintenta **una vez** con el apex sin `www`.

En `next.config.mjs`, las reglas de reescritura de `x-site` se colocan **antes** de las reglas genéricas de host, así que tienen prioridad. `x-site: grace.b1.church` → primera etiqueta `grace` → `[sdSlug] = grace`, y a partir de ahí la resolución es idéntica a la ruta por subdominio (mismo `churches/lookup`, mismo `siteId`).

:::info
El encabezado `x-site` no es confiable desde el exterior. El middleware elimina incondicionalmente cualquier `x-site` entrante antes de establecer el suyo propio opcionalmente, y las reglas de reescritura solo ven el valor establecido por el middleware: un cliente no puede forzarse sobre el contenido de otra iglesia enviando un encabezado.
:::

Dos detalles operativos del middleware:

- **Caché.** El resultado de cada host (un acierto *o* un fallo confirmado, nunca un error de red) se almacena en caché durante **10 minutos** en un `Map` en memoria, por aislamiento de servidor sin estado.
- **Matcher.** El matcher vuelve a incluir deliberadamente `/sitemap.xml`, `/robots.txt` y `/manifest.webmanifest`. Su primer patrón excluye las rutas con punto, que de otro modo descartaría esos archivos; se vuelven a añadir para que los archivos SEO/PWA de cada iglesia en un dominio personalizado también reciban el encabezado `x-site`.
- **Encabezado canónico.** Para las páginas de la iglesia, el middleware agrega a la respuesta un encabezado `Link: <{proto}://{host}{path}>; rel="canonical"` que indica el host desde el que realmente se sirvió la página: subdominio o dominio personalizado (`helpers/canonicalLink.ts`). Cuando un dominio personalizado llega a B1App a través del [proxy Caddy](../deployment/caddy-proxy), el host de la solicitud es el subdominio `{sub}.b1.church`, así que el middleware usa en su lugar el dominio del visitante desde `X-Church-Host` — pero solo después de que `/domains/public/lookup/{host}` confirme que ese dominio corresponde al mismo subdominio (`ownsSubdomain()`). El enlace canónico, `robots.txt` y `sitemap.xml` entonces nombran el dominio personalizado en lugar del subdominio `b1.church`. Se omite en hosts que no son de iglesia (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) y en `/mobile`, `/login`, `/logout`, y en los archivos generados de robots/sitemap/manifest.

### Sitio público deshabilitado

Una iglesia puede activar **Disable Public Website** en B1Admin (configuración de contenido a nivel de iglesia `hidePublicSite = "true"`). El sitio entonces sirve solo sus rutas para miembros:

- **Middleware de B1App** consulta el subdominio (`/membership/churches/lookup` y luego `/content/settings/public/:churchId`) y redirige las solicitudes anónimas a cualquier ruta fuera de la lista de permitidas hacia `/login?returnUrl={path}{query}`. La lista (`helpers/publicSite.ts`) es `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register`, y los archivos manifest/robots/sitemap. Solo se almacenan en caché las respuestas confirmadas (60 segundos en producción, ya que la llamada de revalidación del administrador no puede limpiar ese mapa por instancia; sin caché en desarrollo/pruebas). Un error de la API sirve el sitio en lugar de dejar fuera a todos.
- **Los miembros con sesión ven el sitio completo.** Una solicitud que lleva una cookie `jwt` no caducada (`hasSession()` del middleware decodifica el `exp` del payload sin verificar la firma: es una barrera blanda, no un control de acceso) omite la redirección, de modo que después de iniciar sesión un miembro regresa a la página que pidió y ve las páginas normales, las páginas integradas (Groups, Sermons, etc.) y la navegación del encabezado. Los componentes de página y `Header` ya no comprueban `hidePublicSite` por sí mismos.
- **`robots.txt`** deshabilita todo, como en los hosts noindex.
- **API.** `GET /content/pages/public/:churchId` (la lista de páginas del sitemap) devuelve `[]`, de modo que quienes llaman de forma anónima no pueden listar las páginas.

### Propagación de `siteId`

`ConfigHelper` guarda el `siteId` resuelto en su `ConfigurationInterface` por solicitud (memorizado con `cache()` de React) y agrega `?siteId=` a las llamadas de contenido que él y los componentes de página hacen — **de forma condicional**: un `siteId` vacío (un subdominio de iglesia primaria) omite el parámetro por completo. Los endpoints que lo propagan son el árbol de páginas (`/content/pages/:id/tree`), la lista pública de páginas usada por el sitemap (`/content/pages/public/:id`), los estilos globales (`/content/globalStyles/church/:id`), los enlaces de navegación (`/content/links/church/:id`) y el bloque de pie de página independiente (`/content/blocks/public/footer/:id`). En la ruta de renderizado normal, el pie de página llega dentro del árbol de la página (secciones etiquetadas con `zone: "siteFooter"`), ya obtenido con `siteId`, así que no hay ningún hueco de pie de página sin ámbito.

El portal para miembros (B1App `mobile`) queda intencionalmente fuera de esto: `loadChurchAppearance.ts` resuelve la iglesia mediante `churches/lookup` pero lee la configuración a nivel de iglesia de `/settings/public/{id}` y nunca propaga `siteId`; el portal es de alcance de toda la iglesia en la v1 (consulte más abajo).

## Múltiples sitios web por iglesia

### Modelo de datos

La nueva tabla `membership.sites` es deliberadamente pequeña:

| Columna | Tipo | Notas |
|---------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Iglesia propietaria |
| `name` | `varchar(255)` | Nombre visible (por ejemplo "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Índice único**: espacio de nombres global (más abajo) |

El ámbito de sitio se reduce entonces a una única columna sin nulos agregada a las tablas de contenido y de dominios:

| Tabla (módulo) | Columna | `''` significa |
|----------------|---------|----------------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | El dominio sirve el sitio primario |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Sitio primario — y en **`blocks`**, `''` además significa *compartido por todos los sitios* |

Dos migraciones agregan todo esto (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Como la columna tiene `''` por defecto, cada fila existente conserva el comportamiento actual sin necesidad de rellenar datos.

**Espacio de nombres global de subdominios.** `sites.subDomain` comparte *un solo* espacio de nombres con `churches.subDomain`: un subdominio de sitio nunca puede colisionar con el subdominio de una iglesia ni con el de otro sitio. Se aplica en **ambas** rutas de guardado: `SiteController.save` rechaza un slug que coincida con `churches` o con `sites`, y `ChurchController.validateSave` hace lo mismo en sentido inverso. Un índice único sobre `sites.subDomain` lo respalda a nivel de base de datos.

**La unicidad de páginas** se amplió de `(churchId, url)` a `(churchId, siteId, url)`, de modo que dos sitios de una misma iglesia pueden tener cada uno su propio `/about`.

### Contenido por sitio, con alternativas

Cada endpoint de **lista/árbol** de contenido con ámbito de sitio acepta un `?siteId=` opcional (ausente ⇒ `''` = primario): listado/árbol/público de páginas, listado/por tipo/pie de bloques, enlaces (anónimos / filtrados / todos) y estilos globales. Las secciones y los elementos *no* tienen ámbito directo: lo heredan a través de su página o bloque padre.

Dos cadenas de resolución hacen el trabajo interesante:

- **Estilos globales — `site → primary → default`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` devuelve la fila propia del sitio; si un sitio secundario no tiene ninguna, devuelve **tal cual la fila primaria (`''`)** (conservando el `id`/`siteId` del primario, que el cliente usa para la copia al escribir), y si tampoco hay primaria, `GlobalStyleController` devuelve una paleta/fuentes predeterminadas codificadas. 
- **Bloque de pie de página — el específico del sitio gana, el compartido sirve de respaldo.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` devuelve las filas compartidas (`''`) *y* las específicas del sitio; el resolvedor elige el pie propio del sitio si existe, o si no el compartido. La misma lógica se ejecuta tanto en `TreeHelper.insertBlocks` (árbol de página) como en el endpoint independiente `/content/blocks/public/footer/:churchId`.

### Eliminación en cascada de un sitio

`SiteController.delete` (protegido por el permiso de Configuración→Editar de membresía) elimina un sitio secundario en tres pasos:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` elimina en cascada todo el contenido que posee el sitio: sus **páginas** → sus secciones, elementos, `pageHistory` y `posts`; sus propios **bloques** → sus secciones, elementos y `pageHistory`; sus **enlaces** y **globalStyles**. Una guarda se niega a ejecutarse para `''`: el centinela primario/compartido nunca se elimina en cascada.
2. `DomainRepo.clearSiteId` **reasigna** los dominios del sitio de vuelta al primario (`siteId → ''`) en lugar de borrarlos, de modo que un dominio personalizado sobrevive a la eliminación del sitio.
3. La fila de `sites` se elimina y las rutas de Caddy se resincronizan (de mejor esfuerzo).

### Superficie de B1Admin

| Capacidad | Dónde | Mecanismo |
|-----------|-------|-----------|
| Selector de sitio | `useSiteSelection` + `SiteSwitcher` (vacío = "Main Website") | Lee un parámetro de URL `?site=` y lo propaga como `?siteId=` en las llamadas a ContentApi. Presente en las tres áreas de **lista** del sitio — **Pages**, **Blocks**, **Appearance** — pero *no* en los editores de página/bloque, que llevan el `siteId` en el registro |
| Crear/eliminar sitios | `SitesDialog`, abierto desde la entrada "Manage websites…" del selector | `POST /membership/sites` / `DELETE /membership/sites/:id` (nombre + subDomain). Protegido por el permiso de Configuración→Editar de membresía (`Permissions.settings.edit` en el servidor; `Permissions.membershipApi.settings.edit` en B1Admin). **Solo crear/eliminar: no hay interfaz para renombrar en la v1** |
| Asignación de sitio por dominio | `DomainSettingsEdit` en Configuración→Dominios | Un desplegable de sitio por fila envía `siteId` por dominio a `/membership/domains`. La columna se oculta si la API no devuelve sitios (backend anterior) |
| Estilos con copia al escribir | `StylesManager.prepareForSave` | Cuando la fila de estilo global cargada tiene un `siteId` distinto del sitio seleccionado (es decir, la API devolvió el primario heredado como alternativa), elimina el `id` del primario y estampa el `siteId` actual, forzando un **insert** de una nueva fila específica del sitio en lugar de sobrescribir el primario. La misma bifurcación ante una discrepancia se aplica al bloque de pie de página del sitio |

:::info
**Lo que sigue siendo de toda la iglesia en la v1 (una decisión de alcance deliberada, no un límite del modelo de datos):** el **blog** (`BlogPage` no tiene selector y carga `/posts` sin `siteId`), los **widgets del sitio** (banner de anuncios + launcher), las **redirecciones**, el **logotipo / GA4 / configuración de la iglesia** y el **portal para miembros** (B1App mobile). Esto *no* significa "todo Appearance": los estilos globales de un sitio secundario (paleta, fuentes, tipografía, espaciado, navegación, CSS personalizado) **sí** son por sitio mediante la ruta de copia al escribir de arriba; solo los subpaneles de banner/launcher/redirecciones/logotipo de la página Appearance siguen siendo de toda la iglesia.
:::

## Dominios personalizados: borde Caddy (plan de configuración estática)

:::info
**Dirección revisada el 2026-07-02.** Un plan anterior para trasladar el alojamiento de dominios personalizados a dominios gestionados por Vercel fue **cancelado**, y todo el código de registro de dominios en Vercel (`VercelHelper`, sus variables de entorno `vercelToken`/`vercelProjectId`/`vercelTeamId`, los parámetros de SSM y las comprobaciones de estado) se eliminó de la API. El **proxy Caddy autogestionado en EC2 se mantiene** como borde permanente de dominios personalizados. El único trabajo pendiente es interno: cambiar la configuración de *tiempo de ejecución* de la API de administración de Caddy por una configuración *estática* que sobreviva a los reinicios.
:::

### El borde

Cada dominio personalizado de iglesia apunta su DNS a una única caja EC2 — `3.23.251.61`, también accesible como `proxy.b1.church`. La pantalla Settings→Domains de B1Admin indica a las iglesias que agreguen un `A` en el apex → `3.23.251.61` o un `CNAME` → `proxy.b1.church`. Caddy termina TLS con un certificado Let's Encrypt por dominio, reescribe el encabezado `Host` al upstream `{sub}.b1.church` del dominio y lo reenvía a B1App, que luego lo enruta por etiqueta de host como cualquier subdominio nativo (consulte [Dominios personalizados](#custom-domains) más arriba).

El mapeo de upstream proviene de `DomainRepo.loadPairs`, cuyo destino hace **COALESCE del subdominio del sitio asignado**, de modo que un dominio se reenvía al sitio *secundario* correcto, recurriendo al primario de la iglesia:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Las filas `www.*` se excluyen del mapa; Caddy sirve `www.{host}` mediante una redirección `302` al apex.

### Dos endpoints anónimos alimentan el borde

`DomainController` expone dos endpoints de solo lectura sin autenticación que la caja consume directamente: son anónimos por necesidad, ya que el borde hace las consultas antes de que exista cualquier contexto de iglesia:

| Endpoint | Devuelve | Función |
|----------|----------|---------|
| `GET /membership/domains/authorize?domain=` | `200` si el dominio — o, para una coincidencia `www.`, su apex sin `www` — existe en `domains`; `404` en caso contrario (incluido un `domain` vacío) | El **`ask` de TLS bajo demanda** de Caddy: el control de abuso que decide si emitir un certificado para un SNI entrante |
| `GET /membership/domains/hostmap` | `text/plain`, una línea ordenada `{domain} {sub}.b1.church` por dominio enrutable | El archivo de mapa host→upstream que la caja actualiza con un temporizador |

`authorize` reutiliza `DomainRepo.loadByName` (host exacto, luego un reintento `www.`→apex); `hostmap` reutiliza `loadPairs`, por lo que es consciente del sitio y excluye `www.*`, idéntico a las rutas del proxy, y solo elimina el sufijo `:443`.

### Guardado/eliminación de dominios: un único envío de mejor esfuerzo

`DomainController.save` escribe las filas de `domains` y luego hace una **única llamada de mejor esfuerzo** a `CaddyHelper.updateCaddy()`, envuelta en un `try/catch` que registra (`console.error`) y descarta el error; `delete` hace lo mismo (lo que además corrigió un bug previo de rutas obsoletas al eliminar), al igual que la eliminación de sitios secundarios (`SiteController.delete`). `updateCaddy` tiene además un tiempo de espera de **10 s** en Axios, así que un Caddy inaccesible o detenido nunca puede devolver un `500` al guardar un dominio: la tabla `domains` es la fuente de verdad.

### Estado actual: configuración estática, sin estado de tiempo de ejecución

La caja (una EC2 con Windows detrás de la IP elástica permanente) ejecuta Caddy con un **Caddyfile estático**: TLS bajo demanda cuyo `ask` apunta a `/membership/domains/authorize`, más un archivo de mapa host→upstream que se actualiza cada 5 minutos desde `/membership/domains/hostmap` mediante una tarea programada que termina en un `caddy reload` controlado. La configuración sobrevive a los reinicios sin ningún estado de tiempo de ejecución — sin el ritual de re-cebado — y un SNI desconocido recibe un **rechazo TLS** (no se crea ningún certificado para un host que `authorize` rechaza), mientras que un host autorizado pero aún no mapeado (un dominio nuevo dentro de la ventana de sincronización) recibe un 404 limpio. Los dominios nuevos se pueden enrutar en unos 5 minutos tras guardarlos; sus certificados se crean en el primer acceso. Construcción/configuración, operación y trampas probadas en campo: [Proxy Caddy para dominios personalizados](../deployment/caddy-proxy).

### Empuje heredado en tiempo de ejecución: ruta de reversión, pendiente de eliminación

`CaddyHelper` (módulo de membresía) todavía puede controlar Caddy a través de su **API de administración** en `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; sin efecto si no están definidos; se muestra en el grupo Integrations de `ServerHealthController`): `updateCaddy()` hace PATCH de un arreglo completo de rutas, e `initializeCaddy()` más los endpoints `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` reconstruyen desde cero un servidor configurado en tiempo de ejecución. La configuración de ese modo vivía solo en la memoria de Caddy: la "amnesia por reinicio" que esta arquitectura reemplazó. El mecanismo permanece únicamente como ruta de reversión y está programado para eliminarse cuando la caja estática haya sido estable; el empuje de mejor esfuerzo `updateCaddy()` al guardar/eliminar dominios es un no-op inofensivo contra la caja estática (su API de administración solo es accesible desde localhost).

## Páginas relacionadas

- [Proxy Caddy para dominios personalizados](../deployment/caddy-proxy) — la caja del borde en sí: configuración desde cero, servicio WinSW, tarea de sincronización del mapa y trampas operativas
- [Creador de sitios web](./website-builder) — el árbol de páginas/secciones/elementos, los renderizadores, el blog, SEO y la generación con IA (lo que se renderiza una vez que la solicitud se resuelve a una iglesia/sitio)
- [Endpoints de Content](../api/endpoints/content) — la superficie REST de páginas, bloques, enlaces y estilos globales, todos ya con soporte de `?siteId=`
- [B1App](../web-apps/b1-app) — la aplicación Next.js que aloja el middleware y el enrutamiento `[sdSlug]`
- [Despliegue de aplicaciones web](../deployment/web-apps) — cómo se despliega B1App en Vercel
