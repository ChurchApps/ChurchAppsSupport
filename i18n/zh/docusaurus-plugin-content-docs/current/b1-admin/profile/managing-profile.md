---
title: "管理你的个人资料"
description: "在 B1 Admin 中更新你的 ChurchApps 账户：编辑姓名、电子邮件与密码，开启双重验证登录，选择主题，或删除你的账户。"
---

# 管理你的个人资料

<div class="article-intro">

个人资料页面让你编辑个人账户设置。你的个人资料会在所有 ChurchApps 产品中共享，因此你在此所做的任何更改，都会反映在你使用 ChurchApps 的所有地方。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 你必须已登录你的 ChurchApps 账户
- 如果你打算更新电子邮件地址或密码，请先备妥新的电子邮件地址或密码

</div>

## 打开你的个人资料 {#opening-your-profile}

点击 B1 Admin 右上角的个人头像，然后选择 **Edit Profile**。个人资料页面左侧会显示你的姓名与电子邮件，右侧则为 **Linked Accounts**、**Two-Factor Sign-In** 与 **Account Deletion** 区块。

## 个人资料信息 {#profile-information}

个人资料页面左侧会显示你的姓名与电子邮件地址，其下方有 **Edit** 按钮。点击 **Edit** 即可打开 **Edit Account** 表单，其中包含你的基本账户详细信息：

1. **Email**——用于登录并接收通知的电子邮件地址。
2. **First Name** 与 **Last Name**——你在 ChurchApps 中显示的名称。
3. **Current password**、**New password** 与 **Verify password**——只有在要更改密码时才需填写；若要保留目前的密码，请将这些栏位留空。

若要更新你的信息，请编辑栏位，然后点击 **Save Changes** 按钮。**Changes saved.** 讯息会确认更新已完成。点击 **Cancel**（或显示你姓名的 **Back to** 链接），即可在不储存的情况下返回个人资料。点击密码栏位中的眼睛图标，即可显示或隐藏你输入的内容。

## 更改密码 {#changing-your-password}

1. 在个人资料页面中，点击 **Edit**。
2. 输入你的 **Current password**。
3. 在 **New password** 栏位中输入新密码。
4. 在 **Verify password** 栏位中再次输入。
5. 点击 **Save Changes**。

:::info
密码长度至少须为 8 个字符。请确保密码与确认栏位的内容完全一致。更改密码前必须先确认你目前的密码——如果你不记得，请改用登录页面上的 **Forgot Password** 链接。
:::

## 已连接的账户 {#linked-accounts}

**Linked Accounts** 区块会显示你可以连接到 ChurchApps 账户的外部服务。目前包括 **PraiseCharts**，可用于在 Serving 中为[诗歌](../serving/songs.md)查找歌曲，并下载乐谱与谱表。该区块会显示 **Linked**（已连接）或 **Not linked**（未连接）：

- 点击 **Link**，并在开启的视窗中登录 PraiseCharts，即可连接你的账户。
- 点击 **Sign Up** 可先建立 PraiseCharts 账户。
- 点击 **Unlink** 即可断开连接。

## 双重验证登录 {#two-factor-sign-in}

双重验证登录会在登录时增加一个步骤：输入密码（或使用 Google、Microsoft 或电子邮件登录链接）之后，你还需输入手机上身份验证应用程序（例如 Google Authenticator、Microsoft Authenticator、1Password 或 Authy）所显示的 6 位数验证码。此功能为选用，预设关闭。一旦开启，它便适用于所有使用你账户登录的 ChurchApps 服务——包括 B1 Admin、你教会的 B1.church 网站与应用程序、B1 Church Checkin、Lessons.church、FreePlay 等。

### 开启方法 {#turning-it-on}

1. 在个人资料页面中，找到 **Two-Factor Sign-In** 区块，然后点击 **Turn on**。
2. 使用身份验证应用程序扫描 QR 码。如果无法扫描，请将 **Can't scan? Enter this key:** 下方显示的密钥手动输入到应用程序中。
3. 输入应用程序显示的 **6 位数验证码**，然后点击 **Verify**。
4. B1 Admin 会显示十组**备用代码**。若你遗失手机，每组代码都可让你登录一次。请点击 **Copy** 或将它们抄写下来，妥善保存，然后点击 **I saved them**。

