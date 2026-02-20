---
title: "在线奉献设置"
---

# 在线奉献设置

<div class="article-intro">

B1 Admin 集成了 **Stripe** 和 **PayPal**，让您的会员可以通过 B1.church 网站在线奉献。配置完成后，在线捐赠会自动出现在您的捐赠记录中，与手动输入的奉献一起，让所有数据集中在一个系统中。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 设置您的[捐赠基金](funds.md)，以便捐赠者可以指定他们的奉献用途
- 在 [stripe.com](https://stripe.com) 创建 Stripe 帐户并激活它（退出测试模式）
- 准备好您的 B1 Admin 登录凭据

</div>

## 设置 Stripe

1. 如果您还没有帐户，请在 [stripe.com](https://stripe.com) 创建一个。确保**激活您的帐户**并退出测试模式。
2. 在 Stripe 中，转到 **Developers > API Keys**。
3. 复制您的 **Publishable Key**（可发布密钥）。
4. 登录 [B1 Admin](https://admin.b1.church/)。
5. 点击顶部导航中的 **Church**，然后点击 **Edit Church Settings**。
6. 点击 **Church Settings** 旁边的编辑图标。
7. 向下滚动到 **Giving** 部分。
8. 将 **Provider** 设置为 **Stripe**。
9. 将 Publishable Key 粘贴到 **Public Key** 字段。
10. 返回 Stripe 并显示您的 **Secret Key**（密钥只能查看一次，请保存备份）。
11. 将 Secret Key 粘贴到 **Secret Key** 字段并点击 **Save**。

:::warning
您的 Stripe Secret Key 只显示一次。在离开 Stripe 仪表板之前，将其复制到安全位置。如果丢失，您需要生成新密钥。
:::

## 在 B1.church 网站上添加捐赠页面

1. 转到 [b1.church](https://b1.church/) 并登录。
2. 点击**设置**图标。
3. 点击 **Add Tab**。
4. 选择 **Donation** 作为类型。
5. 为标签页输入名称（例如，"奉献"）并点击 **Save**。
6. 可选地更改标签页图标——在图标搜索中输入"Giv"以查找与奉献相关的图标。

您的捐赠页面现已上线。会员可以在 `您的子域名.b1.church/donate` 访问它。

## 分享您的奉献链接

要找到您的奉献 URL，请转到 **B1 Admin** 并点击**设置**图标查看您的子域名。您的捐赠链接格式如下：

`https://您的子域名.b1.church/donate`

在您的网站、电子邮件或公告中分享此链接，让会员知道在哪里可以在线奉献。

## 捐赠通知

每收到一笔捐赠，Stripe 都会发送电子邮件通知。要更改通知电子邮件地址，请转到 Stripe 仪表板，点击右上角的个人资料，选择 **Profile**，然后更新您的电子邮件地址。

## 手续费选项

您可以配置奉献页面，让捐赠者可以选择承担手续费，使教会收到捐赠全额。此设置在 B1 Admin 的教会设置中管理。

:::tip
设置完成后，进行一次小额测试捐赠，确认一切正常后再向会众宣布在线奉献功能。
:::

## 后续步骤

- 如果在线交易未自动同步，使用 [Stripe 导入](stripe-import.md)将在线交易导入 B1 Admin
- 查看[捐赠报告](donation-reports.md)以验证在线捐赠是否正确显示
- 生成包含在线和线下捐赠的[奉献报表](giving-statements.md)
