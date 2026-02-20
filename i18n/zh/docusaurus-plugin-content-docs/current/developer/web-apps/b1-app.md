---
title: "B1App"
---

# B1App

<div class="article-intro">

B1App 是使用 Next.js 构建的面向公众的教会成员应用。它提供成员体验，包括个人资料、群组目录、直播和捐赠页面。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 安装 **Node.js 22+** 和 **Git** -- 参见[前置条件](../setup/prerequisites)
- 配置你的 API 目标（暂存或本地）-- 参见[环境变量](../setup/environment-variables)

</div>

:::warning
B1App 需要 Node.js 22 或更高版本。不支持更早的版本。
:::

## 配置

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

打开 `.env` 并配置 `NEXT_PUBLIC_*_API` 端点 URL。它们可以指向暂存 API 或你的本地 API 实例。

### 4. 启动开发服务器

```bash
npm run dev
```

Next.js 开发服务器在 [http://localhost:3301](http://localhost:3301) 启动。

## 关键命令

| 命令 | 描述 |
|---------|-------------|
| `npm run dev` | 在端口 3301 启动 Next.js 开发服务器 |
| `npm run build` | 通过 Next.js 进行生产构建 |
| `npm run test` | 使用 Playwright 运行端到端测试 |
| `npm run lint` | 运行 Next.js lint |

## 关键环境变量

| 变量 | 描述 |
|----------|-------------|
| `NEXT_PUBLIC_*_API` | 各模块的 API 端点 URL |

:::info
`postinstall` 脚本从 `@churchapps/apphelper` 复制语言和 CSS 文件。如果安装后组件样式缺失，请手动运行 `npm run postinstall`。
:::

## 技术栈

- **Next.js 16** 搭配 TypeScript
- **React 19** 作为 UI 组件库
- **Material-UI 7** 作为设计系统
- **React Query 5** 用于服务端状态管理
- **`@churchapps/apphelper*`** 包提供共享组件

## 部署

生产构建部署到 **S3 + CloudFront**：

1. `npm run build` 生成优化的 Next.js 构建
2. 构建输出同步到 S3 存储桶
3. 触发 CloudFront 失效以提供新版本

:::tip
有关详细的部署说明，请参见 [Web 应用部署](../deployment/web-apps)指南。
:::
