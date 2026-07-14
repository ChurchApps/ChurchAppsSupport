---
title: "Búsqueda de Personas"
---

# Búsqueda de Personas

<div class="article-intro">

La página **Personas** muestra tu directorio de iglesia en una tabla buscable y ordenable. Puedes encontrar rápidamente a cualquiera en tu congregación, personalizar qué información se muestra, y exportar tus resultados. La búsqueda eficiente es esencial para tareas diarias de administración de iglesia como seguimiento de visitantes, preparación de listas de contactos, y gestión de registros de miembros.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesitas una cuenta activa de B1 Admin con permiso para ver personas. Consulta [Roles y Permisos](roles-permissions.md) si no estás seguro sobre tu nivel de acceso.
- Tu directorio de iglesia debe tener personas. Si no has agregado a nadie todavía, consulta [Agregar Personas](adding-people.md) o [Importar Datos](importing-data.md).

</div>

## Búsqueda Rápida

El cuadro de búsqueda en la parte superior de la página Personas te permite encontrar miembros en tiempo real:

1. Haz clic en el **cuadro de búsqueda** en la parte superior de la página Personas.
2. Comienza a escribir un nombre, correo, u otra palabra clave.
3. Los resultados se filtrarán automáticamente mientras escribes (hay un breve retraso de aproximadamente medio segundo para que la búsqueda no se ejecute en cada pulsación de tecla).
4. La tabla de abajo se actualiza para mostrar solo los resultados coincidentes.

:::tip
No necesitas presionar Enter. La búsqueda se ejecuta automáticamente después de que dejes de escribir.
:::

## Ordenar resultados

Puedes ordenar el directorio haciendo clic en cualquier encabezado de columna en la tabla:

1. Haz clic en un **encabezado de columna** (por ejemplo, **Nombre** o **Correo**) para ordenar por esa columna.
2. Haz clic en el mismo encabezado nuevamente para invertir el orden de clasificación.

Esto hace que sea fácil encontrar personas alfabéticamente, por edad, o por cualquier otra columna visible.

## Personalizar columnas

No todas las piezas de información necesitan ser visibles a la vez. Puedes elegir qué columnas aparecen en la tabla:

1. Busca el **menú desplegable del selector de columnas** cerca de la parte superior de la tabla.
2. Marca o desmarca las columnas para mostrarlas u ocultarlas. Las columnas disponibles incluyen:
   - **Foto**
   - **Nombre**
   - **Correo**
   - **Teléfono**
   - **Dirección**
   - **Fecha de Nacimiento**
   - **Edad**
   - **Género**
   - **Estado de Membresía**
   - **Sede**
3. La tabla se actualiza inmediatamente para reflejar tus selecciones.

:::info
Tus selecciones de columnas afectan qué se incluye cuando exportas a CSV. Personaliza columnas antes de exportar para obtener exactamente los datos que necesitas.
:::

## Paginación

Cuando tu directorio tiene muchos registros, los resultados se dividen en páginas. Usa los **controles de paginación** en la parte inferior de la tabla para moverte entre páginas. La página actual y el recuento total de registros se muestran para que siempre sepas dónde estás en la lista.

:::tip
Si deseas ver más resultados a la vez, refina tu búsqueda para limitar la lista en lugar de paginar a través de un directorio grande.
:::

## Exportar resultados de búsqueda

Puedes descargar tus resultados de búsqueda actuales como un archivo CSV en cualquier momento:

1. Aplica cualquier búsqueda o filtro que desees.
2. Personaliza tus columnas para incluir los datos que necesitas.
3. Haz clic en el botón **Exportar**.
4. Un archivo CSV se descargará a tu computadora, listo para abrir en Excel, Google Sheets, o cualquier aplicación de hoja de cálculo.

Para más detalles sobre exportación, consulta [Exportar Datos](./exporting-data.md).

:::tip
Para consultas más avanzadas -- como encontrar a todos los que no han asistido en los últimos tres meses -- prueba la característica [Búsqueda IA](./ai-search.md), que te permite buscar usando preguntas en lenguaje natural.
:::

## Búsqueda Avanzada

Búsqueda Avanzada te permite construir filtros precisos combinando condiciones. Ábrela desde la página Personas, luego expande una categoría y marca los campos sobre los que deseas filtrar, eligiendo un operador y valor para cada uno. Las categorías incluyen **Nombres**, **Demografía**, **Contacto**, **Membresía**, **Actividad** (donaciones y asistencia), y **Campos Personalizados**.

La categoría **Campos Personalizados** lista los [Campos Personalizados](../settings/custom-fields.md) de tu iglesia -- los campos que defines en Configuración para rastrear tu propia información (como una fecha de expiración de verificación de antecedentes). Los operadores ofrecidos coinciden con el tipo de cada campo: campos de texto soportan *contiene / es igual a / comienza con / termina con*, campos de número soportan los operadores de comparación, campos de fecha soportan *es igual a / después / antes*, y campos Sí/No y opción múltiple te permiten elegir un valor. Cualquier campo sobre el que puedas filtrar aquí puede ser guardado como una [Lista](./lists.md) en vivo.

## Guardar búsquedas como listas

Después de ejecutar una búsqueda, aparece un botón **Guardar como Lista** (icono de marcador) en el encabezado de la página Personas. Haz clic en él para guardar tu consulta actual bajo un nombre y categoría opcional, para que puedas recargarlo instantáneamente en futuras sesiones. Consulta [Listas Guardadas](./lists.md) para detalles completos.
