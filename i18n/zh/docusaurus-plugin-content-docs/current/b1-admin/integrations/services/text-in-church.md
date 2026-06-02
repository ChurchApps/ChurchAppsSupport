---
title: "Text In Church"
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) 捆绑短信加滴流工作流和连接卡自动化。其 Zapier 应用公开两个方向 — 将 B1 事件导入 Text In Church 工作流，并将连接卡或新联系人触发器拉到另一侧到 B1。

</div>

<div class="prereqs">
<h4>开始前</h4>

- 一个在包括 Zapier 集成的计划上的 [Text In Church](https://textinchurch.com) 账户
- 一个 [Zapier](https://zapier.com) 账户
- 一个具有 **编辑设置** 权限的 B1Admin 用户

</div>

## 您可以连接什么

| 方向 | 触发器 | 操作 |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | 创建/更新人员 + 添加到小组 |
| B1 → Text In Church | B1 `form.submission.created` | 通过相关团队发送文本消息 |
| B1 → Text In Church | B1 `group.member.added` | 添加到小组（镜像小组成员身份） |
| Text In Church → B1 | 连接卡已提交 | B1：创建人员 + 添加小组成员 |
| Text In Church → B1 | 人员创建 | B1：创建人员 |
| Text In Church → B1 | 人员加入小组 | B1：添加小组成员 |

Text In Church 操作还包括 *发送文本消息*、*发送语音广播*、*创建任务*、*查找人员/小组* 和小组成员添加/删除。

## 设置

### 1. 生成一个 B1 API 密钥

**设置 → 开发者 → API 密钥 → 新建 API 密钥**：

- `settings:write` — B1 触发的 Zaps 所需
- `people:read`、`people:write` — 查找或创建人员
- `groups:write` — 小组同步
- （可选）`donations:write` 如果您将礼物确认连接到 TIC

### 2. 将 Text In Church 连接到 Zapier

按照 [Text In Church 的 Zapier 集成指南](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration)。他们从 TIC 仪表板内部生成一个 API 令牌。

### 3. 构建连接卡到 B1 Zap

最常见的方向。从 TIC 触发的连接卡自动变成新 B1 人员。

1. **触发器** — Text In Church：连接卡已提交。
2. **操作** — B1.church：查找人员（按电子邮件）。
3. **路径** — 在找到/未找到上分支：
   - 未找到 → B1.church：创建人员。
   - 找到 → 继续。
4. **操作** — B1.church：向"新联系人"小组添加小组成员。

打开 Zap。通过 TIC 提交的下一张连接卡自动登陆在 **B1Admin → 人员** 中。

## 常见方案

### 从 B1 表格触发连接卡风格工作流

- **触发器** — B1.church：新表格提交（按"我是新来的"表单 id 过滤）
- **操作** — Text In Church：创建/更新人员，映射表单的电子邮件/电话/名称答案
- **操作** — Text In Church：添加到小组，其中小组附加预构建的欢迎工作流

### 镜像小组成员身份

- **触发器** — B1.church：新小组成员，按特定 `groupId` 过滤
- **操作** — Text In Church：添加到小组（同一人员，镜像小组）。与 `group.member.removed` Zap 配对（如果您想要完全同步）。

### 当有人加入时页面领导

- **触发器** — B1.church：新小组成员
- **操作** — Text In Church：发送文本消息，收件人 = 小组领导的电话，主体 = `"{first} {last} 刚加入 {group}"`。

## 限制和注释

- **TIC 的 Zapier 应用在计划层后面。** 如果 TIC 仪表板中的 Zapier 集成是灰色的，联系 TIC 支持以在您的计划上启用它。
- **小组 id 是 TIC 的，不是 B1 的。** 镜像时，您将在某处维护映射表（Zapier *查找表*，或每 Zap 硬编码）。
- **发送文本消息成本学分。** 每个触发 *发送文本* 的 Zap 从您的 TIC 短信津贴消耗。

## 故障排查

- **连接卡触发器不触发** — TIC 需要 Zapier 集成切换打开。也验证您测试的表单被配置为"连接卡"，而不是通用调查。
- **在 B1 中创建人员失败，显示 401** — API 密钥是错误的、被撤销的或缺少 `people:write`。重新生成。
- **重复 B1 人员** — TIC 为同一事件同时发送 *人员创建* 和 *连接卡已提交*。选择一个作为您的真理来源，并在另一个上添加 Zapier 过滤器。

## 另请参阅

- [Clearstream](./clearstream) — 具有相似 Zapier 形状的替代短信平台
- [Zapier（概览）](../zapier) — 每个 Zapier 方案的 B1 侧
- [Text In Church Zapier 指南](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration)（TIC 的文档）
