---
title: "Asignar roles"
---

# Asignar roles

<div class="article-intro">

B1 Admin usa un sistema de permisos basado en roles para controlar lo que cada usuario de tu equipo puede ver y hacer. Al asignar roles, puedes dar a los miembros del personal y a los voluntarios acceso exactamente a las áreas que necesitan, y nada más. Una buena gestión de roles mantiene segura la información de tu iglesia y permite que tu equipo trabaje con eficiencia.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesitas acceso de **Administrador de dominio** o un rol con permiso para administrar **Configuración** en B1 Admin.
- Las personas a las que quieres asignar roles ya deben existir en tu directorio. Consulta [Agregar personas](adding-people.md) si primero necesitas agregarlas.

</div>

## Entender los roles

Un rol es un conjunto de permisos que asignas a uno o más usuarios. Por ejemplo, podrías crear un rol "Equipo de finanzas" que dé acceso a los [registros de donaciones](../donations/recording-donations.md), o un rol "Voluntario de registro de entrada" que solo permita acceder a las [funciones de asistencia](../attendance/check-in.md).

Cada rol controla el acceso a áreas específicas de B1 Admin, entre ellas:

- **Personas**: ver y editar los perfiles de los miembros. La sección **Notas** de un registro de persona requiere **Editar personas**, y un permiso aparte, **Ver notas confidenciales**, controla el acceso a la sección **Notas confidenciales** (para atención pastoral, historial personal y notas sensibles similares). **Ver solo nombres de personas** permite buscar personas por nombre (viendo solo el nombre, la foto y el estado de membresía) sin acceso al directorio completo.
- **Donaciones**: administrar contribuciones e informes financieros. **Registrar donaciones** es una opción más limitada para los equipos de conteo: permite registrar donativos, pero solo en [lotes](../donations/batches.md#who-can-change-a-batch) que todavía estén abiertos.
- **Asistencia**: registrar y ver datos de asistencia
- **Formularios**: crear y administrar [formularios personalizados](../forms/creating-forms.md)
- **Grupos**: administrar las [membresías de grupos](../groups/group-members.md) y los calendarios
- **Configuración**: configurar los ajustes de toda la iglesia

:::warning
Los **Administradores de dominio** tienen acceso completo a todas las áreas de B1 Admin. Sus permisos no se pueden editar ni restringir. Usa este rol solo para tus administradores principales.
:::

## Ver y administrar roles

1. Abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda de B1 Admin) y expande **Configuración**.
2. Haz clic en **Roles**.
3. Verás una lista de todos los roles configurados para tu iglesia.
4. Haz clic en cualquier rol para ver sus miembros y permisos.

## Agregar usuarios a un rol

1. En el menú Jump, elige **Configuración > Roles**.
2. Haz clic en el rol al que quieres agregar un usuario.
3. En la sección **Miembros**, busca a la persona por su nombre.
4. Haz clic en **Agregar** para asignarla al rol.

El usuario tendrá todos los permisos asociados a ese rol la próxima vez que inicie sesión.

## Editar los permisos de un rol

1. En el menú Jump, elige **Configuración > Roles**.
2. Haz clic en el rol que quieres modificar.
3. En la sección **Permisos**, marca o desmarca las áreas a las que quieres que tenga acceso el rol.
4. Haz clic en **Guardar** para aplicar los cambios.

:::tip
Sigue el principio de mínimo privilegio: da a cada rol solo los permisos que realmente necesita. Así se protegen tus datos y se reduce la posibilidad de cambios accidentales.
:::

## Ejemplos comunes de roles

- **Personal de oficina**: acceso a People, Donations, Attendance y Forms
- **Líderes de grupo**: acceso solo a [Groups](../groups/creating-groups.md)
- **Voluntarios de registro de entrada**: acceso solo a [Attendance](../attendance/check-in.md)
- **Equipo de finanzas**: acceso a [Donations](../donations/recording-donations.md) e informes
- **Equipo de conteo**: **Registrar donaciones** y **Ver donaciones**, para que los voluntarios puedan registrar la ofrenda en lotes abiertos sin ver los resúmenes de donaciones

Consulta [Roles y permisos](../settings/roles-permissions.md) para ver con más detalle los permisos de donaciones y de personas.
