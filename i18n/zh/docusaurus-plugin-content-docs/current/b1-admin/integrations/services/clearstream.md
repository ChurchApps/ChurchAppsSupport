---
title: "Clearstream"
---

# Clearstream

<div class="article-intro">

从任何 B1 事件触发 [Clearstream](https://clearstream.io) 文本消息 — 新人员、新礼物、表格提交、日历更新 — 并将回复拉回作为 B1 记录。Clearstream 的 Zapier 应用公开两个方向，所以整个连接是一个方案，而不是自定义代码。

</div>

<div class="prereqs">
<h4>开始前</h4>

- 一个具有至少一个列表和短信津贴的 [Clearstream](https://clearstream.io) 账户
- 一个 [Zapier](https://zapier.com) 账户
- 一个具有 **编辑设置** 权限的 B1Admin 用户

</div>

## 您可以连接什么

| 方向 | 触发器 | 操作 |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream：创建/更新订阅者 + 向号码发送文本 |
| B1 → Clearstream | B1 `donation.created` | Clearstream：向列表发送文本（例如通知财务团队） |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream：向路由列表发送文本（例如祈祷请求团队） |
| Clearstream → B1 | 新传入文本 | B1：创建人员；用他们发送的关键词标记 |

Clearstream 的 Zapier 操作：*向号码发送文本*、*向列表发送文本*、*创建/更新订阅者*、*将订阅者添加到自动化工作流*、*向订阅者添加标记*、*从列表删除订阅者*。

## 设置

### 1. 生成一个 B1 API 密钥

**设置 → 开发者 → API 密钥 → 新建 API 密钥**：

- `settings:write` — 是 B1 注册触发器 webhook 所需的
- `people:read` — 需要从事件（`personId` → 名称/电话/电子邮件）查找人员
- （可选）`people:write` 如果 Clearstream 回复应创建 B1 联系人

### 2. 构建"新礼物时发送文本"Zap

1. **触发器** — B1.church：新捐款
2. **操作** — B1.church：查找人员（捐赠的 `personId`）
3. **操作** — Clearstream：向号码发送文本。使用步骤 2 中人员的电话作为收件人，撰写消息（`"感谢您的礼物，{first}!…"`）。

打开 Zap。B1 在激活时注册捐款 webhook；您将看到 `Zapier — donation.created` 出现在 **设置 → 开发者 → Webhooks**。

### 3. （可选）将回复拉回作为 B1 记录

1. **触发器** — Clearstream：新传入文本
2. **操作** — 按 Zapier 过滤关键词 — 例如仅当文本主体以 `PRAY` 开头时继续
3. **操作** — B1.church：查找人员（按电话）
4. **操作** — 过滤/路径 — 如果未找到，创建他们；无论哪种方式，将文本主体存档到某处（Slack、Google Sheet 或 B1 表格提交通过 Webhooks by Zapier）。

## 常见方案

### 志愿者团队呼机

- **触发器** — B1.church：新表格提交（按祈祷请求表单 id 过滤）
- **操作** — Clearstream：向列表发送文本，其中列表是您的随叫随到牧师团队。撰写主体为 `新祈祷请求：{data.questions.0.answer}`。

### 首次访问者跟进序列

- **触发器** — B1.church：新人员，按"首次访问者"的 B1 人员标记过滤
- **操作** — Clearstream：将订阅者添加到自动化工作流。将工作流 id 映射到预构建的 7 天文本滴。

### 关键词驱动的小组加入

- **触发器** — Clearstream：新传入文本（过滤关键词 `MENS`）
- **操作** — B1.church：查找人员（按电话）；未找到时分岔 → 创建人员
- **操作** — B1.church：向男性事工小组添加小组成员

## 限制和注释

- **Clearstream 按消息计量短信。** 每个发送文本操作消耗一个或多个学分，具体取决于长度和收件人数量 — 检查您的计划津贴。
- **电话必须是 E.164 格式**（例如 `+15555550199`）用于 *向号码发送文本*。B1 的人员记录存储输入的任何内容；如果您不能保证格式，使用 *Formatter by Zapier — Numbers → 格式化电话号码* 步骤。
- **B1 侧不需要标头** — Clearstream 的身份验证完全位于其 Zapier 连接内。

## 故障排查

- **触发器从未触发** — `设置 → 开发者 → Webhooks` 应在 Zap 打开后显示 `Zapier — <event>` 行。如果不显示，B1 API 密钥缺少 `settings:write`。重新生成并重新连接。
- **Clearstream 返回"无效电话号码"** — 收件人字段不是 E.164。添加格式化电话号码步骤。
- **向列表发送文本失败，显示 `403`** — Clearstream API 用户缺少该列表的权限，或列表 id 错误。列表 id 在 Clearstream 列表详情页面上可见。

## 另请参阅

- [Text In Church](./text-in-church) — 替代短信平台，相似连接形状
- [Mobile Message](./mobile-message) — 用于美国外的教会
- [Zapier（概览）](../zapier) — 每个 Zapier 方案的 B1 侧
- [Clearstream API 文档](https://api-docs.clearstream.io/) — 用于超出 Zapier 应用的自定义集成
