---
title: "Guía: Lanza tu sitio web de la iglesia"
---

# Lanza tu sitio web de la iglesia

<div class="article-intro">

B1.church incluye un creador de sitios web completo sin costo adicional. Esta guía te explica cómo crear el sitio web de tu iglesia desde cero: configurar tu página principal, ajustar el aspecto visual, agregar páginas clave y, opcionalmente, conectar las donaciones en línea y los formularios de inscripción a eventos.

</div>

## Video de capacitación

<YouTube id="aA4UahZpmXg" title="Lanzamiento del sitio web de tu iglesia en B1" next="Edición de páginas y navegación en B1" nextUrl="/docs/b1-admin/website/page-editor" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Ten listo el logotipo de tu iglesia (el formato PNG con fondo transparente funciona mejor)
- Elige de 2 a 3 colores de marca para tu sitio
- Si vas a usar un dominio personalizado (por ejemplo, yourchurch.com), necesitas acceso al proveedor de DNS (GoDaddy, Cloudflare, etc.)
- Si quieres donaciones en línea en tu sitio, completa primero la [Configuración de donaciones en línea](../donations/online-giving-setup.md) (Stripe)

</div>

## Paso 1: Configuración inicial del sitio web

Comienza creando tu página principal y la estructura básica del sitio.

Sigue la guía [Configuración inicial del sitio web](../website/initial-setup.md) para:

1. Ir a **Sitio web** en B1 Admin
2. Crear tu página principal con una sección destacada, un mensaje de bienvenida y la información clave
3. Agregar el nombre y el lema de tu iglesia

## Paso 2: Configurar la apariencia

Define la identidad visual de tu sitio: colores, tipografías, logotipo y pie de página.

Sigue la guía [Apariencia](../website/appearance.md) para:

1. Subir el logotipo de tu iglesia
2. Establecer tus colores principal y de acento
3. Configurar la barra de navegación y el pie de página
4. Previsualizar los cambios

:::tip
Mantén la paleta de colores sencilla: un color principal y uno de acento suelen ser suficientes. El creador de sitios web se encarga del resto.
:::

## Paso 3: Agregar páginas de contenido

Crea las páginas que más necesitan tus visitantes.

Sigue la guía [Administrar páginas](../website/managing-pages.md) para crear páginas como:

- **Acerca de**: la historia de tu iglesia, sus creencias y su liderazgo
- **Sermones**: enlace a tu [biblioteca de sermones](../sermons/managing-sermons.md)
- **Eventos**: próximos eventos e inscripciones
- **Dar**: página de donaciones en línea (requiere [configuración de Stripe](../donations/online-giving-setup.md))
- **Contacto**: ubicación, horarios de servicio e información de contacto

## Paso 4: Conecta tu dominio

Si quieres usar tu propio nombre de dominio (como yourchurch.com) en lugar de la URL predeterminada de B1:

1. Ve a **Configuración** en B1 Admin y abre la sección **Dominios**
2. Ingresa tu dominio personalizado
3. Actualiza los registros DNS en tu proveedor de dominio para que apunten a B1

:::info
Los cambios de DNS pueden tardar hasta 48 horas en propagarse. Es posible que tu sitio no sea accesible desde tu dominio personalizado de inmediato. La URL predeterminada de B1 seguirá funcionando mientras tanto.
:::

## Paso 5: Agregar donaciones y formularios

Mejora tu sitio con elementos interactivos:

- **Donaciones en línea**: agrega una sección de donaciones para que los miembros puedan dar directamente desde tu sitio web. Consulta [Configuración de donaciones en línea](../donations/online-giving-setup.md) para configurar Stripe primero.
- **Formularios de inscripción**: incrusta [formularios Independientes](../forms/creating-forms.md) para inscripciones a eventos, tarjetas de visitante o solicitudes de voluntariado. Consulta [Administrar páginas](../website/managing-pages.md) para saber cómo agregar un elemento de formulario a cualquier página.

## ¡Listo!

Tu sitio web de la iglesia ya está en línea. Comparte la URL con tu congregación y en redes sociales. Puedes actualizar el contenido, agregar páginas nuevas y ajustar la apariencia en cualquier momento desde el panel de B1 Admin.

## Artículos relacionados

- [Configuración inicial del sitio web](../website/initial-setup.md): guía detallada de configuración
- [Administrar páginas](../website/managing-pages.md): agregar y editar páginas
- [Apariencia](../website/appearance.md): colores, logotipo y diseño
- [Administrar archivos](../website/files.md): subir imágenes y documentos
- [Configuración de donaciones en línea](../donations/online-giving-setup.md): configurar Stripe
- [Creación de formularios](../forms/creating-forms.md): crear formularios de inscripción y encuestas
