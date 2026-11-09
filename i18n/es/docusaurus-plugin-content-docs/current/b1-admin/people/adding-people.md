---
title: "Agregar personas"
description: "Agregue una persona a la base de datos de su iglesia en B1 Admin, complete sus datos y vincule a los miembros de la familia en hogares para el registro de entrada y los informes."
---

# Agregar personas

<div class="article-intro">

La sección People es la base de B1 Admin: es la base de datos de miembros de su iglesia. Todas las demás funciones (grupos, asistencia, donaciones, formularios) se conectan con los registros de personas. Esta guía le explica cómo agregar a alguien a su base de datos, editar sus datos y vincular a los miembros de la familia en hogares.

</div>

## Video de capacitación

<YouTube id="GtsczJ8JPio" title="Agregar personas y hogares en B1" next="Importar su base de datos de personas en B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita una cuenta activa de B1 Admin con permiso para administrar personas. Consulte [Roles y permisos](roles-permissions.md) si no está seguro de su nivel de acceso.
- Si va a agregar más de unas cuantas personas, considere usar la herramienta de [importación CSV](importing-data.md) en su lugar.

</div>

## Agregar una persona

1. Vaya al panel de administración de B1.church.
2. Abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda), expanda **People** y haga clic en **People**.
3. Haga clic en el botón **Add Person** en el encabezado de la página. La página se desplaza hasta el formulario **Add New Person** debajo del directorio.
4. Complete el **First Name** y el **Last Name** de la persona y, opcionalmente, su **Title** (elija una sugerencia como Sr., Sra., Dr. o Pastor, o escriba la suya, de hasta 10 caracteres), **Email** y **Mobile Phone**, y luego haga clic en **Add**.

Se abrirá la página de perfil de la persona, lista para que agregue más detalles.

:::tip
Si está migrando desde otro sistema de gestión de iglesias, la función [Import Data](importing-data.md) le permite traer todo su directorio desde un archivo CSV, mucho más rápido que agregar personas una por una.
:::

### Advertencias de duplicados

Si la dirección de correo electrónico (o, al crear una persona desde el formulario completo de edición, el teléfono o una coincidencia de nombre, apellidos y fecha de nacimiento) coincide con alguien que ya está en su base de datos, aparece un cuadro de diálogo **Possible Duplicate** antes de guardar el nuevo registro. Muestra cada persona coincidente con su correo electrónico, teléfono y fecha de nacimiento para que pueda compararlos.

- Haga clic en **Use Existing** junto a una coincidencia para usar el registro de esa persona en lugar de crear uno nuevo.
- Haga clic en **Create Anyway** para agregar a la nueva persona aunque se haya encontrado una posible coincidencia.

La comprobación de duplicados solo se realiza al crear una persona nueva; editar un registro existente nunca la activa. Sirve para evitar duplicados nuevos; no fusiona dos registros que ya existen.

## Editar datos {#editing-details}

1. En la página de perfil de la persona, haga clic en el botón **Edit** debajo de sus datos de contacto, a la izquierda.
2. En el formulario **Personal Details**, complete información adicional como el **Title** (elija Mr, Mrs, Miss, Ms, Dr, Prof, Rev o Pastor de la lista, o escriba el suyo, de hasta 10 caracteres), el segundo nombre, el estado de membresía (**Visitor**, **Guest**, **Regular Attendee**, **Member**, **Staff**, **Inactive** o **Deceased**), las fechas, la dirección, los teléfonos y, para niños y estudiantes, el grado y la escuela.
3. Haga clic en **Save** para guardar los datos personales.

El lado izquierdo del perfil muestra la foto, el nombre, el estado de membresía, los datos de contacto, los valores de cualquier [campo personalizado](../settings/custom-fields.md) y el hogar de la persona. Debajo del hogar, **Added** muestra la fecha en que se creó el registro (solo para las personas agregadas desde finales de octubre de 2026). Haga clic en la foto para cambiarla. Debajo del botón **Edit** hay algunas acciones más: **Workflow** (agregar a la persona a un [flujo de trabajo](../serving/workflows.md)), **Merge**, **Export** y **Export Data**.

El resto del perfil muestra una sección de resumen para cada tipo de información relacionada:

- **Attendance** -- Muestra en cuáles de las últimas semanas asistió la persona y sus visitas más recientes. Haga clic en **All years** para ver su historial completo de visitas, con el campus, el servicio, el horario de servicio, el grupo y una columna **Checked In** con la hora del registro en el quiosco (se muestra un guion en las visitas registradas sin registro en el quiosco), o en **Print** para imprimirlo (la impresión lleva el logotipo y el nombre de su iglesia centrados en la parte superior, encima del nombre de la persona). Para ver las tendencias de toda la iglesia en lugar del historial de una persona, consulte [Seguimiento de la asistencia](../attendance/tracking-attendance.md).
- **Donations** -- Muestra los donativos de este año, incluidos los destinados a fondos no deducibles. Haga clic en **All years** para ver su [historial de donaciones](../donations/recording-donations.md) completo, o en **Log a gift** para registrar uno nuevo. Si su iglesia activó la [privacidad de donaciones](../settings/church-settings.md#giving-privacy), los montos permanecen ocultos hasta que haga clic en **Show giving**.
- **Groups** -- Enumera las [membresías de grupo](../groups/group-members.md) de la persona, con **Joined** y la fecha en que se unió a cada grupo cuando está registrada.
- **Notes** -- Muestra las notas recientes sobre la persona (atención pastoral, seguimientos, etc.). Haga clic en **All notes** para leer y agregar notas. Cada nota muestra quién la escribió y la fecha y hora en que se publicó. Para ver las notas recientes de todas las personas a la vez, use la página de [Notas](./notes.md).
- **Forms** -- Enumera los formularios de la persona y si cada uno se ha enviado (consulte [Trabajar con formularios](#working-with-forms) más abajo).
- **Requests & registrations** -- Enumera las [solicitudes de sala y recurso](../calendars/approvals.md) de la persona (con las salas o recursos solicitados y **Pending**, **Approved** o **Rejected**) y sus [inscripciones a eventos](../calendars/paid-registrations.md) (con cuántas personas inscribió y **Registered**, **Pending**, **Waitlisted** o **Cancelled**), de la más reciente a la más antigua. Se muestran las cinco últimas; haga clic en **All requests** para ver la lista completa. Verá las solicitudes de eventos si puede usar la página de [Approvals](../calendars/approvals.md), y las inscripciones si puede ver las inscripciones; si no tiene ninguno de los dos permisos, la sección no aparece.

Cuando abra una de estas vistas completas, haga clic en el enlace **Back to** con el nombre de la persona en la parte superior para volver al perfil.

## Enviar un correo electrónico a una persona

Si la persona tiene una dirección de correo electrónico registrada, aparece un botón **Email** debajo de sus datos de contacto, a la izquierda del perfil.

1. En el perfil de la persona, haga clic en **Email**.
2. Se abre un cuadro de diálogo **Email** con el nombre de la persona en el título, que muestra **Sending to** con su dirección.
3. Opcionalmente, elija una plantilla guardada en **Load Template (optional)**.
4. Escriba un **Subject** y redacte el mensaje.
5. Haga clic en **Send Email**.

Para redactar el mensaje en su propio programa de correo, haga clic en **Open in my email app**.

:::info
Enviar desde B1 usa las mismas aprobaciones y límites diarios que el correo de grupo. Si su iglesia todavía no ha sido aprobada, el cuadro de diálogo le pide solicitar una revisión; mientras tanto, puede hacer clic en **Open in my email app**. Consulte [Activar el correo de grupo para su iglesia](../groups/group-members.md#turning-on-group-email-for-your-church). Los usuarios sin permiso para editar los miembros de los grupos pasan directamente a su aplicación de correo al hacer clic en **Email**.
:::

## Trabajar con formularios {#working-with-forms}

Puede completar formularios personalizados directamente desde el perfil de una persona. Son formularios definidos por el usuario que puede crear siguiendo la guía de [Creación de formularios](../forms/creating-forms.md).

1. En el perfil de la persona, busque la sección **Forms**. Enumera cada formulario junto con si se ha **Submitted** o si está **Not submitted**.
2. Haga clic en el nombre de un formulario para abrirlo (o en **All forms** para ver la lista completa).
3. Haga clic en el **icono de editar** (lápiz) del formulario, complete los datos y haga clic en **Save**.

Una vez enviado un formulario, haga clic en el **icono de imprimir** junto a él para imprimir las respuestas de esa persona. Cuando la persona tiene un único envío de un formulario, este muestra **Submitted** con la fecha encima de las respuestas.

Si un envío quedó asociado a la persona equivocada, haga clic en el icono **Change person** (dos flechas) junto a él para moverlo a otra persona o desvincularlo. Consulte [Cambiar la persona de un envío](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Los formularios vinculados al perfil de una persona usan el tipo de formulario **People**. Si necesita un formulario independiente (como una inscripción a un evento), consulte la [opción de formulario Stand Alone](../forms/creating-forms.md) en la guía de formularios.
:::

:::tip
Si solo necesita registrar uno o dos datos adicionales sobre las personas (una fecha, un número, una respuesta de sí o no), use [Campos personalizados](../settings/custom-fields.md) en lugar de un formulario. Son más rápidos de completar y se pueden buscar directamente en la búsqueda avanzada.
:::

## Administrar hogares {#managing-households}

Los hogares le permiten vincular a los miembros de una familia. Esto resulta especialmente útil para el [registro de entrada](../attendance/check-in.md), donde un padre o una madre puede registrar a todos sus hijos a la vez.

1. En el perfil de una persona, haga clic en **Edit** junto al encabezado **Household**, a la izquierda.
2. Se abre el editor de hogares. Seleccione el **household role** de la persona actual (por ejemplo, Head, Spouse, Child u Other).
3. Haga clic en el icono **Add** para añadir otro miembro del hogar.
4. En **Add Household Member**, escriba el nombre de la persona en el cuadro de búsqueda y presione **Enter** o haga clic en el icono de búsqueda. (Antes de escribir, se muestra una lista corta de **Recent people**: las personas que eligió más recientemente en cualquier búsqueda y luego las personas nuevas de B1.)
5. Cuando la persona aparezca en los resultados, haga clic en su nombre o en el icono de agregar junto a él.
6. Elija su rol en el hogar y haga clic en **Save** para completar la configuración del hogar.

Si la persona todavía no está en B1, haga clic en **Add New Person** debajo de la búsqueda. Además del nombre, el título, el correo electrónico y el teléfono móvil, el cuadro de diálogo pide su **Household Role** (Head, Spouse, Child u Other). La nueva persona se crea y se coloca en este hogar con ese rol; haga clic en **Save** para terminar.
