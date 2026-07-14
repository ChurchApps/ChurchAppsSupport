---
title: "Puntos Finales de Donaciones"
---

# Puntos Finales de Donaciones

<div class="article-intro">

El módulo de Donaciones gestiona donaciones, fondos, procesamiento de pagos, suscripciones, y operaciones financieras relacionadas. Admite múltiples pasarelas de pago (Stripe, PayPal), maneja donaciones únicas y recurrentes, rastrea lotes de donaciones, y proporciona procesamiento de webhooks para eventos de pago asíncronos.

</div>

**Ruta base:** `/giving`

## Donations

Ruta base: `/giving/donations`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | Donations.View o propio personId | Enumera todas las donaciones. Filtra por `?batchId=` o `?personId=` |
| GET | `/:id` | JWT | Donations.View | Obtener una donación por ID |
| GET | `/my` | JWT | — | Obtener donaciones del usuario actual |
| GET | `/summary` | JWT | Donations.ViewSummary | Obtener resumen de donaciones. Filtra por `?startDate=&endDate=&type=`. Usa `type=person` para desglose por persona |
| GET | `/testEmail` | Público | — | Enviar un correo de prueba (desarrollo/depuración) |
| POST | `/` | JWT | Donations.Edit | Crear o actualizar donaciones (lote) |
| DELETE | `/:id` | JWT | Donations.Edit | Eliminar una donación |

### Ejemplo: Enumerar Donaciones por Lote

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

### Ejemplo: Obtener Resumen de Donación

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

## Donation Batches

Ruta base: `/giving/donationbatches`

Extiende `GenericCrudController` con rutas CRUD: `getById`, `getAll`, `post`, `delete`. La operación de eliminar también elimina todas las donaciones dentro del lote.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Enumera todos los lotes de donaciones |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtener un lote de donaciones por ID |
| POST | `/` | JWT | Donations.Edit | Crear o actualizar lotes de donaciones |
| DELETE | `/:id` | JWT | Donations.Edit | Eliminar un lote y todas sus donaciones |

## Donate

Ruta base: `/giving/donate`

Maneja el flujo de donación de cara al público incluyendo cargos, suscripciones, webhooks, y cálculos de tarifas. No se habilitan rutas CRUD base; todos los puntos finales son personalizados.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/gateways/:churchId` | Público | — | Obtener pasarelas de pago disponibles para una iglesia (solo claves públicas) |
| POST | `/client-token` | JWT | — | Generar un token de cliente para inicialización de pasarela |
| POST | `/create-order` | JWT | — | Crear un pedido de pago (estilo de pago PayPal) |
| POST | `/charge` | JWT | — | Procesar un cargo de donación única |
| POST | `/subscribe` | JWT | — | Crear una suscripción de donación recurrente |
| POST | `/log` | Público | — | Registrar una donación. Cuerpo: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Público | — | Recibir eventos de webhook de pago (Stripe, PayPal). Requiere `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Reproducir eventos de Stripe para un rango de fechas. Cuerpo: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Público | — | Calcular tarifas de transacción. Cuerpo: `{ type, provider, gatewayId, amount, currency }`. Requiere `?churchId=` |
| POST | `/captcha-verify` | Público | — | Verificar token de reCAPTCHA. Cuerpo: `{ token }` |

### Ejemplo: Procesar un Cargo de Donación

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

### Ejemplo: Crear una Suscripción Recurrente

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

## Funds

Ruta base: `/giving/funds`

Extiende `GenericCrudController` con rutas CRUD: `getById`, `getAll`, `post`, `delete`. El permiso de `view` es `null` (no se requiere permiso para ver fondos).

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | — | Enumera todos los fondos |
| GET | `/:id` | JWT | — | Obtener un fondo por ID |
| GET | `/churchId/:churchId` | Público | — | Obtener todos los fondos para una iglesia específica (público) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Público | — | Obtener el total de donaciones de un fondo: `{ fundId, totalAmount, donationCount }`. Alimenta el elemento `campaignProgress` del generador de sitios web |
| POST | `/` | JWT | Donations.Edit | Crear o actualizar fondos |
| DELETE | `/:id` | JWT | Donations.Edit | Eliminar un fondo |

## Fund Donations

Ruta base: `/giving/funddonations`

Rastrea cómo se asignan las donaciones individuales entre fondos. No se habilitan rutas CRUD base; todos los puntos finales son personalizados.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | Donations.View | Enumera donaciones de fondo. Filtra por `?donationId=`, `?personId=`, `?fundId=`, o `?fundName=`. Opcionalmente agrega `?startDate=&endDate=` para filtrado por fecha |
| GET | `/:id` | JWT | Donations.View | Obtener una donación de fondo por ID |
| GET | `/my` | JWT | — | Obtener las donaciones de fondo del usuario actual |
| POST | `/` | JWT | Donations.Edit | Crear o actualizar donaciones de fondo (lote) |
| DELETE | `/:id` | JWT | Donations.Edit | Eliminar una donación de fondo |

