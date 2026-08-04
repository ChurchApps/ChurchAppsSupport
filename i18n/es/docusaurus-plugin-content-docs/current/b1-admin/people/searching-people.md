---
title: "Búsqueda de Personas"
---

# Búsqueda de Personas

<div class="article-intro">

La página **Personas** muestra el directorio de su iglesia en una tabla con capacidad de búsqueda y ordenamiento. Puede encontrar rápidamente a cualquier persona en su congregación, personalizar qué información se muestra y exportar sus resultados. Una búsqueda eficiente es esencial para las tareas diarias de administración de la iglesia, como hacer seguimiento a visitantes, preparar listas de contacto y administrar registros de miembros.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Necesita una cuenta activa de B1 Admin con permiso para ver personas. Consulte [Roles y Permisos](roles-permissions.md) si no está seguro de su nivel de acceso.
- El directorio de su iglesia debe tener personas en él. Si aún no ha agregado a nadie, consulte [Agregar Personas](adding-people.md) o [Importar Datos](importing-data.md).

</div>

## Búsqueda Rápida

La barra de búsqueda en la parte superior de la página Personas le permite encontrar miembros en tiempo real:

1. Haga clic en el **cuadro de búsqueda** en la parte superior de la página Personas.
2. Comience a escribir un nombre, correo electrónico u otra palabra clave.
3. Los resultados se filtrarán automáticamente mientras escribe (hay un breve retraso de aproximadamente medio segundo para que la búsqueda no se dispare en cada pulsación de tecla).
4. La tabla debajo se actualiza para mostrar solo los resultados coincidentes.

:::tip
No necesita presionar Enter. La búsqueda se ejecuta automáticamente después de que deja de escribir.
:::

## Ordenar Resultados

Puede ordenar el directorio haciendo clic en cualquier encabezado de columna de la tabla:

1. Haga clic en un **encabezado de columna** (por ejemplo, **Nombre** o **Correo Electrónico**) para ordenar por esa columna.
2. Haga clic en el mismo encabezado nuevamente para invertir el orden.

Esto facilita encontrar personas alfabéticamente, por edad, o por cualquier otra columna visible.

## Personalizar Columnas

No toda la información necesita estar visible a la vez. Puede elegir qué columnas aparecen en la tabla:

1. Busque el **menú desplegable selector de columnas** cerca de la parte superior de la tabla.
2. Marque o desmarque columnas para mostrarlas u ocultarlas. Las columnas disponibles incluyen:
   - **Foto**
   - **Nombre**
   - **Correo Electrónico**
   - **Teléfono**
   - **Dirección**
   - **Fecha de Nacimiento**
   - **Edad**
   - **Género**
   - **Estado de Membresía**
   - **Sede**
3. La tabla se actualiza inmediatamente para reflejar sus selecciones.

:::info
Sus selecciones de columnas afectan lo que se incluye al exportar a CSV. Personalice las columnas antes de exportar para obtener exactamente los datos que necesita.
:::

## Paginación

Cuando su directorio tiene muchos registros, los resultados se dividen en páginas. Use los **controles de paginación** en la parte inferior de la tabla para moverse entre páginas. La página actual y el conteo total de registros se muestran para que siempre sepa dónde está en la lista.

:::tip
Si desea ver más resultados a la vez, refine su búsqueda para acotar la lista en lugar de pasar páginas por un directorio grande.
:::

## Exportar Resultados de Búsqueda

Puede descargar sus resultados de búsqueda actuales como un archivo CSV en cualquier momento:

1. Aplique cualquier búsqueda o filtros que desee.
2. Personalice sus columnas para incluir los datos que necesita.
3. Haga clic en el botón **Exportar**.
4. Se descargará un archivo CSV a su computadora, listo para abrir en Excel, Google Sheets, o cualquier aplicación de hoja de cálculo.

Para más detalles sobre la exportación, consulte [Exportar Datos](./exporting-data.md).

:::tip
Para consultas más avanzadas -- como encontrar a todos los que no han asistido en los últimos tres meses -- pruebe la función [Búsqueda con IA](./ai-search.md), que le permite buscar usando preguntas en lenguaje sencillo.
:::

## Búsqueda Avanzada

La Búsqueda Avanzada le permite construir filtros precisos combinando condiciones. Ábrala desde la página Personas, luego expanda una categoría y marque los campos por los que desea filtrar, eligiendo un operador y valor para cada uno. Las categorías incluyen **Nombres**, **Demografía**, **Contacto**, **Membresía**, **Actividad** (donaciones y asistencia), y **Campos Personalizados**.

La categoría **Campos Personalizados** enumera los [Campos Personalizados](../settings/custom-fields.md) de su iglesia — los campos que define en Configuración para rastrear su propia información (como una fecha de vencimiento de verificación de antecedentes). Los operadores ofrecidos coinciden con el tipo de cada campo: los campos de texto admiten *contiene / es igual a / comienza con / termina con*, los campos numéricos admiten los operadores de comparación, los campos de fecha admiten *es igual a / después de / antes de*, y los campos de Sí/No y Opción Múltiple le permiten elegir un valor. Cualquier campo por el que pueda filtrar aquí se puede guardar como una [Lista](./lists.md) en vivo.

## Guardar Búsquedas como Listas

Después de ejecutar una búsqueda, aparece un botón **Guardar como Lista** (ícono de marcador) en el encabezado de la página Personas. Haga clic en él para almacenar su consulta actual bajo un nombre y categoría opcional, para poder recargarla instantáneamente en sesiones futuras. Consulte [Listas Guardadas](./lists.md) para detalles completos.
