---
title: "Notificaciones push web"
---

# Notificaciones push web

<div class="article-intro">

Las aplicaciones web de ChurchApps envían notificaciones push mediante la API Web Push del W3C, el mismo mecanismo que usa Firebase Cloud Messaging del lado del servidor, pero entregado a través del `PushManager` nativo del navegador en lugar de FCM. Un único par de claves VAPID en MessagingApi cubre a todos los consumidores (B1Admin, B1App y futuras PWA).

</div>

## Cuándo se envía un push {#when-push-fires}

El push es un nivel dentro de una sola pasada de entrega en `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): primero una compuerta de preferencias dentro de la aplicación, luego la entrega por socket y el push, intentados en la misma pasada (cada uno tras su propia compuerta de preferencias), y después el correo electrónico. Un destinatario que silenció la categoría nunca llega al push. Que la entrega por socket tenga éxito ya no detiene el push: ahora todos los tipos de notificación se comportan como siempre se han comportado los mensajes privados, de modo que una PWA instalada que está en segundo plano sigue mostrando una notificación a nivel del sistema operativo aunque una entrega por socket ya haya llegado; los banners duplicados los suprime el service worker del lado del cliente (vea [Requisito del service worker](#service-worker-requirement)). Los recordatorios programados y las difusiones iniciadas por el personal empiezan directamente en el nivel de push, sin pasar por el socket. El correo electrónico sigue dirigido por temporizadores: escala las filas no leídas con su propio calendario, no como parte de esta pasada.

Las rutas más comunes que llegan al push son:

1. **Notificaciones de contenido**: una respuesta a una conversación que la persona sigue, una mención u otro evento enrutado a través de `NotificationHelper.createNotifications()`.
2. **Mensajes privados**: un mensaje directo pasa por la misma función de entrega e intenta siempre el push junto con la entrega por socket.
3. **Recordatorios programados**: recordatorios de eventos, tareas y servicio expandidos y despachados por el motor de recordatorios, que inicia las nuevas ocurrencias directamente en el nivel de push.
4. **Pushes iniciados por el personal**: `POST /messaging/notifications/create`, `/ping` y `/group/send` para difusiones puntuales o de grupo.

## Flujo del servidor

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ compuerta de preferencias dentro de la aplicación   ← los destinatarios silenciados se detienen aquí, sin push
       ├─ misma pasada, ambos intentos (ninguno condiciona al otro):
       │    ├─ entrega por socket mediante DeliveryHelper     ← se omite en recordatorios/difusiones (empiezan en push)
       │    └─ compuerta de preferencias de push
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ biblioteca web-push → POST firmado con VAPID → servicio de push del navegador
       └─ compuerta de preferencias de correo → dirigido por temporizador, escala las filas no leídas por separado
```

### Variables de entorno obligatorias

Las claves VAPID se guardan en `Environment` y deben existir para que el push esté habilitado:

| Variable de entorno | Configuración de `Environment` | Descripción |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | Clave pública VAPID (base64url). Se devuelve a los clientes mediante `GET /messaging/webpush/publicKey` |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | Clave privada VAPID. Se usa para firmar cada push saliente |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | URI `mailto:` que se informa a los servicios de push. Por defecto es `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` devuelve `false` cuando falta cualquiera de las dos claves: el módulo de mensajería sigue funcionando, pero las entregas push simplemente no hacen nada. El sitio móvil de B1App entonces le indica a los miembros que el push no está activado, en lugar de ofrecer la configuración.

### Generar un par de claves VAPID

```bash
npx web-push generate-vapid-keys
```

Agregue la salida a su `.env` (local) o a AWS SSM Parameter Store (en despliegues). Rotar las claves invalida cada suscripción existente: los clientes deben volver a inscribirse en la siguiente carga de página.

## Modelo de almacenamiento

Las suscripciones de Web Push se guardan en la tabla `devices` existente, junto con los registros de dispositivos FCM. Se distinguen por un prefijo `webpush:` en la columna `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Así, una sola llamada a `loadByPersonId` devuelve todos los dispositivos inscritos de un usuario, sin importar la plataforma. `WebPushHelper.isWebPushToken(token)` y `decodeSubscription(token)` manejan la lógica del prefijo.

## Endpoints

Ruta base: `/messaging/webpush`

| Método | Ruta | Autenticación | Descripción |
|--------|------|---------------|-------------|
| GET | `/publicKey` | Pública | Devuelve `{ publicKey, enabled }`. Los clientes pasan `publicKey` a `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Registra (o actualiza) una suscripción para el usuario autenticado. Cuerpo: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Pública | Elimina cualquier fila de dispositivo cuyo `fcmToken` contenga el endpoint indicado. Cuerpo: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Elimina una fila de dispositivo específica por su id del servidor |

