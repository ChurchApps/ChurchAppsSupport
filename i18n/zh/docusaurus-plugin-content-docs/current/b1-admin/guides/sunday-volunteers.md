---
title: "指南：管理主日志愿者"
description: "在 B1 Admin 中设置志愿者团队、每周礼拜计划、礼拜程序和主日任务，让志愿者在 B1.church 和手机应用程序上查看并回应分派的工作。"
---

# 管理主日志愿者

<div class="article-intro">

设置志愿者团队，建立每周礼拜计划，分配岗位，安排包含敬拜诗歌的礼拜程序，并分派主日任务。完成后，志愿者便能在 B1 网站和手机应用程序上看到自己的分工，并可直接接受或婉拒。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 具有管理员权限的 B1 Admin 账户
- 志愿者须[已添加到通讯录](../people/adding-people.md)

</div>

## 步骤 1：建立志愿者团队 {#step-1-create-volunteer-teams}

将志愿者分组为团队，方便你按事工领域管理分工。团队位于服事区的某个事工之下。

请按照[服事](../serving/index.md)和[小组成员](../groups/group-members.md)指南完成以下操作：

1. 在[快速菜单](../introduction.md#getting-around-with-the-jump-menu)中，选择 **Serving > Plans**，点击 **Add Ministry** 建立事工（例如「主日早崇」）
2. 选择该事工的标签页，点击 **Create Serving Team**（或 **New Serving Team**），添加团队，例如「敬拜团队」、「音响与媒体」、「迎宾」、「儿童事工志愿者」
3. 打开每个团队，在 **Add Person** 框中搜索姓名，添加志愿者

:::tip
在团队的成员列表中，点击星形图标（**Make Leader**）指定团队负责人。负责人可以管理自己的小组日历并协调团队工作。
:::

## 步骤 2：建立诗歌库 {#step-2-build-your-song-library}

添加敬拜诗歌，方便每周将其加入礼拜计划。

请按照[诗歌](../serving/songs.md)指南完成以下操作：

1. 在快速菜单中，选择 **Serving > Songs**，点击 **Add Song**，然后按曲名或演唱者搜索诗歌数据库（或点击 **Create Manually** 手动建立）
2. 为每首诗歌添加编曲版本，包括歌词与调号
3. 添加 YouTube 演唱版本、和弦谱或乐谱的外部链接；如有排练录音，也可上传

:::info
在此添加的诗歌，之后可加入任何礼拜计划。只需建立一次资料库，每周都可重复使用。
:::

## 步骤 3：建立礼拜计划 {#step-3-create-a-service-plan}

计划是每周的分工安排，用于告诉志愿者他们需要在哪里服事。

请按照[计划](../serving/plans.md)指南完成以下操作：

1. 在快速菜单中，选择 **Serving > Plans**，选择你的事工标签页，然后打开你的计划类型（如果还没有，请点击 **Create Plan Type**）
2. 点击 **New Plan**，选择 **Service Date**。若要一次设置多个主日，可从之前的计划复制，选择 **Repeat every** 和 **Frequency**，并在 **Number of plans** 中输入数量
3. 在计划页面，点击 **Manage serving team**，点击 **Add Position** 添加每个岗位，然后点击其 **People Needed** 链接，指派志愿者
4. 在 **Validation** 面板中，点击 **Notify _N_ volunteer(s)** 链接，让志愿者收到邀请（参见[通知志愿者](../serving/plan-validation.md#notifying-volunteers)）。志愿者头像上的绿点表示已接受，红点表示已婉拒；计划页面的 **Responses** 方块会统计已接受、待回应和已婉拒的人数
5. 为计划类型开启[志愿者提醒](../serving/plans.md#volunteer-reminders)，让志愿者在每次礼拜前通过推送通知、电子邮件或短信收到提醒

## 步骤 4：编排礼拜程序 {#step-4-build-the-service-order}

从头到尾规划礼拜的流程。

请按照[礼拜程序](../serving/service-order.md)指南完成以下操作：

1. 打开你的计划，在 **Order of Service** 区块中点击 **Edit order of service**
2. 点击 **Add**，添加段落、诗歌（从你的资料库中选取），以及代祷、读经、报告、讲道、奉献和结束等项目
3. 拖放项目，重新排列礼拜流程

:::info
礼拜程序只适用于个别计划。在此进行的更改不会影响其他计划或总诗歌库。
:::

## 步骤 5：分派主日任务 {#step-5-assign-sunday-tasks}

追踪一次性的主日职责，确保没有任何工作被遗漏。

请按照[任务](../serving/tasks.md)指南完成以下操作：

1. 为「准备圣餐饼杯」、「印制周报」或「设置音响设备」等职责建立任务
2. 将每项任务分派给负责的个人或小组
3. 任务会显示在 **Serving > My Work**、负责人的仪表板，以及手机应用程序中

:::info
B1 Admin 不再建立定期重复的任务。若要处理需要让人员逐步完成的定期流程，请使用带有排程触发器的[工作流程](../serving/workflows.md)。
:::

## 步骤 6：开启自助报名（选填） {#step-6-enable-self-service-signup-optional}

让志愿者自行报名岗位，无需等待管理员分派。

1. 建立计划时，或在计划页面的 **Edit details** 下，设置 **Signup Deadline (hours before service)**，以控制自助报名的截止时间。时数从计划的第一场礼拜时间往回计算。留空则没有截止时间。新计划会沿用上一个计划的截止时间。
2. 选择性地勾选 **Edit details** 下的 **Show volunteer names on signup page**，让已登录的志愿者看到还有哪些人已报名。
3. 在每个岗位的 **Add a Position** 对话框中，勾选 **Allow Self-Signup**，即可开放给自助报名。
4. 为每个岗位添加 **Description**，让志愿者了解该角色的工作内容。

自助报名岗位建立后，会自动出现在 [B1.church 和 B1 App](../../b1-church/serving/volunteer-signup.md) 的志愿者报名页面上。会员可以浏览开放的岗位、查看剩余名额，并一键报名。

:::tip
同一个计划中可以同时包含管理员分派与自助报名的岗位。例如，直接指派敬拜领导，同时让迎宾和咖啡服务人员自行选择。
:::

## 步骤 7：通知志愿者 {#step-7-let-volunteers-know}

被指派的志愿者会自动看到自己的计划，并可作出回应。

1. 志愿者可在 [B1.church 和 B1 App](../../b1-church/plans/viewing-plans.md) 中查看自己的计划
2. 他们可以直接用手机或电脑接受或婉拒分派的工作
3. 他们可以为无法服事的周次设置不可服事日期
4. 计划可以打印出来用于排练，或张贴在后台
5. 志愿者可以通过[志愿者报名页面](../../b1-church/serving/volunteer-signup.md)浏览并报名开放的岗位

:::tip
当志愿者收到新的分派或计划有变动时，B1 App 中的推送通知会提醒他们。
:::

## 完成！ {#youre-done}

你的志愿者管理系统已经设置完成。每周建立新的计划、指派岗位，团队便能在手机或电脑上看到所有安排。

## 相关文章 {#related-articles}

- [服事](../serving/index.md)：设置事工与服事团队
- [小组成员](../groups/group-members.md)：添加并管理团队成员
- [计划](../serving/plans.md)：建立并管理礼拜计划
- [礼拜程序](../serving/service-order.md)：规划礼拜的流程
- [诗歌](../serving/songs.md)：管理你的敬拜诗歌库
- [任务](../serving/tasks.md)：将待办事项分派给个人或小组
- [工作流程](../serving/workflows.md)：通过触发器与自动化步骤，推动可重复的流程
- [查看计划](../../b1-church/plans/viewing-plans.md)：志愿者如何查看自己的计划
- [志愿者报名](../../b1-church/serving/volunteer-signup.md)：会员如何自行选择志愿岗位
