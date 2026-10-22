---
title: "Recordatorios de eventos"
---

# Recordatorios de eventos

<div class="article-intro">

Los recordatorios de eventos notifican automáticamente a las personas adecuadas antes de que un evento comience, por ejemplo: "¡No te lo pierdas! El taller de salud comienza mañana a las 9:00 a. m.". Configuras un recordatorio una sola vez en el evento, y B1 lo envía a tiempo por notificaciones push, correo electrónico y, si tu iglesia tiene configurado el envío de mensajes de texto, por SMS. Los miembros pueden controlar qué recordatorios reciben desde sus propias [Preferencias de notificación](../../b1-church/getting-started/notification-preferences).

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Crea el evento sobre el que quieres recordar a las personas (consulta [Crear calendarios](creating-calendars))
- Para llegar a los asistentes registrados, [activa el registro](creating-calendars) en el evento
- Para llegar a todo un grupo, asegúrate de que el evento pertenezca a un [grupo](../groups/creating-groups) con miembros

</div>

## Configurar un recordatorio

Configuras los recordatorios en la sección **Reminders** del evento.

- Al **crear un evento nuevo**, expande la sección **Reminders** en el editor de eventos antes de guardar.
- Para un **evento existente**, abre la página **Registration Details** del evento (desde la sección **Registrations**) para agregar o cambiar su recordatorio.

1. Activa **Enable reminders**.
2. Elige **When** enviar. Selecciona hasta tres momentos: **7 days before**, **3 days before**, **1 day before** y **Day of**.
3. Define la **Time of day** en que debe salir el recordatorio (por defecto es **9:00 AM**, en la [zona horaria](../settings/church-settings.md#time-zone) de tu iglesia).
4. Elige **Who** debe recibir el recordatorio (consulta [A quién se le envía](#who-gets-reminded) más abajo).
5. Opcionalmente, agrega un **Message**. Déjalo en blanco para usar el texto predeterminado, o escribe el tuyo; puedes incluir `{{eventTitle}}` y se reemplazará por el nombre del evento.
6. Elige los **Channels**: notificación **Push**, **Email** y, si tu iglesia tiene un [proveedor de mensajes de texto](../settings/church-settings.md#texting) conectado, **Text**.
7. Guarda el evento.

A medida que haces cambios, una **live preview** muestra aproximadamente cuántas personas recibirán el recordatorio, cuántos asistentes no se pueden contactar y los próximos horarios de envío, para que confirmes que el recordatorio se ve bien antes de guardar.

## A quién se le envía

La configuración **Who** determina a quién llega el recordatorio:

- **Registrants only**: todas las personas registradas en el evento que están vinculadas a un registro de persona. Es el valor predeterminado cuando el evento tiene el registro activado, así un recordatorio para un evento registrado pequeño nunca llega por accidente a todo un grupo.
- **Heads / registrants only**: un recordatorio por registro (la persona que se registró), en lugar de a cada miembro de la familia incluido en el registro.
- **Group members**: todas las personas del grupo del evento. Es el valor predeterminado cuando el evento no usa registro.
- **Auto**: usa los registrados cuando el registro está activado; de lo contrario, usa el grupo.

:::info
Los invitados agregados solo por nombre (sin un registro de persona vinculado) no pueden recibir un recordatorio, porque no hay cuenta, dispositivo ni correo electrónico a los que enviarlo. La vista previa te indica cuántos asistentes entran en esta situación para que no haya sorpresas. Los miembros que han optado por no recibir comunicaciones también se omiten.
:::

## Cuándo se envían los recordatorios

- Los recordatorios se envían a la **hora del día que elijas**, en la zona horaria local de tu iglesia, en cada uno de los desfases que seleccionaste.
- Si **cambias la fecha u hora del evento**, los recordatorios pendientes se reprograman automáticamente; no necesitas editar el recordatorio.
- Si **eliminas el evento** (o cancelas una sola ocurrencia de un evento recurrente), sus recordatorios pendientes se cancelan automáticamente.
- Los eventos recurrentes se gestionan solos: cada ocurrencia próxima recibe su propio recordatorio.

:::tip
Los recordatorios se envían **primero por push, con el correo electrónico como respaldo**. Si un miembro tiene activadas las notificaciones push, recibirá un push; si no, recibirá un correo electrónico. Los miembros eligen qué canales quieren para cada tipo de notificación en sus [Preferencias de notificación](../../b1-church/getting-started/notification-preferences).
:::

## Recordatorios por texto

El canal **Text** solo aparece cuando tu iglesia tiene un proveedor de mensajes de texto conectado. Los mensajes se envían a través del proveedor de tu iglesia, y cada mensaje puede generar un costo para ella. Se envían además de cualquier recordatorio push o por correo electrónico, y únicamente a las personas que:

- Activaron **Text messages** en sus [Preferencias de notificación](../../b1-church/getting-started/notification-preferences), y
- Tienen un número de teléfono móvil en su perfil.

Cada mensaje comienza con el nombre de tu iglesia, se mantiene en un solo mensaje de texto y termina con "Reply STOP to opt out." Quien responda STOP deja de recibir mensajes de texto de tu iglesia. Para que las respuestas STOP lleguen a B1, pega la **Inbound (STOP) webhook URL** de tus [configuraciones de mensajes de texto](../settings/church-settings.md#texting) en el webhook de mensajes entrantes de tu proveedor.

## Lo que los miembros pueden controlar

Los recordatorios siempre respetan las [Preferencias de notificación](../../b1-church/getting-started/notification-preferences) de cada miembro. Un miembro puede:

- Desactivar **Event Reminders** para push, correo electrónico o texto, manteniendo activadas las demás notificaciones.
- Activar o desactivar los recordatorios por texto con **Text messages**.
- Configurar **quiet hours** para que las notificaciones no urgentes esperen a una hora razonable.

No puedes anular la decisión de un miembro de darse de baja de los recordatorios de eventos. Esto mantiene a B1 en cumplimiento con las normas contra el spam y deja a los miembros en control de su bandeja de entrada.

## Recordatorios para voluntarios

Los voluntarios programados en un plan reciben un **serving reminder** aparte con los detalles del plan y, si todavía no han respondido, los botones **Accept / Decline** directamente en el correo electrónico. Estos recordatorios se configuran en el tipo de plan, no en un evento del calendario, y también pueden enviarse por texto; consulta [Recordatorios para voluntarios](../serving/plans#volunteer-reminders) y [Voluntarios del domingo](../guides/sunday-volunteers) para ver cómo funcionan la programación de voluntarios y sus recordatorios.

## Siguientes pasos

- [Preferencias de notificación](../../b1-church/getting-started/notification-preferences): lo que los miembros pueden controlar
- [Guía de registro de eventos](../guides/event-registration): configura el registro para que los recordatorios lleguen a los asistentes
- [Crear calendarios](creating-calendars): vuelve a la configuración del calendario
