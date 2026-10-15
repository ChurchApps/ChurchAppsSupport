---
title: "Registrar la asistencia"
---

# Registrar la asistencia

<div class="article-intro">

Una vez que hayas configurado tus sedes, horarios de servicio y grupos, puedes registrar manualmente la asistencia después de cada reunión. B1 Admin organiza la asistencia en torno a **sesiones**: una sesión por grupo y por fecha de reunión. Tú creas la sesión, marcas quién asistió y los datos se incorporan directamente a tus reportes de asistencia.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Tus sedes, horarios de servicio y grupos deben estar configurados. Consulta [Configuración de asistencia](setup.md) si aún no lo has hecho.
- Los grupos que quieres rastrear deben tener **Track Attendance** habilitado. Consulta [Configuración de asistencia](setup.md) para más detalles.

</div>

## Crear una sesión

Una sesión representa una ocurrencia de la reunión de un grupo, por ejemplo, tu clase de K a 3.er grado en un domingo específico.

1. Abre **B1 Admin**, abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expande **People** y haz clic en **Groups**.
2. Selecciona el grupo para el que quieres registrar la asistencia.
3. En la sección **Sessions** de la página del grupo, haz clic en **All sessions**.
4. Haz clic en **New** para crear una nueva sesión.
5. Si el grupo está asignado a un horario de servicio, elige el **Service Time**. Si es un grupo sin horario programado, este campo no aparecerá.
6. Selecciona la **Session Date**. Puede ser hoy, una fecha pasada o una fecha futura.
7. Haz clic en **Save**.

### Agregar sesiones para todas las clases de un horario de servicio

Si otros grupos se reúnen en el mismo horario de servicio (por ejemplo, todas las clases de niños del domingo a las 9:00 a. m.), puedes crear sus sesiones en un solo paso en lugar de visitar cada grupo.

1. Sigue los pasos anteriores y elige un **Service Time**.
2. Marca **Also add for the other _N_ groups in _service time_**. La casilla muestra cuántos otros grupos están asignados a ese horario de servicio. Solo aparece al agregar una nueva sesión y cuando al menos otro grupo se reúne en ese horario.
3. Haz clic en **Save**.

Se crea una sesión para el grupo actual y para cada uno de los otros grupos en la misma fecha y horario de servicio. Los grupos que ya tengan una sesión para esa fecha y horario se omiten, así que no obtendrás duplicados.

:::tip
Puedes crear sesiones para fechas pasadas para registrar asistencia que aún no hayas anotado, o crearlas con anticipación para que estén listas cuando tu grupo se reúna.
:::

## Marcar la asistencia

Selecciona una sesión para ver su lista de asistencia. Cada miembro del grupo aparece con una casilla, ordenado por apellido, y las personas que ya fueron registradas como presentes aparecen marcadas.

1. Marca la casilla junto a cada persona que asistió. Usa **Select All** o **Select None** para cambiar a todos a la vez.
2. El contador encima de la lista (por ejemplo, "12 of 15 present") se actualiza a medida que marcas las casillas.
3. Haz clic en **Save Attendance**. No se registra nada hasta que guardes, y un mensaje confirma cuándo se completó el guardado.

Desmarcar a una persona que ya estaba registrada como presente y luego guardar la elimina de la sesión.

### Agregar visitantes

Para registrar a alguien que no es miembro del grupo, búscalo en la búsqueda de personas junto a la lista de asistencia. Si todavía no está en tu base de datos, puedes crearlo desde la búsqueda. En ambos casos, se agrega a la lista ya marcado. Haz clic en **Save Attendance** para registrarlo.

Las personas que se registraron en un kiosco muestran una etiqueta **Volunteer** o **Guest**. Las personas que no son miembros del grupo muestran una etiqueta **Guest**.

## Revisar qué grupos todavía necesitan asistencia

Cuando varias clases se reúnen en el mismo horario de servicio, puedes ver de un vistazo cuáles todavía necesitan que se ingrese su asistencia para esa fecha.

