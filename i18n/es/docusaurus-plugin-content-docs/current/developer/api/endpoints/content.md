---
title: "Endpoints de Contenido"
---

# Endpoints de Contenido

<div class="article-intro">

El módulo de Contenido gestiona las páginas del sitio web, secciones, elementos, bloques, publicaciones del blog, redirecciones, sermones, listas de reproducción, servicios de streaming, eventos, calendarios curados, archivos, galerías, traducciones de la Biblia y búsquedas de versículos, canciones, arreglos, estilos globales, fotos de stock y configuraciones. Es el módulo más grande de la API y da soporte al CMS, a los medios y streaming, a la planificación de la adoración y a las funciones de la Biblia en todas las aplicaciones de ChurchApps.

</div>

**Ruta base:** `/content`

## Páginas

Ruta base: `/content/pages`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:churchId/tree?url=&id=` | Pública | — | Cargar el árbol completo de la página (secciones, elementos, bloques) por URL o ID. Elimina los IDs internos cuando se consulta por URL. Las consultas por URL aplican `pages.visibility`: una página restringida devuelve `{ restricted: true, visibility }` a menos que el JWT (opcional) cumpla la condición |
| GET | `/public/:churchId` | Pública | — | Listar las páginas públicas (`url`, `title`, `metaDescription`); solo las de `visibility = everyone` |
| GET | `/:id` | JWT | — | Obtener una página por ID |
| GET | `/` | JWT | — | Listar todas las páginas de la iglesia |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplicar una página con todas sus secciones y elementos |
| POST | `/temp/ai` | JWT | Content.Edit | Guardar una página generada por IA (página, secciones y elementos en una sola llamada) |
| POST | `/importTree` | JWT | Content.Edit | Crear una página a partir de un árbol anidado (`title`, `url`, `sections[].elements[]…`). Siempre se inserta en la iglesia del solicitante; los IDs del cuerpo se ignoran. Las filas deben incluir sus elementos `column`. Máximo 30 secciones / 500 elementos |
| POST | `/` | JWT | Content.Edit | Crear o actualizar páginas (por lotes) |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar una página |

### Ejemplo: Cargar el árbol de una página

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
| GET | `/:id` | JWT | — | Obtener una sección por ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Duplicar una sección o convertirla en un bloque reutilizable |
| POST | `/` | JWT | Content.Edit | Crear o actualizar secciones (por lotes). Actualiza automáticamente el orden |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar una sección (actualiza automáticamente el orden) |

## Elementos

Ruta base: `/content/elements`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtener un elemento por ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplicar un elemento con todos sus hijos |
| POST | `/` | JWT | Content.Edit | Crear o actualizar elementos (por lotes). Gestiona automáticamente las columnas de las filas y las diapositivas del carrusel |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar un elemento |

## Bloques

Ruta base: `/content/blocks`

Extiende el CRUD estándar (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` de la clase base, con el permiso Content.Edit para escritura).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtener un bloque por ID |
| GET | `/` | JWT | — | Listar todos los bloques |
| GET | `/:churchId/tree/:id` | Pública | — | Cargar el árbol completo del bloque con secciones y elementos |
| GET | `/blockType/:blockType` | JWT | — | Cargar bloques por tipo (p. ej., footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Pública | — | Cargar el árbol del bloque de pie de página de una iglesia |
| POST | `/` | JWT | Content.Edit | Crear o actualizar bloques |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar un bloque |

## Enlaces

Ruta base: `/content/links`

Extiende el CRUD estándar (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` de la clase base, con el permiso Content.Edit para escritura).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtener un enlace por ID |
| GET | `/` | JWT | — | Listar todos los enlaces. Filtro opcional `?category=`. Se ordenan automáticamente al guardar |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Cargar enlaces filtrados por visibilidad (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Pública | — | Cargar los enlaces de una iglesia por categoría (público) |
| POST | `/` | JWT | Content.Edit | Crear o actualizar enlaces (por lotes). Se ordenan automáticamente por categoría |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar un enlace |

## Estilos globales

Ruta base: `/content/globalStyles`

Extiende el CRUD estándar (POST `/`, DELETE `/:id` de la clase base, con el permiso Content.Edit para escritura).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/church/:churchId` | Pública | — | Cargar los estilos globales de una iglesia (devuelve los valores predeterminados si no hay ninguno configurado) |
| GET | `/` | JWT | — | Cargar los estilos globales de la iglesia autenticada |
| POST | `/` | JWT | Content.Edit | Crear o actualizar estilos globales |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar estilos globales |

## Historial de páginas

Ruta base: `/content/pageHistory`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Listar las entradas de historial de una página |
| GET | `/block/:blockId` | JWT | Content.Edit | Listar las entradas de historial de un bloque |
| GET | `/:id` | JWT | Content.Edit | Obtener una entrada de historial por ID |
| POST | `/` | JWT | Content.Edit | Guardar una instantánea de una página o bloque. Periódicamente elimina las entradas con más de 30 días |
| POST | `/restore/:id` | JWT | Content.Edit | Restaurar una página o bloque desde una instantánea del historial (elimina el contenido actual y lo vuelve a crear a partir de la instantánea) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Restaurar desde un objeto de instantánea incluido en la solicitud. Cuerpo: `{ pageId, blockId, snapshot }` |

## Publicaciones (Blog)

Ruta base: `/content/posts`

Las publicaciones del blog son filas independientes: `title`, `slug` (único por iglesia), `excerpt`, `content` (cuerpo en markdown), `authorId`, `photoUrl`, `publishDate`, `category` y `tags`. Una publicación se considera publicada una vez que `publishDate` está establecida y es una fecha pasada. Los endpoints de lectura enriquecen cada publicación con `authorName`, resuelto a partir de `authorId`. Consulta [Arquitectura del constructor de sitios web](../../architecture/website-builder#blog).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Pública | — | Listar publicaciones publicadas, paginadas (máximo 50 por página) |
| GET | `/public/:churchId/categories` | Pública | — | Categorías distintas de las publicaciones publicadas |
| GET | `/public/:churchId/slug/:slug` | Pública | — | Obtener una publicación publicada por slug |
| GET | `/rss/:churchId?siteUrl=` | Pública | — | Fuente RSS 2.0 de las publicaciones publicadas (los enlaces se construyen como `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Obtener una publicación por ID |
| GET | `/` | JWT | — | Listar todas las publicaciones de la iglesia |
| POST | `/` | JWT | Content.Edit | Crear o actualizar publicaciones (por lotes) |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar una publicación |

## Redirecciones

Ruta base: `/content/redirects`

Redirecciones de URL por iglesia (`fromPath` → `toPath`), limitadas a 200 por iglesia. Las rutas se normalizan (en minúsculas, con barra inicial y sin barra final) y `fromPath` es único por iglesia. B1App resuelve estas redirecciones cuando se produciría un 404 y emite un HTTP 308.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/public/:churchId?path=` | Pública | — | Resolver una ruta (o listar todas las redirecciones si se omite `path`) |
| GET | `/:id` | JWT | — | Obtener una redirección por ID |
| GET | `/` | JWT | — | Listar todas las redirecciones de la iglesia |
| POST | `/` | JWT | Content.Edit | Crear o actualizar redirecciones. Rechaza `fromPath = toPath` y aplica el límite de 200 filas |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar una redirección |

## Sermones

Ruta base: `/content/sermons`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Obtener un ejemplo de la estructura de lista de reproducción de FreeShow |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Obtener el contenedor de la aplicación de TV con las fuentes de sermón, lección y FreeShow |
| GET | `/public/tvFeed/:churchId/:sermonId` | Pública | — | Obtener un solo sermón como lista de reproducción para el feed de TV |
| GET | `/public/tvFeed/:churchId` | Pública | — | Obtener todas las listas de reproducción/sermones públicos como feed de TV |
| GET | `/public/:churchId` | Pública | — | Listar todos los sermones públicos de una iglesia |
| GET | `/timeline?sermonIds=` | JWT | — | Cargar los datos de la línea de tiempo de los sermones |
| GET | `/lookup?videoType=&videoData=` | Pública | — | Buscar los metadatos de un sermón en YouTube o Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Generar sugerencias de publicaciones para redes sociales con IA a partir de los subtítulos del sermón |
| GET | `/outline?url=&title=&author=` | JWT | — | Generar un esquema de lección con IA a partir de una URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Importar videos de un canal de YouTube. Las entidades HTML que la API de búsqueda de YouTube incluye en los títulos y descripciones (como `&amp;` y `&#39;`) se decodifican |
| GET | `/vimeoImport/:channelId` | JWT | — | Importar videos de un canal de Vimeo |
| GET | `/:id` | JWT | — | Obtener un sermón por ID |
| GET | `/` | JWT | — | Listar todos los sermones |
| POST | `/` | JWT | StreamingServices.Edit | Crear o actualizar sermones. Acepta un array o un único objeto de sermón (siempre devuelve un array); un cuerpo vacío devuelve 400. Admite la subida de miniaturas en base64 |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Eliminar un sermón |

### Ejemplo: Buscar un sermón de YouTube

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

Extiende el CRUD estándar (GET `/:id`, GET `/`, DELETE `/:id` de la clase base, con el permiso StreamingServices.Edit para escritura).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtener una lista de reproducción por ID |
| GET | `/` | JWT | — | Listar todas las listas de reproducción |
| GET | `/public/:churchId` | Pública | — | Listar todas las listas de reproducción públicas de una iglesia |
| POST | `/` | JWT | StreamingServices.Edit | Crear o actualizar listas de reproducción (por lotes, admite la subida de miniaturas en base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Eliminar una lista de reproducción |

## Servicios de streaming

Ruta base: `/content/streamingServices`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Obtener el ID cifrado de la sala de chat del anfitrión para un servicio |
| GET | `/` | JWT | — | Listar todos los servicios de streaming. Limpia automáticamente los servicios caducados no recurrentes y avanza los recurrentes |
| POST | `/` | JWT | StreamingServices.Edit | Crear o actualizar servicios de streaming (por lotes) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Eliminar un servicio de streaming (también borra las IP bloqueadas) |

## Eventos

Ruta base: `/content/events`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Cargar los eventos de la línea de tiempo de un grupo (incluye las fechas de excepción, para que se puedan omitir las ocurrencias eliminadas) |
| GET | `/timeline?eventIds=` | JWT | — | Cargar los eventos de la línea de tiempo de los grupos del usuario actual (incluye las fechas de excepción) |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Pública | — | Suscribirse a los eventos como feed de calendario ICS |
| GET | `/group/:groupId` | JWT | — | Obtener los eventos de un grupo (incluye las fechas de excepción) |
| GET | `/public/group/:churchId/:groupId` | Pública | — | Obtener los eventos públicos de un grupo |
| GET | `/public/:churchId/:id` | Pública | — | Obtener un evento para su página pública, con `roomNames` (salas de las reservas que no están rechazadas). Devuelve `null` para eventos pendientes o rechazados y para eventos privados que no admiten inscripciones |
| GET | `/public/:churchId/:id/ical` | Pública | — | Descargar ese evento como archivo `.ics` (`text/calendar`, con las fechas de excepción aplicadas). Devuelve `404` cuando el evento está oculto según las mismas reglas |
| GET | `/:id` | JWT | — | Obtener un evento por ID |
| POST | `/` | JWT | — | Crear o actualizar eventos (por lotes) |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin o líder de grupo | Eliminar un evento y sus reservas. Los líderes del grupo del evento pueden eliminarlo, y un solicitante puede retirar su propia solicitud pendiente |

Los registros de eventos incluyen `photoUrl` (la foto del evento en formato 16:9 que se muestra en la página pública del evento y en las tarjetas de eventos próximos), `tags` (separadas por comas, usadas por el filtro de etiquetas del elemento Calendario del sitio web) y `notesViewRole` / `notesPostRole` (`staff` cuando es `null`, `leaders` o `members`), que controlan la conversación `eventNote` del evento. Consulta [Control de acceso a las notas de grupos y eventos](./messaging.md#group-and-event-notes-access-control). Las respuestas de eventos curados públicos también incluyen el `photoUrl` y los `tags` de cada evento.

## Excepciones de eventos

Ruta base: `/content/eventExceptions`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtener una excepción de evento por ID |
| POST | `/` | JWT | Content.Edit, Calendars.Admin o líder de grupo | Crear o actualizar excepciones de eventos (por lotes). Los líderes solo pueden añadir excepciones a eventos de grupos que dirigen |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin o líder de grupo | Eliminar una excepción de evento |

## Calendarios curados

Ruta base: `/content/curatedCalendars`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtener un calendario curado por ID |
| GET | `/` | JWT | — | Listar todos los calendarios curados |
| POST | `/` | JWT | Content.Edit | Crear o actualizar calendarios curados (por lotes) |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar un calendario curado |

## Eventos curados

Ruta base: `/content/curatedEvents`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Obtener los eventos curados de un calendario (incluye los detalles de los eventos y las fechas de excepción, a menos que se use `?withoutEvents`) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Pública | — | Obtener los eventos curados públicos de un calendario |
| GET | `/:id` | JWT | — | Obtener un evento curado por ID |
| GET | `/` | JWT | — | Listar todos los eventos curados |
| POST | `/` | JWT | Content.Edit | Crear o actualizar eventos curados. Admite un array `eventIds` para añadir eventos de grupos específicos |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar un evento curado |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Quitar un evento específico de un calendario curado |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Quitar de un calendario curado todos los eventos de un grupo |

## Archivos

Ruta base: `/content/files`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Obtener archivos por tipo de contenido e ID de contenido |
| GET | `/` | JWT | — | Listar todos los archivos del sitio web de la iglesia |
| GET | `/:id` | JWT | — | Obtener un archivo por ID |
| POST | `/` | JWT | Content.Edit* | Subir archivos (base64). *También permitido si el usuario es miembro del grupo que corresponde a `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Obtener una URL prefirmada de S3 para subir archivos. *También permitido para miembros del grupo. Máximo 100 MB por elemento de contenido |
| DELETE | `/:id` | JWT | Content.Edit* | Eliminar un archivo y quitarlo del almacenamiento. *También permitido para miembros del grupo |

## Galería

Ruta base: `/content/gallery`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/stock/:folder` | Pública | — | Listar fotos de stock de una carpeta |
| GET | `/:folder` | JWT | Content.Edit | Listar las imágenes de la galería de una carpeta |
| POST | `/requestUpload` | JWT | Content.Edit | Obtener una URL prefirmada de S3 para subir una imagen de la galería |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Eliminar una imagen de la galería |

## Biblias

Ruta base: `/content/bibles`

Todos los endpoints de la Biblia son públicos (no requieren autenticación). Los datos se obtienen de fuentes externas y se almacenan en caché local. Las solicitudes a api.bible caducan a los 15 segundos; un tiempo de espera agotado devuelve **504**.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | Pública | — | Listar todas las traducciones de la Biblia (las obtiene de la fuente si la caché está vacía) |
| GET | `/stats?startDate=&endDate=` | Pública | — | Obtener las estadísticas de consultas de la Biblia para un rango de fechas |
| GET | `/availableTranslations/:source` | Pública | — | Listar las traducciones disponibles de una fuente (p. ej., api.bible) |
| GET | `/updateTranslations` | Pública | — | Sincronizar todas las traducciones de todas las fuentes |
| GET | `/updateTranslations/:source` | Pública | — | Sincronizar las traducciones de una fuente específica |
| GET | `/updateCopyrights` | Pública | — | Actualizar la información de derechos de autor de las traducciones que no la tienen |
| GET | `/:translationKey/updateCopyright` | Pública | — | Actualizar los derechos de autor de una traducción específica |
| GET | `/:translationKey/search?query=&limit=` | Pública | — | Buscar versículos en una traducción |
| GET | `/:translationKey/books` | Pública | — | Obtener los libros de una traducción (se almacenan en caché local) |
| GET | `/:translationKey/:bookKey/chapters` | Pública | — | Obtener los capítulos de un libro (se almacenan en caché local) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Pública | — | Obtener los versículos de un capítulo (se almacenan en caché local) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Pública | — | Obtener el texto de un rango de versículos. Registra las consultas. Algunas traducciones omiten la caché por motivos de licencia |

### Ejemplo: Obtener el texto de versículos

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
| GET | `/search?q=` | JWT | — | Buscar canciones por consulta |
| GET | `/:id` | JWT | — | Obtener una canción por ID |
| GET | `/` | JWT | Content.Edit | Listar todas las canciones |
| POST | `/` | JWT | Content.Edit | Crear o actualizar canciones (por lotes) |
| POST | `/import` | JWT | — | Importar canciones desde FreeShow (por lotes) |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar una canción |

## Detalles de canciones

Ruta base: `/content/songDetails`

Los detalles de las canciones son globales (no están limitados a una iglesia). Representan los metadatos canónicos de las canciones compartidos entre iglesias.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtener un detalle de canción por ID (global) |
| GET | `/` | JWT | — | Listar los detalles de canciones de la iglesia |
| POST | `/create` | JWT | — | Crear un detalle de canción a partir de un ID de PraiseCharts (devuelve el existente si ya se creó). Obtiene automáticamente los metadatos de PraiseCharts y MusicBrainz |
| POST | `/` | JWT | — | Crear o actualizar detalles de canciones (por lotes) |

## Enlaces de detalles de canciones

Ruta base: `/content/songDetailLinks`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtener un enlace de detalle de canción por ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Obtener todos los enlaces de un detalle de canción |
| POST | `/` | JWT | — | Crear o actualizar enlaces de detalles de canciones (por lotes). Obtiene automáticamente los datos de MusicBrainz si hay un enlace |
| DELETE | `/:id` | JWT | — | Eliminar un enlace de detalle de canción |

## Arreglos

Ruta base: `/content/arrangements`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtener un arreglo por ID |
| GET | `/song/:songId` | JWT | Content.Edit | Obtener los arreglos de una canción |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Obtener los arreglos de un detalle de canción |
| GET | `/` | JWT | Content.Edit | Listar todos los arreglos |
| POST | `/` | JWT | Content.Edit | Crear o actualizar arreglos (por lotes) |
| POST | `/freeShow/missing` | JWT | — | Buscar los ID de FreeShow que no existen en la iglesia. Cuerpo: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar un arreglo (también elimina las tonalidades; elimina la canción si no quedan arreglos) |

## Tonalidades de arreglos

Ruta base: `/content/arrangementKeys`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/presenter/:churchId/:id` | Pública | — | Obtener una tonalidad de arreglo con los datos completos de la canción para la vista del presentador |
| GET | `/:id` | JWT | — | Obtener una tonalidad de arreglo por ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Obtener las tonalidades de un arreglo |
| GET | `/` | JWT | Content.Edit | Listar todas las tonalidades de arreglos |
| POST | `/` | JWT | Content.Edit | Crear o actualizar tonalidades de arreglos (por lotes) |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar una tonalidad de arreglo |

## Configuración

Ruta base: `/content/settings`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/my` | JWT | — | Obtener la configuración del usuario actual |
| GET | `/` | JWT | Settings.Edit | Obtener toda la configuración de la iglesia |
| GET | `/public/:churchId` | Pública | — | Obtener la configuración pública de una iglesia (se devuelve como pares clave-valor) |
| POST | `/my` | JWT | — | Guardar la configuración a nivel de usuario (admite subida de imágenes en base64) |
| POST | `/` | JWT | Settings.Edit | Guardar la configuración a nivel de iglesia (admite subida de imágenes en base64) |
| DELETE | `/my/:id` | JWT | — | Eliminar una configuración de usuario |

## Vista previa

Ruta base: `/content/preview`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/data/:key` | Pública | — | Cargar los datos de vista previa de streaming de una iglesia por clave de subdominio (pestañas, enlaces, servicios, sermones) |

## Galería (Fotos de stock)

Ruta base: `/content/stock`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| POST | `/search` | Pública | — | Buscar fotos de stock en Pexels. Cuerpo: `{ term: "church" }` |

## PraiseCharts

Ruta base: `/content/praiseCharts`

Integración con PraiseCharts para el descubrimiento de canciones de adoración y la descarga de partituras.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/raw/:id` | JWT | — | Obtener los datos sin procesar de PraiseCharts de una canción |
| GET | `/hasAccount` | JWT | — | Comprobar si el usuario tiene una cuenta de PraiseCharts vinculada |
| GET | `/search?q=` | JWT | — | Buscar en el catálogo de PraiseCharts |
| GET | `/products/:id?keys=` | JWT | — | Obtener los productos de una canción (de la biblioteca si está autenticado; si no, del catálogo) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Obtener los datos sin procesar de un arreglo desde la biblioteca |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Descargar un archivo de PraiseCharts (PDF o ZIP). Devuelve `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Pública | — | Obtener la URL de autorización OAuth de PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Intercambiar el verificador OAuth por un token de acceso y guardarlo en la configuración del usuario |
| GET | `/library` | JWT | — | Explorar la biblioteca de PraiseCharts del usuario |

## Soporte

Ruta base: `/content/support`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| POST | `/createAudio` | Pública | — | Convertir SSML a audio MP3 con AWS Polly. Cuerpo: `{ ssml: "<speak>...</speak>" }` |

## Páginas relacionadas

- [Arquitectura del constructor de sitios web](../../architecture/website-builder) -- Cómo se relacionan las páginas, secciones, elementos, publicaciones y redirecciones entre las aplicaciones
- [Endpoints de Membresía](./membership) -- Personas, iglesias, grupos, roles, permisos
- [Endpoints de Asistencia](./attendance) -- Seguimiento de servicios y visitas
- [Autenticación y permisos](./authentication) -- Flujo de inicio de sesión, JWT, modelo de permisos
- [Estructura del módulo](../module-structure) -- Patrones de organización del código
