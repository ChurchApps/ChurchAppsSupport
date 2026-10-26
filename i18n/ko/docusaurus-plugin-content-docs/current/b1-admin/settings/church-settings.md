---
title: "교회 설정"
---

# 교회 설정

<div class="article-intro">

교회 설정 페이지에서는 교회의 기본 정보, 연락처, 브랜딩을 설정합니다. 이 정보는 B1.church 웹사이트와 B1 Mobile 앱을 포함한 모든 ChurchApps 도구에서 사용됩니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- "Edit Church Settings" 권한이 필요합니다. 접근 권한이 없다면 [역할 및 권한](./roles-permissions.md)을 참고하세요.
- 교회의 주소, 연락처 정보, 로고를 준비하세요.

</div>

## 교회 정보 편집하기

1. B1 Admin에서 [Jump 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 상단의 검색창)를 열고 **Settings**를 펼친 다음 **Settings**를 클릭합니다.
2. **Church Information** 섹션(페이지 상단)에서 **Edit**를 클릭합니다.
3. 다음 필드 중 원하는 항목을 수정합니다.
   - **Church Name** -- 모든 ChurchApps 제품에 표시되는 이름입니다.
   - **Address** -- 교회의 실제 주소입니다.
   - **Contact Information** -- 전화번호, 이메일 및 기타 연락처 정보입니다.
   - **Time Zone** -- 교회의 시간대입니다. 아래의 [시간대](#time-zone)를 참고하세요.
4. **Save**를 클릭하여 변경 사항을 적용합니다.

## 서브도메인 설정하기

교회에는 **yourchurch.1.church** 형식의 무료 서브도메인이 제공됩니다. 회원과 방문자가 교회의 온라인 공간에 접속하는 웹 주소입니다.

1. 설정 페이지에서 **Church Information** 섹션의 **Edit**를 클릭하고 **Subdomain** 필드를 찾습니다.
2. 원하는 서브도메인을 입력합니다(예: gracechurch.1.church를 원하면 "gracechurch").
3. 변경 사항을 저장합니다.

:::info
서브도메인은 모든 ChurchApps 교회에서 고유해야 합니다. 원하는 이름이 이미 사용 중이라면 도시나 주 이름을 추가해 보세요(예: "gracechurch-dallas").
:::

방문자가 자체 도메인(예: **www.gracechurch.org**)으로 교회 사이트에 접속하기를 원하면 [사용자 지정 도메인](./custom-domain.md)을 참고하세요.

## 브랜딩 설정하기

모든 ChurchApps 도구에서 교회가 표시되는 방식을 설정합니다.

1. 로고 영역을 클릭하고 이미지 파일을 선택하여 **교회 로고**를 업로드합니다.
2. 웹사이트와 [모바일 앱](./mobile-app.md)에서 사용할 추가 **교회 이미지**를 추가합니다.

:::tip
가장 좋은 결과를 얻으려면 투명한 배경의 PNG 형식 로고를 사용하세요. 밝은 배경과 어두운 배경 모두에서 잘 보입니다.
:::

## 주의 첫 요일

캘린더가 시작할 요일을 선택합니다. 교회 정보 섹션의 **First Day of Week** 드롭다운은 기본값이 **Sunday**이지만 원하는 요일로 바꿀 수 있습니다. 변경하면 B1 Admin과 B1.church 회원 포털의 캘린더 격자에 적용됩니다. 그룹 캘린더, 큐레이션 캘린더, 이벤트 편집기 모두 선택한 요일부터 주가 시작되도록 표시됩니다.

## 시간대

**Church Information** 섹션의 **Time Zone** 드롭다운은 교회의 시간대를 설정합니다(예: *America/Chicago*). 비워 두려면 **None**을 선택합니다. 저장하면 시간대가 교회 정보 요약에 표시됩니다.

B1은 이 시간대를 이벤트 알림, [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md) TV의 일정 등 교회 전체의 시간에 사용합니다. [체크인 일정](../attendance/setup.md#setting-a-check-in-schedule)은 먼저 예배가 진행되는 [캠퍼스](./campuses.md)의 시간대를 기준으로 측정되며, 캠퍼스에 시간대가 없을 때만 교회 시간대를 사용합니다. 모든 캠퍼스가 같은 시간대에 있다면 교회와 각 캠퍼스 모두에 설정하세요.

## 지역(날짜 및 전화번호 형식)

**Region** 설정은 B1 전체에서 날짜와 시간을 표기하는 방식을 결정합니다. 기본값은 미국식 날짜 형식입니다(예: "Sep 28, 2026" 및 "9/28/2026"). 미국 외 교회는 자국 형식으로 바꿀 수 있습니다. 예를 들어 English (United Kingdom)을 선택하면 "28 Sept 2026" 및 "28/09/2026"으로 표시됩니다.

1. 설정 페이지의 왼쪽 목록에서 **Region**을 클릭한 다음 **Region** 섹션의 **Edit**를 클릭합니다.
2. **Region** 드롭다운에서 지역을 선택합니다. 각 옵션에는 샘플 날짜가 표시되므로 날짜가 실제로 어떻게 보일지 확인할 수 있습니다.
3. **Save**를 클릭합니다.

그러면 Region 섹션에 선택한 지역, **Date format**의 샘플, **Phone numbers** 형식이 표시됩니다.

### 전화번호 형식

같은 Region 섹션에는 사람의 기록에 전화번호를 입력하는 방식을 결정하는 **Phone numbers** 설정이 있습니다.

- **International (with country code)** -- 기본값입니다. 전화번호 필드에 국기 선택기가 표시되며 국가 번호와 함께 저장됩니다(예: +1 918 555 1234).
- **Local (as typed)** -- 전화번호 필드가 일반 텍스트 상자로 바뀌며, 입력한 그대로 국가 번호를 추가하지 않고 저장합니다(예: 0701 234 5678). 교회가 현지 형식으로 번호를 쓰고 B1이 국가 번호를 추가하지 않도록 하려면 이것을 선택하세요.

**Local**을 선택하면 Region 섹션에 지역 옆에 "Local phone numbers"도 표시됩니다.

:::tip
문자 메시지는 국가 번호가 포함되어 있을 때 가장 잘 작동합니다. B1에서 문자를 보낸다면 **International** 형식을 유지하거나, Local 모드에서 입력하는 번호에 국가 번호를 포함하세요.
:::

지역 설정은 B1 Admin뿐 아니라 B1.church 웹사이트와 회원 포털의 날짜와 시간에도 적용됩니다. 설교, 블로그 글, 그룹 캘린더, 서비스 계획이 포함되므로 회원도 직원과 같은 형식의 날짜를 보게 됩니다.

## 문자 서비스 {#texting}

문자 서비스 제공업체를 연결하면 B1 Admin에서 한 사람이나 그룹 전체에 SMS를 보낼 수 있습니다. 문자는 교회가 제공업체와 맺은 계정을 통해 발송되므로 해당 제공업체의 요금과 한도가 적용됩니다.

1. 설정 페이지의 왼쪽 목록에서 **Texting**을 클릭한 다음 **Texting** 섹션의 **Edit**를 클릭합니다.
2. **Provider**를 선택합니다.
   - **Clearstream** -- **API Key**를 입력합니다. Clearstream 계정 설정의 API Keys에서 만들 수 있습니다.
   - **Text In Church** -- **API Key**를 입력합니다. 먼저 Text In Church 지원팀에 개발자 API 접근을 요청한 다음, 계정 설정의 Developer API 섹션에서 키를 만드세요.
   - **Nalo Solutions**(가나) -- Nalo Solutions 계정의 인증 키를 **API Key**로 입력하고, Nalo에서 승인받은 **Sender ID**(최대 11자)를 입력합니다.
   - **Twilio** -- 교회의 자체 Twilio 계정을 사용합니다. Twilio 요금은 교회에 직접 청구됩니다. [Twilio Console](https://console.twilio.com)에서 **Account SID**와 **Auth Token**을 복사하고, **From Number**를 입력합니다. 이는 A2P 10DLC에 등록된 Twilio 전화번호이며 `+15551234567`과 같은 형식입니다. 저장한 후 아래 설명된 수신 webhook URL을 Twilio의 번호에 있는 **A message comes in** webhook에 붙여 넣어야 STOP 답장도 B1에 기록됩니다.
3. **Save**를 클릭합니다.

문자 발송을 중단하려면 **Provider**를 **None**으로 설정하고 저장합니다. 그러면 저장된 제공업체가 제거됩니다.

### STOP으로 답장한 사람 수신 거부 처리하기

제공업체를 저장한 후에는 **Edit**로 Texting 섹션을 다시 엽니다. 제공업체 설정 아래에는 교회 고유의 웹 주소가 표시되는 읽기 전용 **Inbound (STOP) webhook URL** 필드가 있습니다. 필드를 클릭하여 주소를 선택하고 복사한 다음, 문자 서비스 제공업체의 수신 메시지(답장) webhook 설정에 붙여 넣으세요. 위에 나열된 제공업체 중 수신 답장을 webhook으로 전달할 수 있는 제공업체라면 모두 작동합니다.

이후 누군가 보낸 문자에 **STOP**(또는 STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT, REVOKE)로 답장하면 B1은 휴대폰 번호가 일치하는 모든 사람을 찾아 수신 거부로 표시하고 문자 알림을 끕니다. 이후 이들은 그룹 문자에서 제외됩니다. 다른 답장은 무시됩니다.

:::info
이 기능은 **Hide me from the member directory**와 같은 수신 거부 설정을 사용하므로, STOP으로 답장한 사람은 프로필에도 **Hidden from directory**로 표시됩니다. 이 필드는 저장된 제공업체가 선택되어 있을 때만 나타납니다. 드롭다운을 다른 제공업체로 바꾸면 URL을 다시 보려면 먼저 저장해야 합니다.
:::

제공업체를 연결하면 문자 발송 권한이 있는 직원은 그룹 페이지(**Text this group**)와 휴대폰 번호가 있는 사람의 페이지(**Send text message**)에서 **Text** 버튼을 볼 수 있습니다. 메시지를 입력하고 **Send**를 클릭합니다. 대화 상자는 글자 수와 SMS 세그먼트를 셉니다. 그룹의 경우 보내기 전에 문자를 받을 구성원 수를 보여 줍니다.

- 휴대폰 번호가 등록되어 있지 않은 구성원은 제외됩니다.
- **Hide me from the member directory**를 선택한 구성원은 수신 거부된 것으로 계산되어 제외됩니다.
- 같은 휴대폰 번호를 공유하는 가족 구성원은 문자를 한 번만 받습니다.

### 병합 필드로 문자 개인화하기 {#personalizing-texts-with-merge-fields}

메시지 상자 아래에 문자 대화 상자는 **First Name**, **Last Name**, **Display Name**, **Church Name** 칩을 표시합니다. 칩을 클릭하면 커서 위치에 해당 자리표시자(`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`)가 삽입됩니다. 문자를 보내면 각 자리표시자는 수신자의 정보로 바뀌므로, `Hi {{firstName}}, see you Sunday!`와 같은 그룹 문자는 각 구성원에게 그 사람의 이름으로 전달됩니다. 자리표시자는 그룹 문자와 한 사람에게 보내는 문자 모두에서 작동합니다.

:::info
1,600자 제한은 입력한 메시지 기준으로 적용됩니다. 자리표시자가 채워진 후 1,600자를 넘는 문자는 그 길이에서 잘립니다.
:::

문자는 [워크플로](../serving/workflows.md#sending-a-text) 단계의 **Send Text** 작업으로도 자동 발송될 수 있습니다. 이때도 같은 제공업체와 자리표시자를 사용합니다.

## 파일 저장소

기본적으로 웹사이트 파일([파일](../website/files.md)을 통해)과 기타 콘텐츠 영역에 업로드한 파일은 최대 100MB까지 B1의 무료 호스팅 저장소를 사용합니다. 공간이 더 필요하다면 대신 자신의 클라우드 저장소를 연결할 수 있습니다. 그러면 새로 업로드하는 파일은 플랫폼 제한 없이 바로 계정으로 저장됩니다.

1. 설정 페이지의 왼쪽 목록에서 **File Storage**를 클릭한 다음 **File Storage** 섹션의 **Edit**를 클릭합니다.
2. 제공업체를 선택합니다. **Google Drive**, **Dropbox**, **OneDrive**, 또는 **S3 호환 버킷**(AWS S3, Cloudflare R2, Backblaze B2 등)이 있습니다.
3. Google Drive, Dropbox, OneDrive의 경우 **Connect**를 클릭하고 로그인하여 접근을 승인합니다. S3 호환 버킷의 경우 액세스 키, 시크릿, 버킷 이름, 공개 URL 기본 경로를 입력합니다.
4. **Save**를 클릭합니다.

:::info
이 설정은 웹사이트 파일 및 이와 비슷한 콘텐츠 영역에 대한 새 업로드에만 영향을 줍니다. 갤러리 이미지, 썸네일, 로고, 사람 사진은 항상 B1의 기본 저장소에 남습니다.
:::

## 학년 진급

어린이와 학생의 **Grade**(학년)를 관리하는 경우, B1은 프로필을 일일이 수정하지 않아도 선택한 날짜(예: 8월 1일)에 모든 사람을 한 학년씩 자동으로 올릴 수 있습니다.

1. 설정 페이지의 왼쪽 목록에서 **Grade Promotion**을 클릭한 다음 **Grade Promotion** 섹션의 **Edit**를 클릭합니다.
2. 스위치를 켜고(**Enabled**로 표시됨) 매년 학년을 올릴 **Month**와 **Day**를 선택합니다. 그 날짜에 학년이 있는 모든 사람은 한 학년씩 올라가며, 12학년은 **Graduated**가 됩니다.
3. 변경 사항을 저장합니다.

자동 진급을 멈추려면 스위치를 꺼서 **Disabled**로 표시되도록 한 다음 저장하세요. 진급 날짜가 삭제되고 학년이 더 이상 자동으로 바뀌지 않습니다.

## 봉사자 신청 {#volunteer-signup}

기본적으로 [봉사자 신청](../../b1-church/serving/volunteer-signup.md)을 둘러보는 회원은 자리가 남아 있는 앞으로의 모든 주를 볼 수 있습니다. 목록이 길어지면 대신 계획 유형마다 다음 한 주만 표시하도록 설정할 수 있습니다.

1. 설정 페이지의 왼쪽 목록에서 **Volunteer Signup**을 클릭한 다음 **Volunteer Signup** 섹션의 **Edit**를 클릭합니다.
2. **Show only the next week of each plan type**을 켭니다.
3. 변경 사항을 저장합니다.

이 설정을 켜면 각 계획 유형은 다음 예정 계획만 표시합니다. 다음 주는 해당 날짜가 지난 후에 나타납니다. 이 섹션의 **Weeks shown** 행에는 **Only the next week of each plan type** 또는 **All upcoming weeks**가 표시됩니다.

## 헌금 개인정보 보호 {#giving-privacy}

헌금 조회 권한이 있는 사람은 보통 [사람 기록](../people/adding-people.md#editing-details)에서 그 사람의 헌금 합계를 볼 수 있습니다. 기록을 열 때마다 금액이 화면에 보이는 것을 원하지 않는다면 누군가 요청할 때까지 숨길 수 있습니다.

1. 설정 페이지의 왼쪽 목록에서 **Giving privacy**를 클릭한 다음 **Giving privacy** 섹션의 **Edit**를 클릭합니다.
2. **Hide giving on person records until clicked**를 켭니다.
3. 변경 사항을 저장합니다.

이 설정을 켜면 사람 기록의 헌금 카드에 "Giving is hidden on person records."라고 표시됩니다. **Show giving**을 클릭하면 그 사람의 헌금을 불러와 표시합니다. 다른 사람의 기록을 열면 다시 숨겨집니다. 헌금을 볼 수 있는 사람이 바뀌지는 않습니다. 헌금 접근 권한이 있는 사람만 이 카드를 봅니다.

## 가져오기 및 내보내기

설정 페이지에서 교회 이름 아래의 **Import/Export** 링크를 클릭하면 새 브라우저 창에서 전용 도구가 열립니다. 이 도구는 다음 용도로 사용합니다.

- 다른 교회 관리 시스템에서 구성원 데이터를 가져옵니다.
- 백업이나 이전을 위해 ChurchApps 데이터를 내보냅니다.

교회를 처음 설정하면서 기존 기록을 ChurchApps로 옮겨야 할 때 특히 유용합니다.

:::warning
데이터를 가져올 때는 항상 기존 기록을 먼저 백업하세요. 가져오기 작업은 시스템에 데이터를 추가하며, 여러 번 실행하면 중복 항목이 생길 수 있습니다.
:::
