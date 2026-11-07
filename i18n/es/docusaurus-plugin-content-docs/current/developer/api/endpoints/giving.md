---
title: "Endpoints de Giving"
description: "Referencia de los endpoints de la API de Giving de ChurchApps: donativos, lotes, pasarelas, suscripciones y métodos de pago, con reglas de autenticación y permisos para desarrolladores que integran con B1 Admin."
---

# Endpoints de Giving

<div class="article-intro">

El módulo Giving administra las donaciones, los fondos, el procesamiento de pagos, las suscripciones y las operaciones financieras relacionadas. Admite varias pasarelas de pago (Stripe, PayPal), gestiona donativos únicos y recurrentes, lleva el control de los lotes de donaciones y procesa webhooks para los eventos de pago asíncronos.

</div>

**Ruta base:** `/giving`

## Donaciones

Ruta base: `/giving/donations`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Donations.View o su propio personId | Enumera todas las donaciones. Filtre con `?batchId=` o `?personId=`. Con `?personId=`, se excluyen los donativos a fondos no deducibles (como en los estados de cuenta de donaciones), salvo que quien llama con Donations.View agregue `&includeNonDeductible=1`, lo que hace el registro de persona de B1Admin |
| GET | `/:id` | JWT | Donations.View | Obtiene una donación por ID |
| GET | `/my` | JWT | — | Obtiene las donaciones del usuario actual |
| GET | `/my/summary?year=` | JWT | — | Total de donaciones del usuario actual para un año (por defecto, este año): `{ year, total, count, currency, isConverted }`, con los totales convertidos a la moneda de la iglesia. Alimenta la vista previa de donaciones en el inicio del miembro |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | Donaciones con fecha dentro del rango (inclusive). Ambas fechas son obligatorias en formato `YYYY-MM-DD`; de lo contrario, `400`. Las páginas de estados de cuenta de donaciones de B1Admin piden un año calendario de esta forma, en lugar de todo el historial de la iglesia |
| GET | `/summary` | JWT | Donations.ViewSummary | Obtiene el resumen de donaciones. Filtre con `?startDate=&endDate=&type=`. Use `type=person` para el desglose por persona |
| GET | `/testEmail` | Pública | — | Envía un correo de prueba (desarrollo y depuración) |
| POST | `/` | JWT | Donations.Edit o Donations.Enter | Crea o actualiza donaciones (por lote). Solo con Donations.Enter, tanto el lote de destino como (en una actualización) el lote actual de la donación deben estar abiertos, y las ofrendas de la pasarela (las que tienen `transactionId`) no pueden modificarse; de lo contrario, `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit o Donations.Enter | Elimina una donación. Solo Donations.Enter: la donación debe estar en un lote abierto y no ser una ofrenda de la pasarela; de lo contrario, `403` |

### Ejemplo: listar donaciones por lote

```
GET /giving/donations?batchId=abc-123
Authorization: Bearer <token>
```

```json
[
  {
    "id": "don-456",
    "batchId": "abc-123",
    "personId": "per-789",
    "donationDate": "2025-03-15T00:00:00.000Z",
    "amount": 100.00,
    "method": "card"
  }
]
```

### Ejemplo: obtener el resumen de donaciones

```
GET /giving/donations/summary?startDate=2025-01-01&endDate=2025-12-31
Authorization: Bearer <token>
```

```json
[
  {
    "week": "2025-01-06",
    "fund": "General Fund",
    "totalAmount": 2500.00,
    "count": 15
  }
]
```

## Lotes de donaciones {#donation-batches}

Ruta base: `/giving/donationbatches`

Extiende `GenericCrudController` con las rutas CRUD `getById`, `getAll`, `post` y `delete`. La operación de eliminación también borra todas las donaciones del lote.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Donations.ViewSummary o Donations.Enter | Enumera todos los lotes de donaciones |
| GET | `/:id` | JWT | Donations.ViewSummary o Donations.Enter | Obtiene un lote de donaciones por ID |
| POST | `/` | JWT | Donations.Edit o Donations.Enter | Crea o actualiza lotes de donaciones. Solo Donations.Enter: actualizar un lote existente requiere que esté abierto; de lo contrario, `403 { "error": "This batch is closed." }`. `status` se ignora aquí, así que guardar un lote no puede reabrirlo |
| POST | `/:id/close` | JWT | Donations.Edit | Cierra un lote: establece `status` en `closed`, `closedDate` en la fecha actual y `closedBy` en el ID de usuario de quien llama. Devuelve el lote |
| POST | `/:id/reopen` | JWT | Donations.Edit | Reabre un lote: establece `status` en `open` y limpia `closedDate` y `closedBy`. Devuelve el lote |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina un lote y todas sus donaciones |

Cada lote incluye `status` (`open` o `closed`; los lotes nuevos y los ya existentes son `open`), `closedDate` y `closedBy`. Donations.Edit puede modificar las donaciones de cualquier lote; Donations.Enter (que aparece como **Enter Donations** en el editor de roles) solo puede agregar, cambiar o eliminar donaciones y divisiones por fondo mientras su lote esté abierto.

## Donar

Ruta base: `/giving/donate`

Gestiona el flujo de donación de cara al público, incluidos los cargos, las suscripciones, los webhooks y el cálculo de comisiones. No hay rutas CRUD base habilitadas; todos los endpoints son personalizados.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/gateways/:churchId` | Pública | — | Obtiene las pasarelas de pago disponibles para una iglesia (solo claves públicas) |
| POST | `/client-token` | JWT | — | Genera un token de cliente para inicializar la pasarela |
| POST | `/create-order` | JWT | — | Crea una orden de pago (checkout estilo PayPal) |
| POST | `/charge` | JWT | — | Procesa un cargo de donación única |
| POST | `/subscribe` | JWT | — | Crea una suscripción de donación recurrente |
| POST | `/log` | Pública | — | Registra una donación. Cuerpo: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Pública | — | Recibe eventos de webhook de pago (Stripe, PayPal). Requiere `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Vuelve a procesar eventos de Stripe en un rango de fechas. Cuerpo: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Pública | — | Calcula las comisiones de la transacción. Cuerpo: `{ type, provider, gatewayId, amount, currency }`. Requiere `?churchId=` |
| POST | `/captcha-verify` | Pública | — | Verifica un token de reCAPTCHA. Cuerpo: `{ token, churchId? }`. Una respuesta humana devuelve `{ response: "human", pass }`, donde `pass` es un pase firmado de donación para invitados válido por 10 minutos (y solo para `churchId` cuando se envía uno) |

Cuando la API se ejecuta con `CAPTCHA_ENFORCE=true`, las llamadas de invitados (no autenticados) a `/giving/donate/create-order`, `/charge`, `/subscribe`, `/giving/paymentmethods/addcard` y `/giving/paymentmethods/ach-setup-intent-anon` (y a las llamadas `POST /content/registrations/register` de invitados con precio) deben incluir ese `captchaPass` en el cuerpo; de lo contrario, devuelven 403 `Captcha verification required`. El pase puede reutilizarse hasta que venza, porque el flujo de invitados de Stripe hace dos llamadas (agregar tarjeta y luego cargar). Las llamadas con sesión iniciada no se ven afectadas. `CAPTCHA_ENFORCE` tiene como valor predeterminado `false`; los formularios de donación para invitados de `@churchapps/apphelper` envían el pase automáticamente.

### Ejemplo: procesar un cargo de donación

```
POST /giving/donate/charge
Authorization: Bearer <token>

