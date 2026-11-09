---
title: "Campos personalizados"
description: "Defina campos personalizados en B1 Admin para registrar datos adicionales de las personas, como las fechas de vencimiento de verificaciones de antecedentes o las tallas de camiseta, y luego busque y filtre por ellos."
---

# Campos personalizados

<div class="article-intro">

**Los campos personalizados** le permiten registrar su propia información en cada registro de persona: datos para los que B1 no tiene un campo integrado, como la fecha de vencimiento de una verificación de antecedentes, la talla de camiseta o el estado de una clase de bautismo. Defina un campo una sola vez en Configuración, luego complete un valor en el perfil de cada persona y busque o cree listas basadas en él. Esto sustituye la solución anterior de crear un formulario de Personas solo para guardar un dato personalizado.

</div>

## Video de capacitación

<YouTube id="yUfDEbp2HQ4" title="Campos personalizados, edición masiva y exportación en B1" next="Crear grupos y agregar miembros en B1" nextUrl="/docs/b1-admin/groups/creating-groups" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita permiso de edición de **People** para definir campos y completar valores, y acceso al área de **Settings**. Cualquier persona con permiso de visualización de People puede ver los valores. Consulte [Roles y permisos](./roles-permissions.md).
- Decida qué desea registrar y qué tipo se ajusta mejor (texto, número, fecha, sí/no o lista de selección) antes de empezar.

</div>

## Abrir los campos personalizados

En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), elija **Settings > Settings** y haga clic en **Custom Fields** en la lista de la izquierda para desplazarse a la sección **Custom Fields**. También puede ir directamente a **/settings/custom-fields**. Verá una lista de todos los campos que ha definido, con su **Name** y su **Field Type**. Si todavía no ha creado ninguno, el panel dice *"No custom fields have been added yet."*

## Títulos

La tarjeta **Titles**, situada en la parte superior de la sección Custom Fields, enumera los títulos que se ofrecen en el cuadro **Title** al agregar o editar a una persona, tanto en B1 Admin como en la aplicación B1 (el editor de perfil y el formulario de registro de invitados). La lista empieza con Mr, Mrs, Miss, Ms, Dr, Prof, Rev y Pastor.

1. Escriba un título en **New title** (de hasta 10 caracteres), como *Deacon* o *Elder*, y haga clic en **Add Title**.
2. Para quitar un título de la lista, haga clic en la **×** de su etiqueta.
3. Haga clic en **Save**.

:::tip
El cuadro Title sigue aceptando texto libre, así que el personal y los miembros pueden escribir un título que no figure en la lista. Quitar un título de la lista no modifica a las personas que ya lo tienen.
:::

## Agregar un campo

1. Haga clic en **Add Field**.
2. En el editor que se abre a la derecha, escriba un **Name**: es la etiqueta que verá el personal en los perfiles de las personas y en la búsqueda (por ejemplo, *Background check expires*).
3. Elija un **Field Type**:
   - **Textbox** -- texto corto de formato libre.
   - **Whole Number** -- números sin decimales (por ejemplo, un recuento).
   - **Decimal** -- números que pueden incluir decimales.
   - **Date** -- una fecha del calendario.
   - **Yes/No** -- una respuesta simple de sí o no.
   - **Multiple Choice** -- una lista de selección. Al elegir este tipo, aparece un **choices editor** para agregar cada opción que las personas pueden seleccionar.
4. Haga clic en **Save**.

El campo ya estará disponible en el perfil de todas las personas.

:::info
Los tipos de campo son los mismos que se usan en las [preguntas de los formularios](../forms/creating-forms.md), así que los valores se comportan de forma coherente en todo B1.
:::

## Editar un campo

Haga clic en cualquier fila de campo de la lista para volver a abrirlo en el editor. Cambie el nombre, el tipo o las opciones, y haga clic en **Save**.

:::warning
Cambiar el **Field Type** de un campo que ya tiene valores (por ejemplo, de Textbox a Date) puede dejar los valores introducidos anteriormente en un formato que ya no coincide con el nuevo tipo. Cambie los tipos con cuidado una vez que el personal haya empezado a completar el campo.
:::

## Eliminar un campo

