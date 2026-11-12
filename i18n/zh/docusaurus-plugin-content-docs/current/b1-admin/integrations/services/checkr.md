---
title: "Checkr"
description: "通过 Make.com 将 B1 Admin 的志愿者报名连接到 Checkr 背景调查，并可为安全事工协调员设置报告状态提醒。"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) 为员工和志愿者提供背景筛查服务——对于任何开办儿童或青少年事工的教会而言，这几乎是必然的需求。B1 **没有内置的背景调查功能**——发起调查、追踪结果以及筛查合规性，全部都在 Checkr 中进行；以下的范例只是将 B1 事件与 Checkr 连接起来。Checkr 没有 Zapier 应用程序，但 [Make.com 的 Checkr 整合](https://www.make.com/en/integrations/checkr)已通过验证，并提供你所需的操作，让你能够从 B1 事件发起调查。

</div>

:::caution
此范例使用 B1.church Make 应用程序，该应用程序尚未推出（参见 [Make](../make.md)）。在此之前，这些场景中 B1 的部分必须使用 Make 的 **HTTP** 模块调用 B1 的 [REST API](/docs/developer/api) 来建立。
:::

<div class="prereqs">
<h4>开始之前</h4>

- 一个具有 API 访问权限、且至少设置了一个筛查套餐的 [Checkr](https://checkr.com) 账户
- 一个 [Make](https://www.make.com) 账户
- 一位在 B1Admin 中具有 **Edit Settings** 权限的用户

</div>

## 你可以设置的内容 {#what-you-can-wire-up}

Make 的 Checkr 应用程序提供 1 个触发器和 6 个操作：

| 方向 | B1 / Make 触发器 | 操作 |
|---|---|---|
| B1 → Checkr | B1 `group.member.added`（筛选为志愿者小组） | Checkr：Create Candidate → Create Background Check Invitation |
| Checkr → B1 | Checkr webhook（邀请 / 报告事件） | B1：更新该人员的记录（例如标记"Checkr cleared"） |

Make 的 Checkr 操作包括：Create Candidate、Create Background Check Invitation、Get Candidate、Get Report、Get Report's ETA，以及 Get an Invitation。另外还有 4 个搜索模块。

## 设置 {#setup}

### 1. 建立 B1 API 密钥 {#1-mint-a-b1-api-key}

在 **Settings → Developer → API Keys → New API Key** 中：

- `settings:write`——用于触发器 webhook
- `people:read`——用于在开始调查时查找该人员的姓名与电子邮件
- （选填）`people:write`——如果你想将报告状态写回为自定义栏位或标签

### 2. 在 Make 中建立"志愿者报名时发起调查"的场景 {#2-build-the-kick-off-a-check-on-volunteer-signup-scenario-in-make}

1. **触发器**——B1.church：Watch Events（`group.member.added`）。
2. **筛选**——仅当 `data.groupId` 符合你的"儿童事工志愿者"（或同类）小组时才继续。
3. **操作**——B1.church：Find Person（依 `data.personId`）以取得电子邮件和名字／姓氏。
4. **操作**——Checkr：Create Candidate。将第 3 步的名字、姓氏和电子邮件映射过来。
5. **操作**——Checkr：Create Background Check Invitation。将第 4 步新建的 candidate ID 映射到 *candidate_id* 字段。选择筛查套餐（例如 `tasker_standard`，或你的账户所提供的其他套餐）。
6. （选填）**操作**——Slack：通知你的安全事工协调员，告知已发起调查。

开启场景。目标小组中的新志愿者会通过电子邮件自动收到 Checkr 邀请；他们可以用手机或笔记本电脑完成填写，然后由 Checkr 执行筛查。

### 3.（选填）接收报告结果 {#3-optional-receive-the-report-back}

1. **触发器**——Checkr：Watch Events（webhook）。Make 会在启用时注册 Checkr webhook。
2. **筛选**——仅当 `event_type = report.completed` 时才继续。
3. **操作**——Checkr：Get Report（使用 webhook 中的报告 ID）。
4. **操作**——B1.church：Find Person（依候选人电子邮件）。
5. **操作**——条件式 Slack／电子邮件：以 `clear`（通过）／`consider`（需考虑）／`suspended`（暂停）状态通知协调员。

注意：B1 目前没有内置的"背景调查状态"栏位。较为实际的做法有：(a) 将结果发布到私人 Slack 频道供审阅；(b) 写入 Google Sheet 以作审计记录；或 (c) 在结果为 `clear` 时，将该人员加入 B1 中的"已通过志愿者"小组。

## 常见范例 {#common-recipes}

### 每两年重新筛查志愿者 {#re-screen-volunteers-every-2-years}

将上述流程与 Make 的排程触发器搭配使用：

- **触发器**——Make：Schedule（每月）
- **操作**——HTTP — Make a request：对你的"已通过志愿者"小组，发出 GET 请求至 B1 的 `/membership/groupmembers?groupId=…`（B1.church 应用程序没有列表操作）
- **操作**——Make 筛选：通过日期早于 22 个月前的人员
- **操作**——Checkr：Create Background Check Invitation（与初始流程相同）

### 在调查完成前限制第一阶段的访问 {#block-stage-1-access-until-check-completes}

如果你的教会利用 B1 的小组成员资格来控制访问权限（例如，只有"已通过"小组的成员才会出现在服事排班中），请将新志愿者保留在暂存小组中，直到 Checkr 的 `report.completed` 事件将其状态更新为止。

## 限制与注意事项 {#limits--notes}

- **Checkr 的大多数筛查套餐仅适用于美国**。澳大利亚、英国和加拿大的教会需要其他替代方案。
- **收费方式**是按次计算的——Make 中每一次 Create Invitation 都会实际消耗一次调查。请先在 Checkr 的沙盒／测试账户中进行测试（Make 的 Checkr 应用程序会使用你在连接中传入的凭证，因此更换凭证即可在沙盒与正式环境之间切换）。
- **Checkr API 访问受方案限制**。较小的 Checkr 账户可能只能使用网页界面，请联系 Checkr 以开启 API。

## 故障排除 {#troubleshooting}

- **Create Candidate 返回 `403`**——Checkr API 令牌为只读，或缺少正确的账户权限。请在 Checkr 控制台中以写入权限重新签发。
- **邀请始终没有送达**——请检查第 3 步中的候选人电子邮件；B1 中该人员的电子邮件栏位可能为空。请在 Checkr 步骤之前加入"需要电子邮件"的筛选。
- **Webhook 触发器没有启动**——如果你的 Make 账户未使用支持外发 webhook 的付费方案，Checkr 的 webhook 注册有时会静默失败。请在 Checkr 控制台的 *Webhooks* 页面确认已列出 Make 的网址。

## 另见 {#see-also}

- [Make（概览）](../make.md)：每个 Make 场景的 B1 端设置
- [Mobile Message](./mobile-message.md)：适用于没有 Zapier 应用程序的短信服务商，其 Webhooks／HTTP 模式与 Checkr 的 Make 设置相同
- [Checkr API 文档](https://docs.checkr.com/)
