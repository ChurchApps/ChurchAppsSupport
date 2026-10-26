---
title: "Buscar personas"
---

# Buscar personas

<div class="article-intro">

La página de **Personas** muestra el directorio de tu iglesia como una lista con búsqueda de hogares, o como una tabla ordenable de personas individuales. Puedes encontrar rápidamente a cualquier persona de tu congregación, personalizar la información que se muestra y exportar los resultados. Buscar de forma eficiente es esencial para las tareas diarias de administración de la iglesia, como dar seguimiento a los visitantes, preparar listas de contactos y administrar los registros de los miembros.

</div>

## Video de capacitación

<YouTube id="7Y-tN9RmnDQ" title="Searching People and Building Lists in B1" next="Custom Fields, Bulk Editing, and Exporting in B1" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Antes de empezar</h4>

- Necesitas una cuenta activa de B1 Admin con permiso para ver personas. Consulta [Roles y permisos](roles-permissions.md) si no estás seguro de tu nivel de acceso.
- Tu directorio de la iglesia debe tener personas registradas. Si todavía no has agregado a nadie, consulta [Agregar personas](adding-people.md) o [Importar datos](importing-data.md).

</div>

## Hogares y vistas de tabla

La página de Personas enumera tu directorio por **hogar**, agrupado alfabéticamente. Cada fila muestra las fotos del hogar, su nombre (por ejemplo, "La familia Smith") y los nombres de todas las personas que lo integran. Haz clic en un hogar para abrir el perfil del jefe de familia, o haz clic en el nombre de cualquier miembro para abrir a esa persona. Un conteo sobre la lista muestra cuántos hogares y personas se están mostrando.

Usa el selector **Ver como** encima de la lista para cambiar entre **Hogares** y **Tabla**. La vista **Tabla** muestra una persona por fila y es donde puedes ordenar y elegir columnas (consulta más abajo). B1 recuerda tu elección en ese dispositivo.

Por defecto, la página carga la primera parte de tu directorio. Si tienes más personas, haz clic en **Mostrar todos los miembros** debajo de la lista para cargar a todos.

## Búsqueda rápida

El cuadro **Buscar un hogar o una persona**, en la parte superior de la página de Personas, te permite encontrar miembros en tiempo real:

1. Haz clic en el **cuadro de búsqueda** en la parte superior de la página de Personas.
2. Empieza a escribir un nombre.
3. Los resultados se filtran automáticamente mientras escribes (hay una breve pausa de aproximadamente medio segundo para que la búsqueda no se ejecute con cada tecla).
4. La lista de abajo se actualiza para mostrar solo los resultados coincidentes.

Haz clic en **Limpiar** (debajo del cuadro de búsqueda) para restablecer la búsqueda y volver a mostrar todo tu directorio.

:::tip
No necesitas presionar Enter. La búsqueda se ejecuta automáticamente cuando dejas de escribir.
:::

## Ordenar resultados

En la vista **Tabla**, las personas aparecen ordenadas por apellido y luego por nombre. Puedes ordenar el directorio de otra forma haciendo clic en cualquier encabezado de columna:

1. Haz clic en un **encabezado de columna** (por ejemplo, **Nombre** o **Correo electrónico**) para ordenar por esa columna.
2. Haz clic en el mismo encabezado otra vez para invertir el orden.

Así es fácil encontrar personas por orden alfabético, por edad o por cualquier otra columna visible.

## Personalizar columnas

No es necesario que toda la información esté visible al mismo tiempo. Puedes elegir qué columnas aparecen en la tabla:

1. Haz clic en el ícono **Seleccionar columnas** en el encabezado de la página de Personas. (Las columnas se aplican a la vista **Tabla**).
2. Marca o desmarca columnas para mostrarlas u ocultarlas. Las columnas disponibles incluyen:
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
3. La tabla se actualiza de inmediato para reflejar tus selecciones. Haz clic en **Listo** para cerrar el cuadro de diálogo **Seleccionar columnas**.

### Mostrar campos personalizados como columnas

El selector de columnas tiene dos pestañas: **Estándar** contiene las columnas integradas que se enumeran arriba, y **Personalizado** contiene los [Campos personalizados](../settings/custom-fields.md) de tu iglesia junto con las preguntas de cualquier formulario de Personas. Marca un campo personalizado en la pestaña **Personalizado** para agregarlo como columna, y el valor de cada persona para ese campo aparecerá en la tabla. Los valores se muestran de la misma forma que en el perfil de la persona: los campos de Sí/No muestran *Sí* o *No*, los campos de Opción múltiple muestran la etiqueta de la opción y las fechas se muestran como fechas cortas. Las personas sin valor para el campo muestran una celda en blanco.


## Exportar resultados de búsqueda

Puedes descargar tus resultados de búsqueda actuales como archivo CSV en cualquier momento:

1. Aplica la búsqueda o los filtros que quieras.
2. Haz clic en el botón **Exportar** en el encabezado de la página de Personas.
3. Se descargará un archivo CSV a tu computadora, listo para abrir en Excel, Google Sheets o cualquier aplicación de hojas de cálculo.

Para más detalles sobre la exportación, consulta [Exportar datos](./exporting-data.md).

:::tip
Para consultas más avanzadas, como encontrar a todas las personas que no han asistido en los últimos tres meses, prueba la función de [Búsqueda con IA](./ai-search.md), que te permite buscar usando preguntas en lenguaje sencillo.
:::

## Búsqueda avanzada

La Búsqueda avanzada te permite crear filtros precisos combinando condiciones. Ábrela haciendo clic en **Avanzada** debajo del cuadro de búsqueda en la página de Personas, luego expande una categoría y marca los campos por los que quieres filtrar (puedes hacer clic en el nombre del campo o en su casilla), eligiendo un operador y un valor para cada uno. Las categorías incluyen **Nombres**, **Datos demográficos**, **Contacto**, **Membresía**, **Actividad** (donaciones y asistencia) y **Campos personalizados**.

La categoría **Campos personalizados** enumera los [Campos personalizados](../settings/custom-fields.md) de tu iglesia: los campos que defines en Configuración para registrar tu propia información (como una fecha de vencimiento de la verificación de antecedentes). Los operadores disponibles coinciden con el tipo de cada campo: los campos de texto admiten *contiene / es igual a / empieza con / termina con*, los campos numéricos admiten los operadores de comparación, los campos de fecha admiten *es igual a / después de / antes de*, y los campos de Sí/No y de Opción múltiple te permiten elegir un valor. Cualquier campo por el que puedas filtrar aquí se puede guardar como una [Lista](./lists.md) activa.

## Guardar búsquedas como listas

Después de realizar una búsqueda, aparece un botón **Guardar como lista** en el encabezado de la página de Personas. Haz clic en él para guardar tu consulta actual con un nombre y una categoría opcional, de modo que puedas volver a cargarla al instante en futuras sesiones. Consulta [Listas guardadas](./lists.md) para ver todos los detalles.
