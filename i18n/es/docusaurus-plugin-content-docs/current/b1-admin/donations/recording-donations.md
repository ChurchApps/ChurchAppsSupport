---
title: "Registrar donaciones"
---

# Registrar donaciones

<div class="article-intro">

Registrar donaciones en B1 Admin se hace a través del sistema de Lotes. Creas un lote para representar una colecta (como la ofrenda del domingo) y luego agregas las donaciones individuales a ese lote. Así tus registros de donaciones quedan organizados y son fáciles de conciliar.

</div>

<div class="prereqs">
<h4>Antes de empezar</h4>

- Configura tus [fondos](funds.md) para poder asignar las donaciones a las categorías correctas
- Crea un [lote](batches.md) para guardar las donaciones que vas a introducir
- Asegúrate de que los donantes estén en tu [directorio de personas](../people/adding-people.md) para poder buscarlos al introducir las donaciones
- Necesitas **Editar donaciones**, o **Introducir donaciones** junto con **Ver donaciones**, para introducir donaciones en un lote (consulta [Quién puede modificar un lote](batches.md#who-can-change-a-batch))

</div>

## Crear un lote y agregar donaciones

1. En **B1 Admin**, abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda arriba a la izquierda), expande **Donaciones** y haz clic en **Lotes**.
2. Haz clic en **Añadir lote** en la parte superior de la página.
3. Escribe un nombre para el lote (por ejemplo, "Ofrenda del domingo - 5 de enero") y selecciona la fecha. Haz clic en **Guardar**.
4. Tu nuevo lote aparece en la lista, con cero donaciones y 0,00 $.
5. Haz clic en el **nombre del lote** para abrirlo.

## Introducir donaciones individuales

1. En la página de detalle del lote, el panel de entrada de donaciones aparece junto a la lista de donaciones. En **Seleccionar persona o anónimo**, escribe el nombre del donante en el campo de búsqueda para encontrarlo, o haz clic en **Anónimo**. (Al hacer clic en **Añadir donación** en la parte superior de la página se va directamente a este panel.)
2. Después de seleccionar a una persona, el formulario de entrada muestra los campos **Fecha**, **Método** (Cheque, Efectivo, Tarjeta o En especie), **Fondo**, **Notas**, **Importe** y **N.º de cheque** (o **Últimos 4 dígitos** para donaciones con tarjeta, o **Artículo** para describir una donación en especie). Haz clic en **Cambiar** junto al nombre del donante para elegir a otra persona.
3. Completa los datos y haz clic en **Añadir donación** (o pulsa Intro).
4. La donación se añade a la lista de donaciones y el formulario se vacía para que puedas introducir la siguiente.

:::info
Si el lote se ha [cerrado](batches.md#closing-and-reopening-a-batch), el panel de entrada y los enlaces **Editar** quedan ocultos para quienes no tengan **Editar donaciones**, y un aviso en la parte superior del lote indica que está cerrado. Pide a alguien con **Editar donaciones** que lo vuelva a abrir.
:::

:::tip
Puedes introducir varias donaciones seguidas sin salir de la página del lote. El formulario se vacía después de cada entrada para que puedas avanzar con rapidez por una pila de cheques o sobres.
:::

## Registrar un donativo desde el registro de una persona

Para registrar un solo donativo sin abrir un lote, abre el registro del donante en **Personas** y haz clic en **Registrar donativo** (en el resumen de donaciones o en la vista de donaciones de la persona).

1. Establece la **Fecha** y el **Importe**.
2. Elige el **Fondo** y el **Método** (Cheque, Efectivo, Tarjeta o En especie), e introduce el **N.º de cheque**, los **Últimos 4 dígitos** o el **Artículo** (para donaciones en especie) si hace falta.
3. Opcionalmente, añade **Notas** y haz clic en **Guardar**.

El donativo se guarda en el lote de esa fecha. Si todavía no existe un lote para esa fecha, se crea automáticamente y se nombra con la fecha.

## Dividir una donación entre varios fondos

A veces un mismo donante aporta a más de un fondo en una sola transacción. Para gestionarlo:

1. Debajo del panel de entrada, haz clic en el enlace **editor completo de donaciones** (o haz clic en **Editar** en la fila de una donación existente).
2. En el editor completo, añade importes a los distintos fondos. El total se calculará automáticamente a partir de los importes de cada fondo.
3. Haz clic en **Guardar** para actualizar la donación.

:::info
Dividir donaciones entre fondos es habitual cuando un donante escribe un solo cheque destinado a varios fines, como el Fondo General y Misiones.
:::

## Editar o eliminar donaciones

Para editar una donación, haz clic en el botón **Editar** de su fila en el lote. Puedes cambiar la fecha, el importe, el fondo, el método de pago (Cheque, Efectivo, Tarjeta o En especie) o cualquier otro detalle. En una donación en especie, el editor muestra el campo de detalle como **Artículo** para que puedas describir lo que se entregó. Haz clic en **Guardar** cuando termines.

:::tip
La línea debajo del nombre del lote, en la parte superior de la página, se actualiza automáticamente para mostrar la fecha del lote, el número de donaciones y el importe total en dólares a medida que agregas o editas entradas. Úsala para conciliar con tu hoja de depósito.
:::

## Reembolsar una donación

Si se cobró a un donante por error o si pide que le devuelvan su dinero, puedes reembolsar una donación completada directamente desde su pantalla de edición, sin tener que ir al panel de tu pasarela de pago.

1. Abre la donación y haz clic en **Editar**.
2. Haz clic en el botón **Reembolsar**, junto a Eliminar, en la parte inferior del formulario.
3. Confirma el cuadro de diálogo: "¿Reembolsar esta donación en su totalidad a través de la pasarela de pago? Esta acción no se puede deshacer."

La donación se reembolsa en su totalidad a través de la pasarela de pago original y aparece marcada como **Reembolsada** en tus listados de donaciones.

:::warning
Los reembolsos son solo totales: no hay forma de reembolsar una cantidad parcial desde B1 Admin. Además, el reembolso no se puede deshacer una vez confirmado.
:::

:::info
El botón **Reembolsar** solo aparece en las donaciones pagadas en línea (que tienen una transacción en la pasarela) y que siguen en estado **Completada**. Las donaciones introducidas manualmente (efectivo, cheque) no tienen transacción en la pasarela que reembolsar; edítalas o elimínalas en su lugar.
:::

## Próximos pasos

- Revisa tus entradas con los [Informes de donaciones](donation-reports.md) para verificar que sean correctas
- Al final del año, genera los [Certificados de donación](giving-statements.md) para tus donantes
