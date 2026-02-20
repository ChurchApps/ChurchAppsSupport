---
title: "移动应用部署"
---

# 移动应用部署

<div class="article-intro">

ChurchApps 移动应用使用 **Expo EAS Build** 构建和部署，并通过应用商店分发。本页介绍 Android 和 iOS 的构建、提交和空中更新推送。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 在本地配置好移动应用 -- 参见 [B1 Mobile](../mobile/b1-mobile)
- 安装并配置 [EAS CLI](https://docs.expo.dev/eas/)
- 拥有 Google Play Console（Android）和/或 Apple App Store Connect（iOS）的访问权限

</div>

## 构建

### Android

```bash
npm run build:android
```

### iOS

```bash
eas build --platform ios --profile production
```

## 提交到应用商店

### Android -- Google Play Store

EAS 构建成功后，Android 二进制文件（AAB）通过 Play Console 提交到 Google Play Store。

### iOS -- Apple App Store

通过 EAS 直接提交 iOS 构建：

```bash
eas submit --platform ios
```

## OTA 更新

对于不需要应用商店审核的纯 JavaScript 更改，使用空中更新（OTA）：

```bash
npm run update:production
```

这使用 EAS Update 将更改直接推送给用户，无需完整的商店提交。

:::tip
OTA 更新比商店构建快得多 -- 更改可以在几分钟内到达用户，而非数天。使用它来修复 bug、更改文案和不涉及原生代码更改的次要 UI 更新。
:::

## 版本号

在创建商店构建之前，需要在多个文件中更新版本号：

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/*/Info.plist`
- `ios/*/project.pbxproj`

:::warning
忘记更新所有文件中的版本号将导致构建失败或应用商店拒绝。在开始生产构建之前，请仔细检查上面列出的每个文件。
:::

## 相关文章

- **[B1 Mobile](../mobile/b1-mobile)** -- 本地配置和开发指南
- **[API 部署](./apis)** -- 部署后端 API
- **[Web 应用部署](./web-apps)** -- 部署前端 Web 应用
