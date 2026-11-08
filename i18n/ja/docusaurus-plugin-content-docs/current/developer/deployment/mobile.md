---
title: "モバイルアプリのデプロイ"
description: "B1 Checkin などの Expo アプリの Android および iOS リリースをビルドし、ストアに提出して、EAS で OTA アップデートを配信する手順を説明します。"
---

# モバイルアプリのデプロイ

<div class="article-intro">

B1 Checkin などの ChurchApps の Expo モバイルアプリは、**Expo EAS Build** またはローカルの Gradle ビルドでビルドし、アプリストアを通じて配布します。このページでは、B1 Checkin を例に、Android と iOS の両方についてビルド、提出、OTA（Over-the-Air）アップデートの配信方法を説明します。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- アプリをローカルにセットアップします -- [モバイルアプリ](../mobile/index.md#local-setup)を参照してください
- [EAS CLI](https://docs.expo.dev/eas/) をインストールして設定します
- Google Play Console（Android）および/または Apple App Store Connect（iOS）へのアクセス権を用意します

</div>

## ビルド

### Android

Android のリリースビルドはローカルで実行され、EAS から取得したリリース用キーストアで署名されます。最初に一度だけ `npx eas-cli credentials -p android` を実行してダウンロードし（**credentials.json: Download credentials from EAS** を選択）、その後次のコマンドを実行します:

```bash
yarn build:android
```

Google Play 用のバンドルは `android/app/build/outputs/bundle/release/app-release.aab` に出力されます。代わりに EAS でビルドする場合は、`yarn build:android:eas` を実行します。

### iOS

iOS のビルドは常に EAS で実行されます:

```bash
yarn build:ios
```

## アプリストアへの提出

### Android -- Google Play ストア

AAB を Play Console からアップロードするか、EAS で提出します:

```bash
npx eas-cli submit -p android --path android/app/build/outputs/bundle/release/app-release.aab
```

### iOS -- Apple App Store

次のコマンドで、iOS のビルドを EAS から直接提出します:

```bash
eas submit --platform ios
```

## OTA アップデート

ストアの審査を必要としない JavaScript のみの変更には、OTA アップデートを使用します:

```bash
yarn update
```

これは EAS Update を使用して、ストアへの提出を経ずに変更をユーザーへ直接配信します。

:::tip
OTA アップデートはストアのビルドよりはるかに速く、変更は数日ではなく数分でユーザーに届きます。ネイティブコードの変更を伴わないバグ修正、文言の変更、軽微な UI の調整に使用してください。
:::

## バージョン番号

ストア向けのビルドを作成する前に、複数のファイルでバージョン番号を更新する必要があります:

- `package.json`
- `app.json`
- `android/app/build.gradle`（`versionName` と `versionCode`）

iOS のビルド番号は EAS が自動的に増分します。

:::warning
すべてのファイルでバージョン番号を更新し忘れると、ビルドの失敗やアプリストアでの審査落ちの原因になります。本番用のビルドを開始する前に、上記のファイルをすべて再確認してください。
:::

## 関連記事

- **[モバイルアプリ](../mobile/index.md)** -- ローカルのセットアップと開発ガイド
- **[API のデプロイ](./apis.md)** -- バックエンド API のデプロイ
- **[Web アプリのデプロイ](./web-apps.md)** -- フロントエンドの Web アプリケーションのデプロイ
