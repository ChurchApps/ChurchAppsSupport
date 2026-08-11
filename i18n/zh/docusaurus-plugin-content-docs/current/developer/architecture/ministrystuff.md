# MinistryStuff（付费存储和短信）

MinistryStuff.org 是单独的付费服务，资助 ChurchApps 无法放弃的两件事 -- 批量文件存储（1TB+）和短信积分 -- 作为固定费率月订阅。ChurchApps 本身保持 100% 免费；B1 中没有东西需要 MinistryStuff 订阅，每个集成点都是第三方也可以实现的提供商接缝。

## 组件

| 部分 | 仓库 | 角色 |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/`（端口 8097 开发） | 计费（Stripe）、SMS 发送 + 积分分账（AWS End User Messaging）、存储（S3 + 配额会计）。单 MySQL DB `ministrystuff`。 |
| MinistryStuffWeb | `MinistryStuffWeb/`（端口 3103 开发） | ministrystuff.org -- 营销、定价和账户门户（计划、使用情况、Stripe 签出/客户门户重定向）。 |
| 短信提供商 | `Packages/texting` → `MinistryStuffProvider` | 注册为 `ministrystuff` 与 Clearstream/TextInChurch 并行。 |
| 存储接缝 | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider`（默认，免费）包装原始 S3/磁盘开关；`FileStorageHelper` 委托给默认提供商不变。 |
| Api 接线 | `Api/` 内容 + 消息模块 | `MinistryStuffStorageProvider` + `StorageResolver`（内容）、`TextingConfigHelper` 服务密钥注入（消息）、`storageProviders` 表、`/content/storage/*` + `/messaging/texting/credits` 端点。 |

## 身份和信任

- 相同账户，相同教会：MinistryStuffApi 用共享 `JWT_SECRET` 验证 ChurchApps JWT（同胞应用模式，如 B1Transfer）。门户对 MembershipApi 登录并接受 `?jwt=` 交接。
- 服务器到服务器（核心 Api → MinistryStuffApi）：`X-Service-Key` 标头（`MINISTRYSTUFF_SERVICE_KEY`，两侧）+ 显式 `churchId`。权利总是检查对那个教会的订阅。教会从不持有 MinistryStuff 凭据 -- 在 B1Admin 中选择提供商是所需的全部。

## 短信流

B1Admin 发送文本 → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → 段计数从当前期间 `smsCreditGrants` 扣除 → AWS End User Messaging（或 `smsMode: mock` 在开发中）。积分是**硬停止**：用尽积分拒绝批发（`insufficient_credits`，在 B1Admin 中作为友好升级提示表面） -- 从不部分发送，从不超费计费。积分授权从 Stripe `invoice.paid` webhook 幂等性地按计费周期发行。选择退出（`smsOptOuts`）在每次发送前被过滤。

## 存储流

教会的提供商行（`content.storageProviders`，在 B1Admin → 设置 → 文件存储中管理）选择**新**上传去哪里。`contentPath` 是绝对的每文件 URL，所以混合提供商与零迁移并存：旧文件保持从 `content.churchapps.org` 提供，新的从 `content.ministrystuff.org`。上传流 Api → `StorageResolver.forChurch` → 提供商 `store`/`getUploadUrl`（S3 模式中的预签 POST 带 `content-length-range`；磁盘/开发模式中的 base64 后备）；删除由存储的 URL 路由（`StorageResolver.forUrl`）。配额 = 计划字节，从 `storageObjects`（`stored` + `pending` 保留）计数；超过配额阻止新上传（`storage_quota_exceeded`）-- 没东西曾被删除或计费额外。免费 ChurchApps 层未被触及（与之前相同限制；无教会范围配额）。

范围注意：提供商选择覆盖内容**文件/资源**流（其中批量媒体活动）。相册/徽标/照片上传保持在默认提供商 -- 它们从存储列出密钥并构建客户端 URL，所以每教会根不适用尚未。

相同接缝也为[自带存储](./byos-storage)供电：教会可以链接 Google Drive、Dropbox、OneDrive 或他们自己的 S3 兼容桶而不是 MinistryStuff 计划。

## 计费

Stripe 签出（托管）用于订阅，Stripe 客户门户用于卡更新/取消/发票 -- MinistryStuffWeb 没有卡表单。每（教会、产品）一个 `subscriptions` 行；计划/层活在代码（`MinistryStuffApi/src/helpers/Plans.ts`）带 Stripe 价格 id 从配置。Webhook（`/billing/webhook`，原始正文签名验证，`webhookEvents` 重复删除）驱动订阅生命周期：活跃 → past_due（宽限） → 已取消。

## 开发设置

运行 MinistryStuffApi（`yarn dev`，8097；需要 `.env` 与共享 `JWT_SECRET` + `MINISTRYSTUFF_SERVICE_KEY`）并在 `Api/.env` 中设置相同服务密钥。`Api/config/dev.json` 已指向 `ministryStuffApi` 在 `localhost:8097`。MinistryStuffWeb 需要 `.env` 与 `VITE_STAGE=dev`。开发使用 `smsMode: mock` 和磁盘存储 -- 无 AWS 需要。
