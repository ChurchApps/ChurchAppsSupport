---
title: "Horarios de transmisión en vivo y configuración en B1 Admin"
sidebar_label: "Transmisión en vivo"
description: "Programe servicios de transmisión en vivo semanales o únicos, configure el momento del chat y del video anticipado, conecte un canal de YouTube y solucione problemas de incrustación en B1 Admin."
---

# Transmisión en vivo

<div class="article-intro">

La página de Horarios de transmisión en vivo le permite configurar el calendario de transmisiones de su iglesia, administrar los horarios de los servicios y personalizar la experiencia de los espectadores. Configure servicios semanales recurrentes o eventos únicos, ajuste el chat y el video, y controle cuándo se activa su transmisión.

</div>

## Video de capacitación {#training-video}

<YouTube id="tpEY-sEYW6A" title="Configurar la transmisión en vivo en B1" next="Personalizar la aplicación para miembros de su iglesia en B1" nextUrl="/docs/b1-admin/settings/mobile-app" />

<div class="prereqs">
<h4>Antes de empezar</h4>

- Necesita el permiso **Editar servicios** en la sección **Contenido** de su rol. Consulte [Roles y permisos](../settings/roles-permissions.md) si no tiene acceso.
- Tenga a mano el ID de su canal de YouTube si planea usar la transmisión en vivo automatizada
- Agregue al menos un [sermón](./managing-sermons.md) o una URL de transmisión en vivo permanente para usarla como fuente de su transmisión

</div>

La transmisión en vivo se administra desde dos páginas de la sección **Sermones** del menú Salto: **Horarios de transmisión en vivo** para administrar el calendario de su transmisión, y **Configuración** para configurar las pestañas de su página de transmisión.

## Administrar servicios {#managing-services}

### Agregar un servicio {#adding-a-service}

