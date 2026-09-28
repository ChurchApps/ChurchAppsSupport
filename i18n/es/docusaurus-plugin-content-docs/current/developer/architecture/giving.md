---
title: "Arquitectura de Donaciones"
---

# Arquitectura de Donaciones

<div class="article-intro">

ChurchApps ejecuta donaciones con un modelo de puerta de enlace: la iglesia mantiene su propia cuenta Stripe (o PayPal, Kingdom Funding, o Paystack), y B1 nunca se interpone en el flujo de dinero como procesador de plataforma. Los datos de la tarjeta se tokenizan en el navegador y nunca llegan a un servidor de ChurchApps. Esta página mapea toda la pila: el registro de proveedores del lado del cliente en `@churchapps/apphelper`, la abstracción de puerta de enlace GivingApi, el modelo de datos de donaciones, y cómo los webhooks de puerta de enlace se reconcilian con la base de datos.

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

Tres principios se mantienen en toda la pila:

1. **La puerta de enlace guarda la tarjeta.** El widget de entrada de cada proveedor se tokeniza en el navegador; la API solo recibe un token, nonce, o id de orden.
2. **Una abstracción, muchos proveedores.** El navegador resuelve un `PaymentProvider` desde un registro; el servidor resuelve un `IGatewayProvider` desde una fábrica. Ambos se basan en el mismo nombre de proveedor normalizado almacenado en el registro de puerta de enlace.
3. **Los webhooks son la fuente de verdad para la liquidación.** Una respuesta de cargo se registra de forma optimista, pero el webhook firmado de la puerta de enlace es lo que confirma (o crea) la donación completada, con protecciones de idempotencia en ambos lados.

## Lado del cliente: el registro de proveedores de pago (`@churchapps/apphelper`)

El registro vive en `Packages/apphelper/src/donations/providers/`, con los widgets y ayudas de cada proveedor bajo su propia subcarpeta (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) — nada fuera de `providers/` se ramifica en un nombre de proveedor. Un `PaymentProvider` (ver `providers/types.ts`) agrupa todo lo que una aplicación host necesita para una puerta de enlace: un `descriptor` (etiquetas de administrador, monedas admitidas, campos de tarifa, tasas de tarifa predeterminadas, URLs de panel/registro), un conjunto de banderas `capabilities` (tarjetas guardadas, ACH, recurrente, entrada de tarjeta nueva en línea, guardado implícito al tokenizar), los widgets React para entrada de miembros (`MemberWrapper`/`MemberEntry`), donaciones de invitados (`GuestForm`), edición de método guardado (`MethodEditForm`), y pagos de preguntas de formulario (`FormPayment`), más `buildChargeRequest(ctx, token)` — el único lugar donde la forma de carga difiere por proveedor. Cada `MemberWrapper` de proveedor carga su propio SDK desde la clave pública del registro de puerta de enlace, por lo que las aplicaciones host nunca importan un SDK de puerta de enlace (B1App y B1Admin no tienen dependencia `@stripe/*`). `pickDefaultGateway(gateways, capability?)` centraliza cuál de las puertas de enlace de una iglesia debe usar una superficie.

`providers/registry.ts` contiene los incorporados. Son **referencias por valor**, no registrados a través de un efecto secundario de módulo, por lo que el tree-shaking de un empaquetador nunca puede soltar el registro:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Función | Propósito |
|----------|---------|
| `getPaymentProvider(name)` | Resolver por nombre normalizado; recurre a Stripe para que un proveedor mal configurado nunca bloquee duramente el formulario de donante |
| `registerPaymentProvider(p)` | Registrar un proveedor adicional en tiempo de ejecución (para una puerta de enlace personalizada de una aplicación host) |
| `listPaymentProviders()` | Enumerar incorporados + personalizados — usado para construir el menú desplegable de puerta de enlace de administrador |
| `hasPaymentProvider(name)` | Verificación de pertenencia |

**Proveedores de cliente incorporados: Stripe, PayPal, Kingdom Funding, Paystack.** B1App y B1Admin solo *leen* el registro (`getPaymentProvider`, `listPaymentProviders`); ninguno llama a `registerPaymentProvider` — el registro permanece dentro de apphelper.

Cada proveedor tokeniza diferente, pero todos mantienen la tarjeta fuera de B1:

