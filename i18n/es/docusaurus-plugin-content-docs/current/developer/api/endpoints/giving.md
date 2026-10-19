---
title: "Endpoints de Donaciones"
---

# Endpoints de Donaciones

<div class="article-intro">

El módulo de Donaciones gestiona las donaciones, los fondos, el procesamiento de pagos, las suscripciones y las operaciones financieras relacionadas. Es compatible con varias pasarelas de pago (Stripe, PayPal), gestiona donaciones únicas y recurrentes, lleva el registro de los lotes de donaciones y procesa los webhooks para eventos de pago asíncronos.

</div>

**Ruta base:** `/giving`

## Donaciones

Ruta base: `/giving/donations`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Donations.View o su propio personId | Listar todas las donaciones. Filtrar con `?batchId=` o `?personId=`. Con `?personId=`, se excluyen los obsequios a fondos no deducibles (como en los estados de cuenta de donaciones), salvo que un solicitante con Donations.View agregue `&includeNonDeductible=1`, lo que hace la página de registro de persona de B1Admin |
| GET | `/:id` | JWT | Donations.View | Obtener una donación por ID |
| GET | `/my` | JWT | — | Obtener las donaciones del usuario actual |
| GET | `/my/summary?year=` | JWT | — | Total de donaciones del usuario actual para un año (por defecto, el año en curso): `{ year, total, count, currency, isConverted }`, con los totales convertidos a la moneda de la iglesia. Alimenta la vista previa de donaciones en la página de inicio de miembros |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | Donaciones con fecha dentro del rango (inclusive). Ambas fechas son obligatorias en formato `YYYY-MM-DD`; de lo contrario, `400`. Las páginas de estados de cuenta de donaciones de B1Admin solicitan así un año calendario en lugar de todo el historial de la iglesia |
| GET | `/summary` | JWT | Donations.ViewSummary | Obtener el resumen de donaciones. Filtrar con `?startDate=&endDate=&type=`. Use `type=person` para el desglose por persona |
| GET | `/testEmail` | Pública | — | Enviar un correo electrónico de prueba (desarrollo y depuración) |
| POST | `/` | JWT | Donations.Edit o Donations.Enter | Crear o actualizar donaciones (por lotes). Solo con Donations.Enter, tanto el lote de destino como (en caso de actualización) el lote actual de la donación deben estar abiertos, y los obsequios de pasarela (los que tienen `transactionId`) no pueden modificarse; de lo contrario, `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit o Donations.Enter | Eliminar una donación. Solo Donations.Enter: la donación debe estar en un lote abierto y no ser un obsequio de pasarela; de lo contrario, `403` |

### Ejemplo: Listar donaciones por lote

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

### Ejemplo: Obtener el resumen de donaciones

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

Amplía `GenericCrudController` con las rutas CRUD: `getById`, `getAll`, `post`, `delete`. La operación de eliminación también elimina todas las donaciones del lote.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Donations.ViewSummary o Donations.Enter | Listar todos los lotes de donaciones |
| GET | `/:id` | JWT | Donations.ViewSummary o Donations.Enter | Obtener un lote de donaciones por ID |
| POST | `/` | JWT | Donations.Edit o Donations.Enter | Crear o actualizar lotes de donaciones. Solo Donations.Enter: para actualizar un lote existente, este debe estar abierto; de lo contrario, `403 { "error": "This batch is closed." }`. `status` se ignora aquí, por lo que guardar un lote no puede reabrirlo |
| POST | `/:id/close` | JWT | Donations.Edit | Cerrar un lote: establece `status` en `closed`, `closedDate` en la fecha actual y `closedBy` en el ID del usuario que realiza la llamada. Devuelve el lote |
| POST | `/:id/reopen` | JWT | Donations.Edit | Reabrir un lote: establece `status` en `open` y limpia `closedDate` y `closedBy`. Devuelve el lote |
| DELETE | `/:id` | JWT | Donations.Edit | Eliminar un lote y todas sus donaciones |

Cada lote incluye `status` (`open` o `closed`; los lotes nuevos y los existentes son `open`), `closedDate` y `closedBy`. Donations.Edit puede modificar donaciones en cualquier lote; Donations.Enter (mostrado como **Ingresar donaciones** en el editor de roles) solo puede agregar, modificar o eliminar donaciones y distribuciones por fondo mientras su lote esté abierto.

## Donar

Ruta base: `/giving/donate`

Gestiona el flujo de donación público, incluidos los cargos, las suscripciones, los webhooks y el cálculo de comisiones. No hay rutas CRUD base habilitadas; todos los endpoints son personalizados.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/gateways/:churchId` | Pública | — | Obtener las pasarelas de pago disponibles para una iglesia (solo claves públicas) |
| POST | `/client-token` | JWT | — | Generar un token de cliente para inicializar la pasarela |
| POST | `/create-order` | JWT | — | Crear una orden de pago (flujo de pago estilo PayPal) |
| POST | `/charge` | JWT | — | Procesar un cargo de donación única |
| POST | `/subscribe` | JWT | — | Crear una suscripción de donación recurrente |
| POST | `/log` | Pública | — | Registrar una donación. Cuerpo: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Pública | — | Recibir eventos de webhook de pago (Stripe, PayPal). Requiere `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Reproducir eventos de Stripe en un rango de fechas. Cuerpo: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Pública | — | Calcular las comisiones de transacción. Cuerpo: `{ type, provider, gatewayId, amount, currency }`. Requiere `?churchId=` |
| POST | `/captcha-verify` | Pública | — | Verificar el token de reCAPTCHA. Cuerpo: `{ token }` |

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

### Ejemplo: Crear una suscripción recurrente

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

Amplía `GenericCrudController` con las rutas CRUD: `getById`, `getAll`, `post`, `delete`. El permiso `view` es `null` (no se requiere permiso para ver los fondos).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Listar todos los fondos |
| GET | `/:id` | JWT | — | Obtener un fondo por ID |
| GET | `/churchId/:churchId` | Pública | — | Obtener todos los fondos de una iglesia específica (público) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Pública | — | Obtener el total de donaciones de un fondo: `{ fundId, totalAmount, donationCount }`. Alimenta el elemento `campaignProgress` del creador de sitios web |
| POST | `/` | JWT | Donations.Edit | Crear o actualizar fondos |
| DELETE | `/:id` | JWT | Donations.Edit | Eliminar un fondo |

## Donaciones por fondo

Ruta base: `/giving/funddonations`

Registra cómo se distribuye cada donación entre los fondos. No hay rutas CRUD base habilitadas; todos los endpoints son personalizados.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Donations.View | Listar donaciones por fondo. Filtrar con `?donationId=`, `?personId=`, `?fundId=` o `?fundName=`. Opcionalmente, agregue `?startDate=&endDate=` para filtrar por fecha |
| GET | `/:id` | JWT | Donations.View | Obtener una donación por fondo por ID |
| GET | `/my` | JWT | — | Obtener las donaciones por fondo del usuario actual |
| POST | `/` | JWT | Donations.Edit o Donations.Enter | Crear o actualizar donaciones por fondo (por lotes). Solo Donations.Enter: la donación principal debe estar en un lote abierto y no ser un obsequio de pasarela; de lo contrario, `403` |
| DELETE | `/:id` | JWT | Donations.Edit o Donations.Enter | Eliminar una donación por fondo. Se aplica la misma regla de lote abierto para Donations.Enter |

## Pasarelas

Ruta base: `/giving/gateways`

Gestiona la configuración de las pasarelas de pago (Stripe, PayPal, etc.). No hay rutas CRUD base habilitadas; todos los endpoints son personalizados. Los secretos de las pasarelas se cifran en reposo.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Listar todas las pasarelas de la iglesia |
| GET | `/:id` | JWT | Settings.Edit | Obtener una pasarela por ID |
| GET | `/churchId/:churchId` | Pública | — | Obtener las pasarelas de una iglesia (solo claves públicas) |
| GET | `/configured/:churchId` | Pública | — | Verificar si una iglesia tiene una pasarela de pago configurada |
| POST | `/` | JWT | Settings.Edit | Crear o actualizar pasarelas (cifra las claves, aprovisiona webhooks y productos) |
| PATCH | `/:id` | JWT | Settings.Edit | Actualizar parcialmente una pasarela |
| DELETE | `/:id` | JWT | Settings.Edit | Eliminar una pasarela (también elimina sus webhooks) |

### Ejemplo: Verificar la configuración de la pasarela

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

Amplía `GenericCrudController` con las rutas CRUD: `getAll`, `delete`. Vincula a las personas con sus registros de cliente en la pasarela de pago.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Listar todos los clientes |
| GET | `/:id` | JWT | Donations.ViewSummary o su propio registro | Obtener un cliente por ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary o su propio registro | Obtener las suscripciones de pasarela de un cliente |
| DELETE | `/:id` | JWT | Donations.Edit | Eliminar un cliente |

## Suscripciones

Ruta base: `/giving/subscriptions`

Gestiona las suscripciones de donación recurrente. No hay rutas CRUD base habilitadas; todos los endpoints son personalizados.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Listar todas las suscripciones |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtener una suscripción por ID |
| POST | `/` | JWT | Donations.Edit o su propia suscripción | Actualizar suscripciones con la pasarela de pago |
| DELETE | `/:id` | JWT | Donations.Edit o su propia suscripción | Cancelar una suscripción y eliminarla de la base de datos. Cuerpo: `{ provider, reason }` |

## Fondos de suscripciones

Ruta base: `/giving/subscriptionfunds`

Registra la distribución por fondos de las suscripciones recurrentes. No hay rutas CRUD base habilitadas; todos los endpoints son personalizados.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Donations.View o su propia suscripción | Listar los fondos de suscripciones. Filtrar con `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtener un fondo de suscripción por ID |
| DELETE | `/:id` | JWT | Donations.Edit | Eliminar un fondo de suscripción |
| DELETE | `/subscription/:id` | JWT | Donations.Edit o su propia suscripción | Eliminar todos los fondos de una suscripción |

