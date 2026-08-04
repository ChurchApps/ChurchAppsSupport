---
title: "Completar el Registro"
---

# Completar el Registro

<div class="article-intro">

Una vez que hayas revisado tu hogar y hecho las asignaciones de grupo necesarias, estás listo para finalizar el registro. Este es el último paso en el flujo de trabajo del kiosco -- la aplicación envía la asistencia, imprime etiquetas y se reinicia para la siguiente familia.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- [Revisa tu hogar](./household-review) en la pantalla de revisión de hogar
- [Asigna grupos](./group-assignment) a cualquier miembro de la familia que necesite registrarse en una clase o programa específico
- Opcionalmente [agrega cualquier invitado](./adding-guests) que esté visitando con tu familia

</div>

## Cómo Registrarse

1. Desde la **pantalla de revisión de hogar**, toca el botón **Registrarse** en la parte inferior de la pantalla.
2. La aplicación envía los datos de asistencia al servidor y muestra una **pantalla de éxito** con una marca de verificación verde y un mensaje de bienvenida.

Eso es todo lo que se necesita. La asistencia de tu familia ha sido registrada.

## Salas Llenas y Proporciones de Voluntarios

Si tu iglesia ha configurado [límites de seguridad](../../b1-admin/attendance/checkin-safety) en sus salas, el servidor los verifica antes de guardar:

- Si una sala seleccionada está **llena o cerrada**, el registro no se completa y la aplicación indica el nombre de la sala para que puedas elegir una diferente.
- Si a una sala de niños le **faltan voluntarios** para su proporción, la aplicación muestra una advertencia que un miembro del personal puede confirmar para continuar, o bloquea el registro por completo, dependiendo de cómo tu iglesia haya configurado la aplicación de las proporciones.

## Impresión de Etiquetas

Si hay una impresora de red configurada, la aplicación imprime automáticamente las etiquetas después del registro:

- Se imprimen **etiquetas de nombre** para cada persona asignada a un grupo que tiene activada la configuración de **Imprimir Etiqueta de Nombre**. Las etiquetas de nombre incluyen el nombre de la persona, su asignación de grupo e información de alergias/notas si la hay registrada.
- Se imprimen **boletos de recogida para padres** cuando cualquier persona registrada está en un grupo que tiene activada la configuración de **Recogida de Padres**. El boleto de recogida enumera a los niños, sus asignaciones de grupo y un **código de seguridad único de 4 caracteres**.

:::info
El mismo código de seguridad aparece tanto en la etiqueta de nombre del niño como en el boleto de recogida del padre. Al momento de la recogida, los voluntarios comparan los códigos para verificar que el adulto correcto está recogiendo a cada niño.
:::

El código de seguridad se genera de nuevo para cada registro y usa solo consonantes y dígitos (se excluyen las vocales para evitar formar palabras inapropiadas).

:::warning
Si las etiquetas no se imprimen, abre la Configuración de Administrador tocando el **logotipo de la iglesia** siete veces, luego toca **Cambiar Impresora** para verificar la conexión de la impresora. Consulta [Configuración de Impresora](../getting-started/printer-setup) para pasos de solución de problemas.
:::

## Qué Sucede Después del Registro

- Si hay una impresora configurada, la aplicación imprime todas las etiquetas y luego regresa automáticamente a la **pantalla de búsqueda**, lista para la siguiente familia.
- Si no hay una impresora configurada, la pantalla de éxito se muestra durante unos segundos y luego regresa automáticamente a la **pantalla de búsqueda**.

No necesitas tocar nada para regresar a la pantalla de búsqueda -- la aplicación maneja la transición automáticamente.

:::tip
La aplicación se reinicia completamente después de cada registro, por lo que no hay riesgo de que una familia vea la información de otra familia.
:::

## Qué se Registra

Cuando tocas **Registrarse**, la aplicación envía lo siguiente al servidor para cada miembro del hogar que tiene una asignación de grupo:

- La **persona** que se está registrando
- El **servicio** al que asiste
- La **hora de servicio** y el **grupo** a los que está asignada

Estos datos aparecen en B1 Admin en la sección de Asistencia, donde los administradores de tu iglesia pueden ver y gestionar los registros de asistencia. Consulta la [guía de administración de registro](../../b1-admin/attendance/check-in.md) para más detalles.
