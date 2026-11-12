---
title: "Campos personalizados"
description: "Defina campos personalizados en B1 Admin para registrar datos adicionales de personas, como las fechas de vencimiento de la verificación de antecedentes o las tallas de camiseta, y luego busque y filtre por ellos."
---

# Campos personalizados

<div class="article-intro">

Los **Campos personalizados** le permiten registrar su propia información en cada registro de persona: datos para los que B1 no tiene un campo integrado, como la fecha de vencimiento de una verificación de antecedentes, la talla de camiseta o el estado de una clase de bautismo. Define un campo una vez en Configuración, luego completa un valor en el perfil de cada persona y busca o crea listas con base en él. Esto reemplaza la solución anterior de crear un formulario de Personas solo para guardar un dato personalizado.

</div>

## Video de capacitación {#training-video}

<YouTube id="yUfDEbp2HQ4" title="Campos personalizados, edición masiva y exportación en B1" next="Crear grupos y agregar miembros en B1" nextUrl="/docs/b1-admin/groups/creating-groups" />

<div class="prereqs">
<h4>Antes de empezar</h4>

- Necesita el permiso **Editar configuración de la iglesia** para abrir la página de Configuración (y para guardar la lista de Títulos), además del permiso de edición de **Personas** para definir campos y completar valores. Cualquier persona con permiso de vista de Personas puede ver los valores. Consulte [Roles y permisos](./roles-permissions.md).
- Decida qué quiere registrar y qué tipo le conviene más (texto, número, fecha, sí/no o lista de opciones) antes de empezar.

</div>

## Abrir los campos personalizados {#opening-custom-fields}

En B1 Admin, abra el [menú Salto](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), elija **Configuración > Configuración** y haga clic en **Campos personalizados** en la lista de la izquierda para desplazarse a la sección **Campos personalizados**. También puede ir directamente a **/settings/custom-fields**. Verá una lista de todos los campos que ha definido, con su **Nombre** y su **Tipo de campo**. Si todavía no ha creado ninguno, el panel dice *"Todavía no se han agregado campos personalizados."*

## Títulos {#titles}

La tarjeta **Títulos** en la parte superior de la sección Campos personalizados enumera los títulos que aparecen en el cuadro **Título** cuando alguien agrega o edita una persona, en B1 Admin y en la aplicación B1 (el editor de perfil y el formulario de registro de invitados). La lista empieza con Sr., Sra., Srta., Ms., Dr., Prof., Rev. y Pastor.

1. Escriba un título en **Nuevo título** (de hasta 10 caracteres), como *Diácono* o *Anciano*, y haga clic en **Agregar título**.
2. Para quitar un título de la lista, haga clic en la **×** de su chip.
3. Haga clic en **Guardar**. Un mensaje *Títulos guardados.* confirma el cambio. Si agrega un título que ya está en la lista, aparece *Ese título ya está en la lista.*

:::tip
El cuadro Título sigue aceptando texto libre, así que el personal y los miembros pueden escribir un título que no esté en la lista. Quitar un título de la lista no cambia a las personas que ya lo tienen.
:::

## Agregar un campo {#adding-a-field}

1. Haga clic en **Agregar campo**.
2. En el editor que se abre a la derecha, escriba un **Nombre**: es la etiqueta que verá el personal en los perfiles de personas y en la búsqueda (por ejemplo, *Verificación de antecedentes vence*).
3. Elija un **Tipo de campo**:
   - **Cuadro de texto** — texto corto de formato libre.
   - **Número entero** — números sin decimales (por ejemplo, un recuento).
   - **Decimal** — números que pueden incluir decimales.
   - **Fecha** — una fecha del calendario.
   - **Sí/No** — una respuesta simple de sí o no.
   - **Opción múltiple** — una lista de opciones. Al elegir este tipo, aparece un **editor de opciones** para agregar cada opción que las personas pueden seleccionar.
4. Haga clic en **Guardar**.

El campo ya está disponible en el perfil de cada persona.

:::info
Los tipos de campo son el mismo conjunto que se usa en las [preguntas de formularios](../forms/creating-forms.md), así que los valores se comportan de forma coherente en B1.
:::

## Editar un campo {#editing-a-field}

Haga clic en cualquier fila de campo de la lista para volver a abrirlo en el editor. Cambie el nombre, el tipo o las opciones y haga clic en **Guardar**.

:::warning
Cambiar el **Tipo de campo** de un campo que ya tiene valores (por ejemplo, de Cuadro de texto a Fecha) puede dejar los valores registrados previamente en un formato que ya no coincide con el nuevo tipo. Cambie los tipos con cuidado una vez que el personal haya empezado a completar el campo.
:::

