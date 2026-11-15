---
title: "Guía: Genere los informes de donaciones de fin de año"
description: "En B1 Admin, complete los registros de donaciones del año, revise la configuración fiscal de los fondos y genere los estados de donaciones deducibles de impuestos para cada donante."
---

# Genere los informes de donaciones de fin de año

<div class="article-intro">

Recorra el proceso de fin de año para finalizar sus registros de donaciones, verificar la configuración de los fondos y generar los estados de donaciones deducibles de impuestos para cada donante. Por lo general, esto se hace a principios de enero para el año calendario anterior.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Cuenta de B1 Admin con acceso financiero
- Donaciones registradas durante el año (en línea a través de Stripe y/o ingresadas manualmente)
- Acceso a su cuenta de Stripe si acepta donaciones en línea

</div>

## Paso 1: Importe las transacciones finales de Stripe {#step-1-import-final-stripe-transactions}

Asegúrese de que todas las donaciones en línea de fin de año estén en su sistema.

Siga la guía [Importación de Stripe](../donations/stripe-import.md) para:

1. En el [menú Jump](../introduction.md#getting-around-with-the-jump-menu), elija **Donations > Stripe Import** (solo aparece cuando su proveedor de donaciones es Stripe)
2. Configure la **Start Date** y la **End Date** para cubrir el final del año (por ejemplo, del 1 al 31 de diciembre)
3. Haga clic primero en **Preview** para revisar y luego en **Import Missing** para finalizar

:::warning
Ejecute esta importación antes de generar los estados. Las transacciones que no haya importado no aparecerán en los estados de los donantes.
:::

## Paso 2: Revise los informes de donaciones {#step-2-review-donation-reports}

Verifique que sus registros sean precisos antes de generar los estados.

Siga la guía [Informes de donaciones](../donations/donation-reports.md) para:

1. En el menú Jump, elija **Donations > Summary**, configure la **Start Date** y la **End Date** en **Filter Report** para abarcar todo el año, y haga clic en **Run Report**
2. Revise los totales por fondo y compárelos con sus estados de cuenta bancarios para detectar discrepancias. Haga clic en **Download Options** y elija **Summary** para obtener un CSV
3. Abra los lotes individuales en **Donations > Batches** para verificar los detalles por donante si es necesario

## Paso 3: Verifique el estatus fiscal de los fondos {#step-3-verify-fund-tax-status}

Asegúrese de que la configuración de deducibilidad fiscal de cada fondo sea correcta para que los estados sean precisos.

Siga la guía [Fondos](../donations/funds.md) para:

1. En el menú Jump, elija **Donations > Funds** y revise el **Tax Status** de cada fondo
2. Haga clic en **Edit** en un fondo para cambiar su configuración **Tax Deductible**

:::info
Solo aparecerán en los estados de donaciones las donaciones realizadas a fondos marcados como deducibles de impuestos. Si un fondo debería ser deducible de impuestos pero no está marcado así, actualícelo antes de generar los estados.
:::

## Paso 4: Genere los estados de donaciones {#step-4-generate-giving-statements}

Cree los estados oficiales de donaciones para sus donantes.

Siga la guía [Estados de donaciones](../donations/giving-statements.md) para:

1. En el menú Jump, elija **Donations > Giving Statements**
2. Seleccione el **Year** y revise las estadísticas de resumen. Las iglesias de Canadá, Australia o Nueva Zelanda pueden hacer clic en **Statement format** para cambiar al formato oficial de recibo de su país
3. Elija su método de descarga:
   - **Download ZIP**: archivos CSV individuales, uno por donante
   - **Print All**: vista imprimible con cada estado en una página nueva, con el logotipo de su iglesia en la parte superior (si ha subido uno)

:::tip
Genere los estados a principios de enero, mientras los registros están recientes. Así tendrá tiempo para detectar cualquier problema antes de enviarlos por correo.
:::

## Paso 5: Distribuya los estados a los donantes {#step-5-distribute-to-donors}

Haga llegar los estados a manos de sus donantes.

1. Imprima y envíe los estados por correo, o envíe por correo electrónico los CSV individuales a los donantes
2. Los miembros también pueden ver su propio historial de donaciones e imprimir estados en [B1.church o en la aplicación B1](../../b1-church/giving/donation-history.md)

## ¡Listo! {#youre-done}

Sus informes de donaciones de fin de año están completos. Los donantes tienen sus estados deducibles de impuestos y sus registros financieros quedaron finalizados para el año.

## Artículos relacionados {#related-articles}

- [Importación de Stripe](../donations/stripe-import.md): importe transacciones en línea
- [Informes de donaciones](../donations/donation-reports.md): consulte las tendencias y totales de donaciones
- [Fondos](../donations/funds.md): administre los fondos y la configuración de deducibilidad fiscal
- [Estados de donaciones](../donations/giving-statements.md): genere los estados de fin de año
- [Registro de donaciones](../donations/recording-donations.md): ingrese manualmente donaciones en efectivo o cheque
- [Historial de donaciones (web)](../../b1-church/giving/donation-history.md): vista de autoservicio para los miembros
- [Guía para configurar las donaciones en línea](./online-giving.md): configuración inicial de Stripe y donaciones
