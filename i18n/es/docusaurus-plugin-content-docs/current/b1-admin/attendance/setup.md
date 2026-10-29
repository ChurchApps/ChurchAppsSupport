---
title: "Configuración de asistencia"
---

# Configuración de asistencia

<div class="article-intro">

Antes de poder dar seguimiento a la asistencia, debe indicarle a B1 Admin las ubicaciones físicas de su iglesia, cuándo se realizan los servicios y qué grupos se reúnen en cada servicio. Esta configuración única crea la estructura que alimenta todo el seguimiento e informes de asistencia de su iglesia.

</div>

## Video de capacitación

<YouTube id="LQPc2gVlXvQ" title="Setting Up Services and Attendance in B1" next="Setting Up Children's Check-In in B1" nextUrl="/docs/b1-admin/guides/childrens-checkin" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita una cuenta activa de B1 Admin con permiso para administrar la asistencia. Consulte [Roles y permisos](../people/roles-permissions.md) si no está seguro de su nivel de acceso.
- Si planea asignar grupos a horarios de servicio, asegúrese de que sus [grupos estén creados](../groups/creating-groups.md) primero.

</div>

## Conceptos clave

- **Campus**: una ubicación física donde se reúne su iglesia (por ejemplo, "Campus principal", "Campus norte"). Los campus se administran en **Configuración**.
- **Servicio**: una reunión recurrente en un campus (por ejemplo, "Servicio del domingo", "Entre semana").
- **Horario de servicio**: una hora específica en que se realiza un servicio (por ejemplo, "9:00 a. m.", "11:00 a. m.").
- **Grupo programado**: un grupo asignado a un horario de servicio específico. La asistencia se registra en el contexto de ese servicio.
- **Grupo no programado**: un grupo que registra su propia asistencia, sin estar vinculado a un horario de servicio.

## Configurar su estructura de asistencia

