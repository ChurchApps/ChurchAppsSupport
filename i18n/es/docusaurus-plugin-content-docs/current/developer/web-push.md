---
title: "Notificaciones Push Web"
---

# Notificaciones Push Web

<div class="article-intro">

Las aplicaciones web de ChurchApps entregan notificaciones push a través de la API de Web Push del W3C -- el mismo mecanismo usado por Firebase Cloud Messaging en el lado del servidor, pero entregado a través del `PushManager` nativo del navegador en lugar de FCM. Un único par de claves VAPID en MessagingApi cubre a cada consumidor (B1Admin, B1App, futuras PWAs).

</div>

## Cuándo se Dispara Push

Push es un nivel en un único paso de entrega dentro de `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): una puerta de preferencia en la aplicación, luego entrega por socket y push intentados en el mismo paso (cada uno detrás de su propia puerta de preferencia), luego correo. Un destinatario que ha silenciado la categoría nunca llega a push. Que la entrega por socket tenga éxito ya no detiene push -- cada tipo de notificación ahora se comporta de la manera en que los mensajes privados siempre lo hicieron, así que un PWA instalado sentado en segundo plano todavía muestra una notificación a nivel de SO incluso cuando una entrega por socket ya llegó; los banners duplicados se suprimen del lado del cliente por el service worker en su lugar (consulta [Requisito de Service Worker](#requisito-de-service-worker)). Los recordatorios programados y las transmisiones activadas por el personal comienzan directamente en el nivel de push, omitiendo el paso de socket por completo. El correo permanece impulsado por temporizador, escalando filas no leídas en su propio horario en lugar de como parte de este paso.

Las rutas más comunes que llegan a push:

1. **Notificaciones de contenido** — una respuesta a una conversación que la persona sigue, una mención, u otro evento enrutado a través de `NotificationHelper.createNotifications()`.
2. **Mensajes privados** — un mensaje directo pasa por la misma función de entrega y siempre intenta push junto con la entrega por socket.
3. **Recordatorios programados** — recordatorios de eventos, tareas, y servicio expandidos y despachados por el motor de recordatorios, que inicia nuevas ocurrencias directamente en el nivel de push.
4. **Pushes activados por el personal** — `POST /messaging/notifications/create`, `/ping`, y `/group/send` para transmisiones únicas o grupales.

## Flujo del Servidor

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

### Variables de Entorno Requeridas

Las claves VAPID se almacenan en `Environment` y deben estar presentes para que push esté habilitado:

| Variable | Descripción |
|----------|-------------|
| `webPushPublicKey` | Clave pública VAPID (base64url). Devuelta a los clientes vía `GET /messaging/webpush/publicKey` |
| `webPushPrivateKey` | Clave privada VAPID. Usada para firmar cada push saliente |
| `webPushSubject` | URI `mailto:` reportada a los servicios push. Por defecto `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` devuelve `false` cuando falta cualquiera de las claves -- el módulo de mensajería continúa operando, las entregas push simplemente no hacen nada.

### Generar un Par de Claves VAPID

```bash
npx web-push generate-vapid-keys
```

Agrega la salida a tu `.env` (local) o AWS SSM Parameter Store (implementado). Rotar claves invalida cada suscripción existente -- los clientes deben re-inscribirse en la siguiente carga de página.

## Modelo de Almacenamiento

Las suscripciones de Web Push se almacenan en la tabla `devices` existente junto con los registros de dispositivo FCM. Se distinguen por un prefijo `webpush:` en la columna `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Esto permite que una única llamada `loadByPersonId` devuelva cada dispositivo en el que un usuario se ha inscrito, independientemente de la plataforma. `WebPushHelper.isWebPushToken(token)` y `decodeSubscription(token)` manejan la lógica del prefijo.

## Puntos Finales

Ruta base: `/messaging/webpush`

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/publicKey` | Público | Devuelve `{ publicKey, enabled }`. Los clientes pasan `publicKey` a `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Registra (o hace upsert de) una suscripción para el usuario autenticado. Cuerpo: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Público | Elimina cualquier fila de dispositivo cuyo `fcmToken` contenga el endpoint dado. Cuerpo: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Elimina una fila de dispositivo específica por su id del lado del servidor |

## Primitiva del Cliente: `WebPushHelper`

