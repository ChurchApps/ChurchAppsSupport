---
title: "Configuración Inicial"
---

# Configuración Inicial

<div class="article-intro">

Cada cuenta B1 viene con un sitio web listo para usar. Esta guía te acompaña en la configuración del dominio de tu iglesia, la configuración de la apariencia de tu sitio, la creación de tus primeras páginas y la organización de tu navegación.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Necesitas una cuenta B1.church con acceso administrativo
- Si usas un dominio personalizado, ten las credenciales de inicio de sesión de tu proveedor DNS listas (por ejemplo, GoDaddy, Cloudflare o AWS)
- Prepara tu logo de iglesia en formato PNG con un fondo transparente para obtener los mejores resultados

</div>

## Configuración de tu Dominio

Tu iglesia recibe automáticamente un subdominio en B1.church (por ejemplo, `iglesia.b1.church`). También puedes apuntar tu propio dominio personalizado a tu sitio B1.

1. Ve a **B1.church Admin** visitando admin.b1.church o haciendo clic en tu menú desplegable de perfil y eligiendo **Switch App**.
2. Abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda), expande **Settings** y haz clic en **Settings**.
3. Abre la sección **Church Information** para ver tu subdominio. Establécelo en algo corto y reconocible sin espacios.
4. Para usar un dominio personalizado, inicia sesión en tu proveedor DNS (como GoDaddy, Cloudflare o AWS) y agrega dos registros:
   - Un **A record** para tu dominio raíz apuntando a `3.23.251.61`
   - Un **CNAME record** para `www` apuntando a `proxy.b1.church`
5. Vuelve a B1.church Admin, agrega tu dominio personalizado a la lista y haz clic en **Add** y luego **Save**. Tu sitio será accesible desde tu dominio personalizado en unos pocos minutos.

:::tip
Si no ves la opción Settings, pídele a la persona que configuró tu cuenta de iglesia que te otorgue el permiso "Edit Church Settings". Consulta [Roles y Permisos](../settings/roles-permissions.md) para obtener detalles.
:::

## Creación de tu Primera Página

1. En B1 Admin, abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda), expande **Website** y haz clic en **Pages**.
2. Haz clic en **Add Page** en la esquina superior derecha.
3. Elige **Blank** como tipo de página y nómbrala "Home".
4. Haz clic en **Page Settings** y establece la ruta de URL a `/` (una barra invertida sin texto) para tu página de inicio. Otras páginas usan `/nombre-página`.
5. Haz clic en **Edit Content** para comenzar a construir. Cada página debe comenzar con una **Section** -- este es el contenedor para todos los demás elementos.
6. Después de agregar una sección, haz clic en **Add Content** nuevamente para insertar texto, imágenes, videos, tarjetas, formularios y más arrastrándolos a tu sección.

:::info
Para obtener instrucciones detalladas sobre cómo trabajar con páginas y navegación, consulta [Administración de Páginas](managing-pages). Para una guía completa del editor visual, consulta [Uso del Editor de Páginas](page-editor).
:::

## Configuración de la Apariencia del Sitio

1. En el menú Jump, elige **Website > Appearance**.
2. Usa la **Color Palette** para establecer tus colores de marca para tonos primarios, secundarios y de acento.
3. Bajo **Typography Settings**, elige tus fuentes de encabezado y cuerpo del navegador de fuentes.
4. Carga tu logo de iglesia bajo **Logo** en Style Settings. Proporciona tanto una versión de fondo claro como de fondo oscuro.
5. Configura tu **Site Footer** con la información de contacto de tu iglesia y enlaces.

:::info
Los cambios que hagas en Appearance se aplican en todo tu sitio web. Consulta la página [Apariencia](appearance) para obtener instrucciones detalladas sobre cada configuración.
:::

## Configuración de la Navegación

Tus enlaces de navegación aparecen en la vista Website Pages. Para organizarlos:

1. Haz clic en **Add** para crear un nuevo enlace de navegación y apuntarlo a una de tus páginas.
2. Arrastra y suelta enlaces para reordenarlos o anidarlos bajo elementos padres.
3. Vista previa de tu sitio para confirmar que la navegación se vea correcta.

## Próximos Pasos

- [Administración de Páginas](managing-pages) -- Aprende cómo trabajar con páginas y navegación en detalle
- [Apariencia](appearance) -- Ajusta finamente los colores, fuentes y diseño de tu sitio
- [Archivos](files) -- Carga imágenes y documentos para tu sitio web
