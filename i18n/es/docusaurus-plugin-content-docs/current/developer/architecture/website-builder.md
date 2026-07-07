---
title: "Arquitectura del Constructor de Sitios Web"
---

# Arquitectura del Constructor de Sitios Web

<div class="article-intro">

Cada sitio web de iglesia servido por B1App se renderiza desde un árbol de contenido — páginas, secciones, elementos — almacenado en ContentApi y editado visualmente en B1Admin. Una biblioteca de componentes compartidos renderiza tanto la vista previa del editor como el sitio en vivo, un catálogo de tipo de elemento único define qué puede aparecer en una página, y un servicio de IA separado puede generar o reescribir ese árbol. Esta página mapea toda la pila: el contrato de elemento en `@churchapps/helpers`, la canalización de renderización, elementos de datos de iglesia, widgets de todo el sitio, la capa de blog, páginas de acceso cerrado, SEO, generación de IA, y formularios conversacionales.

</div>

## Descripción General

```
┌──────────────────────────────┐             ┌─────────────────────────────────────────┐
│  B1Admin — editor            │             │  Api — módulo /content (ContentApi)     │
│  ContentEditor · SectionEdit │  POST /…    │                                         │
│  ElementEdit · PageLinkEdit  │ ──────────▶ │  páginas ─ secciones ─ elementos bloques│
│  SiteWidgetsEdit · Blog      │             │  posts   redirects   settings   styles  │
└──────────┬───────────────────┘             └───────────────┬─────────────────────────┘
           │                                                 │ GET /content/pages/:churchId/tree?url=…
           │        canalización de renderización compartida │            (anon, JWT honored)
           │   ┌───────────────────────────────┐   ┌─────────────────────────────────┐
           └──▶│  @churchapps/helpers          │◀──│  B1App — sitio público (Next.js)│
               │    ElementTypes.ts (catálogo) │   │  Zone → Section → Element       │
               │  @churchapps/apphelper        │   │  + widgets, JSON-LD, sitemap,   │
               │    ElementRegistry, renderers │   │    redirects, 404 marcado       │
               │    SectionDivider, widgets    │   │                                 │
               └───────────────────────────────┘   └───────────────┬─────────────────┘
┌──────────────────────────────┐                                   │ elementos de datos de iglesia
│  AskApi — /website/* (IA)    │             ┌─────────────────────────────────────────┐
│  generateSite · rewriteSection│            │  /giving/funds/public/…/total           │
│  generateAltText · metaDesc  │             │  /membership/groupmembers/public/…      │
│  devuelve JSON; B1Admin guarda│             │  /attendance/servicetimes/public/…      │
└──────────────────────────────┘             └─────────────────────────────────────────┘
```

Tres reglas se mantienen en toda la pila:

1. **Un árbol, dos renderizadores.** Una página es un árbol `pages → sections → elements` donde cada nodo lleva su configuración como un blob JSON `answers`. Los mismos componentes de apphelper renderizan el editor arrastrable en B1Admin y el sitio renderizado en el servidor público en B1App — no hay formato "publicación" separado.
2. **El contrato vive en `@churchapps/helpers`.** `ElementTypes.ts` es el catálogo único de tipos de elemento; los renderizadores se resuelven a través de un registro en apphelper; los formularios del editor viven en B1Admin. Agregar un tipo de elemento significa tocar los tres, en ese orden.
3. **El sitio público lee extremos anónimos.** Todo lo que B1App necesita — el árbol de página, configuración, publicaciones de blog, redirecciones, y los extremos de datos de iglesia en otros módulos — es público. La autenticación es opcional: un JWT en el extremo del árbol anónimo desbloquea páginas solo para miembros, nada más cambia.

## El árbol de contenido

El módulo de contenido (`Api/src/modules/content`) posee los datos del constructor:

