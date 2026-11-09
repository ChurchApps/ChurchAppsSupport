---
title: "Registro de auditoría"
description: "Revise el registro de auditoría en B1 Admin para ver quién inició sesión, editó registros de personas o cambió permisos, y exporte las entradas filtradas a CSV."
---

# Registro de auditoría

<div class="article-intro">

El registro de auditoría registra todas las acciones y cambios importantes de su sistema de gestión de la iglesia. Úselo para revisar la actividad de inicio de sesión, seguir quién hizo cambios en los registros de personas, supervisar las actualizaciones de permisos y mantener la responsabilidad dentro de su equipo.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Cuenta de B1 Admin con acceso de administrador del servidor
- Vaya a **Settings** para encontrar el Audit Log

</div>

## Ver el registro de auditoría

1. Abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda de B1 Admin) y expanda **Settings**.
2. Haga clic en **Audit Log**.
3. El registro muestra las entradas recientes en una tabla con las siguientes columnas:
   - **Date** -- Cuándo se produjo la acción.
   - **Category** -- El tipo de acción (con código de colores para una lectura rápida).
   - **Action** -- Lo que se hizo (por ejemplo, create, update, delete, login_success).
   - **Entity** -- El tipo y el ID del registro afectado.
   - **IP Address** -- La dirección IP del usuario que realizó la acción.
   - **Details** -- Un resumen de los cambios concretos realizados.

## Filtrar el registro

Use los filtros de la parte superior de la página para acotar los resultados:

- **Category** -- Filtre por tipo de acción:
  - **All Categories** -- Muestra todo.
  - **Login** -- Inicios de sesión correctos y fallidos.
  - **People** -- Creación, actualización o eliminación de registros de personas.
  - **Permissions** -- Concesión y revocación de permisos.
  - **Donations** -- Cambios en los registros de donaciones.
  - **Groups** -- Acciones de gestión de grupos.
  - **Forms** -- Actividad de envío de formularios.
  - **Settings** -- Cambios de configuración.
- **Start Date** -- Muestra las entradas desde esta fecha en adelante.
- **End Date** -- Muestra las entradas hasta esta fecha.

Haga clic en **Search** después de definir los filtros para actualizar los resultados.

## Comprender las categorías

Cada categoría tiene un color para identificarla rápidamente:

- **Login** -- Etiqueta azul. Registra los intentos de inicio de sesión correctos y fallidos.
- **People** -- Etiqueta morada. Registra la creación, la actualización y la eliminación de registros de personas.
- **Permissions** -- Etiqueta roja. Registra cuándo se conceden o revocan derechos de acceso.
- **Donations** -- Etiqueta verde. Registra los cambios en los registros de donaciones.
- **Groups** -- Etiqueta gris. Registra las operaciones de gestión de grupos.
- **Forms** -- Etiqueta naranja. Registra la actividad de envío de formularios.
- **Settings** -- Etiqueta amarilla. Registra los cambios de configuración.

## Historial de notas en personas y grupos

Si puede abrir el registro de auditoría, también verá un rastro de las notas modificadas justo donde están las notas, en la pestaña **Notes** de la persona o del grupo:

1. Una nota editada muestra **(edited · view history)** junto a su fecha. Haga clic en ello para abrir el registro de auditoría filtrado por el historial de notas de esa persona o grupo.
2. Una nota eliminada deja un marcador gris **Deleted note** en su lugar, que indica quién la escribió, cuándo se publicó y cuándo se eliminó. Haga clic en **View history** para abrir el mismo registro filtrado.
3. En el registro filtrado, expanda una entrada **Note Updated** o **Note Deleted** para ver el texto anterior y la cuenta que hizo el cambio. Haga clic en **Show all** para quitar el filtro.
4. En la columna **Entity**, el ID de una nota de persona o de grupo enlaza de vuelta a las notas de esa persona o grupo.

El personal que no puede abrir el registro de auditoría ve la lista de notas sin estos marcadores.

## Exportar el registro

Cuando se muestran entradas del registro, aparece un botón de **CSV download**. Haga clic en él para exportar los resultados filtrados actuales a una hoja de cálculo para revisarlos sin conexión o para conservar registros.

## Paginación

Use los controles de paginación de la parte inferior de la tabla para navegar por los resultados. Puede mostrar 25, 50 o 100 entradas por página.

:::info
Las entradas del registro de auditoría se conservan automáticamente durante un año. Las entradas de más de 365 días se eliminan para mantener el sistema funcionando con rapidez.
:::

:::tip
Revise el registro de auditoría con regularidad, sobre todo después de incorporar nuevos miembros al equipo o de hacer cambios importantes en la configuración. Ayuda a detectar a tiempo actividad inesperada.
:::

## Artículos relacionados

- [Roles y permisos](../settings/roles-permissions.md) -- Administre quién tiene acceso a qué
- [Seguridad de datos](../settings/data-security.md) -- Conozca cómo se protegen sus datos
- [Resumen de informes](./index.md) -- Consulte todos los informes disponibles
