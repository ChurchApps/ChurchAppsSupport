---
title: "Reportes de Donaciones"
---

# Reportes de Donaciones

<div class="article-intro">

B1 Admin le proporciona varias formas de ver y analizar los datos de donaciones de su iglesia. La página Resumen de Donaciones proporciona una descripción general visual con gráficos y filtros, mientras que la sección Reportes ofrece un Resumen de Donaciones más detallado. Use estas herramientas para rastrear tendencias de donaciones, prepararse para reuniones de junta, o reconciliar sus registros.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Asegúrese de que las donaciones hayan sido [registradas en lotes](recording-donations.md) o [importadas de Stripe](stripe-import.md)
- Verifique que sus [fondos](funds.md) estén configurados correctamente para que las donaciones se categoricen adecuadamente

</div>

## Panel de Control de Donaciones

El **Panel de Control de Donaciones** es lo primero que ve cuando abre la sección **Donaciones**. Proporciona una vista de alto nivel de su actividad de donaciones con indicadores clave de desempeño.

1. Abra el **menú de sección** en la esquina superior izquierda y elija **Donaciones** para abrir el panel.
2. En la parte superior, cuatro **tarjetas KPI** muestran sus métricas de donaciones de un vistazo:
   - **Total de Donaciones** -- La cantidad total donada en el período seleccionado.
   - **Donación Promedio** -- La cantidad de donación promedio.
   - **Donantes Únicos** -- El número de personas distintas que dieron.
   - **Total de Donaciones** -- El número total de donaciones individuales.
3. Use el **alternador de período** para cambiar entre vistas **Semanal**, **Mensual**, y **Trimestral**.
4. Debajo de los KPI, un gráfico muestra las tendencias de donaciones para el período seleccionado.
5. Haga clic en **Descargar** para exportar un archivo CSV con totales de donaciones.

## Página Resumen de Donaciones

La página **Resumen** proporciona datos de donaciones agregados más detallados.

1. Abra el **menú de sección** en la esquina superior izquierda y elija **Donaciones** para abrir la página Resumen.
2. Use el **filtro de rango de fechas** para seleccionar el período de tiempo que desea revisar. Establezca la fecha anterior en la parte superior y la fecha más reciente en la parte inferior.
3. La página muestra un gráfico de donaciones semanal para que pueda ver tendencias de un vistazo.
4. Haga clic en **Descargar** para exportar un archivo CSV con la cantidad total dada, la semana en que se dio, y el fondo al que se dio.

:::info
La página Resumen muestra datos de donaciones agregados. No incluye nombres de donantes individuales. Para detalles a nivel de donante, use la página [Lotes](batches.md).
:::

## Viendo Detalles a Nivel de Donante

Para un desglose de quién dio, cuánto, y a qué fondo:

1. Navegue a **Donaciones > Lotes**.
2. Haga clic en un **nombre de lote** para abrirlo.
3. La página de detalles del lote enumera cada donación con el nombre del donante, cantidad, fondo, fecha, y método de pago.
4. Haga clic en el **nombre del donante** para ver un desglose de cuántas veces donó y cuánto cada vez.
5. Haga clic en un **ID de donación** para abrir un panel lateral con los detalles completos de esa donación individual.
6. Haga clic en **Descargar** para exportar un CSV con toda la información del donante y donación de ese lote.

## Reporte Resumen de Donaciones

El reporte de donaciones está integrado directamente en la sección Donaciones -- la página Resumen sirve como su reporte de resumen de donaciones:

1. Abra el **menú de sección** en la esquina superior izquierda y elija **Donaciones** para abrir la página Resumen.
2. Use el **filtro de rango de fechas** para seleccionar el período sobre el que desea reportar.
3. Haga clic en **Descargar** para exportar el reporte como un archivo CSV.

## Exportando Datos

Puede exportar datos de donaciones de múltiples lugares:

- **Página Resumen** -- descargue un CSV de totales de donaciones semanales por fondo
- **Página de detalles del lote** -- descargue un CSV de donaciones individuales con detalles del donante
- **Página de detalles del fondo** -- descargue historial de donaciones de un fondo específico

:::tip
Para reportes de fin de año, combine la exportación de la página Resumen con la herramienta [Declaraciones de Donaciones](giving-statements.md) para obtener tanto tendencias agregadas como declaraciones de donantes individuales.
:::

## Siguientes Pasos

- Genere [Declaraciones de Donaciones](giving-statements.md) para sus donantes a fin de año
- Revise [lotes](batches.md) individuales para verificar detalles de donaciones
- Consulte páginas de detalles de [fondos](funds.md) para desglose de donaciones por categoría
