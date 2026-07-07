---
title: "감사 로그 및 실행 취소 가능한 배치"
---

# 감사 로그 및 실행 취소 가능한 배치

<div class="article-intro">

Api의 모든 사용자가 시작한 변이(mutation)는 기록됩니다. 누가, 무엇을, 언제, 어디서 — 모든 모듈에 걸쳐 컨트롤러별 배선 없이 기록됩니다. 그 원장 위에는 배치 계층이 있습니다. 가져오기나 대량 작업에 배치 태그를 지정하고 나중에 Planning-Center 방식으로 **실행 취소**할 수 있습니다. 둘 다 멤버십 데이터베이스의 단일 `auditLogs` 테이블에 저장되고 한 가지 제한점인 `BaseController.actionWrapper`에서만 구동됩니다. 이 페이지는 감사 대상, 데이터가 사는 위치, 이를 형성하는 성능 트레이드오프, 그리고 실행 취소가 교차 데이터베이스 트랜잭션 없이 배치를 안전하게 되돌리는 방법을 매핑합니다.

</div>

## 개요

```
every mutating request (POST/PUT/PATCH/DELETE)
        │
        ▼
BaseController.actionWrapper ──▶ derive {module, entityType, category, action}
        │                         from req.baseUrl + method  (AUDIT_REGISTRY = overrides/opt-outs only)
        │
        ├─ normal mode ─────────▶ run action ─▶ await AuditLogHelper.log(after-values)  ──┐
        │                                        (deletes also capture a before-image)     │
        │                                                                                  ▼
        └─ X-Batch-Id present ──▶ snapshot before-images (strict) ─▶ run action ─▶ audit rows tagged batchId
                                                                                           │
                                                                                           ▼
                                                             auditLogs  (membership DB, one table, all modules)
                                                                                           │
   POST /membership/batches/:id/undo ──▶ BatchUndoHelper ──▶ walk rows reverse, per entity ┘
                                          conflict guard → restore / delete / re-insert
```

아래의 모든 것을 구동하는 두 가지 구조적 사실이 있습니다:

1. **컨트롤러 계층이 행동자를 알 유일한 장소입니다.** 저장소는 `AuthenticatedUser`를 본 적이 없습니다. 오직 컨트롤러만 `au`를 보유합니다. 모든 모듈의 컨트롤러는 이미 `BaseController.actionWrapper`를 통과하므로 감사가 연결되는 위치입니다. 저장소 서명이 어디든 변경되지 않습니다.
2. **하나의 테이블이 모든 모듈을 제공합니다.** 기부, 참석, 콘텐츠 등의 감사 행은 모두 비멤버십 컨트롤러에서도 멤버십 DB의 `auditLogs`에 `RepoManager.getRepos("membership")`을 통해 기록됩니다. "Jane이 오늘 변경한 모든 것"은 단일 쿼리로 유지됩니다.

## 감사 대상

감사는 **모든 경로의 모든 변이하는 동사에 대해 기본 켜기**입니다. `actionWrapper`는 경로별 구성 없이 요청으로부터 감사 필드를 파생합니다.

| 필드 | 파생 위치 |
|------|----------|
| `module` | `this.moduleName` (소유 모듈) |
| `entityType` | `req.baseUrl`의 단수화된 마지막 세그먼트 (예: `/membership/people` → `person`) |
| `category` | 기본값은 `entityType` |
| `action` | `POST /`의 경우 `${entityType}_saved`, `DELETE /:id`의 경우 `${entityType}_deleted`, 그외 `${entityType}_${method}:${routePath}` (비CRUD 부경로는 자동으로 캡처됨, 예: `task_post:/:id/move`) |

`BaseController.AUDIT_REGISTRY`는 **오버라이드와 옵트아웃만**을 위한 것입니다. 이것은 허용 목록이 아닙니다. 경로는 범주/entityType 이름을 바꾸거나, `{ dbModule, table }`을 선언하거나 (배치 및 실행 취소 가능 만듭니다), `sensitive`로 표시하거나 (익명 변이 감사), 또는 `optOut: true`로 끌 수 있습니다.

