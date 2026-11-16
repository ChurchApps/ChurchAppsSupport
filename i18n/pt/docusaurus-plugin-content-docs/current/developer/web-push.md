---
title: "Notificações push na web"
description: "Configure chaves VAPID, o cliente WebPushHelper e o tratamento do service worker para que o B1.church e o B1 Admin entreguem notificações push do navegador aos membros."
---

# Notificações push na web {#web-push-notifications}

<div class="article-intro">

Os aplicativos web do ChurchApps entregam notificações push pela API Web Push do W3C — o mesmo mecanismo usado pelo Firebase Cloud Messaging no lado do servidor, mas entregue pelo `PushManager` nativo do navegador em vez do FCM. Um único par de chaves VAPID no MessagingApi atende todos os consumidores (B1Admin, B1App, futuros PWAs).

</div>

## Quando o push é disparado {#when-push-fires}

O push é um nível em uma única passagem de entrega dentro de `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): um portão de preferências in-app, depois o socket e o push tentados na mesma passagem (cada um atrás do próprio portão de preferências) e depois o e-mail. Um destinatário que silenciou a categoria nunca chega ao push. Uma entrega bem-sucedida pelo socket não interrompe mais o push — todo tipo de notificação agora se comporta como as mensagens privadas sempre se comportaram, então um PWA instalado em segundo plano ainda exibe uma notificação em nível de sistema operacional mesmo quando uma entrega pelo socket já chegou; banners duplicados são suprimidos no cliente pelo service worker (veja [Requisito do service worker](#service-worker-requirement)). Lembretes agendados e envios em massa feitos pela equipe começam diretamente no nível do push, pulando a etapa do socket. O e-mail continua dependendo do temporizador, escalonando linhas não lidas em seu próprio cronograma, e não como parte desta passagem.

Os caminhos mais comuns que chegam ao push:

1. **Notificações de conteúdo** — uma resposta a uma conversa que a pessoa acompanha, uma menção ou outro evento roteado por `NotificationHelper.createNotifications()`.
2. **Mensagens privadas** — uma mensagem direta passa pela mesma função de entrega e sempre tenta o push junto com a entrega pelo socket.
3. **Lembretes agendados** — lembretes de eventos, tarefas e escalas expandidos e despachados pelo motor de lembretes, que inicia novas ocorrências diretamente no nível do push.
4. **Pushes disparados pela equipe** — `POST /messaging/notifications/create`, `/ping` e `/group/send` para envios pontuais ou a grupos.
5. **Pushes agendados pela equipe** — `POST /messaging/scheduledNotifications` salva um push para todos com o aplicativo (`audience: "church"`) ou para um grupo, e o temporizador de 1 minuto o envia quando chega a hora (veja [Arquitetura de notificações](./architecture/notifications.md)). Um push para a igreja toda sem link abre `/mobile/notifications`; um push para grupo sem link abre esse grupo.

## Fluxo no servidor {#server-flow}

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ portão de preferências in-app             ← destinatários silenciados param aqui, sem push
       ├─ mesma passagem, ambos tentados (nenhum controla o outro):
       │    ├─ entrega por socket via DeliveryHelper  ← ignorada para lembretes/envios (começam no push)
       │    └─ portão de preferências de push
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ biblioteca web-push → POST assinado com VAPID → serviço de push do navegador
       └─ portão de preferências de e-mail → dependente do temporizador, escalona linhas não lidas separadamente
```

### Variáveis de ambiente necessárias {#required-environment-variables}

As chaves VAPID são armazenadas em `Environment` e precisam estar presentes para que o push seja habilitado:

| Variável de ambiente | Configuração em `Environment` | Descrição |
|----------|----------|-----------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | Chave pública VAPID (base64url). Retornada aos clientes por `GET /messaging/webpush/publicKey` |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | Chave privada VAPID. Usada para assinar cada push enviado |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | URI `mailto:` informada aos serviços de push. Padrão `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` retorna `false` quando qualquer uma das chaves está ausente — o módulo de mensagens continua funcionando, e as entregas de push simplesmente não são executadas. O site móvel do B1App então informa aos membros que o push não está ativado, em vez de oferecer a configuração.

### Gerando um par de chaves VAPID {#generating-a-vapid-key-pair}

```bash
npx web-push generate-vapid-keys
```

Adicione a saída ao seu `.env` (local) ou ao AWS SSM Parameter Store (em produção). Rotacionar as chaves invalida todas as assinaturas existentes — os clientes precisam se registrar novamente no próximo carregamento da página.

## Modelo de armazenamento {#storage-model}

As assinaturas Web Push são armazenadas na tabela `devices` já existente, junto com os registros de dispositivos FCM. Elas se distinguem pelo prefixo `webpush:` na coluna `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Isso permite que uma única chamada `loadByPersonId` retorne todos os dispositivos registrados por um usuário, independentemente da plataforma. `WebPushHelper.isWebPushToken(token)` e `decodeSubscription(token)` cuidam da lógica do prefixo.

## Endpoints {#endpoints}

Caminho base: `/messaging/webpush`

| Método | Caminho | Auth | Descrição |
|--------|---------|------|-----------|
| GET | `/publicKey` | Público | Retorna `{ publicKey, enabled }`. Os clientes passam `publicKey` para `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Registra (ou atualiza) uma assinatura para o usuário autenticado. Corpo: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Público | Exclui qualquer linha de dispositivo cujo `fcmToken` contenha o endpoint informado. Corpo: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Exclui uma linha de dispositivo específica pelo seu ID no servidor |

