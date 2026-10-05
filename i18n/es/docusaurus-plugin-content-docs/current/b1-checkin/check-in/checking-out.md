---
title: "Registro de Salida y Seguridad Infantil"
---

# Registro de Salida y Seguridad Infantil

<div class="article-intro">

El registro de salida cierra el círculo del registro de entrada de niños: un padre presenta el código de seguridad de su etiqueta de recogida, el quiosco verifica quién está recogiendo, y los niños se registran como salida. Las estaciones atendidas también obtienen herramientas de seguridad -- verificación de recogida confiable, textos de aviso de padres, reimpresiones de etiquetas de seguridad y una transmisión de emergencia.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- El registro de salida está disponible en estaciones configuradas en modo **manned** en la configuración de administración del quiosco
- Los niños deben haber sido [registrados](./completing-checkin) con una etiqueta de recogida impresa que lleve el código de seguridad
- Los avisos y las transmisiones de emergencia requieren que tu iglesia tenga un proveedor de mensajes de texto conectado en B1 Admin

</div>

## Inicio de un Registro de Salida

1. En una estación atendida, toca **Check Out** en la pantalla de búsqueda.
2. Ingresa el **security code** de 4 caracteres de la etiqueta de recogida de la familia. Puedes escribirlo, usar el teclado en pantalla o escanear el código de barras de la etiqueta con un escáner USB o Bluetooth -- el código se envía automáticamente una vez que se ingresan los 4 caracteres.
   - ¿Sin escáner? Toca **Scan** debajo del campo de código para usar la cámara de la tableta en su lugar. Sostén el código QR o código de barras de la etiqueta de recogida frente a la cámara en la ventana **Scan pickup code** y el código se ingresa automáticamente. La cámara trasera se usa de forma predeterminada; toca el botón de volteo para cambiar cámaras, o toca **Cancel** para volver a escribir.
3. El quiosco muestra los niños registrados bajo ese código.

## Verificación de Quién Está Recogiendo

La pantalla de registro de salida pregunta quién está recogiendo a los niños:

- Las **Trusted pickup people** para el hogar aparecen como tarjetas tocables con su foto y relación -- toca la persona parada frente a ti.
- Los **Household adults** también aparecen en una cuadrícula de fotos.
- **Other** te permite escribir un nombre para alguien que no está en la lista.

Si un nombre escrito coincide con alguien marcado **Not Authorized** para ese hogar, el quiosco bloquea el registro de salida con una advertencia. Un miembro del personal puede elegir **Override** para proceder de todas formas -- el override se registra en el registro de asistencia con el nombre de la persona.

Una vez que el recolector se confirma, toca el registro de salida. El nombre de la persona de recogida se almacena con el registro de asistencia.

:::info
Las personas de recogida confiables y no autorizadas son administradas por el personal de la iglesia en la página de cada persona en B1 Admin -- consulta [Seguridad de Registro de Entrada](../../b1-admin/attendance/checkin-safety#trusted-and-not-authorized-pickup-people).
:::

## Aviso de Padres

¿Necesitas un padre durante el servicio -- un cambio de pañal, un niño llorando? Desde la pantalla de registro de salida en una estación atendida, el personal puede enviar un **page**: un mensaje de texto a los padres o tutores del niño a través del proveedor de mensajes de texto de la iglesia. Los padres que optaron por no recibir mensajes de texto o que no tienen número de teléfono móvil se omiten, y el quiosco muestra cuántos mensajes se enviaron.

## Reimpresión de Etiquetas

Si una etiqueta de nombre o etiqueta de recogida se pierde o daña, el personal en una estación atendida puede **reprint** las etiquetas de la familia desde la pantalla de registro de salida después de ingresar el código de seguridad. La reimpresión utiliza la misma impresora y plantillas de etiqueta que el registro de entrada original.

## Transmisión de Emergencia

En una emergencia, el personal puede enviar un mensaje de texto a los tutores de cada niño registrado para el servicio actual a la vez:

1. Abre la **admin settings** del quiosco (7 toques rápidos en el logo del encabezado, más el PIN si está configurado).
2. Toca **Emergency broadcast**.
3. Ingresa el mensaje, luego escribe **EMERGENCY** en el campo de confirmación -- el botón **Send broadcast** permanece deshabilitado hasta que lo hagas.
4. El quiosco informa cuántos teléfonos recibieron el mensaje y cuántas personas se omitieron (optaron por no participar o sin número de teléfono móvil).

:::warning
La transmisión va a cada hogar registrado para el servicio seleccionado. Úsalo para emergencias genuinas -- evacuaciones, bloqueos, clima severo.
:::

## Artículos Relacionados

- [Completar el Registro de Entrada](./completing-checkin) -- de dónde provienen los códigos de seguridad y las etiquetas de recogida
- [Seguridad de Registro de Entrada](../../b1-admin/attendance/checkin-safety) -- configuración de capacidades, proporciones, personas de recogida y requisito de proveedor de mensajes de texto
- [Configuración de Impresora](../getting-started/printer-setup) -- configuración de impresora de etiquetas
