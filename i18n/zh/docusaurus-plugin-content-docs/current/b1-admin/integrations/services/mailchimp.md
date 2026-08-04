---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

将新的 B1 人员、捐赠者或小组成员导入 Mailchimp 受众列表，这样下一次欢迎邮件系列、年终募捐或志愿者简报都能从一份始终最新的名单中获取数据。B1 没有内置的 Mailchimp 同步功能——所有连接逻辑都在 Zapier（或 Make）中完成：B1 触发事件，Mailchimp 接收订阅者。

</div>

<div class="prereqs">
<h4>准备工作</h4>

- 一个 [Mailchimp](https://mailchimp.com) 账户，至少有一个您想让 B1 人员导入的受众列表
- 一个 [Zapier](https://zapier.com) 账户（免费套餐即可满足小型教会需求）
- 一个拥有**编辑设置**权限的 B1Admin 用户，以便生成 API 密钥

</div>

## 可以连接的内容

| 方向 | B1 触发器 | Mailchimp 操作 |
|---|---|---|
| B1 → Mailchimp | `person.created` | 添加/更新订阅者 |
| B1 → Mailchimp | `donation.created` | 为订阅者添加标签（例如"2026 年已捐款"） |
| B1 → Mailchimp | `group.member.added` | 为订阅者添加该小组对应的标签 |
| Mailchimp → B1 | 新订阅者 | B1 *创建人员* |

Mailchimp 一侧还提供更多功能（营销活动、细分、自动化）——完整列表请参阅 [Mailchimp 的 Zapier 触发器](https://zapier.com/apps/mailchimp/integrations)。任何可从 B1 事件包中映射的内容都可以使用。

## 设置

### 1. 生成一个 B1 API 密钥

在 B1Admin 中前往**设置 → 开发者 → API 密钥 → 新建 API 密钥**。为其授予 Zap 所需的权限范围：

- `settings:write` — 触发器注册 Webhook 所必需
- `people:read` — 以便 Zap 能读取名/姓、邮箱等信息
- （可选）`people:write`，如果您还计划实现 Mailchimp → B1 方向的同步

保存并复制 `cak_…` 字符串——它只会显示一次。

### 2. 构建 Zap

1. **触发器：**`B1.church — New Person`（新人员）。首次使用时，Zapier 会要求您*登录 B1.church*；粘贴 API 密钥即可。
2. **操作：**`Mailchimp — Add/Update Subscriber`（添加/更新订阅者）。映射触发器输出：
   - `data.contactInfo.email` → 电子邮箱
   - `data.name.first` → 名字
   - `data.name.last` → 姓氏
   - （可选）`data.id` → 如果您想同时保留 B1 的人员 id，可映射到 Mailchimp 的合并字段。
3. 启用该 Zap。Zapier 会在 B1 上注册一个 `person.created` Webhook——请在**设置 → 开发者 → Webhooks** 中确认出现一行名为"Zapier — person.created"的记录。

就这样。在 B1Admin 中添加一个人员来确认——几秒钟内新订阅者就会出现在 Mailchimp 中。

## 常见方案

### 自动为捐赠者打标签

- **触发器** — B1：新捐款
- **操作** — B1：查找人员（按 `personId` 查询）以获取邮箱
- **操作** — Mailchimp：为订阅者添加标签（标签为 `Gave-2026`）

### 推送特定小组的欢迎邮件系列

- **触发器** — B1：新小组成员，按 `data.groupId` 筛选
- **操作** — Mailchimp：为订阅者添加以该小组命名的标签；用该标签触发您已有的自动化流程

### 双向同步：Mailchimp 的新订阅者成为 B1 联系人

- **触发器** — Mailchimp：新订阅者
- **操作** — B1：创建人员（映射名/姓/邮箱）

## Make 替代方案

Make 的 [Mailchimp 应用](https://www.make.com/en/integrations/mailchimp) 提供 44 个模块——接线方式相同，只是用 B1 的 *Watch Events*（监听事件）触发器取代了 Zapier 的触发器。B1 一侧的配置请参阅 [Make 概览文档](../make)。

## 限制与说明

- **Mailchimp 免费套餐对联系人和受众数量有上限** — 如果 Zap 让免费受众列表超出上限，会开始报 `4xx Member limit reached`（成员数超限）错误。Mailchimp 的日志会清楚显示这一点。
- **Mailchimp 按邮箱去重**，因此对同一个 B1 人员重复运行 Zap 只会更新其信息，不会产生重复记录。
- **Mailchimp 的退订不会同步回 B1。**如果您希望 Mailchimp 的退订能清除 B1 中的"接收邮件"偏好，需要显式构建反向 Zap。

## 故障排查

- **Zap 从不触发** — 检查`设置 → 开发者 → Webhooks`中是否有 `Zapier — person.created` 这一行。如果没有，说明启用 Zap 时 API 密钥缺少 `settings:write` 权限。重新生成密钥、重新连接，并将 Zap 关闭再重新开启。
- **添加/更新时出现"Member exists"（成员已存在）警告** — 将操作从*添加订阅者*改为*添加/更新订阅者*（动词很重要）。upsert 变体是幂等的。
- **名字/姓氏为空** — B1 的 `data.name.first` 和 `data.name.last` 只有在该人员设置了这些字段时才会有值。可将 `data.name.display` 映射为备用字段。

## 另请参阅

- [Zapier（概览）](../zapier) — 每个 Zapier 方案的 B1 侧配置
- [Make（概览）](../make) — 相同思路，可视化构建器
- [Webhooks（开发者参考）](/docs/developer/api/webhooks#event-catalog)
