---
title: "Entrada de Conteos de Asistencia y Tendencia"
---

# Entrada de Conteos de Asistencia y Tendencia

<div class="article-intro">

Los conteos de asistencia te permiten registrar un número total simple de asistencia, para un servicio, una hora de servicio o un grupo, sin necesidad de revisar un registro nominado. Utiliza esto cuando solo necesites saber "cuántas personas estuvieron aquí" y combínalo con el informe de Tendencia de Conteos de Asistencia para observar ese número a lo largo del tiempo.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Tus campus, servicios y horarios de servicios deben estar configurados. Consulta [Configuración de Asistencia](setup.md).
- Ingresar un conteo de asistencia requiere el permiso **Asistencia &gt; Editar**; ver el informe de tendencia requiere **Asistencia &gt; Ver**. Consulta [Funciones y Permisos](../settings/roles-permissions.md).

</div>

:::info
Los conteos de asistencia son una alternativa de solo totales a [Registrar Asistencia](recording-attendance.md). Si necesitas saber **quién** asistió, por ejemplo, para hacer seguimiento con las personas que no han regresado, sigue utilizando la asistencia de sesión con nombre en la pestaña de Sesiones del grupo. Los conteos de asistencia solo almacenan un número.
:::

## Registrar un Conteo de Asistencia

1. Abre **B1 Admin**, abre el **menú de sección** en la esquina superior izquierda y elige **Personas**, luego haz clic en la pestaña **Asistencia**.
2. Selecciona la subpestaña **Conteos de Asistencia**.
3. Completa el formulario:
   - **Servicio** *(requerido)*
   - **Hora de Servicio** -- deja en blanco para registrar un total en todos los horarios de servicio
   - **Grupo** -- opcional; solo se enumeran los grupos con Rastrear Asistencia habilitado. Deja en blanco para "Sin grupo (servicio completo)".
   - **Fecha**
   - **Conteo de Asistencia** -- el número total de personas presentes
4. Haz clic en **Guardar**.

La tabla de **Conteos de Asistencia Recientes** a la derecha enumera tus últimas entradas con su fecha, servicio, hora de servicio, grupo y conteo. Haz clic en una fila para cargarla de nuevo en el formulario si necesitas corregirla o eliminarla.

## Informe de Tendencia de Conteos de Asistencia

1. Desde la misma pestaña de **Asistencia**, selecciona la subpestaña **Tendencia de Conteos de Asistencia**.
2. Utiliza los filtros de **Campus**, **Servicio**, **Hora de Servicio** y **Grupo** para reducir el informe.

El informe muestra tus conteos de asistencia registrados sumados por semana, tanto como un gráfico de líneas como una tabla, el mismo estilo de informe utilizado por las [pestañas de tendencia de Asistencia y Grupos](tracking-attendance.md).

## Páginas Relacionadas

- [Registrar Asistencia](recording-attendance.md) -- asistencia de sesión con nombre, por persona
- [Rastrear Asistencia](tracking-attendance.md) -- informes de tendencia de asistencia y grupos
- [Configuración de Asistencia](setup.md) -- configurar campus, servicios y horarios de servicio
