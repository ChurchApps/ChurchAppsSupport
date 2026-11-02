---
title: "Arquitectura del creador de sitios web"
---

# Arquitectura del creador de sitios web

<div class="article-intro">

Cada sitio web de iglesia que sirve B1App se renderiza a partir de un árbol de contenido (páginas, secciones, elementos) almacenado en ContentApi y editado visualmente en B1Admin. Una biblioteca de componentes compartida renderiza tanto la vista previa del editor como el sitio en vivo, un catálogo de tipos de elemento define lo que puede aparecer en una página, y un servicio de IA independiente puede generar o reescribir ese árbol. Esta página describe toda la pila: el contrato de elementos en `@churchapps/helpers`, la canalización de renderizado, los elementos de datos de la iglesia, los widgets de todo el sitio, la capa de blog, las páginas con control de acceso, el SEO, la generación con IA y los formularios conversacionales.

</div>

## Descripción general

```
┌──────────────────────────────┐             ┌─────────────────────────────────────────┐
│  B1Admin — editor            │             │  Api — módulo /content (ContentApi)     │
│  ContentEditor · SectionEdit │  POST /…    │                                         │
│  ElementEdit · PageLinkEdit  │ ──────────▶ │  pages ─ sections ─ elements   blocks   │
│  SiteWidgetsEdit · Blog      │             │  posts   redirects   settings   styles  │
└──────────┬───────────────────┘             └───────────────┬─────────────────────────┘
           │                                                 │ GET /content/pages/:churchId/tree?url=…
           │        canalización de renderizado compartida   ▼            (anónimo, se respeta el JWT)
           │   ┌───────────────────────────────┐   ┌─────────────────────────────────┐
           └──▶│  @churchapps/helpers          │◀──│  B1App — sitio público (Next.js)│
               │    ElementTypes.ts (catálogo) │   │  Zone → Section → Element       │
               │  @churchapps/apphelper        │   │  + widgets, JSON-LD, sitemap,   │
               │    ElementRegistry, renderers │   │    redirecciones, 404 con marca │
               │    SectionDivider, widgets    │   └───────────────┬─────────────────┘
               └───────────────────────────────┘                   │ elementos de datos de la iglesia
┌──────────────────────────────┐                                   ▼
│  AskApi — /website/* (IA)    │             ┌─────────────────────────────────────────┐
│  generateSite · rewriteSection│            │  /giving/funds/public/…/total           │
│  generateAltText · metaDesc  │             │  /membership/groupmembers/public/…      │
│  devuelve JSON; B1Admin guarda│            │  /attendance/servicetimes/public/…      │
└──────────────────────────────┘             └─────────────────────────────────────────┘
```

Tres reglas se cumplen en toda la pila:

1. **Un árbol, dos renderizadores.** Una página es un árbol `pages → sections → elements` en el que cada nodo guarda su configuración como un objeto JSON `answers`. Los mismos componentes de apphelper renderizan el editor de arrastrar y soltar de B1Admin y el sitio público renderizado en el servidor de B1App; no existe un "formato de publicación" aparte.
2. **El contrato vive en `@churchapps/helpers`.** `ElementTypes.ts` es el único catálogo de tipos de elemento; los renderizadores se resuelven a través de un registro en apphelper, y los formularios del editor viven en B1Admin. Agregar un tipo de elemento implica tocar los tres, en ese orden.
3. **El sitio público lee endpoints anónimos.** Todo lo que B1App necesita (el árbol de páginas, la configuración, las entradas del blog, las redirecciones y los endpoints de datos de la iglesia de otros módulos) es público. La autenticación es opcional: un JWT en el endpoint anónimo del árbol desbloquea las páginas solo para miembros, y nada más cambia.

## El árbol de contenido

El módulo de contenido (`Api/src/modules/content`) es propietario de los datos del creador:

