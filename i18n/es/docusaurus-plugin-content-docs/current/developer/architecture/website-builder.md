---
title: "Arquitectura del Constructor de Sitios Web"
---

# Arquitectura del Constructor de Sitios Web

<div class="article-intro">

Cada sitio web de iglesia servido por B1App se representa desde un árbol de contenido —páginas, secciones, elementos— almacenado en ContentApi y editado visualmente en B1Admin. Una biblioteca de componentes compartida representa tanto la vista previa del editor como el sitio en vivo, un catálogo de tipos de elementos único define lo que puede aparecer en una página, y un servicio de IA separado puede generar o reescribir ese árbol. Esta página mapea toda la pila: el contrato de elemento en `@churchapps/helpers`, la canalización de representación, elementos de datos de iglesia, widgets en todo el sitio, la capa de blog, páginas con acceso restringido, SEO, generación de IA y formularios conversacionales.

</div>

## Descripción General

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

Tres reglas se mantienen en toda la pila:

1. **Un árbol, dos representadores.** Una página es un árbol `pages → sections → elements` donde cada nodo lleva su configuración como un blob JSON `answers`. Los mismos componentes apphelper representan tanto el editor de arrastrar y soltar en B1Admin como el sitio público renderizado por el servidor en B1App —no hay formato de "publicación" separado.
2. **El contrato vive en `@churchapps/helpers`.** `ElementTypes.ts` es el catálogo único de tipos de elementos; los representadores se resuelven a través de un registro en apphelper; los formularios del editor viven en B1Admin. Agregar un tipo de elemento significa tocar los tres, en ese orden.
3. **El sitio público lee puntos finales anónimos.** Todo lo que B1App necesita —el árbol de páginas, la configuración, las publicaciones del blog, las redirecciones y los puntos finales de datos de iglesia en otros módulos— es público. La autenticación es opcional: un JWT en el punto final del árbol anónimo desbloquea páginas solo para miembros, nada más cambia.

## El árbol de contenido

El módulo de contenido (`Api/src/modules/content`) posee los datos del constructor:

