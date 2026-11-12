---
title: "Configuración de la aplicación móvil"
description: "Configure las pestañas de navegación, las fichas de la pantalla de inicio, el aviso para iniciar sesión y las opciones de privacidad del directorio de miembros de la aplicación de miembros de B1.church en B1 Admin."
---

# Configuración de la aplicación móvil

<div class="article-intro">

La página de Configuración de la aplicación móvil le permite configurar las pestañas de navegación que aparecen en la **experiencia móvil de B1.church (PWA)** para los miembros de su iglesia. Usted controla qué pestañas son visibles, a qué enlazan y cómo se muestran.

</div>

## Video de capacitación {#training-video}

<YouTube id="ydY7WGK16fE" title="Personalizar la aplicación de miembros de su iglesia en B1" />

:::info
Las pestañas configuradas aquí aparecen en la aplicación B1, que los miembros pueden [instalar como una aplicación web progresiva (PWA)](../../b1-church/getting-started/installing-pwa.md). Comparta con sus miembros la página de instalación de su iglesia (`https://yourchurchname.b1.church/mobile/install`); les guía para instalar la aplicación en su dispositivo, sin necesidad de descargarla desde App Store ni Google Play.
:::

<div class="prereqs">
<h4>Antes de empezar</h4>

- Necesita el permiso "Editar configuración de la iglesia". Consulte [Roles y permisos](./roles-permissions.md) si no tiene acceso.
- Configure primero la [Configuración de la iglesia](./church-settings.md), incluidos el nombre de su iglesia y la marca

</div>

## Acceder a la configuración de navegación {#accessing-navigation-settings}

1. En B1 Admin, abra el [menú Salto](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda) y expanda **Móvil**.
2. Haga clic en **Navegación** (`/mobile/navigation`). Necesita el permiso **Editar contenido** para verla.
3. La lista **Pestañas de la app** muestra sus pestañas actuales en orden, cada una con su visibilidad. Las pestañas dentro de una carpeta aparecen con sangría debajo de ella.

