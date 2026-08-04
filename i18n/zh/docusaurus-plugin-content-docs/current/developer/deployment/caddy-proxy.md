---
title: "Caddy 自定义域名代理"
---

# Caddy 自定义域名代理

<div class="article-intro">

自定义教会域名（`mychurch.org` → 该教会的 B1 网站）会终止于一台运行 Caddy 的 Windows EC2 主机。这台主机负责持有 TLS 证书,将每个域名解析到其对应的 `{sub}.b1.church` 站点,并以改写 Host 请求头的方式进行反向代理。它的全部配置只有两个文件——一份静态的 `Caddyfile` 和一份从 Membership API 刷新而来的 `hosts.map`——因此它能在重启后依然保持完好,不存在任何运行时状态。本页面介绍如何从零搭建这台主机、它是如何运作的,以及那些经过实战检验、任何重建它的人都必须提防的坑。

</div>

关于一个请求到达 B1App 后如何解析到某个教会/站点,请参见[网站路由与多站点](../architecture/websites)。

## 组成部分

| 部分 | 说明 |
|---|---|
| EC2 实例 | Windows Server;弹性 IP **`3.23.251.61`**（已固化在全球各地教会的 DNS 配置中——这个 IP 是永久的,实例本身则是可替换的） |
| `C:\caddy\caddy.exe` | **定制**的 Caddy 构建版本,带有 `techknowlogick/certmagic-s3` 存储模块——原生 Caddy 无法读取该证书存储 |
| `C:\caddy\Caddyfile` | 完整的代理配置：按需 TLS、主机名 → 上游的 `map`、www → 裸域名重定向、`:80` → https |
| `C:\caddy\hosts.map` | 每条可路由域名各占一行,格式为 `{domain} {sub}.b1.church`,会被导入 Caddyfile 的 `map` 区块中 |
| `sync-hostmap.ps1` + `CaddyHostmapSync` 任务 | 计划任务（每 5 分钟运行一次,并在启动时以 SYSTEM 身份运行）从 API 刷新 `hosts.map`,并仅在发生变化时优雅地重新加载 Caddy |
| Windows 服务 `caddy`（WinSW 封装） | 运行 `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile`;失败时自动重启。Caddy 本身不感知 SCM,因此需要一个封装器 |
| S3 存储桶 `churchapps-caddy-certs` | 共享证书存储（区域 `us-east-2`,前缀 `certs`）——证书能在实例重建后依然存活 |
| IAM 角色 `CaddyRole` | 授予该实例 S3 访问权限;Caddy 使用 AWS 默认凭证链（配置中不含任何密钥） |

## 该主机依赖的两个 API 端点

两者均为匿名端点,位于 Membership API 上：

| 端点 | 作用 |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Caddy 的**按需 TLS `ask` 网关**：当该主机名（或者对于 `www.` 主机名,其裸域名）是 `domains` 表中的一条记录时返回 `200 {"authorized":true}`;否则返回 `404`。这是滥用防护机制——Caddy 不会为一个被此端点拒绝的主机名签发证书 |
| `GET /membership/domains/hostmap` | `text/plain`,已排序、已去重的 `{domain} {sub}.b1.church` 行（具备站点感知能力：分配给某个次要站点的域名会拨号到该站点自己的子域名）。是 `map` 的数据来源 |

## 请求流程

1. 浏览器将 `mychurch.org` 解析到 `3.23.251.61`（根域名 `A` 记录,或 `CNAME proxy.b1.church`）。
2. Caddy 终止 TLS。如果 S3 中已有证书,直接提供服务;如果 SNI 未知,则会去询问 `authorize`；返回 200 则按需通过 Let's Encrypt 签发证书;返回 404 则**握手直接被拒绝**（没有证书,也没有响应——一个未知主机名会得到 TLS 层面的拒绝,而不是一个 HTTP 错误）。
3. `map` 会将 Host 解析为 `{sub}.b1.church`;`www.{apex}` 会得到一个指向裸域名的 302;一个已授权但尚未纳入映射的主机名（同步窗口期内——不超过 5 分钟——新增的域名)会得到一个干净的 404。
4. `reverse_proxy` 拨号到 `{sub}.b1.church:443`,并改写 SNI 和 Host 为上游地址,由 Vercel 的边缘节点提供 B1App 站点服务。
5. 80 端口负责放行 ACME HTTP-01 挑战请求,并将其余所有请求以 308 重定向到 https。

新域名生效速度：在 B1Admin 中保存的域名约在 5 分钟内（取决于同步任务)变为可路由;其证书会在首次 HTTPS 请求命中时签发。

## 从零搭建这台主机

以下是经过实战检验流程的精简版本（完整的、可直接复制粘贴命令的分步指南保存在运维工作区中,不在本代码仓库中)。先决条件排在最前——没有它们,搭建工作寸步难行：

1. **IAM**：将 `CaddyRole`（对证书存储桶的 S3 访问权限）附加到该实例上。通过主机上的 IMDSv2 进行验证——注意如果 IMDS 的裸 GET 请求返回 401,只是说明 IMDSv2 被强制启用,并不代表“没有该角色”。
2. **API 健康检查**：在做其他任何事之前,`authorize` 端点对一个虚构域名必须返回 404,`hostmap` 端点必须返回 200。

