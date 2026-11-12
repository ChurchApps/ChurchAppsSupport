---
title: "Registros de pago"
description: "Configure registros de pago para eventos en B1 Admin: tipos de asistente con precio, complementos, códigos de descuento, listas de espera y cobro de pagos a través de su proveedor de donaciones."
---

# Registros de pago

<div class="article-intro">

El registro a eventos puede ir más allá de un simple conteo de personas. Puede definir tipos de asistente con precio (como Adulto y Niño), ofrecer complementos opcionales con sus propios precios y cantidades, crear códigos de descuento y cobrar el pago en el momento del registro a través del proveedor de donaciones que su iglesia ya utiliza. Cuando un evento se llena, una lista de espera opcional mantiene en fila a los miembros interesados y los promueve automáticamente a medida que se liberan lugares.

</div>

## Video de capacitación {#training-video}

<YouTube id="eGSZv24Dlzk" title="Registro a eventos y eventos de pago en B1" next="Lanzamiento del sitio web de su iglesia en B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Habilite primero el registro en el evento; consulte [Creación de calendarios](./creating-calendars.md#enabling-event-registration)
- Para cobrar pagos en línea, su iglesia necesita [tener configurada la donación en línea](../donations/online-giving-setup.md) (Stripe, PayPal o Kingdom Funding). Los eventos gratuitos no necesitan configuración de donaciones. Sin donación en línea, los registros de pago siguen funcionando, pero las personas pagan directamente a la iglesia; consulte [Iglesias sin donación en línea](#churches-without-online-giving).

</div>

## Abrir la configuración de registro {#opening-registration-settings}

1. En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), elija **Calendarios > Registros** y haga clic en su evento (o haga clic en el evento en su calendario y elija **Administrar registros**).
2. Haga clic en **Editar configuración**. La tarjeta **Configuración de registro** muestra lo básico (**Habilitar registro**, **Capacidad**, **Habilitar lista de espera**, **Apertura/Cierre del registro**, **Etiquetas** y **Preguntas de registro**) con un botón **Guardar configuración**.
3. Debajo de lo básico hay tres secciones desplegables: **Tipos de asistente**, **Selecciones** y **Códigos de descuento**. Cada una tiene su propio botón **Guardar**, independiente de **Guardar configuración**; B1 le advierte si intenta salir con cambios sin guardar en ellas. Haga clic en **Volver a Registros** para regresar a la lista de inscritos.

## Tipos de asistente {#attendee-types}

Los tipos de asistente le permiten cobrar precios distintos a diferentes tipos de asistentes, y limitar cada uno por separado.

1. Expanda la sección desplegable **Tipos de asistente** y haga clic en **Añadir tipo**.
2. Introduzca un **Nombre** (por ejemplo, "Adulto", "Niño", "Estudiante").
3. Establezca un **Precio**. Use 0 para un tipo gratuito.
4. Opcionalmente, establezca una **Capacidad** solo para este tipo (por ejemplo, solo 20 lugares de Niño). Déjelo en blanco si no hay límite por tipo.
5. Opcionalmente, establezca **Orden** para controlar el orden en que aparecen los tipos.
6. Haga clic en **Guardar**.

Para eliminar un tipo guardado, haga clic en su icono de eliminar y confirme; se quita de inmediato. Las selecciones y los códigos de descuento se eliminan de la misma forma.

Durante el registro, cada asistente elige un tipo; los tipos agotados se muestran como **Agotado** y no se pueden seleccionar. La lista de inscritos muestra el tipo de cada asistente y los recuentos acumulados por tipo.

## Selecciones {#selections}

Las selecciones son complementos opcionales con precio: camisetas, planes de comidas, mejoras de actividades.

1. Expanda la sección desplegable **Selecciones** y haga clic en **Añadir selección**.
2. Introduzca un **Nombre**, una **Descripción** opcional y un **Precio** (0 se muestra como "Gratis").
3. Opcionalmente, establezca una **Capacidad** (total disponible en todos los registros) y una **Cantidad máx.** (la mayor cantidad que puede pedir un mismo registro).
4. Haga clic en **Guardar**.

Quienes se registran eligen las cantidades durante la inscripción, y los totales cuentan contra la capacidad para que nunca venda de más.

## Códigos de descuento {#discount-codes}

1. Expanda la sección desplegable **Códigos de descuento** y haga clic en **Añadir código de descuento**.
2. Introduzca el **Código** que escribirán quienes se registran.
3. Elija el **Tipo**, **Porcentaje** o **Monto**, y su **Valor**.
4. Opcionalmente, limite el código con una **Fecha de inicio** / **Fecha de fin**, un **Mín. de miembros** (número mínimo de asistentes en el registro) y **Usos máximos**.
5. Haga clic en **Guardar**.

Cada código muestra un contador de **Usos** para que vea con qué frecuencia se ha canjeado. Quienes se registran reciben respuesta inmediata al aplicar un código, incluidos mensajes claros cuando un código ha vencido, aún no ha comenzado o requiere más asistentes.

