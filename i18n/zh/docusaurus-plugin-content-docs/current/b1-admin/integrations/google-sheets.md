---
title: "Google Sheets"
---

# Google Sheets

<div class="article-intro">

**B1 Export** 是 B1.church 的官方 Google Sheets 附加组件。它向任何电子表格添加一个侧边栏，将人员、捐款、小组或出席情况从您的 B1 教会导出到命名的选项卡 — 按需，只需单击一下。该附加组件完全在用户的 Google 账户内运行；除了每个导出所做的只读 API 调用外，关于它的任何内容都不会触及 ChurchApps 的服务器。

</div>

<div class="prereqs">
<h4>开始前</h4>

- 一个拥有您想导出的电子表格编辑访问权限的 Google 账户
- 一个教会管理员（或拥有您想导出的数据读取访问权限的人），能够生成 B1 API 密钥
- 从 Google Workspace Marketplace 安装的 B1 Export 附加组件

</div>

## 它导出什么

| 菜单项 | 工作表选项卡 | 数据 |
|---|---|---|
| 导出人员 | `B1 People` | ID、显示名称、名字、姓氏、电子邮件、成员状态 |
| 导出捐款 | `B1 Donations` | ID、人员 ID、日期、金额、方式、批次 ID |
| 导出小组 | `B1 Groups` | ID、名称、类别、成员数 |
| 导出出席 | `B1 Attendance` | ID、人员 ID、访问日期、服务 ID、小组 ID |

每个导出都 **替换** 其命名选项卡的内容 — 重新运行导出会给您一个新的快照，而不是追加的行。电子表格中的其他选项卡不受影响。

## 设置

### 1. 使用正确的 scopes 创建 B1 API 密钥

1. 在 B1Admin 中转到 **设置 → 开发者 → API 密钥**。
2. 点击 **新建 API 密钥**，将其命名为"Sheets Export"，并授予您计划导出的任何内容的 **读取** scopes：
   - `people:read` 用于人员导出
   - `donations:read` 用于捐款
   - `groups:read` 用于小组
   - `attendance:read` 用于出席
3. 仅执行导出的密钥 **不需要** `settings:write` — 该 scope 仅用于注册 webhooks 的连接器（Zapier/Make）。保持这个密钥狭隘。
4. 保存并复制 `cak_…` 密钥。

### 2. 安装附加组件

1. 打开您想导出的电子表格。
2. **扩展程序 → 附加组件 → 获取附加组件**。
3. 搜索 **B1 Export** 并安装它。Google 会要求您授予对您的工作表和外部 HTTP 的访问权限（以便附加组件可以调用 B1 API）。

安装后，**B1 Export** 条目会出现在您使用此 Google 账户打开的每个电子表格的 **扩展程序** 菜单中。

### 3. 连接密钥

1. **扩展程序 → B1 Export → 连接…**（或在首次打开后从菜单栏的 **B1 Export → 连接…**）。
2. 将 API 密钥粘贴到侧边栏中，将基础 URL 保留为 `https://api.churchapps.org`（除非您正在测试暂存），并点击 **保存**。
3. 点击 **测试连接** — 绿色的"连接正常"确认密钥有效。

密钥存储在 **按用户属性** 中（`PropertiesService.getUserProperties()`） — 它与您的 Google 账户相关联，永远不会写入工作表，对电子表格的其他编辑人员也不可见。

## 运行导出

任一方式：

- **从菜单** — **扩展程序 → B1 Export → 导出人员**（或捐款/小组/出席）
- **从侧边栏** — 打开侧边栏（连接…），然后点击适当的数据集按钮

一个 toast 会在完成时确认 — "_N_ 行（数）已写入 'B1 People'。"

## 在顶部构建报告

导出的选项卡是纯 Google Sheets 数据。构建您自己的分析，参考选项卡：

- 一个 **总结选项卡**，带有 `=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)` 以总计卡片礼物
- 一个 **只有成员的过滤视图**，带有 `=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")`
- 一个 **从 `B1 Attendance` 拉取的出席趋势图表**

重新运行导出刷新底层选项卡；您的公式自动更新。

## 安排重复导出

附加组件默认是按需的。对于每周或每月导出，使用 Apps Script 内置的定时触发器：

1. 在电子表格中 **扩展程序 → Apps Script**（这将打开附加组件的绑定脚本）。
2. 点击左侧边栏中的 **⏰ 触发器** 图标。
3. 为 `exportPeople`（或任何导出函数）**添加触发器** — 选择 *定时驱动*、*周计时器*、例如 *每周一早 6 点*。

导出在后台在您的 Google 账户下运行。如果 API 密钥被轮换或撤销，触发器将在下次失败时给您发邮件。

## 权限和隐私

- 附加组件仅请求 `spreadsheets.currentonly`（它只能触及它打开的电子表格）和 `script.external_request`（所以 `UrlFetchApp` 可以调用 B1 API）。它 **不会** 看到您的 Drive、Gmail 或其他 Google 数据。
- B1 API 密钥存储按用户 — 同一电子表格的其他编辑人员看不到它。
- 所有 B1 API 调用都通过 HTTPS 使用 `Authorization: Bearer cak_…` 进行。

## 故障排查

- **"未设置 API 密钥"** — 打开 **扩展程序 → B1 Export → 连接…** 并粘贴密钥。
- **"B1 拒绝了 API 密钥 (401)"** — 密钥被撤销或错误。重新生成并重新粘贴它。
- **"此 API 密钥缺少 /giving/donations 的权限 (403)"** — 密钥没有 `donations:read`。在 B1Admin 中更新密钥的 scopes。
- **运行后工作表不刷新** — 确保您查看的是 *正确的* 选项卡名称（`B1 People` 等）。导出将创建该选项卡（如果它不存在）。
- **"超过配额"** — Apps Script 对 `UrlFetchApp` 施加按用户日配额（通常每天数千次调用）。一个拥有许多记录的大教会可能需要在多天内拆分导出，或使用 [Make](./make) / 自定义集成进行高容量同步。

## 自定义附加组件

附加组件是开源的 — Apps Script 项目位于 `B1Integrations/GoogleSheetsAddon/` 仓库中。如果您想要我们不导出的列、额外数据集或不同的输出格式，请在那里打开问题或 PR。

## 另请参阅

- [Zapier](./zapier) — 用于实时同步而不是按需导出
- [Make](./make) — 用于具有更复杂变换的同步
- [API 密钥（开发者参考）](/docs/developer/api/api-keys)
