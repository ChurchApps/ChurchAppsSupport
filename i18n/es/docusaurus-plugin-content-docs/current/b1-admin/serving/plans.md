---
title: "Planes de servicio"
---

# Planes de servicio

<div class="article-intro">

Los planes de servicio organizan quién sirve y cuándo. Cada plan está vinculado a una fecha y a un ministerio específicos, lo que facilita coordinar a sus equipos de voluntarios semana a semana y asegurar que cada servicio tenga suficiente personal.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configure sus ministerios y equipos en el área de Serving
- Asegúrese de que los voluntarios estén agregados a su [directorio de personas](../people/adding-people.md) y asignados a los equipos

</div>

## Acceder a los planes

1. En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expanda **Serving** y haga clic en **Plans**.
2. Seleccione una **pestaña de ministerio** en la parte superior de la página.
3. Haga clic en un **tipo de plan** para ver la lista de planes de ese tipo. Use **Upcoming** y **Past** encima de la lista para alternar entre los planes futuros y los anteriores.
4. Haga clic en un plan específico para abrirlo.

Cada página de plan muestra enlaces de regreso a su tipo de plan y a **Plans**, para que pueda volver atrás sin usar el botón de retroceso del navegador.

:::info
No se requiere acceso de administrador completo para gestionar los planes. Cualquier persona que sea miembro de un ministerio puede entrar a Serving y crear, editar y programar planes para su propio ministerio sin necesidad del permiso Plans Edit. Los editores con el rol Plans Edit pueden gestionar los planes de todos los ministerios.
:::

## Crear un plan

1. Desde la página del tipo de plan, haga clic en **New Plan** en la parte superior de la página.
2. Dé un nombre al plan o use la fecha como nombre. Seleccione la **fecha** del servicio.
3. Si su ministerio tiene [plantillas](./plan-templates.md), puede elegir una en **Start from template** para completar el orden del servicio, las posiciones y las notas en un solo paso.
4. Si no, y desea copiar un plan anterior, use **Copy from Previous Plan** para elegir **Positions Only** o **Positions and Assignments**. Si no desea copiar nada, elija **Nothing**. También puede marcar **Copy Order of Service**. Al copiar desde un plan anterior, el nuevo plan conserva también las **Notes**, el **Signup Deadline**, la opción **Show volunteer names on signup page** y la configuración de reemplazo automático de ese plan, para que no tenga que volver a escribirlos cada semana. Puede cambiar cualquiera de ellos en la configuración del nuevo plan.
5. Para preparar varias semanas a la vez mientras copia, escriba un número en **Repeat weekly for this many weeks** (hasta 12). B1 crea un plan por semana, copiado cada uno del anterior. Si el plan lleva el nombre de su fecha, cada nuevo plan se nombra con su propia fecha.
6. Opcionalmente, configure el **Signup Deadline (hours before service)**. Un plan nuevo empieza con el plazo del plan anterior, y puede cambiarlo aquí. Déjelo en blanco si no hay plazo.
7. Guarde el plan. Ahora puede empezar a asignar miembros del equipo y a armar el [orden del servicio](./service-order.md).

:::tip
**Repeat weekly for this many weeks** solo está disponible mientras copia algo del plan anterior (posiciones, asignaciones o el orden del servicio).
:::

## La página de detalles del plan

Al abrir un plan, el nombre del plan, el ministerio, el tipo de plan y la fecha del servicio aparecen en la parte superior, con los botones **Edit** y **Print**. Debajo, todo está en una sola página:

- **[Order of Service](./service-order.md)** -- Arme el orden del servicio con elementos como canciones de adoración, oraciones, anuncios y el sermón.
- **Serving Team Assignments** -- Administre qué miembros del equipo están asignados a este plan. Puede agregar personas de sus equipos existentes y ver quién ha confirmado o sigue pendiente. Los enlaces encima de las posiciones le permiten abrir las **Notes** y los **Times** del plan.

## Asignar miembros del equipo

