---
title: "Configuración de donaciones en línea"
---

# Configuración de donaciones en línea

<div class="article-intro">

B1 Admin se integra con **Stripe**, **PayPal**, **Kingdom Funding** y **Paystack** (para iglesias en África) para que sus miembros puedan dar en línea a través de su sitio de B1.church. Una vez configurado, las donaciones en línea aparecen automáticamente en sus registros de donaciones junto con los donativos ingresados manualmente, manteniendo todo en un solo sistema.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configure sus [fondos de donación](funds.md) para que los donantes puedan designar sus regalos
- Cree una cuenta de Stripe en [stripe.com](https://stripe.com) y actívela (sáquela del modo de prueba)
- Tenga listas sus credenciales de inicio de sesión de B1 Admin

</div>

## Configurar Stripe

1. Cree una cuenta en [stripe.com](https://stripe.com) si aún no tiene una. Asegúrese de **activar su cuenta** y sacarla del modo de prueba.
2. En Stripe, vaya a **Desarrolladores > Claves de API**.
3. Copie su **Clave publicable**.
4. Inicie sesión en [B1 Admin](https://admin.b1.church/).
5. Vaya a **Configuración** y abra la sección **Donaciones**.
6. Haga clic en **Editar** en la sección **Donaciones**.
7. Configure el **Proveedor** como **Stripe**.
8. Pegue su Clave publicable en el campo **Clave pública**.
9. Regrese a Stripe y revele su **Clave secreta** (solo puede verla una vez, así que guarde una copia de respaldo).
10. Pegue la Clave secreta en el campo **Clave secreta** y haga clic en **Guardar**.

:::warning
Su Clave secreta de Stripe solo se muestra una vez. Cópiela en un lugar seguro antes de salir del panel de Stripe. Si la pierde, tendrá que generar una nueva clave.
:::

## Elegir su moneda

Después de seleccionar Stripe como proveedor, aparece un menú desplegable de **Moneda** junto a sus claves de API. Elija la moneda que coincida con la moneda de liquidación de su cuenta de Stripe para que las donaciones se cobren correctamente.

Las monedas admitidas incluyen USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN y BRL. Puede confirmar o cambiar la moneda predeterminada de su cuenta en su [panel de Stripe](https://dashboard.stripe.com/settings/currencies).

:::info
La moneda que seleccione aquí se usa para las donaciones únicas, las suscripciones recurrentes, el cálculo de comisiones y los informes de donaciones. Si cambia de moneda más adelante, solo las nuevas donaciones y suscripciones usarán la nueva moneda; los regalos recurrentes existentes siguen en la moneda con la que se crearon.
:::

:::warning
Asegúrese de que su cuenta de Stripe esté configurada para aceptar la moneda que elija. Si su cuenta de Stripe no admite la moneda seleccionada, las donaciones fallarán al momento del pago.
:::

## Apple Pay y Google Pay

Las iglesias que usan Stripe obtienen automáticamente los botones de Apple Pay y Google Pay en la página pública de donaciones. Los botones aparecen encima de los campos de tarjeta para los regalos únicos, una vez que el donante ha elegido un fondo y un monto, y solo cuando el navegador o el dispositivo del donante tiene una billetera configurada. Los regalos recurrentes siguen usando los campos de tarjeta o de cuenta bancaria.

Google Pay no requiere configuración. Apple Pay requiere que el dominio de su página de donaciones esté registrado en Stripe; B1 lo registra la primera vez que se carga la página de donaciones en su dominio. Si el botón de Apple Pay no aparece en un iPhone, revise **Configuración > Dominios de métodos de pago** en su panel de Stripe y confirme que su dominio `sudominio.b1.church` (o el personalizado) aparezca en la lista y esté verificado.

## Donativos anónimos

Los donantes de la página pública de donaciones pueden marcar **Dar de forma anónima**. Un donativo anónimo se registra sin donante asociado, aun así va al fondo que eligió el donante y aparece como **Anónimo** en sus lotes e informes. El correo electrónico del donante sigue siendo obligatorio para poder enviar el recibo, pero no se crea ningún registro de persona. Los donativos anónimos son solo únicos y no aparecen en ningún estado de cuenta de donaciones.

## Regalos recurrentes fallidos

Cuando un regalo recurrente en Stripe falla (por ejemplo, por una tarjeta vencida o rechazada), el cargo fallido aparece en **Donaciones > Regalos fallidos** con el donante, el monto, la fecha y el motivo que dio la pasarela. Haga clic en **Reintentar** para volver a intentar el cargo una vez que el donante haya actualizado su método de pago.

B1 también envía un correo electrónico al donante cuando el cargo falla, y de nuevo tres y siete días después si aún no se ha completado, con un enlace para actualizar su método de pago en B1.church.

:::info
Si su iglesia configuró Stripe antes de que existiera esta función, abra **Configuración** > **Donaciones**, haga clic en editar y haga clic en **Guardar** una vez. Esto actualiza el webhook de Stripe para que los cargos fallidos se informen a B1.
:::

## Agregar una página de donaciones a su sitio de B1.church

1. Vaya a [b1.church](https://b1.church/) e inicie sesión.
2. Haga clic en el ícono de **Configuración**.
3. Haga clic en **Agregar pestaña**.
4. Elija **Donación** como tipo.
5. Ingrese un nombre para la pestaña (por ejemplo, "Dar") y haga clic en **Guardar**.
6. Opcionalmente, cambie el ícono de la pestaña: escriba "Dar" en la búsqueda de íconos para encontrar un ícono relacionado con donaciones.

Su página de donaciones ya está activa. Los miembros pueden visitarla en `sudominio.b1.church/donate`.

## Compartir su enlace de donaciones

Para encontrar la URL de sus donaciones, vaya a **B1 Admin** y haga clic en el ícono de **Configuración** para ver su subdominio. Su enlace de donaciones sigue este formato:

`https://sudominio.b1.church/donate`

Comparta este enlace en su sitio web, en correos electrónicos o en su boletín para que los miembros sepan dónde dar en línea.

### Enlaces con un fondo y un monto preseleccionados

Para llevar a los donantes directamente a un fondo específico, vaya a **Donaciones > Fondos** y haga clic en **Enlace de donación** en el fondo. Opcionalmente, ingrese un monto y luego copie el enlace. Cuando un donante lo abre, el fondo y el monto ya están seleccionados en la página de donaciones. El enlace tiene la forma:

`https://sudominio.b1.church/donate?fundId=FUND_ID&amount=25`

Los mismos parámetros funcionan en el elemento **Enlace de donación** del creador de sitios web.

## Notificaciones de donaciones

Stripe envía una notificación por correo electrónico cada vez que se recibe una donación. Para cambiar la dirección de correo de las notificaciones, vaya al panel de Stripe, haga clic en su perfil en la esquina superior derecha, elija **Perfil** y actualice su dirección de correo electrónico.

## Opciones de comisión de procesamiento

Puede configurar su página de donaciones para que los donantes puedan, opcionalmente, cubrir las comisiones de procesamiento para que su iglesia reciba el monto completo de la donación. Esta configuración se administra en la configuración de su iglesia dentro de B1 Admin.

:::tip
Después de la configuración, haga una pequeña donación de prueba para confirmar que todo funciona antes de anunciar las donaciones en línea a su congregación.
:::

## Configurar Kingdom Funding

Kingdom Funding es un procesador de pagos cristiano que admite tarjetas de crédito o débito y transferencias bancarias ACH. Si su iglesia está inscrita en Kingdom Funding, puede conectarlo como su pasarela de donaciones.

:::info
La integración con Kingdom Funding está actualmente en beta. Comuníquese con su representante de cuenta de B1 para habilitarla en su iglesia.
:::

1. Regístrese o inicie sesión en [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply).
2. Obtenga su **Clave de seguridad** (pública) y su **Clave privada** desde el portal de comerciantes de Kingdom Funding.
3. En B1 Admin, vaya a **Configuración**, abra la sección **Donaciones** y haga clic en editar.
4. Configure el **Proveedor** como **Kingdom Funding**.
5. Pegue su Clave de seguridad en el campo **Clave de seguridad** y su Clave privada en el campo **Clave privada**.
6. Configure la **Clave de webhook** que recibió de Kingdom Funding, y copie la URL de webhook que se muestra en la configuración de su comerciante de Kingdom Funding para que Kingdom Funding pueda notificar a B1 de las transacciones completadas.
7. Guarde.

Una vez conectado, los miembros verán un interruptor de tarjeta/cuenta bancaria en la página de donaciones y podrán dar con tarjeta de crédito o mediante transferencia ACH.

## Botones de PayPal y Venmo

Las iglesias que usan **PayPal** como proveedor obtienen los botones de **PayPal** y **Venmo** encima de los campos de tarjeta en la página de donaciones para los regalos únicos. Los donantes que hacen clic en uno completan el pago en una ventana de PayPal, y el regalo se registra como cualquier otra donación en línea. Venmo solo aparece para los donantes de Estados Unidos en dispositivos que PayPal considera elegibles. Los regalos recurrentes siguen usando los campos de tarjeta.

## Configurar Paystack (África)

Stripe no abre cuentas para iglesias en Ghana, Nigeria, Kenia, Sudáfrica o Costa de Marfil. [Paystack](https://paystack.com) sí lo hace, y acepta tarjetas locales, **dinero móvil** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), transferencias bancarias y USSD. Los donantes pagan en su moneda local (GHS, NGN, KES, ZAR, XOF).

1. Regístrese en [paystack.com](https://paystack.com) con el certificado de registro comercial de su iglesia y una cuenta bancaria local, y complete la revisión de activación (puesta en producción) de Paystack.
2. En el panel de Paystack, abra **Configuración → Claves de API y webhooks** y copie la **Clave pública** y la **Clave secreta** (use las claves reales, no las de prueba).
3. En B1 Admin, vaya a **Configuración**, abra la sección **Donaciones** y haga clic en editar.
4. Configure el **Proveedor** como **Paystack**, pegue la Clave pública y la Clave secreta, y elija su **Moneda**.
5. Copie la **URL de webhook** que aparece debajo del proveedor, regrese al panel de Paystack (**Configuración → Claves de API y webhooks**) y péguela en el campo **URL de webhook**. Así es como se registran los regalos recurrentes y los pagos con dinero móvil.
6. Guarde.

Los donantes completan su pago en una ventana segura de Paystack y pueden elegir tarjeta, dinero móvil o transferencia bancaria allí. Notas:

- **Los regalos recurrentes** requieren una tarjeta; el dinero móvil no se puede cobrar de nuevo automáticamente, así que Paystack solo permite regalos de dinero móvil únicos.
- Los regalos recurrentes de Paystack se pueden cancelar desde B1, pero no pausar ni editar; cancele y cree uno nuevo para cambiar el monto.
- Las **comisiones de procesamiento** predeterminadas reflejan las tarifas de Paystack para tarjetas locales en su moneda; edítelas si sus tarifas negociadas son diferentes.

## Siguientes pasos

- Use [Importación de Stripe](stripe-import.md) para traer las transacciones en línea a B1 Admin si no se sincronizan automáticamente
- Revise sus [Informes de donaciones](donation-reports.md) para verificar que las donaciones en línea aparezcan correctamente
- Genere [Estados de cuenta de donaciones](giving-statements.md) que incluyan tanto las donaciones en línea como las presenciales
