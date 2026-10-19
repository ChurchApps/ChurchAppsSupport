---
title: "Conectar con proveedores"
---

# Conectar con proveedores

<div class="article-intro">

Antes de explorar el contenido de un proveedor, necesita conectarse a él. Algunos proveedores requieren autenticación mediante un código QR o un inicio de sesión por correo electrónico, mientras que otros pueden conectarse con un solo clic.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Instale e inicie FreePlay; consulte [Primeros pasos](../getting-started/)
- Tenga a mano el control remoto del televisor para navegar
- En los proveedores que requieren inicio de sesión, tenga a mano sus credenciales de cuenta

</div>

:::tip ¿Configura B1 Admin y FreePlay juntos?
Nuestra **<a href="/guides/freeplay-b1admin" target="_blank">guía paso a paso</a>** explica cómo vincular B1 Admin, programar una lección y conectar FreePlay, todo en un solo lugar. Ábrala en una pestaña nueva para seguirla.
:::

## Explorar los proveedores disponibles

1. Abra **Configuración** en la parte inferior de la barra lateral y seleccione **Proveedores** para abrir la pantalla **Proveedores de contenido**
2. Verá una cuadrícula de tarjetas de proveedores, cada una con el logotipo y el nombre del proveedor
3. Los proveedores conectados muestran una insignia verde **Conectado** debajo de su nombre
4. Los proveedores que aún no están disponibles muestran una etiqueta **Próximamente**

## Conectar sin autenticación

Algunos proveedores no requieren inicio de sesión. Al seleccionar uno de estos proveedores, FreePlay se conecta de inmediato y abre el explorador de contenido. No se necesitan credenciales.

## Autenticación por flujo de dispositivo (código QR)

Ciertos proveedores usan un flujo de dispositivo, similar a la forma en que inicia sesión en las aplicaciones de streaming de un televisor:

1. Seleccione la tarjeta del proveedor en la pantalla **Proveedores de contenido**
2. FreePlay muestra una pantalla **Conectar a** con el nombre del proveedor, un código QR y una URL de verificación
3. Escanee el código QR con su teléfono o visite la URL que aparece en cualquier dispositivo
4. Introduzca el código que se muestra en la pantalla del televisor
5. Complete el proceso de inicio de sesión en su teléfono o computadora
6. FreePlay detecta el inicio de sesión exitoso y muestra **¡Conectado!**
7. El explorador de contenido se abre automáticamente

:::info
Un indicador pulsante **Esperando confirmación** muestra que FreePlay está comprobando su inicio de sesión. La pantalla muestra cuántos minutos quedan antes de que venza el código, así que complete el proceso con prontitud. Seleccione **Generar nuevo código** si se agota el tiempo.
:::

## Inicio de sesión con teléfono (solo código QR)

**Dropbox**, **OneDrive** y **Go Curriculum** usan un inicio de sesión con código QR ligeramente distinto, sin código que escribir:

1. Seleccione la tarjeta del proveedor en la pantalla **Proveedores de contenido**
2. FreePlay muestra una pantalla **Conectar a** con el nombre del proveedor y un código QR
3. Escanee el código QR con su teléfono e inicie sesión en su cuenta de ese proveedor (su cuenta de Microsoft para OneDrive, o su cuenta de gocurriculum.com para Go Curriculum)
4. Apruebe el acceso. El televisor se conecta automáticamente y muestra **¡Conectado!**

La pantalla muestra cuántos minutos le quedan para terminar de iniciar sesión.

## Inicio de sesión con formulario

Otros proveedores usan un inicio de sesión tradicional con correo electrónico y contraseña:

1. Seleccione la tarjeta del proveedor
2. Introduzca su **Correo electrónico** y su **Contraseña** con el teclado en pantalla
3. Seleccione el botón **Iniciar sesión**
4. Si sus credenciales son correctas, FreePlay muestra **¡Conectado!** y abre el explorador de contenido

:::tip
Use el control direccional de su control remoto para moverse entre el campo de correo, el campo de contraseña y el botón de inicio de sesión. Presione **Seleccionar** en un campo de texto para abrir el teclado en pantalla.
:::

## Configuración del proveedor

Al seleccionar una tarjeta de proveedor que muestra la insignia **Conectado**, se abre su pantalla de **Configuración del proveedor**:

- **Explorar biblioteca**: mostrar u ocultar la biblioteca de contenido de este proveedor en la barra lateral
- **Descargar automáticamente la lección de hoy**: usar este proveedor como fuente de la lección de hoy y descargar previamente sus archivos (solo aparece en los proveedores que ofrecen una lección actual)
- **Usar para anuncios**: elija una carpeta de este proveedor para reproducirla en bucle desde el elemento **Anuncios** de la barra lateral. Véase [Anuncios](./announcements)
- **Buscar actualizaciones de anuncios**: aparece una vez que se ha elegido una carpeta de anuncios; descarga las diapositivas nuevas y elimina las borradas
- **Desconectar**: elimina la conexión

## Desconectar un proveedor

Para desconectarse de un proveedor al que ya se ha conectado:

1. Vaya a la pantalla **Proveedores de contenido** (**Configuración** > **Proveedores**)
2. Seleccione la tarjeta del proveedor que muestra la insignia **Conectado**
3. En la pantalla **Configuración del proveedor**, seleccione **Desconectar**

Después de desconectarse, el contenido del proveedor ya no aparecerá en su barra lateral. Si estaba usando una de sus carpetas para anuncios, esas diapositivas también se eliminan.

:::warning
Al desconectar se elimina la autenticación guardada en su dispositivo. Tendrá que iniciar sesión de nuevo si desea reconectarse más adelante.
:::

## Artículos relacionados

- **[Explorar y descargar contenido](./browsing-content)**: navegue por las carpetas y reproduzca contenido después de conectarse
- **[Anuncios](./announcements)**: reproduzca en bucle una carpeta de diapositivas de un proveedor conectado
- **[Descripción general de los proveedores de contenido](./index.md)**: consulte todos los proveedores disponibles
