---
title: "Crear grupos"
---

# Crear grupos

<div class="article-intro">

Crear un grupo en B1 Admin es sencillo. Configurará una categoría, dará nombre a su grupo y luego configurará sus opciones. Los grupos le ayudan a organizar su iglesia en unidades significativas como grupos pequeños, comités y clases.

</div>

## Video de capacitación

<YouTube id="uG93pXVreNo" title="Creating Groups and Adding Members in B1" next="Group Join Requests and Group Calendars in B1" nextUrl="/docs/b1-admin/groups/group-join-requests" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita una cuenta activa de B1 Admin con permiso para administrar grupos. Consulte [Roles y permisos](../people/roles-permissions.md) si no está seguro de su nivel de acceso.
- Decida una estructura de categorías para sus grupos (por ejemplo, "Grupos pequeños", "Ministerios", "Comités"). Las categorías ayudan a mantener los grupos relacionados organizados.

</div>

## Agregar un grupo nuevo

1. Abra el [menú de salto](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda de B1 Admin), despliegue **Personas** y haga clic en **Grupos**.
2. Haga clic en **Agregar grupo** en el encabezado de la página. Se abre un formulario **Nuevo grupo** debajo de la lista. Escriba un **Nombre de categoría**. Las categorías le ayudan a organizar grupos relacionados (por ejemplo, "Grupos pequeños", "Ministerios" o "Comités"). Si una categoría ya existe, puede seleccionarla de la lista.
3. Escriba el **Nombre** del grupo.
4. Haga clic en **Agregar**. Su nuevo grupo aparecerá en la lista, con su categoría mostrada debajo de su nombre.

## Configurar las opciones del grupo

Una vez creado su grupo, puede completar más detalles:

1. Haga clic en el **nombre del grupo** en la lista para abrirlo.
2. Haga clic en el botón **Editar** del lado izquierdo de la página del grupo, debajo de los detalles del grupo.
3. Configure las siguientes opciones:
   - **Descripción**: un breve resumen de lo que trata el grupo. Es visible para los miembros.
   - **Horarios de reunión**: cuándo se reúne normalmente el grupo (por ejemplo, "Miércoles a las 7 p. m.").
   - **Política de inscripción**: elija quién puede unirse a este grupo:
     - **Abierta**: cualquiera puede unirse de inmediato, sin aprobación
     - **Solicitud**: las personas deben enviar una solicitud de ingreso que requiere aprobación (consulte [Solicitudes de ingreso a grupos](./group-join-requests.md))
     - **Cerrada**: los líderes o administradores deben agregar a los miembros manualmente
   - **Etiquetas**: asigne una o más etiquetas descriptivas al grupo (por ejemplo, "Presencial", "En línea", "Se dan la bienvenida a nuevos miembros"). Las etiquetas son términos libres que usted define; marque todas las que apliquen. Las etiquetas pueden usarse para filtrar grupos en el elemento de sitio web Explorador de grupos.
   - **Grupo confidencial**: oculta este grupo y su lista de miembros de las páginas públicas, del buscador de grupos y de quienes no son miembros. Úselo para grupos sensibles como ministerios de recuperación o consejería; solo los miembros del grupo y el personal de la iglesia pueden verlo.
   - **Discusiones**: activa o desactiva el feed de chat del grupo, donde cualquier miembro puede publicar. Activado por defecto.
   - **Anuncios**: activa un segundo feed de chat solo para líderes: los miembros pueden leer y reaccionar, pero solo los líderes pueden publicar. Activado por defecto.
   - **Seguimiento de asistencia**: actívelo si desea registrar la [asistencia](../attendance/tracking-attendance.md) de este grupo.
   - **Horarios de servicio**: asocie el grupo con horarios de servicio específicos de la iglesia, si aplica. Consulte [Configuración de asistencia](../attendance/setup.md) para más detalles sobre horarios de servicio.
4. Haga clic en **Guardar** para aplicar sus cambios.

:::tip
Agregar una descripción clara y un horario de reunión ayuda a los miembros a saber qué esperar al unirse a un grupo.
:::

:::info
Desactivar tanto Discusiones como Anuncios elimina por completo la pestaña Mensajes del grupo en el portal de miembros. Si desactiva solo una, se oculta su pestaña y los miembros pasan al feed que siga activo. Los mensajes existentes se conservan en cualquier caso: las opciones solo controlan las nuevas publicaciones.
:::

## Duplicar un grupo

¿Va a iniciar una nueva temporada de una clase o ministerio recurrente? En lugar de volver a ingresar todas las opciones, duplique un grupo existente:

1. Abra el grupo y haga clic en **Duplicar** (debajo del botón **Editar** del lado izquierdo de la página del grupo).
2. Confirme la duplicación.

La copia conserva la configuración original (categoría, descripción, horario y lugar de reunión, política de inscripción, etiquetas y campus), pero **no** sus miembros. El nuevo grupo se llama igual que el original con " (Copia)" agregado; cámbiele el nombre desde la configuración del grupo.

## Archivar un grupo

Cuando un grupo ya no está activo pero desea conservar su historial en lugar de eliminarlo:

1. Abra el grupo y haga clic en **Editar** para modificar su configuración.
2. Haga clic en **Archivar** y confirme.

Los grupos archivados desaparecen de la lista principal de Grupos. Para volver a encontrar uno, haga clic en el botón **Mostrar archivados** junto a los botones de categoría en la parte superior de la página Grupos, y luego en **Restaurar** junto al grupo para volver a activarlo.

:::info
Archivar un grupo no elimina sus miembros, su historial de asistencia ni sus eventos del calendario; solo oculta el grupo de la lista predeterminada hasta que lo restaure.
:::

## Siguientes pasos

Después de crear y configurar su grupo, está listo para:

- **Agregar miembros**: busque personas y agréguelas al grupo. Use el icono de estrella (**Hacer líder**) para designar líderes del grupo. Consulte [Miembros del grupo](./group-members.md).
- **Configurar un calendario**: cree eventos y reuniones recurrentes para el grupo. Consulte [Calendario del grupo](./group-calendar.md).
- **Comunicarse**: envíe mensajes a todos los miembros del grupo directamente desde la página del grupo.
- **Exportar datos**: haga clic en **Exportar** sobre la lista de miembros del grupo para descargarla.

:::info
Cada grupo pertenece a una categoría, y la página principal de Grupos le permite filtrar la lista por categoría. Siempre puede reordenar o renombrar las categorías a medida que su iglesia crezca.
:::
