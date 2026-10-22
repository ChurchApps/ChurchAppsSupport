---
title: "Configuración de la app móvil"
---

# Configuración de la app móvil

<div class="article-intro">

La página Mobile App Settings te permite configurar las pestañas de navegación que aparecen en la **experiencia móvil de B1.church (PWA)** para los miembros de tu iglesia. Tú decides qué pestañas son visibles, a qué enlazan y cómo se muestran.

</div>

:::info La aplicación móvil nativa B1 está obsoleta
Las pestañas configuradas aquí se entregan a través de la [aplicación web progresiva (PWA) de B1.church](/docs/b1-church/getting-started/installing-pwa), que ha reemplazado a la aplicación móvil nativa B1. Comparte con tus miembros la página de instalación de tu iglesia: `https://yourchurchname.b1.church/mobile/install`. Allí se les explica cómo instalar la aplicación en su dispositivo, sin necesidad de descargarla desde App Store ni Google Play.
:::

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesitas el permiso "Edit Church Settings". Consulta [Roles y permisos](./roles-permissions.md) si no tienes acceso.
- Configura primero tu [Church Settings](./church-settings.md), incluido el nombre de tu iglesia y su imagen de marca

</div>

## Acceder a la configuración de navegación

1. En B1 Admin, abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda) y expande **Mobile**.
2. Haz clic en **Navigation** (`/mobile/navigation`).
3. La página Navigation muestra las pestañas actuales de tu aplicación.

## Agregar una nueva pestaña

