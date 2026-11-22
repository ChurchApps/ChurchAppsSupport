---
title: "Administrar sermones"
description: "Administre su biblioteca de sermones en B1 Admin: agregue sermones desde YouTube, Vimeo o Facebook, edite los detalles y obtenga un feed de podcast para su iglesia."
---

# Administrar sermones

<div class="article-intro">

La página de Sermones muestra toda su biblioteca de sermones. Desde aquí puede agregar sermones nuevos, editar las entradas existentes y organizar su contenido por lista de reproducción. Cada sermón puede enlazar a video o audio alojado en YouTube, Vimeo, Facebook o una URL personalizada.

</div>

<div class="prereqs">
<h4>Antes de empezar</h4>

- Necesita el permiso **Editar servicios** en la sección **Contenido** de su rol. Consulte [Roles y permisos](../settings/roles-permissions.md) si no tiene acceso.
- Cree al menos una [lista de reproducción](./playlists.md) para organizar sus sermones
- Tenga a mano los IDs o las URL de sus videos de YouTube, Vimeo o Facebook

</div>

## Ver su biblioteca de sermones {#viewing-your-sermon-library}

1. En B1 Admin, abra el [menú Salto](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expanda **Sermones** y haga clic en **Sermones**.
2. La página de Sermones muestra sus entradas en una tabla, con la **Lista de reproducción**, el título (**Sermón**) y la **Fecha de publicación** de cada sermón, del más reciente al más antiguo, junto con un recuento como "11 de 11 sermones". Escriba en el cuadro **Buscar sermones por título o lista de reproducción...** para filtrar la lista. Sus listas de reproducción aparecen en un panel **Listas de reproducción** junto a la tabla, y el panel **Feed de podcast** está debajo.
3. Pase el cursor sobre una fila de sermón y haga clic en **Editar** para ver o editar sus detalles.

## Agregar un sermón {#adding-a-sermon}

1. Haga clic en el botón **Agregar sermón** en la esquina superior derecha y seleccione **Agregar sermón** en el menú desplegable. Se abre un formulario **Editar sermón** encima de la lista.
2. Seleccione una **Lista de reproducción** para asignarle el sermón (o déjela en **Ninguna**).
3. Elija su **Proveedor de video**: **YouTube**, **Vimeo**, **Facebook** o **URL de incrustación personalizada**. Recomendamos YouTube porque funciona mejor con el sistema B1.
4. Escriba el **ID de YouTube**, el **ID de Vimeo**, el **ID del sermón** (Facebook) o la **URL de incrustación del sermón** del video. Puede pegar el enlace completo del video; B1 guarda solo el ID. En YouTube, el ID del video es la cadena de caracteres que aparece después de `v=` en la URL de YouTube.
5. En YouTube y Vimeo, haga clic en **Obtener** para importar automáticamente los detalles del sermón, incluidos la fecha de publicación, la duración, el título, la descripción y la miniatura. Si no se pueden cargar los detalles, aparecerá un mensaje y podrá completarlos usted mismo.
6. Haga los cambios que desee y haga clic en **Guardar**.

:::tip
También puede agregar una URL de transmisión en vivo permanente seleccionando **Agregar URL de transmisión en vivo permanente** en el menú desplegable **Agregar sermón**. Esto crea una conexión persistente con la transmisión en vivo de su canal de YouTube usando su ID de canal. Consulte [Transmisión en vivo](./live-streaming.md) para más detalles.
:::

## Editar un sermón {#editing-a-sermon}

1. Haga clic en **Editar** en cualquier fila de sermón de su biblioteca para abrir sus detalles.
2. Actualice el título, la fecha, la descripción, la miniatura, la duración o los enlaces multimedia según sea necesario.
3. Haga clic en **Guardar** para aplicar los cambios, o en **Cancelar** para cerrar el formulario.

Para eliminar un sermón, ábralo, haga clic en **Eliminar** y confirme.

### Agregar un sermón a otra lista de reproducción {#adding-a-sermon-to-another-playlist}

Para incluir el mismo sermón en una segunda lista de reproducción (por ejemplo, un sermón que pertenece tanto a una serie como a una colección de "Lo mejor"), abra el sermón, haga clic en **Agregar a otra lista de reproducción**, elija la lista y haga clic en **Agregar**. Esto guarda una copia del sermón en esa lista.

## Detalles del sermón {#sermon-details}

Cada entrada de sermón puede incluir:

- **Lista de reproducción** -- La serie a la que pertenece el sermón
- **Proveedor de video** y ID del video -- Dónde está alojado el video del sermón: YouTube, Vimeo, Facebook o una URL de incrustación personalizada
- **Fecha de publicación** -- La fecha en que se publica el sermón; los sermones sin fecha muestran **Sin programar** en la lista
- **Duración total del sermón** -- La duración del sermón en minutos y segundos
- **Miniatura** -- Una imagen de vista previa que se muestra en su biblioteca de sermones. Haga clic en la imagen para recortarla o reemplazarla (16:9).
- **Título** -- El nombre del sermón que se muestra a los visitantes
- **Descripción** -- Un resumen del contenido del sermón
- **URL del archivo de audio (para podcast)** -- Un enlace directo a **un solo** archivo MP3/M4A de este sermón. Este no es el lugar para la dirección del feed de un podcast; un feed pegado aquí no se reproducirá. Para incorporar todo un podcast, use [Importación masiva](./bulk-import.md#importing-podcast-episodes). Puede pegar una URL o, una vez guardado el sermón, hacer clic en **Subir audio** para subir un archivo y completar el campo automáticamente. Solo los sermones con este campo (o con un enlace directo a un archivo de video) configurado se incluyen en su feed de podcast.

## Su feed de podcast {#your-podcast-feed}

Una vez que al menos un sermón tenga un archivo de audio o video adjunto, B1 Admin genera automáticamente un feed RSS de podcast para su iglesia; no hay nada que activar. Lo encontrará en el panel **Feed de podcast** junto a la lista de sermones (debajo del panel **Listas de reproducción**): haga clic en el icono de copiar para copiar la URL del feed y luego envíe esa URL a Apple Podcasts, Spotify o cualquier otro directorio de podcasts.

:::info
Los sermones que solo enlazan a un reproductor incrustado (como un ID de video de YouTube o Vimeo) no aparecerán en el feed de podcast, porque las aplicaciones de podcast necesitan un archivo multimedia directo y descargable. Agregue una **URL del archivo de audio** para incluir un sermón.
:::

## Programar un sermón para la transmisión en vivo {#scheduling-a-sermon-for-live-stream}

Después de agregar un sermón, puede programarlo para transmitirlo en su página de transmisión en vivo:

1. En el menú Salto, elija **Sermones > Horarios de transmisión en vivo**.
2. Edite un servicio y, en **Configuración de video**, seleccione su sermón en el menú desplegable **Sermón**.
3. El sermón se reproducirá a la hora programada del servicio.

:::info
Para importar varios sermones a la vez en lugar de agregarlos uno por uno, use la herramienta [Importación masiva](./bulk-import.md) para extraer videos directamente de su cuenta de YouTube o Vimeo.
:::

## Próximos pasos {#next-steps}

- [Listas de reproducción](./playlists.md) -- Organice los sermones en series
- [Transmisión en vivo](./live-streaming.md) -- Configure su calendario de transmisión
- [Importación masiva](./bulk-import.md) -- Importe varios sermones a la vez
