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

- **Sede** -- una ubicación física donde se reúne su iglesia (por ejemplo, "Sede Principal", "Sede Norte"). Las sedes se administran en **Ajustes**.
- **Servicio** -- una reunión recurrente en una sede (por ejemplo, "Servicio Dominical", "Entre Semana").
- **Horario de Servicio** -- una hora específica en la que se realiza un servicio (por ejemplo, "9:00 AM", "11:00 AM").
- **Grupo Programado** -- un grupo asignado a un horario de servicio específico. La asistencia se rastrea en el contexto de ese servicio.
- **Grupo No Programado** -- un grupo que rastrea la asistencia por su cuenta, sin estar vinculado a un horario de servicio.

## Configuración de su Estructura de Asistencia

1. Abra **B1 Admin**, haga clic en el **menú de secciones** en la esquina superior izquierda (el nombre de la sección con la flecha pequeña) y elija **Personas**.
2. En la barra de navegación, haga clic en la pestaña **Asistencia**. La pestaña **Configuración** está seleccionada de forma predeterminada.
3. Haga clic en **Administrar Sedes** (en la parte superior derecha del panel de Configuración). Esto lo lleva a **Ajustes → Sedes**. Haga clic en **Agregar Sede**, ingrese el nombre de su ubicación (la dirección y la zona horaria son opcionales) y haga clic en **Guardar**.
4. Regrese a **Personas → Asistencia → Configuración**. Su sede ahora aparece en la tabla de configuración.
5. Haga clic en el **botón + en la columna Servicio** debajo de su sede. Ingrese un nombre de servicio como "Servicio Dominical" y haga clic en **Guardar**.
6. Haga clic en el **botón + en la columna Horario** debajo del servicio. Ingrese una hora como "9:00 AM" y haga clic en **Guardar**. Repita para cada horario de servicio.
7. Para conectar un grupo a un horario de servicio, abra el grupo desde la pestaña **Grupos**, haga clic en el lápiz de **Editar** y use **Agregar Horario de Servicio** — consulte la siguiente sección.

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
