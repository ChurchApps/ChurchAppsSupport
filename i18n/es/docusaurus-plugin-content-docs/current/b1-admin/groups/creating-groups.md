---
title: "Creación de grupos"
---

# Creación de grupos

<div class="article-intro">

Crear un grupo en B1 Admin es sencillo. Configurará una categoría, nombrará su grupo y luego configurará sus opciones. Los grupos le ayudan a organizar su iglesia en unidades significativas como grupos pequeños, comités y clases.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita una cuenta activa de B1 Admin con permiso para gestionar grupos. Vea [Roles y permisos](../people/roles-permissions.md) si no está seguro de su nivel de acceso.
- Decida sobre una estructura de categorías para sus grupos (por ejemplo, "Grupos pequeños", "Ministerios", "Comités"). Las categorías ayudan a mantener los grupos relacionados organizados.

</div>

## Agregar un nuevo grupo

1. Abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda de B1 Admin), expanda **People** y haga clic en **Groups**.
2. Haga clic en **Add Group** e ingrese un **nombre de categoría**. Las categorías le ayudan a organizar grupos relacionados (por ejemplo, "Grupos pequeños", "Ministerios" o "Comités"). Si ya existe una categoría, puede seleccionarla de la lista.
3. Ingrese el **nombre del grupo**.
4. Haga clic en **Add**. Su nuevo grupo aparecerá en la lista bajo la categoría elegida.

## Configurar opciones de grupo

Una vez que su grupo es creado, puede completar detalles adicionales:

1. Haga clic en el **nombre del grupo** en la lista para abrirlo.
2. Haga clic en el **icono de lápiz** para editar la configuración del grupo.
3. Configure las siguientes opciones:
   - **Description** — Un breve resumen de qué se trata el grupo. Es visible para los miembros.
   - **Meeting Times** — Cuándo el grupo típicamente se reúne (por ejemplo, "Miércoles a las 7 PM").
   - **Join Policy** — Elija quién puede unirse a este grupo:
     - **Open** — Cualquiera puede unirse inmediatamente sin aprobación
     - **Request** — Las personas deben enviar una solicitud de unión que requiere aprobación (vea [Solicitudes de unión de grupo](./group-join-requests.md))
     - **Closed** — Los miembros deben ser añadidos manualmente por líderes o administradores
   - **Labels** — Asigne una o más etiquetas descriptivas al grupo (por ejemplo, "En persona", "En línea", "Nuevos miembros bienvenidos"). Las etiquetas son marcas de forma libre que define; marque todas las que apliquen. Las etiquetas se pueden usar para filtrar grupos en el elemento Navegador de grupos del sitio web.
   - **Confidential group** — Oculte este grupo y su lista de la vista pública, el buscador de grupos y los no miembros. Use esto para grupos sensibles como ministerios de recuperación o consejería; solo los miembros del grupo y el personal de la iglesia pueden verlo.
   - **Discussions** — Activa el feed de chat del grupo o lo apaga, donde cualquier miembro puede publicar. Activado por defecto.
   - **Announcements** — Activa un segundo feed de chat solo para líderes; los miembros pueden leer y reaccionar, pero solo los líderes pueden publicar. Activado por defecto.
   - **Attendance Tracking** — Habilite esto si desea registrar [asistencia](../attendance/tracking-attendance.md) para este grupo.
   - **Service Times** — Asocie el grupo con horas específicas de servicio de la iglesia si aplica. Vea [Configuración de asistencia](../attendance/setup.md) para obtener detalles sobre horas de servicio.
4. Haga clic en **Save** para aplicar sus cambios.

:::tip
Añadir una descripción clara y hora de reunión ayuda a los miembros a saber qué esperar cuando se unen a un grupo.
:::

:::info
Desactivar tanto Discussions como Announcements elimina completamente la pestaña de Mensajes de la vista del miembro. Desactivar solo una oculta su pestaña; los miembros se mueven al feed que sigue activo. Los mensajes existentes se mantienen de cualquier forma; los alternadores solo controlan nuevas publicaciones.
:::

## Duplicar un grupo

¿Comenzando una nueva sesión de una clase recurrente o ministerio? En lugar de reingresar toda la configuración, duplique un grupo existente:

1. Abra el grupo y haga clic en el **icono de duplicar** en el banner del grupo (junto a Edit).
2. Confirme la duplicación.

La copia lleva la configuración del original; categoría, descripción, hora/ubicación de reunión, política de unión, etiquetas y campus; pero **no** sus miembros. El nuevo grupo se nombra después del original con " (Copy)" añadido; renómbrelo desde la configuración del grupo.

## Archivar un grupo

Cuando un grupo ya no está activo pero desea mantener su historial en lugar de eliminarlo:

1. Abra el grupo y haga clic en el **icono de lápiz** para editar su configuración.
2. Haga clic en **Archive** y confirme.

Los grupos archivados desaparecen de la lista principal de Grupos. Para encontrar uno nuevamente, active el alternador **Show archived** en la parte superior de la página de Grupos y luego haga clic en **Restore** junto al grupo para traerlo de vuelta.

:::info
Archivar un grupo no elimina sus miembros, historial de asistencia o eventos de calendario; solo oculta el grupo de la lista predeterminada hasta que lo restaure.
:::

## Próximos pasos

Después de crear y configurar su grupo, está listo para:

- **Añadir miembros** — Busque personas y agrégelas al grupo. Use el icono de llave verde para designar líderes del grupo. Vea [Miembros del grupo](./group-members.md).
- **Configurar un calendario** — Cree eventos y reuniones recurrentes para el grupo. Vea [Calendario del grupo](./group-calendar.md).
- **Comunicarse** — Envíe mensajes a todos los miembros del grupo directamente desde la página del grupo.
- **Exportar datos** — Haga clic en el icono de descarga para exportar la lista de miembros de su grupo.

:::info
Todos los grupos de su iglesia están organizados por categorías en la página principal de Grupos. Siempre puede reorganizar o renombrar categorías a medida que su iglesia crece.
:::
