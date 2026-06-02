---
title: "Donorbox"
---

# Donorbox

<div class="article-intro">

如果您的教会通过 Donorbox 接收捐款但在 B1 中跟踪人员和声明，您可以让 Donorbox 的即时 Zapier 触发器在 B1 内创建匹配的捐款记录 — 并如果捐赠者不存在，则创建他们为 B1 人员。无需手动对账，无需每月导出。

</div>

<div class="prereqs">
<h4>开始前</h4>

- 一个具有至少一个活动的 [Donorbox](https://donorbox.org) 账户
- 一个 [Zapier](https://zapier.com) 账户
- 一个具有 **编辑设置** 权限的 B1Admin 用户

</div>

## 您可以连接什么

| 方向 | Donorbox 触发器 | B1 操作 |
|---|---|---|
| Donorbox → B1 | 新或更新的捐款（即时） | 查找人员 → 添加捐款 |
| Donorbox → B1 | 新或更新的捐赠者 | 创建人员 |
| Donorbox → B1 | 新或更新的计划（重复） | 查找人员 → 添加捐款（使用计划 id 作为注释） |

Donorbox 将其触发器发布为 **即时** — 他们在真实捐款后几秒内触发。没有轮询延迟。

## 设置

### 1. 生成一个 B1 API 密钥

在 B1Admin 中：**设置 → 开发者 → API 密钥 → 新建 API 密钥**。Scopes：

- `people:read` — 按电子邮件查找捐赠者
- `people:write` — 如果他们是新的，创建他们
- `donations:write` — 记录礼物

此方向中的触发器是 Donorbox 的，而不是 B1 的，所以您不需要 `settings:write` 这里。

### 2. 构建"记录捐款"Zap

1. **触发器** — Donorbox：新捐款。用 Donorbox 的 API 密钥连接（在 Donorbox 中：*账户 → 资料 → API 设置*）。
2. **操作** — B1.church：查找人员。将触发器中的捐赠者电子邮件映射到 *电子邮件* 搜索字段。
3. **操作** — Zapier 过滤器（可选）：仅当未找到捐赠者时继续…
4. **操作** — B1.church：创建人员。映射名字/姓氏/电子邮件以便捐赠者作为成员登陆，而不仅仅是礼物记录。
5. **操作** — B1.church：添加捐款。映射：
   - 金额 → `data.amount`
   - 捐款日期 → 触发器的捐款日期
   - 基金 → 选择镜像 Donorbox 活动的 B1 基金（Zapier 让您基于过滤器或格式化程序步骤切换基金）
   - 方式 → "在线"
   - 注释 → Donorbox 交易 id（在对账时很方便）

打开 Zap。通过 Donorbox 的下一个实时捐款自动登陆在 **B1Admin → 捐款** 中。

## 常见方案

### 每个基金一个 Zap

如果您运行映射到单独 B1 基金的多个 Donorbox 活动，最整洁的布局是每个活动一个 Zap，顶部有 Donorbox *活动* 过滤器 — 这样基金映射被硬编码，您跳过查找步骤。

### 将更新的捐款视为更正

Donorbox 的 *新或更新的捐款* 也会触发编辑。在 `event_type` 上使用 Zapier *路径* 步骤分岔："新" → 添加捐款，"已更新" → 查找捐款 + 更新（注意：B1 的 Zapier 应用目前没有更新捐款操作 — 现在，将"已更新"事件记录到 Slack 频道供手动审查）。

### 将重复计划更改同步到 Slack 频道

- **触发器** — Donorbox：新或更新的计划
- **操作** — Slack：向 `#donations` 发送消息（例如"计划已更改 — Sarah 的每月礼物现在是 $200"）

## 限制和注释

- **按电子邮件匹配捐赠者。** Donorbox 不共享 B1 的人员 id；唯一的耐用连接键是电子邮件。在不同电子邮件下捐款的捐赠者将创建新 B1 人员 — 您的每月对账应寻找这些。
- **退款未单独暴露** — Donorbox 在同一捐款上发出状态更新。B1 的 Zapier 应用目前没有 *更新捐款* 操作；今天的安全模式是带外记录退款事件并手动调整捐款。
- **首先在 Donorbox 沙箱中测试**，以避免在生产 B1 中创建虚假礼物。Donorbox 提供与实时分开的测试模式凭证。

## 故障排查

- **每次运行都显示"未找到人员"警告** — 如果您已排序步骤以便 *创建人员* 在未找到分支中运行，那就好了。如果创建人员步骤也从不运行，双检 API 密钥有 `people:write`。
- **捐款金额看起来大 100 倍或小** — Donorbox 在某些有效负载变量中以美分发送，在其他中以美元发送。使用 *Formatter by Zapier — Numbers* 步骤按 100 除（如需要）。
- **来自单个礼物的重复捐款** — Donorbox 触发 *新捐款* 和 *更新捐款* 两者。要么过滤为 `event_type = "donation.succeeded"`，要么构建两个具有不重叠过滤器的 Zaps。

## 另请参阅

- [Zapier（概览）](../zapier) — 每个 Zapier 方案的 B1 侧
- [Subsplash](./subsplash) — 另一个具有 Zapier 应用的捐款平台
- [Mailchimp](./mailchimp) — 将"新礼物"链到电子邮件标记
