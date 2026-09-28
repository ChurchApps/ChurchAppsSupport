---
title: "Configuración inicial"
---

# Configuración inicial

<div class="article-intro">

Cada cuenta de B1 viene con un sitio web listo para usar. Esta guía te lleva a través de la configuración del dominio de tu iglesia, configurar la apariencia de tu sitio, crear tus primeras páginas y organizar tu navegación.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesitas una cuenta de B1.church con acceso administrativo
- Si usas un dominio personalizado, ten tus credenciales de inicio de sesión del proveedor de DNS listos (p. ej., GoDaddy, Cloudflare o AWS)
- Prepara tu logo de iglesia en formato PNG con fondo transparente para mejores resultados

</div>

## Configurar tu dominio

Tu iglesia automáticamente recibe un subdominio en B1.church (por ejemplo, `tuiglesia.b1.church`). También puedes apuntar tu propio dominio personalizado a tu sitio B1.

1. Ve a **B1.church Admin** visitando admin.b1.church o haciendo clic en tu menú desplegable de perfil y eligiendo **Cambiar aplicación**.
2. Abre el **menú de sección** en la esquina superior izquierda (el nombre de la sección con la pequeña flecha) y elige **Configuración**.
3. Abre la sección **Información de la iglesia** para ver tu subdominio. Establécelo en algo corto y reconocible sin espacios.
4. Para usar un dominio personalizado, inicia sesión en tu proveedor de DNS (como GoDaddy, Cloudflare o AWS) y agrega dos registros:
   - Un **registro A** para tu dominio raíz apuntando a `3.23.251.61`
   - Un **registro CNAME** para `www` apuntando a `proxy.b1.church`
5. Vuelve a B1.church Admin, agrega tu dominio personalizado a la lista y haz clic en **Agregar** luego **Guardar**. Tu sitio será accesible desde tu dominio personalizado en unos minutos.

:::tip
Si no ves la opción Configuración, pide a la persona que configuró tu cuenta de iglesia que te otorgue el permiso "Editar configuración de iglesia". Ver [Roles y permisos](../settings/roles-permissions.md) para detalles.
:::

## Crear tu primera página

1. En B1 Admin, haz clic en **Sitio web** en el menú izquierdo para abrir la vista de Páginas del sitio web.
2. Haz clic en **Agregar página** en la esquina superior derecha.
3. Elige **En blanco** como tipo de página y nómbrala "Inicio".
4. Haz clic en **Configuración de página** y establece la ruta de URL a `/` (una barra diagonal sin texto) para tu página de inicio. Otras páginas usan `/nombre-de-página`.
5. Haz clic en **Editar contenido** para comenzar a construir. Cada página debe comenzar con una **Sección**: este es el contenedor para todos los otros elementos.
6. Después de agregar una sección, haz clic en **Agregar contenido** nuevamente para insertar texto, imágenes, videos, tarjetas, formularios y más arrastrándolos en tu sección.

:::info
Para instrucciones detalladas sobre trabajar con páginas y navegación, ver [Administrar páginas](managing-pages). Para una guía completa del editor visual, ver [Usar el editor de página](page-editor).
:::

## Configurar la apariencia del sitio

1. Desde la vista de Páginas del sitio web, haz clic en la pestaña **Apariencia** en la parte superior.
2. Usa la **Paleta de colores** para establecer tus colores de marca para tonos primarios, secundarios y de acento.
3. En **Configuración de tipografía**, elige tus fuentes de encabezado y cuerpo del navegador de fuentes.
4. Carga tu logo de iglesia en **Logo** en la Configuración de estilo. Proporciona tanto una versión de fondo claro como oscuro.
5. Configura tu **Pie de página del sitio** con la información de contacto de tu iglesia y enlaces.

:::info
Los cambios que realices en Apariencia se aplican en todo tu sitio web. Ver la página [Apariencia](appearance) para instrucciones detalladas en cada configuración.
:::

## Configurar navegación

Tus enlaces de navegación aparecen en la vista de Páginas del sitio web. Para organizarlos:

1. Haz clic en **Agregar** para crear un nuevo enlace de navegación y apuntarlo a una de tus páginas.
2. Arrastra y suelta enlaces para reordenarlos o anidalos bajo elementos padre.
3. Previsualiza tu sitio para confirmar que la navegación se vea correcta.

## Próximos pasos

- [Administrar páginas](managing-pages): aprende cómo trabajar con páginas y navegación en detalle
- [Apariencia](appearance): ajusta los colores, fuentes y diseño de tu sitio
- [Archivos](files): carga imágenes y documentos para tu sitio web
