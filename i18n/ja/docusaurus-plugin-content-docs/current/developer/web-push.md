---
title: "Web プッシュ通知"
description: "VAPID キー、WebPushHelper クライアント、Service Worker の処理を設定し、B1.church と B1 Admin がメンバーへブラウザのプッシュ通知を届けられるようにします。"
---

# Web プッシュ通知

<div class="article-intro">

ChurchApps の Web アプリは、W3C Web Push API を使ってプッシュ通知を配信します。サーバー側で Firebase Cloud Messaging が使うのと同じ仕組みですが、FCM ではなくブラウザ標準の `PushManager` を通して配信されます。MessagingApi にある 1 組の VAPID キーで、すべてのクライアント (B1Admin、B1App、今後追加される PWA など) に対応します。

</div>

## プッシュが送信されるタイミング

プッシュは、`NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`) による 1 回の配信処理の中の 1 段階です。処理の流れは、アプリ内の通知設定の確認、ソケット配信とプッシュの同時実行 (それぞれ個別の通知設定で制御)、メールの順です。カテゴリをミュートしている受信者には、プッシュは届きません。以前はソケット配信に成功するとプッシュは行われませんでしたが、現在はすべての通知タイプが非公開メッセージと同じ動作になりました。そのため、バックグラウンドで動いているインストール済み PWA は、ソケット配信が成功した後でも OS レベルの通知を表示します。重複したバナーは、サービスワーカーがクライアント側で抑制します ([サービスワーカーの要件](#service-worker-requirement) を参照)。定期リマインダーとスタッフが送信する一斉通知は、ソケット段階を省略してプッシュ段階から直接始まります。メールはタイマーで動作し、この処理の一部ではなく、未読の行を独自のスケジュールでエスカレーションします。

プッシュに到達する主な経路は次のとおりです。

1. **コンテンツ通知** — フォローしている会話への返信、メンション、または `NotificationHelper.createNotifications()` を経由するその他のイベント。
2. **非公開メッセージ** — ダイレクトメッセージは同じ配信関数を通り、ソケット配信と並行して必ずプッシュを試みます。
3. **定期リマインダー** — リマインダーエンジンが展開して配信するイベント、タスク、奉仕のリマインダー。新しい発生分はプッシュ段階から直接始まります。
4. **スタッフが送信するプッシュ** — 単発または団体向けの一斉送信に使う `POST /messaging/notifications/create`、`/ping`、`/group/send`。

## サーバーの処理の流れ

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ アプリ内の通知設定の確認              ← ミュートされた受信者はここで停止し、プッシュは行わない
       ├─ 同じ段階で両方を試行 (互いに制御しない):
       │    ├─ DeliveryHelper によるソケット配信  ← リマインダーや一斉送信では省略 (プッシュ段階から開始)
       │    └─ プッシュの通知設定の確認
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ web-push ライブラリ → VAPID 署名付きの POST → ブラウザのプッシュサービス
       └─ メールの通知設定の確認 → タイマーで動作し、未読の行を別途エスカレーション
```

### 必要な環境変数

VAPID キーは `Environment` に保存され、プッシュを有効にするには存在している必要があります。

| 環境変数 | `Environment` の設定 | 説明 |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | VAPID の公開鍵 (base64url)。`GET /messaging/webpush/publicKey` でクライアントに返されます |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | VAPID の秘密鍵。送信するすべてのプッシュの署名に使われます |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | プッシュサービスに通知される `mailto:` URI。既定値は `mailto:support@churchapps.org` です |

`WebPushHelper.isEnabled()` は、どちらかのキーがない場合に `false` を返します。その場合もメッセージングモジュールは動作を続けますが、プッシュ配信は何もせずに終わります。B1App のモバイルサイトは、設定案内を出す代わりに、プッシュが有効になっていないことを会員に伝えます。

### VAPID キーペアの生成

```bash
npx web-push generate-vapid-keys
```

出力を `.env` (ローカル) または AWS SSM Parameter Store (デプロイ環境) に追加してください。キーを更新すると、既存のすべての購読が無効になります。クライアントは次回ページを読み込んだときに再登録が必要です。

## 保存の仕組み

Web プッシュの購読は、FCM のデバイス情報と同じ既存の `devices` テーブルに保存されます。`fcmToken` 列の `webpush:` という接頭辞で区別されます。

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

これにより、`loadByPersonId` を 1 回呼び出すだけで、プラットフォームに関係なく、ユーザーが登録したすべてのデバイスを取得できます。接頭辞の判定は `WebPushHelper.isWebPushToken(token)` と `decodeSubscription(token)` が行います。

## エンドポイント

ベースパス: `/messaging/webpush`

| メソッド | パス | 認証 | 説明 |
|--------|------|------|-------------|
| GET | `/publicKey` | 公開 | `{ publicKey, enabled }` を返します。クライアントは `publicKey` を `pushManager.subscribe({ applicationServerKey })` に渡します |
| POST | `/subscribe` | JWT | 認証済みユーザーの購読を登録 (または更新) します。ボディ: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | 公開 | `fcmToken` に指定の endpoint を含むデバイス行をすべて削除します。ボディ: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | サーバー側の ID を指定して、特定のデバイス行を削除します |

## クライアントの中核: `WebPushHelper`

`@churchapps/apphelper` の `WebPushHelper` が、クライアント側の唯一の入口です。ホストアプリは起動時に一度設定し、ログイン後に `subscribe()` を呼び出します。

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// アプリの起動処理 (例: _app.tsx、layout.tsx)
WebPushHelper.configure({
  scope: "/",                // サービスワーカーのスコープ。sw.js の登録と一致させます
  appName: "B1AppPwa"        // デバイス行に保存され、どの画面からの購読かで絞り込むときに役立ちます
});

// ログイン後 (および userChurch が変わるたび)
await WebPushHelper.subscribe();
```

利用側が自動的に得られる動作は次のとおりです。

- **対応状況の確認** — `serviceWorker` / `PushManager` / `Notification` に対応していないブラウザでは、`isSupported()` が `false` を返します。
- **再表示の待機期間** — `canPromptNow()` は `localStorage` を使い、プロンプト表示の間隔を 7 日に制限します。OS のプロンプトを閉じたユーザーに、セッションのたびに再度表示しないためです。
- **オプトアウト** — `setOptedOut(true)` と `unsubscribe()` は、再表示を止め、サーバー側のデバイス行を削除します。
- **スタンドアロン PWA の検出** — `isStandalone()` を使うと、iOS でのプッシュ通知のプロンプトを「ユーザーがホーム画面に PWA をインストールした後」に限定できます (iOS では、インストール済みの PWA からしかプッシュを許可できないためです)。
- **教会の切り替え時の再登録** — `refreshEnrollment()` は、既存のブラウザ購読を新しい `userChurch` に対して再送信します。ユーザーに再度確認は表示しません。`userChurch` の変更ハンドラーから呼び出してください。

### サービスワーカーの要件

ブラウザの `PushManager` は、設定されたスコープにサービスワーカーが登録されている場合にのみ購読を解決します。ChurchApps の PWA は、サービスワーカーの生成に [Serwist](https://serwist.dev/) (Next.js アプリ) または workbox を使用しています。サーバーは現在、ソケット配信と並行して必ずプッシュを試みます ([プッシュが送信されるタイミング](#when-push-fires) を参照)。そのため、サービスワーカーが重複を防ぐ役割を担います。その `push` ハンドラーは、フォーカスされているか表示中のクライアントが通知の遷移先をすでに開いている場合は `showNotification` を抑制する必要があります。ただし、バナーを表示したかどうかにかかわらず、アプリのバッジは必ず更新してください。

```javascript
// public/sw.js (Serwist や workbox が生成するファイル)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // バナーを抑制した場合でも、必ず実行されます

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    // パス名が同じであること。非公開メッセージの場合は、conversationId も同じであること。
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
    if (exact) return exact.focus(); // すでに遷移先を表示中: 移動せず、フォーカスするだけ

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

`deepLinkFor` と `clientMatchesTarget` はアプリごとに異なります。参考実装は `B1App/src/app/sw.ts` を見てください。B1App は `privateMessage` を `/mobile/messages/:personId` に、B1Admin は `notification` を通知パネルに振り分けます。

## 運用上の注意

- **`gone: true` の結果** — `WebPushHelper.sendBulk` は、受信者ごとに `{ token, success, gone, errorMessage }` を返します。`gone: true` (プッシュサービスが `404` または `410` を返した) は、購読が恒久的に無効であることを意味します。`NotificationHelper` の後続処理は、そのようなデバイス行を削除し、再試行しないようにします。
- **TTL** — プッシュは `TTL: 86400` (24 時間) で送信されます。24 時間以内にユーザーのブラウザがプッシュサービスに接続しない場合、そのプッシュは破棄されます。
- **再試行なし** — 一時的な失敗 (タイムアウト、5xx) はログに記録されますが、再試行はしません。プッシュはベストエフォートです。確実性は、ページ内のソケットとメール通知の段階が担保します。
- **無効化された環境** — 開発環境では VAPID キーを空のままにできます。その場合 `WebPushHelper.isEnabled()` は `false` を返し、プッシュは何もせず終わります。独自の VAPID の識別情報を持たない環境では、この動作が意図されたものです。

## 関連ページ

- [通知のアーキテクチャ](./architecture/notifications.md) -- アプリ内、プッシュ、メールのエスカレーションの全体像と、リマインダーエンジン
- [リアルタイムのアーキテクチャ](./realtime.md) -- WebSocket による配信。プッシュは、ソケット配信が届かなかったときの予備ではなく、同じ処理の中でソケット配信と並行して、アプリ内の経路から送信されるようになりました
- [メッセージングのエンドポイント](./api/endpoints/messaging.md) -- 通知、デバイス、その他のメッセージング機能
- [AppHelper](./shared-libraries/app-helper.md) -- `WebPushHelper` を含む npm パッケージ
