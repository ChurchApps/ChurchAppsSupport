---
title: "Caddy 自定义域名代理"
description: "构建并运行为 B1.church 网站提供自定义教会域名服务的 Caddy 反向代理，涵盖 TLS 证书、主机映射和已知问题。"
---

# Caddy 自定义域名代理

<div class="article-intro">

教会的自定义域名（`mychurch.org` → 教会的 B1 网站）都在一台运行 Caddy 的 Windows EC2 主机上终止。该主机负责管理 TLS 证书，将每个域名解析到其 `{sub}.b1.church` 站点，并使用重写后的 Host 请求头进行反向代理。它的全部配置只包含两个文件——静态的 `Caddyfile` 和从 Membership API 刷新的 `hosts.map`——因此它在重启后依然能够保持运行，且没有任何运行时状态。本页介绍如何从零开始搭建该主机、如何运维，以及那些会让重建者吃尽苦头的、经过实践检验的注意事项。

</div>

关于请求到达 B1App 后如何解析到某个教会/站点，请参阅[网站路由与多站点](../architecture/websites.md)。

## 组件

| 组成部分 | 说明 |
|---|---|
| EC2 实例 | Windows Server；弹性 IP **`3.23.251.61`**（已写入全球各教会的 DNS 中——IP 是永久的，实例则是可以随时丢弃重建的） |
| `C:\caddy\caddy.exe` | **自定义**构建的 Caddy，包含 `techknowlogick/certmagic-s3` 存储模块——标准版 Caddy 无法读取证书存储 |
| `C:\caddy\Caddyfile` | 完整的代理配置：按需 TLS、主机→上游的 `map`、www→裸域名的重定向，以及 `:80`→https |
| `C:\caddy\hosts.map` | 每个可路由域名一行 `{domain} {sub}.b1.church`，被导入到 Caddyfile 的 `map` 块中 |
| `sync-hostmap.ps1` + `CaddyHostmapSync` 任务 | 计划任务（每 5 分钟运行一次，并在开机时运行，以 SYSTEM 身份执行）从 API 刷新 `hosts.map`，仅在有变化时才对 Caddy 进行优雅重载 |
| Windows 服务 `caddy`（WinSW 包装器） | 运行 `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile`；失败时自动重启。Caddy 不支持 SCM，因此需要包装器 |
| S3 存储桶 `churchapps-caddy-certs` | 共享的证书存储（`region us-east-2`，前缀 `certs`）——证书在实例重建后依然保留 |
| IAM 角色 `CaddyRole` | 授予实例访问 S3 的权限；Caddy 使用 AWS 默认凭证链（配置中不包含任何密钥） |

## 该主机所依赖的两个 API 端点

两者都位于 Membership API 上。`authorize` 是匿名的；自 Api PR #67（2026-08-16）起，`hostmap` 需要 `x-internal-key: <INTERNAL_API_KEY>` 请求头——`sync-hostmap.ps1` 从 `C:\caddy\internal-key.txt` 中读取该值：

| 端点 | 作用 |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Caddy 的**按需 TLS `ask` 闸门**：当该主机（或对于 `www.` 主机，其裸域名）是 `domains` 中的一行时，返回 `200 {"authorized":true}`；否则返回 `404`。这是滥用控制机制——对于此端点拒绝的主机，Caddy 不会签发证书 |
| `GET /membership/domains/hostmap` | 需要 `x-internal-key`（或服务器管理员 JWT）。返回 `text/plain`，已排序、已去重的 `{domain} {sub}.b1.church` 行（感知站点：分配给辅助站点的域名会拨号到该站点的子域名）。这是 `map` 的数据来源 |

## 请求流程

1. 浏览器将 `mychurch.org` 解析为 `3.23.251.61`（裸域名 `A` 记录，或 `CNAME proxy.b1.church`）。
2. Caddy 终止 TLS。如果证书已在 S3 中可用 → 直接提供服务；未知的 SNI → 询问 `authorize`；返回 200 → 通过 Let's Encrypt 按需签发；返回 404 → **握手被拒绝**（不签发证书，也不做任何响应——未知主机会被 TLS 拒绝，而不是返回 HTTP 错误）。
3. `map` 将 Host 解析为 `{sub}.b1.church`；`www.{apex}` 会收到指向裸域名的 302 重定向；已授权但尚未映射的主机（在 ≤5 分钟的同步窗口内的全新域名）会收到干净的 404。
4. `reverse_proxy` 使用 SNI 拨号到 `{sub}.b1.church:443`，并将 Host 重写为上游地址，因此 Vercel 的边缘层会提供 B1App 站点服务。
   Caddy 还会将访问者的原始域名作为 `X-Church-Host` 发送（Vercel 会用重写后的 Host 覆盖 `X-Forwarded-Host`）。B1App 中间件仅在 `/domains/public/lookup/{host}` 将其映射到与请求主机相同的 `{sub}` 时才接受它，然后将其暴露为 `x-public-host`，用于规范 `Link` 请求头、`robots.txt` 和 `sitemap.xml`；客户端发送的 `x-public-host` 总是会被剥离。Schema.org 的 `ChurchJsonLd` 仍使用 `b1.church` 网址（在该处读取请求头会使页面变为动态渲染）。
5. 80 端口负责通过 ACME HTTP-01 挑战，并将其余所有请求以 308 重定向到 https。

新域名的传播：在 B1Admin 中保存的域名会在约 5 分钟内变为可路由（同步任务的作用）；其证书会在首次 HTTPS 访问时签发。

## 从零开始搭建主机

