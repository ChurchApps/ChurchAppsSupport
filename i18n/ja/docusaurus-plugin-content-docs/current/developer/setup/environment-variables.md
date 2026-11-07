---
title: "環境変数"
description: "ChurchApps プロジェクト用の .env ファイルを設定します。共有デモ API とローカル API のどちらを使うかを選び、B1 Admin、B1.church、B1 Mobile、Lessons.church などの変数を入力する方法を説明します。"
---

# 環境変数

<div class="article-intro">

すべての ChurchApps プロジェクトでは、ローカル構成に `.env` ファイルを使用します。各プロジェクトにはサンプルファイルが含まれており、それをコピーしてカスタマイズします。このページでは、API、Web アプリ、モバイルアプリの環境変数について説明します。デモ API とローカル API のどちらを使うかの選び方も含まれています。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- プロジェクトの[前提条件](./prerequisites.md)をインストールする
- 作業したいプロジェクトのリポジトリをクローンする
- [プロジェクト概要](./project-overview.md)を確認して、プロジェクトに必要な API モジュールを把握する

</div>

## 一般的なパターン

1. プロジェクトのルートにある `dotenv.sample.txt` または `.env.sample` を探します。
2. それを `.env` にコピーします。
3. 必要に応じて値を編集します。

```bash
# .env.sample があるプロジェクトの例
cp .env.sample .env

# dotenv.sample.txt があるプロジェクトの例
cp dotenv.sample.txt .env
```

:::warning
**`.env` ファイルをバージョン管理にコミットしないでください。** データベースの認証情報、API キー、JWT シークレットなどの機密情報が含まれています。ChurchApps のすべてのプロジェクトでは `.env` が `.gitignore` に登録されていますが、コミットする前に必ず再確認してください。
:::

## API の接続先の選択

最も重要な判断は、フロントエンドが API 呼び出しの接続先をどこにするかです。選択肢は 2 つあります。

### オプション 1：デモ API（フロントエンド開発に推奨）

共有のデモ環境を使用します。ローカルの API やデータベースのセットアップは不要です。`main` の最新コードで動作し、サンプルデータは毎晩再投入されます。

```bash
# ベース URL のパターン
https://api.demo.churchapps.org/{module}

# モジュール URL の例
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
ステージング環境（`api.staging.churchapps.org`、`api.staging.lessons.church` などの関連ホスト）は廃止されました。一部のサンプル `.env` ファイルにはまだステージングの URL が残っている場合があります。その場合は、このページに記載されているデモまたはローカルの値に置き換えてください。本番以外で共有される Lessons API はありません。必要な場合は、[LessonsApi](https://github.com/ChurchApps/LessonsApi) をローカルで実行してください（ポート `8090` で待ち受けます）。
:::

### オプション 2：ローカル API

Api プロジェクトを自分のマシンで実行します。MySQL 8.0 以降が必要で、各モジュール用のデータベースを作成しておく必要があります。詳しくは [APIのローカルセットアップ](../api/local-setup.md) のガイドを参照してください。

```bash
# ベース URL のパターン
http://localhost:8084/{module}

# モジュール URL の例
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## API の環境変数

中核となる **Api** プロジェクト（`.env.sample`）には最も多くの設定項目があります。主な変数は次のとおりです。

### 共通設定

| 変数 | 説明 | 例 |
|----------|-------------|---------|
| `ENVIRONMENT` | 実行環境 | `dev` |
| `SERVER_PORT` | ローカル開発サーバーの HTTP ポート | `8084` |
| `ENCRYPTION_KEY` | 機密データ用の 192 ビット暗号化キー | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | JSON Web Token の署名に使うシークレット | `jwt-secret-dev` |
| `FILE_STORE` | アップロードされたファイルの保存先（`disk` または `s3`） | `disk` |
| `CORS_ORIGIN` | 許可する CORS のオリジン（ローカル開発では `*`） | `*` |

### データベース接続