## Métodos de pago

Ruta base: `/giving/paymentmethods`

Gestiona los métodos de pago guardados (tarjetas, cuentas bancarias) mediante las API de las pasarelas de pago. No hay rutas CRUD base habilitadas; todos los endpoints son personalizados.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/personid/:id` | JWT | Donations.View o su propio personId | Obtener todos los métodos de pago guardados de una persona (tarjetas, cuentas bancarias) |
| POST | `/addcard` | JWT | — | Asociar un método de pago con tarjeta. Cuerpo: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit o su propio personId | Actualizar los datos de la tarjeta. Cuerpo: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit o su propio personId | Crear un SetupIntent ACH de Stripe para vincular una cuenta bancaria. Cuerpo: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Pública | — | Crear un SetupIntent ACH anónimo para donaciones de invitados. Cuerpo: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit o su propio personId | Agregar una cuenta bancaria mediante token (obsoleto; use `ach-setup-intent`). Cuerpo: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit o su propio personId | Actualizar los datos de la cuenta bancaria. Cuerpo: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit o su propio cliente | Verificar una cuenta bancaria con microdepósitos. Cuerpo: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit o su propio cliente | Eliminar un método de pago (tarjeta o cuenta bancaria) |

## Registro de eventos

Ruta base: `/giving/eventLog`

Amplía `GenericCrudController` con las rutas CRUD: `getById`, `getAll`, `post`, `delete`. Registra los eventos de webhook de las pasarelas de pago para auditoría y deduplicación.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Listar todos los registros de eventos |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtener un registro de evento por ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Obtener los registros de eventos filtrados por tipo de evento |
| POST | `/` | JWT | Donations.Edit | Crear o actualizar registros de eventos |
| DELETE | `/:id` | JWT | Donations.Edit | Eliminar un registro de evento |

## Páginas relacionadas

- [Endpoints de Membresía](./membership) — Personas, iglesias, grupos, roles y permisos
- [Autenticación y permisos](./authentication) — Flujo de inicio de sesión, JWT, OAuth, modelo de permisos
- [Estructura del módulo](../module-structure) — Patrones de organización del código
