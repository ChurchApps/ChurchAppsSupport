---
title: "Flujos de trabajo"
---

# Flujos de trabajo

<div class="article-intro">

Los flujos de trabajo llevan a las personas por una serie de pasos en un tablero visual. Cada persona se convierte en una tarjeta que avanza de un paso al siguiente: desde el seguimiento de un invitado que llega por primera vez, pasando por un proceso de membresía, hasta un agradecimiento a quien da por primera vez, y cualquier otra situación en la que necesite dar seguimiento a muchas personas en las mismas etapas. Un paso puede pedirle a un voluntario que haga algo (llamar, tener una conversación) **y** ejecutar acciones automatizadas por sí solo, como enviar un correo o un mensaje de texto, esperar unos días o agregar a la persona a un grupo. Así, los flujos de trabajo se encargan tanto del seguimiento humano como del trabajo rutinario que lo rodea. Los flujos de trabajo amplían las [Tareas](./tasks.md) con un tablero Kanban de arrastrar y soltar, para que nadie se quede sin atención.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Asegúrese de que las personas que desea dar seguimiento existan en B1 Admin
- Familiarícese con cómo funcionan las [Tareas](./tasks.md), porque cada tarjeta de un tablero es una tarea
- Para usar la acción **Enviar correo**, cree primero las plantillas de correo que desea enviar (se administran en **Configuración → Plantillas de correo**)
- Para usar la acción **Enviar texto**, conecte antes un [proveedor de mensajes de texto](../settings/church-settings.md#texting)
- Necesitará el permiso de Tareas correspondiente. Ver, editar tarjetas y administrar flujos de trabajo son niveles de permiso distintos (consulte [Roles y permisos](../settings/roles-permissions.md))

</div>

## Ver los flujos de trabajo

Abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda de B1 Admin), expanda **Servicio** y haga clic en **Flujos de trabajo**. Sus flujos aparecen en una tabla que muestra la **Categoría** y el **Estado** de cada uno (**Activo** o **Inactivo**). Si usa categorías, las pestañas sobre la lista le permiten filtrarla por categoría. Haga clic en cualquier flujo para abrir su tablero.

## Crear un flujo de trabajo

