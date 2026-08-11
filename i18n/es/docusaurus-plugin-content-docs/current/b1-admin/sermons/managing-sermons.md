---
title: "Administrar Sermones"
---

# Administrar Sermones

<div class="article-intro">

La página de Sermones muestra toda tu biblioteca de sermones. Desde aquí puedes agregar nuevos sermones, editar entradas existentes y organizar tu contenido por lista de reproducción. Cada sermón puede vincular a video o audio alojado en YouTube, Vimeo, Facebook, o una URL personalizada.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Necesitas el permiso **contentApi.streamingServices.edit**. Ver [Roles y Permisos](../settings/roles-permissions.md) si no tienes acceso.
- Crea al menos una [lista de reproducción](playlists) para organizar tus sermones
- Ten tus IDs de video o URLs listos de YouTube, Vimeo o Facebook

</div>

## Ver Tu Biblioteca de Sermones

1. En B1 Admin, abre el **menú de sección** en la esquina superior izquierda (el nombre de la sección con la flecha pequeña) y elige **Sermones**.
2. La página de Sermones muestra todas tus entradas de sermones, organizadas por lista de reproducción. Cada sermón muestra su miniatura, título y fecha.
3. Haz clic en cualquier sermón para ver o editar sus detalles.

## Agregar un Sermón

1. Haz clic en el botón **Agregar Sermón** en la esquina superior derecha y selecciona **Agregar Sermón** del menú desplegable.
2. Selecciona una **Lista de Reproducción** para asignar el sermón.
3. Elige tu **Proveedor de Video** -- YouTube, Vimeo, Facebook, o URL Personalizada. Recomendamos YouTube ya que funciona mejor con el sistema B1.
4. Ingresa el ID de video o URL y haz clic en **Fetch**. Para YouTube, el ID de video es la cadena de caracteres después de `v=` en la URL de YouTube.
5. Cuando hagas clic en **Fetch**, los detalles del sermón se importan automáticamente, incluyendo la fecha de publicación, duración, título, descripción y miniatura.
6. Haz cualquier cambio que desees y haz clic en **Guardar**.

:::tip
También puedes agregar una URL de transmisión en vivo permanente seleccionando **Agregar URL en Vivo Permanente** desde el menú desplegable **Agregar Sermón**. Esto crea una conexión persistente a la transmisión en vivo de tu canal de YouTube usando tu ID de Canal. Ver [Transmisión en Vivo](live-streaming) para más detalles.
:::

## Editar un Sermón

1. Haz clic en cualquier sermón en tu biblioteca para abrir sus detalles.
2. Actualiza el título, orador, fecha, descripción, miniatura o enlaces de medios según sea necesario.
3. Haz clic en **Guardar** para aplicar tus cambios.

## Detalles del Sermón

Cada entrada de sermón puede incluir:

- **Título** -- El nombre del sermón mostrado a los visitantes
- **Orador** -- Quién pronunció el sermón
- **Fecha** -- La fecha de publicación o entrega
- **Descripción** -- Un resumen del contenido del sermón
- **Miniatura** -- Una imagen de vista previa mostrada en tu biblioteca de sermones
- **Enlaces de Video/Audio** -- URLs al sermón en YouTube, Vimeo, Facebook, o un host personalizado

## Programar un Sermón para Transmisión en Vivo

Después de agregar un sermón, puedes programarlo para transmisión en tu página de transmisión en vivo:

1. Ve a la pestaña **Horarios de Transmisión en Vivo**.
2. Edita un servicio y bajo **Configuración de Video**, selecciona tu sermón desde el menú desplegable.
3. El sermón se reproducirá en el tiempo de servicio programado.

:::info
Para importar múltiples sermones a la vez en lugar de agregarlos uno a uno, usa la herramienta [Importación Masiva](bulk-import) para extraer videos directamente de tu cuenta de YouTube o Vimeo.
:::

## Próximos Pasos

- [Listas de Reproducción](playlists) -- Organiza sermones en series
- [Transmisión en Vivo](live-streaming) -- Configura tu horario de transmisión
- [Importación Masiva](bulk-import) -- Importa múltiples sermones a la vez
