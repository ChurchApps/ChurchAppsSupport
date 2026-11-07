---
title: "Railway でのセルフホスティング"
description: "Railway にプライベートな ChurchApps インスタンスを約 15 分でデプロイし、メール、カスタムドメイン、複数教会のルーティング、寄付、ファイルストレージを B1 Admin と B1App で設定します。"
---

# Railway でのセルフホスティング

<div class="article-intro">

ChurchApps では、ワンクリックで導入できる [Railway](https://railway.com) テンプレートを公開しています。これを使うと、教会専用のプライベートなインスタンスとして、B1 Admin、B1 の会員向けポータル、API、MySQL データベースが一式そろった環境を立ち上げられます。すべてご自身が所有・契約するインフラ上で動作します。このガイドでは、約 15 分で稼働させるまでの手順と、多くの教会が導入後に行いたいと考える初期設定を説明します。

</div>

## クイックスタート

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. 上の **Deploy on Railway** ボタンをクリックします。
2. Railway にサインインします（アカウントをお持ちでない場合は、無料で作成できます）。その後、支払い方法を登録します。
3. 何も変更せずに **Deploy** をクリックします。すべての変数には適切な初期値が設定されています。
4. 4 つのサービスがすべて緑色になるまで、5〜10 分ほど待ちます。
5. **B1Admin** サービスの URL を開き、**Register** をクリックしてアカウントを作成します。最初に作成されたアカウントは、自動的にサーバー管理者になります。
6. アプリ内の案内に従って、最初の教会を作成します。

以上で完了です。ChurchApps の環境がすべて使える状態になりました。以下の内容は、必要に応じて行う追加の設定です。

:::tip
このデプロイは現在 **ベータ版** です。ドキュメントに記載のない問題が発生した場合は、デプロイのログを添えて [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) に Issue を作成してください。
:::

<div class="prereqs">
<h4>必要なもの</h4>

- 無料の [Railway](https://railway.com) アカウント
- Railway に登録されたクレジットカード（小規模な教会の場合、月額約 $15〜25。[費用](#costs) を参照）
- 初回デプロイにかかる約 15 分
- *任意ですが、後で設定することを強くおすすめします:* SMTP の認証情報とカスタムドメイン

</div>

## デプロイされるもの

このテンプレートは、1 つの Railway プロジェクト内に 4 つのサービスを作成します。

| サービス | 用途 | デプロイ後の URL |
|---------|------|------------------|
| **MySQL** | すべてのデータを保存します（1 つのインスタンスに複数のスキーマ）。 | 内部のみ |
| **Api** | 会員、コンテンツ、献金、出席などを処理するバックエンドです。 | `https://api-<id>.up.railway.app` |
| **B1Admin** | スタッフ・管理者向けの Web アプリです。 | `https://b1admin-<id>.up.railway.app` |
| **B1App** | 会員向けの Web アプリと教会のウェブサイトです。 | `https://b1app-<id>.up.railway.app` |

データベースのスキーマは、初回起動時に API の起動時マイグレーションによって自動的に作成されます。

## 初回の設定

環境が稼働したら、多くの教会が次に行う設定を、優先度の高い順に紹介します。

### 1. メール（強く推奨）

メールを設定しなくても、会員は登録してシステムを利用できます。ただし、**パスワードを自分で再設定することはできません**。管理者が代わりに対応する必要があります。SMTP の設定には約 5 分かかります。

Railway のダッシュボードで **Api** サービス → **Variables** を開き、次の内容を追加します。

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<your provider host>
SMTP_USER=<your username>
SMTP_PASS=<your password or API key>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

ご利用を検討できるプロバイダーは 3 つあります。

#### Resend — 最もシンプルな無料プラン（1 日 100 通）

1. [resend.com](https://resend.com) でアカウントを作成します。
2. 送信元ドメインを認証します（まずは `onboarding@resend.dev` というテスト用の送信元を使うこともできます）。
3. API キーを作成します。
4. `SMTP_HOST=smtp.resend.com`、`SMTP_USER=resend`、`SMTP_PASS=re_xxxxxxxxx` を設定します。

#### Gmail — 個人利用は無料（1 日約 500 通）

1. Google アカウントで 2 段階認証を有効にします。
2. [アプリパスワード](https://myaccount.google.com/apppasswords) を作成します。
3. `SMTP_HOST=smtp.gmail.com`、`SMTP_USER=your-address@gmail.com`、`SMTP_PASS=<16 文字のアプリパスワード>` を設定します。

#### AWS SES — 大規模な送信に最も安価

1. AWS で送信元ドメインを認証します。
2. 認証されていないアドレスにも送信する場合は、SES のサンドボックスから移行します。
3. **SES → SMTP Settings → Create credentials** で SMTP の認証情報を作成します。
4. `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`、`SMTP_USER=AKIA...`、`SMTP_PASS=<SES の SMTP パスワード>` を設定します。

変数を保存すると、Api サービスは自動的に再デプロイされます。テスト用のアカウントでパスワードの再設定を実行して、動作を確認してください。

:::warning
認証情報が誤ったまま `MAIL_SYSTEM=SMTP` を設定すると、登録は成功したように見えますが、確認メールは届きません。認証情報を修正するか、`MAIL_SYSTEM` の設定を解除してメール送信なしのモードに戻してください。
:::

### 2. カスタムドメイン

既定の `*.up.railway.app` の URL でも利用できますが、多くの教会は独自のドメインを使いたいと考えます。

Web サービスそれぞれ（B1Admin と B1App）について、次の手順を行います。

1. Railway でサービスを開き、**Settings** → **Networking** を選択します。
2. **+ Custom Domain** をクリックし、ホスト名を入力します。
   - B1Admin: `admin.yourchurch.org`
   - B1App: `app.yourchurch.org`（または `www`）
3. Railway が表示する CNAME レコードを、DNS プロバイダーに追加します。
4. DNS が反映されるまで数分待ちます。Railway が TLS 証明書を自動的に発行します。

続いて、メール内のリンクが新しいドメインを使うように、**Api** サービスの変数を更新します。

```
B1ADMIN_ROOT=https://admin.yourchurch.org
```

さらに **B1Admin** サービスで、次の変数を設定します。

```
REACT_APP_API_BASE=https://api.yourchurch.org   (独自の API ドメインも設定する場合)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org
```

`{subdomain}` の部分はそのまま記述してください。実行時に、各教会のサブドメインに置き換えられます（後述の「マルチサイト」を参照）。

### 3. マルチサイト（1 つのインスタンスに複数の教会）

ChurchApps は、設計上マルチテナントです。1 つのデプロイで任意の数の教会をホストでき、各教会は独自の会員、グループ、ウェブサイトを持てます。新しい教会の追加はすべて管理画面から行えます。インフラの変更は必要ありません。

#### 教会を追加する

1. **B1 Admin** で **Settings → Manage Church → Switch Church → Create New** に移動します。
2. 各教会には固有の **サブドメイン用のスラッグ**（例: `firstchurch`、`gracecommunity`）があります。
3. 新しい教会には、独自のデータ、会員、ウェブサイト、献金の設定が与えられます。同じインスタンス上の他の教会とは完全に分離されます。

#### 各教会に公開 URL を割り当てる

教会を公開する方法は 2 つあります。

| 方式 | 例 | 設定 |
|------|----|------|
| **パスベース**（追加設定なしで利用可能） | `app.yourchurch.org/firstchurch` | 追加の設定は不要 |
| **サブドメインベース**（よりすっきりした URL） | `firstchurch.yourchurch.org` | ワイルドカード DNS とワイルドカードのカスタムドメインが必要 |

Railway でサブドメインベースのルーティングを行う場合は、次のように設定します。

1. DNS プロバイダーで、ワイルドカードの CNAME を作成します: `*.yourchurch.org → <b1app の Railway ターゲット>`。
2. Railway で B1App サービス → **Settings → Networking** を開き、`*.yourchurch.org` をカスタムドメインとして追加します。
3. **B1Admin** サービスで `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org` を設定します。

再デプロイ後、各教会のサイトは自動的に `<サブドメイン>.yourchurch.org` で公開されます。

:::info
ワイルドカードのカスタムドメインには、有料の Railway プランが必要です。パスベースのルーティングはすべてのプランで利用でき、機能は同じです。URL バーの見た目が少し劣るだけです。
:::

### 4. オンライン献金（Stripe / PayPal）

献金の設定は環境変数ではなく、**管理画面で教会ごとに行います**。これにより、各教会が独自の加盟店アカウントを利用できます。

1. [Stripe](https://dashboard.stripe.com/)（Developers → API keys）または [PayPal](https://developer.paypal.com/)（My Apps & Credentials）で、開発者向けの認証情報を取得します。
2. B1 Admin で **Settings → Giving Settings** を開きます。
3. プロバイダーを選択し、公開キーと秘密キーを貼り付けて、手数料の扱いを設定します。
4. 任意で、公開された寄付フォームをボットから保護するために、Railway の **Api** サービスに `GOOGLE_RECAPTCHA_SECRET_KEY` を追加します。

### 5. ファイルストレージ

このテンプレートは、会員の写真、説教の資料、アップロードされた文書を保存するために、**1 GB の永続ボリューム**を用意し、Api サービスにマウントします。

容量を増やすには、Api サービス → **Volumes** を開き、サイズのスライダーを調整します。

大規模な運用（100 GB 以上、または同時アップロードが多い場合）では、**Api** サービスで次の変数を設定して S3 に切り替えます。

```
FILE_STORE=S3
AWS_S3_BUCKET=<your-bucket>
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_REGION=us-east-2
```

ボリューム内の既存ファイルは自動では移行されません。変数を切り替える前に、バケットへ手動でコピーしてください。

### 6. 任意の機能連携

これらは特定の機能を有効にするもので、後から Railway のダッシュボードで追加できます。すべて **Api** サービスに設定します。

| 変数 | 有効になる機能 |
|------|----------------|
| `OPENAI_API_KEY` *または* `OPENROUTER_API_KEY` | AI を使った検索とコンテンツの提案 |
| `YOUTUBE_API_KEY` | YouTube の説教の検索と埋め込み |
| `PEXELS_KEY` | ウェブサイトビルダーのストック画像選択 |
| `VIMEO_TOKEN` | Vimeo の説教のサポート |
| `API_BIBLE_KEY` | レッスンやコンテンツ内の聖書の節の検索 |
| `YOUVERSION_API_KEY` | YouVersion 聖書との連携 |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | ブラウザのプッシュ通知（[VAPID キーペアを生成](./docker.md#push-notifications)） |
| `HUBSPOT_KEY` | 新規登録の CRM 連携（任意） |

## 更新

各サービスは、対応する GitHub リポジトリとリンクされています。`ChurchApps/Api`、`ChurchApps/B1Admin`、`ChurchApps/B1App` の `main` にプッシュすると、自動的に再デプロイされます。

特定のバージョンに固定するには、各サービスの **Branch** 設定をタグまたはリリースブランチに変更します。本番環境ではこの設定をおすすめします。`main` から自動デプロイすると、作業途中の変更も反映されてしまうためです。

## 費用

少人数の教会（会員 200 人未満、アクセスは少なめ）の場合の、実際の目安です。

| 項目 | 月額の目安 |
|------|-----------|
| Railway の基本料金 | $5 |
| MySQL プラグイン | $5 + ストレージ約 $1 |
| Web サービス 3 つの計算リソース | 合計 $3〜10 |
| 1 GB ボリューム | $0.25 |
| **合計** | **約 $15〜25/月** |

費用は、アクセス数、写真のアップロード量、データベースの大きさに比例して増えます。Railway では、プロジェクトの **Usage** タブで現在の利用状況を確認できます。費用の上限を設定するには、そこで利用制限を指定してください。

## トラブルシューティング

| 症状 | 考えられる原因 | 対処法 |
|------|----------------|--------|
| `EBUSY: rmdir '/app/node_modules/.cache'` でビルドが失敗する | Nixpacks のキャッシュマウントの競合 | 該当サービスで `NIXPACKS_NO_CACHE=true` を設定する |
| B1Admin のビルドが `Missing: @types/...` で失敗する | `package-lock.json` が同期されていない | 最新の `main` を取得する |
| Api のデプロイが "Deploying" で止まる | ヘルスチェックの失敗。`/health` が 200 を返さない | デプロイのログを確認する。多くの場合、必須の環境変数が不足している |
| B1Admin に「メールを確認してください」と表示されるが、メールが届かない | `MAIL_SYSTEM=SMTP` は設定されているが、認証情報が不足または誤っている | 認証情報を修正するか、`MAIL_SYSTEM` の設定を解除してメールを無効にする |
| ログインすると `api.churchapps.org` にリダイレクトされる | `REACT_APP_STAGE` が `prod` になっている | B1Admin サービスで `REACT_APP_STAGE=custom` を設定する |
| サブドメインの教会すべてに同じ内容が表示される | `REACT_APP_B1_WEBSITE_URL` に `{subdomain}` トークンが含まれていない | 例: `https://{subdomain}.yourchurch.org` を設定する |
| カスタムドメインで "Application not found" と表示される | DNS がまだ反映されていないか、Railway の証明書の発行が保留中 | 5 分ほど待つ。`dig admin.yourchurch.org` で DNS を確認する |

この一覧にない問題が発生した場合は、デプロイのログを添えて [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) に Issue を作成してください。

## 関連記事

- **[Docker でのセルフホスティング](./docker.md)**：同じ構成を、ご自身のハードウェアや VPS 上で動かす方法
- **[初期設定](../../getting-started/initial-setup.md)**：教会を作成した後の最初の手順
- **[ウェブサイトの初期設定](../../b1-admin/website/initial-setup.md)**：教会の公開サイトを設定する
- **[献金の設定](../../b1-admin/donations/online-giving-setup.md)**：Stripe または PayPal を接続する
- **[ローカルの API セットアップ](../api/local-setup.md)**：開発用にスタックをローカルで動かす
- **[API のデプロイ（AWS）](./apis.md)**：公式の ChurchApps SaaS がどのようにデプロイされているか
