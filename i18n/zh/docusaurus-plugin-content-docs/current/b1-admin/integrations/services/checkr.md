---
title: "Checkr"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) 为员工和志愿者提供背景审查服务——对于任何运营儿童或青少年事工的教会而言，这几乎是普遍需求。B1 **没有内置的背景审查功能**——发起审查、跟踪结果和审查合规性都在 Checkr 中完成；下面的方案只是将 B1 事件与其连接起来。Checkr 没有 Zapier 应用，但 [Make.com 的 Checkr 集成](https://www.make.com/en/integrations/checkr) 已通过验证，并提供了从 B1 事件发起审查所需的操作。

</div>

<div class="prereqs">
<h4>准备工作</h4>

- 一个拥有 API 访问权限并已配置至少一个审查套餐的 [Checkr](https://checkr.com) 账户
- 一个 [Make](https://www.make.com) 账户
- 一个拥有**编辑设置**权限的 B1Admin 用户

</div>

## 可以连接的内容

Make 的 Checkr 应用提供 1 个触发器和 6 个操作：

| 方向 | B1 / Make 触发器 | 操作 |
|---|---|---|
| B1 → Checkr | B1 `group.member.added`（按志愿者小组筛选） | Checkr：创建候选人 → 创建背景审查邀请 |
| Checkr → B1 | Checkr Webhook（邀请/报告事件） | B1：更新该人员的记录（例如打上"Checkr 已通过"标签） |

Make 的 Checkr 操作包括：创建候选人、创建背景审查邀请、获取候选人、获取报告、获取报告预计完成时间、获取邀请。另外还有 4 个搜索模块。

## 设置

### 1. 生成一个 B1 API 密钥

**设置 → 开发者 → API 密钥 → 新建 API 密钥**：

- `settings:write` — 用于触发器的 Webhook
- `people:read` — 用于在发起审查时查询人员的姓名/邮箱
- （可选）`people:write`，如果您想将报告状态写回为自定义字段或标签

### 2. 在 Make 中构建"志愿者报名后发起审查"的场景

1. **触发器** — B1.church：监听事件（`group.member.added`）。
2. **筛选** — 仅当 `data.groupId` 匹配您的"儿童事工志愿者"（或同类）小组时才继续。
3. **操作** — B1.church：查找人员（按 `data.personId`）以获取邮箱和名/姓。
4. **操作** — Checkr：创建候选人。将步骤 3 中的名/姓/邮箱映射过去。
5. **操作** — Checkr：创建背景审查邀请。将步骤 4 中新建候选人的 id 映射到 *candidate_id* 字段。选择审查套餐（例如 `tasker_standard` 或您账户中提供的其他套餐）。
6. （可选）**操作** — Slack：通知您的安全事工协调员，审查已启动。

启用该场景。目标小组中的新志愿者会自动收到 Checkr 的邮件邀请；他们通过手机或电脑完成审查；Checkr 进行筛查。

### 3. （可选）接收返回的报告

1. **触发器** — Checkr：监听事件（Webhook）。Make 会在启用时注册 Checkr Webhook。
2. **筛选** — 仅当 `event_type = report.completed` 时才继续。
3. **操作** — Checkr：获取报告（使用 Webhook 中的报告 id）。
4. **操作** — B1.church：查找人员（按候选人邮箱）。
5. **操作** — 条件式 Slack / 邮件：以 `clear`（通过）/`consider`（需审慎考虑）/`suspended`（暂停）状态通知协调员。

注意：B1 目前没有内置的"背景审查状态"字段。实用的做法是：(a) 将结果发布到私密 Slack 频道供审核，(b) 写入 Google 表格用于审计，或 (c) 在状态为 `clear` 时将该人员加入"已通过审查志愿者"这一 B1 小组。

## 常见方案

### 每 2 年重新审查志愿者

将上述流程与 Make 的日程触发器结合：

- **触发器** — Make：日程（每月）
- **操作** — B1.church：列出"已通过审查志愿者"小组的成员
- **操作** — 通过 Make 筛选：审查通过日期早于 22 个月前
- **操作** — Checkr：创建背景审查邀请（与初始流程相同）

### 在审查完成前阻止第一阶段访问权限

如果您的教会使用 B1 小组成员身份来控制访问权限（例如只有"已通过审查"小组的成员才会出现在服事排班中），可以让新志愿者先留在一个待定小组中，直到 Checkr 的 `report.completed` 事件将其转移出去。

## 限制与说明

- **Checkr 仅限美国使用**，适用于大多数审查套餐。澳大利亚、英国和加拿大的教会需要寻找替代方案。
- **按次收费**——Make 中的每一次创建邀请操作都会触发一次真实的审查。请先在 Checkr 的沙盒/测试账户中测试（Make 的 Checkr 应用遵循您在连接中提供的凭据，因此更换凭据即可切换沙盒/正式环境）。
- **Checkr 的 API 访问权限受套餐限制。**较小的 Checkr 账户可能仅限使用界面；请联系 Checkr 以启用 API。

## 故障排查

- **创建候选人失败并返回 `403`** — Checkr API 令牌为只读，或缺少相应的账户权限。请从 Checkr 仪表板重新签发带有写权限的令牌。
- **邀请一直未收到** — 检查步骤 3 中候选人的邮箱；该人员在 B1 中可能邮箱字段为空。请在 Checkr 步骤之前添加一个"邮箱必填"筛选。
- **Webhook 触发器不触发** — 如果您的 Make 账户不是支持出站 Webhook 的付费套餐，Checkr 的 Webhook 注册有时会静默失败。请在 Checkr 仪表板的 *Webhooks* 页面确认已列出 Make 的 URL。

## 另请参阅

- [Make（概览）](../make) — 每个 Make 场景的 B1 侧配置
- [Mobile Message](./mobile-message) — 适用于没有 Zapier 应用的短信服务商，与 Checkr 的 Make 连接采用相同的 Webhooks/HTTP 模式
- [Checkr API 文档](https://docs.checkr.com/)
