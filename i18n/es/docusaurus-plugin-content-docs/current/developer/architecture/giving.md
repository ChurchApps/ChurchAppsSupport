---
title: "Arquitectura de Donaciones"
---

# Arquitectura de Donaciones

<div class="article-intro">

ChurchApps ejecuta donaciones en un modelo de carril de puerta: la iglesia mantiene su propia cuenta de Stripe (o PayPal, Kingdom Funding, o Paystack), y B1 nunca se sienta en el camino del dinero como procesador de plataforma. Los datos de tarjeta se tokenizan en el navegador y nunca llegan a un servidor de ChurchApps. Esta página mapea toda la pila — el registro de proveedor del lado del cliente en `@churchapps/apphelper`, la abstracción de puerta de GivingApi, el modelo de datos de donación y cómo los webhooks de puerta se reconcilian de nuevo en la base de datos.

</div>

## Descripción General

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

Tres principios se sostienen en toda la pila:

1. **La puerta sostiene la tarjeta.** El widget de entrada de cada proveedor se tokeniza en el navegador; la API solo recibe un token, nonce o id de orden.
2. **Una abstracción, muchos proveedores.** El navegador resuelve un `PaymentProvider` de un registro; el servidor resuelve un `IGatewayProvider` de una fábrica. Ambos clave desactivado el mismo nombre de proveedor normalizado almacenado en el registro de puerta.
3. **Los webhooks son la fuente de verdad para la liquidación.** Una respuesta de cargo se registra optimistamente, pero el webhook firmado de la puerta es lo que confirma (o crea) la donación completada, con guardias de idempotencia en ambos lados.

## Del lado del cliente: el registro de proveedor de pago (`@churchapps/apphelper`)

El registro vive en `Packages/apphelper/src/donations/providers/`, con los widgets y ayudantes de cada proveedor bajo su propia subcarpeta (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) — nada fuera `providers/` se ramifica en un nombre de proveedor. Un `PaymentProvider` (ver `providers/types.ts`) agrupa todo lo que una aplicación anfitriona necesita para una puerta: un `descriptor` (etiquetas de administrador, monedas compatibles, campos de tarifa, tasas de tarifa predeterminadas, URLs de panel/inscripción), un conjunto de banderas `capabilities` (métodos guardados, ACH, recurrencia, entrada de tarjeta nueva en línea, guardado implícito al tokenizar), los widgets React para entrada de miembro (`MemberWrapper`/`MemberEntry`), donación de invitado (`GuestForm`), edición de método guardado (`MethodEditForm`) y pagos de pregunta de formulario (`FormPayment`), más `buildChargeRequest(ctx, token)` — el único lugar donde la forma de carga de cargo difiere por proveedor. El `MemberWrapper` de cada proveedor carga su propio SDK de la clave pública del registro de puerta, así las aplicaciones anfitriona nunca importan una dependencia de SDK de puerta (B1App y B1Admin no tienen dependencia `@stripe/*`). `pickDefaultGateway(gateways, capability?)` centraliza cuál de las puertas de una iglesia una superficie debe usar.

`providers/registry.ts` sostiene los integrados. Son **referenciados por valor**, no registrados a través de un efecto secundario de módulo, así un agitador de bundler nunca puede caer la inscripción:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Función | Propósito |
|----------|---------|
| `getPaymentProvider(name)` | Resolver por nombre normalizado; recurre a Stripe así un proveedor mal configurado nunca hace un choque duro del donante |
| `registerPaymentProvider(p)` | Registrar un proveedor adicional en tiempo de ejecución (para una puerta personalizada de aplicación anfitriona) |
| `listPaymentProviders()` | Enumerar integrados + personalizado — usado para construir el menú desplegable de puerta de administrador |
| `hasPaymentProvider(name)` | Comprobación de membresía |

**Proveedores de cliente integrados: Stripe, PayPal, Kingdom Funding, Paystack.** B1App y B1Admin solo *leen* el registro (`getPaymentProvider`, `listPaymentProviders`); ninguno llama `registerPaymentProvider` — la inscripción permanece dentro de apphelper.

Cada proveedor se tokeniza diferentemente, pero todos mantienen la tarjeta fuera de B1:

