---
title: "リアルタイムアーキテクチャ"
---

# リアルタイムアーキテクチャ

<div class="article-intro">

ChurchApps では、グループチャット、ダイレクトメッセージ、コンテンツのメモ、ライブ配信のチャット、在席状況と出席記録など、すべてのリアルタイム機能に、WebSocket ベースの単一の配信フレームワークを使用しています。このページでは、プロトコル、サーバー、そしてコンシューマーが利用するクライアント側の基本機能について説明します。

</div>

## 概要

```
┌────────────────────┐                ┌────────────────────────────┐
│ Browser / B1Admin  │                │  MessagingApi (Lambda)     │
│ Browser / B1App    │ ─── WS ─────▶  │  ┌───────────────────────┐ │
│  - SocketHelper    │                │  │ SocketHelper (server) │ │
│  - SubscriptionMgr │   POST /msg ──▶│  │ MessageController     │ │
│  - ConversationStore│  POST /conn ─▶│  │ ConnectionController  │ │
│  - PresenceStore   │ ◀── action ──  │  │ DeliveryHelper        │ │
└────────────────────┘                │  └───────────────────────┘ │
                                      └────────────────────────────┘
```

このプロトコルは次の 3 つの要素で構成されています。

1. ブラウザのタブごとに**永続的な WebSocket を 1 本**。`SocketHelper` が開きます。
2. `connections` テーブルに記録される**接続レコード**（`POST /messaging/connections`）。`(socketId, churchId, conversationId)` の組み合わせを、ルームの購読者として登録します。
3. `DeliveryHelper.sendConversationMessages()` による**サーバー側のファンアウト**。メッセージが保存されると（`POST /messaging/messages/send`）、サーバーは一致する接続レコードを読み取り、型付きのペイロードを開いているソケットそれぞれに送信します。

Socket.IO も、ロングポーリングによるフォールバックも、独立したマイクロサービスも使用していません。WebSocket は REST API と同じプロセス内で動作します（AWS では HTTP に `web` Lambda、WebSocket に `socket` Lambda を使用し、ローカルと Railway では 1 つのプロセスにまとめて動作します）。

## ポートとトランスポート

| 環境 | HTTP | WebSocket |
|-------------|------|-----------|
| ローカル開発 | `8084` | `ws://localhost:8087`（別の `WebSocketServer`） |
| Railway / Docker / 単一ポートのホスト（`RAILWAY_ENVIRONMENT` または `SELF_HOSTED` を設定） | 共有 | 共有 HTTP サーバー（`SocketHelper.attachToServer()`） |
| AWS Lambda | API Gateway HTTP | API Gateway WebSocket（`$connect` / `$disconnect` / `$default` ルート） |

トランスポートの選択は `deliveryProvider` の設定で行います。

- `local`：生の `ws` ライブラリを使用します。クライアントは `CommonEnvironmentHelper` の `MessagingApiSocket` に接続します。
- `aws`：API Gateway WebSocket を使用します。サーバーは `@aws-sdk/client-apigatewaymanagementapi` を通じて、アクティブな接続にペイロードを送信します。

クライアントがどちらのトランスポートが使われているかを意識する必要はありません。どちらの場合も同じ JSON プロトコルで通信します。

## ワイヤープロトコル

すべてのフレームは `PayloadInterface` の形をした JSON です。

```typescript
interface PayloadInterface {
  churchId: string;
  conversationId: string;  // the "room" — usually a UUID, sometimes "alerts" or "content-{type}-{id}"
  action: PayloadAction;
  data: unknown;
}

type PayloadAction =
  | "socketId"            // server → client, after connect, carries the socketId to use for room joins
  | "message"             // server → client, new message
  | "deleteMessage"       // server → client, message removed
  | "privateMessage"      // server → client, badge-count ping to the recipient's "alerts" room when a direct message escalates; the message body itself arrives via the ordinary "message" action inside the open conversation
  | "reaction"            // server → client, emoji reaction toggled on a message; data is { messageId, conversationId, personId, emoji, added } (added=false means removed). Broadcast to the conversation room by POST /messaging/messages/:messageId/reactions
  | "conversationActivity"// server → client, secondary "something happened" signal for content-room subscribers
  | "attendance"          // server → client, viewer list / presence snapshot
  | "notification"        // server → client, generic notification (counts, etc.)
  | "reconnect"           // client-internal, dispatched locally by SocketHelper after a new socketId handshake completes following a drop — either an exponential-backoff reconnect after an unexpected close, or an immediate reconnect triggered by the resume probe (tab focus/visibility/online); never sent by the server
  | "alert" | "callout";  // legacy, see Connections endpoint reference
```

