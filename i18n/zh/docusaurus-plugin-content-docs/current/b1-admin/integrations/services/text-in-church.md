---
title: "Text In Church"
description: "通过 Zapier 将 B1 Admin 与 Text In Church 连接：建立 API 密钥、设置连接卡到 B1 的 Zap，并同步小组成员资格。"
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) 结合了短信、培育工作流程（drip）以及连接卡自动化。它的 Zapier 应用程序支持两个方向——将 B1 事件导入 Text In Church 工作流程，也能将连接卡或新联络人触发器从另一端汇入 B1。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 一个方案包含 Zapier 整合功能的 [Text In Church](https://textinchurch.com) 账户
- 一个 [Zapier](https://zapier.com) 账户
- 一位在 B1Admin 中具有 **Edit Settings** 权限的用户

</div>

## 你可以设置的内容 {#what-you-can-wire-up}

| 方向 | 触发器 | 操作 |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Create/Update Person + Add to Group |
| B1 → Text In Church | B1 `form.submission.created` | 透过相关团队发送短信 |
| B1 → Text In Church | B1 `group.member.added` | Add to Group（同步小组成员资格） |
| Text In Church → B1 | Connect Card Submitted | B1：Create Person + Add Group Member |
| Text In Church → B1 | Person Created | B1：Create Person |
| Text In Church → B1 | Person Joined Group | B1：Add Group Member |

Text In Church 的操作还包括 *Send Text Message*、*Send Voice Broadcast*、*Create Task*、*Find Person/Group*，以及小组成员的新增／移除。

## 设置 {#setup}

### 1. 建立 B1 API 密钥 {#1-mint-a-b1-api-key}

**Settings → Developer → API Keys → New API Key**：

- `settings:write`——将密钥连接到 Zapier，以及由 B1 触发的 Zap 所需
- `people:read`、`people:write`——用于查找或建立人员
- `groups:write`——用于小组同步
- （选填）`donations:write`——如果你要将奉献确认连接到 TIC

### 2. 将 Text In Church 连接到 Zapier {#2-connect-text-in-church-to-zapier}

请依照 [Text In Church 的 Zapier 整合指南](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration)操作。他们会从 TIC 控制台中产生 API 令牌。

### 3. 建立连接卡到 B1 的 Zap {#3-build-the-connect-card-to-b1-zap}

这是最常见的方向。从 TIC 提交的连接卡会自动成为 B1 的新人员。

1. **触发器**——Text In Church：Connect Card Submitted。
2. **操作**——B1.church：Find Person（依电子邮件）。
3. **操作**——B1.church：Add Group Member，加入"New Contact"小组，使用第 2 步中该人员的 ID。

当没有人符合条件时，B1 的 *Find Person* 会以"No person found"错误停止 Zap，因此 Path 无法据此分支。对于新联络人，请为 Find Person 步骤开启 Zapier 的错误处理，并在其错误路径中执行 B1.church：Create Person，然后执行 Add Group Member。

开启 Zap。之后通过 TIC 提交的连接卡会自动进入 **B1Admin → People**。

## 常见范例 {#common-recipes}

### 从 B1 表单触发类似连接卡的工作流程 {#trigger-a-connect-card-style-workflow-from-a-b1-form}

- **触发器**——B1.church：New Form Submission（依"我是新来的"表单 ID 筛选）
- **操作**——Text In Church：Create/Update Person，将表单的电子邮件／电话／姓名回答进行映射
- **操作**——Text In Church：Add to Group，该小组已附加预先建立的欢迎工作流程

### 同步小组成员资格 {#mirror-group-membership}

- **触发器**——B1.church：New Group Member，依特定的 `groupId` 筛选
- **操作**——Text In Church：Add to Group（同一人员，镜像小组）。如果你要完整同步，请搭配 `group.member.removed` 的 Zap。

### 有人加入时通知负责人 {#page-a-leader-when-someone-joins}

- **触发器**——B1.church：New Group Member
- **操作**——Text In Church：Send Text Message，收件人为小组负责人的电话，内容为 `"{first} {last} just joined {group}"`。

## 限制与注意事项 {#limits--notes}

- **TIC 的 Zapier 应用程序受方案等级限制**。如果 TIC 控制台中的 Zapier 整合呈灰色无法使用，请联系 TIC 支持以在你的方案中开启。
- **小组 ID 是 TIC 的，而非 B1 的**。进行镜像时，你需要在某处维护一份对应表（Zapier *Lookup Table*，或在每个 Zap 中硬编码）。
- **Send Text Message 会消耗额度**。每个触发 *Send Text* 的 Zap 都会从你的 TIC 短信配额中扣除。

## 故障排除 {#troubleshooting}

- **连接卡触发器没有启动**——TIC 需要开启 Zapier 整合开关。另请确认你用来测试的表单已设置为"Connect Card"，而非一般问卷。
- **B1 中的 Create Person 返回 401**——API 密钥有误、已被撤销，或缺少 `people:write`。请重新建立密钥。
- **B1 中出现重复人员**——TIC 会对同一事件同时发送 *Person Created* 与 *Connect Card Submitted*。请选择其中一个作为主要来源，并在另一个上加入 Zapier Filter。

## 另见 {#see-also}

- [Clearstream](./clearstream.md)：另一个短信平台，Zapier 结构相似
- [Zapier（概览）](../zapier.md)：每个 Zapier 范例的 B1 端设置
- [Text In Church Zapier 指南](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration)（TIC 的文档）
