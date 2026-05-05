---
title: "导入数据"
---

# 导入数据

<div class="article-intro">

B1 Transfer 工具使您可以轻松将现有数据导入 B1,无论您是从电子表格全新开始、从另一个教会管理平台迁移,还是导入奉献记录。它还可以随时用于导出或备份您的数据。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 您需要一个有效的 B1 Admin 帐户,并有权访问 **Settings**。
- 在开始之前,从您以前的系统导出并准备好数据。
- 此工具适用于初始数据迁移。如果您已经使用 B1 一段时间,再次导入可能会创建重复记录。

</div>

## 访问传输工具

1. 登录 **B1 Admin**。
2. 在左侧边栏转到 **Settings**。
3. 点击页面标题右上角的 **Import/Export** 按钮。
4. 这将在新标签页中打开 **B1 Transfer** 工具,网址为 [transfer.b1.church](https://transfer.b1.church)。

传输工具将引导您完成四个步骤:源、预览、目标和运行。

---

## 步骤 1 - 选择您的源

选择您的数据来源。有七个选项:

- **B1 Database** — 直接从您现有的 B1 教会提取数据。用于备份或将数据转换为另一种格式。您必须登录才能使用此选项。
- **B1 Import Zip** — B1 自己格式的 zip 文件。这主要用于恢复以前的 B1 导出。
- **Breeze Import Zip** — 包含从 Breeze ChMS 导出的文件的 zip 文件。
- **Planning Center Zip** — 从 Planning Center 导出的 zip 或 CSV 文件。
- **Custom CSV / Excel** — 包含人员数据的任何 CSV 或 Excel 文件。上传后,您将在导入继续之前将列映射到 B1 字段。
- **Tithe.ly CSV** — 来自 Tithe.ly 的人员或奉献导出文件(接受 CSV 或 Excel 格式)。
- **CCB / Pushpay CSV** — 来自 Church Community Builder 或 Pushpay 的人员或奉献导出 CSV。

您可以将文件拖放到上传区域,或点击浏览文件。

---

## 步骤 1b - 映射您的字段(仅限 Custom CSV / Excel)

如果您选择了 **Custom CSV / Excel**,在上传文件后,工具将在转到预览之前显示字段映射屏幕。

列出您文件中的每一列以及示例值。对于每一列,使用下拉列表选择匹配的 B1 字段。该工具将自动检测常见的列名,如"First Name"、"Email"或"Zip Code",但您应该检查每一行并更正它遗漏的任何内容。

可用的 B1 字段包括:

- First Name、Last Name、Middle Name、Nickname、Display Name、Title/Prefix、Suffix
- Email、Home Phone、Mobile Phone、Work Phone
- Address Line 1、Address Line 2、City、State、Zip Code
- Birth Date、Gender、Marital Status、Membership Status
- Household/Family Name
- Group Name — 按名称将人员分配到小组
- **Form Answer (custom field)** — 将该列的值保存为附加到人员记录的自定义字段。如果使用此选项,系统会要求您为表单命名。

不想导入的列可以设置为 **(Skip)**。在继续之前,必须映射至少一个名称字段(First Name 或 Last Name)。

点击 **Confirm Mapping & Import** 继续预览。

---

## 步骤 2 - 预览您的数据

上传后,该工具会显示将要导入的所有内容的预览。使用选项卡查看每种数据类型:

- **People** — 按家庭列出,如果包含照片则显示照片。
- **Groups** — 按校区、服务、时间和类别组织。
- **Attendance** — 会议日期、小组和访问次数。
- **Donations** — 批次、基金、捐赠者和金额。
- **Forms** — 表单名称和内容类型。

继续之前请仔细检查。如果有任何问题,请点击 **Start Over** 并更正源文件。

---

## 步骤 3 - 选择您的目标

选择您希望数据去往的位置:

- **B1 Database** — 直接导入到您教会的 B1 数据库。选择此项后,工具将显示要添加的记录的最终计数。点击 **Start Transfer** 确认。
- **B1 Export Zip** — 将您的数据下载为 B1 格式的 zip 文件。适合备份。
- **Breeze Export Zip** — 将您的数据转换为 Breeze 格式。
- **Planning Center Zip** — 将您的数据转换为 Planning Center 格式。

:::warning
源和目标不能是相同的格式。如果匹配,工具会警告您以防止意外重复。
:::

---

## 步骤 4 - 运行

该工具处理传输并显示每个步骤的进度:

- 校区、服务和时间
- 人员
- 照片
- 小组和小组成员
- 捐赠
- 考勤
- 表单、问题、答案和表单提交
- 压缩(仅限 zip 文件目标)

:::warning
在传输运行时不要关闭浏览器。等待所有步骤显示为完成。
:::

---

## 准备 Breeze 导入 Zip

1. 在 Breeze 中,转到 **Settings** 并点击左侧边栏中的 **Export**。
2. 导出三个单独的文件:**People**、**Tags** 和 **Contributions**。
3. 选择所有三个文件,右键点击,然后将它们压缩成单个 zip 文件。
   - 在 Mac 上:选择文件,右键点击,然后选择 **Compress**。
   - 在 PC 上:选择文件,右键点击,选择 **Send to**,然后选择 **Compressed (zipped) folder**。
4. 在步骤 1 中使用 **Breeze Import Zip** 选项上传 zip 文件。

Breeze 导入会自动传输人员、小组(标签)和捐赠记录。

---

## 准备 Planning Center 导出

1. 在 Planning Center 中,将您的人员数据导出为 CSV 或 zip 文件。
2. 在步骤 1 中使用 **Planning Center Zip** 选项上传。

---

## 准备 Tithe.ly 导出

1. 在 Tithe.ly 中,将您的 **People** 数据导出为 CSV 或 Excel 文件。如果您想导入捐赠记录,还可以导出单独的 **Giving** 文件。
2. 该工具将根据列名自动检测文件是包含人员数据还是奉献数据。
3. 在步骤 1 中使用 **Tithe.ly CSV** 选项上传文件。

:::info
Tithe.ly 导出可以一次导入一个文件。如果您需要分别导入人员和奉献记录,请运行该过程两次。
:::

---

## 准备 CCB 或 Pushpay 导出

1. 在 Church Community Builder 或 Pushpay 中,将您的 **People** 数据导出为 CSV 文件。您还可以导出单独的奉献/捐款文件。
2. 该工具将根据列名自动检测文件是包含人员数据还是奉献数据。
3. 在步骤 1 中使用 **CCB / Pushpay CSV** 选项上传文件。

---

## 导入后

传输完成后,花几分钟时间验证您的数据:

1. 浏览[人员](../people/adding-people.md)页面并抽查一些个人资料。
2. 确认姓名、电子邮件、电话号码和地址已正确传输。
3. 检查家庭连接是否完整。
4. 查看任何导入的小组和奉献记录。

如果您发现问题,可以从人员页面编辑单个个人资料。您还可以再次运行传输工具以[导出数据](exporting-data.md)作为备份。
