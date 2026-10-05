---
title: "Asignación de Roles"
---

# Asignación de Roles

<div class="article-intro">

B1 Admin utiliza un sistema de permisos basado en roles para controlar qué pueden ver y hacer los usuarios de tu equipo. Al asignar roles, puedes dar acceso al personal y los voluntarios exactamente a las áreas que necesitan, nada más. Una gestión adecuada de roles mantiene tus datos de la iglesia seguros mientras permite que tu equipo trabaje de forma eficiente.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Necesitas acceso de **Domain Admin** o un rol con permiso para gestionar **Settings** en B1 Admin.
- Las personas a las que deseas asignar roles ya deben existir en tu directorio. Consulta [Agregar Personas](adding-people.md) si necesitas agregarlas primero.

</div>

## Comprensión de Roles

Un rol es un conjunto de permisos que asignas a uno o más usuarios. Por ejemplo, podrías crear un rol "Equipo de Finanzas" que otorgue acceso a [registros de donaciones](../donations/recording-donations.md), o un rol "Voluntario de Check-In" que solo permita acceso a [características de asistencia](../attendance/check-in.md).

Cada rol controla el acceso a áreas específicas de B1 Admin, incluyendo:

- **People** -- visualización y edición de perfiles de miembros. La pestaña Notes en un registro de persona requiere **Edit People**, y un permiso separado **View Confidential Notes** controla el acceso a la sección de Notas Confidenciales (para cuidado pastoral, historial personal y notas confidenciales similares).
- **Donations** -- gestión de contribuciones e informes financieros
- **Attendance** -- registro y visualización de datos de asistencia
- **Forms** -- creación y gestión de [formularios personalizados](../forms/creating-forms.md)
- **Groups** -- gestión de [membresías de grupo](../groups/group-members.md) y calendarios
- **Settings** -- configuración de ajustes de toda la iglesia

:::warning
**Domain Admins** tienen acceso completo a todas las áreas de B1 Admin. Sus permisos no pueden ser editados o restringidos. Usa este rol solo para tus administradores principales.
:::

## Visualización y Gestión de Roles

1. Abre el [Menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda de B1 Admin) y expande **Settings**.
2. Haz clic en **Roles**.
3. Verás una lista de todos los roles configurados para tu iglesia.
4. Haz clic en cualquier rol para ver sus miembros y permisos.

## Agregar Usuarios a un Rol

1. En el Menú Jump, elige **Settings > Roles**.
2. Haz clic en el rol al que deseas agregar un usuario.
3. En la sección **Members**, busca a la persona por nombre.
4. Haz clic en **Add** para asignarlos al rol.

El usuario ahora tendrá todos los permisos asociados con ese rol la próxima vez que inicie sesión.

## Edición de Permisos de Rol

1. En el Menú Jump, elige **Settings > Roles**.
2. Haz clic en el rol que deseas modificar.
3. En la sección **Permissions**, marca o desmarca las áreas a las que deseas que el rol tenga acceso.
4. Haz clic en **Save** para aplicar tus cambios.

:::tip
Sigue el principio del menor privilegio -- da a cada rol solo los permisos que realmente necesita. Esto mantiene tus datos seguros y reduce la posibilidad de cambios accidentales.
:::

## Ejemplos Comunes de Roles

- **Office Staff** -- acceso a People, Donations, Attendance y Forms
- **Group Leaders** -- acceso solo a [Groups](../groups/creating-groups.md)
- **Check-In Volunteers** -- acceso solo a [Attendance](../attendance/check-in.md)
- **Finance Team** -- acceso a [Donations](../donations/recording-donations.md) e informes
