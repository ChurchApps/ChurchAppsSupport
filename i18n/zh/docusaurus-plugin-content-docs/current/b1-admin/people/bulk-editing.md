---
title: "批量编辑人员"
description: "在 B1 Admin 中一次更新多位人员的会员状态、婚姻状况、性别、通讯录退出设置、校区、是／否自定义栏位或小组。"
---

# 批量编辑人员

<div class="article-intro">
批量编辑让你一次更新多位人员，在对许多人做相同更改时可节省大量时间。你可以在单一操作中更新会员状态、婚姻状况、性别、通讯录退出设置、校区、是／否自定义栏位、小组成员资格与工作流程，或删除人员。
</div>

<div class="prereqs">
<h4>开始之前</h4>

- 你需要具有管理人员资料的权限。详情请参阅[角色与权限](./roles-permissions.md)。
- 你应该已经新增或导入了要编辑的人员。如有需要，请参阅[新增人员](./adding-people.md)。
</div>

## 选取要批量编辑的人员 {#selecting-people-for-bulk-editing}

1. 在 B1 Admin 中前往 **People**
2. 使用搜索或筛选工具，找出你想要更新的人员
3. 勾选方框以选取人员
   - 在 **Households** 检视中，勾选某个住户会选取其中的所有人员
   - 在 **Table** 检视中（使用 **View as** 切换），你可以逐一选取人员
   - 或使用清单上方的方框，选取所有可见的人员
4. 选取至少一位人员后，清单上方的列会显示已选取的人数，并提供 **Clear Selection** 与 **Actions** 按钮

:::tip
如果你需要依特定条件更新大量人员，请使用[AI 搜索](./ai-search.md)功能或筛选工具先缩小清单范围，然后再选取所有符合条件的人员。
:::

## 可用的批量操作 {#available-bulk-actions}

**Actions** 菜单提供以下选项。每个选项都会打开一个小型对话框，告诉你它将更改多少位人员；选择一个值，然后点击 **Apply**。新的值会取代每位被选取人员原有的值。完成后，页面底部会出现讯息，确认已更新的人数。

### 设置会员状态 {#set-membership-status}

1. 点击 **Actions** → **Set Membership Status**
2. 选择新的 **Membership Status**：
   - **Visitor** -- 初次到访或偶尔出席的人
   - **Guest** -- 访客，例如在报到机上登记的家庭
   - **Regular Attendee** -- 经常出席但并非会员的人
   - **Member** -- 正式教会会员
   - **Staff** -- 教会员工
   - **Inactive** -- 已不再出席的人
   - **Deceased** -- 已去世的人
3. 点击 **Apply**

### 设置婚姻状况 {#set-marital-status}

1. 点击 **Actions** → **Set Marital Status**
2. 选择 **Unknown**、**Single**、**Married**、**Divorced** 或 **Widowed**
3. 点击 **Apply**

### 设置性别 {#set-gender}

1. 点击 **Actions** → **Set Gender**
2. 选择 **Unspecified**、**Male** 或 **Female**
3. 点击 **Apply**

### 设置通讯录退出 {#set-directory-opt-out}

通讯录退出设置决定人员是否会出现在会员通讯录中——包括[印制的通讯录](./print-directory.md)以及 B1 应用程序中的会员通讯录。它与人员记录上的 **Hide me from the member directory** 是同一项设置。

1. 点击 **Actions** → **Set Directory Opt-Out**
2. 选择 **Opted Out Yes**，以将所选人员从通讯录中隐藏；或选择 **Opted Out No**，以重新让他们显示
3. 点击 **Apply**

:::warning
选择将自己从通讯录中隐藏的人员，除非他们主动要求重新列出，否则应保持隐藏状态。
:::

### 设置校区 {#set-campus}

只有当你的教会已设置[校区](../settings/campuses.md)时，才会出现此选项。

1. 点击 **Actions** → **Set Campus**
2. 选择校区
3. 点击 **Apply**

### 设置自定义栏位 {#set-custom-field}

一次为所有被选取的人员设置是／否的[自定义栏位](../settings/custom-fields.md)值：

1. 点击 **Actions** → **Set Custom Field**。
2. 选择你要设置的是／否**自定义栏位**。
3. 选择要套用的**值**（**Yes** 或 **No**）。
4. 点击 **Apply**。

:::info
此批量操作只提供是／否类型的自定义栏位。若要设置其他类型的栏位，请逐一编辑每位人员。如果你的教会没有任何是／否的自定义栏位，对话框会提示你。
:::

### 加入小组 {#add-to-group}

1. 点击 **Actions** → **Add to Group**
2. 选择要将人员加入的**小组**。若要改为放入全新的小组，请勾选 **Create New Group**，并输入 **New Group Name**。
3. 点击 **Apply**

每位人员都会以一般成员的身份加入小组。之后你可以在[小组成员](../groups/group-members.md)页面中，将个别人员升为小组负责人。若要将人员加入多个小组，请对每个小组重复此操作。

### 从小组移除 {#remove-from-group}

1. 点击 **Actions** → **Remove from Group**
2. 选择要将人员移出的**小组**
3. 点击 **Apply**

:::info
此操作只会将人员从小组中移除，不会删除他们的人员记录。
:::

### 加入工作流程 {#add-to-workflow}

将所选人员以卡片的形式加入[工作流程](../serving/workflows.md)：

1. 点击 **Actions** → **Add to Workflow**
2. 选择工作流程
3. 点击 **Apply**

### 删除人员 {#delete-people}

将所选人员从你的教会资料库中删除：

1. 点击 **Actions** → **Delete**
2. **Delete Selected People** 对话框会请你确认将删除的人数
3. 点击 **Delete**

:::danger
被删除的人员会从你的通讯录、小组以及搜索结果中消失。只有在你确定要将这些人员从系统中移除时，才使用此操作。
:::

你无法选取自己，因此也无法批量删除或批量编辑你自己的记录。


## 最佳实践 {#best-practices}

- **先从小范围开始** -- 在处理大量记录之前，先用几笔记录测试批量操作，以确保你做出的更改正确无误
- **善用筛选** -- 在选取人员之前，先使用筛选或 AI 搜索缩小清单范围，以确保只更新正确的人员
- **仔细核对选取的人员** -- 在套用批量更改之前，先检查所选的人员
- **记录重大更改** -- 保留有关批量更新的备注，以备日后查阅
- **与团队协调** -- 在进行大规模批量更改之前，先通知其他管理员

## 常见使用情境 {#common-use-cases}

### 更新新会员 {#updating-new-members}

在会员班结束后，将所有出席者更新为会员身份：

1. 搜索出席该班的人员
2. 全部选取
3. 使用 **Actions** → **Set Membership Status** → **Member**

### 整理小组 {#organizing-small-groups}

将多位人员加入新的小组：

1. 搜索你想加入该小组的人员
2. 选取他们
3. 使用 **Actions** → **Add to Group**，并选择该小组

### 清理资料 {#cleaning-up-data}

将一群已不再出席的人标记为不活跃：

1. 打开**Advanced**搜索，筛选出你想更新的人员（例如，所有近期未出席的人）
2. 选取他们
3. 使用 **Actions** → **Set Membership Status** → **Inactive**

## 相关文章 {#related-articles}

- [搜索人员](./searching-people.md) -- 找出要编辑的人员
- [AI 搜索](./ai-search.md) -- 使用自然语言找出特定群体的人员
- [小组成员](../groups/group-members.md) -- 管理小组成员资格
- [汇出资料](./exporting-data.md) -- 在进行批量更改之前汇出人员资料
