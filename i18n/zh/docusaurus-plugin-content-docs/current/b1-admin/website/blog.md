---
title: "在 B1 Admin 中撰写网站博客文章"
sidebar_label: "博客"
description: "在 B1 Admin 中为教会网站创建、定时和发布博客文章，包括摘要、分类、标签、页眉图片和评论嵌入。"
---

# 博客 {#blog}

<div class="article-intro">

博客页面让你可以向教会网站发布新闻、动态和灵修文章。文章会显示在 `/blog` 的卡片列表中、各自的网址上，以及 RSS 订阅源中，其他工具（如 Zapier）可以监测订阅源中的新文章。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 完成网站的[初始设置](./initial-setup.md)
- 如果你希望访客能从菜单中找到博客，请在[页面管理](./managing-pages.md)中为 `/blog` 添加导航链接

</div>

## 进入博客 {#accessing-the-blog}

1. 在 B1 Admin 中，打开[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），并展开 **Website**（网站）。
2. 点击 **Blog**（博客）。
3. 博客页面会列出每篇文章及其状态和发布日期。

## 添加文章 {#adding-a-post}

1. 点击右上角的 **Add Post**（添加文章）。
2. 输入 **Title**（标题）。输入时会自动生成一个适合网址的 **Web address**（网址别名）。如果你希望使用其他地址，可以直接编辑。
3. 添加 **Excerpt**（摘要）-- 在文章列表、元描述和 RSS 订阅源中显示的简短概要。如果留空，则会自动从文章内容的开头生成摘要。
4. 使用 Markdown 在 **Content**（内容）编辑器中撰写文章正文。点击 **Preview**（预览）可查看格式化后的文章效果。
5. 选择 **Category**（分类）（选择已有分类，或输入新分类），并可选择以逗号分隔的 **Tags**（标签）。
6. 点击 **Select Image**（选择图片），从你的[文件](./files.md)图库中选择照片，或上传新照片。上传的照片会在内置的裁剪工具中打开，并锁定为 16:9 比例，因此你可以调整任何照片的构图，使其适合文章页眉和列表卡片。
7. 设置 **Author**（作者）-- 默认为你本人，但你可以搜索并选择数据库中的任何人员。
8. 准备好将文章公开时，打开 **Published**（已发布）开关。此时会出现 **Publish Date**（发布日期）字段，默认为今天；如需其他日期，请进行更改。若要将文章保存为草稿，请保持开关为 **Draft**（草稿）。
9. 点击 **Save**（保存）。文章需要有标题，并且其网址别名不能与其他文章重复。

:::tip
将 **Publish Date** 设为未来的日期即可定时发布文章。在该日期到来之前，文章对访客保持隐藏，并在博客列表中显示 **Scheduled**（已定时）标签。
:::

## 文章状态 {#post-states}

列表中的每篇文章都会显示以下三种状态之一：

- **Draft**（草稿）-- 未发布。仅在后台可见。
- **Scheduled**（已定时）-- 已开启 Published，但发布日期在未来。
- **Published**（已发布）-- 已在你的网站上线，并包含在 RSS 订阅源中。

## 编辑、预览和删除文章 {#editing-previewing-and-deleting-posts}

- 点击文章旁边的 **Edit**（编辑）即可进行更改。
- 点击 **View on Site**（在网站上查看）（显示在已发布的文章上）可在新标签页中打开你网站上的文章。
- 点击 **Delete**（删除）可永久移除文章。

## 访客如何查看你的博客 {#how-visitors-see-your-blog}

已发布的文章会显示在 `{yoursite}/blog` 上，每页 10 篇，并提供 **Older posts**（较早的文章）/**Newer posts**（较新的文章）链接，用于翻阅存档；此外还有分类标签，可用于筛选列表，每篇文章还会显示作者署名和照片。标签会以可点击的标签形式显示在每篇文章底部，访客同样可以按标签筛选列表。单篇文章位于 `{yoursite}/blog/{slug}`，结尾处有 **More in** *分类名称* 版块，列出同一分类下最多三篇其他文章。访客所看到的内容，请参阅 B1.church 指南中的[博客](../../b1-church/content/blog.md)。博客页面还会发布 RSS 订阅源，可被订阅阅读器和 Zapier 等自动化工具自动发现。

如果你启用了该选项，已发布的文章还可以显示在教会应用主屏幕的 **News**（新闻）版块中 -- 参见[主屏幕版块](../settings/mobile-app.md#home-screen-sections)。

:::info
博客文章是与普通网站页面不同的内容类型 -- 它们不在[页面编辑器](./page-editor.md)中构建，也不会出现在页面列表中。这样可以让博客撰写过程快速、专注于写作本身。
:::

## 在文章下方添加评论 {#adding-comments-below-posts}

B1 本身不托管博客评论，但你可以添加评论服务。你也可以在每篇文章下方放置其他内容，例如电子报订阅表单或奉献按钮。

1. 注册 [Hyvor Talk](https://talk.hyvor.com)、[FastComments](https://fastcomments.com) 或 [Disqus](https://disqus.com) 等评论服务，并复制其嵌入代码。
2. 在博客页面中，滚动到 **Below Every Post**（每篇文章下方）。
3. 粘贴嵌入代码并点击 **Save**（保存）。

该代码会显示在每篇已发布文章的内容下方。评论服务负责内容审核和垃圾信息过滤，因此请定期查看其后台。

:::tip
清空输入框并点击 **Save**，即可从每篇文章中移除该代码。只有有权编辑教会设置的人员才能看到此输入框。
:::

## 后续步骤 {#next-steps}

- [页面管理](./managing-pages.md) -- 为你的博客添加导航链接
- [文件](./files.md) -- 上传用于文章的照片
- [Zapier 集成](../integrations/zapier.md) -- 在发布新文章时触发自动化流程
