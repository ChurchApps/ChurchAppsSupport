---
title: "Notificaciones push"
description: "Envíe o programe notificaciones push a todos los que usan la app de su iglesia o a un grupo desde B1 Admin, y luego edítelas, envíelas, cancélelas o elimínelas de la lista."
---

# Notificaciones push

<div class="article-intro">

La página **Push Notifications**, en **Mobile**, le permite enviar una notificación push a todos los que usan la app de su iglesia, o a los miembros de un grupo, de inmediato o en el momento que elija. Muestra lo que está programado, para que pueda editar, enviar o cancelar una notificación antes de que salga, y un historial de las notificaciones recientes que puede limpiar.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Para enviar a **Everyone with the app** necesita permiso para editar contenido. Para enviar a un grupo necesita permiso para editar miembros de grupos. Consulte [Roles y permisos](./roles-permissions.md).
- Los miembros solo reciben pushes después de [instalar la app de su iglesia](../../b1-church/getting-started/installing-pwa.md) y permitir las notificaciones.

</div>

## Abrir la página

En B1 Admin, vaya a **Mobile** y haga clic en **Push Notifications**. La página tiene una tarjeta **Scheduled** y otra **Recent**. Las horas de la página se muestran en la zona horaria de su iglesia (o en la de su computadora, si la iglesia no tiene una configurada), que aparece indicada encima de la lista Scheduled.

## Enviar o programar una notificación

1. Haga clic en **Send Notification**.
2. Elija la **Audience**: **Everyone with the app**, o uno de sus grupos. Solo ve las opciones que permiten sus permisos.
3. B1 indica cuántas personas alcanzará el push, por ejemplo, *42 of 60 people using the app have push enabled*, y cuántas tienen el push desactivado. Usted queda excluido de su propio push.
4. En **When**, elija **Send now**, o **Schedule for later** y seleccione una fecha y hora futuras en **Send at**.
5. Escriba un **Title** (de hasta 80 caracteres) y un **Message** (de hasta 240 caracteres).
6. Opcionalmente, agregue una **Open link or flyer URL** (una dirección `https` o una ruta de la app, como `/mobile/groups`) que abrirá el push, y una **Image URL** (una dirección `https`) para mostrarla con él.
7. Haga clic en **Send Notification** (o en **Schedule Notification**).

En un push programado, las personas a las que llega se comprueban de nuevo cuando sale, así que cualquiera que se una al grupo o active las notificaciones mientras tanto queda incluido.

También puede enviar a un grupo desde la propia página del grupo con **Notify**. Consulte [Enviar notificaciones push a los miembros del grupo](../groups/group-members.md#sending-push-notifications-to-group-members).

:::tip
Cuando un push no tiene enlace, al tocarlo se abre la lista de notificaciones de la app en el caso de un push a toda la iglesia, o la página del grupo en el caso de un push a un grupo.
:::

## Gestionar las notificaciones programadas

La tarjeta **Scheduled** muestra cada notificación pendiente de salir, con su hora de **Send at**, su **Audience**, el título y el mensaje. Para cada una puede:

- **Edit** -- cambiar la audiencia, la hora o el texto, y luego hacer clic en **Save Changes**.
- **Send now** -- enviarla de inmediato en lugar de esperar.
- **Cancel** -- impedir que se envíe. Una notificación cancelada pasa a la tarjeta Recent.

Una notificación que está saliendo en este momento muestra **Sending** y no se puede modificar.

## Notificaciones recientes

La tarjeta **Recent** enumera las notificaciones que ya salieron o se detuvieron, con un **Status** para cada una:

| Estado | Significado |
|--------|-------------|
| **Sent: X of Y** | El push salió. *Y* personas podían recibirlo, y *X* lo recibió como notificación push. |
| **Missed (the send time passed)** | La notificación llegaba más de 30 minutos tarde cuando B1 intentó enviarla, así que no se envió. |
| **Failed** | El envío falló tres veces. El error se muestra debajo del estado. |
| **Cancelled** | Alguien la canceló antes de que saliera. |

Para quitar una notificación de la lista, haga clic en **Remove** en su fila. Para vaciar la lista, haga clic en **Clear all** en la parte superior de la tarjeta; esto elimina todas las notificaciones enviadas, fallidas y canceladas que usted tiene permiso para gestionar. Ambas acciones piden confirmación y no se pueden deshacer. Quitar una notificación no la retira de las personas que ya la recibieron.

:::info
Los miembros que desactivaron **Church Announcements** en sus [preferencias de notificación](../../b1-church/getting-started/notification-preferences.md) no reciben estos pushes, tanto si se envían a todos como a un grupo.
:::

## Artículos relacionados

- [Configuración de la app móvil](./mobile-app.md)
- [Miembros del grupo](../groups/group-members.md)
- [Roles y permisos](./roles-permissions.md)
- [Preferencias de notificación](../../b1-church/getting-started/notification-preferences.md)
