---
title: "Salud de los grupos"
description: "Revise la salud de los grupos en B1 Admin con una tabla de 90 días de miembros, altas, bajas, rotación y asistencia promedio, para detectar los grupos que necesitan seguimiento."
---

# Salud de los grupos

<div class="article-intro">

El panel de Salud de los grupos le ofrece una vista panorámica de cómo están todos sus grupos: tendencias de membresía, promedios de asistencia y crecimiento o pérdida durante los últimos 90 días, todo en una sola tabla ordenable.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita al menos unos cuantos grupos con miembros para ver datos significativos. Consulte [Crear grupos](./creating-groups.md).
- Los datos de asistencia se obtienen de las sesiones registradas. Consulte la sección de [Asistencia](../attendance/index.md).

</div>

## Abrir Salud de los grupos {#opening-groups-health}

En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), despliegue **Personas**, haga clic en **Grupos** y luego en el botón **Salud de grupos** en el encabezado de la página. El panel carga una tabla con una fila por grupo.

## Columnas {#columns}

| Columna | Qué muestra |
|--------|--------------|
| **Nombre** | El nombre del grupo, enlazado a la página de detalle del grupo |
| **Categoría** | La categoría del grupo |
| **Miembros** | Número actual de miembros activos |
| **Altas (90 d)** | Miembros que se unieron en los últimos 90 días |
| **Bajas (90 d)** | Miembros que se fueron en los últimos 90 días |
| **Rotación (90 d)** | Tasa de rotación neta como porcentaje en 90 días |
| **Asistencia prom.** | Conteo promedio de personas por sesión de asistencia, o "-" si no se ha registrado asistencia |
| **Edad prom.** | Edad promedio de los miembros con fecha de nacimiento registrada |
| **Mujeres** / **Hombres** | Cuántos miembros son mujeres y cuántos son hombres |

La tabla comienza ordenada por nombre. Haga clic en cualquier encabezado de columna para ordenar la tabla por esa columna. Haga clic de nuevo para invertir la dirección del orden. Haga clic en **Grupos** en la parte superior de la página para volver a la lista de Grupos.

## La salud de un grupo {#one-groups-health}

La página de cada grupo tiene una sección de **Salud** con un resumen de una línea (miembros, altas y bajas en los últimos 90 días). Haga clic en **Ver salud** para abrir la vista de salud del grupo: sus cifras de **Miembros**, **Altas (90 d)**, **Bajas (90 d)** y **Rotación (90 d)**, un gráfico de **Cambios de membresía (12 meses)**, un gráfico de **Tendencia de asistencia** para los grupos que registran asistencia, y gráficos de **Edad** y **Género** de sus miembros.

## Usar los datos de salud {#using-health-data}

- **Rotación alta + pocas altas**: un grupo que se encoge y no reemplaza a los miembros perdidos. Vale la pena conversar con el líder del grupo.
- **Muchas altas + poca asistencia**: las personas se inscriben pero no asisten. Considere un seguimiento de participación.
- **Asistencia promedio alta**: un grupo sano y activo. Puede servir de modelo para otros grupos.

:::tip
Al hacer clic en el nombre de un grupo, se va directamente a la página de detalle del grupo, donde puede revisar a los miembros individuales, los registros de asistencia y los eventos del calendario.
:::

## Artículos relacionados {#related-articles}

- [Crear grupos](./creating-groups.md): configure grupos
- [Miembros del grupo](./group-members.md): administre la membresía de los grupos
- [Seguimiento de asistencia](../attendance/tracking-attendance.md): registre las sesiones de asistencia que alimentan este panel
