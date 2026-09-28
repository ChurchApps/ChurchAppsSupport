---
title: "Planes de Servicio"
---

# Planes de Servicio

<div class="article-intro">

Los planes de servicio organizan quién está sirviendo y cuándo. Cada plan está vinculado a una fecha y ministerio específicos, lo que facilita coordinar sus equipos de voluntarios semana a semana y garantizar que cada servicio esté completamente cubierto.

</div>

<div class="prereqs">
<h4>Antes de Empezar</h4>

- Configure sus ministerios y equipos en el área Servicio
- Asegúrese de que los voluntarios hayan sido agregados a su [directorio de personas](../people/adding-people.md) y asignados a equipos

</div>

## Acceso a Planes

1. Navegue a **Servicio** desde el menú principal.
2. Seleccione una **pestaña de ministerio** en la parte superior de la página.
3. Haga clic en un **tipo de plan** para ver la lista de planes para ese tipo.
4. Haga clic en un plan específico para abrirlo.

:::info
No se requiere acceso de administrador completo para administrar planes. Cualquiera que sea miembro de un ministerio puede navegar a Servicio y crear, editar y programar planes para su propio ministerio sin necesidad del permiso Editar Planes. Los editores con la función Editar Planes pueden administrar planes en todos los ministerios.
:::

## Creación de un Plan

1. Desde la vista de tipo de plan, haga clic en **Nuevo Plan**.
2. Dé al plan un nombre o use la fecha como nombre. Seleccione la **fecha** del servicio.
3. Si desea copiar de un plan anterior, elija solo posiciones o posiciones y asignaciones. Si no desea copiar, simplemente no elija nada. También puede copiar el orden del servicio de mi plan anterior.
4. Guarde el plan. Ahora puede comenzar a asignar miembros del equipo y construir el [orden del servicio](./service-order.md).

## La Página de Detalles del Plan

Cuando abre un plan, verá dos pestañas:

- **Asignaciones** -- Administre qué miembros del equipo están asignados a este plan. Puede agregar personas de sus equipos existentes y ver quién ha confirmado o aún está pendiente.
- **[Orden del Servicio](./service-order.md)** -- Construya el orden del servicio con elementos como canciones de adoración, oraciones, anuncios y el sermón.

## Asignación de Miembros del Equipo

1. Abra un plan y vaya a la pestaña **Asignaciones**.
2. Haga clic en **agregar Posición** para expandirlo. Complete la información en el formulario agregar una posición. Para el nombre de categoría agregue lo que desee.
3. Haga clic en **Personas Necesarias** y elija voluntarios para llenar esa posición. Si la posición tiene un **Grupo de Voluntarios**, elige entre los miembros de ese grupo. Si su Grupo de Voluntarios se establece en **Ninguno**, puede buscar a cualquiera en su iglesia en su lugar.
4. Agregue miembros de su lista de equipo haciendo clic en **Agregar**.
5. Los miembros asignados aparecerán bajo su equipo con su estado de asignación.
6. Haga clic en notificar voluntarios para notificarles dentro de la aplicación B1 o por correo electrónico.

Cada posición muestra un chip de conteo (por ejemplo, "2/3") para que pueda ver de un vistazo cuántos lugares están ocupados. En la parte superior de la pestaña Asignaciones, una barra de progreso y un chip de resumen ("X de Y posiciones ocupadas") muestran el personal general para el plan, cambiando a **Completamente cubierto** una vez que cada posición está cubierta.

:::tip
Configure sus equipos en la configuración del ministerio antes de crear planes. De esta manera, tendrá un grupo listo de voluntarios para asignar.
:::

## Configuración del Plan

Cada plan tiene configuraciones adicionales que puede configurar haciendo clic en el icono editar (lápiz) en el plan. Estos incluyen:

- **Fecha límite de inscripción** — el número de horas antes del servicio cuando se cierran las inscripciones de voluntarios. Ingrese un número negativo para mantener las inscripciones abiertas más allá de la hora de inicio del servicio.
- **Mostrar nombres de voluntarios en la página de inscripción** — cuando está marcado, los voluntarios pueden ver quién más ya está inscrito para cada posición.
- **Lápiz en** — oculta las asignaciones de los voluntarios hasta que esté listo para publicar el horario.
- **Programar automáticamente un reemplazo cuando un voluntario rechaza** — cuando está marcado, si un voluntario asignado rechaza su posición, B1 contactará automáticamente a la siguiente persona disponible en la lista del equipo y preguntará si pueden servir. Esto continúa hacia abajo en la lista hasta que alguien acepta, manteniendo sus posiciones llenas sin seguimiento manual.

