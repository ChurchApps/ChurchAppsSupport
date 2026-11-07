---
title: "アーキテクチャ"
description: "寄付、チェックイン、通知、ウェブサイトが B1 Admin、B1.church、API の間でどのように連携するかを示す、リポジトリ横断のシステム図です。変更の前にご確認ください。"
---

# アーキテクチャ

<div class="article-intro">

このページは、ChurchApps の主要システムがエンドツーエンドでどのように動作するかを説明する、リポジトリ横断のシステムマップです。個々のプロジェクトのセットアップ方法ではなく、アプリ、API モジュール、共有ライブラリにまたがる全体像を扱います。システムの動作を変更する前に読んでください。プロジェクトを起動するには [セットアップ](../setup/index.md) を、エンドポイント単位のリファレンスは [API セクション](../api/index.md) を参照してください。

</div>

## エコシステムの概要

ChurchApps は独立した約 20 のリポジトリで構成されています（モノレポではありません）。クライアントアプリは HTTPS および WebSocket を通じて少数のバックエンド API と通信し、`@churchapps` スコープで公開された npm パッケージを通じてコードを共有します。

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — core modular monolith (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    staff dashboard    │   HTTPS    │   membership    attendance    content        │
│  B1App      member portal +    │ ─────────▶ │   giving        messaging     doing          │
│             church websites    │            │                                              │
│  B1Checkin  check-in kiosk     │ ◀───WS───▶ │   one MySQL database per module (6 total)    │
│  B1Mobile   (maintenance-only) │            └──────────────────────────────────────────────┘
│  FreePlay   TV content player  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend         │
                │                             └──────────────────────────────────────────────┘
                │  shared code via npm (@churchapps/*)
                ▼
   helpers (cross-app interfaces) · apphelper (React components) · apihelper (Express/server utilities)
```

このセクションで説明されるすべての内容を決めている、2 つの構造上のルールがあります。

1. **モジュールは互いに分離されています。** 各 Api モジュールは自身のデータベースとテーブルを所有し、他のモジュールやアプリは REST エンドポイントを通じてのみそのデータにアクセスします。[モジュール構造](../api/module-structure.md) を参照してください。
2. **共有コードは npm パッケージとして提供されます。** アプリ同士が互いのソースコードを import することはありません。再利用されるものはリポジトリの境界を越えて、`@churchapps/helpers`、`@churchapps/apphelper`、`@churchapps/apihelper` を通じて共有されます。[共有ライブラリ](../shared-libraries/index.md) を参照してください。

## システムマップ

| ページ | 内容 | 対象範囲 |
|------|----------------|-------|
| [通知とリマインダー](./notifications.md) | 人に何かを伝える仕組み。2 つの配信経路、チャネルのエスカレーションチェーン、リマインダーエンジンについて説明します | Api（messaging）、B1Admin、B1App |
| [リアルタイムアーキテクチャ](../realtime.md) | チャット、プレゼンス、アプリ内配信を支える WebSocket 配信フレームワーク | Api（messaging）、すべての Web アプリ |
| [Web プッシュ通知](../web-push.md) | ブラウザのプッシュチャネル。VAPID キー、サブスクリプションの保存、配信について説明します | Api（messaging）、すべての Web アプリ |
| [献金](./giving.md) | 決済プロバイダーとゲートウェイ、献金の流れ、資金とバッチ、ゲートウェイの Webhook | Api（giving）、apphelper、B1App、B1Admin |
| [イベント登録](./registrations.md) | 登録時の決済モデル。参加者タイプ、選択内容、割引コード、献金ゲートウェイを通じた支払い、キャンセル待ちについて説明します | Api（content + giving）、B1App、B1Admin |
| [チェックイン](./check-ins.md) | キオスクとセルフチェックイン、出欠データモデル、部屋の振り分け、子どもの安全を守る仕組み、ラベル印刷 | B1Checkin、B1App、B1Admin、Api（attendance + membership） |
| [ウェブサイトビルダー](./website-builder.md) | ページ・セクション・要素のツリー、要素タイプの契約とレンダラー、ブログ、アクセス制限付きページ、SEO、AI 生成 | Api（content）、AskApi、helpers/apphelper、B1Admin、B1App |
| [ウェブサイトのルーティングとマルチサイト](./websites.md) | リクエストが教会と特定のサイトにどのように解決されるか、マルチサイトの `siteId` データモデル、Caddy によるカスタムドメインのエッジ | B1App、Api（membership + content）、B1Admin |
| [連携](./integrations.md) | 拡張のための仕組み。OAuth、API キー、Webhook、コンテンツプロバイダー、MCP | Api、共有ライブラリ、外部アプリ |
| [監査ログと取り消し可能なバッチ](./audit-log.md) | コントローラーの共通の入口で、すべての変更をデフォルトで監査する仕組み。インポートや一括操作を取り消し可能にするバッチレイヤー | Api（全モジュール）、B1Admin、B1Transfer |
| [MinistryStuff](./ministrystuff.md) | 有料のストレージ・SMS クレジットサービス。共有 JWT による ID、サービスキーによる S2S、SMS とストレージのプロバイダー接続部、Stripe による請求 | MinistryStuffApi、MinistryStuffWeb、Api（content + messaging）、texting/apihelper パッケージ、B1Admin |
| [独自ストレージ（BYOS）](./byos-storage.md) | 無料の 100MB を超えるアップロードのために、教会は Google Drive、Dropbox、OneDrive、または S3 互換バケットを連携できます。OAuth による接続、プロバイダーごとのアップロード形式、公開ダウンロードのリダイレクトについて説明します | Api（content + membership）、helpers/apphelper パッケージ、B1Admin、B1App |
| [コンテンツコモンズ](./commons.md) | 製品横断のユーザー投稿コンテンツを支える、共有のアセットと投稿の基盤。B1Admin の Server Admin にある、スタッフ専用の単一のモデレーションキューについて説明します | Api（commons モジュール）、B1Admin、WorshipCommons、Lessons.church、FreeShow |

:::tip
ここにあるいずれかのシステムの動作を変更する場合（単一アプリ内のページだけでなく、システムそのものの動作を変える場合）は、対応するシステムマップも同じ作業の中で更新してください。そうすることで、このセクションが新しい貢献者にとって信頼できる最初の情報源であり続けます。
:::

## 提案

これらのドキュメントは、利用可能な製品の動作ではなく、レビューのために提案された作業内容を説明しています。

| 提案 | 内容 |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal.md) | 教会所有のアカウント、キー、サービス、電話番号。連携の範囲、同意、配信、見積もり、リリース時のチェック |
| [Twilio 教会オンボーディング草案](./twilio-byok-onboarding-draft.md) | 提案されている B1 のサインアップフォームの設定、教会ごとのキャンペーン例、承認と運用のチェックリスト |
