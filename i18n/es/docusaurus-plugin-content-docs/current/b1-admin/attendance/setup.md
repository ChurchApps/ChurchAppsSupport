---
title: "Configuración de asistencia"
---

# Configuración de asistencia

<div class="article-intro">

Antes de poder dar seguimiento a la asistencia, debe indicarle a B1 Admin las ubicaciones físicas de su iglesia, cuándo se realizan los servicios y qué grupos se reúnen en cada servicio. Esta configuración única crea la estructura que impulsa todo el seguimiento y los informes de asistencia de su iglesia.

</div>

## Video de capacitación

<YouTube id="LQPc2gVlXvQ" title="Configuración de servicios y asistencia en B1" next="Configuración del registro de entrada infantil en B1" nextUrl="/docs/b1-admin/guides/childrens-checkin" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita una cuenta activa de B1 Admin con el permiso de asistencia **Editar servicios**. La opción **Configuración** solo aparece para las personas que lo tienen; ver la asistencia por sí solo no es suficiente. Consulte [Roles y permisos](../people/roles-permissions.md) si no está seguro de su nivel de acceso.
- Si planea asignar grupos a horarios de servicio, asegúrese de que sus [grupos estén creados](../groups/creating-groups.md) primero.

</div>

## Conceptos clave

- **Campus** -- una ubicación física donde su iglesia se reúne (por ejemplo, "Campus principal", "Campus norte"). Los campus se administran en **Configuración**.
- **Servicio** -- una reunión recurrente en un campus (por ejemplo, "Servicio dominical", "Entre semana").
- **Horario de servicio** -- una hora específica en la que se realiza un servicio (por ejemplo, "9:00 a. m.", "11:00 a. m.").
- **Grupo con horario** -- un grupo asignado a un horario de servicio específico. La asistencia se registra en el contexto de ese servicio.
- **Grupo sin horario** -- un grupo que lleva su propia asistencia, sin estar vinculado a un horario de servicio.

## Configuración de su estructura de asistencia