## Recordatorios de Voluntarios

B1 puede recordar automáticamente a los voluntarios sobre los servicios para los que están programados, para que no tenga que perseguir a su equipo cada semana. Los recordatorios van a **todos programados** — tanto los que han confirmado como los que aún no han respondido — por correo electrónico y como notificación en la aplicación/push. Cada recordatorio incluye la(s) posición(es) del voluntario, la fecha del servicio, las notas del plan y su mensaje personalizado.

El tiempo y contenido del recordatorio se establecen por **tipo de plan**, para que cada tipo de servicio pueda mantener su propio horario.

1. Desde el área **Servicio**, seleccione el ministerio que contiene el tipo de plan.
2. Haga clic en el **icono editar (lápiz)** junto al tipo de plan.
3. En la sección **Recordatorios**, establezca:
   - **Recordatorio días antes del servicio** — una lista separada por comas de cuántos días antes de enviar, por ejemplo `7,1,0`. Use `0` para enviar un recordatorio el día del servicio. Deje este campo en blanco para desactivar los recordatorios para este tipo de plan.
   - **Mensaje de recordatorio personalizado** *(opcional)* — texto adicional agregado al recordatorio, como "Llegue 30 minutos antes para ensayar."
4. Guarde el tipo de plan.

Los nuevos tipos de plan recuerdan a los voluntarios **2 días antes** de cada servicio de forma predeterminada hasta que cambie esto.

:::tip
Los voluntarios que aún no han confirmado obtienen botones **Aceptar** y **Rechazar** directamente dentro del correo electrónico de recordatorio, para que puedan responder sin iniciar sesión.
:::

:::info
Cada recordatorio se envía una vez. Los planes que aún están esbozados (no enviados al equipo) no activan recordatorios.
:::

## Asociación de Grupos con un Tipo de Plan

Debajo de la lista de planes en la página del tipo de plan, la sección **Grupos** le permite decidir qué grupos pueden ver los planes para este tipo de plan desde su portal de miembros. Esta es una forma rápida de mostrar los próximos servicios a los equipos correctos sin darles acceso de administrador.

1. En la página del tipo de plan, desplácese hacia abajo hasta la sección **Grupos**.
2. Haga clic en **Agregar Grupo** y elija un grupo en el menú desplegable.
3. En la columna **Mostrar**, elija si los miembros de ese grupo deben ver planes **Pasados**, **Futuros**, o **Ambos** para este tipo de plan.
4. Repita para asociar grupos adicionales, o haga clic en el icono de basura para eliminar un grupo.

:::info
Solo los grupos etiquetados como **Estándar** aparecen en el selector. Los miembros de un grupo asociado ven automáticamente los planes de este tipo de plan en la página del grupo en el portal de miembros B1 — limitado a la ventana pasado/futuro/ambos que seleccionó.
:::

Si los planes son lecciones de Lessons.church, los miembros del grupo asociado también ven una tarjeta **Lección de esta semana** en la página del grupo (línea inferior, versículo y una pregunta para padres). Asocie un grupo de padres aquí y establezca el filtro en **Pasado** para que la lección de hoy se incluya. Los equipos de voluntarios típicamente usan **Futuro** o **Ambos**.

## Impresión de Planes

Puede imprimir un plan para distribución a su equipo. Abra el plan, abra la pestaña orden del servicio y use la opción **Imprimir** para generar una versión imprimible que incluye asignaciones y el orden del servicio. Esto es útil para distribuir en ensayos o publicar en un área común.

:::info
Los planes están organizados por ministerio. Asegúrese de estar en la pestaña de ministerio correcta antes de crear o ver planes.
:::

## Próximos Pasos

- Use la [Descripción General de Planes](./plans-overview.md) para ver todas las asignaciones próximas en múltiples semanas en una cuadrícula y detectar posiciones sin ocupar — y asigne voluntarios directamente desde la cuadrícula
- Guarde la estructura de un plan como [Plantilla de Plan](./plan-templates.md) para que pueda colocarla en planes futuros en un clic
- Construya su [Orden del Servicio](./service-order.md) con canciones, lecturas y otros elementos
- Agregue [canciones](./songs.md) de su biblioteca directamente al orden del servicio
- Use [Tareas](./tasks.md) para asignar elementos de acción de seguimiento a miembros del equipo
- Muestre contenido de lección actual en un televisor de la sala de espera con [Señalización Digital](./digital-signage.md)
