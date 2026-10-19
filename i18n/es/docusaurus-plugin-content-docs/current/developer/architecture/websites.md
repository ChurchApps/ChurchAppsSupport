---
title: "Enrutamiento de sitios web y multisitio"
---

# Enrutamiento de sitios web y multisitio

<div class="article-intro">

Una sola iglesia ahora puede ofrecer más de un sitio web distinto, y cada uno puede estar en un subdominio `*.b1.church` o en un dominio personalizado propiedad de la iglesia. Esta página describe la capa de enrutamiento que está *debajo* del constructor: cómo una solicitud entrante se resuelve a una iglesia **y** a un sitio específico, el modelo de datos multisitio (el valor centinela `siteId` que mantiene sin cambios todos los sitios existentes) y el borde de dominios personalizados: un proxy Caddy administrado por nosotros en EC2 que termina TLS y reescribe cada dominio de la iglesia hacia su upstream `*.b1.church`. Para ver lo que se muestra una vez que una solicitud se ha resuelto (el árbol de páginas, secciones y elementos), consulte [Constructor de sitios web](./website-builder).

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

Tres reglas se cumplen en toda esta capa:

1. **Un centinela mantiene la compatibilidad con versiones anteriores.** `siteId = ''` es el sitio principal. Cada página, bloque, enlace, estilo global y fila de dominio que existía antes de esta función tiene `''` y se muestra exactamente igual que antes. Un *segundo* sitio web es simplemente un conjunto de filas con un `siteId` no vacío, y cualquier endpoint de contenido llamado sin `?siteId=` devuelve el sitio principal, exactamente la misma solicitud de antes.
2. **La resolución se basa en la etiqueta del host y converge.** Un subdominio `*.b1.church` se enruta directamente por su etiqueta de host; un dominio personalizado se reescribe a su etiqueta `{sub}.b1.church` en el borde de Caddy antes de que B1App lo vea (con una búsqueda en la base de datos en el middleware que establece un encabezado `x-site` como alternativa para cualquier `Host` personalizado sin procesar). Ambas vías llegan a la misma ruta `[sdSlug]` y a la misma llamada `churches/lookup`, por lo que el renderizado posterior es idéntico.
3. **El borde Caddy no tiene estado sobre una única fuente de verdad.** Los dominios personalizados terminan en un proxy Caddy administrado por nosotros en EC2 que reescribe cada dominio hacia su upstream `{sub}.b1.church`. Al guardar un dominio se dispara una única llamada `CaddyHelper.updateCaddy()` de mejor esfuerzo, y Caddy también lee directamente la tabla `domains` (los endpoints `authorize` y `hostmap` que se describen más abajo). La tabla es la autoridad: un Caddy inalcanzable nunca puede hacer fallar un guardado.

## Resolución de sitios

### Subdominios `*.b1.church`

`B1App/next.config.mjs` reescribe las solicitudes entrantes según el host. Una regla de host con el patrón `(?<subdomain>.*?)\..*` captura la **primera etiqueta** del host y reescribe `/` y `/:path*` a `/{subdomain}`, es decir, el segmento de App Router `[sdSlug]`. Por lo tanto, `grace.b1.church/about` se convierte en `/grace/about`.

