---
title: "Gestionar Sermones"
---

# Gestionar Sermones

<div class="article-intro">

La página de Sermones muestra tu biblioteca completa de sermones. Desde aquí puedes añadir nuevos sermones, editar entradas existentes y organizar tu contenido por lista de reproducción. Cada sermón puede vincularse a video o audio alojado en YouTube, Vimeo, Facebook o una URL personalizada.

</div>

<div class="prereqs">
<h4>Antes de Empezar</h4>

- Necesitas el permiso **contentApi.streamingServices.edit**. Consulta [Roles y Permisos](../settings/roles-permissions.md) si no tienes acceso.
- Crea al menos una [lista de reproducción](playlists) para organizar tus sermones
- Ten listos tus ID de video o URLs de YouTube, Vimeo o Facebook

</div>

## Visualizar Tu Biblioteca de Sermones

1. En B1 Admin, abre el [menú Saltar](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda), expande **Sermones** y haz clic en **Sermones**.
2. La página de Sermones muestra todas tus entradas de sermones, organizadas por lista de reproducción. Cada sermón muestra su miniatura, título y fecha.
3. Haz clic en cualquier sermón para ver o editar sus detalles.

## Añadir un Sermón

1. Haz clic en el botón **Añadir Sermón** en la esquina superior derecha y selecciona **Añadir Sermón** del menú desplegable.
2. Selecciona una **Lista de Reproducción** para asignar el sermón.
3. Elige tu **Proveedor de Video** -- YouTube, Vimeo, Facebook o URL Personalizada. Recomendamos YouTube ya que funciona mejor con el sistema B1.
4. Ingresa el ID de video o URL y haz clic en **Descargar**. Para YouTube, el ID de video es la cadena de caracteres después de `v=` en la URL de YouTube.
5. Cuando hagas clic en **Descargar**, los detalles del sermón se importan automáticamente, incluyendo la fecha de publicación, duración, título, descripción y miniatura.
6. Realiza los cambios que desees y haz clic en **Guardar**.

:::tip
También puedes añadir una URL de transmisión en vivo permanente seleccionando **Añadir URL de Transmisión en Vivo Permanente** en el menú desplegable **Añadir Sermón**. Esto crea una conexión persistente al flujo en vivo del canal de YouTube usando tu ID de Canal. Consulta [Transmisión en Vivo](live-streaming) para más detalles.
:::

## Editar un Sermón

1. Haz clic en cualquier sermón en tu biblioteca para abrir sus detalles.
2. Actualiza el título, orador, fecha, descripción, miniatura o enlaces de medios según sea necesario.
3. Haz clic en **Guardar** para aplicar tus cambios.

## Detalles del Sermón

Cada entrada de sermón puede incluir:

- **Título** -- El nombre del sermón mostrado a los visitantes
- **Orador** -- Quién predicó el sermón
- **Fecha** -- La fecha de publicación o predicación
- **Descripción** -- Un resumen del contenido del sermón
- **Miniatura** -- Una imagen de vista previa mostrada en tu biblioteca de sermones
- **Enlaces de Video/Audio** -- URLs del sermón multimedia en YouTube, Vimeo, Facebook o un servidor personalizado
- **URL de Archivo de Audio (para podcast)** -- Un enlace directo a un archivo MP3/M4A para este sermón. Puedes pegar una URL o hacer clic en **Cargar Audio** para cargar un archivo y completarlo automáticamente. Solo los sermones con este campo (o un enlace directo a archivo de video) establecido se incluyen en tu feed de podcast.

## Tu Feed de Podcast

Una vez que al menos un sermón tenga un archivo de audio o video adjunto, B1 Admin genera un feed RSS de podcast para tu iglesia automáticamente -- no hay nada que activar. Encuéntralo en el panel **Feed de Podcast** debajo de la lista de sermones: haz clic en el icono de copiar para copiar la URL del feed y luego envía esa URL a Apple Podcasts, Spotify o cualquier otro directorio de podcasts.

:::info
Los sermones que solo enlazan a un reproductor incrustado (como un ID de video de YouTube o Vimeo) no aparecerán en el feed de podcast -- las aplicaciones de podcast necesitan un archivo multimedia directo y descargable. Añade una **URL de Archivo de Audio** para incluir un sermón.
:::

## Programar un Sermón para Transmisión en Vivo

Después de añadir un sermón, puedes programarlo para transmitirse en tu página de transmisión en vivo:

1. En el menú Saltar, elige **Sermones > Horarios de Transmisión en Vivo**.
2. Edita un servicio y bajo **Configuración de Video**, selecciona tu sermón del menú desplegable.
3. El sermón se reproducirá a la hora programada del servicio.

:::info
Para importar múltiples sermones de una vez en lugar de añadirlos uno por uno, usa la herramienta [Importación Masiva](bulk-import) para extraer videos directamente de tu cuenta de YouTube o Vimeo.
:::

## Próximos Pasos

- [Listas de Reproducción](playlists) -- Organiza sermones en series
- [Transmisión en Vivo](live-streaming) -- Configura tu horario de transmisión
- [Importación Masiva](bulk-import) -- Importa múltiples sermones de una vez
