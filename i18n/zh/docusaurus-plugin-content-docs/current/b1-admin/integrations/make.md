---
title: "Make"
description: "将 B1 Admin 连接到 Make 以自动化工作流程：建立 API 密钥、设置 B1.church 触发器与操作，并排除常见错误。"
---

# Make

<div class="article-intro">

[Make](https://www.make.com)（前身为 Integromat）是一个可视化的工作流程自动化平台——与 Zapier 思路相近，但逻辑更灵活，规模较大时费用也更低。官方的 B1.church Make 应用程序让你可以建立"场景"，即时响应 B1 事件，并将记录写回 B1。

</div>

:::caution 尚未推出
B1.church Make 应用程序尚未发布到 Make 的应用程序目录中，因此你今天无法在场景中添加下方的 **B1.church** 模块。在此之前，请使用 [Zapier](./zapier.md)，或在 Make 的 **HTTP — Make a request** 模块中，使用 [API 密钥](/docs/developer/api/api-keys)调用 B1 的 [REST API](/docs/developer/api)。以下内容说明的是该应用程序正式推出后的运作方式。
:::

<div class="prereqs">
<h4>开始之前</h4>

- [Make](https://www.make.com) 账户（免费方案即可应付小型工作流程）
- 在 B1Admin 中具有 **Edit Settings** 权限的教会管理员
- 对你想建立的场景有一个大致的构想

</div>

## 模块 {#modules}

| 类型 | 内容 | B1 事件 / 端点 |
|---|---|---|
| **Instant Trigger** | Watch Events | 任何已订阅的 B1 事件（`person.created`、`donation.created` 等） |
| **Action** | Create Person | 新增一位人员 |
| **Action** | Add Donation | 记录一笔奉献 |
| **Action** | Add Group Member | 将人员加入小组 |
| **Search** | Search People | 按姓名或电子邮件查找人员 |

即时触发器让你选择要监听的事件——每个场景使用一个触发器模块，并针对每个事件进行设置。

## 设置 {#setup}

### 1. 建立 B1 API 密钥 {#1-create-a-b1-api-key}

1. 在 B1Admin 中前往 **Settings → Developer → API Keys**。
2. 点击 **New API Key**，将其命名为"Make"，并授予你所需的权限范围。
3. 如果你的任何场景使用即时触发器，请**包含 `settings:write`**——开启场景时，Make 会代你注册 webhook。
4. 同时授予操作模块所需的权限范围（例如 Add Donation 模块需要 `donations:write`）。
5. 保存并复制 `cak_…` 密钥。

### 2. 安装连接 {#2-install-the-connection}

1. 在 Make 中建立新场景，并将 **B1.church** 触发器模块拖到画布上。
2. 出现提示时，**创建连接**。将 API 密钥粘贴到 *API Key* 字段中，并将 *API Base URL* 保留为 `https://api.churchapps.org`（除非你正在测试 staging 环境）。
3. 点击 **Save**——Make 会通过读取你的教会资料来测试密钥。

该连接会保存在你的 Make 账户中，并可在各个场景之间重复使用。

### 3. 设置触发器 {#3-configure-the-trigger}

1. 打开 **Watch Events** 模块的设置。
2. 选择你想要的事件，例如 `donation.created`。
3. 保存。Make 会生成一个唯一的 webhook 网址，并在内部存储。

### 4. 添加后续模块 {#4-add-downstream-modules}

将 Make 数百种应用程序模块中的任何一个拖到画布上——Mailchimp、Google Sheets、Slack、HubSpot、你自己的 HTTP 端点等。将触发器的输出（`event`、`churchId`、`data.id`、`data.amount` 等）映射到它们的输入字段。Make 的 flatten / iterator / router / aggregator 模块，让你能够建立在 Zapier 中难以实现的分支与并行流程。

### 5. 开启场景 {#5-turn-the-scenario-on}

在场景标题栏中切换 **Active**。Make 会调用 B1 的 `POST /membership/webhooks` 来注册网址。从那一刻起，每个符合条件的 B1 事件都会即时流经该场景。

关闭场景时会调用 `DELETE /membership/webhooks/{id}`，因此不会留下任何孤立的订阅。

## 常见范例 {#common-recipes}

### 将奉献同步到 Google Sheet 供财务审核 {#sync-donations-to-a-google-sheet-for-finance-review}

- **触发器**——B1：Watch Events（`donation.created`）
- **操作**——Google Sheets：Add a Row。将 `data.donationDate`、`data.amount`、`data.personId`、`data.method`、`data.batchId` 映射到工作表的各个栏位中。

### 依奉献金额条件式发送 Slack 通知 {#conditional-slack-notification-by-donation-amount}

- **触发器**——B1：Watch Events（`donation.created`）
- **Router**：
  - 分支 A——Filter：`data.amount >= 1000` → Slack：发布到 `#major-gifts`
  - 分支 B——其余情况 → Slack：发布到 `#donations`

### 新人员 → CRM + 欢迎电子邮件 + Slack {#new-person--crm--welcome-email--slack}

- **触发器**——B1：Watch Events（`person.created`）
- **操作**——HubSpot：Create Contact
- **操作**——Mailgun：Send Welcome Email
- **操作**——Slack：通知 `#new-people`（并行执行——使用 Make 的 router）

## 即时触发器的运作方式 {#how-the-instant-trigger-works}

即时触发器基于 webhook，而非轮询——启用时，Make 会以其生成的网址和你选择的事件调用 `POST /membership/webhooks`。当该事件在 B1 中发生时，B1 会将数据包 POST 到 Make 的网址，你的场景会在数秒内执行。停用场景时会移除该 webhook。

触发器只会针对场景**处于启用状态时**发生的事件触发。不会回溯补发之前的事件。

## 限制与注意事项 {#limits--notes}

- **每个 Watch Events 模块一个事件**。若要监听多个事件，请为每个事件建立一个场景。
- **不提供签名验证**——Make 不会将 `X-B1-Signature` 传递给场景；其信任边界是 Make 中每个场景那个无法猜测的 webhook 网址。这是 Make 的常规做法。如果你需要明确的签名检查，请改用 [SDK](/docs/developer/api/webhooks#sdk-support) 建立自定义整合。
- **操作次数**——操作模块的每次 API 调用都会计入你的 Make 操作配额，而不会计入 B1 这一端的任何用量。

## 故障排除 {#troubleshooting}

- **连接测试失败**——最常见的原因是 API 密钥输入有误。请从 B1Admin 重新复制（完整密钥只会显示一次；如果你已遗失，请建立新的密钥）。
- **触发器模块无法启用**——请在 B1Admin 中查看 **Settings → Developer → Webhooks**。如果在启用场景后没有看到"Make — &lt;event&gt;"项目，表示该密钥缺少 `settings:write`。请更新密钥并重新启用。
- **操作返回 `403 Forbidden`**——API 密钥缺少该端点的权限范围。例如，Add Donation 需要 `donations:write`。请在 B1Admin 中更新密钥并重新测试。

## 缺少模块？ {#missing-a-module}

如果你需要的模块并不存在（例如针对我们尚未涵盖的端点的新操作），请发送电子邮件至 [support@churchapps.org](mailto:support@churchapps.org)。在此期间，Make 的 **HTTP — Make a request** 模块可以通过 `Authorization: Bearer cak_…` 标头调用任何 B1 端点。

## 另见 {#see-also}

- [Zapier](./zapier.md)：相同的模式，界面更简单，应用程序目录更庞大
- [Slack 与 Discord](./slack-discord.md)：无需 Make 即可使用的内置聊天通知
- [Webhook（开发者参考）](/docs/developer/api/webhooks)
