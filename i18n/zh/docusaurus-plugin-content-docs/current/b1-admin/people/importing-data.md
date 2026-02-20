---
title: "导入数据"
---

# 导入数据

<div class="article-intro">

B1 Admin 使导入现有成员数据变得轻松。无论您是从其他教会管理平台迁移还是从电子表格加载记录，导入工具可以帮助您避免手动输入每个人员。您可以从 CSV 文件导入或直接从 Breeze ChMS 迁移。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 您需要一个具有 **Settings** 访问权限的活跃 B1 Admin 账户。如果不确定您的访问级别，请参阅[角色与权限](roles-permissions.md)。
- 准备好您的成员数据，可以在电子表格中或从之前的系统导出。
- 如果您从 Breeze 迁移，请确保您已经从 Breeze 导出了 People、Tags 和 Contributions 文件。

</div>

## 从 CSV 导入

如果您在电子表格或其他系统中有成员数据，可以使用 CSV（逗号分隔值）文件导入。

1. 转到左侧边栏中的 **Settings**。
2. 点击顶部导航中的 **Import/Export**。
3. 从 **Data Source** 下拉菜单中选择 **B1 Import Zip**。
4. 点击链接**下载示例文件**以查看预期格式。
5. 打开示例 `people.csv` 文件，将示例数据替换为您自己的数据。保留标题行不变。
6. 如果您有成员照片，请使用 400x300 像素的图片添加到文件夹中，文件名与 CSV 中的 `importKey` 编号匹配。
7. 将编辑后的文件压缩为 zip 文件。
8. 返回 B1 Admin，点击 **Upload** 并选择您的 zip 文件。
9. 查看数据预览并点击 **Continue to Destination**。
10. 确认已选择 **B1 Database**，查看导入摘要，然后点击 **Start Transfer**。
11. 等待导入完成，然后点击 **Go to B1** 返回仪表板。

:::tip
务必先下载并查看示例文件。匹配预期的列格式将防止导入错误。
:::

:::warning
导入数据会向您的数据库添加新记录。如果您两次导入同一文件，可能会产生重复条目。在开始传输前仔细检查您的文件。
:::

## 从 Breeze ChMS 导入

如果您从 Breeze 迁移，B1 有一个专门的导入选项可以自动处理转换。

1. 在 Breeze 中，转到 **Settings** 并点击左侧边栏中的 **Export**。
2. 导出三个文件：**People**、**Tags** 和 **Contributions**。
3. 选择所有三个导出的文件，右键点击，将它们压缩为一个 zip 文件。
4. 在 B1 Admin 中，转到 **Settings**，然后 **Import/Export**。
5. 从 **Data Source** 下拉菜单中选择 **Breeze Import Zip**。
6. 上传您的 zip 文件并按照屏幕上的步骤查看和完成导入。

:::info
Breeze 导入可以迁移人员、照片、小组、奉献、考勤、表单等——一步完成完整迁移。
:::

## 导入后

导入完成后，花几分钟验证您的数据：

1. 浏览[人员](../people/adding-people.md)页面，抽查几个个人资料。
2. 确认姓名、电子邮件、电话号码和地址已正确导入。
3. 检查家庭关联是否完整。
4. 查看已导入的任何[小组](../groups/creating-groups.md)或标签。

如果您发现任何问题，可以直接从人员页面编辑各个个人资料。您也可以随时[导出数据](exporting-data.md)以创建备份。
