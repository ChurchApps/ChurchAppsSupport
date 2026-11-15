---
title: "Configuración de asistencia"
description: "Configure campus, servicios, horarios de servicio y asignaciones de grupos en B1 Admin para que el seguimiento de asistencia y los horarios de registro de entrada funcionen en toda su iglesia."
---

# Configuración de asistencia

<div class="article-intro">

Antes de poder registrar la asistencia, debe indicarle a B1 Admin dónde están las ubicaciones físicas de su iglesia, cuándo se realizan los servicios y qué grupos se reúnen en cada servicio. Esta configuración única crea la estructura que impulsa todo el seguimiento e informes de asistencia de su iglesia.

</div>

## Video de capacitación {#training-video}

<YouTube id="LQPc2gVlXvQ" title="Configuración de servicios y asistencia en B1" next="Configuración del registro de entrada de niños en B1" nextUrl="/docs/b1-admin/guides/childrens-checkin" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita una cuenta activa de B1 Admin con el permiso de asistencia **Editar servicios**. La opción **Configuración** solo aparece para las personas que lo tienen; ver la asistencia por sí solo no es suficiente. Consulte [Roles y permisos](../people/roles-permissions.md) si no está seguro de su nivel de acceso.
- Si planea asignar grupos a horarios de servicio, asegúrese de que primero estén [creados sus grupos](../groups/creating-groups.md).

</div>

## Conceptos clave {#key-concepts}

- **Campus**: una ubicación física donde se reúne su iglesia (por ejemplo, "Campus Principal", "Campus Norte"). Los campus se administran en **Configuración**.
- **Servicio**: una reunión recurrente en un campus (por ejemplo, "Servicio del domingo", "Entre semana").
- **Horario de servicio**: una hora específica en que se realiza un servicio (por ejemplo, "9:00 AM", "11:00 AM").
- **Grupo programado**: un grupo asignado a un horario de servicio específico. La asistencia se registra en el contexto de ese servicio.
- **Grupo no programado**: un grupo que registra su propia asistencia, sin estar vinculado a un horario de servicio.

## Configurar su estructura de asistencia {#setting-up-your-attendance-structure}

