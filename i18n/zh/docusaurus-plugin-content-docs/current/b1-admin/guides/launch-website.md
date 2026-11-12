---
title: "指南：上线你的教会网站"
description: "在 B1 Admin 中设置教会网站：搭建首页、匹配颜色和徽标、添加关键页面、连接自定义域名，并添加奉献和表单。"
---

# 上线你的教会网站

<div class="article-intro">

B1.church 内置完整的网站构建工具，无需额外付费。本指南将引导你从零开始创建教会网站——设置首页、配置外观风格、添加关键页面，并可选择性地接入在线奉献和活动报名表。

</div>

## 培训视频 {#training-video}

<YouTube id="aA4UahZpmXg" title="在 B1 中上线你的教会网站" next="在 B1 中编辑页面和导航" nextUrl="/docs/b1-admin/website/page-editor" />

<div class="prereqs">
<h4>开始之前</h4>

- 准备好教会徽标（使用透明背景的 PNG 效果最佳）
- 为网站选择 2–3 种品牌颜色
- 如果使用自定义域名（例如 yourchurch.com），请确保你可以访问域名的 DNS 服务商（GoDaddy、Cloudflare 等）
- 如果希望在网站上提供在线奉献，请先完成 [在线奉献设置](../donations/online-giving-setup.md)（Stripe）

</div>

## 第 1 步：网站初始设置 {#step-1-initial-website-setup}

首先创建你的首页和网站的基本结构。

请按照[网站初始设置](../website/initial-setup.md)指南操作：

1. 在[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)中，选择 **Website > Pages**（网站 > 页面）
2. 点击 **Add Page**（添加页面），选择 **Blank**（空白），将 **Page Title**（页面标题）输入为"Home"（首页），然后点击 **Save**。在 **Page Settings**（页面设置）中，将 **URL Path**（网址路径）设为 `/`
3. 点击 **Edit Content**（编辑内容），添加一个 **Section**（板块），然后加入你的主视觉、欢迎信息、教会名称和标语，以及其他关键信息

:::tip
从零开始？[网站模板](../website/managing-pages.md#starting-from-a-site-template)会创建一组现成的页面（首页、关于、连接、奉献等），并已设置好导航链接——只需将占位内容替换为你自己的内容即可。
:::

## 第 2 步：配置外观 {#step-2-configure-appearance}

设置网站的视觉识别——颜色、字体、徽标和页脚。

请按照[外观](../website/appearance.md)指南操作：

1. 在跳转菜单中，选择 **Website > Appearance**
2. 在 **Logo**（徽标）下，上传 **Light Background Logo**（浅色背景徽标）和 **Dark Background Logo**（深色背景徽标）
3. 在 **Color Palette**（调色板）下设置你的品牌颜色，点击 **Save Palette**（保存调色板），然后选择你的 **Fonts**（字体）
4. 使用 **Navigation**（导航）设置导航栏的样式，并使用 **Site Footer**（网站页脚）构建每个页面都会显示的页脚

:::tip
保持调色板简洁——通常一种主色加一种强调色就足够了。其余部分由网站构建工具处理。
:::

## 第 3 步：添加内容页面 {#step-3-add-content-pages}

建立访客最需要的页面。

请按照[管理页面](../website/managing-pages.md)指南创建以下页面：

- **About**（关于）——教会的故事、信仰和领导层
- **Sermons**（讲道）——链接到你的[讲道资料库](../sermons/managing-sermons.md)
- **Events**（活动）——即将举行的活动和报名
- **Give**（奉献）——在线奉献页面（需要先[设置 Stripe](../donations/online-giving-setup.md)）
- **Contact**（联系我们）——地点、聚会时间和联系信息

## 第 4 步：连接你的域名 {#step-4-connect-your-domain}

如果你希望使用自己的域名（例如 yourchurch.com），而不是默认的 B1 网址：

请按照[自定义域名](../settings/custom-domain.md)指南操作：

1. 在你的域名服务商处，为 `www` 添加一条 **CNAME** 记录，指向 `proxy.b1.church`（或为根域名添加一条 **A** 记录，指向 `3.23.251.61`）
2. 在跳转菜单中，选择 **Settings > Settings**，点击 **Domains**（域名）板块中的 **Edit**，输入你的域名，然后点击 **Save**

:::info
请先设置 DNS：B1 会立即保存域名，但在 DNS 指向 B1 之前，网站不会加载（也不会获得 SSL 证书）。DNS 变更可能需要几分钟到几小时才能生效。在此期间，默认的 B1 网址仍可正常使用。
:::

## 第 5 步：添加奉献和表单 {#step-5-add-giving-and-forms}

通过互动元素丰富你的网站：

- **在线奉献**——添加一个 **Donation**（奉献）组件，使成员可以直接通过你的网站奉献。请先参阅[在线奉献设置](../donations/online-giving-setup.md)配置 Stripe。
- **报名表单**——使用 **Form**（表单）组件嵌入[独立表单](../forms/creating-forms.md)，用于活动报名、访客卡或志愿者申请。有关如何在任意页面添加组件，请参阅[页面编辑器](../website/page-editor.md)。

## 完成！ {#youre-done}

你的教会网站已经上线。与会众及社交媒体分享网址。你可以随时从 B1 Admin 的 **Website**（网站）板块更新内容、添加新页面以及调整外观。

## 相关文章 {#related-articles}

- [网站初始设置](../website/initial-setup.md)——详细的设置指南
- [管理页面](../website/managing-pages.md)——添加和编辑页面
- [外观](../website/appearance.md)——颜色、徽标和布局
- [页面编辑器](../website/page-editor.md)——添加板块、文字、图片、表单和奉献
- [自定义域名](../settings/custom-domain.md)——使用你自己的网址
- [管理文件](../website/files.md)——上传图片和文档
- [在线奉献设置](../donations/online-giving-setup.md)——配置 Stripe
- [创建表单](../forms/creating-forms.md)——构建报名表和问卷