1. En B1 Admin, abra el [menú Salto](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expanda **Sermones** y haga clic en **Horarios de transmisión en vivo**.
2. Haga clic en el botón **Agregar servicio** en la parte superior de la página para crear un nuevo servicio programado. Los servicios existentes aparecen en una tabla que muestra el nombre de cada servicio (con una etiqueta **Semanal** para los servicios recurrentes), la hora, el proveedor y la duración; pase el cursor sobre una fila y haga clic en el icono de editar para cambiarla.
3. Escriba un **Nombre del servicio** (por ejemplo, "Domingo por la mañana"). Los nuevos servicios comienzan como "Domingo por la mañana".
4. Establezca la **Hora del servicio**: elija la fecha y la hora en que comienza su servicio. Los nuevos servicios comienzan a las 9:00 AM del próximo domingo.
5. Establezca **Se repite semanalmente** en **Sí** (**Semanal**) para servicios semanales regulares, o en **No** (**Único**) para un evento único.

### Configurar el chat y el video {#configuring-chat-and-video-settings}

6. En **Configuración del chat**, establezca **Habilitar chat - Minutos antes** y **Habilitar chat - Minutos después**: cuántos minutos antes y después del servicio debe habilitarse el chat (10 cada uno para un servicio nuevo). Así los visitantes pueden empezar a chatear antes de que comience el servicio y seguir después. La hora junto a cada casilla muestra cuándo se abre y se cierra el chat.
7. En **Configuración de video**, establezca **Iniciar video antes** -- cuántos minutos antes iniciar la transmisión de video para una cuenta regresiva o contenido previo al servicio. El chat se abre esos minutos *antes* del inicio anticipado del video, por lo que la hora mostrada junto a la configuración de minutos antes del chat suma ambos números. Por ejemplo, un servicio a las 10:00 con 15 minutos de chat antes y un inicio anticipado de 5 minutos abre el chat a las 9:40.
8. Seleccione qué reproducir en el menú desplegable **Sermón**:
   - **Último sermón** (**Automático**) -- Reproduce automáticamente el video agregado más recientemente.
   - Sus [URL de transmisión en vivo permanentes](#setting-up-your-youtube-live-stream), enumeradas a continuación -- cada una reproduce la transmisión en vivo actual de su canal en YouTube usando su ID de canal. Una nueva se llama **Servicio en vivo actual** a menos que la renombre.
   - Debajo de ellas, cualquier sermón específico que ya haya guardado.
9. Haga clic en **Guardar** para programar su servicio, o en **Cancelar** para cerrar el formulario.

Para eliminar un servicio, edítelo, haga clic en **Eliminar** y confirme.

:::info
Su servicio se actualizará automáticamente cada semana si está configurado como recurrente. Mantiene la misma hora local cuando comienza o termina el horario de verano. Puede agregar todos los servicios que necesite. Los visitantes verán el próximo horario de servicio programado cuando visiten su página de transmisión.
:::

## Configuración de la página de transmisión {#streaming-page-settings}

Para personalizar las pestañas y los enlaces que aparecen junto a su transmisión en vivo, abra el menú Salto, expanda **Sermones** y haga clic en **Configuración**. La página **Configuración de transmisión** muestra su lista de **Pestañas de contenido**, en el orden en que las ven los espectadores. Las pestañas de enlaces externos abren su enlace en una nueva pestaña del navegador al hacer clic.

### Agregar pestañas {#adding-tabs}

1. Haga clic en el botón **Agregar** para añadir una nueva pestaña a su página de transmisión en vivo. Se abre el diálogo **Crear nueva pestaña**.
2. Escriba el nombre de la pestaña en el cuadro **Texto de la pestaña** y elija un **Icono** haciendo clic en el botón de icono.
3. Elija un **Tipo de enlace**: **URL externa** para un enlace personalizado (la opción predeterminada), o una de las pestañas integradas de **Chat** u **Oración**.
4. Para una pestaña de URL externa, escriba la dirección en el cuadro **URL externa**. Las pestañas de Chat y de Oración no necesitan nada más.
5. Haga clic en **Guardar pestaña**. Las nuevas pestañas se agregan al final de la lista.

Sus pestañas configuradas aparecerán en la página de transmisión en vivo para que los espectadores accedan a recursos adicionales y funciones interactivas.

### Editar, reordenar y eliminar pestañas {#editing-reordering-and-deleting-tabs}

Pase el cursor sobre una pestaña y use sus botones:

- Flechas **Subir** y **Bajar** -- Cambian el orden de las pestañas.
- **Editar** (lápiz) -- Cambie el texto, el icono, el tipo o la URL de la pestaña, y luego haga clic en **Guardar pestaña**. Para quitar la pestaña, haga clic en **Eliminar** y confirme en el diálogo **Eliminar pestaña**.

### Previsualizar su transmisión {#previewing-your-stream}

En la página **Horarios de transmisión en vivo**, haga clic en **Ver su transmisión** en la parte superior de la página para ver exactamente cómo se verá su página de transmisión en vivo para los visitantes, incluidos su logotipo, los horarios de servicio y las pestañas configuradas.

## Configurar su transmisión en vivo de YouTube {#setting-up-your-youtube-live-stream}

Para conectar su canal de YouTube para la transmisión en vivo automática:

1. Vaya a **Sermones** y haga clic en **Agregar sermón**, y luego seleccione **Agregar URL de transmisión en vivo permanente**. Se abre el formulario **Editar URL de transmisión en vivo permanente**.
2. El **Proveedor de video** tiene como predeterminado **Transmisión en vivo actual de YouTube**. Escriba su **ID del canal de YouTube** (no la URL de su canal; haga clic en **Obtener el ID de su canal** para obtener ayuda).
3. El título comienza como **Servicio en vivo actual**. Cámbielo si lo desea, agregue una descripción y luego haga clic en **Guardar**. Las URL de transmisión en vivo permanentes no tienen lista de reproducción ni fecha de publicación.
4. En **Horarios de transmisión en vivo**, cree un servicio y seleccione su URL de transmisión en vivo permanente en el menú desplegable **Sermón**.

:::tip
Para encontrar el ID de su canal de YouTube, vaya a la configuración avanzada de su canal de YouTube y copie el valor del ID del canal.
:::

## Personalizar colores y logotipo {#customizing-colors-and-logo}

Su página de transmisión en vivo usa la configuración de [Apariencia](../website/appearance.md) de su sitio web:

- El **color de acento claro** con texto oscuro se usa para el encabezado.
- El **color de acento oscuro** con texto claro se usa para la barra lateral.
- Su **Logotipo para fondo claro** aparece en la página de transmisión. Use una imagen con fondo transparente y una relación de aspecto de 4:1.

Para cambiar estos elementos, vaya a **Sitio web** y luego a **Apariencia**, y actualice su [Paleta de colores](../website/appearance.md#color-palette) y la configuración del [Logotipo](../website/appearance.md#logo-and-branding).

## Agregar anfitriones de transmisión {#adding-streaming-hosts}

Para dar acceso a los miembros del equipo al chat exclusivo para anfitriones junto con el chat público:

1. En el menú Salto, elija **Configuración > Roles**.
2. Haga clic en **Agregar rol** y seleccione **Agregar rol personalizado**.
3. Nombre el rol "Anfitrión de transmisión" y haga clic en **Guardar**.
4. Haga clic en el nuevo rol, luego busque personas en su lista de miembros y agréguelas (consulte [Agregar usuarios a un rol](../settings/roles-permissions.md#adding-users-to-a-role)).
5. Desplácese hasta **Editar permisos**, expanda la sección **Contenido** y marque **Chat de anfitriones**.

Cuando los anfitriones inicien sesión en la página de transmisión en vivo, aparecerá una pestaña privada de **Chat de anfitriones** junto al chat público, para conversaciones solo del personal durante la transmisión.

:::info
Para más detalles sobre la creación de roles y la administración de permisos, consulte [Roles y permisos](../settings/roles-permissions.md).
:::

## Solución de problemas {#troubleshooting}

Si su transmisión automatizada de YouTube no se muestra correctamente al usar la opción "Transmisión en vivo actual de YouTube" con su ID de canal, pruebe lo siguiente:

**Síntomas:**
- La incrustación de la transmisión muestra "Video no disponible"
- La página carga pero no aparece ningún video
- Las incrustaciones directas de YouTube funcionan, pero la transmisión automatizada del canal no

**Solución:**
Revise su canal de YouTube en busca de transmisiones en vivo antiguas o programadas próximas, y elimínelas:

1. Vaya a su YouTube Studio.
2. Navegue a **Contenido** y luego a **En vivo**.
3. Busque transmisiones en vivo programadas antiguas o transmisiones programadas próximas.
4. Elimine estas entradas de transmisiones en vivo antiguas o programadas.
5. Pruebe de nuevo su página de transmisión en vivo.

:::warning
La incrustación automatizada de la transmisión en vivo del canal de YouTube puede bloquearse cuando hay varias entradas de transmisiones en vivo programadas o pasadas en su canal. Eliminarlas permite que YouTube identifique y sirva correctamente su transmisión en vivo actual.
:::

**Requisitos adicionales:**
- Su transmisión en vivo debe estar configurada como **Pública** (no como No listada ni Privada).
- La incrustación debe estar permitida en la configuración de transmisión de YouTube.
- Asegúrese de usar el proveedor **Transmisión en vivo actual de YouTube** (con ID de canal), y no el proveedor **YouTube** (con ID de video).

## Próximos pasos {#next-steps}

- [Administrar sermones](./managing-sermons.md) -- Agregue sermones a su biblioteca
- [Listas de reproducción](./playlists.md) -- Organice los sermones en series
