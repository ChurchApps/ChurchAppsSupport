---
title: "Inscripciones pagadas"
---

# Inscripciones pagadas

<div class="article-intro">

La inscripción a eventos puede ir más allá de un simple conteo de personas. Puede definir tipos de asistente con precio (como Adulto y Niño), ofrecer complementos opcionales con sus propios precios y cantidades, crear códigos de descuento y cobrar el pago al inscribirse a través del proveedor de donaciones que su iglesia ya utiliza. Cuando un evento se llena, una lista de espera opcional mantiene en fila a los miembros interesados y los promueve automáticamente a medida que se liberan lugares.

</div>

## Video de capacitación

<YouTube id="eGSZv24Dlzk" title="Inscripción a eventos y eventos de pago en B1" next="Lanzamiento del sitio web de su iglesia en B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Active primero la inscripción en el evento: consulte [Creación de calendarios](creating-calendars#enabling-event-registration)
- Para cobrar pagos en línea, su iglesia necesita [tener configuradas las donaciones en línea](../donations/online-giving-setup.md) (Stripe, PayPal o Kingdom Funding). Los eventos gratuitos no requieren configuración de donaciones. Sin donaciones en línea, las inscripciones pagadas siguen funcionando, pero las personas pagan directamente a la iglesia; consulte [Iglesias sin donaciones en línea](#churches-without-online-giving).

</div>

## Abrir la configuración de inscripción

1. En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda), elija **Calendarios > Inscripciones** y abra su evento (o ábralo desde su calendario).
2. La tarjeta **Configuración de inscripción** muestra lo básico: **Habilitar inscripción**, **Capacidad**, **Apertura/Cierre de inscripciones**, **Etiquetas** y **Preguntas de inscripción**.
3. Debajo de lo básico hay tres acordeones: **Tipos de asistente**, **Selecciones** y **Códigos de descuento**.

## Tipos de asistente

Los tipos de asistente le permiten cobrar precios distintos según el tipo de asistente, y limitar cada uno por separado.

1. Expanda el acordeón **Tipos de asistente** y haga clic en **Agregar tipo**.
2. Escriba un **nombre** (por ejemplo, "Adulto", "Niño", "Estudiante").
3. Establezca un **precio**. Use 0 para un tipo gratuito.
4. Opcionalmente, establezca una **capacidad** solo para este tipo (por ejemplo, solo 20 lugares para niños). Déjelo en blanco si no hay límite por tipo.
5. Haga clic en **Guardar**.

Durante la inscripción, cada asistente elige un tipo; los tipos agotados se muestran como **Agotado** y no se pueden seleccionar. La lista de inscritos muestra el tipo de cada asistente y los conteos acumulados por tipo.

## Selecciones

Las selecciones son complementos opcionales con precio: camisetas, planes de comida, mejoras de actividades.

1. Expanda el acordeón **Selecciones** y haga clic en **Agregar selección**.
2. Escriba un **nombre**, una **descripción** opcional y un **precio** (0 se muestra como "Gratis").
3. Opcionalmente, establezca una **capacidad** (total disponible en todas las inscripciones) y una **Cantidad máx.** (la mayor cantidad que una inscripción puede pedir).
4. Haga clic en **Guardar**.

Quienes se inscriben eligen cantidades durante el registro, y los totales cuentan contra la capacidad para que nunca se venda de más.

## Códigos de descuento

1. Expanda el acordeón **Códigos de descuento** y haga clic en **Agregar código de descuento**.
2. Escriba el **código** que escribirán quienes se inscriben.
3. Elija el **tipo**: **Porcentaje** o **Monto**, y su **valor**.
4. Opcionalmente, limite el código con una **fecha de inicio** / **fecha de fin**, un **mínimo de miembros** (cantidad mínima de asistentes en la inscripción) y **usos máximos**.
5. Haga clic en **Guardar**.

Cada código muestra un conteo de **Usos** para que vea cuántas veces se ha canjeado. Quienes se inscriben reciben retroalimentación inmediata al aplicar un código, incluidos mensajes claros cuando un código ha vencido, aún no ha comenzado o requiere más asistentes.

## Lista de espera {#waitlist}

Active **Habilitar lista de espera** en la tarjeta Configuración de inscripción. Cuando el evento llega a su capacidad:

- A los nuevos inscritos se les ofrece un lugar en la lista de espera en lugar de rechazarlos. Completan el mismo registro (se omite el pago mientras están en lista de espera).
- Cuando alguien cancela, la inscripción en lista de espera más antigua se **promueve automáticamente** y recibe un correo electrónico avisando que se liberó un lugar. Si le debe un saldo, el correo lo enlaza con [Mis inscripciones](../../b1-church/events/my-registrations) en el sitio de B1 de su iglesia, donde puede completar el pago.
- Puede promover a alguien manualmente en cualquier momento con la acción **Promover** en una fila de lista de espera, lo cual resulta útil después de aumentar la capacidad del evento.

:::info
Las inscripciones promovidas siguen *pendientes* hasta que se pague cualquier saldo; al pagar (o si no hay nada que pagar), se confirman.
:::

## La lista de inscritos {#the-registration-roster}

Abra un evento desde la página de Inscripciones para ver todas las inscripciones. El título de la tarjeta muestra cuántas inscripciones ocupan un lugar frente a la capacidad (por ejemplo, *Inscripciones (18 / 20)*). Solo cuentan las inscripciones pendientes y confirmadas; cuando hay personas en lista de espera, el título agrega el número (por ejemplo, *· 3 en lista de espera*), y el mismo número aparece debajo de la barra de capacidad. La tabla muestra **Nombre**, **Miembros**, **Tipo** (el tipo de cada asistente), **Pagado / Total** (con una advertencia de saldo cuando aún se debe dinero), **Estado** y **Fecha**, además de los contadores por tipo encima de la tabla.

- Haga clic en el ícono de detalles de una fila para abrir el cuadro **Detalles de la inscripción**: miembros, selecciones, pagado/saldo y una tabla de **Pagos** con cada cargo (monto, método, fecha).
- **Exportar CSV** descarga la lista completa con columnas de miembros, tipos de asistente, selecciones, pagado/total/saldo, estado y una columna por cada pregunta de inscripción.
- **Agregar asistente** registra una inscripción sin conexión o por teléfono para cualquier persona de su iglesia. Elija la persona y, en un evento de pago, su tipo de asistente. Su tarjeta no se cobra: una inscripción pagada se guarda como **pendiente** con el monto completo como saldo. Si su iglesia tiene donaciones en línea, la persona puede pagarlo desde [Mis inscripciones](../../b1-church/events/my-registrations); si no, cóbrelo en persona. Necesita el permiso de edición de inscripciones para agregar asistentes.

:::info
Los reembolsos no se procesan dentro de B1. Si necesita reembolsar una inscripción pagada cancelada, emita el reembolso desde el panel de su proveedor de donaciones (por ejemplo, Stripe).
:::

## Cómo funciona el pago

Los pagos pasan por la misma pasarela de donaciones que su iglesia ya usa para las donaciones: los datos de la tarjeta van directamente al proveedor y nunca llegan a los servidores de B1. Los precios siempre se calculan en el servidor a partir de sus tipos, selecciones y códigos de descuento configurados, así que quien se inscribe no puede alterar el total. Los miembros que iniciaron sesión pueden pagar con una tarjeta guardada. Los invitados ingresan una tarjeta al pagar y deben marcar la casilla **No soy un robot** antes de pagar.

### Iglesias sin donaciones en línea {#churches-without-online-giving}

Si su iglesia no tiene configurado un proveedor de donaciones, los eventos de pago aún pueden recibir inscripciones. El paso de pago informa a quienes se inscriben que el pago en línea no está disponible y que pueden pagar directamente a la iglesia, y un botón **Inscribirse y pagar después** guarda la inscripción. Se guarda como **pendiente** con el monto completo como saldo, y aparece en la lista con una advertencia de saldo. Cobre el dinero como su iglesia normalmente lo hace.

:::info
B1 no tiene forma de marcar un pago sin conexión como recibido. El saldo pendiente permanece en la lista y en la tarjeta de [Mis inscripciones](../../b1-church/events/my-registrations) del inscrito después de que usted lo cobre, así que lleve su propio registro de quién ha pagado.
:::

## Artículos relacionados

- [Creación de calendarios](creating-calendars#enabling-event-registration): active la inscripción y la configuración básica
- [Configuración de donaciones en línea](../donations/online-giving-setup.md): configure la pasarela de pago usada al pagar
- [Inscribirse a eventos](../../b1-church/events/registering): lo que ven los miembros al inscribirse
- [Mis inscripciones](../../b1-church/events/my-registrations): cómo los miembros pagan saldos y editan sus inscripciones
