---
title: "VOMO"
description: "通过 Zapier 将 VOMO 的志愿者报名与自助报到连接到 B1 Admin 的人员与小组，包括 API 密钥权限范围与设置步骤。"
---

# VOMO

<div class="article-intro">

VOMO 是一个志愿者参与平台——人们在这里报名项目、在报到机上签到，并累积服务时数。如果你使用 VOMO 安排志愿服务，而使用 B1 管理人员资料，Zapier 可以在两者之间同步成员资格与报到记录，让双方的数据不会产生差异。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 一个方案支持 Zapier 的 [VOMO](https://vomo.org) 账户（如果不确定，请咨询 VOMO 支持）
- 一个 [Zapier](https://zapier.com) 账户
- 一位在 B1Admin 中具有 **Edit Settings** 权限的用户

</div>

## 你可以设置的内容 {#what-you-can-wire-up}

VOMO 的 Zapier 应用程序提供四个即时触发器和四个操作。大多数教会想要的范例如下：

| 方向 | 触发器 | 操作 |
|---|---|---|
| VOMO → B1 | VOMO Membership（已建立） | B1：Find Person → Create Person（若为新人员） |
| VOMO → B1 | VOMO Kiosk check-in | B1：Add Group Member 加入"Currently Serving"小组，或记录为出席 |
| B1 → VOMO | B1 `person.created` | VOMO：Find Organizer（依电子邮件）；否则使用自定义步骤 |
| 两者皆可 | VOMO Participation（报名） | B1：Add Group Member 加入项目专属小组 |

VOMO 的操作目前仅限于**草拟项目**以及**查找**现有的组织者／项目——目前没有"将此人员加入 VOMO 项目"的操作。最有价值的设置主要是 VOMO → B1。

## 设置 {#setup}

### 1. 建立 B1 API 密钥 {#1-mint-a-b1-api-key}

**Settings → Developer → API Keys → New API Key**。权限范围：

- `settings:write`——Zapier 在连接时会将每个 B1 密钥与 B1 的 webhook 清单进行核对，因此没有此权限连接会失败
- `people:read`、`people:write`——用于将志愿者作为 B1 人员进行查找与建立
- `groups:write`——用于将他们加入服事团队小组
- （选填）`attendance:write`——如果你将报到机签到视为出席

### 2. 建立成员同步的 Zap {#2-build-the-membership-sync-zap}

1. **触发器**——VOMO：Membership（event = `created`）。
2. **操作**——B1.church：Find Person，依电子邮件匹配。
3. **操作**——B1.church：Add Group Member，将第 2 步的人员加入适当的志愿者小组。

   当没有人符合条件时，B1 的 *Find Person* 会以"No person found"错误停止 Zap。对于尚未存在于 B1 中的志愿者，请为 Find Person 步骤开启 Zapier 的错误处理，并在其错误路径中执行 B1.church：Create Person，然后执行 Add Group Member。
4. 开启。新的 VOMO 志愿者现在会以正确的小组成员资格出现在 B1 中。

### 3.（选填）建立报到机签到的 Zap {#3-optional-build-the-kiosk-check-in-zap}

1. **触发器**——VOMO：Kiosk
2. **操作**——B1.church：Find Person（依电子邮件）
3. **操作**——依你的选择：
   - *若视为出席*——以 Webhooks by Zapier 对 B1 的 `/attendance/visits` 端点发送 POST（B1 的 Zapier 应用程序目前还没有一流的 *Record Attendance* 操作）。B1 [API 密钥](/docs/developer/api/api-keys)放在 `Authorization: Bearer cak_…` 标头中。
   - *若视为小组成员资格*——B1.church：Add Group Member，加入"Currently Serving (Today)"小组，并在当天稍后以另一个 Zap 透过排定的清理作业将其移除。

## 常见范例 {#common-recipes}

### 依项目同步小组 {#per-project-group-sync}

- **触发器**——VOMO：Participation（已建立）
- **操作**——依项目 ID 进行 Filter by Zapier，然后
- **操作**——B1.church：Add Group Member，加入名称与 VOMO 项目相同的 B1 小组。

当 VOMO 项目结束时，请手动清空该 B1 小组（或搭配 *Participation deleted* 触发器，将其移除）。

### 透过短信发送"感谢报名"讯息 {#send-a-thanks-for-signing-up-text-via-sms}

在同一个 Zap 中串接 VOMO Participation → Clearstream Send Text 或 Text In Church Send Message。两者都有一流的 Zapier 操作——请参阅 [Clearstream](./clearstream.md) 与 [Text In Church](./text-in-church.md)。

### 侦测流失情况 {#detect-drop-off}

每天执行一次 Zapier *Schedule* 触发器，针对本月加入服事团队的 B1 人员清单，在 VOMO 中调用 Find Organizer——如果 VOMO 返回"not found"，表示他们尚未启用 VOMO，需要提醒一下。

## 限制与注意事项 {#limits--notes}

- **电子邮件是配对的关键**。VOMO 的数据会提供用户的电子邮件，但没有 B1 人员 ID。在两个系统中使用不同电子邮件的人，会产生重复记录。
- **VOMO 的 Zapier 应用程序目前没有"加入项目"操作**。如果你需要从 B1 将人员加入 VOMO 项目，需要透过 *Webhooks by Zapier* 步骤对 VOMO 的 REST API 发送 POST，这属于自定义整合。
- **VOMO 的免费或较低等级方案可能不包含 Zapier**。在承诺设置日期之前，请先向 VOMO 支持确认。

## 故障排除 {#troubleshooting}

- **触发器从未启动**——VOMO 的即时触发器需要 API 令牌保持有效。请重新测试 Zap；如果令牌已被轮替，请重新连接 VOMO。
- **B1 的 *Add Group Member* 失败**——该操作中的小组已不存在。请从该步骤的 **Group** 下拉菜单中重新选择小组，或在 B1Admin 中打开该小组（**People > Groups**），并从其网址末端复制 ID。
- **同一位 VOMO 志愿者产生了重复的 B1 人员**——他们很可能是以不同于 B1 既有资料的电子邮件报名的。请统一电子邮件格式，或加入一个 Zapier *Path*，在建立前同时依电话号码搜索。

## 另见 {#see-also}

- [Zapier（概览）](../zapier.md)：每个 Zapier 范例的 B1 端设置
- [Clearstream](./clearstream.md)、[Text In Church](./text-in-church.md)：将志愿者报名与短信确认搭配使用
- [Webhook（开发者参考）](/docs/developer/api/webhooks)：VOMO 可触发的事件
