---
title: "모바일 앱 설정"
---

# 모바일 앱 설정

<div class="article-intro">

모바일 앱 설정 페이지에서 교인이 사용하는 **B1.church 모바일 경험(PWA)**에 나타나는 내비게이션 탭을 구성할 수 있습니다. 어떤 탭을 보여 줄지, 각 탭이 어디로 연결될지, 탭을 어떻게 표시할지 정할 수 있습니다.

</div>

## 교육 동영상

<YouTube id="ydY7WGK16fE" title="B1에서 교회 교인 앱 맞춤 설정하기" />

:::info 기본 B1 모바일 앱은 지원이 중단되었습니다
여기서 설정한 탭은 [B1.church 프로그레시브 웹 앱(PWA)](/docs/b1-church/getting-started/installing-pwa)을 통해 제공되며, 이 PWA가 기본 B1 모바일 앱을 대체했습니다. 교인에게 교회의 설치 페이지인 `https://yourchurchname.b1.church/mobile/install`을 공유하세요. 이 페이지는 앱스토어나 Google Play에서 내려받을 필요 없이 기기에 앱을 설치하는 방법을 안내합니다.
:::

<div class="prereqs">
<h4>시작하기 전에</h4>

- "Edit Church Settings"(교회 설정 편집) 권한이 필요합니다. 접근 권한이 없다면 [역할 및 권한](./roles-permissions.md)을 참고하세요.
- 교회 이름과 브랜딩을 포함해 먼저 [교회 설정](./church-settings.md)을 구성하세요.

</div>

## 내비게이션 설정 열기

1. B1 Admin에서 [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 위의 검색창)를 열고 **Mobile**을 펼치세요.
2. **Navigation**(`/mobile/navigation`)을 클릭하세요.
3. Navigation 페이지에는 현재 앱 탭이 표시됩니다.

## 새 탭 추가하기 {#adding-a-new-tab}

