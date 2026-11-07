---
title: "LessonsApp"
description: "Node.js 22 以降で LessonsApp の Next.js レッスンエディターをローカルに設定し、ローカルの LessonsApi に接続します。ビルドと S3/CloudFront へのデプロイも説明します。"
---

# LessonsApp

<div class="article-intro">

LessonsApp は [Lessons.church](https://lessons.church) のレッスンコンテンツ管理アプリケーションです。教会のレッスンカリキュラムを作成、整理、公開するためのインターフェースを提供し、Next.js と React で構築されています。

</div>

<div class="prereqs">
<h4>はじめに</h4>

- **Node.js 22以降**と**Git**をインストールします。詳しくは [前提条件](../setup/prerequisites.md) を参照してください
- API の接続先（ローカルの LessonsApi）を設定します。詳しくは [環境変数](../setup/environment-variables.md) を参照してください

</div>

:::warning
LessonsApp には Node.js 22 以降が必要です。それより古いバージョンはサポートされていません。
:::

## セットアップ

### 1. リポジトリをクローンする

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. 依存関係をインストールする

```bash
cd LessonsApp
npm install
```

### 3. 環境変数を設定する

環境変数のサンプルファイルを `.env` にコピーし、API のエンドポイントを設定します。

```bash
cp dotenv.sample.txt .env
```

API エンドポイントの URL を、ローカルの LessonsApi インスタンス（`http://localhost:8090`）を指すように更新します。ステージング環境の Lessons API は廃止されました。サンプルファイルに残っている `api.staging.lessons.church` の URL は置き換えてください。

### 4. 開発サーバーを起動する

```bash
npm run dev
```

Next.js の開発サーバーが [http://localhost:3501](http://localhost:3501) で起動します。

## 主なコマンド

| コマンド | 説明 |
|---------|-------------|
| `npm run dev` | ポート 3501 で Next.js の開発サーバーを起動します |
| `npm run build` | Next.js で本番用ビルドを行います |

## 技術スタック

- TypeScript を使用した **Next.js 16**
- UI コンポーネント用の **React 19**
- 共有コンポーネント用の **`@churchapps/apphelper*`** パッケージ

:::info
LessonsApp は、メインの ChurchApps Api とは別の API である **LessonsApi** バックエンドと通信します。環境に正しい Lessons API のエンドポイントが設定されていることを確認してください。
:::

## デプロイ

本番用ビルドは **S3 + CloudFront** にデプロイされます。

1. `npm run build` で最適化された Next.js のビルドを生成します
2. ビルドの出力を S3 バケットに同期します
3. CloudFront のキャッシュを無効化し、新しいバージョンが配信されるようにします

:::tip
デプロイの詳しい手順は、[Web アプリのデプロイ](../deployment/web-apps.md) ガイドを参照してください。
:::
