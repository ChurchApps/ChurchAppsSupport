---
title: "Mobile Message"
description: "Conecte los eventos de B1 Admin con Mobile Message, una API de SMS de Australia, mediante webhooks de Zapier o Make para enviar mensajes de bienvenida, de donaciones y de recordatorio."
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) es una API de SMS de Australia, popular entre las iglesias australianas porque ofrece números locales y precios competitivos en Australia, donde Clearstream y Text In Church están centrados en EE. UU. Mobile Message no tiene hoy una aplicación de Zapier de primera clase, pero publica una API REST pública, así que puede conectar los eventos de B1 con los mensajes de Mobile Message a través de **Webhooks by Zapier** (o del módulo HTTP de Make) en unos pocos minutos.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Una cuenta de [Mobile Message](https://mobilemessage.com.au) con un Sender ID registrado y credenciales de API (nombre de usuario y contraseña de la API en *Account → API Settings*)
- Una cuenta de [Zapier](https://zapier.com) (o de [Make](https://www.make.com))
- Un usuario de B1Admin con el permiso **Edit Settings**

</div>

## Lo que puede conectar {#what-you-can-wire-up}

La API de Mobile Message tiene forma de "enviar SMS": no tiene disparadores, solo texto saliente. Por eso todas las recetas van de B1 → SMS:

| Dirección | Disparador de B1 | Resultado |
|---|---|---|
| B1 → Mobile Message | `person.created` | Mensaje de bienvenida a la persona nueva |
| B1 → Mobile Message | `donation.created` | Mensaje de agradecimiento al donante |
| B1 → Mobile Message | `form.submission.created` | Avisar al equipo de guardia |
| B1 → Mobile Message | `event.created` | Difusión de recordatorio a una lista |

## Configuración {#setup}

### 1. Cree una clave de API de B1 {#1-mint-a-b1-api-key}

**Settings → Developer → API Keys → New API Key**:

- `settings:write`: para que se registre el webhook del disparador
- `people:read`: para buscar el número de teléfono del destinatario a partir de un `personId`

### 2. Cree el Zap con Webhooks by Zapier {#2-build-the-zap-with-webhooks-by-zapier}

1. **Disparador**: B1.church: elija el evento que desee (por ejemplo, New Donation).
2. **Acción**: B1.church: Find Person (usando `data.personId`) para obtener el número de teléfono y el nombre.
3. **Acción**: Webhooks by Zapier: **POST**. Configúrela como se indica a continuación.

La configuración del paso POST:

- **URL**: `https://api.mobilemessage.com.au/v1/messages`
- **Payload Type**: JSON
- **Data**:
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Thanks for your gift, {{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **Headers**: `Content-Type: application/json` (Webhooks by Zapier lo agrega automáticamente)
- **Basic Auth**: en el campo *Basic Auth* escriba `<api_username>|<api_password>` (Zapier lo convierte en el encabezado `Authorization: Basic …` correcto)

Active el Zap. Envíe un donativo de prueba en B1Admin para verificar que llegue un mensaje.

## Recetas comunes {#common-recipes}

### Recordatorios de eventos la mañana del evento {#event-reminders-the-morning-of}

- **Disparador**: Schedule by Zapier (diario, 7 a. m.)
- **Acción**: mantenga la lista de eventos de hoy en una hoja de Google (u otra aplicación que Zapier pueda leer) y busque las filas de hoy: la aplicación de Zapier de B1 no tiene una acción para buscar eventos
- **Acción**: Webhooks by Zapier: POST a Mobile Message con la lista de eventos para un grupo de suscriptores registrado

### Usar el endpoint por lotes para una difusión a una lista {#use-the-batch-endpoint-for-a-list-broadcast}

El endpoint `/v1/messages` de Mobile Message acepta hasta 10,000 mensajes por llamada. Para difundir a un grupo de B1:

- **Disparador**: B1.church: New Form Submission (filtrado a un formulario específico)
- **Acción**: Webhooks by Zapier: GET `/membership/groupmembers?groupId=…` para listar los miembros del grupo de destino (la aplicación de Zapier de B1 no tiene una acción de lista para esto; envíe la clave de API como encabezado `Authorization: Bearer cak_…`)
- **Acción**: Formatter by Zapier → Utilities → Line-itemize la respuesta para convertirla en un arreglo `messages`
- **Acción**: Webhooks by Zapier: POST del arreglo completo a `/v1/messages`

### Alternativa con Make {#make-alternative}

Si prefiere Make, agregue el módulo **HTTP — Make a request** después del disparador Watch Events de B1 y configúrelo de la misma forma (POST, Basic Auth, cuerpo JSON). Consulte la [descripción general de Make](../make.md) para el lado de B1: tenga en cuenta que la aplicación de Make para B1.church todavía no está publicada.

## Límites y notas {#limits--notes}

- **Basic Auth es el único método de autenticación**: Mobile Message emite un nombre de usuario y una contraseña desde el panel. Trate ambos como secretos.
- **`sender` debe ser un Sender ID registrado** en su cuenta de Mobile Message, o el envío devolverá `400 Invalid sender`. La normativa australiana exige el registro del remitente.
- **Los números de teléfono australianos** pueden ser `0412345678` (local) o `+61412345678` (internacional). La API acepta ambos, pero normalice a `+61…` si también envía mensajes al extranjero.
- **Hasta 10,000 mensajes por solicitud**: es útil para difusiones, pero una sola entrega de webhook de B1 rara vez generará una lista tan grande; reserve el endpoint por lotes para Zaps masivos programados.

## Solución de problemas {#troubleshooting}

- **El POST devuelve `401 Unauthorized`**: las credenciales de Basic Auth son incorrectas. Cópielas de nuevo desde el panel de Mobile Message en *Account → API Settings*. Tenga en cuenta que, por defecto, el nombre de usuario es el correo electrónico de su cuenta, no una clave de API independiente.
- **El POST devuelve `400 Invalid sender`**: el valor de `sender` no es un Sender ID registrado en su cuenta. Regístrelo primero en el panel de Mobile Message.
- **El mensaje llega cortado**: Mobile Message divide los mensajes de más de unos 160 caracteres en varias partes, y se le cobra por parte. Revise el cuerpo de la respuesta: indica la cantidad de partes.

## Vea también {#see-also}

- [Clearstream](./clearstream.md) y [Text In Church](./text-in-church.md): proveedores de SMS alternativos con aplicaciones nativas de Zapier (no necesitan el paso Webhooks by Zapier)
- [Zapier (descripción general)](../zapier.md): el lado de B1 de cada receta de Zapier
- [Documentación de la API de Mobile Message](https://mobilemessage.com.au/api-documentation)
