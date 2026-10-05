# MinistryStuff (유료 저장소 및 문자)

MinistryStuff.org는 ChurchApps가 줄 수 없는 두 가지를 자금 조달하는 별개의 유료 서비스입니다 — 대량 파일 저장소(1TB+) 및 SMS 크레딧 — 정액 월간 구독입니다. ChurchApps 자체는 100% 무료로 유지됩니다; B1의 아무것도 MinistryStuff 구독을 필요로 하지 않으며, 모든 통합 지점은 제3자가 또한 구현할 수 있는 제공자 솔기입니다.

## 구성 요소

| 피스 | Repo | 역할 |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (포트 8097 개발) | 청구(Stripe), SMS 전송 + 크레딧 원장(AWS End User Messaging), 저장소(S3 + 할당 계정). 단일 MySQL DB `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (포트 3103 개발) | ministrystuff.org — 마케팅, 가격 책정, 계정 포탈(계획, 사용, Stripe Checkout/Customer Portal 리디렉션). |
| 문자 제공자 | `Packages/texting` → `MinistryStuffProvider` | `ministrystuff`로 Clearstream/TextInChurch 옆에 등록됨. |
| 저장소 솔기 | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider`(기본값, 무료)는 원래 S3/디스크 스위치를 래핑합니다; `FileStorageHelper`는 기본 제공자에게 변경 없이 위임합니다. |
| Api 배선 | `Api/` 콘텐츠 + 메시징 모듈 | `MinistryStuffStorageProvider` + `StorageResolver`(콘텐츠), `TextingConfigHelper` 서비스 키 주입(메시징), `storageProviders` 테이블, `/content/storage/*` + `/messaging/texting/credits` 엔드포인트. |

## ID 및 신뢰

- 같은 계정, 같은 교회: MinistryStuffApi는 공유 `JWT_SECRET`(형제 앱 패턴, B1Transfer처럼)으로 ChurchApps JWT를 확인합니다. 포탈은 MembershipApi에 대해 로그인하고 `?jwt=` 핸드오프를 수락합니다.
- 서버 간(코어 Api → MinistryStuffApi): `X-Service-Key` 헤더(`MINISTRYSTUFF_SERVICE_KEY`, 양쪽) + 명시적 `churchId`. 자격은 항상 해당 교회의 구독에 대해 확인됩니다. 교회는 절대 MinistryStuff 자격 증명을 보유하지 않습니다 — B1Admin에서 제공자를 선택하는 것이 필요한 전부입니다.

## 문자 흐름

B1Admin Send Text → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → 현재 기간의 `smsCreditGrants`에 대해 세그먼트 수를 차감 → AWS End User Messaging(또는 개발에서 `smsMode: mock`). 크레딧은 **하드 스탑**입니다: 소진된 크레딧은 도매로 거부됩니다(`insufficient_credits`, B1Admin에서 친화적인 업그레이드 프롬프트로 표시됨) — 절대 부분 전송, 절대 초과분 청구. 크레딧 부여는 Stripe `invoice.paid` 웹훅에서 청구 기간당 멱등성으로 발급됩니다. 옵트아웃(`smsOptOuts`)은 모든 전송 전에 필터링됩니다.

다른 경로는 `TextingController`를 거치지 않고 같은 제공자 솔기에 도달합니다: 체크인 경고(`CheckinController` → `MessagingModuleGateway.sendBulkText`) 및 워크플로우 **문자 보내기** 단계 액션(`Api/src/modules/doing/helpers/StepActionHelper.ts` `sendText` → `MessagingModuleGateway.sendPersonText`, `sentTexts` + `deliveryLogs` 행을 널 발신자와 함께 작성). 병합 필드(`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`)는 `MergeFieldHelper.resolve`에 의해 수신자당 해결되고 결과는 1,600자로 제한됩니다. `TextingController`에서 `{{`를 포함하는 그룹 메시지는 수신자당 하나의 `sendMessage` 대신 단일 `sendBulk`로 전송됩니다; 자리 표시자 없는 메시지는 여전히 하나의 대량 전송으로 나갑니다.

## 저장소 흐름

교회의 제공자 행(`content.storageProviders`, B1Admin → 설정 → 파일 저장소에서 관리됨)은 **새** 업로드가 어디로 가는지 선택합니다. `contentPath`는 파일당 절대 URL이므로, 혼합 제공자는 0 마이그레이션과 공존합니다: 오래된 파일은 `content.churchapps.org`에서 계속 제공하고, 새 파일은 `content.ministrystuff.org`에서. 업로드 흐름 Api → `StorageResolver.forChurch` → 제공자 `store`/`getUploadUrl`(S3 모드에서 `content-length-range`가 있는 사전 서명된 POST; 디스크/개발 모드에서 base64 폴백); 저장된 URL에 의해 경로를 삭제합니다(`StorageResolver.forUrl`). 할당 = 계획 바이트, `storageObjects`에서 계산(`stored` + `pending` 예약); 초과 할당은 새 업로드를 차단합니다(`storage_quota_exceeded`) — 아무것도 절대 삭제되거나 초과분 청구되지 않습니다. 무료 ChurchApps 계층은 그대로 유지됩니다(이전과 같은 제한; 교회 전체 할당 없음).

범위 참고: 제공자 선택은 콘텐츠 **파일/리소스** 흐름(대량 미디어가 있는)을 커버합니다. 갤러리/로고/사진 업로드는 기본 제공자에 유지됩니다 — 그들은 저장소에서 키를 나열하고 클라이언트측에서 URL을 구성하므로 교회별 루팅이 아직 적용되지 않습니다.

같은 솔기는 또한 [Bring-Your-Own Storage](./byos-storage)를 구동합니다: 교회는 MinistryStuff 계획 대신 Google Drive, Dropbox, OneDrive 또는 자신의 S3 호환 버킷을 연결할 수 있습니다.

## 청구

Stripe Checkout(호스트됨) 구독용, Stripe Customer Portal 카드 업데이트/취소/송장용 — MinistryStuffWeb은 카드 형식이 없습니다. 교회당 한 `subscriptions` 행, 제품; 계획/계층은 코드에 있습니다(`MinistryStuffApi/src/helpers/Plans.ts`) Stripe 가격 ID가 구성에서. 웹훅(`/billing/webhook`, 원본 본문 서명 확인, `webhookEvents` 중복 제거)은 구독 생명 사이클을 구동합니다: 활성 → past_due(유예) → 취소됨.

## 개발 설정

MinistryStuffApi(`yarn dev`, 8097; `.env`가 공유 `JWT_SECRET` + `MINISTRYSTUFF_SERVICE_KEY` 필요) 및 `Api/.env`에서 같은 서비스 키를 설정합니다. `Api/config/dev.json`은 이미 `ministryStuffApi`를 `localhost:8097`로 가리킵니다. MinistryStuffWeb은 `.env`가 `VITE_STAGE=dev`인 경우입니다. 개발은 `smsMode: mock` 및 디스크 저장소를 사용합니다 — AWS가 필요하지 않습니다.
