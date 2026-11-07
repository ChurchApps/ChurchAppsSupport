---
title: "接続サービス"
---

# 接続サービス

<div class="article-intro">

B1を他の教会テクノロジーツールと接続する最も手早い方法は、通常ZapierまたはMakeのレシピを使うことです。B1側に新たなインフラを用意する必要はなく、ワークフローは外部サービス側でホストされます。このページでは、現時点で連携できることを確認したサービスを厳選して掲載し、それぞれについて短くコピー&ペーストで使えるセットアップ手順を示しています。

</div>

## 概要

| サービス | カテゴリ | ブリッジ | 連携内容 |
|---|---|---|---|
| [Mailchimp](./mailchimp) | メール | ZapierまたはMake | 新しいB1の人物・献金者をMailchimpのオーディエンスに同期 |
| [Donorbox](./donorbox) | 寄付 | Zapier | Donorboxの寄付とドナーをB1に送り返す |
| [Subsplash](./subsplash) | アプリ / 寄付 | Zapier | Subsplashの献金と人物をB1に取り込む |
| [VOMO](./vomo) | ボランティア | Zapier | B1のグループとVOMOのプロジェクトの間でボランティア登録を同期 |
| [Clearstream](./clearstream) | SMS | Zapier | B1のイベントからClearstreamのテキストメッセージを送信し、返信をB1のレコードとして取り込む |
| [Text In Church](./text-in-church) | SMS / ワークフロー | Zapier | B1からText In Churchのワークフローを起動し、コネクトカードのデータを受け取る |
| [Mobile Message](./mobile-message) | SMS (オーストラリア) | Webhooks by ZapierまたはMake | B1の任意のイベントからSMSを送信 |
| [Checkr](./checkr) | 身元調査 | Make | 奉仕チームに加わった人の身元調査を開始 |

## これらすべてに共通すること

1. **B1側の設定はすべて同じです** — **B1Admin → Settings → Developer → API Keys** で適切なスコープを持つAPIキーを作成します。その後、ブリッジにトリガー用のWebhookを登録させるか（Zapier / Makeは自動的に行い、`settings:write`が必要です）、下流のアクションからB1のREST エンドポイントを直接呼び出します。
2. **料金はブリッジ側に発生します。** ChurchAppsは無料です。ZapierとMakeはどちらも、いくつかのレシピをカバーする無料プランがあります。
3. **本番運用せずに設定をテストできます。** 両ブリッジには「Test step」ボタンがあり、一度B1に対してトリガーを発火させ、レシピを有効にする前にデータの形式を表示してくれます。

## ブリッジの選び方

- **Zapier** は操作が分かりやすく、アプリの選択肢も多いです。コストが問題でなければ、標準として使ってください。
- **Make** は規模が大きくなると安価で、より柔軟なルーティングやフィルターのロジックがあります。1つのワークフローで分岐、条件分岐、多くのステップがある場合に使ってください。
- **Webhooks by Zapier**（Mobile Messageのドキュメントで使用）は汎用アダプターです。送信先がZapierの正規アプリではない場合に、Zapから任意のHTTPエンドポイントへPOSTできます。

このリストにないものを連携したい場合は、B1の[REST API](/docs/developer/api)と[webhooks](/docs/developer/api/webhooks)が公開されています。[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)を使えば、数時間で単発のブリッジを構築できます。

## 掲載していないもの（とその理由）

Tithe.ly、Pushpay、Vanco、PastorsLine、Gloo、Notebird、KidCheck、MinistrySafeなど、人気のある教会テクノロジーツールの多くは、現時点で公開されたZapierアプリやMakeモジュールがありません。独自のAPIはありますが、B1と連携するにはカスタムコードでの作業が必要で、レシピで済むものではないため、このリストには含めていません。ベンダーがZapierアプリやMakeモジュールを追加した場合は、ドキュメントを追加します。

また、Planning Center Services固有のツール（音楽、プレゼンテーション）、競合するChMS製品、移行コンサルタント、PCO固有のデータを整理するだけのツールも意図的に除外しています。これらはいずれもB1への有用な連携経路がないためです。

## 関連項目

- [Zapier（概要）](../zapier) — ZapierのレシピにおけるB1側の設定はすべて同じなので、このドキュメントで一度だけ説明しています
- [Make（概要）](../make) — Makeのシナリオも同様です
- [Slack & Discord](../slack-discord) — ブリッジなしでチャット通知を受け取れます
- [Google Sheets](../google-sheets) — オンデマンドのエクスポート
- [Webhooks（開発者リファレンス）](/docs/developer/api/webhooks) — すべてのレシピが依存するイベントカタログ
