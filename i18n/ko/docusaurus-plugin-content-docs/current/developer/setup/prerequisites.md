---
title: "사전 요구 사항"
description: "ChurchApps 프로젝트(B1 Admin, Lessons.church, FreePlay, API 등)를 로컬에서 작업하기 전에 Node.js, npm, Git 및 플랫폼별 도구 체인을 설정하세요."
---

# 사전 요구 사항

<div class="article-intro">

필요한 도구는 어떤 프로젝트에서 작업할지에 따라 달라집니다. 이 페이지에서는 모든 프로젝트에 공통으로 필요한 요구 사항부터 플랫폼별 도구 체인까지, 개발 영역별로 정리된 필수 소프트웨어 목록을 안내합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 작업하려는 프로젝트를 확인하려면 [프로젝트 개요](./project-overview.md)를 살펴보세요
- 소프트웨어를 설치할 수 있도록 개발 컴퓨터에 관리자 권한이 있어야 합니다

</div>

## 모든 프로젝트

어떤 프로젝트를 작업하든 아래 도구들이 필요합니다:

| 도구 | 버전 | 참고 |
|------|---------|-------|
| **Node.js** | 20+ | B1App 및 LessonsApp(Next.js 16)에는 22+ 버전이 필요하며, Api에는 24+ 버전이 필요합니다 |
| **npm** | Node.js에 포함 | 모든 프로젝트에서 패키지 관리자로 사용됩니다 |
| **Git** | 최신 버전 | 각 프로젝트는 별도의 저장소입니다 |

:::tip
여러 Node 버전을 쉽게 전환하려면 [nvm](https://github.com/nvm-sh/nvm)(macOS/Linux) 또는 [nvm-windows](https://github.com/coreybutler/nvm-windows)(Windows)와 같은 Node 버전 관리자를 사용하세요.
:::

## 백엔드 API 개발

API를 로컬에서 실행하려는 경우(데모 API를 사용하지 않고 직접 실행하는 경우)에는 다음이 필요합니다:

| 도구 | 버전 | 참고 |
|------|---------|-------|
| **MySQL** | 8.0+ | 각 API 모듈은 자체 데이터베이스를 사용합니다 |

핵심 API에는 `membership`, `attendance`, `content`, `giving`, `messaging`, `doing` 등 여섯 개의 데이터베이스가 필요합니다. API에는 스키마를 초기화하는 스크립트가 포함되어 있습니다. 자세한 내용은 [API 로컬 설정](../api/local-setup.md) 가이드를 참고하세요.

## 모바일 앱 개발

B1Checkin, LessonsScreen 또는 기타 React Native / Expo 앱을 작업하는 경우:

| 도구 | 버전 | 참고 |
|------|---------|-------|
| **Expo CLI** | 최신 버전 | 전역 설치: `npm install -g expo-cli` |
| **Android Studio** | 최신 버전 | Android 개발에 필요합니다(Android SDK 포함) |
| **Xcode** | 최신 버전 | iOS 개발에 필요합니다(macOS 전용) |

:::info
Android Studio나 Xcode 없이도 실제 기기에서 Expo Go 앱을 사용하면 빠르게 테스트할 수 있습니다. 다만 실제 배포용 바이너리를 빌드하려면 네이티브 도구 체인이 필요합니다.
:::

## FreeShow(데스크톱 앱) 개발

FreeShow는 네이티브 Node 모듈(예: `canvas`)을 컴파일하므로 추가적인 네이티브 빌드 종속성이 필요합니다:

### 모든 플랫폼

| 도구 | 버전 | 참고 |
|------|---------|-------|
| **Python** | 3.12 | 네이티브 모듈 컴파일을 위해 `node-gyp`에서 필요합니다 |
| **setuptools** | 최신 버전 | `pip install setuptools`로 설치 |

### Windows

| 도구 | 참고 |
|------|-------|
| **Visual Studio** | Community 에디션으로 충분합니다 |
| **"C++를 사용한 데스크톱 개발" 워크로드** | Visual Studio 설치 중에 선택하세요 |
| **Windows 10 SDK** | C++ 워크로드에 포함되어 있으며, 선택되어 있는지 확인하세요 |

명령줄을 통해 Visual Studio 빌드 도구를 설치할 수 있습니다:

```bash
npm install --global windows-build-tools
```

또는 Visual Studio Community를 설치하고, 설치 과정에서 "C++를 사용한 데스크톱 개발" 워크로드를 선택하세요.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

일반적으로 Xcode 명령줄 도구만 설치하면 충분합니다:

```bash
xcode-select --install
```

## 설치 확인

다음 명령을 실행하여 모든 도구가 제대로 설치되었는지 확인하세요:

```bash
node --version    # v20.x.x 이상이 출력되어야 합니다
npm --version     # 10.x.x 이상이 출력되어야 합니다
git --version     # git version 2.x.x가 출력되어야 합니다
mysql --version   # 로컬 API 개발에만 필요합니다
```

## 다음 단계

- **[프로젝트 개요](./project-overview.md)** -- 모든 프로젝트와 각 프로젝트의 역할을 확인하세요
- **[환경 변수](./environment-variables.md)** -- `.env` 파일을 설정하세요
