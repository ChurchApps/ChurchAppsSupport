---
title: "Informes de asistencia"
---

# Informes de asistencia

<div class="article-intro">

B1 Admin ofrece tres informes de asistencia para ayudarle a comprender cómo participan las personas en sus servicios y grupos. Cada informe ofrece una perspectiva distinta de sus datos de asistencia, desde las tendencias generales hasta el desglose diario.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Asegúrese de que la asistencia se esté [registrando de forma consistente](../attendance/tracking-attendance.md) para sus servicios y grupos
- Verifique que sus [grupos](../groups/creating-groups.md) y servicios estén configurados en B1 Admin
- Necesita los [permisos](../settings/roles-permissions.md) adecuados para acceder a los informes

</div>

## Tendencia de asistencia

El informe de Tendencia de asistencia muestra cómo cambia la asistencia a lo largo del tiempo en sus servicios.

1. Vaya directamente a **admin.b1.church/reports/attendanceTrend** en su navegador (los informes no tienen una entrada en el menú de navegación; guardar la dirección en marcadores es la forma más fácil de volver a ellos). El mismo informe también está en la página de Asistencia: haga clic en **Todos los años** y luego elija la pestaña **Tendencia de asistencia**.
2. Opcionalmente, seleccione un **Campus**, **Servicio**, **Horario de servicio** o **Grupo** para filtrar los resultados.
3. Establezca la **Fecha de inicio** y la **Fecha de fin**. De forma predeterminada, el informe cubre el último año, desde hace un año hasta hoy, e incluye completa la fecha de fin. Haga clic en **Ejecutar informe**.
4. El informe muestra un gráfico de barras y una tabla con el total de visitas por semana. Cada semana aparece etiquetada con la fecha del domingo de esa semana, y la columna **Fechas de sesión** de la tabla enumera las fechas reales de esa semana que tuvieron asistencia (por ejemplo, "9/27, 9/30").

Este informe es útil para detectar patrones como bajas estacionales, tendencias de crecimiento o el impacto de eventos especiales.

## Asistencia por grupo {#group-attendance}

El informe de Asistencia por grupo muestra quién asistió a cada sesión de grupo en un rango de fechas.

1. Vaya directamente a **admin.b1.church/reports/groupAttendance** en su navegador, o en la página de Asistencia haga clic en **Todos los años** y elija la pestaña **Asistencia por grupo**.
2. Opcionalmente, seleccione un **Campus** y un **Servicio**.
3. Establezca la **Fecha de inicio** y la **Fecha de fin**. De forma predeterminada, el informe cubre desde el domingo pasado hasta hoy, e incluye completa la fecha de fin.
4. Haga clic en **Ejecutar informe**.

Los resultados se agrupan por fecha de sesión, luego por horario de servicio, luego por grupo, con las personas que asistieron listadas bajo cada grupo. Los horarios de servicio, los grupos y los nombres se ordenan alfabéticamente. Junto al nombre de cada persona, la columna **Registro de entrada** muestra la hora en que se registró su asistencia (en blanco cuando no hay hora registrada) y la columna **Estado de membresía** muestra su estado, como Miembro o Visitante. También se incluyen las sesiones de grupos que no se reúnen en un horario de servicio; aparecen sin horario de servicio.

Para descargar una hoja de cálculo, haga clic en **Opciones de descarga** y elija **Resumen**. El CSV contiene:

- Una fila por cada miembro de cada grupo que se reunió en el rango de fechas, ordenado por grupo y luego por nombre.
- El nombre de la persona y el nombre del grupo en las primeras columnas.
- Una columna por cada sesión con fecha, nombrada con el servicio, el horario de servicio y la fecha (por ejemplo, "Domingo - 9:00 a. m. (2026-09-27)"), con cada persona marcada como **presente** o **ausente**. Una sesión sin horario de servicio se nombra solo con su fecha.

Use este informe para comparar la asistencia entre grupos e identificar qué grupos están creciendo o necesitan atención.

## Asistencia diaria por grupo

El informe de Asistencia diaria por grupo (titulado **Asistencia por grupo por día**) muestra un conteo día a día de cuántas personas asistieron a un grupo.

1. Vaya directamente a **admin.b1.church/reports/dailyGroupAttendance** en su navegador.
2. Use los menús desplegables de **Campus**, **Servicio** y **Horario de servicio** para reducir la lista, y luego elija el **Grupo** que desea revisar.
3. Ejecute el informe. Enumera cada día en que se reunió el grupo, del más antiguo al más reciente, con la **Fecha** y el número de **Asistentes** registrados ese día.

Este informe ofrece un detalle granular, útil para entender las variaciones de una semana a otra o para identificar días específicos con asistencia inusualmente alta o baja.

:::tip
Use el informe de Tendencia de asistencia para una visión general, y el informe de Asistencia diaria por grupo cuando necesite analizar fechas específicas.
:::

## Usos prácticos

- **Planeación**: use las tendencias de asistencia para planear la distribución de asientos, el personal y los recursos de los próximos servicios.
- **Alcance**: identifique temprano los patrones de disminución de asistencia para poder dar seguimiento a los miembros.
- **Informes para la junta**: incluya los datos de asistencia en sus informes periódicos de liderazgo para mostrar la salud del ministerio.
- **Evaluación de eventos**: compare la asistencia antes y después de eventos especiales para medir su impacto.

:::warning
Los datos de asistencia se registran a través de los procesos de grupo y de registro de entrada de sus servicios. Si la asistencia no se registra de forma consistente, sus informes no reflejarán con precisión la participación real. Consulte [Seguimiento de asistencia](../attendance/tracking-attendance.md) para las instrucciones de configuración.
:::
