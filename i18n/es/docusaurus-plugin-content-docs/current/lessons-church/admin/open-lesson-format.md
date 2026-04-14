---
title: "Formato Abierto de Lecciones"
---

# Formato Abierto de Lecciones

<div class="article-intro">

El Formato Abierto de Lecciones es un esquema JSON estandarizado que permite a proveedores de contenido de terceros publicar currículum para Lessons.church. Cualquier organización que hospede un feed en este formato puede agregarse como proveedor externo, haciendo su contenido explorable y reproducible junto con la biblioteca integrada.

</div>

## Cómo Funciona

Un proveedor hospeda dos tipos de puntos finales:

1. **Árbol de Proveedor** -- Una URL única que devuelve el catálogo completo de programas, estudios, lecciones y lugares. Cada lugar incluye una URL de feed que apunta al contenido detallado de la lección.
2. **Feed de Lugar** -- Una URL por lugar, devolviendo el contenido completo de la lección (secciones, acciones y archivos multimedia).

Cuando una iglesia agrega la URL de su proveedor en Lessons.church, la plataforma obtiene su árbol para descubrir contenido disponible, luego obtiene feeds de lugares individuales bajo demanda.

## Árbol de Proveedor

Su URL de proveedor debe devolver un objeto JSON con esta estructura:

```json
{
  "programs": [
    {
      "id": "program-1",
      "name": "Gospel of Mark",
      "slug": "gospel-of-mark",
      "image": "https://example.com/images/mark.jpg",
      "about": "A 12-week study through the Gospel of Mark.",
      "studies": [
        {
          "id": "study-1",
          "name": "The Beginning",
          "slug": "the-beginning",
          "image": "https://example.com/images/study1.jpg",
          "lessons": [
            {
              "id": "lesson-1",
              "name": "The Baptism of Jesus",
              "slug": "baptism-of-jesus",
              "title": "The Baptism of Jesus",
              "image": "https://example.com/images/lesson1.jpg",
              "description": "An introduction to Jesus' ministry.",
              "venues": [
                {
                  "id": "venue-1",
                  "name": "Kids",
                  "apiUrl": "https://example.com/feed/venues/venue-1"
                },
                {
                  "id": "venue-2",
                  "name": "Adults",
                  "apiUrl": "https://example.com/feed/venues/venue-2"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

### Campos del Árbol

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `programs[].id` | string | Identificador único de programa |
| `programs[].name` | string | Nombre mostrado |
| `programs[].slug` | string | Nombre amigable para URL |
| `programs[].image` | string | URL de imagen del programa (opcional) |
| `programs[].about` | string | Descripción (opcional) |
| `studies[].id` | string | Identificador único de estudio |
| `studies[].name` | string | Nombre mostrado |
| `studies[].slug` | string | Nombre amigable para URL |
| `studies[].image` | string | URL de imagen del estudio (opcional) |
| `lessons[].id` | string | Identificador único de lección |
| `lessons[].name` | string | Nombre mostrado |
| `lessons[].slug` | string | Nombre amigable para URL |
| `lessons[].title` | string | Título completo |
| `lessons[].image` | string | URL de imagen de lección (opcional) |
| `lessons[].description` | string | Resumen de lección (opcional) |
| `venues[].id` | string | Identificador único de lugar |
| `venues[].name` | string | Nombre del lugar (ej. "Niños", "Adultos", "Jóvenes") |
| `venues[].apiUrl` | string | URL que devuelve el feed de lugar (ver abajo) |

**Lugares** representan diferentes versiones de la misma lección adaptadas para diferentes audiencias (grupos de edad, configuraciones, etc.).

## Feed de Lugar

El `apiUrl` de cada lugar debe devolver un objeto JSON que coincida con este esquema:

```json
{
  "id": "venue-1",
  "name": "Kids",
  "lessonId": "lesson-1",
  "lessonName": "The Baptism of Jesus",
  "lessonImage": "https://example.com/images/lesson1.jpg",
  "lessonDescription": "An introduction to Jesus' ministry.",
  "studyName": "The Beginning",
  "studySlug": "the-beginning",
  "programName": "Gospel of Mark",
  "programSlug": "gospel-of-mark",
  "programAbout": "A 12-week study through the Gospel of Mark.",
  "downloads": [],
  "sections": [
    {
      "id": "section-1",
      "name": "Opening Discussion",
      "sort": 1,
      "materials": "Whiteboard and markers",
      "actions": [
        {
          "id": "action-1",
          "actionType": "text",
          "content": "**Key Verse:** Mark 1:9-11",
          "sort": 1
        },
        {
          "id": "action-2",
          "actionType": "question",
          "content": "What do you know about baptism?",
          "sort": 2,
          "role": "Leader"
        },
        {
          "id": "action-3",
          "actionType": "play",
          "content": "Intro Video",
          "sort": 3,
          "files": [
            {
              "id": "file-1",
              "name": "intro-video.mp4",
              "url": "https://example.com/media/intro.mp4",
              "streamUrl": "https://vimeo.com/123456789",
              "fileType": "video/mp4",
              "seconds": 180,
              "bytes": 52428800,
              "thumbnail": "https://example.com/media/intro-thumb.jpg",
              "loop": false
            }
          ]
        }
      ]
    }
  ]
}
```

### Campos de Feed de Lugar

#### Objeto Raíz

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | string | Identificador de lugar |
| `name` | string | Nombre del lugar |
| `lessonId` | string | Identificador de lección |
| `lessonName` | string | Nombre mostrado de lección |
| `lessonImage` | string | URL de imagen de lección |
| `lessonDescription` | string | Resumen de lección |
| `studyName` | string | Nombre del estudio padre |
| `studySlug` | string | Slug del estudio padre |
| `programName` | string | Nombre del programa padre |
| `programSlug` | string | Slug del programa padre |
| `programAbout` | string | Descripción del programa |
| `downloads` | array | Paquetes de archivos descargables |
| `sections` | array | Secciones de lección ordenadas |

#### Sección

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | string | Identificador de sección |
| `name` | string | Título de sección |
| `sort` | number | Orden de visualización |
| `materials` | string | Materiales o notas de preparación (opcional) |
| `actions` | array | Acciones ordenadas dentro de esta sección |

#### Acción

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | string | Identificador de acción |
| `actionType` | string | Uno de: `play`, `text`, `question`, `quote`, `subhead` |
| `content` | string | Contenido de texto o etiqueta de medios |
| `sort` | number | Orden de visualización |
| `role` | string | Nombre de rol, ej. "Líder", "Niños" (opcional) |
| `roleId` | string | Identificador de rol (opcional) |
| `files` | array | Archivos multimedia para acciones `play` (opcional) |

#### Archivo

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | string | Identificador de archivo |
| `name` | string | Nombre de archivo |
| `url` | string | URL de descarga directa |
| `streamUrl` | string | URL de transmisión, ej. enlace de Vimeo (opcional) |
| `fileType` | string | Tipo MIME (ej. `video/mp4`, `image/jpeg`) |
| `seconds` | number | Duración en segundos para audio/vídeo (opcional) |
| `bytes` | number | Tamaño de archivo en bytes (opcional) |
| `thumbnail` | string | URL de imagen en miniatura (opcional) |
| `loop` | boolean | Si los medios deben repetirse en bucle (opcional, predeterminado false) |

#### Descarga

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `name` | string | Nombre del paquete de descarga (ej. "Materiales Imprimibles") |
| `files` | array | Archivos en este paquete de descarga (mismos campos que Archivo arriba) |

## Tipos de Acción

| Tipo | Propósito |
|------|---------|
| `play` | Reproducción de medios -- vídeo, audio o presentación de diapositivas. Debe incluir `files`. |
| `text` | Contenido de texto estático. Soporta bold de estilo markdown (`**text**`). |
| `question` | Pregunta de discusión o reflexión para la audiencia. |
| `quote` | Una cita destacada o pasaje de Escritura. |
| `subhead` | Un encabezado o divisor dentro de una sección. |

:::tip
Para ver un ejemplo funcional del feed en acción, puede ver el árbol de contenido integrado de Lessons.church en `https://api.lessons.church/lessons/public/tree` y obtener cualquier URL de feed de lugar desde él.
:::
