---
title: "Seguridad de Check-In"
---

# Seguridad de Check-In

<div class="article-intro">

B1 incluye un conjunto de controles de seguridad infantil para el check-in: límites de capacidad de salas y ratios de voluntarios a niños, orientación de edad y grado en el quiosco, tipos de check-in que distinguen miembros, invitados, y voluntarios, y una lista de recogida de confianza por hogar que se verifica en el check-out. Esta página cubre cómo configurar cada característica de seguridad en B1 Admin.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configura tu [estructura de asistencia](setup.md) y [quioscos de check-in](check-in.md)
- Las salas son [grupos](../groups/creating-groups.md) vinculados a horarios de servicio -- la configuración de seguridad a continuación vive en el grupo
- Page-a-parent y la transmisión de emergencia requieren un proveedor de texting conectado ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream), o Mutual Ministry)

</div>

## Capacidad de Salas y Cerrar una Sala

Cada sala de check-in (grupo) puede aplicar sus propios límites. Abre el grupo, haz clic en el **icono de lápiz** para editar su configuración, y encuentra la sección **Check-In Capacity**:

- **Capacity** -- El número máximo de personas que pueden registrarse en esta sala a la vez. Cuando la sala está llena, el check-in en ella se bloquea y el quiosco nombra la sala llena.
- **Guest Capacity** -- Un límite opcional separado en cuántos invitados puede tener la sala.
- **Closed for Check-In** -- Establece en **Yes** para detener todos los check-ins a esta sala de inmediato (por ejemplo, cuando una clase se cancela o una sala no está disponible). Los check-outs aún funcionan.

## Ratios de Voluntarios

La misma sección **Check-In Capacity** en el grupo incluye reglas de personal:

- **Children per Volunteer** -- El número máximo de niños que cada voluntario registrado puede cubrir (p. ej. 5 significa un voluntario por cada cinco niños).
- **Minimum Volunteers** -- El número más pequeño de voluntarios que deben estar registrados antes de que los niños puedan registrarse en la sala.

Los voluntarios cuentan hacia estas reglas cuando se registran con el tipo **Volunteer** en el quiosco (consulta [Tipos de Check-In](#tipos-de-check-in) abajo).

### Elegir Advertir vs. Bloquear

Qué tan estrictamente se aplican los ratios es una configuración de toda la iglesia:

1. En B1 Admin, ve a **Settings > Manage Church** y abre el mosaico **Check-In**.
2. Establece **Volunteer Ratio Enforcement**:
   - **Warn (allow with confirmation)** -- El quiosco muestra una advertencia cuando una sala está sobre su ratio o bajo su mínimo de voluntarios, y un miembro del personal puede confirmar para proceder de todos modos. Este es el predeterminado.
   - **Block (prevent check-in)** -- El check-in en la sala se rechaza hasta que suficientes voluntarios se registren.

:::info
Capacity y Closed for Check-In son siempre límites duros -- la elección advertir/bloquear solo se aplica a los ratios de voluntarios.
:::

## Tipos de Check-In

Cada check-in registra si la persona es un **Member**, **Guest**, o **Volunteer**. El tipo se elige con chips en la pantalla de hogar del quiosco (Member es el predeterminado). Los tipos alimentan las reglas de seguridad -- los voluntarios proporcionan cobertura de ratio, y los invitados cuentan contra la Guest Capacity de la sala.

## Orientación de Edad y Grado de Sala

Puedes darle a cada sala límites de edad o grado para que el quiosco guíe a las familias a salas apropiadas:

- En la configuración del grupo, usa la sección **Age & Grade** para establecer la edad mínima/máxima (años y meses) y/o grado para la sala.
- En el quiosco, las salas para las que un niño califica están resaltadas y las salas que no están atenuadas. Una sala atenuada aún puede elegirse con una confirmación del personal -- la orientación nunca bloquea de forma dura.

Los grados se renuevan en la **fecha de promoción de grado** de tu iglesia:

1. En B1 Admin, ve a **Settings > Manage Church** y abre el mosaico de promoción de grado.
2. Establece el mes y el día en que tu iglesia promueve estudiantes (por ejemplo, 1 de agosto). Las edades y grados en el quiosco se calculan a partir de la fecha de promoción más reciente.

## Personas de Recogida de Confianza y No Autorizadas

Cada hogar puede llevar una lista de personas que -- o no -- tienen permiso para recoger a sus hijos.

1. Abre la página de una persona en **People** y encuentra la tarjeta **Pickup**.
2. Haz clic en **Add**. Busca una persona existente, o agrega a alguien que no esté en el sistema ingresando su **Name**, **Relationship**, y una foto.
3. Establece el **Status**:
   - **Trusted** -- En el check-out, esta persona aparece como una tarjeta de recogida tocable con su foto, haciendo que la recogida verificada sea rápida.
   - **Not Authorized** -- Si alguien intenta recoger bajo este nombre, el quiosco bloquea el check-out con una advertencia. Un miembro del personal puede anular, y la anulación se registra en el registro de asistencia.

Haz clic en el chip de estado de una persona en la tarjeta para alternar entre Trusted y Not Authorized.

:::tip
Agrega fotos a personas de recogida de confianza siempre que sea posible -- la pantalla de check-out muestra la foto para que los voluntarios puedan verificar visualmente a la persona frente a ellos.
:::

## Page-a-Parent y Transmisión de Emergencia

Ambas características envían mensajes de texto a través del proveedor de texting conectado de tu iglesia -- no hay servicio SMS integrado, así que uno de los proveedores compatibles debe configurarse primero.

- **Page a parent** -- Desde la pantalla de check-out de un quiosco atendido, el personal puede enviar un texto a los padres/tutores de un niño registrado (por ejemplo, "Por favor venga a la guardería").
- **Emergency broadcast** -- Desde la configuración de administrador del quiosco, el personal puede enviar un texto a todos los tutores de hogares registrados para el servicio seleccionado a la vez. Enviar requiere escribir **EMERGENCY** para confirmar.

Las personas que han optado por no recibir textos, o que no tienen número móvil registrado, se omiten automáticamente -- el quiosco reporta cuántos mensajes se enviaron y cuántos se omitieron.

Consulta la explicación del lado del quiosco en [Check-Out y Seguridad Infantil](../../b1-checkin/check-in/checking-out).

## Artículos Relacionados

- [Check-In](check-in.md) — configuración del quiosco y hardware
- [Check-Out y Seguridad Infantil](../../b1-checkin/check-in/checking-out) — el check-out del quiosco, verificación de recogida, y flujos de paging
- [Crear Grupos](../groups/creating-groups.md) — donde vive la configuración de sala
- [Configuración de Asistencia](setup.md) — servicios, horarios de servicio, y asignaciones de sala
