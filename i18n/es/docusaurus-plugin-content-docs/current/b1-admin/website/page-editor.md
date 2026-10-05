---
title: "Uso del Editor de Páginas"
---

# Uso del Editor de Páginas

<div class="article-intro">

El editor de páginas B1 es un constructor visual de arrastrar y soltar que te permite diseñar páginas de tu sitio web de iglesia sin escribir código. Puedes agregar secciones y bloques de contenido, personalizar estilos, previsualizar tu trabajo y deshacer cambios -- todo desde tu navegador.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Completa la [Configuración Inicial](initial-setup) para configurar tu sitio web
- Crea al menos una página en [Administración de Páginas](managing-pages)
- Necesitas el permiso **content.edit** para acceder al editor

</div>

## Abriendo el Editor

1. En B1 Admin, abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda), expande **Website** y haz clic en **Pages**.
2. Encuentra la página que deseas editar en la tabla Pages y haz clic en **Edit**.

El editor se abre en modo de pantalla completa. El panel izquierdo muestra la estructura de tu página y los elementos de contenido disponibles; el área central muestra una vista previa en vivo de tu página.

:::info
El editor siempre se muestra en modo claro, independientemente de la configuración del tema B1 Admin. Esto asegura que la vista previa coincida exactamente con cómo se verá tu página para los visitantes del sitio web.
:::

## Estructura de Página: Secciones y Elementos

Cada página se construye a partir de dos niveles:

- **Sections** -- Los contenedores de nivel superior que dividen tu página en bandas horizontales (por ejemplo, una sección de héroe, un bloque de contenido o una tira de pie de página). Cada página debe tener al menos una sección antes de poder agregar contenido.
- **Elements** -- Las piezas de contenido individuales colocadas dentro de una sección, como texto, imágenes, botones, tarjetas, formularios y calendarios.

### Agregar una Sección

1. Haz clic en **Add Section** (o el botón **+** en la parte superior del panel izquierdo).
2. Elige cómo empezar:
   - **From a template** — explora la galería de plantillas de sección organizada por categoría (Hero, About, Services, Giving, etc.) y haz clic en una para insertarla como una sección completamente estilizada y prerrellena. Puedes personalizar todo después de que se agregue.
   - **Blank section** — elige un diseño de columna (una sola, dos columnas, tres columnas, etc.) y construye desde cero.
3. La nueva sección aparece en la vista previa. Haz clic en ella para seleccionarla y configurar su color de fondo, relleno y otras opciones de estilo.

### Cambio del Diseño de una Sección

¿Ya construiste una sección pero deseas una estructura diferente? Usa el conmutador de diseño en esa sección para cambiar su arreglo de columnas por uno diferente de la galería mientras mantienes tu contenido y elementos existentes en su lugar.

### Agregar Elementos a una Sección

