---
title: "Configuración de la app móvil"
description: "Configure las pestañas de navegación, los mosaicos de la pantalla de inicio, el aviso de inicio de sesión y la privacidad del directorio de miembros de la app de miembros de B1.church en B1 Admin."
---

# Configuración de la app móvil

<div class="article-intro">

La página de Configuración de la app móvil le permite configurar las pestañas de navegación que aparecen en la **experiencia móvil de B1.church (PWA)** para los miembros de su iglesia. Usted controla qué pestañas son visibles, a qué enlazan y cómo se muestran.

</div>

## Video de capacitación

<YouTube id="ydY7WGK16fE" title="Personalice la app de miembros de su iglesia en B1" />

:::info
Las pestañas configuradas aquí aparecen en la B1 App, que los miembros pueden [instalar como una Aplicación Web Progresiva (PWA)](../../b1-church/getting-started/installing-pwa.md). Comparta con los miembros la página de instalación de su iglesia: `https://yourchurchname.b1.church/mobile/install`. Allí se les explica cómo instalar la app en su dispositivo, sin necesidad de descargarla desde App Store o Google Play.
:::

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita el permiso "Editar configuración de la iglesia". Consulte [Roles y permisos](./roles-permissions.md) si no tiene acceso.
- Configure primero la [Configuración de la iglesia](./church-settings.md), incluido el nombre de su iglesia y la identidad visual

</div>

## Acceso a la configuración de navegación

1. En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda) y expanda **Mobile**.
2. Haga clic en **Navigation** (`/mobile/navigation`).
3. La página de Navegación muestra las pestañas actuales de la app.

## Agregar una nueva pestaña

