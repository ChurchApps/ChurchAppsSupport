---
title: "前提条件"
description: "ChurchAppsのプロジェクト（B1 Admin、Lessons.church、FreePlay、APIなど）をローカルで開発する前に、Node.js、npm、Git、および各プラットフォーム向けのツールチェーンをセットアップします。"
---

# 前提条件

<div class="article-intro">

必要なツールは、どのプロジェクトで作業するかによって異なります。このページでは、共通の要件からプラットフォーム固有のツールチェーンまで、開発分野ごとに必要なソフトウェアをすべて一覧にしています。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- [プロジェクトの概要](./project-overview.md)を確認し、作業したいプロジェクトを決めてください
- ソフトウェアをインストールするため、開発マシンで管理者権限があることを確認してください

</div>

## すべてのプロジェクト

どのプロジェクトで作業する場合でも、以下は必須です。

| ツール | バージョン | 備考 |
|------|---------|-------|
| **Node.js** | 20以上 | B1App および LessonsApp（Next.js 16）には22以上が必要です。Api には24以上が必要です |
| **npm** | Node.jsに同梱 | すべてのプロジェクトでパッケージマネージャーとして使用されます |
| **Git** | 最新版 | 各プロジェクトは個別のリポジトリです |

:::tip
Node.jsのバージョンを簡単に切り替えるには、[nvm](https://github.com/nvm-sh/nvm)（macOS/Linux）または[nvm-windows](https://github.com/coreybutler/nvm-windows)（Windows）のようなNode.jsバージョン管理ツールを使用してください。
:::

## バックエンドAPI開発

APIをローカルで実行する場合（デモ用のAPIを参照するのではなく）は、以下が必要です。

| ツール | バージョン | 備考 |
|------|---------|-------|
| **MySQL** | 8.0以上 | APIの各モジュールは、それぞれ独自のデータベースを使用します |

コアAPIには、`membership`、`attendance`、`content`、`giving`、`messaging`、`doing`の6つのデータベースが必要です。APIにはスキーマを初期化するためのスクリプトが含まれています。詳しくは[APIのローカルセットアップ](../api/local-setup.md)ガイドを参照してください。

## モバイルアプリ開発

B1Checkin、LessonsScreen、その他のReact Native / Expoアプリを開発する場合：

| ツール | バージョン | 備考 |
|------|---------|-------|
| **Expo CLI** | 最新版 | グローバルにインストール：`npm install -g expo-cli` |
| **Android Studio** | 最新版 | Android開発に必要です（Android SDKを含みます） |
| **Xcode** | 最新版 | iOS開発に必要です（macOSのみ） |

:::info
Android StudioやXcodeがなくても、実機でExpo Goアプリを使えば手早くテストできます。ただし、本番用のバイナリをビルドするには、ネイティブのツールチェーンが必要です。
:::

## FreeShow（デスクトップアプリ）開発

FreeShowはネイティブモジュール（`canvas`など）をコンパイルするため、追加のネイティブビルド依存関係が必要です。

### すべてのプラットフォーム

| ツール | バージョン | 備考 |
|------|---------|-------|
| **Python** | 3.12 | ネイティブモジュールのコンパイルに`node-gyp`が必要とします |
| **setuptools** | 最新版 | `pip install setuptools`でインストールします |

### Windows

| ツール | 備考 |
|------|-------|
| **Visual Studio** | Community版で十分です |
| **「C++によるデスクトップ開発」ワークロード** | Visual Studioのインストール時に選択します |
| **Windows 10 SDK** | C++ワークロードに含まれています。必ずチェックが入っていることを確認してください |

コマンドラインからVisual Studioのビルドツールをインストールできます。

```bash
npm install --global windows-build-tools
```

または、Visual Studio Communityをインストールし、インストール時に「C++によるデスクトップ開発」ワークロードを選択してください。

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

通常はXcodeのコマンドラインツールで十分です。

```bash
xcode-select --install
```

## インストールの確認

以下のコマンドを実行して、すべてが正しくインストールされているか確認してください。

```bash
node --version    # v20.x.x 以上が表示されるはずです
npm --version     # 10.x.x 以上が表示されるはずです
git --version     # git version 2.x.x と表示されるはずです
mysql --version   # ローカルでのAPI開発にのみ必要です
```

## 次のステップ

- **[プロジェクトの概要](./project-overview.md)** -- すべてのプロジェクトとその役割を確認する
- **[環境変数](./environment-variables.md)** -- `.env`ファイルを設定する
