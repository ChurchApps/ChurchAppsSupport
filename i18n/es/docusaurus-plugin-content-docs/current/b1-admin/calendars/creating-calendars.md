---
title: "Creación de Calendarios"
---

# Creación de Calendarios

<div class="article-intro">

Crear un calendario en B1 Admin te permite construir una vista curada de eventos conectando uno o más grupos. Los eventos son gestionados por líderes de grupo dentro de sus grupos, y tu calendario muestra esos eventos en un solo lugar. Los administradores con acceso de edición pueden agregar o editar eventos para cualquier grupo. Los líderes de grupo sin privilegios administrativos solo pueden administrar eventos para los grupos que lideran.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Configura los [grupos](../groups/creating-groups.md) cuyos eventos deseas incluir en tu calendario
- Necesitas acceso administrativo a la sección de Calendarios en B1 Admin

</div>

## Crear un Nuevo Calendario

1. En B1 Admin, abre el [menú Salto](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expande **Calendarios**, y haz clic en **Calendarios**.
2. Haz clic en **Agregar Calendario**.
3. Ingresa un **nombre** para tu calendario (por ejemplo, "Eventos del Ministerio de Jóvenes" o "Calendario Principal de la Iglesia").
4. Agrega una **descripción** opcional para ayudar a tu equipo a entender para qué es este calendario.
5. Haz clic en **Crear** para guardar tu nuevo calendario.

## La Página de Detalle del Calendario

Después de crear un calendario, haz clic en él para abrir la página de detalle. Esta página tiene dos áreas principales:

- **Columna izquierda** -- Una vista del calendario que muestra eventos extraídos de los grupos conectados.
- **Columna derecha** -- La lista de grupos asociados. Aquí es donde administras qué grupos se incluyen en este calendario.

## Conectar Grupos

Los grupos que tienen eventos en el calendario aparecen automáticamente en la lista de grupos en el lado derecho de la página de detalle.

1. Haz clic en **Agregar** en la sección de grupos para asociar un grupo con tu calendario.
2. Selecciona el grupo del menú desplegable.
3. Elige si incluir **todos los eventos** de ese grupo o solo **eventos específicos**.
4. Haz clic en **Guardar**.

:::tip
Conectar grupos a tu calendario es una forma poderosa de agregar eventos automáticamente. Cuando un líder de grupo agrega un evento a su [grupo](../groups/creating-groups.md), puede fluir a tu calendario de toda la iglesia sin trabajo adicional de tu parte.
:::

:::info
Si deseas crear un único calendario que extraiga eventos de muchos grupos en toda tu iglesia, consulta [Calendario Curado](curated-calendar) para un enfoque simplificado.
:::

## Habilitar Registro de Eventos

Puedes habilitar el registro para cualquier evento del calendario para que los miembros puedan registrarse a través del sitio web de B1 o de la aplicación móvil.

1. Haz clic en un evento existente o crea uno nuevo.
2. En el editor de eventos, activa **Registro** para habilitarlo.
3. Configura los ajustes de registro:
   - **Capacidad** (opcional) -- Establece un número máximo de registros. Déjalo en blanco para ilimitado.
   - **El Registro Se Abre** -- La fecha y hora en que el registro está disponible.
   - **El Registro Se Cierra** -- La fecha y hora en que el registro se cierra.
   - **Etiquetas** -- Etiquetas separadas por comas (p. ej., "juventud, retiro, vbs") para ayudar a categorizar eventos registrables.
   - **Preguntas de Registro** -- Opcionalmente adjunta un [formulario](../forms/creating-forms.md) para que los registrantes respondan preguntas adicionales (restricciones dietéticas, tamaño de camiseta, contacto de emergencia, etc.) como parte del registro. Elige **Ninguno** para omitir preguntas.
   - **Habilitar Lista de Espera** -- Cuando el evento se llena, permite que los registrantes adicionales se unan a una lista de espera en lugar de ser rechazados. Consulta [Registros Pagos](paid-registrations#waitlist).
4. Guarda el evento.

Para eventos pagados, la misma página de configuración te permite definir **Tipos de Asistentes** con precio, **Selecciones** opcionales (complementos) y **Códigos de Descuento**, con el pago recopilado a través del proveedor de donaciones de tu iglesia. Consulta [Registros Pagos](paid-registrations) para el tutorial completo.

Una vez que el registro está habilitado, los miembros verán un botón **Registrarse en Este Evento** cuando vean el evento en el [sitio web de B1](../../b1-church/events/registering) o en la [aplicación móvil de B1](../../b1-mobile/events/registering). Si adjuntaste un formulario, los registrantes ven un paso de **Preguntas** durante el registro y sus respuestas se guardan con su registro.

:::info
Las Preguntas de Registro solo funcionan con formularios que **no** están marcados como Restringidos. Un formulario restringido se omite automáticamente durante el registro en lugar de mostrarse, así que usa un formulario sin restricciones al adjuntar preguntas a un evento.
:::

### Administrar Registros

Para ver y administrar registros para tus eventos:

1. En el menú Salto, elige **Calendarios > Registros**.
2. Verás una tabla de todos los eventos con registro habilitado, mostrando el título del evento, la fecha, el conteo de registro actual versus la capacidad y las etiquetas.
3. Haz clic en un evento para ver la lista completa de registros, incluyendo nombres, conteo de miembros, tipos de asistentes, estado de pago y fecha de registro.
4. Desde la página de detalle, puedes:
   - **Agregar Asistente** -- Registrar manualmente a alguien que se registró sin conexión o por teléfono.
   - **Cancelar** registros individuales
   - **Eliminar** registros permanentemente
   - **Promover** registros en lista de espera cuando se abre un lugar
   - **Exportar CSV** -- Descargar todos los registros, incluyendo tipos de asistentes, selecciones, montos pagados y respuestas de preguntas

Si el evento tiene Preguntas de Registro adjuntas, la página de detalle también muestra un filtro de **Solo preguntas sin responder** para encontrar rápidamente registrantes que aún no han enviado respuestas, y un botón **Ver Respuestas** en cada registro respondido para ver sus respuestas. Los eventos pagados agregan una columna de **Tipo**, una columna de **Pagado / Total**, conteos por tipo y un diálogo de detalle de pagos -- consulta [Registros Pagos](paid-registrations#the-registration-roster).

:::tip
Usa la barra de progreso de capacidad para monitorear qué tan rápido se llenan los eventos. La barra se pone roja cuando un evento está en o ha excedido la capacidad.
:::

## Próximos Pasos

- [Calendario Curado](curated-calendar) -- Crear un calendario que extraiga de múltiples grupos
- [Registros Pagos](paid-registrations) -- Tipos de asistentes, selecciones de complementos, códigos de descuento, pagos y listas de espera
- [Guía de Registro de Eventos](../guides/event-registration) -- Guía paso a paso para configurar el registro de eventos
- [Descripción General de Calendarios](./) -- Volver a la descripción general de calendarios
