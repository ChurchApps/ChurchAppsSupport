---
title: "Agregar personas"
---

# Agregar personas

<div class="article-intro">

La sección People es la base de B1 Admin: es la base de datos de miembros de tu iglesia. Todas las demás funciones (grupos, asistencia, donaciones, formularios) se vinculan a los registros de personas. Esta guía te explica cómo agregar a alguien a tu base de datos, editar sus datos y vincular a los miembros de una familia en hogares.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesitas una cuenta activa de B1 Admin con permiso para administrar personas. Consulta [Roles y permisos](roles-permissions.md) si no estás seguro de tu nivel de acceso.
- Si vas a agregar más de unas pocas personas, considera usar la herramienta de [importación CSV](importing-data.md) en su lugar.

</div>

## Agregar una persona

1. Ve al panel de administración de B1.church.
2. Abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expande **People** y haz clic en **People**.
3. Haz clic en el botón **Add Person** en el encabezado de la página. La página se desplaza hasta el formulario **Add New Person**, debajo del directorio.
4. Escribe el **First Name**, el **Last Name** y el **Email** de la persona, y luego haz clic en **Add**.

Se abrirá la página de perfil de la persona, lista para que agregues más datos.

:::tip
Si vienes de otro sistema de gestión de iglesias, la función [Import Data](importing-data.md) te permite traer todo tu directorio desde un archivo CSV, mucho más rápido que agregar personas una por una.
:::

### Advertencias de duplicados

Si la dirección de correo electrónico (o, al crear una persona desde el formulario completo de edición, el número de teléfono o la coincidencia de nombre, apellido y fecha de nacimiento) coincide con alguien que ya está en tu base de datos, aparece un cuadro de diálogo **Possible Duplicate** antes de guardar el nuevo registro. Muestra cada persona coincidente con su correo electrónico, teléfono y fecha de nacimiento para que puedas compararlos.

- Haz clic en **Use Existing** junto a una coincidencia para usar el registro de esa persona en lugar de crear uno nuevo.
- Haz clic en **Create Anyway** para agregar a la nueva persona aunque se haya encontrado una posible coincidencia.

Esta verificación solo se realiza al crear una persona nueva; editar un registro existente nunca la activa. Solo evita nuevos duplicados; no combina dos registros que ya existen.

## Editar los datos

1. En la página de perfil de la persona, haz clic en el botón **Edit** debajo de sus datos de contacto, a la izquierda.
2. En el formulario **Personal Details**, completa información adicional como el segundo nombre, el estado de membresía (**Visitor**, **Guest**, **Regular Attendee**, **Member**, **Staff**, **Inactive** o **Deceased**), fechas, dirección, números de teléfono y, para niños y estudiantes, el grado y la escuela.
3. Haz clic en **Save** para guardar la información personal.

El lado izquierdo del perfil muestra la foto, el nombre, el estado de membresía, los datos de contacto, los valores de cualquier [campo personalizado](../settings/custom-fields.md) y su hogar. Haz clic en la foto para cambiarla. Debajo del botón **Edit** hay algunas acciones más: **Workflow** (agrega a la persona a un [flujo de trabajo](../serving/workflows.md)), **Merge**, **Export** y **Export Data**.

El resto del perfil muestra una sección de resumen para cada tipo de información relacionada:

- **Attendance** — Muestra en cuáles de las últimas semanas asistió la persona y sus visitas más recientes. Haz clic en **All years** para ver todo su historial de visitas, incluidos la sede, el servicio, el horario de servicio, el grupo y una columna **Checked In** con la hora de registro en el kiosco (se muestra un guion en las visitas registradas sin registro en el kiosco), o en **Print** para imprimirlo. Para ver tendencias de toda la iglesia en lugar del historial de una sola persona, consulta [Seguimiento de la asistencia](../attendance/tracking-attendance.md)
- **Donations** — Muestra las ofrendas de este año, incluidas las ofrendas a fondos no deducibles. Haz clic en **All years** para ver todo su [historial de donaciones](../donations/recording-donations.md), o en **Log a gift** para registrar una nueva. Si tu iglesia activó [Giving Privacy](../settings/church-settings.md#giving-privacy), los montos permanecen ocultos hasta que hagas clic en **Show giving**
- **Groups** — Enumera las [membresías de grupo](../groups/group-members.md) de la persona
- **Notes** — Muestra notas recientes sobre la persona (cuidado pastoral, seguimientos, etc.). Haz clic en **All notes** para leer y agregar notas
- **Forms** — Enumera los formularios de la persona y si cada uno ha sido enviado (consulta [Trabajar con formularios](#trabajar-con-formularios) más abajo)

Cuando abras una de estas vistas completas, haz clic en el enlace **Back to** con el nombre de la persona en la parte superior para volver al perfil.

## Enviar un correo electrónico a una persona

Si la persona tiene una dirección de correo electrónico registrada, aparece un botón **Email** debajo de sus datos de contacto, a la izquierda del perfil.

1. En el perfil de la persona, haz clic en **Email**.
2. Se abre un cuadro de diálogo **Email** con el nombre de la persona en el título, que muestra **Sending to** con la dirección de la persona.
3. Opcionalmente, elige una plantilla guardada en **Load Template (optional)**.
4. Escribe un **Subject** y redacta el mensaje.
5. Haz clic en **Send Email**.

Para redactar el mensaje en tu propio programa de correo, haz clic en **Open in my email app**.

:::info
Enviar desde B1 utiliza los mismos límites de aprobación y diarios que el correo de grupo. Si tu iglesia todavía no ha sido aprobada, el cuadro de diálogo te pide que solicites una revisión; mientras tanto, puedes hacer clic en **Open in my email app**. Consulta [Activar el correo de grupo para tu iglesia](../groups/group-members.md#turning-on-group-email-for-your-church). Los usuarios sin permiso para editar miembros de grupos van directamente a su aplicación de correo al hacer clic en **Email**.
:::

## Trabajar con formularios

Puedes completar formularios personalizados directamente desde el perfil de una persona. Son formularios definidos por el usuario que puedes crear siguiendo la guía [Crear formularios](../forms/creating-forms.md).

1. En el perfil de la persona, busca la sección **Forms**. Enumera cada formulario junto con si ha sido **Submitted** o **Not submitted**.
2. Haz clic en el nombre de un formulario para abrirlo (o en **All forms** para ver la lista completa).
3. Haz clic en el **icono de edición** (lápiz) del formulario, completa los datos y haz clic en **Save**.

Una vez que se envía un formulario, haz clic en el **icono de impresora** junto a él para imprimir las respuestas completadas de esa persona.

Si una respuesta se asignó a la persona equivocada, haz clic en el icono **Change person** (dos flechas) junto a ella para moverla a otra persona o desvincularla. Consulta [Cambiar la persona de una respuesta](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Los formularios vinculados al perfil de una persona usan el tipo de formulario **People**. Si necesitas un formulario independiente (como una inscripción a un evento), consulta la opción [Stand Alone](../forms/creating-forms.md) en la guía de formularios.
:::

:::tip
Si solo necesitas registrar uno o dos datos adicionales sobre las personas (una fecha, un número, una respuesta de sí/no), usa [Campos personalizados](../settings/custom-fields.md) en lugar de un formulario. Son más rápidos de completar y se pueden buscar directamente en la búsqueda avanzada.
:::

## Gestionar hogares

Los hogares te permiten vincular a los miembros de una familia. Esto es especialmente útil para el [registro de entrada](../attendance/check-in.md), donde un padre puede registrar a todos sus hijos a la vez.

1. En el perfil de una persona, haz clic en **Edit** junto al encabezado **Household**, a la izquierda.
2. Se abrirá el editor de hogares. Selecciona el **household role** de la persona actual (por ejemplo, Head, Spouse, Child u Other).
3. Haz clic en el icono **Add** para agregar a otro miembro del hogar.
4. En **Add Household Member**, escribe el nombre de la persona en el cuadro de búsqueda y presiona **Enter** o haz clic en el icono de búsqueda. (Antes de escribir, se muestra una lista corta de **Recent people**).
5. Cuando la persona aparezca en los resultados, haz clic en su nombre o en el icono de agregar junto a él.
6. Elige su rol en el hogar y haz clic en **Save** para completar la configuración del hogar.
