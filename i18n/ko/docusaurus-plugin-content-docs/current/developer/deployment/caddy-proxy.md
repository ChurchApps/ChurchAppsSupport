---
title: "Caddy 사용자 지정 도메인 프록시"
---

# Caddy 사용자 지정 도메인 프록시

<div class="article-intro">

교회의 사용자 지정 도메인(`mychurch.org` → 교회의 B1 웹사이트)은 Caddy를 실행하는 Windows EC2 상자 하나에서 종료됩니다. 이 상자는 TLS 인증서를 소유하고, 각 도메인을 `{sub}.b1.church` 사이트로 해석하며, 다시 쓴 Host 헤더로 역방향 프록시합니다. 전체 구성은 정적 `Caddyfile`과 Membership API에서 새로 고치는 `hosts.map` 두 파일이므로, 런타임 상태 없이 재시작을 견딥니다. 이 페이지에서는 상자를 처음부터 만드는 방법, 운영 방법, 그리고 상자를 다시 만드는 사람을 괴롭힐 현장에서 검증된 함정을 다룹니다.

</div>

요청이 B1App에 도달한 뒤 교회/사이트로 해석되는 방식은 [웹사이트 라우팅 및 다중 사이트](../architecture/websites)를 참고하세요.

## 구성 요소

| 구성 요소 | 설명 |
|---|---|
| EC2 인스턴스 | Windows Server. Elastic IP **`3.23.251.61`**(전 세계 교회 DNS에 고정으로 등록됨. IP는 영구적이며, 인스턴스는 일회용입니다) |
| `C:\caddy\caddy.exe` | **사용자 지정** Caddy 빌드. `techknowlogick/certmagic-s3` 저장소 모듈 포함. 표준 Caddy는 인증서 저장소를 읽을 수 없습니다 |
| `C:\caddy\Caddyfile` | 프록시 구성 전체. 온디맨드 TLS, 호스트→업스트림 `map`, www→apex 리디렉션, `:80`→https |
| `C:\caddy\hosts.map` | 라우팅 가능한 도메인마다 `{domain} {sub}.b1.church` 줄 하나. Caddyfile의 `map` 블록으로 가져옴 |
| `sync-hostmap.ps1` + `CaddyHostmapSync` 작업 | 예약된 작업(5분마다 + 부팅 시, SYSTEM 권한). API에서 `hosts.map`을 새로 고치고, 변경이 있을 때만 Caddy를 우아하게 다시 로드 |
| Windows 서비스 `caddy`(WinSW 래퍼) | `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile`을 실행하며, 실패 시 자동 재시작. Caddy는 SCM을 인식하지 않으므로 래퍼가 필요합니다 |
| S3 버킷 `churchapps-caddy-certs` | 공유 인증서 저장소(`region us-east-2`, prefix `certs`). 인증서는 인스턴스를 다시 만들어도 살아남습니다 |
| IAM 역할 `CaddyRole` | 인스턴스에 S3 접근 권한을 부여합니다. Caddy는 AWS 기본 자격 증명 체인을 사용합니다(구성에 키가 없습니다) |

## 상자가 의존하는 API 엔드포인트 두 개

둘 다 Membership API에 있습니다. `authorize`는 익명이며, `hostmap`은 API PR #67(2026-08-16) 이후 `x-internal-key: <INTERNAL_API_KEY>` 헤더가 필요합니다. `sync-hostmap.ps1`은 이를 `C:\caddy\internal-key.txt`에서 읽습니다.

| 엔드포인트 | 역할 |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Caddy의 **온디맨드 TLS `ask` 관문**. 호스트(또는 `www.` 호스트라면 apex)가 `domains`의 행이면 `200 {"authorized":true}`, 그 밖에는 `404`. 이것이 남용 방지 수단입니다. 이 엔드포인트가 거부하는 호스트에 대해서는 Caddy가 인증서를 발급하지 않습니다 |
| `GET /membership/domains/hostmap` | `x-internal-key`(또는 서버 관리자 JWT)가 필요합니다. `text/plain`, 정렬되고 중복이 제거된 `{domain} {sub}.b1.church` 줄(사이트를 인식합니다. 보조 사이트에 할당된 도메인은 그 사이트의 서브도메인으로 다이얼합니다). `map`의 원천입니다 |

## 요청 흐름

