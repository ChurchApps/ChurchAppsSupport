---
title: "Transmisión en vivo"
---

# Transmisión en vivo

<div class="article-intro">

La página Horarios de transmisión en vivo le permite configurar el calendario de transmisiones de su iglesia, administrar los horarios de los servicios y personalizar la experiencia de los espectadores. Configure servicios semanales recurrentes o eventos únicos, ajuste el chat y el video, y controle cuándo se inicia la transmisión.

</div>

## Video de capacitación

<YouTube id="tpEY-sEYW6A" title="Configuración de la transmisión en vivo en B1" next="Personalización de la aplicación de miembros de su iglesia en B1" nextUrl="/docs/b1-admin/settings/mobile-app" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita el permiso **contentApi.streamingServices.edit**. Consulte [Roles y permisos](../settings/roles-permissions.md) si no tiene acceso.
- Tenga a mano el ID de su canal de YouTube si planea usar la transmisión en vivo automatizada
- Agregue al menos un [sermón](managing-sermons) o una URL en vivo permanente para usarlo como fuente de transmisión

</div>

La transmisión en vivo se administra desde dos páginas de la sección **Sermones** del menú Jump: **Horarios de transmisión en vivo**, para administrar el calendario de transmisiones, y **Configuración**, para configurar las pestañas de su página de transmisión.

## Administrar servicios

### Agregar un servicio

1. En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda), expanda **Sermones** y haga clic en **Horarios de transmisión en vivo**.
2. Haga clic en el botón **Agregar servicio** en la parte superior de la página para crear un nuevo servicio programado. Los servicios existentes aparecen en una tabla que muestra el nombre, la hora, el proveedor y la duración de cada servicio; haga clic en el ícono de edición de una fila para cambiarlo.
3. Escriba un **Nombre del servicio** (por ejemplo, "Domingo por la mañana").
4. Establezca la **Hora del servicio**: elija el día y la hora en que comienza el servicio.
5. Establezca **Se repite semanalmente** en **Sí** para servicios semanales regulares, o en **No** para un evento único.

### Configurar el chat y el video

6. En **Configuración del chat**, establezca cuántos minutos antes y después del servicio debe habilitarse el chat. Esto permite que los visitantes empiecen a chatear antes de que comience el servicio y sigan haciéndolo después.
7. En **Configuración de video**, establezca con cuánta anticipación debe iniciarse la transmisión de video, para contenido de cuenta regresiva o previo al servicio. El chat se abre esa cantidad de minutos *antes* del inicio anticipado del video, así que el tiempo que aparece junto a la opción de minutos antes del chat suma ambos números. Por ejemplo, con un servicio a las 10:00, 15 minutos de chat antes y un inicio anticipado de 5 minutos, el chat se abre a las 9:40.
8. Seleccione qué sermón reproducir en el menú desplegable:
   - **Último sermón**: reproduce automáticamente el video agregado más recientemente.
   - **Servicio en vivo actual**: reproduce su transmisión en vivo actual de YouTube usando su ID de canal.
   - También puede elegir cualquier sermón específico que ya haya guardado.
9. Haga clic en **Guardar** para programar su servicio.

:::info
Su servicio se actualizará automáticamente cada semana si está configurado como recurrente. Mantiene la misma hora local cuando inicia o termina el horario de verano. Puede agregar todos los servicios que necesite. Los visitantes verán la próxima hora de servicio programada cuando visiten su página de transmisión.
:::

## Configuración de la página de transmisión

Para personalizar las pestañas y los enlaces que aparecen junto a su transmisión en vivo, abra el menú Jump, expanda **Sermones** y haga clic en **Configuración**. La página **Configuración de transmisión** muestra su lista de **Pestañas de contenido**.

### Agregar pestañas

1. Haga clic en el botón **Agregar** para añadir una nueva pestaña a su página de transmisión en vivo.
2. Elija un **Tipo de enlace**: **URL externa** para un enlace personalizado, o una de las pestañas predefinidas **Chat** o **Peticiones de oración**.
3. Para la pestaña de Chat, solo escriba un nombre en el cuadro **Texto de la pestaña** y la configuración estará completa.
4. Para una pestaña con enlace, escriba el nombre de la pestaña, elija un ícono haciendo clic en el botón de ícono e ingrese la URL.
5. Sus pestañas configuradas aparecerán en la página de transmisión en vivo para que los espectadores accedan a recursos adicionales y funciones interactivas.

