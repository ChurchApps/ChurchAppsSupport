---
title: "Campos personalizados"
---

# Campos personalizados

<div class="article-intro">

Los **Custom Fields** te permiten registrar tu propia información en cada registro de persona — cosas para las que B1 no tiene un campo integrado, como una fecha de vencimiento de verificación de antecedentes, una talla de camiseta o el estado de una clase de bautismo. Defines un campo una vez en Settings, luego completas un valor en el perfil de cada persona y puedes buscar o crear listas a partir de él. Esto reemplaza la antigua solución de crear un formulario de People solo para almacenar un único dato personalizado.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesitas permiso de edición de **People** para definir campos y completar valores, y acceso al área de **Settings**. Cualquier persona con permiso de vista de People puede ver los valores. Consulta [Roles y permisos](./roles-permissions.md).
- Decide qué quieres registrar y qué tipo se ajusta mejor (texto, un número, una fecha, una respuesta de sí/no, o una lista de opciones) antes de comenzar.

</div>

## Abrir Custom Fields

En B1 Admin, ve a **Settings** en la barra lateral izquierda y selecciona la tarjeta **Custom Fields**. También puedes ir directamente a **/settings/custom-fields**. Verás una lista de todos los campos que has definido, mostrando su **Name** y **Field Type**. Si aún no has creado ninguno, el panel indica *"No custom fields have been added yet."*

## Agregar un campo

1. Haz clic en **Add Field**.
2. En el editor que se abre a la derecha, ingresa un **Name** — esta es la etiqueta que el personal verá en los perfiles de las personas y en la búsqueda (por ejemplo, *Background check expires*).
3. Elige un **Field Type**:
   - **Textbox** — texto corto de formato libre.
   - **Whole Number** — números sin decimales (por ejemplo, un conteo).
   - **Decimal** — números que pueden incluir decimales.
   - **Date** — una fecha del calendario.
   - **Yes/No** — una simple respuesta de sí o no.
   - **Multiple Choice** — una lista de opciones. Cuando eliges este tipo, aparece un **editor de opciones** para que agregues cada alternativa que las personas puedan seleccionar.
4. Haz clic en **Save**.

El campo ahora está disponible en el perfil de cada persona.

:::info
Los tipos de campo son el mismo conjunto usado para las [preguntas de formulario](../forms/creating-forms.md), por lo que los valores se comportan de manera consistente en toda la aplicación B1.
:::

## Editar un campo

Haz clic en cualquier fila de campo en la lista para volver a abrirlo en el editor. Cambia el nombre, el tipo o las opciones y haz clic en **Save**.

:::warning
Cambiar el **Field Type** de un campo que ya tiene valores (por ejemplo, de Textbox a Date) puede dejar los valores ingresados previamente en un formato que ya no coincide con el nuevo tipo. Cambia los tipos con cuidado una vez que el personal haya comenzado a completar el campo.
:::

## Eliminar un campo

Abre un campo para editarlo y haz clic en **Delete**. Se te pedirá que confirmes: *"Are you sure you wish to delete this custom field? Its stored values will also be removed."* Eliminar un campo lo elimina permanentemente **junto con todos los valores almacenados** para él en todas las personas; esto no se puede deshacer.

## Completar valores en una persona

Una vez que existe al menos un campo personalizado, sus valores conviven con los detalles integrados en el registro de cada persona — los ves en **Personal Details** y los editas en el mismo formulario que usas para el resto de la información de la persona. No aparece nada adicional hasta que hayas definido tu primer campo.

1. Abre el registro de una persona en **People**.
2. En la sección **Personal Details**, haz clic en el botón **Edit** (lápiz).
3. Desplázate hasta el área **Custom Fields** en la parte inferior del formulario de edición y completa un valor para cada campo. Cada campo muestra la entrada que coincide con su tipo — un selector de fecha para los campos Date, un menú desplegable de sí/no para los campos Yes/No, una lista de opciones para Multiple Choice, y así sucesivamente.
4. Haz clic en **Save**. Los valores de tus campos personalizados se guardan junto con el resto de los detalles de la persona.

De vuelta en el perfil, cualquier campo que tenga un valor ahora se muestra en la sección **Personal Details** (las respuestas de Yes/No se leen como *Yes* o *No*, y Multiple Choice muestra la etiqueta de la opción). Los campos que quedan en blanco simplemente se ocultan. Para eliminar un valor, edita la persona, borra el campo y guarda — un valor vacío se elimina del registro en lugar de almacenarse en blanco.

:::tip
El caso de uso clásico es la seguridad de los voluntarios: crea un campo **Date** llamado *Background check expires*, registra la fecha de cada voluntario y luego crea una [lista guardada](../people/lists.md) que marque a cualquiera cuya fecha haya pasado.
:::

## Buscar y crear listas con campos personalizados

Los campos personalizados son totalmente buscables:

1. En la página **People**, abre la [búsqueda avanzada](../people/searching-people.md).
2. Expande la categoría **Custom Fields**.
3. Marca el campo que quieres filtrar, elige un operador e ingresa un valor. Los operadores ofrecidos coinciden con el tipo del campo:
   - **Textbox** — contiene, es igual a, comienza con, termina con.
   - **Whole Number / Decimal** — es igual a, mayor que, mayor o igual que, menor que, menor o igual que.
   - **Date** — es igual a, después de (mayor que), antes de (menor que).
   - **Yes/No** — es igual a Yes o No.
   - **Multiple Choice** — es igual a o contiene una de las opciones.

Guarda cualquier búsqueda de campo personalizado como una [lista](../people/lists.md). Las listas son consultas en vivo, así que una lista creada con *Background check expires is before today* vuelve a comprobar a cada persona cada vez que la abres — sin mantenimiento manual.

## Qué sucede al fusionar

Cuando [fusionas dos registros de persona](../people/adding-people.md), los valores de los campos personalizados se trasladan automáticamente. La persona que conservas mantiene sus propios valores; para cualquier campo en el que solo la persona eliminada tuviera un valor, ese valor se copia para que no se pierda nada.

## Artículos relacionados

- [Buscar personas](../people/searching-people.md) — búsqueda avanzada, incluida la categoría Custom Fields
- [Listas guardadas](../people/lists.md) — guarda una búsqueda de campo personalizado y vuelve a ejecutarla en vivo
- [Roles y permisos](./roles-permissions.md) — quién puede definir campos y editar valores
- [Crear formularios](../forms/creating-forms.md) — para la recopilación de datos con varias preguntas cuando un formulario completo se ajusta mejor que campos individuales
