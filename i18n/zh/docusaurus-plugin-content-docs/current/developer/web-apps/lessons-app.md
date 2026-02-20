---
title: "LessonsApp"
---

# LessonsApp

<div class="article-intro">

LessonsApp 是 [Lessons.church](https://lessons.church) 的课程内容管理应用。它提供创建、组织和发布教会课程的界面，使用 Next.js 和 React 构建。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 安装 **Node.js 22+** 和 **Git** -- 参见[前置条件](../setup/prerequisites)
- 配置你的 API 目标（暂存或本地）-- 参见[环境变量](../setup/environment-variables)

</div>

:::warning
LessonsApp 需要 Node.js 22 或更高版本。不支持更早的版本。
:::

## 配置

### 1. 克隆仓库

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. 安装依赖

```bash
cd LessonsApp
npm install
```

### 3. 配置环境变量

将环境示例文件复制为 `.env` 并配置 API 端点：

```bash
cp dotenv.sample.txt .env
```

将 API 端点 URL 更新为指向暂存 API 或你的本地 API 实例。

### 4. 启动开发服务器

```bash
npm run dev
```

Next.js 开发服务器在 [http://localhost:3501](http://localhost:3501) 启动。

## 关键命令

| 命令 | 描述 |
|---------|-------------|
| `npm run dev` | 在端口 3501 启动 Next.js 开发服务器 |
| `npm run build` | 通过 Next.js 进行生产构建 |

## 技术栈

- **Next.js 16** 搭配 TypeScript
- **React 19** 作为 UI 组件库
- **`@churchapps/apphelper*`** 包提供共享组件

:::info
LessonsApp 与 **LessonsApi** 后端通信，这是一个独立于主 ChurchApps Api 的 API。请确保你的环境配置了正确的 Lessons API 端点。
:::

## 部署

生产构建部署到 **S3 + CloudFront**：

1. `npm run build` 生成优化的 Next.js 构建
2. 构建输出同步到 S3 存储桶
3. 触发 CloudFront 失效以提供新版本

:::tip
有关详细的部署说明，请参见 [Web 应用部署](../deployment/web-apps)指南。
:::
