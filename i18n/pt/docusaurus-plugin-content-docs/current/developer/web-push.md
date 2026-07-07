---
title: "Notificações Web Push"
---

# Notificações Web Push

<div class="article-intro">

Os aplicativos web do ChurchApps entregam notificações push através da API Web Push W3C -- o mesmo mecanismo usado pelo Firebase Cloud Messaging no lado do servidor, mas entregue através do `PushManager` nativo do navegador em vez do FCM. Um único par de chaves VAPID no MessagingApi cobre cada consumidor (B1Admin, B1App, PWAs futuras).

</div>

## Quando o push dispara

Push é um nível em uma única passagem de entrega dentro de `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): uma porta de preferência em app, depois entrega de socket e push tentadas na mesma passagem (cada atrás de sua própria porta de preferência), depois email. Um destinatário que mutiu a categoria nunca chega a push. A entrega de socket bem-sucedida não mais para push -- cada tipo de notificação agora se comporta da forma como mensagens privadas sempre fizeram, então um PWA instalado sentado em background ainda mostra uma notificação no nível do SO mesmo quando uma entrega de socket já chegou; banners duplicados são suprimidos client-side pelo service worker em vez disso (veja [Requisito de service worker](#requisito-de-service-worker)). Lembretes agendados e broadcasts acionados por staff começam diretamente no nível de push, pulando o passo de socket completamente. Email permanece acionado por timer, escalando linhas não lidas em seu próprio cronograma em vez de como parte desta passagem.

Os caminhos mais comuns que chegam a push:

1. **Notificações de conteúdo** -- uma resposta a uma conversa que a pessoa segue, uma menção, ou outro evento roteado através de `NotificationHelper.createNotifications()`.
2. **Mensagens privadas** -- uma mensagem direta passa pela mesma função de entrega e sempre tenta push junto com entrega de socket.
3. **Lembretes agendados** -- lembretes de evento, tarefa e servimento expandidos e despachados pelo mecanismo de lembretes, que inicia novas ocorrências diretamente no nível de push.
4. **Pushes acionados por staff** -- `POST /messaging/notifications/create`, `/ping` e `/group/send` para broadcasts únicos ou em grupo.

## Fluxo do servidor

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ porta de preferência em app                  ← destinatários mutios param aqui, sem push
       ├─ mesma passagem, ambas tentadas (nenhuma porta a outra):
       │    ├─ entrega de socket via DeliveryHelper  ← pulada para reminders/broadcasts (eles começam em push)
       │    └─ porta de preferência de push
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ biblioteca web-push → POST assinado VAPID → serviço push do navegador
       └─ porta de preferência de email → acionada por timer, escalando linhas não lidas separadamente
```

### Variáveis de ambiente necessárias

As chaves VAPID são armazenadas em `Environment` e devem estar presentes para que o push seja habilitado:

| Variável | Descrição |
|----------|-----------|
| `webPushPublicKey` | Chave pública VAPID (base64url). Retornada aos clientes via `GET /messaging/webpush/publicKey` |
| `webPushPrivateKey` | Chave privada VAPID. Usada para assinar cada push de saída |
| `webPushSubject` | URI `mailto:` relatado aos serviços push. Padrão para `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` retorna `false` quando uma chave está faltando -- o módulo de mensagens continua a operar, entregas push simplesmente não fazem nada.

### Gerando um par de chaves VAPID

```bash
npx web-push generate-vapid-keys
```

Adicione a saída ao seu `.env` (local) ou AWS SSM Parameter Store (implantado). Rotacionar chaves invalida cada subscrição existente -- clientes devem re-se inscrever no próximo carregamento de página.

## Modelo de armazenamento

Subscrições Web Push são armazenadas na tabela `devices` existente junto com registros de dispositivo FCM. Eles são distinguidos por um prefixo `webpush:` na coluna `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Isto deixa uma única chamada `loadByPersonId` retornar cada dispositivo que um usuário inscreveu, independentemente da plataforma. `WebPushHelper.isWebPushToken(token)` e `decodeSubscription(token)` manipulam a lógica de prefixo.

## Endpoints

Caminho base: `/messaging/webpush`

| Método | Caminho | Auth | Descrição |
|--------|---------|------|-----------|
| GET | `/publicKey` | Público | Retorna `{ publicKey, enabled }`. Clientes passam `publicKey` para `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Registra (ou upserts) uma subscrição para o usuário autenticado. Corpo: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Público | Deleta qualquer linha de dispositivo cujo `fcmToken` contém o endpoint dado. Corpo: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Deleta uma linha de dispositivo específica por seu id no lado do servidor |