Dentro de `src/app/[sdSlug]/`, `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) llama a `GET /membership/churches/lookup/?subDomain={sdSlug}`. La respuesta de `ChurchController.getBySubDomain` ahora tiene dos ramas:

| El slug coincide con | Respuesta | Significado |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Sitio principal de esa iglesia |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Un **sitio secundario**: el controlador recurre a `sites`, resuelve la iglesia propietaria y devuelve el slug consultado junto con el `siteId` adicional |

Ese `siteId` adicional es lo único que distingue una solicitud de sitio secundario de una del sitio principal; todo lo demás en el flujo es compartido.

Un slug que no coincide con ninguna de las dos tablas devuelve `{}` con un `200`. `ConfigHelper.load` trata una respuesta sin `id` como un sitio desconocido y llama a `notFound()` de Next, de modo que un subdominio desconocido obtiene un 404 real en lugar de que todas las llamadas posteriores pidan `/…/undefined`. La ruta de la página del constructor también construye su ruta de árbol con `pageTreePath()` (`src/helpers/pageTreePath.ts`), que codifica el slug como URL; por lo tanto, un slug mal formado (barras invertidas, espacios) produce un 404 en lugar de convertir el `400` de la API en un 500.

### Dominios personalizados {#custom-domains}

Un dominio propiedad de la iglesia termina en el **borde Caddy** (descrito más abajo), que reescribe el encabezado `Host` al `{sub}.b1.church` del sitio antes de hacer proxy hacia B1App. Así, en la ruta normal B1App recibe un host *interno* `*.b1.church` y lo resuelve por etiqueta de host exactamente igual que un subdominio nativo; la búsqueda en base de datos del middleware nunca se activa. `src/middleware.ts` sigue ejecutándose en cada solicitud, pero con una tarea siempre activa y una alternativa:

1. **Siempre**: **elimina cualquier encabezado `x-site` enviado por el cliente**. Ese encabezado es una entrada de reescritura suplantable y solo se confía en él cuando el propio middleware lo establece; eliminarlo es la función real del middleware detrás de Caddy.
2. **Alternativa, solo para `Host` no interno**: para un `Host` de dominio personalizado sin procesar que llega a B1App *sin* la reescritura de Caddy, llama a `GET /membership/domains/public/lookup/{host}` y, si eso devuelve un `subDomain`, establece `x-site: {subDomain}.b1.church`. Detrás de Caddy esta rama está inactiva porque el `Host` ya es `*.b1.church`.

Los hosts internos (`localhost`, `b1.church` y los sufijos `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app`) omiten la búsqueda por completo: ya se resuelven mediante la reescritura por etiqueta de host, o son hosts de vista previa o de despliegue.

La búsqueda en sí (`DomainRepo.loadByName`) hace un left join de `domains → churches` y `domains → sites` y devuelve `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)`: el subdominio del sitio secundario asignado si el dominio apunta a uno, o si no, el de la iglesia. Primero busca el host exacto; si ese host empezaba con `www.` y no encontró nada, vuelve a intentar **una vez** con el dominio raíz sin `www.`.

De vuelta en `next.config.mjs`, las reglas de reescritura de `x-site` se colocan **antes** de las reglas genéricas de host, por lo que tienen prioridad. `x-site: grace.b1.church` → primera etiqueta `grace` → `[sdSlug] = grace`, y a partir de ahí la resolución es idéntica a la ruta por subdominio (mismo `churches/lookup`, mismo `siteId`).

:::info
El encabezado `x-site` no es confiable desde el exterior. El middleware elimina incondicionalmente cualquier `x-site` entrante antes de establecer el suyo, y las reglas de reescritura solo ven el valor establecido por el middleware: un cliente no puede forzarse hacia el contenido de otra iglesia enviando un encabezado.
:::

Dos detalles operativos del middleware:

- **Caché.** El resultado de cada host (un acierto *o* una falta confirmada, nunca un error de red) se guarda en caché durante **10 minutos** en un `Map` en memoria, por aislamiento serverless.
- **Matcher.** El matcher vuelve a incluir deliberadamente `/sitemap.xml`, `/robots.txt` y `/manifest.webmanifest`. Su primer patrón excluye las rutas con punto, lo que de otro modo eliminaría esos archivos; se vuelven a añadir para que los archivos SEO/PWA por iglesia de un dominio personalizado también reciban el encabezado `x-site`.
- **Encabezado canónico.** Para las páginas de la iglesia, el middleware añade un encabezado de respuesta `Link: <{proto}://{host}{path}>; rel="canonical"` que indica el host desde el que se sirvió realmente la página: subdominio o dominio personalizado (`helpers/canonicalLink.ts`). Se omite en hosts que no son de iglesia (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) y en `/mobile`, `/login`, `/logout` y los archivos robots/sitemap/manifest generados.

