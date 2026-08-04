---
title: "MinistryStuff（付费存储与短信）"
---

# MinistryStuff（付费存储与短信）

MinistryStuff.org 是一个独立的付费服务，用于支撑 ChurchApps 无法免费提供的两项功能——批量文件存储（1TB 起）和短信额度——以固定月费订阅的形式提供。ChurchApps 本身保持 100% 免费；B1 中的任何功能都不要求订阅 MinistryStuff，并且每一个集成点都是一个第三方也可以实现的服务商接入点。

## 组成部分

| 部分 | 代码仓库 | 角色 |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/`（开发环境端口 8097） | 计费（Stripe）、短信发送与额度账本（AWS End User Messaging）、存储（S3 + 配额核算）。单一 MySQL 数据库 `ministrystuff`。 |
| MinistryStuffWeb | `MinistryStuffWeb/`（开发环境端口 3103） | ministrystuff.org —— 营销页面、价格页，以及账户门户（套餐、用量、Stripe Checkout/客户门户跳转）。 |
| 短信服务商 | `Packages/texting` → `MinistryStuffProvider` | 与 Clearstream/TextInChurch 一起注册为 `ministrystuff`。 |
| 存储接入点 | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider`（默认，免费）封装了原有的 S3/磁盘切换逻辑；`FileStorageHelper` 委托给默认服务商，行为不变。 |
| Api 接线 | `Api/` content 与 messaging 模块 | `MinistryStuffStorageProvider` + `StorageResolver`（content）、`TextingConfigHelper` 服务密钥注入（messaging）、`storageProviders` 表、`/content/storage/*` + `/messaging/texting/credits` 端点。 |

## 身份与信任

- 同一批账号、同一批教会：MinistryStuffApi 使用共享的 `JWT_SECRET` 验证 ChurchApps 的 JWT（与 B1Transfer 相同的兄弟应用模式）。门户网站针对 MembershipApi 登录，并接受 `?jwt=` 交接方式。
- 服务器到服务器（核心 Api → MinistryStuffApi）：`X-Service-Key` 请求头（`MINISTRYSTUFF_SERVICE_KEY`，两端一致）+ 明确的 `churchId`。权益始终针对该教会的订阅进行核对。教会本身从不持有 MinistryStuff 的凭证——在 B1Admin 中选择该服务商即可，无需其他操作。

## 短信流程

B1Admin 发送短信 → Api 的 `TextingController` → `@churchapps/texting` 的 `getProvider("ministrystuff")` → MinistryStuffApi 的 `/sms/send|/sms/sendBulk` → 按当前计费周期的 `smsCreditGrants` 扣减分段计数 → AWS End User Messaging（开发环境下为 `smsMode: mock`）。额度是**硬性上限**：额度耗尽会整体拒绝发送（`insufficient_credits`，在 B1Admin 中以友好的升级提示呈现）——绝不会部分发送，也绝不会超额计费。额度授予是从 Stripe 的 `invoice.paid` Webhook 按计费周期幂等发放的。退订（`smsOptOuts`）会在每次发送前被过滤掉。

## 存储流程

教会的服务商记录（`content.storageProviders`，在 B1Admin → 设置 → 文件存储 中管理）决定**新**上传文件存放的位置。`contentPath` 是每个文件的绝对 URL，因此不同服务商可以零迁移共存：旧文件继续从 `content.churchapps.org` 提供服务，新文件则来自 `content.ministrystuff.org`。上传流程为 Api → `StorageResolver.forChurch` → 服务商的 `store`/`getUploadUrl`（S3 模式下为带 `content-length-range` 的预签名 POST；磁盘/开发模式下回退为 base64）；删除则按存储的 URL 路由（`StorageResolver.forUrl`）。配额 = 套餐字节数，从 `storageObjects`（`stored` + `pending` 预留）中统计；超出配额会阻止新的上传（`storage_quota_exceeded`）——绝不会删除任何内容或产生额外计费。免费的 ChurchApps 层级不受影响（限制与以往相同；无全教会配额）。

范围说明：服务商选择仅覆盖内容的**文件/资源**流程（批量媒体所在之处）。相册/Logo/照片上传仍留在默认服务商上——它们从存储中列出键并在客户端构建 URL，因此按教会分流暂不适用于这些场景。

## 计费

订阅使用 Stripe Checkout（托管页面），银行卡更新/取消/账单则使用 Stripe 客户门户——MinistryStuffWeb 本身没有任何银行卡表单。每个（教会、产品）对应一行 `subscriptions` 记录；套餐/档位在代码中定义（`MinistryStuffApi/src/helpers/Plans.ts`），Stripe 价格 ID 来自配置。Webhook（`/billing/webhook`，原始请求体签名验证，`webhookEvents` 去重）驱动订阅生命周期：active → past_due（宽限期）→ canceled。

## 开发环境搭建

运行 MinistryStuffApi（`yarn dev`，端口 8097；需要在 `.env` 中配置共享的 `JWT_SECRET` + `MINISTRYSTUFF_SERVICE_KEY`），并在 `Api/.env` 中设置相同的服务密钥。`Api/config/dev.json` 已经将 `ministryStuffApi` 指向 `localhost:8097`。MinistryStuffWeb 需要在 `.env` 中设置 `VITE_STAGE=dev`。开发环境使用 `smsMode: mock` 和磁盘存储——不需要 AWS。
