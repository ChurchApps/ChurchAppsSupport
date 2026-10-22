---
title: "Registrar asistencia"
---

# Registrar asistencia

<div class="article-intro">

Una vez que tus campus, horarios de servicio y grupos estén configurados, puedes registrar la asistencia manualmente después de cada reunión. B1 Admin organiza la asistencia en torno a **sesiones**: una sesión por grupo y por fecha de reunión. Creas la sesión, marcas quién asistió, y los datos alimentan directamente tus informes de asistencia.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Tus campus, horarios de servicio y grupos deben estar configurados. Consulta [Configuración de asistencia](setup.md) si aún no lo has hecho.
- Los grupos que quieras seguir deben tener activada la opción **Track Attendance**. Consulta [Configuración de asistencia](setup.md) para más detalles.
- Necesitas el permiso **Edit Attendance** para guardar la asistencia. Los voluntarios que solo tienen **View People Names Only** para las personas también pueden registrar asistencia de esta forma: abren las clases desde **Groups** y ven a los miembros solo por su nombre. Consulta [Solo nombres de personas](../settings/roles-permissions.md#people-names-only).

</div>

## Crear una sesión

Una sesión representa una ocurrencia de una reunión de grupo, por ejemplo, tu clase de K a 3.º grado en un domingo específico.

1. Abre **B1 Admin**, abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda), expande **People** y haz clic en **Groups**.
2. Selecciona el grupo para el que quieres registrar la asistencia.
3. En la sección **Sessions** de la página del grupo, haz clic en **All sessions**.
4. Haz clic en **New** para crear una nueva sesión.
5. Si el grupo está asignado a un horario de servicio, elige el **Service Time**. Si es un grupo sin horario programado, este campo no aparecerá.
6. Selecciona la **Session Date**: puede ser hoy, una fecha pasada o una fecha futura.
7. Haz clic en **Save**.

### Agregar sesiones para cada clase de un horario de servicio

Si otros grupos se reúnen en el mismo horario de servicio (por ejemplo, todas las clases de niños del domingo a las 9:00 a. m.), puedes crear sus sesiones en un solo paso en lugar de visitar cada grupo.

1. Sigue los pasos anteriores y elige un **Service Time**.
2. Marca **Also add for the other _N_ groups in _service time_**. La casilla indica cuántos otros grupos están asignados a ese horario de servicio. Solo aparece al agregar una sesión nueva y cuando al menos otro grupo se reúne a esa hora.
3. Haz clic en **Save**.

Se crea una sesión para el grupo actual y para cada uno de los otros grupos en la misma fecha y horario de servicio. Los grupos que ya tienen una sesión para esa fecha y horario se omiten, así que no se duplicarán.

:::tip
Puedes crear sesiones para fechas pasadas para registrar la asistencia que aún no hayas anotado, o crearlas con anticipación para que estén listas cuando tu grupo se reúna.
:::

## Notas de la sesión {#session-notes}

Cada sesión puede tener notas: un resumen de lo que se cubrió, anuncios o peticiones de oración.

1. Al agregar una sesión, o después de hacer clic en el icono **Edit** (lápiz) junto a una sesión de la lista, escribe en el cuadro **Notes (what was covered, announcements, prayer requests)** debajo de la fecha. La barra de herramientas te permite agregar texto en negrita, listas y enlaces.
2. Haz clic en **Save**.