## Primitiva del cliente: `WebPushHelper`

`WebPushHelper` de `@churchapps/apphelper` es el único punto de entrada del lado del cliente. Las aplicaciones anfitrionas lo configuran una vez al arrancar y llaman a `subscribe()` después del inicio de sesión.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// En el arranque de su aplicación (por ejemplo, _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // alcance del service worker; coincide con el registro de sw.js
  appName: "B1AppPwa"        // se guarda en la fila del dispositivo; útil para filtrar por superficie
});

// Después del inicio de sesión (y después de cada cambio de userChurch)
await WebPushHelper.subscribe();
```

Comportamientos que los consumidores obtienen sin esfuerzo:

- **Comprobación de capacidades**: `isSupported()` devuelve `false` en navegadores sin `serviceWorker` / `PushManager` / `Notification`.
- **Enfriamiento**: `canPromptNow()` aplica un periodo de enfriamiento de 7 días entre solicitudes mediante `localStorage`, para que los usuarios que descartan el aviso del sistema operativo no vuelvan a verlo en cada sesión.
- **Cancelación**: `setOptedOut(true)` y `unsubscribe()` impiden volver a solicitar el permiso y eliminan la fila del dispositivo en el servidor.
- **Detección de PWA independiente**: `isStandalone()` permite a las aplicaciones anfitrionas condicionar las solicitudes de push en iOS a que el usuario haya instalado la PWA en su pantalla de inicio (iOS solo permite push desde PWA instaladas).
- **Reinscripción al cambiar de iglesia**: `refreshEnrollment()` vuelve a enviar la suscripción existente del navegador con el nuevo `userChurch`, sin pedir permiso de nuevo al usuario. Llámelo desde el controlador del cambio de `userChurch`.

### Requisito del service worker {#service-worker-requirement}

El `PushManager` del navegador solo resuelve una suscripción cuando hay un service worker registrado en el alcance configurado. Las PWA de ChurchApps usan [Serwist](https://serwist.dev/) (aplicaciones Next.js) o workbox para generar el service worker. Como el servidor ahora siempre intenta el push junto con la entrega por socket (vea [Cuándo se envía un push](#when-push-fires)), el service worker es el punto de deduplicación: su controlador `push` debe suprimir `showNotification` cuando un cliente enfocado o visible ya está en el destino de enlace profundo de la notificación, pero siempre debe actualizar la insignia de la aplicación, tanto si se mostró el banner como si no:

```javascript
// public/sw.js (o lo que emita Serwist/workbox)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // siempre se ejecuta, aunque se suprima el banner

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    // Misma ruta de URL; para mensajes privados, también el mismo conversationId.
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
    if (exact) return exact.focus(); // ya está en el destino: enfocar, no navegar

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

`deepLinkFor` y `clientMatchesTarget` dependen de cada consumidor; consulte `B1App/src/app/sw.ts` como implementación de referencia. B1App enruta `privateMessage` a `/mobile/messages/:personId`, B1Admin enruta `notification` a su panel de alertas, etc.

## Notas operativas

- **Resultados con `gone: true`**: `WebPushHelper.sendBulk` devuelve `{ token, success, gone, errorMessage }` por destinatario. Un resultado con `gone: true` (el servicio de push respondió `404` o `410`) significa que la suscripción no es válida de forma permanente; el código posterior de `NotificationHelper` elimina esas filas de dispositivo para que no se vuelvan a intentar.
- **TTL**: los mensajes push se envían con `TTL: 86400` (24 horas). Si el navegador del usuario no se conecta al servicio de push en 24 horas, el push se descarta.
- **Sin reintentos**: un fallo transitorio (tiempo de espera, 5xx) se registra y no se reintenta. El push es de mejor esfuerzo; el socket de la página y el nivel de notificación por correo se encargan de la durabilidad.
- **Entornos deshabilitados**: los entornos de desarrollo pueden dejar vacías las claves VAPID; `WebPushHelper.isEnabled()` devolverá `false` y los pushes se omitirán. Es el comportamiento previsto para los entornos sin identidad VAPID propia.

## Páginas relacionadas

- [Arquitectura de notificaciones](./architecture/notifications): el embudo completo de escalamiento dentro de la aplicación, push y correo, y el motor de recordatorios
- [Arquitectura en tiempo real](./realtime): entrega por WebSocket; el push ahora se activa desde el mismo embudo de la aplicación junto con la entrega por socket en la misma pasada, no solo como respaldo cuando una entrega por socket no llega
- [Endpoints de mensajería](./api/endpoints/messaging): notificaciones, dispositivos y el resto de la superficie de mensajería
- [AppHelper](./shared-libraries/app-helper): el paquete npm que incluye `WebPushHelper`
