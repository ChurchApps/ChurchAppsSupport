---
title: "Compatibilidad con varias monedas"
description: "Registre e informe donaciones en distintas monedas en B1 Admin, incluida la entrada manual, las donaciones en línea con Stripe y cómo se convierten los totales combinados."
---

# Compatibilidad con varias monedas

<div class="article-intro">

La función de varias monedas de B1 permite que su iglesia acepte y registre donaciones en distintas monedas. Es especialmente útil para iglesias con miembros internacionales, misioneros o varias sedes en distintos países.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita permiso para administrar donaciones. Consulte [Roles y permisos](../people/roles-permissions.md) para obtener más detalles.
- Configure sus [donaciones en línea](./online-giving-setup.md) con Stripe, que admite transacciones en varias monedas. Una iglesia sin donaciones en línea también puede elegir la moneda en la que se registran sus donativos ingresados a mano.
- Conozca las necesidades contables de su iglesia para manejar varias monedas.

</div>

La moneda de su iglesia empieza siendo la del país indicado al registrarse (por ejemplo, chelines kenianos para una iglesia en Kenia), y se usa si todavía no se ha guardado ninguna moneda. Puede cambiarla en cualquier momento en **Manage Church → Giving**. Si no se reconoce su país, empieza en dólares estadounidenses.

## Habilitar varias monedas

La compatibilidad con varias monedas ya está habilitada de forma predeterminada en B1. Una vez habilitada:

- Los miembros pueden dar en su moneda local al donar en línea
- Usted puede registrar donaciones manuales en cualquier moneda
- Los informes de donaciones muestran los montos en su moneda original
- Stripe se encarga de la conversión de monedas automáticamente para las donaciones en línea

## Monedas compatibles

El sistema admite las principales monedas del mundo, entre ellas:

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

Las monedas disponibles para las donaciones en línea dependen de las monedas admitidas por su cuenta de Stripe.

## Registrar donaciones en distintas monedas

### Donaciones en línea

Cuando un miembro da en línea a través de Stripe:

1. Selecciona su moneda preferida al pagar
2. Stripe procesa el pago en esa moneda
3. La donación se registra en B1 con el monto en la moneda original
4. Stripe se encarga automáticamente de cualquier conversión necesaria a la moneda predeterminada de su cuenta

### Entrada manual

Las donaciones en efectivo y con cheque que usted introduce a mano se registran en la moneda de su iglesia: la **Currency** configurada en **Settings > Giving** (consulte [Elegir la moneda de su iglesia](./online-giving-setup.md#choosing-your-currency)). No hay una elección de moneda por cada donativo. El cuadro **Amount** muestra al final el código de la moneda (por ejemplo, *PHP*) para que sepa en qué moneda está escribiendo.

1. Vaya a **Donations > Batches** en B1 Admin y abra el lote
2. Haga clic en **Add Donation** en la parte superior de la página del lote
3. Escriba el monto en la moneda de su iglesia
4. Complete el resto de los detalles de la donación
5. Haga clic en **Save**

Al editar un donativo existente se conserva la moneda con la que se registró por primera vez.

## Ver donaciones en varias monedas

### Informes de donaciones

Los informes de donaciones muestran los montos en su moneda original:

- Los registros de donaciones individuales muestran el código de moneda (por ejemplo, "$100.00 USD")
- Los totales se calculan por moneda
- Puede filtrar por monedas específicas

### Totales convertidos {#converted-totals}

Cada vez que B1 muestra un total combinado -- las tarjetas KPI del resumen de donaciones, el total de un lote de donaciones y el total de un fondo --, las donaciones registradas en una moneda distinta a la predeterminada de su iglesia se convierten a la moneda de su iglesia con los tipos de cambio actuales. De este modo, el total es un número único y significativo en lugar de sumar monedas distintas. Siempre que se aplica una conversión, aparece una nota **Converted at current exchange rates** debajo del total. Las líneas de donaciones individuales siguen mostrándose en su moneda original.

### Estados de cuenta de donaciones

Al generar los estados de cuenta de donaciones:

- Cada donativo aparece con su moneda original
- Los totales se desglosan por moneda
- Los miembros ven exactamente lo que dieron en cada moneda

## Integración con Stripe

Para las donaciones en línea, Stripe se encarga de las transacciones en varias monedas:

- **Conversión automática** -- Stripe convierte las monedas a la moneda predeterminada de su cuenta
- **Tipos de cambio** -- Stripe usa los tipos de cambio de mercado vigentes
- **Comisiones** -- La conversión de moneda puede generar comisiones adicionales de Stripe
- **Moneda de pago** -- Los fondos se depositan en la moneda predeterminada de su cuenta

:::info
Consulte su panel de Stripe para ver los tipos de cambio actuales y las comisiones asociadas a las transacciones en varias monedas.
:::

## Consideraciones contables

Cuando trabaje con varias monedas:

- **Registros** -- Lleve un control de los montos y las monedas originales de las donaciones para que los informes sean precisos
- **Tipos de cambio** -- Tenga en cuenta que los tipos de conversión de Stripe pueden diferir de los de su banco
- **Recibos fiscales** -- Consulte a su contador sobre cómo informar las donaciones en distintas monedas a efectos fiscales
- **Asignación a fondos** -- Puede asignar donaciones a fondos específicos sin importar la moneda

## Buenas prácticas

- **Moneda predeterminada** -- Configure la moneda principal de su iglesia en **Settings > Giving** para que las donaciones ingresadas a mano y los totales de donaciones la usen
- **Comunicación clara** -- Indique a los donantes en qué moneda están dando durante el proceso de pago
- **Informes coherentes** -- Los totales combinados siempre se convierten automáticamente a la moneda de su iglesia; use el filtro de moneda por donativo cuando necesite ver los montos originales
- **Conciliación periódica** -- Concilie los depósitos de Stripe con sus registros de donaciones, teniendo en cuenta las conversiones de moneda

## Limitaciones

- La conversión de moneda para el procesamiento de pagos la realiza Stripe solo para las donaciones en línea; las donaciones manuales se registran tal como se introducen, sin conversión automática
- Los informes históricos y las líneas de donaciones individuales siempre muestran la moneda original en la que se registró la donación
- Los totales combinados (tarjetas KPI, totales de lotes y totales de fondos) se convierten a la moneda de su iglesia con los tipos de cambio actuales; estos tipos pueden diferir ligeramente de los de su banco o de los de Stripe en el momento en que se liquidan los fondos

## Artículos relacionados

- [Configuración de donaciones en línea](./online-giving-setup.md) -- Configure Stripe para aceptar donaciones
- [Registrar donaciones](./recording-donations.md) -- Introduzca manualmente los registros de donaciones
- [Informes de donaciones](./donation-reports.md) -- Genere y consulte resúmenes de donaciones
- [Estados de cuenta de donaciones](./giving-statements.md) -- Cree estados de cuenta anuales de donaciones
