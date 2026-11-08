---
title: "Configuración de la aplicación móvil"
description: "Configure las pestañas de navegación, los mosaicos de la pantalla de inicio, el aviso de inicio de sesión y la privacidad del directorio de miembros para la aplicación de miembros B1.church en B1 Admin."
---

# Configuración de la aplicación móvil

<div class="article-intro">

La página de configuración de la aplicación móvil le permite configurar las pestañas de navegación que aparecen en la **experiencia móvil de B1.church (PWA)** para los miembros de su iglesia. Usted controla qué pestañas son visibles, a dónde enlazan y cómo se muestran.

</div>

## Video de formación

<YouTube id="ydY7WGK16fE" title="Personalización de la aplicación de miembros de su iglesia en B1" />

:::info
Las pestañas configuradas aquí aparecen en la aplicación B1, que los miembros pueden [instalar como aplicación web progresiva (PWA)](../../b1-church/getting-started/installing-pwa.md). Comparta con sus miembros la página de instalación de su iglesia: `https://yourchurchname.b1.church/mobile/install`. En ella se les explica cómo instalar la aplicación en su dispositivo, sin necesidad de descargarla desde App Store ni Google Play.
:::

<div class="prereqs">
<h4>Antes de empezar</h4>

- Necesita el permiso "Editar configuración de la iglesia". Consulte [Roles y permisos](./roles-permissions.md) si no tiene acceso.
- Configure primero los [Ajustes de la iglesia](./church-settings.md), incluido el nombre de su iglesia y la identidad visual.

</div>

## Acceso a la configuración de navegación

1. En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda) y expanda **Mobile**.
2. Haga clic en **Navigation** (`/mobile/navigation`).
3. La página de navegación muestra las pestañas actuales de su aplicación.

## Añadir una nueva pestaña

