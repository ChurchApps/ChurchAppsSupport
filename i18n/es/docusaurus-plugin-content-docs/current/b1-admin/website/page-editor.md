---
title: "Usar el editor de página"
---

# Usar el editor de página

<div class="article-intro">

El editor de página de B1 es un constructor visual de arrastrar y soltar que te permite diseñar las páginas de tu sitio web de iglesia sin escribir ningún código. Puedes agregar secciones y bloques de contenido, personalizar estilos, visualizar tu trabajo y deshacer cambios -- todo desde dentro de tu navegador.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Completa [Configuración inicial](initial-setup) para obtener tu sitio web configurado
- Crea al menos una página en [Gestionar páginas](managing-pages)
- Necesitas el permiso **content.edit** para acceder al editor

</div>

## Abriendo el editor

1. En B1 Admin, haz clic en **Sitio web** en el menú izquierdo.
2. Encuentra la página que quieres editar en la tabla de páginas y haz clic en **Editar**.

El editor se abre en modo de pantalla completa. El panel izquierdo muestra tu estructura de página y elementos de contenido disponibles; el área central muestra una vista previa en vivo de tu página.

:::info
El editor siempre se muestra en modo claro, independientemente de tu configuración de tema de B1 Admin. Esto asegura que la vista previa coincida con precisión con cómo se verá tu página a los visitantes del sitio web.
:::

## Estructura de página: Secciones y elementos

Cada página se construye desde dos niveles:

- **Secciones** -- Los contenedores de nivel superior que dividen tu página en bandas horizontales (por ejemplo, una sección hero, un bloque de contenido o una tira de pie de página). Cada página debe tener al menos una sección antes de que puedas agregar contenido.
- **Elementos** -- Las piezas de contenido individual colocadas dentro de una sección, como texto, imágenes, botones, tarjetas, formularios y calendarios.

### Agregar una sección

1. Haz clic en **Agregar sección** (o el botón **+** en la parte superior del panel izquierdo).
2. Elige un diseño para tu sección -- las opciones incluyen una columna, dos columnas, tres columnas y más.
3. La nueva sección aparece en la vista previa. Haz clic en ella para seleccionarla y configura su color de fondo, relleno y otras opciones de estilo.

### Agregar elementos a una sección

1. Haz clic dentro de una sección en la vista previa para seleccionarla.
2. Haz clic en **Agregar contenido** y elige un tipo de elemento de la lista:
   - **Texto** -- Títulos, párrafos y texto enriquecido
   - **Imagen** -- Carga o vincula a una foto
   - **Botón** -- Un enlace de llamada a la acción hacible
   - **Tarjeta** -- Una imagen con un título y descripción
   - **Formulario** -- Incrusta un [formulario](../forms/creating-forms) directamente en la página
   - **Calendario** -- Muestra un calendario de eventos
   - **Preguntas frecuentes** -- Bloques de pregunta y respuesta de estilo acordeón
   - **Video** -- Incrusta un video por URL
   - **Navegador de grupos** -- Un directorio filtrable de todos los grupos de iglesia con búsqueda opcional, filtro de categoría y filtro de etiqueta
3. Configura el elemento usando el panel de configuración que aparece.

### Reordenando contenido

Arrastra secciones o elementos usando el icono de manija (seis puntos) en el lado izquierdo de cada elemento para reordenarlos. Puedes arrastrar elementos dentro de una sección o moverlos entre secciones.

## Personalizar tu página

### Estilos de sección

Haz clic en cualquier sección para abrir su panel de estilo. Puedes establecer:

- **Fondo** -- Color sólido, gradiente o imagen
- **Relleno** -- Espaciado superior e inferior dentro de la sección
- **Ancho** -- Ancho completo o centrado/contenido

### Estilos de elemento

Haz clic en cualquier elemento para abrir su panel de estilo. Las opciones comunes incluyen tamaño de fuente, color, alineación, margen y relleno. Para imágenes, puedes establecer texto alternativo y destinos de enlaces.

### CSS personalizado

Para estilos avanzados, cada sección y elemento tiene un campo **CSS personalizado** donde puedes escribir tus propias reglas CSS. Estos se centran en ese elemento, por lo que no afectarán involuntariamente el resto de la página.

:::tip
Si necesitas aplicar estilos en todo tu sitio -- como una fuente personalizada o color global -- usa la configuración [Apariencia](appearance) en lugar de CSS personalizado en páginas individuales.
:::

## Visualizar tu página

Usa los controles de vista previa en la barra de herramientas para verificar cómo se ve tu página en diferentes tamaños de pantalla:

- **Escritorio** -- Vista de navegador de ancho completo
- **Móvil** -- Vista de tamaño de teléfono estrecho

Haz clic en **Vista previa** para abrir una versión activa de la página en una nueva pestaña del navegador, exactamente como la verán los visitantes.

## Deshacer cambios

El editor rastrea tu historial de edición automáticamente. Usa los botones de la barra de herramientas o atajos de teclado para navegar:

- **Deshacer** (Ctrl+Z / Cmd+Z) -- Revierte tu última acción
- **Rehacer** (Ctrl+Y / Cmd+Y) -- Vuelve a aplicar una acción deshecha

También puedes restaurar la página a una instantánea anterior. Haz clic en **Historial** en la barra de herramientas para ver una lista de instantáneas guardadas con descripciones, y haz clic en cualquier entrada para restaurar a ese punto.

:::warning
Restaurar una instantánea reemplaza el contenido de tu página actual con la versión de instantánea. Esto no se puede deshacer con el botón deshacer estándar. Guarda una instantánea de tu estado actual antes de restaurar una antigua si quieres mantener la opción de volver.
:::

## Guardar tu trabajo

Los cambios se guardan automáticamente mientras trabajas. Un indicador de estado en la barra de herramientas muestra si tus cambios han sido guardados. También puedes hacer clic en **Guardar** en cualquier momento para forzar un guardado.

## Artículos relacionados

- [Gestionar páginas](managing-pages) -- Crea páginas, establece URLs y gestiona la navegación del sitio
- [Apariencia](appearance) -- Establece colores, fuentes y marca en todo el sitio
- [Archivos](files) -- Carga imágenes y documentos para usar en el editor
- [Crear formularios](../forms/creating-forms) -- Construye formularios que puedas incrustar en páginas