| Tabla | Rol |
|-------|------|
| `pages` | Una página por URL: `url`, `title`, `layout`, más `visibility`/`groupIds` (cierre de acceso) y `metaDescription` (SEO) |
| `sections` | Bandas horizontales en una página (o en un bloque): fondo, color del texto, y un `answersJSON` que lleva el estilo más las configuraciones de forma de divisor `dividerTop`/`dividerBottom` |
| `elements` | Piezas de contenido dentro de una sección: `elementType` + `answersJSON`, anidables para tipos de disposición (fila/columna, carrusel) |
| `blocks` | Grupos de sección/elemento reutilizables (bloques de pie, bloques de elemento) compartidos entre páginas |
| `posts` | Metadatos de blog sobre una página normal de constructor (ver [Blog](#blog-posts-over-pages)) |
| `redirects` | Pares por iglesia `fromPath → toPath`, limitado a 200 (ver [SEO](#seo-and-discoverability)) |
| `settings` | Configuración de clave-valor de iglesia; filas marcadas `public` se sirven anónimamente y llevan la configuración de widget/análisis |

Todo el árbol para una URL vuelve de una única llamada anónima — `GET /content/pages/:churchId/tree?url=/about` — que es lo que B1App renderiza desde el servidor. Las solicitudes del editor obtienen por id en su lugar y mantienen ids internos.

## El contrato del elemento

### El catálogo (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` define cada tipo de elemento como un `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults`, y un `answersSchema` de estilo de esquema JSON para sus respuestas. `validateElementAnswers()` deliberadamente es permisivo — tipos desconocidos y claves adicionales pasan, para que el contenido antiguo nunca se rompa en una actualización de catálogo. **35 tipos se envían hoy:**

| Categoría | Tipos de elemento |
|----------|---------------|
| disposición (6) | fila, columna, caja, carrusel, espacioEnBlanco, bloque |
| contenido (11) | texto, textoCon Foto, tarjeta, faq, características de icono, testimonio, íconos sociales, cuenta regresiva, estadísticas, tabla, enlace de botón |
| medios (4) | imagen, galería, video, mapa |
| iglesia (12) | logo, sermones, transmisión, donación, enlace de donación, formulario, calendario, lista de grupos, grupos, progreso de campaña, cuadrícula de personal, tiempos de servicio |
| avanzado (2) | HTML sin procesar, iframe |

El elemento `sermons` es el más configurable de los tipos de iglesia: una respuesta de `layout` selecciona `browse` (el navegador completo heredado), `grid`, `list`, o `featuredLatest`, con `playlistId`, `itemCount`, `showTitles`, y `showDates` refinando las disposiciones que no son de exploración.

### Renderizadores (`@churchapps/apphelper`)

Los renderizadores viven en `Packages/apphelper/src/website/components/elementTypes/`, un componente por tipo, resuelto a través de `ElementRegistry.ts` — un mapa de dos capas donde `Element.tsx` registra el renderizador predeterminado para los 35 tipos (`registerDefaultElementRenderer`) y una aplicación anfitriona puede anular cualquiera de ellos en tiempo de ejecución (`registerElementRenderer`) sin bifurcar el paquete.

### Formularios del editor (B1Admin)

Los formularios de configuración por tipo del editor viven en `B1Admin/src/site/admin/elements/` — `ElementEdit.tsx` se bifurca a un componente dedicado (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) o un constructor de campo en línea por tipo. El espejo orientado a IA de este catálogo es la herramienta MCP `describe_page_builder` de la API (ver [Servidor MCP](../api/mcp)).

### Divisores de forma de sección

Las secciones pueden llevar divisores de forma decorativa en cualquiera de los bordes. La configuración vive en el `answersJSON` de la sección como objetos `dividerTop` / `dividerBottom` — `{ shape, color, height, flip }` con `shape` uno de `wave, waves, slant, curve, triangle, peaks`. Apphelper envía el componente `SectionDivider` y el ayudante `parseDividerConfig()`; los renderizadores de sección de ambas aplicaciones (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) analizan las respuestas y montan el divisor, y `SectionEdit.tsx` en B1Admin proporciona la interfaz de usuario del selector. Los paquetes solo envían el bloque de construcción — el cableado a nivel de sección es el trabajo de las aplicaciones consumidoras.

## Elementos de datos de iglesia

Tres tipos de elemento renderizan datos vivos de la iglesia en lugar de contenido escrito. El aislamiento del módulo aún se aplica — cada uno llama al extremo público del módulo propietario desde el navegador:

| Elemento | Extremo | Notas |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Devuelve `{ fundId, totalAmount, donationCount }`, ventana `?startDate=&endDate=` opcional; el elemento la compara contra su respuesta `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Solo opcionalmente**: el grupo debe tener `publicRoster` establecido (desactivado de forma predeterminada). La proyección es deliberadamente mínima — `personId`, `displayName`, `leader`, foto — sin campos de contacto o demográficos |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Devuelve el árbol campus → servicio → hora; el renderizador de apphelper emite schema.org `Event` JSON-LD de mejor esfuerzo desde él (la API devuelve datos simples) |

:::warning
`publicRoster` es la puerta de privacidad para `staffGrid`. Nunca amplíes la proyección pública de miembro de grupo o omitas la bandera — el extremo de la lista es anónimo por diseño y la lista de campos mínima es la propiedad de seguridad.
:::

## Widgets de todo el sitio

Dos widgets se renderizan en cada página pública en lugar de dentro del árbol: **AnnouncementBanner** (barra de despido de la parte superior de la página) y **Launcher** (centro de acción flotante para enlaces de estilo dar/visitar/ver). Tanto componentes como sus ayudantes `parse*Config()` se envían en apphelper. La configuración son dos filas de configuración públicas — claves `announcementBanner` y `launcher` — escritas por `SiteWidgetsEdit` de B1Admin (en la página Apariencia) y leídas por el diseño público de B1App a través de `GET /content/settings/public/:churchId`. La API trata estos como pares clave-valor opacos; los nombres de clave son una convención entre las dos aplicaciones.

## Blog: publicaciones sobre páginas

El blog es una capa de metadatos delgada, no un segundo sistema de contenido. Una fila `posts` (`title`, `slug`, `excerpt`, `authorId`, `photoUrl`, `publishDate`, `category`, `tags`) apunta a una página de constructor normal vía `pageId`; la página sostiene el cuerpo y se edita en el editor de página normal. Superficie pública (todos anónimos, `PostController`):

| Ruta | Propósito |
|-------|---------|
| `GET /content/posts/public/:churchId` | Publicaciones publicadas, filtrables por `?category=&tag=`, paginadas |
| `GET /content/posts/public/:churchId/slug/:slug` | Metadatos de una publicación |
| `GET /content/posts/rss/:churchId?siteUrl=` | Alimentación RSS 2.0 |

Una publicación es "publicada" una vez que `publishDate` está establecido y pasado. B1App sirve `/{sdSlug}/blog` (listado, con la alimentación RSS anunciada como enlace alternativo) y `/{sdSlug}/blog/[postSlug]`, que obtiene el árbol de respaldo en `/blog/{slug}` y lo renderiza a través de la misma canalización Zone/Section que cualquier otra página, agregando JSON-LD `BlogPosting`. Las URLs de blog se incluyen en el mapa del sitio por iglesia. La interfaz de usuario de autoría de B1Admin (**Sitio → Blog**) crea la página de respaldo en `/blog/{slug}` y la fila `posts` juntas.

## Páginas solo para miembros

`pages.visibility` reutiliza la enumeración de enlaces de navegación — `everyone` (predeterminado), `visitors`, `members`, `staff`, `team`, `groups` (con `groupIds`) — pero como una **puerta de acceso dura**, no un filtro de navegación (`PageVisibilityHelper.canViewPage`). El flujo:

1. El extremo del árbol anónimo verifica la visibilidad en búsquedas basadas en URL. Los llamadores anónimos de una página cerrada obtienen `{ restricted: true, visibility }` en lugar de contenido — el árbol nunca se filtra.
2. El extremo aún honra un JWT: `CustomAuthProvider` verifica el encabezado `Authorization` en *cada* solicitud, incluyendo rutas anónimas, para que la búsqueda de un miembro autenticado de la misma URL se resuelva normalmente.
3. B1App renderiza `RestrictedPage` en una respuesta `restricted`: hidrata la sesión de credenciales almacenadas, re-obtiene el árbol con el JWT, y lo renderiza — o muestra una puerta de inicio de sesión con un `returnUrl` cuando no hay sesión.

:::info
La granularidad de la puerta varía por nivel: `groups` verifica el `groupIds` del token contra la lista de la página y `staff` verifica `membershipStatus`, pero `members` y `team` actualmente pasan cualquier usuario autenticado de la iglesia. Trata `groups` como la opción estricta.
:::

## SEO y Discoveribilidad

Todo esto es renderización de B1App sobre datos de ContentApi — la API almacena, la aplicación emite:

| Preocupación | Cómo funciona |
|---------|--------------|
| Descripciones de meta | `pages.metaDescription` (≤300 chars) fluye a través de `MetaHelper.getMetaData()` a `Metadata` de Next.js (descripción + Open Graph) en cada ruta renderizada de constructor. Las configuraciones de página de B1Admin incluyen un botón "Generar" de IA (ver abajo) |
| Redirecciones | Filas por iglesia `redirects` administradas en `/content/redirects` (`content.edit`, límite de 200 filas, rutas normalizadas). En un 404 potencial, la ruta de página de B1App resuelve la ruta contra `GET /content/redirects/public/:churchId` y emite una redirección HTTP 308 a través de Next `permanentRedirect`; las rutas no coincidentes caen a través de `notFound()` |
| 404 Marcado | `not-found.tsx` renderiza `BrandedNotFound` con el logo de la iglesia, el nombre, y el tema en lugar de un error genérico |
| Datos Estructurados | `BlogPosting` JSON-LD en publicaciones de blog; `VideoObject` en las páginas por sermón (`/{sdSlug}/sermons/[sermonId]`) y en páginas que contienen un elemento `sermons`; `Event` desde elementos de calendario/evento en páginas de constructor; schema.org `Event` desde el elemento `serviceTimes` |
| Páginas de Sermón | Cada sermón público obtiene una página rastreable en `/sermons/[sermonId]` con metadatos completos — los sermones ya no están bloqueados dentro del elemento del navegador del lado del cliente |
| Análisis | La clave de configuración pública `ga4MeasurementId` (administrada junto a redirecciones en B1Admin) inyecta un gtag de GA4 por iglesia a través de `next/script` |
| Mapa del Sitio y Alimentaciones | La ruta de `sitemap.xml` por iglesia incluye páginas de constructor y URLs de blog; el listado de blog anuncia la alimentación RSS |
| Accesibilidad | El cromo público renderiza un enlace de omisión dirigido al hito `<main id="main-content">` en cada envoltura de disposición |

## Generación de IA (AskApi)

La generación de página y sitio se ejecuta en **AskApi**, un servicio separado, bajo el controlador `/website`. Se autentica con el mismo JWT `CustomAuthProvider` que todo lo demás y es **sin estado con respecto al contenido**: cada extremo devuelve JSON y el llamador (B1Admin) persiste el resultado a través de ContentApi (`POST /content/pages/temp/ai` guarda un paquete de página-secciones-elementos generado en una llamada).

:::info
A partir de 2026-07-03, los puntos de entrada de B1Admin a esta canalización — la plantilla "IA" del sitio en `AddPageModal`, el botón de reescritura `SectionToolbar`, y el botón "Generar Sitio" de la lista de páginas — están comentados del lado del cliente mientras la característica se reelabora. Los extremos de AskApi abajo no se ven afectados y aún responden; solo la interfaz de usuario de B1Admin está oculta.
:::

| Extremo | Propósito |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | El flujo de página original de dos pasos: esquema primero, luego una llamada por sección. El "AI" plantilla de página de B1Admin en `AddPageModal` impulsa esto — esquema, luego generación de sección paralela, luego vista previa |
| `POST /website/generateSite` | Generación de sitio completo. **Dos fases por diseño**: una llamada `planOnly: true` devuelve solo el plan de múltiples páginas (una llamada rápida de modelo), luego el cliente solicita contenido completo — manteniendo cada solicitud dentro del tiempo de espera de Lambda/API Gateway |
| `POST /website/rewriteSection` | Reescritura de estructura preservada: el modelo solo puede cambiar respuestas que llevan texto. Una firma de estructura recursiva (ids + tipos + orden) se compara antes y después; cualquier desajuste devuelve la sección original con `fallback: true` en lugar de estructura corrompida |
| `POST /website/generateAltText` | Llamada de visión sobre hasta 20 URLs de imagen; devuelve texto alt conciso (≤125 chars, prefijos "foto de" desenfundados) |
| `POST /website/generateMetaDescription` | Una descripción de meta SEO (≤155 chars) del contenido de texto de la página — cableado al botón Generar en la configuración de página de B1Admin |

Los avisos son archivos de marcado bajo `AskApi/config/instructions/`, incluyendo el catálogo de elemento que el modelo genera desde. Dos puntos de diseño mantienen el catálogo honesto: el cliente pasa `availableElementTypes` en cada solicitud (el aviso solo puede usar tipos de esa lista — el servidor nunca codifica el conjunto completo), y la herramienta MCP `describe_page_builder` de la API lleva la misma guía para agentes de IA que trabajan a través de [MCP](../api/mcp). Los modelos son Anthropic Claude a través de OpenRouter — 3.5 Haiku para contenido de sección (latencia), 3.5 Sonnet para esquemas, planes de sitio, y visión — con un retroceso de OpenAI cuando ninguna clave de OpenRouter está configurada.

## Formularios Conversacionales

Los formularios (módulo de membresía) ganaron un modo conversacional dirigido a páginas de estilo de tarjeta de conexión. Cuatro columnas en `forms` impulsan: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Renderización** — `FormSubmissionEdit` de apphelper cambia al componente `ConversationalForm` (una pregunta a la vez) cuando `displayMode` es `conversational`; la página de formulario de B1App pasa el modo a través. La misma carga útil de envío de cualquier forma.
- **Creación automática de persona** — en envío con `autoCreatePerson` establecido, `ConversationalFormHelper.findOrCreatePerson` dedup por correo (insensible a mayúsculas) y de lo contrario crea un hogar + persona con `membershipStatus: "Guest"`, luego vincula el envío a esa persona.
- **Correo de seguimiento** — cuando se establece un asunto y un cuerpo, el remitente obtiene un correo basado en plantilla (con tokens `{firstName}` / `{churchName}`) a través de la ruta transaccional existente (`TransactionalEmailHelper`), nunca la puerta de resumen de notificación. Ambos efectos secundarios no son fatales: una falla nunca pierde el envío.

Los cuatro campos se establecen a través de la API hoy; el editor de formulario de B1Admin aún no los expone.

## Páginas Relacionadas

- [Enrutamiento de Sitios Web y Multi-Sitio](./websites) — cómo una solicitud se resuelve a una iglesia/sitio y cómo se enrutan los dominios personalizados
- [Extremos de Contenido](../api/endpoints/content) — superficie REST completa para páginas, secciones, elementos, bloques, publicaciones, redirecciones, y configuración
- [AppHelper](../shared-libraries/app-helper) — el paquete npm que envía los renderizadores, registro, divisores, y widgets
- [Servidor MCP](../api/mcp) — incluyendo la herramienta de guía `describe_page_builder`
- [Editor de Página (usuario final)](/docs/b1-admin/website/page-editor) — la documentación del editor orientada al personal
