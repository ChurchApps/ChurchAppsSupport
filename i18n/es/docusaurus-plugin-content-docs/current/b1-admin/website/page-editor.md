---
title: "Uso del editor de páginas"
---

# Uso del editor de páginas

<div class="article-intro">

El editor de páginas de B1 es un creador visual de arrastrar y soltar que te permite diseñar las páginas de tu sitio web de la iglesia sin escribir código. Puedes agregar secciones y bloques de contenido, personalizar estilos, previsualizar tu trabajo y deshacer cambios, todo desde tu navegador.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Completa la [configuración inicial](initial-setup) para tener tu sitio web configurado
- Crea al menos una página en [Gestión de páginas](managing-pages)
- Necesitas el permiso **content.edit** para acceder al editor

</div>

## Abrir el editor

1. En B1 Admin, abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expande **Website** y haz clic en **Pages**.
2. Busca la página que quieres editar en la tabla de Pages y haz clic en **Edit Content**.

El editor se abre en pantalla completa. El panel izquierdo muestra la estructura de tu página y los elementos de contenido disponibles; el área central muestra una vista previa en vivo de tu página.

:::info
El editor siempre se muestra en modo claro, sin importar la configuración de tema de B1 Admin, y usa las fuentes de encabezados y de texto que elegiste en [Apariencia](appearance). Así la vista previa coincide exactamente con cómo se verá la página para los visitantes del sitio.
:::

## Estructura de la página: secciones y elementos

Cada página se construye a partir de dos niveles:

- **Secciones** -- Los contenedores de nivel superior que dividen tu página en franjas horizontales (por ejemplo, una sección principal, un bloque de contenido o una franja de pie de página). Cada página debe tener al menos una sección antes de que puedas agregar contenido.
- **Elementos** -- Las piezas de contenido individuales colocadas dentro de una sección, como texto, imágenes, botones, tarjetas, formularios y calendarios.

### Agregar una sección

1. Haz clic en **Add Section** (o en el botón **+** de la parte superior del panel izquierdo).
2. Elige cómo empezar:
   - **From a template** -- explora la galería de plantillas de secciones organizada por categorías (Hero, About, Services, Giving, etc.) y haz clic en una para insertarla como una sección completamente estilizada y prellenada. Puedes personalizarlo todo después de agregarla.
   - **Blank section** -- elige una distribución de columnas (una columna, dos columnas, tres columnas, etc.) y construye desde cero.
3. La nueva sección aparece en la vista previa. Haz clic en ella para seleccionarla y configurar su color de fondo, su relleno y otras opciones de estilo.

### Cambiar la distribución de una sección

¿Ya construiste una sección pero quieres una estructura diferente? Usa el selector de distribución de esa sección para cambiar su disposición de columnas por otra de la galería, manteniendo en su lugar el contenido y los elementos existentes.

### Agregar elementos a una sección

