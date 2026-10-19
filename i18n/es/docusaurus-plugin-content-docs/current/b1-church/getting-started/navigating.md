---
title: "Navegar por B1App"
---

# Navegar por B1App

<div class="article-intro">

El portal de miembros de B1.church es una aplicación web pensada para el teléfono que vive bajo `/mobile`. Funciona en cualquier navegador y se puede instalar en la pantalla de inicio. Esta página explica el panel de Inicio, la barra de pestañas inferior, la página Más y la página Yo.

</div>

<div class="prereqs">
<h4>Antes de empezar</h4>

- Necesitas [iniciar sesión](./logging-in.md) para ver tu información personal. Los visitantes sin sesión pueden seguir viendo el contenido público y verán un botón **Iniciar sesión** cuando una función requiera una cuenta.

</div>

## Inicio {#home}

Al abrir `https://yourchurchname.b1.church/mobile` llegas al panel **Inicio** en `/mobile/dashboard`. Inicio es la página de bienvenida del portal de miembros. Empieza con un saludo ("Buenos días", "Buenas tardes" o "Buenas noches", con tu nombre) y la fecha de hoy, seguidos de secciones que solo aparecen cuando corresponden:

- **Último sermón** -- el sermón más reciente de tu iglesia, con un enlace **Todos los sermones**
- **Versículo del día** -- el versículo de hoy; tócalo para abrir la página completa de [Versículo del día](../content/verse-of-the-day.md)
- **Estás sirviendo** -- tus próximas asignaciones de servicio, con un enlace **Todos los planes**. Si alguna asignación todavía necesita tu respuesta, se muestra primero con una insignia **Necesita respuesta** y los botones **Aceptar** / **Rechazar**, para que puedas responder desde Inicio (**Rechazar** te pide confirmación antes); en otro caso, tus próximas asignaciones muestran una insignia **Aceptada** o **Confirmada**. Toca una asignación para abrir su plan.
- **Tus grupos** -- hasta tres de tus grupos, con su horario de reunión y su ubicación, y un enlace **Todos los grupos**
- **Donaciones** -- cuánto has dado este año ("Dado en" el año actual), un botón **Dar** y un enlace **Historial** a tu [historial de donaciones](../giving/donation-history.md)
- **Más de** *tu iglesia* -- botones para el resto de herramientas que tu iglesia ha activado y que no están ya en la barra de pestañas ni en la parte superior de esta página. Las que más usas aparecen primero.

Las secciones de servicio, grupos y donaciones solo aparecen cuando has iniciado sesión, tu iglesia tiene activada esa herramienta y tienes algo que mostrar; por ejemplo, una asignación próxima o al menos un grupo. En un ordenador, Inicio se distribuye en dos columnas.

