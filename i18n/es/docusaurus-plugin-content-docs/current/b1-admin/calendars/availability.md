---
title: "Calendario de Disponibilidad"
---

# Calendario de Disponibilidad

<div class="article-intro">

El Calendario de Disponibilidad le brinda una vista panorámica de todas las reservas de salas y recursos en su iglesia. Desde aquí puede ver qué está programado, detectar conflictos antes de que ocurran y reservar directamente una sala o recurso para cualquier evento.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Configure al menos una [sala o recurso](rooms-resources) en la sección Salas y Recursos
- Necesita acceso de edición a la sección de Calendarios en B1 Admin

</div>

## Abrir el Calendario de Disponibilidad

En B1 Admin, vaya a **Calendarios** y seleccione **Disponibilidad** en la barra lateral.

## Leer el Calendario

El calendario muestra el mes actual de forma predeterminada. Puede navegar hacia adelante y hacia atrás con las flechas en la parte superior, o cambiar entre las vistas de mes, semana y día.

Cada evento tiene un código de color según el estado de la reserva:

| Color | Significado |
|-------|---------|
| Verde | Aprobado |
| Naranja | Pendiente de aprobación |
| Gris | Bloqueado (no disponible) |

Al pasar el cursor sobre un evento se muestra el título del evento y la sala o recurso al que está vinculado.

## Filtrar por Sala o Recurso

Use el menú desplegable **Filtrar** en la parte superior izquierda para acotar el calendario a una sola sala o recurso. Seleccione **Todas las Salas y Recursos** para volver a la vista completa.

## Reservar una Sala o Recurso

1. Haga clic en el botón **Reservar** en la esquina superior derecha de la página.
2. En el cuadro de diálogo que se abre, complete los detalles del evento:
   - **Título** — el nombre del evento
   - Fecha/hora de **Inicio** y **Fin**
   - **Visibilidad** — Pública o Privada
   - **Salas** — seleccione una o más salas para reservar
   - **Recursos** — seleccione uno o más recursos para reservar
3. Opcionalmente, configure los tiempos de **Preparación** y **Desmontaje** (en minutos). Estos amplían la reserva en ambos extremos para que el espacio quede reservado para la preparación y la limpieza, aunque las horas de inicio/fin del evento permanezcan iguales.
4. Para repetir la reserva, marque **Se repite** y configure la recurrencia:
   - **Repetir cada** -- establezca el intervalo (por ejemplo, cada 2 semanas).
   - **Frecuencia** -- Diaria, Semanal o Mensual. Semanal le permite elegir día(s) específicos de la semana; Mensual le permite elegir un día fijo del mes o un patrón relativo como "el segundo martes."
   - **Termina** -- Nunca, en una fecha específica, o después de un número determinado de repeticiones.
5. Para especificar una ventana de reserva personalizada (diferente del inicio/fin del evento), active **Ventana de Reserva Personalizada** e ingrese las horas de inicio y fin de la ventana. Use esto cuando una sala deba estar accesible fuera del horario indicado del evento.
6. Haga clic en **Guardar** para enviar la reserva.

:::info
Si la sala o recurso tiene un **Grupo de Aprobación** configurado, la reserva aparecerá como **Pendiente** hasta que un líder de ese grupo la apruebe. Consulte [Aprobaciones de Calendario](approvals) para conocer el flujo de aprobación.
:::

:::tip
El calendario resaltará cualquier conflicto antes de guardar. Si ve una advertencia de conflicto, ajuste sus horarios o elija una sala diferente.
:::

## Artículos Relacionados

- [Salas, Recursos y Programación](rooms-resources) — configure espacios y equipos reservables
- [Aprobaciones de Calendario](approvals) — apruebe o rechace solicitudes de reserva
- [Creación de Calendarios](creating-calendars) — administre calendarios de eventos