### Vista previa de su transmisión

En la página **Horarios de transmisión en vivo**, haga clic en **Ver su transmisión** en la parte superior de la página para ver exactamente cómo se verá su página de transmisión en vivo para los visitantes, incluidos su logotipo, los horarios de servicio y las pestañas configuradas.

## Configurar su transmisión en vivo de YouTube

Para conectar su canal de YouTube para la transmisión en vivo automática:

1. Vaya a **Sermones** y haga clic en **Agregar sermón**; luego seleccione **Agregar URL en vivo permanente**.
2. El proveedor de video se establece de forma predeterminada en **Transmisión en vivo actual de YouTube**. Ingrese su **ID del canal de YouTube**.
3. Agregue un título y una descripción, luego haga clic en **Guardar**.
4. En **Horarios de transmisión en vivo**, cree un servicio y seleccione su URL en vivo permanente en el menú desplegable de sermones.

:::tip
Para encontrar el ID de su canal de YouTube, vaya a la configuración avanzada de su canal de YouTube y copie el valor de ID del canal.
:::

## Personalizar colores y logotipo

Su página de transmisión en vivo usa la configuración de [Apariencia](../website/appearance) de su sitio web:

- El **color de acento claro** con texto oscuro se usa para el encabezado.
- El **color de acento oscuro** con texto claro se usa para la barra lateral.
- Su **Logotipo para fondo claro** aparece en la página de transmisión. Use una imagen con fondo transparente y una relación de aspecto de 4:1.

Para cambiar estos elementos, vaya a **Sitio web** y luego a **Apariencia**, y actualice su [Paleta de colores](../website/appearance#color-palette) y su configuración de [Logotipo](../website/appearance#logo-and-branding).

## Agregar anfitriones de transmisión

Para dar acceso a los miembros del equipo al chat solo para anfitriones junto con el chat público:

1. En el menú Jump, elija **Configuración > Roles**.
2. Haga clic en el botón de más y seleccione **Agregar rol personalizado**.
3. Nombre el rol "Anfitrión de transmisión" y haga clic en **Guardar**.
4. Haga clic en el nuevo rol y luego en **Agregar** en la sección Miembros para añadir personas.
5. Desplácese hacia abajo hasta **Editar permisos**, expanda la sección **Contenido** y marque **Chat de anfitriones**.

Cuando los anfitriones inicien sesión en la página de transmisión en vivo, aparecerá una pestaña privada **Chat de anfitriones** junto al chat público, para conversaciones exclusivas del personal durante la transmisión.

:::info
Para más detalles sobre cómo crear roles y administrar permisos, consulte [Roles y permisos](../settings/roles-permissions.md).
:::

## Solución de problemas

Si su transmisión automática de YouTube no se muestra correctamente al usar la opción "Transmisión en vivo actual de YouTube" con su ID de canal, pruebe lo siguiente:

**Síntomas:**
- El reproductor de transmisión muestra "Video no disponible"
- La página carga, pero no aparece ningún video
- Las incrustaciones directas de YouTube funcionan, pero la transmisión automática del canal no

**Solución:**
Revise su canal de YouTube en busca de transmisiones en vivo antiguas o programadas pendientes, y elimínelas:

1. Vaya a YouTube Studio.
2. Navegue a **Contenido** y luego a **En vivo**.
3. Busque transmisiones antiguas programadas o transmisiones futuras programadas.
4. Elimine estas entradas de transmisión antiguas o programadas.
5. Vuelva a probar su página de transmisión en vivo.

:::warning
La incrustación automática de la transmisión en vivo del canal de YouTube puede bloquearse cuando hay varias entradas de transmisiones programadas o pasadas en su canal. Eliminarlas permite que YouTube identifique y sirva correctamente su transmisión en vivo actual.
:::

**Requisitos adicionales:**
- Su transmisión en vivo debe estar configurada como **Pública** (no como No listada ni Privada).
- La incrustación debe estar permitida en la configuración de transmisión de YouTube.
- Asegúrese de usar el proveedor **Transmisión en vivo actual de YouTube** (con ID de canal), no el proveedor **YouTube** (con ID de video).

## Próximos pasos

- [Administrar sermones](managing-sermons): agregue sermones a su biblioteca
- [Listas de reproducción](playlists): organice los sermones en series