## Lista de espera {#waitlist}

Active **Habilitar lista de espera** en la tarjeta Configuración de registro. Cuando el evento alcanza su capacidad:

- A quienes se registran nuevos se les ofrece un lugar en la lista de espera en lugar de rechazarlos. Completan la misma inscripción (el pago se omite mientras están en lista de espera).
- Cuando alguien cancela, el registro en lista de espera más antiguo se **promueve automáticamente** y recibe un correo electrónico indicando que se liberó un lugar. Si debe un saldo, el correo lo enlaza con [Mis registros](../../b1-church/events/my-registrations.md) en el sitio de B1 de su iglesia, donde puede completar el pago.
- Puede promover a alguien manualmente en cualquier momento con la acción **Promover** en una fila en lista de espera; es útil después de aumentar la capacidad del evento.

:::info
Los registros promovidos permanecen *pendientes* hasta que se pague cualquier saldo; al pagar (o si no hay nada que pagar), se confirman.
:::

## La lista de inscritos {#the-registration-roster}

Abra un evento desde la página de Registros para ver todos los registros. El título de la tarjeta muestra cuántos registros ocupan un lugar frente a la capacidad (por ejemplo, *Registros (18 / 20)*). Solo cuentan los registros pendientes y confirmados; cuando hay personas en lista de espera, el título añade el número (por ejemplo, *· 3 en lista de espera*), y el mismo número aparece debajo de la barra de capacidad. El número más grande encima de la barra de capacidad cuenta **personas** en lugar de registros, es decir, a todos los incluidos en cada registro pendiente o confirmado; así, una familia de cuatro cuenta como cuatro. El límite de capacidad en sí sigue contando registros. La tabla muestra **Nombre**, **Miembros**, **Tipo** (el tipo de cada asistente), **Pagado / Total** (con una advertencia de saldo cuando aún se debe dinero), **Estado** y **Fecha**, además de las etiquetas de recuento por tipo encima de la tabla.

- Haga clic en el icono de detalles de una fila para abrir el cuadro de diálogo **Detalles del registro**: miembros, selecciones, pagado/saldo y una tabla de **Pagos** con cada cargo (monto, método, fecha).
- **Exportar CSV** descarga la lista completa con columnas para miembros, tipos de asistente, selecciones, pagado/total/saldo, estado y una columna por cada pregunta de registro.
- **Añadir asistente** registra una inscripción hecha fuera de línea o por teléfono para cualquier persona de su iglesia. Elija a la persona y, en un evento de pago, su tipo de asistente. No se le cobra a su tarjeta: un registro de pago se guarda como **pendiente** con el monto completo como saldo adeudado. Si su iglesia tiene donación en línea, la persona puede pagarlo desde [Mis registros](../../b1-church/events/my-registrations.md); si no, cóbrelo en persona. Necesita el permiso de edición de Registros para añadir asistentes.

:::info
B1 no procesa reembolsos. Si necesita reembolsar un registro de pago cancelado, emita el reembolso desde el panel de su proveedor de donaciones (por ejemplo, Stripe).
:::

## Cómo funciona el pago {#how-payment-works}

Los pagos se procesan a través de la misma pasarela de donaciones que su iglesia ya usa para las donaciones; los datos de la tarjeta van directamente al proveedor y nunca pasan por los servidores de B1. Los precios siempre se calculan en el servidor a partir de sus tipos, selecciones y códigos de descuento configurados, así que quien se registra no puede alterar el total. Los miembros que han iniciado sesión pueden pagar con una tarjeta guardada. Los invitados introducen una tarjeta al pagar y deben marcar la casilla **No soy un robot** antes de pagar.

### Iglesias sin donación en línea {#churches-without-online-giving}

Si su iglesia no tiene configurado un proveedor de donaciones, los eventos de pago aún pueden recibir registros. El paso de pago informa a quienes se registran que el pago en línea no está disponible y que pueden pagar directamente a la iglesia, y un botón **Registrarse y pagar después** guarda el registro. Este se guarda como **pendiente** con el monto completo como saldo adeudado, y aparece en la lista con una advertencia de saldo. Cobre el dinero de la forma habitual en su iglesia.

:::info
B1 no tiene forma de marcar un pago fuera de línea como recibido. El saldo adeudado permanece en la lista y en la tarjeta [Mis registros](../../b1-church/events/my-registrations.md) de quien se registró aunque ya lo haya pagado, así que lleve su propio registro de quién ha pagado.
:::

## Artículos relacionados {#related-articles}

- [Creación de calendarios](./creating-calendars.md#enabling-event-registration): habilite el registro y la configuración básica
- [Configuración de donación en línea](../donations/online-giving-setup.md): configure la pasarela de pago usada al pagar
- [Registrarse en eventos](../../b1-church/events/registering.md): lo que ven los miembros al inscribirse
- [Mis registros](../../b1-church/events/my-registrations.md): cómo los miembros pagan saldos y editan sus registros
