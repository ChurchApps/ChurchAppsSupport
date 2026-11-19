---
title: "Cómo agregar personas"
description: "Agregue una persona a la base de datos de su iglesia en B1 Admin, complete sus datos y vincule a los miembros de la familia en hogares para el registro de entrada y los informes."
---

# Cómo agregar personas

<div class="article-intro">

La sección People es la base de B1 Admin: es la base de datos de miembros de su iglesia. Todas las demás funciones (grupos, asistencia, donaciones, formularios) se vinculan con los registros de personas. Esta guía le explica cómo agregar a alguien a su base de datos, editar sus datos y vincular a los miembros de la familia en hogares.

</div>

## Video de capacitación {#training-video}

<YouTube id="GtsczJ8JPio" title="Cómo agregar personas y hogares en B1" next="Cómo importar su base de datos de personas en B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita una cuenta activa de B1 Admin con permiso para administrar personas. Consulte [Roles y permisos](roles-permissions.md) si no está seguro de su nivel de acceso.
- Si va a agregar más de unas cuantas personas, considere usar mejor la herramienta de [importación CSV](importing-data.md).

</div>

## Cómo agregar una persona {#adding-a-person}

1. Vaya al panel de administración de B1.church.
2. Abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expanda **People** y haga clic en **People**.
3. Haga clic en el botón **Add Person** en el encabezado de la página. La página se desplazará hasta el formulario **Add a New Person** debajo del directorio.
4. Complete el **First Name** y el **Last Name** de la persona (ambos son obligatorios). Opcionalmente, agregue un **Title**, **Email** y **Mobile Phone**, y luego haga clic en **Add** (o presione **Enter**).

B1 crea un hogar nuevo para la persona, con el nombre de su apellido.

Se abrirá la página de perfil de la persona, lista para que agregue más detalles.

:::tip
Si está migrando desde otro sistema de administración de iglesias, la función [Importar datos](importing-data.md) le permite traer todo su directorio desde un archivo CSV: es mucho más rápido que agregar personas una por una.
:::

### Advertencias de duplicados {#duplicate-warnings}

Cuando escribe un correo electrónico en el formulario **Add a New Person**, B1 busca duplicados antes de guardar. Si la dirección de correo electrónico (o, al crear una persona desde el formulario completo de edición, el número de teléfono o la coincidencia de nombre, apellido y fecha de nacimiento) coincide con alguien que ya está en su base de datos, aparece un cuadro de diálogo **Possible Duplicate** antes de guardar el registro nuevo. Muestra cada persona coincidente con su correo electrónico, teléfono y fecha de nacimiento para que pueda compararlas.

- Haga clic en **Use Existing** junto a una coincidencia para usar el registro de esa persona en lugar de crear uno nuevo.
- Haga clic en **Create Anyway** para agregar a la persona nueva aunque se haya encontrado una posible coincidencia.

Esta verificación solo se realiza al crear una persona nueva: editar un registro existente nunca la activa. Solo evita duplicados nuevos; no combina dos registros que ya existen.

## Cómo editar los datos {#editing-details}

1. En la página de perfil de la persona, haga clic en el botón **Edit** a la izquierda, debajo de la sección **Household**.
2. En el formulario **Personal Details**, complete información adicional como un **Title** (elija Mr, Mrs, Miss, Ms, Dr, Prof, Rev o Pastor de la lista, o escriba el suyo, de hasta 10 caracteres), segundo nombre, apodo, **Name Tag Notes** (se imprimen en las etiquetas de nombre del registro de entrada y se muestran como una etiqueta de advertencia en el perfil), **Donor Number**, estado de membresía (**Visitor**, **Guest**, **Regular Attendee**, **Member**, **Staff**, **Inactive** o **Deceased**), género, estado civil, fecha de nacimiento y aniversario, campus, dirección, números de teléfono con extensiones y (para niños y estudiantes) grado y escuela. Marque **Hide me from the member directory** para excluir a la persona del [directorio impreso](./print-directory.md) y del directorio de miembros de la aplicación. Cualquier [campo personalizado](../settings/custom-fields.md) aparece en **Custom Fields**.
3. Haga clic en **Save** para guardar la información personal, o en **Cancel** para cerrar el formulario sin guardar.