Si no has iniciado sesión, Inicio muestra un encabezado **Bienvenido** en lugar del saludo, con una breve invitación ("Inicia sesión para ver tus grupos, donaciones y más.") y un botón **Iniciar sesión**. La invitación aparece incluso si tu iglesia todavía no ha configurado nada más para Inicio. Tu iglesia puede reformular esta invitación u ocultarla; consulta [Configuración de la app móvil](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Cuando está oculta, puedes seguir iniciando sesión desde la página **Más** o la página **Yo**.

## La barra de pestañas inferior

En un teléfono, una barra de pestañas queda fija en la parte inferior de la pantalla:

- **Inicio** -- siempre es la primera pestaña
- Hasta tres de las pestañas que tu iglesia ha configurado
- **Más** -- abre la página Más

Los enlaces a sitios web externos, páginas personalizadas y el Versículo del día nunca reciben una pestaña. Si tu iglesia ha configurado más pestañas de las que caben, las demás no se pierden: aparecen en la página **Más** y en la sección **Más de** de Inicio. Los administradores de la iglesia establecen el orden de las pestañas en B1 Admin, en **Móvil → Navegación**.

## En un ordenador

En pantallas más anchas, como un ordenador o una tableta grande, la barra de pestañas inferior se sustituye por un encabezado en la parte superior de la pantalla con el color de tu iglesia. Muestra el nombre de tu iglesia (haz clic en él para volver a Inicio), **Inicio**, hasta cinco de las pestañas que tu iglesia ha configurado, y **Más**, con la campana y tu foto de perfil a la derecha. Cuando abres una pantalla de detalle, aparece un enlace **Atrás** encima del contenido de la página.

## La página Más {#the-more-page}

Al tocar **Más** se abre la página Más en `/mobile/more`. Contiene:

- Tu nombre y tu foto, con un enlace **Editar perfil** -- consulta [Editar tu perfil](./editing-your-profile.md)
- Todas las pestañas que tu iglesia ha configurado, en orden, bajo el nombre de tu iglesia. Los enlaces a sitios web externos se abren en una nueva pestaña del navegador.
- Una sección **Cuenta** con:
  - **Yo** -- tu página personal (solo con sesión iniciada)
  - **Apariencia** -- cambia entre **Modo claro** y **Modo oscuro**
  - **Portal de administración** -- solo se muestra si tienes permisos de administrador en tu iglesia; abre B1 Admin en una nueva pestaña
  - **Instalar app** -- abre las [instrucciones de instalación](./installing-pwa.md) en `/mobile/install` (se oculta una vez instalada la aplicación)
- **Cerrar sesión**, o un botón **Iniciar sesión** si no has iniciado sesión
- El nombre de tu iglesia y un enlace a la política de privacidad

## La barra de la aplicación

En un teléfono, la barra superior de cada pantalla muestra:

- El nombre de tu iglesia en Inicio y en las demás pantallas principales, o una flecha de retroceso cuando has entrado en una pantalla de detalle. El título de la pantalla aparece en la parte superior de la propia página.
- Un icono de **campana** para notificaciones y mensajes, con una insignia para los elementos no leídos -- consulta [Notificaciones y mensajes](#notifications-and-messages) más abajo
- Tu **foto de perfil**, que abre tu perfil en `/mobile/profileEdit` -- consulta [Editar tu perfil](./editing-your-profile.md)

La campana y la foto de perfil solo aparecen cuando has iniciado sesión.

## Notificaciones y mensajes {#notifications-and-messages}

Al tocar la campana se abre un panel con dos secciones:

- **Mensajes** -- tus conversaciones privadas más recientes, con un enlace **Nuevo mensaje** para empezar una
- **Notificaciones** -- tus notificaciones más recientes, con una insignia **Nueva** en las no leídas. Toca una notificación para ir al grupo, plan o conversación de la que procede.

Cada sección muestra cuántos elementos no leídos tiene. Toca **Ver todas** al final para abrir tu bandeja de entrada completa en `/mobile/notifications`.

## Páginas con secciones

Las páginas de detalle -- un grupo, un plan, tu página Yo, y las pantallas Planes y Donaciones -- se organizan como una sola página de secciones en lugar de pestañas. Cada sección muestra una vista previa breve, y un enlace en el encabezado de la sección (como **Todos los miembros**, **Todos los eventos** o **Orden completo del servicio**) abre la lista completa. Un enlace **Volver a** en la parte superior de esa vista te devuelve a la página desde la que llegaste.

## La página Yo

**Yo** (`/mobile/me`) es tu centro personal. Muestra tu nombre y tu foto con los botones **Editar perfil** y **Configuración** ([preferencias de notificaciones](./notification-preferences.md)), y después lo que tienes próximo -- asignaciones de servicio, inscripciones a eventos y eventos de grupo--, seguido de tu hogar, tus grupos, tus [donaciones](../giving/) de este año, tus [inscripciones](../events/my-registrations.md), y tus notificaciones y mensajes recientes. Consulta [La página Yo](./me-page) para más detalles.

Si no has iniciado sesión, la página Yo muestra un botón **Iniciar sesión** en su lugar.

## Instalar en la pantalla de inicio

El portal de miembros es una aplicación web progresiva (PWA). Visita `/mobile/install` (o elige **Instalar app** en la página Más) para ver las instrucciones paso a paso para tu dispositivo. Una vez instalada, se abre a pantalla completa desde la pantalla de inicio, sin la interfaz del navegador. Consulta [Instalar como aplicación (PWA)](./installing-pwa.md).

## El sitio web público de tu iglesia

Fuera del portal de miembros, el sitio web público de tu iglesia tiene su propia navegación de encabezado con los enlaces que configuraron tus administradores -- páginas como [sermones](../content/sermons.md), la [Biblia](../content/bible.md), [transmisión en vivo](../content/live-streaming.md) y una lista pública de grupos. En un teléfono, esos enlaces están detrás del icono de hamburguesa en la parte superior derecha del encabezado.

:::info
Las pestañas y herramientas que ves varían según la iglesia. Los administradores controlan qué secciones son visibles para los miembros a través de B1 Admin, así que si no ves una función descrita aquí, es posible que tu iglesia no la haya activado.
:::
