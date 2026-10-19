---
title: "Notificações Push na Web"
---

# Notificações Push na Web

<div class="article-intro">

Os aplicativos web da ChurchApps entregam notificações push pela W3C Web Push API -- o mesmo mecanismo usado pelo Firebase Cloud Messaging no lado do servidor, mas entregue pelo `PushManager` nativo do navegador em vez do FCM. Um único par de chaves VAPID no MessagingApi atende a todos os consumidores (B1Admin, B1App, futuros PWAs).

</div>

## Quando o push é disparado {#when-push-fires}

O push é uma etapa de um único fluxo de entrega dentro de `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): primeiro um filtro de preferências do aplicativo, depois a entrega por socket e o push tentados no mesmo fluxo (cada um atrás do seu próprio filtro de preferências), e por fim o e-mail. Um destinatário que silenciou a categoria nunca chega ao push. O sucesso da entrega por socket não interrompe mais o push -- todo tipo de notificação agora se comporta como as mensagens privadas sempre se comportaram, para que um PWA instalado em segundo plano ainda exiba uma notificação do sistema operacional mesmo quando a entrega por socket já chegou; os banners duplicados são suprimidos no cliente pelo service worker (consulte [Requisito de service worker](#service-worker-requirement)). Lembretes agendados e transmissões iniciadas pela equipe começam diretamente na etapa de push, pulando a etapa de socket. O e-mail continua dirigido por temporizador, escalonando as linhas não lidas segundo a própria programação, e não como parte deste fluxo.

Os caminhos mais comuns que chegam ao push:

1. **Notificações de conteúdo** -- uma resposta a uma conversa que a pessoa acompanha, uma menção ou outro evento roteado por `NotificationHelper.createNotifications()`.
2. **Mensagens privadas** -- uma mensagem direta passa pela mesma função de entrega e sempre tenta o push junto com a entrega por socket.
3. **Lembretes agendados** -- lembretes de eventos, tarefas e escalas expandidos e despachados pelo mecanismo de lembretes, que inicia as novas ocorrências diretamente na etapa de push.
4. **Pushes iniciados pela equipe** -- `POST /messaging/notifications/create`, `/ping` e `/group/send` para transmissões avulsas ou para grupos.

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

### Variáveis de ambiente obrigatórias

As chaves VAPID são armazenadas em `Environment` e precisam estar presentes para que o push seja habilitado:

| Variável | Descrição |
|----------|-------------|
| `webPushPublicKey` | Chave pública VAPID (base64url). Retornada aos clientes por `GET /messaging/webpush/publicKey` |
| `webPushPrivateKey` | Chave privada VAPID. Usada para assinar cada push enviado |
| `webPushSubject` | URI `mailto:` informada aos serviços de push. O padrão é `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` retorna `false` quando qualquer uma das chaves está ausente -- o módulo de mensagens continua funcionando, e as entregas de push simplesmente não são feitas.

### Gerando um par de chaves VAPID

```bash
npx web-push generate-vapid-keys
```

Adicione a saída ao seu `.env` (local) ou ao AWS SSM Parameter Store (implantado). Rotacionar as chaves invalida todas as assinaturas existentes -- os clientes precisam se registrar novamente na próxima vez que a página for carregada.

## Modelo de armazenamento

As assinaturas Web Push são armazenadas na tabela `devices` já existente, junto com os registros de dispositivos FCM. Elas são diferenciadas por um prefixo `webpush:` na coluna `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Isso permite que uma única chamada a `loadByPersonId` retorne todos os dispositivos que um usuário registrou, independentemente da plataforma. `WebPushHelper.isWebPushToken(token)` e `decodeSubscription(token)` cuidam da lógica do prefixo.

## Endpoints

Caminho base: `/messaging/webpush`

