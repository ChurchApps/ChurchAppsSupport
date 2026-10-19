---
title: "部署"
---

# 部署

<div class="article-intro">

ChurchApps 根据项目类型采用不同的部署策略：API 部署到 AWS Lambda，Web 应用以静态站点形式部署到 S3 并通过 CloudFront 分发，移动应用则通过 Expo EAS 和应用商店进行构建与分发。

</div>

## 按项目类型部署

| 项目类型 | 部署目标 | 工具 |
|-------------|-------------------|---------|
| [API](./apis) | AWS Lambda | Serverless Framework v3（Node.js 22.x 运行时） |
| [Web 应用](./web-apps) | S3 + CloudFront | 静态构建、S3 同步、CloudFront 缓存失效 |
| [移动应用](./mobile) | 应用商店 | Expo EAS Build + OTA 更新 |
| [自托管（Railway）](./railway-template) | Railway | 一键模板：MySQL + Api + B1Admin + B1App |
| [自托管（Docker）](./docker) | 任意 Docker 主机 | 一行命令安装程序；预构建的 GHCR 镜像 + Caddy，`./deploy/b1` 用于升级/备份/回滚 |
| [Caddy 自定义域名代理](./caddy-proxy) | Windows EC2（弹性 IP `3.23.251.61`） | 静态 Caddyfile + WinSW 服务 + 定时地图同步 |
| FreeShow | 直接下载 | Electron Builder（跨平台二进制文件） |

## 环境

| 环境 | 用途 |
|-------------|---------|
| `dev` | 本地开发 |
| `demo` | 公开演示实例；每次推送到 `main` 时都会部署，因此也可用作预生产测试 |
| `prod` | 生产环境 |

:::info
每个环境都有各自的一组 API 端点、数据库和配置。本地环境通过 `.env` 文件管理环境专属设置，已部署的环境则通过 AWS SSM Parameter Store 管理。
:::
