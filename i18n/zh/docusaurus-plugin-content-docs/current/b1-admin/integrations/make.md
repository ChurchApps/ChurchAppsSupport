---
title: "Make"
---

# Make

<div class="article-intro">

[Make](https://www.make.com)（以前称为 Integromat）是一个可视化工作流自动化平台 — 在精神上与 Zapier 相似，但逻辑更灵活，规模上成本更低。官方的 B1.church Make 应用让您构建"场景"，即时响应 B1 事件并将记录写回 B1。

</div>

<div class="prereqs">
<h4>开始前</h4>

- 一个 [Make](https://www.make.com) 账户（免费层覆盖小型工作流）
- 在 B1Admin 中拥有 **编辑设置** 权限的教会管理员
- 大致了解您想构建的场景

</div>

## 模块

| 类型 | 功能 | B1 事件/端点 |
|---|---|---|
| **即时触发器** | 观察事件 | 任何订阅的 B1 事件（`person.created`、`donation.created` 等） |
| **操作** | 创建人员 | 添加一个新人员 |
| **操作** | 添加捐款 | 记录一个捐款 |
| **操作** | 添加小组成员 | 将一个人添加到小组 |
| **搜索** | 搜索人员 | 按名称或电子邮件查找人员 |

即时触发器让您选择要监听的事件 — 每个场景一个触发器模块，按事件配置。

## 设置

### 1. 创建 B1 API 密钥

1. 在 B1Admin 中转到 **设置 → 开发者 → API 密钥**。
2. 点击 **新建 API 密钥**，将其命名为"Make"，并授予您需要的 scopes。
3. **包括 `settings:write`** 如果您的任何场景使用即时触发器 — Make 在场景打开时代表您注册一个 webhook。
4. 也授予操作模块需要的 scopes（例如添加捐款模块的 `donations:write`）。
5. 保存并复制 `cak_…` 密钥。

### 2. 安装连接

1. 在 Make 中，构建一个新场景并将 **B1.church** 触发器模块放到画布上。
2. 提示时，**创建连接**。将 API 密钥粘贴到 *API 密钥* 字段中，将 *API 基础 URL* 保留为 `https://api.churchapps.org`（除非您正在测试暂存）。
3. 点击 **保存** — Make 通过读取您的教会资料来测试密钥。

连接保存在您的 Make 账户上，并在场景中重用。

### 3. 配置触发器

1. 打开 **观察事件** 模块的设置。
2. 选择您想要的事件 — 例如 `donation.created`。
3. 保存。Make 生成一个唯一的 webhook URL 并在内部存储它。

### 4. 添加下游模块

将 Make 的数百个应用模块放到画布上 — Mailchimp、Google Sheets、Slack、HubSpot、您自己的 HTTP 端点等。将触发器的输出（`event`、`churchId`、`data.id`、`data.amount` 等）映射到它们的输入字段。Make 的平展/迭代器/路由器/聚合器模块让您构建在 Zapier 中很难做到的分支和并行流。

### 5. 打开场景

在场景标题中切换 **激活**。Make 调用 B1 的 `POST /membership/webhooks` 来注册 URL。从那一刻起，每个匹配的 B1 事件实时流过场景。

关闭场景调用 `DELETE /membership/webhooks/{id}` 以使没有孤立的订阅。

## 常见方案

### 将捐款同步到 Google Sheet 进行财务审查

- **触发器** — B1：观察事件（`donation.created`）
- **操作** — Google Sheets：添加一行。将 `data.donationDate`、`data.amount`、`data.personId`、`data.method`、`data.batchId` 映射到工作表的列。

### 按捐款金额条件 Slack 通知

- **触发器** — B1：观察事件（`donation.created`）
- **路由器**：
  - 分支 A — 过滤：`data.amount >= 1000` → Slack：发布到 `#major-gifts`
  - 分支 B — 贯穿 → Slack：发布到 `#donations`

### 新人员 → CRM + 欢迎邮件 + Slack

- **触发器** — B1：观察事件（`person.created`）
- **操作** — HubSpot：创建联系人
- **操作** — Mailgun：发送欢迎邮件
- **操作** — Slack：通知 `#new-people`（并行 — 使用 Make 的路由器）

## 即时触发器工作原理

即时触发器是 webhook 支持的，而不是轮询 — 激活时，Make 调用 `POST /membership/webhooks` 和它生成的 URL 和您选择的事件。当事件在 B1 中触发时，B1 将信封 POST 到 Make 的 URL，您的场景在几秒内运行。停用场景删除 webhook。

触发器只为 **场景激活时发生的** 事件触发。没有补齐。

## 限制和注释

- **每个观察事件模块一个事件。** 要在一个场景中监听多个事件，将多个触发器模块放到单独的场景中（或使用单个模块和并联事件列表 — 见下文）。
- **签名验证未暴露** — Make 不通过 `X-B1-Signature` 传递给场景；信任边界是 Make 的不可猜测的按场景 webhook URL。这是普通 Make 实践。如果您需要显式签名检查，改用 [SDK](/docs/developer/api/webhooks#sdk-support) 构建自定义集成。
- **操作计数** — 来自操作模块的每个 API 调用都计入您的 Make 操作配额，而不是 B1 侧的任何东西。

## 故障排查

- **连接测试失败** — 通常是 API 密钥中的打字错误。从 B1Admin 重新复制它（完整密钥仅显示一次；如果您丢失了它，创建一个新密钥）。
- **触发器模块不激活** — 检查 B1Admin 中的 **设置 → 开发者 → Webhooks**。如果激活场景后您没有看到"Make — &lt;event&gt;"行，密钥丢失 `settings:write`。更新密钥并重新激活。
- **操作返回 `403 禁止`** — API 密钥缺少该端点的 scope。例如，添加捐款需要 `donations:write`。在 B1Admin 中更新密钥并重新测试。

## 自定义应用

B1.church Make 应用是开源的 — JSON 定义位于 `B1Integrations/Make/` 仓库。如果您需要不存在的模块（例如我们尚未覆盖的端点的新操作），请在那里打开问题或 PR。

## 另请参阅

- [Zapier](./zapier) — 相同模式，更简单的 UI 和更大的应用目录
- [Slack 和 Discord](./slack-discord) — 内置聊天通知，不需要 Make
- [Webhooks（开发者参考）](/docs/developer/api/webhooks)
