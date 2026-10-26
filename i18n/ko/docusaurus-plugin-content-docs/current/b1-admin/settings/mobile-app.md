---
title: "모바일 앱 설정"
---

# 모바일 앱 설정

<div class="article-intro">

모바일 앱 설정 페이지에서는 교인들이 사용하는 **B1.church 모바일 환경(PWA)**에 표시되는 내비게이션 탭을 구성할 수 있습니다. 어떤 탭을 표시할지, 각 탭이 어디로 연결되는지, 그리고 탭이 어떻게 보일지를 제어할 수 있습니다.

</div>

:::info 네이티브 B1 Mobile 앱은 더 이상 지원되지 않습니다
여기에서 구성한 탭은 [B1.church 프로그레시브 웹 앱(PWA)](/docs/b1-church/getting-started/installing-pwa)을 통해 제공되며, 이 PWA가 네이티브 B1 Mobile 앱을 대체했습니다. 교인들에게 교회의 설치 페이지인 `https://yourchurchname.b1.church/mobile/install`을 공유하세요. 이 페이지에서 앱스토어나 Google Play 다운로드 없이 기기에 앱을 설치하는 방법을 안내합니다.
:::

<div class="prereqs">
<h4>시작하기 전에</h4>

- "Edit Church Settings" 권한이 필요합니다. 이 권한이 없다면 [역할 및 권한](./roles-permissions.md)을 참고하세요.
- 먼저 교회 이름과 브랜딩을 포함하여 [교회 설정](./church-settings.md)을 구성하세요.

</div>

## 내비게이션 설정 열기

1. B1 Admin에서 [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 상단의 검색창)를 열고 **Mobile**을 펼칩니다.
2. **Navigation**(`/mobile/navigation`)을 클릭합니다.
3. Navigation 페이지에 현재 앱 탭이 표시됩니다.

## 새 탭 추가하기