| Proveedor | Widget de entrada | Token devuelto a API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; el formulario de invitado también monta un `ExpressCheckoutElement` (Apple Pay / Google Pay, regalos únicos) cuyo `onConfirm` resuelve al mismo id `pm_…` | id de método de pago (`pm_…`); banco a través de `/paymentmethods/ach-setup-intent` — `us_bank_account` de Conexiones Financieras para puertas USD, PAD canadiense `acss_debit` (modal de mandato alojado, mandato `default_for` facturas/suscripciones, cargos únicos pasan el id de mandato) para puertas CAD |
| Kingdom Funding | Formulario tokenizador alojado con clave pública de puerta | nonce de un solo uso |
| PayPal | Campos Alojados de PayPal (tarjeta, recurrente) más Botones Inteligentes de PayPal con financiación de Venmo (un único tiempo); ambos comparten una carga SDK y el servidor ordena construido vía `/donate/client-token` + `/donate/create-order` | id de orden capturada |
| Paystack | Ventana emergente en línea de Paystack (`js.paystack.co/v2/inline.js`) — la ventana emergente misma toma el pago (tarjeta, dinero móvil, transferencia bancaria, USSD) | referencia de transacción pagada; los métodos guardados son códigos de autorización `AUTH_…` de Paystack |

El `finalizeResult` de Stripe ejecuta 3-D Secure / SCA en el navegador (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) antes de que se considere que la donación se complete; el formulario compartido solo llama `provider.finalizeResult(result)` sin conocimiento de lo que hace.

## Del lado del servidor: la abstracción de puerta (GivingApi)

El módulo `/giving` (`Api/src/modules/giving`) expone la superficie REST; la fontanería de la puerta vive en `Api/src/shared/helpers`. `DonateController` nunca habla directamente a un SDK de puerta — va a través de `GatewayService`, que resuelve el `IGatewayProvider` correcto de `GatewayFactory` y le pasa un `GatewayConfig` desencriptado.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) es el contrato que cada puerta implementa — ciclo de vida de webhook (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), pago (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), tarifas (`calculateFees`), manejo de método guardado (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) y extras opcionales (clientes, órdenes, SetupIntents, repetición de evento, `retryFailedPayment` para una factura de suscripción fallida, `registerPaymentMethodDomain` para verificación de dominio de Apple Pay). Un proveedor que omite un gancho opcional se reporta como no compatible para esa acción y la interfaz de usuario oculta el control. Cada clase de proveedor declara su propia matriz `capabilities` (monedas compatibles, ACH, reembolsos, requisitos de suscripción, límites de transacción) — `GatewayService.getProviderCapabilities(provider)` simplemente lo lee — y banderas como `logsDonationsImmediately` impulsan el comportamiento del controlador sin ningún condicional de nombre de proveedor en los controladores.

**Proveedores de servidor registrados en `GatewayFactory`:**

