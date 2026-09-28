---
title: "Puntos Finales de Contenido"
---

# Puntos Finales de Contenido

<div class="article-intro">

El módulo de Contenido administra páginas de sitios web, secciones, elementos, bloques, publicaciones de blog, redirecciones, sermones, listas de reproducción, servicios de transmisión, eventos, calendarios curados, archivos, galerías, traducciones de la Biblia y búsquedas de versículos, canciones, arreglos, estilos globales, fotos de stock y configuración. Es el módulo más grande en la API y alimenta el CMS, media/streaming, planificación de adoración y características de la Biblia en todas las aplicaciones de ChurchApps.

</div>

**Ruta base:** `/content`

## Páginas

Ruta base: `/content/pages`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Público | — | Cargar árbol completo de página (secciones, elementos, bloques) por URL o ID. Elimina IDs internos cuando se obtienen por URL. Las búsquedas basadas en URL hacen cumplir `pages.visibility` — una página cerrada devuelve `{ restricted: true, visibility }` a menos que el JWT (opcional) satisfaga la puerta |
| GET | `/public/:churchId` | Público | — | Listar páginas públicas (`url`, `title`, `metaDescription`); solo `visibility = everyone` |
| GET | `/:id` | JWT | — | Obtener una página por ID |
| GET | `/` | JWT | — | Listar todas las páginas de la iglesia |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplicar una página con todas sus secciones y elementos |
| POST | `/temp/ai` | JWT | Content.Edit | Guardar una página generada por IA (página, secciones y elementos en una sola llamada) |
| POST | `/importTree` | JWT | Content.Edit | Crear una página a partir de un árbol anidado (`title`, `url`, `sections[].elements[]…`). Siempre se inserta bajo la iglesia del llamante; los ids en el cuerpo se ignoran. Las filas deben incluir sus hijos `column`. Máx. 30 secciones / 500 elementos |
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

## Secciones

Ruta base: `/content/sections`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtener una sección por ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Duplicar una sección o convertirla en un bloque reutilizable |
| POST | `/` | JWT | Content.Edit | Crear o actualizar secciones (lote). Actualiza automáticamente el orden de clasificación |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar una sección (actualiza automáticamente el orden de clasificación) |

## Elementos

Ruta base: `/content/elements`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtener un elemento por ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplicar un elemento con todos sus hijos |
| POST | `/` | JWT | Content.Edit | Crear o actualizar elementos (lote). Administra automáticamente columnas de fila y diapositivas de carrusel |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar un elemento |

## Bloques

Ruta base: `/content/blocks`

Extiende CRUD estándar (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` de clase base con permiso Content.Edit para escrituras).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtener un bloque por ID |
| GET | `/` | JWT | — | Listar todos los bloques |
| GET | `/:churchId/tree/:id` | Público | — | Cargar árbol completo de bloque con secciones y elementos |
| GET | `/blockType/:blockType` | JWT | — | Cargar bloques por tipo (p. ej. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Público | — | Cargar árbol de bloque de pie de página para una iglesia |
| POST | `/` | JWT | Content.Edit | Crear o actualizar bloques |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar un bloque |

## Enlaces

Ruta base: `/content/links`

Extiende CRUD estándar (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` de clase base con permiso Content.Edit para escrituras).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtener un enlace por ID |
| GET | `/` | JWT | — | Listar todos los enlaces. Filtro `?category=` opcional. Se ordena automáticamente después de guardar |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Cargar enlaces filtrados por visibilidad (todos, visitantes, miembros, personal, grupos) |
| GET | `/church/:churchId?category=` | Público | — | Cargar enlaces para una iglesia por categoría (público) |
| POST | `/` | JWT | Content.Edit | Crear o actualizar enlaces (lote). Se ordena automáticamente por categoría |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar un enlace |

## Estilos Globales

Ruta base: `/content/globalStyles`

Extiende CRUD estándar (POST `/`, DELETE `/:id` de clase base con permiso Content.Edit para escrituras).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Público | — | Cargar estilos globales para una iglesia (devuelve valores predeterminados si no hay ninguno configurado) |
| GET | `/` | JWT | — | Cargar estilos globales para la iglesia autenticada |
| POST | `/` | JWT | Content.Edit | Crear o actualizar estilos globales |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar estilos globales |

## Historial de Página

Ruta base: `/content/pageHistory`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Listar entradas de historial para una página |
| GET | `/block/:blockId` | JWT | Content.Edit | Listar entradas de historial para un bloque |
| GET | `/:id` | JWT | Content.Edit | Obtener una entrada de historial por ID |
| POST | `/` | JWT | Content.Edit | Guardar una instantánea de página/bloque. Limpia periódicamente las entradas más antiguas que 30 días |
| POST | `/restore/:id` | JWT | Content.Edit | Restaurar una página/bloque desde una instantánea de historial (elimina contenido actual y recrea desde instantánea) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Restaurar desde un objeto de instantánea en línea. Cuerpo: `{ pageId, blockId, snapshot }` |

