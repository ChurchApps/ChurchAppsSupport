---
title: "导入数据"
---

# 导入数据

<div class="article-intro">

B1 Transfer 工具可以轻松地将现有数据导入 B1，无论您是从电子表格开始全新使用，还是从其他教会管理平台迁移，或是导入奉献记录。您也可以随时使用它导出或备份数据。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 您需要一个有权访问**设置**的 B1 Admin 账户。
- 开始前，请先从之前的系统中导出数据并准备好。
- 此工具仅适用于初次数据迁移。如果您已经使用 B1 一段时间，再次导入可能会产生重复记录。

</div>

## 访问 Transfer 工具

1. 登录 **B1 Admin**。
2. 打开 [Jump 菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），展开**设置**，然后点击**设置**。
3. 在左侧设置菜单顶部、教会名称下方，点击 **Import/Export** 链接。
4. 这将在新标签页中打开 **B1 Transfer** 工具，网址为 [transfer.b1.church](https://transfer.b1.church)。

Transfer 工具会引导您完成四个步骤：来源、预览、目标和运行。

---

## 第 1 步 - 选择来源

选择您的数据来自何处。共有七个选项：

- **B1 Database** —— 直接从您现有的 B1 教会中提取数据。可用于备份，或将数据转换为其他格式。使用此选项必须已登录。
- **B1 Import Zip** —— B1 自有格式的 zip 文件。主要用于恢复之前的 B1 导出文件。将 B1 Export Zip 加载回 **B1 Database** 会恢复导出文件中包含的全部内容（参见[导出数据](./exporting-data.md#full-data-export-from-settings)）。如果文件无法读取，工具会显示错误，而不是从头开始。
- **Breeze Import Zip** —— 包含从 Breeze ChMS 导出的文件的 zip 文件。
- **Planning Center Zip** —— 从 Planning Center 导出的 zip 或 CSV 文件。
- **Custom CSV / Excel** —— 任何包含人员数据的 CSV 或 Excel 文件。上传后，您需要先将列映射到 B1 字段，导入才会继续。
- **Tithe.ly CSV** —— 来自 Tithe.ly 的人员或奉献导出文件（接受 CSV 或 Excel 格式）。
- **CCB / Pushpay CSV** —— 来自 Church Community Builder 或 Pushpay 的人员或奉献导出 CSV。

您可以将文件拖放到上传区域，也可以点击后浏览选择文件。

---

## 第 1b 步 - 映射字段（仅限 Custom CSV / Excel）

如果您选择了 **Custom CSV / Excel**，上传文件后，工具会先显示字段映射界面，然后才进入预览。

文件中的每一列都会与一个示例值一同列出。对于每一列，请使用下拉菜单选择对应的 B1 字段。工具会自动识别常见的列名，例如“First Name”、“Email”或“Zip Code”，但您仍应检查每一行，并更正工具遗漏的部分。

可用的 B1 字段包括：

- First Name（名）、Last Name（姓）、Middle Name（中间名）、Nickname（昵称）、Display Name（显示名称）、Title/Prefix（称谓/前缀）、Suffix（后缀）
- Email（电子邮件）、Home Phone（家庭电话）、Mobile Phone（手机）、Work Phone（工作电话）
- Address Line 1（地址第 1 行）、Address Line 2（地址第 2 行）、City（城市）、State（州/省）、Zip Code（邮政编码）
- Birth Date（出生日期）、Anniversary（纪念日）、Gender（性别）、Marital Status（婚姻状况）、Membership Status（会籍状态）
- Household/Family Name（家庭名称）
- Group Name（小组名称）—— 按名称将人员分配到小组
- **Custom Field (match by name)**（自定义字段（按名称匹配））—— 将该列保存到教会的某个[自定义人员字段](../settings/custom-fields.md)中。此时会出现一个 **B1 field name**（B1 字段名称）输入框，并自动填入列标题。将其更改为 B1 中该字段的确切名称（大小写不敏感）。
- **Form Answer (custom field)**（表单回答（自定义字段））—— 将该列的值保存为附加在人员记录上的自定义字段。如果使用此选项，系统会要求您为该表单命名。

日期可以使用 `9/17/1994` 等常见格式，并会自动转换。对于自定义字段，是/否字段接受 Yes、No、Y、N、True、False、1 和 0 等值；多选字段接受选项文本或其值。

:::info
在导入之前，请先在 B1 Admin 中创建自定义人员字段。导入完成后，**Custom Fields**（自定义字段）步骤会列出所有与 B1 字段不匹配的列名，并统计不符合字段类型的值的数量。这些值会被跳过，其余数据仍会正常完成导入。
:::

您不需要导入的列可以设置为 **(Skip)**（跳过）。在继续之前，必须至少映射一个姓名字段（First Name 或 Last Name）。

点击 **Confirm Mapping & Import**（确认映射并导入）以进入预览。

---

## 第 2 步 - 预览数据

上传后，工具会显示将要导入的所有内容的预览。使用标签页查看每种数据类型：

- **People**（人员）—— 按家庭分组列出，如有照片则一并显示。
- **Groups**（小组）—— 按校区、服事、时间和类别组织。
- **Attendance**（出勤）—— 聚会日期、小组和到访次数。
- **Donations**（奉献）—— 批次、基金、捐赠者和金额。
- **Forms**（表单）—— 表单名称和内容类型。

请仔细检查后再继续。如果发现有问题，请点击 **Start Over**（重新开始），并修正您的来源文件。

---

## 第 3 步 - 选择目标

选择数据要去往何处：

- **B1 Database** —— 直接导入到您教会的 B1 数据库中。选择此项后，工具会显示将要添加的记录的最终数量。点击 **Start Transfer**（开始传输）以确认。
- **B1 Export Zip** —— 将数据下载为 B1 格式的 zip 文件，之后可通过 **B1 Import Zip** 恢复。适合用于备份。
- **Breeze Export Zip** —— 将数据转换为 Breeze 格式。
- **Planning Center Zip** —— 将数据转换为 Planning Center 格式。

:::warning
来源和目标不能是相同的格式。如果两者相同，工具会发出警告，以防止意外重复。
:::

---

## 第 4 步 - 运行

工具会处理传输，并显示每个步骤的进度：

- 校区、服事和时间
- 人员
- 照片
- 小组及小组成员
- 奉献
- 出勤
- 表单、问题、回答和表单提交
- 自定义字段（当您映射了任何 Custom Field 列时）
- 压缩（仅适用于 zip 文件目标）

当目标为 **B1 Database** 时，进度卡片标题为 **Import Progress**（导入进度），完成时显示 **Import Complete!**（导入完成！）或 **Import Completed with Errors**（导入已完成但有错误）。对于 zip 文件目标，相同的提示会将 “Import” 改为 “Export”。

:::info
恢复 **B1 Import Zip** 时，指向文件中已不存在内容的记录会被跳过，而不会中止导入：例如，对于文件中不存在的人员或小组的小组成员关系、已删除小组或人员的出勤记录，以及小组与已删除服事时间之间的关联。从未与服事时间关联的出勤聚会仍会被恢复。同样，在导出时，无法下载或读取的照片会被排除在外，以便**照片**步骤能够继续进行。
:::

:::warning
传输过程中请不要关闭浏览器。请等待所有步骤都显示为已完成。
:::

---

## 准备 Breeze 导入 Zip 文件

1. 在 Breeze 中，前往**设置**，然后点击左侧边栏中的**导出**。
2. 分别导出三个文件：**People**、**Tags** 和 **Contributions**。
3. 选中这三个文件，右键单击，并将其压缩为一个 zip 文件。
   - 在 Mac 上：选中文件，右键单击，然后选择**压缩**。
   - 在 PC 上：选中文件，右键单击，选择**发送到**，然后选择**压缩(zipped)文件夹**。
4. 在第 1 步中选择 **Breeze Import Zip** 选项，上传该 zip 文件。

Breeze 导入会自动传输人员、小组（标签）和奉献记录。

---

## 准备 Planning Center 导出文件

1. 登录 Planning Center，打开 **People** 产品。
2. 在左侧边栏中，点击 **Lists**（列表），并创建一个包含您想要迁移的所有人员的列表。（如果您已有包含全体会众的列表，请直接使用该列表。）
3. 打开该列表，使用其 **export**（导出）选项，将人员下载为 **CSV** 文件。请包含您想保留的字段——姓名、电子邮件、电话、地址、出生日期、性别和会籍状态都会映射到 B1。
4. 如果 Planning Center 提供了多个文件，请全部选中，右键单击，并压缩为一个 zip 文件。
   - 在 Mac 上：选中文件，右键单击，然后选择**压缩**。
   - 在 PC 上：选中文件，右键单击，选择**发送到**，然后选择**压缩(zipped)文件夹**。
5. 在第 1 步中选择 **Planning Center Zip** 选项，上传 CSV 或 zip 文件。

上传后，继续进入预览，并在运行导入之前确认人员和家庭信息是否正确。

---

## 准备 Tithe.ly 导出文件

1. 在 Tithe.ly 中，将您的 **People** 数据导出为 CSV 或 Excel 文件。如果您想导入奉献记录，还可以导出单独的 **Giving** 文件。
2. 工具会根据列名自动检测文件包含的是人员数据还是奉献数据。
3. 在第 1 步中选择 **Tithe.ly CSV** 选项，上传该文件。

:::info
Tithe.ly 导出的文件需要逐个导入。如果您需要分别导入人员和奉献记录，请运行两次该流程。
:::

---

## 准备 CCB 或 Pushpay 导出文件

1. 在 Church Community Builder 或 Pushpay 中，将您的 **People** 数据导出为 CSV 文件。您也可以导出单独的奉献/捐款文件。
2. 工具会根据列名自动检测文件包含的是人员数据还是奉献数据。
3. 在第 1 步中选择 **CCB / Pushpay CSV** 选项，上传该文件。

---

## 导入之后

传输完成后，请花几分钟时间核对数据：

1. 浏览 [People](../people/adding-people.md) 页面，抽查几份个人资料。
2. 确认姓名、电子邮件、电话号码和地址都已正确导入。
3. 检查家庭关联是否完整。当来源数据中包含家庭角色时，每位人员的家庭角色（Head、Spouse、Child 或 Other）会一并保留：B1 Import Zip 中的 **householdRole** 列、Breeze 或 Tithe.ly 中的 **Family Role**，以及 CCB / Pushpay 中的 **Family Position**。诸如 “Head of Household”、“Primary”、“Wife” 或 “Son” 等角色会被转换为对应的 B1 角色。Planning Center 和 Custom CSV / Excel 导入没有角色列，因此这些人员会被设置为 **Other**；您可以在 [People](../people/adding-people.md#managing-households) 页面中的人员家庭信息里更改角色。
4. 检查导入的小组和奉献记录。

如果您发现问题，可以在 People 页面中编辑个人资料。您也可以再次运行 Transfer 工具，[导出您的数据](exporting-data.md)作为备份。
