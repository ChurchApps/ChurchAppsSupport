---
title: "Google Sheets"
description: "通过 B1 Export 扩展功能将 B1 Admin 连接到 Google Sheets，按需将人员、奉献、小组和出席数据导入电子表格的各个工作表中。"
---

# Google Sheets

<div class="article-intro">

**B1 Export** 是 B1.church 的官方 Google Sheets 扩展功能。它会在任何电子表格中新增一个侧边栏，可一键将你教会的人员、奉献、小组或出席数据导出到指定的工作表中，并且是按需操作的。该扩展功能完全在用户的 Google 账户内运行；除了每次导出时所进行的只读 API 调用外，它不会与 ChurchApps 的服务器有任何其他交互。

</div>

:::caution 尚未推出
B1 Export 扩展功能尚未发布到 Google Workspace Marketplace，因此你目前无法安装。在此之前，请从 B1Admin 导出人员资料（参见[导出数据](../people/exporting-data.md)），然后将 CSV 文件导入 Google Sheets。以下内容说明的是该扩展功能正式推出后的运作方式。
:::

<div class="prereqs">
<h4>开始之前</h4>

- 一个对你要导出的电子表格具有编辑权限的 Google 账户
- 教会管理员（或对要导出的数据具有读取权限的人员），能够建立 B1 API 密钥
- 已从 Google Workspace Marketplace 安装 B1 Export 扩展功能

</div>

## 导出的内容 {#what-it-exports}

| 菜单项目 | 工作表 | 数据 |
|---|---|---|
| Export People | `B1 People` | ID、Display Name、First、Last、Email、Membership Status |
| Export Donations | `B1 Donations` | ID、Person ID、Date、Amount、Method、Batch ID |
| Export Groups | `B1 Groups` | ID、Name、Category、Member Count |
| Export Attendance | `B1 Attendance` | ID、Person ID、Visit Date、Service ID、Group ID |

每次导出都会**替换**对应工作表中的内容——重新执行导出会得到全新的快照，而不是追加资料列。电子表格中的其他工作表则不受影响。

## 设置 {#setup}

### 1. 建立具有正确权限范围的 B1 API 密钥 {#1-create-a-b1-api-key-with-the-right-scopes}

1. 在 B1Admin 中前往 **Settings → Developer → API Keys**。
2. 点击 **New API Key**，将其命名为"Sheets Export"，并为你打算导出的内容授予 **read** 权限范围：
   - `people:read`：用于人员导出
   - `donations:read`：用于奉献导出
   - `groups:read`：用于小组导出
   - `attendance:read`：用于出席导出
3. 仅用于导出的密钥**不需要** `settings:write`——该权限范围只适用于需要注册 webhook 的连接器（Zapier / Make）。请保持此密钥的权限范围尽量狭窄。
4. 保存并复制 `cak_…` 密钥。

### 2. 安装扩展功能 {#2-install-the-add-on}

1. 打开你要导出数据的电子表格。
2. 依次点击 **Extensions → Add-ons → Get add-ons**。
3. 搜索 **B1 Export** 并安装。Google 会要求你授予访问电子表格的权限，以及对外部 HTTP 的权限（以便扩展功能能够调用 B1 API）。

安装完成后，在你使用此 Google 账户打开的每个电子表格的 **Extensions** 菜单中，都会出现 **B1 Export** 项目。

### 3. 连接密钥 {#3-connect-the-key}

1. 依次点击 **Extensions → B1 Export → Connect…**（首次打开后，也可以从菜单栏的 **B1 Export → Connect…** 进入）。
2. 将 API 密钥粘贴到侧边栏中，Base URL 保留为 `https://api.churchapps.org`（除非你正在测试 staging 环境），然后点击 **Save**。
3. 点击 **Test Connection**——出现绿色的"Connection OK"即表示密钥可以正常使用。

该密钥会存储在**个人属性**（`PropertiesService.getUserProperties()`）中——它与你的 Google 账户绑定，绝不会写入电子表格，电子表格的其他编辑者也无法看到。

## 执行导出 {#running-an-export}

可以选择以下任一方式：

- **从菜单**——依次点击 **Extensions → B1 Export → Export People**（或 Donations / Groups / Attendance）
- **从侧边栏**——打开侧边栏（Connect…），然后点击相应的数据集按钮

完成后会出现提示框，显示"_N_ row(s) written to 'B1 People'."（_N_ 行已写入"B1 People"）。

## 在导出数据之上建立报表 {#building-reports-on-top}

导出的工作表就是一般的 Google Sheets 数据。你可以通过引用这些工作表来建立自己的分析：

- 使用 `=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)` 建立**摘要工作表**，统计刷卡奉献的总额
- 使用 `=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")` 建立仅包含会员的**筛选视图**
- 从 `B1 Attendance` 引用数据，建立出席趋势的**图表**

重新执行导出会更新底层的工作表，你的公式也会自动更新。

## 排定定期导出 {#scheduling-recurring-exports}

该扩展功能默认为按需执行。若要进行每周或每月的导出，请使用 Apps Script 内建的定时触发器：

1. 在电子表格中依次点击 **Extensions → Apps Script**（这会打开扩展功能所绑定的脚本）。
2. 点击左侧边栏中的 **⏰ Triggers** 图标。
3. 为 `exportPeople`（或任何导出函数）点击 **Add Trigger**——选择 *Time-driven*、*Week timer*，例如 *Every Monday 6am*。

导出会在你的 Google 账户下于后台执行。如果 API 密钥被更换或撤销，触发器会在下一次失败时向你发送电子邮件。

## 权限与隐私 {#permissions--privacy}

- 该扩展功能只会要求 `spreadsheets.currentonly`（只能访问其所打开的电子表格）以及 `script.external_request`（使 `UrlFetchApp` 能够调用 B1 API）。它**不会**访问你的 Drive、Gmail 或其他 Google 数据。
- B1 API 密钥是按用户存储的——同一电子表格的其他编辑者无法看到它。
- 所有 B1 API 调用都通过 HTTPS 进行，并使用 `Authorization: Bearer cak_…`。

## 故障排除 {#troubleshooting}

- **"No API key set"**——打开 **Extensions → B1 Export → Connect…**，并粘贴密钥。
- **"B1 rejected the API key (401)"**——密钥已被删除或不正确。请建立新的密钥并重新粘贴。
- **"This API key lacks permission for /giving/donations (403)"**——该密钥没有 `donations:read`。现有密钥无法更改权限范围，因此请在 B1Admin 中建立具有正确权限范围的新密钥。
- **执行后工作表没有更新**——请确认你查看的是*正确*的工作表名称（例如 `B1 People`）。如果工作表不存在，导出会自动建立该工作表。
- **"Quota exceeded"**——Apps Script 对 `UrlFetchApp` 设有每位用户的每日配额（通常为数千次调用）。记录数量庞大的教会可能需要将导出分散到多天进行，或使用 [Make](./make.md) 或自定义整合来进行大量数据同步。

## 缺少某个栏位？ {#missing-a-column}

如果你需要我们目前未导出的栏位、其他数据集，或不同的输出格式，请发送电子邮件至 [support@churchapps.org](mailto:support@churchapps.org)。

## 另见 {#see-also}

- [Zapier](./zapier.md)：用于实时同步，而非按需导出
- [Make](./make.md)：用于更复杂的转换同步
- [API 密钥（开发者参考）](/docs/developer/api/api-keys)
