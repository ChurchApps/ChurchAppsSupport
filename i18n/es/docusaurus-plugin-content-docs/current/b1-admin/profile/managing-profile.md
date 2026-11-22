---
title: "Administración de su perfil"
description: "Actualice su cuenta de ChurchApps en B1 Admin: edite su nombre, correo electrónico y contraseña, active el inicio de sesión de dos factores, elija un tema o elimine su cuenta."
---

# Administración de su perfil

<div class="article-intro">

La página Profile le permite editar la configuración personal de su cuenta. Su perfil se comparte entre todos los productos de ChurchApps, así que cualquier cambio que haga aquí se reflejará en todos los lugares donde use ChurchApps.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Debe haber iniciado sesión en su cuenta de ChurchApps
- Tenga listos su nuevo correo electrónico o su nueva contraseña si planea actualizarlos

</div>

## Cómo abrir su perfil {#opening-your-profile}

Haga clic en su foto de perfil en la esquina superior derecha de B1 Admin y elija **Edit Profile**. La página Profile tiene su nombre y correo electrónico a la izquierda, y las secciones **Linked Accounts**, **Two-Factor Sign-In** y **Account Deletion** a la derecha.

## Información del perfil {#profile-information}

La página Profile muestra su nombre y correo electrónico a la izquierda, con un botón **Edit** debajo. Haga clic en **Edit** para abrir el formulario **Edit Account**, que contiene los datos básicos de su cuenta:

1. **Email**: su dirección de correo electrónico, que usa para iniciar sesión y recibir notificaciones.
2. **First Name** y **Last Name**: su nombre para mostrar en ChurchApps.
3. **Current password**, **New password** y **Verify password**: complete estos campos solo si quiere cambiar su contraseña; déjelos en blanco para conservar la actual.

Para actualizar su información, edite los campos y haga clic en el botón **Save Changes**. Un mensaje **Changes saved.** confirma la actualización. Haga clic en **Cancel** (o en el enlace **Back to** con su nombre) para volver a su perfil sin guardar. Haga clic en el icono del ojo de un campo de contraseña para mostrar u ocultar lo que escribió.

## Cómo cambiar su contraseña {#changing-your-password}

1. En la página Profile, haga clic en **Edit**.
2. Introduzca su **Current password**.
3. Escriba su nueva contraseña en el campo **New password**.
4. Vuelva a escribirla en el campo **Verify password**.
5. Haga clic en **Save Changes**.

:::info
Su contraseña debe tener al menos 8 caracteres. Asegúrese de que la contraseña y la confirmación coincidan exactamente. Debe confirmar su contraseña actual para cambiarla; si no la recuerda, use el enlace **Forgot Password** de la página de inicio de sesión.
:::

## Cuentas vinculadas {#linked-accounts}

La sección **Linked Accounts** muestra los servicios externos que puede conectar a su cuenta de ChurchApps. Hoy es **PraiseCharts**, que se usa para buscar canciones y descargar cifrados y partituras de las [canciones](../serving/songs.md) de Serving. Muestra **Linked** o **Not linked**:

- Haga clic en **Link** e inicie sesión en PraiseCharts en la ventana que se abre para conectar su cuenta.
- Haga clic en **Sign Up** para crear primero una cuenta de PraiseCharts.
- Haga clic en **Unlink** para desconectarla.

## Inicio de sesión de dos factores {#two-factor-sign-in}

El inicio de sesión de dos factores agrega un segundo paso al iniciar sesión: después de su contraseña (o de un inicio de sesión con Google, Microsoft o un enlace por correo electrónico), también introduce un código de 6 dígitos de una aplicación de autenticación en su teléfono, como Google Authenticator, Microsoft Authenticator, 1Password o Authy. Es opcional y está desactivado de forma predeterminada. Una vez activado, se aplica a cada inicio de sesión de ChurchApps que use su cuenta: B1 Admin, el sitio y la aplicación de B1.church de su iglesia, B1 Church Checkin, Lessons.church, FreePlay y los demás.

### Cómo activarlo {#turning-it-on}

1. En la página Profile, busque la sección **Two-Factor Sign-In** y haga clic en **Turn on**.
2. Escanee el código QR con su aplicación de autenticación. Si no puede escanearlo, escriba la clave que aparece bajo **Can't scan? Enter this key:** en la aplicación.
3. Introduzca el **6-digit code** que muestra su aplicación y haga clic en **Verify**.
4. B1 Admin le muestra diez **backup codes**. Cada uno le permite iniciar sesión una vez si pierde su teléfono. Haga clic en **Copy** o escríbalos, guárdelos en un lugar seguro y haga clic en **I saved them**.

