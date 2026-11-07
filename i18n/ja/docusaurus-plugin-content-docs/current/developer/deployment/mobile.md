---
title: "モバイルのデプロイ"
---

# モバイルのデプロイ

<div class="article-intro">

ChurchApps のモバイルアプリは **Expo EAS Build** を使ってビルドされ、アプリストア経由で配布されます。このページでは、Android と iOS の両方について、ビルド、提出、そして OTA（Over-the-Air）アップデートの配信方法を説明します。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- ローカルでモバイルアプリをセットアップする -- [B1 Mobile](../mobile/b1-mobile) を参照
- [EAS CLI](https://docs.expo.dev/eas/) をインストールして設定する
- Google Play Console（Android）および／または Apple App Store Connect（iOS）にアクセスできること

</div>

## ビルド

### Android

```bash
npm run build:android
```

### iOS

```bash
eas build --platform ios --profile production
```

## アプリストアへの提出

### Android -- Google Play ストア

EAS ビルドが成功すると、Android のバイナリ（AAB）が Play Console を通じて Google Play ストアに提出されます。

### iOS -- Apple App Store

iOS のビルドは EAS から直接提出します：

```bash
eas submit --platform ios
```

## OTA アップデート

ストアの審査を必要としない JavaScript のみの変更には、OTA（Over-the-Air）アップデートを使用します：

```bash
npm run update:production
```

これは EAS Update を使って、ストアへの完全な提出を行わずに変更をユーザーへ直接配信します。

:::tip
OTA アップデートはストアへのビルドより大幅に速く、変更は数日ではなく数分でユーザーに届きます。ネイティブコードの変更を含まないバグ修正、文言の変更、軽微な UI の調整に使用してください。
:::

## バージョン番号

ストア向けのビルドを作成する前に、複数のファイルでバージョン番号を更新する必要があります：

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/*/Info.plist`
- `ios/*/project.pbxproj`

:::warning
上記のすべてのファイルでバージョン番号を更新し忘れると、ビルドの失敗やアプリストアでの審査リジェクトの原因になります。本番ビルドを開始する前に、上記のファイルを一つずつ必ず確認してください。
:::

## 関連記事

- **[B1 Mobile](../mobile/b1-mobile)** -- ローカルでのセットアップと開発ガイド
- **[API のデプロイ](./apis)** -- バックエンド API のデプロイ
- **[Web アプリのデプロイ](./web-apps)** -- フロントエンドの Web アプリケーションのデプロイ
