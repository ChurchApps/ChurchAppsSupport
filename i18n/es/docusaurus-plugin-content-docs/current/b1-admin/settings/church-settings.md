---
title: "Configuración de iglesia"
---

# Configuración de iglesia

<div class="article-intro">

La página de Configuración de iglesia es donde configuras la información básica de tu iglesia, detalles de contacto y marca. Estos detalles se utilizan en todas las herramientas de ChurchApps, incluyendo tu sitio web B1.church y la aplicación móvil B1.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesitas el permiso "Editar configuración de iglesia". Ver [Roles y permisos](./roles-permissions.md) si no tienes acceso.
- Ten lista la dirección de tu iglesia, información de contacto y logo

</div>

## Editar la información de tu iglesia

1. En B1 Admin, abre el [menú Saltar](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expande **Configuración**, y haz clic en **Configuración**.
2. Abre la sección **Información de iglesia** y haz clic en su icono de editar (lápiz).
3. Actualiza cualquiera de los siguientes campos:
   - **Nombre de iglesia**: el nombre mostrado en todos los productos de ChurchApps.
   - **Dirección**: la dirección física de tu iglesia.
   - **Información de contacto**: número de teléfono, correo electrónico y otros detalles de contacto.
4. Haz clic en **Guardar** para aplicar tus cambios.

## Configurar tu subdominio

Tu iglesia obtiene un subdominio gratuito en **tuiglesia.1.church**. Esta es la dirección web donde los miembros y visitantes pueden acceder a la presencia en línea de tu iglesia.

1. En la página Configuración, localiza el campo **Subdominio**.
2. Ingresa tu subdominio preferido (por ejemplo, "iglesiadelagracia" para iglesiadelagracia.1.church).
3. Guarda tus cambios.

:::info
Tu subdominio debe ser único en todas las iglesias de ChurchApps. Si tu nombre preferido está ocupado, intenta agregar tu ciudad o estado (por ejemplo, "iglesiadelagracia-madrid").
:::

Si quieres que los visitantes lleguen a tu sitio en tu propio dominio (por ejemplo, **www.iglesiadelagracia.org**), ver [Dominio personalizado](./custom-domain.md).

## Configurar marca

Personaliza cómo aparece tu iglesia en todas las herramientas de ChurchApps:

1. Sube tu **logo de iglesia** haciendo clic en el área del logo y seleccionando un archivo de imagen.
2. Agrega cualquier **imagen adicional de iglesia** utilizada en tu sitio web y [aplicación móvil](./mobile-app.md).

:::tip
Para mejores resultados, usa un logo con fondo transparente en formato PNG. Esto garantiza que se vea bien en fondos claros y oscuros.
:::

## Primer día de la semana

Elige qué día comienzan tus calendarios. El menú desplegable **Primer día de la semana** en la sección Información de iglesia tiene como predeterminado **Domingo**, pero puede establecerse en cualquier día. Una vez cambiado, se respeta en todas las cuadrículas de calendario en B1 Admin y el portal de miembros B1.church: calendarios de grupos, calendarios curados y el editor de eventos se distribuyen semanas comenzando el día que elijas.

## Región (formato de fecha y de teléfono)

La configuración **Región** controla cómo se escriben las fechas y horas en todo B1. Por defecto, las fechas usan el formato de Estados Unidos (por ejemplo, "28 de sep de 2026" y "28/9/2026"). Las iglesias fuera de EE.UU. pueden cambiar a su propio formato: por ejemplo, elegir Inglés (Reino Unido) muestra "28 Sept 2026" y "28/09/2026" en su lugar.

1. En la página Configuración, encuentra la tarjeta **Región** y haz clic para editar.
2. Elige tu región del menú desplegable **Región**. Cada opción muestra una fecha de ejemplo para que veas exactamente cómo se verán las fechas.
3. Haz clic en **Guardar**.

La tarjeta Región muestra tu región seleccionada, una muestra del **Formato de fecha** y tu formato de **Números de teléfono**.

### Formato de números de teléfono

La misma tarjeta Región tiene una configuración de **Números de teléfono** que controla cómo se ingresan los números de teléfono en el registro de una persona:

- **Internacional (con código de país)** -- el valor predeterminado. Los campos de teléfono muestran un selector de bandera de país y guardan los números con el código de país (por ejemplo, +1 918 555 1234).
- **Local (tal como se escribe)** -- los campos de teléfono se convierten en cuadros de texto simples y guardan los números exactamente como los escribes, sin agregar código de país (por ejemplo, 0701 234 5678). Elige esta opción si tu iglesia escribe los números en un formato local y no quiere que B1 agregue un código de país.

Cuando se selecciona **Local**, la tarjeta Región también muestra "Números de teléfono locales" junto a tu región.

:::tip
Los mensajes de texto funcionan mejor cuando los números incluyen el código de país. Si envías mensajes de texto desde B1, mantén el formato **Internacional**, o asegúrate de que los números que escribes en modo Local incluyan el código de país.
:::

Tu región se aplica a fechas y horas en todo B1 Admin y en tu sitio web B1.church y portal de miembros, incluyendo sermones, publicaciones de blog, calendarios de grupos y planes de servicio, para que los miembros vean fechas en el mismo formato que tu personal.

## Mensajes de texto

Conecta un proveedor de mensajes de texto para enviar mensajes SMS a una persona o a un grupo completo desde B1 Admin. Los textos se envían a través de tu propia cuenta con el proveedor, por lo que se aplican su precios y límites.

1. En la página Configuración, encuentra la tarjeta **Mensajes de texto** y haz clic para editar.
2. Elige un **Proveedor**:
   - **Clearstream**: ingresa una **Clave de API**. Crea una en la Configuración de tu cuenta de Clearstream en Claves de API.
   - **Text In Church**: ingresa una **Clave de API**. Pide primero acceso a la API de desarrollador de Text In Church Support, luego crea una clave en tu Configuración de cuenta > sección API de desarrollador.
   - **Nalo Solutions** (Ghana): ingresa la clave de autenticación de tu cuenta de Nalo Solutions como la **Clave de API**, y una **ID de remitente** (hasta 11 caracteres) que Nalo ha aprobado para ti.
3. Haz clic en **Guardar**.

Para dejar de enviar textos, establece **Proveedor** en **Ninguno** y guarda. Esto elimina el proveedor guardado.

Una vez que se conecta un proveedor, el personal con permiso para enviar textos ve un icono de texto en el encabezado de un grupo (**Enviar texto a este grupo**) y de una persona con teléfono móvil (**Enviar mensaje de texto**). Escribe tu mensaje y haz clic en **Enviar**. El diálogo cuenta caracteres y segmentos de SMS. Para un grupo, muestra cuántos miembros recibirán el texto antes de que lo envíes:

- Se omiten los miembros sin número de teléfono móvil en el archivo.
- Los miembros que eligieron **Ocúltame del directorio de miembros** se cuentan como rechazados y se omiten.
- Los miembros de la familia que comparten un número móvil reciben el texto solo una vez.

### Personalizar textos con campos de fusión

Debajo del cuadro de mensaje, el diálogo de Texto muestra fichas de marcador de posición: **Nombre**, **Apellido**, **Nombre de visualización** y **Nombre de iglesia**. Haz clic en una ficha para insertar su marcador de posición (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, o `{{churchName}}`) en tu cursor. Cuando se envía el texto, cada marcador de posición se reemplaza con los detalles del destinatario, para que un texto grupal como `Hola {{firstName}}, ¡nos vemos el domingo!` llegue a cada miembro con su propio nombre. Los marcadores de posición funcionan tanto para textos de grupo como para textos a una sola persona.

:::info
El límite de 1,600 caracteres se aplica al mensaje tal como lo escribes. Después de que se rellenan los marcadores de posición, cualquier texto más largo de 1,600 caracteres se corta en esa longitud.
:::

Los textos también pueden enviarse automáticamente desde un paso de [flujo de trabajo](../serving/workflows.md#sending-a-text) con la acción **Enviar texto**, que usa el mismo proveedor y marcadores de posición.

## Almacenamiento de archivos

Por defecto, los archivos que cargues en tu sitio web (a través de [Archivos](../website/files.md)) y otras áreas de contenido utilizan almacenamiento alojado gratuito de B1, hasta 100 MB. Si necesitas más espacio, puedes conectar tu propio almacenamiento en la nube en su lugar: las nuevas cargas van directamente a tu cuenta sin límite de plataforma.

1. En la página Configuración, encuentra la tarjeta **Almacenamiento de archivos** y haz clic para editar.
2. Elige un proveedor: **Google Drive**, **Dropbox**, **OneDrive**, o un **bucket compatible con S3** (AWS S3, Cloudflare R2, Backblaze B2, etc.).
3. Para Google Drive, Dropbox u OneDrive, haz clic en **Conectar** e inicia sesión para autorizar el acceso. Para un bucket compatible con S3, ingresa tu clave de acceso, secreto, nombre de bucket y base de URL pública.
4. Haz clic en **Guardar**.

:::info
Esto solo afecta las nuevas cargas en los Archivos de tu sitio web y áreas de contenido similares. Las imágenes de galería, miniaturas, logos y fotos de personas siempre permanecen en el almacenamiento predeterminado de B1.
:::

## Promoción de grado

Si rastrías **Grado** en niños y estudiantes, B1 puede aumentar automáticamente a todos de grado en una fecha que elijas (por ejemplo, el 1 de agosto) en lugar de requerir que edites cada perfil manualmente.

1. En la página Configuración, encuentra la opción **Promoción de grado**.
2. Enciende el interruptor (muestra **Habilitado**) y elige el **Mes** y **Día** para promover grados cada año. En esa fecha, todos los que tienen un grado suben un grado, y los estudiantes de 12º grado se convierten en **Graduados**.
3. Guarda tus cambios.

Para detener la promoción automática, apaga el interruptor para que muestre **Deshabilitado** y guarda. La fecha de promoción se elimina y los grados ya no cambiarán por su cuenta.

## Importar y exportar

El botón **Importar/Exportar** en el encabezado de Configuración abre una herramienta dedicada en una nueva ventana del navegador. Úsala para:

- Importar datos de miembros de otro sistema de gestión de iglesia.
- Exportar tus datos de ChurchApps para fines de copia de seguridad o migración.

Esto es especialmente útil cuando configuras tu iglesia por primera vez y necesitas transferir registros existentes en ChurchApps.

:::warning
Cuando importas datos, siempre haz una copia de seguridad de tus registros existentes primero. Las operaciones de importación agregan datos a tu sistema y pueden crear entradas duplicadas si se ejecutan varias veces.
:::
