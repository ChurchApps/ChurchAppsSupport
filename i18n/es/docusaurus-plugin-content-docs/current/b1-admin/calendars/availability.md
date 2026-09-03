---
title: "Calendario de Disponibilidad"
---

# Calendario de Disponibilidad

<div class="article-intro">

El Calendario de Disponibilidad te da una vista de pájaro de todas las reservas de sala y recurso en toda tu iglesia. Desde aquí puedes ver qué está programado, detectar conflictos antes de que sucedan, y reservar una sala o recurso para cualquier evento directamente.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Configura al menos una [sala o recurso](rooms-resources) en la sección Salas y Recursos
- Necesitas acceso de edición a la sección Calendarios en B1 Admin

</div>

## Abriendo el Calendario de Disponibilidad

En B1 Admin, abre el **menú de sección** en la esquina superior izquierda y elige **Calendarios**, luego selecciona **Disponibilidad**.

## Leyendo el Calendario

El calendario muestra el mes actual por defecto. Puedes navegar hacia adelante y hacia atrás con las flechas en la parte superior, o cambiar entre vistas de mes, semana y día.

Cada evento está codificado por color según el estado de reserva:

| Color | Significado |
|-------|---------|
| Verde | Aprobado |
| Naranja | Pendiente de aprobación |
| Gris | Bloqueado (no disponible) |

Pasar el ratón sobre un evento muestra el título del evento y la sala o recurso al que está adjunto.

## Filtrando por Sala o Recurso

Usa el menú **Filtro** en la esquina superior izquierda para reducir el calendario a una sola sala o recurso. Selecciona **Todas las Salas y Recursos** para volver a la vista completa.

## Reservando una Sala o Recurso

1. Haz clic en el botón **Reservar** en la esquina superior derecha de la página.
2. En el diálogo que se abre, completa los detalles del evento:
   - **Título** — el nombre del evento
   - Fecha/hora **Inicio** y **Fin**
   - **Visibilidad** — Público o Privado
   - **Salas** — selecciona una o más salas para reservar
   - **Recursos** — selecciona uno o más recursos para reservar
3. Opcionalmente establece tiempos de **Configuración** y **Desmontaje** (en minutos). Estos rellenan la reserva en ambos extremos para que el espacio se reserve para configuración y limpieza, aunque los tiempos de inicio/fin del evento permanezcan igual.
4. Para repetir la reserva, marca **Repeticiones** y configura la recurrencia:
   - **Repetir cada** -- establece el intervalo (por ejemplo, cada 2 semanas).
   - **Frecuencia** -- Diaria, Semanal, o Mensual. Semanal te permite seleccionar día(s) específico(s) de la semana; Mensual te permite seleccionar un día fijo del mes o un patrón relativo como "el segundo martes".
   - **Termina** -- Nunca, en una fecha específica, o después de un número establecido de ocurrencias.
5. Para especificar una ventana de reserva personalizada (diferente del inicio/fin del evento), alterna **Ventana de Reserva Personalizada** e ingresa los tiempos de inicio y fin de la ventana. Usa esto cuando una sala necesita ser accesible fuera de las horas listadas del evento.
6. Haz clic en **Guardar** para enviar la reserva.

:::info
Si la sala o recurso tiene un **Grupo de Aprobación** configurado, la reserva aparecerá como **Pendiente** hasta que un líder de ese grupo la apruebe. Ver [Aprobaciones de Calendario](approvals) para el flujo de trabajo de aprobación.
:::

:::tip
El calendario destacará cualquier conflicto antes de que guardes. Si ves una advertencia de conflicto, ajusta tus tiempos o elige una sala diferente.
:::

## Artículos Relacionados

- [Salas, Recursos y Programación](rooms-resources) — configura espacios y equipos reservables
- [Aprobaciones de Calendario](approvals) — aprueba o deniega solicitudes de reserva
- [Crear Calendarios](creating-calendars) — administra calendarios de eventos
