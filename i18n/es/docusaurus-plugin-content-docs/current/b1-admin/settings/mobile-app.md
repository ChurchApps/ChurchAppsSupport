---
title: "Configuración de la aplicación móvil"
---

# Configuración de la aplicación móvil

<div class="article-intro">

La página de configuración de la aplicación móvil le permite configurar las pestañas de navegación que aparecen en la **experiencia móvil de B1.church (PWA)** para los miembros de su iglesia. Usted controla qué pestañas son visibles, a dónde enlazan y cómo se muestran.

</div>

## Video de capacitación

<YouTube id="ydY7WGK16fE" title="Personalización de la aplicación de miembros de su iglesia en B1" />

:::info La aplicación nativa B1 Mobile está obsoleta
Las pestañas configuradas aquí se entregan a través de la [Aplicación web progresiva (PWA) de B1.church](/docs/b1-church/getting-started/installing-pwa), que reemplazó a la aplicación nativa B1 Mobile. Comparta con sus miembros la página de instalación de su iglesia, `https://yourchurchname.b1.church/mobile/install`; allí se les guía para instalar la aplicación en su dispositivo, sin necesidad de descargarla desde App Store o Google Play.
:::

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita el permiso "Editar configuración de la iglesia". Consulte [Roles y permisos](./roles-permissions.md) si no tiene acceso.
- Configure primero la [Configuración de la iglesia](./church-settings.md), incluido el nombre de su iglesia y su identidad visual

</div>

## Acceder a la configuración de navegación

1. En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda) y expanda **Móvil**.
2. Haga clic en **Navegación** (`/mobile/navigation`).
3. La página de Navegación muestra sus pestañas actuales de la aplicación.

## Agregar una pestaña nueva {#adding-a-new-tab}

