---
title: "Vincular una pantalla"
---

# Vincular una pantalla

<div class="article-intro">

Para poner un TV en un calendario, vincúlelo con **FreePlay Admin**. El TV muestra un código de cuatro letras. Usted ingresa ese código en [admin.freeplay.church](https://admin.freeplay.church) y elige el grupo de pantallas cuyo calendario debe seguir. Solo tiene que hacer esto una vez por TV.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Instale e inicie FreePlay en el TV. Consulte [Primeros pasos](../getting-started/)
- Tenga un inicio de sesión de ChurchApps para su iglesia, para poder iniciar sesión en FreePlay Admin
- Opcionalmente, [cree una lista de reproducción](./building-playlists) y [programela](./scheduling-the-calendar) primero, para que el TV tenga algo que reproducir de inmediato

</div>

## Mostrar el código en el TV

1. En el TV, abra **Configuración** en la parte inferior de la barra lateral.
2. Seleccione **Vincular a un calendario**. La fila muestra **No vinculado** cuando el TV todavía no está vinculado.
3. La pantalla **Vincular esta pantalla** muestra un código QR y un código de vinculación de cuatro letras, con el mensaje **Escanee con su teléfono o vaya a freeplay.church/pair e ingrese este código**.
4. Debajo del código, **Esperando confirmación** parpadea mientras FreePlay espera a que usted termine de vincular.

El código dura 15 minutos, y una cuenta regresiva debajo de él muestra cuánto tiempo queda. Cuando se acaba el tiempo, FreePlay muestra un código nuevo automáticamente. También puede seleccionar **Generar nuevo código** para obtener uno nuevo, o **Cancelar** para volver a Configuración.

## Vincular en FreePlay Admin

1. Escanee el código QR con su teléfono, o vaya a **freeplay.church/pair** en cualquier computadora o teléfono. Inicie sesión si se le pide. FreePlay Admin abre el formulario **Vincular pantalla** con el código ya completado.
   - También puede abrir el formulario usted mismo. Vaya a **Pantallas** en FreePlay Admin y haga clic en **Vincular pantalla**.
2. Verifique el **Código de vinculación**. Son las cuatro letras que aparecen en el TV.
3. Ingrese una **Etiqueta** para distinguir este TV de los demás, por ejemplo "Lobby izquierdo". Es opcional.
4. En **Grupo**, elija el grupo de pantallas cuyo calendario debe seguir este TV. Para crear uno nuevo, elija **＋ Nuevo grupo…** e ingrese un **Nombre del nuevo grupo**.
5. En **Modo**, deje seleccionado **Programado**. El TV reproducirá según el calendario del grupo por sí solo.
6. Haga clic en **Vincular**.

El TV muestra **¡Conectado!** y luego **Cargando su programación...**. Descarga lo programado y comienza a reproducirlo. Consulte [Reproducción programada en el TV](./scheduled-playback).

:::info
Si FreePlay Admin dice **Ese código no coincide con ningún TV**, verifique el código en la pantalla. Si ya venció, use el nuevo código que el TV muestra en este momento.
:::

### Programado frente a manual

La configuración de **Modo** tiene dos opciones:

- **Programado**: reproduce según el calendario del grupo por sí solo. Nadie tiene que presionar Iniciar.
- **Manual**: alguien elige el contenido con el control remoto. Una pantalla manual sigue apareciendo en su lista de **Pantallas**, pero no sigue un calendario, por lo que el campo **Grupo** queda desactivado.

Puede cambiar el modo de una pantalla más adelante desde **Editar** en la [página de Pantallas](./managing-screens).

## Vincular a un plan de servicio en su lugar

El código de la pantalla **Vincular esta pantalla** también funciona en B1 Admin. Si lo ingresa allí y elige un tipo de plan en **Mostrar planes para**, el TV sigue ese tipo de plan en el [Modo de plan](../plan-mode/) en lugar de un calendario. Consulte [Vincular su dispositivo](../plan-mode/device-pairing).

## Cambiar o desvincular desde el TV {#changing-or-unpairing-from-the-tv}

Una vez que el TV está vinculado, la fila **Vincular a un calendario** en **Configuración** muestra el nombre del grupo de pantallas que sigue. Seleccione la fila para abrir el cuadro de diálogo **Vinculado a**, que tiene tres opciones:

- **Mantener**: cierra el cuadro de diálogo. No cambia nada.
- **Desvincular**: deja de seguir un calendario. FreePlay abre la pantalla **Proveedores de contenido**.
- **Vincular a otro calendario**: desvincula y muestra un nuevo código de vinculación para que pueda volver a vincular el TV.

:::warning
Desvincular elimina los archivos que FreePlay descargó para ese calendario.
:::

## Desvincular desde FreePlay Admin

1. Vaya a **Pantallas** y haga clic en la etiqueta de la pantalla.
2. Haga clic en **Más** y luego en **Desvincular**.
3. Haga clic en **Desvincular** de nuevo para confirmar.

El TV vuelve a mostrar un código de vinculación. Vuelva a vincularlo cuando lo desee.

## Artículos relacionados

- **[Administrar pantallas y grupos](./managing-screens)**: cambie el nombre de una pantalla, muévala a otro grupo o revise sus descargas
- **[Programar el calendario](./scheduling-the-calendar)**: decida qué reproducen las pantallas del grupo
- **[Elegir un modo de vinculación](../getting-started/pairing-modes)**: compare el modo programado con el modo de plan y con la exploración manual de proveedores