1. Haz clic en el botón **Add Tab** en la parte superior de la página.
2. Completa los datos de la pestaña:
   - **Name** -- La etiqueta que aparece en la pestaña (por ejemplo, "Sermones" o "Dar").
   - **Icon** -- Haz clic en el selector de iconos para elegir un icono para tu pestaña.
   - **Image** -- Haz clic en **Select Image** (o **Change Image**) para asignar una foto a la pestaña. Las pestañas con foto aparecen como mosaicos de fotos en la pantalla de inicio de la aplicación; consulta [Mosaicos de la pantalla de inicio](#home-screen-tiles).
   - **Tab Type** -- Elige entre opciones como Bible, Live Stream, Donation, Website y más.
   - **URL** -- Introduce la dirección web a la que debe enlazar la pestaña.
   - **Visibility** -- Controla quién puede ver esta pestaña (todos, solo miembros, etc.). En una pestaña **Member Directory**, esto solo controla quién ve la pestaña; quién puede abrir el directorio se configura con **Show in Directory** en la página Member portal (consulta [Configuración del directorio de miembros y mensajería](#member-directory--messaging-settings)).
3. Haz clic en **Save Tab** para agregarla a tu aplicación.

## Editar una pestaña existente

1. Haz clic en cualquier pestaña existente de la lista **App Tabs**.
2. Actualiza el nombre, el icono, la URL, el tipo o la configuración de visibilidad de la pestaña.
3. Haz clic en **Save Tab** para aplicar los cambios.

## Reordenar las pestañas

Puedes cambiar el orden en que aparecen las pestañas en la aplicación móvil. Arrastra y suelta las pestañas en la lista para reordenarlas. El orden que se muestra en esta página coincide con el orden que verán tus miembros en la aplicación.

:::info
Algunas pestañas pueden aparecer automáticamente cuando se cumplen ciertas condiciones; por ejemplo, una pestaña de Live Stream puede aparecer cuando hay una transmisión activa. Las pestañas agregadas manualmente te dan control total sobre lo que ven tus miembros en todo momento.
:::

:::tip
Mantén un número de pestañas manejable. Entre tres y cinco pestañas funcionan bien para la mayoría de las iglesias. Demasiadas pestañas pueden hacer confusa la navegación para tus miembros.
:::

## Configuración del directorio de miembros y mensajería

El elemento **Member portal** de la misma sección Mobile contiene la configuración que rige el directorio de miembros y la mensajería privada en la experiencia de B1.church:

- **Directory Approval Group** -- El grupo que revisa las actualizaciones del directorio de miembros y las [solicitudes de eliminación de cuenta](../profile/account-deletion.md) antes de que surtan efecto.
- **Show in Directory** -- Quién puede abrir el directorio de miembros y quién aparece en él: **Staff Only**, **Members & Staff** (la opción predeterminada), **Regular Attendees & Above** o **Everyone (Including Visitors)**. Las personas cuyo estado de membresía está por debajo del nivel que elijas no ven el directorio ni aparecen en él. El personal con el permiso People &gt; View siempre puede abrir el directorio y ver a todos, independientemente de esta configuración.
- **Visibility Preference** -- Establece el valor predeterminado para toda la iglesia para los miembros que aún no han elegido su propia configuración. **Address**, **Phone Number** y **Email** tienen cada uno su propio menú desplegable, con los mismos cinco niveles disponibles en todas partes donde se configura la visibilidad:
  - **Everyone** -- visible para cualquiera, incluidos los visitantes anónimos
  - **Members** -- visible solo para personas con un registro de Member o Staff
  - **Groups Only** -- visible solo para personas que comparten un grupo con esta persona
  - **My Group Leaders and Staff** -- visible solo para los líderes de un grupo al que pertenece esta persona, además del personal
  - **Staff Only** -- visible solo para el personal con el permiso People &gt; View y para la propia persona

  Los miembros pueden cambiar estos valores predeterminados para su propio registro desde la pestaña **Privacy** de su perfil en la PWA de B1.church; consulta [Editar tu perfil](/docs/b1-church/getting-started/me-page).
- **Minimum Age for Private Messages** -- Un control de seguridad infantil. B1 no abrirá una **nueva** conversación de mensajes privados cuando alguna de las dos personas esté por debajo de esta edad, según su fecha de nacimiento (si no hay fecha de nacimiento registrada, se usa como respaldo el rol en el hogar). Las personas menores de esa edad siguen totalmente visibles en el directorio; solo se bloquea la mensajería directa, en **ambos sentidos**, para todos, incluido el personal. Las conversaciones grupales y los mensajes a los padres de un menor siguen funcionando. Las opciones son Off, 13, 16 o 18; el valor predeterminado es **18**. Las conversaciones existentes no se ven afectadas.

:::tip
Como la verificación de edad mínima depende de las fechas de nacimiento, asegúrate de que estén completadas para los niños de tu congregación. Esta configuración forma parte de la misma familia de controles de seguridad infantil que los [controles de seguridad del registro](../attendance/checkin-safety.md).
:::

### Mensaje de inicio de sesión en la pantalla de inicio

Los visitantes que abren la [pantalla de inicio](/docs/b1-church/getting-started/navigating#home) de la aplicación sin iniciar sesión ven un breve mensaje -de forma predeterminada, *"Sign in to see your groups, giving, and more."*- junto a un botón **Sign In**. La configuración **Home screen sign-in prompt** de la misma página Member portal (`/mobile/b1-mobile`) permite cambiarlo:

- **Show sign-in prompt on the app home screen** -- Desactiva esta opción para ocultar tanto el mensaje como el botón **Sign In** de la pantalla de inicio. Los visitantes aún pueden iniciar sesión desde el menú de la aplicación.
- **Sign-in prompt text** -- Reemplaza el texto predeterminado por tu propio mensaje (hasta 150 caracteres). Déjalo en blanco para usar el predeterminado. Este cuadro está deshabilitado mientras el mensaje está desactivado.

Haz clic en **Save** para aplicar los cambios. Al guardar, se actualiza la caché de configuración de la aplicación, de modo que el cambio aparece la próxima vez que se cargue la pantalla de inicio.

### Mosaicos de la pantalla de inicio

Las pestañas que tienen una foto (consulta **Image** en [Agregar una nueva pestaña](#adding-a-new-tab)) aparecen en la [pantalla de inicio](/docs/b1-church/getting-started/navigating#home) de la aplicación como mosaicos de fotos, en una sección con el nombre de tu iglesia como encabezado. Esto incluye una pestaña de Verse of the Day, si le asignas una foto. Las pestañas con foto también aparecen en la barra de pestañas.

La configuración **Home screen tiles** de la misma página Member portal (`/mobile/b1-mobile`) controla cómo se distribuyen esos mosaicos. Elige un **Layout**:

- **Grid** -- Dos mosaicos por fila (la opción predeterminada). Cuando el número de mosaicos es impar, el primero ocupa todo el ancho.
- **Scrolling row** -- Una fila de mosaicos que los miembros deslizan de lado a lado.
- **List** -- Una lista con una pequeña miniatura de foto junto al nombre de cada pestaña.

Haz clic en **Save** para aplicar los cambios.

## Dónde aparecen estas pestañas

Las pestañas que configuras aquí se muestran en la **PWA de B1.church** que tus miembros instalan desde cualquier página de `https://yourchurchname.b1.church`. Los cambios que hagas en esta página se reflejan la próxima vez que un miembro abra la aplicación.

En un teléfono, la barra de pestañas inferior muestra **Home**, hasta tres de tus pestañas y **More**; en una computadora, el encabezado muestra hasta cinco. Las pantallas integradas (como Sermons, Giving o Groups) obtienen primero sus espacios, y las pestañas **Internal Page** ocupan los espacios que queden libres. Las pestañas **External URL** y **Verse of the Day** nunca obtienen un espacio. Todas las pestañas, incluidas las que no caben, aparecen en la página **More** de la aplicación. Consulta [Navegar por B1App](/docs/b1-church/getting-started/navigating) para ver lo que ven los miembros. (Las pestañas también se muestran en la aplicación nativa heredada [B1 Mobile](/docs/b1-mobile/) para los miembros que aún la usan, pero esa aplicación está obsoleta y ya no se actualiza.)

## Próximos pasos

- [Church Settings](./church-settings.md) -- Configura la información y la imagen de marca de tu iglesia
- [Roles y permisos](./roles-permissions.md) -- Gestiona el acceso de tu equipo
