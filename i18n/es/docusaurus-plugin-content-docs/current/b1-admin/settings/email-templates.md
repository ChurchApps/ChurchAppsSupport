---
title: "Plantillas de correo electrónico"
---

# Plantillas de correo electrónico

<div class="article-intro">

Las Plantillas de correo electrónico te permiten guardar contenido de correo electrónico reutilizable: un mensaje de bienvenida, un recordatorio de evento, un agradecimiento por donación: para que tú (o un [flujo de trabajo](../serving/workflows.md)) puedas enviarlo en un clic en lugar de escribirlo desde cero cada vez.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesitas acceso al área Configuración en B1 Admin.

</div>

## Acceder a Plantillas de correo electrónico

1. En B1 Admin, abre el **menú de sección** en la esquina superior izquierda (el nombre de la sección con la pequeña flecha) y elige **Configuración**.
2. Haz clic en **Plantillas de correo electrónico**.
3. Verás una lista de plantillas existentes con su asunto, categoría y fecha de última modificación.

## Crear una plantilla

1. Haz clic en **Nueva plantilla**.
2. Ingresa un **Nombre de plantilla** para identificarla en la lista, y elige una **Categoría** (General, Eventos, Grupos, Donaciones, o Bienvenida) para ayudar a organizar tus plantillas.
3. Ingresa la línea de **Asunto**.
4. Escribe el **Cuerpo** usando el editor de texto enriquecido.
5. Haz clic en **Guardar**.

## Campos de combinación

Haz clic en un chip de campo de combinación arriba del Asunto o Cuerpo para insertarlo en tu cursor. Cuando se envía el correo electrónico, cada campo de combinación se reemplaza con la información real del destinatario:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}`: el nombre del destinatario
- `{{email}}`: la dirección de correo electrónico del destinatario
- `{{churchName}}`: el nombre de tu iglesia

## Previsualizar una plantilla

Haz clic en **Previsualizar** para ver cómo se verán el asunto y el cuerpo con datos de muestra completados para los campos de combinación, antes de guardar o enviar.

## Usar una plantilla

Las plantillas guardadas están disponibles para seleccionar al redactar un correo electrónico a personas o un grupo, y como acción en [Flujos de trabajo](../serving/workflows.md). Antes de que tu iglesia pueda enviarlas, el equipo de ChurchApps necesita aprobarlo para correo electrónico grupal una vez. Ver [Activar correo electrónico grupal para tu iglesia](../groups/group-members.md#activar-correo-de-grupo-para-tu-iglesia).

## Editar y eliminar

Haz clic en el icono **Editar** junto a una plantilla para actualizarla, o en el icono **Eliminar** para removerlaa permanentemente.

## Próximos pasos

- [Flujos de trabajo](../serving/workflows.md): desencadena un correo electrónico de plantilla automáticamente basado en reglas
