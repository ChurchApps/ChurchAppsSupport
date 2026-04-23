---
title: "필수 조건"
---

# 필수 조건

<div class="article-intro">

필요한 도구는 작업할 프로젝트에 따라 다릅니다. 이 페이지는 범용 요구사항에서 플랫폼별 도구 체인에 이르기까지 개발 영역별로 구성된 모든 필수 소프트웨어를 나열합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- [프로젝트 개요](./project-overview)를 검토하여 작업할 프로젝트 결정
- 개발 머신에 관리자 액세스 권한 보유

</div>

## 모든 프로젝트

어떤 프로젝트에서 작업하든 관계없이 필수:

| 도구 | 버전 | 참고 |
|------|---------|-------|
| **Node.js** | 20+ | B1App 및 LessonsApp (Next.js 16)에는 버전 22+ 필요 |
| **npm** | Node.js와 함께 제공 | 모든 프로젝트 전체 패키지 관리자 |
| **Git** | 최신 | 각 프로젝트는 별도 저장소 |

:::tip
[nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) 또는 [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows)와 같은 Node 버전 관리자를 사용하여 Node 버전 간 쉽게 전환하세요.
:::

## 백엔드 API 개발

API를 로컬에서 실행할 계획인 경우(스테이징을 가리키는 대신):

| 도구 | 버전 | 참고 |
|------|---------|-------|
| **MySQL** | 8.0+ | 각 API 모듈은 자신의 데이터베이스 사용 |

핵심 API에 6개의 데이터베이스가 필요합니다: `membership`, `attendance`, `content`, `giving`, `messaging`, `doing`. API에는 스키마를 초기화하는 스크립트가 포함되어 있습니다 -- [API 로컬 설정](../api/local-setup) 가이드를 참조하세요.

## 모바일 앱 개발

B1Mobile, B1Checkin, LessonsScreen 또는 다른 React Native / Expo 앱의 경우:

| 도구 | 버전 | 참고 |
|------|---------|-------|
| **Expo CLI** | 최신 | 전역 설치: `npm install -g expo-cli` |
| **Android Studio** | 최신 | Android 개발에 필요 (Android SDK 포함) |
| **Xcode** | 최신 | iOS 개발에 필요 (macOS만) |

:::info
물리적 장치의 Expo Go 앱을 사용하여 Android Studio나 Xcode 없이 빠른 테스트를 수행할 수 있습니다. 그러나 프로덕션 바이너리를 빌드하려면 네이티브 도구 체인이 필요합니다.
:::

## FreeShow (데스크톱 앱) 개발

FreeShow는 네이티브 Node 모듈(예: `canvas`)을 컴파일하므로 추가 네이티브 빌드 의존성을 가집니다:

### 모든 플랫폼

| 도구 | 버전 | 참고 |
|------|---------|-------|
| **Python** | 3.12 | `node-gyp`에 의해 네이티브 모듈 컴파일에 필요 |
| **setuptools** | 최신 | `pip install setuptools`로 설치 |

### Windows

| 도구 | 참고 |
|------|-------|
| **Visual Studio** | Community 에디션으로 충분 |
| **"Desktop development with C++" workload** | Visual Studio 설치 중에 선택 |
| **Windows 10 SDK** | C++ 워크로드에 포함; 확인됨 확인 |

Visual Studio 빌드 도구를 명령줄로 설치:

```bash
npm install --global windows-build-tools
```

또는 Visual Studio Community를 설치하고 설치 중에 "Desktop development with C++" 워크로드를 선택하세요.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Xcode 명령줄 도구로 충분:

```bash
xcode-select --install
```

## 설치 확인

모든 것이 설치되었는지 확인하려면 다음 명령을 실행하세요:

```bash
node --version    # v20.x.x 이상 출력해야 함
npm --version     # 10.x.x 이상 출력해야 함
git --version     # git version 2.x.x 출력해야 함
mysql --version   # 로컬 API 개발에만 필요
```

## 다음 단계

- **[프로젝트 개요](./project-overview)** -- 모든 프로젝트 및 기능 보기
- **[환경 변수](./environment-variables)** -- `.env` 파일 구성
