---
title: "Flujos de trabajo"
---

# Flujos de trabajo

<div class="article-intro">

Los flujos de trabajo mueven a las personas a través de una serie de pasos en un tablero visual. Cada persona se convierte en una tarjeta que avanza de un paso al siguiente: desde el seguimiento de un visitante por primera vez, pasando por un proceso de membresía, hasta el agradecimiento a alguien que da por primera vez, y cualquier otra situación en la que necesites seguir a muchas personas por las mismas etapas. Un paso puede pedirle a un voluntario que haga algo (llamar, tener una conversación) **y** ejecutar acciones automatizadas por sí mismo: enviar un correo o un mensaje de texto, esperar unos días, añadir a la persona a un grupo. Así, los flujos de trabajo se encargan tanto del seguimiento humano como de las tareas rutinarias que lo rodean. Los flujos de trabajo amplían las [Tareas](./tasks.md) con un tablero Kanban de arrastrar y soltar para que nada ni nadie se quede sin atender.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Asegúrate de que las personas que quieres seguir existan en B1 Admin
- Familiarízate con cómo funcionan las [Tareas](./tasks.md), ya que cada tarjeta de un tablero es una tarea
- Para usar la acción **Enviar correo**, crea primero las plantillas de correo que quieras enviar (se administran en **Configuración → Plantillas de correo**)
- Para usar la acción **Enviar mensaje de texto**, conecta primero un [proveedor de mensajes de texto](../settings/church-settings.md#texting)
- Necesitarás el permiso de Tareas adecuado. Ver, editar tarjetas y gestionar flujos de trabajo son niveles de permiso separados (consulta [Roles y permisos](../settings/roles-permissions.md))

</div>

## Ver los flujos de trabajo

Abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda de B1 Admin), expande **Servicio** y haz clic en **Flujos de trabajo**. Tus flujos aparecen en una tabla que muestra la **Categoría** y el **Estado** de cada uno (**Activo** o **Inactivo**). Si usas categorías, las pestañas encima de la lista te permiten filtrarla por categoría. Haz clic en cualquier flujo para abrir su tablero.

## Crear un flujo de trabajo

