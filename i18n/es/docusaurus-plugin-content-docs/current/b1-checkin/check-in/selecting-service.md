---
title: "Seleccionar un servicio"
---

# Seleccionar un servicio

<div class="article-intro">

El primer paso de cada registro es elegir a que servicio asistira. La pantalla de servicios aparece justo despues de que la aplicacion termina de cargar y determina que horarios de servicio y grupos estan disponibles para el resto del flujo de registro.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- [Inicie sesion](../getting-started/logging-in) en la aplicacion B1 Church Checkin y seleccione su iglesia
- Asegurese de que el administrador de su iglesia haya [configurado servicios y horarios de servicio](../../b1-admin/attendance/setup.md) en B1 Admin

</div>

## Como funciona

1. Despues de iniciar sesion (o despues del inicio de sesion automatico en visitas posteriores), la aplicacion muestra la **pantalla de servicios**.
2. Vera una lista de todos los servicios que se han configurado para su iglesia. Cada servicio aparece como una tarjeta que muestra el nombre del servicio (por ejemplo, "Domingo por la manana" o "Miercoles por la noche").
3. Toque el servicio al que asistira.

La aplicacion carga los horarios de servicio y los grupos asociados a ese servicio, y luego lo lleva a la [pantalla de busqueda de miembros](./looking-up-members).

:::info
Los servicios son configurados por el administrador de su iglesia en B1 Admin en la seccion de Asistencia. Si no ve el servicio que espera, pida a su administrador que verifique que se haya creado en la [configuracion de asistencia](../../b1-admin/attendance/setup.md).
:::

## Que sucede detras de escena

Cuando selecciona un servicio, la aplicacion obtiene tres elementos del servidor:

- Los **horarios de servicio** para ese servicio (por ejemplo, un solo servicio puede tener un horario de 9:00 AM y otro de 11:00 AM).
- Los **grupos** disponibles en cada horario de servicio (por ejemplo, Guarderia, Preescolar, Primaria).
- Los **vinculos entre grupos y horarios de servicio** que determinan que grupos estan disponibles en que horarios.

Estos datos se almacenan en cache localmente para que el resto del proceso de registro sea rapido y agil.

:::tip
Si su iglesia tiene solo un servicio configurado, igualmente necesita tocarlo para continuar. La aplicacion no selecciona automaticamente un unico servicio.
:::

## Siguiente paso

Despues de seleccionar un servicio, [buscara a su familia](./looking-up-members) por numero de telefono o nombre.