1. En la página de Flujos de trabajo, haga clic en **Agregar flujo de trabajo**.
2. Elija cómo empezar:
   - **Flujo en blanco**: empiece desde cero y arme sus propios pasos.
   - **Desde una plantilla**: empiece con un conjunto de pasos ya listo que puede editar. Las plantillas integradas incluyen:
     - **Seguimiento a nuevo visitante**: Enviar correo de bienvenida → Llamada personal → Invitar al siguiente paso → Conectado
     - **Clase de membresía**: Expresó interés → Inscribirse a la clase → Asistir a la clase → Completar membresía
     - **Agradecimiento a quien da por primera vez**: Enviar nota de agradecimiento → Compartir el impacto de la ofrenda → Administrador fiel
     - **Confirmación de asignación de servicio**: Solicitar y esperar respuesta → Llamar al voluntario por la solicitud sin respuesta (consulte [Confirmaciones de asignación de servicio](#serving-assignment-confirmations))

   Armar los pasos de una plantilla puede tardar un momento. Mientras trabaja, el botón **Agregar flujo de trabajo** dice **Creando...** y no puede volver a hacer clic, así que no se creará un duplicado. Si algo sale mal, la página muestra *"No se pudo crear el flujo de trabajo. Inténtelo de nuevo."*
3. Escriba un **Nombre** para el flujo de trabajo.
4. Opcionalmente, asigne una **Categoría** para agrupar flujos relacionados. Puede crear una categoría nueva desde el menú desplegable.
   Para un flujo en blanco, también elige su **Propósito del flujo**: **Seguimiento de personas** (el tipo habitual) o **Confirmación de asignación de servicio**. El propósito no se puede cambiar después de crear el flujo.
5. Deje el flujo en **Activo** para que se puedan agregar personas, o cámbielo a **Inactivo** para ocultarlo de las listas de agregar a un flujo.
6. Haga clic en **Guardar**.

:::tip
Use el botón **Duplicar** de la lista de Flujos de trabajo para copiar un flujo existente, incluidos sus pasos, acciones automatizadas y ruteo, como punto de partida para uno nuevo.
:::

## Armar el tablero con pasos

Cada tablero de flujo de trabajo está formado por **pasos**, que se muestran como columnas de izquierda a derecha. Abra un flujo y use **Agregar paso** para crear cada etapa de su proceso.

Al agregar o editar un paso, puede configurar:

- **Nombre del paso**: el encabezado de la columna (por ejemplo, "Llamada de bienvenida" o "Esperando inscripción").
- **Vence en (días)**: establece automáticamente una fecha de vencimiento cuando una tarjeta entra a este paso. Las tarjetas que pasan su fecha de vencimiento se marcan como **Vencidas**.
- **Responsable predeterminado**: la persona o grupo al que se asignan automáticamente las tarjetas nuevas de este paso. Cuando el responsable predeterminado es una persona, recibe una notificación de que se le asignó una tarjeta.
- **Acciones automatizadas**: cosas que el sistema hace por sí solo cuando llega una tarjeta (vea más abajo).
- **Ruteo**: a dónde va la tarjeta cuando sale del paso (consulte [Ruteo](#routing-cards-with-outcomes-and-conditions)).

Arrastre las columnas de los pasos para ordenarlas según su proceso. El orden también define la ruta predeterminada que sigue una tarjeta cuando no se aplica otro ruteo.

:::info
Guarde primero un paso nuevo. Las acciones automatizadas y el ruteo se asocian al paso, así que el editor habilita esas secciones una vez que el paso existe.
:::

## Acciones automatizadas

Cada paso puede tener una lista de **acciones automatizadas** que se ejecutan por sí solas en el momento en que una tarjeta **entra** al paso, antes de que nadie la toque. Así, un paso tanto indica a un voluntario lo que debe hacer como se encarga del trabajo rutinario que rodea el seguimiento.

En el editor de pasos, abra **Acciones automatizadas**, haga clic en **Agregar acción**, elija un tipo y complete su configuración. Agregue todas las que necesite; se ejecutan **de arriba hacia abajo, en orden**. Haga clic en **Guardar** en el paso para guardar el paso y todas sus acciones juntas. Quitar una acción con su ícono de papelera surte efecto de inmediato.

| Acción | Qué hace |
|---|---|
| **Enviar correo** | Envía a la persona una plantilla de correo que usted elija. Puede reemplazar el asunto. |
| **Enviar texto** | Envía a la persona un mensaje que usted escribe, a través del [proveedor de mensajes de texto](../settings/church-settings.md#texting) de su iglesia. |
| **Esperar** | Pausa la tarjeta un número de días antes de continuar (vea más abajo). |
| **Agregar al grupo** | Agrega a la persona a un [grupo](../groups/index.md) que elija. |
| **Quitar del grupo** | Quita a la persona de un grupo que elija. |
| **Registrar asistencia** | Marca a la persona como presente en el horario de servicio en curso de un grupo (vea más abajo). |
| **Agregar al flujo de trabajo** | Inicia a la persona en otro flujo de trabajo; es útil para pasar a alguien de un proceso a otro. |
| **Agregar nota** | Registra una nota en el historial de la tarjeta. |
| **Establecer campo** | Actualiza un campo del registro de la persona: Estado de membresía, Estado civil, Género, Ciudad, Estado o Código postal. |
| **Webhook** | Envía los datos de la tarjeta a una dirección web externa (URL) que usted indique, para conectarse con otros sistemas. |
| **Crear tarea** | Crea una [tarea](./tasks.md) con el título y la descripción que ingrese, asignada a quien elija. |
| **Notificar a persona** | Envía a un miembro del personal o a un voluntario que usted elija un correo y una notificación de B1 sobre la tarjeta (vea más abajo). |

Cuando terminan todas las acciones de un paso, la tarjeta **se queda en ese paso** para que alguien la trabaje, a menos que el paso tenga una ruta automática que la mueva hacia adelante (consulte [Pasos totalmente automatizados](#fully-automated-steps)).

:::info
Las acciones automatizadas solo se ejecutan cuando una tarjeta llega por el flujo normal: cuando se agrega por primera vez, cuando un resultado o una ruta automática la trae, o cuando termina una espera. **No** se vuelven a ejecutar cuando un miembro del personal arrastra manualmente una tarjeta al paso o la devuelve, así que una persona no recibirá dos veces el mismo correo.
:::

### Enviar correo

Elija **Enviar correo**, seleccione una de sus plantillas de correo y, opcionalmente, escriba un asunto personalizado. Cuando una tarjeta entra al paso, la persona recibe ese correo automáticamente. (Si la persona no tiene una dirección de correo registrada, el paso simplemente omite esta acción). Los [campos de combinación](../settings/email-templates.md#merge-fields) de la plantilla, como `{{firstName}}`, se completan con los datos de la propia persona.

Cuando el correo se envía, el historial de la tarjeta registra **Correo enviado**. Si no se puede enviar (por ejemplo, porque el correo de su iglesia todavía no está aprobado o se alcanzó el límite diario), no se agrega ninguna entrada de "Correo enviado".

:::info
Los correos de los flujos de trabajo solo se envían después de que su iglesia haya sido aprobada para enviar correo de grupo, y cuentan para el límite diario de correos de su iglesia. Consulte [Activar el correo de grupo para su iglesia](../groups/group-members.md#turning-on-group-email-for-your-church). La acción **Enviar correo** le advierte en el editor de pasos cuando estos correos no se enviarán: *"El correo de su iglesia aún no ha sido aprobado..."* si la aprobación sigue pendiente, o *"El correo de su iglesia está en pausa..."* si mensajes recientes rebotaron o fueron reportados como spam.
:::

### Registrar asistencia

Elija **Registrar asistencia** y haga clic en **Elegir grupo** para seleccionar el grupo cuya asistencia debe registrarse. Cuando se ejecuta la acción, la persona se marca como presente en el horario de servicio en curso de ese grupo, igual que si hubiera registrado su entrada. Es útil con un disparador que agrega a las personas al flujo conforme llegan, para que se cuenten sin un registro de entrada aparte.

- La asistencia se mide en el momento en que la tarjeta fue **creada**, así que una **Espera** anterior dentro del flujo no la hará pasar del servicio.
- Solo cuentan los horarios de servicio con día y hora de inicio. Si ninguno de los horarios de servicio del grupo está en curso en ese momento, no se registra nada y el historial de la tarjeta indica **No hay un servicio programado en curso; asistencia no registrada**.
- Cuando se registra la asistencia, el historial de la tarjeta muestra **Asistencia registrada** seguido del nombre del grupo. Ejecutar la acción de nuevo para el mismo servicio no cuenta dos veces a la persona.

### Notificar a una persona

Elija **Notificar a persona**, haga clic en **Elegir persona** y, opcionalmente, escriba un **Mensaje**. Cuando una tarjeta entra al paso, esa persona recibe un correo y una notificación de B1 con el nombre de la persona de la tarjeta, los nombres del flujo y del paso, su mensaje y un enlace para abrir la tarjeta. Úselo para avisar a un miembro del personal o a un líder de ministerio, por ejemplo: *"Avisar al pastor cuando alguien llegue al paso de Entrevista de membresía"*. El historial de la tarjeta registra **Notificado** seguido del nombre de la persona.

### Enviar un mensaje de texto {#sending-a-text}

Elija **Enviar texto** y escriba el **Mensaje de texto** (de hasta 1,600 caracteres). Cuando una tarjeta entra al paso, la persona recibe ese texto en su teléfono celular. Para personalizar el mensaje, haga clic en una etiqueta debajo del cuadro del mensaje (**Nombre**, **Apellido**, **Nombre para mostrar** o **Nombre de la iglesia**) para insertar `{{firstName}}`, `{{lastName}}`, `{{displayName}}` o `{{churchName}}` en la posición del cursor. Cada uno se completa con los datos de la persona cuando se envía el texto.

- Si la persona no tiene un celular registrado, no se envía ningún texto y el historial de la tarjeta registra **Texto omitido: sin celular**.
- Si la persona se dio de baja, no se envía ningún texto y el historial de la tarjeta registra **Texto omitido: dado de baja**.
- Cuando el texto se envía, el historial de la tarjeta registra **Texto enviado**. Si el envío falla (por ejemplo, porque no hay un proveedor de mensajes de texto conectado o su iglesia se quedó sin créditos de mensajes), el fallo se registra en el historial de la tarjeta y las demás acciones del paso se siguen ejecutando.

:::warning
Los textos se envían a través del [proveedor de mensajes de texto](../settings/church-settings.md#texting) propio de su iglesia. Si no hay ningún proveedor conectado, el editor de acciones muestra la advertencia *"No hay un proveedor de mensajes de texto configurado"* y los textos no se enviarán.
:::

### Esperar unos días (secuencias de goteo)

La acción **Esperar** mantiene una tarjeta durante el número de días que configure. Mientras espera, la tarjeta aparece como **Pospuesta**. B1 revisa las esperas terminadas cada 30 minutos, así que una tarjeta retoma su curso en menos de media hora después de terminar la espera. Cuando la espera termina:

1. Se ejecutan las **acciones restantes del mismo paso**, así puede crear un goteo como **Enviar correo → Esperar 3 días → Enviar correo de recordatorio**.
2. Después, si el paso tiene una ruta automática, la tarjeta avanza; de lo contrario, se queda en el paso para que una persona la atienda.

:::tip
Una **Espera** al inicio mismo de un paso es una forma sencilla de "retener" una tarjeta antes de que llegue a un voluntario, por ejemplo: *Esperar 7 días y luego un coach se comunica*.
:::

## Agregar personas como tarjetas

Hay varias formas de poner personas en un tablero:

- **Desde el tablero**: haga clic en **Agregar tarjeta** en la parte inferior de una columna de paso y elija una persona. También puede elegir un grupo, y cada miembro de ese grupo se agrega como tarjeta.
- **Desde el registro de una persona**: use **Agregar al flujo de trabajo** en la página de una persona para colocarla en un flujo.
- **Desde la búsqueda de personas**: seleccione varias personas y use la acción masiva **Agregar al flujo de trabajo** para agregarlas todas a la vez.
- **Automáticamente con un disparador**: agregue personas cuando algo sucede, como el envío de un formulario o una primera ofrenda (consulte [Disparadores](#triggers) más abajo).

Agregar a alguien a mano, o con una acción de paso **Agregar al flujo de trabajo**, nunca le da una segunda tarjeta abierta en el mismo flujo. Si ya tiene una tarjeta abierta, se omite (en una adición masiva, solo las personas sin tarjeta reciben una nueva). Una vez cerrada su tarjeta, puede volver a agregarla. Los disparadores siguen en cambio su propia configuración de **Solo una vez por persona**.

## Trabajar en el tablero {#working-the-board}

Abra un flujo para ver su tablero. Cada tarjeta muestra el nombre de la persona, a quién está asignada y una etiqueta de vencimiento o estado (**Vencida** o **Pospuesta**). Una columna de paso también muestra pequeñas insignias de las acciones automatizadas que ejecuta y anotaciones de su ruteo, lo que le da un mapa de un vistazo de cómo fluyen las tarjetas.

- **Mover una tarjeta**: arrastre una tarjeta de una columna a la siguiente conforme avance la persona.
- **Abrir una tarjeta**: haga doble clic en una tarjeta (o haga clic en ella) para abrir su panel de detalle, donde puede cambiar el paso, reasignarla, agregar notas y revisar lo que ya ocurrió.

Desde el panel de la tarjeta puede:

- **Asignar** la tarjeta a otra persona o grupo.
- **Posponer** la tarjeta 1 día, 3 días o 1 semana para ocultar temporalmente su fecha de vencimiento.
- **Devolver** al paso anterior o **Saltar** al paso siguiente.
- **Fijar la asignación**: mantener al mismo responsable en la tarjeta incluso mientras pasa entre pasos. Por defecto, al mover una tarjeta a un paso nuevo se reasigna al responsable predeterminado de ese paso; fijarla mantiene a la persona actual como responsable durante todo el proceso.
- **Completar** la tarjeta para terminarla, o elegir un botón de **Resultado** si el paso tiene resultados configurados (consulte [Ruteo](#routing-cards-with-outcomes-and-conditions)).
- **Quitar tarjeta**: saque una tarjeta del tablero sin terminarla, por ejemplo cuando alguien se agregó por error. Después de confirmar, la tarjeta se cierra y se quita de la lista de todos. No se ejecutan resultados, rutas ni acciones de paso, y su historial se conserva con una entrada de **Quitada**. En el caso de una tarjeta de [confirmación de asignación de servicio](#serving-assignment-confirmations), quitarla cierra la solicitud de la misma forma.
- **Agregar notas** y revisar su **Actividad**: un registro de las acciones automatizadas que se han ejecutado (correos enviados, esperas, etc.), cada una con la fecha y hora en que ocurrió.

En una tarjeta de una persona, el panel también muestra el celular y el correo electrónico de esa persona como enlaces en los que puede hacer clic para llamarla o escribirle, además de un enlace a **Ver perfil** si tiene permiso para ver personas. La persona a la que está asignada una tarjeta ve el teléfono y el correo aunque no tenga acceso a Personas.

Las notas se guardan con la tarjeta. Cualquiera que pueda abrir la tarjeta, incluida la persona o el grupo al que está asignada, puede leer las notas y agregar las suyas. Quienes no pueden abrir la tarjeta no pueden ver sus notas.

### Acciones masivas

Seleccione las casillas de varias tarjetas para actuar sobre ellas en conjunto. Para elegir todas las tarjetas de un paso a la vez, marque la casilla **Seleccionar todo** en el encabezado de la columna de ese paso; vuelva a marcarla para desmarcarlas. Aparece una barra de herramientas que le permite **Completar**, **Posponer**, **Asignar** (reasignar) o **Mover a…** otro paso para todas las tarjetas seleccionadas a la vez.

## Ruteo de tarjetas con resultados y condiciones {#routing-cards-with-outcomes-and-conditions}

El ruteo controla a dónde va una tarjeta cuando sale de un paso. Abra el editor de un paso para configurar dos tipos de ruteo.

### Botones de resultado

Los resultados son botones que aparecen en el panel de la tarjeta cuando se completa una tarjeta en ese paso. En lugar de un único botón **Completar**, puede ofrecer opciones como "Se unió a un grupo" o "No interesado". Cada resultado puede:

- Enviar la tarjeta a **otro paso** de este flujo,
- **Pasar la tarjeta** a un flujo de trabajo diferente por completo, o
- **Cerrar** la tarjeta.

Así, una sola decisión puede llevar a la persona por distintos caminos.

### Ruteo automático (condicional)

Las rutas automáticas mueven una tarjeta hacia adelante **en el momento en que entra a un paso** (y después de que terminan sus acciones automatizadas), sin que nadie haga clic, si la persona cumple un conjunto de condiciones. Agregue una ruta, elija el paso de destino y defina una o más **condiciones** (por ejemplo, el campus, la edad o el estado de membresía de la persona). Los campos de texto pueden coincidir exactamente o con **contiene**, **empieza con** o **termina con**. Una ruta sin condiciones coincide con todas las personas.

Las condiciones de fecha (Fecha de hoy, Fecha de nacimiento o Aniversario) pueden comparar la fecha completa o solo una parte: el día de la semana, el **Día del mes**, el **Mes** o los años transcurridos. Para la Fecha de nacimiento o el Aniversario de una persona, **Día del mes** ofrece una opción relativa de **Hoy**, así que una condición como *Fecha de nacimiento · Día del mes = Hoy* coincide con las personas cuyo cumpleaños cae en el día del mes de hoy. **Mes** ofrece **Mes anterior**, **Mes actual** y **Mes siguiente**. Los valores relativos como estos se calculan con la zona horaria de su iglesia, así que coinciden con el día del calendario de su iglesia y no con el del servidor.

El grupo de condiciones de **Ofrendas** incluye **Dador regular inactivo**, que encuentra a las personas que solían dar con regularidad y luego dejaron de hacerlo. Configure tres números: *Dio en al menos* **3** *de las últimas* **12** *semanas, y nada en las últimas* **3** *semanas* (esos son los valores predeterminados). Las semanas se cuentan hacia atrás desde hoy en la zona horaria de su iglesia, y una ofrenda reembolsada no cuenta. Es más útil con un [disparador de programación](#schedule-triggers); por ejemplo, una regla semanal que agregue a los dadores inactivos a un tablero de seguimiento pastoral. La condición solo revisa las fechas de las ofrendas, nunca los montos, y las tarjetas y alertas nunca muestran montos. Como revela quién dejó de dar, solo las personas que pueden ver donaciones ven esta opción y pueden agregarla, cambiarla o quitarla.

Si las condiciones de una ruta no se pueden verificar por algún motivo, esa ruta se considera que no coincide. La tarjeta se queda en el paso (o sigue otra ruta que sí coincida) en lugar de quedarse atascada.

:::info
En el tablero, cada columna de paso muestra pequeñas anotaciones que describen su ruteo; por ejemplo, la etiqueta de un resultado o "si coincide" seguido de una flecha hacia el paso o flujo de destino.
:::

## Pasos totalmente automatizados {#fully-automated-steps}

Puede hacer que un paso se ejecute por completo por sí solo, sin que nadie lo atienda. Dé al paso sus **acciones automatizadas** y agregue una **ruta automática** (sin condiciones) que apunte al siguiente paso. Cuando una tarjeta entra, las acciones se ejecutan y después la ruta la avanza de inmediato: la tarjeta pasa directamente.

:::tip
Combínelo con **Esperar**: *Enviar correo de bienvenida → Esperar 3 días → avanzar automáticamente al paso "Llamada personal"*. El correo y el momento se manejan por usted, y un voluntario solo ve la tarjeta cuando llega el momento del contacto humano.
:::

## Disparadores {#triggers}

Los disparadores agregan personas a un flujo de trabajo automáticamente cuando sucede algo, así que nunca tiene que agregar tarjetas a mano. En un tablero de flujo, haga clic en la pestaña **Disparadores** y luego en **Agregar disparador**. Hay dos tipos:

### Disparadores por evento

Se activan en cuanto cambia un registro en B1. Elija el evento y, opcionalmente, agregue **condiciones** para que solo se agreguen las personas que coincidan:

- **Persona · Creada / Actualizada**: por ejemplo, agregar a cualquiera cuyo estado cambie a *Visitante* o *Invitado* (el estado que se da a quienes se registran por su cuenta).
- **Donación · Creada**: por ejemplo, agregar una ofrenda de primera vez o una ofrenda grande a un flujo de agradecimiento (coincidiendo por monto, fondo o método).
- **Grupo · Miembro se unió** / **Grupo · Creado**.
- **Formulario · Enviado**: agregar a cualquiera que envíe un formulario elegido (ideal para una tarjeta de "Soy nuevo" o "Conectar").

### Disparadores programados {#schedule-triggers}

Se ejecutan de forma recurrente (diaria, semanal, mensual o anualmente) contra un conjunto de condiciones. Úselos para comunicación basada en el tiempo, como *todas las personas que cumplen años hoy* (Fecha de nacimiento · Día del mes = **Hoy**, con el mes coincidiendo con **Mes actual**) o un registro *mensual*. Incluso sin **Solo una vez por persona**, un disparador programado no volverá a agregar a la misma persona dentro de un mismo periodo de repetición (un día, una semana, un mes o un año, según la frecuencia con que se ejecute).

Para cualquier disparador también puede configurar:

- El **Paso inicial** en que aterriza la nueva tarjeta (por defecto, el primer paso).
- **Solo una vez por persona**: para que el disparador no agregue dos veces a la misma persona al flujo. Con esta opción activada, se omite a cualquiera que ya tenga una tarjeta en este flujo.
  - **Volver a agregar después de cerrar su tarjeta**: aparece cuando **Solo una vez por persona** está activada. Márquela para que el disparador vuelva a agregar a alguien cuando su tarjeta anterior en este flujo se cierre. Una persona nunca tiene dos tarjetas abiertas en el flujo al mismo tiempo. Use esto para cosas que pueden ocurrir más de una vez, como un invitado que regresa o un proceso anual.
- **Activo**: active o desactive el disparador sin borrarlo.

:::tip
Combine un disparador de **Formulario · Enviado** con la plantilla **Seguimiento a nuevo visitante** para convertir su formulario de "Tarjeta de conexión" o "Soy nuevo" en un flujo de seguimiento automático.
:::

## Confirmaciones de asignación de servicio {#serving-assignment-confirmations}

Un tipo especial de flujo de trabajo puede dar seguimiento a las [solicitudes de servicio](./plans.md#assigning-team-members) hasta que cada voluntario acepte o rechace. En lugar de personas, cada tarjeta de este tablero registra **una asignación**: una persona en un puesto de un plan. Dos roles o dos servicios para la misma persona generan tarjetas separadas. Es opcional: no cambia nada para un plan hasta que seleccione un flujo de confirmación en su configuración.

### Cómo configurarlo

1. En la página de Flujos de trabajo, haga clic en **Agregar flujo de trabajo** y elija la plantilla **Confirmación de asignación de servicio**. (O bien, empiece con un **Flujo en blanco** y establezca su **Propósito del flujo** en **Confirmación de asignación de servicio**). Crear desde la plantilla requiere permiso para enviar mensajes de texto, ya que incluye un paso de texto.
2. Revise los pasos. La plantilla empieza con:
   - **Solicitar y esperar respuesta**: envía la solicitud de servicio por correo y por texto, espera 2 días, envía un correo de recordatorio, espera 1 día más y luego avanza la tarjeta automáticamente.
   - **Llamar al voluntario por la solicitud sin respuesta**: un paso para que una persona llame al voluntario, con vencimiento en 1 día. Establezca un **Responsable predeterminado** en este paso. Si no tiene ninguno, la tarjeta va al líder del ministerio, o al equipo del ministerio si no hay líder.
3. Edite las esperas, los mensajes y los pasos según las necesidades de su iglesia.
4. Abra la [configuración de un plan](./plans.md#plan-settings) y elija este flujo en **Flujo de confirmación**.

Estos flujos usan una acción **Enviar solicitud de servicio** en lugar de **Enviar correo** y **Enviar texto**. Elija **Correo electrónico** o **Mensaje de texto** y, opcionalmente, escriba un **Mensaje de solicitud**. La solicitud siempre incluye el puesto, el plan, la fecha del servicio y un enlace para responder; puede usar `{{planName}}`, `{{positionName}}` y `{{serviceDate}}` en su mensaje. Deje el mensaje vacío para usar la solicitud predeterminada. Aplican las preferencias de notificación de los voluntarios, su consentimiento para mensajes de texto, su proveedor de mensajes y la aprobación de correo de su iglesia, y cualquier intento omitido o bloqueado se registra en la tarjeta. **Enviar correo**, **Enviar texto** y **Agregar al flujo de trabajo** no están disponibles en estos tableros.

La pestaña **Disparadores** de un flujo de confirmación explica cómo se inician las tarjetas en lugar de ofrecer disparadores, y estos flujos no aparecen en las listas de **Agregar al flujo de trabajo** de las personas.

### Cómo se inician y cierran las tarjetas

- Las tarjetas se inician cuando usted **notifica** a los voluntarios de un plan publicado (consulte [Notificar a los voluntarios](./plan-validation.md#notifying-volunteers)). Cada asignación nueva y sin respuesta obtiene una tarjeta. Guardar, publicar, copiar o completar automáticamente un plan no contacta a nadie por sí solo, y los planes pendientes de confirmar no envían nada.
- Los voluntarios siguen recibiendo la alerta habitual dentro de la aplicación. El seguimiento por correo y texto lo hace el flujo de trabajo.
- Cuando el voluntario **acepta o rechaza**, su tarjeta se cierra automáticamente, junto con cualquier tarea de seguimiento vinculada.
- El panel de la tarjeta muestra el puesto, la fecha del servicio y un enlace al plan. En lugar de **Completar**, el botón dice **Registrar seguimiento realizado**. Al hacer clic, se registra que alguien dio seguimiento, pero la tarjeta sigue abierta y asignada (se muestra como **Esperando respuesta**) hasta que el voluntario responda o venza la fecha límite de respuesta.
- La fecha límite de respuesta es el final del último horario de servicio en el que sirve el equipo del puesto. Si el plan no tiene horarios correspondientes, es el final del día del servicio. Si nadie ha respondido para entonces, la tarjeta se cierra con **Fecha límite de respuesta vencida** y se envía una tarea de **Revisar solicitud de servicio sin respuesta** al responsable actual de la tarjeta o al líder del ministerio para que alguien decida cómo cubrir el lugar. La asignación queda **Sin confirmar**.
- Quitar la asignación, cambiar su persona, puesto o fecha del plan, devolver el plan a pendiente de confirmar, o cambiar el plan a otro flujo de confirmación cierra la tarjeta. Una tarjeta cerrada nunca se reabre con otra **Notificación**; agregue una nueva asignación para enviar una solicitud nueva.

:::info
En las solicitudes enviadas mediante un flujo de confirmación, los [recordatorios para voluntarios](./plans.md#volunteer-reminders) solo se envían a los voluntarios que **aceptaron**, para que quienes esperan responder no reciban recordatorios además de los seguimientos del flujo.
:::

## Mis tarjetas

Los voluntarios y el personal no necesitan revisar todos los tableros para encontrar su trabajo. La lista **Mis tarjetas** de la página **Mi trabajo** muestra cada tarjeta asignada al usuario actual en todos los flujos. Para llegar ahí, haga clic en **Mis tarjetas** en la parte superior de la página de Flujos de trabajo, o abra **Servicio > Mi trabajo** en el menú Jump. Al hacer clic en una tarjeta se abre su panel de detalle directamente en la página Mi trabajo, donde puede trabajar la tarjeta o quitarla sin salir de la página. Si puede ver los flujos, el panel también tiene un enlace de **Abrir tablero del flujo** al tablero al que pertenece la tarjeta.

## Informes

Abra un flujo y haga clic en **Informes** para ver las estadísticas de ese flujo:

- **Vencidas**: el número de tarjetas que pasaron su fecha de vencimiento.
- **Tarjetas por paso**: cuántas tarjetas están actualmente en cada paso, mostradas como gráfico de columnas.
- **Completadas (30 días)**: el rendimiento de los últimos 30 días, mostrado como gráfico de líneas.

Use estos datos para detectar cuellos de botella, por ejemplo, un paso donde se acumulan tarjetas y nunca avanzan.

## Artículos relacionados

- [Tareas](./tasks.md): los pendientes individuales en los que se basan las tarjetas de los flujos
- [Formularios](../forms/index.md): cree los formularios que pueden disparar flujos
- [Grupos](../groups/index.md): los grupos en los que una acción "Agregar al grupo" puede colocar a las personas
- [Planes de servicio](./plans.md): elija un flujo de confirmación para las solicitudes de servicio de un plan
- [Roles y permisos](../settings/roles-permissions.md): controle quién puede ver, editar y administrar flujos
