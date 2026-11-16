---
title: "Notificaciones web push"
description: "Configura las claves VAPID, el cliente WebPushHelper y el manejo del service worker para que B1.church y B1 Admin puedan enviar notificaciones push del navegador a los miembros."
---

# Notificaciones web push {#web-push-notifications}

<div class="article-intro">

Las aplicaciones web de ChurchApps envían notificaciones push mediante la API Web Push del W3C, el mismo mecanismo que usa Firebase Cloud Messaging en el lado del servidor, pero entregado a través de `PushManager` nativo del navegador en lugar de FCM. Un único par de claves VAPID en MessagingApi cubre a todos los consumidores (B1Admin, B1App, futuras PWA).

</div>

## Cuándo se dispara el push {#when-push-fires}

El push es un nivel dentro de una sola pasada de entrega en `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): primero una compuerta de preferencias in-app, luego el socket y el push se intentan en la misma pasada (cada uno detrás de su propia compuerta de preferencias), y después el correo. Un destinatario que silenció la categoría nunca llega al push. Que la entrega por socket tenga éxito ya no detiene el push: todos los tipos de notificación ahora se comportan como siempre lo han hecho los mensajes privados, así que una PWA instalada en segundo plano sigue mostrando una notificación a nivel del sistema operativo aunque una entrega por socket ya haya llegado; los banners duplicados los suprime el service worker en el cliente (consulta [Requisito del service worker](#service-worker-requirement)). Los recordatorios programados y las difusiones de personal empiezan directamente en el nivel de push, omitiendo por completo el paso por socket. El correo sigue dependiendo del temporizador, escalando las filas no leídas según su propio calendario y no como parte de esta pasada.

Las rutas más comunes que llegan al push son:

1. **Notificaciones de contenido**: una respuesta a una conversación que la persona sigue, una mención u otro evento enrutado a través de `NotificationHelper.createNotifications()`.
2. **Mensajes privados**: un mensaje directo pasa por la misma función de entrega y siempre intenta el push junto con la entrega por socket.
3. **Recordatorios programados**: recordatorios de eventos, tareas y servicio que el motor de recordatorios expande y despacha, y que inician las nuevas ocurrencias directamente en el nivel de push.
4. **Pushes disparados por el personal**: `POST /messaging/notifications/create`, `/ping` y `/group/send` para difusiones puntuales o a grupos.
5. **Pushes programados por el personal**: `POST /messaging/scheduledNotifications` guarda un push para todos los que tienen la app (`audience: "church"`) o para un grupo, y el temporizador de 1 minuto lo envía cuando llega la hora (consulta [Arquitectura de notificaciones](./architecture/notifications.md)). Un push de toda la iglesia sin enlace abre `/mobile/notifications`; un push de grupo sin enlace abre ese grupo.

## Flujo del servidor {#server-flow}

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

### Variables de entorno requeridas {#required-environment-variables}

Las claves VAPID se guardan en `Environment` y deben estar presentes para que el push esté habilitado:

| Variable de entorno | Configuración de `Environment` | Descripción |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | Clave pública VAPID (base64url). Se devuelve a los clientes mediante `GET /messaging/webpush/publicKey` |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | Clave privada VAPID. Se usa para firmar cada push saliente |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | URI `mailto:` que se informa a los servicios de push. Por defecto es `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` devuelve `false` si falta cualquiera de las dos claves: el módulo de mensajería sigue funcionando, pero las entregas push simplemente no hacen nada. El sitio móvil de B1App entonces informa a los miembros de que las notificaciones push no están activadas, en lugar de ofrecer la configuración.

### Generar un par de claves VAPID {#generating-a-vapid-key-pair}

```bash
npx web-push generate-vapid-keys
```

Agrega la salida a tu `.env` (local) o a AWS SSM Parameter Store (en producción). Rotar las claves invalida todas las suscripciones existentes: los clientes deben volver a registrarse en la siguiente carga de página.

## Modelo de almacenamiento {#storage-model}

Las suscripciones Web Push se guardan en la tabla `devices` existente, junto con los registros de dispositivos FCM. Se distinguen por un prefijo `webpush:` en la columna `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Esto permite que una sola llamada a `loadByPersonId` devuelva todos los dispositivos que un usuario ha registrado, sin importar la plataforma. `WebPushHelper.isWebPushToken(token)` y `decodeSubscription(token)` manejan la lógica del prefijo.

## Endpoints {#endpoints}

Ruta base: `/messaging/webpush`

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/publicKey` | Pública | Devuelve `{ publicKey, enabled }`. Los clientes pasan `publicKey` a `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Registra (o inserta/actualiza) una suscripción para el usuario autenticado. Cuerpo: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Pública | Elimina cualquier fila de dispositivo cuyo `fcmToken` contenga el endpoint indicado. Cuerpo: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Elimina una fila de dispositivo específica por su ID del servidor |

