---
title: "Google Sheets"
description: "B1 Export 부가기능으로 B1 Admin을 Google Sheets에 연결하여, 필요할 때 사람, 헌금, 그룹, 출석 데이터를 스프레드시트 탭으로 가져오세요."
---

# Google Sheets

<div class="article-intro">

**B1 Export**는 B1.church의 공식 Google Sheets 부가기능입니다. 어떤 스프레드시트에든 사이드바를 추가하여, 교회 B1의 사람, 헌금, 그룹, 출석 데이터를 이름이 붙은 탭으로 내보낼 수 있습니다. 필요할 때 한 번의 클릭으로 가능합니다. 이 부가기능은 사용자의 Google 계정 안에서 전적으로 실행되며, 각 내보내기가 수행하는 읽기 전용 API 호출을 제외하면 ChurchApps의 서버와는 아무런 관련이 없습니다.

</div>

:::caution 아직 사용할 수 없음
B1 Export 부가기능은 아직 Google Workspace Marketplace에 게시되지 않았으므로 지금은 설치할 수 없습니다. 게시되기 전까지는 B1Admin에서 사람 데이터를 내보내고([데이터 내보내기](../people/exporting-data.md) 참고), CSV를 Google Sheets로 가져오세요. 아래 내용은 부가기능이 출시된 후의 작동 방식을 설명합니다.
:::

<div class="prereqs">
<h4>시작하기 전에</h4>

- 내보내기를 할 스프레드시트에 편집 권한이 있는 Google 계정
- B1 API 키를 만들 수 있는 교회 관리자(또는 내보낼 데이터에 읽기 권한이 있는 사람)
- Google Workspace Marketplace에서 설치한 B1 Export 부가기능

</div>

## 내보내는 항목 {#what-it-exports}

| 메뉴 항목 | 시트 탭 | 데이터 |
|---|---|---|
| Export People | `B1 People` | ID, Display Name, First, Last, Email, Membership Status |
| Export Donations | `B1 Donations` | ID, Person ID, Date, Amount, Method, Batch ID |
| Export Groups | `B1 Groups` | ID, Name, Category, Member Count |
| Export Attendance | `B1 Attendance` | ID, Person ID, Visit Date, Service ID, Group ID |

각 내보내기는 이름이 붙은 탭의 내용을 **교체**합니다. 내보내기를 다시 실행하면 행이 추가되는 것이 아니라 최신 스냅샷을 얻게 됩니다. 스프레드시트의 다른 탭은 건드리지 않습니다.

## 설정 {#setup}

### 1. 적절한 권한 범위로 B1 API 키 만들기 {#1-create-a-b1-api-key-with-the-right-scopes}

1. B1Admin에서 **Settings → Developer → API Keys**로 이동하세요.
2. **New API Key**를 클릭하고 이름을 "Sheets Export"로 지정한 다음, 내보낼 항목에 대한 **read** 권한 범위를 부여하세요:
   - People 내보내기에는 `people:read`
   - Donations에는 `donations:read`
   - Groups에는 `groups:read`
   - Attendance에는 `attendance:read`
3. 내보내기만 하는 키에는 `settings:write`가 **필요하지 않습니다**. 이 권한 범위는 웹훅을 등록하는 커넥터(Zapier / Make)에만 필요합니다. 이 키는 최소 권한으로 유지하세요.
4. 저장하고 `cak_…` 키를 복사하세요.

### 2. 부가기능 설치하기 {#2-install-the-add-on}

1. 내보내려는 스프레드시트를 여세요.
2. **Extensions → Add-ons → Get add-ons**를 클릭하세요.
3. **B1 Export**를 검색하여 설치하세요. Google은 시트 접근 권한과 외부 HTTP 접근 권한(부가기능이 B1 API를 호출할 수 있도록)을 허용하라고 요청합니다.

설치 후에는 이 Google 계정으로 여는 모든 스프레드시트의 **Extensions** 메뉴 아래에 **B1 Export** 항목이 나타납니다.

### 3. 키 연결하기 {#3-connect-the-key}

1. **Extensions → B1 Export → Connect**…를 클릭하세요(처음 연 뒤에는 메뉴 표시줄의 **B1 Export → Connect**…도 가능합니다).
2. 키를 사이드바에 붙여넣고, Base URL은 `https://api.churchapps.org`로 두세요(스테이징 환경에서 테스트하는 경우는 예외). 그다음 **Save**를 클릭하세요.
3. **Test Connection**을 클릭하세요. 초록색 "Connection OK"가 표시되면 키가 작동하는 것입니다.

