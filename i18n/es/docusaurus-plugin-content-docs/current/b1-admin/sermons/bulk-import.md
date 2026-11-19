---
title: "Importación masiva"
description: "Importe videos de sermones en masa desde un canal de YouTube o una cuenta de Vimeo, o episodios de podcast desde un feed RSS, a B1 Admin, y luego organícelos en una lista de reproducción."
---

# Importación masiva

<div class="article-intro">

La página de Importación masiva le permite llenar rápidamente su biblioteca de sermones importando videos de YouTube o Vimeo, o episodios de un feed RSS de podcast. Es la forma más rápida de incorporar el contenido de sermones que ya tiene, en lugar de agregar cada sermón uno por uno.

</div>

<div class="prereqs">
<h4>Antes de empezar</h4>

- Necesita el permiso **Editar servicios** en la sección **Contenido** de su rol. Consulte [Roles y permisos](../settings/roles-permissions.md) si no tiene acceso.
- Cree al menos una [lista de reproducción](./playlists.md) en la que importar sus sermones
- Tenga a mano el ID de su canal de YouTube, la información de su cuenta de Vimeo o la dirección de su feed de podcast

</div>

## Elegir su origen {#choosing-your-source}

1. En B1 Admin, abra el [menú Salto](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expanda **Sermones** y haga clic en **Sermones**. Haga clic en **Agregar sermón** y elija **Importación masiva** en el menú.
2. En **Elegir origen de importación** verá tres opciones:
   - **YouTube** -- Importar videos desde un canal de YouTube
   - **Vimeo** -- Importar videos desde una cuenta de Vimeo
   - **Feed RSS de podcast** -- Importar episodios de un feed de podcast como sermones de audio
3. Haga clic en la opción de la plataforma donde están alojados sus sermones (o haga clic en **Importar desde YouTube**, **Importar desde Vimeo** o **Importar desde feed de podcast** debajo de su descripción). Haga clic en **Atrás** en la parte superior de la página para volver a la elección de origen.

:::tip
Puede volver y cambiar de origen en cualquier momento si tiene videos en ambas plataformas.
:::

## Antes de importar {#before-you-import}

Antes de importar videos, necesita al menos una lista de reproducción en la que organizarlos. Si todavía no ha creado ninguna:

1. Vuelva a la página **Sermones** y busque el panel **Listas de reproducción**.
2. Haga clic en **Crear primera lista de reproducción** y complete el nombre, la descripción, la fecha de publicación y la miniatura.
3. Haga clic en **Guardar** y luego regrese a la Importación masiva haciendo clic en **Agregar sermón** y eligiendo **Importación masiva**.

Consulte [Listas de reproducción](./playlists.md) para obtener instrucciones detalladas sobre cómo crear y administrar listas de reproducción.

## Importar videos {#importing-videos}

1. Después de seleccionar YouTube o Vimeo, escriba su **ID del canal de YouTube** o su **ID del canal de Vimeo** en el campo correspondiente.
2. Haga clic en el botón **Obtener** para recuperar los videos de su canal. Si los videos no se pueden cargar o el canal no tiene ninguno, aparecerá un mensaje; verifique el ID e inténtelo de nuevo.
3. Después de obtenerlos, verá una lista de sus videos, cada uno con una casilla bajo **Importar**.
4. Marque la casilla junto a cada video que desee importar.
5. Haga clic en el menú desplegable **Importar a la lista de reproducción** para elegir a qué lista de reproducción se agregarán estos videos.
6. Haga clic en el botón **Importar** para completar la importación masiva. Al terminar, volverá a la elección de origen.

Si hace clic en **Importar** sin elegir una lista de reproducción o sin marcar ningún video, B1 le pedirá que lo haga primero. Haga clic en **Cancelar** para salir sin importar.

Sus videos se importarán con todos sus detalles, incluidos los títulos, las descripciones, las fechas y las miniaturas. Los caracteres especiales en los títulos y descripciones de YouTube, como `&`, apóstrofes y comillas, se importan tal como están escritos, y no como códigos como `&amp;`.

:::info
La importación masiva es ideal para empezar cuando está migrando desde otra plataforma. Para agregar sermones individuales en el futuro, use la página [Administrar sermones](./managing-sermons.md).
:::

## Importar episodios de podcast {#importing-podcast-episodes}

Si sus sermones se publican como podcast (Spotify for Podcasters / Anchor, Buzzsprout, Podbean, etc.), puede incorporar los episodios como sermones de audio.

1. Elija **Feed RSS de podcast** y pegue la dirección de su feed en **URL del feed de podcast**. Dónde encontrarla:
   - **Spotify for Podcasters (Anchor)** -- **Settings** > **Availability** > **RSS distribution**. La dirección tiene este formato: `https://anchor.fm/s/…/podcast/rss`.
   - **Buzzsprout** -- el enlace **RSS Feed** en el panel de su podcast.
   - La mayoría de los demás proveedores muestran la dirección del feed RSS en la configuración o en la página de distribución del podcast.
2. Haga clic en **Obtener**. El nombre del podcast aparece encima de una lista de sus episodios con sus fechas de publicación. Si el feed no se puede cargar o no tiene episodios de audio, un mensaje lo indicará; verifique la dirección e inténtelo de nuevo.
3. Los episodios nuevos se marcan automáticamente. Los episodios que ya están en su biblioteca de sermones se marcan como **Ya importado** y no se pueden seleccionar, así que nada se agrega dos veces.
4. Desmarque los episodios que no desee, elija una lista de reproducción en **Importar a la lista de reproducción** y haga clic en **Importar**.

Cada episodio se convierte en un sermón de audio con su título, descripción, fecha, imagen y duración. Los miembros ven **Escuchar** y **Descargar audio** en estos sermones en la app de B1.

Importar es una copia única, no un enlace en vivo al feed. Cuando publique episodios nuevos, regrese y vuelva a ejecutar la importación con la misma dirección del feed; solo se marcarán los episodios nuevos.

:::note
Solo se importa el audio. Los episodios de podcast en video no se incorporan; agréguelos a través de YouTube, Vimeo o [Administrar sermones](./managing-sermons.md).
:::

:::tip
¿Quiere una lista en su sitio web o aplicación que siempre refleje su podcast sin volver a importar? Agregue el elemento **Podcast** a una página del creador de sitios web y luego agregue esa página como una pestaña **Página interna** en su aplicación móvil.
:::

## Próximos pasos {#next-steps}

- [Administrar sermones](./managing-sermons.md) -- Edite los detalles de los sermones importados
- [Listas de reproducción](./playlists.md) -- Cree y administre series de sermones
- [Transmisión en vivo](./live-streaming.md) -- Configure la transmisión en vivo de sus servicios
