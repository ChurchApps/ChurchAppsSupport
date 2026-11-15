---
title: "Zapier"
description: "将 B1 Admin 连接到 Zapier，即可在新增人员、奉献和小组成员时启动自动化，并将记录写回 B1，无需编写任何代码。"
---

# Zapier

<div class="article-intro">

Zapier 上官方的 B1.church 应用程序，让 Zap 能够响应教会中的事件（新增人员、新奉献、新小组成员等），并将记录写回 B1。无需编写代码，也无需任何基础设施——只需在 Zapier 的拖放式编辑器中完成设置，粘贴 API 密钥，然后开启 Zap 即可。

</div>

:::caution 等待 Zapier 审核
B1.church 应用程序已建置完成并可正常运作，但仍在等待 Zapier 的审核，才会公开出现在 Zap 编辑器的应用程序目录中。在获得批准之前，只有受邀的账户可以使用。以下内容说明的是获批后的运作方式。
:::

<div class="prereqs">
<h4>开始之前</h4>

- 一个 [Zapier](https://zapier.com) 账户（免费方案即可应付少量的 Zap）
- 一位在 B1Admin 中具有 **Edit Settings** 权限的教会管理员（你需要建立 API 密钥）
- 对你想做的事情有一个构想，例如"当 B1 中新增人员时，将其加入我的 Mailchimp 名单"

</div>

## 触发器与操作 {#triggers-and-actions}

| 类型 | 内容 | B1 事件／端点 |
|---|---|---|
| **Trigger** | New Person | `person.created` |
| **Trigger** | Updated Person | `person.updated` |
| **Trigger** | New Donation | `donation.created` |
| **Trigger** | New Group Member | `group.member.added` |
| **Trigger** | New Form Submission | `form.submission.created` |
| **Action** | Create Person | 新增一位人员 |
| **Action** | Add Donation | 记录一笔奉献 |
| **Action** | Add Group Member | 将人员加入小组 |
| **Action** | Find Person | 依 ID、电子邮件或姓名查找人员；若无人符合则任务失败 |

这些触发器与操作可以自由搭配 Zapier 支持的 7,000 多个应用程序使用。

## 设置 {#setup}

### 1. 建立 B1 API 密钥 {#1-create-a-b1-api-key}

1. 在 B1Admin 中前往 **Settings → Developer → API Keys**。
2. 点击 **New API Key**，为其命名（例如"Zapier"），并选择 Zap 所需的权限范围。
3. **重要**：务必包含 **`settings:write`** 权限范围。连接时，Zapier 会将密钥与 B1 的 webhook 清单进行核对；开启 Zap 时，B1 触发器也会代你注册 webhook——两者都需要 `settings:write`。没有此权限的密钥即使你的 Zap 只使用 B1 操作，连接测试也会失败。
4. 同时授予操作所需的权限范围——例如"Add Donation"操作需要 `donations:write`，"Create Person"需要 `people:write`。
5. 保存。完整的 `cak_…` 密钥**只会显示一次**——请务必复制。

### 2. 将 Zapier 连接到 B1 {#2-connect-zapier-to-b1}

1. 在 Zapier 中建立新的 Zap。
2. 第一次选择 B1 的触发器或操作时，Zapier 会要求你**登录 B1.church**。
3. 将第 1 步的 API 密钥粘贴到 **API Key** 中（**API URL** 留空），然后点击 **Yes, Continue**。Zapier 会向你的教会验证该密钥。

该连接会保存在 Zapier 中，并可供你账户下的每个 Zap 重复使用。

### 3. 建立 Zap {#3-build-the-zap}

选择一个触发器，然后加入一个或多个操作步骤。以下为范例。

## 常见范例 {#common-recipes}

### 将 B1 的新人员加入 Mailchimp {#add-new-b1-people-to-mailchimp}

- **触发器**——B1：New Person
- **操作**——Mailchimp：Add/Update Subscriber。将 B1 的 `name__first`、`name__last`、`contactInfo__email` 分别对应到 Mailchimp 的 First Name／Last Name／Email 栏位。

### 以比内置连接器更丰富的卡片格式，将奉献发布到 Slack 频道 {#post-donations-to-a-slack-channel-with-a-richer-card-than-the-built-in-connector}

- **触发器**——B1：New Donation
- **操作**——Slack：Send Channel Message。可编排任何版面——按钮、附件等——这些是内置的 [Slack 连接器](./slack-discord.md)无法做到的。

### 将新的小组成员加入 Google 群组 {#add-new-group-members-to-a-google-group}

- **触发器**——B1：New Group Member
- **操作**——Filter by Zapier：仅当触发器中的 `groupId` 是你关注的 B1 小组时才继续
- **操作**——B1：Find Person（使用触发器中的 `personId` 取得电子邮件）
- **操作**——Google Groups：Add Member

### 将表单提交转寄到专案追踪工具 {#forward-form-submissions-to-a-project-tracker}

- **触发器**——B1：New Form Submission
- **操作**——Notion／Linear／Asana／Trello：Create page／issue／task

## 触发器的底层运作方式 {#how-triggers-work-under-the-hood}

触发器采用 **REST hook**，而非轮询——Zapier 不会每 15 分钟就去询问 B1 一次。开启 Zap 时，Zapier 会要求 B1 注册一个指向 Zapier 私有网址的 webhook；事件发生时，B1 会将数据包 POST 到 Zapier，你的 Zap 会在**数秒内**启动。关闭 Zap 时，Zapier 会要求 B1 删除该 webhook——不会留下任何孤立的订阅。

这表示触发器只会针对 Zap 开启**之后**发生的事件触发。没有回溯补发的机制——开启 Zap 并不会重新执行昨天的奉献。

## 限制与注意事项 {#limits--notes}

- **同一个触发器的多个 Zap**各自会注册自己的 B1 webhook——不会产生冲突，但若你在检视 **Settings → Developer → Webhooks** 时看到三个相同的 `Zapier — donation.created` 项目，请不必惊讶。
- **Zap 设置中的测试资料**——建立 Zap 时，Zapier 会要求示例资料以对应栏位。如果 B1 中有最近符合条件的事件，它会拉取最新的一笔；否则会使用应用程序定义中的模拟示例。
- **操作失败会以 Zap 错误的形式显示**在 Zapier 的任务记录中。常见原因是 API 密钥缺少正确的权限范围（例如 "Add Donation" 操作需要 `donations:write`）。请以正确的权限范围重新建立密钥，并在 Zapier 中重新连接。
- **外发 API 调用配额**——操作所进行的每一次 B1 API 调用，都会计入你的 Zapier 任务配额，而不会计入 B1 这一端的任何用量。

## 故障排除 {#troubleshooting}

- **连接时出现"Authentication failed"**——API 密钥有误、已被删除，或缺少 `settings:write`。请在 B1Admin 中建立包含 `settings:write` 以及 Zap 所涉及资源权限范围的新密钥（权限范围无法在现有密钥上更改），然后更新连接。
- **触发器从未启动**——请确认 webhook 确实已注册：在 B1Admin 的 **Settings → Developer → Webhooks** 中，现在应该会出现一行名为"Zapier — &lt;event&gt;"的项目。如果没有，很可能是你开启 Zap 时该 API 密钥缺少 `settings:write`。请修正密钥，然后将 Zap 关闭再重新开启。
- **触发器重复启动两次**——如果 Zapier 未收到确认回应，偶尔会重新传送。如果你需要严格的去重，请在唯一 ID（例如人员的 `id`）上加入 "Filter by Zapier" 步骤。

## 另见 {#see-also}

- [Make](./make.md)：相同的模式，不同的平台
- [Slack 与 Discord](./slack-discord.md)：无需 Zapier 的较简单聊天通知
- [Webhook（开发者参考）](/docs/developer/api/webhooks)
