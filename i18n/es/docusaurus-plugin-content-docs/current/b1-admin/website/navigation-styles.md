---
title: "Estilos de navegación"
---

# Estilos de navegación

<div class="article-intro">

Personaliza los colores de la barra de navegación de tu sitio web de iglesia para que coincidan con tu marca. Puedes configurar colores para fondos sólidos y superposiciones transparentes, dándote control completo sobre cómo se ve tu navegación en todas las páginas.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesitas permiso para gestionar tu sitio web de iglesia. Ver [Roles y permisos](../people/roles-permissions.md) para detalles.
- Ten tus colores de marca listos, incluyendo códigos de color hexadecimales (p. ej., #03A9F4).
- Entiende la diferencia entre estilos de navegación sólidos y transparentes en tu sitio web.

</div>

## Entender modos de navegación

Tu navegación de sitio web puede aparecer en dos estilos diferentes dependiendo de la página:

- **Navegación sólida** -- Barra de navegación con color de fondo, típicamente usada en páginas de contenido
- **Navegación transparente** -- Navegación que se superpone al contenido de la página, típicamente usada en páginas con imágenes hero o fondos de pantalla completa

Puedes personalizar colores para ambos modos independientemente.

## Accediendo a estilos de navegación

1. Navega a **Sitio web** en B1 Admin
2. Haz clic en **Apariencia** en la barra lateral
3. Desplázate a la sección **Estilos de navegación**
4. Haz clic en **Editar estilos de navegación**

## Configurar navegación sólida

La navegación sólida aparece con un color de fondo detrás de la barra de navegación. Puedes personalizar:

### Color de fondo

1. Activa el interruptor **Sobrescribir** para **Color de fondo**
2. Haz clic en el selector de color
3. Elige tu color de fondo deseado
4. El predeterminado es blanco (#FFFFFF)

### Color de enlace

1. Activa el interruptor **Sobrescribir** para **Color de enlace**
2. Elige el color para el texto del enlace de navegación
3. Esto afecta los enlaces en su estado predeterminado
4. El predeterminado es gris oscuro (#555555)

### Color de hover de enlace

1. Activa el interruptor **Sobrescribir** para **Color de hover de enlace**
2. Elige el color que los enlaces cambian cuando los usuarios pasan el cursor sobre ellos
3. Esto proporciona retroalimentación visual para enlaces hacibles
4. El predeterminado es azul claro (#03A9F4)

### Color activo

1. Activa el interruptor **Sobrescribir** para **Color activo**
2. Elige el color para el enlace de página actualmente activo
3. Esto ayuda a los usuarios a saber en qué página están
4. El predeterminado es azul claro (#03A9F4)

## Configurar navegación transparente

La navegación transparente se superpone a tu contenido de página sin fondo. Puedes personalizar:

### Color de enlace

1. Activa el interruptor **Sobrescribir** para **Color de enlace**
2. Elige un color que contraste bien con tu fondo de página
3. A menudo, los colores blancos o claros funcionan mejor sobre fondos oscuros
4. El predeterminado es gris oscuro (#555555)

### Color de hover de enlace

1. Activa el interruptor **Sobrescribir** para **Color de hover de enlace**
2. Elige el color del estado de hover
3. Asegúrate de que sea visible contra tu fondo de página
4. El predeterminado es azul claro (#03A9F4)

### Color activo

1. Activa el interruptor **Sobrescribir** para **Color activo**
2. Elige el color indicador de página activa
3. Debe destacarse mientras sigue siendo apropiado para tu diseño
4. El predeterminado es azul claro (#03A9F4)

:::info
La navegación transparente no tiene configuración de color de fondo ya que se superpone directamente al contenido de la página.
:::

## Guardar tus cambios

1. Después de configurar tus colores, haz clic en **Guardar estilos de navegación**
2. Tus cambios se aplican inmediatamente a tu sitio web activo
3. Visita tu sitio web para ver la navegación en ambos modos

## Restableciendo a valores predeterminados

Si quieres volver a los colores predeterminados:

1. Desactiva los interruptores **Sobrescribir** para cualquier color personalizado
2. Haz clic en **Guardar estilos de navegación**
3. La navegación vuelve al esquema de color predeterminado

O haz clic en **Cancelar** para descartar todos los cambios sin guardar.

## Mejores prácticas

### Contraste de color

- **Legibilidad** -- Asegúrate de que los colores de enlace tengan suficiente contraste con el fondo
- **Cumplimiento de WCAG** -- Apunta a una relación de contraste de al menos 4.5:1 para accesibilidad
- **Prueba ambos modos** -- Vista previa de tu sitio con navegación sólida y transparente

### Consistencia de marca

- **Usa tus colores de marca** -- Coincide con tu logo y tema del sitio web
- **Limita tu paleta** -- Mantente con 2-3 colores para un aspecto cohesivo
- **Considera tus imágenes** -- Si usas navegación transparente, pruébala contra fondos de página típicos

### Estados de hover y activo

- **Retroalimentación clara** -- Haz que los estados de hover sean obviamente diferentes de los enlaces predeterminados
- **Distinguir páginas activas** -- Usa un color distinto para que los usuarios sepan dónde están
- **Transiciones suaves** -- El sistema anima automáticamente cambios de color

## Solución de problemas

### Los colores no se ven bien

- **Limpia tu caché** -- El almacenamiento en caché del navegador puede mostrar colores antiguos
- **Verifica códigos hexadecimales** -- Asegúrate de que ingresaste códigos de color hexadecimales válidos
- **Prueba en diferentes fondos** -- Los colores pueden verse diferentes dependiendo de la página

### Navegación no visible

- **Modo transparente** -- Si usas navegación transparente sobre imágenes claras, el texto oscuro puede ser difícil de ver
- **Solución** -- Ajusta tus colores de enlace o usa fondos de página más oscuros
- **Alternativa** -- Agrega una sombra sutil o superposición de fondo al área de navegación

## Detalles técnicos

Los estilos de navegación se almacenan como JSON y se aplican usando variables CSS:

- Los cambios tienen efecto inmediatamente sin reconstruir el sitio
- Los colores se propagan a todos los elementos de navegación
- Las sobrescrituras son opcionales; los colores no establecidos usan valores predeterminados del tema

## Artículos relacionados

- [Apariencia](./appearance.md) -- Personaliza la apariencia general de tu sitio web
- [Gestionar páginas](./managing-pages.md) -- Crea y organiza tus páginas de sitio web
- [Editor de página](./page-editor.md) -- Diseña diseños de página y contenido
