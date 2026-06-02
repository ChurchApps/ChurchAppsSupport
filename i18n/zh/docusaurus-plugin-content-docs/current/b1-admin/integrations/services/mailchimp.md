---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

将新 B1 人员、捐赠者或小组成员管道到 Mailchimp 受众，以便下一个欢迎系列、年终吸引或志愿者通讯从一个始终最新的列表中提取。连接完全位于 Zapier（或 Make）中 — B1 触发事件，Mailchimp 摄取订阅者。

</div>

<div class="prereqs">
<h4>开始前</h4>

- 一个具有至少一个您想要 B1 人员推入的受众的 [Mailchimp](https://mailchimp.com) 账户
- 一个 [Zapier](https://zapier.com) 账户（免费层覆盖小教会）
- 一个具有 **编辑设置** 权限的 B1Admin 用户，以便您可以生成 API 密钥

</div>

## 您可以连接什么

| 方向 | B1 触发器 | Mailchimp 操作 |
|---|---|---|
| B1 → Mailchimp | `person.created` | 添加/更新订阅者 |
| B1 → Mailchimp | `donation.created` | 向标记添加订阅者（例如"在 2026 年捐赠"） |
| B1 → Mailchimp | `group.member.added` | 向标记添加订阅者（范围限制到该小组） |
| Mailchimp → B1 | 新订阅者 | B1 *创建人员* |

Mailchimp 侧公开了许多更多内容（活动、细分、自动化） — 查看 [Mailchimp 的 Zapier 集成](https://zapier.com/apps/mailchimp/integrations) 以获取完整列表。任何可从 B1 信封映射的内容都是公平的游戏。

## 设置

### 1. 生成一个 B1 API 密钥

在 B1Admin 中转到 **设置 → 开发者 → API 密钥 → 新建 API 密钥**。给它 Zap 需要的 scopes：

- `settings:write` — 触发器注册其 webhook 所需
- `people:read` — 所以 Zap 可以读取名字/姓氏、电子邮件等
- （可选）`people:write` 如果您也计划 Mailchimp → B1 方向

保存并复制 `cak_…` 字符串 — 它仅显示一次。

### 2. 构建 Zap

1. **触发器：** `B1.church — 新人员`。首次使用时 Zapier 会要求您 *登录 B1.church*；粘贴 API 密钥。
2. **操作：** `Mailchimp — 添加/更新订阅者`。映射触发器输出：
   - `data.contactInfo.email` → 电子邮件地址
   - `data.name.first` → 名字
   - `data.name.last` → 姓氏
   - （可选）`data.id` → Mailchimp 合并字段，如果您想将 B1 的人员 id 保留在旁边。
3. 打开 Zap。Zapier 在 B1 上注册 `person.created` webhook — 验证在 **设置 → 开发者 → Webhooks** 中显示一行命名为"Zapier — person.created"。

就这样。在 B1Admin 中添加一个人员以确认 — 新订阅者在几秒内出现在 Mailchimp 中。

## 常见方案

### 自动标记捐赠者

- **触发器** — B1：新捐款
- **操作** — B1：查找人员（按 `personId` 查找）以获取电子邮件
- **操作** — Mailchimp：向标记添加订阅者（标记 `Gave-2026`）

### 删除组特定的欢迎系列

- **触发器** — B1：新小组成员，按 `data.groupId` 过滤
- **操作** — Mailchimp：向标记添加订阅者，以小组命名；从该标记触发您现有的自动化

### 双向：新 Mailchimp 注册成为 B1 联系人

- **触发器** — Mailchimp：新订阅者
- **操作** — B1：创建人员（映射名字/姓氏/电子邮件）

## Make 替代方案

Make 的 [Mailchimp 应用](https://www.make.com/en/integrations/mailchimp) 覆盖 44 个模块 — 连接方式相同，B1 *观察事件* 触发器替换 Zapier 的。查看 [Make 概览文档](../make) 以获取 B1 侧。

## 限制和注释

- **Mailchimp 的免费层限制联系人和受众** — 一个将免费受众淹没超过其限制的 Zap 将开始出错，显示 `4xx 成员限制已达到`。Mailchimp 的日志使这显而易见。
- **Mailchimp 按电子邮件重复删除**，所以重新运行相同 B1 人员上的 Zap 会原地更新他们；它不创建重复项。
- **来自 Mailchimp 的取消订阅不流回 B1。** 如果您想要 Mailchimp 取消订阅来清除 B1 的"发送邮件"首选项，显式构建反向 Zap。

## 故障排查

- **Zap 从不触发** — 检查 `设置 → 开发者 → Webhooks` 中的 `Zapier — person.created` 行。如果不存在，API 密钥在 Zap 打开时缺少 `settings:write`。重新生成，重新连接，关闭并打开 Zap。
- **`成员存在` 警告在添加/更新上** — 将操作从 *添加订阅者* 切换到 *添加/更新订阅者*（动词很重要）。upsert 变体是幂等的。
- **名字/姓氏来源为空** — B1 的 `data.name.first` 和 `data.name.last` 仅当这些字段在人员上设置时才填充。作为备用映射 `data.name.display`。

## 另请参阅

- [Zapier（概览）](../zapier) — 每个 Zapier 方案的 B1 侧
- [Make（概览）](../make) — 相同想法，可视化生成器
- [Webhooks（开发者参考）](/docs/developer/api/webhooks#event-catalog)
