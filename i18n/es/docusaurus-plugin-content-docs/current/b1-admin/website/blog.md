---
title: "Cómo escribir entradas de blog para su sitio web en B1 Admin"
sidebar_label: "Blog"
description: "Cree, programe y publique entradas de blog en el sitio web de su iglesia en B1 Admin, con extractos, categorías, etiquetas, fotos de encabezado e incrustaciones de comentarios."
---

# Blog

<div class="article-intro">

La página de Blog le permite publicar noticias, novedades y devocionales en el sitio web de su iglesia. Las entradas aparecen en un listado de tarjetas en `/blog`, en su propia URL y en una fuente RSS que otras herramientas (como Zapier) pueden vigilar para detectar nuevas entradas.

</div>

<div class="prereqs">
<h4>Antes de empezar</h4>

- Complete la [configuración inicial](./initial-setup.md) de su sitio web
- Agregue un enlace de navegación a `/blog` desde [Gestionar páginas](./managing-pages.md) si quiere que los visitantes encuentren su blog desde el menú

</div>

## Acceder al blog {#accessing-the-blog}

1. En B1 Admin, abra el [menú Salto](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda) y expanda **Sitio web**.
2. Haga clic en **Blog**.
3. La página de Blog enumera todas las entradas junto con su estado y su fecha de publicación.

## Agregar una entrada {#adding-a-post}

1. Haga clic en **Agregar entrada** en la esquina superior derecha.
2. Escriba un **Título**. Una **Dirección web** amigable para URL (slug) se genera automáticamente mientras escribe; puede editarla directamente si quiere una dirección distinta.
3. Agregue un **Extracto**: un resumen breve que se muestra en el listado de entradas, en las descripciones meta y en la fuente RSS. Si lo deja en blanco, se genera uno automáticamente a partir del inicio del contenido de la entrada.
4. Escriba el cuerpo de la entrada en el editor de **Contenido** usando Markdown. Haga clic en **Vista previa** para ver cómo se verá la entrada con formato.
5. Elija una **Categoría** (seleccione una existente o escriba una nueva) y, opcionalmente, **Etiquetas** separadas por comas.
6. Haga clic en **Seleccionar imagen** para elegir una foto de su galería de [Archivos](./files.md), o suba una nueva. Las fotos subidas se abren en una herramienta de recorte integrada con una proporción fija de 16:9, para que pueda encuadrar cualquier foto y ajustarla al encabezado de la entrada y a las tarjetas del listado.
7. Establezca el **Autor**: por defecto es usted, pero puede buscar y seleccionar a cualquier persona de su base de datos.
8. Active **Publicada** cuando esté listo para hacer pública la entrada. Aparece un campo **Fecha de publicación**, configurado con la fecha de hoy; cámbielo si quiere otra fecha. Deje el interruptor en **Borrador** para guardar la entrada como borrador.
9. Haga clic en **Guardar**. Una entrada necesita un título y una dirección web que no use ninguna otra entrada.

:::tip
Establezca una **Fecha de publicación** futura para programar una entrada. Permanece oculta para los visitantes y muestra una etiqueta **Programada** en la lista de Blog hasta que llegue esa fecha.
:::

## Estados de las entradas {#post-states}

Cada entrada de la lista muestra uno de tres estados:

- **Borrador** -- No publicada. Solo visible en la administración.
- **Programada** -- Publicada está activada, pero la fecha de publicación es futura.
- **Publicada** -- En vivo en su sitio web e incluida en la fuente RSS.

## Editar, previsualizar y eliminar entradas {#editing-previewing-and-deleting-posts}

- Haga clic en **Editar** junto a una entrada para hacer cambios.
- Haga clic en **Ver en el sitio** (que aparece en las entradas publicadas) para abrir la entrada en vivo en su sitio web, en una nueva pestaña.
- Haga clic en **Eliminar** para quitar una entrada de forma permanente.

## Cómo ven los visitantes su blog {#how-visitors-see-your-blog}

Las entradas publicadas aparecen en `{yoursite}/blog`, 10 por página, con enlaces **Entradas anteriores**/**Entradas más recientes** para recorrer el archivo, junto con chips de categoría que filtran el listado, y la firma y la foto de cada entrada. Las etiquetas aparecen como chips en los que se puede hacer clic al final de cada entrada, lo que permite a los visitantes filtrar el listado por etiqueta de la misma forma. Cada entrada individual vive en `{yoursite}/blog/{slug}` y termina con una sección **Más en** *categoría* que enumera hasta tres entradas más de la misma categoría. Consulte [Blog](../../b1-church/content/blog.md) en la guía de B1.church para ver lo que ven los visitantes. La página del blog también publica una fuente RSS, que los lectores de feeds y las herramientas de automatización como Zapier pueden detectar automáticamente.

Las entradas publicadas también pueden aparecer en una sección de **Noticias** en la pantalla de inicio de la aplicación de su iglesia, si lo activa; consulte [Secciones de la pantalla de inicio](../settings/mobile-app.md#home-screen-sections).

:::info
Las entradas de blog son un tipo de contenido distinto de las páginas normales del sitio web: no se crean en el [editor de páginas](./page-editor.md) y no aparecen en la lista de Páginas. Así la redacción del blog es rápida y se centra en escribir.
:::

## Agregar comentarios debajo de las entradas {#adding-comments-below-posts}

B1 no aloja comentarios de blog por sí mismo, pero puede agregar un servicio de comentarios. También puede colocar cualquier otro elemento debajo de cada entrada, como un formulario de suscripción a un boletín o un botón de ofrenda.

1. Regístrese en un servicio de comentarios como [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com) o [Disqus](https://disqus.com), y copie su código de incrustación.
2. En la página de Blog, desplácese hasta **Debajo de cada entrada**.
3. Pegue el código de incrustación y haga clic en **Guardar**.

El código aparece debajo del contenido de cada entrada publicada. Su servicio de comentarios se encarga de la moderación y del filtrado de spam, así que revise su panel con regularidad.

:::tip
Borre el cuadro y haga clic en **Guardar** para quitar el código de todas las entradas. Solo las personas que pueden editar la configuración de la iglesia ven este cuadro.
:::

## Próximos pasos {#next-steps}

- [Gestionar páginas](./managing-pages.md) -- Agregue un enlace de navegación a su blog
- [Archivos](./files.md) -- Suba fotos para usarlas en sus entradas
- [Integración con Zapier](../integrations/zapier.md) -- Active automatizaciones cuando se publiquen nuevas entradas
