---
title: "B1 Mobile"
---

# B1 Mobile

<div class="article-intro">

B1 Mobile 是 ChurchApps 面向成员的主要移动应用，使用 React Native 和 Expo 构建。它允许教会成员查看通讯录、访问捐赠、查看出席、接收通知，并与教会社区互动。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 安装 **Node.js** 和 **Expo CLI** -- 参见[前置条件](../setup/prerequisites)
- 安装 **Android Studio**（用于 Android 模拟器）或 **Xcode**（用于 iOS 模拟器）
- 配置你的 API 目标（暂存或本地）-- 参见[环境变量](../setup/environment-variables)

</div>

## 配置

1. 克隆仓库：

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. 安装依赖：

   ```bash
   cd B1Mobile && npm install
   ```

3. 配置环境变量 -- 复制示例文件并更新 API 端点：

   ```bash
   cp dotenv.sample.txt .env
   ```

4. 启动 Expo 开发服务器：

   ```bash
   npm start
   ```

:::tip
你可以在物理设备上使用 **Expo Go** 应用进行快速测试，无需配置 Android Studio 或 Xcode。
:::

## 环境变量

| 变量 | 描述 |
|----------|-------------|
| `STAGE` | 环境阶段（如 `dev`、`staging`、`prod`） |
| `CONTENT_ROOT` | 内容分发根 URL |
| `MEMBERSHIP_API` | Membership API 端点 |
| `MESSAGING_API` | Messaging API 端点 |
| `ATTENDANCE_API` | Attendance API 端点 |
| `GIVING_API` | Giving API 端点 |
| `DOING_API` | Doing API 端点 |
| `CONTENT_API` | Content API 端点 |
| `LESSONS_ROOT` | 课程内容根 URL |

## 关键命令

| 命令 | 描述 |
|---------|-------------|
| `npm start` | 启动 Expo 开发服务器 |
| `npm run android` | 在 Android 模拟器上运行 |
| `npm run ios` | 在 iOS 模拟器上运行 |
| `npm run test` | 运行测试（Jest） |

## 生产构建

在创建生产构建之前，请在以下所有文件中更新版本号：

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

这使用 EAS Build 创建 Android 二进制文件。

### iOS

```bash
eas build --platform ios --profile production
```

### OTA 更新

推送空中更新（无需通过应用商店审核）：

```bash
npm run update:production
```

:::info
OTA 更新适用于纯 JavaScript 更改。如果你修改了原生代码或依赖项，则必须提交完整的商店构建。
:::

## 相关文章

- **[移动应用部署](../deployment/mobile)** -- 构建、提交和部署移动应用的完整指南
- **[环境变量](../setup/environment-variables)** -- 移动环境配置的完整参考
