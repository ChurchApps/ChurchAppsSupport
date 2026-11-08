---
title: "모바일 배포"
description: "B1 Checkin과 같은 Expo 앱의 Android 및 iOS 릴리스 빌드, 앱 스토어 제출, EAS를 이용한 OTA 업데이트 배포 과정을 안내합니다."
---

# 모바일 배포

<div class="article-intro">

B1 Checkin과 같은 ChurchApps의 Expo 모바일 앱은 **Expo EAS Build** 또는 로컬 Gradle 빌드로 만들어지며, 앱 스토어를 통해 배포됩니다. 이 페이지에서는 B1 Checkin을 예로 들어 Android와 iOS 모두에 대한 빌드, 제출, 그리고 OTA(무선) 업데이트 배포 방법을 다룹니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 로컬에서 앱을 설정하세요 -- [모바일 앱](../mobile/index.md#local-setup)을 참고하세요
- [EAS CLI](https://docs.expo.dev/eas/)를 설치하고 구성하세요
- Google Play Console(Android) 및/또는 Apple App Store Connect(iOS)에 대한 접근 권한을 준비하세요

</div>

## 빌드하기

### Android

Android 릴리스 빌드는 로컬에서 실행되며, EAS에서 받은 릴리스 키스토어로 서명됩니다. `npx eas-cli credentials -p android` 명령으로 한 번만 내려받으세요(**credentials.json: Download credentials from EAS** 선택). 그런 다음 다음 명령을 실행하세요:

```bash
yarn build:android
```

Google Play용 번들은 `android/app/build/outputs/bundle/release/app-release.aab`에 생성됩니다. 대신 EAS에서 빌드하려면 `yarn build:android:eas`를 실행하세요.

### iOS

iOS 빌드는 항상 EAS에서 실행됩니다:

```bash
yarn build:ios
```

## 앱 스토어에 제출하기

### Android -- Google Play 스토어

AAB 파일을 Play Console에 업로드하거나, EAS로 제출하세요:

```bash
npx eas-cli submit -p android --path android/app/build/outputs/bundle/release/app-release.aab
```

### iOS -- Apple App Store

EAS를 통해 iOS 빌드를 직접 제출하세요:

```bash
eas submit --platform ios
```

## OTA 업데이트

앱 스토어 심사가 필요 없는 JavaScript 전용 변경 사항에는 OTA(무선) 업데이트를 사용하세요:

```bash
yarn update
```

이 명령은 EAS Update를 사용하여 전체 스토어 제출 없이 변경 사항을 사용자에게 바로 전달합니다.

:::tip
OTA 업데이트는 스토어 빌드보다 훨씬 빠릅니다 -- 며칠이 아니라 몇 분 안에 사용자에게 변경 사항이 전달될 수 있습니다. 네이티브 코드 변경이 없는 버그 수정, 문구 변경, 사소한 UI 업데이트에 사용하세요.
:::

## 버전 번호

운영 스토어 빌드를 만들기 전에, 여러 파일의 버전 번호를 업데이트해야 합니다:

- `package.json`
- `app.json`
- `android/app/build.gradle` (`versionName` 및 `versionCode`)

iOS 빌드 번호는 EAS가 자동으로 증가시킵니다.

:::warning
모든 파일의 버전 번호를 업데이트하지 않으면 빌드가 실패하거나 앱 스토어에서 심사가 거부될 수 있습니다. 운영 빌드를 시작하기 전에 위에 나열된 모든 파일을 다시 한번 확인하세요.
:::

## 관련 문서

- **[모바일 앱](../mobile/index.md)** -- 로컬 설정 및 개발 가이드
- **[API 배포](./apis.md)** -- 백엔드 API 배포
- **[웹 앱 배포](./web-apps.md)** -- 프론트엔드 웹 애플리케이션 배포
