---
title: "Calendario de Disponibilidad"
---

# Calendario de Disponibilidad

<div class="article-intro">

El Calendario de Disponibilidad le proporciona una vista de pájaro de todas las reservas de salas y recursos en toda su iglesia. Desde aquí puede ver qué está programado, ver conflictos antes de que sucedan, y reservar una sala o recurso para cualquier evento directamente.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Configure al menos una [sala o recurso](rooms-resources) en la sección Rooms & Resources
- Necesita acceso de edición a la sección Calendars en B1 Admin

</div>

## Abriendo el Calendario de Disponibilidad

En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda), expanda **Calendars**, y haga clic en **Availability**.

## Leyendo el Calendario

El calendario muestra el mes actual por defecto. Puede navegar hacia adelante y atrás con las flechas en la parte superior, o cambiar entre vistas de mes, semana y día.

Cada evento está codificado por color según el estado de reserva:

| Color | Significado |
|-------|---------|
| Verde | Aprobado |
| Naranja | Pendiente de aprobación |
| Gris | Bloqueado (no disponible) |

Pasar el mouse sobre un evento muestra el título del evento y la sala o recurso al que está adjunto.

## Filtrando por Sala o Recurso

Use el menú desplegable **Filter** en la esquina superior izquierda para reducir el calendario a una sola sala o recurso. Seleccione **All Rooms & Resources** para volver a la vista completa.

## Reservar una Sala o Recurso

1. Haga clic en el botón **Book** en la esquina superior derecha de la página.
2. En el diálogo que se abre, complete los detalles del evento:
   - **Title** — el nombre del evento
   - **Start** y **End** fecha/hora
   - **Visibility** — Public o Private
   - **Rooms** — seleccione una o más salas para reservar
   - **Resources** — seleccione uno o más recursos para reservar
3. Opcionalmente configure los tiempos **Setup** y **Teardown** (en minutos). Estos rellenan la reserva en ambos lados para que el espacio esté reservado para configuración y limpieza, aunque los tiempos de inicio/fin del evento se mantengan igual.
4. Para repetir la reserva, marque **Repeats** y configure la recurrencia:
   - **Repeat every** -- configure el intervalo (por ejemplo, cada 2 semanas).
   - **Frequency** -- Daily, Weekly, o Monthly. Weekly permite elegir días específicos de la semana; Monthly permite elegir un día fijo del mes o un patrón relativo como "el segundo martes."
   - **Ends** -- Never, en una fecha específica, o después de un número fijo de ocurrencias.
5. Para especificar una ventana de reserva personalizada (diferente del inicio/fin del evento), alterne **Custom Booking Window** e ingrese los tiempos de inicio y fin de la ventana. Use esto cuando una sala necesite ser accesible fuera de las horas indicadas del evento.
6. Haga clic en **Save** para enviar la reserva.

:::info
Si la sala o recurso tiene un **Approval Group** configurado, la reserva aparecerá como **Pending** hasta que un líder de ese grupo la apruebe. Consulte [Aprobaciones de Calendario](approvals) para el flujo de trabajo de aprobación.
:::

:::tip
El calendario destacará cualquier conflicto antes de que guarde. Si ve una advertencia de conflicto, ajuste sus tiempos o elija una sala diferente.
:::

## Artículos Relacionados

- [Salas, Recursos y Programación](rooms-resources) — configure espacios y equipos reservables
- [Aprobaciones de Calendario](approvals) — apruebe o rechace solicitudes de reserva
- [Creando Calendarios](creating-calendars) — administre calendarios de eventos
