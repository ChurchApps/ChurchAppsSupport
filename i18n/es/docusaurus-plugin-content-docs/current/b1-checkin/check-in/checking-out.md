---
title: "Registro de salida y seguridad infantil"
description: "Registra la salida de los niños en una estación atendida de B1 Checkin con códigos de seguridad, personas de recogida verificadas, avisos a padres, reimpresión de etiquetas y difusiones de emergencia."
---

# Registro de salida y seguridad infantil {#checking-out--child-safety}

<div class="article-intro">

El registro de salida cierra el ciclo del registro de entrada de niños: un padre presenta el código de seguridad de su etiqueta de recogida, el quiosco verifica quién está recogiendo y los niños se registran como salidos. Las estaciones atendidas también cuentan con herramientas de seguridad: verificación de personas de recogida de confianza, mensajes de aviso a padres, reimpresión de etiquetas de seguridad y una difusión de emergencia.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- El registro de salida está disponible en las estaciones configuradas en modo **manned** en la configuración de administración del quiosco
- Los niños deben haber sido [registrados](./completing-checkin.md) con una etiqueta de recogida impresa que lleve el código de seguridad
- Los avisos y las difusiones de emergencia requieren que su iglesia tenga un proveedor de mensajes de texto conectado en B1 Admin

</div>

## Inicio de un registro de salida {#starting-a-check-out}

1. En una estación atendida, toque **Check Out** en la pantalla de búsqueda.
2. Ingrese el **security code** de 4 caracteres de la etiqueta de recogida de la familia. Puede escribirlo, usar el teclado en pantalla o escanear el código de barras de la etiqueta con un escáner USB o Bluetooth; el código se envía automáticamente cuando se ingresan los 4 caracteres.
   - ¿No tiene escáner? Toque **Scan** debajo del campo del código para usar la cámara de la tableta. Sostenga el código QR o el código de barras de la etiqueta de recogida frente a la cámara, en la ventana **Scan pickup code**, y el código se ingresará por usted. Por defecto se usa la cámara trasera; toque el botón de cambio para alternar cámaras, o toque **Cancel** para volver a escribir el código.
3. El quiosco muestra los niños registrados con ese código.

### Buscar una familia sin el código {#finding-a-family-without-the-code}

Si el padre perdió su etiqueta de recogida, busque a la familia en su lugar:

1. En la pantalla **Check Out**, toque **Search by name** (junto a **Scan**).
2. Escriba el apellido de la familia y toque **Search**, o toque **Use phone number** para ingresar un número de teléfono (al menos los últimos 4 dígitos) en el teclado.
3. Toque a la persona en los resultados. El quiosco encuentra a todas las personas de ese hogar que están registradas hoy y que aún no han salido, y las muestra como si se hubiera ingresado el código.

Si nadie del hogar está registrado, el quiosco muestra "No one in this household is checked in right now." Toque **New search** para buscar de nuevo, o **Enter code instead** para volver al campo del código.

La verificación de la persona que recoge, descrita a continuación, sigue aplicándose: se listan las personas de recogida de confianza y los adultos del hogar, y los nombres no autorizados siguen bloqueados.

## Verificación de quién recoge a los niños {#verifying-who-is-picking-up}

La pantalla de registro de salida pregunta quién recoge a los niños:

- Las **Trusted pickup people** del hogar aparecen como tarjetas tocables con su foto y su relación; toque a la persona que está frente a usted.
- Los **Household adults** también aparecen en una cuadrícula de fotos.
- **Other** le permite escribir el nombre de alguien que no está en la lista.

Si un nombre escrito coincide con una persona marcada como **Not Authorized** para ese hogar, el quiosco bloquea el registro de salida y muestra una advertencia. Un miembro del personal puede elegir **Override** para continuar de todos modos; la anulación queda registrada en el registro de asistencia con el nombre de la persona.

Una vez confirmada la persona que recoge, toque para registrar la salida. El nombre de la persona que recoge se guarda con el registro de asistencia.

:::info
Las personas de recogida de confianza y las no autorizadas son administradas por el personal de la iglesia en la página de cada persona en B1 Admin; consulte [Seguridad de registro de entrada](../../b1-admin/attendance/checkin-safety.md#trusted-and-not-authorized-pickup-people).
:::

## Avisar a un padre {#paging-a-parent}

¿Necesita a un padre durante el servicio, por un cambio de pañal o un niño que llora? Desde la pantalla de registro de salida de una estación atendida, el personal puede enviar un **page**: un mensaje de texto a los padres o tutores del niño a través del proveedor de mensajes de texto de la iglesia. Se omite a los padres que optaron por no recibir mensajes de texto o que no tienen número de teléfono móvil, y el quiosco muestra cuántos mensajes se enviaron.

## Reimprimir etiquetas {#reprinting-labels}

Si una etiqueta de nombre o de recogida se pierde o se daña, el personal de una estación atendida puede **reprint** las etiquetas de la familia desde la pantalla de registro de salida, después de ingresar el código de seguridad. La reimpresión usa la misma impresora y las mismas plantillas de etiquetas que el registro de entrada original.

## Difusión de emergencia {#emergency-broadcast}

En una emergencia, el personal puede enviar un mensaje de texto a los tutores de **todos los niños registrados** para el servicio actual al mismo tiempo:

1. Abra la **admin settings** del quiosco (7 toques rápidos en el logotipo del encabezado, más el PIN si está configurado).
2. Toque **Emergency broadcast**.
3. Escriba el mensaje y luego escriba **EMERGENCY** en el campo de confirmación; el botón **Send broadcast** permanece deshabilitado hasta que lo haga.
4. El quiosco informa cuántos teléfonos recibieron el mensaje y cuántas personas se omitieron (por no participar o por no tener número de teléfono móvil).

:::warning
La difusión llega a todos los hogares registrados para el servicio seleccionado. Úsela solo en emergencias reales, como evacuaciones, cierres de emergencia o clima severo.
:::

## Artículos relacionados {#related-articles}

- [Completar el registro de entrada](./completing-checkin.md): de dónde provienen los códigos de seguridad y las etiquetas de recogida
- [Seguridad de registro de entrada](../../b1-admin/attendance/checkin-safety.md): configuración de capacidades, proporciones, personas de recogida y el requisito del proveedor de mensajes de texto
- [Configuración de impresora](../getting-started/printer-setup.md): configuración de la impresora de etiquetas
