---
title: "Usar el Editor de Páginas"
---

# Usar el Editor de Páginas

<div class="article-intro">

El editor de páginas B1 es un constructor de arrastrar y soltar visual que le permite diseñar páginas de sitios web de su iglesia sin escribir ningún código. Puede agregar secciones y bloques de contenido, personalizar estilos, obtener una vista previa de su trabajo y deshacer cambios, todo desde su navegador.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Complete la [Configuración Inicial](initial-setup) para obtener su sitio web configurado
- Cree al menos una página en [Gestionar Páginas](managing-pages)
- Necesita el permiso **content.edit** para acceder al editor

</div>

## Abrir el Editor

1. En B1 Admin, haga clic en **Sitio Web** en el menú izquierdo.
2. Encuentre la página que desea editar en la tabla Páginas y haga clic en **Editar**.

El editor se abre en modo de pantalla completa. El panel izquierdo muestra su estructura de página y elementos de contenido disponibles; el área central muestra una vista previa en vivo de su página.

:::info
El editor siempre se muestra en modo claro, independientemente de su configuración de tema B1 Admin. Esto asegura que la vista previa coincida con precisión cómo se verá su página a los visitantes del sitio web.
:::

## Estructura de Página: Secciones y Elementos

Cada página se construye a partir de dos niveles:

- **Secciones** -- Los contenedores de nivel superior que dividen su página en bandas horizontales (por ejemplo, una sección de héroe, un bloque de contenido o una franja de pie de página). Cada página debe tener al menos una sección antes de poder agregar contenido.
- **Elementos** -- Las piezas de contenido individual colocadas dentro de una sección, como texto, imágenes, botones, tarjetas, formularios y calendarios.

### Agregar una Sección

1. Haga clic en **Agregar Sección** (o el botón **+** en la parte superior del panel izquierdo).
2. Elija cómo comenzar:
   - **Desde una plantilla** -- explore la galería de plantillas de sección organizada por categoría (Héroe, Acerca de, Servicios, Donaciones, etc.) y haga clic en una para insertar como una sección completamente diseñada y pre-rellena. Puede personalizar todo después de agregarse.
   - **Sección en blanco** -- elija un diseño de columnas (una sola, dos columnas, tres columnas, etc.) y construya desde cero.
3. La nueva sección aparece en la vista previa. Haga clic en ella para seleccionarla y configure su color de fondo, relleno y otras opciones de estilo.

### Agregar Elementos a una Sección

1. Haga clic dentro de una sección en la vista previa para seleccionarla.
2. Haga clic en **Agregar Contenido** y elija un tipo de elemento de la lista:
   - **Texto** -- Encabezados, párrafos y texto enriquecido
   - **Imagen** -- Cargue o vincule a una foto
   - **Botón** -- Un enlace de llamada a la acción que se puede hacer clic
   - **Tarjeta** -- Una imagen con un título y descripción
   - **Formulario** -- Inscruste un [formulario](../forms/creating-forms) directamente en la página
   - **Calendario** -- Mostrar un calendario de eventos
   - **Preguntas Frecuentes** -- Bloques de preguntas y respuestas de estilo acordeón
   - **Video** -- Inscruste un video por URL
   - **Navegador de Grupos** -- Un directorio filtrable de todos los grupos de la iglesia con búsqueda opcional, filtro de categoría y filtro de etiqueta
3. Configure el elemento usando el panel de configuración que aparece.

### Reordenar Contenido

Arrastre secciones o elementos usando el icono de manija (seis puntos) en el lado izquierdo de cada elemento para reordenarlos. Puede arrastrar elementos dentro de una sección o moverlos entre secciones.

## Diseñar su Página

### Estilos de Sección

Haga clic en cualquier sección para abrir su panel de estilo. Puede establecer:

- **Fondo** -- Color sólido, gradiente o imagen
- **Relleno** -- Espacio superior e inferior dentro de la sección
- **Ancho** -- Ancho completo o centrado/contenido

