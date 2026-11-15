---
title: "Registro de conteo total y tendencia"
description: "Registre un conteo total de personas para un servicio o grupo en B1 Admin sin una lista nominal, y luego observe esos totales semana a semana en el informe de Tendencia de conteo total."
---

# Registro de conteo total y tendencia

<div class="article-intro">

Los conteos totales le permiten registrar un número simple de asistencia total -- para un servicio, un horario de servicio o un grupo -- sin registrar la entrada de una lista nominal. Use esta opción cuando solo necesite saber "cuántas personas estuvieron aquí", y combínela con el informe de Tendencia de conteo total para observar ese número a lo largo del tiempo.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Sus campus, servicios y horarios de servicio deben estar configurados. Consulte [Configuración de asistencia](setup.md).
- Para introducir un conteo total se requiere el permiso **Asistencia &gt; Editar**; para ver el informe de tendencia se requiere **Asistencia &gt; Ver**. Consulte [Roles y permisos](../settings/roles-permissions.md).

</div>

:::info
Los conteos totales son una alternativa que solo guarda el total de [Registrar asistencia](recording-attendance.md). Si necesita saber **quién** asistió -- por ejemplo, para dar seguimiento a las personas que no han vuelto -- siga usando la asistencia nominal por sesión en las Sesiones de un grupo. Los conteos totales solo guardan un número.
:::

## Registrar un conteo total {#recording-a-headcount}

1. Abra **B1 Admin**, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), despliegue **Personas** y haga clic en **Asistencia**.
2. Haga clic en **Introducir conteo total** en la columna izquierda.
3. Complete el formulario:
   - **Servicio** *(obligatorio)*
   - **Horario de servicio**: déjelo en **Todos los horarios de servicio** para registrar un total de todos los horarios del servicio
   - **Grupo**: opcional; solo aparecen los grupos con Registrar asistencia activado. Déjelo en blanco para "Sin grupo (servicio completo)."
   - **Fecha**
   - **Conteo total**: el número total de personas presentes (un número entero, 0 o más)
4. Haga clic en **Guardar**.

La tabla **Conteos totales recientes** junto al formulario muestra sus últimos registros con fecha, servicio, horario de servicio, grupo y cantidad. Haga clic en una fila para cargarla de nuevo en el formulario si necesita corregirla o eliminarla.

## Informe de tendencia de conteo total {#headcount-trend-report}

1. Desde la misma página de **Asistencia**, haga clic en **Todos los años** en la columna izquierda y luego seleccione la pestaña **Tendencia de conteo total**.
2. El informe se ejecuta al abrir la pestaña. Para reducirlo, elija un **Campus**, **Servicio**, **Horario de servicio** o **Grupo** y haga clic en **Ejecutar informe**. No hay filtro de fechas: el informe abarca todas las semanas que tengan un conteo total.

El informe muestra sus conteos totales registrados sumados por semana, tanto en un gráfico de líneas como en una tabla, con el mismo estilo de informe que las pestañas de [Tendencia de asistencia y Asistencia por grupo](tracking-attendance.md). Los conteos totales introducidos para la semana actual también aparecen en **Conteos totales de esta semana** en la página principal de Asistencia.

## Páginas relacionadas {#related-pages}

- [Registrar asistencia](recording-attendance.md) -- asistencia nominal por persona y por sesión
- [Seguimiento de asistencia](tracking-attendance.md) -- informes de tendencia de asistencia y de grupos
- [Configuración de asistencia](setup.md) -- configure campus, servicios y horarios de servicio
