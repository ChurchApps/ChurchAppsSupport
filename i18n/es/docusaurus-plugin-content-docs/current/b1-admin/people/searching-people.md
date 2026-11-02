---
title: "Buscar personas"
---

# Buscar personas

<div class="article-intro">

La página de **Personas** muestra el directorio de su iglesia como una lista buscable de hogares, o como una tabla ordenable de personas individuales. Puede encontrar rápidamente a cualquier persona de su congregación, personalizar qué información se muestra y exportar sus resultados. Buscar de forma eficiente es esencial para las tareas diarias de administración de la iglesia, como dar seguimiento a los visitantes, preparar listas de contacto y administrar los registros de miembros.

</div>

## Video de capacitación

<YouTube id="7Y-tN9RmnDQ" title="Buscar personas y crear listas en B1" next="Campos personalizados, edición masiva y exportación en B1" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita una cuenta activa de B1 Admin con permiso para ver personas. Consulte [Roles y permisos](roles-permissions.md) si no está seguro de su nivel de acceso.
- Su directorio de la iglesia debe tener personas registradas. Si todavía no ha agregado a nadie, consulte [Agregar personas](adding-people.md) o [Importar datos](importing-data.md).

</div>

## Hogares y vistas de tabla

La página de Personas enumera su directorio por **hogar**, agrupado alfabéticamente. Cada fila muestra las fotos del hogar, su nombre (por ejemplo, "Familia Smith") y los nombres de todas las personas que lo integran. Haga clic en un hogar para abrir el perfil del jefe de hogar, o haga clic en el nombre de cualquier miembro para abrir a esa persona. Un conteo sobre la lista muestra cuántos hogares y personas se están mostrando.

Use el selector **Ver como** encima de la lista para cambiar entre **Hogares** y **Tabla**. La vista **Tabla** muestra una persona por fila y es donde puede ordenar y elegir columnas (consulte más abajo). B1 recuerda su elección en ese dispositivo.

