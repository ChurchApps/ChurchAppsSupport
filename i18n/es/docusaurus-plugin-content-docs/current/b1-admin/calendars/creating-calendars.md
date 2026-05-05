---
title: "Crear Calendarios"
---

# Crear Calendarios

<div class="article-intro">

Crear un calendario en B1 Admin le permite construir una vista seleccionada de eventos conectando uno o más grupos. Los eventos son gestionados por los líderes de grupo dentro de sus grupos, y su calendario muestra esos eventos en un solo lugar. Incluso un administrador de dominio no puede agregar o editar eventos directamente en la sección de calendario a menos que sea líder del grupo al que pertenecen los eventos.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Configure los [grupos](../groups/creating-groups.md) cuyos eventos desea incluir en su calendario
- Necesita acceso administrativo a la sección de Calendarios en B1 Admin

</div>

## Crear un Nuevo Calendario

1. En B1 Admin, navegue a **Website** y luego a la sección **Calendars**.
2. Haga clic en **Add Calendar**.
3. Ingrese un **nombre** para su calendario (por ejemplo, "Eventos de Ministerio Juvenil" o "Calendario Principal de la Iglesia").
4. Agregue una **descripción** opcional para ayudar a su equipo a entender para qué sirve este calendario.
5. Haga clic en **Create** para guardar su nuevo calendario.

## La Página de Detalle del Calendario

Después de crear un calendario, haga clic en él para abrir la página de detalle. Esta página tiene dos áreas principales:

- **Columna izquierda** -- Una vista del calendario que muestra los eventos extraídos de los grupos conectados.
- **Columna derecha** -- La lista de grupos asociados. Aquí es donde administra qué grupos están incluidos en este calendario.

## Conectar Grupos

Los grupos que tienen eventos en el calendario aparecen automáticamente en la lista de grupos en el lado derecho de la página de detalle.

1. Haga clic en **Add** en la sección de grupos para asociar un grupo con su calendario.
2. Seleccione el grupo del menú desplegable.
3. Elija si desea incluir **todos los eventos** de ese grupo o solo **eventos específicos**.
4. Haga clic en **Save**.

:::tip
Conectar grupos a su calendario es una manera poderosa de agregar eventos automáticamente. Cuando un líder de grupo agrega un evento a su [grupo](../groups/creating-groups.md), puede fluir a su calendario de toda la iglesia sin ningún trabajo adicional de su parte.
:::

:::info
Si desea crear un solo calendario que extraiga eventos de muchos grupos en toda su iglesia, consulte [Curated Calendar](curated-calendar) para un enfoque simplificado.
:::

## Habilitar el Registro de Eventos

Puede habilitar el registro para cualquier evento de calendario para que los miembros puedan inscribirse a través del sitio web B1 o la aplicación móvil.

1. Haga clic en un evento existente o cree uno nuevo.
2. En el editor de eventos, active **Registration** para habilitarlo.
3. Configure los ajustes de registro:
   - **Capacity** (opcional) -- Establezca un número máximo de registros. Déjelo en blanco para ilimitado.
   - **Registration Opens** -- La fecha y hora en que el registro estará disponible.
   - **Registration Closes** -- La fecha y hora en que el registro se cierra.
   - **Tags** -- Etiquetas separadas por comas (por ejemplo, "jóvenes, retiro, evd") para ayudar a categorizar eventos registrables.
4. Guarde el evento.

Una vez que el registro esté habilitado, los miembros verán un botón **Register for this Event** cuando vean el evento en el [sitio web B1](../../b1-church/events/registering) o la [aplicación B1 Mobile](../../b1-mobile/events/registering).

### Gestionar Registros

Para ver y administrar los registros de sus eventos:

1. Navegue a la página **Registrations** en B1 Admin.
2. Verá una tabla de todos los eventos con registro habilitado, mostrando el título del evento, fecha, recuento actual de registros vs. capacidad y etiquetas.
3. Haga clic en un evento para ver la lista completa de registros, incluyendo nombres, recuento de miembros, estado y fecha de registro.
4. Desde la página de detalle, puede:
   - **Cancelar** registros individuales
   - **Eliminar** registros permanentemente
   - **Exportar** todos los registros a CSV

:::tip
Use la barra de progreso de capacidad para monitorear qué tan rápido se están llenando los eventos. La barra se vuelve roja cuando un evento está en o sobre la capacidad.
:::

## Próximos Pasos

- [Curated Calendar](curated-calendar) -- Crear un calendario que extrae de múltiples grupos
- [Event Registration Guide](../guides/event-registration) -- Guía paso a paso para configurar el registro de eventos
- [Calendars Overview](./) -- Volver a la descripción general de calendarios
