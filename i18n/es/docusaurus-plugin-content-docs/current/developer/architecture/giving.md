---
title: "Arquitectura de Donaciones"
---

# Arquitectura de Donaciones

<div class="article-intro">

ChurchApps gestiona las donaciones con un modelo de pasarela de pago: la iglesia mantiene su propia cuenta de Stripe (o PayPal, Kingdom Funding o Paystack), y B1 nunca interviene en el flujo del dinero como procesador de pagos de la plataforma. Los datos de la tarjeta se tokenizan en el navegador y nunca llegan a un servidor de ChurchApps. Esta página describe toda la arquitectura: el registro de proveedores de pago del lado del cliente en `@churchapps/apphelper`, la abstracción de pasarela GivingApi, el modelo de datos de las donaciones y cómo los webhooks de las pasarelas se reconcilian con la base de datos.

</div>

## Descripción general

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (browser)  │                   │  Payment gateway                      │
│                             │                   │  (Stripe / PayPal / KF / Paystack)  │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ card entry in the │  Stripe Elements · KF tokenizer ·     │
│  │ Payment provider      │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ registry              │  │◀── token / nonce ─│  (card never reaches a B1 server)     │
│  │ getPaymentProvider()  │  │                   └──────────▲────────────────┬───────────┘
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge / subscribe│                │ signed webhook
┌─────────────────────────────────────────────┐ (secret key) │                │ event
│  GivingApi — /giving module                 │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  save donations + fundDonations — dedup via eventLogs / transactionId
                      ▼
                MySQL (giving schema)
```

Tres principios se cumplen en toda la arquitectura:

1. **La pasarela custodia la tarjeta.** El widget de entrada de cada proveedor tokeniza en el navegador; la API solo recibe un token, un nonce o un identificador de orden.
2. **Una abstracción, muchos proveedores.** El navegador resuelve un `PaymentProvider` desde un registro; el servidor resuelve un `IGatewayProvider` desde una fábrica. Ambos usan el mismo nombre de proveedor normalizado que se guarda en el registro de la pasarela.
3. **Los webhooks son la fuente de verdad para la liquidación.** La respuesta de un cobro se registra de forma optimista, pero el webhook firmado de la pasarela es lo que confirma (o crea) la donación completada, con protecciones de idempotencia en ambos lados.

## Lado del cliente: el registro de proveedores de pago (`@churchapps/apphelper`)

El registro se encuentra en `Packages/apphelper/src/donations/providers/`, y los widgets y auxiliares de cada proveedor están en su propia subcarpeta (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`); nada fuera de `providers/` bifurca según el nombre de un proveedor. Un `PaymentProvider` (ver `providers/types.ts`) agrupa todo lo que una aplicación anfitriona necesita para una pasarela: un `descriptor` (etiquetas de administración, monedas admitidas, campos de comisiones, tasas de comisión predeterminadas, URL del panel y de registro), un conjunto de indicadores `capabilities` (tarjetas guardadas, ACH, recurrencia, entrada de nueva tarjeta en línea, guardado automático al tokenizar), los widgets de React para la entrada de miembros (`MemberWrapper`/`MemberEntry`), la donación de invitados (`GuestForm`), la edición de métodos guardados (`MethodEditForm`) y los pagos de preguntas de formularios (`FormPayment`), además de `buildChargeRequest(ctx, token)`, el único lugar donde la forma de la carga útil del cobro varía según el proveedor. El `MemberWrapper` de cada proveedor carga su propio SDK a partir de la clave pública del registro de la pasarela, por lo que las aplicaciones anfitrionas nunca importan un SDK de pasarela (B1App y B1Admin no tienen ninguna dependencia de `@stripe/*`). `pickDefaultGateway(gateways, capability?)` centraliza cuál de las pasarelas de una iglesia debe usar cada superficie.

`providers/registry.ts` contiene los proveedores integrados. Se **referencian por valor**, no se registran mediante un efecto secundario de un módulo, de modo que la eliminación de código no usado del empaquetador nunca puede descartar el registro:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Función | Propósito |
|----------|---------|
| `getPaymentProvider(name)` | Resuelve por nombre normalizado; recurre a Stripe para que un proveedor mal configurado nunca bloquee por completo el formulario del donante |
| `registerPaymentProvider(p)` | Registra un proveedor adicional en tiempo de ejecución (para la pasarela personalizada de una aplicación anfitriona) |
| `listPaymentProviders()` | Enumera los integrados y los personalizados; se usa para construir el menú desplegable de pasarelas del administrador |
| `hasPaymentProvider(name)` | Comprobación de pertenencia |