1. Abre una sesión que tenga un horario de servicio.
2. Haz clic en **Who Still Needs Attendance** en la parte superior de la lista de asistencia.
3. Un cuadro de diálogo muestra cada grupo asignado a ese horario de servicio, con un resumen como "5 of 8 groups entered" en la parte superior.

Los grupos sin nadie marcado como presente para esa fecha muestran una etiqueta **Not entered** y aparecen primero. Los grupos que tienen asistencia muestran **Entered** con el número de personas marcadas como presentes (por ejemplo, "Entered (12)"). Haz clic en el nombre de un grupo para abrir sus sesiones con la sesión de la misma fecha ya seleccionada, y así puedes registrar su asistencia de inmediato. Si el grupo todavía no tiene una sesión para esa fecha, se abre su lista de sesiones para que puedas agregar una.

:::tip
Combínalo con **Print All Classes** y [agregar sesiones para todas las clases de un horario de servicio](#agregar-sesiones-para-todas-las-clases-de-un-horario-de-servicio): crea las sesiones, entrega las hojas de lista y luego usa **Who Still Needs Attendance** para ver cuáles hojas todavía no se han ingresado.
:::

## Imprimir una hoja de lista

Una hoja de lista es una lista de clase imprimible que los maestros pueden marcar a mano y devolverte para que la ingreses más tarde. Cada hoja muestra el logo de tu iglesia (el **Light Background Logo** de [Website > Appearance](../website/appearance.md), si lo has subido), con el nombre de la iglesia debajo, la clase, una línea grande de **Date** debajo del nombre de la clase y el horario de servicio. Los miembros aparecen en dos columnas (se lee hacia abajo la columna izquierda y luego la derecha) para que quepan más nombres en una página, y cada miembro tiene casillas **Present** y **Absent**. Hay líneas en blanco para visitantes y un área de **Teacher / Notes**.

- **Desde una sesión** -- Haz clic en el icono de impresora **Print Roll Sheet** en la parte superior de la lista de asistencia de la sesión. La hoja lleva la fecha de la sesión.
- **Todas las clases de un servicio** -- Si la sesión tiene un horario de servicio, haz clic en **Print All Classes** para imprimir una hoja por cada clase asignada a ese horario. Cada clase se imprime en su propia página.
- **Desde la lista de miembros** -- En la página del grupo, haz clic en **All members**, luego haz clic en el icono **Print Roll Sheet** encima de la lista de miembros y elige **Attendance Sheet** para imprimir una hoja sin fecha. El mismo menú tiene un diseño **Contact Roster** con el teléfono, correo electrónico y dirección de cada miembro; consulta [Imprimir la lista de miembros](../groups/group-members.md#printing-the-member-list).

La hoja se abre en una pestaña nueva y el cuadro de diálogo de impresión de tu navegador aparece automáticamente.

## Exportar la asistencia a una hoja de cálculo

Puedes descargar un registro de la sesión como archivo CSV para usarlo en Excel, Numbers o Google Sheets.

1. Abre la sesión que quieres exportar.
2. Haz clic en el botón **Export** en la parte superior de la lista de asistencia.
3. Abre el archivo descargado en tu aplicación de hojas de cálculo.

## Ver la asistencia registrada

Después de registrar sesiones, los datos aparecen en tus reportes de asistencia.

- **Pestaña Attendance Trend** (debajo de **All years** en la página de Attendance) -- muestra las tendencias de toda la iglesia a lo largo del tiempo. Consulta [Seguimiento de la asistencia](tracking-attendance.md).
- **Pestaña Group Attendance** -- muestra la asistencia desglosada por grupo individual. Consulta [Reportes de asistencia](../reports/attendance-reports.md#group-attendance).

:::tip
Si una sesión que acabas de crear no aparece de inmediato en los reportes, asegúrate de que la fecha de la sesión esté dentro del rango de fechas seleccionado en los filtros del reporte.
:::
