---
title: "Registros Pagos"
---

# Registros Pagos

<div class="article-intro">

El registro de eventos puede ir más allá de un simple conteo de asistentes. Puedes definir tipos de asistentes con precio (como Adulto e Infantil), ofrecer complementos opcionales con sus propios precios y cantidades, crear códigos de descuento y recopilar pagos al registrarse a través del proveedor de donaciones existente de tu iglesia. Cuando un evento se llena, una lista de espera opcional mantiene a los miembros interesados en la fila y los promueve automáticamente cuando se abren lugares.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Habilita primero el registro en el evento -- consulta [Creación de Calendarios](creating-calendars#enabling-event-registration)
- Para recopilar pagos, tu iglesia necesita [donación en línea configurada](../donations/online-giving-setup.md) (Stripe, PayPal o Kingdom Funding). Los eventos gratuitos no necesitan configuración de donaciones.

</div>

## Abriendo la Configuración de Registro

1. En B1 Admin, abre el [menú Salto](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), elige **Calendarios > Registros**, y abre tu evento (o abre el evento desde su calendario).
2. La tarjeta **Configuración de Registro** muestra lo básico -- **Habilitar Registro**, **Capacidad**, **Registro Se Abre/Cierra**, **Etiquetas** y **Preguntas de Registro**.
3. Debajo de lo básico hay tres acordeones: **Tipos de Asistentes**, **Selecciones** y **Códigos de Descuento**.

## Tipos de Asistentes

Los tipos de asistentes te permiten cobrar diferentes precios para diferentes tipos de asistentes -- y limitar cada uno por separado.

1. Expande el acordeón **Tipos de Asistentes** y haz clic en **Agregar Tipo**.
2. Ingresa un **Nombre** (p. ej., "Adulto", "Infantil", "Estudiante").
3. Establece un **Precio**. Usa 0 para un tipo gratuito.
4. Opcionalmente establece una **Capacidad** solo para este tipo (p. ej., solo 20 lugares para Infantil). Déjalo en blanco para sin límite por tipo.
5. Haz clic en **Guardar**.

Durante el registro, cada asistente elige un tipo; los tipos agotados se muestran como **Agotado** y no pueden ser seleccionados. El registro muestra el tipo de cada asistente y conteos en ejecución por tipo.

## Selecciones

Las selecciones son complementos opcionales con precio -- camisetas, planes de comidas, mejoras de actividades.

1. Expande el acordeón **Selecciones** y haz clic en **Agregar Selección**.
2. Ingresa un **Nombre**, **Descripción** opcional y un **Precio** (0 se muestra como "Gratis").
3. Opcionalmente establece una **Capacidad** (total disponible en todos los registros) y una **Cantidad Máxima** (la cantidad máxima que un registro puede ordenar).
4. Haz clic en **Guardar**.

Los registrantes eligen cantidades durante la inscripción, y los totales se cuentan contra la capacidad para que nunca tengas sobreventa.

## Códigos de Descuento

1. Expande el acordeón **Códigos de Descuento** y haz clic en **Agregar Código de Descuento**.
2. Ingresa el **Código** que los registrantes escribirán.
3. Elige el **Tipo** -- **Porcentaje** o **Monto** -- y su **Valor**.
4. Opcionalmente limita el código con una **Fecha de Inicio** / **Fecha de Fin**, un **Mínimo de Miembros** (número mínimo de asistentes en el registro) y **Usos Máximos**.
5. Haz clic en **Guardar**.

Cada código muestra un conteo de **Usos** para que puedas ver con qué frecuencia ha sido canjeado. Los registrantes reciben retroalimentación instantánea cuando aplican un código -- incluyendo mensajes claros cuando un código ha expirado, no ha comenzado o necesita más asistentes.

## Lista de Espera

Activa **Habilitar Lista de Espera** en la tarjeta de Configuración de Registro. Cuando el evento alcanza capacidad:

- A los nuevos registrantes se les ofrece un lugar en la lista de espera en lugar de ser rechazados. Completan el mismo registro (el pago se omite mientras están en lista de espera).
- Cuando alguien cancela, el registro en lista de espera más antiguo es **promovido automáticamente** y recibe un correo electrónico informando que se abrió un lugar. Si deben un saldo, el correo electrónico los vincula para completar el pago.
- Puedes promover a alguien manualmente en cualquier momento con la acción **Promover** en una fila en lista de espera -- útil después de aumentar la capacidad del evento.

:::info
Los registros promovidos permanecen *pendientes* hasta que se pague cualquier saldo; pagar (o no tener nada que pagar) los confirma.
:::

## El Registro de Registros

Abre un evento desde la página de Registros para ver cada registro. La tabla muestra **Nombre**, **Miembros**, **Tipo** (tipo de cada asistente), **Pagado / Total** (con una advertencia de saldo cuando aún se debe dinero), **Estado** y **Fecha**, más chips de conteo por tipo sobre la tabla.

- Haz clic en el icono de detalle de una fila para abrir el diálogo de **Detalles de Registro** -- miembros, selecciones, pagado/saldo y una tabla de **Pagos** listando cada cargo (monto, método, fecha).
- **Exportar CSV** descarga el registro completo con columnas para miembros, tipos de asistentes, selecciones, pagado/total/saldo, estado y una columna por pregunta de registro.
- **Agregar Asistente** aún te permite registrar inscripciones sin conexión manualmente.

:::info
Los reembolsos no se procesan dentro de B1. Si necesitas reembolsar un registro pagado cancelado, emite el reembolso desde el panel de tu proveedor de donaciones (p. ej., Stripe).
:::

## Cómo Funciona el Pago

Los pagos se realizan a través de la misma puerta de enlace de donaciones que tu iglesia ya usa para donaciones -- los detalles de la tarjeta van directamente al proveedor y nunca tocan los servidores de B1. Los precios siempre se calculan en el servidor desde tus tipos, selecciones y códigos de descuento configurados, por lo que un registrante no puede alterar el total. Los miembros que han iniciado sesión pueden pagar con una tarjeta guardada; los invitados ingresan una tarjeta en el proceso de pago.

## Artículos Relacionados

- [Creación de Calendarios](creating-calendars#enabling-event-registration) -- habilita el registro y la configuración básica
- [Configuración de Donación En Línea](../donations/online-giving-setup.md) -- configura la puerta de enlace de pago utilizada en el proceso de pago
- [Registrarse en Eventos](../../b1-church/events/registering) -- lo que los miembros ven cuando se registran
- [Mis Registros](../../b1-church/events/my-registrations) -- cómo los miembros pagan saldos y editan registros
