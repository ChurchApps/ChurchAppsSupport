---
title: "Usar el Editor de Páginas"
---

# Usar el Editor de Páginas

<div class="article-intro">

El editor de páginas de B1 es un constructor visual de arrastrar y soltar que te permite diseñar páginas de sitios web de iglesia sin escribir ningún código. Puedes agregar secciones y bloques de contenido, personalizar estilos, obtener una vista previa de tu trabajo, y deshacer cambios -- todo desde tu navegador.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Completa la [Configuración Inicial](initial-setup) para tener tu sitio web configurado
- Crea al menos una página en [Gestionar Páginas](managing-pages)
- Necesitas el permiso **content.edit** para acceder al editor

</div>

## Abrir el Editor

1. En B1 Admin, haz clic en **Sitio Web** en el menú izquierdo.
2. Encuentra la página que deseas editar en la tabla Páginas y haz clic en **Editar**.

El editor se abre en modo de pantalla completa. El panel izquierdo muestra la estructura de tu página y elementos de contenido disponibles; el área central muestra una vista previa en vivo de tu página.

:::info
El editor siempre se muestra en modo claro, independientemente de tu configuración de tema de B1 Admin. Esto garantiza que la vista previa coincida exactamente con la forma en que los visitantes del sitio web verán tu página.
:::

## Estructura de Página: Secciones y Elementos

Cada página se construye a partir de dos niveles:

- **Secciones** -- Los contenedores de nivel superior que dividen tu página en bandas horizontales (por ejemplo, una sección hero, un bloque de contenido, o una franja de pie de página). Cada página debe tener al menos una sección antes de poder agregar contenido.
- **Elementos** -- Las piezas de contenido individual colocadas dentro de una sección, como texto, imágenes, botones, tarjetas, formularios, y calendarios.

### Agregar una Sección

1. Haz clic en **Agregar Sección** (o el botón **+** en la parte superior del panel izquierdo).
2. Elige cómo comenzar:
   - **Desde una plantilla** — navega por la galería de plantillas de sección organizada por categoría (Hero, Acerca de, Servicios, Donaciones, etc.) y haz clic en una para insertarla como una sección completamente diseñada y pre-rellenada. Puedes personalizar todo después de agregarla.
   - **Sección en blanco** — elige un diseño de columnas (una sola, dos columnas, tres columnas, etc.) y construye desde cero.
3. La nueva sección aparece en la vista previa. Haz clic en ella para seleccionarla y configurar su color de fondo, relleno, y otras opciones de estilo.

### Agregar Elementos a una Sección

1. Haz clic dentro de una sección en la vista previa para seleccionarla.
2. Haz clic en **Agregar Contenido** y elige un tipo de elemento de la lista:
   - **Texto** -- Encabezados, párrafos, y texto enriquecido
   - **Imagen** -- Sube o enlaza a una foto
   - **Botón** -- Un enlace de llamada a la acción clicable
   - **Tarjeta** -- Una imagen con un título y descripción
   - **Formulario** -- Incrusta un [formulario](../forms/creating-forms) directamente en la página
   - **Calendario** -- Muestra un calendario de eventos
   - **Preguntas Frecuentes** -- Bloques de pregunta y respuesta estilo acordeón
   - **Video** -- Incrusta un video por URL
   - **Navegador de Grupos** -- Un directorio filtrable de todos los grupos de la iglesia con búsqueda opcional, filtro de categoría, y filtro de etiqueta
   - **Función de Icono** -- Un icono con un título y descripción corta, para destacar características o ministerios
   - **Galería** -- Una cuadrícula multi-foto o diseño de mampostería
   - **Testimonio** -- Una o más citas con nombre de autor, rol, y foto
   - **Iconos Sociales** -- Iconos vinculados para los perfiles de redes sociales de tu iglesia
   - **Cuenta Regresiva** -- Un temporizador que cuenta regresivamente hasta una fecha o un horario de servicio semanal
   - **Estadísticas** -- Una fila de números grandes con etiquetas (miembros, años, campuses)
   - **Progreso de Campaña** -- Una barra de progreso en vivo para una campaña de donaciones, mostrando el total recaudado hacia una meta de fondo
   - **Cuadrícula de Personal** -- Tarjetas de foto para los miembros de un grupo; el grupo debe tener su opción de **lista pública** activada
   - **Horarios de Servicio** -- El horario de servicio de tus campuses, extraído automáticamente de la configuración de asistencia
   - **Sermones** -- Tu biblioteca de sermones, como un navegador completo o un diseño de cuadrícula, lista, o destacado-más-reciente
3. Configura el elemento usando el panel de configuración que aparece.

### Reordenar Contenido

Arrastra secciones o elementos usando el icono de controlador (seis puntos) en el lado izquierdo de cada elemento para reordenarlos. Puedes arrastrar elementos dentro de una sección o moverlos entre secciones.

