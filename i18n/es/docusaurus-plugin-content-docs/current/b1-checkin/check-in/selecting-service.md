---
title: "Seleccionar un servicio"
---

# Seleccionar un servicio

<div class="article-intro">

El primer paso de cada registro es elegir a qué servicio asistes. La pantalla de servicios aparece justo después de que la aplicación termina de cargar y determina qué horarios de servicio y grupos están disponibles durante el resto del flujo de registro.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- [Inicia sesión](../getting-started/logging-in) en la aplicación B1 Church Checkin y selecciona tu iglesia
- Asegúrate de que el administrador de tu iglesia haya [configurado los servicios y los horarios de servicio](../../b1-admin/attendance/setup.md) en B1 Admin

</div>

## Cómo funciona

1. Después de iniciar sesión (o después del inicio de sesión automático en visitas posteriores), la aplicación muestra la **pantalla de servicios**.
2. Verás una lista de todos los servicios configurados para tu iglesia. Cada servicio aparece como una tarjeta con su nombre (por ejemplo, "Sunday Morning" o "Wednesday Evening").
3. Toca el servicio al que asistes.

La aplicación carga los horarios de servicio y los grupos asociados a ese servicio, y luego te lleva a la [pantalla de búsqueda de miembros](./looking-up-members).

## Cuando el registro no está abierto

Si tu administrador asignó a un horario de servicio un [horario de registro](../../b1-admin/attendance/setup#setting-a-check-in-schedule), la aplicación solo permite a las familias elegir ese horario mientras su ventana de registro esté abierta. Los horarios de servicio cuya ventana está cerrada en este momento siguen apareciendo en la [pantalla del hogar](./household-review), pero se marcan como **Closed** (por ejemplo, **Closed · opens Sun 9:30 AM**) en lugar de ofrecer un botón de grupo.

Si todos los horarios de servicio del servicio que tocaste están cerrados, la aplicación te indica cuándo se abre el registro; por ejemplo, **"Check-in for this service opens Sun 9:30 AM."** (Si no se puede mostrar una hora de apertura, dice **"Check-in isn't open for this service right now."**) Toca **Back** para volver a la lista de servicios y elegir otro servicio, o espera a que se abra la ventana e inténtalo de nuevo.

:::info
Las ventanas de registro siguen la zona horaria del campus del servicio. Si ese campus no tiene una zona horaria configurada, se usa la zona horaria de tu iglesia. Si un horario de servicio parece abrirse a una hora incorrecta, pide a tu administrador que revise la zona horaria en la configuración del campus o de la iglesia. En la pantalla del hogar, el quiosco también usa el reloj de la tableta para abrir y cerrar los horarios de servicio, así que asegúrate de que la tableta tenga la hora y la zona horaria correctas.
:::

:::info
Los servicios los configura el administrador de tu iglesia en B1 Admin, en la sección Attendance. Si no ves el servicio que esperas, pide a tu administrador que verifique que esté creado en la [configuración de asistencia](../../b1-admin/attendance/setup.md).
:::

## Qué ocurre en segundo plano

Cuando seleccionas un servicio, la aplicación obtiene tres cosas del servidor:

- Los **horarios de servicio** de ese servicio (por ejemplo, un mismo servicio puede tener un horario de las 9:00 AM y otro de las 11:00 AM).
- Los **grupos** disponibles en cada horario de servicio (por ejemplo, Nursery, Preschool, Elementary).
- Los **vínculos entre grupos y horarios de servicio**, que determinan qué grupos están disponibles en qué horarios.

Estos datos se guardan en caché local para que el resto del proceso de registro sea rápido y responda bien.

:::tip
Si tu iglesia solo tiene un servicio configurado, aun así debes tocarlo para continuar. La aplicación no selecciona automáticamente un único servicio.
:::

## Siguiente paso

Después de seleccionar un servicio, [buscarás a tu familia](./looking-up-members) por número de teléfono o por nombre.
