---
title: "Flujos de trabajo"
description: "Cree tableros estilo Kanban en B1 Admin para llevar a las personas por pasos de seguimiento con correos y mensajes de texto automáticos, y disparadores que agregan personas automáticamente."
---

# Flujos de trabajo

<div class="article-intro">

Los flujos de trabajo llevan a las personas por una serie de pasos en un tablero visual. Cada persona se convierte en una tarjeta que avanza de un paso al siguiente: desde el seguimiento de un visitante por primera vez, pasando por un proceso de membresía, hasta un agradecimiento a alguien que da por primera vez, y cualquier otra situación en la que necesite seguir a muchas personas por las mismas etapas. Un paso puede pedirle a un voluntario que haga algo (llamar, tener una conversación) **y** ejecutar acciones automáticas por sí mismo, como enviar un correo o un mensaje de texto, esperar unos días o agregar a la persona a un grupo; así, los flujos de trabajo se encargan tanto del seguimiento humano como del trabajo rutinario que lo rodea. Los flujos de trabajo amplían las [Tareas](./tasks.md) con un tablero Kanban de arrastrar y soltar para que nada ni nadie se quede sin atender.

</div>

<div class="prereqs">
<h4>Antes de empezar</h4>

- Asegúrese de que las personas que quiere seguir existan en B1 Admin
- Familiarícese con el funcionamiento de las [Tareas](./tasks.md), ya que cada tarjeta de un tablero es una tarea
- Para usar la acción **Enviar correo**, cree primero las plantillas de correo que quiere enviar (se administran en **Configuración → Plantillas de correo**)
- Para usar la acción **Enviar mensaje de texto**, conecte primero un [proveedor de mensajes de texto](../settings/church-settings.md#texting)
- Necesita el permiso de Tareas correspondiente. Ver, editar tarjetas y administrar flujos de trabajo son niveles de permiso separados (consulte [Roles y permisos](../settings/roles-permissions.md))

</div>

## Ver los flujos de trabajo {#viewing-workflows}

Abra el [menú Salto](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda de B1 Admin), expanda **Servicio** y haga clic en **Flujos de trabajo**. Sus flujos de trabajo aparecen en una tabla que muestra la **Categoría** y el **Estado** de cada uno (**Activo** o **Inactivo**). Si usa categorías, las pestañas encima de la lista le permiten filtrarla por categoría. Haga clic en cualquier flujo de trabajo para abrir su tablero.

## Crear un flujo de trabajo {#creating-a-workflow}

1. En la página de Flujos de trabajo, haga clic en **Agregar flujo de trabajo**.
2. Elija cómo empezar:
   - **Flujo de trabajo en blanco** -- empiece desde cero y construya sus propios pasos.
   - **Desde una plantilla** -- empiece con un conjunto de pasos ya preparado que puede editar. Las plantillas integradas incluyen:
     - **Seguimiento de nuevo visitante** -- Enviar correo de bienvenida → Llamada telefónica personal → Invitar al siguiente paso → Conectado
     - **Clase de membresía** -- Expresar interés → Inscribirse a la clase → Asistir a la clase → Completar la membresía
     - **Agradecimiento a quien da por primera vez** -- Enviar nota de agradecimiento → Compartir el impacto de la ofrenda → Administrado
     - **Confirmación de asignación de servicio** -- Solicitar y esperar respuesta → Llamar al voluntario por una solicitud sin respuesta (consulte [Confirmaciones de asignación de servicio](#serving-assignment-confirmations))

   Construir los pasos de una plantilla puede tardar un momento. Mientras lo hace, el botón **Agregar flujo de trabajo** dice **Creando...** y no se puede volver a hacer clic, así que no terminará con un duplicado. Si algo sale mal, la página muestra *"No se pudo crear el flujo de trabajo. Inténtelo de nuevo."*
3. Asigne un **Nombre** al flujo de trabajo.
4. Opcionalmente, asigne una **Categoría** para agrupar flujos de trabajo relacionados. Puede crear una categoría nueva directamente desde el menú desplegable.
   Para un flujo de trabajo en blanco, también elige su **Propósito del flujo de trabajo**: **Seguimiento de personas** (el tipo habitual) o **Confirmación de asignación de servicio**. El propósito no puede cambiarse después de crear el flujo de trabajo.
5. Deje el flujo de trabajo **Activo** para que se pueda agregar personas, o cámbielo a **Inactivo** para ocultarlo de las listas de agregar a un flujo de trabajo.
6. Haga clic en **Guardar**.

:::tip
Use el botón **Duplicar** de la lista de Flujos de trabajo para copiar un flujo existente, incluidos sus pasos, acciones automáticas y enrutamiento, como punto de partida de uno nuevo.
:::

## Construir el tablero con pasos {#building-the-board-with-steps}

Cada tablero de flujo de trabajo está formado por **pasos**, que se muestran como columnas de izquierda a derecha. Abra un flujo de trabajo y use **Agregar paso** para crear cada etapa de su proceso.

Al agregar o editar un paso, puede configurar:

- **Nombre del paso** -- el encabezado de la columna (por ejemplo, "Llamada de bienvenida" o "Esperando inscripción").
- **Vence en (días)** -- establece automáticamente una fecha límite cuando una tarjeta entra en este paso. Las tarjetas que pasan su fecha límite se marcan como **Vencidas**.
- **Responsable predeterminado** -- la persona o grupo al que se asignan automáticamente las tarjetas nuevas de este paso. Cuando el responsable predeterminado es una persona, recibe una notificación de que se le ha asignado una tarjeta.
- **Acciones automáticas** -- cosas que el sistema hace por sí mismo cuando llega una tarjeta (vea más abajo).
- **Enrutamiento** -- adónde va la tarjeta cuando sale del paso (consulte [Enrutamiento](#routing-cards-with-outcomes-and-conditions)).

Arrastre las columnas de los pasos al orden que corresponda a su proceso. El orden también define el camino predeterminado que sigue una tarjeta cuando no se aplica otro enrutamiento.

:::info
Guarde primero un paso nuevo. Las acciones automáticas y el enrutamiento se asocian al paso, y el editor desbloquea esas secciones una vez que el paso existe.
:::

## Acciones automáticas {#automated-actions}

Cada paso puede tener una lista de **acciones automáticas** que se ejecutan por sí solas en el momento en que una tarjeta **entra** en el paso, antes de que nadie la toque. Así un paso tanto indica a un voluntario qué hacer *como* se encarga del trabajo rutinario alrededor del seguimiento.

En el editor de pasos, abra **Acciones automáticas**, haga clic en **Agregar acción**, elija un tipo y complete sus ajustes. Agregue todas las que necesite; se ejecutan **de arriba abajo, en orden**. Haga clic en **Guardar** en el paso para guardar el paso y todas sus acciones juntas. Quitar una acción con su icono de papelera surte efecto de inmediato.

| Acción | Qué hace |
|---|---|
| **Enviar correo** | Envía a la persona una plantilla de correo que usted elija. Puede reemplazar el asunto. |
| **Enviar mensaje de texto** | Envía a la persona un mensaje que usted escribe, a través del [proveedor de mensajes de texto](../settings/church-settings.md#texting) de su iglesia. |
| **Esperar** | Pausa la tarjeta durante una cantidad de días antes de continuar (vea más abajo). |
| **Agregar a grupo** | Agrega a la persona a un [grupo](../groups/index.md) que usted elija. |
| **Quitar de grupo** | Quita a la persona de un grupo que usted elija. |
| **Registrar asistencia** | Marca a la persona como presente en el horario de servicio en curso de un grupo (vea más abajo). |
| **Agregar a flujo de trabajo** | Inicia a la persona en otro flujo de trabajo; útil para pasar de un proceso a otro. |
| **Agregar nota** | Registra una nota en el historial de la tarjeta. |
| **Establecer campo** | Actualiza un campo del registro de la persona: Estado de membresía, Estado civil, Género, Ciudad, Estado o Código postal. |
| **Webhook** | Envía los detalles de la tarjeta a una dirección web externa (URL) que usted indique, para conectar con otros sistemas. |
| **Crear tarea** | Crea una [tarea](./tasks.md) con el título y la descripción que ingrese, asignada a quien usted elija. |
| **Notificar a persona** | Envía a un miembro del personal o voluntario que usted elija un correo y una notificación de B1 sobre la tarjeta (vea más abajo). |

Cuando terminan todas las acciones de un paso, la tarjeta **se queda en ese paso** para que alguien pueda trabajarla, a menos que el paso tenga una ruta automática que la mueva hacia adelante (consulte [Pasos totalmente automatizados](#fully-automated-steps)).

:::info
Las acciones automáticas solo se ejecutan cuando una tarjeta llega por el flujo normal: cuando se agrega por primera vez, cuando un resultado o una ruta automática la trae, o cuando termina una espera. **No** se vuelven a ejecutar cuando un miembro del personal arrastra manualmente una tarjeta hacia el paso o la devuelve, así que una persona no recibirá dos veces el mismo correo.
:::

### Enviar correo {#sending-email}

Elija **Enviar correo**, seleccione una de sus plantillas de correo y, opcionalmente, escriba un asunto personalizado. Cuando una tarjeta entra en el paso, la persona recibe ese correo automáticamente. (Si la persona no tiene una dirección de correo registrada, el paso simplemente omite esta acción). Los [campos de combinación](../settings/email-templates.md#merge-fields) de la plantilla, como `{{firstName}}`, se completan con los datos de la propia persona. Si un disparador de **Donación · Creada** inició el flujo de trabajo, los campos de la ofrenda `{{amount}}`, `{{giftDate}}`, `{{fund}}` y `{{receipt}}` se completan con los datos de esa ofrenda, incluso en pasos que se ejecutan después de una espera. Consulte [Campos de combinación de ofrendas](../settings/email-templates.md#gift-merge-fields).

Cuando el correo se envía, el historial de la tarjeta registra **Correo enviado**. Si no puede enviarse (por ejemplo, porque el correo de su iglesia todavía no ha sido aprobado o se alcanzó el límite diario), no se agrega ninguna entrada de "Correo enviado".

:::info
Los correos de flujos de trabajo solo se envían después de que su iglesia haya sido aprobada para enviar correo de grupo, y cuentan para el límite diario de correos de su iglesia. Consulte [Activar el correo de grupo para su iglesia](../groups/group-members.md#turning-on-group-email-for-your-church). La acción **Enviar correo** le advierte en el editor de pasos cuando estos correos no se enviarán: *"El correo de su iglesia todavía no ha sido aprobado..."* si la aprobación está pendiente, o *"El correo de su iglesia está en pausa..."* si mensajes recientes rebotaron o se reportaron como spam.
:::

### Registrar asistencia {#recording-attendance}

Elija **Registrar asistencia** y haga clic en **Elegir grupo** para elegir el grupo cuya asistencia debe registrarse. Cuando la acción se ejecuta, la persona queda marcada como presente en el horario de servicio en curso de ese grupo, igual que si se hubiera registrado al llegar. Es útil con un disparador que agrega personas al flujo de trabajo conforme llegan, para que se cuenten sin un registro aparte.

- La asistencia se mide en el momento en que la tarjeta fue **creada**, así que una **Espera** anterior en el flujo de trabajo no la hará pasar del servicio.
- Solo cuentan los horarios de servicio que tienen día y hora de inicio. Si ninguno de los horarios de servicio del grupo está en curso en ese momento, no se registra nada y el historial de la tarjeta indica **Sin servicio programado en curso: asistencia no registrada**.
- Cuando se registra la asistencia, el historial de la tarjeta muestra **Asistencia registrada** seguido del nombre del grupo. Ejecutar la acción de nuevo para el mismo servicio no cuenta dos veces a la persona.

### Notificar a una persona {#notifying-a-person}

Elija **Notificar a persona**, haga clic en **Elegir persona** y, opcionalmente, escriba un **Mensaje**. Cuando una tarjeta entra en el paso, esa persona recibe un correo y una notificación de B1 con el nombre de la persona de la tarjeta, los nombres del flujo de trabajo y del paso, su mensaje y un enlace para abrir la tarjeta. Úsela para avisar a un miembro del personal o a un líder de ministerio; por ejemplo, *"Avisar al pastor cuando alguien llegue al paso de Entrevista de membresía"*. El historial de la tarjeta registra **Notificado** seguido del nombre de la persona.

### Enviar un mensaje de texto {#sending-a-text}

Elija **Enviar mensaje de texto** y escriba el **Mensaje de texto** (hasta 1.600 caracteres). Si su iglesia tiene guardadas [plantillas de texto](../settings/email-templates.md), aparece una lista **Empezar desde una plantilla** encima del cuadro. Al elegir una, el texto de la plantilla se copia al mensaje, y todavía puede editarlo. El paso conserva su propia copia, así que los cambios posteriores en la plantilla no modifican el paso. Cuando una tarjeta entra en el paso, la persona recibe ese mensaje en su teléfono celular. Para personalizar el mensaje, haga clic en un chip debajo del cuadro de mensaje —**Nombre**, **Apellido**, **Nombre para mostrar** o **Nombre de la iglesia**— para insertar `{{firstName}}`, `{{lastName}}`, `{{displayName}}` o `{{churchName}}` en la posición del cursor. Cada uno se completa con los datos de la persona cuando se envía el mensaje. Los chips **Monto**, **Fecha de la ofrenda**, **Fondo** y **Recibo** insertan los campos de la ofrenda, que solo se completan cuando un disparador de **Donación · Creada** inició el flujo de trabajo. Por ejemplo: `Thanks {{firstName}} for your gift of {{amount}} to {{fund}}!`

- Si la persona no tiene un teléfono celular registrado, no se envía ningún mensaje y el historial de la tarjeta registra **Texto omitido: sin teléfono celular**.
- Si la persona ha cancelado la suscripción, no se envía ningún mensaje y el historial de la tarjeta registra **Texto omitido: cancelado**.
- Cuando el mensaje se envía, el historial de la tarjeta registra **Texto enviado**. Si el envío falla (por ejemplo, porque no hay ningún proveedor de mensajes conectado o su iglesia se quedó sin créditos de mensajes), el fallo se registra en el historial de la tarjeta y las acciones restantes del paso se siguen ejecutando.

:::warning
Los mensajes se envían a través del [proveedor de mensajes de texto](../settings/church-settings.md#texting) propio de su iglesia. Si no hay ningún proveedor conectado, el editor de acciones muestra la advertencia *"No hay ningún proveedor de mensajes de texto configurado"* y los mensajes no se enviarán.
:::

### Esperar unos días (secuencias de goteo) {#waiting-a-few-days-drip-sequences}

La acción **Esperar** mantiene una tarjeta durante la cantidad de días que usted establezca. Mientras espera, la tarjeta aparece como **Pospuesta**. B1 revisa las esperas terminadas cada 30 minutos, así que una tarjeta se reanuda dentro de unos 30 minutos después de que termina su espera. Cuando la espera termina:

1. Se ejecutan las **acciones restantes del mismo paso**, así que puede construir un goteo como **Enviar correo → Esperar 3 días → Enviar correo de recordatorio**.
2. Luego, si el paso tiene una ruta automática, la tarjeta avanza; de lo contrario, se queda en el paso para que una persona la atienda.

:::tip
Una **Espera** al inicio de un paso es una forma sencilla de "retener" una tarjeta antes de que llegue a un voluntario; por ejemplo, *Esperar 7 días y luego un coach se comunica*.
:::

## Agregar personas como tarjetas {#adding-people-as-cards}

Hay varias formas de poner personas en un tablero:

- **Desde el tablero** -- Haga clic en **Agregar tarjeta** en la parte inferior de una columna de paso y elija una persona. También puede elegir un grupo, y cada miembro de ese grupo se agrega como tarjeta.
- **Desde el registro de una persona** -- Use **Agregar a flujo de trabajo** en la página de una persona para colocarla en un flujo de trabajo.
- **Desde la búsqueda de Personas** -- Seleccione varias personas y use la acción masiva **Agregar a flujo de trabajo** para agregarlas todas a la vez.
- **Automáticamente con un disparador** -- Agregue personas cuando ocurra algo, como el envío de un formulario o una primera ofrenda (consulte [Disparadores](#triggers) más abajo).

Agregar a alguien a mano, o con una acción de paso **Agregar a flujo de trabajo**, nunca le da una segunda tarjeta abierta en el mismo flujo de trabajo. Si ya tiene una tarjeta abierta, se omite (en una adición masiva, solo se crean tarjetas nuevas para las personas que no tienen una). Una vez cerrada su tarjeta, puede volver a agregarla. Los disparadores siguen en cambio su propio ajuste **Solo una vez por persona**.

## Trabajar el tablero {#working-the-board}

Abra un flujo de trabajo para ver su tablero. Cada tarjeta muestra el nombre de la persona, a quién está asignada y una etiqueta de fecha límite o de estado (**Vencida** o **Pospuesta**). Una columna de paso también muestra pequeñas insignias de las acciones automáticas que ejecuta y anotaciones de su enrutamiento, lo que le da un mapa de un vistazo de cómo fluyen las tarjetas. Dentro de cada columna, la tarjeta que entró al paso más recientemente aparece arriba.

- **Mover una tarjeta** -- Arrastre una tarjeta de una columna a la siguiente conforme la persona avanza.
- **Abrir una tarjeta** -- Haga doble clic en una tarjeta (o haga clic en ella) para abrir su cajón de detalle, donde puede cambiar el paso, reasignarla, agregar notas y revisar lo que ya ocurrió.

Desde el cajón de la tarjeta puede:

- **Asignar** la tarjeta a otra persona o grupo.
- **Posponer** la tarjeta 1 día, 3 días o 1 semana para ocultar temporalmente su fecha límite.
- **Devolver** al paso anterior u **Omitir** al paso siguiente.
- **Fijar la asignación** -- mantener al mismo responsable en la tarjeta aunque se mueva entre pasos. De forma predeterminada, al mover una tarjeta a un nuevo paso se reasigna al responsable predeterminado de ese paso; fijarla mantiene a la persona actual como responsable durante todo el proceso.
- **Completar** la tarjeta para terminarla, o elegir un botón de **Resultado** si el paso tiene resultados configurados (consulte [Enrutamiento](#routing-cards-with-outcomes-and-conditions)).
- **Quitar tarjeta** -- retirar una tarjeta del tablero sin terminarla, por ejemplo cuando alguien se agregó por error. Después de confirmar, la tarjeta se cierra y desaparece de la lista de todos. No se ejecutan resultados, rutas ni acciones del paso, y su historial se conserva con un registro de **Quitada**. En una [confirmación de asignación de servicio](#serving-assignment-confirmations), quitar la tarjeta cierra la solicitud de la misma forma.
- **Agregar notas** y revisar la **Actividad** de la tarjeta: un registro de las acciones automáticas que se han ejecutado (correos enviados, esperas, etc.), cada una con la fecha y la hora en que ocurrió.

En una tarjeta sobre una persona, el cajón también muestra su teléfono celular y su correo como enlaces en los que puede tocar para llamarla o escribirle, además de un enlace **Ver perfil** si tiene permiso para ver personas. La persona a la que está asignada la tarjeta ve el teléfono y el correo aunque no tenga acceso a Personas.

Las notas se guardan con la tarjeta. Cualquier persona que pueda abrir la tarjeta, incluida la persona o el grupo al que está asignada, puede leer las notas y agregar las suyas. Quienes no pueden abrir la tarjeta no ven sus notas.

### Acciones masivas {#bulk-actions}

Seleccione las casillas de varias tarjetas para actuar sobre ellas en conjunto. Para elegir todas las tarjetas de un paso a la vez, marque la casilla **Seleccionar todo** en el encabezado de la columna del paso; vuelva a marcarla para desmarcarlas. Aparece una barra de herramientas que le permite **Completar**, **Posponer**, **Asignar** (reasignar) o **Mover a…** otro paso para todas las tarjetas seleccionadas a la vez.

## Enrutar tarjetas con resultados y condiciones {#routing-cards-with-outcomes-and-conditions}

El enrutamiento controla adónde va una tarjeta cuando sale de un paso. Abra el editor de un paso para configurar dos tipos de enrutamiento.

### Botones de resultado {#outcome-buttons}

Los resultados son botones que aparecen en el cajón de la tarjeta cuando está completando una tarjeta en ese paso. En lugar de un único botón **Completar**, puede ofrecer opciones como "Se unió a un grupo" o "No interesado". Cada resultado puede:

- Enviar la tarjeta a **otro paso** de este flujo de trabajo,
- **Pasar la tarjeta** a un flujo de trabajo distinto, o
- **Cerrar** la tarjeta.

Así, una sola decisión puede llevar a la persona por caminos diferentes.

### Enrutamiento automático (condicional) {#automatic-routing-conditional}

Las rutas automáticas mueven una tarjeta hacia adelante **en el momento en que entra en un paso** (y después de terminar sus acciones automáticas), sin que nadie haga clic, si la persona cumple un conjunto de condiciones. Agregue una ruta, elija el paso de destino y defina una o más **condiciones** (por ejemplo, el campus, la edad o el estado de membresía de una persona). Los campos de texto pueden compararse exactamente o con **contiene**, **empieza con** o **termina con**. Una ruta sin condiciones coincide con todos.

Las condiciones de fecha (Fecha de hoy, Fecha de nacimiento o Aniversario) pueden comparar la fecha completa o solo una parte: el día de la semana, el **Día del mes**, el **Mes** o los años transcurridos. Para la Fecha de nacimiento o el Aniversario de una persona, **Día del mes** ofrece la opción relativa **Hoy**, de modo que una condición como *Fecha de nacimiento · Día del mes = Hoy* coincide con las personas cuyo cumpleaños cae en el día del mes de hoy. **Mes** ofrece **Mes anterior**, **Mes actual** y **Mes siguiente**. Los valores relativos como estos se calculan con la zona horaria de su iglesia, para que coincidan con el día del calendario de su iglesia y no con el del servidor.

El grupo de condiciones **Ofrendas** tiene **Donante regular inactivo**, que encuentra a personas que solían dar con regularidad y luego dejaron de hacerlo. Establezca tres números: *Dio al menos* **3** *de las últimas* **12** *semanas, y luego nada en las últimas* **3** *semanas* (esos son los valores predeterminados). Las semanas se cuentan hacia atrás desde hoy en la zona horaria de su iglesia, y una ofrenda reembolsada no cuenta. Es más útil en un [disparador de horario](#schedule-triggers); por ejemplo, una regla semanal que agrega a los donantes inactivos a un tablero de seguimiento pastoral. La condición solo observa las fechas de las ofrendas, nunca los montos, y las tarjetas y alertas nunca muestran montos. Como revela quién ha dejado de dar, solo las personas que pueden ver las donaciones ven esta opción y pueden agregarla, cambiarla o quitarla.

Si las condiciones de una ruta no pueden comprobarse por algún motivo, esa ruta se trata como no coincidente. La tarjeta se queda en el paso (o sigue otra ruta que sí coincida) en lugar de quedar atascada.

:::info
En el tablero, cada columna de paso muestra pequeñas anotaciones que describen su enrutamiento; por ejemplo, la etiqueta de un resultado o "si coincide" seguido de una flecha hacia el paso o flujo de destino.
:::

## Pasos totalmente automatizados {#fully-automated-steps}

Puede hacer que un paso se ejecute por completo por sí solo, sin que nadie lo trabaje. Dé al paso sus **acciones automáticas** y agregue una **ruta automática** (sin condiciones) que apunte al siguiente paso. Cuando una tarjeta entra, se ejecutan las acciones y luego la ruta la avanza de inmediato: la tarjeta pasa directamente de largo.

:::tip
Combínelo con **Esperar**: *Enviar correo de bienvenida → Esperar 3 días → avanzar automáticamente al paso "Llamada personal"*. El correo y el tiempo se gestionan por usted, y un voluntario solo ve la tarjeta cuando llega el momento del contacto humano.
:::

## Disparadores {#triggers}

Los disparadores agregan personas a un flujo de trabajo automáticamente cuando ocurre algo, para que nunca tenga que agregar tarjetas a mano. En el tablero de un flujo de trabajo, haga clic en la pestaña **Disparadores** y luego en **Agregar disparador**. Hay dos tipos:

### Disparadores de evento {#event-triggers}

Se activan en cuanto cambia un registro en B1. Elija el evento y, opcionalmente, agregue **condiciones** para que solo se agreguen las personas que coincidan:

- **Persona · Creada / Actualizada** -- por ejemplo, agregar a cualquiera cuyo estado pase a *Visitante* o *Invitado* (el estado que se asigna a quienes se registran por sí mismos).
- **Donación · Creada** -- por ejemplo, agregar una ofrenda de una primera vez o una ofrenda grande a un flujo de agradecimiento (filtre por monto, fondo o método).
- **Grupo · Miembro se unió** / **Grupo · Creado**.
- **Formulario · Enviado** -- agregar a cualquiera que envíe un formulario elegido (ideal para una tarjeta de "Soy nuevo" o "Conectar").

### Disparadores de horario {#schedule-triggers}

Se ejecutan de forma recurrente (diaria, semanal, mensual o anualmente) según un conjunto de condiciones. Úselos para el contacto basado en el tiempo, como *todas las personas que cumplen años hoy* (Fecha de nacimiento · Día del mes = **Hoy**, con el mes en **Mes actual**) o una revisión *mensual*. Incluso sin **Solo una vez por persona**, un disparador de horario no agregará de nuevo a la misma persona dentro de un mismo período de repetición (un día, una semana, un mes o un año, según la frecuencia con que se ejecute).

Para cualquier disparador también puede configurar:

- El **Paso inicial** en el que aterriza la nueva tarjeta (por defecto, el primer paso).
- **Solo una vez por persona** -- para que el disparador no agregue dos veces a la misma persona al flujo de trabajo. Con esta opción activada, se omite a cualquiera que ya tenga una tarjeta en este flujo de trabajo.
  - **Agregar de nuevo después de cerrar su tarjeta** -- aparece cuando **Solo una vez por persona** está activada. Márquela para que el disparador pueda volver a agregar a alguien una vez que su tarjeta anterior en este flujo de trabajo esté cerrada. Una persona nunca tiene dos tarjetas abiertas en el flujo de trabajo al mismo tiempo. Úselo para cosas que pueden ocurrir más de una vez, como un visitante que regresa o un proceso anual.
- **Activo** -- active o desactive el disparador sin eliminarlo.

:::tip
Combine un disparador **Formulario · Enviado** con la plantilla **Seguimiento de nuevo visitante** para convertir su tarjeta "Conectar" o "Soy nuevo" en un proceso de seguimiento automático.
:::

## Confirmaciones de asignación de servicio {#serving-assignment-confirmations}

Un tipo especial de flujo de trabajo puede dar seguimiento a [solicitudes de servicio](./plans.md#assigning-team-members) hasta que cada voluntario acepte o rechace. En lugar de personas, cada tarjeta de este tablero registra **una asignación**: una persona en un puesto de un plan. Dos roles o dos servicios para la misma persona tienen tarjetas separadas. Es opcional: nada cambia para un plan hasta que seleccione un flujo de confirmación en su configuración.

### Cómo configurarlo {#setting-one-up}

1. En la página de Flujos de trabajo, haga clic en **Agregar flujo de trabajo** y elija la plantilla **Confirmación de asignación de servicio**. (O empiece con un **Flujo de trabajo en blanco** y establezca su **Propósito del flujo de trabajo** en **Confirmación de asignación de servicio**). Crear desde la plantilla requiere permiso para enviar mensajes de texto, porque incluye un paso de mensaje de texto.
2. Revise los pasos. La plantilla empieza con:
   - **Solicitar y esperar respuesta** -- envía la solicitud de servicio por correo y por mensaje de texto, espera 2 días, envía un correo de recordatorio, espera 1 día más y luego avanza la tarjeta automáticamente.
   - **Llamar al voluntario por una solicitud sin respuesta** -- un paso para que una persona llame al voluntario, con vencimiento en 1 día. Establezca un **Responsable predeterminado** en este paso. Si no tiene ninguno, la tarjeta va al líder del ministerio, o al equipo del ministerio si no lo hay.
3. Edite las esperas, los mensajes y los pasos para adaptarlos a su iglesia.
4. Abra la [configuración del plan](./plans.md#plan-settings) y elija este flujo de trabajo en **Flujo de confirmación**.

Estos flujos de trabajo usan una acción **Enviar solicitud de servicio** en lugar de **Enviar correo** y **Enviar mensaje de texto**. Elija **Correo electrónico** o **Mensaje de texto** y, opcionalmente, escriba un **Mensaje de solicitud**. La solicitud siempre incluye el rol, el plan, la fecha del servicio y un enlace para responder; puede usar `{{planName}}`, `{{positionName}}` y `{{serviceDate}}` en su mensaje. Deje el mensaje vacío para usar la solicitud predeterminada. Las preferencias de notificación de los voluntarios, su aceptación de mensajes de texto, su proveedor de mensajes y la aprobación del correo de su iglesia se aplican todos, y cualquier intento omitido o bloqueado se registra en la tarjeta. **Enviar correo**, **Enviar mensaje de texto** y **Agregar a flujo de trabajo** no están disponibles en estos tableros.

La pestaña **Disparadores** de un flujo de confirmación explica cómo se inician las tarjetas en lugar de ofrecer disparadores, y estos flujos de trabajo no aparecen en las listas de **Agregar a flujo de trabajo** de las personas.

### Cómo se inician y se cierran las tarjetas {#how-cards-are-started-and-closed}

- Las tarjetas se inician cuando usted **Notifica** a los voluntarios de un plan publicado (consulte [Notificar a los voluntarios](./plan-validation.md#notifying-volunteers)). Cada asignación nueva y sin respuesta obtiene una tarjeta. Guardar, publicar, copiar o completar automáticamente un plan no contacta a nadie por sí solo, y los planes en lápiz no envían nada.
- Los voluntarios siguen recibiendo la alerta habitual dentro de la aplicación. El seguimiento por correo y mensaje de texto proviene del flujo de trabajo.
- Cuando el voluntario **acepta o rechaza**, su tarjeta se cierra automáticamente, junto con cualquier tarea de seguimiento vinculada a ella.
- El cajón de la tarjeta muestra el puesto, la fecha del servicio y un enlace al plan. En lugar de **Completar**, el botón dice **Registrar seguimiento realizado**. Al hacer clic, se registra que alguien hizo el seguimiento, pero la tarjeta sigue abierta y asignada (se muestra como **Esperando respuesta**) hasta que el voluntario responda o venza el plazo de respuesta.
- El plazo de respuesta es el final del último horario de servicio en el que sirve el equipo del puesto. Si el plan no tiene horarios que coincidan, es el final del día del servicio. Si nadie ha respondido para entonces, la tarjeta se cierra con **Plazo de respuesta vencido** y una tarea **Revisar solicitud de servicio sin respuesta** se envía al responsable actual de la tarjeta o al líder del ministerio para que alguien decida cómo cubrir el espacio. La asignación sigue **Sin confirmar**.
- Quitar la asignación, cambiar su persona, su puesto o la fecha del plan, devolver el plan a en lápiz, o cambiar el plan a un flujo de confirmación distinto cierra la tarjeta. Una tarjeta cerrada nunca se reabre con otra **Notificación**; agregue una asignación nueva para enviar una solicitud nueva.

:::info
Para las solicitudes enviadas mediante un flujo de confirmación, los [recordatorios para voluntarios](./plans.md#volunteer-reminders) solo se envían a los voluntarios que han **aceptado**, para que las personas que esperan responder no reciban recordatorios además de los seguimientos del flujo de trabajo.
:::

## Mis tarjetas {#my-cards}

Los voluntarios y el personal no necesitan revisar cada tablero para encontrar su trabajo. La lista **Mis tarjetas** de la página **Mi trabajo** muestra todas las tarjetas asignadas al usuario actual en todos los flujos de trabajo. Para llegar a ella, haga clic en **Mis tarjetas** en la parte superior de la página de Flujos de trabajo, o abra **Servicio > Mi trabajo** en el menú Salto. Al hacer clic en una tarjeta se abre su panel de detalle directamente en la página Mi trabajo, donde puede trabajar la tarjeta o quitarla sin salir de la página. Si puede ver los flujos de trabajo, el panel también tiene un enlace **Abrir tablero del flujo de trabajo** al tablero al que pertenece la tarjeta.

## Reportes {#reports}

Abra un flujo de trabajo y haga clic en **Reportes** para ver las analíticas de ese flujo:

- **Vencidas** -- la cantidad de tarjetas que pasaron su fecha límite.
- **Tarjetas por paso** -- cuántas tarjetas hay actualmente en cada paso, en un gráfico de columnas.
- **Completadas (30 días)** -- el rendimiento de los últimos 30 días, en un gráfico de líneas.

Úselos para detectar cuellos de botella; por ejemplo, un paso donde se acumulan tarjetas y nunca avanzan.

## Artículos relacionados {#related-articles}

- [Tareas](./tasks.md) -- los pendientes individuales en los que se basan las tarjetas de los flujos de trabajo
- [Formularios](../forms/index.md) -- cree los formularios que pueden disparar flujos de trabajo
- [Grupos](../groups/index.md) -- los grupos en los que puede colocar la acción "Agregar a grupo"
- [Planes de servicio](./plans.md) -- elija un flujo de confirmación para las solicitudes de servicio de un plan
- [Roles y permisos](../settings/roles-permissions.md) -- controle quién puede ver, editar y administrar los flujos de trabajo
