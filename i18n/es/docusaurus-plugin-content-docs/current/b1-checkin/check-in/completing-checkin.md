---
title: "Completar registro de entrada"
---

# Completar registro de entrada

<div class="article-intro">

Una vez que hayas revisado tu hogar y hayas realizado cualquier asignación de grupo necesaria, estás listo para finalizar el registro de entrada. Este es el último paso en el flujo de trabajo del quiosco: la aplicación envía asistencia, imprime etiquetas y se reinicia para la siguiente familia.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- [Revisa tu hogar](./household-review) en la pantalla de revisión del hogar
- [Asigna grupos](./group-assignment) a cualquier miembro de la familia que necesite registrarse en una clase o programa específico
- Opcionalmente [agrega cualquier invitado](./adding-guests) que esté visitando con tu familia

</div>

## Cómo registrarse

1. Desde la **pantalla de revisión del hogar**, toca el botón **Registrarse** en la parte inferior de la pantalla.
2. La aplicación envía los datos de asistencia al servidor y muestra una **pantalla de éxito** con una marca de verificación verde y un mensaje de bienvenida.

Eso es todo lo que se necesita. La asistencia de tu familia ha sido registrada.

## Salas llenas y proporciones de voluntarios

Si tu iglesia ha configurado [límites de seguridad](../../b1-admin/attendance/checkin-safety) en sus salas, el servidor los verifica antes de guardar:

- Si una sala seleccionada está **llena o cerrada**, el registro no se procesa y la aplicación nombra la sala para que puedas elegir una diferente.
- Si una sala de niños está **corta de voluntarios** para su proporción, la aplicación muestra una advertencia que un miembro del personal puede confirmar para proceder, o bloquea el registro completamente, dependiendo de cómo tu iglesia configuró la aplicación de proporción.

## Impresión de etiquetas

Si se ha configurado una impresora de red, la aplicación imprime automáticamente etiquetas después del registro:

- Se imprimen **etiquetas de nombre** para cada persona que está asignada a un grupo que tiene la configuración **Imprimir distintivo** habilitada. Las etiquetas de nombre incluyen el nombre de la persona, su asignación de grupo e información de alergias/notas si alguna está registrada.
- Se imprimen **comprobantes de recogida de padres** cuando cualquier persona registrada está en un grupo que tiene la configuración **Recogida de padres** habilitada. Las personas registradas como **Voluntario** se omiten, para que un trabajador de cuidado infantil que sirve en una sala de Recogida de padres no obtenga un comprobante de recogida. El comprobante de recogida enumera a los niños, sus asignaciones de grupo y un **código de seguridad único de 4 caracteres**.

:::info
El mismo código de seguridad aparece en la etiqueta de nombre del niño y en el comprobante de recogida de los padres. En el momento de la recogida, los voluntarios coinciden los códigos para verificar que el adulto correcto está recogiendo a cada niño.
:::

El código de seguridad se genera nuevo para cada registro y utiliza solo consonantes y dígitos (las vocales se excluyen para evitar formar palabras inapropiadas).

:::warning
Si las etiquetas no se imprimen, abre la Configuración de administrador tocando el **logo de la iglesia** siete veces, luego toca **Cambiar impresora** para verificar la conexión de la impresora. Ver [Configuración de impresora](../getting-started/printer-setup) para pasos de solución de problemas.
:::

## Qué sucede después del registro

- Si se configura una impresora, la aplicación imprime todas las etiquetas y luego automáticamente regresa a la **pantalla de búsqueda**, lista para la siguiente familia.
- Si no se configura una impresora, la pantalla de éxito se muestra por unos segundos y luego automáticamente regresa a la **pantalla de búsqueda**.

No necesitas tocar nada para volver a la pantalla de búsqueda: la aplicación maneja la transición automáticamente.

:::tip
La aplicación se reinicia completamente después de cada registro, por lo que no hay riesgo de que una familia vea la información de otra familia.
:::

## Qué se registra

Cuando tocas **Registrarse**, la aplicación envía lo siguiente al servidor para cada miembro del hogar que tiene una asignación de grupo:

- La **persona** siendo registrada
- El **servicio** al que están asistiendo
- La **hora del servicio** y el **grupo** al que están asignados

Estos datos aparecen en B1 Admin bajo la sección Asistencia, donde los administradores de tu iglesia pueden ver y administrar registros de asistencia. Ver la [guía de administración de registro](../../b1-admin/attendance/check-in.md) para detalles.