1. 페이지 위의 **Add Tab** 버튼을 클릭하세요.
2. 탭 세부 정보를 입력하세요.
   - **Name** -- 탭에 표시되는 이름(예: "Sermons" 또는 "Give").
   - **Icon** -- 아이콘 선택기를 클릭해 탭의 아이콘을 고르세요.
   - **Image** -- **Select Image**(또는 **Change Image**)를 클릭해 탭에 사진을 넣으세요. 사진이 있는 탭은 앱의 홈 화면에 사진 타일로 나타납니다. [홈 화면 타일](#home-screen-tiles)을 참고하세요.
   - **Tab Type** -- Bible, Live Stream, Donation, Website 등 옵션 중에서 고르세요.
   - **URL** -- 탭이 연결될 웹 주소를 입력하세요.
   - **Visibility** -- 이 탭을 누가 볼 수 있는지 정하세요(모든 사람, 회원만 등). **Member Directory** 탭의 경우, 이 설정은 탭을 누가 보는지만 결정합니다. 디렉터리를 누가 열 수 있는지는 회원 포털 페이지의 **Show in Directory**에서 정합니다([회원 디렉터리 및 메시지 설정](#member-directory--messaging-settings) 참고).
3. **Save Tab**을 클릭해 탭을 앱에 추가하세요.

## 기존 탭 편집하기

1. **App Tabs** 목록에서 기존 탭을 클릭하세요.
2. 탭의 이름, 아이콘, URL, 유형, 표시 설정을 업데이트하세요.
3. **Save Tab**을 클릭해 변경 사항을 적용하세요.

## 탭 순서 바꾸기

모바일 앱에서 탭이 나타나는 순서를 바꿀 수 있습니다. 목록에서 탭을 끌어다 놓아 재배열하세요. 이 페이지에 보이는 순서가 교인이 앱에서 보게 될 순서와 같습니다.

:::info
일부 탭은 특정 조건이 충족되면 자동으로 나타날 수 있습니다. 예를 들어 스트림이 진행 중일 때 Live Stream 탭이 나타날 수 있습니다. 직접 추가한 탭은 교인이 언제나 무엇을 볼지 완전히 제어할 수 있게 해 줍니다.
:::

:::tip
탭 개수를 관리하기 쉽게 유지하세요. 대부분의 교회에는 3~5개의 탭이 적당합니다. 탭이 너무 많으면 교인이 내비게이션을 헷갈릴 수 있습니다.
:::

## 회원 디렉터리 및 메시지 설정 {#member-directory--messaging-settings}

같은 Mobile 섹션의 **Member portal** 항목에는 B1.church 경험에서 회원 디렉터리와 비공개 메시지를 관리하는 설정이 있습니다.

- **Directory Approval Group**(디렉터리 승인 그룹) -- 회원 디렉터리 업데이트와 [계정 삭제 요청](../profile/account-deletion.md)을 적용 전에 검토하는 그룹입니다.
- **Show in Directory**(디렉터리에 표시) -- 누가 회원 디렉터리를 열 수 있고 누가 목록에 나타나는지 정합니다. 옵션은 **Admins Only**(관리자만), **Members and Above**(회원 이상, 기본값), **Regular Attendees and Above**(정기 출석자 이상), **Visitors and Above**(방문자 이상)입니다. 멤버십 상태가 선택한 수준보다 낮은 사람은 디렉터리를 볼 수 없으며 목록에도 나타나지 않습니다. **Admins Only**를 선택하면 디렉터리는 People > View 권한이 있는 직원(Staff 멤버십 상태만으로는 충분하지 않습니다)을 제외하고는 아무도 열 수 없습니다. 이 권한이 있는 직원은 이 설정과 관계없이 언제나 디렉터리를 열고 모든 사람을 볼 수 있습니다. 게스트는 절대 포함되지 않습니다. 온라인으로 직접 가입한 사람은 게스트로 시작하기 때문입니다.
- **Visibility Preference**(공개 설정 기본값) -- 아직 자신의 설정을 고르지 않은 회원에게 적용되는 교회 전체 기본값입니다. **Address**(주소), **Phone Number**(전화번호), **Email**(이메일) 각각에 드롭다운이 있으며, 공개 설정이 있는 모든 곳에서 쓰는 다섯 가지 수준 중에서 고를 수 있습니다.
  - **Everyone**(모든 사람) -- 익명 방문자를 포함해 누구에게나 보입니다.
  - **Members**(회원) -- 회원 또는 직원 기록이 있는 사람에게만 보입니다.
  - **Groups Only**(그룹만) -- 이 사람과 그룹을 함께 쓰는 사람과 직원에게만 보입니다.
  - **My Group Leaders and Staff**(내 그룹 리더와 직원) -- 이 사람이 속한 그룹의 리더와 직원에게만 보입니다.
  - **Staff Only**(직원만) -- 직원(멤버십 상태가 Staff이거나 People > View 권한이 있는 사람)과 본인에게만 보입니다.

  이 수준에서 "직원"은 멤버십 상태가 Staff이거나 People > View 권한이 있는 사람을 뜻합니다. 그룹 변경은 즉시 적용됩니다. 그룹에 가입하거나 그룹 리더가 된 사람은, 로그아웃했다가 다시 로그인하지 않아도 그 그룹 구성원의 **Groups Only** 또는 **My Group Leaders and Staff** 정보를 볼 수 있습니다.

  회원은 B1.church PWA의 프로필 **Privacy** 탭에서 자신의 기록에 대한 이 기본값을 바꿀 수 있습니다. [프로필 수정](/docs/b1-church/getting-started/me-page)을 참고하세요.
- **Minimum Age for Private Messages**(비공개 메시지 최소 연령) -- 아동 보호 설정입니다. 두 사람 중 한 명이라도 생년월일 기준으로 이 나이보다 어리면 B1은 **새** 비공개 메시지 대화를 열지 않습니다(생년월일이 없으면 가족 역할을 대신 사용합니다). 이 연령 미만인 사람도 디렉터리에는 완전히 보이며, 차단되는 것은 직접 메시지뿐입니다. 이 제한은 **양방향**으로 적용되며, 직원을 포함한 모든 사람에게 적용됩니다. 그룹 대화와 아이의 부모에게 메시지를 보내는 것은 여전히 가능합니다. 선택지는 Off, 13, 16, 18이며, 기본값은 **18**입니다. 기존 대화에는 영향을 주지 않습니다.

:::tip
최소 연령 확인은 생년월일을 기준으로 하므로, 교인 중 아이들의 생년월일을 꼭 입력해 두세요. 이 설정은 [체크인 안전 설정](../attendance/checkin-safety.md)과 같은 아동 보호 설정 계열에 속합니다.
:::

### 홈 화면 로그인 안내 {#home-screen-sign-in-prompt}

앱의 [홈 화면](/docs/b1-church/getting-started/navigating#home)을 로그인하지 않고 여는 방문자는 **Sign In** 버튼 옆에 짧은 안내 문구를 보게 됩니다. 기본 문구는 *"Sign in to see your groups, giving, and more."*(로그인하면 그룹, 헌금 등을 볼 수 있습니다.)입니다. 같은 회원 포털 페이지(`/mobile/b1-mobile`)의 **Home screen sign-in prompt** 설정에서 이 문구를 바꿀 수 있습니다.

- **Show sign-in prompt on the app home screen**(앱 홈 화면에 로그인 안내 표시) -- 이 항목을 끄면 홈 화면에서 안내 문구와 **Sign In** 버튼이 모두 사라집니다. 방문자는 여전히 앱 메뉴에서 로그인할 수 있습니다.
- **Sign-in prompt text**(로그인 안내 문구) -- 기본 문구를 원하는 메시지로 바꿀 수 있습니다(최대 150자). 비워 두면 기본 문구가 사용됩니다. 안내 문구를 끄면 이 상자는 비활성화됩니다.

**Save**를 클릭해 적용하세요. **Saved** 메시지가 나타나면 변경이 확인된 것입니다. 저장하면 앱의 캐시된 설정이 새로 고쳐지므로, 홈 화면이 다음에 로드될 때 변경 사항이 보입니다.

### 홈 화면 타일 {#home-screen-tiles}

사진이 있는 탭(아래 [새 탭 추가하기](#adding-a-new-tab)의 **Image** 참고)은 앱의 [홈 화면](/docs/b1-church/getting-started/navigating#home)에 사진 타일로 나타나며, 교회 이름이 붙은 섹션에 표시됩니다. 사진을 넣은 말씀 묵상(Verse of the Day) 탭도 포함됩니다. 사진이 있는 탭은 탭 바에도 함께 나타납니다.

같은 회원 포털 페이지(`/mobile/b1-mobile`)의 **Home screen tiles**(홈 화면 타일) 설정에서 이 타일의 배치를 정합니다. **Layout**(배치)을 고르세요.

- **Grid**(격자) -- 한 줄에 타일 두 개씩 배치합니다(기본값). 타일 수가 홀수이면 첫 번째 타일이 전체 너비를 차지합니다.
- **Scrolling row**(가로 스크롤 줄) -- 교인이 좌우로 밀어서 보는 타일 한 줄입니다.
- **Scrolling (automatic)**(자동 스크롤) -- 같은 가로 줄이지만 스스로 움직입니다. 약 4초마다 타일 하나씩 넘어가고, 끝에 도달하면 처음으로 돌아갑니다. 교인이 줄을 터치하거나, 마우스를 올리거나, 탭으로 이동하면 멈추고, 몇 초 뒤 다시 움직입니다. 동작 줄이기가 설정된 기기에서는 줄이 움직이지 않으며 **Scrolling row**처럼 동작합니다.
- **List**(목록) -- 각 탭 이름 옆에 작은 사진 미리 보기가 있는 목록입니다.

**Save**를 클릭해 적용하세요.

### 홈 화면 섹션 {#home-screen-sections}

로그인한 회원은 언제나 [내 페이지](/docs/b1-church/getting-started/me-page)에서 자신의 출석 기록과 제출한 양식을 볼 수 있습니다. 같은 회원 포털 페이지(`/mobile/b1-mobile`)의 **Home screen sections**(홈 화면 섹션) 스위치를 켜면 이 내용을 홈 화면에도 표시할 수 있습니다.

- **Show My Attendance on Home**(홈에 내 출석 표시) -- **My Attendance**(내 출석) 섹션을 추가합니다. 최근 90일 동안 회원이 출석한 횟수, 가장 최근 방문 두 번, 전체 출석 목록으로 이동하는 **History** 링크를 보여 줍니다.
- **Show My Forms on Home**(홈에 내 양식 표시) -- **My Forms**(내 양식) 섹션을 추가합니다. 회원이 제출한 가장 최근 양식 두 개와 **All forms** 링크를 보여 줍니다.

두 항목 모두 기본값은 꺼짐입니다. 섹션은 로그인한 회원 중에서 보여 줄 기록이 하나 이상 있는 사람에게만 나타납니다. **Save**를 클릭해 적용하세요.

## 이 탭이 나타나는 위치

여기서 설정한 탭은 회원이 `https://yourchurchname.b1.church`의 어느 페이지에서든 설치하는 **B1.church PWA**에 표시됩니다. 이 페이지에서 바꾼 내용은 회원이 다음에 앱을 열 때 반영됩니다.

휴대폰에서는 하단 탭 바에 **Home**, 탭 최대 세 개, **More**가 표시됩니다. 컴퓨터에서는 머리글에 탭 최대 다섯 개가 표시됩니다. 내장 화면(예: Sermons, Giving, Groups)이 먼저 자리를 차지하며, 남은 자리는 **Internal Page** 탭이 채웁니다. **External URL** 탭과 **Verse of the Day** 탭은 자리를 차지하지 못합니다. 자리에 들어가지 못한 탭을 포함해 모든 탭은 앱의 **More** 페이지에 나열됩니다. 교인이 보게 되는 화면은 [B1App 둘러보기](/docs/b1-church/getting-started/navigating)를 참고하세요. (아직 기존 [B1 Mobile 네이티브 앱](/docs/b1-mobile/)을 쓰는 회원을 위해 이 앱에서도 탭이 표시되지만, 이 앱은 지원이 중단되어 더 이상 업데이트되지 않습니다.)

## 다음 단계

- [교회 설정](./church-settings.md) -- 교회 정보와 브랜딩 설정하기
- [역할 및 권한](./roles-permissions.md) -- 팀의 접근 권한 관리하기
