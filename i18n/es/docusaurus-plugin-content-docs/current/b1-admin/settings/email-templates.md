---
title: "Plantillas de correo"
description: "Configure plantillas de correo y de mensajes de texto en B1 Admin, con campos de combinación, opciones de mensajes de texto y vistas previas para la comunicación masiva."
---

# Plantillas de correo

<div class="article-intro">

Las Plantillas de correo le permiten guardar contenido de correo reutilizable (un mensaje de bienvenida, un recordatorio de evento, un agradecimiento por una ofrenda) para que usted (o un [flujo de trabajo](../serving/workflows.md)) pueda enviarlo con un solo clic, en lugar de escribirlo desde cero cada vez. La misma lista también guarda plantillas de mensajes de texto para las ventanas de Texto de grupos y personas, y para la acción **Enviar mensaje de texto** de los flujos de trabajo.

</div>

<div class="prereqs">
<h4>Antes de empezar</h4>

- Necesita el permiso **Editar configuración de la iglesia** (el elemento de menú **Plantillas de correo** solo aparece con él). Las personas con **Editar miembros de grupos** también pueden abrir la página directamente en **/settings/email-templates**.

</div>

## Acceder a las plantillas de correo {#accessing-email-templates}

1. En B1 Admin, abra el [menú Salto](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda) y expanda **Configuración**.
2. Haga clic en **Plantillas de correo**.
3. Verá una lista de las plantillas existentes con su **Nombre**, **Asunto**, **Categoría** y fecha de **Última modificación**.

## Crear una plantilla {#creating-a-template}

1. Haga clic en **Nueva plantilla**.
2. Escriba un **Nombre de plantilla** para identificarla en la lista, y elija una **Categoría** (General, Eventos, Grupos, Donaciones, Bienvenida o Texto) para organizar sus plantillas. Elija **Texto** para crear una plantilla de mensaje de texto (consulte [Plantillas de texto](#text-templates) más abajo).
3. Escriba la línea de **Asunto**.
4. Escriba el **Cuerpo** con el editor de texto enriquecido.
5. Haga clic en **Guardar**.

## Campos de combinación {#merge-fields}

Haga clic en un chip de campo de combinación encima del Asunto o del Cuerpo para insertarlo en la posición del cursor: primero haga clic en el texto donde quiere el campo y luego en el chip. El cursor se mantiene en su lugar, así que puede seguir escribiendo justo después del campo insertado. Si hace clic en un chip del Cuerpo sin haber hecho clic antes en el cuerpo, el campo se agrega al final del cuerpo. Al enviar el correo, cada campo de combinación se reemplaza con los datos reales del destinatario:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- El nombre del destinatario
- `{{email}}` -- La dirección de correo del destinatario
- `{{churchName}}` -- El nombre de su iglesia

### Campos de combinación de ofrendas {#gift-merge-fields}

Estos campos solo se completan cuando el correo lo envía un [flujo de trabajo](../serving/workflows.md#sending-email) que inició un disparador de **Donación · Creada**. En cualquier otro correo quedan en blanco.

- `{{amount}}` -- El monto de la ofrenda, por ejemplo $50.00
- `{{giftDate}}` -- La fecha de la ofrenda
- `{{fund}}` -- El fondo o los fondos a los que fue destinada la ofrenda
- `{{receipt}}` -- Un resumen de la ofrenda: la fecha y el método, una fila por cada fondo con su monto, y el total. Úselo para enviar al donante un recibo en el mismo correo de agradecimiento. Solo se ofrece para el cuerpo, no para el asunto.

## Plantillas de texto {#text-templates}

Una plantilla con la categoría **Texto** es un mensaje de texto sin formato, para mensajes de texto en lugar de correo:

- No tiene asunto. El editor de texto enriquecido se reemplaza por un cuadro simple de **Mensaje de texto** que admite hasta 1.600 caracteres.
- Los chips de campos de combinación encima del cuadro insertan `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}` o los [campos de combinación de ofrendas](#gift-merge-fields) en la posición del cursor. En un mensaje de texto, `{{receipt}}` se convierte en una sola línea, como *$50.00 a Fondo general el 8 nov 2026*.
- Las plantillas de texto aparecen en el selector **Cargar plantilla (opcional)** de la ventana de Texto de un [grupo](../groups/group-members.md#texting-group-members) o de una persona. Al elegir una, se completa el mensaje, y puede seguir editándolo antes de enviarlo.
- También aparecen en la lista **Empezar desde una plantilla** de la acción [Enviar mensaje de texto](../serving/workflows.md#sending-a-text) de los flujos de trabajo.
- No aparecen en los selectores de plantillas de correo, incluida la acción **Enviar correo** de los flujos de trabajo.

Para enviar mensajes de texto se requiere un [proveedor de mensajes de texto](./church-settings.md#texting) conectado.

## Vista previa de una plantilla {#previewing-a-template}

Haga clic en **Vista previa** para ver cómo quedarán el asunto y el cuerpo con datos de ejemplo en los campos de combinación, antes de guardar o enviar.

## Usar una plantilla {#using-a-template}

Las plantillas guardadas están disponibles para seleccionarlas al redactar un correo a personas o a un grupo, y como acción en los [Flujos de trabajo](../serving/workflows.md). Antes de que su iglesia pueda enviarlas, el equipo de ChurchApps debe aprobarla una vez para el correo de grupo. Consulte [Activar el correo de grupo para su iglesia](../groups/group-members.md#turning-on-group-email-for-your-church).

## Editar y eliminar {#editing-and-deleting}

Haga clic en **Editar** en la fila de una plantilla para actualizarla, o en **Eliminar** para quitarla de forma permanente. B1 le pide confirmación antes de eliminar.

## Próximos pasos {#next-steps}

- [Flujos de trabajo](../serving/workflows.md) -- Active automáticamente un correo de plantilla según reglas
