---
title: "Registros pagados"
---

# Registros pagados

<div class="article-intro">

El registro de eventos puede ir más allá de un simple conteo de cabezas. Puede definir tipos de asistentes con precio (como Adulto e Infantil), ofrecer complementos opcionales con sus propios precios y cantidades, crear códigos de descuento y recopilar pagos en el registro a través del proveedor de donaciones existente de su iglesia. Cuando un evento se llena, una lista de espera opcional mantiene a los miembros interesados en fila y los promueve automáticamente a medida que se abren espacios.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Primero habilite el registro en el evento -- vea [Crear calendarios](creating-calendars#enabling-event-registration)
- Para recopilar pagos, su iglesia necesita [donaciones en línea configuradas](../donations/online-giving-setup.md) (Stripe, PayPal, o Kingdom Funding). Los eventos gratuitos no necesitan configuración de donaciones.

</div>

## Apertura de la configuración de registro

1. En B1 Admin, vaya a la página **Registros** y abra su evento (u abra el evento de su calendario).
2. La tarjeta **Configuración de registro** muestra los conceptos básicos -- **Habilitar registro**, **Capacidad**, **Registro abre/cierra**, **Etiquetas** y **Preguntas de registro**.
3. Debajo de los conceptos básicos hay tres acordeones: **Tipos de asistentes**, **Selecciones** y **Códigos de descuento**.

## Tipos de asistentes

Los tipos de asistentes le permiten cobrar precios diferentes para diferentes tipos de asistentes -- y limitar cada uno por separado.

1. Expanda el acordeón **Tipos de asistentes** y haga clic en **Añadir tipo**.
2. Ingrese un **Nombre** (por ejemplo, "Adulto", "Niño", "Estudiante").
3. Configure un **Precio**. Use 0 para un tipo gratuito.
4. Opcionalmente configure una **Capacidad** solo para este tipo (por ejemplo, solo 20 espacios para niños). Deje en blanco para sin límite por tipo.
5. Haga clic en **Guardar**.

Durante el registro, cada asistente elige un tipo; los tipos agotados se muestran como **Agotado** y no pueden ser seleccionados. El roster muestra el tipo de cada asistente y conteos de ejecución por tipo.

## Selecciones

Las selecciones son complementos opcionales con precio -- camisetas, planes de comidas, mejoras de actividades.

1. Expanda el acordeón **Selecciones** y haga clic en **Añadir selección**.
2. Ingrese un **Nombre**, **Descripción** opcional y un **Precio** (0 se muestra como "Gratis").
3. Opcionalmente configure una **Capacidad** (total disponible en todos los registros) y una **Cantidad máxima** (la mayoría que un registro puede ordenar).
4. Haga clic en **Guardar**.

Los registrados eligen cantidades durante el registro, y los totales cuentan contra la capacidad para que nunca se agote.

## Códigos de descuento

1. Expanda el acordeón **Códigos de descuento** y haga clic en **Añadir código de descuento**.
2. Ingrese el **Código** que los registrados escribirán.
3. Elija el **Tipo** -- **Porcentaje** o **Cantidad** -- y su **Valor**.
4. Opcionalmente limite el código con una **Fecha de inicio** / **Fecha de fin**, un **Mínimo de miembros** (número mínimo de asistentes en el registro), y **Máximo de usos**.
5. Haga clic en **Guardar**.

Cada código muestra un conteo de **Usos** para que pueda ver con qué frecuencia se ha canjeado. Los registrados obtienen retroalimentación instantánea cuando aplican un código -- incluidos mensajes claros cuando un código ha expirado, aún no ha comenzado, o necesita más asistentes.

## Lista de espera

Active **Habilitar lista de espera** en la tarjeta Configuración de registro. Cuando el evento alcanza la capacidad:

- A los nuevos registrados se les ofrece un lugar en la lista de espera en lugar de ser rechazados. Completan el mismo registro (el pago se salta mientras está en la lista de espera).
- Cuando alguien cancela, el registro más antiguo en la lista de espera se **promueve automáticamente** y recibe un correo electrónico de que se abrió un espacio. Si deben un saldo, el correo electrónico los vincula para completar el pago.
- Puede promover a alguien manualmente en cualquier momento con la acción **Promover** en una fila en la lista de espera -- útil después de aumentar la capacidad del evento.

:::info
Los registros promovidos permanecen *pendientes* hasta que se pague cualquier saldo; pagar (o no tener nada que pagar) los confirma.
:::

## El roster de registro

Abra un evento desde la página Registros para ver cada registro. La tabla muestra **Nombre**, **Miembros**, **Tipo** (tipo de cada asistente), **Pagado / Total** (con una advertencia de saldo cuando todavía se debe dinero), **Estado** y **Fecha**, más fichas de conteo por tipo encima de la tabla.

- Haga clic en el icono de detalles de una fila para abrir el diálogo **Detalles de registro** -- miembros, selecciones, pagado/saldo y una tabla de **Pagos** que enumera cada cargo (cantidad, método, fecha).
- **Exportar CSV** descarga el roster completo con columnas para miembros, tipos de asistentes, selecciones, pagado/total/saldo, estado, y una columna por pregunta de registro.
- **Añadir asistente** aún le permite registrar registros fuera de línea manualmente.

:::info
Los reembolsos no se procesan dentro de B1. Si necesita reembolsar un registro cancelado pagado, emita el reembolso desde el panel de su proveedor de donaciones (por ejemplo, Stripe).
:::

## Cómo funciona el pago

Los pagos se procesan a través de la misma puerta de donaciones que su iglesia ya usa para donaciones -- los detalles de la tarjeta van directamente al proveedor y nunca tocan los servidores de B1. Los precios siempre se calculan en el servidor desde sus tipos, selecciones y códigos de descuento configurados, por lo que un registrado no puede manipular el total. Los miembros conectados pueden pagar con una tarjeta guardada; los invitados ingresan una tarjeta al pagar.

## Artículos relacionados

- [Crear calendarios](creating-calendars#enabling-event-registration) -- habilitar registro y configuración básica
- [Configuración de donaciones en línea](../donations/online-giving-setup.md) -- configure la puerta de pago utilizada al pagar
- [Registro para eventos](../../b1-church/events/registering) -- lo que los miembros ven cuando se registran
- [Mis registros](../../b1-church/events/my-registrations) -- cómo los miembros pagan saldos y editan registros