1. Haga clic en el botón **Add Tab** en la parte superior de la página.
2. Complete los datos de la pestaña:
   - **Name** -- La etiqueta que aparece en la pestaña (por ejemplo, "Sermones" o "Dar").
   - **Icon** -- Haga clic en el selector de iconos para elegir un icono para su pestaña.
   - **Image** -- Haga clic en **Select Image** (o **Change Image**) para asignar a la pestaña una foto. Las pestañas con foto aparecen como mosaicos fotográficos en la pantalla de inicio de la aplicación; consulte [Mosaicos de la pantalla de inicio](#home-screen-tiles).
   - **Tab Type** -- Seleccione entre opciones como Bible, Live Stream, Donation, Website y otras.
   - **URL** -- Introduzca la dirección web a la que debe enlazar la pestaña.
   - **Visibility** -- Controle quién puede ver esta pestaña (todos, solo miembros, etc.). En el caso de una pestaña **Member Directory**, esta opción solo controla quién ve la pestaña en sí; quién puede abrir el directorio se configura mediante **Show in Directory** en la página Member portal (consulte [Configuración del directorio de miembros y de la mensajería](#member-directory--messaging-settings)).
3. Haga clic en **Save Tab** para añadir la pestaña a su aplicación.

## Editar una pestaña existente

1. Haga clic en cualquier pestaña de la lista **App Tabs**.
2. Actualice el nombre, el icono, la URL, el tipo o la configuración de visibilidad de la pestaña.
3. Haga clic en **Save Tab** para aplicar los cambios.

## Reordenar las pestañas

Puede cambiar el orden en que aparecen las pestañas en la aplicación móvil. Arrastre y suelte las pestañas en la lista para reorganizarlas. El orden que se muestra en esta página coincide con el orden en que los miembros verán las pestañas en la aplicación.

:::info
Algunas pestañas pueden aparecer automáticamente cuando se cumplen ciertas condiciones; por ejemplo, una pestaña de Live Stream puede mostrarse cuando hay una transmisión activa. Las pestañas añadidas manualmente le dan control total sobre lo que ven sus miembros en todo momento.
:::

:::tip
Mantenga un número de pestañas manejable. Entre tres y cinco pestañas funcionan bien en la mayoría de las iglesias. Demasiadas pestañas pueden confundir a sus miembros al navegar.
:::

## Configuración del directorio de miembros y de la mensajería

El elemento **Member portal**, dentro de la misma sección Mobile, contiene la configuración que regula el directorio de miembros y la mensajería privada en la experiencia de B1.church:

- **Directory Approval Group** -- El grupo que revisa las actualizaciones del directorio de miembros y las [solicitudes de eliminación de cuenta](../profile/account-deletion.md) antes de que surtan efecto.
- **Show in Directory** -- Quién puede abrir el directorio de miembros y quién aparece en él: **Admins Only**, **Members and Above** (la opción predeterminada), **Regular Attendees and Above** o **Visitors and Above**. Las personas cuyo estado de membresía esté por debajo del nivel elegido no ven el directorio ni aparecen en él. **Admins Only** cierra el directorio a todos excepto al personal con el permiso People &gt; View (un estado de membresía Staff por sí solo no basta); este personal siempre puede abrir el directorio y ver a todos, independientemente de esta configuración. Los invitados nunca se incluyen, ya que cualquier persona que se registre por internet empieza como invitado.
- **Visibility Preference** -- Establece el valor predeterminado para toda la iglesia, aplicable a los miembros que todavía no han elegido su propia configuración. **Address**, **Phone Number** y **Email** tienen cada uno su propio desplegable, con los mismos cinco niveles disponibles en todas las opciones de visibilidad:
  - **Everyone** -- visible para cualquier persona, incluidos los visitantes anónimos
  - **Members** -- visible solo para personas con un registro de Miembro o de Personal
  - **Groups Only** -- visible solo para personas que comparten un grupo con esta persona, además del personal
  - **My Group Leaders and Staff** -- visible solo para los líderes de un grupo al que pertenece esta persona, además del personal
  - **Staff Only** -- visible solo para el personal (cualquiera cuyo estado de membresía sea Staff o que tenga el permiso People &gt; View) y para la propia persona

  "Personal" en estos niveles significa cualquiera cuyo estado de membresía sea Staff o que tenga el permiso People &gt; View. Los cambios en los grupos surten efecto de inmediato: quien se une a un grupo, o es nombrado líder de grupo, puede ver los datos de los miembros de ese grupo correspondientes a **Groups Only** o **My Group Leaders and Staff**, sin tener que cerrar sesión y volver a entrar.

  Los miembros pueden anular estos valores predeterminados para su propio registro desde la pestaña **Privacy** de su perfil en la PWA de B1.church; consulte [Editar su perfil](/docs/b1-church/getting-started/me-page).
- **Minimum Age for Private Messages** -- Un control de seguridad infantil. B1 no abrirá una conversación de mensajería privada **nueva** cuando alguna de las dos personas esté por debajo de esta edad, según su fecha de nacimiento (si no hay fecha de nacimiento registrada, se usa como alternativa el rol del hogar). Las personas menores de esa edad siguen siendo totalmente visibles en el directorio; solo se bloquea la mensajería directa, en **ambas direcciones**, para todos, incluido el personal. Las conversaciones de grupo y la mensajería a los padres de un menor siguen funcionando. Las opciones son Off, 13, 16 o 18; el valor predeterminado es **18**. Las conversaciones existentes no se ven afectadas.

:::tip
Como la comprobación de edad mínima depende de las fechas de nacimiento, asegúrese de rellenarlas para los niños de su congregación. Esta configuración pertenece a la misma familia de controles de seguridad infantil que los [controles de seguridad del registro de entrada](../attendance/checkin-safety.md).
:::

### Aviso de inicio de sesión en la pantalla de inicio

Los visitantes que abren la [pantalla de inicio](/docs/b1-church/getting-started/navigating#home) de la aplicación sin iniciar sesión ven un breve aviso (por defecto, *"Inicie sesión para ver sus grupos, donaciones y más."*) junto a un botón **Sign In**. La configuración **Home screen sign-in prompt** de la misma página Member portal (`/mobile/b1-mobile`) le permite cambiarlo:

- **Show sign-in prompt on the app home screen** -- Desactive esta opción para ocultar tanto el aviso como el botón **Sign In** de la pantalla de inicio. Los visitantes seguirán pudiendo iniciar sesión desde el menú de la aplicación.
- **Sign-in prompt text** -- Sustituya el texto predeterminado por su propio mensaje (hasta 150 caracteres). Déjelo en blanco para usar el texto predeterminado. Este campo queda deshabilitado mientras el aviso esté desactivado.

Haga clic en **Save** para aplicar los cambios. Aparecerá un mensaje **Saved** que confirma el cambio. Al guardar, se actualiza la caché de configuración de la aplicación, de modo que el cambio se verá la próxima vez que se cargue la pantalla de inicio.

### Mosaicos de la pantalla de inicio

Las pestañas que tienen una foto (consulte **Image** en [Añadir una nueva pestaña](#adding-a-new-tab)) aparecen en la [pantalla de inicio](/docs/b1-church/getting-started/navigating#home) de la aplicación como mosaicos fotográficos, en una sección con el encabezado del nombre de su iglesia. Esto incluye una pestaña de Verse of the Day, si le asigna una foto. Las pestañas con foto también aparecen en la barra de pestañas.

La configuración **Home screen tiles** de la misma página Member portal (`/mobile/b1-mobile`) controla la disposición de esos mosaicos. Elija un **Layout**:

- **Grid** -- Dos mosaicos por fila (la opción predeterminada). Cuando el número de mosaicos es impar, el primero ocupa todo el ancho.
- **Scrolling row** -- Una fila de mosaicos que los miembros desplazan de lado a lado.
- **Scrolling (automatic)** -- La misma fila desplazable lateralmente, pero que además se mueve sola, avanzando un mosaico aproximadamente cada cuatro segundos y volviendo al primero después del último. Se pausa cuando un miembro toca, pasa el cursor sobre la fila o se desplaza hasta ella con el tabulador, y se reanuda unos segundos después. En los dispositivos con la opción de reducir movimiento activada, la fila permanece quieta y funciona como **Scrolling row**.
- **List** -- Una lista con una pequeña miniatura de foto junto al nombre de cada pestaña.

En los dos diseños desplazables, cuando hay más mosaicos de los que caben en la pantalla, aparece una fila de puntos debajo de los mosaicos, uno por cada mosaico, con el punto del mosaico actual relleno. Los miembros pueden tocar un punto para saltar a ese mosaico.

Haga clic en **Save** para aplicar los cambios.

### Secciones de la pantalla de inicio

Los miembros que han iniciado sesión siempre ven su historial de asistencia y los formularios enviados en la [página Me](/docs/b1-church/getting-started/me-page). Los interruptores **Home screen sections** de la misma página Member portal (`/mobile/b1-mobile`) pueden mostrar también esa información en la pantalla de inicio:

- **Show My Attendance on Home** -- Añade una sección **My Attendance** con el número de veces que el miembro asistió en los últimos 90 días, sus dos visitas más recientes y un enlace **History** a su lista completa de asistencia.
- **Show My Forms on Home** -- Añade una sección **My Forms** con los dos envíos de formularios más recientes del miembro y un enlace **All forms**.

Ambas opciones están desactivadas por defecto. Una sección solo aparece para los miembros que han iniciado sesión y tienen al menos un registro que mostrar. Haga clic en **Save** para aplicar los cambios.

## Dónde aparecen estas pestañas

Las pestañas que configura aquí se muestran en la **PWA de B1.church** que sus miembros instalan desde cualquier página de `https://yourchurchname.b1.church`. Los cambios que realice en esta página se reflejarán la próxima vez que un miembro abra la aplicación.

En el teléfono, la barra de pestañas inferior muestra **Home**, hasta tres de sus pestañas y **More**; en el ordenador, el encabezado muestra hasta cinco. Las pantallas integradas (como Sermons, Giving o Groups) ocupan primero esos espacios, y las pestañas de **Internal Page** rellenan los espacios que queden libres. Las pestañas de **External URL** y de **Verse of the Day** nunca ocupan un espacio. Todas las pestañas, incluidas las que no caben, aparecen en la página **More** de la aplicación.

Las pestañas colocadas dentro de una pestaña **Folder** son la excepción: solo aparecen en la pantalla de la propia carpeta, a la que los miembros acceden tocándola. Esa pantalla muestra las pestañas como mosaicos fotográficos cuando todas tienen imagen, o como lista en caso contrario. Una carpeta que no contiene pestañas visibles para un miembro queda oculta para ese miembro. Consulte [Pestañas de carpeta](../../b1-church/getting-started/navigating.md#folder-tabs). Consulte [Navegación por B1App](../../b1-church/getting-started/navigating.md) para ver lo que ven los miembros.

## Próximos pasos

- [Ajustes de la iglesia](./church-settings.md): configure la información y la identidad visual de su iglesia
- [Roles y permisos](./roles-permissions.md): gestione el acceso de su equipo
