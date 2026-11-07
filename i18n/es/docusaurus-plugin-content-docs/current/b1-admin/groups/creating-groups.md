---
title: "Creación de grupos"
description: "Crea un grupo nuevo en B1 Admin, desde elegir una categoría y un nombre hasta configurar la política de acceso, etiquetas, mensajes y asistencia."
---

# Creación de grupos

<div class="article-intro">

Crear un grupo en B1 Admin es sencillo. Usted configurará una categoría, dará nombre a su grupo y luego configurará sus opciones. Los grupos le ayudan a organizar su iglesia en unidades significativas, como grupos pequeños, comités y clases.

</div>

## Video de capacitación

<YouTube id="uG93pXVreNo" title="Creación de grupos y adición de miembros en B1" next="Solicitudes para unirse a grupos y calendarios de grupos en B1" nextUrl="/docs/b1-admin/groups/group-join-requests" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita una cuenta activa de B1 Admin con permiso para administrar grupos. Consulte [Roles y permisos](../people/roles-permissions.md) si no está seguro de su nivel de acceso.
- Decida una estructura de categorías para sus grupos (por ejemplo, "Grupos pequeños", "Ministerios", "Comités"). Las categorías ayudan a mantener organizados los grupos relacionados.

</div>

## Agregar un nuevo grupo

1. Abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda de B1 Admin), expanda **Personas** y haga clic en **Grupos**.
2. Haga clic en **Agregar grupo** en el encabezado de la página. Se abre un formulario de **Nuevo grupo** debajo de la lista. Escriba un **Nombre de categoría**. Las categorías le ayudan a organizar juntos los grupos relacionados (por ejemplo, "Grupos pequeños", "Ministerios" o "Comités"). Si la categoría ya existe, puede seleccionarla de la lista.
3. Escriba el **Nombre** del grupo.
4. Haga clic en **Agregar**. Su nuevo grupo aparecerá en la lista, con su categoría mostrada debajo de su nombre.

## Configurar las opciones del grupo

Una vez creado el grupo, puede completar más detalles:

1. Haga clic en el **nombre del grupo** en la lista para abrirlo.
2. Haga clic en el botón **Editar** del lado izquierdo de la página del grupo, debajo de sus detalles.
3. Configure las siguientes opciones:
   - **Descripción** -- Un breve resumen de lo que trata el grupo. Es visible para los miembros.
   - **Horarios de reunión** -- Cuándo se reúne habitualmente el grupo (por ejemplo, "Miércoles a las 7 p. m.").
   - **Política de ingreso** -- Elija quién puede unirse a este grupo:
     - **Abierto** -- Cualquiera puede unirse de inmediato sin aprobación
     - **Solicitud** -- Las personas deben enviar una solicitud de ingreso que requiere aprobación (consulte [Solicitudes para unirse a grupos](./group-join-requests.md))
     - **Cerrado** -- Los miembros deben ser agregados manualmente por líderes o administradores
   - **Etiquetas** -- Asigne una o más etiquetas descriptivas al grupo (por ejemplo, "Presencial", "En línea", "Se dan la bienvenida a nuevos miembros"). Las etiquetas son términos libres que usted define; marque todas las que apliquen. Las etiquetas pueden usarse para filtrar grupos en el elemento Explorador de grupos del sitio web.
   - **Grupo confidencial** -- Oculta este grupo y su lista de las páginas públicas, del buscador de grupos y de quienes no son miembros. Úselo para grupos sensibles como ministerios de recuperación o consejería; solo los miembros del grupo y el personal de la iglesia pueden verlo.
   - **Discusiones** -- Activa o desactiva el feed de chat del grupo, donde cualquier miembro puede publicar. Activado por defecto.
   - **Anuncios** -- Activa un segundo feed de chat solo para líderes: los miembros pueden leer y reaccionar, pero solo los líderes pueden publicar. Activado por defecto.
   - **Registro de asistencia** -- Actívelo si desea registrar la [asistencia](../attendance/tracking-attendance.md) de este grupo.
   - **Horarios de servicio** -- Asocie el grupo con horarios de servicio específicos de la iglesia, si aplica. Consulte [Configuración de asistencia](../attendance/setup.md) para más detalles sobre los horarios de servicio.
4. Haga clic en **Guardar** para aplicar los cambios.

:::tip
Agregar una descripción clara y un horario de reunión ayuda a los miembros a saber qué esperar al unirse a un grupo.
:::

:::info
Desactivar tanto Discusiones como Anuncios elimina por completo la pestaña de Mensajes del grupo en el portal de miembros. Si desactiva solo una, se oculta su pestaña; los miembros pasan al feed que sigue activo. Los mensajes existentes se conservan en cualquier caso: las opciones solo controlan las nuevas publicaciones.
:::

## Duplicar un grupo

¿Va a iniciar una nueva temporada de una clase o ministerio recurrente? En lugar de volver a ingresar todas las opciones, duplique un grupo existente:

1. Abra el grupo y haga clic en **Duplicar** (debajo del botón **Editar**, del lado izquierdo de la página del grupo).
2. Confirme la duplicación.

La copia conserva las opciones del original -- categoría, descripción, horario o ubicación de la reunión, política de ingreso, etiquetas y campus -- pero **no** sus miembros. El nuevo grupo lleva el nombre del original con " (Copia)" al final; cámbiele el nombre desde las opciones del grupo.

## Archivar un grupo

Cuando un grupo ya no está activo pero desea conservar su historial en lugar de eliminarlo:

1. Abra el grupo y haga clic en **Editar** para modificar sus opciones.
2. Haga clic en **Archivar** y confirme.

Los grupos archivados dejan de aparecer en la lista principal de Grupos. Para volver a encontrarlo, haga clic en el botón **Mostrar archivados** junto a los botones de categoría en la parte superior de la página de Grupos, y luego haga clic en **Restaurar** junto al grupo para devolverlo.

:::info
Archivar un grupo no elimina a sus miembros, su historial de asistencia ni sus eventos del calendario; solo oculta el grupo de la lista predeterminada hasta que lo restaure.
:::

## Próximos pasos

Después de crear y configurar su grupo, puede:

- **Agregar miembros** -- Busque personas y agréguelas al grupo. Use el ícono de estrella (**Hacer líder**) para designar líderes del grupo. Consulte [Miembros del grupo](./group-members.md).
- **Configurar un calendario** -- Cree eventos y reuniones recurrentes para el grupo. Consulte [Calendario del grupo](./group-calendar.md).
- **Comunicarse** -- Envíe mensajes a todos los miembros del grupo directamente desde la página del grupo.
- **Exportar datos** -- Haga clic en **Exportar** encima de la lista de miembros del grupo para descargarla.

:::info
Cada grupo pertenece a una categoría, y la página principal de Grupos le permite filtrar la lista por categoría. Siempre puede reorganizar o renombrar las categorías conforme crezca su iglesia.
:::
