---
title: "서버 관리"
---

# 서버 관리

<div class="article-intro">

ChurchApps의 서버 관리 기능은 **Server.Admin** 권한을 가진 사용자에게만 제공됩니다. 이 도구들은 시스템 내 모든 교회에 대한 플랫폼 운영, 지원, 문제 해결에 사용됩니다.

</div>

:::warning 접근 제한
이 페이지에서 설명하는 기능에는 **Server.Admin** 권한이 필요하며, 일반 교회 관리자는 사용할 수 없습니다. 플랫폼 운영자와 지원 담당자만을 위한 기능입니다.
:::

## 서버 관리 접근하기

Server.Admin 권한이 있는 사용자는 B1 Admin에서 서버 관리 패널에 접근할 수 있습니다:

1. [admin.b1.church](https://admin.b1.church)에 로그인합니다
2. [Jump 메뉴](../b1-admin/introduction.md#getting-around-with-the-jump-menu)를 열고 **Settings**를 확장한 후 **Server Admin**을 클릭합니다. (`admin.b1.church/admin`으로 바로 이동할 수도 있습니다.)
3. 서버 관리 패널은 왼쪽에 섹션을 세 그룹으로 나열합니다: **디렉터리**(Churches, Users, Impersonate User), **운영**(Background Jobs, Commons, Usage Trends), **시스템**(Translation Lookups, Server Health, Database Migrations)

## 사용자 가장하기

가장하기(impersonation) 기능을 사용하면 서버 관리자가 지원 및 문제 해결을 위해 다른 사용자로 로그인할 수 있습니다. 사용자가 보고한 문제를 조사하거나 교회가 시스템을 설정하는 것을 도울 때 유용합니다.

### 사용자를 가장하는 방법

1. 서버 관리 패널에서 **Impersonate User** 섹션을 엽니다
2. 검색 필드에 사용자의 이름 또는 이메일 주소를 입력합니다
3. **Search**를 클릭하거나 Enter 키를 누릅니다
4. 검색 결과에서 가장하고 싶은 사용자를 클릭합니다
5. 나타나는 대화상자에서 가장하기를 확인합니다
6. 해당 사용자로 로그인되며 그 사용자의 계정으로 이동합니다

### 주요 참고 사항

- 가장하기를 하면 대상 사용자의 권한과 교회 접근 권한으로 새 세션이 생성됩니다
- 다른 사용자를 가장하면 원래의 관리자 세션이 종료됩니다
- 가장한 상태에서 수행한 모든 작업은 감사 로그에 기록됩니다
- 관리자 계정으로 돌아가려면 로그아웃한 후 자신의 자격 증명으로 다시 로그인합니다
- 가장하기는 지원에 꼭 필요한 경우에만 사용하고, 지원을 위해 사용자의 계정에 접근할 때는 항상 사용자에게 알리십시오

### API 엔드포인트

가장하기 기능은 Membership API의 `/users/:userId/impersonate` 엔드포인트를 기반으로 합니다. 기술적인 세부 사항은 [Membership 엔드포인트](/docs/developer/api/endpoints/membership#users)를 참조하십시오.

### 보안 고려 사항

- 가장하기에는 Server.Admin 권한이 필요합니다 - 이 권한은 아껴서 부여하고 신뢰할 수 있는 플랫폼 운영자에게만 부여해야 합니다
- 모든 가장하기 이벤트는 관리자 사용자 ID와 대상 사용자 ID와 함께 기록됩니다
- 가장하기가 발생해도 교회에는 알림이 가지 않으므로, 이 기능을 언제 어떻게 사용해야 하는지에 대한 명확한 정책을 마련하십시오
- 책임 추적을 위해 가장하기 이벤트를 지원 티켓 시스템에 기록하는 것을 고려하십시오

## Commons 검토

Commons는 여러 제품에서 사용자가 제출한 콘텐츠를 위한 공유 검토 대기열입니다. WorshipCommons 곡, Lessons.church 수업, FreeShow 템플릿, B1 웹사이트 빌더 템플릿이 모두 제품별 검토 도구를 따로 쓰지 않고 같은 대기열을 거칩니다.

### Commons 접근하기

1. 서버 관리 패널에서 **Commons** 탭으로 이동합니다.
2. 세 개의 하위 탭이 보입니다: **Queue**, **Reports**, **Assets**.

곡의 저작권이나 라이선스를 변경하는 제출은 승인할 수 없도록 제한된 **음악 편집자** 역할도 Queue 탭을 볼 수 있습니다.

### Queue

Queue에는 모든 제품의 대기 중인 제출 항목이 나열되며, 제품과 자산 유형으로 필터링할 수 있습니다. 각 행은 제출이 새 자산인지, 원작자의 수정인지, 제3자의 수정인지와 함께, 제출자의 승인 이력과 제출 후 대기 시간(72시간을 넘으면 표시됨)을 보여줍니다.

**Review**를 클릭하면 필드 수준 차이, 파일 미리보기, 항목의 읽기 전용 미리보기가 포함된 서랍이 열립니다. **a**/**r** 키보드 단축키로 승인 또는 거부하고, **j**/**k**로 서랍을 벗어나지 않고 다음 또는 이전 제출로 이동할 수 있습니다. 거부하려면 사유(예: quality, duplicate, licensing, ccli, ai, off-topic)와 메모를 선택해야 합니다.

### Reports

Reports 탭은 이미 게시된 자산에 접수된 저작권 및 정책/품질 신고를 처리합니다. 신고는 별도의 Copyright 및 Policy & Other 대기열과 Resolved 기록으로 나뉩니다. 신고를 **Claim**하여 작업을 시작한 뒤, 처리 결과(upheld, dismissed, duplicate)와 조치(none, unpublish, remove)를 선택해 해결합니다.

### Assets

Assets 탭은 게시된 콘텐츠를 검색하고 찾아볼 수 있는 화면이며, 자산을 **Feature**(제품 홈 페이지에 강조 표시), **Unpublish**/**Republish**, 또는 **Remove**(저작권 또는 정책 사유 포함)하는 작업을 할 수 있습니다.

특히 곡의 경우, 이곳에서 곡을 **Sunday-ready** 상태로 만들어 교회의 B1 Admin 곡 검색에 나타나도록 할 수 있습니다. 검토자는 자산을 열고 게시된 각 키에 대해 곡을 끝까지 들어보고 악보, 코드, 슬라이드가 모두 있는지 확인한 뒤 **Listened**로 표시합니다. 모든 키가 체크되어야 곡이 Sunday-ready가 됩니다.

:::info
Commons 검토는 직원만 사용할 수 있습니다. 개별 교회는 이 대기열을 볼 수 없습니다. 개별 교회의 B1 Admin이 Commons 데이터를 사용하는 유일한 곳은 [곡 검색](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons)의 "WorshipCommons — free" 섹션이며, 이곳에는 이미 이 검토 과정을 거친 곡만 나타납니다.
:::

기본 데이터 모델과 제출 수명 주기는 [Content Commons 아키텍처](/docs/developer/architecture/commons) 페이지를 참조하십시오.

## 그룹 이메일 승인

서버 관리자가 승인하기 전까지 교회는 교회가 작성한 이메일(그룹 이메일, 양식 후속 이메일, 워크플로 이메일, 계정 초대)을 보낼 수 없습니다. 이를 통해 봇으로 등록된 교회가 공유 ChurchApps 발신 주소로 스팸을 보내는 것을 막습니다.

1. 서버 관리 패널에서 **Churches** 탭을 엽니다.
2. 각 교회에는 **Group Email** 칩이 표시되며, **Approved**(녹색) 또는 **Not approved**(테두리만 있음)입니다.
3. 칩을 클릭하고 확인하여 교회를 승인하거나 승인을 취소합니다.

교회 직원은 B1 Admin의 이메일 보내기 대화상자에 있는 **Request review** 버튼으로 승인을 요청합니다. 요청은 지원 주소로 이메일로 전송되며, 교회 이름, ID, 등록일, 위치, 요청자가 포함됩니다. 교회는 일주일에 한 번 요청할 수 있습니다. 일일 허용량과 반송 및 불만 시 자동 일시 중지에 대해서는 [교회 작성 이메일 제한](/docs/developer/architecture/notifications#church-authored-email-limits)을 참조하십시오.

## 데이터베이스 마이그레이션 {#database-migrations}

**Deploy Prod** 워크플로는 대기 중인 마이그레이션을 직접 적용합니다. 호스팅된 데이터베이스는 Api의 네트워크 내부에서 오는 연결만 허용하므로 GitHub 러너가 접근할 수 없습니다. 대신 `serverless deploy` 직후 워크플로가 Api의 `migrate` Lambda(`api-Prod-migrate`)를 호출합니다. 이 Lambda는 이 탭과 같은 러너로 모든 모듈의 대기 중인 마이그레이션을 실행하며, 모듈에서 오류가 발생하거나 거부되면 배포를 실패 처리합니다. **Rollback Prod**는 Lambda 코드만 되돌리며, 이미 적용된 마이그레이션은 그대로 유지됩니다. **Database Migrations** 탭은 상태를 확인하고, 배포에서 실행되지 않은 마이그레이션을 실행하며(예: 배포 시 마이그레이션을 하지 않는 데모 환경), 기록이 없는 모듈의 기준선을 설정하는 데 사용합니다. (Docker로 직접 설치한 경우 Api 컨테이너가 시작될 때 마이그레이션이 자동으로 실행됩니다.)

이 탭에는 현재 환경과 모듈(membership, attendance, giving 등)별 행이 표시되며, 각 행에는 상태, 적용된 마이그레이션 수와 대기 중인 마이그레이션 수, 마지막으로 적용된 마이그레이션이 나타납니다.

- **Run Pending Migrations**는 대기 중인 모든 마이그레이션을 순서대로, 한 번에 한 모듈씩 적용합니다. 첫 번째 실패에서 멈추며, 각 모듈에 대해 적용된 내용을 보여줍니다.
- **No history**로 표시된 모듈은 마이그레이션 추적이 도입되기 이전의 데이터베이스를 가지고 있습니다. 오래된 데이터 마이그레이션이 실시간 테이블에 다시 실행될 수 있으므로 자동으로 실행되지 않습니다. 대신 해당 모듈에서 **Check Schema**를 클릭하십시오. Api는 각 마이그레이션이 만드는 테이블, 열, 인덱스를 실시간 데이터베이스와 비교하고, 각 마이그레이션을 **Already applied**, **Missing**, **Partly applied**, **Data only** 중 하나로 표시합니다. 검사는 아무것도 변경하지 않습니다.
- 검사 결과에서 **Record as Already Applied**는 감지된 마이그레이션을 실행하지 않고 마이그레이션 기록에 기록합니다(확인 후). 마지막 **Already applied** 마이그레이션까지의 모든 항목이 기록되며, 그 범위의 **Data only** 항목도 포함됩니다. **Missing** 항목은 대기 상태로 남으며, 이후 **Run Pending Migrations**로 정상적으로 실행할 수 있습니다.
- **Partly applied** 마이그레이션은 기록을 막습니다. 해당 마이그레이션을 다시 실행해도 안전하다면(먼저 읽어 보십시오) **Re-run**을 선택하여 대기 상태로 유지하고 처음부터 다시 실행합니다.

서버 관리 패널과 CLI(`yarn migrate:up`)는 같은 Kysely 마이그레이터와 `kysely_migration` 테이블을 사용하므로, 적용된 내용에 대해 항상 일치합니다. 뒷단 엔드포인트는 `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect`, `POST .../:module/baseline`이며, 모두 Server.Admin만 사용할 수 있습니다.

## 관련 페이지

- [인증 및 권한](/docs/developer/api/endpoints/authentication) — 권한 모델과 JWT 인증
- [Membership 엔드포인트](/docs/developer/api/endpoints/membership) — 사용자 및 교회 관리 API
- [감사 로그](/docs/b1-admin/reports/audit-log) — 교회의 활동 로그 보기
- [Content Commons 아키텍처](/docs/developer/architecture/commons) — 공유 자산 모델과 검토 수명 주기
