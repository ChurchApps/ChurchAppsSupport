# MinistryStuff(유료 저장소 및 문자)

MinistryStuff.org는 ChurchApps가 무료로 제공할 수 없는 두 가지에 자금을 지원하는 별도의 유료 서비스입니다 -- 대량 파일 저장소(1TB+) 및 SMS 크레딧 -- 정액 월간 구독으로. ChurchApps 자체는 100% 무료로 유지됩니다. B1에는 MinistryStuff 구독이 필요하지 않으며, 모든 통합 지점은 제3자도 구현할 수 있는 공급자 이음새입니다.

## 구성 요소

| 부분 | 저장소 | 역할 |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/`(포트 8097 개발) | 청구(Stripe), SMS 전송 + 크레딧 원장(AWS End User Messaging), 저장소(S3 + 할당량 회계). 단일 MySQL DB `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/`(포트 3103 개발) | ministrystuff.org -- 마케팅, 가격 책정 및 계정 포털(계획, 사용 현황, Stripe 체크아웃/고객 포털 리디렉션). |
| 문자 공급자 | `Packages/texting` → `MinistryStuffProvider` | `ministrystuff`로 Clearstream/TextInChurch와 함께 등록됨. |
| 저장소 이음새 | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider`(기본값, 무료)는 원본 S3/디스크 스위치를 래핑합니다. `FileStorageHelper`는 기본 공급자를 변경 없이 위임합니다. |
| Api 배선 | `Api/` 콘텐츠 + 메시징 모듈 | `MinistryStuffStorageProvider` + `StorageResolver`(콘텐츠), `TextingConfigHelper` 서비스 키 주입(메시징), `storageProviders` 테이블, `/content/storage/*` + `/messaging/texting/credits` 엔드포인트. |

## 신원 및 신뢰

- 동일한 계정, 동일한 교회: MinistryStuffApi는 공유 `JWT_SECRET`을 사용하여 ChurchApps JWT를 확인합니다(B1Transfer와 같은 형제 앱 패턴). 포털은 MembershipApi에 대해 로그인하고 `?jwt=` 핸드오프를 수락합니다.
- 서버 간(핵심 Api → MinistryStuffApi): `X-Service-Key` 헤더(`MINISTRYSTUFF_SERVICE_KEY`, 양쪽) + 명시적 `churchId`. 자격은 항상 해당 교회의 구독에 대해 확인됩니다. 교회는 MinistryStuff 자격증을 보유하지 않습니다 -- B1Admin에서 공급자를 선택하는 것이 필요한 전부입니다.

## 문자 흐름

B1Admin 문자 전송 → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → 현재 기간의 `smsCreditGrants`에 대해 세그먼트 수 차감 → AWS End User Messaging(또는 개발의 `smsMode: mock`). 크레딧은 **하드 스톱**입니다: 지친 크레딧은 도매 거부(`insufficient_credits`, B1Admin의 친화적인 업그레이드 프롬프트로 표시됨) -- 절대 부분 전송 또는 초과 청구 없음. 크레딧 부여는 Stripe `invoice.paid` 웹훅에서 청구 기간당 멱등식으로 발행됩니다. 거부(`smsOptOuts`)는 모든 전송 전에 필터링됩니다.

## 저장소 흐름

교회의 공급자 행(`content.storageProviders`, B1Admin → 설정 → 파일 저장소에서 관리)은 **새** 업로드가 이동하는 위치를 선택합니다. `contentPath`는 절대 파일별 URL이므로 혼합 공급자는 0 마이그레이션으로 공존합니다: 이전 파일은 `content.churchapps.org`에서 계속 제공되고 새 파일은 `content.ministrystuff.org`에서 제공됩니다. 업로드는 Api → `StorageResolver.forChurch` → 공급자 `store`/`getUploadUrl`(S3 모드의 `content-length-range`를 가진 미리 서명된 POST; 디스크/개발 모드의 base64 대체)로 흐릅니다. 삭제는 저장된 URL별로 경로를 지정합니다(`StorageResolver.forUrl`). 할당량 = 계획 바이트이며, `storageObjects`(`stored` + `pending` 예약)에서 계산됨; 초과 할당량은 새 업로드를 차단합니다(`storage_quota_exceeded`) -- 아무것도 삭제되거나 추가로 청구되지 않습니다. 무료 ChurchApps 계층은 변경되지 않습니다(이전과 동일한 제한; 교회 전체 할당량 없음).

범위 참고: 공급자 선택은 대량 미디어가 있는 콘텐츠 **파일/리소스** 흐름을 다룹니다. 갤러리/로고/사진 업로드는 기본 공급자에 남아 있습니다 -- 저장소 목록 키를 나열하고 클라이언트 측에서 URL을 작성하므로 교회별 루팅이 아직 적용되지 않습니다.

동일한 이음새는 [자신의 저장소 가져오기](./byos-storage)도 지원합니다: 교회는 MinistryStuff 계획 대신 Google Drive, Dropbox, OneDrive 또는 자체 S3 호환 버킷을 연결할 수 있습니다.

## 청구

Stripe 체크아웃(호스팅) 구독의 경우, Stripe 고객 포털 카드 업데이트/취소/청구서 -- MinistryStuffWeb에는 카드 양식이 없습니다. (교회, 제품)당 하나의 `subscriptions` 행; 계획/계층은 Stripe 가격 ID를 포함하는 코드(MinistryStuffApi/src/helpers/Plans.ts)에 있습니다. 웹훅(`/billing/webhook`, 원본 본문 서명 확인, `webhookEvents` 중복 제거)은 구독 수명 주기를 구동합니다: 활성 → 연체 → 취소됨.

## 개발 설정

MinistryStuffApi를 실행합니다(`yarn dev`, 8097; `.env`로 공유 `JWT_SECRET` + `MINISTRYSTUFF_SERVICE_KEY` 필요) 및 `Api/.env`에서 동일한 서비스 키를 설정합니다. `Api/config/dev.json`은 이미 `ministryStuffApi`를 `localhost:8097`로 지시합니다. MinistryStuffWeb에는 `VITE_STAGE=dev`를 포함한 `.env` 필요. 개발은 `smsMode: mock` 및 디스크 저장소를 사용합니다 -- AWS 필요 없음.
