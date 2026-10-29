---
title: "Blog"
---

# Blog

<div class="article-intro">

La página de Blog le permite publicar noticias, novedades y devocionales en el sitio web de su iglesia. Las entradas aparecen en un listado de tarjetas en `/blog`, en su propia URL, y en una fuente RSS que otras herramientas (como Zapier) pueden vigilar para detectar nuevas entradas.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Complete la [Configuración inicial](initial-setup) de su sitio web
- Agregue un enlace de navegación a `/blog` desde [Administrar páginas](managing-pages) si quiere que los visitantes encuentren su blog en el menú

</div>

## Acceder al blog

1. En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda) y expanda **Sitio web**.
2. Haga clic en **Blog**.
3. La página de Blog muestra todas las entradas junto con su estado y fecha de publicación.

## Agregar una entrada

1. Haga clic en **Agregar entrada** en la esquina superior derecha.
2. Ingrese un **Título**. Se genera automáticamente una **Dirección web** (slug) amigable para URL mientras escribe; puede editarla directamente si quiere una dirección diferente.
3. Agregue un **Extracto**: un resumen breve que se muestra en el listado de entradas, en las meta descripciones y en la fuente RSS. Si lo deja en blanco, se genera automáticamente a partir del inicio del contenido de la entrada.
4. Escriba el cuerpo de la entrada en el editor de **Contenido** usando Markdown. Haga clic en **Vista previa** para ver cómo quedará la entrada con formato.
5. Elija una **Categoría** (seleccione una existente o escriba una nueva) y, opcionalmente, **Etiquetas** separadas por comas.
6. Haga clic en **Seleccionar imagen** para elegir una foto de su galería de [Archivos](files), o suba una nueva. Las fotos subidas se abren en una herramienta de recorte integrada bloqueada en una proporción de 16:9, para que pueda encuadrar cualquier foto y ajustarla al encabezado de la entrada y a las tarjetas del listado.
7. Configure el **Autor**: por defecto es usted, pero puede buscar y seleccionar a cualquier persona de su base de datos.
8. Active **Publicado** y configure una **Fecha de publicación** cuando esté listo para hacer pública la entrada. Déjelo desactivado para guardar la entrada como borrador.

:::tip
Configure una **Fecha de publicación** en el futuro para programar una entrada. Permanece oculta para los visitantes y muestra una etiqueta **Programada** en la lista del Blog hasta que llegue esa fecha.
:::

## Estados de las entradas

Cada entrada de la lista muestra uno de tres estados:

- **Borrador** -- No publicada. Solo visible en el panel de administración.
- **Programada** -- Publicada está activado, pero la fecha de publicación es futura.
- **Publicada** -- En vivo en su sitio web e incluida en la fuente RSS.

## Editar, previsualizar y eliminar entradas

- Haga clic en **Editar** junto a una entrada para hacer cambios.
- Haga clic en **Ver en el sitio** (que aparece en las entradas publicadas) para abrir la entrada activa en su sitio web en una nueva pestaña.
- Haga clic en **Eliminar** para borrar una entrada de forma permanente.

## Cómo ven los visitantes su blog

Las entradas publicadas aparecen en `{yoursite}/blog`, 10 por página, con enlaces **Anteriores**/**Siguientes** para navegar por el archivo, junto con un filtro por categoría y el autor y la foto de cada entrada. Las etiquetas también se muestran como chips en los que se puede hacer clic, lo que permite a los visitantes filtrar la lista por etiqueta de la misma manera. Cada entrada individual está en `{yoursite}/blog/{slug}` e incluye entradas relacionadas de la misma categoría. La página del blog también publica una fuente RSS, que los lectores de feeds y las herramientas de automatización como Zapier detectan automáticamente.

:::info
Las entradas del blog son un tipo de contenido separado de las páginas normales del sitio web: no se crean en el [editor de páginas](page-editor) y no aparecen en la lista de Páginas. Esto mantiene la redacción de blog rápida y centrada en la escritura.
:::

## Agregar comentarios debajo de las entradas

B1 no aloja por sí mismo los comentarios del blog, pero puede agregar un servicio de comentarios. También puede colocar cualquier otra cosa debajo de cada entrada, como un formulario de suscripción a un boletín o un botón de ofrenda.

1. Regístrese en un servicio de comentarios como [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com) o [Disqus](https://disqus.com) y copie su código de inserción (embed).
2. En la página del Blog, desplácese hasta **Debajo de cada entrada**.
3. Pegue el código de inserción y haga clic en **Guardar**.

El código aparece debajo del contenido de cada entrada publicada. Su servicio de comentarios se encarga de la moderación y del filtrado de spam, así que revise su panel con regularidad.

:::tip
Borre el cuadro y haga clic en **Guardar** para quitar el código de todas las entradas. Solo las personas que pueden editar la configuración de la iglesia ven este cuadro.
:::

## Próximos pasos

- [Administrar páginas](managing-pages) -- Agregue un enlace de navegación a su blog
- [Archivos](files) -- Suba fotos para usar en sus entradas
- [Integración con Zapier](../integrations/zapier.md) -- Active automatizaciones cuando se publiquen nuevas entradas
