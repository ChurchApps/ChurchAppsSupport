---
title: "Crear grupos"
description: "Configure un grupo nuevo en B1 Admin, desde elegir una categoría y darle un nombre hasta configurar la política de inscripción, las etiquetas, la mensajería y la configuración de asistencia."
---

# Crear grupos

<div class="article-intro">

Crear un grupo en B1 Admin es muy sencillo. Usted configurará una categoría, dará nombre a su grupo y luego configurará sus ajustes. Los grupos le ayudan a organizar su iglesia en unidades con sentido, como grupos pequeños, comités y clases.

</div>

## Video de capacitación {#training-video}

<YouTube id="uG93pXVreNo" title="Creación de grupos y adición de miembros en B1" next="Solicitudes para unirse a grupos y calendarios de grupo en B1" nextUrl="/docs/b1-admin/groups/group-join-requests" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita una cuenta activa de B1 Admin con permiso para administrar grupos. Consulte [Roles y permisos](../people/roles-permissions.md) si no está seguro de su nivel de acceso.
- Decida una estructura de categorías para sus grupos (por ejemplo, "Grupos pequeños", "Ministerios", "Comités"). Las categorías ayudan a mantener organizados los grupos relacionados.

</div>

## Añadir un grupo nuevo {#adding-a-new-group}

1. Abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda de B1 Admin), despliegue **Personas** y haga clic en **Grupos**.
2. Haga clic en **Añadir grupo** en el encabezado de la página. Se abre un formulario **Nuevo grupo** debajo de la lista. Introduzca un **Nombre de categoría**. Las categorías le ayudan a organizar juntos los grupos relacionados (por ejemplo, "Grupos pequeños", "Ministerios" o "Comités"). Si una categoría ya existe, puede seleccionarla de la lista.
3. Introduzca el **Nombre** del grupo.
4. Haga clic en **Añadir** (o en **Cancelar** para cerrar el formulario). Su nuevo grupo aparecerá en la lista, con su categoría mostrada debajo del nombre.

## Configurar los ajustes del grupo {#configuring-group-settings}

Una vez creado el grupo, puede completar más detalles:

1. Haga clic en el **nombre del grupo** en la lista para abrirlo.
2. Haga clic en el botón **Editar** en el lado izquierdo de la página del grupo, debajo de sus detalles. Se abre el formulario **Detalles del grupo**.
3. Configure las siguientes opciones:
   - **Nombre de categoría** y **Nombre del grupo**: cambie la categoría del grupo o renómbrelo.
   - **Horario de reunión** y **Lugar de reunión**: cuándo y dónde se reúne normalmente el grupo (por ejemplo, "Miércoles a las 7 PM" en "Salón 204").
   - **Descripción**: un breve resumen de lo que trata el grupo, escrito en el editor de formato. Es visible para los miembros.
   - **Foto**: haga clic en el recuadro de la foto o en **Añadir foto** para elegir o subir una imagen para el grupo.
   - **Slug**: el nombre clave corto que se usa en la dirección web del grupo en el sitio de su iglesia.
   - **Etiquetas**: asigne una o más etiquetas descriptivas al grupo (por ejemplo, "Presencial", "En línea", "Se dan la bienvenida a nuevos miembros"). Las etiquetas son términos libres que usted define; marque todas las que correspondan, o haga clic en **Añadir nueva etiqueta** para crear una. Las etiquetas pueden usarse para filtrar grupos en el elemento Buscador de grupos del sitio web, y un elemento Lista de grupos del sitio web puede mostrar solo los grupos que tienen una etiqueta.
   - **Campus**: el campus al que pertenece el grupo, si su iglesia tiene más de uno.
   - **Inscripción**: elija quién puede unirse a este grupo:
     - **Abierto (los miembros pueden unirse de inmediato)**: cualquiera puede unirse sin aprobación
     - **Solicitar unirse (requiere aprobación del líder)**: las personas deben enviar una solicitud de ingreso que requiere aprobación (consulte [Solicitudes para unirse a grupos](./group-join-requests.md))
     - **Cerrado (solo añadir por administrador)**: los miembros deben añadirse manualmente por los líderes o administradores
   - **Debates**: activa o desactiva el feed de chat del grupo, donde cualquier miembro puede publicar. Activado (**Sí**) por defecto.
   - **Anuncios**: activa un segundo feed de chat, solo para líderes: los miembros pueden leer y reaccionar, pero solo los líderes pueden publicar. Activado (**Sí**) por defecto.
   - **Mostrar lista de miembros en el sitio web**: configúrelo en **Sí** para mostrar los miembros del grupo en su página del sitio web de la iglesia.
   - **Grupo confidencial**: oculta este grupo y su lista de miembros de las páginas públicas, del buscador de grupos y de quienes no son miembros. Úselo para grupos sensibles como ministerios de recuperación o consejería; solo los miembros del grupo y el personal de la iglesia pueden verlo.