{
  "provider": "stripe",
  "amount": 50.00,
  "currency": "usd",
  "person": { "id": "per-123", "email": "donor@example.com" },
  "funds": [{ "id": "fund-001", "name": "General Fund", "amount": 50.00 }],
  "church": { "name": "First Church", "subDomain": "firstchurch" }
}
```

```json
{
  "id": "ch_abc123",
  "status": "succeeded",
  "provider": "stripe"
}
```

### Ejemplo: crear una suscripción recurrente

```
POST /giving/donate/subscribe
Authorization: Bearer <token>

{
  "provider": "stripe",
  "amount": 100.00,
  "customerId": "cus_abc123",
  "interval": { "interval_count": 1, "interval": "month" },
  "billing_cycle_anchor": 1710460800,
  "person": { "id": "per-123", "email": "donor@example.com" },
  "funds": [{ "id": "fund-001", "name": "General Fund", "amount": 100.00 }],
  "church": { "name": "First Church", "subDomain": "firstchurch" }
}
```

```json
{
  "id": "sub_xyz789",
  "status": "active",
  "provider": "stripe"
}
```

## Fondos

Ruta base: `/giving/funds`

Extiende `GenericCrudController` con las rutas CRUD `getById`, `getAll`, `post` y `delete`. El permiso `view` es `null` (no se requiere permiso para ver los fondos).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Enumera todos los fondos |
| GET | `/:id` | JWT | — | Obtiene un fondo por ID |
| GET | `/churchId/:churchId` | Pública | — | Obtiene todos los fondos de una iglesia específica (público) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Pública | — | Obtiene el total de donaciones de un fondo: `{ fundId, totalAmount, donationCount }`. Alimenta el elemento `campaignProgress` del creador de sitios web |
| POST | `/` | JWT | Donations.Edit | Crea o actualiza fondos |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina un fondo |

## Donaciones por fondo

Ruta base: `/giving/funddonations`

Registra cómo se distribuye cada donación entre los fondos. No hay rutas CRUD base habilitadas; todos los endpoints son personalizados.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Donations.View | Enumera las donaciones por fondo. Filtre con `?donationId=`, `?personId=`, `?fundId=` o `?fundName=`. Opcionalmente agregue `?startDate=&endDate=` para filtrar por fecha |
| GET | `/:id` | JWT | Donations.View | Obtiene una donación por fondo por ID |
| GET | `/my` | JWT | — | Obtiene las donaciones por fondo del usuario actual |
| POST | `/` | JWT | Donations.Edit o Donations.Enter | Crea o actualiza donaciones por fondo (por lote). Solo Donations.Enter: la donación padre debe estar en un lote abierto y no ser una ofrenda de la pasarela; de lo contrario, `403` |
| DELETE | `/:id` | JWT | Donations.Edit o Donations.Enter | Elimina una donación por fondo. La misma regla de lote abierto aplica a Donations.Enter |

## Pasarelas

Ruta base: `/giving/gateways`

Administra la configuración de las pasarelas de pago (Stripe, PayPal, etc.). No hay rutas CRUD base habilitadas; todos los endpoints son personalizados. Los secretos de la pasarela se cifran en reposo.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Enumera todas las pasarelas de la iglesia |
| GET | `/:id` | JWT | Settings.Edit | Obtiene una pasarela por ID |
| GET | `/churchId/:churchId` | Pública | — | Obtiene las pasarelas de una iglesia (solo claves públicas) |
| GET | `/configured/:churchId` | Pública | — | Comprueba si una iglesia tiene una pasarela de pago configurada |
| POST | `/` | JWT | Settings.Edit | Crea o actualiza pasarelas (cifra las claves, aprovisiona webhooks y productos) |
| PATCH | `/:id` | JWT | Settings.Edit | Actualiza parcialmente una pasarela |
| DELETE | `/:id` | JWT | Settings.Edit | Elimina una pasarela (también elimina sus webhooks) |

### Ejemplo: comprobar la configuración de la pasarela

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## Clientes

Ruta base: `/giving/customers`

Extiende `GenericCrudController` con las rutas CRUD `getAll` y `delete`. Vincula a las personas con sus registros de cliente en la pasarela de pago.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Enumera todos los clientes |
| GET | `/:id` | JWT | Donations.ViewSummary o su propio registro | Obtiene un cliente por ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary o su propio registro | Obtiene las suscripciones de pasarela de un cliente |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina un cliente |

## Suscripciones

Ruta base: `/giving/subscriptions`

Administra las suscripciones de donación recurrente. No hay rutas CRUD base habilitadas; todos los endpoints son personalizados.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Enumera todas las suscripciones |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtiene una suscripción por ID |
| POST | `/` | JWT | Donations.Edit o su propia suscripción | Actualiza suscripciones con la pasarela de pago |
| DELETE | `/:id` | JWT | Donations.Edit o su propia suscripción | Cancela una suscripción y la elimina de la base de datos. Cuerpo: `{ provider, reason }` |

## Fondos de suscripción

Ruta base: `/giving/subscriptionfunds`

Registra las asignaciones de fondos de las suscripciones recurrentes. No hay rutas CRUD base habilitadas; todos los endpoints son personalizados.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Donations.View o su propia suscripción | Enumera los fondos de suscripción. Filtre con `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtiene un fondo de suscripción por ID |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina un fondo de suscripción |
| DELETE | `/subscription/:id` | JWT | Donations.Edit o su propia suscripción | Elimina todos los fondos de una suscripción |

