---
title: "Configuración de Asistencia"
---

# Configuración de Asistencia

<div class="article-intro">

Antes de poder rastrear la asistencia, necesitas decirle a B1 Admin acerca de las ubicaciones físicas de tu iglesia, cuándo suceden los servicios, y qué grupos se reúnen en cada servicio. Esta configuración única crea la estructura que potencia todo el rastreo de asistencia e informes en tu iglesia.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesitas una cuenta activa de B1 Admin con permiso para administrar asistencia. Ver [Roles y Permisos](../people/roles-permissions.md) si no estás seguro de tu nivel de acceso.
- Si planeas asignar grupos a horarios de servicio, asegúrate de que tus [grupos estén creados](../groups/creating-groups.md) primero.

</div>

## Conceptos clave

- **Campus** -- una ubicación física donde tu iglesia se reúne (p. ej., "Campus Principal", "Campus Norte"). Los campus se administran en **Configuración**.
- **Servicio** -- una reunión recurrente en un campus (p. ej., "Servicio de Domingo", "Entre semana").
- **Horario de Servicio** -- una hora específica en que sucede un servicio (p. ej., "9:00 AM", "11:00 AM").
- **Grupo Programado** -- un grupo asignado a un horario de servicio específico. La asistencia se rastrea en el contexto de ese servicio.
- **Grupo No Programado** -- un grupo que rastrea la asistencia por su cuenta, sin estar vinculado a un horario de servicio.

## Configurando tu estructura de asistencia

1. Abre **B1 Admin**, haz clic en el **menú de sección** en la esquina superior izquierda (el nombre de la sección con la pequeña flecha), y elige **Personas**.
2. En la barra de navegación, haz clic en la pestaña **Asistencia**. La pestaña **Configuración** está seleccionada por defecto.
3. Haz clic en **Administrar Campus** (arriba a la derecha del panel de Configuración). Esto te lleva a **Configuración → Campus**. Haz clic en **Agregar Campus**, ingresa el nombre de tu ubicación (dirección y zona horaria son opcionales), y haz clic en **Guardar**.
4. Vuelve a **Personas → Asistencia → Configuración**. Tu campus ahora aparece en la tabla de configuración.
5. Haz clic en el **+ botón en la columna Servicio** bajo tu campus. Ingresa un nombre de servicio como "Servicio de Domingo" y haz clic en **Guardar**.
6. Haz clic en el **+ botón en la columna Hora** bajo el servicio. Ingresa una hora como "9:00 AM" y haz clic en **Guardar**. Repite para cada horario de servicio.
7. Para conectar un grupo a un horario de servicio, abre el grupo desde la pestaña **Grupos**, haz clic en el lápiz **Editar**, y usa **Agregar Horario de Servicio** — ver la siguiente sección.

### Habilitando Rastrear Asistencia en un Grupo

Antes de que la asistencia pueda ser registrada en un grupo, Rastrear Asistencia debe estar activado para ese grupo.

1. Abre el **menú de sección** en la esquina superior izquierda y elige **Personas**, luego haz clic en la pestaña **Grupos** y selecciona el grupo.
2. Haz clic en el icono lápiz **Editar**.
3. Establece **Rastrear Asistencia** en **Sí**.
4. Haz clic en **Guardar**.

:::tip
Si asignaste el grupo a un horario de servicio en el paso anterior, también usa la opción **Agregar Horario de Servicio** en la pantalla de edición del grupo para vincularlo al servicio correcto. Esto asegura que las sesiones se conecten al campus y hora correctos.
:::

:::tip
Si un grupo se reúne fuera de un servicio regular -- como un pequeño grupo entre semana que rastrea su propia asistencia -- puedes dejarlo como un grupo no programado. Aún aparecerá en la pestaña Grupos para reportes de asistencia.
:::

## Editando tu configuración

Puedes actualizar tu configuración en cualquier momento. Selecciona un campus, horario de servicio, o grupo y haz clic en **Editar** para cambiar sus detalles, o **Eliminar** para quitarlo.

:::info
Eliminar un horario de servicio no borra los registros de asistencia pasados. Tus datos históricos se conservan incluso si cambias tu horario.
:::

## Qué sigue

Una vez que tus campus, horarios de servicio, y grupos estén en su lugar, estás listo para comenzar a [registrar asistencia](recording-attendance.md) manualmente o configurar [auto check-in](check-in.md) para tus servicios.