## Primitiva do cliente: `WebPushHelper` {#client-primitive-webpushhelper}

O `WebPushHelper` do `@churchapps/apphelper` é o ponto de entrada único no lado do cliente. Os hosts o configuram uma vez na inicialização e chamam `subscribe()` depois do login.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// Na inicialização do seu app (por exemplo, _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // escopo do service worker; corresponde ao registro do sw.js
  appName: "B1AppPwa"        // armazenado na linha do dispositivo, útil para filtrar por superfície
});

// Depois do login (e após cada mudança de userChurch)
await WebPushHelper.subscribe();
```

Comportamentos que os consumidores obtêm sem custo adicional:

- **Verificação de suporte** — `isSupported()` retorna `false` em navegadores sem `serviceWorker` / `PushManager` / `Notification`.
- **Intervalo de espera** — `canPromptNow()` impõe um intervalo de 7 dias entre os pedidos, via `localStorage`, para que usuários que dispensaram o pedido do sistema operacional não sejam perguntados novamente a cada sessão.
- **Opt-out** — `setOptedOut(true)` e `unsubscribe()` impedem novos pedidos e removem a linha do dispositivo no servidor.
- **Detecção de PWA instalado** — `isStandalone()` permite que os hosts condicionem os pedidos de push no iOS a "o usuário instalou o PWA na tela inicial" (o iOS só permite push a partir de PWAs instalados).
- **Registrar de novo ao trocar de igreja** — `refreshEnrollment()` reenvia a assinatura existente do navegador para o novo `userChurch` sem pedir permissão novamente ao usuário. Chame-o no manipulador de mudança de `userChurch`.

### Requisito do service worker {#service-worker-requirement}

O `PushManager` do navegador só resolve uma assinatura quando um service worker está registrado no escopo configurado. Os PWAs do ChurchApps usam [Serwist](https://serwist.dev/) (apps Next.js) ou workbox para gerar o service worker. Como o servidor agora sempre tenta o push junto com a entrega pelo socket (veja [Quando o push é disparado](#when-push-fires)), o service worker é o ponto de deduplicação: seu manipulador `push` deve suprimir o `showNotification` quando um cliente focado/visível já estiver na página de destino do link da notificação, mas deve sempre atualizar o selo do aplicativo, independentemente de o banner ter sido exibido:

```javascript
// public/sw.js (ou o que o Serwist/workbox gerar)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // sempre executa, mesmo se o banner for suprimido

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
    if (exact) return exact.focus(); // já está no destino: foque, não navegue

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

`deepLinkFor` / `clientMatchesTarget` dependem de cada consumidor — veja `B1App/src/app/sw.ts` para a implementação de referência. O B1App direciona `privateMessage` para `/mobile/messages/:personId`, o B1Admin direciona `notification` para o painel de alertas dele, e assim por diante.

## Notas operacionais {#operational-notes}

- **Resultados `gone: true`** — `WebPushHelper.sendBulk` retorna `{ token, success, gone, errorMessage }` para cada destinatário. Um resultado `gone: true` (o serviço de push respondeu `404` ou `410`) significa que a assinatura é permanentemente inválida; o código downstream em `NotificationHelper` exclui essas linhas de dispositivo para que não sejam tentadas de novo.
- **TTL** — as mensagens push são enviadas com `TTL: 86400` (24 horas). Se o navegador do usuário não se conectar ao serviço de push dentro de 24 horas, o push é descartado.
- **Sem novas tentativas** — uma falha transitória (timeout, 5xx) é registrada no log e não é repetida. O push é de melhor esforço; o socket na página e o nível de notificação por e-mail cuidam da durabilidade.
- **Ambientes desabilitados** — ambientes de desenvolvimento podem deixar as chaves VAPID vazias; `WebPushHelper.isEnabled()` retornará `false` e os pushes são ignorados imediatamente. Esse é o comportamento pretendido para ambientes sem identidade VAPID própria.

## Páginas relacionadas {#related-pages}

- [Arquitetura de notificações](./architecture/notifications.md) -- O funil completo de escalonamento in-app/push/e-mail e o motor de lembretes
- [Arquitetura em tempo real](./realtime.md) -- Entrega via WebSocket; o push agora é disparado a partir do mesmo funil in-app junto com a entrega pelo socket, na mesma passagem, e não apenas como fallback quando uma entrega por socket não chega
- [Endpoints de mensagens](./api/endpoints/messaging.md) -- Notificações, dispositivos e o restante da superfície de mensagens
- [AppHelper](./shared-libraries/app-helper.md) -- O pacote npm que distribui o `WebPushHelper`
