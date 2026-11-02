---
title: "Notificações push da web"
---

# Notificações push da web

<div class="article-intro">

Os aplicativos web do ChurchApps entregam notificações push pela API Web Push do W3C — o mesmo mecanismo usado pelo Firebase Cloud Messaging do lado do servidor, mas entregue pelo `PushManager` nativo do navegador, em vez do FCM. Um único par de chaves VAPID no MessagingApi atende todos os consumidores (B1Admin, B1App, PWAs futuras).

</div>

## Quando o push é disparado {#when-push-fires}

O push é um nível em uma única passagem de entrega dentro de `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): primeiro um portão de preferências no aplicativo, depois a entrega por socket e o push tentados na mesma passagem (cada um atrás do seu próprio portão de preferências) e, por fim, o e-mail. Um destinatário que silenciou a categoria nunca chega ao push. Uma entrega por socket bem-sucedida não interrompe mais o push — todo tipo de notificação agora se comporta como as mensagens privadas sempre se comportaram, de modo que um PWA instalado em segundo plano ainda exibe uma notificação no nível do sistema operacional mesmo quando uma entrega por socket já chegou; os banners duplicados são suprimidos no cliente pelo service worker (veja [Requisito de service worker](#service-worker-requirement)). Lembretes agendados e transmissões disparadas pela equipe começam diretamente no nível do push, ignorando a etapa do socket. O e-mail continua dirigido por timer, escalando as linhas não lidas em sua própria programação, e não como parte dessa passagem.

Os caminhos mais comuns que chegam ao push:

1. **Notificações de conteúdo** — uma resposta em uma conversa que a pessoa acompanha, uma menção ou outro evento roteado por `NotificationHelper.createNotifications()`.
2. **Mensagens privadas** — uma mensagem direta passa pela mesma função de entrega e sempre tenta o push junto com a entrega por socket.
3. **Lembretes agendados** — lembretes de eventos, tarefas e atendimento expandidos e despachados pelo motor de lembretes, que inicia novas ocorrências diretamente no nível do push.
4. **Pushes disparados pela equipe** — `POST /messaging/notifications/create`, `/ping` e `/group/send` para transmissões pontuais ou para grupos.

## Fluxo no servidor

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

### Variáveis de ambiente exigidas

As chaves VAPID ficam armazenadas em `Environment` e precisam estar presentes para que o push seja habilitado:

| Variável de ambiente | Configuração em `Environment` | Descrição |
|----------|----------|-----------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | Chave pública VAPID (base64url). Devolvida aos clientes por `GET /messaging/webpush/publicKey` |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | Chave privada VAPID. Usada para assinar cada push enviado |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | URI `mailto:` informada aos serviços de push. O padrão é `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` retorna `false` quando qualquer uma das chaves está ausente — o módulo de mensagens continua funcionando, e as entregas de push simplesmente não fazem nada. O site móvel do B1App então informa aos membros que o push não está ativado, em vez de oferecer a configuração.

### Gerando um par de chaves VAPID

```bash
npx web-push generate-vapid-keys
```

Adicione a saída ao seu `.env` (local) ou ao AWS SSM Parameter Store (implantado). Trocar as chaves invalida todas as assinaturas existentes — os clientes precisam se cadastrar novamente no próximo carregamento da página.

## Modelo de armazenamento

As assinaturas de Web Push são armazenadas na tabela `devices` já existente, junto com os registros de dispositivos FCM. Elas se distinguem por um prefixo `webpush:` na coluna `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Isso permite que uma única chamada a `loadByPersonId` retorne todos os dispositivos que um usuário cadastrou, independentemente da plataforma. `WebPushHelper.isWebPushToken(token)` e `decodeSubscription(token)` cuidam da lógica do prefixo.

## Endpoints

Caminho base: `/messaging/webpush`

