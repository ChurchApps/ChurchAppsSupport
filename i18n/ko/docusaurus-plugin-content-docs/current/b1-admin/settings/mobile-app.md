---
title: "모바일 앱 설정"
description: "B1 Admin에서 B1.church 회원 앱의 내비게이션 탭, 홈 화면 타일, 로그인 안내 문구, 회원 디렉터리 개인정보 설정을 구성합니다."
---

# 모바일 앱 설정

<div class="article-intro">

모바일 앱 설정 페이지에서는 교회 회원이 **B1.church 모바일 환경(PWA)**에서 볼 내비게이션 탭을 구성할 수 있습니다. 어떤 탭을 표시할지, 각 탭이 어디로 연결될지, 그리고 탭을 어떻게 표시할지 설정할 수 있습니다.

</div>

## 교육 영상

<YouTube id="ydY7WGK16fE" title="B1에서 교회 회원 앱 맞춤 설정하기" />

:::info
여기서 설정한 탭은 B1 App에 표시되며, 회원은 이 앱을 [PWA(프로그레시브 웹 앱)로 설치](../../b1-church/getting-started/installing-pwa.md)할 수 있습니다. 교회의 설치 페이지 — `https://yourchurchname.b1.church/mobile/install` — 를 회원과 공유하세요. 이 페이지에서 기기에 앱을 설치하는 방법을 단계별로 안내하며, App Store나 Google Play에서 따로 내려받을 필요가 없습니다.
:::

<div class="prereqs">
<h4>시작하기 전에</h4>

- "교회 설정 편집" 권한이 필요합니다. 권한이 없다면 [역할 및 권한](./roles-permissions.md)을 참고하세요.
- 먼저 [교회 설정](./church-settings.md)에서 교회 이름과 브랜딩을 포함한 기본 정보를 구성하세요.

</div>

## 내비게이션 설정 접근하기

1. B1 Admin에서 [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 상단의 검색창)를 열고 **Mobile**을 펼칩니다.
2. **Navigation**(`/mobile/navigation`)을 클릭합니다.
3. Navigation 페이지에 현재 앱 탭 목록이 표시됩니다.

## 새 탭 추가하기