### ハンドシェイク

1. クライアントはソケットを開き、文字列 `"getId"` をそのまま送信します。
2. サーバーは `{ action: "socketId", data: "<id>" }` で応答します。
3. クライアントは `socketId` を保存し、すべてのルーム購読の 3 つ目の座標として使用します。

### ルームへの参加

「ルーム」は単に `(churchId, conversationId)` の組み合わせです。購読するには、クライアントが `Connection` の行を POST します。

```http
POST /messaging/connections
[
  {
    "churchId": "CHU00000001",
    "conversationId": "CON123…",
    "socketId": "abc123",
    "personId": null,            // optional; null for anonymous live stream viewers
    "displayName": "Anonymous4823"
  }
]
```

この POST は、会話に対して `attendance` のブロードキャストも発生させ、既存の購読者に新しい視聴者が参加したことを知らせます。

### メッセージの送信

`POST /messaging/messages/send`（匿名でも可）または `POST /messaging/messages/`（認証が必要）を使用します。

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

サーバーはメッセージを保存したあと、`DeliveryHelper.sendConversationMessages()` がその `conversationId` に一致するすべての接続レコードを検索し、各ソケットに `{ action: "message", data: <message> }` のフレームを送信します。

コンテンツに紐づく会話（たとえば個人に添付されたメモ）の場合は、合成ルーム `"content-{type}-{id}"` に対して `action: "conversationActivity"` の 2 つ目のブロードキャストが発生します。これにより、一覧表示のコンシューマーは、基になる会話を開いたままにしなくても、更新が必要であることを把握できます。

### ルームからの退出

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

接続レコードを削除し、最後の `attendance` ブロードキャストを発生させます。

## サーバー側のコンポーネント

| ファイル | 役割 |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | `WebSocketServer` を管理します。接続時に `socketId` を割り当てます。30 秒間隔の ping/pong ハートビート（`startHeartbeat`）を実行し、pong に応答しない接続を `terminate()` してクリーンアップします。無効になったソケットをクリーンアップし、切断時に `attendance` を再ブロードキャストします。`getLiveSocketIds()` と `reapStaleConnections()` を公開しており、30 分ごとのタイマージョブが古い `connections` の行を削除するために使用します。ローカルでは、プロセス内でまだ生きている socketId を確認して削除します。AWS では、取りこぼした `$disconnect` イベントに対する 24 時間の TTL によるバックストップとして機能します（API Gateway の接続は約 2 時間で上限に達するため、生きている接続を誤って削除することはありません） |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)` はルームの接続を読み取り、各フレームをローカルのソケットまたは AWS API Gateway の接続に振り分けます。`sendAttendance(churchId, conversationId)` は視聴者のスナップショットを作成してブロードキャストします |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` は参加、`DELETE /:churchId/:conversationId/:socketId` は退出、`POST /setName` は表示名の更新を行います |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send`（匿名）と `POST /`（認証済み）は、保存したあとファンアウトします |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)` は、誰が購読しているかの信頼できる情報源です |

## クライアント側の基本機能（`@churchapps/apphelper`）

5 つの基本機能はすべて `apphelper/src/helpers/` にある静的なシングルトンです。これらは連携して動作するため、ページ上にいくつのコンポーネントがマウントされても、タブごとに WebSocket は **1 本** だけ開かれます。

### `SocketHelper`

単一の WebSocket 接続を管理します。再入可能な `init()` は冪等であり、複数のコンポーネントが重複したソケットを開かずに呼び出せます。次のものを公開しています。

