---
title: "Configuración de Donaciones en Línea"
---

# Configuración de Donaciones en Línea

<div class="article-intro">

B1 Admin se integra con **Stripe**, **PayPal**, **Kingdom Funding**, y **Paystack** (para iglesias en África) para que sus miembros puedan hacer donaciones en línea a través de su sitio B1.church. Una vez configurado, las donaciones en línea aparecen automáticamente en sus registros de donaciones junto con los regalos ingresados manualmente, manteniendo todo en un solo sistema.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Configure sus [fondos de donación](funds.md) para que los donantes puedan designar sus regalos
- Cree una cuenta en Stripe en [stripe.com](https://stripe.com) y actívela (sáquela del modo de prueba)
- Tenga listos sus datos de acceso de B1 Admin

</div>

## Configurando Stripe

1. Cree una cuenta en [stripe.com](https://stripe.com) si no la tiene ya. Asegúrese de **activar su cuenta** y sacarla del modo de prueba.
2. En Stripe, vaya a **Developers > API Keys**.
3. Copie su **Publishable Key**.
4. Inicie sesión en [B1 Admin](https://admin.b1.church/).
5. Haga clic en **Church** en la navegación superior y luego haga clic en **Edit Church Settings**.
6. Haga clic en el icono de edición junto a **Church Settings**.
7. Desplácese hasta la sección **Giving**.
8. Establezca el **Provider** en **Stripe**.
9. Pegue su Publishable Key en el campo **Public Key**.
10. Vuelva a Stripe y revele su **Secret Key** (solo puede verla una vez, así que guarde una copia de seguridad).
11. Pegue la Secret Key en el campo **Secret Key** y haga clic en **Save**.

:::warning
Su Stripe Secret Key solo se muestra una vez. Cópiela a un lugar seguro antes de navegar fuera del panel de Stripe. Si la pierde, tendrá que generar una clave nueva.
:::

## Eligiendo Su Moneda

Después de seleccionar Stripe como su proveedor, aparece un menú desplegable de **Currency** junto a sus claves API. Elija la moneda que coincida con la moneda de liquidación de su cuenta de Stripe para que las donaciones se carguen correctamente.

Las monedas compatibles incluyen USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN, y BRL. Puede confirmar o cambiar la moneda predeterminada de su cuenta en su [Panel de Stripe](https://dashboard.stripe.com/settings/currencies).

:::info
La moneda que seleccione aquí se utiliza para donaciones únicas, suscripciones recurrentes, cálculos de tarifas e informes de donaciones. Si cambia de moneda más adelante, solo las nuevas donaciones y suscripciones usarán la nueva moneda — los regalos recurrentes existentes continúan en la moneda en la que fueron creados.
:::

:::warning
Asegúrese de que su cuenta de Stripe esté configurada para aceptar la moneda que elija. Si su cuenta de Stripe no soporta la moneda seleccionada, las donaciones fallarán en el pago.
:::

## Agregando una Página de Donación a Su Sitio B1.church

1. Vaya a [b1.church](https://b1.church/) e inicie sesión.
2. Haga clic en el icono de **Settings**.
3. Haga clic en **Add Tab**.
4. Elija **Donation** como el tipo.
5. Ingrese un nombre para la pestaña (p. ej., "Give") y haga clic en **Save**.
6. Opcionalmente, cambie el icono de la pestaña -- escriba "Giv" en la búsqueda de iconos para encontrar un icono relacionado con donaciones.

Su página de donación ya está activa. Los miembros pueden visitarla en `yoursubdomain.b1.church/donate`.

## Compartiendo Su Enlace de Donación

Para encontrar su URL de donación, vaya a **B1 Admin** y haga clic en el icono de **Settings** para ver su subdominio. Su enlace de donación sigue el formato:

`https://yoursubdomain.b1.church/donate`

Comparta este enlace en su sitio web, en correos electrónicos o en su boletín para que los miembros sepan dónde dar en línea.

## Notificaciones de Donación

Stripe envía una notificación por correo electrónico cada vez que se recibe una donación. Para cambiar la dirección de correo de notificación, vaya al panel de Stripe, haga clic en su perfil en la esquina superior derecha, elija **Profile**, y actualice su dirección de correo.

## Opciones de Tarifa de Procesamiento

Puede configurar su página de donación para permitir que los donantes carguen opcionalmente las tarifas de procesamiento para que su iglesia reciba la cantidad completa de la donación. Esta configuración se gestiona en los parámetros de su iglesia dentro de B1 Admin.

:::tip
Después de la configuración, haga una pequeña donación de prueba para confirmar que todo funciona correctamente antes de anunciar donaciones en línea a su congregación.
:::

## Configurando Kingdom Funding

Kingdom Funding es un procesador de pagos cristiano que soporta tarjetas de crédito/débito y transferencias bancarias ACH. Si su iglesia está inscrita en Kingdom Funding, puede conectarla como su puerta de donación.

:::info
La integración de Kingdom Funding está actualmente en beta. Contacte con su representante de cuenta de B1 para habilitarlo para su iglesia.
:::

1. Regístrese o inicie sesión en [kingdomfunding.org](https://kingdomfunding.org).
2. Obtenga su **Security Key** (pública) y **Private Key** del portal de comerciante de Kingdom Funding.
3. En B1 Admin, vaya a **Settings** y abra **Church Settings**.
4. En la sección **Giving**, establezca el **Provider** en **Kingdom Funding**.
5. Pegue su Security Key en el campo **Security Key** y su Private Key en el campo **Private Key**.
6. Establezca la **Webhook Key** que recibió de Kingdom Funding, y copie la URL de webhook mostrada en su configuración de comerciante de Kingdom Funding para que Kingdom Funding pueda notificar a B1 de las transacciones completadas.
7. Guarde.

Una vez conectado, los miembros verán un control de tarjeta/banco en la página de donación y pueden dar por tarjeta de crédito o transferencia ACH.

## Configurando Paystack (África)

Stripe no abre cuentas para iglesias en Ghana, Nigeria, Kenya, Sudáfrica o Costa de Marfil. [Paystack](https://paystack.com) sí, y acepta tarjetas locales, **dinero móvil** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), transferencia bancaria y USSD — los donantes pagan en su moneda local (GHS, NGN, KES, ZAR, XOF).

1. Regístrese en [paystack.com](https://paystack.com) con el certificado de registro comercial de su iglesia y su cuenta bancaria local, y complete la revisión de activación (go-live) de Paystack.
2. En el Panel de Paystack abra **Settings → API Keys & Webhooks** y copie la **Public Key** y **Secret Key** (use las claves activas, no las claves de prueba).
3. En B1 Admin, vaya a **Settings**, abra la sección **Giving** y haga clic en editar.
4. Establezca el **Provider** en **Paystack**, pegue la Public Key y Secret Key, y elija su **Currency**.
5. Copie la **webhook URL** mostrada debajo del proveedor, vuelva al Panel de Paystack (**Settings → API Keys & Webhooks**) y péguelo en el campo **Webhook URL**. Así es como se registran los regalos recurrentes y los pagos por dinero móvil.
6. Guarde.

Los donantes completan su pago en una ventana segura de Paystack y pueden elegir tarjeta, dinero móvil o transferencia bancaria allí. Notas:

- **Los regalos recurrentes** necesitan una tarjeta; el dinero móvil no se puede cobrar automáticamente nuevamente, así que Paystack solo permite regalos de dinero móvil únicos.
- Los regalos recurrentes de Paystack se pueden cancelar de B1 pero no se pueden pausar o editar — cancele y cree uno nuevo para cambiar la cantidad.
- La **Tarifa de Procesamiento** refleja las tasas de tarjeta local de Paystack para su moneda; edítela si sus tasas negociadas difieren.

## Próximos Pasos

- Use [Stripe Import](stripe-import.md) para extraer transacciones en línea en B1 Admin si no se están sincronizando automáticamente
- Verifique sus [Reportes de Donaciones](donation-reports.md) para confirmar que las donaciones en línea aparecen correctamente
- Genere [Declaraciones de Donaciones](giving-statements.md) que incluyan donaciones en línea y fuera de línea