| Proveedor | Disponibilidad |
|----------|-------------|
| Stripe | Siempre activado |
| PayPal | Siempre activado |
| Kingdom Funding | Siempre activado |
| Paystack | Siempre activado (Nigeria, Ghana, Sudáfrica, Kenia, comerciantes de Côte d'Ivoire; monedas NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Optar por activar a través de la bandera de entorno `ENABLE_SQUARE` |
| ePayMints | Optar por activar a través de la bandera de entorno `ENABLE_EPAYMINTS` |

Paystack difiere de los otros en que el dinero se mueve antes de que GivingApi esté involucrado: la ventana emergente cobra al donante, `processCharge` es un `GET /transaction/verify/:reference` cuyo importe pagado y moneda deben coincidir con la donación registrada (una referencia ya en archivo nunca se registra dos veces), y el primer regalo de un programa recurrente se registra desde `finalizeSubscription` (verificar → `POST /plan` → `POST /subscription` con `start_date` un intervalo fuera). Los webhooks están firmados con la clave secreta misma (`x-paystack-signature`, HMAC-SHA512 sobre el cuerpo crudo) y Paystack no tiene API de gestión de webhook, así la pantalla de administrador muestra la URL para que la iglesia la pegue en su panel. Los eventos de renovación `charge.success` no llevan división de fondo; el proveedor la recupera de las filas locales `subscriptions`/`subscriptionFunds` del donante. Solo las autorizaciones de tarjeta son `reutilizables` — los regalos de dinero móvil son un único tiempo solamente, así `createSubscription` los rechaza. Los datos de demostración siembran una segunda iglesia (Accra Community Church, `CHU00000002`) en una puerta Paystack de modo de prueba GHS así la suite de Playwright de Paystack funciona junto a uno de Grace de Stripe.

Los proveedores personalizados se pueden registrar en tiempo de ejecución cuando `ENABLE_CUSTOM_GATEWAY_PROVIDERS` está establecido; `AbstractExperimentalGatewayProvider` es la clase base para esos. Los nombres de proveedor se comparan sin distinción de mayúsculas.

### Configuración de puerta y secretos

Un administrador guarda credenciales de puerta vía `POST /giving/gateways` (`GatewayController`). Al guardar el controlador encripta las claves privadas y webhook con `EncryptionHelper` antes de persistir, luego — en cualquier anfitrión no localhost — elimina el webhook existente de la iglesia y proporciona uno nuevo apuntado a `/giving/donate/webhook/{provider}?churchId=…`. Una iglesia mantiene una fila por proveedor: guardar una puerta reemplaza solo la fila existente para ese mismo proveedor. Las lecturas públicas (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) devuelven solo claves públicas.

## Modelo de datos

El esquema de donación (`Api/src/modules/giving/db/DatabaseTypes.ts`, modelos en `models/`) es un esquema MySQL accedido a través de Kysely:

| Tabla | Rol |
|-------|------|
| `gateways` | Configuración de proveedor por iglesia: `provider`, `publicKey`, `privateKey`/`webhookKey` encriptado, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Designaciones de donación (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Agrupación para entrada/informes (`name`, `batchDate`) |
| `donations` | Un regalo: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; estados, totales, paneles e informes de donación cuentan solo `complete` o nulo), `transactionId` |
| `fundDonations` | Asignación de una donación a través de uno o más fondos (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Regalo recurrente; `id` es el id de suscripción de la puerta, vinculado a `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | División de fondo para un regalo recurrente |
| `customers` | Vincula un `personId` a su id de cliente de puerta, por `provider` |
| `gatewayPaymentMethods` | Tarjetas/bancos guardados: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Webhook/evento auditora y clave dedup (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Campañas de promesa vinculadas a un fondo, y el importe prometido de cada persona |

Una donación se divide en fondos a través de `fundDonations` — la donación lleva el total, cada `fundDonation` lleva una porción. `donations.currency` y `gateways.currency` llevan la moneda ISO; cada proveedor anuncia su `supportedCurrencies`, y los montos se formatea con `CurrencyHelper.formatCurrencyWithLocale`.

## Flujos de extremo a extremo

### Miembro una única vez y recurrente (B1App)

La pantalla de donación autenticada (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) compone tres componentes de apphelper: `MultiGatewayDonationForm`, `PaymentMethods` y `RecurringDonations`. B1App hace la carga de datos circundante — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — y pasa la lista de puerta a través; el proveedor resuelto carga su propio SDK de la clave pública de la puerta. El cargo mismo sucede dentro de apphelper: el proveedor resuelto tokeniza el método (nuevo o guardado), luego publica a `/giving/donate/charge` para un regalo único o `/giving/donate/subscribe` para uno recurrente. Ambos extremos atribuyen un donante conectado a su propio `personId` (solo los titulares `donations.edit` pueden atribuir a otra persona) y rechazan divisiones de fondo que suman más que el importe cargado. Los regalos recurrentes crean una fila `subscriptions` más `subscriptionFunds` y entregan el programa a la puerta (Suscripciones de Stripe, Planes de Facturación de PayPal o un programa recurrente KF).

### Donación de invitado / anónima

La página de donación pública (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) y el panel "donar ahora" renderizan `NonAuthDonationWrapper` de `@churchapps/apphelper/website`, que inyecta reCAPTCHA y el contexto de Elementos de la puerta alrededor del `GuestForm` del proveedor. Los invitados no obtienen inicio de sesión, métodos guardados ni historial. El flujo obtiene `GET /giving/funds/churchId/:id` y `GET /giving/donate/gateways/:churchId` (solo claves públicas), verifica al visitante con `POST /giving/donate/captcha-verify`, tokeniza en el navegador y publica a `/giving/donate/charge` (o `/subscribe`). ACH de invitado usa el anónimo `POST /giving/paymentmethods/ach-setup-intent-anon`.

Tres opciones de formulario de invitado van en la misma llamada de cargo. `?fundId=` y `?amount=` en la URL de donación preseleccionan la división de fondo (leída por el formulario de invitado de cada proveedor al montar, enrutada a través del manipulador de cambio de fondo normal así totales y tarifas actualizar). `anonymous: true` hace que `DonateController.charge` descarte cualquier persona que el cliente envió y registre el regalo con `personId = null`; el formulario de invitado salta `/people/loadOrCreate` y el paso de cliente/bóveda, y los tres proveedores de registro inmediato paran resolviendo una persona del cliente de puerta. Apple Pay necesita el dominio de la página registrado con Stripe, así un formulario de invitado de Stripe publica una vez por sesión al público, limitado por velocidad `POST /giving/donate/register-domain`, que solo acepta un dominio que pertenece a la iglesia (`<subDomain>.b1.church`, una fila en la tabla de dominios del módulo de contenido, u un anfitrión local) antes de llamar a API de dominios de método de pago de Stripe.

### Grabación de administrador e importación de Stripe (B1Admin)

La sección de donaciones de B1Admin (`B1Admin/src/donations/`) es donde los equipos de finanzas trabajan. Entrada de lote (`components/BulkDonationEntry.tsx`) registra regalos en efectivo/cheque/en especie publicando `/giving/donations` entonces `/giving/funddonations` — ninguna puerta involucrada. Fondos, lotes, campañas e estados cada mapeo a sus rutas CRUD `/giving/*`. El panel de donación de estilo de miembro (`B1Admin/src/donationComponents/`) reutiliza los mismos componentes de apphelper que B1App.

Los informes y traspaso contable son trabajo del lado del cliente o del corredor de informes, no trabajo de puerta: la exportación de QuickBooks de la página de lote construye un CSV de entrada de diario de las `donations` + `fundDonations` del lote (débito Fondos No Depositados, un crédito por fondo), la pestaña Donantes Caídos ejecuta `Api/reports/lapsedGivers.json` a través del corredor de informes genérico con nombres de persona resueltos por `ReportOutput`, y los formatos de recepción de país (Canadá / Australia / Nueva Zelanda) son configuraciones de iglesia en la tienda clave/valor de membresía renderizada por `GivingStatementDocument` y duplicada en la página de impresión de B1App.

### Conversión de totales de moneda mixta

Cualquier extremo que devuelva un total combinado único en todas las donaciones posiblemente de moneda mixta — los KPIs de resumen de donación (`GivingKpiCards`), un total de lote de donación, un total de fondo y el total de año a fecha/período de la pantalla de donación de B1App — convierte a la moneda predeterminada de la iglesia del lado del servidor en lugar de sumar monedas distintas. `Api/src/shared/helpers/ExchangeRateHelper.ts` obtiene tasas de `api.frankfurter.dev` con clave por moneda de iglesia, las cachea en el proceso durante 12 horas y expone `convertTotals(rows, churchCurrency, rates)`: las filas se agrupan previamente por moneda en SQL (un puñado de grupos, nunca una conversión por regalo), cada grupo se convierte y suma, y el resultado lleva una bandera `isConverted` que el cliente usa para mostrar una nota "Convertido a tasas de cambio actuales". Los registros de donación individual e informes históricos/de moneda original nunca se convierten — solo los totales combinados lo son.

La importación de Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) rellena regalos hechos fuera de B1: llama `POST /giving/donate/replay-stripe-events` con `dryRun: true` para una vista previa, luego `dryRun: false` para importar. El servidor enumera eventos de Stripe para el rango de fechas y salta cualquier cosa ya registrada — equiparada primero por id de proveedor `eventLogs`, luego por `DonationRepo.findMatchingDonation` (importe + fecha + persona) así una re-ejecución nunca importa doble.

## Webhooks y reconciliación

Los pagos liquidados y cambios de estado de suscripción llegan a `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). El procesamiento es deliberadamente idempotente:

1. **Verificar** — `GatewayService.verifyWebhook` delega a la comprobación de firma del proveedor; una firma fallida devuelve 401. Los eventos que no necesitan procesamiento se cortocircuitan con 200.
2. **Dedup el evento** — `EventLogRepo.loadByProviderId` salta un webhook ya registrado en `eventLogs`.
3. **Dedup la donación** — antes de crear cualquier cosa, `DonationRepo.loadByTransactionId` se verifica contra cada id candidato que la carga pueda llevar. Esto absorbe entregas duplicadas, eventos ACH de múltiples etapas (pendiente → liquidado) y el caso donde `/donate/charge` ya registró el regalo optimistamente.
4. **Aplicar** — el `classifyWebhookEvent(eventType)` del proveedor dice lo que significa el evento (donación `pending`/`complete`, `cancel-subscription` o `ignore`); los pagos completados crean una donación `complete` (o promueven un `pending` o `failed` existente), los eventos de estilo ACH aterrizan como `pending` hasta la liquidación, una factura de suscripción fallida (Stripe `invoice.payment_failed`) crea una donación `failed` con clave en el id de factura, y los eventos de cancelación eliminan la fila local `subscriptions`. El controlador nunca inspecciona nombres de evento específicos del proveedor.

### Regalos recurrentes fallidos y cobranza

Una donación `failed` es la unidad de trabajo para recuperación. `GET /giving/donations/failed` los enumera con el mensaje de falla de puerta más nuevo de `eventLogs` y una bandera `canRetry` de las capacidades de la puerta; `POST /giving/donate/retry/:donationId` llama el `retryFailedPayment` del proveedor (Stripe paga la factura abierta), y el webhook resultante promueve la fila a `complete` a través de la ruta de dedup normal. Los correos electrónicos de cobranza van al donante desde el manipulador de webhook en el día 0, luego desde `DunningHelper.run` en el temporizador de medianoche (conectado tanto en `lambda/timer-handler.ts` como `RailwayCron.ts`) en los días 3 y 7; cada envío se registra en `eventLogs` como `provider: "dunning"`, `providerId: "<donationId>:<day>"`, así una re-ejecución nunca envía correos dos veces. Cuando Stripe se rinde y cancela la suscripción (`customer.subscription.deleted` con `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` envía correo electrónico al donante una vez (`providerId: "<subscriptionId>:canceled"`); los cancelados del donante o administrador permanecen silenciosos. Stripe nunca agrega eventos a un extremo existente: después de cambiar `StripeHelper.webhookEvents`, ya sea vuelve a guardar la puerta o ejecuta `tools/manual/stripe-webhook-events.ts` (ejecución seca por defecto, `--apply` para escribir) contra prod.

Los proveedores con `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) tienen sus cargos registrados desde la respuesta `/charge` (ninguna ronda de webhook requerida para la ruta feliz), mientras Stripe se basa en `payment_intent.succeeded` / `invoice.paid` y ACH `payment_intent.processing`. El manejo de tarifas (`POST /giving/donate/fee`, la bandera de puerta `payFees` y el `calculateFees` de cada proveedor) calcula el aumento bruto de "cubrir las tarifas" del lado del donante — B1 no toma corte de plataforma, así ninguna tarifa de aplicación nunca se agrega.

:::info
Las rutas de cargo y webhook escriben las mismas filas `donations` / `fundDonations`. El `transactionId` es la clave de unión que mantiene un registro de cargo optimista y su webhook posterior de producir dos donaciones para un regalo.
:::

## Páginas Relacionadas

- [Extremos de Donación](../api/endpoints/giving) — superficie REST completa para donaciones, fondos, lotes, puertas, suscripciones, métodos de pago y webhooks
- [AppHelper](../shared-libraries/app-helper) — el paquete npm que envía el registro de proveedor de pago y componentes de donación
- [Estructura del Módulo](../api/module-structure) — cómo se organiza el módulo GivingApi del lado del servidor

