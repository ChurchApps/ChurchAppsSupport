---
title: "Planes de servicio"
---

# Planes de servicio

<div class="article-intro">

Los planes de servicio organizan quién sirve y cuándo. Cada plan está vinculado a una fecha y a un ministerio específicos, lo que facilita coordinar a tus equipos de voluntarios semana a semana y asegurar que cada servicio tenga todo el personal necesario.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configura tus ministerios y equipos en el área de Serving
- Asegúrate de que los voluntarios estén agregados a tu [directorio de personas](../people/adding-people.md) y asignados a los equipos

</div>

## Acceder a los planes

1. En B1 Admin, abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expande **Serving** y haz clic en **Plans**.
2. Selecciona una **pestaña de ministerio** en la parte superior de la página.
3. Haz clic en un **tipo de plan** para ver la lista de planes de ese tipo. Usa **Upcoming** y **Past** encima de la lista para cambiar entre los planes futuros y los anteriores. **Upcoming** muestra los planes desde hoy en adelante, del más próximo al más lejano, con los planes sin fecha al final. **Past** muestra solo los planes anteriores, del más reciente al más antiguo.
4. Haz clic en un plan específico para abrirlo.

Cada página de plan muestra enlaces de regreso a su tipo de plan y a **Plans**, así puedes subir sin usar el botón de retroceso del navegador.

:::info
No se requiere acceso completo de administrador para gestionar los planes. Cualquier miembro de un ministerio puede ir a Serving y crear, editar y programar planes para su propio ministerio sin necesidad del permiso Plans Edit. Los editores con el rol Plans Edit pueden gestionar los planes de todos los ministerios.
:::

## Crear un plan

1. Desde la página del tipo de plan, haz clic en **New Plan** en la parte superior de la página.
2. Ponle un nombre al plan o usa la fecha como nombre. Selecciona la **fecha** del servicio.
3. Si tu ministerio tiene [plantillas](./plan-templates.md), puedes elegir una en **Start from template** para completar el orden de servicio, las posiciones y las notas en un solo paso.
4. De lo contrario, si quieres copiar de un plan anterior, usa **Copy from Previous Plan** para elegir **Positions Only** o **Positions and Assignments**. Si no quieres copiar, elige **Nothing**. También puedes marcar **Copy Order of Service**. Al copiar de un plan anterior, el nuevo plan también conserva las **Notes**, el **Signup Deadline**, la opción **Show volunteer names on signup page** y la configuración de reemplazo automático de ese plan, para que no tengas que volver a ingresarlos cada semana. Puedes cambiar cualquiera de ellos en la configuración del nuevo plan.
5. Para configurar varias semanas a la vez mientras copias, escribe un número en **Repeat weekly for this many weeks** (hasta 12). B1 crea un plan por semana, cada uno copiado del anterior. Si el plan lleva el nombre de su fecha, cada nuevo plan se nombra según su propia fecha.
6. Opcionalmente, define el **Signup Deadline (hours before service)**. Un plan nuevo empieza con el límite del plan anterior, y puedes cambiarlo aquí. Déjalo en blanco si no quieres un límite.
7. Guarda el plan. Ya puedes empezar a asignar a los miembros del equipo y a armar el [orden de servicio](./service-order.md).

:::tip
**Repeat weekly for this many weeks** solo está disponible mientras copias algo del plan anterior (posiciones, asignaciones u orden de servicio).
:::

## La página de detalle del plan

Cuando abres un plan, el nombre del plan, el ministerio, el tipo de plan y la fecha del servicio aparecen en la parte superior, con los botones **Edit** y **Print**. Debajo, todo está en una sola página:

- **[Order of Service](./service-order.md)** -- Arma el orden de servicio con elementos como canciones de adoración, oraciones, anuncios y el sermón.
- **Serving Team Assignments** -- Administra qué miembros del equipo están asignados a este plan. Puedes agregar personas de tus equipos existentes y ver quién ha confirmado o sigue pendiente. Los enlaces encima de las posiciones te permiten abrir las **Notes** y los **Times** del plan.

## Asignar miembros del equipo

