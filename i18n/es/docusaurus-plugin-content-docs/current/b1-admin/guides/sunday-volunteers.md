---
title: "Guía: Administre a los voluntarios del domingo"
description: "Configure equipos de voluntarios, planes de servicio semanales, órdenes de servicio y tareas dominicales en B1 Admin, para que los voluntarios vean y respondan a sus asignaciones en B1.church y en la aplicación móvil."
---

# Administre a los voluntarios del domingo

<div class="article-intro">

Configure sus equipos de voluntarios, cree planes de servicio semanales, asigne posiciones, arme órdenes de servicio con canciones de adoración y asigne tareas dominicales. Al terminar, sus voluntarios verán sus asignaciones en el sitio web y la aplicación móvil de B1, y podrán aceptarlas o rechazarlas directamente.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Cuenta de B1 Admin con acceso de administrador
- Voluntarios [agregados a su directorio de personas](../people/adding-people.md)

</div>

## Paso 1: Cree equipos de voluntarios {#step-1-create-volunteer-teams}

Organice a sus voluntarios en equipos para administrar las asignaciones por área de ministerio. Los equipos se encuentran dentro de un ministerio en el área de Serving.

Siga las guías [Serving](../serving/index.md) y [Miembros del grupo](../groups/group-members.md) para:

1. En el [menú Jump](../introduction.md#getting-around-with-the-jump-menu), elija **Serving > Plans** y haga clic en **Add Ministry** para crear un ministerio (por ejemplo, "Domingo por la mañana")
2. Seleccione la pestaña del ministerio y haga clic en **Create Serving Team** (o **New Serving Team**) para agregar equipos como "Equipo de adoración", "Sonido y medios", "Recibidores", "Voluntarios de ministerio infantil"
3. Abra cada equipo y agregue voluntarios buscando su nombre en el cuadro **Add Person**

:::tip
Designe a los líderes de equipo con el icono de estrella (**Make Leader**) en la lista de miembros del equipo. Los líderes pueden administrar el calendario de su propio grupo y coordinar a su equipo.
:::

## Paso 2: Cree su biblioteca de canciones {#step-2-build-your-song-library}

Agregue canciones de adoración para poder incorporarlas en los planes de servicio cada semana.

Siga la guía [Canciones](../serving/songs.md) para:

1. En el menú Jump, elija **Serving > Songs**, haga clic en **Add Song** y busque la canción en la base de datos por título o artista (o haga clic en **Create Manually**)
2. Para cada canción, agregue arreglos con letra y tonalidades
3. Agregue enlaces externos a interpretaciones en YouTube, cifrados de acordes o partituras, y suba audio de ensayo si lo tiene

:::info
Las canciones agregadas aquí se pueden incorporar después en cualquier plan de servicio. Cree su biblioteca una sola vez y reutilícela cada semana.
:::

## Paso 3: Cree un plan de servicio {#step-3-create-a-service-plan}

Los planes son las asignaciones semanales que indican dónde se necesitan voluntarios.

Siga la guía [Planes](../serving/plans.md) para:

1. En el menú Jump, elija **Serving > Plans**, seleccione la pestaña de su ministerio y abra su tipo de plan (haga clic en **Create Plan Type** si todavía no tiene uno)
2. Haga clic en **New Plan** y seleccione la **Service Date**. Para configurar varios domingos a la vez, copie desde un plan anterior, elija **Repeat every** y **Frequency**, e introduzca cuántos en **Number of plans**
3. En la página del plan, haga clic en **Manage serving team**, haga clic en **Add Position** para agregar cada posición y luego haga clic en su enlace **People Needed** para asignar voluntarios
4. En el panel **Validation**, haga clic en el enlace **Notify _N_ volunteer(s)** para que los voluntarios reciban sus solicitudes (consulte [Notificar a los voluntarios](../serving/plan-validation.md#notifying-volunteers)). Un punto verde en la foto de un voluntario significa que aceptó y un punto rojo significa que rechazó; el recuadro **Responses** de la página del plan cuenta los que aceptaron, los pendientes y los que rechazaron
5. Active los [recordatorios para voluntarios](../serving/plans.md#volunteer-reminders) para el tipo de plan, de modo que reciban un recordatorio por notificación push, correo electrónico o mensaje de texto antes de cada servicio

## Paso 4: Arme la orden de servicio {#step-4-build-the-service-order}

Defina el flujo de su servicio de principio a fin.

Siga la guía [Orden de servicio](../serving/service-order.md) para:

1. Abra su plan y haga clic en **Edit order of service** en la sección **Order of Service**
2. Haga clic en **Add** para agregar secciones, canciones (de su biblioteca) y elementos como oraciones, lecturas de las Escrituras, anuncios, sermón, ofrenda y cierre
3. Arrastre y suelte los elementos para reordenar el flujo del servicio

:::info
Las órdenes de servicio son específicas de cada plan. Los cambios que haga aquí no afectan a otros planes ni a la biblioteca maestra de canciones.
:::

## Paso 5: Asigne tareas dominicales {#step-5-assign-sunday-tasks}

Haga seguimiento de las responsabilidades puntuales del domingo para que nada quede sin hacer.

Siga la guía [Tareas](../serving/tasks.md) para:

1. Cree tareas para responsabilidades como "Preparar los elementos de la Santa Cena", "Imprimir los boletines" o "Instalar el equipo de sonido"
2. Asigne cada tarea a la persona o grupo responsable
3. Las tareas aparecen en **Serving > My Work**, en el panel de la persona asignada y en la aplicación móvil

:::info
B1 Admin ya no crea tareas con un calendario repetitivo. Para procesos repetitivos que llevan a las personas por una serie de pasos, use [Flujos de trabajo](../serving/workflows.md) con un disparador de programación.
:::

## Paso 6: Active el registro de autoservicio (opcional) {#step-6-enable-self-service-signup-optional}

Permita que los voluntarios se inscriban por sí mismos en las posiciones en lugar de esperar a que un administrador los asigne.

1. Al crear un plan, o en **Edit details** en la página del plan, configure **Signup Deadline (hours before service)** para definir cuándo se cierra el registro de autoservicio. Las horas se cuentan hacia atrás desde la hora del primer servicio del plan. Déjelo en blanco si no quiere fecha límite. Los planes nuevos empiezan con la fecha límite del plan anterior.
2. Opcionalmente, marque **Show volunteer names on signup page** (en **Edit details**) para que los voluntarios que hayan iniciado sesión puedan ver quiénes más están inscritos.
3. En el cuadro de diálogo **Add a Position** de cada posición, marque **Allow Self-Signup** para que esté disponible para el autoservicio.
4. Agregue una **Description** a cada posición para que los voluntarios sepan en qué consiste el rol.

Una vez creadas las posiciones de autoservicio, aparecerán automáticamente en las páginas de inscripción de voluntarios de [B1.church y en la aplicación B1](../../b1-church/serving/volunteer-signup.md). Los miembros pueden explorar las posiciones abiertas, ver cuántos lugares quedan e inscribirse con un solo clic.

:::tip
Combine posiciones asignadas por el administrador y posiciones de autoservicio en el mismo plan. Por ejemplo, asigne directamente a su líder de adoración, pero permita que los recibidores y los encargados del café se inscriban por sí mismos.
:::

## Paso 7: Infórmeles a los voluntarios {#step-7-let-volunteers-know}

Los voluntarios asignados ven automáticamente sus planes y pueden responder.

1. Los voluntarios ven sus planes en [B1.church y en la aplicación B1](../../b1-church/plans/viewing-plans.md)
2. Pueden aceptar o rechazar asignaciones directamente desde su teléfono o computadora
3. Pueden marcar fechas de no disponibilidad para las semanas en las que no puedan participar
4. Los planes se pueden imprimir para los ensayos o publicar detrás del escenario
5. Los voluntarios pueden explorar e inscribirse en las posiciones abiertas a través de la [página de inscripción de voluntarios](../../b1-church/serving/volunteer-signup.md)

:::tip
Las notificaciones push de la aplicación B1 avisan a los voluntarios cuando reciben nuevas asignaciones o cuando cambian los planes.
:::

## ¡Listo! {#youre-done}

Su sistema de administración de voluntarios está configurado. Cada semana, cree un nuevo plan, asigne las posiciones, y su equipo verá todo en su teléfono o computadora.

## Artículos relacionados {#related-articles}

- [Serving](../serving/index.md): configure ministerios y equipos de servicio
- [Miembros del grupo](../groups/group-members.md): agregue y administre a los miembros del equipo
- [Planes](../serving/plans.md): cree y administre planes de servicio
- [Orden de servicio](../serving/service-order.md): arme el flujo de un servicio
- [Canciones](../serving/songs.md): administre su biblioteca de canciones de adoración
- [Tareas](../serving/tasks.md): asigne tareas a personas o grupos
- [Flujos de trabajo](../serving/workflows.md): lleve a las personas por procesos repetibles con disparadores y pasos automatizados
- [Ver planes](../../b1-church/plans/viewing-plans.md): cómo los voluntarios ven sus planes
- [Inscripción de voluntarios](../../b1-church/serving/volunteer-signup.md): cómo los miembros eligen posiciones de voluntariado por sí mismos
