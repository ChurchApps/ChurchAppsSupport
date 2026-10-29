---
title: "Endpoints de Giving"
---

# Endpoints de Giving

<div class="article-intro">

El módulo Giving administra las donaciones, los fondos, el procesamiento de pagos, las suscripciones y las operaciones financieras relacionadas. Admite varias pasarelas de pago (Stripe, PayPal), gestiona donaciones únicas y recurrentes, lleva el registro de los lotes de donaciones y ofrece procesamiento de webhooks para los eventos de pago asíncronos.

</div>

**Ruta base:** `/giving`

## Donaciones

Ruta base: `/giving/donations`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Donations.View o su propio personId | Listar todas las donaciones. Filtre con `?batchId=` o `?personId=`. Con `?personId=`, los regalos a fondos no deducibles se excluyen (como en los estados de cuenta de donaciones) a menos que quien llama con Donations.View añada `&includeNonDeductible=1`, lo que hace el registro de persona de B1Admin |
| GET | `/:id` | JWT | Donations.View | Obtener una donación por ID |
| GET | `/my` | JWT | — | Obtener las donaciones del usuario actual |
| GET | `/my/summary?year=` | JWT | — | Total de donaciones del usuario actual en un año (por defecto, este año): `{ year, total, count, currency, isConverted }`, con los totales convertidos a la moneda de la iglesia. Respalda la vista previa de donaciones en la página de inicio del miembro |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | Donaciones con fecha dentro del rango (inclusive). Ambas fechas son obligatorias en formato `YYYY-MM-DD`; de lo contrario, `400`. Las páginas de estados de cuenta de donaciones de B1Admin solicitan así un año calendario en lugar de todo el historial de la iglesia |
| GET | `/summary` | JWT | Donations.ViewSummary | Obtener el resumen de donaciones. Filtre con `?startDate=&endDate=&type=`. Use `type=person` para el desglose por persona |
| GET | `/testEmail` | Pública | — | Enviar un correo de prueba (desarrollo/depuración) |
| POST | `/` | JWT | Donations.Edit o Donations.Enter | Crear o actualizar donaciones (por lote). Solo con Donations.Enter, tanto el lote de destino como (en caso de actualización) el lote actual de la donación deben estar abiertos, y no se pueden modificar los regalos de pasarela (los que tienen `transactionId`); de lo contrario, `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit o Donations.Enter | Eliminar una donación. Solo Donations.Enter: la donación debe estar en un lote abierto y no ser un regalo de pasarela; de lo contrario, `403` |

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

Extiende `GenericCrudController` con las rutas CRUD: `getById`, `getAll`, `post`, `delete`. La operación de eliminación también elimina todas las donaciones del lote.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Donations.ViewSummary o Donations.Enter | Listar todos los lotes de donaciones |
| GET | `/:id` | JWT | Donations.ViewSummary o Donations.Enter | Obtener un lote de donaciones por ID |
| POST | `/` | JWT | Donations.Edit o Donations.Enter | Crear o actualizar lotes de donaciones. Solo Donations.Enter: actualizar un lote existente requiere que esté abierto; de lo contrario, `403 { "error": "This batch is closed." }`. `status` se ignora aquí, por lo que guardar un lote no puede reabrirlo |
| POST | `/:id/close` | JWT | Donations.Edit | Cerrar un lote: establece `status` en `closed`, `closedDate` en la fecha y hora actuales, y `closedBy` en el ID de usuario de quien llama. Devuelve el lote |
| POST | `/:id/reopen` | JWT | Donations.Edit | Reabrir un lote: establece `status` en `open` y limpia `closedDate` y `closedBy`. Devuelve el lote |
| DELETE | `/:id` | JWT | Donations.Edit | Eliminar un lote y todas sus donaciones |

Cada lote incluye `status` (`open` o `closed`; los lotes nuevos y los existentes son `open`), `closedDate` y `closedBy`. Donations.Edit puede cambiar donaciones en cualquier lote; Donations.Enter (que se muestra como **Ingresar donaciones** en el editor de roles) solo puede agregar, cambiar o eliminar donaciones y divisiones de fondos mientras su lote está abierto.

## Donar

Ruta base: `/giving/donate`

Gestiona el flujo de donación público, incluidos los cargos, las suscripciones, los webhooks y los cálculos de comisiones. No hay rutas CRUD base habilitadas; todos los endpoints son personalizados.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/gateways/:churchId` | Pública | — | Obtener las pasarelas de pago disponibles para una iglesia (solo claves públicas) |
| POST | `/client-token` | JWT | — | Generar un token de cliente para inicializar la pasarela |
| POST | `/create-order` | JWT | — | Crear una orden de pago (checkout al estilo PayPal) |
| POST | `/charge` | JWT | — | Procesar un cargo de donación única |
| POST | `/subscribe` | JWT | — | Crear una suscripción de donación recurrente |
| POST | `/log` | Pública | — | Registrar una donación. Cuerpo: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Pública | — | Recibir eventos de webhook de pago (Stripe, PayPal). Requiere `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Reproducir eventos de Stripe para un rango de fechas. Cuerpo: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Pública | — | Calcular las comisiones de transacción. Cuerpo: `{ type, provider, gatewayId, amount, currency }`. Requiere `?churchId=` |
| POST | `/captcha-verify` | Pública | — | Verificar el token de reCAPTCHA. Cuerpo: `{ token, churchId? }`. Una respuesta humana devuelve `{ response: "human", pass }`, donde `pass` es un pase firmado de donación para invitados válido por 10 minutos (y solo para `churchId` cuando se envía uno) |

Cuando la API se ejecuta con `CAPTCHA_ENFORCE=true`, las llamadas de invitados (no autenticados) a `/giving/donate/create-order`, `/charge`, `/subscribe`, `/giving/paymentmethods/addcard` y `/giving/paymentmethods/ach-setup-intent-anon` deben incluir ese `captchaPass` en el cuerpo; de lo contrario, devuelven 403 `Captcha verification required`. El pase puede reutilizarse hasta que caduque, porque el flujo de invitados de Stripe hace dos llamadas (agregar tarjeta y luego cobrar). Las llamadas de usuarios autenticados no se ven afectadas. `CAPTCHA_ENFORCE` tiene como valor predeterminado `false`; los formularios de donación para invitados de `@churchapps/apphelper` envían el pase automáticamente.

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

Extiende `GenericCrudController` con las rutas CRUD: `getById`, `getAll`, `post`, `delete`. El permiso `view` es `null` (no se requiere permiso para ver los fondos).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Listar todos los fondos |
| GET | `/:id` | JWT | — | Obtener un fondo por ID |
| GET | `/churchId/:churchId` | Pública | — | Obtener todos los fondos de una iglesia específica (público) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Pública | — | Obtener el total de donaciones de un fondo: `{ fundId, totalAmount, donationCount }`. Alimenta el elemento `campaignProgress` del creador de sitios web |
| POST | `/` | JWT | Donations.Edit | Crear o actualizar fondos |
| DELETE | `/:id` | JWT | Donations.Edit | Eliminar un fondo |

## Donaciones de fondos

Ruta base: `/giving/funddonations`

Registra cómo se asignan las donaciones individuales a los fondos. No hay rutas CRUD base habilitadas; todos los endpoints son personalizados.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Donations.View | Listar donaciones de fondos. Filtre con `?donationId=`, `?personId=`, `?fundId=` o `?fundName=`. Opcionalmente agregue `?startDate=&endDate=` para filtrar por fecha |
| GET | `/:id` | JWT | Donations.View | Obtener una donación de fondo por ID |
| GET | `/my` | JWT | — | Obtener las donaciones de fondos del usuario actual |
| POST | `/` | JWT | Donations.Edit o Donations.Enter | Crear o actualizar donaciones de fondos (por lote). Solo Donations.Enter: la donación padre debe estar en un lote abierto y no ser un regalo de pasarela; de lo contrario, `403` |
| DELETE | `/:id` | JWT | Donations.Edit o Donations.Enter | Eliminar una donación de fondo. La misma regla de lote abierto aplica para Donations.Enter |

## Pasarelas

Ruta base: `/giving/gateways`

Administra las configuraciones de las pasarelas de pago (Stripe, PayPal, etc.). No hay rutas CRUD base habilitadas; todos los endpoints son personalizados. Los secretos de la pasarela se cifran en reposo.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Listar todas las pasarelas de la iglesia |
| GET | `/:id` | JWT | Settings.Edit | Obtener una pasarela por ID |
| GET | `/churchId/:churchId` | Pública | — | Obtener las pasarelas de una iglesia (solo claves públicas) |
| GET | `/configured/:churchId` | Pública | — | Verificar si una iglesia tiene una pasarela de pago configurada |
| POST | `/` | JWT | Settings.Edit | Crear o actualizar pasarelas (cifra las claves, aprovisiona webhooks y productos) |
| PATCH | `/:id` | JWT | Settings.Edit | Actualizar parcialmente una pasarela |
| DELETE | `/:id` | JWT | Settings.Edit | Eliminar una pasarela (también elimina sus webhooks) |

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

Extiende `GenericCrudController` con las rutas CRUD: `getAll`, `delete`. Vincula personas con sus registros de cliente en la pasarela de pago.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Listar todos los clientes |
| GET | `/:id` | JWT | Donations.ViewSummary o su propio registro | Obtener un cliente por ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary o su propio registro | Obtener las suscripciones de la pasarela de un cliente |
| DELETE | `/:id` | JWT | Donations.Edit | Eliminar un cliente |

## Suscripciones

Ruta base: `/giving/subscriptions`

Administra las suscripciones de donaciones recurrentes. No hay rutas CRUD base habilitadas; todos los endpoints son personalizados.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Listar todas las suscripciones |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtener una suscripción por ID |
| POST | `/` | JWT | Donations.Edit o su propia suscripción | Actualizar suscripciones con la pasarela de pago |
| DELETE | `/:id` | JWT | Donations.Edit o su propia suscripción | Cancelar una suscripción y eliminarla de la base de datos. Cuerpo: `{ provider, reason }` |

## Fondos de suscripciones

Ruta base: `/giving/subscriptionfunds`

Registra las asignaciones de fondos para las suscripciones recurrentes. No hay rutas CRUD base habilitadas; todos los endpoints son personalizados.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Donations.View o su propia suscripción | Listar los fondos de suscripciones. Filtre con `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtener un fondo de suscripción por ID |
| DELETE | `/:id` | JWT | Donations.Edit | Eliminar un fondo de suscripción |
| DELETE | `/subscription/:id` | JWT | Donations.Edit o su propia suscripción | Eliminar todos los fondos de una suscripción |

