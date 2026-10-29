---
title: "Plantillas de correo"
---

# Plantillas de correo

<div class="article-intro">

Las plantillas de correo le permiten guardar contenido de correo reutilizable (un mensaje de bienvenida, un recordatorio de evento, un agradecimiento por una ofrenda) para que usted, o un [flujo de trabajo](../serving/workflows.md), pueda enviarlo con un solo clic en lugar de escribirlo desde cero cada vez. La misma lista también incluye plantillas de mensajes de texto para las ventanas de Texto de grupos y personas.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita acceso al área de Configuración de B1 Admin.

</div>

## Acceder a las plantillas de correo

1. En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda) y expanda **Configuración**.
2. Haga clic en **Plantillas de correo**.
3. Verá una lista de las plantillas existentes con su asunto, categoría y fecha de última modificación.

## Crear una plantilla

1. Haga clic en **Nueva plantilla**.
2. Ingrese un **Nombre de plantilla** para identificarla en la lista y elija una **Categoría** (General, Eventos, Grupos, Ofrendas, Bienvenida o Texto) para ayudar a organizar sus plantillas. Elija **Texto** para crear una plantilla de mensaje de texto en su lugar (vea [Plantillas de texto](#text-templates) más abajo).
3. Escriba la línea de **Asunto**.
4. Redacte el **Cuerpo** con el editor de texto enriquecido.
5. Haga clic en **Guardar**.

## Campos de combinación

Haga clic en una etiqueta de campo de combinación encima del Asunto o del Cuerpo para insertarla en la posición del cursor: primero haga clic en el texto donde quiere el campo y luego en la etiqueta. Su cursor permanece en su lugar, así que puede seguir escribiendo justo después del campo insertado. Si hace clic en una etiqueta del Cuerpo sin hacer clic antes en el cuerpo, el campo se agrega al final del cuerpo. Cuando se envía el correo, cada campo de combinación se reemplaza por la información real del destinatario:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- El nombre del destinatario
- `{{email}}` -- La dirección de correo electrónico del destinatario
- `{{churchName}}` -- El nombre de su iglesia

## Plantillas de texto

Una plantilla con la categoría **Texto** es un mensaje de texto plano para enviar mensajes de texto en lugar de correos:

- No tiene asunto. El editor de texto enriquecido se reemplaza por un cuadro de **Mensaje de texto** simple que admite hasta 1,600 caracteres.
- Las etiquetas de campos de combinación encima del cuadro insertan `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}` o `{{churchName}}` en la posición del cursor.
- Las plantillas de texto aparecen en el selector **Cargar plantilla (opcional)** de la ventana de Texto de un [grupo](../groups/group-members.md#texting-group-members) o de una sola persona. Al elegir una, se completa el mensaje, y aún puede editarlo antes de enviarlo.
- No aparecen en los selectores de plantillas de correo, incluida la acción **Enviar correo** de los flujos de trabajo.

Para enviar mensajes de texto se requiere un [proveedor de mensajes de texto](./church-settings.md#texting) conectado.

## Vista previa de una plantilla

Haga clic en **Vista previa** para ver cómo quedarán el asunto y el cuerpo con datos de ejemplo en los campos de combinación, antes de guardar o enviar.

## Usar una plantilla

Las plantillas guardadas están disponibles para seleccionarlas al redactar un correo a personas o a un grupo, y como acción en los [Flujos de trabajo](../serving/workflows.md). Antes de que su iglesia pueda enviarlas, el equipo de ChurchApps necesita aprobarla una vez para el correo de grupo. Consulte [Activar el correo de grupo para su iglesia](../groups/group-members.md#turning-on-group-email-for-your-church).

## Editar y eliminar

Haga clic en el icono **Editar** junto a una plantilla para actualizarla, o en el icono **Eliminar** para borrarla de forma permanente.

## Próximos pasos

- [Flujos de trabajo](../serving/workflows.md) -- Active un correo basado en una plantilla de forma automática según reglas
