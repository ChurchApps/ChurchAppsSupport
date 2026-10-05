---
title: "Navegando B1App"
---

# Navegando B1App

<div class="article-intro">

El portal de miembros en B1.church es una aplicación web optimizada para teléfonos que vive bajo `/mobile`. Funciona en cualquier navegador y se puede instalar en tu pantalla de inicio. Esta página explica el panel de Inicio, la barra de pestañas inferior, el menú Más y la página Mi.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Necesitas estar [iniciado sesión](./logging-in.md) para ver tu información personal. Los visitantes sin iniciar sesión aún pueden navegar contenido público y se les ofrece un botón **Iniciar Sesión** donde una característica requiere una cuenta.

</div>

## Inicio

Abrir `https://yourchurchname.b1.church/mobile` te lleva al panel **Inicio** en `/mobile/dashboard`. Inicio es la página de inicio del portal de miembros y muestra:

- Un saludo con tu nombre
- El versículo del día
- Una tarjeta destacada de lo que tu iglesia ha resaltado
- Una cuadrícula **Explorar** de las herramientas que tu iglesia ha activado -- grupos, donaciones, registro, sermones, planes y más

Tocar una tarjeta en Explorar abre esa herramienta. Si tu iglesia tiene más herramientas de las que caben en el panel, la última tarjeta es **Más**, que abre la lista completa en `/mobile/more`.

Si no has iniciado sesión, Inicio muestra un saludo **Bienvenido** en lugar del saludo con tu nombre, con un mensaje corto ("Inicia sesión para ver tus grupos, donaciones y más.") y un botón **Iniciar Sesión**. Tu iglesia puede cambiar este mensaje o ocultarlo -- consulta [Configuración de Aplicación Móvil](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Cuando está oculto, aún puedes iniciar sesión desde el menú o la pestaña Mi.

## La Barra de Pestañas Inferior

En un teléfono, una barra de pestañas está fija en la parte inferior de la pantalla:

- **Inicio** -- siempre la primera pestaña
- Hasta tres de las pestañas que tu iglesia configuró
- **Más** -- abre el menú de navegación

Si tu iglesia ha configurado más de tres pestañas, el resto no se pierden: aparecen en el menú **Más** y en la cuadrícula Explorar del panel. Los administradores de la iglesia establecen el orden de pestañas en B1 Admin bajo **Móvil → Navegación**.

## El Menú

Tocar **Más** abre el menú de navegación. En una tableta o escritorio el mismo menú siempre es visible a lo largo del lado izquierdo de la pantalla. Contiene:

- Tu nombre y foto, con un acceso directo **Editar Perfil** — consulta [Editando tu Perfil](./editing-your-profile.md)
- **Inicio** y **Mi**
- **Portal de Administración** -- solo se muestra si tienes permisos de administrador en tu iglesia; abre B1 Admin
- Cada pestaña que tu iglesia configuró, en orden
- **Instalar Aplicación** -- abre las [instrucciones de instalación](./installing-pwa.md) en `/mobile/install`
- Un interruptor de modo claro/oscuro
- **Iniciar Sesión** o **Cerrar Sesión**
- El nombre de tu iglesia y un enlace a la política de privacidad

## La Barra de Aplicaciones

La barra en la parte superior de cada pantalla muestra:

- El título de la pantalla, o el nombre de tu iglesia en Inicio
- Una flecha hacia atrás cuando has profundizado en una pantalla de detalles
- Un icono de **campana** para notificaciones y mensajes, con un distintivo para elementos no leídos
- Tu **foto de perfil**, que abre tu perfil en `/mobile/profileEdit` — consulta [Editando tu Perfil](./editing-your-profile.md)

## La Página Mi

**Mi** (`/mobile/me`) es tu centro personal. Enumera atajos a tu perfil, [preferencias de notificación](./notification-preferences.md), mensajes, [donaciones](../giving/), y [registros](../events/my-registrations.md), seguido de lo que se acerca para ti -- asignaciones de voluntariado, registros de eventos y eventos de grupos -- y tus notificaciones más recientes. Consulta [La Página Mi](./me-page) para más detalles.

Si no has iniciado sesión, la página Mi muestra un botón **Iniciar Sesión** en su lugar.

## Instalando en Tu Pantalla de Inicio

El portal de miembros es una Aplicación Web Progresiva. Visita `/mobile/install` (o elige **Instalar Aplicación** en el menú) para instrucciones paso a paso para tu dispositivo. Una vez instalada, se abre en pantalla completa desde tu pantalla de inicio sin barra del navegador. Consulta [Instalando como una Aplicación (PWA)](./installing-pwa.md).

## El Sitio Web Público de Tu Iglesia

Fuera del portal de miembros, el sitio web público de tu iglesia tiene su propia navegación de encabezado con enlaces que tus administradores configuraron -- páginas como [sermones](../content/sermons.md), la [Biblia](../content/bible.md), [transmisión en vivo](../content/live-streaming.md), y una lista pública de grupos. En un teléfono esos enlaces viven detrás del icono de hamburguesa en la esquina superior derecha del encabezado.

:::info
Las pestañas y herramientas que ves varían según la iglesia. Los administradores controlan qué secciones son visibles para los miembros a través de B1 Admin, así que si no ves una característica descrita aquí, es posible que tu iglesia no la haya activado.
:::