| Tabla | Función |
|-------|---------|
| `pages` | Una página por URL: `url`, `title`, `layout`, además de `visibility`/`groupIds` (control de acceso) y `metaDescription` (SEO) |
| `sections` | Franjas horizontales de una página (o de un bloque): fondo, color de texto y un `answersJSON` que lleva el estilo y las configuraciones de forma de los divisores `dividerTop`/`dividerBottom` |
| `elements` | Piezas de contenido dentro de una sección: `elementType` + `answersJSON`, anidables en los tipos de diseño (fila/columna, carrusel) |
| `blocks` | Grupos reutilizables de secciones/elementos (bloques de pie de página, bloques de elementos) compartidos entre páginas |
| `posts` | Entradas de blog independientes (vea [Blog](#blog)) |
| `redirects` | Pares `fromPath → toPath` por iglesia, con un límite de 200 (vea [SEO](#seo-and-discoverability)) |
| `settings` | Configuración de la iglesia en pares clave-valor; las filas marcadas como `public` se sirven de forma anónima y llevan la configuración de widgets y analítica |

El árbol completo de una URL se obtiene con una sola llamada anónima — `GET /content/pages/:churchId/tree?url=/about` —, que es de donde B1App renderiza en el servidor. Las solicitudes del editor, en cambio, obtienen por ID y conservan los IDs internos.

## El contrato de elementos

### El catálogo (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` define cada tipo de elemento como un `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults` y un `answersSchema` de estilo JSON-schema para sus respuestas. `validateElementAnswers()` es deliberadamente permisivo: los tipos desconocidos y las claves adicionales pasan, así que el contenido antiguo nunca se rompe al actualizar el catálogo. **Hoy se incluyen 35 tipos:**

| Categoría | Tipos de elemento |
|-----------|-------------------|
| diseño (6) | row, column, box, carousel, whiteSpace, block |
| contenido (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| multimedia (4) | image, gallery, video, map |
| iglesia (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| avanzado (2) | rawHTML, iframe |

El elemento `sermons` es el más configurable de los tipos de iglesia: una respuesta `layout` elige `browse` (el explorador completo heredado), `grid`, `list` o `featuredLatest`, con `playlistId`, `itemCount`, `showTitles` y `showDates` como ajustes para los diseños que no son de exploración.

El elemento `rawHTML` tiene dos respuestas: `rawHTML` (marcado) y `javascript`. Los scripts insertados mediante `innerHTML` nunca se ejecutan, así que `RawHTMLElement` vuelve a crear cada nodo `<script>` del marcado como un elemento nuevo. Estos nodos no insertados por el parser son de confianza bajo el `strict-dynamic` de la CSP. Una respuesta `javascript` que empieza con `<` (un fragmento de un proveedor pegado con sus etiquetas `<script>`) se interpreta como marcado y recibe el mismo tratamiento. De lo contrario, se ejecuta como un script en línea simple. B1Admin marca una URL suelta en el cuadro de JavaScript, ya que una URL sola se ejecuta como un script sin efecto. El elemento `map` no muestra nada, ni carga el script de Google Maps, cuando no hay una clave de API de Maps configurada.

### Renderizadores (`@churchapps/apphelper`)

Los renderizadores viven en `Packages/apphelper/src/website/components/elementTypes/`, un componente por tipo, resueltos mediante `ElementRegistry.ts`: un mapa de dos capas en el que `Element.tsx` registra el renderizador predeterminado de los 35 tipos (`registerDefaultElementRenderer`), y una aplicación anfitriona puede reemplazar cualquiera de ellos en tiempo de ejecución (`registerElementRenderer`) sin hacer un fork del paquete.

### Formularios del editor (B1Admin)

Los formularios de configuración por tipo del editor viven en `B1Admin/src/site/admin/elements/`: `ElementEdit.tsx` despacha a un componente dedicado (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) o a un constructor de campos en línea por tipo. La versión orientada a IA de este catálogo es la herramienta MCP `describe_page_builder` de la API (vea [Servidor MCP](../api/mcp)).

La vista previa del editor monta el mismo `Theme` que el sitio en vivo, que establece las variables CSS `--headingFont` / `--bodyFont` a partir de los estilos globales de la iglesia. B1App aplica esas variables mediante `pages.css`, que B1Admin no puede importar, así que `ContentEditor.tsx` inyecta `EDITOR_PAGE_FONT_CSS` (`src/site/admin/editorCss.ts`) para aplicarlas al texto del cuerpo `.page` y a `h1`–`h6`. Sin eso, la vista previa mostraba los encabezados con la fuente del administrador.

### Divisores de forma en las secciones

Las secciones pueden llevar divisores decorativos con forma en cualquiera de sus bordes. La configuración vive en el `answersJSON` de la sección como objetos `dividerTop` / `dividerBottom`: `{ shape, color, height, flip }`, con `shape` como uno de `wave, waves, slant, curve, triangle, peaks`. Apphelper incluye el componente `SectionDivider` y el auxiliar `parseDividerConfig()`; los renderizadores de sección de ambas aplicaciones (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) interpretan las respuestas y montan el divisor, y `SectionEdit.tsx` en B1Admin proporciona el selector. Los paquetes solo incluyen el bloque de construcción; la conexión a nivel de sección corre por cuenta de las aplicaciones que lo usan.

## Elementos de datos de la iglesia

Tres tipos de elemento renderizan datos vivos de la iglesia en lugar de contenido creado a mano. Sigue aplicando el aislamiento de módulos: cada uno llama, desde el navegador, al endpoint público del módulo propietario:

| Elemento | Endpoint | Notas |
|----------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Devuelve `{ fundId, totalAmount, donationCount }`, con una ventana opcional `?startDate=&endDate=`; el elemento lo compara con su respuesta `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Solo por adhesión**: el grupo debe tener `publicRoster` activado (desactivado por defecto). La proyección es deliberadamente mínima: `personId`, `displayName`, `leader`, foto; sin campos de contacto ni demográficos |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Devuelve el árbol campus → servicio → horario; el renderizador de apphelper emite JSON-LD `Event` de schema.org de mejor esfuerzo a partir de él (la API devuelve datos simples) |

:::warning
`publicRoster` es la compuerta de privacidad de `staffGrid`. Nunca amplíe la proyección pública de miembros del grupo ni omita la bandera: el endpoint de la lista es anónimo por diseño, y la lista mínima de campos es la propiedad de seguridad.
:::

### El elemento Calendario y las páginas de eventos

Las respuestas del elemento `calendar` son `calendarType` (`group` | `curated`), `calendarId`, `display` (`month`, el predeterminado, o `upcoming`) y `tag`. B1App sobrescribe el renderizador de apphelper en `src/components/Element.tsx` con `registerElementRenderer("calendar", …)`:

- **`display: "upcoming"`** renderiza `UpcomingEventsElement` de B1App: carga `GET /content/events/public/group/:churchId/:groupId` o `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId`, expande las recurrencias con `buildOccurrences()` (`src/helpers/EventOccurrences.ts`, una ocurrencia por evento dentro de un año) y muestra las primeras 12 como mosaicos con foto (`events.photoUrl`, con el título sobre el color oscuro del tema como respaldo) que enlazan a `/events/{id}`, con un menú de Suscribirse para el feed ICS del calendario.
- **`display: "month"`** renderiza el `CalendarElement` de apphelper con una función `eventUrl`. `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` navegan a esa URL al hacer clic, en lugar de abrir el cuadro de detalle (B1Admin no pasa `eventUrl`, así que el calendario del administrador conserva su cuadro).
- **`tag`** filtra ambas visualizaciones con `EventHelper.hasTag()` (`@churchapps/helpers`): una coincidencia sin distinguir mayúsculas contra `events.tags`, separadas por comas; si está vacío, muestra todo. La unión del calendario seleccionado incluye `e.tags` para que los eventos seleccionados también lo lleven.

Los eventos seleccionados enlazan por `realEventId` (`eventPageId()`), así que la URL siempre nombra el evento subyacente. `/{sdSlug}/events/[eventId]` es una ruta dedicada (no pasa por la canalización del creador): carga `GET /content/events/public/:churchId/:id` (que devuelve `null` para eventos pendientes o rechazados y para eventos privados sin inscripción, y agrega `roomNames` de las reservaciones de salones no rechazadas), renderiza `EventPageContent` (encabezado con foto, descripción en markdown, panel lateral Cuándo/Dónde, **Inscribirse a este evento** cuando `registrationEnabled` está activo, y un enlace **Agregar a mi calendario** a `GET /content/events/public/:churchId/:id/ical`), usa la foto como imagen de Open Graph y emite JSON-LD `Event` para la siguiente ocurrencia mediante `EventPageJsonLd`. Un evento desconocido u oculto devuelve un 404 real.

## Widgets de todo el sitio

Dos widgets se muestran en cada página pública, fuera del árbol: **AnnouncementBanner** (barra superior descartable) y **Launcher** (centro de acciones flotante para enlaces tipo dar, visitar o ver). Ambos componentes y sus auxiliares `parse*Config()` vienen en apphelper. La configuración son dos filas públicas de ajustes, con las claves `announcementBanner` y `launcher`, escritas por `SiteWidgetsEdit` de B1Admin (en la página de Apariencia) y leídas por el diseño público de B1App mediante `GET /content/settings/public/:churchId`. La API trata estos como pares clave-valor opacos; los nombres de las claves son una convención entre las dos aplicaciones.

## Blog {#blog}

El blog es un tipo de contenido independiente, no una capa sobre las páginas del creador. Una fila de `posts` guarda la entrada completa: `title`, `slug`, `excerpt`, `content` (cuerpo en markdown), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. La superficie pública (todas anónimas, `PostController`):

| Ruta | Propósito |
|------|-----------|
| `GET /content/posts/public/:churchId` | Entradas publicadas, filtrables por `?category=&tag=`, con paginación |
| `GET /content/posts/public/:churchId/categories` | Categorías distintas de las entradas publicadas |
| `GET /content/posts/public/:churchId/slug/:slug` | Una entrada publicada |
| `GET /content/posts/rss/:churchId?siteUrl=` | Feed RSS 2.0, titulado con el nombre de la iglesia, con categoría por elemento y descripción (extracto o contenido) |

Una entrada se considera "publicada" una vez que `publishDate` está definido y ya pasó; una `publishDate` futura es una entrada programada (oculta al público, y se muestra con una etiqueta de Programada en el administrador). Los endpoints de lectura enriquecen cada entrada con `authorName`, resuelto desde `authorId` a través del gateway del módulo de membership. Los extractos que faltan recurren al contenido en markdown sin formato (~160 caracteres) en las tarjetas del listado, las meta descripciones y el RSS. B1App sirve `/{sdSlug}/blog`, un listado editorial (encabezado centrado que se convierte en el nombre de la categoría o etiqueta activa al filtrar, fila de filtros en forma de fichas de categoría, filas de entrada con miniatura a la izquierda, firma y extracto), con el feed RSS anunciado como enlace alterno, y `/{sdSlug}/blog/[postSlug]`, una ruta dedicada (no pasa por la canalización Zone/Section) con encabezado centrado (etiqueta de categoría, título, firma y una regla de acento en el color principal), una imagen principal 16:9 al ancho del contenedor, el cuerpo en markdown en una columna de lectura de ~720 px, fichas de etiquetas al pie del artículo, una franja de entradas relacionadas `"More in {category}"` y JSON-LD `BlogPosting` que incluye al autor. Ambas páginas se estilan por completo con tokens del tema, así que heredan la paleta de cada iglesia. Las URL del blog se incluyen en el sitemap de cada iglesia. La interfaz de redacción de B1Admin (**Site → Blog**) edita las entradas en un cuadro de diálogo: editor de markdown con interruptor de vista previa, selector de imagen de galería recortado a 16:9, selector de autor (por defecto, el usuario que edita), autocompletado de categorías a partir de las existentes, validación de slugs duplicados y un interruptor de publicación; las filas publicadas enlazan a la entrada en vivo, y la página recuerda a los administradores que agreguen un enlace de navegación a `/blog`. Los comentarios se dejan a servicios de terceros: una configuración pública de toda la iglesia, `blogFooterHtml` (se edita en **Below Every Post** en la página de Blog, y solo se muestra con Settings→Edit), se renderiza debajo de cada entrada mediante `BlogFooterEmbed` de B1App, que vuelve a crear las etiquetas `<script>` para que se ejecuten bajo `'strict-dynamic'` y las ejecuta en orden (un `src` externo termina de cargarse antes de que se ejecute el siguiente script en línea), ya que los fragmentos de proveedores cargan una biblioteca y luego la invocan.

## Páginas solo para miembros

`pages.visibility` reutiliza la enumeración de los enlaces de navegación (`everyone` por defecto, `visitors`, `members`, `staff`, `team`, `groups` con `groupIds`), pero como **compuerta de acceso estricta**, no como filtro de navegación (`PageVisibilityHelper.canViewPage`). El flujo:

1. El endpoint anónimo del árbol verifica la visibilidad en las consultas por URL. Quien llama de forma anónima a una página restringida recibe `{ restricted: true, visibility }` en lugar del contenido: el árbol nunca filtra información.
2. El endpoint sigue respetando un JWT: `CustomAuthProvider` verifica el encabezado `Authorization` en *cada* solicitud, incluidas las rutas anónimas, así que una consulta autenticada de un miembro a la misma URL se resuelve normalmente.
3. B1App renderiza `RestrictedPage` ante una respuesta `restricted`: hidrata la sesión desde las credenciales guardadas, vuelve a pedir el árbol con el JWT y lo renderiza; o bien muestra una compuerta de inicio de sesión con `returnUrl` cuando no hay sesión.

:::info
La granularidad de la compuerta varía según el nivel: `groups` compara los `groupIds` del token con la lista de la página, y `staff` verifica `membershipStatus`, pero `members` y `team` actualmente aceptan a cualquier usuario autenticado de la iglesia. Trate `groups` como la opción estricta.
:::

## SEO y visibilidad en buscadores {#seo-and-discoverability}

Todo esto es renderizado del lado de B1App sobre los datos de ContentApi: la API almacena, la aplicación emite:

| Aspecto | Cómo funciona |
|---------|---------------|
| Meta descripciones | `pages.metaDescription` (≤300 caracteres) pasa por `MetaHelper.getMetaData()` hacia el `Metadata` de Next.js (description + Open Graph) en cada ruta renderizada por el creador. La configuración de página de B1Admin incluye un botón "Generate" con IA (vea más abajo) |
| Redirecciones | Filas `redirects` por iglesia, administradas en `/content/redirects` (`content.edit`, límite de 200 filas, rutas normalizadas). Ante un posible 404, la ruta de página de B1App resuelve la ruta contra `GET /content/redirects/public/:churchId` y emite un HTTP 308 mediante `permanentRedirect` de Next; las rutas sin coincidencia pasan a `notFound()` |
| 404 con marca | `not-found.tsx` renderiza `BrandedNotFound` con el logotipo, el nombre y el tema de la iglesia en lugar de un error genérico. Las rutas desconocidas `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]` y `/volunteer/[planId]` devuelven un 404 real, igual que los subdominios desconocidos y los slugs de página mal formados (vea [Enrutamiento de sitios web y multisitio](./websites)) |
| Datos estructurados | JSON-LD `BlogPosting` en las entradas del blog; `VideoObject` en las páginas de cada sermón (`/{sdSlug}/sermons/[sermonId]`) y en las páginas que contienen un elemento `sermons`; `Event` a partir de los elementos de calendario/evento en las páginas del creador y en cada página `/{sdSlug}/events/[eventId]` (la siguiente ocurrencia, con la foto del evento como `image`); `Event` de schema.org a partir del elemento `serviceTimes` |
| Páginas de sermones | Cada sermón público tiene una página rastreable en `/sermons/[sermonId]` con metadatos completos: los sermones ya no están encerrados dentro del explorador del lado del cliente |
| Analítica | La clave de configuración pública `ga4MeasurementId` (administrada junto con las redirecciones en B1Admin) inyecta un gtag GA4 por iglesia mediante `next/script`. La aplicación B1 (`/{sdSlug}/mobile`) también envía sus vistas de página a ese ID, junto con la etiqueta propia de ChurchApps, cuando es un ID `G-` válido (los IDs de contenedor de GTM se quedan solo en el sitio web). Cada `gtag('config')` lleva un `display_mode` de `installed` o `browser`, según `navigator.standalone` o la media query `(display-mode: standalone)` (`B1App/src/helpers/mobileAnalytics.ts`) |
| Sitemap y feeds | La ruta `sitemap.xml` de cada iglesia incluye las páginas del creador, las URL del blog y las 50 páginas de sermones más recientes (con `<lastmod>` a partir de la fecha de publicación de cada sermón). También lista las páginas integradas `/sermons`, `/groups` y `/volunteer` cuando tienen contenido (grupos públicos, planes de inscripción), salvo que una redirección guardada reemplace esa ruta. `/` se omite cuando la iglesia no tiene página de inicio, porque en ese caso `/` redirige a `/mobile`, que está bloqueado. El listado del blog anuncia el feed RSS |
| Accesibilidad | La estructura pública muestra un enlace de salto que apunta al punto de referencia `<main id="main-content">` en cada envoltorio de diseño |

## Generación con IA (AskApi)

La generación de páginas y de sitios se ejecuta en **AskApi**, un servicio independiente, bajo el controlador `/website`. Se autentica con el mismo JWT de `CustomAuthProvider` que todo lo demás y es **sin estado respecto al contenido**: cada endpoint devuelve JSON y quien llama (B1Admin) guarda el resultado mediante ContentApi (`POST /content/pages/importTree` crea una página con su árbol completo de secciones y elementos anidados en una sola llamada; siempre inserta bajo la iglesia de quien llama e ignora los IDs del cuerpo).

### Generación de páginas (`planPage` → `writePage`)

La plantilla "AI" de la página en `AddPageModal` de B1Admin usa una canalización de bajo costo (`AskApi/src/helpers/SiteGenHelper.ts`) basada en una regla: **ningún modelo emite JSON del creador**. Dos modelos reparten el trabajo mediante el Vercel AI Gateway (HTTP simple, clave SSM `/{env}/aiGatewayApiKey` o `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`): un modelo de decisiones tipadas que devuelve opciones, puntuaciones y booleanos con probabilidades, pero no puede escribir texto. Elige cada sección en orden desde una biblioteca fija de plantillas, puntúa los diseños, verifica los hechos del texto y elige fotos de archivo e íconos. El costo de entrada es de unos 0.04 dólares por millón de tokens y la salida es gratuita, así que ~90 llamadas por página cuestan una fracción de centavo.
- **Un modelo de chat pequeño (GPT-4.1 mini por defecto)**: completa las celdas de texto con nombre y longitud limitada de las plantillas elegidas. El redactor es una constante única, que se puede sobrescribir con la variable de entorno `SITEGEN_COPY_MODEL` (cualquier ID de modelo de chat del gateway, por ejemplo `anthropic/claude-haiku-4.5`). En una comparación a ciegas de tres iglesias, Claude Haiku 4.5 sonó un poco más cálido, pero GPT-4.1 mini quedó cerca, unas 4 veces más barato y más rápido, por eso es el predeterminado. Una página completa con los tres diseños cuesta unos 1.3 centavos, de los cuales cerca del 80% corresponde al redactor.

| Fase | Endpoint | Qué ocurre |
|------|----------|------------|
| 1 | `POST /website/planPage` | Clasifica el tipo de página (inicio, visita, acerca de…), luego toma 10 diseños candidatos a partir de las probabilidades por ronda de JEV (héroe + número de secciones → cada sección → cierre), elimina duplicados, hace que JEV puntúe cada uno por ajuste, flujo y vacíos, y devuelve los 3 mejores junto con una voz de redacción y un `suggestedStyle` (paleta + fuentes). Los candidatos que comparten las mismas secciones hasta ese punto hacen a JEV la misma pregunta, así que las rondas se memorizan por prefijo. Una mejor puntuación menor que 6 se registra como `lowLayoutScore`; ese registro es la lista pendiente de plantillas que vale la pena agregar. ~2 s |
| 2 | `POST /website/writePage` (una llamada por candidato) | El redactor completa el texto de las celdas de dos secciones por llamada, en paralelo, y devuelve cinco títulos principales entre los que elige JEV; JEV verifica los hechos de cada sección; las secciones que fallan, usan una frase genérica o repiten una sección anterior (secuencias compartidas de 4 palabras, verificadas en código) se reescriben en paralelo indicando el motivo específico; un filtro de código elimina las oraciones con frases genéricas de sitios de iglesia (salvo que la descripción propia de la iglesia las use); JEV elige los temas de las fotos, los íconos y el divisor de forma del héroe, y puntúa el resultado. Devuelve un árbol de secciones listo para guardar y una puntuación. ~6–9 s |
| 3 | `POST /content/pages/importTree` | B1Admin escribe solo el diseño mejor clasificado (el segundo es un respaldo si esa escritura falla), lo guarda y abre la vista previa (~10 s después de Guardar) |

Cada fase es una solicitud independiente para que cada llamada se mantenga dentro del límite de 29 segundos de API Gateway. Las plantillas de `SiteGenHelper.buildTree` son árboles fijos de secciones y elementos del catálogo (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) y hacen referencia a tokens del tema (`var(--accent)`, `var(--lightAccent)`…), así que las páginas generadas heredan la configuración de apariencia existente de la iglesia. Agregar una plantilla de sección implica agregar su lista de celdas a `SECTIONS` y su árbol a `buildTree`; la prueba unitaria recorre cada plantilla y valida el árbol.

**Entradas.** El texto solo puede afirmar hechos de dos fuentes: lo que escribió el usuario y `churchContext.facts`, registros que B1Admin reúne antes de planear (horarios de servicio públicos y nombres de grupos públicos, además del nombre y la dirección de la iglesia). Las mismas banderas regulan las plantillas con datos: `times` renderiza el elemento `serviceTimes` en vivo cuando la iglesia guarda sus horarios de servicio en B1 (de lo contrario, una tabla escrita a mano), y `groups` y `countdown` solo se ofrecen cuando hay datos detrás de ellos. Las llamadas a JEV se cubren con una doble apuesta: un duplicado se dispara tras 1.5 s y gana la primera respuesta, porque el gateway se atasca de vez en cuando y las llamadas son casi gratuitas.

**Mantenerse en el tema.** El mensaje del usuario es el *tema de la página*, no un contexto general sobre la iglesia. `planPage` clasifica la solicitud (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`), y en las páginas `event` y `topic` ni siquiera se ofrecen las plantillas generales de iglesia (nota del pastor, sermones, ministerios, grupos, impacto comunitario, horarios semanales y cuenta regresiva, héroe con video), mientras que `details` (cuándo / dónde / qué traer) y una `eventCountdown` con fecha sí se ofrecen. Ambos jueces puntúan qué tan en tema está el contenido. B1Admin pasa el `pageType` del plan a cada llamada de `writePage`.

**Páginas completas a partir de solicitudes breves.** Las páginas tienen de tres a seis secciones intermedias, longitudes generosas de celdas, una línea introductoria en las secciones de tarjetas y un FAQ de cinco preguntas, y el paso de reparación amplía cualquier sección que llegue escasa. La generación es de un solo clic: no hay preguntas de seguimiento. Cuando la solicitud omite un detalle ordinario que una página completa necesita (una hora de inicio, un salón, qué traer, cómo inscribirse), el redactor lo completa con una elección plausible y modesta que la iglesia puede editar. Como las secciones se redactan en paralelo, esos vacíos se deciden **una sola vez**, en `planPage` (`assumedDetails`, una pequeña llamada al redactor que corre junto con el muestreo de diseños), y se devuelven a cada llamada de `writePage` mediante `churchContext.assumedDetails`, de modo que una sección no pueda decir las 5:00 mientras otra dice las 5:30. JEV repara cualquier sección que contradiga la solicitud, los registros de la iglesia o esos detalles decididos. Los detalles decididos no se muestran en la interfaz; la iglesia revisa y edita la página como cualquier otra. Hay cosas que nunca se inventan: nombres de personas, números de teléfono, correos y direcciones web, precios, estadísticas, la historia de la iglesia, citas atribuidas a personas, y el día de la semana de una fecha para la que la solicitud no dio uno.

**Visuales.** Las plantillas nunca nombran sus fotos ni sus íconos. Dejan espacios abiertos, y una sola pasada genérica (`visualSlots` → `pickVisuals` → `applyVisuals` en `SiteGenHelper`) recorre el árbol terminado y completa cada uno: el fondo de una sección o una entrada de galería marcada como `auto:photo`, un `auto:icon`, el `auto:divider` del héroe y, sin ningún marcador, cualquier elemento `textWithPhoto`, `card` o `image` cuyo `photo` esté vacío. JEV elige cada uno a partir del texto que lo rodea (la foto de una tarjeta a partir del título y el texto de esa tarjeta; un fondo a partir del texto de la sección), sin repetir ningún tema en una página. Así, una plantilla nueva obtiene fotos sin trabajo adicional. Las fotos son términos de búsqueda de Pexels emitidos como marcadores `pexels:<term>` que B1Admin resuelve mediante `POST /content/stock/search`; un cliente que no envía `resolvesPhotos` recibe en su lugar una imagen de héroe integrada, bandas de color plano y tarjetas sin foto. Deliberadamente no hay temas de retratos, y la plantilla del pastor no lleva ninguna foto: un desconocido de archivo nunca debe sustituir a una persona real. Para una iglesia que todavía no tiene páginas, B1Admin aplica `suggestedStyle` a los estilos globales; los sitios existentes conservan su aspecto.

### Otros endpoints

:::info
El botón de reescritura de `SectionToolbar` y el botón "Generate Site" de la lista de páginas en B1Admin siguen comentados en el cliente. Los endpoints de AskApi que aparecen abajo siguen respondiendo; solo se oculta esa interfaz.
:::

| Endpoint | Propósito |
|----------|-----------|
| `POST /website/generatePageOutline` → `generateSection` | El flujo original de página en dos pasos (esquema, y luego una llamada al LLM por sección que emite JSON de elementos). Reemplazado en B1Admin por `planPage`/`writePage` por costo; se conserva para consumidores de la API |
| `POST /website/generateSite` | Generación de todo el sitio. **Dos fases por diseño**: una llamada con `planOnly: true` devuelve solo el plan de varias páginas (una llamada rápida al modelo), y después el cliente pide el contenido completo, manteniendo cada solicitud dentro del límite de tiempo de Lambda/API Gateway |
| `POST /website/rewriteSection` | Reescritura que conserva la estructura: el modelo solo puede cambiar las respuestas con texto. Se compara una firma recursiva de la estructura (ids + tipos + orden) antes y después; cualquier diferencia devuelve la sección original con `fallback: true` en lugar de una estructura corrupta |
| `POST /website/generateAltText` | Llamada de visión sobre hasta 20 URL de imágenes; devuelve un texto alternativo conciso (≤125 caracteres, sin prefijos "photo of") |
| `POST /website/generateMetaDescription` | Una meta descripción SEO (≤155 caracteres) a partir del texto de la página; conectada al botón Generate de la configuración de página en B1Admin |

Los prompts de estos endpoints son archivos markdown bajo `AskApi/config/instructions/`, incluido el catálogo de elementos a partir del cual genera el modelo. Dos decisiones de diseño mantienen honesto el catálogo: el cliente envía `availableElementTypes` en cada solicitud (el prompt solo puede usar tipos de esa lista; el servidor nunca codifica fijo el conjunto completo), y la herramienta MCP `describe_page_builder` de la API incluye la misma guía para los agentes de IA que trabajan mediante [MCP](../api/mcp). Los modelos son Anthropic Claude a través de OpenRouter: 3.5 Haiku para el contenido de las secciones (latencia), 3.5 Sonnet para los esquemas, los planes de sitio y la visión, con un respaldo de OpenAI cuando no hay una clave de OpenRouter configurada.

## Formularios conversacionales

Los formularios (módulo de membership) ganaron un modo conversacional pensado para páginas tipo tarjeta de conexión. Cuatro columnas de `forms` lo controlan: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Renderizado**: `FormSubmissionEdit` de apphelper cambia al componente `ConversationalForm` (una pregunta a la vez) cuando `displayMode` es `conversational`; la página de formularios de B1App pasa el modo. El envío tiene la misma carga en ambos casos.
- **Creación automática de la persona**: al enviar con `autoCreatePerson` activo, `ConversationalFormHelper.findOrCreatePerson` deduplica por correo (sin distinguir mayúsculas) y, si no existe, crea un hogar y una persona con `membershipStatus: "Guest"`, y luego vincula el envío a esa persona.
- **Correo de seguimiento**: cuando hay un asunto y un cuerpo, quien envió el formulario recibe un correo con plantilla (con las etiquetas `{firstName}` / `{churchName}`) mediante la ruta transaccional existente (`TransactionalEmailHelper`), nunca por el canal del resumen de notificaciones. Ambos efectos secundarios no son fatales: un fallo nunca pierde el envío.

Los cuatro campos se configuran hoy mediante la API; el editor de formularios de B1Admin todavía no los expone.

## Caché del sitio público

La ruta de renderizado público de B1App guarda en caché las peticiones etiquetadas por iglesia (`next: { revalidate: 300, tags: [sdSlug] }` en producción; `0` en desarrollo), de modo que una página en vivo puede quedarse desactualizada hasta cinco minutos después de una escritura en ContentApi. `POST /api/revalidate/{sdSlug}` en B1App llama a `revalidateTag(sdSlug)` y es la única forma de descartar esa caché antes de tiempo.

Dos escritores la usan:

1. **B1Admin**: `clearSiteCache()` en `B1Admin/src/site/siteCache.ts` hace POST después de guardar en el editor. Prefiere el subdominio del sitio activo (un sitio secundario debe invalidar *esa* etiqueta, no la predeterminada de la iglesia).
2. **Api**: las mutaciones de contenido que nunca pasan por B1Admin (claves de API, MCP, IA) disparan `SiteCacheHelper.bump(churchId)` desde los controladores de contenido. El auxiliar resuelve el subdominio de la iglesia mediante `SubDomainHelper` y hace POST a `{b1AppRoot}/api/revalidate/{sd}`. Los fallos se descartan en silencio, para que un B1App inalcanzable nunca pueda hacer fallar un guardado.

Los controladores que invalidan: páginas (guardar, eliminar, duplicar, publicar, descartar, despublicar, IA temporal), secciones, elementos, bloques, enlaces, estilos globales, entradas y redirecciones. El `b1AppRoot` de desarrollo es `http://{subdomain}.localtest.me:3301`; demo y producción usan `https://{subdomain}.b1.church`.

## Páginas relacionadas

- [Enrutamiento de sitios web y multisitio](./websites): cómo una solicitud se resuelve en una iglesia/sitio y cómo se enrutan los dominios personalizados
- [Endpoints de Content](../api/endpoints/content): superficie REST completa para páginas, secciones, elementos, bloques, entradas, redirecciones y configuración
- [AppHelper](../shared-libraries/app-helper): el paquete npm que incluye los renderizadores, el registro, los divisores y los widgets
- [Servidor MCP](../api/mcp): incluida la herramienta de guía `describe_page_builder`
- [Editor de páginas (para el usuario final)](/docs/b1-admin/website/page-editor): la documentación del editor para el personal
