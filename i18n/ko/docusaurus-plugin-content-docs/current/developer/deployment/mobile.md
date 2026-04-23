---
title: "모바일 배포"
---

# 모바일 배포

<div class="article-intro">

ChurchApps 모바일 앱은 **Expo EAS 빌드**를 사용하여 빌드되고 앱 스토어를 통해 배포됩니다. 이 페이지는 Android 및 iOS 모두에서 빌드, 제출, 무선 업데이트 배포를 다룹니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 모바일 앱을 로컬에서 설정 -- [B1 Mobile](../mobile/b1-mobile) 참조
- [EAS CLI](https://docs.expo.dev/eas/) 설치 및 구성
- Google Play Console(Android) 및/또는 Apple App Store Connect(iOS)에 액세스 권한

</div>

## 빌드

### Android

```bash
npm run build:android
```

### iOS

```bash
eas build --platform ios --profile production
```

## 앱 스토어에 제출

### Android -- Google Play Store

성공적인 EAS 빌드 후 Android 바이너리(AAB)는 Play Console을 통해 Google Play Store에 제출됩니다.

### iOS -- Apple App Store

EAS를 통해 직접 iOS 빌드 제출:

```bash
eas submit --platform ios
```

## OTA 업데이트

앱 스토어 검수가 필요하지 않은 JavaScript만 변경하는 경우, 무선 업데이트(OTA) 사용:

```bash
npm run update:production
```

이는 EAS 업데이트를 사용하여 전체 스토어 제출 없이 사용자에게 변경 사항을 직접 푸시합니다.

:::tip
OTA 업데이트는 스토어 빌드보다 훨씬 빠릅니다 -- 변경 사항이 며칠이 아닌 몇 분 내에 사용자에게 도달할 수 있습니다. 네이티브 코드 변경을 포함하지 않는 버그 수정, 복사 변경, 사소한 UI 업데이트에 사용하세요.
:::

## 버전 번호

스토어 빌드를 생성하기 전에 여러 파일에서 버전 번호를 업데이트해야 합니다:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/*/Info.plist`
- `ios/*/project.pbxproj`

:::warning
모든 파일에서 버전 번호를 업데이트하지 않으면 빌드 실패 또는 앱 스토어 거부가 발생합니다. 프로덕션 빌드를 시작하기 전에 위에 나열된 모든 파일을 다시 확인하세요.
:::

## 관련 문서

- **[B1 Mobile](../mobile/b1-mobile)** -- 로컬 설정 및 개발 가이드
- **[API 배포](./apis)** -- 백엔드 API 배포
- **[웹 앱 배포](./web-apps)** -- 프론트엔드 웹 애플리케이션 배포
