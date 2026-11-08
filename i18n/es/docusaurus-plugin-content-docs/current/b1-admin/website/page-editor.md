---
title: "Usar el editor de páginas"
description: "Configure un editor de páginas en B1 Admin añadiendo secciones y elementos, aplicando estilos, previsualizando en móvil y publicando borradores. También explica cómo deshacer cambios y consultar el historial de versiones."
---

# Usar el editor de páginas

<div class="article-intro">

El editor de páginas de B1 es un constructor visual de arrastrar y soltar que le permite diseñar las páginas de su sitio web de la iglesia sin escribir código. Puede añadir secciones y bloques de contenido, personalizar estilos, previsualizar su trabajo y deshacer cambios, todo desde su navegador.

</div>

## Video de capacitación

<YouTube id="m2B_JxmfFm4" title="Editar páginas y navegación en B1" next="Conectar un dominio personalizado en B1" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Antes de empezar</h4>

- Complete la [configuración inicial](./initial-setup.md) para tener su sitio web configurado
- Cree al menos una página en [Administrar páginas](./managing-pages.md)
- Necesita el permiso **content.edit** para acceder al editor

</div>

## Abrir el editor

1. En B1 Admin, abra el [menú de salto](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expanda **Website** y haga clic en **Pages**.
2. Busque la página que desea editar en la tabla de páginas y haga clic en **Edit Content**.

El editor se abre en modo de pantalla completa. El panel izquierdo muestra la estructura de su página y los elementos de contenido disponibles; el área central muestra una vista previa en vivo de su página.

:::info
El editor siempre se muestra en modo claro, sin importar la configuración de tema de B1 Admin, y usa las fuentes de encabezado y de texto que eligió en [Apariencia](./appearance.md). Así, la vista previa coincide con la forma en que su página se verá para los visitantes del sitio web.
:::

## Estructura de la página: secciones y elementos

Cada página se construye con dos niveles:

- **Secciones**: los contenedores de nivel superior que dividen su página en bandas horizontales (por ejemplo, una sección principal, un bloque de contenido o una franja de pie de página). Cada página debe tener al menos una sección antes de poder añadir contenido.
- **Elementos**: las piezas de contenido individuales colocadas dentro de una sección, como texto, imágenes, botones, tarjetas, formularios y calendarios.

### Añadir una sección

1. Haga clic en **Add Section** (o en el botón **+** en la parte superior del panel izquierdo).
2. Elija cómo empezar:
   - **Desde una plantilla**: explore la galería de plantillas de secciones organizada por categoría (Hero, About, Services, Giving, etc.) y haga clic en una para insertarla como una sección con estilos completos y contenido de ejemplo. Puede personalizar todo después de añadirla.
   - **Sección en blanco**: elija una distribución de columnas (una columna, dos columnas, tres columnas, etc.) y construya desde cero.
3. La nueva sección aparece en la vista previa. Haga clic en ella para seleccionarla y configurar su color de fondo, su relleno y otras opciones de estilo.

### Cambiar la distribución de una sección

¿Ya construyó una sección pero quiere otra estructura? Use el selector de distribución de esa sección para cambiar su disposición de columnas por otra de la galería, manteniendo el contenido y los elementos existentes en su lugar.

### Añadir elementos a una sección

1. Haga clic dentro de una sección en la vista previa para seleccionarla.
2. Haga clic en **Add Content** y elija un tipo de elemento de la lista:
   - **Text**: encabezados, párrafos y texto enriquecido
   - **Image**: suba una foto o enlace a una
   - **Button**: un enlace de llamada a la acción en forma de botón
   - **Card**: una imagen con un título y una descripción
   - **Form**: incruste un [formulario](../forms/creating-forms.md) directamente en la página. Si el formulario tiene una [foto de encabezado](../forms/creating-forms.md#adding-a-header-photo), se muestra encima de las preguntas
   - **Calendar**: muestra un calendario de eventos
   - **FAQ**: bloques de preguntas y respuestas tipo acordeón
   - **Video**: incruste un video mediante su URL
   - **Groups Browser**: un directorio filtrable de todos los grupos de la iglesia, con búsqueda opcional, filtro por categoría y filtro por etiqueta. Su **Layout** puede ser **Grid** (el predeterminado) o **Scrolling (automatic)**; consulte [Diseños con desplazamiento](#scrolling-layouts)
   - **Group List**: mosaicos de sus grupos públicos, opcionalmente solo los grupos con una etiqueta determinada. Su **Layout** puede ser **Grid** (el predeterminado; hasta tres mosaicos por fila) o **Scrolling (automatic)**; consulte [Diseños con desplazamiento](#scrolling-layouts)
   - **Icon Feature**: un ícono con un título y una descripción breve, para destacar funciones o ministerios
   - **Gallery**: una cuadrícula o un diseño tipo mampostería con varias fotos
   - **Testimonial**: una o más citas con el nombre, el cargo y la foto del autor
   - **Social Icons**: íconos con enlace a los perfiles de redes sociales de la iglesia: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo y Podcast. Complete un enlace para cada una que desee mostrar; para **WhatsApp**, use un enlace `https://wa.me/` con su número o un enlace de invitación a un grupo
   - **Countdown**: un temporizador que cuenta regresivamente hasta una fecha o un horario de culto semanal
   - **Stats**: una fila de números grandes con etiquetas (miembros, años, sedes)
   - **Campaign Progress**: una barra de progreso en vivo para una campaña de donaciones, que muestra el total recaudado hacia la meta de un fondo
   - **Staff Grid**: tarjetas con fotos de los miembros de un grupo; el grupo debe tener activada la opción de **lista pública**
   - **Service Times**: el horario de cultos de sus sedes, obtenido automáticamente de la configuración de asistencia
   - **Sermons**: su biblioteca de sermones, como un explorador completo o con diseño de cuadrícula, lista o destacado del más reciente
   - **Map**: un mapa incrustado centrado en la dirección de la iglesia
   - **Table**: una cuadrícula simple de filas y columnas para contenido tabular
   - **Text with Photo**: texto e imagen uno al lado del otro
   - **Logo**: el logotipo de la iglesia, tomado de [Apariencia](./appearance.md)
   - **Live Stream**: el reproductor de su transmisión en vivo, incrustado directamente en la página
   - **Podcast**: una lista de episodios tomada de una fuente RSS de podcast externa que usted proporciona, con opciones para definir cuántos episodios mostrar y si se muestran las fechas y las descripciones. Cada episodio en el sitio publicado tiene un reproductor de audio y un enlace **Download** que guarda el archivo de audio del episodio con el título del episodio. Esto sirve para destacar cualquier fuente de podcast en su sitio; para publicar sus propios sermones como podcast, consulte [Administrar sermones](../sermons/managing-sermons.md#your-podcast-feed)
   - **Donation**: un botón de donación o un formulario de donación incrustado
   - **HTML**: su propio HTML sin procesar, para casos avanzados, como incrustar un widget de terceros (consulte [Usar el elemento HTML](#using-the-html-element))
   - **iFrame**: incruste contenido externo mediante una URL
3. Configure el elemento con el panel de ajustes que aparece.

### Usar el elemento HTML

El elemento **HTML** tiene dos cuadros:

- **HTML Content**: el código que se muestra en la página. Cualquier etiqueta `<script>` que incluya aquí se ejecuta en su sitio publicado.
- **JavaScript (exclude script tag)**: código de script que se ejecuta cuando carga la página. También puede pegar aquí el fragmento de incrustación de un proveedor con sus etiquetas `<script>` incluidas, y se ejecutará en el sitio publicado.

Si pega solo una dirección web (como un enlace a una imagen) en el cuadro de JavaScript, el cuadro se pone rojo con la advertencia *"This is a web address, not JavaScript."* Una dirección sola en ese cuadro no hace nada. Para mostrar una imagen, use un elemento **Image** o escriba `<img src="...">` en **HTML Content**.

### Usar el elemento Calendar {#using-the-calendar-element}

El elemento **Calendar** muestra eventos de uno de sus calendarios:

1. En **Select**, elija **Group Calendar** (los eventos de un grupo; la lista muestra los grupos a los que pertenece) o **Curated Calendar** (un calendario que creó en **Calendars**; consulte [Calendario curado](../calendars/curated-calendar.md)).
2. En **Select Calendar**, elija el grupo o el calendario.
3. En **Display**, elija cómo mostrarlo:
   - **Month calendar**: una cuadrícula mensual que los visitantes pueden recorrer. Cada evento se colorea según el grupo al que pertenece, de modo que los eventos de un grupo tienen el mismo color en todos los calendarios. B1 elige los colores automáticamente; no hay nada que configurar.
   - **Upcoming events**: una cuadrícula de mosaicos con los próximos 12 eventos; un evento que se repite se muestra una sola vez, en su siguiente fecha. Cada mosaico muestra la foto del evento (o su título sobre el color oscuro de su tema, si no tiene foto), una etiqueta de fecha, el día y la hora, y la primera línea de su descripción. Un botón **Subscribe** encima de los mosaicos permite a los visitantes copiar el enlace ICS del calendario o descargarlo. Para esta visualización aparece una opción **Layout**: **Grid** (el predeterminado) o **Scrolling (automatic)**, que coloca los mosaicos en una sola fila que se desplaza sola (consulte [Diseños con desplazamiento](#scrolling-layouts)). Para un **Curated Calendar**, active la opción **Group badge** para mostrar el nombre del grupo de cada evento en la esquina superior derecha de su mosaico, con el color del calendario de ese grupo. Los eventos de grupos archivados o confidenciales no muestran esta etiqueta.
4. Para mostrar solo algunos eventos, escriba una etiqueta en **Only events tagged**, por ejemplo, `youth`. Solo aparecen los eventos cuyas **Tags** incluyen esa palabra. Déjelo vacío para mostrar todos los eventos. Las etiquetas se asignan a cada evento; consulte [Agregar y editar eventos](../calendars/creating-calendars.md#adding-and-editing-events).

En cualquiera de las dos visualizaciones, al hacer clic en un evento se abre su propia página en su sitio web. La página del evento muestra la foto, el título, la fecha y la hora, y la descripción, además de un recuadro con **When** (incluido el patrón de repetición de un evento recurrente) y **Where** (las salas reservadas para él). También tiene un botón **Register for this Event** cuando el registro está activado, y un enlace **Add to my calendar** que descarga el evento como archivo de calendario. La página está preparada para que los buscadores puedan mostrar la fecha y los detalles del evento en sus resultados. Las páginas de eventos de calendarios curados que se muestran en sus páginas (para eventos de los próximos seis meses) también aparecen en el mapa del sitio, para que los buscadores puedan encontrarlas.

### Diseños con desplazamiento {#scrolling-layouts}

El diseño **Scrolling (automatic)** de **Groups Browser**, **Group List** y la visualización **Upcoming events** del elemento Calendar coloca los mosaicos en una sola fila en lugar de una cuadrícula. En un teléfono, cada mosaico ocupa toda la fila; en una computadora caben dos mosaicos uno al lado del otro. Cuando hay más mosaicos de los que caben, la fila:

- Avanza un mosaico aproximadamente cada cuatro segundos, y vuelve al primero después del último.
- Se detiene mientras un visitante pasa el cursor, toca o navega con el teclado sobre ella, y se reanuda unos segundos después.
- Muestra una fila de puntos debajo, uno por mosaico, con el punto del mosaico actual relleno. Los visitantes pueden hacer clic en un punto para ir directamente a ese mosaico.

En los dispositivos configurados para reducir el movimiento, la fila se mantiene quieta y los visitantes la deslizan o desplazan manualmente. Si todos los mosaicos caben, la fila no se mueve y no aparecen puntos.

### Reordenar el contenido

Arrastre las secciones o los elementos usando el ícono de agarre (seis puntos) a la izquierda de cada elemento para reordenarlos. Puede arrastrar elementos dentro de una sección o moverlos entre secciones.

## Dar estilo a su página

### Estilos de sección

Haga clic en cualquier sección para abrir su panel de estilos. Puede configurar:

- **Background**: color sólido, degradado o imagen. Cuando use una imagen de fondo, un selector de **Focal Point** le permite hacer clic para definir qué parte de la imagen permanece centrada al escalar la sección, y la opción de color **Overlay** le permite añadir un tinte semitransparente sobre la imagen para mejorar la legibilidad del texto.
- **Padding**: espacio superior e inferior dentro de la sección
- **Width**: ancho completo o centrado/contenido
- **Dividers**: separadores decorativos con forma (onda, diagonal, curva, triángulo y otros) en el borde superior o inferior de la sección, con opciones de color, altura y volteo

### Estilos de elemento

Haga clic en cualquier elemento para abrir su panel de estilos. Entre las opciones habituales se incluyen el tamaño de fuente, el color, la alineación, el margen y el relleno. En las imágenes, puede configurar el texto alternativo (alt) y los destinos de los enlaces.

### CSS personalizado

Para un estilo avanzado, cada sección y cada elemento tiene un campo **Custom CSS** donde puede escribir sus propias reglas CSS. Estas reglas se limitan a ese elemento, por lo que no afectan sin querer al resto de la página.

:::tip
Si necesita aplicar estilos a todo el sitio, como una fuente personalizada o un color global, use la configuración de [Apariencia](./appearance.md) en lugar del CSS personalizado en páginas individuales.
:::

## Previsualizar su página

Use los controles de vista previa en la barra de herramientas para comprobar cómo se ve su página en distintos tamaños de pantalla:

- **Desktop**: vista de navegador a ancho completo
- **Mobile**: vista estrecha, del tamaño de un teléfono

En los teléfonos, las columnas de una fila se apilan una encima de otra a ancho completo, a menos que configure un **Mobile Width** para ellas en los ajustes de la fila. Las listas de sermones y podcasts también apilan el texto de cada episodio debajo de su miniatura en los teléfonos.

Para ver la página publicada exactamente como la verán los visitantes, regrese a la lista de Pages y haga clic en la ruta de la página. Se abre en una nueva pestaña del navegador.

## Revisar la accesibilidad

Haga clic en el ícono **Accessibility** de la barra de herramientas para ejecutar una revisión rápida de problemas comunes: imágenes sin texto alternativo, bajo contraste de color o encabezados desordenados. Cada problema enlaza directamente con el elemento que necesita atención, para que pueda corregirlo en el mismo lugar.

## Deshacer cambios

El editor registra su historial de edición automáticamente. Use los botones de la barra de herramientas o los atajos de teclado para navegar:

- **Undo** (Ctrl+Z / Cmd+Z): revierte su última acción
- **Redo** (Ctrl+Shift+Z o Ctrl+Y / Cmd+Shift+Z): vuelve a aplicar una acción deshecha

También puede restaurar la página a una instantánea anterior. Haga clic en **View history** en la barra de herramientas para ver una lista de instantáneas guardadas con sus descripciones, y haga clic en cualquier entrada para restaurar ese punto.

:::warning
Restaurar una instantánea reemplaza el contenido actual de su página por la versión de la instantánea. Esto no se puede deshacer con el botón de deshacer estándar. Si quiere conservar la opción de volver atrás, guarde una instantánea del estado actual antes de restaurar una anterior.
:::

## Guardar y publicar

Los cambios se guardan automáticamente mientras trabaja. Un indicador de estado en la barra de herramientas muestra si sus cambios ya se guardaron.

### Estado de borrador y publicado

Las páginas pueden tener un estado **published**, que controla cuándo los visitantes ven sus cambios. La barra de herramientas muestra una etiqueta de estado con la situación actual:

- **Live on save**: la página no usa un flujo de publicación. Cada cambio guardado se publica de inmediato. Este es el valor predeterminado para las páginas nuevas.
- **Unpublished changes**: la página se ha publicado antes, pero ha hecho cambios desde la última publicación. Los visitantes siguen viendo la versión publicada anteriormente.
- **Published**: la página está en vivo y su contenido guardado coincide con lo que ven los visitantes.

Para publicar sus cambios, haga clic en el botón **Publish** de la barra de herramientas. La página se publica de inmediato.

Para volver a la última versión publicada sin afectar lo que ven los visitantes, abra el menú de desbordamiento (⋮) y haga clic en **Discard unpublished changes**.

Para dejar de usar el flujo de publicación, abra el menú de desbordamiento y haga clic en **Turn off publishing**. Entonces los cambios volverán a publicarse de inmediato.

:::tip
Use el flujo de borrador y publicación cuando quiera preparar una página, por ejemplo, para un evento próximo, y publicarla solo en el momento adecuado. Construya y previsualice la página, y luego haga clic en Publish cuando esté listo.
:::

## Artículos relacionados

- [Administrar páginas](./managing-pages.md): cree páginas, defina URLs y administre la navegación del sitio
- [Apariencia](./appearance.md): configure colores, fuentes y marca para todo el sitio
- [Archivos](./files.md): suba imágenes y documentos para usarlos en el editor
- [Crear formularios](../forms/creating-forms.md): cree formularios que pueda incrustar en las páginas
