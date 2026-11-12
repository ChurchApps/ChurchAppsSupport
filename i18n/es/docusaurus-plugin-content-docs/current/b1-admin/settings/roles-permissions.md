---
title: "Roles y permisos"
description: "Configure roles en B1 Admin para controlar lo que el personal y los voluntarios pueden ver y cambiar, desde donaciones y asistencia hasta personas y grupos."
---

# Roles y permisos

<div class="article-intro">

Los roles le permiten controlar a qué puede acceder cada usuario dentro de su cuenta de ChurchApps. Puede crear roles personalizados para el personal, los voluntarios y otros miembros del equipo, cada uno con su propio nivel de acceso para mantener seguros sus datos.

</div>

## Video de capacitación {#training-video}

<YouTube id="ZzCIkinVMnE" title="Roles, permisos e invitar a su equipo en B1" next="Configurar servicios y asistencia en B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Antes de empezar</h4>

- Necesita acceso de Administrador de dominio o un rol con permiso para administrar roles
- Tenga una lista de los miembros de su equipo y de las áreas a las que necesitan acceso
- Revise las categorías de permisos disponibles más abajo para planificar sus roles

</div>

## Acceder a los roles {#accessing-roles}

1. En B1 Admin, abra el [menú Salto](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda) y expanda **Configuración**.
2. Haga clic en **Roles**.
3. La página de Roles muestra todos los roles definidos actualmente para su iglesia. La columna **Miembros** indica cuántos usuarios hay en cada rol, y la fila **(Todos)** muestra **Todos los usuarios**.

## Crear un rol {#creating-a-role}

Haga clic en **Agregar rol** en la parte superior de la página de Roles. El menú ofrece:

- **Agregar rol personalizado** -- Abre un formulario **Editar rol** encima de la lista. Escriba un **Nombre del rol** y haga clic en **Guardar**. El rol nuevo empieza sin permisos.
- **Agregar rol "Contabilidad"**, **Agregar rol "Personal de la iglesia"**, **Agregar rol "Administrador de contenido"** y **Agregar rol "Administrador de lecciones"** -- Roles ya preparados con un conjunto razonable de permisos marcados. B1 le pide confirmación y luego crea el rol. Después puede cambiar sus permisos como con cualquier otro rol.

## Renombrar o eliminar un rol {#renaming-or-deleting-a-role}

Pase el cursor sobre la fila de un rol y haga clic en **Editar**. En el formulario **Editar rol**, cambie el **Nombre del rol** y haga clic en **Guardar**, o haga clic en **Eliminar** y confirme para quitar el rol. El rol **Administradores de dominio** no se puede eliminar.

## Entender la página de un rol {#understanding-a-roles-page}

Haga clic en el nombre de un rol para abrir su página. Tiene dos paneles:

- **Miembros** (izquierda) -- Las personas que tienen el rol, con su nombre y correo electrónico.
- **Editar permisos** (derecha) -- Los permisos que puede conceder al rol.

La fila **(Todos)** abre una página de permisos que se aplican a todos los usuarios de su iglesia; no tiene lista de miembros.

## Agregar usuarios a un rol {#adding-users-to-a-role}

1. Abra el rol y haga clic en **Agregar** en el panel **Miembros**. Se abre un formulario **Agregar a** para ese rol.
2. Escriba un nombre o un correo electrónico en el cuadro de búsqueda y haga clic en el botón de búsqueda.
3. Haga clic en el botón de agregar junto a la persona. Se agrega al rol de inmediato, y B1 le ofrece enviarle un correo de invitación para que pueda iniciar sesión.
4. Si la persona todavía no está en su iglesia, haga clic en **Crear nuevo usuario** debajo de los resultados de búsqueda, escriba su **Nombre**, **Apellido** y **Correo electrónico**, y haga clic en **Guardar**.

Para cambiar el nombre o el correo electrónico de un miembro, haga clic en el icono de editar de su fila.

## Quitar usuarios de un rol {#removing-users-from-a-role}

1. Abra el rol que contiene al usuario que desea quitar.
2. Busque a la persona en la lista **Miembros**.
3. Haga clic en el icono de eliminar de su fila y confirme.

Su iglesia siempre debe tener al menos un Administrador de dominio, así que no se puede quitar al último miembro de **Administradores de dominio**.

## Configurar permisos {#configuring-permissions}

Cada rol puede recibir acceso a áreas específicas de B1 Admin. En el panel **Editar permisos**, los permisos están agrupados en secciones que puede expandir, como **Asistencia**, **Contenido**, **Donaciones**, **Formularios y planes**, **Lecciones**, **Mensajería**, **Personas y grupos** y **Tareas**. Escriba en el cuadro **Filtrar permisos** para mostrar solo los permisos que coincidan.

Marque o desmarque un permiso para concederlo o quitarlo del rol. Cada cambio se guarda de inmediato; no hay botón de Guardar. Tenga en cuenta que **Editar configuración de la iglesia**, que abre la página de Configuración, está en la sección **Contenido**. El encabezado de cada sección muestra cuántos de sus permisos tiene el rol, por ejemplo **2 de 5**, y el recuento se actualiza a medida que marca y desmarca casillas.

