---
title: "在 Railway 上自托管"
---

# 在 Railway 上自托管

<div class="article-intro">

ChurchApps 发布了一个一键式 [Railway](https://railway.com) 模板,可为你的教会提供专属的私有实例,包含 B1 Admin、B1 成员门户、API 以及一个 MySQL 数据库——全部运行在你自己拥有并直接付费的基础设施上。本指南将带你在大约 15 分钟内完成上线,然后介绍大多数教会最终都会需要的部署后配置。

</div>

## 快速入门

[![在 Railway 上部署](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. 点击上方的**在 Railway 上部署**按钮。
2. 登录 Railway(或创建一个免费账户)并添加一种付款方式。
3. 直接点击**部署**,无需修改任何内容——每个变量都有合理的默认值。
4. 等待 5–10 分钟,让四个服务全部变为绿色。
5. 打开 **B1Admin** 服务的 URL,点击**注册**并创建你的账户。第一个账户会自动成为服务器管理员。
6. 按照应用内的提示创建你的第一个教会。

就这样。你现在已经拥有一个完全可用的 ChurchApps 实例。下面的内容都是可选的锦上添花。

:::tip
该部署目前处于 **beta** 阶段。如果你遇到文档未涵盖的问题,请在 [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) 上提交 issue,并附上部署日志。
:::

<div class="prereqs">
<h4>你需要准备的</h4>

- 一个免费的 [Railway](https://railway.com) 账户
- 一张已绑定到 Railway 的信用卡(小型教会大约每月 $15–25;参见[费用](#费用))
- 大约 15 分钟用于完成初始部署
- *可选但强烈建议后续配置:* SMTP 凭据和自定义域名

</div>

## 部署的内容

该模板会在同一个 Railway 项目中配置四个服务:

| 服务 | 用途 | 部署后的 URL |
|---------|---------|------------------|
| **MySQL** | 存储所有数据(一个实例,多个 schema) | 仅内部可访问 |
| **Api** | 支持成员管理、内容、奉献、出勤等的后端 | `https://api-<id>.up.railway.app` |
| **B1Admin** | 员工/管理员 Web 应用 | `https://b1admin-<id>.up.railway.app` |
| **B1App** | 面向成员的 Web 应用及教会网站 | `https://b1app-<id>.up.railway.app` |

数据库 schema 会在首次启动时由 API 的启动迁移自动创建。

## 首次配置

上线之后,以下是大多数教会接下来会设置的内容,大致按优先级排序。

### 1. 邮件(强烈推荐)

没有邮件功能,成员仍然可以注册和使用系统,但**无法自行重置忘记的密码**——需要管理员代为处理。配置 SMTP 大约需要 5 分钟。

在 Railway 控制台中,打开 **Api** 服务 → **Variables**,并添加:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<你的服务商主机>
SMTP_USER=<你的用户名>
SMTP_PASS=<你的密码或 API 密钥>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

值得了解的三个服务商:

#### Resend——最简单的免费方案(每天 100 封邮件)

1. 在 [resend.com](https://resend.com) 注册。
2. 验证一个发送域名(或先使用 `onboarding@resend.dev` 测试发件人)。
3. 创建一个 API 密钥。
4. 设置 `SMTP_HOST=smtp.resend.com`、`SMTP_USER=resend`、`SMTP_PASS=re_xxxxxxxxx`。

#### Gmail——个人使用免费(每天约 500 封)

1. 在 Google 账户上启用双重身份验证。
2. 创建一个[应用专用密码](https://myaccount.google.com/apppasswords)。
3. 设置 `SMTP_HOST=smtp.gmail.com`、`SMTP_USER=your-address@gmail.com`、`SMTP_PASS=<16 位应用专用密码>`。

#### AWS SES——大规模使用时最便宜

1. 在 AWS 中验证一个发送域名。
2. 如果要发送给未验证的地址,需退出 SES 沙盒模式。
3. 在 **SES → SMTP Settings → Create credentials** 下创建 SMTP 凭据。
4. 设置 `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`、`SMTP_USER=AKIA...`、`SMTP_PASS=<SES SMTP 密码>`。

保存变量后,Api 服务会自动重新部署。可以通过在测试账户上触发一次密码重置来验证是否生效。

:::warning
如果你设置了 `MAIL_SYSTEM=SMTP` 但凭据有误,注册看起来会成功,但验证邮件永远不会到达。请修正凭据,或取消设置 `MAIL_SYSTEM` 以回退到无邮件模式。
:::

### 2. 自定义域名

默认的 `*.up.railway.app` URL 可以正常使用,但大多数教会都希望使用自己的域名。

对每个 Web 服务(B1Admin 和 B1App):

1. 在 Railway 中打开该服务 → **Settings** → **Networking**。
2. 点击 **+ Custom Domain** 并输入主机名:
   - B1Admin 使用 `admin.yourchurch.org`
   - B1App 使用 `app.yourchurch.org`(或 `www`)
3. 将 Railway 显示的 CNAME 记录添加到你的 DNS 服务商。
4. 等待几分钟让 DNS 生效。Railway 会自动配置 TLS 证书。

然后更新 **Api** 服务的变量,让邮件中的链接使用新域名:

```
B1ADMIN_ROOT=https://admin.yourchurch.org
```

以及在 **B1Admin** 服务上:

```
REACT_APP_API_BASE=https://api.yourchurch.org   (如果你也设置了自定义 API 域名)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org
```

`{subdomain}` 这个占位符是字面量——它会在运行时被替换为每个教会各自的子域名(见下方的多站点部分)。

### 3. 多站点(一个实例托管多个教会)

ChurchApps 在设计上是多租户的——一次部署可以托管任意数量的教会,每个教会都拥有各自独立的人员、小组和网站。新增教会完全通过管理界面完成,无需改动任何基础设施。

#### 添加更多教会

1. 在 **B1 Admin** 中,导航到**设置 → 管理教会 → 切换教会 → 新建**。
2. 每个教会都有一个唯一的**子域名标识**(例如 `firstchurch`、`gracecommunity`)。
3. 新教会会拥有自己的数据、成员、网站和奉献设置,与同一实例上的其他教会完全隔离。

#### 将每个教会路由到各自的 URL

有两种方式可以对外公开教会站点:

| 模式 | 示例 | 配置方式 |
|---------|---------|-------|
| **基于路径**(开箱即用) | `app.yourchurch.org/firstchurch` | 无需额外配置 |
| **基于子域名**(URL 更简洁) | `firstchurch.yourchurch.org` | 通配符 DNS + 通配符自定义域名 |

要在 Railway 上启用**基于子域名**的路由:

1. 在你的 DNS 服务商处创建一条通配符 CNAME:`*.yourchurch.org → <b1app railway target>`。
2. 在 Railway 中,进入 B1App 服务 → **Settings → Networking**,添加 `*.yourchurch.org` 作为自定义域名。
3. 在 **B1Admin** 服务上,设置 `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org`。

重新部署后,每个教会的网站会自动在 `<其子域名>.yourchurch.org` 上提供服务。

:::info
通配符自定义域名需要 Railway 的付费方案。基于路径的路由在任何方案下都可以使用,功能上完全等价——只是 URL 看起来不那么美观。
:::

### 4. 在线奉献(Stripe / PayPal)

奉献功能是**在管理界面中按教会逐一配置的**,而不是通过环境变量——这样每个教会都可以使用自己的商户账户。

1. 从 [Stripe](https://dashboard.stripe.com/)(Developers → API keys)或 [PayPal](https://developer.paypal.com/)(My Apps & Credentials)获取开发者凭据。
2. 在 B1 Admin 中,前往**设置 → 奉献设置**。
3. 选择你的服务商,粘贴公钥和密钥,并配置手续费处理方式。
4. 可选地在 Railway 的 **Api** 服务中添加 `GOOGLE_RECAPTCHA_SECRET_KEY`,以保护公开捐款表单不受机器人攻击。

### 5. 文件存储

该模板会为 Api 服务挂载一个 **1 GB 的持久化存储卷**,用于成员照片、讲道文件和上传的文档。

要扩容:打开 Api 服务 → **Volumes** → 调整大小滑块。

对于更大规模的部署(100+ GB 或大量并发上传),可以在 **Api** 服务上设置以下变量切换到 S3:

```
FILE_STORE=S3
AWS_S3_BUCKET=<your-bucket>
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_REGION=us-east-2
```

存储卷中已有的文件不会自动迁移——请在切换该变量之前先将它们复制到存储桶中。

### 6. 可选功能集成

以下变量可以解锁特定功能,并且都可以之后通过 Railway 控制台随时添加。请在 **Api** 服务上设置。

| 变量 | 启用的功能 |
|----------|--------------------|
| `OPENAI_API_KEY` *或* `OPENROUTER_API_KEY` | AI 辅助搜索和内容建议 |
| `YOUTUBE_API_KEY` | YouTube 讲道搜索和嵌入 |
| `PEXELS_KEY` | 网站构建器的图库图片选择器 |
| `VIMEO_TOKEN` | Vimeo 讲道支持 |
| `API_BIBLE_KEY` | 课程和内容中的圣经经文查询 |
| `YOUVERSION_API_KEY` | YouVersion 圣经集成 |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | 浏览器推送通知(生成一个 VAPID 密钥对) |
| `HUBSPOT_KEY` | 新注册的可选 CRM 同步 |

## 更新

每个服务都与各自对应的 GitHub 仓库相关联。推送到 `ChurchApps/Api`、`ChurchApps/B1Admin` 或 `ChurchApps/B1App` 的 `main` 分支会触发自动重新部署。

要锁定某个特定版本,请将各服务的 **Branch** 设置改为某个标签或发布分支。这是生产环境推荐的配置——从 `main` 自动部署意味着你会一并接收任何进行中的改动。

## 费用

一个小型教会(200 名成员以下,流量较小)的真实开销范围大致如下:

| 组成部分 | 大致月费用 |
|-----------|---------------------|
| Railway 基础费用 | $5 |
| MySQL 插件 | $5 + 约 $1 存储费 |
| 3 个 Web 服务的计算资源 | 合计 $3–10 |
| 1 GB 存储卷 | $0.25 |
| **合计** | **约 $15–25/月** |

费用会随流量、照片上传量和数据库大小线性增长。Railway 在项目的 **Usage** 标签页中展示实时用量——可在那里设置消费上限以控制支出。

## 故障排除

| 现象 | 可能原因 | 解决方法 |
|---------|--------------|-----|
| 构建失败并报 `EBUSY: rmdir '/app/node_modules/.cache'` | Nixpacks 缓存挂载冲突 | 在受影响的服务上设置 `NIXPACKS_NO_CACHE=true` |
| B1Admin 构建失败,报 `Missing: @types/...` | `package-lock.json` 不同步 | 拉取最新的 `main` |
| Api 部署卡在 "Deploying" | 健康检查失败——`/health` 未返回 200 | 查看部署日志;通常是缺少某个必需的环境变量 |
| B1Admin 显示"请查收邮件",但邮件未到达 | 设置了 `MAIL_SYSTEM=SMTP` 但凭据缺失或错误 | 修正凭据,或取消设置 `MAIL_SYSTEM` 以禁用邮件 |
| 登录跳转到 `api.churchapps.org` | `REACT_APP_STAGE` 为 `prod` | 在 B1Admin 服务上设置 `REACT_APP_STAGE=custom` |
| 各子域名教会显示的内容完全相同 | `REACT_APP_B1_WEBSITE_URL` 未包含 `{subdomain}` 占位符 | 将其设置为例如 `https://{subdomain}.yourchurch.org` |
| 自定义域名显示 "Application not found" | DNS 尚未生效,或 Railway 证书还在签发中 | 等待 5 分钟;用 `dig admin.yourchurch.org` 检查 DNS |

如果遇到未在此列表中的问题,请在 [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) 上提交 issue,并附上部署日志。

## 相关文章

- **[使用 Docker 自托管](./docker)**——在你自己的硬件或 VPS 上运行同一套技术栈
- **[初始设置](../../getting-started/initial-setup)**——教会创建后的第一步
- **[网站初始设置](../../b1-admin/website/initial-setup)**——配置教会的公开网站
- **[奉献设置](../../b1-admin/donations/online-giving-setup)**——接入 Stripe 或 PayPal
- **[本地 API 设置](../api/local-setup)**——在本地运行整套技术栈以进行开发
- **[API 部署(AWS)](./apis)**——官方 ChurchApps SaaS 的部署方式
