---
title: "Registrar donaciones"
description: "Registre donaciones de la iglesia en B1 Admin creando un lote, ingresando los donativos uno por uno, importando un CSV o registrando un donativo desde el perfil de un donante."
---

# Registrar donaciones

<div class="article-intro">

Registrar donaciones en B1 Admin se hace a través del sistema de lotes. Usted crea un lote para representar una colecta (como la ofrenda del domingo) y luego añade las donaciones individuales a ese lote. Así sus registros de donación se mantienen organizados y son fáciles de conciliar.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configure sus [fondos](funds.md) para poder asignar las donaciones a las categorías correctas
- Cree un [lote](batches.md) para contener las donaciones que va a ingresar
- Asegúrese de que los donantes estén en su [directorio de personas](../people/adding-people.md) para poder buscarlos al ingresar los donativos
- Necesita **Editar donaciones**, o **Ingresar donaciones** junto con **Ver donaciones**, para ingresar donativos en un lote (consulte [Quién puede modificar un lote](batches.md#who-can-change-a-batch))

</div>

## Crear un lote y añadir donaciones {#creating-a-batch-and-adding-donations}

1. En **B1 Admin**, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), despliegue **Donaciones** y haga clic en **Lotes**.
2. Haga clic en **Añadir lote** en la parte superior de la página.
3. Introduzca un nombre para el lote (por ejemplo, "Ofrenda del domingo - 5 ene") y seleccione la fecha. Haga clic en **Guardar**.
4. Su nuevo lote aparece en la lista con cero donaciones y $0.00.
5. Haga clic en el **nombre del lote** para abrirlo.

## Ingresar donaciones individuales {#entering-individual-donations}

1. En la página de detalle del lote, el panel de ingreso de donaciones aparece junto a la lista de donaciones. En **Seleccionar persona o anónimo**, escriba el nombre del donante en el campo de búsqueda para encontrarlo, o haga clic en **Anónimo**. (Al hacer clic en **Añadir donación** en la parte superior de la página, se va directamente a este panel).
2. Después de seleccionar una persona, el formulario de ingreso muestra los campos **Fecha** (que comienza con la fecha del lote), **Método** (Cheque, Efectivo, Tarjeta o En especie), **Fondo** (se muestra cuando su iglesia tiene más de un fondo), **Memo (se imprime en el estado)**, **Notas (internas)**, **Monto** y **N.º de cheque** (o **Últimos 4 dígitos** para donativos con tarjeta, o **Artículo** para describir un donativo en especie; los donativos en efectivo no tienen campo de detalle). Haga clic en **Cambiar** junto al nombre del donante para elegir a otra persona.
3. Complete los datos y haga clic en **Añadir donación** (o presione Enter). Si el monto está vacío o es cero, el formulario le pedirá ingresar un monto mayor que cero en lugar de guardar.
4. La donación se añade a la lista de donaciones, y el formulario se reinicia para que pueda ingresar la siguiente. La fecha, el método, el fondo, el memo y las notas se mantienen como los configuró, así que una pila de cheques similares solo necesita el donante, el monto y el número de cheque.

:::tip ¿Memo o Notas?
El **Memo** se imprime en el estado de donación y en el recibo del donante, junto al donativo. Úselo para lo que el donante debe ver, como el propósito de un donativo destinado a un fin específico ("Viaje de jóvenes"). Las **Notas** son solo para su personal y nunca se imprimen. Cuando alguien da en línea, lo que escribe en el cuadro de memo del formulario de donación se guarda como el memo del donativo.
:::

:::info
Si el lote ha sido [cerrado](batches.md#closing-and-reopening-a-batch), el panel de ingreso y los enlaces de **Editar** se ocultan para quien no tenga **Editar donaciones**, y un aviso en la parte superior del lote indica que está cerrado. Pida a alguien con **Editar donaciones** que lo reabra.
:::

:::tip
Puede ingresar varias donaciones seguidas sin salir de la página del lote. El formulario se reinicia después de cada entrada para que pueda avanzar eficientemente por una pila de cheques o sobres.
:::

## Importar donaciones desde un archivo CSV {#importing-donations-from-a-csv-file}

Si sus donaciones ya están en una hoja de cálculo, por ejemplo, una exportación de otro sistema de donaciones o la hoja de conteo de un equipo de contadores, puede importarlas a un lote en lugar de escribir cada una.

1. Abra el lote y haga clic en **Importar CSV** en la parte superior de la página. (El botón aparece cuando puede modificar el lote y su iglesia tiene al menos un [fondo](funds.md)).
2. Haga clic en **Elegir archivo CSV** y seleccione su archivo. El archivo necesita una fila de encabezado, y las columnas pueden estar en cualquier orden:
   - **Monto** (obligatorio; `Total` también funciona): los símbolos de moneda y las comas se ignoran, así que `$1,250.00` está bien. El monto debe ser mayor que cero.
   - **Fecha**: use un formato como `2026-10-25` o `10/25/2026`. Si está en blanco, se usa la fecha del lote.
   - **Fondo**: el nombre del fondo, sin distinguir mayúsculas y minúsculas. Si está en blanco, se usa su primer fondo.
   - **Método**: **Cheque**, **Efectivo**, **Tarjeta** o **En especie**. Si está en blanco, se usa **Cheque**.
   - **Número de cheque**: el número de cheque (u otro detalle del pago).
   - **Notas**
   - **Correo electrónico**, **Nombre**, o **Nombre** y **Apellido**: se usan para relacionar al donante con alguien de su base de datos. Un nombre escrito como "Pérez, Juan" se lee como "Juan Pérez".
3. Revise la vista previa. Cada fila muestra su número de línea, el donante del archivo, la **Coincidencia**, el fondo y el monto:
   - El nombre de una persona significa que el donante fue relacionado. B1 relaciona primero por correo electrónico, luego por nombre exacto, y solo cuando encaja exactamente una persona.
   - **No encontrado: anónimo** significa que no se encontró una coincidencia única. El donativo se importa como anónimo, y se añade "Importado como:" con el nombre del donante a sus notas para que pueda asignarlo después.
   - Un mensaje en rojo como **Monto no válido**, **Fondo desconocido**, **Método desconocido** o **Fecha no válida** significa que esa fila se omitirá. Corrija el archivo y vuelva a elegirlo para incluirla.
4. Haga clic en **Importar** (el botón muestra cuántas filas se importarán). Las donaciones se añaden al lote.

:::tip
Después de importar, use **Editar** en cualquier donación anónima para elegir a la persona correcta. La nota "Importado como:" le indica de quién decía el archivo que era.
:::

## Registrar un donativo desde el registro de una persona {#logging-a-gift-from-a-persons-record}

Para registrar un solo donativo sin abrir un lote, abra el registro del donante en **Personas** y haga clic en **Registrar un donativo** (en el resumen de donaciones, o en la vista de donaciones de la persona).

1. Establezca la **Fecha** y el **Monto**.
2. Elija el **Fondo** y el **Método** (Cheque, Efectivo, Tarjeta o En especie), e introduzca el **N.º de cheque**, los **Últimos 4 dígitos** o el **Artículo** (para donativos en especie) si es necesario.
3. Opcionalmente, añada **Notas** y luego haga clic en **Guardar**.

El donativo se guarda en el lote de esa fecha. Si todavía no existe un lote para esa fecha, se crea uno automáticamente, con la fecha como nombre.

## Dividir una donación entre varios fondos {#splitting-a-donation-across-multiple-funds}

A veces un mismo donante da a más de un fondo en una sola transacción. Para manejarlo:

1. Debajo del panel de ingreso, haga clic en el enlace del **editor completo de donaciones** (o haga clic en **Editar** en la fila de una donación existente). Un donativo nuevo comienza con la fecha del lote.
2. En el editor completo, introduzca un monto y un fondo, luego haga clic en **Añadir más** para agregar otro fondo y monto. El total se calcula a partir de los montos de cada fondo.
3. Haga clic en **Guardar**. Un donativo sin monto en ningún fondo no se guarda; el editor le pedirá un monto mayor que cero.

:::info
Dividir donaciones entre fondos es común cuando un donante escribe un solo cheque destinado a varios propósitos, como el Fondo General y Misiones.
:::

## Editar o quitar donaciones {#editing-or-removing-donations}

Para editar una donación, haga clic en el botón **Editar** de su fila en el lote. Puede cambiar la fecha, el monto, el fondo, el método de pago (Cheque, Efectivo, Tarjeta o En especie) o cualquier otro detalle, incluidos el **Memo** y las **Notas**. En un donativo en especie, el editor etiqueta el campo de detalle como **Artículo** para que pueda describir lo que se entregó. Haga clic en **Guardar** cuando termine.

:::tip
La línea debajo del nombre del lote en la parte superior de la página se actualiza automáticamente para mostrar la fecha del lote, el número de donativos y el monto combinado en dólares a medida que añade o edita registros. Úselo para conciliar con su boleta de depósito.
:::

## Reembolsar una donación {#refunding-a-donation}

Si se le cobró a un donante por error o pide que le devuelvan su dinero, puede reembolsar una donación completada directamente desde su pantalla de edición, sin necesidad de ir al panel de su pasarela de pagos.

1. Abra la donación y haga clic en **Editar**.
2. Haga clic en el botón **Reembolsar** junto a Eliminar, en la parte inferior del formulario.
3. Confirme el cuadro de diálogo: "¿Reembolsar esta donación en su totalidad a través de la pasarela de pagos? Esta acción no se puede deshacer."

La donación se reembolsa en su totalidad a través de la pasarela de pagos original y se marca como **Reembolsada** en sus listas de donaciones.

:::warning
Los reembolsos son solo totales: no hay forma de reembolsar un monto parcial desde B1 Admin. Además, el reembolso no se puede deshacer una vez confirmado.
:::

:::info
El botón **Reembolsar** solo aparece para las donaciones pagadas en línea (que tienen una transacción en la pasarela) y que todavía están en estado **Completada**. Las donaciones ingresadas manualmente (efectivo, cheque) no tienen una transacción en la pasarela que reembolsar; edítelas o elimínelas en su lugar.
:::

## Imprimir un recibo de un solo donativo {#printing-a-receipt-for-one-gift}

Cuando alguien entrega un cheque, paga un evento o una camiseta, o una organización visitante trae una donación, puede imprimir un recibo solo para ese donativo, en lugar de para un lote completo o un estado de fin de año.

1. Abra el lote que contiene la donación.
2. Haga clic en **Recibo** junto a **Editar** en la fila de la donación. También puede hacer clic en **Recibo** en la parte inferior del formulario Editar donación.
3. Haga clic en **Imprimir**, o en **Cerrar** para volver.

El recibo usa el mismo diseño que el estado de donación: su iglesia y el donante (o "Anónimo"), la fecha y el método del donativo, cada fondo y monto, el memo del donativo (si tiene uno), su Nota de donación, y el bloque de recibo oficial si ha configurado un **Formato del estado** (consulte [Estados de donación](giving-statements.md)). El número de recibo de ese bloque es el ID de la donación.

:::info
La redacción "sin bienes ni servicios" solo se imprime cuando todos los fondos del donativo están marcados como deducibles de impuestos. Si alguna parte del donativo fue a un fondo no deducible de impuestos, como una cuota de evento o una compra, el recibo omite esa redacción para que se lea como un pago y no como un donativo caritativo.
:::

:::tip
Las donaciones en línea ya reciben automáticamente un correo de agradecimiento, así que el recibo resulta útil sobre todo para los donativos que ingresa a mano.
:::

## Próximos pasos {#next-steps}

- Revise sus registros con los [Informes de donaciones](donation-reports.md) para verificar su exactitud
- Al final del año, genere los [Estados de donación](giving-statements.md) para sus donantes
