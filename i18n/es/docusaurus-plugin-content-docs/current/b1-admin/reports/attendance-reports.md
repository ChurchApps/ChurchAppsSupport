---
title: "Informes de asistencia"
description: "Conozca los tres informes de asistencia de B1 Admin (Tendencia de asistencia, Asistencia por grupo y Asistencia diaria por grupo), qué muestra cada uno y los pasos para ejecutarlos y exportarlos."
---

# Informes de asistencia

<div class="article-intro">

B1 Admin ofrece tres informes de asistencia para ayudarle a entender cómo participan las personas en sus servicios y grupos. Cada informe ofrece una perspectiva distinta de sus datos de asistencia, desde las tendencias generales hasta el desglose diario.

</div>

<div class="prereqs">
<h4>Antes de empezar</h4>

- Asegúrese de que la asistencia se [registra de forma constante](../attendance/tracking-attendance.md) para sus servicios y grupos
- Asegúrese de que sus [grupos](../groups/creating-groups.md) y servicios están configurados en B1 Admin
- Necesita los [permisos](../settings/roles-permissions.md) adecuados para acceder a los informes

</div>

## Tendencia de asistencia {#attendance-trend}

El informe de Tendencia de asistencia muestra cómo cambia la asistencia a sus servicios a lo largo del tiempo.

1. Vaya directamente a **admin.b1.church/reports/attendanceTrend** en su navegador (los informes no aparecen en el menú de navegación; guardar la dirección en marcadores es la forma más sencilla de volver a ella). El mismo informe también está en la página de Asistencia: haga clic en **Todos los años** y luego elija la pestaña **Tendencia de asistencia**.
2. Opcionalmente, seleccione un **Campus**, **Servicio**, **Horario de servicio** o **Grupo** para filtrar los resultados.
3. Establezca la **Fecha de inicio** y la **Fecha de fin**. De forma predeterminada, el informe abarca el último año, desde hace un año hasta hoy, e incluye la fecha de fin completa. Haga clic en **Ejecutar informe**.
4. El informe muestra un gráfico de barras y una tabla con el total de visitas por semana. Cada semana aparece etiquetada con la fecha del domingo de esa semana, y la columna **Fechas de sesión** de la tabla enumera las fechas concretas de esa semana que tuvieron asistencia (por ejemplo, "27/9, 30/9").

Este informe resulta útil para detectar patrones como descensos estacionales, tendencias de crecimiento o el impacto de eventos especiales.

:::tip
La vista **Todos los años** de la página de Asistencia también tiene una pestaña **Tendencia de cantidad de personas** entre las otras dos, que muestra en un gráfico los totales de cantidad de personas que usted introduce manualmente (en lugar de los registros individuales) para cada semana. Tiene los mismos filtros de **Campus**, **Servicio**, **Horario de servicio** y **Grupo**.
:::

## Asistencia por grupo {#group-attendance}

El informe de Asistencia por grupo muestra quién asistió a cada sesión de grupo dentro de un intervalo de fechas.

1. Vaya directamente a **admin.b1.church/reports/groupAttendance** en su navegador, o en la página de Asistencia haga clic en **Todos los años** y elija la pestaña **Asistencia por grupo**.
2. Opcionalmente, seleccione un **Campus** y un **Servicio**.
3. Establezca la **Fecha de inicio** y la **Fecha de fin**. De forma predeterminada, el informe abarca desde el domingo anterior hasta hoy, e incluye la fecha de fin completa.
4. Haga clic en **Ejecutar informe**.

Los resultados se agrupan por fecha de sesión, luego por horario de servicio y después por grupo, con las personas que asistieron enumeradas debajo de cada grupo. Los horarios de servicio, los grupos y los nombres se ordenan alfabéticamente. Junto al nombre de cada persona, la columna **Registrado** muestra la hora en que se registró su asistencia (vacía cuando no hay hora guardada), y la columna **Estado de membresía** muestra su estado, como Miembro o Visitante. También se incluyen las sesiones de grupos que no se reúnen en un horario de servicio; aparecen sin horario de servicio.

Para descargar una hoja de cálculo, haga clic en **Opciones de descarga** y elija **Resumen**. El CSV contiene:

- Una fila por cada miembro de cada grupo que se reunió en el intervalo de fechas, ordenadas por grupo y luego por nombre.
- El nombre de la persona y el nombre del grupo en las primeras columnas.
- Una columna por cada sesión con fecha, con el nombre del servicio, el horario de servicio y la fecha (por ejemplo, "Domingo - 9:00 AM (2026-09-27)"), y cada persona marcada como **presente** o **ausente**. Una sesión sin horario de servicio se nombra solo con su fecha.

Use este informe para comparar la asistencia entre grupos e identificar qué grupos están creciendo o necesitan atención.

## Asistencia diaria por grupo {#daily-group-attendance}

El informe de Asistencia diaria por grupo (titulado **Asistencia a grupos por día**) ofrece un recuento día a día de cuántas personas asistieron a un grupo.

1. Vaya directamente a **admin.b1.church/reports/dailyGroupAttendance** en su navegador.
2. Use los menús desplegables **Campus**, **Servicio** y **Horario de servicio** para reducir la lista, y luego elija el **Grupo** que desea revisar.
3. Ejecute el informe. Muestra cada día en que se reunió el grupo, del más antiguo al más reciente, con la **Fecha** y la cantidad de **Asistentes** registrados ese día.

Este informe ofrece un detalle muy específico, útil para entender las variaciones de una semana a otra o para identificar días concretos con una asistencia inusualmente alta o baja.

:::tip
Use el informe de Tendencia de asistencia para obtener una visión general y el informe de Asistencia diaria por grupo cuando necesite profundizar en fechas específicas.
:::

## Usos prácticos {#practical-uses}

- **Planificación** -- Use las tendencias de asistencia para planificar la distribución de asientos, el personal y los recursos de los próximos servicios.
- **Alcance** -- Identifique pronto los patrones de descenso de asistencia para poder dar seguimiento a los miembros.
- **Informes para la junta** -- Incluya los datos de asistencia en sus informes periódicos de liderazgo para mostrar la salud del ministerio.
- **Evaluación de eventos** -- Compare la asistencia antes y después de eventos especiales para medir su impacto.

:::warning
Los datos de asistencia se registran mediante sus procesos de registro de grupos y servicios. Si la asistencia no se registra de forma constante, los informes no reflejarán con precisión la participación real. Consulte [Registro de asistencia](../attendance/tracking-attendance.md) para las instrucciones de configuración.
:::
