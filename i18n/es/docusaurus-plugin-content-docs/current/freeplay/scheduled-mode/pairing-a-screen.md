---
title: "Vincular una pantalla"
---

# Vincular una pantalla

<div class="article-intro">

Para poner un televisor en un calendario, vincúlelo con **FreePlay Admin**. El televisor muestra un código de cuatro letras. Ingrese ese código en [admin.freeplay.church](https://admin.freeplay.church) y elija el grupo de pantallas cuyo calendario debe seguir. Solo tiene que hacerlo una vez por televisor.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Instale e inicie FreePlay en el televisor. Consulte [Primeros pasos](../getting-started/)
- Tenga un inicio de sesión de ChurchApps para su iglesia para poder entrar en FreePlay Admin
- Opcionalmente, [cree una lista de reproducción](./building-playlists) y [programela](./scheduling-the-calendar) primero, para que el televisor tenga algo que reproducir de inmediato

</div>

## Mostrar el código en el televisor

1. En el televisor, abra **Configuración** en la parte inferior de la barra lateral.
2. Seleccione **Vincular a un calendario**. La fila muestra **No vinculado** cuando el televisor aún no está vinculado.
3. La pantalla **Vincular esta pantalla** muestra un código QR y un código de vinculación de cuatro letras, con el mensaje **Escanee con su teléfono, o vaya a freeplay.church/pair e ingrese este código**.
4. Debajo del código, **Esperando confirmación** parpadea mientras FreePlay espera a que usted termine la vinculación.

El código dura 15 minutos, y debajo de él un contador muestra cuánto tiempo queda. Cuando el tiempo se agota, FreePlay muestra un código nuevo automáticamente. También puede seleccionar **Generar código nuevo** para obtener uno nuevo, o **Cancelar** para volver a Configuración.

## Vincular en FreePlay Admin

1. Escanee el código QR con su teléfono, o vaya a **freeplay.church/pair** en cualquier computadora o teléfono. Inicie sesión si se le pide. FreePlay Admin abre el formulario **Vincular pantalla** con el código ya completado.
   - También puede abrir el formulario usted mismo. Vaya a **Pantallas** en FreePlay Admin y haga clic en **Vincular pantalla**.
2. Verifique el **Código de vinculación**. Son las cuatro letras que aparecen en el televisor.
3. Escriba una **Etiqueta** para distinguir este televisor de los demás, por ejemplo "Vestíbulo izquierda". Es opcional.
4. En **Grupo**, elija el grupo de pantallas cuyo calendario debe seguir este televisor. Para crear uno nuevo, elija **＋ Nuevo grupo…** e ingrese un **Nombre del nuevo grupo**.
5. En **Modo**, deje seleccionado **Programado**. El televisor reproducirá según el calendario del grupo por sí solo.
6. Haga clic en **Vincular**.

El televisor muestra **¡Conectado!** y luego **Cargando su programación...**. Descarga lo programado y empieza a reproducirlo. Consulte [Reproducción programada en el televisor](./scheduled-playback).

:::info
Si FreePlay Admin dice **Ese código no coincide con ningún televisor**, revise el código en la pantalla. Si venció, use el nuevo código que muestra el televisor en ese momento.
:::

### Programado frente a manual

La configuración de **Modo** tiene dos opciones:

- **Programado**: reproduce según el calendario del grupo por sí solo. Nadie tiene que presionar Iniciar.
- **Manual**: alguien elige el contenido con el control remoto. Una pantalla manual sigue apareciendo en su lista de **Pantallas**, pero no sigue un calendario, así que el campo **Grupo** queda desactivado.

Más adelante puede cambiar el modo de una pantalla desde **Editar** en la [página de Pantallas](./managing-screens).

## Vincular a un plan de servicio

El código de la pantalla **Vincular esta pantalla** también funciona en B1 Admin. Si lo ingresa allí y elige un tipo de plan en **Mostrar planes de**, el televisor sigue ese tipo de plan en el [Modo de plan](../plan-mode/) en lugar de un calendario. Consulte [Vincular su dispositivo](../plan-mode/device-pairing).

## Cambiar o desvincular desde el televisor {#changing-or-unpairing-from-the-tv}

Una vez vinculado el televisor, la fila **Vincular a un calendario** de **Configuración** muestra el nombre del grupo de pantallas al que sigue. Seleccione la fila para abrir el cuadro de diálogo **Vinculado a**, que tiene tres opciones:

- **Volver a la programación**: cierra el cuadro de diálogo y regresa al reproductor programado. La vinculación no cambia.
- **Desvincular**: deja de seguir un calendario. FreePlay abre la pantalla de **Proveedores de contenido**.
- **Vincular a otro calendario**: desvincula y muestra un código de vinculación nuevo para que pueda volver a vincular el televisor.

:::warning
Desvincular elimina los archivos que FreePlay descargó para ese calendario.
:::

## Desvincular desde FreePlay Admin

1. Vaya a **Pantallas** y haga clic en la etiqueta de la pantalla.
2. Haga clic en **Más** y luego en **Desvincular**.
3. Haga clic de nuevo en **Desvincular** para confirmar.

El televisor vuelve a mostrar un código de vinculación. Vincúlelo de nuevo cuando quiera volver a usarlo.

## Artículos relacionados

- **[Administrar pantallas y grupos](./managing-screens)**: cambie el nombre de una pantalla, muévala a otro grupo o revise sus descargas
- **[Programar el calendario](./scheduling-the-calendar)**: decida lo que reproducen las pantallas del grupo
- **[Elegir un modo de vinculación](../getting-started/pairing-modes)**: compare el Modo programado con el Modo de plan y con explorar proveedores usted mismo
