---
title: "Asignar roles"
description: "Asigna roles en B1 Admin para dar al personal y voluntarios acceso solo a las áreas de personas, donaciones, asistencia y grupos que necesitan."
---

# Asignar roles

<div class="article-intro">

B1 Admin usa un sistema de permisos basado en roles para controlar lo que cada usuario de su equipo puede ver y hacer. Al asignar roles, puede dar al personal y a los voluntarios acceso exactamente a las áreas que necesitan, y nada más. Una buena administración de roles mantiene segura la información de su iglesia y permite que su equipo trabaje con eficiencia.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita acceso de **Administrador de dominio** o un rol con permiso para administrar la **Configuración** en B1 Admin.
- Las personas a las que desea asignar roles deben existir ya en su directorio. Consulte [Agregar personas](adding-people.md) si primero necesita agregarlas.

</div>

## Comprender los roles

Un rol es un conjunto de permisos que asigna a uno o más usuarios. Por ejemplo, podría crear un rol de "Equipo de finanzas" que otorgue acceso a los [registros de donaciones](../donations/recording-donations.md), o un rol de "Voluntario de registro de entrada" que solo permita el acceso a las [funciones de asistencia](../attendance/check-in.md).

Cada rol controla el acceso a áreas específicas de B1 Admin, entre ellas:

- **Personas** -- ver y editar perfiles de miembros. La sección de Notas en el registro de una persona requiere **Editar personas**, y un permiso aparte, **Ver notas confidenciales**, controla el acceso a la sección de Notas confidenciales (para atención pastoral, historial personal y notas sensibles similares). **Ver solo nombres de personas** permite buscar personas por nombre (viendo solo nombre, foto y estado de membresía) sin acceso al directorio completo. Combinado con **Ver asistencia** o **Editar asistencia**, permite que un voluntario abra **Grupos** y vea las listas de clase por nombre; con **Editar asistencia** también puede [registrar la asistencia](../attendance/recording-attendance.md). Consulte [Solo nombres de personas](../settings/roles-permissions.md#people-names-only).
- **Donaciones** -- administrar las contribuciones e informes financieros. **Ingresar donaciones** es una opción más limitada para los equipos de conteo: permite ingresar donativos, pero solo en [lotes](../donations/batches.md#who-can-change-a-batch) que todavía estén abiertos.
- **Asistencia** -- registrar y ver los datos de asistencia
- **Formularios** -- crear y administrar [formularios personalizados](../forms/creating-forms.md)
- **Grupos** -- administrar [membresías de grupos](../groups/group-members.md) y calendarios
- **Configuración** -- configurar opciones de toda la iglesia

:::warning
Los **Administradores de dominio** tienen acceso completo a todas las áreas de B1 Admin. Sus permisos no pueden editarse ni restringirse. Use este rol solo para sus administradores principales.
:::

## Ver y administrar roles

1. Abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda de B1 Admin) y expanda **Configuración**.
2. Haga clic en **Roles**.
3. Verá una lista de todos los roles configurados para su iglesia, con una columna de **Miembros** que muestra cuántos usuarios hay en cada rol.
4. Haga clic en cualquier rol para ver sus miembros y permisos.

## Agregar usuarios a un rol

1. En el menú Jump, elija **Configuración > Roles**.
2. Haga clic en el rol al que desea agregar un usuario.
3. En la sección **Miembros**, busque a la persona por nombre.
4. Haga clic en **Agregar** para asignarla al rol.

El usuario tendrá todos los permisos asociados a ese rol la próxima vez que inicie sesión.

## Editar los permisos de un rol

1. En el menú Jump, elija **Configuración > Roles**.
2. Haga clic en el rol que desea modificar.
3. En la sección **Permisos**, marque o desmarque las áreas a las que desea que el rol tenga acceso. Cada grupo de permisos muestra cuántos de sus permisos están marcados (por ejemplo, **2 de 5**).
4. Cada cambio se guarda en cuanto marca o desmarca una casilla.

:::tip
Siga el principio de privilegio mínimo: dé a cada rol solo los permisos que realmente necesita. Esto mantiene segura su información y reduce la posibilidad de cambios accidentales.
:::

## Ejemplos comunes de roles

- **Personal de oficina** -- acceso a Personas, Donaciones, Asistencia y Formularios
- **Líderes de grupo** -- acceso solo a [Grupos](../groups/creating-groups.md)
- **Voluntarios de registro de entrada** -- el permiso de asistencia **Checkin**, que necesita la cuenta con la que se inicia sesión en un [quiosco de registro de entrada](../attendance/check-in.md)
- **Equipo de finanzas** -- acceso a [Donaciones](../donations/recording-donations.md) e informes
- **Equipo de conteo** -- **Ingresar donaciones** y **Ver donaciones**, para que los voluntarios puedan registrar la ofrenda en lotes abiertos sin ver los resúmenes de donaciones

Consulte [Roles y permisos](../settings/roles-permissions.md) para una descripción más detallada de los permisos de donaciones y personas.
