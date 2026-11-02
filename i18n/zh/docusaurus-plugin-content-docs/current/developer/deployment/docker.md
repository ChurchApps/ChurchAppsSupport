---
title: "使用 Docker 自托管"
---

# 使用 Docker 自托管

<div class="article-intro">

在任何安装了 Docker 的机器上运行你自己的私有 B1 Admin、B1 成员门户和网站、API 以及 MySQL 数据库实例——无论是家用服务器、小型 VPS 还是本地部署的机器。一条命令即可安装，一条命令即可升级，并且每次升级前都会先进行备份。如果你根本不想管理服务器，请参阅[在 Railway 上自托管](./railway-template)，了解托管式替代方案。

</div>

## 快速开始

<div class="prereqs">
<h4>你需要准备</h4>

- 一台 Linux 机器（或安装了 WSL 或 Git Bash 的 macOS / Windows——`b1` 辅助工具是一个 bash 脚本），并安装 [Docker Engine](https://docs.docker.com/engine/install/) 和 Compose v2（已包含在 Docker Desktop 中）
- 约 2 GB 内存和 5 GB 磁盘空间
- 如需公开网站：一个指向该机器的域名，并且 80 和 443 端口可以访问

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

如果省略 `--domain`，则在 `http://localhost` 上运行。安装程序会创建一个 `b1church` 文件夹，写入一个包含全新生成密钥的 `.env` 文件，从 GitHub Container Registry 拉取预构建的镜像，并等待 API 报告健康状态。不会在你的机器上进行任何构建，因此首次启动需要一两分钟。

完成后：

1. 打开 **https://church.example.org/admin**（或 http://localhost/admin），并点击 **Register**（注册）。第一个账号会自动成为服务器管理员。
2. 按照应用内的提示创建你的第一个教会。该教会的网站和成员门户将在创建后立即在 **https://church.example.org/** 上线。

所有内容都运行在同一个域名之后：

| 路径 | 服务 |
|------|------|
| `/` | B1App —— 教会网站和成员门户 |
| `/admin` | B1Admin —— 工作人员仪表板 |
| `/api` | API、上传的文件以及实时更新的 websocket |

HTTPS 是自动的：内置的 [Caddy](https://caddyserver.com/) 代理会为 `.env` 中的域名获取并续订 Let's Encrypt 证书。只有 80 和 443 端口对外开放；数据库只能在 Docker 网络内部访问。

## `b1` 命令

安装程序会在 `docker-compose.yml` 旁边留下一个 `deploy/b1` 脚本。这是日常使用中你唯一需要的东西：

| 命令 | 作用 |
|---------|--------------|
| `./deploy/b1 upgrade` | 拉取当前版本，进行备份，重启，并验证 API 是否健康 |
| `./deploy/b1 upgrade 2026.10.1` | 同上，但固定到特定版本 |
| `./deploy/b1 backup` | 将数据库、上传的文件和 `.env` 快照到 `backups/<timestamp>/` |
| `./deploy/b1 restore backups/<timestamp>` | 恢复某个快照（运行期间 API 会停止） |
| `./deploy/b1 rollback` | 恢复最新的备份，包括备份时所在的版本 |
| `./deploy/b1 status` | 已安装的版本和容器健康状态 |
| `./deploy/b1 logs api` | 实时跟踪某个服务的日志 |

版本以单个带版本号的捆绑包形式发布，因此三个镜像始终保持匹配。`.env` 中的 `B1_VERSION=stable` 会跟踪最新版本；将其设置为特定版本即可固定。发布说明位于 [B1Admin 版本发布](https://github.com/ChurchApps/B1Admin/releases)。

## 配置

所有设置都位于 `docker-compose.yml` 旁边的 `.env` 中。安装程序会填写必填项：

```bash
B1_VERSION=stable
DOMAIN=church.example.org
SITE_ADDRESS=church.example.org          # Caddy 提供服务的地址；本地安装则为 http://localhost
PUBLIC_URL=https://church.example.org    # 浏览器和电子邮件访问网站的地址
MYSQL_ROOT_PASSWORD=…                    # 自动生成
JWT_SECRET=…                             # 自动生成
ENCRYPTION_KEY=…                         # 自动生成，恰好 32 个字符——存储凭据后切勿更改

# 电子邮件——强烈推荐；没有它，成员将无法自行重置密码
MAIL_SYSTEM=SMTP
SMTP_HOST=smtp.resend.com
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxx
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@church.example.org
```

编辑 `.env` 后，使用 `docker compose up -d` 使其生效。网页应用会根据浏览器中的地址判断应与哪个 API 通信，因此更改域名只需更新 `SITE_ADDRESS` 和 `PUBLIC_URL` 并重启——无需重新构建。

:::warning
请妥善保管 `.env`。`ENCRYPTION_KEY` 用于保护存储的支付网关和存储凭据；没有它，备份将无法解密这些凭据。出于这个原因，`./deploy/b1 backup` 会包含一份副本。
:::

### 以后迁移到域名

如果你最初安装在 `localhost` 上，之后希望将其公开：将 DNS 指向该机器，然后在 `.env` 中设置 `DOMAIN`、`SITE_ADDRESS`（裸域名）和 `PUBLIC_URL`（`https://` + 域名），接着执行 `docker compose up -d`。Caddy 会在首次请求时获取证书。

## 电子邮件、奉献、多站点与集成

这些功能与在 Railway 上的使用方式完全相同——使用相同的环境变量，只是在 `.env` 中设置，而不是在 Railway 控制台中设置：

- **[电子邮件 / SMTP](./railway-template#1-email-highly-recommended)** —— Resend、Brevo 和 Gmail 的服务商配置指南
- **[多站点](./railway-template#3-multi-site-multiple-churches-on-one-instance)** —— 每个实例可以托管无限数量的教会。`/` 会提供 slug 为 `DEFAULT_CHURCH_SLUG` 的教会服务（第一个教会的 slug 为 `church`）；将额外的域名指向该主机，并在 B1Admin 的 **设置 → 域名** 中进行映射
- **[在线奉献](./railway-template#4-online-giving-stripe--paypal)** —— 在管理界面中为每个教会单独配置
- **[可选集成](./railway-template#6-optional-feature-integrations)** —— `OPENAI_API_KEY`、`YOUTUBE_API_KEY`、`PEXELS_KEY`、`VIMEO_TOKEN`、`API_BIBLE_KEY`、`GOOGLE_RECAPTCHA_SECRET_KEY`
- **[推送通知](#push-notifications)** —— `WEB_PUSH_*`；安装程序会将其留空，因此在你添加之前推送功能处于关闭状态

在自托管实例上，邀请函和教会发送的其他电子邮件会自动启用（托管服务则会将这些功能置于人工审核之后，以保护其发信信誉）。

## 推送通知 {#push-notifications}

在服务器拥有 VAPID 密钥对之前，浏览器和移动网页推送保持关闭状态。安装程序不会生成密钥对。在你添加之前，移动网页应用的通知页面会提示站点尚未开启推送功能。

1. 生成密钥对。这只需要 Docker：

   ```bash
   docker run --rm node:lts-alpine npx --yes web-push generate-vapid-keys
   ```

2. 将这两个值添加到 `.env`。`WEB_PUSH_SUBJECT` 是可选的，它是推送服务所看到的联系地址：

   ```bash
   WEB_PUSH_PUBLIC_KEY=…
   WEB_PUSH_PRIVATE_KEY=…
   WEB_PUSH_SUBJECT=mailto:admin@example.org
   ```

3. 应用这些设置：

   ```bash
   docker compose up -d
   ```

4. 要确认，请在 B1Admin 中打开 **Server Admin → Server Health**（服务器管理 → 服务器健康）。两个 Web Push 密钥都应显示为已配置。之后，成员即可在移动网页应用中开启通知。

:::warning
成员注册之后，请保持使用相同的密钥。更改密钥会使所有现有订阅失效，并且每台设备都必须重新注册。
:::

## 数据、备份与文件存储

三个具名的 Docker 卷保存了全部状态：

| 卷 | 内容 |
|--------|----------|
| `b1church_mysql-data` | 所有数据库架构 |
| `b1church_api-content` | 上传的文件——照片、文档、网站图片 |
| `b1church_caddy-data` | TLS 证书 |

`./deploy/b1 backup` 会将前两者以及 `.env` 的一致性快照写入 `backups/<timestamp>/`。可以使用 cron 进行定时备份，并将该文件夹复制到机器之外的其他位置：

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

如果媒体库较大，可以将文件存储切换到 S3——设置 `FILE_STORE=S3` 以及 [Railway 指南文件存储部分](./railway-template#5-file-storage)中描述的 `AWS_*` 变量。数据库备份不包括 S3 对象；请在该存储桶上启用版本控制。

## 更新

```bash
./deploy/b1 upgrade
```

依次执行：拉取版本、进行备份、重新创建容器、在 API 启动时运行所有待执行的数据库迁移，并等待 API 的健康检查通过。如果任何步骤失败，它会停止并提示你运行 `./deploy/b1 rollback`，该命令会恢复该备份以及之前的版本。迁移只能向前执行；回滚始终意味着恢复快照。

如果你之前使用的是 beta 版 compose 文件（即从源代码构建镜像的版本），在拥有 `.env` 后升级的方式相同：该文件默认使用 `MYSQL_ROOT_PASSWORD=churchapps`，因此请将其放入 `.env`，同时添加 `PUBLIC_URL` 和 `SITE_ADDRESS`，用当前的文件替换 `docker-compose.yml` 和 `deploy/`，然后运行 `./deploy/b1 upgrade`。

## 从源代码构建

开发者可以在本地构建镜像，而不是拉取它们：

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

`.env` 中的 `API_CONTEXT` 和 `B1APP_CONTEXT` 可将构建指向本地检出的代码（例如 `../Api`）或某个 git 引用。

## 故障排除

| 症状 | 可能原因 | 解决方法 |
|---------|--------------|--------------|
| `api` 容器不断重启 | 迁移失败或数据库密码错误 | `./deploy/b1 logs api`——迁移会输出失败的模块 |
| `api` 日志显示 "ENCRYPTION_KEY must be exactly 32 characters" | `.env` 中的密钥被手动编辑或被截断 | 恢复原来的 32 个字符的密钥（只有在尚未存储任何凭据时才生成新密钥） |
| 浏览器显示证书警告 | DNS 尚未指向此处，或 80/443 端口被阻止 | 修复 DNS 或防火墙；Caddy 会自动重试 |
| `/` 显示仪表板而非网站 | 尚未创建教会，或 `DEFAULT_CHURCH_SLUG` 不匹配 | 创建教会，或在 **Settings → Church**（设置 → 教会）中设置 slug |
| 显示"请检查您的电子邮件"，但没有邮件到达 | `MAIL_SYSTEM=SMTP` 但凭据错误 | 修复凭据，或取消设置 `MAIL_SYSTEM` 以禁用电子邮件 |
| 移动网页应用提示推送通知未开启 | 服务器上没有 VAPID 密钥 | 按照[推送通知](#push-notifications)中的说明添加它们 |
| 聊天/实时功能无声 | 前面的其他代理阻止了 websocket | websocket 位于同一端口的 `/api/` 上；请允许 `Upgrade` 请求头 |
| `install` 拒绝执行："database volume already exists" | 之前安装残留的数据 | 执行 `docker compose down -v` 进行清除，或编写 `.env` 并使用 `upgrade` |

仍然无法解决？请在 [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) 提交 issue，并附上 `./deploy/b1 logs` 的输出。

## 相关文章

- **[在 Railway 上自托管](./railway-template)** —— 托管式替代方案，以及共享的部署后配置指南
- **[初始设置](../../getting-started/initial-setup)** —— 创建教会之后的第一步
- **[本地 API 设置](../api/local-setup)** —— 直接运行整套环境以进行开发
