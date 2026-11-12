---
title: "访客登记"
description: "通过 B1 Checkin 的二维码表单，为首次到访的您和家人登记为访客，以便志愿者在您到达时为您办理签到。"
---

# 访客登记

<div class="article-intro">

如果您是首次到访某间教会，可以使用访客登记页面将自己和家人登记为访客。这会在教会系统中创建一份记录，以便志愿者在您到达时为您办理签到。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 您的教会必须已开启二维码访客登记功能。如果未开启，页面会显示 "Guest registration is not enabled for this church."（此教会未开启访客登记功能。）
- 扫描签到登记机上显示的二维码，或在登记机上点击 **Register here**（在此登记），或从教会志愿者处获取链接

</div>

## 访客登记的运作方式 {#how-guest-registration-works}

访客登记专为尚无账户的访客而设计。在教会的签到登记机上，点击 **Register as guest**（注册为来宾），即可显示一个二维码，链接到登记页面。您也可以从志愿者或迎宾人员处获取链接，或在传单或教会网站上找到它。

身边没有手机？在登记机的同一二维码窗口中，点击 **Register here**（在此登记），即可直接在登记机上填写表格。有关其在登记机上的使用方式，请参阅[注册为来宾](../../b1-checkin/check-in/looking-up-members.md#registering-as-a-guest)。

页面标题为 **Guest Registration**（访客登记）。如果教会添加了页眉图片，它会显示在页面顶部；否则您会看到一个小图标。

## 登记您的家庭 {#registering-your-family}

1. 在签到登记机上**扫描二维码**，或在手机上打开访客登记链接。（如果您在登记机上点击了 **Register here**，表格已经打开。）
2. 填写 **Primary Contact**（主要联系人）卡片。**First Name**（名字）和 **Last Name**（姓氏）始终为必填项。根据教会的要求，您可能还会看到：
   - **Title**（称谓）（例如 Mr（先生）、Mrs（女士）、Dr（博士）或 Pastor（牧师）），位于姓名之前
   - **Email**（电子邮件）和 **Phone**（电话）
   - **Marital Status**（婚姻状况）
   - **Home Address**（家庭住址）-- **Street Address**（街道地址）、**Address Line 2**（地址第二行）、**City**（城市）、**State**（州/省）和 **Zip**（邮编）。这是全家共用的地址。
3. 表格会以第二张卡片 **Family Member 2**（家庭成员 2）开始。请输入其名字和姓氏；如果您是独自登记，请点击卡片角落的 **X** 将其移除。
4. 如需添加更多人员，请点击 **Add Family Member**（添加家庭成员）。新卡片会自动填入主要联系人的姓氏。您一次最多可以登记 10 人。
5. 如果教会有相关要求，每位人员的卡片上还可能包含 **Title**（称谓）、**Phone**（电话）、**Birth Date**（出生日期）、**Gender**（性别）和 **Grade**（年级）。主要联系人之后的每张卡片还可能要求填写 **Household Role**（家庭角色）-- **Spouse**（配偶）、**Child**（子女）或 **Other**（其他），以便教会了解每位人员与主要联系人的关系。
6. 如果教会在家庭成员下方设有 **Comments**（备注）框，您可以在其中分享任何希望教会了解的内容（最多 1,000 个字符）。
7. 点击 **Register**（登记）提交。

带有星号（`*`）的字段为必填项。每张卡片都需要填写名字和姓氏 -- 如果缺少任何一项，表格会显示 "First name and last name are required for each member."（每位成员都必须填写名字和姓氏。）如果其他必填字段留空，则会显示 "Please fill in every required field."（请填写所有必填字段。）在您填写完成之前，内容不会提交。

## 登记完成之后 {#after-registering}

提交表格后，会出现确认页面，显示消息："Registration Complete -- You're all set! A staff member will check you in shortly."（登记完成 -- 一切就绪！工作人员将很快为您办理签到。）

您的登记会在教会数据库中创建以下记录：

- 以主要联系人的姓氏创建一个**家庭**，主要联系人为户主。
- 为每位家庭成员创建**人员记录**，会员身份状态为 "Visitor"（访客）。每位家庭成员会获得您所选的家庭角色；若未要求填写，则为 **Other**（其他）。
- 您输入的任何备注都会作为备注保存在主要联系人的记录上，供教会工作人员查阅。
- 如果教会为新访客选定了小组，您的家庭会被加入该小组。如果您在该小组的某场预定礼拜期间登记，教会也可能会自动为您记录出勤。
- 教会志愿者或管理员随后即可使用 [B1 Checkin](../../b1-checkin/check-in/looking-up-members.md) 登记机为您的家庭办理签到。

:::info
如果您以相同的名字并使用相同的电子邮件或电话号码再次登记，教会的记录会识别出您，并沿用您现有的个人资料，而不会新增重复记录。其他人员则会作为新记录添加。如果您已经登记过，也可以直接在登记机上搜索您的姓名或电话号码。
:::

:::tip
如果表格要求填写您的电子邮件地址，提供该地址有助于教会在您到访后与您联系跟进。
:::

## 相关文章 {#related-articles}

- [自助签到](./self-checkin.md) -- 登记后为自己办理签到
- [添加访客（登记机）](../../b1-checkin/check-in/adding-guests.md) -- 志愿者如何在登记机上添加访客
- [签到](../../b1-admin/attendance/check-in.md#guest-registration-via-qr-code) -- 教会管理员如何设置二维码访客登记
