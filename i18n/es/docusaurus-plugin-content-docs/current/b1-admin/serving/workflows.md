---
title: "Flujos de trabajo"
---

# Flujos de trabajo

<div class="article-intro">

Los flujos de trabajo mueven a las personas por una serie de pasos en un tablero visual. Cada persona se convierte en una tarjeta que avanza de un paso al siguiente: desde el seguimiento de un visitante primerizo, pasando por un proceso de membresía, hasta un agradecimiento a alguien que da por primera vez, y cualquier otra situación en la que necesites llevar a muchas personas por las mismas etapas. Un paso puede pedirle a un voluntario que haga algo (llamar, tener una conversación) **y** ejecutar acciones automatizadas por sí mismo (enviar un correo o un mensaje de texto, esperar unos días, agregar a la persona a un grupo), así que los flujos de trabajo se encargan tanto del seguimiento humano como de las tareas repetitivas que lo rodean. Los flujos de trabajo amplían las [Tareas](./tasks.md) con un tablero Kanban de arrastrar y soltar para que nadie y nada se quede sin atención.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Asegúrate de que las personas que quieres seguir existan en B1 Admin
- Familiarízate con el funcionamiento de las [Tareas](./tasks.md), ya que cada tarjeta de un tablero es una tarea
- Para usar la acción **Send email**, primero crea las plantillas de correo que quieras enviar (se administran en **Settings → Email Templates**)
- Para usar la acción **Send text**, conecta primero un [proveedor de mensajes de texto](../settings/church-settings.md#texting)
- Necesitas el permiso de Tareas correspondiente. Ver, editar tarjetas y administrar flujos de trabajo son niveles de permiso distintos (consulta [Roles y permisos](../settings/roles-permissions.md))

</div>

## Ver los flujos de trabajo

Abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda de B1 Admin), expande **Serving** y haz clic en **Workflows**. Tus flujos de trabajo aparecen en una tabla que muestra la **Category** y el **Status** de cada uno (**Active** o **Inactive**). Si usas categorías, las pestañas sobre la lista te permiten filtrarla por categoría. Haz clic en cualquier flujo de trabajo para abrir su tablero.

## Crear un flujo de trabajo

1. En la página de Workflows, haz clic en **Add Workflow**.
2. Elige cómo empezar:
   - **Blank workflow**: empieza desde cero y crea tus propios pasos.
   - **From a template**: empieza con un conjunto de pasos listo para usar que puedes editar. Las plantillas integradas incluyen:
     - **New Visitor Follow-up**: Send welcome email → Personal phone call → Invite to next step → Connected
     - **Membership Class**: Express interest → Register for class → Attend class → Complete membership
     - **First-time Giver Thank-you**: Send thank-you note → Share giving impact → Stewarded
3. Asigna un **Name** al flujo de trabajo.
4. Opcionalmente, asigna una **Category** para agrupar flujos de trabajo relacionados. Puedes crear una categoría nueva directamente desde el menú desplegable.
5. Deja el flujo de trabajo en **Active** para que se pueda agregar personas, o cámbialo a **Inactive** para ocultarlo de las listas de agregar a un flujo de trabajo.
6. Haz clic en **Save**.

:::tip
Usa el botón **Duplicate** en la lista de Workflows para copiar un flujo de trabajo existente, incluidos sus pasos, acciones automatizadas y rutas, y usarlo como punto de partida para uno nuevo.
:::

## Construir el tablero con pasos

Cada tablero de flujo de trabajo está formado por **pasos**, que se muestran como columnas de izquierda a derecha. Abre un flujo de trabajo y usa **Add Step** para crear cada etapa de tu proceso.

Al agregar o editar un paso, puedes configurar:

