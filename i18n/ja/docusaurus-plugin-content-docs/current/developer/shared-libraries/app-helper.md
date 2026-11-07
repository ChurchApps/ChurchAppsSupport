---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

`@churchapps/apphelper` パッケージは、すべての ChurchApps Web アプリケーションで共有される React コンポーネントとユーティリティを提供します。これは単一の公開パッケージで、ログイン、寄付、フォーム、マークダウン、Web サイト/CMS 機能といった機能モジュールをサブパスのエントリポイントを通じて公開しています。また、コアとなる共通コンポーネントとヘルパーも含まれています。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- **Node.js** と **Git** をインストールしてください — [前提条件](../setup/prerequisites) を参照
- [Packages ワークスペース](./index.md) のセットアップとリリースの流れを確認してください

</div>

## エントリポイント

パッケージの `package.json` にはサブパスのエクスポートが定義されているため、各機能モジュールを個別にインポートできます。

| エントリポイント | 内容 |
|-------------|----------|
| `@churchapps/apphelper` | コアコンポーネント、ヘルパー、フック |
| `@churchapps/apphelper/login` | ログインおよび登録 UI |
| `@churchapps/apphelper/donations` | 献金および寄付のコンポーネント |
| `@churchapps/apphelper/forms` | フーム送信コンポーネント |
| `@churchapps/apphelper/markdown` | マークダウンおよび HTML エディタ、レンダラー |
| `@churchapps/apphelper/website` | Web サイトビルダーおよび CMS コンポーネント |

## 利用箇所一覧

共有エクスポートを変更する前に、どのアプリがそれをインポートしているかを確認してください。

| エクスポート領域 | 提供する機能 | 利用アプリ |
|---|---|---|
| ルート — コアコンポーネントとフック | `DisplayBox`、`InputBox`、`Loading`、`PageHeader`、`PersonAvatar`、`SmallButton`、`ErrorMessages`、`ExportLink`、`useMountedState`、および再エクスポートされる `@churchapps/helpers` のユーティリティ（`ApiHelper`、`DateHelper`、`Locale`、`UserHelper` など） | B1Admin、B1App、B1Transfer、LessonsApp |
| ルート — サイト共通部品 | `SiteHeader`（ナビゲーション、ユーザーメニュー、通知） | B1Admin、B1Transfer、LessonsApp |
| ルート — 管理コンテンツエディタ | `ImageEditor`、`HelpIcon` | B1Admin |
| ルート — リアルタイム基盤 | `SocketHelper`、`SubscriptionManager`、`NotificationService` | B1Admin、B1App |
| ルート — チャットおよびプレゼンスのストア | `ConversationStore`、`PresenceStore` | B1App |
| ルート — メモおよびメッセージ UI | `Notes`（人物やタスクに対するスタッフのメモ）、`AddNote`、`SubscriptionToggle`（会員向けメッセージ） | B1Admin（`Notes`）、B1App（`AddNote`、`SubscriptionToggle`） |
| ルート — Lessons 専用 | `AnalyticsHelper`、`FloatingSupport`、`SupportModal` | LessonsApp |
| `./login` | `LoginPage`、`LogoutPage` | B1Admin、B1App、B1Transfer、LessonsApp |
| `./markdown` | `MarkdownEditor`、`MarkdownPreviewLight`（共有）、`MarkdownPreview`、`HtmlEditor`（管理コンテンツの編集） | B1Admin、B1App、LessonsApp |
| `./donations` | `MultiGatewayDonationForm`、`RecurringDonations`、`PaymentMethods`、`StripePaymentMethod`、`DonationHelper`/`getPaymentProvider`（共有）、`FundDonations`（管理者のみ） | B1Admin、B1App |
| `./forms` | `FormSubmissionEdit`（フォームの `displayMode` が `conversational` の場合に `ConversationalForm` を描画） | B1Admin、B1App |
| `./website` | エディタとレンダラーで共有されるページ描画の中核（`Element`、`ElementRegistry` で解決される種類別レンダラー、`StyleHelper`、`DroppableArea`、`DraggableWrapper`、`Theme`、`YoutubeBackground`、`SectionDivider`/`parseDividerConfig`）、サイト全体のウィジェット（`AnnouncementBanner`、`Launcher` と各 `parse*Config` ヘルパー）、公開向けレンダラーのみで使われる `Animate`、`ElementBlock`、`NonAuthDonationWrapper`、`SermonElement` | B1Admin（エディタ）、B1App（エディタコンポーネントとレンダラー） |

B1Transfer と LessonsApp はルートと `login` のエントリポイントのみを使用します。現在 `donations`、`forms`、`website` のサブパスは B1Admin と B1App でのみ利用されています。

## ローカル開発環境のセットアップ

このパッケージは、他の共有ライブラリとともに [Packages](https://github.com/ChurchApps/Packages) ワークスペースに含まれています。

1. ワークスペースをクローンします。

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. ワークスペースのルートで依存関係をインストールします。

   ```bash
   cd Packages && yarn install
   ```

3. パッケージのディレクトリから Vite のプレイグラウンドを起動します。

   ```bash
   cd apphelper && yarn dev
   ```

   プレイグラウンドの開発サーバーは `http://localhost:3001` で起動します。まず `playground/dotenv.sample` を `playground/.env` にコピーし、必要な値を入力してください。

利用者向けにパッケージをビルドするには（`dist/` にコンパイルし、ロケールと CSS のアセットをコピーします）、`yarn workspace @churchapps/apphelper build` を実行してください。または、ルートで `yarn build` を実行すると、依存関係の順にすべてのパッケージがビルドされます。公開前のビルドを利用側のアプリ内でテストするには、一時的な Yarn portal を使用します。詳しくは [利用側アプリでのローカル開発](./index.md#local-development-against-a-consuming-app) を参照してください。

:::tip
AppHelper のコンポーネントを開発・テストするには、プレイグラウンドが最も手早い方法です。Vite の開発サーバーがホットリロードに対応しているため、変更をリアルタイムで確認できます。
:::

## 公開

リリースは changesets を通じて行います。すべての変更ごとにワークスペースのルートで `yarn changeset` を実行し、リリースの準備ができたら `yarn publish-all` を実行します。全体の流れについては [共有ライブラリの概要](./index.md#releasing-with-changesets) を参照してください。

:::warning
代替のエクスポートが公開され、すべての利用側がその移行を終えるまで、エクスポートを削除または名称変更しないでください。削除をマージする前に、利用しているすべてのリポジトリを grep で検索してください。
:::

## 関連記事

- **[Helpers](./helpers)** — AppHelper と併用される基本のユーティリティパッケージ
- **[Web Apps](../web-apps/)** — このパッケージを利用する Web アプリケーション
- **[共有ライブラリの概要](./index.md)** — ワークスペースのセットアップ、リリースの流れ、ローカルリンクの手順
