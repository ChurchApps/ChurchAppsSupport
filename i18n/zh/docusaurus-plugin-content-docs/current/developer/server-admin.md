---
title: "服务器管理"
---

# 服务器管理

<div class="article-intro">

ChurchApps 的服务器管理功能仅对拥有 **Server.Admin** 权限的用户开放。这些工具用于平台运维、支持以及跨系统内所有教会的故障排查。

</div>

:::warning 访问受限
本页所述功能需要 **Server.Admin** 权限，普通教会管理员无法使用。它们仅供平台运营人员和支持人员使用。
:::

## 访问服务器管理

拥有 Server.Admin 权限的用户可以从 B1 Admin 进入服务器管理面板：

1. 登录 [admin.b1.church](https://admin.b1.church)
2. 打开[快速跳转菜单](../b1-admin/introduction.md#getting-around-with-the-jump-menu)，展开 **Settings**，然后点击 **Server Admin**。（你也可以直接访问 `admin.b1.church/admin`。）
3. 服务器管理面板左侧按三组列出各个板块：**Directory**（目录：Churches、Users、Impersonate User）、**Operations**（运维：Background Jobs、Commons、Usage Trends）和 **System**（系统：Translation Lookups、Server Health、Database Migrations）

## 重置两步登录

如果某位用户开启了[两步登录](../b1-admin/profile/managing-profile.md#two-factor-sign-in)，并且同时丢失了手机和备用代码，服务器管理员可以为其关闭两步登录：

1. 打开服务器管理面板的 **Users** 板块，查找该用户。
2. 开启两步登录的用户会显示 **Two-factor on**（已开启两步验证）标记。点击其旁边的 **Reset 2FA**（重置 2FA）。
3. 确认提示。只有在确认对方身份之后才能执行此操作。

此后，该用户只需输入密码即可登录，并可在个人资料中重新设置两步登录。重置操作会以 `mfa_reset` 的形式写入审计日志。该端点为 `POST /membership/users/mfa/reset/:userId`，需要 Server.Admin 权限。

## 用户模拟

模拟功能允许服务器管理员以其他用户的身份登录，用于支持和故障排查。这在调查用户报告的问题或帮助教会配置系统时非常有用。

### 如何模拟用户

1. 打开服务器管理面板的 **Impersonate User**（模拟用户）板块
2. 在搜索框中输入用户的姓名或电子邮件地址
3. 点击 **Search**（搜索）或按 Enter
4. 在搜索结果中点击你要模拟的用户
5. 在弹出的对话框中确认模拟
6. 你将以该用户的身份登录，并被重定向到其账号

### 重要说明

- 模拟会创建一个具有目标用户权限和教会访问范围的新会话
- 模拟其他用户时，你原有的管理员会话会结束
- 在模拟身份下执行的所有操作都会记录在审计日志中
- 若要返回你的管理员账号，请退出登录后，使用你自己的凭据重新登录
- 仅在支持确有必要时才使用模拟，并且在为支持而访问用户账号时，务必告知用户

### API 端点

模拟功能由 Membership API 中的 `/users/:userId/impersonate` 端点支持。技术细节请参阅 [Membership 端点](/docs/developer/api/endpoints/membership#users)。

### 安全注意事项

- 模拟需要 Server.Admin 权限——该权限应谨慎授予，且仅授予值得信赖的平台运营人员
- 所有模拟事件都会记录管理员用户 ID 和目标用户 ID
- 模拟发生时不会通知教会，因此应事先制定关于何时、如何使用该功能的明确政策
- 建议在支持工单系统中记录模拟事件，以便追溯责任

## Commons 审核

Commons 是跨产品共享的用户提交内容审核队列——WorshipCommons 歌曲、Lessons.church 课程、FreeShow 模板以及 B1 网站构建器模板，全部汇入同一个队列，而不是各产品使用各自独立的审核工具。

### 访问 Commons

1. 进入服务器管理面板中的 **Commons** 标签页。
2. 你会看到三个子标签页：**Queue**（队列）、**Reports**（举报）和 **Assets**（资源）。

具有受限**音乐编辑**角色的用户同样可以看到 Queue 标签页，但无法批准会更改歌曲版权或授权的提交。

### 队列

Queue 列出所有产品中待处理的提交，可按产品和资源类型筛选。每一行会显示该提交是新资源、原作者的编辑，还是第三方的编辑，同时显示提交者的审批记录，以及提交已等待了多久（超过 72 小时会被标记）。

点击 **Review**（审核），即可打开一个抽屉，其中包含字段级差异、文件预览以及该条目的只读嵌入预览。使用 **a** / **r** 快捷键批准或拒绝，使用 **j** / **k** 在不离开抽屉的情况下切换到下一个或上一个提交。拒绝时需要选择原因（例如质量、重复、授权、CCLI、AI 或偏离主题）并填写备注。

### 举报

Reports 标签页处理针对已发布资源提交的版权及政策/质量举报，分为独立的 Copyright（版权）和 Policy & Other（政策及其他）队列，另有 Resolved（已处理）历史记录。认领举报即可开始处理，然后以处理结果（维持、驳回或重复）和处理操作（无、下架或移除）进行结案。

### 资源

Assets 标签页是一个可搜索的已发布内容浏览器，提供以下操作：**Feature**（设为推荐，在产品首页突出显示）、**Unpublish**（下架）/**Republish**（重新发布），或 **Remove**（移除，并需注明版权或政策原因）。

对于歌曲而言，这里也是歌曲成为**主日就绪（Sunday-ready）**并有资格出现在教会 B1 Admin 歌曲搜索结果中的地方：审核员打开资源，在听完并确认乐谱、和弦和幻灯片齐全之后，将每个已发布的调性标记为 **Listened**（已听过）。只有当所有调性都被勾选后，歌曲才会成为主日就绪。

:::info
Commons 审核仅限工作人员使用——各个教会永远看不到这个队列。各教会的 B1 Admin 唯一会接触 Commons 数据的地方，是[歌曲搜索](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons)中的"WorshipCommons — free"板块，该板块只会展示已经通过此审核流程的歌曲。
:::

底层数据模型和提交生命周期，请参阅 [Content Commons 架构](/docs/developer/architecture/commons)页面。

## 小组邮件审批

在服务器管理员批准之前，教会无法发送由教会撰写的电子邮件（小组邮件、表单跟进、工作流邮件以及账号邀请）。这可以防止被机器人注册的教会利用共享的 ChurchApps 发信地址发送垃圾邮件。

1. 打开服务器管理面板中的 **Churches** 标签页。
2. 每个教会都会显示一个 **Group Email**（小组邮件）标签：**Approved**（已批准，绿色）或 **Not approved**（未批准，空心样式）。
3. 点击该标签并确认，即可批准教会，或撤销批准。

教会工作人员可以在 B1 Admin 的发送电子邮件对话框中点击 **Request review**（请求审核）来申请批准。该请求会以电子邮件形式发送到支持邮箱，并列出教会名称、ID、注册日期、所在地以及申请人。每个教会每周可以提交一次请求。每日配额以及退信和投诉自动暂停的规则，请参阅[教会撰写邮件的限制](/docs/developer/architecture/notifications#church-authored-email-limits)。

## 数据库迁移 {#database-migrations}

**Deploy Prod** 工作流会自行应用待执行的迁移。托管的数据库只接受来自 API 网络内部的连接，因此 GitHub 运行器无法访问它们；取而代之的是，在 `serverless deploy` 完成后，该工作流会调用 API 的 `migrate` Lambda（`api-Prod-migrate`），由它以与本标签页相同的运行器执行每个模块的待执行迁移，并且如果任何模块出错或被拒绝，部署即告失败。**Rollback Prod** 只会回滚 Lambda 代码；已应用的迁移会保持已应用状态。**Database Migrations** 标签页用于检查状态、执行部署未涵盖的任何迁移（例如演示环境，其部署不会执行迁移），以及为没有迁移历史的模块建立基线。（自托管的 Docker 安装在 API 容器启动时仍会自动运行迁移。）

该标签页显示当前环境，以及每个模块（membership、attendance、giving 等）一行，包括其状态、已应用和待执行迁移的数量，以及最近一次应用的迁移。

- **Run Pending Migrations**（运行待执行迁移）会按顺序逐个模块应用所有待执行的迁移。遇到第一个失败即停止，并显示每个模块已应用的内容。
- 标记为 **No history**（无历史记录）的模块，其数据库早于迁移追踪功能。这类模块永远不会被自动运行，因为那样会将旧的数据迁移重新应用到实时表上。请改为对该模块点击 **Check Schema**（检查架构）。API 会将每个迁移创建的表、列和索引与实时数据库进行比对，并将每个迁移标记为 **Already applied**（已应用）、**Missing**（缺失）、**Partly applied**（部分应用）或 **Data only**（仅数据）。检查操作不会更改任何内容。
- 在检查结果中，**Record as Already Applied**（记录为已应用）会将检测到的迁移写入迁移历史，但不会实际运行它们（需要确认）。直到最后一个 **Already applied** 迁移为止的所有内容都会被记录，包括该范围内的 **Data only** 迁移；**Missing** 迁移则保持待执行状态，之后可以通过 **Run Pending Migrations** 正常运行。
- **Partly applied**（部分应用）的迁移会阻止记录。如果该迁移可以安全地再次运行（请先阅读其内容），请勾选 **Re-run**（重新运行），使其保持待执行状态，并从头再次运行。

服务器管理面板与 CLI（`yarn migrate:up`）使用相同的 Kysely 迁移器和 `kysely_migration` 表，因此两者对已应用内容的判断始终一致。后端端点包括 `GET /membership/serverHealth/migrations`、`POST /membership/serverHealth/migrations/:module/run`、`GET .../:module/detect` 和 `POST .../:module/baseline`，均仅限 Server.Admin 访问。

## 相关页面

- [身份验证与权限](/docs/developer/api/endpoints/authentication) —— 权限模型与 JWT 身份验证
- [Membership 端点](/docs/developer/api/endpoints/membership) —— 用户与教会管理 API
- [审计日志](/docs/b1-admin/reports/audit-log) —— 查看某教会的活动日志
- [Content Commons 架构](/docs/developer/architecture/commons) —— 共享资源模型与审核生命周期
