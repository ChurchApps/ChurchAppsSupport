---
title: "Inscripciones pagadas"
description: "Configure inscripciones de pago en B1 Admin: tipos de asistente con precio, complementos, códigos de descuento, listas de espera y cobro a través de su proveedor de donaciones."
---

# Inscripciones pagadas

<div class="article-intro">

El registro a eventos puede ir más allá de un simple recuento de asistentes. Puede definir tipos de asistente con precio (como Adulto y Niño), ofrecer complementos opcionales con sus propios precios y cantidades, crear códigos de descuento y cobrar el pago al inscribirse a través del proveedor de donaciones que su iglesia ya utiliza. Cuando un evento se llena, una lista de espera opcional mantiene en fila a los miembros interesados y los promueve automáticamente a medida que se liberan lugares.

</div>

## Video de capacitación

<YouTube id="eGSZv24Dlzk" title="Event Registration and Paid Events in B1" next="Launching Your Church Website in B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Habilite primero el registro en el evento: consulte [Creación de calendarios](./creating-calendars.md#enabling-event-registration)
- Para cobrar pagos en línea, su iglesia necesita tener [configuradas las donaciones en línea](../donations/online-giving-setup.md) (Stripe, PayPal o Kingdom Funding). Los eventos gratuitos no requieren configuración de donaciones. Sin donaciones en línea, las inscripciones de pago siguen funcionando, pero las personas pagan directamente a la iglesia; consulte [Iglesias sin donaciones en línea](#churches-without-online-giving).

</div>

## Abrir la configuración de inscripción

1. En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda), elija **Calendars > Registrations** y abra su evento (o ábralo desde su calendario).
2. La tarjeta **Registration Settings** muestra lo básico: **Enable Registration**, **Capacity**, **Registration Opens/Closes**, **Tags** y **Registration Questions**.
3. Debajo de lo básico hay tres acordeones: **Attendee Types**, **Selections** y **Discount Codes**.

## Tipos de asistente

Los tipos de asistente le permiten cobrar precios distintos según el tipo de asistente, y limitar cada uno por separado.

1. Expanda el acordeón **Attendee Types** y haga clic en **Add Type**.
2. Escriba un **Name** (por ejemplo, "Adulto", "Niño", "Estudiante").
3. Establezca un **Price**. Use 0 para un tipo gratuito.
4. Opcionalmente, establezca una **Capacity** solo para este tipo (por ejemplo, solo 20 lugares de Niño). Déjelo en blanco si no quiere un límite por tipo.
5. Haga clic en **Save**.

Durante la inscripción, cada asistente elige un tipo; los tipos agotados se muestran como **Sold out** y no se pueden seleccionar. La lista de inscritos muestra el tipo de cada asistente y los conteos acumulados por tipo.

## Selecciones

Las selecciones son complementos opcionales con precio, como camisetas, planes de comida o mejoras de actividades.

1. Expanda el acordeón **Selections** y haga clic en **Add Selection**.
2. Escriba un **Name**, una **Description** opcional y un **Price** (0 se muestra como "Free").
3. Opcionalmente, establezca una **Capacity** (total disponible entre todas las inscripciones) y un **Max Qty** (la cantidad máxima que puede pedir una sola inscripción).
4. Haga clic en **Save**.

Los inscritos eligen las cantidades durante el registro, y los totales cuentan contra la capacidad para que nunca se venda de más.

## Códigos de descuento

1. Expanda el acordeón **Discount Codes** y haga clic en **Add Discount Code**.
2. Escriba el **Code** que los inscritos deberán escribir.
3. Elija el **Type** -- **Percent** o **Amount** -- y su **Value**.
4. Opcionalmente, limite el código con una **Start Date** / **End Date**, un **Min Members** (número mínimo de asistentes en la inscripción) y **Max Uses**.
5. Haga clic en **Save**.

Cada código muestra un contador de **Uses** para que vea cuántas veces se ha canjeado. Los inscritos reciben respuesta inmediata al aplicar un código, incluidos mensajes claros cuando el código ha vencido, aún no ha comenzado o requiere más asistentes.

## Lista de espera {#waitlist}

Active **Enable Waitlist** en la tarjeta Registration Settings. Cuando el evento alcanza su capacidad:

- A los nuevos inscritos se les ofrece un lugar en la lista de espera en lugar de ser rechazados. Completan la misma inscripción (el pago se omite mientras están en la lista de espera).
- Cuando alguien cancela, la inscripción más antigua de la lista de espera se **promueve automáticamente** y recibe un correo electrónico que avisa de que se liberó un lugar. Si tiene un saldo pendiente, el correo lo lleva a [Mis inscripciones](../../b1-church/events/my-registrations.md) en el sitio B1 de su iglesia, donde puede completar el pago.
- Puede promover a alguien manualmente en cualquier momento con la acción **Promote** en una fila de la lista de espera, lo cual resulta útil después de aumentar la capacidad del evento.

