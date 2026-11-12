---
title: "Text In Church"
description: "Conecte B1 Admin con Text In Church mediante Zapier: cree una clave de API, configure un Zap de tarjeta de conexión a B1 y refleje la membresía de grupos."
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) incluye SMS, flujos de trabajo de seguimiento (drip) y automatizaciones de tarjetas de conexión. Su aplicación de Zapier admite ambas direcciones: envíe los eventos de B1 a un flujo de trabajo de Text In Church, y reciba los disparadores de tarjetas de conexión o de nuevos contactos en B1.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Una cuenta de [Text In Church](https://textinchurch.com) con un plan que incluya la integración con Zapier
- Una cuenta de [Zapier](https://zapier.com)
- Un usuario de B1Admin con el permiso **Edit Settings**

</div>

## Lo que puede conectar {#what-you-can-wire-up}

| Dirección | Disparador | Acción |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Create/Update Person + Add to Group |
| B1 → Text In Church | B1 `form.submission.created` | Enviar un mensaje de texto a través del equipo correspondiente |
| B1 → Text In Church | B1 `group.member.added` | Add to Group (reflejar la membresía del grupo) |
| Text In Church → B1 | Connect Card Submitted | B1: Create Person + Add Group Member |
| Text In Church → B1 | Person Created | B1: Create Person |
| Text In Church → B1 | Person Joined Group | B1: Add Group Member |

Las acciones de Text In Church también incluyen *Send Text Message*, *Send Voice Broadcast*, *Create Task*, *Find Person/Group* y agregar o quitar membresías de grupo.

## Configuración {#setup}

### 1. Cree una clave de API de B1 {#1-mint-a-b1-api-key}

**Settings → Developer → API Keys → New API Key**:

- `settings:write`: necesario para conectar la clave con Zapier y para los Zaps activados por B1
- `people:read`, `people:write`: para buscar o crear a la persona
- `groups:write`: para la sincronización de grupos
- (Opcional) `donations:write` si quiere enviar confirmaciones de donativos a TIC

### 2. Conecte Text In Church con Zapier {#2-connect-text-in-church-to-zapier}

Siga la [guía de integración de Text In Church con Zapier](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration). Generan un token de API desde el panel de TIC.

### 3. Cree el Zap de tarjeta de conexión a B1 {#3-build-the-connect-card-to-b1-zap}

Es la dirección más común. Las tarjetas de conexión enviadas desde TIC se convierten automáticamente en personas nuevas de B1.

1. **Disparador**: Text In Church: Connect Card Submitted.
2. **Acción**: B1.church: Find Person (por correo electrónico).
3. **Acción**: B1.church: Add Group Member a un grupo "Contacto nuevo", usando el id de la persona del paso 2.

*Find Person* de B1 detiene el Zap con un error "No person found" cuando nadie coincide, así que un Path no puede bifurcarse según ese resultado. Para los contactos nuevos, active el manejo de errores de Zapier para el paso Find Person y, en su ruta de error, ejecute B1.church: Create Person y luego Add Group Member.

Active el Zap. La siguiente tarjeta de conexión enviada a través de TIC aparecerá automáticamente en **B1Admin → People**.

## Recetas comunes {#common-recipes}

### Activar un flujo de trabajo tipo tarjeta de conexión desde un formulario de B1 {#trigger-a-connect-card-style-workflow-from-a-b1-form}

- **Disparador**: B1.church: New Form Submission (filtrado por el id del formulario "Soy nuevo aquí")
- **Acción**: Text In Church: Create/Update Person, asignando las respuestas de correo electrónico, teléfono y nombre del formulario
- **Acción**: Text In Church: Add to Group, donde el grupo tiene adjunto un flujo de bienvenida preconfigurado

### Reflejar la membresía de grupos {#mirror-group-membership}

- **Disparador**: B1.church: New Group Member, filtrado por un `groupId` específico
- **Acción**: Text In Church: Add to Group (la misma persona, en el grupo reflejado). Combínelo con un Zap de `group.member.removed` si quiere una sincronización completa.

### Avisar a un líder cuando alguien se une {#page-a-leader-when-someone-joins}

- **Disparador**: B1.church: New Group Member
- **Acción**: Text In Church: Send Text Message, destinatario = el teléfono del líder del grupo, cuerpo = `"{first} {last} just joined {group}"`.

## Límites y notas {#limits--notes}

- **La aplicación de Zapier de TIC depende del nivel del plan.** Si la integración de Zapier aparece deshabilitada en el panel de TIC, comuníquese con el soporte de TIC para habilitarla en su plan.
- **Los ids de grupo son de TIC, no de B1.** Al reflejar grupos, deberá mantener una tabla de correspondencia en algún lugar (una *Lookup Table* de Zapier, o fija en cada Zap).
- **Send Text Message consume créditos.** Cada Zap que activa *Send Text* consume su cupo de SMS de TIC.

## Solución de problemas {#troubleshooting}

- **El disparador de tarjeta de conexión no se activa**: TIC necesita que el interruptor de la integración con Zapier esté activado. Verifique también que el formulario que usó para probar esté configurado como "Connect Card" y no como encuesta genérica.
- **Create Person en B1 falla con 401**: la clave de API es incorrecta, fue revocada o no tiene `people:write`. Cree una nueva.
- **Personas duplicadas en B1**: TIC envía tanto *Person Created* como *Connect Card Submitted* para el mismo evento. Elija uno como fuente de verdad y agregue un Filter de Zapier al otro.

## Vea también {#see-also}

- [Clearstream](./clearstream.md): plataforma de SMS alternativa con una forma de Zapier similar
- [Zapier (descripción general)](../zapier.md): el lado de B1 de cada receta de Zapier
- [Guía de Zapier de Text In Church](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (documentación de TIC)
