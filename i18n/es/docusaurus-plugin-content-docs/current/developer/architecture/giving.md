---
title: "Arquitectura de Giving"
---

# Arquitectura de Giving

<div class="article-intro">

ChurchApps gestiona las donaciones con un modelo de riel de pasarela: la iglesia conserva su propia cuenta de Stripe (o PayPal, Kingdom Funding o Paystack), y B1 nunca se sitúa en el flujo del dinero como procesador de la plataforma. Los datos de la tarjeta se tokenizan en el navegador y nunca llegan a un servidor de ChurchApps. Esta página describe toda la pila: el registro de proveedores de pago del lado del cliente en `@churchapps/apphelper`, la abstracción de pasarelas de GivingApi, el modelo de datos de donaciones y cómo los webhooks de las pasarelas se reconcilian con la base de datos.

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

Tres principios se cumplen en toda la pila:

1. **La pasarela tiene la tarjeta.** El widget de entrada de cada proveedor tokeniza en el navegador; la API solo recibe un token, un nonce o un id de orden.
2. **Una abstracción, muchos proveedores.** El navegador resuelve un `PaymentProvider` desde un registro; el servidor resuelve un `IGatewayProvider` desde una fábrica. Ambos se basan en el mismo nombre normalizado de proveedor almacenado en el registro de la pasarela.
3. **Los webhooks son la fuente de verdad para la liquidación.** La respuesta de un cargo se registra de forma optimista, pero el webhook firmado de la pasarela es lo que confirma (o crea) la donación completada, con protecciones de idempotencia en ambos lados.

## Lado del cliente: el registro de proveedores de pago (`@churchapps/apphelper`)

