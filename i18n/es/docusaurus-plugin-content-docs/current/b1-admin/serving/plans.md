---
title: "Planes de servicio"
---

# Planes de servicio

<div class="article-intro">

Los planes de servicio organizan quién sirve y cuándo. Cada plan está vinculado a una fecha y un ministerio específicos, lo que facilita coordinar a tus equipos de voluntarios semana a semana y asegurar que cada servicio esté completamente cubierto.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configura tus ministerios y equipos en el área de Servicio
- Asegúrate de que los voluntarios se hayan añadido al [directorio de personas](../people/adding-people.md) y asignado a equipos

</div>

## Acceder a los planes

1. En B1 Admin, abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expande **Servicio** y haz clic en **Planes**.
2. Selecciona una **pestaña de ministerio** en la parte superior de la página.
3. Haz clic en un **tipo de plan** para ver la lista de planes de ese tipo. Usa **Próximos** y **Anteriores** encima de la lista para cambiar entre los planes futuros y los anteriores. **Próximos** muestra los planes desde hoy en adelante, del más cercano al más lejano, con los planes sin fecha al final. **Anteriores** muestra solo los planes pasados, del más reciente al más antiguo.
4. Haz clic en un plan específico para abrirlo.

Cada página de plan muestra enlaces de regreso a su tipo de plan y a **Planes**, para que puedas volver sin usar el botón de retroceso del navegador.

:::info
No se requiere acceso de administrador completo para gestionar los planes. Cualquier miembro de un ministerio puede ir a Servicio y crear, editar y programar planes para su propio ministerio sin necesitar el permiso de Editar planes. Los editores con el rol de Editar planes pueden gestionar los planes de todos los ministerios.
:::

## Crear un plan

