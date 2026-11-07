---
title: "Plantillas de correo"
description: "Configura plantillas de correo electrónico y mensajes de texto en B1 Admin, con campos de combinación, opciones de SMS y vistas previas para comunicaciones masivas."
---

# Plantillas de correo

<div class="article-intro">

Las plantillas de correo le permiten guardar contenido de correo reutilizable (un mensaje de bienvenida, un recordatorio de evento, un agradecimiento por una ofrenda) para que usted, o un [flujo de trabajo](../serving/workflows.md), pueda enviarlo con un solo clic en lugar de escribirlo desde cero cada vez. La misma lista también guarda plantillas de mensajes de texto para las ventanas de Texto de grupos y personas.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita acceso al área de Configuración en B1 Admin.

</div>

## Acceder a las plantillas de correo

1. En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda) y expanda **Configuración**.
2. Haga clic en **Plantillas de correo**.
3. Verá una lista de las plantillas existentes con su asunto, categoría y fecha de última modificación.

## Crear una plantilla

1. Haga clic en **Nueva plantilla**.
2. Escriba un **Nombre de plantilla** para identificarla en la lista, y elija una **Categoría** (General, Eventos, Grupos, Donaciones, Bienvenida o Texto) para organizar sus plantillas. Elija **Texto** para crear una plantilla de mensaje de texto (consulte [Plantillas de texto](#text-templates) más abajo).
3. Escriba la línea de **Asunto**.
4. Redacte el **Cuerpo** con el editor de texto enriquecido.
5. Haga clic en **Guardar**.

## Campos de combinación {#merge-fields}

Haga clic en una etiqueta de campo de combinación encima del Asunto o del Cuerpo para insertarla en la posición del cursor: primero haga clic en el texto donde quiere el campo y luego en la etiqueta. Su cursor se queda en su lugar, así que puede seguir escribiendo justo después del campo insertado. Si hace clic en una etiqueta del Cuerpo sin haber hecho clic antes dentro del cuerpo, el campo se agrega al final del cuerpo. Cuando se envía el correo, cada campo de combinación se reemplaza con la información real del destinatario:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}`: el nombre del destinatario
- `{{email}}`: la dirección de correo electrónico del destinatario
- `{{churchName}}`: el nombre de su iglesia

## Plantillas de texto {#text-templates}

Una plantilla con la categoría **Texto** es un mensaje de texto plano para enviar por mensaje de texto, en lugar de un correo:

- No tiene asunto. El editor de texto enriquecido se reemplaza por un cuadro simple de **Mensaje de texto** que admite hasta 1,600 caracteres.
- Las etiquetas de campos de combinación encima del cuadro insertan `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}` o `{{churchName}}` en la posición del cursor.
- Las plantillas de texto aparecen en el selector **Cargar plantilla (opcional)** de la ventana de Texto de un [grupo](../groups/group-members.md#texting-group-members) o de una sola persona. Al elegir una, se llena el mensaje, y aún puede editarlo antes de enviarlo.
- No aparecen en los selectores de plantillas de correo, incluida la acción de flujo de trabajo **Enviar correo**.

Enviar mensajes de texto requiere un [proveedor de mensajes de texto](./church-settings.md#texting) conectado.

## Vista previa de una plantilla

Haga clic en **Vista previa** para ver cómo se verán el asunto y el cuerpo con datos de ejemplo en los campos de combinación, antes de guardar o enviar.

## Usar una plantilla

Las plantillas guardadas están disponibles para seleccionarlas al redactar un correo a personas o a un grupo, y como acción en los [Flujos de trabajo](../serving/workflows.md). Antes de que su iglesia pueda enviarlas, el equipo de ChurchApps debe aprobarla una vez para el correo de grupo. Consulte [Activar el correo de grupo para su iglesia](../groups/group-members.md#turning-on-group-email-for-your-church).

## Editar y eliminar

Haga clic en el ícono **Editar** junto a una plantilla para actualizarla, o en el ícono **Eliminar** para quitarla de forma permanente.

## Próximos pasos

- [Flujos de trabajo](../serving/workflows.md): active una plantilla de correo automáticamente según reglas