El registro vive en `Packages/apphelper/src/donations/providers/`, y los widgets y auxiliares de cada proveedor están en su propia subcarpeta (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`): nada fuera de `providers/` bifurca según el nombre del proveedor. Un `PaymentProvider` (consulte `providers/types.ts`) agrupa todo lo que una aplicación host necesita para una pasarela: un `descriptor` (etiquetas de administración, monedas admitidas, campos de comisiones, tarifas de comisión predeterminadas, URL de panel/registro), un conjunto de `capabilities` (tarjetas guardadas, ACH, recurrentes, entrada de nueva tarjeta en línea, guardado implícito al tokenizar), los widgets de React para la entrada de miembros (`MemberWrapper`/`MemberEntry`), la donación de invitados (`GuestForm`), la edición de métodos guardados (`MethodEditForm`) y los pagos de preguntas de formularios (`FormPayment`), además de `buildChargeRequest(ctx, token)`, el único lugar donde la forma de la carga difiere según el proveedor. El `MemberWrapper` de cada proveedor carga su propio SDK a partir de la clave pública del registro de la pasarela, así que las aplicaciones host nunca importan un SDK de pasarela (B1App y B1Admin no tienen dependencia de `@stripe/*`). `pickDefaultGateway(gateways, capability?)` centraliza cuál de las pasarelas de una iglesia debe usar cada superficie.

`providers/registry.ts` contiene los integrados. Se **referencian por valor**, no se registran mediante un efecto secundario de módulo, de modo que la eliminación de código no usado del empaquetador nunca puede eliminar el registro:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Función | Propósito |
|---------|-----------|
| `getPaymentProvider(name)` | Resuelve por nombre normalizado; recurre a Stripe para que un proveedor mal configurado nunca bloquee el formulario de donación |
| `registerPaymentProvider(p)` | Registra un proveedor adicional en tiempo de ejecución (para una pasarela personalizada de una aplicación host) |
| `listPaymentProviders()` | Enumera los integrados y los personalizados; se usa para construir el desplegable de pasarelas de administración |
| `hasPaymentProvider(name)` | Verificación de pertenencia |

**Proveedores de cliente integrados: Stripe, PayPal, Kingdom Funding, Paystack.** B1App y B1Admin solo *leen* el registro (`getPaymentProvider`, `listPaymentProviders`); ninguno llama a `registerPaymentProvider`: el registro se mantiene dentro de apphelper.

Cada proveedor tokeniza de forma distinta, pero todos mantienen la tarjeta fuera de B1:

| Proveedor | Widget de entrada | Token devuelto a la API |
|-----------|-------------------|-------------------------|
| Stripe | `CardElement` de Stripe `Elements` → `stripe.createPaymentMethod(...)`; el formulario de invitados también monta un `ExpressCheckoutElement` (Apple Pay / Google Pay, para regalos únicos) cuyo `onConfirm` se resuelve al mismo id `pm_…` | id del método de pago (`pm_…`); banco mediante `/paymentmethods/ach-setup-intent` — Financial Connections `us_bank_account` para pasarelas en USD, PAD canadiense `acss_debit` (modal de mandato alojado, el mandato `default_for` facturas/suscripciones, los cargos únicos pasan el id del mandato) para pasarelas en CAD |
| Kingdom Funding | Formulario de tokenizador alojado, identificado por la clave pública de la pasarela | nonce de un solo uso |
| PayPal | PayPal Hosted Fields (tarjeta, recurrente) más PayPal Smart Buttons con financiación de Venmo (único); ambos comparten una sola carga de SDK y la orden del servidor se construye mediante `/donate/client-token` + `/donate/create-order` | id de orden capturada |
| Paystack | Popup de Paystack Inline (`js.paystack.co/v2/inline.js`): el propio popup procesa el pago (tarjeta, dinero móvil, transferencia bancaria, USSD) | referencia de transacción pagada; los métodos guardados son códigos de autorización `AUTH_…` de Paystack |

El `finalizeResult` de Stripe ejecuta 3-D Secure / SCA en el navegador (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) antes de dar por completada la donación; el formulario compartido solo llama a `provider.finalizeResult(result)` sin saber qué hace.

## Lado del servidor: la abstracción de pasarelas (GivingApi)

El módulo `/giving` (`Api/src/modules/giving`) expone la superficie REST; la infraestructura de pasarelas vive en `Api/src/shared/helpers`. `DonateController` nunca habla directamente con un SDK de pasarela: pasa por `GatewayService`, que resuelve el `IGatewayProvider` correcto desde `GatewayFactory` y le entrega un `GatewayConfig` descifrado.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) es el contrato que implementa cada pasarela: ciclo de vida de webhooks (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), pagos (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), comisiones (`calculateFees`), gestión de métodos guardados (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) y extras opcionales (clientes, órdenes, SetupIntents, reproducción de eventos, `retryFailedPayment` para una factura de suscripción fallida, `registerPaymentMethodDomain` para la verificación de dominio de Apple Pay). Un proveedor que omite un gancho opcional se reporta como no compatible con esa acción, y la interfaz oculta el control. Cada clase de proveedor declara su propia matriz `capabilities` (monedas admitidas, ACH, reembolsos, requisitos de suscripción, límites de transacción); `GatewayService.getProviderCapabilities(provider)` simplemente la lee; y banderas como `logsDonationsImmediately` controlan el comportamiento de los controladores sin condicionales por nombre de proveedor en los controladores.

**Proveedores de servidor registrados en `GatewayFactory`:**

| Proveedor | Disponibilidad |
|-----------|----------------|
| Stripe | Siempre activo |
| PayPal | Siempre activo |
| Kingdom Funding | Siempre activo |
| Paystack | Siempre activo (comerciantes de Nigeria, Ghana, Sudáfrica, Kenia, Costa de Marfil; monedas NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Activación voluntaria mediante la variable de entorno `ENABLE_SQUARE` |
| ePayMints | Activación voluntaria mediante la variable de entorno `ENABLE_EPAYMINTS` |

Paystack se diferencia de los demás en que el dinero se mueve antes de que intervenga GivingApi: el popup cobra al donante, `processCharge` es un `GET /transaction/verify/:reference` cuyo monto pagado y moneda deben coincidir con la donación que se registra (una referencia ya registrada nunca se registra dos veces), y el primer regalo de un calendario recurrente se registra desde `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` con `start_date` a un intervalo de distancia). Los webhooks se firman con la propia clave secreta (`x-paystack-signature`, HMAC-SHA512 sobre el cuerpo sin procesar), y Paystack no tiene una API de administración de webhooks, así que la pantalla de administración muestra la URL para que la iglesia la pegue en su panel. Los eventos `charge.success` de renovación no traen división de fondos; el proveedor la recupera de las filas locales `subscriptions`/`subscriptionFunds` del donante. Solo las autorizaciones de tarjeta son `reusable`: los regalos por dinero móvil son únicamente de una vez, así que `createSubscription` los rechaza. Los datos de demostración incluyen una segunda iglesia (Accra Community Church, `CHU00000002`) con una pasarela GHS en modo de prueba de Paystack, para que la suite de Playwright de Paystack se ejecute junto a la de Stripe de Grace.

Los proveedores personalizados pueden registrarse en tiempo de ejecución cuando se define `ENABLE_CUSTOM_GATEWAY_PROVIDERS`; `AbstractExperimentalGatewayProvider` es la clase base para ellos. Los nombres de proveedor se comparan sin distinguir mayúsculas.

### Configuración de la pasarela y secretos

Un administrador guarda las credenciales de la pasarela mediante `POST /giving/gateways` (`GatewayController`). Al guardar, el controlador cifra las claves privada y de webhook con `EncryptionHelper` antes de persistirlas y, en cualquier host que no sea localhost, elimina el webhook existente de la iglesia y aprovisiona uno nuevo que apunta a `/giving/donate/webhook/{provider}?churchId=…`. Una iglesia mantiene una fila por proveedor: guardar una pasarela reemplaza solo la fila existente de ese mismo proveedor. Las lecturas públicas (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) devuelven solo las claves públicas.

## Modelo de datos

El esquema de giving (`Api/src/modules/giving/db/DatabaseTypes.ts`, modelos en `models/`) es un esquema de MySQL al que se accede mediante Kysely:

| Tabla | Función |
|-------|---------|
| `gateways` | Configuración de proveedor por iglesia: `provider`, `publicKey`, `privateKey`/`webhookKey` cifrados, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Destinos de donación (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Agrupación para la captura y los informes (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Un regalo: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; los estados de cuenta, totales, paneles e informes de donaciones solo cuentan `complete` o null), `transactionId` |
| `fundDonations` | Asignación de una donación a uno o más fondos (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Regalo recurrente; `id` es el id de suscripción de la pasarela, vinculado a `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | División de fondos para un regalo recurrente |
| `customers` | Vincula un `personId` con su id de cliente en la pasarela, por `provider` |
| `gatewayPaymentMethods` | Tarjetas/cuentas bancarias guardadas: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Registro de auditoría de webhooks/eventos y clave de deduplicación (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Campañas de compromiso vinculadas a un fondo, y el monto comprometido de cada persona |

Una donación se reparte entre fondos mediante `fundDonations`: la donación lleva el total, y cada `fundDonation` lleva una porción. `donations.currency` y `gateways.currency` llevan la moneda ISO; cada proveedor anuncia sus `supportedCurrencies`, y los montos se formatean con `CurrencyHelper.formatCurrencyWithLocale`.

## Flujos de extremo a extremo

### Miembro: donación única y recurrente (B1App)

La pantalla de donación para usuarios con sesión (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) combina tres componentes de apphelper: `MultiGatewayDonationForm`, `PaymentMethods` y `RecurringDonations`. B1App hace la carga de datos alrededor: `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions`, y pasa la lista de pasarelas; el proveedor resuelto carga su propio SDK desde la clave pública de la pasarela. El cargo en sí ocurre dentro de apphelper: el proveedor resuelto tokeniza el método (nuevo o guardado) y luego envía a `/giving/donate/charge` para un regalo único o a `/giving/donate/subscribe` para uno recurrente. Ambos endpoints atribuyen a un donante con sesión su propio `personId` (solo quienes tienen `donations.edit` pueden atribuir a otra persona) y rechazan divisiones de fondos cuya suma supere el monto cobrado. Los regalos recurrentes crean una fila de `subscriptions` más `subscriptionFunds` y entregan el calendario a la pasarela (Stripe Subscriptions, PayPal Billing Plans o un calendario recurrente de KF).

### Donación de invitados o anónima

La página pública de donación (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) y el panel de "dar ahora" renderizan `NonAuthDonationWrapper` de `@churchapps/apphelper/website`, que inyecta reCAPTCHA y el contexto Elements de la pasarela alrededor del `GuestForm` del proveedor. Los invitados no tienen inicio de sesión, ni métodos guardados, ni historial. El flujo obtiene `GET /giving/funds/churchId/:id` y `GET /giving/donate/gateways/:churchId` (solo claves públicas), verifica al visitante con `POST /giving/donate/captcha-verify`, tokeniza en el navegador y envía a `/giving/donate/charge` (o `/subscribe`). La llamada de verificación devuelve un `captchaPass` firmado con HMAC válido por 10 minutos (`Api/src/modules/giving/helpers/CaptchaPass.ts`), que el formulario envía con cada llamada de dinero de invitados; con `CAPTCHA_ENFORCE=true`, la API rechaza las llamadas de invitados `create-order`, `charge`, `subscribe`, `addcard` y `ach-setup-intent-anon` que no tengan un pase válido para esa iglesia. El ACH de invitados usa el endpoint anónimo `POST /giving/paymentmethods/ach-setup-intent-anon`, que permite únicamente la verificación instantánea (Financial Connections): una verificación por microdepósitos termina días después, cuando la página del invitado ya no está, así que nunca podría completar el regalo. El formulario se niega a cobrar un SetupIntent no verificado y dirige al donante a la tarjeta o a una configuración bancaria con sesión iniciada.

Tres opciones del formulario de invitados usan la misma llamada de cargo. `?fundId=` y `?amount=` en la URL de donación preseleccionan la división de fondos (los lee el formulario de invitados de cada proveedor al montarse, y pasan por el manejador normal de cambio de fondo para que los totales y las comisiones se actualicen). `anonymous: true` hace que `DonateController.charge` descarte cualquier persona que envíe el cliente y registre el regalo con `personId = null`; el formulario de invitados omite `/people/loadOrCreate` y el paso de cliente/bóveda, y los tres proveedores de registro inmediato dejan de resolver una persona a partir del cliente de la pasarela. Apple Pay necesita que el dominio de la página esté registrado en Stripe, así que un formulario de invitados de Stripe envía una vez por sesión a `POST /giving/donate/register-domain`, público y limitado por frecuencia, que solo acepta un dominio que pertenezca a la iglesia (`<subDomain>.b1.church`, una fila en la tabla de dominios del módulo de contenido, o un host local) antes de llamar a la API de métodos de pago por dominio de Stripe.

### Registro por parte del administrador e importación de Stripe (B1Admin)

La sección de donaciones de B1Admin (`B1Admin/src/donations/`) es donde trabajan los equipos financieros. La captura por lotes (`components/BulkDonationEntry.tsx`) registra regalos en efectivo, cheque o en especie mediante `POST /giving/donations` seguido de `POST /giving/funddonations`, sin intervención de ninguna pasarela. El panel **Log a gift** de la ficha de la persona (`components/LogGiftDialog.tsx`) hace lo mismo para un solo regalo: primero busca el lote cuya `batchDate` coincida con la fecha del regalo, o crea uno con el nombre de esa fecha (`POST /giving/donationbatches`), y elimina la donación y el lote nuevo si un paso posterior falla. Los fondos, lotes, campañas y estados de cuenta se mapean a sus rutas CRUD `/giving/*`; las páginas de estados de cuenta de donaciones (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) solicitan un año calendario con `GET /donations?startDate=&endDate=` y `GET /fundDonations?startDate=&endDate=` en lugar de todo el historial de la iglesia, que podría superar el límite de tamaño de respuesta de Lambda. El panel de donación de estilo miembro (`B1Admin/src/donationComponents/`) reutiliza los mismos componentes de apphelper que B1App.

Los traspasos de contabilidad e informes son trabajo del cliente o del ejecutor de informes, no de la pasarela: la exportación a QuickBooks de la página de lotes genera un CSV de asiento contable a partir de `donations` + `fundDonations` del lote (débito a Undeposited Funds, un crédito por fondo); la vista Lapsed Givers de la página Summary ejecuta `Api/reports/lapsedGivers.json` mediante el ejecutor genérico de informes, con los nombres de personas resueltos por `ReportOutput`; y los formatos de recibos por país (Canadá / Australia / Nueva Zelanda) son configuraciones de la iglesia en el almacén clave-valor de membresía, renderizadas por `GivingStatementDocument` y duplicadas en la página de impresión de B1App. Las páginas de impresión de estados de cuenta de B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) pasan la configuración `logoLight` de la iglesia (mediante `usePrintLogo` en `B1Admin/src/components/PrintChurchHeader.tsx`) para que el logotipo se imprima en la parte superior de cada estado de cuenta, y esperan a que cargue la imagen antes de imprimir automáticamente.

### Estado del lote y el permiso Ingresar donaciones

Los lotes pueden cerrarse para que un depósito contado conserve su estado. `POST /giving/donationbatches/:id/close` y `/:id/reopen` (solo Donations.Edit) son los únicos que escriben `status`, `closedDate` y `closedBy` (`DonationBatchRepo.setStatus`); un guardado normal de lote nunca los toca, de modo que registrar un lote no puede reabrirlo. El acceso de escritura está centralizado en `Api/src/modules/giving/helpers/BatchAccessHelper.ts`: Donations.Edit puede cambiar cualquier cosa, mientras que el permiso más restringido Donations.Enter (`GivingApi` / `Donations` / `Enter`, "Ingresar donaciones" en el editor de roles) puede crear lotes y guardar o eliminar donaciones y divisiones de fondos solo mientras el lote actual de la donación y su lote de destino estén abiertos, y nunca para un regalo de pasarela (uno con `transactionId`). Una escritura bloqueada devuelve `403 { error: "This batch is closed." }`. La lectura de lotes acepta Donations.ViewSummary o Donations.Enter, para que quien cuenta pueda elegir el lote en el que está registrando. En el cliente, `B1Admin/src/donations/batchAccess.ts` replica estas reglas (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`), y `Header` / `SecondaryMenuHelper` muestran **Donations > Batches** a cualquiera que pueda ver lotes, incluso sin View Summary.

### Conversión de totales en monedas mixtas

Cualquier endpoint que devuelva un único total combinado de regalos que pueden estar en monedas mixtas — los KPI de resumen de donaciones (`GivingKpiCards`), el total de un lote de donaciones, el total de un fondo y los totales de año hasta la fecha y de período de la pantalla de donación de B1App — convierte a la moneda predeterminada de la iglesia del lado del servidor, en lugar de sumar monedas distintas. `Api/src/shared/helpers/ExchangeRateHelper.ts` obtiene las tasas de `api.frankfurter.dev` según la moneda de la iglesia, las guarda en caché dentro del proceso durante 12 horas, y expone `convertTotals(rows, churchCurrency, rates)`: las filas se agrupan previamente por moneda en SQL (unos pocos grupos, nunca una conversión por regalo), cada grupo se convierte y se suma, y el resultado lleva una bandera `isConverted` que el cliente usa para mostrar una nota "Converted at current exchange rates". `GET /donations/exchange-rates` expone la tabla de tasas a los clientes que la necesitan (la pantalla de donación de B1App); las tasas nunca se aceptan desde una solicitud, solo se obtienen del lado del servidor, de modo que un cliente no puede influir en un total reportado. Los registros de donaciones individuales y los informes históricos o en la moneda original nunca se convierten: solo se convierten los totales combinados.

La importación de Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) recupera regalos hechos fuera de B1: llama a `POST /giving/donate/replay-stripe-events` con `dryRun: true` para una vista previa, y luego con `dryRun: false` para importar. El servidor lista los eventos de Stripe para el rango de fechas y omite lo que ya está registrado: primero coincide por el id de proveedor en `eventLogs`, luego por id de transacción, y después por `DonationRepo.findMatchingDonation` (monto + fecha + persona), de modo que una nueva ejecución nunca importa dos veces. Los eventos `charge.succeeded` / `payment_intent.succeeded` de suscripciones se omiten porque `invoice.paid` registra esos regalos; las versiones más recientes de la API de Stripe eliminan `PaymentIntent.invoice`, así que la omisión también se basa en la descripción "Subscription …".

## Webhooks y reconciliación

Los pagos liquidados y los cambios de estado de suscripciones llegan a `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). El procesamiento es deliberadamente idempotente:

1. **Verificar** — `GatewayService.verifyWebhook` delega en la verificación de firma del proveedor; una firma fallida devuelve 401. Los eventos que no necesitan procesamiento se resuelven de inmediato con 200.
2. **Deduplicar el evento** — `EventLogRepo.loadByProviderId` omite un webhook que ya está registrado en `eventLogs`.
3. **Deduplicar la donación** — antes de crear nada, `DonationRepo.loadByTransactionId` se verifica contra cada posible id candidato que pueda traer la carga. Esto absorbe entregas duplicadas, eventos ACH de varias etapas (pendiente → liquidado) y el caso en que `/donate/charge` ya registró el regalo de forma optimista.
4. **Aplicar** — `classifyWebhookEvent(eventType)` del proveedor indica qué significa el evento (`donation` pendiente/completo, `cancel-subscription`, o `ignore`); los pagos completados crean una donación `complete` (o promueven una `pending` o `failed` existente), los eventos de estilo ACH se registran como `pending` hasta su liquidación, una factura de suscripción fallida (`invoice.payment_failed` de Stripe) crea una donación `failed` identificada por el id de la factura, y los eventos de cancelación eliminan la fila local de `subscriptions`. El controlador nunca inspecciona los nombres de eventos específicos de cada proveedor.

### Regalos recurrentes fallidos y gestión de cobros

Una donación `failed` es la unidad de trabajo para la recuperación. `GET /giving/donations/failed` las lista con el mensaje de fallo más reciente de la pasarela, tomado de `eventLogs`, y una bandera `canRetry` según las capacidades de la pasarela; `POST /giving/donate/retry/:donationId` llama a `retryFailedPayment` del proveedor (Stripe paga la factura abierta), y el webhook resultante promueve la fila a `complete` mediante la ruta de deduplicación normal. Los correos de cobro se envían al donante desde el manejador de webhooks en el día 0, y luego desde `DunningHelper.run` en el temporizador de medianoche (conectado tanto en `lambda/timer-handler.ts` como en `RailwayCron.ts`) a los 3 y 7 días; cada envío se registra en `eventLogs` como `provider: "dunning"`, `providerId: "<donationId>:<day>"`, de modo que una nueva ejecución nunca envía dos veces el mismo correo. Cuando Stripe se rinde y cancela la suscripción (`customer.subscription.deleted` con `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` envía al donante un correo una sola vez (`providerId: "<subscriptionId>:canceled"`); las cancelaciones iniciadas por el donante o por el administrador permanecen en silencio. Stripe nunca agrega eventos a un endpoint existente: después de cambiar `StripeHelper.webhookEvents`, vuelva a guardar la pasarela o ejecute `tools/manual/stripe-webhook-events.ts` (ejecución de prueba por defecto, `--apply` para escribir) contra producción.

Los proveedores con `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) registran sus cargos a partir de la respuesta de `/charge` (no se necesita un viaje de ida y vuelta por webhook en el caso feliz), mientras que Stripe depende de `payment_intent.succeeded` / `invoice.paid` y de `payment_intent.processing` para ACH. El manejo de comisiones (`POST /giving/donate/fee`, la bandera de pasarela `payFees` y el `calculateFees` de cada proveedor) calcula el "cubrir las comisiones" (incremento bruto) del lado del donante: B1 no cobra ninguna comisión de plataforma, así que nunca se agrega una comisión de aplicación.

:::info
Las rutas de cargo y de webhook escriben las mismas filas de `donations` / `fundDonations`. El `transactionId` es la clave de unión que evita que un registro optimista de cargo y su webhook posterior produzcan dos donaciones para un mismo regalo.
:::

## Páginas relacionadas

- [Endpoints de Giving](../api/endpoints/giving) — superficie REST completa para donaciones, fondos, lotes, pasarelas, suscripciones, métodos de pago y webhooks
- [AppHelper](../shared-libraries/app-helper) — el paquete npm que incluye el registro de proveedores de pago y los componentes de donación
- [Estructura del módulo](../api/module-structure) — cómo se organiza el módulo GivingApi en el servidor
