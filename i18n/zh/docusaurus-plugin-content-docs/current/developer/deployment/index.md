---
title: "部署"
---

# 部署

<div class="article-intro">

ChurchApps 根据项目类型使用不同的部署策略。API 部署到 AWS Lambda，Web 应用作为静态站点部署到 S3 配合 CloudFront，移动应用通过 Expo EAS 构建并分发到应用商店。

</div>

## 按项目类型部署

| 项目类型 | 部署目标 | 工具 |
|-------------|-------------------|---------|
| [API](./apis) | AWS Lambda | Serverless Framework v3（Node.js 22.x 运行时） |
| [Web 应用](./web-apps) | S3 + CloudFront | 静态构建、S3 同步、CloudFront 失效 |
| [移动应用](./mobile) | 应用商店 | Expo EAS Build + OTA 更新 |
| FreeShow | 直接下载 | Electron Builder（跨平台二进制文件） |

## 环境

| 环境 | 用途 |
|-------------|---------|
| `dev` | 本地开发 |
| `demo` | 公开演示实例 |
| `staging` | 预生产测试 |
| `prod` | 生产环境 |

:::info
每个环境都有自己的一套 API 端点、数据库和配置。环境特定的设置在本地通过 `.env` 文件管理，在部署环境中通过 AWS SSM Parameter Store 管理。
:::
