---
title: "Campos personalizados"
---

# Campos personalizados

<div class="article-intro">

**Campos personalizados** te permiten rastrear tu propia información en cada registro de persona: cosas que B1 no tiene un campo incorporado para, como una fecha de vencimiento de verificación de antecedentes, un tamaño de camiseta o un estado de clase de bautismo. Defines un campo una vez en Configuración, luego completa un valor en cada perfil de persona y búsqueda en él. Esto reemplaza la solución alternativa más antigua de crear un formulario de Personas solo para almacenar un único dato personalizado.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesitas permiso de edición **Personas** para definir campos y completar valores, y acceso al área **Configuración**. Cualquiera con permiso de visualización de Personas puede ver los valores. Ver [Roles y permisos](./roles-permissions.md).
- Decide qué deseas rastrear y qué tipo se ajusta mejor (texto, un número, una fecha, una respuesta de sí/no o una lista de selección) antes de comenzar.

</div>

## Abrir campos personalizados

En B1 Admin, abre el [menú Saltar](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), elige **Configuración > Configuración**, y selecciona la tarjeta **Campos personalizados**. También puedes ir directamente a **/settings/custom-fields**. Verás una lista de todos los campos que has definido, mostrando su **Nombre** y **Tipo de campo**. Si aún no has creado ninguno, el panel dice *"No custom fields have been added yet."*

## Agregar un campo

1. Haz clic en **Agregar campo**.
2. En el editor que se abre a la derecha, ingresa un **Nombre**: esta es la etiqueta que el personal verá en los perfiles de personas y en búsqueda (por ejemplo, *La verificación de antecedentes expira*).
3. Elige un **Tipo de campo**:
   - **Cuadro de texto**: texto corto de forma libre.
   - **Número entero**: números sin decimales (por ejemplo, un recuento).
   - **Decimal**: números que pueden incluir decimales.
   - **Fecha**: una fecha de calendario.
   - **Sí/No**: una respuesta simple de sí o no.
   - **Opción múltiple**: una lista de selección. Cuando elijas este tipo, aparece un **editor de opciones** para que puedas agregar cada opción que las personas puedan seleccionar.
4. Haz clic en **Guardar**.

El campo ahora está disponible en el perfil de cada persona.

:::info
Los tipos de campo son el mismo conjunto utilizado para [preguntas de formulario](../forms/creating-forms.md), por lo que los valores se comportan consistentemente en toda B1.
:::

## Editar un campo

Haz clic en cualquier fila de campo en la lista para reabrirla en el editor. Cambia el nombre, tipo u opciones y haz clic en **Guardar**.

:::warning
Cambiar el **Tipo de campo** de un campo que ya tiene valores (por ejemplo, de Cuadro de texto a Fecha) puede dejar valores previamente ingresados en un formato que ya no coincida con el nuevo tipo. Cambia tipos con cuidado una vez que el personal haya comenzado a completar el campo.
:::

## Eliminar un campo

Abre un campo para editar y haz clic en **Eliminar**. Se te pedirá que confirmes: *"Are you sure you wish to delete this custom field? Its stored values will also be removed."* Eliminar un campo elimina permanentemente **y todos los valores almacenados para ello** en todas las personas: esto no se puede deshacer.

## Completar valores en una persona

Una vez que existe al menos un campo personalizado, sus valores viven junto con los detalles incorporados en cada registro de persona: los ves en **Detalles personales** y los editas en el mismo formulario que usas para el resto de la información de la persona. Nada extra aparece hasta que hayas definido tu primer campo.

1. Abre el registro de una persona en **Personas**.
2. En la sección **Detalles personales**, haz clic en el botón **Editar** (lápiz).
3. Desplázate hasta el área **Campos personalizados** en la parte inferior del formulario de edición y completa un valor para cada campo. Cada campo muestra la entrada que coincide con su tipo: un selector de fecha para campos de Fecha, un menú desplegable de sí/no para campos Sí/No, una lista de selección para Opción múltiple, etc.
4. Haz clic en **Guardar**. Tus valores de campo personalizado se guardan junto con el resto de los detalles de la persona.

De vuelta en el perfil, cualquier campo que tenga un valor ahora se muestra en la sección **Detalles personales** (las respuestas Sí/No se leen como *Sí* o *No*, y Opción múltiple muestra la etiqueta de la opción). Los campos dejados en blanco simplemente se ocultan. Para eliminar un valor, edita a la persona, limpia el campo y guarda: un valor vacío se elimina del registro en lugar de almacenarse como en blanco.

:::tip
El caso de uso clásico es la seguridad de voluntarios: crea un campo **Fecha** llamado *La verificación de antecedentes expira*, registra la fecha de cada voluntario, luego construye una [Lista guardada](../people/lists.md) que marque a cualquiera cuya fecha haya pasado.
:::

## Buscar y construir listas en campos personalizados

Los campos personalizados son totalmente buscables:

1. En la página **Personas**, abre la [Búsqueda avanzada](../people/searching-people.md).
2. Expande la categoría **Campos personalizados**.
3. Marca el campo en el que deseas filtrar, elige un operador e ingresa un valor. Los operadores ofrecidos coinciden con el tipo del campo:
   - **Cuadro de texto**: contiene, es igual a, comienza con, termina con.
   - **Número entero / Decimal**: es igual a, mayor que, mayor que o igual a, menor que, menor que o igual a.
   - **Fecha**: es igual a, después (mayor que), antes (menor que).
   - **Sí/No**: es igual a sí o no.
   - **Opción múltiple**: es igual a o contiene una de las opciones.

Guarda cualquier búsqueda de campo personalizado como [Lista](../people/lists.md). Las listas son consultas en vivo, para que una lista construida en *La verificación de antecedentes expira es antes de hoy* vuelva a verificar a cada persona cada vez que la abres: sin mantenimiento manual.

## Mostrar un campo personalizado como columna

Para ver los valores de un campo para todos a la vez, agrégalo como columna en la página **Personas**. Abre el selector de columnas, cambia a la pestaña **Personalizado** y marca el campo. El valor de cada persona aparece en su propia columna junto a los incorporados. Ver [Mostrar campos personalizados como columnas](../people/searching-people.md#showing-custom-fields-as-columns).

## Qué sucede en la fusión

Cuando [fusionas dos registros de persona](../people/adding-people.md), los valores de campo personalizado se transfieren automáticamente. La persona que mantienes se aferra a sus propios valores; para cualquier campo donde solo la persona eliminada tenía un valor, ese valor se copia para que nada se pierda.

## Artículos relacionados

- [Búsqueda de personas](../people/searching-people.md) — búsqueda avanzada, incluyendo la categoría Campos personalizados, y mostrar campos personalizados como columnas
- [Listas guardadas](../people/lists.md) — guarda una búsqueda de campo personalizado y vuelve a ejecutarla en vivo
- [Roles y permisos](./roles-permissions.md) — quién puede definir campos y editar valores
- [Crear formularios](../forms/creating-forms.md) — para recopilación de datos de múltiples preguntas donde un formulario completo se ajusta mejor que campos únicos
