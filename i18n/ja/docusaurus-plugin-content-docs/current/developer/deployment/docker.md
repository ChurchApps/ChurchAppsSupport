---
title: "Docker でのセルフホスティング"
description: "Docker を使って、自分のマシンにプライベートな B1 Admin、メンバーポータル、API、MySQL のスタックをインストールし、b1 コマンドでアップグレードとバックアップを行います。"
---

# Docker でのセルフホスティング

<div class="article-intro">

Docker が動作する任意のマシン（ホームサーバー、小規模な VPS、オンプレミスの機器など）で、B1 Admin、B1 の会員ポータルとウェブサイト、API、MySQL データベースを含む、ご自身専用のインスタンスを実行できます。インストールも、アップグレードも、コマンドを 1 つ実行するだけで完了します。アップグレードのたびに、事前にバックアップが自動で取られます。サーバーを自分で管理したくない場合は、マネージド版の代替手段である [Railway でのセルフホスティング](./railway-template.md) をご覧ください。

</div>

## クイックスタート

<div class="prereqs">
<h4>必要なもの</h4>

- Linux マシン（または WSL か Git Bash を使う macOS / Windows。`b1` ヘルパーは bash スクリプトです）。[Docker Engine](https://docs.docker.com/engine/install/) と Compose v2 がインストールされていること（Docker Desktop には同梱されています）
- 約 2 GB の RAM と 5 GB のディスク空き容量
- 公開サイトとして運用する場合: マシンを指しているドメイン名があり、ポート 80 と 443 にアクセスできること

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

`localhost` で実行する場合は `--domain` を省略してください（`http://localhost` で動作します）。インストーラーは `b1church` フォルダーを作成し、新たに生成されたシークレットを含む `.env` を書き出し、GitHub Container Registry からビルド済みのイメージを取得して、API が正常と報告するまで待機します。お使いのマシン上では何もビルドされないため、初回起動には 1〜2 分かかります。

インストールが完了したら、次の手順に進みます。

1. **https://church.example.org/admin**（または http://localhost/admin）を開き、**Register** をクリックします。最初に作成されたアカウントは、自動的にサーバー管理者になります。
2. アプリ内の案内に従って、最初の教会を作成します。教会が作成されると、そのウェブサイトと会員ポータルが **https://church.example.org/** で直ちに公開されます。

すべてのサービスは、1 つのドメインの配下で動作します。

| パス | サービス |
|------|---------|
| `/` | B1App — 教会のウェブサイトと会員ポータル |
| `/admin` | B1Admin — スタッフ用ダッシュボード |
| `/api` | API、アップロードされたファイル、ライブ更新用の websocket |

HTTPS は自動で有効になります。同梱の [Caddy](https://caddyserver.com/) プロキシが、`.env` に指定したドメインの Let's Encrypt 証明書を取得し、自動で更新します。公開されるのはポート 80 と 443 のみで、データベースには Docker ネットワーク内部からのみアクセスできます。

## `b1` コマンド

インストーラーは `docker-compose.yml` と同じ場所に `deploy/b1` スクリプトを配置します。日常の運用で必要なのは、このスクリプトだけです。

| コマンド | 内容 |
|---------|------|
| `./deploy/b1 upgrade` | 最新リリースを取得し、バックアップを取得してから再起動し、API が正常に動作していることを確認します |
| `./deploy/b1 upgrade 2026.10.1` | 上記と同じですが、特定のリリースに固定します |
| `./deploy/b1 backup` | データベース、アップロードされたファイル、`.env` のスナップショットを `backups/<timestamp>/` に保存します |
| `./deploy/b1 restore backups/<timestamp>` | スナップショットを復元します（実行中は API が停止します） |
| `./deploy/b1 rollback` | 最新のバックアップを、そのバックアップが取られたときのリリースも含めて復元します |
| `./deploy/b1 status` | インストール済みのバージョンとコンテナの状態を表示します |
| `./deploy/b1 logs api` | 指定したサービスのログを追跡表示します |

リリースは、3 つのイメージが常に一致するように、バージョン付きの 1 つのバンドルとして公開されます。`.env` の `B1_VERSION=stable` を指定すると最新リリースに追従します。特定のバージョンに固定するには、そのバージョンを設定してください。リリースノートは [B1Admin のリリース](https://github.com/ChurchApps/B1Admin/releases) にあります。

## 設定

すべての設定は、`docker-compose.yml` と同じ場所にある `.env` に記載されます。必須項目はインストーラーが入力します。

```bash
B1_VERSION=stable
DOMAIN=church.example.org
SITE_ADDRESS=church.example.org          # what Caddy serves; http://localhost for a local install
PUBLIC_URL=https://church.example.org    # how browsers and emails reach the site
MYSQL_ROOT_PASSWORD=…                    # generated
JWT_SECRET=…                             # generated
ENCRYPTION_KEY=…                         # generated, exactly 32 characters — never change it after storing credentials

# Email — strongly recommended; without it members can't reset their own passwords
MAIL_SYSTEM=SMTP
SMTP_HOST=smtp.resend.com
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxx
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@church.example.org
```

`.env` を編集した後は、`docker compose up -d` で変更を反映してください。ウェブアプリは、ブラウザーのアドレスから接続先の API を判断します。そのため、ドメインを変更する場合は `SITE_ADDRESS` と `PUBLIC_URL` を更新してコンテナを再起動するだけで済み、再ビルドは不要です。

:::warning
`.env` は安全に保管してください。`ENCRYPTION_KEY` は、保存された決済ゲートウェイやストレージの認証情報を保護しています。このキーがないバックアップでは、それらの認証情報を復号できません。`./deploy/b1 backup` は、この理由から `.env` のコピーも含めます。
:::

### 後からドメインに移行する場合

`localhost` にインストールした後で公開したい場合は、DNS をマシンに向け、`.env` で `DOMAIN`、`SITE_ADDRESS`（ドメイン名のみ）、`PUBLIC_URL`（`https://` とドメインを組み合わせたもの）を設定してから、`docker compose up -d` を実行してください。Caddy は最初のリクエストの時点で証明書を取得します。

## メール、献金、マルチサイト、外部連携

これらの機能は、Railway と完全に同じように動作します。同じ環境変数を使用しますが、Railway のダッシュボードではなく `.env` に設定します。

- **[メール / SMTP](./railway-template.md#1-email-highly-recommended)**: Resend、Brevo、Gmail の設定手順を掲載しています
- **[マルチサイト](./railway-template.md#3-multi-site-multiple-churches-on-one-instance)**: 1 つのインスタンスで教会の数に制限はありません。`/` では `DEFAULT_CHURCH_SLUG` のスラッグを持つ教会が表示されます（最初の教会のスラッグは `church` です）。追加のドメインはマシンに向け、B1Admin の **Settings → Domains** で割り当ててください
- **[オンライン献金](./railway-template.md#4-online-giving-stripe--paypal)**: 教会ごとに管理画面で設定します
- **[任意の外部連携](./railway-template.md#6-optional-feature-integrations)**: `OPENAI_API_KEY`、`YOUTUBE_API_KEY`、`PEXELS_KEY`、`VIMEO_TOKEN`、`API_BIBLE_KEY`、`GOOGLE_RECAPTCHA_SECRET_KEY`
- **[プッシュ通知](#push-notifications)**: `WEB_PUSH_*` の項目です。インストーラーはこれらを空欄のままにするため、追加するまでプッシュ通知は無効です

セルフホスト環境では、教会から送信される招待メールやその他のメールが自動的に有効になります。（マネージドサービスでは、送信元の評判を守るため、これらは手動審査を経てから有効になります。）

## プッシュ通知

ブラウザーとモバイル Web のプッシュ通知は、サーバーに VAPID キーのペアが設定されるまで無効のままです。インストーラーはこのキーを作成しません。キーを追加するまで、モバイル Web アプリの通知ページには、このサイトではプッシュ通知が有効になっていないと表示されます。

1. キーのペアを生成します。必要なのは Docker だけです。

   ```bash
   docker run --rm node:lts-alpine npx --yes web-push generate-vapid-keys
   ```

2. 2 つの値を `.env` に追加します。`WEB_PUSH_SUBJECT` は任意の項目で、プッシュサービスに通知される連絡先アドレスです。

   ```bash
   WEB_PUSH_PUBLIC_KEY=…
   WEB_PUSH_PRIVATE_KEY=…
   WEB_PUSH_SUBJECT=mailto:admin@example.org
   ```

3. 設定を反映させます。

   ```bash
   docker compose up -d
   ```

4. 確認するには、B1Admin で **Server Admin → Server Health** を開きます。Web Push の 2 つのキーが設定済みと表示されていれば成功です。その後、会員はモバイル Web アプリから通知を有効にできます。

:::warning
会員が登録した後は、同じキーを使い続けてください。キーを変更すると既存のサブスクリプションがすべて無効になり、各デバイスで再登録が必要になります。
:::

## データ、バックアップ、ファイルストレージ

すべての状態は、3 つの名前付き Docker ボリュームに保存されます。

| ボリューム | 内容 |
|-----------|------|
| `b1church_mysql-data` | すべてのデータベーススキーマ |
| `b1church_api-content` | アップロードされたファイル（写真、文書、ウェブサイトの画像） |
| `b1church_caddy-data` | TLS 証明書 |

`./deploy/b1 backup` は、最初の 2 つのボリュームと `.env` の整合性の取れたスナップショットを `backups/<timestamp>/` に書き出します。cron でスケジュール化し、フォルダーをマシンの外にもコピーしてください。

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

大容量のメディアライブラリを扱う場合は、ファイルストレージを S3 に切り替えられます。`FILE_STORE=S3` と、[Railway ガイドのファイルストレージのセクション](./railway-template.md#5-file-storage) で説明している `AWS_*` 変数を設定してください。データベースのバックアップには S3 のオブジェクトが含まれないため、バケットのバージョニングを有効にしてください。

## 更新

```bash
./deploy/b1 upgrade
```

このコマンドは次の順序で実行されます。リリースを取得し、バックアップを取り、コンテナを再作成し、API の起動時に保留中のデータベースマイグレーションを実行して、API のヘルスチェックを待ちます。いずれかの処理が失敗した場合は停止し、`./deploy/b1 rollback` の実行を案内します。このコマンドは、そのバックアップと直前のリリースを復元します。マイグレーションは前方向にのみ適用されるため、ロールバックは常にスナップショットの復元を意味します。

`.env` を用意すれば、ソースからイメージをビルドしていたベータ版の compose ファイルからのアップグレードも同じ手順で行えます。そのファイルは既定で `MYSQL_ROOT_PASSWORD=churchapps` を使用していたため、この値を `PUBLIC_URL` と `SITE_ADDRESS` とともに `.env` に記載してください。その後、`docker-compose.yml` と `deploy/` を最新のファイルに置き換え、`./deploy/b1 upgrade` を実行します。

## ソースからのビルド

開発者は、イメージを取得する代わりにローカルでビルドできます。

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

`.env` の `API_CONTEXT` と `B1APP_CONTEXT` で、ビルドの対象をローカルのチェックアウト（例: `../Api`）または Git の参照（ref）に指定できます。

## トラブルシューティング

| 症状 | 考えられる原因 | 対処法 |
|------|---------------|--------|
| `api` コンテナが再起動を繰り返す | マイグレーションの失敗、またはデータベースのパスワードの誤り | `./deploy/b1 logs api` を実行します。マイグレーションのログに、失敗したモジュールが表示されます |
| `api` のログに「ENCRYPTION_KEY must be exactly 32 characters」と表示される | `.env` のキーが手動で編集されたか、切り詰められている | 元の 32 文字のキーを復元します（認証情報がまだ保存されていない場合にのみ、新しいキーを生成してください） |
| ブラウザーに証明書の警告が表示される | DNS がまだこのマシンを指していない、またはポート 80/443 がブロックされている | DNS またはファイアウォールを修正してください。Caddy は自動で再試行します |
| `/` にウェブサイトではなくダッシュボードが表示される | 教会がまだ作成されていない、または `DEFAULT_CHURCH_SLUG` が一致しない | 教会を作成するか、**Settings → Church** でスラッグを設定します |
| 「Check your email」と表示されるが、メールが届かない | `MAIL_SYSTEM=SMTP` の認証情報が正しくない | 認証情報を修正するか、`MAIL_SYSTEM` の設定を解除してメールを無効にします |
| モバイル Web アプリに、プッシュ通知が有効になっていないと表示される | サーバーに VAPID キーが設定されていない | [プッシュ通知](#push-notifications) の手順に従ってキーを追加します |
| チャットやライブ機能が動作しない | 前段の別のプロキシが websocket をブロックしている | ソケットは同じポートの `/api/` 上にあります。`Upgrade` ヘッダーを許可してください |
| `install` が「database volume already exists」と表示して拒否される | 以前のインストールの残り | `docker compose down -v` で削除するか、`.env` を作成して `upgrade` を使用します |

それでも解決しない場合は、`./deploy/b1 logs` の出力を添えて、[github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) で Issue を作成してください。

## 関連記事

- **[Railway でのセルフホスティング](./railway-template.md)**: マネージドホスティングの代替手段と、デプロイ後の共通設定ガイド
- **[初期設定](../../getting-started/initial-setup.md)**: 教会の作成後に最初に行う手順
- **[ローカル API のセットアップ](../api/local-setup.md)**: 開発用にスタックを直接実行する方法
