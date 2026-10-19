---
title: "B1 Admin"
---

# B1 Admin

<div class="article-intro">

B1Admin 是教会管理仪表板——一个基于 Vite 和 Material-UI 构建的 React 单页应用。教会员工使用它来管理人员、群组、出席、奉献、内容等。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 安装 **Node.js 22+** 和 **Git** -- 参见[先决条件](../setup/prerequisites)
- 配置您的 API 目标（演示或本地）-- 参见[环境变量](../setup/environment-variables)

</div>

## 设置

### 1. 克隆代码仓库

```bash
git clone https://github.com/ChurchApps/B1Admin.git
```

### 2. 安装依赖

```bash
cd B1Admin
npm install
```

### 3. 配置环境变量

```bash
cp dotenv.sample.txt .env
```

打开 `.env` 并配置 API 端点。您可以将其指向共享的演示 API（`https://api.demo.churchapps.org`）或您本地的 API 实例。示例文件中可能仍列有已停用的预发布网址；请将其替换。

### 4. 启动开发服务器

```bash
npm start
```

这将启动 Vite 开发服务器。应用将在您的浏览器中可用，并启用了热模块替换（HMR）。

## 关键环境变量

| 变量 | 说明 |
|----------|-------------|
| `REACT_APP_STAGE` | 环境名称（例如示例文件中的 `demo`、`prod` 或 `selfhost`） |
| `PORT` | 开发服务器端口（默认：`3101`） |
| `REACT_APP_*_API` | 每个模块的 API 端点 URL |

:::info
`postinstall` 脚本会从 `@churchapps/apphelper` 复制语言环境和 CSS 文件。如果组件看起来没有样式，请手动运行 `npm run postinstall`。
:::

## 关键命令

| 命令 | 说明 |
|---------|-------------|
| `npm start` | 启动 Vite 开发服务器 |
| `npm run build` | 通过 Vite 进行生产构建 |
| `npm run test` | 使用 Playwright 运行端到端测试 |
| `npm run lint` | 运行 ESLint 并自动修复 |

## 技术栈

- 使用 TypeScript 的 **React 19**
- 用于构建工具和开发服务器的 **Vite**
- 用于 UI 组件的 **Material-UI 7**
- 用于服务端状态的 **React Query 5**
- 用于共享组件的 **`@churchapps/apphelper*`** 系列包

## 部署

生产构建部署到 **S3 + CloudFront**：

1. `npm run build` 生成静态资源
2. 资源同步到 S3 存储桶
3. 触发 CloudFront 失效，以提供新版本

:::tip
有关详细的部署说明，请参见[网页应用部署](../deployment/web-apps)指南。
:::
