---
title: "Roles y permisos"
---

# Roles y permisos

<div class="article-intro">

Los roles le permiten controlar a qué puede acceder cada usuario dentro de su cuenta de ChurchApps. Puede crear roles personalizados para el personal, los voluntarios y otros miembros del equipo, cada uno con su propio nivel de acceso para mantener sus datos seguros.

</div>

## Video de capacitación

<YouTube id="ZzCIkinVMnE" title="Roles, Permissions, and Inviting Your Team in B1" next="Setting Up Services and Attendance in B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita acceso de Administrador de dominio o un rol con permiso para administrar roles
- Tenga una lista de los miembros del equipo y de las áreas a las que necesitan acceder
- Revise las categorías de permisos disponibles más abajo para planificar sus roles

</div>

## Acceder a los roles

1. En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda) y expanda **Configuración**.
2. Haga clic en **Roles**.
3. La página de Roles muestra todos los roles definidos actualmente para su iglesia. La columna **Miembros** indica cuántos usuarios hay en cada rol, y la fila **(Todos)** muestra **Todos los usuarios**.

## Entender la página de Roles

La página de Roles está dividida en dos paneles:

- **Lado izquierdo** -- Muestra la lista de miembros asignados al rol seleccionado.
- **Lado derecho** -- Muestra la configuración de permisos que puede ajustar para ese rol.

Haga clic en el nombre de cualquier rol para ver y administrar sus miembros y permisos.

## Agregar usuarios a un rol

1. Seleccione el rol al que desea agregar miembros.
2. Use el **campo de búsqueda** de la izquierda para encontrar a la persona que quiere agregar.
3. Seleccione a la persona en los resultados de búsqueda.
4. Quedará agregada al rol de inmediato.

## Quitar usuarios de un rol

1. Seleccione el rol que contiene al usuario que desea quitar.
2. Busque a la persona en la lista de miembros de la izquierda.
3. Haga clic en el **botón de quitar** junto a su nombre.

## Configurar permisos

Cada rol puede tener acceso a áreas específicas de B1 Admin. En el panel **Editar permisos**, los permisos están agrupados en secciones que puede expandir, como **Asistencia**, **Contenido**, **Donaciones**, **Formularios y planes**, **Lecciones**, **Mensajería**, **Personas y grupos** y **Tareas**. Escriba en el cuadro **Filtrar permisos** para mostrar solo los permisos que coincidan.

Marque o desmarque un permiso para otorgarlo o quitarlo del rol. Cada encabezado de sección muestra cuántos de sus permisos tiene el rol, como **2 de 5**, y el conteo se actualiza a medida que marca y desmarca las casillas.

### Permisos de donaciones

La sección **Donaciones** tiene estos permisos:

- **Ver resúmenes de donaciones** -- ver la sección Donaciones, incluidas las páginas de Resumen, Lotes, Fondos, Campañas y Estados de ofrendas.
- **Ver donaciones** -- ver donaciones individuales, como las ofrendas dentro de un lote.
- **Editar donaciones** -- control total: agregar, editar y eliminar donaciones y lotes, y [cerrar y reabrir lotes](../donations/batches.md#closing-and-reopening-a-batch).
- **Registrar donaciones** -- agregar lotes y registrar, editar o eliminar donaciones, pero solo en lotes que todavía estén abiertos. Quienes solo tienen este permiso no pueden eliminar lotes, cerrarlos o reabrirlos, ni cambiar ofrendas que llegaron a través de la ofrenda en línea.
- **Editar configuración** -- administrar la configuración de donaciones.

Quien tenga **Registrar donaciones** pero no **Ver resúmenes de donaciones** solo ve la página **Lotes** bajo **Donaciones**. Asigne a un equipo de conteo tanto **Registrar donaciones** como **Ver donaciones** para que puedan abrir un lote y ver las ofrendas que registraron. Consulte [Quién puede modificar un lote](../donations/batches.md#who-can-change-a-batch) para más detalles.

### Solo nombres de personas

La sección **Personas y grupos** incluye **Ver solo nombres de personas**. Úselo para voluntarios que necesitan buscar personas por nombre (por ejemplo, para elegir a alguien en un cuadro de búsqueda) sin acceso al directorio completo. Con este permiso por sí solo, una persona:

- Puede buscar personas por nombre y ver la lista de personas agregadas recientemente, pero solo ve el nombre, la foto y el estado de membresía de cada persona
- No puede buscar por correo electrónico, ver datos de contacto ni abrir el **directorio de Personas**

Combine **Ver solo nombres de personas** con **Ver asistencia** o **Editar asistencia** para los voluntarios que toman la asistencia a clase. **Personas** en su menú entonces abre **Grupos**, donde pueden abrir la lista **Todos los grupos** y ver los nombres de los miembros y las sesiones de cada clase. Con **Editar asistencia** también pueden [registrar la asistencia](../attendance/recording-attendance.md) y agregar visitantes buscando sus nombres. Los nombres no son enlaces a los registros de personas, y los grupos confidenciales permanecen ocultos a menos que el voluntario sea miembro.

B1 Admin oculta los enlaces y botones que requieren permisos que un rol no tiene. Por ejemplo, la lista **Todos los grupos** solo está disponible para quienes pueden editar grupos, ver miembros de grupos o ver personas, o para quienes tienen **Ver solo nombres de personas** junto con **Ver asistencia** o **Editar asistencia** (los demás son enviados de vuelta al Panel); la configuración de asistencia solo aparece con **Ver asistencia** o **Editar servicios**; el botón **Correo** de un grupo solo aparece para quienes tienen **Editar miembros del grupo** (el permiso necesario para enviar correo de grupo); imprimir la lista de un grupo requiere **Ver miembros del grupo** o liderar ese grupo; y eliminar un evento del calendario requiere **Editar contenido** (o retirar su propia solicitud pendiente).

:::warning
Los **Administradores de dominio** tienen acceso completo a todas las áreas de su cuenta de ChurchApps. Sus permisos no se pueden modificar ni restringir. Use este rol solo para sus administradores de mayor confianza.
:::

:::tip
Cree roles específicos como "Tesorero" con acceso solo a **Donaciones**, "Equipo de conteo" con **Registrar donaciones** y **Ver donaciones**, o "Voluntario de registro de entrada" con acceso solo a **Asistencia**. Esto sigue el principio de mínimo privilegio y mantiene sus datos seguros. Consulte [Seguridad de datos](./data-security.md) para saber más sobre cómo ChurchApps protege su información.
:::
