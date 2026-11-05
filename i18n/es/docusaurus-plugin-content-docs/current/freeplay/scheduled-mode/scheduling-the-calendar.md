---
title: "Programar el calendario"
---

# Programar el calendario

<div class="article-intro">

La página **Calendario** de FreePlay Admin controla lo que reproduce cada grupo de pantallas y cuándo lo hace. Agregue un horario para una lista de reproducción, un plan de servicio o una carpeta de proveedor, y configúrelo para que se repita semanalmente o para reproducirse una sola vez. Cuando no hay nada programado, se reproduce el bucle predeterminado del grupo.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Cree al menos un grupo de pantallas. Consulte [Administrar pantallas y grupos](./managing-screens#screen-groups)
- [Cree una lista de reproducción](./building-playlists), o tenga un tipo de plan configurado en B1 Admin

</div>

## Leer el calendario

1. Vaya a **Calendario**.
2. Elija un grupo de pantallas en las pestañas de la parte superior. Cada pestaña muestra cuántos horarios tiene el grupo.
3. La vista semanal va de lunes a domingo, de 6 a. m. a 10 p. m. Una línea roja marca la hora actual.
4. Use las flechas para ir a la semana anterior o siguiente, o haga clic en **Hoy** para volver a esta semana.

El subtítulo de la página muestra la zona horaria que usa el calendario. Los horarios siguen la zona horaria de su iglesia, que usted configura en B1 Admin en [Información de la iglesia](../../b1-admin/settings/church-settings.md#time-zone). Si su iglesia no tiene una zona horaria configurada, FreePlay usa la zona horaria de su sede. El calendario y sus televisores usan la misma zona horaria, así que un bloque colocado a las 9:00 a. m. en el calendario se reproduce a las 9:00 a. m. en la pantalla, aunque su computadora esté configurada en otra zona horaria.

Los horarios están codificados por color según su tipo. Una leyenda explica los colores:

- **Bucle predeterminado**: fondo rayado, que se muestra detrás de todo cuando el grupo tiene un bucle predeterminado
- **Lista de reproducción**
- **Plan de servicio**
- **Carpeta del proveedor**

Cada bloque muestra su nombre, y los bloques más altos también muestran las horas, si se repite (**semanal** o **una vez**) y qué pasa cuando termina antes.

## Configurar el bucle predeterminado

El bucle predeterminado se reproduce en las pantallas del grupo siempre que no haya nada programado.

1. En la página **Calendario**, haga clic en **Bucle predeterminado…** en el encabezado. Si ya hay un bucle predeterminado configurado, el botón muestra **Bucle predeterminado:** seguido del nombre de la lista de reproducción.
2. Elija una **Lista de reproducción**, o elija **Ninguno: la pantalla se apaga**.
3. Haga clic en **Guardar**.

## Agregar un horario

Hay tres formas de iniciar un horario nuevo:

- Haga clic en un espacio vacío del calendario. El formulario se abre con ese día y esa media hora ya completados.
- Haga clic en **Agregar horario** en el encabezado.
- Elija **Agregar horario** desde la paleta de comandos (**Ctrl+K** o **⌘K**).

Luego complete el formulario:

1. **Reproducir**: elija qué se reproduce:
   - **Listas de reproducción**: cualquier lista de reproducción que haya creado
   - **Planes de servicio**: un tipo de plan de B1 Admin, marcado como **(plan actual)**. La pantalla reproduce cada semana el plan vigente para ese tipo de plan, incluidas las lecciones de Go Curriculum (también las personalizadas), que usan el inicio de sesión de Go vinculado al ministerio del tipo de plan
   - **Carpeta del proveedor…**: abre **Elija una carpeta del proveedor**. Busque una carpeta y haga clic en **Usar esta carpeta**. Para elegir otra carpeta más adelante, haga clic en **Cambiar**
2. **Se repite**: seleccione los días de la semana en que se reproduce este horario. Si prefiere una fecha única, active **Una vez** y elija la **Fecha**.
3. **Inicio** y **Fin**: las horas en que el horario empieza y termina.
4. **Si termina antes**: qué hacer cuando el contenido se acaba antes de la hora de fin:
   - **Repetir hasta la hora de fin**: vuelve a empezar desde el principio. Útil para bucles de señalización, anuncios y cuentas regresivas
   - **Ritmo del maestro**: las diapositivas esperan el control remoto del maestro. La lección permanece en pantalla después de la hora de fin hasta la última diapositiva
   - **Reproducir una vez y luego volver al bucle predeterminado**
5. En los horarios que se repiten, establezca **Comienza** como la primera fecha. En **Termina**, elija **Nunca** o elija **En la fecha** e ingrese una **Fecha de fin**.
6. Haga clic en **Guardar**.

:::info
**Ritmo del maestro** reemplazó la opción anterior de "mantener la última diapositiva". Los horarios guardados con esa opción ahora se reproducen como ritmo del maestro.
:::

## Editar o eliminar un horario

1. Haga clic en el bloque del horario en el calendario.
2. Cambie cualquier campo y haga clic en **Guardar**, o haga clic en **Eliminar** para borrar el horario.

## Horarios superpuestos

Si dos horarios se superponen, el formulario muestra una advertencia: **Se superpone con otro horario. Gana el que empieza más tarde.** Mientras el horario posterior está en curso, las pantallas lo reproducen. Cuando termina, vuelven al horario anterior si todavía está en curso.

## Cómo las pantallas reciben los cambios

Las pantallas vinculadas descargan todo lo programado para los siguientes 7 días, y revisan por sí solas si hay cambios. No necesita tocar el televisor después de editar el calendario. Para ver cuándo una pantalla tiene todo lo que necesita, revise **Listo hasta** en la [página de Pantallas](./managing-screens).

## Artículos relacionados

- **[Crear listas de reproducción](./building-playlists)**: cree las listas de reproducción que programa
- **[Reproducción programada en el TV](./scheduled-playback)**: cómo funcionan en el televisor las lecciones con ritmo del maestro y el control remoto
- **[Administrar pantallas y grupos](./managing-screens)**: agregue grupos y revise las descargas de cada pantalla
- **[Conservar solo una parte de cada lección](/docs/b1-admin/serving/scheduling-lessons#keeping-only-part-of-every-lesson)**: recorte cada lección programada en un tipo de plan a las partes que reproduce su salón
