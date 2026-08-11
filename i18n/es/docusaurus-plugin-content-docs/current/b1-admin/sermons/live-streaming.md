---
title: "Transmisión en Vivo"
---

# Transmisión en Vivo

<div class="article-intro">

La página Horarios de Transmisión en Vivo te permite configurar el horario de transmisión de tu iglesia, administrar horarios de servicio y personalizar la experiencia del espectador. Configura servicios semanales recurrentes o eventos únicos, configura configuración de chat y video, y controla cuándo tu transmisión va en vivo.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Necesitas el permiso **contentApi.streamingServices.edit**. Ver [Roles y Permisos](../settings/roles-permissions.md) si no tienes acceso.
- Ten tu ID de Canal de YouTube listo si planeas usar transmisión en vivo automatizada
- Agrega al menos un [sermón](managing-sermons) o URL en vivo permanente para usar como tu fuente de transmisión

</div>

La página tiene dos pestañas principales: **Servicios** para administrar tu horario de transmisión en vivo y **Configuración** para configurar tu página de transmisión.

## Administrar Servicios

### Agregar un Servicio

1. En B1 Admin, abre el **menú de sección** en la esquina superior izquierda (el nombre de la sección con la flecha pequeña) y elige **Sermones**, luego haz clic en la pestaña **Horarios de Transmisión en Vivo**.
2. Haz clic en el botón **Agregar Servicio** para crear un nuevo servicio programado.
3. Ingresa un **Nombre de Servicio** (por ejemplo, "Domingo por la Mañana").
4. Establece el **Horario de Servicio** -- elige el día y hora en que tu servicio comienza.
5. Establece **Se Repite Semanalmente** en **Sí** para servicios semanales regulares, o **No** para un evento único.

### Configurar Configuración de Chat y Video

6. Bajo **Configuración de Chat**, establece cuántos minutos antes y después del servicio el chat debe estar habilitado. Esto permite a los visitantes comenzar a chatear antes de que comience el servicio y continuar después.
7. Bajo **Configuración de Video**, establece qué tan temprano comenzar la transmisión de video para cuenta atrás o contenido pre-servicio.
8. Selecciona qué sermón reproducir desde el menú desplegable:
   - **Sermón Más Reciente** -- Reproduce automáticamente tu video agregado más recientemente.
   - **Servicio en Vivo Actual** -- Reproduce tu transmisión en vivo actual de YouTube usando tu ID de Canal.
   - También puedes elegir cualquier sermón específico que ya hayas guardado.
9. Haz clic en **Guardar** para programar tu servicio.

:::info
Tu servicio se actualizará automáticamente cada semana si se establece en recurrente. Puedes agregar tantos servicios como necesites. Los visitantes verán el próximo tiempo de servicio programado cuando visiten tu página de transmisión.
:::

## Configuración de Página de Transmisión

Haz clic en la pestaña **Configuración** para personalizar las pestañas y enlaces que aparecen junto a tu transmisión en vivo.

### Agregar Pestañas

1. Haz clic en el botón **Agregar** para agregar una nueva pestaña a tu página de transmisión en vivo.
2. Elige la pestaña pre-diseñada de **Chat** o agrega una pestaña personalizada con una URL externa.
3. Para la pestaña de Chat, simplemente dale un nombre en la caja **Texto de Pestaña** y la configuración está completa.
4. Para una pestaña vinculada, ingresa el nombre de la pestaña, elige un icono haciendo clic en el botón de icono, e ingresa la URL.
5. Tus pestañas configuradas aparecerán en la página de transmisión en vivo para que los espectadores accedan a recursos adicionales y características interactivas.

### Vista Previa de Tu Transmisión

Haz clic en el botón **Ver Tu Transmisión** para ver exactamente cómo se verá tu página de transmisión en vivo para los visitantes, incluyendo tu logo, tiempos de servicio y pestañas configuradas.

## Configurar Tu Transmisión en Vivo de YouTube

Para conectar tu canal de YouTube para transmisión en vivo automatizada:

1. Ve a **Sermones** y haz clic en **Agregar Sermón**, luego selecciona **Agregar URL en Vivo Permanente**.
2. El proveedor de video por defecto es **Transmisión en Vivo Actual de YouTube**. Ingresa tu **ID de Canal de YouTube**.
3. Agrega un título y descripción, luego haz clic en **Guardar**.
4. En **Horarios de Transmisión en Vivo**, crea un servicio y selecciona tu URL en vivo permanente desde el menú desplegable de sermones.

:::tip
Para encontrar tu ID de Canal de YouTube, ve a la configuración avanzada de tu canal de YouTube y copia el valor del ID de Canal.
:::

## Personalizar Colores y Logo

Tu página de transmisión en vivo usa la configuración de [Apariencia](../website/appearance) de tu sitio web:

- El **color de énfasis claro** con texto oscuro se usa para el encabezado.
- El **color de énfasis oscuro** con texto claro se usa para la barra lateral.
- Tu **Logo de Fondo Claro** aparece en la página de transmisión. Usa una imagen con fondo transparente y relación de aspecto 4:1.

Para cambiar estos, ve a **Sitio Web** luego **Apariencia** y actualiza tu [Paleta de Colores](../website/appearance#color-palette) y [Logo](../website/appearance#logo-and-branding) configuración.

## Agregar Anfitriones de Transmisión

Para dar a los miembros del equipo acceso al chat solo para anfitriones junto con el chat público:

1. Abre el **menú de sección** en la esquina superior izquierda (el nombre de la sección con la flecha pequeña), elige **Configuración** y haz clic en **Roles**.
2. Haz clic en el botón más y selecciona **Agregar Rol Personalizado**.
3. Nombra el rol "Anfitrión de Transmisión" y haz clic en **Guardar**.
4. Haz clic en el nuevo rol, luego haz clic en **Agregar** en la sección Miembros para agregar personas.
5. Desplázate hacia abajo a **Editar Permisos**, expande la sección **Contenido**, y marca **Chat de Anfitrión**.

Cuando los anfitriones inicien sesión en la página de transmisión en vivo, una pestaña privada de **Chat de Anfitrión** aparece junto al chat público para conversación solo del personal durante la transmisión.

:::info
Para más detalles sobre la creación de roles y administración de permisos, ver [Roles y Permisos](../settings/roles-permissions.md).
:::

## Solución de Problemas

Si tu transmisión en vivo automatizada de YouTube no se muestra correctamente cuando usas la opción "Transmisión en Vivo Actual de YouTube" con tu ID de Canal, prueba lo siguiente:

**Síntomas:**
- La incrustación de transmisión en vivo muestra "Video no disponible"
- La página carga pero no aparece video
- Las incrustaciones directas de YouTube funcionan, pero la transmisión en vivo del canal automatizado no

**Solución:**
Verifica tu canal de YouTube para transmisiones en vivo antiguas o programadas y elimínalas:

1. Ve a tu YouTube Studio.
2. Navega a **Contenido** luego **En Vivo**.
3. Busca cualquier transmisión en vivo antigua o futuros transmisiones programadas.
4. Elimina estas entradas de transmisión en vivo antiguas o programadas.
5. Prueba tu página de transmisión en vivo de nuevo.

:::warning
La incrustación de transmisión en vivo de canal automatizado de YouTube puede bloquearse cuando hay múltiples entradas de transmisión en vivo programadas o pasadas en tu canal. Eliminar estas permite a YouTube identificar y servir apropiadamente tu transmisión en vivo actual.
:::

**Requisitos adicionales:**
- Tu transmisión en vivo debe estar establecida en **Público** (no Sin Listar o Privada).
- La incrustación debe estar permitida en tu configuración de transmisión de YouTube.
- Asegúrate de que estás usando el proveedor **Transmisión en Vivo Actual de YouTube** (con ID de Canal), no el proveedor **YouTube** (con ID de Video).

## Próximos Pasos

- [Administrar Sermones](managing-sermons) -- Agrega sermones a tu biblioteca
- [Listas de Reproducción](playlists) -- Organiza sermones en series