1. 페이지 상단의 **Add Tab** 버튼을 클릭합니다.
2. 탭 정보를 입력합니다:
   - **Name** -- 탭에 표시될 이름입니다(예: "Sermons" 또는 "Give").
   - **Icon** -- 아이콘 선택기를 클릭해 탭에 사용할 아이콘을 고릅니다.
   - **Image** -- **Select Image**(또는 **Change Image**)를 클릭해 탭에 사진을 지정합니다. 사진이 있는 탭은 앱 홈 화면에 사진 타일로 표시됩니다. [홈 화면 타일](#home-screen-tiles)을 참고하세요.
   - **Tab Type** -- Bible, Live Stream, Donation, Website 등의 옵션에서 선택합니다.
   - **URL** -- 탭이 연결할 웹 주소를 입력합니다.
   - **Visibility** -- 이 탭을 볼 수 있는 대상을 설정합니다(모든 사람, 회원만 등). **Member Directory** 탭의 경우, 이 설정은 탭 자체를 누가 볼 수 있는지만 결정합니다. 디렉터리를 누가 열 수 있는지는 Member portal 페이지의 **Show in Directory**에서 설정합니다([회원 디렉터리 및 메시지 설정](#member-directory--messaging-settings) 참고).
3. **Save Tab**을 클릭해 앱에 탭을 추가합니다.

## 기존 탭 편집하기

1. **App Tabs** 목록에서 편집할 탭을 클릭합니다.
2. 탭의 이름, 아이콘, URL, 유형 또는 공개 범위 설정을 수정합니다.
3. **Save Tab**을 클릭해 변경 사항을 적용합니다.

## 탭 순서 바꾸기

모바일 앱에 표시되는 탭 순서를 바꿀 수 있습니다. 목록에서 탭을 드래그 앤 드롭해 순서를 재배치하세요. 이 페이지에 보이는 순서가 회원이 앱에서 보게 될 순서와 같습니다.

:::info
특정 조건이 충족되면 일부 탭이 자동으로 나타날 수 있습니다. 예를 들어 방송이 진행 중일 때 Live Stream 탭이 나타날 수 있습니다. 직접 추가한 탭은 회원에게 항상 보이는 내용을 전적으로 직접 관리할 수 있게 해 줍니다.
:::

:::tip
탭 개수는 적당히 유지하세요. 대부분의 교회에는 3~5개가 적당합니다. 탭이 너무 많으면 회원이 내비게이션을 헷갈려 할 수 있습니다.
:::

## 회원 디렉터리 및 메시지 설정

같은 Mobile 섹션의 **Member portal** 항목에는 B1.church 환경에서 회원 디렉터리와 비공개 메시지를 관리하는 설정이 있습니다:

- **Directory Approval Group** -- 회원 디렉터리 정보 변경과 [계정 삭제 요청](../profile/account-deletion.md)을 검토한 뒤 적용하는 그룹입니다.
- **Show in Directory** -- 회원 디렉터리를 열 수 있는 사람과 디렉터리에 표시될 사람을 정합니다. 옵션은 **Admins Only**, **Members and Above**(기본값), **Regular Attendees and Above**, **Visitors and Above**입니다. 선택한 수준보다 회원 상태가 낮은 사람은 디렉터리를 볼 수 없고 디렉터리에도 표시되지 않습니다. **Admins Only**를 선택하면 People &gt; View 권한이 있는 직원을 제외하고는 아무도 디렉터리를 열 수 없습니다(Staff 회원 상태만으로는 권한이 부여되지 않습니다). People &gt; View 권한이 있는 직원은 이 설정과 관계없이 항상 디렉터리를 열고 모든 사람을 볼 수 있습니다. 온라인에서 직접 가입한 사람은 처음에 Guest로 등록되므로 Guest는 디렉터리에 절대 포함되지 않습니다.
- **Visibility Preference** -- 아직 개인 설정을 선택하지 않은 회원에게 적용되는 교회 전체 기본값입니다. **Address**, **Phone Number**, **Email**에 각각 드롭다운이 있으며, 공개 범위를 설정할 수 있는 모든 곳에서 같은 다섯 가지 수준을 사용합니다:
  - **Everyone** -- 익명 방문자를 포함해 누구에게나 공개됩니다.
  - **Members** -- Member 또는 Staff 기록이 있는 사람에게만 공개됩니다.
  - **Groups Only** -- 이 사람과 같은 그룹에 속한 사람과 직원에게만 공개됩니다.
  - **My Group Leaders and Staff** -- 이 사람이 속한 그룹의 리더와 직원에게만 공개됩니다.
  - **Staff Only** -- 직원(회원 상태가 Staff이거나 People &gt; View 권한이 있는 사람)과 본인에게만 공개됩니다.

  이 수준에서 "직원"은 회원 상태가 Staff이거나 People &gt; View 권한이 있는 사람을 뜻합니다. 그룹 변경은 즉시 적용됩니다. 그룹에 새로 가입하거나 그룹 리더로 지정된 사람은 다시 로그인하지 않아도 해당 그룹 회원의 **Groups Only** 또는 **My Group Leaders and Staff** 정보를 볼 수 있습니다.

  회원은 B1.church PWA의 프로필 **Privacy** 탭에서 자신의 기록에 대해 이 기본값을 변경할 수 있습니다. [프로필 편집하기](/docs/b1-church/getting-started/me-page)를 참고하세요.
- **Minimum Age for Private Messages** -- 아동 보호를 위한 설정입니다. 두 사람 중 한 명이라도 생년월일 기준 이 나이보다 어리면 B1은 **새로운** 비공개 메시지 대화를 열지 않습니다. 생년월일이 없으면 가정 내 역할을 대신 사용합니다. 이 나이보다 어린 사람도 디렉터리에는 그대로 표시되며, 차단되는 것은 **양방향**의 1:1 메시지뿐입니다. 직원을 포함해 누구에게도 예외는 없습니다. 그룹 대화와 자녀의 부모에게 보내는 메시지는 여전히 가능합니다. 선택지는 Off, 13, 16, 18이며 기본값은 **18**입니다. 기존 대화에는 영향을 주지 않습니다.

:::tip
최소 연령 확인은 생년월일을 기준으로 하므로, 교회의 자녀 회원 생년월일이 입력되어 있는지 확인하세요. 이 설정은 [체크인 안전 설정](../attendance/checkin-safety.md)과 같은 아동 보호 기능 계열에 속합니다.
:::

### 홈 화면 로그인 안내

로그인하지 않은 상태로 앱의 [홈 화면](/docs/b1-church/getting-started/navigating#home)을 여는 방문자에게는 짧은 안내 문구가 표시됩니다. 기본 문구는 *"그룹, 헌금 등을 확인하려면 로그인하세요."*이며, 옆에 **Sign In**(로그인) 버튼이 있습니다. 같은 Member portal 페이지(`/mobile/b1-mobile`)의 **Home screen sign-in prompt** 설정에서 이 내용을 바꿀 수 있습니다:

- **Show sign-in prompt on the app home screen** -- 끄면 홈 화면에서 안내 문구와 **Sign In** 버튼이 모두 사라집니다. 방문자는 앱 메뉴에서 여전히 로그인할 수 있습니다.
- **Sign-in prompt text** -- 기본 문구 대신 직접 작성한 메시지를 입력합니다(최대 150자). 비워 두면 기본 문구가 사용됩니다. 안내 문구를 끈 상태에서는 이 입력란이 비활성화됩니다.

**Save**를 클릭해 적용합니다. **Saved** 메시지가 뜨면 저장된 것입니다. 저장하면 앱의 캐시된 설정이 새로 고쳐지므로, 다음에 홈 화면이 로드될 때 변경 사항이 반영됩니다.

### 홈 화면 타일

사진이 있는 탭(아래 [새 탭 추가하기](#adding-a-new-tab)의 **Image** 참고)은 앱의 [홈 화면](/docs/b1-church/getting-started/navigating#home)에 교회 이름이 붙은 섹션 안에 사진 타일로 나타납니다. 사진을 지정한 경우 Verse of the Day 탭도 포함됩니다. 사진이 있는 탭은 탭 바에도 함께 표시됩니다.

같은 Member portal 페이지(`/mobile/b1-mobile`)의 **Home screen tiles** 설정에서 이 타일의 배치를 정합니다. **Layout**을 선택하세요:

- **Grid** -- 한 줄에 타일 두 개씩 배치합니다(기본값). 타일 개수가 홀수이면 첫 번째 타일이 가로 전체를 차지합니다.
- **Scrolling row** -- 회원이 좌우로 밀어서 볼 수 있는 한 줄 타일 목록입니다.
- **Scrolling (automatic)** -- 좌우로 넘기는 한 줄 목록과 같지만, 약 4초마다 타일이 자동으로 한 칸씩 넘어가며 마지막 타일 뒤에는 첫 번째 타일로 돌아갑니다. 회원이 터치하거나, 마우스를 올리거나, 탭으로 목록에 들어가면 일시 정지되고, 몇 초 뒤 다시 시작합니다. 동작 줄이기 설정이 켜진 기기에서는 목록이 움직이지 않고 **Scrolling row**처럼 작동합니다.
- **List** -- 각 탭 이름 옆에 작은 사진 썸네일이 있는 목록입니다.

두 가지 스크롤 레이아웃에서는 타일이 화면 너비에 다 들어가지 않으면 타일 아래에 점 목록이 나타납니다. 타일마다 점이 하나씩 있고, 현재 타일의 점은 채워져 표시됩니다. 회원은 점을 탭해 해당 타일로 바로 이동할 수 있습니다.

**Save**를 클릭해 적용합니다.

### 홈 화면 섹션

로그인한 회원은 항상 [Me 페이지](/docs/b1-church/getting-started/me-page)에서 자신의 출석 기록과 제출한 양식을 볼 수 있습니다. 같은 Member portal 페이지(`/mobile/b1-mobile`)의 **Home screen sections** 스위치를 켜면 이 정보를 홈 화면에도 표시할 수 있습니다:

- **Show My Attendance on Home** -- 최근 90일 동안 출석한 횟수, 가장 최근 방문 두 번, 그리고 전체 출석 목록으로 이동하는 **History** 링크가 포함된 **My Attendance** 섹션을 추가합니다.
- **Show My Forms on Home** -- 회원이 최근에 제출한 양식 두 개와 **All forms** 링크가 포함된 **My Forms** 섹션을 추가합니다.

두 옵션 모두 기본적으로 꺼져 있습니다. 섹션은 로그인한 회원이면서 표시할 기록이 하나 이상 있을 때만 나타납니다. **Save**를 클릭해 적용합니다.

## 이 탭이 표시되는 곳

여기서 설정한 탭은 회원이 `https://yourchurchname.b1.church`의 아무 페이지에서나 설치하는 **B1.church PWA**에 표시됩니다. 이 페이지에서 변경한 내용은 회원이 다음번에 앱을 열 때 반영됩니다.

휴대폰에서는 하단 탭 바에 **Home**, 탭 최대 세 개, **More**가 표시되며, 컴퓨터에서는 상단 헤더에 탭 최대 다섯 개가 표시됩니다. 기본 제공 화면(Sermons, Giving, Groups 등)이 먼저 자리를 차지하고, 남은 자리는 **Internal Page** 탭이 채웁니다. **External URL** 탭과 **Verse of the Day** 탭은 자리를 차지하지 못합니다. 자리에 들어가지 못한 탭을 포함해 모든 탭은 앱의 **More** 페이지에 나열됩니다.

**Folder** 탭 안에 넣은 탭은 예외입니다. 이 탭들은 폴더 화면에만 표시되며, 회원이 폴더를 탭해야 볼 수 있습니다. 폴더 화면에서는 모든 탭에 이미지가 있을 때 사진 타일로, 그렇지 않으면 목록으로 보여 줍니다. 회원이 볼 수 있는 탭이 하나도 없는 폴더는 그 회원에게 숨겨집니다. [폴더 탭](../../b1-church/getting-started/navigating.md#folder-tabs)을 참고하세요. 회원이 보게 될 화면은 [B1App 둘러보기](../../b1-church/getting-started/navigating.md)에서 확인할 수 있습니다.

## 다음 단계

- [교회 설정](./church-settings.md) -- 교회 정보와 브랜딩을 구성합니다
- [역할 및 권한](./roles-permissions.md) -- 팀의 접근 권한을 관리합니다
