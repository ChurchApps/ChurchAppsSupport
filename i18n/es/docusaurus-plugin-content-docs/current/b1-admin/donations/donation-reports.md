---
title: "Informes de donaciones"
description: "Revise los totales de donaciones, los donantes inactivos y los detalles a nivel de lote en B1 Admin con el panel de Resumen de donaciones, la vista de Donantes inactivos y las exportaciones en CSV."
---

# Informes de donaciones

<div class="article-intro">

B1 Admin le ofrece varias formas de ver y analizar los datos de donaciones de su iglesia. El panel de donaciones en la página de **Resumen** de Donaciones proporciona una vista general visual con gráficos y filtros, mientras que la sección de Informes ofrece un informe de Resumen de donaciones más detallado. Use estas herramientas para dar seguimiento a las tendencias de donación, preparar las reuniones de la junta o conciliar sus registros.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Asegúrese de que las donaciones se hayan [registrado en lotes](recording-donations.md) o [importado desde Stripe](stripe-import.md)
- Verifique que sus [fondos](funds.md) estén configurados correctamente para que las donaciones se clasifiquen bien

</div>

## Panel de donaciones {#giving-dashboard}

El panel de donaciones es la vista **Panel** de la página **Resumen**, la primera página que ve al abrir la sección **Donaciones**.

1. Abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda de B1 Admin), despliegue **Donaciones** y haga clic en **Resumen**. La página **Resumen** se abre en la vista **Panel**. El conmutador **Vista** en la parte superior derecha cambia entre **Panel** y **Donantes inactivos**.
2. Use el conmutador **Semanal**, **Mensual** y **Trimestral** encima del informe para elegir cómo se agrupan las donaciones.
3. En el panel **Filtrar informe**, establezca la **Fecha de inicio** y la **Fecha de fin** (por defecto, desde hace un año hasta ayer) y opcionalmente elija un **Fondo**, luego haga clic en **Ejecutar informe**. El informe se ejecuta automáticamente con los valores predeterminados cuando se abre la página.
4. Cuatro **tarjetas de indicadores clave** muestran sus métricas de donación para el rango seleccionado:
   - **Donación total**: el monto total donado.
   - **Donativo promedio**: el monto promedio de las donaciones.
   - **Donantes únicos**: el número de personas distintas que donaron.
   - **Donaciones totales**: el número total de donaciones individuales.
5. Debajo de los indicadores, un gráfico de barras muestra las donaciones por semana, mes o trimestre, desglosadas por fondo.
6. Haga clic en **Opciones de descarga** y elija **Resumen** para exportar un CSV con los totales por periodo y fondo, o haga clic en el icono de impresión para imprimir el informe. El logotipo de su iglesia (el **Logotipo para fondo claro** de [Sitio web > Apariencia](../website/appearance.md), si ha subido uno) y su nombre aparecen centrados en la parte superior del informe impreso. La impresión usa texto oscuro y un gráfico claro, incluso si usa B1 Admin en modo oscuro.

Si las donaciones del periodo se hicieron en más de una moneda, los totales de los indicadores se convierten a la moneda de su iglesia y aparece una nota **Convertido a los tipos de cambio actuales** debajo de las tarjetas. Consulte [Compatibilidad con múltiples monedas](./multi-currency.md#converted-totals) para más detalles.

:::info
El panel muestra datos de donación agregados. No incluye los nombres individuales de los donantes. Para ver detalles a nivel de donante, use la página de [Lotes](batches.md).
:::

## Donantes inactivos {#lapsed-givers}

Elija **Donantes inactivos** en el conmutador **Vista** para enumerar a las personas que donaron durante un periodo pero no desde entonces. Por defecto, compara el año calendario anterior con lo que va de este año; cambie el **Inicio del periodo anterior**, el **Fin del periodo anterior**, el **Inicio del periodo actual** o el **Fin del periodo actual** en el panel **Filtrar informe** y haga clic en **Ejecutar informe** para ampliar o reducir la búsqueda. Esta vista requiere el permiso **Ver donaciones**. Cada fila muestra la persona, la fecha de su última donación y su total del periodo anterior, y **Opciones de descarga > Resumen** descarga la lista como CSV para una lista de correo o de llamadas de seguimiento.

## Ver detalles a nivel de donante {#viewing-donor-level-details}

Para ver un desglose de quién donó, cuánto y a qué fondo:

1. Vaya a **Donaciones > Lotes**.
2. Haga clic en un **nombre de lote** para abrirlo.
3. La página de detalle del lote enumera cada donación con su método (y el número de cheque o los últimos dígitos de la tarjeta), el nombre del donante, la fecha, las notas y el monto, con un total al final.
4. Haga clic en **Editar** en una fila de donación para abrir los detalles completos de esa donación individual, incluido su fondo.
5. Haga clic en **Exportar** encima de la lista para descargar un CSV con toda la información de donantes y donaciones de ese lote.

## Informe de resumen de donaciones {#donation-summary-report}

Los informes de donaciones están integrados directamente en la sección de Donaciones: la página de Resumen funciona como su informe de resumen de donaciones:

1. En el menú Jump, elija **Donaciones > Resumen**.
2. En la vista **Panel**, establezca la **Fecha de inicio** y la **Fecha de fin** en el panel **Filtrar informe** y haga clic en **Ejecutar informe**.
3. Haga clic en **Opciones de descarga** y elija **Resumen** para exportar el informe como un archivo CSV.

## Exportar datos {#exporting-data}

Puede exportar datos de donaciones desde varios lugares:

- **Página de Resumen**: descargue un CSV con los totales de donación por semana, mes o trimestre y fondo
- **Página de detalle del lote**: descargue un CSV con las donaciones individuales y los datos del donante
- **Página de detalle de fondos**: descargue el historial de donaciones de un fondo específico

:::tip
Para los informes de fin de año, combine la exportación de la página de Resumen con la herramienta de [Estados de donación](giving-statements.md) para obtener tanto las tendencias agregadas como los estados individuales de cada donante.
:::

## Próximos pasos {#next-steps}

- Genere los [Estados de donación](giving-statements.md) para sus donantes al final del año
- Revise los [lotes](batches.md) individuales para verificar los detalles de las donaciones
- Consulte las páginas de detalle de cada [fondo](funds.md) para ver los desgloses de donaciones por categoría
