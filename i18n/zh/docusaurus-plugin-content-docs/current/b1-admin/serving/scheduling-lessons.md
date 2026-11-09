---
title: "在 B1 Admin 中从 Lessons.church 安排课程"
sidebar_label: "安排课程"
description: "将 Lessons.church 连接到 B1 Admin，然后为事工安排课程、批量安排系列课程，或将年度计划应用到服事计划中。"
---

# 从 Lessons.church 安排课程

<div class="article-intro">

B1 Admin 与 [Lessons.church](https://lessons.church) 直接集成，因此您可以直接在服事计划中为教室安排课程内容。这样，志愿者、分工和课程内容都集中在同一个地方。

</div>

## 培训视频

<YouTube id="29DVkNF4UsY" title="Reusing a Lesson Trim for Every Week in B1" next="Plan Templates, Tasks, and Workflows in B1" nextUrl="/docs/b1-admin/serving/plan-templates" />

<div class="prereqs">
<h4>开始之前</h4>

- 在服事区域中设置好您的事工
- 拥有有效的 [Lessons.church](https://lessons.church) 账户——如果您的教会还没有账户，请先在该网站注册

</div>

:::tip 跟随分步指南
想从头到尾了解完整的设置流程吗？我们的 **<a href="/guides/freeplay-b1admin" target="_blank">分步指南</a>** 涵盖了关联提供商、安排课程，以及将 FreePlay 连接到教室电视——包含简短的视频和书面步骤，您可以边做边勾选。
:::

## 第 1 步——关联您的 Lessons.church 账户

每个事工只需进行一次此设置。在浏览和安排内容之前，您需要先连接 Lessons.church 账户。

1. 登录 [B1 Admin](https://admin.b1.church/)，前往 **Serving**（服事）
2. 打开您要连接的事工（例如儿童事工）
3. 向下滚动到 **Content Providers**（内容提供商）部分
4. 点击 **Link New Provider**（关联新提供商）
5. 从列表中选择 **Lessons.church**
6. 屏幕会显示一个带有代码的设备授权页面
7. 前往 [lessons.church](https://lessons.church)，登录并输入该代码以授权连接
8. 获得批准后，您会在 B1 Admin 中看到 Lessons.church 下方显示 **Linked**（已关联）

:::info
Content Providers 部分是按事工划分的。如果您管理多个事工（例如儿童和青少年），则需要分别为每个事工关联 Lessons.church。
:::

Lessons.church 并不是唯一的选择。同一个 **Link New Provider** 列表还提供其他课程和文件来源，包括 SignPresenter、The Bible Project、Jesus Film Project、Go Curriculum、Dropbox、Google Drive 和 OneDrive。关联它们的方式都相同，关联后它们会作为提供商出现在您选择课程时可切换的选项中。

## 第 2 步——安排课程

完成关联后，您就可以直接从计划中安排课程。

1. 在 B1 Admin 中，前往 **Serving → Plans**（服事 → 计划）
2. 选择您的事工标签页，然后点击 **Add Plan Type**（添加计划类型）（如果该事工还没有计划类型，则点击 **Create Plan Type**（创建计划类型））——为该计划类型取一个名称，例如 Children's Church（儿童礼拜）或 Sunday School（主日学）
3. 点击您刚创建的计划类型，然后点击 **Schedule Lesson**（安排课程）。在此菜单中，您可以安排单节课，批量安排一个系列，或点击 **Apply Year Plan**（应用年度计划），从 Lessons.church 中导入一个已发布的年度课程序列。
4. 选择课程的**日期**（默认为即将到来的主日）
5. 点击 **Select Lesson**（选择课程）——会打开内容浏览对话框
6. 对话框会以 **Lessons.church** 作为提供商打开（或以该计划类型之前课程所使用的提供商打开）。如果您关联了其他提供商，可以在对话框顶部切换
7. 浏览内容：
   - 选择一个 **Program**（课程项目），例如“Bible Stories for Kids”（儿童圣经故事）
   - 在该项目中选择一个 **Study**（课程单元），例如“Creation and Early Stories”（创造与早期故事）
   - 选择具体的 **Lesson**（课）
   - 选择 **Venue**（适用年龄段）——即该课程针对某个年龄段的版本

   其他提供商的内容组织方式不同。例如，**Go Curriculum** 先选择 **Elementary**（小学）或 **Preschool**（学前），然后是系列，最后才是课程本身——没有 Venue 可供选择。
8. 点击 **Associate Lesson**（关联课程）进行确认
9. 为志愿者选择**复制选项**：
   - **Nothing**（不复制）——全新的计划，不带入任何志愿者
   - **Positions Only**（仅复制岗位）——复制上一个计划中的志愿者岗位，但不复制已分配的人员
   - **Positions and Assignments**（复制岗位和分工）——同时复制岗位和已分配的志愿者 *（最常用）*
10. 点击 **Save**

计划会自动创建并命名（例如“Feb 23 - Elementary”）。志愿者可以打开计划，查看自己的分工，并在主日前查看课程内容。

:::warning
请务必为教室的年龄段选择正确的 **Venue**。选错了 Venue，志愿者看到的内容就会是为另一个年龄段设计的。
:::

## 批量安排系列课程

要一次安排同一系列中的多节课，请点击 **Schedule Lesson → Bulk Schedule**（批量安排）：

1. 在 **Starting Lesson**（起始课程）下，点击 **Select Lesson**，选择您想要安排的第一节课
2. 设置 **Start Date**（开始日期），并选择 **Interval**（间隔）（**Weekly**（每周）或 **Bi-Weekly**（每两周））
3. 选择从上一个计划复制的内容（**Nothing**、**Positions Only** 或 **Positions and Assignments**）
4. 检查列表——包括起始课程及该系列其余的课程，每节课都带有一个日期。取消勾选您想跳过的课程
5. 点击 **Save**，为每节课创建一个计划

对于 Lessons.church，列表还会显示每节课将使用的 **Venue**，系统会根据名称与您为起始课程选择的 Venue 进行匹配（如果某节课没有该 Venue，则会使用其他 Venue，并标记为 **substituted**（已替换））。对于没有 Venue 级别的提供商（例如 Go Curriculum），课程将直接安排，Venue 列会隐藏。

## 只保留每节课的一部分

如果您的教室每节课都使用相同的部分（例如开场视频、背诵经文和故事问题），而其余部分则现场讲授，那么您可以为每个计划类型保存一次这种裁剪，而无需逐个编辑计划：

1. 打开一个已安排课程的计划，然后点击 **Customize**（自定义）
2. 按照平常的方式删除您不使用的部分。如果只想保留某个部分中的一个步骤（例如背诵经文视频），请将该部分展开为各个步骤，然后删除其余步骤
3. 在服事流程下方，点击 **Use this for every lesson in Elementary**（对 Elementary 中的每节课使用此设置）（链接中会显示您的计划类型名称）
4. 检查要保留的部分列表。保持勾选 **Also trim the upcoming lessons already scheduled**（同时裁剪已安排的即将到来的课程），以便将已安排到该计划类型中的课程也进行裁剪（这会替换它们的服事流程）
5. 点击 **Save**

此后，凡是通过 **Schedule Lesson**、**Bulk Schedule**、**Apply Year Plan** 或 **Link Lesson**（关联课程）安排到该计划类型中的每节课，都会自动裁剪为相同的部分，因此 FreePlay 在教室电视上只会播放这些部分。部分是按名称匹配的，因此如果某个部分名称略有改动（例如“Bible Story Questions”而不是“Big Bible Story Questions”），仍然可以被找到。如果某个部分的名称每周都会变化（例如以经文命名的背诵经文视频），则该步骤会按其在部分中的位置保留。

如果某节课不符合该模式（例如缺少某个部分，或当周没有视频或图片，或按位置而非名称保留），该计划仍会被裁剪为匹配到的内容，并会被标记：计划列表中该计划下方以及计划页面顶部会出现警告，并且该事工的负责人会收到通知。请在主日前检查该计划的服事流程。编辑服事流程或点击 **Dismiss**（忽略）后，警告会消失。如果某节课的任何内容都不匹配，则该课程将保持完整，并会被标记。

已有服事流程的计划在安排时不会被改动。若要更改已保存的裁剪设置，请自定义另一个计划，然后点击 **Replace the saved trim for Elementary**（替换 Elementary 已保存的裁剪设置）（同样会显示您的计划类型名称）。若要停止裁剪，请打开计划类型的 **Edit** 对话框，并点击 **Lesson trim**（课程裁剪）旁边的 **Clear**（清除）。

## Go Curriculum 负责人指南

安排 Go Curriculum 课程时，计划的服事流程会根据课程的 **Large Group**（大组）负责人指南来构建：指南的每个部分都会成为一个分区，其中的每个步骤都会按其类型（例如 say（说）、do（做）、play（播放）或 note（注释））及其文字列出。播放视频或其他媒体的步骤会附带该文件，因此会按顺序播放。（没有大组指南的课程，则会退回为媒体文件的简单列表。）

每个包含小组材料的系列还会以 **Small Group Guides**（小组指南）文件夹开头。打开它并选择一节课，即可安排该课的 **Small Group**（小组）指南，名称类似“Lesson Name - Small Group”——适用于单独的小组计划类型。小组指南主要是讨论步骤，通常不包含媒体。由于该文件夹排在最前面，因此从其中某节课批量安排系列时，永远不会误选它。
## 应用年度计划

如果课程出版商已在 Lessons.church 上发布了年度计划，您可以一步将整个序列加载到此计划类型中：

1. 点击 **Schedule Lesson → Apply Year Plan**
2. 选择已发布的年度计划
3. 如果该计划与日历挂钩（例如 Ark Kids），请选择**目标年份**。复活节和圣诞节的课程会落在该年的相应日期上。如果您只安排一年中的部分课程，请调整第一节课和最后一节课的日期。
4. 如果该计划与日历无关，请设置第一节课的日期（第 1 周对应该日期，之后每周相隔七天），以及要编排的周数（12、24、44 或 52）
5. 可选地从上一个计划复制志愿者岗位
6. 预览列表。取消勾选您不想要的周——该段落中之后的课程会顺延到下一个空闲的主日，而不会留下空缺。对于与日历挂钩的计划，已有计划的日期会以同样的方式跳过。
7. 保存。每一周都会成为一个服事计划，您可以照常编辑——更改课程、志愿者或日期——而 FreePlay 将播放该周计划上的内容。

:::tip
**提前规划**——您可以一次安排多周的课程，让团队提前准备。使用计划视图中的过往课程列表，以避免不小心重复使用内容。
:::

## 自定义课程内容

课程安排完成后，您可以根据自己的教室进行定制——删除不适用的部分、隐藏教室不用的角色，或重新排列内容以匹配您偏好的流程。自定义内容可以仅保存给一间教室使用，也可以应用到教会的所有教室。

请参阅 [自定义课程](/docs/lessons-church/customization/customizing-lessons) 指南，了解分步操作说明。

## 使用 FreePlay 在教室电视上播放课程

在 B1 Admin 中安排课程与 **[FreePlay](/docs/freeplay/)** 完美搭配。FreePlay 是 ChurchApps 推出的免费媒体播放器，适用于教室电视和 Fire Stick。计划设置完成后，FreePlay 可以直接从 Lessons.church 拉取课程内容，并在教室中全屏播放。教师可以用电视遥控器掌控节奏，随课程进展切换视频和幻灯片。

这意味着志愿者可以在手机上查看计划，而内容则在教室电视上播放——无需额外设置，无需 U 盘，也不会在最后一刻手忙脚乱。

[了解如何将 FreePlay 连接到内容提供商 →](/docs/freeplay/content-providers/connecting-providers)

## 找不到您的课程提供商？

可用提供商的列表正在不断增加。如果您的教会使用的课程提供商尚未出现在 B1 Admin 中，请与我们联系，我们会努力将其添加进来。

您可以直接复制下面的信息并发送给您的课程提供商——他们与我们取得联系后，我们就会着手设置对接：

---

> **主题：ChurchApps 对接请求**
>
> 您好 [课程提供商团队]，
>
> 我们非常喜欢您的课程，并且每周都在孩子们身上使用。我们也使用 ChurchApps 来管理志愿者和服事计划，并使用 FreePlay（freeplay.church）在教室电视上直接播放课程内容。这对我们的教师来说真是改变游戏规则。
>
> 目前我们需要单独管理您的课程，但如果您的课程能与 ChurchApps 对接，我们就可以直接在服事计划中安排您的课程，并通过 FreePlay 在教室屏幕上播放——无需离开我们已经在使用的工具。
>
> ChurchApps 已经与多家课程提供商合作，他们的团队也乐意与您合作。您能否联系 **support@churchapps.org**，开启这段对话？我们非常希望促成此事！
>
> 谢谢！

---

## 相关文章

- [服事计划](./plans.md)
- [服事流程](./service-order.md)
- [自定义课程](/docs/lessons-church/customization/customizing-lessons)
- [FreePlay——在教室电视上播放课程](/docs/freeplay/content-providers/playing-content)
- [Lessons.church 排课指南](/docs/lessons-church/classrooms/scheduling-lessons)