**옵트아웃 목록** (원장을 익사시킬 대량 쓰기 경로): 참석 `visits` / `visitsessions` / `sessions` / `checkin` (일요일 체크인 폭주) 및 메시징 `messages` / `connections` / `devices` (채팅 및 존재). 그외 모든 것은 기록됩니다.

**대량 엔드포인트** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`)는 `BULK_ROUTES`에 등록되고 **접촉된 id당 하나의 감사 행**을 방출하므로 10k 사람 가져오기는 10k 행을 생성합니다. 그 엔터티별 세분성이 정확히 배치를 실행 취소할 수 있게 합니다.

**익명 변이** (`actionWrapperAnon` — 게스트 기부, 게스트 등록, 양식 제출)는 레지스트리 플래그가 있는 `sensitive` 경로만 감사하고, `userId="anonymous"` 더하기 클라이언트 IP로 기록됩니다. 기부가 목록을 주도합니다. 그 경로는 실제 회귀 이력을 가집니다.

### 비밀 수정과 크기 제한

모든 `details` 페이로드가 저장되기 전에 `AuditLogHelper.capDetails()`는 `sanitizeValue()`를 실행합니다.

- **비밀 키가 수정됩니다.** 소문자로 표기된 이름이 `SENSITIVE_KEYS` (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret`, …)에 있는 모든 필드는 `"[redacted]"`로 바뀝니다.
- **큰 스칼라는 제거됩니다.** 4KB를 초과하는 모든 `data:` URI 또는 문자열 (base64 사진, blob)은 `"[stripped]"`이 됩니다.
- **큰 행은 제한됩니다.** 직렬화된 JSON이 ~64KB를 초과하면 전체 페이로드는 `{ truncated: true }`로 바뀝니다. 잘린 행은 여전히 보기 가능합니다. 하지만 **실행 취소할 수 없습니다** (복원할 이전/이후 이미지가 없음).

## 데이터가 사는 곳

**멤버십** 데이터베이스의 단일 `auditLogs` 테이블이 모든 모듈을 지원합니다. 열: `id, churchId, userId, category, action, entityType, entityId, details (MEDIUMTEXT JSON string), ipAddress, module, batchId, created`. 마이그레이션 `tools/migrations/membership/2026-07-04_audit_universal.ts`는 `module` + `batchId`를 추가하고, `details`를 `TEXT`에서 `MEDIUMTEXT`로 확대하고, 인덱스 `ix_auditLogs_batch (batchId)` 및 `ix_auditLogs_entity (churchId, module, entityType, entityId, created)`를 추가하고, `batches` 테이블을 생성합니다. `module` 열은 모듈에 걸쳐 `entityType` 충돌 (`note`, `setting`은 여러 개에 있음)을 필터링할 수 있도록 정확히 존재하며, 엔터티 인덱스는 엔터티별 이력과 실행 취소 충돌 가드를 모두 구동합니다.

교차 모듈 쓰기는 래퍼 내부에서 `RepoManager.getRepos("membership")`을 통과합니다. 순서는 의도적입니다: **주 쓰기는 모듈 DB에 먼저 커밋되고 감사 삽입은 두 번째입니다.** 일반 모드에서 감사 삽입 실패는 삼켜집니다 (`console.error`, Sentry가 선택). 감사는 자문이고 사용자 요청을 실패시켜서는 안 됩니다. **배치 모드에서는 엄격합니다** (아래 참조).

:::info 트리거, CDC 또는 모듈별 테이블을 사용하지 않는 이유?
- **MySQL 트리거**는 행동자를 알 수 없습니다 (연결에 `au`가 없음), 모든 스키마에서 트리거 세트를 유지해야 합니다.
- **binlog / CDC**는 행동자 신원 문제가 같은 전체 인프라 프로젝트입니다.
- **모든 저장소를 통해 `userId` 스레딩**은 컨트롤러 계층이 이미 보유한 정보를 이동하려면 수백 개의 파일을 건드립니다.
- **모듈별 감사 테이블**은 모든 교차 모듈 질문에 7배의 배선과 팬아웃 쿼리를 의미합니다. 컨트롤러 제한점의 하나의 테이블은 행동자를 캡처하면서도 가장 적은 코드 설계입니다.
:::

