---
title: "Caddy 사용자 지정 도메인 프록시"
---

# Caddy 사용자 지정 도메인 프록시

<div class="article-intro">

교회의 사용자 지정 도메인(`mychurch.org` → 교회의 B1 웹사이트)은 Caddy를 실행하는 단일 Windows EC2 인스턴스에서 종료됩니다. 이 인스턴스가 TLS 인증서를 관리하고, 각 도메인을 해당 `{sub}.b1.church` 사이트로 연결하며, 재작성된 Host 헤더와 함께 역방향 프록시를 수행합니다. 전체 구성은 정적 `Caddyfile`과 Membership API에서 갱신되는 `hosts.map` 두 파일뿐이므로, 런타임 상태 없이 재시작해도 그대로 유지됩니다. 이 페이지에서는 인스턴스를 처음부터 만드는 방법, 운영 방법, 그리고 다시 구축하는 사람이 반드시 마주칠 실제 시행착오를 다룹니다.

</div>

요청이 B1App에 도착한 뒤 교회와 사이트로 어떻게 연결되는지는 [웹사이트 라우팅 및 다중 사이트](../architecture/websites)를 참고하세요.

## 구성 요소

| 구성 요소 | 설명 |
|---|---|
| EC2 인스턴스 | Windows Server. 탄력적 IP **`3.23.251.61`**(전 세계 교회 DNS에 등록되어 있음. IP는 영구적이고, 인스턴스는 교체 가능함) |
| `C:\caddy\caddy.exe` | `techknowlogick/certmagic-s3` 스토리지 모듈이 포함된 **사용자 지정** Caddy 빌드. 기본 Caddy는 인증서 저장소를 읽을 수 없음 |
| `C:\caddy\Caddyfile` | 프록시 구성 전체: 요청 시 TLS, 호스트→업스트림 `map`, www→apex 리디렉션, `:80`→https |
| `C:\caddy\hosts.map` | 라우팅 가능한 도메인마다 한 줄씩 `{domain} {sub}.b1.church`를 적은 파일. Caddyfile의 `map` 블록으로 가져옴 |
| `sync-hostmap.ps1` + `CaddyHostmapSync` 작업 | 예약 작업(5분마다 및 부팅 시, SYSTEM 권한으로 실행). API에서 `hosts.map`을 갱신하고, 변경된 경우에만 Caddy를 부드럽게 다시 로드함 |
| Windows 서비스 `caddy`(WinSW 래퍼) | `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile`을 실행하며, 실패 시 자동 재시작함. Caddy는 SCM을 인식하지 않으므로 래퍼가 필요함 |
| S3 버킷 `churchapps-caddy-certs` | 공유 인증서 저장소(`region us-east-2`, 접두사 `certs`). 인스턴스를 다시 만들어도 인증서가 유지됨 |
| IAM 역할 `CaddyRole` | 인스턴스에 S3 접근 권한을 부여함. Caddy는 AWS 기본 자격 증명 체인을 사용하므로 구성에 키가 없음 |

## 이 인스턴스가 의존하는 두 API 엔드포인트

둘 다 Membership API에 있습니다. `authorize`는 익명으로 접근할 수 있습니다. `hostmap`은 Api PR #67(2026-08-16) 이후 `x-internal-key: <INTERNAL_API_KEY>` 헤더가 필요합니다. `sync-hostmap.ps1`은 이 값을 `C:\caddy\internal-key.txt`에서 읽습니다.

| 엔드포인트 | 역할 |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Caddy의 **요청 시 TLS `ask` 게이트**. 호스트(또는 `www.` 호스트의 경우 apex)가 `domains` 테이블에 있으면 `200 {"authorized":true}`, 그렇지 않으면 `404`를 반환함. 이것이 남용을 막는 장치이며, 이 엔드포인트가 거부한 호스트에는 Caddy가 인증서를 발급하지 않음 |
| `GET /membership/domains/hostmap` | `x-internal-key`(또는 서버 관리자 JWT)가 필요함. 정렬되고 중복이 제거된 `text/plain` 형식의 `{domain} {sub}.b1.church` 줄을 반환함(사이트 인식: 보조 사이트에 할당된 도메인은 해당 사이트의 서브도메인으로 연결됨). `map`의 원본 데이터 |

## 요청 흐름