単一のベース URL で API を MySQL に接続します。API は、このベースから各モジュール（`/membership`、`/attendance`、`/content`、`/giving`、`/messaging`、`/doing`、`/reporting`）ごとのデータベースを自動的に決定します。

| 変数 | 例 |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
`root:password` は、実際の MySQL の認証情報に置き換えてください。API を実行する前に、各モジュールのデータベースが存在している必要があります。すべてのモジュールのスキーマを作成するには `npm run initdb` を、単一のモジュールだけなら `npm run initdb:membership` を使用します。
:::

### WebSocket の設定

| 変数 | 説明 | 例 |
|----------|-------------|---------|
| `SOCKET_PORT` | WebSocket サーバーのポート | `8087` |
| `SOCKET_URL` | クライアントが接続する WebSocket の URL | `ws://localhost:8087` |

---

## Web アプリの環境変数

### B1Admin（React + Vite）

サンプルファイル：`.env.sample`

| 変数 | 説明 | 例（デモ） |
|----------|-------------|----------------|
| `REACT_APP_STAGE` | 環境名 | `demo` |
| `PORT` | 開発サーバーのポート | `3101` |
| `REACT_APP_API_BASE` | すべての ChurchApps API に共通の単一ベース URL（`/membership`、`/attendance`、`/content`、`/giving`、`/messaging`、`/doing`、`/reporting` は自動的に追加されます） | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | コンテンツ配信の URL | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google アナリティクスの ID（任意） | `UA-123456789-1` |

ローカル API で開発する場合は、ベース URL をローカルのスタックに向けます。

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App（Next.js）

サンプルファイル：`.env.sample`

| 変数 | 説明 | 例（デモ） |
|----------|-------------|----------------|
| `NEXT_PUBLIC_API_BASE` | すべての ChurchApps API に共通の単一ベース URL（`/membership`、`/attendance`、`/content`、`/giving`、`/messaging`、`/doing`、`/reporting` は自動的に追加されます） | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | コンテンツ配信の URL | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google アナリティクスの ID（任意） | `UA-123456789-1` |

:::info
Next.js では、ブラウザで利用できる必要がある環境変数には `NEXT_PUBLIC_` の接頭辞が必要です。サーバー側のみで使う変数には、この接頭辞は不要です。
:::

### LessonsApp（Next.js）

サンプルファイル：`dotenv.sample.txt`

| 変数 | 説明 | 例（ローカル LessonsApi） |
|----------|-------------|----------------------------|
| `STAGE` | 環境のステージ（ローカル開発では未設定のままか `dev` にします） | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | Lessons API の URL | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | コンテンツ配信の URL | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | サインインに使う ChurchApps API のベース（`STAGE` が未設定または `dev` の場合のみ有効） | `https://api.demo.churchapps.org` |

---

## モバイルアプリの環境変数

### B1Mobile（React Native / Expo）

サンプルファイル：`dotenv.sample.txt`

| 変数 | 説明 | 例（デモ） |
|----------|-------------|----------------|
| `STAGE` | 環境名 | `dev` |
| `MEMBERSHIP_API`、`ATTENDANCE_API`、`GIVING_API`、`DOING_API`、`MESSAGING_API`、`CONTENT_API` | ChurchApps の API モジュールごとの URL（未設定の場合は本番環境が使われます） | `https://api.demo.churchapps.org/membership` |
| `LESSONS_API` | Lessons API（別ホスト。本番以外で共有されるものはありません） | `https://api.lessons.church` |
| `CONTENT_ROOT` | コンテンツ配信の URL | `https://democontent.churchapps.org` |
| `LESSONS_ROOT` | Lessons サイトの URL | `https://lessons.church` |

:::info
モバイルアプリでは `REACT_APP_` や `NEXT_PUBLIC_` の接頭辞は使用しません。環境変数へのアクセスは Expo の設定によって処理されます。
:::

---

## クイックリファレンス：サンプルファイルの場所

| プロジェクト | サンプルファイル |
|---------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