- `init()`：ソケットを開く（または既存のものを再利用する）と、`getId` のハンドシェイクを完了させます。ハンドシェイクが完了するか、5 秒のタイムアウト後にバックグラウンドの再試行ループが引き継いだ時点で解決します。決して reject されないため、呼び出し側で最初の接続失敗を個別に処理する必要はありません。
- `addHandler(action, id, fn)` / `removeHandler(id)`：`action` ごとにリスナーを登録・解除します。同じアクションに対して複数のハンドラーが待ち受けることができます。
- `setPersonChurch({ personId, churchId })`：認証済みの呼び出し元向けです。`"alerts"` ルームの購読をトリガーし、プッシュ通知がこのソケットで届くようにします。
- `onSocketIdReady(fn)`：新しい socketId が発行されるたびに呼び出されます。最初のハンドシェイクだけでなく、その後のすべての再接続も含まれます。`SubscriptionManager` が保留中の参加をフラッシュするために使用します。
- `checkConnection()`：以下のレジューム用リスナーから呼び出されます。ソケットがすでに閉じている場合は即座に再接続し、開いているように見える場合は生存確認のプローブを送信します。

**再接続のライフサイクル。** 予期しない切断が発生すると、指数バックオフ（1 秒から始まり、30 秒を上限に倍増）で再接続がスケジュールされます。`SocketHelper` は `window`/`document` の `online`、`focus`、`pageshow`、`visibilitychange` も監視し、タブの再開を検出します。ソケットがすでに閉じている場合は即座に再接続し、バックオフをリセットします。開いているように見える場合は `"getId"` の生存確認プローブを送信し、3 秒以内にフレームが届かなければ強制的に再接続します。これは、モバイル OS がアプリを一時停止した後に残る「半開き」のソケットを検出するためのものです。再ハンドシェイクが成功すると、`SocketHelper` はローカルの `"reconnect"` アクション（[ワイヤープロトコル](#wire-protocol)を参照）を、そのアクションに登録されたすべてのハンドラーにディスパッチします。

### `SubscriptionManager`

参照カウント方式でルームへの所属を管理します。同じ会話を購読する複数のコンポーネントがあっても、サーバー側の接続レコードは 1 件だけ登録されます。

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... component renders, receives socket frames via ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

コンシューマーが自動的に得られる動作は次の 3 つです。

- **遅延した退出（300 ms）**：React StrictMode の二重マウント・アンマウントや、短時間の再マウントに耐え、サーバー側の購読を失うことなく維持します。`reset()` は保留中の遅延退出もキャンセルします。
- **再接続時の再参加**：`SubscriptionManager` は、各ルームへの参加時に使用された `personId` と `displayName` を記憶しています。そのため、`SocketHelper` の `"reconnect"` イベント（および `onSocketIdReady` の呼び出しごと）で、アクティブなすべての接続レコードを身元情報を保ったまま再 POST します。再参加は socketId ごとに重複排除されるため、同じ再接続で同じルームが 2 回 POST されることはありません。
- **後からバインドされる socketId**：`joinRoom` は、ソケットのハンドシェイクが完了する前に参加の意図を記録します。実際の `POST /connections` は `onSocketIdReady` で実行されます。

### `ConversationStore`

`conversationId` をキーとするメモリ内キャッシュです。`message`、`deleteMessage`、`privateMessage` のソケットハンドラーを一度だけ登録し、受信したフレームを現在開かれている会話に適用します。

```typescript
import { ConversationStore } from "@churchapps/apphelper";

const conv = await ConversationStore.loadByConversationId(conversationId, churchId);
// ↑ uses /messages/conversation/:id when authenticated, /messages/catchup/:churchId/:id when anonymous

const unsubscribe = ConversationStore.subscribe(conversationId, (conv) => {
  setMessages(conv.messages);  // re-render with the latest snapshot
});
// ...
unsubscribe();
ConversationStore.forget(conversationId);  // optional explicit cleanup
```

認証済みの呼び出し元は、**人物情報の補完**も利用できます。受信メッセージの `personId` は、キャッシュされた `GET /people/ids` の検索によって `PersonInterface` オブジェクトに解決されます。匿名の呼び出し元ではこの処理は行われません。

`SocketHelper` の `"reconnect"` イベントが発生すると、`ConversationStore` は、現在アクティブな `subscribe` リスナーを持つすべての会話を再取得し、ソケットが切断されている間に取りこぼしたメッセージを回復します。匿名の会話の場合、`churchId` が記録されていなければこの補完はスキップされます（補完用のエンドポイントは `churchId` を必要とするためです）。

### `PresenceStore`

`attendance` アクションについて、`ConversationStore` と同じパターンに従います。サーバーがプレゼンス情報を再ブロードキャストするたびに、購読者は `PresenceSnapshot { conversationId, totalViewers, viewers }` を受け取ります。同一のスナップショットは通知前に重複排除されるため、再接続が集中しても不要な再描画は発生しません。

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

**認証済み**の呼び出し元向けのトップレベルの起動処理です。`SocketHelper.init()` をラップし、人物とチャーチのコンテキストを設定します（これにより `"alerts"` ルームへ自動的に参加します）。また、`ConversationStore.ensureHandlers()`、`PresenceStore.ensureHandlers()`、`SubscriptionManager.setupRejoin()` を一度だけ呼び出します。さらに、通知と PM の件数を再読み込みする独自の `"reconnect"` ハンドラーを登録するため、接続が切れた後も通知バッジが復旧します。

```typescript
await NotificationService.getInstance().initialize(userContext);
```

匿名のフロー（ライブ配信のチャットが代表例です）は `NotificationService` を使わず、基本機能を直接呼び出します。参考実装については `B1App/src/helpers/StreamChatManager.ts` を参照してください。

## ライブ配信のチャット

ライブ配信は、このフレームワークを最も多く利用する匿名のコンシューマーです。ルームのスコープ設定には 2 つの `contentType` を使用します。

- `streamingLive`：`/stream` 上の公開チャットタブです（`streamingService` ごとに 1 つのルーム）。
- `streamingLiveHost`：`contentApi.chat.host` 権限を持つスタッフだけが見られるプライベートなルームです。ルーム ID はサーバー側で暗号化されます（`GET /streamingServices/:id/hostChat`）。そのため、軽率なスクレイピングでは明らかになりません。

`B1App/src/helpers/StreamChatManager.ts` は、統一された基本機能を通じて両方のルームを起動します。ライブ配信専用のソケットコードは、もう存在しません。

## パターンと注意点

- **独自の WebSocket を開かないでください。** `SocketHelper` はシングルトンとして設計されています。カスタムのアクションを待ち受ける必要がある場合は、`SocketHelper.addHandler` を使って既存のソケットにハンドラーを登録してください。
- **`SubscriptionManager` を迂回しないでください。** `POST /connections` を直接呼び出すこともできますが、参照カウント、遅延退出、再接続時の再参加の機能が失われます。グループチャットと PM のコンシューマーはすべて `SubscriptionManager` を経由します。
- **ハンドラー ID はアクションごとに一意である必要があります。** `SocketHelper.addHandler(action, id, fn)` は `(action, id)` をキーとします。2 つのリスナーで同じ ID を使うと、最初のリスナーが置き換えられます。統一されたストアは、コンシューマーの ID と衝突しないよう、`"ConversationStore-Message"` や `"PresenceStore-Attendance"` のような ID を使用しています。
- **ルーム ID は不透明な文字列です。** 大半は会話の UUID ですが、システムは `"alerts"`（個人ごとの通知）、`"content-{type}-{id}"`（合成のアクティビティルーム）、暗号化された `streamingLiveHost` の ID もサポートしています。
- **認証はソケットではなく REST の境界でチェックされます。** `POST /connections` によるルームへの参加は匿名でも可能です。アクセス制御はメッセージ送信時に行われます（メッセージコントローラーが、匿名の呼び出し元が送信できる `messageType` を判断します）。

## 関連ページ

- [通知アーキテクチャ](./architecture/notifications) -- このトランスポートが接続される、アプリ内・プッシュ・メールの通知のエスカレーションの仕組み
- [メッセージングのエンドポイント](./api/endpoints/messaging) -- メッセージ、会話、接続、デバイスに関する REST API の全体像
- [Web プッシュ通知](./web-push) -- ブラウザのプッシュ通知。ページ内のソケット配信とは別のものです
- [AppHelper](./shared-libraries/app-helper) -- クライアント側の基本機能を提供する npm パッケージ
- [モジュール構成](./api/module-structure) -- サーバー側でメッセージングモジュールがどのように構成されているか
