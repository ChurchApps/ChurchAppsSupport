---
title: "Zapier"
description: "Conecte B1 Admin con Zapier para iniciar automatizaciones con nuevas personas, donaciones y miembros de grupos, y escribir registros de vuelta en B1 sin programar."
---

# Zapier

<div class="article-intro">

La aplicación oficial de B1.church en Zapier permite que un Zap reaccione a los eventos de su iglesia (nueva persona, nueva donación, nuevo miembro de grupo, …) y escriba registros de vuelta en B1. Sin programación ni infraestructura: se configura en el editor de arrastrar y soltar de Zapier, se pega una clave de API y se activa el Zap.

</div>

:::caution En espera de la aprobación de Zapier
La aplicación de B1.church está terminada y funciona, pero todavía está en espera de la revisión de Zapier antes de aparecer públicamente en el directorio de aplicaciones del editor de Zaps. Hasta que la aprueben, solo pueden usarla las cuentas invitadas. Todo lo que aparece a continuación describe cómo funcionará una vez aprobada.
:::

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Una cuenta de [Zapier](https://zapier.com) (el plan gratuito basta para unos cuantos Zaps)
- Un administrador de la iglesia con el permiso **Edit Settings** en B1Admin (creará una clave de API)
- Una idea de lo que quiere hacer, por ejemplo: "cuando se agregue una persona en B1, agregarla a mi lista de Mailchimp"

</div>

## Disparadores y acciones {#triggers-and-actions}

| Tipo | Qué es | Evento / endpoint de B1 |
|---|---|---|
| **Disparador** | New Person | `person.created` |
| **Disparador** | Updated Person | `person.updated` |
| **Disparador** | New Donation | `donation.created` |
| **Disparador** | New Group Member | `group.member.added` |
| **Disparador** | New Form Submission | `form.submission.created` |
| **Acción** | Create Person | agrega una persona nueva |
| **Acción** | Add Donation | registra una donación |
| **Acción** | Add Group Member | agrega una persona a un grupo |
| **Acción** | Find Person | busca una persona por id, correo electrónico o nombre; si nadie coincide, la tarea falla |

Puede combinar estos elementos libremente con cualquiera de las más de 7,000 aplicaciones compatibles con Zapier.

## Configuración {#setup}

### 1. Cree una clave de API de B1 {#1-create-a-b1-api-key}

1. En B1Admin vaya a **Settings → Developer → API Keys**.
2. Haga clic en **New API Key**, póngale un nombre como "Zapier" y seleccione los scopes que necesite el Zap.
3. **Importante:** incluya siempre el scope **`settings:write`**. Zapier verifica la clave contra la lista de webhooks de B1 al conectarla, y los disparadores de B1 registran un webhook en su nombre cuando se activa el Zap; ambos casos requieren `settings:write`. Una clave sin este scope falla la prueba de conexión, aunque sus Zaps solo usen acciones de B1.
4. Otorgue también los scopes que requieran las acciones: por ejemplo, la acción "Add Donation" necesita `donations:write` y "Create Person" necesita `people:write`.
5. Guarde. La clave completa `cak_…` se muestra **una sola vez**: cópiela.

### 2. Conecte Zapier con B1 {#2-connect-zapier-to-b1}

1. En Zapier, cree un Zap nuevo.
2. La primera vez que elija un disparador o una acción de B1, Zapier le pedirá que **inicie sesión en B1.church**.
3. Pegue la clave de API del paso 1 en **API Key** (deje **API URL** en blanco) y haga clic en **Yes, Continue**. Zapier la valida con su iglesia.

La conexión se guarda en Zapier y la reutiliza cada Zap de su cuenta.

### 3. Cree el Zap {#3-build-the-zap}

Elija un disparador y luego agregue uno o más pasos de acción. A continuación hay ejemplos.

## Recetas comunes {#common-recipes}

### Agregar las personas nuevas de B1 a Mailchimp {#add-new-b1-people-to-mailchimp}

- **Disparador**: B1: New Person
- **Acción**: Mailchimp: Add/Update Subscriber. Asigne `name__first`, `name__last` y `contactInfo__email` de B1 a los campos First Name / Last Name / Email de Mailchimp.

### Publicar donaciones en un canal de Slack con una tarjeta más completa que el conector integrado {#post-donations-to-a-slack-channel-with-a-richer-card-than-the-built-in-connector}

- **Disparador**: B1: New Donation
- **Acción**: Slack: Send Channel Message. Redacte cualquier diseño (botones, adjuntos, etc.) que el [conector de Slack](./slack-discord.md) integrado no puede hacer.

### Agregar a los nuevos miembros de grupos a un Google Group {#add-new-group-members-to-a-google-group}

- **Disparador**: B1: New Group Member
- **Acción**: Filter by Zapier: continúe solo si el `groupId` del disparador es el grupo de B1 que le interesa
- **Acción**: B1: Find Person (use el `personId` del disparador para obtener el correo electrónico)
- **Acción**: Google Groups: Add Member

### Enviar los formularios recibidos a un gestor de proyectos {#forward-form-submissions-to-a-project-tracker}

- **Disparador**: B1: New Form Submission
- **Acción**: Notion / Linear / Asana / Trello: Create page / issue / task

## Cómo funcionan los disparadores internamente {#how-triggers-work-under-the-hood}

Los disparadores son **REST hooks**, no sondeos: Zapier no consulta a B1 cada 15 minutos. Cuando activa el Zap, Zapier le pide a B1 que registre un webhook que apunte a una URL privada de Zapier; cuando ocurre el evento, B1 envía el sobre a Zapier y su Zap se inicia **en cuestión de segundos**. Si desactiva el Zap, Zapier le pide a B1 que elimine el webhook: no quedan suscripciones huérfanas.

Esto significa que el disparador solo se activa con los eventos que ocurren **después** de activar el Zap. No hay recuperación retroactiva: activar un Zap no reproduce las donaciones de ayer.

## Límites y notas {#limits--notes}

- **Varios Zaps con el mismo disparador** registran cada uno su propio webhook de B1. No hay conflicto, pero conviene saberlo si revisa **Settings → Developer → Webhooks** y se pregunta por qué aparecen tres filas idénticas `Zapier — donation.created`.
- **Datos de prueba en la configuración del Zap**: al crear un Zap, Zapier pide datos de muestra para asignar los campos. Obtendrá el evento correspondiente más reciente de B1 si existe; si no, usa una muestra sintética de la definición de la aplicación.
- **Los fallos de las acciones aparecen como errores del Zap** en el historial de tareas de Zapier. La causa habitual es una clave de API sin el scope correcto (por ejemplo, la acción "Add Donation" necesita `donations:write`). Vuelva a crear la clave con los scopes correctos y reconéctela en Zapier.
- **Cuotas de llamadas a la API saliente**: cada llamada a la API de B1 desde una acción cuenta contra su cuota de tareas de Zapier, no contra nada del lado de B1.

## Solución de problemas {#troubleshooting}

- **"Authentication failed"** al conectar: la clave de API es incorrecta, fue eliminada o le falta `settings:write`. Cree una clave nueva en B1Admin con `settings:write` más los scopes de recursos que use el Zap (los scopes no se pueden cambiar en una clave existente) y luego actualice la conexión.
- **El disparador nunca se activa**: confirme que el webhook se haya registrado de verdad. En B1Admin, **Settings → Developer → Webhooks** debería mostrar ahora una fila llamada "Zapier — &lt;event&gt;". Si no aparece, es probable que la clave de API no tuviera `settings:write` cuando activó el Zap. Corrija la clave, desactive el Zap y vuelva a activarlo.
- **El disparador se activa dos veces**: Zapier a veces vuelve a entregar un evento si se perdió su confirmación. Use un paso "Filter by Zapier" sobre un id único (por ejemplo, el `id` de la persona) si necesita una deduplicación estricta.

## Vea también {#see-also}

- [Make](./make.md): el mismo patrón, en otra plataforma
- [Slack y Discord](./slack-discord.md): notificaciones de chat más sencillas, sin Zapier
- [Webhooks (referencia para desarrolladores)](/docs/developer/api/webhooks)
