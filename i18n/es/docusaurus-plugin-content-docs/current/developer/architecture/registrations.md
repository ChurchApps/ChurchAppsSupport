---
title: "Inscripciones a eventos"
---

# Inscripciones a eventos

<div class="article-intro">

La inscripción nativa a eventos vive en el módulo de contenido y, desde la ola de inscripciones pagadas, incluye un modelo comercial completo: tipos de asistente con precio, selecciones complementarias con precio, códigos de descuento, pagos a través de la pasarela de donaciones existente de la iglesia y una lista de espera controlada por estados. La ruta del dinero reutiliza deliberadamente la pila de donaciones: el controlador de inscripciones cobra a través de la misma abstracción `GatewayService` / `IGatewayProvider` documentada en [Donaciones](./giving), de modo que ningún dato de tarjeta ni conocimiento del SDK de la pasarela vive en el módulo de contenido. Esta página describe el modelo de datos, las reglas de precio y capacidad, y los flujos de inscripción, pago y lista de espera.

</div>

## Descripción general

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (portal de miembros)   │            │ Api — módulo de contenido                   │
│  asistente de inscripción ·  │   HTTPS    │  RegistrationController                     │
│  Mis inscripciones           │ ─────────▶ │   /content/registrations                    │
├──────────────────────────────┤            │  RegistrationPricingHelper (precio servidor)│
│ B1Admin (personal)           │            │  RegistrationHelper (correos)               │
│  configuración de inscripción│            └───────────────┬─────────────────────────────┘
│  · lista · exportación CSV   │                            │ processCharge
└──────────────────────────────┘                            ▼
                                            ┌─────────────────────────────────────────────┐
                                            │ abstracción de pasarela compartida (giving) │
                                            │  GatewayService → IGatewayProvider          │
                                            │  Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

Tres reglas se cumplen en toda la pila:

1. **El servidor define el precio.** Los clientes envían IDs de tipo, IDs de selección y cantidades; `RegistrationPricingHelper.computeTotal()` calcula el total en el servidor, y los cupones se revalidan al momento del cobro. Nunca se confía en un monto enviado por el cliente.
2. **La capacidad se aplica de forma atómica al insertar.** Cada inserción limitada por capacidad usa una sentencia `INSERT … SELECT … FROM dual WHERE (conteo de filas activas) < capacidad`, de modo que dos inscripciones simultáneas no pueden ocupar el último lugar. Los conteos se derivan del estado (`pending`/`confirmed`) y nunca se almacenan.
3. **Los pagos viajan por las mismas vías de donaciones.** `RegistrationController` llama al `GatewayService.processCharge` compartido con la pasarela configurada por la iglesia: la misma abstracción de proveedores, el mismo modelo de tokenización y el mismo manejo de SCA que las donaciones.

## Modelo de datos (`Api/src/modules/content`)

Los modelos están en `models/Registration.ts`; los mapeos de tablas en `db/DatabaseTypes.ts`; un repositorio por tabla en `repositories/`.

| Tabla | Significado | Campos clave |
|-------|-------------|--------------|
| `registrations` | Una inscripción (un hogar o grupo para un evento) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Un asistente dentro de una inscripción | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Tipos de asistente por evento (por ejemplo, Adulto / Niño) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Opciones complementarias con nombre y precio (por ejemplo, camiseta) | eventId, name, description, **price**, **capacity**, **maxQuantity** (límite por inscripción), sort, active |
| `registrationSelectionChoices` | Cantidad de una selección elegida por una inscripción o miembro | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Un cargo exitoso contra una inscripción | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Códigos de descuento por evento | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Notas:

