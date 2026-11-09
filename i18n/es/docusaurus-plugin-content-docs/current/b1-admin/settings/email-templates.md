---
title: "Plantillas de correo"
description: "Configure plantillas de correo electrónico y mensajes de texto en B1 Admin, con campos de combinación, opciones de mensajes de texto y vistas previas para la comunicación masiva."
---

# Plantillas de correo

<div class="article-intro">

Las plantillas de correo le permiten guardar contenido de correo reutilizable (un mensaje de bienvenida, un recordatorio de evento, un agradecimiento por una ofrenda) para que usted, o un [flujo de trabajo](../serving/workflows.md), pueda enviarlo con un solo clic en lugar de escribirlo desde cero cada vez. La misma lista también contiene plantillas de mensajes de texto para las ventanas de Text de grupos y personas, y para la acción **Send Text** de los flujos de trabajo.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita acceso al área de Configuración en B1 Admin.

</div>

## Acceder a las plantillas de correo

1. En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda) y expanda **Settings**.
2. Haga clic en **Email Templates**.
3. Verá una lista de las plantillas existentes con su asunto, categoría y fecha de última modificación.

## Crear una plantilla

1. Haga clic en **New Template**.
2. Escriba un **Template Name** para identificarla en la lista, y elija una **Category** (General, Events, Groups, Giving, Welcome o Text) para organizar sus plantillas. Elija **Text** para crear una plantilla de mensaje de texto en su lugar (consulte [Plantillas de texto](#text-templates) más abajo).
3. Escriba la línea de **Subject**.
4. Redacte el **Body** con el editor de texto enriquecido.
5. Haga clic en **Save**.

## Campos de combinación {#merge-fields}

Haga clic en una etiqueta de campo de combinación encima del Subject o del Body para insertarla en la posición del cursor: primero haga clic en el punto del texto donde quiere el campo y luego en la etiqueta. El cursor se queda en su sitio, así que puede seguir escribiendo justo después del campo insertado. Si hace clic en una etiqueta del Body sin haber hecho clic antes dentro del cuerpo, el campo se añade al final del cuerpo. Cuando se envía el correo, cada campo de combinación se sustituye por la información real del destinatario:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- el nombre del destinatario
- `{{email}}` -- la dirección de correo electrónico del destinatario
- `{{churchName}}` -- el nombre de su iglesia

### Campos de combinación de donaciones {#gift-merge-fields}

Estos campos solo se completan cuando el correo lo envía un [flujo de trabajo](../serving/workflows.md#sending-email) que inició un disparador **Donation · Created**. En cualquier otro correo quedan en blanco.

- `{{amount}}` -- el importe de la donación, por ejemplo $50.00
- `{{giftDate}}` -- la fecha de la donación
- `{{fund}}` -- el fondo o los fondos a los que se destinó la donación
- `{{receipt}}` -- un resumen de la donación: la fecha y el método, una fila por cada fondo con su importe, y el total. Úselo para enviar al donante un recibo en el mismo correo que su agradecimiento. Solo se ofrece para el cuerpo, no para el asunto.

## Plantillas de texto {#text-templates}

Una plantilla con la categoría **Text** es un mensaje de texto simple para enviar por SMS, en lugar de un correo:

- No tiene asunto. El editor de texto enriquecido se sustituye por un cuadro sencillo **Text Message** que admite hasta 1,600 caracteres.
- Las etiquetas de campos de combinación encima del cuadro insertan `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}` o los [campos de combinación de donaciones](#gift-merge-fields) en la posición del cursor. En un texto, `{{receipt}}` se convierte en una sola línea, por ejemplo *$50.00 to General Fund on Nov 8, 2026*.
- Las plantillas de texto aparecen en el selector **Load Template (optional)** de la ventana de Text de un [grupo](../groups/group-members.md#texting-group-members) o de una sola persona. Al elegir una, se rellena el mensaje, y aún puede editarlo antes de enviarlo.
- También aparecen en la lista **Start from a template** de la acción de flujo de trabajo [Send Text](../serving/workflows.md#sending-a-text).
- Se excluyen de los selectores de plantillas de correo, incluida la acción de flujo de trabajo **Send email**.

Enviar mensajes de texto requiere un [proveedor de mensajes de texto](./church-settings.md#texting) conectado.

## Vista previa de una plantilla

Haga clic en **Preview** para ver cómo se verán el asunto y el cuerpo con datos de ejemplo en los campos de combinación, antes de guardar o enviar.

## Usar una plantilla

Las plantillas guardadas están disponibles para seleccionarlas al redactar un correo para personas o para un grupo, y como acción en los [Flujos de trabajo](../serving/workflows.md). Antes de que su iglesia pueda enviarlas, el equipo de ChurchApps debe aprobarla una vez para el correo de grupo. Consulte [Activar el correo de grupo para su iglesia](../groups/group-members.md#turning-on-group-email-for-your-church).

## Editar y eliminar

Haga clic en el icono **Edit** junto a una plantilla para actualizarla, o en el icono **Delete** para quitarla de forma permanente.

## Próximos pasos

- [Flujos de trabajo](../serving/workflows.md) -- active una plantilla de correo automáticamente según reglas
