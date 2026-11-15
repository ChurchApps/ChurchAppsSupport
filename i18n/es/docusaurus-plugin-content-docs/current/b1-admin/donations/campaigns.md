---
title: "Campañas y promesas"
description: "Cree campañas de recaudación en B1 Admin, registre las promesas de donación de los miembros y dé seguimiento al progreso hacia una meta frente a las donaciones reales de cada fondo."
---

# Campañas y promesas

<div class="article-intro">

Las campañas le permiten llevar a cabo una colecta de fondos hacia una meta específica, como un fondo para un edificio, un viaje misionero o un proyecto especial, y dar seguimiento a las promesas de los miembros junto con las donaciones reales para ver su progreso en tiempo real.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configure sus [fondos de donación](./funds.md): cada campaña está vinculada a un fondo
- Necesita el permiso **Ver resúmenes de donaciones** para ver las campañas, y **Editar donaciones** para añadir o cambiar campañas y promesas

</div>

## Abrir Campañas {#opening-campaigns}

En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), despliegue **Donaciones** y haga clic en **Campañas**. Verá una tabla con todas las campañas, su fondo, fechas, monto de la meta, total prometido y total donado hasta la fecha. Una línea de resumen encima de la tabla muestra el número de campañas y los montos combinados prometidos y donados.

## Crear una campaña {#creating-a-campaign}

1. Haga clic en **Añadir campaña** en la parte superior de la página.
2. Complete los detalles de la campaña:
   - **Nombre** *(obligatorio)*: el nombre visible de esta campaña (por ejemplo, "Fondo para el edificio 2026").
   - **Fondo** *(obligatorio)*: el fondo de donación al que está asociada esta campaña.
   - **Monto de la meta** *(opcional)*: el monto objetivo de la campaña. Sin meta, la campaña no muestra barra de progreso.
   - **Fecha de inicio** *(obligatoria, comienza hoy)* y **Fecha de fin** *(opcional)*: el periodo de recaudación. Sin fecha de fin, la campaña aparece como **En curso**.
   - **Descripción**: una breve descripción de la campaña.
   - **Mostrar progreso en la página de donaciones**: muestra a los donantes el progreso de la campaña en su página de donaciones.
   - **Permitir que los donantes hagan promesas**: permite que los donantes hagan sus propias promesas a la campaña.
3. Haga clic en **Guardar**. Si falta el nombre, el fondo o la fecha de inicio, el formulario indica cuál debe completar.

## Seguimiento del progreso {#tracking-progress}

Cada fila de campaña muestra:

- **Meta**: su monto objetivo
- **Prometido**: el monto total que los miembros han prometido donar
- **Donado**: el monto total realmente donado al fondo de esta campaña durante el periodo de la campaña
- **Progreso**: una barra y un porcentaje que muestran qué tan cerca está de su meta

Haga clic en el nombre de una campaña para abrir la vista de detalle. Muestra el porcentaje de la meta alcanzado y enumera las promesas individuales con los montos prometidos y donados de cada donante y un estado (**No iniciada**, **En progreso**, **Cumplida**, **Superada**, o **No prometida** para los donantes que dieron sin hacer una promesa). Los donantes aparecen ordenados por apellido y luego por nombre; haga clic en un encabezado de columna para ordenar por esa columna en su lugar. Haga clic en **Exportar** en la parte superior de la vista de detalle para descargar la lista de promesas como CSV.

## Añadir promesas {#adding-pledges}

Las promesas son compromisos de los miembros de dar hacia una campaña. Para registrar una promesa:

1. Abra una campaña.
2. Haga clic en **Añadir promesa** en la parte superior de la página.
3. Busque a la **persona** que hace la promesa y añádala.
4. Introduzca el **Monto de la promesa**. Debe ser mayor que cero.
5. Haga clic en **Guardar**.

Las promesas aparecen en el detalle de la campaña y contribuyen al total **Prometido** en la lista de campañas. Para cambiar el monto de una promesa, haga clic en **Editar** en su fila; para quitar la promesa, haga clic en **Editar** y luego en **Eliminar**.

:::tip
Las promesas son independientes de las donaciones reales. Una promesa registra un compromiso; una donación registra el donativo real. Ambas se muestran en la campaña para que pueda ver qué tan bien se están cumpliendo las promesas.
:::

## Editar o eliminar una campaña {#editing-or-deleting-a-campaign}

Haga clic en **Editar** en cualquier fila de campaña (o en **Editar campaña** en la parte superior de la vista de detalle de la campaña) para actualizar cualquiera de sus datos. En el formulario de edición, haga clic en **Eliminar** para quitar de forma permanente la campaña y sus promesas; volverá a la lista de campañas. Eliminar una campaña no borra las donaciones que se registraron en su fondo.

## Artículos relacionados {#related-articles}

- [Registrar donaciones](./recording-donations.md): registre los donativos reales que cumplen las promesas
- [Fondos](./funds.md): configure el fondo que se asociará con una campaña
- [Informes de donaciones](./donation-reports.md): informes de donaciones por fondo