:::info
Las inscripciones promovidas permanecen *pendientes* hasta que se pague cualquier saldo; al pagar (o si no hay nada que pagar), quedan confirmadas.
:::

## La lista de inscritos {#the-registration-roster}

Abra un evento desde la página de Registrations para ver todas las inscripciones. El título de la tarjeta muestra cuántas inscripciones ocupan un lugar frente a la capacidad (por ejemplo, *Registrations (18 / 20)*). Solo cuentan las inscripciones pendientes y confirmadas; cuando hay personas en la lista de espera, el título añade el número (por ejemplo, *· 3 waitlisted*), y el mismo recuento aparece debajo de la barra de capacidad. El número más grande encima de la barra de capacidad cuenta **personas** en lugar de inscripciones -- todas las personas de cada inscripción pendiente o confirmada --, de modo que una familia de cuatro cuenta como cuatro. El límite de capacidad sigue contando inscripciones. La tabla muestra **Name**, **Members**, **Type** (el tipo de cada asistente), **Paid / Total** (con una advertencia de saldo cuando aún se debe dinero), **Status** y **Date**, además de las etiquetas de conteo por tipo encima de la tabla.

- Haga clic en el icono de detalles de una fila para abrir el cuadro de diálogo **Registration Details**: miembros, selecciones, pagado/saldo y una tabla **Payments** con cada cargo (monto, método y fecha).
- **Export CSV** descarga la lista completa con columnas para miembros, tipos de asistente, selecciones, pagado/total/saldo, estado y una columna por cada pregunta de inscripción.
- **Add Attendee** registra una inscripción hecha sin conexión o por teléfono para cualquier persona de su iglesia. Elija a la persona y, en un evento de pago, su tipo de asistente. No se le cobra nada a esa persona: una inscripción de pago se guarda como **pending** con el monto completo como saldo adeudado. Si su iglesia tiene donaciones en línea, la persona puede pagarlo desde [Mis inscripciones](../../b1-church/events/my-registrations.md); si no, cóbrelo en persona. Necesita el permiso Registrations Edit para agregar asistentes.

:::info
Los reembolsos no se procesan dentro de B1. Si necesita reembolsar una inscripción de pago cancelada, emita el reembolso desde el panel de su proveedor de donaciones (por ejemplo, Stripe).
:::

## Cómo funciona el pago

Los pagos pasan por la misma pasarela de donaciones que su iglesia ya usa para las donaciones: los datos de la tarjeta van directamente al proveedor y nunca llegan a los servidores de B1. Los precios siempre se calculan en el servidor a partir de los tipos, selecciones y códigos de descuento configurados, así que un inscrito no puede alterar el total. Los miembros que han iniciado sesión pueden pagar con una tarjeta guardada. Los invitados introducen los datos de su tarjeta al pagar y deben marcar la casilla **I'm not a robot** antes de pagar.

### Iglesias sin donaciones en línea {#churches-without-online-giving}

Si su iglesia no tiene configurado un proveedor de donaciones, los eventos de pago pueden seguir aceptando inscripciones. El paso de pago informa a los inscritos de que el pago en línea no está disponible y de que pueden pagar directamente a la iglesia, y un botón **Register and Pay Later** guarda la inscripción. Se guarda como **pendiente** con el monto completo como saldo adeudado, y aparece en la lista con una advertencia de saldo. Cobre el dinero de la forma en que su iglesia normalmente lo hace.

:::info
B1 no tiene forma de marcar un pago en efectivo o fuera de línea como recibido. El saldo adeudado permanece en la lista y en la tarjeta de [Mis inscripciones](../../b1-church/events/my-registrations.md) del inscrito incluso después de que usted lo cobre, así que lleve su propio registro de quién ha pagado.
:::

## Artículos relacionados

- [Creación de calendarios](./creating-calendars.md#enabling-event-registration) — habilitar el registro y la configuración básica
- [Configuración de donaciones en línea](../donations/online-giving-setup.md) — configure la pasarela de pago que se usa al pagar
- [Registrarse en eventos](../../b1-church/events/registering.md) — lo que ven los miembros al inscribirse
- [Mis inscripciones](../../b1-church/events/my-registrations.md) — cómo los miembros pagan saldos y editan sus inscripciones
