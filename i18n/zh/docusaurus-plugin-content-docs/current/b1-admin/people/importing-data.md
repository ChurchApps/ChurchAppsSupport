---
title: "导入数据"
---

# 导入数据

<div class="article-intro">

B1 Transfer 工具可以让您轻松地将现有数据导入 B1，无论您是从电子表格开始全新搭建，还是从其他教会管理平台迁移，或是导入奉献记录。该工具也可随时用于导出或备份您的数据。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 您需要一个拥有**设置**访问权限的 B1 Admin 账户。
- 开始之前，请先从原有系统中导出数据并准备好。
- 此工具适用于初次数据迁移。如果您已经使用 B1 一段时间，再次导入可能会产生重复记录。

</div>

## 访问 Transfer 工具

1. 登录 **B1 Admin**。
2. 打开[快速跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），展开 **Settings**，然后点击 **Settings**。
3. 点击左侧设置菜单顶部教会名称下方的 **Import/Export** 链接。
4. 这会在新标签页中打开 **B1 Transfer** 工具，网址为 [transfer.b1.church](https://transfer.b1.church)。

Transfer 工具会引导您完成四个步骤：Source（来源）、Preview（预览）、Destination（目标）和 Run（执行）。

---

## 第 1 步 - 选择来源

选择您的数据来自何处。共有七个选项：

- **B1 Database** —— 直接从您现有的 B1 教会数据中提取数据。适用于备份或将数据转换为其他格式。使用此选项必须先登录。
- **B1 Import Zip** —— B1 自有格式的 zip 文件。主要用于恢复之前的 B1 导出文件。将 B1 导出 Zip 重新加载到 **B1 Database** 中，会恢复导出文件包含的所有内容（请参阅[导出数据](./exporting-data.md#full-data-export-from-settings)）。如果文件无法读取，工具会显示错误信息，而不会重新开始。
- **Breeze Import Zip** —— 包含从 Breeze ChMS 导出文件的 zip 文件。
- **Planning Center Zip** —— 从 Planning Center 导出的 zip 或 CSV 文件。
- **Custom CSV / Excel** —— 任何包含人员数据的 CSV 或 Excel 文件。上传后，在导入继续之前，您需要将列与 B1 字段进行对应。
- **Tithe.ly CSV** —— 来自 Tithe.ly 的人员或奉献导出文件（可接受 CSV 或 Excel 格式）。
- **CCB / Pushpay CSV** —— 来自 Church Community Builder 或 Pushpay 的人员或奉献导出 CSV 文件。

您可以将文件拖放到上传区域，或点击后浏览选择文件。

---

## 第 1b 步 - 字段映射（仅适用于 Custom CSV / Excel）

如果您选择了 **Custom CSV / Excel**，上传文件后，工具会在进入预览之前显示字段映射界面。

文件中的每一列都会与一个示例值一同列出。对于每一列，请使用下拉菜单选择与之匹配的 B1 字段。工具会自动识别常见的列名，例如“First Name”“Email”或“Zip Code”，但您应该逐行检查，并更正其遗漏的任何内容。

可用的 B1 字段包括：

- First Name、Last Name、Middle Name、Nickname、Display Name、Title/Prefix、Suffix（名、姓、中间名、昵称、显示名称、称谓/前缀、后缀）
- Email、Home Phone、Mobile Phone、Work Phone（电子邮件、住宅电话、手机、工作电话）
- Address Line 1、Address Line 2、City、State、Zip Code（地址第一行、地址第二行、城市、州/省、邮政编码）
- Birth Date、Anniversary、Gender、Marital Status、Membership Status（出生日期、结婚纪念日、性别、婚姻状况、会籍状态）
- Household/Family Name（家庭名称）
- Group Name —— 按名称将人员分配到小组
- **Custom Field (match by name)** —— 将该列保存到您教会的某个[自定义人员字段](../settings/custom-fields.md)中。会出现一个 **B1 field name** 输入框，并已填入该列的标题。请将其更改为 B1 中该字段的确切名称（大小写不敏感）。
- **Form Answer (custom field)** —— 将该列的值保存为附加在人员档案上的自定义字段。如果使用此选项，系统会要求您为表单命名。

日期可以使用 `9/17/1994` 等常见格式，系统会自动转换。对于自定义字段，是/否字段接受 Yes、No、Y、N、True、False、1 和 0 等值；多选字段则接受选项文字或其值。

:::info
请在导入之前，先在 B1 Admin 中创建好自定义人员字段。导入完成后，**Custom Fields** 步骤会列出所有与 B1 字段不匹配的列名，并统计与字段类型不符的值数量。这些值会被跳过，其余数据仍会正常完成导入。
:::

不需要导入的列可以设置为 **(Skip)**。在继续之前，至少需要映射一个姓名字段（First Name 或 Last Name）。

点击 **Confirm Mapping & Import** 进入预览。

---

## 第 2 步 - 预览数据

上传后，工具会显示即将导入的所有数据的预览。使用标签页查看每种数据类型：

- **People** —— 按家庭列出，如包含照片则一并显示。
- **Groups** —— 按校区、礼拜、时间和类别组织。
- **Attendance** —— 课次日期、小组和到访人次。
- **Donations** —— 批次、基金、捐献人和金额。
- **Forms** —— 表单名称和内容类型。

请在继续之前仔细检查。如果发现有误，请点击 **Start Over**，并更正您的来源文件。

---

## 第 3 步 - 选择目标

选择您希望数据存放的位置：

- **B1 Database** —— 直接导入您教会的 B1 数据库。选择此项后，工具会显示即将添加的记录的最终数量。点击 **Start Transfer** 进行确认。
- **B1 Export Zip** —— 将您的数据下载为 B1 格式的 zip 文件，之后可通过 **B1 Import Zip** 恢复。适合用于备份。
- **Breeze Export Zip** —— 将您的数据转换为 Breeze 格式。
- **Planning Center Zip** —— 将您的数据转换为 Planning Center 格式。

:::warning
来源和目标不能是相同的格式。如果二者相同，工具会发出警告，以防止误操作导致数据重复。
:::

---

## 第 4 步 - 执行

工具会处理迁移，并显示每个步骤的进度：

- 校区、礼拜和时间
- 人员
- 照片
- 小组和小组成员
- 奉献
- 考勤
- 表单、问题、答案和表单提交记录
- 自定义字段（如果您映射了任何自定义字段列）
- 压缩（仅适用于 zip 文件目标）

当目标为 **B1 Database** 时，进度卡片标题为 **Import Progress**，完成时会显示 **Import Complete!**（或 **Import Completed with Errors**）。如果目标是 zip 文件，相同的提示会显示为 **Export**。

:::warning
在迁移进行期间，请勿关闭浏览器。请等待所有步骤都显示为完成。
:::

---

## 准备 Breeze 导入 Zip

1. 在 Breeze 中，进入 **Settings**，然后点击左侧边栏中的 **Export**。
2. 分别导出三个文件：**People**、**Tags** 和 **Contributions**。
3. 选中这三个文件，右键单击，并将其压缩为一个 zip 文件。
   - 在 Mac 上：选中文件，右键单击，然后选择 **Compress**。
   - 在 PC 上：选中文件，右键单击，选择 **Send to**，然后选择 **Compressed (zipped) folder**。
4. 在第 1 步中使用 **Breeze Import Zip** 选项上传 zip 文件。

Breeze 导入会自动迁移人员、小组（标签）和奉献记录。

---

## 准备 Planning Center 导出文件

1. 登录 Planning Center，打开 **People** 产品。
2. 在左侧边栏中点击 **Lists**，并创建一个包含您想迁移的所有人员的列表。（如果您已经有包含全体会众的列表，请直接使用该列表。）
3. 打开该列表，使用其 **export** 选项将人员下载为 **CSV** 文件。请包含您希望保留的字段——姓名、电子邮件、电话、地址、出生日期、性别和会籍状态都会映射到 B1。
4. 如果 Planning Center 生成了多个文件，请全部选中，右键单击，并将其压缩为一个 zip 文件。
   - 在 Mac 上：选中文件，右键单击，然后选择 **Compress**。
   - 在 PC 上：选中文件，右键单击，选择 **Send to**，然后选择 **Compressed (zipped) folder**。
5. 在第 1 步中使用 **Planning Center Zip** 选项上传 CSV 或 zip 文件。

上传后，继续进入预览，并在执行导入前确认人员和家庭信息显示正确。

---

## 准备 Tithe.ly 导出文件

1. 在 Tithe.ly 中，将您的 **People** 数据导出为 CSV 或 Excel 文件。如果您想导入奉献记录，也可以另外导出一个 **Giving** 文件。
2. 工具会根据列名自动判断文件包含的是人员数据还是奉献数据。
3. 在第 1 步中使用 **Tithe.ly CSV** 选项上传文件。

:::info
Tithe.ly 的导出文件需要逐个文件导入。如果您需要分别导入人员和奉献记录，请执行两次该流程。
:::

---

## 准备 CCB 或 Pushpay 导出文件

1. 在 Church Community Builder 或 Pushpay 中，将您的 **People** 数据导出为 CSV 文件。您也可以另外导出一个奉献/捐款文件。
2. 工具会根据列名自动判断文件包含的是人员数据还是奉献数据。
3. 在第 1 步中使用 **CCB / Pushpay CSV** 选项上传文件。

---

## 导入之后

迁移完成后，请花几分钟时间核实您的数据：

1. 浏览[人员](../people/adding-people.md)页面，抽查几个档案。
2. 确认姓名、电子邮件、电话号码和地址都已正确导入。
3. 检查家庭关联是否完整。如果源数据中包含家庭角色，则每位人员的家庭角色（Head、Spouse、Child 或 Other）会被保留：在 B1 Import Zip 中为 **householdRole** 列，在 Breeze 或 Tithe.ly 中为 **Family Role**，在 CCB / Pushpay 中为 **Family Position**。“Head of Household”“Primary”“Wife”或“Son”等角色会被转换为对应的 B1 角色。Planning Center 和 Custom CSV / Excel 导入没有角色列，因此这些人员会被设置为 **Other**；您可以在[人员](../people/adding-people.md#managing-households)页面中，通过人员的家庭信息更改其角色。
4. 检查已导入的小组和奉献记录。

如果您发现问题，可以在人员页面中编辑单个档案。您也可以再次运行 Transfer 工具，[导出您的数据](exporting-data.md)作为备份。
