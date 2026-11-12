---
title: "Primeros pasos con su sitio web de B1 Admin"
sidebar_label: "Configuración inicial"
description: "Configure el sitio web de su iglesia en B1 Admin: apunte un subdominio o un dominio personalizado, cree su página de inicio, elija los colores de marca y el logotipo, y construya la navegación."
---

# Configuración inicial

<div class="article-intro">

Cada cuenta de B1 incluye un sitio web listo para usar. Esta guía le acompaña en la configuración del dominio de su iglesia, la personalización de la apariencia de su sitio, la creación de sus primeras páginas y la organización de su navegación.

</div>

<div class="prereqs">
<h4>Antes de empezar</h4>

- Necesita una cuenta de B1.church con acceso de administrador
- Si usa un dominio personalizado, tenga a mano las credenciales de inicio de sesión de su proveedor de DNS (por ejemplo, GoDaddy, Cloudflare o AWS)
- Prepare el logotipo de su iglesia en formato PNG con fondo transparente para obtener mejores resultados

</div>

## Configurar su dominio {#setting-up-your-domain}

Su iglesia recibe automáticamente un subdominio en B1.church (por ejemplo, `yourchurch.b1.church`). También puede apuntar su propio dominio personalizado a su sitio B1.

1. Vaya a **B1.church Admin** visitando admin.b1.church o haciendo clic en el menú desplegable de su perfil y eligiendo **Cambiar aplicación**.
2. Abra el [menú Salto](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expanda **Configuración** y haga clic en **Configuración**.
3. Abra la sección **Información de la iglesia** para ver su subdominio. Configúrelo con algo corto y reconocible, sin espacios.
4. Para usar un dominio personalizado, inicie sesión en su proveedor de DNS (como GoDaddy, Cloudflare o AWS) y agregue dos registros:
   - Un **registro A** para su dominio raíz que apunte a `3.23.251.61`
   - Un **registro CNAME** para `www` que apunte a `proxy.b1.church`
5. Regrese a B1.church Admin, abra la sección **Dominios** en la misma página de Configuración, agregue su dominio personalizado a la lista y haga clic en **Agregar** y luego en **Guardar**. Su sitio será accesible desde su dominio personalizado en unos pocos minutos.

:::tip
Si no ve la opción de Configuración, pida a la persona que configuró la cuenta de su iglesia que le conceda el permiso "Editar configuración de la iglesia". Consulte [Roles y permisos](../settings/roles-permissions.md) para más detalles.
:::

## Crear su primera página {#creating-your-first-page}

1. En B1 Admin, abra el [menú Salto](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expanda **Sitio web** y haga clic en **Páginas**.
2. Haga clic en **Agregar página** en la esquina superior derecha.
3. Elija **En blanco** como tipo de página, escriba "Inicio" como **Título de la página** y haga clic en **Guardar**.
4. Haga clic en **Configuración de la página** en la fila de la nueva página y cambie la **Ruta de URL** a `/` (una barra diagonal sin texto) para su página de inicio. Las demás páginas usan `/page-name`.
5. Haga clic en **Editar contenido** para empezar a construir. Cada página debe comenzar con una **Sección**: es el contenedor de todos los demás elementos. Haga clic en **Agregar contenido** y arrastre **Sección** a la página, y luego elija un diseño de sección ya preparado o una **Sección en blanco**.
6. Después de agregar una sección, haga clic de nuevo en **Agregar contenido** para insertar texto, imágenes, videos, tarjetas, formularios y más, arrastrándolos a su sección.

:::info
Para instrucciones detalladas sobre cómo trabajar con páginas y navegación, consulte [Gestionar páginas](./managing-pages.md). Para una guía completa del editor visual, consulte [Uso del editor de páginas](./page-editor.md).
:::

## Configurar la apariencia del sitio {#configuring-site-appearance}

1. En el menú Salto, elija **Sitio web > Apariencia**.
2. Use la **Paleta de colores** para establecer los colores de su marca -- los tonos base claro, de acento y oscuro, además de los colores de los botones primario y secundario -- y luego haga clic en **Guardar paleta**.
3. En **Fuentes**, elija las fuentes de encabezado y de cuerpo desde el explorador de fuentes y haga clic en **Guardar fuentes**.
4. Suba el logotipo de su iglesia en **Logotipo** dentro de la Configuración de estilos. Proporcione una versión para fondo claro y otra para fondo oscuro, y luego haga clic en **Guardar cambios**.
5. Haga clic en **Pie de página del sitio** para abrir el pie de página en el editor de bloques y agregue los datos de contacto y los enlaces de su iglesia.

:::info
Los cambios que haga en Apariencia se aplican a todo su sitio web. Consulte la página de [Apariencia](./appearance.md) para ver instrucciones detalladas de cada opción.
:::

## Configurar la navegación {#setting-up-navigation}

Sus enlaces de navegación aparecen en la vista de Páginas del sitio web. Para organizarlos:

1. En el panel **Navegación principal**, haga clic en **Agregar**, escriba el **Texto del enlace** y la ruta de la página (por ejemplo, `/about`) como **URL**, y haga clic en **Guardar**.
2. Arrastre y suelte los enlaces para reordenarlos o anidarlos debajo de elementos padre.
3. Previsualice su sitio para confirmar que la navegación se ve correctamente.

## Próximos pasos {#next-steps}

- [Gestionar páginas](./managing-pages.md) -- Aprenda a trabajar con páginas y navegación en detalle
- [Apariencia](./appearance.md) -- Afine los colores, las fuentes y el diseño de su sitio
- [Archivos](./files.md) -- Suba imágenes y documentos para su sitio web
