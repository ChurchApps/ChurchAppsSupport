---
title: "ApiHelper"
description: "Packages ワークスペース内のすべての ChurchApps Express API が使う @churchapps/apihelper パッケージのリファレンス。ローカルビルド、Yarn ポータルでのテスト、changeset による公開を扱います。"
---

# ApiHelper

<div class="article-intro">

`@churchapps/apihelper` パッケージは、ChurchApps のすべての Express.js API に向けたサーバーサイドのユーティリティを提供します。基本コントローラークラス、JWT 認証、データベースユーティリティ、AWS 連携が含まれており、すべての API プロジェクトがこれに依存しています。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- **Node.js** と **Git** をインストールしてください -- [前提条件](../setup/prerequisites.md)を参照
- [Packages ワークスペース](./index.md)のセットアップとリリースの流れに慣れておいてください
- このパッケージは [`@churchapps/helpers`](./helpers.md) に依存しており (peer dependency として)、それを再エクスポートしています

</div>

## 含まれる内容

- **CustomBaseController** -- `inversify-express-utils` をベースにした API コントローラーの基底クラス
- **Auth** -- `CustomAuthProvider`、`AuthenticatedUser`、`Principal` による JWT 認証
- **データベースユーティリティ** -- `DB.query` / `DB.queryOne`、MySQL 接続管理用の `Pool` クラス、スキーマ設定用の `MySqlHelper` と `DBCreator`
- **AWS 連携** -- S3 でのファイル保存と SSM Parameter Store の読み取りを行う `AwsHelper`
- **メール** -- SES と SMTP のトランスポートに対応した `EmailHelper`
- **設定の読み込み** -- `EnvironmentBase` が環境変数または Parameter Store から接続文字列とシークレットを読み込みます
- **その他** -- `EncryptionHelper`、`FileStorageHelper`、`LoggingHelper`、`BasePermissions`、`SlugHelper`

## ローカル開発環境のセットアップ

このパッケージは、他の共有ライブラリとともに [Packages](https://github.com/ChurchApps/Packages) ワークスペースにあります:

1. ワークスペースをクローンします:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. ワークスペースのルートで依存関係をインストールします:

   ```bash
   cd Packages && yarn install
   ```

3. ビルドします (TypeScript を `dist/` にコンパイルします):

   ```bash
   yarn workspace @churchapps/apihelper build
   ```

   または、ルートで `yarn build` を実行すると、依存関係の順にすべてのパッケージをビルドします。

変更を利用側の API でテストするには、一時的な Yarn portal を使用してください -- [利用側アプリに対するローカル開発](./index.md#local-development-against-a-consuming-app)を参照。

## 公開

リリースは changesets を通じて行います。すべての変更ごとにワークスペースのルートで `yarn changeset` を実行し、リリースの準備ができたら `yarn publish-all` を実行します。全体の流れについては [共有ライブラリの概要](./index.md#releasing-with-changesets)を参照してください。

:::info
このパッケージは、すべての ChurchApps API (コアの Api、AskApi、LessonsApi) の依存関係です。変更を加えたときは、公開する前にローカルの API に対してテストしてください。
:::

## 関連記事

- **[Helpers](./helpers.md)** -- このパッケージが依存している基本のユーティリティパッケージ
- **[モジュール構造](../api/module-structure.md)** -- API モジュールでコントローラーと認証ミドルウェアがどのように使われるか
- **[ローカル API のセットアップ](../api/local-setup.md)** -- ローカル開発用に API をセットアップする方法
