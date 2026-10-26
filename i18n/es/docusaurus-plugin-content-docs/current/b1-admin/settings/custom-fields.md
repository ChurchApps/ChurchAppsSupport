---
title: "Campos personalizados"
---

# Campos personalizados

<div class="article-intro">

**Los campos personalizados** le permiten registrar su propia información en cada registro de persona: datos que B1 no tiene como campo integrado, como la fecha de vencimiento de una verificación de antecedentes, la talla de camiseta o el estado de una clase de bautismo. Define un campo una sola vez en Configuración, luego completa un valor en el perfil de cada persona y puede buscar o crear listas con él. Esto reemplaza la solución anterior de crear un formulario de Personas solo para guardar un dato personalizado.

</div>

## Video de capacitación

<YouTube id="yUfDEbp2HQ4" title="Campos personalizados, edición masiva y exportación en B1" next="Crear grupos y agregar miembros en B1" nextUrl="/docs/b1-admin/groups/creating-groups" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita permiso de edición de **Personas** para definir campos y completar valores, y acceso al área de **Configuración**. Cualquier persona con permiso de visualización de Personas puede ver los valores. Consulte [Roles y permisos](./roles-permissions.md).
- Decida qué desea registrar y qué tipo se ajusta mejor (texto, número, fecha, sí/no o lista de selección) antes de empezar.

</div>

## Abrir Campos personalizados

En B1 Admin, abra el [menú de salto](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), elija **Configuración > Configuración** y haga clic en **Campos personalizados** en la lista de la izquierda para desplazarse a la sección **Campos personalizados**. También puede ir directamente a **/settings/custom-fields**. Verá una lista de todos los campos que ha definido, con su **Nombre** y **Tipo de campo**. Si todavía no ha creado ninguno, el panel dice *"Todavía no se han agregado campos personalizados."*

## Agregar un campo

1. Haga clic en **Agregar campo**.
2. En el editor que se abre a la derecha, escriba un **Nombre**. Es la etiqueta que verá el personal en los perfiles de las personas y en la búsqueda (por ejemplo, *Vencimiento de verificación de antecedentes*).
3. Elija un **Tipo de campo**:
   - **Cuadro de texto**: texto corto de formato libre.
   - **Número entero**: números sin decimales (por ejemplo, un conteo).
   - **Decimal**: números que pueden incluir decimales.
   - **Fecha**: una fecha del calendario.
   - **Sí/No**: una respuesta simple de sí o no.
   - **Opción múltiple**: una lista de selección. Al elegir este tipo, aparece un **editor de opciones** para agregar cada opción que las personas pueden seleccionar.
4. Haga clic en **Guardar**.

El campo ya está disponible en el perfil de todas las personas.

:::info
Los tipos de campo son los mismos que se usan en las [preguntas de formularios](../forms/creating-forms.md), así que los valores se comportan de forma coherente en todo B1.
:::

## Editar un campo

Haga clic en cualquier fila de campo de la lista para volver a abrirlo en el editor. Cambie el nombre, el tipo o las opciones, y haga clic en **Guardar**.

:::warning
Cambiar el **Tipo de campo** de un campo que ya tiene valores (por ejemplo, de Cuadro de texto a Fecha) puede dejar los valores ingresados anteriormente en un formato que ya no coincide con el nuevo tipo. Cambie los tipos con cuidado una vez que el personal haya empezado a completar el campo.
:::

## Eliminar un campo

Abra un campo para editarlo y haga clic en **Eliminar**. Se le pedirá que confirme: *"¿Está seguro de que desea eliminar este campo personalizado? También se eliminarán sus valores almacenados."* Al eliminar un campo, se quita de forma permanente **y se borran todos los valores almacenados** en todas las personas. Esta acción no se puede deshacer.

## Completar valores en una persona

