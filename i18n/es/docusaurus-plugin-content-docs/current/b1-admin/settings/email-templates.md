---
title: "Plantillas de correo electrónico"
---

# Plantillas de correo electrónico

<div class="article-intro">

Las Email Templates te permiten guardar contenido de correo electrónico reutilizable -- un mensaje de bienvenida, un recordatorio de evento, un agradecimiento por una donación -- para que tú (o un [flujo de trabajo](../serving/workflows.md)) puedas enviarlo con un clic en lugar de escribirlo desde cero cada vez.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesitas acceso al área Settings en B1 Admin.

</div>

## Acceder a Email Templates

1. Ve a **Settings** en la barra lateral izquierda.
2. Haz clic en **Email Templates**.
3. Verás una lista de plantillas existentes con su asunto, categoría y fecha de última modificación.

## Crear una plantilla

1. Haz clic en **New Template**.
2. Ingresa un **Template Name** para identificarla en la lista, y elige una **Category** (General, Events, Groups, Giving o Welcome) para ayudar a organizar tus plantillas.
3. Ingresa la línea de **Subject**.
4. Escribe el **Body** usando el editor de texto enriquecido.
5. Haz clic en **Save**.

## Campos de combinación

Haz clic en un chip de campo de combinación encima del Subject o Body para insertarlo en la posición de tu cursor. Cuando se envía el correo, cada campo de combinación se reemplaza con la información real del destinatario:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- El nombre del destinatario
- `{{email}}` -- La dirección de correo electrónico del destinatario
- `{{churchName}}` -- El nombre de tu iglesia

## Vista previa de una plantilla

Haz clic en **Preview** para ver cómo se verán el asunto y el cuerpo con datos de muestra completados en los campos de combinación, antes de guardar o enviar.

## Usar una plantilla

Las plantillas guardadas están disponibles para seleccionar al redactar un correo electrónico para personas o un grupo, y como una acción en [Flujos de trabajo](../serving/workflows.md).

## Editar y eliminar

Haz clic en el ícono **Edit** junto a una plantilla para actualizarla, o en el ícono **Delete** para eliminarla permanentemente.

## Próximos pasos

- [Flujos de trabajo](../serving/workflows.md) -- Activa el envío automático de una plantilla de correo electrónico según reglas
