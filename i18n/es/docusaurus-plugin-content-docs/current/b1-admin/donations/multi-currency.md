---
title: "Soporte Multimoneda"
---

# Soporte Multimoneda

<div class="article-intro">

La función multimoneda de B1 permite que tu iglesia acepte y registre donaciones en diferentes monedas. Esto es particularmente útil para iglesias con miembros internacionales, misioneros o múltiples sedes en diferentes países.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Necesitas permiso para gestionar donaciones. Consulta [Roles y Permisos](../people/roles-permissions.md) para obtener detalles.
- Configura tu [ofrendas en línea](./online-giving-setup.md) con Stripe, que soporta transacciones multimoneda.
- Entiende las necesidades contables de tu iglesia para manejar múltiples monedas.

</div>

## Habilitando Multimoneda

El soporte multimoneda está ahora habilitado por defecto en B1. Una vez habilitado:

- Los miembros pueden dar en su moneda local cuando donan en línea
- Puedes registrar manualmente donaciones en cualquier moneda
- Los reportes de donaciones muestran montos en su moneda original
- Stripe maneja la conversión de moneda automáticamente para ofrendas en línea

## Monedas Soportadas

El sistema soporta todas las monedas principales del mundo, incluyendo:

- **USD** -- Dólar de Estados Unidos
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

Las monedas disponibles para ofrendas en línea dependen de las monedas soportadas de tu cuenta de Stripe.

## Registrando Donaciones en Diferentes Monedas

### Donaciones en Línea

Cuando un miembro da en línea a través de Stripe:

1. Selecciona su moneda preferida en el pago
2. Stripe procesa el pago en esa moneda
3. La donación se registra en B1 con el monto de moneda original
4. Stripe maneja automáticamente cualquier conversión de moneda necesaria a tu moneda predeterminada de cuenta

### Entrada Manual

Para registrar una donación en efectivo o cheque en una moneda diferente:

1. Ve a **Donaciones** en B1 Admin
2. Haz clic en **Añadir Donación**
3. Selecciona la moneda del menú desplegable de moneda
4. Ingresa el monto en esa moneda
5. Completa el resto de los detalles de la donación
6. Haz clic en **Guardar**

## Viendo Donaciones Multimoneda

### Reportes de Donaciones

Los reportes de donaciones muestran montos en su moneda original:

- Los registros individuales de donación muestran el código de moneda (ej., "$100.00 USD")
- Los totales se calculan por moneda
- Puedes filtrar por monedas específicas

### Totales Convertidos

Dondequiera que B1 muestre un único total combinado -- las tarjetas de KPI del resumen de ofrendas, un total de lote de donación y el total de un fondo -- las donaciones registradas en una moneda distinta a tu moneda predeterminada se convierten a tu moneda de iglesia usando tipos de cambio actuales, así que el total es un número significativo único en lugar de sumar monedas diferentes juntas. Una nota de **Convertido a tipos de cambio actuales** aparece debajo del total siempre que se aplicó una conversión. Los elementos de línea de donación individuales aún muestran su moneda original.

### Declaraciones de Ofrendas

Cuando se generan declaraciones de ofrendas:

- Cada donación aparece con su moneda original
- Los totales se desglosan por moneda
- Los miembros ven exactamente qué dieron en cada moneda

## Integración de Stripe

Para ofrendas en línea, Stripe maneja transacciones multimoneda:

- **Conversión automática** -- Stripe convierte monedas a tu moneda predeterminada de cuenta
- **Tipos de cambio** -- Stripe usa tipos de cambio de mercado actuales
- **Tarifas** -- La conversión de moneda puede incurrir en tarifas adicionales de Stripe
- **Moneda de depósito** -- Los fondos se depositan en tu moneda predeterminada de cuenta

:::info
Revisa tu panel de Stripe para ver los tipos de cambio actuales y cualquier tarifa asociada con transacciones multimoneda.
:::

## Consideraciones Contables

Al trabajar con múltiples monedas:

- **Mantenimiento de registros** -- Mantén un seguimiento de los montos de donación originales y monedas para reportes precisos
- **Tipos de cambio** -- Ten en cuenta que los tipos de conversión de Stripe pueden diferir de los tipos de tu banco
- **Recibos fiscales** -- Consulta con tu contador sobre cómo reportar donaciones en diferentes monedas para propósitos fiscales
- **Asignación de fondos** -- Puedes asignar donaciones a fondos específicos independientemente de la moneda

## Mejores Prácticas

- **Moneda predeterminada** -- Establece tu moneda de iglesia primaria como la predeterminada para la mayoría de transacciones
- **Comunicación clara** -- Dile a los donantes qué moneda están dando durante el proceso de pago
- **Reportes consistentes** -- Los totales combinados siempre se convierten a tu moneda de iglesia automáticamente; usa el filtro de moneda por donación cuando necesites ver montos originales
- **Reconciliación regular** -- Reconcilia los depósitos de Stripe con tus registros de donaciones, teniendo en cuenta conversiones de moneda

## Limitaciones

- La conversión de moneda para procesamiento de pagos se maneja por Stripe solo para ofrendas en línea; las donaciones manuales se registran tal como se ingresan sin conversión automática
- Los reportes históricos y elementos de línea de donación individuales siempre muestran la moneda original en que se registró la ofrenda
- Los totales combinados (tarjetas de KPI, totales de lote, totales de fondo) se convierten a tu moneda de iglesia usando tipos de cambio actuales -- estos tipos pueden diferir ligeramente de los de tu banco o Stripe al momento en que se liquidan los fondos

## Artículos Relacionados

- [Configuración de Ofrendas en Línea](./online-giving-setup.md) -- Configura Stripe para aceptar donaciones
- [Registrando Donaciones](./recording-donations.md) -- Ingresa manualmente registros de donación
- [Reportes de Donaciones](./donation-reports.md) -- Genera y ve resúmenes de donaciones
- [Declaraciones de Ofrendas](./giving-statements.md) -- Crea declaraciones de ofrendas de fin de año
