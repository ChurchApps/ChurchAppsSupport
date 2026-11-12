---
title: "Subsplash"
description: "通过 Zapier 将 Subsplash 的奉献、新人员与表单回复连接到 B1，让奉献与个人资料自动进入 B1 Admin。"
---

# Subsplash

<div class="article-intro">

如果你使用 Subsplash 管理教会应用程序、奉献或表单，但希望以 B1 作为人员与奉献的主要记录系统，Subsplash 的 Zapier 应用程序可以即时将奉献、新的个人资料与表单回复导入 B1。请注意，Subsplash 的 Zapier 应用程序目前**仅支持触发器**——此连接是单向的（Subsplash → B1）。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 一个方案包含 **API + Zapier** 权限的 Subsplash 账户（请向你的 Subsplash Client Success Manager 确认——这些功能依方案等级开放）
- 一个 [Zapier](https://zapier.com) 账户
- 一位在 B1Admin 中具有 **Edit Settings** 权限的用户

</div>

## 你可以设置的内容 {#what-you-can-wire-up}

以下所有触发器都来自 Subsplash，操作则属于 B1。

| Subsplash 触发器 | B1 操作 |
|---|---|
| New Donation | Find Person → Add Donation（若人员不存在则 Create Person） |
| New Pledge | Add Donation（`notes` 设为 "Pledge: …"） |
| New Person Created | Create Person |
| Person Updated Profile | （没有直接对应的 B1 操作——记录到 Google Sheet 供人工审阅） |
| New Form Response | Create Person +（选填）依表单加入 Add Group Member |

目前 Subsplash 的应用程序只支持 Subsplash → B1 这一个方向。

## 设置 {#setup}

### 1. 建立 B1 API 密钥 {#1-mint-a-b1-api-key}

在 B1Admin 中：**Settings → Developer → API Keys → New API Key**。权限范围：

- `people:read`——依电子邮件查找捐献者
- `people:write`——若捐献者不存在，则建立其记录
- `donations:write`——记录该笔奉献
- `settings:write`——Zapier 在连接时会将每个 B1 密钥与 B1 的 webhook 清单进行核对，因此没有此权限连接会失败（即使在这里拥有触发器的是 Subsplash，而不是 B1）

### 2. 将 Subsplash 连接到 Zapier {#2-connect-subsplash-to-zapier}

请依照 [Subsplash 的 Zapier 整合指南](https://support.subsplash.com/en/articles/9825926-zapier-integration)操作。Subsplash 会从其控制台中签发 API 令牌，供 Zapier 用于验证触发器这一端。

### 3. 建立"记录奉献"的 Zap {#3-build-the-record-a-donation-zap}

1. **触发器**——Subsplash：New Donation
2. **操作**——B1.church：Find Person（依电子邮件）
3. **操作**——B1.church：Add Donation，使用第 2 步中该人员的 ID。映射金额、日期、基金，并将 method 设为 "Online"，notes 设为 Subsplash 交易 ID。

当没有人符合条件时，B1 的 *Find Person* 会以"No person found"错误停止 Zap，因此 Filter 或 Path 步骤无法据此分支。若要处理首次奉献的捐献者，请为 Find Person 步骤开启 Zapier 的错误处理，并在其错误路径中执行 B1.church：Create Person → B1.church：Add Donation（使用新建人员的 ID）。

开启 Zap。之后的 Subsplash 奉献会在数秒内进入 **B1Admin → Donations**。

## 常见范例 {#common-recipes}

### 首次奉献到达时发送感谢信 {#send-a-thank-you-when-a-first-time-gift-lands}

- **触发器**——Subsplash：New Donation
- **操作**——Filter by Zapier：仅当这是该捐献者的首次奉献时才继续（可对照一份过去奉献者的 Google Sheet，以捐献者电子邮件使用 *Lookup Table*；或依捐献者的建立日期使用 Zapier *Paths* 步骤）
- **操作**——Mailchimp／SMTP／SendGrid：发送首次奉献感谢讯息
- **操作**——B1.church：Add Donation（照常进行）

### 将认捐与一般奉献流程分开 {#filter-pledges-off-the-regular-giving-flow}

- **触发器**——Subsplash：New Pledge
- **操作**——B1.church：Add Donation，`notes` 设为 `"Pledge — Subsplash"`，并使用名为 `Pledges` 的基金（与你的营运基金分开），以便你在 **B1Admin → Donations → Summary** 中独立统计认捐。

### 将新的应用程序用户同步为 B1 人员 {#sync-new-app-users-as-b1-people}

- **触发器**——Subsplash：New Person Created
- **操作**——B1.church：Create Person，填入姓名、电子邮件与电话。并将新人员加入"Subsplash App Users"等小组，以便在 B1 中加上标签。

## 限制与注意事项 {#limits--notes}

- **Subsplash 的 Zapier 应用程序仅支持触发器**。如果你希望 B1 的变更也同步到 Subsplash（例如新增的 B1 人员也进入 Subsplash），你需要以 B1 Zapier 应用程序的触发器，透过自定义的 *Webhooks by Zapier — POST* 操作调用 Subsplash 的 REST API 来建立该桥接。这属于自定义整合，而非一个范例。
- **API 访问受方案限制**。如果 Zapier 连接返回 `403 Forbidden`，你的 Subsplash 方案很可能不包含 API 访问权限——请联系你的 Client Success Manager。
- **基金对应需手动设置**。Subsplash 会传递募款活动或类别名称，而 B1 需要其自己的基金。你可以从 Add Donation 步骤的 **Fund** 下拉菜单中选择基金，或维护一个将 Subsplash 募款活动对应到 B1 基金的 Zapier *Lookup Table*。

## 故障排除 {#troubleshooting}

- **奉献后没有任何触发器启动**——请在 Subsplash 的 Zapier 控制台中确认连接仍显示 *Connected*。如果 Subsplash 这一端的 API 令牌已轮替，Zap 会悄悄停止运作；请重新连接。
- **B1 的 *Add Donation* 记录了奉献，但没有基金**——**Fund** 栏位为空，或对应到不是 B1 基金 ID 的值。请从该步骤的 **Fund** 下拉菜单中选择基金（菜单会列出 B1Admin 中 **Donations > Funds** 下的基金），或对应一个会输出 B1 基金 ID 的 Lookup Table。
- **首次奉献触发了两次**——如果 Zapier 未收到确认，Subsplash 偶尔会重新传送触发器。请在奉献 ID（Subsplash 会在数据中传送该 ID）上加入 *Filter by Zapier*，以过滤重复项。

## 另见 {#see-also}

- [Donorbox](./donorbox.md)：相同的范例结构，不同的奉献平台
- [Zapier（概览）](../zapier.md)：每个 Zapier 范例的 B1 端设置
- [Subsplash Zapier 整合指南](https://support.subsplash.com/en/articles/9825926-zapier-integration)（Subsplash 的文档）
