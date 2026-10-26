---
title: "Recordatorios de eventos"
---

# Recordatorios de eventos

<div class="article-intro">

Los recordatorios de eventos notifican automáticamente a las personas indicadas antes de que un evento ocurra; por ejemplo, "¡No se lo pierda! El taller de salud comienza mañana a las 9:00 a. m.". Usted configura un recordatorio una vez en el evento, y B1 lo envía a tiempo mediante notificaciones push, correo electrónico y, si su iglesia tiene mensajes de texto configurados, mensajes de texto. Los miembros pueden controlar qué recordatorios reciben desde sus propias [Preferencias de notificación](../../b1-church/getting-started/notification-preferences).

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Cree el evento del que desea recordar a las personas (consulte [Creación de calendarios](creating-calendars))
- Para llegar a los asistentes registrados, [habilite el registro](creating-calendars) en el evento
- Para llegar a todo un grupo, asegúrese de que el evento pertenezca a un [grupo](../groups/creating-groups) con miembros

</div>

## Configuración de un recordatorio

Configure los recordatorios en la sección **Recordatorios** del evento.

- Cuando **cree un evento nuevo**, expanda la sección **Recordatorios** en el editor de eventos antes de guardar.
- Para un **evento existente**, abra la página **Detalles del registro** del evento (desde la sección **Registros**) para agregar o cambiar su recordatorio.

1. Active **Habilitar recordatorios**.
2. Elija **Cuándo** enviar. Seleccione hasta tres momentos: **7 días antes**, **3 días antes**, **1 día antes** y **El mismo día**.
3. Configure la **Hora del día** en que debe salir el recordatorio (el predeterminado es **9:00 a. m.**, en la [zona horaria](../settings/church-settings.md#time-zone) de su iglesia).
4. Elija **Quién** debe recibir el recordatorio (consulte [Quién recibe el recordatorio](#who-gets-reminded) más abajo).
5. Opcionalmente, agregue un **Mensaje**. Déjelo en blanco para usar el texto predeterminado, o escriba el suyo; puede incluir `{{eventTitle}}` y se reemplazará por el nombre del evento.
6. Elija los **Canales**: notificación **Push**, **Correo electrónico** y, si su iglesia tiene un [proveedor de mensajes de texto](../settings/church-settings.md#texting) conectado, **Texto**.
7. Guarde el evento.

A medida que hace cambios, una **vista previa en vivo** muestra aproximadamente cuántas personas recibirán el recordatorio, cuántos asistentes no pueden ser contactados y los próximos horarios de envío programados, para que pueda confirmar que el recordatorio es correcto antes de guardar.

## Quién recibe el recordatorio

La configuración **Quién** determina a quién llega el recordatorio:

- **Solo inscritos**: todas las personas inscritas en el evento que están vinculadas a un registro de persona. Es la opción predeterminada cuando el evento tiene el registro habilitado, para que un recordatorio de un evento pequeño con inscripción nunca llegue por accidente a todo un grupo.
- **Titulares / solo inscritos**: un recordatorio por inscripción (la persona que se inscribió), en lugar de a cada miembro de la familia incluido en la inscripción.
- **Miembros del grupo**: todas las personas del grupo del evento. Es la opción predeterminada cuando el evento no usa inscripción.
- **Automático**: usa los inscritos cuando el registro está habilitado; de lo contrario, usa el grupo.

:::info
Los invitados agregados solo por nombre (sin un registro de persona vinculado) no pueden recibir un recordatorio, porque no hay cuenta, dispositivo ni correo electrónico al que enviarlo. La vista previa le indica cuántos asistentes entran en este grupo para que no haya sorpresas. Los miembros que han optado por no recibir comunicaciones también se omiten.
:::

## Cuándo se envían los recordatorios

- Los recordatorios se envían a la **hora del día que elija**, en la hora local de su iglesia, en cada uno de los momentos seleccionados.
- Si **cambia la fecha u hora del evento**, los recordatorios pendientes se reprograman automáticamente; no necesita editar el recordatorio.
- Si **elimina el evento** (o cancela una sola ocurrencia de un evento recurrente), sus recordatorios pendientes se cancelan automáticamente.
- Los eventos recurrentes se manejan automáticamente: cada ocurrencia próxima recibe su propio recordatorio.

:::tip
Los recordatorios se envían **primero por push, con el correo electrónico como respaldo**. Si un miembro tiene activadas las notificaciones push, recibirá una notificación push; si no, recibirá un correo electrónico. Los miembros eligen qué canales desean para cada tipo de notificación en sus [Preferencias de notificación](../../b1-church/getting-started/notification-preferences).
:::

## Recordatorios por mensaje de texto

El canal **Texto** solo aparece cuando su iglesia tiene un proveedor de mensajes de texto conectado. Los textos se envían a través del proveedor de mensajes de su iglesia, y cada mensaje puede tener un costo para su iglesia. Se envían además de cualquier recordatorio push o por correo electrónico, y solo a las personas que:

- Activaron **Mensajes de texto** en sus [Preferencias de notificación](../../b1-church/getting-started/notification-preferences), y
- Tienen un número de celular en su perfil.

Cada mensaje comienza con el nombre de su iglesia, se mantiene en un solo mensaje de texto y termina con "Responda STOP para darse de baja." Quien responda STOP deja de recibir mensajes de texto de su iglesia. Para que las respuestas STOP lleguen a B1, pegue la **URL del webhook de STOP entrante** de su [configuración de mensajes de texto](../settings/church-settings.md#texting) en el webhook de mensajes entrantes de su proveedor.

## Lo que los miembros pueden controlar

Los recordatorios siempre respetan las [Preferencias de notificación](../../b1-church/getting-started/notification-preferences) de cada miembro. Un miembro puede:

- Desactivar los **Recordatorios de eventos** para push, correo electrónico o texto, manteniendo activadas otras notificaciones.
- Activar o desactivar los recordatorios por texto con **Mensajes de texto**.
- Configurar **horas de silencio** para que las notificaciones no urgentes esperen hasta un horario razonable.

No se puede anular la decisión de un miembro de darse de baja de los recordatorios de eventos. Esto mantiene a B1 en cumplimiento con las normas contra el spam y deja a los miembros en control de su bandeja de entrada.

## Recordatorios de servicio

Los voluntarios programados en un plan reciben un **recordatorio de servicio** por separado con los detalles del plan y, cuando aún no han respondido, botones de **Aceptar / Rechazar** directamente en el correo electrónico. Estos recordatorios se configuran en el tipo de plan y no en un evento del calendario, y también pueden enviarse por texto. Consulte [Recordatorios para voluntarios](../serving/plans#volunteer-reminders) y [Voluntarios del domingo](../guides/sunday-volunteers) para ver cómo funcionan la programación de voluntarios y sus recordatorios.

## Siguientes pasos

- [Preferencias de notificación](../../b1-church/getting-started/notification-preferences): lo que los miembros pueden controlar
- [Guía de registro de eventos](../guides/event-registration): configure el registro para que los recordatorios puedan llegar a los asistentes
- [Creación de calendarios](creating-calendars): regrese a la configuración del calendario
