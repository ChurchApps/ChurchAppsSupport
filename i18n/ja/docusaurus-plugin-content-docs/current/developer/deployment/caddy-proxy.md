---
title: "Caddyカスタムドメイン・プロキシ"
description: "B1.church サイトのカスタム教会ドメインを提供する Caddy リバースプロキシをビルドして実行します。TLS 証明書、ホストのマッピング、既知の注意点を扱います。"
---

# Caddyカスタムドメイン・プロキシ

<div class="article-intro">

教会のカスタムドメイン（`mychurch.org` → 教会のB1ウェブサイト）は、Caddyを実行する単一のWindows EC2ボックスで終端されます。このボックスがTLS証明書を管理し、各ドメインを対応する `{sub}.b1.church` サイトに解決して、書き換えたHostヘッダーを付けてリバースプロキシします。構成は2つのファイル（静的な `Caddyfile` と、Membership APIから更新される `hosts.map`）だけで完結しているため、ランタイムの状態を持たず、再起動しても問題ありません。このページでは、ボックスをゼロから構築する方法、運用方法、そして再構築する人がつまずきやすい実地で確認済みの落とし穴を扱います。

</div>

リクエストがB1Appに届いた後、どの教会／サイトに解決されるかについては、[ウェブサイトのルーティングとマルチサイト](../architecture/websites.md)を参照してください。

## コンポーネント

| 構成要素 | 概要 |
|---|---|
| EC2インスタンス | Windows Server。Elastic IP **`3.23.251.61`**（世界中の教会のDNSに組み込まれています。IPは恒久的で、インスタンスは使い捨てです） |
| `C:\caddy\caddy.exe` | **カスタム**ビルドのCaddyで、`techknowlogick/certmagic-s3` ストレージモジュールを含みます。標準のCaddyでは証明書ストアを読み取れません |
| `C:\caddy\Caddyfile` | プロキシ設定全体です。オンデマンドTLS、ホストからアップストリームへの `map`、wwwからapexへのリダイレクト、`:80` からhttpsへのリダイレクトを含みます |
| `C:\caddy\hosts.map` | ルーティング可能なドメインごとに1行の `{domain} {sub}.b1.church`。Caddyfileの `map` ブロックに取り込まれます |
| `sync-hostmap.ps1` + `CaddyHostmapSync` タスク | スケジュールタスク（5分ごと、および起動時に SYSTEM として実行）。APIから `hosts.map` を更新し、変更があった場合にのみCaddyを正常にリロードします |
| Windowsサービス `caddy`（WinSWラッパー） | `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile` を実行し、障害時に自動再起動します。CaddyはSCMに対応していないため、ラッパーが必要です |
| S3バケット `churchapps-caddy-certs` | 共有の証明書ストレージ（`region us-east-2`、プレフィックス `certs`）。インスタンスを再構築しても証明書は残ります |
| IAMロール `CaddyRole` | インスタンスにS3アクセスを付与します。CaddyはAWSのデフォルト資格情報チェーンを使用します（設定ファイルに鍵はありません） |

## ボックスが依存する2つのAPIエンドポイント

どちらもMembership APIにあります。`authorize` は匿名でアクセスできます。`hostmap` は、Api PR #67（2026-08-16）以降、`x-internal-key: <INTERNAL_API_KEY>` ヘッダーが必須です。`sync-hostmap.ps1` は `C:\caddy\internal-key.txt` からこの値を読み込みます。

| エンドポイント | 役割 |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | CaddyのオンデマンドTLS `ask` ゲートです。ホスト（`www.` ホストの場合はそのapex）が `domains` にある場合は `200 {"authorized":true}`、それ以外は `404` を返します。これは不正利用対策で、このエンドポイントが拒否するホストに対してCaddyは証明書を発行しません |
| `GET /membership/domains/hostmap` | `x-internal-key`（またはサーバー管理者のJWT）が必要です。`text/plain` で、ソート・重複排除された `{domain} {sub}.b1.church` の行を返します（サイトを考慮し、セカンダリサイトに割り当てられたドメインは、そのサイトのサブドメインに接続されます）。`map` の元データです |

