---
title: "Echtzeit-Architektur"
---

# Echtzeit-Architektur

<div class="article-intro">

ChurchApps verwendet ein einzelnes WebSocket-basiertes Delivery-Framework für jede Echtzeit-Oberfläche -- Gruppenchat, private Nachrichten, Inhaltsnotizen, den Livestream-Chat und Präsenz/Teilnahme. Diese Seite dokumentiert das Protokoll, den Server und die Client-Primitiven, die Consumer verwenden.

</div>

## Übersicht

Das Protokoll besteht aus drei Teilen:

1. **Ein persistenter WebSocket** pro Browser-Tab, geöffnet von SocketHelper.
2. **Connection-Zeilen** (POST /messaging/connections) im connections-Table aufgezeichnet -- diese markieren ein (socketId, churchId, conversationId)-Tupel als Abonnent eines Raums.
3. **Serverseitiges Fan-out** durch DeliveryHelper.sendConversationMessages() -- wenn eine Nachricht gespeichert wird (POST /messaging/messages/send), liest der Server die passenden Connection-Zeilen und schiebt eine typisierte Payload an jeden offenen Socket.

Es gibt kein Socket.IO, kein Long-Polling-Fallback und keinen separaten Microservice.

## Wire-Protokoll

Jeder Frame ist JSON mit der Form PayloadInterface mit churchId, conversationId, action und data.

Wichtige Actions: socketId, message, attendance, notification.

## Client-seitige Primitiven

Alle Primitiven sind statische Singletons in @churchapps/apphelper: SocketHelper, SubscriptionManager, ConversationStore, PresenceStore, NotificationService.

## Verwandte Seiten

- [Messaging Endpoints](./api/endpoints/messaging)
- [Web Push Notifications](./web-push)
- [AppHelper](./shared-libraries/app-helper)
