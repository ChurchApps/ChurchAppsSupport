---
title: "Programar el calendario"
description: "Configura un horario semanal o de una sola vez en el Calendario de FreePlay Admin para reproducir listas de reproducción, planes de servicio o carpetas de proveedores en tus grupos de pantallas, con bucles predeterminados como respaldo."
---

# Programar el calendario

<div class="article-intro">

La página **Calendario** de FreePlay Admin controla qué reproduce cada grupo de pantallas y cuándo. Agrega un horario para una lista de reproducción, un plan de servicio o una carpeta de proveedor, y configúralo para que se repita semanalmente o se reproduzca una sola vez. Cuando no hay nada programado, se reproduce el bucle predeterminado del grupo.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Crea al menos un grupo de pantallas. Consulta [Administrar pantallas y grupos](./managing-screens.md#screen-groups)
- [Crea una lista de reproducción](./building-playlists.md), o ten configurado un tipo de plan en B1 Admin

</div>

## Leer el calendario {#reading-the-calendar}

1. Ve a **Calendario**.
2. Elige un grupo de pantallas en las pestañas de la parte superior. Cada pestaña muestra cuántos horarios tiene el grupo.
3. La vista semanal va de lunes a domingo, de 6 AM a 10 PM. Una línea roja marca la hora actual.
4. Usa las flechas para ir a la semana anterior o siguiente, o haz clic en **Hoy** para volver a esta semana.

El subtítulo de la página muestra la zona horaria usada para el calendario. Los horarios siguen la zona horaria de tu iglesia, que configuras en B1 Admin en [Información de la iglesia](../../b1-admin/settings/church-settings.md#time-zone). Si tu iglesia no tiene una zona horaria configurada, FreePlay usa la zona horaria de tu campus. El calendario y tus TV usan la misma zona horaria, así que un bloque colocado a las 9:00 AM en el calendario se reproduce a las 9:00 AM en la pantalla, aunque tu computadora esté configurada en otra zona horaria.

Los horarios se codifican por color según su tipo. Una leyenda explica los colores:

- **Bucle predeterminado** - Fondo rayado, se muestra detrás de todo cuando el grupo tiene un bucle predeterminado
- **Lista de reproducción**
- **Plan de servicio**
- **Carpeta de proveedor**

Cada bloque muestra su nombre, y los bloques más altos también muestran los horarios, si se repite (**semanal** o **una vez**) y qué pasa cuando termina antes de tiempo.

## Configurar el bucle predeterminado {#setting-the-default-loop}

El bucle predeterminado se reproduce en las pantallas del grupo siempre que no haya nada programado.

1. En la página **Calendario**, haz clic en **Bucle predeterminado…** en el encabezado. Si ya hay un bucle predeterminado configurado, el botón muestra **Bucle predeterminado:** seguido del nombre de la lista de reproducción.
2. Elige una **Lista de reproducción**, o elige **Ninguno — la pantalla se apaga**.
3. Haz clic en **Guardar**.

## Agregar un horario {#adding-a-schedule}

Hay tres formas de comenzar un nuevo horario:

- Haz clic en un espacio vacío del calendario. El formulario se abre con ese día y media hora ya completados.
- Haz clic en **Agregar horario** en el encabezado.
- Elige **Agregar horario** desde la paleta de comandos (**Ctrl+K** o **⌘K**).

Luego completa el formulario:

1. **Reproducir** - Elige qué se reproduce:
   - **Listas de reproducción** - Cualquier lista de reproducción que hayas creado
   - **Planes de servicio** - Un tipo de plan de B1 Admin, marcado **(plan actual)**. La pantalla reproduce el plan actual de ese tipo cada semana, incluidas las lecciones de GO! Curriculum (también las personalizadas), que usan el inicio de sesión de Go vinculado al ministerio del tipo de plan
   - **Carpeta de proveedor…** - Abre **Elige una carpeta de proveedor**. Explora hasta una carpeta y haz clic en **Usar esta carpeta**. Para elegir otra carpeta más adelante, haz clic en **Cambiar**
2. **Se repite** - Selecciona los días de la semana en que se reproduce este horario. Para una fecha única, activa **Una vez** y elige la **Fecha**.
3. **Inicio** y **Fin** - Las horas en que el horario comienza y termina.
4. **Si termina antes** - Qué hacer cuando el contenido se acaba antes de la hora de fin:
   - **Repetir hasta la hora de fin** - Vuelve a empezar desde el principio. Ideal para bucles de señalización, anuncios y cuentas regresivas
   - **Ritmo del maestro** - Las diapositivas esperan el control remoto del maestro. La lección permanece en pantalla después de la hora de fin hasta la última diapositiva
   - **Reproducir una vez, luego volver al bucle predeterminado**
5. En los horarios que se repiten, establece **Comienza** en la primera fecha. En **Termina**, elige **Nunca**, o elige **En fecha** e ingresa una **Fecha de fin**.
6. Haz clic en **Guardar**.

:::info
**Ritmo del maestro** reemplazó la opción anterior de "mantener la última diapositiva". Los horarios guardados con esa opción ahora se reproducen como ritmo del maestro.
:::

## Editar o eliminar un horario {#editing-or-deleting-a-schedule}

1. Haz clic en el bloque del horario en el calendario.
2. Cambia cualquier campo y haz clic en **Guardar**, o haz clic en **Eliminar** para quitar el horario.

## Horarios superpuestos {#overlapping-schedules}

Si dos horarios se superponen, el formulario muestra una advertencia: **Se superpone con otro horario. Gana el que empieza más tarde.** Mientras el horario posterior está en curso, las pantallas lo reproducen. Cuando termina, vuelven al horario anterior si todavía está en curso.

## Cómo las pantallas recogen los cambios {#how-screens-pick-up-changes}

Las pantallas emparejadas descargan todo lo programado para los próximos 7 días, y revisan los cambios por su cuenta. No necesitas tocar el TV después de editar el calendario. Para ver cuándo una pantalla tiene todo lo que necesita, revisa **Listo hasta** en la [página de Pantallas](./managing-screens.md).

## Artículos relacionados {#related-articles}

- **[Crear listas de reproducción](./building-playlists.md)** - Crea las listas de reproducción que programas
- **[Reproducción programada en el TV](./scheduled-playback.md)** - Cómo funcionan en el TV las lecciones con ritmo del maestro y el control remoto
- **[Administrar pantallas y grupos](./managing-screens.md)** - Agrega grupos y revisa las descargas de cada pantalla
- **[Mantener solo una parte de cada lección](/docs/b1-admin/serving/scheduling-lessons#keeping-only-part-of-every-lesson)** - Recorta cada lección programada de un tipo de plan a las partes que reproduce tu sala