| Proveedor | Widget de entrada | Token devuelto a API |
|----------|--------------|-----------------------|
| Stripe | `CardElement` de Stripe `Elements` → `stripe.createPaymentMethod(...)`; el formulario de invitados también monta un `ExpressCheckoutElement` (Apple Pay / Google Pay, regalos únicos) cuyo `onConfirm` se resuelve al mismo id `pm_…` | id de método de pago (`pm_…`); banco a través de `/paymentmethods/ach-setup-intent` — `us_bank_account` de Financial Connections para puertas de enlace USD, PAD canadiense `acss_debit` (modal de mandato alojado, mandato `default_for` facturas/suscripciones, cargos únicos pasan el id de mandato) para puertas de enlace CAD |
| Kingdom Funding | Formulario de tokenizador alojado con clave por la clave pública de puerta de enlace | nonce de un solo uso |
| PayPal | Campos alojados de PayPal (tarjeta, recurrente) más Botones inteligentes de PayPal con financiamiento de Venmo (uno-a-la-vez); ambos comparten una carga de SDK y el orden del servidor construido a través de `/donate/client-token` + `/donate/create-order` | id de orden capturado |
| Paystack | Elemento emergente en línea de Paystack (`js.paystack.co/v2/inline.js`) — el elemento emergente en sí toma el pago (tarjeta, dinero móvil, transferencia bancaria, USSD) | referencia de transacción pagada; los métodos guardados son códigos de autorización `AUTH_…` de Paystack |

El `finalizeResult` de Stripe ejecuta 3-D Secure / SCA en el navegador (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) antes de que se considere completada la donación; el formulario compartido simplemente llama a `provider.finalizeResult(result)` sin conocimiento de lo que hace.

## Lado del servidor: la abstracción de puerta de enlace (GivingApi)

El módulo `/giving` (`Api/src/modules/giving`) expone la superficie REST; la plomería de puerta de enlace vive en `Api/src/shared/helpers`. `DonateController` nunca habla directamente con un SDK de puerta de enlace — va a través de `GatewayService`, que resuelve el `IGatewayProvider` correcto desde `GatewayFactory` y le entrega un `GatewayConfig` descifrado.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) es el contrato que implementa cada puerta de enlace — ciclo de vida de webhook (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), pago (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), tarifas (`calculateFees`), manejo de métodos guardados (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), y extras opcionales (clientes, órdenes, SetupIntents, reproducción de eventos, `retryFailedPayment` para una factura de suscripción fallida, `registerPaymentMethodDomain` para verificación de dominio de Apple Pay). Un proveedor que omite un gancho opcional se reporta como no compatible para esa acción y la interfaz de usuario oculta el control. Cada clase de proveedor declara su propia matriz `capabilities` (monedas admitidas, ACH, reembolsos, requisitos de suscripción, límites de transacción) — `GatewayService.getProviderCapabilities(provider)` simplemente lo lee — y banderas como `logsDonationsImmediately` conducen el comportamiento del controlador sin condicionales de nombre de proveedor en los controladores.

**Proveedores del servidor registrados en `GatewayFactory`:**

