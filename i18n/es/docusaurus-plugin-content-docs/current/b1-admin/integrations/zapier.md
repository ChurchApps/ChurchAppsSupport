---
title: "Zapier"
---

# Zapier

<div class="article-intro">

La aplicación oficial de B1 Church en Zapier te permite que un Zap reaccione a eventos en tu iglesia (nueva persona, nueva donación, nuevo miembro del grupo, ...) y escriba registros de vuelta a B1. Sin codificación, sin infraestructura — simplemente conéctalo en el editor de arrastrar y soltar de Zapier, pega una clave API, y activa el Zap.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Una cuenta en [Zapier](https://zapier.com) (la versión gratuita es suficiente para algunos Zaps)
- Un administrador de iglesia con permiso de **Editar Configuración** en B1 Admin (crearás una clave API)
- Una idea de lo que quieres hacer — p. ej. "cuando se agregue una persona en B1, agrégala a mi lista de Mailchimp"

</div>

## Disparadores y Acciones

| Tipo | Qué | Evento / Endpoint de B1 |
|---|---|---|
| **Disparador** | Nueva Persona | `person.created` |
| **Disparador** | Persona Actualizada | `person.updated` |
| **Disparador** | Nueva Donación | `donation.created` |
| **Disparador** | Nuevo Miembro del Grupo | `group.member.added` |
| **Disparador** | Nuevo Envío de Formulario | `form.submission.created` |
| **Acción** | Crear Persona | agrega una nueva persona |
| **Acción** | Agregar Donación | registra una donación |
| **Acción** | Agregar Miembro del Grupo | agrega una persona a un grupo |
| **Búsqueda** | Encontrar Persona | busca una persona por id, correo, o nombre |

Combina estos libremente con cualquiera de las 7,000+ aplicaciones compatibles de Zapier.

## Configuración

### 1. Crear una clave API de B1

1. En B1 Admin ve a **Configuración → Desarrollador → Claves API**.
2. Haz clic en **Nueva Clave API**, dale un nombre como "Zapier", y selecciona los alcances que el Zap necesita.
3. **Importante:** Los disparadores de Zapier registran un webhook en tu nombre cuando el Zap se activa, lo cual requiere el alcance **`settings:write`**. Siempre incluye `settings:write` si alguno de tus Zaps usa un disparador de B1.
4. También otorga los alcances que las acciones necesitan — por ejemplo, una acción "Agregar Donación" necesita `donations:write`, "Crear Persona" necesita `people:write`.
5. Guarda. La clave completa `cak_…` se muestra **una sola vez** — cópiala.

### 2. Conectar Zapier a B1

1. En Zapier, crea un nuevo Zap.
2. Cuando elijas un disparador o acción de B1 por primera vez, Zapier te pide que **Inicies Sesión en B1 Church**.
3. Pega la clave API del paso 1 y haz clic en **Sí, Continuar**. Zapier la valida contra tu iglesia.

La conexión se guarda en Zapier y se reutiliza por cada Zap en tu cuenta.

### 3. Construir el Zap

Elige un disparador, luego agrega uno o más pasos de acción. Ejemplos abajo.

## Recetas Comunes

### Agregar nuevas personas de B1 a Mailchimp

- **Disparador** — B1: Nueva Persona
- **Acción** — Mailchimp: Agregar/Actualizar Suscriptor. Asigna el `name__first`, `name__last`, `contactInfo__email` de B1 a los campos Nombre / Apellido / Correo Electrónico de Mailchimp.

### Publicar donaciones en un canal de Slack con una tarjeta más rica que el conector integrado

- **Disparador** — B1: Nueva Donación
- **Acción** — Slack: Enviar Mensaje al Canal. Compone cualquier diseño — botones, adjuntos, etc. — que el [conector de Slack](./slack-discord) integrado no pueda.

### Agregar nuevos miembros del grupo a un Grupo de Google

- **Disparador** — B1: Nuevo Miembro del Grupo (filtrado por un `groupId` específico)
- **Acción** — Filtrar por Zapier: continúa solo si el grupo de B1 es el que te importa
- **Acción** — B1: Encontrar Persona (usa el `personId` del disparador para obtener el correo electrónico)
- **Acción** — Google Groups: Agregar Miembro

### Reenviar envíos de formularios a un rastreador de proyectos

- **Disparador** — B1: Nuevo Envío de Formulario
- **Acción** — Notion / Linear / Asana / Trello: Crear Página / Issue / Tarea

## Cómo Funcionan los Disparadores Bajo el Capó

Los disparadores son **REST hooks**, no polling — Zapier no hace ping a B1 cada 15 minutos. Cuando activas el Zap, Zapier le pide a B1 que registre un webhook que apunte a una URL privada de Zapier; cuando el evento sucede, B1 hace POST del envío a Zapier y tu Zap se inicia **en segundos**. Desactiva el Zap y Zapier le pide a B1 que elimine el webhook — sin suscripciones huérfanas.

Esto significa que el disparador solo se activa para eventos que suceden **después** de que el Zap se activa. No hay relleno — activar un Zap no reproduce las donaciones de ayer.

## Límites y Notas

- **Múltiples Zaps con el mismo disparador** cada uno registra su propio webhook de B1 — no hay conflicto, pero vale la pena saberlo si estás inspeccionando **Configuración → Desarrollador → Webhooks** y te preguntabas por qué hay tres filas idénticas de `Zapier — donation.created`.
- **Datos de prueba en la configuración de Zap** — cuando construyes un Zap, Zapier te pide datos de ejemplo para asignar campos. Extraerá el evento más reciente que coincida de B1 si existe uno; de lo contrario, usa una muestra sintética de la definición de la aplicación.
- **Las fallas de acción aparecen como errores de Zap** en el historial de tareas de Zapier. Causa común: una clave API sin el alcance correcto (p. ej. una acción "Agregar Donación" necesita `donations:write`). Regenera la clave con los alcances correctos y reconecta en Zapier.
- **Cuotas de llamadas API salientes** — cada llamada API de B1 desde una acción cuenta hacia tu cuota de tareas de Zapier, no hacia nada en el lado de B1.

## Solución de Problemas

- **"Falló la autenticación"** al conectar — la clave API es incorrecta, fue revocada, o le faltan los alcances que el Zap necesita. Regenera la clave en B1 Admin con al menos `settings:write` más cualesquiera alcances de recursos que el Zap toque, luego actualiza la conexión.
- **El disparador nunca se activa** — confirma que el webhook realmente se registró: en B1 Admin, **Configuración → Desarrollador → Webhooks** ahora debería mostrar una fila llamada "Zapier — <event>". Si no está ahí, la clave API probablemente carecía de `settings:write` cuando activaste el Zap. Arregla la clave, apaga y enciende el Zap de nuevo.
- **El disparador se activa dos veces** — Zapier ocasionalmente reentrega si su confirmación se perdió. Usa un paso "Filtrar por Zapier" en una id única (p. ej. la `id` de la persona) si necesitas deduplicación estricta.

## Ver También

- [Make](./make) — el mismo patrón, diferente plataforma
- [Slack & Discord](./slack-discord) — notificaciones de chat más simples sin Zapier
- [Webhooks (Referencia de Desarrollador)](/docs/developer/api/webhooks)
