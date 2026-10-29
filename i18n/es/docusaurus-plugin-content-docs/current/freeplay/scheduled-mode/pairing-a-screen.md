---
title: "Vincular una pantalla"
---

# Vincular una pantalla

<div class="article-intro">

Para poner un televisor en un calendario, vincúlelo con **FreePlay Admin**. El televisor muestra un código de cuatro letras. Usted introduce ese código en [admin.freeplay.church](https://admin.freeplay.church) y elige el grupo de pantallas cuyo calendario debe seguir. Solo tiene que hacerlo una vez por televisor.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Instale y abra FreePlay en el televisor. Consulte [Primeros pasos](../getting-started/)
- Tenga un inicio de sesión de ChurchApps para su iglesia para poder iniciar sesión en FreePlay Admin
- Opcionalmente, [cree una lista de reproducción](./building-playlists) y [prográmela](./scheduling-the-calendar) primero para que el televisor tenga algo que reproducir de inmediato

</div>

## Mostrar el código en el televisor

1. En el televisor, abra **Settings** en la parte inferior de la barra lateral.
2. Seleccione **Pair to a calendar**. La fila muestra **Not paired** cuando el televisor todavía no está vinculado.
3. La pantalla **Pair this screen** muestra un código QR y un código de vinculación de cuatro letras, con el mensaje **Scan with your phone, or go to freeplay.church/pair and enter this code**.
4. Debajo del código, **Waiting for confirmation** parpadea mientras FreePlay espera a que termine la vinculación.

El código dura 15 minutos, y una cuenta regresiva debajo de él muestra el tiempo restante. Cuando se acaba el tiempo, FreePlay muestra un código nuevo automáticamente. También puede seleccionar **Generate New Code** para obtener uno nuevo, o **Cancel** para volver a Settings.

## Vincular en FreePlay Admin

1. Escanee el código QR con su teléfono, o vaya a **freeplay.church/pair** desde cualquier computadora o teléfono. Inicie sesión si se le pide. FreePlay Admin abre el formulario **Pair screen** con el código ya escrito.
   - También puede abrir el formulario usted mismo. Vaya a **Screens** en FreePlay Admin y haga clic en **Pair screen**.
2. Revise el **Pairing code**. Son las cuatro letras que aparecen en el televisor.
3. Escriba una **Label** para distinguir este televisor de los demás, por ejemplo "Lobby left". Es opcional.
4. En **Group**, elija el grupo de pantallas cuyo calendario debe seguir este televisor. Para crear uno nuevo, elija **＋ New group…** e introduzca un **New group name**.
5. En **Mode**, deje seleccionado **Scheduled**. El televisor reproducirá según el calendario del grupo por sí solo.
6. Haga clic en **Pair**.

El televisor muestra **Connected!** y luego **Loading your schedule...**. Descarga lo programado y empieza a reproducirlo. Consulte [Reproducción programada en el televisor](./scheduled-playback).

:::info
Si FreePlay Admin dice **That code didn't match a TV**, revise el código en la pantalla. Si ha caducado, use el nuevo código que el televisor muestra en ese momento.
:::

### Programado frente a manual

La opción **Mode** tiene dos valores:

- **Scheduled** - Reproduce según el calendario del grupo por sí solo. Nadie tiene que pulsar Start.
- **Manual** - Alguien elige el contenido con el control remoto. Una pantalla manual sigue apareciendo en su lista de **Screens**, pero no sigue ningún calendario, así que el campo **Group** se desactiva.

Más adelante puede cambiar el modo de una pantalla desde **Edit** en la [página Screens](./managing-screens).

## Vincular a un plan de servicio en su lugar

El código de la pantalla **Pair this screen** también funciona en B1 Admin. Si lo introduce allí y elige un tipo de plan en **Show Plans For**, el televisor sigue ese tipo de plan en [Plan Mode](../plan-mode/) en lugar de un calendario. Consulte [Vincular su dispositivo](../plan-mode/device-pairing).

## Cambiar o desvincular desde el televisor

Una vez vinculado el televisor, la fila **Pair to a calendar** en **Settings** muestra el nombre del grupo de pantallas que sigue. Seleccione la fila para abrir el cuadro de diálogo **Paired to**, que tiene tres opciones:

- **Back to schedule** - Cierra el cuadro de diálogo y vuelve al reproductor programado. La vinculación no cambia.
- **Unpair** - Deja de seguir un calendario. FreePlay abre la pantalla **Content Providers**.
- **Pair to a different calendar** - Desvincula y muestra un nuevo código de vinculación para volver a vincular el televisor.

:::warning
Desvincular elimina los archivos que FreePlay descargó para ese calendario.
:::

## Desvincular desde FreePlay Admin

1. Vaya a **Screens** y haga clic en la etiqueta de la pantalla.
2. Haga clic en **More** y luego en **Unpair**.
3. Haga clic en **Unpair** de nuevo para confirmar.

El televisor vuelve a mostrar un código de vinculación. Vuelva a vincularlo cuando quiera que lo use otra vez.

## Artículos relacionados

- **[Administrar pantallas y grupos](./managing-screens)** - Cambie el nombre de una pantalla, muévala a otro grupo o revise sus descargas
- **[Programar el calendario](./scheduling-the-calendar)** - Decida qué reproducen las pantallas del grupo
- **[Elegir un modo de vinculación](../getting-started/pairing-modes)** - Compare el Scheduled Mode con el Plan Mode y la exploración manual de proveedores