## 성능 자세

핫 경로는 의도적으로 저렴합니다. 비용은 그것이 무언가를 사면 만큼만 지불됩니다.

- **일반 업데이트에서 읽기 전 쓰기 없음.** 일반 저장은 **이전 레코드를 로드하지 않습니다.** **제출된 이후 값**은 `details.after`에 저장됩니다. UI는 엔터티의 이전 감사 행에 대해 diffing하여 *보기* 시간에 old→new를 재구성합니다. 보기 시간에 한 번의 쿼리, 쓰기 시간에 비용 없음. 시작 이후 건드린 적이 없는 필드는 단순히 "old" 값을 표시하지 않습니다. 허용 가능합니다.
- **삭제는 이전 이미지를 가져옵니다.** 레지스트리 경로에서 `{ dbModule, table }`이 있는 `DELETE /:id`는 먼저 행을 일반적으로 로드하고 `details.before`에 저장합니다. 삭제는 드물고 이전 이미지는 전체 법의학 가치입니다.
- **배치 모드는 유일한 체계적 읽기-쓰기-전**, 그리고 이것은 옵트인입니다. 대량/가져오기 작업은 이미 비싸므로 N 스냅샷 읽기는 실행 취소의 가격입니다.
- **감사 삽입은 기다려집니다.** `actionWrapper`는 로그 약속을 수집하고 반환하기 전에 `await Promise.allSettled(...)`을 수행합니다. 이것은 가장 중요한 단일 불변식입니다: Lambda에서 컨테이너는 **응답이 반환되는 순간 동결**되므로 대기되지 않은 삽입은 자동으로 삭제됩니다. "발사하고 잊기"는 여기서 *오류가 요청을 실패시키지 않음*을 의미하고 *대기하지 않음*을 의미하지 않습니다. 이미 따뜻한 멤버십 풀의 단일 삽입은 ~1-3ms입니다.

## 배치와 실행 취소

**배치**는 한 세트의 변이를 그룹화하여 함께 검토하고 되돌릴 수 있습니다. 하나를 여는 두 가지 방법이 있습니다.

- **명시적:** `POST /membership/batches { label, source }`는 `batchId`를 반환합니다. 클라이언트 (B1Transfer, B1Admin 가져오기 UI)는 모든 후속 저장/삭제에서 `X-Batch-Id: <id>`를 보냅니다. `POST /membership/batches/:id/complete`는 이를 닫고 `itemCount`를 찍습니다.
- **암시적:** 4개의 대량 엔드포인트는 단일 요청 내에서 자체 배치를 열고, 채우고, 완료하며, 응답에서 `batchId`를 반환합니다.

`batches` 테이블 (멤버십 DB): `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`.

### 배치 모드는 엄격합니다

`X-Batch-Id`가 있을 때 `actionWrapper`는 모든 가드를 조여집니다 (`writeBatchAuditRows`):

1. 배치는 존재해야 하고, `open`이어야 하고, `au.churchId`에 속해야 합니다. 그렇지 않으면 **403**.
2. 경로는 배치 가능해야 합니다 (레지스트리의 `{ dbModule, table }`). 그렇지 않으면 **400**.
3. 작업이 실행되기 전에 모든 영향을 받는 id의 이전 이미지는 **한 번에** `WHERE id IN (...) AND churchId = ?` 쿼리로 로드됩니다. 그 스냅샷 읽기가 실패하면 요청 **500 실패하고 작업이 실행되지 않습니다**. 배치 모드는 실행 취소 불가능 원장을 자동으로 생성해서는 안 됩니다. (일반 모드는 대조적으로 최선을 다하고 스냅샷 실패를 삼킵니다.)
4. 작업이 성공한 후 `batchId`, `details.before`, `details.after` 더하기 명시적 **생성 표시**가 있는 배치가 생성한 행을 포함하는 엔터티당 하나의 감사 행이 기록됩니다.