El menú Móvil también incluye **Tema de la aplicación**, **Portal de miembros**, **Registro de entrada de B1**, **Etiquetas** y **Notificaciones push**. El Tema de la aplicación y el Portal de miembros se explican más abajo; consulte [Notificaciones push](#push-notifications) para programar notificaciones.

## Agregar una pestaña nueva {#adding-a-new-tab}

1. Haga clic en el botón **Agregar pestaña** en la parte superior de la página.
2. Complete los detalles de la pestaña:
   - **Nombre de la pestaña** -- La etiqueta que aparece en la pestaña (por ejemplo, "Sermones" o "Dar").
   - **Icono** -- Haga clic en el selector de iconos para elegir un icono para su pestaña.
   - **Imagen** -- Haga clic en **Seleccionar imagen** (o **Cambiar imagen**) para asignar a la pestaña una foto. Las pestañas con foto aparecen como fichas con imagen en la pantalla de inicio de la aplicación; consulte [Fichas de la pantalla de inicio](#home-screen-tiles). Para quitar una foto, haga clic en **Quitar imagen** y guarde; la pestaña pasará a mostrarse como una pestaña simple, no como una ficha de inicio.
   - **Tipo de pestaña** -- **Biblia**, **Transmisión en vivo**, **Versículo del día**, **Sermones**, **Registro de entrada**, **Donación**, **Directorio de miembros**, **Mis grupos**, **Oportunidades de voluntariado**, **Planes de servicio**, **Inscripciones**, **Solicitudes**, **URL externa**, **Página interna** o **Carpeta**. **Inscripciones** abre las inscripciones a eventos del miembro; **Solicitudes** abre Mis solicitudes, donde un miembro puede solicitar un evento y ver el estado de solicitudes anteriores. Configure la Visibilidad como Usuarios con sesión iniciada o Miembros y personal para estas pestañas, ya que requieren un miembro con sesión iniciada.
   - **URL** -- Se muestra en las pestañas de **URL externa**: la dirección web que abre la pestaña.
   - **Página** -- Se muestra en las pestañas de **Página interna**: elija una de las páginas de su sitio web.
   - **Pestaña principal** -- Coloque la pestaña dentro de una pestaña de **Carpeta**, o déjela en **Ninguna (nivel superior)**. Consulte [Dónde aparecen estas pestañas](#where-these-tabs-appear).
   - **Visibilidad** -- Quién puede ver esta pestaña: **Todos (incluidos anónimos)**, **Usuarios con sesión iniciada**, **Miembros y personal**, **Solo personal**, **Miembros del equipo de servicio** o **Grupos específicos...** (luego marque los grupos). Para una pestaña de **Directorio de miembros**, esto solo controla quién ve la pestaña en sí; quién puede abrir el directorio se configura con **Mostrar en el directorio** en la página Portal de miembros (consulte [Configuración del directorio de miembros y de mensajería](#member-directory--messaging-settings)).
3. Haga clic en **Guardar pestaña** para agregarla a su aplicación.

## Editar una pestaña existente {#editing-an-existing-tab}

1. Haga clic en el icono de editar (lápiz) de una pestaña en la lista **Pestañas de la app**.
2. Actualice el nombre, el icono, la imagen, el tipo o la configuración de visibilidad de la pestaña.
3. Haga clic en **Guardar pestaña** para aplicar sus cambios. Para quitar la pestaña, haga clic en **Eliminar pestaña** en su lugar. Al eliminar una carpeta, sus pestañas vuelven al nivel superior.

## Reordenar pestañas {#reordering-tabs}

Puede cambiar el orden en que aparecen las pestañas en la aplicación móvil. Use las flechas **Subir** y **Bajar** de cada pestaña para reorganizarlas. Las pestañas dentro de una carpeta se mueven dentro de esa carpeta. El orden que se muestra en esta página coincide con el orden que verán sus miembros en la aplicación.

:::info
Algunas pestañas pueden aparecer automáticamente cuando se cumplen ciertas condiciones; por ejemplo, una pestaña de Transmisión en vivo puede aparecer cuando hay una transmisión activa. Las pestañas agregadas manualmente le dan control total sobre lo que ven sus miembros en todo momento.
:::

:::tip
Mantenga un número manejable de pestañas. Entre tres y cinco pestañas funciona bien para la mayoría de las iglesias. Demasiadas pestañas pueden hacer confusa la navegación para sus miembros.
:::

## Tema de la aplicación {#app-theme}

**Móvil > Tema de la aplicación** (`/mobile/theme`) establece los colores que usan la aplicación B1, el portal de miembros y el kiosco de registro. Necesita el permiso **Editar configuración de la iglesia**.

1. Expanda **Modo claro** o **Modo oscuro**.
2. Para cada color -- **Fondo**, **Superficie**, **Primario**, **Contraste primario** (texto en botones y encabezados de color primario), **Secundario** y **Color de texto** -- haga clic en la muestra para elegir un color, o escríbalo en el cuadro **Hex**. La **Vista previa** de abajo muestra un encabezado, una tarjeta y un botón con sus colores.
3. Haga clic en **Guardar**.

Haga clic en **Restablecer valores predeterminados** para volver a los colores estándar. El tema **Personalizado** propio de B1 Admin también usa el color **Primario** del modo claro; consulte [Administrar su perfil](../profile/managing-profile.md).

## Configuración del directorio de miembros y de mensajería {#member-directory--messaging-settings}

El elemento **Portal de miembros** de la misma sección Móvil (`/mobile/b1-mobile`, titulado **Configuración del portal**) contiene las opciones que rigen el directorio de miembros y la mensajería privada en la experiencia de B1.church. Necesita el permiso **Editar configuración de la iglesia**. Cambie cualquiera de las opciones siguientes y haga clic en **Guardar** al final de la página:

- **Grupo de aprobación del directorio** -- El grupo que revisa las actualizaciones del directorio de miembros, y las [solicitudes de eliminación de cuenta](../profile/account-deletion.md), antes de que surtan efecto.
- **Mostrar en el directorio** -- Quién puede abrir el directorio de miembros y quién aparece en él: **Solo administradores**, **Miembros y superiores** (la opción predeterminada), **Asistentes regulares y superiores** o **Visitantes y superiores**. Las personas cuyo estado de membresía es inferior al nivel que elija no ven el directorio y no aparecen en él. **Solo administradores** cierra el directorio para todos excepto el personal con el permiso Personas > Ver (un estado de membresía de Personal por sí solo no basta), que siempre puede abrir el directorio y ver a todos, sin importar esta opción. Los invitados nunca se incluyen, ya que quien se registra por sí mismo en línea empieza como invitado.
- **Preferencia de visibilidad** -- Establece el valor predeterminado de toda la iglesia para los miembros que todavía no han elegido su propia configuración. **Dirección**, **Número de teléfono** y **Correo electrónico** tienen cada uno su propio menú desplegable (cada uno empieza en **Miembros**), con los mismos cinco niveles disponibles en todos los lugares donde se configura la visibilidad:
  - **Todos** -- visible para cualquiera, incluidos los visitantes anónimos
  - **Miembros** -- visible solo para personas con un registro de Miembro o Personal
  - **Solo grupos** -- visible solo para personas que comparten un grupo con esta persona, y para el personal
  - **Mis líderes de grupo y personal** -- visible solo para los líderes de un grupo al que pertenece esta persona, y para el personal
  - **Solo personal** -- visible solo para el personal (cualquiera cuyo estado de membresía sea Personal, o que tenga el permiso Personas > Ver), y para la propia persona

  "Personal" en estos niveles significa cualquiera cuyo estado de membresía es Personal o que tiene el permiso Personas > Ver. Los cambios de grupo surten efecto de inmediato: quien se une a un grupo, o es nombrado líder de grupo, puede ver los datos de los miembros de ese grupo que correspondan a **Solo grupos** o **Mis líderes de grupo y personal**, sin necesidad de cerrar sesión y volver a entrar.

  Los miembros pueden cambiar estos valores predeterminados para su propio registro desde la pestaña **Privacidad** de su perfil en la PWA de B1.church; consulte [Editar su perfil](/docs/b1-church/getting-started/me-page).
- **Edad mínima para mensajes privados** -- Un control de seguridad infantil. B1 no abrirá una conversación privada **nueva** cuando cualquiera de las dos personas esté por debajo de esta edad, según su fecha de nacimiento (si no hay fecha de nacimiento registrada, se usa el rol familiar como alternativa). Las personas menores de esa edad siguen totalmente visibles en el directorio: solo se bloquea la mensajería directa, en **ambas direcciones**, para todos, incluido el personal. Las conversaciones grupales y los mensajes a los padres de un menor siguen funcionando. Las opciones son Desactivado, 13, 16 o 18; el valor predeterminado es **18**. Las conversaciones existentes no se ven afectadas.

:::tip
Como la verificación de edad mínima depende de las fechas de nacimiento, asegúrese de que las fechas de nacimiento de los niños de su congregación estén completas. Esta opción pertenece a la misma familia de controles de seguridad infantil que los [controles de seguridad del registro de entrada](../attendance/checkin-safety.md).
:::

### Aviso de inicio de sesión en la pantalla de inicio {#home-screen-sign-in-prompt}

Los visitantes que abren la [pantalla de inicio](/docs/b1-church/getting-started/navigating#home) de la aplicación sin iniciar sesión ven un breve aviso -- por defecto, *"Inicie sesión para ver sus grupos, ofrendas y más."* -- junto a un botón **Iniciar sesión**. Las opciones **Aviso de inicio de sesión en la pantalla de inicio** de la misma página Portal de miembros (`/mobile/b1-mobile`) le permiten cambiarlo:

- **Mostrar aviso de inicio de sesión en la pantalla de inicio de la app** -- Desactívelo para ocultar tanto el aviso como el botón **Iniciar sesión** de la pantalla de inicio. Los visitantes aún pueden iniciar sesión desde el menú de la aplicación.
- **Texto del aviso de inicio de sesión** -- Reemplace el texto predeterminado con su propio mensaje (de hasta 150 caracteres). Déjelo en blanco para usar el predeterminado. Este cuadro está deshabilitado mientras el aviso está desactivado.

Haga clic en **Guardar** para aplicar. Un mensaje **Guardado** confirma el cambio. Al guardar se actualiza la configuración en caché de la aplicación, así que el cambio se verá la próxima vez que se cargue la pantalla de inicio.

### Fichas de la pantalla de inicio {#home-screen-tiles}

Las pestañas que tienen una foto (consulte **Imagen** en [Agregar una pestaña nueva](#adding-a-new-tab)) aparecen en la [pantalla de inicio](/docs/b1-church/getting-started/navigating#home) de la aplicación como fichas con foto, en una sección encabezada con el nombre de su iglesia. Esto incluye una pestaña de Versículo del día, si le asigna una foto. Las pestañas con foto también siguen apareciendo en la barra de pestañas.

La opción **Fichas de la pantalla de inicio** de la misma página Portal de miembros (`/mobile/b1-mobile`) controla cómo se distribuyen esas fichas. Elija un **Diseño**:

- **Cuadrícula** -- Dos fichas por fila (el valor predeterminado). Cuando la cantidad de fichas es impar, la primera ocupa todo el ancho.
- **Fila deslizable** -- Una fila de fichas que los miembros deslizan hacia los lados.
- **Deslizable (automático)** -- La misma fila deslizable, pero que también se mueve sola, avanzando una ficha aproximadamente cada cuatro segundos y volviendo a la primera ficha después de la última. Se pausa mientras un miembro toca, pasa el cursor sobre la fila o navega a ella con el teclado, y se reanuda unos segundos después. En los dispositivos con la opción de reducir movimiento activada, la fila permanece fija y funciona como **Fila deslizable**.
- **Lista** -- Una lista con una pequeña miniatura de foto junto al nombre de cada pestaña.
- **Cuadrícula y lista** -- Las tres primeras pestañas con foto en cuadrícula, con la primera ocupando todo el ancho, y las tres siguientes listadas debajo con una pequeña miniatura junto a cada nombre. Cuando hay más de tres, el encabezado de la sección muestra un enlace **Todas** que abre la página **Más** de la aplicación, que enumera todas las pestañas.
- **Deslizable (automático) y lista** -- Todas las pestañas con foto en la fila de avance automático descrita arriba, con las tres primeras también listadas debajo, y el mismo enlace **Todas** cuando hay más de tres.

En ambos diseños deslizables, cuando hay más fichas de las que caben en la pantalla, aparece una fila de puntos debajo de las fichas, uno por cada ficha, con el punto de la ficha actual relleno. Los miembros pueden tocar un punto para ir a esa ficha.

Haga clic en **Guardar** para aplicar.

### Secciones de la pantalla de inicio {#home-screen-sections}

Los miembros con sesión iniciada siempre ven su propio historial de asistencia y los formularios enviados en la [página Yo](/docs/b1-church/getting-started/me-page). Los interruptores de **Secciones de la pantalla de inicio** de la misma página Portal de miembros (`/mobile/b1-mobile`) pueden mostrarlos también en la pantalla de inicio:

- **Mostrar Mi asistencia en inicio** -- Agrega una sección **Mi asistencia** con cuántas veces asistió el miembro en los últimos 90 días, sus dos visitas más recientes y un enlace **Historial** a su lista completa de asistencia.
- **Mostrar Mis formularios en inicio** -- Agrega una sección **Mis formularios** con los dos envíos de formularios más recientes del miembro y un enlace **Todos los formularios**.

Ambas están desactivadas de forma predeterminada. Una sección solo aparece para los miembros que han iniciado sesión y tienen al menos un registro que mostrar.

- **Mostrar Noticias en inicio** -- Agrega una sección **Noticias** justo debajo del saludo, que muestra sus cinco entradas publicadas más recientes del [blog](../website/blog.md) como tarjetas con foto en una fila que se desplaza sola. Al tocar una tarjeta se abre la entrada completa dentro de la aplicación, y un enlace **Todas las noticias** lista sus entradas recientes. Una vez activada, **Solo esta categoría** le permite elegir una categoría de blog (por ejemplo, *Anuncios*) para que solo aparezcan esas entradas; déjela en **Todas las entradas** para mostrar todo. Las noticias se muestran a todos los que abren la aplicación, con sesión iniciada o no, porque las entradas del blog son públicas en su sitio web. Está desactivada de forma predeterminada y solo aparece cuando tiene al menos una entrada publicada.

Haga clic en **Guardar** para aplicar.

## Notificaciones push {#push-notifications}

**Móvil > Notificaciones push** (`/mobile/notifications`) envía o programa una notificación push a las personas que tienen instalada la aplicación B1 con las notificaciones activadas. Necesita **Editar contenido** para enviar a todos, o **Editar miembros de grupos** para enviar a un grupo.

1. Haga clic en **Enviar notificación**.
2. Elija la **Audiencia**: **Todos con la aplicación**, o uno de sus grupos. B1 muestra cuántas personas alcanzará la notificación y cuántas tienen las push desactivadas; usted queda excluido de sus propias notificaciones push.
3. Escriba un **Título** (de hasta 80 caracteres) y un **Mensaje** (de hasta 240 caracteres), y opcionalmente un **Enlace para abrir o URL del folleto** y una **URL de imagen** (los mismos campos que una [notificación de grupo](../groups/group-members.md#sending-push-notifications-to-group-members)).
4. En **Cuándo**, deje **Enviar ahora**, o elija **Programar para más tarde** y seleccione una hora futura de **Enviar a las**.
5. Haga clic en **Enviar notificación** (o en **Programar notificación**).

La página enumera las notificaciones **Programadas** (con **Editar**, **Enviar ahora** y **Cancelar** en cada una) y las **Recientes** con su estado, como *Enviada: 12 de 15*, *Cancelada* o *No enviada (pasó la hora de envío)*. Haga clic en **Quitar** para retirar de la lista una notificación terminada, o en **Borrar todo** para quitar todas las enviadas, fallidas y canceladas. Las horas se muestran en la [zona horaria](./church-settings.md#time-zone) de su iglesia, o en la de su computadora si la iglesia no tiene ninguna configurada. Quién recibe una notificación programada se calcula de nuevo cuando se envía.

Si una notificación lleva más de 30 minutos de retraso cuando B1 intenta enviarla, se marca como *No enviada* y no se envía; si falla tres veces, muestra *Fallida* con el error. Quitar una notificación de la lista no la retira de quienes ya la recibieron. Cuando una push no tiene enlace, al tocarla se abre la lista de notificaciones de la aplicación en el caso de una push para toda la iglesia, o la página del grupo en el caso de una push de grupo. Los miembros que desactivaron **Anuncios de la iglesia** en sus [preferencias de notificación](../../b1-church/getting-started/notification-preferences.md) no reciben estas push, sea que se envíen a todos o a un grupo.

## Dónde aparecen estas pestañas {#where-these-tabs-appear}

Las pestañas que configura aquí se muestran en la **PWA de B1.church** que sus miembros instalan desde cualquier página de `https://yourchurchname.b1.church`. Los cambios que haga en esta página se reflejan la próxima vez que un miembro abra la aplicación.

En un teléfono, la barra de pestañas inferior muestra **Inicio**, hasta tres de sus pestañas y **Más**; en una computadora, el encabezado muestra hasta cinco. Las pantallas integradas (como Sermones, Donaciones o Grupos) reciben primero sus espacios, y las pestañas de **Página interna** ocupan los espacios que sobren. Las pestañas de **URL externa** y de **Versículo del día** nunca obtienen un espacio. Todas las pestañas, incluidas las que no caben, aparecen en la página **Más** de la aplicación.

Las pestañas colocadas dentro de una pestaña de **Carpeta** son la excepción: solo aparecen en la pantalla de la propia carpeta, que los miembros abren al tocarla. Esa pantalla muestra las pestañas como fichas con foto cuando todas tienen imagen, o como lista en caso contrario. Una carpeta que no contiene pestañas visibles para un miembro se oculta para ese miembro. Consulte [Pestañas de carpeta](../../b1-church/getting-started/navigating.md#folder-tabs). Consulte [Navegar por B1App](../../b1-church/getting-started/navigating.md) para ver lo que ven los miembros.

## Próximos pasos {#next-steps}

- [Configuración de la iglesia](./church-settings.md) -- Configure la información y la marca de su iglesia
- [Roles y permisos](./roles-permissions.md) -- Administre el acceso de su equipo
