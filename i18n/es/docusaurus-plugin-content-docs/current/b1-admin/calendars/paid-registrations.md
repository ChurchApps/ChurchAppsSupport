---
title: "Inscripciones pagadas"
description: "Configura inscripciones de pago en B1 Admin: tipos de asistente con precio, complementos, códigos de descuento, listas de espera y cobros con tu pasarela."
---

# Inscripciones pagadas

<div class="article-intro">

La inscripción a eventos puede ir más allá de un simple conteo de asistentes. Puede definir tipos de asistente con precio (como Adulto y Niño), ofrecer complementos opcionales con sus propios precios y cantidades, crear códigos de descuento y cobrar el pago al inscribirse a través del proveedor de donaciones existente de su iglesia. Cuando un evento se llena, una lista de espera opcional mantiene en fila a los miembros interesados y los promueve automáticamente conforme se liberan lugares.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Habilite primero la inscripción en el evento: consulte [Creación de calendarios](./creating-calendars.md#enabling-event-registration)
- Para cobrar pagos en línea, su iglesia necesita [tener configuradas las donaciones en línea](../donations/online-giving-setup.md) (Stripe, PayPal o Kingdom Funding). Los eventos gratuitos no requieren configuración de donaciones. Sin donaciones en línea, las inscripciones pagadas siguen funcionando, pero las personas pagan directamente a la iglesia; consulte [Iglesias sin donaciones en línea](#churches-without-online-giving).

</div>

## Abrir la configuración de inscripción

1. En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), elija **Calendarios > Inscripciones** y abra su evento (o ábralo desde su calendario).
2. La tarjeta **Configuración de inscripción** muestra lo básico: **Habilitar inscripción**, **Capacidad**, **Apertura/Cierre de inscripciones**, **Etiquetas** y **Preguntas de inscripción**.
3. Debajo de lo básico hay tres acordeones: **Tipos de asistente**, **Selecciones** y **Códigos de descuento**.

## Tipos de asistente

Los tipos de asistente le permiten cobrar precios diferentes según el tipo de asistente, y limitar cada uno por separado.

1. Expanda el acordeón **Tipos de asistente** y haga clic en **Agregar tipo**.
2. Escriba un **Nombre** (por ejemplo, "Adulto", "Niño", "Estudiante").
3. Establezca un **Precio**. Use 0 para un tipo gratuito.
4. Opcionalmente, establezca una **Capacidad** solo para este tipo (por ejemplo, solo 20 lugares de Niño). Déjelo en blanco si no hay límite por tipo.
5. Haga clic en **Guardar**.

Durante la inscripción, cada asistente elige un tipo; los tipos agotados se muestran como **Agotado** y no se pueden seleccionar. La lista de inscritos muestra el tipo de cada asistente y los conteos acumulados por tipo.

## Selecciones

Las selecciones son complementos opcionales con precio, como camisetas, planes de comida o mejoras de actividades.

1. Expanda el acordeón **Selecciones** y haga clic en **Agregar selección**.
2. Escriba un **Nombre**, una **Descripción** opcional y un **Precio** (0 se muestra como "Gratis").
3. Opcionalmente, establezca una **Capacidad** (total disponible entre todas las inscripciones) y una **Cantidad máxima** (lo máximo que una inscripción puede pedir).
4. Haga clic en **Guardar**.

Los inscritos eligen cantidades durante el registro, y los totales cuentan contra la capacidad para que nunca venda de más.

## Códigos de descuento

1. Expanda el acordeón **Códigos de descuento** y haga clic en **Agregar código de descuento**.
2. Escriba el **Código** que los inscritos escribirán.
3. Elija el **Tipo** -- **Porcentaje** o **Monto** -- y su **Valor**.
4. Opcionalmente, limite el código con una **Fecha de inicio** / **Fecha de fin**, un **Mínimo de miembros** (número mínimo de asistentes en la inscripción) y **Usos máximos**.
5. Haga clic en **Guardar**.

Cada código muestra un conteo de **Usos** para que vea cuántas veces se ha canjeado. Los inscritos reciben respuesta inmediata cuando aplican un código, incluidos mensajes claros si el código ha vencido, aún no ha comenzado o requiere más asistentes.

## Lista de espera {#waitlist}

Active **Habilitar lista de espera** en la tarjeta Configuración de inscripción. Cuando el evento alcanza su capacidad:

- A los nuevos inscritos se les ofrece un lugar en la lista de espera en lugar de ser rechazados. Completan el mismo registro (el pago se omite mientras están en lista de espera).
- Cuando alguien cancela, la inscripción en lista de espera más antigua se **promueve automáticamente** y recibe un correo electrónico avisando que se liberó un lugar. Si tiene un saldo pendiente, el correo lo lleva a [Mis inscripciones](../../b1-church/events/my-registrations.md) en el sitio B1 de su iglesia, donde puede completar el pago.
- Puede promover a alguien manualmente en cualquier momento con la acción **Promover** en una fila de lista de espera, lo cual es útil después de aumentar la capacidad del evento.

:::info
Las inscripciones promovidas permanecen *pendientes* hasta que se pague cualquier saldo; al pagar (o si no hay nada que pagar), se confirman.
:::

## La lista de inscritos {#the-registration-roster}

Abra un evento desde la página de Inscripciones para ver todas las inscripciones. El título de la tarjeta muestra cuántas inscripciones ocupan un lugar frente a la capacidad (por ejemplo, *Inscripciones (18 / 20)*). Solo cuentan las inscripciones pendientes y confirmadas; cuando hay personas en lista de espera, el título agrega el número (por ejemplo, *· 3 en lista de espera*), y el mismo conteo aparece debajo de la barra de capacidad. La tabla muestra **Nombre**, **Miembros**, **Tipo** (el tipo de cada asistente), **Pagado / Total** (con una advertencia de saldo cuando aún se debe dinero), **Estado** y **Fecha**, además de las etiquetas de conteo por tipo encima de la tabla.

- Haga clic en el ícono de detalles de una fila para abrir el cuadro de diálogo **Detalles de la inscripción**: miembros, selecciones, pagado/saldo y una tabla de **Pagos** con cada cargo (monto, método, fecha).
- **Exportar CSV** descarga la lista completa con columnas para miembros, tipos de asistente, selecciones, pagado/total/saldo, estado y una columna por cada pregunta de inscripción.
- **Agregar asistente** registra una inscripción sin conexión o por teléfono para cualquier persona de su iglesia. Elija a la persona y, en un evento de pago, su tipo de asistente. A su tarjeta no se le cobra nada: una inscripción de pago se guarda como **pendiente** con el monto total como saldo pendiente. Si su iglesia tiene donaciones en línea, la persona puede pagarlo desde [Mis inscripciones](../../b1-church/events/my-registrations.md); de lo contrario, cóbrelo en persona. Necesita el permiso de edición de Inscripciones para agregar asistentes.

:::info
Los reembolsos no se procesan dentro de B1. Si necesita reembolsar una inscripción de pago cancelada, emita el reembolso desde el panel de su proveedor de donaciones (por ejemplo, Stripe).
:::

## Cómo funciona el pago

Los pagos pasan por la misma pasarela de donaciones que su iglesia ya usa: los datos de la tarjeta van directamente al proveedor y nunca llegan a los servidores de B1. Los precios siempre se calculan en el servidor a partir de los tipos, selecciones y códigos de descuento configurados, así que un inscrito no puede alterar el total. Los miembros que inician sesión pueden pagar con una tarjeta guardada. Los invitados ingresan una tarjeta al pagar y deben marcar la casilla **No soy un robot** antes de pagar.

### Iglesias sin donaciones en línea {#churches-without-online-giving}

Si su iglesia no tiene configurado un proveedor de donaciones, los eventos de pago pueden seguir recibiendo inscripciones. El paso de pago informa a los inscritos que el pago en línea no está disponible y que pueden pagar directamente a la iglesia, y un botón **Inscribirse y pagar después** guarda la inscripción. Se guarda como **pendiente** con el monto total como saldo pendiente, y aparece en la lista con una advertencia de saldo. Cobre el dinero de la forma en que su iglesia normalmente lo hace.

:::info
B1 no tiene forma de marcar un pago fuera de línea como recibido. El saldo pendiente permanece en la lista y en la tarjeta de [Mis inscripciones](../../b1-church/events/my-registrations.md) del inscrito después de que usted lo cobre, así que lleve su propio registro de quién ha pagado.
:::

## Artículos relacionados

- [Creación de calendarios](./creating-calendars.md#enabling-event-registration) — habilitar la inscripción y la configuración básica
- [Configuración de donaciones en línea](../donations/online-giving-setup.md) — configurar la pasarela de pago que se usa al pagar
- [Inscribirse a eventos](../../b1-church/events/registering.md) — lo que ven los miembros al registrarse
- [Mis inscripciones](../../b1-church/events/my-registrations.md) — cómo los miembros pagan saldos y editan sus inscripciones
