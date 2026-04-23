---
title: "Puntos de Conexión de Giving"
---

# Puntos de Conexión de Giving

<div class="article-intro">

El módulo Giving gestiona donaciones, fondos, procesamiento de pagos, suscripciones y operaciones financieras relacionadas. Admite múltiples pasarelas de pago (Stripe, PayPal), gestiona donaciones de una sola vez y recurrentes, rastrea lotes de donaciones y proporciona procesamiento de webhooks para eventos de pago asincronos.

</div>

**Ruta base:** `/giving`

## Donaciones

Ruta base: `/giving/donations`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Donaciones.Ver o personId propio | Listar todas las donaciones. Filtrar por `?batchId=` o `?personId=` |
| GET | `/:id` | JWT | Donaciones.Ver | Obtener una donación por ID |
| GET | `/my` | JWT | — | Obtener las donaciones del usuario actual |
| GET | `/summary` | JWT | Donaciones.VerResumen | Obtener resumen de donaciones. Filtrar por `?startDate=&endDate=&type=`. Usar `type=person` para desglose por persona |
| GET | `/testEmail` | Público | — | Enviar un correo de prueba (desarrollo/depuración) |
| POST | `/` | JWT | Donaciones.Editar | Crear o actualizar donaciones (lote) |
| DELETE | `/:id` | JWT | Donaciones.Editar | Eliminar una donación |

### Ejemplo: Listar Donaciones por Lote

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

### Ejemplo: Obtener Resumen de Donaciones

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

## Lotes de Donaciones

Ruta base: `/giving/donationbatches`

Extiende `GenericCrudController` con rutas CRUD: `getById`, `getAll`, `post`, `delete`. La operación de eliminación también elimina todas las donaciones dentro del lote.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Donaciones.VerResumen | Listar todos los lotes de donaciones |
| GET | `/:id` | JWT | Donaciones.VerResumen | Obtener un lote de donaciones por ID |
| POST | `/` | JWT | Donaciones.Editar | Crear o actualizar lotes de donaciones |
| DELETE | `/:id` | JWT | Donaciones.Editar | Eliminar un lote y todas sus donaciones |

## Donativos

Ruta base: `/giving/donate`

Gestiona el flujo de donación de cara al público incluyendo cargos, suscripciones, webhooks y cálculos de honorarios. No se habilitan rutas CRUD base; todos los puntos de conexión son personalizados.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/gateways/:churchId` | Público | — | Obtener pasarelas de pago disponibles para una iglesia (solo claves públicas) |
| POST | `/client-token` | JWT | — | Generar un token de cliente para inicialización de pasarela |
| POST | `/create-order` | JWT | — | Crear una orden de pago (estilo de compra PayPal) |
| POST | `/charge` | JWT | — | Procesar un cargo de donación de una sola vez |
| POST | `/subscribe` | JWT | — | Crear una suscripción de donación recurrente |
| POST | `/log` | Público | — | Registrar una donación. Cuerpo: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Público | — | Recibir eventos webhook de pago (Stripe, PayPal). Requiere `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donaciones.Editar | Reproducir eventos de Stripe para un rango de fechas. Cuerpo: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Público | — | Calcular honorarios de transacción. Cuerpo: `{ type, provider, gatewayId, amount, currency }`. Requiere `?churchId=` |
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

## Fondos

Ruta base: `/giving/funds`

Extiende `GenericCrudController` con rutas CRUD: `getById`, `getAll`, `post`, `delete`. El permiso `view` es `null` (no se requiere permiso para ver fondos).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Listar todos los fondos |
| GET | `/:id` | JWT | — | Obtener un fondo por ID |
| GET | `/churchId/:churchId` | Público | — | Obtener todos los fondos para una iglesia específica (público) |
| POST | `/` | JWT | Donaciones.Editar | Crear o actualizar fondos |
| DELETE | `/:id` | JWT | Donaciones.Editar | Eliminar un fondo |

## Donaciones de Fondos

Ruta base: `/giving/funddonations`

Rastrea cómo las donaciones individuales se asignan entre fondos. No se habilitan rutas CRUD base; todos los puntos de conexión son personalizados.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Donaciones.Ver | Listar donaciones de fondos. Filtrar por `?donationId=`, `?personId=`, `?fundId=` o `?fundName=`. Opcionalmente agregue `?startDate=&endDate=` para filtrado de fecha |
| GET | `/:id` | JWT | Donaciones.Ver | Obtener una donación de fondo por ID |
| GET | `/my` | JWT | — | Obtener las donaciones de fondos del usuario actual |
| POST | `/` | JWT | Donaciones.Editar | Crear o actualizar donaciones de fondos (lote) |
| DELETE | `/:id` | JWT | Donaciones.Editar | Eliminar una donación de fondo |

## Pasarelas

Ruta base: `/giving/gateways`

