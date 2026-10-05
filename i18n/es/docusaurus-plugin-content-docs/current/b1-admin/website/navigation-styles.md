---
title: "Estilos de Navegación"
---

# Estilos de Navegación

<div class="article-intro">

Personaliza los colores de la barra de navegación de tu sitio web de iglesia para que coincidan con tu marca. Puedes configurar colores para fondos sólidos y superposiciones transparentes, dándote control completo sobre cómo se ve tu navegación en diferentes páginas.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Necesitas permiso para administrar tu sitio web de iglesia. Consulta [Roles y Permisos](../people/roles-permissions.md) para obtener detalles.
- Ten tus colores de marca listos, incluyendo códigos de color hexadecimal (por ejemplo, #03A9F4).
- Comprende la diferencia entre estilos de navegación sólida y transparente en tu sitio web.

</div>

## Comprensión de los Modos de Navegación

Tu navegación del sitio web puede aparecer en dos estilos diferentes según la página:

- **Solid navigation** -- Barra de navegación con un color de fondo, típicamente usada en páginas de contenido
- **Transparent navigation** -- Navegación que se superpone al contenido de la página, típicamente usada en páginas con imágenes de héroe o fondos de pantalla completa

Puedes personalizar colores para ambos modos independientemente.

## Acceso a Estilos de Navegación

1. En B1 Admin, abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda) y expande **Website**
2. Haz clic en **Appearance**
3. Desplázate a la sección **Navigation Styles**
4. Haz clic en **Edit Navigation Styles**

## Configuración de Navegación Sólida

La navegación sólida aparece con un color de fondo detrás de la barra de navegación. Puedes personalizar:

### Color de Fondo

1. Alterna el interruptor **Override** para **Background Color**
2. Haz clic en el selector de color
3. Elige tu color de fondo deseado
4. El predeterminado es blanco (#FFFFFF)

### Color de Enlace

1. Alterna el interruptor **Override** para **Link Color**
2. Elige el color del texto del enlace de navegación
3. Esto afecta los enlaces en su estado predeterminado
4. El predeterminado es gris oscuro (#555555)

### Color de Pausa de Enlace

1. Alterna el interruptor **Override** para **Link Hover Color**
2. Elige el color que cambian los enlaces cuando los usuarios pasan por encima
3. Esto proporciona retroalimentación visual para enlaces clicables
4. El predeterminado es azul claro (#03A9F4)

### Color Activo

1. Alterna el interruptor **Override** para **Active Color**
2. Elige el color para el enlace de página actualmente activo
3. Esto ayuda a los usuarios a saber en qué página están
4. El predeterminado es azul claro (#03A9F4)

## Configuración de Navegación Transparente

La navegación transparente se superpone al contenido de tu página sin fondo. Puedes personalizar:

### Color de Enlace

1. Alterna el interruptor **Override** para **Link Color**
2. Elige un color que contraste bien con el fondo de tu página
3. A menudo, los colores blancos o claros funcionan mejor sobre fondos oscuros
4. El predeterminado es gris oscuro (#555555)

### Color de Pausa de Enlace

1. Alterna el interruptor **Override** para **Link Hover Color**
2. Elige el color del estado de pausa
3. Asegúrate de que sea visible contra el fondo de tu página
4. El predeterminado es azul claro (#03A9F4)

### Color Activo

1. Alterna el interruptor **Override** para **Active Color**
2. Elige el color del indicador de página activa
3. Debe destacarse mientras se ajusta a tu diseño
4. El predeterminado es azul claro (#03A9F4)

:::info
La navegación transparente no tiene una configuración de color de fondo ya que se superpone al contenido de la página directamente.
:::

## Guardando tus Cambios

1. Después de configurar tus colores, haz clic en **Save Navigation Styles**
2. Tus cambios se aplican inmediatamente a tu sitio web en vivo
3. Visita tu sitio web para ver la navegación en ambos modos

## Restablecimiento a Valores Predeterminados

Si deseas volver a los colores predeterminados:

1. Desactiva los interruptores **Override** para cualquier color personalizado
2. Haz clic en **Save Navigation Styles**
3. La navegación vuelve al esquema de color predeterminado

O haz clic en **Cancel** para descartar todos los cambios sin guardar.

## Mejores Prácticas

### Contraste de Color

- **Readability** -- Asegúrate de que los colores de los enlaces tengan suficiente contraste con el fondo
- **WCAG compliance** -- Apunta a una relación de contraste de al menos 4.5:1 para accesibilidad
- **Test both modes** -- Vista previa de tu sitio con navegación sólida y transparente

### Consistencia de Marca

- **Use your brand colors** -- Coincide con tu logo y tema del sitio web
- **Limit your palette** -- Mantente a 2-3 colores para una apariencia coherente
- **Consider your images** -- Si usas navegación transparente, pruébala contra fondos de página típicos

### Estados de Pausa y Activos

- **Clear feedback** -- Haz que los estados de pausa sean obviamente diferentes de los enlaces predeterminados
- **Distinguish active pages** -- Usa un color distintivo para que los usuarios sepan dónde están
- **Smooth transitions** -- El sistema anima automáticamente los cambios de color

## Solución de Problemas

### Los Colores no se Ven Bien

- **Clear your cache** -- El almacenamiento en caché del navegador puede mostrar colores antiguos
- **Check hex codes** -- Asegúrate de haber ingresado códigos de color hexadecimal válidos
- **Test on different backgrounds** -- Los colores pueden verse diferentes según la página

### Navegación No Visible

- **Transparent mode** -- Si usas navegación transparente sobre imágenes claras, el texto oscuro puede ser difícil de ver
- **Solution** -- Ajusta tus colores de enlace o usa fondos de página más oscuros
- **Alternative** -- Agrega una sombra sutil o una superposición de fondo al área de navegación

## Detalles Técnicos

Los estilos de navegación se almacenan como JSON y se aplican usando variables CSS:

- Los cambios surten efecto inmediatamente sin reconstruir el sitio
- Los colores se propagan a todos los elementos de navegación
- Los overrides son opcionales; los colores no establecidos usan valores predeterminados del tema

## Artículos Relacionados

- [Apariencia](./appearance.md) -- Personaliza la apariencia general de tu sitio web
- [Administración de Páginas](./managing-pages.md) -- Crea y organiza tus páginas web
- [Editor de Páginas](./page-editor.md) -- Diseña diseños y contenido de página
