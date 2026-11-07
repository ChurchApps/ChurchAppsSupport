---
title: "Horarios y configuración de transmisiones en vivo en B1 Admin"
sidebar_label: "Transmisión en vivo"
description: "Programa transmisiones en vivo de servicios semanales o únicos, configura el chat y el tiempo de inicio anticipado del video, conecta un canal de YouTube y soluciona problemas de inserción en B1 Admin."
---

# Transmisión en vivo

<div class="article-intro">

La página de Horarios de transmisión en vivo le permite configurar el calendario de transmisiones de su iglesia, administrar los horarios de servicio y personalizar la experiencia de los espectadores. Configure servicios semanales recurrentes o eventos únicos, ajuste la configuración del chat y del video, y controle cuándo se activa la transmisión.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita el permiso **contentApi.streamingServices.edit**. Consulte [Roles y permisos](../settings/roles-permissions.md) si no tiene acceso.
- Tenga a mano el ID de su canal de YouTube si planea usar la transmisión en vivo automatizada
- Agregue al menos un [sermón](./managing-sermons.md) o una URL de transmisión en vivo permanente para usarla como fuente de su transmisión

</div>

La transmisión en vivo se administra desde dos páginas de la sección **Sermones** del menú Jump: **Horarios de transmisión en vivo**, para administrar su calendario de transmisiones, y **Configuración**, para configurar las pestañas de su página de transmisión.

## Administrar servicios

### Agregar un servicio

1. En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expanda **Sermones** y haga clic en **Horarios de transmisión en vivo**.
2. Haga clic en el botón **Agregar servicio** en la parte superior de la página para crear un nuevo servicio programado. Los servicios existentes aparecen en una tabla que muestra el nombre, la hora, el proveedor y la duración de cada servicio; haga clic en el ícono de editar de una fila para cambiarla.
3. Escriba un **Nombre del servicio** (por ejemplo, "Domingo por la mañana").
4. Establezca la **Hora del servicio**: elija el día y la hora en que comienza su servicio.
5. Establezca **Se repite semanalmente** en **Sí** para servicios semanales regulares, o en **No** para un evento único.

### Configurar el chat y el video

6. En **Configuración del chat**, establezca cuántos minutos antes y después del servicio debe habilitarse el chat. Esto permite que los visitantes empiecen a chatear antes de que comience el servicio y sigan después.
7. En **Configuración de video**, establezca con cuánta anticipación iniciar la transmisión de video para contenido de cuenta regresiva o previo al servicio. El chat se abre esos minutos *antes* del inicio anticipado del video, así que la hora mostrada junto a la configuración de minutos antes del chat suma ambos números. Por ejemplo, un servicio a las 10:00 con 15 minutos de chat antes y un inicio anticipado de 5 minutos abre el chat a las 9:40.
8. Seleccione qué sermón reproducir desde el menú desplegable:
   - **Último sermón**: reproduce automáticamente el video agregado más recientemente.
   - **Servicio en vivo actual**: reproduce su transmisión en vivo actual desde YouTube usando su ID de canal.
   - También puede elegir cualquier sermón específico que ya haya guardado.
9. Haga clic en **Guardar** para programar su servicio.

:::info
Su servicio se actualizará automáticamente cada semana si está configurado como recurrente. Mantiene la misma hora local cuando inicia o termina el horario de verano. Puede agregar todos los servicios que necesite. Los visitantes verán la próxima hora de servicio programada cuando visiten su página de transmisión.
:::

## Configuración de la página de transmisión

Para personalizar las pestañas y los enlaces que aparecen junto a su transmisión en vivo, abra el menú Jump, expanda **Sermones** y haga clic en **Configuración**. La página **Configuración de transmisión** muestra su lista de **Pestañas de contenido**.

### Agregar pestañas

1. Haga clic en el botón **Agregar** para agregar una nueva pestaña a su página de transmisión en vivo.
2. Elija un **Tipo de enlace**: **URL externa** para un enlace personalizado, o una de las pestañas predefinidas de **Chat** u **Oración**.
3. Para la pestaña de Chat, solo escriba un nombre en el cuadro **Texto de la pestaña** y la configuración estará completa.
4. Para una pestaña con enlace, escriba el nombre de la pestaña, elija un ícono haciendo clic en el botón de ícono e ingrese la URL.
5. Las pestañas configuradas aparecerán en la página de transmisión en vivo para que los espectadores accedan a recursos adicionales y funciones interactivas.

