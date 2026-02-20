---
title: "环境变量"
---

# 环境变量

<div class="article-intro">

每个 ChurchApps 项目都使用 `.env` 文件进行本地配置。每个项目都包含一个示例文件供你复制和自定义。本页介绍 API、Web 应用和移动应用的环境变量，包括如何在暂存和本地 API 目标之间选择。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 为你的项目安装[前置条件](./prerequisites)
- 克隆你想要开发的项目仓库
- 查看[项目概览](./project-overview)以了解你的项目需要哪些 API 模块

</div>

## 通用模式

1. 在项目根目录查找 `dotenv.sample.txt` 或 `.env.sample`。
2. 将其复制为 `.env`。
3. 根据需要编辑值。

```bash
# 对于使用 .env.sample 的项目
cp .env.sample .env

# 对于使用 dotenv.sample.txt 的项目
cp dotenv.sample.txt .env
```

:::warning
**切勿将 `.env` 文件提交到版本控制。** 它们包含数据库凭据、API 密钥和 JWT 密钥等敏感信息。所有 ChurchApps 项目都在 `.gitignore` 中包含了 `.env`，但在提交前请始终仔细检查。
:::

## 选择 API 目标

最重要的决定是你的前端将 API 调用指向哪里。有两个选项：

### 选项 1：暂存 API（推荐用于前端开发）

使用共享的暂存环境。无需本地 API 或数据库配置。

```bash
# 基础 URL 模式
https://api.staging.churchapps.org/{module}

# 示例模块 URL
https://api.staging.churchapps.org/membership
https://api.staging.churchapps.org/attendance
https://api.staging.churchapps.org/content
https://api.staging.churchapps.org/giving
https://api.staging.churchapps.org/messaging
https://api.staging.churchapps.org/doing
```

### 选项 2：本地 API

在你的机器上运行 Api 项目。需要 MySQL 8.0+ 并为每个模块创建数据库。参见 [API 本地配置](../api/local-setup)指南。

```bash
# 基础 URL 模式
http://localhost:8084/{module}

# 示例模块 URL
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## API 环境变量

核心 **Api** 项目（`.env.sample`）配置最多。以下是关键变量：

### 共享设置

| 变量 | 描述 | 示例 |
|----------|-------------|---------|
| `ENVIRONMENT` | 运行时环境 | `dev` |
| `SERVER_PORT` | 本地开发服务器的 HTTP 端口 | `8084` |
| `ENCRYPTION_KEY` | 用于敏感数据的 192 位加密密钥 | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | 用于签署 JSON Web Token 的密钥 | `jwt-secret-dev` |
| `FILE_STORE` | 上传文件的存储位置（`disk` 或 `s3`） | `disk` |
| `CORS_ORIGIN` | 允许的 CORS 来源（本地开发用 `*`） | `*` |

### 数据库连接

每个 API 模块有自己的 MySQL 数据库和连接字符串：

| 变量 | 数据库 |
|----------|----------|
| `MEMBERSHIP_CONNECTION_STRING` | `mysql://root:password@localhost:3306/membership` |
| `ATTENDANCE_CONNECTION_STRING` | `mysql://root:password@localhost:3306/attendance` |
| `CONTENT_CONNECTION_STRING` | `mysql://root:password@localhost:3306/content` |
| `GIVING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/giving` |
| `MESSAGING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/messaging` |
| `DOING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/doing` |

:::tip
请将 `root:password` 更新为你实际的 MySQL 凭据。在运行 API 之前必须创建每个数据库。使用 `npm run initdb` 为所有模块创建架构，或使用 `npm run initdb:membership` 为单个模块创建。
:::

### WebSocket 设置

| 变量 | 描述 | 示例 |
|----------|-------------|---------|
| `SOCKET_PORT` | WebSocket 服务器端口 | `8087` |
| `SOCKET_URL` | 客户端连接的 WebSocket URL | `ws://localhost:8087` |

---

## Web 应用环境变量

### B1Admin（React + Vite）

示例文件：`.env.sample`