1. En la página de Flujos de trabajo, haz clic en **Añadir flujo de trabajo**.
2. Elige cómo empezar:
   - **Flujo en blanco** -- empieza desde cero y construye tus propios pasos.
   - **Desde una plantilla** -- empieza con un conjunto de pasos ya preparados que puedes editar. Las plantillas integradas incluyen:
     - **Seguimiento de visitantes nuevos** -- Enviar correo de bienvenida → Llamada personal → Invitar al siguiente paso → Conectado
     - **Clase de membresía** -- Expresar interés → Inscribirse en la clase → Asistir a la clase → Completar la membresía
     - **Agradecimiento a quien da por primera vez** -- Enviar nota de agradecimiento → Compartir el impacto de la ofrenda → Administrador(a) fiel
     - **Confirmación de asignación de servicio** -- Solicitar y esperar respuesta → Llamar al voluntario por una solicitud sin respuesta (consulta [Confirmaciones de asignaciones de servicio](#serving-assignment-confirmations))

   Crear los pasos de una plantilla puede tardar un momento. Mientras trabaja, el botón **Añadir flujo de trabajo** dice **Creando...** y no se puede volver a hacer clic, así que no terminarás con un duplicado. Si algo sale mal, la página muestra *"No se pudo crear el flujo de trabajo. Inténtalo de nuevo."*
3. Ponle un **Nombre** al flujo de trabajo.
4. Opcionalmente, asigna una **Categoría** para agrupar flujos relacionados. Puedes crear una categoría nueva desde el menú desplegable.
   Para un flujo en blanco, también eliges su **Propósito del flujo**: **Seguimiento de personas** (el más habitual) o **Confirmación de asignación de servicio**. El propósito no se puede cambiar después de crear el flujo.
5. Deja el flujo **Activo** para que se puedan añadir personas, o cámbialo a **Inactivo** para ocultarlo de las listas de añadir a un flujo.
6. Haz clic en **Guardar**.

:::tip
Usa el botón **Duplicar** en la lista de Flujos de trabajo para copiar un flujo existente, incluidos sus pasos, acciones automatizadas y rutas, como punto de partida para uno nuevo.
:::

## Construir el tablero con pasos

Cada tablero de flujo está formado por **pasos**, que se muestran como columnas de izquierda a derecha. Abre un flujo y usa **Añadir paso** para crear cada etapa de tu proceso.

Al añadir o editar un paso, puedes configurar:

- **Nombre del paso** -- el encabezado de la columna (por ejemplo, "Llamada de bienvenida" o "Esperando inscripción").
- **Vence en (días)** -- establece automáticamente una fecha de vencimiento cuando una tarjeta entra en este paso. Las tarjetas que pasan su fecha de vencimiento se marcan como **Vencida**.
- **Responsable predeterminado** -- la persona o grupo al que se asignan automáticamente las nuevas tarjetas de este paso. Cuando el responsable predeterminado es una persona, recibe una notificación de que se le ha asignado una tarjeta.
- **Acciones automatizadas** -- cosas que el sistema hace por sí mismo cuando llega una tarjeta (ver más abajo).
- **Enrutamiento** -- a dónde va la tarjeta cuando sale del paso (consulta [Enrutamiento](#routing-cards-with-outcomes-and-conditions)).

Arrastra las columnas de los pasos al orden que corresponda a tu proceso. El orden también define la ruta predeterminada que sigue una tarjeta cuando no se aplica ningún otro enrutamiento.

:::info
Guarda primero un paso nuevo. Las acciones automatizadas y el enrutamiento se asocian al paso, así que el editor habilita esas secciones una vez que el paso existe.
:::

## Acciones automatizadas

Cada paso puede tener una lista de **acciones automatizadas** que se ejecutan por sí solas en el momento en que una tarjeta **entra** al paso, antes de que nadie la toque. Así un paso puede tanto indicarle a un voluntario qué hacer como encargarse del trabajo rutinario que rodea el seguimiento.

En el editor del paso, abre **Acciones automatizadas**, haz clic en **Añadir acción**, elige un tipo y completa sus opciones. Añade todas las que necesites; se ejecutan **de arriba abajo, en orden**. Haz clic en **Guardar** en el paso para guardar el paso y todas sus acciones juntas. Eliminar una acción con su icono de papelera surte efecto de inmediato.

| Acción | Qué hace |
|---|---|
| **Enviar correo** | Envía a la persona una plantilla de correo que elijas. Puedes reemplazar el asunto. |
| **Enviar mensaje de texto** | Envía a la persona un mensaje que escribas, a través del [proveedor de mensajes de texto](../settings/church-settings.md#texting) de tu iglesia. |
| **Esperar** | Pausa la tarjeta durante un número de días antes de continuar (ver más abajo). |
| **Añadir a grupo** | Añade a la persona a un [grupo](../groups/index.md) que elijas. |
| **Quitar de grupo** | Quita a la persona de un grupo que elijas. |
| **Registrar asistencia** | Marca a la persona como presente en el horario de servicio en curso de un grupo (ver más abajo). |
| **Añadir a flujo de trabajo** | Inicia a la persona en otro flujo de trabajo, útil para pasar casos de un proceso a otro. |
| **Añadir nota** | Registra una nota en el historial de la tarjeta. |
| **Establecer campo** | Actualiza un campo del registro de la persona: Estado de membresía, Estado civil, Género, Ciudad, Estado o Código postal. |
| **Webhook** | Envía los detalles de la tarjeta a una dirección web externa (URL) que proporciones, para conectar con otros sistemas. |
| **Crear tarea** | Crea una [tarea](./tasks.md) con el título y la descripción que escribas, asignada a quien elijas. |
| **Notificar a persona** | Envía a un miembro del personal o voluntario que elijas un correo y una notificación de B1 sobre la tarjeta (ver más abajo). |

Cuando terminan todas las acciones de un paso, la tarjeta **se queda en ese paso** para que alguien pueda trabajarla, a menos que el paso tenga una ruta automática que la mueva hacia adelante (consulta [Pasos totalmente automatizados](#fully-automated-steps)).

:::info
Las acciones automatizadas solo se ejecutan cuando una tarjeta llega por el flujo normal: cuando se añade por primera vez, cuando un resultado o una ruta automática la trae, o cuando termina una espera. **No** se vuelven a ejecutar cuando un miembro del personal arrastra manualmente una tarjeta al paso o la devuelve, así que nadie recibe el mismo correo dos veces.
:::

### Enviar correo

Elige **Enviar correo**, selecciona una de tus plantillas de correo y, opcionalmente, escribe un asunto personalizado. Cuando una tarjeta entra en el paso, la persona recibe ese correo automáticamente. (Si la persona no tiene una dirección de correo registrada, el paso simplemente omite esta acción). Los [campos de combinación](../settings/email-templates.md#merge-fields) de la plantilla, como `{{firstName}}`, se completan con los datos de la persona.

Cuando el correo sale, el historial de la tarjeta registra **Correo enviado**. Si no se puede enviar (por ejemplo, porque el correo de tu iglesia todavía no ha sido aprobado o se alcanzó el límite diario), no se añade ninguna entrada de "Correo enviado".

:::info
Los correos de los flujos de trabajo solo salen después de que tu iglesia haya sido aprobada para enviar correo de grupo, y cuentan para el límite diario de correos de tu iglesia. Consulta [Activar el correo de grupo para tu iglesia](../groups/group-members.md#turning-on-group-email-for-your-church). La acción **Enviar correo** te advierte en el editor del paso cuando estos correos no se enviarán: *"El correo de tu iglesia aún no ha sido aprobado..."* si la aprobación está pendiente, o *"El correo de tu iglesia está en pausa..."* si mensajes recientes rebotaron o fueron reportados como spam.
:::

### Registrar asistencia

Elige **Registrar asistencia** y haz clic en **Elegir grupo** para seleccionar el grupo cuya asistencia se debe registrar. Cuando se ejecuta la acción, la persona se marca como presente en el horario de servicio en curso de ese grupo, igual que si hubiera hecho el registro de entrada. Es útil con un disparador que añade personas al flujo a medida que llegan, para que se cuenten sin un registro de entrada aparte.

- La asistencia se mide en el momento en que se **creó** la tarjeta, así que una **Espera** anterior en el flujo no la empuja más allá del servicio.
- Solo cuentan los horarios de servicio que tienen día y hora de inicio. Si ninguno de los horarios del grupo está en curso en ese momento, no se registra nada y el historial de la tarjeta anota **No hay servicio programado en curso: asistencia no registrada**.
- Cuando se registra la asistencia, el historial de la tarjeta muestra **Asistencia registrada** seguido del nombre del grupo. Ejecutar la acción de nuevo para el mismo servicio no cuenta a la persona dos veces.

### Notificar a una persona

Elige **Notificar a persona**, haz clic en **Elegir persona** y, opcionalmente, escribe un **Mensaje**. Cuando una tarjeta entra en el paso, esa persona recibe un correo y una notificación de B1 con el nombre de la persona en la tarjeta, los nombres del flujo y del paso, tu mensaje y un enlace para abrir la tarjeta. Úsalo para avisar a un miembro del personal o a un líder de ministerio, por ejemplo: *"Avisar al pastor cuando alguien llegue al paso de Entrevista de membresía."* El historial de la tarjeta registra **Notificado** seguido del nombre de la persona.

### Enviar un mensaje de texto

Elige **Enviar mensaje de texto** y escribe el **Mensaje de texto** (hasta 1,600 caracteres). Cuando una tarjeta entra en el paso, la persona recibe ese mensaje en su teléfono celular. Puedes personalizar el mensaje con `{{firstName}}`, `{{lastName}}`, `{{displayName}}` o `{{churchName}}`, que se reemplazan con los datos de la persona al enviar el texto.

- Si la persona no tiene un celular registrado, no se envía ningún mensaje y el historial de la tarjeta registra **Texto omitido: sin celular**.
- Si la persona se ha dado de baja, no se envía ningún mensaje y el historial de la tarjeta registra **Texto omitido: dado de baja**.
- Cuando el texto sale, el historial de la tarjeta registra **Texto enviado**. Si el envío falla (por ejemplo, porque no hay ningún proveedor de mensajes conectado o tu iglesia se quedó sin créditos de mensajería), el fallo se registra en el historial de la tarjeta y las acciones restantes del paso se siguen ejecutando.

:::warning
Los mensajes se envían a través del [proveedor de mensajes de texto](../settings/church-settings.md#texting) propio de tu iglesia. Si no hay ningún proveedor conectado, el editor de acciones muestra *"No hay ningún proveedor de mensajes configurado"* y los textos no se enviarán.
:::

### Esperar unos días (secuencias de goteo)

La acción **Esperar** retiene una tarjeta durante el número de días que definas. Mientras espera, la tarjeta aparece como **Pospuesta**. B1 revisa las esperas terminadas cada 30 minutos, así que una tarjeta vuelve a activarse en aproximadamente media hora después de que termine su espera. Cuando la espera termina:

1. Se ejecutan las **acciones restantes del mismo paso**, así puedes crear una secuencia de goteo como **Enviar correo → Esperar 3 días → Enviar correo de recordatorio**.
2. Luego, si el paso tiene una ruta automática, la tarjeta avanza; de lo contrario, se queda en el paso para que una persona la atienda.

:::tip
Una **Espera** al principio de un paso es una forma sencilla de "retener" una tarjeta antes de que llegue a un voluntario, por ejemplo: *Esperar 7 días y luego un coach se comunica*.
:::

## Añadir personas como tarjetas

Hay varias formas de poner personas en un tablero:

- **Desde el tablero** -- Haz clic en **Añadir tarjeta** en la parte inferior de la columna de un paso y elige una persona. También puedes elegir un grupo, y cada miembro de ese grupo se añade como tarjeta.
- **Desde el registro de una persona** -- Usa **Añadir a flujo de trabajo** en la página de una persona para incorporarla a un flujo.
- **Desde la búsqueda de personas** -- Selecciona varias personas y usa la acción masiva **Añadir a flujo de trabajo** para añadirlas todas a la vez.
- **Automáticamente con un disparador** -- Añade personas cuando ocurre algo, como el envío de un formulario o una primera ofrenda (consulta [Disparadores](#triggers) más abajo).

## Trabajar el tablero

Abre un flujo para ver su tablero. Cada tarjeta muestra el nombre de la persona, a quién está asignada y una etiqueta de fecha de vencimiento o estado (**Vencida** o **Pospuesta**). La columna de un paso también muestra pequeñas insignias para las acciones automatizadas que ejecuta y anotaciones de su enrutamiento, lo que te da un mapa de un vistazo de cómo fluyen las tarjetas.

- **Mover una tarjeta** -- Arrastra una tarjeta de una columna a la siguiente a medida que la persona avanza.
- **Abrir una tarjeta** -- Haz doble clic en una tarjeta (o haz clic en ella) para abrir su panel de detalles, donde puedes cambiar el paso, reasignarla, añadir notas y revisar lo que ya ha pasado.

Desde el panel de la tarjeta puedes:

- **Asignar** la tarjeta a otra persona o grupo.
- **Posponer** la tarjeta 1 día, 3 días o 1 semana para ocultar temporalmente su fecha de vencimiento.
- **Devolver** al paso anterior o **Omitir** al siguiente paso.
- **Fijar la asignación** -- mantiene al mismo responsable en la tarjeta aunque pase de un paso a otro. Por defecto, al mover una tarjeta a un nuevo paso se reasigna al responsable predeterminado de ese paso; fijarla mantiene a la persona actual como responsable en todo momento.
- **Completar** la tarjeta para terminarla, o elegir un botón de **Resultado** si el paso tiene resultados configurados (consulta [Enrutamiento](#routing-cards-with-outcomes-and-conditions)).
- **Añadir notas** y revisar la **Actividad** de la tarjeta: un registro de las acciones automatizadas que se han ejecutado (correos enviados, esperas, etc.), cada una con la fecha y hora en que ocurrió.

En la tarjeta de una persona, el panel también muestra su teléfono celular y su correo electrónico como enlaces en los que puedes hacer clic para llamar o escribir, además de un enlace **Ver perfil** si tienes permiso para ver personas. La persona a la que está asignada la tarjeta ve el teléfono y el correo incluso sin acceso a Personas.

Las notas se guardan con la tarjeta. Cualquiera que pueda abrir la tarjeta, incluida la persona o el grupo al que está asignada, puede leer las notas y añadir las suyas. Quienes no pueden abrir la tarjeta no pueden ver sus notas.

### Acciones masivas

Selecciona las casillas de varias tarjetas para actuar sobre ellas en conjunto. Para elegir todas las tarjetas de un paso a la vez, marca la casilla **Seleccionar todo** en el encabezado de la columna de ese paso; vuelve a marcarla para desmarcarlas. Aparece una barra de herramientas que te permite **Completar**, **Posponer**, **Asignar** (reasignar) o **Mover a…** otro paso para todas las tarjetas seleccionadas a la vez.

## Enrutar tarjetas con resultados y condiciones

El enrutamiento controla a dónde va una tarjeta cuando sale de un paso. Abre el editor de un paso para configurar dos tipos de enrutamiento.

### Botones de resultado

Los resultados son botones que aparecen en el panel de la tarjeta cuando completas una tarjeta en ese paso. En lugar de un único botón **Completar**, puedes ofrecer opciones como "Se unió a un grupo" o "No interesado". Cada resultado puede:

- Enviar la tarjeta a **otro paso** de este flujo,
- **Traspasar la tarjeta** a un flujo de trabajo diferente por completo, o
- **Cerrar** la tarjeta.

Así, una sola decisión puede llevar a la persona por distintos caminos.

### Enrutamiento automático (condicional)

Las rutas automáticas mueven una tarjeta hacia adelante **en el momento en que entra en un paso** (y después de que terminan sus acciones automatizadas), sin que nadie haga clic, si la persona cumple un conjunto de condiciones. Añade una ruta, elige el paso de destino y define una o más **condiciones** (por ejemplo, el campus, la edad o el estado de membresía de una persona). Los campos de texto se pueden comparar exactamente o con **contiene**, **empieza con** o **termina con**. Una ruta sin condiciones coincide con todos.

Las condiciones de fecha (Fecha de hoy, Fecha de nacimiento o Aniversario) pueden comparar la fecha completa o solo una parte: el día de la semana, el **Día del mes**, el **Mes** o los años transcurridos. Para la Fecha de nacimiento o el Aniversario de una persona, **Día del mes** ofrece una opción relativa de **Hoy**, así que una condición como *Fecha de nacimiento · Día del mes = Hoy* coincide con las personas cuyo cumpleaños cae en el día del mes de hoy. **Mes** ofrece **Mes anterior**, **Mes actual** y **Mes siguiente**. Los valores relativos como estos se calculan según la zona horaria de tu iglesia, así que coinciden con el día del calendario de tu iglesia y no con el del servidor.

Si las condiciones de una ruta no se pueden verificar por algún motivo, esa ruta se considera como no coincidente. La tarjeta se queda en el paso (o sigue otra ruta que sí coincida) en lugar de quedarse atascada.

:::info
En el tablero, cada columna de paso muestra pequeñas anotaciones que describen su enrutamiento, por ejemplo, la etiqueta de un resultado o "si coincide" seguido de una flecha hacia el paso o flujo de destino.
:::

## Pasos totalmente automatizados

Puedes hacer que un paso se ejecute completamente por sí solo, sin que nadie lo trabaje. Dale al paso sus **acciones automatizadas** y añade una **ruta automática** (sin condiciones) que apunte al siguiente paso. Cuando una tarjeta entra, las acciones se ejecutan y luego la ruta la avanza de inmediato: la tarjeta pasa directo.

:::tip
Combínalo con **Esperar**: *Enviar correo de bienvenida → Esperar 3 días → avanzar automáticamente al paso "Llamada personal"*. El correo y el tiempo se gestionan por ti, y un voluntario solo ve la tarjeta cuando llega el momento del contacto humano.
:::

## Disparadores

Los disparadores añaden personas a un flujo automáticamente cuando ocurre algo, así que nunca tienes que añadir tarjetas a mano. En el tablero de un flujo, haz clic en la pestaña **Disparadores** y luego en **Añadir disparador**. Hay dos tipos:

### Disparadores de evento

Se activan en cuanto cambia un registro en B1. Elige el evento y, opcionalmente, añade **condiciones** para que solo se agreguen las personas que coincidan:

- **Persona · Creada / Actualizada** -- por ejemplo, añadir a cualquier persona cuyo estado pase a *Visitante* o *Invitado* (el estado que se asigna a quienes se registran por sí mismas).
- **Ofrenda · Creada** -- por ejemplo, añadir una ofrenda por primera vez o de gran monto a un flujo de agradecimiento (filtra por monto, fondo o método).
- **Grupo · Miembro se unió** / **Grupo · Creado**.
- **Formulario · Enviado** -- añade a cualquier persona que envíe un formulario elegido (ideal para una tarjeta de "Soy nuevo" o "Conectar").

### Disparadores programados

Se ejecutan de forma recurrente -- diaria, semanal, mensual o anualmente -- según un conjunto de condiciones. Úsalos para contactos basados en el tiempo, como *todas las personas cuyo cumpleaños es hoy* (Fecha de nacimiento · Día del mes = **Hoy**, con el mes configurado en **Mes actual**) o un seguimiento *mensual*. Incluso sin **Solo una vez por persona**, un disparador programado no volverá a añadir a la misma persona dentro de un mismo período de repetición (un día, semana, mes o año, según la frecuencia con que se ejecute).

Para cualquier disparador también puedes configurar:

- El **Paso inicial** en el que aterriza la nueva tarjeta (por defecto, el primer paso).
- **Solo una vez por persona** -- para que el disparador no añada dos veces a la misma persona al flujo. Con esta opción activada, se omite a cualquiera que ya tenga una tarjeta en este flujo.
  - **Volver a añadir después de cerrar su tarjeta** -- aparece cuando **Solo una vez por persona** está activado. Márcala para que el disparador vuelva a añadir a alguien una vez cerrada su tarjeta anterior en este flujo. Una persona nunca tendrá dos tarjetas abiertas en el flujo al mismo tiempo. Úsala para cosas que pueden ocurrir más de una vez, como un visitante que regresa o un proceso anual.
- **Activo** -- activa o desactiva el disparador sin eliminarlo.

:::tip
Combina un disparador de **Formulario · Enviado** con la plantilla **Seguimiento de visitantes nuevos** para convertir tu formulario de "Tarjeta de conexión" o "Soy nuevo" en un flujo de seguimiento automático.
:::

## Confirmaciones de asignaciones de servicio

Un tipo especial de flujo puede dar seguimiento a [solicitudes de servicio](./plans.md#assigning-team-members) hasta que cada voluntario acepte o rechace. En lugar de personas, cada tarjeta de este tablero registra **una asignación**: una persona en una posición de un plan. Dos roles o dos servicios para la misma persona tienen tarjetas separadas. Esto es opcional: nada cambia en un plan hasta que selecciones un flujo de confirmación en su configuración.

### Configurarlo

1. En la página de Flujos de trabajo, haz clic en **Añadir flujo de trabajo** y elige la plantilla **Confirmación de asignación de servicio**. (O empieza con un **Flujo en blanco** y configura su **Propósito del flujo** como **Confirmación de asignación de servicio**). Crear desde la plantilla requiere permiso para enviar mensajes de texto, porque incluye un paso de texto.
2. Revisa los pasos. La plantilla empieza con:
   - **Solicitar y esperar respuesta** -- envía la solicitud de servicio por correo y por mensaje de texto, espera 2 días, envía un correo de recordatorio, espera 1 día más y luego avanza la tarjeta automáticamente.
   - **Llamar al voluntario por la solicitud sin respuesta** -- un paso para que una persona llame al voluntario, con vencimiento en 1 día. Configura un **Responsable predeterminado** en este paso. Si no tiene ninguno, la tarjeta va al líder del ministerio o, si no hay uno, al equipo del ministerio.
3. Edita las esperas, los mensajes y los pasos para adaptarlos a tu iglesia.
4. Abre la [configuración del plan](./plans.md#plan-settings) y elige este flujo en **Flujo de confirmación**.

Estos flujos usan una acción **Enviar solicitud de servicio** en lugar de **Enviar correo** y **Enviar mensaje de texto**. Elige **Correo electrónico** o **Mensaje de texto** y, opcionalmente, escribe un **Mensaje de solicitud**. La solicitud siempre incluye el rol, el plan, la fecha del servicio y un enlace para responder; puedes usar `{{planName}}`, `{{positionName}}` y `{{serviceDate}}` en tu mensaje. Deja el mensaje vacío para usar la solicitud predeterminada. Las preferencias de notificación de los voluntarios, su consentimiento para mensajes de texto, tu proveedor de mensajes y la aprobación del correo de tu iglesia se aplican todos, y cualquier intento omitido o bloqueado se registra en la tarjeta. **Enviar correo**, **Enviar mensaje de texto** y **Añadir a flujo de trabajo** no están disponibles en estos tableros.

La pestaña **Disparadores** de un flujo de confirmación explica cómo se inician las tarjetas en lugar de ofrecer disparadores, y estos flujos no aparecen en las listas de **Añadir a flujo de trabajo** de las personas.

### Cómo se inician y cierran las tarjetas

- Las tarjetas se inician cuando **Notificas** a los voluntarios de un plan publicado (consulta [Notificar a los voluntarios](./plan-validation.md#notifying-volunteers)). Cada asignación nueva y sin respuesta recibe una tarjeta. Guardar, publicar, copiar o completar automáticamente un plan no contacta a nadie por sí mismo, y los planes en lápiz no envían nada.
- Los voluntarios siguen recibiendo la alerta habitual dentro de la aplicación. El seguimiento por correo y por mensaje de texto lo envía el flujo de trabajo.
- Cuando el voluntario **acepta o rechaza**, su tarjeta se cierra automáticamente, junto con cualquier tarea de seguimiento vinculada a ella.
- El panel de la tarjeta muestra la posición, la fecha del servicio y un enlace al plan. En lugar de **Completar**, el botón dice **Registrar seguimiento realizado**. Al hacer clic, se registra que alguien hizo el seguimiento, pero la tarjeta permanece abierta y asignada (se muestra como **Esperando respuesta**) hasta que el voluntario responda o venza la fecha límite de respuesta.
- La fecha límite de respuesta es el final del último horario de servicio en el que el equipo de la posición presta servicio. Si el plan no tiene horarios correspondientes, es el final del día del servicio. Si nadie ha respondido para entonces, la tarjeta se cierra con **Fecha límite de respuesta vencida** y se envía una tarea **Revisar solicitud de servicio sin respuesta** al responsable actual de la tarjeta o al líder del ministerio para que alguien decida cómo cubrir el lugar. La asignación sigue **Sin confirmar**.
- Quitar la asignación, cambiar su persona, su posición o la fecha del plan, devolver el plan a en lápiz, o cambiar el plan a otro flujo de confirmación cierra la tarjeta. Una tarjeta cerrada nunca se reabre con otra **Notificación**; añade una nueva asignación para enviar una solicitud nueva.

:::info
En las solicitudes enviadas a través de un flujo de confirmación, los [recordatorios a voluntarios](./plans.md#volunteer-reminders) solo se envían a los voluntarios que han **aceptado**, para que las personas que esperan responder no reciban recordatorios además de los seguimientos del flujo.
:::

## Mis tarjetas

Los voluntarios y el personal no necesitan revisar cada tablero para encontrar su trabajo. La lista **Mis tarjetas** de la página **Mi trabajo** muestra todas las tarjetas asignadas al usuario actual en todos los flujos. Para llegar, haz clic en **Mis tarjetas** en la parte superior de la página de Flujos de trabajo, o abre **Servicio > Mi trabajo** en el menú Jump. Al hacer clic en una tarjeta se abre el tablero al que pertenece.

## Informes

Abre un flujo y haz clic en **Informes** para ver las analíticas de ese flujo:

- **Vencidas** -- la cantidad de tarjetas que pasaron su fecha de vencimiento.
- **Tarjetas por paso** -- cuántas tarjetas hay actualmente en cada paso, mostradas como un gráfico de columnas.
- **Completadas (30 días)** -- el rendimiento de los últimos 30 días, mostrado como un gráfico de líneas.

Úsalos para detectar cuellos de botella, por ejemplo, un paso donde se acumulan tarjetas y nunca avanzan.

## Artículos relacionados

- [Tareas](./tasks.md) -- los elementos de acción individuales en los que se basan las tarjetas de los flujos
- [Formularios](../forms/index.md) -- crea los formularios que pueden activar flujos
- [Grupos](../groups/index.md) -- los grupos en los que una acción "Añadir a grupo" puede colocar personas
- [Planes de servicio](./plans.md) -- elige un flujo de confirmación para las solicitudes de servicio de un plan
- [Roles y permisos](../settings/roles-permissions.md) -- controla quién puede ver, editar y gestionar los flujos
