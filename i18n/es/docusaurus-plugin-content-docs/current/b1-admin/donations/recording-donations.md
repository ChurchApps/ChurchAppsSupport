---
title: "Registrar donaciones"
---

# Registrar donaciones

<div class="article-intro">

Registrar donaciones en B1 Admin se hace a través del sistema de lotes. Usted crea un lote que representa una colecta (como la ofrenda del domingo) y luego agrega las donaciones individuales a ese lote. Esto mantiene sus registros de donaciones organizados y fáciles de conciliar.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configure sus [fondos](funds.md) para poder asignar las donaciones a las categorías correctas
- Cree un [lote](batches.md) para registrar las donaciones que va a ingresar
- Asegúrese de que los donantes estén en su [directorio de personas](../people/adding-people.md) para poder buscarlos al ingresar las ofrendas
- Necesita **Editar donaciones**, o **Ingresar donaciones** junto con **Ver donaciones**, para ingresar ofrendas en un lote (consulte [Quién puede modificar un lote](batches.md#who-can-change-a-batch))

</div>

## Crear un lote y agregar donaciones

1. En **B1 Admin**, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda), expanda **Donaciones** y haga clic en **Lotes**.
2. Haga clic en **Agregar lote** en la parte superior de la página.
3. Escriba un nombre para el lote (por ejemplo, "Ofrenda del domingo - 5 de enero") y seleccione la fecha. Haga clic en **Guardar**.
4. Su nuevo lote aparece en la lista, mostrando cero donaciones y $0.00.
5. Haga clic en el **nombre del lote** para abrirlo.

## Ingresar donaciones individuales

1. En la página de detalle del lote, el panel de ingreso de donaciones aparece junto a la lista de donaciones. En **Seleccionar persona o anónimo**, escriba el nombre del donante en el campo de búsqueda para encontrarlo, o haga clic en **Anónimo**. (Al hacer clic en **Agregar donación** en la parte superior de la página, se salta directamente a este panel).
2. Después de seleccionar a una persona, el formulario de ingreso muestra los campos **Fecha**, **Método** (Cheque, Efectivo, Tarjeta o En especie), **Fondo**, **Notas**, **Monto** y **N.º de cheque** (o **Últimos 4 dígitos** para donaciones con tarjeta, o **Artículo** para describir una donación en especie). Haga clic en **Cambiar** junto al nombre del donante para elegir a otra persona.
3. Complete los datos y haga clic en **Agregar donación** (o presione Enter).
4. La donación se agrega a la lista de donaciones, y el formulario se restablece para que pueda ingresar la siguiente.

:::info
Si el lote se [cerró](batches.md#closing-and-reopening-a-batch), el panel de ingreso y los enlaces **Editar** se ocultan para quienes no tienen **Editar donaciones**, y un aviso en la parte superior del lote indica que está cerrado. Pida a alguien con **Editar donaciones** que lo reabra.
:::

:::tip
Puede ingresar varias donaciones seguidas sin salir de la página del lote. El formulario se restablece después de cada registro para que pueda avanzar rápidamente por un montón de cheques o sobres.
:::

## Importar donaciones desde un archivo CSV {#importing-donations-from-a-csv-file}

Si sus donaciones ya están en una hoja de cálculo, por ejemplo una exportación de otro sistema de donaciones o la hoja de conteo de un equipo, puede importarlas a un lote en lugar de escribir cada una.

1. Abra el lote y haga clic en **Importar CSV** en la parte superior de la página. (El botón aparece cuando puede modificar el lote y su iglesia tiene al menos un [fondo](funds.md)).
2. Haga clic en **Elegir archivo CSV** y seleccione su archivo. El archivo necesita una fila de encabezado, y las columnas pueden estar en cualquier orden:
   - **Monto** (obligatorio; `Total` también funciona): los símbolos de moneda y las comas se ignoran, así que `$1,250.00` es válido. El monto debe ser mayor que cero.
   - **Fecha**: use un formato como `2026-10-25` o `10/25/2026`. Si está en blanco, se usa la fecha del lote.
   - **Fondo**: el nombre del fondo, sin distinguir mayúsculas y minúsculas. Si está en blanco, se usa su primer fondo.
   - **Método**: **Cheque**, **Efectivo**, **Tarjeta** o **En especie**. Si está en blanco, se usa **Cheque**.
   - **N.º de cheque**: el número de cheque (u otro detalle del pago).
   - **Notas**
   - **Correo electrónico**, **Nombre**, o **Nombre** y **Apellido**: se usan para relacionar al donante con alguien de su base de datos. Un nombre escrito como "Smith, John" se lee como "John Smith".
3. Revise la vista previa. Cada fila muestra su número de línea, el donante según el archivo, la **Coincidencia**, el fondo y el monto:
   - El nombre de una persona significa que el donante fue encontrado. B1 busca primero por correo electrónico, luego por nombre exacto, y solo cuando encaja exactamente una persona.
   - **No encontrado: anónimo** significa que no se encontró una coincidencia única. La donación se importa como anónima, y se agrega "Importado como:" con el nombre del donante a sus notas para que pueda asignarla después.
   - Un mensaje rojo como **Monto no válido**, **Fondo desconocido**, **Método desconocido** o **Fecha no válida** significa que esa fila se omitirá. Corrija el archivo y vuelva a elegirlo para incluirla.
4. Haga clic en **Importar** (el botón muestra cuántas filas se importarán). Las donaciones se agregan al lote.

:::tip
Después de importar, use **Editar** en cualquier donación anónima para elegir a la persona correcta. La nota "Importado como:" le indica quién decía el archivo que la envió.
:::

## Registrar una ofrenda desde el registro de una persona

Para registrar una sola ofrenda sin abrir un lote, abra el registro del donante en **Personas** y haga clic en **Registrar una ofrenda** (en el resumen de donaciones o en la vista de donaciones de la persona).

1. Establezca la **Fecha** y el **Monto**.
2. Elija el **Fondo** y el **Método** (Cheque, Efectivo, Tarjeta o En especie), e ingrese el **N.º de cheque**, los **Últimos 4 dígitos** o el **Artículo** (para donaciones en especie) si es necesario.
3. Opcionalmente, agregue **Notas** y luego haga clic en **Guardar**.

La ofrenda se guarda en el lote de esa fecha. Si todavía no existe un lote para esa fecha, se crea uno automáticamente, con la fecha como nombre.

## Dividir una donación entre varios fondos

A veces, un solo donante da a más de un fondo en una misma transacción. Para manejarlo:

1. Debajo del panel de ingreso, haga clic en el enlace **editor completo de donaciones** (o haga clic en **Editar** en una fila de donación existente).
2. En el editor completo, agregue montos a distintos fondos. El total se calculará automáticamente a partir de los montos de cada fondo.
3. Haga clic en **Guardar** para actualizar la donación.

:::info
Dividir donaciones entre fondos es común cuando un donante escribe un solo cheque destinado a varios propósitos, como el Fondo general y Misiones.
:::

## Editar o eliminar donaciones

Para editar una donación, haga clic en el botón **Editar** de su fila en el lote. Puede cambiar la fecha, el monto, el fondo, el método de pago (Cheque, Efectivo, Tarjeta o En especie) o cualquier otro detalle. En una donación en especie, el editor muestra el campo de detalle como **Artículo** para que pueda describir lo que se entregó. Haga clic en **Guardar** cuando termine.

:::tip
La línea debajo del nombre del lote, en la parte superior de la página, se actualiza automáticamente para mostrar la fecha del lote, la cantidad de ofrendas y el monto total en dólares a medida que agrega o edita registros. Úsela para conciliar con su ficha de depósito.
:::

## Reembolsar una donación

Si se cobró a un donante por error o si pide que le devuelvan su dinero, puede reembolsar una donación completada directamente desde su pantalla de edición, sin ir al panel de su pasarela de pagos.

1. Abra la donación y haga clic en **Editar**.
2. Haga clic en el botón **Reembolsar**, junto a Eliminar, al final del formulario.
3. Confirme el cuadro de diálogo: "¿Reembolsar esta donación en su totalidad a través de la pasarela de pagos? Esto no se puede deshacer."

La donación se reembolsa en su totalidad a través de la pasarela de pagos original y se marca como **Reembolsada** en sus listas de donaciones.

:::warning
Los reembolsos solo pueden ser totales: no hay forma de reembolsar un monto parcial desde B1 Admin. Además, el reembolso no se puede deshacer una vez confirmado.
:::

:::info
El botón **Reembolsar** solo aparece en donaciones pagadas en línea (que tienen una transacción en la pasarela) y que siguen en estado **Completada**. Las donaciones ingresadas manualmente (efectivo, cheque) no tienen una transacción en la pasarela que reembolsar; edítelas o elimínelas.
:::

## Imprimir un recibo de una sola ofrenda

Cuando alguien entrega un cheque, paga un evento o una camiseta, o cuando una organización visitante trae una donación, puede imprimir un recibo solo para esa ofrenda, en lugar de imprimir todo el lote o un estado de cuenta de fin de año.

1. Abra el lote que contiene la donación.
2. Haga clic en **Recibo**, junto a **Editar**, en la fila de la donación. También puede hacer clic en **Recibo** al final del formulario Editar donación.
3. Haga clic en **Imprimir**, o en **Cerrar** para volver.

El recibo usa el mismo diseño que el estado de cuenta de donaciones: el nombre de su iglesia y del donante (o "Anónimo"), la fecha y el método de la ofrenda, cada fondo y su monto, la nota, su Nota de donación y el bloque oficial de recibo si ha configurado un **Formato de estado de cuenta** (consulte [Estados de cuenta de donaciones](giving-statements.md)). El número de recibo en ese bloque es el ID de la donación.

:::info
La leyenda "sin bienes ni servicios" solo se imprime cuando todos los fondos de la ofrenda están marcados como deducibles de impuestos. Si alguna parte de la ofrenda fue a un fondo que no es deducible de impuestos, como una cuota de evento o una compra, el recibo omite esa leyenda para que se lea como un pago y no como una donación caritativa.
:::

:::tip
Las donaciones en línea ya reciben un correo automático de agradecimiento, así que el recibo es útil sobre todo para las ofrendas que ingresa a mano.
:::

## Próximos pasos

- Revise sus registros con los [Informes de donaciones](donation-reports.md) para verificar la exactitud
- Al cierre del año, genere los [Estados de cuenta de donaciones](giving-statements.md) para sus donantes
