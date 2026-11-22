---
title: "Búsqueda de personas"
description: "Busque en el directorio de People de B1 Admin por nombre, ordene y elija columnas en la vista de tabla, cree filtros con la búsqueda avanzada y exporte los resultados a CSV."
---

# Búsqueda de personas

<div class="article-intro">

La página **People** muestra el directorio de su iglesia como una lista con búsqueda de hogares, o como una tabla ordenable de personas individuales. Puede encontrar rápidamente a cualquier persona de su congregación, personalizar la información que se muestra y exportar sus resultados. Una búsqueda eficiente es esencial para las tareas diarias de administración de la iglesia, como dar seguimiento a los visitantes, preparar listas de contactos y administrar los registros de miembros.

</div>

## Video de capacitación {#training-video}

<YouTube id="7Y-tN9RmnDQ" title="Cómo buscar personas y crear listas en B1" next="Campos personalizados, edición masiva y exportación en B1" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita una cuenta activa de B1 Admin con permiso para ver personas. Consulte [Roles y permisos](roles-permissions.md) si no está seguro de su nivel de acceso.
- Su directorio de la iglesia debe tener personas. Si todavía no ha agregado a nadie, consulte [Cómo agregar personas](adding-people.md) o [Importar datos](importing-data.md).

</div>

## Vistas de hogares y de tabla {#households-and-table-views}

La página People muestra su directorio por **hogar**, agrupado alfabéticamente. Cada fila muestra las fotos del hogar, su nombre (por ejemplo, "The Smith Family") y los nombres de todas las personas que lo integran. Haga clic en un hogar para abrir el perfil del jefe de hogar, o haga clic en el nombre de cualquier miembro para abrir a esa persona. Un conteo sobre la lista muestra cuántos hogares y personas se están mostrando.

Use el botón **View as** sobre la lista para cambiar entre **Households** y **Table**. La vista **Table** muestra una persona por fila y es donde puede ordenar y elegir columnas (vea más abajo). B1 recuerda su elección en ese dispositivo.

