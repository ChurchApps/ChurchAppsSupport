---
title: "Entrada de Conteo y Tendencia"
---

# Entrada de Conteo y Tendencia

<div class="article-intro">

Los conteos le permiten registrar un número total simple de asistencia -- para un servicio, un horario de servicio o un grupo -- sin verificar un roster nominado. Use esto cuando solo necesite "cuántas personas estuvieron aquí", y emparéjelo con el informe de Tendencia de Conteo para ver ese número a lo largo del tiempo.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Sus sedes, servicios y horarios de servicio deben configurarse. Consulte [Configuración de Asistencia](setup.md).
- Ingresar un conteo requiere la permiso **Attendance > Edit**; ver el informe de tendencia requiere **Attendance > View**. Consulte [Roles y Permisos](../settings/roles-permissions.md).

</div>

:::info
Los conteos son una alternativa de total a [Registro de Asistencia](recording-attendance.md). Si necesita saber **quién** asistió -- por ejemplo, para hacer seguimiento a las personas que no han regresado -- siga usando asistencia de sesión nominada en la pestaña Sessions de un grupo. Los conteos solo almacenan un número.
:::

## Registrar un Conteo

1. Abra **B1 Admin**, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda), expanda **People**, y haga clic en **Attendance**.
2. Seleccione la subpestaña **Headcounts**.
3. Complete el formulario:
   - **Service** *(requerido)*
   - **Service Time** -- deje en blanco para registrar un total en todos los horarios de servicio
   - **Group** -- opcional; solo se enumeran los grupos con Track Attendance habilitado. Dejar en blanco para "No group (whole service)."
   - **Date**
   - **Headcount** -- el número total de personas presentes
4. Haga clic en **Save**.

La tabla **Recent Headcounts** a la derecha enumera sus últimas entradas con su fecha, servicio, horario de servicio, grupo y recuento. Haga clic en una fila para cargarla en el formulario si necesita corregirla o eliminarla.

## Informe de Tendencia de Conteo

1. Desde la misma página **Attendance**, seleccione la pestaña **Headcount Trend**.
2. Use los filtros **Campus**, **Service**, **Service Time** y **Group** para reducir el informe.

El informe muestra sus conteos registrados sumados por semana, tanto como un gráfico de líneas como una tabla -- el mismo estilo de informe utilizado por las [pestañas de tendencia de Asistencia y Grupos](tracking-attendance.md).

## Páginas Relacionadas

- [Registro de Asistencia](recording-attendance.md) -- asistencia de sesión nominada por persona
- [Seguimiento de Asistencia](tracking-attendance.md) -- informes de tendencia de asistencia y grupos
- [Configuración de Asistencia](setup.md) -- configure sedes, servicios y horarios de servicio
