---
title: "Navegación por B1App"
description: "Encuentra tu camino en el portal de miembros de B1.church desde un teléfono o una computadora: el panel de inicio, la barra de pestañas inferior, la página Más y la página Yo."
---

# Navegación por B1App

<div class="article-intro">

El portal de miembros de B1.church es una aplicación web pensada para el teléfono que se encuentra en `/mobile`. Funciona en cualquier navegador y se puede instalar en la pantalla de inicio. Esta página explica el panel de inicio, la barra de pestañas inferior, la página Más y la página Yo.

</div>

## Video de recorrido

<YouTube id="8XKRZvvAbXg" title="Recorrido por la aplicación para miembros de B1.church" next="Recorrido por B1 Check-In" nextUrl="/docs/b1-checkin" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesitas [iniciar sesión](./logging-in.md) para ver tu información personal. Los visitantes que no han iniciado sesión todavía pueden ver el contenido público y, cuando una función requiere una cuenta, se les muestra un botón **Iniciar sesión**.

</div>

## Inicio {#home}

Al abrir `https://yourchurchname.b1.church/mobile` se accede al panel de **Inicio** en `/mobile/dashboard`. Inicio es la página de bienvenida del portal de miembros. Comienza con un saludo ("Buenos días", "Buenas tardes" o "Buenas noches" seguido de tu nombre) y la fecha de hoy, seguido de secciones que solo aparecen cuando corresponden:

- **Mosaicos de fotos** -- las pestañas a las que tu iglesia asignó una foto (incluido el Versículo del día) aparecen como mosaicos de fotos debajo del nombre de tu iglesia. Según la elección de tu iglesia, se muestran en una cuadrícula de dos columnas, en una fila que se desliza hacia los lados (que también puede avanzar sola), o en una lista con una pequeña miniatura junto a cada nombre; consulta [Mosaicos de la pantalla de inicio](../../b1-admin/settings/mobile-app.md#home-screen-tiles). Cuando la fila deslizable tiene más mosaicos de los que caben en pantalla, debajo aparece una fila de puntos que indica dónde estás; toca un punto para ir a ese mosaico. La fila sigue avanzando y, después del último mosaico, vuelve a empezar desde el primero. Todas las pestañas con foto aparecen aquí, incluso una que también tenga un lugar en la barra de pestañas.
- **Último sermón** -- el sermón más reciente de tu iglesia, con un enlace **Todos los sermones**
- **Versículo del día** -- el versículo de hoy; tócalo para abrir la página completa del [Versículo del día](../content/verse-of-the-day.md)
- **Estás sirviendo** -- tus próximas asignaciones de servicio, con un enlace **Todos los planes**. Si alguna asignación todavía necesita tu respuesta, se muestra primero con una insignia **Requiere respuesta** y los botones **Aceptar** / **Rechazar**, para que puedas responder desde Inicio (**Rechazar** te pide confirmación primero); de lo contrario, tus próximas asignaciones muestran una insignia **Aceptado** o **Confirmado**. Toca una asignación para abrir su plan.
- **Tus grupos** -- hasta tres de tus grupos con su horario y lugar de reunión, y un enlace **Todos los grupos**
- **Próximos eventos** -- cuando has iniciado sesión, tus próximos tres eventos de grupo y tus próximas inscripciones a eventos aparecen juntos, en orden cronológico, cada uno con su fecha y hora (y una miniatura si el evento tiene foto). Cada fila lleva la etiqueta **Evento** (un evento de un grupo al que perteneces) o **Inscripción** (un evento en el que te has [inscrito](../events/registering.md)); un evento en el que estás inscrito aparece una sola vez, como inscripción. Toca un evento para abrir los eventos de su grupo, o una inscripción para abrir tus [inscripciones](../events/my-registrations.md). Toca **Todos los próximos eventos** para abrir la lista completa de próximos en tu [página Yo](./me-page.md#upcoming), que también incluye tus asignaciones de servicio e inscripciones.
- **Mi asistencia** y **Mis formularios** -- si tu iglesia los activa, cuántas veces asististe en los últimos 90 días con tus dos visitas más recientes, y tus dos envíos de formularios más recientes, con enlaces a las listas completas. Estos siempre aparecen en tu [página Yo](./me-page.md) de todos modos; consulta [Secciones de la pantalla de inicio](../../b1-admin/settings/mobile-app.md#home-screen-sections).
- **Donaciones** -- cuánto has dado este año ("Donado en" el año actual), un botón **Donar** (solo se muestra si tu iglesia ofrece donaciones en línea) y un enlace **Historial** a tu [historial de donaciones](../giving/donation-history.md). Se oculta si tu iglesia limitó el historial de donaciones de los miembros a un año anterior o lo ocultó; en ese caso, la herramienta de donaciones de tu iglesia aparece como un botón en **Más de** en su lugar.
- **Más de** *tu iglesia* -- botones para el resto de las herramientas que tu iglesia activó y que no están ya en la barra de pestañas ni mostradas arriba. Las que más usas se mueven al principio.

Las secciones de servicio, grupos, asistencia, formularios y donaciones solo aparecen cuando has iniciado sesión, tu iglesia tiene activada esa herramienta y tienes algo que mostrar; por ejemplo, una asignación próxima o al menos un grupo. En una computadora, Inicio se distribuye en dos columnas.

Si no has iniciado sesión, Inicio muestra un encabezado **Bienvenido** en lugar del saludo, con una breve invitación ("Inicia sesión para ver tus grupos, donaciones y más.") y un botón **Iniciar sesión**. La invitación se muestra incluso cuando tu iglesia todavía no ha configurado nada más para Inicio. Tu iglesia puede reformular esta invitación u ocultarla -- consulta [Configuración de la aplicación móvil](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Cuando está oculta, aún puedes iniciar sesión desde la página **Más** o la página **Yo**.

## La barra de pestañas inferior

En un teléfono, una barra de pestañas está fija en la parte inferior de la pantalla:

- **Inicio** -- siempre es la primera pestaña
- Hasta tres de las pestañas que configuró tu iglesia
- **Más** -- abre la página Más

Las pantallas integradas (como Grupos, Donaciones o Planes) reciben primero los espacios de pestaña; los espacios que queden libres van a las páginas personalizadas de tu iglesia. Solo los enlaces a sitios web externos y el Versículo del día nunca reciben una pestaña. Si tu iglesia configuró más pestañas de las que caben, las demás no se pierden: aparecen en la página **Más** y en la sección **Más de** de Inicio. Los administradores de la iglesia definen el orden de las pestañas en B1 Admin, en **Móvil → Navegación**.

### Pestañas de carpeta {#folder-tabs}

Tu iglesia puede agrupar varias pestañas en una **carpeta**. Una carpeta aparece como cualquier otra pestaña -- en la barra de pestañas, en la página **Más** o como mosaico de foto en Inicio -- y al tocarla se abre una pantalla con el nombre de la carpeta que enumera las pestañas que contiene. Si todas las pestañas de la carpeta tienen foto, se muestran como mosaicos de fotos; de lo contrario, se muestran como lista. Los enlaces a sitios web externos dentro de una carpeta se abren en una nueva pestaña del navegador. Las pestañas dentro de una carpeta solo aparecen en la pantalla de la carpeta, no en la barra de pestañas ni en la página **Más**. Una carpeta sin nada visible para ti se oculta.

## En una computadora

En una pantalla más ancha, como una computadora o una tableta grande, la barra de pestañas inferior se reemplaza por un encabezado en la parte superior de la pantalla con el color de tu iglesia. Muestra el logotipo de tu iglesia, o su nombre si no hay logotipo (haz clic para volver a Inicio), **Inicio**, hasta cinco de las pestañas configuradas por tu iglesia, y **Más**, con la campana y tu foto de perfil a la derecha. Cuando abres una pantalla de detalle, aparece un enlace **Atrás** encima del contenido de la página.

## La página Más

Al tocar **Más** se abre la página Más en `/mobile/more`. Contiene:

- Tu nombre y foto, con un enlace **Editar perfil** — consulta [Editar tu perfil](./editing-your-profile.md)
- Todas las pestañas que configuró tu iglesia, en orden, bajo el nombre de tu iglesia. Los enlaces a sitios externos se abren en una nueva pestaña del navegador.
- Una sección **Cuenta** con:
  - **Yo** -- tu página personal (solo con sesión iniciada)
  - **Apariencia** -- cambia entre **Modo claro** y **Modo oscuro**
  - **Portal de administración** -- solo se muestra si tienes permisos de administrador en tu iglesia; abre B1 Admin en una nueva pestaña
  - **Instalar la aplicación** -- abre las [instrucciones de instalación](./installing-pwa.md) en `/mobile/install` (se oculta una vez instalada la aplicación)
- **Cerrar sesión**, o un botón **Iniciar sesión** si no has iniciado sesión
- El nombre de tu iglesia y un enlace a la política de privacidad

## La barra de la aplicación

En un teléfono, la barra superior de cada pantalla muestra:

- El logotipo de tu iglesia (o su nombre, si no ha subido un logotipo) en Inicio y en las demás pantallas principales, o una flecha de retroceso cuando estás dentro de una pantalla de detalle. El título de la pantalla aparece en la parte superior de la página.
- Un ícono de **campana** para notificaciones y mensajes, con un distintivo para los elementos no leídos -- consulta [Notificaciones y mensajes](#notifications-and-messages) más abajo
- Tu **foto de perfil**, que abre tu perfil en `/mobile/profileEdit` — consulta [Editar tu perfil](./editing-your-profile.md)

La campana y la foto de perfil solo aparecen cuando has iniciado sesión.

## Notificaciones y mensajes

Al tocar la campana se abre un panel con dos secciones:

- **Mensajes** -- tus conversaciones privadas más recientes, con un enlace **Nuevo mensaje** para iniciar una
- **Notificaciones** -- tus notificaciones más recientes, con un distintivo **Nuevo** en las no leídas. Toca una notificación para ir al grupo, plan o conversación de la que proviene.

Cada sección muestra cuántos elementos no leídos tiene. Toca **Ver todo** en la parte inferior para abrir tu bandeja de entrada completa en `/mobile/notifications`.

## Páginas con secciones

Las páginas de detalle -- un grupo, un plan, tu página Yo, las pantallas de Planes y Donaciones -- se organizan como una página de secciones en lugar de pestañas. Cada sección muestra una vista previa breve, y un enlace en el encabezado de la sección (como **Todos los miembros**, **Todos los eventos** o **Orden completo del servicio**) abre la lista completa. Un enlace **Volver a** en la parte superior de esa vista te devuelve a la página desde la que llegaste.

## La página Yo

**Yo** (`/mobile/me`) es tu centro personal. Muestra tu nombre y foto con los botones **Editar perfil** y **Configuración** ([preferencias de notificación](./notification-preferences.md)), luego lo que tienes por delante -- asignaciones de servicio, inscripciones a eventos y eventos de grupo -- seguido de tu hogar, tus grupos, tus [donaciones](../giving/index.md) de este año, los formularios que has enviado, tu historial de asistencia, tus [inscripciones](../events/my-registrations.md), y tus notificaciones y mensajes recientes. Consulta [La página Yo](./me-page.md) para más detalles.

Si no has iniciado sesión, la página Yo muestra un botón **Iniciar sesión** en su lugar.

## Instalar en la pantalla de inicio

El portal de miembros es una aplicación web progresiva. Visita `/mobile/install` (o elige **Instalar la aplicación** en la página Más) para ver instrucciones paso a paso para tu dispositivo. Una vez instalada, se abre a pantalla completa desde la pantalla de inicio, sin elementos del navegador. Consulta [Instalar como aplicación (PWA)](./installing-pwa.md).

## El sitio web público de tu iglesia

Fuera del portal de miembros, el sitio web público de tu iglesia tiene su propia navegación de encabezado con enlaces que configuraron tus administradores -- páginas como [sermones](../content/sermons.md), la [Biblia](../content/bible.md), [transmisión en vivo](../content/live-streaming.md), y una lista pública de grupos. En un teléfono, esos enlaces están detrás del ícono de hamburguesa en la esquina superior derecha del encabezado.

:::info
Las pestañas y herramientas que ves varían según la iglesia. Los administradores controlan qué secciones son visibles para los miembros a través de B1 Admin, así que si no ves una función descrita aquí, es posible que tu iglesia no la haya activado.
:::
