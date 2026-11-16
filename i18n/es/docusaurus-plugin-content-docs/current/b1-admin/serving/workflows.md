---
title: "Flujos de trabajo"
description: "Cree tableros de estilo Kanban en B1 Admin para llevar a las personas por los pasos de seguimiento con correos y mensajes automáticos, y con disparadores que agregan personas automáticamente."
---

# Flujos de trabajo {#workflows}

<div class="article-intro">

Los flujos de trabajo llevan a las personas por una serie de pasos en un tablero visual. Cada persona se convierte en una tarjeta que avanza de un paso al siguiente: desde el seguimiento de un visitante por primera vez, hasta un proceso de membresía o un agradecimiento a quien da por primera vez, y cualquier otro caso en el que necesite seguir a muchas personas a través de las mismas etapas. Un paso puede pedirle a un voluntario que haga algo (llamar, tener una conversación) **y** ejecutar acciones automáticas por su cuenta, como enviar un correo o un mensaje, esperar unos días o agregar a la persona a un grupo. Así, los flujos de trabajo se encargan tanto del seguimiento personal como del trabajo rutinario que lo rodea. Los flujos de trabajo amplían las [Tareas](./tasks.md) con un tablero Kanban de arrastrar y soltar para que nada ni nadie se pierda.

</div>

<div class="prereqs">
<h4>Antes de empezar</h4>

