---
title: "B1 Mobile"
---

# B1 Mobile

<div class="article-intro">

B1 Mobile은 React Native 및 Expo로 빌드한 ChurchApps의 기본 회원 대면 모바일 앱입니다. 교회 회원이 디렉토리 보기, 헌금 접근, 참석 확인, 알림 수신, 교회 커뮤니티와 상호 작용할 수 있게 합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **Node.js** 및 **Expo CLI** 설치 -- [필수 조건](../setup/prerequisites) 참조
- **Android Studio** (Android 에뮬레이터용) 또는 **Xcode** (iOS 시뮬레이터용) 설치
- API 대상 구성 (스테이징 또는 로컬) -- [환경 변수](../setup/environment-variables) 참조

</div>

## 설정

1. 저장소 복제:

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. 의존성 설치:

   ```bash
   cd B1Mobile && npm install
   ```

3. 환경 변수 구성 -- 샘플 파일 복사 및 API 엔드포인트 업데이트:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Expo 개발 서버 시작:

   ```bash
   npm start
   ```

:::tip
Android Studio나 Xcode를 설정하지 않고도 빠른 테스트를 위해 물리적 장치의 **Expo Go** 앱을 사용할 수 있습니다.
:::

## 환경 변수

| 변수 | 설명 |
|----------|-------------|
| `STAGE` | 환경 스테이지 (예: `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | 컨텐츠 배달의 루트 URL |
| `MEMBERSHIP_API` | 회원 API 엔드포인트 |
| `MESSAGING_API` | 메시징 API 엔드포인트 |
| `ATTENDANCE_API` | 참석 API 엔드포인트 |
| `GIVING_API` | 헌금 API 엔드포인트 |
| `DOING_API` | 할 일 API 엔드포인트 |
| `CONTENT_API` | 컨텐츠 API 엔드포인트 |
| `LESSONS_ROOT` | 수업 컨텐츠의 루트 URL |

## 주요 명령

| 명령 | 설명 |
|---------|-------------|
| `npm start` | Expo 개발 서버 시작 |
| `npm run android` | Android 에뮬레이터에서 실행 |
| `npm run ios` | iOS 시뮬레이터에서 실행 |
| `npm run test` | 테스트 실행 (Jest) |

## 프로덕션 빌드

프로덕션 빌드를 생성하기 전에 다음 파일 모두에서 버전 번호를 업데이트하세요:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

이는 EAS 빌드를 사용하여 Android 바이너리를 생성합니다.

### iOS

```bash
eas build --platform ios --profile production
```

### OTA 업데이트

앱 스토어 검수를 거치지 않고 무선 업데이트를 푸시:

```bash
npm run update:production
```

:::info
OTA 업데이트는 JavaScript만 변경하는 경우에 이상적입니다. 네이티브 코드나 의존성을 수정하면 전체 스토어 빌드를 대신 제출해야 합니다.
:::

## 관련 문서

- **[모바일 배포](../deployment/mobile)** -- 모바일 앱 빌드, 제출, 배포 전체 가이드
- **[환경 변수](../setup/environment-variables)** -- 모바일 환경 구성의 완전한 참고
