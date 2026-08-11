---
title: "자신의 저장소 가져오기"
---

# 자신의 저장소 가져오기(BYOS)

교회는 무료 호스팅 파일 저장소 약 100MB를 받습니다(`/content/files` 표면: 웹사이트 파일, 그룹 리소스). BYOS를 사용하면 교회가 자신의 클라우드 저장소를 연결할 수 있습니다 -- **Google Drive, Dropbox, OneDrive 또는 S3 호환 버킷(AWS S3, Cloudflare R2, Backblaze B2)** -- 새 업로드는 플랫폼 상한선 없이 교회의 계정에 전달됩니다. ChurchApps는 무료로 유지됩니다. 교회의 계정이 한계입니다.

## 공급자 이음새

BYOS는 [MinistryStuff](./ministrystuff)를 위해 구축된 저장소 이음새를 재사용합니다: `IStorageProvider`(`Packages/apihelper`)는 `content.storageProviders` 테이블에서 `StorageResolver`에 의해 교회별로 해결됩니다. 단일 `churchapps`/`ministrystuff` 공급자와 달리 BYOS 공급자는 교회별 자격증을 보유하므로 `StorageResolver.forChurch`는 교회의 행에서 요청당 인스턴스를 구성합니다. 구현은 `Api/src/modules/content/helpers/`에서 리졸버 옆에 있습니다: `GoogleDriveStorageProvider`, `DropboxStorageProvider`, `OneDriveStorageProvider`, `S3CompatibleStorageProvider`, 더하기 `ByosAuth`(OAuth 토큰 교환 + 단일 비행 새로 고침 -- Dropbox는 새로 고침 토큰을 회전하므로 새로 고침은 `ProviderProxyController`와 동일한 방식으로 중복 제거됨).

`storageProviders`는 자격증을 전달합니다: `accessToken`/`refreshToken`/`tokenExpiresAt`(암호화됨, OAuth 3조) 또는 `apiKey`/`apiSecret` + `settings` JSON(`{endpoint, region, bucket, publicBase}`, S3). 토큰은 절대 클라이언트에 도달하지 않습니다 -- `GET /content/storage/providers`는 비밀을 마스킹하고 `connected` 부울을 반환합니다.

## 업로드 흐름

이전과 동일한 3단계 계약이며, 미리 서명된 모양이 확장됩니다. `POST /content/files/postUrl`은 이제 선택적으로 `method`, `rawBody`, `headers`, `chunkSize` 및 `externalIdField`를 포함할 수 있는 `PresignedPostData`를 반환합니다:

| 공급자 | 미리 서명 | 클라이언트가 바이트 전송 |
|---|---|---|
| churchapps(기본값) | S3 미리 서명 POST | 다중파트 양식(레거시) |
| Google Drive | 재개 가능한 업로드 세션(`drive.file` 범위) | 세션 URI로 단일 PUT |
| Dropbox | `files/get_temporary_upload_link`(4시간) | 원본 POST |
| OneDrive | `createUploadSession`(approot) | 청크 PUT(20MiB, Graph 320KiB 배수) |
| S3 호환 | 미리 서명 PUT(B2에는 POST 정책 없음) | 원본 PUT |

`FileHelper.uploadPresignedFile`(`@churchapps/helpers`)은 모든 모양을 처리하고 응답이 Drive 파일 ID를 포함할 때 공급자 파일 ID를 반환합니다. 클라이언트는 이를 `POST /content/files` 등록의 `externalId`로 전달합니다. `files.provider` + `files.externalId`는 바이트가 있는 위치를 기록합니다(Drive 파일 ID; 다른 경우 경로). 100MB 할당량 확인은 해결된 공급자가 `churchapps`일 때만 적용됩니다.

## 공개 다운로드

소비자 클라우드는 핫링크될 수 없습니다(Drive 링크는 할당량 시간 초과, Dropbox/OneDrive 링크는 만료됨), OAuth 3조의 경우 `contentPath`는 안정적인 Api 경로를 가리킵니다: `GET /content/files/download/:id`(익명)는 파일 행을 로드하고, 공급자의 `getDownloadUrl`(`webContentLink` / `get_temporary_link` / `@microsoft.graph.downloadUrl`)을 통해 단기 직접 링크를 주조하고, 30분 동안 메모리에 캐시하고 `Cache-Control: max-age=300`을 사용하여 302 리디렉션합니다. 대역폭은 Api를 통과하지 않고 브라우저 ↔ 공급자로 흐릅니다. S3 호환은 리디렉션을 완전히 건너뜁니다 -- `contentPath`는 안정적인 `publicBase + key` URL입니다(버킷은 공개 읽기 및 CORS PUT을 허용해야 함).

삭제 및 다운로드는 `files.provider`(`StorageResolver.forFile`)별로 경로를 지정합니다. 없는 레거시 행은 URL 접두사 라우팅으로 폴백합니다. BYOS 파일의 이름 바꾸기는 DB 전용입니다(바이트는 `externalId`로 처리되며 이름별이 아님). 여전히 파일이 있는 공급자를 연결 해제하면 행이 소프트 비활성화됩니다(토큰을 유지하므로 다운로드/삭제는 계속 작동함) 삭제하는 대신.

## 연결(B1Admin → 설정 → 파일 저장소)

OAuth 3조는 콘텐츠 공급자와 동일한 릴레이 흐름을 사용합니다: 팝업 → 공급자 동의 → `{membershipApi}/oauth/relay/callback` → B1Admin이 릴레이 세션을 폴링합니다 → `POST /content/storage/exchange`는 서버 측 코드→토큰 교환을 수행합니다(클라이언트 비밀은 서버를 떠나지 않음; Google `GOOGLE_DRIVE_CLIENT_SECRET`, OneDrive `ONEDRIVE_CLIENT_SECRET`, Dropbox는 PKCE 공개 클라이언트). 클라이언트 ID는 `B1Admin/src/settings/components/byosProviders.ts` 및 `Api .../ByosAuth.ts`에 있습니다. 범위는 의도적으로 최소한입니다: Google `drive.file`(앱이 만든 파일만 -- 제한된 범위 확인 없음), OneDrive `Files.ReadWrite.AppFolder`, Dropbox 앱 폴더 접근. S3은 일반 자격증 양식입니다.

범위 참고: BYOS는 `/content/files` 표면만 다룹니다. 갤러리 이미지, 축소판, 로고 및 사람 사진은 기본 공급자에 남아 있습니다(작은, CDN 제공, 이미지 최적화).
