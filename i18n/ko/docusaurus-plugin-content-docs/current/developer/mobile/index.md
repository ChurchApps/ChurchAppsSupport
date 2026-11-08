---
title: "모바일 앱"
description: "ChurchApps의 Expo 및 React Native 모바일 앱, B1 Checkin과 LessonsScreen의 개요와 공유 Expo 도구 체인을 위한 로컬 설정 단계입니다."
---

# 모바일 앱

<div class="article-intro">

ChurchApps 모바일 앱은 **React Native**와 **Expo**로 만들어졌으며, Android, iOS, Android TV에서 네이티브 환경을 제공합니다. 모든 모바일 앱은 같은 Expo 기반 도구 체인을 공유하므로, 하나를 빌드할 수 있다면 나머지도 모두 빌드할 수 있습니다.

</div>

## 앱

| 앱 | 용도 | 플랫폼 |
|-----|---------|----------|
| B1 Checkin | 체크인 스테이션용 키오스크 앱 | Android, iOS |
| LessonsScreen | 교실에서 레슨을 표시하는 Android TV 앱 | Android TV |

:::info
교인이 설치하는 앱은 B1 App입니다. B1App의 `/mobile` 섹션으로, 교인들이 프로그레시브 웹 앱(PWA)으로 설치합니다. 이는 Expo 프로젝트가 아닌 웹 앱입니다. 로컬에서 실행하는 방법은 [웹 앱](../web-apps/index.md)을 참조하세요.
:::

### B1 Checkin

교회의 체크인 스테이션을 위해 설계된 전용 키오스크 애플리케이션입니다. 교인이 예배와 행사에서 자녀를 체크인하고 출석을 기록할 수 있도록 간단하고 터치하기 쉬운 인터페이스를 제공합니다.

### LessonsScreen

교실에서 레슨 콘텐츠를 표시하는 Android TV 애플리케이션입니다. 교사는 레슨 슬라이드, 영상, 활동을 TV 화면으로 전송할 수 있어, 수업 중에 교육 자료를 쉽게 보여줄 수 있습니다.

## 로컬 설정

모든 모바일 앱은 같은 Expo 기반 도구 체인을 공유하며 비슷한 설정 절차를 따릅니다. B1 Checkin을 예로 들면 다음과 같습니다.

1. **Node.js**, Android Studio(Android 에뮬레이터용), Xcode(iOS 시뮬레이터용, macOS 전용)를 설치합니다. 자세한 내용은 [사전 요구 사항](../setup/prerequisites.md)을 참조하세요.
2. 저장소를 클론하고 의존성을 설치합니다(B1 Checkin은 Yarn을 사용합니다).

   ```bash
   git clone https://github.com/ChurchApps/B1Checkin.git
   cd B1Checkin && yarn install
   ```

3. `dotenv.sample.txt`를 `.env`로 복사하고, 앱이 연결할 스테이지를 설정합니다(로컬 API를 사용하려면 `dev`). 자세한 내용은 [환경 변수](../setup/environment-variables.md#b1checkin-react-native--expo)를 참조하세요.
4. `yarn start`로 Expo 개발 서버를 시작한 다음, `yarn android` 또는 `yarn ios`를 실행하여 에뮬레이터나 기기에서 앱을 실행합니다.

릴리스 빌드와 무선(OTA) 업데이트에 대해서는 [모바일 배포](../deployment/mobile.md)를 참조하세요.