El `WebPushHelper` de `@churchapps/apphelper` es el único punto de entrada del lado del cliente. Los hosts lo configuran una vez al arrancar y llaman a `subscribe()` después del inicio de sesión.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// En el arranque de tu aplicación (p. ej., _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // ámbito del service worker; coincide con el registro de sw.js
  appName: "B1AppPwa"        // almacenado en la fila de dispositivo, útil para filtrar por superficie
});

// Después del inicio de sesión (y después de cada cambio de userChurch)
await WebPushHelper.subscribe();
```

Comportamientos que los consumidores obtienen gratis:

- **Verificación de capacidad** — `isSupported()` devuelve `false` en navegadores sin `serviceWorker` / `PushManager` / `Notification`.
- **Enfriamiento** — `canPromptNow()` aplica un enfriamiento de 7 días entre indicaciones vía `localStorage` para que los usuarios que descartan la indicación del SO no sean preguntados de nuevo en cada sesión.
- **Exclusión voluntaria** — `setOptedOut(true)` y `unsubscribe()` bloquean volver a preguntar y eliminan la fila de dispositivo del lado del servidor.
- **Detección de PWA independiente** — `isStandalone()` permite a los hosts restringir las indicaciones de push de iOS detrás de "el usuario ha instalado el PWA en su pantalla de inicio" (iOS solo permite push desde PWAs instalados).
- **Re-inscripción al cambiar de iglesia** — `refreshEnrollment()` vuelve a publicar la suscripción del navegador existente contra el nuevo `userChurch` sin volver a preguntar al usuario. Llámalo desde el manejador de cambio de `userChurch`.

### Requisito de Service Worker

El `PushManager` del navegador solo resuelve una suscripción cuando un service worker está registrado en el ámbito configurado. Las PWAs de ChurchApps usan [Serwist](https://serwist.dev/) (aplicaciones Next.js) o workbox para la generación de service worker. Debido a que el servidor ahora siempre intenta push junto con la entrega por socket (consulta [Cuándo se Dispara Push](#cuándo-se-dispara-push)), el service worker es el punto de deduplicación: su manejador `push` debe suprimir `showNotification` cuando un cliente enfocado/visible ya está en el destino de enlace profundo de la notificación, pero siempre debe actualizar la insignia de la aplicación independientemente de si se mostró el banner:

```javascript
// public/sw.js (o lo que sea que emita Serwist/workbox)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // siempre se ejecuta, incluso si el banner se suprime

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    // Mismo pathname; para mensajes privados, también mismo conversationId.
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
    if (exact) return exact.focus(); // ya está en el destino: enfoca, no navegues

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

`deepLinkFor` / `clientMatchesTarget` son específicos del consumidor — consulta `B1App/src/app/sw.ts` para una implementación de referencia. B1App enruta `privateMessage` a `/mobile/messages/:personId`, B1Admin enruta `notification` a su panel de alertas, etc.

## Notas Operacionales

- **Resultados `gone: true`** — `WebPushHelper.sendBulk` devuelve `{ token, success, gone, errorMessage }` por destinatario. Un resultado `gone: true` (el servicio push respondió `404` o `410`) significa que la suscripción es permanentemente inválida; el código descendente en `NotificationHelper` elimina esas filas de dispositivo para que no se intenten de nuevo.
- **TTL** — los mensajes push se envían con `TTL: 86400` (24 horas). Si el navegador del usuario no se conecta al servicio push dentro de 24 horas, el push se descarta.
- **Sin reintentos** — un fallo transitorio (timeout, 5xx) se registra y no se reintenta. Push es de mejor esfuerzo; el socket en página y el nivel de notificación por correo manejan la historia de durabilidad.
- **Entornos deshabilitados** — los entornos de staging y dev pueden dejar las claves VAPID vacías; `WebPushHelper.isEnabled()` devolverá `false` y los pushes se cortocircuitarán. Este es el comportamiento previsto para entornos sin su propia identidad VAPID.

## Páginas Relacionadas

- [Arquitectura de Notificaciones](./architecture/notifications) -- El embudo completo de escalación en-app/push/correo y el motor de recordatorios
- [Arquitectura en Tiempo Real](./realtime) -- Entrega WebSocket; push ahora se dispara desde el mismo embudo en-app junto con la entrega por socket en el mismo paso, no solo como respaldo cuando una entrega por socket no llega
- [Puntos Finales de Mensajería](./api/endpoints/messaging) -- Notificaciones, dispositivos, y el resto de la superficie de mensajería
- [AppHelper](./shared-libraries/app-helper) -- El paquete npm que envía `WebPushHelper`
