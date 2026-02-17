---
title: "Gestión de Sermones"
---

# Gestión de Sermones

<div class="article-intro">

La página de Sermones muestra toda su biblioteca de sermones. Desde aquí puede agregar nuevos sermones, editar entradas existentes y organizar su contenido por lista de reproducción. Cada sermón puede vincularse a video o audio alojado en YouTube, Vimeo, Facebook o una URL personalizada.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Necesita el permiso **contentApi.streamingServices.edit**. Consulte [Roles y Permisos](../settings/roles-permissions.md) si no tiene acceso.
- Cree al menos una [lista de reproducción](playlists) para organizar sus sermones
- Tenga listos sus IDs de video o URLs de YouTube, Vimeo o Facebook

</div>

## Ver su Biblioteca de Sermones

1. En B1 Admin, haga clic en **Sermones** en la barra lateral izquierda.
2. La página de Sermones muestra todas las entradas de sus sermones, organizadas por lista de reproducción. Cada sermón muestra su miniatura, título y fecha.
3. Haga clic en cualquier sermón para ver o editar sus detalles.

## Agregar un Sermón

1. Haga clic en el botón **Agregar Sermón** en la esquina superior derecha y seleccione **Agregar Sermón** del menú desplegable.
2. Seleccione una **Lista de Reproducción** para asignar el sermón.
3. Elija su **Proveedor de Video** -- YouTube, Vimeo, Facebook o URL Personalizada. Recomendamos YouTube ya que funciona mejor con el sistema de B1.
4. Ingrese el ID o URL del video y haga clic en **Obtener**. Para YouTube, el ID del video es la cadena de caracteres después de `v=` en la URL de YouTube.
5. Cuando haga clic en **Obtener**, los detalles del sermón se importan automáticamente, incluyendo la fecha de publicación, duración, título, descripción y miniatura.
6. Realice los cambios que desee y haga clic en **Guardar**.

:::tip
También puede agregar una URL de transmisión en vivo permanente seleccionando **Agregar URL Permanente en Vivo** del menú desplegable de **Agregar Sermón**. Esto crea una conexión persistente con la transmisión en vivo de su canal de YouTube usando su ID de Canal. Consulte [Transmisión en Vivo](live-streaming) para más detalles.
:::

## Editar un Sermón

1. Haga clic en cualquier sermón de su biblioteca para abrir sus detalles.
2. Actualice el título, predicador, fecha, descripción, miniatura o enlaces multimedia según sea necesario.
3. Haga clic en **Guardar** para aplicar sus cambios.

## Detalles del Sermón

Cada entrada de sermón puede incluir:

- **Título** -- El nombre del sermón mostrado a los visitantes
- **Predicador** -- Quién predicó el sermón
- **Fecha** -- La fecha de publicación o predicación
- **Descripción** -- Un resumen del contenido del sermón
- **Miniatura** -- Una imagen de vista previa mostrada en su biblioteca de sermones
- **Enlaces de Video/Audio** -- URLs al contenido multimedia del sermón en YouTube, Vimeo, Facebook o un alojamiento personalizado

## Programar un Sermón para Transmisión en Vivo

Después de agregar un sermón, puede programarlo para transmitirse en su página de transmisión en vivo:

1. Vaya a la pestaña **Horarios de Transmisión en Vivo**.
2. Edite un servicio y en **Configuración de Video**, seleccione su sermón del menú desplegable.
3. El sermón se reproducirá en el horario de servicio programado.

:::info
Para importar múltiples sermones a la vez en lugar de agregarlos uno por uno, use la herramienta de [Importación Masiva](bulk-import) para obtener videos directamente de su cuenta de YouTube o Vimeo.
:::

## Próximos Pasos

- [Listas de Reproducción](playlists) -- Organice sermones en series
- [Transmisión en Vivo](live-streaming) -- Configure su horario de transmisión
- [Importación Masiva](bulk-import) -- Importe múltiples sermones a la vez
