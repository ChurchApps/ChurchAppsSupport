---
title: "Caddy 커스텀 도메인 프록시"
---
# Caddy 커스텀 도메인 프록시
<div class="article-intro">
커스텀 교회 도메인 (`mychurch.org` → 교회의 B1 웹사이트)은 하나의 Windows EC2 박스에서 Caddy를 실행하여 종료됩니다. 박스는 TLS 인증서를 소유하고, 각 도메인을 `{sub}.b1.church` 사이트로 해석하고, 재작성된 Host 헤더로 역프록시합니다.
</div>

## 구성 요소

| 조각 | 용도 |
|---|---|
| EC2 인스턴스 | Windows Server; Elastic IP **`3.23.251.61`** |
| `C:\caddy\caddy.exe` | 커스텀 Caddy 빌드 (s3 저장소 모듈 포함) |
| `C:\caddy\Caddyfile` | 전체 프록시 구성 |
| `C:\caddy\hosts.map` | 라우팅 가능한 도메인 맵 |
| `sync-hostmap.ps1` | 예약된 작업 (5분마다 + 부팅 시) |
| Windows 서비스 `caddy` | WinSW 래퍼가 caddy.exe 실행 |
| S3 버킷 `churchapps-caddy-certs` | 공유 인증서 저장소 |
| IAM 역할 `CaddyRole` | S3 액세스 권한 |

## API 엔드포인트

박스가 의존하는 두 멤버십 API 엔드포인트:

| 엔드포인트 | 역할 |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Caddy의 온디맨드 TLS `ask` 게이트 |
| `GET /membership/domains/hostmap` | `domain sub.b1.church` 라인의 소스 |

## 요청 흐름

1. 브라우저가 `mychurch.org`를 `3.23.251.61`로 해석합니다
2. Caddy가 TLS를 종료합니다
3. `map`이 Host를 `{sub}.b1.church`로 해석합니다
4. `reverse_proxy`가 `{sub}.b1.church:443`으로 전달합니다
5. 포트 80이 ACME HTTP-01 챌린지를 전달합니다

## 필드 테스트된 주의 사항

| 주의 사항 | 증상 | 수정 |
|---|---|---|
| `tls_server_name {vars.upstream}` | 모든 프록시 도메인이 502됨 | 플레이스홀더를 사용합니다 |
| `hosts.map`의 중복 키 | Caddy가 하드 에러 | 동기화 스크립트가 정규화합니다 |
| Task 등록 실패 | 작업이 생성되지 않음 | CIM 인스턴스를 사용합니다 |

## 다음 단계

- [웹사이트 라우팅 & 다중 사이트](../architecture/websites)
- [API 배포](./apis)