1. 브라우저가 `mychurch.org`를 `3.23.251.61`로 확인합니다(apex `A` 레코드 또는 `CNAME proxy.b1.church`).
2. Caddy가 TLS를 종료합니다. 인증서가 S3에 있으면 제공하고, 알 수 없는 SNI이면 `authorize`에 물어봅니다. 200이면 Let's Encrypt로 요청 시 발급하고, 404이면 **핸드셰이크를 거부합니다**(인증서도 응답도 없음. 알 수 없는 호스트는 HTTP 오류가 아니라 TLS 거부를 받음).
3. `map`이 Host를 `{sub}.b1.church`로 연결합니다. `www.{apex}`는 apex로 302 리디렉션되며, 인증은 되었지만 아직 매핑되지 않은 호스트(최대 5분의 동기화 기간 내의 새 도메인)는 깔끔한 404를 받습니다.
4. `reverse_proxy`가 SNI를 포함해 `{sub}.b1.church:443`에 연결하며, Host는 업스트림으로 재작성됩니다. 그래서 Vercel 엣지가 B1App 사이트를 제공합니다.
   Caddy는 방문자의 원래 도메인을 `X-Church-Host`로도 보냅니다(Vercel은 `X-Forwarded-Host`를 재작성된 Host로 덮어씀). B1App 미들웨어는 `/domains/public/lookup/{host}`가 이 값을 요청 호스트와 같은 `{sub}`로 매핑할 때만 이를 받아들이고, 그다음 정식 `Link` 헤더, `robots.txt`, `sitemap.xml`을 위해 `x-public-host`로 노출합니다. 클라이언트가 보낸 `x-public-host`는 항상 제거됩니다. Schema.org `ChurchJsonLd`는 여전히 `b1.church` URL을 사용합니다(거기서 헤더를 읽으면 페이지가 동적으로 바뀌기 때문).
5. 80번 포트는 ACME HTTP-01 챌린지를 통과시키고, 그 밖의 모든 요청을 308로 https로 리디렉션합니다.

새 도메인이 반영되는 과정: B1Admin에서 저장한 도메인은 약 5분 안에 라우팅 가능해지며(동기화 작업), 인증서는 첫 HTTPS 요청 때 발급됩니다.

## 처음부터 인스턴스 만들기

현장에서 검증된 절차를 줄인 내용입니다(복사해서 쓸 수 있는 단계별 전체 명령은 이 저장소가 아니라 운영 작업 공간에 있습니다). 먼저 필수 조건을 갖추세요. 이것이 없으면 구축을 진행할 수 없습니다.

1. **IAM**: 인스턴스에 `CaddyRole`(인증서 버킷 S3 접근)을 연결하세요. 인스턴스에서 IMDSv2로 확인하세요. 참고로 IMDS에 단순 GET 요청을 보냈을 때 401이 돌아오는 것은 IMDSv2가 강제된다는 뜻이지 "역할이 없다"는 뜻이 아닙니다.
2. **API 상태 확인**: 다른 작업을 하기 전에 `authorize`가 잘못된 도메인에 대해 404를 반환하고, `hostmap`(`x-internal-key` 헤더 포함)이 200을 반환해야 합니다.

그다음:

3. **바이너리**: Caddy 빌드 서비스에서 사용자 지정 빌드를 내려받으세요. `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (기본 빌드 약 45MB 대비 약 57MB이며, 작성 시점 기준 v2.11.4). 모듈 선택이 중요합니다. `techknowlogick/certmagic-s3`는 기존 인증서 구조와 맞는 `bucket`/`region`/`prefix` 키를 사용하지만, `ss098` 포크는 `host`/`endpoint`를 사용하므로 기존 인증서를 **찾지 못합니다**.
4. **파일**: `Caddyfile`, `sync-hostmap.ps1`, `internal-key.txt`(운영 `INTERNAL_API_KEY`, 한 줄)를 `C:\caddy\`에 넣으세요. `sync-hostmap.ps1 -NoReload`로 맵을 한 번 채우세요.
5. **첫 시작 전 검사**: `caddy list-modules`에 s3 스토리지 모듈이 나타나야 합니다. `caddy adapt`의 스토리지 블록에 `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"`가 출력되어야 합니다. `caddy validate`가 통과해야 합니다.
6. **서비스**: WinSW로 설치하세요(서비스 ID `caddy`, 실패 시 자동 재시작, 롤링 로그). LocalSystem으로 실행하면 역할 자격 증명을 위해 IMDS에 접근할 수 있습니다.
7. **동기화 작업**: `CaddyHostmapSync`를 등록하세요(SYSTEM, 5분마다 및 시작 시, 실행 제한 4분).
8. **전환 전 검증**: 실제 트래픽은 EIP를 옮기기 전까지 없으므로, `curl --resolve`로 도메인을 `127.0.0.1`에 강제로 연결해 확인하세요. 기존 도메인은 가져온 유효한 인증서로 제공되어야 합니다. `www.`는 302가 나와야 합니다. 알 수 없는 호스트는 TLS 거부를 받아야 합니다. 그리고 `Restart-Service caddy` 후에 **수동으로 다시 준비하지 않아도** 제공이 재개되어야 합니다. 이 재시작 테스트가 정적 설계의 핵심입니다.
9. **전환**: 탄력적 IP `3.23.251.61`을 새 인스턴스에 다시 연결하세요. 교회 DNS는 바뀌지 않습니다.

