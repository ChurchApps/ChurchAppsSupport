---
title: "Plantillas de correo electrónico"
---

# Plantillas de correo electrónico

<div class="article-intro">

Las plantillas de correo electrónico te permiten guardar contenido de correo electrónico reutilizable: un mensaje de bienvenida, un recordatorio de evento, un agradecimiento por donación, para que tú (o un [flujo de trabajo](../serving/workflows.md)) puedas enviarlo con un clic en lugar de escribirlo desde cero cada vez.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesitas acceso al área Configuración en B1 Admin.

</div>

## Acceder a plantillas de correo electrónico

1. En B1 Admin, abre el [menú Saltar](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda) y expande **Configuración**.
2. Haz clic en **Plantillas de correo electrónico**.
3. Verás una lista de plantillas existentes con su asunto, categoría y fecha de última modificación.

## Crear una plantilla

1. Haz clic en **Nueva plantilla**.
2. Ingresa un **Nombre de plantilla** para identificarlo en la lista, y elige una **Categoría** (General, Eventos, Grupos, Donación o Bienvenida) para ayudar a organizar tus plantillas.
3. Ingresa la línea **Asunto**.
4. Escribe el **Cuerpo** usando el editor de texto enriquecido.
5. Haz clic en **Guardar**.

## Campos de fusión

Haz clic en una ficha de campo de fusión por encima del Asunto o Cuerpo para insertarla en tu cursor: primero haz clic en el texto donde deseas que vaya el campo, luego haz clic en la ficha. Tu cursor permanece en su lugar, para que puedas seguir escribiendo directamente después del campo insertado. Si haces clic en una ficha de Cuerpo sin primero hacer clic en el cuerpo, el campo se agrega al final del cuerpo. Cuando se envía el correo electrónico, cada campo de fusión se reemplaza con la información real del destinatario:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}`: el nombre del destinatario
- `{{email}}`: la dirección de correo electrónico del destinatario
- `{{churchName}}`: el nombre de tu iglesia

## Vista previa de una plantilla

Haz clic en **Vista previa** para ver cómo se verán el asunto y el cuerpo con datos de ejemplo rellenos para los campos de fusión, antes de guardar o enviar.

## Usar una plantilla

Las plantillas guardadas están disponibles para seleccionar cuando redactas un correo electrónico a personas o un grupo, y como acción en [Flujos de trabajo](../serving/workflows.md). Antes de que tu iglesia pueda enviarlas, el equipo de ChurchApps necesita aprobarlo para correo electrónico grupal una vez. Ver [Activación del correo electrónico grupal para tu iglesia](../groups/group-members.md#turning-on-group-email-for-your-church).

## Editar y eliminar

Haz clic en el icono **Editar** junto a una plantilla para actualizarla, o en el icono **Eliminar** para eliminarla permanentemente.

## Próximos pasos

- [Flujos de trabajo](../serving/workflows.md) - desencadena una plantilla de correo electrónico automáticamente basada en reglas
