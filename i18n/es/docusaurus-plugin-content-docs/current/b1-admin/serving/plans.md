---
title: "Planes de servicio"
---

# Planes de servicio

<div class="article-intro">

Los planes de servicio organizan quién sirve y cuándo. Cada plan está vinculado a una fecha y un ministerio específicos, lo que facilita coordinar a sus equipos de voluntarios semana a semana y asegurar que cada servicio esté completamente cubierto.

</div>

## Video de capacitación

<YouTube id="47DstBXKl74" title="Creación de planes y programación de voluntarios en B1" next="Armar el orden de servicio y la biblioteca de canciones en B1" nextUrl="/docs/b1-admin/serving/service-order" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configure sus ministerios y equipos en el área de Servicio
- Asegúrese de que los voluntarios estén agregados a su [directorio de personas](../people/adding-people.md) y asignados a equipos

</div>

## Acceder a los planes

1. En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expanda **Servicio** y haga clic en **Planes**.
2. Seleccione una **pestaña de ministerio** en la parte superior de la página.
3. Haga clic en un **tipo de plan** para ver la lista de planes de ese tipo. Use **Próximos** y **Pasados** encima de la lista para alternar entre los planes futuros y los anteriores. **Próximos** muestra los planes desde hoy en adelante, del más cercano al más lejano, con los planes sin fecha al final. **Pasados** muestra solo los planes anteriores, del más reciente al más antiguo.
4. Haga clic en un plan específico para abrirlo.

Cada página de plan muestra enlaces de regreso a su tipo de plan y a **Planes**, así que puede volver atrás sin usar el botón de retroceso del navegador.

:::info
No se requiere acceso de administrador completo para administrar planes. Cualquier miembro de un ministerio puede ir a Servicio y crear, editar y programar planes para su propio ministerio sin necesitar el permiso Editar planes. Los editores con el rol Editar planes pueden administrar los planes de todos los ministerios.
:::

## Crear un plan

