---
title: "Inicio de sesión"
---

# Inicio de sesión

<div class="article-intro">

Antes de que el quiosco pueda usarse para el registro de entrada, debe iniciar sesión con una cuenta de ChurchApps que tenga acceso a su iglesia. Esta página cubre el proceso de inicio de sesión la primera vez, la selección de iglesia, el comportamiento del inicio de sesión automático y cómo cerrar sesión.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Instale B1 Church Checkin en su tableta Android (consulte [Primeros pasos](./index.md))
- Tenga a mano el correo electrónico y la contraseña de su cuenta de ChurchApps
- La cuenta necesita el permiso **Checkin** (o **Editar asistencia**) en su iglesia. Un administrador lo agrega en B1 Admin, en **Configuración > Roles**; consulte [Cuentas de quiosco de registro de entrada](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## Primer inicio de sesión

1. Abra la aplicación B1 Church Checkin. Después de la pantalla de presentación, verá la pantalla de inicio de sesión con el logotipo de B1 Church Checkin.
2. Escriba su **correo electrónico** en el primer campo.
3. Escriba su **contraseña** en el segundo campo.
4. Toque el botón **Iniciar sesión**.

La aplicación valida sus credenciales e inicia su sesión. Si el correo o la contraseña son incorrectos, verá un mensaje de error en la parte inferior de la pantalla.

Si la cuenta tiene activada la [verificación en dos pasos](../../b1-admin/profile/managing-profile.md#two-factor-sign-in), la aplicación pedirá después un código. Ingrese el código de 6 dígitos de la aplicación de autenticación del titular de la cuenta, o uno de sus códigos de respaldo, y toque **Iniciar sesión** de nuevo. Solo necesita el código en este primer inicio de sesión; después, el quiosco permanece con la sesión iniciada.

:::info
Es el mismo correo electrónico y la misma contraseña que usa para B1 Admin o cualquier otro producto de ChurchApps. No necesita una cuenta separada para el quiosco de registro de entrada.
:::

## Seleccionar su iglesia

Después de un inicio de sesión exitoso, la aplicación carga las iglesias en las que su cuenta tiene el permiso **Checkin** o **Editar asistencia**. Se omiten las iglesias en las que solo tiene otros permisos. Si no queda ninguna, la aplicación muestra **Sin acceso al registro de entrada** y le pide que su administrador de la iglesia agregue el permiso Checkin a uno de sus roles. Cada iglesia se muestra como una tarjeta con el nombre y el logotipo de la iglesia (si se configuró uno en B1 Admin).

- Si su cuenta está vinculada **solo a una iglesia**, aun así verá la pantalla de selección. Toque su iglesia para continuar.
- Si su cuenta está vinculada a **varias iglesias**, toque la iglesia que quiere que atienda este quiosco.

Una vez seleccionada la iglesia, la aplicación carga su identidad visual y la configuración de apariencia. El logotipo de su iglesia aparecerá en el encabezado de todas las pantallas siguientes.

## Inicio de sesión automático en visitas posteriores

Después del primer inicio de sesión exitoso, la aplicación guarda en la tableta un token de inicio de sesión seguro y la iglesia seleccionada. No almacena su contraseña. En los siguientes inicios de la aplicación:

- La aplicación lo vuelve a iniciar sesión con el token guardado.
- Si antes seleccionó una iglesia, restaura esa selección y lo lleva directamente a la **pantalla de servicios**.
- Si el inicio de sesión guardado ya no es válido, la aplicación regresa a la pantalla de inicio de sesión para que vuelva a iniciar sesión.

:::tip
Como el quiosco inicia sesión automáticamente, solo necesita ingresar las credenciales una vez durante la configuración inicial. Después, la tableta puede encenderse y estará lista para usarse.
:::

## Configuración de administrador

La configuración de administrador está oculta a propósito, para que los miembros de la iglesia que usan el quiosco no cambien la configuración por accidente. Para acceder a ella:

1. Toque el **logotipo de la iglesia** en el encabezado **siete veces** seguidas (en menos de dos segundos).
2. Si hay un PIN de quiosco configurado, ingréselo cuando se le solicite.
3. Se abrirá la pantalla de **Configuración de administrador** con las siguientes opciones:
   - **Cambiar servicio**: cambiar el horario de servicio seleccionado
   - **Cambiar impresora**: abrir la [configuración de impresora](./printer-setup) para buscar y seleccionar una impresora
   - **Establecer/Cambiar PIN**: establecer o actualizar el PIN del quiosco que protege el acceso de administrador
   - **Cerrar sesión**: cerrar la sesión y regresar a la pantalla de inicio de sesión

:::warning
Cerrar sesión borra todas las credenciales guardadas y la selección de iglesia. Tendrá que volver a ingresar su correo electrónico y su contraseña para usar el quiosco de nuevo. Cierre sesión solo cuando necesite cambiar de cuenta o reconfigurar el quiosco.
:::

## Próximos pasos

Una vez iniciada la sesión, puede [configurar una impresora](./printer-setup) o ir directamente al [flujo de registro de entrada](../check-in/).
