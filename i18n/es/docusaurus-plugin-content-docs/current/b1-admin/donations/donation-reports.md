---
title: "Informes de donaciones"
---

# Informes de donaciones

<div class="article-intro">

B1 Admin le ofrece varias formas de ver y analizar los datos de donaciones de su iglesia. El panel de donaciones de la página **Resumen** de Donaciones ofrece una vista general visual con gráficos y filtros, mientras que la sección de Informes incluye un informe más detallado de Resumen de donaciones. Use estas herramientas para seguir las tendencias de las donaciones, preparar reuniones de la junta o conciliar sus registros.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Asegúrese de que las donaciones hayan sido [registradas en lotes](recording-donations.md) o [importadas desde Stripe](stripe-import.md)
- Verifique que sus [fondos](funds.md) estén configurados correctamente para que las donaciones se clasifiquen bien

</div>

## Panel de donaciones

El panel de donaciones es la vista **Panel** de la página **Resumen**, la primera página que ve al abrir la sección **Donaciones**.

1. Abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda de B1 Admin), expanda **Donaciones** y haga clic en **Resumen**. La página **Resumen** se abre en la vista **Panel**. El botón **Vista** en la parte superior derecha alterna entre **Panel** y **Donantes inactivos**.
2. Use los botones **Semanal**, **Mensual** y **Trimestral** encima del informe para elegir cómo se agrupan las donaciones.
3. En el panel **Filtrar informe**, configure la **Fecha de inicio** y la **Fecha de fin** (por defecto, desde hace un año hasta ayer) y, opcionalmente, elija un **Fondo**, luego haga clic en **Ejecutar informe**. El informe se ejecuta automáticamente con los valores predeterminados al abrir la página.
4. Cuatro **tarjetas de indicadores clave** muestran sus métricas de donaciones para el rango seleccionado:
   - **Total donado**: el monto total donado.
   - **Donativo promedio**: el monto promedio de las donaciones.
   - **Donantes únicos**: el número de personas distintas que dieron.
   - **Total de donaciones**: el número total de donaciones individuales.
5. Debajo de los indicadores, un gráfico de barras muestra las donaciones por semana, mes o trimestre, desglosadas por fondo.
6. Haga clic en **Opciones de descarga** y elija **Resumen** para exportar un CSV con los totales por período y fondo, o haga clic en el ícono de impresión para imprimir el informe. El logotipo de su iglesia (el **Logotipo para fondo claro** de [Sitio web > Apariencia](../website/appearance.md), si lo ha subido) y su nombre aparecen centrados en la parte superior del informe impreso. La impresión usa texto oscuro y un gráfico claro, incluso si usa B1 Admin en modo oscuro.

Si las donaciones del período se hicieron en más de una moneda, los totales de los indicadores se convierten a la moneda de su iglesia y aparece una nota **Convertido a los tipos de cambio actuales** debajo de las tarjetas. Consulte [Compatibilidad con múltiples monedas](./multi-currency.md#converted-totals) para más detalles.

:::info
El panel muestra datos de donación agregados. No incluye nombres de donantes individuales. Para detalles a nivel de donante, use la página de [Lotes](batches.md).
:::

## Donantes inactivos

Elija **Donantes inactivos** en el botón **Vista** para ver una lista de personas que donaron en un período pero no desde entonces. Por defecto, compara el año calendario anterior con el año hasta la fecha; cambie cualquiera de los rangos de fechas para ampliar o reducir la búsqueda. Cada fila muestra la persona, la fecha de su último donativo y su total del período anterior, y **Opciones de descarga > Resumen** descarga la lista como CSV para una lista de correo o de llamadas de seguimiento.

## Ver detalles a nivel de donante

Para un desglose de quién dio, cuánto y a qué fondo:

1. Navegue a **Donaciones > Lotes**.
2. Haga clic en el **nombre de un lote** para abrirlo.
3. La página de detalle del lote enumera cada donación con su método (y el número de cheque o los últimos dígitos de la tarjeta), el nombre del donante, la fecha, las notas y el monto, con un total al final.
4. Haga clic en **Editar** en la fila de una donación para abrir los detalles completos de esa donación individual, incluido su fondo.
5. Haga clic en **Exportar** encima de la lista para descargar un CSV con toda la información de donantes y donaciones de ese lote.

## Informe de resumen de donaciones

Los informes de donaciones están integrados directamente en la sección de Donaciones: la página Resumen sirve como su informe de resumen de donaciones:

1. En el menú Jump, elija **Donaciones > Resumen**.
2. En la vista **Panel**, configure la **Fecha de inicio** y la **Fecha de fin** en el panel **Filtrar informe** y haga clic en **Ejecutar informe**.
3. Haga clic en **Opciones de descarga** y elija **Resumen** para exportar el informe como archivo CSV.

## Exportar datos

Puede exportar datos de donaciones desde varios lugares:

- **Página de resumen**: descargue un CSV de los totales de donaciones por semana, mes o trimestre y fondo
- **Página de detalle del lote**: descargue un CSV de las donaciones individuales con los detalles del donante
- **Página de detalle del fondo**: descargue el historial de donaciones de un fondo específico

:::tip
Para los informes de fin de año, combine la exportación de la página de Resumen con la herramienta de [Estados de cuenta de donaciones](giving-statements.md) para obtener tanto las tendencias agregadas como los estados de cuenta individuales de cada donante.
:::

## Siguientes pasos

- Genere los [Estados de cuenta de donaciones](giving-statements.md) para sus donantes al final del año
- Revise los [lotes](batches.md) individuales para verificar los detalles de las donaciones
- Consulte las páginas de detalle de [fondos](funds.md) para ver los desgloses de donaciones por categoría
