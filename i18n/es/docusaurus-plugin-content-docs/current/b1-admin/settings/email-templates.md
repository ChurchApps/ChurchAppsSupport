---
title: "Plantillas de Correo Electrónico"
---

# Plantillas de Correo Electrónico

<div class="article-intro">

Las Plantillas de Correo Electrónico te permiten guardar contenido de correo electrónico reutilizable -- un mensaje de bienvenida, un recordatorio de evento, un agradecimiento por donación -- para que tú (o un [flujo de trabajo](../serving/workflows.md)) puedas enviarlo con un clic en lugar de escribirlo desde cero cada vez.

</div>

<div class="prereqs">
<h4>Antes de Empezar</h4>

- Necesitas acceso al área de Configuración en B1 Admin.

</div>

## Accediendo a Plantillas de Correo Electrónico

1. En B1 Admin, abre el **menú de sección** en la esquina superior izquierda (el nombre de la sección con la pequeña flecha) y elige **Configuración**.
2. Haz clic en **Plantillas de Correo Electrónico**.
3. Verás una lista de plantillas existentes con su asunto, categoría y fecha de última modificación.

## Crear una Plantilla

1. Haz clic en **Nueva Plantilla**.
2. Ingresa un **Nombre de Plantilla** para identificarla en la lista, y elige una **Categoría** (General, Eventos, Grupos, Donaciones o Bienvenida) para ayudarte a organizar tus plantillas.
3. Ingresa la línea de **Asunto**.
4. Escribe el **Cuerpo** utilizando el editor de texto enriquecido.
5. Haz clic en **Guardar**.

## Campos de Fusión

Haz clic en un chip de campo de fusión sobre el Asunto o Cuerpo para insertarlo en tu cursor. Cuando se envía el correo electrónico, cada campo de fusión se reemplaza con la información real del destinatario:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- El nombre del destinatario
- `{{email}}` -- La dirección de correo electrónico del destinatario
- `{{churchName}}` -- El nombre de tu iglesia

## Previsualizar una Plantilla

Haz clic en **Previsualizar** para ver cómo se verán el asunto y el cuerpo con datos de muestra completados para los campos de fusión, antes de guardar o enviar.

## Usar una Plantilla

Las plantillas guardadas están disponibles para seleccionar cuando se compone un correo electrónico para personas o un grupo, y como una acción en [Flujos de Trabajo](../serving/workflows.md).

## Editar y Eliminar

Haz clic en el icono **Editar** junto a una plantilla para actualizarla, o en el icono **Eliminar** para eliminarla permanentemente.

## Próximos Pasos

- [Flujos de Trabajo](../serving/workflows.md) -- Desencadena un correo electrónico de plantilla automáticamente según reglas
