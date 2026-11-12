---
title: "设置"
description: "在 B1 Admin 的设置中找到方向：教会信息、品牌、校区、自定义字段、用户角色以及 B1.church 应用导航。"
---

# 设置

<div class="article-intro">

设置版块是你在 B1 Admin 中配置教会账户、品牌形象和管理选项的地方。在这里，你可以管理从教会名称、子域名到用户权限和移动应用配置的一切内容。

</div>

## 你可以在这里找到什么 {#what-you-will-find-here}

设置区域分为以下子版块：

1. **Settings**（设置）-- 配置教会的基本信息、子域名、地区（日期和电话格式）、奉献、短信服务商、文件存储等。详情请参阅[教会设置](./church-settings.md)。如需使用自己的域名（例如 yourchurch.org），请参阅[自定义域名](./custom-domain.md)。
2. **Campuses**（校区）-- 添加和管理教会的多个实体地点。创建后，校区会显示在人员资料、出勤设置和人口统计仪表板中。它以主设置页面中的一个部分形式提供，而非独立的导航项。详情请参阅[校区](./campuses.md)。
3. **Custom Fields**（自定义字段）-- 定义你自己想要追踪的人员字段（日期、数字、是/否回答或选择列表），然后在资料中填写并据此搜索。同样以主设置页面中的一个部分形式提供。详情请参阅[自定义字段](./custom-fields.md)。
4. **Roles**（角色）-- 控制每位工作人员和志愿者可以查看和更改的内容。参见[角色与权限](./roles-permissions.md)。
5. **Email Templates**（电子邮件模板）-- 保存可重复使用的邮件内容，用于手动发送或通过工作流发送。详情请参阅[电子邮件模板](./email-templates.md)。
6. **Audit Log**（审计日志）和 **Batches**（批次）-- 查看你账户中所做的更改（[审计日志](../reports/audit-log.md)），以及查看或撤销批量导入和操作（**Batches**）。
7. **Server Admin**（服务器管理）-- 高级管理工具，仅对 ChurchApps 服务器管理员显示。

:::info
**Mobile Apps**（移动应用）配置和**表单**现在拥有各自的顶级导航项 -- **Mobile**（移动端）和 **Forms**（表单，位于 **People**（人员）下），而不再位于设置中。详情请参阅[移动应用设置](./mobile-app.md)和[创建表单](/docs/b1-admin/forms/creating-forms)。
:::

## 主设置页面 {#the-main-settings-page}

首次打开设置页面时，左侧面板会显示你的**教会名称**、**子域名**和地址，以及一个 **Import/Export**（导入/导出）链接，可打开用于在不同系统之间传输数据的导入/导出工具。

在其下方，**Configuration**（配置）列表链接到各个设置部分：**Church Information**（教会信息）、**General**（通用）、**Region**（地区）、**Giving**（奉献）、**Texting**（短信）、**File Storage**（文件存储）、**Domains**（域名）、**Grade Promotion**（升级年级）、**Check-In**（签到）、**Volunteer Signup**（志愿者报名）、**Giving privacy**（奉献隐私）、**Campuses**（校区）、**Custom Fields**（自定义字段）和 **Developer**（开发者）。每一项都会显示其当前设置的一行摘要，而仍需设置的部分（例如奉献、短信或域名）会带有一个小圆点标记。**Giving** 仅对有权编辑奉献设置的人员显示。在手机上，该列表会被隐藏；请滚动页面以访问各个部分。所有部分都位于同一页面上 -- 点击列表中的名称即可滚动到对应部分，或直接向下滚动。每个部分都会显示其当前设置；在某个部分中点击 **Edit**（编辑）即可进行更改。

**Developer**（开发者）部分有三个标签页：**API Keys**（API 密钥）、**Webhooks**（网络钩子）和 **Connected Apps**（已连接应用）。参见 [API 密钥](../../developer/api/api-keys.md)、[Webhooks](../../developer/api/webhooks.md) 和 [已连接应用](../../developer/api/connected-apps.md)。

**Email Templates**（电子邮件模板）、**Audit Log**（审计日志）和 **Batches**（批次）是独立的页面 -- 请从[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)中的 **Settings** 下打开它们。

请从 **Church Information**（教会信息）部分开始，编辑教会的名称、地址和联系信息 -- 参见[教会设置](./church-settings.md)。如需管理用户角色，请打开[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)并选择 **Settings > Roles**（设置 > 角色）-- 参见[角色与权限](./roles-permissions.md)。

:::tip
首先在 **Church Information** 下配置教会名称和品牌形象，然后设置[角色](./roles-permissions.md)，以便以适当的访问级别邀请团队成员。
:::

:::info
有关你的数据如何受到保护的信息，请参阅[数据安全](./data-security.md)。
:::

## 后续步骤 {#next-steps}

- [教会设置](./church-settings.md) -- 配置教会信息和品牌形象
- [校区](./campuses.md) -- 为多校区教会添加地点
- [角色与权限](./roles-permissions.md) -- 设置用户角色和访问控制
- [移动应用设置](./mobile-app.md) -- 自定义 B1.church PWA 的导航标签页和应用主题颜色
- [推送通知](./mobile-app.md#push-notifications) -- 向应用用户发送或定时推送通知
- [数据安全](./data-security.md) -- 了解你的数据如何受到保护
