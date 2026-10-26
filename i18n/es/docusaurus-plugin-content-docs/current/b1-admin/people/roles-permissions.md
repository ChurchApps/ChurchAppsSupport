---
title: "Asignar roles"
---

# Asignar roles

<div class="article-intro">

B1 Admin usa un sistema de permisos basado en roles para controlar lo que cada usuario de tu equipo puede ver y hacer. Al asignar roles, puedes dar al personal y a los voluntarios acceso exactamente a las áreas que necesitan, y nada más. Una buena administración de roles mantiene segura la información de tu iglesia y permite que tu equipo trabaje de forma eficiente.

</div>

<div class="prereqs">
<h4>Antes de empezar</h4>

- Necesitas acceso de **Administrador de dominio** o un rol con permiso para administrar **Configuración** en B1 Admin.
- Las personas a las que quieres asignar roles ya deben existir en tu directorio. Consulta [Agregar personas](adding-people.md) si primero necesitas agregarlas.

</div>

## Entender los roles

Un rol es un conjunto de permisos que asignas a uno o más usuarios. Por ejemplo, podrías crear un rol de "Equipo de finanzas" que otorgue acceso a los [registros de donaciones](../donations/recording-donations.md), o un rol de "Voluntario de registro" que solo permita el acceso a las [funciones de asistencia](../attendance/check-in.md).

Cada rol controla el acceso a áreas específicas de B1 Admin, entre ellas:

- **Personas**: ver y editar los perfiles de los miembros. La sección de Notas de un registro de persona requiere **Editar personas**, y un permiso aparte, **Ver notas confidenciales**, controla el acceso a la sección de Notas confidenciales (para el cuidado pastoral, antecedentes personales y notas similares de carácter sensible). **Ver solo nombres de personas** permite buscar personas por nombre (viendo solo el nombre, la foto y el estado de membresía) sin acceso al directorio completo. Combinado con **Ver asistencia** o **Editar asistencia**, permite que un voluntario abra **Grupos** y vea las listas de clase por nombre; con **Editar asistencia** también puede [registrar la asistencia](../attendance/recording-attendance.md). Consulta [Personas: solo nombres](../settings/roles-permissions.md#people-names-only).
- **Donaciones**: administración de contribuciones e informes financieros. **Ingresar donaciones** es una opción más limitada para los equipos de conteo: permite a alguien ingresar ofrendas, pero solo en [lotes](../donations/batches.md#who-can-change-a-batch) que aún estén abiertos.
- **Asistencia**: registro y consulta de datos de asistencia
- **Formularios**: creación y administración de [formularios personalizados](../forms/creating-forms.md)
- **Grupos**: administración de [membresías de grupos](../groups/group-members.md) y calendarios
- **Configuración**: configuración de opciones para toda la iglesia

:::warning
Los **Administradores de dominio** tienen acceso completo a todas las áreas de B1 Admin. Sus permisos no se pueden editar ni restringir. Usa este rol solo para tus administradores principales.
:::

## Ver y administrar roles

1. Abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda de B1 Admin) y expande **Configuración**.
2. Haz clic en **Roles**.
3. Verás una lista de todos los roles configurados para tu iglesia, con una columna **Miembros** que muestra cuántos usuarios hay en cada rol.
4. Haz clic en cualquier rol para ver sus miembros y permisos.

## Agregar usuarios a un rol

1. En el menú Jump, elige **Configuración > Roles**.
2. Haz clic en el rol al que quieres agregar un usuario.
3. En la sección **Miembros**, busca a la persona por nombre.
4. Haz clic en **Agregar** para asignarla al rol.

El usuario tendrá todos los permisos asociados a ese rol la próxima vez que inicie sesión.

## Editar permisos de un rol

1. En el menú Jump, elige **Configuración > Roles**.
2. Haz clic en el rol que quieres modificar.
3. En la sección **Permisos**, marca o desmarca las áreas a las que quieres que el rol tenga acceso. Cada grupo de permisos muestra cuántos de sus permisos están marcados (por ejemplo, **2 de 5**).
4. Cada cambio se guarda en cuanto marcas o desmarcas una casilla.

:::tip
Sigue el principio de privilegio mínimo: asigna a cada rol solo los permisos que realmente necesita. Esto mantiene segura la información y reduce la posibilidad de cambios accidentales.
:::

## Ejemplos comunes de roles

- **Personal de oficina**: acceso a Personas, Donaciones, Asistencia y Formularios
- **Líderes de grupo**: acceso solo a [Grupos](../groups/creating-groups.md)
- **Voluntarios de registro**: acceso solo a [Asistencia](../attendance/check-in.md)
- **Equipo de finanzas**: acceso a [Donaciones](../donations/recording-donations.md) e informes
- **Equipo de conteo**: **Ingresar donaciones** y **Ver donaciones**, para que los voluntarios puedan registrar la ofrenda en lotes abiertos sin ver los resúmenes de ofrendas

Consulta [Roles y permisos](../settings/roles-permissions.md) para una descripción más detallada de los permisos de donaciones y de personas.
