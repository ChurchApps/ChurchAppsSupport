---
title: "Caddy 사용자 정의 도메인 프록시"
---

# Caddy 사용자 정의 도메인 프록시

<div class="article-intro">

사용자 정의 교회 도메인 (`mychurch.org` → 교회의 B1 웹사이트)은 Caddy를 실행하는 단일 Windows EC2 박스에서 종료됩니다. 박스는 TLS 인증서를 소유하고 각 도메인을 `{sub}.b1.church` 사이트로 해결하고 다시 쓴 Host 헤더로 역프록시합니다. 그 전체 구성은 두 파일입니다. 정적 `Caddyfile`과 Membership API에서 새로고쳐진 `hosts.map`. 따라서 제로 런타임 상태로 재시작을 살아남습니다. 이 페이지는 박스가 처음부터 어떻게 빌드되는지, 어떻게 작동하는지, 그리고 그것을 재구축하는 누구나 깨물 필드 테스트 함정을 다룹니다.

</div>

요청이 B1App에 도달한 후 교회/사이트로 어떻게 해결되는지에 대해서는 [웹사이트 라우팅 및 멀티 사이트](../architecture/websites)를 참조하세요.

## 구성요소

| 부분 | 무엇인가 |
|-----|---------|
| EC2 인스턴스 | Windows Server; Elastic IP **`3.23.251.61`** (교회 DNS 전 세계에 구워짐. IP는 영구적, 인스턴스는 일회용) |
| `C:\caddy\caddy.exe` | **사용자 정의** Caddy 빌드이고 `techknowlogick/certmagic-s3` 저장소 모듈을 포함. 표준 Caddy는 인증서 저장소를 읽을 수 없음 |
| `C:\caddy\Caddyfile` | 전체 프록시 구성: 온디맨드 TLS, 호스트 → 업스트림 `map`, www → 지점 리디렉트, `:80` → https |
| `C:\caddy\hosts.map` | 라우팅 가능한 도메인당 하나의 `{domain} {sub}.b1.church` 행, Caddyfile의 `map` 블록으로 가져와짐 |
| `sync-hostmap.ps1` + `CaddyHostmapSync` 작업 | 예약된 작업 (5분마다 + 부팅 시, SYSTEM으로) API에서 `hosts.map`을 새로고치고 변경 시에만 Caddy를 정상적으로 다시 로드 |
| Windows 서비스 `caddy` (WinSW 래퍼) | `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile`을 실행; 실패 시 자동 재시작. Caddy는 SCM 인식이 아니므로 래퍼가 필요 |
| S3 버킷 `churchapps-caddy-certs` | 공유 인증서 저장소 (region `us-east-2`, prefix `certs`) — 인증서는 인스턴스 재구축을 살아남 |
| IAM 역할 `CaddyRole` | 인스턴스 S3 액세스 권한; Caddy는 AWS 기본 자격증 체인을 사용 (구성에 키 없음) |

## 박스가 의존하는 두 개의 API 엔드포인트

둘 다 멤버십 API의 익명입니다.

| 엔드포인트 | 역할 |
|----------|------|
| `GET /membership/domains/authorize?domain={host}` | Caddy의 **온디맨드 TLS `ask` 게이트**: 호스트 (또는 `www.` 호스트의 경우 그 지점)이 `domains`의 행일 때 `200 {"authorized":true}`; 그렇지 않으면 `404`. 이것이 악용 컨트롤입니다. Caddy는 이 엔드포인트이 거부하는 호스트에 대해 인증서를 발급하지 않습니다 |
| `GET /membership/domains/hostmap` | `text/plain`, 정렬됨, 중복 제거됨 `{domain} {sub}.b1.church` 행 (사이트 인식: 보조 사이트에 할당된 도메인은 그 사이트의 하위 도메인으로 다이얼). `map`의 원본 |

## 요청 흐름

