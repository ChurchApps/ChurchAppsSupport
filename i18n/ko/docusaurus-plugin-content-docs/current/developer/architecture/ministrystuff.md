# MinistryStuff (유료 저장소 및 문자)

MinistryStuff.org는 ChurchApps가 무료로 제공할 수 없는 두 가지 — 대량 파일 저장소 (1TB+)와 SMS 크레딧 — 를 정액 월간 구독으로 자금 조달하는 별도의 유료 서비스입니다. ChurchApps 자체는 100% 무료로 유지됩니다. B1의 어떤 것도 MinistryStuff 구독을 요구하지 않으며, 모든 통합 지점은 제3자도 구현할 수 있는 제공자 심(seam)입니다.

## 구성요소

| 부분 | 저장소 | 역할 |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (개발 포트 8097) | 청구 (Stripe), SMS 전송 + 크레딧 원장 (AWS End User Messaging), 저장소 (S3 + 할당량 회계). 단일 MySQL DB `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (개발 포트 3103) | ministrystuff.org — 마케팅, 가격 책정, 계정 포털 (플랜, 사용량, Stripe Checkout/Customer Portal 리디렉트). |
| 문자 제공자 | `Packages/texting` → `MinistryStuffProvider` | Clearstream/TextInChurch와 함께 `ministrystuff`로 등록됨. |
| 저장소 심 | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (기본, 무료)는 원래 S3/disk 스위치를 감쌉니다; `FileStorageHelper`는 변경 없이 기본 제공자에 위임합니다. |
| Api 배선 | `Api/` content + messaging 모듈 | `MinistryStuffStorageProvider` + `StorageResolver` (content), `TextingConfigHelper` 서비스 키 주입 (messaging), `storageProviders` 테이블, `/content/storage/*` + `/messaging/texting/credits` 엔드포인트. |

## 신원 및 신뢰

- 같은 계정, 같은 교회: MinistryStuffApi는 공유 `JWT_SECRET` (B1Transfer와 같은 형제 앱 패턴)으로 ChurchApps JWT를 검증합니다. 포털은 MembershipApi에 대해 로그인하고 `?jwt=` 핸드오프를 받아들입니다.
- 서버 간 (핵심 Api → MinistryStuffApi): `X-Service-Key` 헤더 (`MINISTRYSTUFF_SERVICE_KEY`, 양쪽 모두) + 명시적 `churchId`. 자격은 항상 해당 교회의 구독에 대해 확인됩니다. 교회는 절대 MinistryStuff 자격증을 보유하지 않습니다. B1Admin에서 제공자를 선택하는 것만으로 충분합니다.

## 문자 흐름

B1Admin 문자 보내기 → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → 현재 기간의 `smsCreditGrants`에서 세그먼트 수 차감 → AWS End User Messaging (또는 개발 환경에서 `smsMode: mock`). 크레딧은 **하드 스톱**입니다: 소진된 크레딧은 전체적으로 거부됩니다 (`insufficient_credits`, B1Admin에서 친절한 업그레이드 프롬프트로 표면됨) — 절대 부분 전송, 절대 초과 청구 없음. 크레딧 부여는 Stripe `invoice.paid` 웹훅으로부터 청구 기간당 멱등적으로 발급됩니다. 옵트아웃 (`smsOptOuts`)은 모든 전송 전에 필터링됩니다.

## 저장소 흐름

교회의 제공자 행 (`content.storageProviders`, B1Admin → 설정 → 파일 저장소에서 관리됨)은 **새로운** 업로드가 어디로 가는지 선택합니다. `contentPath`는 절대 파일별 URL이므로 혼합 제공자는 마이그레이션 없이 공존합니다: 이전 파일은 `content.churchapps.org`에서 계속 제공되고 새 파일은 `content.ministrystuff.org`에서 제공됩니다. 업로드는 Api → `StorageResolver.forChurch` → 제공자 `store`/`getUploadUrl` (S3 모드에서 `content-length-range`를 사용한 사전 서명 POST; disk/dev 모드에서 base64 폴백)을 통해 흐릅니다; 삭제는 저장된 URL (`StorageResolver.forUrl`)로 라우트됩니다. 할당량 = 플랜 바이트, `storageObjects` (`stored` + `pending` 예약)에서 카운트됨; 할당량 초과는 새 업로드를 차단합니다 (`storage_quota_exceeded`) — 아무것도 절대 삭제되거나 추가 청구되지 않습니다. 무료 ChurchApps 티어는 손대지 않습니다 (전과 동일한 제한, 교회 전체 할당량 없음).

범위 참고: 제공자 선택은 콘텐츠 **파일/리소스** 흐름 (대량 미디어가 사는 곳)을 다룹니다. 갤러리/로고/사진 업로드는 기본 제공자에 남아 있습니다 — 저장소에서 키를 나열하고 클라이언트 측에서 URL을 빌드하므로 교회별 루팅은 아직 적용되지 않습니다.

## 청구

구독은 Stripe Checkout (호스팅됨), 카드 업데이트/취소/청구서는 Stripe Customer Portal — MinistryStuffWeb에는 카드 양식이 없습니다. (교회, 제품) 쌍당 하나의 `subscriptions` 행; 플랜/티어는 코드에 있습니다 (`MinistryStuffApi/src/helpers/Plans.ts`) Stripe 가격 id는 구성에서 나옵니다. 웹훅 (`/billing/webhook`, 원시 본문 서명 검증, `webhookEvents` 중복 제거)이 구독 생명 주기를 구동합니다: active → past_due (유예) → canceled.

## 개발 설정

MinistryStuffApi를 실행합니다 (`yarn dev`, 8097; 공유 `JWT_SECRET` + `MINISTRYSTUFF_SERVICE_KEY`가 있는 `.env` 필요) 그리고 `Api/.env`에 동일한 서비스 키를 설정합니다. `Api/config/dev.json`은 이미 `ministryStuffApi`를 `localhost:8097`로 가리킵니다. MinistryStuffWeb은 `VITE_STAGE=dev`가 있는 `.env`가 필요합니다. 개발은 `smsMode: mock` 및 disk 저장소를 사용합니다 — AWS가 필요 없습니다.
