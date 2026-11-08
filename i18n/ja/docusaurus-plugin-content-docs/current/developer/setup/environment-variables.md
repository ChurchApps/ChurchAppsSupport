---
title: "環境変数"
description: "ChurchAppsプロジェクトの.envファイルを設定し、共有デモAPIまたはローカルAPIを選択して、B1 Admin、B1.church、B1 Checkinなどの変数を入力する方法。"
---

# 環境変数

<div class="article-intro">

すべてのChurchAppsプロジェクトは、ローカル設定に`.env`ファイルを使用します。各プロジェクトにはサンプルファイルが含まれており、それをコピーして編集します。このページでは、API、Webアプリ、モバイルアプリの環境変数について説明します。デモAPIとローカルAPIのどちらを使うかの選び方も含まれています。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- 作業したいプロジェクトの[前提条件](./prerequisites.md)をインストールする
- 作業したいプロジェクトのリポジトリをクローンする
- [プロジェクト概要](./project-overview.md)を確認し、プロジェクトに必要なAPIモジュールを把握する

</div>

## 基本的な手順

1. プロジェクトのルートにある`dotenv.sample.txt`または`.env.sample`を探します。
2. それを`.env`としてコピーします。
3. 必要に応じて値を編集します。

```bash
# .env.sample があるプロジェクトの例
cp .env.sample .env

# dotenv.sample.txt があるプロジェクトの例
cp dotenv.sample.txt .env
```

:::warning
**`.env`ファイルをバージョン管理にコミットしないでください。** データベースの認証情報、APIキー、JWTシークレットなどの機密情報が含まれています。すべてのChurchAppsプロジェクトでは`.env`が`.gitignore`に登録されていますが、コミット前には必ず確認してください。
:::

## APIの接続先を選ぶ

最も重要な決定は、フロントエンドがAPIを呼び出す先です。選択肢は2つあります。

### 選択肢1: デモAPI（フロントエンド開発に推奨）

共有デモ環境を使用します。ローカルのAPIやデータベースの設定は不要です。`main`の最新コードで動作し、サンプルデータは毎晩再投入されます。

```bash
# ベースURLの形式
https://api.demo.churchapps.org/{module}

# モジュールのURL例
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
ステージング環境（`api.staging.churchapps.org`、`api.staging.lessons.church`、および関連するホスト）は廃止されました。一部のサンプル`.env`ファイルにはステージングのURLが残っている場合があります。その場合は、このページに記載されているデモまたはローカルの値に置き換えてください。共有の非本番Lessons APIはもうありません。必要な場合は、[LessonsApi](https://github.com/ChurchApps/LessonsApi)をローカルで実行してください（ポート`8090`で待ち受けます）。
:::

### 選択肢2: ローカルAPI

Apiプロジェクトを自分のマシンで実行します。MySQL 8.0以上が必要で、各モジュール用のデータベースを作成しておく必要があります。手順については[APIのローカルセットアップ](../api/local-setup.md)ガイドを参照してください。

```bash
# ベースURLの形式
http://localhost:8084/{module}

# モジュールのURL例
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## APIの環境変数

コアとなる**Api**プロジェクト（`.env.sample`）が最も多くの設定を持ちます。主な変数は以下のとおりです。

### 共通設定

| 変数 | 説明 | 例 |
|----------|-------------|---------|
| `ENVIRONMENT` | 実行環境 | `dev` |
| `SERVER_PORT` | ローカル開発サーバーのHTTPポート | `8084` |
| `ENCRYPTION_KEY` | 機密データ用の192ビット暗号化キー | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | JSON Web Tokenの署名に使用するシークレット | `jwt-secret-dev` |
| `FILE_STORE` | アップロードされたファイルの保存先（`disk`または`s3`） | `disk` |
| `CORS_ORIGIN` | 許可するCORSオリジン（ローカル開発では`*`） | `*` |