1. Desde la página del tipo de plan, haz clic en **Nuevo plan** en la parte superior de la página.
2. Ponle un nombre al plan o usa la fecha como nombre. Selecciona la **fecha** del servicio.
3. Si tu ministerio tiene [plantillas](./plan-templates.md), puedes elegir una en **Comenzar desde plantilla** para completar el orden del servicio, las posiciones y las notas en un solo paso.
4. Si no, y quieres copiar de un plan anterior, usa **Copiar del plan anterior** para elegir **Solo posiciones** o **Posiciones y asignaciones**. Si no quieres copiar, elige **Nada**. También puedes marcar **Copiar orden del servicio**. Al copiar de un plan anterior, el nuevo plan también conserva las **Notas**, la **Fecha límite de inscripción**, la opción **Mostrar nombres de voluntarios en la página de inscripción** y la configuración de reemplazo automático de ese plan, para que no tengas que volver a introducirlos cada semana. Puedes cambiar cualquiera de ellos en la configuración del nuevo plan.
5. Para configurar varias semanas a la vez mientras copias, escribe un número en **Repetir semanalmente por esta cantidad de semanas** (hasta 12). B1 crea un plan por semana, cada uno copiado del anterior. Si el plan lleva el nombre de su fecha, cada nuevo plan se nombra con su propia fecha.
6. Opcionalmente, define la **Fecha límite de inscripción (horas antes del servicio)**. Un plan nuevo empieza con la fecha límite del plan anterior, y puedes cambiarla aquí. Déjala en blanco si no quieres fecha límite. Consulta [Configuración del plan](#plan-settings) para ver cómo se calcula la fecha límite.
7. Guarda el plan. Ya puedes empezar a asignar miembros del equipo y a construir el [orden del servicio](./service-order.md).

:::tip
**Repetir semanalmente por esta cantidad de semanas** solo está disponible mientras copias algo del plan anterior (posiciones, asignaciones u orden del servicio).
:::

## La página de detalle del plan

Al abrir un plan, el nombre, el ministerio, el tipo de plan y la fecha del servicio aparecen en la parte superior, con los botones **Editar** e **Imprimir**. Debajo, todo está en una sola página:

- **[Orden del servicio](./service-order.md)** -- Construye el orden del servicio con elementos como canciones de alabanza, oraciones, anuncios y el sermón.
- **Asignaciones del equipo de servicio** -- Gestiona qué miembros del equipo están asignados a este plan. Puedes añadir personas de tus equipos existentes y ver quién ha confirmado y quién sigue pendiente. Los enlaces encima de las posiciones te permiten abrir las **Notas** y los **Horarios** del plan.

## Asignar miembros del equipo

1. Abre un plan y desplázate hasta **Asignaciones del equipo de servicio**.
2. Haz clic en **Añadir posición**. Completa la información en el formulario de añadir posición. Para el nombre de la categoría, escribe la categoría que quieras. Para permitir que cualquier persona de tu iglesia ocupe la posición (no solo los miembros de un equipo), deja **Grupo de voluntarios** en **Ninguno**.
3. Haz clic en **Personas necesarias** y elige los voluntarios para ocupar esa posición. Si la posición tiene un **Grupo de voluntarios**, eliges entre los miembros de ese grupo. Si su Grupo de voluntarios está en **Ninguno**, puedes buscar a cualquier persona de tu iglesia.
4. Añade miembros de la lista de tu equipo haciendo clic en **Añadir**.
5. Los miembros asignados aparecerán debajo de su equipo con su estado de asignación.
6. Haz clic en notificar a los voluntarios para avisarles dentro de la aplicación de B1 o por correo electrónico. Si el plan usa un [flujo de confirmación](#plan-settings), notificar también inicia una tarjeta de flujo de trabajo que da seguimiento a cada solicitud hasta que el voluntario responda.

Cada posición muestra una etiqueta con el conteo (por ejemplo, "2/3") para que veas de un vistazo cuántos lugares están ocupados. Debajo del encabezado **Asignaciones del equipo de servicio**, un resumen ("X de Y posiciones ocupadas") muestra la cobertura general del plan, junto con cuántas faltan. Cambia a **Totalmente cubierto** cuando todas las posiciones estén cubiertas.

:::tip
Configura tus equipos en la configuración del ministerio antes de crear los planes. Así tendrás un grupo de voluntarios listo para asignar.
:::

### Copiar posiciones a un plan vacío

Si un plan todavía no tiene posiciones y existe un plan anterior del mismo tipo, aparece un enlace **Copiar del plan anterior** en **Asignaciones del equipo de servicio**. Elige **Solo posiciones** o **Posiciones y asignaciones** para llenar el plan que tienes abierto con las posiciones (y voluntarios) del plan anterior. La copia se hace en el plan actual; no crea un segundo plan para la misma fecha.

## Configuración del plan

Cada plan tiene opciones adicionales que puedes configurar haciendo clic en **Editar** junto al plan en la lista del tipo de plan, o en el botón **Editar** en la parte superior de la página del plan. Haz clic en **Listo** (o en el nombre del plan) para volver al plan. Entre estas opciones se incluyen:

- **Fecha límite de inscripción (horas antes del servicio)** -- la cantidad de horas antes del servicio en que se cierran las inscripciones de voluntarios. Las horas se cuentan hacia atrás desde el primer horario de **Servicio** del plan (los ensayos y otros horarios se omiten, a menos que el plan no tenga nada más), de modo que una fecha límite de 2 horas para un servicio a las 10:00 a. m. cierra las inscripciones a las 8:00 a. m. ese mismo día. Si el plan no tiene horarios, la fecha límite se cuenta desde las 9:00 a. m. del día del servicio, en la zona horaria de tu iglesia. Cuando pasa, los voluntarios no pueden inscribirse ni retirarse. Escribe un número negativo para mantener las inscripciones abiertas después del inicio del servicio. Déjala en blanco, o bórrala, si no quieres fecha límite.
- **Flujo de confirmación** -- elige un [flujo de trabajo de confirmación de asignaciones de servicio](./workflows.md#serving-assignment-confirmations) para dar seguimiento por correo electrónico y mensaje de texto a las solicitudes de servicio de este plan, hasta que cada voluntario acepte o rechace. Cuando **notificas** a los voluntarios de un plan publicado, cada nueva solicitud recibe su propia tarjeta en el tablero de ese flujo, y una nota encima del enlace de notificar dice *"Las nuevas solicitudes usan el flujo de confirmación."* Deja la opción en **Usar notificaciones de asignación existentes** para mantener las notificaciones habituales. Solo aparecen en la lista los flujos de confirmación activos; créalo primero en **Servicio > Flujos de trabajo**.
- **Mostrar nombres de voluntarios en la página de inscripción** -- cuando está marcada, los voluntarios que han iniciado sesión pueden ver quiénes más están inscritos en cada posición en la página de inscripción de B1.church. Los nombres nunca se muestran a visitantes que no han iniciado sesión.
- **En lápiz** -- oculta las asignaciones a los voluntarios hasta que estés listo para publicar el calendario.
- **Programar automáticamente un reemplazo cuando un voluntario rechace** -- cuando está marcada, si un voluntario asignado rechaza su posición, B1 contactará automáticamente a la siguiente persona disponible de la lista del equipo y le preguntará si puede servir. Esto continúa en la lista hasta que alguien acepte, manteniendo las posiciones cubiertas sin seguimiento manual.

:::tip
En la página de inscripción de miembros, las posiciones abiertas de cada plan se listan por categoría y luego por nombre. Los miembros ven todas las semanas próximas con posiciones abiertas, a menos que actives **Mostrar solo la siguiente semana de cada tipo de plan** en [Configuración > Inscripción de voluntarios](../settings/church-settings.md#volunteer-signup).
:::

## Recordatorios a voluntarios {#volunteer-reminders}

B1 puede recordar automáticamente a los voluntarios los servicios para los que están programados, para que no tengas que perseguir a tu equipo cada semana. Los recordatorios se envían a **todas las personas programadas**, tanto a las que han confirmado como a las que aún no han respondido. La excepción es una solicitud enviada a través de un [flujo de confirmación](./workflows.md#serving-assignment-confirmations): ese voluntario recibe recordatorios solo después de aceptar, ya que el flujo se encarga del seguimiento hasta entonces. Cada correo de recordatorio incluye la(s) posición(es) del voluntario, la fecha del servicio, las notas del plan y tu mensaje personalizado.

El momento y el contenido de los recordatorios se configuran por **tipo de plan**, para que cada tipo de servicio pueda tener su propio calendario.

1. Desde el área de **Servicio**, selecciona el ministerio que contiene el tipo de plan.
2. En la lista de **Tipos de plan**, haz clic en **Editar** junto al tipo de plan.
3. Expande la sección **Recordatorios** y activa **Enviar recordatorios para planes de este tipo**.
4. En **¿Cuándo deben salir los recordatorios?**, elige hasta tres momentos: **7 días antes**, **3 días antes**, **2 días antes**, **1 día antes** o **El mismo día**.
5. Define la **Hora del día** a la que salen los recordatorios.
6. Opcionalmente, añade un **Mensaje**. Déjalo en blanco para usar el texto predeterminado del recordatorio.
7. En **Enviar por**, elige **Push**, **Correo electrónico** y, si tu iglesia tiene conectado un [proveedor de mensajes de texto](../settings/church-settings.md#texting), **Texto**.
8. Haz clic en **Guardar recordatorios**.

Los recordatorios están desactivados para un tipo de plan hasta que los actives.

:::tip
Los voluntarios que aún no han confirmado reciben los botones **Aceptar** y **Rechazar** dentro del correo de recordatorio, para que puedan responder sin iniciar sesión.
:::

### Recordatorios por mensaje de texto

La opción **Texto** solo aparece cuando tu iglesia tiene conectado un proveedor de mensajes de texto. Los mensajes se envían a través del proveedor de tu iglesia, y cada mensaje puede generar un costo para ella. Un voluntario solo recibe un recordatorio por texto si ha activado **Mensajes de texto** en sus [Preferencias de notificación](../../b1-church/getting-started/notification-preferences.md) y tiene un número de celular en su perfil. Cada mensaje comienza con el nombre de tu iglesia, se mantiene en un solo mensaje de texto y termina con "Responde STOP para cancelar." Quien responda STOP deja de recibir mensajes de texto de tu iglesia. Para que las respuestas STOP lleguen a B1, pega la **URL del webhook de entrada (STOP)** de tu [configuración de mensajes de texto](../settings/church-settings.md#texting) en el webhook de mensajes entrantes de tu proveedor.

Para enviar un texto de inmediato a todas las personas programadas en un rango de fechas, usa **Enviar mensaje a voluntarios** en el [Resumen de planes](./plans-overview.md#texting-everyone-scheduled).

:::info
Cada recordatorio se envía una sola vez. Los recordatorios por texto se envían además de los de push y correo electrónico, no en lugar de ellos.
:::

## Asociar grupos con un tipo de plan

Debajo de la lista de planes, en la página del tipo de plan, la sección **Grupos asociados** te permite decidir qué grupos pueden ver los planes de este tipo desde su portal de miembros. Es una forma rápida de mostrar los próximos servicios a los equipos correctos sin darles acceso de administrador.

1. En la página del tipo de plan, haz clic en **Grupos asociados** en la parte superior de la página (o desplázate hasta esa sección).
2. Haz clic en **Añadir grupo** y elige un grupo del menú desplegable.
3. En la columna **Muestra**, elige si los miembros de ese grupo deben ver **Solo planes pasados**, **Solo planes próximos** o **Planes pasados y próximos** para este tipo de plan.
4. Repite para asociar más grupos, o haz clic en el icono de la papelera para quitar un grupo.

:::info
Solo aparecen en el selector los grupos etiquetados como **Estándar**. Los miembros de un grupo asociado ven automáticamente los planes de este tipo en la página del grupo dentro del portal de miembros de B1, limitados al período que seleccionaste.
:::

Si los planes son lecciones de Lessons.church, los miembros del grupo asociado también ven una tarjeta **La lección de esta semana** en la página del grupo (línea principal, versículo y una pregunta para los padres). Asocia aquí un grupo de padres y configura el filtro en **Solo planes pasados** para que la lección de hoy quede incluida. Los equipos de voluntarios normalmente usan **Solo planes próximos** o **Planes pasados y próximos**.

## Imprimir planes

Puedes imprimir un plan para distribuirlo a tu equipo. Abre el plan y haz clic en **Imprimir** en la parte superior de la página para generar una versión imprimible que incluye las asignaciones y el orden del servicio. La parte superior de la impresión muestra el logotipo de tu iglesia (el **Logotipo para fondo claro** de [Sitio web > Apariencia](../website/appearance.md), si lo has subido), con el nombre de tu iglesia debajo, y el nombre del plan, para que las hojas sueltas sean fáciles de identificar. Es útil para repartir en los ensayos o publicar en un área común.

:::info
Los planes se organizan por ministerio. Asegúrate de estar en la pestaña del ministerio correcto antes de crear o ver planes.
:::

## Próximos pasos

- Usa el [Resumen de planes](./plans-overview.md) para ver todas las asignaciones próximas de varias semanas en una sola cuadrícula, detectar posiciones sin cubrir y asignar voluntarios directamente desde la cuadrícula
- Guarda la estructura de un plan como [plantilla de plan](./plan-templates.md) para aplicarla a planes futuros con un solo clic
- Construye tu [orden del servicio](./service-order.md) con canciones, lecturas y otros elementos
- Añade [canciones](./songs.md) de tu biblioteca directamente al orden del servicio
- Usa [Tareas](./tasks.md) para asignar acciones de seguimiento a los miembros del equipo
- Muestra el contenido actual de las lecciones en un televisor del vestíbulo con [Señalización digital](./digital-signage.md)
