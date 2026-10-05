---
title: "Registro de Asistencia"
---

# Registro de Asistencia

<div class="article-intro">

Una vez que sus sedes, horarios de servicio y grupos estén configurados, puede registrar manualmente la asistencia después de cada reunión. B1 Admin organiza la asistencia en torno a **sesiones** -- una sesión por grupo por fecha de reunión. Crea la sesión, marca quién asistió, y los datos se alimentan directamente en sus informes de asistencia.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Sus sedes, horarios de servicio y grupos deben estar configurados. Consulte [Configuración de Asistencia](setup.md) si aún no lo ha hecho.
- Los grupos que desea rastrear deben tener **Track Attendance** habilitado. Consulte [Configuración de Asistencia](setup.md) para más detalles.

</div>

## Crear una Sesión

Una sesión representa una ocurrencia de una reunión de grupo -- por ejemplo, su clase K-3er grado en un domingo específico.

1. Abra **B1 Admin**, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda), expanda **People**, y haga clic en **Groups**.
2. Seleccione el grupo para el que desea registrar la asistencia.
3. Haga clic en la pestaña **Sessions**.
4. Haga clic en **New** para crear una nueva sesión.
5. Si el grupo se asigna a un horario de servicio, elija el **Service Time**. Si es un grupo sin programación, este campo no aparecerá.
6. Seleccione la **Session Date** -- puede ser hoy, una fecha pasada o una fecha futura.
7. Haga clic en **Save**.

### Agregar Sesiones para Cada Clase en un Horario de Servicio

Si otros grupos se reúnen en el mismo horario de servicio (por ejemplo, todas sus clases infantiles a las 9:00 AM del domingo), puede crear sus sesiones en un paso en lugar de visitar cada grupo.

1. Siga los pasos anteriores y elija un **Service Time**.
2. Marque **Also add for the other _N_ groups in _service time_**. La casilla de verificación muestra cuántos otros grupos se asignan a ese horario de servicio. Solo aparece cuando se agrega una nueva sesión y al menos otro grupo se reúne en ese momento.
3. Haga clic en **Save**.

Se crea una sesión para el grupo actual y para cada uno de los otros grupos en la misma fecha y horario de servicio. Los grupos que ya tienen una sesión para esa fecha y horario de servicio se omiten, por lo que no obtendrá duplicados.

:::tip
Puede crear sesiones para fechas pasadas para ponerse al día con la asistencia que aún no ha registrado, o crearlas con anticipación para que estén listas cuando su grupo se reúna.
:::

## Marcando Asistencia

Seleccione una sesión para ver su lista de asistencia. Cada miembro del grupo está listado con una casilla de verificación, ordenado por apellido, y cualquiera ya registrado como presente está marcado.

1. Marque la casilla al lado de cada persona que asistió. Use **Select All** o **Select None** para cambiar a todos a la vez.
2. El conteo arriba de la lista (por ejemplo, "12 de 15 presentes") se actualiza mientras marca casillas.
3. Haga clic en **Save Attendance**. Nada se registra hasta que guarde, y un mensaje confirma cuando se completa la guardación.

Desmarcar a alguien que ya fue registrado como presente y luego guardar lo elimina de la sesión.

### Agregar Visitantes

Para registrar a alguien que no es miembro del grupo, búsquelo en la búsqueda de personas al lado de la lista de asistencia. Si aún no están en su base de datos, puede crearlos desde la búsqueda. Se agregan a la lista ya marcados. Haga clic en **Save Attendance** para registrarlos.

Las personas que se registraron en un quiosco muestran una ficha **Volunteer** o **Guest**. Las personas que no son miembros del grupo muestran una ficha **Guest**.

## Verificar Qué Grupos Aún Necesitan Asistencia

Cuando varias clases se reúnen en el mismo horario de servicio, puede ver de un vistazo cuáles aún necesitan que se ingrese su asistencia para esa fecha.

1. Abra una sesión que tenga un horario de servicio.
2. Haga clic en **Who Still Needs Attendance** en la parte superior de la lista de asistencia.
3. Un diálogo enumera cada grupo asignado a ese horario de servicio, con un resumen como "5 de 8 grupos ingresados" en la parte superior.

Los grupos sin nadie marcado como presente para esa fecha muestran una ficha **Not entered** y se enumeran primero. Los grupos que tienen asistencia muestran **Entered** con el número de personas marcadas como presentes (por ejemplo, "Entered (12)"). Haga clic en el nombre de un grupo para saltar a ese grupo y registrar su asistencia.

:::tip
Empareje esto con **Print All Classes** y [agregar sesiones para cada clase en un horario de servicio](#adding-sessions-for-every-class-in-a-service-time): cree las sesiones, distribuya hojas de rol, luego use **Who Still Needs Attendance** para ver qué hojas aún no se han ingresado.
:::

## Imprimiendo una Hoja de Rol

Una hoja de rol es una lista de clase imprimible que los maestros pueden marcar a mano y devolverle para que la ingrese más tarde. Cada hoja muestra el nombre de la iglesia, la clase, una línea **Date** grande debajo del nombre de la clase y el horario de servicio. Los miembros se enumeran en dos columnas (lea hacia abajo la columna izquierda, luego la derecha) para que quepan más nombres en una página, y cada miembro tiene casillas **Present** y **Absent**. Hay líneas en blanco para visitantes y un área **Teacher / Notes**.

- **Desde una sesión** -- Haga clic en el icono **Print Roll Sheet** (impresora) en la parte superior de la lista de asistencia de la sesión. La hoja está fechada con la fecha de la sesión.
- **Todas las clases para un servicio** -- Si la sesión tiene un horario de servicio, haga clic en **Print All Classes** para imprimir una hoja por cada clase asignada a ese horario de servicio. Cada clase se imprime en su propia página.
- **Desde la pestaña Members** -- Haga clic en el icono **Print Roll Sheet** arriba de la lista de miembros del grupo para imprimir una hoja sin fecha.

La hoja se abre en una nueva pestaña y el diálogo de impresión de su navegador aparece automáticamente.

## Exportando Asistencia a una Hoja de Cálculo

Puede descargar un registro de la sesión como un archivo CSV para usar en Excel, Numbers o Google Sheets.

1. Abra la sesión que desea exportar.
2. Haga clic en el botón **Export** en la parte superior de la lista de asistencia.
3. Abra el archivo descargado en su aplicación de hoja de cálculo.

## Visualizar Asistencia Registrada

Después de registrar sesiones, los datos aparecen en sus informes de asistencia.

- **Pestaña Attendance Trend** -- muestra tendencias de toda la iglesia a lo largo del tiempo. Consulte [Seguimiento de Asistencia](tracking-attendance.md).
- **Pestaña Group Attendance** -- muestra asistencia desglosada por grupo individual. Consulte [Informes de Asistencia](../reports/attendance-reports.md#group-attendance).

:::tip
Si una sesión que acaba de crear no aparece en los informes de inmediato, asegúrese de que la fecha de la sesión caiga dentro del rango de fechas seleccionado en los filtros del informe.
:::