| Proveedor | Disponibilidad |
|----------|-------------|
| Stripe | Siempre encendido |
| PayPal | Siempre encendido |
| Kingdom Funding | Siempre encendido |
| Paystack | Siempre encendido (comerciantes de Nigeria, Ghana, Sudáfrica, Kenia, Costa de Marfil; monedas NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Opt-in a través de la bandera de entorno `ENABLE_SQUARE` |
| ePayMints | Opt-in a través de la bandera de entorno `ENABLE_EPAYMINTS` |

Paystack se diferencia de los otros en que el dinero se mueve antes de que GivingApi esté involucrado: el elemento emergente cobra al donante, `processCharge` es un `GET /transaction/verify/:reference` cuyo monto pagado y moneda deben coincidir con la donación que se registra (una referencia ya en archivo nunca se registra dos veces), y el primer regalo de un cronograma recurrente se registra desde `finalizeSubscription` (verificar → `POST /plan` → `POST /subscription` con `start_date` un intervalo adelante). Los webhooks se firman con la clave secreta en sí (`x-paystack-signature`, HMAC-SHA512 sobre el cuerpo sin procesar) y Paystack no tiene API de gestión de webhook, por lo que la pantalla de administrador muestra la URL para que la iglesia pegue en su panel. Los eventos de renovación `charge.success` no llevan división de fondo; el proveedor la recupera de las filas locales `subscriptions`/`subscriptionFunds` del donante. Solo las autorizaciones de tarjeta son `reusable` — los regalos de dinero móvil son de un solo uso, por lo que `createSubscription` los rechaza. Los datos de demostración siembran una segunda iglesia (Accra Community Church, `CHU00000002`) en una puerta de enlace GHS en modo de prueba de Paystack para que la suite de Playwright de Paystack se ejecute al lado de la de Grace en Stripe.

Los proveedores personalizados se pueden registrar en tiempo de ejecución cuando se establece `ENABLE_CUSTOM_GATEWAY_PROVIDERS`; `AbstractExperimentalGatewayProvider` es la clase base para esos. Los nombres de proveedores se coinciden sin distinguir mayúsculas de minúsculas.

### Configuración de puerta de enlace y secretos

Un administrador guarda las credenciales de puerta de enlace a través de `POST /giving/gateways` (`GatewayController`). Al guardar, el controlador cifra las claves privadas y de webhook con `EncryptionHelper` antes de persistir, luego — en cualquier host que no sea localhost — elimina el webhook existente de la iglesia y proporciona uno nuevo apuntando a `/giving/donate/webhook/{provider}?churchId=…`. Una iglesia mantiene una fila por proveedor: guardar una puerta de enlace reemplaza solo la fila existente para ese mismo proveedor. Las lecturas públicas (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) devuelven solo claves públicas.

## Modelo de datos

El esquema de donaciones (`Api/src/modules/giving/db/DatabaseTypes.ts`, modelos en `models/`) es un esquema MySQL accedido a través de Kysely:

| Tabla | Rol |
|-------|------|
| `gateways` | Configuración de proveedor por iglesia: `provider`, `publicKey`, `privateKey`/`webhookKey` cifrado, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Designaciones de donación (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Agrupamiento para entrada/informe (`name`, `batchDate`) |
| `donations` | Un regalo: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; estados, totales, paneles e informes de donación cuentan solo `complete` o null), `transactionId` |
| `fundDonations` | Asignación de una donación en uno o más fondos (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Regalo recurrente; `id` es el id de suscripción de la puerta de enlace, vinculado a `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | División de fondo para un regalo recurrente |
| `customers` | Vincula un `personId` a su id de cliente de puerta de enlace, por `provider` |
| `gatewayPaymentMethods` | Tarjetas/bancos guardados: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Pista de auditoría de webhook/evento y clave de dedup (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Campañas de promesas vinculadas a un fondo, y el monto prometido de cada persona |

Una donación se divide entre fondos a través de `fundDonations` — la donación lleva el total, cada `fundDonation` lleva una porción. `donations.currency` y `gateways.currency` llevan la moneda ISO; cada proveedor anuncia sus `supportedCurrencies`, y los montos se formatean con `CurrencyHelper.formatCurrencyWithLocale`.

## Flujos de extremo a extremo

### Miembro uno-a-la-vez y recurrente (B1App)

La pantalla de donación autenticada (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) compone tres componentes apphelper: `MultiGatewayDonationForm`, `PaymentMethods`, y `RecurringDonations`. B1App hace la carga de datos circundante — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — y pasa la lista de puertas de enlace; el proveedor resuelto carga su propio SDK desde la clave pública de la puerta de enlace. El cargo en sí sucede dentro de apphelper: el proveedor resuelto tokeniza el método (nuevo o guardado), luego publica a `/giving/donate/charge` para un regalo único o `/giving/donate/subscribe` para uno recurrente. Ambos puntos finales atribuyen un donante firmado al `personId` propio (solo los titulares de `donations.edit` pueden atribuir a otro) y rechazan divisiones de fondo que sumen más que el monto cobrado. Los regalos recurrentes crean una fila `subscriptions` más `subscriptionFunds` y entregan el cronograma a la puerta de enlace (Stripe Subscriptions, PayPal Billing Plans, o un cronograma recurrente KF).

### Donación de invitado / anónima

La página de donación pública (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) y el panel "dar ahora" renderizan `NonAuthDonationWrapper` desde `@churchapps/apphelper/website`, que inyecta reCAPTCHA y el contexto Elements de la puerta de enlace alrededor del `GuestForm` del proveedor. Los invitados no reciben inicio de sesión, sin métodos guardados e sin historial. El flujo obtiene `GET /giving/funds/churchId/:id` y `GET /giving/donate/gateways/:churchId` (solo claves públicas), verifica el visitante con `POST /giving/donate/captcha-verify`, tokeniza en el navegador, y publica a `/giving/donate/charge` (o `/subscribe`). ACH de invitado usa el anónimo `POST /giving/paymentmethods/ach-setup-intent-anon`.

Tres opciones de formulario de invitado se montan en la misma llamada de cargo. `?fundId=` y `?amount=` en la URL de donación preseleccionan la división de fondo (leída por el formulario de invitado de cada proveedor en el montaje, enrutada a través del controlador de cambio de fondo normal para que totales y tarifas se actualicen). `anonymous: true` hace que `DonateController.charge` descarte cualquier persona que el cliente envíe e registre el regalo con `personId = null`; el formulario de invitado omite `/people/loadOrCreate` y el paso de cliente/bóveda, y los tres proveedores de registro inmediato dejan de resolver una persona desde el cliente de puerta de enlace. Apple Pay necesita que el dominio de la página se registre con Stripe, por lo que un formulario de invitado Stripe publica una vez por sesión al `POST /giving/donate/register-domain` público y con límite de velocidad, que solo acepta un dominio que pertenezca a la iglesia (`<subDomain>.b1.church`, una fila en la tabla de dominios del módulo de contenido, o un host local) antes de llamar a la API de dominios de método de pago de Stripe.

### Grabación de administrador e importación de Stripe (B1Admin)

La sección de donaciones B1Admin (`B1Admin/src/donations/`) es donde los equipos de finanzas trabajan. Entrada por lotes (`components/BulkDonationEntry.tsx`) registra regalos en efectivo/cheque/en especie publicando `/giving/donations` luego `/giving/funddonations` — sin puerta de enlace involucrada. Fondos, lotes, campañas, e informes se mapean cada uno a sus rutas CRUD `/giving/*`. El panel de donación de estilo miembro (`B1Admin/src/donationComponents/`) reutiliza los mismos componentes apphelper que B1App.

Los informes y entregas de contabilidad son trabajo del lado del cliente o corredor de informes, no trabajo de puerta de enlace: el CSV de exportación de QuickBooks de la página de lote construye una entrada de diario desde las `donations` + `fundDonations` del lote (débito Fondos no depositados, un crédito por fondo), la pestaña Donantes caducos ejecuta `Api/reports/lapsedGivers.json` a través del corredor de informe genérico con nombres de persona resueltos por `ReportOutput`, y los formatos de recepción de país (Canadá / Australia / Nueva Zelanda) son configuraciones de iglesia en el almacén de pares clave/valor de membresía renderizado por `GivingStatementDocument` y duplicado en la página de impresión B1App.

### Conversión de totales de moneda mixta

Cualquier punto final que devuelva un total único combinado en posibles regalos de moneda mixta — los KPI del resumen de donación (`GivingKpiCards`), un total de lote de donación, un total de fondo, y los totales año-a-la-fecha/período de la pantalla de donación B1App — convierte a la moneda predeterminada de la iglesia del lado del servidor en lugar de sumar monedas diferentes. `Api/src/shared/helpers/ExchangeRateHelper.ts` obtiene tasas de `api.frankfurter.dev` con clave de la moneda de la iglesia, las almacena en caché en-proceso durante 12 horas, y expone `convertTotals(rows, churchCurrency, rates)`: las filas se agrupan previamente por moneda en SQL (un puñado de grupos, nunca una conversión por regalo), cada grupo se convierte y suma, y el resultado lleva una bandera `isConverted` que el cliente usa para mostrar una nota "Convertido a tasas de cambio actuales". `GET /donations/exchange-rates` expone la tabla de tasas a clientes que la necesitan (pantalla de donación B1App); las tasas en sí nunca se aceptan de una solicitud, solo se obtienen del lado del servidor, por lo que un cliente no puede influir en un total reportado. Los registros de donación individual y los informes históricos/moneda original nunca se convierten — solo los totales combinados son.

La importación de Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) rellena regalos realizados fuera de B1: llama a `POST /giving/donate/replay-stripe-events` con `dryRun: true` para una vista previa, luego `dryRun: false` para importar. El servidor enumera eventos de Stripe para el rango de fechas y omite cualquier cosa ya registrada — coincidida primero por id de proveedor `eventLogs`, luego por `DonationRepo.findMatchingDonation` (monto + fecha + persona) para que una re-ejecución nunca importe dos veces.

## Webhooks y reconciliación

Los pagos liquidados y los cambios de estado de suscripción llegan a `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). El procesamiento es deliberadamente idempotente:

1. **Verificar** — `GatewayService.verifyWebhook` delega la verificación de firma del proveedor; una firma fallida devuelve 401. Los eventos que no necesitan procesamiento se cortan con 200.
2. **Dedup el evento** — `EventLogRepo.loadByProviderId` omite un webhook ya registrado en `eventLogs`.
3. **Dedup la donación** — antes de crear cualquier cosa, `DonationRepo.loadByTransactionId` se verifica contra cada id candidato que el payload podría llevar. Esto absorbe entregas duplicadas, eventos ACH de múltiples etapas (pendiente → liquidado), y el caso donde `/donate/charge` ya registró el regalo de forma optimista.
4. **Aplicar** — el `classifyWebhookEvent(eventType)` del proveedor dice qué significa el evento (`donation` pendiente/completo, `cancel-subscription`, o `ignore`); los pagos completados crean una donación `complete` (o promueven una existente `pending` o `failed`), los eventos de estilo ACH aterrizan como `pending` hasta liquidación, una factura de suscripción fallida (Stripe `invoice.payment_failed`) crea una donación `failed` con clave en el id de factura, y los eventos de cancelación eliminan la fila local `subscriptions`. El controlador nunca inspecciona nombres de eventos específicos del proveedor.

### Regalos recurrentes fallidos y recuperación de deuda

Una donación `failed` es la unidad de trabajo para recuperación. `GET /giving/donations/failed` las enumera con el mensaje de falla de puerta de enlace más nuevo desde `eventLogs` y una bandera `canRetry` de las capacidades de la puerta de enlace; `POST /giving/donate/retry/:donationId` llama al `retryFailedPayment` del proveedor (Stripe paga la factura abierta), y el webhook resultante promueve la fila a `complete` a través del camino de dedup normal. Los correos de recuperación de deuda van al donante desde el controlador de webhook en el día 0, luego desde `DunningHelper.run` en el temporizador de medianoche (cableado tanto en `lambda/timer-handler.ts` como en `RailwayCron.ts`) en los días 3 y 7; cada envío se registra en `eventLogs` como `provider: "dunning"`, `providerId: "<donationId>:<day>"`, para que una re-ejecución nunca envíe por correo dos veces. Los puntos finales de webhook de Stripe creados antes de esta característica no se suscriben a `invoice.payment_failed`; re-guardar la puerta de enlace proporciona un punto final fresco con el evento.

Los proveedores con `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) tienen sus cargos registrados desde la respuesta `/charge` (sin viaje de webhook requerido para el camino feliz), mientras que Stripe depende de `payment_intent.succeeded` / `invoice.paid` y ACH `payment_intent.processing`. El manejo de tarifas (`POST /giving/donate/fee`, la bandera de puerta de enlace `payFees`, y el `calculateFees` de cada proveedor) computa la majoración bruta de "cubrir las tarifas" en el lado del donante — B1 no toma ningún corte de plataforma, por lo que nunca se agrega una tarifa de aplicación.

:::info
Los caminos de cargo y webhook escriben las mismas filas `donations` / `fundDonations`. El `transactionId` es la clave de unión que mantiene un registro de cargo optimista y su webhook posterior sin producir dos donaciones para un regalo.
:::

## Páginas relacionadas

- [Giving Endpoints](../api/endpoints/giving) — superficie REST completa para donaciones, fondos, lotes, puertas de enlace, suscripciones, métodos de pago, y webhooks
- [AppHelper](../shared-libraries/app-helper) — el paquete npm que envía el registro de proveedores de pago y componentes de donación
- [Module Structure](../api/module-structure) — cómo se organiza el módulo GivingApi del lado del servidor
