---
title: "移动端部署"
description: "介绍如何构建 Expo 应用（如 B1 Checkin）的 Android 和 iOS 发布版本、将其提交到应用商店，以及使用 EAS 推送 OTA 更新。"
---

# 移动端部署

<div class="article-intro">

ChurchApps 的 Expo 移动应用（如 B1 Checkin）使用 **Expo EAS Build** 或本地 Gradle 构建，并通过应用商店分发。本页以 B1 Checkin 为例，介绍如何为 Android 和 iOS 构建、提交应用，以及推送无线（OTA）更新。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 在本地设置应用——参见 [移动应用](../mobile/index.md#local-setup)
- 安装并配置 [EAS CLI](https://docs.expo.dev/eas/)
- 具有 Google Play 控制台（Android）和/或 Apple App Store Connect（iOS）的访问权限

</div>

## 构建

### Android

Android 发布版本在本地构建，并使用来自 EAS 的发布密钥库进行签名。首次使用时，运行 `npx eas-cli credentials -p android`（选择 **credentials.json: Download credentials from EAS**）下载密钥库，然后运行：

```bash
yarn build:android
```

Google Play 包会输出到 `android/app/build/outputs/bundle/release/app-release.aab`。如需改为在 EAS 上构建，请运行 `yarn build:android:eas`。

### iOS

iOS 构建始终在 EAS 上运行：

```bash
yarn build:ios
```

## 提交到应用商店

### Android —— Google Play 商店

通过 Play 控制台上传 AAB，或使用 EAS 提交：

```bash
npx eas-cli submit -p android --path android/app/build/outputs/bundle/release/app-release.aab
```

### iOS —— Apple App Store

直接通过 EAS 提交 iOS 构建：

```bash
eas submit --platform ios
```

## OTA 更新

对于无需应用商店审核的纯 JavaScript 更改，请使用无线（OTA）更新：

```bash
yarn update
```

此方式使用 EAS Update 直接向用户推送更改，无需完整的商店提交。

:::tip
OTA 更新比商店构建快得多——更改可在几分钟内送达用户，而不必等待数天。它适用于错误修复、文案修改以及不涉及原生代码变更的小幅界面调整。
:::

## 版本号

创建商店构建之前，必须更新多个文件中的版本号：

- `package.json`
- `app.json`
- `android/app/build.gradle`（`versionName` 和 `versionCode`）

iOS 构建号由 EAS 自动递增。

:::warning
如果未更新上述所有文件中的版本号，将导致构建失败或被应用商店拒绝。开始正式构建前，请仔细检查上面列出的每个文件。
:::

## 相关文章

- **[移动应用](../mobile/index.md)** —— 本地设置和开发指南
- **[API 部署](./apis.md)** —— 部署后端 API
- **[Web 应用部署](./web-apps.md)** —— 部署前端 Web 应用