1. 브라우저가 `mychurch.org`를 `3.23.251.61`로 해석합니다(apex `A` 레코드, 또는 `CNAME proxy.b1.church`).
2. Caddy가 TLS를 종료합니다. 인증서가 S3에 있으면 제공합니다. 알 수 없는 SNI면 `authorize`에 묻습니다. 200이면 Let's Encrypt로 온디맨드 발급합니다. 404면 **핸드셰이크가 거부됩니다**(인증서 없음, 응답 없음. 알 수 없는 호스트는 HTTP 오류가 아니라 TLS 거부를 받습니다).
3. `map`이 Host를 `{sub}.b1.church`로 해석합니다. `www.{apex}`는 apex로 가는 302를 받습니다. 인가되었지만 매핑되지 않은 호스트(≤5분 동기화 기간 안의 새 도메인)는 깔끔한 404를 받습니다.
4. `reverse_proxy`가 `{sub}.b1.church:443`을 SNI와 업스트림으로 다시 쓴 Host와 함께 다이얼하므로, Vercel 에지가 B1App 사이트를 제공합니다.
   Caddy는 방문자의 원래 도메인을 `X-Church-Host`로도 보냅니다(Vercel은 `X-Forwarded-Host`를 다시 쓴 Host로 덮어씁니다). B1App 미들웨어는 `/domains/public/lookup/{host}`가 그것을 요청 호스트와 같은 `{sub}`에 매핑할 때만 이를 받아들이고, 그다음 정식 `Link` 헤더, `robots.txt`, `sitemap.xml`을 위해 `x-public-host`로 노출합니다. 클라이언트가 보낸 `x-public-host`는 항상 제거됩니다. Schema.org `ChurchJsonLd`는 여전히 `b1.church` URL을 사용합니다(거기서 헤더를 읽으면 페이지가 동적이 되기 때문입니다).
5. 포트 80은 ACME HTTP-01 챌린지를 통과시키고, 나머지 모든 요청은 https로 308 리디렉션합니다.

새 도메인 전파: B1Admin에서 저장한 도메인은 약 5분 안에 라우팅 가능해집니다(동기화 작업). 인증서는 첫 HTTPS 접근 시 발급됩니다.

## 처음부터 상자 만들기

현장에서 검증된 절차를 압축한 것입니다(복사-붙여넣기 명령이 포함된 전체 단계별 절차는 이 저장소가 아니라 운영 워크스페이스에 있습니다). 먼저 전제 조건부터 확인하세요. 이것 없이는 빌드가 작동하지 않습니다.

1. **IAM**: 인스턴스에 `CaddyRole`(인증서 버킷에 대한 S3 접근)을 연결합니다. 상자에서 IMDSv2로 확인하세요. IMDS GET이 401을 반환하는 것은 IMDSv2가 강제된다는 뜻일 뿐, "역할이 없다"는 뜻이 아닙니다.
2. **API 상태**: `authorize`는 가짜 도메인에 대해 404를 반환해야 하고, `hostmap`(`x-internal-key` 헤더와 함께)은 200을 반환해야 합니다. 다른 어떤 것보다 먼저 확인하세요.

그다음:

3. **바이너리**: Caddy의 빌드 서비스에서 사용자 지정 빌드를 내려받습니다. `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3`(표준 약 45MB 대비 약 57MB. 작성 시점 v2.11.4). 모듈 선택이 중요합니다. `techknowlogick/certmagic-s3`는 기존 인증서 레이아웃과 맞는 `bucket`/`region`/`prefix` 키를 사용합니다. `ss098` 포크는 `host`/`endpoint`를 사용하며, 기존 인증서를 **찾지 못합니다**.
4. **파일**: `Caddyfile` + `sync-hostmap.ps1` + `internal-key.txt`(운영 `INTERNAL_API_KEY`, 한 줄)를 `C:\caddy\`에 둡니다. `sync-hostmap.ps1 -NoReload`로 맵을 한 번 시드합니다.
5. **첫 시작 전 게이트**: `caddy list-modules`에 s3 저장소 모듈이 보여야 합니다. `caddy adapt`는 저장소 블록에 `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"`를 출력해야 합니다. `caddy validate`는 통과해야 합니다.
6. **서비스**: WinSW로 설치합니다(서비스 ID `caddy`, 실패 시 자동 재시작, 롤링 로그). LocalSystem으로 실행하며, 이것이 역할 자격 증명을 얻기 위해 IMDS에 도달합니다.
7. **동기화 작업**: `CaddyHostmapSync`를 등록합니다(SYSTEM, 5분마다 + 시작 시, 4분 실행 제한).
8. **전환 전 검증**: `curl --resolve`로 도메인을 `127.0.0.1`에 강제 해석시켜 확인합니다(EIP를 옮기기 전까지 상자에는 실제 트래픽이 없습니다). 기존 도메인은 이월된 유효한 인증서로 제공되어야 하며, `www.`는 302를 받아야 하고, 알 수 없는 호스트는 TLS 거부를 받아야 하며, `Restart-Service caddy`를 하면 **수동 재준비 없이** 다시 제공되어야 합니다. 이 재시작 테스트가 정적 설계의 핵심입니다.
9. **전환**: Elastic IP `3.23.251.61`을 새 인스턴스에 다시 연결합니다. 교회 DNS는 절대 바뀌지 않습니다.

