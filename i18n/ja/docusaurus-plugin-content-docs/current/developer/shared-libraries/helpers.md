---
title: "ヘルパー"
description: "開発者向けの @churchapps/helpers パッケージの解説。提供される機能、利用するアプリ、Packages ワークスペースでのローカルビルドの設定、changesets による公開の流れを扱います。"
---

# ヘルパー

<div class="article-intro">

`@churchapps/helpers` パッケージは、ChurchApps のすべてのプロジェクト（フロントエンドとバックエンドの両方）で使われる基本的なユーティリティを提供します。フレームワークに依存せず、`DateHelper`、`ApiHelper`、`CurrencyHelper` などの共通ヘルパーと、アプリと API の間のデータ契約となる共有 TypeScript インターフェースを含みます。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- **Node.js** と **Git** をインストールしてください -- [前提条件](../setup/prerequisites.md)を参照
- [Packages ワークスペース](./index.md)のセットアップとリリースの流れに慣れておいてください

</div>

## 利用先

ChurchApps のすべての API（コアの Api、AskApi、LessonsApi）と、すべての Web フロントエンド（B1Admin、B1App、B1Transfer、LessonsApp）が、このパッケージに直接依存しています。フロントエンドでは、多くのエクスポート（`ApiHelper`、`DateHelper`、`UserHelper` などのインターフェース）も [`@churchapps/apphelper`](./app-helper.md) を通じて再エクスポートされて利用できます。他の共有パッケージはこれを peer dependency として宣言しているため、各アプリは必ず 1 つのコピーだけを読み込みます。

## ローカル開発のセットアップ

このパッケージは、他の共有ライブラリと一緒に [Packages](https://github.com/ChurchApps/Packages) ワークスペースにあります。

1. ワークスペースをクローンします:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. ワークスペースのルートで依存関係をインストールします:

   ```bash
   cd Packages && yarn install
   ```

3. ビルドします（TypeScript を `dist/` にコンパイルします）:

   ```bash
   yarn workspace @churchapps/helpers build
   ```

   または、ルートで `yarn build` を実行すると、依存関係の順にすべてのパッケージをビルドします。

利用先のプロジェクト内で変更をテストするには、一時的な Yarn portal を使います -- [利用先アプリでのローカル開発](./index.md#local-development-against-a-consuming-app)を参照してください。

## 公開

バージョンを手動で上げる代わりに、changesets を使ってリリースします:

1. ワークスペースのルートで `yarn changeset` を実行し、`@churchapps/helpers` を選んで適切なバージョンアップの種類を指定します。生成された changeset ファイルは、変更と一緒にコミットしてください。
2. リリースの準備ができたら、ルートで `yarn publish-all` を実行します。バージョンを上げ、CHANGELOG を書き、依存関係の順にビルドし、npm に公開します。

新しい共有インターフェースは `helpers/src/interfaces/` に置き、パッケージのバレルファイルを通して再エクスポートします。ウェブサイトビルダーの要素タイプのカタログ（`ElementTypes.ts` -- 回答スキーマを持つ 35 種類）もここにあります。これは apphelper のレンダラー、B1Admin のエディターフォーム、AI 生成プロンプトに共通する契約です（[ウェブサイトビルダーのアーキテクチャ](../architecture/website-builder.md)を参照）。

:::warning
このパッケージはすべての ChurchApps プロジェクトで使われているため、ここへの変更は広範囲に影響します。`helpers` をリリースすると、依存範囲を最新に保つために `apihelper` と `apphelper` も自動的にバージョンが上がります。公開する前に、少なくとも 1 つの利用先 API と 1 つの利用先 Web アプリで Yarn portal を使ってテストしてください。
:::

## 関連記事

- **[ApiHelper](./api-helper.md)** -- このパッケージに依存するサーバー側ユーティリティ
- **[AppHelper](./app-helper.md)** -- このパッケージに依存する React コンポーネント
- **[共有ライブラリの概要](./index.md)** -- ワークスペースのセットアップ、リリースの流れ、ローカルリンクの手順