1. 브라우저는 `mychurch.org` → `3.23.251.61`을 해결합니다 (지점 `A` 레코드 또는 `CNAME proxy.b1.church`).
2. Caddy는 TLS를 종료합니다. S3의 인증서를 가지고 있음 → 제공; 알려지지 않은 SNI → `authorize`이 요청됨; 200 → Let's Encrypt를 통해 온디맨드 발급; 404 → **핸드셰이크가 거부됨** (인증서 없음, 응답 없음. 알려지지 않은 호스트는 HTTP 오류가 아니라 TLS 거부됨).
3. `map`은 Host를 `{sub}.b1.church`로 해결합니다. `www.{apex}`는 지점으로 302를 가져옵니다. 권한이 있지만 매핑되지 않은 호스트 (≤5분 동기 윈도우 내 브랜드 새 도메인)는 깨끗한 404를 가져옵니다.
4. `reverse_proxy`는 `{sub}.b1.church:443`으로 SNI 및 Host가 업스트림으로 재작성되어 다이얼합니다. 그래서 Vercel의 엣지는 B1App 사이트를 제공합니다.
5. 포트 80은 ACME HTTP-01 챌린지를 통과하고 https로 모든 것을 308 리디렉트합니다.

새 도메인 전파: B1Admin에서 저장된 도메인은 ~5분 내에 라우팅 가능하게 됩니다 (동기 작업); 그 인증서는 첫 번째 HTTPS 히트에서 발급됩니다.

## 박스를 처음부터 빌드하기

필드 테스트 절차에서 축약됨 (복사 붙여넣기 명령이 있는 전체 단계별 절차는 운영 워크스페이스에 있고 이 저장소에는 없습니다). 먼저 전제 조건. 빌드는 이것이 없으면 죽습니다.

1. **IAM**: `CaddyRole` (인증서 버킷에 S3 액세스)을 인스턴스에 첨부합니다. 박스에서 IMDSv2를 통해 확인합니다. 베어 IMDS GET이 401을 반환하는 것은 IMDSv2가 강제됨을 의미합니다. "역할 없음"이 아닙니다.
2. **API 상태**: `authorize`는 bogus 도메인에 대해 404를 반환해야 하고 `hostmap`은 다른 것이 없기 전에 200을 반환해야 합니다.

그 후:

3. **이진**: Caddy의 빌드 서비스에서 사용자 정의 빌드를 다운로드합니다. `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 MB vs ~45 MB 표준; 작성 시점에 v2.11.4). 모듈 선택이 중요합니다: `techknowlogick/certmagic-s3`은 기존 인증서 레이아웃과 일치하는 `bucket`/`region`/`prefix` 키를 사용합니다. `ss098` 포크는 `host`/`endpoint`를 사용하고 기존 인증서를 찾을 **수 없습니다**.
4. **파일**: `Caddyfile` + `sync-hostmap.ps1`을 `C:\caddy\`로; `sync-hostmap.ps1 -NoReload`로 맵을 한 번 시드합니다.
5. **첫 시작 전 게이트**: `caddy list-modules`은 s3 저장소 모듈을 표시해야 합니다. `caddy adapt`는 저장소 블록에서 `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"`를 방출해야 합니다. `caddy validate`는 통과해야 합니다.
6. **서비스**: WinSW를 통해 설치합니다 (서비스 id `caddy`, 실패 시 자동 재시작, 순환 로그). LocalSystem으로 실행되고 역할 자격증에 대해 IMDS에 도달합니다.
7. **동기 작업**: `CaddyHostmapSync` 등록 (SYSTEM, 5분마다 + 시작 시, 4분 실행 제한).
8. **go-live 전 확인**: `curl --resolve`로 도메인을 `127.0.0.1`로 강제 해결합니다 (박스는 EIP가 이동할 때까지 실제 트래픽이 없음): 기존 도메인은 유효한 이월 인증서로 제공해야 합니다. `www.`는 302여야 합니다. 알려지지 않은 호스트는 TLS 거부되어야 합니다. `Restart-Service caddy`는 수동 재작업 없이 제공되고 돌아와야 합니다. 그 재시작 테스트가 정적 설계의 전체 요점입니다.
9. **라이브 진행**: Elastic IP `3.23.251.61`을 새 인스턴스에 재연결합니다. 교회 DNS는 절대 변경되지 않습니다.

