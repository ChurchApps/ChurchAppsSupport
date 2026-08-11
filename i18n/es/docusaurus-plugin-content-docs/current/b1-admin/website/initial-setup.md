---
title: "Configuración Inicial"
---

# Configuración Inicial

<div class="article-intro">

Cada cuenta de B1 viene con un sitio web listo para usar. Esta guía te guía a través de la configuración del dominio de tu iglesia, la configuración de la apariencia de tu sitio, la creación de tus primeras páginas y la organización de tu navegación.

</div>

<div class="prereqs">
<h4>Antes de Empezar</h4>

- Necesitas una cuenta de B1.church con acceso administrativo
- Si usas un dominio personalizado, ten listos tus datos de acceso del proveedor de DNS (por ejemplo, GoDaddy, Cloudflare o AWS)
- Prepara tu logo de iglesia en formato PNG con fondo transparente para mejores resultados

</div>

## Configurar Tu Dominio

Tu iglesia automáticamente recibe un subdominio en B1.church (por ejemplo, `tuiglesia.b1.church`). También puedes apuntar tu propio dominio personalizado a tu sitio de B1.

1. Ve a **B1.church Admin** visitando admin.b1.church o haciendo clic en tu menú desplegable de perfil y eligiendo **Cambiar Aplicación**.
2. Abre el **menú de sección** en la esquina superior izquierda (el nombre de la sección con la pequeña flecha) y elige **Configuración**.
3. Haz clic en **Administrar** para ver tu subdominio. Establécelo en algo corto y reconocible sin espacios.
4. Para usar un dominio personalizado, inicia sesión en tu proveedor de DNS (como GoDaddy, Cloudflare o AWS) y agrega dos registros:
   - Un **registro A** para tu dominio raíz que apunte a `3.23.251.61`
   - Un **registro CNAME** para `www` que apunte a `proxy.b1.church`
5. Regresa a B1.church Admin, agrega tu dominio personalizado a la lista, y haz clic en **Agregar** luego **Guardar**. Tu sitio será accesible desde tu dominio personalizado en unos pocos minutos.

:::tip
Si no ves la opción Configuración, pídele a la persona que configuró tu cuenta de iglesia que te otorgue el permiso "Editar Configuración de la Iglesia". Consulta [Roles y Permisos](../settings/roles-permissions.md) para detalles.
:::

## Crear Tu Primera Página

1. En B1 Admin, haz clic en **Sitio Web** en el menú izquierdo para abrir la vista Páginas del Sitio Web.
2. Haz clic en **Agregar Página** en la esquina superior derecha.
3. Elige **En Blanco** como el tipo de página y nómbralo "Inicio".
4. Haz clic en **Configuración de Página** y establece la ruta de URL en `/` (una barra diagonal sin texto) para tu página de inicio. Otras páginas usan `/nombre-de-página`.
5. Haz clic en **Editar Contenido** para comenzar a construir. Cada página debe comenzar con una **Sección** -- este es el contenedor para todos los demás elementos.
6. Después de agregar una sección, haz clic en **Agregar Contenido** nuevamente para insertar texto, imágenes, videos, tarjetas, formularios y más arrastrándolos a tu sección.

:::info
Para instrucciones detalladas sobre cómo trabajar con páginas y navegación, consulta [Administrar Páginas](managing-pages). Para una guía completa del editor visual, consulta [Usar el Editor de Páginas](page-editor).
:::

## Configurar Apariencia del Sitio

1. Desde la vista Páginas del Sitio Web, haz clic en la pestaña **Apariencia** en la parte superior.
2. Usa la **Paleta de Colores** para establecer los colores de tu marca para tonos primarios, secundarios y acentos.
3. En **Configuración de Tipografía**, elige tus fuentes de encabezado y cuerpo del navegador de fuentes.
4. Carga tu logo de iglesia en **Logo** en Configuración de Estilo. Proporciona una versión de fondo claro y fondo oscuro.
5. Configura tu **Pie de Página del Sitio** con la información de contacto y enlaces de tu iglesia.

:::info
Los cambios que hagas en Apariencia se aplican en todo tu sitio web. Consulta la página [Apariencia](appearance) para instrucciones detalladas sobre cada configuración.
:::

## Configurar Navegación

Tus enlaces de navegación aparecen en la vista Páginas del Sitio Web. Para organizarlos:

1. Haz clic en **Agregar** para crear un nuevo enlace de navegación e indica a cuál de tus páginas apunta.
2. Arrastra y suelta enlaces para reordenarlos o anidamientos bajo elementos principales.
3. Obtén una vista previa de tu sitio para confirmar que la navegación se ve correcta.

## Próximos Pasos

- [Administrar Páginas](managing-pages) -- Aprende cómo trabajar con páginas y navegación en detalle
- [Apariencia](appearance) -- Ajusta finamente los colores, fuentes y diseño de tu sitio
- [Archivos](files) -- Carga imágenes y documentos para tu sitio web
