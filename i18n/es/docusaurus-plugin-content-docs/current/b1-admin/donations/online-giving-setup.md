---
title: "Configuración de donaciones en línea"
---

# Configuración de donaciones en línea

<div class="article-intro">

B1 Admin se integra con **Stripe**, **PayPal**, **Kingdom Funding** y **Paystack** (para iglesias en África) para que tus miembros puedan donar en línea a través de tu sitio de B1.church. Una vez configurado, las donaciones en línea aparecen automáticamente en tus registros de donaciones junto con las contribuciones introducidas manualmente, manteniendo todo en un solo sistema.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configura tus [fondos de donación](funds.md) para que los donantes puedan indicar el destino de sus aportaciones
- Crea una cuenta de Stripe en [stripe.com](https://stripe.com) y actívala (sácala del modo de prueba)
- Ten a mano tus credenciales de inicio de sesión de B1 Admin

</div>

## Configurar Stripe

1. Crea una cuenta en [stripe.com](https://stripe.com) si aún no tienes una. Asegúrate de **activar tu cuenta** y sacarla del modo de prueba.
2. En Stripe, ve a **Developers > API Keys**.
3. Copia tu **Publishable Key**.
4. Inicia sesión en [B1 Admin](https://admin.b1.church/).
5. Ve a **Settings** y abre la sección **Giving**.
6. Haz clic en **Edit** en la sección **Giving**.
7. Establece el **Provider** en **Stripe**.
8. Pega tu Publishable Key en el campo **Public Key**.
9. Regresa a Stripe y revela tu **Secret Key** (solo puedes verla una vez, así que guarda una copia de seguridad).
10. Pega la Secret Key en el campo **Secret Key** y haz clic en **Save**.

:::warning
Tu Secret Key de Stripe solo se muestra una vez. Cópiala en un lugar seguro antes de salir del panel de Stripe. Si la pierdes, tendrás que generar una nueva clave.
:::

## Elegir tu moneda

Después de seleccionar Stripe como proveedor, aparece un menú desplegable **Currency** junto a tus claves de API. Elige la moneda que coincida con la moneda de liquidación de tu cuenta de Stripe para que las donaciones se cobren correctamente.

Las monedas admitidas incluyen USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN y BRL. Puedes confirmar o cambiar la moneda predeterminada de tu cuenta en tu [Stripe Dashboard](https://dashboard.stripe.com/settings/currencies).

:::info
La moneda que selecciones aquí se usa para donaciones únicas, suscripciones recurrentes, cálculos de comisiones e informes de donaciones. Si cambias de moneda más adelante, solo las nuevas donaciones y suscripciones usarán la nueva moneda; los regalos recurrentes existentes continúan en la moneda con la que se crearon.
:::

:::warning
Asegúrate de que tu cuenta de Stripe esté configurada para aceptar la moneda que elijas. Si tu cuenta de Stripe no admite la moneda seleccionada, las donaciones fallarán al pagar.
:::

## Apple Pay y Google Pay

Las iglesias que usan Stripe obtienen automáticamente los botones de Apple Pay y Google Pay en la página pública de donaciones. Los botones aparecen encima de los campos de tarjeta para las donaciones únicas, una vez que el donante ha elegido un fondo y un monto, y solo cuando el navegador o dispositivo del donante tiene configurada una billetera. Las donaciones recurrentes siguen usando los campos de tarjeta o de cuenta bancaria.

Google Pay no requiere configuración. Apple Pay requiere que el dominio de tu página de donaciones esté registrado en Stripe; B1 lo registra la primera vez que se carga la página de donaciones en tu dominio. Si el botón de Apple Pay no aparece en un iPhone, revisa **Settings > Payment method domains** en tu Stripe Dashboard y confirma que tu dominio `yoursubdomain.b1.church` (o personalizado) aparezca en la lista y esté verificado.

## Donaciones anónimas

Los donantes de la página pública de donaciones pueden marcar **Give anonymously**. Una donación anónima se registra sin donante asociado, igualmente se destina al fondo elegido por el donante y aparece como **Anonymous** en tus lotes e informes. El correo electrónico del donante sigue siendo obligatorio para poder enviar el recibo, pero no se crea ningún registro de persona. Las donaciones anónimas son solo únicas y no aparecen en ningún estado de donaciones.

## Donaciones recurrentes fallidas

Cuando una donación recurrente en Stripe falla (por ejemplo, por una tarjeta vencida o rechazada), el cargo fallido aparece en **Donations > Failed Gifts** con el donante, el monto, la fecha y el motivo que indicó la pasarela. Haz clic en **Retry** para volver a intentar el cargo una vez que el donante haya actualizado su método de pago.

B1 también envía un correo electrónico al donante cuando el cargo falla, y vuelve a enviarlo tres y siete días después si aún no se ha completado, con un enlace para actualizar su método de pago en B1.church.

:::info
Si tu iglesia configuró Stripe antes de que existiera esta función, abre **Settings** > **Giving**, haz clic en editar y haz clic en **Save** una vez. Esto actualiza el webhook de Stripe para que los cargos fallidos se reporten a B1.
:::

## Agregar una página de donaciones a tu sitio de B1.church

1. Ve a [b1.church](https://b1.church/) e inicia sesión.
2. Haz clic en el icono **Settings**.
3. Haz clic en **Add Tab**.
4. Elige **Donation** como tipo.
5. Escribe un nombre para la pestaña (por ejemplo, "Give") y haz clic en **Save**.
6. Opcionalmente, cambia el icono de la pestaña: escribe "Giv" en la búsqueda de iconos para encontrar un icono relacionado con las donaciones.

Tu página de donaciones ya está activa. Los miembros pueden visitarla en `yoursubdomain.b1.church/donate`.

## Compartir tu enlace de donaciones

Para encontrar la URL de tus donaciones, ve a **B1 Admin** y haz clic en el icono **Settings** para ver tu subdominio. El enlace de donaciones tiene este formato:

`https://yoursubdomain.b1.church/donate`

Comparte este enlace en tu sitio web, en correos electrónicos o en tu boletín para que los miembros sepan dónde donar en línea.

### Enlaces con un fondo y monto preestablecidos

Para enviar a los donantes directamente a un fondo específico, ve a **Donations > Funds** y haz clic en **Giving Link** en el fondo. Opcionalmente, escribe un monto y luego copia el enlace. Cuando un donante lo abra, el fondo y el monto ya estarán seleccionados en la página de donaciones. El enlace tiene esta forma:

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

Los mismos parámetros funcionan en el elemento **Donate Link** del creador de sitios web.

## Notificaciones de donación

Stripe envía una notificación por correo electrónico cada vez que se recibe una donación. Para cambiar la dirección de correo de las notificaciones, ve al panel de Stripe, haz clic en tu perfil en la esquina superior derecha, elige **Profile** y actualiza tu dirección de correo electrónico.

## Opciones de comisiones de procesamiento

Puedes configurar tu página de donaciones para que los donantes puedan cubrir opcionalmente las comisiones de procesamiento, de modo que tu iglesia reciba el monto completo de la donación. Esta configuración se administra en la configuración de tu iglesia dentro de B1 Admin.

:::tip
Después de la configuración, haz una pequeña donación de prueba para confirmar que todo funciona antes de anunciar las donaciones en línea a tu congregación.
:::

## Configurar Kingdom Funding

Kingdom Funding es un procesador de pagos cristiano que admite tarjetas de crédito o débito y transferencias bancarias ACH. Si tu iglesia está inscrita en Kingdom Funding, puedes conectarlo como tu pasarela de donaciones.

:::info
La integración con Kingdom Funding está actualmente en beta. Comunícate con tu representante de cuenta de B1 para habilitarla en tu iglesia.
:::

1. Regístrate o inicia sesión en [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply).
2. Obtén tu **Security Key** (pública) y tu **Private Key** desde el portal de comerciantes de Kingdom Funding.
3. En B1 Admin, ve a **Settings**, abre la sección **Giving** y haz clic en editar.
4. Establece el **Provider** en **Kingdom Funding**.
5. Pega tu Security Key en el campo **Security Key** y tu Private Key en el campo **Private Key**.
6. Escribe la **Webhook Key** que recibiste de Kingdom Funding y copia la URL del webhook que se muestra en la configuración de comerciante de Kingdom Funding, para que Kingdom Funding pueda notificar a B1 las transacciones completadas.
7. Guarda.

Una vez conectado, los miembros verán un interruptor de tarjeta/cuenta bancaria en la página de donaciones y podrán donar con tarjeta de crédito o transferencia ACH.

## Botones de PayPal y Venmo

Las iglesias que usan **PayPal** como proveedor obtienen los botones de **PayPal** y **Venmo** encima de los campos de tarjeta en la página de donaciones para las donaciones únicas. Los donantes que hagan clic en uno completan el pago en una ventana de PayPal, y la donación se registra como cualquier otra donación en línea. Venmo solo aparece para donantes en Estados Unidos y en dispositivos que PayPal considere elegibles. Las donaciones recurrentes siguen usando los campos de tarjeta.

## Configurar Paystack (África)

Stripe no abre cuentas para iglesias en Ghana, Nigeria, Kenia, Sudáfrica ni Costa de Marfil. [Paystack](https://paystack.com) sí lo hace, y acepta tarjetas locales, **dinero móvil** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), transferencias bancarias y USSD. Los donantes pagan en tu moneda local (GHS, NGN, KES, ZAR, XOF).

1. Regístrate en [paystack.com](https://paystack.com) con el certificado de registro comercial de tu iglesia y una cuenta bancaria local, y completa la revisión de activación (puesta en marcha) de Paystack.
2. En el Paystack Dashboard, abre **Settings → API Keys & Webhooks** y copia la **Public Key** y la **Secret Key** (usa las claves reales, no las de prueba).
3. En B1 Admin, ve a **Settings**, abre la sección **Giving** y haz clic en editar.
4. Establece el **Provider** en **Paystack**, pega la Public Key y la Secret Key, y elige tu **Currency**.
5. Copia la **webhook URL** que se muestra debajo del proveedor, regresa al Paystack Dashboard (**Settings → API Keys & Webhooks**) y pégala en el campo **Webhook URL**. Así es como se registran las donaciones recurrentes y los pagos por dinero móvil.
6. Guarda.

Los donantes completan su pago en una ventana segura de Paystack y allí pueden elegir tarjeta, dinero móvil o transferencia bancaria. Notas:

- **Las donaciones recurrentes** requieren tarjeta; el dinero móvil no puede volver a cobrarse automáticamente, así que Paystack solo permite donaciones únicas por dinero móvil.
- Las donaciones recurrentes de Paystack pueden cancelarse desde B1, pero no pausarse ni editarse; para cambiar el monto, cancela y crea una nueva.
- Los valores de **Processing Fee** predeterminados reflejan las tarifas de Paystack para tarjetas locales en tu moneda; edítalos si tus tarifas negociadas son diferentes.

## Siguientes pasos

- Usa [Importación de Stripe](stripe-import.md) para traer transacciones en línea a B1 Admin si no se sincronizan automáticamente
- Revisa tus [Informes de donaciones](donation-reports.md) para verificar que las donaciones en línea aparezcan correctamente
- Genera [Estados de donaciones](giving-statements.md) que incluyan tanto las donaciones en línea como las offline
