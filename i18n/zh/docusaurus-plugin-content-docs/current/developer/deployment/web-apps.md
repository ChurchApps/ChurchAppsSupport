---
title: "Web 应用部署"
---

# Web 应用部署

<div class="article-intro">

ChurchApps Web 应用作为静态站点部署到 **Amazon S3**，使用 **CloudFront** 作为 CDN。部署通过 GitHub Actions 自动化完成，但也可以在需要时手动运行。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 在本地配置好 Web 应用并验证构建正常 -- 参见 [Web 应用](../web-apps/)
- 配置具有 S3 和 CloudFront 访问权限的 AWS 凭据
- 了解目标 S3 存储桶名称和 CloudFront 分配 ID

</div>

## 部署步骤

1. **构建应用** -- 生成静态输出：

   ```bash
   npm run build
   ```

2. **同步到 S3** -- 将构建输出上传到 S3 存储桶：

   ```bash
   aws s3 sync build/ s3://bucket-name
   ```

3. **CloudFront 失效** -- 清除 CDN 缓存，使用户接收到最新版本：

   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   ```

## 自动化部署

GitHub Actions 工作流在推送到 `main` 分支时自动处理部署。工作流执行上述三个步骤 -- 构建、S3 同步和 CloudFront 失效 -- 无需手动干预。

:::info
你通常不需要手动运行这些命令。将拉取请求合并到 `main` 即可触发自动化部署流水线。
:::

:::tip
如果你需要在部署前本地验证构建，请运行 `npm run build` 并检查 `build/` 目录中的输出。你可以使用任何静态文件服务器在本地提供服务，以确认一切正常。
:::

## 相关文章

- **[Web 应用](../web-apps/)** -- B1Admin、B1App 和 LessonsApp 的配置指南
- **[API 部署](./apis)** -- 部署后端 API
- **[移动应用部署](./mobile)** -- 将移动应用部署到应用商店
