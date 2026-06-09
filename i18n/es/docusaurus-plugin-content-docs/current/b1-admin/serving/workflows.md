---
title: "Flujos de Trabajo"
---

# Flujos de Trabajo

<div class="article-intro">

Los flujos de trabajo mueven personas a través de una serie de pasos en un tablero visual. Cada persona se convierte en una tarjeta que viaja de un paso al siguiente -- desde un seguimiento de primer visitante, a un proceso de membresía, a un agradecimiento de primer donante, y cualquier otra cosa donde necesites registrar a muchas personas a través del mismo conjunto de etapas. Un paso puede pedirle a un voluntario que haga algo (hacer una llamada, tener una conversación) **y** ejecutar acciones automatizadas por su cuenta -- enviar un correo, esperar unos días, agregar a la persona a un grupo -- para que los Flujos de Trabajo manejen tanto el seguimiento humano como el trabajo rutinario alrededor de él. Los flujos de trabajo extienden [Tareas](./tasks.md) en un tablero Kanban que se puede arrastrar para que nada y nadie se quede sin hacer.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Asegúrate de que las personas que quieres registrar existan en B1 Admin
- Familiarízate con cómo funcionan [Tareas](./tasks.md), ya que cada tarjeta en un tablero es una tarea
- Para usar la acción **Enviar correo**, crea primero las plantillas de correo que quieres enviar (administradas bajo **Mensajería → Administrar Plantillas**)
- Necesitarás el permiso de Tareas apropiado. Ver, editar tarjetas y administrar flujos de trabajo son niveles de permiso separados (ve [Roles y Permisos](../settings/roles-permissions.md))

</div>

## Ver Flujos de Trabajo

Navega a **Servicio**, abre el área **Tareas** y selecciona **Flujos de Trabajo** del menú. Verás tus flujos de trabajo listados y agrupados por categoría, con flujos de trabajo activos destacados. Haz clic en cualquier flujo de trabajo para abrir su tablero.

## Crear un Flujo de Trabajo

1. En la página Flujos de Trabajo, haz clic en **Agregar Flujo de Trabajo**.
2. Elige cómo comenzar:
   - **Flujo de trabajo en blanco** -- comienza desde cero y construye tus propios pasos.
   - **Desde una plantilla** -- comienza con un conjunto listo de pasos que puedes editar. Las plantillas incorporadas incluyen:
     - **Seguimiento de Nuevo Visitante** -- Enviar correo de bienvenida → Llamada telefónica personal → Invitar al próximo paso → Conectado
     - **Clase de Membresía** -- Expresar interés → Registrarse para la clase → Asistir a la clase → Completar membresía
     - **Agradecimiento de Primer Donante** -- Enviar nota de agradecimiento → Compartir impacto de donaciones → Administrado
3. Dale al flujo de trabajo un **Nombre**.
4. Opcionalmente asigna una **Categoría** para agrupar flujos de trabajo relacionados juntos. Puedes crear una categoría nueva directamente del menú desplegable.
5. Deja el flujo de trabajo **Activo** para que las personas puedan agregarse a él, o configúralo en **Inactivo** para ocultarlo de las listas de agregar-a-flujo-de-trabajo.
6. Haz clic en **Guardar**.

:::tip
Usa el botón **Duplicar** en la lista de Flujos de Trabajo para copiar un flujo de trabajo existente -- incluyendo sus pasos, acciones automatizadas y enrutamiento -- como punto de partida para uno nuevo.
:::

## Construir el Tablero con Pasos

Cada tablero de flujo de trabajo se compone de **pasos**, mostrados como columnas de izquierda a derecha. Abre un flujo de trabajo y usa **Agregar Paso** para crear cada etapa de tu proceso.

Cuando agregas o editas un paso, puedes configurar:

- **Nombre del Paso** -- el encabezado de la columna (por ejemplo, "Llamada de Bienvenida" o "Esperando Registro").
- **Vencimiento en (días)** -- establece automáticamente una fecha de vencimiento cuando una tarjeta entra en este paso. Las tarjetas pasadas su fecha de vencimiento se marcan como **Vencido**.
- **Asignado predeterminado** -- la persona o grupo a la que se asignan automáticamente las tarjetas nuevas en este paso.
- **Acciones automatizadas** -- cosas que el sistema hace por su cuenta cuando una tarjeta llega (ve abajo).
- **Enrutamiento** -- dónde va la tarjeta cuando sale del paso (ve [Enrutamiento](#enrutamiento-de-tarjetas-con-resultados-y-condiciones)).

Arrastra las columnas de paso al orden que coincide con tu proceso. El orden también define el camino predeterminado que toma una tarjeta cuando no se aplica otro enrutamiento.

:::info
Guarda un paso nuevo primero. Las acciones automatizadas y el enrutamiento se adjuntan al paso, por lo que el editor desbloquea esas secciones una vez que existe el paso.
:::

## Acciones Automatizadas

Cada paso puede llevar una lista de **acciones automatizadas** que se ejecutan por su cuenta el momento en que una tarjeta **entra** en el paso -- antes de que alguien la toque. Así es como un paso tanto solicita a un voluntario *como* se encarga del trabajo rutinario alrededor del seguimiento.

En el editor de pasos, abre **Acciones automatizadas**, haz clic en **Agregar Acción**, elige un tipo, completa su configuración y haz clic en el icono guardar en esa acción. Agrega tantas como necesites; se ejecutan **de arriba a abajo en orden**.

| Acción | Lo que hace |
|---|---|
| **Enviar correo** | Envía a la persona una plantilla de correo que elijas. Puedes anular la línea de asunto. |
| **Esperar** | Pausa la tarjeta durante varios días antes de continuar (ve abajo). |
| **Agregar a grupo** | Agrega a la persona a un [grupo](../groups/index.md) que elijas. |
| **Agregar a flujo de trabajo** | Inicia a la persona en otro flujo de trabajo -- útil para pasar entre procesos. |
| **Agregar nota** | Registra una nota en el historial de la tarjeta. |
| **Establecer campo** | Actualiza un campo en el registro de la persona: Estado de Membresía, Estado Civil, Género, Ciudad, Estado o Código Postal. |
| **Webhook** | Envía los detalles de la tarjeta a una dirección web externa (URL) que proporciones, para conectar con otros sistemas. |

Después de que todas las acciones de un paso terminen, la tarjeta **descansa en ese paso** para que una persona pueda trabajarla -- a menos que el paso tenga una ruta automática que la mueva adelante (ve [Pasos completamente automatizados](#pasos-completamente-automatizados)).

:::info
Las acciones automatizadas se ejecutan solo cuando una tarjeta llega a través del flujo normal -- cuando se agrega por primera vez, cuando un resultado o ruta automática la trae, o después de que un Esperar termina. **No** se re-ejecutan cuando un miembro del personal arrastra manualmente una tarjeta al paso o la envía hacia atrás, para que una persona no reciba el mismo correo dos veces.
:::

### Enviar correo

Elige **Enviar correo**, elige una de tus plantillas de correo y opcionalmente escribe un asunto personalizado. Cuando una tarjeta entra en el paso, la persona recibe ese correo automáticamente. (Si la persona no tiene una dirección de correo en archivo, el paso simplemente omite esta acción.)

### Esperar unos días (secuencias de goteo)

La acción **Esperar** mantiene una tarjeta durante el número de días que estableces. Mientras espera, la tarjeta se muestra como **Dormida**. Cuando la espera termina:

1. Cualquier **acción restante en el mismo paso** se ejecuta -- para que puedas construir un goteo como **Enviar correo → Esperar 3 días → Enviar un correo de recordatorio**.
2. Luego, si el paso tiene una ruta automática, la tarjeta avanza; de lo contrario descansa en el paso para que una persona la recoja.

:::tip
Una **Espera** al comienzo de un paso es una forma simple de "mantener" una tarjeta antes de que aparezca a un voluntario -- por ejemplo, *Esperar 7 días, luego un coach se comunica*.
:::

## Agregar Personas como Tarjetas

Hay varias formas de poner personas en un tablero:

- **Desde el tablero** -- Haz clic en **Agregar Tarjeta** en la parte inferior de una columna de paso y elige una persona. También puedes elegir un grupo, y cada miembro de ese grupo se agrega como una tarjeta.
- **Desde el registro de una persona** -- Usa **Agregar a Flujo de Trabajo** en la página de una persona para soltarla en un flujo de trabajo.
- **Desde búsqueda de Personas** -- Selecciona múltiples personas y usa la acción **Agregar a Flujo de Trabajo** en lote para agregarlas todas a la vez.
- **Automáticamente con un disparador** -- Agrega personas cuando algo sucede, como un envío de formulario o un primer regalo (ve [Disparadores](#disparadores) abajo).

## Trabajar el Tablero

Abre un flujo de trabajo para ver su tablero. Cada tarjeta muestra el nombre de la persona, a quién se asigna y una etiqueta de fecha de vencimiento o estado (**Vencido** o **Dormido**). Una columna de paso también muestra pequeños distintivos para cualquier acción automatizada que ejecute y anotaciones para su enrutamiento, dándote un mapa de un vistazo de cómo fluyen las tarjetas.

- **Mover una tarjeta** -- Arrastra una tarjeta de una columna a la siguiente mientras la persona progresa.
- **Abrir una tarjeta** -- Haz doble clic en una tarjeta (o haz clic en ella) para abrir su cajón de detalles, donde puedes cambiar el paso, reasignarla, agregar notas y revisar lo que ya ha sucedido.

Desde el cajón de tarjetas puedes:

- **Asignar** la tarjeta a una persona o grupo diferente.
- **Dormir** la tarjeta durante 1 día, 3 días o 1 semana para ocultar temporalmente su fecha de vencimiento.
- **Enviar Atrás** al paso anterior o **Saltar** al siguiente paso.
- **Fijar asignación** -- mantén el mismo propietario en la tarjeta incluso cuando se mueve entre pasos. Por defecto, mover una tarjeta a un nuevo paso la reasigna al asignado predeterminado de ese paso; fijar mantiene a la persona actual responsable durante todo.
- **Completar** la tarjeta para terminarla, o elige un botón de **Resultado** si el paso tiene resultados configurados (ve [Enrutamiento](#enrutamiento-de-tarjetas-con-resultados-y-condiciones)).
- **Agregar notas** y revisar el **historial** de la tarjeta -- incluyendo un registro de acciones automatizadas que se han ejecutado (correos enviados, esperas, etc.).

### Acciones en lote

Selecciona las casillas de verificación en múltiples tarjetas para actuar sobre ellas juntas. Aparece una barra de herramientas permitiéndote **Completar**, **Dormir**, **Reasignar** o **Mover** todas las tarjetas seleccionadas a otro paso a la vez.

## Enrutamiento de Tarjetas con Resultados y Condiciones

El enrutamiento controla dónde va una tarjeta cuando sale de un paso. Abre el editor de un paso para configurar dos tipos de enrutamiento.

### Botones de resultado

Los resultados son botones mostrados en el cajón de tarjetas cuando estás completando una tarjeta en ese paso. En lugar de un único botón **Completar**, puedes ofrecer opciones como "Se unió a un Grupo" o "No Interesado". Cada resultado puede:

- Enviar la tarjeta a **otro paso** en este flujo de trabajo,
- **Pasar la tarjeta** a un flujo de trabajo completamente diferente, o
- **Cerrar** la tarjeta.

Esto permite que una decisión ramifique a la persona hacia diferentes caminos.

### Enrutamiento automático (condicional)

Las rutas automáticas mueven una tarjeta adelante **el momento en que entra en un paso** (y después de que terminen sus acciones automatizadas), sin que nadie haga clic, si la persona coincide con un conjunto de condiciones. Agrega una ruta, elige el paso de destino y define una o más **condiciones** (por ejemplo, la sede, edad o estado de membresía de una persona). Una ruta sin condiciones coincide con todos.

:::info
En el tablero, cada columna de paso muestra pequeñas anotaciones describiendo su enrutamiento -- por ejemplo, una etiqueta de resultado o "si coincide" seguida de una flecha al paso de destino o flujo de trabajo.
:::

## Pasos Completamente Automatizados

Puedes hacer que un paso se ejecute completamente por su cuenta, sin que nadie lo trabaje. Dale al paso sus **acciones automatizadas** y agrega una **ruta automática** (sin condiciones) apuntando al siguiente paso. Cuando una tarjeta entra, las acciones se ejecutan, y luego la ruta la avanza inmediatamente -- la tarjeta pasa directamente.

:::tip
Combina esto con **Espera**: *Enviar correo de bienvenida → Esperar 3 días → avanzar automáticamente al paso "Llamada Personal".* El correo y el tiempo se manejan para ti, y un voluntario solo ve la tarjeta cuando es hora del toque humano.
:::

## Disparadores

Los disparadores agregan personas a un flujo de trabajo automáticamente cuando algo sucede, para que nunca tengas que agregar tarjetas a mano. En un tablero de flujo de trabajo, haz clic en la pestaña **Disparadores**, luego **Agregar Disparador**. Hay dos tipos:

### Disparadores de eventos

Se disparan tan pronto como un registro cambia en B1. Elige el evento, luego opcionalmente agrega **condiciones** para que solo coincidan las personas:

- **Persona · Creada / Actualizada** -- por ejemplo, agrega a cualquiera cuyo estado se vuelva *Visitante*.
- **Donación · Creada** -- por ejemplo, agrega un regalo de primer tiempo o grande a un flujo de trabajo de agradecimiento (coincide por cantidad, fondo o método).
- **Grupo · Miembro se Unió** / **Grupo · Creado**.
- **Formulario · Enviado** -- agrega a cualquiera que envíe un formulario elegido (excelente para una tarjeta "Soy Nuevo" o "Conectar").

### Disparadores de horario

Se ejecutan de forma recurrente -- diariamente, semanalmente, mensualmente o anualmente -- contra un conjunto de condiciones. Úsalos para alcance basado en tiempo como *todos cuya fecha de aniversario de membresía es hoy* o un *mes* de chequeo.

Para cualquier disparador también puedes establecer:

- El **paso de entrada** en el que comienza la nueva tarjeta (por defecto el primer paso).
- **Una vez por persona** -- para que la misma persona no se agregue al flujo de trabajo dos veces por el disparador.
- **Activo** -- activa o desactiva el disparador sin eliminarlo.

:::tip
Empareja un disparador **Formulario · Enviado** con la plantilla **Seguimiento de Nuevo Visitante** para convertir tu formulario "Tarjeta de Conectar" o "Soy Nuevo" en un pipeline de seguimiento automático.
:::

## Mis Tarjetas

Los voluntarios y el personal no necesitan excavar en cada tablero para encontrar su trabajo. La página **Mis Tarjetas** (enlazada desde la página Flujos de Trabajo) lista cada tarjeta asignada al usuario actual en todos los flujos de trabajo. Hacer clic en una tarjeta abre el tablero al que pertenece.

## Reportes

Abre un flujo de trabajo y haz clic en **Reportes** para ver análisis de ese flujo de trabajo:

- **Vencido** -- el número de tarjetas pasadas su fecha de vencimiento.
- **Tarjetas por Paso** -- cuántas tarjetas actualmente se encuentran en cada paso, mostrado como un gráfico de columnas.
- **Completado (30 días)** -- rendimiento en los últimos 30 días, mostrado como un gráfico de línea.

Úsalos para detectar cuellos de botella -- por ejemplo, un paso donde las tarjetas se acumulan y nunca avanzan.

## Artículos Relacionados

- [Tareas](./tasks.md) -- los elementos de acción individuales en los que se construyen las tarjetas de flujo de trabajo
- [Automatizaciones](./automations.md) -- crea tareas recurrentes según un horario
- [Formularios](../forms/index.md) -- construye los formularios que pueden disparar flujos de trabajo
- [Grupos](../groups/index.md) -- los grupos a los que una acción "Agregar a grupo" puede colocar personas
- [Roles y Permisos](../settings/roles-permissions.md) -- controla quién puede ver, editar y administrar flujos de trabajo