1. Abra un plan y desplácese hasta **Serving Team Assignments**.
2. Haga clic en **Add Position**. Complete la información en el formulario para agregar una posición. Para el nombre de la categoría, use la que prefiera. Para que cualquier persona de su iglesia pueda ocupar la posición (y no solo los miembros de un equipo), deje **Volunteer Group** en **None**.
3. Haga clic en **People Needed** y elija a los voluntarios que ocuparán esa posición. Si la posición tiene un **Volunteer Group**, elija entre los miembros de ese grupo. Si su Volunteer Group está en **None**, puede buscar a cualquier persona de su iglesia.
4. Agregue miembros desde la lista de su equipo haciendo clic en **Add**.
5. Los miembros asignados aparecerán debajo de su equipo con su estado de asignación.
6. Haga clic en notify volunteers para avisarles dentro de la aplicación de B1 o por correo electrónico.

Cada posición muestra una etiqueta con el conteo (por ejemplo, "2/3") para que pueda ver de un vistazo cuántos lugares están ocupados. Debajo del encabezado **Serving Team Assignments**, un resumen ("X of Y positions filled") muestra la dotación general del plan, junto con cuántas posiciones faltan por cubrir. Cuando todas las posiciones estén cubiertas, el resumen cambia a **Fully staffed**.

:::tip
Configure sus equipos en la configuración del ministerio antes de crear planes. Así tendrá un grupo de voluntarios listo para asignar.
:::

### Copiar posiciones en un plan vacío

Si un plan no tiene posiciones todavía y existe un plan anterior del mismo tipo, aparece un enlace **Copy from Previous Plan** en **Serving Team Assignments**. Elija **Positions Only** o **Positions and Assignments** para llenar el plan abierto con las posiciones (y los voluntarios) del plan anterior. La copia se hace en el plan actual; no crea un segundo plan para la misma fecha.

## Configuración del plan

Cada plan tiene configuraciones adicionales que puede ajustar haciendo clic en **Edit** junto al plan en la lista del tipo de plan, o en el botón **Edit** de la parte superior de la página del plan. Haga clic en **Done** (o en el nombre del plan) para volver al plan. Entre ellas se incluyen:

- **Signup Deadline (hours before service)** — La cantidad de horas antes del servicio en que se cierran las inscripciones de voluntarios. Ingrese un número negativo para mantener las inscripciones abiertas después del inicio del servicio. Déjelo en blanco si no hay plazo.
- **Show volunteer names on signup page** — Si está marcada, los voluntarios que han iniciado sesión pueden ver quiénes más están inscritos en cada posición en la página de inscripción de B1.church. Los nombres nunca se muestran a visitantes que no han iniciado sesión.
- **Penciled in** — Oculta las asignaciones a los voluntarios hasta que esté listo para publicar el calendario.
- **Automatically schedule a replacement when a volunteer declines** — Si está marcada, cuando un voluntario asignado rechaza su posición, B1 contactará automáticamente al siguiente miembro disponible de la lista del equipo y le preguntará si puede servir. Esto continúa en la lista hasta que alguien acepte, lo que mantiene las posiciones cubiertas sin seguimiento manual.

## Recordatorios para voluntarios

B1 puede enviar recordatorios automáticos a los voluntarios antes de los servicios para los que están programados, para que no tenga que buscar a su equipo cada semana. Los recordatorios se envían a **todos los programados**, tanto a quienes han confirmado como a quienes aún no han respondido. Cada correo de recordatorio incluye la posición o posiciones del voluntario, la fecha del servicio, las notas del plan y su mensaje personalizado.

El horario y el contenido de los recordatorios se configuran por **tipo de plan**, de modo que cada tipo de servicio puede tener su propio calendario.