### Estilos de Elemento

Haga clic en cualquier elemento para abrir su panel de estilo. Las opciones comunes incluyen tamaño de fuente, color, alineación, margen y relleno. Para imágenes, puede establecer texto alternativo y destinos de enlace.

### CSS Personalizado

Para estilos avanzados, cada sección y elemento tiene un campo **CSS Personalizado** donde puede escribir sus propias reglas CSS. Estas están limitadas a ese elemento, por lo que no afectarán inadvertidamente al resto de la página.

:::tip
Si necesita aplicar estilos en todo su sitio, como una fuente personalizada o color global, use la configuración de [Apariencia](appearance) en lugar de CSS personalizado en páginas individuales.
:::

## Obtener una Vista Previa de su Página

Use los controles de vista previa en la barra de herramientas para verificar cómo se ve su página en diferentes tamaños de pantalla:

- **Escritorio** -- Vista de navegador de ancho completo
- **Móvil** -- Vista de tamaño de teléfono estrecho

Haga clic en **Vista Previa** para abrir una versión en vivo de la página en una nueva pestaña del navegador, exactamente como la verán los visitantes.

## Deshacer Cambios

El editor rastrea su historial de edición automáticamente. Use los botones de la barra de herramientas o atajos de teclado para navegar:

- **Deshacer** (Ctrl+Z / Cmd+Z) -- Revertir su última acción
- **Rehacer** (Ctrl+Y / Cmd+Y) -- Volver a aplicar una acción deshecha

También puede restaurar la página a una instantánea anterior. Haga clic en **Historial** en la barra de herramientas para ver una lista de instantáneas guardadas con descripciones, y haga clic en cualquier entrada para restaurar a ese punto.

:::warning
Restaurar una instantánea reemplaza el contenido de su página actual con la versión de instantánea. Esto no se puede deshacer con el botón de deshacer estándar. Guarde una instantánea de su estado actual antes de restaurar una anterior si desea mantener la opción de volver.
:::

## Guardar y Publicar

Los cambios se guardan automáticamente a medida que trabaja. Un indicador de estado en la barra de herramientas muestra si sus cambios han sido guardados.

### Estado borrador y publicado

Las páginas pueden tener un estado **publicado**, que controla cuándo ven los visitantes sus cambios. La barra de herramientas muestra un chip de estado que indica el estado actual:

- **Publicar en Guardar** -- La página no utiliza un flujo de trabajo de publicación. Cada cambio guardado se publica inmediatamente. Este es el valor predeterminado para páginas nuevas.
- **Cambios sin Publicar** -- La página ha sido publicada antes, pero ha realizado cambios desde la última publicación. Los visitantes aún ven la versión publicada anteriormente.
- **Publicada** -- La página está activa y su contenido guardado coincide con lo que ven los visitantes.

Para publicar sus cambios, haga clic en el botón **Publicar** en la barra de herramientas. La página se publica inmediatamente.

Para revertir a la última versión publicada sin afectar lo que ven los visitantes, abra el menú de desbordamiento (⋮) y haga clic en **Descartar Cambios**.

Para desconectar completamente una página, abra el menú de desbordamiento y haga clic en **Despublicar**. Los visitantes ya no verán esa página hasta que la publique nuevamente.

:::tip
Use el flujo de trabajo borrador/publicación cuando desee preparar una página, por ejemplo, para un próximo evento, y solo hacerla activa en el momento adecuado. Construya y obtenga una vista previa de la página, luego haga clic en Publicar cuando esté listo.
:::

## Artículos Relacionados

- [Gestionar Páginas](managing-pages) -- Crear páginas, establecer URLs y administrar la navegación del sitio
- [Apariencia](appearance) -- Establecer colores, fuentes y marca de sitio
- [Archivos](files) -- Cargar imágenes y documentos para usar en el editor
- [Crear Formularios](../forms/creating-forms) -- Construir formularios que puede incrustar en páginas
