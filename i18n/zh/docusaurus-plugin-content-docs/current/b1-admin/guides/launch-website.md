---
title: "指南：启动您的教会网站"
---

# 启动您的教会网站

<div class="article-intro">

B1.church 包含一个完整的网站构建器，无需额外费用。本指南将引导您从零开始创建教会网站——设置主页、配置外观风格、添加关键页面，以及可选地连接在线奉献和活动报名表单。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 准备好您的教会标志（透明背景的 PNG 格式效果最佳）
- 为您的网站选择 2-3 个品牌色
- 如果使用自定义域名（例如 yourchurch.com），请确保可以访问您的 DNS 提供商（GoDaddy、Cloudflare 等）
- 如果您想在网站上接受在线奉献，请先完成[在线奉献设置](../donations/online-giving-setup.md)（Stripe）

</div>

## 步骤 1：初始网站设置

从创建主页和基本网站结构开始。

按照[网站初始设置](../website/initial-setup.md)指南：

1. 在 B1 Admin 中导航到**网站**
2. 创建包含主视觉区域、欢迎信息和关键信息的主页
3. 添加您的教会名称和标语

## 步骤 2：配置外观

设置您网站的视觉标识——颜色、字体、标志和页脚。

按照[外观](../website/appearance.md)指南：

1. 上传您的教会标志
2. 设置主色调和强调色
3. 配置导航栏和页脚
4. 预览您的更改

:::tip
保持色彩方案简洁——一个主色加一个强调色通常就足够了。网站构建器会处理其余部分。
:::

## 步骤 3：添加内容页面

构建访客最需要的页面。

按照[管理页面](../website/managing-pages.md)指南创建如下页面：

- **关于我们**——您教会的故事、信仰和领导团队
- **讲道**——链接到您的[讲道库](../sermons/managing-sermons.md)
- **活动**——即将举办的活动和报名
- **奉献**——在线奉献页面（需要[Stripe 设置](../donations/online-giving-setup.md)）
- **联系我们**——地址、礼拜时间和联系方式

## 步骤 4：连接您的域名

如果您想使用自己的域名（如 yourchurch.com）而不是默认的 B1 URL：

1. 在 B1 Admin 中前往**网站 > 设置**
2. 输入您的自定义域名
3. 在您的域名提供商处更新 DNS 记录，使其指向 B1

:::info
DNS 更改可能需要最多 48 小时才能生效。在此期间，您的网站可能无法立即通过自定义域名访问。默认的 B1 URL 将在此期间继续可用。
:::

## 步骤 5：添加奉献和表单

通过交互元素增强您的网站：

- **在线奉献**——添加奉献板块，让成员可以直接从您的网站捐款。请参阅[在线奉献设置](../donations/online-giving-setup.md)先配置 Stripe。
- **报名表单**——嵌入[独立表单](../forms/creating-forms.md)用于活动报名、访客登记卡或志愿者申请。请参阅[管理页面](../website/managing-pages.md)了解如何向任何页面添加表单元素。

## 完成！

您的教会网站已上线。与您的会众和社交媒体分享 URL。您可以随时从 B1 Admin 仪表板更新内容、添加新页面和调整外观。

## 相关文章

- [网站初始设置](../website/initial-setup.md)——详细的设置指南
- [管理页面](../website/managing-pages.md)——添加和编辑页面
- [外观](../website/appearance.md)——颜色、标志和布局
- [管理文件](../website/files.md)——上传图片和文档
- [在线奉献设置](../donations/online-giving-setup.md)——配置 Stripe
- [创建表单](../forms/creating-forms.md)——构建报名和调查表单
