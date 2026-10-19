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
2. Abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expande **Personas** y haz clic en **Personas**.
3. Haz clic en el botón **Agregar persona** en el encabezado de la página. La página se desplaza hasta el formulario **Agregar nueva persona**, debajo del directorio.
4. Escribe el **Nombre**, el **Apellido** y el **Correo electrónico** de la persona, y luego haz clic en **Agregar**.

Se abrirá la página de perfil de la persona, lista para que agregues más datos.

:::tip
Si vienes de otro sistema de gestión de iglesias, la función [Import Data](importing-data.md) te permite traer todo tu directorio desde un archivo CSV, mucho más rápido que agregar personas una por una.
:::

### Advertencias de duplicados

Si la dirección de correo electrónico (o, al crear una persona desde el formulario completo de edición, el número de teléfono o la coincidencia de nombre, apellido y fecha de nacimiento) coincide con alguien que ya está en tu base de datos, aparece un cuadro de diálogo **Posible duplicado** antes de guardar el nuevo registro. Muestra cada persona coincidente con su correo electrónico, teléfono y fecha de nacimiento para que puedas compararlos.

- Haz clic en **Usar existente** junto a una coincidencia para usar el registro de esa persona en lugar de crear uno nuevo.
- Haz clic en **Crear de todos modos** para agregar a la nueva persona aunque se haya encontrado una posible coincidencia.

Esta verificación solo se realiza al crear una persona nueva; editar un registro existente nunca la activa. Solo evita que se creen nuevos duplicados; no combina dos registros que ya existen.

## Editar los datos {#editing-details}

1. En el perfil de la persona, haz clic en el botón **Editar** debajo de sus datos de contacto, a la izquierda.
2. En el formulario **Datos personales**, completa información adicional, como el segundo nombre, el estado de membresía (**Visitante**, **Invitado**, **Asistente habitual**, **Miembro**, **Personal**, **Inactivo** o **Fallecido**), las fechas, la dirección, los números de teléfono y, en el caso de niños y estudiantes, el grado escolar y la escuela.
3. Haz clic en **Guardar** para guardar la información personal.

El lado izquierdo del perfil muestra la foto de la persona, su nombre, su estado de membresía, sus datos de contacto, los valores de cualquier [campo personalizado](../settings/custom-fields.md) y su hogar. Haz clic en la foto para cambiarla. Debajo del botón **Editar** hay algunas acciones más: **Flujo de trabajo** (agrega a la persona a un [flujo de trabajo](../serving/workflows.md)), **Combinar**, **Exportar** y **Exportar datos**.

El resto del perfil muestra una sección de resumen para cada tipo de información relacionada:

