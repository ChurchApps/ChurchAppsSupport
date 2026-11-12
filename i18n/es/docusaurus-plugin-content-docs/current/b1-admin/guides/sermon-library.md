---
title: "Guía: Cree su biblioteca de sermones y transmisión en vivo"
description: "Importe sus sermones de YouTube o Vimeo, organícelos en listas de reproducción y configure transmisiones en vivo recurrentes con chat en B1 Admin para su sitio web de iglesia."
---

# Cree su biblioteca de sermones y transmisión en vivo

<div class="article-intro">

Ponga su archivo de sermones en línea y configure la transmisión en vivo: desde importar su biblioteca existente de YouTube o Vimeo hasta programar servicios en vivo recurrentes con chat interactivo. Al terminar, su congregación podrá ver sermones anteriores y unirse a los servicios en vivo desde su sitio web y su aplicación móvil.

</div>

## Video de capacitación {#training-video}

<YouTube id="b3B3A25g2Sk" title="Cómo crear su biblioteca de sermones en B1" next="Cómo configurar la transmisión en vivo en B1" nextUrl="/docs/b1-admin/sermons/live-streaming" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Cuenta de B1 Admin con permiso de administración de contenido
- Canal de YouTube o Vimeo con videos de sermones, y su ID de canal (para importar su archivo)
- ID de canal de YouTube (para la transmisión en vivo; encuéntrelo en la configuración de YouTube Studio)

</div>

## Paso 1: Cree listas de reproducción de sermones {#step-1-create-sermon-playlists}

Las listas de reproducción organizan sus sermones en series y colecciones para facilitar la navegación.

Siga la guía [Listas de reproducción](../sermons/playlists.md) para:

1. En el [menú Jump](../introduction.md#getting-around-with-the-jump-menu), elija **Sermons > Sermons** y busque el panel **Playlists**
2. Haga clic en **Add playlist** (o **Create First Playlist**) para crear series o colecciones como "Mensajes del domingo 2024", "Serie sobre el matrimonio" o "Servicios de Navidad"
3. Introduzca un **Playlist Title**, una **Description** y una **Publish Date**, haga clic en **Add Thumbnail** para agregar una imagen y haga clic en **Save**

:::tip
Cree las listas de reproducción antes de agregar sermones. Así será más fácil organizar los sermones en la serie correcta a medida que los agrega.
:::

## Paso 2: Importe sus sermones existentes {#step-2-import-your-existing-sermons}

Si ya tiene videos de sermones en YouTube o Vimeo, puede importarlos todos a la vez.

Siga la guía [Importación masiva](../sermons/bulk-import.md) para:

1. Haga clic en **Add Sermon** y elija **Bulk Import**, luego elija YouTube o Vimeo
2. Introduzca su **YouTube Channel ID** o **Vimeo Channel ID** y haga clic en **Fetch** para listar los videos del canal
3. Marque los videos que desea, elija una lista de reproducción en **Import Into Playlist** y haga clic en **Import**

## Paso 3: Agregue sermones individuales {#step-3-add-individual-sermons}

Para agregados puntuales o sermones que no forman parte de una importación masiva, agréguelos uno por uno.

Siga la guía [Administración de sermones](../sermons/managing-sermons.md) para:

1. Haga clic en **Add Sermon** y elija **Add Sermon**
2. Seleccione una **Playlist** y el **Video Provider** (YouTube, Vimeo, Facebook o Custom Embed Url), luego pegue el enlace o el ID del video
3. En el caso de YouTube y Vimeo, haga clic en **Fetch** para completar el título, la descripción, la miniatura, la duración y la fecha de publicación a partir del video, y luego haga clic en **Save**

## Paso 4: Configure la transmisión en vivo {#step-4-set-up-live-streaming}

Conecte su canal de YouTube para que su sitio de B1 detecte automáticamente su transmisión en vivo.

Siga la guía [Transmisión en vivo](../sermons/live-streaming.md) para:

1. En la página **Sermons**, haga clic en **Add Sermon**, elija **Add Permanent Live URL**, introduzca su **YouTube Channel ID** y haga clic en **Save**
2. En el menú Jump, elija **Sermons > Live Stream Times**, haga clic en **Add Service**, configure la **Service Time** (por ejemplo, domingos a las 10:00 a. m.) con **Recurs Weekly** activado, y seleccione su URL de transmisión permanente en el menú desplegable **Sermon**
3. Personalice las pestañas de la página de transmisión (Chat, Prayer y enlaces externos) en la página **Sermons > Settings**

:::info
Cuando inicie la transmisión en YouTube, la página de transmisión de B1 la detectará automáticamente. No necesita hacer nada adicional el domingo por la mañana.
:::

## Paso 5: Muéstrelo en su sitio web {#step-5-display-on-your-website}

Haga que su biblioteca de sermones y su transmisión en vivo sean fáciles de encontrar para los visitantes.

Siga la guía [Editor de páginas](../website/page-editor.md) para:

1. Agregue un elemento **Sermons** a una página de su sitio web de B1 para que los visitantes puedan explorar su biblioteca
2. Agregue un elemento **Stream** para la experiencia de visualización en vivo

## Paso 6: Acceso desde dispositivos móviles {#step-6-mobile-access}

Los miembros pueden acceder a los sermones y a los servicios en vivo desde cualquier dispositivo.

1. Los miembros pueden ver los sermones en [B1.church y en la aplicación B1](../../b1-church/content/sermons.md)
2. La transmisión en vivo con chat funciona igual de bien en teléfonos y computadoras

:::info
La función de chat en vivo permite que su congregación en línea participe en tiempo real, como si estuvieran en el mismo lugar.
:::

## ¡Listo! {#youre-done}

Su biblioteca de sermones está en línea y su transmisión en vivo está configurada. Los miembros pueden ponerse al día con los sermones anteriores y unirse a los servicios en vivo desde cualquier lugar. Agregue cada nuevo sermón con **Add Sermon** (u otra **Bulk Import**) después de publicarlo en YouTube o Vimeo.

## Artículos relacionados {#related-articles}

- [Listas de reproducción](../sermons/playlists.md): organice los sermones en series
- [Importación masiva](../sermons/bulk-import.md): importe desde YouTube o Vimeo
- [Administración de sermones](../sermons/managing-sermons.md): agregue y edite sermones individuales
- [Transmisión en vivo](../sermons/live-streaming.md): configure los servicios en vivo
- [Sermones (miembros)](../../b1-church/content/sermons.md): experiencia de los miembros para ver sermones
- [Transmisión en vivo (miembros)](../../b1-church/content/live-streaming.md): experiencia de los miembros con la transmisión en vivo
