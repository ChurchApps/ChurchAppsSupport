---
title: "Creación de grupos"
description: "Cree un grupo nuevo en B1 Admin, desde elegir una categoría y un nombre hasta configurar la política de ingreso, las etiquetas, los mensajes y la asistencia."
---

# Creación de grupos

<div class="article-intro">

Crear un grupo en B1 Admin es sencillo. Usted configurará una categoría, dará nombre a su grupo y luego ajustará sus opciones. Los grupos le ayudan a organizar su iglesia en unidades significativas, como grupos pequeños, comités y clases.

</div>

## Video de capacitación

<YouTube id="uG93pXVreNo" title="Creación de grupos y adición de miembros en B1" next="Solicitudes para unirse a grupos y calendarios de grupos en B1" nextUrl="/docs/b1-admin/groups/group-join-requests" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita una cuenta activa de B1 Admin con permiso para administrar grupos. Consulte [Roles y permisos](../people/roles-permissions.md) si no está seguro de su nivel de acceso.
- Decida una estructura de categorías para sus grupos (por ejemplo, "Grupos pequeños", "Ministerios", "Comités"). Las categorías ayudan a mantener organizados los grupos relacionados.

</div>

## Agregar un nuevo grupo

1. Abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda de B1 Admin), expanda **People** y haga clic en **Groups**.
2. Haga clic en **Add Group** en el encabezado de la página. Se abre un formulario **New Group** debajo de la lista. Escriba un **Category Name**. Las categorías le ayudan a organizar juntos los grupos relacionados (por ejemplo, "Grupos pequeños", "Ministerios" o "Comités"). Si la categoría ya existe, puede seleccionarla de la lista.
3. Escriba el **Name** del grupo.
4. Haga clic en **Add**. Su nuevo grupo aparecerá en la lista, con su categoría mostrada debajo del nombre.

## Configurar las opciones del grupo

Una vez creado el grupo, puede completar más detalles:

1. Haga clic en el **nombre del grupo** en la lista para abrirlo.
2. Haga clic en el botón **Edit** a la izquierda de la página del grupo, debajo de sus datos.
3. Configure las siguientes opciones:
   - **Description** -- Un breve resumen de lo que trata el grupo. Es visible para los miembros.
   - **Meeting Times** -- Cuándo se reúne habitualmente el grupo (por ejemplo, "Miércoles a las 7 p. m.").
   - **Join Policy** -- Elija quién puede unirse a este grupo:
     - **Open** -- Cualquiera puede unirse de inmediato, sin aprobación
     - **Request** -- Las personas deben enviar una solicitud de ingreso que requiere aprobación (consulte [Solicitudes para unirse a un grupo](./group-join-requests.md))
     - **Closed** -- Los líderes o administradores deben agregar a los miembros de forma manual
   - **Labels** -- Asigne una o más etiquetas descriptivas al grupo (por ejemplo, "Presencial", "En línea", "Se dan la bienvenida a nuevos miembros"). Las etiquetas son términos libres que usted define; marque todas las que apliquen. Las etiquetas pueden usarse para filtrar grupos en el elemento Groups Browser del sitio web, y un elemento Group List muestra los grupos que tienen una etiqueta.
   - **Confidential group** -- Oculta este grupo y su lista de las páginas públicas, del buscador de grupos y de quienes no son miembros. Úselo para grupos sensibles como los ministerios de recuperación o consejería; solo los miembros del grupo y el personal de la iglesia pueden verlo.
   - **Discussions** -- Activa o desactiva el feed de chat del grupo, en el que cualquier miembro puede publicar. Activado de forma predeterminada.
   - **Announcements** -- Activa un segundo feed de chat solo para líderes: los miembros pueden leer y reaccionar, pero solo los líderes pueden publicar. Activado de forma predeterminada.
   - **Attendance Tracking** -- Actívelo si desea registrar la [asistencia](../attendance/tracking-attendance.md) de este grupo.
   - **Service Times** -- Asocie el grupo con horarios de servicio específicos de la iglesia, si corresponde. Consulte [Configuración de asistencia](../attendance/setup.md) para más detalles sobre los horarios de servicio.
4. Haga clic en **Save** para aplicar los cambios.

:::tip
Agregar una descripción clara y un horario de reunión ayuda a los miembros a saber qué esperar al unirse a un grupo.
:::

:::info
Desactivar tanto Discussions como Announcements elimina por completo la pestaña Messages del grupo en el portal de miembros. Si desactiva solo una, se oculta su pestaña y los miembros pasan al feed que sigue activo. Los mensajes existentes se conservan en cualquier caso: las opciones solo controlan las nuevas publicaciones.
:::

## Duplicar un grupo

¿Va a iniciar una nueva temporada de una clase o ministerio recurrente? En lugar de volver a introducir todas las opciones, duplique un grupo existente:

1. Abra el grupo y haga clic en **Duplicate** (debajo del botón **Edit**, a la izquierda de la página del grupo).
2. Confirme la duplicación.

La copia conserva las opciones del original -- categoría, descripción, horario y lugar de reunión, política de ingreso, etiquetas y campus --, pero **no** sus miembros. El nuevo grupo lleva el nombre del original con " (Copy)" añadido; cámbiele el nombre desde las opciones del grupo.

## Archivar un grupo

Cuando un grupo ya no está activo pero quiere conservar su historial en lugar de eliminarlo:

1. Abra el grupo y haga clic en **Edit** para editar sus opciones.
2. Haga clic en **Archive** y confirme.

Los grupos archivados dejan de aparecer en la lista principal de Groups. Para volver a encontrarlo, haga clic en el botón **Show archived** junto a los botones de categoría en la parte superior de la página de Groups, y luego haga clic en **Restore** junto al grupo para devolverlo.

:::info
Archivar un grupo no elimina a sus miembros, su historial de asistencia ni sus eventos del calendario; solo oculta el grupo de la lista predeterminada hasta que lo restaure.
:::

## Próximos pasos

Después de crear y configurar su grupo, puede:

- **Agregar miembros** -- Busque personas y añádalas al grupo. Use el icono de estrella (**Make Leader**) para designar a los líderes del grupo. Consulte [Miembros del grupo](./group-members.md).
- **Configurar un calendario** -- Cree eventos y reuniones recurrentes para el grupo. Consulte [Calendario del grupo](./group-calendar.md).
- **Comunicarse** -- Envíe mensajes a todos los miembros del grupo directamente desde la página del grupo.
- **Exportar datos** -- Haga clic en **Export** encima de la lista de miembros del grupo para descargarla.

:::info
Cada grupo pertenece a una categoría, y la página principal de Groups le permite filtrar la lista por categoría. Siempre puede reorganizar o renombrar las categorías a medida que crezca su iglesia.
:::