### Permisos de donaciones {#donations-permissions}

La sección **Donaciones** tiene estos permisos:

- **Ver resúmenes de donaciones** -- ver la sección de Donaciones, incluidas las páginas de Resumen, Lotes, Fondos, Campañas y Estados de cuenta de donaciones.
- **Ver donaciones** -- ver donaciones individuales, como las ofrendas dentro de un lote.
- **Editar donaciones** -- control total: agregar, editar y eliminar donaciones y lotes, y [cerrar y reabrir lotes](../donations/batches.md#closing-and-reopening-a-batch).
- **Ingresar donaciones** -- agregar lotes e ingresar, editar o eliminar donaciones, pero solo en lotes que todavía estén abiertos. Las personas con solo este permiso no pueden eliminar lotes, cerrarlos ni reabrirlos, ni modificar ofrendas recibidas a través de las donaciones en línea.
- **Editar configuración** -- administrar la configuración de donaciones.

Quien tiene **Ingresar donaciones** pero no **Ver resúmenes de donaciones** solo ve la página **Lotes** dentro de **Donaciones**. Asigne a un equipo de conteo ambos permisos, **Ingresar donaciones** y **Ver donaciones**, para que puedan abrir un lote y ver las ofrendas que ingresaron. Consulte [Quién puede modificar un lote](../donations/batches.md#who-can-change-a-batch) para más detalles.

### Solo nombres de personas {#people-names-only}

La sección **Personas y grupos** incluye **Ver solo nombres de personas**. Úselo para voluntarios que necesitan buscar personas por su nombre (por ejemplo, para elegir a alguien en un cuadro de búsqueda) sin acceso al directorio completo. Con este permiso por sí solo, una persona:

- Puede buscar personas por nombre y ver la lista de personas agregadas recientemente, pero solo ve el nombre, la foto y el estado de membresía de cada persona
- No puede buscar por correo electrónico, ver datos de contacto ni abrir el directorio de **Personas**

Combine **Ver solo nombres de personas** con **Ver asistencia** o **Editar asistencia** para los voluntarios que toman la asistencia a clases. **Personas** en su menú abrirá entonces **Grupos**, donde pueden abrir la lista **Todos los grupos** y ver los nombres de los miembros de cada clase y sus sesiones. Con **Editar asistencia** también pueden [registrar la asistencia](../attendance/recording-attendance.md) y agregar visitantes buscando sus nombres. Los nombres no son enlaces a registros de personas, y los grupos confidenciales permanecen ocultos a menos que el voluntario sea miembro.

B1 Admin oculta los enlaces y botones que requieren permisos que un rol no tiene. Por ejemplo, la lista **Todos los grupos** solo está disponible para quienes pueden editar grupos, ver miembros de grupos o ver personas, o para quienes tienen **Ver solo nombres de personas** junto con **Ver asistencia** o **Editar asistencia** (los demás son enviados de vuelta al Panel); la configuración de asistencia solo aparece con **Editar servicios**; el botón **Correo electrónico** de un grupo solo aparece para quienes tienen **Editar miembros de grupos** (el permiso necesario para enviar correo de grupo); imprimir la lista de un grupo requiere **Ver miembros de grupos** o liderar ese grupo; y eliminar un evento del calendario requiere **Editar contenido** (o retirar su propia solicitud pendiente).

### Cuentas del kiosco de registro de entrada {#check-in-kiosk-accounts}

La cuenta que inicia sesión en un kiosco de [B1 Checkin](../../b1-checkin/getting-started/logging-in.md) necesita el permiso **Registro de entrada** en la sección **Asistencia** (o **Editar asistencia**). Con **Registro de entrada** solamente, el kiosco puede buscar familias por nombre o teléfono, registrar entradas y salidas, y mostrar quién puede recoger a un niño, sin acceso al directorio de Personas.

El registro de entrada ya no se concede a través de la fila **(Todos)**. Estar en un rol con otros permisos no permite a alguien manejar el kiosco; agregue **Registro de entrada** a un rol como "Voluntarios de registro de entrada" y ponga en él las cuentas de los kioscos.

:::warning
Los **Administradores de dominio** tienen acceso completo a todas las áreas de su cuenta de ChurchApps. Sus permisos no se pueden modificar ni restringir. Use este rol solo para sus administradores de mayor confianza.
:::

:::tip
Cree roles específicos como "Tesorero" con acceso solo a **Donaciones**, "Equipo de conteo" con **Ingresar donaciones** y **Ver donaciones**, o "Voluntario de registro de entrada" con acceso solo a **Asistencia**. Así se aplica el principio de mínimo privilegio y se mantienen seguros sus datos. Consulte [Seguridad de datos](./data-security.md) para más información sobre cómo ChurchApps protege su información.
:::
