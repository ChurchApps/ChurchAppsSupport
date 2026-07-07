---
title: "Arquitectura en tiempo real"
---

# Arquitectura en tiempo real

<div class="article-intro">

ChurchApps utiliza un único marco de entrega basado en WebSocket para cada superficie en tiempo real -- chat de grupo, mensajes privados, notas de contenido y presencia.

</div>

## Descripción general

El protocolo tiene tres partes:

1. **Un WebSocket persistente** por pestaña del navegador
2. **Filas de conexión** que marcan quién está suscrito a una sala
3. **Distribución del lado del servidor** que envía mensajes a los suscriptores

## Puertos y transporte

| Entorno | HTTP | WebSocket |
|-------------|------|-----------|
| Desarrollo local | `8084` | `ws://localhost:8087` |
| AWS Lambda | API Gateway | API Gateway WebSocket |

## Páginas relacionadas

- [Arquitectura de notificaciones](./architecture/notifications)
- [Puntos finales de mensajería](./api/endpoints/messaging)
- [AppHelper](./shared-libraries/app-helper)
