---
title: "Reproducción programada en el televisor"
---

# Reproducción programada en el televisor

<div class="article-intro">

Una vez que un televisor está vinculado a un calendario, FreePlay lo ejecuta por usted. Descarga la semana siguiente, cambia el contenido a las horas programadas y sigue reproduciendo desde su almacenamiento propio si se cae la conexión a internet. Un maestro o voluntario aún puede pausar, saltar y moverse con el control remoto del televisor.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- [Vincule el televisor a un calendario](./pairing-a-screen)
- [Programe algo en el calendario](./scheduling-the-calendar), o establezca un bucle predeterminado para el grupo de la pantalla

</div>

## Lo que hace el televisor por su cuenta

- **Se abre directamente en el calendario** - Cuando un televisor vinculado inicia FreePlay, va directamente al reproductor programado
- **Descarga por adelantado** - FreePlay descarga cada archivo programado para los próximos 7 días, además del bucle predeterminado, y reproduce desde esas descargas
- **Reproduce según el reloj** - A cada hora de inicio programada, la pantalla cambia a ese contenido. Cuando no hay nada programado, reproduce el bucle predeterminado del grupo
- **Busca cambios** - FreePlay consulta FreePlay Admin periódicamente por cambios en el calendario y descarga lo nuevo
- **Corrige archivos dañados** - Si un archivo descargado no se reproduce, FreePlay lo omite y lo vuelve a descargar

Antes de que lleguen los primeros archivos, la pantalla muestra **Loading schedule...** o **Downloading X of Y files**. Si no hay nada programado y el grupo no tiene bucle predeterminado, muestra **Nothing is scheduled right now**.

## El panel de información

Presione **Select** en el control remoto para abrir el panel de información. Se cierra solo tras unos segundos. El panel muestra:

- **Arriba a la derecha** - **Ready through** seguido de una fecha cuando todo lo anterior a esa fecha está descargado, o **Downloading** mientras siguen llegando archivos. Debajo, cuántos archivos están descargados y una barra de progreso
- **Abajo a la izquierda** - El nombre de lo que se está reproduciendo (o **Default loop**), qué elemento está en pantalla y qué viene a continuación y cuándo
- **Last checked** - Cuándo FreePlay revisó por última vez si había cambios en el calendario

El panel también tiene tres botones:

- **Pin This Playlist** - Mantiene en bucle el contenido actual e ignora el calendario. Seleccione **Unpin Playlist** para volver al calendario
- **Browse Content** - Sale del reproductor programado para explorar sus proveedores conectados
- **Settings** - Abre la configuración de FreePlay, donde puede [desvincular o vincular a otro calendario](./pairing-a-screen#changing-or-unpairing-from-the-tv)

:::tip
Para volver al calendario después de explorar, pulse **Back** en el control remoto desde la pantalla **Content Providers**, o abra **Settings**, seleccione **Pair to a calendar** y elija **Back to schedule**. Un televisor vinculado también vuelve al reproductor programado cada vez que FreePlay regresa al primer plano, y siempre se abre en el reproductor programado.
:::

## Controles remotos

| Botón del control | Acción |
|---|---|
| **Select** | Abrir el panel de información |
| **Play/Pause** | Pausar o reanudar. Se muestra un icono de reproducción mientras está en pausa |
| **Flecha derecha** | Siguiente diapositiva o video |
| **Flecha izquierda** | Diapositiva o video anterior |
| **Flecha arriba** | Abrir la vista general de diapositivas para saltar a cualquiera |
| **Fast Forward** | Avanzar 10 segundos en un video |
| **Rewind** | Retroceder 10 segundos en un video |
| **Back** | Cerrar la vista general de diapositivas o el panel de información, o abrir el panel de información |

Siguiente y anterior se mantienen dentro del contenido que se está reproduciendo. Solo vuelven al principio al llegar al último elemento cuando el calendario está configurado para repetir. Fast Forward y Rewind solo funcionan durante un video. No hacen nada en una diapositiva.

### Saltar a una diapositiva

Presione **Up** para abrir la vista general de diapositivas. Muestra todos los elementos de la lista de reproducción o lección actual. Muévase hasta el que quiera y presione **Select** para saltar directamente a él.

## Lecciones con ritmo del maestro

Cuando un horario está configurado como **Teacher paced**, las diapositivas de imagen no avanzan por sí solas. El maestro avanza con la **flecha derecha**. Un video se reproduce hasta el final y luego pasa al siguiente elemento.

Una lección con ritmo del maestro permanece en pantalla más allá de su hora de fin programada hasta que el maestro llega a la última diapositiva y termina. Después, la pantalla pasa a lo que siga en el calendario. Así una clase que se alarga no se corta a mitad de la lección.

## Presentar desde un navegador

También puede reproducir el calendario de una pantalla en un navegador web. En FreePlay Admin, abra la pantalla desde la página **Screens** y haga clic en **Present in browser**. El navegador sigue el calendario de esa pantalla igual que el televisor, y la barra de controles muestra lo que viene a continuación. Use **Space** para pausar, **←** / **→** para saltar, **F** para pantalla completa y **Esc** para salir.

## Artículos relacionados

- **[Programar el calendario](./scheduling-the-calendar)** - Defina qué se reproduce y qué pasa cuando termina antes de tiempo
- **[Administrar pantallas y grupos](./managing-screens)** - Revise las descargas de cada pantalla desde FreePlay Admin
- **[Reproducir contenido](../content-providers/playing-content)** - Controles del reproductor cuando reproduce contenido usted mismo