以下内容浓缩自经过实践检验的流程（包含可直接复制粘贴命令的完整分步说明位于运维工作区中，而非本仓库）。请先完成前提条件——缺少它们，构建就无法完成：

1. **IAM**：将 `CaddyRole`（对证书存储桶的 S3 访问权限）附加到实例上。通过主机上的 IMDSv2 进行验证——请注意，裸的 IMDS GET 返回 401 仅表示强制使用了 IMDSv2，并不代表"没有角色"。
2. **API 健康检查**：在执行其他任何操作之前，`authorize` 对于伪造的域名必须返回 404，且 `hostmap`（带有 `x-internal-key` 请求头）必须返回 200。

然后：

3. **二进制文件**：从 Caddy 的构建服务下载自定义构建版本——`https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3`（约 57 MB，标准版约 45 MB；撰写本文时为 v2.11.4）。模块的选择至关重要：`techknowlogick/certmagic-s3` 使用 `bucket`/`region`/`prefix` 键，与现有的证书布局相匹配；而 `ss098` 分支使用的是 `host`/`endpoint`，将**无法找到**现有证书。
4. **文件**：将 `Caddyfile`、`sync-hostmap.ps1` 和 `internal-key.txt`（生产环境的 `INTERNAL_API_KEY`，一行）放入 `C:\caddy\`；使用 `sync-hostmap.ps1 -NoReload` 对映射文件进行一次初始化填充。
5. **首次启动前的检查门槛**：`caddy list-modules` 必须显示 s3 存储模块；`caddy adapt` 必须在其存储块中输出 `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"`；`caddy validate` 必须通过。
6. **服务**：通过 WinSW 安装（服务 ID 为 `caddy`，失败时自动重启，并带有滚动日志）。以 LocalSystem 身份运行，这样才能访问 IMDS 以获取角色凭证。
7. **同步任务**：注册 `CaddyHostmapSync`（SYSTEM 身份，每 5 分钟运行一次，并在启动时运行，执行时间限制为 4 分钟）。
8. **切换前的验证**：使用 `curl --resolve` 将域名强制解析到 `127.0.0.1`（在弹性 IP 迁移之前，该主机没有真实流量）：现有域名必须能够使用携带过来的有效证书正常提供服务；`www.` 必须返回 302；未知主机必须被 TLS 拒绝；并且 `Restart-Service caddy` 之后必须恢复服务，**无需手动重新预热**——这一重启测试正是静态设计的全部意义所在。
9. **正式上线**：将弹性 IP `3.23.251.61` 重新关联到新实例。教会的 DNS 永远不需要更改。

## 经过实践检验的注意事项（血泪教训，切勿回退）

| 注意事项 | 症状 | 解决方法 |
|---|---|---|
| reverse_proxy 传输中的 `tls_server_name {vars.upstream}` | 每个被代理的域名都返回 502：映射占位符在 **TLS 拨号时解析为空**（"either ServerName or InsecureSkipVerify must be specified"） | 使用传输原生的占位符：`tls_server_name {http.reverse_proxy.upstream.host}` |
| `hosts.map` 中的重复键或垃圾行 | Caddy 的 `map` 处理器在遇到重复的输入键时会**直接报错**——一行错误数据就可能导致整个配置瘫痪 | 同步脚本会规范化空白字符，丢弃格式错误的行（仅当超过 20% 的行有问题时才整体拒绝），按先到先得的原则去重，并写入**无 BOM** 的 UTF-8（BOM 会破坏第一个映射键）。API 也会在源头过滤掉空的或包含空格的域名行 |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | 任务注册会**静默失败**（XML 超出范围，且为非终止性错误） | 将重复设置构建为 `MSFT_TaskRepetitionPattern` CIM 实例，其中 `Interval = "PT5M"` 且不设置持续时间；并添加 4 分钟的 `ExecutionTimeLimit`（首次 SYSTEM 运行可能会因冷启动的 TLS/CRL 查询而挂起） |

:::warning
管理 API 仅绑定到 `localhost:2019`。旧版运行时模式曾将其对外暴露，以便 Membership API 推送路由配置；而静态设计无需远程推送，较小的暴露面是刻意为之。由同步脚本在本地运行的 `caddy reload`，是管理 API 唯一的使用者。
:::

:::info 旧版运行时推送
API 中的 `CaddyHelper`（以及 `/membership/domains/caddy` + `/caddy/init` 端点）仍然存在，作为回退到旧版运行时配置模式的回滚路径。待静态主机稳定运行数周后，它们将被删除——届时，`authorize` 和 `hostmap` 将是唯一的集成点。
:::

## 运维

- **日志**：`C:\caddy\` 中的 WinSW 滚动日志（服务的标准输出/错误——反向代理错误会记录在 `caddy-service.err.log` 中）；同步历史记录位于 `C:\caddy\sync-hostmap.log`。
- **强制刷新映射**：`Start-ScheduledTask -TaskName CaddyHostmapSync`。
- **配置变更**：编辑 `C:\caddy\Caddyfile`，然后执行 `caddy validate` + `caddy reload`（或 `Restart-Service caddy`——按设计，重启是安全的）。
- **大量删除域名**会按设计触发同步脚本的收缩保护；请将旧的 `hosts.map` 移开，然后重新运行任务，以接受有意的大幅收缩。
- **教会的 DNS 说明永久不变**：裸域名 `A 3.23.251.61` 或 `CNAME proxy.b1.church`。

## 相关页面

- [网站路由与多站点](../architecture/websites.md) —— 被代理的请求如何在 B1App 中解析到某个教会/站点
- [API 部署](./apis.md) —— 提供 `authorize`/`hostmap` 的 Membership API 部署
