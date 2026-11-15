---
title: "Configuración de donación en línea"
description: "Conecte Stripe, Kingdom Funding o Paystack a B1 Admin para que los miembros puedan donar en línea a través de su sitio de B1.church y las donaciones se sincronicen con sus registros."
---

# Configuración de donación en línea

<div class="article-intro">

B1 Admin se integra con **Stripe**, **Kingdom Funding** y **Paystack** (para iglesias en África) para que sus miembros puedan donar en línea a través de su sitio de B1.church. Una vez configurado, los donativos en línea aparecen automáticamente en sus registros de donación junto con los donativos ingresados manualmente, manteniendo todo en un solo sistema.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configure sus [fondos de donación](funds.md) para que los donantes puedan designar sus donativos
- Cree una cuenta de Stripe en [stripe.com](https://stripe.com) y actívela (sáquela del modo de prueba)
- Tenga a mano sus credenciales de acceso a B1 Admin

</div>

## Configurar Stripe {#setting-up-stripe}

1. Cree una cuenta en [stripe.com](https://stripe.com) si todavía no tiene una. Asegúrese de **activar su cuenta** y sacarla del modo de prueba.
2. En Stripe, vaya a **Desarrolladores > Claves de API**.
3. Copie su **Clave publicable**.
4. Inicie sesión en [B1 Admin](https://admin.b1.church/).
5. Vaya a **Configuración** y abra la sección **Donaciones**.
6. Haga clic en **Editar** en la sección **Donaciones**.
7. Configure el **Proveedor** como **Stripe**.
8. Pegue su Clave publicable en el campo **Clave pública**.
9. Regrese a Stripe y muestre su **Clave secreta** (solo puede verla una vez, así que guarde una copia de seguridad).
10. Pegue la Clave secreta en el campo **Clave secreta** y haga clic en **Guardar**.

:::warning
Su Clave secreta de Stripe solo se muestra una vez. Cópiela en un lugar seguro antes de salir del panel de Stripe. Si la pierde, tendrá que generar una nueva clave.
:::

## Elegir su moneda {#choosing-your-currency}

Después de seleccionar Stripe como proveedor, aparece un menú desplegable de **Moneda** junto a sus claves de API. Elija la moneda que coincida con la moneda de liquidación de su cuenta de Stripe para que las donaciones se cobren correctamente.

Si todavía no ha guardado una moneda, el menú desplegable comienza con la moneda del país de su iglesia indicado al registrarse, en lugar de dólares estadounidenses. Verifique que coincida con su cuenta de Stripe antes de guardar.

Si su iglesia no acepta donativos en línea, deje el **Proveedor** en **Ninguno** y aun así elija una **Moneda**; la lista incluirá entonces todas las monedas, con la nota "La moneda en la que su iglesia registra los donativos." Los donativos que ingrese a mano en los lotes se registran en esa moneda, y los totales de donación se muestran en ella.

Las monedas admitidas incluyen USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN, BRL y PHP. Puede confirmar o cambiar la moneda predeterminada de su cuenta en su [panel de Stripe](https://dashboard.stripe.com/settings/currencies).

:::info
La moneda que seleccione aquí se usa para las donaciones únicas, las suscripciones recurrentes, el cálculo de comisiones y los informes de donaciones. Si cambia de moneda más adelante, solo las nuevas donaciones y suscripciones usarán la nueva moneda; los donativos recurrentes existentes siguen en la moneda con la que se crearon.
:::

:::warning
Asegúrese de que su cuenta de Stripe esté configurada para aceptar la moneda que elija. Si su cuenta de Stripe no admite la moneda seleccionada, las donaciones fallarán al pagar.
:::

## Apple Pay y Google Pay {#apple-pay-and-google-pay}

Las iglesias que usan Stripe obtienen automáticamente los botones de Apple Pay y Google Pay en la página pública de donaciones. Los botones aparecen encima de los campos de tarjeta para los donativos únicos una vez que el donante ha elegido un fondo y un monto, y solo cuando el navegador o dispositivo del donante tiene configurada una billetera. Los donativos recurrentes siguen usando los campos de tarjeta o de cuenta bancaria.

Google Pay no requiere configuración. Apple Pay requiere que el dominio de su página de donaciones esté registrado en Stripe; B1 lo registra la primera vez que se carga la página de donaciones en su dominio. Si el botón de Apple Pay no aparece en un iPhone, revise **Configuración > Dominios de métodos de pago** en su panel de Stripe y confirme que su dominio `yoursubdomain.b1.church` (o uno personalizado) aparece en la lista y está verificado.

## Donativos anónimos {#anonymous-gifts}

Los donantes en la página pública de donaciones pueden marcar **Donar de forma anónima**. Un donativo anónimo se registra sin donante asociado, igualmente se destina al fondo que eligió el donante, y aparece como **Anónimo** en sus lotes e informes. El correo electrónico del donante sigue siendo obligatorio para poder enviar el recibo, pero no se crea ningún registro de persona. Los donativos anónimos son solo únicos y no aparecen en ningún estado de donación.

## Donativos recurrentes fallidos {#failed-recurring-gifts}

Cuando un donativo recurrente en Stripe falla (por ejemplo, por una tarjeta vencida o rechazada), el cobro fallido aparece en **Donaciones > Donativos fallidos** con el donante, el monto, la fecha y el motivo que dio la pasarela. Haga clic en **Reintentar** para volver a intentar el cobro una vez que el donante haya actualizado su método de pago.

B1 también envía un correo electrónico al donante cuando el cobro falla, y de nuevo tres y siete días después si aún no se ha completado, con un enlace para actualizar su método de pago en B1.church.

:::info
Si su iglesia configuró Stripe antes de que existiera esta función, abra **Configuración** > **Donaciones**, haga clic en editar y haga clic en **Guardar** una vez. Eso actualiza el webhook de Stripe para que los cobros fallidos se informen a B1.
:::

## Añadir una página de donaciones a su sitio de B1.church {#adding-a-donation-page-to-your-b1church-site}

1. Vaya a [b1.church](https://b1.church/) e inicie sesión.
2. Haga clic en el icono de **Configuración**.
3. Haga clic en **Añadir pestaña**.
4. Elija **Donación** como tipo.
5. Introduzca un nombre para la pestaña (por ejemplo, "Dar") y haga clic en **Guardar**.
6. Opcionalmente, cambie el icono de la pestaña; escriba "Dar" en la búsqueda de iconos para encontrar un icono relacionado con las donaciones.

Su página de donaciones ya está activa. Los miembros pueden visitarla en `yoursubdomain.b1.church/donate`.

## Compartir su enlace de donación {#sharing-your-giving-link}

Para encontrar la URL de sus donaciones, vaya a **B1 Admin** y haga clic en el icono de **Configuración** para ver su subdominio. Su enlace de donación tiene el formato:

`https://yoursubdomain.b1.church/donate`

Comparta este enlace en su sitio web, en correos electrónicos o en su boletín para que los miembros sepan dónde donar en línea.

### Enlaces con un fondo y un monto preestablecidos {#links-with-a-preset-fund-and-amount}

Para enviar a los donantes directamente a un fondo específico, vaya a **Donaciones > Fondos** y haga clic en **Enlace de donación** en el fondo. Opcionalmente, introduzca un monto y luego copie el enlace. El cuadro de diálogo también muestra un código QR para el mismo enlace; haga clic en **Descargar PNG** para guardarlo para un boletín, una diapositiva o un cartel. Cuando un donante abre el enlace o escanea el código, el fondo y el monto ya están seleccionados en la página de donaciones. El enlace tiene la forma:

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

Los mismos parámetros funcionan en el elemento **Enlace de donación** del creador de sitios web.

## Notificaciones de donación {#donation-notifications}

Stripe envía una notificación por correo electrónico cada vez que se recibe una donación. Para cambiar la dirección de correo de las notificaciones, vaya al panel de Stripe, haga clic en su perfil en la parte superior derecha, elija **Perfil** y actualice su dirección de correo electrónico.

## Opciones de comisiones de procesamiento {#processing-fee-options}

Puede permitir que los donantes cubran opcionalmente las comisiones de procesamiento para que su iglesia reciba el monto completo de la donación. En **Configuración > Donaciones**, haga clic en editar y active el interruptor **Comisión por transacción** junto a sus claves. Las tarifas que se usan para calcular la comisión están en **Comisiones y estados**: **Tarifa fija** y **Comisión por transacción** para tarjetas, y para los donativos por transferencia bancaria (ACH) de Stripe un porcentaje y un **Límite máximo**. Comienzan con las tarifas estándar de su proveedor; cámbielas si sus tarifas negociadas son distintas, y luego haga clic en **Guardar**.

:::tip
Después de la configuración, haga una pequeña donación de prueba para confirmar que todo funciona antes de anunciar la donación en línea a su congregación.
:::

## Configurar Kingdom Funding {#setting-up-kingdom-funding}

Kingdom Funding es un procesador de pagos cristiano que admite tarjetas de crédito/débito y transferencias bancarias ACH. Si su iglesia está inscrita en Kingdom Funding, puede conectarla como su pasarela de donaciones.

:::info
La integración con Kingdom Funding está actualmente en beta. Comuníquese con su representante de cuenta de B1 para habilitarla en su iglesia.
:::

1. Regístrese o inicie sesión en [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply).
2. Obtenga su **Clave de tokenización** y su **Clave de origen** desde el panel de Kingdom Funding.
3. En B1 Admin, vaya a **Configuración**, abra la sección **Donaciones** y haga clic en editar.
4. Configure el **Proveedor** como **Kingdom Funding**.
5. Pegue las claves en los campos **Clave de tokenización** y **Clave de origen**.
6. Introduzca la **Clave de webhook** (el secreto de firma del webhook del panel de control de Kingdom Funding), y copie la URL del webhook que aparece debajo del proveedor en la configuración de Kingdom Funding para que Kingdom Funding pueda notificar a B1 las transacciones completadas.
7. Haga clic en **Guardar**.

Una vez conectado, los miembros verán un selector de tarjeta/cuenta bancaria en la página de donaciones y podrán donar con tarjeta de crédito o transferencia ACH.

## Botones de PayPal y Venmo {#paypal-and-venmo-buttons}

PayPal ya no se ofrece en la lista de **Proveedor** para nuevas configuraciones. Las iglesias que ya están conectadas a **PayPal** tienen botones de **PayPal** y **Venmo** encima de los campos de tarjeta en la página de donaciones para los donativos únicos. Los donantes que hacen clic en uno completan el pago en una ventana de PayPal, y el donativo se registra como cualquier otra donación en línea. Venmo solo aparece para donantes en Estados Unidos en dispositivos que PayPal considera elegibles. Los donativos recurrentes siguen usando los campos de tarjeta.

## Configurar Paystack (África) {#setting-up-paystack-africa}

Stripe no abre cuentas para iglesias en Ghana, Nigeria, Kenia, Sudáfrica o Costa de Marfil. [Paystack](https://paystack.com) sí lo hace, y acepta tarjetas locales, **dinero móvil** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), transferencias bancarias y USSD; los donantes pagan en su moneda local (GHS, NGN, KES, ZAR, XOF).

1. Regístrese en [paystack.com](https://paystack.com) con el certificado de registro empresarial de su iglesia y una cuenta bancaria local, y complete la revisión de activación (puesta en marcha) de Paystack.
2. En el panel de Paystack, abra **Configuración → Claves de API y webhooks** y copie la **Clave pública** y la **Clave secreta** (use las claves reales, no las de prueba).
3. En B1 Admin, vaya a **Configuración**, abra la sección **Donaciones** y haga clic en editar.
4. Configure el **Proveedor** como **Paystack**, pegue la Clave pública y la Clave secreta, y elija su **Moneda**.
5. Copie la **URL del webhook** que aparece debajo del proveedor, regrese al panel de Paystack (**Configuración → Claves de API y webhooks**) y péguela en el campo **URL del webhook**. Así es como se registran los donativos recurrentes y los pagos por dinero móvil.
6. Guarde.

Los donantes completan su pago en una ventana segura de Paystack, y allí pueden elegir tarjeta, dinero móvil o transferencia bancaria. Notas:

- **Los donativos recurrentes** requieren una tarjeta; el dinero móvil no puede volver a cobrarse automáticamente, así que Paystack solo permite donativos únicos con dinero móvil.
- Los donativos recurrentes de Paystack pueden cancelarse desde B1, pero no pausarse ni editarse; cancele y cree uno nuevo para cambiar el monto.
- Los valores de **Comisión de procesamiento** reflejan las tarifas de Paystack para tarjetas locales en su moneda; edítelos si sus tarifas negociadas son distintas.

## Próximos pasos {#next-steps}

- Use la [Importación de Stripe](stripe-import.md) para traer las transacciones en línea a B1 Admin si no se sincronizan automáticamente
- Revise sus [Informes de donaciones](donation-reports.md) para verificar que las donaciones en línea aparezcan correctamente
- Genere los [Estados de donación](giving-statements.md) que incluyan tanto las donaciones en línea como las donaciones en persona
