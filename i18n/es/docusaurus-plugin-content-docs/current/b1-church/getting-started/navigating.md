---
title: "Navegar por B1App"
---

# Navegar por B1App

<div class="article-intro">

El portal de miembros de B1.church es una aplicación web pensada para el teléfono que vive bajo `/mobile`. Funciona en cualquier navegador y se puede instalar en la pantalla de inicio. Esta página explica el panel Home, la barra de pestañas inferior, la página More y la página Me.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesitas [haber iniciado sesión](./logging-in.md) para ver tu información personal. Los visitantes sin sesión todavía pueden explorar el contenido público, y en las funciones que requieren una cuenta se les ofrece un botón **Sign In**.

</div>

## Home

Al abrir `https://nombredetuiglesia.b1.church/mobile` llegas al panel **Home** en `/mobile/dashboard`. Home es la página de inicio del portal de miembros. Comienza con un saludo ("Good morning", "Good afternoon" o "Good evening", seguido de tu nombre) y la fecha de hoy, y después muestra secciones que solo aparecen cuando corresponden:

- **Latest sermon**: el sermón más reciente de tu iglesia, con un enlace **All sermons**
- **Verse of the Day**: el versículo de hoy; tócalo para abrir la página completa de [Verse of the Day](../content/verse-of-the-day.md)
- **You're serving**: tus próximas asignaciones de servicio, con un enlace **All plans**. Si alguna asignación todavía necesita tu respuesta, aparece primero con una insignia **Needs reply** y los botones **Accept** / **Decline** para responder desde Home; si no, tus próximas asignaciones muestran una insignia **Accepted** o **Confirmed**. Toca una asignación para abrir su plan.
- **Your groups**: hasta tres de tus grupos con su horario de reunión y ubicación, y un enlace **All groups**
- **Giving**: cuánto has dado este año ("Given in" el año actual), un botón **Give** y un enlace **History** a tu [historial de donaciones](../giving/donation-history.md)
- **More from** *tu iglesia*: botones para el resto de las herramientas que tu iglesia ha activado y que no están ya en la barra de pestañas ni se muestran arriba. Las que más usas pasan al frente.

Las secciones de servicio, grupos y ofrendas solo aparecen cuando has iniciado sesión, tu iglesia tiene activada esa herramienta y tienes algo que mostrar; por ejemplo, una asignación próxima o al menos un grupo. En una computadora, Home se distribuye en dos columnas.

