---
title: "Uso del editor de páginas"
---

# Uso del editor de páginas

<div class="article-intro">

El editor de páginas de B1 es un constructor visual de arrastrar y soltar que te permite diseñar las páginas de tu sitio web de la iglesia sin escribir código. Puedes agregar secciones y bloques de contenido, personalizar estilos, previsualizar tu trabajo y deshacer cambios, todo desde tu navegador.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Completa la [Configuración inicial](initial-setup) para tener configurado tu sitio web
- Crea al menos una página en [Administrar páginas](managing-pages)
- Necesitas el permiso **content.edit** para acceder al editor

</div>

## Abrir el editor

1. En B1 Admin, abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expande **Sitio web** y haz clic en **Páginas**.
2. Busca la página que quieres editar en la tabla de páginas y haz clic en **Editar contenido**.

El editor se abre en pantalla completa. El panel izquierdo muestra la estructura de tu página y los elementos de contenido disponibles; el área central muestra una vista previa en vivo de tu página.

:::info
El editor siempre se muestra en modo claro, sin importar la configuración de tema de B1 Admin, y usa las fuentes de encabezado y de texto que elegiste en [Apariencia](appearance). Así la vista previa coincide con la forma en que tu página se verá para los visitantes del sitio.
:::

## Estructura de la página: secciones y elementos

Cada página se construye con dos niveles:

- **Secciones**: los contenedores de nivel superior que dividen tu página en franjas horizontales (por ejemplo, una sección hero, un bloque de contenido o una franja de pie de página). Cada página debe tener al menos una sección antes de que puedas agregar contenido.
- **Elementos**: las piezas de contenido individuales que se colocan dentro de una sección, como texto, imágenes, botones, tarjetas, formularios y calendarios.

### Agregar una sección

1. Haz clic en **Agregar sección** (o en el botón **+** en la parte superior del panel izquierdo).
2. Elige cómo empezar:
   - **Desde una plantilla**: explora la galería de plantillas de sección organizada por categoría (Hero, About, Services, Giving, etc.) y haz clic en una para insertarla como una sección con estilo completo y contenido de ejemplo. Puedes personalizar todo después de agregarla.
   - **Sección en blanco**: elige un diseño de columnas (una columna, dos columnas, tres columnas, etc.) y construye desde cero.
3. La nueva sección aparece en la vista previa. Haz clic en ella para seleccionarla y configurar su color de fondo, relleno y otras opciones de estilo.

### Cambiar el diseño de una sección

¿Ya construiste una sección pero quieres otra estructura? Usa el selector de diseño de esa sección para cambiar su distribución de columnas por otra de la galería, manteniendo en su lugar el contenido y los elementos existentes.

### Agregar elementos a una sección

