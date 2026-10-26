---
title: "Programar el calendario"
---

# Programar el calendario

<div class="article-intro">

La página **Calendario** de FreePlay Admin controla lo que reproduce cada grupo de pantallas y cuándo. Añada un horario para una lista de reproducción, un plan de servicio o una carpeta de proveedor, y configúrelo para que se repita semanalmente o se reproduzca una sola vez. Cuando no hay nada programado, se reproduce el bucle predeterminado del grupo.

</div>

<div class="prereqs">
<h4>Antes de empezar</h4>

- Cree al menos un grupo de pantallas. Véase [Administrar pantallas y grupos](./managing-screens#screen-groups)
- [Cree una lista de reproducción](./building-playlists), o tenga un tipo de plan configurado en B1 Admin

</div>

## Leer el calendario

1. Vaya a **Calendario**.
2. Elija un grupo de pantallas en las pestañas de la parte superior. Cada pestaña muestra cuántos horarios tiene el grupo.
3. La vista semanal va de lunes a domingo, de 6 AM a 10 PM. Una línea roja marca la hora actual.
4. Use las flechas para moverse a la semana anterior o siguiente, o haga clic en **Hoy** para volver a esta semana.

El subtítulo de la página muestra la zona horaria que usa el calendario. Los horarios siguen la zona horaria de su iglesia, que configura en B1 Admin en [Información de la iglesia](../../b1-admin/settings/church-settings.md#time-zone). Si su iglesia no tiene una zona horaria configurada, FreePlay usa la zona horaria de su campus. El calendario y sus TV usan la misma zona horaria, de modo que un bloque colocado a las 9:00 AM en el calendario se reproduce a las 9:00 AM en la pantalla, aunque su computadora esté configurada en otra zona horaria.

Los horarios están codificados por colores según su tipo. Una leyenda explica los colores:

- **Bucle predeterminado**: fondo rayado, que se muestra detrás de todo cuando el grupo tiene un bucle predeterminado
- **Lista de reproducción**
- **Plan de servicio**
- **Carpeta de proveedor**

Cada bloque muestra su nombre; los bloques más altos también muestran las horas, si se repite (**semanal** o **una vez**) y qué pasa cuando termina antes de tiempo.

## Configurar el bucle predeterminado

El bucle predeterminado se reproduce en las pantallas del grupo siempre que no haya nada programado.

1. En la página **Calendario**, haga clic en **Bucle predeterminado…** en el encabezado. Si ya hay un bucle predeterminado configurado, el botón muestra **Bucle predeterminado:** seguido del nombre de la lista de reproducción.
2. Elija una **Lista de reproducción**, o elija **Ninguno: la pantalla se apaga**.
3. Haga clic en **Guardar**.

## Añadir un horario

Hay tres formas de iniciar un nuevo horario:

- Haga clic en un espacio vacío del calendario. El formulario se abre con ese día y media hora ya rellenados.
- Haga clic en **Añadir horario** en el encabezado.
- Elija **Añadir horario** desde la paleta de comandos (**Ctrl+K** o **⌘K**).

Luego complete el formulario:

1. **Reproducir**: elija qué se reproduce:
   - **Listas de reproducción**: cualquier lista que haya creado
   - **Planes de servicio**: un tipo de plan de B1 Admin, marcado como **(plan actual)**. La pantalla reproduce el plan que esté vigente para ese tipo de plan cada semana, incluidas las lecciones de Go Curriculum (también las personalizadas), que usan el inicio de sesión de Go vinculado al ministerio del tipo de plan
   - **Carpeta de proveedor…**: abre **Elija una carpeta de proveedor**. Navegue hasta una carpeta y haga clic en **Usar esta carpeta**. Para elegir otra carpeta más adelante, haga clic en **Cambiar**
2. **Se repite**: seleccione los días de la semana en que se reproduce este horario. Para una fecha única, active **Una vez** y elija la **Fecha**.
3. **Inicio** y **Fin**: las horas en que el horario inicia y se detiene.
4. **Si termina antes**: qué hacer cuando el contenido se acaba antes de la hora de fin:
   - **Repetir hasta la hora de fin**: vuelve a empezar desde el principio. Ideal para bucles de señalización, anuncios y cuentas regresivas
   - **Ritmo del maestro**: las diapositivas esperan el control remoto del maestro. La lección permanece en pantalla después de la hora de fin hasta la última diapositiva
   - **Reproducir una vez y luego volver al bucle predeterminado**
5. Para horarios que se repiten, establezca **Comienza** en la primera fecha. En **Termina**, elija **Nunca**, o elija **En la fecha** e introduzca una **Fecha de fin**.
6. Haga clic en **Guardar**.

:::info
**Ritmo del maestro** reemplazó la antigua opción "mantener la última diapositiva". Los horarios guardados con esa opción ahora se reproducen como ritmo del maestro.
:::

## Editar o eliminar un horario

1. Haga clic en el bloque del horario en el calendario.
2. Cambie cualquier campo y haga clic en **Guardar**, o haga clic en **Eliminar** para quitar el horario.

## Horarios superpuestos

Si dos horarios se superponen, el formulario muestra una advertencia: **Se superpone con otro horario. Gana el que empieza más tarde.** Mientras el horario posterior está en curso, las pantallas lo reproducen. Cuando termina, vuelven al horario anterior si todavía está en curso.

## Cómo las pantallas reciben los cambios

Las pantallas vinculadas descargan todo lo programado para los próximos 7 días, y comprueban los cambios por su cuenta. No necesita tocar el TV después de editar el calendario. Para ver cuándo una pantalla tiene todo lo necesario, revise **Listo hasta** en la [página de Pantallas](./managing-screens).

## Artículos relacionados

- **[Crear listas de reproducción](./building-playlists)**: cree las listas de reproducción que programa
- **[Reproducción programada en el TV](./scheduled-playback)**: cómo funcionan las lecciones con ritmo del maestro y el control remoto en el TV
- **[Administrar pantallas y grupos](./managing-screens)**: añada grupos y revise las descargas de cada pantalla