**Proveedores integrados del lado del cliente: Stripe, PayPal, Kingdom Funding, Paystack.** B1App y B1Admin solo *leen* el registro (`getPaymentProvider`, `listPaymentProviders`); ninguno llama a `registerPaymentProvider`: el registro se mantiene dentro de apphelper.

Cada proveedor tokeniza de forma distinta, pero todos mantienen la tarjeta fuera de B1:

| Proveedor | Widget de entrada | Token devuelto a la API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; el formulario de invitados también monta un `ExpressCheckoutElement` (Apple Pay / Google Pay, para donaciones únicas) cuyo `onConfirm` resuelve al mismo identificador `pm_…` | identificador del método de pago (`pm_…`); cuentas bancarias mediante `/paymentmethods/ach-setup-intent`: Financial Connections `us_bank_account` para pasarelas en USD, y `acss_debit` de PAD canadiense (modal de mandato alojado, mandato `default_for` para facturas/suscripciones; los cobros únicos envían el identificador del mandato) para pasarelas en CAD |
| Kingdom Funding | Formulario de tokenización alojado, identificado por la clave pública de la pasarela | nonce de un solo uso |
| PayPal | PayPal Hosted Fields (tarjeta, recurrencia) más PayPal Smart Buttons con financiación por Venmo (pagos únicos); ambos comparten una sola carga de SDK y la orden del servidor se crea mediante `/donate/client-token` + `/donate/create-order` | identificador de la orden capturada |
| Paystack | Ventana emergente Paystack Inline (`js.paystack.co/v2/inline.js`): la propia ventana procesa el pago (tarjeta, dinero móvil, transferencia bancaria, USSD) | referencia de transacción pagada; los métodos guardados son códigos de autorización `AUTH_…` de Paystack |

El `finalizeResult` de Stripe ejecuta 3-D Secure / SCA en el navegador (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) antes de dar por completada la donación; el formulario compartido solo llama a `provider.finalizeResult(result)` sin conocer lo que hace.

## Lado del servidor: la abstracción de pasarela (GivingApi)

El módulo `/giving` (`Api/src/modules/giving`) expone la superficie REST; la infraestructura de pasarelas está en `Api/src/shared/helpers`. `DonateController` nunca se comunica directamente con un SDK de pasarela: pasa por `GatewayService`, que resuelve el `IGatewayProvider` adecuado desde `GatewayFactory` y le entrega un `GatewayConfig` descifrado.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) es el contrato que implementa cada pasarela: ciclo de vida de los webhooks (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), pagos (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), comisiones (`calculateFees`), gestión de métodos guardados (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) y extras opcionales (clientes, órdenes, SetupIntents, reproducción de eventos, `retryFailedPayment` para una factura de suscripción fallida, `registerPaymentMethodDomain` para la verificación de dominio de Apple Pay). Un proveedor que omite un hook opcional se informa como no compatible con esa acción, y la interfaz oculta el control correspondiente. Cada clase de proveedor declara su propia matriz `capabilities` (monedas admitidas, ACH, reembolsos, requisitos de suscripción, límites de transacción): `GatewayService.getProviderCapabilities(provider)` simplemente la lee. Indicadores como `logsDonationsImmediately` determinan el comportamiento de los controladores sin condiciones basadas en el nombre del proveedor dentro de ellos.

**Proveedores de servidor registrados en `GatewayFactory`:**

