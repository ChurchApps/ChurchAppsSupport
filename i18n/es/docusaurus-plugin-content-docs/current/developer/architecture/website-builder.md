---
title: "Arquitectura del creador de sitios web"
---

# Arquitectura del creador de sitios web

<div class="article-intro">

Cada sitio web de iglesia que sirve B1App se renderiza a partir de un árbol de contenido (páginas, secciones y elementos) almacenado en ContentApi y editado visualmente en B1Admin. Una biblioteca de componentes compartida renderiza tanto la vista previa del editor como el sitio en vivo, un catálogo de tipos de elementos define qué puede aparecer en una página, y un servicio de IA aparte puede generar o reescribir ese árbol. Esta página describe toda la pila: el contrato de elementos en `@churchapps/helpers`, la canalización de renderizado, los elementos de datos de la iglesia, los widgets de todo el sitio, la capa de blog, las páginas con control de acceso, SEO, la generación con IA y los formularios conversacionales.

</div>

## Descripción general

```
┌──────────────────────────────┐             ┌─────────────────────────────────────────┐
│  B1Admin — editor            │             │  Api — /content module (ContentApi)     │
│  ContentEditor · SectionEdit │  POST /…    │                                         │
│  ElementEdit · PageLinkEdit  │ ──────────▶ │  pages ─ sections ─ elements   blocks   │
│  SiteWidgetsEdit · Blog      │             │  posts   redirects   settings   styles  │
└──────────┬───────────────────┘             └───────────────┬─────────────────────────┘
           │                                                 │ GET /content/pages/:churchId/tree?url=…
           │        shared render pipeline                   ▼            (anon, JWT honored)
           │   ┌───────────────────────────────┐   ┌─────────────────────────────────┐
           └──▶│  @churchapps/helpers          │◀──│  B1App — public site (Next.js)  │
               │    ElementTypes.ts (catalog)  │   │  Zone → Section → Element       │
               │  @churchapps/apphelper        │   │  + widgets, JSON-LD, sitemap,   │
               │    ElementRegistry, renderers │   │    redirects, branded 404       │
               │    SectionDivider, widgets    │   └───────────────┬─────────────────┘
               └───────────────────────────────┘                   │ church-data elements
┌──────────────────────────────┐                                   ▼
│  AskApi — /website/* (AI)    │             ┌─────────────────────────────────────────┐
│  generateSite · rewriteSection│            │  /giving/funds/public/…/total           │
│  generateAltText · metaDesc  │             │  /membership/groupmembers/public/…      │
│  returns JSON; B1Admin saves │             │  /attendance/servicetimes/public/…      │
└──────────────────────────────┘             └─────────────────────────────────────────┘
```

Tres reglas se cumplen en toda la pila:

1. **Un árbol, dos renderizadores.** Una página es un árbol `pages → sections → elements` en el que cada nodo guarda su configuración como un blob JSON `answers`. Los mismos componentes de apphelper renderizan el editor de arrastrar y soltar de B1Admin y el sitio público renderizado en el servidor de B1App: no existe un "formato de publicación" aparte.
2. **El contrato vive en `@churchapps/helpers`.** `ElementTypes.ts` es el catálogo único de tipos de elementos; los renderizadores se resuelven mediante un registro en apphelper; los formularios del editor viven en B1Admin. Agregar un tipo de elemento implica tocar los tres, en ese orden.
3. **El sitio público lee endpoints anónimos.** Todo lo que B1App necesita (el árbol de páginas, la configuración, las entradas del blog, las redirecciones y los endpoints de datos de la iglesia de otros módulos) es público. La autenticación es opcional: un JWT en el endpoint anónimo del árbol desbloquea las páginas solo para miembros, y nada más cambia.

## El árbol de contenido

El módulo de contenido (`Api/src/modules/content`) es dueño de los datos del creador:

| Tabla | Función |
|-------|---------|
| `pages` | Una página por URL: `url`, `title`, `layout`, más `visibility`/`groupIds` (control de acceso) y `metaDescription` (SEO) |
| `sections` | Franjas horizontales en una página (o en un bloque): fondo, color de texto y un `answersJSON` que contiene el estilo más las configuraciones de forma de divisor `dividerTop`/`dividerBottom` |
| `elements` | Piezas de contenido dentro de una sección: `elementType` + `answersJSON`, anidables para los tipos de diseño (fila/columna, carrusel) |
| `blocks` | Grupos reutilizables de secciones/elementos (bloques de pie de página, bloques de elementos) compartidos entre páginas |
| `posts` | Entradas de blog independientes (consulte [Blog](#blog)) |
| `redirects` | Pares `fromPath → toPath` por iglesia, con un límite de 200 (consulte [SEO](#seo-and-discoverability)) |
| `settings` | Configuraciones clave-valor de la iglesia; las filas marcadas como `public` se sirven de forma anónima y contienen la configuración de widgets/analítica |

El árbol completo de una URL llega en una sola llamada anónima — `GET /content/pages/:churchId/tree?url=/about` — que es desde donde B1App renderiza en el servidor. Las solicitudes del editor, en cambio, obtienen por id y conservan los ids internos.

## El contrato de elementos

### El catálogo (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` define cada tipo de elemento como un `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults` y un `answersSchema` en estilo JSON-schema para sus respuestas. `validateElementAnswers()` es deliberadamente permisivo: los tipos desconocidos y las claves adicionales pasan, de modo que el contenido antiguo nunca se rompe al actualizar el catálogo. **Hoy se incluyen 35 tipos:**

| Categoría | Tipos de elemento |
|-----------|-------------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

El elemento `sermons` es el más configurable de los tipos de iglesia: una respuesta `layout` selecciona `browse` (el navegador completo heredado), `grid`, `list` o `featuredLatest`, con `playlistId`, `itemCount`, `showTitles` y `showDates` que afinan los diseños distintos de browse.

El elemento `rawHTML` tiene dos respuestas: `rawHTML` (marcado) y `javascript`. Los scripts insertados mediante `innerHTML` nunca se ejecutan, así que `RawHTMLElement` recrea cada nodo `<script>` del marcado como un elemento nuevo. Estos nodos no insertados por el analizador son de confianza bajo el `strict-dynamic` del CSP. Una respuesta `javascript` que empieza con `<` (un fragmento de proveedor pegado con sus etiquetas `<script>`) se analiza como marcado y recibe el mismo tratamiento. De lo contrario, se ejecuta como un script inline simple. B1Admin marca una URL suelta en la casilla de JavaScript, ya que una URL sola se ejecuta como un script sin efecto. El elemento `map` no renderiza nada y no carga ningún script de Google Maps cuando no hay una clave de API de Maps configurada.

### Renderizadores (`@churchapps/apphelper`)

Los renderizadores viven en `Packages/apphelper/src/website/components/elementTypes/`, un componente por tipo, resueltos mediante `ElementRegistry.ts`: un mapa de dos capas en el que `Element.tsx` registra el renderizador predeterminado de los 35 tipos (`registerDefaultElementRenderer`), y una aplicación host puede reemplazar cualquiera de ellos en tiempo de ejecución (`registerElementRenderer`) sin bifurcar el paquete.

### Formularios del editor (B1Admin)

Los formularios de configuración por tipo del editor viven en `B1Admin/src/site/admin/elements/`: `ElementEdit.tsx` despacha a un componente dedicado (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) o a un constructor de campos en línea por tipo. El espejo orientado a IA de este catálogo es la herramienta MCP `describe_page_builder` de la API (consulte [Servidor MCP](../api/mcp)).

La vista previa del editor monta el mismo `Theme` que el sitio en vivo, que establece las variables CSS `--headingFont` / `--bodyFont` a partir de los estilos globales de la iglesia. B1App aplica esas variables mediante `pages.css`, que B1Admin no puede importar, así que `ContentEditor.tsx` inyecta `EDITOR_PAGE_FONT_CSS` (`src/site/admin/editorCss.ts`) para aplicarlas al texto del cuerpo de `.page` y a `h1`–`h6`. Sin eso, la vista previa mostraba los encabezados con la fuente del administrador.

### Divisores de forma de sección

Las secciones pueden tener divisores de forma decorativos en cualquiera de sus bordes. La configuración vive en el `answersJSON` de la sección como objetos `dividerTop` / `dividerBottom` — `{ shape, color, height, flip }` con `shape` uno de `wave, waves, slant, curve, triangle, peaks`. Apphelper incluye el componente `SectionDivider` y el auxiliar `parseDividerConfig()`; los renderizadores de Section de ambas aplicaciones (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) analizan las respuestas y montan el divisor, y `SectionEdit.tsx` en B1Admin proporciona la interfaz del selector. Los paquetes solo incluyen el bloque de construcción: la conexión a nivel de sección es responsabilidad de las aplicaciones que los consumen.

## Elementos de datos de la iglesia

Tres tipos de elementos renderizan datos vivos de la iglesia en lugar de contenido escrito. La aislación de módulos sigue aplicando: cada uno llama al endpoint público del módulo propietario directamente desde el navegador:

| Elemento | Endpoint | Notas |
|----------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Devuelve `{ fundId, totalAmount, donationCount }`, con una ventana opcional `?startDate=&endDate=`; el elemento lo compara con su respuesta `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Solo por adhesión**: el grupo debe tener `publicRoster` activado (predeterminado: desactivado). La proyección es deliberadamente mínima — `personId`, `displayName`, `leader`, foto — sin campos de contacto ni demográficos |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Devuelve el árbol campus → servicio → horario; el renderizador de apphelper emite JSON-LD `Event` de schema.org de mejor esfuerzo a partir de él (la API devuelve datos simples) |

:::warning
`publicRoster` es la barrera de privacidad de `staffGrid`. Nunca amplíe la proyección pública de miembros del grupo ni omita la bandera: el endpoint de la lista es anónimo por diseño, y la lista mínima de campos es la propiedad de seguridad.
:::

### Elemento de calendario y páginas de eventos

Las respuestas del elemento `calendar` son `calendarType` (`group` | `curated`), `calendarId`, `display` (`month`, el predeterminado, o `upcoming`) y `tag`. B1App reemplaza el renderizador de apphelper en `src/components/Element.tsx` con `registerElementRenderer("calendar", …)`:

- **`display: "upcoming"`** renderiza `UpcomingEventsElement` de B1App: carga `GET /content/events/public/group/:churchId/:groupId` o `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId`, expande las recurrencias con `buildOccurrences()` (`src/helpers/EventOccurrences.ts`, una ocurrencia por evento dentro de un año) y muestra las primeras 12 como mosaicos con foto (`events.photoUrl`, con el título en el color oscuro del tema como respaldo) que enlazan a `/events/{id}`, con un menú Subscribe para el feed ICS del calendario.
- **`display: "month"`** renderiza `CalendarElement` de apphelper con un callback `eventUrl`. `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` navegan a esa URL al hacer clic, en lugar de abrir el cuadro de detalle (B1Admin no pasa `eventUrl`, así que el calendario de administración conserva su cuadro).
- **`tag`** filtra ambas vistas con `EventHelper.hasTag()` (`@churchapps/helpers`): una comparación sin distinguir mayúsculas contra `events.tags`, separados por comas; vacío muestra todo. La unión del calendario curado selecciona `e.tags` para que los eventos curados los lleven.

Los eventos curados enlazan por `realEventId` (`eventPageId()`), de modo que la URL siempre nombra el evento subyacente. `/{sdSlug}/events/[eventId]` es una ruta dedicada (no la canalización del creador): carga `GET /content/events/public/:churchId/:id` — que devuelve `null` para eventos pendientes/rechazados y para eventos privados sin inscripción, y agrega `roomNames` de reservas de salas no rechazadas —, renderiza `EventPageContent` (encabezado con foto, descripción en markdown, panel lateral Cuándo/Dónde, **Register for this Event** cuando `registrationEnabled` está activo, y un enlace **Add to my calendar** a `GET /content/events/public/:churchId/:id/ical`), usa la foto como imagen de Open Graph y emite JSON-LD `Event` para la próxima ocurrencia mediante `EventPageJsonLd`. Un evento desconocido u oculto devuelve un 404 real.

## Widgets de todo el sitio

Dos widgets se renderizan en cada página pública en lugar de dentro del árbol: **AnnouncementBanner** (barra superior descartable) y **Launcher** (centro de acción flotante para enlaces tipo dar/visitar/ver). Ambos componentes y sus auxiliares `parse*Config()` se incluyen en apphelper. La configuración son dos filas de configuración pública con las claves `announcementBanner` y `launcher`, escritas por `SiteWidgetsEdit` de B1Admin (en la página Appearance) y leídas por el layout público de B1App mediante `GET /content/settings/public/:churchId`. La API trata estas filas como pares clave-valor opacos; los nombres de las claves son una convención entre las dos aplicaciones.

## Blog

El blog es un tipo de contenido independiente, no una capa sobre las páginas del creador. Una fila de `posts` contiene toda la entrada: `title`, `slug`, `excerpt`, `content` (cuerpo en markdown), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. La superficie pública (toda anónima, `PostController`):

| Ruta | Propósito |
|------|-----------|
| `GET /content/posts/public/:churchId` | Entradas publicadas, filtrables con `?category=&tag=`, paginadas |
| `GET /content/posts/public/:churchId/categories` | Categorías distintas de las entradas publicadas |
| `GET /content/posts/public/:churchId/slug/:slug` | Una entrada publicada |
| `GET /content/posts/rss/:churchId?siteUrl=` | Feed RSS 2.0, titulado con el nombre de la iglesia, con categoría por elemento y descripción de extracto o contenido |

Una entrada está "publicada" cuando `publishDate` está establecida y ya pasó; un `publishDate` futuro es una entrada programada (oculta al público, se muestra con un chip Scheduled en la administración). Los endpoints de lectura enriquecen cada entrada con `authorName`, resuelto desde `authorId` mediante la pasarela del módulo de membresía. Los extractos faltantes recurren al contenido en markdown sin formato (~160 caracteres) en las tarjetas de listado, las meta descripciones y el RSS. B1App sirve `/{sdSlug}/blog` — un listado editorial (encabezado centrado que se convierte en el nombre de la categoría/etiqueta activa cuando hay filtro, fila de chips de categoría, filas de entradas con miniatura a la izquierda con firmas y extractos) con el feed RSS anunciado como enlace alternativo — y `/{sdSlug}/blog/[postSlug]`, una ruta dedicada (no la canalización Zone/Section) con encabezado centrado (etiqueta de categoría, título, firma, regla de acento en el color primario), una imagen principal 16:9 al ancho del contenedor, el cuerpo en markdown en una columna de lectura de unos 720px, chips de etiquetas en el pie del artículo, una franja de entradas relacionadas `"More in {category}"`, y JSON-LD `BlogPosting` que incluye al autor. Ambas páginas se estilizan por completo con tokens del tema, de modo que heredan la paleta de cada iglesia. Las URL del blog se incluyen en el sitemap de cada iglesia. La herramienta de redacción de B1Admin (**Site → Blog**) edita las entradas en un cuadro de diálogo: editor de markdown con interruptor de vista previa, selector de imágenes de galería recortadas a 16:9, selector de persona como autor (por defecto, el usuario que edita), autocompletado de categorías a partir de las existentes, validación de slug duplicado y un interruptor de publicación; las filas publicadas enlazan al post en vivo, y la página recuerda a los administradores agregar un enlace de navegación `/blog`. Los comentarios se dejan a servicios de terceros: una configuración pública de contenido de toda la iglesia, `blogFooterHtml` (que se edita en **Below Every Post** en la página Blog, y solo se muestra a quienes tienen Settings→Edit), se renderiza debajo de cada entrada mediante `BlogFooterEmbed` de B1App, que recrea las etiquetas `<script>` para que se ejecuten bajo `'strict-dynamic'` y las ejecuta en orden (un `src` externo termina de cargarse antes de que se ejecute el siguiente script inline), ya que los fragmentos de proveedores cargan una biblioteca y luego la invocan.

## Páginas solo para miembros

`pages.visibility` reutiliza el enum de los enlaces de navegación — `everyone` (predeterminado), `visitors`, `members`, `staff`, `team`, `groups` (con `groupIds`) — pero como **barrera de acceso estricta**, no como filtro de navegación (`PageVisibilityHelper.canViewPage`). El flujo:

1. El endpoint anónimo del árbol verifica la visibilidad en las recuperaciones basadas en URL. Los visitantes anónimos de una página restringida reciben `{ restricted: true, visibility }` en lugar del contenido: el árbol nunca filtra datos.
2. El endpoint sigue respetando un JWT: `CustomAuthProvider` verifica el encabezado `Authorization` en *cada* solicitud, incluidas las rutas anónimas, así que la solicitud de un miembro autenticado a la misma URL se resuelve con normalidad.
3. B1App renderiza `RestrictedPage` ante una respuesta `restricted`: hidrata la sesión a partir de las credenciales guardadas, vuelve a pedir el árbol con el JWT y lo renderiza, o muestra una barrera de inicio de sesión con un `returnUrl` cuando no hay sesión.

:::info
La granularidad de la barrera varía según el nivel: `groups` compara los `groupIds` del token con la lista de la página y `staff` verifica `membershipStatus`, pero `members` y `team` actualmente aceptan cualquier usuario autenticado de la iglesia. Trate `groups` como la opción estricta.
:::

## SEO y visibilidad en buscadores

Todo esto es renderizado del lado de B1App sobre los datos de ContentApi: la API almacena, la aplicación emite:

| Aspecto | Cómo funciona |
|---------|---------------|
| Meta descripciones | `pages.metaDescription` (≤300 caracteres) fluye por `MetaHelper.getMetaData()` hacia el `Metadata` de Next.js (description + Open Graph) en cada ruta renderizada por el creador. La configuración de página de B1Admin incluye un botón "Generate" con IA (ver abajo) |
| Redirecciones | Filas `redirects` por iglesia gestionadas en `/content/redirects` (`content.edit`, límite de 200 filas, rutas normalizadas). Ante un posible 404, la ruta de página de B1App resuelve la ruta contra `GET /content/redirects/public/:churchId` y emite un HTTP 308 mediante `permanentRedirect` de Next; las rutas sin coincidencia pasan a `notFound()` |
| 404 con marca | `not-found.tsx` renderiza `BrandedNotFound` con el logotipo, el nombre y el tema de la iglesia en lugar de un error genérico. Las rutas desconocidas `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]` y `/volunteer/[planId]` devuelven un 404 real, al igual que los subdominios desconocidos y los slugs de página mal formados (consulte [Enrutamiento de sitios web y multisitio](./websites)) |
| Datos estructurados | JSON-LD `BlogPosting` en las entradas del blog; `VideoObject` en las páginas de cada sermón (`/{sdSlug}/sermons/[sermonId]`) y en las páginas que contienen un elemento `sermons`; `Event` a partir de los elementos de calendario/evento en las páginas del creador y en cada página `/{sdSlug}/events/[eventId]` (próxima ocurrencia, con la foto del evento como `image`); `Event` de schema.org a partir del elemento `serviceTimes` |
| Páginas de sermones | Cada sermón público obtiene una página rastreable en `/sermons/[sermonId]` con metadatos completos: los sermones ya no están encerrados dentro del elemento navegador del lado del cliente |
| Analítica | La clave de configuración pública `ga4MeasurementId` (que se gestiona junto a las redirecciones en B1Admin) inyecta un gtag GA4 por iglesia mediante `next/script`. La aplicación B1 (`/{sdSlug}/mobile`) también envía sus vistas de página a ese ID, junto con la etiqueta propia de ChurchApps, cuando se trata de un ID `G-` válido (los ID de contenedor GTM quedan solo para el sitio web). Cada `gtag('config')` lleva un `display_mode` de `installed` o `browser`, según `navigator.standalone` o la consulta de medios `(display-mode: standalone)` (`B1App/src/helpers/mobileAnalytics.ts`) |
| Sitemap y feeds | La ruta `sitemap.xml` de cada iglesia incluye las páginas del creador, las URL del blog y las 50 páginas de sermones más recientes (con `<lastmod>` a partir de la fecha de publicación de cada sermón). También lista las páginas integradas `/sermons`, `/groups` y `/volunteer` cuando tienen contenido (grupos públicos, planes de inscripción), a menos que una redirección guardada reemplace esa ruta. `/` se omite cuando la iglesia no tiene página de inicio, ya que `/` redirige entonces a `/mobile`, que está excluido. El listado del blog anuncia el feed RSS |
| Accesibilidad | La parte pública de la interfaz muestra un enlace de salto que apunta al punto de referencia `<main id="main-content">` en cada envoltorio de layout |

## Generación con IA (AskApi)

La generación de páginas y de sitios se ejecuta en **AskApi**, un servicio independiente, bajo el controlador `/website`. Se autentica con el mismo JWT de `CustomAuthProvider` que todo lo demás y es **sin estado respecto al contenido**: cada endpoint devuelve JSON, y quien llama (B1Admin) guarda el resultado mediante ContentApi (`POST /content/pages/importTree` crea una página con su árbol completo anidado de secciones y elementos en una sola llamada; siempre inserta bajo la iglesia de quien llama e ignora los ids del cuerpo).

### Generación de páginas (`planPage` → `writePage`)

La plantilla "AI" del `AddPageModal` de B1Admin usa una canalización de bajo costo (`AskApi/src/helpers/SiteGenHelper.ts`) basada en una regla: **ningún modelo emite JSON del creador**. Dos modelos reparten el trabajo a través del Vercel AI Gateway (HTTP simple, clave SSM `/{env}/aiGatewayApiKey` o `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`) — un modelo de decisiones tipadas que devuelve elecciones, puntuaciones y booleanos con probabilidades, pero no puede escribir texto. Elige cada sección en orden desde una biblioteca fija de plantillas, puntúa los diseños, verifica los hechos del texto, y elige fotos de archivo e iconos. El costo de entrada es de unos $0.04 por millón de tokens y la salida es gratuita, así que unas 90 llamadas por página cuestan una fracción de centavo.
- **Un modelo de chat pequeño (GPT-4.1 mini por defecto)** — completa las ranuras de texto nombradas y con longitud limitada de las plantillas elegidas. El redactor es una constante, sobrescribible con la variable de entorno `SITEGEN_COPY_MODEL` (cualquier id de modelo de chat del gateway, por ejemplo `anthropic/claude-haiku-4.5`). En una comparación a ciegas lado a lado de tres iglesias, Claude Haiku 4.5 sonó un poco más cálido, pero GPT-4.1 mini quedó cerca, unas 4 veces más barato y más rápido, así que es el predeterminado. Una página completa con los tres diseños cuesta unos 1.3 centavos, de los que cerca del 80% corresponde al redactor.

| Fase | Endpoint | Qué ocurre |
|------|----------|------------|
| 1 | `POST /website/planPage` | Clasifica el tipo de página (inicio, visita, acerca de…), luego toma una muestra de 10 diseños candidatos a partir de las probabilidades por ronda de JEV (encabezado + número de secciones → cada sección → cierre), elimina duplicados, hace que JEV puntúe cada uno por ajuste/flujo/vacíos, y devuelve los 3 mejores más una voz de escritura y un `suggestedStyle` (paleta + fuentes). Los candidatos que comparten las mismas secciones hasta ese punto hacen a JEV la misma pregunta, así que las rondas se memorizan por prefijo. Una mejor puntuación inferior a 6 se registra como `lowLayoutScore` — ese registro es el pendiente de plantillas que vale la pena agregar. ~2 s |
| 2 | `POST /website/writePage` (una llamada por candidato) | El redactor completa el texto de las ranuras de dos secciones por llamada, en paralelo, y devuelve cinco titulares de encabezado entre los que elige JEV; JEV verifica los hechos de cada sección; las secciones que fallan, usan una frase hecha o repiten una sección anterior (secuencias compartidas de 4 palabras, verificadas en el código) se reescriben en paralelo con el motivo específico; una limpieza de código elimina las oraciones con frases hechas de sitios de iglesia (salvo que la descripción propia de la iglesia las use); JEV elige los temas de las fotos, los iconos y el divisor de forma del encabezado, y puntúa el resultado. Devuelve un árbol de secciones listo para guardar y una puntuación. ~6–9 s |
| 3 | `POST /content/pages/importTree` | B1Admin escribe solo el diseño mejor clasificado (el segundo es respaldo si esa escritura falla), lo guarda y abre la vista previa (~10 s después de Save) |

Cada fase es una solicitud independiente para que cada llamada se mantenga dentro del límite de 29 segundos de API Gateway. Las plantillas de `SiteGenHelper.buildTree` son árboles fijos de secciones y elementos del catálogo (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) y referencian tokens del tema (`var(--accent)`, `var(--lightAccent)`…), así que las páginas generadas heredan la apariencia existente de la iglesia. Agregar una plantilla de sección implica agregar su lista de ranuras a `SECTIONS` y su árbol a `buildTree`; la prueba unitaria recorre cada plantilla y valida el árbol.

**Entradas.** El texto solo puede afirmar hechos de dos fuentes: lo que escribió el usuario, y `churchContext.facts` — registros que B1Admin reúne antes de planificar (horarios de servicio públicos y nombres de grupos públicos, además del nombre y la dirección de la iglesia). Las mismas banderas controlan las plantillas basadas en datos: `times` renderiza el elemento `serviceTimes` en vivo cuando la iglesia mantiene sus horarios de servicio en B1 (una tabla escrita en caso contrario), y `groups` y `countdown` solo se ofrecen cuando hay datos detrás. Las llamadas a JEV son con cobertura — un duplicado se dispara a los 1.5 s y gana la primera respuesta — porque la pasarela a veces se detiene y las llamadas son casi gratuitas.

**Mantenerse en el tema.** El mensaje del usuario es el *tema de la página*, no un contexto general sobre la iglesia. `planPage` clasifica la solicitud (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`), y para las páginas `event` y `topic` no se ofrecen siquiera las plantillas de iglesia general (nota del pastor, sermones, ministerios, grupos, impacto comunitario, horarios semanales y cuenta regresiva, encabezado con video), mientras que `details` (cuándo / dónde / qué traer) y un `eventCountdown` con fecha sí se ofrecen. Ambos jueces puntúan qué tan en tema está el contenido. B1Admin pasa el `pageType` del plan a cada llamada de `writePage`.

**Páginas completas a partir de solicitudes breves.** Las páginas tienen de tres a seis secciones intermedias, longitudes de ranura generosas, una línea introductoria en las secciones de tarjetas y una FAQ de cinco preguntas, y la pasada de reparación amplía cualquier sección que llegue demasiado escueta. La generación es un solo clic: no hay preguntas de seguimiento. Cuando la solicitud omite un detalle habitual que una página completa necesita (una hora de inicio, una sala, qué traer, cómo inscribirse), el redactor lo completa con una opción plausible y modesta para que la iglesia la edite. Como las secciones se escriben en paralelo, esos vacíos se resuelven **una sola vez**, en `planPage` (`assumedDetails`, una pequeña llamada al redactor que corre junto con el muestreo de diseños), y se pasan de vuelta a cada llamada de `writePage` mediante `churchContext.assumedDetails`, de modo que una sección no pueda decir 5:00 mientras otra dice 5:30. JEV repara cualquier sección que contradiga la solicitud, los registros de la iglesia o esos detalles decididos. Los detalles decididos no se muestran en la interfaz; la iglesia revisa y edita la página como cualquier otra. Algunas cosas nunca se inventan: nombres de personas, números de teléfono, direcciones de correo y web, precios, estadísticas, la historia de la iglesia, citas atribuidas a personas, y un día de la semana para una fecha que la solicitud no indicó.

**Visuales.** Las plantillas nunca nombran sus fotos ni sus iconos. Dejan ranuras abiertas, y una pasada genérica (`visualSlots` → `pickVisuals` → `applyVisuals` en `SiteGenHelper`) recorre el árbol terminado y completa cada una: un fondo de sección o entrada de galería marcado como `auto:photo`, un `auto:icon`, el divisor del encabezado `auto:divider`, y, sin ninguna marca, cualquier elemento `textWithPhoto`, `card` o `image` cuya `photo` esté vacía. JEV elige cada una a partir del texto que tiene al lado (la foto de una tarjeta a partir del título y el texto de esa tarjeta; un fondo a partir del texto de la sección), sin repetir ningún tema en una página. Una plantilla nueva recibe fotos sin esfuerzo adicional. Las fotos son temas de búsqueda en Pexels emitidos como marcadores `pexels:<term>` que B1Admin resuelve mediante `POST /content/stock/search`; un cliente que no envía `resolvesPhotos` recibe en su lugar una imagen de encabezado integrada, bandas de color plano y tarjetas sin foto. Deliberadamente no hay temas de retratos, y la plantilla del pastor no lleva foto: un desconocido de archivo nunca debe ocupar el lugar de una persona real. Para una iglesia sin páginas aún, B1Admin aplica `suggestedStyle` a los estilos globales; los sitios existentes conservan su aspecto.

### Otros endpoints

:::info
El botón de reescritura de `SectionToolbar` y el botón "Generate Site" de la lista de páginas en B1Admin siguen comentados en el cliente. Los endpoints de AskApi que aparecen abajo siguen respondiendo; solo se oculta esa interfaz.
:::

| Endpoint | Propósito |
|----------|-----------|
| `POST /website/generatePageOutline` → `generateSection` | El flujo original de página en dos pasos (esquema, luego una llamada de LLM por sección que emite JSON de elementos). Reemplazado en B1Admin por `planPage`/`writePage` por costo; se mantiene para los consumidores de la API |
| `POST /website/generateSite` | Generación de sitio completo. **Dos fases por diseño**: una llamada con `planOnly: true` devuelve solo el plan de múltiples páginas (una llamada rápida al modelo), y luego el cliente pide el contenido completo, manteniendo cada solicitud dentro del límite de tiempo de Lambda/API Gateway |
| `POST /website/rewriteSection` | Reescritura que preserva la estructura: el modelo solo puede cambiar las respuestas con texto. Se compara una firma recursiva de estructura (ids + tipos + orden) antes y después; cualquier discrepancia devuelve la sección original con `fallback: true` en lugar de una estructura corrupta |
| `POST /website/generateAltText` | Llamada de visión sobre hasta 20 URL de imágenes; devuelve un texto alternativo conciso (≤125 caracteres, sin prefijos "photo of") |
| `POST /website/generateMetaDescription` | Una meta descripción SEO (≤155 caracteres) a partir del contenido de texto de la página — conectada al botón Generate de la configuración de página de B1Admin |

Los prompts de estos endpoints son archivos markdown en `AskApi/config/instructions/`, incluido el catálogo de elementos a partir del cual genera el modelo. Dos decisiones de diseño mantienen honesto el catálogo: el cliente envía `availableElementTypes` en cada solicitud (el prompt solo puede usar tipos de esa lista; el servidor nunca codifica el conjunto completo), y la herramienta MCP `describe_page_builder` de la API incluye la misma guía para los agentes de IA que trabajan mediante [MCP](../api/mcp). Los modelos son Anthropic Claude a través de OpenRouter — 3.5 Haiku para el contenido de las secciones (latencia), 3.5 Sonnet para esquemas, planes de sitio y visión — con un respaldo de OpenAI cuando no hay una clave de OpenRouter configurada.

## Formularios conversacionales

Los formularios (módulo de membresía) incorporaron un modo conversacional orientado a páginas tipo tarjeta de conexión. Cuatro columnas de `forms` lo controlan: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Renderizado** — `FormSubmissionEdit` de apphelper cambia al componente `ConversationalForm` (una pregunta a la vez) cuando `displayMode` es `conversational`; la página de formularios de B1App pasa el modo. El mismo payload de envío en ambos casos.
- **Creación automática de persona** — al enviar con `autoCreatePerson` activado, `ConversationalFormHelper.findOrCreatePerson` elimina duplicados por correo (sin distinguir mayúsculas) y, si no encuentra ninguno, crea un hogar y una persona con `membershipStatus: "Guest"`, y luego vincula el envío a esa persona.
- **Correo de seguimiento** — cuando se establecen un asunto y un cuerpo, quien envió recibe un correo con plantilla (con los tokens `{firstName}` / `{churchName}`) a través de la ruta transaccional existente (`TransactionalEmailHelper`), nunca por la puerta del resumen de notificaciones. Ambos efectos secundarios no son fatales: un fallo nunca pierde el envío.

Los cuatro campos se establecen hoy mediante la API; el editor de formularios de B1Admin todavía no los expone.

## Caché del sitio público

La ruta de renderizado público de B1App almacena en caché las consultas etiquetadas por iglesia (`next: { revalidate: 300, tags: [sdSlug] }` en producción; `0` en desarrollo), de modo que una página en vivo puede quedar desactualizada hasta cinco minutos después de una escritura en ContentApi. `POST /api/revalidate/{sdSlug}` en B1App llama a `revalidateTag(sdSlug)` y es la única forma de vaciar esa caché antes de tiempo.

Dos escritores la utilizan:

1. **B1Admin** — `clearSiteCache()` en `B1Admin/src/site/siteCache.ts` hace POST después de guardar en el editor. Prefiere el subdominio del sitio activo (un sitio secundario debe invalidar *esa* etiqueta, no la predeterminada de la iglesia).
2. **Api** — las mutaciones de contenido que nunca pasan por B1Admin (claves de API, MCP, IA) disparan `SiteCacheHelper.bump(churchId)` desde los controladores de contenido. El auxiliar resuelve el subdominio de la iglesia mediante `SubDomainHelper` y hace POST a `{b1AppRoot}/api/revalidate/{sd}`. Los fallos se ignoran de forma silenciosa, para que un B1App inaccesible nunca haga fallar un guardado.

Controladores que disparan la invalidación: páginas (guardar, eliminar, duplicar, publicar, descartar, despublicar, temporal de IA), secciones, elementos, bloques, enlaces, estilos globales, entradas y redirecciones. `b1AppRoot` de desarrollo es `http://{subdomain}.localtest.me:3301`; demo y producción usan `https://{subdomain}.b1.church`.

## Páginas relacionadas

- [Enrutamiento de sitios web y multisitio](./websites) — cómo una solicitud se resuelve a una iglesia/sitio y cómo se enrutan los dominios personalizados
- [Endpoints de Content](../api/endpoints/content) — superficie REST completa para páginas, secciones, elementos, bloques, entradas, redirecciones y configuraciones
- [AppHelper](../shared-libraries/app-helper) — el paquete npm que incluye los renderizadores, el registro, los divisores y los widgets
- [Servidor MCP](../api/mcp) — incluida la herramienta de guía `describe_page_builder`
- [Editor de páginas (usuario final)](/docs/b1-admin/website/page-editor) — documentación del editor para el personal