1. Haz clic dentro de una sección en la vista previa para seleccionarla.
2. Haz clic en **Agregar contenido** y elige un tipo de elemento de la lista:
   - **Texto**: encabezados, párrafos y texto enriquecido
   - **Imagen**: sube o enlaza una foto
   - **Botón**: un enlace de llamada a la acción en forma de botón
   - **Tarjeta**: una imagen con un título y una descripción
   - **Formulario**: incrusta un [formulario](../forms/creating-forms) directamente en la página
   - **Calendario**: muestra un calendario de eventos
   - **Preguntas frecuentes**: bloques de preguntas y respuestas tipo acordeón
   - **Video**: incrusta un video mediante una URL
   - **Explorador de grupos**: un directorio filtrable de todos los grupos de la iglesia, con búsqueda opcional, filtro por categoría y filtro por etiqueta
   - **Destacado con ícono**: un ícono con un título y una descripción breve, para destacar funciones o ministerios
   - **Galería**: una cuadrícula de varias fotos o un diseño tipo mosaico (masonry)
   - **Testimonio**: una o más citas con el nombre, el cargo y la foto del autor
   - **Íconos de redes sociales**: íconos enlazados a los perfiles de redes sociales de tu iglesia
   - **Cuenta regresiva**: un temporizador que cuenta hacia atrás hasta una fecha o un horario semanal de servicio
   - **Estadísticas**: una fila de números grandes con etiquetas (miembros, años, sedes)
   - **Progreso de campaña**: una barra de progreso en vivo para una campaña de donaciones, que muestra el total recaudado hacia la meta de un fondo
   - **Cuadrícula de personal**: tarjetas con fotos de los miembros de un grupo; el grupo debe tener activada la opción de **lista pública**
   - **Horarios de servicio**: el horario de servicios de tus sedes, tomado automáticamente de la configuración de asistencia
   - **Sermones**: tu biblioteca de sermones, como un explorador completo o en diseño de cuadrícula, lista o destacado del más reciente
   - **Mapa**: un mapa incrustado centrado en la dirección de tu iglesia
   - **Tabla**: una cuadrícula sencilla de filas y columnas para contenido tabular
   - **Texto con foto**: texto y una imagen uno al lado del otro
   - **Logotipo**: el logotipo de tu iglesia, tomado de [Apariencia](appearance)
   - **Transmisión en vivo**: el reproductor de tu transmisión en vivo, incrustado directamente en la página
   - **Podcast**: una lista de episodios tomada de una URL de fuente RSS de podcast externa que proporcionas, con opciones para definir cuántos episodios mostrar y si se muestran las fechas y las descripciones. Sirve para destacar cualquier fuente de podcast en tu sitio; para publicar tus propios sermones como podcast, consulta [Administrar sermones](../sermons/managing-sermons.md#your-podcast-feed).
   - **Donación**: un botón de donación o un formulario de donación incrustado
   - **HTML**: tu propio HTML sin procesar, para casos avanzados como incrustar un widget de terceros (consulta [Uso del elemento HTML](#using-the-html-element))
   - **iFrame**: incrusta contenido externo mediante una URL
3. Configura el elemento con el panel de configuración que aparece.

### Uso del elemento HTML {#using-the-html-element}

El elemento **HTML** tiene dos cuadros:

- **Contenido HTML**: el marcado que se muestra en la página. Cualquier etiqueta `<script>` que incluyas aquí se ejecuta en tu sitio en vivo.
- **JavaScript (sin la etiqueta script)**: código de script que se ejecuta cuando carga la página. También puedes pegar aquí el fragmento de incrustación de un proveedor con sus etiquetas `<script>` incluidas, y se ejecutará en el sitio en vivo.

Si pegas solo una dirección web (como el enlace a una imagen) en el cuadro de JavaScript, el cuadro se pone rojo con la advertencia *"Esto es una dirección web, no JavaScript."* Una dirección sola en ese cuadro no hace nada. Para mostrar una imagen, usa un elemento **Imagen** o pon `<img src="...">` en **Contenido HTML**.

### Uso del elemento Calendar {#using-the-calendar-element}

El elemento **Calendario** muestra eventos de uno de tus calendarios:

1. En **Seleccionar**, elige **Calendario de grupo** (los eventos de un grupo; la lista muestra los grupos a los que perteneces) o **Calendario curado** (un calendario que creaste en **Calendarios**; consulta [Calendario curado](../calendars/curated-calendar)).
2. En **Seleccionar calendario**, elige el grupo o calendario.
3. En **Mostrar**, elige cómo mostrarlo:
   - **Calendario mensual**: una cuadrícula mensual que los visitantes pueden recorrer por página.
   - **Próximos eventos**: una cuadrícula de mosaicos con los próximos 12 eventos, en la que un evento que se repite aparece una sola vez en su siguiente fecha. Cada mosaico muestra la foto del evento (o su título sobre el color oscuro de tu tema cuando no tiene foto), una insignia de fecha, el día y la hora, y la primera línea de su descripción. Un botón **Suscribirse** encima de los mosaicos permite a los visitantes copiar el enlace ICS del calendario o descargarlo.
4. Para mostrar solo algunos eventos, escribe una etiqueta en **Solo eventos con la etiqueta**; por ejemplo, `youth`. Solo aparecen los eventos cuyas **Etiquetas** incluyen esa palabra. Déjalo vacío para mostrar todos los eventos. Las etiquetas se configuran en cada evento; consulta [Agregar y editar eventos](../calendars/creating-calendars.md#adding-and-editing-events).

En cualquiera de las dos vistas, al hacer clic en un evento se abre su propia página en tu sitio web. La página del evento muestra la foto, el título, la fecha, la hora y la descripción del evento, además de un recuadro con **Cuándo** (incluido el patrón de repetición en el caso de un evento recurrente) y **Dónde** (las salas reservadas para él). También tiene un botón **Registrarse en este evento** cuando el registro está activado, y un enlace **Agregar a mi calendario** que descarga el evento como archivo de calendario. La página está preparada para que los motores de búsqueda muestren la fecha y los detalles del evento en sus resultados.

### Reordenar el contenido

Arrastra las secciones o los elementos usando el icono de asa (seis puntos) en el lado izquierdo de cada elemento para reordenarlos. Puedes arrastrar elementos dentro de una sección o moverlos entre secciones.

## Dar estilo a tu página

### Estilos de sección

Haz clic en cualquier sección para abrir su panel de estilos. Puedes configurar:

- **Fondo**: color sólido, degradado o imagen. Al usar una imagen de fondo, un selector de **Punto focal** te permite hacer clic para definir qué parte de la imagen permanece centrada al escalar la sección, y una opción de color **Superposición** te permite añadir un tinte semitransparente sobre la imagen para mejorar la legibilidad del texto.
- **Relleno**: espacio superior e inferior dentro de la sección
- **Ancho**: ancho completo o centrado/contenido
- **Divisores**: divisores decorativos con forma (ondas, diagonales, curvas, triángulos y más) en el borde superior o inferior de la sección, con opciones de color, altura e inversión

### Estilos de elemento

Haz clic en cualquier elemento para abrir su panel de estilos. Las opciones comunes incluyen tamaño de fuente, color, alineación, margen y relleno. En las imágenes puedes configurar el texto alternativo (alt) y los destinos de los enlaces.

### CSS personalizado

Para un estilo más avanzado, cada sección y cada elemento tiene un campo **CSS personalizado** en el que puedes escribir tus propias reglas CSS. Estas reglas se limitan a ese elemento, así que no afectarán involuntariamente al resto de la página.

:::tip
Si necesitas aplicar estilos a todo tu sitio, como una fuente personalizada o un color global, usa la configuración de [Apariencia](appearance) en lugar de CSS personalizado en páginas individuales.
:::

## Previsualizar tu página

Usa los controles de vista previa de la barra de herramientas para revisar cómo se ve tu página en distintos tamaños de pantalla:

- **Escritorio**: vista de navegador a ancho completo
- **Móvil**: vista estrecha de tamaño de teléfono

Para ver la página en vivo exactamente como la verán los visitantes, vuelve a la lista de Pages y haz clic en la ruta de la página. Se abrirá en una nueva pestaña del navegador.

## Revisar la accesibilidad

Haz clic en el icono **Accesibilidad** de la barra de herramientas para ejecutar una revisión rápida de problemas comunes: imágenes sin texto alternativo, bajo contraste de color o encabezados fuera de orden. Cada problema enlaza directamente al elemento que necesita atención, para que puedas corregirlo en el mismo lugar.

## Deshacer cambios

El editor registra tu historial de edición automáticamente. Usa los botones de la barra de herramientas o los atajos de teclado para navegar:

- **Deshacer** (Ctrl+Z / Cmd+Z): revierte tu última acción
- **Rehacer** (Ctrl+Shift+Z o Ctrl+Y / Cmd+Shift+Z): vuelve a aplicar una acción deshecha

También puedes restaurar la página a una instantánea anterior. Haz clic en **Ver historial** en la barra de herramientas para ver una lista de instantáneas guardadas con sus descripciones, y haz clic en cualquier entrada para volver a ese punto.

:::warning
Restaurar una instantánea reemplaza el contenido actual de tu página por la versión de la instantánea. Esto no se puede deshacer con el botón de deshacer estándar. Guarda una instantánea de tu estado actual antes de restaurar una anterior si quieres poder volver atrás.
:::

## Guardar y publicar

Los cambios se guardan automáticamente mientras trabajas. Un indicador de estado en la barra de herramientas muestra si tus cambios ya se guardaron.

### Estado de borrador y publicado

Las páginas pueden tener un estado **publicado**, que controla cuándo los visitantes ven tus cambios. La barra de herramientas muestra una etiqueta de estado con el estado actual:

- **Activo al guardar**: la página no usa un flujo de publicación. Cada cambio guardado se publica de inmediato. Es el valor predeterminado para las páginas nuevas.
- **Cambios sin publicar**: la página ya se publicó antes, pero has hecho cambios desde la última publicación. Los visitantes siguen viendo la versión publicada anteriormente.
- **Publicado**: la página está en vivo y tu contenido guardado coincide con lo que ven los visitantes.

Para publicar tus cambios, haz clic en el botón **Publicar** de la barra de herramientas. La página se publica de inmediato.

Para volver a la última versión publicada sin afectar lo que ven los visitantes, abre el menú de desbordamiento (⋮) y haz clic en **Descartar cambios sin publicar**.

Para dejar de usar el flujo de publicación, abre el menú de desbordamiento y haz clic en **Desactivar publicación**. Las ediciones volverán a publicarse de inmediato.

:::tip
Usa el flujo de borrador y publicación cuando quieras preparar una página, por ejemplo para un evento próximo, y hacerla pública solo en el momento adecuado. Crea y previsualiza la página, y luego haz clic en Publish cuando estés listo.
:::

## Artículos relacionados

- [Administrar páginas](managing-pages): crea páginas, define URLs y administra la navegación del sitio
- [Apariencia](appearance): define colores, fuentes y marca para todo el sitio
- [Archivos](files): sube imágenes y documentos para usarlos en el editor
- [Crear formularios](../forms/creating-forms): crea formularios que puedes incrustar en las páginas
