---
title: "Puntos Finales de Contenido"
---

# Puntos Finales de Contenido

<div class="article-intro">

El módulo de Contenido gestiona páginas del sitio web, secciones, elementos, bloques, publicaciones de blog, redirecciones, sermones, listas de reproducción, servicios de transmisión, eventos, calendarios curados, archivos, galerías, traducciones bíblicas y búsquedas de versículos, canciones, arreglos, estilos globales, fotos de stock, y configuración. Es el módulo más grande en la API y alimenta el CMS, características de medios/transmisión, planificación de adoración, y características bíblicas en todas las aplicaciones de ChurchApps.

</div>

**Ruta base:** `/content`

## Pages

Ruta base: `/content/pages`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/:churchId/tree?url=&id=` | Público | — | Cargar árbol completo de página (secciones, elementos, bloques) por URL o ID. Elimina IDs internos cuando se obtiene por URL. Las búsquedas basadas en URL aplican `pages.visibility` — una página cerrada devuelve `{ restricted: true, visibility }` a menos que el JWT (opcional) satisfaga la condición |
| GET | `/public/:churchId` | Público | — | Enumera páginas públicas (`url`, `title`, `metaDescription`); solo `visibility = everyone` |
| GET | `/:id` | JWT | — | Obtener una página por ID |
| GET | `/` | JWT | — | Enumera todas las páginas de la iglesia |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplicar una página con todas las secciones y elementos |
| POST | `/temp/ai` | JWT | Content.Edit | Guardar una página generada por IA (página, secciones, y elementos en una llamada) |
| POST | `/` | JWT | Content.Edit | Crear o actualizar páginas (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar una página |

### Ejemplo: Cargar Árbol de Página

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

## Sections

Ruta base: `/content/sections`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/:id` | JWT | — | Obtener una sección por ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Duplicar una sección o convertirla en un bloque reutilizable |
| POST | `/` | JWT | Content.Edit | Crear o actualizar secciones (lote). Actualiza automáticamente el orden de clasificación |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar una sección (actualiza automáticamente el orden de clasificación) |

## Elements

Ruta base: `/content/elements`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/:id` | JWT | — | Obtener un elemento por ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplicar un elemento con todos sus hijos |
| POST | `/` | JWT | Content.Edit | Crear o actualizar elementos (lote). Gestiona automáticamente columnas de fila y diapositivas de carrusel |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar un elemento |

## Blocks

Ruta base: `/content/blocks`

Extiende CRUD estándar (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` de la clase base con permiso Content.Edit para escrituras).

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/:id` | JWT | — | Obtener un bloque por ID |
| GET | `/` | JWT | — | Enumera todos los bloques |
| GET | `/:churchId/tree/:id` | Público | — | Cargar árbol completo de bloque con secciones y elementos |
| GET | `/blockType/:blockType` | JWT | — | Cargar bloques por tipo (p. ej. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Público | — | Cargar árbol de bloque de pie de página para una iglesia |
| POST | `/` | JWT | Content.Edit | Crear o actualizar bloques |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar un bloque |

## Links

Ruta base: `/content/links`

Extiende CRUD estándar (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` de la clase base con permiso Content.Edit para escrituras).

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/:id` | JWT | — | Obtener un enlace por ID |
| GET | `/` | JWT | — | Enumera todos los enlaces. Filtro opcional `?category=`. Se ordena automáticamente después de guardar |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Cargar enlaces filtrados por visibilidad (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Público | — | Cargar enlaces para una iglesia por categoría (público) |
| POST | `/` | JWT | Content.Edit | Crear o actualizar enlaces (lote). Se ordena automáticamente por categoría |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar un enlace |

## Global Styles

Ruta base: `/content/globalStyles`

Extiende CRUD estándar (POST `/`, DELETE `/:id` de la clase base con permiso Content.Edit para escrituras).

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/church/:churchId` | Público | — | Cargar estilos globales para una iglesia (devuelve valores predeterminados si no hay ninguno establecido) |
| GET | `/` | JWT | — | Cargar estilos globales para la iglesia autenticada |
| POST | `/` | JWT | Content.Edit | Crear o actualizar estilos globales |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar estilos globales |

