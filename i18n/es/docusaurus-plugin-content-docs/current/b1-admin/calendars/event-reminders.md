---
title: "Recordatorios de eventos"
description: "Configure recordatorios de eventos en B1 Admin por notificación push, correo electrónico y texto, eligiendo el momento, los destinatarios y un mensaje personalizado para que las personas reciban el aviso a tiempo."
---

# Recordatorios de eventos

<div class="article-intro">

Los recordatorios de eventos avisan automáticamente a las personas adecuadas antes de que ocurra un evento, por ejemplo: "¡No se lo pierda! El taller de salud comienza mañana a las 9:00 AM." Configura un recordatorio una sola vez en el evento, y B1 lo envía en el momento programado mediante notificaciones push, correo electrónico y, si su iglesia tiene configurado el envío de mensajes de texto, SMS. Los miembros pueden controlar qué recordatorios reciben desde sus propias [Preferencias de notificación](../../b1-church/getting-started/notification-preferences.md).

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Cree el evento del que desea recordar a las personas (consulte [Creación de calendarios](./creating-calendars.md))
- Para llegar a los asistentes registrados, [habilite el registro](./creating-calendars.md) en el evento
- Para llegar a todo un grupo, asegúrese de que el evento pertenezca a un [grupo](../groups/creating-groups.md) con miembros

</div>

## Configurar un recordatorio {#setting-up-a-reminder}

Configura los recordatorios en la sección **Recordatorios** del evento. Expándala para ver la configuración.

- Al **crear un evento nuevo**, expanda la sección **Recordatorios** al final del editor **Nuevo evento**; el recordatorio se guarda al guardar el evento.
- Para un **evento existente**, use la sección **Recordatorios** en cualquiera de estos lugares y haga clic en el botón **Guardar** dentro de la sección: el cuadro de diálogo que se abre al hacer clic en el evento en un calendario, el editor **Editar evento**, o la página de registro del evento (**Calendarios > Registros**, y luego el evento).

