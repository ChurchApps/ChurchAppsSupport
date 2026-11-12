---
title: "Calendario de disponibilidad"
description: "Configure salas y equipos reservables en B1 Admin, luego resérvelos en el calendario, añada márgenes de preparación y limpieza, y gestione reservas recurrentes o que requieren aprobación."
---

# Calendario de disponibilidad

<div class="article-intro">

El Calendario de disponibilidad le ofrece una vista panorámica de todas las reservas de salas y recursos de su iglesia. Desde aquí puede ver qué está programado, detectar conflictos antes de que ocurran y reservar una sala o recurso para cualquier evento directamente.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configure al menos una [sala o recurso](./rooms-resources.md) en la sección Salas y recursos
- Necesita el permiso **Editar contenido**

</div>

## Abrir el Calendario de disponibilidad {#opening-the-availability-calendar}

En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), despliegue **Calendarios** y haga clic en **Disponibilidad**.

## Leer el calendario {#reading-the-calendar}

El calendario muestra el mes actual de forma predeterminada. Use **Hoy**, **Atrás** y **Siguiente** en la parte superior para moverse, y **Mes**, **Semana**, **Día** o **Agenda** para cambiar la vista.

Cada reserva tiene un color según su estado:

| Color | Significado |
|-------|-------------|
| Verde | Aprobada |
| Naranja | Pendiente de aprobación |
| Gris | Bloqueada (no disponible), mostrada como *Bloqueada: motivo* |

Cada reserva muestra el título del evento seguido de las salas y recursos que utiliza. Pase el cursor sobre una reserva para ver el texto completo. Haga clic en una reserva para abrir su evento y editarlo.

## Filtrar por sala o recurso {#filtering-by-room-or-resource}

Use el menú desplegable **Sala / Recurso** en la parte superior izquierda para reducir el calendario a una sola sala o recurso. Seleccione **Todas las salas y recursos** para volver a la vista completa.

## Reservar una sala o recurso {#booking-a-room-or-resource}

1. Haga clic en el botón **Reservar** en la parte superior de la página.
2. Se abre el cuadro de diálogo **Nuevo evento**: el mismo editor que se usa en un calendario (consulte [Añadir y editar eventos](./creating-calendars.md#adding-and-editing-events)). Complete los detalles del evento:
   - **Grupo** *(obligatorio)*: el grupo al que pertenece el evento. Si tiene [plantillas](./rooms-resources.md#event-templates), también puede elegir una **Plantilla** para completar el resto.
   - **Título** *(obligatorio)*
   - **Inicio** y **Fin**, fecha y hora *(obligatorios; el Fin debe ser posterior al Inicio)*
   - **Visibilidad**: Pública o Privada
   - **Salas**: seleccione una o más salas para reservar
   - **Recursos**: seleccione uno o más recursos para reservar
3. Una vez seleccionada una sala o recurso, puede configurar **Preparación (min antes)** y **Limpieza (min después)**. Estos márgenes amplían la reserva en ambos extremos para que el espacio quede reservado para la preparación y la limpieza, aunque las horas de inicio y fin del evento no cambien.
4. Para repetir la reserva, establezca primero el **Inicio** y luego marque **Se repite** y configure la recurrencia:
   - **Intervalo**: con qué frecuencia se repite (por ejemplo, 2 con Semana para cada 2 semanas).
   - **Frecuencia**: Día, Semana o Mes. La opción Semanal le permite elegir día(s) específicos de la semana; la Mensual le permite elegir un día fijo del mes o un patrón relativo como "el segundo martes".
   - **Termina**: **Nunca**, **En** una **Fecha de fin** específica, o **Después de** un número determinado de ocurrencias.
5. Para especificar una ventana de reserva personalizada (distinta de la hora de inicio/fin del evento), active **Ventana de reserva personalizada** e introduzca **Reservar desde** y **Reservar hasta**. Esto reemplaza los minutos de preparación y limpieza. Úselo cuando una sala deba estar accesible fuera del horario indicado del evento.
6. Haga clic en **Guardar** para enviar la reserva.

:::info
Si la sala o recurso tiene configurado un **Grupo de aprobación**, la reserva aparecerá como **Pendiente** hasta que se apruebe en la página de Aprobaciones, a menos que usted sea miembro de ese grupo, en cuyo caso se aprueba de inmediato. Consulte [Aprobaciones del calendario](./approvals.md) para el flujo de aprobación.
:::

:::tip
El editor muestra una advertencia antes de guardar si una sala o recurso ya está reservado o bloqueado en ese momento. Si ve una advertencia de conflicto, ajuste sus horarios o elija otra sala.
:::

## Artículos relacionados {#related-articles}

- [Salas, recursos y programación](./rooms-resources.md): configure espacios y equipos reservables
- [Aprobaciones del calendario](./approvals.md): apruebe o rechace solicitudes de reserva
- [Creación de calendarios](./creating-calendars.md): administre los calendarios de eventos
