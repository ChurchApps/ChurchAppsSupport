---
title: "Buscar personas"
---

# Buscar personas

<div class="article-intro">

La página de **Personas** muestra el directorio de su iglesia como una lista con búsqueda de hogares, o como una tabla ordenable de personas individuales. Puede encontrar rápidamente a cualquier persona de su congregación, personalizar la información que se muestra y exportar sus resultados. Una búsqueda eficiente es esencial para las tareas diarias de administración de la iglesia, como dar seguimiento a los visitantes, preparar listas de contactos y gestionar los registros de los miembros.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita una cuenta activa de B1 Admin con permiso para ver personas. Consulte [Roles y permisos](roles-permissions.md) si no está seguro de su nivel de acceso.
- Su directorio de la iglesia debe tener personas registradas. Si todavía no ha agregado a nadie, consulte [Agregar personas](adding-people.md) o [Importar datos](importing-data.md).

</div>

## Hogares y vistas de tabla

La página de Personas muestra su directorio por **hogar**, agrupado alfabéticamente. Cada fila muestra las fotos del hogar, su nombre (por ejemplo, "La familia Smith") y los nombres de todas las personas que lo integran. Haga clic en un hogar para abrir el perfil del jefe de hogar, o haga clic en el nombre de un miembro para abrir ese perfil. Un contador sobre la lista indica cuántos hogares y personas se muestran.

Use el selector **Ver como** sobre la lista para cambiar entre **Hogares** y **Tabla**. La vista **Tabla** muestra una persona por fila y es donde puede ordenar y elegir columnas (vea más abajo). B1 recuerda su elección en ese dispositivo.

De forma predeterminada, la página carga la primera parte de su directorio. Si tiene más personas, haga clic en **Mostrar todos los miembros** debajo de la lista para cargar a todos.

## Búsqueda rápida

El cuadro **Buscar un hogar o una persona** en la parte superior de la página de Personas le permite encontrar miembros en tiempo real:

1. Haga clic en el **cuadro de búsqueda** en la parte superior de la página de Personas.
2. Empiece a escribir un nombre.
3. Los resultados se filtran automáticamente mientras escribe (hay una breve pausa de medio segundo para que la búsqueda no se ejecute con cada pulsación).
4. La lista de abajo se actualiza para mostrar solo los resultados coincidentes.

Haga clic en **Borrar** (debajo del cuadro de búsqueda) para restablecer la búsqueda y volver a mostrar todo su directorio.

:::tip
No necesita presionar Intro. La búsqueda se ejecuta automáticamente cuando deja de escribir.
:::

## Ordenar resultados

En la vista **Tabla**, las personas aparecen ordenadas por apellido y luego por nombre. Puede ordenar el directorio de otra forma haciendo clic en cualquier encabezado de columna:

1. Haga clic en un **encabezado de columna** (por ejemplo, **Nombre** o **Correo electrónico**) para ordenar por esa columna.
2. Haga clic de nuevo en el mismo encabezado para invertir el orden.

Así es fácil encontrar personas alfabéticamente, por edad o por cualquier otra columna visible.

## Personalizar columnas

No es necesario que toda la información esté visible al mismo tiempo. Puede elegir qué columnas aparecen en la tabla:

1. Haga clic en el icono **Seleccionar columnas** en el encabezado de la página de Personas. (Las columnas se aplican a la vista **Tabla**.)
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
3. La tabla se actualiza de inmediato para reflejar sus selecciones.

### Mostrar campos personalizados como columnas {#showing-custom-fields-as-columns}

El selector de columnas tiene dos pestañas: **Estándar** contiene las columnas integradas que aparecen arriba, y **Personalizado** contiene los [Campos personalizados](../settings/custom-fields.md) de su iglesia junto con las preguntas de cualquier formulario de Personas. Marque un campo personalizado en la pestaña **Personalizado** para agregarlo como columna, y el valor de cada persona para ese campo aparecerá en la tabla. Los valores se muestran igual que en el perfil de la persona: los campos Sí/No muestran *Sí* o *No*, los campos de Opción múltiple muestran la etiqueta de la opción y las fechas se muestran como fechas cortas. Las personas sin valor para el campo muestran una celda en blanco.


## Exportar resultados de búsqueda

Puede descargar sus resultados de búsqueda actuales como archivo CSV en cualquier momento:

1. Aplique las búsquedas o filtros que desee.
2. Haga clic en el botón **Exportar** en el encabezado de la página de Personas.
3. Se descargará un archivo CSV a su computadora, listo para abrirlo en Excel, Google Sheets o cualquier aplicación de hojas de cálculo.

Para más detalles sobre la exportación, consulte [Exportar datos](./exporting-data.md).

:::tip
Para consultas más avanzadas, como encontrar a todas las personas que no han asistido en los últimos tres meses, pruebe la función [Búsqueda con IA](./ai-search.md), que le permite buscar usando preguntas en lenguaje natural.
:::

## Búsqueda avanzada {#advanced-search}

La búsqueda avanzada le permite crear filtros precisos combinando condiciones. Ábrala haciendo clic en **Avanzada** debajo del cuadro de búsqueda en la página de Personas; luego expanda una categoría y marque los campos por los que desea filtrar, eligiendo un operador y un valor para cada uno. Las categorías incluyen **Nombres**, **Demografía**, **Contacto**, **Membresía**, **Actividad** (donaciones y asistencia) y **Campos personalizados**.

La categoría **Campos personalizados** muestra los [Campos personalizados](../settings/custom-fields.md) de su iglesia: los campos que usted define en Configuración para registrar su propia información (como la fecha de vencimiento de una verificación de antecedentes). Los operadores disponibles coinciden con el tipo de cada campo: los campos de texto admiten *contiene / es igual a / empieza con / termina con*, los campos numéricos admiten los operadores de comparación, los campos de fecha admiten *es igual a / después de / antes de*, y los campos Sí/No y de Opción múltiple le permiten elegir un valor. Cualquier campo por el que pueda filtrar aquí puede guardarse como una [Lista](./lists.md) dinámica.

## Guardar búsquedas como listas

Después de ejecutar una búsqueda, aparece un botón **Guardar como lista** en el encabezado de la página de Personas. Haga clic en él para guardar su consulta actual con un nombre y una categoría opcional, de modo que pueda volver a cargarla al instante en futuras sesiones. Consulte [Listas guardadas](./lists.md) para más detalles.
