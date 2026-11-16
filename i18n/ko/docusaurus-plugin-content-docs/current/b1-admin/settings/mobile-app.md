---
title: "모바일 앱 설정"
description: "B1 Admin에서 B1.church 구성원 앱의 탐색 탭, 홈 화면 타일, 로그인 안내, 회원 디렉터리 개인정보 설정을 구성하세요."
---

# 모바일 앱 설정 {#mobile-app-settings}

<div class="article-intro">

모바일 앱 설정 페이지에서는 교회 구성원이 **B1.church 모바일 환경(PWA)**에서 보게 될 탐색 탭을 구성할 수 있습니다. 어떤 탭을 보이게 할지, 각 탭이 어디로 연결될지, 어떻게 표시할지 제어합니다.

</div>

## 교육 동영상 {#training-video}

<YouTube id="ydY7WGK16fE" title="B1에서 교회 구성원 앱 맞춤 설정하기" />

:::info
여기에서 구성한 탭은 구성원이 [프로그레시브 웹 앱(PWA)으로 설치](../../b1-church/getting-started/installing-pwa.md)할 수 있는 B1 App에 나타납니다. 교회의 설치 페이지 — `https://yourchurchname.b1.church/mobile/install` — 를 구성원에게 공유하세요. 이 페이지는 앱 스토어나 Google Play 다운로드 없이 기기에 앱을 설치하는 방법을 안내합니다.
:::

<div class="prereqs">
<h4>시작하기 전에</h4>

- "Edit Church Settings"(교회 설정 편집) 권한이 필요합니다. 접근 권한이 없다면 [역할 및 권한](./roles-permissions.md)을 참고하세요.
- 먼저 교회 이름과 브랜딩을 포함하여 [교회 설정](./church-settings.md)을 구성하세요

</div>

## 탐색 설정 접근하기 {#accessing-navigation-settings}

1. B1 Admin에서 [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 상단의 검색창)를 열고 **Mobile**(모바일)을 펼치세요.
2. **Navigation**(탐색)(`/mobile/navigation`)을 클릭하세요. 보려면 **Edit Content**(콘텐츠 편집) 권한이 필요합니다.
3. **App Tabs**(앱 탭) 목록에는 현재 탭이 순서대로, 각각의 표시 여부와 함께 나타납니다. 폴더 안의 탭은 폴더 아래에 들여쓰기되어 표시됩니다.