1. Abra **B1 Admin**, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda) y despliegue **Personas**.
2. Haga clic en **Asistencia** y luego en **Configuración** en la columna izquierda. Se abre la tabla **Estructura de servicios**, con los totales de sus campus, horarios de servicio, grupos programados y no programados, y el total de grupos en la parte superior. Los totales se actualizan en cuanto añade, edita o elimina algo en la tabla. Cada campus muestra sus servicios, sus horarios y los grupos asignados a cada horario, agrupados por categoría (un equipo de servicio aparece bajo el nombre de su ministerio). Los grupos que registran asistencia pero no tienen horario de servicio aparecen al final, bajo **Sin asignar**.
3. Haga clic en **Administrar campus** (arriba a la derecha del panel **Estructura de servicios**). Esto lo lleva a **Configuración → Campus**. Haga clic en **Añadir campus**, introduzca el nombre de su ubicación (la dirección y la zona horaria son opcionales) y haga clic en **Guardar**.
4. Regrese a **Personas → Asistencia** y haga clic en **Configuración**. Su campus ahora aparece en la tabla de configuración.
5. Haga clic en el **botón + de la columna Servicio** debajo de su campus. Introduzca un nombre de servicio como "Servicio del domingo" y haga clic en **Guardar**.
6. Haga clic en el **botón + de la columna Horario** debajo del servicio. Introduzca un nombre de **Horario de servicio** como "9:00 AM", complete opcionalmente el [horario de registro](#setting-a-check-in-schedule) y haga clic en **Guardar**. Repita este paso para cada horario de servicio.
7. Para conectar un grupo a un horario de servicio, abra el grupo desde **Personas > Grupos**, haga clic en **Editar** y use **Añadir horario de servicio**; consulte la siguiente sección.

### Activar Registrar asistencia en un grupo {#enabling-track-attendance-on-a-group}

Antes de que un grupo pueda registrar asistencia, debe activar Registrar asistencia para ese grupo.

1. En el menú Jump, elija **Personas > Grupos** y seleccione el grupo.
2. Haga clic en el botón **Editar** debajo del nombre del grupo.
3. Configure **Registrar asistencia** en **Sí**.
4. Haga clic en **Guardar**.

:::tip
Si asignó el grupo a un horario de servicio en el paso anterior, use también la opción **Añadir horario de servicio** en la pantalla de edición del grupo para vincularlo al servicio correcto. Esto garantiza que las sesiones se conecten con el campus y la hora correctos.
:::

:::tip
Si un grupo se reúne fuera de un servicio regular, como un grupo pequeño entre semana que registra su propia asistencia, puede dejarlo como grupo no programado. Aun así aparecerá en el informe de **Asistencia por grupo** para el registro de asistencia.
:::

## Configurar un horario de registro de entrada {#setting-a-check-in-schedule}

Cada horario de servicio puede tener un horario de registro de entrada opcional para que el [autoservicio de registro](check-in.md) se abra y cierre por sí solo cada semana. Sin un horario, el registro de ese horario de servicio permanece disponible en cualquier momento (siempre que la sala no esté cerrada por otros motivos, como estar llena).

1. En la vista de **Configuración**, haga clic en el nombre de un horario de servicio en la columna **Horario** (o añada uno nuevo).
2. En **Horario de registro de entrada**, elija el **Día** de la semana en que se reúne el horario de servicio.
3. Establezca la **Hora de inicio** y, opcionalmente, la **Hora de fin**.
4. Introduzca **Abrir registro (minutos antes del inicio)**: por ejemplo, `30` abre el registro media hora antes de que comience el servicio.
5. Introduzca **Cerrar registro (minutos después del fin)**: por ejemplo, `15` mantiene el registro abierto 15 minutos después de la hora de fin. Si no estableció una hora de fin, este valor se cuenta desde la hora de inicio. Si deja en blanco tanto **Hora de fin** como **Cerrar registro**, el registro permanece abierto hasta el final de ese día.
6. Haga clic en **Guardar**.

El horario se repite cada semana y se mide en la zona horaria del campus del servicio. Si ese campus no tiene zona horaria, se usa la [Zona horaria](../settings/church-settings.md#time-zone) de su iglesia; luego, la zona horaria del primer campus que tenga una definida y, por último, la hora del este (America/New_York). Si el registro se abre a una hora incorrecta, revise la **Zona horaria** del campus en [Campus](../settings/campuses.md). Para eliminar un horario, vuelva a poner **Día** en **Sin horario** y haga clic en **Guardar**. Un horario solo entra en vigor cuando se establecen tanto un **Día** como una **Hora de inicio**.

Mientras la ventana de registro de un horario de servicio está cerrada:

- **El autoservicio de registro en B1.church** muestra ese horario como **Cerrado** (o, por ejemplo, **Cerrado · abre dom 9:30 AM**), y no se puede seleccionar. Si ninguno de los horarios de un servicio está abierto, las familias ven cuándo se abre el registro, por ejemplo: "El registro abre dom 9:30 AM".
- **La app del quiosco B1 Checkin** también muestra el horario de servicio como **Cerrado** con la hora en que se abre. Si todos los horarios de un servicio están cerrados, el quiosco indica cuándo se abre el registro para ese servicio. Una persona que ya se registró en un horario de servicio cerrado ve su grupo con **Registrado**. Si una ventana se cierra a mitad de un registro, el quiosco no lo completa y muestra una pantalla **No se puede registrar todavía** con la sala afectada, para que la familia pueda elegir otra.

Un hogar que ya se registró para un horario de servicio anterior puede volver y añadir un horario posterior que esté abierto, incluso después de que la ventana anterior se haya cerrado. Sus registros existentes se conservan.

:::tip
Establezca una ventana de apertura amplia (por ejemplo, 45 minutos antes del inicio) para que las familias y los voluntarios que llegan temprano puedan registrarse, y una ventana de cierre corta para que quienes lleguen tarde aún puedan registrarse una vez comenzado el servicio.
:::

## Editar su configuración {#editing-your-setup}

Puede actualizar su configuración en cualquier momento:

- **Servicios y horarios de servicio**: haga clic en el nombre de un servicio o de un horario de servicio en la tabla para abrir su formulario. Cambie los datos y haga clic en **Guardar**, o haga clic en **Eliminar** para borrarlo.
- **Campus**: haga clic en **Administrar campus** para añadir, renombrar o eliminar campus en **Configuración**.
- **Grupos**: haga clic en el nombre de un grupo para abrirlo y luego en **Editar** para cambiar sus horarios de servicio o activar o desactivar **Registrar asistencia**.

El botón **Registro de entrada en quiosco, QR y etiquetas** en la parte superior de la tabla lo lleva a la [configuración de B1 CheckIn](check-in.md).

:::info
Eliminar un horario de servicio no borra los registros de asistencia anteriores. Sus datos históricos se conservan aunque cambie su horario.
:::

## Lo que sigue {#whats-next}

Una vez que sus campus, horarios de servicio y grupos estén configurados, estará listo para empezar a [registrar la asistencia](recording-attendance.md) manualmente o configurar el [autoservicio de registro de entrada](check-in.md) para sus servicios.
