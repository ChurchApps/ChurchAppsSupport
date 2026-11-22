---
title: "교회 설정"
description: "B1 Admin 교회 설정 페이지에서 교회의 이름, 주소, 하위 도메인, 시간대, 지역 형식, 문자 서비스 제공자, 파일 저장소를 설정하세요."
---

# 교회 설정

<div class="article-intro">

교회 설정 페이지에서는 교회의 기본 정보, 연락처, 브랜딩을 구성합니다. 이 정보는 B1.church 웹사이트와 B1 App을 포함한 모든 ChurchApps 도구에서 사용됩니다.

</div>

## 교육 동영상 {#training-video}

<YouTube id="634zSbzDkYA" title="B1에서 교회 정보와 브랜딩 설정하기" next="B1에서 역할, 권한, 팀 초대하기" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>시작하기 전에</h4>

- "Edit Church Settings"(교회 설정 편집) 권한이 필요합니다. 접근 권한이 없다면 [역할 및 권한](./roles-permissions.md)을 참고하세요.
- 교회의 주소, 연락처 정보, 로고를 준비하세요.

</div>

## 교회 정보 편집하기 {#editing-your-church-information}

1. B1 Admin에서 [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 상단의 검색창)를 열고 **Settings**(설정)를 펼친 다음 **Settings**를 클릭하세요.
2. **Church Information**(교회 정보) 섹션(페이지 상단)에서 **Edit**(편집)를 클릭하세요.
3. 다음 필드 중 원하는 항목을 업데이트하세요.
   - **Church Name**(교회 이름) *(필수)* -- 모든 ChurchApps 제품에 표시되는 이름입니다.
   - **Subdomain**(하위 도메인) *(필수)* -- 무료 B1 웹 주소입니다. 아래의 [하위 도메인 설정](#setting-up-your-subdomain)을 참고하세요.
   - **Address Line 1**(주소 1), **Address Line 2**(주소 2), **City**(도시), **State**(주), **Zip**(우편번호), **Country**(국가) -- 교회의 실제 주소입니다.
   - **First Day of Week**(주의 첫 요일) -- 아래의 [주의 첫 요일](#first-day-of-week)을 참고하세요.
   - **Time Zone**(시간대) -- 교회의 시간대입니다. 아래의 [시간대](#time-zone)를 참고하세요.
4. 변경 사항을 적용하려면 **Save**(저장)를, 취소하려면 **Cancel**(취소)을 클릭하세요.

교회 이름, 하위 도메인, 주소는 설정 페이지 왼쪽 상단의 패널에도 표시됩니다.

## 하위 도메인 설정하기 {#setting-up-your-subdomain}

교회는 **yourchurch.b1.church**에서 무료 하위 도메인을 받습니다. 이것은 구성원과 방문자가 교회의 온라인 공간에 접속하는 웹 주소입니다.

1. 설정 페이지에서 **Church Information** 섹션의 **Edit**를 클릭하고 **Subdomain** 필드를 찾으세요.
2. 원하는 하위 도메인을 입력하세요(예: gracechurch.b1.church의 경우 "gracechurch").
3. 변경 사항을 저장하세요.

:::info
하위 도메인은 모든 ChurchApps 교회에서 고유해야 합니다. 원하는 이름이 이미 사용 중이라면 도시나 주 이름을 붙여 보세요(예: "gracechurch-dallas").
:::

방문자가 자체 도메인(예: **`www.gracechurch.org`**)으로 사이트에 접속하기를 원한다면 [사용자 지정 도메인](./custom-domain.md)을 참고하세요.

## 브랜딩 설정하기 {#configuring-branding}

로고와 색상은 설정 페이지에서 지정하지 않습니다. **Website > Appearance**(웹사이트 > 모양)에서 교회 로고를 업로드하고 색상을 고르세요. [로고 및 브랜딩](../website/appearance.md#logo-and-branding)을 참고하세요. B1 앱, 회원 포털, 체크인 키오스크에서 사용하는 색상은 **Mobile > App Theme**(모바일 > 앱 테마)에서 설정합니다. [앱 테마](./mobile-app.md#app-theme)를 참고하세요.

## 일반(지원 연락처) {#general-support-contact}

**General**(일반) 섹션에는 **Support Contact**(지원 연락처)가 있습니다. 사람들이 교회에 연락할 때 사용하는 이메일 주소나 문의 양식 링크입니다. **General** 섹션에서 **Edit**를 클릭하고 **Link**(링크) 필드에 입력한 다음 **Save**를 클릭하세요. 설정하기 전까지 이 섹션에는 **Not set**(설정 안 됨)이 표시됩니다.

## 주의 첫 요일 {#first-day-of-week}

달력이 시작되는 요일을 선택하세요. Church Info 섹션의 **First Day of Week**(주의 첫 요일) 드롭다운 기본값은 **Sunday**(일요일)이지만, 원하는 요일로 바꿀 수 있습니다. 변경하면 B1 Admin과 B1.church 회원 포털의 달력 격자 전체에 적용됩니다. 그룹 달력, 큐레이션 달력, 행사 편집기 모두 선택한 요일을 시작으로 주를 배치합니다.

## 시간대 {#time-zone}

**Church Information** 섹션의 **Time Zone**(시간대) 드롭다운은 교회의 시간대(예: *America/Chicago*)를 설정합니다. 비워 두려면 **None**(없음)을 선택하세요. 저장하면 시간대가 교회 정보 요약에 표시됩니다.

B1은 행사 알림이나 [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md) TV의 일정처럼 교회 전체에 적용되는 시간에 이 시간대를 사용합니다. [체크인 일정](../attendance/setup.md#setting-a-check-in-schedule)은 먼저 예배가 열리는 [캠퍼스](./campuses.md)의 시간대를 기준으로 계산하며, 캠퍼스에 시간대가 없을 때만 교회 시간대를 사용합니다. 모든 캠퍼스가 같은 시간대에 있다면, 교회와 각 캠퍼스에 모두 설정하세요.

## 지역(날짜 및 전화번호 형식) {#region-date-and-phone-format}

**Region**(지역) 설정은 B1 전체에서 날짜와 시간을 표기하는 방식을 조절합니다. 기본값은 미국 형식의 날짜입니다(예: "Sep 28, 2026", "9/28/2026"). 미국 이외 지역의 교회는 자체 형식으로 바꿀 수 있습니다. 예를 들어 English (United Kingdom)(영어(영국))을 선택하면 "28 Sept 2026", "28/09/2026"으로 표시됩니다.

1. 설정 페이지에서 왼쪽 목록의 **Region**을 클릭한 다음 **Region** 섹션에서 **Edit**를 클릭하세요.
2. **Region** 드롭다운에서 지역을 선택하세요. 각 옵션에는 예시 날짜가 표시되므로, 날짜가 어떻게 보일지 정확히 확인할 수 있습니다.
3. **Save**를 클릭하세요.

그러면 Region 섹션에 선택한 지역, **Date format**(날짜 형식)의 예시, **Phone numbers**(전화번호) 형식이 표시됩니다.

### 전화번호 형식 {#phone-number-format}

같은 Region 섹션에는 사람의 기록에서 전화번호를 입력하는 방식을 조절하는 **Phone numbers**(전화번호) 설정도 있습니다.

- **International (with country code)**(국제(국가 코드 포함)) -- 기본값입니다. 전화번호 필드에 국기 선택기가 표시되며, 번호를 국가 코드와 함께 저장합니다(예: +1 918 555 1234).
- **Local (as typed)**(현지(입력한 그대로)) -- 전화번호 필드가 일반 텍스트 상자가 되며, 입력한 그대로 국가 코드 없이 저장합니다(예: 0701 234 5678). 교회가 현지 형식으로 번호를 쓰고 B1이 국가 코드를 추가하지 않기를 원한다면 이 옵션을 선택하세요.

**Local**을 선택하면 Region 섹션의 지역 옆에 "Local phone numbers"(현지 전화번호)도 표시됩니다.

:::tip
문자는 번호에 국가 코드가 포함되어 있을 때 가장 잘 작동합니다. B1에서 문자를 보낸다면 **International** 형식을 유지하거나, Local 모드에서 입력하는 번호에 국가 코드를 포함하세요.
:::

지역 설정은 B1 Admin과 B1.church 웹사이트 및 회원 포털의 날짜와 시간에 적용되며, 설교, 블로그 글, 그룹 달력, 봉사 계획도 포함됩니다. 그래서 구성원도 직원과 같은 형식으로 날짜를 봅니다.

### 예배 요일 {#worship-day}

지역 섹션에는 메인 예배가 열리는 날을 정하는 **Worship day**(예배 요일) 설정도 있습니다. 기본값은 **Sunday**(일요일)입니다. 토요일(또는 다른 요일)에 예배하는 교회는 그 요일을 고를 수 있으며, 대시보드도 그에 맞춰 바뀝니다. 메인 제목은 "This Saturday"(이번 토요일)로, 옆 패널은 "Serving Saturday"(토요일 봉사)와 "Last Saturday"(지난 토요일)로 표시되고, 표시되는 예배 날짜는 다가오는 토요일이 되며, 실시간 "in the room"(현장 인원) 집계는 토요일 체크인에서 나타납니다.

예배 요일이 일요일이 아니면, 왼쪽 목록의 **Region** 항목에도 지역 옆에 요일이 표시됩니다.

## 문자 서비스(Texting) {#texting}

문자 서비스 제공자를 연결하면 B1 Admin에서 한 사람이나 그룹 전체에 SMS 메시지를 보낼 수 있습니다. 문자는 제공자와 맺은 교회의 자체 계정을 통해 발송되므로, 제공자의 요금과 한도가 적용됩니다.

1. 설정 페이지에서 왼쪽 목록의 **Texting**(문자 서비스)을 클릭한 다음 **Texting** 섹션에서 **Edit**를 클릭하세요.
2. **Provider**(제공자)를 선택하세요.
   - **Clearstream** -- **API Key**(API 키)를 입력하세요. Clearstream 계정 설정의 API Keys에서 키를 만드세요.
   - **Text In Church** -- **API Key**를 입력하세요. 먼저 Text In Church 지원팀에 개발자 API 접근을 요청한 다음, 계정 설정의 Developer API 섹션에서 키를 만드세요.
   - **Nalo Solutions**(가나) -- Nalo Solutions 계정의 인증 키를 **API Key**로, Nalo가 승인한 **Sender ID**(발신자 ID)(최대 11자)를 입력하세요.
   - **Twilio** -- 교회 자체 Twilio 계정을 사용하세요. Twilio가 직접 요금을 청구합니다. [Twilio Console](https://console.twilio.com)에서 **Account SID**와 **Auth Token**을 복사하고, **From Number**(발신 번호)를 입력하세요. 이는 A2P 10DLC에 등록된 Twilio 전화번호이며 `+15551234567`과 같은 형식입니다. 저장한 후에는 아래의 수신 웹훅 URL을 Twilio 번호의 **A message comes in**(메시지 수신 시) 웹훅에 붙여 넣으면, STOP 답장도 B1에 기록됩니다.
3. **Save**를 클릭하세요.

문자 발송을 중단하려면 **Provider**를 **None**(없음)으로 설정하고 저장하세요. 저장된 제공자가 삭제됩니다.

### STOP으로 답장한 사람 수신 거부 처리하기 {#opting-out-people-who-reply-stop}

제공자를 저장한 후에는 **Edit**로 Texting 섹션을 다시 여세요. 제공자 설정 아래에는 교회마다 고유한 웹 주소를 보여주는 읽기 전용 **Inbound (STOP) webhook URL**(수신(STOP) 웹훅 URL) 필드가 있습니다. 필드를 클릭하면 주소가 선택되므로 복사한 다음, 문자 서비스 제공자의 수신 메시지(답장) 웹훅 설정에 붙여 넣으세요. 위의 제공자 중 수신 답장을 웹훅으로 전달할 수 있는 제공자라면 모두 이 방식으로 작동합니다.

이후 누군가 발송한 문자에 **STOP**(또는 STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT, REVOKE)으로 답장하면, B1은 휴대폰 번호가 일치하는 모든 사람을 찾아 수신 거부로 표시하고 문자 알림을 끕니다. 그 후에는 그룹 문자에서 제외됩니다. 그 밖의 답장은 무시됩니다.

:::info
이 기능은 **Hide me from the member directory**(회원 디렉터리에서 나 숨기기)와 같은 수신 거부 설정을 사용하므로, STOP으로 답장한 사람은 프로필에 **Hidden from directory**(디렉터리에서 숨겨짐)로도 표시됩니다. 이 필드는 저장된 제공자가 선택되어 있을 때만 나타납니다. 드롭다운을 다른 제공자로 바꾼다면, URL을 다시 보려면 먼저 저장하세요.
:::

제공자가 연결되면, 문자 발송 권한이 있는 직원은 그룹 페이지(**Text this group**(이 그룹에 문자 보내기))와 휴대폰 번호가 있는 사람 페이지(**Send text message**(문자 메시지 보내기))에서 **Text** 버튼을 볼 수 있습니다. 메시지를 입력하고 **Send**를 클릭하세요. 대화 상자는 글자 수와 SMS 세그먼트를 셉니다. 그룹의 경우 보내기 전에 문자를 받을 구성원 수를 보여줍니다.

- 휴대폰 번호가 등록되어 있지 않은 구성원은 건너뜁니다.
- **Hide me from the member directory**를 선택한 구성원은 수신 거부로 집계되어 건너뜁니다.
- 휴대폰 번호를 공유하는 가족 구성원은 문자를 한 번만 받습니다.

### 병합 필드로 문자 개인화하기 {#personalizing-texts-with-merge-fields}

메시지 상자 아래에서 문자 대화 상자에는 자리 표시자 칩이 있습니다. **First Name**(이름), **Last Name**(성), **Display Name**(표시 이름), **Church Name**(교회 이름)입니다. 칩을 클릭하면 커서 위치에 해당 자리 표시자(`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`)가 삽입됩니다. 문자가 발송되면 각 자리 표시자는 수신자의 정보로 바뀌므로, `Hi {{firstName}}, see you Sunday!`(안녕하세요 `{{firstName}}`님, 주일에 봐요!)와 같은 그룹 문자는 구성원마다 각자의 이름으로 전달됩니다. 자리 표시자는 그룹 문자와 개인 문자 모두에서 작동합니다. 그룹에 보내는 문자에는 **Group Name**(그룹 이름) 칩(`{{groupName}}`)도 있으며, 그룹의 이름으로 바뀝니다.

메시지를 재사용하려면 [문자 템플릿](./email-templates.md#text-templates)(**Text** 분류의 이메일 템플릿)으로 저장한 다음, 문자 창 상단의 **Load Template (optional)**(템플릿 불러오기(선택 사항))에서 고르세요.

:::info
1,600자 제한은 입력하는 메시지에 적용됩니다. 자리 표시자가 채워진 후 1,600자를 넘는 문자는 그 길이에서 잘립니다.
:::

문자는 [워크플로](../serving/workflows.md#sending-a-text) 단계의 **Send Text** 작업으로도 자동 발송할 수 있습니다. 같은 제공자와 자리 표시자를 사용합니다.

## 파일 저장소 {#file-storage}

기본적으로 웹사이트에 업로드하는 파일([파일](../website/files.md)을 통해)과 기타 콘텐츠 영역의 파일은 최대 100MB까지 B1의 무료 호스팅 저장소를 사용합니다. 공간이 더 필요하다면 자체 클라우드 저장소를 연결할 수 있습니다. 그러면 새로 업로드하는 파일이 플랫폼 제한 없이 바로 계정에 저장됩니다.

1. 설정 페이지에서 왼쪽 목록의 **File Storage**(파일 저장소)를 클릭한 다음 **File Storage** 섹션에서 **Edit**를 클릭하세요.
2. **Provider**를 선택하세요. **Google Drive**, **Dropbox**, 또는 **S3-Compatible Bucket (S3, R2, B2)**(S3 호환 버킷(S3, R2, B2)) (AWS S3, Cloudflare R2, Backblaze B2 등)입니다. **ChurchApps (Free)**(ChurchApps(무료))는 기본 제공 저장소입니다.
3. Google Drive나 Dropbox라면 **Connect Account**(계정 연결)를 클릭하고 로그인하여 접근을 승인하세요. 정상적으로 연결되면 **Account connected**(계정 연결됨) 배지가 나타나며, 저장하려면 먼저 연결해야 합니다. S3 호환 버킷이라면 **Access Key Id**, **Secret Access Key**, **Bucket**(버킷), **Endpoint**(엔드포인트)(AWS라면 비워 두세요), **Region**(지역), **Public URL Base**(공개 URL 기본 주소)를 입력하세요. **Bucket**과 **Public URL Base**는 필수이며, 버킷은 공개 읽기와 B1에서의 CORS 업로드를 허용해야 합니다.
4. **Save**를 클릭하세요.

무료 저장소로 되돌아가려면 **ChurchApps (Free**)를 선택하고 저장하세요. 이미 업로드된 파일은 그대로 남아 있습니다.

:::info
이 설정은 웹사이트 파일 및 이와 비슷한 콘텐츠 영역에 대한 새 업로드에만 영향을 줍니다. 갤러리 이미지, 썸네일, 로고, 사람 사진은 항상 B1의 기본 저장소에 남습니다.
:::

## 헌금 {#giving}

**Giving**(헌금) 섹션은 온라인 헌금과 유료 등록을 위해 결제 제공자를 연결하고 교회의 통화를 설정합니다. [온라인 헌금 설정](../donations/online-giving-setup.md)을 참고하세요. 헌금 설정을 편집할 권한이 있는 사람에게만 표시됩니다.

## 체크인 {#check-in}

**Check-In**(체크인) 섹션은 **Volunteer Ratio Enforcement**(자원봉사자 비율 적용)를 설정합니다. 즉, 방에 자원봉사자가 부족할 때 체크인에 경고만 할지(**Warn (allow with confirmation)**(경고(확인 후 허용))), 아니면 체크인을 중단할지(**Block (prevent check-in)**(차단(체크인 방지)))를 정합니다. [자원봉사자 비율](../attendance/checkin-safety.md#volunteer-ratios)을 참고하세요. 그 아래의 **Check-in kiosk, QR, and labels**(체크인 키오스크, QR, 라벨) 링크는 모바일 페이지의 키오스크 설정을 엽니다.

## 학년 진급 {#grade-promotion}

자녀와 학생의 **Grade**(학년)를 관리한다면, B1은 각 프로필을 일일이 수정하지 않아도 선택한 날짜(예: 8월 1일)에 모든 사람의 학년을 자동으로 한 단계씩 올릴 수 있습니다.

1. 설정 페이지에서 왼쪽 목록의 **Grade Promotion**(학년 진급)을 클릭한 다음 **Grade Promotion** 섹션에서 **Edit**를 클릭하세요.
2. 스위치를 켜고(**Enabled**(사용)로 표시됨) 매년 학년을 올릴 **Month**(월)와 **Day**(일)를 선택하세요. 그 날짜에 학년이 있는 모든 사람은 한 학년 올라가며, 12학년은 **Graduated**(졸업)가 됩니다.
3. 변경 사항을 저장하세요.

자동 진급을 중단하려면 스위치를 꺼서 **Disabled**(사용 안 함)로 표시되게 한 다음 저장하세요. 진급 날짜가 제거되며, 학년은 더 이상 자동으로 바뀌지 않습니다.

## 자원봉사 신청 {#volunteer-signup}

기본적으로 [자원봉사 신청](../../b1-church/serving/volunteer-signup.md)을 둘러보는 구성원은 빈 자리가 있는 모든 예정 주를 볼 수 있습니다. 목록이 길어지면 계획 유형마다 다음 한 주만 보여줄 수 있습니다.

1. 설정 페이지에서 왼쪽 목록의 **Volunteer Signup**(자원봉사 신청)을 클릭한 다음 **Volunteer Signup** 섹션에서 **Edit**를 클릭하세요.
2. **Show only the next week of each plan type**(계획 유형별로 다음 주만 표시)을 켜세요.
3. 변경 사항을 저장하세요.

이 설정을 켜면 각 계획 유형은 다음 예정 계획 하나만 보여줍니다. 그 날짜가 지나면 그다음 주가 나타납니다. 이 섹션의 **Weeks shown**(표시되는 주) 항목에는 **Only the next week of each plan type**(계획 유형별 다음 주만) 또는 **All upcoming weeks**(예정된 모든 주)가 표시됩니다.

## 헌금 개인정보 보호 {#giving-privacy}

헌금 권한이 있는 사람은 보통 사람의 [개인 기록](../people/adding-people.md#editing-details)에서 그 사람의 헌금 합계를 볼 수 있습니다. 기록을 열 때마다 금액이 화면에 표시되는 것을 원하지 않는다면, 누군가 요청할 때까지 금액을 숨길 수 있습니다.

1. 설정 페이지에서 왼쪽 목록의 **Giving privacy**(헌금 개인정보 보호)를 클릭한 다음 **Giving privacy** 섹션에서 **Edit**를 클릭하세요.
2. **Hide giving on person records until clicked**(클릭할 때까지 사람 기록에서 헌금 숨기기)를 켜세요.
3. 변경 사항을 저장하세요.

이 설정을 켜면 사람 기록의 헌금 카드에 "Giving is hidden on person records."(헌금이 사람 기록에서 숨겨져 있습니다.)라고 표시됩니다. **Show giving**(헌금 보기)을 클릭하면 그 사람의 헌금이 불러와져 표시됩니다. 다른 사람의 기록을 열면 다시 숨겨집니다. 누가 헌금을 볼 수 있는지는 바뀌지 않습니다. 헌금 접근 권한이 있는 사람만 이 카드를 봅니다.

## 가져오기 및 내보내기 {#import-and-export}

설정 페이지에서 교회 이름 아래의 **Import/Export**(가져오기/내보내기) 링크는 새 브라우저 창에서 전용 도구를 엽니다. 이 도구는 다음 용도로 사용하세요.

- 다른 교회 관리 시스템의 구성원 데이터 가져오기
- 백업이나 이전을 위해 ChurchApps 데이터 내보내기

교회를 처음 설정하면서 기존 기록을 ChurchApps로 옮겨야 할 때 특히 유용합니다.

:::warning
데이터를 가져올 때는 항상 먼저 기존 기록을 백업하세요. 가져오기 작업은 시스템에 데이터를 추가하며, 여러 번 실행하면 중복 항목이 생길 수 있습니다.
:::
