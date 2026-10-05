---
title: "Reportes de Donaciones"
---

# Reportes de Donaciones

<div class="article-intro">

B1 Admin te brinda varias formas de ver y analizar los datos de donación de tu iglesia. El panel de donaciones en la página de **Resumen** de Donaciones proporciona una descripción general visual con gráficos y filtros, mientras que la sección de Reportes ofrece un informe más detallado de Resumen de Donaciones. Usa estas herramientas para rastrear tendencias de donación, prepararte para reuniones de la junta o reconciliar tus registros.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Asegúrate de que las donaciones han sido [registradas en lotes](recording-donations.md) o [importadas desde Stripe](stripe-import.md)
- Verifica que tus [fondos](funds.md) están configurados correctamente para que las donaciones sean categorizadas apropiadamente

</div>

## Panel de Donaciones

El panel de donaciones es la pestaña **Panel** de la página de **Resumen**, la primera página que ves cuando abres la sección **Donaciones**.

1. Abre el [menú Salto](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda de B1 Admin), expande **Donaciones**, y haz clic en **Resumen**. La página de **Resumen** se abre en la pestaña **Panel**.
2. Usa el botón **Semanal**, **Mensual** y **Trimestral** sobre el informe para elegir cómo se agrupan las donaciones.
3. En el panel **Filtrar Informe**, establece la **Fecha de Inicio** y **Fecha de Fin** (por defecto, el año pasado hasta ayer) y opcionalmente elige un **Fondo**, luego haz clic en **Ejecutar Informe**. El informe se ejecuta automáticamente con los valores predeterminados cuando la página se abre.
4. Cuatro **tarjetas KPI** muestran tus métricas de donación para el rango seleccionado:
   - **Donación Total** -- La cantidad total donada.
   - **Donación Promedio** -- La cantidad promedio de donación.
   - **Donantes Únicos** -- El número de personas distintas que dieron.
   - **Donaciones Totales** -- El número total de donaciones individuales.
5. Debajo de los KPIs, un gráfico de barras muestra donaciones por semana, mes o trimestre, desglosadas por fondo.
6. Haz clic en **Opciones de Descarga** y elige **Resumen** para exportar un CSV de los totales por período y fondo, o haz clic en el icono de impresión para imprimir el informe. El nombre de tu iglesia aparece en la parte superior del informe impreso.

Si las donaciones en el período fueron dadas en más de una moneda, los totales de KPI se convierten a tu moneda de iglesia y aparece una nota de **Convertido a tipos de cambio actuales** debajo de las tarjetas. Consulta [Soporte Multimoneda](./multi-currency.md#converted-totals) para más detalles.

:::info
El panel muestra datos de donación agregada. No incluye nombres de donantes individuales. Para detalles a nivel de donante, usa la página [Lotes](batches.md).
:::

## Donantes Inactivos

La pestaña **Donantes Inactivos** junto a la pestaña **Panel** enumera personas que dieron durante un período pero no desde entonces. Por defecto compara el año calendario pasado con este año hasta la fecha; cambia cualquier rango de fechas para ampliar o reducir la búsqueda. Cada fila muestra la persona, la fecha de su último regalo y su total para el período anterior, y **Opciones de Descarga > Resumen** descarga la lista como un CSV para una campaña de seguimiento o lista de llamadas.

## Ver Detalles a Nivel de Donante

Para un desglose de quién dio, cuánto y a qué fondo:

1. Navega a **Donaciones > Lotes**.
2. Haz clic en un **nombre de lote** para abrirlo.
3. La página de detalle de lote enumera cada donación con el nombre del donante, cantidad, fondo, fecha y método de pago.
4. Haz clic en el **nombre de un donante** para ver un desglose de cuántas veces donaron y cuánto cada vez.
5. Haz clic en una **ID de donación** para abrir un panel lateral con los detalles completos de esa donación individual.
6. Haz clic en **Descargar** para exportar un CSV con toda la información de donante y donación para ese lote.

## Informe de Resumen de Donaciones

Los reportes de donación están integrados directamente en la sección Donaciones -- la página Resumen sirve como tu informe de resumen de donaciones:

1. En el menú Salto, elige **Donaciones > Resumen**.
2. En la pestaña **Panel**, establece la **Fecha de Inicio** y **Fecha de Fin** en el panel **Filtrar Informe** y haz clic en **Ejecutar Informe**.
3. Haz clic en **Opciones de Descarga** y elige **Resumen** para exportar el informe como un archivo CSV.

## Exportar Datos

Puedes exportar datos de donación desde múltiples lugares:

- **Página Resumen** -- descarga un CSV de totales de donación por semana, mes o trimestre y fondo
- **Página de detalle de lote** -- descarga un CSV de donaciones individuales con detalles del donante
- **Página de detalle de fondos** -- descarga el historial de donaciones para un fondo específico

:::tip
Para reporte de fin de año, combina la exportación de la página Resumen con la herramienta [Estados de Contribuciones](giving-statements.md) para obtener tanto tendencias agregadas como estados de donante individual.
:::

## Próximos Pasos

- Genera [Estados de Contribuciones](giving-statements.md) para tus donantes al final del año
- Revisa [lotes](batches.md) individuales para verificar detalles de donación
- Verifica páginas de detalle de [fondos](funds.md) para desglose de donaciones por categoría
