---
title: "Agregar Personas"
---

# Agregar Personas

<div class="article-intro">

La sección de Personas es la base de B1 Admin: es la base de datos de miembros de tu iglesia. Todas las demás características (grupos, asistencia, donaciones, formularios) están vinculadas a registros de personas. Esta guía te guía a través de agregar a alguien a tu base de datos, editar sus detalles y vincular miembros de la familia en hogares.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Necesitas una cuenta activa de B1 Admin con permiso para administrar personas. Consulta [Roles y Permisos](roles-permissions.md) si no estás seguro de tu nivel de acceso.
- Si estás agregando más que un puñado de personas, considera usar la herramienta [Importación CSV](importing-data.md) en su lugar.

</div>

## Agregar una Persona

1. Navega al panel de B1.church Admin.
2. Abre el **menú de sección** en la esquina superior izquierda y elige **Personas**.
3. Haz clic en el botón **Agregar Persona** en la esquina superior derecha.
4. Completa el nombre, apellido y dirección de correo de la persona, luego haz clic en **Agregar**.

Se abrirá la página de perfil de la persona, lista para que agregues más detalles.

:::tip
Si estás migrando desde otro sistema de administración de iglesia, la característica [Importar Datos](importing-data.md) te permite traer todo tu directorio desde un archivo CSV, mucho más rápido que agregar personas una por una.
:::

### Advertencias de Duplicados

Si la dirección de correo (o, al crear una persona desde el formulario de edición completo, el número de teléfono o el coincidencia de nombre + apellido + fecha de nacimiento) coincide con alguien ya en tu base de datos, aparece un cuadro de diálogo **Posible Duplicado** antes de que se guarde el nuevo registro. Enumera cada persona coincidente junto con su correo, teléfono y fecha de nacimiento para que puedas comparar.

- Haz clic en **Usar Existente** junto a una coincidencia para usar ese registro de persona en su lugar de crear uno nuevo.
- Haz clic en **Crear de Todas Formas** para agregar la nueva persona aunque se encontró una posible coincidencia.

Esto solo verifica duplicados cuando estás creando una persona completamente nueva: editar un registro existente nunca lo dispara. Solo previene duplicados nuevos; no fusiona dos registros que ya existen.

## Editar Detalles

1. En la página de perfil de la persona, haz clic en el **lápiz de edición** junto a su nombre.
2. Completa información adicional como segundo nombre, estado de membresía, fechas, dirección, números de teléfono y (para niños y estudiantes) grado y escuela.
3. Haz clic en **Guardar** para almacenar la información personal.

El perfil también incluye varias pestañas para información relacionada:

- **Notas** -- Agrega notas sobre la persona (cuidado pastoral, seguimientos, etc.)
- **Grupos** -- Ver y administrar [membresías de grupo](../groups/group-members.md)
- **Asistencia** -- Ver el historial de visitas individual de esta persona, incluyendo el campus, servicio, hora de servicio, grupo y una columna **Registrado** con la hora de registro del quiosco (mostrada como un guión para visitas registradas sin registro de quiosco). Para tendencias de toda la iglesia en lugar del historial de una persona, consulta [Seguimiento de Asistencia](../attendance/tracking-attendance.md)
- **Donaciones** -- Ver [historial de donaciones](../donations/recording-donations.md)

## Trabajar con Formularios

Puedes rellenar formularios personalizados directamente desde el perfil de una persona. Estos son formularios definidos por el usuario que puedes construir siguiendo la guía [Crear Formularios](../forms/creating-forms.md).

1. En el perfil de la persona, haz clic en el menú desplegable **Formularios** para seleccionar un formulario.
2. Haz clic en **Agregar Formulario** para abrirlo.
3. Completa los detalles del formulario y haz clic en **Guardar**.

Una vez que se envía un formulario, haz clic en el **icono de impresión** junto a él para imprimir las respuestas rellenas de esa persona.

:::info
Los formularios vinculados al perfil de una persona usan el tipo de formulario **Personas**. Si necesitas un formulario independiente (como un registro de evento), consulta la opción [formulario Independiente](../forms/creating-forms.md) en la guía de formularios.
:::

:::tip
Si solo necesitas realizar un seguimiento de una o dos piezas de información adicional en personas: una fecha, un número, una respuesta sí/no, usa [Campos Personalizados](../settings/custom-fields.md) en su lugar de un formulario. Son más rápidos de completar y se pueden buscar directamente en Búsqueda Avanzada.
:::

## Administrar Hogares

Los hogares te permiten vincular miembros de la familia juntos. Esto es especialmente útil para [registro](../attendance/check-in.md), donde un padre puede registrar a todos sus hijos a la vez.

1. En el perfil de una persona, haz clic en el **lápiz de edición** junto al nombre del hogar.
2. Se abrirá el editor de hogares. Selecciona el **rol del hogar** para la persona actual (por ejemplo, Jefe, Cónyuge, Hijo).
3. Haz clic en **Agregar** para agregar otro miembro del hogar.
4. Escribe el nombre de la persona en el cuadro de búsqueda y haz clic en **Buscar**.
5. Cuando aparece la persona en los resultados de búsqueda, haz clic en **Seleccionar**.
6. Elige su rol en el hogar y haz clic en **Guardar** para completar la configuración del hogar.
