---
title: "Compatibilidad con múltiples monedas"
description: "Registre e informe donaciones en distintas monedas en B1 Admin, incluidos el ingreso manual, las donaciones en línea con Stripe y cómo se convierten los totales combinados."
---

# Compatibilidad con múltiples monedas

<div class="article-intro">

La función de múltiples monedas de B1 permite que su iglesia acepte y registre donaciones en distintas monedas. Es especialmente útil para iglesias con miembros internacionales, misioneros o varios campus en diferentes países.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita permiso para administrar las donaciones. Consulte [Roles y permisos](../people/roles-permissions.md) para más detalles.
- Configure sus [donaciones en línea](./online-giving-setup.md) con Stripe, que admite transacciones en múltiples monedas. Una iglesia sin donaciones en línea aún puede elegir la moneda en que se registran sus donativos ingresados a mano.
- Conozca las necesidades contables de su iglesia para manejar varias monedas.

</div>

La moneda de su iglesia comienza siendo la moneda del país ingresado al registrarse la iglesia (por ejemplo, chelines kenianos para una iglesia en Kenia), y se usa si todavía no se ha guardado ninguna moneda. Puede cambiarla en cualquier momento en **Configuración → Donaciones** (el menú desplegable **Moneda**). Si su país no se reconoce, comienza en dólares estadounidenses.

## Activar múltiples monedas {#enabling-multi-currency}

El soporte de múltiples monedas está activado por defecto en B1:

- Los donativos en línea se cobran en la moneda elegida en su configuración de **Donaciones**
- Cada donación conserva la moneda en que fue registrada, y cada línea de donación muestra esa moneda
- Los totales combinados se convierten a la moneda de su iglesia (consulte [Totales convertidos](#converted-totals))
- Stripe se encarga de convertir la moneda a la moneda de pago de su cuenta para las donaciones en línea

## Monedas admitidas {#supported-currencies}

El sistema admite todas las principales monedas del mundo, entre ellas:

- **USD**: dólar estadounidense
- **EUR**: euro
- **GBP**: libra esterlina
- **CAD**: dólar canadiense
- **AUD**: dólar australiano
- **MXN**: peso mexicano
- **BRL**: real brasileño
- **INR**: rupia india
- **CNY**: yuan chino
- **JPY**: yen japonés
- Y muchas más...

Las monedas disponibles para las donaciones en línea dependen de las monedas admitidas por su cuenta de Stripe.

## Registrar donaciones en distintas monedas {#recording-donations-in-different-currencies}

### Donaciones en línea {#online-donations}

Cuando un miembro dona en línea a través de Stripe:

1. El donativo se cobra en la moneda configurada en **Configuración → Donaciones**; los donantes no eligen una moneda al pagar
2. Stripe procesa el pago en esa moneda
3. La donación se registra en B1 con esa moneda y ese monto
4. Stripe gestiona automáticamente cualquier conversión de moneda necesaria a la moneda de pago de su cuenta

Si cambia después la configuración de **Moneda**, los nuevos donativos usan la nueva moneda, mientras que los donativos ya registrados conservan la suya, por lo que sus registros pueden contener más de una moneda.

### Ingreso manual {#manual-entry}

Los donativos que ingresa a mano -en un lote, con **Importar CSV** o con **Registrar un donativo** en el registro de una persona- siempre se registran en la moneda de su iglesia, que se muestra junto al campo **Monto**. No hay un menú desplegable de moneda para el ingreso manual, así que convierta a la moneda de su iglesia un donativo hecho en otra moneda antes de ingresarlo, y anote el monto original en **Notas** si lo necesita.

## Ver donaciones en múltiples monedas {#viewing-multi-currency-donations}

### Informes de donaciones {#donation-reports}

Las líneas de donación individuales -en un lote, en la página de un fondo y en el historial de donaciones de una persona- muestran cada donativo en la moneda en que fue registrado. Los totales combinados se convierten, como se describe a continuación.

### Totales convertidos {#converted-totals}

Cada vez que B1 muestra un único total combinado -las tarjetas de indicadores del resumen de donaciones, el total de un lote de donaciones y el total de un fondo-, las donaciones registradas en una moneda distinta a la predeterminada de su iglesia se convierten a la moneda de su iglesia usando los tipos de cambio actuales. Así, el total es un número único y significativo en lugar de sumar monedas diferentes. Aparece una nota **Convertido a los tipos de cambio actuales** debajo del total siempre que se aplicó una conversión. Las líneas de donación individuales siguen mostrándose en su moneda original.

### Estados de donación {#giving-statements}

Los estados de donación enumeran el monto de cada donativo tal como se registró y suman los montos sin convertirlos, por lo que un estado solo es exacto cuando todos los donativos de ese donante del año están en la moneda de su iglesia. Si un donante dio en más de una moneda, revise su estado antes de enviarlo.

## Integración con Stripe {#stripe-integration}

Para las donaciones en línea, Stripe gestiona las transacciones en múltiples monedas:

- **Conversión automática**: Stripe convierte las monedas a la moneda predeterminada de su cuenta
- **Tipos de cambio**: Stripe usa los tipos de cambio actuales del mercado
- **Comisiones**: la conversión de moneda puede generar comisiones adicionales de Stripe
- **Moneda de pago**: los fondos se depositan en la moneda predeterminada de su cuenta

:::info
Revise su panel de Stripe para ver los tipos de cambio actuales y las comisiones asociadas a las transacciones en múltiples monedas.
:::

## Consideraciones contables {#accounting-considerations}

Al trabajar con varias monedas:

- **Registros**: lleve un control de los montos y monedas originales de las donaciones para un informe preciso
- **Tipos de cambio**: tenga en cuenta que los tipos de cambio de Stripe pueden diferir de los de su banco
- **Recibos fiscales**: consulte con su contador cómo informar las donaciones en distintas monedas para fines fiscales
- **Asignación a fondos**: puede asignar las donaciones a fondos específicos sin importar la moneda

## Buenas prácticas {#best-practices}

- **Moneda predeterminada**: configure la moneda principal de su iglesia en **Configuración > Donaciones** para que los donativos ingresados a mano y los totales de donación la usen
- **Comunicación clara**: indique a los donantes en qué moneda están donando durante el proceso de pago
- **Informes coherentes**: los totales combinados siempre se convierten automáticamente a la moneda de su iglesia; abra un lote o un fondo para ver el monto y la moneda originales de cada donativo
- **Conciliación periódica**: concilie los pagos de Stripe con sus registros de donación, teniendo en cuenta las conversiones de moneda

## Limitaciones {#limitations}

- La conversión de moneda para el procesamiento de pagos la gestiona Stripe solo para las donaciones en línea; las donaciones manuales se registran en la moneda de su iglesia tal como se ingresaron
- Los informes históricos y las líneas de donación individuales siempre muestran la moneda original en que se registró el donativo
- Los totales combinados (tarjetas de indicadores, totales de lotes y totales de fondos) se convierten a la moneda de su iglesia con los tipos de cambio actuales; estos tipos pueden diferir ligeramente de los de su banco o Stripe en el momento en que se liquidan los fondos

## Artículos relacionados {#related-articles}

- [Configuración de donación en línea](./online-giving-setup.md): configure Stripe para aceptar donaciones
- [Registrar donaciones](./recording-donations.md): ingrese manualmente los registros de donación
- [Informes de donaciones](./donation-reports.md): genere y vea resúmenes de donaciones
- [Estados de donación](./giving-statements.md): cree estados de donación de fin de año
