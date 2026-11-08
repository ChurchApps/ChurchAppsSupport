---
title: "Guía: Generar informes anuales de donaciones"
description: "En B1 Admin, finalice los registros de donaciones del año, revise la configuración fiscal de los fondos y genere los certificados de donaciones deducibles de impuestos para cada donante."
---

# Generar informes anuales de donaciones

<div class="article-intro">

Siga el proceso de cierre de fin de año para finalizar los registros de donaciones, verificar la configuración de los fondos y generar los certificados de donaciones deducibles de impuestos para cada donante. Normalmente, esto se hace a principios de enero para el año calendario anterior.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Cuenta de B1 Admin con acceso financiero
- Donaciones registradas durante el año (en línea a través de Stripe y/o ingresadas manualmente)
- Acceso a su cuenta de Stripe si acepta donaciones en línea

</div>

## Paso 1: Importar las transacciones finales de Stripe

Asegúrese de que todas las donaciones en línea de finales de año estén en su sistema.

Siga la guía [Importación de Stripe](../donations/stripe-import.md) para:

1. Ir a Donaciones > Importación de Stripe
2. Seleccionar un rango de fechas que cubra el final del año (por ejemplo, del 1 al 31 de diciembre)
3. Hacer clic en Vista previa para revisar y luego en Importar faltantes para finalizar

:::warning
Realice esta importación antes de generar los certificados. Las transacciones que no haya importado no aparecerán en los certificados de los donantes.
:::

## Paso 2: Revisar los informes de donaciones

Verifique que sus registros sean correctos antes de generar los certificados.

Siga la guía [Informes de donaciones](../donations/donation-reports.md) para:

1. Revisar la página de resumen de donaciones del año completo
2. Revisar los totales por fondo y compararlos con sus estados de cuenta bancarios para detectar cualquier discrepancia
3. Hacer clic en cada lote para verificar los detalles por donante, si es necesario

## Paso 3: Verificar el estado fiscal de los fondos

Asegúrese de que la configuración de deducibilidad fiscal de cada fondo sea correcta para que los certificados sean precisos.

Siga la guía [Fondos](../donations/funds.md) para:

1. Abrir cada fondo y confirmar que la configuración de deducibilidad fiscal sea correcta

:::info
Solo las donaciones a fondos marcados como deducibles de impuestos aparecerán en los certificados de donaciones. Si un fondo debería ser deducible de impuestos pero no está marcado así, actualícelo antes de generar los certificados.
:::

## Paso 4: Generar los certificados de donaciones

Cree los certificados oficiales de donaciones para sus donantes.

Siga la guía [Certificados de donaciones](../donations/giving-statements.md) para:

1. Ir a **Donaciones > Certificados de donaciones**
2. Seleccionar el año en el menú desplegable y revisar las estadísticas de resumen
3. Elija su método de descarga:
   - **Descargar ZIP**: archivos CSV individuales, uno por donante
   - **Imprimir todo**: vista imprimible con cada certificado en una página nueva, con el logotipo de su iglesia en la parte superior (si ha subido uno)

:::tip
Genere los certificados a principios de enero, mientras los registros están recientes. Así tendrá tiempo para corregir cualquier problema antes de enviarlos por correo.
:::

## Paso 5: Distribuir a los donantes

Haga llegar los certificados a manos de sus donantes.

1. Imprima y envíe los certificados por correo, o envíe los archivos CSV individuales por correo electrónico a los donantes
2. Los miembros también pueden ver su propio historial de donaciones e imprimir certificados en [B1.church o en la App B1](../../b1-church/giving/donation-history.md)

## ¡Listo!

Sus informes anuales de donaciones están completos. Los donantes tienen sus certificados deducibles de impuestos, y sus registros financieros quedan cerrados para el año.

## Artículos relacionados

- [Importación de Stripe](../donations/stripe-import.md): importar transacciones en línea
- [Informes de donaciones](../donations/donation-reports.md): ver tendencias y totales de donaciones
- [Fondos](../donations/funds.md): administrar fondos y la configuración de deducibilidad fiscal
- [Certificados de donaciones](../donations/giving-statements.md): generar los certificados de fin de año
- [Registrar donaciones](../donations/recording-donations.md): ingresar manualmente donaciones en efectivo o cheque
- [Historial de donaciones (web)](../../b1-church/giving/donation-history.md): vista de autoservicio para miembros
- [Guía para configurar donaciones en línea](./online-giving.md): configuración inicial de Stripe y donaciones
