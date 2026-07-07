---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

将新的 B1 人员、捐赠者或小组成员导入 Mailchimp 受众，以便下一个欢迎系列、年终募捐或志愿者新闻稿从始终最新的列表中提取。B1 没有内置的 Mailchimp 同步 -- 接线完全在 Zapier（或 Make）中：B1 触发事件，Mailchimp 摄取订阅者。

</div>

<div class="prereqs">
<h4>开始前</h4>

- 一个 [Mailchimp](https://mailchimp.com) 账户，至少有一个您想将 B1 人员推入的受众
- 一个 [Zapier](https://zapier.com) 账户（免费层适合小教堂）
- 一个具有**编辑设置**权限的 B1Admin 用户，以便您可以铸造 API 密钥

</div>

## 您可以连接的内容

| 方向 | B1 触发器 | Mailchimp 操作 |
|---|---|---|
| B1 → Mailchimp | `person.created` | 添加/更新订阅者 |
| B1 → Mailchimp | `donation.created` | 将订阅者添加到标签（例如"2026 年有捐赠"） |
| B1 → Mailchimp | `group.member.added` | 将订阅者添加到该小组的标签 |
| Mailchimp → B1 | 新订阅者 | B1 *创建人员* |

Mailchimp 端公开了更多内容（活动、分段、自动化）-- 请参阅 [Mailchimp 的 Zapier 触发器](https://zapier.com/apps/mailchimp/integrations)以获取完整列表。从 B1 信封可映射的任何内容都可以使用。

## 设置

### 1. 铸造一个 B1 API 密钥

在 B1Admin 中转到**设置 → 开发者 → API 密钥 → 新 API 密钥**。给它 Zap 需要的作用域：

- `settings:write` — 触发器注册其 webhook 所必需的
- `people:read` — 以便 Zap 可以读取名字/姓氏、电子邮件等
- （可选）`people:write` 如果您还计划 Mailchimp → B1 方向

保存并复制 `cak_…` 字符串 -- 它仅显示一次。

### 2. 构建 Zap

1. **触发器：** `B1.church — 新人员`。首次使用时 Zapier 要求您*登录 B1.church*；粘贴 API 密钥。
2. **操作：** `Mailchimp — 添加/更新订阅者`。映射触发器输出：
   - `data.contactInfo.email` → 电子邮件地址
   - `data.name.first` → 名字
   - `data.name.last` → 姓氏
   - （可选）`data.id` → Mailchimp 合并字段，如果您想在旁边保留 B1 的人员 ID。
3. 打开 Zap。Zapier 在 B1 上注册 `person.created` webhook -- 在**设置 → 开发者 → Webhooks**中验证显示名为"Zapier — person.created"的行。

就是这样。在 B1Admin 中添加一个人员来确认 -- 新订阅者在几秒钟内出现在 Mailchimp 中。

## 常见方案

### 自动标记捐赠者

- **触发器** — B1：新捐赠
- **操作** — B1：查找人员（按 `personId` 查找）以获取电子邮件
- **操作** — Mailchimp：将订阅者添加到标签（标签 `Gave-2026`）

### 启动小组特定的欢迎系列

- **触发器** — B1：新小组成员，按 `data.groupId` 筛选
- **操作** — Mailchimp：将订阅者添加到以小组命名的标签；触发对该标签的现有自动化

### 双向：新的 Mailchimp 注册成为 B1 联系人

- **触发器** — Mailchimp：新订阅者
- **操作** — B1：创建人员（映射名字/姓氏/电子邮件）

## Make 替代方案

Make 的 [Mailchimp 应用](https://www.make.com/en/integrations/mailchimp)涵盖 44 个模块 -- 接线相同，B1 *监视事件*触发器替换 Zapier 的。有关 B1 端，请参阅 [Make 概览文档](../make)。

## 限制和注释

- **Mailchimp 的免费层限制联系人和受众** -- 将免费受众超过其限制的 Zap 会开始出现 `4xx 成员限制已达到` 错误。Mailchimp 的日志使这一点很明显。
- **Mailchimp 按电子邮件去重**，因此在同一 B1 人员上重新运行 Zap 会更新他们的位置；它不会创建重复项。
- **来自 Mailchimp 的退订不会流回 B1。** 如果您想让 Mailchimp 退订清除 B1 的"发送邮件"偏好，请显式构建反向 Zap。

## 故障排除

- **Zap 从不触发** -- 检查 `设置 → 开发者 → Webhooks` 中的 `Zapier — person.created` 行。如果不存在，则 API 密钥在 Zap 打开时缺少 `settings:write`。重新铸造、重新连接、关闭并打开 Zap。
- **添加/更新时显示 `成员存在` 警告** -- 将操作从*添加订阅者*更改为*添加/更新订阅者*（动词很重要）。upsert 变体是幂等的。
- **名字/姓氏显示为空白** -- B1 的 `data.name.first` 和 `data.name.last` 仅在这些字段在人员上设置时填充。映射 `data.name.display` 作为备用。

## 另见

- [Zapier（概览）](../zapier) -- 每个 Zapier 方案的 B1 端
- [Make（概览）](../make) -- 相同的想法，可视化构建器
- [Webhooks（开发者参考）](/docs/developer/api/webhooks#event-catalog)
