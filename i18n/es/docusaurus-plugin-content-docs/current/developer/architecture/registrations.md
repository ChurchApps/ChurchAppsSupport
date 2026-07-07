---
title: "Registros de Evento"
---

# Registros de Evento

<div class="article-intro">

El registro de evento nativo vive en el módulo de contenido y, desde la ola de registros pagados, lleva un modelo de comercio completo: tipos de asistentes con precio, selecciones de complementos con precio, códigos de descuento, pagos a través de la puerta de enlace de donación existente de la iglesia, y una lista de espera impulsada por estado. La ruta del dinero deliberadamente reutiliza la pila de donaciones — el controlador de registro cobra a través de la misma abstracción `GatewayService` / `IGatewayProvider` documentada en [Donaciones](./giving), por lo que ningún conocimiento de datos de tarjeta o SDK de puerta de enlace vive en el módulo de contenido. Esta página mapea el modelo de datos, las reglas de precios y capacidad, y los flujos de registro, pago, y lista de espera.

</div>

## Descripción General

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (portal de miembros)   │            │ Api — módulo de contenido                   │
│  asistente de registro ·     │   HTTPS    │  RegistrationController                     │
│  Mis Registros               │ ─────────▶ │  /content/registrations                     │
├──────────────────────────────┤            │  RegistrationPricingHelper (precios servidor)│
│ B1Admin (personal)           │            │  RegistrationHelper (correos)               │
│  configuración de registro  │            └───────────────┬─────────────────────────────┘
│  · lista · exportación CSV   │                            │ processCharge
└──────────────────────────────┘                            ▼
                                            ┌─────────────────────────────────────────────┐
                                            │ abstracción de puerta de enlace compartida  │
                                            │ GatewayService → IGatewayProvider          │
                                            │ Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

Tres reglas se sostienen en toda la pila:

1. **El servidor posee el precio.** Los clientes presentan ids de tipo, ids de selección, y cantidades; `RegistrationPricingHelper.computeTotal()` calcula el total del lado del servidor y los cupones se re-validan en el momento del cargo. Un monto suministrado por el cliente nunca es de confianza.
2. **La capacidad se aplica atómicamente en el momento de la inserción.** Cada inserción limitada de capacidad usa un enunciado `INSERT … SELECT … FROM dual WHERE (recuento de filas activas) < capacidad`, para que dos registros simultáneos no puedan ambos tomar el último lugar. Los recuentos se derivan del estado (`pending`/`confirmed`), nunca se almacenan.
3. **Los pagos montan los rieles de donación.** `RegistrationController` llama al `GatewayService.processCharge` compartido con la puerta de enlace configurada de la iglesia — la misma abstracción de proveedor, modelo de tokenización, y manejo de SCA que las donaciones.

## Modelo de datos (`Api/src/modules/content`)

Los modelos están en `models/Registration.ts`; mapeos de tabla en `db/DatabaseTypes.ts`; un repositorio por tabla bajo `repositories/`.

| Tabla | Significado | Campos clave |
|-------|---------|-----------|
| `registrations` | Un registro (un hogar/fiesta para un evento) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Un asistente en un registro | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Tipos de asistentes por evento (p. ej. Adulto / Niño) | eventId, nombre, descripción, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, activo |
| `registrationSelections` | Opciones de complemento nombradas con un precio (p. ej. Camiseta) | eventId, nombre, descripción, **price**, **capacity**, **maxQuantity** (límite por registro), sort, activo |
| `registrationSelectionChoices` | Cantidad de una selección elegida por un registro/miembro | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Un cargo exitoso contra un registro | registrationId, gatewayId, proveedor, transactionId, método, cantidad, moneda, tipo (`charge`), estado (`succeeded`), personId |
| `registrationCoupons` | Códigos de descuento por evento | eventId, código, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, activo |

Notas:

