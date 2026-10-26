---
title: "共享库"
---

# 共享库

<div class="article-intro">

ChurchApps 的共享代码以 `@churchapps/*` 作用域发布到 npm。所有共享包都位于同一个仓库中——[Packages](https://github.com/ChurchApps/Packages)——该仓库以 Yarn（Berry）工作区进行管理，并使用 [changesets](https://github.com/changesets/changesets) 进行版本控制。

</div>

## 包列表

| 包 | 描述 | 使用者 |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | 基础层：与框架无关的辅助函数，以及构成跨应用数据契约的共享 TypeScript 接口 | 所有项目 |
| [`@churchapps/apihelper`](./api-helper) | 服务端 Express 工具：认证、基础控制器、数据库访问、AWS 与邮件集成 | 所有 API |
| [`@churchapps/apphelper`](./app-helper) | 共享的 React 组件和功能模块（登录、捐赠、表单、Markdown、网站） | 所有 Web 应用 |
| `@churchapps/content-providers` | 对第三方内容提供商的抽象（Lessons.church、Planning Center、Dropbox 等） | Api、B1Admin、B1App、FreePlay |
| `@churchapps/integration-sdk` | 用于构建 B1.church 集成的工具包：webhook 验证、类型化 REST 客户端、OAuth 辅助工具 | 外部集成开发者 |
| `@churchapps/texting` | 短信服务商抽象（Text In Church、Clearstream、Mutual Ministry、MinistryStuff、Nalo Solutions、Twilio） | Api |

依赖方向严格向下：应用依赖 `apihelper` 和 `apphelper`，而这两者将 `@churchapps/helpers` 声明为 **peer dependency**，以确保每个应用只解析出一份副本。

## 工作区设置

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

该仓库使用 Yarn Berry（以根目录的 `packageManager` 字段为准），并只有一个 lockfile。`yarn build` 会按依赖顺序构建所有包；`yarn test` 会运行所有包的测试。

## 使用 Changesets 发布

对包的每一次变更都需要附带一个 changeset：

1. 在工作区根目录运行 `yarn changeset`。选择你修改过的包、版本号类型（patch = 修复，minor = 新导出或功能，major = 破坏性变更），并写一行摘要——它会成为 CHANGELOG 中的条目。
2. 将生成的 `.changeset/*.md` 文件与代码变更一起提交。pre-commit 钩子会阻止那些修改了包源码、却没有暂存 changeset 的提交。
3. 准备发布时，在根目录运行 `yarn publish-all`。它会消耗待处理的 changesets（更新版本号、写入 CHANGELOG、同步内部依赖范围），按依赖顺序构建所有内容，并将已更新版本的包发布到 npm。然后提交并推送版本更新。

:::warning
切勿在单个包内直接运行 `npm publish`——这会跳过构建顺序以及发布脚本负责的版本记录工作。发布需要一个对 `@churchapps` 作用域拥有发布权限的 npm 账户。
:::

## 针对使用中应用的本地开发

在工作区内，各包会直接基于其同级包进行构建——无需链接。若要在使用中的应用（B1Admin、B1App 等）内测试尚未发布的包构建，请在使用方项目中临时添加一个 Yarn portal：

```bash
# in the consuming project
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

先构建该包（在工作区根目录运行 `yarn build`）——使用方读取的是编译后的 `dist/` 输出，而非源码。

:::warning
`yarn link` 会将 portal 解析写入使用方的 `package.json`。切勿提交它——完成后务必执行 `yarn unlink` 并重新安装依赖。
:::
