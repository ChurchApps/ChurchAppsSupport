---
title: "Buscar Personas"
---

# Buscar Personas

<div class="article-intro">

La página **People** muestra tu directorio de iglesia como una lista que se puede buscar por hogares, o como una tabla que se puede ordenar de personas individuales. Puedes encontrar rápidamente a cualquiera de tu congregación, personalizar qué información se muestra y exportar tus resultados. La búsqueda eficiente es esencial para tareas cotidianas de administración de iglesias como hacer seguimiento de visitantes, preparar listas de contactos y gestionar registros de miembros.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Necesitas una cuenta B1 Admin activa con permiso para ver personas. Consulta [Roles y Permisos](roles-permissions.md) si no estás seguro de tu nivel de acceso.
- Tu directorio de iglesia debe tener personas en él. Si aún no has agregado a nadie, consulta [Agregar Personas](adding-people.md) o [Importar Datos](importing-data.md).

</div>

## Vistas por Hogar y Tabla

La página People enumera tu directorio por **hogar**, agrupado alfabéticamente. Cada fila muestra las fotos del hogar, su nombre (por ejemplo, "The Smith Family"), y los nombres de todos sus miembros. Haz clic en un hogar para abrir el perfil del jefe de hogar, o haz clic en el nombre de cualquier miembro para abrir a esa persona. Un recuento sobre la lista muestra cuántos hogares y personas se están mostrando.

Usa el selector **View as** encima de la lista para cambiar entre **Households** y **Table**. La vista **Table** muestra una persona por fila y es donde puedes ordenar y elegir columnas (ver abajo). B1 recuerda tu elección en ese dispositivo.

De forma predeterminada, la página carga la primera parte de tu directorio. Si tienes más personas, haz clic en **Show All Members** debajo de la lista para cargar a todos.

## Búsqueda Rápida

El cuadro **Find a household or person** en la parte superior de la página People te permite encontrar miembros en tiempo real:

1. Haz clic en el **cuadro de búsqueda** en la parte superior de la página People.
2. Comienza a escribir un nombre.
3. Los resultados se filtrarán automáticamente a medida que escribas (hay un breve retraso de aproximadamente medio segundo para que la búsqueda no se ejecute en cada pulsación de tecla).
4. La lista a continuación se actualiza para mostrar solo los resultados coincidentes.

Haz clic en **Clear** (debajo del cuadro de búsqueda) para restablecer la búsqueda y mostrar de nuevo todo tu directorio.

:::tip
No necesitas presionar Enter. La búsqueda se ejecuta automáticamente después de que dejes de escribir.
:::

## Ordenar Resultados

Puedes ordenar el directorio haciendo clic en cualquier encabezado de columna en la vista **Table**:

1. Haz clic en un **encabezado de columna** (por ejemplo, **Name** o **Email**) para ordenar por esa columna.
2. Haz clic en el mismo encabezado nuevamente para invertir el orden de clasificación.

Esto facilita encontrar personas alfabéticamente, por edad o por cualquier otra columna visible.

## Personalizar Columnas

No es necesario que todas las piezas de información sean visibles a la vez. Puedes elegir qué columnas aparecen en la tabla:

1. Haz clic en el icono **Select columns** en el encabezado de la página People. (Las columnas se aplican a la vista **Table**.)
2. Marca o desmarca columnas para mostrarlas u ocultarlas. Las columnas disponibles incluyen:
   - **Photo**
   - **Name**
   - **Email**
   - **Phone**
   - **Address**
   - **Birth Date**
   - **Age**
   - **Gender**
   - **Membership Status**
   - **Campus**
3. La tabla se actualiza inmediatamente para reflejar tus selecciones.

### Mostrar Campos Personalizados como Columnas

El selector de columnas tiene dos pestañas: **Standard** contiene las columnas integradas listadas arriba, y **Custom** contiene los [Campos Personalizados](../settings/custom-fields.md) de tu iglesia junto con las preguntas de cualquier formulario de People. Marca un campo personalizado en la pestaña **Custom** para agregarlo como columna, y el valor de cada persona para ese campo aparece en la tabla. Los valores se muestran de la misma manera que en el perfil de la persona -- los campos Sí/No muestran *Sí* o *No*, los campos de opción múltiple muestran la etiqueta de la opción, y las fechas se muestran como fechas cortas. Las personas sin valor para el campo muestran una celda en blanco.

## Exportar Resultados de Búsqueda

Puedes descargar tus resultados de búsqueda actuales como un archivo CSV en cualquier momento:

1. Aplica cualquier búsqueda o filtro que desees.
2. Haz clic en el botón **Export** en el encabezado de la página People.
3. Un archivo CSV se descargará en tu computadora, listo para abrirse en Excel, Google Sheets o cualquier aplicación de hojas de cálculo.

Para más detalles sobre exportación, consulta [Exportar Datos](./exporting-data.md).

:::tip
Para consultas más avanzadas -- como encontrar a todos los que no han asistido en los últimos tres meses -- prueba la función [AI Search](./ai-search.md), que te permite buscar usando preguntas en lenguaje natural.
:::

## Búsqueda Avanzada

Advanced Search te permite construir filtros precisos combinando condiciones. Ábrelo haciendo clic en **Advanced** debajo del cuadro de búsqueda en la página People, luego expande una categoría y marca los campos en los que deseas filtrar, eligiendo un operador y un valor para cada uno. Las categorías incluyen **Names**, **Demographics**, **Contact**, **Membership**, **Activity** (donaciones y asistencia) y **Custom Fields**.

La categoría **Custom Fields** enumera los [Campos Personalizados](../settings/custom-fields.md) de tu iglesia -- los campos que defines en Settings para rastrear tu propia información (como una fecha de vencimiento de verificación de antecedentes). Los operadores ofrecidos coinciden con el tipo de cada campo: los campos de texto admiten *contains / equals / starts with / ends with*, los campos de número admiten operadores de comparación, los campos de fecha admiten *equals / after / before*, y los campos Sí/No y opción múltiple te permiten elegir un valor. Cualquier campo en el que puedas filtrar aquí puede guardarse como una [List](./lists.md) en vivo.

## Guardar Búsquedas como Listas

Después de ejecutar una búsqueda, un botón **Save as List** aparece en el encabezado de la página People. Haz clic en él para almacenar tu consulta actual bajo un nombre y categoría opcional, para que puedas recargarla instantáneamente en futuras sesiones. Consulta [Saved Lists](./lists.md) para obtener todos los detalles.
