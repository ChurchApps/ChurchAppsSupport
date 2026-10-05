---
title: "Administración de Páginas"
---

# Administración de Páginas

<div class="article-intro">

La vista Website Pages es tu centro central para crear, editar y organizar todas las páginas de tu sitio web de iglesia. Puedes administrar tanto el contenido de tu página como la navegación de tu sitio desde esta única pantalla.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Completa la [Configuración Inicial](initial-setup) para configurar tu dominio y la configuración básica del sitio
- Ten tu contenido e imágenes listos. Usa el administrador [Files](files) para cargar activos multimedia primero.

</div>

:::info
Si tu iglesia tiene más de un sitio web (por ejemplo, sitios separados por campus), usa el conmutador de sitio en la parte superior de la vista Website Pages para saltar entre ellos. Cada sitio tiene sus propias páginas, navegación y configuración de [apariencia](appearance).
:::

## Comprensión de los Tipos de Página

La tabla **Pages** enumera todas las páginas de tu sitio junto con su estado:

- **Generated** -- Páginas creadas automáticamente por el sistema basadas en los datos de tu iglesia (por ejemplo, una página Groups, una página Sermons, o una página individual para cada sermón en tu biblioteca). Estas páginas se actualizan a sí mismas a medida que tus datos cambian.
- **Custom** -- Páginas que creaste tú mismo con tu propio contenido y diseño.

Puedes convertir cualquier página generada automáticamente en una página personalizada si deseas control total sobre su contenido y diseño.

## Agregar y Editar Páginas

1. Haz clic en el botón **Add Page** en la esquina superior derecha de la tabla Pages.
2. Elige un tipo de página (blanco o plantilla) y dale un nombre.
3. Haz clic en **Edit Content** junto a cualquier página para abrir el [editor de páginas](page-editor), donde puedes agregar secciones, texto, imágenes y otros elementos.
4. Haz clic en **Page Settings** (el icono de engranaje) para actualizar el título de la página, la ruta de URL y otros metadatos.
5. Usa el botón **View live page** para abrir tu página en una nueva ventana y ver exactamente cómo se verá para los visitantes.

:::tip
Para tu página de inicio, establece la ruta de URL a solo `/`. Para todas las demás páginas, usa una ruta descriptiva como `/about` o `/contact`.
:::

### Configuración de Página

Abre **Page Settings** en cualquier página para configurar:

- **Title and URL Path** -- El nombre de la página y su dirección en tu sitio.
- **Visibility** -- Elige quién puede ver la página: todos, solo miembros, solo personal, o miembros de grupos específicos. Esta es una forma rápida de puertas una página privada (como una página de recursos del personal) sin una contraseña separada.
- **Meta Description** -- Un resumen corto mostrado en resultados de motores de búsqueda y vistas previas de enlaces de redes sociales.
- **Redirects** -- Apunta una ruta de URL antigua a esta página, para que los enlaces y marcadores a una página retirada sigan funcionando.

## Administración de la Navegación

La vista Website Pages muestra tus enlaces de navegación. Estos enlaces controlan el menú que los visitantes ven en tu sitio web.

1. Haz clic en **Add** para crear un nuevo enlace de navegación. Puedes apuntarlo a cualquier página de tu sitio o a una URL externa.
2. Para reordenar enlaces, arrastra y suelta en el orden que desees. También puedes anidar enlaces bajo un elemento padre para crear menús desplegables.
3. Haz clic en el icono **Edit** junto a cualquier enlace para cambiar su etiqueta, URL o posición.
4. Para eliminar un enlace de la navegación, haz clic en el icono **Delete**.

:::info
Eliminar un enlace de navegación no elimina la página misma. La página aún existe y puede ser accedida directamente por su URL -- simplemente no aparecerá en el menú.
:::

## Interruptores en todo el Sitio

Encima de **Main Navigation** en el lado izquierdo de la vista Website Pages hay dos interruptores que se aplican a todo tu sitio web de iglesia:

- **Show Login** -- Muestra un botón **Login** en la barra de navegación de tu sitio web.
- **Disable Public Website** -- Apaga tu sitio web público. Úsalo si tu iglesia usa B1 solo para su portal de miembros, donaciones y registros, y mantiene su sitio web principal en otro lugar.

### Qué Hace Desactivar el Sitio Web Público

Cuando **Disable Public Website** está activado:

- Cada página pública, incluyendo la página de inicio y tus páginas personalizadas, envía a los visitantes que no están registrados a la pantalla de inicio de sesión. Después de iniciar sesión, regresan a la página que pidieron.
- Los miembros registrados ven el sitio web completo como de costumbre, incluyendo tu navegación y las páginas **Generated** integradas (como Groups y Sermons). Las páginas generadas ya no aparecen en la tabla Pages.
- Se le dice a los motores de búsqueda que no indexen el sitio. El mapa del sitio está vacío y `robots.txt` bloquea todo el rastreo.

Estos enlaces siguen funcionando, para que miembros e invitados aún puedan alcanzarlos:

- Iniciar y cerrar sesión
- El portal de miembros (todo bajo `/mobile`)
- Enlaces de [Event registration](../guides/event-registration.md) y registro de invitados

Una advertencia aparece bajo el interruptor mientras el sitio web público está apagado. Apaga el interruptor de nuevo para traer tus páginas de vuelta. Nada se elimina mientras el sitio está deshabilitado.

:::info
Esta configuración se aplica a toda tu iglesia. Si tienes más de un sitio, apaga todos ellos, no solo el seleccionado en el conmutador de sitio.
:::

## Consejos para Organizar tu Sitio

- Mantén tu navegación de nivel superior a cinco o seis elementos para que los visitantes puedan encontrar cosas rápidamente.
- Usa enlaces anidados para páginas secundarias relacionadas (por ejemplo, un desplegable "About" con "Our Team," "Beliefs," e "History").
- Revisa tu navegación en dispositivo móvil haciendo clic en **Mobile Preview** para asegurarte de que funciona bien en pantallas más pequeñas.
- Dale a las páginas nombres claros y descriptivos que ayuden a los visitantes a entender qué encontrarán.

:::tip
Puedes agregar [formularios](../forms/creating-forms.md) a tus páginas para recopilar registros, solicitudes de oración u otra información de los visitantes.
:::

## Comenzar desde una Plantilla de Sitio

Si estás construyendo tu sitio desde cero, puedes arrancarlo usando una **Site Template** en lugar de crear páginas una a la vez. Una plantilla de sitio crea un conjunto de páginas preconstructidas -- home, about, connect, give, y otras -- con contenido de marcador de posición y enlaces de navegación ya conectados.

1. En la pantalla Pages, haz clic en el botón **Site Templates** (junto al botón **Add Page**).
2. Explora las plantillas disponibles y haz clic en una para obtener una vista previa de su estructura de página.
3. Cuando encuentres una que te guste, haz clic en **Apply Template**.
4. Las páginas que no existen se crean y se agregan a tu navegación. Las páginas existentes se dejan como están.

Después de aplicar una plantilla, abre cada página en el [editor de páginas](page-editor) para reemplazar el texto y las imágenes de marcador de posición con el contenido real de tu iglesia.

:::info
Las plantillas de sitio crean estructura de página y navegación. No anulan el esquema de color o las fuentes de tu sitio -- esos son controlados por [Apariencia](appearance).
:::

## Lightbox de Imagen

Cuando los visitantes hacen clic en una imagen en tu sitio web, se abre en una superposición de lightbox de pantalla completa. Esto permite que las personas vean fotos en un tamaño más grande sin salir de la página. No se requiere configuración -- el lightbox está habilitado automáticamente para imágenes en el contenido de tu página.

## Próximos Pasos

- [Configuración Inicial](initial-setup) -- Instrucciones de configuración por primera vez
- [Uso del Editor de Páginas](page-editor) -- Aprende cómo construir y estilizar el contenido de la página
- [Apariencia](appearance) -- Personaliza el tema visual de tu sitio
- [Archivos](files) -- Carga y administra activos multimedia para tus páginas
