---
title: "Uso del editor de páginas"
description: "Configura el editor de páginas en B1 Admin agregando secciones y elementos, dándoles estilo, previsualizando en móvil y publicando borradores. También explica deshacer y el historial de versiones."
---

# Uso del editor de páginas

<div class="article-intro">

El editor de páginas de B1 es un creador visual de arrastrar y soltar que le permite diseñar las páginas de su sitio web sin escribir código. Puede agregar secciones y bloques de contenido, personalizar estilos, previsualizar su trabajo y deshacer cambios, todo desde su navegador.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Complete la [configuración inicial](./initial-setup.md) para tener su sitio web configurado
- Cree al menos una página en [Administrar páginas](./managing-pages.md)
- Necesita el permiso **content.edit** para acceder al editor

</div>

## Abrir el editor

1. En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expanda **Sitio web** y haga clic en **Páginas**.
2. Busque la página que desea editar en la tabla de Páginas y haga clic en **Editar contenido**.

El editor se abre en pantalla completa. El panel izquierdo muestra la estructura de su página y los elementos de contenido disponibles; el área central muestra una vista previa en vivo de su página.

:::info
El editor siempre se muestra en modo claro, sin importar la configuración de tema de B1 Admin, y usa las fuentes de encabezado y de texto que eligió en [Apariencia](./appearance.md). Así, la vista previa coincide exactamente con cómo se verá la página para los visitantes del sitio web.
:::

## Estructura de la página: secciones y elementos

Cada página se construye con dos niveles:

- **Secciones**: los contenedores de nivel superior que dividen su página en franjas horizontales (por ejemplo, una sección principal, un bloque de contenido o una franja de pie de página). Cada página debe tener al menos una sección antes de que pueda agregar contenido.
- **Elementos**: las piezas de contenido individuales colocadas dentro de una sección, como texto, imágenes, botones, tarjetas, formularios y calendarios.

### Agregar una sección

1. Haga clic en **Agregar sección** (o en el botón **+** en la parte superior del panel izquierdo).
2. Elija cómo empezar:
   - **Desde una plantilla**: explore la galería de plantillas de sección organizada por categoría (Principal, Acerca de, Servicios, Donaciones, etc.) y haga clic en una para insertarla como una sección con estilos completos y contenido de ejemplo. Puede personalizar todo después de agregarla.
   - **Sección en blanco**: elija un diseño de columnas (una columna, dos columnas, tres columnas, etc.) y arme la sección desde cero.
3. La nueva sección aparece en la vista previa. Haga clic en ella para seleccionarla y configurar su color de fondo, su relleno y otras opciones de estilo.

### Cambiar el diseño de una sección

¿Ya armó una sección pero quiere otra estructura? Use el selector de diseño de esa sección para cambiar su distribución de columnas por otra de la galería, conservando en su lugar el contenido y los elementos existentes.

### Agregar elementos a una sección

