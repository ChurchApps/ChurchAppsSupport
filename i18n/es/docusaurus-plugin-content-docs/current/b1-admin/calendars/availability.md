---
title: "Calendario de disponibilidad"
---

# Calendario de disponibilidad

<div class="article-intro">

El Calendario de disponibilidad te ofrece una vista general de todas las reservas de salas y recursos en tu iglesia. Desde aquí puedes ver qué está programado, detectar conflictos antes de que ocurran y reservar una sala o recurso para cualquier evento directamente.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configura al menos una [sala o recurso](rooms-resources) en la sección Salas y recursos
- Necesitas acceso de edición a la sección Calendarios en B1 Admin

</div>

## Abriendo el Calendario de disponibilidad

En B1 Admin, ve a **Calendarios** y selecciona **Disponibilidad** en la barra lateral.

## Leyendo el calendario

El calendario muestra el mes actual por defecto. Puedes navegar adelante y atrás con las flechas en la parte superior, o cambiar entre vistas de mes, semana y día.

Cada evento está codificado por color según el estado de la reserva:

| Color | Significado |
|-------|---------|
| Verde | Aprobado |
| Naranja | Pendiente de aprobación |
| Gris | Bloqueado (no disponible) |

Pasar el cursor sobre un evento muestra el título del evento y la sala o recurso adjunto.

## Filtrar por sala o recurso

Usa el menú desplegable **Filtro** en la parte superior izquierda para limitar el calendario a una sola sala o recurso. Selecciona **Todas las salas y recursos** para volver a la vista completa.

## Reservar una sala o recurso

1. Haz clic en el botón **Reservar** en la esquina superior derecha de la página.
2. En el diálogo que se abre, completa los detalles del evento:
   - **Título** — el nombre del evento
   - **Inicio** y **Fin** fecha/hora
   - **Visibilidad** — Público o Privado
   - **Salas** — selecciona una o más salas para reservar
   - **Recursos** — selecciona uno o más recursos para reservar
3. Opcionalmente, establece tiempos de **Preparación** y **Desmontaje** (en minutos). Estos extienden la reserva en ambos extremos para que el espacio esté reservado para preparación y limpieza, aunque los tiempos de inicio/fin del evento permanezcan igual.
4. Para repetir la reserva, marca **Se repite** y configura la recurrencia:
   - **Repetir cada** -- establece el intervalo (por ejemplo, cada 2 semanas).
   - **Frecuencia** -- Diario, Semanal o Mensual. Semanal te permite elegir día(s) específico(s) de la semana; Mensual te permite elegir un día fijo del mes o un patrón relativo como "el segundo martes".
   - **Termina** -- Nunca, en una fecha específica, o después de un número determinado de ocurrencias.
5. Para especificar una ventana de reserva personalizada (diferente del inicio/fin del evento), activa **Ventana de reserva personalizada** e ingresa los tiempos de inicio y fin de la ventana. Úsalo cuando una sala necesita ser accesible fuera de las horas listadas del evento.
6. Haz clic en **Guardar** para enviar la reserva.

:::info
Si la sala o recurso tiene un **Grupo de aprobación** configurado, la reserva aparecerá como **Pendiente** hasta que un líder de ese grupo la apruebe. Consulta [Aprobaciones de calendario](approvals) para el flujo de aprobación.
:::

:::tip
El calendario resaltará cualquier conflicto antes de que guardes. Si ves una advertencia de conflicto, ajusta tus tiempos o elige una sala diferente.
:::

## Artículos relacionados

- [Salas, recursos y programación](rooms-resources) — configura espacios y equipos reservables
- [Aprobaciones de calendario](approvals) — aprueba o rechaza solicitudes de reserva
- [Crear calendarios](creating-calendars) — gestiona calendarios de eventos
