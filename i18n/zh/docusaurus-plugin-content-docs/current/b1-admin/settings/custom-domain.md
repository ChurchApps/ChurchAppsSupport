---
title: "自定义域"
---

# 自定义域

<div class="article-intro">

您可以指向您自己的域（例如，**www.yourchurch.org**）到您的 B1 网站，以便访客在您教会的真实网址访问它，而不是默认的 yourchurch.1.church 地址。

</div>

## 第 1 步 —— 首先添加 DNS 记录

在 B1 中添加您的域之前，您需要在您的域名注册商（GoDaddy、Namecheap、Cloudflare 等）将其指向 B1 的服务器。

添加以下记录之一——推荐 CNAME：

| 类型 | 主机 | 值 |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `yourchurch.org` | `3.23.251.61` |

为您的 `www` 地址使用**CNAME**。如果您的注册商不支持根/顶点域（不带 www）上的 CNAME，或者如果您希望根域也起作用，请使用 **A 记录**。

DNS 更改可能需要几分钟到几小时才能生效。

## 第 2 步 —— 在 B1 中添加域

DNS 指向 B1 后：

1. 转到 B1 Admin 中的**设置**。
2. 单击**域**。
3. 在字段中输入您的域并单击**保存**。

B1 自动处理 SSL —— 无需购买证书。

:::warning
如果在您的 DNS 记录就位之前在 B1 中添加域，它将不会保存。始终先设置 DNS。
:::

## 检查其是否工作

保存后，在浏览器中访问您的域。如果它加载您的 B1 网站，您就完成了。如果您看到错误，DNS 可能仍在传播——等待几分钟并重试。

您也可以在 [dnschecker.org](https://dnschecker.org) 检查 DNS 传播——搜索您的域并查找您的 CNAME 或 A 记录显示。
