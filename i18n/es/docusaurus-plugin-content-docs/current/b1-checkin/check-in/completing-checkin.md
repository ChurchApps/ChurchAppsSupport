---
title: "Completar el registro de entrada"
---

# Completar el registro de entrada

<div class="article-intro">

Una vez que hayas revisado tu hogar y hecho las asignaciones de grupo necesarias, estás listo para finalizar el registro de entrada. Este es el último paso del flujo del quiosco: la aplicación envía la asistencia, imprime las etiquetas y se reinicia para la siguiente familia.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- [Revisa tu hogar](./household-review) en la pantalla de revisión del hogar
- [Asigna grupos](./group-assignment) a los miembros de la familia que necesiten registrarse en una clase o programa específico
- Opcionalmente, [añade invitados](./adding-guests) que estén visitando con tu familia

</div>

## Cómo registrar la entrada

1. Desde la **pantalla de revisión del hogar**, toca el botón **Registrar entrada** en la parte inferior de la pantalla.
2. La aplicación envía los datos de asistencia al servidor y muestra una **pantalla de éxito** con una marca de verificación verde y un mensaje de bienvenida.

Eso es todo. La asistencia de tu familia ya quedó registrada.

## Salas llenas y proporciones de voluntarios

Si tu iglesia ha configurado [límites de seguridad](../../b1-admin/attendance/checkin-safety) para sus salas, el servidor los verifica antes de guardar:

- Si una sala seleccionada está **llena o cerrada**, el registro no se completa y la aplicación indica el nombre de la sala para que elijas otra.
- Si el horario de servicio tiene un [horario de registro](../../b1-admin/attendance/setup#setting-a-check-in-schedule) y su ventana de registro no está abierta en este momento, también se rechaza el registro en las salas de ese horario de servicio. La pantalla **No se puede registrar la entrada todavía** muestra la sala con el motivo "el registro no está abierto en este momento"; toca **Cambiar salas** para elegir otro horario de servicio o grupo. (Los horarios de servicio que ya están cerrados cuando [seleccionas un servicio](./selecting-service#when-check-in-isnt-open) se ocultan, así que normalmente solo verás esto si una ventana se cierra a mitad de un registro.)
- Si una sala infantil tiene **pocos voluntarios** según su proporción, la aplicación muestra una advertencia que un miembro del personal puede confirmar para continuar, o bloquea el registro por completo, según cómo haya configurado tu iglesia la aplicación de proporciones.

## Impresión de etiquetas

Si hay una impresora de red configurada, la aplicación imprime automáticamente las etiquetas después del registro:

- Se imprimen **etiquetas con nombre** para cada persona asignada a un grupo que tenga activada la opción **Imprimir gafete**. Estas etiquetas incluyen el nombre de la persona, su asignación de grupo y la información de alergias o notas, si hay alguna registrada.
- Se imprimen **comprobantes de recogida para padres** cuando alguna persona registrada pertenece a un grupo con la opción **Recogida de padres** activada. Las personas registradas como **Voluntario** se omiten, de modo que un cuidador que sirve en una sala de recogida de padres no recibe comprobante. El comprobante lista a los niños, sus asignaciones de grupo y un **código de seguridad de 4 caracteres** único.

:::info
El mismo código de seguridad aparece tanto en la etiqueta con nombre del niño como en el comprobante de recogida del padre. En el momento de la recogida, los voluntarios comparan los códigos para verificar que el adulto correcto recoja a cada niño.
:::

El código de seguridad se genera de nuevo en cada registro y usa solo consonantes y dígitos (se excluyen las vocales para evitar que formen palabras inapropiadas).

:::warning
Si las etiquetas no se imprimen, abre la Configuración de administrador tocando el **logotipo de la iglesia** siete veces y luego toca **Cambiar impresora** para verificar la conexión de la impresora. Consulta [Configuración de la impresora](../getting-started/printer-setup) para ver los pasos de solución de problemas.
:::

## Qué pasa después del registro

- Si hay una impresora configurada, la aplicación imprime todas las etiquetas y luego regresa automáticamente a la **pantalla de búsqueda**, lista para la siguiente familia.
- Si no hay impresora configurada, la pantalla de éxito se muestra durante unos segundos y luego regresa automáticamente a la **pantalla de búsqueda**.

No necesitas tocar nada para volver a la pantalla de búsqueda: la aplicación gestiona la transición automáticamente.

:::tip
La aplicación se reinicia por completo después de cada registro, así que no existe el riesgo de que una familia vea la información de otra.
:::

## Qué se registra

Cuando tocas **Registrar entrada**, la aplicación envía lo siguiente al servidor para cada miembro del hogar que tenga una asignación de grupo:

- La **persona** que se registra
- El **servicio** al que asiste
- El **horario de servicio** y el **grupo** a los que está asignada

Estos datos aparecen en B1 Admin, en la sección de Asistencia, donde los administradores de tu iglesia pueden ver y gestionar los registros de asistencia. Consulta la [guía de administración del registro de entrada](../../b1-admin/attendance/check-in.md) para más detalles.
