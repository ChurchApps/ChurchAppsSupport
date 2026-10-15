---
title: "Arquitectura de Giving"
---

# Arquitectura de Giving

<div class="article-intro">

ChurchApps procesa las donaciones con un modelo de pasarela: la iglesia mantiene su propia cuenta de Stripe (o de PayPal, Kingdom Funding o Paystack), y B1 nunca se interpone en el flujo del dinero como procesador de la plataforma. Los datos de la tarjeta se tokenizan en el navegador y nunca llegan a un servidor de ChurchApps. Esta página describe toda la pila: el registro de proveedores de pago del lado del cliente en `@churchapps/apphelper`, la abstracción de pasarela de GivingApi, el modelo de datos de las donaciones y cómo los webhooks de la pasarela se concilian con la base de datos.

</div>

## Visión general

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

1. **La pasarela custodia la tarjeta.** El widget de entrada de cada proveedor tokeniza en el navegador; la API solo recibe un token, un nonce o un ID de orden.
2. **Una abstracción, muchos proveedores.** El navegador resuelve un `PaymentProvider` desde un registro; el servidor resuelve un `IGatewayProvider` desde una fábrica. Ambos usan el mismo nombre de proveedor normalizado guardado en el registro de la pasarela.
3. **Los webhooks son la fuente de verdad de la liquidación.** La respuesta de un cargo se registra de forma optimista, pero el webhook firmado de la pasarela es lo que confirma (o crea) la donación completada, con protecciones de idempotencia en ambos lados.

## Lado del cliente: el registro de proveedores de pago (`@churchapps/apphelper`)

