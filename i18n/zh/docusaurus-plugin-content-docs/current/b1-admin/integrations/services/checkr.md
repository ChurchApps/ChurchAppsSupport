---
title: "Checkr"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) 为员工和志愿者进行背景筛查 -- 对于任何运营儿童或青年项目的教堂来说都是普遍需求。B1 **没有内置的背景检查功能** -- 订购检查、追踪结果和筛查合规性都在 Checkr 中进行；下面的步骤只是将 B1 事件连接到它。Checkr 没有 Zapier 应用程序，但 [Make.com 的 Checkr 集成](https://www.make.com/en/integrations/checkr)已验证并公开了从 B1 事件启动检查所需的操作。

</div>

<div class="prereqs">
<h4>开始前</h4>

- 一个具有 API 访问权限和至少配置一个筛查包的 [Checkr](https://checkr.com) 账户
- 一个 [Make](https://www.make.com) 账户
- 一个具有**编辑设置**权限的 B1Admin 用户

</div>

## 您可以连接的内容

Make 的 Checkr 应用程序公开 1 个触发器和 6 个操作：

| 方向 | B1 / Make 触发器 | 操作 |
|---|---|---|
| B1 → Checkr | B1 `group.member.added`（筛选到志愿者小组） | Checkr：创建候选人 → 创建背景检查邀请 |
| Checkr → B1 | Checkr webhook（邀请/报告事件） | B1：更新个人记录（例如标签"Checkr 已清除"） |

Make 的 Checkr 操作：创建候选人、创建背景检查邀请、获取候选人、获取报告、获取报告的 ETA、获取邀请。加上 4 个搜索模块。

## 设置

### 1. 铸造一个 B1 API 密钥

**设置 → 开发者 → API 密钥 → 新 API 密钥**：

- `settings:write` — 对于触发 webhook
- `people:read` — 启动检查时查找个人的名称/电子邮件
- （可选）`people:write` 如果您想将报告状态写回作为自定义字段或标签

### 2. 在 Make 中构建"志愿者注册时启动检查"场景

1. **触发器** — B1.church：监视事件（`group.member.added`）。
2. **筛选器** — 仅当 `data.groupId` 与您的"儿童志愿者"（或等效）小组相匹配时继续。
3. **操作** — B1.church：查找人员（按 `data.personId`）以获取电子邮件 + 名/姓。
4. **操作** — Checkr：创建候选人。从第 3 步映射名/姓/电子邮件。
5. **操作** — Checkr：创建背景检查邀请。将新候选人 ID 从第 4 步映射到*candidate_id*字段。选择筛查包（例如 `tasker_standard` 或您的账户公开的任何内容）。
6. （可选）**操作** — Slack：通知您的安全事工协调员已启动检查。

打开场景。目标小组中的新志愿者会自动收到 Checkr 邀请电子邮件；他们在手机或笔记本电脑上完成；Checkr 运行筛查。

### 3. （可选）接收报告

1. **触发器** — Checkr：监视事件（webhook）。Make 在激活时注册一个 Checkr webhook。
2. **筛选器** — 仅当 `event_type = report.completed` 时继续。
3. **操作** — Checkr：获取报告（使用 webhook 中的报告 ID）。
4. **操作** — B1.church：查找人员（按候选人电子邮件）。
5. **操作** — 条件 Slack/电子邮件：通知协调员 `clear` / `consider` / `suspended` 状态。

注意：B1 今天没有内置的"背景检查状态"字段。实用选项是 (a) 将结果发布到私有 Slack 频道进行审查，(b) 将其写入 Google 工作表进行审计，或 (c) 在 `clear` 时将个人添加到"已清除志愿者" B1 小组。

## 常见方案

### 每 2 年重新筛查志愿者

将上述与 Make 计划触发器配对：

- **触发器** — Make：计划（每月）
- **操作** — B1.church：列出"已清除志愿者"的小组成员
- **操作** — 筛选者：按 Make 清除日期早于 22 个月
- **操作** — Checkr：创建背景检查邀请（与初始流相同）

### 在检查完成前阻止阶段 1 访问

如果您的教堂使用 B1 小组成员身份来限制访问（例如只有"已清除"小组成员出现在服务计划中），请将新志愿者保留在候补小组中，直到 Checkr `report.completed` 事件将其翻转。

## 限制和注释

- **Checkr 仅限美国** 对于大多数筛查包。澳大利亚、英国和加拿大教堂将需要替代方案。
- **定价** 是按检查 -- Make 中的每个创建邀请都会进行真正的检查。首先在 Checkr 的沙箱/暂存账户中测试（Make 的 Checkr 应用程序尊重您在连接中传递的凭据，因此交换凭据可以切换沙箱/实时）。
- **Checkr API 访问受计划限制。** 较小的 Checkr 账户可能在仅 UI 层；联系 Checkr 启用 API。

## 故障排除

- **创建候选人失败，出现 `403`** -- Checkr API 令牌是只读的或缺少正确的账户权限。从 Checkr 仪表板使用写入范围重新发布。
- **邀请从未到达** -- 检查第 3 步中的候选人电子邮件；B1 可能对该个人有空的电子邮件字段。在 Checkr 步骤之前添加一个需要电子邮件的筛选器。
- **Webhook 触发器不触发** -- 如果您的 Make 账户不在支持出站 webhook 的付费层上，Checkr 的 webhook 注册有时会以静默方式失败。验证在 Checkr 的仪表板*Webhooks*页面中列出了 Make 的 URL。

## 另见

- [Make（概览）](../make) -- 每个 Make 场景的 B1 端
- [移动消息](./mobile-message) -- 对于没有 Zapier 应用程序的 SMS 提供商，与 Checkr Make 接线相同的 Webhooks/HTTP 模式
- [Checkr API 文档](https://docs.checkr.com/)