1. 페이지 상단의 **Add Tab** 버튼을 클릭합니다.
2. 탭 세부 정보를 입력합니다.
   - **Name** -- 탭에 표시될 레이블입니다(예: "Sermons" 또는 "Give").
   - **Icon** -- 아이콘 선택기를 클릭하여 탭의 아이콘을 고릅니다.
   - **Image** -- **Select Image**(또는 **Change Image**)를 클릭하여 탭에 사진을 지정합니다. 사진이 있는 탭은 앱 홈 화면에 사진 타일로 표시됩니다. [홈 화면 타일](#home-screen-tiles)을 참고하세요.
   - **Tab Type** -- Bible, Live Stream, Donation, Website 등 옵션 중에서 선택합니다.
   - **URL** -- 탭이 연결할 웹 주소를 입력합니다.
   - **Visibility** -- 이 탭을 볼 수 있는 사용자를 제어합니다(모든 사람, 구성원만 등). **Member Directory** 탭의 경우 이 설정은 탭 자체를 누가 볼 수 있는지만 제어합니다. 디렉터리를 열 수 있는 사용자는 Member portal 페이지의 **Show in Directory**로 설정합니다([Member Directory & Messaging Settings](#member-directory--messaging-settings) 참고).
3. **Save Tab**을 클릭하여 앱에 탭을 추가합니다.

## 기존 탭 편집하기

1. **App Tabs** 목록에서 기존 탭을 클릭합니다.
2. 탭의 이름, 아이콘, URL, 유형 또는 공개 설정을 수정합니다.
3. **Save Tab**을 클릭하여 변경 사항을 적용합니다.

## 탭 순서 바꾸기

모바일 앱에 표시되는 탭 순서를 바꿀 수 있습니다. 목록에서 탭을 끌어다 놓아 순서를 재배열하세요. 이 페이지에 표시된 순서가 교인들이 앱에서 보게 될 순서와 같습니다.

:::info
특정 조건이 충족되면 일부 탭이 자동으로 나타날 수 있습니다. 예를 들어 방송이 진행 중일 때 Live Stream 탭이 나타날 수 있습니다. 직접 추가한 탭은 교인들이 항상 보는 내용을 완전히 제어할 수 있게 해 줍니다.
:::

:::tip
탭 개수를 적당하게 유지하세요. 대부분의 교회에는 3~5개가 적당합니다. 탭이 너무 많으면 교인들이 내비게이션을 헷갈릴 수 있습니다.
:::

## Member Directory & Messaging Settings

같은 Mobile 섹션의 **Member portal** 항목에는 B1.church 환경의 구성원 디렉터리와 비공개 메시지를 관리하는 설정이 있습니다.

- **Directory Approval Group** -- 구성원 디렉터리 업데이트와 [계정 삭제 요청](../profile/account-deletion.md)이 적용되기 전에 검토하는 그룹입니다.
- **Show in Directory** -- 구성원 디렉터리를 열 수 있는 사람과 디렉터리에 표시되는 사람을 정합니다. 선택지는 **Admins Only**, **Members and Above**(기본값), **Regular Attendees and Above**, **Visitors and Above**입니다. 교인 상태가 선택한 수준보다 낮은 사람은 디렉터리를 보거나 목록에 나타나지 않습니다. **Admins Only**를 선택하면 People > View 권한이 있는 직원(Staff 교인 상태만으로는 충분하지 않음)을 제외하고는 아무도 디렉터리를 볼 수 없습니다. 권한이 있는 직원은 이 설정과 관계없이 항상 디렉터리를 열고 모든 사람을 볼 수 있습니다. 온라인에서 직접 등록한 사람은 모두 Guest로 시작하므로 Guest는 항상 제외됩니다.
- **Visibility Preference** -- 아직 자신의 설정을 고르지 않은 구성원에 대한 교회 전체의 기본값을 정합니다. **Address**, **Phone Number**, **Email**에는 각각 드롭다운이 있으며, 공개 설정이 적용되는 모든 곳에서 같은 다섯 가지 수준을 사용합니다.
  - **Everyone** -- 익명 방문자를 포함하여 누구에게나 보입니다.
  - **Members** -- Member 또는 Staff 기록이 있는 사람에게만 보입니다.
  - **Groups Only** -- 이 사람과 같은 그룹에 속한 사람과 직원에게만 보입니다.
  - **My Group Leaders and Staff** -- 이 사람이 속한 그룹의 리더와 직원에게만 보입니다.
  - **Staff Only** -- 직원(교인 상태가 Staff이거나 People > View 권한이 있는 사람)과 본인에게만 보입니다.

  이 수준에서 "직원"은 교인 상태가 Staff이거나 People > View 권한이 있는 모든 사람을 뜻합니다. 그룹 변경은 즉시 적용됩니다. 그룹에 새로 가입하거나 그룹 리더로 지정된 사람은 로그아웃했다가 다시 로그인하지 않아도 해당 그룹 구성원의 **Groups Only** 또는 **My Group Leaders and Staff** 정보를 볼 수 있습니다.

  구성원은 B1.church PWA에서 프로필의 **Privacy** 탭을 통해 자신의 기록에 대해 이 기본값을 재정의할 수 있습니다. [프로필 편집하기](/docs/b1-church/getting-started/me-page)를 참고하세요.
- **Minimum Age for Private Messages** -- 아동 보호 설정입니다. 두 사람 중 한 명이라도 이 나이 미만이면 B1은 **새로운** 비공개 메시지 대화를 열지 않습니다. 나이는 생년월일을 기준으로 판단하며, 생년월일이 없으면 가족 역할을 대신 사용합니다. 이 나이 미만의 사람도 디렉터리에는 그대로 표시되며, 차단되는 것은 **양방향** 직접 메시지뿐입니다. 직원을 포함한 모든 사람에게 적용됩니다. 그룹 대화와 자녀의 부모에게 보내는 메시지는 계속 가능합니다. 선택지는 Off, 13, 16, 18이며 기본값은 **18**입니다. 기존 대화에는 영향을 주지 않습니다.

:::tip
최소 나이 확인은 생년월일을 기준으로 하므로, 교회의 자녀들에 대해 생년월일을 반드시 입력하세요. 이 설정은 [체크인 안전 관리](../attendance/checkin-safety.md)와 같은 아동 보호 기능에 속합니다.
:::

### 홈 화면 로그인 안내

로그인하지 않고 앱의 [홈 화면](/docs/b1-church/getting-started/navigating#home)을 여는 방문자에게는 짧은 안내 문구가 표시됩니다. 기본 문구는 *"Sign in to see your groups, giving, and more."*이며, **Sign In** 버튼과 함께 나타납니다. 같은 Member portal 페이지(`/mobile/b1-mobile`)의 **Home screen sign-in prompt** 설정에서 이 문구를 변경할 수 있습니다.

- **Show sign-in prompt on the app home screen** -- 끄면 홈 화면에서 안내 문구와 **Sign In** 버튼이 모두 숨겨집니다. 방문자는 앱 메뉴에서 계속 로그인할 수 있습니다.
- **Sign-in prompt text** -- 기본 문구를 원하는 메시지로 바꿉니다(최대 150자). 비워 두면 기본 문구가 사용됩니다. 안내 문구를 끄면 이 입력란은 비활성화됩니다.

**Save**를 클릭하여 적용합니다. **Saved** 메시지가 나타나면 변경이 저장된 것입니다. 저장하면 앱의 캐시된 설정이 새로 고쳐지므로, 다음에 홈 화면을 불러올 때 변경 사항이 나타납니다.

### 홈 화면 타일

사진이 있는 탭([새 탭 추가하기](#adding-a-new-tab)의 **Image** 참고)은 앱의 [홈 화면](/docs/b1-church/getting-started/navigating#home)에 교회 이름으로 된 섹션 안에 사진 타일로 표시됩니다. 사진을 지정했다면 Verse of the Day 탭도 포함됩니다. 사진이 있는 탭은 탭 바에도 계속 표시됩니다.

같은 Member portal 페이지(`/mobile/b1-mobile`)의 **Home screen tiles** 설정에서 타일의 배치를 정합니다. **Layout**을 선택하세요.

- **Grid** -- 한 줄에 타일 두 개씩 배치합니다(기본값). 타일 개수가 홀수이면 첫 번째 타일이 전체 너비를 차지합니다.
- **Scrolling row** -- 교인들이 좌우로 밀어서 볼 수 있는 한 줄의 타일입니다.
- **Scrolling (automatic)** -- 좌우로 스크롤되는 한 줄이지만, 약 4초마다 한 타일씩 자동으로 넘어가고 끝에 도달하면 처음으로 돌아갑니다. 교인이 줄을 터치하거나, 마우스를 올리거나, 탭으로 이동하면 일시 정지되고, 몇 초 뒤 다시 시작합니다. 동작 줄이기가 설정된 기기에서는 줄이 움직이지 않고 **Scrolling row**처럼 동작합니다.
- **List** -- 각 탭 이름 옆에 작은 사진 썸네일이 있는 목록입니다.

**Save**를 클릭하여 적용합니다.

### 홈 화면 섹션

로그인한 구성원은 언제나 [나 페이지(Me page)](/docs/b1-church/getting-started/me-page)에서 자신의 출석 기록과 제출한 양식을 볼 수 있습니다. 같은 Member portal 페이지(`/mobile/b1-mobile`)의 **Home screen sections** 설정을 켜면 이 정보를 홈 화면에도 표시할 수 있습니다.

- **Show My Attendance on Home** -- **My Attendance** 섹션을 추가합니다. 이 섹션에는 지난 90일 동안의 출석 횟수, 가장 최근 방문 두 번, 전체 출석 목록으로 이동하는 **History** 링크가 표시됩니다.
- **Show My Forms on Home** -- **My Forms** 섹션을 추가합니다. 이 섹션에는 가장 최근 양식 제출 두 건과 **All forms** 링크가 표시됩니다.

두 설정은 기본적으로 꺼져 있습니다. 섹션은 로그인한 구성원이고 표시할 기록이 하나 이상 있을 때만 나타납니다. **Save**를 클릭하여 적용합니다.

## 탭이 표시되는 위치

여기서 구성한 탭은 교인들이 `https://yourchurchname.b1.church`의 어느 페이지에서든 설치하는 **B1.church PWA**에 표시됩니다. 이 페이지에서 바꾼 내용은 교인이 앱을 다음에 열 때 반영됩니다.

휴대폰에서는 하단 탭 바에 **Home**, 탭 최대 3개, **More**가 표시되고, 컴퓨터에서는 상단 헤더에 탭 최대 5개가 표시됩니다. Sermons, Giving, Groups 같은 기본 화면이 먼저 자리를 차지하며, **Internal Page** 탭은 남은 자리를 채웁니다. **External URL** 탭과 **Verse of the Day** 탭은 자리를 차지하지 못합니다. 자리에 들어가지 못한 탭을 포함한 모든 탭은 앱의 **More** 페이지에 나열됩니다. 구성원이 보게 되는 화면은 [B1App 둘러보기](/docs/b1-church/getting-started/navigating)를 참고하세요. (아직 이 앱을 사용하는 구성원을 위해 기존 [B1 Mobile 네이티브 앱](/docs/b1-mobile/)에서도 탭이 표시되지만, 해당 앱은 지원이 중단되어 더 이상 업데이트되지 않습니다.)

## 다음 단계

- [교회 설정](./church-settings.md) -- 교회 정보와 브랜딩을 구성합니다.
- [역할 및 권한](./roles-permissions.md) -- 팀의 접근 권한을 관리합니다.
