---
title: "Checkr"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) 为员工和志愿者进行背景筛查 — 对于任何运行儿童或青年项目的教会来说几乎是普遍需要。Checkr 没有 Zapier 应用，但 [Make.com 的 Checkr 集成](https://www.make.com/en/integrations/checkr) 已验证并公开了从 B1 事件启动检查所需的操作。

</div>

<div class="prereqs">
<h4>开始前</h4>

- 一个具有 API 访问权限和至少一个筛查包配置的 [Checkr](https://checkr.com) 账户
- 一个 [Make](https://www.make.com) 账户
- 一个具有 **编辑设置** 权限的 B1Admin 用户

</div>

## 您可以连接什么

Make 的 Checkr 应用公开 1 个触发器和 6 个操作：

| 方向 | B1/Make 触发器 | 操作 |
|---|---|---|
| B1 → Checkr | B1 `group.member.added`（过滤到志愿者小组） | Checkr：创建候选人 → 创建背景检查邀请 |
| Checkr → B1 | Checkr webhook（邀请/报告事件） | B1：更新人员记录（例如标记"Checkr 已清除"） |

Make 的 Checkr 操作：创建候选人、创建背景检查邀请、获取候选人、获取报告、获取报告的 ETA、获取邀请。加上 4 个搜索模块。

## 设置

### 1. 生成一个 B1 API 密钥

**设置 → 开发者 → API 密钥 → 新建 API 密钥**：

- `settings:write` — 用于触发器 webhook
- `people:read` — 用于启动检查时查找人员的名称/电子邮件
- （可选）`people:write` 如果您想将报告状态写回为自定义字段或标记

### 2. 在 Make 中构建"在志愿者注册时启动检查"场景

1. **触发器** — B1.church：观察事件（`group.member.added`）。
2. **过滤器** — 仅当 `data.groupId` 匹配您的"儿童志愿者"（或等效）小组时继续。
3. **操作** — B1.church：查找人员（按 `data.personId`）以获取电子邮件 + 名字/姓氏。
4. **操作** — Checkr：创建候选人。从步骤 3 映射名字/姓氏/电子邮件。
5. **操作** — Checkr：创建背景检查邀请。将步骤 4 中的新候选人 id 映射到 *candidate_id* 字段。选择筛查包（例如 `tasker_standard` 或您的账户公开的任何东西）。
6. （可选）**操作** — Slack：通知您的安全事工协调员已启动检查。

打开场景。针对目标小组的新志愿者自动通过电子邮件获得 Checkr 邀请；他们在手机或笔记本电脑上完成；Checkr 运行屏幕。

### 3. （可选）接收报告返回

1. **触发器** — Checkr：观察事件（webhook）。Make 在激活时注册 Checkr webhook。
2. **过滤器** — 仅当 `event_type = report.completed` 时继续。
3. **操作** — Checkr：获取报告（使用 webhook 中的报告 id）。
4. **操作** — B1.church：查找人员（按候选人电子邮件）。
5. **操作** — 条件 Slack/电子邮件：用 `clear`/`consider`/`suspended` 状态通知协调员。

注意：B1 今天没有内置"背景检查状态"字段。实用的选项是 (a) 将结果发布到私有 Slack 频道供审查，(b) 写入 Google Sheet 供审计，或 (c) 在 `clear` 时将人员添加到"已清除志愿者"B1 小组。

## 常见方案

### 每 2 年重新筛查志愿者

将上述与 Make 时间表触发器配对：

- **触发器** — Make：时间表（每月）
- **操作** — B1.church：列出"已清除志愿者"的小组成员
- **操作** — 按 Make 过滤：已清除日期早于 22 个月
- **操作** — Checkr：创建背景检查邀请（与初始流程相同）

### 在检查完成前阻止阶段 1 访问

如果您的教会使用 B1 小组成员身份来控制访问权限（例如仅"已清除"小组成员出现在服务计划中），在 Checkr `report.completed` 事件翻转他们之前将新志愿者保留在等候小组中。

## 限制和注释

- **Checkr 仅限美国**，适用于大多数筛查包。澳大利亚、英国和加拿大教会将需要替代方案。
- **定价** 按检查 — Make 中的每个创建邀请都会消耗真实检查。首先在 Checkr 的沙箱/暂存账户中测试（Make 的 Checkr 应用尊重您在连接中传递的凭证，所以交换凭证会切换沙箱/实时）。
- **Checkr API 访问是计划门控的。** 较小的 Checkr 账户可能在仅限 UI 的层上；联系 Checkr 启用 API。

## 故障排查

- **创建候选人失败，显示 `403`** — Checkr API 令牌是只读的或缺少正确的账户权限。从 Checkr 仪表板用写入 scope 重新颁发它。
- **邀请从未到达** — 检查步骤 3 中候选人的电子邮件；B1 可能对该人员有空的电子邮件字段。在 Checkr 步骤之前添加电子邮件必需过滤器。
- **Webhook 触发器不触发** — Checkr 的 webhook 注册有时如果您的 Make 账户不在支持出站 webhooks 的付费层上就会无声地失败。在 Checkr 仪表板 *Webhooks* 页面验证 Make 的 URL 已列出。

## 另请参阅

- [Make（概览）](../make) — 每个 Make 场景的 B1 侧
- [Mobile Message](./mobile-message) — 用于没有 Zapier 应用的短信提供商，与 Checkr Make 连接相同的 Webhooks/HTTP 模式
- [Checkr API 文档](https://docs.checkr.com/)