1. Abra **B1 Admin**, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda) y expanda **Personas**.
2. Haga clic en **Asistencia** y luego en **Configuración** en la columna izquierda. Se abre la tabla **Estructura de servicios**, con los conteos de sus campus, horarios de servicio y grupos con y sin horario en la parte superior. Los conteos se actualizan en cuanto agrega, edita o elimina algo en la tabla.
3. Haga clic en **Administrar campus** (en la parte superior derecha del panel **Estructura de servicios**). Esto lo lleva a **Configuración → Campus**. Haga clic en **Agregar campus**, escriba el nombre de su ubicación (la dirección y la zona horaria son opcionales) y haga clic en **Guardar**.
4. Regrese a **Personas → Asistencia** y haga clic en **Configuración**. Su campus ahora aparece en la tabla de configuración.
5. Haga clic en el **botón +, en la columna Servicio**, debajo de su campus. Escriba un nombre de servicio como "Servicio dominical" y haga clic en **Guardar**.
6. Haga clic en el **botón +, en la columna Horario**, debajo del servicio. Escriba un nombre de **Horario de servicio** como "9:00 a. m.", opcionalmente complete el [horario de registro](#setting-a-check-in-schedule) y haga clic en **Guardar**. Repita para cada horario de servicio.
7. Para conectar un grupo con un horario de servicio, abra el grupo desde **Personas > Grupos**, haga clic en **Editar** y use **Agregar horario de servicio** -- consulte la siguiente sección.

### Activar Registrar asistencia en un grupo

Antes de que un grupo pueda tener asistencia registrada, debe activar Registrar asistencia para ese grupo.

1. En el menú Jump, elija **Personas > Grupos** y seleccione el grupo.
2. Haga clic en el botón **Editar** debajo del nombre del grupo.
3. Establezca **Registrar asistencia** en **Sí**.
4. Haga clic en **Guardar**.

:::tip
Si asignó el grupo a un horario de servicio en el paso anterior, use también la opción **Agregar horario de servicio** en la pantalla de edición del grupo para vincularlo con el servicio correcto. Esto garantiza que las sesiones estén conectadas al campus y horario correctos.
:::

:::tip
Si un grupo se reúne fuera de un servicio regular -- como un grupo pequeño entre semana que lleva su propia asistencia -- puede dejarlo como grupo sin horario. Aun así aparecerá en el informe de **Asistencia por grupo** para los informes de asistencia.
:::

## Configurar un horario de registro de entrada {#setting-a-check-in-schedule}

Cada horario de servicio puede tener un horario de registro opcional para que el [autorregistro](check-in.md) se abra y cierre por sí solo cada semana. Sin horario, el registro de entrada para ese horario de servicio permanece disponible en cualquier momento (siempre que el salón no esté cerrado por otras razones, como estar lleno).

1. En la vista de **Configuración**, haga clic en el nombre de un horario de servicio en la columna **Horario** (o agregue uno nuevo).
2. En **Horario de registro**, elija el **Día** de la semana en que se reúne el horario de servicio.
3. Establezca la **Hora de inicio** y, opcionalmente, la **Hora de fin**.
4. Escriba **Abrir registro (minutos antes del inicio)** -- por ejemplo, `30` abre el registro media hora antes de que comience el servicio.
5. Escriba **Cerrar registro (minutos después del fin)** -- por ejemplo, `15` mantiene el registro abierto durante 15 minutos después de la hora de fin. Si no configuró una hora de fin, este tiempo se cuenta a partir de la hora de inicio.
6. Haga clic en **Guardar**.

El horario se repite cada semana y se mide en la zona horaria del campus del servicio. Si ese campus no tiene zona horaria, se usa la [Zona horaria](../settings/church-settings.md#time-zone) de su iglesia; si tampoco la tiene, la zona horaria de su primer campus que la tenga; y por último, la hora del este (America/New_York). Si el registro se abre a una hora incorrecta, revise la **Zona horaria** del campus en [Campus](../settings/campuses.md). Para eliminar un horario, cambie **Día** a **Sin horario** y haga clic en **Guardar**. Un horario solo entra en vigor cuando se establecen tanto un **Día** como una **Hora de inicio**.

Mientras la ventana de registro de un horario de servicio está cerrada:

- **El autorregistro en B1.church** muestra ese horario de servicio como **Cerrado** (o, por ejemplo, **Cerrado · abre dom 9:30 a. m.**) y no se puede seleccionar. Si ninguno de los horarios de un servicio está abierto, las familias ven cuándo se abre el registro, por ejemplo, "El registro abre dom 9:30 a. m."
- **La aplicación de quiosco B1 Checkin** también muestra el horario de servicio como **Cerrado** con la hora en que se abre. Si todos los horarios de un servicio están cerrados, el quiosco indica cuándo se abre el registro para ese servicio. Alguien que ya registró su entrada en un horario de servicio cerrado ve a su grupo con **Registrado** en su lugar. Si una ventana se cierra a mitad de un registro, el quiosco no lo completará y muestra una pantalla de **No se puede registrar todavía** con el salón afectado, para que la familia pueda elegir otro.

Un hogar que ya registró su entrada para un horario de servicio anterior puede volver a registrarse y agregar un horario de servicio posterior que esté abierto, incluso después de que cerró la ventana anterior. Sus registros de entrada existentes se conservan.

:::tip
Configure una ventana de apertura amplia (por ejemplo, 45 minutos antes del inicio) para que las familias y los voluntarios que lleguen temprano puedan registrarse, y una ventana de cierre corta para que quienes lleguen tarde puedan registrarse una vez que el servicio haya comenzado.
:::

## Editar su configuración

Puede actualizar su configuración en cualquier momento. Seleccione un campus, horario de servicio o grupo y haga clic en **Editar** para cambiar sus detalles, o en **Eliminar** para quitarlo.

:::info
Eliminar un horario de servicio no borra los registros de asistencia anteriores. Sus datos históricos se conservan aunque cambie su horario.
:::

## Qué sigue

Una vez que sus campus, horarios de servicio y grupos estén listos, puede empezar a [registrar la asistencia](recording-attendance.md) manualmente o configurar el [autorregistro de entrada](check-in.md) para sus servicios.
