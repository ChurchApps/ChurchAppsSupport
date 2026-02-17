---
title: "Completar el registro"
---

# Completar el registro

<div class="article-intro">

Una vez que haya revisado su hogar y realizado las asignaciones de grupo necesarias, esta listo para finalizar el registro. Este es el ultimo paso en el flujo del quiosco -- la aplicacion envia la asistencia, imprime etiquetas y se reinicia para la siguiente familia.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- [Revise su hogar](./household-review) en la pantalla de revision del hogar
- [Asigne grupos](./group-assignment) a los miembros de la familia que necesiten registrarse en una clase o programa especifico
- Opcionalmente [agregue invitados](./adding-guests) que esten de visita con su familia

</div>

## Como registrarse

1. Desde la **pantalla de revision del hogar**, toque el boton **Check-in** en la parte inferior de la pantalla.
2. La aplicacion envia los datos de asistencia al servidor y muestra una **pantalla de exito** con una marca de verificacion verde y un mensaje de bienvenida.

Eso es todo. La asistencia de su familia ha sido registrada.

## Impresion de etiquetas

Si hay una impresora de red configurada, la aplicacion imprime automaticamente etiquetas despues del registro:

- **Etiquetas con nombres** se imprimen para cada persona asignada a un grupo que tiene habilitada la configuracion **Print Nametag**. Las etiquetas con nombres incluyen el nombre de la persona, su asignacion de grupo e informacion de alergias/notas si hay alguna registrada.
- **Comprobantes de recogida para padres** se imprimen cuando alguna persona registrada esta en un grupo que tiene habilitada la configuracion **Parent Pickup**. El comprobante de recogida lista a los ninos, sus asignaciones de grupo y un **codigo de seguridad unico de 4 caracteres**.

:::info
El mismo codigo de seguridad aparece tanto en la etiqueta del nino como en el comprobante de recogida del padre. Al momento de la recogida, los voluntarios comparan los codigos para verificar que el adulto correcto este recogiendo a cada nino.
:::

El codigo de seguridad se genera nuevo para cada registro y usa solo consonantes y digitos (las vocales se excluyen para evitar formar palabras inapropiadas).

:::warning
Si las etiquetas no se imprimen, verifique la barra de estado de la impresora en la parte superior de la pantalla. Puede tocarla para acceder a la configuracion de la impresora y verificar la conexion. Consulte [Configuracion de impresora](../getting-started/printer-setup) para pasos de solucion de problemas.
:::

## Que sucede despues del registro

- Si hay una impresora configurada, la aplicacion imprime todas las etiquetas y luego regresa automaticamente a la **pantalla de busqueda**, lista para la siguiente familia.
- Si no hay impresora configurada, la pantalla de exito se muestra durante unos segundos y luego regresa automaticamente a la **pantalla de busqueda**.

No necesita tocar nada para regresar a la pantalla de busqueda -- la aplicacion maneja la transicion automaticamente.

:::tip
La aplicacion se reinicia completamente despues de cada registro, por lo que no hay riesgo de que una familia vea la informacion de otra familia.
:::

## Que se registra

Cuando toca **Check-in**, la aplicacion envia lo siguiente al servidor por cada miembro del hogar que tenga una asignacion de grupo:

- La **persona** que se esta registrando
- El **servicio** al que asiste
- El **horario de servicio** y el **grupo** al que esta asignada

Estos datos aparecen en B1 Admin en la seccion de Asistencia, donde los administradores de su iglesia pueden ver y gestionar los registros de asistencia. Consulte la [guia de administracion de registro](../../b1-admin/attendance/check-in.md) para mas detalles.
