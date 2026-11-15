---
title: "Importación de Stripe"
description: "Traiga las donaciones de Stripe a B1 Admin con una importación que primero muestra una vista previa y marca cada cobro como nuevo, ya importado u omitido antes de confirmar."
---

# Importación de Stripe

<div class="article-intro">

Si acepta donaciones en línea a través de Stripe, la herramienta de Importación de Stripe le permite traer esas transacciones a B1 Admin para que todos sus datos de donación estén en un solo lugar. Es especialmente útil para detectar transacciones que no se sincronizaron automáticamente.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Complete la [Configuración de donación en línea](online-giving-setup.md) para conectar su cuenta de Stripe con B1 Admin. El elemento de menú **Importación de Stripe** y el botón de la página de Lotes solo aparecen cuando la pasarela de donaciones de su iglesia es Stripe, y solo para las personas que pueden editar donaciones
- Verifique que tiene donaciones en su panel de Stripe para el rango de fechas que desea importar

</div>

## Cómo funciona {#how-it-works}

El proceso de importación usa un flujo de dos pasos: primero se previsualiza lo que se importaría y luego se confirma la importación. Este enfoque de prueba le permite revisar todo antes de que se cree cualquier dato.

## Importar transacciones {#importing-transactions}

1. En **B1 Admin**, vaya a **Donaciones > Importación de Stripe**. (También puede hacer clic en **Importar transacciones de Stripe faltantes** en la parte superior de la página de **Lotes**).
2. Se abre la página **Importar transacciones de Stripe**.
3. En **Seleccionar rango de fechas**, establezca la **Fecha de inicio** y la **Fecha de fin** de las transacciones que desea importar. El rango comienza el 1 de enero de este año y llega hasta hoy.
4. Haga clic en **Vista previa** para ejecutar una comprobación de prueba. **Importar faltantes** permanece deshabilitado hasta que una vista previa encuentre transacciones nuevas, y cambiar cualquiera de las dos fechas borra la vista previa para que primero previsualice el nuevo rango.

## Revisar la vista previa {#reviewing-the-preview}

La vista previa enumera cada evento de Stripe con su **ID del evento**, **Tipo**, **Monto**, **Fecha** y un **Estado**:

- **Nueva**: esta transacción aún no se ha importado y se incluirá si continúa.
- **Ya importada**: esta transacción ya existe en B1 Admin y se omitirá.
- **Omitida**: esta transacción se excluyó por otro motivo (por ejemplo, un reembolso o un cobro fallido).

Un resumen en la parte superior muestra el número **Total** de eventos y cuántos están **Nuevos**, **Ya importados** y **Omitidos**. Si algún evento no se pudo leer, aparece un contador de **Errores** y la fila del evento muestra el mensaje en la columna **Notas**.

:::info
El paso de vista previa no crea ningún registro. Es una comprobación de solo lectura para que pueda verificar lo que sucederá antes de confirmar.
:::

## Completar la importación {#completing-the-import}

1. Revise los resultados de la vista previa y los totales del resumen.
2. Haga clic en **Importar faltantes** para importar todas las transacciones marcadas como **Nuevas**.
3. Al terminar la importación, la lista se convierte en **Resultados de importación**: cada transacción añadida muestra **Importada**, y el resumen añade un contador de **Importadas**.

## Consejos para usar la Importación de Stripe {#tips-for-using-stripe-import}

- Ejecute la importación periódicamente (semanal o mensualmente) para mantener sus registros al día.
- Si una transacción aparece como **Ya importada**, significa que B1 Admin ya tiene un registro correspondiente; no se requiere ninguna acción.
- Use el filtro de rango de fechas para enfocarse en un periodo específico si busca transacciones concretas.

:::tip
Después de importar, visite la página de [Lotes](batches.md) para verificar que las donaciones importadas aparezcan correctamente y que los totales coincidan con lo que ve en su panel de Stripe.
:::

## Próximos pasos {#next-steps}

- Consulte los [Informes de donaciones](donation-reports.md) para revisar las transacciones importadas junto con el resto de sus datos de donación
- Asegúrese de que las donaciones importadas estén asignadas a los [fondos](funds.md) correctos para que los [estados de donación](giving-statements.md) sean exactos
