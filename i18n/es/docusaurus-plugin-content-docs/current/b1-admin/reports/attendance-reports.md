---
title: "Informes de asistencia"
---

# Informes de asistencia

<div class="article-intro">

B1 Admin ofrece tres informes de asistencia para ayudarle a entender cómo participan las personas en sus servicios y grupos. Cada informe ofrece una perspectiva diferente de sus datos de asistencia, desde tendencias generales hasta desgloses diarios.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Asegúrese de que la asistencia se esté [registrando de forma consistente](../attendance/tracking-attendance.md) para sus servicios y grupos.
- Verifique que sus [grupos](../groups/creating-groups.md) y servicios estén configurados en B1 Admin.
- Necesita los [permisos](../settings/roles-permissions.md) adecuados para acceder a los informes.

</div>

## Tendencia de asistencia

El informe de Tendencia de asistencia muestra cómo cambia la asistencia con el tiempo en sus servicios.

1. Vaya directamente a **admin.b1.church/reports/attendanceTrend** en su navegador (los informes no tienen entrada en el menú de navegación; guardar la dirección en sus marcadores es la forma más fácil de volver). El mismo informe también está en la página de Asistencia: haga clic en **Todos los años** y luego elija la pestaña **Tendencia de asistencia**.
2. Opcionalmente, seleccione un **Campus**, **Servicio**, **Horario de servicio** o **Grupo** para filtrar los resultados.
3. Configure la **Fecha de inicio** y la **Fecha de fin**. Por defecto, el informe cubre el último año, desde hace un año hasta hoy, e incluye la fecha de fin completa. Haga clic en **Ejecutar informe**.
4. El informe muestra un gráfico de barras y una tabla con el total de visitas por semana. Cada semana se identifica con la fecha del domingo de esa semana, y la columna **Fechas de sesión** de la tabla enumera las fechas reales de esa semana que tuvieron asistencia (por ejemplo, "9/27, 9/30").

Este informe es útil para detectar patrones como bajas estacionales, tendencias de crecimiento o el impacto de eventos especiales.

## Asistencia por grupo

El informe de Asistencia por grupo muestra quién asistió a cada sesión de grupo en un rango de fechas.

1. Vaya directamente a **admin.b1.church/reports/groupAttendance** en su navegador, o en la página de Asistencia haga clic en **Todos los años** y elija la pestaña **Asistencia por grupo**.
2. Opcionalmente, seleccione un **Campus** y un **Servicio**.
3. Configure la **Fecha de inicio** y la **Fecha de fin**. Por defecto, el informe cubre desde el domingo pasado hasta hoy, e incluye la fecha de fin completa.
4. Haga clic en **Ejecutar informe**.

Los resultados se agrupan por fecha de sesión, luego por horario de servicio y después por grupo, con las personas que asistieron listadas debajo de cada grupo. Los horarios de servicio, grupos y nombres se ordenan alfabéticamente. Junto al nombre de cada persona, la columna **Registrado** muestra la hora en que se registró su asistencia (en blanco cuando no hay hora registrada) y la columna **Estado de membresía** muestra su estado, como Miembro o Visitante. También se incluyen las sesiones de grupos que no se reúnen en un horario de servicio; aparecen sin horario de servicio.

Para descargar una hoja de cálculo, haga clic en **Opciones de descarga** y elija **Resumen**. El CSV contiene:

- Una fila por cada miembro de cada grupo que se reunió en el rango de fechas, ordenadas por grupo y luego por nombre.
- El nombre de la persona y el nombre del grupo en las primeras columnas.
- Una columna por cada sesión con fecha, nombrada con el servicio, el horario de servicio y la fecha (por ejemplo, "Domingo - 9:00 a. m. (2026-09-27)"), con cada persona marcada como **presente** o **ausente**. Una sesión sin horario de servicio se nombra solo con su fecha.

Use este informe para comparar la asistencia entre grupos e identificar qué grupos están creciendo o necesitan atención.

## Asistencia diaria por grupo

El informe de Asistencia diaria por grupo (titulado **Asistencia por grupo por día**) muestra un conteo día a día de cuántas personas asistieron a un grupo.

1. Vaya directamente a **admin.b1.church/reports/dailyGroupAttendance** en su navegador.
2. Use los menús desplegables **Campus**, **Servicio** y **Horario de servicio** para reducir la lista, y luego elija el **Grupo** que desea revisar.
3. Ejecute el informe. Enumera cada día en que se reunió el grupo, del más antiguo al más reciente, con la **Fecha** y el número de **Asistentes** registrados ese día.

Este informe ofrece un detalle granular, útil para entender la variación de una semana a otra o identificar días específicos con asistencia inusualmente alta o baja.

:::tip
Use el informe de Tendencia de asistencia para una vista general y el informe de Asistencia diaria por grupo cuando necesite profundizar en fechas específicas.
:::

## Usos prácticos

- **Planificación**: use las tendencias de asistencia para planificar asientos, personal y recursos para los próximos servicios.
- **Alcance**: identifique a tiempo los patrones de asistencia en declive para dar seguimiento a los miembros.
- **Informes para la junta**: incluya datos de asistencia en sus informes de liderazgo periódicos para mostrar la salud del ministerio.
- **Evaluación de eventos**: compare la asistencia antes y después de eventos especiales para medir su impacto.

:::warning
Los datos de asistencia se registran mediante sus procesos de grupos y de registro de entrada de servicios. Si la asistencia no se registra de forma consistente, sus informes no reflejarán con precisión la participación real. Consulte [Seguimiento de asistencia](../attendance/tracking-attendance.md) para las instrucciones de configuración.
:::
