---
title: "B1 Mobile"
description: "B1 Mobile の React Native/Expo アプリをローカルで設定・実行し、API エンドポイントを構成して、Android または iOS 向けにビルドする手順。B1 Mobile は非推奨です。"
---

# B1 Mobile

<div class="article-intro">

B1 Mobileは、ChurchAppsの会員向けメインモバイルアプリです。React NativeとExpoで構築されています。教会の会員は、ディレクトリの閲覧、献金へのアクセス、出席の確認、通知の受信、教会コミュニティとのやり取りができます。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- **Node.js**と**Expo CLI**をインストールします -- [前提条件](../setup/prerequisites.md)を参照してください
- **Android Studio**(Androidエミュレーター用)または**Xcode**(iOSシミュレーター用)をインストールします
- APIの接続先(デモまたはローカル)を設定します -- [環境変数](../setup/environment-variables.md)を参照してください

</div>

## セットアップ

1. リポジトリをクローンします:

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. 依存関係をインストールします:

   ```bash
   cd B1Mobile && npm install
   ```

3. 環境変数を設定します -- サンプルファイルをコピーして、APIエンドポイントを更新します:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Expoの開発サーバーを起動します:

   ```bash
   npm start
   ```

:::tip
Android StudioやXcodeを設定しなくても、実機にインストールした**Expo Go**アプリを使えば、すぐにテストできます。
:::

## 環境変数

| 変数 | 説明 |
|----------|-------------|
| `STAGE` | 環境のステージ(例: `dev`、`staging`、`prod`) |
| `CONTENT_ROOT` | コンテンツ配信のルートURL |
| `MEMBERSHIP_API` | メンバーシップAPIのエンドポイント |
| `MESSAGING_API` | メッセージングAPIのエンドポイント |
| `ATTENDANCE_API` | 出席APIのエンドポイント |
| `GIVING_API` | 献金APIのエンドポイント |
| `DOING_API` | Doing APIのエンドポイント |
| `CONTENT_API` | コンテンツAPIのエンドポイント |
| `LESSONS_ROOT` | レッスンコンテンツのルートURL |

## 主なコマンド

| コマンド | 説明 |
|---------|-------------|
| `npm start` | Expoの開発サーバーを起動 |
| `npm run android` | Androidエミュレーターで実行 |
| `npm run ios` | iOSシミュレーターで実行 |
| `npm run test` | テストを実行(Jest) |

## 本番ビルド

本番ビルドを作成する前に、以下のすべてのファイルのバージョン番号を更新してください:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

これにより、EAS BuildでAndroid用のバイナリが作成されます。

### iOS

```bash
eas build --platform ios --profile production
```

### OTAアップデート

ストアの審査を経ずに、無線(OTA)アップデートを配信するには:

```bash
npm run update:production
```

:::info
OTAアップデートは、JavaScriptのみの変更に最適です。ネイティブコードや依存関係を変更した場合は、代わりにストア向けの完全なビルドを提出する必要があります。
:::

## 関連記事

- **[モバイルのデプロイ](../deployment/mobile.md)** -- モバイルアプリのビルド、提出、デプロイに関する完全ガイド
- **[環境変数](../setup/environment-variables.md)** -- モバイル環境設定の完全なリファレンス
