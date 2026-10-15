---
title: "Proveedor de contenido para FreePlay"
---

# Proveedor de contenido para FreePlay

<div class="article-intro">

FreePlay es el reproductor multimedia de ChurchApps para transmitir lecciones y otro contenido de video en teléfonos, tabletas y televisores. Si tienes una biblioteca de contenido de lecciones y quieres ponerla a disposición en FreePlay, esta guía explica todo lo que necesitas proporcionar.

</div>

## Identidad visual

Antes de que pueda comenzar la integración, necesitamos:

- **Logo**: una imagen del logo con relación de aspecto **16:9** (se usa en las tarjetas de proveedor de la interfaz de FreePlay)
- **Nombre de la marca**: el nombre preferido para mostrar tu organización en FreePlay

## Endpoints de la API

FreePlay se comunica con tu servicio a través de un pequeño conjunto de endpoints REST. Escribimos un adaptador personalizado para cada proveedor, por lo que la estructura exacta de las URL es flexible, pero la información que aparece a continuación es la que necesitamos.

### Autenticación

Elige el modelo que mejor se adapte a tu contenido:

| Modelo | Cuándo usarlo | Qué necesitamos |
|-------|-------------|--------------|
| **Ninguno** | Contenido público, no requiere inicio de sesión | Nada: llamamos directamente a tus endpoints de catálogo |
| **OAuth (PKCE)** | Inicio de sesión web o móvil | URL de autorización, endpoint de intercambio de tokens, client ID, scopes |
| **Device Flow** | Recomendado para apps de TV (el usuario introduce un código corto en su teléfono) | Endpoint de autorización de dispositivo, endpoint de sondeo de tokens, client ID |

:::tip
Si tu contenido requiere autenticación, el endpoint de autenticación devuelve un **token de usuario** que FreePlay pasa a los endpoints de exploración y de lecciones para autorizar el acceso.
:::

### Explorar / catálogo

Un endpoint (o un conjunto de endpoints) que devuelve un **árbol de carpetas** con todas las lecciones disponibles.

- Puede ser una **única llamada** que devuelva el árbol completo, o **varias llamadas** en las que cada una devuelve un nivel a medida que el usuario navega hacia niveles más profundos.
- Cada elemento del árbol debe incluir:

| Campo | Obligatorio | Descripción |
|-------|----------|-------------|
| `id` | Sí | Un identificador único de la carpeta |
| `name` | Sí | Nombre para mostrar de la carpeta |
| `thumbnail` | Recomendado | URL de una miniatura con relación **16:9** |

### Lista de reproducción de la lección

Un endpoint que devuelve la **lista de reproducción de archivos multimedia** de una sola lección.

Cada elemento de la lista de reproducción debe incluir:

| Campo | Obligatorio | Descripción |
|-------|----------|-------------|
| `title` | Sí | Título para mostrar del elemento multimedia |
| `mediaType` | Sí | `video` o `image` |
| `url` | Sí | Enlace de descarga directa al archivo (consulta [Formatos multimedia](#formatos-multimedia) más abajo) |
| `thumbnail` | Recomendado | Imagen en miniatura del elemento |
| `duration` | Recomendado | Duración en segundos (para videos) |

## Formatos multimedia

FreePlay descarga los archivos directamente, así que cada elemento multimedia debe tener un **enlace directo** (sin reproductores incrustados ni redirecciones de página).

| Tipo | Formatos aceptados |
|------|-----------------|
| Video | **MP4** (obligatorio para la reproducción multiplataforma en dispositivos Apple y Android) |
| Imagen | JPG, PNG o GIF |

## Notas

- Una **API REST que devuelve JSON** es el patrón de integración habitual, pero como escribimos un adaptador personalizado para cada proveedor, podemos trabajar con prácticamente cualquier formato de API.
- Si te interesa convertirte en proveedor de contenido para FreePlay, escríbenos en [Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) o abre un issue en [GitHub](https://github.com/ChurchApps/ChurchAppsSupport/issues).
