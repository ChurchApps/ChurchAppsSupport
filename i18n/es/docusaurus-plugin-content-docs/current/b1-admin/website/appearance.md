---
title: "Apariencia"
---

# Apariencia

<div class="article-intro">

La página Apariencia te permite personalizar la apariencia general de tu sitio web de iglesia. Desde colores y fuentes hasta espaciado y CSS personalizado, puedes controlar cada aspecto visual de tu sitio desde un solo lugar.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Completa la [Configuración Inicial](initial-setup) de tu sitio web
- Ten tu logo de iglesia listo en formato PNG con un fondo transparente y una relación de aspecto de 4:1
- Conoce los colores de marca de tu iglesia (valores hexadecimales) si tienes una guía de estilo existente

</div>

## Acceso a la Configuración de Apariencia

1. En B1 Admin, abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda) y expande **Website**.
2. Haz clic en **Appearance**.
3. La página **Site Styles** se carga. La tarjeta **Theme, fonts & footer** muestra la lista de **Style Settings** a la izquierda y una vista previa de un sitio de ejemplo a la derecha. Debajo están las tarjetas **Announcement & widgets** y **Redirects & analytics**.

## Paleta de Colores {#color-palette}

1. Haz clic en **Color Palette** en el panel Style Settings.
2. Verás **Base Colors** (tonos claros, acentos y oscuros) y **Semantic Colors** (Primary, Secondary, Success, Warning, y Error).
3. Haz clic en cualquier muestra de color para abrir el selector de colores. Arrastra el selector o ingresa un valor hexadecimal para elegir tu color.
4. La **Color Combinations Preview** muestra cómo tus colores seleccionados funcionan juntos.
5. Usa **Suggested Palettes** para aplicar rápidamente un esquema de colores prediseñado.
6. Haz clic en **Save Palette** cuando estés satisfecho.

## Tipografía

1. Haz clic en **Fonts** en el panel Style Settings.
2. Haz clic en el botón **Heading Font** o **Body Font** para abrir el navegador de fuentes. Puedes buscar por nombre o explorar categorías como Serif, Sans Serif, Display, Handwriting, y Monospace. También puedes elegir una de las **Popular Font Combinations**.
3. Haz clic en **Save Fonts** para aplicar tus selecciones de fuente.
4. Para ajustar la jerarquía de tamaños para Encabezado 1 a Encabezado 4, haz clic en **Typography Scale** en el panel Style Settings. Usa los campos **Type Scale** (multiplicador), **Base Size** y **Line Height** para ajustar, luego haz clic en **Save Typography**.

## Espaciado

1. Haz clic en **Spacing Scale** en el panel Style Settings.
2. Ajusta valores de espaciado de Extra Pequeño a Extra Grande. Los ejemplos prácticos muestran cómo cada valor afecta el diseño.
3. Haz clic en **Save Spacing** para aplicar los valores en todo tu sitio.

## Logo y Marca {#logo-and-branding}

1. Haz clic en **Logo** en el panel Style Settings.
2. Carga tu **Light Background Logo** y **Dark Background Logo**. Usa imágenes con un fondo transparente y una relación de aspecto de 4:1 para obtener los mejores resultados.
3. Carga una **Social Media Image** para vistas previas de enlaces y un **Favicon** para el icono de la pestaña del navegador.

:::tip
Para obtener los mejores resultados, usa un logo con un fondo transparente en formato PNG. Esto asegura que se vea muy bien en fondos claros y oscuros en todo tu sitio web y [aplicación móvil](../settings/mobile-app.md).
:::

## Estilos de Navegación

Personaliza los colores de la barra de navegación de tu sitio web para modos sólido y transparente:

1. Haz clic en **Navigation** en el panel Style Settings
2. Configura colores para **Header (solid)** y **Header over hero (transparent)**
3. Haz clic en **Save Navigation** para aplicar tus colores de navegación

Para obtener instrucciones detalladas, consulta [Estilos de Navegación](./navigation-styles.md).

## Anuncios y Widgets

Los widgets del sitio aparecen en cada página de tu sitio, flotando sobre el contenido de la página:

- **Announcement Banner** -- Una barra descartable en la parte superior de tu sitio para mensajes sensibles al tiempo, como un próximo evento o un cambio de servicio.
- **Launcher** -- Un botón flotante que abre un menú de acceso rápido, por ejemplo enlaces para dar, registrarse o ver el boletín.

1. Busca la tarjeta **Announcement & widgets** debajo de Style Settings.
2. Activa los widgets que desees y configura su texto, enlaces y colores.
3. Haz clic en **Save**.

## Redireccionamientos y Análisis

La tarjeta **Redirects & analytics** (debajo de Style Settings) contiene dos configuraciones no relacionadas pero comúnmente necesarias:

- **Analytics** -- Agrega tu **GA4 Measurement ID** (formato `G-XXXXXXXXXX`) para rastrear el tráfico de visitantes en tu sitio web. El mismo ID también rastrea las vistas de página en la aplicación B1 de tu iglesia (el portal de miembros en `/mobile`, incluida la aplicación instalada), etiquetadas con un `display_mode` de `installed` o `browser` para que puedas distinguir las visitas desde la aplicación instalada de las visitas desde el navegador en Google Analytics.
- **Redirects** -- Mapea una ruta de URL antigua a una nueva, para que los enlaces a una página que moviste o renombraste sigan funcionando en lugar de mostrar 404. Ingresa la ruta **From** antigua y la ruta **To** nueva, luego haz clic en **Save**. Un redireccionamiento también tiene prioridad sobre las páginas integradas de B1 (`/sermons`, `/stream`, `/donate`, `/bible` y `/votd`), por lo que puedes enviar esa dirección a otro lugar (por ejemplo, a tu propia página de sermones o a un canal de YouTube). No reemplaza una página que hayas creado tú mismo en la misma dirección. Elimina primero esa página si quieres que se aplique el redireccionamiento.

## CSS y JavaScript Personalizados

1. Haz clic en **CSS & Javascript** en el panel Style Settings.
2. Agrega **Custom CSS** para anular estilos predeterminados para personalización avanzada.
3. Agrega **Custom HTML** para códigos de seguimiento u otros scripts.
4. Usa la sección **Common JavaScript Examples** para fragmentos como la integración de Google Analytics.

:::warning
CSS personalizado es poderoso pero puede romper el diseño de tu sitio si se usa incorrectamente. La mayoría de las iglesias pueden lograr la apariencia que desean usando los controles integrados de color, fuente y espaciado. Solo usa CSS personalizado si te sientes cómodo con el desarrollo web.
:::

:::info
Tu sitio aplica una Política de Seguridad de Contenido que bloquea scripts en línea de cualquier otra fuente. El campo **Custom HTML** aquí, y el [elemento HTML](page-editor#using-the-html-element) en páginas individuales, son las excepciones de confianza -- el código que guardes allí se ejecuta tal cual, así que solo pega scripts de fuentes en las que confíes (etiquetas de análisis, widgets de chat e incrustaciones similares).
:::

## Temas de Estilo

Si deseas un punto de partida rápido, las **Suggested Palettes** en la sección Color Palette ofrecen temas preconstructidos que establecen colores coordinados en un clic. Siempre puedes ajustar la configuración individual después de aplicar un tema.

## Próximos Pasos

- [Administración de Páginas](managing-pages) -- Construye y organiza tus páginas web
- [Archivos](files) -- Carga activos multimedia para tu sitio
