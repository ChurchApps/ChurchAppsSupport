---
title: "Administrar su perfil"
description: "Actualiza tu cuenta de ChurchApps en B1 Admin: edita nombre, correo y contraseña, activa la verificación en dos pasos, elige un tema o elimina tu cuenta."
---

# Administrar su perfil

<div class="article-intro">

La página de Perfil le permite editar la configuración de su cuenta personal. Su perfil se comparte entre todos los productos de ChurchApps, así que cualquier cambio que haga aquí se reflejará en todos los lugares donde use ChurchApps.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Debe haber iniciado sesión en su cuenta de ChurchApps
- Tenga listos su nuevo correo electrónico o contraseña si planea actualizarlos

</div>

## Información del perfil

La página de Perfil muestra su nombre y su correo electrónico a la izquierda, con un botón **Editar** debajo. Haga clic en **Editar** para abrir el formulario **Editar cuenta**, que contiene los datos básicos de su cuenta:

1. **Correo electrónico**: la dirección que usa para iniciar sesión y recibir notificaciones.
2. **Nombre** y **Apellido**: su nombre para mostrar en ChurchApps.
3. **Contraseña**: actualice la contraseña de su cuenta.

Para actualizar su información, edite los campos y haga clic en el botón **Guardar cambios**. Haga clic en **Cancelar** (o en el enlace **Volver a** con su nombre) para regresar a su perfil sin guardar.

## Cambiar su contraseña

1. En la página de Perfil, haga clic en **Editar**.
2. Escriba su **Contraseña actual**.
3. Escriba su nueva contraseña en el campo **Nueva contraseña**.
4. Vuelva a escribirla en el campo **Verificar contraseña**.
5. Haga clic en **Guardar cambios**.

:::info
Su contraseña debe tener al menos 8 caracteres. Asegúrese de que los campos de contraseña y confirmación coincidan exactamente. Debe confirmar su contraseña actual para cambiarla; si no la recuerda, use el enlace **Olvidé mi contraseña** de la página de inicio de sesión.
:::

## Cuentas vinculadas

La sección **Cuentas vinculadas** muestra los servicios externos conectados a su cuenta de ChurchApps. Desde esta sección puede ver qué cuentas están vinculadas y administrar esas conexiones.

## Verificación en dos pasos {#two-factor-sign-in}

La verificación en dos pasos agrega un segundo paso al inicio de sesión: después de su contraseña (o del inicio de sesión con Google, Microsoft o un enlace enviado por correo electrónico), también ingresa un código de 6 dígitos de una aplicación de autenticación en su teléfono, como Google Authenticator, Microsoft Authenticator, 1Password o Authy. Es opcional y viene desactivada por defecto. Una vez activada, se aplica a cada inicio de sesión de ChurchApps que use su cuenta: B1 Admin, el sitio y la aplicación de su iglesia en B1.church, B1 Church Checkin, Lessons.church, FreePlay y los demás.

### Activarla

1. En la página de Perfil, busque la sección **Verificación en dos pasos** y haga clic en **Activar**.
2. Escanee el código QR con su aplicación de autenticación. Si no puede escanearlo, escriba en la aplicación la clave que aparece debajo de **¿No puede escanear? Ingrese esta clave:**.
3. Escriba el **código de 6 dígitos** que muestra su aplicación y haga clic en **Verificar**.
4. B1 Admin muestra diez **códigos de respaldo**. Cada uno le permite iniciar sesión una vez si pierde su teléfono. Haga clic en **Copiar** o anótelos, guárdelos en un lugar seguro y haga clic en **Ya los guardé**.

:::warning
Los códigos de respaldo solo se muestran una vez. Si pierde su teléfono y no le quedan códigos de respaldo, un administrador del servidor de ChurchApps tendrá que desactivar la verificación en dos pasos por usted, después de confirmar su identidad.
:::

Cuando la verificación en dos pasos está activada, la sección indica **Activada** y muestra cuántos códigos de respaldo le quedan.

### Iniciar sesión con un código

Después de ingresar su contraseña, la pantalla de inicio de sesión pide un código. Ingrese el código de 6 dígitos de su aplicación de autenticación, o uno de sus códigos de respaldo, y envíelo. Cada código de respaldo funciona una sola vez. Si el código es incorrecto, verá "Ese código no funcionó. Inténtelo de nuevo." Después de demasiados códigos incorrectos, los inicios de sesión de su cuenta se pausan por un tiempo.

Permanecer con la sesión iniciada en un dispositivo donde ya inició sesión no vuelve a pedir un código; solo aparece cuando inicia sesión desde cero.

### Desactivarla

1. En la sección **Verificación en dos pasos**, haga clic en **Desactivar**.
2. Ingrese un código vigente de su aplicación de autenticación, o un código de respaldo.
3. Haga clic en **Verificar**.

:::info
La verificación en dos pasos no se puede configurar en cuentas de demostración, por lo que la sección se oculta allí.
:::

## Preferencias de tema

B1 Admin le permite elegir un tema de color y un modo de visualización claro u oscuro:

1. Haga clic en su foto de perfil en la esquina superior derecha de B1 Admin para abrir su menú de usuario.
2. En **Preferencias de tema**, elija un tema:
   - **Predeterminado**: el aspecto actual de B1 Admin, con paneles con borde sobre un fondo limpio. Los usuarios nuevos ven este tema hasta que elijan otro.
   - **Clásico**: el aspecto anterior de B1 Admin, con un encabezado de página de color, tarjetas con sombra y fondo gris. Si usó B1 Admin en este dispositivo antes de que llegara el nuevo aspecto y nunca eligió un tema, seguirá en Clásico.
   - **Personalizado**: el aspecto Predeterminado construido con el color de su propia iglesia. Usa el color principal del modo claro de **Móvil > Tema de la aplicación**, o el color principal de su sitio web si no hay un color de aplicación configurado, de modo que B1 Admin coincide con la aplicación de sus miembros.
3. Debajo de los temas, elija **Modo claro** o **Modo oscuro**.
4. La interfaz se actualiza de inmediato para reflejar su elección.

Sus preferencias se recuerdan en ese dispositivo y navegador.

## Eliminar la cuenta

En la sección **Eliminación de cuenta** de la página de Perfil encontrará la opción para eliminar su cuenta.

- Si su iglesia **no** ha configurado un Grupo de aprobación del directorio, al hacer clic en **Eliminar mi cuenta** se elimina su cuenta y los datos asociados de inmediato, y esto no se puede deshacer.
- Si su iglesia **sí** ha configurado un Grupo de aprobación del directorio, su solicitud se envía a ese grupo para revisión. El botón se desactiva mientras la solicitud está pendiente, y se le notificará cuando su iglesia la apruebe o la rechace. Consulte [Revisar solicitudes de eliminación de cuenta](./account-deletion.md) para saber qué sigue.

:::warning
La eliminación de la cuenta, ya sea inmediata o aprobada por su iglesia, es permanente y no se puede revertir.
:::

:::info
Si es **Administrador de dominio**, asegúrese de transferir las responsabilidades administrativas a otro usuario antes de eliminar su cuenta. Consulte [Roles y permisos](../settings/roles-permissions.md) para más detalles sobre la administración de roles de administrador.
:::

:::info
La edición del perfil está desactivada en el modo de demostración. Si usa una cuenta de demostración, no podrá hacer cambios en la configuración de su perfil.
:::

## Próximos pasos

- [Administrar dispositivos](./devices.md) -- Vea y administre sus dispositivos ChurchAppsPlayer conectados
