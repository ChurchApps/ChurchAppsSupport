---
title: "第三方提供商"
description: "在 Lessons.church 的外部提供商页面添加开放课程格式（Open Lesson Format）课程源，然后进行编辑或删除，以便您的教会安排其课程。"
---

# 第三方提供商

<div class="article-intro">

Lessons.church 通过开放课程格式（Open Lesson Format）支持外部课程提供商。这意味着您的教会可以连接其他组织的课程，并将其与内置课程库一起安排到您的教室中，使您的团队能够在一个地方获取来自多个来源的课程。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 使用有权管理教会教室排课的账户登录 Lessons.church
- 从您想要连接的外部提供商处获取课程源 URL。该 URL 必须返回符合[开放课程格式](./open-lesson-format.md)的课程

</div>

## 添加提供商

1. 点击 Lessons.church 导航栏中的 **External Providers**。随即打开 **External Lesson Providers** 页面。
2. 点击 **Add Provider**。如果您还没有添加过任何提供商，请改为点击 **Add First Provider**。
3. 输入 **Provider Name**。这是您的团队在选择提供商时看到的名称。
4. 输入 **API URL**。这是提供商发布其开放课程格式课程的地址。
5. 点击 **Save**。

该提供商仅对您的教会可见。之后，当您为某个教室[安排课程](../classrooms/scheduling-lessons.md)时，它会作为一个选项出现在 **Provider** 下拉菜单中；当您制定[年度计划](./managing-year-plans.md)时，它会出现在 **Source** 选项中。

## 管理提供商

**External Lesson Providers** 页面列出了您的教会添加的所有提供商。如需修改某个提供商：

- **编辑** -- 点击 **Edit provider**（铅笔）图标，修改 **Provider Name** 或 **API URL**，然后点击 **Save**。
- **删除** -- 点击 **Edit provider** 图标，然后点击删除（垃圾桶）图标并确认。

## 什么是开放课程格式？

开放课程格式是一种标准化的架构，以结构化的方式描述课程内容——包括项目（programs）、研究（studies）、课程（lessons）、场地（venues）、章节（sections）和活动（actions）。任何使用该格式发布内容的组织，都可以在 Lessons.church 中被添加为提供商。

如果您是一名内容提供商，希望通过 Lessons.church 提供您的课程，可以在[开放课程格式](./open-lesson-format.md)指南中找到完整的架构文档。

## 为什么使用第三方提供商？

- **为教会提供更多选择** -- 教会无需离开平台即可浏览更广泛的课程。
- **一站式获取** -- 志愿者和协调人员无需访问多个网站即可查找和安排课程。
- **设置简单** -- 添加提供商只需一个名称和一个课程源 URL，无需手动录入数据或上传文件。

:::info
第三方内容由外部提供商管理。如果您发现某个提供商的内容缺失或过时，问题可能需要由其一方解决。
:::

:::tip
要了解外部提供商的课程在排课后呈现的样子，请参阅浏览（Browsing）部分中的[外部提供商](../browsing/external-providers.md)。
:::