1. Desde el área **Serving**, seleccione el ministerio que contiene el tipo de plan.
2. En la lista **Plan Types**, haga clic en **Edit** junto al tipo de plan.
3. Expanda la sección **Reminders** y active **Send reminders for plans of this type**.
4. En **When should reminders go out?**, elija hasta tres momentos: **7 days before**, **3 days before**, **2 days before**, **1 day before** o **Day of**.
5. Configure la **Time of Day** en que se enviarán los recordatorios.
6. Opcionalmente, agregue un **Message**. Déjelo en blanco para usar el texto predeterminado del recordatorio.
7. En **Send By**, elija **Push**, **Email** y, si su iglesia tiene conectado un [proveedor de mensajes de texto](../settings/church-settings.md#texting), **Text**.
8. Haga clic en **Save Reminders**.

Los recordatorios están desactivados para un tipo de plan hasta que los active.

:::tip
Los voluntarios que todavía no han confirmado reciben los botones **Accept** y **Decline** directamente dentro del correo de recordatorio, para que puedan responder sin iniciar sesión.
:::

### Recordatorios por mensaje de texto

La opción **Text** solo aparece cuando su iglesia tiene conectado un proveedor de mensajes de texto. Los mensajes se envían a través del proveedor de su iglesia, y cada mensaje puede tener un costo para la iglesia. Un voluntario solo recibe un recordatorio por texto si ha activado **Text messages** en sus [Notification Preferences](../../b1-church/getting-started/notification-preferences.md) y tiene un número de celular en su perfil. Cada mensaje comienza con el nombre de su iglesia, se mantiene en un único mensaje de texto y termina con "Reply STOP to opt out." Quien responda STOP dejará de recibir mensajes de texto de su iglesia. Para que las respuestas STOP lleguen a B1, pegue la **Inbound (STOP) webhook URL** de su [configuración de mensajes de texto](../settings/church-settings.md#texting) en el webhook de mensajes entrantes de su proveedor.

Para enviar un mensaje de texto a todas las personas programadas en un rango de fechas de inmediato, use **Text Volunteers** en el [Plans Overview](./plans-overview.md#texting-everyone-scheduled).

:::info
Cada recordatorio se envía una sola vez. Los recordatorios por texto se envían además de los de push y correo electrónico, no en lugar de ellos.
:::

## Asociar grupos a un tipo de plan

Debajo de la lista de planes en la página del tipo de plan, la sección **Associated Groups** le permite decidir qué grupos pueden ver los planes de este tipo desde su portal de miembros. Es una forma rápida de mostrar los próximos servicios a los equipos correctos sin darles acceso de administrador.

1. En la página del tipo de plan, haga clic en **Associated Groups** en la parte superior de la página (o desplácese hasta esa sección).
2. Haga clic en **Add Group** y elija un grupo del menú desplegable.
3. En la columna **Shows**, elija si los miembros de ese grupo deben ver **Past plans only**, **Upcoming plans only** o **Past and upcoming plans** para este tipo de plan.
4. Repita el proceso para asociar más grupos, o haga clic en el icono de papelera para quitar un grupo.

:::info
Solo aparecen en el selector los grupos marcados como **Standard**. Los miembros de un grupo asociado ven automáticamente los planes de este tipo en la página del grupo dentro del portal de miembros de B1, limitados al período que seleccionó.
:::

Si los planes son lecciones de Lessons.church, los miembros del grupo asociado también verán una tarjeta **This week's lesson** en la página del grupo (la línea de cierre, el versículo y una pregunta para los padres). Asocie aquí un grupo de padres y configure el filtro en **Past plans only** para que se incluya la lección de hoy. Los equipos de voluntarios normalmente usan **Upcoming plans only** o **Past and upcoming plans**.

## Imprimir planes

Puede imprimir un plan para distribuirlo a su equipo. Abra el plan y haga clic en **Print** en la parte superior de la página para generar una versión imprimible que incluye las asignaciones y el orden del servicio. En la parte superior de la impresión aparece el logotipo de su iglesia (el **Light Background Logo** de [Website > Appearance](../website/appearance.md), si ha subido uno), con el nombre de su iglesia debajo, y el nombre del plan, para que las hojas sueltas sean fáciles de identificar. Es útil para repartir en los ensayos o publicar en un área común.

:::info
Los planes se organizan por ministerio. Asegúrese de estar en la pestaña del ministerio correcto antes de crear o ver planes.
:::

## Próximos pasos

- Use el [Plans Overview](./plans-overview.md) para ver todas las asignaciones próximas de varias semanas en una sola cuadrícula, detectar posiciones sin cubrir y asignar voluntarios directamente desde la cuadrícula
- Guarde la estructura de un plan como [Plan Template](./plan-templates.md) para aplicarla a planes futuros con un solo clic
- Arme su [Service Order](./service-order.md) con canciones, lecturas y otros elementos
- Agregue [canciones](./songs.md) de su biblioteca directamente al orden del servicio
- Use [Tasks](./tasks.md) para asignar tareas de seguimiento a los miembros del equipo
- Muestre el contenido de la lección actual en una pantalla del lobby con [Digital Signage](./digital-signage.md)
