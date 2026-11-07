---
title: "指南：设置儿童事工签到"
description: "在 B1 Admin 中设置儿童签到：关联家庭、创建按年龄划分的小组、配置聚会，并为 B1 Checkin 自助终端打印名牌。"
---

# 设置儿童事工签到

<div class="article-intro">

本指南将带你完成在教会中启用儿童签到系统所需的全部步骤——从在数据库中录入家庭信息，到配置适龄小组，再到星期日早上打印名牌。完成后，家长即可在签到自助平板上为孩子签到，并领取一个配对的安全标签。

</div>

## 培训视频

<YouTube id="Ep9CBUcJwPI" title="Setting Up Children's Check-In in B1" next="Recording and Tracking Attendance in B1" nextUrl="/docs/b1-admin/attendance/recording-attendance" />

<div class="prereqs">
<h4>开始之前</h4>

- 在 [admin.b1.church](https://admin.b1.church) 创建你的教会账户
- 确保你拥有管理员权限——如有需要，请参阅[角色与权限](../people/roles-permissions.md)
- 可选：如果你是从其他系统迁移，请准备一份家庭信息的 CSV 文件

</div>

## 第一步：将家庭添加到数据库

在签到功能生效之前，系统需要知道你的家庭信息。每个孩子都需要通过"家庭"功能与家长关联。

请按照[添加人员](../people/adding-people.md)指南，至少添加一个家庭。请务必：

- 先添加家长
- 逐一添加每个孩子
- 使用[家庭编辑器](../people/adding-people.md#managing-households)将他们关联到同一个家庭中

:::tip
如果需要添加的家庭超过少数几户，请使用 [CSV 导入](../people/importing-data.md)工具，而不必逐个添加。几分钟内即可导入整个通讯录。
:::

## 第二步：创建儿童小组

小组定义了孩子签到后所进入的班级。通常你会为每个年龄段设置一个小组。

请按照[创建小组](../groups/creating-groups.md)指南创建小组，例如：

- **婴儿班**（0–2 岁）
- **学前班**（3–5 岁）
- **小学班**（6–10 岁）

你可以根据自己的事工结构调整小组名称和年龄范围。

## 第三步：配置校区和礼拜

签到与特定的礼拜时间相关联。你至少需要配置一个校区和一场礼拜。

请按照[考勤设置](../attendance/setup.md)指南完成以下操作：

1. 添加你的校区（例如"主校区"）
2. 添加一场礼拜（例如"星期日早间礼拜"）
3. 设置礼拜时间（例如"9:00 AM"），并可选择设置[签到计划](../attendance/setup.md#setting-a-check-in-schedule)，使签到在每场礼拜前自动开放、礼拜后自动关闭
4. 将孩子们的小组分配到该礼拜中

## 第四步：设置签到应用

现在，在平板上安装签到应用，将所有部分连接起来。

1. 安装 **B1 Checkin 应用**——下载链接请参阅[签到](../attendance/check-in.md)文章
2. 使用你的 B1 Admin 账号登录
3. 选择你的校区和礼拜时间

完整的设置步骤，请参阅[签到](../attendance/check-in.md)文章。

## 第五步：准备硬件

你需要一台平板作为自助机，另外还可以选配兄弟牌标签打印机来打印名牌。

至少需要：

- **一台 Android 或 Amazon Fire 平板**——参见[推荐平板](../attendance/check-in.md#recommended-hardware)
- **一台兄弟牌标签打印机**——推荐 QL-1110NWB，因其支持蓝牙和 WiFi
- **兄弟牌 DK-1201 标签纸**（1-1/7" x 3-1/2"）

:::warning
只有兄弟牌标签打印机才与 B1 Checkin 应用兼容。其他品牌的打印机无法使用。
:::

## 第六步：进行签到测试

在星期日早上之前，先进行一次测试：

1. 在平板上打开 B1 Checkin 应用
2. 选择你的校区和正确的礼拜时间
3. 搜索你刚才添加的其中一个家庭
4. 为一个孩子签到，并确认：
   - 出勤记录会显示在 B1 Admin 的 **Attendance** 中
   - 如果使用了打印机，名牌能够正常打印

:::tip
在正式启用之前，请先对迎宾团队的志愿者进行签到流程培训。通常只需快速讲解五分钟即可。
:::

## 完成！

你的儿童事工签到已经准备就绪。家长可以搜索他们的家庭、选择孩子，然后在自助机上完成签到。出勤会自动记录在 B1 Admin 中。

## 相关文章

- [添加人员](../people/adding-people.md) —— 随着新家庭到访，添加更多家庭信息
- [创建小组](../groups/creating-groups.md) —— 管理儿童小组
- [考勤设置](../attendance/setup.md) —— 配置校区和礼拜
- [签到](../attendance/check-in.md) —— 详细的签到应用设置和硬件说明
- [追踪出勤](../attendance/tracking-attendance.md) —— 查看签到报表
