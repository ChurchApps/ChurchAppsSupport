---
title: "Completar el registro de entrada"
---

# Completar el registro de entrada

<div class="article-intro">

Una vez que haya revisado su hogar y asignado los grupos necesarios, está listo para finalizar el registro de entrada. Este es el último paso del flujo del quiosco: la aplicación envía la asistencia, imprime las etiquetas y se reinicia para la siguiente familia.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- [Revise su hogar](./household-review) en la pantalla de revisión del hogar
- [Asigne grupos](./group-assignment) a los miembros de la familia que necesiten registrarse en una clase o programa específico
- Opcionalmente, [agregue a los invitados](./adding-guests) que visitan con su familia

</div>

## Cómo registrar la entrada

1. Desde la **pantalla de revisión del hogar**, toque el botón **Registrar entrada** en la parte inferior de la pantalla.
2. La aplicación envía los datos de asistencia al servidor y muestra una **pantalla de éxito** con una marca de verificación verde y un mensaje de bienvenida.

Eso es todo. La asistencia de su familia ha quedado registrada.

## Salas llenas y proporciones de voluntarios

Si su iglesia ha configurado [límites de seguridad](../../b1-admin/attendance/checkin-safety) en sus salas, el servidor los verifica antes de guardar:

- Si una sala seleccionada está **llena o cerrada**, el registro no se completa y la aplicación indica el nombre de la sala para que pueda elegir otra.
- Si el horario de servicio tiene un [calendario de registro](../../b1-admin/attendance/setup#setting-a-check-in-schedule) y su ventana de registro no está abierta en este momento, también se rechaza el registro en las salas de ese horario de servicio. La pantalla **No se puede registrar aún** muestra la sala con el motivo "el registro no está abierto en este momento"; toque **Cambiar salas** para elegir otro horario de servicio o grupo. (Los horarios de servicio que ya están cerrados se muestran como **Cerrado** en la [pantalla del hogar](./household-review) y no se pueden elegir, así que normalmente solo verá esto si una ventana se cierra durante un registro de entrada.)
- Un hogar que se registró en un horario de servicio anterior puede volver más tarde y agregar un horario de servicio abierto, incluso después de que la ventana anterior se haya cerrado. Sus registros de entrada existentes se conservan y no hacen que el nuevo registro sea rechazado.
- Si una sala infantil tiene **falta de voluntarios** para su proporción, la aplicación muestra una advertencia que un miembro del personal puede confirmar para continuar, o bloquea por completo el registro, según cómo haya configurado su iglesia la aplicación de las proporciones.

## Impresión de etiquetas

Si hay una impresora de red configurada, la aplicación imprime automáticamente las etiquetas después del registro de entrada:

- Se imprimen **etiquetas con nombre** para cada persona asignada a un grupo que tenga activada la opción **Imprimir gafete**. Las etiquetas incluyen el nombre de la persona, su grupo asignado y la información de alergias o notas, si la hay en el registro.
- Se imprimen **comprobantes de recogida para padres** cuando alguna persona registrada pertenece a un grupo que tiene activada la opción **Recogida por padres**. Las personas registradas como **Voluntario** se omiten, así que un trabajador de cuidado infantil que sirve en una sala de Recogida por padres no recibe un comprobante. El comprobante enumera a los niños, sus grupos asignados y un **código de seguridad de 4 caracteres** único.

:::info
El mismo código de seguridad aparece en la etiqueta con nombre del niño y en el comprobante de recogida del padre. Al momento de recoger al niño, los voluntarios comparan los códigos para verificar que el adulto correcto está recogiendo a cada niño.
:::

El código de seguridad se genera de nuevo en cada registro de entrada y solo usa consonantes y dígitos (se excluyen las vocales para evitar que formen palabras inapropiadas).

:::warning
Si las etiquetas no se imprimen, abra la Configuración de administrador tocando el **logotipo de la iglesia** siete veces, y luego toque **Cambiar impresora** para verificar la conexión con la impresora. Consulte [Configuración de la impresora](../getting-started/printer-setup) para ver los pasos de solución de problemas.
:::

## Qué sucede después del registro de entrada

- Si hay una impresora configurada, la aplicación imprime todas las etiquetas y luego vuelve automáticamente a la **pantalla de búsqueda**, lista para la siguiente familia.
- Si no hay impresora configurada, la aplicación también vuelve automáticamente a la **pantalla de búsqueda**.

En ambos casos, la pantalla de éxito permanece visible durante al menos 6 segundos desde que aparece (8 segundos cuando celebra el hito de asistencia de alguien), para que las familias vean que el registro se completó. Si la impresión tarda más que eso, la aplicación regresa aproximadamente un segundo y medio después de que termine de imprimir.

No necesita tocar nada para volver a la pantalla de búsqueda: la aplicación maneja la transición automáticamente. Una vez que la pantalla lleva visible un momento, puede tocarla para volver de inmediato; un toque en el primer segundo y medio se ignora, así que un doble toque rápido en **Registrar entrada** no omite la pantalla.

:::tip
La aplicación se reinicia por completo después de cada registro de entrada, así que no existe el riesgo de que una familia vea la información de otra.
:::

## Qué se registra

Cuando toca **Registrar entrada**, la aplicación envía al servidor lo siguiente para cada miembro del hogar que tenga una asignación de grupo:

- La **persona** que registra su entrada
- El **servicio** al que asiste
- El **horario de servicio** y el **grupo** al que está asignado

Estos datos aparecen en B1 Admin, en la sección de Asistencia, donde los administradores de su iglesia pueden ver y administrar los registros de asistencia. Consulte la [guía de administración del registro de entrada](../../b1-admin/attendance/check-in.md) para más detalles.
