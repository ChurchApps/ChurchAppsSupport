---
title: "B1 Mobile"
---

# B1 Mobile

<div class="article-intro">

B1 Mobile은 ChurchApps의 기본 구성원용 모바일 앱이며, React Native와 Expo로 제작되었습니다. 교회 구성원은 이 앱으로 명부를 보고, 헌금에 접근하고, 출석을 확인하고, 알림을 받고, 교회 공동체와 소통할 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **Node.js**와 **Expo CLI**를 설치하세요 -- [사전 요구 사항](../setup/prerequisites)을 참조하세요
- Android 에뮬레이터용 **Android Studio** 또는 iOS 시뮬레이터용 **Xcode**를 설치하세요
- API 대상(데모 또는 로컬)을 구성하세요 -- [환경 변수](../setup/environment-variables)를 참조하세요

</div>

## 설정

1. 저장소를 복제합니다:

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. 종속성을 설치합니다:

   ```bash
   cd B1Mobile && npm install
   ```

3. 환경 변수를 구성합니다 -- 샘플 파일을 복사하고 API 엔드포인트를 업데이트하세요:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Expo 개발 서버를 시작합니다:

   ```bash
   npm start
   ```

:::tip
Android Studio나 Xcode를 설정하지 않고도 실제 기기에서 **Expo Go** 앱을 사용하여 빠르게 테스트할 수 있습니다.
:::

## 환경 변수

| 변수 | 설명 |
|----------|-------------|
| `STAGE` | 환경 단계(예: `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | 콘텐츠 전송을 위한 루트 URL |
| `MEMBERSHIP_API` | 멤버십 API 엔드포인트 |
| `MESSAGING_API` | 메시징 API 엔드포인트 |
| `ATTENDANCE_API` | 출석 API 엔드포인트 |
| `GIVING_API` | 헌금 API 엔드포인트 |
| `DOING_API` | Doing API 엔드포인트 |
| `CONTENT_API` | 콘텐츠 API 엔드포인트 |
| `LESSONS_ROOT` | 수업 콘텐츠를 위한 루트 URL |

## 주요 명령어

| 명령 | 설명 |
|---------|-------------|
| `npm start` | Expo 개발 서버 실행 |
| `npm run android` | Android 에뮬레이터에서 실행 |
| `npm run ios` | iOS 시뮬레이터에서 실행 |
| `npm run test` | 테스트 실행(Jest) |

## 프로덕션 빌드

프로덕션 빌드를 만들기 전에 다음 파일의 버전 번호를 모두 업데이트하세요.

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

이 명령은 EAS Build를 사용하여 Android 바이너리를 만듭니다.

### iOS

```bash
eas build --platform ios --profile production
```

### OTA 업데이트

over-the-air 업데이트를 전송하려면(앱 스토어 심사를 거치지 않고):

```bash
npm run update:production
```

:::info
OTA 업데이트는 JavaScript 전용 변경에 가장 적합합니다. 네이티브 코드나 종속성을 변경했다면 전체 스토어 빌드를 제출해야 합니다.
:::

## 관련 문서

- **[모바일 배포](../deployment/mobile)** -- 모바일 앱을 빌드, 제출, 배포하는 전체 가이드
- **[환경 변수](../setup/environment-variables)** -- 모바일 환경 구성에 대한 전체 참조
