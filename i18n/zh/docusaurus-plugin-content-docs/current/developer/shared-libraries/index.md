---
title: "共享库"
---

# 共享库

<div class="article-intro">

ChurchApps 共享代码发布到 npm 的 `@churchapps/*` 作用域。所有共享包位于单个仓库中——[Packages](https://github.com/ChurchApps/Packages)——作为 Yarn (Berry) 工作区管理，并使用 [changesets](https://github.com/changesets/changesets) 进行版本控制。

</div>

## 包

| 包 | 描述 | 使用者 |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | 基础层：框架无关的助手函数和构成跨应用数据契约的共享 TypeScript 接口 | 所有项目 |
| [`@churchapps/apihelper`](./api-helper) | 服务端 Express 工具：认证、基础控制器、数据库访问、AWS 和电子邮件集成 | 所有 API |
| [`@churchapps/apphelper`](./app-helper) | 共享 React 组件和功能模块（登录、捐赠、表单、markdown、网站） | 所有 Web 应用 |
| `@churchapps/content-providers` | 第三方内容提供商抽象（Lessons.church、Planning Center、Dropbox 等） | Api、B1Admin、B1App、FreePlay |
| `@churchapps/integration-sdk` | 构建 B1.church 集成的工具包：webhook 验证、类型化 REST 客户端、OAuth 助手 | 外部集成开发者 |
| `@churchapps/texting` | SMS 提供商抽象（Text In Church、Clearstream、Mutual Ministry） | Api |

依赖方向严格向下：应用依赖 `apihelper` 和 `apphelper`，它们声明 `@churchapps/helpers` 为 **对等依赖**，以便每个应用恰好解析一个副本。

## 工作区设置

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

该仓库使用 Yarn Berry（根 `packageManager` 字段是权威的）配合单个锁定文件。`yarn build` 按依赖顺序构建每个包；`yarn test` 运行所有包测试。

## 使用 Changesets 发布

每个包的变更都与一个 changeset 一起发送：

1. 在工作区根目录运行 `yarn changeset`。选择您接触的包、碰撞类型（patch = 修复、minor = 新导出或功能、major = 破坏性）并写一行摘要——它成为 CHANGELOG 条目。
2. 与您的代码变更一起提交生成的 `.changeset/*.md` 文件。pre-commit 钩子阻止没有暂存 changeset 的包源代码变更的提交。
3. 准备发布时，在根目录运行 `yarn publish-all`。这使用待处理的 changesets（碰撞版本、写入 CHANGELOG、同步内部依赖范围）、按依赖顺序构建所有内容，并将碰撞的包发布到 npm。然后提交并推送版本碰撞。

:::warning
永远不要在单个包内运行原始 `npm publish`——它跳过构建排序和发布脚本处理的版本记账。发布需要具有 `@churchapps` 作用域发布权限的 npm 账户。
:::

## 针对消费应用的本地开发

在工作区内，包直接针对其兄弟包构建——不需要链接。要在消费应用（B1Admin、B1App 等）内测试未发布的包构建，请在消费者中添加临时 Yarn 链接：

```bash
# 在消费项目中
yarn link ../Packages/helpers
# ... 测试 ...
yarn unlink ../Packages/helpers && yarn install
```

首先构建包（`yarn build` 在工作区根目录）——消费者读取编译的 `dist/` 输出，而非源代码。

:::warning
`yarn link` 在消费者的 `package.json` 中写入链接解决方案。永远不要提交它——完成后始终 `yarn unlink` 并重新安装。
:::
