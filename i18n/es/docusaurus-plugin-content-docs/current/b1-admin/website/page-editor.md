---
title: "Uso del editor de páginas"
---

# Uso del editor de páginas

<div class="article-intro">

El editor de páginas de B1 es un constructor visual de arrastrar y soltar que le permite diseñar las páginas de su sitio web de la iglesia sin escribir código. Puede agregar secciones y bloques de contenido, personalizar estilos, previsualizar su trabajo y deshacer cambios, todo desde su navegador.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Complete la [Configuración inicial](initial-setup) para configurar su sitio web
- Cree al menos una página en [Administrar páginas](managing-pages)
- Necesita el permiso **content.edit** para acceder al editor

</div>

## Abrir el editor

1. En B1 Admin, abra el [menú de salto](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expanda **Sitio web** y haga clic en **Páginas**.
2. Busque la página que desea editar en la tabla de Páginas y haga clic en **Editar contenido**.

El editor se abre en modo de pantalla completa. El panel izquierdo muestra la estructura de su página y los elementos de contenido disponibles; el área central muestra una vista previa en vivo de su página.

:::info
El editor siempre se muestra en modo claro, sin importar la configuración de tema de B1 Admin, y usa las fuentes de encabezados y del cuerpo que eligió en [Apariencia](appearance). Esto garantiza que la vista previa coincida con el aspecto que tendrá la página para los visitantes del sitio.
:::

## Estructura de la página: secciones y elementos

Cada página se construye con dos niveles:

- **Secciones**: los contenedores de nivel superior que dividen su página en franjas horizontales (por ejemplo, una sección principal, un bloque de contenido o una franja de pie de página). Cada página debe tener al menos una sección antes de poder agregar contenido.
- **Elementos**: las piezas de contenido individuales que se colocan dentro de una sección, como texto, imágenes, botones, tarjetas, formularios y calendarios.

### Agregar una sección

1. Haga clic en **Agregar sección** (o en el botón **+** en la parte superior del panel izquierdo).
2. Elija cómo empezar:
   - **Desde una plantilla**: explore la galería de plantillas de secciones organizada por categoría (Principal, Acerca de, Servicios, Donaciones, etc.) y haga clic en una para insertarla como una sección con estilo completo y contenido de ejemplo. Puede personalizar todo después de agregarla.
   - **Sección en blanco**: elija una distribución de columnas (una, dos columnas, tres columnas, etc.) y construya desde cero.
3. La nueva sección aparece en la vista previa. Haga clic en ella para seleccionarla y configurar su color de fondo, relleno y otras opciones de estilo.

### Cambiar el diseño de una sección

¿Ya construyó una sección pero quiere una estructura diferente? Use el selector de diseño de esa sección para cambiar su distribución de columnas por otra de la galería, manteniendo en su lugar el contenido y los elementos existentes.

### Agregar elementos a una sección

1. Haga clic dentro de una sección en la vista previa para seleccionarla.
2. Haga clic en **Agregar contenido** y elija un tipo de elemento de la lista:
   - **Texto**: encabezados, párrafos y texto enriquecido
   - **Imagen**: suba o enlace una foto
   - **Botón**: un enlace de llamada a la acción en el que se puede hacer clic
   - **Tarjeta**: una imagen con un título y una descripción
   - **Formulario**: incruste un [formulario](../forms/creating-forms) directamente en la página. Si el formulario tiene una [foto de encabezado](../forms/creating-forms.md#adding-a-header-photo), se muestra encima de las preguntas
   - **Calendario**: muestra un calendario de eventos
   - **Preguntas frecuentes**: bloques de pregunta y respuesta en formato de acordeón
   - **Video**: incruste un video mediante su URL
   - **Explorador de grupos**: un directorio filtrable de todos los grupos de la iglesia, con búsqueda opcional, filtro por categoría y filtro por etiqueta
   - **Característica con ícono**: un ícono con un título y una breve descripción, para destacar características o ministerios
   - **Galería**: una cuadrícula o diseño en mosaico con varias fotos
   - **Testimonio**: una o más citas con el nombre del autor, su cargo y una foto
   - **Íconos de redes sociales**: íconos con enlaces a los perfiles de redes sociales de su iglesia: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo y Podcast. Complete un enlace para cada uno que desee mostrar; para **WhatsApp**, use un enlace `https://wa.me/` con su número o un enlace de invitación a un grupo
   - **Cuenta regresiva**: un temporizador que cuenta hacia una fecha o un horario de servicio semanal
   - **Estadísticas**: una fila de números grandes con etiquetas (miembros, años, sedes)
   - **Progreso de campaña**: una barra de progreso en vivo para una campaña de donaciones, que muestra el total recaudado hacia una meta de fondo
   - **Cuadrícula de personal**: tarjetas con fotos de los miembros de un grupo; el grupo debe tener activada la opción de **lista pública**
   - **Horarios de servicio**: el calendario de servicios de sus sedes, extraído automáticamente de la configuración de asistencia
   - **Sermones**: su biblioteca de sermones, como un explorador completo o en formato de cuadrícula, lista o destacado con los más recientes
   - **Mapa**: un mapa incrustado centrado en la dirección de su iglesia
   - **Tabla**: una cuadrícula simple de filas y columnas para contenido tabular
   - **Texto con foto**: texto y una imagen uno al lado del otro
   - **Logotipo**: el logotipo de su iglesia, tomado de [Apariencia](appearance)
   - **Transmisión en vivo**: el reproductor de su transmisión en vivo, incrustado directamente en la página
   - **Podcast**: una lista de episodios tomada de una URL externa de fuente RSS de podcast que usted proporciona, con opciones para definir cuántos episodios mostrar y si se muestran las fechas y las descripciones. En el sitio publicado, cada episodio tiene un reproductor de audio y un enlace de **Descargar** que guarda el archivo de audio del episodio con el título del episodio. Esto sirve para destacar cualquier fuente de podcast en su sitio; para publicar sus propios sermones como podcast, consulte [Administrar sermones](../sermons/managing-sermons.md#your-podcast-feed).
   - **Donación**: un botón de donación o un formulario de donación incrustado
   - **HTML**: su propio HTML sin procesar, para usos avanzados, como incrustar un widget de terceros (consulte [Uso del elemento HTML](#using-the-html-element))
   - **iFrame**: incruste contenido externo mediante una URL
3. Configure el elemento usando el panel de configuración que aparece.

### Uso del elemento HTML

El elemento **HTML** tiene dos cuadros:

- **Contenido HTML**: el marcado que se muestra en la página. Cualquier etiqueta `<script>` que incluya aquí se ejecuta en su sitio publicado.
- **JavaScript (sin la etiqueta script)**: código de script que se ejecuta cuando se carga la página. También puede pegar aquí un fragmento de incrustación de un proveedor con sus etiquetas `<script>` incluidas, y se ejecutará en el sitio publicado.

Si pega solo una dirección web (como el enlace de una imagen) en el cuadro de JavaScript, el cuadro se pone rojo con la advertencia *"Esto es una dirección web, no JavaScript."* Una dirección sola en ese cuadro no hace nada. Para mostrar una imagen, use un elemento **Imagen** o coloque `<img src="...">` en **Contenido HTML**.

### Uso del elemento Calendario {#using-the-calendar-element}

El elemento **Calendario** muestra eventos de uno de sus calendarios:

1. En **Seleccionar**, elija **Calendario de grupo** (los eventos de un grupo; la lista muestra los grupos a los que pertenece) o **Calendario curado** (un calendario que creó en **Calendarios**; consulte [Calendario curado](../calendars/curated-calendar)).
2. En **Seleccionar calendario**, elija el grupo o el calendario.
3. En **Mostrar**, elija cómo presentarlo:
   - **Calendario mensual**: una cuadrícula mensual que los visitantes pueden recorrer.
   - **Próximos eventos**: una cuadrícula de mosaicos con los próximos 12 eventos, en la que un evento que se repite aparece una sola vez, en su siguiente fecha. Cada mosaico muestra la foto del evento (o su título sobre el color oscuro del tema si no tiene foto), una insignia con la fecha, el día y la hora, y la primera línea de su descripción. Un botón **Suscribirse** encima de los mosaicos permite a los visitantes copiar el enlace ICS del calendario o descargarlo.
4. Para mostrar solo algunos eventos, escriba una etiqueta en **Solo eventos con la etiqueta**; por ejemplo, `jóvenes`. Solo aparecen los eventos cuyas **Etiquetas** incluyen esa palabra. Déjelo vacío para mostrar todos los eventos. Las etiquetas se definen en cada evento; consulte [Agregar y editar eventos](../calendars/creating-calendars.md#adding-and-editing-events).

En cualquiera de las dos presentaciones, al hacer clic en un evento se abre su propia página en su sitio web. La página del evento muestra la foto del evento, el título, la fecha y la hora, y la descripción, además de un recuadro con **Cuándo** (incluido el patrón de repetición en el caso de un evento recurrente) y **Dónde** (las salas reservadas para él). También tiene un botón **Inscribirse en este evento** cuando el registro está activado, y un enlace **Agregar a mi calendario** que descarga el evento como archivo de calendario. La página está preparada para que los motores de búsqueda muestren la fecha y los detalles del evento en sus resultados. Las páginas de eventos de calendarios curados que aparecen en sus páginas (para eventos de los próximos seis meses) también se incluyen en el mapa del sitio, para que los motores de búsqueda puedan encontrarlas.

### Reordenar contenido

Arrastre secciones o elementos usando el ícono de manija (seis puntos) a la izquierda de cada elemento para reordenarlos. Puede arrastrar elementos dentro de una sección o moverlos entre secciones.

## Dar estilo a su página

### Estilos de sección

Haga clic en cualquier sección para abrir su panel de estilos. Puede configurar:

- **Fondo**: color sólido, degradado o imagen. Cuando usa una imagen de fondo, un selector de **Punto focal** le permite hacer clic para definir qué parte de la imagen permanece centrada al escalar la sección, y una opción de color de **Superposición** le permite agregar un tinte semitransparente sobre la imagen para mejorar la legibilidad del texto.
- **Relleno**: espacio superior e inferior dentro de la sección
- **Ancho**: ancho completo o centrado/contenido
- **Divisores**: divisores decorativos con forma (onda, diagonal, curva, triángulo y más) en el borde superior o inferior de la sección, con opciones de color, altura y volteo

### Estilos de elemento

Haga clic en cualquier elemento para abrir su panel de estilos. Las opciones comunes incluyen tamaño de fuente, color, alineación, margen y relleno. Para las imágenes, puede configurar el texto alternativo y los destinos de enlace.

### CSS personalizado

Para un estilo avanzado, cada sección y cada elemento tiene un campo de **CSS personalizado** donde puede escribir sus propias reglas CSS. Estas se limitan a ese elemento, así que no afectan involuntariamente al resto de la página.

:::tip
Si necesita aplicar estilos a todo su sitio, como una fuente personalizada o un color global, use la configuración de [Apariencia](appearance) en lugar de CSS personalizado en páginas individuales.
:::

## Previsualizar su página

Use los controles de vista previa de la barra de herramientas para comprobar cómo se ve su página en distintos tamaños de pantalla:

- **Escritorio**: vista de navegador a ancho completo
- **Móvil**: vista estrecha con el tamaño de un teléfono

Para ver la página en vivo exactamente como la verán los visitantes, regrese a la lista de Páginas y haga clic en la ruta de la página. Se abre en una nueva pestaña del navegador.

## Revisar la accesibilidad

Haga clic en el ícono de **Accesibilidad** en la barra de herramientas para ejecutar una revisión rápida de problemas comunes: imágenes sin texto alternativo, contraste de color bajo o encabezados fuera de orden. Cada problema enlaza directamente con el elemento que necesita atención, para que pueda corregirlo en el mismo lugar.

## Deshacer cambios

El editor registra automáticamente su historial de edición. Use los botones de la barra de herramientas o los atajos de teclado para navegar:

- **Deshacer** (Ctrl+Z / Cmd+Z): revierte su última acción
- **Rehacer** (Ctrl+Shift+Z o Ctrl+Y / Cmd+Shift+Z): vuelve a aplicar una acción deshecha

También puede restaurar la página a una instantánea anterior. Haga clic en **Ver historial** en la barra de herramientas para ver una lista de instantáneas guardadas con sus descripciones, y haga clic en cualquier entrada para restaurar ese punto.

:::warning
Restaurar una instantánea reemplaza el contenido actual de su página por la versión de la instantánea. Esto no se puede deshacer con el botón estándar de deshacer. Guarde una instantánea de su estado actual antes de restaurar una anterior si quiere conservar la posibilidad de volver atrás.
:::

## Guardar y publicar

Los cambios se guardan automáticamente mientras trabaja. Un indicador de estado en la barra de herramientas muestra si sus cambios se han guardado.

### Estado de borrador y publicado

Las páginas pueden tener un estado **publicado**, que controla cuándo los visitantes ven sus cambios. La barra de herramientas muestra una etiqueta de estado con el estado actual:

- **Activo al guardar**: la página no usa un flujo de publicación. Cada cambio guardado se publica de inmediato. Este es el valor predeterminado para las páginas nuevas.
- **Cambios sin publicar**: la página se ha publicado antes, pero usted ha hecho cambios desde la última publicación. Los visitantes todavía ven la versión publicada anteriormente.
- **Publicada**: la página está activa y su contenido guardado coincide con lo que ven los visitantes.

Para publicar sus cambios, haga clic en el botón **Publicar** de la barra de herramientas. La página se activa de inmediato.

Para volver a la última versión publicada sin afectar lo que ven los visitantes, abra el menú de desbordamiento (⋮) y haga clic en **Descartar cambios sin publicar**.

Para dejar de usar el flujo de publicación, abra el menú de desbordamiento y haga clic en **Desactivar publicación**. Las ediciones volverán a publicarse de inmediato.

:::tip
Use el flujo de borrador y publicación cuando quiera preparar una página, por ejemplo, para un evento próximo, y hacerla pública solo en el momento adecuado. Construya y previsualice la página, y luego haga clic en Publicar cuando esté listo.
:::

## Artículos relacionados

- [Administrar páginas](managing-pages): cree páginas, defina URL y administre la navegación del sitio
- [Apariencia](appearance): configure los colores, las fuentes y la identidad visual de todo el sitio
- [Archivos](files): suba imágenes y documentos para usarlos en el editor
- [Crear formularios](../forms/creating-forms): cree formularios que puede incrustar en las páginas