:::warning
备用代码只会显示一次。如果你遗失手机，而且已经没有任何备用代码，ChurchApps 服务器管理员必须在确认你的身份之后，才能为你关闭双重验证登录。
:::

开启双重验证登录后，该区块会显示 **On**，并显示你剩余的备用代码数量。

### 使用验证码登录 {#signing-in-with-a-code}

输入密码之后，登录画面会要求输入验证码。请输入身份验证应用程序中的 6 位数验证码，或一组备用代码，然后提交。每组备用代码只能使用一次。如果验证码有误，你会看到"That code didn't work. Please try again."（验证码不正确，请再试一次）。如果错误的验证码输入次数过多，你账户的登录会暂停一段时间。

在你已经登录过的设备上保持登录状态时，不会再次要求输入验证码；只有在重新登录时才会出现。

### 关闭方法 {#turning-it-off}

1. 在 **Two-Factor Sign-In** 区块中，点击 **Turn off**。
2. 输入身份验证应用程序中目前的验证码，或一组备用代码。
3. 点击 **Verify**。

:::info
无法在示范账户上设置双重验证登录，因此该区块在示范账户中会被隐藏。
:::

## 主题偏好设置 {#theme-preferences}

B1 Admin 让你可以选择配色主题，以及浅色或深色的显示模式：

1. 点击 B1 Admin 右上角的个人头像，打开用户菜单。
2. 在 **Theme Preferences** 下，选择一个主题：
   - **Default**——目前的 B1 Admin 外观：在干净的画布上使用带边框的面板。新用户在选择其他主题之前，都会看到此主题。
   - **Classic**——较早版本的 B1 Admin 外观，包括彩色的页面横幅、带阴影的卡片，以及灰色的背景。如果你在新外观推出之前已在此设备上使用过 B1 Admin，且从未选择过主题，你会继续使用 Classic。
   - **Custom**——以你教会自己的颜色建立的 Default 外观。它会使用 **Mobile > App Theme** 中的浅色模式主色；若未设置应用程序颜色，则使用你网站的主色，使 B1 Admin 与会员应用程序保持一致。
3. 在主题下方，选择 **Light Mode** 或 **Dark Mode**。
4. 介面会立即更新，以反映你的选择。

你的选择会记录在该设备与浏览器上。

## 删除账户 {#account-deletion}

在个人资料页面的 **Account Deletion** 区块中，你可以找到删除账户的选项。

- 如果你的教会**尚未**设置通讯录审批小组，该区块会显示警告"Careful, these actions are permanent"（请小心，这些操作是永久性的）。点击 **Delete my account** 并确认后，你的账户及相关资料会立即被移除，并且你会被登出。此操作无法复原。
- 如果你的教会**已**设置通讯录审批小组，该区块会说明你的教会会审查删除请求。点击 **Delete my account**，然后点击 **Send request**，请求便会改为送交该小组审查。待处理期间按钮会停用；待教会批准或拒绝后，你会收到通知。关于后续流程，请参阅[审查账户删除请求](./account-deletion.md)。

:::warning
无论是立即删除还是经教会批准的删除，账户删除都是永久性的，且无法撤销。
:::

:::info
如果你是教会唯一的 **Domain Admin**，B1 不会删除你的账户，而是会显示提示："You are the only Domain Admin for *church*. Make someone else a Domain Admin before deleting your account."（意即：你是 *church* 唯一的 Domain Admin，请先将他人设为 Domain Admin，再删除你的账户）。请先将其他用户加入 **Domain Admins**。有关管理员角色的详细信息，请参阅[角色与权限](../settings/roles-permissions.md)。
:::

:::info
示范模式下无法编辑个人资料。如果你使用的是示范账户，将无法更改个人资料设置。
:::

## 后续步骤 {#next-steps}

- [管理设备](./devices.md)——检视并管理你已连接的 ChurchAppsPlayer 与 FreePlay 屏幕