- **No hay tabla de lista de espera.** Las partes en lista de espera son filas `registrations` con `status = 'waitlisted'`; todo el ciclo de vida de la lista de espera es transiciones de estado en esa tabla única.
- **Sin contadores almacenados.** Los recuentos "Vendido" / "usado" (capacidad de evento, capacidad por tipo, capacidad por selección, usos de cupón) se calculan con subconsultas correlacionadas sobre filas cuyo estado está en `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Cancelar un registro libera capacidad sin contabilidad.
- Los precios son columnas MySQL DECIMAL (cadenas sobre el cable) coerced con `Number()` dentro del asistente de precios.

## Superficie REST

Todo está bajo `/content/registrations` (`controllers/RegistrationController.ts`), cerrado por `Permissions.registrations` (`view` / `edit`):

| Ruta | Acceso | Propósito |
|-------|--------|---------|
| `POST /register` | anónimo | Envío completo: invitado o miembro, precios de servidor, comprobaciones de capacidad, cargo opcional |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | público | Tipos/selecciones con derivados `used` / `remainingCapacity` para el asistente |
| `POST /types`, `DELETE /types/:id` (igual para `/selections`, `/coupons`) | `registrations.edit` | CRUD de configuración de personal |
| `POST /coupons/validate` | público | Validación de código de descuento en línea durante el asistente |
| `GET /coupons/event/:eventId` | personal | Cupones con recuentos de usos |
| `GET /event/:eventId` · `GET /event/:eventId/count` | personal · público | Lista · recuento activo para pantalla de capacidad |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | autenticado | Mis Registros, detalle, historial de pago |
| `PUT /:id` | propietario/personal | Edición posterior al envío — reemplaza miembros y opciones de selección con comprobaciones de capacidad atómica fresca, recalcula `totalAmount`; nunca cobra automáticamente ni reembolsa |
| `POST /:id/pay` | propietario | "Completar pago": cobra `totalAmount − amountPaid`, voltea `waitlisted`/`pending` → `confirmed` |
| `POST /:id/promote` | personal | Promoción manual de lista de espera |
| `POST /:id/cancel` · `DELETE /:id` | propietario · personal | Cancelar / eliminar; ambos desencadenan promoción automática de lista de espera |

Un registro existente no cancelado para el mismo `personId` en el mismo evento se rechaza con un 409, y cada registro creado emite un webhook `registration.created` a través de `WebhookDispatcher`.

## Precios y códigos de descuento

`helpers/RegistrationPricingHelper.ts` es la autoridad única de matemáticas de dinero:

- `computeTotal()` suma el precio de tipo de cada miembro más el `price × quantity` de cada opción de selección.
- `validateCoupon()` aplica bandera activa, ventana de fecha (`startDate`/`endDate`), `minMembers` contra el tamaño de la fiesta presentada, y `maxUses` contra el recuento de redención derivado del estado.
- `applyDiscount()` — `percent` resta `total × value/100`; `amount` resta `value`; ambos cero de piso.

El asistente llama a `POST /coupons/validate` para retroalimentación en línea, pero `register` re-valida y re-aplica el cupón del lado del servidor — el total mostrado por el cliente es solo consultivo.

## El idioma de capacidad atómica

Cada inserción limitada de capacidad carrera de forma segura sin transacciones o bloqueos haciendo que la comprobación de capacidad sea parte de la `INSERT` misma. Nivel de evento (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Cero filas afectadas significa "en capacidad". El mismo idioma protege inserciones por tipo (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, contando miembros unidos a registros activos) y cantidades por selección (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, usando `COALESCE(SUM(quantity),0) + ? <= capacity`). Cuando alguna inserción de miembro o selección falla a mitad del registro, el controlador revierte el registro parcial con `deleteCascade()` e informa qué tipo o selección se agotó.

## Flujo de pago

`processRegistrationCharge` en el controlador es el único lugar donde los registros tocan dinero, y es un cliente delgado de la pila de donaciones:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

La tokenización sucede en el navegador exactamente como para donaciones (ver [Donaciones](./giving)) — el asistente reutiliza el registro del proveedor de pago de apphelper, así que los miembros conectados pueden pagar con tarjetas guardadas y los invitados tokenizados una tarjeta nueva. El controlador refleja los trucos del proveedor de `DonateController` (ids de método de pago `pm-{id}` de Kingdom Funding, respuestas de SCA `requires_action` de Stripe devueltas al cliente sin registrar un pago). Un cargo exitoso escribe una fila `registrationPayments`, golpea `amountPaid`, y confirma el registro. **Los reembolsos no se implementan** — un registro cancelado pagado mantiene sus filas de pago y cualquier reembolso se maneja fuera de banda en el panel de control de la puerta de enlace.

Ambos puntos de entrada enrutan a través del mismo camino de código: `register` (pago en registro) y `pay` (pago de saldo / finalización de lista de espera).

## Ciclo de vida de la lista de espera

Cuando el evento está lleno y la bandera `waitlistEnabled` del evento está activada, `register` guarda la fiesta como `waitlisted` (omitiendo comprobaciones de capacidad) y envía el correo de confirmación normal marcado como un lugar de lista de espera. La promoción sucede de tres formas — `cancel`, `delete`, y el extremo de personal `promote` — todos embudos en `RegistrationRepo.promoteFromWaitlist`, que elige la fila en lista de espera más antigua y la voltea atómicamente:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…recuento activo para el evento…) < ?
```