### 실행 취소

`POST /membership/batches/:id/undo` (권한: 배치 작성자 또는 `Permissions.server.admin`). 배치가 `completed`가 아니거나 **30일 실행 취소 윈도우**보다 오래된 경우 거부합니다. `BatchUndoHelper.undo()`는 그 후:

1. 배치의 감사 행을 로드하고 **`(module, entityType, entityId)`로 그룹화합니다.** 한 배치 내에서 여러 번 건드린 엔터티는 **한 번** 되돌려지고 그 진정한 배치 이전 상태로 돌아갑니다. 가장 초기 이전 이미지 또는 배치가 생성한 경우 삭제입니다. 이것이 실행 취소가 각 행을 순진하게 재생하지 않는 이유입니다: 중간 배치 중 스냅샷을 복원하는 것은 잘못될 것입니다.
2. 각 엔터티에 대해 **충돌 가드를 먼저 실행합니다**: `auditLog.hasLaterModification()`은 이 배치 외부에서 동일한 `(module, entityType, entityId)`에 대해 더 늦은 감사 항목이 있는지를 묻습니다. 그렇다면 엔터티는 가져오기 후에 편집되었습니다. **건너뛰고 보고됩니다**. 절대 덮어쓰지 않습니다. 이것은 감사 로그 자체를 수정 감지기로 재사용합니다. 어떤 테이블의 `modifiedAt` 열도 필요하지 않습니다.
3. 기록된 op에 따라 되돌립니다. 레지스트리에서 `{ dbModule, table }`을 해결하고 일반 Kysely 쓰기를 사용합니다.
   - **created** → 행을 하드 삭제합니다.
   - **updated** → `details.before`를 다시 씁니다.
   - **deleted** → `details.before`를 다시 삽입합니다 (그 id의 행이 다시 나타나면 업데이트 또는 삽입).
4. 각 되돌리기는 그 자체로 감사됩니다 (`action: "<entityType>_undone"`, `batchId` 없음. 실행 취소의 실행 취소는 범위를 벗어납니다).

op는 명시적 **생성 표시**에서 선택되고 누락된 이전 이미지에서 유추되지 않습니다. 정상적으로 비어 있는 이전 이미지 또는 잘린 행은 생성과 혼동되지 않아야 합니다.

결과 페이로드는 `{ restored, skippedConflicts: [...], failed: [...], status }`입니다. 배치는 `undone` (깨끗함) 또는 `partial`로 이동합니다. **교차 DB 트랜잭션이 없습니다**. 실행 취소는 행마다 최선을 다하고, Planning Center가 병합 프로필에 대해 문서화하는 동일한 제한입니다.

:::warning 부작용 엔터티는 `onUndo` 훅이 필요합니다
`groupMember` 생성을 되돌리면 `groupMemberHistory` ("left")도 기록해야 합니다. 그렇지 않으면 이탈 분석이 침묵으로 깨집니다. 이것은 워크스페이스 불변식을 서 있습니다. 그러한 엔터티는 `AUDIT_REGISTRY`에서 `onUndo` 콜백을 등록하고 완전히 처리한 경우 `true`를 반환하여 일반 경로를 우회합니다. `groupMembers`는 규범적인 경우입니다 (명시적 경로에서 행 id로 키지정되지만 대량 엔드포인트에서 `personId`로 키지정되고 모든 추가/제거에서 이력 추적됨).
:::

## 소비자 표면

두 관리자 표면 모두 **진행 중입니다**. 의도는:

| 표면 | 저장소 | 목적 |
|------|--------|------|
| **감사 로그 페이지** | B1Admin (ManageChurch → Audit Log) | 모듈/범주/사용자/엔터티별 필터링하고 old→new diff 렌더링. 편집의 경우 엔터티의 이전 항목에 대해 diff를 통해, 삭제의 경우 `details.before`에서. `GET /membership/auditlogs`로 지원, `Permissions.server.admin`으로 게이트됨. |
| **배치 페이지** | B1Admin (같은 설정 허브) | 상태 및 카운트와 함께 배치 나열, **결과 보기** (배치의 감사 행은 `GET /membership/batches/:id/results`를 통해), 그리고 건너뛴 충돌 / 실패 보고서를 표면하는 **실행 취소** 버튼. |
| **배치 가져오기** | B1Transfer | 배치를 열고 정상 저장 호출에 `X-Batch-Id`를 보내고 끝에 완료합니다. 가져오기는 새로운 가져오기 엔드포인트 없이 실행 취소할 수 있습니다. 레거시 `importKey`는 생성 전용 혈통 표시로 유지되고 실행 취소로 대체됩니다. |

## 미래의 변경이 회귀해서는 안 할 함정

- **감사 삽입은 대기된 상태로 유지해야 합니다.** 대기되지 않은 `AuditLogHelper.log(...)`은 Lambda 동결로 삭제됩니다. 약속을 수집하고 반환하기 전에 `await Promise.allSettled`을 수행합니다.
- **Kysely는 `.set()`/`.values()`에서 `undefined`를 삭제합니다.** 복원 시 지워진 열은 건드린 상태로 유지됩니다. `BatchUndoHelper`는 모든 부재 필드를 명시적 `null` (`nullify`)로 변환합니다. 더 빠른 직접 쓰기 위해 절대 우회하지 않습니다.
- **보유 기간은 실행 취소 윈도우보다 잘 위에 유지해야 합니다.** `AuditLogRepo.deleteOld()`는 야간 타이머 (기본 365일 보유)에서 실행됩니다. 실행 취소 윈도우는 30일입니다. 보유 기간이 윈도우 쪽으로 떨어지면 실행 취소 원장이 열린 배치 아래에서 제거됩니다.
- **잘린 행은 실행 취소할 수 없습니다.** `{ truncated: true }` 페이로드에는 이전/이후 이미지가 없습니다. 실행 취소는 `failed`로 보고하고 절대 추측하지 않습니다.
- **순서는 모듈 쓰기-감사입니다.** 감사 삽입을 실제 쓰기 앞으로 이동하지 말고 배치에서는 엄격하게, 일반 모드에서는 자문적으로 유지합니다.

## 파일 목록

| 영역 | 파일 |
|------|------|
| 래퍼 / 레지스트리 | `Api/src/shared/infrastructure/BaseController.ts` (`AUDIT_REGISTRY`, `BULK_ROUTES`, `actionWrapper`, `actionWrapperAnon`, snapshot + write-rows) |
| 실행 취소 엔진 | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| 감사 도우미 | `Api/src/modules/membership/helpers/AuditLogHelper.ts` (`log`, `capDetails`/`sanitizeValue`, `diffFields`, `getClientIp`) |
| 컨트롤러 | `Api/src/modules/membership/controllers/AuditLogController.ts`, `BatchController.ts` |
| 모델 / 저장소 | `Api/src/modules/membership/models/AuditLog.ts`, `Batch.ts`; `repositories/AuditLogRepo.ts` (`loadFiltered`, `loadForBatch`, `hasLaterModification`, `deleteOld`), `BatchRepo.ts` |
| 마이그레이션 | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| 관리자 UI (진행 중) | B1Admin 감사 로그 + 배치 페이지; B1Transfer 가져오기 배치 헤더 |

## 관련 페이지

- [모듈 구조](../api/module-structure) — 비멤버십 컨트롤러가 `RepoManager`를 통해 멤버십 저장소에 도달하는 방법
- [기부](./giving) — 익명일 때도 `sensitive`로 감사되는 기부 쓰기 경로
- [멤버십 엔드포인트](../api/endpoints/membership) — `X-Batch-Id`를 전달하고 `/auditlogs` 및 `/batches`를 노출하는 REST 표면
