---
title: "서버 관리"
---

# 서버 관리

<div class="article-intro">

ChurchApps의 서버 관리 기능은 **Server.Admin** 권한을 가진 사용자만 사용할 수 있습니다. 이 도구는 시스템의 모든 교회에 걸쳐 플랫폼 운영, 지원 및 문제 해결을 위해 사용됩니다.

</div>

:::warning 액세스 제한됨
이 페이지에 설명된 기능은 **Server.Admin** 권한이 필요하며 일반 교회 관리자에게는 사용할 수 없습니다. 플랫폼 운영자 및 지원 직원만 사용하도록 의도됩니다.
:::

## 서버 관리자에 액세스

Server.Admin 권한이 있는 사용자는 B1 Admin에서 서버 관리 패널에 액세스할 수 있습니다:

1. [admin.b1.church](https://admin.b1.church)에 로그인합니다
2. [Jump 메뉴](../b1-admin/introduction.md#getting-around-with-the-jump-menu)를 열고 **Settings**를 확장한 다음 **Server Admin**을 클릭합니다. (직접 `admin.b1.church/admin`으로 이동할 수도 있습니다.)
3. Server Admin 패널에는 Churches, Users, Impersonate User, Background Jobs, Commons, Usage Trends, Translation Lookups, Server Health, 그리고 Database Migrations에 대한 섹션이 있습니다

## 사용자 가장하기

가장 기능을 사용하면 서버 관리자가 지원 및 문제 해결을 위해 다른 사용자로 로그인할 수 있습니다. 이는 사용자 보고 문제를 조사하거나 교회가 그들의 시스템을 구성하도록 돕는 데 유용합니다.

### 사용자를 가장하는 방법

1. Server Admin 패널의 **Impersonate User** 섹션을 열고
2. 검색 필드에 사용자의 이름 또는 이메일 주소를 입력합니다
3. **Search**를 클릭하거나 Enter를 누릅니다
4. 검색 결과에서 가장하려는 사용자를 클릭합니다
5. 나타나는 대화에서 가장을 확인합니다
6. 그 사용자로 로그인되고 그들의 계정으로 리디렉션됩니다

### 중요 참고

- 가장은 대상 사용자의 권한 및 교회 액세스와 함께 새 세션을 만듭니다
- 다른 사용자를 가장할 때 원래 관리자 세션이 종료됩니다
- 가장하는 동안 취한 모든 작업은 감사 추적에 기록됩니다
- 관리자 계정으로 돌아가려면 로그아웃하고 자격 증명으로 다시 로그인합니다
- 가장은 지원 목적이 필요할 때만 사용하고 항상 사용자에게 지원을 위해 그들의 계정에 액세스할 때 알립니다

### API 엔드포인트

가장 기능은 Membership API의 `/users/:userId/impersonate` 엔드포인트로 백업됩니다. 기술 세부사항은 [Membership Endpoints](/docs/developer/api/endpoints/membership#users)를 참조합니다.

### 보안 고려사항

- 가장은 Server.Admin 권한을 필요합니다 - 이 권한은 신뢰할 수 있는 플랫폼 운영자에게만 희소하게 부여되어야 합니다
- 모든 가장 이벤트는 관리자 사용자 ID 및 대상 사용자 ID로 기록됩니다
- 가장이 발생할 때 교회에 알려지지 않으므로 이 기능을 언제 그리고 어떻게 사용해야 하는지에 대한 명확한 정책을 수립합니다
- 지원 티켓 시스템에서 가장 이벤트를 기록하여 책임을 위해

## Commons 조정

Commons는 사용자 제출 콘텐츠의 공유 조정 대기열입니다 - WorshipCommons 노래, Lessons.church 레슨, FreeShow 템플릿, 그리고 B1 웹사이트 빌더 템플릿 모두 제품별 검토 도구가 아니라 동일한 대기열을 흐르고 있습니다.

### Commons 액세스

1. Server Admin 패널의 **Commons** 탭으로 이동합니다.
2. **Queue**, **Reports**, 그리고 **Assets** 세 개의 하위 탭을 보게 됩니다.

제한된 **music editor** 역할도 Queue 탭을 볼 수 있지만 노래의 권리 또는 라이센싱을 변경하는 제출을 승인하지 못합니다.

### 대기열

Queue는 모든 제품에 걸친 모든 pending 제출을 나열하고, 제품 및 자산 유형별로 필터링 가능합니다. 각 행은 제출이 새 자산, 원래 저자의 편집, 또는 제3자의 편집인지, 제출자의 승인 추적 기록, 그리고 제출이 기다린 시간(72시간을 초과하면 표시됨)을 보여줍니다.

**Review**를 클릭하여 필드 수준 diff, 파일 미리보기, 그리고 항목의 임베드된 읽기 전용 미리보기를 가진 서랍을 열고 나타납니다. **a**/**r** 키보드 단축키를 사용하여 승인하거나 거부하고 **j**/**k**를 사용하여 서랍을 떠나지 않고 다음 또는 이전 제출로 이동합니다. 거부는 이유(예를 들어 품질, 중복, 라이센싱, ccli, ai, 또는 off-topic)와 노트를 선택해야 합니다.

### 보고서

Reports 탭은 이미 발행된 자산에 대해 제출된 저작권 및 정책/품질 보고서를 처리하고, 별도의 Copyright 및 Policy & Other 대기열과 Resolved 기록으로 분할합니다. 보고서를 주장하여 그것을 작동하기 시작한 다음 해상도(지지됨, 기각됨, 또는 중복) 및 작업(없음, unpublish, 또는 제거)으로 그것을 해결합니다.

### 자산

Assets 탭은 발행된 콘텐츠의 검색 가능한 브라우저이며 자산을 **Feature**(제품의 홈페이지에 강조 표시), **Unpublish**/**Republish**, 또는 **Remove**(저작권 또는 정책 이유 포함)할 작업이 있습니다.

노래의 경우 특히, 이것은 노래가 **Sunday-ready**되고 교회의 B1 Admin 노래 검색에 나타날 자격이 있는 곳입니다: 리뷰어는 자산을 열고 각 발행된 키를 통해 그들이 들었고 악보, 코드, 그리고 슬라이드가 모두 있음을 확인한 후 **Listened**로 표시합니다. 노래는 모든 키가 체크 오프되면 Sunday-ready가 됩니다.

:::info
Commons 조정은 직원만 - 개별 교회는 절대로 이 대기열을 보지 않습니다. 개별 교회의 B1 Admin이 Commons 데이터를 터치하는 유일한 곳은 [노래 검색](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons)의 "WorshipCommons - free" 섹션이며, 이는 이미 이 검토 과정을 통과한 노래만 표면화합니다.
:::

[Content Commons architecture](/docs/developer/architecture/commons) 페이지에서 기본 데이터 모델 및 제출 라이프사이클을 참조합니다.

## 그룹 이메일 승인

교회는 서버 관리자가 그들을 승인할 때까지 교회 저작 이메일(그룹 이메일, 양식 후속, 워크플로우 이메일, 계정 초대)을 보낼 수 없습니다. 이는 bot 등록 교회가 스팸을 위해 공유 ChurchApps 발송 주소를 사용하지 못하도록 유지합니다.

1. Server Admin 패널의 **Churches** 탭을 열고
2. 각 교회는 **Group Email** 칩: **Approved**(green) 또는 **Not approved**(outlined)를 보여줍니다.
3. 칩을 클릭하고 교회를 승인하거나 승인을 폐지하려면 확인합니다.

교회 직원은 B1 Admin의 Send Email 대화에서 **Request review** 버튼으로 승인을 요청합니다. 요청은 지원 주소로 이메일을 보내고 교회의 이름, ID, 등록 날짜, 위치, 그리고 누가 요청했는지 나열합니다. 교회는 주당 최대 하나의 요청을 보낼 수 있습니다. [교회 저작 이메일 제한](/docs/developer/architecture/notifications#church-authored-email-limits)을 참조하여 일일 수당 및 바운스 및 불만에 대한 자동 일시 중지를 참조합니다.

## 데이터베이스 마이그레이션

배포는 데이터베이스를 변경하지 않습니다. 호스트된 데이터베이스는 Api의 네트워크 내부에서만 연결을 수락하므로 마이그레이션을 추가하는 릴리스 후 서버 관리자는 **Database Migrations** 탭에서 그것을 적용합니다. (자체 호스트 Docker 설치는 여전히 Api 컨테이너가 시작될 때 마이그레이션을 자동으로 실행합니다.)

탭은 현재 환경을 보여주고 모듈당 하나의 행(멤버십, 출석, 기부금, 등)을 그들의 상태, 적용되고 pending 마이그레이션 수, 그리고 마지막으로 적용된 것과 함께 보여줍니다.

- **Run Pending Migrations**은 모든 pending 마이그레이션을 적용하고, 모듈을 하나씩 순서대로 합니다. 그것은 첫 실패에서 멈추고 각 모듈에 대해 무엇이 적용되었는지 보여줍니다.
- 모듈을 **No history**로 표시하면 마이그레이션 추적에 선행된 데이터베이스를 가집니다. 라이브 테이블 위로 이전 데이터 마이그레이션을 재생할 것이므로 그것은 절대로 자동으로 실행되지 않습니다. 대신 그 모듈의 **Check Schema**를 클릭합니다. Api는 각 마이그레이션이 만드는 테이블, 열, 그리고 인덱스를 라이브 데이터베이스와 비교하고 각 마이그레이션을 **Already applied**, **Missing**, **Partly applied**, 또는 **Data only**로 표시합니다. 아무것도 체크에 의해 변경되지 않습니다.
- 체크 결과에서 **Record as Already Applied**는 마이그레이션을 실행하지 않고 감지된 마이그레이션을 마이그레이션 기록에 작성합니다(확인 후). 마지막 **Already applied** 마이그레이션까지의 모든 것이 기록되고, **Data only** 그 범위에 있는 것들 포함; **Missing** 것들은 pending으로 남고 **Run Pending Migrations**으로 정상적으로 실행할 수 있습니다.
- **Partly applied** 마이그레이션이 기록을 차단합니다. 마이그레이션이 다시 실행하기에 안전하면(먼저 읽기), **Re-run**을 틱하여 pending으로 유지되고 위에서 다시 실행됩니다.

Server Admin 패널 및 CLI(`yarn migrate:up`)는 동일한 Kysely 마이그레이터 및 `kysely_migration` 테이블을 사용하므로 적용된 것에 항상 동의합니다. 백업 엔드포인트는 `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect`, 그리고 `POST .../:module/baseline`이며, 모두 Server.Admin만.

## 관련 페이지

- [인증 및 권한](/docs/developer/api/endpoints/authentication) - 권한 모델 및 JWT 인증
- [Membership Endpoints](/docs/developer/api/endpoints/membership) - 사용자 및 교회 관리 API
- [Audit Log](/docs/b1-admin/reports/audit-log) - 교회의 활동 로그 보기
- [Content Commons Architecture](/docs/developer/architecture/commons) - 공유 자산 모델 및 조정 라이프사이클