## Publicaciones (Blog)

Ruta base: `/content/posts`

Las publicaciones de blog son filas independientes: `title`, `slug` (única por iglesia), `excerpt`, `content` (cuerpo de markdown), `authorId`, `photoUrl`, `publishDate`, `category` y `tags`. Una publicación se publica una vez que se establece `publishDate` y está en el pasado. Los puntos finales de lectura enriquecen cada publicación con `authorName` resuelto de `authorId`. Ver [Arquitectura del Constructor de Sitios Web](../../architecture/website-builder#blog).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Público | — | Listar publicaciones publicadas, paginadas (máx. 50 por página) |
| GET | `/public/:churchId/categories` | Público | — | Categorías distintas en publicaciones publicadas |
| GET | `/public/:churchId/slug/:slug` | Público | — | Obtener una publicación publicada por slug |
| GET | `/rss/:churchId?siteUrl=` | Público | — | Feed RSS 2.0 de publicaciones publicadas (enlaces construidos como `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Obtener una publicación por ID |
| GET | `/` | JWT | — | Listar todas las publicaciones de la iglesia |
| POST | `/` | JWT | Content.Edit | Crear o actualizar publicaciones (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar una publicación |

## Redirecciones

Ruta base: `/content/redirects`

Redirecciones de URL por iglesia (`fromPath` → `toPath`), limitadas a 200 por iglesia. Las rutas se normalizan (minúsculas, barra diagonal inicial, sin barra diagonal final) y `fromPath` es única por iglesia. B1App resuelve estas en los 404 que sucederían y emite un HTTP 308.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Público | — | Resolver una ruta (o listar todas las redirecciones cuando se omite `path`) |
| GET | `/:id` | JWT | — | Obtener una redirección por ID |
| GET | `/` | JWT | — | Listar todas las redirecciones para la iglesia |
| POST | `/` | JWT | Content.Edit | Crear o actualizar redirecciones. Rechaza `fromPath = toPath` y refuerza el límite de 200 filas |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar una redirección |

## Sermones

Ruta base: `/content/sermons`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Obtener estructura de lista de reproducción de muestra de FreeShow |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Obtener envoltura de aplicación de TV con fuentes de sermón, lección y FreeShow |
| GET | `/public/tvFeed/:churchId/:sermonId` | Público | — | Obtener un sermón único como lista de reproducción de feed de TV |
| GET | `/public/tvFeed/:churchId` | Público | — | Obtener todas las listas de reproducción/sermones públicos como feed de TV |
| GET | `/public/:churchId` | Público | — | Listar todos los sermones públicos para una iglesia |
| GET | `/timeline?sermonIds=` | JWT | — | Cargar datos de línea de tiempo para sermones |
| GET | `/lookup?videoType=&videoData=` | Público | — | Buscar metadatos de sermón de YouTube o Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Generar sugerencias de publicaciones en redes sociales por IA de subtítulos de sermones |
| GET | `/outline?url=&title=&author=` | JWT | — | Generar esquema de lección por IA de una URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Importar videos de un canal de YouTube |
| GET | `/vimeoImport/:channelId` | JWT | — | Importar videos de un canal de Vimeo |
| GET | `/:id` | JWT | — | Obtener un sermón por ID |
| GET | `/` | JWT | — | Listar todos los sermones |
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

## Listas de Reproducción

Ruta base: `/content/playlists`

Extiende CRUD estándar (GET `/:id`, GET `/`, DELETE `/:id` de clase base con permiso StreamingServices.Edit para escrituras).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtener una lista de reproducción por ID |
| GET | `/` | JWT | — | Listar todas las listas de reproducción |
| GET | `/public/:churchId` | Público | — | Listar todas las listas de reproducción públicas para una iglesia |
| POST | `/` | JWT | StreamingServices.Edit | Crear o actualizar listas de reproducción (lote, admite carga de miniatura en base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Eliminar una lista de reproducción |

## Servicios de Transmisión

Ruta base: `/content/streamingServices`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Obtener ID de sala de chat de anfitrión cifrada para un servicio |
| GET | `/` | JWT | — | Listar todos los servicios de transmisión. Limpia automáticamente servicios no recurrentes expirados y avanza en recurrentes |
| POST | `/` | JWT | StreamingServices.Edit | Crear o actualizar servicios de transmisión (lote) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Eliminar un servicio de transmisión (también borra IPs bloqueadas) |

## Eventos

Ruta base: `/content/events`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Cargar eventos de línea de tiempo para un grupo |
| GET | `/timeline?eventIds=` | JWT | — | Cargar eventos de línea de tiempo para los grupos del usuario actual |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Público | — | Suscribirse a eventos como feed de calendario ICS |
| GET | `/group/:groupId` | JWT | — | Obtener eventos para un grupo (incluye fechas de excepción) |
| GET | `/public/group/:churchId/:groupId` | Público | — | Obtener eventos públicos para un grupo |
| GET | `/:id` | JWT | — | Obtener un evento por ID |
| POST | `/` | JWT | — | Crear o actualizar eventos (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar un evento |

## Excepciones de Eventos

Ruta base: `/content/eventExceptions`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtener una excepción de evento por ID |
| POST | `/` | JWT | Content.Edit | Crear o actualizar excepciones de evento (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar una excepción de evento |

## Calendarios Curados

Ruta base: `/content/curatedCalendars`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtener un calendario curado por ID |
| GET | `/` | JWT | — | Listar todos los calendarios curados |
| POST | `/` | JWT | Content.Edit | Crear o actualizar calendarios curados (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar un calendario curado |

## Eventos Curados

Ruta base: `/content/curatedEvents`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Obtener eventos curados para un calendario (incluye detalles de evento y fechas de excepción a menos que se establezca `?withoutEvents`) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Público | — | Obtener eventos curados públicos para un calendario |
| GET | `/:id` | JWT | — | Obtener un evento curado por ID |
| GET | `/` | JWT | — | Listar todos los eventos curados |
| POST | `/` | JWT | Content.Edit | Crear o actualizar eventos curados. Admite matriz `eventIds` para agregar eventos de grupo específicos |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar un evento curado |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Eliminar un evento específico de un calendario curado |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Eliminar todos los eventos de un grupo de un calendario curado |

## Archivos

Ruta base: `/content/files`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Obtener archivos por tipo de contenido e ID de contenido |
| GET | `/` | JWT | — | Listar todos los archivos para el sitio web de la iglesia |
| GET | `/:id` | JWT | — | Obtener un archivo por ID |
| POST | `/` | JWT | Content.Edit* | Cargar archivos (base64). *También permitido si el usuario es miembro del grupo que coincide con `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Obtener URL de carga preautenticada de S3. *También permitido para miembros del grupo. Máx. 100 MB por elemento de contenido |
| DELETE | `/:id` | JWT | Content.Edit* | Eliminar un archivo y eliminar del almacenamiento. *También permitido para miembros del grupo |

## Galería

Ruta base: `/content/gallery`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Público | — | Listar fotos de stock en una carpeta |
| GET | `/:folder` | JWT | Content.Edit | Listar imágenes de galería en una carpeta |
| POST | `/requestUpload` | JWT | Content.Edit | Obtener URL de carga preautenticada de S3 para una imagen de galería |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Eliminar una imagen de galería |

## Biblias

Ruta base: `/content/bibles`

Todos los puntos finales de Biblia son públicos (no se requiere autenticación). Los datos se obtienen de fuentes externas y se almacenan en caché localmente.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/` | Público | — | Listar todas las traducciones de la Biblia (obtiene de la fuente si la caché está vacía) |
| GET | `/stats?startDate=&endDate=` | Público | — | Obtener estadísticas de búsqueda de la Biblia para un rango de fechas |
| GET | `/availableTranslations/:source` | Público | — | Listar traducciones disponibles de una fuente (p. ej. api.bible) |
| GET | `/updateTranslations` | Público | — | Sincronizar todas las traducciones de todas las fuentes |
| GET | `/updateTranslations/:source` | Público | — | Sincronizar traducciones de una fuente específica |
| GET | `/updateCopyrights` | Público | — | Actualizar información de derechos de autor para traducciones que le falta |
| GET | `/:translationKey/updateCopyright` | Público | — | Actualizar derechos de autor para una traducción específica |
| GET | `/:translationKey/search?query=&limit=` | Público | — | Buscar versículos en una traducción |
| GET | `/:translationKey/books` | Público | — | Obtener libros para una traducción (se almacena en caché localmente) |
| GET | `/:translationKey/:bookKey/chapters` | Público | — | Obtener capítulos para un libro (se almacena en caché localmente) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Público | — | Obtener versículos para un capítulo (se almacena en caché localmente) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Público | — | Obtener texto de versículo para un rango. Registra búsquedas. Algunas traducciones omiten el almacenamiento en caché por licencia |

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

## Canciones

Ruta base: `/content/songs`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | Buscar canciones por consulta |
| GET | `/:id` | JWT | — | Obtener una canción por ID |
| GET | `/` | JWT | Content.Edit | Listar todas las canciones |
| POST | `/` | JWT | Content.Edit | Crear o actualizar canciones (lote) |
| POST | `/import` | JWT | — | Importar canciones de FreeShow (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar una canción |

## Detalles de Canción

Ruta base: `/content/songDetails`

Los detalles de la canción son globales (no limitados a iglesia). Estos representan metadatos de canción canónica compartidos entre iglesias.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtener un detalle de canción por ID (global) |
| GET | `/` | JWT | — | Listar detalles de canción para la iglesia |
| POST | `/create` | JWT | — | Crear un detalle de canción a partir del ID de PraiseCharts (devuelve existente si ya se creó). Obtiene automáticamente metadatos de PraiseCharts y MusicBrainz |
| POST | `/` | JWT | — | Crear o actualizar detalles de canción (lote) |

## Enlaces de Detalles de Canción

Ruta base: `/content/songDetailLinks`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtener un enlace de detalle de canción por ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Obtener todos los enlaces para un detalle de canción |
| POST | `/` | JWT | — | Crear o actualizar enlaces de detalle de canción (lote). Obtiene automáticamente datos de MusicBrainz si está vinculado |
| DELETE | `/:id` | JWT | — | Eliminar un enlace de detalle de canción |

## Arreglos

Ruta base: `/content/arrangements`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtener un arreglo por ID |
| GET | `/song/:songId` | JWT | Content.Edit | Obtener arreglos para una canción |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Obtener arreglos para un detalle de canción |
| GET | `/` | JWT | Content.Edit | Listar todos los arreglos |
| POST | `/` | JWT | Content.Edit | Crear o actualizar arreglos (lote) |
| POST | `/freeShow/missing` | JWT | — | Encontrar IDs de FreeShow que no existen en la iglesia. Cuerpo: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar un arreglo (también elimina claves; elimina la canción si no quedan arreglos) |

## Claves de Arreglo

Ruta base: `/content/arrangementKeys`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Público | — | Obtener clave de arreglo con datos de canción completa para vista de presentador |
| GET | `/:id` | JWT | — | Obtener una clave de arreglo por ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Obtener claves para un arreglo |
| GET | `/` | JWT | Content.Edit | Listar todas las claves de arreglo |
| POST | `/` | JWT | Content.Edit | Crear o actualizar claves de arreglo (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar una clave de arreglo |

## Configuración

Ruta base: `/content/settings`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Obtener configuración del usuario actual |
| GET | `/` | JWT | Settings.Edit | Obtener toda la configuración para la iglesia |
| GET | `/public/:churchId` | Público | — | Obtener configuración pública para una iglesia (devuelto como pares clave-valor) |
| POST | `/my` | JWT | — | Guardar configuración a nivel de usuario (admite carga de imagen en base64) |
| POST | `/` | JWT | Settings.Edit | Guardar configuración a nivel de iglesia (admite carga de imagen en base64) |
| DELETE | `/my/:id` | JWT | — | Eliminar una configuración de usuario |

## Vista Previa

Ruta base: `/content/preview`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Público | — | Cargar datos de vista previa de transmisión para una iglesia por clave de subdominio (pestañas, enlaces, servicios, sermones) |

## Galería (Fotos de Stock)

Ruta base: `/content/stock`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| POST | `/search` | Público | — | Buscar fotos de stock de Pexels. Cuerpo: `{ term: "church" }` |

## PraiseCharts

Ruta base: `/content/praiseCharts`

Integración con PraiseCharts para descubrimiento de canciones de adoración y descargas de partituras.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | Obtener datos sin procesar de PraiseCharts para una canción |
| GET | `/hasAccount` | JWT | — | Verificar si el usuario tiene una cuenta de PraiseCharts vinculada |
| GET | `/search?q=` | JWT | — | Buscar en el catálogo de PraiseCharts |
| GET | `/products/:id?keys=` | JWT | — | Obtener productos para una canción (de biblioteca si autenticado, de lo contrario catálogo) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Obtener datos de arreglo sin procesar de biblioteca |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Descargar un archivo de PraiseCharts (PDF o ZIP). Devuelve `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Público | — | Obtener URL de autorización OAuth para PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Intercambiar verificador OAuth por token de acceso y guardar en configuración del usuario |
| GET | `/library` | JWT | — | Examinar biblioteca de PraiseCharts del usuario |

## Apoyo

Ruta base: `/content/support`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Público | — | Convertir SSML a audio MP3 usando AWS Polly. Cuerpo: `{ ssml: "<speak>...</speak>" }` |

## Páginas Relacionadas

- [Arquitectura del Constructor de Sitios Web](../../architecture/website-builder) -- Cómo se ajustan páginas, secciones, elementos, publicaciones y redirecciones en todas las aplicaciones
- [Puntos Finales de Membresía](./membership) -- Personas, iglesias, grupos, roles, permisos
- [Puntos Finales de Asistencia](./attendance) -- Seguimiento de servicio y visita
- [Autenticación y Permisos](./authentication) -- Flujo de inicio de sesión, JWT, modelo de permiso
- [Estructura del Módulo](../module-structure) -- Patrones de organización de código
