---
title: "Arquitectura de Donaciones"
---

# Arquitectura de Donaciones

<div class="article-intro">

ChurchApps ejecuta donaciones en un modelo de carril de puerta de enlace: la iglesia mantiene su propia cuenta de Stripe (o PayPal, o Kingdom Funding), y B1 nunca se sienta en la ruta del dinero como procesador de plataforma. Los datos de la tarjeta se tokenizados en el navegador y nunca llegan a un servidor de ChurchApps. Esta página mapea toda la pila — el registro del proveedor de pago del lado del cliente en `@churchapps/apphelper`, la abstracción de puerta de enlace de GivingApi, el modelo de datos de donación, y cómo los webhooks de la puerta de enlace se reconcilian de vuelta a la base de datos.

</div>

## Descripción General

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (navegador)│                   │  Puerta de enlace de pago             │
│                             │                   │  (Stripe / PayPal / Kingdom Funding)  │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ entrada de tarjeta│  Stripe Elements · tokenizador KF ·  │
│  │ Registro de proveedor │──┼──────────────────▶│  PayPal Hosted Fields                │
│  │ de pago               │  │◀── token / nonce ─│  (la tarjeta nunca alcanza servidor B1)│
│  │ getPaymentProvider()  │  │                   └──────────▲────────────────┬───────────┘
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge / subscribe│                │
┌─────────────────────────────────────────────┐ (clave secreta)               │
│  GivingApi — módulo /giving                 │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donaciones · fondos · suscripciones · …   │  evento webhook firmado
└─────────────────────┬───────────────────────┘  POST /giving/donate/webhook/:provider
                      │  guardar donaciones + fundDonations — dedup a través de eventLogs / transactionId
                      ▼
                MySQL (esquema giving)
```

Tres principios se mantienen en toda la pila:

1. **La puerta de enlace mantiene la tarjeta.** El widget de entrada de cada proveedor tokeniza en el navegador; la API solo recibe un token, nonce, o id de orden.
2. **Una abstracción, muchos proveedores.** El navegador resuelve un `PaymentProvider` desde un registro; el servidor resuelve un `IGatewayProvider` desde una fábrica. Ambos clave apagado del mismo nombre de proveedor normalizado almacenado en el registro de puerta de enlace.
3. **Los webhooks son la fuente de verdad para la liquidación.** Una respuesta de cargo se registra optimistamente, pero el webhook firmado de la puerta de enlace es lo que confirma (o crea) la donación completada, con guardias de idempotencia en ambos lados.

## Cliente: el registro del proveedor de pago (`@churchapps/apphelper`)

El registro vive en `Packages/apphelper/src/donations/providers/`, con los widgets y ayudantes de cada proveedor bajo su propia subcarpeta (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`) — nada fuera de `providers/` se bifurca en un nombre de proveedor. Un `PaymentProvider` (ver `providers/types.ts`) agrupa todo lo que una aplicación anfitriona necesita para una puerta de enlace: un `descriptor` (etiquetas de administrador, monedas soportadas, campos de tarifa, tasas de tarifa predeterminadas, panel/URLs de registro), un conjunto de banderas `capabilities` (tarjetas guardadas, ACH, recurrente, entrada de tarjeta nueva en línea, guardado implícito en tokenize), los widgets de React para entrada de miembro (`MemberWrapper`/`MemberEntry`), donación de invitado (`GuestForm`), edición de método guardado (`MethodEditForm`), y pagos de pregunta de formulario (`FormPayment`), más `buildChargeRequest(ctx, token)` — el único lugar donde la forma de carga de cargo difiere por proveedor. El `MemberWrapper` de cada proveedor carga su propio SDK desde la clave pública del registro de puerta de enlace, por lo que las aplicaciones anfitrionas nunca importan un SDK de puerta de enlace (B1App y B1Admin no tienen dependencia `@stripe/*`). `pickDefaultGateway(gateways, capability?)` centraliza cuál de las puertas de enlace de una iglesia una superficie debe usar.

`providers/registry.ts` mantiene los integrados. Se **hacen referencia por valor**, no se registran a través de un efecto secundario del módulo, por lo que el árbol de un empaquetador nunca puede caer el registro:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider]) builtins.set(p.key, p);
```

| Función | Propósito |
|----------|---------|
| `getPaymentProvider(name)` | Resolver por nombre normalizado; se retrocede a Stripe para que un proveedor mal configurado nunca bloquee duro el formulario del donante |
| `registerPaymentProvider(p)` | Registrar un proveedor adicional en tiempo de ejecución (para una puerta de enlace personalizada de una aplicación anfitriona) |
| `listPaymentProviders()` | Enumerar integrados + personalizado — utilizado para construir el menú desplegable de puerta de enlace de administrador |
| `hasPaymentProvider(name)` | Verificación de membresía |

**Proveedores integrados del cliente: Stripe, PayPal, Kingdom Funding.** B1App y B1Admin solo *leen* el registro (`getPaymentProvider`, `listPaymentProviders`); ni llaman a `registerPaymentProvider` — el registro se mantiene dentro de apphelper.

Cada proveedor tokeniza diferentemente, pero todos mantienen la tarjeta fuera de B1:

| Proveedor | Widget de entrada | Token devuelto a API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)` | id de método de pago (`pm_…`); banco a través de Conexiones Financieras / ACH SetupIntent |
| Kingdom Funding | Formulario tokenizador alojado con clave por clave pública de puerta de enlace | nonce de una sola vez |
| PayPal | PayPal Hosted Fields; orden del servidor construida a través de `/donate/client-token` + `/donate/create-order` | id de orden capturado |

