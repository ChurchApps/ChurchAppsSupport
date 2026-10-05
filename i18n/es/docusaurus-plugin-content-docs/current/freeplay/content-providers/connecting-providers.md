---
title: "Conectando a Proveedores"
---

# Conectando a Proveedores

<div class="article-intro">

Antes de que puedas explorar contenido de un proveedor, necesitas conectarte a él. Algunos proveedores requieren autenticación a través de un código QR o inicio de sesión por correo electrónico, mientras que otros pueden conectarse con un solo clic.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Instala y lanza FreePlay -- ver [Comenzando](../getting-started/)
- Ten tu control remoto de TV listo para la navegación
- Para proveedores que requieren inicio de sesión, ten tus credenciales de cuenta disponibles

</div>

:::tip ¿Configurando B1 Admin + FreePlay juntos?
Nuestra **<a href="/guides/freeplay-b1admin" target="_blank">guía paso a paso</a>** camina a través de vincular B1 Admin, programar una lección, y conectar FreePlay — todo en un lugar. Ábrela en una nueva pestaña para seguir.
:::

## Explorando Proveedores Disponibles

1. Abre **Configuración** en la parte inferior de la barra lateral, luego selecciona **Proveedores** para abrir la pantalla **Proveedores de Contenido**
2. Verás una cuadrícula de tarjetas de proveedor, cada una mostrando el logo del proveedor y nombre
3. Los proveedores conectados muestran una insignia verde de **Conectado** debajo de su nombre
4. Los proveedores que aún no están disponibles muestran una etiqueta **Próximamente**

## Conectando Sin Autenticación

Algunos proveedores no requieren inicio de sesión. Cuando seleccionas uno de estos proveedores, FreePlay se conecta inmediatamente y abre el navegador de contenido. No se necesitan credenciales.

## Autenticación de Flujo de Dispositivo (Código QR)

Ciertos proveedores usan un flujo de dispositivo, similar a cómo inicias sesión en aplicaciones de transmisión en una TV:

1. Selecciona la tarjeta del proveedor en la pantalla **Proveedores de Contenido**
2. FreePlay muestra un código QR y una URL de verificación
3. Escanea el código QR con tu teléfono, o visita la URL mostrada en cualquier dispositivo
4. Ingresa el código de usuario mostrado en la pantalla de TV
5. Completa el proceso de inicio de sesión en tu teléfono o computadora
6. FreePlay detecta el inicio de sesión exitoso y muestra **¡Conectado!**
7. El navegador de contenido se abre automáticamente

:::info
Un indicador **Esperando autorización** pulsante muestra que FreePlay está comprobando tu inicio de sesión. El código expira después de varios minutos, así que completa el proceso prontamente.
:::

**Go Curriculum** usa el mismo patrón de inicio de sesión de código QR -- escanea el código e inicia sesión con tu cuenta de gocurriculum.com para conectar.

## Inicio de Sesión de Formulario

Otros proveedores usan un inicio de sesión tradicional de correo electrónico y contraseña:

1. Selecciona la tarjeta del proveedor
2. Ingresa tu **Correo Electrónico** y **Contraseña** usando el teclado en pantalla
3. Selecciona el botón **Iniciar Sesión**
4. Si tus credenciales son correctas, FreePlay muestra **¡Conectado!** y abre el navegador de contenido

:::tip
Usa el teclado direccional en tu control remoto para moverte entre el campo de correo electrónico, campo de contraseña, y botón de inicio de sesión. Presiona **Seleccionar** en un campo de texto para abrir el teclado en pantalla.
:::

## Encontrando un Proveedor en Tu Red

**FreeShow** se encuentra en tu red local en lugar de a través de un inicio de sesión: FreePlay busca la red, lista cada computadora ejecutando FreeShow que encuentra, y se conecta a la que seleccionas (elige **Escanear Nuevamente** si ninguna aparece).

## Configuración del Proveedor

Seleccionar una tarjeta de proveedor que muestre la insignia de **Conectado** abre su pantalla de **Configuración del Proveedor**:

- **Explorar Biblioteca** -- Mostrar u ocultar la biblioteca de contenido de este proveedor en la barra lateral
- **Descargar Automáticamente la Lección de Hoy** -- Usa este proveedor como fuente de la lección de hoy y pre-descarga sus archivos (solo se muestra para proveedores que ofrecen una lección actual)
- **Usar para Anuncios** -- Elige una carpeta de este proveedor para bucle desde el elemento **Anuncios** en la barra lateral. Ver [Anuncios](./announcements)
- **Verificar Actualizaciones de Anuncios** -- Se muestra una vez que se elige una carpeta de anuncios; descarga nuevas diapositivas y elimina las eliminadas
- **Desconectar** -- Elimina la conexión

## Desconectando un Proveedor

Para desconectarte de un proveedor al que ya estás conectado:

1. Ve a la pantalla **Proveedores de Contenido** (**Configuración** > **Proveedores**)
2. Selecciona la tarjeta del proveedor que muestra la insignia de **Conectado**
3. En la pantalla **Configuración del Proveedor**, selecciona **Desconectar**

Después de desconectar, el contenido del proveedor ya no aparecerá en tu barra lateral. Si estabas usando una de sus carpetas para anuncios, esas diapositivas se eliminan también.

:::warning
Desconectar elimina la autenticación guardada de tu dispositivo. Necesitarás iniciar sesión nuevamente si deseas reconectar más tarde.
:::

## Artículos Relacionados

- **[Explorando y Descargando Contenido](./browsing-content)** - Navega carpetas y reproduce contenido después de conectar
- **[Anuncios](./announcements)** - Buclé una carpeta de diapositivas de un proveedor conectado
- **[Descripción General de Proveedores de Contenido](./index.md)** - Ver todos los proveedores disponibles
