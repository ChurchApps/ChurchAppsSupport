---
title: "Guía: lanzar el sitio web de su iglesia"
description: "Configure un sitio web de iglesia en B1 Admin: cree su página de inicio, ajuste los colores y el logotipo, añada páginas clave, conecte un dominio personalizado y añada formularios de donación."
---

# Lanzar el sitio web de su iglesia

<div class="article-intro">

B1.church incluye un creador de sitios web completo sin costo adicional. Esta guía le explica cómo crear el sitio web de su iglesia desde cero: configurar su página de inicio, ajustar su aspecto, añadir páginas clave y, opcionalmente, conectar los formularios de donación en línea y de registro a eventos.

</div>

## Video de capacitación {#training-video}

<YouTube id="aA4UahZpmXg" title="Lanzamiento del sitio web de su iglesia en B1" next="Edición de páginas y navegación en B1" nextUrl="/docs/b1-admin/website/page-editor" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Tenga listo el logotipo de su iglesia (PNG con fondo transparente funciona mejor)
- Elija de 2 a 3 colores de marca para su sitio
- Si usa un dominio personalizado (por ejemplo, ssutuiglesia.com), tenga acceso a su proveedor de DNS (GoDaddy, Cloudflare, etc.)
- Si quiere donaciones en línea en su sitio, complete primero la [Configuración de donación en línea](../donations/online-giving-setup.md) (Stripe)

</div>

## Paso 1: configuración inicial del sitio web {#step-1-initial-website-setup}

Comience creando su página de inicio y la estructura básica del sitio.

Siga la guía de [Configuración inicial del sitio web](../website/initial-setup.md) para:

1. En el [menú Jump](../introduction.md#getting-around-with-the-jump-menu), elija **Sitio web > Páginas**
2. Haga clic en **Añadir página**, elija **En blanco**, introduzca "Inicio" como **Título de la página** y haga clic en **Guardar**. En **Configuración de la página**, establezca la **Ruta URL** en `/`
3. Haga clic en **Editar contenido**, añada una **Sección** y luego añada su encabezado principal, mensaje de bienvenida, nombre y lema de la iglesia, y otra información clave

:::tip
¿Empieza desde cero? Una [Plantilla de sitio](../website/managing-pages.md#starting-from-a-site-template) crea un conjunto de páginas listas (inicio, nosotros, conecta, da y otras) con los enlaces de navegación ya configurados; reemplace el contenido de ejemplo por el suyo.
:::

## Paso 2: configurar la apariencia {#step-2-configure-appearance}

Defina la identidad visual de su sitio: colores, tipografías, logotipo y pie de página.

Siga la guía de [Apariencia](../website/appearance.md) para:

1. En el menú Jump, elija **Sitio web > Apariencia**
2. En **Logotipo**, suba un **Logotipo para fondo claro** y un **Logotipo para fondo oscuro**
3. En **Paleta de colores**, configure los colores de su marca y haga clic en **Guardar paleta**, luego elija sus **Tipografías**
4. Use **Navegación** para dar estilo a la barra de navegación y **Pie de página del sitio** para crear el pie que aparece en todas las páginas

:::tip
Mantenga su paleta de colores sencilla: normalmente basta con un color principal y un color de acento. El creador de sitios web se encarga del resto.
:::

## Paso 3: añadir páginas de contenido {#step-3-add-content-pages}

Cree las páginas que más necesitan sus visitantes.

Siga la guía de [Administrar páginas](../website/managing-pages.md) para crear páginas como:

- **Nosotros**: la historia, las creencias y el liderazgo de su iglesia
- **Sermones**: enlace a su [biblioteca de sermones](../sermons/managing-sermons.md)
- **Eventos**: próximos eventos e inscripciones
- **Dar**: página de donaciones en línea (requiere [configuración de Stripe](../donations/online-giving-setup.md))
- **Contacto**: ubicación, horarios de servicio e información de contacto

## Paso 4: conectar su dominio {#step-4-connect-your-domain}

Si quiere usar su propio nombre de dominio (como sutuiglesia.com) en lugar de la URL predeterminada de B1:

Siga la guía de [Dominio personalizado](../settings/custom-domain.md) para:

1. En su proveedor de dominio, añada un registro **CNAME** para `www` que apunte a `proxy.b1.church` (o un registro **A** para su dominio raíz que apunte a `3.23.251.61`)
2. En el menú Jump, elija **Configuración > Configuración**, haga clic en **Editar** en la sección **Dominios**, escriba su dominio y haga clic en **Guardar**

:::info
Configure primero el DNS: B1 guarda el dominio de inmediato, pero no mostrará su sitio (ni obtendrá su certificado SSL) hasta que el DNS apunte a B1. Los cambios de DNS pueden tardar de unos minutos a unas horas. La URL predeterminada de B1 seguirá funcionando todo el tiempo.
:::

## Paso 5: añadir donaciones y formularios {#step-5-add-giving-and-forms}

Enriquezca su sitio con elementos interactivos:

- **Donación en línea**: añada un elemento **Donación** para que los miembros puedan donar directamente desde su sitio web. Consulte [Configuración de donación en línea](../donations/online-giving-setup.md) para configurar Stripe primero.
- **Formularios de registro**: inserte [formularios Independientes](../forms/creating-forms.md) para inscripciones a eventos, tarjetas de visitantes o solicitudes de voluntarios con el elemento **Formulario**. Consulte el [Editor de páginas](../website/page-editor.md) para saber cómo añadir elementos a cualquier página.

## ¡Listo! {#youre-done}

El sitio web de su iglesia ya está activo. Comparta la URL con su congregación y en las redes sociales. Puede actualizar el contenido, añadir páginas nuevas y ajustar la apariencia en cualquier momento desde la sección **Sitio web** de B1 Admin.

## Artículos relacionados {#related-articles}

- [Configuración inicial del sitio web](../website/initial-setup.md): recorrido detallado de la configuración
- [Administrar páginas](../website/managing-pages.md): añada y edite páginas
- [Apariencia](../website/appearance.md): colores, logotipo y diseño
- [Editor de páginas](../website/page-editor.md): añada secciones, textos, imágenes, formularios y donaciones
- [Dominio personalizado](../settings/custom-domain.md): use su propia dirección web
- [Administrar archivos](../website/files.md): suba imágenes y documentos
- [Configuración de donación en línea](../donations/online-giving-setup.md): configure Stripe
- [Crear formularios](../forms/creating-forms.md): cree formularios de registro y encuestas
