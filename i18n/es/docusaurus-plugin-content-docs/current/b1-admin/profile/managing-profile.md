---
title: "Administrar su perfil"
---

# Administrar su perfil

<div class="article-intro">

La página de Perfil le permite editar la configuración de su cuenta personal. Su perfil se comparte entre todos los productos de ChurchApps, así que cualquier cambio que haga aquí se reflejará en todos los lugares donde use ChurchApps.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Debe haber iniciado sesión en su cuenta de ChurchApps.
- Tenga lista su nueva dirección de correo electrónico o contraseña si planea actualizarlas.

</div>

## Información del perfil

La página de Perfil muestra su nombre y correo electrónico a la izquierda, con un botón **Editar** debajo. Haga clic en **Editar** para abrir el formulario **Editar cuenta**, que contiene los datos básicos de su cuenta:

1. **Correo electrónico**: su dirección de correo usada para iniciar sesión y recibir notificaciones.
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
Su contraseña debe tener al menos 8 caracteres. Asegúrese de que los campos de contraseña y confirmación coincidan exactamente. Debe confirmar su contraseña actual para cambiarla: si no la recuerda, use el enlace **Olvidé mi contraseña** en la página de inicio de sesión.
:::

## Cuentas vinculadas

La sección **Cuentas vinculadas** muestra los servicios externos conectados a su cuenta de ChurchApps. Puede ver qué cuentas están vinculadas y administrar esas conexiones desde esta sección.

## Inicio de sesión de dos factores

El inicio de sesión de dos factores agrega un segundo paso al iniciar sesión: después de su contraseña (o del enlace de inicio de sesión con Google, Microsoft o correo electrónico), también ingresa un código de 6 dígitos de una aplicación de autenticación en su teléfono, como Google Authenticator, Microsoft Authenticator, 1Password o Authy. Es opcional y está desactivado por defecto. Una vez activado, se aplica a todos los inicios de sesión de ChurchApps que usen su cuenta: B1 Admin, el sitio y la aplicación de B1.church de su iglesia, B1 Church Checkin, Lessons.church, FreePlay y los demás.

### Activarlo

1. En la página de Perfil, busque la sección **Inicio de sesión de dos factores** y haga clic en **Activar**.
2. Escanee el código QR con su aplicación de autenticación. Si no puede escanearlo, escriba en la aplicación la clave que aparece debajo de **¿No puede escanear? Ingrese esta clave:**.
3. Ingrese el **código de 6 dígitos** que muestra su aplicación y haga clic en **Verificar**.
4. B1 Admin muestra diez **códigos de respaldo**. Cada uno le permite iniciar sesión una vez si pierde su teléfono. Haga clic en **Copiar** o escríbalos, guárdelos en un lugar seguro y haga clic en **Ya los guardé**.

:::warning
Los códigos de respaldo se muestran solo una vez. Si pierde su teléfono y no le quedan códigos de respaldo, un administrador de servidor de ChurchApps tendrá que desactivar el inicio de sesión de dos factores por usted después de confirmar quién es.
:::

Cuando el inicio de sesión de dos factores está activado, la sección muestra **Activado** y cuántos códigos de respaldo le quedan.

### Iniciar sesión con un código

Después de ingresar su contraseña, la pantalla de inicio de sesión le pide un código. Ingrese el código de 6 dígitos de su aplicación de autenticación, o uno de sus códigos de respaldo, y envíelo. Cada código de respaldo funciona solo una vez. Si el código es incorrecto, verá "Ese código no funcionó. Inténtelo de nuevo." Después de demasiados códigos incorrectos, los inicios de sesión de su cuenta se pausan durante un rato.

Permanecer con la sesión iniciada en un dispositivo donde ya inició sesión no le pide un código de nuevo; solo aparece cuando inicia sesión desde cero.

### Desactivarlo

1. En la sección **Inicio de sesión de dos factores**, haga clic en **Desactivar**.
2. Ingrese un código vigente de su aplicación de autenticación, o un código de respaldo.
3. Haga clic en **Verificar**.

:::info
El inicio de sesión de dos factores no puede configurarse en cuentas de demostración, así que la sección está oculta allí.
:::

## Preferencias de tema

B1 Admin le permite elegir un tema de color y un modo de visualización claro u oscuro:

1. Haga clic en su foto de perfil en la esquina superior derecha de B1 Admin para abrir su menú de usuario.
2. En **Preferencias de tema**, elija un tema:
   - **Predeterminado**: el aspecto actual de B1 Admin, con paneles con borde sobre un lienzo limpio. Los usuarios nuevos ven este tema hasta que elijan otro.
   - **Clásico**: el aspecto anterior de B1 Admin, con un banner de página de color, tarjetas con sombra y un fondo gris. Si usó B1 Admin en este dispositivo antes de que llegara el nuevo aspecto y nunca eligió un tema, seguirá en Clásico.
   - **Personalizado**: el aspecto Predeterminado construido con el color de su iglesia. Usa el color primario del modo claro de **Móvil > Tema de la aplicación**, o el color primario de su sitio web si no hay color de aplicación configurado, para que B1 Admin coincida con la aplicación de sus miembros.
3. Debajo de los temas, elija **Modo claro** o **Modo oscuro**.
4. La interfaz se actualiza de inmediato para reflejar su elección.

Sus elecciones se recuerdan en ese dispositivo y navegador.

## Eliminación de cuenta

En la sección **Eliminación de cuenta** de la página de Perfil encontrará la opción para eliminar su cuenta.

- Si su iglesia **no** ha configurado un Grupo de aprobación de directorio, al hacer clic en **Eliminar mi cuenta** se elimina su cuenta y sus datos asociados de inmediato, y esto no puede deshacerse.
- Si su iglesia **sí** ha configurado un Grupo de aprobación de directorio, su solicitud se envía a ese grupo para revisión. El botón se desactiva mientras la solicitud está pendiente, y recibirá una notificación cuando su iglesia la apruebe o rechace. Consulte [Revisar solicitudes de eliminación de cuenta](./account-deletion.md) para saber qué sigue.

:::warning
La eliminación de cuenta, ya sea inmediata o aprobada por su iglesia, es permanente y no puede revertirse.
:::

:::info
Si es **Administrador de dominio**, asegúrese de transferir las responsabilidades administrativas a otro usuario antes de eliminar su cuenta. Consulte [Roles y permisos](../settings/roles-permissions.md) para más detalles sobre la administración de roles de administrador.
:::

:::info
La edición del perfil está desactivada en el modo de demostración. Si usa una cuenta de demostración, no podrá hacer cambios en la configuración de su perfil.
:::

## Siguientes pasos

- [Administrar dispositivos](./devices.md): vea y administre sus dispositivos ChurchAppsPlayer conectados
