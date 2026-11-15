---
title: "Gestionar páginas"
description: "Cree, edite y organice páginas y navegación en la vista Páginas del sitio web de B1 Admin, incluida la configuración de páginas, las redirecciones y las plantillas de sitio."
---

# Gestionar páginas

<div class="article-intro">

La vista Páginas del sitio web es su centro para crear, editar y organizar todas las páginas de su sitio web de iglesia. Puede administrar tanto el contenido de sus páginas como la navegación de su sitio desde esta única pantalla.

</div>

<div class="prereqs">
<h4>Antes de empezar</h4>

- Complete la [configuración inicial](./initial-setup.md) para configurar su dominio y los ajustes básicos del sitio
- Tenga listos su contenido y sus imágenes. Use primero el administrador de [Archivos](./files.md) para subir los recursos multimedia.
- Use una computadora o una tableta. La vista Páginas del sitio web y el editor de páginas necesitan una pantalla de al menos unos 880 píxeles de ancho; en un teléfono verá un mensaje que le pide cambiar a una pantalla más grande.

</div>

:::info
Si su iglesia tiene más de un sitio web (por ejemplo, sitios separados por campus), use el selector de sitio en la parte superior de la vista Páginas del sitio web para cambiar entre ellos. Cada sitio tiene sus propias páginas, navegación y configuración de [apariencia](./appearance.md). Consulte [Varios sitios web](#multiple-websites) más abajo.
:::

## Entender los tipos de página {#understanding-page-types}

La tabla **Páginas** enumera cada página de su sitio por **Ruta** y **Título**. Hay dos tipos de páginas:

- **Generadas** -- Páginas creadas automáticamente por el sistema a partir de los datos de su iglesia (por ejemplo, una página de Grupos, una página de Sermones o una página individual para cada sermón de su biblioteca). Estas páginas muestran una insignia **Generada** y se actualizan solas cuando cambian sus datos.
- **Personalizadas** -- Páginas que usted creó con su propio contenido y diseño.

Puede convertir cualquier página generada automáticamente en una página personalizada si quiere control total sobre su contenido y diseño. Haga clic en **Convertir** junto a la página generada y luego en **Confirmar**. Se abre el diálogo **Nueva página**; asigne a la página un título y haga clic en **Guardar**. Su nueva página personalizada toma la ruta de la página generada, y luego puede construirla en el [editor de páginas](./page-editor.md).

## Agregar y editar páginas {#adding-and-editing-pages}

1. Haga clic en el botón **Agregar página** en la parte superior derecha de la vista Páginas del sitio web.
2. Elija un tipo de página e ingrese un **Título de la página**, y luego haga clic en **Guardar**. **En blanco** inicia una página vacía; **Sermones**, **Sobre nosotros**, **Donar** y **Ubicación** completan un título sugerido para ese tipo de página; **IA** crea un primer borrador de la página a partir de una breve descripción que escriba. La ruta de la página se forma con su título (por ejemplo, "Nuestro equipo" se convierte en `/our-team`), y puede cambiarla más adelante en **Configuración de la página**.
3. Haga clic en **Editar contenido** junto a cualquier página para abrir el [editor de páginas](./page-editor.md), donde puede agregar secciones, texto, imágenes y otros elementos.
4. Haga clic en **Configuración de la página** junto a una página para actualizar el título, la ruta de URL y otros metadatos.
5. Haga clic en la ruta de una página en la columna **Ruta** para abrir la página en vivo en una nueva pestaña y ver exactamente cómo la verán los visitantes.

:::tip
Para su página de inicio, establezca la ruta de URL como solo `/`. Para todas las demás páginas, use una ruta descriptiva como `/about` o `/contact`.
:::

### Configuración de la página {#page-settings}

Abra **Configuración de la página** en cualquier página para configurar:

- **Título de la página** -- El nombre de la página.
- **Diseño** -- **Encabezado y pie de página** (la barra de navegación y el pie de página de su sitio alrededor de la página, la opción predeterminada) o **Contenido centrado limpio** (solo el contenido de la página, en una tarjeta centrada sobre un fondo gris claro, sin barra de navegación ni pie de página; útil para un formulario de registro sencillo o una página de destino).
- **Ruta de URL** -- La dirección de la página en su sitio. Haga clic en el lápiz para cambiarla y luego en **Verificar** para asegurarse de que la ruta sea válida y no esté en uso.
- **Visibilidad** -- Elija quién puede ver la página: **Todos**, **Usuarios con sesión iniciada**, **Miembros y personal**, **Solo personal**, **Miembros del equipo** o **Grupos específicos** (luego marque los grupos). Es una forma rápida de restringir una página privada (como una página de recursos para el personal) sin una contraseña aparte. Los visitantes que no han iniciado sesión ven "Esta página es para miembros de la iglesia" con un botón **Iniciar sesión**; las personas con sesión iniciada con las que la página no está compartida ven "No tiene acceso a esta página." Las páginas restringidas se excluyen de su mapa del sitio.
- **Descripción meta** -- Un breve resumen que se muestra en los resultados de los motores de búsqueda y en las vistas previas de enlaces en redes sociales. Procure unos 155 caracteres, o haga clic en **Generar con IA** para redactar uno a partir del contenido de la página.

El diálogo también tiene un botón **Duplicar**, que crea una copia de la página y de todo su contenido, y un botón **Eliminar**, que elimina la página de forma permanente.

:::tip
Para enviar una dirección antigua a una página (por ejemplo, después de renombrar `/about-us` a `/about`), agregue una redirección en **Redirecciones y analítica** en [Apariencia](./appearance.md#redirects--analytics).
:::

## Gestionar la navegación {#managing-navigation}

El panel **Navegación principal** en el lado derecho de la vista Páginas del sitio web muestra sus enlaces de navegación. Estos enlaces controlan el menú que ven los visitantes en su sitio web.

1. Haga clic en **Agregar** para crear un nuevo enlace de navegación. Puede apuntarlo a cualquier página de su sitio o a una URL externa.
2. Para reordenar los enlaces, arrástrelos y suéltelos en el orden que desee. También puede anidar enlaces debajo de un elemento padre para crear menús desplegables.
3. Haga clic en cualquier enlace para abrir su **Configuración del enlace**, donde puede cambiar su texto, su URL o su página padre.
4. Para quitar un enlace de la navegación, abra su **Configuración del enlace** y haga clic en **Eliminar**.

:::info
Quitar un enlace de navegación no elimina la página en sí. La página sigue existiendo y se puede acceder a ella directamente por su URL; simplemente no aparecerá en el menú.
:::

## Interruptores para todo el sitio {#site-wide-switches}

Debajo de los enlaces del panel **Navegación principal** hay dos interruptores que se aplican a todo su sitio web de iglesia:

- **Mostrar inicio de sesión** -- Muestra un botón **Iniciar sesión** en la barra de navegación de su sitio web.
- **Desactivar sitio web público** -- Apaga su sitio web público. Úselo si su iglesia usa B1 solo para su portal de miembros, las ofrendas y los registros, y mantiene su sitio principal en otro lugar.

### Qué hace desactivar el sitio web público {#what-disabling-the-public-website-does}

Cuando **Desactivar sitio web público** está activado:

- Cada página pública, incluida la página de inicio y sus páginas personalizadas, envía a los visitantes que no han iniciado sesión a la pantalla de inicio de sesión. Después de iniciar sesión, vuelven a la página que habían solicitado.
- Los miembros con sesión iniciada ven el sitio web completo como de costumbre, incluida su navegación y las páginas integradas **Generadas** (como Grupos y Sermones). Las páginas generadas ya no aparecen en la tabla de Páginas.
- Se indica a los motores de búsqueda que no indexen el sitio. El mapa del sitio queda vacío y `robots.txt` bloquea todo el rastreo.

Estos enlaces siguen funcionando, para que los miembros y los invitados puedan llegar a ellos:

- Iniciar y cerrar sesión
- El portal de miembros (todo lo que está bajo `/mobile`)
- Enlaces de [registro a eventos](../guides/event-registration.md) y el registro de invitados

Mientras el sitio web público está desactivado aparece una advertencia debajo del interruptor. Vuelva a desactivar el interruptor para restaurar sus páginas. Mientras el sitio está desactivado no se elimina nada.

:::info
Esta configuración se aplica a toda su iglesia. Si tiene más de un sitio, desactiva todos, no solo el seleccionado en el selector de sitios.
:::

## Consejos para organizar su sitio {#tips-for-organizing-your-site}

- Mantenga su navegación de nivel superior en cinco o seis elementos para que los visitantes encuentren las cosas rápidamente.
- Use enlaces anidados para subpáginas relacionadas (por ejemplo, un menú desplegable "Sobre nosotros" con "Nuestro equipo", "Creencias" e "Historia").
- Revise su navegación en un teléfono para asegurarse de que funcione bien en pantallas pequeñas.
- Dé a las páginas nombres claros y descriptivos que ayuden a los visitantes a entender lo que encontrarán.

:::tip
Puede agregar [formularios](../forms/creating-forms.md) a sus páginas para recopilar registros, peticiones de oración u otra información de los visitantes.
:::

## Empezar desde una plantilla de sitio {#starting-from-a-site-template}

Si construye su sitio desde cero, puede crearlo a partir de una **Plantilla de sitio** en lugar de crear las páginas una por una. Una plantilla de sitio crea un conjunto de páginas prediseñadas (inicio, sobre nosotros, conectar, dar y otras) con contenido de marcador de posición y los enlaces de navegación ya conectados.

1. En la pantalla Páginas, haga clic en el botón **Empezar desde una plantilla** (junto al botón **Agregar página**).
2. Explore las plantillas disponibles (como **Clásica**, **Moderna**, **Comunidad** y **Enfocada en visitantes**) y haga clic en una para ver sus páginas y los enlaces de navegación que agrega.
3. Cuando encuentre una que le guste, haga clic en **Crear sitio**.
4. Las páginas que todavía no existen se crean y se agregan a su navegación. Las páginas que ya tiene se marcan como **Ya existe** y se dejan como están. Luego se abre la primera página nueva para que la revise.

Después de aplicar una plantilla, abra cada página en el [editor de páginas](./page-editor.md) para reemplazar el texto de marcador de posición y las imágenes por el contenido real de su iglesia.

:::info
Una plantilla solo establece colores y fuentes en un sitio que nunca ha tenido guardada una paleta de colores. Una vez que haya elegido su propia paleta, aplicar una plantilla no modifica sus colores ni sus fuentes; esos se mantienen en [Apariencia](./appearance.md).
:::

## Varios sitios web {#multiple-websites}

Una iglesia puede tener más de un sitio web desde la misma cuenta; por ejemplo, uno por campus o un sitio aparte para una escuela.

1. En la pantalla Páginas, abra el selector de sitio (al principio muestra **Sitio web principal**) y elija **Administrar sitios web…**.
2. En el diálogo **Sitios web**, escriba un **Nombre** y un **Subdominio** (solo letras minúsculas y números; se convierte en `{subdomain}.b1.church`) y haga clic en **Agregar sitio web**.
3. Elija el nuevo sitio en el selector de sitios para construir sus páginas, su navegación, sus bloques y su apariencia.

Para eliminar un sitio, abra **Administrar sitios web…** y haga clic en **Eliminar** junto a él. Sus páginas, su navegación y su apariencia se eliminan de forma permanente, y cualquier dominio personalizado que tuviera pasa al sitio principal.

## Visor de imágenes {#image-lightbox}

Cuando los visitantes hacen clic en una imagen de su sitio web, se abre en un visor a pantalla completa. Así las personas pueden ver las fotos en un tamaño más grande sin salir de la página. No requiere configuración: el visor se activa automáticamente para las imágenes de su contenido de página.

## Próximos pasos {#next-steps}

- [Configuración inicial](./initial-setup.md) -- Instrucciones de configuración para la primera vez
- [Uso del editor de páginas](./page-editor.md) -- Aprenda a construir y dar formato al contenido de sus páginas
- [Apariencia](./appearance.md) -- Personalice el tema visual de su sitio
- [Archivos](./files.md) -- Suba y administre recursos multimedia para sus páginas