### Sitio web público deshabilitado

Una iglesia puede activar **Deshabilitar sitio web público** en B1Admin (configuración de contenido a nivel de iglesia `hidePublicSite = "true"`). El sitio entonces sirve solo sus rutas para miembros:

- **El middleware de B1App** busca el subdominio (`/membership/churches/lookup` y luego `/content/settings/public/:churchId`) y redirige las solicitudes anónimas a cualquier ruta fuera de la lista permitida hacia `/login?returnUrl={path}{query}`. La lista permitida (`helpers/publicSite.ts`) es `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register` y los archivos manifest/robots/sitemap. Solo se guardan en caché las respuestas confirmadas (60 segundos en producción, ya que la llamada de revalidación del administrador no puede limpiar este mapa por instancia; sin caché en desarrollo y pruebas). Un error de la API sirve el sitio en lugar de bloquear a todos.
- **Los miembros que han iniciado sesión ven el sitio completo.** Una solicitud que lleva una cookie `jwt` no vencida (`hasSession()` del middleware decodifica el `exp` del payload sin verificar la firma; esto es una barrera blanda, no control de acceso) omite la redirección, de modo que, tras iniciar sesión, un miembro vuelve a la página que pidió y ve las páginas normales, las páginas integradas (Grupos, Sermones, etc.) y la navegación del encabezado. Los componentes de página y `Header` ya no comprueban `hidePublicSite` por sí mismos.
- **`robots.txt`** deshabilita todo, como en los hosts noindex.
- **API.** `GET /content/pages/public/:churchId` (la lista de páginas del sitemap) devuelve `[]`, de modo que los llamadores anónimos no pueden listar las páginas.

### Propagación de `siteId`

`ConfigHelper` guarda el `siteId` resuelto en su `ConfigurationInterface` por solicitud (memorizado con `cache()` de React) y añade `?siteId=` a las llamadas de contenido que él y los componentes de página realizan, **de forma condicional**: un `siteId` vacío (un subdominio de iglesia principal) omite el parámetro por completo. Los endpoints que lo reciben son el árbol de páginas (`/content/pages/:id/tree`), la lista pública de páginas usada por el sitemap (`/content/pages/public/:id`), los estilos globales (`/content/globalStyles/church/:id`), los enlaces de navegación (`/content/links/church/:id`) y el bloque de pie de página independiente (`/content/blocks/public/footer/:id`). En la ruta de renderizado normal, el pie de página llega dentro del árbol de páginas (secciones marcadas con `zone: "siteFooter"`), ya obtenido con `siteId`, así que no hay ningún hueco de pie de página sin alcance.

El portal de miembros (B1App `mobile`) queda intencionadamente fuera de esto: `loadChurchAppearance.ts` resuelve la iglesia mediante `churches/lookup` pero lee `/settings/public/{id}` a nivel de iglesia y nunca propaga `siteId`; el portal es para toda la iglesia en la versión 1 (véase más abajo).

## Varios sitios web por iglesia

### Modelo de datos

La nueva tabla `membership.sites` es deliberadamente pequeña:

| Columna | Tipo | Notas |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Iglesia propietaria |
| `name` | `varchar(255)` | Nombre para mostrar (por ejemplo, "Español", "Jóvenes") |
| `subDomain` | `varchar(45)` | **Índice único**: espacio de nombres global (véase abajo) |

El alcance por sitio es entonces una única columna no anulable añadida a las tablas de contenido y de dominios:

| Tabla (módulo) | Columna | `''` significa |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | El dominio sirve el sitio principal |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Sitio principal, y en **`blocks`**, `''` además significa *compartido entre todos los sitios* |

