---
title: "Seguridad de Registración"
---

# Seguridad de Registración

<div class="article-intro">

B1 incluye un conjunto de controles de seguridad infantil para la registración: límites de capacidad de sala y proporciones de voluntarios a niños, guía de edad y grado en el quiosco, tipos de registración que distinguen miembros, invitados y voluntarios, y una lista de recogida de confianza por hogar que se verifica en el checkout. Esta página cubre cómo configurar cada característica de seguridad en B1 Admin.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Configura tu [estructura de asistencia](setup.md) y [quioscos de registración](check-in.md)
- Las salas son [grupos](../groups/creating-groups.md) vinculados a horarios de servicio — la configuración de seguridad abajo vive en el grupo
- El aviso a padres y radiodifusión de emergencia requieren un proveedor de mensajes de texto conectado ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream), o Mutual Ministry)

</div>

## Capacidad de Sala y Cerrar una Sala

Cada sala de registración (grupo) puede aplicar sus propios límites. Abre el grupo, haz clic en el **icono de lápiz** para editar su configuración, y encuentra la sección **Capacidad de Registración**:

- **Capacidad** -- El número máximo de personas que pueden ingresarse en esta sala a la vez. Cuando la sala está llena, la registración a la misma es bloqueada y el quiosco nombra la sala completa.
- **Capacidad de Invitados** -- Un límite separado opcional sobre cuántos invitados puede albergar la sala.
- **Cerrado para Registración** -- Establece en **Sí** para detener todas las registraciones a esta sala inmediatamente (por ejemplo, cuando una clase se cancela o una sala no está disponible). Los checkouts aún funcionan.

## Proporciones de Voluntarios

La misma sección **Capacidad de Registración** en el grupo incluye reglas de personal:

- **Niños por Voluntario** -- El número máximo de niños que cada voluntario ingresado puede cubrir (ej. 5 significa un voluntario por cinco niños).
- **Voluntarios Mínimos** -- El número más pequeño de voluntarios que deben ingresarse antes de que los niños puedan ingresarse en la sala.

Los voluntarios cuentan hacia estas reglas cuando se registran con el tipo **Voluntario** en el quiosco (ver [Tipos de Registración](#check-in-types) abajo).

### Elegir Advertencia vs. Bloqueo

Qué tan estrictamente se aplican las proporciones es una configuración de toda la iglesia:

1. En B1 Admin, ve a **Configuración > Administrar Iglesia** y abre el mosaico **Registración**.
2. Establece **Aplicación de Proporción de Voluntarios**:
   - **Advertencia (permitir con confirmación)** -- El quiosco muestra una advertencia cuando una sala está fuera de proporción o debajo de sus voluntarios mínimos, y un miembro del personal puede confirmar para proceder de todas formas. Esta es la predeterminada.
   - **Bloqueo (prevenir registración)** -- La registración en la sala se rechaza hasta que se ingresen suficientes voluntarios.

:::info
La capacidad y Cerrado para Registración son siempre límites duros — la opción de advertencia/bloqueo se aplica solo a las proporciones de voluntarios.
:::

## Tipos de Registración

Cada registración registra si la persona es un **Miembro**, **Invitado** o **Voluntario**. El tipo se elige con chips en la pantalla de hogar del quiosco (Miembro es la predeterminada). Los tipos alimentan las reglas de seguridad — los voluntarios proporcionan cobertura de proporción, e invitados cuentan contra la Capacidad de Invitados de la sala.

## Guía de Edad y Grado de Sala

Puedes dar a cada sala límites de edad o grado para que el quiosco guíe a las familias a salas apropiadas:

- En la configuración del grupo, usa la sección **Edad y Grado** para establecer la edad mínima/máxima (años y meses) y/o grado para la sala.
- En el quiosco, las salas para las que un niño califica se resaltan y las que no se atenúan. Una sala atenuada aún puede elegirse con confirmación del personal — la guía nunca bloquea duramente.

Los grados avanzan en la **fecha de promoción de grado** de tu iglesia:

1. En B1 Admin, ve a **Configuración > Administrar Iglesia** y abre el mosaico de promoción de grado.
2. Establece el mes y día en el que tu iglesia promociona estudiantes (por ejemplo, 1 de agosto). Las edades y grados en el quiosco se calculan a partir de la fecha de promoción más reciente.

## Personas de Recogida de Confianza y No Autorizadas

Cada hogar puede llevar una lista de personas que están — o no están — autorizadas a recoger a sus niños.

1. Abre la página de una persona en **Personas** y busca la tarjeta **Recogida**.
2. Haz clic en **Agregar**. Busca una persona existente, o agrega alguien que no esté en el sistema ingresando su **Nombre**, **Relación** y una foto.
3. Establece el **Estado**:
   - **De Confianza** -- En el checkout, esta persona aparece como una tarjeta de recogida pulsable con su foto, haciendo la recogida verificada rápida.
   - **No Autorizado** -- Si alguien intenta recoger bajo este nombre, el quiosco bloquea el checkout con una advertencia. Un miembro del personal puede anular, y la anulación se registra en el registro de asistencia.

Haz clic en el chip de estado de una persona en la tarjeta para alternar entre De Confianza y No Autorizado.

:::tip
Agrega fotos a personas de recogida de confianza siempre que sea posible — la pantalla de checkout muestra la foto para que los voluntarios puedan verificar visualmente a la persona parada frente a ellos.
:::

## Aviso a Padres y Radiodifusión de Emergencia

Ambas características envían mensajes de texto a través del proveedor de mensajes de texto conectado de tu iglesia — no hay un servicio SMS incorporado, por lo que uno de los proveedores admitidos debe configurarse primero.

- **Aviso a un padre** -- Desde la pantalla de checkout de un quiosco operado, el personal puede enviar un texto a los padres/tutores de un niño ingresado (por ejemplo, "Por favor ven a la guardería").
- **Radiodifusión de emergencia** -- Desde la configuración de administrador del quiosco, el personal puede enviar un texto a los tutores de todos los hogares ingresados para el servicio seleccionado a la vez. El envío requiere escribir **EMERGENCIA** para confirmar.

Las personas que han optado por no recibir textos, o que no tienen un número móvil registrado, se saltan automáticamente — el quiosco informa cuántos mensajes se enviaron y cuántos se saltaron.

Ver el recorrido del lado del quiosco en [Checkout y Seguridad Infantil](../../b1-checkin/check-in/checking-out).

## Artículos Relacionados

- [Registración](check-in.md) — configuración de quiosco y hardware
- [Checkout y Seguridad Infantil](../../b1-checkin/check-in/checking-out) — el checkout del quiosco, verificación de recogida, y flujos de aviso
- [Crear Grupos](../groups/creating-groups.md) — donde viven la configuración de sala
- [Configuración de Asistencia](setup.md) — servicios, horarios de servicio, y asignaciones de sala
- [Edad Mínima para Mensajes Privados](../settings/mobile-app.md#member-directory--messaging-settings) — bloquea nuevas conversaciones de mensajes privados con niños mientras se los mantiene en el directorio
