---
title: "Configuración de Asistencia"
---

# Configuración de Asistencia

<div class="article-intro">

Antes de poder rastrear asistencia, debe decirle a B1 Admin acerca de las ubicaciones físicas de su iglesia, cuándo suceden los servicios y qué grupos se reúnen en cada servicio. Esta configuración única crea la estructura que impulsa todo el rastreo de asistencia e informes en toda su iglesia.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Necesita una cuenta activa de B1 Admin con permiso para administrar asistencia. Consulte [Roles y Permisos](../people/roles-permissions.md) si no está seguro de su nivel de acceso.
- Si planea asignar grupos a horarios de servicio, asegúrese de que sus [grupos se creen](../groups/creating-groups.md) primero.

</div>

## Conceptos Clave

- **Campus** -- una ubicación física donde se reúne su iglesia (p. ej., "Campus Principal", "Campus Norte"). Los campus se administran en **Settings**.
- **Service** -- una reunión recurrente en un campus (p. ej., "Servicio Dominical", "Semana Media").
- **Service Time** -- una hora específica en que sucede un servicio (p. ej., "9:00 AM", "11:00 AM").
- **Scheduled Group** -- un grupo asignado a un horario de servicio específico. La asistencia se rastrea en el contexto de ese servicio.
- **Unscheduled Group** -- un grupo que rastrea asistencia por su cuenta, sin estar vinculado a un horario de servicio.

## Configurar Su Estructura de Asistencia

1. Abra **B1 Admin**, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda), y expanda **People**.
2. Haga clic en **Attendance** y, a continuación, en **Setup** en la columna izquierda. Se abre la tabla **Service structure**, con los recuentos de sus campus, horarios de servicio y grupos programados y no programados en la parte superior.
3. Haga clic en **Manage Campuses** (esquina superior derecha del panel **Service structure**). Esto lo lleva a **Settings → Campuses**. Haga clic en **Add Campus**, ingrese el nombre de su ubicación (la dirección y la zona horaria son opcionales), y haga clic en **Save**.
4. Regrese a **People → Attendance** y haga clic en **Setup**. Su campus ahora aparece en la tabla de configuración.
5. Haga clic en el **botón + en la columna Service** debajo de su campus. Ingrese un nombre de servicio como "Sunday Service" y haga clic en **Save**.
6. Haga clic en el **botón + en la columna Time** bajo el servicio. Ingrese un nombre de **Service Time** como "9:00 AM", opcionalmente complete el [horario de registro](#setting-a-check-in-schedule), y haga clic en **Save**. Repita para cada horario de servicio.
7. Para conectar un grupo a un horario de servicio, abra el grupo desde **People > Groups**, haga clic en **Edit**, y use **Add Service Time** — ver la siguiente sección.

### Habilitar Track Attendance en un Grupo

Antes de que un grupo pueda tener asistencia registrada, Track Attendance debe estar activado para ese grupo.

1. En el menú Jump, elija **People > Groups** y seleccione el grupo.
2. Haga clic en el botón **Edit** debajo del nombre del grupo.
3. Configure **Track Attendance** como **Yes**.
4. Haga clic en **Save**.

:::tip
Si asignó el grupo a un horario de servicio en el paso anterior, también use la opción **Add Service Time** en la pantalla de edición del grupo para vincularlo al servicio correcto. Esto asegura que las sesiones estén conectadas al campus y hora correctos.
:::

:::tip
Si un grupo se reúne fuera de un servicio regular -- como un grupo pequeño entre semana que rastrea su propia asistencia -- puede dejarlo como un grupo sin programar. Aún aparecerá en el informe **Group Attendance** para informes de asistencia.
:::

## Configurar un Horario de Registro {#setting-a-check-in-schedule}

Cada horario de servicio puede tener un horario de registro opcional para que el [auto registro](check-in.md) se abra y cierre por sí solo cada semana. Sin horario, el registro para ese horario de servicio permanece disponible en todo momento (siempre que la sala no esté cerrada por otros motivos, como estar llena).

1. En la vista **Setup**, haga clic en el nombre de un horario de servicio en la columna **Time** (o agregue uno nuevo).
2. En **Check-in Schedule**, elija el **Day** de la semana en que se reúne el horario de servicio.
3. Configure la **Start Time** y, opcionalmente, la **End Time**.
4. Ingrese **Open check-in (minutes before start)** -- por ejemplo, `30` abre el registro media hora antes de que comience el servicio.
5. Ingrese **Close check-in (minutes after end)** -- por ejemplo, `15` mantiene el registro abierto 15 minutos después de la hora de finalización. Si no configuró una hora de finalización, esto se cuenta desde la hora de inicio.
6. Haga clic en **Save**.

El horario usa la hora local de su iglesia y se repite cada semana. Para quitar un horario, vuelva a establecer **Day** en **No schedule** y haga clic en **Save**. Un horario solo surte efecto cuando se configuran tanto un **Day** como una **Start Time**.

Mientras la ventana de registro de un horario de servicio está cerrada:

- **El auto registro en B1.church** oculta ese horario de servicio. Si ninguno de los horarios de un servicio está abierto, las familias ven "Check-in isn't open for this service right now."
- **La aplicación de quiosco B1 Checkin** no completará un registro en los grupos de ese horario de servicio; el quiosco muestra una pantalla **Can't check in yet** que enumera la sala afectada para que la familia pueda elegir otra.

:::tip
Configure una ventana de apertura amplia (por ejemplo, 45 minutos antes del inicio) para que las familias y los voluntarios que lleguen temprano puedan registrarse, y una ventana de cierre corta para que quienes lleguen tarde puedan registrarse una vez que el servicio haya comenzado.
:::

## Editar Su Configuración

Puede actualizar su configuración en cualquier momento. Seleccione un campus, horario de servicio o grupo y haga clic en **Edit** para cambiar sus detalles, o **Delete** para eliminarlo.

:::info
Eliminar un horario de servicio no elimina los registros de asistencia pasados. Sus datos históricos se conservan incluso si cambia su horario.
:::

## Lo Siguiente

Una vez que sus campus, horarios de servicio y grupos estén en su lugar, está listo para comenzar [registrando asistencia](recording-attendance.md) manualmente o configure [auto-registro](check-in.md) para sus servicios.
