---
title: "Configuración Inicial"
---

# Configuración Inicial

<div class="article-intro">

Cada cuenta de B1 viene con un sitio web listo para usar. Esta guía le muestra cómo configurar el dominio de su iglesia, configurar la apariencia de su sitio, crear sus primeras páginas y organizar su navegación.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Necesita una cuenta de B1.church con acceso administrativo
- Si usa un dominio personalizado, tenga listas las credenciales de acceso a su proveedor de DNS (por ejemplo, GoDaddy, Cloudflare o AWS)
- Prepare el logotipo de su iglesia en formato PNG con fondo transparente para mejores resultados

</div>

## Configurar su Dominio

Su iglesia recibe automáticamente un subdominio en B1.church (por ejemplo, `suiglesia.b1.church`). También puede apuntar su propio dominio personalizado a su sitio de B1.

1. Vaya a **B1.church Admin** visitando admin.b1.church o haciendo clic en el menú desplegable de su perfil y eligiendo **Cambiar Aplicación**.
2. Haga clic en **Panel de Control** en la barra lateral izquierda, luego seleccione **Configuración** del menú desplegable.
3. Haga clic en **Administrar** para ver su subdominio. Establézcalo como algo corto y reconocible sin espacios.
4. Para usar un dominio personalizado, inicie sesión en su proveedor de DNS (como GoDaddy, Cloudflare o AWS) y agregue dos registros:
   - Un **registro A** para su dominio raíz apuntando a `3.23.251.61`
   - Un **registro CNAME** para `www` apuntando a `proxy.b1.church`
5. Regrese a B1.church Admin, agregue su dominio personalizado a la lista y haga clic en **Agregar** y luego en **Guardar**. Su sitio será accesible desde su dominio personalizado en unos minutos.

:::tip
Si no ve la opción de Configuración, pida a la persona que configuró la cuenta de su iglesia que le otorgue el permiso "Editar Configuración de la Iglesia". Consulte [Roles y Permisos](../settings/roles-permissions.md) para más detalles.
:::

## Crear su Primera Página

1. En B1 Admin, haga clic en **Sitio Web** en el menú izquierdo para abrir la vista de Páginas del Sitio Web.
2. Haga clic en **Agregar Página** en la esquina superior derecha.
3. Elija **En Blanco** como tipo de página y nómbrela "Inicio."
4. Haga clic en **Configuración de Página** y establezca la ruta URL como `/` (una barra diagonal sin texto) para su página de inicio. Las demás páginas usan `/nombre-de-pagina`.
5. Haga clic en **Editar Contenido** para comenzar a construir. Cada página debe comenzar con una **Sección** -- este es el contenedor para todos los demás elementos.
6. Después de agregar una sección, haga clic en **Agregar Contenido** nuevamente para insertar texto, imágenes, videos, tarjetas, formularios y más arrastrándolos a su sección.

:::info
Para instrucciones detalladas sobre cómo trabajar con páginas, navegación y tipos de página, consulte [Gestión de Páginas](managing-pages).
:::

## Configurar la Apariencia del Sitio

1. Desde la vista de Páginas del Sitio Web, haga clic en la pestaña **Apariencia** en la parte superior.
2. Use la **Paleta de Colores** para establecer los colores de su marca para tonos primarios, secundarios y de acento.
3. En **Configuración de Tipografía**, elija las fuentes para encabezados y cuerpo de texto desde el explorador de fuentes.
4. Suba el logotipo de su iglesia en **Logotipo** en la Configuración de Estilo. Proporcione una versión para fondo claro y otra para fondo oscuro.
5. Configure el **Pie de Página del Sitio** con la información de contacto y los enlaces de su iglesia.

:::info
Los cambios que realice en Apariencia se aplican en todo su sitio web. Consulte la página de [Apariencia](appearance) para instrucciones detalladas sobre cada configuración.
:::

## Configurar la Navegación

Sus enlaces de navegación aparecen en la barra lateral izquierda de la vista de Páginas del Sitio Web. Para organizarlos:

1. Haga clic en **Agregar** para crear un nuevo enlace de navegación y apúntelo a una de sus páginas.
2. Arrastre y suelte los enlaces para reordenarlos o anidarlos bajo elementos padre.
3. Previsualice su sitio para confirmar que la navegación se ve correcta.

## Próximos Pasos

- [Gestión de Páginas](managing-pages) -- Aprenda a trabajar con páginas y navegación en detalle
- [Apariencia](appearance) -- Ajuste los colores, fuentes y diseño de su sitio
- [Archivos](files) -- Suba imágenes y documentos para su sitio web
