---
title: "Notificaciones push web"
---

# Notificaciones push web

<div class="article-intro">

Las aplicaciones web de ChurchApps entregan notificaciones push a través de la API de Web Push del W3C -- el mismo mecanismo utilizado por Firebase Cloud Messaging en el lado del servidor, pero entregado a través del `PushManager` nativo del navegador en lugar de FCM. Un par de claves VAPID único en MessagingApi cubre cada consumidor (B1Admin, B1App, PWAs futuras).

</div>

## Cuando se dispara push

Push es un nivel en un único paso de entrega dentro de `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): una puerta de preferencia en la aplicación, luego entrega por socket e intentos de push en el mismo paso (cada uno detrás de su propia puerta de preferencia), luego correo electrónico. Un destinatario que ha silenciado la categoría nunca llega a push. El éxito de la entrega por socket ya no detiene push -- cada tipo de notificación ahora se comporta de la manera que los mensajes privados siempre lo hicieron, para que un PWA instalado sentado en el fondo aún pueda mostrar una notificación a nivel del SO incluso cuando una entrega por socket ya llegó; los banners duplicados se suprimen del lado del cliente por el service worker en su lugar (vea [Requisito del service worker](#requisito-del-service-worker)). Los recordatorios programados y las transmisiones desencadenadas por el personal comienzan directamente en el nivel de push, omitiendo completamente el paso del socket. El correo electrónico permanece impulsado por temporizador, escalando filas no leídas en su propio horario en lugar de como parte de este paso.

Las rutas más comunes que llegan a push:

1. **Notificaciones de contenido** -- una respuesta a una conversación que la persona sigue, una mención, u otro evento enrutado a través de `NotificationHelper.createNotifications()`.
2. **Mensajes privados** -- un mensaje directo pasa por la misma función de entrega e intenta siempre push junto con la entrega por socket.
3. **Recordatorios programados** -- recordatorios de eventos, tareas y servicios expandidos y despachados por el motor de recordatorios, que comienza nuevas ocurrencias directamente en el nivel de push.
4. **Pushes desencadenados por el personal** -- `POST /messaging/notifications/create`, `/ping`, y `/group/send` para transmisiones individuales o grupales.

## Flujo del servidor

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ in-app preference gate                  ← muted recipients stop here, no push
       ├─ same pass, both attempted (neither gates the other):
       │    ├─ socket delivery via DeliveryHelper  ← skipped for reminders/broadcasts (they start at push)
       │    └─ push preference gate
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ web-push library → VAPID-signed POST → browser push service
       └─ email preference gate → timer-driven, escalates unread rows separately
```

### Variables de entorno requeridas

Las claves VAPID se almacenan en `Environment` y deben estar presentes para que push esté habilitado:

| Variable | Descripción |
|----------|-------------|
| `webPushPublicKey` | Clave pública VAPID (base64url). Devuelta a clientes a través de `GET /messaging/webpush/publicKey` |
| `webPushPrivateKey` | Clave privada VAPID. Se usa para firmar cada push saliente |
| `webPushSubject` | URI `mailto:` reportado a servicios push. Por defecto es `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` devuelve `false` cuando falta alguna clave -- el módulo de mensajería continúa operando, las entregas push simplemente no hacen nada.

### Generación de un par de claves VAPID

```bash
npx web-push generate-vapid-keys
```

Agregue la salida a su `.env` (local) o a AWS SSM Parameter Store (desplegado). Rotar claves invalida cada suscripción existente -- los clientes deben re-inscribirse en la próxima carga de página.

## Modelo de almacenamiento

Las suscripciones Web Push se almacenan en la tabla `devices` existente junto con registros de dispositivos de FCM. Se distinguen por un prefijo `webpush:` en la columna `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Esto permite que una única llamada `loadByPersonId` devuelva cada dispositivo en el que se ha inscrito un usuario, independientemente de la plataforma. `WebPushHelper.isWebPushToken(token)` y `decodeSubscription(token)` manejan la lógica del prefijo.

## Endpoints

Ruta base: `/messaging/webpush`

| Método | Ruta | Autenticación | Descripción |
|--------|------|------|-------------|
| GET | `/publicKey` | Público | Devuelve `{ publicKey, enabled }`. Los clientes pasan `publicKey` a `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Registra (o actualiza) una suscripción para el usuario autenticado. Cuerpo: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Público | Elimina cualquier fila de dispositivo cuya `fcmToken` contiene el endpoint dado. Cuerpo: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Elimina una fila de dispositivo específica por su id del lado del servidor |

## Primitivo del cliente: `WebPushHelper`

`WebPushHelper` de `@churchapps/apphelper` es el único punto de entrada del lado del cliente. Los hosts lo configuran una vez al iniciar y llaman a `subscribe()` después de iniciar sesión.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// En el bootstrap de su aplicación (por ejemplo, _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // service worker scope; matches sw.js registration
  appName: "B1AppPwa"        // stored on the device row, useful for filtering by surface
});

