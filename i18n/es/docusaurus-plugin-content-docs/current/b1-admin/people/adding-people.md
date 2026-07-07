---
title: "Agregar personas"
---

# Agregar personas

<div class="article-intro">

La sección de Personas es la base de B1 Admin -- es la base de datos de miembros de tu iglesia. Cada otra característica (grupos, asistencia, donaciones, formularios) se vincula nuevamente a registros de personas. Esta guía te guía a través de agregar alguien a tu base de datos, editar sus detalles, y vincular miembros de familia en hogares.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesitas una cuenta activa de B1 Admin con permiso para gestionar personas. Consulta [Roles y permisos](roles-permissions.md) si no estás seguro sobre tu nivel de acceso.
- Si estás agregando más que un puñado de personas, considera usar la herramienta [Importación CSV](importing-data.md) en lugar.

</div>

## Agregar una persona

1. Navega al panel de B1 Admin.
2. Haz clic en **Personas** en la barra lateral izquierda.
3. Haz clic en el botón **Agregar persona** en la esquina superior derecha.
4. Completa el nombre, apellido y dirección de correo de la persona, luego haz clic en **Agregar**.

Se abrirá la página de perfil de la persona, lista para que agregues más detalles.

:::tip
Si estás migrando desde otro sistema de gestión de iglesia, la característica [Importar datos](importing-data.md) te permite traer todo tu directorio desde un archivo CSV -- mucho más rápido que agregar personas una por una.
:::

## Editar detalles

1. En la página de perfil de la persona, haz clic en el **lápiz de edición** junto a su nombre.
2. Completa información adicional como segundo nombre, estado de membresía, fechas, dirección y números telefónicos.
3. Haz clic en **Guardar** para almacenar la información personal.

El perfil también incluye varias pestañas para información relacionada:

- **Notas** — Agrega notas sobre la persona (cuidado pastoral, seguimientos, etc.)
- **Grupos** — Ve y gestiona [membresías de grupo](../groups/group-members.md)
- **Asistencia** — Ve [registros de asistencia](../attendance/tracking-attendance.md)
- **Donaciones** — Ve [historial de donaciones](../donations/recording-donations.md)

## Trabajar con formularios

Puedes rellenar formularios personalizados directamente desde el perfil de una persona. Estos son formularios definidos por el usuario que puedes construir siguiendo la guía [Crear formularios](../forms/creating-forms.md).

1. En el perfil de la persona, haz clic en el menú desplegable **Formularios** para seleccionar un formulario.
2. Haz clic en **Agregar formulario** para abrirlo.
3. Completa los detalles del formulario y haz clic en **Guardar**.

:::info
Los formularios vinculados al perfil de una persona usan el tipo de formulario **Personas**. Si necesitas un formulario independiente (como un registro de evento), consulta la opción [Formulario independiente](../forms/creating-forms.md) en la guía de formularios.
:::

:::tip
Si solo necesitas rastrear una o dos piezas adicionales de información en personas -- una fecha, un número, una respuesta sí/no -- usa [Campos personalizados](../settings/custom-fields.md) en lugar de un formulario. Son más rápidos de rellenar y se pueden buscar directamente en Búsqueda avanzada.
:::

## Gestionar hogares

Los hogares te permiten vincular miembros de familia juntos. Esto es especialmente útil para [check-in](../attendance/check-in.md), donde un padre puede hacer check-in de todos sus hijos a la vez.

1. En el perfil de una persona, haz clic en el **lápiz de edición** junto al nombre del hogar.
2. Se abrirá el editor de hogares. Selecciona el **rol de hogar** para la persona actual (p. ej., Jefe, Cónyuge, Hijo/a).
3. Haz clic en **Agregar** para agregar otro miembro del hogar.
4. Escribe el nombre de la persona en el cuadro de búsqueda y haz clic en **Buscar**.
5. Cuando la persona aparezca en los resultados de búsqueda, haz clic en **Seleccionar**.
6. Elige su rol de hogar y haz clic en **Guardar** para completar la configuración del hogar.
