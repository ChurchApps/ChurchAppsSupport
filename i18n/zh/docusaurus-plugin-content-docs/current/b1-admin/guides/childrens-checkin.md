---
title: "指南：设置儿童事工签到"
description: "在 B1 Admin 中设置儿童签到：关联家庭、创建按年龄划分的小组、配置聚会，并为 B1 Checkin 签到亭打印姓名牌。"
---

# 设置儿童事工签到

<div class="article-intro">

本指南将引导你完成在教会运行儿童签到系统所需的全部步骤——从在数据库中录入家庭，到配置适合各年龄段的小组，再到在主日早上打印姓名牌。完成后，家长即可在签到亭平板电脑上为孩子签到，并获得配对的安全牌。

</div>

## 培训视频 {#training-video}

<YouTube id="Ep9CBUcJwPI" title="在 B1 中设置儿童签到" next="在 B1 中记录和跟踪考勤" nextUrl="/docs/b1-admin/attendance/recording-attendance" />

<div class="prereqs">
<h4>开始之前</h4>

- 在 [admin.b1.church](https://admin.b1.church) 创建你的教会账户
- 确保你拥有管理员权限——如有需要，请参见[角色与权限](../people/roles-permissions.md)
- 可选：如果你是从其他系统迁移，请准备好家庭的 CSV 文件

</div>

## 第 1 步：将家庭添加到数据库 {#step-1-add-families-to-your-database}

在签到功能运行之前，系统需要了解你的家庭情况。每个孩子都需要通过家庭功能关联到其家长。

请按照[添加人员](../people/adding-people.md)指南，至少添加一个家庭。请务必：

- 先添加家长
- 再添加每个孩子
- 使用[家庭编辑器](../people/adding-people.md#managing-households)将他们关联到同一个家庭

:::tip
如果你需要添加的家庭超过少数几个，请使用 [CSV 导入](../people/importing-data.md)工具，而不必逐一添加。几分钟内即可导入整个名录。
:::

## 第 2 步：创建儿童小组 {#step-2-create-childrens-groups}

小组定义了孩子签到的班级。通常每个年龄段设置一个小组。

请按照[创建小组](../groups/creating-groups.md)指南创建以下类型的小组：

- **托儿班**（0–2 岁）
- **学前班**（3–5 岁）
- **小学班**（6–10 岁）

你可以根据自己的事工结构调整名称和年龄范围。然后打开每个小组的设置（在小组页面上点击 **Edit**），并：

- 将 **Track Attendance** 设为 **Yes**，使该小组可以被签到
- 开启 **Print Nametag**（打印姓名牌）（如果你打印接送牌，还需开启 **Parent Pickup**（家长接送））
- 可选：设置 **Age & Grade**（年龄与年级）限制，以便签到亭推荐合适的教室——参见[签到安全](../attendance/checkin-safety.md)

## 第 3 步：配置堂区和聚会 {#step-3-configure-campuses-and-services}

签到与特定的聚会时间相关联。你至少需要配置一个堂区和一场聚会。

请按照[考勤设置](../attendance/setup.md)指南进行以下操作：

1. 进入 **People > Attendance** 并点击 **Setup**
2. 添加你的堂区（例如"主堂区"）
3. 添加一场聚会（例如"主日早上"）
4. 添加聚会时间（例如"上午 9:00"），并可选择设置[签到时间表](../attendance/setup.md#setting-a-check-in-schedule)，使签到在每场聚会前自动开放、聚会后自动关闭
5. 将每个儿童小组关联到聚会时间：打开该小组，点击 **Edit**，在 **Add Service Time**（添加聚会时间）中选择时间，然后点击加号按钮

## 第 4 步：设置签到应用 {#step-4-set-up-the-check-in-app}

现在通过在平板电脑上安装签到应用，将所有内容连接起来。

1. 安装 **B1 Checkin 应用**——下载链接请参见[签到](../attendance/check-in.md)文章
2. 使用具有 **Checkin** 考勤权限（或 **Edit Attendance**）的账户登录——参见[签到亭账户](../settings/roles-permissions.md#check-in-kiosk-accounts)
3. 选择你的堂区和聚会时间

完整的详细设置步骤，请参见[签到](../attendance/check-in.md)文章。

## 第 5 步：准备硬件 {#step-5-get-your-hardware}

你需要一台作为签到亭的平板电脑，以及可选的 Brother 标签打印机用于打印姓名牌。

至少需要：
- **一台 iPad、Android 或 Amazon Fire 平板**——参见[推荐平板](../attendance/check-in.md#recommended-hardware)
- **一台 Brother 标签打印机**——推荐 QL-1110NWB，它支持蓝牙和 WiFi
- **Brother DK-1201 标签纸**（1-1/7" x 3-1/2"）

:::warning
只有 Brother 标签打印机与 B1 Checkin 应用兼容。其他品牌的打印机无法使用。
:::

## 第 6 步：进行测试签到 {#step-6-run-a-test-check-in}

在主日早上之前，先进行一次测试：

1. 在平板电脑上打开 B1 Checkin 应用
2. 选择你的堂区和正确的聚会时间
3. 搜索你添加的其中一个家庭
4. 为一名孩子签到，并确认：
   - 考勤记录会出现在 B1 Admin 的 **People > Attendance** 中
   - 如果使用了打印机，姓名牌能正常打印

:::tip
在正式启用之前，请先对迎宾团队的志愿者进行签到流程培训。通常只需一次简短的 5 分钟讲解即可。
:::

## 完成！ {#youre-done}

你的儿童事工签到已准备就绪。家长可以搜索其家庭、选择孩子，并在签到亭为孩子签到。考勤会自动记录在 B1 Admin 中。

## 相关文章 {#related-articles}

- [添加人员](../people/adding-people.md)——在家庭来访时继续添加
- [创建小组](../groups/creating-groups.md)——管理你的儿童小组
- [考勤设置](../attendance/setup.md)——配置堂区和聚会
- [签到](../attendance/check-in.md)——签到应用的详细设置和硬件
- [跟踪考勤](../attendance/tracking-attendance.md)——查看签到报表
