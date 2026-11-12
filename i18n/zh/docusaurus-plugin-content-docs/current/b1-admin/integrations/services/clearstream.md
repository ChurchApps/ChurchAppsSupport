---
title: "Clearstream"
description: "通过 Zapier 将 Clearstream 短信连接到 B1 Admin：在新奉献或表单提交时发送短信，并将收到的回复汇入为人员记录。"
---

# Clearstream

<div class="article-intro">

由任何 B1 事件触发 [Clearstream](https://clearstream.io) 短信——新人员、新奉献、表单提交、日历更新皆可——并将回复汇入为 B1 记录。Clearstream 的 Zapier 应用程序同时支持两个方向，因此整个设置只是一个范例，而无需自定义代码。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 一个 [Clearstream](https://clearstream.io) 账户，至少有一个名单并拥有短信额度
- 一个 [Zapier](https://zapier.com) 账户
- 一位在 B1Admin 中具有 **Edit Settings** 权限的用户

</div>

## 你可以设置的内容 {#what-you-can-wire-up}

| 方向 | 触发器 | 操作 |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream：Create/Update Subscriber + Send Text to Number |
| B1 → Clearstream | B1 `donation.created` | Clearstream：Send Text to List（例如通知财务团队） |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream：Send Text to a routing list（例如代祷请求团队） |
| Clearstream → B1 | New Incoming Text | B1：Create Person；并以对方发送的关键字为其加上标签 |

Clearstream 的 Zapier 操作包括：*Send Text to Number*、*Send Text to List*、*Create/Update Subscriber*、*Add Subscriber to Automated Workflow*、*Add Tag to Subscriber*、*Remove Subscriber From List*。

## 设置 {#setup}

### 1. 建立 B1 API 密钥 {#1-mint-a-b1-api-key}

在 **Settings → Developer → API Keys → New API Key** 中：

- `settings:write`——将密钥连接到 Zapier，以及 B1 注册触发器 webhook 时所必需
- `people:read`——用于依事件中的 `personId` 查找人员的姓名、电话或电子邮件
- （选填）`people:write`——如果你希望 Clearstream 的回复建立 B1 联络人

### 2. 建立"新奉献时发送短信"的 Zap {#2-build-the-text-on-new-gift-zap}

1. **触发器**——B1.church：New Donation
2. **操作**——B1.church：Find Person（使用奉献的 `personId`）
3. **操作**——Clearstream：Send Text to Number。将第 2 步中该人员的电话作为收件人，并撰写讯息（`"Thanks for your gift, {first}! …"`）。

开启 Zap。B1 会在启用时注册奉献 webhook；你可以在 **Settings → Developer → Webhooks** 中看到 `Zapier — donation.created` 出现。

### 3.（选填）将回复汇入为 B1 记录 {#3-optional-pull-replies-back-as-b1-records}

1. **触发器**——Clearstream：New Incoming Text
2. **操作**——Zapier 筛选：依关键字筛选，例如仅当短信内容以 `PRAY` 开头时才继续
3. **操作**——将短信内容存放到你的团队会看到的地方（Slack、Google Sheet，或 B1 任务）。B1 的 *Find Person* 只能依 ID、电子邮件或姓名查找人员，无法依电话查找，因此需要手动将回复与 B1 中的人员对应（或新增一个 Webhooks by Zapier 的 GET 请求，调用 B1 的 `/membership/people/search/phone?number=…` 端点）。

## 常见范例 {#common-recipes}

### 志愿者团队呼叫 {#volunteer-team-paging}

- **触发器**——B1.church：New Form Submission（依代祷请求表单 ID 筛选）
- **操作**——Clearstream：Send Text to List，收件名单为你的值班牧养团队。讯息内容撰写为 `New prayer request: {data.questions.0.answer}`。

### 初次到访者跟进序列 {#first-time-visitor-follow-up-sequence}

- **触发器**——B1.church：New Person，依该人员的会员状态筛选（例如 *Visitor*）
- **操作**——Clearstream：Add Subscriber to Automated Workflow。将 workflow ID 对应到预先建立的 7 天短信序列。

### 关键字驱动的小组加入 {#keyword-driven-group-join}

- **触发器**——Clearstream：New Incoming Text（筛选关键字 `MENS`）
- **操作**——B1.church：Create Person，使用发送者的姓名与电话（B1 的 *Find Person* 无法依电话查找人员，因此之后请在 **People** 中检查是否有重复记录）
- **操作**——B1.church：Add Group Member，将其加入男士事工小组

## 限制与注意事项 {#limits--notes}

- **Clearstream 以讯息计量短信用量**。每次 Send Text 操作会依内容长度与收件人数量消耗一个或多个额度——请查看你方案的额度。
- **电话必须为 E.164 格式**（例如 `+15555550199`），才能用于 *Send Text to Number*。B1 的人员记录会储存输入的任何内容；如果无法保证格式，请使用 *Formatter by Zapier — Numbers → Format Phone Number* 步骤。
- **B1 这一端无需任何标头**——Clearstream 的身份验证完全包含在其 Zapier 连接中。

## 故障排除 {#troubleshooting}

- **触发器从未启动**——在 Zap 开启后，**Settings → Developer → Webhooks** 应显示一行 `Zapier — <event>`。如果没有，表示 B1 API 密钥缺少 `settings:write`。请重新建立密钥并重新连接。
- **Clearstream 返回"Invalid phone number"**——收件人栏位不是 E.164 格式。请加入 Format Phone Number 步骤。
- **Send Text to List 返回 `403`**——Clearstream API 用户没有该名单的权限，或名单 ID 有误。名单 ID 可在 Clearstream 的名单详情页面中查看。

## 另见 {#see-also}

- [Text In Church](./text-in-church.md)：另一个短信平台，设置结构相似
- [Mobile Message](./mobile-message.md)：适用于美国以外的教会
- [Zapier（概览）](../zapier.md)：每个 Zapier 范例的 B1 端设置
- [Clearstream API 文档](https://api-docs.clearstream.io/)：超出 Zapier 应用程序之外的自定义整合