El `finalizeResult` de Stripe ejecuta 3-D Secure / SCA en el navegador (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) antes de que se considere completa la donación; el formulario compartido solo llama a `provider.finalizeResult(result)` sin conocimiento de qué hace.

## Lado servidor: la abstracción de puerta de enlace (GivingApi)

El módulo `/giving` (`Api/src/modules/giving`) expone la superficie REST; el cableado de puerta de enlace vive en `Api/src/shared/helpers`. `DonateController` nunca habla directamente con un SDK de puerta de enlace — va a través de `GatewayService`, que resuelve el `IGatewayProvider` correcto desde `GatewayFactory` y le entrega un `GatewayConfig` descifrado.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() descifra privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) es el contrato que cada puerta de enlace implementa — ciclo de vida webhook (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), pago (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), tarifas (`calculateFees`), manejo de métodos guardados (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), y extras opcionales (clientes, órdenes, SetupIntents, reproducción de eventos). Cada clase de proveedor declara su propia matriz `capabilities` (monedas soportadas, ACH, reembolsos, requisitos de suscripción, límites de transacción) — `GatewayService.getProviderCapabilities(provider)` simplemente la lee — y banderas como `logsDonationsImmediately` impulsan el comportamiento del controlador sin condiciones de nombre de proveedor en los controladores.

**Proveedores del servidor registrados en `GatewayFactory`:**

| Proveedor | Disponibilidad |
|----------|-------------|
| Stripe | Siempre activado |
| PayPal | Siempre activado |
| Kingdom Funding | Siempre activado |
| Square | Opcionalmente a través de la bandera de ambiente `ENABLE_SQUARE` |
| ePayMints | Opcionalmente a través de la bandera de ambiente `ENABLE_EPAYMINTS` |

Los proveedores personalizados se pueden registrar en tiempo de ejecución cuando se establece `ENABLE_CUSTOM_GATEWAY_PROVIDERS`; `AbstractExperimentalGatewayProvider` es la clase base para esos. Los nombres de proveedores se cotejan sin distinción de mayúsculas.

### Configuración de puerta de enlace y secretos

Un administrador guarda credenciales de puerta de enlace a través de `POST /giving/gateways` (`GatewayController`). Al guardar el controlador encripta las claves privadas y webhook con `EncryptionHelper` antes de persistir, luego — en cualquier anfitrión que no sea localhost — elimina el webhook existente de la iglesia y aprovisiona uno nuevo apuntando a `/giving/donate/webhook/{provider}?churchId=…`. Las lecturas públicas (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) devuelven solo claves públicas.

## Modelo de datos

El esquema de donación (`Api/src/modules/giving/db/DatabaseTypes.ts`, modelos en `models/`) es un esquema MySQL accedido a través de Kysely:

| Tabla | Rol |
|-------|------|
| `gateways` | Configuración del proveedor por iglesia: `provider`, `publicKey`, `privateKey`/`webhookKey` encriptados, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Designaciones de donación (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Agrupación para entrada/reportes (`name`, `batchDate`) |
| `donations` | Un regalo: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`), `transactionId` |
| `fundDonations` | Asignación de una donación entre uno o más fondos (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Regalo recurrente; `id` es el id de suscripción de la puerta de enlace, vinculado a `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | División de fondos para un regalo recurrente |
| `customers` | Vincula un `personId` a su id de cliente de puerta de enlace, por `provider` |
| `gatewayPaymentMethods` | Tarjetas/bancos guardados: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Pista de auditoría de webhook/evento y clave dedup (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Campañas de promesa vinculadas a un fondo, y la cantidad prometida de cada persona |

Una donación se divide entre fondos a través de `fundDonations` — la donación lleva el total, cada `fundDonation` lleva una porción. `donations.currency` y `gateways.currency` llevan la moneda ISO; cada proveedor anuncia su `supportedCurrencies`, y los montos se formatean con `CurrencyHelper.formatCurrencyWithLocale`.

## Flujos de extremo a extremo

### Miembro una sola vez y recurrente (B1App)

La pantalla de donación autenticada (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) compone tres componentes apphelper: `MultiGatewayDonationForm`, `PaymentMethods`, y `RecurringDonations`. B1App hace la carga de datos circundante — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — y pasa la lista de puertas de enlace a través de; el proveedor resuelto carga su propio SDK desde la clave pública de la puerta de enlace. El cargo en sí ocurre dentro de apphelper: el proveedor resuelto tokeniza el método (nuevo o guardado), luego publica a `/giving/donate/charge` para un regalo de una sola vez o `/giving/donate/subscribe` para uno recurrente. Los regalos recurrentes crean una fila `subscriptions` más `subscriptionFunds` y ceden el cronograma a la puerta de enlace (Suscripciones de Stripe, Planes de Facturación de PayPal, o un cronograma recurrente de KF).

### Donación de invitado / anónima

La página de donación pública (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) y el panel "dar ahora" renderizan `NonAuthDonationWrapper` de `@churchapps/apphelper/website`, que inyecta reCAPTCHA y el contexto de Elements de la puerta de enlace alrededor del `GuestForm` del proveedor. Los invitados no obtienen inicio de sesión, sin métodos guardados, y sin historial. El flujo obtiene `GET /giving/funds/churchId/:id` y `GET /giving/donate/gateways/:churchId` (solo claves públicas), verifica al visitante con `POST /giving/donate/captcha-verify`, tokeniza en el navegador, y publica a `/giving/donate/charge` (o `/subscribe`). ACH invitado usa el `POST /giving/paymentmethods/ach-setup-intent-anon` anónimo.

### Grabación de administrador e importación de Stripe (B1Admin)

La sección de donaciones de B1Admin (`B1Admin/src/donations/`) es donde los equipos financieros trabajan. La entrada de lotes (`components/BulkDonationEntry.tsx`) registra regalos de efectivo/cheque/en especie publicando `/giving/donations` luego `/giving/funddonations` — sin puerta de enlace involucrada. Fondos, lotes, campañas, y estados cada uno asignan a sus rutas CRUD `/giving/*`. El panel de estilo de miembro donar (`B1Admin/src/donationComponents/`) reutiliza los mismos componentes apphelper que B1App.

La importación de Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) rellena regalos hechos fuera de B1: llama a `POST /giving/donate/replay-stripe-events` con `dryRun: true` para una vista previa, luego `dryRun: false` para importar. El servidor lista eventos de Stripe para el rango de fechas y omite cualquier cosa ya registrada — coincidida primero por id de proveedor de `eventLogs`, luego por `DonationRepo.findMatchingDonation` (cantidad + fecha + persona) para que una re-ejecución nunca importe duplicadamente.

## Webhooks y reconciliación

Los pagos liquidados y los cambios de estado de suscripción llegan a `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). El procesamiento es deliberadamente idempotente:

1. **Verificar** — `GatewayService.verifyWebhook` delega a la verificación de firma del proveedor; una firma fallida devuelve 401. Los eventos que no necesitan procesamiento se cortocircuitan con 200.
2. **Dedup el evento** — `EventLogRepo.loadByProviderId` omite un webhook ya registrado en `eventLogs`.
3. **Dedup la donación** — antes de crear nada, `DonationRepo.loadByTransactionId` se controla contra cada id candidato que la carga útil podría llevar. Esto absorbe entregas duplicadas, eventos ACH de múltiples etapas (pendiente → liquidado), y el caso donde `/donate/charge` ya registró el regalo optimistamente.
4. **Aplicar** — el `classifyWebhookEvent(eventType)` del proveedor dice qué significa el evento (`donation` pendiente/completa, `cancel-subscription`, o `ignore`); los pagos completados crean una donación `complete` (o promueven una existente `pending`), los eventos de estilo ACH aterrizan como `pending` hasta la liquidación, y los eventos de cancelación eliminan la fila `subscriptions` local. El controlador nunca inspecciona nombres de evento específicos del proveedor.

Los proveedores con `logsDonationsImmediately` (PayPal, Kingdom Funding) tienen sus cargos registrados desde la respuesta `/charge` (sin viaje de webhook requerido para la ruta feliz), mientras que Stripe se basa en `payment_intent.succeeded` / `invoice.paid` y ACH `payment_intent.processing`. El manejo de tarifas (`POST /giving/donate/fee`, la bandera de puerta de enlace `payFees`, y el `calculateFees` de cada proveedor) calcula el "cubrir las tarifas" aumento bruto en el lado del donante — B1 no toma tasa de plataforma, por lo que nunca se agrega una tarifa de aplicación.

:::info
Los caminos de cargo y webhook escriben las mismas filas `donations` / `fundDonations`. El `transactionId` es la clave de unión que mantiene un registro de cargo optimista y su webhook posterior sin producir dos donaciones para un regalo.
:::

## Páginas Relacionadas

- [Extremos de Donación](../api/endpoints/giving) — superficie REST completa para donaciones, fondos, lotes, puertas de enlace, suscripciones, métodos de pago, y webhooks
- [AppHelper](../shared-libraries/app-helper) — el paquete npm que envía el registro del proveedor de pago y componentes de donación
- [Estructura del Módulo](../api/module-structure) — cómo se organiza el módulo GivingApi del lado del servidor
