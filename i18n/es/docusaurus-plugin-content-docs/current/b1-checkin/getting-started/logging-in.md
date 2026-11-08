---
title: "Iniciar sesión en B1 Church Checkin"
sidebar_label: "Iniciar sesión"
description: "Inicia sesión en la aplicación de quiosco B1 Church Checkin, elige tu iglesia y conoce el inicio de sesión automático, la configuración de administrador y el cierre de sesión en la tableta de registro."
---

# Iniciar sesión

<div class="article-intro">

Antes de que el quiosco pueda usarse para el registro, debes iniciar sesión con una cuenta de ChurchApps que tenga acceso a tu iglesia. Esta página explica el proceso de inicio de sesión por primera vez, la selección de la iglesia, el comportamiento del inicio de sesión automático y cómo cerrar sesión.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Instala B1 Church Checkin en tu tableta Android (consulta [Primeros pasos](./index.md))
- Ten a mano el correo electrónico y la contraseña de tu cuenta de ChurchApps
- La cuenta necesita el permiso **Checkin** (o **Edit Attendance**) en tu iglesia. Un administrador lo agrega en B1 Admin en **Configuración > Roles** — consulta [Cuentas del quiosco de registro](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## Primer inicio de sesión

1. Abre la aplicación B1 Church Checkin. Después de la pantalla de presentación, verás la pantalla de inicio de sesión con el logotipo de B1 Church Checkin.
2. Introduce tu **correo electrónico** en el primer campo.
3. Introduce tu **contraseña** en el segundo campo.
4. Toca el botón **Iniciar sesión**.

La aplicación valida tus credenciales e inicia tu sesión. Si el correo electrónico o la contraseña son incorrectos, verás un mensaje de error en la parte inferior de la pantalla.

Si la cuenta tiene activada la [verificación en dos pasos](../../b1-admin/profile/managing-profile.md#two-factor-sign-in), la aplicación pedirá después un código. Introduce el código de 6 dígitos de la aplicación de autenticación del propietario de la cuenta, o uno de sus códigos de respaldo, y toca **Iniciar sesión** de nuevo. Solo necesitas el código en este primer inicio de sesión; después, el quiosco permanece con la sesión iniciada.

:::info
Es el mismo correo electrónico y la misma contraseña que usas en B1 Admin o en cualquier otro producto de ChurchApps. No necesitas una cuenta independiente para el quiosco de registro.
:::

## Seleccionar tu iglesia

Después de iniciar sesión correctamente, la aplicación carga las iglesias en las que tu cuenta tiene el permiso **Checkin** o **Edit Attendance**. Se omiten las iglesias en las que solo tienes otros permisos. Si no queda ninguna, la aplicación muestra **Sin acceso al registro** y te pide que pidas al administrador de tu iglesia que agregue el permiso Checkin a uno de tus roles. Cada iglesia se muestra como una tarjeta con el nombre y el logotipo de la iglesia (si se ha configurado en B1 Admin).

- Si tu cuenta está vinculada a **una sola iglesia**, verás igualmente la pantalla de selección. Toca tu iglesia para continuar.
- Si tu cuenta está vinculada a **varias iglesias**, toca la iglesia que quieres que sirva este quiosco.

Una vez que seleccionas una iglesia, la aplicación carga la identidad visual y la configuración de apariencia de esa iglesia. El logotipo de tu iglesia aparecerá en el encabezado de todas las pantallas siguientes.

## Inicio de sesión automático en visitas posteriores

Después del primer inicio de sesión correcto, la aplicación guarda en la tableta un token de inicio de sesión seguro y la iglesia seleccionada. No almacena tu contraseña. En los siguientes inicios de la aplicación:

- La aplicación te vuelve a iniciar sesión con el token guardado.
- Si habías seleccionado una iglesia antes, restaura esa selección y te lleva directamente a la **pantalla de servicios**.
- Si el inicio de sesión guardado ya no es válido, la aplicación vuelve a la pantalla de inicio de sesión para que puedas iniciar sesión de nuevo.

:::tip
Como el quiosco inicia sesión automáticamente, solo necesitas introducir las credenciales una vez durante la configuración inicial. Después, basta con encender la tableta y estará lista para usarse.
:::

## Configuración de administrador

La configuración de administrador está oculta a propósito para que los miembros de la iglesia que usan el quiosco no cambien la configuración por accidente. Para acceder a ella:

1. Toca el **logotipo de la iglesia** en el encabezado **siete veces** seguidas (en menos de dos segundos).
2. Si hay un PIN de quiosco configurado, introdúcelo cuando se te solicite.
3. Se abrirá la pantalla **Configuración de administrador** con las siguientes opciones:
   - **Cambiar servicio**: cambia la hora del servicio seleccionado
   - **Cambiar impresora**: abre la [configuración de impresora](./printer-setup.md) para buscar y seleccionar una impresora
   - **Establecer PIN de administrador** (o **Cambiar PIN de administrador** cuando ya esté configurado): establece o actualiza el PIN del quiosco que protege el acceso de administrador
   - **Transmisión de emergencia**: envía un mensaje de texto a los tutores de todos los hogares registrados (consulta [Transmisión de emergencia](../check-in/checking-out.md#emergency-broadcast))
   - **Modo de estación atendida**: un interruptor que añade la salida, la paginación, la reimpresión y la edición de perfiles a esta estación (consulta [Registrar salidas](../check-in/checking-out.md))
   - **Cerrar sesión**: cierra la sesión y vuelve a la pantalla de inicio de sesión

   Toca **Volver al quiosco** para regresar al registro.

:::warning
Cerrar sesión borra todas las credenciales guardadas y la selección de iglesia. Tendrás que volver a introducir tu correo electrónico y tu contraseña para usar el quiosco de nuevo. Cierra sesión solo cuando necesites cambiar de cuenta o reconfigurar el quiosco.
:::

## Próximos pasos

Una vez iniciada la sesión, puedes [configurar una impresora](./printer-setup.md) o ir directamente al [flujo de trabajo de registro](../check-in/index.md).
