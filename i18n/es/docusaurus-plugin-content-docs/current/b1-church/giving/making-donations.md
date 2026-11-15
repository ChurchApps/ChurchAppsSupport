---
title: "Hacer donaciones en el portal de miembros de B1.church"
sidebar_label: "Hacer una donación"
description: "Haz una donación única o recurrente a tu iglesia a través de B1.church, con o sin cuenta, y revisa tu historial de donaciones después."
---

# Hacer una donación

<div class="article-intro">

Hay dos formas de hacer una donación a través del sitio de B1.church de tu iglesia: la página pública de donaciones (no requiere inicio de sesión) y la página de donaciones para miembros (requiere inicio de sesión). Ambas usan un formulario de donación seguro del proveedor de pagos de tu iglesia (la mayoría de las iglesias usa Stripe).

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Para donaciones públicas, no necesitas una cuenta; solo visita la página de **Donar** de tu iglesia.
- Para donaciones de miembros con seguimiento del historial y métodos de pago guardados, [inicia sesión](../getting-started/logging-in.md) en tu cuenta primero.

</div>

## Página pública de donaciones (no requiere inicio de sesión) {#public-donation-page-no-login-required}

Cualquier persona puede hacer una donación sin crear una cuenta:

1. Ve a la página de **Donar** de tu iglesia.
2. El formulario de donación se muestra en el lado izquierdo de la página. Elige **Hacer una donación** para una ofrenda única o **Hacer una donación recurrente** para dar según un calendario (elige la frecuencia y la fecha de inicio).
3. Ingresa tu **Nombre**, **Apellido** y **Correo electrónico**, y luego los datos de tu tarjeta.
4. En **Fondos**, ingresa un **Monto** y elige el **Fondo**. Haz clic en **Agregar más** para dividir tu donación entre varios fondos.
5. Opcionalmente, agrega una **Nota**. Si tu iglesia lo permite, puedes marcar la casilla para cubrir las comisiones de la transacción.
6. Haz clic en **Donar** para completar tu donación.

Para dar sin que tu nombre aparezca en la donación, marca **Dar de forma anónima (solo donaciones únicas)**. Los campos de nombre y la opción recurrente desaparecen.

En el lado derecho de la página, en **Administrar donaciones**, verás un enlace a **Instrucciones para pago por ACH** si prefieres dar por transferencia bancaria. También hay un botón **Iniciar sesión** (y un enlace **Iniciar sesión para administrar donaciones existentes** debajo del formulario) si quieres iniciar sesión para acceder a funciones adicionales, como el historial de donaciones.

La pantalla **Donaciones** del portal de miembros (`/mobile/donate`) muestra el mismo formulario cuando no has iniciado sesión, con un enlace **Inicia sesión para administrar donaciones recurrentes y ver el historial** debajo.

:::tip
Si ya has iniciado sesión cuando visitas la página pública de donaciones, se te redirigirá automáticamente a la página de donaciones para miembros, donde tienes acceso a tu historial completo de donaciones y a tus métodos de pago guardados.
:::

## Página de donaciones para miembros (con sesión iniciada) {#member-donation-page-logged-in}

Cuando has iniciado sesión, la página **Donaciones** del portal de miembros muestra un botón **Dar** y un botón **Imprimir estado de cuenta** en la parte superior, seguidos de estas secciones:

- **Este año** (con el año actual como título) -- Tu total de donaciones del año hasta la fecha y el número de donaciones, con un enlace **Todo el historial**. Consulta [Historial de donaciones](./donation-history.md) para más detalles.
- **Recurrentes** -- Tus donaciones programadas, con un enlace **Administrar**.
- **Actividad reciente** -- Tus últimas tres donaciones, con un enlace **Repetir la última donación** que abre el formulario de donación.
- **Métodos de pago** -- Tus tarjetas y cuentas bancarias guardadas, con un enlace **Administrar** para agregar una tarjeta o cuenta bancaria y editar o quitar las guardadas.
- Una tarjeta de progreso de campaña, si tu iglesia tiene una campaña activa.

Para dar:

1. Abre la página de donaciones desde la pestaña **Donar** de tu iglesia, desde el botón **Dar** en la sección **Donaciones** de tu [panel de Inicio](../getting-started/navigating.md#home), o desde **Historial** en la sección **Donaciones** de tu [página Yo](../getting-started/me-page.md). En la página de Donaciones, toca **Dar** para abrir el formulario de donación.
2. Elige **Hacer una donación** o **Hacer una donación recurrente**.
3. Selecciona un método de pago guardado o ingresa los datos de una tarjeta nueva. Al ingresar una tarjeta nueva, marca **Guardar esta tarjeta para futuras donaciones** para conservarla para la próxima vez (si el proveedor de tu iglesia admite tarjetas guardadas).
4. Elige el **Fondo** al que quieres dar e ingresa el **Monto**; haz clic en **Agregar más** para dar a más de un fondo. La lista muestra solo los fondos que tu iglesia ofrece a los donantes, aunque seas miembro del personal que puede ver otros fondos en B1 Admin.
5. Haz clic en **Vista previa de la donación** para revisar tu ofrenda y luego en **Donar** para completarla. **Cancelar** te devuelve a la página de Donaciones.

Después de procesar tu donación, aparecerá un mensaje de éxito y tu donación se mostrará en tu [historial de donaciones](./donation-history.md).

:::info
Si las donaciones que has dado se registraron en más de una moneda, tu total del año hasta la fecha y el total del Historial se convierten a la moneda de tu iglesia, con una nota de **Convertido con los tipos de cambio actuales** debajo. Las donaciones individuales en tu historial siguen mostrando su moneda original.
:::

## Métodos de pago {#payment-methods}

Las donaciones se procesan de forma segura a través del proveedor de pagos que tu iglesia tiene conectado. Lo que puedes pagar depende de ese proveedor:

- **Stripe** -- tarjeta de crédito o débito, o cuenta bancaria (ACH).
- **Kingdom Funding** -- tarjeta de crédito o débito, o cuenta bancaria (ACH).
- **Paystack** (iglesias en África) -- tarjetas locales y dinero móvil, en tu moneda local.
- **PayPal y Venmo** -- las iglesias que ya tenían PayPal configurado muestran los botones **PayPal** y **Venmo** encima de los campos de tarjeta para donaciones únicas. Las donaciones recurrentes usan los campos de tarjeta.

Cuando has iniciado sesión, tus métodos de pago pueden guardarse para usarlos en el futuro, lo que hace más rápido dar la próxima vez.

:::info Dar con cuenta bancaria sin iniciar sesión
Si das como invitado (sin iniciar sesión) con una cuenta bancaria, la cuenta debe verificarse al instante iniciando sesión en tu banco. Si no se puede, verás "No se pudo verificar esta cuenta bancaria al instante. Dona con tarjeta, o inicia sesión y agrega la cuenta bancaria en tu perfil de donaciones." Las cuentas bancarias que necesitan unos días de verificación solo se pueden agregar después de iniciar sesión.
:::

:::warning
Si tu donación no se completa, revisa bien tus datos de pago e inténtalo de nuevo. Si el problema persiste, comunícate con la oficina de tu iglesia para recibir ayuda.
:::

## Próximos pasos {#next-steps}

- [Historial de donaciones](./donation-history.md) -- Consulta tus donaciones anteriores e imprime estados de cuenta
