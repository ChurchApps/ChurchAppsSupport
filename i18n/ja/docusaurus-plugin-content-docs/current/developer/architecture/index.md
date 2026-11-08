---
title: "アーキテクチャ"
description: "B1 Admin、B1.church、Api をまたいで、寄付、チェックイン、通知、ウェブサイトがどのように連携しているかを示すクロスリポジトリのシステムマップです。変更前にご確認ください。"
---

# アーキテクチャ

<div class="article-intro">

これらのページはクロスリポジトリのシステムマップです。特定のプロジェクトの設定方法ではなく、ChurchApps の中核となるシステムがアプリ、API モジュール、共有ライブラリ全体にわたってエンドツーエンドでどのように動作するかを説明します。システムの動作を変更する前にお読みください。プロジェクトを起動するには[セットアップ](../setup/index.md)を、エンドポイント単位のリファレンスについては[API セクション](../api/index.md)をお読みください。

</div>

## エコシステムの概要

ChurchApps は約 20 の独立したリポジトリで構成されています（モノレポではありません）。クライアントアプリは HTTPS および WebSocket を介して少数のバックエンド API と通信し、`@churchapps` スコープで公開された npm パッケージを通じてコードを共有します。

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — core modular monolith (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    staff dashboard    │   HTTPS    │   membership    attendance    content        │
│  B1App      member portal +    │ ─────────▶ │   giving        messaging     doing          │
│             church websites    │            │                                              │
│  B1Checkin  check-in kiosk     │ ◀───WS───▶ │   one MySQL database per module (6 total)    │
│                                │            └──────────────────────────────────────────────┘
│  FreePlay   TV content player  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend         │
                │                             └──────────────────────────────────────────────┘
                │  shared code via npm (@churchapps/*)
                ▼
   helpers (cross-app interfaces) · apphelper (React components) · apihelper (Express/server utilities)
```

この章のドキュメント全体を形づくる 2 つの構造的ルールは次のとおりです。

1. **モジュールは分離されています。** 各 Api モジュールは自身のデータベースとテーブルを所有し、他のモジュールやアプリは REST エンドポイントを通じてのみそのデータにアクセスします。[モジュール構造](../api/module-structure.md)を参照してください。
2. **共有コードは npm パッケージとして提供されます。** アプリ同士が互いのソースコードをインポートすることはありません。再利用されるものはすべて `@churchapps/helpers`、`@churchapps/apphelper`、`@churchapps/apihelper` を介してリポジトリの境界を越えます。[共有ライブラリ](../shared-libraries/index.md)を参照してください。

## システムマップ

| ページ | 内容 | 対象範囲 |
|------|----------------|-------|
| [通知とリマインダー](./notifications.md) | 誰かに何かを伝える仕組み全体：2 つの配信経路、チャネルのエスカレーションチェーン、リマインダーエンジン | Api (messaging), B1Admin, B1App |
| [リアルタイムアーキテクチャ](../realtime.md) | チャット、プレゼンス、アプリ内配信を支える WebSocket 配信フレームワーク | Api (messaging), all web apps |
| [Web プッシュ通知](../web-push.md) | ブラウザのプッシュチャネル：VAPID キー、サブスクリプションの保存、配信 | Api (messaging), all web apps |
| [寄付](./giving.md) | 決済プロバイダーとゲートウェイ、寄付フロー、基金/バッチ、ゲートウェイの Webhook | Api (giving), apphelper, B1App, B1Admin |
| [イベント登録](./registrations.md) | 登録の商取引モデル：参加者タイプ、選択項目、割引コード、寄付ゲートウェイを通じた支払い、キャンセル待ちリスト | Api (content + giving), B1App, B1Admin |
| [チェックイン](./check-ins.md) | キオスクおよびセルフチェックイン、出席データモデル、ルーム振り分け、児童安全レイヤー、ラベル印刷 | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [ウェブサイトビルダー](./website-builder.md) | ページ/セクション/要素のツリー、要素タイプの契約とレンダラー、ブログ、アクセス制限付きページ、SEO、AI 生成 | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [ウェブサイトのルーティングとマルチサイト](./websites.md) | リクエストが教会と特定のサイトにどのように解決されるか、マルチサイト `siteId` データモデル、Caddy カスタムドメインのエッジ | B1App, Api (membership + content), B1Admin |
| [インテグレーション](./integrations.md) | 拡張インターフェース：OAuth、API キー、Webhook、コンテンツプロバイダー、MCP | Api, shared libraries, external apps |
| [監査ログと取り消し可能なバッチ](./audit-log.md) | コントローラーの共通処理点でのすべての変更の監査（デフォルトで有効）、およびインポートや一括操作を取り消し可能にするバッチレイヤー | Api (all modules), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff.md) | 有料のストレージおよびテキストメッセージクレジットサービス：共有 JWT による ID、サービスキーによる S2S、テキストメッセージおよびストレージのプロバイダー接続点、Stripe 請求 | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), texting/apihelper packages, B1Admin |
| [持ち込みストレージ（BYOS）](./byos-storage.md) | 教会は無料の 100MB を超えるアップロードのために Google Drive、Dropbox、OneDrive、または S3 互換バケットを連携できます：OAuth 接続、プロバイダーごとのアップロード形式、公開ダウンロードリダイレクト | Api (content + membership), helpers/apphelper packages, B1Admin, B1App |
| [コンテンツコモンズ](./commons.md) | クロスプロダクトのユーザー生成コンテンツを支える共有のアセット/投稿基盤、および B1Admin Server Admin の単一のスタッフ専用モデレーションキュー | Api (commons module), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
別のアプリ内のページではなく、これらのシステムのいずれかの動作が変わる場合は、対応するシステムマップも同じ作業で更新してください。これにより、このセクションが新しい寄稿者にとって信頼できる最初の情報源であり続けます。
:::

## 提案

これらのドキュメントは、利用可能な製品の動作ではなく、レビュー用に提案された作業内容を説明しています。

| 提案 | 内容 |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal.md) | 教会所有のアカウント、キー、サービス、電話番号。連携の範囲、同意、配信、見積もり、リリースチェック |
| [Twilio 教会オンボーディングの草案](./twilio-byok-onboarding-draft.md) | 提案された B1 サインアップフォームの設定、教会固有のキャンペーン例、承認/運用チェックリスト |
