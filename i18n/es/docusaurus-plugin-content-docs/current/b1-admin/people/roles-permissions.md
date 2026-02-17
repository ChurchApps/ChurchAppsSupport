---
title: "Asignar roles"
---

# Asignar roles

<div class="article-intro">

B1 Admin utiliza un sistema de permisos basado en roles para controlar lo que cada usuario de su equipo puede ver y hacer. Al asignar roles, puede dar al personal y voluntarios acceso exactamente a las \u00e1reas que necesitan -- y nada m\u00e1s. Una gesti\u00f3n adecuada de roles mantiene seguros los datos de su iglesia mientras permite que su equipo trabaje de manera eficiente.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita acceso de **Administrador de dominio** o un rol con permiso para administrar **Configuraci\u00f3n** en B1 Admin.
- Las personas a las que desea asignar roles deben existir previamente en su directorio. Consulte [Agregar personas](adding-people.md) si necesita agregarlas primero.

</div>

## Comprender los roles

Un rol es un conjunto de permisos que se asigna a uno o m\u00e1s usuarios. Por ejemplo, podr\u00eda crear un rol de "Equipo de finanzas" que otorgue acceso a los [registros de donaciones](../donations/recording-donations.md), o un rol de "Voluntario de check-in" que solo permita acceso a las [funciones de asistencia](../attendance/check-in.md).

Cada rol controla el acceso a \u00e1reas espec\u00edficas de B1 Admin, incluyendo:

- **Personas** -- ver y editar perfiles de miembros
- **Donaciones** -- administrar contribuciones y reportes financieros
- **Asistencia** -- registrar y ver datos de asistencia
- **Formularios** -- crear y administrar [formularios personalizados](../forms/creating-forms.md)
- **Grupos** -- administrar [membres\u00edas de grupo](../groups/group-members.md) y calendarios
- **Configuraci\u00f3n** -- establecer configuraciones a nivel de toda la iglesia

:::warning
Los **Administradores de dominio** tienen acceso completo a todas las \u00e1reas de B1 Admin. Sus permisos no pueden ser editados ni restringidos. Use este rol \u00fanicamente para sus administradores principales.
:::

## Ver y administrar roles

1. Haga clic en **Configuraci\u00f3n** en la barra lateral izquierda.
2. Haga clic en **Roles** en la navegaci\u00f3n superior.
3. Ver\u00e1 una lista de todos los roles configurados para su iglesia.
4. Haga clic en cualquier rol para ver sus miembros y permisos.

## Agregar usuarios a un rol

1. Navegue a **Configuraci\u00f3n** y luego a **Roles**.
2. Haga clic en el rol al que desea agregar un usuario.
3. En la secci\u00f3n de **Miembros**, busque a la persona por nombre.
4. Haga clic en **Agregar** para asignarla al rol.

El usuario tendr\u00e1 todos los permisos asociados con ese rol la pr\u00f3xima vez que inicie sesi\u00f3n.

## Editar permisos de un rol

1. Navegue a **Configuraci\u00f3n** y luego a **Roles**.
2. Haga clic en el rol que desea modificar.
3. En la secci\u00f3n de **Permisos**, marque o desmarque las \u00e1reas a las que desea que el rol tenga acceso.
4. Haga clic en **Guardar** para aplicar los cambios.

:::tip
Siga el principio de m\u00ednimo privilegio -- otorgue a cada rol solo los permisos que realmente necesita. Esto mantiene sus datos seguros y reduce la posibilidad de cambios accidentales.
:::

## Ejemplos comunes de roles

- **Personal de oficina** -- acceso a Personas, Donaciones, Asistencia y Formularios
- **L\u00edderes de grupo** -- acceso solo a [Grupos](../groups/creating-groups.md)
- **Voluntarios de check-in** -- acceso solo a [Asistencia](../attendance/check-in.md)
- **Equipo de finanzas** -- acceso a [Donaciones](../donations/recording-donations.md) y reportes
