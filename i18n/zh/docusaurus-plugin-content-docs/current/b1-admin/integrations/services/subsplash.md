---
title: "Subsplash"
---

# Subsplash

<div class="article-intro">

如果您使用 Subsplash 获取教会应用、捐款或表单，但希望 B1 作为人员和捐款的系统记录，Subsplash 的 Zapier 应用可以实时将捐款、新资料和表单回复导入 B1。请注意，Subsplash 的 Zapier 应用目前是 **仅触发器** — 连接方式是单向的（Subsplash → B1）。

</div>

<div class="prereqs">
<h4>开始前</h4>

- 一个在包括 **API + Zapier** 访问权限的计划上的 Subsplash 账户（与您的 Subsplash 客户成功经理检查 — 这些在计划层后面）
- 一个 [Zapier](https://zapier.com) 账户
- 一个具有 **编辑设置** 权限的 B1Admin 用户

</div>

## 您可以连接什么

下面的所有触发器都是 Subsplash 的。操作是 B1 的。

| Subsplash 触发器 | B1 操作 |
|---|---|
| 新捐款 | 查找人员 → 添加捐款（如果缺失，创建人员） |
| 新承诺 | 添加捐款（带 `notes` = "承诺：…"） |
| 新人员创建 | 创建人员 |
| 人员更新资料 | （无直接 B1 操作 — 记录到 Google Sheet 供手动审查） |
| 新表格响应 | 创建人员 + （可选）基于表单添加小组成员 |

Subsplash → B1 是 Subsplash 的应用目前支持的唯一方向。

## 设置

### 1. 生成一个 B1 API 密钥

在 B1Admin 中：**设置 → 开发者 → API 密钥 → 新建 API 密钥**。Scopes：

- `people:read` — 按电子邮件查找捐赠者
- `people:write` — 如果他们不存在，创建他们
- `donations:write` — 记录礼物
- （无需 `settings:write` — Subsplash 不是 B1，拥有触发器这里。）

### 2. 将 Subsplash 连接到 Zapier

按照 [Subsplash 的 Zapier 集成指南](https://support.subsplash.com/en/articles/9825926-zapier-integration)。他们从 Subsplash Dashboard 内部颁发 API 令牌，Zapier 使用该令牌对触发器侧进行身份验证。

### 3. 构建"记录捐款"Zap

1. **触发器** — Subsplash：新捐款
2. **操作** — B1.church：查找人员（按电子邮件）
3. **过滤/路径** — 在"找到人员"上分支：
   - **找到：** B1.church：添加捐款。映射金额、日期、基金、方式 = "在线"、注释 = Subsplash 交易 id。
   - **未找到：** B1.church：创建人员 → B1.church：添加捐款（使用新创建的人员的 id）。

打开 Zap。未来 Subsplash 捐款在几秒内流入 **B1Admin → 捐款**。

## 常见方案

### 当首次礼物到达时发送感谢

- **触发器** — Subsplash：新捐款
- **操作** — Zapier 过滤器：仅当它是捐赠者的首次礼物时继续（对捐赠者电子邮件使用 *查找表* 对照 Google Sheet 的过去捐赠者，或在捐赠者创建日期上使用 Zapier *路径* 步骤）
- **操作** — Mailchimp/SMTP/SendGrid：发送首次礼物感谢消息
- **操作** — B1.church：添加捐款（如常）

### 从常规捐款流过滤承诺

- **触发器** — Subsplash：新承诺
- **操作** — B1.church：添加捐款，带 `notes = "承诺 — Subsplash"` 和称为 `承诺` 的基金（与您的运营基金分开），以便您可以在 **B1Admin → 捐款 → 报告** 中独立报告承诺。

### 将新应用用户同步为 B1 人员

- **触发器** — Subsplash：新人员创建
- **操作** — B1.church：创建人员，填充名称、电子邮件、电话。通过将新人员添加到"Subsplash 应用用户"之类的小组来在 B1 中标记。

## 限制和注释

- **Subsplash 的 Zapier 应用仅触发器。** 如果您想要 B1 侧更改（例如新 B1 人员也登陆 Subsplash），您需要从 B1 的 Zapier 应用触发器构建该网桥，调用 Subsplash 的 REST API 通过自定义 *Webhooks by Zapier — POST* 操作。这是自定义集成，而不是方案。
- **API 访问是计划门控的。** 如果 Zapier 连接失败，显示 `403 禁止`，您的 Subsplash 计划可能不包括 API 访问 — 联系您的客户成功经理。
- **基金映射是手动的。** Subsplash 传递活动或类别名称；B1 需要数字基金 id。要么在 Zap 中硬编码基金，要么维护 Zapier *查找表* 映射 Subsplash 活动到 B1 基金。

## 故障排查

- **捐款后没有触发器触发** — 验证在 Subsplash 的 Zapier 仪表板中连接仍显示 *已连接*。如果 Subsplash 侧的 API 令牌被轮换，Zap 会无声地停止；重新连接。
- **B1 *添加捐款* 失败，显示 422** — 通常是缺失或未识别的 `fundId`。在 **B1Admin → 捐款 → 基金** 列出您的基金，并将确切 id 复制到 Zap 步骤。
- **首次礼物触发两次** — Subsplash 有时如果 Zapier 错过其 ack 会重新交付触发器。添加 *Zapier 过滤器* 对捐款 id（Subsplash 在有效负载中发送一个）以删除重复项。

## 另请参阅

- [Donorbox](./donorbox) — 相同方案形状，不同的捐款平台
- [Zapier（概览）](../zapier) — 每个 Zapier 方案的 B1 侧
- [Subsplash Zapier 集成指南](https://support.subsplash.com/en/articles/9825926-zapier-integration)（Subsplash 的文档）
