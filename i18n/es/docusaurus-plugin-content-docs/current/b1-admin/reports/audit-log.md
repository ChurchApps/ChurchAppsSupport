---
title: "Registro de auditoría"
description: "Revise el registro de auditoría en B1 Admin para ver quién inició sesión, editó registros de personas o cambió permisos, y exporte las entradas filtradas a CSV."
---

# Registro de auditoría

<div class="article-intro">

El registro de auditoría registra todas las acciones y cambios importantes de su sistema de gestión de iglesias. Use el registro para revisar la actividad de inicio de sesión, seguir quién hizo cambios en los registros de personas, supervisar las actualizaciones de permisos y mantener la responsabilidad dentro de su equipo.

</div>

<div class="prereqs">
<h4>Antes de empezar</h4>

- Un rol con el permiso **Editar configuración de la iglesia** (en la sección **Contenido** de los permisos de un rol; es el mismo permiso que abre **Configuración**). Consulte [Roles y permisos](../settings/roles-permissions.md).

</div>

## Ver el registro de auditoría {#viewing-the-audit-log}

1. Abra el [menú Salto](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda de B1 Admin) y expanda **Configuración**.
2. Haga clic en **Registro de auditoría**.
3. El registro muestra las entradas recientes en una tabla con las siguientes columnas:
   - **Fecha** -- Cuándo ocurrió la acción.
   - **Módulo** -- El área de B1 en la que se realizó el cambio (por ejemplo, membresía o donaciones).
   - **Categoría** -- El tipo de registro o acción (con código de colores para facilitar la lectura).
   - **Acción** -- Lo que se hizo (por ejemplo, Donación guardada, Inicio de sesión correcto, Nota actualizada).
   - **Entidad** -- El tipo y el ID del registro afectado.
   - **Dirección IP** -- La dirección IP del usuario que realizó la acción.
4. Haga clic en la flecha al inicio de una fila para ver sus detalles: una tabla con cada campo modificado, con su **Valor anterior** y **Valor nuevo**, o el **Registro eliminado** en caso de una eliminación.

## Filtrar el registro {#filtering-the-log}

Use los filtros en la parte superior de la página para reducir los resultados:

- **Módulo** -- Filtre por área: **Todos los módulos**, **Personas**, **Donaciones**, **Asistencia**, **Mensajería**, **Contenido**, **Servicio** o **Lecciones**.
- **Categoría** -- Filtre por tipo de acción:
  - **Todas las categorías** -- Muestra todo.
  - **Inicio de sesión** -- Inicios de sesión correctos e incorrectos.
  - **Personas** -- Creación, actualización o eliminación de registros de personas.
  - **Permisos** -- Concesiones y revocaciones de permisos.
  - **Donaciones** -- Cambios en los registros de donaciones.
  - **Grupos** -- Acciones de gestión de grupos.
  - **Formularios** -- Actividad de envío de formularios.
  - **Configuración** -- Cambios de configuración.
- **Fecha de inicio** -- Muestra las entradas desde esta fecha en adelante.
- **Fecha de fin** -- Muestra las entradas hasta esta fecha.

Haga clic en **Buscar** después de establecer los filtros para actualizar los resultados.

## Entender las categorías {#understanding-categories}

La categoría de cada entrada se muestra como una etiqueta con color para facilitar su identificación:

- **login** -- Etiqueta azul. Registra los intentos de inicio de sesión correctos e incorrectos.
- **person** -- Etiqueta azul. Registra la creación, actualización y eliminación de registros de personas.
- **permission** -- Etiqueta roja. Registra cuándo se conceden o revocan derechos de acceso.
- **donation** -- Etiqueta verde. Registra los cambios en los registros de donaciones.
- **form** -- Etiqueta naranja. Registra la actividad de envío de formularios.
- **group**, **settings** y otras categorías (como **userchurch**) -- Etiqueta gris.

## Historial de notas en personas y grupos {#note-history-on-people-and-groups}

Si puede abrir el registro de auditoría, también verá un rastro de las notas modificadas justo donde están las notas, en la pestaña **Notas** de una persona o de un grupo:

1. Una nota editada muestra **(editada · ver historial)** junto a su fecha. Haga clic para abrir el registro de auditoría filtrado por el historial de notas de esa persona o grupo.
2. Una nota eliminada deja un marcador atenuado de **Nota eliminada** en su lugar, que muestra quién la escribió, cuándo se publicó y cuándo se eliminó. Haga clic en **Ver historial** para abrir el mismo registro filtrado.
3. En el registro filtrado, expanda una entrada de **Nota actualizada** o **Nota eliminada** para ver el texto anterior y la cuenta que realizó el cambio. Haga clic en **Mostrar todo** para quitar el filtro.
4. En la columna **Entidad**, el ID de una nota de persona o de grupo enlaza de vuelta a las notas de esa persona o grupo.

El personal que no puede abrir el registro de auditoría ve la lista de notas sin estos marcadores.

## Exportar el registro {#exporting-the-log}

Cuando se muestran las entradas del registro, aparece un botón **Exportar CSV** en la parte superior de la página. Haga clic para exportar los resultados filtrados actuales a una hoja de cálculo para revisión fuera de línea o para mantener registros.

## Paginación {#pagination}

Use los controles de paginación en la parte inferior de la tabla para navegar por los resultados. Puede mostrar 25, 50 (el valor predeterminado) o 100 entradas por página.

:::info
Las entradas del registro de auditoría se conservan automáticamente durante un año. Las entradas con más de 365 días se eliminan para mantener el sistema funcionando con buen rendimiento.
:::

:::tip
Revise el registro de auditoría con regularidad, especialmente después de incorporar nuevos miembros del equipo o de realizar cambios importantes de configuración. Ayuda a detectar pronto actividad inesperada.
:::

## Artículos relacionados {#related-articles}

- [Roles y permisos](../settings/roles-permissions.md) -- Administre quién tiene acceso a qué
- [Seguridad de datos](../settings/data-security.md) -- Entienda cómo se protegen sus datos
- [Resumen de informes](./index.md) -- Consulte todos los informes disponibles