| Método | Caminho | Autenticação | Descrição |
|--------|---------|--------------|-----------|
| GET | `/publicKey` | Pública | Retorna `{ publicKey, enabled }`. Os clientes passam `publicKey` para `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Registra (ou insere/atualiza) uma assinatura para o usuário autenticado. Corpo: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Pública | Exclui qualquer linha de dispositivo cujo `fcmToken` contenha o endpoint informado. Corpo: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Exclui uma linha de dispositivo específica pelo seu id no servidor |

## Primitiva do cliente: `WebPushHelper`

O `WebPushHelper` do `@churchapps/apphelper` é o único ponto de entrada no lado do cliente. As aplicações hospedeiras o configuram uma vez na inicialização e chamam `subscribe()` depois do login.

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

Comportamentos que os consumidores recebem de graça:

- **Verificação de capacidade** — `isSupported()` retorna `false` em navegadores sem `serviceWorker` / `PushManager` / `Notification`.
- **Intervalo de espera** — `canPromptNow()` impõe um intervalo de 7 dias entre os pedidos, via `localStorage`, para que usuários que recusam o pedido do sistema operacional não sejam perguntados de novo a cada sessão.
- **Desativação** — `setOptedOut(true)` e `unsubscribe()` impedem que o pedido volte a aparecer e removem a linha de dispositivo no servidor.
- **Detecção de PWA instalado** — `isStandalone()` permite que as aplicações hospedeiras condicionem os pedidos de push no iOS a "o usuário instalou o PWA na tela inicial" (no iOS, o push só é permitido para PWAs instalados).
- **Recadastro ao trocar de igreja** — `refreshEnrollment()` reenvia a assinatura existente do navegador para o novo `userChurch` sem pedir de novo ao usuário. Chame-o no manipulador de mudança de `userChurch`.

### Requisito de service worker {#service-worker-requirement}

O `PushManager` do navegador só resolve uma assinatura quando há um service worker registrado no escopo configurado. Os PWAs do ChurchApps usam o [Serwist](https://serwist.dev/) (aplicativos Next.js) ou o workbox para gerar o service worker. Como o servidor agora sempre tenta o push junto com a entrega por socket (veja [Quando o push é disparado](#when-push-fires)), o service worker é o ponto de deduplicação: o manipulador `push` dele precisa suprimir o `showNotification` quando um cliente focado/visível já está no destino de link profundo da notificação, mas deve sempre atualizar o selo do aplicativo, independentemente de o banner ter sido exibido:

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

`deepLinkFor` / `clientMatchesTarget` são específicos de cada consumidor — veja `B1App/src/app/sw.ts` para a implementação de referência. O B1App encaminha `privateMessage` para `/mobile/messages/:personId`, o B1Admin encaminha `notification` para o painel de alertas, e assim por diante.

## Observações operacionais

- **Resultados `gone: true`** — `WebPushHelper.sendBulk` retorna `{ token, success, gone, errorMessage }` por destinatário. Um resultado `gone: true` (o serviço de push respondeu `404` ou `410`) significa que a assinatura é permanentemente inválida; o código a jusante no `NotificationHelper` exclui essas linhas de dispositivo para que não sejam tentadas de novo.
- **TTL** — as mensagens push são enviadas com `TTL: 86400` (24 horas). Se o navegador do usuário não se conectar ao serviço de push em 24 horas, o push é descartado.
- **Sem novas tentativas** — uma falha transitória (timeout, 5xx) é registrada em log e não é repetida. O push é de melhor esforço; a durabilidade fica por conta do socket na página e do nível de e-mail.
- **Ambientes desativados** — os ambientes de desenvolvimento podem deixar as chaves VAPID vazias; `WebPushHelper.isEnabled()` retornará `false` e os pushes serão ignorados logo no início. Esse é o comportamento previsto para ambientes sem identidade VAPID própria.

## Páginas relacionadas

- [Arquitetura de notificações](./architecture/notifications) -- O funil completo de escalonamento no aplicativo/push/e-mail e o motor de lembretes
- [Tempo real](./realtime) -- Entrega por WebSocket; o push agora é disparado a partir do mesmo funil no aplicativo, junto com a entrega por socket na mesma passagem, e não apenas como alternativa quando uma entrega por socket não chega
- [Endpoints de Messaging](./api/endpoints/messaging) -- Notificações, dispositivos e o restante da superfície de mensagens
- [AppHelper](./shared-libraries/app-helper) -- O pacote npm que traz o `WebPushHelper`
