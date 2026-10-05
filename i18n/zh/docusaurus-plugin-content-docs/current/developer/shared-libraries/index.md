---
title: "共享库"
---

# 共享库

<div class="article-intro">

ChurchApps 共享代码发布到 npm 下的 `@churchapps/*` 范围。所有共享包都存在于一个单一存储库中 -- [包](https://github.com/ChurchApps/Packages) -- 作为 Yarn（Berry）工作区管理并与[变更集](https://github.com/changesets/changesets)版本化。

</div>

## 包

| 包 | 描述 | 使用者 |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | 基础层：框架无关的辅助函数和形成跨应用数据契约的共享 TypeScript 接口 | 所有项目 |
| [`@churchapps/apihelper`](./api-helper) | 服务器端 Express 实用程序：auth、基本控制器、数据库访问、AWS 和电子邮件集成 | 所有 API |
| [`@churchapps/apphelper`](./app-helper) | 共享 React 组件和功能模块（登录、捐赠、表单、markdown、网站） | 所有网络应用 |
| `@churchapps/content-providers` | 第三方内容提供商（Lessons.church、Planning Center、Dropbox 等）的抽象 | Api、B1Admin、B1App、FreePlay |
| `@churchapps/integration-sdk` | 用于构建 B1.church 集成的工具包：webhook 验证、类型 REST 客户端、OAuth 辅助程序 | 外部集成开发人员 |
| `@churchapps/texting` | SMS 提供商抽象（Text In Church、Clearstream、Mutual Ministry、MinistryStuff、Nalo Solutions） | Api |

依赖方向严格向下：应用依赖 `apihelper` 和 `apphelper`，这声明 `@churchapps/helpers` 作为一个**对等依赖**所以每个应用精确地解决它的一个副本。

## 工作区设置

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

回购使用 Yarn Berry（根 `packageManager` 字段是权威的）与一个单一锁定文件。`yarn build` 在依赖顺序中构建每个包；`yarn test` 运行所有包测试。

## 使用变更集发布

每个包的变更都随着一个变更集一起发货：

1. 在工作区根运行 `yarn changeset`。选择您触及的包、凹凸类型（修补 = 修复、次要 = 新出口或功能、主要 = 破坏）以及编写一个单行摘要 -- 它变成 CHANGELOG 条目。
2. 将生成的 `.changeset/*.md` 文件与您的代码更改一起提交。预提交钩子阻止改变包源而没有分阶段变更集的提交。
3. 当准备好发布时，在根目录中运行 `yarn publish-all`。这消费待处理的变更集（凹凸版本、书写 CHANGELOGs、同步内部依赖范围），在依赖顺序中构建一切，并将凹凸的包发布到 npm。然后提交并推送版本凹凸。

:::warning
永远不要在单个包内运行原生 `npm publish` -- 它跳过构建排序和版本簿记发布脚本处理。发布需要一个 npm 账户，在 `@churchapps` 范围中具有发布权限。
:::

## 针对消费应用的本地开发

在工作区内，包直接针对它们的兄弟姐妹构建 -- 不需要链接。要在消费应用中测试未发布的包构建（B1Admin、B1App 等），在消费者中添加一个临时 Yarn 门户：

```bash
# in the consuming project
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

首先构建包（在工作区根目录中运行 `yarn build`）-- 消费者读取编译的 `dist/` 输出，而不是源。

:::warning
`yarn link` 在消费者的 `package.json` 中写入门户分辨率。永远不要提交它 -- 完成时总是 `yarn unlink` 并重新安装。
:::
