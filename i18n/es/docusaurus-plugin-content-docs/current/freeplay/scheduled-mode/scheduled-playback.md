---
title: "Reproducción programada en el televisor"
description: "Un TV FreePlay vinculado descarga la semana siguiente y reproduce según el reloj, aun sin conexión. Cubre el panel de información, el control y fijar listas."
---

# Reproducción programada en el televisor

<div class="article-intro">

Una vez que un televisor está vinculado a un calendario, FreePlay lo ejecuta por usted. Descarga la semana siguiente, cambia el contenido a las horas programadas y sigue reproduciendo desde su propio almacenamiento si se corta internet. Un maestro o voluntario aún puede pausar, saltar y moverse con el control remoto del televisor.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- [Vincule el televisor a un calendario](./pairing-a-screen.md)
- [Ponga algo en el calendario](./scheduling-the-calendar.md), o configure un bucle predeterminado para el grupo de la pantalla

</div>

## Lo que hace el televisor por sí solo

- **Se abre directamente en la programación**: cuando un televisor vinculado inicia FreePlay, va directamente al reproductor programado
- **Descarga por adelantado**: FreePlay descarga todos los archivos programados para los próximos 7 días, además del bucle predeterminado, y reproduce desde esas descargas
- **Reproduce según el reloj**: a cada hora de inicio programada, la pantalla cambia a ese contenido. Cuando no hay nada programado, reproduce el bucle predeterminado del grupo
- **Busca cambios**: FreePlay consulta FreePlay Admin con regularidad para ver si hay cambios en el calendario y descarga lo nuevo
- **Corrige archivos dañados**: si un archivo descargado no se reproduce, FreePlay lo omite y lo vuelve a descargar

Antes de que lleguen los primeros archivos, la pantalla muestra **Cargando programación...** o **Descargando X de Y archivos**. Si no hay nada programado y el grupo no tiene un bucle predeterminado, muestra **No hay nada programado en este momento**.

## El panel de información

Presione **Seleccionar** en el control remoto para abrir el panel de información. Se cierra solo después de unos segundos. El panel muestra:

- **Arriba a la derecha**: **Listo hasta** seguido de una fecha cuando todo lo anterior a esa fecha está descargado, o **Descargando** mientras siguen llegando archivos. Debajo, cuántos archivos están descargados y una barra de progreso
- **Abajo a la izquierda**: el nombre de lo que se está reproduciendo (o **Bucle predeterminado**), qué elemento está en pantalla y qué viene después y cuándo
- **Última revisión**: cuándo revisó FreePlay por última vez si había cambios en el calendario

El panel también tiene tres botones:

- **Fijar esta lista de reproducción**: mantiene el contenido actual en bucle e ignora el calendario. Seleccione **Desfijar lista de reproducción** para volver a la programación
- **Explorar contenido**: sale del reproductor programado para explorar sus proveedores conectados
- **Configuración**: abre la configuración de FreePlay, donde puede [desvincular o vincular a otro calendario](./pairing-a-screen.md#changing-or-unpairing-from-the-tv)

:::tip
Para volver a la programación después de explorar, presione **Atrás** en el control remoto desde la pantalla de **Proveedores de contenido**, o abra **Configuración**, seleccione **Vincular a un calendario** y elija **Volver a la programación**. Un televisor vinculado también vuelve al reproductor programado cada vez que FreePlay regresa al primer plano, y siempre se abre en el reproductor programado.
:::

## Controles del control remoto

| Botón del control remoto | Acción |
|---|---|
| **Seleccionar** | Abre el panel de información |
| **Reproducir/Pausar** | Pausa o reanuda. Se muestra un ícono de reproducción mientras está en pausa |
| **Flecha derecha** | Siguiente diapositiva o video |
| **Flecha izquierda** | Diapositiva o video anterior |
| **Flecha arriba** | Abre la vista general de diapositivas para saltar a cualquiera |
| **Avance rápido** | Avanza 10 segundos en un video |
| **Retroceso** | Retrocede 10 segundos en un video |
| **Atrás** | Cierra la vista general de diapositivas o el panel de información, o abre el panel de información |

Siguiente y anterior se mantienen dentro del contenido que se está reproduciendo ahora. Solo vuelven del último elemento al primero cuando la programación está configurada para repetirse en bucle. Avance rápido y retroceso solo funcionan durante un video; no hacen nada en una diapositiva.

### Saltar a una diapositiva

Presione **Arriba** para abrir la vista general de diapositivas. Muestra cada elemento de la lista de reproducción o lección actual. Muévase hasta el que quiera y presione **Seleccionar** para saltar directamente a él.

## Lecciones con ritmo del maestro

Cuando una programación está configurada como **Ritmo del maestro**, las diapositivas de imagen no avanzan por sí solas. El maestro avanza con la **flecha derecha**. Un video se reproduce hasta el final y luego pasa al siguiente elemento.

Una lección con ritmo del maestro permanece en pantalla más allá de su hora de fin programada hasta que el maestro llega a la última diapositiva y termina. Entonces la pantalla pasa a lo que siga en la programación. Así, una clase que se alarga no se corta a mitad de la lección.

## Presentar desde un navegador {#presenting-from-a-browser}

También puede reproducir el calendario de una pantalla en un navegador web. En FreePlay Admin, abra la pantalla desde la página **Pantallas** y haga clic en **Presentar en el navegador**. El navegador sigue el calendario de esa pantalla de la misma forma que el televisor, y la barra de controles muestra lo que viene después. Use **Espacio** para pausar, **←** / **→** para saltar, **F** para pantalla completa y **Esc** para salir.

## Artículos relacionados

- **[Programar el calendario](./scheduling-the-calendar.md)**: decida qué se reproduce y qué pasa cuando termina antes
- **[Administrar pantallas y grupos](./managing-screens.md)**: revise las descargas de cada pantalla desde FreePlay Admin
- **[Reproducir contenido](../content-providers/playing-content.md)**: controles del reproductor cuando reproduce contenido usted mismo
