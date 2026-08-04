---
title: "Inscripciones pagadas"
---

# Inscripciones pagadas

<div class="article-intro">

La inscripción a eventos puede ir más allá de un simple conteo de asistentes. Puedes definir tipos de asistentes con precio (como Adulto y Niño), ofrecer complementos opcionales con sus propios precios y cantidades, crear códigos de descuento y cobrar el pago en el momento de la inscripción a través del proveedor de donaciones existente de tu iglesia. Cuando un evento se llena, una lista de espera opcional mantiene en fila a los miembros interesados y los promueve automáticamente a medida que se liberan cupos.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Habilita primero la inscripción en el evento — consulta [Crear calendarios](creating-calendars#enabling-event-registration)
- Para cobrar pagos, tu iglesia necesita tener [las donaciones en línea configuradas](../donations/online-giving-setup.md) (Stripe, PayPal o Kingdom Funding). Los eventos gratuitos no necesitan configuración de donaciones.

</div>

## Abrir la configuración de inscripción

1. En B1 Admin, ve a la página **Registrations** y abre tu evento (o abre el evento desde su calendario).
2. La tarjeta **Registration Settings** muestra lo básico — **Enable Registration**, **Capacity**, **Registration Opens/Closes**, **Tags** y **Registration Questions**.
3. Debajo de lo básico hay tres acordeones: **Attendee Types**, **Selections** y **Discount Codes**.

## Tipos de asistentes

Los tipos de asistentes te permiten cobrar precios diferentes para distintos tipos de asistentes, y limitar cada uno por separado.

1. Expande el acordeón **Attendee Types** y haz clic en **Add Type**.
2. Ingresa un **Name** (por ejemplo, "Adult", "Child", "Student").
3. Establece un **Price**. Usa 0 para un tipo gratuito.
4. Opcionalmente establece una **Capacity** solo para este tipo (por ejemplo, solo 20 cupos de Child). Déjalo en blanco para no tener límite por tipo.
5. Haz clic en **Save**.

Durante la inscripción, cada asistente elige un tipo; los tipos agotados se muestran como **Sold out** y no se pueden seleccionar. El listado muestra el tipo de cada asistente y los conteos por tipo en curso.

## Selecciones

Las selecciones son complementos opcionales con precio: camisetas, planes de comida, mejoras de actividad.

1. Expande el acordeón **Selections** y haz clic en **Add Selection**.
2. Ingresa un **Name**, una **Description** opcional y un **Price** (0 se muestra como "Free").
3. Opcionalmente, establece una **Capacity** (total disponible en todas las inscripciones) y una **Max Qty** (la cantidad máxima que puede pedir una sola inscripción).
4. Haz clic en **Save**.

Los inscritos eligen cantidades durante el registro, y los totales cuentan contra la capacidad para que nunca se vendan de más.

## Códigos de descuento

1. Expande el acordeón **Discount Codes** y haz clic en **Add Discount Code**.
2. Ingresa el **Code** que escribirán los inscritos.
3. Elige el **Type** — **Percent** o **Amount** — y su **Value**.
4. Opcionalmente, limita el código con una **Start Date** / **End Date**, un **Min Members** (número mínimo de asistentes en la inscripción) y **Max Uses**.
5. Haz clic en **Save**.

Cada código muestra un contador de **Uses** para que puedas ver con qué frecuencia se ha canjeado. Los inscritos reciben retroalimentación instantánea al aplicar un código, incluidos mensajes claros cuando un código ha caducado, aún no ha comenzado o necesita más asistentes.

## Lista de espera

Activa **Enable Waitlist** en la tarjeta Registration Settings. Cuando el evento alcanza su capacidad:

- A los nuevos inscritos se les ofrece un lugar en la lista de espera en lugar de ser rechazados. Completan el mismo registro (el pago se omite mientras están en espera).
- Cuando alguien cancela, la inscripción en espera más antigua se **promueve automáticamente** y recibe un correo electrónico indicando que se liberó un cupo. Si tiene un saldo pendiente, el correo la enlaza para completar el pago.
- Puedes promover a alguien manualmente en cualquier momento con la acción **Promote** en una fila en espera — útil después de aumentar la capacidad del evento.

:::info
Las inscripciones promovidas permanecen *pendientes* hasta que se pague cualquier saldo; pagar (o no deber nada) las confirma.
:::

## El listado de inscripciones

Abre un evento desde la página Registrations para ver todas las inscripciones. La tabla muestra **Name**, **Members**, **Type** (el tipo de cada asistente), **Paid / Total** (con una advertencia de saldo cuando aún se debe dinero), **Status** y **Date**, además de chips de conteo por tipo encima de la tabla.

- Haz clic en el ícono de detalles de una fila para abrir el diálogo **Registration Details** — miembros, selecciones, pagado/saldo y una tabla de **Payments** que enumera cada cargo (monto, método, fecha).
- **Export CSV** descarga el listado completo con columnas para miembros, tipos de asistentes, selecciones, pagado/total/saldo, estado y una columna por cada pregunta de inscripción.
- **Add Attendee** todavía te permite registrar inscripciones fuera de línea manualmente.

:::info
Los reembolsos no se procesan dentro de B1. Si necesitas reembolsar una inscripción pagada cancelada, emite el reembolso desde el panel de tu proveedor de donaciones (por ejemplo, Stripe).
:::

## Cómo funciona el pago

Los pagos se procesan a través de la misma pasarela de donaciones que tu iglesia ya usa para las donaciones — los datos de la tarjeta van directamente al proveedor y nunca pasan por los servidores de B1. Los precios siempre se calculan en el servidor a partir de tus tipos, selecciones y códigos de descuento configurados, de modo que un inscrito no puede manipular el total. Los miembros que iniciaron sesión pueden pagar con una tarjeta guardada; los invitados ingresan una tarjeta al finalizar la compra.

## Artículos relacionados

- [Crear calendarios](creating-calendars#enabling-event-registration) — habilita la inscripción y la configuración básica
- [Configuración de donaciones en línea](../donations/online-giving-setup.md) — configura la pasarela de pago usada en el pago
- [Inscribirse a eventos](../../b1-church/events/registering) — lo que ven los miembros al inscribirse
- [Mis inscripciones](../../b1-church/events/my-registrations) — cómo los miembros pagan saldos y editan inscripciones
