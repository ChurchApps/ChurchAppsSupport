---
title: "Zapier"
---

# Zapier

<div class="article-intro">

La aplicación oficial de B1.church en Zapier permite que un Zap reaccione a eventos en su iglesia (nueva persona, nueva donación, nuevo miembro de grupo, …) y escriba registros de vuelta en B1. Sin programación, sin infraestructura — lo conecta en el editor de arrastrar y soltar de Zapier, pega una clave API y activa el Zap.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Una cuenta de [Zapier](https://zapier.com) (el nivel gratuito es suficiente para unos cuantos Zaps)
- Un administrador de la iglesia con el permiso **Editar Configuración** en B1Admin (creará una clave API)
- Una idea de lo que desea hacer — por ejemplo, "cuando se agrega una persona en B1, agregarla a mi lista de Mailchimp"

</div>

## Disparadores y Acciones

| Tipo | Qué | Evento / endpoint de B1 |
|---|---|---|
| **Disparador** | Nueva Persona | `person.created` |
| **Disparador** | Persona Actualizada | `person.updated` |
| **Disparador** | Nueva Donación | `donation.created` |
| **Disparador** | Nuevo Miembro de Grupo | `group.member.added` |
| **Disparador** | Nuevo Envío de Formulario | `form.submission.created` |
| **Acción** | Crear Persona | agrega una nueva persona |
| **Acción** | Agregar Donación | registra una donación |
| **Acción** | Agregar Miembro de Grupo | agrega una persona a un grupo |
| **Acción** | Buscar Persona | busca a una persona por id, correo electrónico o nombre; falla la tarea si nadie coincide |

Combine estos libremente con cualquiera de las más de 7,000 aplicaciones compatibles con Zapier.

## Configuración

### 1. Cree una clave API de B1

1. En B1Admin vaya a **Configuración → Desarrollador → Claves API**.
2. Haga clic en **Nueva Clave API**, asígnele un nombre como "Zapier", y seleccione los alcances que necesite el Zap.
3. **Importante:** los disparadores de Zapier registran un webhook en su nombre cuando el Zap se activa, lo cual requiere el alcance **`settings:write`**. Incluya siempre `settings:write` si alguno de sus Zaps usa un disparador de B1.
4. También otorgue los alcances que necesiten las acciones — por ejemplo, una acción de "Agregar Donación" necesita `donations:write`, "Crear Persona" necesita `people:write`.
5. Guarde. La clave completa `cak_…` se muestra **una vez** — cópiela.

### 2. Conecte Zapier a B1

1. En Zapier, cree un nuevo Zap.
2. Cuando elija un disparador o acción de B1 por primera vez, Zapier le pedirá **Iniciar sesión en B1.church**.
3. Pegue la clave API del paso 1 y haga clic en **Sí, Continuar**. Zapier la valida contra su iglesia.

La conexión se guarda en Zapier y se reutiliza en cada Zap de su cuenta.

### 3. Construya el Zap

Elija un disparador, luego agregue uno o más pasos de acción. Ejemplos a continuación.

## Recetas Comunes

### Agregar nuevas personas de B1 a Mailchimp

- **Disparador** — B1: Nueva Persona
- **Acción** — Mailchimp: Agregar/Actualizar Suscriptor. Mapee `name__first`, `name__last`, `contactInfo__email` de B1 a los campos Nombre / Apellido / Correo Electrónico de Mailchimp.

### Publicar donaciones en un canal de Slack con una tarjeta más elaborada que el conector integrado

- **Disparador** — B1: Nueva Donación
- **Acción** — Slack: Enviar Mensaje al Canal. Componga cualquier diseño — botones, adjuntos, etc. — que el [conector de Slack](./slack-discord) integrado no pueda.

### Agregar nuevos miembros de grupo a un Grupo de Google

- **Disparador** — B1: Nuevo Miembro de Grupo (filtrado a un `groupId` específico)
- **Acción** — Filtrar por Zapier: continuar solo si el grupo de B1 es el que le interesa
- **Acción** — B1: Buscar Persona (use el `personId` del disparador para obtener el correo electrónico)
- **Acción** — Google Groups: Agregar Miembro

### Reenviar envíos de formularios a un rastreador de proyectos

- **Disparador** — B1: Nuevo Envío de Formulario
- **Acción** — Notion / Linear / Asana / Trello: Crear página / incidencia / tarea

## Cómo Funcionan los Disparadores Bajo el Capó

Los disparadores son **REST hooks**, no sondeo — Zapier no consulta a B1 cada 15 minutos. Cuando activa el Zap, Zapier le pide a B1 que registre un webhook apuntando a una URL privada de Zapier; cuando se dispara el evento, B1 envía el sobre por POST a Zapier y su Zap se inicia **en segundos**. Desactive el Zap y Zapier le pide a B1 que elimine el webhook — sin suscripciones huérfanas.

Esto significa que el disparador solo se activa para eventos que ocurren **después** de que el Zap se activa. No hay relleno retroactivo — activar un Zap no reproduce las donaciones de ayer.

## Límites y Notas

- **Varios Zaps con el mismo disparador** registran cada uno su propio webhook de B1 — no hay conflicto, pero vale la pena saberlo si está inspeccionando **Configuración → Desarrollador → Webhooks** y se pregunta por qué hay tres filas idénticas de `Zapier — donation.created`.
- **Datos de prueba en la configuración del Zap** — al crear un Zap, Zapier pide datos de muestra para mapear campos. Extraerá el evento coincidente más reciente de B1 si existe uno; de lo contrario, usa una muestra sintética de la definición de la aplicación.
- **Los fallos de acción aparecen como errores del Zap** en el historial de tareas de Zapier. Causa común: una clave API sin el alcance correcto (por ejemplo, una acción de "Agregar Donación" necesita `donations:write`). Vuelva a generar la clave con los alcances correctos y reconecte en Zapier.
- **Cuotas de llamadas API salientes** — cada llamada a la API de B1 desde una acción cuenta para su cuota de tareas de Zapier, no para nada del lado de B1.

## Solución de Problemas

- **"Authentication failed"** al conectar — la clave API es incorrecta, fue revocada, o le faltan los alcances que necesita el Zap. Vuelva a generarla en B1Admin con al menos `settings:write` más los alcances de recursos que toque el Zap, luego actualice la conexión.
- **El disparador nunca se activa** — confirme que el webhook realmente se registró: en B1Admin, **Configuración → Desarrollador → Webhooks** debería ahora mostrar una fila llamada "Zapier — &lt;evento&gt;". Si no está ahí, la clave API probablemente carecía de `settings:write` cuando activó el Zap. Corrija la clave, active y desactive el Zap.
- **El disparador se activa dos veces** — Zapier ocasionalmente reenvía si se perdió su confirmación. Use un paso de "Filtrar por Zapier" en un id único (por ejemplo, el `id` de la persona) si necesita una deduplicación estricta.

## Vea También

- [Make](./make) — mismo patrón, plataforma diferente
- [Slack y Discord](./slack-discord) — notificaciones de chat más simples sin Zapier
- [Webhooks (referencia para desarrolladores)](/docs/developer/api/webhooks)
