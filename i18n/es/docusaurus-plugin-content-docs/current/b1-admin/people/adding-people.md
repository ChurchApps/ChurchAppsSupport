---
title: "Agregar Personas"
---

# Agregar Personas

<div class="article-intro">

La sección de People es la base de B1 Admin — es la base de datos de miembros de tu iglesia. Cada otra característica (grupos, asistencia, donaciones, formularios) se vincula a registros de personas. Esta guía te guía a través de agregar a alguien a tu base de datos, editar sus detalles y vincular miembros de la familia en hogares.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesitas una cuenta B1 Admin activa con permiso para gestionar personas. Ver [Roles & Permisos](roles-permissions.md) si no estás seguro de tu nivel de acceso.
- Si estás agregando más que un puñado de personas, considera usar la herramienta [Importar CSV](importing-data.md) en su lugar.

</div>

## Agregar una Persona

1. Navega al panel de control de B1.church Admin.
2. Abre el [menú Saltar](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expande **People**, y haz clic en **People**.
3. Haz clic en el botón **Agregar Persona** en la esquina superior derecha.
4. Completa el nombre, apellido y correo electrónico de la persona, luego haz clic en **Agregar**.

La página de perfil de la persona se abrirá, lista para que agregues más detalles.

:::tip
Si estás migrando desde otro sistema de gestión de iglesias, la característica [Importar Datos](importing-data.md) te permite traer todo tu directorio desde un archivo CSV — mucho más rápido que agregar personas una por una.
:::

### Advertencias de Duplicados

Si la dirección de correo electrónico (o, al crear una persona desde el formulario completo de Editar, el número de teléfono o coincidencia de nombre + apellido + fecha de nacimiento) coincide con alguien ya en tu base de datos, aparece un diálogo **Posible Duplicado** antes de que se guarde el nuevo registro. Lista cada persona coincidente junto con su correo electrónico, teléfono y fecha de nacimiento para que puedas comparar.

- Haz clic en **Usar Existente** junto a una coincidencia para usar el registro de esa persona en su lugar de crear uno nuevo.
- Haz clic en **Crear de Todas Formas** para agregar la nueva persona aunque se encontró una posible coincidencia.

Esto solo verifica duplicados cuando estás creando una persona completamente nueva — editar un registro existente nunca lo desencadena. Solo previene duplicados nuevos; no fusiona dos registros que ya existen.

## Editar Detalles

1. En la página de perfil de la persona, haz clic en el **lápiz de edición** junto a su nombre.
2. Completa información adicional como nombre del medio, estado de membresía, fechas, dirección, números de teléfono, y (para niños y estudiantes) grado y escuela.
3. Haz clic en **Guardar** para almacenar la información personal.

El perfil también incluye varias pestañas para información relacionada:

- **Notas** — Agrega notas sobre la persona (cuidado pastoral, seguimientos, etc.)
- **Grupos** — Ver y gestionar [membresías de grupo](../groups/group-members.md)
- **Asistencia** — Ver el historial de visitas individual de esta persona, incluyendo la sede, servicio, hora de servicio, grupo, y una columna **Registrado** con la hora de verificación del quiosco (mostrada como un guión para visitas registradas sin verificación de quiosco). Para tendencias de toda la iglesia en lugar de el historial de una persona, ver [Rastrear Asistencia](../attendance/tracking-attendance.md)
- **Donaciones** — Ver [historial de donaciones](../donations/recording-donations.md)

## Enviando un Correo Electrónico a una Persona

Si la persona tiene una dirección de correo electrónico en el archivo, aparece un botón **Enviar correo electrónico a esta persona** (icono de sobre) en el encabezado del perfil.

1. En el perfil de la persona, haz clic en el **icono de sobre**.
2. Un diálogo **Correo Electrónico** titulado con el nombre de la persona se abre, mostrando **Enviando a** con la dirección de la persona.
3. Opcionalmente elige una plantilla guardada de **Cargar Plantilla (opcional)**.
4. Ingresa un **Asunto** y compón el mensaje.
5. Haz clic en **Enviar Correo Electrónico**.

Para escribir el mensaje en tu propio programa de correo, haz clic en **Abrir en mi aplicación de correo**.

:::info
Enviar desde B1 usa los mismos límites de aprobación y diarios que el correo de grupo. Si tu iglesia aún no ha sido aprobada, el diálogo te pide solicitar una revisión — aún puedes hacer clic en **Abrir en mi aplicación de correo** mientras tanto. Ver [Activar Correo de Grupo para tu Iglesia](../groups/group-members.md#turning-on-group-email-for-your-church). Los usuarios sin permiso para editar miembros del grupo van directamente a su aplicación de correo cuando hacen clic en el icono de sobre.
:::

## Trabajar con Formularios

Puedes completar formularios personalizados directamente desde el perfil de una persona. Estos son formularios definidos por el usuario que puedes crear siguiendo la guía [Crear Formularios](../forms/creating-forms.md).

1. En el perfil de la persona, haz clic en el menú desplegable **Formularios** para seleccionar un formulario.
2. Haz clic en **Agregar Formulario** para abrirlo.
3. Completa los detalles del formulario y haz clic en **Guardar**.

Una vez que se envía un formulario, haz clic en el **icono de impresión** junto a él para imprimir las respuestas completadas de esa persona.

Si un envío llegó a la persona equivocada, haz clic en el **icono Cambiar persona** (dos flechas) junto a él para moverlo a otra persona o desvincularlo. Ver [Cambiar la Persona en un Envío](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Los formularios vinculados al perfil de una persona usan el tipo de formulario **People**. Si necesitas un formulario independiente (como un registro de evento), ver la opción [Formulario Independiente](../forms/creating-forms.md) en la guía de formularios.
:::

:::tip
Si solo necesitas rastrear uno o dos datos adicionales en personas — una fecha, un número, una respuesta sí/no — usa [Campos Personalizados](../settings/custom-fields.md) en su lugar de un formulario. Son más rápidos de completar y son buscables directamente en Búsqueda Avanzada.
:::

## Gestionar Hogares

Los hogares te permiten vincular miembros de la familia. Esto es especialmente útil para [verificación de entrada](../attendance/check-in.md), donde un padre puede registrar a todos sus hijos a la vez.

1. En el perfil de una persona, haz clic en el **lápiz de edición** junto al nombre del hogar.
2. El editor de hogares se abrirá. Selecciona el **rol del hogar** para la persona actual (p. ej., Jefe, Cónyuge, Hijo).
3. Haz clic en **Agregar** para agregar otro miembro del hogar.
4. Escribe el nombre de la persona en el cuadro de búsqueda y haz clic en **Buscar**.
5. Cuando la persona aparezca en los resultados de búsqueda, haz clic en **Seleccionar**.
6. Elige su rol de hogar y haz clic en **Guardar** para completar la configuración del hogar.
