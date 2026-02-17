---
title: "Transmisión en Vivo"
---

# Transmisión en Vivo

<div class="article-intro">

La página de Horarios de Transmisión en Vivo le permite configurar el horario de transmisión de su iglesia, gestionar los horarios de servicio y personalizar la experiencia del espectador. Configure servicios semanales recurrentes o eventos únicos, configure las opciones de chat y video, y controle cuándo su transmisión sale al aire.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Necesita el permiso **contentApi.streamingServices.edit**. Consulte [Roles y Permisos](../settings/roles-permissions.md) si no tiene acceso.
- Tenga listo su ID de Canal de YouTube si planea usar transmisión en vivo automatizada
- Agregue al menos un [sermón](managing-sermons) o URL permanente en vivo para usar como fuente de transmisión

</div>

La página tiene dos pestañas principales: **Servicios** para gestionar su horario de transmisión en vivo y **Configuración** para configurar su página de transmisión.

## Gestión de Servicios

### Agregar un Servicio

1. En B1 Admin, haga clic en **Sermones** en la barra lateral izquierda, luego haga clic en la pestaña **Horarios de Transmisión en Vivo**.
2. Haga clic en el botón **Agregar Servicio** para crear un nuevo servicio programado.
3. Ingrese un **Nombre del Servicio** (por ejemplo, "Culto Dominical").
4. Establezca el **Horario del Servicio** -- elija el día y la hora en que comienza su servicio.
5. Configure **Recurrencia Semanal** en **Sí** para servicios semanales regulares, o **No** para un evento único.

### Configurar Opciones de Chat y Video

6. En **Configuración de Chat**, establezca cuántos minutos antes y después del servicio debe estar habilitado el chat. Esto permite a los visitantes comenzar a chatear antes de que comience el servicio y continuar después.
7. En **Configuración de Video**, establezca con cuánta anticipación debe comenzar la transmisión de video para contenido de cuenta regresiva o previo al servicio.
8. Seleccione qué sermón reproducir del menú desplegable:
   - **Último Sermón** -- Reproduce automáticamente el video más recientemente agregado.
   - **Servicio en Vivo Actual** -- Reproduce su transmisión en vivo actual desde YouTube usando su ID de Canal.
   - También puede elegir cualquier sermón específico que ya haya guardado.
9. Haga clic en **Guardar** para programar su servicio.

:::info
Su servicio se actualizará automáticamente cada semana si está configurado como recurrente. Puede agregar tantos servicios como necesite. Los visitantes verán el próximo horario de servicio programado cuando visiten su página de transmisión.
:::

## Configuración de la Página de Transmisión

Haga clic en la pestaña **Configuración** para personalizar las pestañas y enlaces que aparecen junto a su transmisión en vivo.

### Agregar Pestañas

1. Haga clic en el botón **Agregar** para agregar una nueva pestaña a su página de transmisión en vivo.
2. Elija entre pestañas prediseñadas (**Chat** u **Oración**) o agregue una pestaña personalizada con una URL externa.
3. Para pestañas prediseñadas, simplemente asígnele un nombre en el cuadro **Texto de Pestaña** y la configuración está completa.
4. Para una pestaña con enlace, ingrese el nombre de la pestaña, elija un icono haciendo clic en el botón de icono e ingrese la URL.
5. Sus pestañas configuradas aparecerán en la página de transmisión en vivo para que los espectadores accedan a recursos adicionales y funciones interactivas.

### Vista Previa de su Transmisión

Haga clic en el botón **Ver su Transmisión** para ver exactamente cómo se verá su página de transmisión en vivo para los visitantes, incluyendo su logotipo, horarios de servicio y pestañas configuradas.

## Configurar su Transmisión en Vivo de YouTube

Para conectar su canal de YouTube para transmisión en vivo automatizada:

1. Vaya a **Sermones** y haga clic en **Agregar Sermón**, luego seleccione **Agregar URL Permanente en Vivo**.
2. El proveedor de video se establece por defecto en **Transmisión en Vivo Actual de YouTube**. Ingrese su **ID de Canal de YouTube**.
3. Agregue un título y descripción, luego haga clic en **Guardar**.
4. En **Horarios de Transmisión en Vivo**, cree un servicio y seleccione su URL permanente en vivo del menú desplegable de sermones.

:::tip
Para encontrar su ID de Canal de YouTube, vaya a la configuración avanzada de su canal de YouTube y copie el valor del ID de Canal.
:::

## Personalizar Colores y Logotipo

Su página de transmisión en vivo usa la configuración de [Apariencia](../website/appearance) de su sitio web:

- El **color de acento claro** con texto oscuro se usa para el encabezado.
- El **color de acento oscuro** con texto claro se usa para la barra lateral.
- Su **Logotipo para Fondo Claro** aparece en la página de transmisión. Use una imagen con fondo transparente y una relación de aspecto de 4:1.

Para cambiar estos, vaya a **Sitio Web** luego **Apariencia** y actualice su configuración de [Paleta de Colores](../website/appearance#paleta-de-colores) y [Logotipo](../website/appearance#logotipo-y-marca).

## Agregar Anfitriones de Transmisión

Para dar a los miembros del equipo capacidades de anfitrión (moderación de chat, respuestas a solicitudes de oración):

1. Vaya a **Configuración** en la barra lateral izquierda y haga clic en **Roles**.
2. Haga clic en el botón de más y seleccione **Agregar Rol Personalizado**.
3. Nombre el rol "Anfitrión de Transmisión" y haga clic en **Guardar**.
4. Haga clic en el nuevo rol, luego haga clic en **Agregar** en la sección de Miembros para agregar personas.
5. Desplácese hacia abajo hasta **Editar Permisos**, expanda la sección de **Contenido** y marque **Anfitrión de Chat**.

Cuando los anfitriones inicien sesión en la página de transmisión en vivo, tendrán capacidades especiales incluyendo moderación de chat y gestión de solicitudes de oración.

:::info
Para más detalles sobre la creación de roles y gestión de permisos, consulte [Roles y Permisos](../settings/roles-permissions.md).
:::

## Solución de Problemas

Si su transmisión en vivo automatizada de YouTube no se muestra correctamente al usar la opción "Transmisión en Vivo Actual de YouTube" con su ID de Canal, intente lo siguiente:

**Síntomas:**
- La inserción de la transmisión en vivo muestra "Video no disponible"
- La página carga pero no aparece ningún video
- Las inserciones directas de YouTube funcionan, pero la transmisión en vivo automatizada del canal no

**Solución:**
Verifique su canal de YouTube en busca de transmisiones en vivo antiguas o programadas y elimínelas:

1. Vaya a su YouTube Studio.
2. Navegue a **Contenido** luego **En vivo**.
3. Busque transmisiones en vivo antiguas programadas o próximas transmisiones programadas.
4. Elimine estas entradas de transmisiones en vivo antiguas o programadas.
5. Pruebe su página de transmisión en vivo nuevamente.

:::warning
La inserción automática de transmisión en vivo del canal de YouTube puede bloquearse cuando hay múltiples entradas de transmisiones en vivo programadas o pasadas en su canal. Eliminarlas permite que YouTube identifique y sirva correctamente su transmisión en vivo actual.
:::

**Requisitos adicionales:**
- Su transmisión en vivo debe estar configurada como **Pública** (no como No listada o Privada).
- La inserción debe estar permitida en la configuración de su transmisión de YouTube.
- Asegúrese de estar usando el proveedor **Transmisión en Vivo Actual de YouTube** (con ID de Canal), no el proveedor **YouTube** (con ID de Video).

## Próximos Pasos

- [Gestión de Sermones](managing-sermons) -- Agregue sermones a su biblioteca
- [Listas de Reproducción](playlists) -- Organice sermones en series