El registro vive en `Packages/apphelper/src/donations/providers/`, y los widgets y utilidades de cada proveedor están en su propia subcarpeta (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`). Nada fuera de `providers/` se ramifica según el nombre de un proveedor. Un `PaymentProvider` (consulta `providers/types.ts`) agrupa todo lo que una aplicación anfitriona necesita para una pasarela: un `descriptor` (etiquetas de administración, monedas admitidas, campos de comisiones, tasas de comisión predeterminadas, URL del panel y de registro), un conjunto de `capabilities` (tarjetas guardadas, ACH, recurrencia, entrada de tarjeta nueva en línea, guardado implícito al tokenizar), los widgets de React para la entrada de miembros (`MemberWrapper`/`MemberEntry`), las donaciones de invitados (`GuestForm`), la edición de métodos guardados (`MethodEditForm`) y los pagos de preguntas de formularios (`FormPayment`), además de `buildChargeRequest(ctx, token)`, el único lugar donde la forma del payload del cargo difiere según el proveedor. El `MemberWrapper` de cada proveedor carga su propio SDK a partir de la clave pública del registro de la pasarela, de modo que las aplicaciones anfitrionas nunca importan un SDK de pasarela (B1App y B1Admin no tienen dependencia de `@stripe/*`). `pickDefaultGateway(gateways, capability?)` centraliza qué pasarela de la iglesia debe usar cada superficie.

`providers/registry.ts` contiene los proveedores integrados. Se **referencian por valor**, en lugar de registrarse mediante un efecto secundario del módulo, de modo que el *tree-shaking* del empaquetador nunca puede eliminar el registro:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Función | Propósito |
|----------|---------|
| `getPaymentProvider(name)` | Resuelve por nombre normalizado; si no existe, recurre a Stripe para que un proveedor mal configurado nunca rompa de forma fatal el formulario del donante |
| `registerPaymentProvider(p)` | Registra un proveedor adicional en tiempo de ejecución (para una pasarela personalizada de una aplicación anfitriona) |
| `listPaymentProviders()` | Enumera los integrados y los personalizados; se usa para construir el menú desplegable de pasarelas del administrador |
| `hasPaymentProvider(name)` | Comprueba si un proveedor está registrado |

**Proveedores de cliente integrados: Stripe, PayPal, Kingdom Funding y Paystack.** B1App y B1Admin solo *leen* el registro (`getPaymentProvider`, `listPaymentProviders`); ninguno llama a `registerPaymentProvider`: el registro se mantiene dentro de apphelper.

Cada proveedor tokeniza de forma distinta, pero todos mantienen la tarjeta fuera de B1:

| Proveedor | Widget de entrada | Token que se devuelve a la API |
|----------|--------------|-----------------------|
| Stripe | `CardElement` de Stripe `Elements` → `stripe.createPaymentMethod(...)`; el formulario de invitados además monta un `ExpressCheckoutElement` (Apple Pay / Google Pay, para donaciones únicas) cuyo `onConfirm` resuelve al mismo ID `pm_…` | ID del método de pago (`pm_…`); banco mediante `/paymentmethods/ach-setup-intent`: Financial Connections `us_bank_account` para pasarelas en USD, y `acss_debit` de PAD canadiense (modal de mandato alojado, mandato `default_for` de facturas y suscripciones; los cargos únicos envían el ID del mandato) para pasarelas en CAD |
| Kingdom Funding | Formulario de tokenización alojado, identificado por la clave pública de la pasarela | nonce de un solo uso |
| PayPal | PayPal Hosted Fields (tarjeta, recurrencia) más PayPal Smart Buttons con financiamiento de Venmo (pagos únicos); ambos comparten una sola carga del SDK y la orden del servidor se construye mediante `/donate/client-token` + `/donate/create-order` | ID de la orden capturada |
| Paystack | Ventana emergente Paystack Inline (`js.paystack.co/v2/inline.js`): la propia ventana procesa el pago (tarjeta, dinero móvil, transferencia bancaria, USSD) | referencia de la transacción pagada; los métodos guardados son códigos de autorización `AUTH_…` de Paystack |

El `finalizeResult` de Stripe ejecuta 3-D Secure / SCA en el navegador (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) antes de considerar completada la donación; el formulario compartido simplemente llama a `provider.finalizeResult(result)` sin conocer lo que hace.

## Lado del servidor: la abstracción de pasarela (GivingApi)

El módulo `/giving` (`Api/src/modules/giving`) expone la superficie REST; la infraestructura de pasarelas vive en `Api/src/shared/helpers`. `DonateController` nunca habla directamente con un SDK de pasarela: pasa por `GatewayService`, que resuelve el `IGatewayProvider` correcto desde `GatewayFactory` y le entrega una `GatewayConfig` descifrada.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) es el contrato que implementa cada pasarela: ciclo de vida de los webhooks (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), pagos (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), comisiones (`calculateFees`), gestión de métodos guardados (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) y extras opcionales (clientes, órdenes, SetupIntents, reenvío de eventos, `retryFailedPayment` para una factura de suscripción fallida, `registerPaymentMethodDomain` para la verificación de dominio de Apple Pay). Un proveedor que omite un hook opcional se reporta como no compatible para esa acción, y la interfaz oculta el control correspondiente. Cada clase de proveedor declara su propia matriz de `capabilities` (monedas admitidas, ACH, reembolsos, requisitos de suscripción, límites de transacción); `GatewayService.getProviderCapabilities(provider)` solo la lee. Marcas como `logsDonationsImmediately` controlan el comportamiento de los controladores sin condicionales por nombre de proveedor en ellos.

**Proveedores de servidor registrados en `GatewayFactory`:**

| Proveedor | Disponibilidad |
|----------|-------------|
| Stripe | Siempre activo |
| PayPal | Siempre activo |
| Kingdom Funding | Siempre activo |
| Paystack | Siempre activo (comerciantes de Nigeria, Ghana, Sudáfrica, Kenia y Costa de Marfil; monedas NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Opcional mediante la variable de entorno `ENABLE_SQUARE` |
| ePayMints | Opcional mediante la variable de entorno `ENABLE_EPAYMINTS` |

Paystack se diferencia de los demás en que el dinero se mueve antes de que intervenga GivingApi: la ventana emergente cobra al donante, `processCharge` es un `GET /transaction/verify/:reference` cuyo monto pagado y moneda deben coincidir con la donación que se va a registrar (una referencia ya guardada nunca se registra dos veces), y el primer regalo de un calendario recurrente se registra desde `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` con `start_date` a un intervalo de distancia). Los webhooks se firman con la propia clave secreta (`x-paystack-signature`, HMAC-SHA512 sobre el cuerpo sin procesar), y Paystack no tiene API para gestionar webhooks, así que la pantalla de administración muestra la URL para que la iglesia la pegue en su panel. Los eventos `charge.success` de renovación no traen división de fondos; el proveedor la recupera de las filas locales `subscriptions`/`subscriptionFunds` del donante. Solo las autorizaciones de tarjeta son `reusable`: los regalos por dinero móvil son únicamente de pago único, así que `createSubscription` los rechaza. Los datos de demostración agregan una segunda iglesia (Accra Community Church, `CHU00000002`) con una pasarela Paystack en modo de prueba en GHS, para que la suite de Playwright de Paystack se ejecute junto a la de Stripe de Grace.

Las pasarelas personalizadas pueden registrarse en tiempo de ejecución cuando está definida la variable `ENABLE_CUSTOM_GATEWAY_PROVIDERS`; `AbstractExperimentalGatewayProvider` es la clase base para ellas. Los nombres de proveedor se comparan sin distinguir mayúsculas de minúsculas.

### Configuración de la pasarela y secretos

Un administrador guarda las credenciales de la pasarela mediante `POST /giving/gateways` (`GatewayController`). Al guardar, el controlador cifra las claves privada y de webhook con `EncryptionHelper` antes de persistirlas, y luego, en cualquier host que no sea localhost, elimina el webhook existente de la iglesia y aprovisiona uno nuevo apuntando a `/giving/donate/webhook/{provider}?churchId=…`. Una iglesia mantiene una fila por proveedor: guardar una pasarela reemplaza solo la fila existente de ese mismo proveedor. Las lecturas públicas (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) devuelven solo claves públicas.

## Modelo de datos

El esquema de giving (`Api/src/modules/giving/db/DatabaseTypes.ts`, modelos en `models/`) es un esquema MySQL accedido mediante Kysely:

| Tabla | Función |
|-------|------|
| `gateways` | Configuración del proveedor por iglesia: `provider`, `publicKey`, `privateKey`/`webhookKey` cifradas, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Destinos de ofrenda (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Agrupación para captura y reportes (`name`, `batchDate`) |
| `donations` | Un regalo: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; los estados, los totales, los paneles y los reportes de donaciones solo cuentan `complete` o null), `transactionId` |
| `fundDonations` | Asignación de una donación a uno o más fondos (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Regalo recurrente; `id` es el ID de suscripción de la pasarela, vinculado a `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | División por fondos de un regalo recurrente |
| `customers` | Vincula un `personId` con su ID de cliente en la pasarela, por `provider` |
| `gatewayPaymentMethods` | Tarjetas y cuentas bancarias guardadas: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Registro de auditoría de webhooks y eventos, y clave de deduplicación (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Campañas de promesas vinculadas a un fondo, y el monto prometido de cada persona |

Una donación se reparte entre fondos mediante `fundDonations`: la donación lleva el total y cada `fundDonation` lleva una porción. `donations.currency` y `gateways.currency` llevan el código ISO de la moneda; cada proveedor anuncia sus `supportedCurrencies`, y los montos se formatean con `CurrencyHelper.formatCurrencyWithLocale`.

## Flujos de extremo a extremo

### Donaciones únicas y recurrentes de miembros (B1App)

La pantalla autenticada de donación (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) combina tres componentes de apphelper: `MultiGatewayDonationForm`, `PaymentMethods` y `RecurringDonations`. B1App hace la carga de datos que rodea a estos componentes (`GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions`) y pasa la lista de pasarelas; el proveedor resuelto carga su propio SDK a partir de la clave pública de la pasarela. El cargo en sí ocurre dentro de apphelper: el proveedor resuelto tokeniza el método (nuevo o guardado) y luego envía un `POST` a `/giving/donate/charge` para un regalo único o a `/giving/donate/subscribe` para uno recurrente. Ambos endpoints atribuyen un donante autenticado a su propio `personId` (solo quienes tienen `donations.edit` pueden atribuir a otra persona) y rechazan divisiones de fondos cuya suma supere el monto cobrado. Los regalos recurrentes crean una fila en `subscriptions` más `subscriptionFunds`, y entregan el calendario a la pasarela (Stripe Subscriptions, PayPal Billing Plans o un calendario recurrente de KF).

### Donaciones de invitados y anónimas

La página pública de donación (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) y el panel "give now" renderizan `NonAuthDonationWrapper` de `@churchapps/apphelper/website`, que inyecta reCAPTCHA y el contexto Elements de la pasarela alrededor del `GuestForm` del proveedor. Los invitados no inician sesión, no tienen métodos guardados ni historial. El flujo consulta `GET /giving/funds/churchId/:id` y `GET /giving/donate/gateways/:churchId` (solo claves públicas), verifica al visitante con `POST /giving/donate/captcha-verify`, tokeniza en el navegador y envía un `POST` a `/giving/donate/charge` (o `/subscribe`). El ACH de invitados usa el endpoint anónimo `POST /giving/paymentmethods/ach-setup-intent-anon`, que solo permite la verificación instantánea (Financial Connections): una verificación por microdepósitos termina días después, cuando la página del invitado ya no está abierta, así que nunca podría completar el regalo. El formulario se niega a cobrar un SetupIntent no verificado y dirige al donante a tarjeta o a una configuración bancaria con sesión iniciada.

Tres opciones del formulario de invitados usan la misma llamada de cargo. `?fundId=` y `?amount=` en la URL de donación preseleccionan la división de fondos (los lee el formulario de invitados de cada proveedor al montarse, y se enrutan por el manejador normal de cambio de fondo para que los totales y las comisiones se actualicen). `anonymous: true` hace que `DonateController.charge` descarte cualquier persona que envíe el cliente y registre el regalo con `personId = null`; el formulario de invitados omite `/people/loadOrCreate` y el paso de cliente/bóveda, y los tres proveedores de registro inmediato dejan de resolver una persona a partir del cliente de la pasarela. Apple Pay requiere que el dominio de la página esté registrado en Stripe, así que un formulario de invitados de Stripe envía una vez por sesión un `POST` a `POST /giving/donate/register-domain`, público y con límite de tasa, que solo acepta un dominio que pertenezca a la iglesia (`<subDomain>.b1.church`, una fila en la tabla de dominios del módulo de contenido, o un host local) antes de llamar a la API de dominios de métodos de pago de Stripe.

### Captura administrativa e importación de Stripe (B1Admin)

La sección de donaciones de B1Admin (`B1Admin/src/donations/`) es donde trabaja el equipo financiero. La captura por lotes (`components/BulkDonationEntry.tsx`) registra regalos en efectivo, con cheque o en especie enviando un `POST` a `/giving/donations` y luego a `/giving/funddonations`, sin intervención de ninguna pasarela. La hoja **Log a gift** del registro de la persona (`components/LogGiftDialog.tsx`) hace lo mismo para un solo regalo: primero busca el lote cuyo `batchDate` coincida con la fecha del regalo, o crea uno con el nombre de esa fecha (`POST /giving/donationbatches`), y elimina de nuevo la donación o el lote nuevo si un paso posterior falla. Los fondos, lotes, campañas y estados de cuenta se corresponden con sus rutas CRUD `/giving/*`. El panel de donación estilo miembro (`B1Admin/src/donationComponents/`) reutiliza los mismos componentes de apphelper que B1App.

Las integraciones de reportes y contabilidad son trabajo del lado del cliente o del ejecutor de reportes, no de la pasarela: la exportación a QuickBooks de la página de lotes genera un CSV de asientos contables a partir de `donations` + `fundDonations` del lote (débito a Undeposited Funds, un crédito por fondo); la vista Lapsed Givers de la página Summary ejecuta `Api/reports/lapsedGivers.json` mediante el ejecutor genérico de reportes, con los nombres de las personas resueltos por `ReportOutput`; y los formatos de recibo por país (Canadá, Australia, Nueva Zelanda) son configuraciones de la iglesia en el almacén clave-valor de membresía, renderizados por `GivingStatementDocument` y duplicados en la página de impresión de B1App. Las páginas de impresión de estados de B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) pasan el ajuste `logoLight` de la iglesia (mediante `usePrintLogo` en `B1Admin/src/components/PrintChurchHeader.tsx`) para que el logo se imprima en la parte superior de cada estado, y esperan a que la imagen cargue antes de imprimir automáticamente.

### Conversión de totales en múltiples monedas

Cualquier endpoint que devuelva un total combinado entre regalos que posiblemente estén en monedas distintas (los KPI de resumen de ofrendas, `GivingKpiCards`, el total de un lote de donaciones, el total de un fondo y los totales de año a la fecha o de periodo de la pantalla de donación de B1App) convierte a la moneda predeterminada de la iglesia del lado del servidor, en lugar de sumar monedas distintas. `Api/src/shared/helpers/ExchangeRateHelper.ts` obtiene las tasas de `api.frankfurter.dev` usando como clave la moneda de la iglesia, las guarda en caché dentro del proceso durante 12 horas y expone `convertTotals(rows, churchCurrency, rates)`: las filas se agrupan previamente por moneda en SQL (unos pocos grupos, nunca una conversión por regalo), cada grupo se convierte y se suma, y el resultado lleva una bandera `isConverted` que el cliente usa para mostrar la nota "Converted at current exchange rates". `GET /donations/exchange-rates` expone la tabla de tasas a los clientes que la necesitan (la pantalla de donación de B1App); las tasas nunca se aceptan desde una solicitud, solo se obtienen del lado del servidor, de modo que un cliente no puede influir en un total reportado. Los registros de donación individuales y los reportes históricos o en la moneda original nunca se convierten; solo se convierten los totales combinados.

La importación de Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) incorpora regalos hechos fuera de B1: llama a `POST /giving/donate/replay-stripe-events` con `dryRun: true` para una vista previa, y luego con `dryRun: false` para importar. El servidor lista los eventos de Stripe del rango de fechas y omite lo que ya está registrado: primero compara por el ID de proveedor en `eventLogs`, luego por ID de transacción, y después mediante `DonationRepo.findMatchingDonation` (monto + fecha + persona), de modo que una nueva ejecución nunca importa dos veces lo mismo. Los eventos `charge.succeeded` / `payment_intent.succeeded` de suscripciones se omiten porque `invoice.paid` registra esos regalos; las versiones más recientes de la API de Stripe eliminan `PaymentIntent.invoice`, así que la omisión también se basa en la descripción "Subscription …".

## Webhooks y conciliación

Los pagos liquidados y los cambios de estado de suscripción llegan a `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). El procesamiento es deliberadamente idempotente:

1. **Verificar**: `GatewayService.verifyWebhook` delega en la verificación de firma del proveedor; una firma inválida devuelve 401. Los eventos que no requieren procesamiento terminan con 200.
2. **Deduplicar el evento**: `EventLogRepo.loadByProviderId` omite un webhook que ya está registrado en `eventLogs`.
3. **Deduplicar la donación**: antes de crear nada, `DonationRepo.loadByTransactionId` se consulta con cada ID candidato que el payload pueda traer. Esto absorbe los envíos duplicados, los eventos ACH de varias etapas (pendiente → liquidado) y el caso en que `/donate/charge` ya registró el regalo de forma optimista.
4. **Aplicar**: `classifyWebhookEvent(eventType)` del proveedor indica lo que significa el evento (`donation` pendiente/completa, `cancel-subscription` o `ignore`); los pagos completados crean una donación `complete` (o promueven una `pending` o `failed` existente), los eventos de estilo ACH quedan como `pending` hasta la liquidación, una factura de suscripción fallida (`invoice.payment_failed` de Stripe) crea una donación `failed` con clave en el ID de la factura, y los eventos de cancelación eliminan la fila local de `subscriptions`. El controlador nunca inspecciona nombres de eventos específicos de un proveedor.

### Regalos recurrentes fallidos y cobro de pagos atrasados

Una donación `failed` es la unidad de trabajo para la recuperación. `GET /giving/donations/failed` las lista con el mensaje de fallo más reciente de la pasarela, tomado de `eventLogs`, y una bandera `canRetry` según las capacidades de la pasarela; `POST /giving/donate/retry/:donationId` llama a `retryFailedPayment` del proveedor (Stripe paga la factura abierta), y el webhook resultante promueve la fila a `complete` mediante la ruta normal de deduplicación. Los correos de cobro de pagos atrasados (dunning) se envían al donante desde el manejador del webhook el día 0, y luego desde `DunningHelper.run` en el temporizador de medianoche (conectado tanto en `lambda/timer-handler.ts` como en `RailwayCron.ts`) a los 3 y 7 días; cada envío se registra en `eventLogs` como `provider: "dunning"`, `providerId: "<donationId>:<day>"`, de modo que una nueva ejecución nunca envía dos veces el mismo correo. Cuando Stripe se rinde y cancela la suscripción (`customer.subscription.deleted` con `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` envía un único correo al donante (`providerId: "<subscriptionId>:canceled"`); las cancelaciones iniciadas por el donante o por el administrador no generan correo. Stripe nunca agrega eventos a un endpoint existente: después de cambiar `StripeHelper.webhookEvents`, o bien vuelve a guardar la pasarela, o bien ejecuta `tools/manual/stripe-webhook-events.ts` (simulación por defecto, `--apply` para escribir) contra producción.

Los proveedores con `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) registran sus cargos a partir de la respuesta de `/charge` (no se necesita un viaje de ida y vuelta por webhook en el camino feliz), mientras que Stripe depende de `payment_intent.succeeded` / `invoice.paid` y de `payment_intent.processing` para ACH. El manejo de comisiones (`POST /giving/donate/fee`, la bandera `payFees` de la pasarela y el `calculateFees` de cada proveedor) calcula el ajuste bruto de "cubrir las comisiones" del lado del donante: B1 no cobra ninguna comisión de plataforma, así que nunca se agrega una application fee.

:::info
Las rutas de cargo y de webhook escriben las mismas filas en `donations` / `fundDonations`. El `transactionId` es la clave de unión que evita que un registro optimista de cargo y su webhook posterior produzcan dos donaciones para un mismo regalo.
:::

## Páginas relacionadas

- [Endpoints de Giving](../api/endpoints/giving): superficie REST completa para donaciones, fondos, lotes, pasarelas, suscripciones, métodos de pago y webhooks
- [AppHelper](../shared-libraries/app-helper): el paquete npm que incluye el registro de proveedores de pago y los componentes de donación
- [Estructura de módulos](../api/module-structure): cómo está organizado el módulo GivingApi del lado del servidor
