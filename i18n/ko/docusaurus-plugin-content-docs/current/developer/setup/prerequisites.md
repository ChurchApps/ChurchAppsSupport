---
title: "사전 요구 사항"
---

# 사전 요구 사항

<div class="article-intro">

필요한 도구는 어떤 프로젝트에서 작업할지에 따라 달라집니다. 이 페이지는 모든 개발 영역에 필요한 소프트웨어를 공통 요구 사항부터 플랫폼별 도구 체인까지 영역별로 정리합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- [프로젝트 개요](./project-overview)를 읽고 어떤 프로젝트에서 작업할지 정하세요.
- 소프트웨어를 설치하려면 개발 컴퓨터의 관리자 권한이 필요합니다.

</div>

## 모든 프로젝트

어떤 프로젝트에서 작업하든 다음 항목은 필수입니다.

| 도구 | 버전 | 참고 |
|------|---------|-------|
| **Node.js** | 20+ | B1App과 LessonsApp(Next.js 16)에는 22+가 필요하고, Api에는 24+가 필요함 |
| **npm** | Node.js에 포함 | 모든 프로젝트에서 패키지 관리자로 사용 |
| **Git** | 최신 버전 | 각 프로젝트는 별도의 저장소임 |

:::tip
[nvm](https://github.com/nvm-sh/nvm)(macOS/Linux) 또는 [nvm-windows](https://github.com/coreybutler/nvm-windows)(Windows) 같은 Node 버전 관리자를 사용하면 Node 버전을 쉽게 전환할 수 있습니다.
:::

## 백엔드 API 개발

API를 데모 API에 연결하지 않고 로컬에서 실행하려는 경우:

| 도구 | 버전 | 참고 |
|------|---------|-------|
| **MySQL** | 8.0+ | 각 API 모듈은 자체 데이터베이스를 사용함 |

핵심 API에는 여섯 개의 데이터베이스가 필요합니다: `membership`, `attendance`, `content`, `giving`, `messaging`, `doing`. API에는 스키마를 초기화하는 스크립트가 포함되어 있습니다. [API 로컬 설정](../api/local-setup) 가이드를 참고하세요.

## 모바일 앱 개발

B1Mobile, B1Checkin, LessonsScreen 또는 기타 React Native / Expo 앱을 개발하는 경우:

| 도구 | 버전 | 참고 |
|------|---------|-------|
| **Expo CLI** | 최신 버전 | 전역 설치: `npm install -g expo-cli` |
| **Android Studio** | 최신 버전 | Android 개발에 필요(Android SDK 포함) |
| **Xcode** | 최신 버전 | iOS 개발에 필요(macOS 전용) |

:::info
실제 기기에서 Expo Go 앱을 사용하면 Android Studio나 Xcode 없이도 빠르게 테스트할 수 있습니다. 다만 프로덕션 바이너리를 빌드하려면 네이티브 도구 체인이 필요합니다.
:::

## FreeShow(데스크톱 앱) 개발

FreeShow는 네이티브 Node 모듈(예: `canvas`)을 컴파일하므로 추가 네이티브 빌드 의존성이 필요합니다.

### 모든 플랫폼

| 도구 | 버전 | 참고 |
|------|---------|-------|
| **Python** | 3.12 | 네이티브 모듈 컴파일을 위해 `node-gyp`가 필요로 함 |
| **setuptools** | 최신 버전 | `pip install setuptools`로 설치 |

### Windows

| 도구 | 참고 |
|------|-------|
| **Visual Studio** | Community 에디션이면 충분함 |
| **"C++를 사용한 데스크톱 개발" 워크로드** | Visual Studio 설치 중 선택 |
| **Windows 10 SDK** | C++ 워크로드에 포함됨. 선택되어 있는지 확인 |

명령줄에서 Visual Studio 빌드 도구를 설치할 수 있습니다.

```bash
npm install --global windows-build-tools
```

또는 Visual Studio Community를 설치하고 설치 중에 "C++를 사용한 데스크톱 개발" 워크로드를 선택하세요.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

보통 Xcode 명령줄 도구면 충분합니다.

```bash
xcode-select --install
```

## 설치 확인하기

다음 명령을 실행해 모든 항목이 설치되었는지 확인하세요.

```bash
node --version    # v20.x.x 이상이 출력되어야 함
npm --version     # 10.x.x 이상이 출력되어야 함
git --version     # git version 2.x.x가 출력되어야 함
mysql --version   # 로컬 API 개발에만 필요
```

## 다음 단계

- **[프로젝트 개요](./project-overview)** -- 모든 프로젝트와 각각의 역할 살펴보기
- **[환경 변수](./environment-variables)** -- `.env` 파일 구성하기
