---
title: "Gestionar pantallas y grupos"
---

# Gestionar pantallas y grupos

<div class="article-intro">

La página **Pantallas** de FreePlay Admin muestra todos los televisores vinculados a tu iglesia, con lo que se está reproduciendo ahora y si están listos para el domingo. Aquí también gestionas los **grupos de pantallas**. Las pantallas de un mismo grupo comparten un calendario y un bucle predeterminado.

</div>

<div class="prereqs">
<h4>Antes de empezar</h4>

- Inicia sesión en FreePlay Admin en [admin.freeplay.church](https://admin.freeplay.church)
- [Vincula al menos una pantalla](./pairing-a-screen)

</div>

## La página Pantallas

En la parte superior, tres números te dan una vista rápida del estado:

- **En línea ahora** - Pantallas que se han conectado durante los últimos 15 minutos
- **Listas para el domingo** - Cuántas pantallas programadas tienen todo descargado hasta el próximo domingo
- **Requieren atención** - Pantallas que están desconectadas o les faltan archivos

Debajo, usa **Buscar pantallas** para encontrar una pantalla por etiqueta, grupo o contenido en reproducción. Los filtros reducen la lista a **Todas**, **Programadas**, **Manuales**, **Requieren atención** o un solo grupo. Cambia entre las vistas **Tabla** y **Cuadrícula** con el selector de la derecha.

Cada pantalla muestra su:

- **Etiqueta** y modelo de dispositivo
- **Grupo**
- **Modo** - **Programada** o **Manual**
- **Reproduciendo ahora** - Lo que aparece en pantalla en este momento. Las pantallas manuales muestran **Clase · el profesor pulsa Iniciar**
- **Listo hasta** - La fecha hasta la que la pantalla ha descargado el contenido. Si no se descargaron archivos, muestra **N archivos que faltan** en su lugar. Una pantalla nueva muestra **Esperando la primera sincronización**
- **Última conexión** - Cuándo se conectó por última vez la pantalla. Una pantalla que lleva un tiempo sin conectarse muestra **Desconectada**, y una que nunca se conectó muestra **Nunca vista**

Usa **Presentar** para reproducir el calendario de la pantalla en tu navegador, o **Editar** para cambiar su configuración.

## Ver una pantalla

Haz clic en la etiqueta de una pantalla para abrir su página. A la izquierda:

- **Presentar en el navegador** - Reproduce el calendario de esta pantalla a pantalla completa en tu navegador, tal como se vería en el televisor. Consulta [Presentar desde un navegador](./scheduled-playback#presenting-from-a-browser)
- **Editar** - Cambia la etiqueta, el grupo o el modo
- **Más** > **Desvincular** - Desconecta el televisor. Vuelve a mostrar un código de vinculación

El resto de la página tiene estas secciones:

- **Ahora y después** - Lo que se está reproduciendo ahora y hasta cuándo, seguido de todo lo programado para los próximos 7 días. Haz clic en **Abrir calendario** para ir al calendario de este grupo
- **Descargas** - **Listo hasta** una fecha cuando todo está descargado, o una lista de los archivos que faltan
- **Dispositivo** - ID del dispositivo, plataforma, modelo, versión de la aplicación FreePlay, dirección IP, almacenamiento usado y libre, última conexión y modo
- **Reciente** - La actividad más reciente que ha reportado la pantalla

:::tip
Si una pantalla muestra archivos que faltan, asegúrate de que esté en línea y tenga espacio libre de almacenamiento. El televisor descarga los archivos que faltan por sí solo la próxima vez que se conecte.
:::

## Editar una pantalla

1. Haz clic en **Editar** junto a la pantalla, o en su página.
2. Cambia la **Etiqueta**, el **Grupo** o el **Modo** (**Programada** o **Manual**).
3. Haz clic en **Guardar**.

Mover una pantalla a otro grupo la cambia al calendario de ese grupo.

## Grupos de pantallas {#screen-groups}

Un grupo de pantallas es un conjunto de pantallas que reproducen lo mismo al mismo tiempo, como "Vestíbulo" o "Ala infantil". Cada grupo tiene su propio calendario y puede tener un **bucle predeterminado** que se reproduce cuando no hay nada programado.

Para gestionar los grupos, haz clic en **Grupos** en la parte superior de la página **Pantallas**. La lista **Grupos de pantallas** muestra el nombre de cada grupo, cuántas pantallas tiene y su bucle predeterminado. Haz clic en **Pantallas** para volver.

### Agregar un grupo

1. En la vista **Grupos de pantallas**, haz clic en **Agregar grupo**.
2. Escribe un **Nombre**, por ejemplo "Vestíbulo".
3. Elige una lista de reproducción como **Bucle predeterminado**, o déjalo en **Ninguno: la pantalla se apaga**.
4. Haz clic en **Guardar**.

También puedes crear un grupo al vincular una pantalla eligiendo **＋ Nuevo grupo…** en el campo **Grupo**.

### Editar o eliminar un grupo

1. Haz clic en **Editar** junto al grupo.
2. Cambia el nombre o el bucle predeterminado y haz clic en **Guardar**.
3. Para eliminar el grupo, haz clic en **Eliminar** y confirma.

:::warning
Al eliminar un grupo también se elimina su programación. Las pantallas de ese grupo se apagan hasta que las muevas a otro grupo.
:::

## Artículos relacionados

- **[Vincular una pantalla](./pairing-a-screen)** - Agregar un televisor nuevo
- **[Programar el calendario](./scheduling-the-calendar)** - Definir lo que reproduce cada grupo y su bucle predeterminado
- **[Reproducción programada en el televisor](./scheduled-playback)** - Lo que significa la fecha "Listo hasta" en el propio televisor
