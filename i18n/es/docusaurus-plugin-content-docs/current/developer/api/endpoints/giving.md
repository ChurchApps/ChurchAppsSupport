---
title: "Puntos finales de donaciones"
---

# Puntos finales de donaciones

<div class="article-intro">

El módulo de donaciones gestiona donaciones, fondos, procesamiento de pagos, suscripciones y operaciones financieras relacionadas. Admite múltiples puertas de enlace de pago (Stripe, PayPal), maneja donaciones únicas y recurrentes, rastrea lotes de donaciones y proporciona procesamiento de webhooks para eventos de pago asincronos.

</div>

**Ruta base:** `/giving`

## Donaciones

Ruta base: `/giving/donations`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|-------|---------|-------------|
| GET | `/` | JWT | Donations.View or own personId | Enumera todas las donaciones. Filtra por `?batchId=` o `?personId=` |
| GET | `/:id` | JWT | Donations.View | Obtener una donación por ID |
| GET | `/my` | JWT | — | Obtener donaciones del usuario actual |
| GET | `/summary` | JWT | Donations.ViewSummary | Obtener resumen de donaciones. Filtra por `?startDate=&endDate=&type=`. Usa `type=person` para desglose por persona |
| GET | `/testEmail` | Público | — | Enviar un correo de prueba (desarrollo/depuración) |
| POST | `/` | JWT | Donations.Edit | Crear o actualizar donaciones (lote) |
| DELETE | `/:id` | JWT | Donations.Edit | Eliminar una donación |

### Ejemplo: Enumerar donaciones por lote

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

### Ejemplo: Obtener resumen de donación

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

Extiende `GenericCrudController` con rutas CRUD: `getById`, `getAll`, `post`, `delete`. La operación de eliminar también elimina todas las donaciones dentro del lote.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|-------|---------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Enumera todos los lotes de donaciones |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtener un lote de donaciones por ID |
| POST | `/` | JWT | Donations.Edit | Crear o actualizar lotes de donaciones |
| DELETE | `/:id` | JWT | Donations.Edit | Eliminar un lote y todas sus donaciones |

## Donar

Ruta base: `/giving/donate`

Maneja el flujo de donación frente al público incluyendo cargos, suscripciones, webhooks y cálculos de tarifas. No se habilitan rutas CRUD base; todos los puntos finales son personalizados.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|-------|---------|-------------|
| GET | `/gateways/:churchId` | Público | — | Obtener puertas de enlace de pago disponibles para una iglesia (solo claves públicas) |
| POST | `/client-token` | JWT | — | Generar un token de cliente para inicialización de puerta de enlace |
| POST | `/create-order` | JWT | — | Crear un pedido de pago (estilo de pago PayPal) |
| POST | `/charge` | JWT | — | Procesar un cargo de donación única |
| POST | `/subscribe` | JWT | — | Crear una suscripción de donación recurrente |
| POST | `/log` | Público | — | Registrar una donación. Cuerpo: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Público | — | Recibir eventos de webhook de pago (Stripe, PayPal). Requiere `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Reproducir eventos de Stripe para un rango de fechas. Cuerpo: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Público | — | Calcular tarifas de transacción. Cuerpo: `{ type, provider, gatewayId, amount, currency }`. Requiere `?churchId=` |
| POST | `/captcha-verify` | Público | — | Verificar token de reCAPTCHA. Cuerpo: `{ token }` |

### Ejemplo: Procesar un cargo de donación

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

## Fondos

Ruta base: `/giving/funds`

Extiende `GenericCrudController` con rutas CRUD: `getById`, `getAll`, `post`, `delete`. El permiso de `view` es `null` (no se requiere permiso para ver fondos).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|-------|---------|-------------|
| GET | `/` | JWT | — | Enumera todos los fondos |
| GET | `/:id` | JWT | — | Obtener un fondo por ID |
| GET | `/churchId/:churchId` | Público | — | Obtener todos los fondos para una iglesia específica (público) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Público | — | Obtener el total de donaciones de un fondo: `{ fundId, totalAmount, donationCount }`. Alimenta el elemento `campaignProgress` del generador de sitios web |
| POST | `/` | JWT | Donations.Edit | Crear o actualizar fondos |
| DELETE | `/:id` | JWT | Donations.Edit | Eliminar un fondo |

## Página relacionada

- [Puntos finales de membresía](./membership) — Personas, iglesias, grupos, roles y permisos
- [Autenticación y permisos](./authentication) — Flujo de inicio de sesión, JWT, OAuth, modelo de permiso
- [Estructura del módulo](../module-structure) — Patrones de organización del código
