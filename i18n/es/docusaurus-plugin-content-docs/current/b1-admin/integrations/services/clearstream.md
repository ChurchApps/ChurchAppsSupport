---
title: "Clearstream"
description: "Conecte Clearstream SMS con B1 Admin mediante Zapier: envíe mensajes de texto por nuevas donaciones o envíos de formularios, y reincorpore las respuestas entrantes como personas."
---

# Clearstream

<div class="article-intro">

Envíe un mensaje de texto de [Clearstream](https://clearstream.io) a partir de cualquier evento de B1 (nueva persona, nueva donación, envío de formulario, actualización de calendario) y reincorpore las respuestas como registros de B1. La aplicación de Zapier de Clearstream expone ambas direcciones, así que toda la conexión es una receta y no requiere código personalizado.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Una cuenta de [Clearstream](https://clearstream.io) con al menos una lista y un cupo de SMS
- Una cuenta de [Zapier](https://zapier.com)
- Un usuario de B1Admin con el permiso **Edit Settings**

</div>

## Lo que puede conectar {#what-you-can-wire-up}

| Dirección | Disparador | Acción |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Create/Update Subscriber + Send Text to Number |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Send Text to List (por ejemplo, para notificar al equipo de finanzas) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Send Text to a routing list (por ejemplo, para el equipo de peticiones de oración) |
| Clearstream → B1 | New Incoming Text | B1: Create Person; etiquetarla con la palabra clave que envió por mensaje |

Las acciones de Zapier de Clearstream son: *Send Text to Number*, *Send Text to List*, *Create/Update Subscriber*, *Add Subscriber to Automated Workflow*, *Add Tag to Subscriber* y *Remove Subscriber From List*.

## Configuración {#setup}

### 1. Cree una clave de API de B1 {#1-mint-a-b1-api-key}

**Settings → Developer → API Keys → New API Key**:

- `settings:write`: necesario para conectar la clave con Zapier y para que B1 registre el webhook del disparador
- `people:read`: necesario para buscar a la persona a partir del evento (`personId` → nombre/teléfono/correo electrónico)
- (Opcional) `people:write` si las respuestas de Clearstream deben crear contactos en B1

### 2. Cree el Zap "enviar texto por nueva donación" {#2-build-the-text-on-new-gift-zap}

1. **Disparador**: B1.church: New Donation
2. **Acción**: B1.church: Find Person (el `personId` de la donación)
3. **Acción**: Clearstream: Send Text to Number. Use el teléfono de la persona del paso 2 como destinatario y redacte el mensaje (`"Thanks for your gift, {first}! …"`).

Active el Zap. B1 registra el webhook de donaciones al activarse; verá `Zapier — donation.created` aparecer en **Settings → Developer → Webhooks**.

### 3. (Opcional) Reincorpore las respuestas como registros de B1 {#3-optional-pull-replies-back-as-b1-records}

1. **Disparador**: Clearstream: New Incoming Text
2. **Acción**: Filter by Zapier por la palabra clave; por ejemplo, continúe solo si el texto empieza con `PRAY`
3. **Acción**: guarde el texto en un lugar que su equipo vea (Slack, una hoja de Google o una tarea de B1). *Find Person* de B1 busca personas solo por id, correo electrónico o nombre, no por teléfono, así que relacione la respuesta con la persona de B1 manualmente (o agregue un GET de Webhooks by Zapier al endpoint `/membership/people/search/phone?number=…` de B1).

## Recetas comunes {#common-recipes}

### Localización de voluntarios del equipo {#volunteer-team-paging}

- **Disparador**: B1.church: New Form Submission (filtrado por el id del formulario de peticiones de oración)
- **Acción**: Clearstream: Send Text to List, donde la lista es su equipo pastoral de guardia. Redacte el cuerpo así: `New prayer request: {data.questions.0.answer}`.

### Secuencia de seguimiento para visitantes primerizos {#first-time-visitor-follow-up-sequence}

- **Disparador**: B1.church: New Person, filtrado por el estado de membresía de la persona (por ejemplo, *Visitor*)
- **Acción**: Clearstream: Add Subscriber to Automated Workflow. Asigne el id del flujo de trabajo a una serie de mensajes de texto preconfigurada de 7 días.

### Unirse a un grupo mediante una palabra clave {#keyword-driven-group-join}

- **Disparador**: Clearstream: New Incoming Text (filtrado por la palabra clave `MENS`)
- **Acción**: B1.church: Create Person con el nombre y el teléfono de quien envió el mensaje (*Find Person* de B1 no puede buscar personas por teléfono, así que revise los duplicados más tarde en **People**)
- **Acción**: B1.church: Add Group Member al grupo de Ministerio de Hombres

## Límites y notas {#limits--notes}

- **Clearstream cobra los SMS por mensaje.** Cada acción Send Text consume uno o más créditos según la longitud y el número de destinatarios; revise el cupo de su plan.
- **El teléfono debe estar en formato E.164** (por ejemplo, `+15555550199`) para *Send Text to Number*. El registro de la persona en B1 guarda lo que se haya ingresado; use un paso *Formatter by Zapier — Numbers → Format Phone Number* si no puede garantizar el formato.
- **B1 no necesita ningún encabezado** de su lado: la autenticación de Clearstream se maneja por completo dentro de su conexión de Zapier.

## Solución de problemas {#troubleshooting}

- **El disparador nunca se activa**: `Settings → Developer → Webhooks` debería mostrar una fila `Zapier — <event>` después de activar el Zap. Si no aparece, a la clave de API de B1 le falta `settings:write`. Vuelva a crear la clave y reconéctela.
- **Clearstream devuelve "Invalid phone number"**: el campo de destinatario no está en E.164. Agregue un paso de Format Phone Number.
- **Send Text to List falla con `403`**: el usuario de la API de Clearstream no tiene permiso para esa lista, o el id de la lista es incorrecto. Los ids de lista aparecen en la página de detalle de la lista en Clearstream.

## Vea también {#see-also}

- [Text In Church](./text-in-church.md): plataforma de SMS alternativa, con una conexión de forma similar
- [Mobile Message](./mobile-message.md): para iglesias fuera de EE. UU.
- [Zapier (descripción general)](../zapier.md): el lado de B1 de cada receta de Zapier
- [Documentación de la API de Clearstream](https://api-docs.clearstream.io/): para integraciones personalizadas más allá de la aplicación de Zapier
