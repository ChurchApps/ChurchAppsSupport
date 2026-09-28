---
title: "Reportes de Donaciones"
---

# Reportes de Donaciones

<div class="article-intro">

B1 Admin te brinda varias formas de ver y analizar los datos de ofrendas de tu iglesia. La página Resumen de Donaciones proporciona una descripción visual con gráficas y filtros, mientras que la sección Reportes ofrece un reporte Resumen de Donaciones más detallado. Usa estas herramientas para rastrear tendencias de ofrendas, prepararte para reuniones de junta o reconciliar tus registros.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Asegúrate de que las donaciones hayan sido [registradas en lotes](recording-donations.md) o [importadas desde Stripe](stripe-import.md)
- Verifica que tus [fondos](funds.md) estén configurados correctamente para que las donaciones se categoricen adecuadamente

</div>

## Panel de Control de Ofrendas

El **Panel de Control de Ofrendas** es lo primero que ves cuando abres la sección de **Donaciones**. Proporciona una vista de alto nivel de tu actividad de ofrendas con indicadores clave de desempeño.

1. Abre el **menú de sección** en la esquina superior izquierda y elige **Donaciones** para abrir el panel de control.
2. En la parte superior, cuatro **tarjetas de KPI** muestran tus métricas de ofrendas de un vistazo:
   - **Ofrendas Totales** -- La cantidad total donada en el período seleccionado.
   - **Promedio de Ofrenda** -- La cantidad de donación promedio.
   - **Donantes Únicos** -- El número de personas distintas que dieron.
   - **Donaciones Totales** -- El número total de donaciones individuales.
3. Usa el **alternador de período** para cambiar entre vistas **Semanal**, **Mensual** y **Trimestral**.
4. Debajo de los KPIs, una gráfica muestra las tendencias de ofrendas para el período seleccionado.
5. Haz clic en **Descargar** para exportar un archivo CSV con los totales de ofrendas.

Si las donaciones en el período fueron dadas en más de una moneda, los totales de KPI se convierten a tu moneda de iglesia y aparece una nota de **Convertido a tipos de cambio actuales** debajo de las tarjetas. Consulta [Soporte Multimoneda](./multi-currency.md#converted-totals) para obtener detalles.

## Donantes Inactivos

La pestaña **Donantes Inactivos** al lado del panel de control lista a las personas que dieron durante un período pero no desde entonces. Por defecto compara el año calendario pasado con este año hasta la fecha; cambia cualquiera de los rangos de fechas para ampliar o limitar la búsqueda. Cada fila muestra a la persona, la fecha de su última ofrenda y su total para el período anterior, y **Exportar** descarga la lista como CSV para una campaña de seguimiento o lista de llamadas.

## Página Resumen de Donaciones

La página **Resumen** proporciona datos de ofrendas agregadas más detallados.

1. Abre el **menú de sección** en la esquina superior izquierda y elige **Donaciones** para abrir la página de Resumen.
2. Usa el **filtro de rango de fechas** para seleccionar el período de tiempo que deseas revisar. Establece la fecha anterior arriba y la fecha más reciente abajo.
3. La página muestra una gráfica de ofrendas semanales para que puedas ver tendencias de un vistazo.
4. Haz clic en **Descargar** para exportar un archivo CSV con la cantidad total dada, la semana en que fue dada y el fondo al que fue dada.

:::info
La página Resumen muestra datos de ofrendas agregadas. No incluye nombres individuales de donantes. Para detalles a nivel de donante, usa la página de [Lotes](batches.md).
:::

## Viendo Detalles a Nivel de Donante

Para un desglose de quién dio, cuánto y a qué fondo:

1. Ve a **Donaciones > Lotes**.
2. Haz clic en un **nombre de lote** para abrirlo.
3. La página de detalles del lote lista cada donación con el nombre del donante, cantidad, fondo, fecha y método de pago.
4. Haz clic en el **nombre de un donante** para ver un desglose de cuántas veces donaron y cuánto cada vez.
5. Haz clic en un **ID de donación** para abrir un panel lateral con los detalles completos de esa donación individual.
6. Haz clic en **Descargar** para exportar un CSV con toda la información de donante y donación de ese lote.

## Reporte de Resumen de Donaciones

Los reportes de donaciones se construyen directamente en la sección de Donaciones -- la página Resumen sirve como tu reporte de resumen de donaciones:

1. Abre el **menú de sección** en la esquina superior izquierda y elige **Donaciones** para abrir la página de Resumen.
2. Usa el **filtro de rango de fechas** para seleccionar el período que deseas reportar.
3. Haz clic en **Descargar** para exportar el reporte como un archivo CSV.

## Exportando Datos

Puedes exportar datos de donaciones desde múltiples lugares:

- **Página de Resumen** -- descarga un CSV de totales de ofrendas semanales por fondo
- **Página de detalles del lote** -- descarga un CSV de donaciones individuales con detalles del donante
- **Página de detalles de fondos** -- descarga el historial de donaciones para un fondo específico

:::tip
Para reportes de fin de año, combina la exportación de la página de Resumen con la herramienta de [Declaraciones de Ofrendas](giving-statements.md) para obtener tanto tendencias agregadas como declaraciones de donantes individuales.
:::

## Próximos Pasos

- Genera [Declaraciones de Ofrendas](giving-statements.md) para tus donantes al final del año
- Revisa [lotes](batches.md) individuales para verificar detalles de donaciones
- Verifica páginas de detalles de [fondos](funds.md) para desgloces de ofrendas por categoría
