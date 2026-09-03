---
title: "内容公用库"
---

# 内容公用库 — 共享资产库和审核

跨产品共享的用户提交内容（WorshipCommons 歌曲、Lessons.church 课程、FreeShow 模板、B1 网站模板）通过一个审核队列而不是按产品审核流程进行。本页介绍提交/批准生命周期、共享资产数据模型以及审核的位置。

## 资产脊柱

两个表格携带每个公用库项，无论产品如何：

- **`assets`** — 公共身份行。`status`: `pending` | `published` | `unpublished` | `removed`。类型特定的数据（歌曲详细信息、作者）位于由 `assetId` 连接的卫星表中。
- **`assetFiles`** — 附加到资产的每个文件（音频、图像、文档），替换个别内容表上的旧 `path` + 逗号分隔 `files` 列。
- **`submissions`** — 审核单元。生命周期：`draft → pending → approved | rejected | withdrawn`。提交可以是全新资产或对现有已发布资产的编辑（由原始作者或第三方）。

批准提交会运行产品特定的**发布钩子**（`Api/src/modules/commons/helpers/publishHooks/`，例如 `song.ts`）将提交扩展到产品自己的记录中。

## 提交流程

`CommonsSubmissionController`（`Api/src/modules/commons/`）是面向最终用户的 API：创建草稿、预签署和附加文件、提交审核或撤回。其实际客户是外部生产者网站（WorshipCommons 网站、Lessons.church、FreeShow、B1 网站模板库） — 而不是 B1Admin。

## 审核队列

队列位于 **B1Admin → 服务器管理员 → 公用库**（`B1Admin/src/serverAdmin/components/CommonsTab.tsx`），由 `Permissions.server.admin` 权限选通 — 与该页面上的教堂/模拟/作业相同的权限。这是一个仅限 ChurchApps 员工的内部工具，不是各个教会会看到的东西。

三个子标签：

- **队列** — 所有产品中的每个待处理提交，可按产品/资产类型筛选。每行显示新资产与编辑作者与第三方编辑徽章、提交者的批准跟踪记录、字段/文件差异摘要和年龄（标记超过 72 小时）。**审核**打开一个抽屉，其中包含字段级差异、文件预览和嵌入式只读产品预览；批准/拒绝支持键盘快捷方式（j/k 导航，a/r 操作）。
- **报告** — 已发布资产的版权和政策/质量报告，分为两个队列加上已解决的历史记录。工作人员声称一份报告，然后用决议（支持/驳回/重复）和措施（无/取消发布/删除）解决。
- **资产** — 已发布内容的可搜索浏览器，具有按资产操作：功能、取消发布/重新发布或删除（原因：版权/政策）。

`/commons/admin/*`（`CommonsAdminController.ts`）下的每个端点都独立重新检查服务器管理员权限。

:::info
此设计有意只有一个队列：WorshipCommons 自己的 `/admin` 审核 UI 已弃用，取而代之的是将每个产品的提交路由到 B1Admin 的服务器管理员工具。
:::

## 跨度

Api（公用库模块）、B1Admin（服务器管理员）和外部生产者网站：WorshipCommons、Lessons.church、FreeShow、B1 网站生成器模板。
