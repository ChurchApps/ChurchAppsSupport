---
title: "在 Railway 上自托管"
---

# 在 Railway 上自托管

<div class="article-intro">

ChurchApps 发布了一个一键式 [Railway](https://railway.com) 模板，可为你的教会提供一个私有实例，包括 B1 Admin、B1 成员门户、API 以及 MySQL 数据库——全部运行在你自己拥有并直接付费的基础设施上。本指南大约 15 分钟即可让你上线，之后还会介绍大多数教会最终希望进行的部署后配置。

</div>

## 快速开始

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. 点击上方的 **Deploy on Railway** 按钮。
2. 登录 Railway（或创建一个免费账号），并添加付款方式。
3. 无需更改任何内容，直接点击 **Deploy**——每个变量都有合理的默认值。
4. 等待 5–10 分钟，直到四个服务都显示为绿色。
5. 打开 **B1Admin** 服务的网址，点击 **Register**（注册），然后创建你的账号。第一个账号会自动成为服务器管理员。
6. 按照应用内的提示创建你的第一个教会。

至此，你已拥有一个功能完整的 ChurchApps 实例。以下内容都属于可选的完善工作。

:::tip
该部署目前处于 **beta** 阶段。如果你遇到文档未涵盖的问题，请在 [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) 提交 issue，并附上部署日志。
:::

<div class="prereqs">
<h4>你需要准备</h4>

- 一个免费的 [Railway](https://railway.com) 账号
- 在 Railway 上绑定的信用卡（小型教会约每月 $15–25；参见[费用](#costs)）
- 约 15 分钟完成初始部署
- *可选但强烈建议稍后配置：* SMTP 凭据和自定义域名

</div>

## 部署内容

该模板会在单个 Railway 项目中部署四个服务：

| 服务 | 用途 | 部署后的网址 |
|---------|---------|------------------|
| **MySQL** | 存储所有数据（一个实例，多个架构） | 仅限内部访问 |
| **Api** | 会员、内容、奉献、出勤等模块的后端 | `https://api-<id>.up.railway.app` |
| **B1Admin** | 工作人员/管理员网页应用 | `https://b1admin-<id>.up.railway.app` |
| **B1App** | 面向成员的网页应用和教会网站 | `https://b1app-<id>.up.railway.app` |

数据库架构会在首次启动时由 API 的启动迁移自动创建。

## 首次配置

现在你已经上线，以下是大多数教会接下来会设置的内容，按大致的优先级排列。

### 1. 电子邮件（强烈推荐） {#1-email-highly-recommended}

如果没有电子邮件，成员仍然可以注册并使用系统，但**他们无法重置忘记的密码**——管理员必须代为处理。设置 SMTP 大约需要 5 分钟。

在 Railway 控制台中，打开 **Api** 服务 → **Variables**（变量），然后添加：

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<your provider host>
SMTP_USER=<your username>
SMTP_PASS=<your password or API key>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

值得了解的三个服务商：

#### Resend —— 最简单的免费选项（每天 100 封邮件）

1. 在 [resend.com](https://resend.com) 注册。
2. 验证一个发信域名（或先使用 `onboarding@resend.dev` 测试发件人开始）。
3. 创建一个 API 密钥。
4. 设置 `SMTP_HOST=smtp.resend.com`、`SMTP_USER=resend`、`SMTP_PASS=re_xxxxxxxxx`。

#### Gmail —— 个人使用免费（每天约 500 封）

1. 为 Google 账号启用两步验证。
2. 创建一个[应用专用密码](https://myaccount.google.com/apppasswords)。
3. 设置 `SMTP_HOST=smtp.gmail.com`、`SMTP_USER=your-address@gmail.com`、`SMTP_PASS=<16 位应用专用密码>`。

#### AWS SES —— 规模化时最便宜

1. 在 AWS 中验证一个发信域名。
2. 如果要发送给未验证的地址，需要先退出 SES 沙盒模式。
3. 在 **SES → SMTP Settings → Create credentials**（创建凭据）下创建 SMTP 凭据。
4. 设置 `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`、`SMTP_USER=AKIA...`、`SMTP_PASS=<SES SMTP 密码>`。

保存变量后，Api 服务会自动重新部署。可以通过为测试账号触发密码重置来验证。

:::warning
如果你设置了 `MAIL_SYSTEM=SMTP` 但凭据错误，注册看起来会成功，但验证邮件永远不会到达。请修正凭据，或取消设置 `MAIL_SYSTEM`，以回退到无邮件模式。
:::

### 2. 自定义域名

默认的 `*.up.railway.app` 网址可以正常使用，但大多数教会都希望使用自己的域名。

对于每个网页服务（B1Admin 和 B1App）：

1. 在 Railway 中打开该服务 → **Settings** → **Networking**（网络）。
2. 点击 **+ Custom Domain**（自定义域名），并输入主机名：
   - B1Admin 使用 `admin.yourchurch.org`
   - B1App 使用 `app.yourchurch.org`（或 `www`）
3. 将 Railway 显示的 CNAME 记录添加到你的 DNS 服务商。
4. 等待几分钟让 DNS 生效。Railway 会自动签发 TLS 证书。

然后更新 **Api** 服务的变量，使邮件中的链接使用新域名：

```
B1ADMIN_ROOT=https://admin.yourchurch.org
```

在 **B1Admin** 服务上：

```
REACT_APP_API_BASE=https://api.yourchurch.org   （如果你还设置了自定义 API 域名）
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org
```

`{subdomain}` 是字面量令牌——它会在运行时被替换为每个教会的子域名（参见下文的多站点）。

### 3. 多站点（一个实例上的多个教会） {#3-multi-site-multiple-churches-on-one-instance}

ChurchApps 从设计上就是多租户的——一个部署可以托管任意数量的教会，每个教会都拥有自己的人员、小组和网站。新教会完全通过管理界面添加；无需更改基础设施。

#### 添加更多教会

1. 在 **B1 Admin** 中，进入 **Settings → Manage Church → Switch Church → Create New**（设置 → 管理教会 → 切换教会 → 新建）。
2. 每个教会都有唯一的**子域名 slug**（例如 `firstchurch`、`gracecommunity`）。
3. 新教会将拥有自己的数据、成员、网站和奉献设置，与同一实例上的其他教会完全隔离。

#### 将每个教会路由到其自己的网址

有两种方式可以公开提供教会服务：

| 模式 | 示例 | 设置 |
|---------|---------|---------|
| **基于路径**（开箱即用） | `app.yourchurch.org/firstchurch` | 无需额外设置 |
| **基于子域名**（网址更简洁） | `firstchurch.yourchurch.org` | 通配符 DNS + 通配符自定义域名 |

在 Railway 上使用**基于子域名**的路由：

1. 在你的 DNS 服务商处，创建一条通配符 CNAME：`*.yourchurch.org → <b1app railway target>`。
2. 在 Railway 中，进入 B1App 服务 → **Settings → Networking**，添加 `*.yourchurch.org` 作为自定义域名。
3. 在 **B1Admin** 服务上，设置 `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org`。

重新部署后，每个教会的网站将自动通过 `<their-subdomain>.yourchurch.org` 提供服务。

:::info
通配符自定义域名需要付费的 Railway 套餐。基于路径的路由适用于所有套餐，功能完全相同——只是网址栏中的样子不够美观。
:::

### 4. 在线奉献（Stripe / PayPal） {#4-online-giving-stripe--paypal}

奉献是**在管理界面中按教会单独配置**的，而非通过环境变量——这样每个教会都可以使用自己的商户账户。

1. 从 [Stripe](https://dashboard.stripe.com/)（Developers → API keys）或 [PayPal](https://developer.paypal.com/)（My Apps & Credentials）获取开发者凭据。
2. 在 B1 Admin 中，进入 **Settings → Giving Settings**（设置 → 奉献设置）。
3. 选择你的服务商，粘贴公钥和私钥，并配置手续费处理方式。
4. 可选：在 Railway 中为 **Api** 服务添加 `GOOGLE_RECAPTCHA_SECRET_KEY`，以保护公开的奉献表单免受机器人攻击。

### 5. 文件存储 {#5-file-storage}

该模板会为 Api 服务挂载一个 **1 GB 的持久化卷**，用于存放成员照片、讲道文件和上传的文档。

如需扩容：打开 Api 服务 → **Volumes**（卷）→ 调整大小滑块。

对于规模更大的部署（100 GB 以上或大量并发上传），请在 **Api** 服务上设置以下变量，切换到 S3：

```
FILE_STORE=S3
AWS_S3_BUCKET=<your-bucket>
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_REGION=us-east-2
```

卷中已有的文件不会自动迁移——在切换变量之前，请先将它们复制到存储桶中。

### 6. 可选功能集成 {#6-optional-feature-integrations}

这些变量可以解锁特定功能，并且都可以稍后通过 Railway 控制台添加。请在 **Api** 服务上设置它们。

| 变量 | 启用的功能 |
|----------|--------------------|
| `OPENAI_API_KEY` *或* `OPENROUTER_API_KEY` | AI 辅助搜索和内容建议 |
| `YOUTUBE_API_KEY` | YouTube 讲道搜索和嵌入 |
| `PEXELS_KEY` | 网站构建器的图库照片选择器 |
| `VIMEO_TOKEN` | Vimeo 讲道支持 |
| `API_BIBLE_KEY` | 课程和内容中的圣经经文查询 |
| `YOUVERSION_API_KEY` | YouVersion 圣经集成 |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | 浏览器推送通知（[生成 VAPID 密钥对](./docker#push-notifications)） |
| `HUBSPOT_KEY` | 可选的新登记 CRM 同步 |

## 更新

每个服务都关联到其各自的 GitHub 仓库。推送到 `ChurchApps/Api`、`ChurchApps/B1Admin` 或 `ChurchApps/B1App` 的 `main` 分支会自动触发重新部署。

要固定到特定版本，请将每个服务的 **Branch**（分支）设置更改为标签或发布分支。这是生产环境推荐的配置——从 `main` 自动部署意味着你会继承任何进行中的工作。

## 费用 {#costs}

小型教会（少于 200 名成员、流量较小）的实际费用范围：

| 组成部分 | 大约月费 |
|-----------|---------------------|
| Railway 基础费用 | $5 |
| MySQL 插件 | $5 + 约 $1 存储费 |
| 3 个网页服务的计算资源 | 合计 $3–10 |
| 1 GB 卷 | $0.25 |
| **合计** | **约每月 $15–25** |

费用会随流量、照片上传量和数据库规模线性增长。Railway 会在项目的 **Usage**（用量）标签页中显示实时用量——你可以在那里设置消费上限，以限制风险。

## 故障排除

| 症状 | 可能原因 | 解决方法 |
|---------|--------------|--------------|
| 构建失败，报错 `EBUSY: rmdir '/app/node_modules/.cache'` | Nixpacks 缓存挂载冲突 | 在受影响的服务上设置 `NIXPACKS_NO_CACHE=true` |
| B1Admin 构建失败，报错 `Missing: @types/...` | `package-lock.json` 不同步 | 拉取最新的 `main` 分支 |
| Api 部署卡在 "Deploying" | 健康检查失败——`/health` 没有返回 200 | 查看部署日志；通常是缺少必需的环境变量 |
| B1Admin 显示"请检查您的电子邮件"，但没有邮件到达 | 设置了 `MAIL_SYSTEM=SMTP`，但凭据缺失或错误 | 修正凭据，或取消设置 `MAIL_SYSTEM` 以禁用电子邮件 |
| 登录重定向到 `api.churchapps.org` | `REACT_APP_STAGE` 为 `prod` | 在 B1Admin 服务上设置 `REACT_APP_STAGE=custom` |
| 所有子域名教会显示相同的内容 | `REACT_APP_B1_WEBSITE_URL` 不包含 `{subdomain}` 令牌 | 将其设置为例如 `https://{subdomain}.yourchurch.org` |
| 自定义域名显示 "Application not found" | DNS 尚未传播，或 Railway 证书待签发 | 等待 5 分钟；使用 `dig admin.yourchurch.org` 检查 DNS |

如果你遇到此列表之外的问题，请在 [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) 提交 issue，并附上部署日志。

## 相关文章

- **[使用 Docker 自托管](./docker)** —— 相同的技术栈，运行在你自己的硬件或 VPS 上
- **[初始设置](../../getting-started/initial-setup)** —— 创建教会之后的第一步
- **[网站初始设置](../../b1-admin/website/initial-setup)** —— 配置你教会的公开网站
- **[奉献设置](../../b1-admin/donations/online-giving-setup)** —— 接入 Stripe 或 PayPal
- **[本地 API 设置](../api/local-setup)** —— 在本地运行整套环境以进行开发
- **[API 部署（AWS）](./apis)** —— ChurchApps 官方 SaaS 的部署方式
