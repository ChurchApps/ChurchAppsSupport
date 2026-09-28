---
title: "Configuración de la iglesia"
---

# Configuración de la iglesia

<div class="article-intro">

La página de Configuración de la iglesia es donde configuras la información básica de tu iglesia, detalles de contacto y marca. Estos detalles se utilizan en todas las herramientas de ChurchApps, incluyendo tu sitio web de B1.church y la aplicación móvil B1.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesitas el permiso "Editar configuración de iglesia". Ver [Roles y permisos](./roles-permissions.md) si no tienes acceso.
- Ten lista la dirección de tu iglesia, información de contacto y logo

</div>

## Editar tu información de iglesia

1. En B1 Admin, abre el **menú de sección** en la esquina superior izquierda (el nombre de la sección con la pequeña flecha) y elige **Configuración**.
2. Abre la sección **Información de la iglesia** y haz clic en su icono de editar (lápiz).
3. Actualiza cualquiera de los siguientes campos:
   - **Nombre de la iglesia**: el nombre que se muestra en todos los productos de ChurchApps.
   - **Dirección**: la dirección física de tu iglesia.
   - **Información de contacto**: número de teléfono, correo electrónico y otros detalles de contacto.
4. Haz clic en **Guardar** para aplicar tus cambios.

## Configurar tu subdominio

Tu iglesia recibe un subdominio gratuito en **tuiglesia.1.church**. Esta es la dirección web donde los miembros y visitantes pueden acceder a la presencia en línea de tu iglesia.

1. En la página Configuración, ubica el campo **Subdominio**.
2. Ingresa tu subdominio preferido (por ejemplo, "iglesiagracia" para iglesiagracia.1.church).
3. Guarda tus cambios.

:::info
Tu subdominio debe ser único entre todas las iglesias de ChurchApps. Si tu nombre preferido ya está en uso, intenta agregar tu ciudad o estado (por ejemplo, "iglesiagracia-dallas").
:::

Si deseas que los visitantes accedan a tu sitio en tu propio dominio (por ejemplo, **www.iglesiagracia.org**), ver [Dominio personalizado](./custom-domain.md).

## Configurar marca

Personaliza cómo aparece tu iglesia en todas las herramientas de ChurchApps:

1. Sube tu **logo de iglesia** haciendo clic en el área del logo y seleccionando un archivo de imagen.
2. Agrega cualquier **imagen de iglesia** adicional usada en tu sitio web y [aplicación móvil](./mobile-app.md).

:::tip
Para mejores resultados, usa un logo con fondo transparente en formato PNG. Esto asegura que se vea bien tanto en fondos claros como oscuros.
:::

## Primer día de la semana

Elige qué día tus calendarios comienzan. La lista desplegable **Primer día de la semana** en la sección Información de la iglesia por defecto es **Domingo**, pero puede configurarse a cualquier día. Una vez cambiado, se respeta en todas las cuadrículas de calendario en B1 Admin y el portal de miembros de B1.church: los calendarios de grupo, calendarios seleccionados y el editor de eventos todos presentan semanas comenzando en el día que elijas.

## Almacenamiento de archivos

Por defecto, los archivos que subes a tu sitio web (a través de [Archivos](../website/files.md)) y otras áreas de contenido usan el almacenamiento alojado gratuito de B1, hasta 100MB. Si necesitas más espacio, puedes conectar tu propio almacenamiento en la nube en su lugar: las nuevas cargas van directamente a tu cuenta sin límite de plataforma.

1. En la página Configuración, encuentra la tarjeta **Almacenamiento de archivos** y haz clic para editarla.
2. Elige un proveedor: **Google Drive**, **Dropbox**, **OneDrive**, o un **depósito compatible con S3** (AWS S3, Cloudflare R2, Backblaze B2, etc.).
3. Para Google Drive, Dropbox u OneDrive, haz clic en **Conectar** e inicia sesión para autorizar el acceso. Para un depósito compatible con S3, ingresa tu clave de acceso, secreto, nombre del depósito y URL base pública.
4. Haz clic en **Guardar**.

:::info
Esto solo afecta las nuevas cargas a tus Archivos del sitio web y áreas de contenido similares. Las imágenes de galería, miniaturas, logos y fotos de persona siempre permanecen en el almacenamiento por defecto de B1.
:::

## Promoción de grado

Si rastreas **Grado** en niños y estudiantes, B1 puede automáticamente aumentar a todos un grado en una fecha que elijas (por ejemplo, 1 de agosto) en lugar de requerir que edites cada perfil manualmente.

1. En la página Configuración, encuentra la opción **Promoción de grado**.
2. Actívala y elige el **mes y día** para promover grados cada año.
3. Guarda tus cambios.

## Importar y exportar

El botón **Importar/Exportar** en el encabezado Configuración abre una herramienta dedicada en una nueva ventana del navegador. Úsala para:

- Importar datos de miembros desde otro sistema de gestión de iglesias.
- Exportar tus datos de ChurchApps para copia de seguridad o propósitos de migración.

Esto es especialmente útil cuando estás configurando tu iglesia por primera vez y necesitas transferir registros existentes a ChurchApps.

:::warning
Al importar datos, siempre respalda tus registros existentes primero. Las operaciones de importación agregan datos a tu sistema y pueden crear entradas duplicadas si se ejecutan varias veces.
:::