La guardia `status='waitlisted'` significa promociones concurrentes no pueden double-promover una fila, y la subconsulta de capacidad significa una promoción no puede sobre-vender. Las filas promovidas aterrizan en `pending` — no `confirmed` — porque aún se puede deber un saldo; `RegistrationHelper.sendWaitlistAvailabilityEmail` le dice al registrante que su lugar se abrió y, cuando `totalAmount − amountPaid > 0`, vincula a la página de pago de finalización. Pagar (o no tener saldo) los confirma.

:::info
Una elevación de capacidad no promueve automáticamente — el personal usa la acción Promover de la lista después de elevar la capacidad. Los canceles y deletes promueven automáticamente.
:::

## Superficies del cliente

- **Asistente B1App** — un gancho compartido, `B1App/src/components/registration/useEventRegistration.ts`, impulsa tanto el componente del sitio web (`components/registration/EventRegister.tsx`) como la pantalla del portal móvil (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) a través de los pasos `info → members → selections → questions → payment → confirm` (los pasos del medio se renderizan solo cuando el evento tiene selecciones, un formulario adjunto, o un total no cero). Los pasos de información/miembros muestran selectores por tipo de asistente con capacidad restante en vivo y estados agotados; el pago (`RegistrationPaymentForm.tsx`) muestra el resumen del pedido, entrada de código de descuento, y — para miembros conectados — métodos de pago guardados a través del registro del proveedor de apphelper, con invitados tokenizando una tarjeta nueva. La pantalla **Registros** móvil (`screens/RegistrationsPage.tsx`) es Mis Registros: estado, saldo debido, Pago de Completar (`POST /:id/pay`), Editar (`PUT /:id` — contacto, tipos de miembro, cantidades de selección), y Cancelar.
- **Configuración B1Admin** — `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` agrega el interruptor Habilitar Lista de Espera más acordeones para Tipos de Asistente, Selecciones, y Códigos de Descuento (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`), todos CRUD contra las rutas `/types`, `/selections`, `/coupons`.
- **Lista B1Admin** — `B1Admin/src/registrations/RegistrationDetailsPage.tsx`: columna de Tipo por asistente, columna Pagado/Total con chip de saldo, chips de recuento por tipo, un diálogo de detalle de pagos (`RegistrationDetailDialog.tsx`, desde `GET /payments/:registrationId`), la acción de fila de Promoción de lista de espera, y exportación CSV incluyendo tipos de asistente, selecciones, pagado/total/saldo, y respuestas de preguntas.

Las búsquedas entre módulos (resolviendo o creando la persona invitada, cargando la iglesia para correos) van a través de `getMembershipModuleGateway()` — el módulo de contenido nunca lee tablas de membresía directamente.

## Páginas Relacionadas

- [Donaciones](./giving) — la abstracción de puerta de enlace, registro de proveedor, y modelo de tokenización que esta característica reutiliza
- [Extremos de Contenido](../api/endpoints/content) — la superficie REST del módulo de contenido
- [Webhooks](../api/webhooks) — el evento `registration.created`
- [Estructura del Módulo](../api/module-structure) — cómo se organiza el módulo de contenido del lado del servidor
