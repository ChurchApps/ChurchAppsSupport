---
title: "Arquitectura en Tiempo Real"
---

# Arquitectura en Tiempo Real

<div class="article-intro">

ChurchApps usa un único marco de entrega basado en WebSocket para cada superficie en tiempo real -- chat de grupo, mensajes privados, notas de contenido, chat de transmisión en vivo y presencia/asistencia.

</div>

## Descripción General

El protocolo tiene tres piezas:

1. **Un WebSocket persistente** por pestaña del navegador.
2. **Filas de conexión** registradas en la tabla `connections`.
3. **Fan-out del lado del servidor** por `DeliveryHelper.sendConversationMessages()`.

## Primitivas del Cliente

Todos los primitivos son singletons estáticos. Cooperan para que cada pestaña abra un único WebSocket.

- **SocketHelper** -- Posee la conexión WebSocket
- **SubscriptionManager** -- Membresía de sala
- **ConversationStore** -- Caché en memoria
- **PresenceStore** -- Espeja el patrón de ConversationStore
- **NotificationService** -- Arranque para llamantes autenticados
