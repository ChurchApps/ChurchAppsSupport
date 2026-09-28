---
title: "Flujos de trabajo"
---

# Flujos de trabajo

<div class="article-intro">

Los flujos de trabajo mueven personas a través de una serie de pasos en un tablero visual. Cada persona se convierte en una tarjeta que viaja de un paso al siguiente, desde el seguimiento de un visitante por primera vez, pasando por un proceso de membresía, hasta un agradecimiento a un donante por primera vez, y cualquier otra cosa donde necesites rastrear muchas personas a través del mismo conjunto de etapas. Un paso puede pedir a un voluntario que haga algo (hacer una llamada, tener una conversación) **y** ejecutar acciones automatizadas por su cuenta: enviar un correo electrónico, esperar unos días, agregar la persona a un grupo. Los flujos de trabajo manejan tanto el seguimiento humano como el trabajo rutinario alrededor del mismo. Los flujos de trabajo extienden [Tareas](./tasks.md) en un tablero Kanban de arrastrar y soltar para que nada ni nadie caiga por las grietas.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Asegúrate de que las personas que deseas rastrear existan en B1 Admin
- Familiarízate con cómo funcionan las [Tareas](./tasks.md), ya que cada tarjeta en un tablero es una tarea
- Para usar la acción **Enviar correo electrónico**, primero crea las plantillas de correo electrónico que deseas enviar (gestionadas en **Mensajes → Gestionar plantillas**)
- Necesitarás el permiso de Tareas apropiado. Ver, editar tarjetas y gestionar flujos de trabajo son niveles de permiso separados (ver [Roles y permisos](../settings/roles-permissions.md))

</div>

## Visualización de flujos de trabajo

Navega a **Sirviendo** y selecciona **Flujos de trabajo** del menú. Verás tus flujos de trabajo listados y agrupados por categoría, con los flujos de trabajo activos resaltados. Haz clic en cualquier flujo de trabajo para abrir su tablero.

## Creación de un flujo de trabajo

1. En la página de Flujos de trabajo, haz clic en **Agregar flujo de trabajo**.
2. Elige cómo empezar:
   - **Flujo de trabajo en blanco**: comienza desde cero y construye tus propios pasos.
   - **Desde una plantilla**: comienza con un conjunto de pasos ya preparado que puedes editar. Las plantillas integradas incluyen:
     - **Seguimiento de nuevo visitante**: enviar correo de bienvenida → llamada telefónica personal → invitar al siguiente paso → conectado
     - **Clase de membresía**: expresar interés → registrarse para la clase → asistir a la clase → completar membresía
     - **Agradecimiento a donante por primera vez**: enviar nota de agradecimiento → compartir impacto de donación → administrado
3. Dale al flujo de trabajo un **Nombre**.
4. Opcionalmente asigna una **Categoría** para agrupar flujos de trabajo relacionados. Puedes crear una nueva categoría directamente desde la lista desplegable.
5. Deja el flujo de trabajo **Activo** para que las personas puedan agregarse a él, o establécelo en **Inactivo** para ocultarlo de las listas de agregar a flujo de trabajo.
6. Haz clic en **Guardar**.

:::tip
Utiliza el botón **Duplicar** en la lista de Flujos de trabajo para copiar un flujo de trabajo existente (incluyendo sus pasos, acciones automatizadas y enrutamiento) como punto de partida para uno nuevo.
:::

## Construir el tablero con pasos

Cada tablero de flujo de trabajo está compuesto por **pasos**, mostrados como columnas de izquierda a derecha. Abre un flujo de trabajo y utiliza **Agregar paso** para crear cada etapa de tu proceso.

Cuando añadas o edites un paso, puedes configurar:

- **Nombre del paso**: el encabezado de la columna (por ejemplo, "Llamada de bienvenida" o "Esperando registro").
- **Vencimiento en (días)**: establece automáticamente una fecha de vencimiento cuando una tarjeta entra en este paso. Las tarjetas pasadas de su fecha de vencimiento se marcan como **Vencidas**.
- **Asignado por defecto**: la persona o grupo al que se asignan automáticamente las tarjetas nuevas en este paso.
- **Acciones automatizadas**: cosas que el sistema hace por su cuenta cuando una tarjeta llega (ver a continuación).
- **Enrutamiento**: hacia dónde va la tarjeta cuando sale del paso (ver [Enrutamiento](#enrutamiento-de-tarjetas-con-resultados-y-condiciones)).

Arrastra las columnas de pasos en el orden que coincida con tu proceso. El orden también define la ruta predeterminada que toma una tarjeta cuando no se aplica otro enrutamiento.

:::info
Guarda un nuevo paso primero. Las acciones automatizadas y el enrutamiento se adjuntan al paso, por lo que el editor desbloquea esas secciones una vez que existe el paso.
:::

## Acciones automatizadas

Cada paso puede llevar una lista de **acciones automatizadas** que se ejecutan por sí solas en el momento en que una tarjeta **entra** en el paso, antes de que alguien la toque. Así es cómo un paso tanto solicita a un voluntario *como* se ocupa del trabajo rutinario alrededor del seguimiento.

En el editor de pasos, abre **Acciones automatizadas**, haz clic en **Agregar acción**, elige un tipo, completa su configuración y haz clic en el icono de guardar en esa acción. Agrega tantos como necesites; se ejecutan **de arriba a abajo en orden**.

| Acción | Lo que hace |
|---|---|
| **Enviar correo electrónico** | Envía al correo electrónico de la persona una plantilla de correo electrónico que elijas. Puedes anular la línea de asunto. |
| **Esperar** | Pausa la tarjeta durante varios días antes de continuar (ver a continuación). |
| **Agregar a grupo** | Añade la persona a un [grupo](../groups/index.md) que elijas. |
| **Agregar a flujo de trabajo** | Inicia a la persona en otro flujo de trabajo (útil para transferir entre procesos). |
| **Agregar nota** | Registra una nota en el historial de la tarjeta. |
| **Establecer campo** | Actualiza un campo en el registro de la persona: Estado de membresía, Estado civil, Género, Ciudad, Estado o Código postal. |
| **Webhook** | Envía los detalles de la tarjeta a una dirección web externa (URL) que proporcionas, para conectar con otros sistemas. |

Después de que todas las acciones de un paso terminen, la tarjeta **descansa en ese paso** para que una persona pueda trabajarla, a menos que el paso tenga una ruta automática que la mueva adelante (ver [Pasos totalmente automatizados](#pasos-totalmente-automatizados)).

:::info
Las acciones automatizadas se ejecutan solo cuando una tarjeta llega a través del flujo normal: cuando se agrega por primera vez, cuando un resultado o una ruta automática la trae, o después de que termina una espera. **No** se vuelven a ejecutar cuando un miembro del personal arrastra manualmente una tarjeta al paso o la devuelve, para que una persona no reciba el mismo correo electrónico dos veces.
:::

### Envío de correo electrónico

Elige **Enviar correo electrónico**, selecciona una de tus plantillas de correo electrónico y opcionalmente escribe un asunto personalizado. Cuando una tarjeta entra en el paso, la persona recibe ese correo electrónico automáticamente. (Si la persona no tiene una dirección de correo electrónico registrada, el paso simplemente omite esta acción.)

:::info
Los correos electrónicos de flujo de trabajo solo se envían después de que tu iglesia haya sido aprobada para enviar correo electrónico grupal, y cuentan hacia el límite diario de correo electrónico de tu iglesia. Ver [Activar correo electrónico grupal para tu iglesia](../groups/group-members.md#activar-correo-de-grupo-para-tu-iglesia).
:::

### Esperar unos días (secuencias de goteo)

La acción **Esperar** mantiene una tarjeta durante el número de días que estableces. Mientras espera, la tarjeta se muestra como **Aplazada**. Cuando termine la espera:

1. Cualquier **acción restante en el mismo paso** se ejecuta (para que puedas construir un goteo como **Enviar correo electrónico → Esperar 3 días → Enviar correo de recordatorio**).
2. Luego, si el paso tiene una ruta automática, la tarjeta avanza; de lo contrario, descansa en el paso para que una persona la levante.

:::tip
Una **espera** al inicio de un paso es una forma simple de "retener" una tarjeta antes de que aparezca a un voluntario: por ejemplo, *Esperar 7 días, luego un entrenador se comunica*.
:::

## Agregar personas como tarjetas

Hay varias formas de poner personas en un tablero:

- **Desde el tablero**: haz clic en **Agregar tarjeta** en la parte inferior de una columna de paso y selecciona una persona. También puedes seleccionar un grupo, y cada miembro de ese grupo se agrega como una tarjeta.
- **Desde el registro de una persona**: utiliza **Agregar a flujo de trabajo** en la página de una persona para colocarla en un flujo de trabajo.
- **Desde la búsqueda de personas**: selecciona múltiples personas y usa la acción **Agregar a flujo de trabajo** en lote para agregarlas todas a la vez.
- **Automáticamente con un disparador**: agrega personas cuando suceda algo, como un envío de formulario o un primer regalo (ver [Disparadores](#disparadores) a continuación).

## Trabajar el tablero

Abre un flujo de trabajo para ver su tablero. Cada tarjeta muestra el nombre de la persona, a quién está asignada, y un chip de fecha de vencimiento o estado (**Vencida** o **Aplazada**). Una columna de paso también muestra pequeñas insignias para cualquier acción automatizada que ejecute y anotaciones para su enrutamiento, dándote un mapa de vistazo de cómo fluyen las tarjetas.

- **Mover una tarjeta**: arrastra una tarjeta de una columna a la siguiente a medida que la persona progresa.
- **Abrir una tarjeta**: haz doble clic en una tarjeta (o haz clic en ella) para abrir su gaveta de detalles, donde puedes cambiar el paso, reasignarla, agregar notas y revisar qué ya ha sucedido.

Desde la gaveta de tarjeta puedes:

- **Asignar** la tarjeta a una persona o grupo diferente.
- **Aplazar** la tarjeta por 1 día, 3 días o 1 semana para ocultar temporalmente su fecha de vencimiento.
- **Enviar de vuelta** al paso anterior o **Saltar** al siguiente paso.
- **Anclar asignación**: mantener al mismo propietario en la tarjeta incluso cuando se mueve entre pasos. Por defecto, mover una tarjeta a un nuevo paso la reasigna al asignado por defecto de ese paso; anclarla mantiene a la persona actual responsable en todo momento.
- **Completar** la tarjeta para terminarla, o elige un botón de **Resultado** si el paso tiene resultados configurados (ver [Enrutamiento](#enrutamiento-de-tarjetas-con-resultados-y-condiciones)).
- **Agregar notas** y revisar el **historial** de la tarjeta (incluyendo un registro de acciones automatizadas que se han ejecutado: correos electrónicos enviados, esperas, etc.).

### Acciones en lote

Selecciona las casillas de verificación en múltiples tarjetas para actuar sobre ellas juntas. Aparece una barra de herramientas que te permite **Completar**, **Aplazar**, **Reasignar** o **Mover** todas las tarjetas seleccionadas a otro paso a la vez.

## Enrutamiento de tarjetas con resultados y condiciones

El enrutamiento controla hacia dónde va una tarjeta cuando sale de un paso. Abre el editor de un paso para configurar dos tipos de enrutamiento.

### Botones de resultado

Los resultados son botones que se muestran en la gaveta de tarjeta cuando estás completando una tarjeta en ese paso. En lugar de un solo botón **Completar**, puedes ofrecer opciones como "Se unió a un grupo" o "No interesado". Cada resultado puede:

- Enviar la tarjeta a **otro paso** en este flujo de trabajo,
- **Transferir la tarjeta** a un flujo de trabajo completamente diferente, o
- **Cerrar** la tarjeta.

Esto permite que una decisión bifurque a la persona por diferentes caminos.

### Enrutamiento automático (condicional)

Las rutas automáticas mueven una tarjeta adelante **el momento en que entra en un paso** (y después de que sus acciones automatizadas terminen), sin que nadie haga clic, si la persona coincide con un conjunto de condiciones. Agrega una ruta, elige el paso de destino y define una o más **condiciones** (por ejemplo, el campus, edad o estado de membresía de una persona). Una ruta sin condiciones coincide con todos.

:::info
En el tablero, cada columna de paso muestra pequeñas anotaciones describiendo su enrutamiento: por ejemplo, una etiqueta de resultado o "si coincide" seguida de una flecha hacia el paso o flujo de trabajo de destino.
:::

## Pasos totalmente automatizados

Puedes hacer que un paso se ejecute completamente por sí solo, sin que nadie lo trabaje. Dale al paso sus **acciones automatizadas** y agrega una **ruta automática** (sin condiciones) apuntando al siguiente paso. Cuando una tarjeta entra, se ejecutan las acciones, y luego la ruta la avanza inmediatamente (la tarjeta pasa directamente a través).

:::tip
Combina esto con **Esperar**: *Enviar correo de bienvenida → Esperar 3 días → avanzar automáticamente al paso "Llamada personal".* El correo electrónico y el tiempo se manejan por ti, y un voluntario solo ve la tarjeta cuando es el momento para el toque humano.
:::

## Disparadores

Los disparadores agregan personas a un flujo de trabajo automáticamente cuando sucede algo, para que nunca tengas que agregar tarjetas manualmente. En un tablero de flujo de trabajo, haz clic en la pestaña **Disparadores**, luego **Agregar disparador**. Hay dos tipos:

### Disparadores de eventos

Se activan tan pronto como cambia un registro en B1. Elige el evento, luego opcionalmente agrega **condiciones** para que solo las personas que coincidan se agreguen:

- **Persona · Creada / Actualizada**: p. ej. agregar a cualquiera cuyo estado se convierte en *Visitante*.
- **Donación · Creada**: p. ej. agregar un regalo de la primera vez o grande a un flujo de trabajo de agradecimiento (coincidir por cantidad, fondo o método).
- **Grupo · Miembro se unió** / **Grupo · Creado**.
- **Formulario · Enviado**: agregar a cualquiera que envíe un formulario elegido (excelente para una tarjeta "Soy nuevo" o "Conectar").

### Disparadores de programación

Se ejecutan de forma recurrente: diaria, semanal, mensual o anual, contra un conjunto de condiciones. Úsalos para alcance basado en tiempo como *todos cuyo aniversario de membresía es hoy* o una *verificación mensual*.

Para cualquier disparador también puedes configurar:

- El **paso de entrada** en el que comienza la tarjeta nueva (por defecto es el primer paso).
- **Una vez por persona**: para que la misma persona no sea agregada al flujo de trabajo dos veces por el disparador.
- **Activo**: activa o desactiva el disparador sin eliminarlo.

:::tip
Empareja un disparador **Formulario · Enviado** con la plantilla **Seguimiento de nuevo visitante** para convertir tu formulario "Tarjeta de conexión" o "Soy nuevo" en una tubería de seguimiento automático.
:::

## Mis tarjetas

Los voluntarios y personal no necesitan buscar en cada tablero para encontrar su trabajo. La página **Mis tarjetas** (enlazada desde la página de Flujos de trabajo) lista cada tarjeta asignada al usuario actual en todos los flujos de trabajo. Hacer clic en una tarjeta abre el tablero al que pertenece.

## Informes

Abre un flujo de trabajo y haz clic en **Informes** para ver análisis de ese flujo de trabajo:

- **Vencidas**: el número de tarjetas pasadas de su fecha de vencimiento.
- **Tarjetas por paso**: cuántas tarjetas actualmente se encuentran en cada paso, mostradas como un gráfico de columnas.
- **Completadas (30 días)**: rendimiento en los últimos 30 días, mostrados como un gráfico de líneas.

Úsalos para identificar cuellos de botella (por ejemplo, un paso donde las tarjetas se acumulan y nunca avanzan).

## Artículos relacionados

- [Tareas](./tasks.md): los elementos de acción individuales en los que se construyen las tarjetas de flujo de trabajo
- [Formularios](../forms/index.md): construye los formularios que pueden desencadenar flujos de trabajo
- [Grupos](../groups/index.md): los grupos en los que una acción "Agregar a grupo" puede colocar personas
- [Roles y permisos](../settings/roles-permissions.md): controla quién puede ver, editar y gestionar flujos de trabajo
