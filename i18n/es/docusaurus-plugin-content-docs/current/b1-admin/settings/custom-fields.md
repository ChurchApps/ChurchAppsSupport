---
title: "Campos Personalizados"
---

# Campos Personalizados

<div class="article-intro">

**Campos Personalizados** te permiten realizar un seguimiento de tu propia información en cada registro de persona — cosas que B1 no tiene un campo incorporado, como una fecha de vencimiento de verificación de antecedentes, un tamaño de camiseta o un estado de clase de bautismo. Defines un campo una vez en Configuración, luego completas un valor en el perfil de cada persona y buscas o construyes listas sobre él. Esto reemplaza la solución anterior de crear un formulario de Personas solo para almacenar un único dato.

</div>

<div class="prereqs">
<h4>Antes de Empezar</h4>

- Necesitas permiso de edición de **Personas** para definir campos y completar valores, y acceso al área de **Configuración**. Cualquiera con permiso de visualización de Personas puede ver los valores. Consulta [Roles y Permisos](./roles-permissions.md).
- Decide qué deseas rastrear y qué tipo se ajusta mejor (texto, un número, una fecha, una respuesta sí/no, o una lista de opciones) antes de comenzar.

</div>

## Abriendo Campos Personalizados

En B1 Admin, abre el **menú de sección** en la esquina superior izquierda (el nombre de la sección con la pequeña flecha), elige **Configuración** y selecciona la tarjeta **Campos Personalizados**. También puedes ir directamente a **/settings/custom-fields**. Verás una lista de cada campo que has definido, mostrando su **Nombre** y **Tipo de Campo**. Si aún no has creado ninguno, el panel dice *"No se han agregado campos personalizados aún."*

## Agregar un Campo

1. Haz clic en **Agregar Campo**.
2. En el editor que se abre a la derecha, ingresa un **Nombre** — esta es la etiqueta que el personal verá en los perfiles de personas y en búsquedas (por ejemplo, *La verificación de antecedentes vence*).
3. Elige un **Tipo de Campo**:
   - **Cuadro de Texto** — texto corto de forma libre.
   - **Número Entero** — números sin decimales (por ejemplo, un recuento).
   - **Decimal** — números que pueden incluir decimales.
   - **Fecha** — una fecha del calendario.
   - **Sí/No** — una respuesta simple sí o no.
   - **Opción Múltiple** — una lista de opciones. Cuando eliges este tipo, aparece un **editor de opciones** para que agregues cada opción que las personas pueden seleccionar.
4. Haz clic en **Guardar**.

El campo ya está disponible en el perfil de cada persona.

:::info
Los tipos de campo son el mismo conjunto utilizado para [preguntas de formulario](../forms/creating-forms.md), por lo que los valores se comportan consistentemente en B1.
:::

## Editar un Campo

Haz clic en cualquier fila de campo en la lista para reabrirla en el editor. Cambia el nombre, tipo u opciones y haz clic en **Guardar**.

:::warning
Cambiar el **Tipo de Campo** de un campo que ya tiene valores (por ejemplo, de Cuadro de Texto a Fecha) puede dejar los valores previamente ingresados en un formato que ya no coincide con el nuevo tipo. Cambia tipos con cuidado una vez que el personal haya comenzado a llenar el campo.
:::

## Eliminar un Campo

Abre un campo para editarlo y haz clic en **Eliminar**. Se te pedirá que confirmes: *"¿Estás seguro de que deseas eliminar este campo personalizado? Sus valores almacenados también se eliminarán."* Eliminar un campo elimina permanentemente **cada valor almacenado para él** en todas las personas — esto no se puede deshacer.

## Completar Valores en una Persona

Una vez que existe al menos un campo personalizado, sus valores se encuentran justo al lado de los detalles incorporados en cada registro de persona — los ves en **Detalles Personales** y los editas en el mismo formulario que usas para el resto de la información de la persona. Nada adicional aparece hasta que hayas definido tu primer campo.

1. Abre el registro de una persona en **Personas**.
2. En la sección **Detalles Personales**, haz clic en el botón **Editar** (lápiz).
3. Desplázate a el área **Campos Personalizados** en la parte inferior del formulario de edición y completa un valor para cada campo. Cada campo muestra la entrada que coincide con su tipo — un selector de fecha para campos de Fecha, un menú desplegable sí/no para campos Sí/No, una lista de opciones para Opción Múltiple, etc.
4. Haz clic en **Guardar**. Tus valores de campo personalizado se guardan junto con el resto de los detalles de la persona.

De vuelta en el perfil, cualquier campo que tenga un valor ahora se muestra en la sección **Detalles Personales** (las respuestas Sí/No se leen como *Sí* o *No*, y Opción Múltiple muestra la etiqueta de la opción). Los campos dejados en blanco simplemente se ocultan. Para eliminar un valor, edita la persona, borra el campo y guarda — un valor vacío se elimina del registro en lugar de guardarse en blanco.

:::tip
El caso de uso clásico es la seguridad de voluntarios: crea un campo **Fecha** llamado *La verificación de antecedentes vence*, registra la fecha de cada voluntario, luego construye una [Lista Guardada](../people/lists.md) que marque a cualquiera cuya fecha haya pasado.
:::

## Buscar y Construir Listas en Campos Personalizados

Los campos personalizados son totalmente buscables:

1. En la página **Personas**, abre la [Búsqueda Avanzada](../people/searching-people.md).
2. Expande la categoría **Campos Personalizados**.
3. Marca el campo en el que deseas filtrar, elige un operador e ingresa un valor. Los operadores ofrecidos coinciden con el tipo del campo:
   - **Cuadro de Texto** — contiene, es igual a, comienza con, termina con.
   - **Número Entero / Decimal** — es igual a, mayor que, mayor o igual, menor que, menor o igual.
   - **Fecha** — es igual a, después (mayor que), antes (menor que).
   - **Sí/No** — es igual a Sí o No.
   - **Opción Múltiple** — es igual a o contiene una de las opciones.

Guarda cualquier búsqueda de campo personalizado como una [Lista](../people/lists.md). Las listas son consultas activas, por lo que una lista construida en *La verificación de antecedentes vence antes de hoy* verifica a cada persona cada vez que la abres — sin mantenimiento manual.

## Qué Sucede en la Fusión

Cuando [fusionas dos registros de persona](../people/adding-people.md), los valores de campos personalizados se trasladan automáticamente. La persona que mantienes se aferra a sus propios valores; para cualquier campo donde solo la persona eliminada tenía un valor, ese valor se copia para que nada se pierda.

## Artículos Relacionados

- [Búsqueda de Personas](../people/searching-people.md) — búsqueda avanzada, incluyendo la categoría Campos Personalizados
- [Listas Guardadas](../people/lists.md) — guarda una búsqueda de campo personalizado y vuelve a ejecutarla en vivo
- [Roles y Permisos](./roles-permissions.md) — quién puede definir campos y editar valores
- [Crear Formularios](../forms/creating-forms.md) — para recopilación de datos de múltiples preguntas donde un formulario completo se ajusta mejor que campos individuales
