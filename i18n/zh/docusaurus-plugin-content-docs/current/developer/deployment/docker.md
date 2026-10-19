---
title: "使用 Docker 自行托管"
---

# 使用 Docker 自行托管

<div class="article-intro">

在任何安装了 Docker 的机器上运行你自己的私有 B1 Admin、B1 会员门户和网站、API 以及 MySQL 数据库实例——可以是家庭服务器、小型 VPS 或本地机房设备。一条命令完成安装，一条命令完成升级，且每次升级前都会先进行备份。如果你不想管理服务器，请参阅[在 Railway 上自托管](./railway-template)，这是托管式替代方案。

</div>

## 快速开始

<div class="prereqs">
<h4>所需条件</h4>

- 一台 Linux 机器（或安装了 WSL 或 Git Bash 的 macOS / Windows——`b1` 辅助工具是一个 bash 脚本），并安装 [Docker Engine](https://docs.docker.com/engine/install/) 和 Compose v2（Docker Desktop 已包含）
- 约 2 GB 内存和 5 GB 磁盘空间
- 如需公开站点：一个指向该机器的域名，并确保端口 80 和 443 可访问

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

如果省略 `--domain`，则在 `http://localhost` 上运行。安装程序会创建一个 `b1church` 文件夹，写入一个包含新生成密钥的 `.env` 文件，从 GitHub Container Registry 拉取预构建的镜像，并等待 API 报告健康状态。整个过程不会在你的机器上进行构建，因此首次启动需要一两分钟。

安装完成后：

1. 打开 **https://church.example.org/admin**（或 http://localhost/admin），然后点击 **Register**。第一个账户会自动成为服务器管理员。
2. 按照应用内的提示创建你的第一个教会。一旦教会创建完成，其网站和会员门户将立即可以通过 **https://church.example.org/** 访问。

所有服务都运行在同一个域名之下：

| 路径 | 服务 |
|------|---------|
| `/` | B1App——教会网站和会员门户 |
| `/admin` | B1Admin——工作人员管理后台 |
| `/api` | API、上传的文件以及实时更新 websocket |

HTTPS 是自动配置的：内置的 [Caddy](https://caddyserver.com/) 代理会为 `.env` 中的域名获取并续期 Let's Encrypt 证书。只有端口 80 和 443 对外开放；数据库仅可在 Docker 网络内部访问。

## `b1` 命令

安装程序会在 `docker-compose.yml` 旁边留下一个 `deploy/b1` 脚本。日常使用中，你只需要它：

| 命令 | 作用 |
|---------|--------------|
| `./deploy/b1 upgrade` | 拉取当前版本，进行备份，重启，并验证 API 健康状态 |
| `./deploy/b1 upgrade 2026.10.1` | 同上，但固定为指定版本 |
| `./deploy/b1 backup` | 将数据库、上传的文件和 `.env` 快照保存到 `backups/<timestamp>/` |
| `./deploy/b1 restore backups/<timestamp>` | 恢复某个快照（运行期间 API 会停止） |
| `./deploy/b1 rollback` | 恢复最新的备份，包括备份时所处的版本 |
| `./deploy/b1 status` | 已安装的版本和容器健康状态 |
| `./deploy/b1 logs api` | 实时查看某个服务的日志 |

版本以单个带版本号的打包文件发布，因此三个镜像始终保持一致。`.env` 中的 `B1_VERSION=stable` 会跟随最新版本；如需固定版本，请将其设置为具体版本号。版本说明位于 [B1Admin releases](https://github.com/ChurchApps/B1Admin/releases)。

## 配置

所有设置都位于 `docker-compose.yml` 旁边的 `.env` 中。安装程序会填写必需的配置项：

```bash
B1_VERSION=stable
DOMAIN=church.example.org
SITE_ADDRESS=church.example.org          # what Caddy serves; http://localhost for a local install
PUBLIC_URL=https://church.example.org    # how browsers and emails reach the site
MYSQL_ROOT_PASSWORD=…                    # generated
JWT_SECRET=…                             # generated
ENCRYPTION_KEY=…                         # generated, exactly 32 characters — never change it after storing credentials

# Email — strongly recommended; without it members can't reset their own passwords
MAIL_SYSTEM=SMTP
SMTP_HOST=smtp.resend.com
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxx
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@church.example.org
```

编辑 `.env` 后，使用 `docker compose up -d` 使其生效。Web 应用会根据浏览器中的地址确定要连接的 API，因此更改域名只需更新 `SITE_ADDRESS` 和 `PUBLIC_URL` 并重启——无需重新构建。

:::warning
请妥善保管 `.env`。`ENCRYPTION_KEY` 用于保护已存储的支付网关和存储凭据；没有它，备份无法解密这些凭据。出于这个原因，`./deploy/b1 backup` 会包含一份副本。
:::

### 之后迁移到域名

如果你最初安装在 `localhost` 上，之后希望将其公开：将 DNS 指向该机器，然后在 `.env` 中设置 `DOMAIN`、`SITE_ADDRESS`（裸域名）和 `PUBLIC_URL`（`https://` 加域名），再执行 `docker compose up -d`。Caddy 会在第一次请求时获取证书。

## 电子邮件、奉献、多站点和集成

这些功能与在 Railway 上的完全相同——使用相同的环境变量，只是在 `.env` 中设置，而不是在 Railway 控制台中设置：

- **[电子邮件 / SMTP](./railway-template#1-email-highly-recommended)**——Resend、Brevo 和 Gmail 的服务商配置指南
- **[多站点](./railway-template#3-multi-site-multiple-churches-on-one-instance)**——每个实例可包含无限数量的教会。`/` 提供 slug 为 `DEFAULT_CHURCH_SLUG` 的教会（第一个教会的 slug 为 `church`）；将其他域名指向该机器，并在 B1Admin 中通过 **Settings → Domains** 进行映射
- **[在线奉献](./railway-template#4-online-giving-stripe--paypal)**——按教会在管理界面中配置
- **[可选集成](./railway-template#6-optional-feature-integrations)**——`OPENAI_API_KEY`、`YOUTUBE_API_KEY`、`PEXELS_KEY`、`VIMEO_TOKEN`、`API_BIBLE_KEY`、`WEB_PUSH_*`、`GOOGLE_RECAPTCHA_SECRET_KEY`

在自托管实例上，邀请邮件和其他由教会发出的电子邮件会自动启用（托管服务则会对这些功能进行人工审核，以保护其发件信誉）。

## 数据、备份和文件存储

三个命名的 Docker 卷保存所有状态：

| 卷 | 内容 |
|--------|----------|
| `b1church_mysql-data` | 所有数据库架构 |
| `b1church_api-content` | 上传的文件——照片、文档、网站图片 |
| `b1church_caddy-data` | TLS 证书 |

`./deploy/b1 backup` 会将前两个卷以及 `.env` 的一致性快照写入 `backups/<timestamp>/`。可以使用 cron 定时执行，并将该文件夹复制到机器之外的位置：

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

对于大型媒体库，你可以将文件存储切换为 S3——设置 `FILE_STORE=S3` 以及 [Railway 指南文件存储部分](./railway-template#5-file-storage)中描述的 `AWS_*` 变量。数据库备份不包含 S3 对象；请在该存储桶中启用版本控制。

## 更新

```bash
./deploy/b1 upgrade
```

依次执行以下步骤：拉取版本、进行备份、重新创建容器、在 API 启动时运行待执行的数据库迁移，并等待 API 的健康检查通过。如果任何步骤失败，它会停止并提示你运行 `./deploy/b1 rollback`，该命令会恢复该备份以及之前的版本。迁移只能向前执行；回滚始终意味着恢复快照。

如果你使用的是 beta 版 compose 文件（从源代码构建镜像）升级，只要你已有 `.env`，操作方式相同：该文件默认使用 `MYSQL_ROOT_PASSWORD=churchapps`，因此请将其与 `PUBLIC_URL` 和 `SITE_ADDRESS` 一起写入 `.env`，用当前文件替换 `docker-compose.yml` 和 `deploy/` 目录，然后运行 `./deploy/b1 upgrade`。

## 从源代码构建

开发者可以在本地构建镜像，而不是拉取镜像：

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

`.env` 中的 `API_CONTEXT` 和 `B1APP_CONTEXT` 会将构建指向本地检出目录（例如 `../Api`）或 git 引用。

## 故障排除

| 症状 | 可能原因 | 解决方法 |
|---------|--------------|-----|
| `api` 容器反复重启 | 迁移失败或数据库密码错误 | 运行 `./deploy/b1 logs api`——迁移会输出失败的模块 |
| `api` 日志显示 "ENCRYPTION_KEY must be exactly 32 characters" | `.env` 中的密钥被手动编辑或被截断 | 恢复原来的 32 个字符的密钥（仅当尚未存储任何凭据时才生成新密钥） |
| 浏览器显示证书警告 | DNS 尚未指向此处，或端口 80/443 被阻止 | 修复 DNS 或防火墙；Caddy 会自动重试 |
| `/` 显示仪表板而不是网站 | 尚未创建教会，或 `DEFAULT_CHURCH_SLUG` 不匹配 | 创建教会，或在 **Settings → Church** 中设置 slug |
| 显示 "Check your email" 但没有收到邮件 | `MAIL_SYSTEM=SMTP` 且凭据错误 | 修正凭据，或取消设置 `MAIL_SYSTEM` 以禁用电子邮件 |
| 聊天/实时功能无响应 | 前面的另一个代理阻止了 websocket | 套接字位于同一端口的 `/api/` 上；允许 `Upgrade` 请求头 |
| `install` 拒绝执行："database volume already exists" | 早期安装遗留的数据 | 执行 `docker compose down -v` 清除数据，或编写 `.env` 后使用 `upgrade` |

仍然无法解决？请在 [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) 提交问题，并附上 `./deploy/b1 logs` 的输出。

## 相关文章

- **[在 Railway 上自托管](./railway-template)**——托管式替代方案，以及共享的部署后配置指南
- **[初始设置](../../getting-started/initial-setup)**——教会创建后的第一步
- **[本地 API 设置](../api/local-setup)**——直接运行完整环境以进行开发
