---
title: "Registraciones Pagadas"
---

# Registraciones Pagadas

<div class="article-intro">

El registro de eventos puede ir más allá de un simple conteo de asistentes. Puede definir tipos de asistentes con precios (como Adulto e Infantil), ofrecer complementos opcionales con sus propios precios y cantidades, crear códigos de descuento, y recopilar pagos en el registro a través del proveedor de donaciones existente de su iglesia. Cuando un evento se llena, una lista de espera opcional mantiene a los miembros interesados en línea y los promueve automáticamente cuando se abren espacios.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Habilite el registro en el evento primero — consulte [Creando Calendarios](creating-calendars#enabling-event-registration)
- Para recopilar pagos, su iglesia necesita [donaciones en línea configuradas](../donations/online-giving-setup.md) (Stripe, PayPal, o Kingdom Funding). Los eventos gratuitos no requieren configuración de donaciones.

</div>

## Abriendo la Configuración de Registraciones

1. En B1 Admin, vaya a la página **Registraciones** y abra su evento (o abra el evento desde su calendario).
2. La tarjeta **Configuración de Registraciones** muestra lo básico — **Habilitar Registración**, **Capacidad**, **Registración Abre/Cierra**, **Etiquetas**, y **Preguntas de Registración**.
3. Debajo de lo básico hay tres acordeones: **Tipos de Asistentes**, **Selecciones**, y **Códigos de Descuento**.

## Tipos de Asistentes

Los tipos de asistentes le permiten cobrar diferentes precios para diferentes tipos de asistentes — y limitar cada uno por separado.

1. Expanda el acordeón **Tipos de Asistentes** y haga clic en **Agregar Tipo**.
2. Ingrese un **Nombre** (p. ej. "Adulto", "Infantil", "Estudiante").
3. Establezca un **Precio**. Use 0 para un tipo gratuito.
4. Opcionalmente establezca una **Capacidad** solo para este tipo (p. ej. solo 20 espacios para Infantil). Deje en blanco para sin límite por tipo.
5. Haga clic en **Guardar**.

Durante el registro, cada asistente elige un tipo; los tipos agotados se muestran como **Agotado** y no se pueden seleccionar. El registro muestra el tipo de cada asistente y los conteos actuales por tipo.

## Selecciones

Las selecciones son complementos opcionales con precio — camisetas, planes de comidas, mejoras de actividades.

1. Expanda el acordeón **Selecciones** y haga clic en **Agregar Selección**.
2. Ingrese un **Nombre**, una **Descripción** opcional, y un **Precio** (0 se muestra como "Gratuito").
3. Opcionalmente establezca una **Capacidad** (total disponible en todos los registros) y una **Cantidad Máxima** (la cantidad máxima que un registro puede pedir).
4. Haga clic en **Guardar**.

Los participantes eligen cantidades durante el registro, y los totales se contabilizan contra la capacidad para que nunca sobrevenda.

## Códigos de Descuento

1. Expanda el acordeón **Códigos de Descuento** y haga clic en **Agregar Código de Descuento**.
2. Ingrese el **Código** que escribirán los participantes.
3. Elija el **Tipo** — **Porcentaje** o **Cantidad** — y su **Valor**.
4. Opcionalmente limite el código con una **Fecha de Inicio** / **Fecha de Fin**, un **Mínimo de Miembros** (número mínimo de asistentes en la registración), y **Usos Máximos**.
5. Haga clic en **Guardar**.

Cada código muestra un conteo de **Usos** para que pueda ver con qué frecuencia ha sido redimido. Los participantes obtienen retroalimentación instantánea cuando aplican un código — incluyendo mensajes claros cuando un código ha expirado, no ha comenzado, o necesita más asistentes.

## Lista de Espera

Active **Habilitar Lista de Espera** en la tarjeta Configuración de Registraciones. Cuando el evento alcanza la capacidad:

- A los nuevos participantes se les ofrece un lugar en la lista de espera en lugar de ser rechazados. Completan el mismo registro (el pago se omite mientras estén en lista de espera).
- Cuando alguien cancela, la registración en lista de espera más antigua es **promovida automáticamente** y recibe un correo electrónico de que se abrió un espacio. Si deben un saldo, el correo electrónico los vincula para completar el pago.
- Puede promover a alguien manualmente en cualquier momento con la acción **Promover** en una fila en lista de espera — útil después de aumentar la capacidad del evento.

:::info
Las registraciones promovidas permanecen *pendientes* hasta que se pague cualquier saldo; pagar (o no tener nada que pagar) las confirma.
:::

## El Registro de Registraciones

Abra un evento desde la página Registraciones para ver cada registración. La tabla muestra **Nombre**, **Miembros**, **Tipo** (tipo de cada asistente), **Pagado / Total** (con una advertencia de saldo cuando se debe dinero), **Estado**, y **Fecha**, además de fichas de conteo por tipo por encima de la tabla.

- Haga clic en el icono de detalles de una fila para abrir el diálogo **Detalles de Registración** — miembros, selecciones, pagado/saldo, y una tabla **Pagos** que enumera cada cargo (cantidad, método, fecha).
- **Exportar CSV** descarga el registro completo con columnas para miembros, tipos de asistentes, selecciones, pagado/total/saldo, estado, y una columna por pregunta de registración.
- **Agregar Asistente** aún le permite registrar registros offline manualmente.

:::info
Los reembolsos no se procesan dentro de B1. Si necesita reembolsar una registración pagada cancelada, emita el reembolso desde el panel del proveedor de donaciones (p. ej. Stripe).
:::

## Cómo Funciona el Pago

Los pagos se realizan a través de la puerta de enlace de donaciones que su iglesia ya usa para donaciones — los detalles de la tarjeta van directamente al proveedor y nunca tocan los servidores de B1. Los precios siempre se calculan en el servidor desde sus tipos configurados, selecciones y códigos de descuento, por lo que un participante no puede manipular el total. Los miembros registrados pueden pagar con una tarjeta guardada; los invitados ingresan una tarjeta al verificar.

## Artículos Relacionados

- [Creando Calendarios](creating-calendars#enabling-event-registration) — habilitar el registro y la configuración básica
- [Configuración de Donaciones en Línea](../donations/online-giving-setup.md) — configurar la puerta de enlace de pagos utilizada al verificar
- [Registrándose para Eventos](../../b1-church/events/registering) — lo que los miembros ven cuando se registran
- [Mis Registraciones](../../b1-church/events/my-registrations) — cómo los miembros pagan saldos y editan registraciones
