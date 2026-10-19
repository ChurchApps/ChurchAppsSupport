---
title: "사전 요구 사항"
---

# 사전 요구 사항

<div class="article-intro">

필요한 도구는 작업하려는 프로젝트에 따라 달라집니다. 이 페이지는 모든 필수 소프트웨어를 개발 영역별로 정리하며, 공통 요구 사항부터 플랫폼별 툴체인까지 다룹니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 작업할 프로젝트를 정하기 위해 [프로젝트 개요](./project-overview)를 검토하세요
- 소프트웨어를 설치하려면 개발 머신에서 관리자 권한이 있어야 합니다

</div>

## 모든 프로젝트

어떤 프로젝트를 작업하든 다음 항목이 필요합니다.

| 도구 | 버전 | 참고 |
|------|---------|-------|
| **Node.js** | 20+ | B1App과 LessonsApp(Next.js 16)에는 22+ 버전이 필요 |
| **npm** | Node.js에 포함 | 모든 프로젝트에서 패키지 관리자로 사용 |
| **Git** | 최신 | 각 프로젝트는 별도의 저장소입니다 |

:::tip
[nvm](https://github.com/nvm-sh/nvm)(macOS/Linux) 또는 [nvm-windows](https://github.com/coreybutler/nvm-windows)(Windows)와 같은 Node 버전 관리자를 사용하면 Node 버전을 쉽게 전환할 수 있습니다.
:::

## 백엔드 API 개발

데모 API를 사용하지 않고 API를 로컬에서 실행하려는 경우:

| 도구 | 버전 | 참고 |
|------|---------|-------|
| **MySQL** | 8.0+ | 각 API 모듈은 자체 데이터베이스를 사용합니다 |

핵심 API에는 `membership`, `attendance`, `content`, `giving`, `messaging`, `doing`의 6개 데이터베이스가 필요합니다. API에는 스키마를 초기화하는 스크립트가 포함되어 있습니다. 자세한 내용은 [API 로컬 설정](../api/local-setup) 가이드를 참조하세요.

## 모바일 앱 개발

B1Mobile, B1Checkin, LessonsScreen 또는 기타 React Native / Expo 앱의 경우:

| 도구 | 버전 | 참고 |
|------|---------|-------|
| **Expo CLI** | 최신 | 전역 설치: `npm install -g expo-cli` |
| **Android Studio** | 최신 | Android 개발에 필요(Android SDK 포함) |
| **Xcode** | 최신 | iOS 개발에 필요(macOS 전용) |

:::info
Android Studio나 Xcode 없이도 실제 기기에서 Expo Go 앱을 사용하여 빠르게 테스트할 수 있습니다. 다만 프로덕션 바이너리를 빌드하려면 네이티브 툴체인이 필요합니다.
:::

## FreeShow(데스크톱 앱) 개발

FreeShow는 네이티브 Node 모듈(예: `canvas`)을 컴파일하기 때문에 추가적인 네이티브 빌드 종속성이 필요합니다.

### 모든 플랫폼

| 도구 | 버전 | 참고 |
|------|---------|-------|
| **Python** | 3.12 | 네이티브 모듈 컴파일을 위해 `node-gyp`에서 필요 |
| **setuptools** | 최신 | `pip install setuptools`로 설치 |

### Windows

| 도구 | 참고 |
|------|-------|
| **Visual Studio** | Community 에디션으로 충분합니다 |
| **"C++를 사용한 데스크톱 개발" 워크로드** | Visual Studio 설치 중에 선택 |
| **Windows 10 SDK** | C++ 워크로드에 포함되어 있으며, 체크되어 있는지 확인 |

명령줄을 통해 Visual Studio 빌드 도구를 설치할 수 있습니다.

```bash
npm install --global windows-build-tools
```

또는 Visual Studio Community를 설치하고 설치 중에 "C++를 사용한 데스크톱 개발" 워크로드를 선택하세요.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

일반적으로 Xcode Command Line Tools면 충분합니다.

```bash
xcode-select --install
```

## 설치 확인

다음 명령을 실행하여 모든 항목이 설치되었는지 확인하세요.

```bash
node --version    # Should print v20.x.x or higher
npm --version     # Should print 10.x.x or higher
git --version     # Should print git version 2.x.x
mysql --version   # Only needed for local API development
```

## 다음 단계

- **[프로젝트 개요](./project-overview)** -- 모든 프로젝트와 각 프로젝트의 기능 보기
- **[환경 변수](./environment-variables)** -- `.env` 파일 구성하기
