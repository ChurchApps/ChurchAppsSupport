---
title: "Flujos de trabajo"
description: "Cree tableros estilo Kanban en B1 Admin para guiar a las personas por los pasos de seguimiento, con correos y mensajes de texto automáticos y disparadores que agregan personas de forma automática."
---

# Flujos de trabajo

<div class="article-intro">

Los flujos de trabajo llevan a las personas por una serie de pasos en un tablero visual. Cada persona se convierte en una tarjeta que avanza de un paso al siguiente: desde el seguimiento de un visitante que llega por primera vez, pasando por un proceso de membresía, hasta un agradecimiento a quien da por primera vez, y cualquier otra situación en la que necesite llevar a muchas personas por las mismas etapas. Un paso puede pedirle a un voluntario que haga algo (llamar, tener una conversación) **y** ejecutar acciones automatizadas por sí solo, como enviar un correo o un mensaje de texto, esperar unos días o agregar a la persona a un grupo. Así, los flujos de trabajo se encargan tanto del seguimiento humano como de las tareas rutinarias que lo rodean. Los flujos de trabajo amplían las [Tareas](./tasks.md) con un tablero Kanban de arrastrar y soltar, para que nadie se quede sin atención.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Asegúrese de que las personas que desea dar seguimiento existan en B1 Admin
- Familiarícese con el funcionamiento de las [Tareas](./tasks.md), porque cada tarjeta de un tablero es una tarea
- Para usar la acción **Send email**, cree primero las plantillas de correo que desea enviar (se administran en **Settings → Email Templates**)
- Para usar la acción **Send text**, conecte primero un [proveedor de mensajes de texto](../settings/church-settings.md#texting)
- Necesitará el permiso de Tareas correspondiente. Ver, editar tarjetas y administrar flujos de trabajo son niveles de permiso distintos (consulte [Roles y permisos](../settings/roles-permissions.md))

</div>

## Ver los flujos de trabajo

Abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda de B1 Admin), expanda **Serving** y haga clic en **Workflows**. Sus flujos aparecen en una tabla que muestra la **Category** y el **Status** de cada uno (**Active** o **Inactive**). Si utiliza categorías, las pestañas situadas encima de la lista le permiten filtrarla por categoría. Haga clic en cualquier flujo para abrir su tablero.

## Crear un flujo de trabajo

