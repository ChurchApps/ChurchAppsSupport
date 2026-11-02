---
title: "前置条件"
---

# 前置条件

<div class="article-intro">

你需要的工具取决于你计划参与的项目。本页按开发领域列出了所有所需的软件，从通用要求到各平台专用的工具链，依次介绍。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 查看[项目概览](./project-overview)，确定你想参与哪些项目
- 在你的开发机器上具有管理员权限，以便安装软件

</div>

## 所有项目

无论你参与哪个项目，以下工具都是必需的：

| 工具 | 版本 | 说明 |
|------|---------|-------|
| **Node.js** | 20+ | B1App 和 LessonsApp（Next.js 16）需要 22+；API 需要 24+ |
| **npm** | 随 Node.js 附带 | 所有项目统一使用的包管理器 |
| **Git** | 最新版 | 每个项目都是独立的代码仓库 |

:::tip
可以使用 Node 版本管理器在不同 Node 版本之间轻松切换：macOS/Linux 使用 [nvm](https://github.com/nvm-sh/nvm)，Windows 使用 [nvm-windows](https://github.com/coreybutler/nvm-windows)。
:::

## 后端 API 开发

如果你计划在本地运行 API（而不是连接演示 API）：

| 工具 | 版本 | 说明 |
|------|---------|-------|
| **MySQL** | 8.0+ | 每个 API 模块使用各自独立的数据库 |

核心 API 需要六个数据库：`membership`、`attendance`、`content`、`giving`、`messaging` 和 `doing`。API 附带了初始化数据库结构的脚本——请参阅 [API 本地设置](../api/local-setup)指南。

## 移动应用开发

适用于 B1Mobile、B1Checkin、LessonsScreen 或其他 React Native / Expo 应用：

| 工具 | 版本 | 说明 |
|------|---------|-------|
| **Expo CLI** | 最新版 | 全局安装：`npm install -g expo-cli` |
| **Android Studio** | 最新版 | Android 开发必需（包含 Android SDK） |
| **Xcode** | 最新版 | iOS 开发必需（仅限 macOS） |

:::info
你可以在实体设备上使用 Expo Go 应用进行快速测试，无需 Android Studio 或 Xcode。但要构建正式发布的二进制文件，则需要原生工具链。
:::

## FreeShow（桌面应用）开发

由于 FreeShow 需要编译原生 Node 模块（例如 `canvas`），因此它有额外的原生构建依赖：

### 所有平台

| 工具 | 版本 | 说明 |
|------|---------|-------|
| **Python** | 3.12 | 原生模块编译时 `node-gyp` 所需 |
| **setuptools** | 最新版 | 通过 `pip install setuptools` 安装 |

### Windows

| 工具 | 说明 |
|------|-------|
| **Visual Studio** | 社区版即可满足需求 |
| **"使用 C++ 的桌面开发"工作负载** | 在安装 Visual Studio 时选择 |
| **Windows 10 SDK** | 包含在 C++ 工作负载中；请确保已勾选 |

你可以通过命令行安装 Visual Studio 构建工具：

```bash
npm install --global windows-build-tools
```

或者安装 Visual Studio Community，并在安装过程中选择"使用 C++ 的桌面开发"工作负载。

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
node --version    # 应输出 v20.x.x 或更高版本
npm --version     # 应输出 10.x.x 或更高版本
git --version     # 应输出 git version 2.x.x
mysql --version   # 仅本地 API 开发时需要
```

## 下一步

- **[项目概览](./project-overview)** —— 了解所有项目及其用途
- **[环境变量](./environment-variables)** —— 配置你的 `.env` 文件