| Proveedor | Disponibilidad |
|----------|-------------|
| Stripe | Siempre activo |
| PayPal | Siempre activo |
| Kingdom Funding | Siempre activo |
| Paystack | Siempre activo (comerciantes de Nigeria, Ghana, Sudáfrica, Kenia, Costa de Marfil; monedas NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Opcional mediante la variable de entorno `ENABLE_SQUARE` |
| ePayMints | Opcional mediante la variable de entorno `ENABLE_EPAYMINTS` |

Paystack se diferencia de los demás en que el dinero se mueve antes de que GivingApi intervenga: la ventana emergente cobra al donante, `processCharge` es un `GET /transaction/verify/:reference` cuyo monto pagado y moneda deben coincidir con la donación que se va a registrar (una referencia ya registrada nunca se anota dos veces), y el primer pago de un calendario recurrente se registra desde `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` con `start_date` a un intervalo de distancia). Los webhooks se firman con la propia clave secreta (`x-paystack-signature`, HMAC-SHA512 sobre el cuerpo sin procesar), y Paystack no tiene una API para gestionar webhooks, por lo que la pantalla de administración muestra la URL para que la iglesia la pegue en su panel de Paystack. Los eventos `charge.success` de renovación no incluyen la división por fondos; el proveedor la recupera de las filas locales `subscriptions`/`subscriptionFunds` del donante. Solo las autorizaciones de tarjeta son `reusable`: los pagos por dinero móvil son únicamente de una vez, por lo que `createSubscription` los rechaza. Los datos de demostración incluyen una segunda iglesia (Accra Community Church, `CHU00000002`) con una pasarela GHS en modo de prueba de Paystack, para que la suite de Playwright de Paystack se ejecute junto a la de Stripe de Grace.

Se pueden registrar proveedores personalizados en tiempo de ejecución cuando está definida la variable `ENABLE_CUSTOM_GATEWAY_PROVIDERS`; `AbstractExperimentalGatewayProvider` es la clase base para ellos. Los nombres de proveedor se comparan sin distinguir mayúsculas y minúsculas.

### Configuración de la pasarela y secretos

Un administrador guarda las credenciales de la pasarela mediante `POST /giving/gateways` (`GatewayController`). Al guardar, el controlador cifra las claves privada y de webhook con `EncryptionHelper` antes de persistirlas; luego, en cualquier host que no sea localhost, elimina el webhook existente de la iglesia y aprovisiona uno nuevo que apunta a `/giving/donate/webhook/{provider}?churchId=…`. Una iglesia mantiene una fila por proveedor: guardar una pasarela reemplaza solo la fila existente de ese mismo proveedor. Las lecturas públicas (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) devuelven únicamente las claves públicas.

## Modelo de datos

El esquema de giving (`Api/src/modules/giving/db/DatabaseTypes.ts`, modelos en `models/`) es un esquema MySQL al que se accede mediante Kysely:

