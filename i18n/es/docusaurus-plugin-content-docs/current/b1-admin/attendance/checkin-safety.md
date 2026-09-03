---
title: "Seguridad de Check-In"
---

# Seguridad de Check-In

<div class="article-intro">

B1 incluye un conjunto de controles de seguridad infantil para check-in: límites de capacidad de sala y ratios de voluntarios por niño, orientación por edad y grado en el quiosco, tipos de check-in que distinguen miembros, invitados y voluntarios, y una lista de personas autorizadas para recoger por hogar que se verifica en el check-out. Esta página cubre cómo configurar cada característica de seguridad en B1 Admin.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configura tu [estructura de asistencia](setup.md) y [quioscos de check-in](check-in.md)
- Las salas son [grupos](../groups/creating-groups.md) vinculados a horarios de servicio — la configuración de seguridad a continuación vive en el grupo
- Avisarle a un padre y transmisión de emergencia requieren un proveedor de mensajes de texto conectado ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream), o Mutual Ministry)

</div>

## Capacidad de sala y cierre de una sala

Cada sala de check-in (grupo) puede aplicar sus propios límites. Abre el grupo, haz clic en el **icono de lápiz** para editar su configuración, y encuentra la sección **Capacidad de Check-In**:

- **Capacidad** -- El número máximo de personas que pueden estar marcadas en esta sala a la vez. Cuando la sala está llena, el check-in a ella se bloquea y el quiosco nombra la sala completa.
- **Capacidad de invitados** -- Un límite opcional separado sobre cuántos invitados puede albergar la sala.
- **Cerrado para Check-In** -- Establece en **Sí** para detener todos los check-ins a esta sala inmediatamente (por ejemplo, cuando una clase se cancela o una sala no está disponible). Los check-outs aún funcionan.

## Ratios de voluntarios

La misma sección **Capacidad de Check-In** en el grupo incluye reglas de personal:

- **Niños por voluntario** -- El número máximo de niños que cada voluntario marcado puede cubrir (p. ej., 5 significa un voluntario por cada cinco niños).
- **Voluntarios mínimos** -- El número más pequeño de voluntarios que deben estar registrados antes de que los niños puedan hacer check-in a la sala.

Los voluntarios cuentan hacia estas reglas cuando se registran con el tipo **Voluntario** en el quiosco (ver [Tipos de Check-In](#tipos-de-check-in) abajo).

### Elegir Advertencia vs. Bloqueo

Qué tan estrictamente se aplican los ratios es una configuración de toda la iglesia:

1. En B1 Admin, ve a **Configuración > Administrar Iglesia** y abre el icono **Check-In**.
2. Establece **Aplicación de Ratio de Voluntarios**:
   - **Advertencia (permitir con confirmación)** -- El quiosco muestra una advertencia cuando una sala está fuera de ratio o por debajo de sus voluntarios mínimos, y un miembro del personal puede confirmar para proceder de todas formas. Esta es la opción predeterminada.
   - **Bloqueo (prevenir check-in)** -- El check-in a la sala se rechaza hasta que se registren suficientes voluntarios.

:::info
La capacidad y Cerrado para Check-In son siempre límites duros — la opción de advertencia/bloqueo se aplica solo a los ratios de voluntarios.
:::

## Tipos de Check-In

Cada check-in registra si la persona es un **Miembro**, **Invitado** o **Voluntario**. El tipo se elige con fichas en la pantalla del hogar del quiosco (Miembro es la opción predeterminada). Los tipos alimentan las reglas de seguridad — los voluntarios proporcionan cobertura de ratio, y los invitados cuentan contra la capacidad de invitados de la sala.

## Orientación de sala por edad y grado

Puedes dar a cada sala límites de edad o grado para que el quiosco guíe a las familias a las salas apropiadas:

- En la configuración del grupo, usa la sección **Edad y grado** para establecer la edad mínima/máxima (años y meses) y/o grado para la sala.
- En el quiosco, las salas para las que un niño califica se destacan y las que no lo hacen se atenúan. Una sala atenuada aún se puede elegir con una confirmación del personal — la orientación nunca bloquea completamente.

Los grados se renuevan en la **fecha de promoción de grado** de su iglesia:

1. En B1 Admin, ve a **Configuración > Administrar Iglesia** y abre el icono de promoción de grado.
2. Establece el mes y día en que tu iglesia promueve estudiantes (por ejemplo, 1 de agosto). Las edades y grados en el quiosco se calculan a partir de la fecha de promoción más reciente.

## Personas de recogida autorizadas y no autorizadas

Cada hogar puede llevar una lista de personas que están — o no están — autorizadas para recoger a sus hijos.

1. Abre la página de una persona en **Personas** y encuentra la tarjeta **Recogida**.
2. Haz clic en **Agregar**. Busca una persona existente, o agrega a alguien que no esté en el sistema ingresando su **Nombre**, **Relación** y una foto.
3. Establece el **Estado**:
   - **Autorizado** -- En el check-out, esta persona aparece como una tarjeta de recogida pulsable con su foto, haciendo que la recogida verificada sea rápida.
   - **No autorizado** -- Si alguien intenta recogida bajo este nombre, el quiosco bloquea el check-out con una advertencia. Un miembro del personal puede anular, y la anulación se registra en el registro de asistencia.

Haz clic en la ficha de estado de una persona en la tarjeta para alternar entre Autorizado y No autorizado.

:::tip
Agrega fotos a personas de recogida autorizadas siempre que sea posible — la pantalla de check-out muestra la foto para que los voluntarios puedan verificar visualmente a la persona de frente a ellos.
:::

## Avisarle a un padre y transmisión de emergencia

Ambas características envían mensajes de texto a través del proveedor de mensajes de texto conectado de tu iglesia — no hay un servicio SMS integrado, por lo que uno de los proveedores compatibles debe configurarse primero.

- **Avisarle a un padre** -- Desde la pantalla de check-out del quiosco tripulado, el personal puede enviar un mensaje de texto a los padres/tutores de un niño marcado (por ejemplo, "Por favor, ven a la guardería").
- **Transmisión de emergencia** -- Desde la configuración de administración del quiosco, el personal puede enviar un mensaje de texto a los tutores de todos los hogares marcados para el servicio seleccionado a la vez. Enviar requiere escribir **EMERGENCIA** para confirmar.

Las personas que han optado por no recibir mensajes de texto, o que no tienen un número de móvil en archivo, se omiten automáticamente — el quiosco informa cuántos mensajes se enviaron y cuántos se omitieron.

Ver el paso a paso del lado del quiosco en [Check-Out y Seguridad Infantil](../../b1-checkin/check-in/checking-out).

## Artículos relacionados

- [Check-In](check-in.md) — configuración del quiosco y hardware
- [Check-Out y Seguridad Infantil](../../b1-checkin/check-in/checking-out) — el check-out del quiosco, verificación de recogida, y flujos de búsqueda
- [Crear grupos](../groups/creating-groups.md) — donde viven la configuración de sala
- [Configuración de Asistencia](setup.md) — servicios, horarios de servicio, y asignaciones de sala
- [Edad mínima para mensajes privados](../settings/mobile-app.md#member-directory--messaging-settings) — bloquea nuevas conversaciones de mensajes privados con niños mientras los mantiene en el directorio