1. Abre un plan y desplázate hasta **Serving Team Assignments**.
2. Haz clic en **Add Position**. Completa la información en el formulario para agregar una posición. Para el nombre de la categoría, escribe la que prefieras. Para que cualquier persona de tu iglesia pueda ocupar la posición (no solo los miembros de un equipo), deja **Volunteer Group** en **None**.
3. Haz clic en **People Needed** y elige a los voluntarios que ocuparán esa posición. Si la posición tiene un **Volunteer Group**, eliges entre los miembros de ese grupo. Si su Volunteer Group está en **None**, puedes buscar a cualquier persona de tu iglesia.
4. Agrega miembros de la lista de tu equipo haciendo clic en **Add**.
5. Los miembros asignados aparecerán bajo su equipo con su estado de asignación.
6. Haz clic en notificar a los voluntarios para avisarles dentro de la app de B1 o por correo electrónico.

Cada posición muestra una etiqueta con el conteo (por ejemplo, "2/3") para que veas de un vistazo cuántos lugares están ocupados. Debajo del encabezado **Serving Team Assignments**, un resumen ("X of Y positions filled") muestra la dotación general del plan, junto con cuántas posiciones faltan, y cambia a **Fully staffed** cuando todas están cubiertas.

:::tip
Configura tus equipos en la configuración del ministerio antes de crear los planes. Así tendrás un grupo de voluntarios listo para asignar.
:::

### Copiar posiciones a un plan vacío

Si un plan todavía no tiene posiciones y existe un plan anterior del mismo tipo, aparece un enlace **Copy from Previous Plan** en **Serving Team Assignments**. Elige **Positions Only** o **Positions and Assignments** para llenar el plan abierto con las posiciones (y voluntarios) del plan anterior. La copia se hace en el plan actual; no crea un segundo plan para la misma fecha.

## Configuración del plan

Cada plan tiene configuraciones adicionales que puedes ajustar haciendo clic en **Edit** junto al plan en la lista del tipo de plan, o en el botón **Edit** en la parte superior de la página del plan. Haz clic en **Done** (o en el nombre del plan) para volver al plan. Entre ellas están:

- **Signup Deadline (hours before service)**: la cantidad de horas antes del servicio en que se cierran las inscripciones de voluntarios. Escribe un número negativo para mantener las inscripciones abiertas después del inicio del servicio. Déjalo en blanco si no hay límite.
- **Show volunteer names on signup page**: cuando está marcado, los voluntarios que inicien sesión pueden ver quién más ya está inscrito en cada posición en la página de inscripción de B1.church. Los nombres nunca se muestran a visitantes que no han iniciado sesión.
- **Penciled in**: oculta las asignaciones a los voluntarios hasta que estés listo para publicar el calendario.
- **Automatically schedule a replacement when a volunteer declines**: cuando está marcado, si un voluntario asignado rechaza su posición, B1 contactará automáticamente a la siguiente persona disponible de la lista del equipo y le preguntará si puede servir. Esto continúa en la lista hasta que alguien acepte, manteniendo las posiciones cubiertas sin seguimiento manual.