## 현장에서 얻은 주의 사항(어렵게 배운 교훈, 되돌리지 말 것)

| 주의 사항 | 증상 | 해결 방법 |
|---|---|---|
| reverse_proxy 전송에서 `tls_server_name {vars.upstream}` 사용 | 프록시되는 모든 도메인이 502를 반환함. map 플레이스홀더가 TLS 연결 시점에 **빈 값으로 확인됨**("either ServerName or InsecureSkipVerify must be specified") | 전송 고유의 플레이스홀더를 사용: `tls_server_name {http.reverse_proxy.upstream.host}` |
| `hosts.map`에 중복 키나 잘못된 줄이 있음 | Caddy의 `map` 핸들러는 **중복된 입력 키에서 치명적 오류를 냄**. 잘못된 줄 하나가 전체 구성을 멈출 수 있음 | 동기화 스크립트가 공백을 정규화하고, 형식이 잘못된 줄을 버립니다(잘못된 줄이 20%를 넘을 때만 전체를 거부). 먼저 나온 값을 남기고 중복을 제거하며, **BOM 없는** UTF-8로 씁니다(BOM이 있으면 첫 번째 맵 키가 깨짐). API도 소스에서 비어 있거나 공백이 포함된 도메인 행을 걸러냅니다 |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | 작업 등록이 **조용히 실패함**(범위를 벗어난 XML, 종료되지 않는 오류) | 반복을 `Interval = "PT5M"`이고 기간이 없는 `MSFT_TaskRepetitionPattern` CIM 인스턴스로 만들고, 실행 제한 4분(`ExecutionTimeLimit`)을 추가합니다(첫 SYSTEM 실행은 콜드 TLS/CRL 조회에서 멈출 수 있음) |

:::warning
관리자 API는 `localhost:2019`에만 바인딩됩니다. 이전 런타임 모드는 Membership API가 경로 구성을 밀어 넣을 수 있도록 이를 원격으로 노출했습니다. 정적 설계는 원격 푸시가 필요 없으며, 노출 범위를 줄이는 것은 의도된 설계입니다. 로컬에서 실행되는 동기화 스크립트의 `caddy reload`만이 관리자 API를 사용하는 유일한 지점입니다.
:::

:::info 레거시 런타임 푸시
API의 `CaddyHelper`(그리고 `/membership/domains/caddy` + `/caddy/init` 엔드포인트)는 이전 런타임 구성 모드로 돌아가기 위한 롤백 경로로 여전히 남아 있습니다. 정적 인스턴스가 몇 주 동안 안정적으로 동작한 뒤 삭제될 예정입니다. 그 이후에는 `authorize`와 `hostmap`만 연동 지점으로 남습니다.
:::

## 운영

- **로그**: `C:\caddy\`의 WinSW 롤링 로그(서비스 stdout/err. 역방향 프록시 오류는 `caddy-service.err.log`에 기록됨). 동기화 기록은 `C:\caddy\sync-hostmap.log`에 있습니다.
- **맵 강제 갱신**: `Start-ScheduledTask -TaskName CaddyHostmapSync`
- **구성 변경**: `C:\caddy\Caddyfile`을 수정한 뒤 `caddy validate` + `caddy reload`를 실행하세요(또는 `Restart-Service caddy`. 재시작은 설계상 안전합니다).
- **대량 도메인 삭제**: 동기화 스크립트의 축소 방지 장치가 의도적으로 작동합니다. 기존 `hosts.map`을 옆으로 옮겨 두고 작업을 다시 실행하면 의도한 대량 축소를 받아들입니다.
- **교회용 DNS 안내는 영원히 바뀌지 않습니다**: apex `A 3.23.251.61` 또는 `CNAME proxy.b1.church`.

## 관련 문서

- [웹사이트 라우팅 및 다중 사이트](../architecture/websites) -- 프록시된 요청이 B1App에서 교회와 사이트로 연결되는 방식
- [API 배포](./apis) -- `authorize`/`hostmap`을 제공하는 Membership API 배포
