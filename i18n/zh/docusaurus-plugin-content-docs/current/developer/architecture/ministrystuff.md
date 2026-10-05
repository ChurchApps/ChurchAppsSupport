# MinistryStuff（付费存储与短信）

MinistryStuff.org 是分离的付费服务，资助 ChurchApps 无法放弃的两件事 -- 批量文件存储（1TB+）和 SMS 信用额 -- 作为固定费率月度订阅。ChurchApps 本身保持 100% 免费；B1 中的任何东西都不需要 MinistryStuff 订阅，每个集成点是第三方也可能实现的提供商接缝。

## 组件

| 部分 | 仓库 | 角色 |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/`（端口 8097 开发） | 账单（Stripe）、SMS 发送 + 信用账本（AWS 最终用户消息）、存储（S3 + 配额会计）。单一 MySQL DB `ministrystuff`。 |
| MinistryStuffWeb | `MinistryStuffWeb/`（端口 3103 开发） | ministrystuff.org -- 营销、定价和账户门户（计划、使用情况、Stripe Checkout/Customer Portal 重定向）。 |
| 短信提供商 | `Packages/texting` → `MinistryStuffProvider` | 与 Clearstream/TextInChurch 一起注册为 `ministrystuff`。 |
| 存储接缝 | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider`（默认，免费）包装原始 S3/磁盘开关；`FileStorageHelper` 委托给默认提供商无改变。 |
| Api 接线 | `Api/` 内容 + 消息模块 | `MinistryStuffStorageProvider` + `StorageResolver`（内容），`TextingConfigHelper` 服务密钥注入（消息），`storageProviders` 表，`/content/storage/*` + `/messaging/texting/credits` 端点。 |

## 身份与信任

- 相同账户、相同教会：MinistryStuffApi 使用共享 `JWT_SECRET` 验证 ChurchApps JWT（兄弟应用模式，如 B1Transfer）。门户登录对 MembershipApi 并接受 `?jwt=` 交接。
- 服务器到服务器（核心 Api → MinistryStuffApi）：`X-Service-Key` 标头（`MINISTRYSTUFF_SERVICE_KEY`，两侧）+ 显式 `churchId`。授权总是对那个教会的订阅检查。教会永不持有 MinistryStuff 凭据 -- 在 B1Admin 中选择提供商是全部需要的。

## 短信流

B1Admin 发送短信 → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → 段计数从当前期间的 `smsCreditGrants` 扣除 → AWS 最终用户消息（或开发中的 `smsMode: mock`）。信用额是**硬停止**：已用尽的信用额批发拒绝（`insufficient_credits`，在 B1Admin 中表面为友好升级提示）-- 永不部分发送、永不超额账单。信用额赠予从 Stripe `invoice.paid` webhooks 幂等地每账单期间发出。退出（`smsOptOuts`）在每次发送前被过滤。

其他路径到达相同提供商接缝而不通过 `TextingController`：签到警报（`CheckinController` → `MessagingModuleGateway.sendBulkText`）和工作流**发送短信**步骤动作（`Api/src/modules/doing/helpers/StepActionHelper.ts` `sendText` → `MessagingModuleGateway.sendPersonText`，它写 `sentTexts` + `deliveryLogs` 行带 null 发送者）。合并字段（`{{firstName}}`、`{{lastName}}`、`{{displayName}}`、`{{churchName}}`）由 `MergeFieldHelper.resolve` 按接收者解决，结果被限制在 1,600 字符。在 `TextingController` 中一个包含 `{{` 的小组消息被发送为一个 `sendMessage` 每接收者而不是单个 `sendBulk`；无占位符的消息仍作为一个批量发送出去。

## 存储流

教会的提供商行（`content.storageProviders`，在 B1Admin → 设置 → 文件存储中管理）选择**新**上传去哪里。`contentPath` 是绝对每文件 URL，所以混合提供商零迁移共存：旧文件保持从 `content.churchapps.org` 服务，新的来自 `content.ministrystuff.org`。上传流 Api → `StorageResolver.forChurch` → 提供商 `store`/`getUploadUrl`（S3 模式中的预签 POST 带 `content-length-range`；磁盘/开发模式中的 base64 回退）；删除由存储 URL 路由（`StorageResolver.forUrl`）。配额 = 计划字节，计数来自 `storageObjects`（`stored` + `pending` 预留）；超过配额块新上传（`storage_quota_exceeded`）-- 什么都永不被删除或额外账单。免费 ChurchApps 层未触及（与之前相同限制；无教会范围配额）。

范围注意：提供商选择涵盖内容**文件/资源**流（批量媒体位置的地方）。画廊/标志/照片上传保持在默认提供商 -- 它们列出来自存储的钥匙并在客户端构建 URL，所以每教会根未应用。

相同接缝也为[自带存储](./byos-storage)提供动力：教会可以链接 Google Drive、Dropbox、OneDrive 或他们自己的 S3 兼容桶而不是 MinistryStuff 计划。

## 账单

Stripe Checkout（托管）为订阅，Stripe 客户门户为卡更新/取消/发票 -- MinistryStuffWeb 没有卡表单。一个 `subscriptions` 行每（教会、产品）；计划/层位于代码（`MinistryStuffApi/src/helpers/Plans.ts`）具有来自配置的 Stripe 价格 id。Webhook（`/billing/webhook`，原始正文签名验证，`webhookEvents` dedup）驱动订阅生命周期：active → past_due（宽限期）→ canceled。

## 开发设置

运行 MinistryStuffApi（`yarn dev`、8097；需要 `.env` 带共享 `JWT_SECRET` + `MINISTRYSTUFF_SERVICE_KEY`）并在 `Api/.env` 中设置相同服务密钥。`Api/config/dev.json` 已经指向 `ministryStuffApi` 在 `localhost:8097`。MinistryStuffWeb 需要 `.env` 带 `VITE_STAGE=dev`。开发使用 `smsMode: mock` 和磁盘存储 -- 不需要 AWS。
