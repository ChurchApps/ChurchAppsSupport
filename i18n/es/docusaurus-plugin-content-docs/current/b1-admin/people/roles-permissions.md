---
title: "Asignar roles"
---

# Asignar roles

<div class="article-intro">

B1 Admin usa un sistema de permisos basado en roles para controlar lo que cada usuario de tu equipo puede ver y hacer. Al asignar roles, puedes dar al personal y a los voluntarios acceso exactamente a las áreas que necesitan, y nada más. Una buena gestión de roles mantiene segura la información de tu iglesia y permite que tu equipo trabaje de forma eficiente.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesitas acceso de **Domain Admin** o un rol con permiso para gestionar **Settings** en B1 Admin.
- Las personas a las que quieres asignar roles ya deben existir en tu directorio. Consulta [Agregar personas](adding-people.md) si primero necesitas agregarlas.

</div>

## Entender los roles

Un rol es un conjunto de permisos que asignas a uno o más usuarios. Por ejemplo, puedes crear un rol "Finance Team" que otorgue acceso a los [registros de donaciones](../donations/recording-donations.md), o un rol "Check-In Volunteer" que solo permita acceso a las [funciones de asistencia](../attendance/check-in.md).

Cada rol controla el acceso a áreas específicas de B1 Admin, incluyendo:

- **People**: ver y editar perfiles de miembros. La sección de notas de un registro de persona requiere **Edit People**, y un permiso aparte, **View Confidential Notes**, controla el acceso a la sección de notas confidenciales (para el cuidado pastoral, historial personal y notas delicadas similares). **View People Names Only** permite buscar personas por nombre (viendo solo el nombre, la foto y el estado de membresía) sin acceso al directorio completo. Combinado con **View Attendance** o **Edit Attendance**, permite que un voluntario abra **Groups** y vea las listas de clase por nombre; con **Edit Attendance** también puede [registrar la asistencia](../attendance/recording-attendance.md). Consulta [People Names Only](../settings/roles-permissions.md#people-names-only).
- **Donations**: gestionar contribuciones e informes financieros. **Enter Donations** es una opción más restringida para equipos de conteo: permite registrar ofrendas, pero solo en [lotes](../donations/batches.md#who-can-change-a-batch) que todavía estén abiertos.
- **Attendance**: registrar y ver datos de asistencia
- **Forms**: crear y gestionar [formularios personalizados](../forms/creating-forms.md)
- **Groups**: gestionar [membresías de grupos](../groups/group-members.md) y calendarios
- **Settings**: configurar los ajustes de toda la iglesia

:::warning
Los **Domain Admins** tienen acceso completo a todas las áreas de B1 Admin. Sus permisos no se pueden editar ni restringir. Usa este rol solo para tus administradores principales.
:::

## Ver y gestionar roles

1. Abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda de B1 Admin) y expande **Settings**.
2. Haz clic en **Roles**.
3. Verás una lista de todos los roles configurados para tu iglesia.
4. Haz clic en cualquier rol para ver sus miembros y permisos.

## Agregar usuarios a un rol

1. En el menú Jump, elige **Settings > Roles**.
2. Haz clic en el rol al que quieres agregar un usuario.
3. En la sección **Members**, busca a la persona por nombre.
4. Haz clic en **Add** para asignarla al rol.

El usuario tendrá todos los permisos asociados a ese rol la próxima vez que inicie sesión.

## Editar permisos de un rol

1. En el menú Jump, elige **Settings > Roles**.
2. Haz clic en el rol que quieres modificar.
3. En la sección **Permissions**, marca o desmarca las áreas a las que quieres que tenga acceso el rol.
4. Haz clic en **Save** para aplicar los cambios.

:::tip
Sigue el principio de privilegio mínimo: da a cada rol solo los permisos que realmente necesita. Esto mantiene segura la información y reduce la posibilidad de cambios accidentales.
:::

## Ejemplos comunes de roles

- **Office Staff**: acceso a People, Donations, Attendance y Forms
- **Group Leaders**: acceso solo a [Groups](../groups/creating-groups.md)
- **Check-In Volunteers**: acceso solo a [Attendance](../attendance/check-in.md)
- **Finance Team**: acceso a [Donations](../donations/recording-donations.md) e informes
- **Counting Team**: **Enter Donations** y **View Donations**, para que los voluntarios puedan registrar la ofrenda en lotes abiertos sin ver los resúmenes de ofrendas

Consulta [Roles y permisos](../settings/roles-permissions.md) para un análisis más detallado de los permisos de donaciones y personas.
