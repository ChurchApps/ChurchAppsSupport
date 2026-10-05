---
title: "Configuración de donaciones en línea"
---

# Configuración de donaciones en línea

<div class="article-intro">

B1 Admin se integra con **Stripe**, **PayPal**, **Kingdom Funding** y **Paystack** (para iglesias en África) para que sus miembros puedan dar en línea a través de su sitio B1.church. Una vez configurado, las donaciones en línea aparecen automáticamente en sus registros de donaciones junto a los regalos ingresados manualmente, manteniendo todo en un sistema.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configure sus [fondos de donaciones](funds.md) para que los donantes puedan designar sus regalos
- Cree una cuenta en Stripe en [stripe.com](https://stripe.com) y actívela (sáquela del modo de prueba)
- Tenga listos sus credenciales de inicio de sesión de B1 Admin

</div>

## Configurar Stripe

1. Cree una cuenta en [stripe.com](https://stripe.com) si aún no tiene una. Asegúrese de **activar su cuenta** y sacarla del modo de prueba.
2. En Stripe, vaya a **Developers > API Keys**.
3. Copie su **clave publicable (Publishable Key)**.
4. Inicie sesión en [B1 Admin](https://admin.b1.church/).
5. Vaya a **Settings** y abra la sección **Giving**.
6. Haga clic en el icono de edición en la sección **Giving**.
7. Configure el **Provider** a **Stripe**.
8. Pegue su clave publicable en el campo **Public Key**.
9. Vuelva a Stripe y revele su **clave secreta (Secret Key)** (solo puede verla una vez, así que guarde una copia de seguridad).
10. Pegue la clave secreta en el campo **Secret Key** y haga clic en **Save**.

:::warning
Su clave secreta de Stripe solo se muestra una vez. Cópiela a una ubicación segura antes de navegar fuera del panel de Stripe. Si la pierde, tendrá que generar una nueva clave.
:::

## Elegir su moneda

Después de seleccionar Stripe como su proveedor, aparece un menú desplegable de **Currency** junto a sus claves de API. Elija la moneda que coincida con la moneda de liquidación de su cuenta de Stripe para que las donaciones se cobren correctamente.

Las monedas compatibles incluyen USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN y BRL. Puede confirmar o cambiar la moneda predeterminada de su cuenta en su [panel de Stripe](https://dashboard.stripe.com/settings/currencies).

:::info
La moneda que seleccione aquí se utiliza para donaciones únicas, suscripciones recurrentes, cálculos de tarifas e informes de donaciones. Si cambia de moneda más tarde, solo las nuevas donaciones y suscripciones utilizarán la nueva moneda; los regalos recurrentes existentes continúan en la moneda en la que fueron creados.
:::

:::warning
Asegúrese de que su cuenta de Stripe esté configurada para aceptar la moneda que elige. Si su cuenta de Stripe no admite la moneda seleccionada, las donaciones fallarán en el pago.
:::

## Apple Pay y Google Pay

Las iglesias en Stripe obtienen botones de Apple Pay y Google Pay en la página de donaciones pública automáticamente. Los botones aparecen encima de los campos de tarjeta para regalos únicos una vez que el donante ha elegido un fondo y una cantidad, y solo cuando el navegador o dispositivo del donante tiene una billetera configurada. Los regalos recurrentes siguen utilizando los campos de tarjeta o banco.

Google Pay no requiere configuración. Apple Pay requiere que el dominio de su página de donaciones esté registrado con Stripe; B1 lo registra la primera vez que se carga la página de donaciones en su dominio. Si el botón de Apple Pay no aparece en un iPhone, verifique **Settings > Payment method domains** en su panel de Stripe y confirme que su dominio `yoursubdomain.b1.church` (o personalizado) está listado y verificado.

## Regalos anónimos

Los donantes en la página de donaciones públicas pueden marcar **Give anonymously**. Un regalo anónimo se registra sin un donante asociado, sigue siendo para el fondo que el donante eligió, y aparece como **Anonymous** en sus lotes e informes. El correo electrónico del donante sigue siendo requerido para que se pueda enviar el recibo, pero no se crea ningún registro de persona. Los regalos anónimos son únicos y no aparecen en ninguna declaración de donaciones.

## Regalos recurrentes fallidos

Cuando un regalo recurrente en Stripe falla (una tarjeta vencida o rechazada, por ejemplo), el cargo fallido aparece bajo **Donations > Failed Gifts** con el donante, la cantidad, la fecha y la razón que dio la puerta de enlace. Haga clic en **Retry** para intentar el cargo nuevamente una vez que el donante haya actualizado su método de pago.

B1 también envía un correo electrónico al donante cuando el cargo falla, y nuevamente tres y siete días después si aún no se ha procesado, con un enlace para actualizar su método de pago en B1.church.

:::info
Si su iglesia configuró Stripe antes de que esta función existiera, abra **Settings** > **Giving**, haga clic en editar y haga clic en **Save** una vez. Eso actualiza el webhook de Stripe para que los cargos fallidos se reporten a B1.
:::

## Agregar una página de donaciones a su sitio B1.church

1. Vaya a [b1.church](https://b1.church/) e inicie sesión.
2. Haga clic en el icono de **Settings**.
3. Haga clic en **Add Tab**.
4. Elija **Donation** como el tipo.
5. Ingrese un nombre para la pestaña (por ejemplo, "Give") y haga clic en **Save**.
6. Opcionalmente, cambie el icono de la pestaña; escriba "Giv" en la búsqueda de iconos para encontrar un icono relacionado con donaciones.

Su página de donaciones ahora está activa. Los miembros pueden visitarla en `yoursubdomain.b1.church/donate`.

## Compartir su enlace de donaciones

Para encontrar su URL de donaciones, vaya a **B1 Admin** y haga clic en el icono de **Settings** para ver su subdominio. Su enlace de donaciones sigue el formato:

`https://yoursubdomain.b1.church/donate`

Comparta este enlace en su sitio web, en correos electrónicos o en su boletín para que los miembros sepan dónde dar en línea.

### Enlaces con fondo y cantidad preestablecidos

Para enviar a los donantes directamente a un fondo específico, vaya a **Donations > Funds** y haga clic en **Giving Link** en el fondo. Opcionalmente ingrese una cantidad y luego copie el enlace. Cuando un donante lo abre, el fondo y la cantidad ya están seleccionados en la página de donaciones. El enlace toma la forma:

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

Los mismos parámetros funcionan en el elemento **Donate Link** del constructor de sitios web.

## Notificaciones de donaciones

Stripe envía una notificación por correo electrónico cada vez que se recibe una donación. Para cambiar la dirección de correo electrónico de notificación, vaya al panel de Stripe, haga clic en su perfil en la esquina superior derecha, elija **Profile** y actualice su dirección de correo electrónico.

## Opciones de tarifa de procesamiento

Puede configurar su página de donaciones para permitir que los donantes cubre opcionalmente las tarifas de procesamiento para que su iglesia reciba el monto de donación completo. Esta configuración se gestiona en la configuración de su iglesia dentro de B1 Admin.

:::tip
Después de la configuración, haga una pequeña donación de prueba para confirmar que todo está funcionando antes de anunciar las donaciones en línea a su congregación.
:::

## Configurar Kingdom Funding

Kingdom Funding es un procesador de pagos cristiano que admite tarjetas de crédito/débito y transferencias bancarias ACH. Si su iglesia está inscrita en Kingdom Funding, puede conectarlo como su puerta de enlace de donaciones.

:::info
La integración de Kingdom Funding está actualmente en beta. Póngase en contacto con su representante de cuenta de B1 para habilitarlo para su iglesia.
:::

1. Regístrese o inicie sesión en [kingdomfunding.org](https://kingdomfunding.org).
2. Obtenga su **clave de seguridad (Security Key)** (pública) y **clave privada (Private Key)** del portal de comerciante de Kingdom Funding.
3. En B1 Admin, vaya a **Settings**, abra la sección **Giving** y haga clic en editar.
4. Configure el **Provider** a **Kingdom Funding**.
5. Pegue su clave de seguridad en el campo **Security Key** y su clave privada en el campo **Private Key**.
6. Configure la **Webhook Key** que recibió de Kingdom Funding y copie la URL de webhook mostrada en su configuración de comerciante de Kingdom Funding para que Kingdom Funding pueda notificar a B1 de las transacciones completadas.
7. Guarde.

Una vez conectado, los miembros verán un alternador de tarjeta/banco en la página de donaciones y podrán dar por tarjeta de crédito o transferencia ACH.

## Botones de PayPal y Venmo

Las iglesias que usan **PayPal** como proveedor obtienen botones de **PayPal** y **Venmo** encima de los campos de tarjeta en la página de donaciones para regalos únicos. Los donantes que hagan clic en uno completarán el pago en una ventana de PayPal, y el regalo se registrará como cualquier otra donación en línea. Venmo aparece solo para donantes en los Estados Unidos en dispositivos que PayPal considera elegibles. Los regalos recurrentes siguen utilizando los campos de tarjeta.

## Configurar Paystack (África)

Stripe no abre cuentas para iglesias en Ghana, Nigeria, Kenia, Sudáfrica o Costa de Marfil. [Paystack](https://paystack.com) sí, y acepta tarjetas locales, **dinero móvil** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), transferencia bancaria y USSD; los donantes pagan en su moneda local (GHS, NGN, KES, ZAR, XOF).

1. Regístrese en [paystack.com](https://paystack.com) con el certificado de registro comercial de su iglesia y la cuenta bancaria local, y complete la revisión de activación (go-live) de Paystack.
2. En el panel de Paystack, abra **Settings → API Keys & Webhooks** y copie la **clave pública (Public Key)** y **clave secreta (Secret Key)** (use las claves activas, no las claves de prueba).
3. En B1 Admin, vaya a **Settings**, abra la sección **Giving** y haga clic en editar.
4. Configure el **Provider** a **Paystack**, pegue la clave pública y la clave secreta, y elija su **Currency**.
5. Copie la **URL del webhook** mostrada bajo el proveedor, vuelva al panel de Paystack (**Settings → API Keys & Webhooks**) y péguela en el campo **Webhook URL**. Así es como los regalos recurrentes y los pagos de dinero móvil se registran.
6. Guarde.

Los donantes completan su pago en una ventana de Paystack segura y pueden elegir tarjeta, dinero móvil o transferencia bancaria allí. Notas:

- Los **regalos recurrentes** necesitan una tarjeta; el dinero móvil no se puede cobrar nuevamente automáticamente, por lo que Paystack solo permite regalos únicos de dinero móvil.
- Los regalos recurrentes de Paystack se pueden cancelar desde B1 pero no pausar o editar; cancele y cree uno nuevo para cambiar la cantidad.
- La **tarifa de procesamiento** refleja los valores de las tarjetas locales de Paystack para su moneda; edítelos si sus tarifas negociadas difieren.

## Próximos pasos

- Use [Stripe Import](stripe-import.md) para extraer transacciones en línea a B1 Admin si no se están sincronizando automáticamente
- Verifique sus [informes de donaciones](donation-reports.md) para verificar que las donaciones en línea aparezcan correctamente
- Genere [declaraciones de donaciones](giving-statements.md) que incluyan tanto donaciones en línea como fuera de línea
