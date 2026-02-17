---
title: "Guía: Generar informes de donaciones de fin de año"
---

# Generar informes de donaciones de fin de año

<div class="article-intro">

Recorre el proceso de fin de año para finalizar tus registros de donaciones, verificar la configuración de los fondos y generar estados de cuenta de donaciones deducibles de impuestos para cada donante. Esto normalmente se hace a principios de enero para el año calendario anterior.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Cuenta de B1 Admin con acceso financiero
- Donaciones registradas a lo largo del año (en línea vía Stripe y/o ingresadas manualmente)
- Acceso a tu cuenta de Stripe si aceptas donaciones en línea

</div>

## Paso 1: Importar las últimas transacciones de Stripe

Asegúrate de que todas las donaciones en línea de fin de año estén en tu sistema.

Sigue la guía [Importación de Stripe](../donations/stripe-import.md) para:

1. Navegar a Donaciones > Lotes > Importación de Stripe
2. Seleccionar un rango de fechas que cubra el final del año (por ejemplo, 1 de diciembre - 31 de diciembre)
3. Hacer clic primero en Previsualizar para revisar, luego en Importar faltantes para finalizar

:::warning
Ejecuta esta importación antes de generar los estados de cuenta. Las transacciones que no hayas importado no aparecerán en los estados de cuenta de los donantes.
:::

## Paso 2: Revisar los informes de donaciones

Verifica que tus registros sean precisos antes de generar los estados de cuenta.

Sigue la guía [Informes de donaciones](../donations/donation-reports.md) para:

1. Revisar la página de resumen de donaciones del año completo
2. Revisar los totales por fondo y compararlos con tus estados bancarios para detectar cualquier discrepancia
3. Hacer clic en lotes individuales para verificar los detalles a nivel de donante si es necesario

## Paso 3: Verificar el estado fiscal de los fondos

Asegúrate de que la configuración de deducibilidad de impuestos de cada fondo sea correcta para que los estados de cuenta sean precisos.

Sigue la guía [Fondos](../donations/funds.md) para:

1. Abrir cada fondo y confirmar que la configuración de deducibilidad de impuestos sea correcta

:::info
Solo las donaciones a fondos marcados como deducibles de impuestos aparecerán en los estados de cuenta de donaciones. Si un fondo debería ser deducible de impuestos pero no está marcado así, actualízalo antes de generar los estados de cuenta.
:::

## Paso 4: Generar estados de cuenta de donaciones

Crea los estados de cuenta oficiales de donaciones para tus donantes.

Sigue la guía [Estados de cuenta de donaciones](../donations/giving-statements.md) para:

1. Navegar a Donaciones > Estados de cuenta
2. Seleccionar el año del menú desplegable y revisar las estadísticas del resumen
3. Elegir tu método de descarga:
   - **Descargar ZIP** — archivos CSV individuales, uno por donante
   - **Imprimir todos** — vista imprimible con cada estado de cuenta en una nueva página

:::tip
Genera los estados de cuenta a principios de enero mientras los registros están frescos. Esto te da tiempo para detectar cualquier problema antes de enviarlos por correo.
:::

## Paso 5: Distribuir a los donantes

Entrega los estados de cuenta a tus donantes.

1. Imprime y envía por correo los estados de cuenta, o envía por correo electrónico los CSV individuales a los donantes
2. Los miembros también pueden ver su propio historial de donaciones e imprimir estados de cuenta desde [B1.church](../../b1-church/giving/donation-history.md) y la [aplicación B1 Mobile](../../b1-mobile/giving/donation-history.md)

## ¡Listo!

Tus informes de donaciones de fin de año están completos. Los donantes tienen sus estados de cuenta deducibles de impuestos y tus registros financieros están finalizados para el año.

## Artículos relacionados

- [Importación de Stripe](../donations/stripe-import.md) — importar transacciones en línea
- [Informes de donaciones](../donations/donation-reports.md) — ver tendencias y totales de donaciones
- [Fondos](../donations/funds.md) — gestionar fondos y configuración de deducibilidad de impuestos
- [Estados de cuenta de donaciones](../donations/giving-statements.md) — generar estados de cuenta de fin de año
- [Registrar donaciones](../donations/recording-donations.md) — ingresar manualmente donaciones en efectivo/cheque
- [Historial de donaciones (Web)](../../b1-church/giving/donation-history.md) — vista de autoservicio del miembro
- [Guía de configuración de donaciones en línea](./online-giving.md) — configuración inicial de Stripe y donaciones