1. Haz clic dentro de una sección en la vista previa para seleccionarla.
2. Haz clic en **Add Content** y elige un tipo de elemento de la lista:
   - **Text** -- Encabezados, párrafos y texto enriquecido
   - **Image** -- Sube una foto o enlázala
   - **Button** -- Un enlace de llamada a la acción en forma de botón
   - **Card** -- Una imagen con un título y una descripción
   - **Form** -- Inserta un [formulario](../forms/creating-forms) directamente en la página
   - **Calendar** -- Muestra un calendario de eventos
   - **FAQ** -- Bloques de preguntas y respuestas tipo acordeón
   - **Video** -- Inserta un video mediante su URL
   - **Groups Browser** -- Un directorio filtrable de todos los grupos de la iglesia, con búsqueda opcional, filtro por categoría y filtro por etiqueta
   - **Icon Feature** -- Un icono con un título y una descripción breve, para destacar funciones o ministerios
   - **Gallery** -- Una cuadrícula o disposición en mosaico de varias fotos
   - **Testimonial** -- Una o más citas con el nombre del autor, su cargo y su foto
   - **Social Icons** -- Iconos con enlaces a los perfiles de redes sociales de tu iglesia
   - **Countdown** -- Un temporizador que cuenta hasta una fecha o hasta un horario de servicio semanal
   - **Stats** -- Una fila de números grandes con etiquetas (miembros, años, campus)
   - **Campaign Progress** -- Una barra de progreso en vivo para una campaña de donaciones, que muestra el total recaudado hacia la meta de un fondo
   - **Staff Grid** -- Tarjetas con fotos de los miembros de un grupo; el grupo debe tener activada la opción de **public roster**
   - **Service Times** -- El calendario de servicios de tus campus, obtenido automáticamente de la configuración de asistencia
   - **Sermons** -- Tu biblioteca de sermones, como un explorador completo o con un diseño de cuadrícula, lista o "destacado más reciente"
   - **Map** -- Un mapa incrustado centrado en la dirección de tu iglesia
   - **Table** -- Una cuadrícula simple de filas y columnas para contenido tabular
   - **Text with Photo** -- Texto e imagen uno al lado del otro
   - **Logo** -- El logotipo de tu iglesia, tomado de [Apariencia](appearance)
   - **Live Stream** -- Tu reproductor de transmisión en vivo, incrustado directamente en la página
   - **Podcast** -- Una lista de episodios obtenida de una fuente RSS de podcast externa que tú proporcionas, con opciones para elegir cuántos episodios mostrar y si mostrar fechas y descripciones. Cada episodio en el sitio publicado tiene un reproductor de audio y un enlace **Download** que guarda el archivo de audio del episodio con el título del episodio. Esto sirve para destacar cualquier fuente de podcast en tu sitio; para publicar tus propios sermones como podcast, consulta [Gestión de sermones](../sermons/managing-sermons.md#your-podcast-feed).
   - **Donation** -- Un botón de donación o un formulario de donación incrustado
   - **HTML** -- Tu propio HTML sin procesar, para casos avanzados como incrustar un widget de terceros (consulta [Uso del elemento HTML](#using-the-html-element))
   - **iFrame** -- Incrusta contenido externo mediante su URL
3. Configura el elemento usando el panel de configuración que aparece.

### Uso del elemento HTML

El elemento **HTML** tiene dos cuadros:

- **HTML Content** -- El marcado que se mostrará en la página. Cualquier etiqueta `<script>` que incluyas aquí se ejecuta en tu sitio publicado.
- **JavaScript (exclude script tag)** -- Código de script que se ejecuta cuando se carga la página. También puedes pegar aquí el fragmento de incrustación de un proveedor con sus etiquetas `<script>` incluidas, y se ejecutará en el sitio publicado.

Si pegas solo una dirección web (como el enlace de una imagen) en el cuadro de JavaScript, el cuadro se pone en rojo con la advertencia *"This is a web address, not JavaScript."* Una dirección sola en ese cuadro no hace nada. Para mostrar una imagen, usa un elemento **Image** o pon `<img src="...">` en **HTML Content**.

### Uso del elemento Calendar {#using-the-calendar-element}

El elemento **Calendar** muestra los eventos de uno de tus calendarios:

1. En **Select**, elige **Group Calendar** (los eventos de un grupo; la lista muestra los grupos a los que perteneces) o **Curated Calendar** (un calendario que creaste en **Calendars**; consulta [Calendario curado](../calendars/curated-calendar)).
2. En **Select Calendar**, elige el grupo o el calendario.
3. En **Display**, elige cómo mostrarlo:
   - **Month calendar** -- Una cuadrícula mensual que los visitantes pueden recorrer por páginas.
   - **Upcoming events** -- Una cuadrícula de mosaicos con los próximos 12 eventos, en la que un evento que se repite se muestra una sola vez, en su siguiente fecha. Cada mosaico muestra la foto del evento (o su título sobre el color oscuro de tu tema cuando no tiene foto), una insignia con la fecha, el día y la hora, y la primera línea de su descripción. Un botón **Subscribe** encima de los mosaicos permite a los visitantes copiar el enlace ICS del calendario o descargarlo.
4. Para mostrar solo algunos eventos, escribe una etiqueta en **Only events tagged**; por ejemplo, `youth`. Solo aparecen los eventos cuyas **Tags** incluyan esa palabra. Déjalo vacío para mostrar todos los eventos. Las etiquetas se establecen en cada evento; consulta [Agregar y editar eventos](../calendars/creating-calendars.md#adding-and-editing-events).

En cualquiera de las dos vistas, al hacer clic en un evento se abre su propia página en tu sitio web. La página del evento muestra la foto, el título, la fecha, la hora y la descripción del evento, además de un cuadro con **When** (incluido el patrón de repetición para un evento recurrente) y **Where** (las salas reservadas para él). También tiene un botón **Register for this Event** cuando el registro está activado, y un enlace **Add to my calendar** que descarga el evento como archivo de calendario. La página está preparada para que los motores de búsqueda puedan mostrar la fecha y los detalles del evento en sus resultados.

### Reordenar el contenido

Arrastra secciones o elementos usando el icono de asa (seis puntos) a la izquierda de cada elemento para reordenarlos. Puedes arrastrar elementos dentro de una sección o moverlos entre secciones.

## Dar estilo a tu página

### Estilos de sección

Haz clic en cualquier sección para abrir su panel de estilos. Puedes configurar:

- **Background** -- Color sólido, degradado o imagen. Cuando usas una imagen de fondo, un selector de **Focal Point** te permite hacer clic para definir qué parte de la imagen permanece centrada al escalar la sección, y la opción de color **Overlay** te permite añadir un tinte semitransparente sobre la imagen para mejorar la legibilidad del texto.
- **Padding** -- Espaciado superior e inferior dentro de la sección
- **Width** -- Ancho completo o centrado/contenido
- **Dividers** -- Separadores decorativos con forma (ondas, diagonales, curvas, triángulos y más) en el borde superior o inferior de la sección, con opciones de color, altura e inversión

### Estilos de elemento

Haz clic en cualquier elemento para abrir su panel de estilos. Las opciones comunes incluyen tamaño de fuente, color, alineación, margen y relleno. En las imágenes, puedes configurar el texto alternativo y los destinos de los enlaces.

### CSS personalizado

Para un estilo avanzado, cada sección y cada elemento tiene un campo **Custom CSS** donde puedes escribir tus propias reglas CSS. Estas reglas se limitan a ese elemento, así que no afectarán involuntariamente al resto de la página.

:::tip
Si necesitas aplicar estilos a todo tu sitio, como una fuente personalizada o un color global, usa la configuración de [Apariencia](appearance) en lugar de CSS personalizado en páginas individuales.
:::

## Previsualizar tu página

Usa los controles de vista previa de la barra de herramientas para comprobar cómo se ve tu página en distintos tamaños de pantalla:

- **Desktop** -- Vista de navegador de ancho completo
- **Mobile** -- Vista estrecha del tamaño de un teléfono

Para ver la página en vivo tal como la verán los visitantes, vuelve a la lista de Pages y haz clic en la ruta de la página. Se abrirá en una nueva pestaña del navegador.

## Comprobar la accesibilidad

Haz clic en el icono **Accessibility** de la barra de herramientas para ejecutar una comprobación rápida de problemas comunes: imágenes sin texto alternativo, contraste de color bajo o encabezados desordenados. Cada problema enlaza directamente con el elemento que necesita atención, para que puedas corregirlo en el mismo lugar.

## Deshacer cambios

El editor registra automáticamente tu historial de edición. Usa los botones de la barra de herramientas o los atajos de teclado para navegar:

- **Undo** (Ctrl+Z / Cmd+Z) -- Revierte tu última acción
- **Redo** (Ctrl+Shift+Z o Ctrl+Y / Cmd+Shift+Z) -- Vuelve a aplicar una acción deshecha

También puedes restaurar la página a una instantánea anterior. Haz clic en **View history** en la barra de herramientas para ver una lista de instantáneas guardadas con sus descripciones, y haz clic en cualquier entrada para restaurar ese punto.

:::warning
Restaurar una instantánea reemplaza el contenido actual de tu página por la versión de la instantánea. Esto no se puede deshacer con el botón de deshacer estándar. Guarda una instantánea de tu estado actual antes de restaurar una anterior si quieres poder volver atrás.
:::

## Guardar y publicar

Los cambios se guardan automáticamente mientras trabajas. Un indicador de estado en la barra de herramientas muestra si tus cambios se han guardado.

### Estado de borrador y de publicación

Las páginas pueden tener un estado de **published** (publicado), que controla cuándo ven los visitantes tus cambios. La barra de herramientas muestra una etiqueta de estado con el estado actual:

- **Live on save** -- La página no usa un flujo de publicación. Cada cambio guardado se publica de inmediato. Es el valor predeterminado para las páginas nuevas.
- **Unpublished changes** -- La página se ha publicado antes, pero has hecho cambios desde la última publicación. Los visitantes siguen viendo la versión publicada anteriormente.
- **Published** -- La página está en vivo y tu contenido guardado coincide con lo que ven los visitantes.

Para publicar tus cambios, haz clic en el botón **Publish** de la barra de herramientas. La página se publica de inmediato.

Para volver a la última versión publicada sin afectar lo que ven los visitantes, abre el menú de desbordamiento (⋮) y haz clic en **Discard unpublished changes**.

Para dejar de usar el flujo de publicación, abre el menú de desbordamiento y haz clic en **Turn off publishing**. Los cambios volverán a publicarse de inmediato.

:::tip
Usa el flujo de borrador y publicación cuando quieras preparar una página, por ejemplo para un evento próximo, y solo hacerla pública en el momento adecuado. Construye y previsualiza la página, y luego haz clic en Publish cuando estés listo.
:::

## Artículos relacionados

- [Gestión de páginas](managing-pages): crea páginas, define las URL y gestiona la navegación del sitio
- [Apariencia](appearance): define colores, fuentes y marca para todo el sitio
- [Archivos](files): sube imágenes y documentos para usarlos en el editor
- [Crear formularios](../forms/creating-forms): crea formularios que puedas insertar en las páginas
