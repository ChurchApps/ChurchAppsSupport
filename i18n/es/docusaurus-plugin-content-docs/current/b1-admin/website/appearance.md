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
3. La página Site Styles se carga con una vista previa en vivo de tu sitio web a la izquierda y opciones de **Style Settings** a la derecha.

## Paleta de Colores

1. Haz clic en **Color Palette** en el panel Style Settings.
2. Verás **Base Colors** (tonos claros, acentos y oscuros) y **Semantic Colors** (Primary, Secondary, Success, Warning, y Error).
3. Haz clic en cualquier muestra de color para abrir el selector de colores. Arrastra el selector o ingresa un valor hexadecimal para elegir tu color.
4. La **Color Combinations Preview** muestra cómo tus colores seleccionados funcionan juntos.
5. Usa **Suggested Palettes** para aplicar rápidamente un esquema de colores prediseñado.
6. Haz clic en **Save** cuando estés satisfecho.

## Tipografía

1. Haz clic en **Typography Settings** en el panel Style Settings.
2. Haz clic en **Select a Font** para abrir el navegador de fuentes. Puedes buscar por nombre o explorar categorías como Serif, Sans Serif, Display, Handwriting, y Monospace.
3. Establece fuentes para encabezados y texto del cuerpo.
4. Haz clic en **Typography Scale** para ajustar la jerarquía de tamaños para Encabezado 1 a Encabezado 4. Usa los campos multiplicador de escala y tamaño base para ajustar.
5. Haz clic en **Save** para aplicar tus selecciones de fuente.

## Espaciado

1. Haz clic en **Spacing Scale** en el panel Style Settings.
2. Ajusta valores de espaciado de Extra Pequeño a Extra Grande. Los ejemplos prácticos muestran cómo cada valor afecta el diseño.
3. Haz clic en **Save Spacing** para aplicar los valores en todo tu sitio.

## Logo y Marca

1. Haz clic en **Logo** en el panel Style Settings.
2. Carga tu **Light Background Logo** y **Dark Background Logo**. Usa imágenes con un fondo transparente y una relación de aspecto de 4:1 para obtener los mejores resultados.
3. Carga una **Social Media Image** para vistas previas de enlaces y un **Favicon** para el icono de la pestaña del navegador.

:::tip
Para obtener los mejores resultados, usa un logo con un fondo transparente en formato PNG. Esto asegura que se vea muy bien en fondos claros y oscuros en todo tu sitio web y [aplicación móvil](../settings/mobile-app.md).
:::

## Estilos de Navegación

Personaliza los colores de la barra de navegación de tu sitio web para modos sólido y transparente:

1. Desplázate a la sección **Navigation Styles**
2. Haz clic en **Edit Navigation Styles**
3. Configura colores para navegación sólida (con fondo) y navegación transparente (modo superpuesto)
4. Haz clic en **Save** para aplicar tus colores de navegación

Para obtener instrucciones detalladas, consulta [Estilos de Navegación](./navigation-styles.md).

## Anuncios y Widgets

Los widgets del sitio aparecen en cada página de tu sitio, flotando sobre el contenido de la página:

- **Announcement Banner** -- Una barra descartable en la parte superior de tu sitio para mensajes sensibles al tiempo, como un próximo evento o un cambio de servicio.
- **Launcher** -- Un botón flotante que abre un menú de acceso rápido, por ejemplo enlaces para dar, registrarse o ver el boletín.

1. Haz clic en **Announcement & Widgets** en el panel Style Settings.
2. Activa los widgets que desees y configura su texto, enlaces y colores.
3. Haz clic en **Save**.

## Redireccionamientos y Análisis

El panel **Redirects & Analytics** en Style Settings contiene dos configuraciones no relacionadas pero comúnmente necesarias:

- **Analytics** -- Agrega tu **Google Analytics 4 Measurement ID** para rastrear el tráfico de visitantes en tu sitio web.
- **Redirects** -- Mapea una ruta de URL antigua a una nueva, para que los enlaces a una página que moviste o renombraste sigan funcionando en lugar de mostrar 404. Ingresa la ruta **From** antigua y la ruta **To** nueva, luego haz clic en **Save**. Un redireccionamiento también tiene prioridad sobre las páginas integradas de B1 (`/sermons`, `/stream`, `/donate`, `/bible` y `/votd`), por lo que puedes enviar esa dirección a otro lugar (por ejemplo, a tu propia página de sermones o a un canal de YouTube). No reemplaza una página que hayas creado tú mismo en la misma dirección. Elimina primero esa página si quieres que se aplique el redireccionamiento.

## CSS y JavaScript Personalizados

1. Haz clic en **CSS and Javascript** en el panel Style Settings.
2. Agrega **Custom CSS** para anular estilos predeterminados para personalización avanzada.
3. Agrega **Custom HTML** para códigos de seguimiento u otros scripts.
4. Usa la sección **Common Javascript Examples** para fragmentos como la integración de Google Analytics.

:::warning
CSS personalizado es poderoso pero puede romper el diseño de tu sitio si se usa incorrectamente. La mayoría de las iglesias pueden lograr la apariencia que desean usando los controles integrados de color, fuente y espaciado. Solo usa CSS personalizado si te sientes cómodo con el desarrollo web.
:::

:::info
Tu sitio aplica una Política de Seguridad de Contenido que bloquea scripts en línea de cualquier otra fuente. El campo **Custom JavaScript** es la única excepción de confianza -- el código que guardes allí se ejecuta tal cual, así que solo pega scripts de fuentes en las que confíes (etiquetas de análisis, widgets de chat e incrustaciones similares).
:::

## Temas de Estilo

Si deseas un punto de partida rápido, las **Suggested Palettes** en la sección Color Palette ofrecen temas preconstructidos que establecen colores coordinados en un clic. Siempre puedes ajustar la configuración individual después de aplicar un tema.

## Próximos Pasos

- [Administración de Páginas](managing-pages) -- Construye y organiza tus páginas web
- [Archivos](files) -- Carga activos multimedia para tu sitio
