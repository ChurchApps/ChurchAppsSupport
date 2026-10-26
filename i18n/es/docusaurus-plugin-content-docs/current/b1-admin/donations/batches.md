---
title: "Lotes de donaciones"
---

# Lotes de donaciones

<div class="article-intro">

Los lotes agrupan sus donaciones para facilitar el seguimiento y la conciliación. Un lote típico representa una sola colecta, como la ofrenda del domingo o un evento especial. Usar lotes le ayuda a mantenerse organizado y facilita verificar que sus registros coincidan con los depósitos reales.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Asegúrese de haber [configurado sus fondos](funds.md) para que estén disponibles al registrar donaciones
- Necesitará el permiso **Ver resúmenes de donaciones**, **Editar donaciones** o **Registrar donaciones** para ver la página de Lotes (consulte [Quién puede modificar un lote](#who-can-change-a-batch))

</div>

## La página de Lotes

Cuando navega a **Donaciones > Lotes**, verá una lista de sus lotes. Cada fila muestra:

- **Nombre**: la etiqueta que le dio al lote
- **Fecha**: la fecha de la colecta
- **Donaciones**: el número de donaciones individuales en el lote
- **Total**: el monto total en dólares
- **Estado**: **Abierto** o **Cerrado** (consulte [Cerrar y reabrir un lote](#closing-and-reopening-a-batch))

Encima de la lista, los botones de año le permiten mostrar solo los lotes de un año, o **Todos** los lotes. Un resumen de una línea muestra el número de lotes, el número de donativos y el monto total de los lotes mostrados.

## Crear un nuevo lote

1. Haga clic en **Agregar lote** en la parte superior de la página.
2. Ingrese un nombre descriptivo (por ejemplo, "Ofrenda del domingo - 9 de feb").
3. Seleccione la fecha de la colecta.
4. Haga clic en **Guardar**.

Su nuevo lote aparece en la lista, listo para que agregue donaciones.

## Trabajar con lotes

- **Ver donaciones**: haga clic en el nombre de un lote para abrirlo y ver todas las donaciones individuales que contiene. Desde allí puede agregar, editar o quitar donaciones, o hacer clic en **Importar CSV** para agregar muchas donaciones a la vez desde una hoja de cálculo (consulte [Importar donaciones desde un archivo CSV](recording-donations.md#importing-donations-from-a-csv-file)).
- **Editar los detalles del lote**: haga clic en el botón **Editar** de la fila de un lote para cambiar su nombre o fecha. Solo las personas con **Editar donaciones** pueden eliminar un lote.
- **Ordenar**: use los encabezados de columna para ordenar los lotes por nombre o fecha.
- **Exportar**: haga clic en **Exportar** en la parte superior de la página para descargar los lotes mostrados como hoja de cálculo (CSV).
- **Eventos fallidos**: si su pasarela de pagos ha reportado problemas, aparece un botón **Eventos fallidos** (con el número de eventos sin resolver) en la parte superior de la página. Haga clic en él para mostrar u ocultar la lista de eventos debajo de los lotes.
- **Importar desde Stripe**: haga clic en **Importar transacciones de Stripe faltantes** en la parte superior de la página para abrir la herramienta de [Importación de Stripe](stripe-import.md).

## Cerrar y reabrir un lote

Una vez que un lote ha sido contado y depositado, ciérrelo para que sus donaciones permanezcan exactamente como estaban cuando lo cerró.

1. Abra el lote.
2. Haga clic en **Cerrar lote** en la parte superior de la página.

La etiqueta de estado junto al nombre del lote cambia de **Abierto** a **Cerrado**, el lote muestra **Cerrado** en la columna **Estado** de la página de Lotes, y un aviso en la parte superior del lote explica que está cerrado. Mientras un lote está cerrado, las personas con **Registrar donaciones** aún pueden verlo, pero no pueden agregar, editar ni eliminar sus donaciones, ni cambiar el nombre o la fecha del lote.

Para volver a hacer cambios, abra el lote y haga clic en **Reabrir lote**. Los lotes nuevos siempre empiezan abiertos.

:::info
Solo las personas con **Editar donaciones** ven los botones **Cerrar lote** y **Reabrir lote**. También pueden seguir modificando las donaciones de un lote cerrado si se necesita una corrección, sin tener que reabrirlo.
:::

## Quién puede modificar un lote

Dos [permisos de rol](../settings/roles-permissions.md) permiten a alguien trabajar con lotes:

- **Editar donaciones**: acceso completo: agregar y eliminar lotes, cerrarlos y reabrirlos, y agregar, editar o eliminar cualquier donación, esté el lote abierto o cerrado.
- **Registrar donaciones**: para equipos de conteo y voluntarios que registran las ofrendas. Pueden agregar lotes y agregar, editar o eliminar donaciones, pero solo mientras el lote esté abierto. No pueden eliminar lotes, cerrarlos ni reabrirlos, ni modificar los donativos recibidos a través de las donaciones en línea.

Alguien con **Registrar donaciones** pero sin **Ver resúmenes de donaciones** verá **Donaciones** en el menú de B1 Admin, que lo lleva directamente a la página de Lotes. **Resumen**, **Fondos**, **Campañas** y **Estados de cuenta de donaciones** permanecen ocultos para ellos. Para abrir un lote y ver las donaciones que contiene, el rol también necesita **Ver donaciones**.

:::tip
Una configuración común es un rol de "Equipo de conteo" con **Registrar donaciones** y **Ver donaciones**, y un tesorero con **Editar donaciones** que cierre cada lote una vez conciliado el depósito.
:::

## Imprimir un lote

Abra un lote y haga clic en **Imprimir** encima de la lista de donaciones para imprimir una copia en papel para su equipo de conteo o sus registros de depósito. La impresión incluye:

- El nombre de su iglesia, el nombre del lote y la fecha del lote
- Cada donación del lote, con el nombre del donante, el método, las notas, la fecha y el monto (los donativos reembolsados aparecen tachados y marcados como reembolsados)
- **Subtotales por fondo**: el total donado a cada fondo del lote
- **Total del lote**: el monto combinado de todo el lote

El botón **Imprimir** solo aparece cuando el lote tiene al menos una donación.

### Imprimir varios lotes a la vez

Para imprimir todos los lotes de un período de una sola vez, por ejemplo, todos los depósitos del mes pasado, haga clic en **Imprimir** en la parte superior de la página **Lotes**, junto a **Exportar**. Se abre la página **Imprimir lotes** con una **Fecha de inicio** y una **Fecha de fin** que por defecto abarcan los últimos 30 días. Cambie cualquiera de las dos fechas para elegir otro rango.

Cada lote con fecha dentro del rango (incluidas las fechas de inicio y fin) se imprime en orden cronológico, un lote por página, con el mismo diseño que una impresión de un solo lote. Los lotes sin donaciones se omiten, y si ninguno de los lotes del rango tiene donaciones, verá "No hay lotes con donaciones en este rango de fechas". Haga clic en **Imprimir** para abrir el cuadro de diálogo de impresión de su navegador, o en **Cerrar** para volver a la lista de lotes.

## Exportar un lote a QuickBooks Online

Abra un lote y haga clic en **Exportar para QuickBooks** para descargarlo como un asiento contable que QuickBooks Online puede importar (**Configuración > Importar datos > Asientos contables**). El archivo contiene un débito a **Fondos no depositados** por el total del lote y un crédito por cada fondo, usando el nombre de cada fondo como nombre de cuenta. QuickBooks le pide que relacione esos nombres con su plan de cuentas durante la importación, así que nombre sus fondos de la misma manera en que su contador nombra las cuentas de ingresos, o asígnelos una vez al importar.

:::tip
Nombre sus lotes de forma consistente para que sean fáciles de encontrar después. Incluir la fecha y el tipo de colecta (por ejemplo, "Domingo AM - 2025-02-09") mantiene su lista organizada a medida que crece.
:::

## Siguientes pasos

Una vez que tenga un lote, consulte [Registrar donaciones](recording-donations.md) para aprender a agregar donaciones individuales. También puede [importar transacciones de Stripe](stripe-import.md) para crear lotes automáticamente a partir de las donaciones en línea.