1. En la página de Workflows, haga clic en **Add Workflow**.
2. Elija cómo empezar:
   - **Blank workflow** -- empiece desde cero y cree sus propios pasos.
   - **From a template** -- empiece con un conjunto de pasos ya preparado que puede editar. Las plantillas integradas incluyen:
     - **New Visitor Follow-up** -- Enviar correo de bienvenida → Llamada personal → Invitar al siguiente paso → Conectado
     - **Membership Class** -- Expresó interés → Inscribirse en la clase → Asistir a la clase → Completar la membresía
     - **First-time Giver Thank-you** -- Enviar nota de agradecimiento → Compartir el impacto de la ofrenda → Mayordomía
     - **Serving Assignment Confirmation** -- Solicitar y esperar respuesta → Llamar al voluntario por la solicitud sin respuesta (consulte [Confirmaciones de asignación de servicio](#serving-assignment-confirmations))

   Armar los pasos de una plantilla puede tardar un momento. Mientras tanto, el botón **Add Workflow** dice **Creating...** y no se puede volver a pulsar, así que no se creará un duplicado. Si algo sale mal, la página muestra *"The workflow could not be created. Please try again."*
3. Escriba un **Name** para el flujo de trabajo.
4. Opcionalmente, asigne una **Category** para agrupar los flujos relacionados. Puede crear una categoría nueva desde el menú desplegable.
   Para un flujo en blanco, también elige su **Workflow purpose**: **People follow-up** (el tipo habitual) o **Serving assignment confirmation**. El propósito no se puede cambiar una vez creado el flujo.
5. Deje el flujo en **Active** para que se puedan agregar personas, o cámbielo a **Inactive** para ocultarlo de las listas de agregar a un flujo.
6. Haga clic en **Save**.

:::tip
Use el botón **Duplicate** de la lista de Workflows para copiar un flujo existente, incluidos sus pasos, acciones automatizadas y rutas, como punto de partida para uno nuevo.
:::

## Armar el tablero con pasos

Cada tablero de flujo de trabajo se compone de **steps**, que se muestran como columnas de izquierda a derecha. Abra un flujo y use **Add Step** para crear cada etapa de su proceso.

Al agregar o editar un paso, puede configurar:

- **Step Name** -- el encabezado de la columna (por ejemplo, "Llamada de bienvenida" o "Esperando inscripción").
- **Due in (days)** -- establece automáticamente una fecha límite cuando una tarjeta entra en este paso. Las tarjetas que superan su fecha límite se marcan como **Overdue**.
- **Default assignee** -- la persona o grupo al que se asignan automáticamente las tarjetas nuevas de este paso. Cuando el responsable predeterminado es una persona, esta recibe una notificación de que se le ha asignado una tarjeta.
- **Automated actions** -- las cosas que el sistema hace por su cuenta cuando llega una tarjeta (vea más abajo).
- **Routing** -- a dónde va la tarjeta cuando sale del paso (consulte [Ruteo](#routing-cards-with-outcomes-and-conditions)).

Arrastre las columnas de los pasos para ordenarlas según su proceso. El orden también define la ruta predeterminada que sigue una tarjeta cuando no se aplica otro ruteo.

:::info
Guarde primero un paso nuevo. Las acciones automatizadas y el ruteo se asocian al paso, así que el editor habilita esas secciones una vez que el paso existe.
:::

## Acciones automatizadas

Cada paso puede incluir una lista de **automated actions** que se ejecutan por sí solas en el momento en que una tarjeta **entra** en el paso, antes de que nadie la toque. Así, un paso tanto avisa a un voluntario como se encarga de las tareas rutinarias que rodean el seguimiento.

En el editor del paso, abra **Automated actions**, haga clic en **Add Action**, elija un tipo y complete su configuración. Puede añadir todas las que necesite; se ejecutan **de arriba abajo, en orden**. Haga clic en **Save** en el paso para guardar el paso y todas sus acciones a la vez. Quitar una acción con su icono de papelera surte efecto de inmediato.

| Acción | Qué hace |
|---|---|
| **Send email** | Envía a la persona una plantilla de correo que usted elija. Puede reemplazar la línea de asunto. |
| **Send text** | Envía a la persona un mensaje que usted escribe, a través del [proveedor de mensajes de texto](../settings/church-settings.md#texting) de su iglesia. |
| **Wait** | Pausa la tarjeta durante un número de días antes de continuar (vea más abajo). |
| **Add to group** | Agrega a la persona a un [grupo](../groups/index.md) que usted elija. |
| **Remove from group** | Quita a la persona de un grupo que usted elija. |
| **Record Attendance** | Marca a la persona como presente en el horario de servicio en curso de un grupo (vea más abajo). |
| **Add to workflow** | Inicia a la persona en otro flujo de trabajo; es útil para pasar a alguien de un proceso a otro. |
| **Add note** | Registra una nota en el historial de la tarjeta. |
| **Set field** | Actualiza un campo del registro de la persona: Membership Status, Marital Status, Gender, City, State o Zip. |
| **Webhook** | Envía los datos de la tarjeta a una dirección web externa (URL) que usted indique, para conectarse con otros sistemas. |
| **Create task** | Crea una [tarea](./tasks.md) con el título y la descripción que escriba, asignada a quien usted elija. |
| **Notify Person** | Envía a un miembro del personal o a un voluntario que usted elija un correo y una notificación de B1 sobre la tarjeta (vea más abajo). |

Cuando terminan todas las acciones de un paso, la tarjeta **se queda en ese paso** para que una persona pueda trabajarla, salvo que el paso tenga una ruta automática que la lleve al siguiente (consulte [Pasos totalmente automatizados](#fully-automated-steps)).

:::info
Las acciones automatizadas solo se ejecutan cuando una tarjeta llega por el flujo normal: cuando se agrega por primera vez, cuando la trae un resultado o una ruta automática, o después de que termina una espera (Wait). **No** se vuelven a ejecutar cuando un miembro del personal arrastra manualmente una tarjeta al paso o la devuelve, así que una persona no recibirá dos veces el mismo correo.
:::

### Enviar correo {#sending-email}

Elija **Send email**, seleccione una de sus plantillas de correo y, opcionalmente, escriba un asunto personalizado. Cuando una tarjeta entra en el paso, la persona recibe ese correo automáticamente. (Si la persona no tiene una dirección de correo registrada, el paso simplemente omite esta acción). Los [campos de combinación](../settings/email-templates.md#merge-fields) de la plantilla, como `{{firstName}}`, se completan con los datos propios de la persona. Si un disparador **Donation · Created** inició el flujo, los campos de la donación `{{amount}}`, `{{giftDate}}`, `{{fund}}` y `{{receipt}}` se completan con esa donación, incluso en pasos que se ejecutan después de una espera. Consulte [Campos de combinación de donaciones](../settings/email-templates.md#gift-merge-fields).

Cuando el correo sale, el historial de la tarjeta registra **Email sent**. Si no se puede enviar (por ejemplo, porque el correo de su iglesia todavía no está aprobado o se alcanzó el límite diario), no se agrega ninguna entrada de "Email sent".

:::info
Los correos de los flujos de trabajo solo se envían después de que su iglesia haya sido aprobada para enviar correo de grupo, y cuentan para el límite diario de correos de su iglesia. Consulte [Activar el correo de grupo para su iglesia](../groups/group-members.md#turning-on-group-email-for-your-church). La acción **Send email** le advierte en el editor del paso cuando estos correos no se enviarán: *"Your church's email hasn't been approved yet..."* si la aprobación sigue pendiente, o *"Your church's email is paused..."* si mensajes recientes rebotaron o se reportaron como spam.
:::

### Registrar asistencia

Elija **Record Attendance** y haga clic en **Pick group** para elegir el grupo cuya asistencia debe registrarse. Cuando se ejecuta la acción, la persona se marca como presente en el horario de servicio en curso de ese grupo, igual que si hubiera registrado su entrada. Resulta útil con un disparador que agrega a las personas al flujo a medida que llegan, para que se cuenten sin necesidad de un registro de entrada aparte.

- La asistencia se mide en el momento en que la tarjeta fue **creada**, así que una **Wait** anterior dentro del flujo no la hará pasar del servicio.
- Solo cuentan los horarios de servicio que tienen día y hora de inicio. Si ninguno de los horarios de servicio del grupo está en curso en ese momento, no se registra nada y el historial de la tarjeta indica **No scheduled service in progress — attendance not recorded**.
- Cuando se registra la asistencia, el historial de la tarjeta muestra **Attendance recorded** seguido del nombre del grupo. Ejecutar la acción de nuevo para el mismo servicio no cuenta a la persona dos veces.

### Notificar a una persona

Elija **Notify Person**, haga clic en **Pick person** y, opcionalmente, escriba un **Message**. Cuando una tarjeta entra en el paso, esa persona recibe un correo y una notificación de B1 con el nombre de la persona de la tarjeta, los nombres del flujo y del paso, su mensaje y un enlace para abrir la tarjeta. Úselo para avisar a un miembro del personal o a un líder de ministerio, por ejemplo: *"Notify the pastor when someone reaches the Membership Interview step."* El historial de la tarjeta registra **Notified** seguido del nombre de la persona.

### Enviar un mensaje de texto {#sending-a-text}

Elija **Send Text** y escriba el **Text message** (de hasta 1,600 caracteres). Si su iglesia ha guardado [plantillas de texto](../settings/email-templates.md), aparece una lista **Start from a template** encima del cuadro. Al elegir una, se copia el texto de la plantilla en el mensaje, y aún puede editarlo. El paso conserva su propia copia, así que los cambios posteriores en la plantilla no modifican el paso. Cuando una tarjeta entra en el paso, la persona recibe ese texto en su teléfono móvil. Para personalizar el mensaje, haga clic en una etiqueta debajo del cuadro del mensaje -- **First Name**, **Last Name**, **Display Name** o **Church Name** -- para insertar `{{firstName}}`, `{{lastName}}`, `{{displayName}}` o `{{churchName}}` en la posición del cursor. Cada uno se completa con los datos de la persona cuando se envía el texto. Las etiquetas **Amount**, **Gift Date**, **Fund** y **Receipt** insertan los campos de la donación, que solo se completan cuando un disparador **Donation · Created** inició el flujo. Por ejemplo: `Thanks {{firstName}} for your gift of {{amount}} to {{fund}}!`

- Si la persona no tiene un teléfono móvil registrado, no se envía ningún texto y el historial de la tarjeta registra **Text skipped: no mobile phone**.
- Si la persona ha dejado de recibir mensajes, no se envía ningún texto y el historial de la tarjeta registra **Text skipped: opted out**.
- Cuando el texto sale, el historial de la tarjeta registra **Text sent**. Si el envío falla (por ejemplo, porque no hay ningún proveedor de mensajes conectado o su iglesia se ha quedado sin créditos de texto), el fallo se registra en el historial de la tarjeta y las demás acciones del paso se siguen ejecutando.

:::warning
Los textos se envían a través del [proveedor de mensajes de texto](../settings/church-settings.md#texting) propio de su iglesia. Si no hay ningún proveedor conectado, el editor de acciones muestra la advertencia *"No texting provider is set up"* y los textos no se enviarán.
:::

### Esperar unos días (secuencias de goteo)

La acción **Wait** mantiene una tarjeta durante el número de días que establezca. Mientras espera, la tarjeta aparece como **Snoozed**. B1 revisa las esperas terminadas cada 30 minutos, así que la tarjeta retoma su curso en menos de media hora después de que termine la espera. Cuando la espera termina:

1. Se ejecutan las **acciones restantes del mismo paso**, de modo que puede crear un goteo como **Send email → Wait 3 days → Send a reminder email**.
2. Después, si el paso tiene una ruta automática, la tarjeta avanza; si no, se queda en el paso para que una persona la atienda.

:::tip
Una **Wait** al principio de un paso es una forma sencilla de "retener" una tarjeta antes de que llegue a un voluntario, por ejemplo: *Wait 7 days, then a coach reaches out*.
:::

## Agregar personas como tarjetas

Hay varias formas de poner personas en un tablero:

- **Desde el tablero** -- Haga clic en **Add Card** en la parte inferior de una columna de paso y elija una persona. También puede elegir un grupo, y cada miembro de ese grupo se agregará como tarjeta.
- **Desde el registro de una persona** -- Use **Add to Workflow** en la página de una persona para colocarla en un flujo.
- **Desde la búsqueda de personas** -- Seleccione varias personas y use la acción masiva **Add to Workflow** para agregarlas todas a la vez.
- **Automáticamente con un disparador** -- Agregue personas cuando ocurra algo, como el envío de un formulario o una primera ofrenda (consulte [Disparadores](#triggers) más abajo).

Agregar a alguien a mano, o con una acción de paso **Add to workflow**, nunca le da una segunda tarjeta abierta en el mismo flujo. Si ya tiene una tarjeta abierta, se omite (en una adición masiva, solo se crean tarjetas nuevas para las personas que no tienen una). Una vez cerrada su tarjeta, puede volver a agregarla. Los disparadores, en cambio, siguen su propia opción **Only once per person**.

## Trabajar en el tablero {#working-the-board}

Abra un flujo para ver su tablero. Cada tarjeta muestra el nombre de la persona, a quién está asignada y una etiqueta de fecha límite o de estado (**Overdue** o **Snoozed**). Una columna de paso también muestra pequeñas insignias de las acciones automatizadas que ejecuta y anotaciones de su ruteo, lo que le ofrece de un vistazo un mapa de cómo fluyen las tarjetas.

- **Mover una tarjeta** -- Arrastre una tarjeta de una columna a la siguiente conforme la persona avance.
- **Abrir una tarjeta** -- Haga doble clic en una tarjeta (o haga clic en ella) para abrir su panel de detalle, donde puede cambiar el paso, reasignarla, agregar notas y revisar lo que ya ha ocurrido.

Desde el panel de la tarjeta puede:

- **Assign** la tarjeta a otra persona o grupo.
- **Snooze** la tarjeta durante 1 día, 3 días o 1 semana para ocultar temporalmente su fecha límite.
- **Send Back** al paso anterior o **Skip** al paso siguiente.
- **Pin assignment** -- mantener el mismo responsable en la tarjeta aunque pase de un paso a otro. Por defecto, al mover una tarjeta a un paso nuevo se reasigna al responsable predeterminado de ese paso; fijar la asignación mantiene a la persona actual como responsable durante todo el proceso.
- **Complete** la tarjeta para terminarla, o elegir un botón de **Outcome** si el paso tiene resultados configurados (consulte [Ruteo](#routing-cards-with-outcomes-and-conditions)).
- **Remove card** -- quitar una tarjeta del tablero sin terminarla, por ejemplo cuando alguien se agregó por error. Después de confirmar, la tarjeta se cierra y desaparece de la lista de todos. No se ejecutan resultados, rutas ni acciones de paso, y su historial se conserva con una entrada de **Removed**. En el caso de una tarjeta de [confirmación de asignación de servicio](#serving-assignment-confirmations), quitarla cierra la solicitud de la misma forma.
- **Add notes** y revisar la **Activity** de la tarjeta -- un registro de las acciones automatizadas que se han ejecutado (correos enviados, esperas, etc.), cada una con la fecha y la hora en que ocurrió.

En una tarjeta de una persona, el panel también muestra el teléfono móvil y el correo electrónico de la persona como enlaces en los que se puede hacer clic para llamarla o escribirle, además de un enlace **View profile** si tiene permiso para ver personas. La persona a la que está asignada la tarjeta ve el teléfono y el correo aunque no tenga acceso a People.

Las notas se guardan con la tarjeta. Cualquiera que pueda abrir la tarjeta, incluida la persona o el grupo al que está asignada, puede leer las notas y agregar las suyas. Quienes no pueden abrir la tarjeta no pueden ver sus notas.

### Acciones masivas

Seleccione las casillas de varias tarjetas para actuar sobre ellas en conjunto. Para elegir todas las tarjetas de un paso a la vez, marque la casilla **Select all** en el encabezado de la columna de ese paso; vuelva a marcarla para desmarcarlas. Aparece una barra de herramientas que permite **Complete**, **Snooze**, **Assign** (reasignar) o **Move to…** otro paso para todas las tarjetas seleccionadas a la vez.

## Ruteo de tarjetas con resultados y condiciones {#routing-cards-with-outcomes-and-conditions}

El ruteo controla a dónde va una tarjeta cuando sale de un paso. Abra el editor de un paso para configurar dos tipos de ruteo.

### Botones de resultado

Los **Outcome buttons** son botones que aparecen en el panel de la tarjeta cuando se completa una tarjeta en ese paso. En lugar de un único botón **Complete**, puede ofrecer opciones como "Joined a Group" o "Not Interested". Cada resultado puede:

- Enviar la tarjeta a **otro paso** de este flujo,
- **Pasar la tarjeta** a un flujo de trabajo distinto por completo, o
- **Cerrar** la tarjeta.

Así, una sola decisión puede llevar a la persona por caminos distintos.

### Ruteo automático (condicional)

Las rutas automáticas mueven una tarjeta hacia adelante **en el momento en que entra en un paso** (y después de que terminan sus acciones automatizadas), sin que nadie haga clic, si la persona cumple un conjunto de condiciones. Agregue una ruta, elija el paso de destino y defina una o más **conditions** (por ejemplo, el campus, la edad o el estado de membresía de la persona). Los campos de texto pueden coincidir exactamente o con **contains**, **starts with** o **ends with**. Una ruta sin condiciones coincide con todas las personas.

Las condiciones de fecha (Today's Date, Birth Date o Anniversary) pueden comparar la fecha completa o solo una parte: el día de la semana, el **Day of Month**, el **Month** o los años transcurridos. En el caso de la fecha de nacimiento o el aniversario de una persona, **Day of Month** ofrece una opción relativa **Today**, de modo que una condición como *Birth Date · Day of Month = Today* coincide con las personas cuyo cumpleaños cae en el día del mes actual. **Month** ofrece **Previous Month**, **Current Month** y **Next Month**. Los valores relativos como estos se calculan con la zona horaria de su iglesia, así que coinciden con el día del calendario de su iglesia y no con el del servidor.

El grupo de condiciones **Giving** incluye **Lapsed regular giver**, que encuentra a las personas que solían dar con regularidad y luego dejaron de hacerlo. Configure tres números: *Gave in at least* **3** *of the last* **12** *weeks, then nothing in the last* **3** *weeks* (estos son los valores predeterminados). Las semanas se cuentan hacia atrás desde hoy en la zona horaria de su iglesia, y una donación reembolsada no cuenta. Resulta más útil con un [disparador programado](#schedule-triggers); por ejemplo, una regla semanal que agregue a los donantes inactivos a un tablero de seguimiento pastoral. La condición solo tiene en cuenta las fechas de las donaciones, nunca los importes, y las tarjetas y alertas nunca muestran importes. Como revela quién ha dejado de dar, solo las personas que pueden ver las donaciones ven esta opción y pueden agregarla, cambiarla o quitarla.

Si las condiciones de una ruta no se pueden comprobar por algún motivo, esa ruta se considera que no coincide. La tarjeta se queda en el paso (o sigue otra ruta que sí coincida) en lugar de quedarse atascada.

:::info
En el tablero, cada columna de paso muestra pequeñas anotaciones que describen su ruteo; por ejemplo, la etiqueta de un resultado o "if matches" seguido de una flecha hacia el paso o flujo de destino.
:::

## Pasos totalmente automatizados {#fully-automated-steps}

Puede hacer que un paso se ejecute por completo por sí solo, sin que nadie lo trabaje. Dé al paso sus **automated actions** y agregue una **automatic route** (sin condiciones) que apunte al siguiente paso. Cuando una tarjeta entra, se ejecutan las acciones y, después, la ruta la avanza de inmediato: la tarjeta pasa directamente.

:::tip
Combínelo con **Wait**: *Send welcome email → Wait 3 days → automatically advance to the "Personal call" step.* El correo y el momento de envío se gestionan por usted, y un voluntario solo ve la tarjeta cuando llega el momento del contacto humano.
:::

## Disparadores {#triggers}

Los disparadores agregan personas a un flujo de trabajo automáticamente cuando ocurre algo, así que nunca tiene que agregar tarjetas a mano. En un tablero de flujo, haga clic en la pestaña **Triggers** y luego en **Add Trigger**. Hay dos tipos:

### Disparadores por evento

Se activan en cuanto cambia un registro en B1. Elija el evento y, opcionalmente, agregue **conditions** para que solo se añada a las personas que cumplen los requisitos:

- **Person · Created / Updated** -- por ejemplo, agregar a cualquiera cuyo estado cambie a *Visitor* o *Guest* (el estado que se asigna a quienes se registran por su cuenta).
- **Donation · Created** -- por ejemplo, agregar una donación de primera vez o una donación grande a un flujo de agradecimiento (filtrando por importe, fondo o método).
- **Group · Member Joined** / **Group · Created**.
- **Form · Submitted** -- agregar a cualquiera que envíe un formulario concreto (ideal para una tarjeta de "I'm New" o "Connect").

### Disparadores programados {#schedule-triggers}

Se ejecutan de forma periódica (a diario, semanalmente, mensualmente o anualmente) según un conjunto de condiciones. Úselos para comunicaciones basadas en el tiempo, como *todas las personas cuyo cumpleaños es hoy* (Birth Date · Day of Month = **Today**, con el mes coincidiendo con **Current Month**) o un chequeo *mensual*. Incluso sin **Only once per person**, un disparador programado no volverá a agregar a la misma persona dentro de un mismo periodo de repetición (un día, una semana, un mes o un año, según la frecuencia con que se ejecute).

Para cualquier disparador también puede configurar:

- El **Starting step** en el que aterriza la nueva tarjeta (por defecto, el primer paso).
- **Only once per person** -- para que el disparador no agregue dos veces a la misma persona al flujo. Con esta opción activada, se omite a cualquiera que ya tenga una tarjeta en este flujo.
  - **Add again after their card is closed** -- aparece cuando **Only once per person** está activada. Márquela para que el disparador vuelva a agregar a alguien una vez que su tarjeta anterior en este flujo se haya cerrado. Una persona nunca tiene dos tarjetas abiertas en el flujo al mismo tiempo. Use esta opción para cosas que pueden ocurrir más de una vez, como un visitante que regresa o un proceso anual.
- **Active** -- active o desactive el disparador sin eliminarlo.

:::tip
Combine un disparador **Form · Submitted** con la plantilla **New Visitor Follow-up** para convertir su formulario "Connect Card" o "I'm New" en un flujo de seguimiento automático.
:::

## Confirmaciones de asignación de servicio {#serving-assignment-confirmations}

Un tipo especial de flujo de trabajo puede dar seguimiento a las [solicitudes de servicio](./plans.md#assigning-team-members) hasta que cada voluntario acepte o rechace. En lugar de personas, cada tarjeta de este tablero registra **una asignación**: una persona en un puesto concreto de un plan. Dos roles o dos servicios para la misma persona generan tarjetas separadas. Es opcional: no cambia nada en un plan hasta que seleccione un flujo de confirmación en su configuración.

### Cómo configurarlo

1. En la página de Workflows, haga clic en **Add Workflow** y elija la plantilla **Serving Assignment Confirmation**. (O bien, empiece con un **Blank workflow** y configure su **Workflow purpose** como **Serving assignment confirmation**.) Crear desde la plantilla requiere permiso para enviar mensajes de texto, ya que incluye un paso de texto.
2. Revise los pasos. La plantilla empieza con:
   - **Request and wait for response** -- envía la solicitud de servicio por correo y por texto, espera 2 días, envía un correo de recordatorio, espera 1 día más y luego avanza la tarjeta automáticamente.
   - **Call volunteer about unanswered request** -- un paso para que una persona llame al voluntario, con vencimiento en 1 día. Establezca un **Default assignee** en este paso. Si no tiene ninguno, la tarjeta va al líder del ministerio, o al equipo del ministerio si no hay líder.
3. Edite las esperas, los mensajes y los pasos según las necesidades de su iglesia.
4. Abra la [configuración de un plan](./plans.md#plan-settings) y elija este flujo en **Confirmation workflow**.

Estos flujos usan una acción **Send serving request** en lugar de **Send email** y **Send text**. Elija **Email** o **Text message** y, opcionalmente, escriba un **Request message**. La solicitud siempre incluye el puesto, el plan, la fecha del servicio y un enlace para responder; puede usar `{{planName}}`, `{{positionName}}` y `{{serviceDate}}` en su mensaje. Deje el mensaje vacío para usar la solicitud predeterminada. Se aplican las preferencias de notificación de los voluntarios, su consentimiento para mensajes de texto, su proveedor de mensajes y la aprobación del correo de su iglesia, y cualquier intento omitido o bloqueado se registra en la tarjeta. **Send email**, **Send text** y **Add to workflow** no están disponibles en estos tableros.

La pestaña **Triggers** de un flujo de confirmación explica cómo se inician las tarjetas en lugar de ofrecer disparadores, y estos flujos no aparecen en las listas de **Add to Workflow** de las personas.

### Cómo se inician y se cierran las tarjetas

- Las tarjetas se inician cuando usted **notifica** a los voluntarios de un plan publicado (consulte [Notifying Volunteers](./plan-validation.md#notifying-volunteers)). Cada asignación nueva y sin respuesta obtiene una tarjeta. Guardar, publicar, copiar o completar automáticamente un plan no contacta a nadie por sí solo, y los planes marcados como provisionales no envían nada.
- Los voluntarios siguen recibiendo la alerta habitual dentro de la aplicación. El seguimiento por correo y por texto lo hace el flujo de trabajo.
- Cuando el voluntario **accepts or declines**, su tarjeta se cierra automáticamente, junto con cualquier tarea de seguimiento vinculada.
- El panel de la tarjeta muestra el puesto, la fecha del servicio y un enlace al plan. En lugar de **Complete**, el botón dice **Record follow-up done**. Al hacer clic, se registra que alguien dio seguimiento, pero la tarjeta sigue abierta y asignada (se muestra como **Awaiting response**) hasta que el voluntario responda o venza la fecha límite de respuesta.
- La fecha límite de respuesta es el final del último horario de servicio en el que sirve el equipo del puesto. Si el plan no tiene horarios correspondientes, es el final del día del servicio. Si nadie ha respondido para entonces, la tarjeta se cierra con **Response deadline passed** y se envía una tarea de **Review unanswered serving request** al responsable actual de la tarjeta o al líder del ministerio, para que alguien decida cómo cubrir el puesto. La asignación queda como **Unconfirmed**.
- Quitar la asignación, cambiar su persona, puesto o fecha del plan, devolver el plan a provisional o cambiar el plan a otro flujo de confirmación cierra la tarjeta. Una tarjeta cerrada nunca se reabre con otra **Notify**; agregue una nueva asignación para enviar una solicitud nueva.

:::info
En el caso de las solicitudes enviadas a través de un flujo de confirmación, los [recordatorios para voluntarios](./plans.md#volunteer-reminders) solo se envían a los voluntarios que han **aceptado**, para que las personas que esperan responder no reciban recordatorios además de los seguimientos del flujo.
:::

## Mis tarjetas

Los voluntarios y el personal no necesitan revisar todos los tableros para encontrar su trabajo. La lista **My Cards** de la página **My Work** muestra cada tarjeta asignada al usuario actual en todos los flujos. Para llegar a ella, haga clic en **My Cards** en la parte superior de la página de Workflows, o abra **Serving > My Work** en el menú Jump. Al hacer clic en una tarjeta se abre su panel de detalle directamente en la página My Work, donde puede trabajar la tarjeta o quitarla sin salir de la página. Si puede ver los flujos, el panel también tiene un enlace **Open workflow board** al tablero al que pertenece la tarjeta.

## Informes

Abra un flujo y haga clic en **Reports** para ver las estadísticas de ese flujo:

- **Overdue** -- el número de tarjetas que han superado su fecha límite.
- **Cards per Step** -- cuántas tarjetas hay actualmente en cada paso, mostradas como gráfico de columnas.
- **Completed (30 days)** -- el rendimiento de los últimos 30 días, mostrado como gráfico de líneas.

Use estos datos para detectar cuellos de botella, por ejemplo, un paso en el que se acumulan tarjetas y nunca avanzan.

## Artículos relacionados

- [Tareas](./tasks.md) -- las acciones individuales en las que se basan las tarjetas de los flujos
- [Formularios](../forms/index.md) -- cree los formularios que pueden activar flujos
- [Grupos](../groups/index.md) -- los grupos en los que una acción "Add to group" puede colocar a las personas
- [Planes de servicio](./plans.md) -- elija un flujo de confirmación para las solicitudes de servicio de un plan
- [Roles y permisos](../settings/roles-permissions.md) -- controle quién puede ver, editar y administrar flujos
