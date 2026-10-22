---
title: "Configuración de asistencia"
---

# Configuración de asistencia

<div class="article-intro">

Antes de poder registrar la asistencia, debes indicar a B1 Admin las ubicaciones físicas de tu iglesia, cuándo se realizan los servicios y qué grupos se reúnen en cada servicio. Esta configuración única crea la estructura que impulsa todo el seguimiento y los informes de asistencia de tu iglesia.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesitas una cuenta activa de B1 Admin con permiso para administrar la asistencia. Consulta [Roles y permisos](../people/roles-permissions.md) si no estás seguro de tu nivel de acceso.
- Si planeas asignar grupos a horarios de servicio, asegúrate de que tus [grupos estén creados](../groups/creating-groups.md) primero.

</div>

## Conceptos clave

- **Campus**: un lugar físico donde tu iglesia se reúne (por ejemplo, "Main Campus" o "North Campus"). Los campus se administran en **Settings**.
- **Service**: una reunión recurrente en un campus (por ejemplo, "Sunday Service" o "Midweek").
- **Service Time**: un horario específico en el que se realiza un servicio (por ejemplo, "9:00 AM" o "11:00 AM").
- **Scheduled Group**: un grupo asignado a un horario de servicio específico. La asistencia se registra en el contexto de ese servicio.
- **Unscheduled Group**: un grupo que lleva su propia asistencia, sin estar vinculado a un horario de servicio.

## Configurar tu estructura de asistencia

1. Abre **B1 Admin**, abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda) y expande **People**.
2. Haz clic en **Attendance** y luego en **Setup** en la columna izquierda. Se abre la tabla **Service structure**, con el número de campus, horarios de servicio y grupos programados y no programados en la parte superior.
3. Haz clic en **Manage Campuses** (arriba a la derecha del panel **Service structure**). Esto te lleva a **Settings → Campuses**. Haz clic en **Add Campus**, escribe el nombre de tu ubicación (la dirección y la zona horaria son opcionales) y haz clic en **Save**.
4. Regresa a **People → Attendance** y haz clic en **Setup**. Tu campus ya aparece en la tabla de configuración.
5. Haz clic en el botón **+** de la columna **Service**, debajo de tu campus. Escribe un nombre de servicio como "Sunday Service" y haz clic en **Save**.
6. Haz clic en el botón **+** de la columna **Time**, debajo del servicio. Escribe un nombre de **Service Time** como "9:00 AM", opcionalmente completa el [horario de registro](#setting-a-check-in-schedule) y haz clic en **Save**. Repite para cada horario de servicio.
7. Para conectar un grupo a un horario de servicio, abre el grupo desde **People > Groups**, haz clic en **Edit** y usa **Add Service Time**. Consulta la siguiente sección.

### Activar Track Attendance en un grupo

Antes de que un grupo pueda registrar asistencia, debes activar **Track Attendance** para ese grupo.

1. En el menú Jump, elige **People > Groups** y selecciona el grupo.
2. Haz clic en el botón **Edit** debajo del nombre del grupo.
3. Cambia **Track Attendance** a **Yes**.
4. Haz clic en **Save**.

:::tip
Si asignaste el grupo a un horario de servicio en el paso anterior, usa también la opción **Add Service Time** en la pantalla de edición del grupo para vincularlo al servicio correcto. Así las sesiones quedan conectadas al campus y horario adecuados.
:::

:::tip
Si un grupo se reúne fuera de un servicio regular, como un grupo pequeño entre semana que lleva su propia asistencia, puedes dejarlo como grupo no programado. Aun así aparecerá en el informe **Group Attendance**.
:::

## Configurar un horario de registro

Cada horario de servicio puede tener un horario de registro opcional para que el [autorregistro](check-in.md) se abra y se cierre solo cada semana. Sin un horario, el registro de ese horario de servicio permanece disponible en cualquier momento (siempre que la sala no esté cerrada por otros motivos, como estar llena).

1. En la vista **Setup**, haz clic en el nombre de un horario de servicio en la columna **Time** (o agrega uno nuevo).
2. En **Check-in Schedule**, elige el **Day** de la semana en que se reúne el horario de servicio.
3. Establece la **Start Time** y, opcionalmente, la **End Time**.
4. Escribe **Open check-in (minutes before start)**: por ejemplo, `30` abre el registro media hora antes del inicio del servicio.
5. Escribe **Close check-in (minutes after end)**: por ejemplo, `15` mantiene el registro abierto 15 minutos después de la hora de término. Si no estableciste una hora de término, el tiempo se cuenta desde la hora de inicio.
6. Haz clic en **Save**.

El horario se repite cada semana y se mide en la zona horaria del campus del servicio. Si ese campus no tiene zona horaria, se usa la [Zona horaria](../settings/church-settings.md#time-zone) de tu iglesia; si tampoco la tiene, la zona horaria del primer campus que sí la tenga, y como último recurso la hora del este de EE. UU. (America/New_York). Si el registro se abre a una hora incorrecta, revisa la **Time Zone** del campus en [Campus](../settings/campuses.md). Para quitar un horario, cambia **Day** de nuevo a **No schedule** y haz clic en **Save**. Un horario solo se aplica cuando se han definido tanto **Day** como **Start Time**.

Mientras la ventana de registro de un horario de servicio está cerrada:

- **El autorregistro en B1.church** muestra ese horario de servicio como **Closed** (o, por ejemplo, **Closed · opens Sun 9:30 AM**) y no se puede seleccionar. Si ninguno de los horarios de un servicio está abierto, las familias ven cuándo se abre el registro, por ejemplo, "Check-in opens Sun 9:30 AM".
- **La aplicación del quiosco B1 Checkin** también muestra el horario de servicio como **Closed** junto con la hora de apertura. Si todos los horarios de un servicio están cerrados, el quiosco indica cuándo se abre el registro para ese servicio. Si alguien ya se registró en un horario de servicio cerrado, su grupo aparece con **Checked in**. Si una ventana se cierra a mitad de un registro, el quiosco no lo completa y muestra una pantalla **Can't check in yet** con la sala afectada, para que la familia pueda elegir otra.

Un hogar que ya se registró para un horario de servicio anterior todavía puede volver y agregar un horario posterior que esté abierto, incluso después de que la ventana anterior se haya cerrado. Sus registros anteriores se conservan.

:::tip
Establece una ventana de apertura amplia (por ejemplo, 45 minutos antes del inicio) para que las familias y los voluntarios que lleguen temprano puedan registrarse, y una ventana de cierre corta para que quienes lleguen tarde puedan registrarse una vez iniciado el servicio.
:::

## Editar tu configuración

Puedes actualizar tu configuración en cualquier momento. Selecciona un campus, un horario de servicio o un grupo y haz clic en **Edit** para cambiar sus detalles, o en **Delete** para eliminarlo.

:::info
Eliminar un horario de servicio no borra los registros de asistencia anteriores. Tus datos históricos se conservan aunque cambies tu horario.
:::

## Siguientes pasos

Una vez que tus campus, horarios de servicio y grupos estén listos, puedes empezar a [registrar la asistencia](recording-attendance.md) manualmente o configurar el [autorregistro](check-in.md) para tus servicios.
