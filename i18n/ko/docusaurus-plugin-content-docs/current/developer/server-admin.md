---
title: "서버 관리"
---

# 서버 관리

<div class="article-intro">

ChurchApps의 서버 관리 기능은 **Server.Admin** 권한이 있는 사용자만 사용할 수 있습니다. 이 도구들은 시스템 안의 모든 교회를 대상으로 플랫폼 운영, 지원, 문제 해결에 사용됩니다.

</div>

:::warning 접근 제한
이 페이지에서 설명하는 기능은 **Server.Admin** 권한이 필요하며, 일반 교회 관리자는 사용할 수 없습니다. 플랫폼 운영자와 지원 담당자만을 위한 기능입니다.
:::

## 서버 관리 열기

Server.Admin 권한이 있는 사용자는 B1 Admin에서 서버 관리 패널에 접근할 수 있습니다.

1. [admin.b1.church](https://admin.b1.church)에 로그인하세요.
2. [점프 메뉴](../b1-admin/introduction.md#getting-around-with-the-jump-menu)를 열고 **Settings**를 펼친 뒤 **Server Admin**을 클릭하세요. (`admin.b1.church/admin`으로 바로 이동할 수도 있습니다.)
3. 서버 관리 패널은 왼쪽에 세 그룹으로 섹션을 나열합니다. **Directory**(Churches, Users, Impersonate User), **Operations**(Background Jobs, Commons, Usage Trends), **System**(Translation Lookups, Server Health, Database Migrations)입니다.

## 2단계 로그인 초기화

사용자가 [2단계 로그인](../b1-admin/profile/managing-profile.md#two-factor-sign-in)을 켜 두었고 휴대폰과 백업 코드를 모두 잃어버렸다면, 서버 관리자가 이를 끌 수 있습니다.

1. 서버 관리 패널의 **Users** 섹션을 열고 사용자를 찾으세요.
2. 2단계 로그인이 켜진 사용자에게는 **Two-factor on** 배지가 표시됩니다. 옆의 **Reset 2FA**를 클릭하세요.
3. 확인 창에서 확인하세요. 상대방이 누구인지 확실히 확인한 뒤에만 진행하세요.

그러면 사용자는 비밀번호만으로 로그인하고, 프로필에서 2단계 로그인을 다시 설정할 수 있습니다. 초기화는 감사 로그에 `mfa_reset`으로 기록됩니다. 엔드포인트는 `POST /membership/users/mfa/reset/:userId`이며 Server.Admin 권한이 필요합니다.

## 사용자 대리 로그인

대리 로그인(impersonation) 기능을 사용하면 서버 관리자가 지원과 문제 해결을 위해 다른 사용자로 로그인할 수 있습니다. 사용자가 보고한 문제를 조사하거나, 교회의 시스템 설정을 돕는 데 유용합니다.

### 사용자로 대리 로그인하는 방법

1. 서버 관리 패널의 **Impersonate User** 섹션을 여세요.
2. 검색창에 사용자의 이름이나 이메일 주소를 입력하세요.
3. **Search**를 클릭하거나 Enter 키를 누르세요.
4. 검색 결과에서 대리 로그인할 사용자를 클릭하세요.
5. 나타나는 대화상자에서 대리 로그인을 확인하세요.
6. 해당 사용자로 로그인되며 그 사용자의 계정으로 이동합니다.

### 중요 참고 사항

- 대리 로그인을 하면 대상 사용자의 권한과 교회 접근 권한을 가진 새 세션이 만들어집니다.
- 다른 사용자로 대리 로그인하면 원래 관리자 세션은 종료됩니다.
- 대리 로그인 중에 한 모든 작업은 감사 추적에 기록됩니다.
- 관리자 계정으로 돌아가려면 로그아웃한 뒤 자신의 자격 증명으로 다시 로그인하세요.
- 대리 로그인은 지원에 꼭 필요할 때만 사용하고, 지원을 위해 사용자 계정에 접근할 때는 항상 사용자에게 알리세요.

### API 엔드포인트

대리 로그인 기능은 Membership API의 `/users/:userId/impersonate` 엔드포인트를 사용합니다. 기술적인 세부 사항은 [Membership 엔드포인트](/docs/developer/api/endpoints/membership#users)를 참고하세요.

### 보안 고려 사항

- 대리 로그인에는 Server.Admin 권한이 필요합니다. 이 권한은 아껴서 부여하고, 신뢰할 수 있는 플랫폼 운영자에게만 주세요.
- 모든 대리 로그인 이벤트는 관리자 사용자 ID와 대상 사용자 ID와 함께 기록됩니다.
- 대리 로그인이 일어나도 교회에는 알림이 가지 않으므로, 이 기능을 언제 어떻게 사용할지에 대한 명확한 정책을 세우세요.
- 책임 추적을 위해 대리 로그인 이벤트를 지원 티켓 시스템에 기록해 두는 것을 고려하세요.

## Commons 검토

Commons는 여러 제품에서 사용자가 제출한 콘텐츠를 위한 공유 검토 대기열입니다. WorshipCommons 찬양, Lessons.church 공과, FreeShow 템플릿, B1 웹사이트 빌더 템플릿이 제품마다 따로 있는 검토 도구를 쓰지 않고 모두 같은 대기열을 거칩니다.

### Commons 열기

1. 서버 관리 패널의 **Commons** 탭으로 이동하세요.
2. 세 개의 하위 탭이 보입니다. **Queue**, **Reports**, **Assets**입니다.

제한된 **음악 편집자** 역할도 Queue 탭을 볼 수 있지만, 찬양의 권리나 라이선스를 바꾸는 제출물은 승인할 수 없습니다.

### Queue

Queue에는 모든 제품의 대기 중인 제출물이 나열되며, 제품과 자산 유형으로 필터링할 수 있습니다. 각 행은 제출물이 새 자산인지, 원작자의 수정인지, 제3자의 수정인지 보여 주며, 제출자의 승인 이력과 제출물이 기다린 시간도 함께 표시됩니다(72시간이 지나면 표시됨).

**Review**를 클릭하면 필드별 차이, 파일 미리보기, 항목의 읽기 전용 미리보기가 있는 서랍이 열립니다. **a**/**r** 단축키로 승인하거나 거절하고, **j**/**k**로 서랍을 벗어나지 않고 다음 또는 이전 제출물로 이동할 수 있습니다. 거절하려면 이유(예: quality, duplicate, licensing, ccli, ai, off-topic)를 선택하고 메모를 남겨야 합니다.

### Reports

Reports 탭은 이미 공개된 자산에 접수된 저작권 및 정책/품질 신고를 처리합니다. 저작권과 정책 및 기타 대기열로 나뉘며, 처리 완료 기록도 있습니다. 신고를 **Claim**하면 작업을 시작할 수 있고, 처리 결과(upheld, dismissed, duplicate)와 조치(none, unpublish, remove)를 정해 해결합니다.

### Assets

Assets 탭은 공개된 콘텐츠를 검색하며 찾아볼 수 있는 목록입니다. 자산을 **Feature**(제품의 홈 페이지에 강조 표시), **Unpublish**/**Republish**, 또는 **Remove**(저작권 또는 정책 사유 입력)할 수 있습니다.

특히 찬양의 경우 이곳에서 **주일 준비 완료(Sunday-ready)** 상태가 되며, 교회의 B1 Admin 찬양 검색에 나타날 수 있게 됩니다. 검토자는 자산을 열고, 각 공개된 조성(key)을 들어 보고 악보, 코드, 슬라이드가 모두 있는지 확인한 뒤 **Listened**로 표시합니다. 모든 조성이 체크되어야 비로소 주일 준비 완료 상태가 됩니다.

:::info
Commons 검토는 직원만 사용할 수 있습니다. 개별 교회는 이 대기열을 전혀 볼 수 없습니다. 개별 교회의 B1 Admin이 Commons 데이터와 접점을 갖는 곳은 [찬양 검색](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons)의 "WorshipCommons -- free" 섹션뿐이며, 이 섹션에는 이미 이 검토 과정을 통과한 찬양만 나타납니다.
:::

기반 데이터 모델과 제출 수명 주기는 [Content Commons 아키텍처](/docs/developer/architecture/commons) 페이지를 참고하세요.

## 그룹 이메일 승인

서버 관리자가 승인하기 전까지 교회는 교회가 작성한 이메일(그룹 이메일, 양식 후속 메일, 워크플로 이메일, 계정 초대)을 보낼 수 없습니다. 이는 봇으로 등록된 교회가 공유 ChurchApps 발신 주소를 스팸에 쓰는 것을 막기 위함입니다.

1. 서버 관리 패널의 **Churches** 탭을 여세요.
2. 각 교회에는 **Group Email** 칩이 표시됩니다. **Approved**(초록색) 또는 **Not approved**(윤곽선만 있음)입니다.
3. 칩을 클릭하고 확인하면 교회를 승인하거나 승인을 취소할 수 있습니다.

교회 직원은 B1 Admin의 이메일 보내기 대화상자에 있는 **Request review** 버튼으로 승인을 요청합니다. 요청은 지원 주소로 이메일이 발송되며, 교회 이름, ID, 등록일, 위치, 요청자가 담깁니다. 교회는 일주일에 한 번만 요청할 수 있습니다. 일일 발송 한도와 반송 및 불만에 따른 자동 일시 중지는 [교회 작성 이메일 제한](/docs/developer/architecture/notifications#church-authored-email-limits)을 참고하세요.

## 데이터베이스 마이그레이션 {#database-migrations}

**Deploy Prod** 워크플로는 대기 중인 마이그레이션을 직접 적용합니다. 호스팅된 데이터베이스는 Api의 네트워크 내부에서만 연결을 받으므로 GitHub 러너가 접근할 수 없습니다. 대신 `serverless deploy` 직후 워크플로가 Api의 `migrate` Lambda(`api-Prod-migrate`)를 호출하며, 이 Lambda는 이 탭과 같은 실행기로 모든 모듈의 대기 중인 마이그레이션을 실행하고, 어느 모듈이든 오류가 나거나 거부되면 배포를 실패 처리합니다. **Rollback Prod**는 Lambda 코드만 되돌리며, 적용된 마이그레이션은 그대로 남습니다. **Database Migrations** 탭은 상태를 확인하고, 배포에서 실행되지 않은 작업(예: 배포 시 마이그레이션을 하지 않는 데모 환경)을 실행하고, 이력이 없는 모듈에 기준선을 설정하는 용도입니다. (자체 호스팅 Docker 설치는 Api 컨테이너가 시작될 때 여전히 마이그레이션을 자동으로 실행합니다.)

이 탭에는 현재 환경과 모듈(membership, attendance, giving 등)마다 한 행이 표시되며, 상태, 적용된 마이그레이션과 대기 중인 마이그레이션의 수, 마지막으로 적용된 마이그레이션이 나타납니다.

- **Run Pending Migrations**는 대기 중인 모든 마이그레이션을 모듈별로 순서대로 적용합니다. 첫 번째 실패에서 멈추고, 모듈마다 적용된 내용을 보여 줍니다.
- **No history**로 표시된 모듈은 마이그레이션 추적이 도입되기 전에 만들어진 데이터베이스를 가진 모듈입니다. 이 모듈은 자동으로 실행되지 않습니다. 오래된 데이터 마이그레이션을 실제 테이블에 다시 실행하게 되기 때문입니다. 대신 이 모듈에서 **Check Schema**를 클릭하세요. Api는 각 마이그레이션이 만드는 테이블, 열, 인덱스를 실제 데이터베이스와 비교하고, 각 마이그레이션을 **Already applied**, **Missing**, **Partly applied**, **Data only** 중 하나로 표시합니다. 이 검사는 아무것도 바꾸지 않습니다.
- 검사 결과에서 **Record as Already Applied**는 감지된 마이그레이션을 실행하지 않고 마이그레이션 이력에 기록합니다(확인 후). 마지막 **Already applied** 마이그레이션까지의 모든 항목이 기록되며, 그 범위의 **Data only** 항목도 포함됩니다. **Missing** 항목은 대기 상태로 남으며, 이후 **Run Pending Migrations**로 정상적으로 실행할 수 있습니다.
- **Partly applied** 마이그레이션은 기록을 막습니다. 마이그레이션을 다시 실행해도 안전하다면(먼저 내용을 읽어 보세요) **Re-run**을 체크하세요. 그러면 대기 상태로 남아 처음부터 다시 실행됩니다.

서버 관리 패널과 CLI(`yarn migrate:up`)는 같은 Kysely 마이그레이터와 `kysely_migration` 테이블을 사용하므로, 적용된 항목에 대해 항상 같은 결과를 보여 줍니다. 뒷받침하는 엔드포인트는 `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect`, `POST .../:module/baseline`이며, 모두 Server.Admin만 사용할 수 있습니다.

## 관련 문서

- [인증 및 권한](/docs/developer/api/endpoints/authentication) -- 권한 모델과 JWT 인증
- [Membership 엔드포인트](/docs/developer/api/endpoints/membership) -- 사용자 및 교회 관리 API
- [감사 로그](/docs/b1-admin/reports/audit-log) -- 교회의 활동 로그 보기
- [Content Commons 아키텍처](/docs/developer/architecture/commons) -- 공유 자산 모델과 검토 수명 주기