En la vista **Tabla**, el estado de membresía de cada persona aparece debajo de su nombre, y cada uno de los siete estados tiene su propio color, el mismo que se usa en el perfil de la persona. Cualquier persona cuyo rol en el hogar sea **Hijo** también muestra una etiqueta de **Hijo** junto al estado. Para marcar a alguien como hijo, configure su rol en el [panel del hogar](./adding-people.md#managing-households) de su perfil.

De forma predeterminada, la página carga la primera parte de su directorio. Si tiene más personas, haga clic en **Mostrar todos los miembros** debajo de la lista para cargar a todos.

## Búsqueda rápida

El cuadro **Buscar un hogar o persona**, en la parte superior de la página de Personas, le permite encontrar miembros en tiempo real:

1. Haga clic en el **cuadro de búsqueda** en la parte superior de la página de Personas.
2. Empiece a escribir un nombre.
3. Los resultados se filtran automáticamente mientras escribe (hay una breve demora de medio segundo para que la búsqueda no se ejecute en cada pulsación).
4. La lista de abajo se actualiza para mostrar solo los resultados coincidentes.

Haga clic en **Limpiar** (debajo del cuadro de búsqueda) para restablecer la búsqueda y volver a mostrar todo su directorio.

:::tip
No necesita presionar Enter. La búsqueda se ejecuta automáticamente cuando deja de escribir.
:::

## Ordenar resultados

En la vista **Tabla**, las personas se listan por apellido y luego por nombre. Puede ordenar el directorio de otra forma haciendo clic en cualquier encabezado de columna:

1. Haga clic en un **encabezado de columna** (por ejemplo, **Nombre** o **Correo electrónico**) para ordenar por esa columna.
2. Haga clic de nuevo en el mismo encabezado para invertir el orden.

Así es fácil encontrar personas por orden alfabético, por edad o por cualquier otra columna visible.

## Personalizar columnas

No es necesario que toda la información esté visible a la vez. Puede elegir qué columnas aparecen en la tabla:

1. Haga clic en el ícono **Seleccionar columnas** en el encabezado de la página de Personas. (Las columnas se aplican a la vista **Tabla**).
2. Marque o desmarque columnas para mostrarlas u ocultarlas. Las columnas disponibles incluyen:
   - **Foto**
   - **Nombre**
   - **Correo electrónico**
   - **Teléfono**
   - **Dirección**
   - **Fecha de nacimiento**
   - **Edad**
   - **Género**
   - **Estado de membresía**
   - **Campus**
   - **Fecha de alta**: cuándo se creó el registro de la persona
3. La tabla se actualiza de inmediato para reflejar sus selecciones. Haga clic en **Listo** para cerrar el cuadro de diálogo **Seleccionar columnas**.

### Mostrar campos personalizados como columnas {#showing-custom-fields-as-columns}

El selector de columnas tiene dos pestañas: **Estándar** contiene las columnas integradas que se enumeran arriba, y **Personalizado** contiene sus [Campos personalizados](../settings/custom-fields.md) de la iglesia junto con las preguntas de cualquier formulario de Personas. Marque un campo personalizado en la pestaña **Personalizado** para agregarlo como columna, y el valor de cada persona para ese campo aparecerá en la tabla. Los valores se muestran igual que en el perfil de la persona: los campos de Sí/No muestran *Sí* o *No*, los campos de opción múltiple muestran la etiqueta de la opción y las fechas se muestran en formato corto. Las personas sin valor para el campo muestran una celda en blanco.

## Exportar resultados de búsqueda

Puede descargar sus resultados de búsqueda actuales como archivo CSV en cualquier momento:

1. Aplique las búsquedas o filtros que desee.
2. Haga clic en el botón **Exportar** en el encabezado de la página de Personas.
3. Se descargará a su computadora un archivo CSV, listo para abrir en Excel, Hojas de cálculo de Google o cualquier aplicación de hojas de cálculo.

Para más detalles sobre la exportación, consulte [Exportar datos](./exporting-data.md).

:::tip
Para consultas más avanzadas, como encontrar a todas las personas que no han asistido en los últimos tres meses, pruebe la función de [Búsqueda con IA](./ai-search.md), que le permite buscar con preguntas en lenguaje sencillo.
:::

## Búsqueda avanzada {#advanced-search}

La Búsqueda avanzada le permite crear filtros precisos combinando condiciones. Ábrala haciendo clic en **Avanzada** debajo del cuadro de búsqueda en la página de Personas; luego expanda una categoría y marque los campos por los que desea filtrar (puede hacer clic en el nombre del campo o en su casilla), eligiendo un operador y un valor para cada uno. Las categorías incluyen **Nombres**, **Demografía**, **Contacto**, **Membresía**, **Actividad** (donaciones y asistencia) y **Campos personalizados**.

Para encontrar personas nuevas, abra **Membresía** y marque **Fecha de alta**. Empieza en **en los últimos N días** con 30 indicado, así que puede encontrar a todas las personas agregadas en el último mes con un solo clic; cambie el número de días, o cambie a *igual a / después de / antes de* para elegir una fecha. **Fecha de nacimiento** y **Aniversario** también ofrecen **en los últimos N días**. La fecha de alta solo se registra para personas creadas desde finales de octubre de 2026; las personas agregadas antes no tienen fecha, así que este filtro no las encuentra.

La categoría **Campos personalizados** enumera los [Campos personalizados](../settings/custom-fields.md) de su iglesia, los campos que define en Configuración para dar seguimiento a su propia información (como la fecha de vencimiento de una verificación de antecedentes). Los operadores que se ofrecen corresponden al tipo de cada campo: los campos de texto admiten *contiene / igual a / empieza con / termina con*, los campos numéricos admiten los operadores de comparación, los campos de fecha admiten *igual a / después de / antes de*, y los campos de Sí/No y de opción múltiple le permiten elegir un valor. Cualquier campo por el que pueda filtrar aquí se puede guardar como una [Lista](./lists.md) activa.

## Guardar búsquedas como listas

Después de realizar una búsqueda, aparece un botón **Guardar como lista** en el encabezado de la página de Personas. Haga clic en él para guardar su consulta actual con un nombre y una categoría opcional, de modo que pueda volver a cargarla al instante en futuras sesiones. Consulte [Listas guardadas](./lists.md) para más detalles.
