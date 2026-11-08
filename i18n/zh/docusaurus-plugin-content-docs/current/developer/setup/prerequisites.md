---
title: "先决条件"
description: "在本地开展 ChurchApps 项目（如 B1 Admin、Lessons.church、FreePlay 或 API）的工作之前，请设置 Node.js、npm、Git 以及各平台的工具链。"
---

# 先决条件

<div class="article-intro">

您需要的工具取决于您计划参与的项目。本页按开发领域列出了所有所需软件，从通用要求到特定平台的工具链，依次介绍。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 查看[项目概览](./project-overview.md)，确定您想参与的项目
- 确保您的开发机器上拥有用于安装软件的管理员权限

</div>

## 所有项目

无论您参与哪个项目，以下工具都是必需的：

| 工具 | 版本 | 备注 |
|------|---------|-------|
| **Node.js** | 20+ | B1App 和 LessonsApp（Next.js 16）需要 22+ 版本；Api 需要 24+ 版本 |
| **npm** | 随 Node.js 一同安装 | 所有项目统一使用的包管理器 |
| **Git** | 最新版 | 每个项目都是独立的代码仓库 |

:::tip
使用 Node 版本管理工具，如 [nvm](https://github.com/nvm-sh/nvm)（macOS/Linux）或 [nvm-windows](https://github.com/coreybutler/nvm-windows)（Windows），可以轻松切换不同的 Node 版本。
:::

## 后端 API 开发

如果您计划在本地运行 API（而不是连接到演示 API）：

| 工具 | 版本 | 备注 |
|------|---------|-------|
| **MySQL** | 8.0+ | 每个 API 模块使用各自的数据库 |

核心 API 需要六个数据库：`membership`、`attendance`、`content`、`giving`、`messaging` 和 `doing`。API 包含用于初始化数据库结构的脚本——请参阅 [API 本地设置](../api/local-setup.md)指南。

## 移动应用开发

适用于 B1Checkin、LessonsScreen 或其他 React Native / Expo 应用：

| 工具 | 版本 | 备注 |
|------|---------|-------|
| **Expo CLI** | 最新版 | 全局安装：`npm install -g expo-cli` |
| **Android Studio** | 最新版 | Android 开发必需（包含 Android SDK） |
| **Xcode** | 最新版 | iOS 开发必需（仅限 macOS） |

:::info
您可以在实体设备上使用 Expo Go 应用进行快速测试，无需 Android Studio 或 Xcode。但是，构建正式版二进制文件则需要原生工具链。
:::

## FreeShow（桌面应用）开发

FreeShow 需要额外的原生构建依赖项，因为它需要编译原生 Node 模块（如 `canvas`）：

### 所有平台

| 工具 | 版本 | 备注 |
|------|---------|-------|
| **Python** | 3.12 | `node-gyp` 编译原生模块时需要 |
| **setuptools** | 最新版 | 通过 `pip install setuptools` 安装 |

### Windows

| 工具 | 备注 |
|------|-------|
| **Visual Studio** | 社区版即可满足需求 |
| **"使用 C++ 的桌面开发"工作负载** | 在安装 Visual Studio 时选择 |
| **Windows 10 SDK** | 包含在 C++ 工作负载中；请确保已勾选 |

您可以通过命令行安装 Visual Studio 构建工具：

```bash
npm install --global windows-build-tools
```

或者安装 Visual Studio 社区版，并在安装过程中选择"使用 C++ 的桌面开发"工作负载。

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

通常只需安装 Xcode 命令行工具即可：

```bash
xcode-select --install
```

## 验证安装

运行以下命令，确认所有软件均已正确安装：

```bash
node --version    # 应显示 v20.x.x 或更高版本
npm --version     # 应显示 10.x.x 或更高版本
git --version     # 应显示 git version 2.x.x
mysql --version   # 仅在本地开发 API 时需要
```

## 后续步骤

- **[项目概览](./project-overview.md)** -- 了解所有项目及其功能
- **[环境变量](./environment-variables.md)** -- 配置您的 `.env` 文件