키는 **사용자별 속성**(`PropertiesService.getUserProperties()`)에 저장됩니다. 즉 사용자의 Google 계정에 연결되며, 스프레드시트에 기록되지 않고, 같은 스프레드시트의 다른 편집자에게는 보이지 않습니다.

## 내보내기 실행하기 {#running-an-export}

다음 중 한 가지 방법을 사용하세요:

- **메뉴에서** — **Extensions → B1 Export → Export People**(또는 Donations / Groups / Attendance)
- **사이드바에서** — 사이드바를 열고(Connect…) 해당 데이터셋 버튼을 클릭

완료되면 "_N_ row(s) written to 'B1 People'." 알림이 표시됩니다.

## 내보낸 데이터로 보고서 만들기 {#building-reports-on-top}

내보낸 탭은 일반 Google Sheets 데이터입니다. 참조하는 탭을 사용하여 직접 분석을 만들 수 있습니다:

- 카드 헌금을 합산하는 **요약 탭**: `=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)`
- 구성원만 보여 주는 **필터 보기**: `=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")`
- `B1 Attendance`에서 가져온 출석 추세 **차트**

내보내기를 다시 실행하면 기반 탭이 새로 고쳐지고, 수식도 자동으로 업데이트됩니다.

## 정기 내보내기 예약하기 {#scheduling-recurring-exports}

부가기능은 기본적으로 필요할 때 실행됩니다. 매주 또는 매월 내보내려면 Apps Script의 기본 시간 기반 트리거를 사용하세요:

1. 스프레드시트에서 **Extensions → Apps Script**를 클릭하세요(부가기능에 연결된 스크립트가 열립니다).
2. 왼쪽 사이드바의 **⏰ Triggers** 아이콘을 클릭하세요.
3. `exportPeople`(또는 다른 내보내기 함수)에 대해 **Add Trigger**를 클릭하세요. *Time-driven*, *Week timer*를 선택하고, 예를 들어 *Every Monday 6am*으로 설정하세요.

내보내기는 사용자의 Google 계정으로 백그라운드에서 실행됩니다. API 키가 교체되거나 취소되어 실패하면, 다음 실패 시 트리거가 이메일로 알려 줍니다.

## 권한 및 개인정보 보호 {#permissions--privacy}

- 부가기능은 `spreadsheets.currentonly`(열려 있는 스프레드시트에만 접근 가능)와 `script.external_request`(`UrlFetchApp`이 B1 API를 호출할 수 있도록)만 요청합니다. Drive, Gmail 또는 기타 Google 데이터는 **보지 않습니다**.
- B1 API 키는 사용자별로 저장되므로, 같은 스프레드시트의 다른 편집자는 키를 볼 수 없습니다.
- 모든 B1 API 호출은 `Authorization: Bearer cak_…`와 함께 HTTPS로 이루어집니다.

## 문제 해결 {#troubleshooting}

- **"No API key set"** — **Extensions → B1 Export → Connect**…를 열고 키를 붙여넣으세요.
- **"B1 rejected the API key (401)"** — 키가 삭제되었거나 잘못되었습니다. 새 키를 만들어 붙여넣으세요.
- **"This API key lacks permission for /giving/donations (403)"** — 키에 `donations:read`가 없습니다. 기존 키의 권한 범위는 바꿀 수 없으므로, B1Admin에서 올바른 권한 범위로 새 키를 만드세요.
- **실행 후 시트가 새로 고쳐지지 않음** — *올바른* 탭 이름(`B1 People` 등)을 보고 있는지 확인하세요. 탭이 없었다면 내보내기가 탭을 만듭니다.
- **"Quota exceeded"** — Apps Script는 `UrlFetchApp`에 사용자별 일일 할당량을 적용합니다(보통 하루 수천 회 호출). 기록이 많은 대형 교회는 내보내기를 여러 날로 나누거나, 대용량 동기화를 위해 [Make](./make.md) 또는 사용자 지정 통합을 사용해야 할 수 있습니다.

## 열이 빠져 있나요? {#missing-a-column}

내보내지 않는 열, 추가 데이터셋 또는 다른 출력 형식이 필요하다면 [support@churchapps.org](mailto:support@churchapps.org)로 이메일을 보내 주세요.

## 함께 보기 {#see-also}

- [Zapier](./zapier.md) — 온디맨드 내보내기가 아닌 실시간 동기화용
- [Make](./make.md) — 더 복잡한 변환이 필요한 동기화용
- [API 키(개발자 참고)](/docs/developer/api/api-keys)
