---
title: "B1App"
---

# B1App

<div class="article-intro">

B1App 是使用 Next.js 构建的面向公众的教会会员应用程序。它提供会员体验，包括个人资料、群组目录、直播和捐献页面。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 安装 **Node.js 22+** 和 **Git** -- 请参阅[前提条件](../setup/prerequisites)
- 配置您的 API 目标（演示环境或本地环境）-- 请参阅[环境变量](../setup/environment-variables)

</div>

:::warning
B1App 需要 Node.js 22 或更高版本。不支持更早的版本。
:::

## 设置

### 1. 克隆仓库

```bash
git clone https://github.com/ChurchApps/B1App.git
```

### 2. 安装依赖

```bash
cd B1App
npm install
```

### 3. 配置环境变量

```bash
cp dotenv.sample.txt .env
```

打开 `.env` 并配置 `NEXT_PUBLIC_*_API` 端点 URL。这些 URL 可以指向共享的演示 API（`https://api.demo.churchapps.org`）或您本地的 API 实例。示例文件中可能仍列有已停用的预发布环境 URL，请将其替换掉。

### 4. 启动开发服务器

```bash
npm run dev
```

Next.js 开发服务器将在 [http://localhost:3301](http://localhost:3301) 启动。

## 常用命令

| 命令 | 说明 |
|---------|-------------|
| `npm run dev` | 在端口 3301 上启动 Next.js 开发服务器 |
| `npm run build` | 通过 Next.js 进行生产环境构建 |
| `npm run test` | 使用 Playwright 运行端到端测试 |
| `npm run lint` | 运行 Next.js 代码检查 |

## 主要环境变量

| 变量 | 说明 |
|----------|-------------|
| `NEXT_PUBLIC_*_API` | 各模块的 API 端点 URL |

:::info
`postinstall` 脚本会从 `@churchapps/apphelper` 复制语言环境和 CSS 文件。如果安装后组件样式缺失，请手动运行 `npm run postinstall`。
:::

## 技术栈

- **Next.js 16**，使用 TypeScript
- **React 19**，用于 UI 组件
- **Material-UI 7**，作为设计系统
- **React Query 5**，用于服务器状态管理
- **`@churchapps/apphelper*`** 包，提供共享组件

## 部署

生产构建会部署到 **S3 + CloudFront**：

1. `npm run build` 生成优化后的 Next.js 构建产物
2. 将构建输出同步到 S3 存储桶
3. 触发 CloudFront 失效操作，以提供新版本

:::tip
如需详细的部署说明，请参阅 [Web 应用部署](../deployment/web-apps)指南。
:::
