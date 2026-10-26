---
title: "Subsplash"
---

# Subsplash

<div class="article-intro">

如果您使用 Subsplash 来提供教会应用、奉献或表单服务，但希望以 B1 作为人员和奉献的主记录系统，Subsplash 的 Zapier 应用可以实时将奉献、新建的个人资料和表单回复导入 B1。请注意，Subsplash 的 Zapier 应用目前**仅支持触发器**，因此连接是单向的（Subsplash → B1）。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 一个 Subsplash 账户，且套餐包含 **API + Zapier** 访问权限（请咨询您的 Subsplash 客户成功经理，这些功能取决于套餐级别）
- 一个 [Zapier](https://zapier.com) 账户
- 一个具有 **Edit Settings** 权限的 B1Admin 用户

</div>

## 您可以设置的连接

以下所有触发器均来自 Subsplash，操作则来自 B1。

| Subsplash 触发器 | B1 操作 |
|---|---|
| New Donation（新奉献） | Find Person（查找人员）→ Add Donation（添加奉献）（如果人员不存在，则 Create Person（创建人员）） |
| New Pledge（新认捐） | Add Donation（添加奉献）（`notes` 为 "Pledge: …"） |
| New Person Created（新建人员） | Create Person（创建人员） |
| Person Updated Profile（人员资料已更新） | （无直接对应的 B1 操作，可记录到 Google Sheet 供人工审核） |
| New Form Response（新表单回复） | Create Person（创建人员）+（可选）根据表单添加 Group Member（添加小组成员） |

目前 Subsplash 的应用仅支持 Subsplash → B1 这一个方向。

## 设置

### 1. 创建 B1 API 密钥

在 B1Admin 中：**Settings → Developer → API Keys → New API Key**。权限范围：

- `people:read`：通过电子邮件查找捐赠者
- `people:write`：如果捐赠者不存在，则为其创建记录
- `donations:write`：记录该笔奉献
- （无需 `settings:write`，因为此处的触发器由 Subsplash 而非 B1 负责。）

### 2. 将 Subsplash 连接到 Zapier

请按照 [Subsplash 的 Zapier 集成指南](https://support.subsplash.com/en/articles/9825926-zapier-integration) 操作。他们会在 Subsplash 控制台中签发一个 API 令牌，供 Zapier 用于对触发器端进行身份验证。

### 3. 创建"记录奉献"Zap

1. **触发器**：Subsplash：New Donation（新奉献）
2. **操作**：B1.church：Find Person（按电子邮件查找）
3. **筛选器 / 路径**：根据"是否找到人员"进行分支：
   - **已找到：** B1.church：Add Donation（添加奉献）。映射金额、日期、基金、方式 = "Online"，备注 = Subsplash 交易 ID。
   - **未找到：** B1.church：Create Person（创建人员）→ B1.church：Add Donation（添加奉献）（使用新创建人员的 ID）。

开启该 Zap。之后，Subsplash 的奉献会在数秒内进入 **B1Admin → Donations**。

## 常见方案

### 首次奉献到账时发送感谢信

- **触发器**：Subsplash：New Donation（新奉献）
- **操作**：Zapier 筛选：仅当这是捐赠者的首次奉献时才继续（可对照记录过往奉献者的 Google Sheet 使用*查找表*，匹配捐赠者电子邮件；或基于捐赠者创建日期使用 Zapier *Paths* 步骤）
- **操作**：Mailchimp / SMTP / SendGrid：发送首次奉献感谢信
- **操作**：B1.church：Add Donation（添加奉献）（照常进行）

### 将认捐从常规奉献流程中筛选出来

- **触发器**：Subsplash：New Pledge（新认捐）
- **操作**：B1.church：Add Donation（添加奉献），备注为 `notes = "Pledge — Subsplash"`，并使用名为 `Pledges` 的基金（与您的运营基金分开），以便您在 **B1Admin → Donations → Summary** 中单独报告认捐情况。

### 将新的应用用户同步为 B1 人员

- **触发器**：Subsplash：New Person Created（新建人员）
- **操作**：B1.church：Create Person（创建人员），填入姓名、电子邮件、电话。将新人员添加到如 "Subsplash App Users" 之类的小组中，即可在 B1 中为其添加标签。

## 限制与说明

- **Subsplash 的 Zapier 应用仅支持触发器。** 如果您希望 B1 端的更改（例如新的 B1 人员也同步到 Subsplash），则需要通过 B1 Zapier 应用的触发器，调用 Subsplash 的 REST API，使用自定义的 *Webhooks by Zapier — POST* 操作来搭建这一桥接。这属于定制集成，而不是现成的方案。
- **API 访问受套餐限制。** 如果 Zapier 连接失败并显示 `403 Forbidden`，则您的 Subsplash 套餐可能不包含 API 访问权限，请联系您的客户成功经理。
- **基金映射需手动完成。** Subsplash 传递的是活动或类别名称，而 B1 需要数字格式的基金 ID。您可以在 Zap 中硬编码基金，或维护一个将 Subsplash 活动映射到 B1 基金的 Zapier *查找表*。

## 故障排除

- **奉献后没有触发器运行**：在 Subsplash 的 Zapier 控制台中确认连接仍显示为 *Connected*。如果 Subsplash 一侧的 API 令牌已轮换，Zap 会静默停止，此时请重新连接。
- **B1 *Add Donation* 返回 422**：通常是 `fundId` 缺失或无法识别。请通过 **B1Admin → Donations → Funds** 列出您的基金，并将确切的 ID 复制到 Zap 步骤中。
- **首次奉献触发了两次**：如果 Zapier 未能确认收到，Subsplash 偶尔会重新投递触发器。请添加基于奉献 ID 的 *Filter by Zapier* 筛选器（Subsplash 会在负载中提供该 ID）以去除重复项。

## 另请参阅

- [Donorbox](./donorbox)：方案结构相同，但使用不同的奉献平台
- [Zapier（概览）](../zapier)：每个 Zapier 方案的 B1 端说明
- [Subsplash Zapier 集成指南](https://support.subsplash.com/en/articles/9825926-zapier-integration)（Subsplash 官方文档）