Abra un campo para editarlo y haga clic en **Delete**. Se le pedirá que confirme: *"Are you sure you wish to delete this custom field? Its stored values will also be removed."* Eliminar un campo lo quita de forma permanente **y borra todos los valores guardados para él** en todas las personas. Esta acción no se puede deshacer.

## Completar valores en una persona

Una vez que exista al menos un campo personalizado, sus valores aparecen junto a los datos integrados del registro de cada persona: los ve con los datos de contacto de la persona, a la izquierda de su perfil, y los edita en el mismo formulario que usa para el resto de la información de la persona. No aparece nada adicional hasta que defina su primer campo.

1. Abra el registro de una persona en **People**.
2. Haga clic en el botón **Edit** a la izquierda del perfil, debajo de los datos de contacto de la persona.
3. Desplácese hasta el área **Custom Fields**, al final del formulario de edición, y complete un valor para cada campo. Cada campo muestra el control que corresponde a su tipo: un selector de fecha para los campos Date, una lista de sí/no para los campos Yes/No, una lista de selección para Multiple Choice, etc.
4. Haga clic en **Save**. Los valores de los campos personalizados se guardan junto con el resto de los datos de la persona.

De vuelta en el perfil, cualquier campo que tenga un valor aparece debajo de los datos de contacto de la persona como *Field name: value* (las respuestas Yes/No se muestran como *Yes* o *No*, y Multiple Choice muestra la etiqueta de la opción). Los campos en blanco simplemente se ocultan. Para quitar un valor, edite a la persona, borre el campo y guarde: un valor vacío se elimina del registro en lugar de guardarse como vacío.

:::tip
El caso de uso clásico es la seguridad de los voluntarios: cree un campo **Date** llamado *Background check expires*, registre la fecha de cada voluntario y luego cree una [lista guardada](../people/lists.md) que marque a quienes ya hayan superado esa fecha.
:::

## Buscar y crear listas con campos personalizados

Los campos personalizados se pueden buscar por completo:

1. En la página **People**, abra la [búsqueda avanzada](../people/searching-people.md).
2. Expanda la categoría **Custom Fields**.
3. Marque el campo por el que quiere filtrar, elija un operador e introduzca un valor. Los operadores disponibles coinciden con el tipo del campo:
   - **Textbox** -- contains, equals, starts with, ends with.
   - **Whole Number / Decimal** -- equals, greater than, greater than or equal, less than, less than or equal.
   - **Date** -- equals, after (greater than), before (less than).
   - **Yes/No** -- equals Yes o No.
   - **Multiple Choice** -- equals o contains una de las opciones.

Guarde cualquier búsqueda de campos personalizados como una [lista](../people/lists.md). Las listas son consultas dinámicas, así que una lista creada con *Background check expires is before today* vuelve a revisar a todas las personas cada vez que la abre, sin necesidad de mantenimiento manual.

## Mostrar un campo personalizado como columna

Para ver los valores de un campo para todos a la vez, agréguelo como columna en la página **People**. Cambie **View as** a **Table**, haga clic en el icono **Select columns** del encabezado de la página, cambie a la pestaña **Custom** y marque el campo. El valor de cada persona aparece en su propia columna junto a las integradas. Consulte [Mostrar campos personalizados como columnas](../people/searching-people.md#showing-custom-fields-as-columns).

## Qué ocurre al combinar

Al [combinar dos registros de personas](../people/adding-people.md), los valores de los campos personalizados se conservan automáticamente. La persona que se mantiene conserva sus propios valores; en cualquier campo en el que solo la persona eliminada tenía un valor, ese valor se copia para que no se pierda nada.

## Artículos relacionados

- [Buscar personas](../people/searching-people.md) — búsqueda avanzada, incluida la categoría Custom Fields, y cómo mostrar campos personalizados como columnas
- [Listas guardadas](../people/lists.md) — guarde una búsqueda de campos personalizados y vuelva a ejecutarla en tiempo real
- [Roles y permisos](./roles-permissions.md) — quién puede definir campos y editar valores
- [Crear formularios](../forms/creating-forms.md) — para la recopilación de datos con varias preguntas, cuando un formulario completo encaja mejor que campos individuales
