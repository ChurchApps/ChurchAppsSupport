---
title: "设置"
---

# 设置

<div class="article-intro">

本节将指导您为 ChurchApps 项目搭建本地开发环境。您可以将前端指向共享的演示 API 以便快速开发，也可以在本地运行完整的技术栈以进行后端工作。

</div>

## 两种方式

根据您需要的技术栈范围，本地开发有两种方式：

### 1. 指向演示 API（最简单）

如果您正在开发**前端项目**（网页应用、移动应用或桌面应用），最快的方式是将本地应用指向共享的演示 API。无需数据库或后端设置。

演示 API 的基础 URL 为：

```
https://api.demo.churchapps.org
```

每个 API 模块都可以通过该基础地址下的路径访问，例如：

```
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/giving
```

演示环境运行 `main` 分支的最新代码，其示例数据每晚会重新填充，因此请不要期望您在其中创建的内容会被保留。（原先的预发布环境 `api.staging.churchapps.org` 已停用。部分示例 `.env` 文件可能仍列出预发布环境的 URL，请将其替换为演示或本地 URL。）

:::tip
这种方式让您几分钟内就能开始进行前端修改。它是大多数贡献者推荐的方式。
:::

### 2. 在本地运行全部内容

如果您需要修改 API 代码或需要离线工作，可以在本地运行完整的技术栈。这需要 MySQL 8.0+ 以及额外的配置。详细说明请参阅 [API 本地设置](../api/local-setup)指南。

## 入门

请按以下顺序阅读这些页面：

1. **[前置条件](prerequisites)** -- 安装所需工具（Node.js、Git、MySQL 等）
2. **[项目概述](project-overview)** -- 了解有哪些项目以及它们的用途
3. **[环境变量](environment-variables)** -- 配置您的 `.env` 文件，将所有内容连接在一起

:::info
每个 ChurchApps 项目都是独立的 Git 仓库。您只需克隆您想要使用的特定项目即可。
:::
