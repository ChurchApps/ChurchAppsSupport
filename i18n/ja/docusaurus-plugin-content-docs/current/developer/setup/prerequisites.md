---
title: "前提条件"
---

# 前提条件

<div class="article-intro">

必要なツールは、どのプロジェクトで作業するかによって異なります。このページでは、すべての開発領域で必要なソフトウェアを、共通の要件からプラットフォーム固有のツールチェーンまで順にまとめています。

</div>

<div class="prereqs">
<h4>始める前に</h4>

- [プロジェクト概要](./project-overview)を確認し、作業したいプロジェクトを決めておいてください
- 開発用のマシンでソフトウェアをインストールするために、管理者権限があることを確認してください

</div>

## すべてのプロジェクト

どのプロジェクトで作業する場合でも、以下が必要です:

| ツール | バージョン | 備考 |
|------|---------|-------|
| **Node.js** | 20以上 | B1App と LessonsApp (Next.js 16) には 22以上が必要です。Api には 24以上が必要です |
| **npm** | Node.js に同梱 | すべてのプロジェクトでパッケージマネージャーとして使用します |
| **Git** | 最新版 | 各プロジェクトは別々のリポジトリです |

:::tip
Node のバージョンを簡単に切り替えるには、[nvm](https://github.com/nvm-sh/nvm)(macOS/Linux)または [nvm-windows](https://github.com/coreybutler/nvm-windows)(Windows)などのバージョン管理ツールを使用してください。
:::

## バックエンド API の開発

API をローカルで実行する場合(デモ API を参照するのではなく)は、以下が必要です:

| ツール | バージョン | 備考 |
|------|---------|-------|
| **MySQL** | 8.0以上 | API の各モジュールは、それぞれ独自のデータベースを使用します |

コア API には 6 つのデータベースが必要です: `membership`、`attendance`、`content`、`giving`、`messaging`、`doing`。API にはスキーマを初期化するスクリプトが含まれています。詳しくは [API のローカルセットアップ](../api/local-setup)ガイドを参照してください。

## モバイルアプリの開発

B1Mobile、B1Checkin、LessonsScreen などの React Native / Expo アプリで作業する場合は、以下が必要です:

| ツール | バージョン | 備考 |
|------|---------|-------|
| **Expo CLI** | 最新版 | グローバルにインストールします: `npm install -g expo-cli` |
| **Android Studio** | 最新版 | Android 開発に必要です(Android SDK を含みます) |
| **Xcode** | 最新版 | iOS 開発に必要です(macOS のみ) |

:::info
実機では、Android Studio や Xcode がなくても、Expo Go アプリを使って手早く動作確認ができます。ただし、本番用のバイナリをビルドするには、ネイティブのツールチェーンが必要です。
:::

## FreeShow(デスクトップアプリ)の開発

FreeShow は、ネイティブ Node モジュール(`canvas` など)をコンパイルするため、追加のネイティブビルド依存関係が必要です:

### すべてのプラットフォーム

| ツール | バージョン | 備考 |
|------|---------|-------|
| **Python** | 3.12 | ネイティブモジュールのコンパイルに `node-gyp` が必要とします |
| **setuptools** | 最新版 | `pip install setuptools` でインストールします |

### Windows

| ツール | 備考 |
|------|-------|
| **Visual Studio** | Community エディションで十分です |
| **"Desktop development with C++" ワークロード** | Visual Studio のインストール時に選択します |
| **Windows 10 SDK** | C++ ワークロードに含まれます。必ずチェックが入っていることを確認してください |

Visual Studio のビルドツールは、コマンドラインから次のようにインストールできます:

```bash
npm install --global windows-build-tools
```

または、Visual Studio Community をインストールし、インストール中に "Desktop development with C++" ワークロードを選択してください。

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

通常は Xcode Command Line Tools で十分です:

```bash
xcode-select --install
```

## インストールの確認

以下のコマンドを実行して、すべてが正しくインストールされているか確認してください:

```bash
node --version    # Should print v20.x.x or higher
npm --version     # Should print 10.x.x or higher
git --version     # Should print git version 2.x.x
mysql --version   # Only needed for local API development
```

## 次のステップ

- **[プロジェクト概要](./project-overview)** -- すべてのプロジェクトと、それぞれの役割を確認します
- **[環境変数](./environment-variables)** -- `.env` ファイルを設定します
