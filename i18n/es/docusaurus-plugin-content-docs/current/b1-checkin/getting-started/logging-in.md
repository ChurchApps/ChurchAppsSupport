---
title: "Iniciar sesión"
---

# Iniciar sesión

<div class="article-intro">

Antes de que el kiosco pueda usarse para el registro de entrada, debe iniciar sesión con una cuenta de ChurchApps que tenga acceso a su iglesia. Esta página cubre el inicio de sesión por primera vez, la selección de iglesia, el comportamiento del inicio de sesión automático y cómo cerrar sesión.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Instale B1 Church Checkin en su tableta Android (consulte [Primeros pasos](./index.md))
- Tenga listos el correo electrónico y la contraseña de su cuenta de ChurchApps

</div>

## Primer inicio de sesión

1. Abra la aplicación B1 Church Checkin. Después de la pantalla de presentación, verá la pantalla de inicio de sesión con el logotipo de B1 Church Checkin.
2. Ingrese su **correo electrónico** en el primer campo.
3. Ingrese su **contraseña** en el segundo campo.
4. Toque el botón **Iniciar sesión**.

La aplicación valida sus credenciales e inicia su sesión. Si el correo electrónico o la contraseña son incorrectos, verá un mensaje de error en la parte inferior de la pantalla.

Si la cuenta tiene activada la [verificación en dos pasos](../../b1-admin/profile/managing-profile.md#two-factor-sign-in), la aplicación pedirá entonces un código. Ingrese el código de 6 dígitos de la aplicación de autenticación del propietario de la cuenta, o uno de sus códigos de respaldo, y toque **Iniciar sesión** de nuevo. Solo necesita el código para este primer inicio de sesión; después de eso, el kiosco permanece con la sesión iniciada.

:::info
Es el mismo correo electrónico y contraseña que usa para B1 Admin o cualquier otro producto de ChurchApps. No necesita una cuenta separada para el kiosco de registro de entrada.
:::

## Seleccionar su iglesia

Después de un inicio de sesión exitoso, la aplicación carga una lista de las iglesias vinculadas a su cuenta. Cada iglesia se muestra como una tarjeta con el nombre y el logotipo de la iglesia (si se ha configurado en B1 Admin).

- Si su cuenta está vinculada a **solo una iglesia**, igual verá la pantalla de selección. Toque su iglesia para continuar.
- Si su cuenta está vinculada a **varias iglesias**, toque la iglesia que este kiosco debe atender.

Una vez que selecciona una iglesia, la aplicación carga la identidad visual y la configuración de apariencia de esa iglesia. El logotipo de su iglesia aparecerá en el encabezado de todas las pantallas siguientes.

## Inicio de sesión automático en visitas posteriores

Después del primer inicio de sesión exitoso, la aplicación guarda en la tableta un token de sesión seguro y la iglesia seleccionada. No guarda su contraseña. En los siguientes inicios:

- La aplicación lo vuelve a conectar con el token guardado.
- Si previamente seleccionó una iglesia, restaura esa selección y lo lleva directamente a la **pantalla de servicios**.
- Si la sesión guardada ya no es válida, la aplicación regresa a la pantalla de inicio de sesión para que vuelva a iniciar sesión.

:::tip
Como el kiosco inicia sesión automáticamente, solo necesita ingresar las credenciales una vez durante la configuración inicial. Después de eso, basta con encender la tableta y estará lista para usarse.
:::

## Configuración de administrador

La configuración de administrador está oculta a propósito para que los miembros de la iglesia que usan el kiosco no cambien la configuración por error. Para acceder a ella:

1. Toque el **logotipo de la iglesia** en el encabezado **siete veces** seguidas (en menos de dos segundos).
2. Si hay un PIN de kiosco configurado, ingréselo cuando se le solicite.
3. Se abrirá la pantalla **Configuración de administrador** con las siguientes opciones:
   - **Cambiar servicio** — cambie el horario de servicio seleccionado
   - **Cambiar impresora** — abra la [configuración de impresora](./printer-setup) para buscar y seleccionar una impresora
   - **Establecer/Cambiar PIN** — establezca o actualice el PIN del kiosco que protege el acceso de administrador
   - **Cerrar sesión** — cierre la sesión y regrese a la pantalla de inicio de sesión

:::warning
Cerrar sesión borra todas las credenciales guardadas y la selección de iglesia. Tendrá que volver a ingresar su correo electrónico y contraseña para usar el kiosco de nuevo. Cierre sesión solo cuando necesite cambiar de cuenta o reconfigurar el kiosco.
:::

## Próximos pasos

Una vez que inicie sesión, puede [configurar una impresora](./printer-setup) o ir directamente al [flujo de registro de entrada](../check-in/).
