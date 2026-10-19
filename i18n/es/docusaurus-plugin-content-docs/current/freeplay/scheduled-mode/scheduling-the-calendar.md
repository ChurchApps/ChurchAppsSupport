---
title: "Programar el calendario"
---

# Programar el calendario

<div class="article-intro">

La página **Calendario** de FreePlay Admin controla qué reproduce cada grupo de pantallas y cuándo. Agrega una programación para una lista de reproducción, un plan de servicio o una carpeta de proveedor, y configúrala para que se repita semanalmente o se reproduzca una sola vez. Cuando no hay nada programado, se reproduce el bucle predeterminado del grupo.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Crea al menos un grupo de pantallas. Consulta [Administrar pantallas y grupos](./managing-screens#screen-groups)
- [Crea una lista de reproducción](./building-playlists), o ten configurado un tipo de plan en B1 Admin

</div>

## Leer el calendario

1. Ve a **Calendario**.
2. Elige un grupo de pantallas en las pestañas de la parte superior. Cada pestaña muestra cuántas programaciones tiene el grupo.
3. La vista semanal va de lunes a domingo, de 6 AM a 10 PM. Una línea roja marca la hora actual.
4. Usa las flechas para ir a la semana anterior o siguiente, o haz clic en **Hoy** para volver a esta semana.

El subtítulo de la página muestra la zona horaria que usa el calendario. Las programaciones siguen la zona horaria de tu iglesia. Si tu iglesia no tiene una zona horaria configurada, FreePlay usa la zona horaria de tu sede.

Las programaciones tienen colores según su tipo. Una leyenda explica los colores:

- **Bucle predeterminado**: fondo rayado, que se muestra detrás de todo cuando el grupo tiene un bucle predeterminado
- **Lista de reproducción** (lista de reproducción)
- **Plan de servicio** (plan de servicio)
- **Carpeta de proveedor** (carpeta de proveedor)

Cada bloque muestra su nombre, y los bloques más altos también muestran las horas, si se repite (**semanal** o **una vez**) y qué ocurre cuando termina antes de tiempo.

## Configurar el bucle predeterminado

El bucle predeterminado se reproduce en las pantallas del grupo siempre que no haya nada programado.

1. En la página **Calendario**, haz clic en **Bucle predeterminado…** en el encabezado. Si ya hay un bucle predeterminado configurado, el botón muestra **Bucle predeterminado:** seguido del nombre de la lista de reproducción.
2. Elige una **Lista de reproducción**, o elige **Ninguno: la pantalla se apaga** (ninguno: la pantalla se apaga).
3. Haz clic en **Guardar**.

## Agregar una programación

Hay tres formas de iniciar una nueva programación:

- Haz clic en un espacio vacío del calendario. El formulario se abre con ese día y esa media hora ya completados.
- Haz clic en **Agregar programación** en el encabezado.
- Elige **Agregar programación** desde la paleta de comandos (**Ctrl+K** o **⌘K**).

Luego completa el formulario:

1. **Reproducir** (Reproducir): elige qué se reproduce:
   - **Listas de reproducción**: cualquier lista de reproducción que hayas creado
   - **Planes de servicio**: un tipo de plan de B1 Admin, marcado como **(current plan)**. La pantalla reproduce cada semana el plan que esté vigente para ese tipo de plan
   - **Carpeta de proveedor…**: abre **Elegir una carpeta de proveedor**. Navega hasta una carpeta y haz clic en **Usar esta carpeta**. Para elegir otra carpeta más adelante, haz clic en **Cambiar**
2. **Repetir** (Repetir): selecciona los días de la semana en que se reproduce la programación. Para una sola fecha, activa **Una vez** y elige la **Fecha**.
3. **Inicio** y **Fin**: las horas en que la programación empieza y termina.
4. **Si termina antes** (Si termina antes): qué hacer cuando el contenido se acaba antes de la hora de fin:
   - **Repetir hasta la hora de fin** (Repetir hasta la hora de fin): vuelve a empezar desde el principio. Es útil para bucles de señalización, anuncios y cuentas regresivas
   - **Ritmo del maestro** (Ritmo del maestro): las diapositivas esperan el control remoto del maestro. La lección se mantiene en pantalla después de la hora de fin hasta la última diapositiva
   - **Reproducir una vez y luego volver al bucle predeterminado** (Reproducir una vez y luego volver al bucle predeterminado)
5. En las programaciones que se repiten, configura **Inicio** (Inicio) con la primera fecha. En **Fin** (Fin), elige **Nunca** (Nunca), o elige **En fecha** (En una fecha) e introduce una **Fecha de fin** (Fecha de fin).
6. Haz clic en **Guardar**.

:::info
**Ritmo del maestro** reemplazó a la opción anterior "mantener la última diapositiva". Las programaciones guardadas con esa opción ahora se reproducen como ritmo del maestro.
:::

## Editar o eliminar una programación

1. Haz clic en el bloque de la programación en el calendario.
2. Cambia cualquier campo y haz clic en **Guardar**, o haz clic en **Eliminar** para eliminar la programación.

## Programaciones superpuestas

Si dos programaciones se superponen, el formulario muestra una advertencia: **Se superpone con otra programación. Gana la que empieza más tarde.** Mientras la programación posterior está en curso, las pantallas la reproducen. Cuando termina, vuelven a la programación anterior si todavía está en curso.

## Cómo las pantallas recogen los cambios

Las pantallas emparejadas descargan todo lo programado para los siguientes 7 días, y comprueban por sí solas si hay cambios. No necesitas tocar el televisor después de editar el calendario. Para ver cuándo una pantalla tiene todo lo que necesita, revisa **Listo hasta** (Listo hasta) en la [página de Pantallas](./managing-screens).

## Artículos relacionados

- **[Crear listas de reproducción](./building-playlists)**: crea las listas de reproducción que programas
- **[Reproducción programada en el televisor](./scheduled-playback)**: cómo funcionan en el televisor las lecciones con ritmo del maestro y el control remoto
- **[Administrar pantallas y grupos](./managing-screens)**: agrega grupos y revisa la descarga de cada pantalla
