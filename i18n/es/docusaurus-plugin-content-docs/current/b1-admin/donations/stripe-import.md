---
title: "Importación de Stripe"
---

# Importación de Stripe

<div class="article-intro">

Si acepta donaciones en línea a través de Stripe, la herramienta de Importación de Stripe le permite traer esas transacciones a B1 Admin para que todos sus datos de donaciones estén en un solo lugar. Es especialmente útil para detectar transacciones que no se sincronizaron automáticamente.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Complete la [Configuración de donaciones en línea](online-giving-setup.md) para conectar su cuenta de Stripe a B1 Admin. El elemento de menú **Importación de Stripe** y el botón de la página de Lotes solo aparecen cuando la pasarela de donaciones de su iglesia es Stripe, y solo para las personas que pueden editar donaciones
- Verifique que tiene donaciones en su panel de Stripe para el rango de fechas que desea importar

</div>

## Cómo funciona

El proceso de importación usa un flujo de dos pasos: primero se previsualiza lo que se importaría y luego se confirma la importación. Este enfoque de prueba le permite revisar todo antes de que se cree cualquier dato.

## Importar transacciones

1. En **B1 Admin**, vaya a **Donaciones > Importación de Stripe**. (También puede hacer clic en **Importar transacciones de Stripe faltantes** en la parte superior de la página de **Lotes**).
2. Se abre la página de **Importación de Stripe**.
3. Seleccione un **rango de fechas** para las transacciones que desea importar.
4. Haga clic en **Previsualizar** para ejecutar una verificación de prueba.

## Revisar la previsualización

La previsualización muestra cada transacción de Stripe junto con un indicador de estado:

- **Nueva** -- esta transacción aún no se ha importado y se incluirá si continúa.
- **Ya importada** -- esta transacción ya existe en B1 Admin y se omitirá.
- **Omitida** -- esta transacción se excluyó por otro motivo (por ejemplo, un reembolso o un cargo fallido).

Una sección de resumen en la parte superior muestra el número total de transacciones en cada categoría y los montos en dólares involucrados.

:::info
El paso de previsualización no crea ningún registro. Es una verificación de solo lectura para que pueda revisar lo que va a pasar antes de confirmarlo.
:::

## Completar la importación

1. Revise los resultados de la previsualización y los totales del resumen.
2. Haga clic en **Importar faltantes** para importar todas las transacciones marcadas como **Nueva**.
3. Cuando termine la importación, las etiquetas de estado junto a cada transacción se actualizan para mostrar el resultado.

## Consejos para usar la Importación de Stripe

- Ejecute la importación con regularidad (semanal o mensualmente) para mantener sus registros al día.
- Si una transacción aparece como **Ya importada**, significa que B1 Admin ya tiene un registro correspondiente; no se necesita ninguna acción.
- Use el filtro de rango de fechas para enfocarse en un periodo específico si busca transacciones concretas.

:::tip
Después de importar, visite la página de [Lotes](batches.md) para verificar que las donaciones importadas aparezcan correctamente y que los totales coincidan con lo que ve en su panel de Stripe.
:::

## Próximos pasos

- Revise los [Informes de donaciones](donation-reports.md) para ver las transacciones importadas junto con el resto de sus datos de donaciones
- Asegúrese de que las donaciones importadas estén asignadas a los [fondos](funds.md) correctos para [estados de cuenta de donaciones](giving-statements.md) precisos