1. Abra **B1 Admin**, abra el [menú de salto](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda) y despliegue **Personas**.
2. Haga clic en **Asistencia** y luego en **Configuración** en la columna izquierda. Se abre la tabla **Estructura de servicios**, con el conteo de sus campus, horarios de servicio y grupos programados y no programados en la parte superior. Los conteos se actualizan en cuanto agrega, edita o elimina algo en la tabla.
3. Haga clic en **Administrar campus** (arriba a la derecha del panel **Estructura de servicios**). Esto le lleva a **Configuración → Campus**. Haga clic en **Agregar campus**, escriba el nombre de su ubicación (la dirección y la zona horaria son opcionales) y haga clic en **Guardar**.
4. Regrese a **Personas → Asistencia** y haga clic en **Configuración**. Su campus ahora aparece en la tabla de configuración.
5. Haga clic en el **botón +** de la columna **Servicio** bajo su campus. Escriba un nombre de servicio como "Servicio del domingo" y haga clic en **Guardar**.
6. Haga clic en el **botón +** de la columna **Hora** bajo el servicio. Escriba un nombre de **Horario de servicio** como "9:00 a. m.", opcionalmente complete el [horario de registro](#setting-a-check-in-schedule) y haga clic en **Guardar**. Repita para cada horario de servicio.
7. Para conectar un grupo a un horario de servicio, abra el grupo desde **Personas > Grupos**, haga clic en **Editar** y use **Agregar horario de servicio**. Vea la siguiente sección.

### Activar el seguimiento de asistencia en un grupo

Antes de que un grupo pueda registrar asistencia, debe activarse el seguimiento de asistencia para ese grupo.

1. En el menú de salto, elija **Personas > Grupos** y seleccione el grupo.
2. Haga clic en el botón **Editar** debajo del nombre del grupo.
3. Configure **Seguimiento de asistencia** en **Sí**.
4. Haga clic en **Guardar**.

:::tip
Si asignó el grupo a un horario de servicio en el paso anterior, use también la opción **Agregar horario de servicio** en la pantalla de edición del grupo para vincularlo al servicio correcto. Esto asegura que las sesiones se conecten con el campus y horario correctos.
:::

:::tip
Si un grupo se reúne fuera de un servicio regular, como un grupo pequeño entre semana que lleva su propia asistencia, puede dejarlo como grupo no programado. Igual aparecerá en el informe **Asistencia por grupo** para los informes de asistencia.
:::

## Configurar un horario de registro

Cada horario de servicio puede tener un horario de registro opcional para que el [autorregistro](check-in.md) se abra y cierre por sí solo cada semana. Sin horario, el registro de ese horario de servicio permanece disponible en cualquier momento (siempre que el salón no esté cerrado por otras razones, como estar lleno).

1. En la vista **Configuración**, haga clic en el nombre de un horario de servicio en la columna **Hora** (o agregue uno nuevo).
2. En **Horario de registro**, elija el **Día** de la semana en que se reúne el horario de servicio.
3. Configure la **Hora de inicio** y, opcionalmente, la **Hora de fin**.
4. Escriba **Abrir registro (minutos antes del inicio)**: por ejemplo, `30` abre el registro media hora antes de que comience el servicio.
5. Escriba **Cerrar registro (minutos después del fin)**: por ejemplo, `15` mantiene el registro abierto 15 minutos después de la hora de fin. Si no configuró una hora de fin, se cuenta desde la hora de inicio.
6. Haga clic en **Guardar**.

El horario se repite cada semana y se mide en la zona horaria del campus del servicio. Si ese campus no tiene zona horaria, se usa la [Zona horaria](../settings/church-settings.md#time-zone) de su iglesia; luego, la zona horaria de su primer campus que tenga una; y finalmente, la hora del este (America/New_York). Si el registro se abre a una hora incorrecta, revise la **Zona horaria** del campus en [Campus](../settings/campuses.md). Para eliminar un horario, cambie **Día** a **Sin horario** y haga clic en **Guardar**. Un horario solo se aplica cuando se configuran tanto **Día** como **Hora de inicio**.

Mientras la ventana de registro de un horario de servicio está cerrada:

- **El autorregistro en B1.church** muestra ese horario de servicio como **Cerrado** (o, por ejemplo, **Cerrado · abre dom 9:30 a. m.**) y no se puede seleccionar. Si ninguno de los horarios de un servicio está abierto, las familias ven cuándo se abre el registro, por ejemplo: "El registro abre el dom 9:30 a. m."
- **La aplicación del quiosco B1 Checkin** también muestra el horario de servicio como **Cerrado** con la hora en que se abre. Si todos los horarios de un servicio están cerrados, el quiosco indica cuándo se abre el registro para ese servicio. Alguien que ya se registró en un horario de servicio cerrado ve su grupo con **Registrado** en su lugar. Si una ventana se cierra durante un registro, el quiosco no lo completa y muestra una pantalla de **No se puede registrar todavía** que lista el salón afectado para que la familia pueda elegir otro.

Un hogar que ya se registró para un horario de servicio anterior aún puede volver y agregar un horario de servicio posterior que esté abierto, incluso después de que cerró la ventana anterior. Sus registros existentes se conservan.

:::tip
Configure una ventana de apertura amplia (por ejemplo, 45 minutos antes del inicio) para que las familias y voluntarios que llegan temprano puedan registrarse, y una ventana de cierre corta para que quienes lleguen tarde puedan registrarse una vez que el servicio haya comenzado.
:::

## Editar su configuración

Puede actualizar su configuración en cualquier momento. Seleccione un campus, horario de servicio o grupo y haga clic en **Editar** para cambiar sus detalles, o en **Eliminar** para quitarlo.

:::info
Eliminar un horario de servicio no borra los registros de asistencia pasados. Sus datos históricos se conservan aunque cambie su horario.
:::

## Qué sigue

Una vez que sus campus, horarios de servicio y grupos estén listos, puede empezar a [registrar la asistencia](recording-attendance.md) manualmente o configurar el [autorregistro](check-in.md) para sus servicios.