## Gateways

Ruta base: `/giving/gateways`

Gestiona configuraciones de pasarela de pago (Stripe, PayPal, etc.). No se habilitan rutas CRUD base; todos los puntos finales son personalizados. Los secretos de pasarela se encriptan en reposo.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | — | Enumera todas las pasarelas de la iglesia |
| GET | `/:id` | JWT | Settings.Edit | Obtener una pasarela por ID |
| GET | `/churchId/:churchId` | Público | — | Obtener pasarelas para una iglesia (solo claves públicas) |
| GET | `/configured/:churchId` | Público | — | Verificar si una iglesia tiene una pasarela de pago configurada |
| POST | `/` | JWT | Settings.Edit | Crear o actualizar pasarelas (encripta claves, aprovisiona webhooks y productos) |
| PATCH | `/:id` | JWT | Settings.Edit | Actualizar parcialmente una pasarela |
| DELETE | `/:id` | JWT | Settings.Edit | Eliminar una pasarela (también elimina sus webhooks) |

### Ejemplo: Verificar Configuración de Pasarela

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## Customers

Ruta base: `/giving/customers`

Extiende `GenericCrudController` con rutas CRUD: `getAll`, `delete`. Vincula personas a sus registros de cliente de pasarela de pago.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Enumera todos los clientes |
| GET | `/:id` | JWT | Donations.ViewSummary o registro propio | Obtener un cliente por ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary o registro propio | Obtener suscripciones de pasarela para un cliente |
| DELETE | `/:id` | JWT | Donations.Edit | Eliminar un cliente |

## Subscriptions

Ruta base: `/giving/subscriptions`

Gestiona suscripciones de donación recurrentes. No se habilitan rutas CRUD base; todos los puntos finales son personalizados.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Enumera todas las suscripciones |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtener una suscripción por ID |
| POST | `/` | JWT | Donations.Edit o suscripción propia | Actualizar suscripciones con la pasarela de pago |
| DELETE | `/:id` | JWT | Donations.Edit o suscripción propia | Cancelar una suscripción y eliminar de la base de datos. Cuerpo: `{ provider, reason }` |

## Subscription Funds

Ruta base: `/giving/subscriptionfunds`

Rastrea asignaciones de fondo para suscripciones recurrentes. No se habilitan rutas CRUD base; todos los puntos finales son personalizados.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | Donations.View o suscripción propia | Enumera fondos de suscripción. Filtra por `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtener un fondo de suscripción por ID |
| DELETE | `/:id` | JWT | Donations.Edit | Eliminar un fondo de suscripción |
| DELETE | `/subscription/:id` | JWT | Donations.Edit o suscripción propia | Eliminar todos los fondos de una suscripción |

## Payment Methods

Ruta base: `/giving/paymentmethods`

Gestiona métodos de pago almacenados (tarjetas, cuentas bancarias) a través de las APIs de la pasarela de pago. No se habilitan rutas CRUD base; todos los puntos finales son personalizados.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/personid/:id` | JWT | Donations.View o propio personId | Obtener todos los métodos de pago almacenados para una persona (tarjetas, cuentas bancarias) |
| POST | `/addcard` | JWT | — | Adjuntar un método de pago con tarjeta. Cuerpo: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit o propio personId | Actualizar detalles de tarjeta. Cuerpo: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit o propio personId | Crear un SetupIntent de ACH de Stripe para vinculación de cuenta bancaria. Cuerpo: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Público | — | Crear un SetupIntent de ACH anónimo para donaciones de invitado. Cuerpo: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit o propio personId | Agregar una cuenta bancaria vía token (obsoleto; usa `ach-setup-intent`). Cuerpo: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit o propio personId | Actualizar detalles de cuenta bancaria. Cuerpo: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit o cliente propio | Verificar una cuenta bancaria con micro-depósitos. Cuerpo: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit o cliente propio | Eliminar un método de pago (tarjeta o cuenta bancaria) |

## Event Log

Ruta base: `/giving/eventLog`

Extiende `GenericCrudController` con rutas CRUD: `getById`, `getAll`, `post`, `delete`. Rastrea eventos de webhook de pasarela de pago para auditoría y deduplicación.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Enumera todos los registros de evento |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtener un registro de evento por ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Obtener registros de evento filtrados por tipo de evento |
| POST | `/` | JWT | Donations.Edit | Crear o actualizar registros de evento |
| DELETE | `/:id` | JWT | Donations.Edit | Eliminar un registro de evento |

## Páginas Relacionadas

- [Puntos Finales de Membresía](./membership) — Personas, iglesias, grupos, roles, y permisos
- [Autenticación y Permisos](./authentication) — Flujo de inicio de sesión, JWT, OAuth, modelo de permisos
- [Estructura del Módulo](../module-structure) — Patrones de organización del código
