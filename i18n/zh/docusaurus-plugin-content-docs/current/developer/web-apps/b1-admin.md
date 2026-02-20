---
title: "B1 Admin"
---

# B1 Admin

<div class="article-intro">

B1Admin 是教会管理仪表板 -- 一个使用 Vite 和 Material-UI 构建的 React 单页应用。教会工作人员使用它来管理人员、群组、出席、捐赠、内容等。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 安装 **Node.js 22+** 和 **Git** -- 参见[前置条件](../setup/prerequisites)
- 配置你的 API 目标（暂存或本地）-- 参见[环境变量](../setup/environment-variables)

</div>

## 配置

### 1. 克隆仓库

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

打开 `.env` 并配置 API 端点。你可以将它们指向暂存 API 或你的本地 API 实例。

### 4. 启动开发服务器

```bash
npm start
```

这将启动 Vite 开发服务器。应用将在浏览器中可用，并启用热模块替换。

## 关键环境变量

| 变量 | 描述 |
|----------|-------------|
| `REACT_APP_STAGE` | 环境名称（如 `local`、`staging`、`prod`） |
| `PORT` | 开发服务器端口（默认：`3101`） |
| `REACT_APP_*_API` | 各模块的 API 端点 URL |

:::info
`postinstall` 脚本从 `@churchapps/apphelper` 复制语言和 CSS 文件。如果组件样式缺失，请手动运行 `npm run postinstall`。
:::

## 关键命令

| 命令 | 描述 |
|---------|-------------|
| `npm start` | 启动 Vite 开发服务器 |
| `npm run build` | 通过 Vite 进行生产构建 |
| `npm run test` | 使用 Playwright 运行端到端测试 |
| `npm run lint` | 运行 ESLint 并自动修复 |

## 技术栈

- **React 19** 搭配 TypeScript
- **Vite** 作为构建工具和开发服务器
- **Material-UI 7** 作为 UI 组件库
- **React Query 5** 用于服务端状态管理
- **`@churchapps/apphelper*`** 包提供共享组件

## 部署

生产构建部署到 **S3 + CloudFront**：

1. `npm run build` 生成静态资源
2. 资源同步到 S3 存储桶
3. 触发 CloudFront 失效以提供新版本

:::tip
有关详细的部署说明，请参见 [Web 应用部署](../deployment/web-apps)指南。
:::