1. Active **Habilitar recordatorios**.
2. Elija **Cuándo (hasta 3)** para enviar: **7 días antes**, **3 días antes**, **1 día antes** y **El mismo día**. Una vez elegidos tres, las demás opciones se desactivan hasta que desmarque una.
3. Establezca la **Hora del día** en que debe enviarse el recordatorio (el valor predeterminado es **9:00 AM**, en la [zona horaria](../settings/church-settings.md#time-zone) de su iglesia).
4. Elija **A quién** se debe recordar (consulte [A quién se recuerda](#who-gets-reminded) más abajo).
5. Opcionalmente, añada un **Mensaje (opcional)**. Déjelo en blanco para usar el texto predeterminado, o escriba el suyo; puede incluir `{{eventTitle}}` y se reemplazará por el nombre del evento.
6. Elija los **Canales**: **Push** (notificación) y **Correo electrónico** (ambos activados por defecto), y, si su iglesia tiene conectado un [proveedor de mensajes de texto](../settings/church-settings.md#texting), **Texto**.
7. Haga clic en **Guardar** (o guarde el nuevo evento).

Para detener los recordatorios de un evento, desactive **Habilitar recordatorios** y guarde.

En un evento que ya está guardado, una **vista previa en vivo** muestra aproximadamente cuántas personas recibirán el recordatorio, cuántos asistentes no se pueden contactar y los próximos envíos programados a medida que realiza cambios, para que pueda confirmar que el recordatorio se ve bien antes de guardar. Un evento recién creado no tiene vista previa hasta que se haya guardado.

## A quién se recuerda {#who-gets-reminded}

La configuración **A quién** controla a quién se envía el recordatorio:

- **Solo registrados**: todas las personas inscritas en el evento que estén vinculadas a un registro de persona. Es la opción predeterminada cuando el evento tiene el registro habilitado, para que un recordatorio de un evento pequeño con inscripción nunca llegue por error a todo un grupo.
- **Titulares / solo registrados**: un recordatorio por cada registro (la persona que se inscribió), en lugar de a cada miembro de la familia incluido en el registro.
- **Miembros del grupo**: todas las personas del grupo del evento. Es la opción predeterminada cuando el evento no usa registro.
- **Automático**: usa los registrados cuando el registro está habilitado; de lo contrario, usa el grupo.

:::info
Los invitados añadidos solo por nombre (sin un registro de persona vinculado) no pueden recibir un recordatorio, porque no hay cuenta, dispositivo ni correo electrónico al que enviarlo. La vista previa le indica cuántos asistentes entran en este grupo para que no haya sorpresas. Los miembros que han optado por no recibir comunicaciones también se omiten.
:::

## Cuándo se envían los recordatorios {#when-reminders-are-sent}

- Los recordatorios se envían a la **hora del día que elija**, en la zona horaria local de su iglesia, en cada uno de los desfases que seleccionó.
- Si **cambia la fecha u hora del evento**, los recordatorios pendientes se reprograman automáticamente; no necesita editar el recordatorio.
- Si **elimina el evento** (o cancela una sola ocurrencia de un evento recurrente), sus recordatorios pendientes se cancelan automáticamente.
- Los eventos recurrentes se gestionan automáticamente: cada próxima ocurrencia recibe su propio recordatorio.

:::tip
Los recordatorios se envían **primero por push, con el correo electrónico como respaldo**. Si un miembro tiene activadas las notificaciones push, recibirá una push; si no, recibirá un correo electrónico. Los miembros eligen qué canales quieren por tipo de notificación en sus [Preferencias de notificación](../../b1-church/getting-started/notification-preferences.md).
:::

## Recordatorios por texto {#text-reminders}

El canal **Texto** solo aparece cuando su iglesia tiene conectado un proveedor de mensajes de texto. Los mensajes se envían a través del proveedor de mensajes de texto de su iglesia, y cada mensaje puede tener un costo para la iglesia. Se envían además de cualquier recordatorio push o por correo electrónico, y solo a las personas que:

- Activaron los **Mensajes de texto** en sus [Preferencias de notificación](../../b1-church/getting-started/notification-preferences.md), y
- Tienen un número de teléfono móvil en su perfil.

El personal con permiso para enviar mensajes de texto puede activar los **Recordatorios de texto** para una persona desde su [registro](../people/adding-people.md#text-reminders), en la línea debajo de su número de teléfono móvil. Cuando hace clic en **Enviar ahora** en un recordatorio que incluye **Texto**, B1 muestra cuántas personas recibieron el recordatorio y cuántas se omitieron, por ejemplo *Enviado a 2 personas · 1 con texto, 1 omitida*.

Cada mensaje comienza con el nombre de su iglesia, se mantiene en un solo mensaje de texto y termina con "Responda STOP para darse de baja." Quien responda STOP deja de recibir mensajes de texto de su iglesia. Para que las respuestas STOP lleguen a B1, pegue la **URL del webhook de mensajes entrantes (STOP)** de su [configuración de mensajes de texto](../settings/church-settings.md#texting) en el webhook de mensajes entrantes de su proveedor.

## Lo que los miembros pueden controlar {#what-members-can-control}

Los recordatorios siempre respetan las [Preferencias de notificación](../../b1-church/getting-started/notification-preferences.md) de cada miembro. Un miembro puede:

- Desactivar los **Recordatorios de eventos** para push, correo electrónico o texto, manteniendo activas las demás notificaciones.
- Activar o desactivar los recordatorios por texto con **Mensajes de texto**.
- Configurar **horas de silencio** para que las notificaciones no urgentes esperen a un horario razonable.

No puede anular la decisión de un miembro de darse de baja de los recordatorios de eventos; esto mantiene a B1 en cumplimiento con las normas contra el spam y deja a los miembros en control de su bandeja de entrada.

## Recordatorios para el servicio {#serving-reminders}

Los voluntarios programados en un plan reciben un **recordatorio de servicio** independiente con los detalles del plan y, cuando aún no han respondido, los botones **Aceptar / Rechazar** directamente en el correo electrónico. Estos recordatorios se configuran en el tipo de plan y no en un evento del calendario, y también pueden enviarse por texto; consulte [Recordatorios para voluntarios](../serving/plans.md#volunteer-reminders) y [Voluntarios del domingo](../guides/sunday-volunteers.md) para saber cómo funcionan la programación de voluntarios y sus recordatorios.

## Próximos pasos {#next-steps}

- [Preferencias de notificación](../../b1-church/getting-started/notification-preferences.md): lo que los miembros pueden controlar
- [Guía de registro a eventos](../guides/event-registration.md): configure el registro para que los recordatorios lleguen a los asistentes
- [Creación de calendarios](./creating-calendars.md): regrese a la configuración del calendario
