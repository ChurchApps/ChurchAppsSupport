---
title: "Endpoints de Giving"
---

# Endpoints de Giving

<div class="article-intro">

El módulo Giving gestiona las donaciones, los fondos, el procesamiento de pagos, las suscripciones y otras operaciones financieras relacionadas. Admite varias pasarelas de pago (Stripe, PayPal), gestiona donaciones únicas y recurrentes, registra los lotes de donaciones y procesa webhooks para los eventos de pago asíncronos.

</div>

**Ruta base:** `/giving`

## Donaciones

Ruta base: `/giving/donations`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View o el propio personId | Lista todas las donaciones. Filtra con `?batchId=` o `?personId=`. Con `?personId=`, se excluyen los regalos a fondos no deducibles (como en los estados de donaciones), salvo que quien llama tenga Donations.View y agregue `&includeNonDeductible=1`, lo que hace el registro de persona de B1Admin |
| GET | `/:id` | JWT | Donations.View | Obtiene una donación por ID |
| GET | `/my` | JWT | — | Obtiene las donaciones del usuario actual |
| GET | `/my/summary?year=` | JWT | — | Total de ofrendas del usuario actual para un año (por defecto, este año): `{ year, total, count, currency, isConverted }`, con los totales convertidos a la moneda de la iglesia. Respalda la vista previa de ofrendas en la página de inicio para miembros |
| GET | `/summary` | JWT | Donations.ViewSummary | Obtiene el resumen de donaciones. Filtra con `?startDate=&endDate=&type=`. Usa `type=person` para el desglose por persona |
| GET | `/testEmail` | Pública | — | Envía un correo de prueba (desarrollo y depuración) |
| POST | `/` | JWT | Donations.Edit | Crea o actualiza donaciones (por lote) |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina una donación |

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

## Lotes de donaciones

Ruta base: `/giving/donationbatches`

Extiende `GenericCrudController` con las rutas CRUD `getById`, `getAll`, `post` y `delete`. La operación de eliminación también elimina todas las donaciones del lote.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Lista todos los lotes de donaciones |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtiene un lote de donaciones por ID |
| POST | `/` | JWT | Donations.Edit | Crea o actualiza lotes de donaciones |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina un lote y todas sus donaciones |

## Donar

Ruta base: `/giving/donate`

