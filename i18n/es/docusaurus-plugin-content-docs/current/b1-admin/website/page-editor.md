---
title: "Uso del editor de páginas"
description: "Construya páginas del sitio web en el editor de páginas de B1 Admin: agregue secciones y elementos, dé estilo, previsualice en el móvil, publique borradores y use deshacer e historial de edición."
---

# Uso del editor de páginas

<div class="article-intro">

El editor de páginas de B1 es un constructor visual de arrastrar y soltar que le permite diseñar las páginas de su sitio web de iglesia sin escribir código. Puede agregar secciones y bloques de contenido, personalizar estilos, previsualizar su trabajo y deshacer cambios, todo desde su navegador.

</div>

## Video de capacitación {#training-video}

<YouTube id="m2B_JxmfFm4" title="Editar páginas y navegación en B1" next="Conectar un dominio personalizado en B1" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Antes de empezar</h4>

- Complete la [configuración inicial](./initial-setup.md) para tener su sitio web configurado
- Cree al menos una página en [Gestionar páginas](./managing-pages.md)
- Necesita el permiso **content.edit** para acceder al editor

</div>

## Abrir el editor {#opening-the-editor}

1. En B1 Admin, abra el [menú Salto](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expanda **Sitio web** y haga clic en **Páginas**.
2. Busque la página que desea editar en la tabla de Páginas y haga clic en **Editar contenido**.

El editor se abre en modo de pantalla completa con una vista previa en vivo de su página. La barra de herramientas superior tiene **Salir**, el estado de publicación de la página, **Deshacer** y **Rehacer**, el estado de guardado, **Publicar**, los botones de vista previa de escritorio y móvil, **Agregar contenido**, la verificación de accesibilidad y un menú **Más** (⋮). Haga clic en **Agregar contenido** para abrir el panel **Agregar elementos** a la izquierda; haga clic en una sección o elemento para abrir su configuración a la derecha.

El editor necesita una pantalla de al menos unos 880 píxeles de ancho. En un teléfono verá un mensaje que le pide abrir la página en una tableta o computadora.

:::info
El editor siempre se muestra en modo claro, sin importar la configuración de tema de B1 Admin, y usa las fuentes de encabezado y de cuerpo que eligió en [Apariencia](./appearance.md). Así la vista previa coincide exactamente con el aspecto que tendrá la página para los visitantes del sitio web.
:::

## Estructura de la página: secciones y elementos {#page-structure-sections-and-elements}

Cada página se construye con dos niveles:

- **Secciones** -- Los contenedores de primer nivel que dividen la página en bandas horizontales (por ejemplo, una sección hero, un bloque de contenido o una franja de pie de página). Cada página debe tener al menos una sección antes de que pueda agregar contenido.
- **Elementos** -- Las piezas individuales de contenido colocadas dentro de una sección, como texto, imágenes, botones, tarjetas, formularios y calendarios.

### Agregar una sección {#adding-a-section}

1. Haga clic en **Agregar contenido** y arrastre **Sección** a la página. También puede pasar el cursor entre dos secciones y hacer clic en el botón **+** (**Agregar sección**) que aparece.
2. En el diálogo **Elija un diseño de sección**, elija cómo empezar:
   - **Desde una plantilla** — explore las plantillas de sección por categoría (Hero, Acerca de, Servicios, Personas, Multimedia, Donaciones y Llamado a la acción) y haga clic en una para insertarla como una sección con estilo completo y contenido de ejemplo. Puede personalizar todo después de agregarla.
   - **Sección en blanco** — una sección vacía para construir desde cero. Para dividirla en columnas, agregue un elemento **Fila** dentro de ella.
3. La nueva sección aparece en la vista previa. Haga clic en ella para seleccionarla y configurar su fondo, sus colores y otras opciones de estilo.

Al pasar el cursor sobre una sección aparece su barra de herramientas: el controlador de arrastre, **Configuración de la sección**, **Mover sección arriba**, **Mover sección abajo**, **Duplicar sección**, **Probar otro diseño** y **Eliminar sección**.

### Cambiar el diseño de una sección {#switching-a-sections-layout}

Si ya construyó una sección pero quiere otra estructura, haga clic en **Probar otro diseño** en la barra de herramientas de la sección para cambiar su disposición por otra de la galería, manteniendo en su lugar el contenido y los elementos existentes.

### Agregar elementos a una sección {#adding-elements-to-a-section}

1. Haga clic en **Agregar contenido** para abrir el panel **Agregar elementos**. Use **Buscar elementos** o las pestañas (**Todos**, **Comunes**, **Multimedia**, **Iglesia**, **Avanzados** y **Bloques**, una vez que tenga [bloques reutilizables](./blocks.md)) para encontrar un elemento.
2. Arrastre el elemento a una sección en la vista previa, o seleccione un elemento de la página y luego haga clic en una tarjeta para agregar el nuevo elemento justo después de él. Los elementos son:
   - **Fila** -- Divide una sección en columnas lado a lado
   - **Caja** -- Agrupa elementos en un contenedor con estilo
   - **Carrusel** -- Rota entre un conjunto de diapositivas a todo el ancho
   - **Espacio en blanco** -- Agrega espacio vertical vacío
   - **Texto** -- Encabezados, párrafos y texto enriquecido
   - **Imagen** -- Suba o enlace una foto
   - **Botón de enlace** -- Un botón de llamado a la acción en el que se puede hacer clic
   - **Tarjeta** -- Una imagen con un título y una descripción
   - **Formulario** -- Incruste un [formulario](../forms/creating-forms.md) directamente en la página. Si el formulario tiene una [foto de encabezado](../forms/creating-forms.md#adding-a-header-photo), aparece encima de las preguntas
   - **Calendario** -- Muestra un calendario de eventos
   - **Expandible** -- Bloques de preguntas y respuestas estilo acordeón
   - **Video** -- Incruste un video por URL
   - **Explorador de grupos** -- Un directorio filtrable de todos los grupos de la iglesia, con búsqueda opcional, filtro por categoría y filtro por etiqueta. Su **Diseño** puede ser **Cuadrícula** (el predeterminado) o **Deslizable (automático)** -- consulte [Diseños deslizables](#scrolling-layouts)
   - **Lista de grupos** -- Fichas de sus grupos públicos, opcionalmente solo los grupos con una etiqueta dada. Su **Diseño** puede ser **Cuadrícula** (el predeterminado; hasta tres fichas por fila) o **Deslizable (automático)** -- consulte [Diseños deslizables](#scrolling-layouts)
   - **Elemento de característica con icono** -- Un icono con un título y una descripción breve, para destacar características o ministerios
   - **Galería** -- Una cuadrícula de varias fotos o un diseño de mampostería
   - **Testimonio** -- Una o más citas con el nombre del autor, su función y su foto
   - **Iconos de redes sociales** -- Iconos con enlace a los perfiles de redes sociales de su iglesia: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo y Podcast. Complete un enlace por cada uno que quiera mostrar; para **WhatsApp**, use un enlace `https://wa.me/` con su número o un enlace de invitación a un grupo
   - **Cuenta regresiva** -- Un temporizador que cuenta hasta una fecha o un horario de servicio semanal
   - **Estadísticas** -- Una fila de números grandes con etiquetas (miembros, años, campus)
   - **Progreso de campaña** -- Una barra de progreso en vivo para una campaña de donaciones, que muestra el total recaudado hacia la meta de un fondo
   - **Cuadrícula de personal** -- Tarjetas con fotos de los miembros de un grupo; el grupo debe tener activada la opción de **lista pública**
   - **Horarios de servicio** -- El calendario de servicios de sus campus, obtenido automáticamente de la configuración de asistencia
   - **Sermones** -- Su biblioteca de sermones, como explorador completo o en diseño de cuadrícula, lista o destacado del más reciente
   - **Ubicación** -- Un mapa incrustado centrado en la dirección de su iglesia
   - **Tabla** -- Una cuadrícula simple de filas y columnas para contenido tabular
   - **Texto con foto** -- Texto e imagen lado a lado
   - **Logotipo** -- El logotipo de su iglesia, tomado de [Apariencia](./appearance.md)
   - **Transmisión** -- El reproductor de su transmisión en vivo, incrustado directamente en la página
   - **Podcast** -- Una lista de episodios obtenida de una URL de feed RSS de podcast externo que usted proporcione, con opciones para decidir cuántos episodios mostrar y si mostrar fechas y descripciones. Cada episodio en el sitio en vivo tiene un reproductor de audio y un enlace **Descargar** que guarda el archivo de audio del episodio con el título del episodio. Sirve para destacar cualquier feed de podcast en su sitio; para publicar sus propios sermones como podcast, consulte [Administrar sermones](../sermons/managing-sermons.md#your-podcast-feed)
   - **Donación** -- Un formulario de donaciones completo incrustado en la página
   - **Enlace de donación** -- Un botón que abre su página de donaciones
   - **HTML** -- Su propio HTML sin procesar, para casos de uso avanzados como incrustar un widget de terceros (consulte [Uso del elemento HTML](#using-the-html-element))
   - **Página incrustada** -- Incruste otra página web por URL en un marco
3. Configure el elemento usando el panel de configuración que aparece.

### Uso del elemento HTML {#using-the-html-element}

El elemento **HTML** tiene dos cuadros:

- **Contenido HTML** -- El marcado que se muestra en la página. Cualquier etiqueta `<script>` que incluya aquí se ejecuta en su sitio en vivo.
- **JavaScript (sin la etiqueta script)** -- Código de script que se ejecuta cuando carga la página. También puede pegar aquí el fragmento de incrustación de un proveedor con sus etiquetas `<script>` incluidas, y se ejecutará en el sitio en vivo.

Si pega solo una dirección web (como un enlace a una imagen) en el cuadro de JavaScript, el cuadro se pone rojo con la advertencia *"Esto es una dirección web, no JavaScript."* Una dirección sola en ese cuadro no hace nada. Para mostrar una imagen, use un elemento **Imagen** o ponga `<img src="...">` en **Contenido HTML**.

### Uso del elemento Calendario {#using-the-calendar-element}

El elemento **Calendario** muestra eventos de uno de sus calendarios:

1. En **Seleccionar**, elija **Calendario de grupo** (los eventos de un solo grupo; la lista muestra los grupos a los que pertenece) o **Calendario seleccionado** (un calendario que creó en **Calendarios**; consulte [Calendario seleccionado](../calendars/curated-calendar.md)).
2. En **Seleccionar calendario**, elija el grupo o el calendario.
3. En **Mostrar**, elija cómo presentarlo:
   - **Calendario mensual** -- Una cuadrícula mensual por la que los visitantes pueden desplazarse. Cada evento tiene el color del grupo al que pertenece, de modo que los eventos de un grupo tienen el mismo color en todos los calendarios. B1 elige los colores automáticamente; no hay nada que configurar.
   - **Próximos eventos** -- Una cuadrícula de fichas con los próximos 12 eventos, en la que un evento que se repite se muestra una sola vez en su siguiente fecha. Cada ficha muestra la foto del evento (o su título sobre el color oscuro de su tema cuando no tiene foto), una insignia de fecha, el día y la hora, y la primera línea de su descripción. Un botón **Suscribirse** encima de las fichas permite a los visitantes copiar el enlace ICS del calendario o descargarlo. Para esta presentación aparece una configuración de **Diseño**: **Cuadrícula** (el predeterminado) o **Deslizable (automático)**, que coloca las fichas en una sola fila que se desplaza sola (consulte [Diseños deslizables](#scrolling-layouts)). En un **Calendario seleccionado**, active la opción **Insignia de grupo** para mostrar el nombre del grupo de cada evento en la esquina superior derecha de su ficha, con el color de calendario de ese grupo. Los eventos de grupos archivados o confidenciales no reciben insignia.
4. Para mostrar solo algunos eventos, escriba una etiqueta en **Solo eventos con la etiqueta** -- por ejemplo, `youth`. Solo aparecen los eventos cuyas **Etiquetas** incluyen esa palabra. Déjelo vacío para mostrar todos los eventos. Las etiquetas se configuran en cada evento; consulte [Agregar y editar eventos](../calendars/creating-calendars.md#adding-and-editing-events).

En cualquiera de las dos presentaciones, al hacer clic en un evento se abre su propia página en su sitio web. La página del evento muestra la foto, el título, la fecha, la hora y la descripción del evento, además de un recuadro con **Cuándo** (incluido el patrón de repetición en un evento recurrente) y **Dónde** (las salas reservadas para él). También tiene un botón **Registrarse en este evento** cuando el registro está activado, y un enlace **Agregar a mi calendario** que descarga el evento como archivo de calendario. La página está preparada para que los motores de búsqueda puedan mostrar la fecha y los detalles del evento en sus resultados. Las páginas de eventos de calendarios seleccionados que se muestran en sus páginas (para eventos de los próximos seis meses) también aparecen en el mapa del sitio, para que los motores de búsqueda puedan encontrarlas.

### Diseños deslizables {#scrolling-layouts}

El diseño **Deslizable (automático)** de **Explorador de grupos**, **Lista de grupos** y de la presentación **Próximos eventos** del elemento Calendario coloca las fichas en una fila en lugar de una cuadrícula. En un teléfono, cada ficha ocupa toda la fila; en una computadora, caben dos fichas una al lado de la otra. Cuando hay más fichas de las que caben, la fila:

- Avanza una ficha aproximadamente cada cuatro segundos, volviendo a la primera ficha después de la última.
- Se pausa mientras un visitante pasa el cursor, toca o navega a ella con el teclado, y se reanuda unos segundos después.
- Muestra debajo una fila de puntos, uno por ficha, con el punto de la ficha actual relleno. Los visitantes pueden hacer clic en un punto para ir a esa ficha.

En los dispositivos con la opción de reducir movimiento activada, la fila permanece fija y los visitantes la deslizan o desplazan por su cuenta. Si todas las fichas caben, la fila no se mueve y no aparecen puntos.

### Reordenar contenido {#reordering-content}

Arrastre secciones o elementos usando el icono de controlador (seis puntos) del lado izquierdo de cada elemento para reordenarlos. Puede arrastrar elementos dentro de una sección o moverlos entre secciones.

## Dar estilo a su página {#styling-your-page}

### Estilos de sección {#section-styles}

Haga clic en cualquier sección para abrir su panel de estilo. Puede configurar:

- **Colores** -- En la pestaña **Sugeridos**, haga clic en una de las combinaciones de color de su paleta. En la pestaña **Personalizado**, configure el **Tipo de fondo** (**Color**, **Imagen** o **Video de YouTube**) y los colores del encabezado, el texto y los enlaces. Con un fondo de imagen, haga clic en la imagen para establecer su punto focal (la parte que se mantiene visible cuando la imagen se recorta), y use **Color de superposición** y **Opacidad del fondo** para teñir la imagen de modo que el texto siga siendo legible.
- **Visibilidad** -- **Ocultar en escritorio** u **Ocultar en móvil**
- **Estilos** -- Agregue configuraciones de estilo individuales, como el relleno superior e inferior, para todos los dispositivos, solo para escritorio o solo para móvil
- **Animaciones** -- Un efecto y una velocidad para cuando la sección aparece al desplazarse
- **Separadores de forma** -- Formas decorativas (onda, ondas, diagonal, curva, picos y triángulo) en el borde superior o inferior de la sección, con opciones de color, altura e inversión

La configuración de la sección también tiene **Duplicar** y **Convertir en bloque**, que copia la sección en un nuevo [bloque reutilizable](./blocks.md).

### Estilos de elemento {#element-styles}

Haga clic en cualquier elemento para abrir su panel de estilo. Las opciones comunes incluyen el tamaño de fuente, el color, la alineación, el margen y el relleno. En las imágenes, puede configurar el texto alternativo y los destinos de los enlaces.

### Estilos para una sola sección o elemento {#styles-for-one-section-or-element}

Para un control más fino, abra el panel **Estilos** en la configuración de una sección o de un elemento y haga clic en **Agregar un estilo** en **Todos**, **Solo escritorio** o **Solo móvil**. Cada estilo se aplica solo a esa sección o elemento, de modo que no afecta al resto de la página.

:::tip
Si necesita aplicar estilos en todo su sitio, como una fuente personalizada o un color global, use la configuración de [Apariencia](./appearance.md) en lugar de CSS personalizado en páginas individuales.
:::

## Previsualizar su página {#previewing-your-page}

Use los controles de vista previa de la barra de herramientas para comprobar cómo se ve su página en distintos tamaños de pantalla:

- **Escritorio** -- Vista de navegador a todo el ancho
- **Móvil** -- Vista estrecha de tamaño de teléfono

En los teléfonos, las columnas de una fila se apilan una encima de otra a todo el ancho, a menos que establezca un **Ancho móvil** para ellas en la configuración de la fila. Las listas de sermones y de podcast también apilan el texto de cada episodio debajo de su miniatura en los teléfonos.

Para ver la página en vivo tal como la verán los visitantes, vuelva a la lista de Páginas y haga clic en la ruta de la página. Se abre en una nueva pestaña del navegador.

## Verificar la accesibilidad {#checking-accessibility}

Haga clic en el icono **Verificar accesibilidad** de la barra de herramientas (muestra un número cuando se encuentran problemas) para ejecutar una verificación rápida de problemas comunes: imágenes sin texto alternativo, contraste de color bajo o encabezados desordenados. Cada problema enlaza directamente con el elemento que necesita atención, para que pueda corregirlo en el lugar.

## Deshacer cambios {#undoing-changes}

El editor registra automáticamente su historial de edición. Use los botones de la barra de herramientas o los atajos de teclado para navegar:

- **Deshacer** (Ctrl+Z / Cmd+Z) -- Revierte su última acción
- **Rehacer** (Ctrl+Shift+Z o Ctrl+Y / Cmd+Shift+Z) -- Vuelve a aplicar una acción deshecha

También puede saltar a un punto anterior. Abra el menú **Más** (⋮) de la barra de herramientas y haga clic en **Ver historial**. El diálogo **Historial de edición** enumera cada cambio con su hora, y marca el punto en el que se encuentra ahora como **(actual)**. Haga clic en una entrada (o en su botón **Restaurar a este punto**) para devolver la página a como estaba en ese punto.

:::info
Los cambios hechos después del punto restaurado permanecen en el historial, de modo que puede usar **Rehacer** o elegir una entrada posterior para avanzar de nuevo. Cuando hace una edición nueva, esas entradas posteriores se reemplazan por ella.
:::

## Guardar y publicar {#saving-and-publishing}

Los cambios se guardan automáticamente mientras trabaja. Un indicador de estado en la barra de herramientas muestra si sus cambios se han guardado.

### Estado de borrador y publicado {#draft-and-published-state}

Las páginas pueden tener un estado de **publicado**, que controla cuándo ven los visitantes sus cambios. La barra de herramientas muestra una etiqueta de estado con el estado actual:

- **En vivo al guardar** -- La página no usa un flujo de publicación. Cada cambio guardado se publica de inmediato. Es el valor predeterminado para las páginas nuevas.
- **Cambios sin publicar** -- La página se ha publicado antes, pero ha hecho cambios desde la última publicación. Los visitantes siguen viendo la versión publicada anteriormente.
- **Publicada** -- La página está en vivo y su contenido guardado coincide con lo que ven los visitantes.

Para publicar sus cambios, haga clic en el botón **Publicar** de la barra de herramientas. La página se publica de inmediato.

Para volver a la última versión publicada sin afectar lo que ven los visitantes, abra el menú de desbordamiento (⋮) y haga clic en **Descartar cambios sin publicar**.

Para dejar de usar el flujo de publicación, abra el menú de desbordamiento y haga clic en **Desactivar la publicación**. Las ediciones vuelven entonces a publicarse de inmediato.

:::tip
Use el flujo de borrador y publicación cuando quiera preparar una página -por ejemplo, para un evento próximo- y hacerla pública solo en el momento adecuado. Construya y previsualice la página, y luego haga clic en Publicar cuando esté listo.
:::

## Artículos relacionados {#related-articles}

- [Gestionar páginas](./managing-pages.md) -- Cree páginas, establezca URL y administre la navegación del sitio
- [Apariencia](./appearance.md) -- Configure colores, fuentes y marca de todo el sitio
- [Archivos](./files.md) -- Suba imágenes y documentos para usarlos en el editor
- [Crear formularios](../forms/creating-forms.md) -- Cree formularios que pueda incrustar en las páginas
