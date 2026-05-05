---
title: "Arquitetura em Tempo Real"
---

# Arquitetura em Tempo Real

<div class="article-intro">

ChurchApps usa uma única estrutura de entrega baseada em WebSocket para cada superfície em tempo real -- chat de grupo, mensagens privadas, notas de conteúdo, chat de transmissão ao vivo e presença/atendimento. Esta página documenta o protocolo, o servidor e as primitivas do cliente que os consumidores usam.

</div>

## Visão Geral

O protocolo tem três peças:

1. **Um WebSocket persistente** por aba do navegador, aberto por `SocketHelper`.
2. **Linhas de conexão** (`POST /messaging/connections`) registradas na tabela `connections` -- estas marcam uma tupla `(socketId, churchId, conversationId)` como assinante de uma sala.
3. **Fan-out do lado do servidor** por `DeliveryHelper.sendConversationMessages()` -- quando uma mensagem é salva (`POST /messaging/messages/send`), o servidor lê as linhas de conexão correspondentes e envia um payload tipado para cada socket aberto.

Não há Socket.IO, sem fallback de long-polling e sem microsserviço separado. O WebSocket roda no mesmo processo que a API REST (`web` Lambda para HTTP, `socket` Lambda para WebSocket no AWS; um processo combinado localmente e no Railway).

:::info
Para detalhes completos sobre portas, protocolo de transmissão, componentes do lado do servidor, primitivas do lado do cliente, chat de transmissão ao vivo e padrões/armadilhas, consulte a [documentação completa em inglês](https://docs.churchapps.org/docs/developer/realtime).
:::

## Páginas Relacionadas

- [Messaging Endpoints](./api/endpoints/messaging) -- Superfície REST completa para mensagens, conversas, conexões, dispositivos
- [Web Push Notifications](./web-push) -- Push do navegador, separado da entrega de socket na página
- [AppHelper](./shared-libraries/app-helper) -- O pacote npm que envia as primitivas do cliente
- [Module Structure](./api/module-structure) -- Como o módulo de mensagens é organizado no lado do servidor