## 필드 테스트 함정 (어려운 방식으로 배운 것 — 회귀하지 마세요)

| 함정 | 증상 | 수정 |
|-----|------|------|
| reverse_proxy 전송에서 `tls_server_name {vars.upstream}` | 모든 프록시 도메인이 502됨: 맵 자리 표시자는 **TLS 다이얼 시간에 비어 있음**으로 해결 ("ServerName 또는 InsecureSkipVerify 중 하나를 지정해야 합니다") | 전송 네이티브 자리 표시자를 사용합니다: `tls_server_name {http.reverse_proxy.upstream.host}` |
| `hosts.map`의 중복 키 또는 정크 라인 | Caddy의 `map` 핸들러는 **중복 입력 키에 하드 오류합니다**. 하나의 나쁜 라인이 전체 구성을 내려놓을 수 있습니다 | 동기 스크립트는 공백을 정규화하고 잘못된 형식의 라인을 삭제합니다 (>20%이 나쁘면 wholesale을 거부). 먼저 이기는 중복 제거. **BOM 없는** UTF-8을 작성합니다 (BOM은 첫 번째 맵 키를 손상시킵니다). API는 또한 소스에서 빈/공백이 있는 도메인 행을 필터링합니다 |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | 작업 등록이 **자동으로 실패합니다** (범위를 벗어난 XML, 비종료 오류) | 반복을 `Interval = "PT5M"`을 가진 `MSFT_TaskRepetitionPattern` CIM 인스턴스로 빌드합니다. 지속 없음. 4분 `ExecutionTimeLimit`을 추가합니다 (첫 SYSTEM 실행은 콜드 TLS/CRL 조회에 걸릴 수 있습니다) |

:::warning
관리자 API는 `localhost:2019`만에 바인드합니다. 레거시 런타임 모드는 원격으로 노출했으므로 Membership API는 경로 구성을 푸시할 수 있습니다. 정적 설계는 원격 푸시를 필요로 하지 않으므로 더 작은 표면은 의도적입니다. `caddy reload` (동기 스크립트로 로컬로 실행됨)은 유일한 관리자 API 소비자입니다.
:::

:::info 레거시 런타임 푸시
API의 `CaddyHelper` (및 `/membership/domains/caddy` + `/caddy/init` 엔드포인트)는 여전히 이전 런타임 구성 모드로의 롤백 경로로 존재합니다. 정적 박스가 몇 주 동안 안정적이 된 후 삭제 예정입니다. 그 후 `authorize` + `hostmap`은 유일한 통합 포인트입니다.
:::

## 운영

- **로그**: `C:\caddy\`의 WinSW 순환 로그 (서비스 stdout/err — 역프록시 오류는 `caddy-service.err.log`에 착지); 동기 이력은 `C:\caddy\sync-hostmap.log`에 있습니다.
- **강제 맵 새로고침**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **구성 변경**: `C:\caddy\Caddyfile`을 편집한 후 `caddy validate` + `caddy reload` (또는 `Restart-Service caddy` — 재시작은 설계상 안전합니다).
- **대량 도메인 삭제**는 설계상 동기 스크립트의 축소 가드를 트립합니다. 이전 `hosts.map`을 옆으로 이동하고 의도적인 큰 축소를 수락하려면 작업을 다시 실행합니다.
- **교회에 대한 DNS 지시사항은 영원히 변경되지 않습니다**: 지점 `A 3.23.251.61` 또는 `CNAME proxy.b1.church`.

## 관련 페이지

- [웹사이트 라우팅 및 멀티 사이트](../architecture/websites) — 프록시된 요청이 B1App의 교회/사이트로 어떻게 해결되는지
- [API 배포](./apis) — `authorize`/`hostmap`을 제공하는 멤버십 API 배포