1. Haga clic en el botón **Agregar pestaña** en la parte superior de la página.
2. Complete los datos de la pestaña:
   - **Nombre**: la etiqueta que aparece en la pestaña (por ejemplo, "Sermones" o "Dar").
   - **Ícono**: haga clic en el selector de íconos para elegir un ícono para su pestaña.
   - **Imagen**: haga clic en **Seleccionar imagen** (o **Cambiar imagen**) para asignar una foto a la pestaña. Las pestañas con foto aparecen como mosaicos fotográficos en la pantalla de Inicio de la aplicación: consulte [Mosaicos de la pantalla de Inicio](#home-screen-tiles).
   - **Tipo de pestaña**: elija entre opciones como Biblia, Transmisión en vivo, Donación, Sitio web y más.
   - **URL**: escriba la dirección web a la que debe enlazar la pestaña.
   - **Visibilidad**: controle quién puede ver esta pestaña (todos, solo miembros, etc.). En una pestaña de **Directorio de miembros**, esto solo controla quién ve la pestaña; quién puede abrir el directorio se define con **Mostrar en el directorio** en la página del portal de miembros (consulte [Configuración del directorio de miembros y de mensajería](#member-directory--messaging-settings)).
3. Haga clic en **Guardar pestaña** para agregarla a su aplicación.

## Editar una pestaña existente

1. Haga clic en cualquier pestaña existente de la lista **Pestañas de la aplicación**.
2. Actualice el nombre, el ícono, la URL, el tipo o la configuración de visibilidad de la pestaña.
3. Haga clic en **Guardar pestaña** para aplicar los cambios.

## Reordenar pestañas

Puede cambiar el orden en que aparecen las pestañas en la aplicación móvil. Arrastre y suelte las pestañas en la lista para reorganizarlas. El orden que se muestra en esta página coincide con el orden que verán sus miembros en la aplicación.

:::info
Algunas pestañas pueden aparecer automáticamente cuando se cumplen ciertas condiciones; por ejemplo, una pestaña de Transmisión en vivo puede aparecer cuando hay una transmisión activa. Las pestañas agregadas manualmente le dan control total sobre lo que ven sus miembros en todo momento.
:::

:::tip
Mantenga un número razonable de pestañas. Entre tres y cinco pestañas funcionan bien para la mayoría de las iglesias. Demasiadas pestañas pueden confundir la navegación de sus miembros.
:::

## Configuración del directorio de miembros y de mensajería {#member-directory--messaging-settings}

El elemento **Portal de miembros**, en la misma sección Móvil, contiene la configuración que rige el directorio de miembros y la mensajería privada en la experiencia de B1.church:

- **Grupo de aprobación del directorio**: el grupo que revisa las actualizaciones del directorio de miembros y las [solicitudes de eliminación de cuenta](../profile/account-deletion.md) antes de que surtan efecto.
- **Mostrar en el directorio**: quién puede abrir el directorio de miembros y quién aparece en él: **Solo administradores**, **Miembros y superiores** (la opción predeterminada), **Asistentes regulares y superiores** o **Visitantes y superiores**. Las personas cuyo estado de membresía está por debajo del nivel que elija no ven el directorio y no aparecen en él. **Solo administradores** cierra el directorio para todos excepto el personal con el permiso Personas > Ver (un estado de membresía de Personal por sí solo no basta), que siempre puede abrir el directorio y ver a todos, sin importar esta configuración. Los invitados nunca se incluyen, ya que quien se registra en línea por su cuenta empieza como invitado.
- **Preferencia de visibilidad**: establece el valor predeterminado para toda la iglesia, para los miembros que todavía no han elegido su propia configuración. **Dirección**, **Número de teléfono** y **Correo electrónico** tienen cada uno su propio menú desplegable, con los mismos cinco niveles disponibles en todos los lugares donde se configura la visibilidad:
  - **Todos**: visible para cualquier persona, incluidos los visitantes anónimos
  - **Miembros**: visible solo para personas con un registro de Miembro o de Personal
  - **Solo grupos**: visible solo para personas que comparten un grupo con esta persona, además del personal
  - **Líderes de mis grupos y personal**: visible solo para los líderes de un grupo al que pertenece esta persona, además del personal
  - **Solo personal**: visible solo para el personal (cualquiera cuyo estado de membresía sea Personal, o que tenga el permiso Personas > Ver), y para la propia persona

  "Personal" en estos niveles significa cualquier persona cuyo estado de membresía sea Personal o que tenga el permiso Personas > Ver. Los cambios de grupo surten efecto de inmediato: quien se une a un grupo, o es nombrado líder de grupo, puede ver los detalles de **Solo grupos** o **Líderes de mis grupos y personal** de los miembros de ese grupo sin cerrar sesión y volver a entrar.

  Los miembros pueden cambiar estos valores predeterminados para su propio registro desde la pestaña **Privacidad** de su perfil en la PWA de B1.church. Consulte [Editar su perfil](/docs/b1-church/getting-started/me-page).
- **Edad mínima para mensajes privados**: un control de seguridad infantil. B1 no abrirá una conversación privada **nueva** cuando cualquiera de las dos personas esté por debajo de esta edad, según su fecha de nacimiento (si no hay fecha de nacimiento registrada, se usa el rol del hogar como alternativa). Las personas menores de esa edad siguen totalmente visibles en el directorio; solo se bloquea la mensajería directa, en **ambas direcciones**, para todos, incluido el personal. Las conversaciones grupales y el envío de mensajes a los padres de un menor siguen funcionando. Las opciones son Desactivada, 13, 16 o 18; el valor predeterminado es **18**. Las conversaciones existentes no se ven afectadas.

:::tip
Como la verificación de edad mínima depende de las fechas de nacimiento, asegúrese de que estén registradas para los niños de su congregación. Esta configuración pertenece a la misma familia de controles de seguridad infantil que los [controles de seguridad del registro de entrada](../attendance/checkin-safety.md).
:::

### Aviso de inicio de sesión en la pantalla de Inicio {#home-screen-sign-in-prompt}

Los visitantes que abren la [pantalla de Inicio](/docs/b1-church/getting-started/navigating#home) de la aplicación sin iniciar sesión ven un breve aviso (de forma predeterminada, *"Inicie sesión para ver sus grupos, donaciones y más."*) junto a un botón **Iniciar sesión**. La configuración de **Aviso de inicio de sesión en la pantalla de Inicio** en la misma página del portal de miembros (`/mobile/b1-mobile`) le permite cambiarlo:

- **Mostrar aviso de inicio de sesión en la pantalla de inicio de la aplicación**: desactive esta opción para ocultar tanto el aviso como el botón **Iniciar sesión** de la pantalla de Inicio. Los visitantes aún pueden iniciar sesión desde el menú de la aplicación.
- **Texto del aviso de inicio de sesión**: reemplace el texto predeterminado con su propio mensaje (hasta 150 caracteres). Déjelo en blanco para usar el texto predeterminado. Este cuadro está deshabilitado mientras el aviso esté desactivado.

Haga clic en **Guardar** para aplicar los cambios. Un mensaje **Guardado** confirma el cambio. Al guardar se actualiza la configuración en caché de la aplicación, así que el cambio se verá la próxima vez que se cargue la pantalla de Inicio.

### Mosaicos de la pantalla de Inicio {#home-screen-tiles}

Las pestañas que tienen una foto (consulte **Imagen** en [Agregar una pestaña nueva](#adding-a-new-tab)) aparecen en la [pantalla de Inicio](/docs/b1-church/getting-started/navigating#home) de la aplicación como mosaicos con foto, en una sección encabezada con el nombre de su iglesia. Esto incluye una pestaña de Versículo del día, si le asigna una foto. Las pestañas con foto también aparecen en la barra de pestañas.

La configuración de **Mosaicos de la pantalla de Inicio** en la misma página del portal de miembros (`/mobile/b1-mobile`) controla cómo se distribuyen esos mosaicos. Elija un **Diseño**:

- **Cuadrícula**: dos mosaicos por fila (la opción predeterminada). Cuando el número de mosaicos es impar, el primero ocupa todo el ancho.
- **Fila desplazable**: una sola fila de mosaicos que los miembros deslizan de lado.
- **Desplazamiento (automático)**: la misma fila lateral, pero que además se mueve sola, avanzando un mosaico aproximadamente cada cuatro segundos y volviendo al inicio al llegar al final. Se pausa mientras un miembro la toca, pasa el cursor sobre ella o navega a ella con el teclado, y se reanuda unos segundos después. En dispositivos con la opción de reducir movimiento activada, la fila permanece quieta y funciona como **Fila desplazable**.
- **Lista**: una lista con una pequeña miniatura de la foto junto al nombre de cada pestaña.

Haga clic en **Guardar** para aplicar los cambios.

### Secciones de la pantalla de Inicio {#home-screen-sections}

Los miembros que han iniciado sesión siempre ven su propio historial de asistencia y los formularios enviados en la [página Yo](/docs/b1-church/getting-started/me-page). Los interruptores de **Secciones de la pantalla de Inicio** en la misma página del portal de miembros (`/mobile/b1-mobile`) pueden mostrarlos también en la pantalla de Inicio:

- **Mostrar mi asistencia en Inicio**: agrega una sección **Mi asistencia** con el número de veces que el miembro asistió en los últimos 90 días, sus dos visitas más recientes y un enlace de **Historial** a su lista completa de asistencia.
- **Mostrar mis formularios en Inicio**: agrega una sección **Mis formularios** con los dos envíos de formularios más recientes del miembro y un enlace de **Todos los formularios**.

Ambas opciones están desactivadas de forma predeterminada. Una sección solo aparece para los miembros que han iniciado sesión y tienen al menos un registro que mostrar. Haga clic en **Guardar** para aplicar los cambios.

## Dónde aparecen estas pestañas

Las pestañas que configura aquí se muestran en la **PWA de B1.church** que sus miembros instalan desde cualquier página de `https://yourchurchname.b1.church`. Los cambios que haga en esta página se reflejan la próxima vez que un miembro abra la aplicación.

En un teléfono, la barra de pestañas inferior muestra **Inicio**, hasta tres de sus pestañas y **Más**; en una computadora, el encabezado muestra hasta cinco. Las pantallas integradas (como Sermones, Donaciones o Grupos) reciben sus espacios primero, y las pestañas de **Página interna** llenan los espacios que queden libres. Las pestañas de **URL externa** y de **Versículo del día** nunca reciben un espacio. Todas las pestañas, incluidas las que no caben, aparecen en la página **Más** de la aplicación. Consulte [Navegar por B1App](/docs/b1-church/getting-started/navigating) para ver lo que observan los miembros. (Las pestañas también se muestran en la antigua [aplicación nativa B1 Mobile](/docs/b1-mobile/) para los miembros que aún la usan, pero esa aplicación está obsoleta y ya no se actualiza.)

## Próximos pasos

- [Configuración de la iglesia](./church-settings.md): configure la información y la identidad visual de su iglesia
- [Roles y permisos](./roles-permissions.md): administre el acceso de su equipo