## Métodos de pago

Ruta base: `/giving/paymentmethods`

Administra los métodos de pago guardados (tarjetas, cuentas bancarias) mediante las API de las pasarelas de pago. No hay rutas CRUD base habilitadas; todos los endpoints son personalizados.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/personid/:id` | JWT | Donations.View o su propio personId | Obtiene todos los métodos de pago guardados de una persona (tarjetas, cuentas bancarias) |
| POST | `/addcard` | JWT | — | Adjunta un método de pago con tarjeta. Cuerpo: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit o su propio personId | Actualiza los datos de la tarjeta. Cuerpo: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit o su propio personId | Crea un SetupIntent ACH de Stripe para vincular una cuenta bancaria. Cuerpo: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Pública | — | Crea un SetupIntent ACH anónimo para donaciones de invitados. Cuerpo: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit o su propio personId | Agrega una cuenta bancaria mediante un token (obsoleto; use `ach-setup-intent`). Cuerpo: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit o su propio personId | Actualiza los datos de la cuenta bancaria. Cuerpo: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit o su propio cliente | Verifica una cuenta bancaria con micro-depósitos. Cuerpo: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit o su propio cliente | Elimina un método de pago (tarjeta o cuenta bancaria) |

## Registro de eventos

Ruta base: `/giving/eventLog`

Extiende `GenericCrudController` con las rutas CRUD `getById`, `getAll`, `post` y `delete`. Registra los eventos de webhook de la pasarela de pago para auditoría y deduplicación.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Enumera todos los registros de eventos |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtiene un registro de evento por ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Obtiene los registros de eventos filtrados por tipo de evento |
| POST | `/` | JWT | Donations.Edit | Crea o actualiza registros de eventos |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina un registro de evento |

## Páginas relacionadas

- [Endpoints de Membership](./membership.md): personas, iglesias, grupos, roles y permisos
- [Autenticación y permisos](./authentication.md): flujo de inicio de sesión, JWT, OAuth y modelo de permisos
- [Estructura de módulos](../module-structure.md): patrones de organización del código