## Primitivo do cliente: `WebPushHelper`

O `WebPushHelper` do `@churchapps/apphelper` é o único ponto de entrada do lado do cliente. Hosts a configuram uma vez na inicialização e chamam `subscribe()` após login.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// Na inicialização do seu app (por exemplo, _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // escopo do service worker; combina com a registração sw.js
  appName: "B1AppPwa"        // armazenado na linha do dispositivo, útil para filtrar por superfície
});

// Após login (e após cada mudança de userChurch)
await WebPushHelper.subscribe();
```

Comportamentos que os consumidores obtêm gratuitamente:

- **Verificação de capacidade** -- `isSupported()` retorna `false` em navegadores sem `serviceWorker` / `PushManager` / `Notification`.
- **Cooldown** -- `canPromptNow()` impõe um cooldown de 7 dias entre prompts via `localStorage` para que usuários que descartam o prompt do SO não sejam perguntados novamente em cada sessão.
- **Opt-out** -- `setOptedOut(true)` e `unsubscribe()` bloqueiam re-prompt e removem a linha do dispositivo no lado do servidor.
- **Detecção de PWA autônomo** -- `isStandalone()` deixa hosts portar prompts de push do iOS atrás de "usuário instalou o PWA em sua tela inicial" (apenas iOS permite push de PWAs instalados).
- **Re-inscrição na mudança de igreja** -- `refreshEnrollment()` reposta a subscrição de navegador existente contra o novo `userChurch` sem re-perguntar ao usuário. Chame-o do manipulador de mudança de `userChurch`.

### Requisito de service worker

O `PushManager` do navegador apenas resolve uma subscrição quando um service worker é registrado no escopo configurado. PWAs do ChurchApps usam [Serwist](https://serwist.dev/) (aplicações Next.js) ou workbox para geração de service worker. Como o servidor agora sempre tenta push junto com entrega de socket (veja [Quando o push dispara](#quando-o-push-dispara)), o service worker é o ponto de dedup: seu manipulador `push` deve suprimir `showNotification` quando um cliente focado/visível já está no alvo de deep-link da notificação, mas deve sempre atualizar o badge do app independentemente de se o banner foi mostrado:

```javascript
// public/sw.js (ou o que Serwist/workbox emite)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // sempre executa, mesmo se o banner é suprimido

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    // Mesmo pathname; para mensagens privadas, também o mesmo conversationId.
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
    if (exact) return exact.focus(); // já no alvo: foco, não navegue

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

`deepLinkFor` / `clientMatchesTarget` são específicos do consumidor -- veja `B1App/src/app/sw.ts` para a implementação de referência. B1App roteia `privateMessage` para `/mobile/messages/:personId`, B1Admin roteia `notification` para seu painel de alertas, etc.

## Notas operacionais

- **Resultados `gone: true`** -- `WebPushHelper.sendBulk` retorna `{ token, success, gone, errorMessage }` por destinatário. Um resultado `gone: true` (serviço push respondeu `404` ou `410`) significa que a subscrição é permanentemente inválida; código downstream em `NotificationHelper` deleta as linhas do dispositivo para que não sejam tentadas novamente.
- **TTL** -- mensagens push são enviadas com `TTL: 86400` (24 horas). Se o navegador do usuário não se conectar ao serviço push dentro de 24 horas, o push é descartado.
- **Sem retentativas** -- uma falha transitória (timeout, 5xx) é registrada e não retentada. Push é best-effort; o socket na página e o nível de notificação de email manipulam a história de durabilidade.
- **Ambientes desabilitados** -- ambientes de staging e dev podem deixar as chaves VAPID vazias; `WebPushHelper.isEnabled()` retornará `false` e pushes serão short-circuitados. Este é o comportamento pretendido para ambientes sem sua própria identidade VAPID.

## Páginas Relacionadas

- [Arquitetura de Notificações](./architecture/notifications) -- O funil completo de escalação em app/push/email e o mecanismo de lembretes
- [Arquitetura em Tempo Real](./realtime) -- Entrega via WebSocket; push agora dispara do mesmo funil em app junto com entrega de socket na mesma passagem, não apenas como um fallback quando uma entrega de socket não chega
- [Endpoints de Mensagens](./api/endpoints/messaging) -- Notificações, dispositivos e o resto da superfície de mensagens
- [AppHelper](./shared-libraries/app-helper) -- O pacote npm que envia `WebPushHelper`
