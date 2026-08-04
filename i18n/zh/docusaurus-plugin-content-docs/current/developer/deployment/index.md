---
title: "部署"
---

# 部署

<div class="article-intro">

ChurchApps 会根据项目类型采用不同的部署策略。API 部署到 AWS Lambda,Web 应用作为静态站点部署到 S3 并配合 CloudFront,移动应用则通过 Expo EAS 构建并分发到各应用商店。

</div>

## 按项目类型划分的部署方式

| 项目类型 | 部署目标 | 工具 |
|-------------|-------------------|---------|
| [API](./apis) | AWS Lambda | Serverless Framework v3(Node.js 22.x 运行时) |
| [Web 应用](./web-apps) | S3 + CloudFront | 静态构建、S3 同步、CloudFront 失效 |
| [移动应用](./mobile) | 应用商店 | Expo EAS Build + OTA 更新 |
| [自托管(Railway)](./railway-template) | Railway | 一键模板:MySQL + Api + B1Admin + B1App |
| [自托管(Docker)](./docker) | 任意 Docker 主机 | 在 B1Admin 仓库中执行 `docker compose up` |
| [Caddy 自定义域代理](./caddy-proxy) | Windows EC2(弹性 IP `3.23.251.61`) | 静态 Caddyfile + WinSW 服务 + 定时地图同步 |
| FreeShow | 直接下载 | Electron Builder(跨平台二进制文件) |

## 环境

| 环境 | 用途 |
|-------------|---------|
| `dev` | 本地开发 |
| `demo` | 公开演示实例 |
| `staging` | 预生产测试 |
| `prod` | 生产 |

:::info
每个环境都有各自独立的一套 API 端点、数据库和配置。特定环境的设置在本地通过 `.env` 文件管理,在已部署环境中通过 AWS SSM Parameter Store 管理。
:::
