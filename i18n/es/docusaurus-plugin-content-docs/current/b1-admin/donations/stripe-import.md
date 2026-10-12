---
title: "Importación de Stripe"
---

# Importación de Stripe

<div class="article-intro">

Si acepta donaciones en línea a través de Stripe, la herramienta de Importación de Stripe le permite traer esas transacciones a B1 Admin para que todos sus datos de ofrendas estén en un solo lugar. Esto es especialmente útil para capturar cualquier transacción que no se haya sincronizado automáticamente.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Complete la [Configuración de ofrendas en línea](online-giving-setup.md) para conectar su cuenta de Stripe a B1 Admin
- Verifique que tenga donaciones en su panel de Stripe para el rango de fechas que desea importar

</div>

## Cómo funciona

El proceso de importación utiliza un flujo de trabajo de dos pasos: primero obtiene una vista previa de lo que se importaría, y luego confirma la importación. Este enfoque de prueba le permite revisar todo antes de que se creen datos.

## Importar transacciones

1. En **B1 Admin**, navegue a **Donaciones > Importación de Stripe**. (También puede hacer clic en **Import missing Stripe transactions** en la parte superior de la página de **Lotes**.)
2. Se abre la página **Importación de Stripe**.
3. Seleccione un **rango de fechas** para las transacciones que desea importar.
4. Haga clic en **Vista previa** para ejecutar una verificación de prueba.

## Revisar la vista previa

La vista previa muestra cada transacción de Stripe junto con un indicador de estado:

- **Nueva** -- esta transacción aún no ha sido importada y se incluirá si procede.
- **Ya importada** -- esta transacción ya existe en B1 Admin y se omitirá.
- **Omitida** -- esta transacción fue excluida por otra razón (por ejemplo, un reembolso o cargo fallido).

Una sección de resumen en la parte superior muestra el número total de transacciones en cada categoría y los montos en dólares involucrados.

:::info
El paso de vista previa no crea ningún registro. Es una verificación de solo lectura para que pueda confirmar lo que sucederá antes de realizar la importación.
:::

## Completar la importación

1. Revise los resultados de la vista previa y los totales del resumen.
2. Haga clic en **Importar faltantes** para importar todas las transacciones marcadas como **Nueva**.
3. Después de que la importación se complete, las insignias de estado junto a cada transacción se actualizan para mostrar el resultado.

## Consejos para usar la Importación de Stripe

- Ejecute la importación regularmente (semanal o mensualmente) para mantener sus registros actualizados.
- Si una transacción aparece como **Ya importada**, significa que B1 Admin ya tiene un registro coincidente -- no se requiere acción.
- Use el filtro de rango de fechas para enfocarse en un período específico si está buscando transacciones particulares.

:::tip
Después de importar, visite la página de [Lotes](batches.md) para verificar que las donaciones importadas aparezcan correctamente y que los totales coincidan con lo que ve en su panel de Stripe.
:::

## Próximos pasos

- Revise los [Reportes de donaciones](donation-reports.md) para ver las transacciones importadas junto con sus otros datos de ofrendas
- Asegúrese de que las donaciones importadas estén asignadas a los [fondos](funds.md) correctos para obtener [estados de cuenta de ofrendas](giving-statements.md) precisos
