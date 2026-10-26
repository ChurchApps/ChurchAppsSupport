---
title: "Apariencia"
---

# Apariencia

<div class="article-intro">

La página de Apariencia le permite personalizar el aspecto general de su sitio web de la iglesia. Desde los colores y las fuentes hasta el espaciado y el CSS personalizado, puede controlar cada aspecto visual de su sitio desde un solo lugar.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Complete la [Configuración inicial](initial-setup) de su sitio web
- Tenga listo el logotipo de su iglesia en formato PNG, con fondo transparente y una relación de aspecto de 4:1
- Conozca los colores de marca de su iglesia (valores hexadecimales) si tiene una guía de estilo existente

</div>

## Acceder a la configuración de apariencia

1. En B1 Admin, abra el [menú de salto](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda) y expanda **Sitio web**.
2. Haga clic en **Apariencia**.
3. Se carga la página **Estilos del sitio**. La tarjeta **Tema, fuentes y pie de página** muestra la lista de **Configuración de estilos** a la izquierda y una vista previa de un sitio de ejemplo a la derecha. Debajo se encuentran las tarjetas **Anuncios y widgets** y **Redirecciones y analítica**.

## Paleta de colores {#color-palette}

1. Haga clic en **Paleta de colores** en el panel de Configuración de estilos.
2. Verá los **Colores base** (tonos claro, de acento y oscuro) y los **Colores semánticos** (Principal, Secundario, Éxito, Advertencia y Error).
3. Haga clic en cualquier muestra de color para abrir el selector de color. Arrastre el selector o ingrese un valor hexadecimal para elegir su color.
4. La **Vista previa de combinaciones de colores** muestra cómo funcionan juntos los colores que seleccionó.
5. Use las **Paletas sugeridas** para aplicar rápidamente un esquema de colores predefinido.
6. Haga clic en **Guardar paleta** cuando esté satisfecho.

## Tipografía

1. Haga clic en **Fuentes** en el panel de Configuración de estilos.
2. Haga clic en el botón **Fuente de encabezados** o **Fuente del cuerpo** para abrir el explorador de fuentes. Puede buscar por nombre o explorar categorías como Serif, Sans Serif, Display, Manuscrita y Monoespaciada. También puede elegir una de las **Combinaciones de fuentes populares**.
3. Haga clic en **Guardar fuentes** para aplicar sus elecciones de fuentes.
4. Para ajustar la jerarquía de tamaños de los Encabezados 1 a 4, haga clic en **Escala tipográfica** en el panel de Configuración de estilos. Use los campos **Multiplicador de tipo**, **Tamaño base** y **Altura de línea** para afinar los valores, y luego haga clic en **Guardar tipografía**.

## Espaciado

1. Haga clic en **Escala de espaciado** en el panel de Configuración de estilos.
2. Ajuste los valores de espaciado desde Extra pequeño hasta Extra grande. Ejemplos prácticos muestran cómo afecta cada valor al diseño.
3. Haga clic en **Guardar espaciado** para aplicar los valores en todo su sitio.

## Logotipo e identidad visual {#logo-and-branding}

1. Haga clic en **Logotipo** en el panel de Configuración de estilos.
2. Suba su **Logotipo para fondo claro** y su **Logotipo para fondo oscuro**. Para mejores resultados, use imágenes con fondo transparente y una relación de aspecto de 4:1.
3. Suba una **Imagen para redes sociales** para las vistas previas de enlaces y un **Favicon** para el ícono de la pestaña del navegador.
4. Haga clic en **Guardar cambios**. Las imágenes subidas no se almacenan hasta que guarde, así que si intenta cerrar o recargar primero la pestaña del navegador, este le advertirá que tiene cambios sin guardar.

:::tip
Para obtener los mejores resultados, use un logotipo con fondo transparente en formato PNG. Así se verá bien tanto en fondos claros como oscuros, en su sitio web y en la [aplicación móvil](../settings/mobile-app.md).
:::

## Estilos de navegación