// Después de iniciar sesión (y después de cada cambio de userChurch)
await WebPushHelper.subscribe();
```

Los comportamientos que los consumidores obtienen de forma gratuita:

- **Verificación de capacidad** -- `isSupported()` devuelve `false` en navegadores sin `serviceWorker` / `PushManager` / `Notification`.
- **Enfriamiento** -- `canPromptNow()` aplica un enfriamiento de 7 días entre solicitudes a través de `localStorage` para que los usuarios que descartan la solicitud del SO no sean preguntados nuevamente en cada sesión.
- **Optar por no participar** -- `setOptedOut(true)` y `unsubscribe()` bloquean volver a solicitar y eliminan la fila de dispositivo del lado del servidor.
- **Detección de PWA independiente** -- `isStandalone()` permite a los hosts restringir los prompts de push de iOS detrás de "el usuario ha instalado el PWA en su pantalla de inicio" (iOS solo permite push desde PWAs instalados).
- **Reinscripción al cambiar iglesia** -- `refreshEnrollment()` reenvía la suscripción del navegador existente contra el nuevo `userChurch` sin volver a solicitar al usuario. Llámelo desde el controlador de cambio de `userChurch`.

### Requisito del service worker

El `PushManager` del navegador solo resuelve una suscripción cuando se registra un service worker en el scope configurado. Los PWAs de ChurchApps utilizan [Serwist](https://serwist.dev/) (aplicaciones Next.js) o workbox para la generación de service worker. Debido a que el servidor ahora siempre intenta push junto con la entrega por socket (vea [Cuando se dispara push](#cuando-se-dispara-push)), el service worker es el punto de deduplicación: su controlador `push` debe suprimir `showNotification` cuando un cliente enfocado/visible ya está en el destino del enlace profundo de la notificación, pero siempre debe actualizar el distintivo de la aplicación independientemente de si el banner se mostró:

```javascript
// public/sw.js (o lo que emite Serwist/workbox)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // always runs, even if the banner is suppressed

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    // Same pathname; for private messages, also same conversationId.
    const alreadyViewing = clients.some((client) => (client.focused || client.visibilityState === "visible") && clientMatchesTarget(client.url, target));
    if (alreadyViewing) return;

    await self.registration.showNotification(title, {
      body: data.body,
      data: { type: data.type, contentId: data.contentId, url: target },
      icon: "/icons/icon-192.png"
    });
  })());
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const { url: target } = event.notification.data || {};
  event.waitUntil((async () => {
    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });

    const exact = clients.find((client) => clientMatchesTarget(client.url, target));
    if (exact) return exact.focus(); // already on the target: focus, don't navigate

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

`deepLinkFor` / `clientMatchesTarget` son específicas del consumidor -- vea `B1App/src/app/sw.ts` para la implementación de referencia. B1App enruta `privateMessage` a `/mobile/messages/:personId`, B1Admin enruta `notification` a su panel de alertas, etc.

## Notas operacionales

- **Resultados `gone: true`** -- `WebPushHelper.sendBulk` devuelve `{ token, success, gone, errorMessage }` por destinatario. Un resultado `gone: true` (servicio push respondió `404` o `410`) significa que la suscripción es permanentemente inválida; el código descendente en `NotificationHelper` elimina esas filas de dispositivo para que no se intenten nuevamente.
- **TTL** -- los mensajes push se envían con `TTL: 86400` (24 horas). Si el navegador del usuario no se conecta al servicio push dentro de 24 horas, el push se descarta.
- **Sin reintentos** -- un fallo transitorio (timeout, 5xx) se registra y no se reintenta. Push es mejor esfuerzo; el socket en la página y el nivel de notificación por correo electrónico manejan la historia de durabilidad.
- **Entornos deshabilitados** -- los entornos de staging y desarrollo pueden dejar las claves VAPID vacías; `WebPushHelper.isEnabled()` devolverá `false` y los pushes se cortocircuitarán. Este es el comportamiento deseado para entornos sin su propia identidad VAPID.

## Páginas relacionadas

- [Arquitectura de notificaciones](./architecture/notifications) -- El embudo completo de escalada en la aplicación/push/correo electrónico y el motor de recordatorios
- [Arquitectura en tiempo real](./realtime) -- Entrega WebSocket; push ahora se dispara desde el mismo embudo en la aplicación junto con la entrega de socket en el mismo paso, no solo como respaldo cuando una entrega de socket no llega
- [Endpoints de mensajería](./api/endpoints/messaging) -- Notificaciones, dispositivos y el resto de la superficie de mensajería
- [AppHelper](./shared-libraries/app-helper) -- El paquete npm que envía `WebPushHelper`
