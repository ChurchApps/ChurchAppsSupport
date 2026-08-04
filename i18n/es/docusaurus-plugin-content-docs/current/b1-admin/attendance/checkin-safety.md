---
title: "Seguridad en el check-in"
---

# Seguridad en el check-in

<div class="article-intro">

B1 incluye un conjunto de controles de seguridad infantil para el check-in: límites de capacidad de salón y proporciones de voluntarios por niño, orientación de edad y grado en el quiosco, tipos de check-in que distinguen entre miembros, invitados y voluntarios, y una lista de personas autorizadas para recoger por hogar que se verifica en el check-out. Esta página explica cómo configurar cada función de seguridad en B1 Admin.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configura tu [estructura de asistencia](setup.md) y tus [quioscos de check-in](check-in.md)
- Los salones son [grupos](../groups/creating-groups.md) vinculados a horarios de servicio; los ajustes de seguridad a continuación se encuentran en el grupo
- Avisar a un padre y la difusión de emergencia requieren un proveedor de mensajes de texto conectado ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream), o Mutual Ministry)

</div>

## Capacidad del salón y cierre de un salón

Cada salón de check-in (grupo) puede aplicar sus propios límites. Abre el grupo, haz clic en el **ícono de lápiz** para editar su configuración y busca la sección **Check-In Capacity**:

- **Capacity** -- El número máximo de personas que pueden estar registradas en este salón a la vez. Cuando el salón está lleno, se bloquea el check-in a él y el quiosco indica que el salón está lleno.
- **Guest Capacity** -- Un límite opcional independiente sobre cuántos invitados puede albergar el salón.
- **Closed for Check-In** -- Configúralo en **Yes** para detener de inmediato todos los check-ins a este salón (por ejemplo, cuando se cancela una clase o un salón no está disponible). Los check-outs siguen funcionando.

## Proporciones de voluntarios

La misma sección **Check-In Capacity** en el grupo incluye reglas de personal:

- **Children per Volunteer** -- El número máximo de niños que puede cubrir cada voluntario registrado (por ejemplo, 5 significa un voluntario por cada cinco niños).
- **Minimum Volunteers** -- El número mínimo de voluntarios que deben estar registrados antes de que los niños puedan registrarse en el salón.

Los voluntarios cuentan para estas reglas cuando se registran con el tipo **Volunteer** en el quiosco (consulta [Tipos de check-in](#tipos-de-check-in) más abajo).

### Elegir entre advertir y bloquear

La estrictez con la que se aplican las proporciones es una configuración de toda la iglesia:

1. En B1 Admin, ve a **Settings > Manage Church** y abre el mosaico **Check-In**.
2. Configura **Volunteer Ratio Enforcement**:
   - **Warn (allow with confirmation)** -- El quiosco muestra una advertencia cuando un salón supera la proporción o está por debajo de su mínimo de voluntarios, y un miembro del personal puede confirmar para continuar de todos modos. Esta es la opción predeterminada.
   - **Block (prevent check-in)** -- Se rechaza el check-in al salón hasta que se registren suficientes voluntarios.

:::info
La capacidad y el cierre para check-in siempre son límites estrictos; la opción de advertir/bloquear solo se aplica a las proporciones de voluntarios.
:::

## Tipos de check-in

Cada check-in registra si la persona es **Member**, **Guest** o **Volunteer**. El tipo se elige con chips en la pantalla del hogar del quiosco (Member es el valor predeterminado). Los tipos alimentan las reglas de seguridad: los voluntarios proporcionan cobertura de proporción y los invitados cuentan contra la capacidad de invitados del salón.

## Orientación de edad y grado del salón

Puedes asignar a cada salón límites de edad o grado para que el quiosco guíe a las familias hacia los salones adecuados:

- En la configuración del grupo, usa la sección **Age & Grade** para establecer la edad mínima/máxima (en años y meses) y/o el grado del salón.
- En el quiosco, los salones para los que un niño califica se resaltan y los que no, se atenúan. Un salón atenuado todavía se puede elegir con la confirmación de un miembro del personal; la orientación nunca bloquea por completo.

Los grados se actualizan en la **fecha de promoción de grado** de tu iglesia:

1. En B1 Admin, ve a **Settings > Manage Church** y abre el mosaico de promoción de grado.
2. Configura el mes y el día en que tu iglesia promueve a los estudiantes (por ejemplo, el 1 de agosto). Las edades y los grados en el quiosco se calculan a partir de la fecha de promoción más reciente.

## Personas autorizadas y no autorizadas para recoger

Cada hogar puede tener una lista de personas que sí, o que no, están autorizadas a recoger a sus niños.

1. Abre la página de una persona en **People** y busca la tarjeta **Pickup**.
2. Haz clic en **Add**. Busca a una persona existente, o agrega a alguien que no esté en el sistema ingresando su **Name**, **Relationship** y una foto.
3. Configura el **Status**:
   - **Trusted** -- En el check-out, esta persona aparece como una tarjeta de recogida seleccionable con su foto, lo que hace que la recogida verificada sea rápida.
   - **Not Authorized** -- Si alguien intenta recoger con este nombre, el quiosco bloquea el check-out con una advertencia. Un miembro del personal puede anular esto, y la anulación queda registrada en el registro de asistencia.

Haz clic en el chip de estado de una persona en la tarjeta para alternar entre Trusted y Not Authorized.

:::tip
Agrega fotos a las personas de confianza para recoger siempre que sea posible; la pantalla de check-out muestra la foto para que los voluntarios puedan verificar visualmente a la persona que tienen delante.
:::

## Avisar a un padre y difusión de emergencia

Ambas funciones envían mensajes de texto a través del proveedor de mensajes de texto conectado de tu iglesia; no hay un servicio de SMS integrado, así que primero debe configurarse uno de los proveedores admitidos.

- **Page a parent** -- Desde la pantalla de check-out de un quiosco atendido, el personal puede enviar un mensaje de texto a los padres/tutores de un niño registrado (por ejemplo, "Please come to the nursery").
- **Emergency broadcast** -- Desde la configuración de administrador del quiosco, el personal puede enviar un mensaje de texto a los tutores de todos los hogares registrados para el servicio seleccionado a la vez. Enviarlo requiere escribir **EMERGENCY** para confirmar.

Las personas que optaron por no recibir mensajes de texto, o que no tienen un número móvil registrado, se omiten automáticamente; el quiosco informa cuántos mensajes se enviaron y cuántos se omitieron.

Consulta el recorrido del lado del quiosco en [Check-out y seguridad infantil](../../b1-checkin/check-in/checking-out).

## Artículos relacionados

- [Check-In](check-in.md) — configuración del quiosco y hardware
- [Check-out y seguridad infantil](../../b1-checkin/check-in/checking-out) — el check-out del quiosco, la verificación de recogida y los flujos de aviso
- [Crear grupos](../groups/creating-groups.md) — dónde viven los ajustes de salón
- [Configuración de asistencia](setup.md) — servicios, horarios de servicio y asignaciones de salón
