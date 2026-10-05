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
2. Haga clic en **Attendance**. La pestaña **Setup** está seleccionada de forma predeterminada.
3. Haga clic en **Manage Campuses** (esquina superior derecha del panel Setup). Esto lo lleva a **Settings → Campuses**. Haga clic en **Add Campus**, ingrese el nombre de su ubicación (la dirección y la zona horaria son opcionales), y haga clic en **Save**.
4. Regrese a **People → Attendance → Setup**. Su campus ahora aparece en la tabla de configuración.
5. Haga clic en el **botón + en la columna Service** debajo de su campus. Ingrese un nombre de servicio como "Sunday Service" y haga clic en **Save**.
6. Haga clic en el **botón + en la columna Time** bajo el servicio. Ingrese una hora como "9:00 AM" y haga clic en **Save**. Repita para cada horario de servicio.
7. Para conectar un grupo a un horario de servicio, abra el grupo desde **People > Groups**, haga clic en el lápiz **Edit**, y use **Add Service Time** — ver la siguiente sección.

### Habilitar Track Attendance en un Grupo

Antes de que un grupo pueda tener asistencia registrada, Track Attendance debe estar activado para ese grupo.

1. En el menú Jump, elija **People > Groups** y seleccione el grupo.
2. Haga clic en el icono lápiz **Edit**.
3. Configure **Track Attendance** como **Yes**.
4. Haga clic en **Save**.

:::tip
Si asignó el grupo a un horario de servicio en el paso anterior, también use la opción **Add Service Time** en la pantalla de edición del grupo para vincularlo al servicio correcto. Esto asegura que las sesiones estén conectadas al campus y hora correctos.
:::

:::tip
Si un grupo se reúne fuera de un servicio regular -- como un grupo pequeño entre semana que rastrea su propia asistencia -- puede dejarlo como un grupo sin programar. Aún aparecerá en la pestaña Groups para informes de asistencia.
:::

## Editar Su Configuración

Puede actualizar su configuración en cualquier momento. Seleccione un campus, horario de servicio o grupo y haga clic en **Edit** para cambiar sus detalles, o **Delete** para eliminarlo.

:::info
Eliminar un horario de servicio no elimina los registros de asistencia pasados. Sus datos históricos se conservan incluso si cambia su horario.
:::

## Lo Siguiente

Una vez que sus campus, horarios de servicio y grupos estén en su lugar, está listo para comenzar [registrando asistencia](recording-attendance.md) manualmente o configure [auto-registro](check-in.md) para sus servicios.