Las notas aparecen en la parte superior de la lista de asistencia de la sesión. También son las notas de reunión que los miembros del grupo leen en la sección **Meetings** de la página del grupo en B1.church, donde los líderes también pueden escribirlas y editarlas. Consulta [Detalles del grupo](../../b1-church/groups/group-details.md#meeting-notes-and-attendance).

## Marcar la asistencia

Selecciona una sesión para ver su lista de asistencia. Cada miembro del grupo aparece con una casilla, ordenado por apellido, y quienes ya están registrados como presentes aparecen marcados.

1. Marca la casilla junto a cada persona que asistió. Usa **Select All** o **Select None** para cambiar a todos a la vez.
2. El contador sobre la lista (por ejemplo, "12 of 15 present") se actualiza a medida que marcas casillas.
3. Haz clic en **Save Attendance**. No se registra nada hasta que guardes, y un mensaje confirma cuando el guardado termina.

Si desmarcas a alguien que ya estaba registrado como presente y luego guardas, se elimina de la sesión.

### Agregar visitantes

Para registrar a alguien que no es miembro del grupo, búscalo en el buscador de personas junto a la lista de asistencia. Si todavía no está en tu base de datos, puedes crearlo desde la búsqueda. En ambos casos, se agrega a la lista ya marcado. Haz clic en **Save Attendance** para registrarlo.

Las personas que se registraron en un quiosco muestran una etiqueta **Volunteer** o **Guest**. Las personas que no son miembros del grupo muestran una etiqueta **Guest**.

## Revisar qué grupos aún necesitan asistencia

Cuando varias clases se reúnen en el mismo horario de servicio, puedes ver de un vistazo cuáles todavía necesitan que se registre su asistencia para esa fecha.

1. Abre una sesión que tenga un horario de servicio.
2. Haz clic en **Who Still Needs Attendance** en la parte superior de la lista de asistencia.
3. Un cuadro de diálogo muestra cada grupo asignado a ese horario de servicio, con un resumen como "5 of 8 groups entered" en la parte superior.

Los grupos sin personas marcadas como presentes en esa fecha muestran una etiqueta **Not entered** y aparecen primero. Los grupos que ya tienen asistencia muestran **Entered** con el número de personas marcadas como presentes (por ejemplo, "Entered (12)"). Haz clic en el nombre de un grupo para abrir sus sesiones con la sesión de la misma fecha ya seleccionada, y así registrar su asistencia de inmediato. Si el grupo todavía no tiene una sesión para esa fecha, se abre su lista de sesiones para que puedas agregarla.

:::tip
Combina esto con **Print All Classes** y [agregar sesiones para cada clase de un horario de servicio](#adding-sessions-for-every-class-in-a-service-time): crea las sesiones, entrega las hojas de asistencia y luego usa **Who Still Needs Attendance** para ver cuáles aún no se han registrado.
:::

## Imprimir una hoja de asistencia

Una hoja de asistencia es una lista de clase imprimible que los maestros pueden marcar a mano y entregarte para registrarla después. Cada hoja muestra el logotipo de tu iglesia (el **Light Background Logo** de [Website > Appearance](../website/appearance.md), si lo has subido) con el nombre de la iglesia debajo, la clase, una línea grande **Date** bajo el nombre de la clase y el horario de servicio. Los miembros aparecen en dos columnas (se lee de arriba abajo en la columna izquierda y luego en la derecha) para que quepan más nombres en una página, y cada miembro tiene las casillas **Present** y **Absent**. Hay líneas en blanco para visitantes y un área **Teacher / Notes**.

- **Desde una sesión:** haz clic en el icono de impresora **Print Roll Sheet** en la parte superior de la lista de asistencia de la sesión. La hoja lleva la fecha de la sesión.
- **Todas las clases de un servicio:** si la sesión tiene un horario de servicio, haz clic en **Print All Classes** para imprimir una hoja por cada clase asignada a ese horario. Cada clase se imprime en su propia página.
- **Desde la lista de miembros:** en la página del grupo, haz clic en **All members** y luego en el icono **Print Roll Sheet** sobre la lista de miembros, y elige **Attendance Sheet** para imprimir una hoja sin fecha. El mismo menú tiene un diseño **Contact Roster** con el teléfono, correo electrónico y dirección de cada miembro; consulta [Imprimir la lista de miembros](../groups/group-members.md#printing-the-member-list).

La hoja se abre en una pestaña nueva y el cuadro de diálogo de impresión de tu navegador aparece automáticamente.

## Exportar la asistencia a una hoja de cálculo

Puedes descargar un registro de la sesión como archivo CSV para usarlo en Excel, Numbers o Google Sheets.

1. Abre la sesión que quieres exportar.
2. Haz clic en el botón **Export** en la parte superior de la lista de asistencia.
3. Abre el archivo descargado en tu aplicación de hojas de cálculo.

## Ver la asistencia registrada

Después de registrar las sesiones, los datos aparecen en tus informes de asistencia.

- **Pestaña Attendance Trend** (debajo de **All years** en la página de asistencia): muestra las tendencias de toda la iglesia a lo largo del tiempo. Consulta [Seguimiento de asistencia](tracking-attendance.md).
- **Pestaña Group Attendance**: muestra la asistencia desglosada por grupo individual. Consulta [Informes de asistencia](../reports/attendance-reports.md#group-attendance).

:::tip
Si una sesión que acabas de crear no aparece de inmediato en los informes, asegúrate de que la fecha de la sesión esté dentro del rango de fechas seleccionado en los filtros del informe.
:::