1. Haz clic dentro de una sección en la vista previa para seleccionarla.
2. Haz clic en **Add Content** y elige un tipo de elemento de la lista:
   - **Text** -- Encabezados, párrafos y texto enriquecido
   - **Image** -- Carga o enlaza una foto
   - **Button** -- Un enlace de llamada a la acción clicable
   - **Card** -- Una imagen con un título y descripción
   - **Form** -- Incrustar un [formulario](../forms/creating-forms) directamente en la página
   - **Calendar** -- Mostrar un calendario de eventos
   - **FAQ** -- Bloques de preguntas y respuestas de estilo acordeón
   - **Video** -- Incrustar un video por URL
   - **Groups Browser** -- Un directorio filtrable de todos los grupos de la iglesia con búsqueda opcional, filtro de categoría y filtro de etiqueta
   - **Icon Feature** -- Un icono con un título y breve descripción, para destaca de características o ministerio
   - **Gallery** -- Un diseño de cuadrícula de varias fotos o mampostería
   - **Testimonial** -- Una o más citas con nombre de autor, función y foto
   - **Social Icons** -- Iconos vinculados para los perfiles de redes sociales de tu iglesia
   - **Countdown** -- Un temporizador que cuenta hacia atrás hasta una fecha o una hora de servicio semanal
   - **Stats** -- Una fila de números grandes con etiquetas (miembros, años, campus)
   - **Campaign Progress** -- Una barra de progreso en vivo para una campaña de donación, mostrando el total recaudado hacia un objetivo de fondo
   - **Staff Grid** -- Tarjetas de foto para los miembros de un grupo; el grupo debe tener su opción **public roster** activada
   - **Service Times** -- El horario de servicios de tus campus, extraído automáticamente de la configuración de asistencia
   - **Sermons** -- Tu biblioteca de sermones, como un navegador completo o una cuadrícula, lista o diseño destacado-últime
   - **Map** -- Un mapa incrustado centrado en la dirección de tu iglesia
   - **Table** -- Una cuadrícula simple de filas y columnas para contenido tabular
   - **Text with Photo** -- Texto e imagen lado a lado
   - **Logo** -- Tu logo de iglesia, extraído de [Apariencia](appearance)
   - **Live Stream** -- Tu reproductor de transmisión en vivo, incrustado directamente en la página
   - **Podcast** -- Una lista de episodios extraídos de una URL de feed RSS de podcast externo que proporcionas, con configuración para cuántos episodios mostrar y si mostrar fechas y descripciones. Esto es para destacar cualquier feed de podcast en tu sitio; para publicar tus propios sermones como un podcast, consulta [Administración de Sermones](../sermons/managing-sermons.md#your-podcast-feed) en su lugar.
   - **Donation** -- Un botón de donación o formulario de donación incrustado
   - **Raw HTML** -- Marcado HTML personalizado para casos de uso avanzados
   - **iFrame** -- Incrustar contenido externo por URL
3. Configura el elemento usando el panel de configuración que aparece.

### Reordenamiento de Contenido

Arrastra secciones o elementos usando el icono de manija (seis puntos) en el lado izquierdo de cada elemento para reordenarlos. Puedes arrastrar elementos dentro de una sección o moverlos entre secciones.

## Estilizar tu Página

### Estilos de Sección

Haz clic en cualquier sección para abrir su panel de estilo. Puedes establecer:

- **Background** -- Color sólido, degradado o imagen. Cuando usas un fondo de imagen, un selector de **Focal Point** te permite hacer clic para establecer qué parte de la imagen permanece centrada a medida que la sección se escala, y una opción de color **Overlay** te permite agregar un tinte semitransparente sobre la imagen para mejorar la legibilidad del texto.
- **Padding** -- Espaciado superior e inferior dentro de la sección
- **Width** -- Ancho completo o centrado/contenido
- **Dividers** -- Divisores de forma decorativa (onda, inclinación, curva, triángulo y más) en el borde superior o inferior de la sección, con opciones de color, altura y volteo

### Estilos de Elemento

Haz clic en cualquier elemento para abrir su panel de estilo. Las opciones comunes incluyen tamaño de fuente, color, alineación, margen y relleno. Para imágenes, puedes establecer texto alternativo y destinos de enlace.

### CSS Personalizado

Para estilos avanzados, cada sección y elemento tiene un campo **Custom CSS** donde puedes escribir tus propias reglas CSS. Estos se limitan a ese elemento, por lo que no afectarán inadvertidamente el resto de la página.

:::tip
Si necesitas aplicar estilos en todo tu sitio -- como una fuente personalizada o color global -- usa la configuración de [Apariencia](appearance) en lugar de CSS personalizado en páginas individuales.
:::

## Vista Previa de tu Página

Usa los controles de vista previa en la barra de herramientas para verificar cómo se ve tu página en diferentes tamaños de pantalla:

- **Desktop** -- Vista de navegador de ancho completo
- **Mobile** -- Vista de tamaño de teléfono estrecho

Haz clic en **Preview** para abrir una versión en vivo de la página en una nueva pestaña del navegador, exactamente como la verán los visitantes.

## Verificación de Accesibilidad

Haz clic en el icono **Accessibility** en la barra de herramientas para ejecutar una verificación rápida de problemas comunes -- imágenes sin texto alternativo, contraste de color bajo o encabezados fuera de orden. Cada problema se vincula directamente al elemento que necesita atención para que puedas solucionarlo en su lugar.

## Deshacer Cambios

El editor rastrear tu historial de edición automáticamente. Usa los botones de la barra de herramientas o atajos de teclado para navegar:

- **Undo** (Ctrl+Z / Cmd+Z) -- Revierte tu última acción
- **Redo** (Ctrl+Y / Cmd+Y) -- Reaplicar una acción deshecha

También puedes restaurar la página a una instantánea anterior. Haz clic en **History** en la barra de herramientas para ver una lista de instantáneas guardadas con descripciones, y haz clic en cualquier entrada para restaurar a ese punto.

:::warning
Restaurar una instantánea reemplaza tu contenido de página actual con la versión de instantánea. Esto no se puede deshacer con el botón deshacer estándar. Guarda una instantánea de tu estado actual antes de restaurar una antigua si deseas mantener la opción de volver.
:::

## Guardando y Publicando

Los cambios se guardan automáticamente a medida que trabajas. Un indicador de estado en la barra de herramientas muestra si tus cambios se han guardado.

### Estado de Borrador y Publicado

Las páginas pueden tener un estado **published**, que controla cuándo los visitantes ven tus cambios. La barra de herramientas muestra un chip de estado que muestra el estado actual:

- **Live on Save** -- La página no utiliza un flujo de trabajo de publicación. Cada cambio guardado se activa inmediatamente. Este es el predeterminado para nuevas páginas.
- **Unpublished Changes** -- La página se ha publicado antes, pero has hecho cambios desde la última publicación. Los visitantes aún ven la versión publicada anteriormente.
- **Published** -- La página está en vivo y tu contenido guardado coincide con lo que ven los visitantes.

Para publicar tus cambios, haz clic en el botón **Publish** en la barra de herramientas. La página se activa inmediatamente.

Para revertir a la última versión publicada sin afectar lo que ven los visitantes, abre el menú de desbordamiento (⋮) y haz clic en **Discard Changes**.

Para desconectar una página completamente, abre el menú de desbordamiento y haz clic en **Unpublish**. Los visitantes ya no verán esa página hasta que la publiques de nuevo.

:::tip
Usa el flujo de trabajo borrador/publicación cuando desees preparar una página -- por ejemplo, para un próximo evento -- y solo hazla activa en el momento adecuado. Construye y obtén una vista previa de la página, luego haz clic en Publish cuando estés listo.
:::

## Artículos Relacionados

- [Administración de Páginas](managing-pages) -- Crea páginas, establece URLs y administra la navegación del sitio
- [Apariencia](appearance) -- Establece colores, fuentes y marca de todo el sitio
- [Archivos](files) -- Carga imágenes y documentos para usar en el editor
- [Creación de Formularios](../forms/creating-forms) -- Construye formularios que puedas incrustar en páginas
