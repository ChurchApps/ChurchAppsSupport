---
title: "在 Railway 上自托管"
---

# 在 Railway 上自托管

<div class="article-intro">

ChurchApps 发布了一个一键式 Railway 模板,为您的教会提供私有的 B1 Admin、B1 成员门户、API 和 MySQL 数据库实例。本指南可让您在约 15 分钟内上线。

</div>

## 快速入门

[![在 Railway 上部署](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. 点击上面的部署按钮
2. 登录 Railway 并添加付款方式
3. 点击部署(使用默认值)
4. 等待 5-10 分钟
5. 打开 B1Admin URL 并注册(第一个帐户自动成为服务器管理员)
6. 按照提示创建您的教会

:::tip
部署目前处于 beta 阶段。如有问题,请在 GitHub 上打开 issue。
:::

## 部署内容

四个服务:MySQL、Api、B1Admin、B1App。所有数据库架构在首次启动时自动创建。

## 首次配置

### 1. 电子邮件(强烈推荐)

在 Api 服务的变量中添加:
- MAIL_SYSTEM=SMTP
- SMTP_HOST、SMTP_USER、SMTP_PASS
- SUPPORT_EMAIL

推荐提供商:Resend(每天 100 封免费)、Gmail(每天 500 封)、AWS SES。

### 2. 自定义域

为 B1Admin 和 B1App 添加自定义域。在您的 DNS 中添加 CNAME 记录。

### 3. 多站点

一个实例可以托管多个教会。每个教会都有唯一的子域。

### 4. 在线奉献

在 B1 Admin 的设置中配置 Stripe 或 PayPal,而不是环境变量。

### 5. 文件存储

默认 1 GB 卷。可以调整大小或切换到 S3。

### 6. 可选集成

API 密钥:OpenAI、YouTube、Pexels、Vimeo、API Bible、YouVersion、Web Push VAPID 密钥等。

## 更新

服务链接到 GitHub 存储库。推送到 main 会触发自动部署。

## 成本

小型教会约每月 $15-25。

## 故障排除

常见问题及解决方案列表(构建失败、健康检查、电子邮件问题等)。

## 相关文章

- 初始设置、网站配置、奉献设置、本地 API 设置、AWS 部署
