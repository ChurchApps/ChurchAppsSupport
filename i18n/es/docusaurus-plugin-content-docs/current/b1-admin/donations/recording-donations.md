---
title: "Registrar donaciones"
---

# Registrar donaciones

<div class="article-intro">

La grabación de donaciones en B1 Admin se realiza a través del sistema de lotes. Crea un lote para representar una colección (como una ofrenda de domingo) y luego añade donaciones individuales a ese lote. Esto mantiene sus registros de donaciones organizados y fáciles de reconciliar.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configure sus [fondos](funds.md) para que pueda asignar donaciones a las categorías correctas
- Cree un [lote](batches.md) para mantener las donaciones que está a punto de ingresar
- Asegúrese de que los donantes estén en su [directorio de personas](../people/adding-people.md) para que pueda buscarlos al ingresar regalos

</div>

## Crear un lote y agregar donaciones

1. En **B1 Admin**, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda), expanda **Donations** y haga clic en **Batches**.
2. Haga clic en **Add Batch**.
3. Ingrese un nombre para el lote (por ejemplo, "Sunday Offering - Jan 5") y seleccione la fecha. Haga clic en **Save**.
4. Su nuevo lote aparece en la lista mostrando cero donaciones y $0.00.
5. Haga clic en el **nombre del lote** para abrirlo.

## Entrada de donaciones individuales

1. En la página de detalle del lote, escriba el nombre del donante en el **campo de búsqueda** para encontrarlo.
2. Después de seleccionar una persona, aparece el formulario de entrada de donación con campos para **Date**, **Payment Method**, **Fund**, **Amount** y **Check Number**.
3. Complete los detalles y haga clic en **Add Donation**.
4. La donación se añade a la tabla a continuación, y el formulario se reinicia para que pueda ingresar la siguiente.

:::tip
Puede ingresar rápidamente varias donaciones seguidas sin dejar la página del lote. El formulario se reinicia después de cada entrada para que pueda pasar por un paquete de cheques o sobres de manera eficiente.
:::

## División de una donación entre múltiples fondos

A veces, un donante da más de un fondo en una transacción. Para manejar esto:

1. Haga clic en el botón **Edit** en la fila de donación.
2. En el formulario de edición, agregue cantidades a diferentes fondos. El total se calculará automáticamente a partir de los montos de fondos individuales.
3. Haga clic en **Save** para actualizar la donación.

:::info
Dividir donaciones entre fondos es común cuando un donante escribe un solo cheque designado para múltiples propósitos, como Fondo General y Misiones.
:::

## Editar o eliminar donaciones

Para editar una donación, haga clic en el botón **Edit** en su fila en el lote. Puede cambiar la fecha, cantidad, fondo, método de pago o cualquier otro detalle. Haga clic en **Save** cuando termine.

:::tip
El encabezado de la página del lote se actualiza automáticamente para mostrar el número total de donaciones y el monto de dólar combinado mientras agrega o edita entradas. Úselo para reconciliar contra su comprobante de depósito.
:::

## Reembolso de una donación

Si un donante fue cobrado por error o solicita recuperar su dinero, puede reembolsar una donación completada directamente desde su pantalla de edición; no es necesario ir al panel de su puerta de enlace de pago.

1. Abra la donación y haga clic en **Edit**.
2. Haga clic en el botón **Refund** junto a Eliminar en la parte inferior del formulario.
3. Confirme el diálogo: "¿Reembolsar esta donación en su totalidad a través de la puerta de enlace de pago? Esto no se puede deshacer."

La donación se reembolsa en su totalidad a través de la puerta de enlace de pago original y se marca como **Refunded** en sus listas de donaciones.

:::warning
Los reembolsos son solo reembolsos completos; no hay forma de reembolsar un monto parcial desde B1 Admin. El reembolso tampoco se puede deshacer una vez confirmado.
:::

:::info
El botón **Refund** solo aparece para donaciones que fueron pagadas en línea (tienen una transacción de puerta de enlace) y aún están en estado **Complete**. Las donaciones ingresadas manualmente (efectivo, cheque) no tienen una transacción de puerta de enlace para reembolsar; edítelas o elimínelas en su lugar.
:::

## Próximos pasos

- Revise sus entradas usando [Informes de donaciones](donation-reports.md) para verificar la exactitud
- Al final del año, genere [Declaraciones de donaciones](giving-statements.md) para sus donantes
