---
title: "Check-out y seguridad infantil"
---

# Check-out y seguridad infantil

<div class="article-intro">

El check-out cierra el bucle del registro infantil: un padre presenta el código de seguridad de su etiqueta de recogida, el quiosco verifica quién está recogiendo, y los niños hacen check-out. Las estaciones tripuladas también obtienen herramientas de seguridad -- verificación de recogida de confianza, textos de page-a-parent, reimpresiones de etiquetas de seguridad y una transmisión de emergencia.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- El check-out está disponible en estaciones configuradas en modo **manned** en la configuración de administrador del quiosco
- Los niños deben haber sido [registrados](./completing-checkin) con una etiqueta de recogida impresa que lleve el código de seguridad
- El paging y las transmisiones de emergencia requieren que su iglesia tenga un proveedor de textos conectado en B1 Admin

</div>

## Iniciando un check-out

1. En una estación tripulada, toque **Check Out** en la pantalla de búsqueda.
2. Ingrese el **código de seguridad** de 4 caracteres de la etiqueta de recogida de la familia. Puede escribirlo, usar el teclado en pantalla o escanear el código de barras de la etiqueta con un escáner USB o Bluetooth -- el código se envía automáticamente una vez que se ingresan los 4 caracteres.
3. El quiosco muestra los niños registrados bajo ese código.

## Verificar quién está recogiendo

La pantalla de check-out pregunta quién está recogiendo a los niños:

- **Personas de recogida de confianza** para el hogar aparecen como tarjetas tocables con su foto y relación -- toque la persona parada frente a usted.
- **Adultos del hogar** también aparecen en una cuadrícula de fotos.
- **Otro** le permite escribir un nombre para alguien que no está en la lista.

Si un nombre escrito coincide con alguien marcado como **No autorizado** para ese hogar, el quiosco bloquea el check-out con una advertencia. Un miembro del personal puede elegir **Anular** para proceder de todos modos -- la anulación se registra en el registro de asistencia con el nombre de la persona.

Una vez que el recogedor está confirmado, toque check out. El nombre de la persona que recoge se almacena con el registro de asistencia.

:::info
Las personas de recogida de confianza y no autorizadas son gestionadas por el personal de la iglesia en la página de cada persona en B1 Admin -- vea [Seguridad en el registro](../../b1-admin/attendance/checkin-safety#trusted-and-not-authorized-pickup-people).
:::

## Paging a un padre

¿Necesita un padre durante el servicio -- un cambio de pañal, un niño llorando? Desde la pantalla de check-out en una estación tripulada, el personal puede enviar un **page**: un mensaje de texto a los padres o tutores del niño a través del proveedor de textos de la iglesia. Los padres que optaron por no recibir textos o que no tienen número móvil se saltan, y el quiosco muestra cuántos mensajes se enviaron.

## Reimpresión de etiquetas

Si una etiqueta de nombre o etiqueta de recogida se pierde o se daña, el personal en una estación tripulada puede **reimprimir** las etiquetas de la familia desde la pantalla de check-out después de ingresar el código de seguridad. La reimpresión usa la misma impresora y plantillas de etiqueta que el check-in original.

## Transmisión de emergencia

En una emergencia, el personal puede enviar un texto a los tutores de **todos los niños registrados** para el servicio actual a la vez:

1. Abra la **configuración de administrador** del quiosco (7 toques rápidos en el logo del encabezado, más el PIN si está establecido).
2. Toque **Transmisión de emergencia**.
3. Ingrese el mensaje, luego escriba **EMERGENCY** en el campo de confirmación -- el botón **Enviar transmisión** permanece deshabilitado hasta que lo haga.
4. El quiosco reporta cuántos teléfonos recibieron el mensaje y cuántas personas se saltaron (optaron por no participar o sin número móvil).

:::warning
La transmisión va a todos los hogares registrados para el servicio seleccionado. Úsela para emergencias genuinas -- evacuaciones, bloqueos, clima severo.
:::

## Artículos relacionados

- [Completar check-in](./completing-checkin) -- de dónde vienen los códigos de seguridad y las etiquetas de recogida
- [Seguridad en el registro](../../b1-admin/attendance/checkin-safety) -- configuración de capacidades, ratios, personas de recogida y requisito del proveedor de textos
- [Configuración de impresora](../getting-started/printer-setup) -- configuración de la impresora de etiquetas
