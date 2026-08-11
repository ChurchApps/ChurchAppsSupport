---
title: "Configuración de la Aplicación Móvil"
---

# Configuración de la Aplicación Móvil

<div class="article-intro">

La página Configuración de la Aplicación Móvil te permite configurar las pestañas de navegación que aparecen en la **experiencia móvil B1.church (PWA)** para los miembros de tu iglesia. Controlas qué pestañas son visibles, a qué enlazan y cómo se muestran.

</div>

:::info La aplicación nativa B1 Mobile está obsoleta
Las pestañas configuradas aquí se entregan a través de la [Aplicación Web Progresiva B1.church (PWA)](/docs/b1-church/getting-started/installing-pwa), que ha reemplazado la aplicación nativa B1 Mobile. Comparte tu página de instalación de iglesia — `https://tunobreiglesia.b1.church/mobile/install` — con los miembros; les guía a través de instalar la aplicación en su dispositivo, sin necesidad de descargar desde la App Store o Google Play.
:::

<div class="prereqs">
<h4>Antes de Empezar</h4>

- Necesitas el permiso "Editar Configuración de la Iglesia". Consulta [Roles y Permisos](./roles-permissions.md) si no tienes acceso.
- Configura tu [Configuración de la Iglesia](./church-settings.md) primero, incluyendo el nombre y marca de tu iglesia

</div>

## Accediendo a la Configuración de la Aplicación Móvil

1. En B1 Admin, abre el **menú de sección** en la esquina superior izquierda (el nombre de la sección con la pequeña flecha) y elige **Configuración**.
2. Haz clic en el botón **Aplicaciones Móviles** en el encabezado.
3. La página Configuración de la Aplicación Móvil muestra tus pestañas de aplicación actuales.

## Agregar una Nueva Pestaña

1. Haz clic en el botón **Agregar Pestaña** en la parte superior de la página.
2. Completa los detalles de la pestaña:
   - **Nombre** -- La etiqueta que aparece en la pestaña (por ejemplo, "Sermones" o "Dar").
   - **Icono** -- Haz clic en el selector de icono para elegir un icono para tu pestaña. También puedes cargar una imagen personalizada.
   - **Tipo de Pestaña** -- Selecciona de opciones como Biblia, Transmisión en Vivo, Donación, Sitio Web, y más.
   - **URL** -- Ingresa la dirección web a la que debe enlazar la pestaña.
   - **Visibilidad** -- Controla quién puede ver esta pestaña (todos, solo miembros, etc.).
3. Haz clic en **Guardar Pestaña** para agregarla a tu aplicación.

## Editar una Pestaña Existente

1. Haz clic en cualquier pestaña existente en la lista **Pestañas de la Aplicación**.
2. Actualiza el nombre, icono, URL, tipo o configuración de visibilidad de la pestaña.
3. Haz clic en **Guardar Pestaña** para aplicar tus cambios.

## Reorganizar Pestañas

Puedes cambiar el orden en que aparecen las pestañas en la aplicación móvil. Arrastra y suelta pestañas en la lista para reorganizarlas. El orden que se muestra en esta página coincide con el orden que tus miembros verán en la aplicación.

:::info
Algunas pestañas pueden aparecer automáticamente cuando se cumplen ciertas condiciones -- por ejemplo, una pestaña de Transmisión en Vivo puede aparecer cuando hay una transmisión activa. Las pestañas agregadas manualmente te dan control total sobre lo que tus miembros ven en todo momento.
:::

:::tip
Mantén el recuento de pestañas manejable. Tres a cinco pestañas funcionan bien para la mayoría de iglesias. Demasiadas pestañas pueden hacer que la navegación sea confusa para tus miembros.
:::

## Configuración de Directorio de Miembros y Mensajería

La pestaña **B1 Mobile** en la misma sección Móvil contiene la configuración que gobierna el directorio de miembros y la mensajería privada en la experiencia B1.church:

- **Grupo de Aprobación de Directorio** -- El grupo que revisa las actualizaciones del directorio de miembros antes de que se apliquen.
- **Mostrar en Directorio** -- Quién puede aparecer en el directorio de miembros (Solo Personal a Todos).
- **Preferencias de Visibilidad** -- Visibilidad predeterminada para direcciones, números de teléfono y direcciones de correo electrónico de miembros.
- **Edad Mínima para Mensajes Privados** -- Un control de seguridad infantil. B1 no abrirá una **nueva** conversación de mensaje privado cuando alguna de las personas tenga menos de esta edad, según su fecha de nacimiento (el rol del hogar se utiliza como alternativa cuando no hay fecha de nacimiento registrada). Las personas menores de edad permanecen totalmente visibles en el directorio -- solo la mensajería directa se bloquea, en **ambas direcciones**, para todos incluido el personal. Las conversaciones grupales y la mensajería a los padres de un niño aún funcionan. Las opciones son Desactivado, 13, 16 o 18; el predeterminado es **18**. Las conversaciones existentes no se ven afectadas.

:::tip
Debido a que la verificación de edad mínima se basa en fechas de nacimiento, asegúrate de que las fechas de nacimiento se completen para los niños en tu congregación. Esta configuración pertenece a la misma familia de seguridad infantil que los [controles de seguridad de registro de asistencia](../attendance/checkin-safety.md).
:::

## Dónde Aparecen Estas Pestañas

Las pestañas que configures aquí se muestran en la **B1.church PWA** que tus miembros instalan desde cualquier página en `https://tunobreiglesia.b1.church`. Los cambios que hagas en esta página se reflejan la próxima vez que un miembro abre la aplicación. (Las pestañas también se renderizan por la [aplicación nativa B1 Mobile](/docs/b1-mobile/) heredada para cualquier miembro que aún la esté ejecutando, pero esa aplicación está obsoleta y ya no se está actualizando.)

## Próximos Pasos

- [Configuración de la Iglesia](./church-settings.md) -- Configura la información y marca de tu iglesia
- [Roles y Permisos](./roles-permissions.md) -- Administra el acceso para tu equipo
