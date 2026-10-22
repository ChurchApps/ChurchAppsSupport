---
title: "Endpoints de contenido"
---

# Endpoints de contenido

<div class="article-intro">

El módulo Content gestiona las páginas del sitio web, secciones, elementos, bloques, publicaciones de blog, redirecciones, sermones, listas de reproducción, servicios de transmisión, eventos, calendarios seleccionados, archivos, galerías, traducciones de la Biblia y búsquedas de versículos, canciones, arreglos, estilos globales, fotos de stock y configuración. Es el módulo más grande de la API y da soporte al CMS, a las funciones de medios y transmisión, a la planificación de la adoración y a las funciones de la Biblia en todas las aplicaciones de ChurchApps.

</div>

**Ruta base:** `/content`

## Páginas

Ruta base: `/content/pages`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:churchId/tree?url=&id=` | Pública | — | Carga el árbol completo de la página (secciones, elementos, bloques) por URL o ID. Elimina los ID internos cuando se obtiene por URL. Las consultas por URL aplican `pages.visibility`: una página restringida devuelve `{ restricted: true, visibility }` a menos que el JWT (opcional) cumpla la condición |
| GET | `/public/:churchId` | Pública | — | Lista las páginas públicas (`url`, `title`, `metaDescription`); solo `visibility = everyone` |
| GET | `/:id` | JWT | — | Obtiene una página por ID |
| GET | `/` | JWT | — | Lista todas las páginas de la iglesia |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplica una página con todas sus secciones y elementos |
| POST | `/temp/ai` | JWT | Content.Edit | Guarda una página generada por IA (página, secciones y elementos en una sola llamada) |
| POST | `/importTree` | JWT | Content.Edit | Crea una página a partir de un árbol anidado (`title`, `url`, `sections[].elements[]…`). Siempre se inserta bajo la iglesia del solicitante; los ID del cuerpo se ignoran. Las filas deben incluir sus elementos hijos `column`. Máximo 30 secciones / 500 elementos |
| POST | `/` | JWT | Content.Edit | Crea o actualiza páginas (por lotes) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina una página |

### Ejemplo: cargar el árbol de una página

```
GET /content/pages/abc-church-id/tree?url=/about
```

```json
{
  "name": "About",
  "url": "/about",
  "sections": [
    {
      "background": "#FFFFFF",
      "textColor": "dark",
      "elements": [
        { "elementType": "textWithPhoto", "answers": { "text": "Welcome" } }
      ]
    }
  ]
}
```

## Secciones

Ruta base: `/content/sections`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtiene una sección por ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Duplica una sección o la convierte en un bloque reutilizable |
| POST | `/` | JWT | Content.Edit | Crea o actualiza secciones (por lotes). Actualiza el orden automáticamente |
| DELETE | `/:id` | JWT | Content.Edit | Elimina una sección (actualiza el orden automáticamente) |

## Elementos

Ruta base: `/content/elements`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtiene un elemento por ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplica un elemento con todos sus hijos |
| POST | `/` | JWT | Content.Edit | Crea o actualiza elementos (por lotes). Administra automáticamente las columnas de las filas y las diapositivas del carrusel |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un elemento |

## Bloques

Ruta base: `/content/blocks`

Extiende el CRUD estándar (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` de la clase base, con el permiso Content.Edit para las escrituras).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtiene un bloque por ID |
| GET | `/` | JWT | — | Lista todos los bloques |
| GET | `/:churchId/tree/:id` | Pública | — | Carga el árbol completo del bloque con sus secciones y elementos |
| GET | `/blockType/:blockType` | JWT | — | Carga los bloques por tipo (por ejemplo, footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Pública | — | Carga el árbol del bloque de pie de página de una iglesia |
| POST | `/` | JWT | Content.Edit | Crea o actualiza bloques |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un bloque |

## Enlaces

Ruta base: `/content/links`

Extiende el CRUD estándar (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` de la clase base, con el permiso Content.Edit para las escrituras).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtiene un enlace por ID |
| GET | `/` | JWT | — | Lista todos los enlaces. Filtro opcional `?category=`. Se ordena automáticamente tras guardar |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Carga los enlaces filtrados por visibilidad (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Pública | — | Carga los enlaces de una iglesia por categoría (público) |
| POST | `/` | JWT | Content.Edit | Crea o actualiza enlaces (por lotes). Se ordena automáticamente por categoría |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un enlace |

## Estilos globales

Ruta base: `/content/globalStyles`

Extiende el CRUD estándar (POST `/`, DELETE `/:id` de la clase base, con el permiso Content.Edit para las escrituras).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/church/:churchId` | Pública | — | Carga los estilos globales de una iglesia (devuelve los valores predeterminados si no hay ninguno definido) |
| GET | `/` | JWT | — | Carga los estilos globales de la iglesia autenticada |
| POST | `/` | JWT | Content.Edit | Crea o actualiza los estilos globales |
| DELETE | `/:id` | JWT | Content.Edit | Elimina los estilos globales |

## Historial de páginas

Ruta base: `/content/pageHistory`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Lista las entradas del historial de una página |
| GET | `/block/:blockId` | JWT | Content.Edit | Lista las entradas del historial de un bloque |
| GET | `/:id` | JWT | Content.Edit | Obtiene una entrada del historial por ID |
| POST | `/` | JWT | Content.Edit | Guarda una instantánea de una página o bloque. Limpia periódicamente las entradas de más de 30 días |
| POST | `/restore/:id` | JWT | Content.Edit | Restaura una página o bloque desde una instantánea del historial (elimina el contenido actual y lo vuelve a crear a partir de la instantánea) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Restaura desde un objeto de instantánea incluido en la solicitud. Cuerpo: `{ pageId, blockId, snapshot }` |

## Publicaciones (blog)

Ruta base: `/content/posts`

Las publicaciones del blog son filas independientes: `title`, `slug` (único por iglesia), `excerpt`, `content` (cuerpo en markdown), `authorId`, `photoUrl`, `publishDate`, `category` y `tags`. Una publicación se publica cuando `publishDate` está establecida y ya ha pasado. Los endpoints de lectura añaden a cada publicación un `authorName` resuelto a partir de `authorId`. Consulta [Arquitectura del creador de sitios web](../../architecture/website-builder#blog).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Pública | — | Lista las publicaciones publicadas, paginadas (máximo 50 por página) |
| GET | `/public/:churchId/categories` | Pública | — | Categorías distintas de las publicaciones publicadas |
| GET | `/public/:churchId/slug/:slug` | Pública | — | Obtiene una publicación publicada por slug |
| GET | `/rss/:churchId?siteUrl=` | Pública | — | Feed RSS 2.0 de las publicaciones publicadas (los enlaces se construyen como `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Obtiene una publicación por ID |
| GET | `/` | JWT | — | Lista todas las publicaciones de la iglesia |
| POST | `/` | JWT | Content.Edit | Crea o actualiza publicaciones (por lotes) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina una publicación |

## Redirecciones

Ruta base: `/content/redirects`

Redirecciones de URL por iglesia (`fromPath` → `toPath`), limitadas a 200 por iglesia. Las rutas se normalizan (en minúsculas, con barra inicial y sin barra final) y `fromPath` es único por iglesia. B1App resuelve estas redirecciones cuando se produciría un 404 y responde con un HTTP 308.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/public/:churchId?path=` | Pública | — | Resuelve una ruta (o lista todas las redirecciones si se omite `path`) |
| GET | `/:id` | JWT | — | Obtiene una redirección por ID |
| GET | `/` | JWT | — | Lista todas las redirecciones de la iglesia |
| POST | `/` | JWT | Content.Edit | Crea o actualiza redirecciones. Rechaza `fromPath = toPath` y aplica el límite de 200 filas |
| DELETE | `/:id` | JWT | Content.Edit | Elimina una redirección |

## Sermones

Ruta base: `/content/sermons`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Obtiene una estructura de ejemplo de lista de reproducción de FreeShow |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Obtiene el contenedor de la app de TV con las fuentes de sermón, lección y FreeShow |
| GET | `/public/tvFeed/:churchId/:sermonId` | Pública | — | Obtiene un único sermón como lista de reproducción para el feed de TV |
| GET | `/public/tvFeed/:churchId` | Pública | — | Obtiene todas las listas de reproducción y sermones públicos como feed de TV |
| GET | `/public/:churchId` | Pública | — | Lista todos los sermones públicos de una iglesia |
| GET | `/timeline?sermonIds=` | JWT | — | Carga los datos de la línea de tiempo de los sermones |
| GET | `/lookup?videoType=&videoData=` | Pública | — | Busca los metadatos de un sermón en YouTube o Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Genera con IA sugerencias de publicaciones para redes sociales a partir de los subtítulos del sermón |
| GET | `/outline?url=&title=&author=` | JWT | — | Genera con IA un esquema de lección a partir de una URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Importa vídeos de un canal de YouTube |
| GET | `/vimeoImport/:channelId` | JWT | — | Importa vídeos de un canal de Vimeo |
| GET | `/:id` | JWT | — | Obtiene un sermón por ID |
| GET | `/` | JWT | — | Lista todos los sermones |
| POST | `/` | JWT | StreamingServices.Edit | Crea o actualiza sermones (por lotes; admite la carga de miniaturas en base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Elimina un sermón |

### Ejemplo: buscar un sermón de YouTube

```
GET /content/sermons/lookup?videoType=youtube&videoData=dQw4w9WgXcQ
```

```json
{
  "title": "Sunday Service - Faith in Action",
  "description": "Pastor John speaks about faith...",
  "thumbnail": "https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg",
  "duration": 2400,
  "publishDate": "2025-01-15T10:00:00Z"
}
```

## Listas de reproducción

Ruta base: `/content/playlists`

Extiende el CRUD estándar (GET `/:id`, GET `/`, DELETE `/:id` de la clase base, con el permiso StreamingServices.Edit para las escrituras).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtiene una lista de reproducción por ID |
| GET | `/` | JWT | — | Lista todas las listas de reproducción |
| GET | `/public/:churchId` | Pública | — | Lista todas las listas de reproducción públicas de una iglesia |
| POST | `/` | JWT | StreamingServices.Edit | Crea o actualiza listas de reproducción (por lotes; admite la carga de miniaturas en base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Elimina una lista de reproducción |

## Servicios de transmisión

Ruta base: `/content/streamingServices`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Obtiene el ID cifrado de la sala de chat del anfitrión para un servicio |
| GET | `/` | JWT | — | Lista todos los servicios de transmisión. Limpia automáticamente los servicios caducados no recurrentes y avanza los recurrentes |
| POST | `/` | JWT | StreamingServices.Edit | Crea o actualiza servicios de transmisión (por lotes) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Elimina un servicio de transmisión (también borra las IP bloqueadas) |

## Eventos

Ruta base: `/content/events`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Carga los eventos de la línea de tiempo de un grupo (incluye las fechas de excepción, para que se puedan omitir las ocurrencias eliminadas) |
| GET | `/timeline?eventIds=` | JWT | — | Carga los eventos de la línea de tiempo de los grupos del usuario actual (incluye las fechas de excepción) |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Pública | — | Suscribe a los eventos como feed de calendario ICS |
| GET | `/group/:groupId` | JWT | — | Obtiene los eventos de un grupo (incluye las fechas de excepción) |
| GET | `/public/group/:churchId/:groupId` | Pública | — | Obtiene los eventos públicos de un grupo |
| GET | `/public/:churchId/:id` | Pública | — | Obtiene un evento para su página pública, con `roomNames` (salas de las reservas que no están rechazadas). Devuelve `null` para eventos pendientes o rechazados y para eventos privados que no admiten inscripciones |
| GET | `/public/:churchId/:id/ical` | Pública | — | Descarga ese evento como archivo `.ics` (`text/calendar`, con las fechas de excepción aplicadas). Devuelve `404` cuando el evento está oculto según las mismas reglas |
| GET | `/:id` | JWT | — | Obtiene un evento por ID |
| POST | `/` | JWT | — | Crea o actualiza eventos (por lotes) |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin o líder de grupo | Elimina un evento y sus reservas. Los líderes del grupo del evento pueden eliminarlo, y quien hizo la solicitud puede retirar su propia solicitud pendiente |

Los registros de eventos incluyen `photoUrl` (la foto del evento en formato 16:9 que se muestra en la página pública del evento y en las tarjetas de eventos próximos), `tags` (separadas por comas; las usa el filtro de etiquetas del elemento Calendar del sitio web) y `notesViewRole` / `notesPostRole` (`staff` cuando es `null`, `leaders` o `members`), que controlan el acceso a la conversación `eventNote` del evento. Consulta [Control de acceso a las notas de grupos y eventos](./messaging.md#group-and-event-notes-access-control). Las respuestas de eventos seleccionados públicos también incluyen el `photoUrl` y las `tags` de cada evento.

## Excepciones de eventos

Ruta base: `/content/eventExceptions`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtiene una excepción de evento por ID |
| POST | `/` | JWT | Content.Edit, Calendars.Admin o líder de grupo | Crea o actualiza excepciones de eventos (por lotes). Los líderes solo pueden añadir excepciones para eventos de grupos que lideran |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin o líder de grupo | Elimina una excepción de evento |

## Calendarios seleccionados

Ruta base: `/content/curatedCalendars`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtiene un calendario seleccionado por ID |
| GET | `/` | JWT | — | Lista todos los calendarios seleccionados |
| POST | `/` | JWT | Content.Edit | Crea o actualiza calendarios seleccionados (por lotes) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un calendario seleccionado |

## Eventos seleccionados

Ruta base: `/content/curatedEvents`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Obtiene los eventos seleccionados de un calendario (incluye los detalles del evento y las fechas de excepción, a menos que se use `?withoutEvents`) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Pública | — | Obtiene los eventos seleccionados públicos de un calendario |
| GET | `/:id` | JWT | — | Obtiene un evento seleccionado por ID |
| GET | `/` | JWT | — | Lista todos los eventos seleccionados |
| POST | `/` | JWT | Content.Edit | Crea o actualiza eventos seleccionados. Admite un arreglo `eventIds` para añadir eventos de grupo concretos |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un evento seleccionado |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Quita un evento concreto de un calendario seleccionado |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Quita de un calendario seleccionado todos los eventos de un grupo |

## Archivos

Ruta base: `/content/files`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Obtiene los archivos por tipo de contenido e ID de contenido |
| GET | `/` | JWT | — | Lista todos los archivos del sitio web de la iglesia |
| GET | `/:id` | JWT | — | Obtiene un archivo por ID |
| POST | `/` | JWT | Content.Edit* | Sube archivos (en base64). *También se permite si el usuario es miembro del grupo que corresponde a `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Obtiene una URL prefirmada de S3 para subir archivos. *También se permite a los miembros del grupo. Máximo 100 MB por elemento de contenido |
| DELETE | `/:id` | JWT | Content.Edit* | Elimina un archivo y lo quita del almacenamiento. *También se permite a los miembros del grupo |

## Galería

Ruta base: `/content/gallery`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/stock/:folder` | Pública | — | Lista las fotos de stock de una carpeta |
| GET | `/:folder` | JWT | Content.Edit | Lista las imágenes de la galería de una carpeta |
| POST | `/requestUpload` | JWT | Content.Edit | Obtiene una URL prefirmada de S3 para subir una imagen a la galería |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Elimina una imagen de la galería |

## Biblias

Ruta base: `/content/bibles`

Todos los endpoints de la Biblia son públicos (no requieren autenticación). Los datos se obtienen de fuentes externas y se guardan en caché local.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | Pública | — | Lista todas las traducciones de la Biblia (las obtiene de la fuente si la caché está vacía) |
| GET | `/stats?startDate=&endDate=` | Pública | — | Obtiene las estadísticas de búsquedas bíblicas de un rango de fechas |
| GET | `/availableTranslations/:source` | Pública | — | Lista las traducciones disponibles de una fuente (por ejemplo, api.bible) |
| GET | `/updateTranslations` | Pública | — | Sincroniza todas las traducciones de todas las fuentes |
| GET | `/updateTranslations/:source` | Pública | — | Sincroniza las traducciones de una fuente específica |
| GET | `/updateCopyrights` | Pública | — | Actualiza la información de derechos de autor de las traducciones que no la tienen |
| GET | `/:translationKey/updateCopyright` | Pública | — | Actualiza los derechos de autor de una traducción específica |
| GET | `/:translationKey/search?query=&limit=` | Pública | — | Busca versículos en una traducción |
| GET | `/:translationKey/books` | Pública | — | Obtiene los libros de una traducción (los guarda en caché local) |
| GET | `/:translationKey/:bookKey/chapters` | Pública | — | Obtiene los capítulos de un libro (los guarda en caché local) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Pública | — | Obtiene los versículos de un capítulo (los guarda en caché local) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Pública | — | Obtiene el texto de un rango de versículos. Registra las búsquedas. Algunas traducciones omiten la caché por motivos de licencia |

### Ejemplo: obtener el texto de versículos

```
GET /content/bibles/de4e12af7f28f599-02/verses/GEN.1.1-GEN.1.3
```

```json
[
  { "verseKey": "GEN.1.1", "content": "In the beginning God created the heavens and the earth.", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 1 },
  { "verseKey": "GEN.1.2", "content": "Now the earth was formless and empty...", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 2 },
  { "verseKey": "GEN.1.3", "content": "And God said, \"Let there be light,\" and there was light.", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 3 }
]
```

## Canciones

Ruta base: `/content/songs`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/search?q=` | JWT | — | Busca canciones por consulta |
| GET | `/:id` | JWT | — | Obtiene una canción por ID |
| GET | `/` | JWT | Content.Edit | Lista todas las canciones |
| POST | `/` | JWT | Content.Edit | Crea o actualiza canciones (por lotes) |
| POST | `/import` | JWT | — | Importa canciones desde FreeShow (por lotes) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina una canción |

## Detalles de canciones

Ruta base: `/content/songDetails`

Los detalles de canciones son globales (no están limitados a una iglesia). Representan los metadatos canónicos de las canciones compartidos entre iglesias.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtiene un detalle de canción por ID (global) |
| GET | `/` | JWT | — | Lista los detalles de canciones de la iglesia |
| POST | `/create` | JWT | — | Crea un detalle de canción a partir de un ID de PraiseCharts (devuelve el existente si ya se creó). Obtiene automáticamente los metadatos de PraiseCharts y MusicBrainz |
| POST | `/` | JWT | — | Crea o actualiza detalles de canciones (por lotes) |

## Enlaces de detalles de canciones

Ruta base: `/content/songDetailLinks`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtiene un enlace de detalle de canción por ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Obtiene todos los enlaces de un detalle de canción |
| POST | `/` | JWT | — | Crea o actualiza enlaces de detalles de canciones (por lotes). Obtiene automáticamente los datos de MusicBrainz si hay un enlace |
| DELETE | `/:id` | JWT | — | Elimina un enlace de detalle de canción |

## Arreglos

Ruta base: `/content/arrangements`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtiene un arreglo por ID |
| GET | `/song/:songId` | JWT | Content.Edit | Obtiene los arreglos de una canción |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Obtiene los arreglos de un detalle de canción |
| GET | `/` | JWT | Content.Edit | Lista todos los arreglos |
| POST | `/` | JWT | Content.Edit | Crea o actualiza arreglos (por lotes) |
| POST | `/freeShow/missing` | JWT | — | Busca los ID de FreeShow que no existen en la iglesia. Cuerpo: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Elimina un arreglo (también elimina sus tonalidades; elimina la canción si no quedan arreglos) |

## Tonalidades de arreglos

Ruta base: `/content/arrangementKeys`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/presenter/:churchId/:id` | Pública | — | Obtiene la tonalidad del arreglo con los datos completos de la canción para la vista del presentador |
| GET | `/:id` | JWT | — | Obtiene una tonalidad de arreglo por ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Obtiene las tonalidades de un arreglo |
| GET | `/` | JWT | Content.Edit | Lista todas las tonalidades de arreglos |
| POST | `/` | JWT | Content.Edit | Crea o actualiza tonalidades de arreglos (por lotes) |
| DELETE | `/:id` | JWT | Content.Edit | Elimina una tonalidad de arreglo |

## Configuración

Ruta base: `/content/settings`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/my` | JWT | — | Obtiene la configuración del usuario actual |
| GET | `/` | JWT | Settings.Edit | Obtiene toda la configuración de la iglesia |
| GET | `/public/:churchId` | Pública | — | Obtiene la configuración pública de una iglesia (se devuelve como pares clave-valor) |
| POST | `/my` | JWT | — | Guarda la configuración a nivel de usuario (admite la carga de imágenes en base64) |
| POST | `/` | JWT | Settings.Edit | Guarda la configuración a nivel de iglesia (admite la carga de imágenes en base64) |
| DELETE | `/my/:id` | JWT | — | Elimina una configuración de usuario |

## Vista previa

Ruta base: `/content/preview`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/data/:key` | Pública | — | Carga los datos de vista previa de transmisión de una iglesia mediante su clave de subdominio (pestañas, enlaces, servicios, sermones) |

## Galería (fotos de stock)

Ruta base: `/content/stock`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| POST | `/search` | Pública | — | Busca fotos de stock en Pexels. Cuerpo: `{ term: "church" }` |

## PraiseCharts

Ruta base: `/content/praiseCharts`

Integración con PraiseCharts para descubrir canciones de adoración y descargar partituras.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/raw/:id` | JWT | — | Obtiene los datos sin procesar de PraiseCharts de una canción |
| GET | `/hasAccount` | JWT | — | Comprueba si el usuario tiene una cuenta de PraiseCharts vinculada |
| GET | `/search?q=` | JWT | — | Busca en el catálogo de PraiseCharts |
| GET | `/products/:id?keys=` | JWT | — | Obtiene los productos de una canción (de la biblioteca si está autenticado; si no, del catálogo) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Obtiene los datos sin procesar de un arreglo desde la biblioteca |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Descarga un archivo de PraiseCharts (PDF o ZIP). Devuelve `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Pública | — | Obtiene la URL de autorización OAuth de PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Intercambia el verificador OAuth por un token de acceso y lo guarda en la configuración del usuario |
| GET | `/library` | JWT | — | Explora la biblioteca de PraiseCharts del usuario |

## Soporte

Ruta base: `/content/support`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| POST | `/createAudio` | Pública | — | Convierte SSML en audio MP3 con AWS Polly. Cuerpo: `{ ssml: "<speak>...</speak>" }` |

## Páginas relacionadas

- [Arquitectura del creador de sitios web](../../architecture/website-builder) -- Cómo se relacionan las páginas, secciones, elementos, publicaciones y redirecciones entre las aplicaciones
- [Endpoints de membresía](./membership) -- Personas, iglesias, grupos, roles, permisos
- [Endpoints de asistencia](./attendance) -- Seguimiento de servicios y visitas
- [Autenticación y permisos](./authentication) -- Flujo de inicio de sesión, JWT, modelo de permisos
- [Estructura del módulo](../module-structure) -- Patrones de organización del código
