---
title: "Registrar donaciones"
---

# Registrar donaciones

<div class="article-intro">

En B1 Admin, las donaciones se registran mediante el sistema de Lotes. Crea un lote para representar una colecta (como la ofrenda del domingo) y luego agrega las donaciones individuales a ese lote. Así tus registros de ofrendas se mantienen organizados y son fáciles de conciliar.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configura tus [fondos](funds.md) para poder asignar las donaciones a las categorías correctas
- Crea un [lote](batches.md) para guardar las donaciones que vas a ingresar
- Asegúrate de que los donantes estén en tu [directorio de personas](../people/adding-people.md) para poder buscarlos al ingresar las ofrendas
- Necesitas el permiso **Editar donaciones**, o **Ingresar donaciones** junto con **Ver donaciones**, para ingresar ofrendas en un lote (consulta [Quién puede modificar un lote](batches.md#who-can-change-a-batch))

</div>

## Crear un lote y agregar donaciones

1. En **B1 Admin**, abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expande **Donaciones** y haz clic en **Lotes**.
2. Haz clic en **Agregar lote** en la parte superior de la página.
3. Escribe un nombre para el lote (por ejemplo, "Ofrenda dominical - 5 de enero") y selecciona la fecha. Haz clic en **Guardar**.
4. Tu nuevo lote aparece en la lista mostrando cero donaciones y $0.00.
5. Haz clic en el **nombre del lote** para abrirlo.

## Ingresar donaciones individuales

1. En la página de detalle del lote, el panel de ingreso de donaciones aparece junto a la lista de donaciones. Debajo de **Seleccionar persona o anónimo**, escribe el nombre del donante en el campo de búsqueda para encontrarlo, o haz clic en **Anónimo**. (Al hacer clic en **Agregar donación** en la parte superior de la página, se salta a este panel).
2. Después de seleccionar una persona, el formulario de ingreso muestra los campos **Fecha**, **Método** (Cheque, Efectivo, Tarjeta o En especie), **Fondo**, **Notas**, **Monto** y **N.º de cheque** (o **Últimos 4 dígitos** para donaciones con tarjeta, o **Artículo** para describir una donación en especie). Haz clic en **Cambiar** junto al nombre del donante para elegir a otra persona.
3. Completa los datos y haz clic en **Agregar donación** (o presiona Enter).
4. La donación se agrega a la lista de donaciones y el formulario se restablece para que puedas ingresar la siguiente.

:::info
Si el lote se ha [cerrado](batches.md#closing-and-reopening-a-batch), el panel de ingreso y los enlaces **Editar** quedan ocultos para quienes no tengan el permiso **Editar donaciones**, y un aviso en la parte superior del lote indica que está cerrado. Pide a alguien con el permiso **Editar donaciones** que lo vuelva a abrir.
:::

:::tip
Puedes ingresar varias donaciones seguidas sin salir de la página del lote. El formulario se restablece después de cada registro, para que puedas avanzar rápidamente por una pila de cheques o sobres.
:::

## Importar donaciones desde un archivo CSV {#importing-donations-from-a-csv-file}

Si tus donaciones ya están en una hoja de cálculo, por ejemplo una exportación de otro sistema de donaciones o la hoja de conteo de un equipo, puedes importarlas a un lote en lugar de escribir cada una.

1. Abre el lote y haz clic en **Importar CSV** en la parte superior de la página. (El botón aparece cuando puedes modificar el lote y tu iglesia tiene al menos un [fondo](funds.md)).
2. Haz clic en **Elegir archivo CSV** y selecciona tu archivo. El archivo necesita una fila de encabezado, y las columnas pueden estar en cualquier orden:
   - **Monto** (obligatorio; `Total` también funciona) -- Los símbolos de moneda y las comas se ignoran, así que `$1,250.00` es válido. El monto debe ser mayor que cero.
   - **Fecha** -- Usa un formato como `2026-10-25` o `10/25/2026`. Si está en blanco, se usa la fecha del lote.
   - **Fondo** -- El nombre del fondo, sin distinguir mayúsculas de minúsculas. Si está en blanco, se usa tu primer fondo.
   - **Método** -- **Cheque**, **Efectivo**, **Tarjeta** o **En especie**. Si está en blanco, se usa **Cheque**.
   - **N.º de cheque** -- El número de cheque (u otro detalle del pago).
   - **Notas**
   - **Correo electrónico**, **Nombre**, o **Nombre** y **Apellido** -- Se usan para vincular al donante con alguien de tu base de datos. Un nombre escrito como "Smith, John" se lee como "John Smith".
3. Revisa la vista previa. Cada fila muestra su número de línea, el donante del archivo, la **Coincidencia**, el fondo y el monto:
   - El nombre de una persona significa que el donante fue encontrado. B1 busca primero por correo electrónico, luego por nombre exacto, y solo cuando coincide exactamente una persona.
   - **No encontrado: anónimo** significa que no se encontró una coincidencia única. La donación se importa como anónima y se agrega "Importado como:" con el nombre del donante a sus notas para que puedas asignarla más tarde.
   - Un mensaje en rojo como **Monto no válido**, **Fondo desconocido**, **Método desconocido** o **Fecha no válida** significa que esa fila se omitirá. Corrige el archivo y vuelve a elegirlo para incluirla.
4. Haz clic en **Importar** (el botón muestra cuántas filas se importarán). Las donaciones se agregan al lote.

:::tip
Después de importar, usa **Editar** en cualquier donación anónima para elegir a la persona correcta. La nota "Importado como:" te indica quién decía el archivo que era el donante.
:::

## Registrar una ofrenda desde el registro de una persona

Para registrar una sola ofrenda sin abrir un lote, abre el registro del donante en **Personas** y haz clic en **Registrar una ofrenda** (en el resumen de donaciones, o en la vista de donaciones de la persona).

1. Establece la **Fecha** y el **Monto**.
2. Elige el **Fondo** y el **Método** (Cheque, Efectivo, Tarjeta o En especie), y si es necesario ingresa el **N.º de cheque**, los **Últimos 4 dígitos** o el **Artículo** (para ofrendas en especie).
3. Opcionalmente agrega **Notas**, y luego haz clic en **Guardar**.

La ofrenda se guarda en el lote de esa fecha. Si todavía no existe un lote para esa fecha, se crea automáticamente con la fecha como nombre.

## Dividir una donación entre varios fondos

A veces un donante da a más de un fondo en una misma transacción. Para manejarlo:

1. Debajo del panel de ingreso, haz clic en el enlace **editor completo de donaciones** (o haz clic en **Editar** en una fila de donación existente).
2. En el editor completo, agrega montos a los distintos fondos. El total se calculará automáticamente a partir de los montos de cada fondo.
3. Haz clic en **Guardar** para actualizar la donación.

:::info
Dividir donaciones entre fondos es común cuando un donante escribe un solo cheque destinado a varios propósitos, como el Fondo General y Misiones.
:::

## Editar o eliminar donaciones

Para editar una donación, haz clic en el botón **Editar** de su fila en el lote. Puedes cambiar la fecha, el monto, el fondo, el método de pago (Cheque, Efectivo, Tarjeta o En especie) o cualquier otro detalle. En el caso de una donación en especie, el editor muestra el campo de detalle como **Artículo** para que describas lo que se entregó. Haz clic en **Guardar** cuando termines.

:::tip
La línea debajo del nombre del lote, en la parte superior de la página, se actualiza automáticamente para mostrar la fecha del lote, el número de ofrendas y el monto total en dólares a medida que agregas o editas registros. Úsala para conciliar con tu comprobante de depósito.
:::

## Reembolsar una donación

Si se cobró a un donante por error o si solicita que le devuelvan su dinero, puedes reembolsar una donación completada directamente desde su pantalla de edición, sin necesidad de ir al panel de tu pasarela de pagos.

1. Abre la donación y haz clic en **Editar**.
2. Haz clic en el botón **Reembolsar** junto a Eliminar, en la parte inferior del formulario.
3. Confirma el diálogo: "¿Reembolsar esta donación en su totalidad a través de la pasarela de pagos? Esta acción no se puede deshacer."

La donación se reembolsa en su totalidad a través de la pasarela de pagos original y se marca como **Reembolsada** en tus listas de donaciones.

:::warning
Los reembolsos son solo totales: no hay forma de reembolsar un monto parcial desde B1 Admin. Además, el reembolso no se puede deshacer una vez confirmado.
:::

:::info
El botón **Reembolsar** solo aparece en donaciones pagadas en línea (que tienen una transacción en la pasarela) y que aún están en estado **Completada**. Las donaciones ingresadas manualmente (efectivo, cheque) no tienen una transacción en la pasarela que se pueda reembolsar; en ese caso, edítalas o elimínalas.
:::

## Próximos pasos

- Revisa tus registros con los [Informes de donaciones](donation-reports.md) para verificar que sean correctos
- Al final del año, genera los [Estados de cuenta de donaciones](giving-statements.md) para tus donantes