:::tip
En la página de inscripción para miembros, las posiciones abiertas de cada plan se muestran por categoría y luego por nombre. Los miembros ven todas las semanas próximas con posiciones abiertas, a menos que actives **Show only the next week of each plan type** en [Configuración > Volunteer Signup](../settings/church-settings.md#volunteer-signup).
:::

## Recordatorios a voluntarios

B1 puede recordar automáticamente a los voluntarios los servicios para los que están programados, para que no tengas que perseguir a tu equipo cada semana. Los recordatorios se envían a **todas las personas programadas**, tanto a las que confirmaron como a las que todavía no han respondido. Cada correo de recordatorio incluye la posición o posiciones del voluntario, la fecha del servicio, las notas del plan y tu mensaje personalizado.

El horario y el contenido de los recordatorios se configuran por **tipo de plan**, así que cada tipo de servicio puede tener su propio calendario.

1. Desde el área **Serving**, selecciona el ministerio que contiene el tipo de plan.
2. En la lista **Plan Types**, haz clic en **Edit** junto al tipo de plan.
3. Expande la sección **Reminders** y activa **Send reminders for plans of this type**.
4. En **When should reminders go out?**, elige hasta tres momentos: **7 days before**, **3 days before**, **2 days before**, **1 day before** o **Day of**.
5. Define la **Time of Day** a la que se envían los recordatorios.
6. Opcionalmente, agrega un **Message**. Déjalo en blanco para usar el texto predeterminado del recordatorio.
7. En **Send By**, elige **Push**, **Email** y, si tu iglesia tiene conectado un [proveedor de mensajes de texto](../settings/church-settings.md#texting), **Text**.
8. Haz clic en **Save Reminders**.

Los recordatorios están desactivados para un tipo de plan hasta que los actives.

:::tip
Los voluntarios que todavía no han confirmado reciben los botones **Accept** y **Decline** directamente en el correo de recordatorio, así pueden responder sin iniciar sesión.
:::

### Recordatorios por mensaje de texto

La opción **Text** solo aparece cuando tu iglesia tiene conectado un proveedor de mensajes de texto. Los mensajes se envían a través del proveedor de tu iglesia, y cada mensaje puede tener un costo para tu iglesia. Un voluntario solo recibe un recordatorio por texto si activó **Text messages** en sus [Preferencias de notificación](../../b1-church/getting-started/notification-preferences.md) y tiene un número de celular en su perfil. Cada mensaje comienza con el nombre de tu iglesia, se mantiene en un solo mensaje de texto y termina con "Reply STOP to opt out" (responde STOP para darte de baja). Cualquier persona que responda STOP deja de recibir mensajes de texto de tu iglesia. Para que las respuestas STOP lleguen a B1, pega la **Inbound (STOP) webhook URL** de tu [configuración de mensajes de texto](../settings/church-settings.md#texting) en el webhook de mensajes entrantes de tu proveedor.

Para enviar un mensaje de texto a todas las personas programadas en un rango de fechas de inmediato, usa **Text Volunteers** en el [Resumen de planes](./plans-overview.md#texting-everyone-scheduled).

:::info
Cada recordatorio se envía una sola vez. Los recordatorios por texto se envían además de los de push y correo electrónico, no en lugar de ellos.
:::

## Asociar grupos con un tipo de plan

Debajo de la lista de planes en la página del tipo de plan, la sección **Associated Groups** te permite decidir qué grupos pueden ver los planes de este tipo desde su portal de miembros. Es una forma rápida de mostrar los servicios próximos a los equipos correctos sin darles acceso de administrador.

1. En la página del tipo de plan, haz clic en **Associated Groups** en la parte superior de la página (o desplázate hasta esa sección).
2. Haz clic en **Add Group** y elige un grupo del menú desplegable.
3. En la columna **Shows**, elige si los miembros de ese grupo deben ver **Past plans only**, **Upcoming plans only** o **Past and upcoming plans** para este tipo de plan.
4. Repite para asociar más grupos, o haz clic en el icono de papelera para quitar un grupo.

:::info
Solo aparecen en el selector los grupos marcados como **Standard**. Los miembros de un grupo asociado ven automáticamente los planes de este tipo en la página del grupo, dentro del portal de miembros de B1, limitados al período que seleccionaste.
:::

Si los planes son lecciones de Lessons.church, los miembros del grupo asociado también ven una tarjeta **This week's lesson** en la página del grupo (la línea principal, el versículo y una pregunta para los padres). Asocia aquí un grupo de padres y configura el filtro en **Past plans only** para que se incluya la lección de hoy. Los equipos de voluntarios normalmente usan **Upcoming plans only** o **Past and upcoming plans**.

## Imprimir planes

Puedes imprimir un plan para repartirlo a tu equipo. Abre el plan y haz clic en **Print** en la parte superior de la página para generar una versión imprimible que incluye las asignaciones y el orden de servicio. En la parte superior de la impresión aparece el logo de tu iglesia (el **Light Background Logo** de [Website > Appearance](../website/appearance.md), si lo has subido) con el nombre de tu iglesia debajo, y el nombre del plan, para que sea fácil identificar las hojas sueltas. Es útil para repartir en los ensayos o publicar en un área común.

:::info
Los planes se organizan por ministerio. Asegúrate de estar en la pestaña de ministerio correcta antes de crear o ver planes.
:::

## Próximos pasos

- Usa el [Resumen de planes](./plans-overview.md) para ver todas las asignaciones próximas de varias semanas en una sola cuadrícula, detectar posiciones sin cubrir y asignar voluntarios directamente desde la cuadrícula
- Guarda la estructura de un plan como una [Plantilla de plan](./plan-templates.md) para aplicarla a planes futuros con un solo clic
- Arma tu [Orden de servicio](./service-order.md) con canciones, lecturas y otros elementos
- Agrega [canciones](./songs.md) de tu biblioteca directamente al orden de servicio
- Usa [Tareas](./tasks.md) para asignar acciones de seguimiento a los miembros del equipo
- Muestra el contenido de la lección actual en una TV del vestíbulo con [Digital Signage](./digital-signage.md)