모바일 메뉴에는 **App Theme**(앱 테마), **Member portal**(회원 포털), **B1 Check-In**(B1 체크인), **Labels**(라벨), **Push Notifications**(푸시 알림)도 있습니다. App Theme과 Member portal은 아래에서 다룹니다. 알림 예약에 대해서는 [푸시 알림](#push-notifications)을 참고하세요.

## 새 탭 추가하기 {#adding-a-new-tab}

1. 페이지 상단의 **Add Tab**(탭 추가) 버튼을 클릭하세요.
2. 탭 세부 정보를 입력하세요.
   - **Tab Name**(탭 이름) -- 탭에 표시되는 레이블입니다(예: "Sermons"(설교) 또는 "Give"(헌금)).
   - **Icon**(아이콘) -- 아이콘 선택기를 클릭하여 탭의 아이콘을 고르세요.
   - **Image**(이미지) -- **Select Image**(이미지 선택)(또는 **Change Image**(이미지 변경))를 클릭하여 탭에 사진을 넣으세요. 사진이 있는 탭은 앱의 홈 화면에 사진 타일로 나타납니다. [홈 화면 타일](#home-screen-tiles)을 참고하세요. 사진을 제거하려면 **Remove Image**(이미지 제거)를 클릭하고 저장하세요. 그러면 탭은 홈 타일이 아니라 일반 탭으로 나타납니다.
   - **Tab Type**(탭 유형) -- **Bible**(성경), **Live Stream**(실시간 스트리밍), **Verse of the Day**(오늘의 말씀), **Sermons**(설교), **Check-in**(체크인), **Donation**(헌금), **Member Directory**(회원 디렉터리), **My Groups**(내 그룹), **Volunteer Opportunities**(자원봉사 기회), **Serving Plans**(봉사 계획), **Registrations**(등록), **Requests**(요청), **External URL**(외부 URL), **Internal Page**(내부 페이지), **Folder**(폴더) 중 하나입니다. **Registrations**는 구성원의 행사 등록을 엽니다. **Requests**는 My Requests(내 요청)를 여는데, 구성원은 여기에서 행사를 요청하고 지난 요청의 상태를 볼 수 있습니다. 이 두 가지는 로그인한 구성원이 필요하므로, Visibility(표시 대상)를 Logged-in Users(로그인한 사용자) 또는 Members & Staff(구성원과 직원)로 설정하세요.
   - **URL** -- **External URL** 탭에 표시됩니다. 탭을 열 때 이동할 웹 주소입니다.
   - **Page**(페이지) -- **Internal Page** 탭에 표시됩니다. 웹사이트의 페이지 중 하나를 고르세요.
   - **Parent tab**(상위 탭) -- 탭을 **Folder** 탭 안에 넣거나, **None (top level)**(없음(최상위))으로 두세요. [이 탭이 나타나는 위치](#where-these-tabs-appear)를 참고하세요.
   - **Visibility**(표시 대상) -- 이 탭을 볼 수 있는 사람입니다. **Everyone (including anonymous)**(모두(익명 포함)), **Logged-in Users**(로그인한 사용자), **Members & Staff**(구성원과 직원), **Staff Only**(직원만), **Serving Team Members**(봉사 팀 구성원), **Specific Groups...**(특정 그룹...)(그다음 그룹을 체크) 중 하나입니다. **Member Directory** 탭의 경우, 이 설정은 탭 자체를 누가 보는지만 제어합니다. 디렉터리를 누가 열 수 있는지는 회원 포털 페이지의 **Show in Directory**(디렉터리에 표시)로 설정합니다([회원 디렉터리 및 메시지 설정](#member-directory--messaging-settings) 참고).
3. **Save Tab**(탭 저장)을 클릭하여 앱에 추가하세요.

## 기존 탭 편집하기 {#editing-an-existing-tab}

1. **App Tabs** 목록에서 탭의 편집(연필) 아이콘을 클릭하세요.
2. 탭의 이름, 아이콘, 이미지, 유형 또는 표시 대상 설정을 업데이트하세요.
3. 변경 사항을 적용하려면 **Save Tab**을 클릭하세요. 탭을 제거하려면 대신 **Delete Tab**(탭 삭제)을 클릭하세요. 폴더를 삭제하면 그 안의 탭은 최상위로 옮겨집니다.

## 탭 순서 바꾸기 {#reordering-tabs}

모바일 앱에서 탭이 나타나는 순서를 바꿀 수 있습니다. 각 탭의 **Move Up**(위로 이동)과 **Move Down**(아래로 이동) 화살표를 사용하여 재배열하세요. 폴더 안의 탭은 그 폴더 안에서 이동합니다. 이 페이지에 표시되는 순서는 구성원이 앱에서 보게 될 순서와 같습니다.

:::info
특정 조건이 충족되면 일부 탭이 자동으로 나타날 수 있습니다. 예를 들어 스트림이 활성 상태일 때 Live Stream 탭이 나타날 수 있습니다. 직접 추가한 탭은 구성원이 언제나 보는 내용을 완전히 제어할 수 있게 해 줍니다.
:::

:::tip
탭 개수를 관리할 수 있는 수준으로 유지하세요. 대부분의 교회에는 3~5개가 적당합니다. 탭이 너무 많으면 구성원이 탐색하기 어려워집니다.
:::

## 앱 테마 {#app-theme}

**Mobile > App Theme**(모바일 > 앱 테마)(`/mobile/theme`)는 B1 앱, 회원 포털, 체크인 키오스크에서 사용하는 색상을 설정합니다. **Edit Church Settings** 권한이 필요합니다.

1. **Light Mode**(밝은 모드) 또는 **Dark Mode**(어두운 모드)를 펼치세요.
2. 각 색상에 대해 — **Background**(배경), **Surface**(표면), **Primary**(기본), **Primary Contrast**(기본 대비)(기본 색상 버튼과 머리글의 텍스트), **Secondary**(보조), **Text Color**(텍스트 색상) — 색 견본을 클릭하여 색을 고르거나 **Hex**(헥스) 상자에 직접 입력하세요. 아래의 **Preview**(미리 보기)에는 설정한 색으로 된 머리글, 카드, 버튼이 표시됩니다.
3. **Save**를 클릭하세요.

표준 색상으로 되돌리려면 **Reset to Defaults**(기본값으로 재설정)를 클릭하세요. B1 Admin 자체의 **Custom**(사용자 지정) 테마도 밝은 모드의 **Primary** 색상을 사용합니다. [프로필 관리](../profile/managing-profile.md)를 참고하세요.

## 회원 디렉터리 및 메시지 설정 {#member-directory--messaging-settings}

같은 Mobile 섹션의 **Member portal**(회원 포털) 항목(`/mobile/b1-mobile`, 제목 **Portal settings**(포털 설정))에는 B1.church 환경에서 회원 디렉터리와 비공개 메시지를 관리하는 설정이 있습니다. **Edit Church Settings** 권한이 필요합니다. 아래 설정을 변경한 다음 페이지 하단의 **Save**를 클릭하세요:

- **Directory Approval Group**(디렉터리 승인 그룹) -- 회원 디렉터리 업데이트와 [계정 삭제 요청](../profile/account-deletion.md)을 적용되기 전에 검토하는 그룹입니다.
- **Show in Directory**(디렉터리에 표시) -- 회원 디렉터리를 열 수 있는 사람과 디렉터리에 나열되는 사람입니다. **Admins Only**(관리자만), **Members and Above**(구성원 이상)(기본값), **Regular Attendees and Above**(정기 참석자 이상), **Visitors and Above**(방문자 이상) 중 하나입니다. 교인 상태가 선택한 수준보다 낮은 사람은 디렉터리를 볼 수 없고 디렉터리에도 나열되지 않습니다. **Admins Only**를 선택하면 People &gt; View(사람 &gt; 보기) 권한이 있는 직원을 제외하고는 아무도 디렉터리를 볼 수 없습니다(Staff 교인 상태만으로는 충분하지 않습니다). 이 권한이 있는 직원은 이 설정과 관계없이 항상 디렉터리를 열고 모든 사람을 볼 수 있습니다. 온라인으로 스스로 등록한 사람은 처음에 손님으로 시작하므로, 손님은 절대 포함되지 않습니다.
- **Visibility Preference**(공개 설정 기본값) -- 아직 자신의 설정을 고르지 않은 구성원에게 적용되는 교회 전체의 기본값입니다. **Address**(주소), **Phone Number**(전화번호), **Email**(이메일)에 각각 드롭다운이 있으며(모두 **Members**(구성원)로 시작), 공개 설정이 있는 모든 곳에서 같은 다섯 가지 수준을 사용할 수 있습니다.
  - **Everyone**(모두) -- 익명 방문자를 포함하여 누구에게나 보입니다
  - **Members**(구성원) -- 구성원 또는 직원 기록이 있는 사람에게만 보입니다
  - **Groups Only**(그룹 구성원만) -- 이 사람과 같은 그룹에 속한 사람과 직원에게만 보입니다
  - **My Group Leaders and Staff**(내 그룹 리더와 직원) -- 이 사람이 속한 그룹의 리더와 직원에게만 보입니다
  - **Staff Only**(직원만) -- 직원(교인 상태가 Staff이거나 People &gt; View 권한이 있는 사람)과 본인에게만 보입니다

  이 수준에서 "직원"은 교인 상태가 Staff이거나 People &gt; View 권한이 있는 모든 사람을 뜻합니다. 그룹 변경은 즉시 적용됩니다. 그룹에 가입하거나 그룹 리더로 지정된 사람은, 로그아웃했다가 다시 로그인하지 않아도 그 그룹 구성원의 **Groups Only** 또는 **My Group Leaders and Staff** 세부 정보를 볼 수 있습니다.

  구성원은 B1.church PWA의 프로필 **Privacy**(개인정보) 탭에서 자신의 기록에 대해 이 기본값을 바꿀 수 있습니다. [프로필 편집하기](/docs/b1-church/getting-started/me-page)를 참고하세요.
- **Minimum Age for Private Messages**(비공개 메시지 최소 연령) -- 아동 보호 설정입니다. 두 사람 중 누구라도 이 연령 미만이면, 생년월일을 기준으로 B1은 새 비공개 메시지 대화를 열지 않습니다(생년월일이 없으면 가구 역할을 대신 사용합니다). 이 연령 미만의 사람은 디렉터리에서 완전히 볼 수 있습니다. 차단되는 것은 직접 메시지뿐이며, **양방향 모두** 차단되고, 직원을 포함한 모든 사람에게 적용됩니다. 그룹 대화와 자녀의 부모에게 메시지를 보내는 것은 여전히 가능합니다. 선택지는 Off(끔), 13, 16, 18이며, 기본값은 **18**입니다. 기존 대화에는 영향을 주지 않습니다.

:::tip
최소 연령 확인은 생년월일에 의존하므로, 교회의 자녀에 대해 생년월일이 입력되어 있는지 확인하세요. 이 설정은 [체크인 안전 설정](../attendance/checkin-safety.md)과 같은 아동 보호 설정군에 속합니다.
:::

### 홈 화면 로그인 안내 {#home-screen-sign-in-prompt}

로그인하지 않고 앱의 [홈 화면](/docs/b1-church/getting-started/navigating#home)을 연 방문자에게는, 기본적으로 *"Sign in to see your groups, giving, and more."*(로그인하여 그룹, 헌금 등을 확인하세요.)라는 짧은 안내가 **Sign In**(로그인) 버튼 옆에 표시됩니다. 같은 Member portal 페이지(`/mobile/b1-mobile`)의 **Home screen sign-in prompt**(홈 화면 로그인 안내) 설정에서 이를 바꿀 수 있습니다.

- **Show sign-in prompt on the app home screen**(앱 홈 화면에 로그인 안내 표시) -- 끄면 홈 화면에서 안내와 **Sign In** 버튼이 모두 숨겨집니다. 방문자는 여전히 앱 메뉴에서 로그인할 수 있습니다.
- **Sign-in prompt text**(로그인 안내 문구) -- 기본 문구를 자체 메시지(최대 150자)로 바꾸세요. 비워 두면 기본 문구를 사용합니다. 안내를 끄면 이 상자는 비활성화됩니다.

**Save**를 클릭하여 적용하세요. **Saved**(저장됨) 메시지가 변경을 확인합니다. 저장하면 앱의 캐시된 설정이 새로 고쳐지므로, 다음에 홈 화면이 로드될 때 변경 사항이 나타납니다.

### 행사 요청 페이지 {#event-request-page}

앱에서 [행사를 요청](../../b1-church/events/requesting-events.md)하는 구성원은 **Request an Event**(행사 요청) 페이지 상단에 짧은 안내 문구를 봅니다. 기본 문구는 *"Staff will approve each room and item."*(직원이 각 방과 항목을 승인합니다.)입니다. 같은 Member portal 페이지(`/mobile/b1-mobile`)의 **Event request page**(행사 요청 페이지) 설정에서 이 문구를 예약 지침, 필요한 사전 통보 기간, 이용 약관 등 자체 안내로 바꿀 수 있습니다:

1. **Event request instructions**(행사 요청 안내)에 텍스트를 입력하세요(최대 1,000자). 줄바꿈은 유지됩니다.
2. **Save**를 클릭하세요.

상자를 비워 두면 기본 문구를 그대로 사용합니다.

### 홈 화면 타일 {#home-screen-tiles}

사진이 있는 탭(아래 [새 탭 추가하기](#adding-a-new-tab)의 **Image** 참고)은 앱의 [홈 화면](/docs/b1-church/getting-started/navigating#home)에 교회 이름이 머리글인 섹션 안에 사진 타일로 나타납니다. 사진을 넣었다면 오늘의 말씀 탭도 포함됩니다. 사진이 있는 탭은 탭 바에도 함께 나타납니다.

같은 Member portal 페이지(`/mobile/b1-mobile`)의 **Home screen tiles**(홈 화면 타일) 설정은 이 타일이 어떻게 배치되는지 제어합니다. **Layout**(레이아웃)을 고르세요:

- **Grid**(격자) -- 한 줄에 두 개의 타일(기본값)입니다. 타일 개수가 홀수이면 첫 번째 타일이 전체 너비를 차지합니다.
- **Scrolling row**(가로 스크롤 줄) -- 구성원이 좌우로 밀어서 보는 타일 한 줄입니다.
- **Scrolling (automatic)**(자동 스크롤) -- 같은 가로 줄이지만, 스스로 움직입니다. 약 4초마다 타일 하나씩 넘어가며, 마지막 타일 다음에는 다시 첫 타일로 돌아갑니다. 구성원이 줄을 터치하거나, 그 위에 마우스를 올리거나, 탭으로 이동하면 일시 정지되며, 몇 초 후 다시 시작합니다. 동작 줄이기가 설정된 기기에서는 줄이 움직이지 않으며 **Scrolling row**처럼 작동합니다.
- **List**(목록) -- 각 탭 이름 옆에 작은 사진 썸네일이 있는 목록입니다.
- **Grid and list**(격자와 목록) -- 처음 세 개의 사진 탭은 격자로, 첫 타일이 전체 너비를 차지합니다. 다음 세 개는 아래에 각 이름 옆에 작은 썸네일과 함께 목록으로 표시됩니다. 세 개를 넘으면 섹션 머리글에 **All**(전체) 링크가 나타나며, 이를 누르면 앱의 **More**(더보기) 페이지가 열리고 모든 탭이 나열됩니다.
- **Scrolling (automatic) and list**(자동 스크롤과 목록) -- 위에서 설명한 자동 스크롤 줄에 모든 사진 탭이 들어가고, 앱 메뉴(휴대폰의 탭 바, 컴퓨터의 머리글)에 이미 있지 않은 처음 세 개의 탭은 아래에도 목록으로 표시됩니다. 세 개를 넘으면 같은 **All** 링크가 나타납니다.

두 가지 가로 스크롤 레이아웃에서는, 화면에 한 번에 들어가는 것보다 타일이 많으면 타일 아래에 점들이 나타납니다. 타일마다 점이 하나씩 있으며, 현재 타일의 점은 채워져 있습니다. 구성원은 점을 탭하여 해당 타일로 바로 이동할 수 있습니다.

**Save**를 클릭하여 적용하세요.

### 홈 화면 섹션 {#home-screen-sections}

로그인한 구성원은 언제나 [나 페이지](/docs/b1-church/getting-started/me-page)에서 자신의 출석 기록과 제출한 양식을 볼 수 있습니다. 같은 Member portal 페이지(`/mobile/b1-mobile`)의 **Home screen sections**(홈 화면 섹션) 스위치를 켜면, 이 정보를 홈 화면에도 표시할 수 있습니다:

- **Show My Attendance on Home**(홈에 내 출석 표시) -- 지난 90일 동안 구성원이 출석한 횟수, 가장 최근 방문 두 번, 전체 출석 목록으로 가는 **History**(기록) 링크가 포함된 **My Attendance**(내 출석) 섹션을 추가합니다.
- **Show My Forms on Home**(홈에 내 양식 표시) -- 구성원의 가장 최근 양식 제출 두 개와 **All forms**(모든 양식) 링크가 포함된 **My Forms**(내 양식) 섹션을 추가합니다.

두 가지 모두 기본적으로 꺼져 있습니다. 로그인했고 보여줄 기록이 하나 이상 있는 구성원에게만 섹션이 나타납니다.

- **Show News on Home**(홈에 소식 표시) -- 인사말 바로 아래에 **News**(소식) 섹션을 추가합니다. 가장 최근에 게시된 다섯 개의 [블로그 글](../website/blog.md)을 사진 카드로 보여주며, 카드는 자동으로 움직입니다. 카드를 탭하면 앱 안에서 전체 글이 열리고, **All news**(모든 소식) 링크를 누르면 최근 글 목록이 나타납니다. 이 옵션을 켠 후 **Only this category**(이 분류만)를 선택하면 블로그 분류 하나(예: *Announcements*(공지))를 골라 그 분류의 글만 나타나게 할 수 있습니다. **All posts**(모든 글)로 두면 모든 글이 표시됩니다. 블로그 글은 웹사이트에서 공개되어 있으므로, 소식은 로그인 여부와 관계없이 앱을 여는 모든 사람에게 보입니다. 기본적으로 꺼져 있으며, 게시된 글이 하나 이상 있을 때만 나타납니다.

**Save**를 클릭하여 적용하세요.

## 푸시 알림 {#push-notifications}

**Mobile > Push Notifications**(모바일 > 푸시 알림)(`/mobile/notifications`)는 알림을 켜 둔 B1 앱이 설치된 사람들에게 푸시 알림을 보내거나 예약합니다. 모든 사람에게 보내려면 **Edit Content**(콘텐츠 편집) 권한이, 그룹에 보내려면 **Edit Group Members**(그룹 구성원 편집) 권한이 필요합니다.

1. **Send Notification**(알림 보내기)을 클릭하세요.
2. **Audience**(대상)를 선택하세요. **Everyone with the app**(앱 사용자 전체) 또는 여러분의 그룹 중 하나입니다. B1은 푸시가 도달할 사람 수와 푸시를 끈 사람 수를 보여줍니다. 여러분 자신은 여러분의 푸시에서 제외됩니다.
3. **Title**(제목)(최대 80자)과 **Message**(메시지)(최대 240자)를 입력하고, 선택적으로 **Open link or flyer URL**(열 링크 또는 전단지 URL)과 **Image URL**(이미지 URL)을 입력하세요([그룹 알림](../groups/group-members.md#sending-push-notifications-to-group-members)과 같은 필드입니다).
4. **When**(언제) 아래에서 **Send now**(지금 보내기)를 유지하거나, **Schedule for later**(나중에 예약)를 선택하고 미래의 **Send at**(보낼 시간)을 고르세요.
5. **Send Notification**(알림 보내기)(또는 **Schedule Notification**(알림 예약))을 클릭하세요.

페이지에는 **Scheduled**(예약됨) 알림(각 항목에 **Edit**(편집), **Send now**(지금 보내기), **Cancel**(취소))과 **Recent**(최근) 알림이 상태와 함께 나열됩니다. 상태는 *Sent: 12 of 15*(발송됨: 15명 중 12명), *Cancelled*(취소됨), *Missed (the send time passed)*(놓침(발송 시간이 지남)) 등입니다. 끝난 알림을 목록에서 빼려면 **Remove**(제거)를 클릭하세요. 발송, 실패, 취소된 모든 알림을 한 번에 지우려면 **Clear all**(모두 지우기)을 클릭하세요. 시간은 교회의 [시간대](./church-settings.md#time-zone)로 표시되며, 교회에 시간대가 설정되어 있지 않다면 컴퓨터의 시간대로 표시됩니다. 예약된 알림을 누가 받을지는 발송될 때 다시 계산됩니다.

B1이 발송을 시도할 때 30분 넘게 늦은 알림은 *Missed*(놓침)로 표시되며 발송되지 않습니다. 세 번 실패한 알림은 오류와 함께 *Failed*(실패)로 표시됩니다. 목록에서 알림을 제거해도 이미 받은 사람에게서 알림이 회수되지는 않습니다. 푸시에 링크가 없다면, 교회 전체 푸시는 탭했을 때 앱의 알림 목록이 열리고, 그룹 푸시는 그룹 페이지가 열립니다. [알림 설정](../../b1-church/getting-started/notification-preferences.md)에서 **Church Announcements**(교회 공지)를 끈 구성원은, 전체 대상이든 그룹 대상이든 이런 푸시를 받지 않습니다.

## 이 탭이 나타나는 위치 {#where-these-tabs-appear}

여기에서 구성한 탭은 구성원이 `https://yourchurchname.b1.church`의 어느 페이지에서든 설치하는 **B1.church PWA**에 표시됩니다. 이 페이지에서 바꾼 내용은 구성원이 다음번에 앱을 열 때 반영됩니다.

휴대폰에서는 아래쪽 탭 바에 **Home**(홈), 탭 최대 세 개, **More**(더보기)가 표시됩니다. 컴퓨터에서는 머리글에 최대 다섯 개가 표시됩니다. 내장 화면(설교, 헌금, 그룹 등)이 먼저 자리를 차지하며, **Internal Page**(내부 페이지) 탭은 남은 자리를 채웁니다. **External URL**(외부 URL) 탭과 **Verse of the Day**(오늘의 말씀) 탭은 자리를 차지하지 못합니다. 자리에 들어가지 못한 탭을 포함하여 모든 탭은 앱의 **More** 페이지에 나열됩니다.

**Folder**(폴더) 탭 안에 있는 탭은 예외입니다. 이 탭들은 폴더 자체의 화면에 나타나며, 구성원은 폴더를 탭하여 엽니다. 폴더 탭이 탭 바나 머리글에 자리를 얻지 못하면, 홈의 **More from**(다음에서 더보기) 섹션에도 폴더 이름과 그 안의 탭들이 여기서 정한 순서대로 버튼으로 나열됩니다. 이 화면에서는 모든 탭에 이미지가 있으면 사진 타일로, 그렇지 않으면 목록으로 탭을 보여줍니다. 구성원이 볼 수 있는 탭이 하나도 없는 폴더는 그 구성원에게 숨겨집니다. [폴더 탭](../../b1-church/getting-started/navigating.md#folder-tabs)을 참고하세요. 구성원이 보게 되는 내용은 [B1App 탐색하기](../../b1-church/getting-started/navigating.md)를 참고하세요.

## 다음 단계 {#next-steps}

- [교회 설정](./church-settings.md) -- 교회 정보와 브랜딩 구성
- [역할 및 권한](./roles-permissions.md) -- 팀의 접근 권한 관리
