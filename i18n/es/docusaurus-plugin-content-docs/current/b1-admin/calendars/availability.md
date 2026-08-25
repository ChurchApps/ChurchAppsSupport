---
title: "Calendario de Disponibilidad"
---

# Calendario de Disponibilidad

<div class="article-intro">

El Calendario de Disponibilidad te da una vista completa de todas las reservaciones de salas y recursos en tu iglesia. Desde aquí puedes ver qué está programado, detectar conflictos antes de que sucedan, y reservar una sala o recurso para cualquier evento directamente.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Configura al menos una [sala o recurso](rooms-resources) en la sección de Salas y Recursos
- Necesitas acceso de edición a la sección de Calendarios en B1 Admin

</div>

## Abriendo el Calendario de Disponibilidad

En B1 Admin, abre el **menú de sección** en la esquina superior izquierda y elige **Calendarios**, luego selecciona **Disponibilidad**.

## Leer el Calendario

El calendario muestra el mes actual por defecto. Puedes navegar hacia adelante y atrás con las flechas en la parte superior, o cambiar entre vistas de mes, semana y día.

Cada evento está codificado por color según el estado de reservación:

| Color | Significado |
|-------|-------------|
| Verde | Aprobado |
| Naranja | Pendiente de aprobación |
| Gris | Bloqueado (no disponible) |

Pasar el cursor sobre un evento muestra el título del evento y la sala o recurso al que está adjunto.

## Filtrar por Sala o Recurso

Usa el menú desplegable **Filtro** en la parte superior izquierda para reducir el calendario a una sola sala o recurso. Selecciona **Todas las Salas y Recursos** para volver a la vista completa.

## Reservar una Sala o Recurso

1. Haz clic en el botón **Reservar** en la esquina superior derecha de la página.
2. En el diálogo que se abre, completa los detalles del evento:
   - **Título** — el nombre del evento
   - **Inicio** y **Fin** fecha/hora
   - **Visibilidad** — Público o Privado
   - **Salas** — selecciona una o más salas para reservar
   - **Recursos** — selecciona uno o más recursos para reservar
3. Opcionalmente establece tiempos de **Preparación** y **Desmontaje** (en minutos). Estos rellenan la reservación en ambos lados para que el espacio esté reservado para preparación y limpieza, aunque los tiempos de inicio/fin del evento permanezcan igual.
4. Para repetir la reservación, marca **Se Repite** y configura la recurrencia:
   - **Repetir cada** -- establece el intervalo (por ejemplo, cada 2 semanas).
   - **Frecuencia** -- Diaria, Semanal o Mensual. Semanal te permite elegir días específicos de la semana; Mensual te permite elegir un día fijo del mes o un patrón relativo como "el segundo martes".
   - **Termina** -- Nunca, en una fecha específica, o después de un número establecido de ocurrencias.
5. Para especificar una ventana de reservación personalizada (diferente del inicio/fin del evento), activa **Ventana de Reservación Personalizada** e ingresa las horas de inicio y fin de la ventana. Usa esto cuando una sala necesita ser accesible fuera de las horas listadas del evento.
6. Haz clic en **Guardar** para enviar la reservación.

:::info
Si la sala o recurso tiene un **Grupo de Aprobación** configurado, la reservación aparecerá como **Pendiente** hasta que un líder de ese grupo la apruebe. Consulta [Aprobaciones de Calendario](approvals) para el flujo de aprobación.
:::

:::tip
El calendario destacará cualquier conflicto antes de que guardes. Si ves un aviso de conflicto, ajusta tus tiempos o elige una sala diferente.
:::

## Artículos Relacionados

- [Salas, Recursos y Programación](rooms-resources) — configura espacios y equipos reservables
- [Aprobaciones de Calendario](approvals) — aprueba o rechaza solicitudes de reservación
- [Crear Calendarios](creating-calendars) — maneja calendarios de eventos