## Page History

Ruta base: `/content/pageHistory`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Enumera entradas de historial para una página |
| GET | `/block/:blockId` | JWT | Content.Edit | Enumera entradas de historial para un bloque |
| GET | `/:id` | JWT | Content.Edit | Obtener una entrada de historial por ID |
| POST | `/` | JWT | Content.Edit | Guardar una instantánea de página/bloque. Limpia periódicamente entradas de más de 30 días |
| POST | `/restore/:id` | JWT | Content.Edit | Restaurar una página/bloque desde una instantánea de historial (elimina el contenido actual y lo recrea desde la instantánea) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Restaurar desde un objeto de instantánea en línea. Cuerpo: `{ pageId, blockId, snapshot }` |

## Posts (Blog)

Ruta base: `/content/posts`

Las publicaciones de blog son metadatos sobre páginas regulares: el `pageId` de cada publicación hace referencia a la página que contiene el cuerpo, y la fila de la publicación agrega `title`, `slug` (único por iglesia), `excerpt`, `authorId`, `photoUrl`, `publishDate`, `category`, y `tags`. Una publicación se publica una vez que `publishDate` está establecido y en el pasado. Consulta [Arquitectura del Generador de Sitios Web](../../architecture/website-builder#blog-posts-over-pages).

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Público | — | Enumera publicaciones publicadas, paginadas (máximo 50 por página) |
| GET | `/public/:churchId/slug/:slug` | Público | — | Obtener los metadatos de una publicación publicada por slug |
| GET | `/rss/:churchId?siteUrl=` | Público | — | Feed RSS 2.0 de publicaciones publicadas (enlaces construidos como `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Obtener una publicación por ID |
| GET | `/` | JWT | — | Enumera todas las publicaciones de la iglesia |
| POST | `/` | JWT | Content.Edit | Crear o actualizar publicaciones (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar una publicación |

## Redirects

Ruta base: `/content/redirects`

Redirecciones de URL por iglesia (`fromPath` → `toPath`), limitadas a 200 por iglesia. Las rutas se normalizan (en minúsculas, barra inicial, sin barra final) y `fromPath` es único por iglesia. B1App resuelve estas en potenciales 404 y emite un HTTP 308.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/public/:churchId?path=` | Público | — | Resolver una ruta (o enumerar todas las redirecciones cuando se omite `path`) |
| GET | `/:id` | JWT | — | Obtener una redirección por ID |
| GET | `/` | JWT | — | Enumera todas las redirecciones de la iglesia |
| POST | `/` | JWT | Content.Edit | Crear o actualizar redirecciones. Rechaza `fromPath = toPath` y aplica el límite de 200 filas |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar una redirección |

## Sermons

Ruta base: `/content/sermons`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Obtener una estructura de lista de reproducción FreeShow de muestra |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Obtener el wrapper de la aplicación TV con fuentes de sermón, lección, y FreeShow |
| GET | `/public/tvFeed/:churchId/:sermonId` | Público | — | Obtener un solo sermón como lista de reproducción de feed TV |
| GET | `/public/tvFeed/:churchId` | Público | — | Obtener todas las listas de reproducción/sermones públicos como feed TV |
| GET | `/public/:churchId` | Público | — | Enumera todos los sermones públicos de una iglesia |
| GET | `/timeline?sermonIds=` | JWT | — | Cargar datos de línea de tiempo para sermones |
| GET | `/lookup?videoType=&videoData=` | Público | — | Buscar metadatos de sermón desde YouTube o Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Generar sugerencias de publicaciones de redes sociales con IA a partir de subtítulos del sermón |
| GET | `/outline?url=&title=&author=` | JWT | — | Generar un esquema de lección con IA a partir de una URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Importar videos de un canal de YouTube |
| GET | `/vimeoImport/:channelId` | JWT | — | Importar videos de un canal de Vimeo |
| GET | `/:id` | JWT | — | Obtener un sermón por ID |
| GET | `/` | JWT | — | Enumera todos los sermones |
| POST | `/` | JWT | StreamingServices.Edit | Crear o actualizar sermones (lote, admite carga de miniatura en base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Eliminar un sermón |

### Ejemplo: Buscar un Sermón de YouTube

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

## Playlists

Ruta base: `/content/playlists`

Extiende CRUD estándar (GET `/:id`, GET `/`, DELETE `/:id` de la clase base con permiso StreamingServices.Edit para escrituras).

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/:id` | JWT | — | Obtener una lista de reproducción por ID |
| GET | `/` | JWT | — | Enumera todas las listas de reproducción |
| GET | `/public/:churchId` | Público | — | Enumera todas las listas de reproducción públicas de una iglesia |
| POST | `/` | JWT | StreamingServices.Edit | Crear o actualizar listas de reproducción (lote, admite carga de miniatura en base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Eliminar una lista de reproducción |

## Streaming Services

Ruta base: `/content/streamingServices`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Obtener el ID de sala de chat de anfitrión encriptado para un servicio |
| GET | `/` | JWT | — | Enumera todos los servicios de transmisión. Limpia automáticamente servicios no recurrentes expirados y avanza los recurrentes |
| POST | `/` | JWT | StreamingServices.Edit | Crear o actualizar servicios de transmisión (lote) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Eliminar un servicio de transmisión (también limpia IPs bloqueadas) |

## Events

Ruta base: `/content/events`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Cargar eventos de línea de tiempo para un grupo |
| GET | `/timeline?eventIds=` | JWT | — | Cargar eventos de línea de tiempo para los grupos del usuario actual |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Público | — | Suscribirse a eventos como feed de calendario ICS |
| GET | `/group/:groupId` | JWT | — | Obtener eventos para un grupo (incluye fechas de excepción) |
| GET | `/public/group/:churchId/:groupId` | Público | — | Obtener eventos públicos para un grupo |
| GET | `/:id` | JWT | — | Obtener un evento por ID |
| POST | `/` | JWT | — | Crear o actualizar eventos (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar un evento |

## Event Exceptions

Ruta base: `/content/eventExceptions`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/:id` | JWT | — | Obtener una excepción de evento por ID |
| POST | `/` | JWT | Content.Edit | Crear o actualizar excepciones de evento (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar una excepción de evento |

## Curated Calendars

Ruta base: `/content/curatedCalendars`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/:id` | JWT | — | Obtener un calendario curado por ID |
| GET | `/` | JWT | — | Enumera todos los calendarios curados |
| POST | `/` | JWT | Content.Edit | Crear o actualizar calendarios curados (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar un calendario curado |

## Curated Events

Ruta base: `/content/curatedEvents`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Obtener eventos curados para un calendario (incluye detalles de evento y fechas de excepción a menos que se establezca `?withoutEvents`) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Público | — | Obtener eventos curados públicos para un calendario |
| GET | `/:id` | JWT | — | Obtener un evento curado por ID |
| GET | `/` | JWT | — | Enumera todos los eventos curados |
| POST | `/` | JWT | Content.Edit | Crear o actualizar eventos curados. Admite un arreglo `eventIds` para agregar eventos de grupo específicos |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar un evento curado |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Quitar un evento específico de un calendario curado |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Quitar todos los eventos de un grupo de un calendario curado |

## Files

Ruta base: `/content/files`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Obtener archivos por tipo de contenido e ID de contenido |
| GET | `/` | JWT | — | Enumera todos los archivos para el sitio web de la iglesia |
| GET | `/:id` | JWT | — | Obtener un archivo por ID |
| POST | `/` | JWT | Content.Edit* | Cargar archivos (base64). *También permitido si el usuario es miembro del grupo que coincide con `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Obtener una URL de carga S3 pre-firmada. *También permitido para miembros de grupo. Máximo 100MB por elemento de contenido |
| DELETE | `/:id` | JWT | Content.Edit* | Eliminar un archivo y quitarlo del almacenamiento. *También permitido para miembros de grupo |

## Gallery

Ruta base: `/content/gallery`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/stock/:folder` | Público | — | Enumera fotos de stock en una carpeta |
| GET | `/:folder` | JWT | Content.Edit | Enumera imágenes de galería en una carpeta |
| POST | `/requestUpload` | JWT | Content.Edit | Obtener una URL de carga S3 pre-firmada para una imagen de galería |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Eliminar una imagen de galería |

## Bibles

Ruta base: `/content/bibles`

Todos los puntos finales de Biblia son públicos (no se requiere autenticación). Los datos se obtienen de fuentes externas y se almacenan en caché localmente.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | Público | — | Enumera todas las traducciones de la Biblia (obtiene de la fuente si la caché está vacía) |
| GET | `/stats?startDate=&endDate=` | Público | — | Obtener estadísticas de búsqueda bíblica para un rango de fechas |
| GET | `/availableTranslations/:source` | Público | — | Enumera traducciones disponibles de una fuente (p. ej. api.bible) |
| GET | `/updateTranslations` | Público | — | Sincronizar todas las traducciones de todas las fuentes |
| GET | `/updateTranslations/:source` | Público | — | Sincronizar traducciones de una fuente específica |
| GET | `/updateCopyrights` | Público | — | Actualizar información de derechos de autor para traducciones a las que les falta |
| GET | `/:translationKey/updateCopyright` | Público | — | Actualizar los derechos de autor de una traducción específica |
| GET | `/:translationKey/search?query=&limit=` | Público | — | Buscar versículos en una traducción |
| GET | `/:translationKey/books` | Público | — | Obtener libros para una traducción (almacena en caché localmente) |
| GET | `/:translationKey/:bookKey/chapters` | Público | — | Obtener capítulos para un libro (almacena en caché localmente) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Público | — | Obtener versículos para un capítulo (almacena en caché localmente) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Público | — | Obtener texto de versículo para un rango. Registra las búsquedas. Algunas traducciones omiten el almacenamiento en caché por licencia |

### Ejemplo: Obtener Texto de Versículo

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

## Songs

Ruta base: `/content/songs`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/search?q=` | JWT | — | Buscar canciones por consulta |
| GET | `/:id` | JWT | — | Obtener una canción por ID |
| GET | `/` | JWT | Content.Edit | Enumera todas las canciones |
| POST | `/` | JWT | Content.Edit | Crear o actualizar canciones (lote) |
| POST | `/import` | JWT | — | Importar canciones desde FreeShow (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar una canción |

## Song Details

Ruta base: `/content/songDetails`

Los detalles de canción son globales (no delimitados por iglesia). Estos representan metadatos canónicos de canción compartidos entre iglesias.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/:id` | JWT | — | Obtener un detalle de canción por ID (global) |
| GET | `/` | JWT | — | Enumera detalles de canción para la iglesia |
| POST | `/create` | JWT | — | Crear un detalle de canción a partir de un ID de PraiseCharts (devuelve el existente si ya fue creado). Obtiene automáticamente metadatos de PraiseCharts y MusicBrainz |
| POST | `/` | JWT | — | Crear o actualizar detalles de canción (lote) |

## Song Detail Links

Ruta base: `/content/songDetailLinks`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/:id` | JWT | — | Obtener un enlace de detalle de canción por ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Obtener todos los enlaces para un detalle de canción |
| POST | `/` | JWT | — | Crear o actualizar enlaces de detalle de canción (lote). Obtiene automáticamente datos de MusicBrainz si está vinculado |
| DELETE | `/:id` | JWT | — | Eliminar un enlace de detalle de canción |

## Arrangements

Ruta base: `/content/arrangements`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/:id` | JWT | — | Obtener un arreglo por ID |
| GET | `/song/:songId` | JWT | Content.Edit | Obtener arreglos para una canción |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Obtener arreglos para un detalle de canción |
| GET | `/` | JWT | Content.Edit | Enumera todos los arreglos |
| POST | `/` | JWT | Content.Edit | Crear o actualizar arreglos (lote) |
| POST | `/freeShow/missing` | JWT | — | Encontrar IDs de FreeShow que no existen en la iglesia. Cuerpo: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar un arreglo (también elimina claves; elimina la canción si no quedan arreglos) |

## Arrangement Keys

Ruta base: `/content/arrangementKeys`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/presenter/:churchId/:id` | Público | — | Obtener la clave de arreglo con datos completos de canción para la vista de presentador |
| GET | `/:id` | JWT | — | Obtener una clave de arreglo por ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Obtener claves para un arreglo |
| GET | `/` | JWT | Content.Edit | Enumera todas las claves de arreglo |
| POST | `/` | JWT | Content.Edit | Crear o actualizar claves de arreglo (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar una clave de arreglo |

## Settings

Ruta base: `/content/settings`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/my` | JWT | — | Obtener la configuración del usuario actual |
| GET | `/` | JWT | Settings.Edit | Obtener toda la configuración de la iglesia |
| GET | `/public/:churchId` | Público | — | Obtener configuración pública de una iglesia (devuelta como pares clave-valor) |
| POST | `/my` | JWT | — | Guardar configuración a nivel de usuario (admite carga de imagen en base64) |
| POST | `/` | JWT | Settings.Edit | Guardar configuración a nivel de iglesia (admite carga de imagen en base64) |
| DELETE | `/my/:id` | JWT | — | Eliminar una configuración de usuario |

## Preview

Ruta base: `/content/preview`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/data/:key` | Público | — | Cargar datos de vista previa de transmisión para una iglesia por clave de subdominio (pestañas, enlaces, servicios, sermones) |

## Gallery (Stock Photos)

Ruta base: `/content/stock`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| POST | `/search` | Público | — | Buscar fotos de stock de Pexels. Cuerpo: `{ term: "church" }` |

## PraiseCharts

Ruta base: `/content/praiseCharts`

Integración con PraiseCharts para descubrimiento de canciones de adoración y descargas de partituras.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/raw/:id` | JWT | — | Obtener datos crudos de PraiseCharts para una canción |
| GET | `/hasAccount` | JWT | — | Verificar si el usuario tiene una cuenta de PraiseCharts vinculada |
| GET | `/search?q=` | JWT | — | Buscar en el catálogo de PraiseCharts |
| GET | `/products/:id?keys=` | JWT | — | Obtener productos para una canción (desde la biblioteca si está autenticado, de lo contrario del catálogo) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Obtener datos crudos de arreglo desde la biblioteca |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Descargar un archivo de PraiseCharts (PDF o ZIP). Devuelve `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Público | — | Obtener URL de autorización OAuth para PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Intercambiar el verificador OAuth por un token de acceso y guardarlo en la configuración de usuario |
| GET | `/library` | JWT | — | Explorar la biblioteca de PraiseCharts del usuario |

## Support

Ruta base: `/content/support`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| POST | `/createAudio` | Público | — | Convertir SSML a audio MP3 usando AWS Polly. Cuerpo: `{ ssml: "<speak>...</speak>" }` |

## Páginas Relacionadas

- [Arquitectura del Generador de Sitios Web](../../architecture/website-builder) -- Cómo encajan páginas, secciones, elementos, publicaciones, y redirecciones en todas las aplicaciones
- [Puntos Finales de Membresía](./membership) -- Personas, iglesias, grupos, roles, permisos
- [Puntos Finales de Asistencia](./attendance) -- Rastreo de servicio y visitas
- [Autenticación y Permisos](./authentication) -- Flujo de inicio de sesión, JWT, modelo de permisos
- [Estructura del Módulo](../module-structure) -- Patrones de organización del código
