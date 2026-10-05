---
title: "Blog"
---

# Blog

<div class="article-intro">

La página Blog te permite publicar noticias, actualizaciones y devocionales en tu sitio web de iglesia. Los posts aparecen en una lista de tarjetas en `/blog`, en su propia URL y en un feed RSS que otras herramientas (como Zapier) pueden monitorear para nuevos posts.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Completa la [Configuración Inicial](initial-setup) de tu sitio web
- Agrega un enlace de navegación a `/blog` desde [Administración de Páginas](managing-pages) si deseas que los visitantes encuentren tu blog desde el menú

</div>

## Acceso al Blog

1. En B1 Admin, abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda) y expande **Website**.
2. Haz clic en **Blog**.
3. La página Blog enumera todos los posts junto con su estado y fecha de publicación.

## Agregar un Post

1. Haz clic en **Add Post** en la esquina superior derecha.
2. Ingresa un **Title**. Se genera automáticamente un slug amigable con URL mientras escribes -- puedes editarlo directamente si deseas una dirección diferente.
3. Agrega un **Excerpt** -- un resumen corto mostrado en la lista de posts, descripciones meta y feed RSS. Si lo dejas en blanco, se genera uno automáticamente desde el inicio del contenido de tu post.
4. Escribe el cuerpo del post en el editor **Content** usando Markdown. Haz clic en **Preview** para ver cómo se verá el post formateado.
5. Elige una **Category** (elige una existente o escribe una nueva) y **Tags** opcionales separadas por comas.
6. Haz clic en **Select Image** para elegir una foto de tu galería [Files](files), o carga una nueva. Las fotos cargadas se abren en una herramienta de corte integrada bloqueada a una relación de 16:9, para que puedas enmarcar cualquier foto para que se ajuste al encabezado del post y las tarjetas de lista.
7. Establece el **Author** -- por defecto eres tú, pero puedes buscar y seleccionar a cualquier persona en tu base de datos.
8. Activa **Published** y establece una **Publish Date** cuando estés listo para hacer el post público. Déjalo desactivado para guardar el post como borrador.

:::tip
Establece una **Publish Date** en el futuro para programar un post. Se mantiene oculto para los visitantes y muestra un chip **Scheduled** en la lista Blog hasta que llegue esa fecha.
:::

## Estados del Post

Cada post en la lista muestra uno de tres estados:

- **Draft** -- No publicado. Solo visible en admin.
- **Scheduled** -- Publicado está activado, pero la fecha de publicación está en el futuro.
- **Published** -- En vivo en tu sitio web e incluido en el feed RSS.

## Edición, Vista Previa y Eliminación de Posts

- Haz clic en el icono **Edit** junto a un post para hacer cambios.
- Haz clic en el icono **View** (visible en posts publicados) para abrir el post en vivo en tu sitio web en una nueva pestaña.
- Haz clic en el icono **Delete** para eliminar permanentemente un post.

## Cómo los Visitantes Ven tu Blog

Los posts publicados aparecen en `{yoursite}/blog`, 10 por página con enlaces **Older**/**Newer** para navegar por tu archivo, junto con un filtro de categoría y la línea de firma y foto de cada post. Las etiquetas también se representan como chips clicables, permitiendo a los visitantes filtrar la lista por etiqueta de la misma manera. Los posts individuales se encuentran en `{yoursite}/blog/{slug}` e incluyen posts relacionados de la misma categoría. La página del blog también publica un feed RSS, autodescubierto por lectores de feed y herramientas de automatización como Zapier.

:::info
Los posts de blog son un tipo de contenido separado de las páginas regulares del sitio web -- no se construyen en el [editor de páginas](page-editor) y no aparecen en la lista Pages. Esto mantiene la escritura de blogs rápida y enfocada en la escritura.
:::

## Próximos Pasos

- [Administración de Páginas](managing-pages) -- Agrega un enlace de navegación a tu blog
- [Archivos](files) -- Carga fotos para usar en tus posts
- [Integración con Zapier](../integrations/zapier.md) -- Dispara automatizaciones cuando nuevos posts sean publicados