| Tabla | Función |
|-------|------|
| `gateways` | Configuración de proveedor por iglesia: `provider`, `publicKey`, `privateKey`/`webhookKey` cifradas, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Destinos de las donaciones (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Agrupación para el registro y los informes (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Un solo regalo: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; los estados de cuenta, totales, paneles e informes de donaciones solo cuentan `complete` o null), `transactionId` |
| `fundDonations` | Asignación de una donación a uno o más fondos (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Donación recurrente; `id` es el identificador de suscripción de la pasarela, vinculado a `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | División por fondos de una donación recurrente |
| `customers` | Vincula un `personId` con su identificador de cliente en la pasarela, por `provider` |
| `gatewayPaymentMethods` | Tarjetas o cuentas bancarias guardadas: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Registro de auditoría de webhooks/eventos y clave de deduplicación (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Campañas de promesas vinculadas a un fondo, y el monto prometido de cada persona |

Una donación se reparte entre fondos mediante `fundDonations`: la donación contiene el total, y cada `fundDonation` contiene una parte. `donations.currency` y `gateways.currency` guardan la moneda ISO; cada proveedor anuncia sus `supportedCurrencies`, y los montos se formatean con `CurrencyHelper.formatCurrencyWithLocale`.

## Flujos de extremo a extremo

### Donación única y recurrente de miembros (B1App)

La pantalla de donación para usuarios autenticados (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) combina tres componentes de apphelper: `MultiGatewayDonationForm`, `PaymentMethods` y `RecurringDonations`. B1App realiza la carga de datos que la rodea (`GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions`) y le pasa la lista de pasarelas; el proveedor resuelto carga su propio SDK a partir de la clave pública de la pasarela. El cobro en sí ocurre dentro de apphelper: el proveedor resuelto tokeniza el método (nuevo o guardado) y luego envía a `/giving/donate/charge` para un regalo único, o a `/giving/donate/subscribe` para uno recurrente. Ambos endpoints atribuyen a un donante autenticado su propio `personId` (solo quienes tienen `donations.edit` pueden atribuir a otra persona) y rechazan divisiones por fondos cuya suma supere el monto cobrado. Los regalos recurrentes crean una fila en `subscriptions` más `subscriptionFunds` y entregan el calendario a la pasarela (Stripe Subscriptions, PayPal Billing Plans o un calendario recurrente de KF).

### Donaciones de invitados o anónimas

La página pública de donación (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) y el panel de "dar ahora" renderizan `NonAuthDonationWrapper` desde `@churchapps/apphelper/website`, que inyecta reCAPTCHA y el contexto Elements de la pasarela alrededor del `GuestForm` del proveedor. Los invitados no inician sesión, no tienen métodos guardados ni historial. El flujo obtiene `GET /giving/funds/churchId/:id` y `GET /giving/donate/gateways/:churchId` (solo claves públicas), verifica al visitante con `POST /giving/donate/captcha-verify`, tokeniza en el navegador y envía a `/giving/donate/charge` (o `/subscribe`). El ACH para invitados usa el endpoint anónimo `POST /giving/paymentmethods/ach-setup-intent-anon`, que permite solo la verificación instantánea (Financial Connections): una verificación con microdepósitos termina días después, cuando la página del invitado ya no está disponible, por lo que nunca podría completarse el regalo. El formulario se niega a cobrar un SetupIntent no verificado y dirige al donante a tarjeta o a la configuración bancaria de un usuario con sesión iniciada.

Tres opciones del formulario de invitados usan la misma llamada de cobro. `?fundId=` y `?amount=` en la URL de donación preseleccionan la división por fondos (los lee el formulario de invitados de cada proveedor al montarse, y las pasa por el manejador normal de cambio de fondo para que los totales y las comisiones se actualicen). `anonymous: true` hace que `DonateController.charge` descarte cualquier persona que envíe el cliente y registre el regalo con `personId = null`; el formulario de invitados omite `/people/loadOrCreate` y el paso de cliente/bóveda, y los tres proveedores de registro inmediato dejan de resolver una persona a partir del cliente de la pasarela. Apple Pay requiere que el dominio de la página esté registrado en Stripe, por lo que un formulario de invitados de Stripe envía una vez por sesión a `POST /giving/donate/register-domain`, público y con límite de frecuencia, que solo acepta un dominio que pertenezca a la iglesia (`<subDomain>.b1.church`, una fila en la tabla de dominios del módulo de contenido, o un host local) antes de llamar a la API de dominios de métodos de pago de Stripe.

### Registro administrativo y importación de Stripe (B1Admin)

La sección de donaciones de B1Admin (`B1Admin/src/donations/`) es donde trabajan los equipos financieros. La captura por lotes (`components/BulkDonationEntry.tsx`) registra regalos en efectivo, cheque o en especie enviando `/giving/donations` y luego `/giving/funddonations`, sin intervención de la pasarela. La hoja **Registrar un regalo** del registro de la persona (`components/LogGiftDialog.tsx`) hace lo mismo para un solo regalo: primero busca el lote cuyo `batchDate` coincide con la fecha del regalo, o crea uno con el nombre de esa fecha (`POST /giving/donationbatches`), y elimina de nuevo la donación o el lote nuevo si un paso posterior falla. Los fondos, lotes, campañas y estados de cuenta corresponden cada uno a sus rutas CRUD `/giving/*`. Las páginas de estados de cuenta de giving (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) solicitan un año calendario con `GET /donations?startDate=&endDate=` y `GET /fundDonations?startDate=&endDate=`, en lugar de todo el historial de la iglesia, que podría superar el límite de tamaño de respuesta de Lambda. El panel de donación estilo miembro (`B1Admin/src/donationComponents/`) reutiliza los mismos componentes de apphelper que B1App.

Las entregas a contabilidad e informes son trabajo del cliente o del ejecutor de informes, no de la pasarela: la exportación a QuickBooks de la página de lotes genera un CSV de asiento contable a partir de `donations` + `fundDonations` del lote (débito a Undeposited Funds, un crédito por fondo); la vista Donantes inactivos de la página de Resumen ejecuta `Api/reports/lapsedGivers.json` mediante el ejecutor genérico de informes, con los nombres de las personas resueltos por `ReportOutput`; y los formatos de recibos por país (Canadá / Australia / Nueva Zelanda) son configuraciones de la iglesia en el almacén clave-valor de membresía, que renderiza `GivingStatementDocument` y que se duplica en la página de impresión de B1App. Las páginas de impresión de estados de cuenta de B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) pasan la configuración `logoLight` de la iglesia (mediante `usePrintLogo` en `B1Admin/src/components/PrintChurchHeader.tsx`) para que el logotipo se imprima en la parte superior de cada estado de cuenta, y esperan a que cargue la imagen antes de imprimir automáticamente.

### Estado de los lotes y el permiso Registrar donaciones

Los lotes pueden cerrarse para que un depósito ya contado se mantenga tal como está. `POST /giving/donationbatches/:id/close` y `/:id/reopen` (solo Donations.Edit) son los únicos escritores de `status`, `closedDate` y `closedBy` (`DonationBatchRepo.setStatus`); un guardado normal del lote nunca los modifica, de modo que contabilizar un lote no puede reabrirlo. El acceso de escritura está centralizado en `Api/src/modules/giving/helpers/BatchAccessHelper.ts`: Donations.Edit puede cambiar cualquier cosa, mientras que el permiso más restringido Donations.Enter (`GivingApi` / `Donations` / `Enter`, "Enter Donations" en el editor de roles) puede crear lotes y guardar o eliminar donaciones y divisiones por fondo solo mientras tanto el lote actual de la donación como el lote de destino estén abiertos, y nunca para un regalo de pasarela (uno con `transactionId`). Una escritura bloqueada devuelve `403 { error: "This batch is closed." }`. La lectura de lotes acepta Donations.ViewSummary o Donations.Enter, para que quien cuenta pueda elegir el lote en el que está registrando. En el cliente, `B1Admin/src/donations/batchAccess.ts` replica estas reglas (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`), y `Header` / `SecondaryMenuHelper` muestran **Donaciones > Lotes** a cualquiera que pueda ver los lotes, incluso sin Ver resumen.

### Conversión de totales en varias monedas

Cualquier endpoint que devuelva un único total combinado de regalos que posiblemente estén en varias monedas —los KPI del resumen de ofrendas (`GivingKpiCards`), el total de un lote de donaciones, el total de un fondo y los totales del año hasta la fecha o del período de la pantalla de donación de B1App— convierte a la moneda predeterminada de la iglesia en el servidor, en lugar de sumar monedas distintas. `Api/src/shared/helpers/ExchangeRateHelper.ts` obtiene las tasas de `api.frankfurter.dev` según la moneda de la iglesia, las guarda en caché dentro del proceso durante 12 horas y expone `convertTotals(rows, churchCurrency, rates)`: las filas se agrupan previamente por moneda en SQL (unos pocos grupos, nunca una conversión por regalo), cada grupo se convierte y se suma, y el resultado incluye un indicador `isConverted` que el cliente usa para mostrar la nota "Convertido con los tipos de cambio actuales". `GET /donations/exchange-rates` expone la tabla de tasas a los clientes que la necesitan (la pantalla de donación de B1App); las tasas nunca se aceptan desde una solicitud, solo se obtienen en el servidor, de modo que un cliente no puede influir en un total informado. Los registros individuales de donaciones y los informes en la moneda histórica u original nunca se convierten: solo se convierten los totales combinados.

La importación de Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) incorpora regalos realizados fuera de B1: llama a `POST /giving/donate/replay-stripe-events` con `dryRun: true` para una vista previa, y luego con `dryRun: false` para importar. El servidor lista los eventos de Stripe del rango de fechas y omite lo que ya está registrado: primero por el identificador de proveedor de `eventLogs`, luego por identificador de transacción, y después por `DonationRepo.findMatchingDonation` (monto + fecha + persona), de modo que una nueva ejecución nunca importa dos veces lo mismo. Los eventos `charge.succeeded` / `payment_intent.succeeded` de suscripciones se omiten porque `invoice.paid` registra esos regalos; las versiones más recientes de la API de Stripe eliminan `PaymentIntent.invoice`, por lo que la omisión también se basa en la descripción "Subscription …".

## Webhooks y reconciliación

Los pagos liquidados y los cambios de estado de las suscripciones llegan a `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). El procesamiento es deliberadamente idempotente:

1. **Verificar**: `GatewayService.verifyWebhook` delega en la comprobación de firma del proveedor; una firma no válida devuelve 401. Los eventos que no requieren procesamiento terminan de inmediato con 200.
2. **Deduplicar el evento**: `EventLogRepo.loadByProviderId` omite un webhook que ya está registrado en `eventLogs`.
3. **Deduplicar la donación**: antes de crear nada, `DonationRepo.loadByTransactionId` se comprueba contra cada identificador candidato que pueda contener la carga útil. Esto absorbe las entregas duplicadas, los eventos ACH de varias etapas (pendiente → liquidado) y el caso en que `/donate/charge` ya registró el regalo de forma optimista.
4. **Aplicar**: `classifyWebhookEvent(eventType)` del proveedor indica qué significa el evento (`donation` pendiente/completa, `cancel-subscription` o `ignore`); los pagos completados crean una donación `complete` (o promueven una existente `pending` o `failed`), los eventos de tipo ACH quedan como `pending` hasta la liquidación, una factura de suscripción fallida (`invoice.payment_failed` de Stripe) crea una donación `failed` identificada por el identificador de la factura, y los eventos de cancelación eliminan la fila local de `subscriptions`. El controlador nunca inspecciona nombres de eventos específicos de un proveedor.

### Regalos recurrentes fallidos y reintentos de cobro

Una donación `failed` es la unidad de trabajo para la recuperación. `GET /giving/donations/failed` las lista con el mensaje de fallo más reciente de la pasarela desde `eventLogs` y un indicador `canRetry` tomado de las capacidades de la pasarela; `POST /giving/donate/retry/:donationId` llama a `retryFailedPayment` del proveedor (Stripe paga la factura abierta), y el webhook resultante promueve la fila a `complete` mediante la ruta normal de deduplicación. Los correos de reintento se envían al donante desde el manejador del webhook el día 0, y luego desde `DunningHelper.run` en el temporizador de medianoche (conectado tanto en `lambda/timer-handler.ts` como en `RailwayCron.ts`) a los 3 y 7 días; cada envío se registra en `eventLogs` como `provider: "dunning"`, `providerId: "<donationId>:<day>"`, de modo que una nueva ejecución nunca envía dos veces el mismo correo. Cuando Stripe desiste y cancela la suscripción (`customer.subscription.deleted` con `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` envía un correo al donante una sola vez (`providerId: "<subscriptionId>:canceled"`); las cancelaciones iniciadas por el donante o por el administrador no generan correo. Stripe nunca agrega eventos a un endpoint existente: después de cambiar `StripeHelper.webhookEvents`, vuelva a guardar la pasarela o ejecute `tools/manual/stripe-webhook-events.ts` (por defecto en modo de simulación, `--apply` para escribir) contra producción.

Los proveedores con `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) registran sus cobros a partir de la respuesta de `/charge` (no se necesita el ciclo del webhook en el camino feliz), mientras que Stripe depende de `payment_intent.succeeded` / `invoice.paid` y de `payment_intent.processing` para ACH. El manejo de comisiones (`POST /giving/donate/fee`, el indicador `payFees` de la pasarela y `calculateFees` de cada proveedor) calcula el ajuste "cubrir las comisiones" del lado del donante: B1 no cobra ninguna comisión de plataforma, por lo que nunca se añade una comisión de aplicación.

:::info
Las rutas de cobro y de webhook escriben las mismas filas de `donations` / `fundDonations`. El `transactionId` es la clave de unión que evita que un registro de cobro optimista y su webhook posterior produzcan dos donaciones para un mismo regalo.
:::

## Páginas relacionadas

- [Endpoints de Giving](../api/endpoints/giving): superficie REST completa para donaciones, fondos, lotes, pasarelas, suscripciones, métodos de pago y webhooks
- [AppHelper](../shared-libraries/app-helper): el paquete npm que incluye el registro de proveedores de pago y los componentes de donación
- [Estructura de módulos](../api/module-structure): cómo está organizado en el servidor el módulo GivingApi
