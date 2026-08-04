---
title: "使用 Docker 自行托管"
---

# 使用 Docker 自行托管

<div class="article-intro">

在任何安装了 Docker 的机器上——家用服务器、每月 5 美元的 VPS,或是自有机房中的一台主机——运行属于你自己的私有 B1 Admin、B1 会员门户、API 和 MySQL 数据库实例。一条 `docker compose up` 命令即可构建并启动一切。如果你完全不想自己维护服务器,请参见[在 Railway 上自行托管](./railway-template)这一托管替代方案。

</div>

## 快速开始

<div class="prereqs">
<h4>你需要准备的东西</h4>

- 带有 Compose v2 的 [Docker Engine](https://docs.docker.com/engine/install/)（Docker Desktop 已内置）
- 初次构建期间约需要 4 GB 可用内存（各 Web 应用均从源码构建）
- Git,或者仅需要原始的 `docker-compose.yml` 文件

</div>

```bash
git clone https://github.com/ChurchApps/B1Admin.git
cd B1Admin
docker compose up -d
```

首次运行需要 10 到 20 分钟：它会从你克隆下来的代码构建 B1Admin,并直接从各自的 GitHub 代码仓库构建 API 和 B1App。之后再启动只需几秒钟。

当全部四个服务都启动后：

1. 打开 **http://localhost:3101**（B1 Admin）。
2. 点击**注册**并创建你的账号。第一个创建的账号会自动成为服务器管理员。
3. 按照应用内的提示创建你的第一个教会。

数据库结构会由 API 容器的启动迁移脚本自动创建——无需手动执行任何 SQL。

| 服务 | URL |
|---------|-----|
| B1Admin（工作人员/管理端） | http://localhost:3101 |
| B1App（会员门户/网站） | http://localhost:3000 |
| API | http://localhost:8084 |
| MySQL | 仅内部访问（compose 网络内的 `mysql:3306`) |

## 配置

所有设置都存放在与 `docker-compose.yml` 同目录下的一个 `.env` 文件中。每个变量在 localhost 环境下都有可直接使用的默认值,因此在你需要自定义之前,这个文件都是可选的。

```bash
# .env — everything is optional; shown with defaults
MYSQL_ROOT_PASSWORD=churchapps
JWT_SECRET=please-change-this-jwt-secret
ENCRYPTION_KEY=PleaseChangeThisDockerDefaultKey   # exactly 32 characters

# Public URLs (change these when exposing beyond localhost)
API_URL=http://localhost:8084
B1ADMIN_URL=http://localhost:3101
B1APP_URL=http://localhost:3000
SOCKET_URL=ws://localhost:8084

# Email — see the Railway guide's Email section for provider walkthroughs
MAIL_SYSTEM=
SMTP_HOST=
SMTP_USER=
SMTP_PASS=
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

在正式投入使用之前,请务必修改 `MYSQL_ROOT_PASSWORD`、`JWT_SECRET` 和 `ENCRYPTION_KEY`（任意 32 字符的字符串）。

:::warning
这些 `*_URL` 值会**在构建时被烘焙进各个 Web 应用**（Vite/Next.js 的标准行为）。在 `.env` 中修改它们需要重新构建,而不仅仅是重启：

```bash
docker compose up -d --build
```
:::

首次启动后再修改 MySQL 密码,还需要同步在 MySQL 内部更新该密码——数据卷会保留旧的凭证。

## 将其暴露到公网

在前面加一个反向代理,并为每个服务指定一个域名即可。用 [Caddy](https://caddyserver.com/) 的话大致如下：

```
admin.yourchurch.org { reverse_proxy localhost:3101 }
app.yourchurch.org   { reverse_proxy localhost:3000 }
api.yourchurch.org   { reverse_proxy localhost:8084 }
```

然后在 `.env` 中设置对应的 URL 并重新构建：

```bash
API_URL=https://api.yourchurch.org
B1ADMIN_URL=https://admin.yourchurch.org
B1APP_URL=https://app.yourchurch.org
SOCKET_URL=wss://api.yourchurch.org
```

```bash
docker compose up -d --build
```

聊天和实时通知所使用的 WebSocket 与 API 共用同一个端口,因此 `SOCKET_URL` 就是把 API 的 URL 改成 `wss://` 而已。

## 邮件、捐赠、多站点与集成

