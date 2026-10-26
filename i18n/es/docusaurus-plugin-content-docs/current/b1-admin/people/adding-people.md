---
title: "Agregar personas"
---

# Agregar personas

<div class="article-intro">

La sección de Personas es la base de B1 Admin: es la base de datos de miembros de tu iglesia. Todas las demás funciones (grupos, asistencia, donaciones, formularios) se relacionan con los registros de personas. Esta guía te explica cómo agregar a alguien a tu base de datos, editar sus datos y vincular a los miembros de la familia en hogares.

</div>

## Video de capacitación

<YouTube id="NTL1UDQpx8s" title="Adding People and Households in B1" next="Importing Your People Database in B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Antes de empezar</h4>

- Necesitas una cuenta activa de B1 Admin con permiso para administrar personas. Consulta [Roles y permisos](roles-permissions.md) si no estás seguro de tu nivel de acceso.
- Si vas a agregar más de unas cuantas personas, considera usar mejor la herramienta de [Importación CSV](importing-data.md).

</div>

## Agregar una persona

1. Ve al Panel de control de B1.church Admin.
2. Abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expande **Personas** y haz clic en **Personas**.
3. Haz clic en el botón **Agregar persona** en el encabezado de la página. La página se desplaza hacia abajo hasta el formulario **Agregar nueva persona**, debajo del directorio.
4. Completa el **Nombre**, los **Apellidos** y el **Correo electrónico** de la persona, y luego haz clic en **Agregar**.

Se abrirá la página de perfil de la persona, lista para que agregues más detalles.

:::tip
Si vienes de otro sistema de administración de iglesias, la función [Importar datos](importing-data.md) te permite traer todo tu directorio desde un archivo CSV, mucho más rápido que agregar a las personas una por una.
:::

### Advertencias de duplicados

Si la dirección de correo electrónico (o, al crear una persona desde el formulario completo de Editar, el número de teléfono o la coincidencia de nombre + apellido + fecha de nacimiento) coincide con alguien que ya está en tu base de datos, aparece un cuadro de diálogo de **Posible duplicado** antes de guardar el nuevo registro. Enumera a cada persona coincidente junto con su correo electrónico, teléfono y fecha de nacimiento para que puedas compararlos.

- Haz clic en **Usar existente** junto a una coincidencia para usar el registro de esa persona en lugar de crear uno nuevo.
- Haz clic en **Crear de todos modos** para agregar la nueva persona aunque se haya encontrado una posible coincidencia.

Esto solo verifica duplicados cuando estás creando una persona nueva; editar un registro existente nunca lo activa. Solo evita nuevos duplicados; no fusiona dos registros que ya existen.

## Editar datos

1. En la página de perfil de la persona, haz clic en el botón **Editar** debajo de sus datos de contacto, a la izquierda.
2. En el formulario de **Datos personales**, completa información adicional como el segundo nombre, el estado de membresía (**Visitante**, **Invitado**, **Asistente regular**, **Miembro**, **Personal**, **Inactivo** o **Fallecido**), fechas, dirección, números de teléfono y (para niños y estudiantes) grado y escuela.
3. Haz clic en **Guardar** para almacenar la información personal.

La parte izquierda del perfil muestra la foto de la persona, su nombre, su estado de membresía, sus datos de contacto, los valores de cualquier [campo personalizado](../settings/custom-fields.md) y su hogar. Haz clic en la foto para cambiarla. Debajo del botón **Editar** hay algunas acciones más: **Flujo de trabajo** (agrega a la persona a un [flujo de trabajo](../serving/workflows.md)), **Fusionar**, **Exportar** y **Exportar datos**.

El resto del perfil muestra un resumen para cada tipo de información relacionada:

- **Asistencia**: muestra en cuáles de las últimas semanas asistió la persona y sus visitas más recientes. Haz clic en **Todos los años** para ver su historial completo de visitas, con el campus, el servicio, el horario del servicio, el grupo y una columna **Registrado** con la hora del registro en el kiosco (se muestra un guion para las visitas registradas sin registro en kiosco), o en **Imprimir** para imprimirlo (la impresión tiene el logotipo y el nombre de tu iglesia centrados en la parte superior, encima del nombre de la persona). Para ver tendencias de toda la iglesia en lugar del historial de una sola persona, consulta [Registrar la asistencia](../attendance/tracking-attendance.md).
- **Donaciones**: muestra las ofrendas de este año, incluidas las ofrendas a fondos no deducibles. Haz clic en **Todos los años** para ver su [historial completo de donaciones](../donations/recording-donations.md), o en **Registrar una ofrenda** para registrar una nueva. Si tu iglesia activó la [Privacidad de las ofrendas](../settings/church-settings.md#giving-privacy), los montos permanecen ocultos hasta que hagas clic en **Mostrar ofrendas**.
- **Grupos**: enumera las [membresías de grupo](../groups/group-members.md) de la persona.
- **Notas**: muestra las notas recientes sobre la persona (cuidado pastoral, seguimientos, etc.). Haz clic en **Todas las notas** para leer y agregar notas. Cada nota muestra quién la escribió y la fecha y hora en que se publicó. Para ver las notas recientes de todas las personas a la vez, usa la página de [Notas](./notes.md).
- **Formularios**: enumera los formularios de la persona y si cada uno ha sido enviado (consulta [Trabajar con formularios](#working-with-forms) más abajo).

Cuando abras una de estas vistas completas, haz clic en el enlace **Volver a** con el nombre de la persona en la parte superior para regresar al perfil.

## Enviar un correo electrónico a una persona

Si la persona tiene una dirección de correo electrónico registrada, aparece un botón **Correo** debajo de sus datos de contacto, a la izquierda del perfil.

1. En el perfil de la persona, haz clic en **Correo**.
2. Se abre un cuadro de diálogo **Correo** con el nombre de la persona, que muestra **Enviando a** con su dirección.
3. Opcionalmente, elige una plantilla guardada en **Cargar plantilla (opcional)**.
4. Escribe un **Asunto** y redacta el mensaje.
5. Haz clic en **Enviar correo**.

Para escribir el mensaje en tu propio programa de correo, haz clic en **Abrir en mi aplicación de correo**.

:::info
Enviar desde B1 usa las mismas aprobaciones y límites diarios que el correo de grupo. Si tu iglesia aún no ha sido aprobada, el cuadro de diálogo te pide solicitar una revisión; mientras tanto, puedes hacer clic en **Abrir en mi aplicación de correo**. Consulta [Activar el correo de grupo para tu iglesia](../groups/group-members.md#turning-on-group-email-for-your-church). Los usuarios sin permiso para editar miembros de grupos pasan directamente a su aplicación de correo cuando hacen clic en **Correo**.
:::

## Trabajar con formularios

Puedes completar formularios personalizados directamente desde el perfil de una persona. Son formularios definidos por el usuario que puedes crear siguiendo la guía [Crear formularios](../forms/creating-forms.md).

1. En el perfil de la persona, busca la sección **Formularios**. Enumera cada formulario junto con si ha sido **Enviado** o **No enviado**.
2. Haz clic en el nombre de un formulario para abrirlo (o haz clic en **Todos los formularios** para ver la lista completa).
3. Haz clic en el **ícono de editar** (lápiz) del formulario, completa los datos y haz clic en **Guardar**.

Una vez que se envía un formulario, haz clic en el **ícono de imprimir** junto a él para imprimir las respuestas completadas de esa persona.

Si un envío quedó asociado a la persona equivocada, haz clic en el ícono **Cambiar persona** (dos flechas) junto a él para moverlo a otra persona o desvincularlo. Consulta [Cambiar la persona de un envío](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Los formularios vinculados al perfil de una persona usan el tipo de formulario **Personas**. Si necesitas un formulario independiente (como un registro para un evento), consulta la opción [Formulario independiente](../forms/creating-forms.md) en la guía de formularios.
:::

:::tip
Si solo necesitas registrar uno o dos datos adicionales sobre las personas (una fecha, un número, una respuesta de sí/no), usa [Campos personalizados](../settings/custom-fields.md) en lugar de un formulario. Son más rápidos de completar y se pueden buscar directamente en la Búsqueda avanzada.
:::

## Administrar hogares {#managing-households}

Los hogares te permiten vincular a los miembros de una familia. Esto es especialmente útil para el [registro](../attendance/check-in.md), donde un padre puede registrar a todos sus hijos a la vez.

1. En el perfil de una persona, haz clic en **Editar** junto al encabezado **Hogar**, a la izquierda.
2. Se abrirá el editor de hogares. Selecciona el **rol en el hogar** de la persona actual (por ejemplo, Jefe de familia, Cónyuge, Hijo, Otro).
3. Haz clic en el ícono **Agregar** para agregar otro miembro del hogar.
4. En **Agregar miembro del hogar**, escribe el nombre de la persona en el cuadro de búsqueda y presiona **Enter** o haz clic en el ícono de búsqueda. (Antes de escribir, se muestra una lista corta de **Personas recientes**).
5. Cuando la persona aparezca en los resultados, haz clic en su nombre o en el ícono de agregar junto a él.
6. Elige su rol en el hogar y haz clic en **Guardar** para completar la configuración del hogar.