### Vista previa de su transmisión

En la página **Horarios de transmisión en vivo**, haga clic en **Ver su transmisión** en la parte superior de la página para ver exactamente cómo se verá su página de transmisión en vivo para los visitantes, incluidos su logotipo, los horarios de servicio y las pestañas configuradas.

## Configurar su transmisión en vivo de YouTube

Para conectar su canal de YouTube y transmitir en vivo automáticamente:

1. Vaya a **Sermones**, haga clic en **Agregar sermón** y luego seleccione **Agregar URL de transmisión en vivo permanente**.
2. El proveedor de video predeterminado es **Transmisión en vivo actual de YouTube**. Escriba su **ID del canal de YouTube**.
3. Agregue un título y una descripción, y luego haga clic en **Guardar**.
4. En **Horarios de transmisión en vivo**, cree un servicio y seleccione su URL de transmisión en vivo permanente en el menú desplegable de sermones.

:::tip
Para encontrar el ID de su canal de YouTube, vaya a la configuración avanzada de su canal de YouTube y copie el valor del ID del canal.
:::

## Personalizar colores y logotipo

Su página de transmisión en vivo usa la configuración de [Apariencia](../website/appearance.md) de su sitio web:

- El **color de acento claro** con texto oscuro se usa para el encabezado.
- El **color de acento oscuro** con texto claro se usa para la barra lateral.
- Su **Logotipo para fondo claro** aparece en la página de transmisión. Use una imagen con fondo transparente y una relación de aspecto de 4:1.

Para cambiar estos elementos, vaya a **Sitio web** y luego a **Apariencia**, y actualice su [Paleta de colores](../website/appearance.md#color-palette) y su configuración de [Logotipo](../website/appearance.md#logo-and-branding).

## Agregar anfitriones de transmisión

Para dar acceso a los miembros del equipo al chat exclusivo para anfitriones junto con el chat público:

1. En el menú Jump, elija **Configuración > Roles**.
2. Haga clic en el botón de más y seleccione **Agregar rol personalizado**.
3. Nombre el rol "Anfitrión de transmisión" y haga clic en **Guardar**.
4. Haga clic en el nuevo rol y luego en **Agregar** en la sección Miembros para agregar personas.
5. Desplácese hasta **Editar permisos**, expanda la sección **Contenido** y marque **Chat de anfitriones**.

Cuando los anfitriones inicien sesión en la página de transmisión en vivo, aparecerá una pestaña privada de **Chat de anfitriones** junto al chat público, para conversaciones exclusivas del personal durante la transmisión.

:::info
Para más detalles sobre cómo crear roles y administrar permisos, consulte [Roles y permisos](../settings/roles-permissions.md).
:::

## Solución de problemas

Si su transmisión automatizada de YouTube no se muestra correctamente al usar la opción "Transmisión en vivo actual de YouTube" con su ID de canal, pruebe lo siguiente:

**Síntomas:**
- El reproductor de la transmisión muestra "Video no disponible"
- La página carga, pero no aparece ningún video
- Las inserciones directas de YouTube funcionan, pero la transmisión automatizada del canal no

**Solución:**
Revise su canal de YouTube en busca de transmisiones en vivo antiguas o programadas y elimínelas:

1. Vaya a YouTube Studio.
2. Navegue a **Contenido** y luego a **En vivo**.
3. Busque transmisiones antiguas programadas o transmisiones próximas programadas.
4. Elimine estas entradas de transmisión antiguas o programadas.
5. Pruebe su página de transmisión en vivo de nuevo.

:::warning
La inserción automatizada de la transmisión del canal de YouTube puede bloquearse cuando hay varias entradas de transmisiones programadas o pasadas en su canal. Eliminarlas permite que YouTube identifique y sirva correctamente su transmisión actual.
:::

**Requisitos adicionales:**
- Su transmisión en vivo debe estar configurada como **Pública** (no como No listada ni Privada).
- Debe permitirse la inserción en la configuración de transmisión de YouTube.
- Asegúrese de usar el proveedor **Transmisión en vivo actual de YouTube** (con ID de canal), no el proveedor **YouTube** (con ID de video).

## Próximos pasos

- [Administrar sermones](./managing-sermons.md) -- Agregue sermones a su biblioteca
- [Listas de reproducción](./playlists.md) -- Organice los sermones en series
