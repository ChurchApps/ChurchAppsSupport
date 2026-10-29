---
title: "Agregar personas"
---

# Agregar personas

<div class="article-intro">

La sección de Personas es la base de B1 Admin: es la base de datos de miembros de su iglesia. Todas las demás funciones (grupos, asistencia, donaciones, formularios) se vinculan a los registros de personas. Esta guía le explica cómo agregar a alguien a su base de datos, editar sus datos y vincular a los miembros de la familia en hogares.

</div>

## Video de capacitación

<YouTube id="NTL1UDQpx8s" title="Adding People and Households in B1" next="Importing Your People Database in B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita una cuenta activa de B1 Admin con permiso para administrar personas. Consulte [Roles y permisos](roles-permissions.md) si no está seguro de su nivel de acceso.
- Si va a agregar más de unas cuantas personas, considere usar la herramienta de [importación CSV](importing-data.md).

</div>

## Agregar una persona

1. Vaya al panel de administración de B1.church.
2. Abra el [menú de salto](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), despliegue **Personas** y haga clic en **Personas**.
3. Haga clic en el botón **Agregar persona** en el encabezado de la página. La página se desplaza hacia abajo hasta el formulario **Agregar nueva persona** debajo del directorio.
4. Escriba el **Nombre**, **Apellido** y **Correo electrónico** de la persona, y haga clic en **Agregar**.

Se abrirá la página de perfil de la persona, lista para que agregue más detalles.

:::tip
Si está migrando desde otro sistema de administración de iglesias, la función de [Importar datos](importing-data.md) le permite traer todo su directorio desde un archivo CSV: mucho más rápido que agregar personas una por una.
:::

### Advertencias de duplicados

Si la dirección de correo electrónico (o, al crear una persona desde el formulario completo de Editar, el número de teléfono o el mismo nombre + apellido + fecha de nacimiento) coincide con alguien que ya está en su base de datos, aparece un cuadro de diálogo **Posible duplicado** antes de guardar el nuevo registro. Muestra cada persona que coincide junto con su correo electrónico, teléfono y fecha de nacimiento para que pueda compararlas.

- Haga clic en **Usar existente** junto a una coincidencia para usar el registro de esa persona en lugar de crear uno nuevo.
- Haga clic en **Crear de todos modos** para agregar la nueva persona aunque se haya encontrado una posible coincidencia.

Esto solo verifica duplicados cuando está creando una persona completamente nueva: editar un registro existente nunca lo activa. Solo evita duplicados nuevos; no fusiona dos registros que ya existen.

## Editar detalles

1. En la página de perfil de la persona, haga clic en el botón **Editar** debajo de sus datos de contacto, a la izquierda.
2. En el formulario **Datos personales**, complete información adicional como el segundo nombre, el estado de membresía (**Visitante**, **Invitado**, **Asistente regular**, **Miembro**, **Personal**, **Inactivo** o **Fallecido**), fechas, dirección, números de teléfono y, para niños y estudiantes, grado y escuela.
3. Haga clic en **Guardar** para almacenar la información personal.

La parte izquierda del perfil muestra la foto, nombre, estado de membresía, datos de contacto, cualquier valor de [campo personalizado](../settings/custom-fields.md) y su hogar. Debajo del hogar, **Fecha de alta** muestra la fecha en que se creó el registro (solo para personas agregadas desde finales de octubre de 2026). Haga clic en la foto para cambiarla. Debajo del botón **Editar** hay algunas acciones más: **Flujo de trabajo** (agrega a la persona a un [flujo de trabajo](../serving/workflows.md)), **Fusionar**, **Exportar** y **Exportar datos**.

El resto del perfil muestra una sección de resumen para cada tipo de información relacionada:

