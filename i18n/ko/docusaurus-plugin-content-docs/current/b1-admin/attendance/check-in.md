---
title: "B1 Checkin과 B1 Admin으로 셀프 체크인 설정하기"
sidebar_label: "체크인"
description: "B1 Admin의 B1 Checkin 앱으로 예배 셀프 체크인을 설정합니다. 기기, 키오스크 계정, 일정, 브랜딩, QR 게스트 등록을 다룹니다."
---

# 체크인

<div class="article-intro">

B1 Admin은 동반 앱인 **B1 Checkin**을 통해 예배 시 셀프 체크인을 지원합니다. 성도들은 도착했을 때 키오스크나 전용 기기에서 본인과 가족을 직접 체크인할 수 있어 절차가 빨라지고 봉사자의 업무 부담도 줄어듭니다. 모든 체크인은 자동으로 출석으로 기록됩니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 캠퍼스, 예배 시간, 그룹은 [출석 설정](setup.md)에서 먼저 구성되어 있어야 합니다.
- 가족이 함께 체크인할 수 있도록 [세대](../people/adding-people.md#managing-households)가 설정된 [데이터베이스의 사람들](../people/adding-people.md)이 필요합니다.
- 태블릿이 필요하며, 선택 사항으로 Brother 라벨 프린터를 준비할 수 있습니다([권장 하드웨어](#recommended-hardware) 참조).

</div>

## 작동 방식 {#how-it-works}

B1 Checkin 앱은 B1 Admin의 출석 설정과 연결됩니다. 성도가 체크인하면 올바른 캠퍼스, 예배 시간, 그룹에 출석이 자동으로 기록됩니다. 체크인 시스템을 사용하는 사람의 출석은 수동으로 입력할 필요가 없습니다.

## 체크인 설정하기 {#setting-up-check-in}

1. **먼저 출석 구조를 설정하세요.** B1 Admin에서 **People > Attendance**로 이동한 뒤 **Setup**을 클릭하여 캠퍼스, 예배 시간, 그룹이 준비되어 있는지 확인합니다. 체크인 앱은 이 설정에 의존합니다. 선택 사항으로 각 예배 시간에 [체크인 일정](setup.md#setting-a-check-in-schedule)을 지정하면 매주 체크인이 자동으로 열리고 닫힙니다. 일정은 예배가 열리는 캠퍼스의 시간대를 사용하며, 캠퍼스에 시간대가 없으면 교회의 시간대를 사용합니다. 키오스크는 체크인 시간이 지난 예배 시간을 **Closed**로 표시하고, 체크인이 언제 열리는지 성도에게 안내합니다. 자세한 내용은 [출석 설정](setup.md)을 참조하세요.
2. **사용할 기기에 B1 Checkin 앱을 설치합니다.** 앱은 다음 플랫폼에서 받을 수 있습니다.
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung 태블릿:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire 태블릿:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **B1 Checkin 앱에 로그인합니다.** **Checkin** 출석 권한(또는 **Edit Attendance**)이 있는 계정을 사용하세요. [체크인 키오스크 계정](../settings/roles-permissions.md#check-in-kiosk-accounts)을 참조하세요.
4. 현재 모임의 **캠퍼스와 예배 시간을 선택합니다.**
5. 이제 성도가 기기에서 자신의 이름을 검색하여 체크인할 수 있습니다.

:::tip
체크인 기기는 로비 입구나 안내 데스크처럼 눈에 잘 띄고 쉽게 찾을 수 있는 곳에 두세요. 예배 중에 간단히 안내하면 성도들이 이 기능을 알아보는 데 도움이 됩니다.
:::

:::tip
교회에 여러 캠퍼스가 있다면 [출석 설정](setup.md)에서 캠퍼스마다 설정을 반복해야 합니다. 각 체크인 기기는 서로 다른 캠퍼스로 설정할 수 있습니다.
:::

## 권장 하드웨어 {#recommended-hardware}

**태블릿** — 다음 중 어떤 기종이든 앱과 잘 작동합니다.

- **소형:** Samsung Galaxy Tab A7 Lite 8.7"
- **대화면:** Samsung Galaxy Tab A8 10.5"
- **저예산:** Amazon Fire HD 10

**프린터** — 체크인에서 이름표를 출력하려면 Brother 라벨 프린터를 사용할 수 있습니다.

- **최고:** Brother QL-1110NWB (Bluetooth와 WiFi로 여러 태블릿 지원)
- **좋음:** Brother QL-810W (WiFi로 여러 태블릿 지원)
- **저예산:** Brother QL-1100 (WiFi만 지원)

**라벨:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
B1 Checkin 앱과 호환되는 것은 Brother 라벨 프린터뿐입니다. 다른 브랜드의 프린터로는 이름표를 출력할 수 없습니다.
:::

:::info
프린터를 태블릿과 같은 WiFi 네트워크에 연결하려면 프린터의 설정 안내를 따르세요. Brother 프린터 드라이버와 설정 가이드는 [Brother 지원 사이트](https://support.brother.com)에서 찾을 수 있습니다.
:::

## 키오스크 화면 꾸미기 {#customizing-the-kiosk-appearance}

B1 Checkin 앱의 모양을 교회의 브랜드에 맞게 꾸밀 수 있습니다. B1 Admin에서 **Mobile > B1 CheckIn**으로 이동하거나(또는 Attendance 페이지에서 **Kiosk**를 클릭하고) **Kiosk Theme** 카드를 사용하세요. 변경한 후에는 카드에서 **Save**를 클릭합니다.

### 색상 {#colors}

키오스크는 교회 앱과 같은 색상을 사용합니다. 색상은 **Mobile > App Theme**에서 설정하세요. Kiosk Theme 카드에는 별도의 색상 설정이 없습니다.

### 배경 이미지 {#background-image}

**Background Image**에서 **Upload Image**를 클릭하면 키오스크의 환영 화면과 검색 화면에 표시할 선택적 배경을 추가할 수 있습니다. 권장 크기는 1920x1080 픽셀입니다. **Change Image** 또는 **Remove**를 사용하면 이미지를 바꾸거나 지울 수 있습니다.

### 대기 화면 / 스크린세이버 {#idle-screen--screensaver}

일정 시간 입력이 없을 때 실행되는 스크린세이버를 설정할 수 있습니다.

1. **Idle Screen / Screensaver**를 열고 **Enable idle screen**을 켭니다.
2. **Timeout (seconds**)를 설정합니다. 입력이 없는 뒤 스크린세이버가 시작되기까지의 초 단위 시간입니다(최소 10초).
3. 슬라이드마다 **Add Slide**를 클릭하고, **Upload**를 클릭해 이미지를 선택한 뒤 **Duration (s**)를 설정합니다(최소 3초).

:::tip
키오스크를 사용하지 않을 때 대기 화면에 공지, 다가오는 행사, 환영 메시지를 띄워 보세요.
:::

## QR 코드로 게스트 등록하기 {#guest-registration-via-qr-code}

체크인 키오스크에는 방문자가 자신의 휴대폰으로 본인과 가족을 직접 등록할 수 있는 QR 코드를 표시할 수 있습니다. 처음 방문한 게스트의 체크인 절차가 빨라집니다.

게스트가 QR 코드를 스캔하면 [게스트 등록 페이지](../../b1-church/checkin/guest-registration.md)로 이동하여 가족의 이름과 교회가 추가로 묻기로 한 정보를 입력합니다. 이후 봉사자가 키오스크에서 게스트를 찾아 체크인할 수 있습니다.

### QR 게스트 등록 켜기 {#enabling-qr-guest-registration}

QR 코드 표시를 켜려면 다음과 같이 하세요.

1. B1 Admin에서 [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 상단의 검색창)를 열고 **Mobile**을 펼칩니다.
2. **B1 CheckIn**을 클릭합니다.
3. **QR Guest Registration**을 켜고 **Save**를 클릭합니다.

:::note
이 설정은 Attendance 아래가 아니라 **Mobile > B1 CheckIn**(Kiosk Theme 카드가 있는 것과 같은 페이지)에 있습니다. Attendance 페이지의 **Kiosk** 작업에는 이 페이지로 연결되는 링크가 있습니다.
:::

**QR Guest Registration** 스위치를 켜면 아래 옵션들이 같은 카드에 나타납니다. 옵션을 바꾼 뒤에는 카드에서 **Save**를 클릭하세요.

### 가입 양식 항목 선택하기 {#choosing-sign-up-fields}

**Sign-up fields** 체크리스트는 등록 양식에서 무엇을 물을지 결정합니다. **First Name**과 **Last Name**은 항상 양식에 포함되며, 가족 구성원 모두에게 필수입니다. 그 외 항목은 **Include**를 켜면 양식에 추가되고, 게스트가 반드시 입력해야 하면 **Required**를 켭니다. **Required**는 포함된 항목에서만 켤 수 있으며, **Include**를 끄면 **Required**도 함께 해제됩니다.

| 항목 | 입력 대상 | 기본 포함 여부 |
|-------|-----------|---------------------|
| **Title** | 가족 구성원 각자, 이름 앞의 드롭다운(Mr, Mrs, Miss, Ms, Dr, Prof, Rev, Pastor) | 아니요 |
| **Email** | 주 연락처만 | 예(선택) |
| **Phone** | 가족 구성원 각자. 필수로 설정하면 주 연락처만 입력해야 합니다. | 예(선택) |
| **Household role** | 주 연락처 다음의 가족 구성원 각자 — Spouse, Child, Other. 주 연락처는 새 세대의 세대주가 됩니다. 역할을 입력하지 않은 사람은 Other로 저장됩니다. | 예(선택) |
| **Home address** | 가족 전체에 한 번 — 도로명, 상세 주소, 도시, 주(state), 우편번호. 필수로 설정하면 상세 주소를 제외한 모든 항목을 입력해야 합니다. 주소는 모든 가족 구성원에게 저장됩니다. | 아니요 |
| **Birth date** | 가족 구성원 각자 | 아니요 |
| **Gender** | 가족 구성원 각자 | 아니요 |
| **Marital status** | 주 연락처만 | 아니요 |
| **Grade** | 가족 구성원 각자(PreK부터 12학년까지, 또는 Graduated) | 아니요 |
| **Comments** | 가족 구성원 목록 아래 상자에 한 번 입력(최대 1,000자) | 아니요 |

끈 항목은 다른 방법으로 가입 양식에 값이 전달되더라도 저장되지 않습니다. 댓글은 주 연락처의 기록에 메모로 저장되며("Guest sign-up"으로 표시), 해당 프로필의 **Notes** 섹션에서 확인할 수 있습니다.

### 게스트를 그룹에 추가하기 {#adding-guests-to-a-group}

**Add new guests to group**을 사용하면 가입한 모든 사람을 그룹 중 하나에 자동으로 넣을 수 있습니다. 예를 들어 "Newcomers" 그룹이나 이번 주말 행사를 위한 그룹에 넣을 수 있습니다. 기본값인 **None**을 선택하면 이 기능을 건너뜁니다. 게스트는 그룹을 보거나 선택할 수 없으며, 여기에서만 설정됩니다. 행사마다 그룹을 바꾸면 해당 행사의 게스트를 함께 follow up할 수 있습니다.

### 출석 기록하기 {#recording-attendance}

그룹을 선택하면 **Also record attendance** 스위치가 나타납니다. 이것을 켜면 게스트가 가입하는 순간 출석으로 표시되므로 따로 체크인할 필요가 없습니다.

출석은 가입이 선택된 그룹의 **예정된** 예배 시간 중 하나에 이루어질 때만 기록됩니다.

- 그룹은 하나 이상의 예배 시간에 연결되어 있어야 하며, 그 예배 시간에는 [체크인 일정](setup.md#setting-a-check-in-schedule)(**Day**와 **Start Time**)이 있어야 합니다.
- "진행 중"이란 해당 예배 시간의 체크인 시간대 안을 뜻합니다. 시작 전 **Open check-in** 분부터 종료 후 **Close check-in** 분까지입니다(종료 시간이 없으면 시작 후 해당 분까지이며, 종료 시간과 마감 분이 모두 없으면 그날 끝날 때까지). 시간대는 체크인 일정이 사용하는 시간대와 같습니다.
- 가입 시점에 열려 있는 예배 시간마다, 오늘 날짜에 해당 가족 구성원이 그 그룹에 출석한 것으로 표시됩니다.
- 다른 시간에 가입하거나, 예배 시간에 일정이 없는 그룹에 가입한 경우에는 그룹에는 추가되지만 출석으로 집계되지 않습니다.

### 헤더 사진 {#header-photo}

**Header photo**에서 **Change photo**를 클릭하면 기본 아이콘 대신 등록 페이지 상단에 표시할 이미지를 고르거나 업로드할 수 있습니다(16:9 비율로 잘립니다). 아이콘으로 되돌리려면 **Remove**를 클릭합니다.

### 등록 링크 공유하기 {#sharing-the-registration-link}

QR Guest Registration을 켜면 카드 하단에 **Share registration QR code** 섹션이 나타납니다. 키오스크의 QR 코드 외에 게스트를 등록 양식으로 안내하는 방법이 두 가지 있습니다.

- **Copy link** — 등록 URL을 복사하여 교회 웹사이트, 이메일, 기타 온라인 공간에 붙여 넣을 수 있습니다.
- **Download PNG** — QR 코드를 이미지로 내려받아 전단, 주보, 안내판에 인쇄할 수 있습니다.

:::tip
등록 링크를 교회 웹사이트의 "Plan Your Visit" 또는 "I'm New" 페이지에 추가하면 게스트가 도착하기 전에 미리 등록할 수 있습니다.
:::

### 게스트 가입 후 일어나는 일 {#what-happens-after-a-guest-signs-up}

B1은 먼저 **People**에 이미 있는 사람을 찾습니다. 같은 이름과 같은 이메일 또는 전화번호를 가진 사람이 정확히 한 명 있으면 가족 구성원이 그 사람과 연결됩니다. 이메일이나 전화번호가 없이 입력된 자녀는 연결된 세대 안에서 이름으로 연결됩니다. 연결된 사람은 현재 정보 그대로 재사용되며, 가입으로 그 사람의 정보나 회원 상태가 바뀌지 않습니다. 새로운 사람은 연결된 세대에 합류합니다.

연결되는 사람이 없으면 주 연락처의 성(last name)을 딴 새 세대가 만들어지고, 모든 가족 구성원에 대한 사람 기록이 생성됩니다. 새로 만들어진 사람은 모두 회원 상태 **Visitor**로 **People**에 추가되며, 주 연락처가 세대주가 됩니다.

연결되었거나 새로 만들어진 사람은 아직 그룹에 없다면 선택한 그룹에 추가되고, 해당 옵션이 켜져 있으면 출석도 기록됩니다. 댓글은 주 연락처의 메모로 저장됩니다.

자동으로 follow up하려면 **Person · Created**(조건: *Membership Status is Visitor*) 또는 선택한 그룹의 **Group · Member Joined** 같은 [워크플로 트리거](../serving/workflows.md#triggers)를 추가하세요.

## 기록되는 내용 {#what-gets-recorded}

체크인할 때마다 B1 Admin에 출석 기록이 생성됩니다. 이 기록은 [Attendance](tracking-attendance.md) 페이지와 각 [그룹의](../groups/group-members.md) 모임 기록에서 수동으로 입력한 출석과 똑같이 확인할 수 있습니다. 데이터가 표시되는 방식은 같으며, 두 방법 모두 같은 보고서에 반영됩니다.