| Método | Caminho | Autenticação | Descrição |
|--------|------|------|------------|
| GET | `/publicKey` | Pública | Retorna `{ publicKey, enabled }`. Os clientes passam `publicKey` para `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Registra (ou atualiza) uma assinatura para o usuário autenticado. Corpo: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Pública | Exclui qualquer linha de dispositivo cujo `fcmToken` contenha o endpoint informado. Corpo: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Exclui uma linha de dispositivo específica pelo seu ID no servidor |

## Primitiva do cliente: `WebPushHelper`

O `WebPushHelper` do `@churchapps/apphelper` é o único ponto de entrada no lado do cliente. Os hosts o configuram uma vez na inicialização e chamam `subscribe()` após o login.

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

Comportamentos que os consumidores obtêm automaticamente:

- **Verificação de suporte** -- `isSupported()` retorna `false` em navegadores sem `serviceWorker` / `PushManager` / `Notification`.
- **Intervalo de espera** -- `canPromptNow()` impõe um intervalo de 7 dias entre as solicitações, via `localStorage`, para que usuários que dispensaram o aviso do sistema operacional não sejam perguntados novamente a cada sessão.
- **Cancelamento** -- `setOptedOut(true)` e `unsubscribe()` impedem novas solicitações e removem a linha de dispositivo no servidor.
- **Detecção de PWA instalado** -- `isStandalone()` permite que os hosts condicionem as solicitações de push no iOS a "o usuário instalou o PWA na tela inicial" (no iOS, o push só é permitido para PWAs instalados).
- **Registrar novamente ao trocar de igreja** -- `refreshEnrollment()` reenvia a assinatura existente do navegador para o novo `userChurch` sem solicitar permissão novamente ao usuário. Chame-o no manipulador de alteração de `userChurch`.

### Requisito de service worker {#service-worker-requirement}

O `PushManager` do navegador só resolve uma assinatura quando há um service worker registrado no escopo configurado. Os PWAs da ChurchApps usam [Serwist](https://serwist.dev/) (aplicativos Next.js) ou workbox para gerar o service worker. Como o servidor agora sempre tenta o push junto com a entrega por socket (consulte [Quando o push é disparado](#when-push-fires)), o service worker é o ponto de deduplicação: o handler `push` dele deve suprimir o `showNotification` quando um cliente focado ou visível já estiver na rota de destino da notificação, mas deve sempre atualizar o selo do aplicativo, independentemente de o banner ter sido exibido:

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

`deepLinkFor` / `clientMatchesTarget` são específicos de cada consumidor -- consulte `B1App/src/app/sw.ts` para a implementação de referência. O B1App direciona `privateMessage` para `/mobile/messages/:personId`, e o B1Admin direciona `notification` para o painel de alertas dele, e assim por diante.

## Notas operacionais

- **Resultados `gone: true`** -- `WebPushHelper.sendBulk` retorna `{ token, success, gone, errorMessage }` para cada destinatário. Um resultado `gone: true` (o serviço de push respondeu `404` ou `410`) significa que a assinatura é permanentemente inválida; o código a jusante no `NotificationHelper` exclui essas linhas de dispositivo para que não sejam tentadas novamente.
- **TTL** -- as mensagens push são enviadas com `TTL: 86400` (24 horas). Se o navegador do usuário não se conectar ao serviço de push em até 24 horas, o push é descartado.
- **Sem novas tentativas** -- uma falha transitória (timeout, 5xx) é registrada em log e não é repetida. O push é de melhor esforço; o socket na página e a camada de e-mail cuidam da durabilidade.
- **Ambientes desabilitados** -- ambientes de desenvolvimento podem deixar as chaves VAPID vazias; `WebPushHelper.isEnabled()` retornará `false` e os pushes serão ignorados. Esse é o comportamento pretendido para ambientes que não têm identidade VAPID própria.

## Páginas relacionadas

- [Arquitetura de Notificações](./architecture/notifications) -- o funil completo de escalonamento in-app/push/e-mail e o mecanismo de lembretes
- [Arquitetura em tempo real](./realtime) -- entrega via WebSocket; o push agora é disparado pelo mesmo funil in-app junto com a entrega por socket, no mesmo fluxo, e não apenas como alternativa quando uma entrega por socket não chega
- [Endpoints de Mensagens](./api/endpoints/messaging) -- Notificações, dispositivos e o restante da superfície de mensagens
- [AppHelper](./shared-libraries/app-helper) -- o pacote npm que distribui o `WebPushHelper`
