---
title: "Notificações Web Push"
---

# Notificações Web Push

<div class="article-intro">

Os aplicativos web do ChurchApps entregam notificações push através da API Web Push W3C -- o mesmo mecanismo usado pelo Firebase Cloud Messaging no lado do servidor, mas entregue através do `PushManager` nativo do navegador em vez do FCM. Um único par de chaves VAPID no MessagingApi cobre todos os consumidores (B1Admin, B1App, futuros PWAs).

</div>

## Quando o push dispara

O MessagingApi entrega uma mensagem Web Push em três situações, todas roteadas através de `Api/src/modules/messaging/helpers/NotificationHelper.ts`:

1. **Notificações de grupo / conteúdo** — alguém responde a um tópico que o usuário segue ou é mencionado.
2. **Mensagens privadas** — `POST /messaging/privatemessages` dispara um push para os dispositivos inscritos do destinatário.
3. **Notificações genéricas** — chamadas diretas para `POST /messaging/notifications/create` ou `/ping`.

Push é a **camada de último recurso** na escada de escalação do `NotificationHelper`. Se um destinatário tiver uma conexão WebSocket ativa na sala relevante (veja [Real-time Architecture](./realtime)), ele recebe a mensagem no aplicativo e o push é suprimido para essa entrega. Push só dispara quando o usuário está offline ou não foi visto recentemente.

## Fluxo do Servidor

```
NotificationHelper.checkShouldNotify(...)
  │
  ├─ entrega de socket na página via DeliveryHelper  ← preferido
  │
  └─ NotificationHelper.<sendXxx>(...)
       └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
            └─ biblioteca web-push → POST assinado VAPID → serviço push do navegador
```

### Variáveis de ambiente necessárias

As chaves VAPID são armazenadas em `Environment` e devem estar presentes para que o push seja habilitado:

| Variável | Descrição |
|----------|-------------|
| `webPushPublicKey` | Chave pública VAPID (base64url). Retornada aos clientes via `GET /messaging/webpush/publicKey` |
| `webPushPrivateKey` | Chave privada VAPID. Usada para assinar cada push de saída |
| `webPushSubject` | URI `mailto:` relatado aos serviços push. Padrão para `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` retorna `false` quando qualquer chave está faltando -- o módulo de mensagens continua a operar, entregas push simplesmente não fazem nada.

### Gerando um par de chaves VAPID

```bash
npx web-push generate-vapid-keys
```

Adicione a saída ao seu `.env` (local) ou AWS SSM Parameter Store (implantado). Rotacionar chaves invalida todas as ascrições existentes -- os clientes devem se reinscrever no próximo carregamento da página.

:::info
Para detalhes completos sobre Modelo de Armazenamento, Endpoints, Primitiva do Cliente (WebPushHelper), Requisito de Service Worker e Notas Operacionais, consulte a [documentação completa em inglês](https://docs.churchapps.org/docs/developer/web-push).
:::

## Páginas Relacionadas

- [Real-time Architecture](./realtime) -- Entrega WebSocket; push é o fallback offline para as mesmas notificações
- [Messaging Endpoints](./api/endpoints/messaging) -- Notificações, dispositivos e o resto da superfície de mensagens
- [AppHelper](./shared-libraries/app-helper) -- O pacote npm que envia `WebPushHelper`