Personalice los colores de la barra de navegación de su sitio web para los modos sólido y transparente:

1. Haga clic en **Navegación** en el panel de Configuración de estilos
2. Configure los colores de **Encabezado (sólido)** y **Encabezado sobre la sección principal (transparente)**
3. Haga clic en **Guardar navegación** para aplicar los colores de navegación

Para obtener instrucciones detalladas, consulte [Estilos de navegación](./navigation-styles.md).

## Anuncios y widgets

Los widgets del sitio aparecen en todas las páginas de su sitio, flotando sobre el contenido de la página:

- **Banner de anuncios**: una barra descartable en la parte superior de su sitio para mensajes urgentes, como un próximo evento o un cambio de servicio.
- **Lanzador**: un botón flotante que abre un menú de acceso rápido, por ejemplo, enlaces para dar, registrarse en el registro de entrada o ver el boletín.

1. Busque la tarjeta **Anuncios y widgets** debajo de la Configuración de estilos.
2. Active los widgets que desee y configure su texto, enlaces y colores.
3. Haga clic en **Guardar**.

## Redirecciones y analítica

La tarjeta **Redirecciones y analítica** (debajo de la Configuración de estilos) contiene dos configuraciones no relacionadas entre sí pero que se necesitan con frecuencia:

- **Analítica**: agregue su **ID de medición de GA4** (formato `G-XXXXXXXXXX`) para registrar el tráfico de visitantes a su sitio web. El mismo ID también registra las vistas de página en la aplicación de B1 de su iglesia (el portal de miembros en `/mobile`, incluida la aplicación instalada), etiquetadas con un `display_mode` de `installed` o `browser`, para que pueda distinguir las visitas desde la aplicación instalada de las visitas desde el navegador en Google Analytics.
- **Redirecciones**: asigne una ruta de URL antigua a una nueva, para que los enlaces a una página que movió o renombró sigan funcionando en lugar de devolver un error 404. Ingrese la ruta **Desde** antigua y la ruta **Hacia** nueva, y luego haga clic en **Guardar**. Una redirección también tiene prioridad sobre las páginas integradas de B1 (`/sermons`, `/stream`, `/donate`, `/bible` y `/votd`), así que puede enviar esa dirección a otro lugar (por ejemplo, a su propia página de sermones o a un canal de YouTube). No reemplaza una página que usted creó en la misma dirección. Elimine primero esa página si desea que la redirección se aplique.

## CSS personalizado y JavaScript

1. Haga clic en **CSS y Javascript** en el panel de Configuración de estilos.
2. Agregue **CSS personalizado** para reemplazar los estilos predeterminados con personalizaciones avanzadas.
3. Agregue **HTML personalizado** para códigos de seguimiento u otros scripts.
4. Use la sección **Ejemplos comunes de JavaScript** para fragmentos como la integración de Google Analytics.

:::warning
El CSS personalizado es poderoso, pero puede romper el diseño de su sitio si se usa de forma incorrecta. La mayoría de las iglesias pueden lograr el aspecto que desean con los controles integrados de color, fuente y espaciado. Use CSS personalizado solo si se siente cómodo con el desarrollo web.
:::

:::info
Su sitio aplica una Política de seguridad de contenido que bloquea los scripts en línea provenientes de cualquier otra fuente. El campo **HTML personalizado** de aquí, y el [elemento HTML](page-editor#using-the-html-element) de páginas individuales, son las excepciones de confianza: el código que guarde allí se ejecuta tal cual, así que pegue solo scripts de fuentes en las que confíe (etiquetas de analítica, widgets de chat y similares).
:::

## Temas de estilo

Si quiere un punto de partida rápido, las **Paletas sugeridas** de la sección Paleta de colores ofrecen temas predefinidos que establecen colores coordinados con un solo clic. Siempre puede ajustar cada configuración después de aplicar un tema.

## Próximos pasos

- [Administrar páginas](managing-pages): cree y organice las páginas de su sitio web
- [Archivos](files): suba recursos multimedia para su sitio
