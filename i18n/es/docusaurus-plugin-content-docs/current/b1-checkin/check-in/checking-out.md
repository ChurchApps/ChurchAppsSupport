---
title: "Check-out y seguridad infantil"
---

# Check-out y seguridad infantil

<div class="article-intro">

El check-out cierra el ciclo del check-in infantil: un padre presenta el código de seguridad de su etiqueta de recogida, el quiosco verifica quién está recogiendo, y los niños son registrados como retirados. Las estaciones atendidas también obtienen herramientas de seguridad: verificación de recogida de confianza, mensajes de aviso a padres, reimpresión de etiquetas de seguridad y una difusión de emergencia.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- El check-out está disponible en las estaciones configuradas en modo **manned** (atendido) en la configuración de administrador del quiosco
- Los niños deben haber sido [registrados](./completing-checkin) con una etiqueta de recogida impresa que lleve el código de seguridad
- Los avisos y las difusiones de emergencia requieren que tu iglesia tenga un proveedor de mensajes de texto conectado en B1 Admin

</div>

## Iniciar un check-out

1. En una estación atendida, toca **Check Out** en la pantalla de búsqueda.
2. Ingresa el **código de seguridad** de 4 caracteres de la etiqueta de recogida de la familia. Puedes escribirlo, usar el teclado numérico en pantalla, o escanear el código de barras de la etiqueta con un escáner USB o Bluetooth — el código se envía automáticamente una vez que se ingresan los 4 caracteres.
3. El quiosco muestra los niños registrados bajo ese código.

## Verificar quién está recogiendo

La pantalla de check-out pregunta quién va a recoger a los niños:

- Las **personas de confianza para recogida** del hogar aparecen como tarjetas seleccionables con su foto y relación — toca a la persona que tienes delante.
- Los **adultos del hogar** también aparecen en una cuadrícula de fotos.
- **Other** te permite escribir un nombre para alguien que no está en la lista.

Si un nombre escrito coincide con alguien marcado como **Not Authorized** para ese hogar, el quiosco bloquea el check-out con una advertencia. Un miembro del personal puede elegir **Override** para continuar de todos modos — la anulación queda registrada en el registro de asistencia con el nombre de la persona.

Una vez confirmada la persona que recoge, toca check out. El nombre de la persona que recoge se guarda con el registro de asistencia.

:::info
Las personas de confianza y no autorizadas para recoger son gestionadas por el personal de la iglesia en la página de cada persona en B1 Admin — consulta [Seguridad en el check-in](../../b1-admin/attendance/checkin-safety#trusted-and-not-authorized-pickup-people).
:::

## Avisar a un padre

¿Necesitas a un padre durante el servicio — un cambio de pañal, un niño llorando? Desde la pantalla de check-out en una estación atendida, el personal puede enviar un **aviso**: un mensaje de texto a los padres o tutores del niño a través del proveedor de mensajes de texto de la iglesia. Los padres que optaron por no recibir mensajes de texto o que no tienen un número móvil registrado se omiten, y el quiosco muestra cuántos mensajes se enviaron.

## Reimprimir etiquetas

Si una etiqueta o etiqueta de recogida se pierde o se daña, el personal de una estación atendida puede **reimprimir** las etiquetas de la familia desde la pantalla de check-out después de ingresar el código de seguridad. La reimpresión usa la misma impresora y las mismas plantillas de etiquetas que el check-in original.

## Difusión de emergencia

En una emergencia, el personal puede enviar un mensaje de texto a los tutores de **todos los niños registrados** para el servicio actual a la vez:

1. Abre la **configuración de administrador** del quiosco (7 toques rápidos en el logotipo del encabezado, más el PIN si se ha configurado uno).
2. Toca **Emergency broadcast**.
3. Ingresa el mensaje, luego escribe **EMERGENCY** en el campo de confirmación — el botón **Send broadcast** permanece deshabilitado hasta que lo hagas.
4. El quiosco informa cuántos teléfonos recibieron el mensaje y cuántas personas se omitieron (optaron por no recibir mensajes o no tienen un número móvil).

:::warning
La difusión llega a todos los hogares registrados para el servicio seleccionado. Úsala para emergencias genuinas — evacuaciones, confinamientos, clima severo.
:::

## Artículos relacionados

- [Completar el check-in](./completing-checkin) — de dónde provienen los códigos de seguridad y las etiquetas de recogida
- [Seguridad en el check-in](../../b1-admin/attendance/checkin-safety) — configuración de capacidades, proporciones, personas para recoger y el requisito del proveedor de mensajes de texto
- [Configuración de la impresora](../getting-started/printer-setup) — configuración de la impresora de etiquetas
