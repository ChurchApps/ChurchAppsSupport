---
title: "Reportes de Donaciones"
---

# Reportes de Donaciones

<div class="article-intro">

B1 Admin te da varias formas de ver y analizar los datos de donaciones de tu iglesia. La página Resumen de Donaciones proporciona una descripción visual con gráficos y filtros, mientras que la sección Reportes ofrece un reporte más detallado de Resumen de Donaciones. Usa estas herramientas para rastrear tendencias de donaciones, prepararte para reuniones de junta, o reconciliar tus registros.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Asegúrate de que las donaciones han sido [registradas en lotes](recording-donations.md) o [importadas desde Stripe](stripe-import.md)
- Verifica que tus [fondos](funds.md) estén configurados correctamente para que las donaciones se categoricen adecuadamente

</div>

## Panel de Donaciones

El **Panel de Donaciones** es lo primero que ves cuando abres la sección de **Donaciones**. Proporciona una vista de alto nivel de tu actividad de donaciones con indicadores clave de desempeño.

1. Abre el **menú de sección** en la esquina superior izquierda y elige **Donaciones** para abrir el panel.
2. En la parte superior, cuatro **tarjetas KPI** muestran tus métricas de donaciones de un vistazo:
   - **Donación Total** -- La cantidad total donada en el período seleccionado.
   - **Donación Promedio** -- La cantidad de donación promedio.
   - **Donantes Únicos** -- El número de personas distintas que dieron.
   - **Total de Donaciones** -- El número total de registros de donaciones individuales.
3. Usa el **alternador de período** para cambiar entre vistas **Semanal**, **Mensual** y **Trimestral**.
4. Debajo de los KPI, un gráfico muestra tendencias de donaciones para el período seleccionado.
5. Haz clic en **Descargar** para exportar un archivo CSV con totales de donaciones.

## Página Resumen de Donaciones

La página **Resumen** proporciona datos de donaciones agregadas más detallados.

1. Abre el **menú de sección** en la esquina superior izquierda y elige **Donaciones** para abrir la página de Resumen.
2. Usa el **filtro de rango de fechas** para seleccionar el período de tiempo que deseas revisar. Establece la fecha anterior en la parte superior y la fecha más reciente en la parte inferior.
3. La página muestra un gráfico de donaciones semanales para que veas tendencias de un vistazo.
4. Haz clic en **Descargar** para exportar un archivo CSV con la cantidad total donada, la semana en que se donó, y el fondo al que se donó.

:::info
La página de Resumen muestra datos de donaciones agregados. No incluye nombres de donantes individuales. Para detalles a nivel de donante, usa la página [Lotes](batches.md).
:::

## Ver Detalles a Nivel de Donante

Para un desglose de quién donó, cuánto, y a qué fondo:

1. Navega a **Donaciones > Lotes**.
2. Haz clic en un **nombre de lote** para abrirlo.
3. La página de detalle del lote lista cada donación con el nombre del donante, cantidad, fondo, fecha y método de pago.
4. Haz clic en el **nombre de un donante** para ver un desglose de cuántas veces donaron y cuánto cada vez.
5. Haz clic en una **ID de donación** para abrir un panel lateral con los detalles completos de esa donación individual.
6. Haz clic en **Descargar** para exportar un CSV con toda la información de donante y donación para ese lote.

## Reporte de Resumen de Donaciones

El reporte de donaciones está integrado directamente en la sección de Donaciones -- la página de Resumen sirve como tu reporte de resumen de donaciones:

1. Abre el **menú de sección** en la esquina superior izquierda y elige **Donaciones** para abrir la página de Resumen.
2. Usa el **filtro de rango de fechas** para seleccionar el período que deseas reportar.
3. Haz clic en **Descargar** para exportar el reporte como un archivo CSV.

## Exportar Datos

Puedes exportar datos de donaciones desde múltiples lugares:

- **Página de resumen** -- descarga un CSV de totales de donaciones semanales por fondo
- **Página de detalle de lote** -- descarga un CSV de donaciones individuales con detalles de donante
- **Página de detalle de fondo** -- descarga el historial de donaciones para un fondo específico

:::tip
Para reportes de fin de año, combina la exportación de la página de Resumen con la herramienta [Declaraciones de Donaciones](giving-statements.md) para obtener tanto tendencias agregadas como declaraciones de donantes individuales.
:::

## Próximos Pasos

- Genera [Declaraciones de Donaciones](giving-statements.md) para tus donantes al final del año
- Revisa [lotes](batches.md) individuales para verificar detalles de donación
- Verifica páginas de detalle de [fondo](funds.md) para desglose de donaciones por categoría
