---
title: "Configuración de Asistencia"
---

# Configuración de Asistencia

<div class="article-intro">

Antes de que puedas rastrear asistencia, necesitas informarle a B1 Admin sobre las ubicaciones físicas de tu iglesia, cuándo suceden los servicios y qué grupos se reúnen en cada servicio. Esta configuración única crea la estructura que potencia todo el seguimiento de asistencia e informes en tu iglesia.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Necesitas una cuenta activa de B1 Admin con permiso para administrar asistencia. Ver [Roles y Permisos](../people/roles-permissions.md) si no estás seguro de tu nivel de acceso.
- Si planeas asignar grupos a horarios de servicio, asegúrate de que tus [grupos estén creados](../groups/creating-groups.md) primero.

</div>

## Conceptos Clave

- **Sede** -- una ubicación física donde tu iglesia se reúne (ej., "Sede Principal", "Sede Norte"). Las sedes se administran en **Configuración**.
- **Servicio** -- una reunión recurrente en una sede (ej., "Servicio Dominical", "Entre Semana").
- **Horario de Servicio** -- una hora específica en la que sucede un servicio (ej., "9:00 AM", "11:00 AM").
- **Grupo Programado** -- un grupo asignado a un horario de servicio específico. La asistencia se rastrea en el contexto de ese servicio.
- **Grupo No Programado** -- un grupo que rastrea asistencia por su cuenta, sin estar vinculado a un horario de servicio.

## Configurar Tu Estructura de Asistencia

1. Abre **B1 Admin**, haz clic en el **menú de sección** en la esquina superior izquierda (el nombre de la sección con la flecha pequeña), y elige **Personas**.
2. En la barra de navegación, haz clic en la pestaña **Asistencia**. La pestaña **Configuración** está seleccionada de forma predeterminada.
3. Haz clic en **Administrar Sedes** (esquina superior derecha del panel Configuración). Esto te lleva a **Configuración → Sedes**. Haz clic en **Agregar Sede**, ingresa el nombre de tu ubicación (la dirección y zona horaria son opcionales), y haz clic en **Guardar**.
4. Regresa a **Personas → Asistencia → Configuración**. Tu sede ahora aparece en la tabla de configuración.
5. Haz clic en el **botón + en la columna Servicio** bajo tu sede. Ingresa un nombre de servicio como "Servicio Dominical" y haz clic en **Guardar**.
6. Haz clic en el **botón + en la columna Hora** bajo el servicio. Ingresa una hora como "9:00 AM" y haz clic en **Guardar**. Repite para cada horario de servicio.
7. Para conectar un grupo a un horario de servicio, abre el grupo desde la pestaña **Grupos**, haz clic en el lápiz **Editar**, y usa **Agregar Horario de Servicio** — ver la siguiente sección.

### Habilitar Rastreo de Asistencia en un Grupo

Antes de que un grupo pueda tener asistencia registrada, Track Attendance debe estar activado para ese grupo.

1. Haz clic en **Grupos** en la barra lateral y selecciona el grupo.
2. Haz clic en el icono de lápiz **Editar**.
3. Establece **Rastrear Asistencia** en **Sí**.
4. Haz clic en **Guardar**.

:::tip
Si asignaste el grupo a un horario de servicio en el paso anterior, también usa la opción **Agregar Horario de Servicio** en la pantalla de edición del grupo para vincularlo al servicio correcto. Esto asegura que las sesiones estén conectadas a la sede y hora correctas.
:::

:::tip
Si un grupo se reúne fuera de un servicio regular -- como un pequeño grupo entre semana que rastrea su propia asistencia -- puedes dejarlo como un grupo no programado. Aún aparecerá en la pestaña Grupos para reportes de asistencia.
:::

## Editar Tu Configuración

Puedes actualizar tu configuración en cualquier momento. Selecciona una sede, horario de servicio o grupo y haz clic en **Editar** para cambiar sus detalles, o **Eliminar** para quitarlo.

:::info
Eliminar un horario de servicio no elimina registros de asistencia pasados. Tus datos históricos se conservan incluso si cambias tu horario.
:::

## Qué Viene Después

Una vez que tus sedes, horarios de servicio y grupos estén en su lugar, estás listo para comenzar a [registrar asistencia](recording-attendance.md) manualmente o configurar [auto-registración](check-in.md) para tus servicios.
