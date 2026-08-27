---
title: "Creando Calendarios"
---

# Creando Calendarios

<div class="article-intro">

Crear un calendario en B1 Admin te permite construir una vista curada de eventos conectando uno o más grupos. Los eventos son administrados por líderes de grupo dentro de sus grupos, y tu calendario muestra esos eventos en un lugar. Los administradores con acceso de edición pueden agregar o editar eventos para cualquier grupo. Los líderes de grupo que no son administradores solo pueden administrar eventos de grupos que lideran.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Configure los [grupos](../groups/creating-groups.md) cuyos eventos desea incluir en su calendario
- Necesita acceso administrativo a la sección de Calendarios en B1 Admin

</div>

## Crear un Nuevo Calendario

1. En B1 Admin, navegue a **Sitio Web** y luego a la sección **Calendarios**.
2. Haga clic en **Agregar Calendario**.
3. Ingrese un **nombre** para su calendario (por ejemplo, "Eventos del Ministerio Juvenil" o "Calendario Principal de la Iglesia").
4. Agregue una **descripción** opcional para ayudar a su equipo a entender el propósito de este calendario.
5. Haga clic en **Crear** para guardar su nuevo calendario.

## La Página de Detalles del Calendario

Después de crear un calendario, haga clic en él para abrir la página de detalles. Esta página tiene dos áreas principales:

- **Columna izquierda** -- Una vista del calendario que muestra los eventos extraídos de los grupos conectados.
- **Columna derecha** -- La lista de grupos asociados. Aquí es donde administra qué grupos se incluyen en este calendario.

## Conectar Grupos

Los grupos que tienen eventos en el calendario aparecen automáticamente en la lista de grupos del lado derecho de la página de detalles.

1. Haga clic en **Agregar** en la sección de grupos para asociar un grupo con su calendario.
2. Seleccione el grupo del menú desplegable.
3. Elija si desea incluir **todos los eventos** de ese grupo o solo **eventos específicos**.
4. Haga clic en **Guardar**.

:::tip
Conectar grupos a su calendario es una forma poderosa de agregar eventos automáticamente. Cuando un líder de grupo agrega un evento a su [grupo](../groups/creating-groups.md), este puede fluir hacia su calendario de toda la iglesia sin trabajo adicional de su parte.
:::

:::info
Si desea crear un único calendario que extraiga eventos de muchos grupos de su iglesia, consulte [Calendario Curado](curated-calendar) para un enfoque simplificado.
:::

## Habilitar el Registro de Eventos

Puede habilitar el registro para cualquier evento del calendario para que los miembros puedan inscribirse a través del sitio web de B1 o la aplicación móvil.

1. Haga clic en un evento existente o cree uno nuevo.
2. En el editor de eventos, active **Registro** para habilitarlo.
3. Configure los ajustes de registro:
   - **Capacidad** (opcional) -- Establezca un número máximo de inscripciones. Déjelo en blanco para ilimitado.
   - **Registro Abre** -- La fecha y hora en que el registro estará disponible.
   - **Registro Cierra** -- La fecha y hora en que el registro se cierra.
   - **Etiquetas** -- Etiquetas separadas por comas (por ejemplo, "jóvenes, retiro, vbs") para ayudar a categorizar los eventos registrables.
   - **Preguntas de Registro** -- Opcionalmente adjunte un [formulario](../forms/creating-forms.md) para que los inscritos respondan preguntas adicionales (restricciones alimentarias, talla de camiseta, contacto de emergencia, etc.) como parte de la inscripción. Elija **Ninguno** para omitir las preguntas.
   - **Habilitar Lista de Espera** -- Cuando el evento se llena, permita que los inscritos adicionales se unan a una lista de espera en lugar de ser rechazados. Consulte [Registros Pagados](paid-registrations#waitlist).
4. Guarde el evento.

Para eventos pagados, la misma página de configuración le permite definir **Tipos de Asistente** con precio, **Selecciones** opcionales (complementos) y **Códigos de Descuento**, con el pago recaudado a través del proveedor de donaciones de su iglesia. Consulte [Registros Pagados](paid-registrations) para ver la guía completa.

Una vez habilitado el registro, los miembros verán un botón **Registrarse para este Evento** cuando vean el evento en el [sitio web de B1](../../b1-church/events/registering) o en la [aplicación B1 Mobile](../../b1-mobile/events/registering). Si adjuntó un formulario, los inscritos verán un paso de **Preguntas** durante el registro y sus respuestas se guardarán junto con su inscripción.

:::info
Las Preguntas de Registro solo funcionan con formularios que **no** estén marcados como Restringidos. Un formulario restringido se omite automáticamente durante el registro en lugar de mostrarse, así que use un formulario sin restricciones al adjuntar preguntas a un evento.
:::

### Administrar Registros

Para ver y administrar los registros de sus eventos:

1. Navegue a la página **Registros** en B1 Admin.
2. Verá una tabla de todos los eventos con registro habilitado, mostrando el título del evento, la fecha, el conteo actual de inscripciones frente a la capacidad y las etiquetas.
3. Haga clic en un evento para ver la lista completa de registros, incluidos nombres, número de miembros, tipos de asistente, estado de pago y fecha de registro.
4. Desde la página de detalles, puede:
   - **Agregar Asistente** -- Registre manualmente a alguien que se inscribió sin conexión o por teléfono.
   - **Cancelar** registros individuales
   - **Eliminar** registros de forma permanente
   - **Promover** registros en lista de espera cuando se abra un lugar
   - **Exportar CSV** -- Descargue todos los registros, incluidos los tipos de asistente, selecciones, montos pagados y respuestas a las preguntas

Si el evento tiene Preguntas de Registro adjuntas, la página de detalles también muestra un filtro **Solo preguntas sin responder** para encontrar rápidamente a los inscritos que aún no han enviado respuestas, y un botón **Ver Respuestas** en cada registro respondido para ver sus respuestas. Los eventos pagados agregan una columna **Tipo**, una columna **Pagado / Total**, conteos por tipo y un cuadro de diálogo con detalles de pagos -- consulte [Registros Pagados](paid-registrations#the-registration-roster).

:::tip
Use la barra de progreso de capacidad para monitorear qué tan rápido se están llenando los eventos. La barra se vuelve roja cuando un evento está en o por encima de su capacidad.
:::

## Próximos Pasos

- [Calendario Curado](curated-calendar) -- Cree un calendario que extraiga información de varios grupos
- [Registros Pagados](paid-registrations) -- Tipos de asistente, selecciones de complementos, códigos de descuento, pagos y listas de espera
- [Guía de Registro de Eventos](../guides/event-registration) -- Guía paso a paso para configurar el registro de eventos
- [Resumen de Calendarios](./) -- Volver al resumen de calendarios
