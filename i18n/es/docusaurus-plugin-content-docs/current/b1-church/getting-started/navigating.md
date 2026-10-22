---
title: "Navegación por B1App"
---

# Navegación por B1App

<div class="article-intro">

El portal de miembros de B1.church es una aplicación web pensada para el teléfono que funciona bajo `/mobile`. Funciona en cualquier navegador y se puede instalar en la pantalla de inicio. Esta página explica el panel Home, la barra de pestañas inferior, la página More y la página Me.

</div>

<div class="prereqs">
<h4>Antes de empezar</h4>

- Necesitas [iniciar sesión](./logging-in.md) para ver tu información personal. Los visitantes que no han iniciado sesión pueden seguir viendo el contenido público, y se les ofrece un botón **Sign In** cuando una función requiere una cuenta.

</div>

## Home {#home}

Al abrir `https://yourchurchname.b1.church/mobile` se llega al panel **Home** en `/mobile/dashboard`. Home es la página de inicio del portal de miembros. Empieza con un saludo ("Good morning", "Good afternoon" o "Good evening", seguido de tu nombre) y la fecha de hoy, y después muestra secciones que solo aparecen cuando corresponden:

- **Photo tiles** -- Las pestañas a las que tu iglesia asignó una foto (incluida Verse of the Day) aparecen como mosaicos de foto bajo el nombre de tu iglesia. Según la elección de tu iglesia, se presentan en una cuadrícula de dos columnas, en una fila que se desliza lateralmente o en una lista con una pequeña miniatura junto a cada nombre; consulta [Mosaicos de la pantalla de inicio](../../b1-admin/settings/mobile-app.md#home-screen-tiles). Cada pestaña con foto aparece aquí, incluso si también tiene un espacio en la barra de pestañas.
- **Latest sermon** -- El sermón más reciente de tu iglesia, con un enlace **All sermons**.
- **Verse of the Day** -- El versículo de hoy; tócalo para abrir la página completa de [Verse of the Day](../content/verse-of-the-day.md).
- **You're serving** -- Tus próximas asignaciones de servicio, con un enlace **All plans**. Si alguna asignación todavía necesita tu respuesta, se muestra primero con una insignia **Needs reply** y los botones **Accept** / **Decline**, para que puedas responder desde Home (**Decline** te pide que confirmes primero); si no, tus próximas asignaciones muestran una insignia **Accepted** o **Confirmed**. Toca una asignación para abrir su plan.
- **Your groups** -- Hasta tres de tus grupos, con su horario de reunión y su ubicación, y un enlace **All groups**.
- **Upcoming events** -- Cuando has iniciado sesión, los próximos tres eventos de los grupos a los que perteneces, cada uno con su fecha y hora (y una miniatura si el evento tiene foto). Toca un evento para abrir los eventos de su grupo. Toca **All upcoming events** para abrir la lista completa de próximos eventos en tu [página Me](./me-page.md#upcoming), que también incluye tus asignaciones de servicio y tus inscripciones.
- **Giving** -- Cuánto has donado este año ("Given in" seguido del año actual), un botón **Give** y un enlace **History** a tu [historial de donaciones](../giving/donation-history.md). Se oculta si tu iglesia ha limitado el historial de donaciones de los miembros a un año anterior o lo ha ocultado; en ese caso, la herramienta de donaciones de tu iglesia aparece como un botón bajo **More from**.
- **More from** *tu iglesia* -- Botones para el resto de herramientas que tu iglesia ha activado y que no están ya en la barra de pestañas ni se muestran arriba. Las que más usas pasan al principio.

Las secciones de servicio, grupos y donaciones solo aparecen cuando has iniciado sesión, tu iglesia tiene activada esa herramienta y tienes algo que mostrar; por ejemplo, una asignación próxima o al menos un grupo. En una computadora, Home se distribuye en dos columnas.

Si no has iniciado sesión, Home muestra un encabezado **Welcome** en lugar del saludo, con una breve invitación ("Sign in to see your groups, giving, and more.") y un botón **Sign In**. La invitación aparece incluso si tu iglesia todavía no ha configurado nada más para Home. Tu iglesia puede reformular esta invitación u ocultarla; consulta [Configuración de la aplicación móvil](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Cuando está oculta, aún puedes iniciar sesión desde la página **More** o la página **Me**.

## La barra de pestañas inferior

En un teléfono, una barra de pestañas está fija en la parte inferior de la pantalla:

- **Home** -- Siempre es la primera pestaña
- Hasta tres de las pestañas que configuró tu iglesia
- **More** -- Abre la página More

Las pantallas integradas (como Groups, Giving o Plans) reciben primero los espacios de pestaña; los espacios sobrantes van a las páginas personalizadas de tu iglesia. Solo los enlaces a sitios web externos y Verse of the Day nunca reciben una pestaña. Si tu iglesia ha configurado más pestañas de las que caben, las restantes no se pierden: aparecen en la página **More** y en la sección **More from** de Home. Los administradores de la iglesia establecen el orden de las pestañas en B1 Admin, en **Mobile → Navigation**.

## En una computadora

En una pantalla más ancha, como una computadora o una tableta grande, la barra de pestañas inferior se reemplaza por un encabezado en la parte superior de la pantalla con el color de tu iglesia. Muestra el logotipo de tu iglesia, o su nombre si no hay logotipo (haz clic en él para volver a Home), **Home**, hasta cinco de las pestañas que configuró tu iglesia, y **More**, con la campana y la foto de tu perfil a la derecha. Cuando abres una pantalla de detalle, aparece un enlace **Back** encima del contenido de la página.

## La página More

Al tocar **More** se abre la página More en `/mobile/more`. Contiene:

- Tu nombre y tu foto, con un enlace **Edit Profile**; consulta [Editar tu perfil](./editing-your-profile.md)
- Todas las pestañas que configuró tu iglesia, en orden, bajo el nombre de tu iglesia. Los enlaces a sitios web externos se abren en una nueva pestaña del navegador.
- Una sección **Account** con:
  - **Me** -- Tu página personal (solo si has iniciado sesión)
  - **Appearance** -- Cambia entre **Light Mode** y **Dark Mode**
  - **Admin Portal** -- Solo aparece si tienes permisos de administrador en tu iglesia; abre B1 Admin en una nueva pestaña
  - **Install App** -- Abre las [instrucciones de instalación](./installing-pwa.md) en `/mobile/install` (se oculta una vez instalada la aplicación)
- **Sign out**, o un botón **Sign In** si no has iniciado sesión
- El nombre de tu iglesia y un enlace a la política de privacidad

## La barra superior

En un teléfono, la barra superior de cada pantalla muestra:

- El logotipo de tu iglesia (o su nombre, si no ha subido un logotipo) en Home y en las demás pantallas principales, o una flecha para volver atrás cuando has entrado en una pantalla de detalle. El título de la pantalla aparece en la parte superior de la página.
- Un icono de **campana** para notificaciones y mensajes, con una insignia para los elementos no leídos; consulta [Notificaciones y mensajes](#notifications-and-messages) más abajo
- Tu **foto de perfil**, que abre tu perfil en `/mobile/profileEdit`; consulta [Editar tu perfil](./editing-your-profile.md)

La campana y la foto de perfil solo aparecen cuando has iniciado sesión.

## Notificaciones y mensajes {#notifications-and-messages}

Al tocar la campana se abre un panel con dos secciones:

- **Messages** -- Tus conversaciones privadas más recientes, con un enlace **New message** para iniciar una nueva
- **Notifications** -- Tus notificaciones más recientes, con una insignia **New** en las no leídas. Toca una notificación para ir al grupo, plan o conversación de donde proviene.

Cada sección muestra cuántos elementos no leídos tiene. Toca **See all** en la parte inferior para abrir tu bandeja de entrada completa en `/mobile/notifications`.

## Páginas con secciones

Las páginas de detalle (un grupo, un plan, tu página Me, y las pantallas Plans y Giving) se organizan como una página de secciones en lugar de pestañas. Cada sección muestra una vista previa breve, y un enlace en el encabezado de la sección (como **All members**, **All events** o **Full service order**) abre la lista completa. Un enlace **Back to** en la parte superior de esa vista te devuelve a la página de origen.

## La página Me

**Me** (`/mobile/me`) es tu centro personal. Muestra tu nombre y tu foto con los botones **Edit Profile** y **Settings** ([preferencias de notificación](./notification-preferences.md)), y después lo que tienes próximo (asignaciones de servicio, inscripciones a eventos y eventos de grupo), seguido de tu hogar, tus grupos, tus [donaciones](../giving/) de este año, los formularios que has enviado, tu historial de asistencia, tus [inscripciones](../events/my-registrations.md) y tus notificaciones y mensajes recientes. Consulta [La página Me](./me-page) para más detalles.

Si has cerrado sesión, la página Me muestra un botón **Sign In** en su lugar.

## Instalar en tu pantalla de inicio

El portal de miembros es una Progressive Web App. Visita `/mobile/install` (o elige **Install App** en la página More) para ver instrucciones paso a paso según tu dispositivo. Una vez instalada, se abre a pantalla completa desde tu pantalla de inicio, sin los elementos del navegador. Consulta [Instalar como aplicación (PWA)](./installing-pwa.md).

## El sitio público de tu iglesia

Fuera del portal de miembros, el sitio público de tu iglesia tiene su propia navegación de encabezado con enlaces que configuraron tus administradores; páginas como [sermones](../content/sermons.md), la [Biblia](../content/bible.md), [transmisiones en vivo](../content/live-streaming.md) y una lista pública de grupos. En un teléfono, esos enlaces están detrás del icono de menú hamburguesa en la esquina superior derecha del encabezado.

:::info
Las pestañas y herramientas que ves varían según la iglesia. Los administradores controlan qué secciones son visibles para los miembros desde B1 Admin, así que si no ves una función descrita aquí, es posible que tu iglesia no la haya activado.
:::
