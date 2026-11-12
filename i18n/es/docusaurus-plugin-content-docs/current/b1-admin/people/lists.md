---
title: "Listas guardadas"
description: "Guarde una búsqueda de People en B1 Admin como una lista con nombre y vuelva a cargarla con un solo clic. Las listas se mantienen actualizadas, así que los miembros nuevos que coincidan aparecen automáticamente."
---

# Listas guardadas

<div class="article-intro">

Las **Listas guardadas** le permiten almacenar una consulta de búsqueda con un nombre y volver a ejecutarla con un solo clic en cualquier momento. Cree una lista una vez, como "Miembros activos del campus Norte", "Visitantes de los últimos 90 días" o cualquier filtro avanzado, y se mantendrá en la parte superior de la página People para que nunca tenga que volver a construir la consulta.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Haga al menos una búsqueda en la sección People para tener resultados que guardar. Consulte [Búsqueda de personas](./searching-people.md) o [Búsqueda con IA](./ai-search.md).
- Guardar, cambiar y eliminar listas requiere el permiso **Edit People**. Consulte [Asignación de roles](./roles-permissions.md).

</div>

## Cómo guardar una búsqueda como lista {#saving-a-search-as-a-list}

1. Haga una búsqueda en la página **People**: una búsqueda rápida, una búsqueda con IA o una búsqueda con filtros avanzados.
2. Cuando la búsqueda encuentre al menos una persona, aparecerá un botón **Save as List** en el encabezado de la página People.
3. Haga clic en **Save as List**.
4. Escriba un **List Name** (obligatorio).
5. Opcionalmente, escriba una **Category** para agrupar listas relacionadas (por ejemplo, "Alcance" o "Membresía").
6. En **Who can see this list**, elija **All staff** o **Only me**.
7. En **Match**, elija **All filters** (las personas deben cumplir todos los filtros) o **Any filter** (personas que cumplan al menos un filtro).
8. En **Include household**, elija **Matches only** (solo las coincidencias), **Children of matches** (agrega también a los hijos del hogar de cada persona coincidente) o **Entire household** (agrega a todas las personas del hogar de cada persona coincidente).
9. Opcionalmente, marque **Refresh nightly** (vea [Actualización nocturna](#nightly-refresh) más abajo). Cuando está marcado, también puede marcar **Email me when membership changes**.
10. Haga clic en **Save**.

La lista ya está guardada y aparece como un botón en la fila de listas guardadas, en la parte superior de la página People, junto a **Everyone**. Las listas marcadas como **Only me** muestran un pequeño icono de candado.

:::info
Las listas configuradas como **All staff** se comparten en toda su iglesia: cualquier persona con acceso a People puede verlas y cargarlas. Solo el personal con el permiso adecuado puede cambiar o eliminar listas.
:::

## Cómo cargar una lista guardada {#loading-a-saved-list}

En la parte superior de la página People, haga clic en el nombre de cualquier lista. La búsqueda se vuelve a ejecutar al instante con la consulta guardada, actualizando los resultados. Haga clic en **Everyone** para volver a todo su directorio.

Las listas se agrupan por categoría (si asignó una), y las listas sin categoría aparecen al final.

:::tip
Las listas son **consultas en vivo**, no instantáneas. Cada vez que carga una lista, la búsqueda se ejecuta de nuevo con sus datos actuales, así que aparecerán las personas nuevas que ahora cumplan los criterios.
:::

## Cómo renombrar y eliminar listas {#renaming-and-deleting-lists}

El personal con permiso de administración puede renombrar o eliminar cualquier lista desde la página People. Primero haga clic en la lista para cargarla: aparecerán dos iconos junto a su nombre:

- Haga clic en el icono **List Settings** (engranaje) para renombrarla o cambiar su categoría y uso compartido. Las listas guardadas con estas opciones también pueden cambiar **Include household**, **Refresh nightly** y **Email me when membership changes** aquí. La configuración **Match** no se puede cambiar después de guardar la lista.
- Haga clic en el icono **Delete** (papelera) para eliminarla (se le pedirá que confirme).

## Actualización nocturna {#nightly-refresh}

Al cargar una lista siempre se ejecuta su búsqueda de nuevo, tenga o no marcada la opción **Refresh nightly**. **Refresh nightly** además hace que B1 vuelva a ejecutar la lista cada noche y lleve un registro de quién se unió a ella o salió de ella. Si marcó **Email me when membership changes**, B1 le envía un correo electrónico (a usted, quien guardó la lista) después de una actualización nocturna que agregó o quitó a alguien, indicando cuántas personas se agregaron y se quitaron. La actualización nocturna también envía los cambios de membresía de la lista a sus [integraciones](../integrations/index.md), como las etiquetas de Mailchimp.

## Casos de uso {#use-cases}

| Escenario | Cómo crear la lista |
|---|---|
| Todos los visitantes | Búsqueda avanzada: Membership Status = Visitor |
| Miembros de un campus específico | Búsqueda avanzada: Campus = [su campus] |
| Voluntarios con una verificación de antecedentes vencida | Búsqueda avanzada: [Campo personalizado](../settings/custom-fields.md) "Background check expires" es anterior a hoy |
| Resultados de una pregunta con IA | Haga una pregunta en AI Search y luego guárdela |

## Artículos relacionados {#related-articles}

- [Búsqueda de personas](./searching-people.md): búsqueda rápida y personalización de columnas
- [Búsqueda con IA](./ai-search.md): consultas en lenguaje natural que puede guardar como listas
- [Campos personalizados](../settings/custom-fields.md): defina sus propios campos de persona, y luego filtre y guarde listas con ellos
- [Demografía](./demographics.md): profundice en un gráfico demográfico para crear un filtro de People y guárdelo como lista
- [Edición masiva](./bulk-editing.md): después de cargar una lista, actualice a todos sus miembros a la vez
