---
title: "Asignación de Roles"
---

# Asignación de Roles

<div class="article-intro">

B1 Admin usa un sistema de permisos basado en roles para controlar qué cada usuario en tu equipo puede ver y hacer. Al asignar roles, puedes dar acceso al personal y voluntarios a exactamente las áreas que necesitan -- y nada más. La gestión adecuada de roles mantiene tus datos de iglesia seguros mientras potencia a tu equipo para trabajar eficientemente.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Necesitas acceso **Admin de Dominio** o un rol con permiso para administrar **Configuración** en B1 Admin.
- Las personas a las que deseas asignar roles ya deben existir en tu directorio. Ver [Agregar Personas](adding-people.md) si necesitas agregarlas primero.

</div>

## Entender Roles

Un rol es un conjunto de permisos que asignas a uno o más usuarios. Por ejemplo, podrías crear un rol "Equipo de Finanzas" que otorgue acceso a [registros de donaciones](../donations/recording-donations.md), o un rol "Voluntario de Registración" que solo permite acceso a [características de asistencia](../attendance/check-in.md).

Cada rol controla acceso a áreas específicas de B1 Admin, incluyendo:

- **Personas** -- ver y editar perfiles de miembros. La pestaña Notas en un registro de persona requiere **Editar Personas**, y un permiso separado **Ver Notas Confidenciales** controla el acceso a la sección Notas Confidenciales (para cuidado pastoral, historial personal y notas similares sensibles).
- **Donaciones** -- administrar contribuciones e informes financieros
- **Asistencia** -- registrar y ver datos de asistencia
- **Formularios** -- crear y administrar [formularios personalizados](../forms/creating-forms.md)
- **Grupos** -- administrar [membresías de grupo](../groups/group-members.md) y calendarios
- **Configuración** -- configurar la iglesia en toda la configuración

:::warning
**Los Admins de Dominio** tienen acceso completo a cada área de B1 Admin. Sus permisos no pueden ser editados o restringidos. Usa este rol solo para tus administradores principales.
:::

## Ver y Administrar Roles

1. Abre el **menú de sección** en la esquina superior izquierda (el nombre de la sección con la flecha pequeña) y elige **Configuración**.
2. Haz clic en **Roles** en la navegación superior.
3. Verás una lista de todos los roles configurados para tu iglesia.
4. Haz clic en cualquier rol para ver sus miembros y permisos.

## Agregar Usuarios a un Rol

1. Navega a **Configuración** luego **Roles**.
2. Haz clic en el rol al que deseas agregar un usuario.
3. En la sección **Miembros**, busca la persona por nombre.
4. Haz clic en **Agregar** para asignarla al rol.

El usuario ahora tendrá todos los permisos asociados con ese rol la próxima vez que inicie sesión.

## Editar Permisos de Rol

1. Navega a **Configuración** luego **Roles**.
2. Haz clic en el rol que deseas modificar.
3. En la sección **Permisos**, marca o desmarca las áreas a las que deseas que el rol acceda.
4. Haz clic en **Guardar** para aplicar tus cambios.

:::tip
Sigue el principio de menor privilegio -- da a cada rol solo los permisos que realmente necesita. Esto mantiene tus datos seguros y reduce la posibilidad de cambios accidentales.
:::

## Ejemplos de Roles Comunes

- **Personal de Oficina** -- acceso a Personas, Donaciones, Asistencia y Formularios
- **Líderes de Grupo** -- acceso a [Grupos](../groups/creating-groups.md) solo
- **Voluntarios de Registración** -- acceso a [Asistencia](../attendance/check-in.md) solo
- **Equipo de Finanzas** -- acceso a [Donaciones](../donations/recording-donations.md) e informes
