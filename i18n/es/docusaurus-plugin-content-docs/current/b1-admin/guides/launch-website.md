---
title: "Guía: Lanzar el sitio web de tu iglesia"
---

# Lanzar el sitio web de tu iglesia

<div class="article-intro">

B1.church incluye un constructor de sitios web completo sin costo adicional. Esta guía te lleva paso a paso a través de la creación del sitio web de tu iglesia desde cero — configurar tu página de inicio, definir la apariencia, agregar páginas clave y, opcionalmente, conectar donaciones en línea y formularios de registro de eventos.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Ten listo el logotipo de tu iglesia (PNG con fondo transparente funciona mejor)
- Elige 2-3 colores de marca para tu sitio
- Si usas un dominio personalizado (por ejemplo, tuiglesia.com), ten acceso a tu proveedor de DNS (GoDaddy, Cloudflare, etc.)
- Si quieres donaciones en línea en tu sitio, completa primero la [Configuración de donaciones en línea](../donations/online-giving-setup.md) (Stripe)

</div>

## Paso 1: Configuración inicial del sitio web

Comienza creando tu página de inicio y la estructura básica del sitio.

Sigue la guía [Configuración inicial del sitio web](../website/initial-setup.md) para:

1. Navegar a **Sitio web** en B1 Admin
2. Crear tu página de inicio con una sección principal, mensaje de bienvenida e información clave
3. Agregar el nombre de tu iglesia y eslogan

## Paso 2: Configurar la apariencia

Define la identidad visual de tu sitio — colores, fuentes, logotipo y pie de página.

Sigue la guía [Apariencia](../website/appearance.md) para:

1. Subir el logotipo de tu iglesia
2. Configurar tus colores primarios y de acento
3. Configurar la barra de navegación y el pie de página
4. Previsualizar tus cambios

:::tip
Mantén tu paleta de colores simple — un color primario más un color de acento suele ser suficiente. El constructor de sitios web se encargará del resto.
:::

## Paso 3: Agregar páginas de contenido

Desarrolla las páginas que tus visitantes más necesitan.

Sigue la guía [Gestionar páginas](../website/managing-pages.md) para crear páginas como:

- **Acerca de** — La historia, creencias y liderazgo de tu iglesia
- **Sermones** — Enlace a tu [biblioteca de sermones](../sermons/managing-sermons.md)
- **Eventos** — Próximos eventos y registro
- **Donar** — Página de donaciones en línea (requiere [configuración de Stripe](../donations/online-giving-setup.md))
- **Contacto** — Ubicación, horarios de servicio e información de contacto

## Paso 4: Conectar tu dominio

Si deseas usar tu propio nombre de dominio (como tuiglesia.com) en lugar de la URL predeterminada de B1:

1. Ve a **Sitio web > Configuración** en B1 Admin
2. Ingresa tu dominio personalizado
3. Actualiza tus registros DNS en tu proveedor de dominio para que apunten a B1

:::info
Los cambios de DNS pueden tardar hasta 48 horas en propagarse. Es posible que tu sitio no sea accesible desde tu dominio personalizado de inmediato. La URL predeterminada de B1 seguirá funcionando durante este tiempo.
:::

## Paso 5: Agregar donaciones y formularios

Mejora tu sitio con elementos interactivos:

- **Donaciones en línea** — Agrega una sección de donaciones para que los miembros puedan donar directamente desde tu sitio web. Consulta [Configuración de donaciones en línea](../donations/online-giving-setup.md) para configurar Stripe primero.
- **Formularios de registro** — Inserta [formularios independientes](../forms/creating-forms.md) para inscripciones a eventos, tarjetas de visitantes o solicitudes de voluntarios. Consulta [Gestionar páginas](../website/managing-pages.md) para saber cómo agregar un elemento de formulario a cualquier página.

## ¡Listo!

El sitio web de tu iglesia está en línea. Comparte la URL con tu congregación y en las redes sociales. Puedes actualizar el contenido, agregar nuevas páginas y ajustar la apariencia en cualquier momento desde el panel de B1 Admin.

## Artículos relacionados

- [Configuración inicial del sitio web](../website/initial-setup.md) — tutorial detallado de configuración
- [Gestionar páginas](../website/managing-pages.md) — agregar y editar páginas
- [Apariencia](../website/appearance.md) — colores, logotipo y diseño
- [Gestionar archivos](../website/files.md) — subir imágenes y documentos
- [Configuración de donaciones en línea](../donations/online-giving-setup.md) — configurar Stripe
- [Crear formularios](../forms/creating-forms.md) — crear formularios de registro y encuestas
