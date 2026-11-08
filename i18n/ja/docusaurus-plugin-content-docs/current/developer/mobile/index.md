---
title: "モバイルアプリ"
description: "ChurchAppsのExpoおよびReact NativeモバイルアプリであるB1 CheckinとLessonsScreenの概要と、共通のExpoツールチェーンのローカルセットアップ手順。"
---

# モバイルアプリ

<div class="article-intro">

ChurchAppsのモバイルアプリは**React Native**と**Expo**で構築されており、Android、iOS、Android TVでネイティブな操作性を提供します。すべてのモバイルアプリは同じExpoベースのツールチェーンを共有しているため、1つのアプリをビルドできれば、他のアプリもビルドできます。

</div>

## アプリ

| アプリ | 用途 | プラットフォーム |
|-----|---------|----------|
| B1 Checkin | チェックインステーション用のキオスクアプリ | Android, iOS |
| LessonsScreen | 教室でレッスンを表示するためのAndroid TVアプリ | Android TV |

:::info
メンバー向けのアプリはB1 Appです。B1Appの`/mobile`セクションにあたり、メンバーはプログレッシブウェブアプリ（PWA）としてインストールします。これはExpoプロジェクトではなくWebアプリです。ローカルで実行する方法については、[Webアプリ](../web-apps/index.md)を参照してください。
:::

### B1 Checkin

教会のチェックインステーション向けに作られた専用のキオスクアプリケーションです。メンバーが子どもをチェックインさせたり、礼拝やイベントの出席を記録したりするための、シンプルでタッチ操作に適したインターフェースを提供します。

### LessonsScreen

教室でレッスンコンテンツを表示するAndroid TVアプリケーションです。教師はレッスンのスライド、動画、アクティビティをTV画面に送ることができ、授業中にカリキュラムの教材を簡単に提示できます。

## ローカルセットアップ

すべてのモバイルアプリは同じExpoベースのツールチェーンを共有しており、同様のセットアップ手順に従います。ここではB1 Checkinを例に説明します。

1. **Node.js**、Androidエミュレーター用のAndroid Studio、iOSシミュレーター用のXcode（macOSのみ）をインストールします。詳しくは[前提条件](../setup/prerequisites.md)を参照してください。
2. リポジトリをクローンし、依存関係をインストールします（B1 CheckinはYarnを使用します）。

   ```bash
   git clone https://github.com/ChurchApps/B1Checkin.git
   cd B1Checkin && yarn install
   ```

3. `dotenv.sample.txt`を`.env`にコピーし、アプリが接続する先のステージを設定します（ローカルAPIの場合は`dev`）。詳しくは[環境変数](../setup/environment-variables.md#b1checkin-react-native--expo)を参照してください。
4. `yarn start`でExpoの開発サーバーを起動し、続けて`yarn android`または`yarn ios`を実行して、エミュレーターまたはデバイスでアプリを起動します。

リリース用のビルドとOTA（無線）アップデートについては、[モバイルアプリのデプロイ](../deployment/mobile.md)を参照してください。
