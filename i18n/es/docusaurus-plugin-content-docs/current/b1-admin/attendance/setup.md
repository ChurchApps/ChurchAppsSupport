---
title: "Configuración de Asistencia"
---

# Configuración de Asistencia

<div class="article-intro">

Antes de que puedas rastrear asistencia, necesitas decirle a B1 Admin sobre las ubicaciones físicas de tu iglesia, cuándo suceden los servicios, y qué grupos se reúnen en cada servicio. Esta configuración única crea la estructura que impulsa todo el seguimiento y reporte de asistencia en tu iglesia.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Necesitas una cuenta activa de B1 Admin con permiso para manejar asistencia. Consulta [Roles y Permisos](../people/roles-permissions.md) si no estás seguro sobre tu nivel de acceso.
- Si planeas asignar grupos a horarios de servicio, asegúrate de que tus [grupos estén creados](../groups/creating-groups.md) primero.

</div>

## Conceptos Clave

- **Campus** -- una ubicación física donde tu iglesia se reúne (p. ej., "Campus Principal", "Campus Norte"). Los campus se manejan en **Configuración**.
- **Servicio** -- una reunión recurrente en un campus (p. ej., "Servicio Dominical", "Mediados de Semana").
- **Horario de Servicio** -- una hora específica en la que ocurre un servicio (p. ej., "9:00 AM", "11:00 AM").
- **Grupo Programado** -- un grupo asignado a un horario de servicio específico. La asistencia se rastrea en el contexto de ese servicio.
- **Grupo No Programado** -- un grupo que rastrea asistencia por su cuenta, sin estar vinculado a un horario de servicio.

## Configurar tu Estructura de Asistencia

1. Abre **B1 Admin**, haz clic en el **menú de sección** en la esquina superior izquierda (el nombre de la sección con la pequeña flecha), y elige **Personas**.
2. En la barra de navegación, haz clic en la pestaña **Asistencia**. La pestaña **Configuración** está seleccionada por defecto.
3. Haz clic en **Manejar Campus** (arriba a la derecha del panel de Configuración). Esto te lleva a **Configuración → Campus**. Haz clic en **Agregar Campus**, ingresa el nombre de tu ubicación (dirección y zona horaria son opcionales), y haz clic en **Guardar**.
4. Vuelve a **Personas → Asistencia → Configuración**. Tu campus ahora aparece en la tabla de configuración.
5. Haz clic en el **+ botón en la columna Servicio** bajo tu campus. Ingresa un nombre de servicio como "Servicio Dominical" y haz clic en **Guardar**.
6. Haz clic en el **+ botón en la columna Hora** bajo el servicio. Ingresa una hora como "9:00 AM" y haz clic en **Guardar**. Repite para cada horario de servicio.
7. Para conectar un grupo a un horario de servicio, abre el grupo desde la pestaña **Grupos**, haz clic en el lápiz **Editar**, y usa **Agregar Horario de Servicio** -- consulta la siguiente sección.

### Habilitar Rastrear Asistencia en un Grupo

Antes de que se pueda registrar asistencia en un grupo, Rastrear Asistencia debe estar activado para ese grupo.

1. Abre el **menú de sección** en la esquina superior izquierda y elige **Personas**, luego haz clic en la pestaña **Grupos** y selecciona el grupo.
2. Haz clic en el icono lápiz **Editar**.
3. Establece **Rastrear Asistencia** a **Sí**.
4. Haz clic en **Guardar**.

:::tip
Si asignaste el grupo a un horario de servicio en el paso anterior, también usa la opción **Agregar Horario de Servicio** en la pantalla de edición del grupo para vincularlo al servicio correcto. Esto asegura que las sesiones estén conectadas al campus y hora correctos.
:::

:::tip
Si un grupo se reúne fuera de un servicio regular -- como un grupo pequeño entre semana que rastrea su propia asistencia -- puedes dejarlo como un grupo no programado. Seguirá apareciendo en la pestaña Grupos para reportes de asistencia.
:::

## Editar tu Configuración

Puedes actualizar tu configuración en cualquier momento. Selecciona un campus, horario de servicio o grupo y haz clic en **Editar** para cambiar sus detalles, o **Eliminar** para quitarlo.

:::info
Eliminar un horario de servicio no elimina registros de asistencia anteriores. Tus datos históricos se preservan incluso si cambias tu programa.
:::

## Qué Sigue

Una vez que tus campus, horarios de servicio y grupos estén en su lugar, estás listo para comenzar a [registrar asistencia](recording-attendance.md) manualmente o configurar [auto registrarse](check-in.md) para tus servicios.
