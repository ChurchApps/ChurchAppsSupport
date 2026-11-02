---
title: "Zapier"
---

# Zapier

<div class="article-intro">

La aplicación oficial de B1.church en Zapier permite que un Zap reaccione a eventos de su iglesia (nueva persona, nuevo donativo, nuevo miembro de grupo, …) y escriba registros de vuelta en B1. Sin programar, sin infraestructura: lo conecta en el editor de arrastrar y soltar de Zapier, pega una clave de API y activa el Zap.

</div>

:::caution En espera de la aprobación de Zapier
La aplicación de B1.church está creada y funcionando, pero aún espera la revisión de Zapier antes de aparecer públicamente en el directorio de aplicaciones del editor de Zaps. Hasta que se apruebe, solo las cuentas invitadas pueden usarla. Todo lo que se describe a continuación explica cómo funcionará una vez aprobada.
:::

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Una cuenta de [Zapier](https://zapier.com) (el plan gratuito basta para unos cuantos Zaps)
- Un administrador de la iglesia con el permiso **Editar configuración** en B1Admin (creará una clave de API)
- Una idea de lo que quiere hacer, por ejemplo: "cuando se agregue una persona en B1, agregarla a mi lista de Mailchimp"

</div>

## Disparadores y acciones

| Tipo | Qué es | Evento / endpoint de B1 |
|---|---|---|
| **Disparador** | Nueva persona | `person.created` |
| **Disparador** | Persona actualizada | `person.updated` |
| **Disparador** | Nuevo donativo | `donation.created` |
| **Disparador** | Nuevo miembro de grupo | `group.member.added` |
| **Disparador** | Nuevo envío de formulario | `form.submission.created` |
| **Acción** | Crear persona | agrega una nueva persona |
| **Acción** | Agregar donativo | registra un donativo |
| **Acción** | Agregar miembro de grupo | agrega una persona a un grupo |
| **Acción** | Buscar persona | busca a una persona por id, correo electrónico o nombre; si nadie coincide, la tarea falla |

Combínelos libremente con cualquiera de las más de 7,000 aplicaciones compatibles con Zapier.

## Configuración

### 1. Crear una clave de API de B1

1. En B1Admin vaya a **Configuración → Desarrollador → Claves de API**.
2. Haga clic en **Nueva clave de API**, póngale un nombre como "Zapier" y seleccione los ámbitos que necesita el Zap.
3. **Importante:** los disparadores de Zapier registran un webhook en su nombre cuando se activa el Zap, lo cual requiere el ámbito **`settings:write`**. Incluya siempre `settings:write` si alguno de sus Zaps usa un disparador de B1.
4. Otorgue también los ámbitos que necesitan las acciones; por ejemplo, la acción "Agregar donativo" necesita `donations:write` y "Crear persona" necesita `people:write`.
5. Guarde. La clave completa `cak_…` se muestra **una sola vez**; cópiela.

### 2. Conectar Zapier con B1

1. En Zapier, cree un nuevo Zap.
2. Cuando elija por primera vez un disparador o una acción de B1, Zapier le pedirá que **inicie sesión en B1.church**.
3. Pegue la clave de API del paso 1 y haga clic en **Sí, continuar**. Zapier la valida con su iglesia.

La conexión se guarda en Zapier y la reutiliza cada Zap de su cuenta.

### 3. Crear el Zap

Elija un disparador y luego agregue uno o más pasos de acción. Ejemplos a continuación.

## Recetas comunes

### Agregar nuevas personas de B1 a Mailchimp

- **Disparador**: B1: Nueva persona
- **Acción**: Mailchimp: Agregar/actualizar suscriptor. Asigne `name__first`, `name__last` y `contactInfo__email` de B1 a los campos Nombre / Apellido / Correo electrónico de Mailchimp.

### Publicar donativos en un canal de Slack con una tarjeta más completa que el conector integrado

- **Disparador**: B1: Nuevo donativo
- **Acción**: Slack: Enviar mensaje a canal. Arme cualquier diseño (botones, adjuntos, etc.) que el [conector de Slack](./slack-discord) integrado no permite.

### Agregar nuevos miembros de grupo a un Grupo de Google

- **Disparador**: B1: Nuevo miembro de grupo (filtrado a un `groupId` específico)
- **Acción**: Filtrar por Zapier: continuar solo si el grupo de B1 es el que le interesa
- **Acción**: B1: Buscar persona (use el `personId` del disparador para obtener el correo electrónico)
- **Acción**: Grupos de Google: Agregar miembro

### Enviar envíos de formularios a un gestor de proyectos

- **Disparador**: B1: Nuevo envío de formulario
- **Acción**: Notion / Linear / Asana / Trello: Crear página / incidencia / tarea

## Cómo funcionan los disparadores

Los disparadores son **REST hooks**, no consultas periódicas: Zapier no le pregunta a B1 cada 15 minutos. Cuando activa el Zap, Zapier le pide a B1 que registre un webhook que apunta a una URL privada de Zapier; cuando ocurre el evento, B1 envía el paquete a Zapier y su Zap se inicia **en cuestión de segundos**. Si desactiva el Zap, Zapier le pide a B1 que elimine el webhook, así no quedan suscripciones huérfanas.

Esto significa que el disparador solo se activa con eventos que ocurren **después** de activar el Zap. No hay retroactividad: activar un Zap no reproduce los donativos de ayer.

## Límites y notas

- **Varios Zaps con el mismo disparador** registran cada uno su propio webhook de B1; no hay conflicto, pero conviene saberlo si revisa **Configuración → Desarrollador → Webhooks** y se pregunta por qué aparecen tres filas idénticas de `Zapier — donation.created`.
- **Datos de prueba en la configuración del Zap**: al crear un Zap, Zapier pide datos de muestra para asignar los campos. Tomará el evento correspondiente más reciente de B1 si existe; si no, usa una muestra sintética de la definición de la aplicación.
- **Los fallos de acciones aparecen como errores del Zap** en el historial de tareas de Zapier. La causa común es una clave de API sin el ámbito correcto (por ejemplo, una acción "Agregar donativo" necesita `donations:write`). Genere de nuevo la clave con los ámbitos correctos y vuelva a conectar en Zapier.
- **Cuotas de llamadas salientes a la API**: cada llamada de API de B1 que hace una acción cuenta para su cuota de tareas de Zapier, no para nada del lado de B1.

## Solución de problemas

- **"Error de autenticación"** al conectar: la clave de API es incorrecta, fue revocada o le faltan los ámbitos que necesita el Zap. Genere de nuevo la clave en B1Admin con al menos `settings:write` más los ámbitos de recursos que use el Zap, y luego actualice la conexión.
- **El disparador nunca se activa**: confirme que el webhook se registró realmente. En B1Admin, **Configuración → Desarrollador → Webhooks** debería mostrar ahora una fila llamada "Zapier — &lt;evento&gt;". Si no está, es probable que la clave de API no tuviera `settings:write` cuando activó el Zap. Corrija la clave, desactive el Zap y vuelva a activarlo.
- **El disparador se activa dos veces**: Zapier a veces vuelve a entregar un evento si se perdió su confirmación. Si necesita una deduplicación estricta, use un paso de "Filtrar por Zapier" con un id único (por ejemplo, el `id` de la persona).

## Consulte también

- [Make](./make): el mismo patrón, en otra plataforma
- [Slack y Discord](./slack-discord): notificaciones de chat más simples sin Zapier
- [Webhooks (referencia para desarrolladores)](/docs/developer/api/webhooks)
