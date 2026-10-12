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
3. Haz clic en un **tipo de plan** para ver la lista de planes para ese tipo. Usa **Próximos** y **Pasados** encima de la lista para alternar entre planes futuros y anteriores.
4. Haz clic en un plan específico para abrirlo.

Cada página de plan muestra enlaces de regreso a su tipo de plan y a **Planes**, para que puedas volver sin usar el botón atrás del navegador.

:::info
El acceso de administrador completo no es necesario para gestionar planes. Cualquiera que sea miembro de un ministerio puede navegar a Servicio y crear, editar y programar planes para su propio ministerio sin necesidad del permiso de Editar Planes. Los editores con el rol de Editar Planes pueden gestionar planes en todos los ministerios.
:::

## Crear un Plan

1. Desde la página del tipo de plan, haz clic en **Nuevo Plan** en la parte superior de la página.
2. Dale un nombre al plan o usa la fecha como nombre. Selecciona la **fecha** para el servicio.
3. Si tu ministerio tiene [plantillas](./plan-templates.md), puedes elegir una en **Empezar desde plantilla** para llenar el orden del servicio, las posiciones y las notas en un solo paso.
4. Si no, y si quieres copiar desde un plan anterior, usa **Copiar desde Plan Anterior** para elegir **Solo Posiciones** o **Posiciones y Asignaciones**. Si no quieres copiar, elige **Nada**. También puedes marcar **Copiar Orden del Servicio**. Cuando copias desde un plan anterior, el nuevo plan también conserva las **Notas**, la **Fecha límite de inscripción**, **Mostrar nombres de voluntarios en la página de inscripción** y la configuración de reemplazo automático, para que no tengas que volver a ingresarlos cada semana. Puedes cambiar cualquiera de ellos en la configuración del nuevo plan.
5. Para configurar varias semanas a la vez mientras copias, ingresa un número en **Repetir semanalmente por esta cantidad de semanas** (hasta 12). B1 crea un plan por semana, cada uno copiado del anterior. Si el plan lleva el nombre de su fecha, cada nuevo plan recibe el nombre de su propia fecha.
6. Opcionalmente, establece la **Fecha límite de inscripción (horas antes del servicio)**. Un nuevo plan empieza con la fecha límite del plan anterior, y puedes cambiarla aquí. Déjala en blanco si no hay fecha límite.
7. Guarda el plan. Ahora puedes comenzar a asignar miembros del equipo y construir el [orden del servicio](./service-order.md).

:::tip
**Repetir semanalmente por esta cantidad de semanas** solo está disponible mientras copias algo del plan anterior (posiciones, asignaciones u orden del servicio).
:::

## La Página de Detalle del Plan

Cuando abres un plan, el nombre del plan, el ministerio, el tipo de plan y la fecha del servicio aparecen en la parte superior, con los botones **Editar** e **Imprimir**. Debajo, todo está en una sola página:

- **[Orden del Servicio](./service-order.md)** -- Construye el orden del servicio con elementos como canciones de adoración, oraciones, anuncios y el sermón.
- **Asignaciones del Equipo de Servicio** -- Gestiona qué miembros del equipo están asignados a este plan. Puedes añadir personas de tus equipos existentes y ver quién ha confirmado o aún está pendiente. Los enlaces encima de las posiciones te permiten abrir las **Notas** y los **Horarios** del plan.

## Asignar Miembros del Equipo {#assigning-team-members}

1. Abre un plan y desplázate hasta **Asignaciones del Equipo de Servicio**.
2. Haz clic en **Añadir Posición**. Completa la información en el formulario añadir una posición. Para el nombre de categoría añade cualquier categoría que te guste. Para permitir que cualquiera en tu iglesia llene la posición (no solo miembros de un equipo), deja el **Grupo de Voluntarios** establecido en **Ninguno**.
3. Haz clic en **Personas Necesarias** y elige voluntarios para llenar esa posición. Si la posición tiene un **Grupo de Voluntarios**, elige de los miembros de ese grupo. Si su Grupo de Voluntarios está establecido en **Ninguno**, puedes buscar a cualquiera en tu iglesia.
4. Añade miembros de tu lista de equipo haciendo clic en **Añadir**.
5. Los miembros asignados aparecerán bajo su equipo con su estado de asignación.
6. Haz clic en notificar a voluntarios para notificarles dentro de la aplicación B1 o por correo electrónico.

