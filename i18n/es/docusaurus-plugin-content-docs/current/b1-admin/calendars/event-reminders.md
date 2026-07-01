---
title: "Recordatorios de Evento"
---

# Recordatorios de Evento

<div class="article-intro">

Los recordatorios de evento notifican automáticamente a las personas correctas antes de que suceda un evento — por ejemplo, "¡No te lo pierdas! El taller de salud comienza mañana a las 9:00 AM." Configuras un recordatorio una sola vez en el evento, y B1 lo envía en el horario programado a través de notificaciones push y correo electrónico. Los miembros pueden controlar qué recordatorios reciben desde sus [Preferencias de Notificación](../../b1-church/getting-started/notification-preferences).

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Crea el evento para el que deseas recordarle a las personas (ver [Creando Calendarios](creating-calendars))
- Para llegar a los asistentes registrados, [habilita el registro](creating-calendars) en el evento
- Para llegar a un grupo completo, asegúrate de que el evento pertenezca a un [grupo](../groups/creating-groups) con miembros

</div>

## Configurando un Recordatorio

Configuras recordatorios en la sección **Recordatorios** del evento.

- Cuando **creas un nuevo evento**, expande la sección **Recordatorios** en el editor de eventos antes de guardar.
- Para un **evento existente**, abre la página **Detalles de Registro** del evento (desde la sección **Registros**) para agregar o cambiar su recordatorio.

1. Activa **Habilitar recordatorios**.
2. Elige **Cuándo** enviar. Elige hasta tres tiempos: **7 días antes**, **3 días antes**, **1 día antes** y **Día del evento**.
3. Establece la **Hora del día** en que debe enviarse el recordatorio (el valor predeterminado es **9:00 AM**, en la zona horaria local de tu iglesia).
4. Elige **A quién** recordarle (ver [Quién Recibe Recordatorios](#who-gets-reminded) a continuación).
5. Opcionalmente agrega un **Mensaje**. Déjalo en blanco para usar el texto predeterminado, o escribe el tuyo propio — puedes incluir `{{eventTitle}}` y se reemplazará con el nombre del evento.
6. Elige los **Canales**: notificación **Push**, **Correo Electrónico**, o ambos.
7. Guarda el evento.

A medida que haces cambios, una **vista previa en vivo** muestra aproximadamente cuántas personas serán recordadas, cuántos asistentes no se pueden alcanzar y los próximos horarios de envío programados — para que puedas confirmar que el recordatorio se ve bien antes de guardar.

## Quién Recibe Recordatorios

La configuración **A quién** controla a quién va el recordatorio:

- **Solo registrados** — Todos registrados para el evento que están vinculados a un registro de persona. Este es el valor predeterminado cuando el evento tiene el registro habilitado, por lo que un recordatorio para un evento pequeño registrado nunca va accidentalmente a un grupo completo.
- **Solo jefes / registrados** — Un recordatorio por registro (la persona que se registró), en lugar de cada miembro de la familia en el registro.
- **Miembros del grupo** — Todos en el grupo del evento. Este es el valor predeterminado cuando el evento no usa registro.
- **Automático** — Usa registrados cuando el registro está habilitado, de lo contrario el grupo.

:::info
Los invitados agregados solo por nombre (sin un registro de persona vinculado) no pueden recibir un recordatorio, porque no hay cuenta, dispositivo o correo electrónico para enviar. La vista previa te dice cuántos asistentes caen en este grupo para que no haya sorpresas. Los miembros que han optado por no recibir comunicaciones también se omiten.
:::

## Cuándo se Envían los Recordatorios

- Los recordatorios se envían a la **hora del día que elijas**, en la zona horaria local de tu iglesia, en cada uno de los desplazamientos que seleccionaste.
- Si **cambias la fecha u hora del evento**, los recordatorios pendientes se reprograman automáticamente — no necesitas editar el recordatorio.
- Si **eliminas el evento** (o cancelas una sola ocurrencia de un evento recurrente), sus recordatorios pendientes se cancelan automáticamente.
- Los eventos recurrentes se manejan automáticamente: cada próxima ocurrencia obtiene su propio recordatorio.

:::tip
Los recordatorios se envían **push primero, con correo electrónico como alternativa**. Si un miembro tiene notificaciones push habilitadas, recibirá un push; si no, recibirá un correo electrónico en su lugar. Los miembros eligen qué canales desean por tipo de notificación en sus [Preferencias de Notificación](../../b1-church/getting-started/notification-preferences).
:::

## Lo Que Los Miembros Pueden Controlar

Los recordatorios siempre respetan las [Preferencias de Notificación](../../b1-church/getting-started/notification-preferences) de cada miembro. Un miembro puede:

- Desactivar **Recordatorios de Evento** para push o correo electrónico mientras mantiene otras notificaciones activadas.
- Establecer **horas tranquilas** para que las notificaciones no urgentes esperen hasta una hora razonable.

No puedes anular la opción de un miembro de optar por no recibir recordatorios de eventos — esto mantiene B1 conforme con las reglas contra spam y mantiene a los miembros en control de su bandeja de entrada.

## Recordatorios de Servicio

Los voluntarios programados en un plan reciben un **recordatorio de servicio** separado con los detalles del plan y, cuando aún no han respondido, botones **Aceptar / Rechazar** directamente en el correo electrónico. Esos recordatorios se configuran en el tipo de plan en lugar de en un evento del calendario — ver [Voluntarios del Domingo](../guides/sunday-volunteers) para saber cómo funcionan la programación de voluntarios y los recordatorios.

## Próximos Pasos

- [Preferencias de Notificación](../../b1-church/getting-started/notification-preferences) — Lo que los miembros pueden controlar
- [Guía de Registro de Evento](../guides/event-registration) — Configura el registro para que los recordatorios puedan alcanzar a los asistentes
- [Creando Calendarios](creating-calendars) — Vuelve a la configuración del calendario