Si no has iniciado sesión, Home muestra un encabezado **Welcome** en lugar del saludo, con una breve invitación ("Sign in to see your groups, giving, and more.") y un botón **Sign In**. Tu iglesia puede cambiar este texto u ocultarlo; consulta [Configuración de la app móvil](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Cuando está oculto, aún puedes iniciar sesión desde la página **More** o la página **Me**.

## La barra de pestañas inferior

En un teléfono, una barra de pestañas está fija en la parte inferior de la pantalla:

- **Home**: siempre es la primera pestaña
- Hasta tres de las pestañas que configuró tu iglesia
- **More**: abre la página More

Los enlaces a sitios web externos, páginas personalizadas y el Verse of the Day nunca reciben una pestaña. Si tu iglesia configuró más pestañas de las que caben, el resto no se pierde: aparecen en la página **More** y en la sección **More from** de Home. Los administradores de la iglesia definen el orden de las pestañas en B1 Admin, en **Mobile → Navigation**.

## En una computadora

En una pantalla más ancha, como una computadora o una tableta grande, la barra de pestañas inferior se reemplaza por un encabezado en la parte superior de la pantalla con el color de tu iglesia. Muestra el nombre de tu iglesia (haz clic en él para volver a Home), **Home**, hasta cinco de las pestañas que configuró tu iglesia y **More**, con la campana y la foto de tu perfil a la derecha. Cuando abres una pantalla de detalle, aparece un enlace **Back** encima del contenido de la página.

## La página More

Al tocar **More** se abre la página More en `/mobile/more`. Contiene:

- Tu nombre y foto, con un enlace **Edit Profile**; consulta [Editar tu perfil](./editing-your-profile.md)
- Todas las pestañas que configuró tu iglesia, en orden, bajo el nombre de tu iglesia. Los enlaces a sitios externos se abren en una nueva pestaña del navegador.
- Una sección **Account** con:
  - **Me**: tu página personal (solo con sesión iniciada)
  - **Appearance**: cambia entre **Light Mode** y **Dark Mode**
  - **Admin Portal**: solo aparece si tienes permisos de administrador en tu iglesia; abre B1 Admin en una nueva pestaña
  - **Install App**: abre las [instrucciones de instalación](./installing-pwa.md) en `/mobile/install` (se oculta una vez instalada la app)
- **Sign out**, o un botón **Sign In** si no has iniciado sesión
- El nombre de tu iglesia y un enlace a la política de privacidad

## La barra superior

En un teléfono, la barra superior de cada pantalla muestra:

- El nombre de tu iglesia en Home y en las demás pantallas principales, o una flecha de regreso cuando estás en una pantalla de detalle. El título de la pantalla aparece en la parte superior de la página.
- Un icono de **campana** para notificaciones y mensajes, con una insignia para los elementos sin leer; consulta [Notificaciones y mensajes](#notificaciones-y-mensajes) más abajo
- Tu **foto de perfil**, que abre tu perfil en `/mobile/profileEdit`; consulta [Editar tu perfil](./editing-your-profile.md)

La campana y la foto de perfil solo aparecen cuando has iniciado sesión.

## Notificaciones y mensajes

Al tocar la campana se abre un panel con dos secciones:

- **Messages**: tus conversaciones privadas más recientes, con un enlace **New message** para iniciar una nueva
- **Notifications**: tus notificaciones más recientes, con una insignia **New** en las que no has leído. Toca una notificación para ir al grupo, plan o conversación de donde proviene.

Cada sección muestra cuántos elementos sin leer tiene. Toca **See all** en la parte inferior para abrir tu bandeja completa en `/mobile/notifications`.

## Páginas con secciones

Las páginas de detalle (un grupo, un plan, tu página Me, y las pantallas de Plans y Giving) se organizan como una sola página con secciones en lugar de pestañas. Cada sección muestra una vista previa breve, y un enlace en el encabezado de la sección (como **All members**, **All events** o **Full service order**) abre la lista completa. Un enlace **Back to** en la parte superior de esa vista te devuelve a la página de la que vienes.

## La página Me

**Me** (`/mobile/me`) es tu centro personal. Muestra tu nombre y foto con los botones **Edit Profile** y **Settings** ([preferencias de notificación](./notification-preferences.md)), y después lo que se acerca para ti (asignaciones de servicio, inscripciones a eventos y eventos de grupo), seguido de tu hogar, tus grupos, tus [ofrendas](../giving/) de este año, tus [inscripciones](../events/my-registrations.md) y tus notificaciones y mensajes recientes. Consulta [La página Me](./me-page) para más detalles.

Si no has iniciado sesión, la página Me muestra un botón **Sign In** en su lugar.

## Instalar en la pantalla de inicio

El portal de miembros es una Progressive Web App. Visita `/mobile/install` (o elige **Install App** en la página More) para ver instrucciones paso a paso según tu dispositivo. Una vez instalada, se abre a pantalla completa desde tu pantalla de inicio, sin elementos del navegador. Consulta [Instalar como app (PWA)](./installing-pwa.md).

## El sitio web público de tu iglesia

Fuera del portal de miembros, el sitio web público de tu iglesia tiene su propia navegación en el encabezado, con enlaces que configuraron tus administradores: páginas como [sermones](../content/sermons.md), la [Biblia](../content/bible.md), [transmisión en vivo](../content/live-streaming.md) y una lista pública de grupos. En un teléfono, esos enlaces están detrás del icono de hamburguesa en la esquina superior derecha del encabezado.

:::info
Las pestañas y herramientas que ves varían según la iglesia. Los administradores controlan qué secciones son visibles para los miembros desde B1 Admin, así que si no ves una función descrita aquí, es posible que tu iglesia no la haya activado.
:::