- **Asistencia**: muestra en cuáles de las últimas semanas asistió la persona y sus visitas más recientes. Haga clic en **Todos los años** para ver su historial completo de visitas, incluidos el campus, servicio, horario de servicio, grupo y una columna **Registrado** con la hora del registro en el quiosco (se muestra un guion en las visitas registradas sin registro en quiosco), o en **Imprimir** para imprimirlo (la impresión tiene el logotipo y el nombre de su iglesia centrados en la parte superior, encima del nombre de la persona). Para tendencias de toda la iglesia en lugar del historial de una persona, consulte [Seguimiento de asistencia](../attendance/tracking-attendance.md).
- **Donaciones**: muestra las ofrendas de este año, incluidas las donaciones a fondos no deducibles. Haga clic en **Todos los años** para ver su [historial completo de donaciones](../donations/recording-donations.md), o en **Registrar una donación** para registrar una nueva. Si su iglesia activó la [Privacidad de donaciones](../settings/church-settings.md#giving-privacy), los montos permanecen ocultos hasta que haga clic en **Mostrar donaciones**.
- **Grupos**: enumera las [membresías de grupos](../groups/group-members.md) de la persona, con **Se unió** y la fecha en que se unió a cada grupo cuando está registrada.
- **Notas**: muestra notas recientes sobre la persona (cuidado pastoral, seguimientos, etc.). Haga clic en **Todas las notas** para leer y agregar notas. Cada nota muestra quién la escribió y la fecha y hora en que se publicó. Para ver las notas recientes de todos a la vez, use la página de [Notas](./notes.md).
- **Formularios**: enumera los formularios de la persona y si cada uno ha sido enviado (vea [Trabajar con formularios](#working-with-forms) abajo).

Cuando abra una de estas vistas completas, haga clic en el enlace **Volver a** con el nombre de la persona en la parte superior para regresar al perfil.

## Enviar correo electrónico a una persona

Si la persona tiene una dirección de correo registrada, aparece un botón **Correo electrónico** debajo de sus datos de contacto, a la izquierda del perfil.

1. En el perfil de la persona, haga clic en **Correo electrónico**.
2. Se abre un cuadro de diálogo **Correo electrónico** con el nombre de la persona en el título, que muestra **Enviando a** con su dirección.
3. Opcionalmente, elija una plantilla guardada en **Cargar plantilla (opcional)**.
4. Escriba un **Asunto** y redacte el mensaje.
5. Haga clic en **Enviar correo**.

Para escribir el mensaje en su propio programa de correo, haga clic en **Abrir en mi aplicación de correo**.

:::info
El envío desde B1 usa los mismos límites de aprobación y diarios que el correo de grupo. Si su iglesia aún no ha sido aprobada, el cuadro de diálogo le pide solicitar una revisión; mientras tanto, puede hacer clic en **Abrir en mi aplicación de correo**. Consulte [Activar el correo de grupo para su iglesia](../groups/group-members.md#turning-on-group-email-for-your-church). Los usuarios sin permiso para editar miembros de grupos van directo a su aplicación de correo al hacer clic en **Correo electrónico**.
:::

## Trabajar con formularios

Puede llenar formularios personalizados directamente desde el perfil de una persona. Son formularios definidos por el usuario que puede crear siguiendo la guía de [Crear formularios](../forms/creating-forms.md).

1. En el perfil de la persona, busque la sección **Formularios**. Enumera cada formulario junto con si ha sido **Enviado** o **No enviado**.
2. Haga clic en el nombre de un formulario para abrirlo (o en **Todos los formularios** para ver la lista completa).
3. Haga clic en el **icono de edición** (lápiz) del formulario, complete los datos y haga clic en **Guardar**.

Una vez que se envía un formulario, haga clic en el **icono de impresión** junto a él para imprimir las respuestas completadas de esa persona. Cuando la persona tiene un solo envío de un formulario, el formulario muestra **Enviado** con la fecha encima de las respuestas.

Si un envío quedó asociado a la persona equivocada, haga clic en el icono **Cambiar persona** (dos flechas) junto a él para moverlo a otra persona o desvincularlo. Consulte [Cambiar la persona de un envío](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Los formularios vinculados al perfil de una persona usan el tipo de formulario **Personas**. Si necesita un formulario independiente (como un registro a un evento), consulte la [opción de formulario Independiente](../forms/creating-forms.md) en la guía de formularios.
:::

:::tip
Si solo necesita registrar uno o dos datos adicionales sobre las personas (una fecha, un número, una respuesta de sí o no), use [Campos personalizados](../settings/custom-fields.md) en lugar de un formulario. Son más rápidos de llenar y se pueden buscar directamente en la Búsqueda avanzada.
:::

## Administrar hogares {#managing-households}

Los hogares le permiten vincular a los miembros de una familia. Esto es especialmente útil para el [registro de entrada](../attendance/check-in.md), donde un padre puede registrar a todos sus hijos a la vez.

1. En el perfil de una persona, haga clic en **Editar** junto al encabezado **Hogar**, a la izquierda.
2. Se abrirá el editor de hogares. Seleccione el **rol en el hogar** de la persona actual (por ejemplo, Jefe, Cónyuge, Hijo u Otro).
3. Haga clic en el icono **Agregar** para agregar otro miembro del hogar.
4. En **Agregar miembro del hogar**, escriba el nombre de la persona en el cuadro de búsqueda y presione **Enter** o haga clic en el icono de búsqueda. (Antes de escribir, se muestra una lista corta de **Personas recientes**).
5. Cuando la persona aparezca en los resultados, haga clic en su nombre o en el icono de agregar junto a él.
6. Elija su rol en el hogar y haga clic en **Guardar** para completar la configuración del hogar.