Dos migraciones añaden todo esto (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Como la columna tiene por defecto `''`, cada fila existente conserva el comportamiento actual sin necesidad de relleno de datos.

**Espacio de nombres global de subdominios.** `sites.subDomain` comparte *un único* espacio de nombres con `churches.subDomain`: el subdominio de un sitio nunca puede colisionar con el de una iglesia o con el de otro sitio. Esto se aplica en **ambas** rutas de guardado: `SiteController.save` rechaza un slug que coincida con `churches` o con `sites`, y `ChurchController.validateSave` hace lo mismo en sentido inverso. Un índice único en `sites.subDomain` lo respalda a nivel de base de datos.

**La unicidad de páginas** se amplió de `(churchId, url)` a `(churchId, siteId, url)`, de modo que dos sitios de una misma iglesia pueden tener cada uno su propio `/about`.

### Contenido por sitio, con alternativas

Cada endpoint de **lista/árbol** de contenido con alcance por sitio acepta un `?siteId=` opcional (ausente ⇒ `''` = principal): lista/árbol/públicas de páginas, lista/por tipo/pie de página de bloques, enlaces (anónimos / filtrados / todos) y estilos globales. Las secciones y los elementos *no* tienen alcance directo: lo heredan de su página o bloque padre.

Dos cadenas de resolución hacen el trabajo interesante:

- **Estilos globales: `sitio → principal → predeterminado`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` devuelve la fila propia del sitio; si un sitio secundario no tiene ninguna, devuelve la fila **principal (`''`) tal cual** (conservando el `id`/`siteId` del principal, que el cliente usa para copiar al escribir); si tampoco hay principal, `GlobalStyleController` devuelve una paleta y tipografías predeterminadas codificadas.
- **Bloque de pie de página: gana el específico del sitio, y si no existe se usa el compartido.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` devuelve las filas compartidas (`''`) *y* las específicas del sitio; el resolutor elige el pie propio del sitio si existe, o el compartido en caso contrario. La misma lógica se ejecuta tanto en `TreeHelper.insertBlocks` (árbol de páginas) como en el endpoint independiente `/content/blocks/public/footer/:churchId`.

### Eliminación en cascada de un sitio

`SiteController.delete` (protegido por el permiso de Configuración→Editar de membresía) elimina un sitio secundario en tres pasos:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` elimina en cascada todo el contenido que posee el sitio: sus **páginas** → sus secciones, elementos, `pageHistory` y `posts`; sus propios **bloques** → sus secciones, elementos y `pageHistory`; sus **enlaces** y **globalStyles**. Una guarda impide ejecutarlo para `''`: el centinela principal/compartido nunca se elimina en cascada.
2. `DomainRepo.clearSiteId` **reasigna** los dominios del sitio al principal (`siteId → ''`) en lugar de eliminarlos, de modo que un dominio personalizado sobrevive a la eliminación del sitio.
3. La fila de `sites` se elimina y las rutas de Caddy se vuelven a sincronizar (de mejor esfuerzo).

### Superficie de B1Admin

| Capacidad | Dónde | Mecanismo |
|-----------|-------|-----------|
| Selector de sitio | `useSiteSelection` + `SiteSwitcher` (vacío = "Sitio web principal") | Lee un parámetro de URL `?site=` y lo pasa como `?siteId=` en las llamadas a ContentApi. Presente en las tres áreas de **lista** de sitios (**Páginas**, **Bloques**, **Apariencia**), pero *no* en los editores de página/bloque, que llevan `siteId` en el registro |
| Crear/eliminar sitios | `SitesDialog`, abierto desde la entrada "Administrar sitios web…" del selector | `POST /membership/sites` / `DELETE /membership/sites/:id` (nombre + subDomain). Protegido por el permiso de Configuración→Editar de membresía (`Permissions.settings.edit` en el servidor; `Permissions.membershipApi.settings.edit` en B1Admin). **Solo crear/eliminar: no hay interfaz para renombrar en la versión 1** |
| Asignación de sitio por dominio | `DomainSettingsEdit` en Configuración→Dominios | Un desplegable de sitio por fila envía `siteId` por dominio a `/membership/domains`. La columna se oculta si la API no devuelve sitios (backend antiguo) |
| Estilos con copia al escribir | `StylesManager.prepareForSave` | Cuando la fila de estilo global cargada tiene un `siteId` que no coincide con el sitio seleccionado (es decir, la API devolvió el principal heredado como alternativa), elimina el `id` del principal y pone el `siteId` actual, forzando una **inserción** de una nueva fila específica del sitio en lugar de sobrescribir el principal. La misma bifurcación al no coincidir se aplica al bloque de pie de página del sitio |

:::info
**Lo que sigue siendo a nivel de toda la iglesia en la versión 1 (una decisión de alcance deliberada, no un límite del modelo de datos):** el **blog** (`BlogPage` no tiene selector y carga `/posts` sin `siteId`), los **widgets del sitio** (banner de anuncios + lanzador), las **redirecciones**, el **logotipo / GA4 / configuración de la iglesia** y el **portal de miembros** (B1App mobile). Tenga en cuenta que esto *no* es "toda la Apariencia": los estilos globales de un sitio secundario (paleta, tipografías, espaciado, navegación, CSS personalizado) **sí** son por sitio mediante la ruta de copia al escribir descrita arriba; solo los subpaneles de banner/lanzador/redirecciones/logotipo de la página Apariencia siguen siendo a nivel de iglesia.
:::

## Dominios personalizados: borde Caddy (plan de configuración estática)

:::info
**Dirección revisada el 2026-07-02.** Un plan anterior para trasladar el alojamiento de dominios personalizados a dominios gestionados por Vercel fue **cancelado**, y todo el código de registro de dominios en Vercel (`VercelHelper`, sus variables de entorno `vercelToken`/`vercelProjectId`/`vercelTeamId`, los parámetros de SSM y las entradas de salud) se eliminó de la API. El **proxy Caddy administrado por nosotros en EC2 se mantiene** como borde permanente para dominios personalizados. El único trabajo pendiente es interno: sustituir la configuración *en tiempo de ejecución* de la API de administración de Caddy por una configuración *estática* que sobreviva a los reinicios.
:::

### El borde

Cada dominio personalizado de iglesia apunta por DNS a una única caja EC2: `3.23.251.61`, también accesible como `proxy.b1.church`. La pantalla Configuración→Dominios de B1Admin indica a las iglesias que añadan un `A` del dominio raíz → `3.23.251.61` o un `CNAME` → `proxy.b1.church`. Caddy termina TLS con un certificado Let's Encrypt por dominio, reescribe el encabezado `Host` al upstream `{sub}.b1.church` del dominio y hace proxy inverso hacia B1App, que luego enruta por etiqueta de host como cualquier subdominio nativo (véase [Dominios personalizados](#custom-domains) más arriba).

El mapeo del upstream proviene de `DomainRepo.loadPairs`, cuyo destino usa `COALESCE` sobre el subdominio del sitio asignado, de modo que un dominio hace proxy hacia el *sitio secundario* correcto, recurriendo al principal de la iglesia si no existe:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Las filas `www.*` se excluyen del mapa; Caddy sirve `www.{host}` mediante una redirección `302` al dominio raíz.

### Dos endpoints anónimos alimentan el borde

`DomainController` expone dos endpoints de solo lectura y sin autenticación que la caja consume directamente; son anónimos por necesidad, ya que el borde consulta antes de que exista ningún contexto de iglesia:

| Endpoint | Devuelve | Función |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | `200` si el dominio (o, para un fallo con `www.`, su raíz) existe en `domains`; `404` en otro caso (incluido un `domain` vacío) | El **`ask` de TLS bajo demanda** de Caddy: el control de abuso que decide si emitir un certificado para un SNI entrante |
| `GET /membership/domains/hostmap` | `text/plain`, una línea ordenada `{domain} {sub}.b1.church` por cada dominio enrutable | El archivo de mapa host→upstream que la caja actualiza con un temporizador |

`authorize` reutiliza `DomainRepo.loadByName` (host exacto, y luego un reintento `www.`→raíz); `hostmap` reutiliza `loadPairs`, por lo que es consciente del sitio y excluye `www.*`, idéntico a las rutas del proxy, y simplemente elimina el sufijo `:443`.

### Guardar/eliminar dominio: un único envío de mejor esfuerzo

`DomainController.save` escribe las filas de `domains` y luego hace una única llamada `CaddyHelper.updateCaddy()` de mejor esfuerzo, envuelta en un `try/catch` que registra (`console.error`) y descarta el error; `delete` hace lo mismo (lo que además corrigió un error previo de rutas obsoletas al eliminar), al igual que la eliminación de sitios secundarios (`SiteController.delete`). `updateCaddy` está limitado por un tiempo de espera de Axios de **10 s**, así que un Caddy inalcanzable o detenido nunca puede devolver un `500` al guardar un dominio: la tabla `domains` es la fuente de verdad.

### Estado actual: configuración estática, sin estado en tiempo de ejecución

La caja (una EC2 con Windows detrás de la IP elástica permanente) ejecuta Caddy con un **Caddyfile estático**: TLS bajo demanda cuyo `ask` apunta a `/membership/domains/authorize`, más un archivo de mapa host→upstream que se actualiza cada 5 minutos desde `/membership/domains/hostmap` mediante una tarea programada que termina en un `caddy reload` controlado. La configuración sobrevive a los reinicios sin ningún estado en tiempo de ejecución (no hay que volver a preparar nada), y un SNI desconocido se **rechaza en TLS** (no se genera ningún certificado para un host que `authorize` rechaza), mientras que un host autorizado pero aún no mapeado (un dominio nuevo dentro de la ventana de sincronización) recibe un 404 limpio. Los nuevos dominios pueden enrutarse en unos 5 minutos tras un guardado; sus certificados se generan en la primera visita. Construcción/configuración, operación y trampas detectadas en campo: [Proxy de dominios personalizados con Caddy](../deployment/caddy-proxy).

### Envío en tiempo de ejecución heredado: ruta de reversión, pendiente de eliminación

`CaddyHelper` (módulo de membresía) todavía puede controlar Caddy a través de su **API de administración** en `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; no hace nada si no están definidos; se muestra en el grupo Integraciones de `ServerHealthController`): `updateCaddy()` hace PATCH de un array completo de rutas, y `initializeCaddy()` más los endpoints `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` reconstruyen desde cero un servidor configurado en tiempo de ejecución. En ese modo, la configuración vivía solo en la memoria de Caddy: la "amnesia tras reinicio" que esta arquitectura sustituyó. Ese mecanismo se conserva únicamente como ruta de reversión y está programado para eliminarse una vez que la caja estática haya sido estable; el envío `updateCaddy()` de mejor esfuerzo al guardar/eliminar un dominio es una operación inofensiva contra la caja estática (su API de administración solo es accesible desde localhost).

## Páginas relacionadas

- [Proxy de dominios personalizados con Caddy](../deployment/caddy-proxy): la propia caja del borde: configuración desde cero, servicio WinSW, tarea de sincronización del mapa y trampas operativas
- [Constructor de sitios web](./website-builder): el árbol de páginas/secciones/elementos, los renderizadores, el blog, el SEO y la generación con IA (lo que se muestra una vez que una solicitud se ha resuelto a una iglesia/sitio)
- [Endpoints de contenido](../api/endpoints/content): la superficie REST para páginas, bloques, enlaces y estilos globales, ahora todos con reconocimiento de `?siteId=`
- [B1App](../web-apps/b1-app): la aplicación Next.js que aloja el middleware y el enrutamiento `[sdSlug]`
- [Despliegue de aplicaciones web](../deployment/web-apps): cómo se despliega B1App en Vercel
