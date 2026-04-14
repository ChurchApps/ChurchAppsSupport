---
title: "Endpoints de Mensagens"
---

# Endpoints de Mensagens

<div class="article-intro">

O módulo de Messaging gerencia conversas em tempo real, mensagens de chat, notificações push, entrega de SMS/email, conexões WebSocket, mensagens privadas, registro de dispositivo e provedores de texto. Fornece a camada de comunicação usada em todos os aplicativos ChurchApps para chat de transmissão ao vivo e notificações assíncronas.

</div>

**Caminho base:** `/messaging`

## Conversas

Caminho base: `/messaging/conversations`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/timeline/ids?ids=` | JWT | — | Carregue conversas por IDs separados por vírgula com primeiras/últimas mensagens |
| GET | `/messages/:contentType/:contentId` | JWT | — | Carregue conversas para conteúdo com mensagens paginadas |
| POST | `/` | JWT | — | Criar ou atualizar conversas (lote) |
| DELETE | `/:churchId/:id` | JWT | — | Deletar uma conversa |

## Mensagens

Caminho base: `/messaging/messages`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/conversation/:conversationId` | JWT | — | Carregue todas as mensagens para uma conversa |
| POST | `/` | JWT | — | Salve mensagens (lote). Envia atualizações em tempo real e aciona notificações |
| DELETE | `/:churchId/:id` | JWT | — | Deletar uma mensagem e transmita a exclusão em tempo real |

## Notificações

Caminho base: `/messaging/notifications`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/unreadCount` | JWT | — | Obtenha contagem de notificações não lidas para o usuário atual |
| GET | `/my` | JWT | — | Carregue todas as notificações para o usuário atual |
| POST | `/` | JWT | — | Criar ou atualizar notificações (lote) |
| DELETE | `/:churchId/:id` | JWT | — | Deletar uma notificação |

Para mais informações sobre os endpoints de Messaging, veja a documentação completa da API.