| Tabla | Rol |
|-------|------|
| `pages` | Una página por URL: `url`, `title`, `layout`, más `visibility`/`groupIds` (puerta de acceso) y `metaDescription` (SEO) |
| `sections` | Bandas horizontales en una página (o en un bloque): fondo, color de texto y un `answersJSON` que lleva estilo más las configuraciones de divisor de forma `dividerTop`/`dividerBottom` |
| `elements` | Piezas de contenido dentro de una sección: `elementType` + `answersJSON`, anidables para tipos de diseño (fila/columna, carrusel) |
| `blocks` | Grupos de sección/elemento reutilizables (bloques de pie de página, bloques de elemento) compartidos en páginas |
| `posts` | Publicaciones de blog independientes (ver [Blog](#blog)) |
| `redirects` | Pares por iglesia `fromPath → toPath`, limitados a 200 (ver [SEO](#seo-and-discoverability)) |
| `settings` | Configuración de iglesia clave-valor; filas marcadas `public` se sirven de forma anónima y llevan la configuración de widget/análisis |

El árbol completo para una URL vuelve desde una única llamada anónima —`GET /content/pages/:churchId/tree?url=/about`— que es lo que B1App renderiza desde el servidor. Las solicitudes del editor recuperan por id en su lugar y mantienen ids internos.

## El contrato de elemento

### El catálogo (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` define cada tipo de elemento como un `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults` y un `answersSchema` al estilo JSON-schema para sus respuestas. `validateElementAnswers()` es deliberadamente indulgente —tipos desconocidos y claves adicionales pasan, por lo que el contenido antiguo nunca se rompe en una actualización de catálogo. **35 tipos se envían hoy:**

| Categoría | Tipos de elemento |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

El elemento `sermons` es el más configurable de los tipos de iglesia: una respuesta `layout` selecciona `browse` (el navegador completo heredado), `grid`, `list` o `featuredLatest`, con `playlistId`, `itemCount`, `showTitles` y `showDates` refinando los diseños no-browse.

### Representadores (`@churchapps/apphelper`)

Los representadores viven en `Packages/apphelper/src/website/components/elementTypes/`, un componente por tipo, resueltos a través de `ElementRegistry.ts` —un mapa de dos capas donde `Element.tsx` registra el representador predeterminado para los 35 tipos (`registerDefaultElementRenderer`) y una aplicación anfitriona puede anular cualquiera de ellos en tiempo de ejecución (`registerElementRenderer`) sin bifurcar el paquete.

### Formularios del editor (B1Admin)

Los formularios de configuración por tipo del editor viven en `B1Admin/src/site/admin/elements/` —`ElementEdit.tsx` distribuye a un componente dedicado (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) o un constructor de campo inline por tipo. El espejo orientado a IA de este catálogo es la herramienta MCP `describe_page_builder` de la API (ver [MCP Server](../api/mcp)).

### Divisores de forma de sección

Las secciones pueden llevar divisores de forma decorativa en cualquier borde. La configuración vive en `answersJSON` de la sección como objetos `dividerTop` / `dividerBottom` —`{ shape, color, height, flip }` con `shape` siendo uno de `wave, waves, slant, curve, triangle, peaks`. Apphelper envía el componente `SectionDivider` y el ayudante `parseDividerConfig()`; los representadores de Sección de ambas aplicaciones (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) analizan las respuestas y montan el divisor, y `SectionEdit.tsx` en B1Admin proporciona la interfaz de selección. Los paquetes solo envían el bloque de construcción —el cableado a nivel de sección es el trabajo de las aplicaciones consumidoras.

## Elementos de datos de iglesia

Tres tipos de elemento representan datos de iglesia en vivo en lugar de contenido creado. El aislamiento de módulo se aplica —cada uno llama al punto final público del módulo propietario desde el navegador:

| Elemento | Punto Final | Notas |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Devuelve `{ fundId, totalAmount, donationCount }`, ventana `?startDate=&endDate=` opcional; el elemento lo compara con su respuesta `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Solo por opción**: el grupo debe tener `publicRoster` establecido (apagado por defecto). La proyección es deliberadamente mínima —`personId`, `displayName`, `leader`, foto— sin campos de contacto o demográficos |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Devuelve el árbol campus → servicio → tiempo; el representador apphelper emite JSON-LD schema.org `Event` de mejor esfuerzo desde él (la API devuelve datos simples) |

:::warning
`publicRoster` es la puerta de privacidad para `staffGrid`. Nunca amplíes la proyección pública de miembro del grupo ni omitas la bandera —el punto final del roster es anónimo por diseño y la lista de campo mínimo es la propiedad de seguridad.
:::

## Widgets en todo el sitio

Dos widgets se representan en cada página pública en lugar de dentro del árbol: **AnnouncementBanner** (barra de descarte en la parte superior de la página) y **Launcher** (centro de acción flotante para enlaces de tipo dar/visitar/ver). Ambos componentes y sus ayudantes `parse*Config()` se envían en apphelper. La configuración son dos filas de configuración pública —claves `announcementBanner` y `launcher`— escritas por `SiteWidgetsEdit` de B1Admin (en la página de Apariencia) y leídas por el diseño público de B1App a través de `GET /content/settings/public/:churchId`. La API trata estos como pares clave-valor opacos; los nombres clave son una convención entre las dos aplicaciones.

## Blog

El blog es un tipo de contenido independiente, no una capa sobre páginas del constructor. Una fila `posts` contiene toda la publicación: `title`, `slug`, `excerpt`, `content` (cuerpo markdown), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. Superficie pública (todo anónimo, `PostController`):

| Ruta | Propósito |
|-------|---------|
| `GET /content/posts/public/:churchId` | Publicaciones publicadas, filtrables por `?category=&tag=`, paginadas |
| `GET /content/posts/public/:churchId/categories` | Categorías distintas en publicaciones publicadas |
| `GET /content/posts/public/:churchId/slug/:slug` | Una publicación publicada |
| `GET /content/posts/rss/:churchId?siteUrl=` | Feed RSS 2.0, titulado con el nombre de la iglesia, con categoría por artículo y descripción de extracto o contenido |

Una publicación se "publica" una vez que `publishDate` está establecido y es pasado; un `publishDate` futuro es una publicación programada (oculta públicamente, mostrada con un chip Programado en admin). Los puntos finales de lectura enriquecen cada publicación con `authorName`, resueltos desde `authorId` a través de la puerta de enlace del módulo de membresía. Los extractos faltantes recurren a contenido markdown desnudo (~160 caracteres) en tarjetas de listado, descripciones meta y RSS. B1App sirve `/{sdSlug}/blog` —un listado editorial (encabezado centrado que se convierte en el nombre de categoría/etiqueta activo cuando se filtra, fila de filtro de chip de categoría, filas de publicación de miniatura izquierda con líneas de autor y extractos) con el feed RSS anunciado como un enlace alternativo— y `/{sdSlug}/blog/[postSlug]`, una ruta dedicada (no la canalización Zone/Section) con un encabezado centrado (advertencia de categoría, título, línea de autor, regla de acento de color primario), un héroe 16:9 a ancho de contenedor, el cuerpo markdown en una columna de lectura ~720px, chips de etiqueta en el pie de página del artículo, una tira de publicaciones relacionadas `"Más en {category}"` y `BlogPosting` JSON-LD incluyendo el autor. Ambas páginas estilan completamente desde tokens de tema para que hereden la paleta de cada iglesia. Las URLs del blog se incluyen en el mapa del sitio por iglesia. La interfaz de usuario de creación de B1Admin (**Sitio → Blog**) edita publicaciones en un diálogo: editor markdown con alternancia de vista previa, selector de imagen de galería recortada 16:9, selector de persona de autor (por defecto el usuario en edición), autocompletado de categoría sembrado desde categorías existentes, validación de slug duplicado y alternancia de publicación; filas publicadas enlazan con la publicación en vivo, y la página impulsa a los administradores a agregar un enlace de navegación `/blog`.

## Páginas solo para miembros

`pages.visibility` reutiliza la enumeración de enlaces de navegación —`everyone` (predeterminado), `visitors`, `members`, `staff`, `team`, `groups` (con `groupIds`)— pero como una **puerta de acceso duro**, no un filtro de navegación (`PageVisibilityHelper.canViewPage`). El flujo:

1. El punto final del árbol anónimo comprueba la visibilidad en obtenciones basadas en URL. Los llamadores anónimos de una página bloqueada obtienen `{ restricted: true, visibility }` en lugar de contenido —el árbol nunca se filtra.
2. El punto final aún honra un JWT: `CustomAuthProvider` verifica el encabezado `Authorization` en *cada* solicitud, incluyendo rutas anónimas, por lo que una búsqueda de miembro autenticado de la misma URL se resuelve normalmente.
3. B1App representa `RestrictedPage` en una respuesta `restricted`: hidrata la sesión desde credenciales almacenadas, vuelve a obtener el árbol con el JWT y lo representa —o muestra una puerta de inicio de sesión con un `returnUrl` cuando no hay sesión.

:::info
La granularidad de la puerta varía por nivel: `groups` comprueba `groupIds` del token contra la lista de la página y `staff` comprueba `membershipStatus`, pero `members` y `team` actualmente pasan cualquier usuario autenticado de la iglesia. Trata `groups` como la opción estricta.
:::

## SEO y descubribilidad

Todo esto es renderizado del lado de B1App sobre datos de ContentApi —la API almacena, la aplicación emite:

| Preocupación | Cómo funciona |
|---------|--------------|
| Descripciones de meta | `pages.metaDescription` (≤300 caracteres) fluye a través de `MetaHelper.getMetaData()` en los metadatos de Next.js `Metadata` (descripción + Open Graph) en cada ruta renderizada por el constructor. La configuración de página de B1Admin incluye un botón de IA "Generar" (ver abajo) |
| Redirecciones | Filas `redirects` por iglesia gestionadas en `/content/redirects` (`content.edit`, tapa de 200 filas, rutas normalizadas). En un 404 que sería, la ruta de página de B1App resuelve la ruta contra `GET /content/redirects/public/:churchId` y emite un HTTP 308 a través de `permanentRedirect` de Next; rutas incompatibles caen a través de `notFound()` |
| 404 marcado | `not-found.tsx` representa `BrandedNotFound` con el logo de la iglesia, el nombre y el tema en lugar de un error genérico |
| Datos estructurados | `BlogPosting` JSON-LD en publicaciones del blog; `VideoObject` en las páginas por sermón (`/{sdSlug}/sermons/[sermonId]`) y en páginas que contienen un elemento `sermons`; `Event` de elementos de calendario/evento en páginas del constructor; schema.org `Event` desde el elemento `serviceTimes` |
| Páginas de sermón | Cada sermón público obtiene una página rastreable en `/sermons/[sermonId]` con metadatos completos —los sermones ya no se bloquean dentro del elemento del navegador del lado del cliente |
| Análisis | La clave de configuración pública `ga4MeasurementId` (gestionada junto a redirecciones en B1Admin) inyecta un gtag GA4 por iglesia a través de `next/script` |
| Mapa del sitio y feeds | La ruta `sitemap.xml` por iglesia incluye páginas del constructor y URLs del blog; el listado del blog anuncia el feed RSS |
| Accesibilidad | El cromo público representa un enlace de omisión dirigido al hito `<main id="main-content">` en cada envoltura de diseño |

## Generación de IA (AskApi)

La generación de página y sitio se ejecuta en **AskApi**, un servicio separado, bajo el controlador `/website`. Se autentica con el mismo JWT de `CustomAuthProvider` que todo lo demás y es **sin estado con respecto al contenido**: cada punto final devuelve JSON y el llamador (B1Admin) persiste el resultado a través de ContentApi (`POST /content/pages/importTree` crea una página con su árbol de sección/elemento anidado completo en una llamada; siempre inserta bajo la iglesia del llamador e ignora ids en el cuerpo).

### Generación de página (`planPage` → `writePage`)

La plantilla de página "AI" en `AddPageModal` de B1Admin utiliza una canalización de bajo costo (`AskApi/src/helpers/SiteGenHelper.ts`) construida sobre una regla: **ningún modelo emite JSON del constructor**. Dos modelos dividen el trabajo a través de la puerta de enlace de IA de Vercel (HTTP simple, clave SSM `/{env}/aiGatewayApiKey` o `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`) —un modelo de decisión mecanografiado que devuelve opciones, puntuaciones y booleanos con probabilidades pero no puede escribir texto. Elige cada sección a su vez de una biblioteca de plantillas fija, califica diseños, verifica hechos de copia y elige fotos e iconos de stock. Los costos de entrada son aproximadamente $0,04 por millón de tokens y la salida es gratuita, así que ~90 llamadas por página cuestan una fracción de centavo.
- **Un modelo de chat pequeño (GPT-4.1 mini por defecto)** —llena los espacios de texto nombrados y limitados en longitud de las plantillas elegidas. El escritor es una constante única, anulable con la variable de entorno `SITEGEN_COPY_MODEL` (cualquier id de modelo de chat en la puerta de enlace, p. ej., `anthropic/claude-haiku-4.5`). En un lado a lado ciego en tres iglesias Claude Haiku 4.5 leyó ligeramente más cálido, pero GPT-4.1 mini estuvo cerca, aproximadamente 4x más barato y más rápido, por lo que es el predeterminado. Una página completa con los tres diseños cuesta aproximadamente 1.3 centavos, alrededor del 80% el escritor.

| Fase | Punto Final | Qué sucede |
|-------|----------|--------------|
| 1 | `POST /website/planPage` | Clasifica el tipo de página (inicio, visita, acerca de…), luego muestrea 10 diseños candidatos de las probabilidades por ronda de JEV (héroe + conteo de sección → cada sección → más cerca), deduplica, hace puntuación de JEV cada uno para ajuste/flujo/brechas y devuelve los 3 mejores más una voz de escritura y un `suggestedStyle` (paleta + fuentes). Los candidatos que comparten las mismas secciones hasta ahora hacen una pregunta idéntica a JEV, por lo que las rondas se memorizan por prefijo. Una puntuación mejor bajo 6 se registra como `lowLayoutScore` —ese registro es la acumulación de plantillas que vale la pena agregar. ~2s |
| 2 | `POST /website/writePage` (una llamada por candidato) | El escritor llena la copia del espacio dos secciones por llamada, en paralelo, y devuelve cinco titulares de héroe que JEV elige; JEV verifica hechos en cada sección; secciones que fallan, utilizan una frase de stock o repiten una sección anterior (ejecuciones compartidas de 4 palabras, verificadas en código) se reescriben en paralelo con la razón específica; un raspado de código elimina oraciones con frases de sitio de iglesia de stock (a menos que la descripción propia de la iglesia las use); JEV elige sujetos de fotos, iconos y el divisor de forma del héroe y califica el resultado. Devuelve un árbol de sección listo para guardar y una puntuación. ~6–9s |
| 3 | `POST /content/pages/importTree` | B1Admin escribe solo el diseño mejor clasificado (el subcampeón es un respaldo si esa escritura falla), lo guarda y abre la vista previa (~10s después de Guardar) |

Cada fase es su propia solicitud por lo que cada llamada se mantiene dentro del límite de 29 segundos de la puerta de enlace de API. Las plantillas en `SiteGenHelper.buildTree` son sección fija + árboles de elemento del catálogo (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) y tokens de tema de referencia (`var(--accent)`, `var(--lightAccent)`…), por lo que las páginas generadas heredan la configuración de apariencia existente de la iglesia. Agregar una plantilla de sección significa agregar su lista de espacios a `SECTIONS` y su árbol a `buildTree`; la prueba unitaria recorre todas las plantillas y valida el árbol.

**Entradas.** La copia solo puede indicar hechos de dos fuentes: lo que escribió el usuario y `churchContext.facts` —registros que B1Admin reúne antes de la planificación (horarios de servicio público y nombres de grupos públicos, además del nombre y la dirección de la iglesia). Las mismas banderas cierran plantillas respaldadas por datos: `times` representa el elemento `serviceTimes` en vivo cuando la iglesia mantiene horarios de servicio en B1 (una tabla mecanografiada de otra manera), `groups` y `countdown` solo se ofrecen cuando hay datos detrás de ellos. Las llamadas de JEV se cubren —un duplicado se dispara después de 1.5s y la primera respuesta gana— porque la puerta de enlace ocasionalmente se detiene y las llamadas son casi gratuitas.

**Mantenerse en el tema.** El mensaje del usuario es el *tema de la página*, no información de fondo sobre la iglesia. `planPage` clasifica la solicitud (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`), y para páginas `event` y `topic` las plantillas generales de iglesia (nota del pastor, sermones, ministerios, grupos, impacto comunitario, tiempos semanales y cuenta atrás, héroe de video) ni siquiera se ofrecen, mientras que `details` (cuándo / dónde / qué traer) y una `eventCountdown` de fecha son. Ambos jueces califican la relevancia. B1Admin pasa `pageType` desde el plan en cada llamada `writePage`.

**Páginas completas desde solicitudes cortas.** Las páginas tienen de tres a seis secciones medias, longitudes de espacios generosas, una línea de introducción en secciones de tarjeta y una FAQ de cinco preguntas, y la pasada de reparación expande cualquier sección que vuelva delgada. La generación es un clic: no hay preguntas de seguimiento. Cuando la solicitud deja fuera un detalle ordinario que una página completa necesita (una hora de inicio, una sala, qué traer, cómo registrarse), el escritor la llena con una opción modesta y plausible para que la iglesia edite. Debido a que las secciones se escriben en paralelo, esas brechas se deciden **una sola vez**, en `planPage` (`assumedDetails`, una pequeña llamada de escritor que se ejecuta junto al muestreo de diseño), y se devuelven en cada llamada `writePage` a través de `churchContext.assumedDetails`, por lo que una sección no puede decir 5:00 mientras otra dice 5:30. JEV repara cualquier sección que contradiga la solicitud, los registros de la iglesia o esos detalles decididos. Los detalles decididos no se presentan en la interfaz de usuario; la iglesia revisa y edita la página como cualquier otra. Algunas cosas nunca se inventan: nombres de personas, números de teléfono, correo electrónico y direcciones web, precios, estadísticas, la historia de la iglesia, citas atribuidas a personas y un día de la semana para una fecha que la solicitud no proporcionó.

**Elementos visuales.** Las plantillas nunca nombran sus fotos o iconos. Dejan espacios abiertos, y una pasada genérica (`visualSlots` → `pickVisuals` → `applyVisuals` en `SiteGenHelper`) recorre el árbol terminado y llena cada uno: un fondo de sección o entrada de galería marcada `auto:photo`, un `auto:icon`, el `auto:divider` del héroe y, sin marcador en absoluto, cualquier elemento `textWithPhoto`, `card` o `image` cuya `photo` esté vacía. JEV elige cada uno del texto junto a él (una foto de tarjeta desde el título y texto de esa tarjeta; un fondo desde la copia de la sección), sin sujeto repetido en una página. Una nueva plantilla por lo tanto obtiene fotos gratis. Las fotos son temas de búsqueda de Pexels emitidos como marcadores `pexels:<term>` que B1Admin resuelve a través de `POST /content/stock/search`; un cliente que no envía `resolvesPhotos` obtiene una imagen de héroe incorporada, bandas de color plano y tarjetas sin foto en su lugar. Deliberadamente no hay temas de retrato y la plantilla del pastor no lleva foto: un extraño de stock nunca debe ocupar el lugar de una persona real. Para una iglesia sin páginas aún, B1Admin aplica `suggestedStyle` a los estilos globales; los sitios existentes mantienen su apariencia.

### Otros puntos finales

:::info
El botón de reescritura `SectionToolbar` y el botón "Generar Sitio" de la lista de páginas en B1Admin permanecen comentados del lado del cliente. Los puntos finales de AskApi abajo todavía responden; solo esa interfaz de usuario está oculta.
:::

| Punto Final | Propósito |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | El flujo de página original de dos pasos (esquema, luego una llamada LLM por sección que emite JSON de elemento). Supersedido en B1Admin por `planPage`/`writePage` por costo; mantenido para consumidores de API |
| `POST /website/generateSite` | Generación de sitio completo. **Dos fases por diseño**: una llamada `planOnly: true` devuelve solo el plan multipágina (una llamada de modelo rápida), luego el cliente solicita contenido completo —manteniendo cada solicitud dentro del tiempo de espera de Lambda/API-Gateway |
| `POST /website/rewriteSection` | Reescritura que preserva estructura: el modelo solo puede cambiar respuestas que llevan texto. Se compara una firma de estructura recursiva (ids + tipos + orden) antes y después; cualquier falta de coincidencia devuelve la sección original con `fallback: true` en lugar de estructura corrupta |
| `POST /website/generateAltText` | Llamada de visión sobre hasta 20 URL de imagen; devuelve texto alternativo conciso (≤125 caracteres, prefijos "photo of" omitidos) |
| `POST /website/generateMetaDescription` | Una descripción de meta de SEO (≤155 caracteres) desde el contenido de texto de la página —cableada al botón Generar en la configuración de página de B1Admin |

Los mensajes para estos puntos finales son archivos markdown bajo `AskApi/config/instructions/`, incluyendo el catálogo de elementos del que el modelo genera. Dos puntos de diseño mantienen el catálogo honesto: el cliente pasa `availableElementTypes` en cada solicitud (el mensaje solo puede usar tipos de esa lista —el servidor nunca codifica la serie completa), y la herramienta MCP `describe_page_builder` de la API lleva la misma guía para agentes de IA trabajando a través de [MCP](../api/mcp). Los modelos son Anthropic Claude a través de OpenRouter —3.5 Haiku para contenido de sección (latencia), 3.5 Sonnet para esquemas, planes de sitio y visión— con un respaldo de OpenAI cuando no se configura ninguna clave de OpenRouter.

## Formularios conversacionales

Los formularios (módulo de membresía) ganaron un modo conversacional dirigido a páginas de estilo de tarjeta de conexión. Cuatro columnas en `forms` lo impulsan: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Representación** —El `FormSubmissionEdit` de apphelper cambia al componente `ConversationalForm` (una pregunta a la vez) cuando `displayMode` es `conversational`; la página de formulario de B1App pasa el modo a través. Mismo payload de envío de cualquier manera.
- **Auto-crear persona** —en envío con `autoCreatePerson` establecido, `ConversationalFormHelper.findOrCreatePerson` deduplica por correo electrónico (insensible a mayúsculas) y de otra manera crea un hogar + persona con `membershipStatus: "Guest"` y luego vincula el envío a esa persona.
- **Correo electrónico de seguimiento** —cuando se establecen asunto y cuerpo, el remitente obtiene un correo electrónico con plantilla (con tokens `{firstName}` / `{churchName}`) a través de la ruta transaccional existente (`TransactionalEmailHelper`), nunca la puerta de digestión de notificación. Ambos efectos secundarios no son fatales: una falla nunca pierde el envío.

Los cuatro campos se establecen a través de la API hoy; el editor de formularios de B1Admin no los expone aún.

## Caché del sitio público

La ruta de representación pública de B1App almacena en caché las búsquedas etiquetadas por iglesia (`next: { revalidate: 300, tags: [sdSlug] }` en producción; `0` en desarrollo) por lo que una página en vivo puede permanecer obsoleta hasta cinco minutos después de una escritura de ContentApi. `POST /api/revalidate/{sdSlug}` en B1App llama `revalidateTag(sdSlug)` y es la única forma de soltar ese caché temprano.

Dos escritores lo golpean:

1. **B1Admin** —`clearSiteCache()` en `B1Admin/src/site/siteCache.ts` POSTS después de guardar el editor. Prefiere el subdominio del sitio activo (un sitio secundario debe romper *esa* etiqueta, no la del dominio predeterminado de la iglesia).
2. **Api** —Mutaciones de contenido que nunca van a través de B1Admin (claves de API, MCP, IA) disparan `SiteCacheHelper.bump(churchId)` desde los controladores de contenido. El ayudante resuelve el subdominio de la iglesia a través de `SubDomainHelper` y POSTS `{b1AppRoot}/api/revalidate/{sd}`. Las fallas se tragan por lo que un B1App inaccesible no puede fallar un guardado.

Controladores que golpean: páginas (guardar, eliminar, duplicar, publicar, descartar, despublicar, IA temp), secciones, elementos, bloques, enlaces, estilos globales, publicaciones y redirecciones. Dev `b1AppRoot` es `http://{subdomain}.localtest.me:3301`; demo/staging/prod usan `https://{subdomain}.b1.church`.

## Páginas Relacionadas

- [Enrutamiento de Sitio Web y Multi-Sitio](./websites) —cómo una solicitud se resuelve en una iglesia/sitio y cómo los dominios personalizados se enrutan
- [Puntos Finales de Contenido](../api/endpoints/content) —superficie REST completa para páginas, secciones, elementos, bloques, publicaciones, redirecciones y configuración
- [AppHelper](../shared-libraries/app-helper) —el paquete npm que envía los representadores, registro, divisores y widgets
- [MCP Server](../api/mcp) —incluyendo la herramienta de guía `describe_page_builder`
- [Editor de Página (usuario final)](/docs/b1-admin/website/page-editor) —la documentación del editor orientada al personal
