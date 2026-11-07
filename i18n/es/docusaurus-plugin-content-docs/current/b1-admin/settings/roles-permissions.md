---
title: "Roles y permisos"
description: "Configura roles en B1 Admin para controlar lo que el personal y los voluntarios pueden ver y cambiar, desde donaciones y asistencia hasta personas y grupos."
---

# Roles y permisos

<div class="article-intro">

Los roles le permiten controlar a qué puede acceder cada usuario dentro de su cuenta de ChurchApps. Puede crear roles personalizados para el personal, los voluntarios y otros miembros del equipo, cada uno con su propio nivel de acceso para mantener segura su información.

</div>

## Video de capacitación

<YouTube id="ZzCIkinVMnE" title="Roles, permisos e invitación a su equipo en B1" next="Configuración de servicios y asistencia en B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita acceso de Administrador de dominio o un rol con permiso para administrar roles
- Tenga una lista de los miembros del equipo y de las áreas a las que necesitan acceso
- Revise las categorías de permisos disponibles más abajo para planear sus roles

</div>

## Acceder a los roles

1. En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda) y expanda **Configuración**.
2. Haga clic en **Roles**.
3. La página de Roles muestra todos los roles definidos actualmente para su iglesia. La columna **Miembros** indica cuántos usuarios hay en cada rol, y la fila **(Todos)** muestra **Todos los usuarios**.

## Comprender la página de Roles

La página de Roles se divide en dos paneles:

- **Lado izquierdo**: muestra la lista de miembros asignados al rol seleccionado.
- **Lado derecho**: muestra la configuración de permisos que puede ajustar para ese rol.

Haga clic en el nombre de cualquier rol para ver y administrar sus miembros y permisos.

## Agregar usuarios a un rol

1. Seleccione el rol al que quiere agregar miembros.
2. Use el **campo de búsqueda** del lado izquierdo para encontrar a la persona que quiere agregar.
3. Seleccione a la persona en los resultados de búsqueda.
4. Se agregará al rol de inmediato.

## Quitar usuarios de un rol

1. Seleccione el rol que contiene al usuario que quiere quitar.
2. Busque a la persona en la lista de miembros del lado izquierdo.
3. Haga clic en el **botón de quitar** junto a su nombre.

## Configurar permisos

Cada rol puede tener acceso a áreas específicas de B1 Admin. En el panel **Editar permisos**, los permisos se agrupan en secciones que puede expandir, como **Asistencia**, **Contenido**, **Donaciones**, **Formularios y planes**, **Lecciones**, **Mensajería**, **Personas y grupos** y **Tareas**. Escriba en el cuadro **Filtrar permisos** para mostrar solo los permisos que coinciden.

Marque o desmarque un permiso para otorgarlo o quitarlo del rol. El encabezado de cada sección muestra cuántos de sus permisos tiene el rol, por ejemplo **2 de 5**, y el conteo se actualiza conforme marca y desmarca casillas.

### Permisos de donaciones

La sección **Donaciones** tiene estos permisos:

- **Ver resúmenes de donaciones**: ver la sección de Donaciones, incluidas las páginas de Resumen, Lotes, Fondos, Campañas y Estados de cuenta de donaciones.
- **Ver donaciones**: ver donativos individuales, como las ofrendas dentro de un lote.
- **Editar donaciones**: control total: agregar, editar y eliminar donativos y lotes, y [cerrar y reabrir lotes](../donations/batches.md#closing-and-reopening-a-batch).
- **Ingresar donaciones**: agregar lotes e ingresar, editar o eliminar donativos, pero solo en lotes que sigan abiertos. Quienes solo tienen este permiso no pueden eliminar lotes, cerrarlos ni reabrirlos, ni modificar donativos que llegaron por donaciones en línea.
- **Editar configuración**: administrar la configuración de donaciones.

Alguien con **Ingresar donaciones** pero sin **Ver resúmenes de donaciones** solo ve la página de **Lotes** dentro de **Donaciones**. Dé a un rol de equipo de conteo tanto **Ingresar donaciones** como **Ver donaciones** para que pueda abrir un lote y ver los donativos que registró. Consulte [Quién puede modificar un lote](../donations/batches.md#who-can-change-a-batch) para más detalles.

### Solo nombres de personas {#people-names-only}

La sección **Personas y grupos** incluye **Ver solo nombres de personas**. Úselo para voluntarios que necesitan buscar personas por nombre (por ejemplo, para elegir a alguien en un cuadro de búsqueda) sin acceso al directorio completo. Con este permiso por sí solo, una persona:

- Puede buscar personas por nombre y ver la lista de personas agregadas recientemente, pero solo ve el nombre, la foto y el estado de membresía de cada persona
- No puede buscar por correo electrónico, ver datos de contacto ni abrir el directorio de **Personas**

Combine **Ver solo nombres de personas** con **Ver asistencia** o **Editar asistencia** para voluntarios que toman la asistencia de clase. **Personas** en su menú entonces abre **Grupos**, donde pueden abrir la lista de **Todos los grupos** y ver los nombres de los miembros y las sesiones de cada clase. Con **Editar asistencia** también pueden [registrar la asistencia](../attendance/recording-attendance.md) y agregar visitantes buscando sus nombres. Los nombres no son enlaces a registros de personas, y los grupos confidenciales permanecen ocultos a menos que el voluntario sea miembro.

B1 Admin oculta los enlaces y botones que requieren permisos que un rol no tiene. Por ejemplo, la lista de **Todos los grupos** solo está disponible para personas que pueden editar grupos, ver miembros de grupos o ver personas, o que tienen **Ver solo nombres de personas** junto con **Ver asistencia** o **Editar asistencia** (los demás regresan al Panel); la configuración de asistencia solo aparece con **Editar servicios**; el botón de **Correo electrónico** de un grupo solo aparece para personas con **Editar miembros del grupo** (el permiso necesario para enviar correo de grupo); imprimir la lista de un grupo requiere **Ver miembros del grupo** o liderar ese grupo; y eliminar un evento del calendario requiere **Editar contenido** (o retirar su propia solicitud pendiente).

### Cuentas de quiosco de registro de entrada {#check-in-kiosk-accounts}

La cuenta que inicia sesión en un quiosco de [B1 Checkin](../../b1-checkin/getting-started/logging-in.md) necesita el permiso **Checkin** de la sección **Asistencia** (o **Editar asistencia**). Con **Checkin** por sí solo, el quiosco puede buscar familias por nombre o teléfono, registrar su entrada y salida, y mostrar quién puede recoger a un niño, sin acceso al directorio de Personas.

El permiso Checkin ya no se otorga a través de la fila **(Todos)**. Estar en un rol con otros permisos no permite que alguien opere el quiosco; agregue **Checkin** a un rol como "Voluntarios de registro de entrada" y coloque allí las cuentas del quiosco.

:::warning
Los **Administradores de dominio** tienen acceso completo a todas las áreas de su cuenta de ChurchApps. Sus permisos no pueden modificarse ni restringirse. Use este rol solo para sus administradores de mayor confianza.
:::

:::tip
Cree roles específicos, como "Tesorero" solo con acceso a **Donaciones**, "Equipo de conteo" con **Ingresar donaciones** y **Ver donaciones**, o "Voluntario de registro de entrada" solo con acceso a **Asistencia**. Así se aplica el principio de privilegio mínimo y se mantiene segura su información. Consulte [Seguridad de datos](./data-security.md) para saber más sobre cómo ChurchApps protege su información.
:::
