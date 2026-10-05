---
title: "Transmisión en Vivo"
---

# Transmisión en Vivo

<div class="article-intro">

La página Live Stream Times te permite configurar el cronograma de transmisión de tu iglesia, gestionar horarios de servicio y personalizar la experiencia del espectador. Configura servicios semanales recurrentes o eventos únicos, personaliza la configuración de chat y video, y controla cuándo se transmite tu flujo en vivo.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Necesitas el permiso **contentApi.streamingServices.edit**. Consulta [Roles y Permisos](../settings/roles-permissions.md) si no tienes acceso.
- Ten tu ID de canal de YouTube listo si planeas usar transmisión en vivo automatizada
- Agrega al menos un [sermón](managing-sermons) o URL en vivo permanente para usar como tu fuente de transmisión

</div>

La página tiene dos pestañas principales: **Services** para gestionar tu cronograma de transmisión en vivo y **Settings** para configurar tu página de transmisión.

## Gestión de Servicios

### Agregar un Servicio

1. En B1 Admin, abre el [Menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expande **Sermons** y haz clic en **Live Stream Times**.
2. Haz clic en el botón **Add Service** para crear un nuevo servicio programado.
3. Ingresa un **Service Name** (por ejemplo, "Sunday Morning").
4. Establece la **Service Time** -- elige el día y la hora en que comienza tu servicio.
5. Establece **Recurs Weekly** en **Yes** para servicios semanales regulares, o **No** para un evento único.

### Configuración de Chat y Configuración de Video

6. Bajo **Chat Settings**, establece cuántos minutos antes y después del servicio el chat debe estar habilitado. Esto permite que los visitantes comiencen a charlar antes de que comience el servicio y continúen después.
7. Bajo **Video Settings**, establece cuán temprano comenzar la transmisión de video para la cuenta regresiva o contenido previo al servicio.
8. Selecciona qué sermón reproducir del desplegable:
   - **Latest Sermon** -- Reproduce automáticamente tu video agregado más recientemente.
   - **Current Live Service** -- Reproduce tu transmisión en vivo actual de YouTube usando tu ID de canal.
   - También puedes elegir cualquier sermón específico que ya hayas guardado.
9. Haz clic en **Save** para programar tu servicio.

:::info
Tu servicio se actualizará automáticamente cada semana si se establece como recurrente. Puedes agregar tantos servicios como necesites. Los visitantes verán la próxima hora de servicio programado cuando visiten tu página de transmisión.
:::

## Configuración de Página de Transmisión

Haz clic en la pestaña **Settings** para personalizar las pestañas y los enlaces que aparecen junto a tu transmisión en vivo.

### Agregar Pestañas

1. Haz clic en el botón **Add** para agregar una nueva pestaña a tu página de transmisión en vivo.
2. Elige la pestaña prediseñada **Chat** o agrega una pestaña personalizada con una URL externa.
3. Para la pestaña Chat, solo dale un nombre en la caja **Tab Text** y la configuración está completa.
4. Para una pestaña vinculada, ingresa el nombre de la pestaña, elige un icono haciendo clic en el botón de icono, e ingresa la URL.
5. Tus pestañas configuradas aparecerán en la página de transmisión en vivo para que los espectadores accedan a recursos adicionales y características interactivas.

### Visualización Previa de Tu Transmisión

Haz clic en el botón **View Your Stream** para ver exactamente cómo se verá tu página de transmisión en vivo para los visitantes, incluyendo tu logo, horarios de servicio y pestañas configuradas.

## Configurar Tu Transmisión en Vivo de YouTube

Para conectar tu canal de YouTube para transmisión en vivo automatizada:

1. Ve a **Sermons** y haz clic en **Add Sermon**, luego selecciona **Add Permanent Live URL**.
2. El proveedor de video por defecto es **Current YouTube Live Stream**. Ingresa tu **YouTube Channel ID**.
3. Agrega un título y descripción, luego haz clic en **Save**.
4. En **Live Stream Times**, crea un servicio y selecciona tu URL en vivo permanente del desplegable de sermones.

:::tip
Para encontrar tu ID de canal de YouTube, ve a la configuración avanzada de tu canal de YouTube y copia el valor de Channel ID.
:::

## Personalizar Colores y Logo

Tu página de transmisión en vivo utiliza la configuración de [Appearance](../website/appearance) de tu sitio web:

- El **color de acento claro** con texto oscuro se usa para el encabezado.
- El **color de acento oscuro** con texto claro se usa para la barra lateral.
- Tu **Light Background Logo** aparece en la página de transmisión. Usa una imagen con fondo transparente y proporción de aspecto 4:1.

Para cambiar estos, ve a **Website** luego **Appearance** y actualiza tus configuraciones de [Color Palette](../website/appearance#color-palette) y [Logo](../website/appearance#logo-and-branding).

## Agregar Hosts de Transmisión

Para dar acceso a los miembros del equipo al chat solo para anfitriones junto con el chat público:

1. En el Menú Jump, elige **Settings > Roles**.
2. Haz clic en el botón más y selecciona **Add Custom Role**.
3. Nombra el rol "Streaming Host" y haz clic en **Save**.
4. Haz clic en el nuevo rol, luego haz clic en **Add** en la sección Members para agregar personas.
5. Desplázate hacia abajo a **Edit Permissions**, expande la sección **Content** y marca **Host Chat**.

Cuando los anfitriones inician sesión en la página de transmisión en vivo, aparece una pestaña privada **Host Chat** junto al chat público para conversación solo del personal durante la transmisión.

:::info
Para más detalles sobre la creación de roles y gestión de permisos, consulta [Roles y Permisos](../settings/roles-permissions.md).
:::

## Resolución de Problemas

Si tu transmisión en vivo automatizada de YouTube no se muestra correctamente cuando usas la opción "Current YouTube Live Stream" con tu Channel ID, intenta lo siguiente:

**Síntomas:**
- La incrustaciónde transmisión en vivo muestra "Video unavailable"
- La página carga pero no aparece video
- Los incrustaciones directas de YouTube funcionan, pero la transmisión en vivo del canal automatizada no lo hace

**Solución:**
Revisa tu canal de YouTube en busca de transmisiones en vivo antiguas o próximas programadas y elimínalas:

1. Ve a tu YouTube Studio.
2. Navega a **Content** luego **Live**.
3. Busca cualquier transmisión en vivo antiguo o próximas transmisiones programadas.
4. Elimina estas entradas de transmisión en vivo antiguas o programadas.
5. Prueba tu página de transmisión en vivo nuevamente.

:::warning
La incrustaciónautomatizada de transmisión en vivo del canal de YouTube puede ser bloqueada cuando hay múltiples entradas de transmisión en vivo programadas o pasadas en tu canal. Eliminar estas permite que YouTube identifique y sirva correctamente tu transmisión en vivo actual.
:::

**Requisitos adicionales:**
- Tu transmisión en vivo debe estar configurada como **Public** (no Unlisted o Private).
- La incrustaciónmust be allowed en tus configuraciones de transmisión en vivo de YouTube.
- Asegúrate de estar usando el proveedor **Current YouTube Live Stream** (con Channel ID), no el proveedor **YouTube** (con Video ID).

## Próximos Pasos

- [Managing Sermons](managing-sermons) -- Agrega sermones a tu biblioteca
- [Playlists](playlists) -- Organiza sermones en series
