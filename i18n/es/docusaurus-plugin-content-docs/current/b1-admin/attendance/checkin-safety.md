---
title: "Seguridad del Registro de Entrada"
---

# Seguridad del Registro de Entrada

<div class="article-intro">

B1 incluye un conjunto de controles de seguridad infantil para el registro de entrada: límites de capacidad de sala y ratios voluntario-niño, orientación de edad y grado en el quiosco, tipos de registro que distinguen miembros, huéspedes y voluntarios, y una lista de recogida confiable por hogar que se verifica al salir. Esta página cubre cómo configurar cada función de seguridad en B1 Admin.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Configure su [estructura de asistencia](setup.md) y [quioscos de registro](check-in.md)
- Las salas son [grupos](../groups/creating-groups.md) vinculados a horarios de servicio — la configuración de seguridad a continuación se encuentra en el grupo
- Página a padre y transmisión de emergencia requieren un proveedor de mensajes de texto conectado ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream), o Mutual Ministry)

</div>

## Capacidad de la Sala y Cierre de una Sala

Cada sala de registro (grupo) puede aplicar sus propios límites. Abra el grupo, haga clic en el **icono de lápiz** para editar su configuración, y encuentre la sección **Check-In Capacity**:

- **Capacity** -- El número máximo de personas que pueden registrarse en esta sala a la vez. Cuando la sala está llena, el registro se bloquea y el quiosco nombra la sala llena.
- **Guest Capacity** -- Un límite opcional separado sobre cuántos huéspedes puede contener la sala.
- **Closed for Check-In** -- Configure como **Yes** para detener todos los registros en esta sala inmediatamente (por ejemplo, cuando se cancela una clase o una sala no está disponible). Las salidas aún funcionan.

## Ratios de Voluntarios

La misma sección **Check-In Capacity** en el grupo incluye reglas de personal:

- **Children per Volunteer** -- El número máximo de niños que cada voluntario registrado puede cubrir (p. ej., 5 significa un voluntario por cada cinco niños).
- **Minimum Volunteers** -- El número más pequeño de voluntarios que deben estar registrados antes de que los niños puedan registrarse en la sala.

Los voluntarios cuentan en estas reglas cuando se registran con el tipo **Volunteer** en el quiosco (ver [Tipos de Registro](#check-in-types) a continuación).

### Elegir Advertencia vs. Bloqueo

Qué tan estrictamente se aplican las ratios es una configuración de toda la iglesia:

1. En B1 Admin, vaya a **Settings** y abra la sección **Check-In**.
2. Configure **Volunteer Ratio Enforcement**:
   - **Warn (allow with confirmation)** -- El quiosco muestra una advertencia cuando una sala está fuera de ratio o bajo sus voluntarios mínimos, y un miembro del personal puede confirmar para proceder de todas formas. Este es el valor por defecto.
   - **Block (prevent check-in)** -- El registro en la sala se rechaza hasta que se registren suficientes voluntarios.

:::info
La capacidad y el cierre del registro son límites fijos -- la opción advertencia/bloqueo se aplica solo a los ratios de voluntarios.
:::

## Tipos de Registro

Cada registro registra si la persona es un **Member**, **Guest** o **Volunteer**. El tipo se elige con fichas en la pantalla del hogar del quiosco (Member es el predeterminado). Los tipos alimentan las reglas de seguridad — los voluntarios proporcionan cobertura de ratio, y los huéspedes cuentan contra la capacidad de huéspedes de la sala.

## Orientación de Sala por Edad y Grado

Puede dar a cada sala límites de edad o grado para que el quiosco guíe a las familias a salas apropiadas:

- En la configuración del grupo, use la sección **Age & Grade** para establecer la edad mínima/máxima (años y meses) y/o el grado de la sala.
- En el quiosco, las salas para las que un niño califica se resaltan y las salas para las que no se atenúan. Una sala atenuada aún puede elegirse con una confirmación del personal — la orientación nunca bloquea completamente.

Los grados cambian en la **fecha de promoción de grado** de su iglesia:

1. En B1 Admin, vaya a **Settings** y abra la sección **Grade Promotion**.
2. Establezca el mes y día en que su iglesia promueve estudiantes (por ejemplo, 1 de agosto). Las edades y grados en el quiosco se calculan a partir de la fecha de promoción más reciente.

## Personas de Recogida Confiables y No Autorizadas

Cada hogar puede tener una lista de personas que están — o no — autorizadas para recoger a sus hijos.

1. Abra la página de una persona en **People** y encuentre la tarjeta **Pickup**.
2. Haga clic en **Add**. Busque una persona existente, o agregue a alguien no en el sistema ingresando su **Name**, **Relationship** y una foto.
3. Configure el **Status**:
   - **Trusted** -- Al salir, esta persona aparece como una tarjeta de recogida toqueble con su foto, lo que hace que la recogida verificada sea rápida.
   - **Not Authorized** -- Si alguien intenta recoger bajo este nombre, el quiosco bloquea la salida con una advertencia. Un miembro del personal puede anular, y la anulación se registra en el registro de asistencia.

Haga clic en el chip de estado de una persona en la tarjeta para alternar entre Trusted y Not Authorized.

:::tip
Agregue fotos a las personas de recogida confiables siempre que sea posible — la pantalla de salida muestra la foto para que los voluntarios puedan verificar visualmente a la persona frente a ellos.
:::

## Página a Padre y Transmisión de Emergencia

Ambas funciones envían mensajes de texto a través del proveedor de mensajes de texto conectado de su iglesia — no hay servicio SMS incorporado, por lo que debe configurarse primero uno de los proveedores compatibles.

- **Página a padre** -- Desde la pantalla de salida de un quiosco tripulado, el personal puede enviar un mensaje de texto a los padres/guardianes del hijo registrado (por ejemplo, "Por favor, venga a la guardería").
- **Transmisión de emergencia** -- Desde la configuración de administrador del quiosco, el personal puede enviar un mensaje de texto a todos los guardianes del hogar registrado del servicio seleccionado a la vez. El envío requiere escribir **EMERGENCY** para confirmar.

Las personas que han optado por no recibir textos, o que no tienen un número móvil registrado, se omiten automáticamente — el quiosco reporta cuántos mensajes se enviaron y cuántos se omitieron.

Ver el tutorial del lado del quiosco en [Salida y Seguridad Infantil](../../b1-checkin/check-in/checking-out).

## Artículos Relacionados

- [Registro de Entrada](check-in.md) — configuración del quiosco y hardware
- [Salida y Seguridad Infantil](../../b1-checkin/check-in/checking-out) — la salida del quiosco, verificación de recogida y flujos de paging
- [Creación de Grupos](../groups/creating-groups.md) — donde se encuentran los parámetros de la sala
- [Configuración de Asistencia](setup.md) — servicios, horarios de servicios y asignaciones de sala
- [Edad Mínima para Mensajes Privados](../settings/mobile-app.md#member-directory--messaging-settings) — bloquea nuevas conversaciones de mensajes privados con niños mientras los mantiene en el directorio
