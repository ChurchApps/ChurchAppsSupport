---
title: "Text In Church"
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) agrupa SMS más flujos de trabajo de goteo y automatizaciones de tarjetas de conexión. Su aplicación de Zapier expone ambas direcciones — canaliza eventos de B1 a un flujo de trabajo de Text In Church, e importa disparadores de tarjeta de conexión o de nuevo contacto al otro lado a B1.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Una cuenta de [Text In Church](https://textinchurch.com) en un plan que incluye la integración de Zapier
- Una cuenta de [Zapier](https://zapier.com)
- Un usuario de B1Admin con permiso **Editar Configuración**

</div>

## Qué Puedes Conectar

| Dirección | Disparador | Acción |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Crear/actualizar persona + Agregar a grupo |
| B1 → Text In Church | B1 `form.submission.created` | Enviar mensaje de texto a través del equipo relevante |
| B1 → Text In Church | B1 `group.member.added` | Agregar a grupo (reflejar membresía de grupo) |
| Text In Church → B1 | Tarjeta de conexión enviada | B1: Crear persona + Agregar miembro de grupo |
| Text In Church → B1 | Persona creada | B1: Crear persona |
| Text In Church → B1 | Persona se unió a grupo | B1: Agregar miembro de grupo |

Las acciones de Text In Church también incluyen *Enviar mensaje de texto*, *Enviar transmisión de voz*, *Crear tarea*, *Buscar persona/grupo*, y agregar/eliminar membresía de grupo.

## Configuración

### 1. Crear una clave de API B1

**Configuración → Desarrollador → Claves de API → Nueva Clave de API**:

- `settings:write` — requerido para Zaps disparados por B1
- `people:read`, `people:write` — para buscar o crear la persona
- `groups:write` — para sincronización de grupos
- (Opcional) `donations:write` si conectas confirmaciones de regalo a TIC

### 2. Conectar Text In Church a Zapier

Sigue la [guía de integración de Zapier de Text In Church](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration). Generan un token de API desde dentro del panel de TIC.

### 3. Construir el Zap de tarjeta de conexión a B1

La dirección más común. Las tarjetas de conexión disparadas desde TIC se convierten automáticamente en nuevas personas de B1.

1. **Disparador** — Text In Church: Tarjeta de conexión enviada.
2. **Acción** — B1.church: Buscar persona (por correo).
3. **Ruta** — bifurca en encontrado / no encontrado:
   - No encontrado → B1.church: Crear persona.
   - Encontrado → continuar.
4. **Acción** — B1.church: Agregar miembro de grupo a un grupo "Nuevo contacto".

Activa el Zap. La siguiente tarjeta de conexión enviada a través de TIC llega a **B1Admin → Personas** automáticamente.

## Recetas Comunes

### Disparar un flujo de trabajo estilo tarjeta de conexión desde un formulario de B1

- **Disparador** — B1.church: Nuevo envío de formulario (filtro en la id del formulario "Soy nuevo aquí")
- **Acción** — Text In Church: Crear/actualizar persona, mapeando las respuestas de correo / teléfono / nombre del formulario
- **Acción** — Text In Church: Agregar a grupo, donde el grupo tiene un flujo de trabajo de bienvenida preestablecido adjunto

### Reflejar membresía de grupo

- **Disparador** — B1.church: Nuevo miembro de grupo, filtrado en un `groupId` específico
- **Acción** — Text In Church: Agregar a grupo (misma persona, grupo espejo). Empareja con un Zap `group.member.removed` si deseas sincronización completa.

### Notificar a un líder cuando alguien se une

- **Disparador** — B1.church: Nuevo miembro de grupo
- **Acción** — Text In Church: Enviar mensaje de texto, destinatario = teléfono del líder del grupo, cuerpo = `"{first} {last} acaba de unirse a {group}"`.

## Límites y Notas

- **La aplicación de Zapier de TIC se cierra detrás del nivel del plan.** Si la integración de Zapier está atenuada en el panel de TIC, contacta al soporte de TIC para habilitarla en tu plan.
- **Las ids de grupo son de TIC, no de B1.** Al reflejar, mantendrás una tabla de asignación en algún lugar (una *tabla de búsqueda* de Zapier, o codificada por Zap).
- **Enviar mensaje de texto consume créditos.** Cada Zap que dispara *Enviar texto* consume de tu asignación de SMS de TIC.

## Solución de Problemas

- **El disparador de tarjeta de conexión no se activa** — TIC necesita el toggle de integración de Zapier activado. También verifica que el formulario que probaste está configurado como una "Tarjeta de conexión", no una encuesta genérica.
- **Crear persona en B1 falla con 401** — la clave de API es incorrecta, ha sido revocada, o carece de `people:write`. Recrea.
- **Personas duplicadas de B1** — TIC envía tanto *Persona creada* como *Tarjeta de conexión enviada* para el mismo evento. Elige uno como tu fuente de verdad y agrega un filtro de Zapier en el otro.

## Ver También

- [Clearstream](./clearstream) — plataforma SMS alternativa con forma de Zapier similar
- [Zapier (descripción general)](../zapier) — lado B1 de cada receta de Zapier
- [Guía de Zapier de Text In Church](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (documentos de TIC)