Una vez que exista al menos un campo personalizado, sus valores aparecen junto a los datos integrados en el registro de cada persona: los ve con los datos de contacto de la persona, a la izquierda de su perfil, y los edita en el mismo formulario que usa para el resto de su información. No aparece nada adicional hasta que defina su primer campo.

1. Abra el registro de una persona en **Personas**.
2. Haga clic en el botón **Editar** a la izquierda del perfil, debajo de los datos de contacto de la persona.
3. Desplácese hasta el área de **Campos personalizados**, al final del formulario de edición, y complete un valor para cada campo. Cada campo muestra el control que corresponde a su tipo: un selector de fecha para los campos de Fecha, una lista de sí/no para los campos de Sí/No, una lista de selección para Opción múltiple, etc.
4. Haga clic en **Guardar**. Los valores de sus campos personalizados se guardan junto con el resto de los datos de la persona.

De vuelta en el perfil, cualquier campo que tenga un valor aparece debajo de los datos de contacto de la persona como *Nombre del campo: valor* (las respuestas de Sí/No se muestran como *Sí* o *No*, y Opción múltiple muestra la etiqueta de la opción). Los campos vacíos simplemente se ocultan. Para quitar un valor, edite la persona, borre el campo y guarde: un valor vacío se elimina del registro en lugar de guardarse como vacío.

:::tip
El caso de uso más común es la seguridad de los voluntarios: cree un campo de **Fecha** llamado *Vencimiento de verificación de antecedentes*, registre la fecha de cada voluntario y luego cree una [Lista guardada](../people/lists.md) que marque a quienes ya superaron esa fecha.
:::

## Buscar y crear listas con campos personalizados

Los campos personalizados se pueden buscar por completo:

1. En la página **Personas**, abra la [Búsqueda avanzada](../people/searching-people.md).
2. Expanda la categoría **Campos personalizados**.
3. Marque el campo por el que desea filtrar, elija un operador e ingrese un valor. Los operadores disponibles corresponden al tipo del campo:
   - **Cuadro de texto**: contiene, es igual a, comienza con, termina con.
   - **Número entero / Decimal**: es igual a, mayor que, mayor o igual que, menor que, menor o igual que.
   - **Fecha**: es igual a, posterior a (mayor que), anterior a (menor que).
   - **Sí/No**: es igual a Sí o No.
   - **Opción múltiple**: es igual a o contiene una de las opciones.

Puede guardar cualquier búsqueda de campos personalizados como una [Lista](../people/lists.md). Las listas son consultas dinámicas, así que una lista creada con *Vencimiento de verificación de antecedentes es anterior a hoy* vuelve a revisar a todas las personas cada vez que la abre, sin necesidad de mantenimiento manual.

## Mostrar un campo personalizado como columna

Para ver los valores de un campo para todos a la vez, agréguelo como columna en la página **Personas**. Cambie **Ver como** a **Tabla**, haga clic en el ícono **Seleccionar columnas** en el encabezado de la página, cambie a la pestaña **Personalizado** y marque el campo. El valor de cada persona aparece en su propia columna junto a las integradas. Consulte [Mostrar campos personalizados como columnas](../people/searching-people.md#showing-custom-fields-as-columns).

## Qué sucede al combinar

Al [combinar dos registros de personas](../people/adding-people.md), los valores de los campos personalizados se trasladan automáticamente. La persona que conserva mantiene sus propios valores; para cualquier campo donde solo la persona eliminada tenía un valor, ese valor se copia para que no se pierda nada.

## Artículos relacionados

- [Buscar personas](../people/searching-people.md): búsqueda avanzada, incluida la categoría Campos personalizados, y cómo mostrar campos personalizados como columnas
- [Listas guardadas](../people/lists.md): guarde una búsqueda de campos personalizados y vuelva a ejecutarla en tiempo real
- [Roles y permisos](./roles-permissions.md): quién puede definir campos y editar valores
- [Crear formularios](../forms/creating-forms.md): para la recopilación de datos con varias preguntas, cuando un formulario completo se ajusta mejor que campos individuales
