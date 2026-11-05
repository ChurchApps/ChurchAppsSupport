---
title: "Notificaciones push"
---

# Notificaciones push

<div class="article-intro">

La página **Notificaciones push** le permite enviar una notificación push a todas las personas que usan la aplicación de B1.church de su iglesia, o a un solo grupo, de inmediato o en un horario que usted programe. También muestra las notificaciones pendientes de envío, para que pueda editarlas, enviarlas o cancelarlas, y muestra cómo se entregaron las recientes.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Para enviar a **Todos con la aplicación**, necesita el permiso **Editar contenido**. Para enviar a un grupo, necesita **Editar miembros del grupo**. Con cualquiera de los dos, la página **Notificaciones push** aparece en **Móvil**. Consulte [Roles y permisos](./roles-permissions.md).
- Las notificaciones solo llegan a los miembros que hayan instalado la [aplicación de B1.church](/docs/b1-church/getting-started/installing-pwa) y permitido las notificaciones.

</div>

## Abrir la página

1. En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda) y expanda **Móvil**.
2. Haga clic en **Notificaciones push** (`/mobile/notifications`).

Todas las horas de la página se muestran en la zona horaria de su iglesia (o en la de su navegador, si la iglesia no tiene una configurada). La página indica cuál está usando, por ejemplo *"Las horas están en America/Chicago."*

## Enviar o programar una notificación

1. Haga clic en **Enviar notificación** en la parte superior de la página.
2. En **Audiencia**, elija **Todos con la aplicación** o uno de sus grupos.
3. Complete la notificación:
   - **Título** *(obligatorio)*: un resumen breve, de hasta 80 caracteres.
   - **Mensaje** *(obligatorio)*: el cuerpo de la notificación, de hasta 240 caracteres.
   - **Enlace de apertura o URL del volante** *(opcional)*: una ruta relativa de la aplicación (por ejemplo, `/mobile/groups`) o una URL completa `https://` que se abre al tocar la notificación. Sin enlace, una notificación para toda la iglesia abre la lista de notificaciones del miembro, y una notificación de grupo abre ese grupo.
   - **URL de la imagen** *(opcional)*: una imagen `https://` que se muestra con la notificación en los dispositivos compatibles.
4. En **Cuándo**, elija **Enviar ahora**, o **Programar para más tarde** y seleccione una fecha y hora en **Enviar a las**. La hora debe estar en el futuro.
5. Haga clic en **Enviar notificación** (o en **Programar notificación** para una notificación programada).

Una vista previa en el cuadro de diálogo muestra cómo se verá la notificación y cuántas personas pueden recibirla. Una notificación enviada ahora necesita al menos una persona alcanzable. Una notificación programada puede guardarse aunque todavía no haya nadie alcanzable, porque los destinatarios se revisan de nuevo cuando se envía.

Después de programarla, el cuadro de diálogo confirma la hora de envío y le recuerda que puede ver, editar o cancelar la notificación en **Móvil > Notificaciones push**.

:::tip
También puede enviar o programar una notificación a un solo grupo desde la página de ese grupo, con su botón **Notificar**. Consulte [Enviar notificaciones push a los miembros del grupo](../groups/group-members.md#sending-push-notifications-to-group-members).
:::

## Administrar notificaciones programadas

La tarjeta **Programadas** muestra las notificaciones pendientes de envío, con su hora de **Enviar a las**, su **Audiencia** y el texto de la **Notificación**. Cada una tiene tres acciones:

- **Editar**: cambie el título, el mensaje, el enlace, la imagen o la hora de envío. La audiencia no puede cambiarse; en ese caso, cancele la notificación y cree una nueva.
- **Enviar ahora**: envíela de inmediato en lugar de esperar. Confirme con **Enviar ahora**.
- **Cancelar**: impida que se envíe. Confirme con **Cancelar notificación**.

Cuando no hay nada pendiente, la tarjeta dice *"No hay nada programado."*

## Revisar notificaciones recientes

La tarjeta **Recientes** muestra las notificaciones que ya se enviaron o se detuvieron, con su hora de **Enviada el**, su **Audiencia**, el texto de la **Notificación** y su **Estado**:

- **Enviada: X de Y**: cuántas personas de la audiencia alcanzó.
- **Fallida**: el envío falló, con el error. B1 intenta un envío fallido hasta tres veces antes de marcarlo como fallido.
- **Cancelada**: alguien la canceló antes de que se enviara.
- **Perdida (pasó la hora de envío)**: no pudo enviarse dentro de los 30 minutos posteriores a su hora de envío, así que se omitió en lugar de enviarse tarde.

## Quién recibe una notificación

- **Todos con la aplicación** llega a cada persona de su iglesia que haya instalado la aplicación de B1.church con las notificaciones permitidas, excepto la persona que la envió.
- Una notificación de grupo llega a los miembros del grupo que tienen la aplicación con las notificaciones permitidas.
- Los miembros que desactivaron las notificaciones push de **Anuncios de la iglesia** en sus [Preferencias de notificación](/docs/b1-church/getting-started/notification-preferences) no reciben notificaciones para toda la iglesia.

## Artículos relacionados

- [Enviar notificaciones push a los miembros del grupo](../groups/group-members.md#sending-push-notifications-to-group-members)
- [Configuración de la aplicación móvil](./mobile-app.md)
- [Recordatorios de eventos](../calendars/event-reminders.md)
- [Preferencias de notificación](/docs/b1-church/getting-started/notification-preferences)
