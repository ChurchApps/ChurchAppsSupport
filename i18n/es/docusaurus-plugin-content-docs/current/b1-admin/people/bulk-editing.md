---
title: "Edición masiva de personas"
description: "Actualice el estado de membresía, el estado civil, el género, la exclusión del directorio, el campus, los campos personalizados de Sí/No o los grupos de muchas personas a la vez en B1 Admin."
---

# Edición masiva de personas

<div class="article-intro">
La edición masiva le permite actualizar varias personas a la vez, lo que ahorra tiempo cuando hace el mismo cambio a muchas personas. Puede actualizar el estado de membresía, el estado civil, el género, la exclusión del directorio, el campus, los campos personalizados de Sí/No, las membresías de grupo y los flujos de trabajo en una sola operación, o eliminar personas.
</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita permiso para administrar los datos de personas. Consulte [Roles y permisos](./roles-permissions.md) para más detalles.
- Ya debe haber agregado o importado a las personas que desea editar. Consulte [Cómo agregar personas](./adding-people.md) si lo necesita.
</div>

## Cómo seleccionar personas para la edición masiva {#selecting-people-for-bulk-editing}

1. Vaya a **People** en B1 Admin
2. Use las herramientas de búsqueda o filtro para encontrar a las personas que desea actualizar
3. Marque las casillas para seleccionar personas
   - En la vista **Households**, al marcar un hogar se seleccionan todas las personas que lo integran
   - En la vista **Table** (cambie con el botón **View as**), puede seleccionar personas individualmente
   - O use la casilla sobre la lista para seleccionar a todas las personas visibles
4. Una vez que haya seleccionado al menos una persona, la barra sobre la lista muestra cuántas están seleccionadas, junto con **Clear Selection** y un botón **Actions**

:::tip
Si necesita actualizar un grupo grande de personas según criterios específicos, use la función [Búsqueda con IA](./ai-search.md) o los filtros para reducir primero su lista, y luego seleccione a todas las personas que coincidan.
:::

## Acciones masivas disponibles {#available-bulk-actions}

El menú **Actions** ofrece las opciones que se indican a continuación. Cada una abre un cuadro de diálogo pequeño que le indica cuántas personas va a cambiar; elija un valor y haga clic en **Apply**. El nuevo valor reemplaza lo que cada persona seleccionada tenía antes. Cuando termina, un mensaje en la parte inferior de la página confirma cuántas personas se actualizaron.

### Set Membership Status {#set-membership-status}

1. Haga clic en **Actions** → **Set Membership Status**
2. Elija el nuevo **Membership Status**:
   - **Visitor** -- Visitantes primerizos u ocasionales
   - **Guest** -- Invitados, como familias registradas en un quiosco de registro de entrada
   - **Regular Attendee** -- Asistentes frecuentes que no son miembros
   - **Member** -- Miembros oficiales de la iglesia
   - **Staff** -- Miembros del personal de la iglesia
   - **Inactive** -- Personas que ya no asisten
   - **Deceased** -- Personas que han fallecido
3. Haga clic en **Apply**

### Set Marital Status {#set-marital-status}

1. Haga clic en **Actions** → **Set Marital Status**
2. Elija **Unknown**, **Single**, **Married**, **Divorced** o **Widowed**
3. Haga clic en **Apply**

### Set Gender {#set-gender}

1. Haga clic en **Actions** → **Set Gender**
2. Elija **Unspecified**, **Male** o **Female**
3. Haga clic en **Apply**

### Set Directory Opt-Out {#set-directory-opt-out}

La exclusión del directorio controla si las personas aparecen en el directorio de miembros: el [directorio impreso](./print-directory.md) y el directorio de miembros de la aplicación B1. Es la misma configuración que **Hide me from the member directory** en el registro de una persona.

1. Haga clic en **Actions** → **Set Directory Opt-Out**
2. Elija **Opted Out Yes** para ocultar a las personas seleccionadas del directorio, o **Opted Out No** para volver a mostrarlas
3. Haga clic en **Apply**

:::warning
Las personas que eligieron ocultarse del directorio deben permanecer ocultas, a menos que pidan volver a aparecer en él.
:::

### Set Campus {#set-campus}

Esta opción aparece cuando su iglesia tiene [campus](../settings/campuses.md) configurados.

1. Haga clic en **Actions** → **Set Campus**
2. Elija el campus
3. Haga clic en **Apply**

