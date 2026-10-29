---
title: "Lotes de donaciones"
---

# Lotes de donaciones

<div class="article-intro">

Los lotes agrupan sus donaciones para facilitar el seguimiento y la conciliación. Un lote típico representa una sola colecta, como una ofrenda dominical o un evento especial. Usar lotes le ayuda a mantenerse organizado y facilita verificar que sus registros coincidan con los depósitos reales.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Asegúrese de haber [configurado sus fondos](funds.md) para que estén disponibles al registrar donaciones.
- Necesita el permiso **Ver resúmenes de donaciones**, **Editar donaciones** o **Ingresar donaciones** para ver la página de Lotes (consulte [Quién puede cambiar un lote](#who-can-change-a-batch)).

</div>

## La página de lotes

Cuando vaya a **Donaciones > Lotes**, verá una lista de sus lotes. Cada fila muestra:

- **Nombre**: la etiqueta que le asignó al lote
- **Fecha**: la fecha de la colecta
- **Donaciones**: el número de donaciones individuales del lote
- **Total**: el monto total en dólares
- **Estado**: **Abierto** o **Cerrado** (consulte [Cerrar y reabrir un lote](#closing-and-reopening-a-batch))

Sobre la lista, los botones de año le permiten mostrar solo los lotes de un año, o **Todos** los lotes. Un resumen de una línea muestra el número de lotes, el número de donaciones y el monto total de los lotes mostrados.

## Crear un lote nuevo

1. Haga clic en **Agregar lote** en la parte superior de la página.
2. Escriba un nombre descriptivo (por ejemplo, "Ofrenda dominical - 9 feb").
3. Seleccione la fecha de la colecta.
4. Haga clic en **Guardar**.

Su nuevo lote aparece en la lista, listo para que agregue donaciones.

## Trabajar con lotes

- **Ver donaciones**: haga clic en el nombre de un lote para abrirlo y ver todas las donaciones individuales que contiene. Desde ahí puede agregar, editar o eliminar donaciones, o hacer clic en **Importar CSV** para agregar muchas donaciones a la vez desde una hoja de cálculo (consulte [Importar donaciones desde un archivo CSV](recording-donations.md#importing-donations-from-a-csv-file)).
- **Editar detalles del lote**: haga clic en el botón **Editar** de una fila de lote para cambiar su nombre o fecha. Solo las personas con **Editar donaciones** pueden eliminar un lote.
- **Ordenar**: use los encabezados de columna para ordenar los lotes por nombre o fecha.
- **Exportar**: haga clic en **Exportar** en la parte superior de la página para descargar los lotes mostrados como hoja de cálculo (CSV).
- **Eventos fallidos**: si su pasarela de pagos ha reportado problemas, aparece un botón **Eventos fallidos** (con el número de eventos no resueltos) en la parte superior de la página. Haga clic para mostrar u ocultar la lista de eventos debajo de los lotes.
- **Importar desde Stripe**: haga clic en **Importar transacciones de Stripe faltantes** en la parte superior de la página para abrir la herramienta de [Importación de Stripe](stripe-import.md).

## Cerrar y reabrir un lote

Una vez que un lote ha sido contado y depositado, ciérrelo para que sus donaciones permanezcan exactamente como estaban cuando lo cerró.

1. Abra el lote.
2. Haga clic en **Cerrar lote** en la parte superior de la página.

La etiqueta de estado junto al nombre del lote cambia de **Abierto** a **Cerrado**, el lote muestra **Cerrado** en la columna **Estado** de la página de Lotes, y un aviso en la parte superior del lote explica que está cerrado. Mientras un lote está cerrado, las personas con **Ingresar donaciones** pueden verlo, pero no pueden agregar, editar ni eliminar sus donaciones, ni cambiar el nombre o la fecha del lote.

Para hacer cambios de nuevo, abra el lote y haga clic en **Reabrir lote**. Los lotes nuevos siempre comienzan abiertos.

:::info
Solo las personas con **Editar donaciones** ven los botones **Cerrar lote** y **Reabrir lote**. También pueden seguir cambiando las donaciones de un lote cerrado si se necesita una corrección, sin reabrirlo.
:::

## Quién puede cambiar un lote

Dos [permisos de rol](../settings/roles-permissions.md) permiten a alguien trabajar con lotes:

- **Editar donaciones**: acceso completo: agregar y eliminar lotes, cerrarlos y reabrirlos, y agregar, editar o eliminar cualquier donación, ya sea que el lote esté abierto o cerrado.
- **Ingresar donaciones**: para equipos de conteo y voluntarios que registran las ofrendas. Pueden agregar lotes y agregar, editar o eliminar donaciones, pero solo mientras el lote esté abierto. No pueden eliminar lotes, cerrarlos ni reabrirlos, ni cambiar donaciones que llegaron mediante donaciones en línea.

Alguien con **Ingresar donaciones** pero sin **Ver resúmenes de donaciones** ve **Donaciones** en el menú de B1 Admin, que lleva directamente a la página de Lotes. **Resumen**, **Fondos**, **Campañas** y **Estados de cuenta de donaciones** permanecen ocultos para esa persona. Para abrir un lote y ver las donaciones que contiene, el rol también necesita **Ver donaciones**.

:::tip
Una configuración común es un rol "Equipo de conteo" con **Ingresar donaciones** y **Ver donaciones**, y un tesorero con **Editar donaciones** que cierra cada lote una vez conciliado el depósito.
:::

## Imprimir un lote

Abra un lote y haga clic en **Imprimir** sobre la lista de donaciones para imprimir una copia en papel para su equipo de conteo o sus registros de depósito. La impresión incluye:

- El membrete de su iglesia: su logotipo (el **Logotipo para fondo claro** de [Sitio web > Apariencia](../website/appearance.md), si ha subido uno) con el nombre de su iglesia debajo, y luego el nombre del lote y la fecha del lote
- Cada donación del lote, con el nombre del donante, el método, las notas, la fecha y el monto (las donaciones reembolsadas aparecen tachadas y marcadas como reembolsadas)
- **Subtotales por fondo**: el total entregado a cada fondo en el lote
- **Total del lote**: el monto combinado de todo el lote

El botón **Imprimir** solo aparece cuando el lote tiene al menos una donación.

### Imprimir varios lotes a la vez

Para imprimir todos los lotes de un periodo de una vez (por ejemplo, todos los depósitos del mes pasado), haga clic en **Imprimir** en la parte superior de la página **Lotes**, junto a **Exportar**. Se abre la página **Imprimir lotes** con una **Fecha de inicio** y una **Fecha de fin** que coinciden con los lotes en pantalla: del 1 de enero al 31 de diciembre del año que eligió, o desde la fecha del lote más antiguo hasta la más reciente cuando se selecciona **Todos**. Cambie cualquiera de las fechas para elegir otro rango.

Cada lote con fecha dentro del rango (incluyendo las fechas de inicio y fin) se imprime en orden cronológico, un lote por página, con el mismo diseño que una impresión de un solo lote. Los lotes sin donaciones se omiten, y si ninguno de los lotes del rango tiene donaciones verá el mensaje "No hay lotes con donaciones en este rango de fechas". Haga clic en **Imprimir** para abrir el cuadro de diálogo de impresión de su navegador, o en **Cerrar** para volver a la lista de lotes.

## Exportar un lote a QuickBooks Online

Abra un lote y haga clic en **Exportar para QuickBooks** para descargarlo como un asiento contable que QuickBooks Online puede importar (**Configuración > Importar datos > Asientos contables**). El archivo contiene un cargo a **Fondos no depositados** por el total del lote y un abono por cada fondo, usando el nombre de cada fondo como nombre de cuenta. QuickBooks le pedirá que relacione esos nombres con su catálogo de cuentas durante la importación, así que nombre sus fondos de la misma forma en que su contador nombra las cuentas de ingresos, o asígnelos una vez al importar.

:::tip
Nombre sus lotes de forma consistente para que sea fácil encontrarlos después. Incluir la fecha y el tipo de colecta (por ejemplo, "Dominical AM - 2025-02-09") mantiene su lista organizada a medida que crece.
:::

## Siguientes pasos

Una vez que tenga un lote, consulte [Registrar donaciones](recording-donations.md) para aprender a agregar donaciones individuales a él. También puede [importar transacciones de Stripe](stripe-import.md) para crear lotes automáticamente a partir de donaciones en línea.
