---
title: "Crear calendarios"
---

# Crear calendarios

<div class="article-intro">

Crear un calendario en B1 Admin te permite crear una vista curada de eventos conectando uno o más grupos. Los eventos son gestionados por líderes de grupo dentro de sus grupos, y tu calendario muestra esos eventos en un solo lugar. Incluso un administrador de dominio no puede agregar o editar eventos directamente en la sección de calendario a menos que sea líder del grupo al que pertenecen los eventos.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configura los [grupos](../groups/creating-groups.md) cuyos eventos deseas incluir en tu calendario
- Necesitas acceso administrativo a la sección Calendarios en B1 Admin

</div>

## Crear un nuevo calendario

1. En B1 Admin, navega a **Sitio web**, luego a la sección **Calendarios**.
2. Haz clic en **Agregar calendario**.
3. Ingresa un **nombre** para tu calendario (por ejemplo, "Eventos del ministerio juvenil" o "Calendario principal de la iglesia").
4. Agrega una **descripción** opcional para ayudar a tu equipo a entender para qué es este calendario.
5. Haz clic en **Crear** para guardar tu nuevo calendario.

## Página de detalle del calendario

Después de crear un calendario, haz clic en él para abrir la página de detalle. Esta página tiene dos áreas principales:

- **Columna izquierda** -- Una vista del calendario que muestra eventos extraídos de grupos conectados.
- **Columna derecha** -- La lista de grupos asociados. Aquí es donde gestionas qué grupos se incluyen en este calendario.

## Conectar grupos

Los grupos que tienen eventos en el calendario aparecen automáticamente en la lista de grupos en el lado derecho de la página de detalle.

1. Haz clic en **Agregar** en la sección de grupos para asociar un grupo con tu calendario.
2. Selecciona el grupo del menú desplegable.
3. Elige si incluir **todos los eventos** de ese grupo u solo **eventos específicos**.
4. Haz clic en **Guardar**.

:::tip
Conectar grupos a tu calendario es una forma poderosa de agregar eventos automáticamente. Cuando un líder de grupo agrega un evento a su [grupo](../groups/creating-groups.md), puede fluir a tu calendario de la iglesia sin trabajo adicional de tu parte.
:::

:::info
Si deseas crear un único calendario que extraiga eventos de muchos grupos en tu iglesia, consulta [Calendario curado](curated-calendar) para un enfoque simplificado.
:::

## Habilitar registro de eventos

Puedes habilitar el registro para cualquier evento de calendario para que los miembros se inscriban a través del sitio web de B1 o la aplicación móvil.

1. Haz clic en un evento existente o crea uno nuevo.
2. En el editor de eventos, activa **Registro** para habilitarlo.
3. Configura los ajustes de registro:
   - **Capacidad** (opcional) -- Establece un número máximo de registros. Deja en blanco para ilimitado.
   - **Registro abierto** -- La fecha y hora cuando el registro está disponible.
   - **Registro cierra** -- La fecha y hora cuando se cierra el registro.
   - **Etiquetas** -- Etiquetas separadas por comas (p. ej., "jóvenes, retiro, vbs") para ayudar a categorizar eventos registrables.
   - **Preguntas de registro** -- Opcionalmente adjunta un [formulario](../forms/creating-forms.md) para que los inscritos respondan preguntas adicionales (restricciones dietéticas, talla de camiseta, contacto de emergencia, etc.) como parte de la inscripción. Elige **Ninguno** para omitir preguntas.
   - **Habilitar lista de espera** -- Cuando el evento se llena, deja que inscritos adicionales se unan a una lista de espera en lugar de ser rechazados. Consulta [Registros pagados](paid-registrations#waitlist).
4. Guarda el evento.

Para eventos pagados, la misma página de configuración te permite definir **Tipos de asistentes** con precio, **Selecciones** opcionales (complementos), y **Códigos de descuento**, con el pago recopilado a través del proveedor de donaciones de tu iglesia. Consulta [Registros pagados](paid-registrations) para el paso a paso completo.

Una vez que el registro esté habilitado, los miembros verán un botón **Registrarse para este evento** cuando vean el evento en el [sitio web de B1](../../b1-church/events/registering) o [aplicación B1 Mobile](../../b1-mobile/events/registering). Si adjuntaste un formulario, los inscritos verán un paso **Preguntas** durante el registro y sus respuestas se guardan con su registro.

:::info
Las preguntas de registro solo funcionan con formularios que **no** están marcados como Restringido. Un formulario restringido se omite automáticamente durante el registro en lugar de mostrarse, así que usa un formulario no restringido cuando adjuntes preguntas a un evento.
:::

### Gestionar registros

Para ver y gestionar registros para tus eventos:

1. Navega a la página **Registros** en B1 Admin.
2. Verás una tabla de todos los eventos con registro habilitado, mostrando el título del evento, fecha, recuento de registros actual versus capacidad, y etiquetas.
3. Haz clic en un evento para ver la lista completa de registros, incluyendo nombres, recuento de miembros, tipos de asistentes, estado de pago, y fecha de registro.
4. Desde la página de detalle, puedes:
   - **Agregar asistente** -- Registra manualmente a alguien que se inscribió fuera de línea o por teléfono.
   - **Cancelar** registros individuales
   - **Eliminar** registros permanentemente
   - **Promover** registros en lista de espera cuando se abre un lugar
   - **Exportar CSV** -- Descarga todos los registros, incluyendo tipos de asistentes, selecciones, montos de pago, y respuestas a preguntas

Si el evento tiene preguntas de registro adjuntas, la página de detalle también muestra un filtro **Solo preguntas sin respuesta** para encontrar rápidamente inscritos que no han enviado respuestas, y un botón **Ver respuestas** en cada registro respondido para ver sus respuestas. Los eventos pagados agregan una columna **Tipo**, una columna **Pagado / Total**, recuentos por tipo, y un diálogo de detalle de pagos -- consulta [Registros pagados](paid-registrations#the-registration-roster).

:::tip
Usa la barra de progreso de capacidad para monitorear qué tan rápido se están llenando los eventos. La barra se vuelve roja cuando un evento está en o sobre capacidad.
:::

## Próximos pasos

- [Calendario curado](curated-calendar) -- Crea un calendario que extraiga de múltiples grupos
- [Registros pagados](paid-registrations) -- Tipos de asistentes, selecciones de complementos, códigos de descuento, pagos, y listas de espera
- [Guía de registro de eventos](../guides/event-registration) -- Guía paso a paso para configurar registro de eventos
- [Descripción general de calendarios](./) -- Vuelve a la descripción general de calendarios
