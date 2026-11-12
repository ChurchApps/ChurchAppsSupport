---
title: "Seguimiento de asistencia"
description: "Revise las tendencias de asistencia, filtre los informes por campus, servicio o grupo, y exporte la asistencia de grupos desde la página de Asistencia en B1 Admin."
---

# Seguimiento de asistencia

<div class="article-intro">

Una vez configurados sus campus, horarios de servicio y grupos, B1 Admin le facilita revisar los datos de asistencia y detectar tendencias. La página de Asistencia se abre con un resumen de la asistencia de esta semana, y sus informes de **Todos los años** ofrecen dos vistas principales: la pestaña **Tendencia de asistencia** para las tendencias de toda la iglesia y la pestaña **Asistencia por grupo** para el detalle por grupo, además de una pestaña de **Tendencia de conteo total** para los [totales de conteo](headcount-entry.md). Use estas herramientas para entender los patrones de crecimiento, identificar una participación en descenso y tomar decisiones basadas en datos para su iglesia.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Su estructura de asistencia debe estar configurada con al menos un campus y un horario de servicio. Consulte [Configuración de asistencia](setup.md) si aún no lo ha hecho.
- Los datos de asistencia deben estar registrados antes de que los informes muestren resultados. Los datos pueden provenir del [registro manual](recording-attendance.md) o del [autoservicio de registro de entrada](check-in.md).

</div>

## Ver las tendencias de asistencia {#viewing-attendance-trends}

1. Abra **B1 Admin**, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), despliegue **Personas** y haga clic en **Asistencia**.
2. Haga clic en **Todos los años** en la columna izquierda. La pestaña **Tendencia de asistencia** está seleccionada de forma predeterminada.
3. El informe se ejecuta automáticamente al abrir la pestaña y muestra la asistencia total de cada semana.

:::tip
Para una vista rápida de la semana actual, la página principal de Asistencia muestra cuántas personas están en la sala esta semana, un desglose por sala (grupo), los invitados y un gráfico de barras de 13 semanas de registros, sin necesidad de un informe.
:::

## Filtrar sus datos {#filtering-your-data}

Use los filtros del cuadro **Filtrar informe** para reducir los resultados y luego haga clic en **Ejecutar informe**:

- **Campus**: seleccione un campus para ver la asistencia solo de esa ubicación.
- **Servicio**: limite el informe a un servicio.
- **Horario de servicio**: elija un horario de servicio para ver una reunión en particular.
- **Grupo**: muestre la asistencia de un solo grupo.
- **Fecha de inicio** y **Fecha de fin**: el rango de fechas a incluir. Por defecto, el informe abarca el último año, desde hace un año hasta hoy, e incluye la fecha de fin completa.

El informe muestra un gráfico de barras y una tabla con el total de visitas por semana. Use el icono de impresión para imprimirlo, o **Opciones de descarga** para guardar los datos. Cada semana se identifica con la fecha del domingo de esa semana. La tabla también tiene una columna **Fechas de sesión** que enumera las fechas reales de esa semana que tuvieron asistencia (por ejemplo, "9/27, 9/30"), para que pueda ver cuándo una reunión entre semana se cuenta en la misma semana que el domingo.

:::info
Los informes se ejecutan automáticamente cada vez que abre la pestaña Tendencia de asistencia, así que siempre verá cifras actualizadas sin necesidad de hacer clic en un botón de actualizar.
:::

## Asistencia por grupo {#group-attendance}

La pestaña **Asistencia por grupo** muestra quién asistió a cada sesión de grupo. Es útil cuando quiere seguir una clase, un equipo de ministerio o un grupo pequeño específico en lugar de mirar las cifras generales de los servicios.

1. En los informes de **Todos los años**, seleccione la pestaña **Asistencia por grupo**.
2. Opcionalmente, elija un **Campus** y un **Servicio**.
3. Establezca la **Fecha de inicio** y la **Fecha de fin**. Por defecto, el informe abarca desde el último domingo hasta hoy.
4. Haga clic en **Ejecutar informe**.

Los resultados se agrupan por fecha de sesión, luego por horario de servicio y grupo, con las personas que asistieron listadas bajo cada grupo. Los horarios de servicio, grupos y nombres se ordenan alfabéticamente para que cada encabezado aparezca una sola vez. La fila de cada persona también muestra una columna **Registrado** con la hora en que se registró su asistencia (en blanco cuando no hay hora guardada) y una columna **Estado de membresía** (por ejemplo, Miembro o Visitante), para que pueda identificar a los invitados de un vistazo.

Para descargar los datos, haga clic en **Opciones de descarga** y elija **Resumen**. El archivo CSV tiene una fila por cada miembro del grupo, ordenada por grupo y luego por nombre, y una columna por cada sesión con fecha en el rango (por ejemplo, "Domingo - 9:00 AM (2026-09-27)") marcada como **presente** o **ausente**.

:::tip
La asistencia por grupo es especialmente valiosa para los líderes de [grupos pequeños](../groups/creating-groups.md) que quieren seguir la participación dentro de su grupo a lo largo del tiempo.
:::

## Consejos para usar los datos de asistencia {#tips-for-using-attendance-data}

- Revise las tendencias mensualmente para detectar patrones estacionales a tiempo.
- Compare los datos a nivel de campus para entender qué ubicaciones están creciendo.
- Use los informes a nivel de grupo para dar seguimiento a los [grupos](../groups/group-members.md) cuya asistencia está disminuyendo.
- Combine los datos de asistencia con la herramienta de [Búsqueda con IA](../people/ai-search.md) para encontrar personas que no han asistido recientemente.

## Páginas relacionadas {#related-pages}

- [Registrar asistencia](recording-attendance.md): introduzca manualmente la asistencia de una sesión de grupo
- [Registro de conteo total y tendencia](headcount-entry.md): una alternativa más simple de conteo total, con su propio gráfico de tendencia semanal
- [Registro de entrada](check-in.md): configure el autoservicio de registro para que la asistencia se registre automáticamente