:::warning
Los códigos de respaldo solo se muestran una vez. Si pierde su teléfono y no le quedan códigos de respaldo, un administrador de servidores de ChurchApps tendrá que desactivar el inicio de sesión de dos factores por usted, después de confirmar su identidad.
:::

Cuando el inicio de sesión de dos factores está activado, la sección muestra **On** y cuántos códigos de respaldo le quedan.

### Cómo iniciar sesión con un código {#signing-in-with-a-code}

Después de introducir su contraseña, la pantalla de inicio de sesión le pide un código. Introduzca el código de 6 dígitos de su aplicación de autenticación, o uno de sus códigos de respaldo, y envíelo. Cada código de respaldo funciona una sola vez. Si el código es incorrecto, verá el mensaje "That code didn't work. Please try again." Después de demasiados códigos incorrectos, los inicios de sesión de su cuenta se pausan durante un tiempo.

Permanecer con la sesión iniciada en un dispositivo donde ya inició sesión no vuelve a pedir un código; solo aparece cuando inicia sesión de nuevo.

### Cómo desactivarlo {#turning-it-off}

1. En la sección **Two-Factor Sign-In**, haga clic en **Turn off**.
2. Introduzca un código vigente de su aplicación de autenticación, o un código de respaldo.
3. Haga clic en **Verify**.

:::info
El inicio de sesión de dos factores no se puede configurar en cuentas de demostración, así que la sección está oculta allí.
:::

## Preferencias de tema {#theme-preferences}

B1 Admin le permite elegir un tema de color y un modo de visualización claro u oscuro:

1. Haga clic en su foto de perfil en la esquina superior derecha de B1 Admin para abrir el menú de usuario.
2. En **Theme Preferences**, elija un tema:
   - **Default**: el aspecto actual de B1 Admin, con paneles con borde sobre un fondo limpio. Los usuarios nuevos ven este tema hasta que elijan otro.
   - **Classic**: el aspecto anterior de B1 Admin, con un banner de página de color, tarjetas con sombra y un fondo gris. Si usó B1 Admin en este dispositivo antes de que llegara el aspecto nuevo y nunca eligió un tema, seguirá con Classic.
   - **Custom**: el aspecto Default construido con el color propio de su iglesia. Usa el color primario del modo claro de **Mobile > App Theme**, o el color primario de su sitio web si no hay color de aplicación configurado, para que B1 Admin coincida con la aplicación de sus miembros.
3. Debajo de los temas, elija **Light Mode** o **Dark Mode**.
4. La interfaz se actualiza de inmediato para reflejar su elección.

Sus elecciones se recuerdan en ese dispositivo y navegador.

## Eliminación de cuenta {#account-deletion}

En la sección **Account Deletion** de la página Profile encontrará la opción para eliminar su cuenta.

- Si su iglesia **no** ha configurado un Directory Approval Group, la sección muestra la advertencia *"Careful, these actions are permanent"*. Haga clic en **Delete my account** y confirme; su cuenta y los datos asociados se eliminan de inmediato y se cierra su sesión. Esto no se puede deshacer.
- Si su iglesia **sí** ha configurado un Directory Approval Group, la sección indica que su iglesia revisa las solicitudes de eliminación. Haga clic en **Delete my account** y luego en **Send request**; la solicitud se envía a ese grupo para revisión. El botón queda deshabilitado mientras la solicitud está pendiente, y se le notificará cuando su iglesia la apruebe o la rechace. Consulte [Revisión de solicitudes de eliminación de cuenta](./account-deletion.md) para saber qué pasa después.

:::warning
La eliminación de cuenta, ya sea inmediata o aprobada por su iglesia, es permanente y no se puede revertir.
:::

:::info
Si es el único **Domain Admin** de su iglesia, B1 no eliminará su cuenta. Muestra "Usted es el único Domain Admin de *iglesia*. Haga que otra persona sea Domain Admin antes de eliminar su cuenta." Agregue primero a otro usuario a **Domain Admins**. Consulte [Roles y permisos](../settings/roles-permissions.md) para más detalles sobre la administración de roles de administrador.
:::

:::info
La edición del perfil está deshabilitada en el modo de demostración. Si usa una cuenta de demostración, no podrá hacer cambios en la configuración de su perfil.
:::

## Siguientes pasos {#next-steps}

- [Administración de dispositivos](./devices.md): vea y administre sus pantallas ChurchAppsPlayer y FreePlay conectadas
