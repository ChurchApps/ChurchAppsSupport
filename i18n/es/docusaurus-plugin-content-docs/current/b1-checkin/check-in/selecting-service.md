---
title: "Seleccionar un servicio"
---

# Seleccionar un servicio

<div class="article-intro">

El primer paso de cada registro de entrada es elegir a qué servicio asiste. La pantalla de servicios aparece justo después de que la app termina de cargar y determina qué horarios de servicio y grupos están disponibles para el resto del proceso de registro.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- [Inicie sesión](../getting-started/logging-in) en la app de B1 Church Checkin y seleccione su iglesia
- Asegúrese de que el administrador de su iglesia haya [configurado los servicios y horarios de servicio](../../b1-admin/attendance/setup.md) en B1 Admin

</div>

## Cómo funciona

1. Después de iniciar sesión (o después del inicio de sesión automático en visitas posteriores), la app muestra la **pantalla de servicios**.
2. Verá una lista de todos los servicios configurados para su iglesia. Cada servicio aparece como una tarjeta con el nombre del servicio (por ejemplo, "Domingo por la mañana" o "Miércoles por la noche").
3. Toque el servicio al que asiste.

La app carga los horarios de servicio y los grupos asociados a ese servicio, y luego lo lleva a la [pantalla de búsqueda de miembros](./looking-up-members).

## Cuando el registro no está abierto {#when-check-in-isnt-open}

Si su administrador asignó a un horario de servicio un [horario de registro](../../b1-admin/attendance/setup#setting-a-check-in-schedule), la app solo ofrece ese horario mientras su ventana de registro esté abierta. Los horarios de servicio cuya ventana está cerrada en ese momento se ocultan, para que las familias no puedan elegirlos más adelante en el proceso.

Si todos los horarios de servicio del servicio que tocó están cerrados, la app muestra **"El registro no está abierto para este servicio en este momento."** Toque **Atrás** para volver a la lista de servicios y elegir otro servicio, o espere a que se abra la ventana e intente de nuevo.

:::info
Las ventanas de registro siguen la zona horaria de su iglesia. Si su iglesia no tiene una zona horaria configurada, se usa en su lugar la zona horaria de su campus. Si un horario de servicio parece abrirse a una hora incorrecta, pida a su administrador que revise la zona horaria en la configuración de su iglesia o de su campus.
:::

:::info
Los servicios los configura el administrador de su iglesia en B1 Admin, en la sección de Asistencia. Si no ve el servicio que espera, pida a su administrador que verifique que se haya creado en la [configuración de asistencia](../../b1-admin/attendance/setup.md).
:::

## Qué ocurre en segundo plano

Cuando selecciona un servicio, la app obtiene tres cosas del servidor:

- Los **horarios de servicio** de ese servicio (por ejemplo, un mismo servicio podría tener un horario de las 9:00 a. m. y otro de las 11:00 a. m.).
- Los **grupos** disponibles en cada horario de servicio (por ejemplo, Guardería, Preescolar, Primaria).
- Los **vínculos entre grupos y horarios de servicio** que determinan qué grupos están disponibles en qué horarios.

Estos datos se guardan en caché local para que el resto del proceso de registro sea rápido y responda sin demoras.

:::tip
Si su iglesia solo tiene un servicio configurado, aún debe tocarlo para continuar. La app no selecciona automáticamente un único servicio.
:::

## Próximo paso

Después de seleccionar un servicio, [buscará a su familia](./looking-up-members) por número de teléfono o nombre.