| 变量 | 描述 | 示例（暂存） |
|----------|-------------|-------------------|
| `REACT_APP_STAGE` | 环境名称 | `demo` |
| `PORT` | 开发服务器端口 | `3101` |
| `REACT_APP_MEMBERSHIP_API` | Membership API URL | `https://api.staging.churchapps.org/membership` |
| `REACT_APP_ATTENDANCE_API` | Attendance API URL | `https://api.staging.churchapps.org/attendance` |
| `REACT_APP_GIVING_API` | Giving API URL | `https://api.staging.churchapps.org/giving` |
| `REACT_APP_CONTENT_ROOT` | 内容分发 URL | `https://content.staging.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google Analytics ID（可选） | `UA-123456789-1` |

用于本地 API 开发时，取消注释并使用 `localhost` 变体：

```bash
REACT_APP_MEMBERSHIP_API=http://localhost:8084/membership
REACT_APP_ATTENDANCE_API=http://localhost:8084/attendance
REACT_APP_GIVING_API=http://localhost:8084/giving
REACT_APP_CONTENT_API=http://localhost:8084/content
REACT_APP_DOING_API=http://localhost:8084/doing
REACT_APP_MESSAGING_API=http://localhost:8084/messaging
```

### B1App（Next.js）

示例文件：`.env.sample`

| 变量 | 描述 | 示例（暂存） |
|----------|-------------|-------------------|
| `NEXT_PUBLIC_MEMBERSHIP_API` | Membership API URL | `https://api.staging.churchapps.org/membership` |
| `NEXT_PUBLIC_ATTENDANCE_API` | Attendance API URL | `https://api.staging.churchapps.org/attendance` |
| `NEXT_PUBLIC_GIVING_API` | Giving API URL | `https://api.staging.churchapps.org/giving` |
| `NEXT_PUBLIC_MESSAGING_API` | Messaging API URL | `https://api.staging.churchapps.org/messaging` |
| `NEXT_PUBLIC_CONTENT_API` | Content API URL | `https://api.staging.churchapps.org/content` |
| `NEXT_PUBLIC_CONTENT_ROOT` | 内容分发 URL | `https://staging.churchapps.org/content` |
| `NEXT_PUBLIC_CHURCH_APPS_URL` | ChurchApps 基础 URL | `https://staging.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google Analytics ID（可选） | `UA-123456789-1` |

:::info
Next.js 要求任何需要在浏览器中可用的环境变量使用 `NEXT_PUBLIC_` 前缀。仅服务器端使用的变量不需要此前缀。
:::

### LessonsApp（Next.js）

示例文件：`dotenv.sample.txt`

| 变量 | 描述 | 示例（暂存） |
|----------|-------------|-------------------|
| `STAGE` | 环境阶段 | `staging` |
| `NEXT_PUBLIC_LESSONS_API` | Lessons API URL | `https://api.staging.lessons.church` |
| `NEXT_PUBLIC_CONTENT_ROOT` | 内容分发 URL | `https://api.staging.lessons.church/content` |
| `NEXT_PUBLIC_CHURCH_APPS_URL` | ChurchApps 基础 URL | `https://staging.churchapps.org` |

---

## 移动应用环境变量

### B1Mobile（React Native / Expo）

示例文件：`dotenv.sample.txt`

| 变量 | 描述 | 示例（暂存） |
|----------|-------------|-------------------|
| `STAGE` | 环境名称 | `dev` |
| `MEMBERSHIP_API` | Membership API URL | `https://api.staging.churchapps.org/membership` |
| `MESSAGING_API` | Messaging API URL | `https://api.staging.churchapps.org/messaging` |
| `ATTENDANCE_API` | Attendance API URL | `https://api.staging.churchapps.org/attendance` |
| `GIVING_API` | Giving API URL | `https://api.staging.churchapps.org/giving` |
| `DOING_API` | Doing API URL | `https://api.staging.churchapps.org/doing` |
| `CONTENT_API` | Content API URL | `https://api.churchapps.org/content` |
| `CONTENT_ROOT` | 内容分发 URL | `https://content.staging.churchapps.org` |
| `LESSONS_ROOT` | 课程站点 URL | `https://staging.lessons.church` |

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
