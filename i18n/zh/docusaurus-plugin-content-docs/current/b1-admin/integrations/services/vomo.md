---
title: "VOMO"
---

# VOMO

<div class="article-intro">

VOMO 是一个志愿者参与平台 — 人员注册项目，在亭中办理登记，并累积小时。如果您为志愿者计划使用 VOMO 但 B1 用于人员记录，Zapier 可以在两者之间同步成员身份和办理登记，以便都不会漂移。

</div>

<div class="prereqs">
<h4>开始前</h4>

- 一个在公开 Zapier 的计划上的 [VOMO](https://vomo.org) 账户（如果不确定，与 VOMO 支持检查）
- 一个 [Zapier](https://zapier.com) 账户
- 一个具有 **编辑设置** 权限的 B1Admin 用户

</div>

## 您可以连接什么

VOMO 的 Zapier 应用公开四个即时触发器和四个操作。大多数教会想要的方案：

| 方向 | 触发器 | 操作 |
|---|---|---|
| VOMO → B1 | VOMO 成员身份（创建） | B1：查找人员 → 创建人员（如果新） |
| VOMO → B1 | VOMO 亭办理登记 | B1：向"当前服务"小组添加小组成员，或记录为出席 |
| B1 → VOMO | B1 `person.created` | VOMO：查找组织者（按电子邮件）；否则自定义步骤 |
| 要么 | VOMO 参与（注册） | B1：向特定项目小组添加小组成员 |

VOMO 操作仅限于 **起草项目** 和 **查找** 现有组织者/项目 — 今天没有"将此人员添加到 VOMO 项目"操作。有趣的连接主要是 VOMO → B1。

## 设置

### 1. 生成一个 B1 API 密钥

**设置 → 开发者 → API 密钥 → 新建 API 密钥**。Scopes：

- `people:read`、`people:write` — 查找和创建志愿者作为 B1 人员
- `groups:write` — 将他们添加到服务团队小组
- （可选）`attendance:write` 如果您将亭办理登记视为出席

### 2. 构建成员身份同步 Zap

1. **触发器** — VOMO：成员身份（事件 = `created`）。
2. **操作** — B1.church：查找人员，按电子邮件匹配。
3. **过滤/路径** — 在找到与未找到上分岔：
   - 未找到 → B1.church：创建人员，然后向适当的志愿者小组添加小组成员。
   - 找到 → B1.church：直接添加小组成员。
4. 打开。新 VOMO 志愿者现在以正确的小组成员身份出现在 B1 中。

### 3. （可选）构建亭办理登记 Zap

1. **触发器** — VOMO：亭
2. **操作** — B1.church：查找人员（按电子邮件）
3. **操作** — 您的选择：
   - *如果视为出席* — Webhooks by Zapier POST 到 B1 的 `/attendance/visits` 端点（B1 的 Zapier 应用还没有一流的 *记录出席* 操作）。B1 [API 密钥](/docs/developer/api/api-keys) 进入 `Authorization: Bearer cak_…` 标头。
   - *如果视为小组成员身份* — B1.church：添加小组成员，带"当前服务（今天）"小组，以及稍后一天的第二个 Zap 进行清理删除。

## 常见方案

### 每项目小组同步

- **触发器** — VOMO：参与（创建）
- **操作** — Zapier 对项目 id 过滤，然后
- **操作** — B1.church：向小组添加小组成员，其名称镜像 VOMO 项目。

当 VOMO 项目结束时，手动清除 B1 小组（或将其与 *参与已删除* 触发器配对，将其删除）。

### 通过短信发送"感谢注册"文本

在同一 Zap 中链接 VOMO 参与 → Clearstream 发送文本或 Text In Church 发送消息。两者都有一流的 Zapier 操作 — 查看 [Clearstream](./clearstream) 和 [Text In Church](./text-in-church)。

### 检测掉队

运行每天 Zapier *时间表* 触发器，在 VOMO 中调用查找组织者用于本月加入服务团队的 B1 人员列表 — 如果 VOMO 返回"未找到"，他们没有激活 VOMO，需要推动。

## 限制和注释

- **电子邮件是连接键。** VOMO 的有效负载公开用户电子邮件，但没有 B1 人员 id。在每个系统中使用不同电子邮件的捐赠者将创建重复项。
- **VOMO 的 Zapier 应用中今天没有"添加到项目"操作。** 如果您需要 B1 → VOMO 项目注册，您需要从 *Webhooks by Zapier* 步骤 POST 到 VOMO 的 REST API，这是自定义集成。
- **VOMO 的免费/较低层可能不包括 Zapier。** 在承诺连接日期前与 VOMO 支持确认。

## 故障排查

- **触发器从未触发** — VOMO 的即时触发器需要 API 令牌保持有效。重新测试 Zap；如果令牌被轮换，重新连接 VOMO。
- **B1 *添加小组成员* 失败，显示 422** — 操作中的小组 id 不存在。打开 **B1Admin → 小组**，点击小组，并将 URL 的 id 段复制到 Zap 步骤。
- **来自单个 VOMO 志愿者的重复 B1 人员** — 他们可能在与他们已有的 B1 中不同的电子邮件下注册。要么规范电子邮件，要么添加 Zapier *路径*，也按电话搜索，然后创建。

## 另请参阅

- [Zapier（概览）](../zapier) — 每个 Zapier 方案的 B1 侧
- [Clearstream](./clearstream)、[Text In Church](./text-in-church) — 配对志愿者注册与短信确认
- [Webhooks（开发者参考）](/docs/developer/api/webhooks) — VOMO 可以触发的事件
