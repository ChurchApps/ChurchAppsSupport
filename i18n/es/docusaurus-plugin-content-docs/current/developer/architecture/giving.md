---
title: "Arquitectura de donaciones"
---

# Arquitectura de donaciones

<div class="article-intro">

ChurchApps procesa las donaciones con un modelo de pasarela: la iglesia conserva su propia cuenta de Stripe (o de PayPal, Kingdom Funding o Paystack), y B1 nunca se coloca en la ruta del dinero como procesador de la plataforma. Los datos de la tarjeta se tokenizan en el navegador y nunca llegan a un servidor de ChurchApps. Esta página describe toda la pila: el registro de proveedores de pago del lado del cliente en `@churchapps/apphelper`, la abstracción de pasarela de GivingApi, el modelo de datos de donaciones y cómo los webhooks de la pasarela se concilian con la base de datos.

</div>

## Descripción general

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (navegador)│                   │  Pasarela de pago                     │
│                             │                   │  (Stripe / PayPal / KF / Paystack)    │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ ingreso de tarjeta│  Stripe Elements · tokenizador KF ·   │
│  │ Registro de proveedores│──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ de pago                │  │◀── token / nonce ─│  (la tarjeta nunca llega a un         │
│  │ getPaymentProvider()   │  │                   │   servidor de B1)                     │
│  │ Stripe · PayPal · KF   │  │                   └──────────▲────────────────┬───────────┘
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │ evento de webhook
              ▼                            cargo / suscripción│                │ firmado
┌─────────────────────────────────────────────┐ (clave secreta)│                │
│  GivingApi — módulo /giving                 │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  guarda donations + fundDonations — deduplicación mediante eventLogs / transactionId
                      ▼
                MySQL (esquema giving)
```

Tres principios se cumplen en toda la pila:

1. **La pasarela tiene la tarjeta.** El widget de ingreso de cada proveedor tokeniza en el navegador; la API solo recibe un token, un nonce o un ID de orden.
2. **Una abstracción, muchos proveedores.** El navegador resuelve un `PaymentProvider` desde un registro; el servidor resuelve un `IGatewayProvider` desde una fábrica. Ambos usan el mismo nombre normalizado de proveedor guardado en el registro de la pasarela.
3. **Los webhooks son la fuente de verdad de la liquidación.** La respuesta de un cargo se registra de forma optimista, pero el webhook firmado de la pasarela es lo que confirma (o crea) la donación completada, con guardas de idempotencia en ambos lados.

## Lado del cliente: el registro de proveedores de pago (`@churchapps/apphelper`)

El registro vive en `Packages/apphelper/src/donations/providers/`, y los widgets y auxiliares de cada proveedor están en su propia subcarpeta (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`); nada fuera de `providers/` ramifica según el nombre de un proveedor. Un `PaymentProvider` (vea `providers/types.ts`) agrupa todo lo que una aplicación anfitriona necesita para una pasarela: un `descriptor` (etiquetas de administración, monedas admitidas, campos de comisiones, tarifas predeterminadas, URL del panel e inscripción), un conjunto de `capabilities` (tarjetas guardadas, ACH, recurrentes, ingreso de nueva tarjeta en línea, guardado implícito al tokenizar), los widgets de React para el ingreso de miembros (`MemberWrapper`/`MemberEntry`), la donación de invitados (`GuestForm`), la edición de métodos guardados (`MethodEditForm`) y los pagos de preguntas de formularios (`FormPayment`), además de `buildChargeRequest(ctx, token)`, el único lugar donde la forma del cuerpo del cargo difiere por proveedor. El `MemberWrapper` de cada proveedor carga su propio SDK a partir de la clave pública del registro de la pasarela, así que las aplicaciones anfitrionas nunca importan un SDK de pasarela (B1App y B1Admin no tienen ninguna dependencia de `@stripe/*`). `pickDefaultGateway(gateways, capability?)` centraliza qué pasarela de la iglesia debe usar cada superficie.

`providers/registry.ts` contiene los proveedores integrados. Se **referencian por valor**, no se registran mediante un efecto secundario del módulo, así que el *tree-shaking* del empaquetador nunca puede eliminar el registro:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Función | Propósito |
|---------|-----------|
| `getPaymentProvider(name)` | Resuelve por nombre normalizado; recurre a Stripe para que un proveedor mal configurado nunca haga caer el formulario del donante |
| `registerPaymentProvider(p)` | Registra un proveedor adicional en tiempo de ejecución (para una pasarela personalizada de una aplicación anfitriona) |
| `listPaymentProviders()` | Enumera los integrados y los personalizados; se usa para construir el menú desplegable de pasarelas del administrador |
| `hasPaymentProvider(name)` | Verificación de pertenencia |

