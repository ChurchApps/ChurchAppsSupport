---
title: "Administrar páginas"
---

# Administrar páginas

<div class="article-intro">

La vista de Páginas del sitio web es tu centro central para crear, editar y organizar todas las páginas de tu sitio web de iglesia. Puedes administrar tanto el contenido de tu página como la navegación de tu sitio desde una sola pantalla.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Completa la [Configuración inicial](initial-setup) para configurar tu dominio y configuraciones básicas del sitio
- Ten tu contenido e imágenes listos. Usa el administrador de [Archivos](files) para cargar activos multimedia primero.

</div>

:::info
Si tu iglesia tiene más de un sitio web (por ejemplo, sitios separados por sede), usa el alternador de sitios en la parte superior de la vista de Páginas del sitio web para saltar entre ellos. Cada sitio tiene sus propias páginas, navegación y configuración de [Apariencia](appearance).
:::

## Entender tipos de página

La tabla **Páginas** enumera cada página de tu sitio junto con su estado:

- **Generada**: páginas que fueron creadas automáticamente por el sistema basadas en los datos de tu iglesia (por ejemplo, una página de Grupos, una página de Sermones, o una página individual para cada sermón en tu biblioteca). Estas páginas se actualizan a sí mismas a medida que tus datos cambian.
- **Personalizada**: páginas que creaste tú mismo con tu propio contenido y diseño.

Puedes convertir cualquier página generada automáticamente en una página personalizada si deseas control total sobre su contenido y diseño.

## Agregar y editar páginas

1. Haz clic en el botón **Agregar página** en la esquina superior derecha de la tabla Páginas.
2. Elige un tipo de página (en blanco o una plantilla) y dale un nombre.
3. Haz clic en **Editar contenido** junto a cualquier página para abrir el [editor de página](page-editor), donde puedes agregar secciones, texto, imágenes y otros elementos.
4. Haz clic en **Configuración de página** (el icono de engranaje) para actualizar el título de la página, ruta de URL y otros metadatos.
5. Usa el botón **Ver página en vivo** para abrir tu página en una nueva ventana y ver exactamente cómo se verá para los visitantes.

:::tip
Para tu página de inicio, establece la ruta de URL a solo `/`. Para todas las otras páginas, usa una ruta descriptiva como `/acerca-de` o `/contacto`.
:::

### Configuración de página

Abre **Configuración de página** en cualquier página para configurar:

- **Título y ruta de URL**: el nombre de la página y su dirección en tu sitio.
- **Visibilidad**: elige quién puede ver la página: todos, solo miembros, solo personal, o miembros de grupos específicos. Esta es una forma rápida de restringir una página privada (como una página de recursos del personal) sin una contraseña separada.
- **Descripción meta**: un breve resumen mostrado en resultados de motores de búsqueda y vistas previas de enlaces en redes sociales.
- **Redireccionamientos**: apunta una ruta de URL antigua a esta página, para que los enlaces y marcadores a una página retirada sigan funcionando.

## Administrar navegación

La vista de Páginas del sitio web muestra tus enlaces de navegación. Estos enlaces controlan el menú que los visitantes ven en tu sitio web.

1. Haz clic en **Agregar** para crear un nuevo enlace de navegación. Puedes apuntarlo a cualquier página en tu sitio o a una URL externa.
2. Para reordenar enlaces, arrástralos y suéltalos en el orden que desees. También puedes anidar enlaces bajo un elemento padre para crear menús desplegables.
3. Haz clic en el icono **Editar** junto a cualquier enlace para cambiar su etiqueta, URL o posición.
4. Para eliminar un enlace de la navegación, haz clic en el icono **Eliminar**.

:::info
Eliminar un enlace de navegación no elimina la página en sí. La página sigue existiendo y se puede acceder directamente por su URL, simplemente no aparecerá en el menú.
:::

## Interruptores de todo el sitio

Por encima de **Navegación principal** en el lado izquierdo de la vista de Páginas del sitio web hay dos interruptores que se aplican a todo tu sitio web de iglesia:

- **Mostrar inicio de sesión**: muestra un botón **Iniciar sesión** en la barra de navegación de tu sitio web.
- **Deshabilitar sitio web público**: desactiva tu sitio web público. Úsalo si tu iglesia usa B1 solo para su portal de miembros, donaciones y registros, y mantiene su sitio web principal en otro lugar.

### Qué hace deshabilitar el sitio web público

Cuando **Deshabilitar sitio web público** está activado:

- Cada página pública, incluyendo la página de inicio y tus páginas personalizadas, envía visitantes a la pantalla de inicio de sesión.
- Las páginas **Generadas** integradas (como Grupos y Sermones) ya no se sirven y ya no aparecen en la tabla Páginas.
- El encabezado del sitio muestra solo el botón **Iniciar sesión**, sin enlaces de navegación.
- Los motores de búsqueda se les dice que no indexen el sitio. El mapa del sitio está vacío y `robots.txt` bloquea toda exploración.

Estos enlaces siguen funcionando, para que miembros e invitados puedan seguir accediendo:

- Iniciar y cerrar sesión
- El portal de miembros (todo bajo `/mobile`)
- Enlaces de [registro de evento](../guides/event-registration.md) y registro de invitado

Una advertencia aparece bajo el interruptor mientras el sitio web público está apagado. Apaga el interruptor nuevamente para traer tus páginas de vuelta. Nada se elimina mientras el sitio está deshabilitado.

:::info
Esta configuración se aplica a toda tu iglesia. Si tienes más de un sitio, desactiva todos ellos, no solo el seleccionado en el alternador de sitios.
:::

## Consejos para organizar tu sitio

- Mantén tu navegación de nivel superior a cinco o seis elementos para que los visitantes encuentren las cosas rápidamente.
- Usa enlaces anidados para subpáginas relacionadas (por ejemplo, un desplegable "Acerca de" con "Nuestro equipo", "Creencias" e "Historia").
- Revisa tu navegación en móvil haciendo clic en **Vista previa de móvil** para asegurarte de que funciona bien en pantallas más pequeñas.
- Dale a las páginas nombres claros y descriptivos que ayuden a los visitantes a entender qué encontrarán.

:::tip
Puedes agregar [formularios](../forms/creating-forms.md) a tus páginas para recopilar registros, solicitudes de oración u otra información de visitantes.
:::

## Comenzar desde una plantilla de sitio

Si estás construyendo tu sitio desde cero, puedes iniciarlo usando una **Plantilla de sitio** en lugar de crear páginas una a la vez. Una plantilla de sitio crea un conjunto de páginas pregeneradas: inicio, acerca de, conectar, donar y otros: con contenido de marcador de posición y enlaces de navegación ya conectados.

1. En la pantalla Páginas, haz clic en el botón **Plantillas de sitio** (junto al botón **Agregar página**).
2. Examina las plantillas disponibles y haz clic en una para previsualizar su estructura de página.
3. Cuando encuentres una que te guste, haz clic en **Aplicar plantilla**.
4. Se crean las páginas que no existen y se agregan a tu navegación. Las páginas existentes se dejan tal como están.

Después de aplicar una plantilla, abre cada página en el [editor de página](page-editor) para reemplazar el texto e imágenes de marcador de posición con el contenido real de tu iglesia.

:::info
Las plantillas de sitio crean estructura de página y navegación. No anulan el esquema de color de tu sitio ni las fuentes: esos están controlados por [Apariencia](appearance).
:::

## Caja de luz de imagen

Cuando los visitantes hacen clic en una imagen en tu sitio web, se abre en una superposición de caja de luz de pantalla completa. Esto permite a las personas ver fotos en un tamaño más grande sin salir de la página. No se requiere configuración: la caja de luz se habilita automáticamente para imágenes en el contenido de tu página.

## Próximos pasos

- [Configuración inicial](initial-setup): instrucciones de configuración de primera vez
- [Usar el editor de página](page-editor): aprende cómo construir y estilizar contenido de página
- [Apariencia](appearance): personaliza el tema visual de tu sitio
- [Archivos](files): carga y administra activos multimedia para tus páginas
