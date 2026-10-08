---
title: "Lotes de Donaciones"
---

# Lotes de Donaciones

<div class="article-intro">

Los lotes agrupan tus donaciones juntas para un seguimiento y reconciliación más fácil. Un lote típico representa una única colección, como una ofrenda dominical o un evento especial. Usar lotes te ayuda a mantenerte organizado y hace que sea simple verificar que tus registros coincidan con los depósitos reales.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Asegúrate de haber [configurado tus fondos](funds.md) para que estén disponibles al registrar donaciones
- Necesitarás acceso a la sección **Donaciones** en B1 Admin

</div>

## La Página de Lotes

Cuando navegas a **Donaciones > Lotes**, verás una lista de todos tus lotes. Cada fila muestra:

- **Nombre** -- la etiqueta que diste al lote
- **Fecha** -- la fecha de la colección
- **Donaciones** -- el número de donaciones individuales en el lote
- **Total** -- el monto en dólares combinado

El encabezado en la parte superior muestra estadísticas de resumen incluyendo el número total de lotes, el número total de donaciones en todos los lotes y la cantidad total en dólares.

## Crear un Nuevo Lote

1. Haz clic en **Agregar Lote** en la parte superior de la página.
2. Ingresa un nombre descriptivo (p. ej., "Ofrenda Dominical - 9 de Febrero").
3. Selecciona la fecha de la colección.
4. Haz clic en **Guardar**.

Tu nuevo lote aparece en la lista, listo para que agregues donaciones.

## Trabajar con Lotes

- **Ver donaciones** -- haz clic en un nombre de lote para abrirlo y ver todas las donaciones individuales que contiene. Desde allí puedes agregar, editar o eliminar donaciones.
- **Editar detalles del lote** -- haz clic en el botón **Editar** en una fila de lote para cambiar su nombre o fecha.
- **Ordenar** -- usa los encabezados de columna para ordenar lotes por nombre o fecha.
- **Exportar** -- haz clic en **Exportar** para descargar tu lista de lotes como una hoja de cálculo (CSV).

## Imprimir un Lote

Abre un lote y haz clic en el icono **Imprimir** (impresora) en la parte superior de la lista de donaciones para imprimir una copia en papel para tu equipo de conteo o registros de depósito. La impresión incluye:

- El nombre de tu iglesia, el nombre del lote y la fecha del lote
- Cada donación en el lote, con el nombre del donante, método, notas, fecha y monto (los regalos reembolsados están tachados y marcados como reembolsados)
- **Subtotales por Fondo** -- el total donado a cada fondo en el lote
- **Total del Lote** -- la cantidad combinada para todo el lote

El icono Imprimir solo aparece una vez que el lote tiene al menos una donación.

### Imprimir Varios Lotes a la Vez

Para imprimir todos los lotes de un período de una sola vez, por ejemplo, todos los depósitos del mes pasado, haz clic en el icono **Imprimir** (impresora) en el encabezado de la lista **Lotes**, junto a **Exportar**. Se abre la página **Imprimir Lotes** con una **Fecha de Inicio** y una **Fecha de Fin** que por defecto abarcan los últimos 30 días. Cambia cualquiera de las dos fechas para elegir un rango diferente.

Cada lote con fecha dentro del rango (incluyendo las fechas de inicio y fin) se imprime en orden de fecha, un lote por página, con el mismo diseño que la impresión de un solo lote. Los lotes sin donaciones se omiten, y si ninguno de los lotes del rango tiene donaciones verás "No hay lotes con donaciones en este rango de fechas." Haz clic en **Imprimir** para abrir el cuadro de diálogo de impresión de tu navegador, o en **Cerrar** para volver a la lista de lotes.

## Exportar un Lote a QuickBooks Online

Abre un lote y haz clic en **Exportar para QuickBooks** para descargar el lote como un asiento de diario que QuickBooks Online puede importar (**Configuración > Importar Datos > Asientos de Diario**). El archivo contiene un débito a **Fondos Sin Depositar** por el total del lote y un crédito por fondo, usando el nombre de cada fondo como el nombre de la cuenta. QuickBooks te pide que hagas coincidir esos nombres con tu catálogo de cuentas durante la importación, así que nombra tus fondos de la manera que tu contador nombra las cuentas de ingresos, o asígnalos una vez en la importación.

:::tip
Nombra tus lotes consistentemente para que sean fáciles de encontrar más tarde. Incluir la fecha y tipo de colección (p. ej., "Domingo AM - 2025-02-09") mantiene tu lista organizada a medida que crece.
:::

## Próximos Pasos

Una vez que tengas un lote, consulta [Registro de Donaciones](recording-donations.md) para aprender cómo agregar donaciones individuales a él. También puedes [importar transacciones de Stripe](stripe-import.md) para crear lotes automáticamente a partir de donaciones en línea.
