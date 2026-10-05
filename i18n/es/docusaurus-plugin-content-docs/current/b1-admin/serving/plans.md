---
title: "Planes de Servicio"
---

# Planes de Servicio

<div class="article-intro">

Los planes de servicio organizan quién está sirviendo y cuándo. Cada plan está vinculado a una fecha y ministerio específicos, facilitando coordinar tus equipos de voluntarios semana a semana y asegurar que cada servicio esté completamente equipado.

</div>

<div class="prereqs">
<h4>Antes de Empezar</h4>

- Configura tus ministerios y equipos en el área de Servicio
- Asegúrate de que los voluntarios hayan sido añadidos a tu [directorio de personas](../people/adding-people.md) y asignados a equipos

</div>

## Acceder a Planes

1. En B1 Admin, abre el [menú Saltar](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda), expande **Servicio** y haz clic en **Planes**.
2. Selecciona una **pestaña de ministerio** en la parte superior de la página.
3. Haz clic en un **tipo de plan** para ver la lista de planes para ese tipo.
4. Haz clic en un plan específico para abrirlo.

:::info
El acceso de administrador completo no es necesario para gestionar planes. Cualquiera que sea miembro de un ministerio puede navegar a Servicio y crear, editar y programar planes para su propio ministerio sin necesidad del permiso de Editar Planes. Los editores con el rol de Editar Planes pueden gestionar planes en todos los ministerios.
:::

## Crear un Plan

1. Desde la vista del tipo de plan, haz clic en **Nuevo Plan**.
2. Dale un nombre al plan o usa la fecha como nombre. Selecciona la **fecha** para el servicio.
3. Si te gustaría copiar desde un plan anterior, elige solo posiciones o posiciones y asignaciones. Si no quieres copiar, simplemente no elijas nada. También puedes copiar el orden del servicio de mi plan anterior.
4. Guarda el plan. Ahora puedes comenzar a asignar miembros del equipo y construir el [orden del servicio](./service-order.md).

## La Página de Detalle del Plan

Cuando abres un plan, verás dos pestañas:

- **Asignaciones** -- Gestiona qué miembros del equipo están asignados a este plan. Puedes añadir personas de tus equipos existentes y ver quién ha confirmado o aún está pendiente.
- **[Orden del Servicio](./service-order.md)** -- Construye el orden del servicio con elementos como canciones de adoración, oraciones, anuncios y el sermón.

## Asignar Miembros del Equipo

1. Abre un plan y ve a la pestaña **Asignaciones**.
2. Haz clic en **añadir Posición** para expandirlo. Completa la información en el formulario añadir una posición. Para el nombre de categoría añade cualquier categoría que te guste. Para permitir que cualquiera en tu iglesia llene la posición (no solo miembros de un equipo), deja el **Grupo de Voluntarios** establecido en **Ninguno**.
3. Haz clic en **Personas Necesarias** y elige voluntarios para llenar esa posición. Si la posición tiene un **Grupo de Voluntarios**, elige de los miembros de ese grupo. Si su Grupo de Voluntarios está establecido en **Ninguno**, puedes buscar a cualquiera en tu iglesia.
4. Añade miembros de tu lista de equipo haciendo clic en **Añadir**.
5. Los miembros asignados aparecerán bajo su equipo con su estado de asignación.
6. Haz clic en notificar a voluntarios para notificarles dentro de la aplicación B1 o por correo electrónico.

Cada posición muestra un chip de recuento (por ejemplo, "2/3") para que puedas ver cuántos espacios están llenos de un vistazo. En la parte superior de la pestaña de Asignaciones, una barra de progreso y un chip de resumen ("X de Y posiciones llenas") muestran tu personal general para el plan, cambiando a **Completamente equipado** una vez que cada posición está cubierta.

:::tip
Configura tus equipos en la configuración del ministerio antes de crear planes. De esta manera, tendrás un grupo listo de voluntarios para asignar.
:::

## Configuración del Plan

Cada plan tiene configuración adicional que puedes configurar haciendo clic en el icono editar (lápiz) en el plan. Estos incluyen:

- **Fecha Límite de Inscripción** -- el número de horas antes del servicio cuando se cierran las inscripciones de voluntarios. Ingresa un número negativo para mantener las inscripciones abiertas después de la hora de inicio del servicio.
- **Mostrar nombres de voluntarios en la página de inscripción** -- cuando está marcado, los voluntarios pueden ver quién más ya se ha inscrito para cada posición.
- **Anotado** -- oculta asignaciones a los voluntarios hasta que estés listo para publicar el horario.
- **Programar automáticamente un reemplazo cuando un voluntario rechaza** -- cuando está marcado, si un voluntario asignado rechaza su posición, B1 contactará automáticamente a la siguiente persona disponible en la lista del equipo y preguntará si pueden servir. Esto continúa por la lista hasta que alguien acepte, manteniendo tus posiciones llenas sin seguimiento manual.