## Métodos de pago

Ruta base: `/giving/paymentmethods`

Administra los métodos de pago guardados (tarjetas, cuentas bancarias) mediante las API de la pasarela de pago. No hay rutas CRUD base habilitadas; todos los endpoints son personalizados.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/personid/:id` | JWT | Donations.View o su propio personId | Obtener todos los métodos de pago guardados de una persona (tarjetas, cuentas bancarias) |
| POST | `/addcard` | JWT | — | Asociar un método de pago con tarjeta. Cuerpo: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit o su propio personId | Actualizar los datos de la tarjeta. Cuerpo: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit o su propio personId | Crear un SetupIntent ACH de Stripe para vincular una cuenta bancaria. Cuerpo: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Pública | — | Crear un SetupIntent ACH anónimo para donaciones de invitados. Cuerpo: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit o su propio personId | Agregar una cuenta bancaria mediante un token (obsoleto; use `ach-setup-intent`). Cuerpo: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit o su propio personId | Actualizar los datos de la cuenta bancaria. Cuerpo: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit o su propio cliente | Verificar una cuenta bancaria con microdepósitos. Cuerpo: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit o su propio cliente | Eliminar un método de pago (tarjeta o cuenta bancaria) |

## Registro de eventos

Ruta base: `/giving/eventLog`

Extiende `GenericCrudController` con las rutas CRUD: `getById`, `getAll`, `post`, `delete`. Registra los eventos de webhooks de la pasarela de pago para auditoría y deduplicación.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Listar todos los registros de eventos |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtener un registro de evento por ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Obtener registros de eventos filtrados por tipo de evento |
| POST | `/` | JWT | Donations.Edit | Crear o actualizar registros de eventos |
| DELETE | `/:id` | JWT | Donations.Edit | Eliminar un registro de evento |

## Páginas relacionadas

- [Endpoints de Membership](./membership) — Personas, iglesias, grupos, roles y permisos
- [Autenticación y permisos](./authentication) — Flujo de inicio de sesión, JWT, OAuth, modelo de permisos
- [Estructura del módulo](../module-structure) — Patrones de organización del código
