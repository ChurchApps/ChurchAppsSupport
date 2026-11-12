---
title: "Donorbox"
description: "通过 Zapier 将 Donorbox 连接到 B1 Admin，使线上奉献自动建立奉献记录与捐献者人员资料，无需手动汇出数据。"
---

# Donorbox

<div class="article-intro">

如果你的教会透过 Donorbox 接受奉献，但在 B1 中管理人员资料与奉献报表，你可以让 Donorbox 的即时 Zapier 触发器在 B1 中建立对应的奉献记录；如果捐献者尚未存在于 B1 中，也会自动将其建立为人员。无需手动对账，也无需每月汇出数据。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 一个至少有一个募款活动的 [Donorbox](https://donorbox.org) 账户
- 一个 [Zapier](https://zapier.com) 账户
- 一位在 B1Admin 中具有 **Edit Settings** 权限的用户

</div>

## 你可以设置的内容 {#what-you-can-wire-up}

| 方向 | Donorbox 触发器 | B1 操作 |
|---|---|---|
| Donorbox → B1 | New or Updated Donation（即时） | Find Person → Add Donation |
| Donorbox → B1 | New or Updated Donor | Create Person |
| Donorbox → B1 | New or Updated Plan（定期） | Find Person → Add Donation（以 Plan ID 作为备注） |

Donorbox 的触发器为**即时**触发——真实奉献发生后数秒内即会触发，没有轮询延迟。

## 设置 {#setup}

### 1. 建立 B1 API 密钥 {#1-mint-a-b1-api-key}

在 B1Admin 中：**Settings → Developer → API Keys → New API Key**。权限范围：

- `people:read`——依电子邮件查找捐献者
- `people:write`——若捐献者是新的，则建立其记录
- `donations:write`——记录该笔奉献

- `settings:write`——Zapier 在连接时会将每个 B1 密钥与 B1 的 webhook 清单进行核对，因此没有此权限连接会失败（即使在这里拥有触发器的是 Donorbox，而不是 B1）

### 2. 建立"记录奉献"的 Zap {#2-build-the-record-a-donation-zap}

1. **触发器**——Donorbox：New Donation。使用 Donorbox 的 API 密钥连接（在 Donorbox 中：*Account → Profile → API Settings*）。
2. **操作**——B1.church：Find Person。将触发器中的捐献者电子邮件映射到 *Email* 字段。
3. **操作**——B1.church：Add Donation。映射：
   - Person → 第 2 步的 ID
   - Amount → 触发器中的奉献金额
   - Donation Date → 触发器中的奉献日期
   - Fund → 选择与 Donorbox 募款活动对应的 B1 基金（Zapier 可依筛选或格式化步骤切换基金）
   - Method → "Online"
   - Notes → Donorbox 交易 ID（对账时很有用）

开启 Zap。之后每一笔通过 Donorbox 完成的真实奉献都会自动出现在 **B1Admin → Donations** 中。

当没有人使用该电子邮件时，B1 的 *Find Person* 会以"No person found"错误停止 Zap，因此筛选步骤无法据此分支。若要处理首次奉献的捐献者，请为 Find Person 步骤开启 Zapier 的错误处理，并在其错误路径中执行 B1.church：Create Person（映射名字、姓氏与电子邮件），然后以新人员的 ID 执行 Add Donation。或者，你也可以执行上方表格中的 *New Donor* → *Create Person* Zap，使捐献者在奉献送达前就已存在于 B1 中。

## 常见范例 {#common-recipes}

### 每个基金一个 Zap {#one-zap-per-fund}

如果你的 Donorbox 募款活动分别对应不同的 B1 基金，最简洁的做法是为每个募款活动建立一个 Zap，并在最前面加入 Donorbox *campaign* 筛选——这样基金对应关系便已固定，无需额外的查找步骤。

### 将更新的奉献视为更正 {#treat-updated-donations-as-corrections}

Donorbox 的 *New or Updated Donation* 在编辑时也会触发。使用 Zapier 的 *Path* 步骤依据 `event_type` 分支："new" → Add Donation，"updated" → Find Donation + Update（注意：B1 的 Zapier 应用程序目前没有 Update Donation 操作——暂时请将 "updated" 事件记录到 Slack 频道，供人工审阅）。

### 将定期计划的变更同步到 Slack 频道 {#sync-recurring-plan-changes-to-a-slack-channel}

- **触发器**——Donorbox：New or Updated Plan
- **操作**——Slack：Send Message 到 `#donations`（例如"Plan changed — Sarah's monthly gift is now $200"）

## 限制与注意事项 {#limits--notes}

- **依电子邮件配对捐献者**。Donorbox 不会共享 B1 的人员 ID；唯一可持久使用的配对键是电子邮件。使用不同电子邮件奉献的捐献者会被建立为新的 B1 人员——你的每月对账应留意这些情况。
- **退款不会单独显示**——Donorbox 会在同一笔奉献上发出状态更新。B1 的 Zapier 应用程序目前没有 *Update Donation* 操作；目前较安全的做法是将退款事件记录在外部，并手动调整奉献记录。
- **请先在 Donorbox 的沙盒中测试**，以免在正式的 B1 中建立假的奉献记录。Donorbox 提供与正式环境分开的测试模式凭证。

## 故障排除 {#troubleshooting}

- **"No person found" 错误**——该捐献者尚未存在于 B1 中（或是使用了不同的电子邮件奉献）。请加入上述的错误路径，并确认 API 密钥具有 `people:write`，以便 *Create Person* 能够执行。
- **奉献金额看起来大了 100 倍或小了 100 倍**——Donorbox 在某些资料格式中以分为单位、在另一些格式中以元为单位。如有需要，请使用 *Formatter by Zapier — Numbers* 步骤除以 100。
- **单笔奉献产生重复记录**——Donorbox 会同时触发 *New Donation* 和 *Updated Donation*。请筛选 `event_type = "donation.succeeded"`，或建立两个筛选条件互不重叠的 Zap。

## 另见 {#see-also}

- [Zapier（概览）](../zapier.md)：每个 Zapier 范例的 B1 端设置
- [Subsplash](./subsplash.md)：另一个提供 Zapier 应用程序的奉献平台
- [Mailchimp](./mailchimp.md)：将"新奉献"串接到电子邮件标签
