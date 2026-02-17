---
title: "Importaci\u00f3n de Stripe"
---

# Importaci\u00f3n de Stripe

<div class="article-intro">

Si acepta donaciones en l\u00ednea a trav\u00e9s de Stripe, la herramienta de Importaci\u00f3n de Stripe le permite traer esas transacciones a B1 Admin para que todos sus datos de ofrendas est\u00e9n en un solo lugar. Esto es especialmente \u00fatil para capturar cualquier transacci\u00f3n que no se haya sincronizado autom\u00e1ticamente.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Complete la [Configuraci\u00f3n de ofrendas en l\u00ednea](online-giving-setup.md) para conectar su cuenta de Stripe a B1 Admin
- Verifique que tenga donaciones en su panel de Stripe para el rango de fechas que desea importar

</div>

## C\u00f3mo funciona

El proceso de importaci\u00f3n utiliza un flujo de trabajo de dos pasos: primero obtiene una vista previa de lo que se importar\u00eda, y luego confirma la importaci\u00f3n. Este enfoque de prueba le permite revisar todo antes de que se creen datos.

## Importar transacciones

1. En **B1 Admin**, navegue a **Donaciones > Lotes**.
2. Haga clic en el enlace de **Importaci\u00f3n de Stripe** en la parte inferior de la p\u00e1gina de Lotes.
3. Seleccione un **rango de fechas** para las transacciones que desea importar.
4. Haga clic en **Vista previa** para ejecutar una verificaci\u00f3n de prueba.

## Revisar la vista previa

La vista previa muestra cada transacci\u00f3n de Stripe junto con un indicador de estado:

- **Nueva** -- esta transacci\u00f3n a\u00fan no ha sido importada y se incluir\u00e1 si procede.
- **Ya importada** -- esta transacci\u00f3n ya existe en B1 Admin y se omitir\u00e1.
- **Omitida** -- esta transacci\u00f3n fue excluida por otra raz\u00f3n (por ejemplo, un reembolso o cargo fallido).

Una secci\u00f3n de resumen en la parte superior muestra el n\u00famero total de transacciones en cada categor\u00eda y los montos en d\u00f3lares involucrados.

:::info
El paso de vista previa no crea ning\u00fan registro. Es una verificaci\u00f3n de solo lectura para que pueda confirmar lo que suceder\u00e1 antes de realizar la importaci\u00f3n.
:::

## Completar la importaci\u00f3n

1. Revise los resultados de la vista previa y los totales del resumen.
2. Haga clic en **Importar faltantes** para importar todas las transacciones marcadas como **Nueva**.
3. Despu\u00e9s de que la importaci\u00f3n se complete, las etiquetas de estado junto a cada transacci\u00f3n se actualizan para mostrar el resultado.

## Consejos para usar la Importaci\u00f3n de Stripe

- Ejecute la importaci\u00f3n regularmente (semanal o mensualmente) para mantener sus registros actualizados.
- Si una transacci\u00f3n aparece como **Ya importada**, significa que B1 Admin ya tiene un registro coincidente -- no se requiere acci\u00f3n.
- Use el filtro de rango de fechas para enfocarse en un per\u00edodo espec\u00edfico si est\u00e1 buscando transacciones particulares.

:::tip
Despu\u00e9s de importar, visite la p\u00e1gina de [Lotes](batches.md) para verificar que las donaciones importadas aparezcan correctamente y que los totales coincidan con lo que ve en su panel de Stripe.
:::

## Pr\u00f3ximos pasos

- Revise los [Reportes de donaciones](donation-reports.md) para ver las transacciones importadas junto con sus otros datos de ofrendas
- Aseg\u00farese de que las donaciones importadas est\u00e9n asignadas a los [fondos](funds.md) correctos para obtener [estados de cuenta de ofrendas](giving-statements.md) precisos