1. Haga clic dentro de una sección en la vista previa para seleccionarla.
2. Haga clic en **Agregar contenido** y elija un tipo de elemento de la lista:
   - **Texto**: encabezados, párrafos y texto enriquecido
   - **Imagen**: suba o enlace una foto
   - **Botón**: un enlace de llamada a la acción en el que se puede hacer clic
   - **Tarjeta**: una imagen con título y descripción
   - **Formulario**: inserte un [formulario](../forms/creating-forms.md) directamente en la página. Si el formulario tiene una [foto de encabezado](../forms/creating-forms.md#adding-a-header-photo), se muestra encima de las preguntas
   - **Calendario**: muestra un calendario de eventos
   - **Preguntas frecuentes**: bloques de pregunta y respuesta estilo acordeón
   - **Video**: inserte un video mediante su URL
   - **Explorador de grupos**: un directorio filtrable de todos los grupos de la iglesia, con búsqueda opcional, filtro por categoría y filtro por etiqueta
   - **Característica con ícono**: un ícono con título y una descripción breve, para destacar características o ministerios
   - **Galería**: una cuadrícula de varias fotos o un diseño en mosaico
   - **Testimonio**: una o más citas con nombre del autor, cargo y foto
   - **Íconos de redes sociales**: íconos con enlace a los perfiles de redes sociales de su iglesia: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo y Podcast. Complete un enlace para cada uno que quiera mostrar; para **WhatsApp**, use un enlace `https://wa.me/` con su número o un enlace de invitación a un grupo
   - **Cuenta regresiva**: un temporizador que cuenta hacia una fecha o un horario de servicio semanal
   - **Estadísticas**: una fila de números grandes con etiquetas (miembros, años, campus)
   - **Progreso de campaña**: una barra de progreso en vivo para una campaña de donaciones, que muestra el total recaudado hacia la meta de un fondo
   - **Cuadrícula del personal**: tarjetas con foto de los miembros de un grupo; el grupo debe tener activada la opción de **lista pública**
   - **Horarios de servicio**: el calendario de servicios de sus campus, tomado automáticamente de la configuración de asistencia
   - **Sermones**: su biblioteca de sermones, como un reproductor completo o en cuadrícula, lista o diseño destacado del más reciente
   - **Mapa**: un mapa incrustado centrado en la dirección de su iglesia
   - **Tabla**: una cuadrícula simple de filas y columnas para contenido tabular
   - **Texto con foto**: texto e imagen lado a lado
   - **Logotipo**: el logotipo de su iglesia, tomado de [Apariencia](./appearance.md)
   - **Transmisión en vivo**: el reproductor de su transmisión en vivo, incrustado directamente en la página
   - **Podcast**: una lista de episodios tomada de una URL de fuente RSS de podcast externa que usted proporciona, con configuración para elegir cuántos episodios mostrar y si mostrar fechas y descripciones. Cada episodio en el sitio en vivo tiene un reproductor de audio y un enlace de **Descargar** que guarda el archivo de audio del episodio con el título del episodio. Esto sirve para destacar cualquier fuente de podcast en su sitio; para publicar sus propios sermones como podcast, consulte [Administrar sermones](../sermons/managing-sermons.md#your-podcast-feed)
   - **Donación**: un botón de donación o un formulario de donación incrustado
   - **HTML**: su propio HTML sin procesar, para usos avanzados como incrustar un widget de terceros (consulte [Usar el elemento HTML](#using-the-html-element))
   - **iFrame**: incrusta contenido externo mediante una URL
3. Configure el elemento con el panel de configuración que aparece.

### Usar el elemento HTML {#using-the-html-element}

El elemento **HTML** tiene dos cuadros:

- **Contenido HTML**: el código que se muestra en la página. Cualquier etiqueta `<script>` que incluya aquí se ejecuta en su sitio en vivo.
- **JavaScript (sin la etiqueta script)**: código de script que se ejecuta cuando carga la página. También puede pegar aquí el fragmento de inserción de un proveedor con sus etiquetas `<script>` incluidas, y se ejecutará en el sitio en vivo.

Si pega solo una dirección web (como un enlace a una imagen) en el cuadro de JavaScript, el cuadro se pone rojo con la advertencia *"Esto es una dirección web, no JavaScript."* Una dirección sola en ese cuadro no hace nada. Para mostrar una imagen, use un elemento **Imagen** o coloque `<img src="...">` en **Contenido HTML**.

### Usar el elemento Calendario {#using-the-calendar-element}

El elemento **Calendario** muestra eventos de uno de sus calendarios:

1. En **Seleccionar**, elija **Calendario de grupo** (los eventos de un grupo; la lista muestra los grupos a los que pertenece) o **Calendario seleccionado** (un calendario que armó en **Calendarios**; consulte [Calendario seleccionado](../calendars/curated-calendar.md)).
2. En **Seleccionar calendario**, elija el grupo o calendario.
3. En **Mostrar**, elija cómo mostrarlo:
   - **Calendario mensual**: una cuadrícula mensual que los visitantes pueden recorrer.
   - **Próximos eventos**: una cuadrícula de tarjetas con los próximos 12 eventos, con un evento que se repite mostrado una sola vez en su siguiente fecha. Cada tarjeta muestra la foto del evento (o su título sobre el color oscuro de su tema cuando no tiene foto), una insignia de fecha, el día y la hora, y la primera línea de su descripción. Un botón de **Suscribirse** encima de las tarjetas permite a los visitantes copiar el enlace ICS del calendario o descargarlo. Para esta visualización aparece una configuración de **Diseño**: **Cuadrícula** (la predeterminada) o **Desplazamiento (automático)**, que coloca las tarjetas en una sola fila que se desplaza sola.
4. Para mostrar solo algunos eventos, escriba una etiqueta en **Solo eventos con la etiqueta**; por ejemplo, `jóvenes`. Solo aparecen los eventos cuyas **Etiquetas** incluyan esa palabra. Déjelo vacío para mostrar todos los eventos. Las etiquetas se configuran en cada evento; consulte [Agregar y editar eventos](../calendars/creating-calendars.md#adding-and-editing-events).

En cualquiera de las dos visualizaciones, al hacer clic en un evento se abre su propia página en su sitio web. La página del evento muestra la foto, el título, la fecha y la hora, y la descripción del evento, además de un recuadro con **Cuándo** (incluido el patrón de repetición de un evento recurrente) y **Dónde** (los salones reservados para él). También tiene un botón de **Inscribirse a este evento** cuando la inscripción está activada, y un enlace de **Agregar a mi calendario** que descarga el evento como archivo de calendario. La página está preparada para que los motores de búsqueda muestren la fecha y los detalles del evento en sus resultados. Las páginas de eventos de los calendarios seleccionados que aparecen en sus páginas (para eventos de los próximos seis meses) también se listan en el mapa del sitio, para que los motores de búsqueda las encuentren.

### Reordenar contenido

Arrastre secciones o elementos usando el ícono de asa (seis puntos) del lado izquierdo de cada elemento para reordenarlos. Puede arrastrar elementos dentro de una sección o moverlos entre secciones.

## Dar estilo a su página

### Estilos de sección

Haga clic en cualquier sección para abrir su panel de estilos. Puede configurar:

- **Fondo**: color sólido, degradado o imagen. Al usar una imagen de fondo, un selector de **Punto focal** le permite hacer clic para definir qué parte de la imagen permanece centrada cuando la sección se escala, y una opción de color de **Superposición** le permite agregar un tinte semitransparente sobre la imagen para mejorar la legibilidad del texto.
- **Relleno**: espacio superior e inferior dentro de la sección
- **Ancho**: ancho completo o centrado/contenido
- **Separadores**: separadores decorativos con forma (ondas, diagonales, curvas, triángulos y más) en el borde superior o inferior de la sección, con opciones de color, altura y volteo

### Estilos de elemento

Haga clic en cualquier elemento para abrir su panel de estilos. Las opciones comunes incluyen tamaño de fuente, color, alineación, margen y relleno. En las imágenes, puede configurar el texto alternativo y los destinos de enlace.

### CSS personalizado

Para un estilo avanzado, cada sección y cada elemento tiene un campo de **CSS personalizado** donde puede escribir sus propias reglas de CSS. Estas reglas se limitan a ese elemento, así que no afectarán por accidente al resto de la página.

:::tip
Si necesita aplicar estilos a todo su sitio, como una fuente personalizada o un color global, use la configuración de [Apariencia](./appearance.md) en lugar del CSS personalizado de páginas individuales.
:::

## Previsualizar su página

Use los controles de vista previa de la barra de herramientas para revisar cómo se ve su página en distintos tamaños de pantalla:

- **Escritorio**: vista de navegador a ancho completo
- **Móvil**: vista estrecha del tamaño de un teléfono

En los teléfonos, las columnas de una fila se apilan una encima de otra a ancho completo, a menos que establezca un **Ancho móvil** para ellas en la configuración de la fila. Las listas de sermones y de podcast también apilan el texto de cada episodio debajo de su miniatura en los teléfonos.

Para ver la página en vivo exactamente como la verán los visitantes, regrese a la lista de Páginas y haga clic en la ruta de la página. Se abre en una nueva pestaña del navegador.

## Revisar la accesibilidad

Haga clic en el ícono de **Accesibilidad** de la barra de herramientas para hacer una revisión rápida de problemas comunes: imágenes sin texto alternativo, contraste de color bajo o encabezados fuera de orden. Cada problema enlaza directamente con el elemento que necesita atención, para que pueda corregirlo en el mismo lugar.

## Deshacer cambios

El editor registra su historial de edición automáticamente. Use los botones de la barra de herramientas o los atajos de teclado para navegar:

- **Deshacer** (Ctrl+Z / Cmd+Z): revierte su última acción
- **Rehacer** (Ctrl+Shift+Z o Ctrl+Y / Cmd+Shift+Z): vuelve a aplicar una acción deshecha

También puede restaurar la página a una instantánea anterior. Haga clic en **Ver historial** en la barra de herramientas para ver una lista de instantáneas guardadas con sus descripciones, y haga clic en cualquier entrada para volver a ese punto.

:::warning
Restaurar una instantánea reemplaza el contenido actual de su página por la versión de la instantánea. Esto no se puede deshacer con el botón de deshacer normal. Guarde una instantánea de su estado actual antes de restaurar una anterior si quiere conservar la opción de volver.
:::

## Guardar y publicar

Los cambios se guardan automáticamente mientras trabaja. Un indicador de estado en la barra de herramientas muestra si sus cambios ya se guardaron.

### Estado de borrador y publicación

Las páginas pueden tener un estado de **publicada**, que controla cuándo los visitantes ven sus cambios. La barra de herramientas muestra una etiqueta de estado con el estado actual:

- **En vivo al guardar**: la página no usa un flujo de publicación. Cada cambio guardado se publica de inmediato. Es el valor predeterminado para las páginas nuevas.
- **Cambios sin publicar**: la página ya se había publicado antes, pero ha hecho cambios desde la última publicación. Los visitantes siguen viendo la versión publicada anteriormente.
- **Publicada**: la página está en vivo y su contenido guardado coincide con lo que ven los visitantes.

Para publicar sus cambios, haga clic en el botón **Publicar** de la barra de herramientas. La página se pone en vivo de inmediato.

Para volver a la última versión publicada sin afectar lo que ven los visitantes, abra el menú de desbordamiento (⋮) y haga clic en **Descartar cambios sin publicar**.

Para dejar de usar el flujo de publicación, abra el menú de desbordamiento y haga clic en **Desactivar publicación**. Los cambios vuelven a publicarse de inmediato.

:::tip
Use el flujo de borrador y publicación cuando quiera preparar una página, por ejemplo para un evento próximo, y hacerla pública solo en el momento adecuado. Arme y previsualice la página, y haga clic en Publicar cuando esté listo.
:::

## Artículos relacionados

- [Administrar páginas](./managing-pages.md): cree páginas, configure URLs y administre la navegación del sitio
- [Apariencia](./appearance.md): configure colores, fuentes e identidad visual de todo el sitio
- [Archivos](./files.md): suba imágenes y documentos para usarlos en el editor
- [Crear formularios](../forms/creating-forms.md): cree formularios que puede incrustar en las páginas