Cada posición muestra un chip de recuento (por ejemplo, "2/3") para que puedas ver cuántos espacios están llenos de un vistazo. Bajo el encabezado **Asignaciones del Equipo de Servicio**, un resumen ("X de Y posiciones llenas") muestra tu personal general para el plan, junto con cuántas aún se necesitan, cambiando a **Completamente equipado** una vez que cada posición está cubierta.

:::tip
Configura tus equipos en la configuración del ministerio antes de crear planes. De esta manera, tendrás un grupo listo de voluntarios para asignar.
:::

### Copiar Posiciones en un Plan Vacío {#copying-positions-into-an-empty-plan}

Si un plan aún no tiene posiciones y hay un plan anterior del mismo tipo, aparece un enlace **Copiar desde Plan Anterior** en **Asignaciones del Equipo de Servicio**. Elige **Solo Posiciones** o **Posiciones y Asignaciones** para llenar el plan abierto con las posiciones (y voluntarios) del plan anterior. La copia va al plan actual; no crea un segundo plan para la misma fecha.

## Configuración del Plan

Cada plan tiene configuración adicional que puedes ajustar haciendo clic en **Editar** junto al plan en la lista del tipo de plan, o en el botón **Editar** en la parte superior de la página del plan. Haz clic en **Listo** (o en el nombre del plan) para volver al plan. Estos incluyen:

- **Fecha Límite de Inscripción (horas antes del servicio)** -- el número de horas antes del servicio cuando se cierran las inscripciones de voluntarios. Ingresa un número negativo para mantener las inscripciones abiertas después de la hora de inicio del servicio. Déjalo en blanco si no hay fecha límite.
- **Mostrar nombres de voluntarios en la página de inscripción** -- cuando está marcado, los voluntarios que han iniciado sesión pueden ver quién más ya se ha inscrito para cada posición en la página de inscripción de B1.church. Los nombres nunca se muestran a los visitantes que no han iniciado sesión.
- **Anotado** -- oculta asignaciones a los voluntarios hasta que estés listo para publicar el horario.
- **Programar automáticamente un reemplazo cuando un voluntario rechaza** -- cuando está marcado, si un voluntario asignado rechaza su posición, B1 contactará automáticamente a la siguiente persona disponible en la lista del equipo y preguntará si pueden servir. Esto continúa por la lista hasta que alguien acepte, manteniendo tus posiciones llenas sin seguimiento manual.

## Recordatorios de Voluntarios {#volunteer-reminders}

B1 puede recordar automáticamente a los voluntarios antes de los servicios para los que están programados, para que no tengas que perseguir a tu equipo cada semana. Los recordatorios van a **todos programados** -- tanto aquellos que han confirmado como aquellos que aún no han respondido -- por correo electrónico y como notificación en la aplicación/push. Cada correo de recordatorio incluye la(s) posición(es) del voluntario, la fecha del servicio, las notas del plan y tu mensaje personalizado.

El tiempo de recordatorio y el contenido se establecen por **tipo de plan**, para que cada tipo de servicio pueda mantener su propio horario.

