---
title: "Configuración de donaciones en línea"
description: "Conecte Stripe, PayPal, Kingdom Funding o Paystack a B1 Admin para que los miembros puedan donar en línea desde su sitio de B1.church y las donaciones se sincronicen con sus registros."
---

# Configuración de donaciones en línea

<div class="article-intro">

B1 Admin se integra con **Stripe**, **PayPal**, **Kingdom Funding** y **Paystack** (para iglesias en África) para que sus miembros puedan donar en línea a través de su sitio de B1.church. Una vez configurado, las donaciones en línea aparecen automáticamente en sus registros de donaciones junto con las ofrendas registradas a mano, manteniendo todo en un solo sistema.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configure sus [fondos de donación](funds.md) para que los donantes puedan destinar sus ofrendas
- Cree una cuenta de Stripe en [stripe.com](https://stripe.com) y actívela (sáquela del modo de prueba)
- Tenga a mano sus credenciales de inicio de sesión de B1 Admin

</div>

## Configurar Stripe

1. Cree una cuenta en [stripe.com](https://stripe.com) si todavía no tiene una. Asegúrese de **activar su cuenta** y de sacarla del modo de prueba.
2. En Stripe, vaya a **Developers > API Keys**.
3. Copie su **Publishable Key**.
4. Inicie sesión en [B1 Admin](https://admin.b1.church/).
5. Vaya a **Settings** y abra la sección **Giving**.
6. Haga clic en **Edit** en la sección **Giving**.
7. Establezca el **Provider** en **Stripe**.
8. Pegue su Publishable Key en el campo **Public Key**.
9. Vuelva a Stripe y muestre su **Secret Key** (solo puede verla una vez, así que guarde una copia de seguridad).
10. Pegue la Secret Key en el campo **Secret Key** y haga clic en **Save**.

:::warning
Su Secret Key de Stripe solo se muestra una vez. Cópiela en un lugar seguro antes de salir del panel de Stripe. Si la pierde, tendrá que generar una nueva clave.
:::

## Elegir la moneda de su iglesia {#choosing-your-currency}

Después de seleccionar Stripe como proveedor, aparece un menú desplegable **Currency** junto a sus claves de API. Elija la moneda que coincida con la moneda de liquidación de su cuenta de Stripe, para que las donaciones se cobren correctamente.

Si todavía no ha guardado una moneda, el menú desplegable empieza con la moneda del país de su iglesia indicado al registrarse, en lugar de dólares estadounidenses. Compruebe que coincida con su cuenta de Stripe antes de guardar.

Si su iglesia no acepta donaciones en línea, deje **Provider** en **None** y aun así elija una **Currency**: la lista incluirá entonces todas las monedas, con la nota "The currency your church records gifts in." Las ofrendas que introduzca a mano en los lotes se registran en esa moneda, y los totales de donaciones se muestran en ella.

Las monedas admitidas incluyen USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN, BRL y PHP. Puede confirmar o cambiar la moneda predeterminada de su cuenta en su [panel de Stripe](https://dashboard.stripe.com/settings/currencies).

:::info
La moneda que seleccione aquí se usa para las donaciones únicas, las suscripciones recurrentes, los cálculos de comisiones y los informes de donaciones. Si cambia de moneda más adelante, solo las nuevas donaciones y suscripciones usarán la nueva moneda; las donaciones recurrentes existentes seguirán en la moneda con la que se crearon.
:::

:::warning
Asegúrese de que su cuenta de Stripe esté configurada para aceptar la moneda que elija. Si su cuenta de Stripe no admite la moneda seleccionada, las donaciones fallarán al pagar.
:::

## Apple Pay y Google Pay

Las iglesias que usan Stripe obtienen automáticamente los botones de Apple Pay y Google Pay en la página pública de donaciones. Los botones aparecen encima de los campos de la tarjeta para las donaciones únicas, una vez que el donante ha elegido un fondo y un monto, y solo cuando el navegador o el dispositivo del donante tiene una billetera configurada. Las donaciones recurrentes siguen usando los campos de tarjeta o de cuenta bancaria.

Google Pay no requiere configuración. Apple Pay requiere que el dominio de su página de donaciones esté registrado en Stripe; B1 lo registra la primera vez que se carga la página de donaciones en su dominio. Si el botón de Apple Pay no aparece en un iPhone, revise **Settings > Payment method domains** en su panel de Stripe y confirme que su dominio `yoursubdomain.b1.church` (o el personalizado) aparece en la lista y está verificado.

## Donaciones anónimas

Los donantes de la página pública de donaciones pueden marcar **Give anonymously**. Una donación anónima se registra sin donante asociado, sigue yendo al fondo que eligió el donante y aparece como **Anonymous** en sus lotes e informes. El correo electrónico del donante sigue siendo obligatorio para poder enviar el recibo, pero no se crea ningún registro de persona. Las donaciones anónimas son solo únicas y no aparecen en ningún estado de cuenta de donaciones.

## Donaciones recurrentes fallidas

Cuando una donación recurrente en Stripe falla (por ejemplo, por una tarjeta vencida o rechazada), el cargo fallido aparece en **Donations > Failed Gifts** con el donante, el monto, la fecha y el motivo que indicó la pasarela. Haga clic en **Retry** para volver a intentar el cargo una vez que el donante haya actualizado su método de pago.

B1 también envía un correo electrónico al donante cuando el cargo falla, y de nuevo tres y siete días después si todavía no se ha completado, con un enlace para actualizar su método de pago en B1.church.

:::info
Si su iglesia configuró Stripe antes de que existiera esta función, abra **Settings** > **Giving**, haga clic en edit y haga clic en **Save** una vez. Eso actualiza el webhook de Stripe para que los cargos fallidos se informen a B1.
:::

## Agregar una página de donaciones a su sitio de B1.church

1. Vaya a [b1.church](https://b1.church/) e inicie sesión.
2. Haga clic en el icono de **Settings**.
3. Haga clic en **Add Tab**.
4. Elija **Donation** como tipo.
5. Escriba un nombre para la pestaña (por ejemplo, "Dar") y haga clic en **Save**.
6. Opcionalmente, cambie el icono de la pestaña: escriba "Giv" en la búsqueda de iconos para encontrar un icono relacionado con las donaciones.

Su página de donaciones ya está activa. Los miembros pueden visitarla en `yoursubdomain.b1.church/donate`.

## Compartir su enlace de donaciones

Para encontrar su URL de donaciones, vaya a **B1 Admin** y haga clic en el icono de **Settings** para ver su subdominio. Su enlace de donaciones tiene este formato:

`https://yoursubdomain.b1.church/donate`

Comparta este enlace en su sitio web, en los correos electrónicos o en el boletín para que los miembros sepan dónde dar en línea.

### Enlaces con un fondo y un monto preestablecidos

Para enviar a los donantes directamente a un fondo específico, vaya a **Donations > Funds** y haga clic en **Giving Link** en el fondo. Opcionalmente, introduzca un monto y copie el enlace. El cuadro de diálogo también muestra un código QR para el mismo enlace; haga clic en **Download PNG** para guardarlo para un boletín, una diapositiva o un cartel. Cuando un donante abre el enlace o escanea el código, el fondo y el monto ya están seleccionados en la página de donaciones. El enlace tiene esta forma:

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

Los mismos parámetros funcionan en el elemento **Donate Link** del creador de sitios web.

## Notificaciones de donaciones

Stripe envía un correo electrónico de aviso cada vez que se recibe una donación. Para cambiar la dirección de correo de las notificaciones, vaya al panel de Stripe, haga clic en su perfil en la esquina superior derecha, elija **Profile** y actualice su dirección de correo electrónico.

## Opciones de comisiones de procesamiento

Puede configurar su página de donaciones para que los donantes puedan cubrir opcionalmente las comisiones de procesamiento, de modo que su iglesia reciba el monto completo de la donación. Esta configuración se administra en los ajustes de su iglesia dentro de B1 Admin.

:::tip
Después de la configuración, haga una pequeña donación de prueba para confirmar que todo funciona antes de anunciar las donaciones en línea a su congregación.
:::

## Configurar Kingdom Funding

Kingdom Funding es un procesador de pagos cristiano que admite tarjetas de crédito y débito y transferencias bancarias ACH. Si su iglesia está inscrita en Kingdom Funding, puede conectarlo como su pasarela de donaciones.

:::info
La integración con Kingdom Funding está actualmente en beta. Póngase en contacto con su representante de cuenta de B1 para habilitarla en su iglesia.
:::

1. Regístrese o inicie sesión en [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply).
2. Obtenga su **Security Key** (pública) y su **Private Key** desde el portal de comerciantes de Kingdom Funding.
3. En B1 Admin, vaya a **Settings**, abra la sección **Giving** y haga clic en edit.
4. Establezca el **Provider** en **Kingdom Funding**.
5. Pegue su Security Key en el campo **Security Key** y su Private Key en el campo **Private Key**.
6. Introduzca la **Webhook Key** que recibió de Kingdom Funding, y copie la URL del webhook que se muestra en la configuración de comerciante de Kingdom Funding, para que Kingdom Funding pueda notificar a B1 las transacciones completadas.
7. Guarde los cambios.

Una vez conectado, los miembros verán un selector de tarjeta/cuenta bancaria en la página de donaciones y podrán dar con tarjeta de crédito o transferencia ACH.

## Botones de PayPal y Venmo

Las iglesias que usan **PayPal** como proveedor reciben los botones de **PayPal** y **Venmo** encima de los campos de la tarjeta en la página de donaciones para las donaciones únicas. Los donantes que hacen clic en uno completan el pago en una ventana de PayPal, y la donación se registra como cualquier otra donación en línea. Venmo solo aparece para donantes en Estados Unidos en dispositivos que PayPal considera elegibles. Las donaciones recurrentes siguen usando los campos de la tarjeta.

## Configurar Paystack (África)

Stripe no abre cuentas para iglesias en Ghana, Nigeria, Kenia, Sudáfrica ni Costa de Marfil. [Paystack](https://paystack.com) sí lo hace, y acepta tarjetas locales, **dinero móvil** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), transferencias bancarias y USSD. Los donantes pagan en su moneda local (GHS, NGN, KES, ZAR, XOF).

1. Regístrese en [paystack.com](https://paystack.com) con el certificado de registro comercial de su iglesia y una cuenta bancaria local, y complete la revisión de activación (puesta en producción) de Paystack.
2. En el panel de Paystack, abra **Settings → API Keys & Webhooks** y copie la **Public Key** y la **Secret Key** (use las claves en vivo, no las de prueba).
3. En B1 Admin, vaya a **Settings**, abra la sección **Giving** y haga clic en edit.
4. Establezca el **Provider** en **Paystack**, pegue la Public Key y la Secret Key, y elija su **Currency**.
5. Copie la **webhook URL** que se muestra debajo del proveedor, vuelva al panel de Paystack (**Settings → API Keys & Webhooks**) y péguela en el campo **Webhook URL**. Así es como se registran las donaciones recurrentes y los pagos con dinero móvil.
6. Guarde los cambios.

Los donantes completan su pago en una ventana segura de Paystack y allí pueden elegir tarjeta, dinero móvil o transferencia bancaria. Notas:

- **Las donaciones recurrentes** requieren tarjeta; el dinero móvil no puede cobrarse de nuevo automáticamente, por lo que Paystack solo permite donaciones únicas con dinero móvil.
- Las donaciones recurrentes de Paystack pueden cancelarse desde B1, pero no pausarse ni editarse: cancele una y cree otra nueva para cambiar el monto.
- Las **Processing Fee** predeterminadas reflejan las tarifas de Paystack para tarjetas locales en su moneda; edítelas si sus tarifas negociadas son distintas.

## Próximos pasos

- Use la [importación de Stripe](stripe-import.md) para traer las transacciones en línea a B1 Admin si no se sincronizan automáticamente
- Revise sus [informes de donaciones](donation-reports.md) para verificar que las donaciones en línea aparecen correctamente
- Genere [estados de cuenta de donaciones](giving-statements.md) que incluyan tanto las donaciones en línea como las que no lo son
