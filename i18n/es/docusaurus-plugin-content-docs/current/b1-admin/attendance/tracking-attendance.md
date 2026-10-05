---
title: "Seguimiento de Asistencia"
---

# Seguimiento de Asistencia

<div class="article-intro">

Una vez que sus sedes, horarios de servicio y grupos estén configurados, B1 Admin facilita la revisión de datos de asistencia e identificar tendencias. La página Attendance proporciona dos vistas de informes -- la pestaña **Attendance Trend** para tendencias de toda la iglesia y la pestaña **Group Attendance** para detalles a nivel de grupo. Use estas herramientas para entender patrones de crecimiento, identificar disminución de participación, y tomar decisiones basadas en datos para su iglesia.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Su estructura de asistencia debe estar configurada con al menos un campus y horario de servicio. Consulte [Configuración de Asistencia](setup.md) si aún no lo ha hecho.
- Los datos de asistencia deben ser registrados antes de que los informes muestren resultados. Los datos pueden venir de [entrada manual](recording-attendance.md) o [auto-registro](check-in.md).

</div>

## Ver Tendencias de Asistencia

1. Abra **B1 Admin**, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda), expanda **People**, y haga clic en **Attendance**.
2. Haga clic en la pestaña **Attendance Trend**.
3. El informe se ejecuta automáticamente cuando se abre la pestaña, mostrando la asistencia total para cada semana.

## Filtrando Sus Datos

Use los filtros en la caja **Filter Report** para reducir los resultados, luego haga clic en **Run Report**:

- **Campus** -- seleccione un campus para ver asistencia solo para esa ubicación.
- **Service** -- limite el informe a un servicio.
- **Service Time** -- elija un horario de servicio para profundizar en una reunión particular.
- **Group** -- muestre asistencia para un solo grupo.
- **Start Date** y **End Date** -- el rango de fechas a incluir. Por defecto el informe cubre el año pasado, desde hace un año hasta hoy, e la fecha de finalización se incluye completamente.

El informe muestra un gráfico de barras y una tabla de visitas totales por semana. Cada semana se etiqueta con la fecha del domingo de esa semana. La tabla también tiene una columna **Session Dates** que enumera las fechas reales en esa semana que tuvieron asistencia (por ejemplo, "9/27, 9/30"), para que pueda ver cuándo se cuenta una reunión entre semana en la misma semana que el domingo.

:::info
Los informes se ejecutan automáticamente cada vez que abre la pestaña Attendance Trend, por lo que siempre verá números actualizados sin necesidad de hacer clic en un botón de actualización.
:::

## Asistencia de Grupo

La pestaña **Group Attendance** muestra quién asistió a cada sesión de grupo. Esto es útil cuando desea monitorear una clase específica, equipo ministerial o grupo pequeño en lugar de ver números de servicio generales.

1. Seleccione la pestaña **Group Attendance**.
2. Opcionalmente elija un **Campus** y **Service**.
3. Configure el **Start Date** y **End Date**. Por defecto el informe cubre el domingo pasado hasta hoy.
4. Haga clic en **Run Report**.

Los resultados se agrupan por fecha de sesión, luego por horario de servicio y grupo, con las personas que asistieron listadas bajo cada grupo. Los horarios de servicio, grupos y nombres se clasifican alfabéticamente para que cada encabezado aparezca una vez. La fila de cada persona también muestra una columna **Checked In** con la hora en que se registró su asistencia (en blanco cuando no hay hora registrada) y una columna **Membership Status** (por ejemplo, Member o Visitor), para que pueda identificar huéspedes de un vistazo.

Para descargar los datos, haga clic en **Download Options** y elija **Summary**. El CSV tiene una fila por miembro del grupo, clasificado por grupo y luego nombre, y una columna para cada sesión fechada en el rango (por ejemplo, "Sunday - 9:00 AM (2026-09-27)") marcada **present** o **absent**.

:::tip
La asistencia del grupo es especialmente valiosa para líderes de [grupo pequeño](../groups/creating-groups.md) que desean rastrear el compromiso dentro de su grupo a lo largo del tiempo.
:::

## Consejos para Usar Datos de Asistencia

- Revise tendencias mensualmente para atrapar patrones estacionales temprano.
- Compare datos a nivel de campus para entender qué ubicaciones están creciendo.
- Use informes a nivel de grupo para hacer seguimiento [grupos](../groups/group-members.md) que muestren asistencia decreciente.
- Combine conocimientos de asistencia con la herramienta [Búsqueda de IA](../people/ai-search.md) para encontrar personas que no han asistido recientemente.

## Páginas Relacionadas

- [Registro de Asistencia](recording-attendance.md) -- ingrese manualmente la asistencia para una sesión de grupo
- [Entrada de Conteo y Tendencia](headcount-entry.md) -- una alternativa más simple de conteo total, con su propio gráfico de tendencia semanal
- [Registro de Entrada](check-in.md) -- configure el auto-registro para que la asistencia se registre automáticamente