## Diseñando tu Página

### Estilos de Sección

Haz clic en cualquier sección para abrir su panel de estilo. Puedes establecer:

- **Fondo** -- Color sólido, degradado, o imagen. Al usar un fondo de imagen, un selector de **Punto Focal** te permite hacer clic para establecer qué parte de la imagen permanece centrada mientras la sección se escala, y una opción de color de **Superposición** te permite agregar un tinte semi-transparente sobre la imagen para mejorar la legibilidad del texto.
- **Relleno** -- Espaciado superior e inferior dentro de la sección
- **Ancho** -- Ancho completo o centrado/contenido
- **Divisores** -- Divisores de forma decorativos (onda, inclinado, curva, triángulo, y más) en el borde superior o inferior de la sección, con opciones de color, altura, y volteo

### Estilos de Elemento

Haz clic en cualquier elemento para abrir su panel de estilo. Las opciones comunes incluyen tamaño de fuente, color, alineación, margen, y relleno. Para imágenes, puedes establecer texto alternativo y destinos de enlace.

### CSS Personalizado

Para estilos avanzados, cada sección y elemento tiene un campo de **CSS Personalizado** donde puedes escribir tus propias reglas CSS. Estas están limitadas a ese elemento, así que no afectarán involuntariamente al resto de la página.

:::tip
Si necesitas aplicar estilos en todo tu sitio -- como una fuente personalizada o color global -- usa la configuración de [Apariencia](appearance) en lugar de CSS personalizado en páginas individuales.
:::

## Vista Previa de tu Página

Usa los controles de vista previa en la barra de herramientas para verificar cómo se ve tu página en diferentes tamaños de pantalla:

- **Escritorio** -- Vista de navegador de ancho completo
- **Móvil** -- Vista estrecha del tamaño de un teléfono

Haz clic en **Vista Previa** para abrir una versión en vivo de la página en una nueva pestaña del navegador, exactamente como la verán los visitantes.

## Deshacer Cambios

El editor rastrea tu historial de edición automáticamente. Usa los botones de la barra de herramientas o atajos de teclado para navegar:

- **Deshacer** (Ctrl+Z / Cmd+Z) -- Revierte tu última acción
- **Rehacer** (Ctrl+Y / Cmd+Y) -- Vuelve a aplicar una acción deshecha

También puedes restaurar la página a una instantánea anterior. Haz clic en **Historial** en la barra de herramientas para ver una lista de instantáneas guardadas con descripciones, y haz clic en cualquier entrada para restaurar a ese punto.

:::warning
Restaurar una instantánea reemplaza el contenido actual de tu página con la versión de la instantánea. Esto no se puede deshacer con el botón de deshacer estándar. Guarda una instantánea de tu estado actual antes de restaurar una antigua si deseas mantener la opción de regresar.
:::

## Guardar y Publicar

Los cambios se guardan automáticamente mientras trabajas. Un indicador de estado en la barra de herramientas muestra si tus cambios han sido guardados.

### Estado de borrador y publicado

Las páginas pueden tener un estado **publicado**, que controla cuándo los visitantes ven tus cambios. La barra de herramientas muestra un chip de estado indicando el estado actual:

- **En Vivo al Guardar** -- La página no usa un flujo de trabajo de publicación. Cada cambio guardado se activa inmediatamente. Este es el predeterminado para páginas nuevas.
- **Cambios No Publicados** -- La página ha sido publicada antes, pero has hecho cambios desde la última publicación. Los visitantes todavía ven la versión previamente publicada.
- **Publicado** -- La página está activa y tu contenido guardado coincide con lo que ven los visitantes.

Para publicar tus cambios, haz clic en el botón **Publicar** en la barra de herramientas. La página se activa inmediatamente.

Para revertir a la última versión publicada sin afectar lo que ven los visitantes, abre el menú de desbordamiento (⋮) y haz clic en **Descartar Cambios**.

Para poner una página fuera de línea por completo, abre el menú de desbordamiento y haz clic en **Despublicar**. Los visitantes ya no verán esa página hasta que la publiques de nuevo.

:::tip
Usa el flujo de trabajo de borrador/publicación cuando desees preparar una página -- por ejemplo, para un próximo evento -- y solo activarla en el momento correcto. Construye y previsualiza la página, luego haz clic en Publicar cuando estés listo.
:::

## Artículos Relacionados

- [Gestionar Páginas](managing-pages) -- Crea páginas, establece URLs, y gestiona la navegación del sitio
- [Apariencia](appearance) -- Establece colores, fuentes, y marca de todo el sitio
- [Archivos](files) -- Carga imágenes y documentos para usar en el editor
- [Crear Formularios](../forms/creating-forms) -- Construye formularios que puedes incrustar en páginas