之后：

3. **可执行文件**：从 Caddy 的构建服务下载一份定制构建——`https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3`（约 57 MB,相较原生版本约 45 MB;撰写本文时版本为 v2.11.4）。模块选择很关键：`techknowlogick/certmagic-s3` 使用与现有证书存储布局相匹配的 `bucket`/`region`/`prefix` 键名;`ss098` 这个分支则使用 `host`/`endpoint`,**无法**找到现有的证书。
4. **文件**：把 `Caddyfile` + `sync-hostmap.ps1` 放入 `C:\caddy\`;用 `sync-hostmap.ps1 -NoReload` 先手动填充一次映射文件。
5. **首次启动前的检查关卡**：`caddy list-modules` 必须显示 s3 存储模块;`caddy adapt` 的输出中,其存储配置块必须包含 `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"`;`caddy validate` 必须通过。
6. **服务**：通过 WinSW 安装（服务 ID `caddy`,失败自动重启,滚动日志）。以 LocalSystem 身份运行,因此能访问 IMDS 以获取角色凭证。
7. **同步任务**：注册 `CaddyHostmapSync`（以 SYSTEM 身份,每 5 分钟运行一次并在启动时运行,执行时限 4 分钟）。
8. **切换前验证**：用 `curl --resolve` 强制将域名解析到 `127.0.0.1`（在弹性 IP 迁移过去之前,这台主机没有任何真实流量）：一个已有域名必须能用一份有效的、迁移过来的证书正常提供服务;`www.` 必须返回 302;一个未知主机名必须被 TLS 拒绝;并且 `Restart-Service caddy` 之后必须**无需任何手动重新预热**就能恢复正常服务——这个重启测试正是整套静态设计的核心意义所在。
9. **正式上线**：将弹性 IP `3.23.251.61` 重新关联到新实例上。教会的 DNS 配置无需任何改动。

## 经过实战检验的坑（血泪教训——切勿重蹈覆辙）

| 坑 | 症状 | 修复方式 |
|---|---|---|
| reverse_proxy 传输层中的 `tls_server_name {vars.upstream}` | 每一个被代理的域名都返回 502：map 中的占位符在 **TLS 拨号那一刻是空的**（报错“必须指定 ServerName 或 InsecureSkipVerify”） | 改用传输层原生的占位符：`tls_server_name {http.reverse_proxy.upstream.host}` |
| `hosts.map` 中存在重复的键或垃圾行 | Caddy 的 `map` 处理器**遇到重复的输入键会直接硬报错**——一行坏数据就能拖垮整个配置 | 同步脚本会规范化空白字符、丢弃格式错误的行（只有在坏行超过 20% 时才会整体拒绝）、按“先到先得”原则去重,并写出**不含 BOM** 的 UTF-8 文件（BOM 会破坏映射文件的第一个键)。API 本身也会在数据源头就过滤掉空的或包含空格的域名记录 |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | 任务注册会**悄无声息地失败**（超出范围的 XML,一个非终止性错误） | 改为构建一个带 `Interval = "PT5M"` 且不设置持续时间的 `MSFT_TaskRepetitionPattern` CIM 实例;并添加一个 4 分钟的 `ExecutionTimeLimit`（首次以 SYSTEM 身份运行时,可能会卡在一次冷启动的 TLS/CRL 查找上） |

:::warning
admin API 仅绑定在 `localhost:2019` 上。旧版的运行时模式曾将其对外暴露,以便 Membership API 可以远程推送路由配置;而静态设计不需要任何远程推送,这个更小的暴露面是刻意为之的。`caddy reload`（由同步脚本在本地运行)是这个 admin API 唯一的调用方。
:::

:::info 旧版运行时推送
API 中的 `CaddyHelper`（以及 `/membership/domains/caddy` + `/caddy/init` 端点）仍然存在,作为回退到旧版运行时配置模式的应急路径。计划在静态主机稳定运行几周之后予以删除——届时,`authorize` + `hostmap` 将成为仅有的集成点。
:::

## 运维

- **日志**：WinSW 的滚动日志位于 `C:\caddy\`（服务的标准输出/错误——反向代理相关的错误会记录在 `caddy-service.err.log` 中);同步历史记录在 `C:\caddy\sync-hostmap.log`。
- **强制刷新映射**：`Start-ScheduledTask -TaskName CaddyHostmapSync`。
- **配置变更**：编辑 `C:\caddy\Caddyfile`,然后依次执行 `caddy validate` + `caddy reload`（或者直接 `Restart-Service caddy`——按设计,重启是安全的）。
- **大批量删除域名**会按设计触发同步脚本的“收缩防护”机制;此时把旧的 `hosts.map` 移到一边,重新运行该任务即可接受这次预期之内的大幅收缩。
- **给教会的 DNS 配置说明永远不变**：根域名 `A 3.23.251.61`,或 `CNAME proxy.b1.church`。

## 相关页面

- [网站路由与多站点](../architecture/websites) —— 被代理的请求在 B1App 中如何解析到某个教会/站点
- [API 部署](./apis) —— 如何部署提供 `authorize`/`hostmap` 服务的 Membership API