- Asegúrese de que las personas que quiere dar seguimiento existan en B1 Admin
- Familiarícese con el funcionamiento de las [Tareas](./tasks.md), ya que cada tarjeta de un tablero es una tarea
- Para usar la acción **Enviar correo**, primero cree las plantillas de correo que quiera enviar (se administran en **Configuración → Plantillas de correo**)
- Para usar la acción **Enviar mensaje de texto**, primero conecte un [proveedor de mensajes de texto](../settings/church-settings.md#texting)
- Necesitará el permiso de Tareas correspondiente. Ver, editar tarjetas y administrar flujos de trabajo son niveles de permiso separados (consulte [Roles y permisos](../settings/roles-permissions.md))

</div>

## Ver los flujos de trabajo {#viewing-workflows}

Abra el [menú Salto](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda de B1 Admin), expanda **Servicio** y haga clic en **Flujos de trabajo**. Sus flujos de trabajo aparecen en una tabla que muestra la **Categoría** y el **Estado** de cada uno (**Activo** o **Inactivo**). Si usa categorías, las pestañas encima de la lista le permiten filtrarla por categoría. Haga clic en cualquier flujo de trabajo para abrir su tablero.

## Crear un flujo de trabajo {#creating-a-workflow}

1. En la página de Flujos de trabajo, haga clic en **Agregar flujo de trabajo**.
2. Elija cómo comenzar:
   - **Flujo de trabajo en blanco** -- comience desde cero y construya sus propios pasos.
   - **Desde una plantilla** -- comience con un conjunto de pasos listo que puede editar. Las plantillas integradas incluyen:
     - **Seguimiento de nuevo visitante** -- Enviar correo de bienvenida → Llamada personal → Invitar al siguiente paso → Conectado
     - **Clase de membresía** -- Expresar interés → Inscribirse a la clase → Asistir a la clase → Completar la membresía
     - **Agradecimiento a quien da por primera vez** -- Enviar nota de agradecimiento → Compartir el impacto de la ofrenda → Mayordomía
     - **Confirmación de asignación de servicio** -- Enviar solicitud y esperar respuesta → Llamar al voluntario por la solicitud sin respuesta (consulte [Confirmaciones de asignación de servicio](#serving-assignment-confirmations))

   Crear los pasos de una plantilla puede tardar un momento. Mientras trabaja, el botón **Agregar flujo de trabajo** dice **Creando...** y no se puede volver a hacer clic, para que no se cree un duplicado. Si algo sale mal, la página muestra el mensaje *"No se pudo crear el flujo de trabajo. Inténtelo de nuevo."*
3. Escriba un **Nombre** para el flujo de trabajo.
4. Opcionalmente, asigne una **Categoría** para agrupar flujos de trabajo relacionados. Puede crear una categoría nueva directamente desde la lista desplegable.
   En el caso de un flujo de trabajo en blanco, también elige su **Propósito del flujo de trabajo**: **Seguimiento de personas** (el tipo habitual) o **Confirmación de asignación de servicio**. El propósito no se puede cambiar después de crear el flujo de trabajo.
5. Deje el flujo de trabajo **Activo** para que se puedan agregar personas, o configúrelo como **Inactivo** para ocultarlo de las listas de agregar a un flujo de trabajo.
6. Haga clic en **Guardar**.

:::tip
Use el botón **Duplicar** en la lista de Flujos de trabajo para copiar un flujo existente, incluidos sus pasos, acciones automáticas y enrutamiento, y usarlo como punto de partida para uno nuevo.
:::

## Construir el tablero con pasos {#building-the-board-with-steps}

Cada tablero de flujo de trabajo está formado por **pasos**, que se muestran como columnas de izquierda a derecha. Abra un flujo de trabajo y use **Agregar paso** para crear cada etapa de su proceso.

Al agregar o editar un paso, puede configurar:

- **Nombre del paso** -- el encabezado de la columna (por ejemplo, "Llamada de bienvenida" o "Esperando inscripción").
- **Vence en (días)** -- establece automáticamente una fecha límite cuando una tarjeta entra a este paso. Las tarjetas que pasaron su fecha límite se marcan como **Vencida**. Déjelo en blanco para no tener fecha límite; también puede borrar un número que haya establecido antes.
- **Responsable predeterminado** -- la persona o grupo al que se asignan automáticamente las tarjetas nuevas de este paso. Cuando el responsable predeterminado es una persona, recibe una notificación de que se le asignó una tarjeta.
- **Acciones automáticas** -- cosas que el sistema hace por su cuenta cuando llega una tarjeta (vea más abajo).
- **Enrutamiento** -- a dónde va la tarjeta cuando sale del paso (consulte [Enrutamiento](#routing-cards-with-outcomes-and-conditions)).

Arrastre las columnas de los pasos al orden que corresponda a su proceso. El orden también define la ruta predeterminada que sigue una tarjeta cuando no aplica ningún otro enrutamiento.

:::info
Guarde primero un paso nuevo. Las acciones automáticas y el enrutamiento se asocian al paso, así que el editor habilita esas secciones una vez que el paso existe.
:::

## Acciones automáticas {#automated-actions}

Cada paso puede tener una lista de **acciones automáticas** que se ejecutan solas en el momento en que una tarjeta **entra** al paso, antes de que alguien la toque. Así, un paso puede a la vez pedirle algo a un voluntario *y* encargarse del trabajo rutinario que rodea el seguimiento.

En el editor de pasos, abra **Acciones automáticas**, haga clic en **Agregar acción**, elija un tipo y complete su configuración. Agregue todas las que necesite; se ejecutan **de arriba abajo, en orden**. Haga clic en **Guardar** en el paso para guardar el paso y todas sus acciones juntas. Quitar una acción con su icono de papelera surte efecto de inmediato.

| Acción | Qué hace |
|---|---|
| **Enviar correo** | Envía a la persona una plantilla de correo que usted elija. Puede reemplazar el asunto. |
| **Enviar mensaje de texto** | Envía a la persona un mensaje que usted escribe, a través del [proveedor de mensajes de texto](../settings/church-settings.md#texting) de su iglesia. |
| **Esperar** | Pausa la tarjeta durante una cantidad de días antes de continuar (vea más abajo). |
| **Agregar al grupo** | Agrega a la persona a un [grupo](../groups/index.md) que usted elija. |
| **Quitar del grupo** | Quita a la persona de un grupo que usted elija. |
| **Registrar asistencia** | Marca a la persona como presente en el horario de servicio en curso de un grupo (vea más abajo). |
| **Agregar al flujo de trabajo** | Inicia a la persona en otro flujo de trabajo, útil para pasar de un proceso a otro. |
| **Agregar nota** | Registra una nota en el historial de la tarjeta. |
| **Establecer campo** | Actualiza un campo del registro de la persona: Estado de membresía, Estado civil, Género, Ciudad, Estado o Código postal. |
| **Webhook** | Envía los detalles de la tarjeta a una dirección web externa (URL) que usted proporcione, para conectarla con otros sistemas. |
| **Crear tarea** | Crea una [tarea](./tasks.md) con el título y la descripción que escriba, asignada a quien usted elija. |
| **Notificar a la persona** | Envía a un miembro del personal o a un voluntario que usted elija un correo y una notificación de B1 sobre la tarjeta (vea más abajo). |

Cuando terminan todas las acciones de un paso, la tarjeta **se queda en ese paso** para que alguien pueda trabajarla, a menos que el paso tenga una ruta automática que la mueva al siguiente (consulte [Pasos totalmente automatizados](#fully-automated-steps)).

:::info
Las acciones automáticas solo se ejecutan cuando una tarjeta llega por el flujo normal: cuando se agrega por primera vez, cuando un resultado o una ruta automática la trae, o después de que termina una Espera. **No** se vuelven a ejecutar cuando un miembro del personal arrastra manualmente una tarjeta al paso o la devuelve, así que una persona no recibe el mismo correo dos veces.
:::

### Enviar correo {#sending-email}

Elija **Enviar correo**, seleccione una de sus plantillas de correo y, opcionalmente, escriba un asunto personalizado. Cuando una tarjeta entra al paso, la persona recibe ese correo automáticamente. (Si la persona no tiene una dirección de correo registrada, el paso simplemente omite esta acción.) Los [campos de combinación](../settings/email-templates.md#merge-fields) de la plantilla, como `{{firstName}}`, se completan con los datos de la propia persona. Si un disparador de **Donación · Creada** inició el flujo de trabajo, los campos de la ofrenda `{{amount}}`, `{{giftDate}}`, `{{fund}}` y `{{receipt}}` se completan con los datos de esa ofrenda, incluso en pasos que se ejecutan después de una Espera. Consulte [Campos de combinación de ofrendas](../settings/email-templates.md#gift-merge-fields).

Cuando el correo sale, el historial de la tarjeta registra **Correo enviado**. Si no puede enviarse (por ejemplo, porque el correo de su iglesia todavía no está aprobado o se alcanzó el límite diario), no se agrega ninguna entrada de "Correo enviado".

:::info
Los correos de los flujos de trabajo solo salen después de que su iglesia haya sido aprobada para enviar correo de grupo, y cuentan para el límite diario de correos de su iglesia. Consulte [Activar el correo de grupo para su iglesia](../groups/group-members.md#turning-on-group-email-for-your-church). La acción **Enviar correo** le advierte en el editor de pasos cuando estos correos no se enviarán: *"El correo de su iglesia todavía no ha sido aprobado..."* si la aprobación está pendiente, o *"El correo de su iglesia está en pausa..."* si mensajes recientes rebotaron o fueron reportados como spam.
:::

### Registrar asistencia {#recording-attendance}

Elija **Registrar asistencia** y haga clic en **Elegir grupo** para seleccionar el grupo cuya asistencia debe registrarse. Cuando se ejecuta la acción, la persona se marca como presente en el horario de servicio en curso de ese grupo, igual que si se hubiera registrado en el check-in. Es útil con un disparador que agrega personas al flujo de trabajo a medida que llegan, de modo que se cuentan sin un check-in aparte.

- La asistencia se mide en el momento en que la tarjeta fue **creada**, así que una **Espera** anterior dentro del flujo de trabajo no la empuja más allá del servicio.
- Solo cuentan los horarios de servicio que tienen día y hora de inicio. Si ninguno de los horarios de servicio del grupo está en curso en ese momento, no se registra nada y el historial de la tarjeta indica **No hay servicio programado en curso — asistencia no registrada**.
- Cuando se registra la asistencia, el historial de la tarjeta muestra **Asistencia registrada** seguido del nombre del grupo. Ejecutar la acción de nuevo para el mismo servicio no cuenta a la persona dos veces.

### Notificar a una persona {#notifying-a-person}

Elija **Notificar a la persona**, haga clic en **Elegir persona** y, opcionalmente, escriba un **Mensaje**. Cuando una tarjeta entra al paso, esa persona recibe un correo y una notificación de B1 con el nombre de la persona de la tarjeta, los nombres del flujo de trabajo y del paso, su mensaje y un enlace para abrir la tarjeta. Úselo para avisar a un miembro del personal o a un líder de ministerio, por ejemplo: *"Avisar al pastor cuando alguien llegue al paso Entrevista de membresía."* El historial de la tarjeta registra **Notificado** seguido del nombre de la persona.

### Enviar un mensaje de texto {#sending-a-text}

Elija **Enviar mensaje de texto** y escriba el **Mensaje de texto** (hasta 1,600 caracteres). Si su iglesia tiene [plantillas de texto](../settings/email-templates.md) guardadas, aparece una lista **Empezar desde una plantilla** encima del cuadro. Al elegir una, el texto de la plantilla se copia al mensaje, y aún puede editarlo. El paso conserva su propia copia, así que los cambios posteriores en la plantilla no modifican el paso. Cuando una tarjeta entra al paso, la persona recibe ese mensaje en su teléfono móvil. Para personalizar el mensaje, haga clic en una etiqueta debajo del cuadro del mensaje (**Nombre**, **Apellido**, **Nombre para mostrar** o **Nombre de la iglesia**) para insertar `{{firstName}}`, `{{lastName}}`, `{{displayName}}` o `{{churchName}}` en el cursor. Cada uno se reemplaza con los datos de la persona cuando se envía el mensaje. Las etiquetas **Monto**, **Fecha de la ofrenda**, **Fondo** y **Recibo** insertan los campos de la ofrenda, que solo se completan cuando un disparador de **Donación · Creada** inició el flujo de trabajo. Por ejemplo: `¡Gracias {{firstName}} por tu ofrenda de {{amount}} para {{fund}}!`

- Si la persona no tiene un teléfono móvil registrado, no se envía ningún mensaje y el historial de la tarjeta registra **Mensaje omitido: sin teléfono móvil**.
- Si la persona canceló la suscripción, no se envía ningún mensaje y el historial de la tarjeta registra **Mensaje omitido: suscripción cancelada**.
- Cuando sale el mensaje, el historial de la tarjeta registra **Mensaje enviado**. Si el envío falla (por ejemplo, porque no hay ningún proveedor de mensajes conectado o su iglesia se quedó sin créditos de mensajes), el error queda registrado en el historial de la tarjeta y las acciones restantes del paso se siguen ejecutando.

:::warning
Los mensajes se envían a través del [proveedor de mensajes de texto](../settings/church-settings.md#texting) propio de su iglesia. Si no hay ningún proveedor conectado, el editor de acciones muestra la advertencia *"No hay ningún proveedor de mensajes de texto configurado"* y los mensajes no se enviarán.
:::

### Esperar unos días (secuencias de goteo) {#waiting-a-few-days-drip-sequences}

La acción **Esperar** mantiene la tarjeta durante la cantidad de días que establezca. Mientras espera, la tarjeta se muestra como **Pospuesta**. B1 revisa las esperas terminadas cada 30 minutos, así que una tarjeta se reanuda dentro de unos 30 minutos después de que termina su espera. Cuando la espera termina:

1. Se ejecutan las **acciones restantes del mismo paso**, así que puede construir un goteo como **Enviar correo → Esperar 3 días → Enviar correo de recordatorio**.
2. Luego, si el paso tiene una ruta automática, la tarjeta avanza; de lo contrario, **se queda en ese paso** para que una persona la atienda.

:::tip
Una **Espera** al inicio de un paso es una forma sencilla de "retener" una tarjeta antes de que llegue a un voluntario. Por ejemplo: *Esperar 7 días y luego un coach se comunica*.
:::

## Agregar personas como tarjetas {#adding-people-as-cards}

Hay varias formas de poner personas en un tablero:

- **Desde el tablero** -- Haga clic en **Agregar tarjeta** al final de una columna de paso y elija una persona. También puede elegir un grupo, y cada miembro de ese grupo se agrega como tarjeta.
- **Desde el registro de una persona** -- Use **Agregar al flujo de trabajo** en la página de una persona para colocarla en un flujo de trabajo.
- **Desde la búsqueda de Personas** -- Seleccione varias personas y use la acción masiva **Agregar al flujo de trabajo** para agregarlas todas a la vez.
- **Automáticamente con un disparador** -- Agregue personas cuando algo ocurre, como el envío de un formulario o una primera ofrenda (vea [Disparadores](#triggers) más abajo).

Agregar a alguien a mano, o con una acción de paso **Agregar al flujo de trabajo**, nunca le da una segunda tarjeta abierta en el mismo flujo de trabajo. Si ya tiene una tarjeta abierta, se omite (en una adición masiva, solo se crean tarjetas nuevas para las personas que no tienen una). Cuando su tarjeta se cierra, puede volver a agregarla. Los disparadores siguen su propia configuración **Solo una vez por persona**.

## Trabajar el tablero {#working-the-board}

Abra un flujo de trabajo para ver su tablero. Cada tarjeta muestra el nombre de la persona, a quién está asignada y una etiqueta de fecha límite o de estado (**Vencida** o **Pospuesta**). Una columna de paso también muestra pequeñas insignias de las acciones automáticas que ejecuta y anotaciones de su enrutamiento, lo que le da un mapa de un vistazo de cómo fluyen las tarjetas. Dentro de cada columna, la tarjeta que entró al paso más recientemente está arriba.

- **Mover una tarjeta** -- Arrastre una tarjeta de una columna a la siguiente a medida que la persona avanza.
- **Abrir una tarjeta** -- Haga doble clic en una tarjeta (o haga clic en ella) para abrir su panel de detalle, donde puede cambiar el paso, reasignarla, agregar notas y revisar lo que ya ha ocurrido.

Desde el panel de la tarjeta puede:

- **Asignar** la tarjeta a otra persona o grupo. El cambio queda registrado en la **Actividad** de la tarjeta, por ejemplo "Reasignada de Jane Smith a John Doe".
- **Posponer** la tarjeta 1 día, 3 días o 1 semana para ocultar temporalmente su fecha límite.
- **Devolver** al paso anterior o **Saltar** al siguiente paso.
- **Fijar responsable** -- mantiene el mismo responsable en la tarjeta aunque avance entre pasos. De forma predeterminada, al mover una tarjeta a un nuevo paso se reasigna al responsable predeterminado de ese paso; fijar el responsable mantiene a la persona actual a cargo durante todo el proceso.
- **Completar** la tarjeta para terminarla, o elegir un botón de **Resultado** si el paso tiene resultados configurados (consulte [Enrutamiento](#routing-cards-with-outcomes-and-conditions)).
- **Quitar tarjeta** -- retire una tarjeta del tablero sin terminarla, por ejemplo cuando alguien se agregó por error. Después de confirmar, la tarjeta se cierra y desaparece de la lista de todos. No se ejecutan resultados, rutas ni acciones de paso, y su historial se conserva con una entrada de **Quitada**. En el caso de una tarjeta de [confirmación de asignación de servicio](#serving-assignment-confirmations), quitarla cierra la solicitud de la misma forma.
- **Agregar notas** y revisar la **Actividad** de la tarjeta, un registro de las acciones automáticas que se han ejecutado (correos enviados, esperas, etc.), cada una con la fecha y la hora en que ocurrió.

En el caso de una tarjeta sobre una persona, el panel también muestra el teléfono móvil y el correo de esa persona como enlaces en los que puede hacer clic para llamar o enviar un correo, además de un enlace **Ver perfil** si tiene permiso para ver personas. La persona a la que está asignada la tarjeta ve el teléfono y el correo aunque no tenga acceso a Personas.

Las notas se guardan con la tarjeta. Cualquiera que pueda abrir la tarjeta, incluida la persona o el grupo al que está asignada, puede leer las notas y agregar las suyas. Las personas que no pueden abrir la tarjeta no ven sus notas.

### Acciones masivas {#bulk-actions}

Seleccione las casillas de varias tarjetas para actuar sobre ellas en conjunto. Para elegir todas las tarjetas de un paso a la vez, marque la casilla **Seleccionar todo** en el encabezado de la columna de ese paso; márquela de nuevo para deseleccionarlas. Aparece una barra de herramientas que le permite **Completar**, **Posponer**, **Asignar** (reasignar) o **Mover a…** otro paso para todas las tarjetas seleccionadas a la vez.

## Enrutar tarjetas con resultados y condiciones {#routing-cards-with-outcomes-and-conditions}

El enrutamiento controla a dónde va una tarjeta cuando sale de un paso. Abra el editor de un paso para configurar dos tipos de enrutamiento.

### Botones de resultado {#outcome-buttons}

Los resultados son botones que aparecen en el panel de la tarjeta cuando completa una tarjeta de ese paso. En lugar de un solo botón **Completar**, puede ofrecer opciones como "Se unió a un grupo" o "No está interesado". Cada resultado puede:

- Enviar la tarjeta a **otro paso** de este flujo de trabajo,
- **Pasar la tarjeta** a un flujo de trabajo diferente por completo, o
- **Cerrar** la tarjeta.

Así, una sola decisión puede dirigir a la persona por distintos caminos.

### Enrutamiento automático (condicional) {#automatic-routing-conditional}

Las rutas automáticas mueven una tarjeta al siguiente paso **en el momento en que entra a un paso** (y después de que terminan sus acciones automáticas), sin que nadie haga clic, si la persona cumple un conjunto de condiciones. Agregue una ruta, elija el paso de destino y defina una o más **condiciones** (por ejemplo, el campus, la edad o el estado de membresía de una persona). Los campos de texto pueden coincidir exactamente o con **contiene**, **empieza con** o **termina con**. Una ruta sin condiciones coincide con todas las personas.

Las condiciones de fecha (Fecha de hoy, Fecha de nacimiento o Aniversario) pueden comparar la fecha completa o solo una parte: el día de la semana, el **Día del mes**, el **Mes** o los años transcurridos. Para la Fecha de nacimiento o el Aniversario de una persona, **Día del mes** ofrece la opción relativa **Hoy**, así que una condición como *Fecha de nacimiento · Día del mes = Hoy* coincide con las personas cuyo cumpleaños cae en el día de hoy del mes. **Mes** ofrece **Mes anterior**, **Mes actual** y **Mes siguiente**. Los valores relativos como estos se calculan con la zona horaria de su iglesia, así que coinciden con el día del calendario de su iglesia y no con el del servidor.

El grupo de condiciones **Ofrendas** incluye **Dador regular que dejó de dar**, que encuentra a personas que solían dar con regularidad y luego dejaron de hacerlo. Establezca tres números: *Dio al menos* **3** *de las últimas* **12** *semanas, y luego nada en las últimas* **3** *semanas* (esos son los valores predeterminados). Las semanas se cuentan hacia atrás desde hoy en la zona horaria de su iglesia, y una ofrenda reembolsada no cuenta. Es más útil en un [disparador de horario](#schedule-triggers): por ejemplo, una regla semanal que agrega a los dadores que dejaron de dar a un tablero de seguimiento pastoral. La condición solo revisa las fechas de las ofrendas, nunca los montos, y las tarjetas y alertas nunca muestran montos. Como revela quién dejó de dar, solo las personas que pueden ver donaciones ven esta opción y pueden agregarla, cambiarla o quitarla.

Si las condiciones de una ruta no se pueden verificar por alguna razón, esa ruta se considera como no coincidente. La tarjeta se queda en el paso (o sigue otra ruta que sí coincida) en lugar de quedarse atascada.

:::info
En el tablero, cada columna de paso muestra pequeñas anotaciones que describen su enrutamiento, por ejemplo, la etiqueta de un resultado o "si coincide" seguido de una flecha hacia el paso o flujo de destino.
:::

## Pasos totalmente automatizados {#fully-automated-steps}

Puede hacer que un paso se ejecute por completo por su cuenta, sin que nadie lo atienda. Dé al paso sus **acciones automáticas** y agregue una **ruta automática** (sin condiciones) que apunte al siguiente paso. Cuando entra una tarjeta, se ejecutan las acciones y luego la ruta la avanza de inmediato: la tarjeta pasa directamente.

:::tip
Combínelo con **Esperar**: *Enviar correo de bienvenida → Esperar 3 días → avanzar automáticamente al paso "Llamada personal".* El correo y el tiempo se manejan por usted, y un voluntario solo ve la tarjeta cuando llega el momento del contacto personal.
:::

## Disparadores {#triggers}

Los disparadores agregan personas a un flujo de trabajo automáticamente cuando algo ocurre, así que nunca tiene que agregar tarjetas a mano. En el tablero de un flujo de trabajo, haga clic en la pestaña **Disparadores** y luego en **Agregar disparador**. Hay dos tipos:

### Disparadores de evento {#event-triggers}

Se activan en cuanto cambia un registro en B1. Elija el evento y, opcionalmente, agregue **condiciones** para que solo se agreguen las personas que coincidan:

- **Persona · Creada / Actualizada** -- por ejemplo, agregar a cualquier persona cuyo estado pase a *Visitante* o *Invitado* (el estado que se asigna a quienes se registran por su cuenta).
- **Donación · Creada** -- por ejemplo, agregar una ofrenda de una primera vez o una ofrenda grande a un flujo de agradecimiento (filtre por monto, fondo o método).
- **Grupo · Miembro agregado** / **Grupo · Creado**.
- **Formulario · Enviado** -- agregar a cualquiera que envíe un formulario elegido (ideal para una tarjeta de "Soy nuevo" o "Conectar").

### Disparadores de horario {#schedule-triggers}

Se ejecutan de forma recurrente (diaria, semanal, mensual o anualmente) según un conjunto de condiciones. Úselos para el contacto basado en fechas, como *todas las personas cuyo cumpleaños es hoy* (Fecha de nacimiento · Día del mes = **Hoy**, con el mes igual a **Mes actual**) o una revisión *mensual*. Incluso sin **Solo una vez por persona**, un disparador de horario no vuelve a agregar a la misma persona dentro de un mismo periodo de repetición (un día, una semana, un mes o un año, según la frecuencia con que se ejecuta).

Para cualquier disparador también puede configurar:

- El **Paso inicial** en el que aterriza la nueva tarjeta (de forma predeterminada, el primer paso).
- **Solo una vez por persona** -- para que el disparador no agregue dos veces a la misma persona al flujo de trabajo. Con esta opción activada, se omite cualquiera que ya tenga una tarjeta en este flujo de trabajo.
  - **Agregar de nuevo después de cerrar su tarjeta** -- aparece cuando **Solo una vez por persona** está activado. Márquela para que el disparador vuelva a agregar a alguien una vez que su tarjeta anterior en este flujo de trabajo se cierre. Una persona nunca tiene dos tarjetas abiertas en el flujo de trabajo al mismo tiempo. Úselo para cosas que pueden ocurrir más de una vez, como un visitante que regresa o un proceso anual.
- **Activo** -- active o desactive el disparador sin borrarlo.

:::tip
Combine un disparador de **Formulario · Enviado** con la plantilla **Seguimiento de nuevo visitante** para convertir su formulario "Tarjeta de conexión" o "Soy nuevo" en un proceso de seguimiento automático.
:::

## Confirmaciones de asignación de servicio {#serving-assignment-confirmations}

Un tipo especial de flujo de trabajo puede dar seguimiento a [solicitudes de servicio](./plans.md#assigning-team-members) hasta que cada voluntario acepte o rechace. En lugar de personas, cada tarjeta de este tablero registra **una asignación**: una persona en un puesto en un plan. Dos roles o dos servicios para la misma persona generan tarjetas separadas. Es opcional: no cambia nada para un plan hasta que seleccione un flujo de confirmación en su configuración.

### Cómo configurarlo {#setting-one-up}

1. En la página de Flujos de trabajo, haga clic en **Agregar flujo de trabajo** y elija la plantilla **Confirmación de asignación de servicio**. (O comience con un **Flujo de trabajo en blanco** y configure su **Propósito del flujo de trabajo** como **Confirmación de asignación de servicio**.) Crear desde la plantilla requiere permiso para enviar mensajes de texto, ya que incluye un paso de mensaje.
2. Revise los pasos. La plantilla comienza con:
   - **Enviar solicitud y esperar respuesta** -- envía la solicitud de servicio por correo y mensaje de texto, espera 2 días, envía un correo de recordatorio, espera 1 día más y luego avanza la tarjeta automáticamente.
   - **Llamar al voluntario por la solicitud sin respuesta** -- un paso para que una persona llame al voluntario, con fecha límite en 1 día. Configure un **Responsable predeterminado** en este paso. Si no tiene ninguno, la tarjeta va al líder del ministerio, o al equipo del ministerio si no existe uno.
3. Edite las esperas, los mensajes y los pasos según las necesidades de su iglesia.
4. Abra la [configuración de un plan](./plans.md#plan-settings) y elija este flujo de trabajo en **Flujo de confirmación**.

Estos flujos de trabajo usan una acción **Enviar solicitud de servicio** en lugar de **Enviar correo** y **Enviar mensaje de texto**. Elija **Correo electrónico** o **Mensaje de texto** y, opcionalmente, escriba un **Mensaje de solicitud**. La solicitud siempre incluye el rol, el plan, la fecha del servicio y un enlace para responder; puede usar `{{planName}}`, `{{positionName}}` y `{{serviceDate}}` en su mensaje. Deje el mensaje vacío para usar la solicitud predeterminada. Aplican las preferencias de notificación de los voluntarios, su consentimiento para mensajes de texto, su proveedor de mensajes y la aprobación de correo de su iglesia, y cualquier intento omitido o bloqueado queda registrado en la tarjeta. **Enviar correo**, **Enviar mensaje de texto** y **Agregar al flujo de trabajo** no están disponibles en estos tableros.

La pestaña **Disparadores** de un flujo de trabajo de confirmación explica cómo se inician las tarjetas en lugar de ofrecer disparadores, y estos flujos no aparecen en las listas de **Agregar al flujo de trabajo** de las personas. El tablero no tiene botón **Agregar tarjeta**, ya que las tarjetas solo se generan a partir de solicitudes de servicio en un plan.

### Cómo se inician y se cierran las tarjetas {#how-cards-are-started-and-closed}

- Las tarjetas se inician cuando **Notifica** a los voluntarios de un plan publicado (consulte [Notificar a los voluntarios](./plan-validation.md#notifying-volunteers)). Cada asignación nueva y sin respuesta genera una tarjeta. Guardar, publicar, copiar o llenar automáticamente un plan no contacta a nadie por sí mismo, y los planes en lápiz no envían nada.
- Los voluntarios siguen recibiendo la alerta habitual dentro de la aplicación. El seguimiento por correo y mensaje de texto proviene del flujo de trabajo.
- Cuando el voluntario **acepta o rechaza**, su tarjeta se cierra automáticamente, junto con cualquier tarea de seguimiento vinculada a ella.
- El panel de la tarjeta muestra el puesto, la fecha del servicio y un enlace al plan. En lugar de **Completar**, el botón dice **Registrar seguimiento realizado**. Al hacer clic, se registra que alguien hizo el seguimiento, pero la tarjeta sigue abierta y asignada (se muestra como **Esperando respuesta**) hasta que el voluntario responda o venza el plazo de respuesta.
- El plazo de respuesta es el final del último horario de servicio en el que sirve el equipo del puesto. Si el plan no tiene horarios correspondientes, es el final del día del servicio. Si nadie ha respondido para entonces, la tarjeta se cierra con **Plazo de respuesta vencido** y se envía una tarea **Revisar solicitud de servicio sin respuesta** al responsable actual de la tarjeta o al líder del ministerio, para que alguien decida cómo cubrir el espacio. La asignación sigue **Sin confirmar**.
- Quitar la asignación, cambiar su persona, puesto o fecha del plan, devolver el plan a en lápiz, o cambiar el plan a otro flujo de confirmación cierra la tarjeta. Una tarjeta cerrada nunca se reabre con otra **Notificación**; agregue una asignación nueva para enviar una solicitud nueva.

:::info
En el caso de las solicitudes enviadas a través de un flujo de confirmación, los [recordatorios para voluntarios](./plans.md#volunteer-reminders) solo se envían a los voluntarios que han **aceptado**, para que las personas que esperan responder no reciban recordatorios además de los seguimientos del flujo de trabajo.
:::

## Mis tarjetas {#my-cards}

Los voluntarios y el personal no tienen que buscar en cada tablero para encontrar su trabajo. La lista **Mis tarjetas** de la página **Mi trabajo** muestra todas las tarjetas asignadas al usuario actual en todos los flujos de trabajo. Para llegar ahí, haga clic en **Mis tarjetas** en la parte superior de la página de Flujos de trabajo, o abra **Servicio > Mi trabajo** en el menú Salto. Al hacer clic en una tarjeta se abre su panel de detalle directamente en la página Mi trabajo, donde puede trabajarla o quitarla sin salir de la página. Si puede ver los flujos de trabajo, el panel también tiene un enlace **Abrir tablero del flujo de trabajo** al tablero al que pertenece la tarjeta.

## Reportes {#reports}

Abra un flujo de trabajo y haga clic en **Reportes** para ver las estadísticas de ese flujo:

- **Vencidas** -- la cantidad de tarjetas que pasaron su fecha límite.
- **Tarjetas por paso** -- cuántas tarjetas hay actualmente en cada paso, mostradas como gráfico de columnas.
- **Completadas (30 días)** -- el rendimiento de los últimos 30 días, mostrado como gráfico de líneas.

Use estos datos para detectar cuellos de botella, por ejemplo, un paso donde se acumulan tarjetas y nunca avanzan.

## Artículos relacionados {#related-articles}

- [Tareas](./tasks.md) -- los pendientes individuales sobre los que se construyen las tarjetas del flujo de trabajo
- [Formularios](../forms/index.md) -- cree los formularios que pueden activar flujos de trabajo
- [Grupos](../groups/index.md) -- los grupos en los que una acción "Agregar al grupo" puede colocar a personas
- [Planes de servicio](./plans.md) -- elija un flujo de confirmación para las solicitudes de servicio de un plan
- [Roles y permisos](../settings/roles-permissions.md) -- controle quién puede ver, editar y administrar flujos de trabajo