- **No hay tabla de lista de espera.** Las inscripciones en lista de espera son filas de `registrations` con `status = 'waitlisted'`; todo el ciclo de vida de la lista de espera son transiciones de estado en esa única tabla.
- **Sin contadores almacenados.** Los conteos de "vendidos" / "usados" (capacidad del evento, capacidad por tipo, capacidad por selección, usos de cupones) se calculan con subconsultas correlacionadas sobre filas cuyo estado está en `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Por eso, cancelar una inscripción libera capacidad sin ninguna contabilidad adicional.
- Los precios son columnas DECIMAL de MySQL (cadenas en la transmisión) convertidas con `Number()` dentro del helper de precios.

## Superficie REST

Todo está bajo `/content/registrations` (`controllers/RegistrationController.ts`), protegido por `Permissions.registrations` (`view` / `edit`):

| Ruta | Acceso | Propósito |
|------|--------|-----------|
| `POST /register` | anónimo | Envío completo: invitado, miembro o Agregar asistente del personal; precio en el servidor, verificaciones de capacidad, cargo opcional |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | público | Tipos/selecciones con `used` / `remainingCapacity` derivados para el asistente |
| `POST /types`, `DELETE /types/:id` (igual para `/selections`, `/coupons`) | `registrations.edit` | CRUD de configuración para el personal |
| `POST /coupons/validate` | público | Validación en línea del código de descuento durante el asistente |
| `GET /coupons/event/:eventId` | personal | Cupones con conteos de usos |
| `GET /event/:eventId` · `GET /event/:eventId/count` | personal · público | Lista; conteo de activos para mostrar la capacidad |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | autenticado | Mis inscripciones, detalle, historial de pagos |
| `PUT /:id` | propietario/personal | Edición posterior al envío: reemplaza miembros y elecciones de selección con verificaciones de capacidad atómicas nuevas, recalcula `totalAmount`; nunca cobra ni reembolsa automáticamente |
| `POST /:id/pay` | propietario | "Completar pago": cobra `totalAmount − amountPaid`, cambia `waitlisted`/`pending` → `confirmed` |
| `POST /:id/promote` | personal | Promoción manual desde la lista de espera |
| `POST /:id/cancel` · `DELETE /:id` | propietario · personal | Cancelar / eliminar; ambos disparan la promoción automática desde la lista de espera |

Una inscripción existente no cancelada para el mismo `personId` en el mismo evento se rechaza con un 409, y cada inscripción creada emite un webhook `registration.created` mediante `WebhookDispatcher`.

## Precio y códigos de descuento

`helpers/RegistrationPricingHelper.ts` es la única autoridad de cálculo monetario:

- `computeTotal()` suma el precio del tipo de cada miembro más el `precio × cantidad` de cada elección de selección.
- `validateCoupon()` verifica que esté activo, la ventana de fechas (`startDate`/`endDate`), `minMembers` frente al tamaño enviado de la inscripción, y `maxUses` frente al conteo de canjes derivado del estado.
- `applyDiscount()`: `percent` resta `total × value/100`; `amount` resta `value`; ambos se truncan en cero.

El asistente llama a `POST /coupons/validate` para dar retroalimentación en línea, pero `register` vuelve a validar y a aplicar el cupón en el servidor: el total que muestra el cliente es solo orientativo.

## El modismo atómico de capacidad

Cada inserción limitada por capacidad compite de forma segura sin transacciones ni bloqueos, porque la verificación de capacidad forma parte del propio `INSERT`. A nivel de evento (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Cero filas afectadas significa "en capacidad máxima". El mismo modismo protege las inserciones por tipo (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, que cuenta los miembros unidos a inscripciones activas) y las cantidades por selección (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, con `COALESCE(SUM(quantity),0) + ? <= capacity`). Cuando la inserción de cualquier miembro o selección falla a mitad de una inscripción, el controlador revierte la inscripción parcial con `deleteCascade()` e informa qué tipo o selección se agotó.

## Flujo de pago {#payment-flow}

`processRegistrationCharge` en el controlador es el único lugar donde las inscripciones tocan el dinero, y es un cliente ligero de la pila de donaciones:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

La tokenización ocurre en el navegador exactamente como en las donaciones (vea [Donaciones](./giving)): el asistente reutiliza el registro de proveedores de pago de apphelper, de modo que los miembros con sesión iniciada pueden pagar con tarjetas guardadas, y los invitados tokenizan una tarjeta nueva. El controlador replica las particularidades de proveedor de `DonateController` (identificadores de método de pago `pm-{id}` de Kingdom Funding, y las respuestas `requires_action` de SCA de Stripe que se devuelven al cliente sin registrar un pago). Un cargo exitoso escribe una fila en `registrationPayments`, incrementa `amountPaid` y confirma la inscripción. **Los reembolsos no están implementados**: una inscripción pagada y cancelada conserva sus filas de pago, y cualquier reembolso se gestiona fuera de la aplicación, en el panel de la pasarela.

Ambos puntos de entrada pasan por la misma ruta de código: `register` (pagar al inscribirse) y `pay` (pago del saldo / completar la lista de espera).

`register` omite el cargo en dos casos y guarda la inscripción como `pending` con `amountPaid = 0`, dejando el total completo como saldo pendiente:

- **Agregar asistente desde el personal.** El cuerpo trae un `personId` que no es el del usuario que llama, sin `guestInfo`, y quien llama tiene `registrations.edit` en esa iglesia. La persona debe existir (de lo contrario, 404), se omite el filtro de miembros del hogar y no se cobra ninguna tarjeta.
- **Sin pasarela.** La iglesia no tiene pasarela de donaciones (`hasGateway` verifica `gateway.loadAll`). El paso de pago de B1App muestra **Register and Pay Later** en lugar de un formulario de tarjeta.

Las inscripciones de invitados (sin `au.id`) con precio deben incluir un `captchaPass` de `POST /giving/donate/captcha-verify`. `CaptchaPass.verify` (ahora en `shared/helpers`) se ejecuta justo antes del cargo, así que las inscripciones en lista de espera y las gratuitas no se ven afectadas. Cuando `CAPTCHA_ENFORCE=true` y el pase falta o no es válido, la nueva inscripción se revierte con `deleteCascade()` y la llamada devuelve 403. El `RegistrationPaymentForm` de B1App muestra la casilla de reCAPTCHA a los invitados y envía el pase tanto con el guardado de la tarjeta como con la inscripción.

## Ciclo de vida de la lista de espera

Cuando el evento está lleno y su bandera `waitlistEnabled` está activada, `register` guarda el grupo como `waitlisted` (omitiendo las verificaciones de capacidad) y envía el correo de confirmación normal, marcado como lugar en lista de espera. La promoción ocurre de tres formas (`cancel`, `delete` y el endpoint `promote` del personal), y todas desembocan en `RegistrationRepo.promoteFromWaitlist`, que elige la fila en lista de espera más antigua y la cambia de forma atómica:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…conteo activo del evento…) < ?
```

