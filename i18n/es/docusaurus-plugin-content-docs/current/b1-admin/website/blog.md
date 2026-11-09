---
title: "Cómo escribir entradas de blog para su sitio web en B1 Admin"
sidebar_label: "Blog"
description: "Cree, programe y publique entradas de blog en el sitio web de su iglesia en B1 Admin, incluidos extractos, categorías, etiquetas, fotos de encabezado e incrustaciones de comentarios."
---

# Blog

<div class="article-intro">

La página de Blog le permite publicar noticias, novedades y devocionales en el sitio web de su iglesia. Las entradas aparecen en un listado de tarjetas en `/blog`, en su propia URL y en una fuente RSS que otras herramientas (como Zapier) pueden vigilar para detectar nuevas entradas.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Complete la [configuración inicial](./initial-setup.md) de su sitio web
- Agregue un enlace de navegación a `/blog` desde [Administrar páginas](./managing-pages.md) si quiere que los visitantes encuentren su blog desde el menú

</div>

## Acceder al blog

1. En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda) y expanda **Website**.
2. Haga clic en **Blog**.
3. La página de Blog enumera cada entrada junto con su estado y su fecha de publicación.

## Agregar una entrada

1. Haga clic en **Add Post** en la esquina superior derecha.
2. Escriba un **Title**. Se genera automáticamente una **Web address** (slug) apta para URL mientras escribe; puede editarla directamente si quiere otra dirección.
3. Agregue un **Excerpt**: un resumen breve que se muestra en el listado de entradas, en las meta descripciones y en la fuente RSS. Si lo deja en blanco, se genera uno automáticamente a partir del inicio del contenido de la entrada.
4. Escriba el cuerpo de la entrada en el editor de **Content** usando Markdown. Haga clic en **Preview** para ver cómo quedará la entrada con formato.
5. Elija una **Category** (seleccione una existente o escriba una nueva) y, opcionalmente, **Tags** separadas por comas.
6. Haga clic en **Select Image** para elegir una foto de su galería de [Files](./files.md), o suba una nueva. Las fotos subidas se abren en una herramienta de recorte integrada fijada a una proporción 16:9, para que pueda encuadrar cualquier foto y ajustarla al encabezado de la entrada y a las tarjetas del listado.
7. Establezca el **Author**: por defecto es usted, pero puede buscar y seleccionar a cualquier persona de su base de datos.
8. Active **Published** y establezca una **Publish Date** cuando esté listo para hacer pública la entrada. Déjelo desactivado para guardar la entrada como borrador.

:::tip
Establezca una **Publish Date** futura para programar una entrada. Permanece oculta para los visitantes y muestra una etiqueta **Scheduled** en la lista de Blog hasta que llegue esa fecha.
:::

## Estados de las entradas

Cada entrada de la lista muestra uno de tres estados:

- **Draft** -- No publicada. Solo visible en el panel de administración.
- **Scheduled** -- "Published" está activada, pero la fecha de publicación está en el futuro.
- **Published** -- En vivo en su sitio web y incluida en la fuente RSS.

## Editar, previsualizar y eliminar entradas

- Haga clic en **Edit** junto a una entrada para hacer cambios.
- Haga clic en **View on Site** (que aparece en las entradas publicadas) para abrir la entrada en vivo en su sitio web en una pestaña nueva.
- Haga clic en **Delete** para eliminar una entrada de forma permanente.

## Cómo ven los visitantes su blog

Las entradas publicadas aparecen en `{yoursite}/blog`, 10 por página, con enlaces **Older**/**Newer** para recorrer el archivo, junto con un filtro por categoría y el autor y la foto de cada entrada. Las etiquetas también se muestran como fichas en las que se puede hacer clic, de modo que los visitantes pueden filtrar la lista por etiqueta de la misma forma. Cada entrada individual vive en `{yoursite}/blog/{slug}` e incluye entradas relacionadas de la misma categoría. La página del blog también publica una fuente RSS, que los lectores de feeds y las herramientas de automatización como Zapier pueden detectar automáticamente.

Las entradas publicadas también pueden aparecer en una sección **News** de la pantalla de inicio de la app de su iglesia, si lo activa; consulte [Secciones de la pantalla de inicio](../settings/mobile-app.md#home-screen-sections).

:::info
Las entradas del blog son un tipo de contenido distinto de las páginas normales del sitio web: no se crean en el [editor de páginas](./page-editor.md) y no aparecen en la lista de Pages. Así, la redacción del blog es rápida y se centra en escribir.
:::

## Agregar comentarios debajo de las entradas

B1 no aloja comentarios del blog, pero puede añadir un servicio de comentarios. También puede colocar cualquier otro elemento debajo de cada entrada, como un formulario de suscripción a un boletín o un botón de donación.

1. Regístrese en un servicio de comentarios como [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com) o [Disqus](https://disqus.com), y copie su código de inserción.
2. En la página de Blog, desplácese hasta **Below Every Post**.
3. Pegue el código de inserción y haga clic en **Save**.

El código aparece debajo del contenido de cada entrada publicada. Su servicio de comentarios se encarga de la moderación y del filtrado de spam, así que revise su panel con regularidad.

:::tip
Borre el cuadro y haga clic en **Save** para quitar el código de todas las entradas. Solo las personas que pueden editar la configuración de la iglesia ven este cuadro.
:::

## Próximos pasos

- [Administrar páginas](./managing-pages.md) -- Agregue un enlace de navegación a su blog
- [Archivos](./files.md) -- Suba fotos para usarlas en sus entradas
- [Integración con Zapier](../integrations/zapier.md) -- Active automatizaciones cuando se publiquen nuevas entradas
