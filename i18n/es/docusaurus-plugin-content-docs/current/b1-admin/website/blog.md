---
title: "Cómo escribir entradas de blog para tu sitio web en B1 Admin"
sidebar_label: "Blog"
description: "Crea, programa y publica entradas de blog en el sitio web de tu iglesia en B1 Admin, incluyendo extractos, categorías, etiquetas, fotos de encabezado e incrustaciones de comentarios."
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

1. En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda) y expanda **Sitio web**.
2. Haga clic en **Blog**.
3. La página de Blog enumera cada entrada junto con su estado y su fecha de publicación.

## Agregar una entrada

1. Haga clic en **Agregar entrada** en la esquina superior derecha.
2. Escriba un **Título**. Se genera automáticamente una **Dirección web** (slug) amigable para URL mientras escribe; puede editarla directamente si quiere otra dirección.
3. Agregue un **Extracto**: un resumen breve que se muestra en el listado de entradas, en las meta descripciones y en la fuente RSS. Si lo deja en blanco, se genera uno automáticamente a partir del inicio del contenido de la entrada.
4. Escriba el cuerpo de la entrada en el editor de **Contenido** usando Markdown. Haga clic en **Vista previa** para ver cómo se verá la entrada con formato.
5. Elija una **Categoría** (seleccione una existente o escriba una nueva) y, opcionalmente, **Etiquetas** separadas por comas.
6. Haga clic en **Seleccionar imagen** para elegir una foto de su galería de [Archivos](./files.md), o suba una nueva. Las fotos subidas se abren en una herramienta de recorte integrada fijada a una proporción de 16:9, para que pueda encuadrar cualquier foto y que se ajuste al encabezado de la entrada y a las tarjetas del listado.
7. Establezca el **Autor**: por defecto es usted, pero puede buscar y seleccionar a cualquier persona de su base de datos.
8. Active **Publicada** y establezca una **Fecha de publicación** cuando esté listo para hacer pública la entrada. Déjelo desactivado para guardar la entrada como borrador.

:::tip
Establezca una **Fecha de publicación** futura para programar una entrada. Permanece oculta para los visitantes y muestra una etiqueta de **Programada** en la lista de Blog hasta que llegue esa fecha.
:::

## Estados de las entradas

Cada entrada de la lista muestra uno de tres estados:

- **Borrador**: no publicada. Solo visible en el panel de administración.
- **Programada**: "Publicada" está activada, pero la fecha de publicación está en el futuro.
- **Publicada**: en vivo en su sitio web y incluida en la fuente RSS.

## Editar, previsualizar y eliminar entradas

- Haga clic en **Editar** junto a una entrada para hacer cambios.
- Haga clic en **Ver en el sitio** (que aparece en las entradas publicadas) para abrir la entrada en vivo en su sitio web en una pestaña nueva.
- Haga clic en **Eliminar** para quitar una entrada de forma permanente.

## Cómo ven los visitantes su blog

Las entradas publicadas aparecen en `{sudominio}/blog`, 10 por página, con enlaces de **Anteriores**/**Siguientes** para recorrer su archivo, junto con un filtro por categoría y el autor y la foto de cada entrada. Las etiquetas también se muestran como fichas en las que se puede hacer clic, para que los visitantes filtren la lista por etiqueta de la misma forma. Cada entrada individual vive en `{sudominio}/blog/{slug}` e incluye entradas relacionadas de la misma categoría. La página del blog también publica una fuente RSS, que los lectores de feeds y las herramientas de automatización como Zapier pueden descubrir automáticamente.

:::info
Las entradas del blog son un tipo de contenido distinto de las páginas regulares del sitio web: no se crean en el [editor de páginas](./page-editor.md) y no aparecen en la lista de Páginas. Esto mantiene la redacción del blog rápida y enfocada en escribir.
:::

## Agregar comentarios debajo de las entradas

B1 no aloja los comentarios del blog, pero puede agregar un servicio de comentarios. También puede colocar cualquier otro elemento debajo de cada entrada, como un formulario de suscripción a un boletín o un botón de donación.

1. Regístrese en un servicio de comentarios como [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com) o [Disqus](https://disqus.com), y copie su código de inserción.
2. En la página de Blog, desplácese hasta **Debajo de cada entrada**.
3. Pegue el código de inserción y haga clic en **Guardar**.

El código aparece debajo del contenido de cada entrada publicada. Su servicio de comentarios se encarga de la moderación y del filtro de spam, así que revise su panel con regularidad.

:::tip
Borre el cuadro y haga clic en **Guardar** para quitar el código de todas las entradas. Solo las personas que pueden editar la configuración de la iglesia ven este cuadro.
:::

## Próximos pasos

- [Administrar páginas](./managing-pages.md): agregue un enlace de navegación a su blog
- [Archivos](./files.md): suba fotos para usarlas en sus entradas
- [Integración con Zapier](../integrations/zapier.md): active automatizaciones cuando se publiquen nuevas entradas
