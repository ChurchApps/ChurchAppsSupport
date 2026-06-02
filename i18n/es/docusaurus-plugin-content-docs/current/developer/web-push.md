---
title: "Notificaciones Push Web"
---

# Notificaciones Push Web

<div class="article-intro">

Las aplicaciones web de ChurchApps entregan notificaciones push a través de la API de Push Web del W3C. Un par de claves VAPID única en MessagingApi cubre cada consumidor.

</div>

## Cuándo Push Se Dispara

La MessagingApi entrega un mensaje de Web Push en tres situaciones:

1. **Notificaciones de grupo / contenido** -- alguien responde a un hilo que el usuario sigue.
2. **Mensajes privados** -- `POST /messaging/privatemessages` dispara un push.
3. **Notificaciones genéricas** -- llamadas a `POST /messaging/notifications/create`.

Push es el **tier de último recurso**. Si un destinatario tiene una conexión WebSocket activa, recibe el mensaje en la página.

## Primitiva del Cliente

`@churchapps/apphelper`'s `WebPushHelper` es el único punto de entrada del lado del cliente.
