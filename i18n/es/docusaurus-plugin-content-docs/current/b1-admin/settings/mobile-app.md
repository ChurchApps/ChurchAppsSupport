---
title: "Configuración de aplicación móvil"
---

# Configuración de aplicación móvil

<div class="article-intro">

La página de Configuración de aplicación móvil te permite configurar las pestañas de navegación que aparecen en la **experiencia móvil B1.church (PWA)** para los miembros de tu iglesia. Controlas qué pestañas son visibles, a qué enlazan y cómo se muestran.

</div>

:::info La aplicación móvil B1 nativa está depreciada
Las pestañas configuradas aquí se entregan a través de la [aplicación web progresiva B1.church (PWA)](/docs/b1-church/getting-started/installing-pwa), que ha reemplazado la aplicación móvil B1 nativa. Comparte la página de instalación de tu iglesia: `https://tunombredelaiglesia.b1.church/mobile/install` con los miembros; los guía a través de instalar la aplicación en su dispositivo, sin necesidad de descargar desde App Store o Google Play.
:::

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesitas el permiso "Editar configuración de iglesia". Ver [Roles y permisos](./roles-permissions.md) si no tienes acceso.
- Configura primero tu [Configuración de iglesia](./church-settings.md), incluyendo el nombre de tu iglesia y marca

</div>

## Acceder a configuración de navegación

1. En B1 Admin, abre el [menú Saltar](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda) y expande **Móvil**.
2. Haz clic en **Navegación** (`/mobile/navigation`).
3. La página Navegación muestra tus pestañas actuales de la aplicación.

## Agregar una nueva pestaña

1. Haz clic en el botón **Agregar pestaña** en la parte superior de la página.
2. Completa los detalles de la pestaña:
   - **Nombre**: la etiqueta que aparece en la pestaña (por ejemplo, "Sermones" o "Dar").
   - **Icono**: haz clic en el selector de icono para elegir un icono para tu pestaña. También puedes cargar una imagen personalizada.
   - **Tipo de pestaña**: selecciona de opciones como Biblia, Transmisión en vivo, Donación, Sitio web, y más.
   - **URL**: ingresa la dirección web a la que debe enlazar la pestaña.
   - **Visibilidad**: controla quién puede ver esta pestaña (todos, solo miembros, etc.).
3. Haz clic en **Guardar pestaña** para agregarlo a tu aplicación.

## Editar una pestaña existente

1. Haz clic en cualquier pestaña existente en la lista **Pestañas de la aplicación**.
2. Actualiza el nombre, icono, URL, tipo o configuración de visibilidad de la pestaña.
3. Haz clic en **Guardar pestaña** para aplicar tus cambios.

## Reordenar pestañas

Puedes cambiar el orden en que aparecen las pestañas en la aplicación móvil. Arrastra y suelta las pestañas en la lista para reorganizarlas. El orden mostrado en esta página coincide con el orden que tus miembros verán en la aplicación.

:::info
Algunas pestañas pueden aparecer automáticamente cuando se cumplen ciertas condiciones: por ejemplo, una pestaña de Transmisión en vivo puede aparecer cuando una transmisión está activa. Las pestañas agregadas manualmente te dan control total sobre lo que tus miembros ven en todo momento.
:::

:::tip
Mantén el recuento de pestañas manejable. Tres a cinco pestañas funcionan bien para la mayoría de las iglesias. Demasiadas pestañas puede hacer que la navegación sea confusa para tus miembros.
:::

## Configuración del directorio de miembros y mensajería

El elemento **Portal de miembros** en la misma sección Móvil contiene la configuración que rige el directorio de miembros y la mensajería privada en la experiencia B1.church:

