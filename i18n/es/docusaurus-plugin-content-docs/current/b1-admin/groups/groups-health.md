---
title: "Salud de grupos"
description: "Revisa la salud de los grupos en B1 Admin con una tabla de 90 días: miembros, altas, bajas, abandono y asistencia media para detectar grupos a seguir."
---

# Salud de grupos

<div class="article-intro">

El panel de Salud de grupos le da una vista de pájaro de cómo están funcionando todos sus grupos; tendencias de membresía, promedios de asistencia y crecimiento o desgaste durante los últimos 90 días; todo en una tabla ordenable única.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita al menos algunos grupos con miembros para ver datos significativos. Vea [Creación de grupos](./creating-groups.md).
- Los datos de asistencia se extraen de sesiones registradas. Vea la sección [Asistencia](../attendance/index.md).

</div>

## Abrir Salud de grupos

En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda), expanda **People**, haga clic en **Groups** y luego haga clic en el botón **Group Health** en el encabezado de la página. El panel carga una tabla con una fila por grupo.

## Columnas

| Columna | Lo que muestra |
|--------|--------------|
| **Name** | El nombre del grupo, vinculado a la página de detalle del grupo |
| **Category** | La categoría del grupo |
| **Members** | Recuento actual de miembros activos |
| **Joined (90d)** | Miembros que se unieron en los últimos 90 días |
| **Left (90d)** | Miembros que se fueron en los últimos 90 días |
| **Churn (90d)** | Tasa de desgaste neto como porcentaje en 90 días |
| **Avg Attendance** | Recuento de asistencia promedio por sesión |

Haga clic en cualquier encabezado de columna para ordenar la tabla por esa columna. Haga clic nuevamente para invertir la dirección de ordenamiento.

## Usar datos de salud

- **Churn alto + uniones bajas** — un grupo que se está reduciendo y no está reemplazando miembros perdidos. Vale la pena una conversación con el líder del grupo.
- **Uniones altas + asistencia baja** — las personas se están inscribiendo pero no se presentan. Considere seguimiento de participación.
- **Asistencia promedio alta** — un grupo saludable y activo. Modelo potencial para otros grupos.

:::tip
Hacer clic en un nombre de grupo lo lleva directamente a la página de detalle del grupo donde puede revisar miembros individuales, registros de asistencia y eventos del calendario.
:::

## Artículos relacionados

- [Creación de grupos](./creating-groups.md) — configurar grupos
- [Miembros del grupo](./group-members.md) — gestionar membresía de grupo
- [Seguimiento de asistencia](../attendance/tracking-attendance.md) — registrar sesiones de asistencia que alimentan este panel
