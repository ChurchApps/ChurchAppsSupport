---
title: "자신의 저장소 가져오기"
---
# 자신의 저장소 가져오기 (BYOS)

교회는 ~100MB 무료 호스팅 파일 저장소를 받습니다. BYOS를 사용하면 교회가 자신의 클라우드 저장소를 연결할 수 있습니다 — **Google Drive, Dropbox, OneDrive, 또는 S3 호환 버킷** — 새 업로드가 교회의 자신의 계정으로 직접 이동됩니다.

## 제공자 이음

BYOS는 MinistryStuff을 위해 만들어진 저장소 이음을 재사용합니다: `IStorageProvider` (`Packages/apihelper`).

저장소 제공자는:
- Google Drive
- Dropbox  
- OneDrive
- S3 호환 버킷 (AWS S3, Cloudflare R2, Backblaze B2 등)

## 업로드 흐름

`POST /content/files/postUrl`은 `PresignedPostData`를 반환합니다. 제공자에 따라:

| 제공자 | 사전 서명 | 클라이언트가 전송 |
|---|---|---|
| churchapps (기본) | S3 사전 서명 POST | 다중 부분 양식 |
| Google Drive | 재개 가능한 업로드 세션 | 세션 URI에 대한 단일 PUT |
| Dropbox | 임시 업로드 링크 | 원시 POST |
| OneDrive | 업로드 세션 생성 | 청크된 PUT |
| S3 호환 | 사전 서명 PUT | 원시 PUT |

## 관련 페이지

- [웹사이트 라우팅 & 다중 사이트](../architecture/websites)
