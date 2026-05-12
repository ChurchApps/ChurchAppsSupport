---
title: "Estilos de Navegación"
---

# Estilos de Navegación

<div class="article-intro">

Personaliza los colores de la barra de navegación de tu sitio web de la iglesia para que coincidan con tu marca. Puedes configurar colores tanto para fondos sólidos como para superposiciones transparentes, dándote control completo sobre cómo se ve tu navegación en diferentes páginas.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Necesitas permiso para gestionar el sitio web de tu iglesia. Consulta [Roles y Permisos](../people/roles-permissions.md) para detalles.
- Ten listos los colores de tu marca, incluyendo códigos de color hexadecimales (ej., #03A9F4).
- Comprende la diferencia entre estilos de navegación sólida y transparente en tu sitio web.

</div>

## Entender los Modos de Navegación

La navegación de tu sitio web puede aparecer en dos estilos diferentes dependiendo de la página:

- **Navegación sólida** -- Barra de navegación con un color de fondo, típicamente usada en páginas de contenido
- **Navegación transparente** -- Navegación que se superpone al contenido de la página, típicamente usada en páginas con imágenes hero o fondos de pantalla completa

Puedes personalizar los colores para ambos modos independientemente.

## Acceder a los Estilos de Navegación

1. Navega a **Sitio Web** en B1 Admin
2. Haz clic en **Apariencia** en la barra lateral
3. Desplázate a la sección **Estilos de Navegación**
4. Haz clic en **Editar Estilos de Navegación**

## Configurar Navegación Sólida

La navegación sólida aparece con un color de fondo detrás de la barra de navegación. Puedes personalizar:

### Color de Fondo

1. Activa el interruptor **Anular** para **Color de Fondo**
2. Haz clic en el selector de color
3. Elige tu color de fondo deseado
4. El predeterminado es blanco (#FFFFFF)

### Color de Enlace

1. Activa el interruptor **Anular** para **Color de Enlace**
2. Elige el color para el texto de los enlaces de navegación
3. Esto afecta los enlaces en su estado predeterminado
4. El predeterminado es gris oscuro (#555555)

### Color de Enlace al Pasar el Mouse

1. Activa el interruptor **Anular** para **Color de Enlace al Pasar el Mouse**
2. Elige el color al que cambian los enlaces cuando los usuarios pasan el mouse sobre ellos
3. Esto proporciona retroalimentación visual para enlaces clicables
4. El predeterminado es azul claro (#03A9F4)

### Color Activo

1. Activa el interruptor **Anular** para **Color Activo**
2. Elige el color para el enlace de la página actualmente activa
3. Esto ayuda a los usuarios a saber en qué página están
4. El predeterminado es azul claro (#03A9F4)

## Configurar Navegación Transparente

La navegación transparente se superpone al contenido de tu página sin fondo. Puedes personalizar:

### Color de Enlace

1. Activa el interruptor **Anular** para **Color de Enlace**
2. Elige un color que contraste bien con el fondo de tu página
3. A menudo los colores blancos o claros funcionan mejor sobre fondos oscuros
4. El predeterminado es gris oscuro (#555555)

### Color de Enlace al Pasar el Mouse

1. Activa el interruptor **Anular** para **Color de Enlace al Pasar el Mouse**
2. Elige el color del estado hover
3. Asegúrate de que sea visible contra el fondo de tu página
4. El predeterminado es azul claro (#03A9F4)

### Color Activo

1. Activa el interruptor **Anular** para **Color Activo**
2. Elige el color del indicador de página activa
3. Debe destacarse mientras sigue encajando con tu diseño
4. El predeterminado es azul claro (#03A9F4)

:::info
La navegación transparente no tiene una configuración de color de fondo ya que se superpone directamente al contenido de la página.
:::

## Guardar tus Cambios

1. Después de configurar tus colores, haz clic en **Guardar Estilos de Navegación**
2. Tus cambios se aplican inmediatamente a tu sitio web en vivo
3. Visita tu sitio web para ver la navegación en ambos modos

## Restablecer a los Valores Predeterminados

Si deseas volver a los colores predeterminados:

1. Desactiva los interruptores **Anular** para cualquier color personalizado
2. Haz clic en **Guardar Estilos de Navegación**
3. La navegación vuelve al esquema de colores predeterminado

O haz clic en **Cancelar** para descartar todos los cambios sin guardar.

## Mejores Prácticas

### Contraste de Color

- **Legibilidad** -- Asegúrate de que los colores de los enlaces tengan suficiente contraste con el fondo
- **Cumplimiento WCAG** -- Apunta a al menos una relación de contraste 4.5:1 para accesibilidad
- **Prueba ambos modos** -- Previsualiza tu sitio con navegación sólida y transparente

### Consistencia de Marca

- **Usa tus colores de marca** -- Coincide con tu logotipo y tema del sitio web
- **Limita tu paleta** -- Mantente con 2-3 colores para una apariencia cohesiva
- **Considera tus imágenes** -- Si usas navegación transparente, pruébala contra fondos de página típicos

### Estados Hover y Activo

- **Retroalimentación clara** -- Haz que los estados hover sean obviamente diferentes de los enlaces predeterminados
- **Distingue páginas activas** -- Usa un color distintivo para que los usuarios sepan dónde están
- **Transiciones suaves** -- El sistema anima automáticamente los cambios de color

## Solución de Problemas

### Los Colores No Se Ven Bien

- **Limpia tu caché** -- El almacenamiento en caché del navegador puede mostrar colores antiguos
- **Verifica códigos hexadecimales** -- Asegúrate de haber ingresado códigos de color hexadecimales válidos
- **Prueba en diferentes fondos** -- Los colores pueden verse diferentes dependiendo de la página

### Navegación No Visible

- **Modo transparente** -- Si usas navegación transparente sobre imágenes claras, el texto oscuro puede ser difícil de ver
- **Solución** -- Ajusta tus colores de enlace o usa fondos de página más oscuros
- **Alternativa** -- Agrega una sombra sutil o superposición de fondo al área de navegación

## Detalles Técnicos

Los estilos de navegación se almacenan como JSON y se aplican usando variables CSS:

- Los cambios surten efecto inmediatamente sin necesidad de reconstruir el sitio
- Los colores se aplican en cascada a todos los elementos de navegación
- Las anulaciones son opcionales; los colores no configurados usan los predeterminados del tema

## Artículos Relacionados

- [Apariencia](./appearance.md) -- Personaliza la apariencia general de tu sitio web
- [Gestión de Páginas](./managing-pages.md) -- Crea y organiza las páginas de tu sitio web
- [Editor de Páginas](./page-editor.md) -- Diseña diseños y contenido de páginas
