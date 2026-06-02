---
title: "Formato de Lección Abierta"
---

# Formato de Lección Abierta

<div class="article-intro">

El Formato de Lección Abierta es un esquema JSON estandarizado que permite a proveedores de contenido de terceros publicar currículum para Lessons.church. Cualquier organización que aloje un feed en este formato puede ser agregada como proveedor externo.

</div>

## Cómo Funciona

Un proveedor aloja dos tipos de puntos finales:

1. **Árbol de Proveedor** -- Una única URL que devuelve el catálogo completo
2. **Feed de Lugar** -- Una URL por lugar, devolviendo el contenido de la lección

## Árbol de Proveedor

Tu URL de proveedor debe devolver un objeto JSON con programas, estudios, lecciones y lugares.

## Campos del Árbol

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `programs[].id` | string | Identificador único |
| `programs[].name` | string | Nombre mostrado |
| `programs[].slug` | string | Nombre amigable para URL |

:::tip
Para ver un ejemplo, puedes ver el árbol de contenido de Lessons.church en `https://api.lessons.church/lessons/public/tree`.
:::
