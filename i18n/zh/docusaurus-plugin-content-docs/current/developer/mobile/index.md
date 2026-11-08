---
title: "移动应用"
description: "ChurchApps 基于 Expo 和 React Native 的移动应用概览，包括 B1 Checkin 和 LessonsScreen，以及其共享 Expo 工具链的本地设置步骤。"
---

# 移动应用

<div class="article-intro">

ChurchApps 的移动应用基于 **React Native** 和 **Expo** 构建，可在 Android、iOS 和 Android TV 上提供原生体验。所有移动应用共用同一套基于 Expo 的工具链，因此只要会构建其中一个，就能构建所有应用。

</div>

## 应用

| 应用 | 用途 | 平台 |
|-----|---------|----------|
| B1 Checkin | 用于签到站的自助终端应用 | Android、iOS |
| LessonsScreen | 用于在教室中显示课程内容的 Android TV 应用 | Android TV |

:::info
面向会众的应用是 B1 App，即 B1App 的 `/mobile` 部分，会众可以将其安装为渐进式 Web 应用（PWA）。它是一个 Web 应用，而不是 Expo 项目；如需在本地运行，请参阅 [Web 应用](../web-apps/index.md)。
:::

### B1 Checkin

专为教会签到站设计的自助终端应用。它提供简洁、适合触控的界面，供会众为儿童办理签到，并记录礼拜和活动的出席情况。

### LessonsScreen

一款 Android TV 应用，用于在教室中显示课程内容。教师可以将课程幻灯片、视频和活动推送到电视屏幕上，便于在课堂上展示课程材料。

## 本地设置

所有移动应用都共用同一套基于 Expo 的工具链，设置步骤也大体相同。以下以 B1 Checkin 为例：

1. 安装 **Node.js**、Android Studio（用于 Android 模拟器）以及 Xcode（用于 iOS 模拟器，仅限 macOS）——参阅[前置条件](../setup/prerequisites.md)。
2. 克隆代码仓库并安装依赖项（B1 Checkin 使用 Yarn）：

   ```bash
   git clone https://github.com/ChurchApps/B1Checkin.git
   cd B1Checkin && yarn install
   ```

3. 将 `dotenv.sample.txt` 复制为 `.env`，并设置应用应连接的环境（本地 API 使用 `dev`）——参阅[环境变量](../setup/environment-variables.md#b1checkin-react-native--expo)。
4. 使用 `yarn start` 启动 Expo 开发服务器，然后运行 `yarn android` 或 `yarn ios`，在模拟器或设备上启动应用。

有关发布版本构建和无线（OTA）更新，请参阅[移动端部署](../deployment/mobile.md)。