Gestiona configuraciones de pasarela de pago (Stripe, PayPal, etc.). No se habilitan rutas CRUD base; todos los puntos de conexión son personalizados. Los secretos de pasarela se cifran en reposo.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Listar todas las pasarelas para la iglesia |
| GET | `/:id` | JWT | Configuración.Editar | Obtener una pasarela por ID |
| GET | `/churchId/:churchId` | Público | — | Obtener pasarelas para una iglesia (solo claves públicas) |
| GET | `/configured/:churchId` | Público | — | Verificar si una iglesia tiene una pasarela de pago configurada |
| POST | `/` | JWT | Configuración.Editar | Crear o actualizar pasarelas (cifra claves, proporciona webhooks y productos) |
| PATCH | `/:id` | JWT | Configuración.Editar | Actualizar parcialmente una pasarela |
| DELETE | `/:id` | JWT | Configuración.Editar | Eliminar una pasarela (también elimina sus webhooks) |

### Ejemplo: Verificar Configuración de Pasarela

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

Extiende `GenericCrudController` con rutas CRUD: `getAll`, `delete`. Vincula personas a sus registros de cliente de pasarela de pago.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Donaciones.VerResumen | Listar todos los clientes |
| GET | `/:id` | JWT | Donaciones.VerResumen o registro propio | Obtener un cliente por ID |
| GET | `/:id/subscriptions` | JWT | Donaciones.VerResumen o registro propio | Obtener suscripciones de pasarela para un cliente |
| DELETE | `/:id` | JWT | Donaciones.Editar | Eliminar un cliente |

## Suscripciones

Ruta base: `/giving/subscriptions`

Gestiona suscripciones de donaciones recurrentes. No se habilitan rutas CRUD base; todos los puntos de conexión son personalizados.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Donaciones.VerResumen | Listar todas las suscripciones |
| GET | `/:id` | JWT | Donaciones.VerResumen | Obtener una suscripción por ID |
| POST | `/` | JWT | Donaciones.Editar o suscripción propia | Actualizar suscripciones con la pasarela de pago |
| DELETE | `/:id` | JWT | Donaciones.Editar o suscripción propia | Cancelar una suscripción y eliminarla de la base de datos. Cuerpo: `{ provider, reason }` |

## Fondos de Suscripción

Ruta base: `/giving/subscriptionfunds`

Rastrea asignaciones de fondos para suscripciones recurrentes. No se habilitan rutas CRUD base; todos los puntos de conexión son personalizados.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Donaciones.Ver o suscripción propia | Listar fondos de suscripción. Filtrar por `?subscriptionId=` |
| GET | `/:id` | JWT | Donaciones.VerResumen | Obtener un fondo de suscripción por ID |
| DELETE | `/:id` | JWT | Donaciones.Editar | Eliminar un fondo de suscripción |
| DELETE | `/subscription/:id` | JWT | Donaciones.Editar o suscripción propia | Eliminar todos los fondos para una suscripción |

## Métodos de Pago

Ruta base: `/giving/paymentmethods`

Gestiona métodos de pago almacenados (tarjetas, cuentas bancarias) a través de API de pasarelas de pago. No se habilitan rutas CRUD base; todos los puntos de conexión son personalizados.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/personid/:id` | JWT | Donaciones.Ver o personId propio | Obtener todos los métodos de pago almacenados para una persona (tarjetas, cuentas bancarias) |
| POST | `/addcard` | JWT | — | Adjuntar un método de pago de tarjeta. Cuerpo: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donaciones.Editar o personId propio | Actualizar detalles de tarjeta. Cuerpo: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donaciones.Editar o personId propio | Crear una Intención de Configuración ACH de Stripe para vincular cuentas bancarias. Cuerpo: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Público | — | Crear una Intención de Configuración ACH anónima para donaciones de invitados. Cuerpo: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donaciones.Editar o personId propio | Agregar una cuenta bancaria a través de token (obsoleto; usar `ach-setup-intent`). Cuerpo: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donaciones.Editar o personId propio | Actualizar detalles de cuenta bancaria. Cuerpo: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donaciones.Editar o cliente propio | Verificar una cuenta bancaria con micro-depósitos. Cuerpo: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donaciones.Editar o cliente propio | Eliminar un método de pago (tarjeta o cuenta bancaria) |

## Registro de Eventos

Ruta base: `/giving/eventLog`

Extiende `GenericCrudController` con rutas CRUD: `getById`, `getAll`, `post`, `delete`. Rastrea eventos webhook de pasarela de pago para auditoría y deduplicación.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Donaciones.VerResumen | Listar todos los registros de eventos |
| GET | `/:id` | JWT | Donaciones.VerResumen | Obtener un registro de eventos por ID |
| GET | `/type/:type` | JWT | Donaciones.VerResumen | Obtener registros de eventos filtrados por tipo de evento |
| POST | `/` | JWT | Donaciones.Editar | Crear o actualizar registros de eventos |
| DELETE | `/:id` | JWT | Donaciones.Editar | Eliminar un registro de eventos |

## Páginas Relacionadas

- [Puntos de Conexión de Membresía](./membership) -- Personas, iglesias, grupos, roles y permisos
- [Autenticación y Permisos](./authentication) -- Flujo de inicio de sesión, JWT, OAuth, modelo de permisos
- [Estructura de Módulo](../module-structure) -- Patrones de organización del código