- **Step Name**: el encabezado de la columna (por ejemplo, "Welcome Call" o "Awaiting Registration").
- **Due in (days)**: establece automáticamente una fecha de vencimiento cuando una tarjeta entra en este paso. Las tarjetas que pasan su fecha de vencimiento se marcan como **Overdue**.
- **Default assignee**: la persona o grupo al que se asignan automáticamente las tarjetas nuevas de este paso. Cuando el asignado por defecto es una persona, recibe una notificación de que se le asignó una tarjeta.
- **Automated actions**: cosas que el sistema hace por sí mismo cuando llega una tarjeta (ver más abajo).
- **Routing**: a dónde va la tarjeta cuando sale del paso (ver [Routing](#routing-cards-with-outcomes-and-conditions)).

Arrastra las columnas de los pasos hasta ponerlas en el orden que corresponda a tu proceso. El orden también define la ruta predeterminada que sigue una tarjeta cuando no se aplica ninguna otra regla de enrutamiento.

:::info
Guarda primero un paso nuevo. Las acciones automatizadas y el enrutamiento se asocian al paso, así que el editor desbloquea esas secciones una vez que el paso existe.
:::

## Acciones automatizadas

Cada paso puede tener una lista de **acciones automatizadas** que se ejecutan por sí solas en el momento en que una tarjeta **entra** al paso, antes de que alguien la toque. Así un paso puede tanto indicar a un voluntario qué hacer como encargarse del trabajo rutinario que rodea el seguimiento.

En el editor del paso, abre **Automated actions**, haz clic en **Add Action**, elige un tipo, completa su configuración y haz clic en el ícono de guardar de esa acción. Agrega todas las que necesites; se ejecutan **de arriba hacia abajo, en orden**.

| Acción | Qué hace |
|---|---|
| **Send email** | Envía a la persona una plantilla de correo que elijas. Puedes reemplazar el asunto. |
| **Send text** | Envía a la persona un mensaje que escribas, a través del [proveedor de mensajes de texto](../settings/church-settings.md#texting) de tu iglesia. |
| **Wait** | Pausa la tarjeta durante un número de días antes de continuar (ver más abajo). |
| **Add to group** | Agrega a la persona a un [grupo](../groups/index.md) que elijas. |
| **Remove from group** | Quita a la persona de un grupo que elijas. |
| **Add to workflow** | Inicia a la persona en otro flujo de trabajo; útil para pasar casos entre procesos. |
| **Add note** | Registra una nota en el historial de la tarjeta. |
| **Set field** | Actualiza un campo del registro de la persona: Membership Status, Marital Status, Gender, City, State o Zip. |
| **Webhook** | Envía los detalles de la tarjeta a una dirección web externa (URL) que proporciones, para conectar con otros sistemas. |
| **Create task** | Crea una [tarea](./tasks.md) con el título y la descripción que ingreses, asignada a quien elijas. |

Cuando terminan todas las acciones de un paso, la tarjeta **se queda en ese paso** para que una persona pueda trabajarla, a menos que el paso tenga una ruta automática que la mueva hacia adelante (ver [Pasos completamente automatizados](#fully-automated-steps)).

:::info
Las acciones automatizadas solo se ejecutan cuando una tarjeta llega por el flujo normal: cuando se agrega por primera vez, cuando un resultado o una ruta automática la trae, o cuando termina una espera (Wait). **No** se vuelven a ejecutar cuando un miembro del personal arrastra manualmente una tarjeta al paso o la devuelve, así que una persona no recibirá dos veces el mismo correo.
:::

### Enviar correos

Elige **Send email**, selecciona una de tus plantillas de correo y, opcionalmente, escribe un asunto personalizado. Cuando una tarjeta entra al paso, la persona recibe ese correo automáticamente. (Si la persona no tiene una dirección de correo registrada, el paso simplemente omite esta acción.) Los [campos de combinación](../settings/email-templates.md#merge-fields) de la plantilla, como `{{firstName}}`, se reemplazan con los datos de la propia persona.

:::info
Los correos de los flujos de trabajo solo se envían después de que tu iglesia haya sido aprobada para enviar correo grupal, y cuentan para el límite diario de correos de tu iglesia. Consulta [Activar el correo grupal para tu iglesia](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

### Enviar un mensaje de texto

Elige **Send Text** y escribe el **Text message** (hasta 1,600 caracteres). Cuando una tarjeta entra al paso, la persona recibe ese mensaje en su teléfono móvil. Puedes personalizar el mensaje con `{{firstName}}`, `{{lastName}}`, `{{displayName}}` o `{{churchName}}`, que se reemplazan con los datos de la persona cuando se envía el mensaje.

- Si la persona no tiene un teléfono móvil registrado, no se envía ningún mensaje y el historial de la tarjeta registra **Text skipped: no mobile phone**.
- Si la persona se dio de baja, no se envía ningún mensaje y el historial de la tarjeta registra **Text skipped: opted out**.
- Cuando el mensaje se envía, el historial de la tarjeta registra **Text sent**. Si el envío falla (por ejemplo, porque no hay un proveedor de mensajes conectado o porque tu iglesia se quedó sin créditos de mensajes), el fallo se registra en el historial de la tarjeta y las demás acciones del paso se siguen ejecutando.

:::warning
Los mensajes se envían a través del [proveedor de mensajes de texto](../settings/church-settings.md#texting) propio de tu iglesia. Si no hay ningún proveedor conectado, el editor de acciones muestra la advertencia *"No texting provider is set up"* y los mensajes no se enviarán.
:::

### Esperar unos días (secuencias de goteo)

La acción **Wait** retiene una tarjeta durante la cantidad de días que configures. Mientras espera, la tarjeta aparece como **Snoozed**. B1 revisa las esperas terminadas cada 30 minutos, así que una tarjeta se retoma dentro de unos treinta minutos después de que termine su espera. Cuando la espera termina:

1. Se ejecutan las **demás acciones del mismo paso**, para que puedas construir un goteo como **Send email → Wait 3 days → Send a reminder email**.
2. Luego, si el paso tiene una ruta automática, la tarjeta avanza; de lo contrario, queda en el paso para que una persona la atienda.

:::tip
Una **Wait** al inicio de un paso es una forma sencilla de "retener" una tarjeta antes de que llegue a un voluntario; por ejemplo, *Wait 7 days, then a coach reaches out* (espera 7 días y luego un coach se comunica).
:::

## Agregar personas como tarjetas

Hay varias formas de poner personas en un tablero:

- **Desde el tablero**: haz clic en **Add Card** al final de una columna de paso y elige una persona. También puedes elegir un grupo, y cada miembro de ese grupo se agrega como tarjeta.
- **Desde el registro de una persona**: usa **Add to Workflow** en la página de la persona para agregarla a un flujo de trabajo.
- **Desde la búsqueda de People**: selecciona varias personas y usa la acción masiva **Add to Workflow** para agregarlas todas a la vez.
- **Automáticamente con un disparador**: agrega personas cuando ocurre algo, como el envío de un formulario o una primera ofrenda (ver [Disparadores](#triggers) más abajo).

## Trabajar el tablero

Abre un flujo de trabajo para ver su tablero. Cada tarjeta muestra el nombre de la persona, a quién está asignada y un indicador de fecha de vencimiento o estado (**Overdue** o **Snoozed**). Una columna de paso también muestra pequeñas insignias para las acciones automatizadas que ejecuta y anotaciones para su enrutamiento, lo que te da un mapa rápido de cómo fluyen las tarjetas.

- **Mover una tarjeta**: arrastra una tarjeta de una columna a la siguiente a medida que la persona avanza.
- **Abrir una tarjeta**: haz doble clic en una tarjeta (o haz clic en ella) para abrir su panel de detalles, donde puedes cambiar el paso, reasignarla, agregar notas y revisar lo que ya ocurrió.

Desde el panel de la tarjeta puedes:

- **Assign** la tarjeta a otra persona o grupo.
- **Snooze** la tarjeta por 1 día, 3 días o 1 semana para ocultar temporalmente su fecha de vencimiento.
- **Send Back** al paso anterior o **Skip** al paso siguiente.
- **Pin assignment**: mantén el mismo responsable en la tarjeta aunque se mueva entre pasos. Por defecto, al mover una tarjeta a un nuevo paso se reasigna al asignado predeterminado de ese paso; fijar la asignación mantiene al responsable actual durante todo el proceso.
- **Complete** la tarjeta para terminarla, o elegir un botón de **Outcome** si el paso tiene resultados configurados (ver [Routing](#routing-cards-with-outcomes-and-conditions)).
- **Add notes** y revisar la **Activity** de la tarjeta: un registro de las acciones automatizadas que se han ejecutado (correos enviados, esperas, etc.).

Para una tarjeta que representa a una persona, el panel también muestra el teléfono móvil y el correo electrónico de esa persona como enlaces en los que puedes hacer clic para llamar o enviar un correo, además de un enlace **View profile** si tienes permiso para ver personas. La persona a la que está asignada la tarjeta puede ver el teléfono y el correo aunque no tenga acceso a People.

Las notas se guardan con la tarjeta. Cualquier persona que pueda abrir la tarjeta, incluida la persona o el grupo al que está asignada, puede leer las notas y agregar las suyas. Quienes no pueden abrir la tarjeta no ven sus notas.

### Acciones masivas

Selecciona las casillas de varias tarjetas para actuar sobre ellas en conjunto. Aparece una barra de herramientas que te permite **Complete**, **Snooze**, **Assign** (reasignar) o **Move to…** otro paso para todas las tarjetas seleccionadas a la vez.

## Enrutar tarjetas con resultados y condiciones

El enrutamiento controla a dónde va una tarjeta cuando sale de un paso. Abre el editor de un paso para configurar dos tipos de enrutamiento.

### Botones de resultado

Los resultados son botones que aparecen en el panel de la tarjeta cuando completas una tarjeta de ese paso. En lugar de un único botón **Complete**, puedes ofrecer opciones como "Joined a Group" o "Not Interested". Cada resultado puede:

- Enviar la tarjeta a **otro paso** de este flujo de trabajo,
- **Transferir la tarjeta** a un flujo de trabajo diferente por completo, o
- **Cerrar** la tarjeta.

Así, una sola decisión puede llevar a la persona por distintos caminos.

### Enrutamiento automático (condicional)

Las rutas automáticas mueven una tarjeta hacia adelante **en el momento en que entra a un paso** (y después de que terminan sus acciones automatizadas), sin que nadie haga clic, si la persona cumple un conjunto de condiciones. Agrega una ruta, elige el paso de destino y define una o más **conditions** (por ejemplo, el campus, la edad o el estado de membresía de una persona). Los campos de texto pueden compararse de forma exacta o con **contains**, **starts with** o **ends with**. Una ruta sin condiciones coincide con todos.

Si las condiciones de una ruta no pueden verificarse por algún motivo, esa ruta se considera como no coincidente. La tarjeta se queda en el paso (o sigue otra ruta que sí coincida) en lugar de quedarse atascada.

:::info
En el tablero, cada columna de paso muestra pequeñas anotaciones que describen su enrutamiento; por ejemplo, la etiqueta de un resultado o "if matches" seguido de una flecha hacia el paso o flujo de trabajo de destino.
:::

## Pasos completamente automatizados

Puedes hacer que un paso se ejecute por completo por sí solo, sin que nadie lo atienda. Dale al paso sus **acciones automatizadas** y agrega una **ruta automática** (sin condiciones) que apunte al paso siguiente. Cuando una tarjeta entra, se ejecutan las acciones y luego la ruta la avanza de inmediato: la tarjeta pasa directamente de largo.

:::tip
Combínalo con **Wait**: *Send welcome email → Wait 3 days → automatically advance to the "Personal call" step* (enviar correo de bienvenida → esperar 3 días → avanzar automáticamente al paso "Llamada personal"). El correo y el momento del envío se manejan por ti, y un voluntario solo ve la tarjeta cuando llega el momento del contacto personal.
:::

## Disparadores

Los disparadores agregan personas a un flujo de trabajo automáticamente cuando ocurre algo, así nunca tienes que agregar tarjetas a mano. En un tablero de flujo de trabajo, haz clic en la pestaña **Triggers** y luego en **Add Trigger**. Hay dos tipos:

### Disparadores de eventos

Se activan en cuanto un registro cambia en B1. Elige el evento y, opcionalmente, agrega **conditions** para que solo se agreguen las personas que cumplan:

- **Person · Created / Updated**: por ejemplo, agregar a cualquier persona cuyo estado pase a *Visitor*.
- **Donation · Created**: por ejemplo, agregar una ofrenda de una persona que da por primera vez, o una ofrenda grande, a un flujo de agradecimiento (filtrando por monto, fondo o método).
- **Group · Member Joined** / **Group · Created**.
- **Form · Submitted**: agrega a cualquier persona que envíe un formulario elegido (ideal para una tarjeta de "I'm New" o "Connect").

### Disparadores programados

Se ejecutan de forma recurrente (diaria, semanal, mensual o anualmente) según un conjunto de condiciones. Úsalos para contactos basados en el tiempo, como *todas las personas cuyo aniversario de membresía es hoy* o un seguimiento *mensual*.

Para cualquier disparador también puedes configurar:

- El **Starting step** en el que aterriza la nueva tarjeta (por defecto, el primer paso).
- **Only once per person**: para que el disparador no vuelva a agregar a la misma persona al flujo de trabajo.
- **Active**: activa o desactiva el disparador sin eliminarlo.

:::tip
Combina un disparador **Form · Submitted** con la plantilla **New Visitor Follow-up** para convertir tu tarjeta "Connect" o "I'm New" en un proceso de seguimiento automático.
:::

## Mis tarjetas

Los voluntarios y el personal no necesitan revisar cada tablero para encontrar su trabajo. La lista **My Cards** de la página **My Work** muestra todas las tarjetas asignadas al usuario actual en todos los flujos de trabajo. Para llegar ahí, haz clic en **My Cards** en la parte superior de la página de Workflows, o abre **Serving > My Work** en el menú Jump. Al hacer clic en una tarjeta se abre el tablero al que pertenece.

## Informes

Abre un flujo de trabajo y haz clic en **Reports** para ver las estadísticas de ese flujo:

- **Overdue**: la cantidad de tarjetas que pasaron su fecha de vencimiento.
- **Cards per Step**: cuántas tarjetas hay actualmente en cada paso, mostrado como un gráfico de columnas.
- **Completed (30 days)**: el rendimiento de los últimos 30 días, mostrado como un gráfico de líneas.

Úsalos para detectar cuellos de botella; por ejemplo, un paso donde las tarjetas se acumulan y nunca avanzan.

## Artículos relacionados

- [Tareas](./tasks.md): los elementos de acción individuales en los que se basan las tarjetas de los flujos de trabajo
- [Formularios](../forms/index.md): crea los formularios que pueden disparar flujos de trabajo
- [Grupos](../groups/index.md): los grupos en los que puede colocar a las personas una acción de "Add to group"
- [Roles y permisos](../settings/roles-permissions.md): controla quién puede ver, editar y administrar los flujos de trabajo
