---
title: "自带存储"
---

# 自带存储（BYOS）

教会获得约 100MB 免费托管文件存储（`/content/files` 表面：网站文件、小组资源）。BYOS 让教会链接自己的云存储 -- **Google Drive、Dropbox、OneDrive 或任何 S3 兼容桶（AWS S3、Cloudflare R2、Backblaze B2）** -- 所以新上传落在教会自己的帐户中，没有平台上限。ChurchApps 保持免费；教会自己的帐户是限制。

## 提供商接缝

BYOS 重用为 [MinistryStuff](./ministrystuff) 构建的存储接缝：`IStorageProvider`（`Packages/apihelper`）由 `StorageResolver` 从 `content.storageProviders` 表按教会解析。不像单一 `churchapps`/`ministrystuff` 提供商，BYOS 提供商持有每教会凭据，所以 `StorageResolver.forChurch` 从教会的行构造每请求实例。实现在 `Api/src/modules/content/helpers/` 旁边的解析器：`GoogleDriveStorageProvider`、`DropboxStorageProvider`、`OneDriveStorageProvider`、`S3CompatibleStorageProvider`，加 `ByosAuth`（OAuth 令牌交换 + 单飞刷新 -- Dropbox 轮换刷新令牌，所以刷新按 `ProviderProxyController` 做的相同方式重复删除）。

`storageProviders` 携带凭据：`accessToken`/`refreshToken`/`tokenExpiresAt`（加密，OAuth 三联）或 `apiKey`/`apiSecret` + `settings` JSON（`{endpoint, region, bucket, publicBase}`，S3）。令牌从不到达客户端 -- `GET /content/storage/providers` 掩盖秘密并返回 `connected` 布尔值。

## 上传流

与之前相同的三步合同，具有扩展的预签名形状。`POST /content/files/postUrl` 返回 `PresignedPostData`，现在可选性地携带 `method`、`rawBody`、`headers`、`chunkSize` 和 `externalIdField`：

| 提供商 | 预签名 | 客户端发送字节 |
|---|---|---|
| churchapps（默认） | S3 预签 POST | multipart 表单（旧版） |
| Google Drive | 可恢复上传会话（`drive.file` 范围） | 单 PUT 到会话 URI |
| Dropbox | `files/get_temporary_upload_link`（4h） | 原始 POST |
| OneDrive | `createUploadSession`（approot） | 分块 PUT（20MiB，Graph 320KiB 倍数） |
| S3 兼容 | 预签 PUT（B2 没有 POST 政策） | 原始 PUT |

`FileHelper.uploadPresignedFile`（`@churchapps/helpers`）处理所有形状并在响应携带一个时返回提供商文件 id（Drive）。客户端在 `POST /content/files` 注册中将其作为 `externalId` 传递；`files.provider` + `files.externalId` 记录字节活动的地方（Drive 文件 id；其他的路径）。100MB 配额检查仅在解析的提供商是 `churchapps` 时应用。

## 公开下载

消费云不能被热链接（Drive 链接配额关闭，Dropbox/OneDrive 链接过期），所以对于 OAuth 三联 `contentPath` 指向稳定 Api 路由：`GET /content/files/download/:id`（匿名）加载文件行，铸造短期直接链接通过提供商的 `getDownloadUrl`（`webContentLink` / `get_temporary_link` / `@microsoft.graph.downloadUrl`），在内存中缓存 30 分钟，并 302 重定向带 `Cache-Control: max-age=300`。带宽流浏览器 ↔ 提供商，从不通过 Api。S3 兼容跳过重定向完全 -- `contentPath` 是稳定 `publicBase + key` URL（桶必须允许公开读和 CORS PUT）。

删除和下载通过 `files.provider` 路由（`StorageResolver.forFile`）；没有它的旧版行回退到 URL 前缀路由。重命名对于 BYOS 文件是仅数据库（字节由 `externalId` 处理，不是名称）。断开仍有文件的提供商软禁用行（保持令牌所以下载/删除保持工作）而不是删除它。

## 连接（B1Admin → 设置 → 文件存储）

OAuth 三联使用与内容提供商相同的中继流：弹出窗口 → 提供商同意 → `{membershipApi}/oauth/relay/callback` → B1Admin 轮询中继会话 → `POST /content/storage/exchange` 执行服务器端代码 → 令牌交换（客户端秘密从不离开服务器；Google `GOOGLE_DRIVE_CLIENT_SECRET`、OneDrive `ONEDRIVE_CLIENT_SECRET`、Dropbox 是 PKCE 公开客户端）。客户端 id 活在 `B1Admin/src/settings/components/byosProviders.ts` 和 `Api .../ByosAuth.ts` 中。范围故意最小：Google `drive.file`（仅应用创建的文件 -- 无受限范围验证）、OneDrive `Files.ReadWrite.AppFolder`、Dropbox 应用文件夹访问。S3 是朴素凭据形式。

范围注意：BYOS 仅覆盖 `/content/files` 表面。相册图像、缩略图、徽标和人员照片保持在默认提供商（小型、CDN 提供、图像优化）。