以下这些功能与 Railway 部署方式完全一致——使用相同的环境变量,只是改为写在你的 `.env` 文件里,而不是在 Railway 控制台中设置（compose 文件会把它们原样传递给 API）：

- **[邮件 / SMTP](./railway-template#1-email-highly-recommended)** —— 强烈建议配置;没有它,会员将无法重置密码
- **[多站点](./railway-template#3-multi-site-multiple-churches-on-one-instance)** —— 一个实例上可容纳数量不限的教会,在管理界面中管理
- **[在线捐赠](./railway-template#4-online-giving-stripe--paypal)** —— 在管理界面中按教会配置,而非通过环境变量
- **[可选集成](./railway-template#6-optional-feature-integrations)** —— `OPENAI_API_KEY`、`YOUTUBE_API_KEY`、`PEXELS_KEY`、`VIMEO_TOKEN`、`API_BIBLE_KEY`、`WEB_PUSH_PUBLIC_KEY`/`WEB_PUSH_PRIVATE_KEY`、`GOOGLE_RECAPTCHA_SECRET_KEY`

## 数据、备份与文件存储

两个具名的 Docker 数据卷保存了全部状态：

| 数据卷 | 内容 |
|--------|------|
| `mysql-data` | 全部数据库结构 |
| `api-content` | 已上传的文件——照片、文档、网站图片（挂载在 `/app/content`) |

用一行命令即可备份数据库（可以用 cron 定时执行）：

```bash
docker compose exec mysql mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" --all-databases > backup-$(date +%F).sql
```

通过复制数据卷来备份已上传的文件：

```bash
docker run --rm -v b1admin_api-content:/data -v "$PWD":/backup alpine tar czf /backup/content-$(date +%F).tgz -C /data .
```

对于大型媒体库,你可以把文件存储切换为 S3,而非本地数据卷——设置 `FILE_STORE=S3` 以及 [Railway 指南的文件存储一节](./railway-template#5-file-storage)中描述的 `AWS_*` 系列变量即可。

## 更新

API 和 B1App 从各自 GitHub 代码仓库的 `main` 分支构建;B1Admin 则从你本地的克隆构建。

```bash
git pull                              # update B1Admin
docker compose build --pull           # rebuild all images against latest main
docker compose up -d
```

数据库迁移会在 API 容器启动时自动执行。

如果想固定版本而不是始终跟随 `main` 分支,可以在 `.env` 中把构建上下文指向某个标签：

```bash
API_CONTEXT=https://github.com/ChurchApps/Api.git#v1.2.3
B1APP_CONTEXT=https://github.com/ChurchApps/B1App.git#v1.2.3
```

开发者也可以把这些变量指向本地的检出目录（例如 `API_CONTEXT=../Api`)。

## 故障排查

| 症状 | 可能原因 | 修复方式 |
|---------|--------------|-----|
| `api` 容器反复重启 | MySQL 尚未就绪,或迁移失败 | 执行 `docker compose logs api`——迁移脚本会打印出是哪个模块失败了 |
| 登录时被重定向到 `api.churchapps.org` | Web 应用构建时未传入 `custom` 构建阶段参数 | 重新构建：`docker compose build --no-cache b1admin b1app` |
| 在 `.env` 中改了一个 URL 但没有生效 | URL 是在构建时被烘焙进去的 | `docker compose up -d --build` |
| 提示“请检查你的邮箱”但没有收到邮件 | `MAIL_SYSTEM=SMTP` 但凭证有误 | 修正凭证,或取消设置 `MAIL_SYSTEM` 以禁用邮件功能 |
| 聊天/实时功能没有反应 | 浏览器无法访问 `SOCKET_URL` | 必须是 `wss://`,运行在 HTTPS 之后,并代理到 8084 端口 |
| 在小型 VPS 上构建失败 | `next build` 过程中内存不足 | 添加交换空间,或在另一台机器上构建后用 `docker save`/`load` 迁移 |

仍然遇到问题？请在 [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) 提交一个 issue,并附上 `docker compose logs` 的输出。

## 相关文章

- **[在 Railway 上自行托管](./railway-template)** —— 托管方案的替代选择,以及双方共用的部署后配置指南
- **[初始设置](../../getting-started/initial-setup)** —— 教会创建完成后的第一步
- **[本地 API 环境搭建](../api/local-setup)** —— 直接运行整套技术栈进行开发
