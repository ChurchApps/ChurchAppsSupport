---
title: "自定义域名"
description: "在 B1 Admin 中通过设置 DNS 记录并在“设置”中添加域名，将你自己的域名（如 www.yourchurch.org）指向你的 B1 网站。"
---

# 自定义域名

<div class="article-intro">

你可以将自己的域名（例如 **`www.yourchurch.org`**）指向你的 B1 网站，让访客通过教会真正的网址访问，而不是默认的 yourchurch.b1.church 地址。

</div>

## 培训视频 {#training-video}

<YouTube id="L5yaDusHts8" title="在 B1 中连接自定义域名" next="在 B1 中设置在线直播" nextUrl="/docs/b1-admin/sermons/live-streaming" />

## 第 1 步 — 先添加 DNS 记录 {#step-1--add-the-dns-record-first}

在 B1 中添加你的域名之前，需要先在域名注册商（GoDaddy、Namecheap、Cloudflare 等）处将其指向 B1 的服务器。

添加以下记录之一 -- 优先使用 CNAME：

| 类型 | 主机 | 值 |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `yourchurch.org` | `3.23.251.61` |

对于你的 `www` 地址，请使用 **CNAME**。如果你的注册商不支持在根域名（不带 www 的裸域）上使用 CNAME，或者你希望根域名也能正常访问，则请使用 **A 记录**。

DNS 更改可能需要几分钟到几小时才会生效。

## 第 2 步 — 在 B1 中添加域名 {#step-2--add-the-domain-in-b1}

当 DNS 已指向 B1 后：

1. 在 B1 Admin 中进入 **Settings**（设置）。
2. 点击左侧列表中的 **Domains**（域名），然后点击 **Domains** 部分中的 **Edit**（编辑）。
3. 在输入框中输入你的域名，然后点击 **Save**（保存）。

你无需先点击 **+** 按钮 -- 只要域名留在输入框中，保存时就会被添加。如果你想在保存前向列表中添加多个域名，请使用 **+**（或按 **Enter** 键）。只需输入域名本身，例如 `www.yourchurch.org` -- 不要包含 `https://` 或页面路径。

如果你的教会拥有多个网站，每个域名还会有一个 **Website**（网站）下拉菜单。保持为 **Main Website**（主网站），或选择该域名应打开的网站。

要移除域名，请点击该行上的删除图标，然后点击 **Save**。

B1 会自动处理 SSL，无需购买证书。

:::warning
即使 DNS 记录尚未设置，B1 也会保存该域名，但在 DNS 指向 B1 之前，该域名无法加载你的网站，B1 也无法为其签发 SSL 证书。请先设置 DNS。已被其他教会使用的域名无法添加。
:::

## 检查是否生效 {#checking-if-its-working}

保存后，在浏览器中访问你的域名。如果能加载你的 B1 网站，就说明设置完成了。如果出现错误，DNS 可能仍在传播中 -- 请等待几分钟后再试。

你也可以在 [dnschecker.org](https://dnschecker.org) 上检查 DNS 传播情况 -- 搜索你的域名，并查看你的 CNAME 或 A 记录是否已显示。
