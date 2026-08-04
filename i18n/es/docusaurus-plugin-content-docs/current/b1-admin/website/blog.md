---
title: "Blog"
---

# Blog

<div class="article-intro">

La página Blog te permite publicar noticias, novedades y devocionales en el sitio web de tu iglesia. Las publicaciones aparecen en un listado de tarjetas en `/blog`, en su propia URL, y en un feed RSS que otras herramientas (como Zapier) pueden monitorear para detectar nuevas publicaciones.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Completa la [Configuración inicial](initial-setup) de tu sitio web
- Agrega un enlace de navegación a `/blog` desde [Administrar páginas](managing-pages) si quieres que los visitantes encuentren tu blog desde el menú

</div>

## Acceder al Blog

1. En B1 Admin, haz clic en **Website** en el menú izquierdo.
2. Haz clic en la pestaña **Blog** en la parte superior de la vista de páginas del sitio web.
3. La página Blog enumera cada publicación junto con su estado y fecha de publicación.

## Agregar una publicación

1. Haz clic en **Add Post** en la esquina superior derecha.
2. Ingresa un **Title**. Se genera automáticamente un slug apto para URL a medida que escribes -- puedes editarlo directamente si quieres una dirección diferente.
3. Agrega un **Excerpt** -- un breve resumen que se muestra en el listado de publicaciones, las metadescripciones y el feed RSS. Si lo dejas en blanco, se genera uno automáticamente a partir del inicio del contenido de tu publicación.
4. Escribe el cuerpo de la publicación en el editor **Content** usando Markdown. Haz clic en **Preview** para ver cómo se verá la publicación con formato.
5. Elige una **Category** (selecciona una existente o escribe una nueva) y **Tags** opcionales separadas por comas.
6. Haz clic en **Select Image** para elegir una foto de tu galería de [Archivos](files), o sube una nueva. Las fotos subidas se abren en una herramienta de recorte integrada fijada en una proporción de 16:9, para que puedas encuadrar cualquier foto y que se ajuste al encabezado de la publicación y a las tarjetas del listado.
7. Configura el **Author** -- por defecto eres tú, pero puedes buscar y seleccionar a cualquier persona de tu base de datos.
8. Activa **Published** y establece una **Publish Date** cuando estés listo para hacer pública la publicación. Déjalo desactivado para guardar la publicación como borrador.

:::tip
Establece una **Publish Date** en el futuro para programar una publicación. Permanece oculta para los visitantes y muestra un chip de **Scheduled** en la lista del Blog hasta que llegue esa fecha.
:::

## Estados de las publicaciones

Cada publicación en la lista muestra uno de tres estados:

- **Draft** -- No publicada. Solo visible en el panel de administración.
- **Scheduled** -- Published está activado, pero la fecha de publicación está en el futuro.
- **Published** -- En vivo en tu sitio web e incluida en el feed RSS.

## Editar, previsualizar y eliminar publicaciones

- Haz clic en el ícono **Edit** junto a una publicación para hacer cambios.
- Haz clic en el ícono **View** (visible en las publicaciones publicadas) para abrir la publicación en vivo en tu sitio web en una nueva pestaña.
- Haz clic en el ícono **Delete** para eliminar permanentemente una publicación.

## Cómo ven los visitantes tu blog

Las publicaciones publicadas aparecen en `{yoursite}/blog`, 10 por página con enlaces **Older**/**Newer** para recorrer tu archivo, junto con un filtro de categoría y la línea de autor y foto de cada publicación. Las etiquetas también se muestran como chips seleccionables, lo que permite a los visitantes filtrar la lista por etiqueta de la misma manera. Las publicaciones individuales se encuentran en `{yoursite}/blog/{slug}` e incluyen publicaciones relacionadas de la misma categoría. La página del blog también publica un feed RSS, detectable automáticamente por lectores de feeds y herramientas de automatización como Zapier.

:::info
Las publicaciones del blog son un tipo de contenido separado de las páginas normales del sitio web -- no se crean en el [editor de páginas](page-editor) y no aparecen en la lista de Pages. Esto mantiene la redacción del blog rápida y enfocada en escribir.
:::

## Próximos pasos

- [Administrar páginas](managing-pages) -- Agrega un enlace de navegación a tu blog
- [Archivos](files) -- Sube fotos para usar en tus publicaciones
- [Integración con Zapier](../integrations/zapier.md) -- Activa automatizaciones cuando se publiquen nuevas publicaciones