## Primitiva del cliente: `WebPushHelper` {#client-primitive-webpushhelper}

`WebPushHelper` de `@churchapps/apphelper` es el único punto de entrada del lado del cliente. Las aplicaciones lo configuran una vez al arrancar y llaman a `subscribe()` después de iniciar sesión.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// In your app's bootstrap (e.g., _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // service worker scope; matches sw.js registration
  appName: "B1AppPwa"        // stored on the device row, useful for filtering by surface
});

// After login (and after every userChurch change)
await WebPushHelper.subscribe();
```

Comportamientos que los consumidores obtienen automáticamente:

- **Verificación de compatibilidad**: `isSupported()` devuelve `false` en navegadores sin `serviceWorker` / `PushManager` / `Notification`.
- **Enfriamiento**: `canPromptNow()` aplica un enfriamiento de 7 días entre solicitudes mediante `localStorage`, para que los usuarios que descartaron el aviso del sistema operativo no se les vuelva a preguntar en cada sesión.
- **Baja voluntaria**: `setOptedOut(true)` y `unsubscribe()` impiden volver a preguntar y eliminan la fila de dispositivo del servidor.
- **Detección de PWA independiente**: `isStandalone()` permite que las aplicaciones condicionen las solicitudes de push en iOS a que "el usuario haya instalado la PWA en la pantalla de inicio" (iOS solo permite push desde PWA instaladas).
- **Volver a registrar al cambiar de iglesia**: `refreshEnrollment()` vuelve a enviar la suscripción existente del navegador para el nuevo `userChurch` sin pedir permiso de nuevo al usuario. Llámalo desde el manejador de cambio de `userChurch`.

### Requisito del service worker {#service-worker-requirement}

El `PushManager` del navegador solo resuelve una suscripción cuando hay un service worker registrado en el alcance configurado. Las PWA de ChurchApps usan [Serwist](https://serwist.dev/) (aplicaciones Next.js) o workbox para generar el service worker. Como el servidor ahora siempre intenta el push junto con la entrega por socket (consulta [Cuándo se dispara el push](#when-push-fires)), el service worker es el punto de deduplicación: su manejador `push` debe suprimir `showNotification` cuando un cliente enfocado o visible ya está en el destino de enlace profundo de la notificación, pero siempre debe actualizar la insignia de la app, sin importar si se mostró el banner:

```javascript
// public/sw.js (or whatever Serwist/workbox emits)
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

`deepLinkFor` y `clientMatchesTarget` dependen de cada consumidor: consulta `B1App/src/app/sw.ts` para la implementación de referencia. B1App enruta `privateMessage` a `/mobile/messages/:personId`, B1Admin enruta `notification` a su panel de alertas, etc.

## Notas operativas {#operational-notes}

- **Resultados `gone: true`**: `WebPushHelper.sendBulk` devuelve `{ token, success, gone, errorMessage }` por destinatario. Un resultado `gone: true` (el servicio de push respondió `404` o `410`) significa que la suscripción es inválida de forma permanente; el código posterior en `NotificationHelper` elimina esas filas de dispositivo para que no vuelvan a intentarse.
- **TTL**: los mensajes push se envían con `TTL: 86400` (24 horas). Si el navegador del usuario no se conecta al servicio de push en 24 horas, el push se descarta.
- **Sin reintentos**: un fallo transitorio (timeout, 5xx) se registra y no se reintenta. El push es de mejor esfuerzo; el socket en la página y el nivel de correo electrónico se encargan de la durabilidad.
- **Entornos deshabilitados**: los entornos de desarrollo pueden dejar vacías las claves VAPID; `WebPushHelper.isEnabled()` devolverá `false` y los pushes se cortocircuitarán. Este es el comportamiento previsto para entornos sin su propia identidad VAPID.

## Páginas relacionadas {#related-pages}

- [Arquitectura de notificaciones](./architecture/notifications.md) — El embudo completo de escalamiento in-app/push/correo y el motor de recordatorios
- [Arquitectura en tiempo real](./realtime.md) — Entrega por WebSocket; el push ahora se dispara desde el mismo embudo in-app junto con la entrega por socket, en la misma pasada, y no solo como respaldo cuando una entrega por socket no llega
- [Endpoints de mensajería](./api/endpoints/messaging.md) — Notificaciones, dispositivos y el resto de la superficie de mensajería
- [AppHelper](./shared-libraries/app-helper.md) — El paquete npm que incluye `WebPushHelper`
