---
title: "Seleccionar un servicio"
---

# Seleccionar un servicio

<div class="article-intro">

El primer paso de cada registro de entrada es elegir a qué servicio asiste. La pantalla de servicios aparece justo después de que la aplicación termina de cargarse y determina qué horarios de servicio y grupos están disponibles para el resto del flujo de registro.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- [Inicie sesión](../getting-started/logging-in) en la aplicación B1 Church Checkin y seleccione su iglesia
- Asegúrese de que el administrador de su iglesia haya [configurado los servicios y los horarios de servicio](../../b1-admin/attendance/setup.md) en B1 Admin

</div>

## Cómo funciona

1. Después de iniciar sesión (o después del inicio de sesión automático en visitas posteriores), la aplicación muestra la **pantalla de servicios**.
2. Verá una lista de todos los servicios configurados para su iglesia. Cada servicio aparece como una tarjeta con el nombre del servicio (por ejemplo, "Domingo por la mañana" o "Miércoles por la noche").
3. Toque el servicio al que asiste.

La aplicación carga los horarios de servicio y los grupos asociados a ese servicio, y luego lo lleva a la [pantalla de búsqueda de miembros](./looking-up-members).

## Cuando el registro de entrada no está abierto

Si su administrador asignó a un horario de servicio un [calendario de registro](../../b1-admin/attendance/setup#setting-a-check-in-schedule), la aplicación solo permite a las familias elegir ese horario de servicio mientras su ventana de registro esté abierta. Los horarios de servicio cuya ventana está cerrada en este momento siguen apareciendo en la [pantalla del hogar](./household-review), pero se marcan como **Cerrado** (por ejemplo, **Cerrado · abre dom 9:30 AM**) en lugar de ofrecer un botón de grupo.

Si todos los horarios de servicio del servicio que tocó están cerrados, la aplicación le indica cuándo abre el registro; por ejemplo, **"El registro para este servicio abre dom 9:30 AM."** (Si no se puede mostrar una hora de apertura, dice **"El registro no está abierto para este servicio en este momento."**) Toque **Atrás** para volver a la lista de servicios y elegir otro servicio, o espere hasta que la ventana se abra e intente de nuevo.

:::info
Las ventanas de registro siguen la zona horaria de la sede del servicio. Si esa sede no tiene una zona horaria configurada, se usa la zona horaria de su iglesia. Si un horario de servicio parece abrir a una hora incorrecta, pida a su administrador que revise la zona horaria en la configuración de la sede o de la iglesia. En la pantalla del hogar, el quiosco también usa el reloj de la tableta para abrir y cerrar los horarios de servicio, así que asegúrese de que la tableta tenga la hora y la zona horaria correctas.
:::

:::info
Los servicios los configura el administrador de su iglesia en B1 Admin, en la sección de Asistencia. Si no ve el servicio que espera, pida a su administrador que verifique que se haya creado en la [configuración de asistencia](../../b1-admin/attendance/setup.md).
:::

## Qué sucede detrás de escena

Cuando selecciona un servicio, la aplicación obtiene tres cosas del servidor:

- Los **horarios de servicio** de ese servicio (por ejemplo, un solo servicio puede tener un horario de 9:00 AM y otro de 11:00 AM).
- Los **grupos** disponibles en cada horario de servicio (por ejemplo, Guardería, Preescolar, Primaria).
- Los **vínculos entre grupos y horarios de servicio**, que determinan qué grupos están disponibles en cada horario.

Estos datos se guardan en caché local para que el resto del proceso de registro sea rápido y responda sin demoras.

:::tip
Si su iglesia tiene configurado un solo servicio, aun así debe tocarlo para continuar. La aplicación no selecciona automáticamente un servicio único.
:::

## Próximo paso

Después de seleccionar un servicio, [buscará a su familia](./looking-up-members) por número de teléfono o por nombre.
