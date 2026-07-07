---
title: "Seguridad en el registro"
---

# Seguridad en el registro

<div class="article-intro">

B1 incluye un conjunto de controles de seguridad infantil para el registro: límites de capacidad de salas y ratios de voluntarios a niños, orientación de edad y grado en el quiosco, tipos de registro que distinguen miembros, invitados y voluntarios, y una lista de recogida confiable por hogar que se verifica al salir. Esta página cubre cómo configurar cada característica de seguridad en B1 Admin.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configure su [estructura de asistencia](setup.md) y [quioscos de registro](check-in.md)
- Las salas son [grupos](../groups/creating-groups.md) vinculados a tiempos de servicio -- la configuración de seguridad a continuación vive en el grupo
- Page-a-parent y la transmisión de emergencia requieren un proveedor de textos conectado ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream), o Mutual Ministry)

</div>

## Capacidad de salas y cierre de una sala

Cada sala de registro (grupo) puede aplicar sus propios límites. Abra el grupo, haga clic en el **icono de lápiz** para editar su configuración, y encuentre la sección **Capacidad de registro**:

- **Capacidad** -- El número máximo de personas que pueden ser registradas en esta sala a la vez. Cuando la sala está llena, el registro en ella se bloquea y el quiosco nombra la sala llena.
- **Capacidad de invitados** -- Un límite opcional separado en cuántos invitados puede tener la sala.
- **Cerrado para registro** -- Establézcalo en **Sí** para detener todos los registros en esta sala de inmediato (por ejemplo, cuando una clase se cancela o una sala no está disponible). Los check-outs aún funcionan.

## Ratios de voluntarios

La misma sección **Capacidad de registro** en el grupo incluye reglas de personal:

- **Niños por voluntario** -- El número máximo de niños que cada voluntario registrado puede cubrir (por ejemplo, 5 significa un voluntario por cada cinco niños).
- **Voluntarios mínimos** -- El número más pequeño de voluntarios que deben estar registrados antes de que los niños puedan registrarse en la sala.

Los voluntarios cuentan hacia estas reglas cuando se registran con el tipo **Voluntario** en el quiosco (vea [Tipos de registro](#tipos-de-registro) abajo).

### Elegir advertencia vs. bloqueo

La rigidez con la que se aplican los ratios es una configuración de toda la iglesia:

1. En B1 Admin, vaya a **Configuración > Administrar iglesia** y abra el mosaico **Registro**.
2. Configure **Aplicación de ratio de voluntarios**:
   - **Advertir (permitir con confirmación)** -- El quiosco muestra una advertencia cuando una sala está fuera de ratio o por debajo de sus voluntarios mínimos, y un miembro del personal puede confirmar para proceder de todos modos. Esta es la predeterminada.
   - **Bloquear (prevenir registro)** -- El registro en la sala se rechaza hasta que suficientes voluntarios se registren.

:::info
La capacidad y el cierre para registro son siempre límites duros -- la opción advertir/bloquear solo se aplica a los ratios de voluntarios.
:::

## Tipos de registro

Cada registro registra si la persona es un **Miembro**, **Invitado** o **Voluntario**. El tipo se elige con fichas en la pantalla del hogar del quiosco (Miembro es la predeterminada). Los tipos alimentan las reglas de seguridad -- los voluntarios proporcionan cobertura de ratio, e invitados cuentan contra la capacidad de invitados de la sala.

## Orientación de edad y grado de sala

Puede dar a cada sala límites de edad o grado para que el quiosco guíe a las familias a salas apropiadas:

- En la configuración del grupo, use la sección **Edad y grado** para establecer la edad mínima/máxima (años y meses) y/o grado para la sala.
- En el quiosco, las salas para las que un niño califica se resaltan y las salas para las que no lo hacen se oscurecen. Una sala oscura aún puede ser elegida con una confirmación del personal -- la guía nunca bloquea de forma dura.

Los grados se renuevan en la **fecha de promoción de grado** de su iglesia:

1. En B1 Admin, vaya a **Configuración > Administrar iglesia** y abra el mosaico de promoción de grado.
2. Establezca el mes y el día en que su iglesia promueve estudiantes (por ejemplo, 1 de agosto). Las edades y grados en el quiosco se calculan a partir de la fecha de promoción más reciente.

## Personas de recogida autorizadas y no autorizadas

Cada hogar puede llevar una lista de personas que -- o no -- tienen permiso para recoger a sus hijos.

1. Abra la página de una persona en **Personas** y encuentre la tarjeta **Recogida**.
2. Haga clic en **Añadir**. Busque una persona existente, o agregue alguien que no esté en el sistema ingresando su **Nombre**, **Relación** y una foto.
3. Configure el **Estado**:
   - **De confianza** -- En el check-out, esta persona aparece como una tarjeta de recogida tapeable con su foto, haciendo la recogida verificada rápida.
   - **No autorizado** -- Si alguien intenta recoger bajo este nombre, el quiosco bloquea el check-out con una advertencia. Un miembro del personal puede anular, y la anulación se registra en el registro de asistencia.

Haga clic en la ficha de estado de una persona en la tarjeta para alternar entre de confianza y no autorizado.

:::tip
Agregue fotos a personas de recogida de confianza siempre que sea posible -- la pantalla de check-out muestra la foto para que los voluntarios puedan verificar visualmente a la persona frente a ellos.
:::

## Page-a-Parent y transmisión de emergencia

Ambas características envían mensajes de texto a través del proveedor de textos conectado de su iglesia -- no hay servicio SMS integrado, por lo que uno de los proveedores compatibles debe configurarse primero.

- **Page a parent** -- Desde la pantalla de check-out de un quiosco tripulado, el personal puede enviar un SMS a los padres/tutores de un niño registrado (por ejemplo, "Por favor venga a la guardería").
- **Transmisión de emergencia** -- Desde la configuración de administrador del quiosco, el personal puede enviar un SMS a todos los tutores de hogares registrados para el servicio seleccionado a la vez. El envío requiere escribir **EMERGENCY** para confirmar.

Las personas que han optado por no recibir textos, o que no tienen número móvil registrado, se saltan automáticamente -- el quiosco reporta cuántos mensajes se enviaron y cuántos se saltaron.

Vea la descripción del lado del quiosco en [Check-Out y seguridad infantil](../../b1-checkin/check-in/checking-out).

## Artículos relacionados

- [Registro](check-in.md) -- configuración del quiosco y hardware
- [Check-Out y seguridad infantil](../../b1-checkin/check-in/checking-out) -- el check-out del quiosco, verificación de recogida y flujos de paging
- [Crear grupos](../groups/creating-groups.md) -- donde vive la configuración de salas
- [Configuración de asistencia](setup.md) -- servicios, horarios de servicio y asignaciones de sala
