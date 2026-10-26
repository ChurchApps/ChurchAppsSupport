---
title: "Informes de asistencia"
---

# Informes de asistencia

<div class="article-intro">

B1 Admin ofrece tres informes de asistencia para ayudarte a entender cómo participan las personas en tus servicios y grupos. Cada informe ofrece una perspectiva diferente de tus datos de asistencia, desde tendencias generales hasta desgloses diarios.

</div>

<div class="prereqs">
<h4>Antes de empezar</h4>

- Asegúrate de que la asistencia se [registre de forma consistente](../attendance/tracking-attendance.md) para tus servicios y grupos
- Asegúrate de que tus [grupos](../groups/creating-groups.md) y servicios estén configurados en B1 Admin
- Necesitas los [permisos](../settings/roles-permissions.md) adecuados para acceder a los informes

</div>

## Tendencia de asistencia

El informe de Tendencia de asistencia muestra cómo cambia la asistencia a tus servicios a lo largo del tiempo.

1. Ve directamente a **admin.b1.church/reports/attendanceTrend** en tu navegador (los informes no aparecen en el menú de navegación; guardar la dirección en tus favoritos es la forma más fácil de volver a ellos). El mismo informe también está en la página de Asistencia: haz clic en **Todos los años** y luego elige la pestaña **Tendencia de asistencia**.
2. Opcionalmente, selecciona un **Campus**, **Servicio**, **Horario de servicio** o **Grupo** para filtrar los resultados.
3. Establece la **Fecha de inicio** y la **Fecha de fin**. Por defecto, el informe abarca el último año, desde hace un año hasta hoy, e incluye la fecha de fin completa. Haz clic en **Ejecutar informe**.
4. El informe muestra un gráfico de barras y una tabla con el total de visitas por semana. Cada semana está etiquetada con la fecha del domingo de esa semana, y la columna **Fechas de sesión** de la tabla enumera las fechas reales de esa semana que tuvieron asistencia (por ejemplo, "9/27, 9/30").

Este informe es útil para detectar patrones como bajas estacionales, tendencias de crecimiento o el impacto de eventos especiales.

## Asistencia de grupos

El informe de Asistencia de grupos muestra quién asistió a cada sesión de grupo dentro de un rango de fechas.

1. Ve directamente a **admin.b1.church/reports/groupAttendance** en tu navegador, o en la página de Asistencia haz clic en **Todos los años** y elige la pestaña **Asistencia de grupos**.
2. Opcionalmente, selecciona un **Campus** y un **Servicio**.
3. Establece la **Fecha de inicio** y la **Fecha de fin**. Por defecto, el informe abarca desde el domingo pasado hasta hoy, e incluye la fecha de fin completa.
4. Haz clic en **Ejecutar informe**.

Los resultados se agrupan por fecha de sesión, luego por horario de servicio, luego por grupo, con las personas que asistieron enumeradas debajo de cada grupo. Los horarios de servicio, grupos y nombres se ordenan alfabéticamente. Junto al nombre de cada persona, la columna **Registrado** muestra la hora en que se registró su asistencia (en blanco cuando no hay hora registrada) y la columna **Estado de membresía** muestra su estado, como Miembro o Visitante.

Para descargar una hoja de cálculo, haz clic en **Opciones de descarga** y elige **Resumen**. El CSV contiene:

- Una fila por cada miembro de cada grupo que se reunió en el rango de fechas, ordenadas por grupo y luego por nombre.
- El nombre de la persona y el nombre del grupo en las primeras columnas.
- Una columna por cada sesión con fecha, con el nombre del servicio, el horario de servicio y la fecha (por ejemplo, "Domingo - 9:00 AM (2026-09-27)"), y cada persona marcada como **presente** o **ausente**.

Usa este informe para comparar la asistencia entre grupos e identificar qué grupos están creciendo o necesitan atención.

## Asistencia diaria de grupo

El informe de Asistencia diaria de grupo (titulado **Asistencia de grupo por día**) ofrece un conteo día por día de cuántas personas asistieron a un grupo.

1. Ve directamente a **admin.b1.church/reports/dailyGroupAttendance** en tu navegador.
2. Usa los menús desplegables de **Campus**, **Servicio** y **Horario de servicio** para reducir la lista, luego elige el **Grupo** que quieres revisar.
3. Ejecuta el informe. Enumera cada día en que se reunió el grupo, del más antiguo al más reciente, con la **Fecha** y el número de **Asistentes** registrados ese día.

Este informe te da un detalle muy específico, útil para entender las variaciones de una semana a otra o para identificar días concretos con asistencia inusualmente alta o baja.

:::tip
Usa el informe de Tendencia de asistencia para una visión general y el informe de Asistencia diaria de grupo cuando necesites profundizar en fechas específicas.
:::

## Usos prácticos

- **Planificación**: usa las tendencias de asistencia para planear la distribución de asientos, el personal y los recursos de los próximos servicios.
- **Alcance**: identifica a tiempo los patrones de caída de asistencia para poder dar seguimiento a los miembros.
- **Informes para la junta**: incluye los datos de asistencia en tus informes periódicos de liderazgo para mostrar la salud del ministerio.
- **Evaluación de eventos**: compara la asistencia antes y después de eventos especiales para medir su impacto.

:::warning
Los datos de asistencia se registran a través de los procesos de registro de tus grupos y servicios. Si la asistencia no se registra de forma consistente, tus informes no reflejarán con precisión la participación real. Consulta [Registrar la asistencia](../attendance/tracking-attendance.md) para ver las instrucciones de configuración.
:::
