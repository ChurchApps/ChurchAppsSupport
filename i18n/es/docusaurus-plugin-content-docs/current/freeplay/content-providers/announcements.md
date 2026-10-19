---
title: "Anuncios"
---

# Anuncios

<div class="article-intro">

FreePlay puede reproducir en bucle una carpeta de diapositivas de anuncios en su TV, por ejemplo, en el vestíbulo o antes de que comience una clase. Usted elige una carpeta de uno de sus proveedores de contenido conectados, FreePlay descarga sus diapositivas al dispositivo y aparece un elemento **Anuncios** en la barra lateral para que pueda iniciar el bucle en cualquier momento.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- [Conecte un proveedor de contenido](./connecting-providers) que tenga sus diapositivas de anuncios, como Dropbox u OneDrive
- Coloque las imágenes o los videos que desea reproducir en bucle en una sola carpeta de ese proveedor

</div>

## Elegir la carpeta de anuncios

1. Abra **Configuración** desde la parte inferior de la barra lateral y luego seleccione **Proveedores**
2. Seleccione el proveedor conectado que tiene sus diapositivas (muestra una insignia **Conectado**) para abrir su **Configuración del proveedor**
3. Seleccione **Usar para anuncios**
4. Se abre el explorador **Elegir la carpeta de anuncios**. Avance por las carpetas hasta llegar a la que contiene sus diapositivas y luego seleccione esa carpeta (o cualquier archivo dentro de ella)
5. FreePlay descarga las diapositivas y regresa a **Configuración del proveedor**, donde la fila ahora dice **Reproduciendo en bucle "*nombre de la carpeta*" -- *número* diapositivas descargadas**

Solo se usa una carpeta para los anuncios a la vez. Elegir una carpeta de otro proveedor reemplaza la anterior.

## Reproducir anuncios

Una vez descargadas las diapositivas, aparece un elemento **Anuncios** cerca de la parte superior de la barra lateral (debajo de **Plan de hoy**, si su TV lo muestra). Selecciónelo para iniciar el bucle.

- Las imágenes permanecen en pantalla durante 15 segundos, a menos que el proveedor asigne al archivo su propia duración
- Los videos se reproducen hasta el final antes de pasar a la siguiente diapositiva
- Después de la última diapositiva, el bucle vuelve a empezar desde la primera
- Si la carpeta tiene un único video, se repite en el mismo lugar

El bucle se reproduce desde los archivos guardados en el dispositivo, así que sigue funcionando sin conexión a internet. Puede usar los mismos controles remotos que con cualquier otro contenido; consulte [Reproducir contenido](./playing-content).

## Actualizar las diapositivas

FreePlay revisa la carpeta de anuncios cada vez que se inicia la aplicación, descarga las diapositivas nuevas y elimina las diapositivas que se borraron de la carpeta.

Para revisar de inmediato, abra la **Configuración del proveedor** del proveedor y seleccione **Buscar actualizaciones de anuncios**. La fila muestra **Actualizado** con el número de diapositivas cuando termina.

:::info
Si FreePlay no puede conectarse con el proveedor, o si la carpeta aparece vacía, sigue reproduciendo las diapositivas que ya tiene. Para dejar de usar los anuncios por completo, desactívelos como se describe más abajo.
:::

:::warning
Una diapositiva que se reemplaza por una nueva versión con el mismo archivo no se vuelve a descargar. Para cambiar una diapositiva, agréguela como un archivo nuevo y elimine la anterior.
:::

## Desactivar los anuncios

Abra la **Configuración del proveedor** del proveedor y seleccione **Usar para anuncios** de nuevo. FreePlay deja de usar la carpeta, elimina del dispositivo las diapositivas descargadas y quita **Anuncios** de la barra lateral.

Desconectar el proveedor también desactiva los anuncios que provenían de él.

## Artículos relacionados

- **[Conectar proveedores](./connecting-providers)**: conecte el proveedor que tiene sus diapositivas
- **[Explorar y descargar contenido](./browsing-content)**: explore las carpetas de un proveedor y reproduzca contenido bajo demanda
- **[Reproducir contenido](./playing-content)**: controles del reproductor con el control remoto de su TV