La guarda `status='waitlisted'` impide que promociones concurrentes promuevan dos veces la misma fila, y la subconsulta de capacidad impide que una promoción sobrevenda. Las filas promovidas pasan a `pending`, no a `confirmed`, porque todavía puede deberse un saldo; `RegistrationHelper.sendWaitlistAvailabilityEmail` avisa al inscrito que se liberó su lugar y, cuando `totalAmount − amountPaid > 0`, enlaza a la página `/mobile/registrations` de B1 de la iglesia (Mis inscripciones), construida a partir de `B1AppRoot` y el subdominio de la iglesia. Al pagar (o si no hay saldo), se confirma la inscripción.

:::info
Aumentar la capacidad no promueve automáticamente por sí solo: el personal usa la acción Promover de la lista después de aumentar la capacidad. Las cancelaciones y eliminaciones promueven automáticamente.
:::

## Superficies de cliente

- **Asistente de B1App**: un único hook compartido, `B1App/src/components/registration/useEventRegistration.ts`, impulsa tanto el componente del sitio web (`components/registration/EventRegister.tsx`) como la pantalla del portal móvil (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) a través de los pasos `info → members → selections → questions → payment → confirm` (los pasos intermedios solo se muestran cuando el evento tiene selecciones, un formulario adjunto o un total distinto de cero). Los pasos de información y de miembros muestran selectores por tipo de asistente con capacidad restante en tiempo real y estados de agotado; el pago (`RegistrationPaymentForm.tsx`) muestra el resumen del pedido, la entrada del código de descuento y, para los miembros con sesión iniciada, los métodos de pago guardados mediante el registro de proveedores de apphelper, mientras que los invitados tokenizan una tarjeta nueva. La pantalla móvil **Registrations** (`screens/RegistrationsPage.tsx`) es Mis inscripciones: estado, saldo pendiente, Completar pago (`POST /:id/pay`), Editar (`PUT /:id`: contacto, tipos de miembro, cantidades de selección) y Cancelar.
- **Configuración de B1Admin**: `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` agrega el interruptor Enable Waitlist y los acordeones de Attendee Types, Selections y Discount Codes (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`), todos con CRUD contra las rutas `/types`, `/selections` y `/coupons`.
- **Lista de B1Admin**: `B1Admin/src/registrations/RegistrationDetailsPage.tsx`: columna Type por asistente, columna Paid/Total con chip de saldo, chips de conteo por tipo, un cuadro de detalle de pagos (`RegistrationDetailDialog.tsx`, desde `GET /payments/:registrationId`), la acción de fila Promote de la lista de espera y la exportación CSV con tipos de asistente, selecciones, pagado/total/saldo y respuestas a las preguntas.

Las búsquedas entre módulos (resolver o crear a la persona invitada, cargar la iglesia para los correos) pasan por `getMembershipModuleGateway()`: el módulo de contenido nunca lee las tablas de membresía directamente.

## Páginas relacionadas

- [Donaciones](./giving): la abstracción de pasarela, el registro de proveedores y el modelo de tokenización que reutiliza esta función
- [Endpoints de Content](../api/endpoints/content): la superficie REST del módulo de contenido
- [Webhooks](../api/webhooks): el evento `registration.created`
- [Estructura de módulos](../api/module-structure): cómo se organiza del lado del servidor el módulo de contenido
