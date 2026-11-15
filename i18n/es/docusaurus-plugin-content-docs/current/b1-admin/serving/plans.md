---
title: "Planes de servicio"
description: "Configure la programación de voluntarios en B1 Admin: cree planes de servicio por fecha, copie desde semanas anteriores, asigne miembros del equipo a puestos y administre las fechas límite de inscripción y los recordatorios."
---

# Planes de servicio

<div class="article-intro">

Los planes de servicio organizan quién sirve y cuándo. Cada plan está vinculado a una fecha y un ministerio específicos, lo que facilita coordinar sus equipos de voluntarios semana a semana y asegurar que cada servicio esté completamente cubierto.

</div>

## Video de capacitación {#training-video}

<YouTube id="47DstBXKl74" title="Crear planes y programar voluntarios en B1" next="Crear el orden del servicio y la biblioteca de canciones en B1" nextUrl="/docs/b1-admin/serving/service-order" />

<div class="prereqs">
<h4>Antes de empezar</h4>

- Configure sus ministerios y equipos en el área de Servicio
- Asegúrese de que los voluntarios se hayan agregado a su [directorio de personas](../people/adding-people.md) y asignado a equipos

</div>

## Acceder a los planes {#accessing-plans}

1. En B1 Admin, abra el [menú Salto](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expanda **Servicio** y haga clic en **Planes**.
2. Seleccione una **pestaña de ministerio** en la parte superior de la página.
3. Haga clic en un **tipo de plan** para ver la lista de planes de ese tipo. Use **Próximos** y **Pasados** encima de la lista para cambiar entre los planes futuros y los anteriores. **Próximos** muestra los planes desde hoy en adelante, del más cercano al más lejano, con los planes sin fecha al final. **Pasados** muestra solo los planes anteriores, del más reciente al más antiguo.
4. Haga clic en un plan específico para abrirlo.

Cada página de plan muestra enlaces de regreso a su tipo de plan y a **Planes**, para que pueda volver sin usar el botón de retroceso del navegador.

:::info
No se requieren permisos completos de administrador para administrar planes. Cualquier miembro de un ministerio puede ir a Servicio y crear, editar y programar planes para su propio ministerio sin necesitar el permiso Editar planes. Los editores con el rol Editar planes pueden administrar planes en todos los ministerios.
:::

## Crear un plan {#creating-a-plan}

1. Desde la página del tipo de plan, haga clic en **Nuevo plan** en la parte superior de la página. Se abre el formulario **Agregar un plan**.
2. Asigne un nombre al plan o use la fecha como nombre. Seleccione la **Fecha del servicio**. Si su iglesia tiene más de un campus, también puede elegir el **Campus** del plan.
3. Si su ministerio tiene [plantillas](./plan-templates.md), puede elegir una en **Empezar desde plantilla** para llenar el orden del servicio, los puestos y las notas en un solo paso.
4. De lo contrario, si desea copiar un plan anterior, use **Copiar del plan anterior** para elegir **Solo puestos** o **Puestos y asignaciones**. Si no desea copiar nada, elija **Nada**. También puede marcar **Copiar orden del servicio**. Al copiar un plan anterior, el nuevo plan también conserva sus **Notas**, la **Fecha límite de inscripción**, la opción **Mostrar nombres de voluntarios en la página de inscripción** y la configuración de reemplazo automático, para que no tenga que volver a escribirlos cada semana. Puede cambiar cualquiera de ellos en la configuración del nuevo plan.
5. Para crear varios planes a la vez mientras copia, elija **Repetir cada** y **Frecuencia** (Día, Semana o Mes), y luego escriba el **Número de planes** (hasta 12). En el caso de Mes, **El** le permite conservar el mismo día del mes o el mismo día de la semana, como el segundo sábado. B1 muestra las fechas antes de guardar y crea un plan por cada fecha, cada uno copiado del anterior. Si el plan lleva el nombre de su fecha, cada nuevo plan se nombra según su propia fecha.
6. Opcionalmente, establezca la **Fecha límite de inscripción (horas antes del servicio)**. Un plan nuevo empieza con la fecha límite del plan anterior, y puede cambiarla aquí. Déjela en blanco si no quiere fecha límite. Consulte [Configuración del plan](#plan-settings) para ver cómo se calcula la fecha límite.
7. Guarde el plan. Ahora puede empezar a asignar miembros del equipo y a construir el [orden del servicio](./service-order.md).

:::tip
Las opciones de repetición solo están disponibles mientras copia algo del plan anterior (puestos, asignaciones u orden del servicio).
:::

## La página del plan {#the-plan-page}

Al abrir un plan, su ministerio y tipo de plan, nombre y fecha del servicio aparecen en la parte superior, con los botones **Imprimir** y **Editar detalles**. La página le ofrece una visión general de todo el plan:

- Los recuadros **Duración total**, **Equipo de servicio** y **Respuestas** muestran la duración del orden del servicio, cuántos puestos están cubiertos (por ejemplo, "10 de 13 cubiertos") y cuántos voluntarios han aceptado, están pendientes o han rechazado.
- **Orden del servicio** muestra los primeros elementos del [orden del servicio](./service-order.md) con sus duraciones. Haga clic en **Editar orden del servicio** para abrir el orden completo en su propia página.
- **Equipo de servicio** enumera cada puesto por categoría, con los voluntarios asignados y cuántos todavía se necesitan. Si algo requiere atención, aparece una línea como "1 conflicto · 3 sin notificar" con un enlace **Revisar**. Haga clic en **Administrar equipo de servicio** para abrir la página completa del equipo.
- **Horarios** enumera los horarios de servicio y de ensayo del plan. Consulte [Horarios de servicio](#service-times).
- **Notas** contiene notas para todo el equipo. Haga clic en **Editar**, escriba sus notas y haga clic en **Guardar notas**.

Las páginas del orden del servicio y del equipo de servicio tienen cada una un enlace **Volver al plan** que lo regresa al resumen.

## Horarios de servicio {#service-times}

Los horarios le indican a B1 cuándo ocurren el servicio y los ensayos. Se usan para la fecha límite de inscripción, la [validación del plan](./plan-validation.md), los recordatorios para voluntarios y las horas del orden del servicio.

1. En la página del plan, haga clic en **Agregar horario** junto a **Horarios**.
2. Elija el **Tipo**: **Servicio**, **Ensayo** u **Otro**.
3. Escriba un **Nombre para mostrar** (por ejemplo, "Servicio dominical" o "Ensayo").
4. Establezca la **Hora de inicio** y la **Hora de fin**.
5. En **Equipos de servicio necesarios**, marque las categorías de puestos (por ejemplo, Adoración o Técnico) que sirven en este horario.
6. Haga clic en **Guardar**.

Haga clic en el nombre de un horario para editarlo o eliminarlo.

## Asignar miembros del equipo {#assigning-team-members}

1. Abra un plan y haga clic en **Administrar equipo de servicio**.
2. Haga clic en **Agregar puesto**. En el diálogo **Agregar un puesto**, elija o escriba un **Nombre de categoría** (por ejemplo, Adoración u Hospitalidad), escriba el **Nombre** del puesto y la **Cantidad de voluntarios**, y elija un **Grupo de voluntarios**. Para que cualquier persona de su iglesia pueda cubrir el puesto (no solo los miembros de un equipo), deje el **Grupo de voluntarios** en **Ninguno**. Marque **Permitir autoinscripción** para que los voluntarios puedan inscribirse en los espacios abiertos, y agregue una **Descripción** opcional que verán al explorar las oportunidades de inscripción. Haga clic en **Guardar**.
3. Haga clic en el enlace **Personas necesarias** junto al puesto (por ejemplo, "2 personas necesarias").
4. En el diálogo **Asignar puesto**, haga clic en el nombre de un miembro del equipo para asignarlo. Si el Grupo de voluntarios del puesto está en **Ninguno**, busque a cualquier persona de su iglesia y haga clic en el icono de agregar persona junto a ella. Haga clic en **Listo** cuando termine.
5. Los voluntarios asignados aparecen junto al puesto. Un punto verde en su foto significa que aceptaron, y un punto rojo significa que rechazaron.
6. Notifique a los voluntarios desde el panel **Validación** (consulte [Notificar a los voluntarios](./plan-validation.md#notifying-volunteers)). Si el plan usa un [flujo de confirmación](#plan-settings), la notificación también inicia una tarjeta de flujo de trabajo que da seguimiento a cada solicitud hasta que el voluntario responde.

Para cambiar o quitar una asignación, haga clic en el nombre del voluntario y luego en **Eliminar** en el diálogo **Editar asignación**. Para cambiar un puesto, haga clic en su nombre; **Eliminar** en el diálogo **Editar puesto** elimina el puesto y desprograma a las personas asignadas a él.

Cada puesto muestra una etiqueta de conteo (por ejemplo, "2/3", o "1/2 inscritos" para los puestos de autoinscripción) para que vea de un vistazo cuántos espacios están cubiertos. En la parte superior de la página del equipo de servicio, un resumen ("X de Y puestos cubiertos") muestra la cobertura general del plan, junto con cuántos siguen faltando, y cambia a **Completamente cubierto** cuando todos los puestos están ocupados.

:::tip
Configure sus equipos en la configuración del ministerio antes de crear los planes. Así tendrá un grupo de voluntarios listo para asignar.
:::

### Asignación automática {#auto-assign}

Haga clic en **Asignación automática** en la página del equipo de servicio para llenar todos los espacios abiertos con el Grupo de voluntarios de cada puesto. Los puestos sin Grupo de voluntarios se omiten. Para quitar los voluntarios que acaba de agregar, haga clic en **Deshacer asignación automática**. También puede llenar muchos planes a la vez desde el [Resumen de planes](./plans-overview.md#auto-scheduling-from-the-overview).

### Preferencias de programación {#scheduling-preferences}

En el diálogo **Asignar puesto**, haga clic en el icono de controles deslizantes junto a un miembro del equipo para establecer sus **Preferencias de programación**: **Máximo de veces al mes**, **Horarios de servicio preferidos** y **Programación por hogar** (programar al hogar junto, o no el mismo día). La [validación del plan](./plan-validation.md) le advierte cuando una asignación va en contra de estas preferencias.

### Copiar puestos a un plan vacío {#copying-positions-into-an-empty-plan}

Si un plan todavía no tiene puestos y existe un plan anterior del mismo tipo, aparece un enlace **Copiar del plan anterior** en la página del equipo de servicio. Elija **Solo puestos** o **Puestos y asignaciones** para llenar el plan abierto con los puestos (y voluntarios) del plan anterior. La copia se realiza en el plan actual; no crea un segundo plan para la misma fecha.

## Configuración del plan {#plan-settings}

Cada plan tiene configuraciones adicionales que puede ajustar haciendo clic en **Editar** junto al plan en la lista del tipo de plan, o en **Editar detalles** en la parte superior de la página del plan. Haga clic en **Listo** (o en el nombre del plan encima del formulario) para volver al plan. El mismo formulario tiene un botón **Eliminar** que borra el plan, incluidos sus puestos, asignaciones y orden del servicio. Las configuraciones incluyen:

- **Fecha límite de inscripción (horas antes del servicio)** — la cantidad de horas antes del servicio en que se cierran las inscripciones de voluntarios. Las horas se cuentan hacia atrás desde el primer horario de **Servicio** del plan (los ensayos y otros horarios se omiten, salvo que el plan no tenga nada más), así que una fecha límite de 2 horas para un servicio a las 10:00 a. m. cierra las inscripciones a las 8:00 a. m. ese mismo día. Si el plan no tiene horarios, la fecha límite se cuenta desde las 9:00 a. m. del día del servicio, en la zona horaria de su iglesia. Una vez vencida, los voluntarios no pueden inscribirse ni retirarse. Escriba un número negativo para mantener las inscripciones abiertas después del inicio del servicio. Déjela en blanco, o bórrela, para no tener fecha límite.
- **Flujo de confirmación** — elija un [flujo de trabajo de confirmación de asignaciones de servicio](./workflows.md#serving-assignment-confirmations) para dar seguimiento a las solicitudes de servicio de este plan por correo electrónico y mensaje de texto hasta que cada voluntario acepte o rechace. Cuando **Notifique** a los voluntarios del plan publicado, cada nueva solicitud obtiene su propia tarjeta en el tablero de ese flujo de trabajo, y una nota encima del enlace de notificación dice *"Las nuevas solicitudes usan el flujo de confirmación."* Deje la opción en **Usar notificaciones de asignación existentes** para mantener las notificaciones habituales. Solo aparecen en la lista los flujos de confirmación activos; créelo primero en **Servicio > Flujos de trabajo**.
- **Mostrar nombres de voluntarios en la página de inscripción** — cuando está marcada, los voluntarios que han iniciado sesión pueden ver quién más está inscrito en cada puesto en la página de inscripción de B1.church. Los nombres nunca se muestran a los visitantes que no han iniciado sesión. También controla si los voluntarios que cubren cada elemento del orden del servicio se imprimen junto a él (consulte [Imprimir planes](#printing-plans)).
- **En lápiz** — oculta las asignaciones a los voluntarios hasta que esté listo para publicar el calendario. Mientras un plan esté en lápiz, el panel **Validación** de la página del equipo de servicio muestra un botón **Publicar plan** (o **Publicar y notificar** si los voluntarios aún no han sido notificados) que hace visibles las asignaciones.
- **Programar automáticamente un reemplazo cuando un voluntario rechaza** — cuando está marcada, si un voluntario asignado rechaza su puesto, B1 contactará automáticamente a la siguiente persona disponible de la lista del equipo y le preguntará si puede servir. Esto continúa hasta que alguien acepte, manteniendo los puestos cubiertos sin seguimiento manual.

:::tip
En la página de inscripción para miembros, los puestos abiertos de cada plan aparecen agrupados por categoría y luego por nombre. Los miembros ven todas las semanas próximas con puestos abiertos, a menos que active **Mostrar solo la siguiente semana de cada tipo de plan** en [Configuración > Inscripción de voluntarios](../settings/church-settings.md#volunteer-signup).
:::

## Recordatorios para voluntarios {#volunteer-reminders}

B1 puede enviar recordatorios automáticos a los voluntarios antes de los servicios en los que están programados, para que no tenga que perseguir a su equipo cada semana. Los recordatorios se envían a **todas las personas programadas**, tanto a las que han confirmado como a las que todavía no han respondido. La excepción es una solicitud enviada mediante un [flujo de confirmación](./workflows.md#serving-assignment-confirmations): ese voluntario solo recibe recordatorios después de aceptar, ya que el flujo de trabajo se encarga del seguimiento hasta entonces. Cada correo de recordatorio incluye el puesto o puestos del voluntario, la fecha del servicio, las notas del plan y su mensaje personalizado.

El horario y el contenido de los recordatorios se configuran por **tipo de plan**, así que cada tipo de servicio puede tener su propio calendario.

1. Desde el área de **Servicio**, seleccione el ministerio que contiene el tipo de plan.
2. En la lista **Tipos de plan**, haga clic en **Editar** junto al tipo de plan.
3. Expanda la sección **Recordatorios** y active **Enviar recordatorios para planes de este tipo**.
4. En **¿Cuándo deben enviarse los recordatorios?**, elija hasta tres momentos: **7 días antes**, **3 días antes**, **2 días antes**, **1 día antes** o **El mismo día**.
5. Establezca la **Hora del día** en que se envían los recordatorios.
6. Opcionalmente, agregue un **Mensaje**. Déjelo en blanco para usar el texto predeterminado del recordatorio.
7. En **Enviar por**, elija **Notificación push**, **Correo electrónico** y, si su iglesia tiene un [proveedor de mensajes de texto](../settings/church-settings.md#texting) conectado, **Mensaje de texto**.
8. Haga clic en **Guardar recordatorios**.

Los recordatorios están desactivados para un tipo de plan hasta que los active.

:::tip
Los voluntarios que todavía no han confirmado reciben los botones **Aceptar** y **Rechazar** directamente en el correo de recordatorio, para que puedan responder sin iniciar sesión.
:::

### Recordatorios por mensaje de texto {#text-reminders}

La opción **Mensaje de texto** solo aparece cuando su iglesia tiene conectado un proveedor de mensajes de texto. Los mensajes se envían a través del proveedor de mensajes de texto de su iglesia, y cada mensaje puede tener un costo para la iglesia. Un voluntario solo recibe un recordatorio por mensaje de texto si activó **Mensajes de texto** en sus [Preferencias de notificación](../../b1-church/getting-started/notification-preferences.md) y tiene un número de celular en su perfil. Cada mensaje comienza con el nombre de su iglesia, se mantiene en un solo mensaje de texto y termina con "Responda STOP para cancelar la suscripción." Quien responda STOP deja de recibir mensajes de texto de su iglesia. Para que las respuestas STOP lleguen a B1, pegue la **URL del webhook de entrada (STOP)** de su [configuración de mensajes de texto](../settings/church-settings.md#texting) en el webhook de mensajes entrantes de su proveedor.

Para enviar un mensaje de texto a todas las personas programadas en un rango de fechas de inmediato, use **Enviar mensaje a voluntarios** en el [Resumen de planes](./plans-overview.md#texting-everyone-scheduled).

:::info
Cada recordatorio se envía una sola vez. Los recordatorios por mensaje de texto se envían además de la notificación push y el correo electrónico, no en lugar de ellos.
:::

## Asociar grupos con un tipo de plan {#associating-groups-with-a-plan-type}

Debajo de la lista de planes en la página del tipo de plan, la sección **Grupos asociados** le permite decidir qué grupos pueden ver los planes de este tipo desde su portal de miembros. Es una forma rápida de mostrar los próximos servicios a los equipos correctos sin darles acceso de administrador.

1. En la página del tipo de plan, haga clic en **Grupos asociados** en la parte superior de la página (o desplácese hasta esa sección).
2. Haga clic en **Agregar grupo** y elija un grupo del menú desplegable.
3. En la columna **Muestra**, elija si los miembros de ese grupo deben ver solo **Planes pasados**, solo **Planes próximos** o **Planes pasados y próximos** para este tipo de plan.
4. Repita para asociar más grupos, o haga clic en el icono de papelera para quitar un grupo.

:::info
Solo aparecen en el selector los grupos marcados como **Estándar**. Los miembros de un grupo asociado ven automáticamente los planes de este tipo en la página del grupo, dentro del portal de miembros de B1, limitados al período que seleccionó.
:::

Si los planes son lecciones de Lessons.church, los miembros del grupo asociado también ven una tarjeta **La lección de esta semana** en la página del grupo (la idea principal, el versículo y una pregunta para los padres). Asocie aquí un grupo de padres y establezca el filtro en **Solo planes pasados** para que se incluya la lección de hoy. Los equipos de voluntarios normalmente usan **Solo planes próximos** o **Planes pasados y próximos**.

## Imprimir planes {#printing-plans}

Puede imprimir un plan para distribuirlo a su equipo. Abra el plan y haga clic en **Imprimir** en la parte superior de la página para generar una versión imprimible que incluye las asignaciones y el orden del servicio. La parte superior de la impresión muestra el logotipo de su iglesia (el **Logotipo para fondo claro** de [Sitio web > Apariencia](../website/appearance.md), si ha subido uno) con el nombre de su iglesia debajo, y el nombre del plan, para que las hojas sueltas sean fáciles de identificar. Esto es útil para repartirlo en los ensayos o publicarlo en un área común.

Cuando el plan tiene más de un horario de servicio, la impresión tiene una columna de hora para cada servicio, encabezada con su hora de inicio. Un elemento omitido de un servicio (consulte [Incluir elementos en horarios de servicio específicos](./service-order.md#including-items-in-specific-service-times)) muestra un guion en la columna de ese servicio.

La impresión omite todo lo que quedaría vacío. Si no hay voluntarios asignados, no hay recuadro de equipo y el orden del servicio usa todo el ancho de la página. Si ningún elemento tiene duración, se omite la columna **Duración**, y si el plan no tiene horarios de servicio ni duraciones, también se omite la columna **Hora**. Para quitar la barra negra del encabezado **Orden del servicio** con la fecha del servicio, desmarque **Mostrar encabezado de Orden del servicio** en la parte superior de la página de impresión; B1 Admin recuerda su elección en ese navegador.

:::info
Los planes se organizan por ministerio. Asegúrese de estar en la pestaña del ministerio correcto antes de crear o ver planes.
:::

## Próximos pasos {#next-steps}

- Use el [Resumen de planes](./plans-overview.md) para ver todas las asignaciones próximas de varias semanas en una cuadrícula, detectar puestos sin cubrir y asignar voluntarios directamente desde la cuadrícula
- Guarde la estructura de un plan como [plantilla de plan](./plan-templates.md) para aplicarla a planes futuros con un solo clic
- Construya su [orden del servicio](./service-order.md) con canciones, lecturas y otros elementos
- Agregue [canciones](./songs.md) de su biblioteca directamente al orden del servicio
- Use [Tareas](./tasks.md) para asignar acciones de seguimiento a los miembros del equipo
- Muestre el contenido de lecciones actual en un televisor del vestíbulo con [Señalización digital](./digital-signage.md)
