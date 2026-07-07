---
title: "Completar el registro"
---

# Completar el registro

<div class="article-intro">

Una vez que hayas revisado tu hogar y realizado las asignaciones de grupo necesarias, estás listo para finalizar el registro. Este es el último paso en el flujo de trabajo del quiosco: la aplicación envía asistencia, imprime etiquetas y se reinicia para la próxima familia.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- [Revisa tu hogar](./household-review) en la pantalla de revisión del hogar
- [Asigna grupos](./group-assignment) a cualquier miembro de la familia que necesite registrarse en una clase o programa específico
- Opcionalmente [agrega a cualquier invitado](./adding-guests) que esté visitando con tu familia

</div>

## Cómo registrarse

1. Desde la **pantalla de revisión del hogar**, toca el botón **Registrarse** en la parte inferior de la pantalla.
2. La aplicación envía los datos de asistencia al servidor y muestra una **pantalla de éxito** con una marca de verificación verde y un mensaje de bienvenida.

Eso es todo. La asistencia de tu familia ha sido registrada.

## Salas llenas y proporciones de voluntarios

Si tu iglesia ha configurado [límites de seguridad](../../b1-admin/attendance/checkin-safety) en sus salas, el servidor los verifica antes de guardar:

- Si una sala seleccionada está **llena o cerrada**, el registro no se realiza y la aplicación nombra la sala para que puedas elegir una diferente.
- Si una sala infantil está **corta de voluntarios** para su proporción, la aplicación muestra una advertencia que un miembro del personal puede confirmar para proceder, o bloquea el registro completamente, dependiendo de cómo tu iglesia configuró la aplicación de proporción.

## Impresión de etiquetas

Si hay una impresora de red configurada, la aplicación imprime automáticamente etiquetas después del registro:

- Las **etiquetas de nombre** se imprimen para cada persona asignada a un grupo que tenga la configuración **Imprimir etiqueta de nombre** habilitada. Las etiquetas de nombre incluyen el nombre de la persona, su asignación de grupo e información de alergias/notas si hay en el archivo.
- Los **recibos de entrega de padres** se imprimen cuando cualquier persona registrada está en un grupo que tenga la configuración **Entrega de padres** habilitada. El recibo de entrega lista a los niños, sus asignaciones de grupo y un **código de seguridad de 4 caracteres** único.

:::info
El mismo código de seguridad aparece tanto en la etiqueta de nombre del niño como en el recibo de entrega del padre. En el momento de la entrega, los voluntarios cotejan los códigos para verificar que el adulto correcto está recogiendo a cada niño.
:::

El código de seguridad se genera nuevo para cada registro y usa solo consonantes y dígitos (las vocales están excluidas para evitar formar palabras inapropiadas).

:::warning
Si las etiquetas no se imprimen, abre la Configuración de administrador tocando el **logotipo de la iglesia** siete veces, luego toca **Cambiar impresora** para verificar la conexión de la impresora. Ve [Configuración de impresora](../getting-started/printer-setup) para pasos de solución de problemas.
:::

## Qué sucede después del registro

- Si hay una impresora configurada, la aplicación imprime todas las etiquetas y luego regresa automáticamente a la **pantalla de búsqueda**, lista para la próxima familia.
- Si no hay impresora configurada, la pantalla de éxito se muestra durante algunos segundos y luego regresa automáticamente a la **pantalla de búsqueda**.

No necesitas tocar nada para volver a la pantalla de búsqueda: la aplicación maneja la transición automáticamente.

:::tip
La aplicación se reinicia completamente después de cada registro, por lo que no hay riesgo de que una familia vea la información de otra familia.
:::

## Qué se registra

Cuando tocas **Registrarse**, la aplicación envía lo siguiente al servidor para cada miembro del hogar que tiene una asignación de grupo:

- La **persona** que se registra
- El **servicio** al que están asistiendo
- La **hora del servicio** y **grupo** al que están asignados

Estos datos aparecen en B1 Admin en la sección de Asistencia, donde los administradores de tu iglesia pueden ver y gestionar registros de asistencia. Ve la [guía de administración de registro](../../b1-admin/attendance/check-in.md) para más detalles.