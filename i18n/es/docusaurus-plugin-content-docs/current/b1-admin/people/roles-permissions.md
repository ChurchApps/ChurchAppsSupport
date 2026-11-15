---
title: "Asignación de roles"
description: "Asigne roles en B1 Admin para dar al personal y a los voluntarios acceso solo a las áreas de personas, donaciones, asistencia y grupos que necesitan."
---

# Asignación de roles

<div class="article-intro">

B1 Admin usa un sistema de permisos basado en roles para controlar lo que cada usuario de su equipo puede ver y hacer. Al asignar roles, puede dar al personal y a los voluntarios acceso exactamente a las áreas que necesitan, y nada más. Una buena administración de roles mantiene segura la información de su iglesia y permite que su equipo trabaje con eficiencia.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita acceso de **Domain Admin** o un rol con permiso para administrar **Settings** en B1 Admin.
- Las personas a las que quiere asignar roles deben existir ya en su directorio. Consulte [Cómo agregar personas](adding-people.md) si primero necesita agregarlas.

</div>

## Descripción de los roles {#understanding-roles}

Un rol es un conjunto de permisos que asigna a uno o más usuarios. Por ejemplo, puede crear un rol "Equipo de finanzas" que otorgue acceso a los [registros de donaciones](../donations/recording-donations.md), o un rol "Voluntario de registro de entrada" que solo permita el acceso a las [funciones de asistencia](../attendance/check-in.md).

Cada rol controla el acceso a áreas específicas de B1 Admin, entre ellas:

- **People**: ver y editar perfiles de miembros. La sección de Notas de un registro de persona requiere **Edit People**, y un permiso aparte, **View Confidential Notes**, controla el acceso a la sección de Notas confidenciales (para el cuidado pastoral, historial personal y notas delicadas similares). **View People Names Only** permite buscar personas por nombre (viendo solo el nombre, la foto y el estado de membresía) sin acceso al directorio completo. Combinado con **View Attendance** o **Edit Attendance**, permite que un voluntario abra **Groups** y vea las listas de clase por nombre; con **Edit Attendance** también puede [registrar la asistencia](../attendance/recording-attendance.md). Consulte [Solo nombres de personas](../settings/roles-permissions.md#people-names-only).
- **Donations**: administrar contribuciones e informes financieros. **Enter Donations** es una opción más limitada para los equipos de conteo: permite ingresar donativos, pero solo en los [lotes](../donations/batches.md#who-can-change-a-batch) que todavía estén abiertos.
- **Attendance**: registrar y consultar datos de asistencia
- **Forms**: crear y administrar [formularios personalizados](../forms/creating-forms.md)
- **Groups**: administrar [membresías de grupo](../groups/group-members.md) y calendarios
- **Settings**: configurar opciones de toda la iglesia

:::warning
Los **Domain Admins** tienen acceso completo a todas las áreas de B1 Admin. Sus permisos no se pueden editar ni restringir. Use este rol solo para sus administradores principales.
:::

## Cómo ver y administrar roles {#viewing-and-managing-roles}

1. Abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda de B1 Admin) y expanda **Settings**.
2. Haga clic en **Roles**.
3. Verá una lista de todos los roles configurados para su iglesia, con una columna **Members** que muestra cuántos usuarios hay en cada rol. El rol **(Everyone)** se aplica a todos los usuarios.
4. Haga clic en cualquier rol para ver sus miembros y permisos.

## Cómo agregar usuarios a un rol {#adding-users-to-a-role}

1. En el menú Jump, elija **Settings > Roles**.
2. Haga clic en el rol al que quiere agregar un usuario.
3. En la sección **Members**, haga clic en **Add**.
4. Busque a la persona por nombre (o elíjala en **Recent people**), y luego haga clic en su nombre o en el icono de agregar junto a él. Quedará agregada al rol de inmediato.

El usuario tendrá todos los permisos asociados a ese rol la próxima vez que inicie sesión.

## Cómo editar los permisos de un rol {#editing-role-permissions}

1. En el menú Jump, elija **Settings > Roles**.
2. Haga clic en el rol que quiere modificar.
3. En la sección **Edit Permissions**, expanda un grupo de permisos (como **People and Groups**, **Donations** o **Attendance**) y marque o desmarque los permisos que quiera que tenga el rol. Cada grupo muestra cuántos de sus permisos están marcados (por ejemplo, **2 of 5**). Escriba en **Filter permissions** para encontrar un permiso por nombre.
4. Cada cambio se guarda en cuanto marca o desmarca una casilla.

:::tip
Siga el principio de privilegio mínimo: asigne a cada rol solo los permisos que realmente necesita. Así se mantienen seguros sus datos y se reducen las probabilidades de cambios accidentales.
:::

## Ejemplos comunes de roles {#common-role-examples}

- **Personal de oficina**: acceso a People, Donations, Attendance y Forms
- **Líderes de grupo**: acceso solo a [Groups](../groups/creating-groups.md)
- **Voluntarios de registro de entrada**: el permiso de asistencia **Checkin**, que necesita la cuenta con la que se inicia sesión en un [quiosco de registro de entrada](../attendance/check-in.md)
- **Equipo de finanzas**: acceso a [Donations](../donations/recording-donations.md) e informes
- **Equipo de conteo**: **Enter Donations** y **View Donations**, para que los voluntarios puedan ingresar la ofrenda en los lotes abiertos sin ver los resúmenes de donaciones

Consulte [Roles y permisos](../settings/roles-permissions.md) para un análisis más detallado de los permisos de donaciones y de personas.
