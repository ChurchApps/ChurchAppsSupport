---
title: "Guía: Generar Reportes de Donaciones de Fin de Año"
---

# Generar Reportes de Donaciones de Fin de Año

<div class="article-intro">

Camina a través del proceso de fin de año de finalizar tus registros de donación, verificar configuraciones de fondos y generar declaraciones de donación deducible de impuestos para cada donante. Esto generalmente se hace en enero de cada año para el año calendario anterior.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Cuenta de B1 Admin con acceso financiero
- Donaciones registradas durante todo el año (en línea a través de Stripe y/o ingresadas manualmente)
- Acceso a tu cuenta de Stripe si aceptas donaciones en línea

</div>

## Paso 1: Importar Transacciones Finales de Stripe

Asegúrate de que todas las donaciones en línea del final del año estén en tu sistema.

Sigue la guía [Importación de Stripe](../donations/stripe-import.md) para:

1. Navega a Donaciones > Lotes > Importación de Stripe
2. Selecciona un rango de fechas que cubra el final del año (por ejemplo, 1 de diciembre - 31 de diciembre)
3. Haz clic en Vista Previa primero para revisar, luego en Importar Faltantes para finalizar

:::warning
Ejecuta esta importación antes de generar declaraciones. Cualquier transacción que no hayas importado no aparecerá en las declaraciones de donantes.
:::

## Paso 2: Revisar Reportes de Donación

Verifica que tus registros sean precisos antes de generar declaraciones.

Sigue la guía [Reportes de Donación](../donations/donation-reports.md) para:

1. Verifica la página de resumen de donaciones para el año completo
2. Revisa los totales por fondo y compara contra tus extractos bancarios para detectar discrepancias
3. Haz clic en lotes individuales para verificar detalles a nivel de donante si es necesario

## Paso 3: Verificar Estado Fiscal de Fondos

Asegúrate de que la configuración deducible de impuestos de cada fondo sea correcta para que las declaraciones sean precisas.

Sigue la guía [Fondos](../donations/funds.md) para:

1. Abre cada fondo y confirma que la configuración deducible de impuestos sea correcta

:::info
Solo las donaciones a fondos marcados como deducibles de impuestos aparecerán en las declaraciones de donación. Si un fondo debe ser deducible de impuestos pero no está marcado de esa manera, actualízalo antes de generar declaraciones.
:::

## Paso 4: Generar Declaraciones de Donación

Crea las declaraciones oficiales de donación para tus donantes.

Sigue la guía [Declaraciones de Donación](../donations/giving-statements.md) para:

1. Navega a **Donaciones > Declaraciones de Donación**
2. Selecciona el año del menú desplegable y revisa las estadísticas de resumen
3. Elige tu método de descarga:
   - **Descargar ZIP** -- archivos CSV individuales, uno por donante
   - **Imprimir Todo** -- vista imprimible con cada declaración en una página nueva

:::tip
Genera declaraciones a principios de enero mientras los registros están frescos. Esto te da tiempo para detectar cualquier problema antes de enviarlos por correo.
:::

## Paso 5: Distribuir a Donantes

Entrega las declaraciones a tus donantes.

1. Imprime y envía declaraciones por correo, o envía CSVs individuales por correo electrónico a donantes
2. Los miembros también pueden ver su propio historial de donaciones e imprimir declaraciones desde [B1.church](../../b1-church/giving/donation-history.md) y la [aplicación móvil B1](../../b1-mobile/giving/donation-history.md)

## ¡Listo!

Tus reportes de donaciones de fin de año están completos. Los donantes tienen sus declaraciones deducibles de impuestos y tus registros financieros están finalizados para el año.

## Artículos Relacionados

- [Importación de Stripe](../donations/stripe-import.md) -- importar transacciones en línea
- [Reportes de Donación](../donations/donation-reports.md) -- ver tendencias de donación y totales
- [Fondos](../donations/funds.md) -- administrar fondos y configuraciones deducibles de impuestos
- [Declaraciones de Donación](../donations/giving-statements.md) -- generar declaraciones de fin de año
- [Registro de Donaciones](../donations/recording-donations.md) -- ingresar manualmente donaciones en efectivo/cheque
- [Historial de Donaciones (Web)](../../b1-church/giving/donation-history.md) -- vista de autoservicio de miembro
- [Guía de Configuración de Donaciones en Línea](./online-giving.md) -- configuración inicial de Stripe y donaciones