En la vista **Table**, el estado de membresía de cada persona aparece debajo de su nombre, y cada uno de los siete estados tiene su propio color, el mismo que se usa en el perfil de la persona. Cualquier persona cuyo rol en el hogar sea **Child** también muestra una etiqueta **Child** junto al estado. Para marcar a alguien como niño, configure su rol en el [panel de hogares](./adding-people.md#managing-households) de su perfil.

De forma predeterminada, la página carga la primera parte de su directorio. Si tiene más personas, haga clic en **Show All Members** debajo de la lista para cargar a todas.

## Búsqueda rápida {#quick-search}

El cuadro **Find a household or person** en la parte superior de la página People le permite encontrar miembros en tiempo real:

1. Haga clic en el **cuadro de búsqueda** en la parte superior de la página People.
2. Empiece a escribir un nombre.
3. Los resultados se filtran automáticamente mientras escribe (hay una breve pausa de aproximadamente medio segundo para que la búsqueda no se ejecute con cada tecla).
4. La lista de abajo se actualiza para mostrar solo los resultados coincidentes.

Haga clic en **Clear** (debajo del cuadro de búsqueda) para restablecer la búsqueda y volver a mostrar todo su directorio.

:::tip
No necesita presionar Enter. La búsqueda se ejecuta automáticamente cuando deja de escribir.
:::

## Ordenar resultados {#sorting-results}

En la vista **Table**, las personas aparecen ordenadas por apellido y luego por nombre. Puede ordenar el directorio de otra forma haciendo clic en cualquier encabezado de columna:

1. Haga clic en un **encabezado de columna** (por ejemplo, **Name** o **Email**) para ordenar por esa columna.
2. Haga clic de nuevo en el mismo encabezado para invertir el orden.

El primer clic ordena la columna en orden ascendente (de la A a la Z, de menor a mayor edad, la fecha más antigua primero), y la flecha junto al encabezado indica la dirección. Las personas sin valor en esa columna siempre aparecen al final. Así es fácil encontrar personas por orden alfabético, por edad o por cualquier otra columna visible. B1 recuerda el orden en ese dispositivo, así que la tabla se mantiene ordenada de la misma forma después de actualizar la página o al volver más tarde.

## Personalizar columnas {#customizing-columns}

No es necesario que toda la información esté visible a la vez. Puede elegir qué columnas aparecen en la tabla:

1. Haga clic en el icono **Select columns** en el encabezado de la página People. (Las columnas se aplican a la vista **Table**, así que al marcar una columna la página también cambia a la vista **Table**).
2. Marque o desmarque columnas para mostrarlas u ocultarlas. La pestaña **Standard** ofrece:
   - **Photo** y **Display Name** (se muestran de forma predeterminada)
   - **Last Name**, **First Name** y **Middle Name**
   - **Address**, **City**, **State/Province** y **Zip/Postal**
   - **Primary Email** y **Primary Phone** (el número móvil, o el de casa o del trabajo cuando no hay móvil)
   - **Birth Date**, **Birthday (No Year)** y **Age**
   - **Gender**, **Membership Status**, **Campus**, **Marital Status** y **Anniversary**
   - **Name Tag Notes**
   - **Date Added**: la fecha en que se creó el registro de la persona
   - **Delete Option**: agrega un icono de eliminar a cada fila (solo se ofrece si puede editar personas)
3. La tabla se actualiza de inmediato para reflejar sus selecciones. Haga clic en **Done** (o **Close**) para cerrar el cuadro de diálogo **Select Columns**. B1 recuerda sus columnas en ese dispositivo.

### Mostrar campos personalizados como columnas {#showing-custom-fields-as-columns}

El selector de columnas tiene dos pestañas: **Standard** contiene las columnas integradas que se enumeran arriba, y **Custom** contiene sus [Campos personalizados](../settings/custom-fields.md) de la iglesia junto con las preguntas de cualquier formulario de People. Marque un campo personalizado en la pestaña **Custom** para agregarlo como columna, y el valor de cada persona para ese campo aparecerá en la tabla. Los valores se muestran igual que en el perfil de la persona: los campos Sí/No muestran *Yes* o *No*, los campos de opción múltiple muestran la etiqueta de la opción y las fechas se muestran en formato corto. Las personas sin valor para el campo muestran una celda en blanco.


## Exportar resultados de búsqueda {#exporting-search-results}

Puede descargar sus resultados de búsqueda actuales como archivo CSV en cualquier momento:

1. Aplique las búsquedas o filtros que desee.
2. Haga clic en el botón **Export** en el encabezado de la página People.
3. Se descargará a su computadora un archivo CSV, listo para abrir en Excel, Google Sheets o cualquier aplicación de hojas de cálculo.

Para más detalles sobre la exportación, consulte [Exportación de datos](./exporting-data.md).

:::tip
Para consultas más avanzadas, como encontrar a todas las personas que no han asistido en los últimos tres meses, pruebe la función [Búsqueda con IA](./ai-search.md), que le permite buscar con preguntas en lenguaje sencillo.
:::

## Búsqueda avanzada {#advanced-search}

La búsqueda avanzada le permite crear filtros precisos combinando condiciones. Ábrala haciendo clic en **Advanced** debajo del cuadro de búsqueda en la página People; luego expanda una categoría y marque los campos por los que quiere filtrar (puede hacer clic en el nombre del campo o en su casilla), eligiendo un operador y un valor para cada uno. Las categorías incluyen **Names**, **Demographics**, **Contact Information**, **Membership & Groups** (estado de membresía, campus, fecha de alta y membresía de grupo), **Activity** (donaciones y asistencia) y **Custom Fields**.

No hay botón de búsqueda: los resultados se actualizan automáticamente medio segundo después de cambiar un filtro, y las personas deben cumplir todos los filtros que marque. Los filtros activados aparecen como etiquetas sobre las categorías: haga clic en la **x** de una etiqueta para quitar ese filtro, o en **Clear All** para quitarlos todos. Haga clic en **Advanced** de nuevo para ocultar el panel.

Para encontrar personas nuevas, abra **Membership & Groups** y marque **Date Added**. Empieza en **in the last N days** con 30 indicado, así puede encontrar a todas las personas agregadas en el último mes con un solo clic; cambie el número de días, o cambie a *equals / after / before* para elegir una fecha. **Birth Date** y **Anniversary** también ofrecen **in the last N days**. Date Added solo se registra para personas creadas desde finales de octubre de 2026; las personas agregadas antes no tienen fecha, así que este filtro no las encuentra.

La categoría **Custom Fields** enumera sus [Campos personalizados](../settings/custom-fields.md): los campos que define en Settings para registrar su propia información (como la fecha de vencimiento de una verificación de antecedentes). Los operadores que se ofrecen corresponden al tipo de cada campo: los campos de texto admiten *contains / equals / starts with / ends with*, los campos numéricos admiten los operadores de comparación, los campos de fecha admiten *equals / after / before*, y los campos Sí/No y de opción múltiple le permiten elegir un valor. Cualquier campo por el que pueda filtrar aquí se puede guardar como una [Lista](./lists.md) en vivo.

## Guardar búsquedas como listas {#saving-searches-as-lists}

Después de hacer una búsqueda que devuelva al menos una persona, aparece un botón **Save as List** en el encabezado de la página People (para el personal que puede editar personas). Haga clic en él para guardar su consulta actual con un nombre y una categoría opcional, de modo que pueda cargarla al instante en futuras sesiones. Consulte [Listas guardadas](./lists.md) para ver todos los detalles.
