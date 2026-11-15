---
title: "B1 Admin 网站入门"
sidebar_label: "初始设置"
description: "设置你的 B1 Admin 教会网站：指向子域名或自定义域名，创建首页，选择品牌颜色和徽标，并建立导航。"
---

# 初始设置

<div class="article-intro">

每个 B1 账户都自带一个可直接使用的网站。本指南将引导你完成教会域名的设置、网站外观的配置、第一批页面的创建，以及导航的组织。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 你需要一个拥有管理员权限的 B1.church 账户
- 如果使用自定义域名，请准备好你的 DNS 服务商的登录凭据（例如 GoDaddy、Cloudflare 或 AWS）
- 为获得最佳效果，请准备好 PNG 格式、背景透明的教会徽标

</div>

## 设置你的域名 {#setting-up-your-domain}

你的教会会自动获得一个 B1.church 子域名（例如 `yourchurch.b1.church`）。你也可以将自己的自定义域名指向你的 B1 网站。

1. 访问 admin.b1.church 进入 **B1.church Admin**，或点击个人资料下拉菜单并选择 **Switch App**（切换应用）。
2. 打开[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），展开 **Settings**（设置），然后点击 **Settings**。
3. 打开 **Church Information**（教会信息）部分以查看你的子域名。将其设置为简短、易于识别且不含空格的名称。
4. 若要使用自定义域名，请登录你的 DNS 服务商（例如 GoDaddy、Cloudflare 或 AWS），并添加两条记录：
   - 一条 **A 记录**，将根域名指向 `3.23.251.61`
   - 一条 **CNAME 记录**，将 `www` 指向 `proxy.b1.church`
5. 返回 B1.church Admin，在同一设置页面中打开 **Domains**（域名）部分，将你的自定义域名添加到列表中，然后依次点击 **Add**（添加）和 **Save**（保存）。几分钟内，你就可以通过自定义域名访问你的网站。

:::tip
如果你看不到设置选项，请让设置你教会账户的人员为你授予 "Edit Church Settings"（编辑教会设置）权限。详情请参阅[角色与权限](../settings/roles-permissions.md)。
:::

## 创建你的第一个页面 {#creating-your-first-page}

1. 在 B1 Admin 中，打开[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），展开 **Website**（网站），然后点击 **Pages**（页面）。
2. 点击右上角的 **Add Page**（添加页面）。
3. 选择 **Blank**（空白）作为页面类型，将 **Page Title**（页面标题）输入为 "Home"（首页），然后点击 **Save**（保存）。
4. 在新页面所在行点击 **Page Settings**（页面设置），将 **URL Path**（网址路径）改为 `/`（一个正斜杠，不含其他文字），作为你的首页。其他页面则使用 `/page-name` 的形式。
5. 点击 **Edit Content**（编辑内容）开始构建。每个页面都必须以 **Section**（版块）开头 -- 它是所有其他元素的容器。点击 **Add Content**（添加内容），将 **Section** 拖放到页面上，然后选择一种现成的版块布局或 **Blank Section**（空白版块）。
6. 添加版块后，再次点击 **Add Content**，将文字、图片、视频、卡片、表单等内容拖放到版块中。

:::info
有关页面和导航的详细操作说明，请参阅[页面管理](./managing-pages.md)。有关可视化编辑器的完整指南，请参阅[使用页面编辑器](./page-editor.md)。
:::

## 配置网站外观 {#configuring-site-appearance}

1. 在跳转菜单中，选择 **Website > Appearance**（网站 > 外观）。
2. 使用 **Color Palette**（配色方案）设置你的品牌颜色 -- 基础浅色、强调色和深色色调，以及主要按钮和次要按钮的颜色 -- 然后点击 **Save Palette**（保存配色方案）。
3. 在 **Fonts**（字体）下，从字体浏览器中选择标题字体和正文字体，然后点击 **Save Fonts**（保存字体）。
4. 在 Style Settings（样式设置）的 **Logo**（徽标）下上传你的教会徽标。请同时提供浅色背景版本和深色背景版本，然后点击 **Save Changes**（保存更改）。
5. 点击 **Site Footer**（网站页脚），在区块编辑器中打开页脚，并添加你教会的联系信息和链接。

:::info
你在外观中所做的更改将应用于整个网站。有关每项设置的详细说明，请参阅[外观](./appearance.md)页面。
:::

## 设置导航 {#setting-up-navigation}

你的导航链接会显示在网站页面视图中。若要组织它们：

1. 在 **Main Navigation**（主导航）面板中点击 **Add**（添加），输入 **Link Text**（链接文字）以及页面路径（例如 `/about`）作为 **URL**，然后点击 **Save**。
2. 拖放链接以重新排序，或将其嵌套在父级项目之下。
3. 预览你的网站，确认导航显示正确。

## 后续步骤 {#next-steps}

- [页面管理](./managing-pages.md) -- 详细了解如何处理页面和导航
- [外观](./appearance.md) -- 微调网站的颜色、字体和布局
- [文件](./files.md) -- 为你的网站上传图片和文档
