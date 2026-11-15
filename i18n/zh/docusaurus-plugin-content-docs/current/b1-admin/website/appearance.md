---
title: "外观"
description: "在 B1 Admin 中为教会网站设置颜色、字体、间距、徽标和导航，以及小组件、GA4 分析、重定向和自定义 CSS。"
---

# 外观

<div class="article-intro">

外观页面让你可以自定义教会网站的整体外观和风格。从颜色、字体到间距和自定义 CSS，你都可以在一个地方控制网站的每个视觉细节。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 完成网站的[初始设置](./initial-setup.md)
- 准备好 PNG 格式的教会徽标，背景透明，宽高比为 4:1
- 如果你已有品牌风格指南，请了解教会的品牌颜色（十六进制值）

</div>

## 进入外观设置 {#accessing-appearance-settings}

1. 在 B1 Admin 中，打开[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），并展开 **Website**（网站）。
2. 点击 **Appearance**（外观）。
3. **Site Styles**（网站样式）页面加载后，**Theme, fonts & footer**（主题、字体与页脚）卡片左侧显示 **Style Settings**（样式设置）列表，右侧显示示例网站的预览。其下方是 **Announcement & widgets**（公告与小组件）和 **Redirects & analytics**（重定向与分析）卡片。

## 配色方案 {#color-palette}

1. 在 Style Settings 面板中点击 **Color Palette**（配色方案）。
2. 你将看到 **Base Colors**（基础颜色）（浅色、强调色和深色色调）和 **Semantic Colors**（语义颜色）（Primary（主要）、Secondary（次要）、Success（成功）、Warning（警告）和 Error（错误））。
3. 点击任意颜色色块即可打开颜色选择器。拖动选择器或输入十六进制值来选择颜色。
4. **Color Combinations Preview**（配色组合预览）会显示你所选颜色搭配在一起的效果。
5. 使用 **Suggested Palettes**（推荐配色方案）从预先设计好的配色方案开始。点击某个方案只会将其颜色载入编辑器。
6. 点击 **Save Palette**（保存配色方案）将颜色应用到网站，或点击 **Cancel**（取消）放弃更改。

## 字体排版 {#typography}

1. 在 Style Settings 面板中点击 **Fonts**（字体）。
2. 点击 **Heading Font**（标题字体）或 **Body Font**（正文字体）按钮，打开 **Select a Font**（选择字体）浏览器，它会按热门程度列出 Google 字体，每页十个。在 **Search**（搜索）中输入名称可按名称查找字体，或使用 **Category Filter**（类别筛选）（Serif（衬线）、Sans Serif（无衬线）、Display（展示）、Handwriting（手写）或 Monospace（等宽））。点击字体即可选择。你也可以点击某个 **Popular Font Combinations**（热门字体组合），一次设置两种字体。
3. 点击 **Save Fonts**（保存字体）以应用你的字体选择。
4. 若要调整一级到四级标题的字号层级，请在 Style Settings 面板中点击 **Typography Scale**（字体比例）。使用 **Type Scale**（字号倍数）、**Base Size**（基础字号）和 **Line Height**（行高）字段进行微调，然后点击 **Save Typography**（保存字体排版）。

## 间距 {#spacing}

1. 在 Style Settings 面板中点击 **Spacing Scale**（间距比例）。
2. 调整从 Extra Small（超小）到 Extra Large（超大）的间距值。示例会展示每个值如何影响布局。
3. 点击 **Save Spacing**（保存间距）将这些值应用到整个网站。

## 徽标与品牌形象 {#logo-and-branding}

1. 在 Style Settings 面板中点击 **Logo**（徽标）。
2. 上传你的 **Light Background Logo**（浅色背景徽标）和 **Dark Background Logo**（深色背景徽标）。为获得最佳效果，请使用背景透明、宽高比为 4:1 的图片。
3. 上传 **Social Media Image**（社交媒体图片）用于链接预览，并上传 **Favicon**（网站图标）作为浏览器标签页图标。
4. 可选：输入 **PWA Short Name**（PWA 简称）（最多 12 个字符）-- 当有人将应用添加到手机主屏幕时，它会显示在教会应用图标下方。
5. 点击 **Save Changes**（保存更改）。上传的图片要在保存后才会真正存储，因此如果你在保存前尝试关闭或刷新浏览器标签页，浏览器会提示你有未保存的更改。

徽标由你教会的所有网站共享，也会用于你的应用以及点名表等印刷材料。

:::tip
为获得最佳效果，请使用 PNG 格式、背景透明的徽标。这样可以确保它在你网站和[移动应用](../settings/mobile-app.md)中的浅色和深色背景上都显示良好。
:::

## 导航样式 {#navigation-styles}

自定义网站导航栏在实心和透明两种模式下的颜色：

1. 在 Style Settings 面板中点击 **Navigation**（导航）。
2. 为 **Header (solid)**（页眉（实心））和 **Header over hero (transparent)**（横幅上方的页眉（透明））配置颜色。
3. 点击 **Save Navigation**（保存导航）以应用你的导航颜色。

详细说明请参阅[导航样式](./navigation-styles.md)。

## 网站页脚 {#site-footer}

在 Style Settings 面板中点击 **Site Footer**（网站页脚），即可在区块编辑器中打开页脚。像构建任何页面版块一样进行编辑，例如你的地址、礼拜时间和社交媒体链接，完成后点击 **Exit**（退出）。页脚会出现在所有使用 **Header & Footer**（页眉和页脚）布局的页面底部。你的每个网站都有各自的页脚。

## 公告与小组件 {#announcement--widgets}

站点小组件会出现在网站的每个页面上，浮于页面内容之上：

- **Announcement Banner**（公告横幅）-- 位于网站顶部的可关闭横幅，用于发布具有时效性的消息，例如即将举行的活动或礼拜时间变更。
- **Launcher**（快捷启动器）-- 一个悬浮按钮，点击后会打开快速访问菜单，例如奉献、签到或查看周报的链接。

1. 在 Style Settings 下方找到 **Announcement & widgets**（公告与小组件）卡片。
2. 对于 **Announcement Bar**（公告栏），勾选 **Enabled**（启用），并填写 **Text**（文字）、可选的 **Link URL**（链接网址）和 **Link Text**（链接文字），以及 **Background Color**（背景颜色）和 **Text Color**（文字颜色）。设置 **Start Date**（开始日期）和 **End Date**（结束日期），使公告栏仅在该时间段内显示。
3. 对于 **Launcher**（快捷启动器），勾选 **Enabled**，然后为每个链接点击 **Add Action**（添加操作）（最多五个），并填写 **Label**（标签）、**URL**（网址）和 **Icon**（图标）。选择其 **Position**（位置）（右下或左下）和 **Color**（颜色）。
4. 点击 **Save**（保存）。

取消勾选 **Enabled** 并点击 **Save**，即可关闭某个小组件。这些小组件适用于你教会的每个网站。

## 重定向与分析 {#redirects--analytics}

**Redirects & analytics**（重定向与分析）卡片（位于 Style Settings 下方）包含两项不相关但常用的设置：

- **Analytics**（分析）-- 添加你的 **GA4 Measurement ID**（GA4 衡量 ID）（格式为 `G-XXXXXXXXXX`），然后点击 **Save**，即可跟踪网站的访客流量。同一 ID 还会跟踪你教会 B1 应用中的页面浏览量（位于 `/mobile` 的会员门户，包括已安装的应用），并以 `display_mode` 标记为 `installed`（已安装）或 `browser`（浏览器），以便你在 Google Analytics 中区分已安装应用的访问和浏览器访问。
- **Redirects**（重定向）-- 将旧的网址路径映射到新路径，这样当你移动或重命名某个页面时，指向它的链接仍能正常工作，而不会出现 404 错误。输入旧的 **From Path**（来源路径）和新的 **To Path**（目标路径），然后点击 **Add**（添加）。重定向会立即保存，并显示在输入字段上方；点击其删除图标即可移除。路径以小写形式保存，以斜杠开头，结尾不带斜杠。重定向的优先级也高于 B1 的内置页面（`/sermons`、`/stream`、`/donate`、`/bible` 和 `/votd`），因此你可以将该地址指向其他地方（例如你自己的讲道页面或 YouTube 频道）。它不会覆盖你在同一地址上自行构建的页面。如果你希望重定向生效，请先删除该页面。

## 自定义 CSS 和 JavaScript {#custom-css-and-javascript}

1. 在 Style Settings 面板中点击 **CSS & Javascript**（CSS 与 JavaScript）。
2. 添加 **Custom CSS**（自定义 CSS），以覆盖默认样式，实现高级自定义。
3. 添加 **Custom HTML**（自定义 HTML），用于跟踪代码或其他脚本。
4. 使用 **Common CSS Examples**（常用 CSS 示例）和 **Common JavaScript Examples**（常用 JavaScript 示例）版块获取现成的代码片段，然后点击 **Save Changes**（保存更改）。

:::warning
自定义 CSS 功能强大，但如果使用不当，可能会破坏网站布局。大多数教会只需使用内置的颜色、字体和间距设置，即可实现想要的外观。只有在熟悉网页开发的情况下，才应使用自定义 CSS。
:::

:::info
你的网站执行内容安全策略（CSP），会阻止来自其他来源的内联脚本。此处的 **Custom HTML**（自定义 HTML）字段，以及各个页面上的 [HTML 元素](./page-editor.md#using-the-html-element)，是受信任的例外 -- 你在这些位置保存的代码会原样运行，因此请只粘贴来自可信来源的脚本（如分析代码、聊天小组件及类似嵌入内容）。
:::

## 样式主题 {#style-themes}

如果你想要一个快速的起点，可以使用配色方案版块中的 **Suggested Palettes**（推荐配色方案），其中提供了配色协调的预设主题。点击某个方案将其载入，调整你喜欢的任何颜色，然后点击 **Save Palette**。

## 后续步骤 {#next-steps}

- [页面管理](./managing-pages.md) -- 构建和组织网站页面
- [文件](./files.md) -- 上传网站所用的媒体资源
