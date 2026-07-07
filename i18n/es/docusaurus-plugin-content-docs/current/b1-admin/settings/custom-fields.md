---
title: "Campos personalizados"
---

# Campos personalizados

<div class="article-intro">

Los **Campos personalizados** le permiten rastrear su propia información en cada registro de persona -- cosas que B1 no tiene un campo incorporado, como una fecha de vencimiento de verificación de antecedentes, un tamaño de camiseta, o un estado de clase de bautismo. Define un campo una vez en Configuración, luego completa un valor en el perfil de cada persona y busca o crea listas en él. Esto reemplaza el antiguo obstáculo de crear un formulario de Personas solo para almacenar un single piece de datos personalizados.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita permiso de edición de **Personas** para definir campos y completar valores, y acceso al área de **Configuración**. Cualquiera con permiso de vista de Personas puede ver los valores. Vea [Roles y permisos](./roles-permissions.md).
- Decida qué quiere rastrear y qué tipo se ajusta mejor (texto, un número, una fecha, una respuesta sí/no, o una lista de selección) antes de comenzar.

</div>

## Apertura de campos personalizados

En B1 Admin, vaya a **Configuración** en la barra lateral izquierda y seleccione la tarjeta **Campos personalizados**. También puede ir directamente a **/settings/custom-fields**. Verá una lista de cada campo que ha definido, mostrando su **Nombre** y **Tipo de campo**. Si aún no ha creado ninguno, el panel dice *"No se han añadido campos personalizados aún."*

## Añadir un campo

1. Haga clic en **Añadir campo**.
2. En el editor que se abre a la derecha, ingrese un **Nombre** -- esta es la etiqueta que el personal verá en los perfiles de personas y en la búsqueda (por ejemplo, *El cheque de antecedentes vence*).
3. Elija un **Tipo de campo**:
   - **Caja de texto** -- texto corto de forma libre.
   - **Número entero** -- números sin decimales (por ejemplo, un conteo).
   - **Decimal** -- números que pueden incluir decimales.
   - **Fecha** -- una fecha del calendario.
   - **Sí/No** -- una respuesta simple sí o no.
   - **Opción múltiple** -- una lista de selección. Cuando elige este tipo, aparece un **editor de opciones** para que pueda agregar cada opción que las personas pueden seleccionar.
4. Haga clic en **Guardar**.

El campo ahora está disponible en el perfil de cada persona.

:::info
Los tipos de campo son el mismo conjunto utilizado para [preguntas de formulario](../forms/creating-forms.md), por lo que los valores se comportan de manera consistente en B1.
:::

## Edición de un campo

Haga clic en cualquier fila de campo en la lista para reabrirla en el editor. Cambie el nombre, tipo u opciones y haga clic en **Guardar**.

:::warning
Cambiar el **Tipo de campo** de un campo que ya tiene valores (por ejemplo, de Caja de texto a Fecha) puede dejar valores ingresados anteriormente en un formato que ya no coincida con el nuevo tipo. Cambie tipos con cuidado una vez que el personal comience a completar el campo.
:::

## Eliminar un campo

Abra un campo para editar y haga clic en **Eliminar**. Se le pedirá que confirme: *"¿Está seguro de que desea eliminar este campo personalizado? Sus valores almacenados también se eliminarán."* Eliminar un campo elimina permanentemente **todos los valores almacenados para él** en todas las personas -- esto no se puede deshacer.

## Completar valores en una persona

Una vez que existe al menos un campo personalizado, sus valores viven justo al lado de los detalles incorporados en cada registro de persona -- los ve en **Detalles personales** y los edita en el mismo formulario que usa para el resto de la información de la persona. Nada extra aparece hasta que haya definido su primer campo.

1. Abra el registro de una persona en **Personas**.
2. En la sección **Detalles personales**, haga clic en el botón **Editar** (lápiz).
3. Desplácese hasta el área **Campos personalizados** en la parte inferior del formulario de edición y complete un valor para cada campo. Cada campo muestra la entrada que coincide con su tipo -- un selector de fecha para campos de Fecha, un desplegable sí/no para campos Sí/No, una lista de selección para Opción múltiple, etc.
4. Haga clic en **Guardar**. Sus valores de campo personalizado se guardan junto con el resto de los detalles de la persona.

Volver al perfil, cualquier campo que tenga un valor ahora se muestra en la sección **Detalles personales** (Las respuestas Sí/No se leen como *Sí* o *No*, y Opción múltiple muestra la etiqueta de la opción). Los campos dejados en blanco simplemente se ocultan. Para eliminar un valor, edite la persona, borre el campo y guarde -- un valor vacío se elimina del registro en lugar de almacenarse como en blanco.

:::tip
El caso de uso clásico es la seguridad de voluntarios: cree un campo de **Fecha** llamado *El cheque de antecedentes vence*, registre la fecha de cada voluntario, luego cree una [Lista guardada](../people/lists.md) que marque a cualquiera cuya fecha haya pasado.
:::

## Búsqueda y creación de listas en campos personalizados

Los campos personalizados son completamente buscables:

1. En la página **Personas**, abra la [Búsqueda avanzada](../people/searching-people.md).
2. Expanda la categoría **Campos personalizados**.
3. Marque el campo en el que desea filtrar, elija un operador e ingrese un valor. Los operadores ofrecidos coinciden con el tipo del campo:
   - **Caja de texto** -- contiene, igual a, comienza con, termina con.
   - **Número entero / Decimal** -- igual a, mayor que, mayor que o igual a, menor que, menor que o igual a.
   - **Fecha** -- igual a, después (mayor que), antes (menor que).
   - **Sí/No** -- igual a Sí o No.
   - **Opción múltiple** -- igual a o contiene una de las opciones.

Guarde cualquier búsqueda de campo personalizado como una [Lista](../people/lists.md). Las listas son consultas en vivo, por lo que una lista construida en *El cheque de antecedentes vence es antes de hoy* vuelve a verificar cada persona cada vez que la abre -- sin mantenimiento manual.

## Qué sucede en la fusión

Cuando [fusiona dos registros de personas](../people/adding-people.md), los valores de campos personalizados se transfieren automáticamente. La persona que mantiene tiene sus propios valores; para cualquier campo donde solo la persona removida tenía un valor, ese valor se copia para que nada se pierda.

## Artículos relacionados

- [Búsqueda de personas](../people/searching-people.md) -- búsqueda avanzada, incluyendo la categoría Campos personalizados
- [Listas guardadas](../people/lists.md) -- guarde una búsqueda de campo personalizado y vuelva a ejecutarla en vivo
- [Roles y permisos](./roles-permissions.md) -- quién puede definir campos y editar valores
- [Crear formularios](../forms/creating-forms.md) -- para recopilar datos de múltiples preguntas donde un formulario completo se ajusta mejor que campos individuales