Si cambia la dirección de alguien que comparte hogar con otras personas, B1 le pregunta si quiere usar la nueva dirección para todo el hogar. El formulario también tiene un botón **Delete** (para eliminar a la persona) y una sección **Data Management** para exportar o anonimizar los datos de la persona (consulte [Seguridad de datos](../settings/data-security.md#using-the-data-management-tools)).

El lado izquierdo del perfil muestra la foto, el nombre, la edad, el género, el estado civil, el campus, el estado de membresía, los datos de contacto, los valores de cualquier [campo personalizado](../settings/custom-fields.md) y su hogar. Las etiquetas bajo el nombre indican si la persona **Has login** (tiene una cuenta de B1), está **Hidden from directory** o tiene notas para la etiqueta de nombre. Encima del hogar, **Added** muestra la fecha en que se creó el registro (solo para personas agregadas desde finales de octubre de 2026). Haga clic en la foto para cambiarla. Debajo del hogar están los botones **Edit**, **Email** y **Text** (vea más abajo) y algunas acciones adicionales: **Workflow** (agregar a la persona a un [flujo de trabajo](../serving/workflows.md)), **Merge**, **Export** y **Export Data**. Si la persona pertenece a un hogar, una sección **Pickup** enumera a las personas autorizadas para recoger a los niños en el [registro de entrada](../attendance/checkin-safety.md#trusted-and-not-authorized-pickup-people).

El resto del perfil muestra una sección de resumen para cada tipo de información relacionada:

- **Attendance**: muestra en cuáles de las últimas semanas asistió la persona y sus visitas más recientes. Haga clic en **All years** para ver todo su historial de visitas, incluidos el campus, el servicio, el horario de servicio, el grupo y una columna **Checked In** con la hora del registro de entrada en el quiosco (se muestra un guion en las visitas registradas sin registro de entrada en el quiosco), o en **Print** para imprimirlo (la impresión lleva el logotipo y el nombre de su iglesia centrados en la parte superior, sobre el nombre de la persona). Para tendencias de toda la iglesia en lugar del historial de una persona, consulte [Seguimiento de asistencia](../attendance/tracking-attendance.md)
- **Donations**: muestra los donativos de este año, incluidos los dados a fondos no deducibles. Haga clic en **All years** para ver todo el [historial de donaciones](../donations/recording-donations.md), o en **Log a gift** para registrar uno nuevo. Si su iglesia activó la [Privacidad de donativos](../settings/church-settings.md#giving-privacy), los montos permanecen ocultos hasta que haga clic en **Show giving**
- **Groups**: enumera las [membresías de grupo](../groups/group-members.md) de la persona, con **Joined** y la fecha en que se unió a cada grupo cuando está registrada
- **Notes**: muestra las notas recientes sobre la persona (cuidado pastoral, seguimientos, etc.). Haga clic en **All notes** para leer y agregar notas. Cada nota muestra quién la escribió y la fecha y hora en que se publicó. Para dar formato a una nota, seleccione texto en el cuadro de notas y elija **Bold**, **Italic**, **Bulleted list** o **Numbered list** del pequeño menú emergente (o presione **Ctrl+B** / **Ctrl+I**, **Cmd** en una Mac); la nota muestra el formato una vez publicada. Al borrar una nota se le pedirá que confirme primero, porque no se puede deshacer. Para ver las notas recientes de todas las personas a la vez, use la página de [Notas](./notes.md)
- **Forms**: enumera los formularios de la persona y si cada uno ha sido enviado (consulte [Cómo trabajar con formularios](#working-with-forms) más abajo)
- **Requests & registrations**: enumera las [solicitudes de eventos](../calendars/approvals.md) de salas y recursos de la persona (con las salas o recursos solicitados y **Pending**, **Approved** o **Rejected**) y sus [inscripciones a eventos](../calendars/paid-registrations.md) (con cuántas personas inscribió y **Registered**, **Pending**, **Waitlisted** o **Cancelled**), de la más reciente a la más antigua. Se muestran las cinco más recientes; haga clic en **All requests** para ver la lista completa. Verá las solicitudes de eventos si puede usar la página [Approvals](../calendars/approvals.md), y las inscripciones si puede ver inscripciones; sin ninguno de los dos permisos, la sección se oculta

Cuando abra una de estas vistas completas, haga clic en el enlace **Back to** con el nombre de la persona en la parte superior para volver al perfil.

## Cómo enviar un correo electrónico a una persona {#emailing-a-person}

Si la persona tiene una dirección de correo electrónico registrada, aparece un botón **Email** junto a **Edit**, debajo del hogar en el lado izquierdo del perfil.

1. En el perfil de la persona, haga clic en **Email**.
2. Se abre un cuadro de diálogo **Email** con el nombre de la persona como título, que muestra **Sending to** con la dirección de la persona.
3. Opcionalmente, elija una plantilla guardada en **Load Template (optional)**.
4. Escriba un **Subject** y redacte el mensaje.
5. Haga clic en **Send Email**.

Para escribir el mensaje en su propio programa de correo, haga clic en **Open in my email app**.

:::info
Enviar desde B1 usa las mismas aprobaciones y límites diarios que el correo de grupo. Si su iglesia todavía no ha sido aprobada, el cuadro de diálogo le pide que solicite una revisión; mientras tanto, puede hacer clic en **Open in my email app**. Consulte [Activar el correo de grupo para su iglesia](../groups/group-members.md#turning-on-group-email-for-your-church). Los usuarios sin permiso para editar miembros de grupos pasan directamente a su aplicación de correo al hacer clic en **Email**.
:::

## Cómo enviar un mensaje de texto a una persona {#texting-a-person}

Si su iglesia tiene conectado un [proveedor de mensajes de texto](../settings/church-settings.md#texting), usted tiene permiso para enviar mensajes de texto y la persona tiene un número de teléfono móvil, aparece un botón **Text** junto a **Email**. Haga clic en él, escriba su **Message** y haga clic en **Send**. El cuadro de diálogo muestra el número al que se enviará el mensaje. Consulte [Envío de mensajes de texto a miembros de grupos](../groups/group-members.md#texting-group-members) para saber cómo funcionan los mensajes de texto.

### Recordatorios de texto {#text-reminders}

Los recordatorios de tareas, eventos y servicio solo se envían por mensaje de texto a las personas que activaron los mensajes de texto. Con el mismo proveedor de mensajes de texto, permiso y número de teléfono móvil, el registro de la persona muestra **Text reminders** debajo de su número de teléfono móvil, con **On** u **Off**. Haga clic en **Turn on** para empezar a enviarle recordatorios por mensaje de texto, o en **Turn off** para dejar de enviarlos. Es el mismo interruptor que **Text messages** en las [Preferencias de notificación](../../b1-church/getting-started/notification-preferences.md) de la propia persona, así que cualquiera de los dos puede cambiarlo. Una persona que respondió STOP a los mensajes de su iglesia sigue sin recibir recordatorios por mensaje de texto, incluso con **Text reminders** activado.

## Cómo trabajar con formularios {#working-with-forms}

Puede completar formularios personalizados directamente desde el perfil de una persona. Son formularios definidos por el usuario que puede crear siguiendo la guía [Creación de formularios](../forms/creating-forms.md).

1. En el perfil de la persona, busque la sección **Forms**. Enumera cada formulario junto con si ha sido **Submitted** o **Not submitted**.
2. Haga clic en el nombre de un formulario para abrirlo (o en **All forms** para ver la lista completa).
3. Haga clic en el **icono de editar** (lápiz) del formulario, complete los datos y haga clic en **Save**.

Una vez que se envía un formulario, haga clic en el **icono de imprimir** junto a él para imprimir las respuestas completadas de esa persona. Cuando la persona tiene un solo envío de un formulario, el formulario muestra **Submitted** con la fecha encima de las respuestas.

Si un envío se asignó a la persona equivocada, haga clic en el icono **Change person** (dos flechas) junto a él para moverlo a otra persona o desvincularlo. Consulte [Cómo cambiar la persona de un envío](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Los formularios vinculados al perfil de una persona usan el tipo de formulario **People**. Si necesita un formulario independiente (como una inscripción a un evento), consulte la opción [Formulario independiente](../forms/creating-forms.md) en la guía de formularios.
:::

:::tip
Si solo necesita registrar uno o dos datos adicionales sobre las personas (una fecha, un número, una respuesta de sí o no), use [Campos personalizados](../settings/custom-fields.md) en lugar de un formulario. Son más rápidos de completar y se pueden buscar directamente en la búsqueda avanzada.
:::

## Cómo administrar hogares {#managing-households}

Los hogares le permiten vincular a los miembros de una familia. Esto es especialmente útil para el [registro de entrada](../attendance/check-in.md), donde un padre puede registrar a todos sus hijos a la vez.

1. En el perfil de una persona, haga clic en **Edit** junto al encabezado **Household** a la izquierda.
2. Se abrirá el editor de hogares. Seleccione el **household role** de la persona actual (por ejemplo, Head, Spouse, Child u Other).
3. Haga clic en el icono **Add** para agregar a otro miembro del hogar.
4. Bajo **Add Household Member**, escriba el nombre de la persona en el cuadro de búsqueda y presione **Enter** o haga clic en el icono de búsqueda. (Antes de escribir, se muestra una lista corta de **Recent people**: las personas que eligió más recientemente en cualquier búsqueda de personas, y luego las personas más nuevas en B1).
5. Cuando la persona aparezca en los resultados, haga clic en su nombre o en el icono de agregar junto a él.
6. Elija su household role y haga clic en **Save** para completar la configuración del hogar.

Si la persona todavía no está en B1, haga clic en **Add New Person** debajo de la búsqueda. Junto con el nombre, el título, el correo electrónico y el teléfono móvil, el cuadro de diálogo le pide su **Household Role** (Head, Spouse, Child u Other). La persona nueva se crea y se coloca en este hogar con ese rol; haga clic en **Save** para terminar.
