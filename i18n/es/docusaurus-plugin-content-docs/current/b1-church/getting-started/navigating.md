---
title: "Navegación por B1App"
description: "Encuentre su camino en el portal de miembros de B1.church desde un teléfono o una computadora: el panel de inicio, la barra de pestañas inferior, la página Más y la página Yo."
---

# Navegación por B1App

<div class="article-intro">

El portal de miembros de B1.church es una aplicación web pensada para el teléfono, que vive bajo `/mobile`. Funciona en cualquier navegador y se puede instalar en la pantalla de inicio. Esta página explica el panel de inicio, la barra de pestañas inferior, la página Más y la página Yo.

</div>

## Video de recorrido

<YouTube id="8XKRZvvAbXg" title="Recorrido por la aplicación para miembros de B1.church" next="Recorrido por B1 Check-In" nextUrl="/docs/b1-checkin" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita [iniciar sesión](./logging-in.md) para ver su información personal. Los visitantes que no han iniciado sesión pueden seguir viendo el contenido público, y cuando una función requiere una cuenta se les ofrece un botón **Sign In**.

</div>

## Inicio {#home}

Al abrir `https://yourchurchname.b1.church/mobile` se llega al panel **Home** en `/mobile/dashboard`. Home es la página de inicio del portal de miembros. Empieza con un saludo ("Good morning", "Good afternoon" o "Good evening", seguido de su nombre) y la fecha de hoy, y después muestra secciones que solo aparecen cuando corresponden:

- **News** -- si su iglesia lo activa, las últimas entradas del blog de su iglesia como tarjetas con foto que se deslizan solas. Toque una tarjeta para leer la entrada completa sin salir de la app, o toque **All news** para ver la lista completa. Cada entrada tiene un enlace **View on website** a la misma entrada en el sitio web de su iglesia; consulte [Secciones de la pantalla de inicio](../../b1-admin/settings/mobile-app.md#home-screen-sections).
- **Photo tiles** -- las pestañas a las que su iglesia asignó una foto (incluido Verse of the Day) aparecen como mosaicos de foto bajo el nombre de su iglesia. Según la elección de su iglesia, se distribuyen en una cuadrícula de dos columnas, en una fila que se desliza hacia los lados (que además puede avanzar sola), en una lista con una pequeña miniatura junto a cada nombre, o en tres mosaicos destacados (en cuadrícula o en una fila que avanza sola) con el resto enumerado debajo y un enlace **All** a la lista completa; consulte [Mosaicos de la pantalla de inicio](../../b1-admin/settings/mobile-app.md#home-screen-tiles). Cuando la fila deslizable tiene más mosaicos de los que caben en pantalla, aparece debajo una fila de puntos que indica dónde está; toque un punto para ir a ese mosaico. La fila sigue avanzando y, después del último, vuelve al primero. Todas las pestañas con foto aparecen aquí, incluso una que también tenga un lugar en la barra de pestañas.
- **Your follow-ups** -- cuando ha iniciado sesión, sus dos tareas abiertas más recientes y sus tarjetas de flujo de trabajo (primero las tarjetas), con un enlace **All** a la lista completa de **My tasks**. Las tareas y las tarjetas se muestran de la más reciente a la más antigua allí y también en su [página Yo](./me-page.md).
- **Latest sermon** -- el sermón más reciente de su iglesia, con un enlace **All sermons**
- **Verse of the Day** -- el versículo de hoy; tóquelo para abrir la página completa de [Verse of the Day](../content/verse-of-the-day.md)
- **You're serving** -- sus próximas asignaciones de servicio, con un enlace **All plans**. Si alguna asignación todavía necesita su respuesta, se muestran primero con una insignia **Needs reply** y los botones **Accept** / **Decline**, para que pueda responder desde Home (**Decline** le pide confirmación primero); en caso contrario, sus próximas asignaciones muestran una insignia **Accepted** o **Confirmed**. Toque una asignación para abrir su plan.
- **Your groups** -- hasta tres de sus grupos con su horario y lugar de reunión, y un enlace **All groups**
- **Upcoming events** -- cuando ha iniciado sesión, sus próximos tres eventos de grupo y sus próximas inscripciones a eventos juntos, en orden cronológico, cada uno con su fecha y hora (y una miniatura si el evento tiene foto). Cada fila lleva la etiqueta **Event** (un evento de un grupo al que pertenece) o **Registration** (un evento en el que se ha [inscrito](../events/registering.md)); un evento en el que está inscrito aparece una sola vez, como inscripción. Toque un evento para abrir los eventos de su grupo, o una inscripción para abrir sus [inscripciones](../events/my-registrations.md). Toque **All upcoming events** para abrir la lista completa de próximos eventos en su [página Yo](./me-page.md#upcoming), que también incluye sus asignaciones de servicio e inscripciones.
- **My Attendance** y **My Forms** -- si su iglesia los activa, cuántas veces asistió en los últimos 90 días con sus dos visitas más recientes, y sus dos envíos de formularios más recientes, con enlaces a las listas completas. Siempre aparecen en su [página Yo](./me-page.md), estén o no activados aquí; consulte [Secciones de la pantalla de inicio](../../b1-admin/settings/mobile-app.md#home-screen-sections).
- **Giving** -- cuánto ha dado este año ("Given in" el año en curso), un botón **Give** (que solo aparece si su iglesia ofrece donaciones en línea) y un enlace **History** a su [historial de donaciones](../giving/donation-history.md). Se oculta si su iglesia ha limitado el historial de donaciones de los miembros a un año anterior o lo ha ocultado; en ese caso, la herramienta de donaciones de su iglesia aparece como un botón en **More from** en su lugar.
- **More from** *su iglesia* -- botones para el resto de las herramientas que su iglesia ha activado y que no están ya en la barra de pestañas ni se muestran arriba. Las que usa más aparecen primero.

Las secciones de servicio, grupos, asistencia, formularios y donaciones solo aparecen cuando ha iniciado sesión, su iglesia tiene activada esa herramienta y usted tiene algo que mostrar; por ejemplo, una asignación próxima o al menos un grupo. En una computadora, Home se distribuye en dos columnas.

Si no ha iniciado sesión, Home muestra un encabezado **Welcome** en lugar del saludo, con una breve invitación ("Sign in to see your groups, giving, and more.") y un botón **Sign In**. La invitación aparece incluso cuando su iglesia todavía no ha configurado nada más para Home. Su iglesia puede reformular esta invitación u ocultarla; consulte [Configuración de la app móvil](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Cuando está oculta, aún puede iniciar sesión desde la página **More** o la página **Me**.

## La barra de pestañas inferior

En un teléfono, una barra de pestañas queda fija en la parte inferior de la pantalla:

- **Home** -- siempre es la primera pestaña
- Hasta tres de las pestañas que configuró su iglesia
- **More** -- abre la página More

Las pantallas integradas (como Groups, Giving o Plans) reciben primero los espacios de pestaña; los espacios que queden libres pasan a las páginas personalizadas de su iglesia. Solo los enlaces a sitios web externos y Verse of the Day nunca reciben una pestaña. Si su iglesia ha configurado más pestañas de las que caben, las demás no se pierden: aparecen en la página **More** y en la sección **More from** de Home. Los administradores de la iglesia definen el orden de las pestañas en B1 Admin, en **Mobile → Navigation**.

### Pestañas de carpeta {#folder-tabs}

Su iglesia puede agrupar varias pestañas en una **carpeta**. Una carpeta aparece como cualquier otra pestaña (en la barra de pestañas, en la página **More** o como mosaico de foto en Home), y al tocarla se abre una pantalla con el nombre de la carpeta que enumera las pestañas que contiene. Si todas las pestañas de la carpeta tienen foto, se muestran como mosaicos de foto; si no, como lista. Los enlaces a sitios web externos dentro de una carpeta se abren en una pestaña nueva del navegador. Las pestañas dentro de una carpeta solo aparecen en la pantalla de la carpeta, no en la barra de pestañas ni en la página **More**. Una carpeta sin nada visible para usted queda oculta.

## En una computadora

En una pantalla más ancha, como una computadora o una tableta grande, la barra de pestañas inferior se sustituye por un encabezado en la parte superior de la pantalla con el color de su iglesia. Muestra el logotipo de su iglesia, o su nombre si no hay logotipo (haga clic para volver a Home), **Home**, hasta cinco de las pestañas configuradas por su iglesia, y **More**, con la campana y su foto de perfil a la derecha. Cuando abre una pantalla de detalle, aparece un enlace **Back** encima del contenido de la página.

## La página More {#the-more-page}

Al tocar **More** se abre la página More en `/mobile/more`. Contiene:

- Su nombre y foto, con un enlace **Edit Profile**; consulte [Editar su perfil](./editing-your-profile.md)
- Todas las pestañas que configuró su iglesia, en orden, bajo el nombre de su iglesia. Los enlaces a sitios externos se abren en una pestaña nueva del navegador.
- Una sección **Account** con:
  - **Me** -- su página personal (solo con sesión iniciada)
  - **Appearance** -- cambia entre **Light Mode** y **Dark Mode**
  - **Admin Portal** -- solo aparece si tiene permisos de administrador en su iglesia; abre B1 Admin en una pestaña nueva
  - **Install App** -- abre las [instrucciones de instalación](./installing-pwa.md) en `/mobile/install` (se oculta una vez instalada la app)
- **Sign out**, o un botón **Sign In** si no ha iniciado sesión
- El nombre de su iglesia y un enlace a la política de privacidad

## La barra de la app

En un teléfono, la barra superior de cada pantalla muestra:

- El logotipo de su iglesia (o su nombre, si su iglesia no ha subido un logotipo) en Home y en las demás pantallas principales, o una flecha de retroceso cuando ha entrado en una pantalla de detalle. El título de la pantalla aparece en la parte superior de la página.
- Un icono de **campana** para notificaciones y mensajes, con un distintivo para los elementos no leídos; consulte [Notificaciones y mensajes](#notifications-and-messages) más abajo
- Su **foto de perfil**, que abre su perfil en `/mobile/profileEdit`; consulte [Editar su perfil](./editing-your-profile.md)

La campana y la foto de perfil solo aparecen cuando ha iniciado sesión.

## Notificaciones y mensajes {#notifications-and-messages}

Al tocar la campana se abre un panel con dos secciones:

- **Messages** -- sus conversaciones privadas más recientes, con un enlace **New message** para iniciar una
- **Notifications** -- sus notificaciones más recientes, con un distintivo **New** en las no leídas. Toque una notificación para ir al grupo, plan o conversación de la que procede.

Cada sección muestra cuántos elementos no leídos tiene. Toque **See all** en la parte inferior para abrir su bandeja de entrada completa en `/mobile/notifications`.

## Páginas con secciones

Las páginas de detalle (un grupo, un plan, su página Yo, las pantallas de Plans y Giving) se organizan como una página de secciones en lugar de pestañas. Cada sección muestra una vista previa breve, y un enlace en el encabezado de la sección (como **All members**, **All events** o **Full service order**) abre la lista completa. Un enlace **Back to** en la parte superior de esa vista le devuelve a la página desde la que llegó.

## La página Me

**Me** (`/mobile/me`) es su centro personal. Muestra su nombre y foto con los botones **Edit Profile** y **Settings** ([preferencias de notificación](./notification-preferences.md)), y después lo que tiene próximo: asignaciones de servicio, inscripciones a eventos y eventos de grupo; a continuación, su hogar, sus grupos, sus [donaciones](../giving/index.md) de este año, los formularios que ha enviado, su historial de asistencia, sus [inscripciones](../events/my-registrations.md) y sus notificaciones y mensajes recientes. Consulte [La página Me](./me-page.md) para más detalles.

Si no ha iniciado sesión, la página Me muestra en su lugar un botón **Sign In**.

## Instalar en la pantalla de inicio

El portal de miembros es una Progressive Web App. Visite `/mobile/install` (o elija **Install App** en la página More) para ver las instrucciones paso a paso para su dispositivo. Una vez instalada, se abre a pantalla completa desde la pantalla de inicio, sin elementos del navegador. Consulte [Instalar como app (PWA)](./installing-pwa.md).

## El sitio web público de su iglesia

Fuera del portal de miembros, el sitio web público de su iglesia tiene su propia navegación en el encabezado, con enlaces que configuraron sus administradores: páginas como [sermones](../content/sermons.md), la [Biblia](../content/bible.md), la [transmisión en vivo](../content/live-streaming.md) y una lista pública de grupos. En un teléfono, esos enlaces están detrás del icono de hamburguesa en la esquina superior derecha del encabezado.

:::info
Las pestañas y herramientas que ve varían según la iglesia. Los administradores controlan qué secciones son visibles para los miembros a través de B1 Admin, así que si no ve una función descrita aquí, es posible que su iglesia no la haya activado.
:::