### Set Custom Field {#set-custom-field}

Establezca un valor de [campo personalizado](../settings/custom-fields.md) de Sí/No para todas las personas seleccionadas a la vez:

1. Haga clic en **Actions** → **Set Custom Field**.
2. Elija el **Custom Field** de Sí/No que desea establecer.
3. Elija el **Value** (**Yes** o **No**) que desea aplicar.
4. Haga clic en **Apply**.

:::info
Solo los campos personalizados de Sí/No están disponibles para esta acción masiva. Para establecer otros tipos de campos, edite cada persona individualmente. Si su iglesia no tiene campos personalizados de Sí/No, el cuadro de diálogo lo indicará.
:::

### Add to Group {#add-to-group}

1. Haga clic en **Actions** → **Add to Group**
2. Elija el **Group** al que agregar a las personas. Para ponerlas en un grupo nuevo, marque **Create New Group** y escriba un **New Group Name**.
3. Haga clic en **Apply**

Cada persona se agrega como miembro regular del grupo. Más adelante puede promover a algunas personas a líderes de grupo desde la página [Miembros del grupo](../groups/group-members.md). Para agregar personas a varios grupos, repita esto para cada grupo.

### Remove from Group {#remove-from-group}

1. Haga clic en **Actions** → **Remove from Group**
2. Elija el **Group** del que quitar a las personas
3. Haga clic en **Apply**

:::info
Esta acción solo quita a las personas del grupo. No elimina sus registros de persona.
:::

### Add to Workflow {#add-to-workflow}

Agregue las personas seleccionadas a un [flujo de trabajo](../serving/workflows.md) como tarjetas:

1. Haga clic en **Actions** → **Add to Workflow**
2. Elija el flujo de trabajo
3. Haga clic en **Apply**

### Delete People {#delete-people}

Elimine de la base de datos de su iglesia a las personas seleccionadas:

1. Haga clic en **Actions** → **Delete**
2. El cuadro de diálogo **Delete Selected People** le pide que confirme cuántas personas se eliminarán
3. Haga clic en **Delete**

:::danger
Las personas eliminadas desaparecen de su directorio, sus grupos y sus búsquedas. Use esta acción solo si está seguro de que quiere quitar a estas personas de su sistema.
:::

No puede seleccionarse a sí mismo, así que no puede eliminar ni editar masivamente su propio registro.


## Buenas prácticas {#best-practices}

- **Empiece con pocos registros** -- Pruebe las operaciones masivas con unos pocos registros primero para asegurarse de que hace los cambios correctos
- **Use filtros** -- Reduzca su lista con filtros o búsqueda con IA antes de seleccionar personas, para asegurarse de que solo actualiza a las personas correctas
- **Revise bien la selección** -- Revise las personas seleccionadas antes de aplicar cambios masivos
- **Documente los cambios importantes** -- Guarde notas sobre las actualizaciones masivas por si necesita consultarlas más adelante
- **Coordínese con su equipo** -- Avise a los demás administradores cuando haga cambios masivos importantes

## Casos de uso comunes {#common-use-cases}

### Actualizar a miembros nuevos {#updating-new-members}

Después de una clase de membresía, actualice a todos los asistentes al estado de Member:

1. Busque a las personas que asistieron a la clase
2. Selecciónelas a todas
3. Use **Actions** → **Set Membership Status** → **Member**

### Organizar grupos pequeños {#organizing-small-groups}

Agregue varias personas a un grupo pequeño nuevo:

1. Busque a las personas que quiere en el grupo
2. Selecciónelas
3. Use **Actions** → **Add to Group** y seleccione el grupo pequeño

### Limpiar los datos {#cleaning-up-data}

Marque como inactivos a un grupo de antiguos asistentes:

1. Abra la búsqueda **Advanced** y filtre a las personas que quiere actualizar (por ejemplo, todas las que no han asistido recientemente)
2. Selecciónelas
3. Use **Actions** → **Set Membership Status** → **Inactive**

## Artículos relacionados {#related-articles}

- [Búsqueda de personas](./searching-people.md) -- Encuentre personas para editar
- [Búsqueda con IA](./ai-search.md) -- Use lenguaje natural para encontrar grupos específicos de personas
- [Miembros del grupo](../groups/group-members.md) -- Administre la membresía de grupos
- [Exportación de datos](./exporting-data.md) -- Exporte los datos de personas antes de hacer cambios masivos
