---
title: "Soporte de múltiples monedas"
---

# Soporte de múltiples monedas

<div class="article-intro">

La función de múltiples monedas de B1 permite que tu iglesia acepte y registre donaciones en diferentes monedas. Esto es especialmente útil para iglesias con miembros internacionales, misioneros u múltiples sedes en diferentes países.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesitas permiso para gestionar donaciones. Ver [Roles y permisos](../people/roles-permissions.md) para más detalles.
- Configura tu [donación en línea](./online-giving-setup.md) con Stripe, que admite transacciones en múltiples monedas.
- Comprende las necesidades contables de tu iglesia para manejar múltiples monedas.

</div>

## Activar múltiples monedas

La compatibilidad con múltiples monedas está ahora habilitada de forma predeterminada en B1. Una vez habilitada:

- Los miembros pueden donar en su moneda local al hacer donaciones en línea
- Puedes registrar manualmente donaciones en cualquier moneda
- Los reportes de donaciones muestran cantidades en su moneda original
- Stripe maneja la conversión de moneda automáticamente para donaciones en línea

## Monedas admitidas

El sistema admite todas las monedas principales del mundo, incluyendo:

- **USD** -- Dólar estadounidense
- **EUR** -- Euro
- **GBP** -- Libra esterlina
- **CAD** -- Dólar canadiense
- **AUD** -- Dólar australiano
- **MXN** -- Peso mexicano
- **BRL** -- Real brasileño
- **INR** -- Rupia india
- **CNY** -- Yuan chino
- **JPY** -- Yen japonés
- Y muchas más...

Las monedas disponibles para donaciones en línea dependen de las monedas que admita tu cuenta de Stripe.

## Registrar donaciones en diferentes monedas

### Donaciones en línea

Cuando un miembro dona en línea a través de Stripe:

1. Selecciona su moneda preferida en el proceso de pago
2. Stripe procesa el pago en esa moneda
3. La donación se registra en B1 con la cantidad de moneda original
4. Stripe maneja automáticamente cualquier conversión de moneda necesaria a tu moneda predeterminada

### Entrada manual

Para registrar una donación en efectivo o cheque en una moneda diferente:

1. Navega a **Donaciones** en B1 Admin
2. Haz clic en **Agregar donación**
3. Selecciona la moneda del menú desplegable de moneda
4. Ingresa la cantidad en esa moneda
5. Completa el resto de los detalles de la donación
6. Haz clic en **Guardar**

## Ver donaciones en múltiples monedas

### Reportes de donaciones

Los reportes de donaciones muestran cantidades en su moneda original:

- Los registros de donaciones individuales muestran el código de moneda (p. ej., "$100.00 USD")
- Los totales se calculan por moneda
- Puedes filtrar por monedas específicas

### Declaraciones de donaciones

Cuando generes declaraciones de donaciones:

- Cada donación aparece con su moneda original
- Los totales se desglosan por moneda
- Los miembros ven exactamente lo que donaron en cada moneda

## Integración de Stripe

Para donaciones en línea, Stripe maneja transacciones en múltiples monedas:

- **Conversión automática** -- Stripe convierte monedas a tu moneda predeterminada
- **Tasas de cambio** -- Stripe utiliza tasas de cambio del mercado actual
- **Comisiones** -- La conversión de moneda puede incurrir en comisiones adicionales de Stripe
- **Moneda de depósito** -- Los fondos se depositan en tu moneda predeterminada

:::info
Consulta tu panel de Stripe para ver las tasas de conversión actuales y cualquier comisión asociada con transacciones en múltiples monedas.
:::

## Consideraciones contables

Cuando trabajes con múltiples monedas:

- **Mantenimiento de registros** -- Mantén un seguimiento de los montos de donación originales y las monedas para reportes precisos
- **Tasas de cambio** -- Ten en cuenta que las tasas de conversión de Stripe pueden diferir de las tasas de tu banco
- **Recibos fiscales** -- Consulta con tu contador sobre cómo reportar donaciones en diferentes monedas para propósitos fiscales
- **Asignación de fondos** -- Puedes asignar donaciones a fondos específicos independientemente de la moneda

## Mejores prácticas

- **Moneda predeterminada** -- Establece tu moneda principal de la iglesia como predeterminada para la mayoría de las transacciones
- **Comunicación clara** -- Informa a los donantes qué moneda están usando durante el proceso de pago
- **Reportes consistentes** -- Decide si reportar en monedas originales o convertir a una única moneda para resúmenes
- **Reconciliación regular** -- Reconcilia los pagos de Stripe con tus registros de donaciones, contabilizando las conversiones de moneda

## Limitaciones

- La conversión de moneda es manejada por Stripe solo para donaciones en línea
- Las donaciones manuales se registran tal como se ingresan sin conversión automática
- Los reportes históricos muestran donaciones en sus monedas originales
- Los cálculos de totales se realizan por moneda, no entre monedas

## Artículos relacionados

- [Configuración de donaciones en línea](./online-giving-setup.md) -- Configura Stripe para aceptar donaciones
- [Registrar donaciones](./recording-donations.md) -- Ingresa manualmente registros de donaciones
- [Reportes de donaciones](./donation-reports.md) -- Genera y visualiza resúmenes de donaciones
- [Declaraciones de donaciones](./giving-statements.md) -- Crea declaraciones de donaciones de fin de año