**Proveedores de cliente integrados: Stripe, PayPal, Kingdom Funding, Paystack.** B1App y B1Admin solo *leen* el registro (`getPaymentProvider`, `listPaymentProviders`); ninguno llama a `registerPaymentProvider`: el registro se mantiene dentro de apphelper.

Cada proveedor tokeniza de forma distinta, pero todos mantienen la tarjeta fuera de B1:

| Proveedor | Widget de ingreso | Token que se envía a la API |
|-----------|-------------------|-----------------------------|
| Stripe | `CardElement` de Stripe `Elements` → `stripe.createPaymentMethod(...)`; el formulario de invitados también monta un `ExpressCheckoutElement` (Apple Pay / Google Pay, para donaciones únicas) cuyo `onConfirm` resuelve al mismo ID `pm_…` | ID del método de pago (`pm_…`); cuenta bancaria mediante `/paymentmethods/ach-setup-intent`: Financial Connections `us_bank_account` para pasarelas en USD, y `acss_debit` de PAD canadiense (modal de mandato alojado, el mandato `default_for` facturas/suscripciones, los cargos únicos pasan el ID del mandato) para pasarelas en CAD |
| Kingdom Funding | Formulario de tokenización alojado, indexado por la clave pública de la pasarela | nonce de un solo uso |
| PayPal | PayPal Hosted Fields (tarjeta, recurrente) más PayPal Smart Buttons con financiación por Venmo (pagos únicos); ambos comparten una sola carga del SDK y la orden del servidor construida mediante `/donate/client-token` + `/donate/create-order` | ID de orden capturada |
| Paystack | Ventana emergente Paystack Inline (`js.paystack.co/v2/inline.js`): la ventana misma procesa el pago (tarjeta, dinero móvil, transferencia bancaria, USSD) | referencia de transacción pagada; los métodos guardados son códigos de autorización `AUTH_…` de Paystack |

El `finalizeResult` de Stripe ejecuta 3-D Secure / SCA en el navegador (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) antes de que la donación se considere completa; el formulario compartido solo llama a `provider.finalizeResult(result)` sin saber qué hace.

## Lado del servidor: la abstracción de pasarela (GivingApi)

El módulo `/giving` (`Api/src/modules/giving`) expone la superficie REST; la plomería de las pasarelas vive en `Api/src/shared/helpers`. `DonateController` nunca se comunica directamente con un SDK de pasarela: pasa por `GatewayService`, que resuelve el `IGatewayProvider` correcto desde `GatewayFactory` y le entrega un `GatewayConfig` descifrado.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() descifra privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) es el contrato que implementa cada pasarela: el ciclo de vida de los webhooks (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), los pagos (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), las comisiones (`calculateFees`), el manejo de métodos guardados (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) y extras opcionales (clientes, órdenes, SetupIntents, repetición de eventos, `retryFailedPayment` para una factura de suscripción fallida, `registerPaymentMethodDomain` para la verificación de dominio de Apple Pay). Un proveedor que omite un hook opcional se reporta como no compatible con esa acción, y la interfaz oculta el control correspondiente. Cada clase de proveedor declara su propia matriz de `capabilities` (monedas admitidas, ACH, reembolsos, requisitos de suscripción, límites de transacción): `GatewayService.getProviderCapabilities(provider)` solo la lee; y banderas como `logsDonationsImmediately` controlan el comportamiento de los controladores sin condicionales por nombre de proveedor en ellos.

**Proveedores del servidor registrados en `GatewayFactory`:**