1. Desde la página del tipo de plan, haga clic en **Nuevo plan** en la parte superior de la página.
2. Ponga un nombre al plan o use la fecha como nombre. Seleccione la **fecha** del servicio.
3. Si su ministerio tiene [plantillas](./plan-templates.md), puede elegir una en **Iniciar desde plantilla** para llenar el orden de servicio, los puestos y las notas en un solo paso.
4. De lo contrario, si desea copiar de un plan anterior, use **Copiar del plan anterior** para elegir **Solo puestos** o **Puestos y asignaciones**. Si no desea copiar, elija **Nada**. También puede marcar **Copiar orden de servicio**. Al copiar de un plan anterior, el nuevo plan también conserva las **Notas**, la **Fecha límite de inscripción**, la opción **Mostrar nombres de voluntarios en la página de inscripción** y la configuración de reemplazo automático de ese plan, para que no tenga que volver a ingresarlas cada semana. Puede cambiar cualquiera de ellas en la configuración del nuevo plan.
5. Para configurar varios planes a la vez mientras copia, elija **Repetir cada** y **Frecuencia** (Día, Semana o Mes), y luego escriba el **Número de planes** (hasta 12). En el caso de Mes, **El** le permite conservar el mismo día del mes o el mismo día de la semana, como el segundo sábado. B1 muestra las fechas antes de guardar y crea un plan por cada fecha, cada uno copiado del anterior. Si el plan se nombra por su fecha, cada plan nuevo toma el nombre de su propia fecha.
6. Opcionalmente, establezca la **Fecha límite de inscripción (horas antes del servicio)**. Un plan nuevo empieza con la fecha límite del plan anterior, y puede cambiarla aquí. Déjela en blanco si no hay fecha límite. Consulte [Configuración del plan](#plan-settings) para saber cómo se cuenta la fecha límite.
7. Guarde el plan. Ya puede empezar a asignar miembros del equipo y a armar el [orden de servicio](./service-order.md).

:::tip
La configuración de repetición solo está disponible mientras copia algo del plan anterior (puestos, asignaciones u orden de servicio).
:::

## La página de detalle del plan

Cuando abre un plan, el nombre del plan, el ministerio, el tipo de plan y la fecha del servicio aparecen en la parte superior, con los botones **Editar** e **Imprimir**. Debajo, todo está en una sola página:

- **[Orden de servicio](./service-order.md)**: arme el orden de servicio con elementos como canciones de adoración, oraciones, anuncios y el sermón.
- **Asignaciones del equipo de servicio**: administre qué miembros del equipo están asignados a este plan. Puede agregar personas de sus equipos existentes y ver quién ha confirmado o aún está pendiente. Los enlaces sobre los puestos le permiten abrir las **Notas** y los **Horarios** del plan.

## Asignar miembros del equipo {#assigning-team-members}

1. Abra un plan y desplácese hasta **Asignaciones del equipo de servicio**.
2. Haga clic en **Agregar puesto**. Complete la información en el formulario de agregar puesto. Para el nombre de la categoría, use la que prefiera. Para que cualquier persona de su iglesia pueda ocupar el puesto (no solo los miembros de un equipo), deje **Grupo de voluntarios** en **Ninguno**.
3. Haga clic en **Personas necesarias** y elija a los voluntarios que cubrirán ese puesto. Si el puesto tiene un **Grupo de voluntarios**, elegirá entre los miembros de ese grupo. Si su Grupo de voluntarios está en **Ninguno**, puede buscar a cualquier persona de su iglesia.
4. Agregue miembros de la lista de su equipo haciendo clic en **Agregar**.
5. Los miembros asignados aparecerán bajo su equipo con su estado de asignación.
6. Haga clic en notificar a los voluntarios para avisarles dentro de la aplicación de B1 o por correo electrónico. Si el plan usa un [flujo de confirmación](#plan-settings), notificar también inicia una tarjeta de flujo de trabajo que da seguimiento a cada solicitud hasta que el voluntario responda.

Cada puesto muestra una etiqueta con el conteo (por ejemplo, "2/3") para que vea de un vistazo cuántos lugares están cubiertos. Debajo del encabezado **Asignaciones del equipo de servicio**, un resumen ("X de Y puestos cubiertos") muestra la cobertura general del plan, junto con cuántos siguen faltando, y cambia a **Totalmente cubierto** cuando todos los puestos están ocupados.

:::tip
Configure sus equipos en la configuración del ministerio antes de crear los planes. Así tendrá un grupo de voluntarios listo para asignar.
:::

### Copiar puestos a un plan vacío

Si un plan aún no tiene puestos y existe un plan anterior del mismo tipo, aparece un enlace de **Copiar del plan anterior** en **Asignaciones del equipo de servicio**. Elija **Solo puestos** o **Puestos y asignaciones** para llenar el plan abierto con los puestos (y voluntarios) del plan anterior. La copia se hace en el plan actual; no crea un segundo plan para la misma fecha.

## Configuración del plan {#plan-settings}

Cada plan tiene configuraciones adicionales que puede ajustar haciendo clic en **Editar**, junto al plan en la lista del tipo de plan, o en el botón **Editar** en la parte superior de la página del plan. Haga clic en **Listo** (o en el nombre del plan) para volver al plan. Incluyen:

- **Fecha límite de inscripción (horas antes del servicio)**: la cantidad de horas antes del servicio en que se cierran las inscripciones de voluntarios. Las horas se cuentan hacia atrás desde el primer horario de **Servicio** del plan (los ensayos y otros horarios se omiten, salvo que el plan no tenga nada más), así que una fecha límite de 2 horas en un servicio de las 10:00 a. m. cierra las inscripciones a las 8:00 a. m. de ese día. Si el plan no tiene horarios, la fecha límite se cuenta desde las 9:00 a. m. del día del servicio, en la zona horaria de su iglesia. Una vez vencida, los voluntarios no pueden inscribirse ni retirarse. Ingrese un número negativo para mantener las inscripciones abiertas después del inicio del servicio. Déjela en blanco, o bórrela, para no tener fecha límite.
- **Flujo de confirmación**: elija un [flujo de trabajo de confirmación de asignaciones de servicio](./workflows.md#serving-assignment-confirmations) para dar seguimiento a las solicitudes de servicio de este plan por correo electrónico y mensaje de texto hasta que cada voluntario acepte o rechace. Cuando **notifique** a los voluntarios del plan publicado, cada solicitud nueva obtiene su propia tarjeta en el tablero de ese flujo de trabajo, y una nota encima del enlace de notificar dice *"Las nuevas solicitudes usan el flujo de confirmación"*. Deje la opción en **Usar notificaciones de asignación existentes** para mantener las notificaciones habituales. Solo aparecen en la lista los flujos de confirmación activos; créelo primero en **Servicio > Flujos de trabajo**.
- **Mostrar nombres de voluntarios en la página de inscripción**: cuando está marcada, los voluntarios que han iniciado sesión pueden ver quién más está inscrito en cada puesto de la página de inscripción de B1.church. Los nombres nunca se muestran a visitantes que no han iniciado sesión.
- **Pendiente de confirmar**: oculta las asignaciones a los voluntarios hasta que esté listo para publicar el calendario.
- **Programar automáticamente un reemplazo cuando un voluntario rechace**: cuando está marcada, si un voluntario asignado rechaza su puesto, B1 contactará automáticamente a la siguiente persona disponible de la lista del equipo y le preguntará si puede servir. Esto continúa en la lista hasta que alguien acepte, manteniendo los puestos cubiertos sin seguimiento manual.

:::tip
En la página de inscripción para miembros, los puestos abiertos de cada plan aparecen agrupados por categoría y luego por nombre. Los miembros ven todas las semanas próximas con puestos abiertos, a menos que active **Mostrar solo la siguiente semana de cada tipo de plan** en [Configuración > Inscripción de voluntarios](../settings/church-settings.md#volunteer-signup).
:::

## Recordatorios para voluntarios {#volunteer-reminders}

B1 puede enviar automáticamente recordatorios a los voluntarios antes de los servicios para los que están programados, para que no tenga que perseguir a su equipo cada semana. Los recordatorios se envían a **todos los programados**: tanto a quienes ya confirmaron como a quienes aún no han respondido. La excepción es una solicitud enviada mediante un [flujo de confirmación](./workflows.md#serving-assignment-confirmations): ese voluntario solo recibe recordatorios después de aceptar, ya que el flujo se encarga del seguimiento hasta entonces. Cada correo de recordatorio incluye el puesto o los puestos del voluntario, la fecha del servicio, las notas del plan y su mensaje personalizado.

El horario y el contenido de los recordatorios se configuran por **tipo de plan**, así que cada tipo de servicio puede mantener su propio calendario.

1. Desde el área de **Servicio**, seleccione el ministerio que contiene el tipo de plan.
2. En la lista de **Tipos de plan**, haga clic en **Editar** junto al tipo de plan.
3. Expanda la sección **Recordatorios** y active **Enviar recordatorios para planes de este tipo**.
4. En **¿Cuándo deben enviarse los recordatorios?**, elija hasta tres momentos: **7 días antes**, **3 días antes**, **2 días antes**, **1 día antes** o **El mismo día**.
5. Establezca la **Hora del día** en que se envían los recordatorios.
6. Opcionalmente, agregue un **Mensaje**. Déjelo en blanco para usar el texto predeterminado del recordatorio.
7. En **Enviar por**, elija **Notificación push**, **Correo electrónico** y, si su iglesia tiene un [proveedor de mensajes de texto](../settings/church-settings.md#texting) conectado, **Mensaje de texto**.
8. Haga clic en **Guardar recordatorios**.

Los recordatorios están desactivados para un tipo de plan hasta que los active.

:::tip
Los voluntarios que aún no han confirmado reciben los botones **Aceptar** y **Rechazar** directamente dentro del correo de recordatorio, así pueden responder sin iniciar sesión.
:::

### Recordatorios por mensaje de texto {#text-reminders}

La opción **Mensaje de texto** solo aparece cuando su iglesia tiene un proveedor de mensajes de texto conectado. Los mensajes se envían a través del proveedor de mensajes de texto de su iglesia, y cada mensaje puede costarle a su iglesia. Un voluntario solo recibe un recordatorio por mensaje de texto si activó **Mensajes de texto** en sus [Preferencias de notificación](../../b1-church/getting-started/notification-preferences.md) y tiene un número celular en su perfil. Cada mensaje empieza con el nombre de su iglesia, se mantiene en un solo mensaje de texto y termina con "Responda STOP para darse de baja". Quien responda STOP deja de recibir mensajes de texto de su iglesia. Para que las respuestas STOP lleguen a B1, pegue la **URL del webhook de mensajes entrantes (STOP)** de su [configuración de mensajes de texto](../settings/church-settings.md#texting) en el webhook de mensajes entrantes de su proveedor.

Para enviar un mensaje de texto a todos los programados en un rango de fechas de inmediato, use **Enviar texto a voluntarios** en el [Resumen de planes](./plans-overview.md#texting-everyone-scheduled).

:::info
Cada recordatorio se envía una sola vez. Los recordatorios por mensaje de texto se envían además de las notificaciones push y los correos electrónicos, no en lugar de ellos.
:::

## Asociar grupos con un tipo de plan

Debajo de la lista de planes, en la página del tipo de plan, la sección **Grupos asociados** le permite decidir qué grupos pueden ver los planes de este tipo desde su portal de miembros. Es una forma rápida de mostrar los servicios próximos a los equipos correctos sin darles acceso de administrador.

1. En la página del tipo de plan, haga clic en **Grupos asociados** en la parte superior de la página (o desplácese hasta esa sección).
2. Haga clic en **Agregar grupo** y elija un grupo del menú desplegable.
3. En la columna **Muestra**, elija si los miembros de ese grupo deben ver **Solo planes pasados**, **Solo planes próximos** o **Planes pasados y próximos** para este tipo de plan.
4. Repita para asociar más grupos, o haga clic en el ícono de papelera para quitar un grupo.

:::info
Solo aparecen en el selector los grupos etiquetados como **Estándar**. Los miembros de un grupo asociado ven automáticamente los planes de este tipo en la página del grupo, en el portal de miembros de B1, limitados al periodo que seleccionó.
:::

Si los planes son lecciones de Lessons.church, los miembros del grupo asociado también ven una tarjeta de **La lección de esta semana** en la página del grupo (la idea principal, el versículo y una pregunta para los padres). Asocie aquí un grupo de padres y establezca el filtro en **Solo planes pasados** para que se incluya la lección de hoy. Los equipos de voluntarios normalmente usan **Solo planes próximos** o **Planes pasados y próximos**.

## Imprimir planes {#printing-plans}

Puede imprimir un plan para repartirlo a su equipo. Abra el plan y haga clic en **Imprimir** en la parte superior de la página para generar una versión imprimible que incluye las asignaciones y el orden de servicio. En la parte superior de la impresión aparece el logotipo de su iglesia (el **Logotipo para fondo claro** de [Sitio web > Apariencia](../website/appearance.md), si ha subido uno) con el nombre de su iglesia debajo, y el nombre del plan, para que las hojas sueltas sean fáciles de identificar. Esto es útil para repartir en los ensayos o publicar en un área común.

La impresión omite todo lo que quedaría vacío. Si no hay voluntarios asignados, no aparece el recuadro del equipo y el orden de servicio usa todo el ancho de la página. Si ningún elemento tiene duración, se omite la columna **Duración**, y si el plan no tiene horarios de servicio ni duraciones, también se omite la columna **Hora**. Para quitar la barra negra del encabezado **Orden de servicio** con la fecha del servicio, desmarque **Mostrar encabezado de Orden de servicio** en la parte superior de la página de impresión; B1 Admin recuerda su elección en ese navegador.

:::info
Los planes se organizan por ministerio. Asegúrese de estar en la pestaña de ministerio correcta antes de crear o ver planes.
:::

## Próximos pasos

- Use el [Resumen de planes](./plans-overview.md) para ver todas las asignaciones próximas de varias semanas en una sola cuadrícula, detectar puestos sin cubrir y asignar voluntarios directamente desde la cuadrícula
- Guarde la estructura de un plan como una [Plantilla de plan](./plan-templates.md) para aplicarla a planes futuros con un solo clic
- Arme su [Orden de servicio](./service-order.md) con canciones, lecturas y otros elementos
- Agregue [canciones](./songs.md) de su biblioteca directamente al orden de servicio
- Use las [Tareas](./tasks.md) para asignar pendientes de seguimiento a los miembros del equipo
- Muestre el contenido de lecciones actuales en un televisor del vestíbulo con [Señalización digital](./digital-signage.md)
