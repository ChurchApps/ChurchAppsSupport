---
title: "Guía: Registre la asistencia a la iglesia"
description: "Registre la asistencia a la iglesia en B1 Admin configurando campus y horarios de servicio, registrándola manualmente o mediante el registro de entrada por autoservicio, y consultando los informes."
---

# Registre la asistencia a la iglesia

<div class="article-intro">

Configure el registro de asistencia para sus servicios y grupos: desde la configuración de campus y horarios de servicio, hasta el registro manual o mediante la aplicación de registro de entrada por autoservicio, y la consulta de tendencias en los informes. Al terminar, tendrá una visión completa de quién asiste y cuándo.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Cuenta de B1 Admin con acceso de administrador
- [Personas agregadas a su directorio](../people/adding-people.md)
- [Grupos creados](../groups/creating-groups.md) para los ministerios que desea registrar

</div>

## Paso 1: Configure campus y servicios {#step-1-configure-campuses--services}

Defina dónde y cuándo se reúne su iglesia.

Siga la guía [Configuración de asistencia](../attendance/setup.md) para:

1. En el [menú Jump](../introduction.md#getting-around-with-the-jump-menu), elija **People > Attendance** y haga clic en **Setup**
2. Agregue su campus (por ejemplo, "Campus principal") y sus servicios
3. Agregue los horarios de servicio (por ejemplo, "Domingo 9:00 a. m.", "Domingo 11:00 a. m.", "Miércoles 7:00 p. m.")

## Paso 2: Active el registro de asistencia de grupos {#step-2-enable-group-attendance-tracking}

Active el registro de asistencia para los grupos que desea supervisar.

Siga la guía [Creación de grupos](../groups/creating-groups.md) para:

1. Abra cada grupo que desee registrar, haga clic en **Edit** y configure **Track Attendance** en **Yes**
2. Si el grupo se reúne durante un servicio, elija la hora en **Add Service Time** y haga clic en el botón de más para que la asistencia se registre en el servicio correcto, luego haga clic en **Save**

:::info
No todos los grupos necesitan registro de asistencia. Actívelo para los grupos en los que desee supervisar la participación: clases infantiles, grupos pequeños, escuela dominical, etc.
:::

## Paso 3: Registre la asistencia manualmente {#step-3-record-attendance-manually}

Marque quiénes asistieron a cada servicio y grupo.

Siga la guía [Registro de asistencia](../attendance/recording-attendance.md) para:

1. Abra un grupo, haga clic en **All sessions** en su sección **Sessions**, haga clic en **New** y elija el **Service Time** y la **Session Date**. Marque **Also add for the other _N_ groups in _service time_** para crear de una vez las sesiones de todas las clases en ese horario de servicio
2. Marque quiénes asistieron y haga clic en **Save Attendance**

Si solo necesita un total en lugar de nombres (por ejemplo, para el servicio principal), haga clic en **Enter headcount** en la página **Attendance** en su lugar; consulte [Ingreso de conteo total](../attendance/headcount-entry.md).

:::tip
El registro manual funciona muy bien para los servicios de adultos, los grupos pequeños y cualquier situación en la que un quiosco de registro de entrada no sea práctico.
:::

## Paso 4: Configure el registro de entrada por autoservicio (opcional) {#step-4-set-up-self-check-in-optional}

Permita que los miembros se registren por sí mismos usando un quiosco con tableta.

Siga la guía [Registro de entrada](../attendance/check-in.md) para:

1. Instale la aplicación B1 Checkin en una tableta para el registro de entrada por autoservicio
2. Los miembros buscan su nombre y se registran ellos mismos y a su familia
3. Los registros de asistencia del registro de entrada aparecen junto con los registros ingresados manualmente, sin ninguna diferencia en los datos

:::info
Para una configuración completa del ministerio infantil, incluidos el hardware y la configuración de la impresora, consulte la [Guía de registro de entrada infantil](./childrens-checkin.md).
:::

## Paso 5: Consulte los informes de asistencia {#step-5-view-attendance-reports}

Obtenga una visión general de la participación en toda su iglesia.

Siga la guía [Informes de asistencia](../reports/attendance-reports.md). En la página **Attendance**, haga clic en **All years** para encontrar estos informes como pestañas:

1. **Attendance Trend**: vea la asistencia a lo largo del tiempo para detectar crecimiento o descenso
2. **Headcount Trend**: grafique los totales de conteo que ingresó manualmente
3. **Group Attendance**: vea quiénes asistieron a cada sesión de grupo en un rango de fechas, con una descarga en CSV

Para un conteo día por día de un grupo, abra el informe **Daily Group Attendance** en **admin.b1.church/reports/dailyGroupAttendance**.

:::info
Los informes de asistencia combinan la asistencia registrada manualmente y la del registro de entrada por autoservicio. Los datos se muestran de la misma forma; ambos métodos alimentan los mismos informes.
:::

## ¡Listo! {#youre-done}

Su registro de asistencia está configurado. Ya sea que registre la asistencia manualmente, use la aplicación de registro de entrada o ambas, todos los datos alimentan los mismos informes para que tenga una visión clara de la participación en toda su iglesia.

## Artículos relacionados {#related-articles}

- [Configuración de asistencia](../attendance/setup.md): configure campus y servicios
- [Ingreso de conteo total](../attendance/headcount-entry.md): registre totales sin nombres
- [Registro de asistencia](../attendance/recording-attendance.md): registre la asistencia manualmente
- [Seguimiento de asistencia](../attendance/tracking-attendance.md): revise las tendencias de asistencia
- [Registro de entrada](../attendance/check-in.md): aplicación de registro de entrada por autoservicio
- [Creación de grupos](../groups/creating-groups.md): configure grupos con registro de asistencia
- [Informes de asistencia](../reports/attendance-reports.md): consulte las tendencias de asistencia
- [Guía de registro de entrada infantil](./childrens-checkin.md): configuración completa del registro de entrada del ministerio infantil