## リクエストの流れ

1. ブラウザが `mychurch.org` を `3.23.251.61` に解決します（apexの `A` レコード、または `CNAME proxy.b1.church`）。
2. Caddyが TLS を終端します。証明書がS3にあればそれを提供します。未知のSNIの場合は `authorize` に問い合わせ、200ならLet's Encryptからオンデマンドで発行し、404なら**ハンドシェイクを拒否します**。証明書もレスポンスもなく、未知のホストにはHTTPエラーではなくTLS拒否が返されます。
3. `map` がHostを `{sub}.b1.church` に解決します。`www.{apex}` は apex へ 302 リダイレクトされます。認可されているがマップされていないホスト（同期の5分以内に追加されたばかりの新しいドメイン）には、きれいな404が返されます。
4. `reverse_proxy` は、SNIとHostをアップストリームに書き換えて `{sub}.b1.church:443` に接続するため、VercelのエッジがB1Appのサイトを提供します。
   Caddyは訪問者の元のドメインを `X-Church-Host` としても送信します（Vercelは `X-Forwarded-Host` を書き換えられたHostで上書きします）。B1Appのミドルウェアは、`/domains/public/lookup/{host}` がそれを同じ `{sub}` にマップする場合にのみこれを受け入れ、正規の `Link` ヘッダー、`robots.txt`、`sitemap.xml` 用に `x-public-host` として公開します。クライアントが送信した `x-public-host` は常に削除されます。Schema.org の `ChurchJsonLd` は引き続き `b1.church` のURLを使用します（そこでヘッダーを読むとページが動的になってしまうため）。
5. ポート80はACME HTTP-01チャレンジを通し、それ以外はすべてhttpsへ308リダイレクトします。

新しいドメインの反映: B1Adminで保存されたドメインは約5分以内にルーティング可能になります（同期タスク）。その証明書は最初のHTTPSアクセス時に発行されます。

## ゼロからのボックス構築

実地で確認済みの手順を要約したものです。コピー＆ペーストできるコマンド付きの完全な手順は、このリポジトリではなく運用ワークスペースにあります。まず前提条件を確認してください。これらがないと構築は失敗します。

1. **IAM**: `CaddyRole`（証明書バケットへのS3アクセス）をインスタンスにアタッチします。ボックス上からIMDSv2で確認してください。IMDSへの素のGETが401を返すのは、IMDSv2が強制されていることを意味するだけで、「ロールがない」という意味ではない点に注意してください。
2. **APIの正常性**: 他の作業の前に、存在しないドメインに対して `authorize` が404を返し、`hostmap`（`x-internal-key` ヘッダー付き）が200を返すことを確認してください。

次に:

3. **バイナリ**: Caddyのビルドサービスからカスタムビルドをダウンロードします（`https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3`、約57MB。標準版は約45MB。執筆時点のバージョンはv2.11.4）。モジュールの選択が重要です。`techknowlogick/certmagic-s3` は既存の証明書レイアウトに合う `bucket`/`region`/`prefix` キーを使用します。`ss098` フォークは `host`/`endpoint` を使用するため、既存の証明書を**見つけられません**。
4. **ファイル**: `Caddyfile`、`sync-hostmap.ps1`、`internal-key.txt`（本番の `INTERNAL_API_KEY`、1行）を `C:\caddy\` に配置します。`sync-hostmap.ps1 -NoReload` でマップを一度シードします。
5. **初回起動前のゲート**: `caddy list-modules` にs3ストレージモジュールが表示されること、`caddy adapt` のストレージブロックに `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` が出力されること、`caddy validate` が成功することを確認します。
6. **サービス**: WinSWでインストールします（サービスID `caddy`、障害時の自動再起動、ローリングログ）。LocalSystemとして実行され、ロールの資格情報のためにIMDSにアクセスします。
7. **同期タスク**: `CaddyHostmapSync` を登録します（SYSTEM、5分ごと＋起動時、実行時間制限4分）。
8. **切り替え前の検証**: `curl --resolve` でドメインを `127.0.0.1` に強制解決して検証します（EIPが移動するまでボックスには実トラフィックがありません）。既存ドメインは有効な引き継ぎ証明書で提供されること、`www.` は302を返すこと、未知のホストはTLS拒否されること、そして `Restart-Service caddy` の後、**手動の再プライミングなし**で提供を再開することを確認します。この再起動テストこそが静的設計の要点です。
9. **本番切り替え**: Elastic IP `3.23.251.61` を新しいインスタンスに再関連付けします。教会のDNSは一切変更されません。

## 現場で確認された落とし穴

痛い目を見て学んだことです。回帰させないでください。

| 落とし穴 | 症状 | 対処 |
|---|---|---|
| reverse_proxyのトランスポートにある `tls_server_name {vars.upstream}` | プロキシされるすべてのドメインで502エラーになります。マップのプレースホルダーがTLSダイヤル時に**空として解決される**ため（「ServerNameかInsecureSkipVerifyのどちらかを指定する必要があります」） | トランスポートネイティブのプレースホルダーを使用します: `tls_server_name {http.reverse_proxy.upstream.host}` |
| `hosts.map` の重複キーや不要な行 | Caddyの `map` ハンドラーは**重複した入力キーで致命的エラー**になります。1行の不良データで設定全体が止まることがあります | 同期スクリプトは空白を正規化し、不正な行を削除します（不良行が20%を超える場合のみ全体を拒否）。先に出現したものを優先して重複を排除し、**BOMなし**のUTF-8で書き込みます（BOMは最初のマップキーを壊します）。APIも発生元で、空の値やスペースを含むドメイン行を除外します |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | タスク登録が**黙って失敗します**（範囲外のXML、非終了エラー） | 繰り返し設定を `Interval = "PT5M"` を指定した `MSFT_TaskRepetitionPattern` CIMインスタンスとして作成し、期間は指定しません。`ExecutionTimeLimit` に4分を追加します（最初のSYSTEM実行は、コールドなTLS/CRL検索でハングすることがあります） |

:::warning
管理APIは `localhost:2019` にのみバインドされます。従来のランタイムモードでは、Membership APIがルート設定をプッシュできるように、リモートに公開されていました。静的設計ではリモートからのプッシュは不要であり、公開範囲を狭くしたのは意図的な設計です。`caddy reload`（同期スクリプトがローカルで実行）が、管理APIを利用する唯一の箇所です。
:::

:::info レガシーのランタイム・プッシュ
APIの `CaddyHelper`（および `/membership/domains/caddy` と `/caddy/init` エンドポイント）は、従来のランタイム設定モードへのロールバック経路として、現在も存在しています。静的ボックスが数週間安定稼働した後に削除される予定です。その後は、`authorize` と `hostmap` が唯一の連携ポイントになります。
:::

## 運用

- **ログ**: `C:\caddy\` 内のWinSWローリングログ（サービスの標準出力/エラー。リバースプロキシのエラーは `caddy-service.err.log` に記録されます）。同期履歴は `C:\caddy\sync-hostmap.log` にあります。
- **マップの強制更新**: `Start-ScheduledTask -TaskName CaddyHostmapSync`
- **設定変更**: `C:\caddy\Caddyfile` を編集し、`caddy validate` と `caddy reload` を実行します（または `Restart-Service caddy`。再起動は設計上安全です）。
- **ドメインの大量削除**: 設計上、同期スクリプトのシュリンクガードが作動します。意図的に大幅に減らす場合は、古い `hosts.map` を脇に移動してからタスクを再実行してください。
- **教会向けのDNS手順は永久に変わりません**: apexの `A 3.23.251.61`、または `CNAME proxy.b1.church`。

## 関連ページ

- [ウェブサイトのルーティングとマルチサイト](../architecture/websites.md)：プロキシされたリクエストがB1App内でどの教会／サイトに解決されるか
- [APIのデプロイ](./apis.md)：`authorize`/`hostmap` を提供するMembership APIのデプロイ