## Eliminar un campo {#deleting-a-field}

Abra un campo para editarlo y haga clic en **Eliminar**. Se le pedirá que confirme: *"¿Está seguro de que desea eliminar este campo personalizado? Sus valores almacenados también se eliminarán."* Eliminar un campo quita de forma permanente **el campo y todos los valores guardados** de todas las personas. Esta acción no se puede deshacer.

## Completar valores en una persona {#filling-in-values-on-a-person}

Una vez que existe al menos un campo personalizado, sus valores aparecen junto a los datos integrados en el registro de cada persona: los ve con los datos de contacto de la persona, a la izquierda de su perfil, y los edita en el mismo formulario que usa para el resto de la información de la persona. No aparece nada adicional hasta que define su primer campo.

1. Abra el registro de una persona en **Personas**.
2. Haga clic en el botón **Editar** a la izquierda del perfil, debajo de los datos de contacto de la persona.
3. Desplácese hasta el área **Campos personalizados**, al final del formulario de edición, y complete un valor para cada campo. Cada campo muestra el control que corresponde a su tipo: un selector de fecha para los campos de fecha, un menú Sí/No para los campos Sí/No, una lista de opciones para Opción múltiple, etc.
4. Haga clic en **Guardar**. Los valores de sus campos personalizados se guardan junto con el resto de los datos de la persona.

De vuelta en el perfil, cualquier campo que tenga un valor aparece debajo de los datos de contacto de la persona como *Nombre del campo: valor* (las respuestas Sí/No se leen como *Sí* o *No*, y Opción múltiple muestra la etiqueta de la opción). Los campos vacíos simplemente se ocultan. Para quitar un valor, edite a la persona, borre el campo y guarde: un valor vacío se elimina del registro en lugar de guardarse en blanco.

:::tip
El caso de uso clásico es la seguridad de los voluntarios: cree un campo de **Fecha** llamado *Verificación de antecedentes vence*, registre la fecha de cada voluntario y luego cree una [Lista guardada](../people/lists.md) que marque a quienes ya superaron esa fecha.
:::

## Buscar y crear listas con campos personalizados {#searching-and-building-lists-on-custom-fields}

Los campos personalizados se pueden buscar por completo:

1. En la página **Personas**, abra la [Búsqueda avanzada](../people/searching-people.md).
2. Expanda la categoría **Campos personalizados**.
3. Marque el campo por el que quiere filtrar, elija un operador e ingrese un valor. Los operadores que se ofrecen coinciden con el tipo del campo:
   - **Cuadro de texto** — contiene, es igual a, empieza con, termina con.
   - **Número entero / Decimal** — es igual a, mayor que, mayor o igual que, menor que, menor o igual que.
   - **Fecha** — es igual a, posterior a (mayor que), anterior a (menor que).
   - **Sí/No** — es igual a Sí o No.
   - **Opción múltiple** — es igual a o contiene una de las opciones.

Guarde cualquier búsqueda con campos personalizados como una [Lista](../people/lists.md). Las listas son consultas en vivo, así que una lista creada con *Verificación de antecedentes vence es anterior a hoy* vuelve a revisar a cada persona cada vez que la abre, sin necesidad de mantenimiento manual.

## Mostrar un campo personalizado como columna {#showing-a-custom-field-as-a-column}

Para ver los valores de un campo para todos a la vez, agréguelo como columna en la página **Personas**. Cambie **Ver como** a **Tabla**, haga clic en el icono **Seleccionar columnas** en el encabezado de la página, cambie a la pestaña **Personalizado** y marque el campo. El valor de cada persona aparece en su propia columna junto a las integradas. Consulte [Mostrar campos personalizados como columnas](../people/searching-people.md#showing-custom-fields-as-columns).

## Qué pasa al combinar {#what-happens-on-merge}

Cuando [combina dos registros de personas](../people/adding-people.md), los valores de los campos personalizados se trasladan automáticamente. La persona que conserva mantiene sus propios valores; para cualquier campo en el que solo la persona eliminada tenía un valor, ese valor se copia para que no se pierda nada.

## Artículos relacionados {#related-articles}

- [Buscar personas](../people/searching-people.md) — búsqueda avanzada, incluida la categoría Campos personalizados, y cómo mostrar campos personalizados como columnas
- [Listas guardadas](../people/lists.md) — guarde una búsqueda con campos personalizados y vuelva a ejecutarla en vivo
- [Roles y permisos](./roles-permissions.md) — quién puede definir campos y editar valores
- [Crear formularios](../forms/creating-forms.md) — para recopilar datos con varias preguntas, cuando un formulario completo encaja mejor que campos sueltos
