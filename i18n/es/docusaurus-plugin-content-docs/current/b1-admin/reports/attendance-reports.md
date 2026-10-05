---
title: "Informes de Asistencia"
---

# Informes de Asistencia

<div class="article-intro">

B1 Admin proporciona tres informes de asistencia para ayudarte a entender cómo las personas se están involucrando con tus servicios y grupos. Cada informe ofrece una perspectiva diferente sobre tus datos de asistencia, desde tendencias de alto nivel hasta desglose diarios.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Asegúrate de que la asistencia se [rastrea consistentemente](../attendance/tracking-attendance.md) para tus servicios y grupos
- Asegúrate de que tus [grupos](../groups/creating-groups.md) y servicios estén configurados en B1 Admin
- Necesitas los [permisos](../settings/roles-permissions.md) apropiados para acceder a informes

</div>

## Tendencia de Asistencia

El informe Attendance Trend muestra cómo cambia la asistencia a lo largo del tiempo para tus servicios.

1. Ve directamente a **admin.b1.church/reports/attendanceTrend** en tu navegador (los informes no tienen entrada en el menú de navegación -- marcar la dirección es la forma más fácil de volver a ella). El mismo informe también está en la pestaña **Attendance Trend** de la página Attendance.
2. Opcionalmente, selecciona un **Campus**, **Service**, **Service Time** o **Group** para filtrar los resultados.
3. Establece la **Start Date** y **End Date**. De forma predeterminada, el informe cubre el año pasado, desde hace un año hasta hoy, y la fecha de finalización se incluye completamente. Haz clic en **Run Report**.
4. El informe muestra un gráfico de barras y tabla del total de visitas por semana. Cada semana se etiqueta con la fecha del domingo de esa semana, y la columna **Session Dates** de la tabla enumera las fechas reales en esa semana que tuvieron asistencia (por ejemplo, "9/27, 9/30").

Este informe es útil para detectar patrones como caídas estacionales, tendencias de crecimiento o el impacto de eventos especiales.

## Asistencia de Grupo

El informe Group Attendance muestra quién asistió a cada sesión de grupo en un rango de fechas.

1. Ve directamente a **admin.b1.church/reports/groupAttendance** en tu navegador, o abre la pestaña **Group Attendance** de la página Attendance.
2. Opcionalmente, selecciona un **Campus** y **Service**.
3. Establece la **Start Date** y **End Date**. De forma predeterminada, el informe cubre desde el último domingo hasta hoy, y la fecha de finalización se incluye completamente.
4. Haz clic en **Run Report**.

Los resultados se agrupan por fecha de sesión, luego por hora de servicio, luego por grupo, con las personas que asistieron enumeradas bajo cada grupo. Los horarios de servicio, grupos y nombres se ordenan alfabéticamente. Al lado del nombre de cada persona, la columna **Checked In** muestra la hora en que se registró su asistencia (en blanco cuando no hay hora en el archivo) y la columna **Membership Status** muestra su estado, como Miembro o Visitante.

Para descargar una hoja de cálculo, haz clic en **Download Options** y elige **Summary**. El CSV tiene:

- Una fila por miembro de cada grupo que se reunió en el rango de fechas, ordenado por grupo y luego por nombre.
- El nombre de la persona y el nombre del grupo en las primeras columnas.
- Una columna por sesión fechada, nombrada con el servicio, hora de servicio y fecha (por ejemplo, "Sunday - 9:00 AM (2026-09-27)"), con cada persona marcada como **present** o **absent**.

Usa este informe para comparar la asistencia entre grupos e identificar qué grupos están creciendo o necesitan atención.

## Asistencia Diaria de Grupo

El informe Daily Group Attendance proporciona un desglose día a día de datos de asistencia para tus grupos.

1. Ve directamente a **admin.b1.church/reports/dailyGroupAttendance** en tu navegador.
2. Establece el **rango de fechas** para el informe.
3. Selecciona el o los **grupos** que deseas revisar.
4. El informe muestra números de asistencia para cada día individual dentro del rango.

Este informe te proporciona detalle granular, que es útil para entender la variación de semana a semana o identificar días específicos con asistencia inusualmente alta o baja.

:::tip
Usa el informe Attendance Trend para una visión general de alto nivel y el informe Daily Group Attendance cuando necesites profundizar en fechas específicas.
:::

## Usos Prácticos

- **Planificación** -- Usa las tendencias de asistencia para planificar asientos, personal y recursos para los próximos servicios.
- **Divulgación** -- Identifica patrones de asistencia decreciente temprano para que puedas hacer seguimiento con los miembros.
- **Informes de junta** -- Incluye datos de asistencia en tus informes regulares de liderazgo para mostrar la salud del ministerio.
- **Evaluación de eventos** -- Compara la asistencia antes y después de eventos especiales para medir su impacto.

:::warning
Los datos de asistencia se registran a través de tus procesos de check-in de grupo y servicio. Si la asistencia no se rastrea consistentemente, tus informes no reflejarán con precisión la participación real. Consulta [Tracking Attendance](../attendance/tracking-attendance.md) para las instrucciones de configuración.
:::