- **Grupo de aprobación de directorio**: el grupo que revisa las actualizaciones del directorio de miembros, y [solicitudes de eliminación de cuenta](../profile/account-deletion.md), antes de que entren en vigor.
- **Mostrar en directorio**: quién puede aparecer en el directorio de miembros (solo personal hasta todos).
- **Preferencia de visibilidad**: establece el predeterminado de la iglesia para los miembros que aún no han elegido su propia configuración. **Dirección**, **Número de teléfono** y **Correo electrónico** tienen su propio menú desplegable, con los mismos cinco niveles disponibles dondequiera que se configure la visibilidad:
  - **Todos**: visible para cualquiera, incluyendo visitantes anónimos
  - **Miembros**: visible solo para personas con un registro de Miembro o Personal
  - **Solo grupos**: visible solo para personas que comparten un grupo con esta persona
  - **Mis líderes de grupo y personal**: visible solo para líderes de un grupo al que pertenece esta persona, más personal
  - **Solo personal**: visible solo para personal con el permiso Personas > Ver, y para la propia persona

  Los miembros pueden anular estos valores predeterminados para su propio registro desde la pestaña **Privacidad** de su perfil en el PWA B1.church: ver [Editar tu perfil](/docs/b1-church/getting-started/me-page).
- **Edad mínima para mensajes privados**: un control de seguridad infantil. B1 no abrirá una conversación de **nuevo** mensaje privado cuando cualquiera de los dos está bajo esta edad, según su fecha de nacimiento (el rol del hogar se usa como alternativa cuando no hay fecha de nacimiento en el archivo). Las personas menores de edad permanecen totalmente visibles en el directorio: solo la mensajería directa se bloquea, en **ambas direcciones**, para todos incluyendo personal. Las conversaciones grupales y la mensajería a los padres de un niño aún funcionan. Las opciones son Desactivado, 13, 16 o 18; el predeterminado es **18**. Las conversaciones existentes no se ven afectadas.

:::tip
Debido a que la verificación de edad mínima se basa en fechas de nacimiento, asegúrate de que las fechas de nacimiento se completen para los niños en tu congregación. Esta configuración pertenece a la misma familia de seguridad infantil que los [controles de seguridad de entrada](../attendance/checkin-safety.md).
:::

### Solicitud de inicio de sesión de la pantalla de inicio

Los visitantes que abren la [pantalla de inicio](/docs/b1-church/getting-started/navigating#home) de la aplicación sin iniciar sesión ven un aviso corto: de forma predeterminada, *"Sign in to see your groups, giving, and more."* Junto a un botón **Iniciar sesión**. La **solicitud de inicio de sesión de la pantalla de inicio** configuración en la misma página del Portal de miembros (`/mobile/b1-mobile`) te permite cambiarla:

- **Mostrar solicitud de inicio de sesión en la pantalla de inicio de la aplicación**: apaga esto para ocultar tanto el aviso como el botón **Iniciar sesión** de la pantalla de inicio. Los visitantes aún pueden iniciar sesión desde el menú de la aplicación.
- **Texto de solicitud de inicio de sesión**: reemplaza la redacción predeterminada con tu propio mensaje (hasta 150 caracteres). Déjalo en blanco para usar el predeterminado. Este cuadro está deshabilitado mientras el aviso está apagado.

Haz clic en **Guardar** para aplicar. Guardar actualiza la configuración en caché de la aplicación, por lo que el cambio aparece la próxima vez que se carga la pantalla de inicio.

## Dónde aparecen estas pestañas

Las pestañas que configures aquí se muestran en el **PWA B1.church** que tus miembros instalan desde cualquier página en `https://tunombredelaiglesia.b1.church`. Los cambios que hagas en esta página se reflejan la próxima vez que un miembro abre la aplicación. (Las pestañas también se renderizan mediante la [aplicación móvil B1 nativa](/docs/b1-mobile/) depreciada para cualquier miembro aún ejecutándola, pero esa aplicación está depreciada y ya no se actualiza.)

## Próximos pasos

- [Configuración de iglesia](./church-settings.md) — configura la información de tu iglesia y marca
- [Roles y permisos](./roles-permissions.md) — administra el acceso para tu equipo
