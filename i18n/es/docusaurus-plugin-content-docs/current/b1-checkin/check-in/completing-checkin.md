---
title: "Completar el registro de entrada"
description: "Finalice el registro de entrada en el kiosco de una familia en B1 Checkin, incluidos los límites de salas, la impresión de etiquetas, los códigos de seguridad para la recogida y lo que la aplicación hace a continuación."
---

# Completar el registro de entrada

<div class="article-intro">

Una vez que haya revisado su hogar y realizado las asignaciones de grupo necesarias, estará listo para finalizar el registro de entrada. Este es el último paso del flujo de trabajo del kiosco: la aplicación envía la asistencia, imprime las etiquetas y se restablece para la siguiente familia.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- [Revise su hogar](./household-review.md) en la pantalla de revisión del hogar
- [Asigne grupos](./group-assignment.md) a los miembros de la familia que necesiten registrarse en una clase o programa específico
- Opcionalmente, [agregue los invitados](./adding-guests.md) que visiten con su familia

</div>

## Cómo registrar la entrada

1. Desde la **pantalla de revisión del hogar**, toque el botón **Registrar entrada** en la parte inferior de la pantalla.
2. La aplicación envía los datos de asistencia al servidor y muestra una **pantalla de éxito** con una marca de verificación verde y un mensaje de bienvenida.

Eso es todo. La asistencia de su familia ha quedado registrada.

Si alguna de las personas que seleccionó ya se registró para este servicio hoy, primero aparece una ventana **Ya registrado** que las nombra. Toque **Registrar de nuevo** para guardar sus nuevas opciones de grupo, o **Cancelar** para volver a la pantalla del hogar.

## Salas llenas y proporciones de voluntarios

Si su iglesia ha configurado [límites de seguridad](../../b1-admin/attendance/checkin-safety.md) en sus salas, el servidor los verifica antes de guardar:

- Si una sala seleccionada está **llena o cerrada**, el registro no se completa y la aplicación indica el nombre de la sala para que pueda elegir otra.
- Si el horario del servicio tiene un [calendario de registro](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule) y su ventana de registro no está abierta en este momento, también se rechaza el registro en las salas de ese horario. La pantalla **No se puede registrar todavía** muestra la sala con el motivo «el registro no está abierto en este momento»; toque **Cambiar salas** para elegir otro horario de servicio o grupo. (Los horarios de servicio que ya están cerrados aparecen como **Cerrado** en la [pantalla del hogar](./household-review.md) y no se pueden seleccionar, así que normalmente solo verá este caso si una ventana se cierra durante el registro).
- Un hogar que se registró para un horario de servicio anterior puede volver más tarde y agregar un horario de servicio abierto, incluso después de que la ventana anterior se haya cerrado. Sus registros existentes se conservan y no hacen que el nuevo registro sea rechazado.
- Si una sala infantil tiene **falta de voluntarios** para cumplir su proporción, la aplicación muestra una advertencia que un miembro del personal puede confirmar para continuar, o bloquea el registro por completo, según cómo su iglesia haya configurado la aplicación de las proporciones.

## Impresión de etiquetas

Si hay una impresora de red configurada, la aplicación imprime automáticamente las etiquetas después del registro:

- Se imprimen **etiquetas con nombre** para cada persona asignada a un grupo que tenga activada la opción **Imprimir etiqueta con nombre**. Las etiquetas incluyen el nombre de la persona, su asignación de grupo y la información de alergias o notas si existe alguna registrada.
- Se imprimen **comprobantes de recogida para padres** cuando alguna persona registrada pertenece a un grupo que tiene activada la opción **Recogida de padres**. Las personas registradas como **Voluntario** se omiten, por lo que un trabajador de guardería que sirve en una sala de recogida de padres no recibe un comprobante. El comprobante enumera a los niños, sus asignaciones de grupo y un **código de seguridad de 4 caracteres** único.

:::info
El mismo código de seguridad aparece tanto en la etiqueta con nombre del niño como en el comprobante de recogida del padre. Al momento de la recogida, los voluntarios comparan los códigos para verificar que el adulto correcto recoja a cada niño.
:::

El código de seguridad se genera nuevo para cada registro y utiliza solo consonantes y dígitos (se excluyen las vocales para evitar que se formen palabras inapropiadas).

:::warning
Si las etiquetas no se imprimen, abra la Configuración de administrador tocando el **logotipo de la iglesia** siete veces y, a continuación, toque **Cambiar impresora** para verificar la conexión de la impresora. Consulte [Configuración de la impresora](../getting-started/printer-setup.md) para ver los pasos de solución de problemas.
:::

## Qué ocurre después del registro

- Si hay una impresora configurada, la aplicación imprime todas las etiquetas y luego regresa automáticamente a la **pantalla de búsqueda**, lista para la siguiente familia.
- Si no hay una impresora configurada, la aplicación también vuelve automáticamente a la **pantalla de búsqueda**.

En ambos casos, la pantalla de éxito permanece visible durante al menos 6 segundos desde que aparece (8 segundos cuando celebra el hito de asistencia de alguien), para que las familias puedan ver que el registro funcionó. Si la impresión tarda más que eso, la aplicación regresa aproximadamente un segundo y medio después de que termine la impresión.

No necesita tocar nada para volver a la pantalla de búsqueda; la aplicación gestiona la transición automáticamente. Una vez que la pantalla lleve un momento visible, puede tocarla para volver de inmediato; un toque en el primer segundo y medio se ignora, por lo que un doble toque rápido en **Registrar entrada** no omite la pantalla.

:::tip
La aplicación se restablece por completo después de cada registro, por lo que no existe ningún riesgo de que una familia vea la información de otra.
:::

## Qué se registra

Cuando toca **Registrar entrada**, la aplicación envía lo siguiente al servidor para cada miembro del hogar que tenga una asignación de grupo:

- La **persona** que se registra
- El **servicio** al que asiste
- El **horario de servicio** y el **grupo** al que está asignada

Estos datos aparecen en B1 Admin, en la sección de Asistencia, donde los administradores de su iglesia pueden ver y gestionar los registros de asistencia. Consulte la [guía de administración de registro de entrada](../../b1-admin/attendance/check-in.md) para más detalles.
