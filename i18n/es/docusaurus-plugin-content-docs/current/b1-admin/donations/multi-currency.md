---
title: "Soporte Multi-Moneda"
---

# Soporte Multi-Moneda

<div class="article-intro">

La función multi-moneda de B1 permite que tu iglesia acepte y rastree donaciones en diferentes monedas. Esto es particularmente útil para iglesias con miembros internacionales, misioneros o múltiples campus en diferentes países.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Necesitas permiso para gestionar donaciones. Consulta [Roles y Permisos](../people/roles-permissions.md) para detalles.
- Configura tus [donaciones en línea](./online-giving-setup.md) con Stripe, que soporta transacciones multi-moneda.
- Comprende las necesidades contables de tu iglesia para manejar múltiples monedas.

</div>

## Habilitar Multi-Moneda

El soporte multi-moneda ahora está habilitado por defecto en B1. Una vez habilitado:

- Los miembros pueden dar en su moneda local al donar en línea
- Puedes registrar manualmente donaciones en cualquier moneda
- Los reportes de donaciones muestran montos en su moneda original
- Stripe maneja automáticamente la conversión de moneda para donaciones en línea

## Monedas Soportadas

El sistema soporta todas las principales monedas mundiales, incluyendo:

- **USD** -- Dólar Estadounidense
- **EUR** -- Euro
- **GBP** -- Libra Esterlina
- **CAD** -- Dólar Canadiense
- **AUD** -- Dólar Australiano
- **MXN** -- Peso Mexicano
- **BRL** -- Real Brasileño
- **INR** -- Rupia India
- **CNY** -- Yuan Chino
- **JPY** -- Yen Japonés
- Y muchas más...

Las monedas disponibles para donaciones en línea dependen de las monedas soportadas por tu cuenta de Stripe.

## Registrar Donaciones en Diferentes Monedas

### Donaciones en Línea

Cuando un miembro dona en línea a través de Stripe:

1. Seleccionan su moneda preferida al momento del pago
2. Stripe procesa el pago en esa moneda
3. La donación se registra en B1 con el monto en la moneda original
4. Stripe maneja automáticamente cualquier conversión de moneda necesaria a la moneda predeterminada de tu cuenta

### Entrada Manual

Para registrar una donación en efectivo o cheque en una moneda diferente:

1. Navega a **Donaciones** en B1 Admin
2. Haz clic en **Agregar Donación**
3. Selecciona la moneda del menú desplegable de moneda
4. Ingresa el monto en esa moneda
5. Completa el resto de los detalles de la donación
6. Haz clic en **Guardar**

## Ver Donaciones Multi-Moneda

### Reportes de Donaciones

Los reportes de donaciones muestran montos en su moneda original:

- Los registros individuales de donaciones muestran el código de moneda (ej., "$100.00 USD")
- Los totales se calculan por moneda
- Puedes filtrar por monedas específicas

### Estados de Cuenta de Ofrendas

Al generar estados de cuenta de ofrendas:

- Cada donación aparece con su moneda original
- Los totales se desglosan por moneda
- Los miembros ven exactamente lo que dieron en cada moneda

## Integración con Stripe

Para donaciones en línea, Stripe maneja transacciones multi-moneda:

- **Conversión automática** -- Stripe convierte monedas a la moneda predeterminada de tu cuenta
- **Tasas de cambio** -- Stripe usa tasas de cambio de mercado actuales
- **Tarifas** -- La conversión de moneda puede incurrir en tarifas adicionales de Stripe
- **Moneda de pago** -- Los fondos se depositan en la moneda predeterminada de tu cuenta

:::info
Revisa tu panel de Stripe para ver tasas de conversión actuales y cualquier tarifa asociada con transacciones multi-moneda.
:::

## Consideraciones Contables

Al trabajar con múltiples monedas:

- **Mantenimiento de registros** -- Mantén un seguimiento de los montos y monedas originales de las donaciones para reportes precisos
- **Tasas de cambio** -- Ten en cuenta que las tasas de conversión de Stripe pueden diferir de las tasas de tu banco
- **Recibos fiscales** -- Consulta a tu contador sobre cómo reportar donaciones en diferentes monedas para propósitos fiscales
- **Asignación de fondos** -- Puedes asignar donaciones a fondos específicos independientemente de la moneda

## Mejores Prácticas

- **Moneda predeterminada** -- Establece la moneda principal de tu iglesia como predeterminada para la mayoría de las transacciones
- **Comunicación clara** -- Informa a los donantes en qué moneda están dando durante el proceso de pago
- **Reportes consistentes** -- Decide si reportar en monedas originales o convertir a una sola moneda para resúmenes
- **Reconciliación regular** -- Reconcilia los pagos de Stripe con tus registros de donaciones, teniendo en cuenta las conversiones de moneda

## Limitaciones

- La conversión de moneda es manejada por Stripe solo para donaciones en línea
- Las donaciones manuales se registran tal como se ingresan sin conversión automática
- Los reportes históricos muestran donaciones en sus monedas originales
- Los cálculos de totales se realizan por moneda, no entre monedas

## Artículos Relacionados

- [Configuración de Donaciones en Línea](./online-giving-setup.md) -- Configura Stripe para aceptar donaciones
- [Registro de Donaciones](./recording-donations.md) -- Ingresa manualmente registros de donaciones
- [Reportes de Donaciones](./donation-reports.md) -- Genera y visualiza resúmenes de donaciones
- [Estados de Cuenta de Ofrendas](./giving-statements.md) -- Crea estados de cuenta de ofrendas de fin de año
