---
title: "前置条件"
---

# 前置条件

<div class="article-intro">

您需要的工具取决于您计划参与的项目。本页面按开发领域列出了所有必需的软件，从通用要求到平台特定的工具链。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 查看[项目概览](./project-overview)以确定您想参与的项目
- 确保在开发机器上拥有管理员权限以安装软件

</div>

## 所有项目

无论您参与哪个项目，以下都是必需的：

| 工具 | 版本 | 备注 |
|------|---------|-------|
| **Node.js** | 20+ | B1App 和 LessonsApp（Next.js 16）需要版本 22+ |
| **npm** | 随 Node.js 一起提供 | 在所有项目中用作包管理器 |
| **Git** | 最新版 | 每个项目是一个单独的仓库 |

:::tip
使用 Node 版本管理器如 [nvm](https://github.com/nvm-sh/nvm)（macOS/Linux）或 [nvm-windows](https://github.com/coreybutler/nvm-windows)（Windows）来轻松切换 Node 版本。
:::

## 后端 API 开发

如果您计划在本地运行 API（而不是指向 staging）：

| 工具 | 版本 | 备注 |
|------|---------|-------|
| **MySQL** | 8.0+ | 每个 API 模块使用自己的数据库 |

核心 API 需要六个数据库：`membership`、`attendance`、`content`、`giving`、`messaging` 和 `doing`。API 包含初始化 schema 的脚本——请参阅 [API 本地设置](../api/local-setup)指南。

## 移动应用开发

对于 B1Mobile、B1Checkin、LessonsScreen 或其他 React Native / Expo 应用：

| 工具 | 版本 | 备注 |
|------|---------|-------|
| **Expo CLI** | 最新版 | 全局安装：`npm install -g expo-cli` |
| **Android Studio** | 最新版 | Android 开发所需（包含 Android SDK） |
| **Xcode** | 最新版 | iOS 开发所需（仅限 macOS） |

:::info
您可以在物理设备上使用 Expo Go 应用进行快速测试，无需 Android Studio 或 Xcode。但是，构建生产二进制文件需要原生工具链。
:::

## FreeShow（桌面应用）开发

FreeShow 有额外的原生构建依赖，因为它编译原生 Node 模块（如 `canvas`）：

### 所有平台

| 工具 | 版本 | 备注 |
|------|---------|-------|
| **Python** | 3.12 | `node-gyp` 编译原生模块时需要 |
| **setuptools** | 最新版 | 通过 `pip install setuptools` 安装 |

### Windows

| 工具 | 备注 |
|------|-------|
| **Visual Studio** | Community 版即可 |
| **"Desktop development with C++" 工作负载** | 在 Visual Studio 安装期间选择 |
| **Windows 10 SDK** | 包含在 C++ 工作负载中；确保已勾选 |

您可以通过命令行安装 Visual Studio 构建工具：

```bash
npm install --global windows-build-tools
```

或者安装 Visual Studio Community 并在安装期间选择"Desktop development with C++"工作负载。

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Xcode Command Line Tools 通常就足够了：

```bash
xcode-select --install
```

## 验证安装

运行以下命令确认所有内容已安装：

```bash
node --version    # Should print v20.x.x or higher
npm --version     # Should print 10.x.x or higher
git --version     # Should print git version 2.x.x
mysql --version   # Only needed for local API development
```

## 后续步骤

- **[项目概览](./project-overview)** -- 查看所有项目及其功能
- **[环境变量](./environment-variables)** -- 配置您的 `.env` 文件
