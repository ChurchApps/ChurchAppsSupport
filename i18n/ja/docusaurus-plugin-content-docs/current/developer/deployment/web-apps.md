---
title: "Webアプリのデプロイ"
---

# Webアプリのデプロイ

<div class="article-intro">

ChurchAppsのWebアプリケーションは、静的サイトとして **Amazon S3** にデプロイされ、CDNとして **CloudFront** を使用します。デプロイは GitHub Actions によって自動化されていますが、必要に応じて手動で実行することもできます。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- Webアプリをローカルにセットアップし、ビルドが通ることを確認してください -- [Webアプリ](../web-apps/) を参照
- S3 と CloudFront にアクセスできる AWS 認証情報を設定してください
- 対象の S3 バケット名と CloudFront ディストリビューション ID を確認してください

</div>

## デプロイの手順

1. **アプリをビルドする** -- 静的な出力を生成します:

   ```bash
   npm run build
   ```

2. **S3 に同期する** -- ビルドの出力を S3 バケットにアップロードします:

   ```bash
   aws s3 sync build/ s3://bucket-name
   ```

3. **CloudFront のキャッシュを無効化する** -- ユーザーが最新バージョンを受け取れるよう、CDN のキャッシュをクリアします:

   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   ```

## 自動デプロイ

`main` ブランチへのプッシュ時に、GitHub Actions のワークフローがデプロイを自動的に処理します。このワークフローは、ビルド、S3 への同期、CloudFront のキャッシュ無効化という上記の3つの手順をすべて、手動操作なしで実行します。

:::info
通常、これらのコマンドを手動で実行する必要はありません。プルリクエストを `main` にマージすると、自動デプロイのパイプラインが起動します。
:::

:::tip
デプロイの前にローカルでビルドを確認したい場合は、`npm run build` を実行し、`build/` ディレクトリの出力を確認してください。任意の静的ファイルサーバーで提供すれば、正しく動作するかをローカルで確認できます。
:::

## 関連記事

- **[Webアプリ](../web-apps/)** -- B1Admin、B1App、LessonsApp のセットアップガイド
- **[APIのデプロイ](./apis)** -- バックエンド API のデプロイ
- **[モバイルアプリのデプロイ](./mobile)** -- モバイルアプリをアプリストアにデプロイする方法
