---
title: "环境变量"
---

# 环境变量

<div class="article-intro">

每个 ChurchApps 项目都使用 `.env` 文件进行本地配置。每个项目都附带一个示例文件，您可以复制并根据需要进行修改。本页介绍 API、Web 应用和移动应用的环境变量，以及如何在演示 API 和本地 API 之间进行选择。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 安装您所用项目的[前置条件](./prerequisites)
- 克隆您想要参与的项目仓库
- 查看[项目概览](./project-overview)，了解您的项目需要哪些 API 模块

</div>

## 通用模式

1. 在项目根目录中查找 `dotenv.sample.txt` 或 `.env.sample`。
2. 将其复制为 `.env`。
3. 根据需要编辑其中的值。

```bash
# Example for a project with .env.sample
cp .env.sample .env

# Example for a project with dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**切勿将 `.env` 文件提交到版本控制系统。** 它们包含数据库凭据、API 密钥和 JWT 密钥等敏感信息。所有 ChurchApps 项目都已在 `.gitignore` 中包含 `.env`，但提交前请务必再次确认。
:::

## 选择 API 目标

最重要的决定是前端 API 请求应指向何处。有两种选择：

### 选项 1：演示 API（推荐用于前端开发）

使用共享的演示环境。无需本地 API 或数据库设置。它运行 `main` 分支的最新代码，其示例数据每晚重新生成。

```bash
# Base URL pattern
https://api.demo.churchapps.org/{module}

# Example module URLs
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
预发布环境（`api.staging.churchapps.org`、`api.staging.lessons.church` 及相关主机）已停用。部分示例 `.env` 文件可能仍包含预发布网址；请将其替换为本页所示的演示或本地值。目前不存在共享的非生产环境 Lessons API -- 如需使用，请在本地运行 [LessonsApi](https://github.com/ChurchApps/LessonsApi)（它监听 `8090` 端口）。
:::

### 选项 2：本地 API

在您的计算机上运行 Api 项目。需要 MySQL 8.0 以上版本，并为每个模块创建数据库。请参阅 [API 本地设置](../api/local-setup)指南。

```bash
# Base URL pattern
http://localhost:8084/{module}

# Example module URLs
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## API 环境变量

核心 **Api** 项目（`.env.sample`）的配置项最多。以下是关键变量：

### 共享设置

| 变量 | 说明 | 示例 |
|----------|-------------|---------|
| `ENVIRONMENT` | 运行环境 | `dev` |
| `SERVER_PORT` | 本地开发服务器的 HTTP 端口 | `8084` |
| `ENCRYPTION_KEY` | 用于敏感数据的 192 位加密密钥 | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | 用于签署 JSON Web Token 的密钥 | `jwt-secret-dev` |
| `FILE_STORE` | 上传文件的存储位置（`disk` 或 `s3`） | `disk` |
| `CORS_ORIGIN` | 允许的 CORS 来源（本地开发使用 `*`） | `*` |

### 数据库连接

单个基础网址即可让 API 连接到 MySQL。API 会根据此基础网址为每个模块（`/membership`、`/attendance`、`/content`、`/giving`、`/messaging`、`/doing`、`/reporting`）派生一个数据库。

| 变量 | 示例 |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
请将 `root:password` 替换为您实际的 MySQL 凭据。运行 API 之前，每个模块的数据库都必须已存在。使用 `npm run initdb` 可为所有模块创建结构，或使用 `npm run initdb:membership` 仅为单个模块创建。
:::

### WebSocket 设置

| 变量 | 说明 | 示例 |
|----------|-------------|---------|
| `SOCKET_PORT` | WebSocket 服务器的端口 | `8087` |
| `SOCKET_URL` | 客户端连接 WebSocket 的网址 | `ws://localhost:8087` |

---

## Web 应用环境变量

### B1Admin（React + Vite）

示例文件：`.env.sample`

| 变量 | 说明 | 示例（演示） |
|----------|-------------|----------------|
| `REACT_APP_STAGE` | 环境名称 | `demo` |
| `PORT` | 开发服务器端口 | `3101` |
| `REACT_APP_API_BASE` | 所有 ChurchApps API 的统一基础网址（`/membership`、`/attendance`、`/content`、`/giving`、`/messaging`、`/doing`、`/reporting` 会自动追加） | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | 内容分发网址 | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google Analytics ID（可选） | `UA-123456789-1` |

对于本地 API 开发，请将基础网址指向您的本地环境：

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App（Next.js）

示例文件：`.env.sample`

| 变量 | 说明 | 示例（演示） |
|----------|-------------|----------------|
| `NEXT_PUBLIC_API_BASE` | 所有 ChurchApps API 的统一基础网址（`/membership`、`/attendance`、`/content`、`/giving`、`/messaging`、`/doing`、`/reporting` 会自动追加） | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | 内容分发网址 | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google Analytics ID（可选） | `UA-123456789-1` |

:::info
对于需要在浏览器中可用的环境变量，Next.js 要求使用 `NEXT_PUBLIC_` 前缀。仅限服务器端使用的变量则无需此前缀。
:::

### LessonsApp（Next.js）

示例文件：`dotenv.sample.txt`

| 变量 | 说明 | 示例（本地 LessonsApi） |
|----------|-------------|----------------------------|
| `STAGE` | 环境阶段（本地开发时保持未设置或设为 `dev`） | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | Lessons API 网址 | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | 内容分发网址 | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | 用于登录的 ChurchApps API 基础网址（仅当 `STAGE` 未设置或为 `dev` 时生效） | `https://api.demo.churchapps.org` |

---

## 移动应用环境变量

### B1Mobile（React Native / Expo）

示例文件：`dotenv.sample.txt`

| 变量 | 说明 | 示例（演示） |
|----------|-------------|----------------|
| `STAGE` | 环境名称 | `dev` |
| `MEMBERSHIP_API`、`ATTENDANCE_API`、`GIVING_API`、`DOING_API`、`MESSAGING_API`、`CONTENT_API` | 每个 ChurchApps API 模块对应一个网址（未设置时默认使用生产环境） | `https://api.demo.churchapps.org/membership` |
| `LESSONS_API` | Lessons API（独立主机；目前没有共享的非生产环境） | `https://api.lessons.church` |
| `CONTENT_ROOT` | 内容分发网址 | `https://democontent.churchapps.org` |
| `LESSONS_ROOT` | Lessons 网站网址 | `https://lessons.church` |

:::info
移动应用不使用 `REACT_APP_` 或 `NEXT_PUBLIC_` 前缀。环境变量的访问由 Expo 配置处理。
:::

---

## 快速参考：示例文件位置

| 项目 | 示例文件 |
|---------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