1. Haga clic en el botón **Add Tab** en la parte superior de la página.
2. Complete los datos de la pestaña:
   - **Name** -- La etiqueta que aparece en la pestaña (por ejemplo, "Sermones" o "Ofrendas").
   - **Icon** -- Haga clic en el selector de iconos para elegir un icono para su pestaña.
   - **Image** -- Haga clic en **Select Image** (o **Change Image**) para asignar una foto a la pestaña. Las pestañas con foto aparecen como mosaicos fotográficos en la pantalla de inicio de la app; consulte [Mosaicos de la pantalla de inicio](#home-screen-tiles).
   - **Tab Type** -- Seleccione entre opciones como Bible, Live Stream, Donation, Website y más.
   - **URL** -- Ingrese la dirección web a la que debe enlazar la pestaña.
   - **Visibility** -- Controle quién puede ver esta pestaña (todos, solo miembros, etc.). En el caso de una pestaña **Member Directory**, esta opción solo controla quién ve la pestaña en sí; quién puede abrir el directorio se define con **Show in Directory** en la página Member portal (consulte [Configuración del directorio de miembros y de mensajería](#member-directory--messaging-settings)).
3. Haga clic en **Save Tab** para agregarla a su app.

## Editar una pestaña existente

1. Haga clic en cualquier pestaña de la lista **App Tabs**.
2. Actualice el nombre, el icono, la URL, el tipo o la configuración de visibilidad de la pestaña.
3. Haga clic en **Save Tab** para aplicar los cambios.

## Reordenar pestañas

Puede cambiar el orden en que aparecen las pestañas en la app móvil. Arrastre y suelte las pestañas en la lista para reorganizarlas. El orden que se muestra en esta página coincide con el orden que verán los miembros en la app.

:::info
Algunas pestañas pueden aparecer automáticamente cuando se cumplen ciertas condiciones; por ejemplo, una pestaña de transmisión en vivo puede mostrarse cuando hay una transmisión activa. Las pestañas agregadas manualmente le dan control total sobre lo que ven sus miembros en todo momento.
:::

:::tip
Mantenga un número manejable de pestañas. Entre tres y cinco pestañas funcionan bien para la mayoría de las iglesias. Demasiadas pestañas pueden hacer confusa la navegación para sus miembros.
:::

## Configuración del directorio de miembros y de mensajería

El elemento **Member portal** de la misma sección Mobile agrupa la configuración que rige el directorio de miembros y la mensajería privada en la experiencia de B1.church:

- **Directory Approval Group** -- El grupo que revisa las actualizaciones del directorio de miembros y las [solicitudes de eliminación de cuenta](../profile/account-deletion.md) antes de que surtan efecto.
- **Show in Directory** -- Quién puede abrir el directorio de miembros y quién aparece en él: **Admins Only**, **Members and Above** (el valor predeterminado), **Regular Attendees and Above** o **Visitors and Above**. Las personas cuyo estado de membresía esté por debajo del nivel elegido no ven el directorio ni aparecen en él. **Admins Only** cierra el directorio para todos excepto el personal con el permiso People &gt; View (el estado de membresía Staff por sí solo no basta), que siempre puede abrir el directorio y ver a todos, sin importar esta configuración. Los invitados nunca se incluyen, ya que quien se registra en línea por su cuenta empieza como invitado.
- **Visibility Preference** -- Define el valor predeterminado para toda la iglesia, aplicable a los miembros que aún no han elegido su propia configuración. **Address**, **Phone Number** y **Email** tienen cada uno su propio menú desplegable, con los mismos cinco niveles disponibles en todos los lugares donde se configura la visibilidad:
  - **Everyone** -- visible para cualquier persona, incluidos los visitantes anónimos
  - **Members** -- visible solo para personas con un registro de Miembro o de Personal
  - **Groups Only** -- visible solo para personas que comparten un grupo con esta persona, además del personal
  - **My Group Leaders and Staff** -- visible solo para los líderes de un grupo al que pertenece esta persona, además del personal
  - **Staff Only** -- visible solo para el personal (cualquiera cuyo estado de membresía sea Staff, o que tenga el permiso People &gt; View), y para la propia persona

  En estos niveles, "Personal" significa cualquier persona cuyo estado de membresía sea Staff o que tenga el permiso People &gt; View. Los cambios en los grupos surten efecto de inmediato: quien se une a un grupo, o es nombrado líder de un grupo, puede ver los datos **Groups Only** o **My Group Leaders and Staff** de los miembros de ese grupo sin necesidad de cerrar sesión y volver a entrar.

  Los miembros pueden reemplazar estos valores predeterminados para su propio registro desde la pestaña **Privacy** de su perfil en la PWA de B1.church; consulte [Editar su perfil](/docs/b1-church/getting-started/me-page).
- **Minimum Age for Private Messages** -- Un control de seguridad infantil. B1 no abrirá una **nueva** conversación de mensajería privada cuando cualquiera de las dos personas sea menor de esta edad, según su fecha de nacimiento (si no hay fecha de nacimiento registrada, se usa el rol del hogar como alternativa). Las personas menores de esa edad siguen siendo totalmente visibles en el directorio; solo se bloquea la mensajería directa, **en ambas direcciones**, para todos, incluido el personal. Las conversaciones grupales y el envío de mensajes a los padres de un menor siguen funcionando. Las opciones son Off, 13, 16 o 18; el valor predeterminado es **18**. Las conversaciones existentes no se ven afectadas.

:::tip
Como la verificación de edad mínima depende de las fechas de nacimiento, asegúrese de completar las fechas de nacimiento de los niños de su congregación. Esta configuración pertenece a la misma familia de controles de seguridad infantil que los [controles de seguridad del registro de entrada](../attendance/checkin-safety.md).
:::

### Aviso de inicio de sesión en la pantalla de inicio

Los visitantes que abren la [pantalla de inicio](/docs/b1-church/getting-started/navigating#home) de la app sin iniciar sesión ven un breve aviso (de forma predeterminada, *"Inicie sesión para ver sus grupos, ofrendas y más."*) junto a un botón **Sign In**. La configuración **Home screen sign-in prompt** de la misma página Member portal (`/mobile/b1-mobile`) le permite cambiarlo:

- **Show sign-in prompt on the app home screen** -- Desactive esta opción para ocultar de la pantalla de inicio tanto el aviso como el botón **Sign In**. Los visitantes aún pueden iniciar sesión desde el menú de la app.
- **Sign-in prompt text** -- Reemplace el texto predeterminado por su propio mensaje (hasta 150 caracteres). Déjelo en blanco para usar el texto predeterminado. Este campo queda deshabilitado mientras el aviso esté desactivado.

Haga clic en **Save** para aplicar los cambios. Un mensaje **Saved** confirma el cambio. Al guardar, se actualiza la configuración en caché de la app, de modo que el cambio se verá la próxima vez que se cargue la pantalla de inicio.

### Mosaicos de la pantalla de inicio

Las pestañas que tienen una foto (consulte **Image** en [Agregar una nueva pestaña](#adding-a-new-tab)) aparecen en la [pantalla de inicio](/docs/b1-church/getting-started/navigating#home) de la app como mosaicos fotográficos, en una sección con el nombre de su iglesia como encabezado. Esto incluye una pestaña de Verse of the Day, si le asigna una foto. Las pestañas con foto también aparecen en la barra de pestañas.

La configuración **Home screen tiles** de la misma página Member portal (`/mobile/b1-mobile`) controla cómo se distribuyen esos mosaicos. Elija un **Layout**:

- **Grid** -- Dos mosaicos por fila (el valor predeterminado). Cuando el número de mosaicos es impar, el primero ocupa todo el ancho.
- **Scrolling row** -- Una fila de mosaicos que los miembros deslizan hacia los lados.
- **Scrolling (automatic)** -- La misma fila deslizable, pero que además se mueve sola, avanzando un mosaico aproximadamente cada cuatro segundos y volviendo al primero después del último. Se detiene cuando un miembro toca, pasa el cursor sobre la fila o navega a ella con la tecla Tab, y se reanuda unos segundos después. En dispositivos con la opción de reducir movimiento activada, la fila permanece quieta y funciona como **Scrolling row**.
- **List** -- Una lista con una pequeña miniatura de la foto junto al nombre de cada pestaña.

En ambos diseños deslizables, cuando hay más mosaicos de los que caben en el ancho de la pantalla, aparece una fila de puntos debajo de los mosaicos, uno por cada mosaico, con el punto del mosaico actual relleno. Los miembros pueden tocar un punto para ir directamente a ese mosaico.

Haga clic en **Save** para aplicar los cambios.

### Secciones de la pantalla de inicio

Los miembros que han iniciado sesión siempre ven su historial de asistencia y los formularios enviados en la [página Me](/docs/b1-church/getting-started/me-page). Los interruptores de **Home screen sections** de la misma página Member portal (`/mobile/b1-mobile`) permiten mostrarlos también en la pantalla de inicio:

- **Show My Attendance on Home** -- Agrega una sección **My Attendance** con la cantidad de veces que el miembro asistió en los últimos 90 días, sus dos visitas más recientes y un enlace **History** a su lista completa de asistencia.
- **Show My Forms on Home** -- Agrega una sección **My Forms** con las dos envíos de formularios más recientes del miembro y un enlace **All forms**.

Ambas opciones están desactivadas de forma predeterminada. Cada sección solo aparece para los miembros que han iniciado sesión y tienen al menos un registro para mostrar. Haga clic en **Save** para aplicar los cambios.

## Dónde aparecen estas pestañas

Las pestañas que configura aquí se muestran en la **PWA de B1.church** que sus miembros instalan desde cualquier página de `https://yourchurchname.b1.church`. Los cambios que realice en esta página se reflejan la próxima vez que un miembro abra la app.

En un teléfono, la barra de pestañas inferior muestra **Home**, hasta tres de sus pestañas y **More**; en una computadora, el encabezado muestra hasta cinco. Las pantallas integradas (como Sermons, Giving o Groups) ocupan primero esos espacios, y las pestañas **Internal Page** llenan los espacios que queden libres. Las pestañas **External URL** y **Verse of the Day** nunca ocupan un espacio. Todas las pestañas, incluidas las que no caben, aparecen en la página **More** de la app.

Las pestañas colocadas dentro de una pestaña **Folder** son la excepción: solo aparecen en la pantalla de esa carpeta, a la que los miembros acceden tocando la carpeta. Esa pantalla muestra las pestañas como mosaicos fotográficos cuando todas tienen imagen, o como lista en caso contrario. Una carpeta que no contiene pestañas visibles para un miembro queda oculta para ese miembro. Consulte [Pestañas de carpeta](../../b1-church/getting-started/navigating.md#folder-tabs). Consulte [Navegación en B1App](../../b1-church/getting-started/navigating.md) para ver lo que observan los miembros.

## Próximos pasos

- [Configuración de la iglesia](./church-settings.md) -- Configure la información y la identidad visual de su iglesia
- [Roles y permisos](./roles-permissions.md) -- Administre el acceso de su equipo
