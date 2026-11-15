---
title: "Estilos de navegación"
description: "Personalice los colores de las barras de navegación sólidas y transparentes del sitio web en B1 Admin, incluidos los estados de enlace, de cursor encima y activo de su sitio de iglesia."
---

# Estilos de navegación

<div class="article-intro">

Personalice los colores de la barra de navegación del sitio web de su iglesia para que coincidan con su marca. Puede configurar colores tanto para fondos sólidos como para superposiciones transparentes, lo que le da control total sobre cómo se ve su navegación en distintas páginas.

</div>

<div class="prereqs">
<h4>Antes de empezar</h4>

- Necesita permiso para editar el contenido del sitio web. Consulte [Roles y permisos](../settings/roles-permissions.md) para más detalles.
- Tenga listos los colores de su marca, incluidos los códigos hexadecimales (por ejemplo, #03A9F4).
- Entienda la diferencia entre los estilos de navegación sólido y transparente de su sitio web.

</div>

## Entender los modos de navegación {#understanding-navigation-modes}

La navegación de su sitio web puede aparecer en dos estilos distintos según la página:

- **Navegación sólida** -- Barra de navegación con un color de fondo, normalmente usada en páginas de contenido
- **Navegación transparente** -- Navegación que se superpone al contenido de la página, normalmente usada en páginas con imágenes hero o fondos a pantalla completa

Puede personalizar los colores de ambos modos de forma independiente.

## Acceder a los estilos de navegación {#accessing-navigation-styles}

1. En B1 Admin, abra el [menú Salto](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda) y expanda **Sitio web**
2. Haga clic en **Apariencia**
3. En la lista **Configuración de estilos**, haga clic en **Navegación**

El editor de **Estilos de navegación** tiene dos tarjetas: **Encabezado (sólido)** y **Encabezado sobre el hero (transparente)**.

## Configurar la navegación sólida {#configuring-solid-navigation}

La navegación sólida aparece con un color de fondo detrás de la barra de navegación. Estas configuraciones están en la tarjeta **Encabezado (sólido)**. Cada color es opcional: mientras su interruptor **Anular** esté desactivado, la navegación mantiene los colores normales de su sitio. Puede personalizar:

### Color de fondo {#background-color}

1. Active el interruptor **Anular** de **Color de fondo**
2. Haga clic en el selector de color
3. Elija el color de fondo que desee (el selector empieza en blanco, #FFFFFF)

### Color de enlace {#link-color}

1. Active el interruptor **Anular** de **Color de enlace**
2. Elija el color del texto de los enlaces de navegación
3. Esto afecta a los enlaces en su estado normal (el selector empieza en gris oscuro, #555555)

### Color de enlace al pasar el cursor {#link-hover-color}

1. Active el interruptor **Anular** de **Color de enlace al pasar el cursor**
2. Elija el color al que cambian los enlaces cuando el usuario pasa el cursor sobre ellos
3. Esto ofrece una señal visual para los enlaces en los que se puede hacer clic (el selector empieza en azul claro, #03A9F4)

### Color activo {#active-color}

1. Active el interruptor **Anular** de **Color de enlace activo**
2. Elija el color del enlace de la página actual
3. Esto ayuda a los usuarios a saber en qué página están (el selector empieza en azul claro, #03A9F4)

## Configurar la navegación transparente {#configuring-transparent-navigation}

La navegación transparente se superpone al contenido de la página sin fondo. Estas configuraciones están en la tarjeta **Encabezado sobre el hero (transparente)**. Mientras un interruptor **Anular** esté desactivado, ese color coincide automáticamente con el color del texto de la sección hero. Puede personalizar:

### Color de enlace {#link-color-1}

1. Active el interruptor **Anular** de **Color de enlace**
2. Elija un color que contraste bien con el fondo de su página
3. A menudo, el blanco o los colores claros funcionan mejor sobre fondos oscuros

### Color de enlace al pasar el cursor {#link-hover-color-1}

1. Active el interruptor **Anular** de **Color de enlace al pasar el cursor**
2. Elija el color del estado de cursor encima
3. Asegúrese de que sea visible sobre el fondo de su página

### Color activo {#active-color-1}

1. Active el interruptor **Anular** de **Color de enlace activo**
2. Elija el color del indicador de página activa
3. Debe destacar sin dejar de encajar con su diseño

:::info
La navegación transparente no tiene una configuración de color de fondo, ya que se superpone directamente al contenido de la página.
:::

## Guardar los cambios {#saving-your-changes}

1. Después de configurar sus colores, haga clic en **Guardar navegación**
2. Sus cambios se aplican de inmediato en su sitio web en vivo
3. Visite su sitio web para ver la navegación en ambos modos

## Restablecer los valores predeterminados {#resetting-to-defaults}

Si quiere volver a los colores predeterminados:

1. Desactive los interruptores **Anular** de cualquier color personalizado
2. Haga clic en **Guardar navegación**
3. La navegación vuelve a los colores normales de su sitio (y, sobre un hero, al color de texto del hero)

O haga clic en **Cancelar** para descartar todos los cambios sin guardar.

## Buenas prácticas {#best-practices}

### Contraste de color {#color-contrast}

- **Legibilidad** -- Asegúrese de que los colores de los enlaces tengan suficiente contraste con el fondo
- **Cumplimiento de WCAG** -- Procure una relación de contraste de al menos 4.5:1 para la accesibilidad
- **Pruebe ambos modos** -- Previsualice su sitio con la navegación sólida y con la transparente

### Coherencia de marca {#brand-consistency}

- **Use los colores de su marca** -- Combínelos con su logotipo y el tema de su sitio
- **Limite su paleta** -- Use de 2 a 3 colores para un aspecto cohesivo
- **Considere sus imágenes** -- Si usa navegación transparente, pruébela sobre fondos de página típicos

### Estados de cursor encima y activo {#hover-and-active-states}

- **Respuesta visual clara** -- Haga que los estados de cursor encima sean claramente distintos de los enlaces normales
- **Distinga las páginas activas** -- Use un color distinto para que los usuarios sepan dónde están
- **Transiciones suaves** -- El sistema anima automáticamente los cambios de color

## Solución de problemas {#troubleshooting}

### Los colores no se ven bien {#colors-dont-look-right}

- **Borre la caché** -- La caché del navegador puede mostrar colores antiguos
- **Revise los códigos hexadecimales** -- Asegúrese de haber escrito códigos de color hexadecimales válidos
- **Pruebe sobre distintos fondos** -- Los colores pueden verse distintos según la página

### La navegación no es visible {#navigation-not-visible}

- **Modo transparente** -- Si usa navegación transparente sobre imágenes claras, el texto oscuro puede costar trabajo verlo
- **Solución** -- Ajuste los colores de los enlaces o use fondos de página más oscuros
- **Alternativa** -- Agregue una sombra sutil o una superposición de fondo en el área de navegación

## Detalles técnicos {#technical-details}

Los estilos de navegación se guardan como JSON y se aplican mediante variables CSS:

- Los cambios surten efecto de inmediato, sin recompilar el sitio
- Los colores se propagan a todos los elementos de navegación
- Las anulaciones son opcionales; los colores sin definir usan los valores predeterminados del tema

## Artículos relacionados {#related-articles}

- [Apariencia](./appearance.md) -- Personalice el aspecto general de su sitio web
- [Gestionar páginas](./managing-pages.md) -- Cree y organice las páginas de su sitio web
- [Editor de páginas](./page-editor.md) -- Diseñe los diseños y el contenido de las páginas