- **Asistencia**: muestra en cuáles de las últimas semanas asistió la persona y sus visitas más recientes. Haz clic en **Todos los años** para ver todo su historial de visitas, incluidos la sede, el servicio, el horario del servicio, el grupo y una columna **Registro de entrada** con la hora de registro en el kiosco (se muestra un guion en las visitas registradas sin registro en kiosco), o en **Imprimir** para imprimirlo. Para ver tendencias de toda la iglesia en lugar del historial de una persona, consulta [Registrar la asistencia](../attendance/tracking-attendance.md).
- **Donaciones**: muestra las donaciones de este año, incluidas las destinadas a fondos no deducibles. Haz clic en **Todos los años** para ver su [historial completo de donaciones](../donations/recording-donations.md), o en **Registrar una donación** para registrar una nueva. Si tu iglesia activó la [Privacidad de las donaciones](../settings/church-settings.md#giving-privacy), los montos permanecen ocultos hasta que hagas clic en **Mostrar donaciones**.
- **Grupos**: enumera las [membresías de grupo](../groups/group-members.md) de la persona.
- **Notas**: muestra las notas recientes sobre la persona (atención pastoral, seguimientos, etc.). Haz clic en **Todas las notas** para leer y agregar notas.
- **Formularios**: enumera los formularios de la persona y si cada uno fue enviado o no (consulta [Trabajar con formularios](#working-with-forms) más abajo).

Cuando abras una de estas vistas completas, haz clic en el enlace **Volver a** con el nombre de la persona, en la parte superior, para regresar al perfil.

## Enviar un correo electrónico a una persona

Si la persona tiene una dirección de correo electrónico registrada, aparece un botón **Correo electrónico** debajo de sus datos de contacto, a la izquierda del perfil.

1. En el perfil de la persona, haz clic en **Correo electrónico**.
2. Se abre un cuadro de diálogo **Correo electrónico**, titulado con el nombre de la persona, que muestra **Enviando a** con su dirección.
3. Opcionalmente, elige una plantilla guardada en **Cargar plantilla (opcional)**.
4. Escribe un **Asunto** y redacta el mensaje.
5. Haz clic en **Enviar correo**.

Si prefieres redactar el mensaje en tu propio programa de correo, haz clic en **Abrir en mi aplicación de correo**.

:::info
El envío desde B1 usa las mismas aprobaciones y límites diarios que el correo de grupo. Si tu iglesia aún no ha sido aprobada, el cuadro de diálogo te pide solicitar una revisión; mientras tanto, puedes hacer clic en **Abrir en mi aplicación de correo**. Consulta [Activar el correo de grupo para tu iglesia](../groups/group-members.md#turning-on-group-email-for-your-church). Los usuarios sin permiso para editar los miembros de un grupo van directamente a su aplicación de correo al hacer clic en **Correo electrónico**.
:::

## Trabajar con formularios {#working-with-forms}

Puedes completar formularios personalizados directamente desde el perfil de una persona. Son formularios definidos por el usuario que puedes crear siguiendo la guía [Crear formularios](../forms/creating-forms.md).

1. En el perfil de la persona, busca la sección **Formularios**. Enumera cada formulario junto con su estado: **Enviado** o **No enviado**.
2. Haz clic en el nombre de un formulario para abrirlo (o haz clic en **Todos los formularios** para ver la lista completa).
3. Haz clic en el **icono de edición** (lápiz) del formulario, completa los datos y haz clic en **Guardar**.

Una vez que se envía un formulario, haz clic en el **icono de impresión** junto a él para imprimir las respuestas completadas de esa persona.

Si un envío quedó asociado a la persona equivocada, haz clic en el icono **Cambiar persona** (dos flechas) junto a él para moverlo a otra persona o desvincularlo. Consulta [Cambiar la persona de un envío](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Los formularios vinculados al perfil de una persona usan el tipo de formulario **Personas**. Si necesitas un formulario independiente (como un registro a un evento), consulta la opción [Stand Alone form](../forms/creating-forms.md) en la guía de formularios.
:::

:::tip
Si solo necesitas registrar una o dos datos adicionales de las personas, como una fecha, un número o una respuesta de sí o no, usa mejor [Custom Fields](../settings/custom-fields.md) en lugar de un formulario. Son más rápidos de completar y se pueden buscar directamente en Advanced Search.
:::

## Administrar hogares {#managing-households}

Los hogares te permiten vincular a los miembros de una familia. Esto es especialmente útil para el [registro de entrada](../attendance/check-in.md), donde un padre puede registrar a todos sus hijos a la vez.

1. En el perfil de una persona, haz clic en **Editar** junto al encabezado **Hogar**, a la izquierda.
2. Se abrirá el editor de hogares. Selecciona el **rol en el hogar** de la persona actual (por ejemplo, Head, Spouse, Child u Other).
3. Haz clic en el icono **Agregar** para agregar a otro miembro del hogar.
4. Debajo de **Agregar miembro del hogar**, escribe el nombre de la persona en el cuadro de búsqueda y presiona **Intro** o haz clic en el icono de búsqueda. (Antes de escribir, se muestra una breve lista de **Personas recientes**).
5. Cuando la persona aparezca en los resultados, haz clic en su nombre o en el icono de agregar junto a él.
6. Elige su rol en el hogar y haz clic en **Guardar** para completar la configuración del hogar.
