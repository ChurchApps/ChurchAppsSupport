---
title: "Configuración de Asistencia"
---

# Configuración de Asistencia

<div class="article-intro">

Antes de poder rastrear la asistencia, necesita indicarle a B1 Admin las ubicaciones físicas de su iglesia, cuándo se realizan los servicios y qué grupos se reúnen en cada servicio. Esta configuración única crea la estructura que impulsa todo el seguimiento e informes de asistencia en su iglesia.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Necesita una cuenta activa de B1 Admin con permiso para gestionar la asistencia. Consulte [Roles y Permisos](../people/roles-permissions.md) si no está seguro de su nivel de acceso.
- Si planea asignar grupos a horarios de servicio, asegúrese de que sus [grupos estén creados](../groups/creating-groups.md) primero.

</div>

## Conceptos Clave

- **Sede** -- una ubicación física donde se reúne su iglesia (por ejemplo, "Sede Principal", "Sede Norte").
- **Horario de Servicio** -- una reunión recurrente en una sede (por ejemplo, "Domingo 9:00 AM", "Miércoles 7:00 PM").
- **Grupo Programado** -- un grupo asignado a un horario de servicio específico. La asistencia se rastrea en el contexto de ese servicio.
- **Grupo No Programado** -- un grupo que rastrea la asistencia por su cuenta, sin estar vinculado a un horario de servicio.

## Configuración de su Estructura de Asistencia

1. Abra **B1 Admin** y haga clic en **Asistencia** en la barra lateral.
2. Seleccione la pestaña **Configuración**.
3. Haga clic en **Agregar Sede** e ingrese el nombre de su ubicación. Haga clic en **Guardar**.
4. Con su sede seleccionada, haga clic en **Agregar Horario de Servicio**. Ingrese un nombre como "Domingo 9:00 AM" y haga clic en **Guardar**.
5. Repita para cada horario de servicio en esa sede.
6. Para asignar un grupo a un horario de servicio, seleccione el horario de servicio y haga clic en **Agregar Grupo**. Elija el grupo de la lista y haga clic en **Guardar**.

### Habilitar el Seguimiento de Asistencia en un Grupo

Antes de que se pueda registrar la asistencia de un grupo, el Seguimiento de Asistencia debe estar activado para ese grupo.

1. Haga clic en **Grupos** en la barra lateral y seleccione el grupo.
2. Haga clic en el icono de **Editar** (lápiz).
3. Establezca **Seguimiento de Asistencia** en **Sí**.
4. Haga clic en **Guardar**.

:::tip
Si asignó el grupo a un horario de servicio en el paso anterior, también use la opción **Agregar Horario de Servicio** en la pantalla de edición del grupo para vincularlo al servicio correcto. Esto asegura que las sesiones estén conectadas a la sede y horario correctos.
:::

:::tip
Si un grupo se reúne fuera de un servicio regular, como un grupo pequeño entre semana que rastrea su propia asistencia, puede dejarlo como grupo no programado. Seguirá apareciendo en la pestaña Grupos para informes de asistencia.
:::

## Edición de su Configuración

Puede actualizar su configuración en cualquier momento. Seleccione una sede, horario de servicio o grupo y haga clic en **Editar** para cambiar sus detalles, o **Eliminar** para eliminarlo.

:::info
Eliminar un horario de servicio no borra los registros de asistencia anteriores. Sus datos históricos se conservan incluso si cambia su horario.
:::

## Qué Sigue

Una vez que sus sedes, horarios de servicio y grupos estén configurados, está listo para comenzar a [registrar asistencia](recording-attendance.md) manualmente o configurar el [registro de entrada autónomo](check-in.md) para sus servicios.