### データベース接続

1つのベースURLで、APIがMySQLに接続先を指定します。APIは、このベースから各モジュール用のデータベース（`/membership`、`/attendance`、`/content`、`/giving`、`/messaging`、`/doing`、`/reporting`）を自動的に決定します。

| 変数 | 例 |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
`root:password`はご自身のMySQLの認証情報に置き換えてください。APIを実行する前に、モジュールごとのデータベースがすべて存在している必要があります。すべてのモジュールのスキーマを作成するには`npm run initdb`を、単一のモジュールだけを作成するには`npm run initdb:membership`を使用します。
:::

### WebSocketの設定

| 変数 | 説明 | 例 |
|----------|-------------|---------|
| `SOCKET_PORT` | WebSocketサーバーのポート | `8087` |
| `SOCKET_URL` | クライアントが接続するWebSocketのURL | `ws://localhost:8087` |

---

## Webアプリの環境変数

### B1Admin（React + Vite）

サンプルファイル: `.env.sample`

| 変数 | 説明 | 例（デモ） |
|----------|-------------|----------------|
| `REACT_APP_STAGE` | 環境名 | `demo` |
| `PORT` | 開発サーバーのポート | `3101` |
| `REACT_APP_API_BASE` | すべてのChurchApps APIの単一ベースURL（`/membership`、`/attendance`、`/content`、`/giving`、`/messaging`、`/doing`、`/reporting`は自動的に追加されます） | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | コンテンツ配信のURL | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google AnalyticsのID（任意） | `UA-123456789-1` |

ローカルAPIで開発する場合は、ベースURLをローカルのスタックに向けます。

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App（Next.js）

サンプルファイル: `.env.sample`

| 変数 | 説明 | 例（デモ） |
|----------|-------------|----------------|
| `NEXT_PUBLIC_API_BASE` | すべてのChurchApps APIの単一ベースURL（`/membership`、`/attendance`、`/content`、`/giving`、`/messaging`、`/doing`、`/reporting`は自動的に追加されます） | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | コンテンツ配信のURL | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google AnalyticsのID（任意） | `UA-123456789-1` |

:::info
Next.jsでは、ブラウザで利用できる必要がある環境変数には`NEXT_PUBLIC_`プレフィックスが必要です。サーバー側でのみ使う変数にはこのプレフィックスは不要です。
:::

### LessonsApp（Next.js）

サンプルファイル: `dotenv.sample.txt`

| 変数 | 説明 | 例（ローカルのLessonsApi） |
|----------|-------------|----------------------------|
| `STAGE` | 環境のステージ（ローカル開発では未設定または`dev`のままにします） | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | Lessons APIのURL | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | コンテンツ配信のURL | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | サインインに使用するChurchApps APIのベース（`STAGE`が未設定または`dev`の場合にのみ有効） | `https://api.demo.churchapps.org` |

---

## モバイルアプリの環境変数

### B1Checkin（React Native / Expo）

サンプルファイル: `dotenv.sample.txt`

| 変数 | 説明 | 例 |
|----------|-------------|---------|
| `EXPO_PUBLIC_STAGE` | アプリが接続するAPIセットを選択します。`dev`（ローカルAPI `http://127.0.0.1:8084`）、`staging`、または`prod`（未設定時のデフォルト）です | `dev` |

B1Checkinが使用するAPIモジュールは、MembershipとAttendanceのみです。これに加えてコンテンツ配信のURLを使用します。各ステージのアドレスは`src/helpers/EnvironmentHelper.ts`で設定されています。

:::info
Expoがアプリのバンドルに組み込むのは、`EXPO_PUBLIC_`プレフィックスが付いた変数のみです。`.env`を変更した後は、`yarn start --reset-cache`で開発サーバーを再起動してください。
:::

---

## クイックリファレンス: サンプルファイルの場所

| プロジェクト | サンプルファイル |
|---------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
