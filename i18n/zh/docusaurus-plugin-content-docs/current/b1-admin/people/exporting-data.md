---
title: "汇出资料"
description: "从 B1 Admin 将人员汇出为 CSV、小组成员名单或完整的 B1 资料库备份，并了解 B1 Export Zip 所包含的内容。"
---

# 汇出资料

<div class="article-intro">

B1 Admin 让你可以汇出教会资料，以便在试算表中使用、与团队分享，或保留备份。无论你需要的是快速的姓名与电子邮件清单，还是完整的资料库汇出，都有相应的选项可供选择。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 你需要一个有效的 B1 Admin 账户，并具有查看所要汇出资料的权限。如果你不确定自己的访问级别，请参阅[角色与权限](roles-permissions.md)。
- 若要进行完整的资料库汇出，你需要有**设置**区域的访问权限。

</div>

## 从人员页面汇出 {#exporting-from-the-people-page}

汇出通讯录最快的方式是直接从 **People** 页面进行：

1. 打开[快速菜单](../introduction.md#getting-around-with-the-jump-menu)（B1 Admin 左上角的搜索栏），展开 **People**，然后点击 **People**。
2. 使用搜索栏或筛选工具缩小你要汇出的结果范围（或保持未筛选，以汇出所有人员）。筛选技巧请参阅[搜索人员](searching-people.md)。
3. 点击人员页面标题中的 **Export** 按钮。
4. 名为 `people.csv` 的 CSV 文件会下载到你的电脑，其中包含当前结果中的人员，以及其姓名、联络信息、地址和其他标准栏位。如果你没有进行搜索，汇出的内容会包括整个通讯录，即使页面只显示其中的一部分。

:::tip
汇出的内容包括你当前结果中的所有人员。若只需汇出特定的人员，请先进行搜索、载入[已保存的名单](./lists.md)，或使用**Advanced**搜索。
:::

## 从设置汇出完整资料 {#full-data-export-from-settings}

若要完整汇出你所有的 B1 资料（不只是人员），请使用设置中的汇出工具：

1. 在快速菜单中，选择 **Settings > Settings**。
2. 点击左侧设置菜单顶端、教会名称下方的 **Import/Export** 链接。
3. 从 **Data Source** 下拉菜单中选择 **B1 Database**。
4. 检视资料预览，然后点击 **Continue to Destination**。
5. 选择 **B1 Export Zip** 作为汇出目的地。
6. 监看汇出进度，直到所有项目都显示绿色勾选标记。
7. 汇出的文件会自动下载。请在你的下载文件夹中寻找 `B1Export` 文件。
8. 解压缩该文件，即可取得个别的 CSV 文件（例如 `people.csv`），并以 Excel、Google Sheets 或 Numbers 打开。

:::info
B1 Export Zip 是你教会资料的完整备份。它包含：

- 人员（含照片）及住户，包括住户的接送联络人
- 校区、礼拜与礼拜时间
- 小组与小组成员
- 基金与奉献，包括分配到多个基金的奉献
- 出席记录
- 表单、题目、提交内容与答案
- 自定义栏位及其值
- 已保存的人员名单

如果在汇出过程中无法下载或读取某位人员的照片，则会略过该照片，并继续进行汇出。

若要还原，请选择 **B1 Import Zip** 作为来源，并选择 **B1 Database** 作为目的地（参见[导入资料](./importing-data.md)）。住户、接送联络人与已保存的名单会与人员一同重建。已保存名单的筛选条件会指向还原后的小组、基金、校区与自定义栏位。
:::

## 汇出小组资料 {#exporting-group-data}

你也可以汇出个别小组的成员名单。在 **Groups** 页面中，打开某个小组，然后点击**下载图标**，即可汇出该小组的成员名单。详情请参阅[小组成员](../groups/group-members.md)。

:::info
汇出的 CSV 文件可在所有主要的试算表应用程序中使用，包括 Microsoft Excel、Google Sheets 与 Apple Numbers。
:::
