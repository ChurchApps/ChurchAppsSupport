---
title: "Buscar Personas"
---

# Buscar Personas

<div class="article-intro">

La página **People** muestra tu directorio de iglesia en una tabla que se puede buscar y ordenar. Puedes encontrar rápidamente a cualquiera de tu congregación, personalizar qué información se muestra y exportar tus resultados. La búsqueda eficiente es esencial para tareas cotidianas de administración de iglesias como hacer seguimiento de visitantes, preparar listas de contactos y gestionar registros de miembros.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Necesitas una cuenta B1 Admin activa con permiso para ver personas. Consulta [Roles y Permisos](roles-permissions.md) si no estás seguro de tu nivel de acceso.
- Tu directorio de iglesia debe tener personas en él. Si aún no has agregado a nadie, consulta [Agregar Personas](adding-people.md) o [Importar Datos](importing-data.md).

</div>

## Búsqueda Rápida

La barra de búsqueda en la parte superior de la página People te permite encontrar miembros en tiempo real:

1. Haz clic en el **cuadro de búsqueda** en la parte superior de la página People.
2. Comienza a escribir un nombre, correo electrónico u otra palabra clave.
3. Los resultados se filtrarán automáticamente a medida que escribas (hay un breve retraso de aproximadamente medio segundo para que la búsqueda no se ejecute en cada pulsación de tecla).
4. La tabla a continuación se actualiza para mostrar solo los resultados coincidentes.

:::tip
No necesitas presionar Enter. La búsqueda se ejecuta automáticamente después de que dejes de escribir.
:::

## Ordenar Resultados

Puedes ordenar el directorio haciendo clic en cualquier encabezado de columna en la tabla:

1. Haz clic en un **encabezado de columna** (por ejemplo, **Name** o **Email**) para ordenar por esa columna.
2. Haz clic en el mismo encabezado nuevamente para invertir el orden de clasificación.

Esto facilita encontrar personas alfabéticamente, por edad o por cualquier otra columna visible.

## Personalizar Columnas

No es necesario que todas las piezas de información sean visibles a la vez. Puedes elegir qué columnas aparecen en la tabla:

1. Busca el **desplegable del selector de columnas** cerca de la parte superior de la tabla.
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

:::info
Tus selecciones de columnas afectan lo que se incluye cuando exportas a CSV. Personaliza columnas antes de exportar para obtener exactamente los datos que necesitas.
:::

## Paginación

Cuando tu directorio tiene muchos registros, los resultados se dividen en páginas. Usa los **controles de paginación** en la parte inferior de la tabla para moverte entre páginas. La página actual y el recuento total de registros se muestran para que siempre sepas dónde estás en la lista.

:::tip
Si deseas ver más resultados a la vez, refina tu búsqueda para reducir la lista en lugar de paginar a través de un directorio grande.
:::

## Exportar Resultados de Búsqueda

Puedes descargar tus resultados de búsqueda actuales como un archivo CSV en cualquier momento:

1. Aplica cualquier búsqueda o filtro que desees.
2. Personaliza tus columnas para incluir los datos que necesitas.
3. Haz clic en el botón **Export**.
4. Un archivo CSV se descargará en tu computadora, listo para abrirse en Excel, Google Sheets o cualquier aplicación de hojas de cálculo.

Para más detalles sobre exportación, consulta [Exportar Datos](./exporting-data.md).

:::tip
Para consultas más avanzadas -- como encontrar a todos los que no han asistido en los últimos tres meses -- prueba la función [AI Search](./ai-search.md), que te permite buscar usando preguntas en lenguaje natural.
:::

## Búsqueda Avanzada

Advanced Search te permite construir filtros precisos combinando condiciones. Ábrelo desde la página People, luego expande una categoría y marca los campos en los que deseas filtrar, eligiendo un operador y un valor para cada uno. Las categorías incluyen **Names**, **Demographics**, **Contact**, **Membership**, **Activity** (donaciones y asistencia) y **Custom Fields**.

La categoría **Custom Fields** enumera los [Campos Personalizados](../settings/custom-fields.md) de tu iglesia -- los campos que defines en Settings para rastrear tu propia información (como una fecha de vencimiento de verificación de antecedentes). Los operadores ofrecidos coinciden con el tipo de cada campo: los campos de texto admiten *contains / equals / starts with / ends with*, los campos de número admiten operadores de comparación, los campos de fecha admiten *equals / after / before*, y los campos Sí/No y opción múltiple te permiten elegir un valor. Cualquier campo en el que puedas filtrar aquí puede guardarse como una [List](./lists.md) en vivo.

## Guardar Búsquedas como Listas

Después de ejecutar una búsqueda, un botón **Save as List** (icono de marcador) aparece en el encabezado de la página People. Haz clic en él para almacenar tu consulta actual bajo un nombre y categoría opcional, para que puedas recargarla instantáneamente en futuras sesiones. Consulta [Saved Lists](./lists.md) para obtener todos los detalles.