| Proveedor | Disponibilidad |
|-----------|----------------|
| Stripe | Siempre activo |
| PayPal | Siempre activo |
| Kingdom Funding | Siempre activo |
| Paystack | Siempre activo (comercios de Nigeria, Ghana, Sudáfrica, Kenia y Costa de Marfil; monedas NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Opcional mediante la bandera de entorno `ENABLE_SQUARE` |
| ePayMints | Opcional mediante la bandera de entorno `ENABLE_EPAYMINTS` |

Paystack se diferencia de los demás en que el dinero se mueve antes de que intervenga GivingApi: la ventana emergente cobra al donante, `processCharge` es un `GET /transaction/verify/:reference` cuyo monto pagado y moneda deben coincidir con la donación que se va a registrar (una referencia ya registrada nunca se registra dos veces), y el primer regalo de una programación recurrente se registra desde `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` con `start_date` a un intervalo de distancia). Los webhooks se firman con la propia clave secreta (`x-paystack-signature`, HMAC-SHA512 sobre el cuerpo sin procesar), y Paystack no tiene una API de administración de webhooks, así que la pantalla de administración muestra la URL para que la iglesia la pegue en su panel. Los eventos `charge.success` de renovación no traen división por fondos; el proveedor la recupera de las filas locales `subscriptions`/`subscriptionFunds` del donante. Solo las autorizaciones de tarjeta son `reusable`: los regalos por dinero móvil son únicamente de pago único, así que `createSubscription` los rechaza. Los datos de demostración siembran una segunda iglesia (Accra Community Church, `CHU00000002`) en una pasarela GHS de modo de prueba de Paystack, para que la suite de Playwright de Paystack corra junto a la de Stripe de Grace.

Se pueden registrar proveedores personalizados en tiempo de ejecución cuando está definida `ENABLE_CUSTOM_GATEWAY_PROVIDERS`; `AbstractExperimentalGatewayProvider` es la clase base para ellos. Los nombres de proveedor se comparan sin distinguir mayúsculas.

### Configuración de la pasarela y secretos

Un administrador guarda las credenciales de la pasarela mediante `POST /giving/gateways` (`GatewayController`). Al guardar, el controlador cifra las claves privada y de webhook con `EncryptionHelper` antes de persistirlas y, en cualquier host que no sea localhost, elimina el webhook existente de la iglesia y aprovisiona uno nuevo apuntando a `/giving/donate/webhook/{provider}?churchId=…`. Una iglesia mantiene una fila por proveedor: guardar una pasarela reemplaza solo la fila existente de ese mismo proveedor. Las lecturas públicas (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) devuelven solo las claves públicas.

## Modelo de datos

El esquema giving (`Api/src/modules/giving/db/DatabaseTypes.ts`, modelos en `models/`) es un esquema MySQL accedido mediante Kysely:

| Tabla | Función |
|-------|---------|
| `gateways` | Configuración de proveedor por iglesia: `provider`, `publicKey`, `privateKey`/`webhookKey` cifrados, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Destinos de donación (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Agrupación para captura y reportes (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Un donativo: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; los estados de cuenta, totales, paneles e informes de donaciones solo cuentan `complete` o null), `transactionId` |
| `fundDonations` | Asignación de un donativo a uno o más fondos (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Donativo recurrente; `id` es el ID de suscripción de la pasarela, vinculado a `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | División por fondos de un donativo recurrente |
| `customers` | Vincula un `personId` con su ID de cliente en la pasarela, por `provider` |
| `gatewayPaymentMethods` | Tarjetas/cuentas bancarias guardadas: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Registro de auditoría de webhooks/eventos y clave de deduplicación (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Campañas de promesas vinculadas a un fondo, y el monto prometido por cada persona |

Un donativo se divide entre fondos mediante `fundDonations`: el donativo lleva el total, y cada `fundDonation` lleva una porción. `donations.currency` y `gateways.currency` llevan la moneda ISO; cada proveedor anuncia sus `supportedCurrencies`, y los montos se formatean con `CurrencyHelper.formatCurrencyWithLocale`.

## Flujos de extremo a extremo

### Donativos únicos y recurrentes de miembros (B1App)

La pantalla de donación para usuarios autenticados (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) combina tres componentes de apphelper: `MultiGatewayDonationForm`, `PaymentMethods` y `RecurringDonations`. B1App hace la carga de datos alrededor: `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions`, y pasa la lista de pasarelas; el proveedor resuelto carga su propio SDK desde la clave pública de la pasarela. El cargo en sí ocurre dentro de apphelper: el proveedor resuelto tokeniza el método (nuevo o guardado) y luego envía `/giving/donate/charge` para un donativo único, o `/giving/donate/subscribe` para uno recurrente. Ambos endpoints atribuyen a un donante con sesión iniciada a su propio `personId` (solo quienes tienen `donations.edit` pueden atribuir a otra persona) y rechazan las divisiones por fondos que sumen más que el monto cobrado. Los donativos recurrentes crean una fila en `subscriptions` más `subscriptionFunds` y entregan la programación a la pasarela (Stripe Subscriptions, PayPal Billing Plans o una programación recurrente de KF).

### Donaciones de invitados o anónimas

La página pública de donación (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) y el panel de "dar ahora" muestran `NonAuthDonationWrapper` de `@churchapps/apphelper/website`, que inyecta reCAPTCHA y el contexto de Elements de la pasarela alrededor del `GuestForm` del proveedor. Los invitados no inician sesión, no tienen métodos guardados ni historial. El flujo consulta `GET /giving/funds/churchId/:id` y `GET /giving/donate/gateways/:churchId` (solo claves públicas), verifica al visitante con `POST /giving/donate/captcha-verify`, tokeniza en el navegador y envía a `/giving/donate/charge` (o `/subscribe`). La llamada de verificación devuelve un `captchaPass` firmado con HMAC y válido por 10 minutos (`Api/src/modules/giving/helpers/CaptchaPass.ts`), que el formulario envía con cada llamada de dinero de invitados; con `CAPTCHA_ENFORCE=true`, la API rechaza las llamadas de invitados a `create-order`, `charge`, `subscribe`, `addcard` y `ach-setup-intent-anon` sin un pase válido para esa iglesia. Los registros de eventos de pago de invitados (`POST /content/registrations/register`) verifican el mismo pase justo antes de su cargo; vea [Inscripciones a eventos](./registrations#payment-flow). El ACH de invitados usa el endpoint anónimo `POST /giving/paymentmethods/ach-setup-intent-anon`, que solo permite la verificación instantánea (Financial Connections): una verificación por microdepósitos termina días después, cuando la página del invitado ya no está abierta, así que nunca podría completar el donativo. El formulario se niega a cobrar un SetupIntent sin verificar y dirige al donante a tarjeta o a la configuración de cuenta bancaria con sesión iniciada.

Tres opciones del formulario de invitados usan la misma llamada de cargo. `?fundId=` y `?amount=` en la URL de donación preseleccionan la división por fondos (cada formulario de invitado de proveedor las lee al montarse, y las enruta por el manejador normal de cambio de fondo para que los totales y las comisiones se actualicen). `anonymous: true` hace que `DonateController.charge` descarte a cualquier persona que envíe el cliente y registre el donativo con `personId = null`; el formulario de invitado omite `/people/loadOrCreate` y el paso de cliente/bóveda, y los tres proveedores de registro inmediato dejan de resolver una persona a partir del cliente de la pasarela. Apple Pay requiere que el dominio de la página esté registrado en Stripe, así que un formulario de invitado de Stripe envía una vez por sesión a `POST /giving/donate/register-domain`, público y con límite de tasa, que solo acepta un dominio que pertenezca a la iglesia (`<subDomain>.b1.church`, una fila de la tabla de dominios del módulo de contenido, o un host local) antes de llamar a la API de dominios de métodos de pago de Stripe.

### Captura administrativa e importación de Stripe (B1Admin)

La sección de donaciones de B1Admin (`B1Admin/src/donations/`) es donde trabajan los equipos financieros. La captura por lotes (`components/BulkDonationEntry.tsx`) registra donativos en efectivo, cheque o en especie enviando `/giving/donations` y luego `/giving/funddonations`, sin intervención de ninguna pasarela. La hoja **Log a gift** del registro de una persona (`components/LogGiftDialog.tsx`) hace lo mismo para un solo donativo: primero busca el lote cuya `batchDate` coincida con la fecha del donativo, o crea uno con el nombre de esa fecha (`POST /giving/donationbatches`), y elimina de nuevo el donativo o el lote nuevo si un paso posterior falla. Fondos, lotes, campañas y estados de cuenta mapean cada uno a sus rutas CRUD `/giving/*`; las páginas de estados de cuenta de donaciones (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) piden un año calendario con `GET /donations?startDate=&endDate=` y `GET /fundDonations?startDate=&endDate=`, en lugar de todo el historial de la iglesia, que podría superar el límite de tamaño de respuesta de Lambda. El panel de donación de estilo miembro (`B1Admin/src/donationComponents/`) reutiliza los mismos componentes de apphelper que B1App.

Las entregas de reportes y contabilidad son trabajo del lado del cliente o del ejecutor de informes, no de la pasarela: la exportación a QuickBooks de la página de lotes construye un CSV de asiento contable a partir de `donations` + `fundDonations` del lote (cargo a Undeposited Funds, un abono por fondo); la vista Lapsed Givers de la página Summary ejecuta `Api/reports/lapsedGivers.json` mediante el ejecutor genérico de informes, con los nombres de personas resueltos por `ReportOutput`; y los formatos de recibo por país (Canadá / Australia / Nueva Zelanda) son configuraciones de la iglesia en el almacén clave-valor de membership, que renderiza `GivingStatementDocument` y que se duplica en la página de impresión de B1App. Las páginas de impresión de estados de cuenta de B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) pasan la configuración `logoLight` de la iglesia (mediante `usePrintLogo` en `B1Admin/src/components/PrintChurchHeader.tsx`), de modo que el logotipo se imprime en la parte superior de cada estado de cuenta, y esperan a que se cargue la imagen antes de imprimir automáticamente.

### Estado de los lotes y el permiso Enter Donations

Los lotes pueden cerrarse para que un depósito contado conserve su estado. `POST /giving/donationbatches/:id/close` y `/:id/reopen` (solo Donations.Edit) son los únicos que escriben `status`, `closedDate` y `closedBy` (`DonationBatchRepo.setStatus`); un guardado normal de un lote nunca los toca, así que registrar un lote no puede reabrirlo. El acceso de escritura se centraliza en `Api/src/modules/giving/helpers/BatchAccessHelper.ts`: Donations.Edit puede cambiar cualquier cosa, mientras que el permiso más limitado Donations.Enter (`GivingApi` / `Donations` / `Enter`, "Enter Donations" en el editor de roles) puede crear lotes y guardar o eliminar donativos y divisiones por fondos solo mientras tanto el lote actual del donativo como el lote de destino estén abiertos, y nunca para una ofrenda de la pasarela (una con `transactionId`). Una escritura bloqueada devuelve `403 { error: "This batch is closed." }`. La lectura de lotes acepta Donations.ViewSummary o Donations.Enter para que quien cuenta pueda elegir el lote en el que está capturando. En el cliente, `B1Admin/src/donations/batchAccess.ts` replica estas reglas (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`), y `Header` / `SecondaryMenuHelper` muestran **Donations > Batches** a cualquiera que pueda ver lotes, aunque no tenga View Summary.

### Conversión de totales en monedas mixtas

Cualquier endpoint que devuelva un único total combinado de donativos posiblemente en monedas mixtas (los KPI de resumen de donaciones `GivingKpiCards`, el total de un lote de donaciones, el total de un fondo y los totales del año hasta la fecha o del periodo de la pantalla de donación de B1App) convierte a la moneda predeterminada de la iglesia en el servidor, en lugar de sumar monedas distintas. `Api/src/shared/helpers/ExchangeRateHelper.ts` obtiene las tasas de `api.frankfurter.dev` indexadas por la moneda de la iglesia, las guarda en caché dentro del proceso durante 12 horas y expone `convertTotals(rows, churchCurrency, rates)`: las filas se agrupan previamente por moneda en SQL (unos cuantos grupos, nunca una conversión por donativo), cada grupo se convierte y se suma, y el resultado lleva una bandera `isConverted` que el cliente usa para mostrar la nota "Convertido con los tipos de cambio actuales". `GET /donations/exchange-rates` expone la tabla de tasas a los clientes que la necesitan (la pantalla de donación de B1App); las tasas nunca se aceptan desde una solicitud, solo se obtienen en el servidor, así que un cliente no puede influir en un total reportado. Los registros individuales de donativos y los informes históricos o en la moneda original nunca se convierten: solo los totales combinados.

La importación de Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) recupera donativos hechos fuera de B1: llama a `POST /giving/donate/replay-stripe-events` con `dryRun: true` para una vista previa, y luego con `dryRun: false` para importar. El servidor lista los eventos de Stripe del rango de fechas y omite lo que ya está registrado: primero por el ID de proveedor en `eventLogs`, luego por ID de transacción, y después por `DonationRepo.findMatchingDonation` (monto + fecha + persona), de modo que una nueva ejecución nunca importa dos veces lo mismo. Los eventos `charge.succeeded` / `payment_intent.succeeded` de suscripciones se omiten porque `invoice.paid` registra esos donativos; las versiones más recientes de la API de Stripe eliminan `PaymentIntent.invoice`, así que la omisión también se basa en la descripción "Subscription …".

## Webhooks y conciliación

Los pagos liquidados y los cambios de estado de suscripción llegan a `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). El procesamiento es deliberadamente idempotente:

1. **Verificar**: `GatewayService.verifyWebhook` delega en la verificación de firma del proveedor; una firma inválida devuelve 401. Los eventos que no requieren procesamiento terminan de inmediato con 200.
2. **Deduplicar el evento**: `EventLogRepo.loadByProviderId` omite un webhook que ya está registrado en `eventLogs`.
3. **Deduplicar el donativo**: antes de crear nada, `DonationRepo.loadByTransactionId` se verifica contra cada ID candidato que pueda traer la carga. Esto absorbe las entregas duplicadas, los eventos ACH de múltiples etapas (pendiente → liquidado) y el caso en que `/donate/charge` ya registró el donativo de forma optimista.
4. **Aplicar**: `classifyWebhookEvent(eventType)` del proveedor indica qué significa el evento (`donation` pendiente/completo, `cancel-subscription`, o `ignore`); los pagos completados crean un donativo `complete` (o promueven uno `pending` o `failed` existente), los eventos de estilo ACH quedan como `pending` hasta su liquidación, una factura de suscripción fallida (`invoice.payment_failed` de Stripe) crea un donativo `failed` identificado por el ID de la factura, y los eventos de cancelación eliminan la fila local de `subscriptions`. El controlador nunca inspecciona nombres de eventos específicos de un proveedor.

### Donativos recurrentes fallidos y cobros pendientes

Un donativo `failed` es la unidad de trabajo para la recuperación. `GET /giving/donations/failed` los lista con el mensaje de error más reciente de la pasarela, tomado de `eventLogs`, y una bandera `canRetry` según las capacidades de la pasarela; `POST /giving/donate/retry/:donationId` llama a `retryFailedPayment` del proveedor (Stripe paga la factura abierta), y el webhook resultante promueve la fila a `complete` mediante la ruta normal de deduplicación. Los correos de cobro pendiente se envían al donante desde el manejador del webhook el día 0, y luego desde `DunningHelper.run` en el temporizador de medianoche (conectado tanto en `lambda/timer-handler.ts` como en `RailwayCron.ts`) a los 3 y 7 días; cada envío se registra en `eventLogs` como `provider: "dunning"`, `providerId: "<donationId>:<day>"`, de modo que una nueva ejecución nunca envía dos veces el mismo correo. Cuando Stripe se rinde y cancela la suscripción (`customer.subscription.deleted` con `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` envía un correo al donante una sola vez (`providerId: "<subscriptionId>:canceled"`); las cancelaciones iniciadas por el donante o por un administrador no envían nada. Stripe nunca agrega eventos a un endpoint existente: después de cambiar `StripeHelper.webhookEvents`, vuelva a guardar la pasarela o ejecute `tools/manual/stripe-webhook-events.ts` (por defecto en modo de prueba, con `--apply` para escribir) contra producción.

Los proveedores con `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) registran sus cargos a partir de la respuesta de `/charge` (en el caso normal no se requiere un viaje de ida y vuelta por webhook), mientras que Stripe depende de `payment_intent.succeeded` / `invoice.paid` y de `payment_intent.processing` para ACH. El manejo de comisiones (`POST /giving/donate/fee`, la bandera `payFees` de la pasarela y el `calculateFees` de cada proveedor) calcula el ajuste bruto de "cubrir las comisiones" del lado del donante: B1 no cobra ningún porcentaje de la plataforma, así que nunca se agrega una comisión de aplicación.

:::info
Las rutas de cargo y de webhook escriben las mismas filas de `donations` / `fundDonations`. El `transactionId` es la clave de unión que evita que un registro optimista de cargo y su webhook posterior generen dos donativos por un mismo regalo.
:::

## Páginas relacionadas

- [Endpoints de Giving](../api/endpoints/giving): superficie REST completa para donativos, fondos, lotes, pasarelas, suscripciones, métodos de pago y webhooks
- [AppHelper](../shared-libraries/app-helper): el paquete npm que incluye el registro de proveedores de pago y los componentes de donación
- [Estructura de módulos](../api/module-structure): cómo se organiza del lado del servidor el módulo GivingApi
