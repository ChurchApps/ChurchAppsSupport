---
title: "Programar el calendario"
---

# Programar el calendario

<div class="article-intro">

La página **Calendar** de FreePlay Admin controla lo que reproduce cada grupo de pantallas y cuándo. Añade una programación para una lista de reproducción, un plan de servicio o una carpeta de proveedor, y configúrala para que se repita semanalmente o para que se reproduzca una sola vez. Cuando no hay nada programado, se reproduce el bucle predeterminado del grupo.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Crea al menos un grupo de pantallas. Consulta [Gestionar pantallas y grupos](./managing-screens#screen-groups)
- [Crea una lista de reproducción](./building-playlists), o ten un tipo de plan configurado en B1 Admin

</div>

## Leer el calendario

1. Ve a **Calendar**.
2. Elige un grupo de pantallas en las pestañas de la parte superior. Cada pestaña muestra cuántas programaciones tiene el grupo.
3. La vista semanal va de lunes a domingo, de 6 AM a 10 PM. Una línea roja marca la hora actual.
4. Usa las flechas para ir a la semana anterior o siguiente, o haz clic en **Today** para volver a esta semana.

El subtítulo de la página muestra la zona horaria que usa el calendario. Las programaciones siguen la zona horaria de tu iglesia, que configuras en B1 Admin en [Church Information](../../b1-admin/settings/church-settings.md#time-zone). Si tu iglesia no tiene una zona horaria configurada, FreePlay usa la zona horaria de tu campus. El calendario y tus TV usan la misma zona horaria, así que un bloque colocado a las 9:00 AM en el calendario se reproduce a las 9:00 AM en la pantalla, incluso si tu ordenador está configurado en otra zona horaria.

Las programaciones se distinguen por color según su tipo. Una leyenda explica los colores:

- **Default loop**: fondo rayado, que se muestra detrás de todo cuando el grupo tiene un bucle predeterminado
- **Playlist**
- **Service plan**
- **Provider folder**

Cada bloque muestra su nombre; los bloques más altos muestran además las horas, si se repite (**weekly** o **once**) y qué pasa cuando termina antes de tiempo.

## Configurar el bucle predeterminado

El bucle predeterminado se reproduce en las pantallas del grupo siempre que no haya nada programado.

1. En la página **Calendar**, haz clic en **Default loop…** en la cabecera. Si ya hay un bucle predeterminado configurado, el botón muestra **Default loop:** seguido del nombre de la lista de reproducción.
2. Elige una **Playlist**, o elige **None — screen goes dark**.
3. Haz clic en **Save**.

## Añadir una programación

Hay tres formas de crear una programación nueva:

- Haz clic en un espacio vacío del calendario. El formulario se abre con ese día y esa media hora ya rellenados.
- Haz clic en **Add schedule** en la cabecera.
- Elige **Add schedule** en la paleta de comandos (**Ctrl+K** o **⌘K**).

Después rellena el formulario:

1. **Play**: elige lo que se reproduce:
   - **Playlists**: cualquier lista de reproducción que hayas creado
   - **Service plans**: un tipo de plan de B1 Admin, marcado con **(current plan)**. La pantalla reproduce el plan vigente de ese tipo cada semana, incluidas las lecciones de Go Curriculum (también las personalizadas), que usan el inicio de sesión de Go vinculado al ministerio del tipo de plan
   - **Provider folder…**: abre **Choose a provider folder**. Busca una carpeta y haz clic en **Use this folder**. Para elegir otra carpeta más adelante, haz clic en **Change**
2. **Repeats**: selecciona los días de la semana en que se reproduce la programación. Para una sola fecha, activa **One time** y elige la **Date**.
3. **Start** y **End**: las horas de inicio y fin de la programación.
4. **If it finishes early**: qué hacer cuando el contenido se acaba antes de la hora de fin:
   - **Loop until the end time**: vuelve a empezar desde el principio. Va bien para bucles de señalización, anuncios y cuentas atrás
   - **Teacher paced**: las diapositivas esperan al mando del profesor. La lección permanece en pantalla después de la hora de fin hasta la última diapositiva
   - **Play once, then go back to the default loop**
5. En las programaciones repetidas, establece **Starts** como la primera fecha. En **Ends**, elige **Never**, o elige **On date** e introduce una **End date**.
6. Haz clic en **Save**.

:::info
**Teacher paced** sustituye a la antigua opción «hold the last slide». Las programaciones guardadas con esa opción ahora se reproducen como teacher paced.
:::

## Editar o eliminar una programación

1. Haz clic en el bloque de la programación en el calendario.
2. Cambia cualquier campo y haz clic en **Save**, o haz clic en **Delete** para eliminar la programación.

## Programaciones superpuestas

Si dos programaciones se solapan, el formulario muestra una advertencia: **Overlaps another schedule. The one that starts later wins.** Mientras se ejecuta la programación posterior, las pantallas la reproducen. Cuando termina, vuelven a la programación anterior si todavía está en curso.

## Cómo reciben los cambios las pantallas

Las pantallas emparejadas descargan todo lo programado para los 7 días siguientes, y comprueban por su cuenta si hay cambios. No necesitas tocar el TV después de editar el calendario. Para ver cuándo una pantalla tiene todo lo que necesita, consulta **Ready through** en la [página Screens](./managing-screens).

## Artículos relacionados

- **[Crear listas de reproducción](./building-playlists)**: crea las listas de reproducción que vas a programar
- **[Reproducción programada en el TV](./scheduled-playback)**: cómo funcionan las lecciones de teacher paced y el mando en el TV
- **[Gestionar pantallas y grupos](./managing-screens)**: añade grupos y revisa las descargas de cada pantalla
