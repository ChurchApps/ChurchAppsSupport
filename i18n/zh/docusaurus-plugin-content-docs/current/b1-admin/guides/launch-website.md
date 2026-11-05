---
title: "指南：启动您的教会网站"
---

# 启动您的教会网站

<div class="article-intro">

B1.church 包含一个完整的网站建设工具，无需额外费用。本指南将引导您从零开始创建教会网站：设置主页、配置外观和风格、添加重要页面，并可选择连接在线捐赠和活动报名表单。

</div>

## 培训视频

<YouTube id="aA4UahZpmXg" title="Launching Your Church Website in B1" next="Editing Pages and Navigation in B1" nextUrl="/docs/b1-admin/website/page-editor" />

<div class="prereqs">
<h4>开始之前</h4>

- 准备好您的教会标志（背景透明的 PNG 效果最佳）
- 为您的网站选择 2–3 种品牌颜色
- 如果使用自定义域名（例如 yourchurch.com），请确保您可以登录域名的 DNS 服务商（GoDaddy、Cloudflare 等）
- 如果您希望网站支持在线捐赠，请先完成[在线捐赠设置](../donations/online-giving-setup.md)（Stripe）

</div>

## 第 1 步：初始网站设置

首先创建您的主页和基本的网站结构。

请按照[网站初始设置](../website/initial-setup.md)指南完成以下操作：

1. 在 B1 Admin 中进入 **Website**
2. 创建您的主页，包括首屏区块、欢迎词和重要信息
3. 添加您的教会名称和标语

## 第 2 步：配置外观

设置网站的视觉识别，包括颜色、字体、标志和页脚。

请按照[外观](../website/appearance.md)指南完成以下操作：

1. 上传您的教会标志
2. 设置主色和强调色
3. 配置导航栏和页脚
4. 预览您的更改

:::tip
保持配色简洁，通常一种主色加一种强调色就足够了。网站建设工具会处理其余部分。
:::

## 第 3 步：添加内容页面

创建访客最需要的页面。

请按照[管理页面](../website/managing-pages.md)指南创建以下类型的页面：

- **About**（关于）——您教会的故事、信仰和领导层
- **Sermons**（讲道）——链接到您的[讲道库](../sermons/managing-sermons.md)
- **Events**（活动）——即将举行的活动和报名
- **Give**（奉献）——在线奉献页面（需要[Stripe 设置](../donations/online-giving-setup.md)）
- **Contact**（联系）——地点、礼拜时间和联系信息

## 第 4 步：连接您的域名

如果您希望使用自己的域名（例如 yourchurch.com），而不是默认的 B1 网址：

1. 在 B1 Admin 中进入 **Settings**，并打开 **Domains** 部分
2. 输入您的自定义域名
3. 在您的域名服务商处更新 DNS 记录，使其指向 B1

:::info
DNS 更改可能需要长达 48 小时才能生效。在此期间，您的网站可能暂时无法通过自定义域名访问。默认的 B1 网址在此期间仍可正常使用。
:::

## 第 5 步：添加奉献和表单

通过互动元素丰富您的网站：

- **在线奉献**——添加奉献区块，方便成员直接在您的网站上奉献。请先参阅[在线捐赠设置](../donations/online-giving-setup.md)配置 Stripe。
- **报名表单**——嵌入[独立表单](../forms/creating-forms.md)，用于活动报名、访客卡或志愿者申请。关于如何在任意页面中添加表单元素，请参阅[管理页面](../website/managing-pages.md)。

## 完成！

您的教会网站已经上线。与会众分享该网址，并发布到社交媒体上。您可以随时从 B1 Admin 仪表板更新内容、添加新页面并调整外观。

## 相关文章

- [网站初始设置](../website/initial-setup.md)——详细的设置步骤
- [管理页面](../website/managing-pages.md)——添加和编辑页面
- [外观](../website/appearance.md)——颜色、标志和布局
- [管理文件](../website/files.md)——上传图片和文档
- [在线捐赠设置](../donations/online-giving-setup.md)——配置 Stripe
- [创建表单](../forms/creating-forms.md)——创建报名表和调查表