4. Para clases y salas infantiles, el formulario también tiene estas secciones:
   - **Edad y grado**: **Edad mínima** y **Edad máxima** (en años y meses) y **Grado mínimo** y **Grado máximo**, que se usan para sugerir la sala correcta en el registro de entrada. Déjelos en blanco (o en **Sin límite**) si no hay límite. Consulte [Seguridad en el registro de entrada](../attendance/checkin-safety.md#age-and-grade-room-guidance).
   - **Capacidad de registro de entrada**: **Capacidad**, **Capacidad de invitados**, **Niños por voluntario**, **Voluntarios mínimos** y **Cerrado para registro de entrada**. Consulte [Seguridad en el registro de entrada](../attendance/checkin-safety.md#room-capacity-and-closing-a-room).
   - **Asistencia**: **Registrar asistencia** (configúrelo en **Sí** para registrar la [asistencia](../attendance/tracking-attendance.md) de este grupo), **Correos de recordatorio de asistencia** (recuerda a los líderes del grupo cuando uno de los eventos del calendario del grupo se realizó ayer pero no se registró asistencia), **Recogida por padres** e **Imprimir credencial** (opciones de registro de entrada para grupos infantiles).
   - **Horarios de servicio (opcional)**: elija un horario de servicio en **Añadir horario de servicio** y haga clic en el botón de más para asociar el grupo a él; haga clic en el icono de eliminar junto a un horario de servicio para quitarlo. Consulte [Configuración de asistencia](../attendance/setup.md) para más detalles sobre los horarios de servicio.
5. Haga clic en **Guardar** para aplicar los cambios, o en **Cancelar** para cerrar el formulario sin guardar.

El lado izquierdo de la página del grupo muestra la categoría, el horario y lugar de reunión, la descripción, las etiquetas y los horarios de servicio del grupo, además de marcas de verificación para **Registrar asistencia**, **Imprimir credencial**, **Recogida por padres**, **Debates** y **Anuncios**, para que pueda ver de un vistazo cuáles están activados.

:::tip
Añadir una descripción clara y un horario de reunión ayuda a los miembros a saber qué esperar al unirse a un grupo.
:::

:::info
Desactivar tanto Debates como Anuncios elimina por completo la pestaña Mensajes del grupo en el portal de miembros. Si desactiva solo uno, se oculta su pestaña y los miembros pasan al feed que siga activo. Los mensajes existentes se conservan en cualquier caso; los interruptores solo controlan las nuevas publicaciones.
:::

## Duplicar un grupo {#duplicating-a-group}

¿Va a iniciar una nueva sesión de una clase o ministerio recurrente? En lugar de volver a introducir toda la configuración, duplique un grupo existente:

1. Abra el grupo y haga clic en **Duplicar** (debajo del botón **Editar** en el lado izquierdo de la página del grupo).
2. Confirme la duplicación.

La copia conserva la configuración del original —categoría, descripción, foto, horario y lugar de reunión, inscripción, etiquetas, campus, feeds de chat, confidencialidad, límites de edad y grado, capacidad de registro de entrada y opciones de asistencia—, pero **no** sus miembros ni sus horarios de servicio. El nuevo grupo se abre de inmediato; se llama igual que el original con " (Copia)" añadido, así que cámbiele el nombre desde la configuración del grupo.

## Archivar un grupo {#archiving-a-group}

Cuando un grupo ya no está activo pero desea conservar su historial en lugar de eliminarlo:

1. Abra el grupo y haga clic en **Editar** para editar su configuración.
2. Haga clic en **Archivar** y confirme.

Los grupos archivados dejan de aparecer en la lista principal de Grupos. Para volver a encontrarlo, haga clic en el botón **Mostrar archivados** junto a los botones de categoría en la parte superior de la página de Grupos, luego haga clic en **Restaurar** junto al grupo y confirme para devolverlo.

:::info
Archivar un grupo no elimina sus miembros, su historial de asistencia ni sus eventos del calendario; solo oculta el grupo de la lista predeterminada hasta que lo restaure.
:::

## Eliminar un grupo {#deleting-a-group}

Para eliminar un grupo de forma permanente, ábralo, haga clic en **Editar**, haga clic en **Eliminar** al final del formulario **Detalles del grupo** y confirme. Eliminar no se puede deshacer; si puede necesitar el historial del grupo más adelante, [archívelo](#archiving-a-group) en su lugar.

## Próximos pasos {#next-steps}

Después de crear y configurar su grupo, estará listo para:

- **Añadir miembros**: busque personas y añádalas al grupo. Use el icono de estrella (**Hacer líder**) para designar a los líderes del grupo. Consulte [Miembros del grupo](./group-members.md).
- **Configurar un calendario**: cree eventos y reuniones recurrentes para el grupo. Consulte [Calendario del grupo](./group-calendar.md).
- **Comunicarse**: envíe correo electrónico, mensajes de texto o notificaciones push a los miembros del grupo desde la página del grupo. Consulte [Miembros del grupo](./group-members.md#emailing-group-members).
- **Exportar datos**: haga clic en **Exportar** encima de la lista de miembros del grupo para descargarla. Para descargar la lista completa de grupos, haga clic en **Exportar** en el encabezado de la página de Grupos.

:::info
Cada grupo pertenece a una categoría, y la página principal de Grupos le permite filtrar la lista por categoría. Siempre puede reorganizar o renombrar las categorías a medida que su iglesia crece.
:::