## 현장에서 검증된 함정 (어렵게 배웠습니다. 되돌리지 마세요)

| 함정 | 증상 | 해결 |
|---|---|---|
| reverse_proxy 전송의 `tls_server_name {vars.upstream}` | 프록시되는 모든 도메인이 502를 받습니다. map 자리 표시자가 TLS 다이얼 시점에 **빈 값으로 해석**됩니다("either ServerName or InsecureSkipVerify must be specified") | 전송 고유의 자리 표시자를 사용하세요: `tls_server_name {http.reverse_proxy.upstream.host}` |
| `hosts.map`의 중복 키나 잘못된 줄 | Caddy의 `map` 핸들러는 중복 입력 키에서 **하드 오류**를 냅니다. 잘못된 줄 하나가 전체 구성을 내릴 수 있습니다 | 동기화 스크립트는 공백을 정규화하고, 잘못된 줄을 버리며(20%를 넘게 잘못된 경우에만 전체를 거부), 먼저 나온 것을 남기고 중복을 제거하며, **BOM 없는** UTF-8로 씁니다(BOM은 첫 map 키를 망가뜨립니다). API도 출처에서 빈 값이나 공백이 포함된 도메인 행을 걸러냅니다 |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | 작업 등록이 **조용히 실패합니다**(범위를 벗어난 XML, 끝나지 않는 오류) | 반복을 `Interval = "PT5M"`이고 기간이 없는 `MSFT_TaskRepetitionPattern` CIM 인스턴스로 만드세요. 4분 `ExecutionTimeLimit`을 추가하세요(첫 SYSTEM 실행은 차가운 TLS/CRL 조회에서 멈출 수 있습니다) |

:::warning
관리 API는 `localhost:2019`에만 바인딩됩니다. 레거시 런타임 모드는 Membership API가 라우트 구성을 밀어 넣을 수 있도록 원격에 노출했습니다. 정적 설계는 원격 푸시가 필요 없으며, 더 작은 표면은 의도된 것입니다. 로컬에서 실행되는 `caddy reload`(동기화 스크립트가 실행)가 관리 API의 유일한 소비자입니다.
:::

:::info 레거시 런타임 푸시
API의 `CaddyHelper`(그리고 `/membership/domains/caddy` + `/caddy/init` 엔드포인트)는 여전히 존재하며, 이전의 런타임 구성 모드로 돌아가는 롤백 경로입니다. 정적 상자가 몇 주 동안 안정적으로 작동한 뒤 삭제될 예정입니다. 그 이후에는 `authorize`와 `hostmap`만 통합 지점으로 남습니다.
:::

## 운영

- **로그**: `C:\caddy\`의 WinSW 롤링 로그(서비스 stdout/err. 역방향 프록시 오류는 `caddy-service.err.log`에 나타납니다). 동기화 기록은 `C:\caddy\sync-hostmap.log`입니다.
- **맵 새로 고침 강제**: `Start-ScheduledTask -TaskName CaddyHostmapSync`
- **구성 변경**: `C:\caddy\Caddyfile`을 편집한 다음 `caddy validate` + `caddy reload`를 실행합니다(또는 `Restart-Service caddy`. 재시작은 설계상 안전합니다).
- **대량 도메인 삭제**는 동기화 스크립트의 축소 가드를 의도적으로 건드립니다. 의도한 대규모 축소를 받아들이려면 기존 `hosts.map`을 옆으로 치우고 작업을 다시 실행하세요.
- **교회를 위한 DNS 안내는 영원히 바뀌지 않습니다**: apex `A 3.23.251.61` 또는 `CNAME proxy.b1.church`.

## 관련 페이지

- [웹사이트 라우팅 및 다중 사이트](../architecture/websites) — 프록시된 요청이 B1App에서 교회/사이트로 해석되는 방식
- [API 배포](./apis) — `authorize`/`hostmap`을 제공하는 Membership API 배포
