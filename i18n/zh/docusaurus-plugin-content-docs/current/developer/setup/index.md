---
title: "设置"
---

# 设置

<div class="article-intro">

本部分将引导您为 ChurchApps 项目设置本地开发环境。您可以将前端指向共享的 staging API 以进行快速开发，也可以在本地运行完整的技术栈以进行后端工作。

</div>

## 两种方式

根据您需要多少技术栈，有两种本地开发方式：

### 1. 指向 Staging API（最简单）

如果您正在处理**前端项目**（Web 应用、移动应用或桌面应用），最快的方式是将本地应用指向共享的 staging API。无需数据库或后端设置。

Staging API 基础 URL 为：

```
https://api.staging.churchapps.org
```

每个 API 模块在此基础路径下可用，例如：

```
https://api.staging.churchapps.org/membership
https://api.staging.churchapps.org/attendance
https://api.staging.churchapps.org/giving
```

:::tip
这种方式让您可以在几分钟内开始进行前端更改。这是大多数贡献者的推荐方式。
:::

### 2. 在本地运行所有内容

如果您需要修改 API 代码或离线工作，可以在本地运行完整的技术栈。这需要 MySQL 8.0+ 和额外的配置。详细说明请参阅 [API 本地设置](../api/local-setup)指南。

## 入门

按顺序阅读以下页面：

1. **[前置条件](prerequisites)** -- 安装所需工具（Node.js、Git、MySQL 等）
2. **[项目概览](project-overview)** -- 了解有哪些项目以及它们的功能
3. **[环境变量](environment-variables)** -- 配置您的 `.env` 文件以连接所有组件

:::info
每个 ChurchApps 项目都是一个独立的 Git 仓库。您只需要克隆您想要参与的特定项目。
:::
