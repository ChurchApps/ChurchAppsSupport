---
title: "Registros Pagados"
---

# Registros Pagados

<div class="article-intro">

El registro de eventos puede ir más allá de un simple conteo de asistentes. Puedes definir tipos de asistente con precio (como Adulto e Infantil), ofrecer complementos opcionales con sus propios precios y cantidades, crear códigos de descuento, y recopilar pagos en el registro a través del proveedor de donaciones existente de tu iglesia. Cuando un evento se llena, una lista de espera opcional mantiene a los miembros interesados en fila y los promueve automáticamente a medida que se abren espacios.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Habilita primero el registro en el evento -- consulta [Crear Calendarios](creating-calendars#enabling-event-registration)
- Para recopilar pagos, tu iglesia necesita [donaciones en línea configuradas](../donations/online-giving-setup.md) (Stripe, PayPal, o Kingdom Funding). Los eventos gratuitos no necesitan configuración de donaciones.

</div>

## Abrir Configuración de Registro

1. En B1 Admin, ve a la página **Registrations** y abre tu evento (o abre el evento desde su calendario).
2. La tarjeta **Registration Settings** muestra lo básico -- **Enable Registration**, **Capacity**, **Registration Opens/Closes**, **Tags**, y **Registration Questions**.
3. Debajo de lo básico hay tres acordeones: **Attendee Types**, **Selections**, y **Discount Codes**.

## Tipos de Asistente

Los tipos de asistente te permiten cobrar precios diferentes para diferentes tipos de asistentes -- y limitar cada uno por separado.

1. Expande el acordeón **Attendee Types** y haz clic en **Add Type**.
2. Ingresa un **Name** (p. ej. "Adult", "Child", "Student").
3. Establece un **Price**. Usa 0 para un tipo gratuito.
4. Opcionalmente establece una **Capacity** solo para este tipo (p. ej. solo 20 espacios para Child). Deja en blanco para sin límite por tipo.
5. Haz clic en **Save**.

Durante el registro, cada asistente elige un tipo; los tipos agotados se muestran como **Sold out** y no pueden seleccionarse. El roster muestra el tipo de cada asistente y conteos en ejecución por tipo.

## Selections

Las selecciones son complementos opcionales con precio -- camisetas, planes de comidas, mejoras de actividades.

1. Expande el acordeón **Selections** y haz clic en **Add Selection**.
2. Ingresa un **Name**, **Description** opcional, y un **Price** (0 se muestra como "Free").
3. Opcionalmente establece una **Capacity** (total disponible entre todos los registros) y una **Max Qty** (el máximo que un registro puede ordenar).
4. Haz clic en **Save**.

Los registrados eligen cantidades durante la inscripción, y los totales cuentan contra la capacidad para que nunca vendas de más.

## Discount Codes

1. Expande el acordeón **Discount Codes** y haz clic en **Add Discount Code**.
2. Ingresa el **Code** que los registrados escribirán.
3. Elige el **Type** -- **Percent** o **Amount** -- y su **Value**.
4. Opcionalmente limita el código con una **Start Date** / **End Date**, un **Min Members** (número mínimo de asistentes en el registro), y **Max Uses**.
5. Haz clic en **Save**.

Cada código muestra un conteo de **Uses** para que puedas ver con qué frecuencia se ha canjeado. Los registrados obtienen retroalimentación instantánea cuando aplican un código -- incluyendo mensajes claros cuando un código ha expirado, aún no ha comenzado, o necesita más asistentes.

## Waitlist

Activa **Enable Waitlist** en la tarjeta Registration Settings. Cuando el evento alcanza la capacidad:

- A los nuevos registrados se les ofrece un lugar en la lista de espera en lugar de ser rechazados. Completan la misma inscripción (el pago se omite mientras están en lista de espera).
- Cuando alguien cancela, el registro más antiguo en lista de espera se **promueve automáticamente** y recibe un correo de que se abrió un espacio. Si tienen un saldo pendiente, el correo los enlaza para completar el pago.
- Puedes promover a alguien manualmente en cualquier momento con la acción **Promote** en una fila en lista de espera -- útil después de aumentar la capacidad del evento.

:::info
Los registros promovidos permanecen *pendientes* hasta que se pague cualquier saldo; pagar (o no tener nada que pagar) los confirma.
:::

## El Roster de Registro

Abre un evento desde la página Registrations para ver cada registro. La tabla muestra **Name**, **Members**, **Type** (tipo de cada asistente), **Paid / Total** (con una advertencia de saldo cuando todavía se debe dinero), **Status**, y **Date**, más chips de conteo por tipo encima de la tabla.

- Haz clic en el icono de detalles de una fila para abrir el diálogo **Registration Details** -- miembros, selecciones, pagado/saldo, y una tabla de **Payments** que enumera cada cargo (monto, método, fecha).
- **Export CSV** descarga el roster completo con columnas para miembros, tipos de asistente, selecciones, pagado/total/saldo, estado, y una columna por pregunta de registro.
- **Add Attendee** todavía te permite registrar inscripciones fuera de línea manualmente.

:::info
Los reembolsos no se procesan dentro de B1. Si necesitas reembolsar un registro pagado cancelado, emite el reembolso desde el panel de tu proveedor de donaciones (p. ej. Stripe).
:::

## Cómo Funciona el Pago

Los pagos se procesan a través de la misma pasarela de donaciones que tu iglesia ya usa para donaciones -- los detalles de la tarjeta van directamente al proveedor y nunca tocan los servidores de B1. Los precios siempre se calculan en el servidor a partir de tus tipos, selecciones, y códigos de descuento configurados, así que un registrado no puede manipular el total. Los miembros conectados pueden pagar con una tarjeta guardada; los invitados ingresan una tarjeta al finalizar la compra.

## Artículos Relacionados

- [Crear Calendarios](creating-calendars#enabling-event-registration) — habilitar registro y la configuración básica
- [Configuración de Donaciones en Línea](../donations/online-giving-setup.md) — configura la pasarela de pago usada al finalizar la compra
- [Registrarse en Eventos](../../b1-church/events/registering) — lo que ven los miembros cuando se inscriben
- [Mis Registros](../../b1-church/events/my-registrations) — cómo los miembros pagan saldos y editan registros
