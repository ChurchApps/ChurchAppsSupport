---
title: "Configuración de Donaciones en Línea"
---

# Configuración de Donaciones en Línea

<div class="article-intro">

B1 Admin se integra con **Stripe**, **PayPal** y **Kingdom Funding** para que tus miembros puedan hacer donaciones en línea a través de tu sitio B1.church. Una vez configurado, las donaciones en línea aparecen automáticamente en tus registros de donaciones junto con los regalos ingresados manualmente, manteniendo todo en un solo sistema.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Configura tus [fondos de donación](funds.md) para que los donantes puedan designar sus regalos
- Crea una cuenta en Stripe en [stripe.com](https://stripe.com) y actívala (saca de modo de prueba)
- Ten listos tus datos de acceso de B1 Admin

</div>

## Configurar Stripe

1. Crea una cuenta en [stripe.com](https://stripe.com) si aún no tienes una. Asegúrate de **activar tu cuenta** y sacarla de modo de prueba.
2. En Stripe, ve a **Developers > API Keys**.
3. Copia tu **Publishable Key**.
4. Inicia sesión en [B1 Admin](https://admin.b1.church/).
5. Haz clic en **Church** en la navegación superior y luego haz clic en **Edit Church Settings**.
6. Haz clic en el icono de edición junto a **Church Settings**.
7. Desplázate hasta la sección **Giving**.
8. Establece el **Provider** en **Stripe**.
9. Pega tu Publishable Key en el campo **Public Key**.
10. Vuelve a Stripe y revela tu **Secret Key** (solo puedes verla una vez, así que guarda una copia de seguridad).
11. Pega la Secret Key en el campo **Secret Key** y haz clic en **Save**.

:::warning
Tu Stripe Secret Key solo se muestra una vez. Cópiala a un lugar seguro antes de navegar fuera del panel de Stripe. Si la pierdes, tendrás que generar una clave nueva.
:::

## Elegir tu Moneda

Después de seleccionar Stripe como tu proveedor, aparece un menú desplegable de **Currency** junto a tus claves API. Elige la moneda que coincida con la moneda de liquidación de tu cuenta de Stripe para que las donaciones se carguen correctamente.

Las monedas admitidas incluyen USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN y BRL. Puedes confirmar o cambiar la moneda predeterminada de tu cuenta en tu [Panel de Stripe](https://dashboard.stripe.com/settings/currencies).

:::info
La moneda que selecciones aquí se utiliza para donaciones únicas, suscripciones recurrentes, cálculos de tarifas e informes de donaciones. Si cambias de moneda más adelante, solo las nuevas donaciones y suscripciones usarán la nueva moneda — los regalos recurrentes existentes continúan en la moneda en la que fueron creados.
:::

:::warning
Asegúrate de que tu cuenta de Stripe esté configurada para aceptar la moneda que elijas. Si tu cuenta de Stripe no admite la moneda seleccionada, las donaciones fallarán en el pago.
:::

## Agregar una Página de Donación a tu Sitio B1.church

1. Ve a [b1.church](https://b1.church/) e inicia sesión.
2. Haz clic en el icono de **Settings**.
3. Haz clic en **Add Tab**.
4. Elige **Donation** como el tipo.
5. Ingresa un nombre para la pestaña (p. ej., "Give") y haz clic en **Save**.
6. Opcionalmente, cambia el icono de la pestaña -- escribe "Giv" en la búsqueda de iconos para encontrar un icono relacionado con donaciones.

Tu página de donación ya está activa. Los miembros pueden visitarla en `yoursubdomain.b1.church/donate`.

## Compartir tu Enlace de Donación

Para encontrar tu URL de donación, ve a **B1 Admin** y haz clic en el icono de **Settings** para ver tu subdominio. Tu enlace de donación sigue el formato:

`https://yoursubdomain.b1.church/donate`

Comparte este enlace en tu sitio web, en correos electrónicos o en tu boletín para que los miembros sepan dónde dar en línea.

## Notificaciones de Donación

Stripe envía una notificación por correo electrónico cada vez que se recibe una donación. Para cambiar la dirección de correo de notificación, ve al panel de Stripe, haz clic en tu perfil en la esquina superior derecha, elige **Profile** y actualiza tu dirección de correo.

## Opciones de Tarifa de Procesamiento

Puedes configurar tu página de donación para permitir que los donantes carguen opcionalmente las tarifas de procesamiento para que tu iglesia reciba el monto completo de la donación. Esta configuración se gestiona en los parámetros de tu iglesia dentro de B1 Admin.

:::tip
Después de la configuración, haz una pequeña donación de prueba para confirmar que todo funciona correctamente antes de anunciar donaciones en línea a tu congregación.
:::

## Configurar Kingdom Funding

Kingdom Funding es un procesador de pagos cristiano que admite tarjetas de crédito/débito y transferencias bancarias ACH. Si tu iglesia está inscrita en Kingdom Funding, puedes conectarla como tu puerta de donación.

:::info
La integración de Kingdom Funding está actualmente en fase beta. Contacta con tu representante de cuenta de B1 para habilitarlo para tu iglesia.
:::

1. Regístrate o inicia sesión en [kingdomfunding.org](https://kingdomfunding.org).
2. Obtén tu **Security Key** (pública) y **Private Key** del portal de comerciante de Kingdom Funding.
3. En B1 Admin, ve a **Settings** y abre **Church Settings**.
4. En la sección **Giving**, establece el **Provider** en **Kingdom Funding**.
5. Pega tu Security Key en el campo **Security Key** y tu Private Key en el campo **Private Key**.
6. Establece la **Webhook Key** que recibiste de Kingdom Funding y copia la URL de webhook mostrada en tu configuración de comerciante de Kingdom Funding para que Kingdom Funding pueda notificar a B1 de las transacciones completadas.
7. Guarda.

Una vez conectado, los miembros verán un control de tarjeta/banco en la página de donación y pueden dar por tarjeta de crédito o transferencia ACH.

## Próximos Pasos

- Usa [Stripe Import](stripe-import.md) para extraer transacciones en línea en B1 Admin si no se están sincronizando automáticamente
- Verifica tus [Donation Reports](donation-reports.md) para confirmar que las donaciones en línea aparecen correctamente
- Genera [Giving Statements](giving-statements.md) que incluyan donaciones en línea y fuera de línea
