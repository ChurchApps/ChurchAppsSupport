---
title: "Flujos de trabajo"
---

# Flujos de trabajo

<div class="article-intro">

Los flujos de trabajo mueven a las personas a través de una serie de pasos en un tablero visual. Cada persona se convierte en una tarjeta que viaja de un paso al siguiente, desde el seguimiento de un primer visitante, pasando por un proceso de membresía, hasta un agradecimiento por la primera donación, y cualquier otra cosa donde necesites rastrear a muchas personas a través del mismo conjunto de etapas. Un paso puede pedir a un voluntario que haga algo (hacer una llamada, tener una conversación) **y** ejecutar acciones automatizadas por su cuenta: enviar un correo electrónico o mensaje de texto, esperar unos días, agregar a la persona a un grupo, para que los Flujos de trabajo manejen tanto el seguimiento humano como el trabajo administrativo que lo rodea. Los Flujos de trabajo extienden [Tareas](./tasks.md) en un tablero Kanban de arrastrar y soltar para que nada y nadie caiga por las grietas.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Asegúrate de que las personas que deseas rastrear existan en B1 Admin
- Familiarízate con cómo funcionan [Tareas](./tasks.md), ya que cada tarjeta en el tablero es una tarea
- Para usar la acción **Enviar correo electrónico**, crea primero las plantillas de correo electrónico que deseas enviar (gestionadas en **Mensajería → Gestionar plantillas**)
- Para usar la acción **Enviar texto**, conecta primero un [proveedor de mensajes de texto](../settings/church-settings.md#texting)
- Necesitarás el permiso de Tareas apropiado. Ver, editar tarjetas y administrar flujos de trabajo son niveles de permiso separados (consulta [Roles y permisos](../settings/roles-permissions.md))

</div>

## Ver flujos de trabajo

Abre el [menú Saltar](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda de B1 Admin), expande **Sirviendo**, y haz clic en **Flujos de trabajo**. Verás tus flujos de trabajo listados y agrupados por categoría, con los flujos activos destacados. Haz clic en cualquier flujo de trabajo para abrir su tablero.

## Crear un flujo de trabajo

1. En la página Flujos de trabajo, haz clic en **Agregar flujo de trabajo**.
2. Elige cómo comenzar:
   - **Flujo de trabajo en blanco**: comienza desde cero y construye tus propios pasos.
   - **Desde una plantilla**: comienza con un conjunto de pasos listos que puedes editar. Las plantillas incorporadas incluyen:
     - **Seguimiento de nuevo visitante**: enviar correo de bienvenida → Llamada telefónica personal → Invitar al siguiente paso → Conectado
     - **Clase de membresía**: expresar interés → registrarse para la clase → asistir a la clase → completar membresía
     - **Agradecimiento a primer donante**: enviar nota de agradecimiento → Compartir impacto de donación → Administrado
3. Dale un **Nombre** al flujo de trabajo.
4. Opcionalmente, asigna una **Categoría** para agrupar flujos de trabajo relacionados. Puedes crear una nueva categoría directamente desde el menú desplegable.
5. Dejar el flujo de trabajo **Activo** para que las personas puedan ser agregadas, o configurarlo en **Inactivo** para ocultarlo de las listas de agregar al flujo de trabajo.
6. Haz clic en **Guardar**.

:::tip
Usa el botón **Duplicar** en la lista de Flujos de trabajo para copiar un flujo de trabajo existente (incluyendo sus pasos, acciones automatizadas y enrutamiento) como punto de partida para uno nuevo.
:::

## Construir el tablero con pasos

Cada tablero de flujo de trabajo está hecho de **pasos**, que se muestran como columnas de izquierda a derecha. Abre un flujo de trabajo y usa **Agregar paso** para crear cada etapa de tu proceso.

Cuando agregas o editas un paso, puedes configurar:

- **Nombre del paso**: el encabezado de la columna (por ejemplo, "Llamada de bienvenida" o "Esperando registro").
- **Vence en (días)**: establece automáticamente una fecha de vencimiento cuando una tarjeta entra en este paso. Las tarjetas después de su fecha de vencimiento se marcan como **Vencidas**.
- **Asignado por defecto**: la persona o grupo a la que se asignan automáticamente las nuevas tarjetas en este paso.
- **Acciones automatizadas**: cosas que el sistema hace por su cuenta cuando una tarjeta llega (ver más abajo).
- **Enrutamiento**: a dónde va la tarjeta cuando sale del paso (ver [Enrutamiento](#routing-cards-with-outcomes-and-conditions)).

Arrastra las columnas de paso al orden que coincida con tu proceso. El orden también define la ruta predeterminada que toma una tarjeta cuando no se aplica otro enrutamiento.

:::info
Guarda un nuevo paso primero. Las acciones automatizadas y el enrutamiento se adhieren al paso, por lo que el editor desbloquea esas secciones una vez que el paso existe.
:::

## Acciones automatizadas

Cada paso puede llevar una lista de **acciones automatizadas** que se ejecutan por sí mismas en el momento en que una tarjeta **entra** al paso, antes de que alguien la toque. Así es como un paso solicita a un voluntario *y* se encarga del trabajo rutinario alrededor del seguimiento.

En el editor de pasos, abre **Acciones automatizadas**, haz clic en **Agregar acción**, elige un tipo, completa su configuración, y haz clic en el icono de guardar en esa acción. Agrega todos los que necesites; se ejecutan **de arriba a abajo en orden**.

| Acción | Lo que hace |
|---|---|
| **Enviar correo electrónico** | Envía un correo electrónico por correo a la persona usando una plantilla de correo electrónico que elijas. Puedes anular la línea de asunto. |
| **Enviar texto** | Envía un mensaje de texto a la persona que escribes, a través del [proveedor de mensajes de texto](../settings/church-settings.md#texting) de tu iglesia. |
| **Esperar** | Pausa la tarjeta durante varios días antes de continuar (ver más abajo). |
| **Agregar al grupo** | Agrega a la persona a un [grupo](../groups/index.md) que elijas. |
| **Eliminar del grupo** | Elimina a la persona de un grupo que elijas. |
| **Agregar al flujo de trabajo** | Inicia a la persona en otro flujo de trabajo, útil para pasar entre procesos. |
| **Agregar nota** | Registra una nota en el historial de la tarjeta. |
| **Establecer campo** | Actualiza un campo en el registro de la persona: estado de membresía, estado civil, género, ciudad, estado o código postal. |
| **Webhook** | Envía los detalles de la tarjeta a una dirección web externa (URL) que proporcionas, para conectar con otros sistemas. |
| **Crear tarea** | Crea una [tarea](./tasks.md) con el título y descripción que ingresas, asignada a quien elijas. |

Después de que todas las acciones de un paso terminen, la tarjeta **descansa en ese paso** para que una persona pueda trabajarla, a menos que el paso tenga una ruta automática que la mueva adelante (ver [Pasos completamente automatizados](#fully-automated-steps)).

:::info
Las acciones automatizadas se ejecutan solo cuando una tarjeta llega a través del flujo normal, cuando se agrega por primera vez, cuando un resultado o ruta automática la trae, o después de que espera se termina. **No** se vuelven a ejecutar cuando un miembro del personal arrastra manualmente una tarjeta al paso o la envía de vuelta, por lo que una persona no recibirá el mismo correo electrónico dos veces.
:::

### Enviar correo electrónico

Elige **Enviar correo electrónico**, elige una de tus plantillas de correo electrónico, y opcionalmente escribe un asunto personalizado. Cuando una tarjeta entra en el paso, la persona recibe ese correo electrónico automáticamente. (Si la persona no tiene dirección de correo electrónico en el archivo, el paso simplemente omite esta acción). [Campos de fusión](../settings/email-templates.md#merge-fields) en la plantilla, como `{{firstName}}`, se rellenan con los detalles propios de la persona.

:::info
Los correos electrónicos del flujo de trabajo solo se envían después de que tu iglesia haya sido aprobada para enviar correos electrónicos grupales, y cuentan hacia el límite de correos electrónicos diarios de tu iglesia. Ver [Activación del correo electrónico grupal para tu iglesia](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

### Enviar un texto

Elige **Enviar texto** e ingresa el **Mensaje de texto** (hasta 1,600 caracteres). Cuando una tarjeta entra en el paso, la persona recibe ese texto en su teléfono móvil. Puedes personalizar el mensaje con `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, o `{{churchName}}`, que se rellenan con los detalles de la persona cuando se envía el texto.

- Si la persona no tiene número de teléfono móvil en el archivo, se omite la acción.
- Si la persona ha rechazado, no se envía texto y el historial de la tarjeta registra **Texto omitido: rechazado**.
- Cuando se envía el texto, el historial de la tarjeta registra **Texto enviado**. Si el envío falla, por ejemplo, porque no hay proveedor de mensajes de texto conectado o tu iglesia no tiene créditos de texto, la falla se registra en el historial de la tarjeta y las acciones restantes del paso se ejecutan.

:::warning
Los textos se envían a través del [proveedor de mensajes de texto](../settings/church-settings.md#texting) de tu propia iglesia. Si no hay proveedor conectado, el editor de acciones advierte "No hay proveedor de mensajes de texto configurado" y los textos no se enviarán.
:::

### Esperar unos días (secuencias de goteo)

La acción **Esperar** detiene una tarjeta durante el número de días que estableces. Mientras espera, la tarjeta muestra **Aplazada**. Cuando la espera termina:

1. Cualquier **acción restante en el mismo paso** se ejecuta, para que puedas construir un goteo como **Enviar correo electrónico → Esperar 3 días → Enviar un correo electrónico de recordatorio**.
2. Luego, si el paso tiene una ruta automática, la tarjeta avanza; de lo contrario, descansa en el paso para que una persona la levante.

:::tip
Un **Esperar** al inicio muy de un paso es una forma simple de "retener" una tarjeta antes de que aparezca para un voluntario, por ejemplo, *Espera 7 días, luego un entrenador se comunica*.
:::

## Agregar personas como tarjetas

Hay varias formas de poner personas en un tablero:

- **Desde el tablero**: haz clic en **Agregar tarjeta** en la parte inferior de una columna de paso y elige una persona. También puedes elegir un grupo, y cada miembro de ese grupo se agrega como una tarjeta.
- **Desde el registro de una persona**: usa **Agregar al flujo de trabajo** en la página de una persona para colocarla en un flujo de trabajo.
- **Desde búsqueda de personas**: selecciona múltiples personas y usa la acción grupal **Agregar al flujo de trabajo** para agregarlas todas a la vez.
- **Automáticamente con un disparador**: agrega personas cuando algo sucede, como un envío de formulario o un primer regalo (ver [Disparadores](#triggers) a continuación).

## Trabajar en el tablero

Abre un flujo de trabajo para ver su tablero. Cada tarjeta muestra el nombre de la persona, a quién se le asigna y un chip de fecha de vencimiento o estado (**Vencida** o **Aplazada**). Una columna de paso también muestra pequeños insignias para cualquier acción automatizada que ejecute y anotaciones para su enrutamiento, dándote un mapa a primera vista de cómo fluyen las tarjetas.

- **Mover una tarjeta**: arrastra una tarjeta de una columna a la siguiente a medida que la persona avanza.
- **Abrir una tarjeta**: haz doble clic en una tarjeta (o haz clic en ella) para abrir su panel de detalles, donde puedas cambiar el paso, reasignarlo, agregar notas y revisar lo que ya sucedió.

Desde el panel de tarjeta puedes:

- **Asignar** la tarjeta a una persona o grupo diferente.
- **Aplazar** la tarjeta por 1 día, 3 días o 1 semana para ocultar temporalmente su fecha de vencimiento.
- **Enviar atrás** al paso anterior o **Saltar** al siguiente paso.
- **Asignación de pines**: mantén el mismo propietario en la tarjeta incluso cuando se mueve entre pasos. Por defecto, mover una tarjeta a un nuevo paso la reasigna al asignado por defecto del paso; el fijación mantiene al responsable actual.
- **Completar** la tarjeta para terminarla, o elige un botón **Resultado** si el paso tiene resultados configurados (ver [Enrutamiento](#routing-cards-with-outcomes-and-conditions)).
- **Agregar notas** y revisar el **historial** de la tarjeta, incluyendo un registro de acciones automatizadas que se han ejecutado (correos electrónicos enviados, esperas, etc.).

### Acciones en lote

Selecciona las casillas de verificación en múltiples tarjetas para actuar sobre ellas juntas. Aparece una barra de herramientas que te permite **Completar**, **Aplazar**, **Reasignar**, o **Mover** todas las tarjetas seleccionadas a otro paso a la vez.

## Enrutamiento de tarjetas con resultados y condiciones

El enrutamiento controla a dónde va una tarjeta cuando sale de un paso. Abre el editor de un paso para configurar dos tipos de enrutamiento.

### Botones de resultado

Los resultados son botones que aparecen en el panel de tarjeta cuando completas una tarjeta en ese paso. En lugar de un único botón **Completar**, puedes ofrecer opciones como "Se unió a un grupo" o "No interesado". Cada resultado puede:

- Enviar la tarjeta a **otro paso** en este flujo de trabajo,
- **Pasar la tarjeta** a un flujo de trabajo completamente diferente, o
- **Cerrar** la tarjeta.

Esto permite que una decisión ramifique a la persona por diferentes caminos.

### Enrutamiento automático (condicional)

Las rutas automáticas mueven una tarjeta adelante **en el momento en que entra en un paso** (y después de que terminen sus acciones automatizadas), sin que nadie haga clic, si la persona cumple un conjunto de condiciones. Agrega una ruta, elige el paso de destino, y define una o más **condiciones** (por ejemplo, campus, edad o estado de membresía de una persona). Una ruta sin condiciones coincide con todos.

:::info
En el tablero, cada columna de paso muestra pequeñas anotaciones describiendo su enrutamiento, por ejemplo, una etiqueta de resultado o "si coincide" seguido de una flecha al paso de destino o flujo de trabajo.
:::

## Pasos completamente automatizados

Puedes hacer que un paso se ejecute completamente por su cuenta, sin que nadie lo trabaje. Dale al paso sus **acciones automatizadas** y agrega una **ruta automática** (sin condiciones) apuntando al siguiente paso. Cuando una tarjeta entra, las acciones se ejecutan, y luego la ruta la avanza inmediatamente: la tarjeta pasa directamente.

:::tip
Combina esto con **Esperar**: *enviar correo de bienvenida → Esperar 3 días → avanzar automáticamente al paso "Llamada personal".* El correo y el tiempo se manejan por ti, y un voluntario solo ve la tarjeta cuando es hora del toque humano.
:::

## Disparadores

Los disparadores agregan personas a un flujo de trabajo automáticamente cuando algo sucede, para que nunca tengas que agregar tarjetas manualmente. En el tablero de flujo de trabajo, haz clic en la pestaña **Disparadores**, luego **Agregar disparador**. Hay dos tipos:

### Disparadores de eventos

Se activan en cuanto un registro cambia en B1. Elige el evento, luego opcionalmente agrega **condiciones** para que solo las personas coincidentes se agreguen:

- **Persona · Creada / Actualizada**: por ejemplo, agrega a cualquiera cuyo estado se convierta en *Visitante*.
- **Donación · Creada**: por ejemplo, agrega un primer regalo o un regalo grande a un flujo de trabajo de agradecimiento (coincide en cantidad, fondo o método).
- **Grupo · Miembro se unió** / **Grupo · Creado**.
- **Formulario · Enviado**: agrega a cualquiera que envíe un formulario elegido (excelente para un "Soy nuevo" o tarjeta "Conectar").

### Disparadores de programa

Se ejecutan de forma recurrente (diaria, semanal, mensual o anualmente) en un conjunto de condiciones. Úsalos para alcance basado en el tiempo como *todos cuyo aniversario de membresía es hoy* o un *chequeo mensual*.

Para cualquier disparador también puedes establecer:

- El **paso de entrada** en el que comienza la nueva tarjeta (por defecto es el primer paso).
- **Una vez por persona**: para que la misma persona no sea agregada al flujo de trabajo dos veces por el disparador.
- **Activo**: enciende o apaga el disparador sin eliminarlo.

:::tip
Empareja un disparador **Formulario · Enviado** con la plantilla **Seguimiento de nuevo visitante** para convertir tu formulario "Tarjeta de conexión" o "Soy nuevo" en un pipeline de seguimiento automático.
:::

## Mis tarjetas

Los voluntarios y el personal no necesitan explorar cada tablero para encontrar su trabajo. La página **Mis tarjetas** (vinculada desde la página de Flujos de trabajo) enumera todas las tarjetas asignadas al usuario actual en todos los flujos de trabajo. Hacer clic en una tarjeta abre el tablero al que pertenece.

## Informes

Abre un flujo de trabajo y haz clic en **Informes** para ver análisis de ese flujo de trabajo:

- **Vencida**: el número de tarjetas pasadas su fecha de vencimiento.
- **Tarjetas por paso**: cuántas tarjetas se sientan actualmente en cada paso, mostradas como un gráfico de columnas.
- **Completadas (30 días)**: rendimiento en los últimos 30 días, mostrado como un gráfico de líneas.

Úsalos para detectar cuellos de botella, por ejemplo, un paso donde las tarjetas se acumulan y nunca avanzan.

## Artículos relacionados

- [Tareas](./tasks.md) - los elementos de acción individuales en los que se construyen las tarjetas del flujo de trabajo
- [Formularios](../forms/index.md) - construye los formularios que pueden desencadenar flujos de trabajo
- [Grupos](../groups/index.md) - los grupos a los que una acción "Agregar al grupo" puede colocar personas
- [Roles y permisos](../settings/roles-permissions.md) - controla quién puede ver, editar y administrar flujos de trabajo