Gestiona el flujo de donación de cara al público, incluidos los cargos, las suscripciones, los webhooks y el cálculo de comisiones. No hay rutas CRUD base habilitadas; todos los endpoints son personalizados.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Pública | — | Obtiene las pasarelas de pago disponibles para una iglesia (solo claves públicas) |
| POST | `/client-token` | JWT | — | Genera un token de cliente para inicializar la pasarela |
| POST | `/create-order` | JWT | — | Crea una orden de pago (checkout al estilo PayPal) |
| POST | `/charge` | JWT | — | Procesa el cargo de una donación única |
| POST | `/subscribe` | JWT | — | Crea una suscripción de donación recurrente |
| POST | `/log` | Pública | — | Registra una donación. Cuerpo: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Pública | — | Recibe eventos de webhook de pagos (Stripe, PayPal). Requiere `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Reenvía los eventos de Stripe de un rango de fechas. Cuerpo: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Pública | — | Calcula las comisiones de transacción. Cuerpo: `{ type, provider, gatewayId, amount, currency }`. Requiere `?churchId=` |
| POST | `/captcha-verify` | Pública | — | Verifica un token de reCAPTCHA. Cuerpo: `{ token }` |

### Ejemplo: procesar el cargo de una donación

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
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lista todos los fondos |
| GET | `/:id` | JWT | — | Obtiene un fondo por ID |
| GET | `/churchId/:churchId` | Pública | — | Obtiene todos los fondos de una iglesia específica (público) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Pública | — | Obtiene el total de donaciones de un fondo: `{ fundId, totalAmount, donationCount }`. Alimenta el elemento `campaignProgress` del creador de sitios web |
| POST | `/` | JWT | Donations.Edit | Crea o actualiza fondos |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina un fondo |

## Donaciones por fondo

Ruta base: `/giving/funddonations`

Registra cómo se asigna cada donación individual a los fondos. No hay rutas CRUD base habilitadas; todos los endpoints son personalizados.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | Lista las donaciones por fondo. Filtra con `?donationId=`, `?personId=`, `?fundId=` o `?fundName=`. Opcionalmente agrega `?startDate=&endDate=` para filtrar por fecha |
| GET | `/:id` | JWT | Donations.View | Obtiene una donación por fondo por ID |
| GET | `/my` | JWT | — | Obtiene las donaciones por fondo del usuario actual |
| POST | `/` | JWT | Donations.Edit | Crea o actualiza donaciones por fondo (por lote) |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina una donación por fondo |

## Pasarelas

Ruta base: `/giving/gateways`

Administra la configuración de las pasarelas de pago (Stripe, PayPal, etc.). No hay rutas CRUD base habilitadas; todos los endpoints son personalizados. Los secretos de las pasarelas se cifran en reposo.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lista todas las pasarelas de la iglesia |
| GET | `/:id` | JWT | Settings.Edit | Obtiene una pasarela por ID |
| GET | `/churchId/:churchId` | Pública | — | Obtiene las pasarelas de una iglesia (solo claves públicas) |
| GET | `/configured/:churchId` | Pública | — | Verifica si una iglesia tiene configurada una pasarela de pago |
| POST | `/` | JWT | Settings.Edit | Crea o actualiza pasarelas (cifra las claves, aprovisiona webhooks y productos) |
| PATCH | `/:id` | JWT | Settings.Edit | Actualiza parcialmente una pasarela |
| DELETE | `/:id` | JWT | Settings.Edit | Elimina una pasarela (también elimina sus webhooks) |

### Ejemplo: verificar la configuración de la pasarela

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
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Lista todos los clientes |
| GET | `/:id` | JWT | Donations.ViewSummary o su propio registro | Obtiene un cliente por ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary o su propio registro | Obtiene las suscripciones de la pasarela de un cliente |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina un cliente |

## Suscripciones

Ruta base: `/giving/subscriptions`

Administra las suscripciones de donaciones recurrentes. No hay rutas CRUD base habilitadas; todos los endpoints son personalizados.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Lista todas las suscripciones |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtiene una suscripción por ID |
| POST | `/` | JWT | Donations.Edit o la propia suscripción | Actualiza suscripciones en la pasarela de pago |
| DELETE | `/:id` | JWT | Donations.Edit o la propia suscripción | Cancela una suscripción y la elimina de la base de datos. Cuerpo: `{ provider, reason }` |

## Fondos de suscripción

Ruta base: `/giving/subscriptionfunds`

Registra las asignaciones de fondos de las suscripciones recurrentes. No hay rutas CRUD base habilitadas; todos los endpoints son personalizados.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View o la propia suscripción | Lista los fondos de suscripción. Filtra con `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtiene un fondo de suscripción por ID |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina un fondo de suscripción |
| DELETE | `/subscription/:id` | JWT | Donations.Edit o la propia suscripción | Elimina todos los fondos de una suscripción |

## Métodos de pago

Ruta base: `/giving/paymentmethods`

Administra los métodos de pago guardados (tarjetas, cuentas bancarias) mediante las API de las pasarelas de pago. No hay rutas CRUD base habilitadas; todos los endpoints son personalizados.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View o el propio personId | Obtiene todos los métodos de pago guardados de una persona (tarjetas, cuentas bancarias) |
| POST | `/addcard` | JWT | — | Asocia un método de pago con tarjeta. Cuerpo: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit o el propio personId | Actualiza los datos de la tarjeta. Cuerpo: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit o el propio personId | Crea un SetupIntent ACH de Stripe para vincular una cuenta bancaria. Cuerpo: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Pública | — | Crea un SetupIntent ACH anónimo para donaciones de invitados. Cuerpo: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit o el propio personId | Agrega una cuenta bancaria mediante un token (obsoleto; usa `ach-setup-intent`). Cuerpo: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit o el propio personId | Actualiza los datos de la cuenta bancaria. Cuerpo: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit o el propio cliente | Verifica una cuenta bancaria mediante microdepósitos. Cuerpo: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit o el propio cliente | Elimina un método de pago (tarjeta o cuenta bancaria) |

## Registro de eventos

Ruta base: `/giving/eventLog`

Extiende `GenericCrudController` con las rutas CRUD `getById`, `getAll`, `post` y `delete`. Registra los eventos de webhook de las pasarelas de pago para auditoría y deduplicación.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Lista todos los registros de eventos |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtiene un registro de evento por ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Obtiene los registros de eventos filtrados por tipo de evento |
| POST | `/` | JWT | Donations.Edit | Crea o actualiza registros de eventos |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina un registro de evento |

## Páginas relacionadas

- [Endpoints de membresía](./membership): personas, iglesias, grupos, roles y permisos
- [Autenticación y permisos](./authentication): flujo de inicio de sesión, JWT, OAuth y modelo de permisos
- [Estructura de módulos](../module-structure): patrones de organización del código
