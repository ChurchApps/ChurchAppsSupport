---
title: "Mobile Message"
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) es una API de SMS australiana — popular con iglesias de AU porque ofrece números locales y precios competitivos de AU donde Clearstream y Text In Church son céntricos en EE. UU. Mobile Message no tiene una aplicación de Zapier de primera clase hoy, pero sí publica una API REST pública, así que puedes conectar eventos de B1 a textos de Mobile Message a través de **Webhooks por Zapier** (o módulo HTTP de Make) en pocos minutos.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Una cuenta de [Mobile Message](https://mobilemessage.com.au) con un ID de remitente registrado y credenciales de API (nombre de usuario de API + contraseña bajo *Cuenta → Configuración de API*)
- Una cuenta de [Zapier](https://zapier.com) (o [Make](https://www.make.com))
- Un usuario de B1Admin con permiso **Editar Configuración**

</div>

## Qué Puedes Conectar

La API de Mobile Message es "enviar SMS" — sin disparadores, solo texto saliente. Así que las recetas son todas B1 → SMS:

| Dirección | Disparador de B1 | Resultado |
|---|---|---|
| B1 → Mobile Message | `person.created` | Texto de bienvenida a la nueva persona |
| B1 → Mobile Message | `donation.created` | Texto de agradecimiento al donante |
| B1 → Mobile Message | `form.submission.created` | Página al equipo de guardia |
| B1 → Mobile Message | `event.created` | Transmisión de recordatorio a una lista |

## Configuración

### 1. Crear una clave de API B1

**Configuración → Desarrollador → Claves de API → Nueva Clave de API**:

- `settings:write` — para que el webhook de disparador se registre
- `people:read` — para buscar el número de teléfono del destinatario de un `personId`

### 2. Construir el Zap con Webhooks por Zapier

1. **Disparador** — B1.church: elige el evento que deseas (p. ej. Nueva donación).
2. **Acción** — B1.church: Buscar persona (usando `data.personId`) para obtener el número de teléfono y nombre.
3. **Acción** — Webhooks por Zapier: **POST**. Configura como se indica a continuación.

La configuración del paso POST:

- **URL** — `https://api.mobilemessage.com.au/v1/messages`
- **Tipo de carga** — JSON
- **Datos** —
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "¡Gracias por tu regalo, {{step2_first_name}}!",
        "sender": "TuIglesia"
      }
    ]
  }
  ```
- **Encabezados** — `Content-Type: application/json` (Webhooks por Zapier agrega esto automáticamente)
- **Autenticación básica** — establece el campo *Autenticación básica* a `<api_username>|<api_password>` (Zapier convierte eso al encabezado `Authorization: Basic …` correcto)

Activa el Zap. Envía un regalo de prueba en B1Admin para verificar que llega un texto.

## Recetas Comunes

### Recordatorios de eventos la mañana de

- **Disparador** — Programación por Zapier (diaria, 7am)
- **Acción** — B1.church: Buscar eventos para hoy (o usa un paso de búsqueda con un filtro de fecha fija, o almacena la lista de eventos de hoy en una hoja de Google)
- **Acción** — Webhooks por Zapier: POST a Mobile Message con la lista de eventos a un grupo de suscriptor registrado

### Usa el punto final de lote para una transmisión de lista

El punto final `/v1/messages` de Mobile Message acepta hasta 10,000 mensajes por llamada. Para transmitir a un grupo de B1:

- **Disparador** — B1.church: Nuevo envío de formulario (filtro a un formulario específico)
- **Acción** — B1.church: Enumerar miembros de grupo para un grupo objetivo (a través de un paso *Webhooks por Zapier — GET* en `/membership/groupmembers?groupId=…`)
- **Acción** — Formateador por Zapier → Utilidades → Elementos de línea la respuesta en una matriz `messages`
- **Acción** — Webhooks por Zapier: POST la matriz completa a `/v1/messages`

### Alternativa de Make

Si prefieres Make, coloca el módulo **HTTP — Hacer una solicitud** después del disparador B1 Ver eventos, configúralo de la misma manera (POST, autenticación básica, cuerpo JSON). Ve la [descripción general de Make](../make) para el lado B1.

## Límites y Notas

- **Autenticación básica es el único método de autenticación** — Mobile Message emite un nombre de usuario y contraseña desde el panel. Trata ambos como secretos.
- **`sender` debe ser un ID de remitente registrado** en tu cuenta de Mobile Message, o el envío devolverá `400 Invalid sender`. Las regulaciones australianas requieren registro de remitente.
- **Los números de teléfono de AU** pueden ser `0412345678` (local) o `+61412345678` (internacional). La API acepta ambos, pero normaliza en `+61…` si también estás enviando al extranjero.
- **Hasta 10,000 mensajes por solicitud** — útil para transmisiones, pero una única entrega de webhook de B1 rara vez emitirá una lista tan grande; reserva el punto final de lote para Zaps de lote programados.

## Solución de Problemas

- **POST devuelve `401 Unauthorized`** — las credenciales de autenticación básica son incorrectas. Vuelve a copiar desde el panel de Mobile Message *Cuenta → Configuración de API*. Nota el nombre de usuario es tu correo de cuenta por defecto, no una clave de API separada.
- **POST devuelve `400 Invalid sender`** — el valor `sender` no es un ID de remitente registrado en tu cuenta. Regístralo en el panel de Mobile Message primero.
- **El texto llega pero se trunca** — Mobile Message divide mensajes sobre ~160 caracteres en múltiples partes; se te factura por parte. Verifica el cuerpo de respuesta — te dice el recuento de partes.

## Ver También

- [Clearstream](./clearstream), [Text In Church](./text-in-church) — proveedores SMS alternativos con aplicaciones de Zapier nativas (no se necesita paso de Webhooks-por-Zapier)
- [Zapier (descripción general)](../zapier) — lado B1 de cada receta de Zapier
- [Documentos de API de Mobile Message](https://mobilemessage.com.au/api-documentation)
