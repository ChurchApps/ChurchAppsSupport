---
title: "Mailchimp"
description: "以标签的形式，将 B1 Admin 的人员及小组或已保存名单的成员资格同步到 Mailchimp 受众名单，并附有设置、初始导入与故障排除步骤。"
---

# Mailchimp

<div class="article-intro">

让 Mailchimp 受众名单自动与 B1 保持同步：人员的姓名、电子邮件与电话会一并进入；小组与名单的成员资格会转为 Mailchimp 标签；已删除的人员则会被存档。此同步功能内置于 B1——无需第三方服务，也没有按任务计费，而且变更会近乎实时地送达，而非每晚才同步一次。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 一个 [Mailchimp](https://mailchimp.com) 账户，并拥有你希望由 B1 管理的受众名单
- Mailchimp 的 **API key**（Mailchimp：个人资料图标 → **Account & billing → Extras → API keys**）
- 你的 **Audience ID**（Mailchimp：**Audience → Settings → Audience name and defaults**）
- 一位在 B1Admin 中具有 **Edit Settings** 权限的用户

</div>

## 同步的内容 {#what-syncs}

| B1 中的变更 | Mailchimp 中的效果 |
|---|---|
| 新增或更新人员 | 新增或更新订阅者（名字、姓氏、电话；新订阅者以 `subscribed` 状态加入） |
| 删除人员（或依 GDPR 删除） | 订阅者被存档 |
| 人员加入小组 | 新增以该小组命名的标签 |
| 人员离开小组 | 移除该标签 |
| 人员加入已保存的名单 | 新增以该名单命名的标签 |
| 人员离开已保存的名单 | 移除该标签 |

**通常以已保存的名单作为标签来源会更理想**。B1 的[已保存名单](/docs/b1-admin/people/lists)是基于规则的受众，会自行重新计算成员——例如"北校区的所有人"或"同意接收牧养电子邮件的会员"。将你的 Mailchimp 分段指向名单标签，同步功能便会自动维护它们；小组标签则适用于事工团队的邮件发送。

此同步为**单向**（B1 → Mailchimp），且只会更新 Mailchimp 的标准栏位，因此不会与你在 Mailchimp 中管理的合并栏位或分段产生冲突。

## 设置 {#setup}

1. 在 B1Admin 中前往 **Settings → Developer → Webhooks → New Webhook**。
2. 将 **Connector Type** 设为 **Mailchimp**。
3. 粘贴你的 **Mailchimp API Key** 与 **Audience ID**。该密钥会加密储存，之后不会再次显示。
4. 相关事件已预先勾选；取消勾选你不需要的项目（例如保留人员事件，但略过小组标签）。
5. 保存。B1 会在接受之前先向 Mailchimp 验证密钥与受众名单——若有输入错误，会立即失败并显示原因。

你可以随时重新打开该 webhook，并点击 **Send Test Event** 以重新验证连接（对于 Mailchimp，此操作会检查你的密钥与受众名单，而不会发送示例订阅者）。每次同步尝试都会记录在该 webhook 的传送历史中，并附上 Mailchimp 的实际回应；失败的传送会以递增的间隔自动重试，为期约五天。

## 初始导入 {#initial-import}

连接器只会同步启用之后发生的*变更*，不会回溯补入你现有的通讯录。在设置当天：

1. 在 B1Admin 中前往 **People**，搜索你想要的人员（或执行一个已保存的名单），然后点击 **Export** 下载 CSV 文件。
2. 在 Mailchimp 中使用 **Audience → Import contacts** 导入 CSV 文件，并在导入时套用所需的标签。

通过 Mailchimp 的导入工具进行初始载入，可以让你掌握同意的问题——只导入确实同意接收你电子邮件的人员。将整个通讯录作为已订阅联络人批量导入，可能违反 Mailchimp 的条款以及反垃圾邮件法律（CAN-SPAM／GDPR）。

## 限制与注意事项 {#limits--notes}

- **单向同步**。在 Mailchimp 中的退订、退信与编辑不会回传到 B1。在 Mailchimp 中退订的人，仍可能收到从 B1 直接发出的电子邮件——请以 Mailchimp 作为大量邮件同意状态的依据。
- **没有电子邮件地址的人员会被略过**（会记录在传送历史中）——Mailchimp 的订阅者是以电子邮件作为识别键的。
- **更改电子邮件地址会建立新的订阅者**。Mailchimp 以电子邮件识别人员，因此在 B1 中更改某人的电子邮件，会以新地址将其加入；旧的订阅者会保留，直到你在 Mailchimp 中将其存档。
- **只有标准栏位会同步**——名字、姓氏、电话。在此版本中，会员状态、校区以及 B1 的自定义栏位不会对应到 Mailchimp 的合并栏位；请改用名单标签进行分段。
- **标签名称即为小组／名单名称**。重新命名小组或名单后，新的标签会以新名称开始使用；旧标签会保留在既有订阅者身上，直到你在 Mailchimp 中将其移除。
- **Mailchimp 的联络人上限仍然适用**——如果同步导致免费方案的受众名单超过上限，传送历史中会记录 `Member limit reached` 错误。

## 其他范例（Zapier／Make） {#other-recipes-zapier--make}

除了受众名单同步之外的其他用途——例如在 `donation.created` 时为奉献者加上标签、由 Mailchimp 反向同步到 B1，或同步到完全不同的电子邮件平台（Constant Contact、Brevo 等）——仍可通过 [Zapier](../zapier.md) 或 [Make](../make.md) 实现，它们会由相同的 webhook 事件触发：

- **为奉献者加上标签**：B1 *New Donation* → B1 *Find Person* → Mailchimp *Add Subscriber to Tag*（`Gave-2026`）
- **双向同步**：Mailchimp *New Subscriber* → B1 *Create Person*

如果你之前已透过 Zapier 设置了人员／小组同步，请在启用原生连接器后关闭那些 Zap——同时运行两者会导致每个事件被处理两次，并白白消耗 Zapier 的任务数。

## 故障排除 {#troubleshooting}

- **保存时显示"Mailchimp rejected the API key"**——密钥已被撤销或输入有误。密钥必须以数据中心后缀结尾，例如 `-us21`。
- **保存时显示"audience not found"**——该 Audience ID 在此账户下不存在。请从 **Audience → Settings → Audience name and defaults** 复制（它不是受众名单的名称）。
- **某人从未出现在 Mailchimp 中**——请查看该 webhook 的传送历史。"Skipped: person has no email address"即表示该人员没有电子邮件地址；Mailchimp 回传的 `4xx` 则会在回应内容中显示原因。
- **传送完全停止**——在多次传送失败并耗尽重试后，该 webhook 会自动停用。请修正原因（通常是密钥已被撤销），重新启用，然后使用 **Send Test Event** 确认。

## 另见 {#see-also}

- [Webhook（开发者参考）](/docs/developer/api/webhooks)：底层引擎、事件目录，以及传送／重试的运作方式
- [已保存的名单](/docs/b1-admin/people/lists)：基于规则的受众，与 Mailchimp 标签自然对应
- [Zapier（概览）](../zapier.md)：受众名单同步以外的范例