1. Desde el área **Servicio**, selecciona el ministerio que contiene el tipo de plan.
2. En la lista **Tipos de Plan**, haz clic en **Editar** junto al tipo de plan.
3. Expande la sección **Recordatorios** y activa **Enviar recordatorios para planes de este tipo**.
4. Bajo **¿Cuándo deben salir los recordatorios?**, elige hasta tres momentos: **7 días antes**, **3 días antes**, **2 días antes**, **1 día antes** o **El día del servicio**.
5. Establece la **Hora del día** en que salen los recordatorios.
6. Opcionalmente, añade un **Mensaje**. Déjalo en blanco para usar el texto predeterminado del recordatorio.
7. Bajo **Enviar por**, elige **Push**, **Correo electrónico** y, si tu iglesia tiene un [proveedor de mensajes de texto](../settings/church-settings.md#texting) conectado, **Texto**.
8. Haz clic en **Guardar Recordatorios**.

Los recordatorios están desactivados para un tipo de plan hasta que los actives.

:::tip
Los voluntarios que aún no han confirmado obtienen botones **Aceptar** y **Rechazar** directamente dentro del correo de recordatorio, para que puedan responder sin iniciar sesión.
:::

### Recordatorios por Texto {#text-reminders}

La opción **Texto** solo aparece cuando tu iglesia tiene un proveedor de mensajes de texto conectado. Los textos salen a través del proveedor de tu iglesia, y cada texto puede costarle a tu iglesia. Un voluntario solo recibe un recordatorio de texto si ha activado **Mensajes de texto** en sus [Preferencias de Notificación](../../b1-church/getting-started/notification-preferences.md) y tiene un número de móvil en su perfil. Cada texto comienza con el nombre de tu iglesia, se mantiene en un solo mensaje de texto y termina con "Reply STOP to opt out." (Responde STOP para cancelar). Quien responda STOP deja de recibir textos de tu iglesia. Para que las respuestas STOP lleguen a B1, pega la **URL del webhook de STOP entrante** de tu [configuración de mensajes de texto](../settings/church-settings.md#texting) en el webhook de mensajes entrantes de tu proveedor.

Para enviar texto a todos los programados en un rango de fechas de inmediato, usa **Enviar Texto a Voluntarios** en la [Descripción General de Planes](./plans-overview.md#texting-everyone-scheduled).

:::info
Cada recordatorio se envía una sola vez. Los recordatorios de texto se envían además de push y correo electrónico, no en lugar de ellos.
:::

## Asociar Grupos con un Tipo de Plan

Debajo de la lista de planes en la página del tipo de plan, la sección **Grupos Asociados** te permite decidir qué grupos pueden ver los planes para este tipo de plan desde su portal de miembros. Esta es una forma rápida de mostrar servicios próximos a los equipos correctos sin darles acceso de administrador.

1. En la página del tipo de plan, haz clic en **Grupos Asociados** en la parte superior de la página (o desplázate hasta esa sección).
2. Haz clic en **Añadir Grupo** y elige un grupo del menú desplegable.
3. En la columna **Muestra**, elige si los miembros de ese grupo deben ver **Solo planes pasados**, **Solo planes próximos** o **Planes pasados y próximos** para este tipo de plan.
4. Repite para asociar grupos adicionales, o haz clic en el icono papelera para eliminar un grupo.

:::info
Solo los grupos etiquetados como **Estándar** aparecen en el selector. Los miembros de un grupo asociado ven automáticamente los planes de este tipo de plan en la página del grupo en el portal de miembros de B1 -- limitado a la ventana que seleccionaste.
:::

Si los planes son lecciones de Lessons.church, los miembros del grupo asociado también ven una tarjeta **Lección de esta semana** en la página del grupo (línea inferior, versículo y una pregunta para padres). Asocia un grupo de padres aquí y establece el filtro en **Solo planes pasados** para que la lección de hoy se incluya. Los equipos de voluntarios típicamente usan **Solo planes próximos** o **Planes pasados y próximos**.

## Imprimir Planes

Puedes imprimir un plan para distribuir a tu equipo. Abre el plan y haz clic en **Imprimir** en la parte superior de la página para generar una versión imprimible que incluya asignaciones y el orden del servicio. La parte superior de la impresión muestra el nombre de tu iglesia y el nombre del plan, para que las páginas sueltas sean fáciles de identificar. Esto es útil para repartir en ensayos o publicar en un área común.

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