## Recordatorios de Voluntarios

B1 puede recordar automáticamente a los voluntarios antes de los servicios para los que están programados, para que no tengas que perseguir a tu equipo cada semana. Los recordatorios van a **todos programados** -- tanto aquellos que han confirmado como aquellos que aún no han respondido -- por correo electrónico y como notificación en la aplicación/push. Cada recordatorio incluye la(s) posición(es) del voluntario, la fecha del servicio, las notas del plan y tu mensaje personalizado.

El tiempo de recordatorio y el contenido se establecen por **tipo de plan**, para que cada tipo de servicio pueda mantener su propio horario.

1. Desde el área **Servicio**, selecciona el ministerio que contiene el tipo de plan.
2. Haz clic en el **icono editar (lápiz)** al lado del tipo de plan.
3. En la sección **Recordatorios**, establece:
   - **Días de recordatorio antes del servicio** -- una lista separada por comas de cuántos días antes de enviar, por ejemplo `7,1,0`. Usa `0` para enviar un recordatorio el día del servicio. Deja este campo en blanco para desactivar recordatorios para este tipo de plan.
   - **Mensaje de recordatorio personalizado** *(opcional)* -- texto adicional añadido al recordatorio, como "Llega 30 minutos antes para ensayar."
4. Guarda el tipo de plan.

Los nuevos tipos de plan recuerdan a voluntarios **2 días antes** de cada servicio por defecto hasta que cambies esto.

:::tip
Los voluntarios que aún no han confirmado obtienen botones **Aceptar** y **Rechazar** directamente dentro del correo de recordatorio, para que puedan responder sin iniciar sesión.
:::

:::info
Cada recordatorio se envía una sola vez. Los planes que todavía están anotados (no aún enviados al equipo) no activan recordatorios.
:::

## Asociar Grupos con un Tipo de Plan

Debajo de la lista de planes en la página del tipo de plan, la sección **Grupos** te permite decidir qué grupos pueden ver los planes para este tipo de plan desde su portal de miembros. Esta es una forma rápida de mostrar servicios próximos a los equipos correctos sin darles acceso de administrador.

1. En la página del tipo de plan, desplázate hasta la sección **Grupos**.
2. Haz clic en **Añadir Grupo** y elige un grupo del menú desplegable.
3. En la columna **Muestra**, elige si los miembros de ese grupo deben ver planes **Pasados**, **Futuros** o **Ambos** para este tipo de plan.
4. Repite para asociar grupos adicionales, o haz clic en el icono papelera para eliminar un grupo.

:::info
Solo los grupos etiquetados como **Estándar** aparecen en el selector. Los miembros de un grupo asociado ven automáticamente los planes de este tipo de plan en la página del grupo en el portal de miembros de B1 -- limitado a la ventana pasada/futura/ambos que seleccionaste.
:::

Si los planes son lecciones de Lessons.church, los miembros del grupo asociado también ven una tarjeta **Lección de esta semana** en la página del grupo (línea inferior, versículo y una pregunta para padres). Asocia un grupo de padres aquí y establece el filtro en **Pasados** para que la lección de hoy se incluya. Los equipos de voluntarios típicamente usan **Futuros** o **Ambos**.

## Imprimir Planes

Puedes imprimir un plan para distribuir a tu equipo. Abre el plan, Abre la pestaña orden del servicio y usa la opción **Imprimir** para generar una versión imprimible que incluya asignaciones y el orden del servicio. La parte superior de la impresión muestra el nombre de tu iglesia y el nombre del plan, para que las páginas sueltas sean fáciles de identificar. Esto es útil para repartir en ensayos o publicar en un área común.

:::info
Los planes se organizan por ministerio. Asegúrate de estar en la pestaña del ministerio correcto antes de crear o ver planes.
:::

## Próximos Pasos

- Usa la [Descripción General de Planes](./plans-overview.md) para ver todas las asignaciones próximas en múltiples semanas en una cuadrícula y detectar posiciones sin llenar -- y asigna voluntarios directamente desde la cuadrícula
- Guarda la estructura de un plan como [Plantilla de Plan](./plan-templates.md) para que puedas aplicarla a planes futuros en un clic
- Construye tu [Orden del Servicio](./service-order.md) con canciones, lecturas y otros elementos
- Añade [canciones](./songs.md) de tu biblioteca directamente en el orden del servicio
- Usa [Tareas](./tasks.md) para asignar elementos de acción de seguimiento a miembros del equipo
- Muestra contenido de lección actual en una TV de vestíbulo con [Señalización Digital](./digital-signage.md)
