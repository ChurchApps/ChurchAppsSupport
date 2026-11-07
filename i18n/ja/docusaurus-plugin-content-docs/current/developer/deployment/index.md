---
title: "デプロイ"
description: "各 ChurchApps プロジェクトのデプロイ先を確認できます。AWS Lambda の API、S3 のウェブアプリ、Expo のモバイルビルド、Railway または Docker で自己ホストする B1 Admin を扱います。"
---

# デプロイ

<div class="article-intro">

ChurchApps ではプロジェクトの種類に応じて異なるデプロイ方法を使用しています。API は AWS Lambda にデプロイされ、Web アプリは CloudFront を経由して S3 上に静的サイトとしてデプロイされます。モバイルアプリは Expo EAS でビルドされ、アプリストアを通じて配布されます。

</div>

## プロジェクトの種類別のデプロイ

| プロジェクトの種類 | デプロイ先 | ツール |
|-------------|-------------------|---------|
| [API](./apis.md) | AWS Lambda | Serverless Framework v3（Node.js 24.x ランタイム） |
| [Web アプリ](./web-apps.md) | S3 + CloudFront | 静的ビルド、S3 への同期、CloudFront のキャッシュ無効化 |
| [モバイルアプリ](./mobile.md) | アプリストア | Expo EAS Build + OTA アップデート |
| [セルフホスティング（Railway）](./railway-template.md) | Railway | ワンクリックテンプレート: MySQL + Api + B1Admin + B1App |
| [セルフホスティング（Docker）](./docker.md) | 任意の Docker ホスト | ワンライナーのインストーラー。ビルド済みの GHCR イメージと Caddy を使用し、`./deploy/b1` でアップグレード/バックアップ/ロールバックを行います |
| [Caddy カスタムドメインプロキシ](./caddy-proxy.md) | Windows EC2（Elastic IP `3.23.251.61`） | 静的な Caddyfile + WinSW サービス + 定期的なマップ同期 |
| FreeShow | 直接ダウンロード | Electron Builder（クロスプラットフォームのバイナリ） |

## 環境

| 環境 | 用途 |
|-------------|---------|
| `dev` | ローカル開発 |
| `demo` | 公開デモインスタンス。`main` へのプッシュのたびにデプロイされるため、本番前のテストとしても使われます |
| `prod` | 本番環境 |

:::info
各環境には独自の API エンドポイント、データベース、設定があります。環境ごとの設定は、ローカルでは `.env` ファイルで、デプロイ済みの環境では AWS SSM Parameter Store で管理されます。
:::
