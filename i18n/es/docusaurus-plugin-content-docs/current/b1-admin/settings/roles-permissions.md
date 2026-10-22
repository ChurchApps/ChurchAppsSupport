---
title: "Roles y permisos"
---

# Roles y permisos

<div class="article-intro">

Los roles te permiten controlar a qué puede acceder cada usuario dentro de tu cuenta de ChurchApps. Puedes crear roles personalizados para el personal, los voluntarios y otros miembros del equipo, cada uno con su propio nivel de acceso para mantener tus datos seguros.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesitas acceso de Domain Admin o un rol con permiso para gestionar roles
- Ten una lista de los miembros del equipo y de las áreas a las que necesitan acceder
- Revisa las categorías de permisos disponibles más abajo para planificar tus roles

</div>

## Acceder a los roles

1. En B1 Admin, abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda) y expande **Settings**.
2. Haz clic en **Roles**.
3. La página Roles muestra todos los roles definidos actualmente para tu iglesia.

## Descripción de la página Roles

La página Roles está dividida en dos paneles:

- **Lado izquierdo** -- Muestra la lista de miembros asignados al rol seleccionado.
- **Lado derecho** -- Muestra la configuración de permisos que puedes ajustar para ese rol.

Haz clic en cualquier nombre de rol para ver y gestionar sus miembros y permisos.

## Agregar usuarios a un rol

1. Selecciona el rol al que quieres agregar miembros.
2. Usa el **campo de búsqueda** de la izquierda para encontrar a la persona que quieres agregar.
3. Selecciona a la persona en los resultados de la búsqueda.
4. Se agregará al rol de inmediato.

## Quitar usuarios de un rol

1. Selecciona el rol que contiene al usuario que quieres quitar.
2. Busca a la persona en la lista de miembros de la izquierda.
3. Haz clic en el **botón de eliminar** junto a su nombre.

## Configurar permisos

Cada rol puede tener acceso a áreas específicas de B1 Admin. En el panel **Edit Permissions**, los permisos se agrupan en secciones que puedes expandir, como **Attendance**, **Content**, **Donations**, **Forms and Plans**, **Lessons**, **Messaging**, **People and Groups** y **Tasks**. Escribe en el cuadro **Filter permissions** para mostrar solo los permisos que coincidan.

Marca o desmarca un permiso para concederlo o quitarlo del rol.

### Permisos de donaciones

La sección **Donations** tiene estos permisos:

- **View Donation Summaries** -- ver la sección de donaciones, incluidas las páginas Summary, Batches, Funds, Campaigns y Giving Statements.
- **View Donations** -- ver donaciones individuales, como los regalos dentro de un lote.
- **Edit Donations** -- control total: agregar, editar y eliminar donaciones y lotes, y [cerrar y reabrir lotes](../donations/batches.md#closing-and-reopening-a-batch).
- **Enter Donations** -- agregar lotes e introducir, editar o eliminar donaciones, pero solo en lotes que sigan abiertos. Las personas que solo tienen este permiso no pueden eliminar lotes, cerrarlos o reabrirlos, ni modificar donaciones que llegaron a través de donaciones en línea.
- **Edit Settings** -- gestionar la configuración de donaciones.

Quien tenga **Enter Donations** pero no **View Donation Summaries** solo ve la página **Batches** dentro de **Donations**. Asigna a un equipo de conteo tanto **Enter Donations** como **View Donations** para que puedan abrir un lote y ver las donaciones que registraron. Consulta [Quién puede modificar un lote](../donations/batches.md#who-can-change-a-batch) para más detalles.

### Solo nombres de personas

La sección **People and Groups** incluye **View People Names Only**. Úsalo para voluntarios que necesitan buscar personas por su nombre (por ejemplo, para elegir a alguien en un cuadro de búsqueda) sin acceso al directorio completo. Con este permiso por sí solo, una persona:

- Puede buscar personas por nombre y ver la lista de personas agregadas recientemente, pero solo ve el nombre, la foto y el estado de membresía de cada persona
- No puede buscar por correo electrónico, ver datos de contacto ni abrir el directorio **People**

Combina **View People Names Only** con **View Attendance** o **Edit Attendance** para voluntarios que toman la asistencia de las clases. **People** en su menú abrirá entonces **Groups**, donde podrán abrir la lista **All groups** y ver los nombres de los miembros y las sesiones de cada clase. Con **Edit Attendance** también pueden [registrar la asistencia](../attendance/recording-attendance.md) y agregar visitantes buscando sus nombres. Los nombres no son enlaces a los registros de personas, y los grupos confidenciales permanecen ocultos a menos que el voluntario sea miembro.

B1 Admin oculta los enlaces y botones que requieren permisos que un rol no tiene. Por ejemplo, la lista **All groups** solo está disponible para quienes pueden editar grupos, ver los miembros de los grupos o ver personas, o para quienes tienen **View People Names Only** junto con **View Attendance** o **Edit Attendance** (los demás son devueltos al Dashboard); la configuración de asistencia solo aparece con **View Attendance** o **Edit Services**; el botón **Email** de un grupo solo aparece para personas con **Edit Group Members** (el permiso necesario para enviar correos al grupo); imprimir la lista de un grupo requiere **View Group Members** o liderar ese grupo; y eliminar un evento del calendario requiere **Edit Content** (o retirar tu propia solicitud pendiente).

:::warning
Los **Domain Admins** tienen acceso completo a todas las áreas de tu cuenta de ChurchApps. Sus permisos no pueden modificarse ni restringirse. Usa este rol solo para tus administradores de mayor confianza.
:::

:::tip
Crea roles específicos como "Tesorero" con acceso solo a **Donations**, "Equipo de conteo" con **Enter Donations** y **View Donations**, o "Voluntario de registro" con acceso solo a **Attendance**. Esto sigue el principio de mínimo privilegio y mantiene tus datos seguros. Consulta [Seguridad de datos](./data-security.md) para saber más sobre cómo ChurchApps protege tu información.
:::
