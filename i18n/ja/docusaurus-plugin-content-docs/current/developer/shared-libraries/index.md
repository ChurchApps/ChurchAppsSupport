---
title: "共有ライブラリ"
---

# 共有ライブラリ

<div class="article-intro">

ChurchAppsの共有コードは、`@churchapps/*` スコープの下でnpmに公開されています。共有パッケージはすべて単一のリポジトリ [Packages](https://github.com/ChurchApps/Packages) にあり、Yarn (Berry) のワークスペースとして管理され、[changesets](https://github.com/changesets/changesets) でバージョン管理されています。

</div>

## パッケージ

| パッケージ | 説明 | 利用先 |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | 基盤レイヤー。フレームワークに依存しないヘルパー関数と、アプリ間のデータ契約を形成する共有TypeScriptインターフェースを提供します | すべてのプロジェクト |
| [`@churchapps/apihelper`](./api-helper) | サーバーサイドのExpressユーティリティ。認証、基本コントローラー、データベースアクセス、AWSおよびメール連携を含みます | すべてのAPI |
| [`@churchapps/apphelper`](./app-helper) | 共有のReactコンポーネントと機能モジュール（ログイン、寄付、フォーム、Markdown、ウェブサイト） | すべてのWebアプリ |
| `@churchapps/content-providers` | サードパーティのコンテンツプロバイダー（Lessons.church、Planning Center、Dropboxなど）を抽象化したレイヤー | Api、B1Admin、B1App、FreePlay |
| `@churchapps/integration-sdk` | B1.church連携を構築するためのツールキット。Webhookの検証、型付きRESTクライアント、OAuthヘルパーを含みます | 外部の連携開発者 |
| `@churchapps/texting` | SMSプロバイダーの抽象化レイヤー（Text In Church、Clearstream、Mutual Ministry、MinistryStuff、Nalo Solutions、Twilio） | Api |

依存関係の方向は厳密に下向きです。アプリは `apihelper` と `apphelper` に依存し、これらのパッケージは `@churchapps/helpers` を**ピア依存関係**として宣言することで、各アプリが同じコピーを1つだけ解決するようにしています。

## ワークスペースのセットアップ

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

このリポジトリはYarn Berryを使用し（ルートの `packageManager` フィールドが正となります）、ロックファイルは1つだけです。`yarn build` は依存関係の順序に従ってすべてのパッケージをビルドし、`yarn test` はすべてのパッケージのテストを実行します。

## Changesetsでのリリース

パッケージへのすべての変更は、changesetを添えて出荷されます。

1. ワークスペースのルートで `yarn changeset` を実行します。変更したパッケージを選び、バンプの種類（patch = 修正、minor = 新しいエクスポートや機能、major = 破壊的変更）を指定し、一行の要約を書きます。この要約がCHANGELOGのエントリになります。
2. 生成された `.changeset/*.md` ファイルを、コードの変更と一緒にコミットします。pre-commitフックは、ステージされたchangesetなしでパッケージのソースを変更するコミットをブロックします。
3. 公開する準備ができたら、ルートで `yarn publish-all` を実行します。これは保留中のchangesetを消費し（バージョンの更新、CHANGELOGの作成、内部依存関係の範囲の同期）、依存関係の順序に従ってすべてをビルドし、バンプされたパッケージをnpmに公開します。その後、バージョン更新をコミットしてプッシュします。

:::warning
単一のパッケージ内で生の `npm publish` を実行しないでください。リリーススクリプトが処理するビルド順序やバージョン管理の記録をスキップしてしまいます。公開には、`@churchapps` スコープへの公開権限を持つnpmアカウントが必要です。
:::

## 利用先アプリに対するローカル開発

ワークスペース内では、パッケージは兄弟パッケージに対して直接ビルドされるため、リンクは不要です。未公開のパッケージビルドを利用先アプリ（B1Admin、B1Appなど）内でテストするには、利用側に一時的なYarnポータルを追加します。

```bash
# 利用先のプロジェクト内で
yarn link ../Packages/helpers
# ... テスト ...
yarn unlink ../Packages/helpers && yarn install
```

まずパッケージをビルドしてください（ワークスペースのルートで `yarn build`）。利用側はソースではなく、コンパイル済みの `dist/` 出力を読み込みます。

:::warning
`yarn link` は、利用側の `package.json` にポータルの解決設定を書き込みます。これを決してコミットしないでください。作業が終わったら、必ず `yarn unlink` を実行してから再インストールしてください。
:::
