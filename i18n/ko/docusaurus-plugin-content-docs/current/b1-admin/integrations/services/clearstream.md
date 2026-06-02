---
title: "Clearstream"
---

# Clearstream

<div class="article-intro">

모든 B1 이벤트 — 새 사람, 새 선물, 양식 제출, 캘린더 업데이트 — 에서 [Clearstream](https://clearstream.io) 텍스트 메시지를 트리거하고 회신을 B1 기록으로 다시 끌어옵니다. Clearstream의 Zapier 앱은 양방향을 노출하므로 전체 연결은 맞춤 코드가 아닌 레시피입니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 최소 하나의 목록 및 SMS 허용량이 있는 [Clearstream](https://clearstream.io) 계정
- [Zapier](https://zapier.com) 계정
- **설정 편집** 권한이 있는 B1Admin 사용자

</div>

## 연결할 수 있는 것

| 방향 | 트리거 | 작업 |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: 구독자 생성/업데이트 + 번호로 텍스트 전송 |
| B1 → Clearstream | B1 `donation.created` | Clearstream: 목록에 텍스트 전송(예: 재무 팀에 알림) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: 라우팅 목록에 텍스트 전송(예: 기도 요청 팀) |
| Clearstream → B1 | 새로운 수신 텍스트 | B1: 사람 생성; 그들이 텍스트한 키워드로 태그 |

Clearstream의 Zapier 작업: *번호로 텍스트 전송*, *목록에 텍스트 전송*, *구독자 생성/업데이트*, *자동화 워크플로우에 구독자 추가*, *구독자에게 태그 추가*, *목록에서 구독자 제거*.

## 설정

### 1. B1 API 키 발급

**설정 → 개발자 → API 키 → 새 API 키**:

- `settings:write` — B1이 트리거 웹훅을 등록하는 데 필요
- `people:read` — 이벤트에서 사람을 찾아볼 때(`personId` → 이름/전화/이메일)
- (선택 사항) `people:write` — Clearstream 회신이 B1 연락처를 생성해야 하는 경우

### 2. "새 선물에 텍스트" Zap 빌드

1. **트리거** — B1.church: 새로운 기부
2. **작업** — B1.church: 사람 찾기(기부의 `personId`)
3. **작업** — Clearstream: 번호로 텍스트 전송. 2단계에서 사람의 전화를 수신자로 사용하고, 메시지를 작성합니다(`"선물해주셔서 감사합니다, {first}! …"`).

Zap을 켭니다. B1은 기부 웹훅을 활성화 시 등록합니다. **설정 → 개발자 → 웹훅**에서 `Zapier — donation.created`가 나타나는 것을 볼 수 있습니다.

### 3. (선택 사항) 회신을 B1 기록으로 다시 끌어오기

1. **트리거** — Clearstream: 새로운 수신 텍스트
2. **작업** — Zapier로 필터 — 예: 텍스트 본문이 `PRAY`로 시작하는 경우에만 계속
3. **작업** — B1.church: 사람 찾기(전화로)
4. **작업** — 필터 / 경로 — 발견되지 않으면 생성하기; 어느 쪽이든 텍스트 본문을 어딘가에 파일하기(Slack, Google 시트 또는 Zapier 웹훅을 통한 B1 양식 제출).

## 일반적인 레시피

### 자원봉사자 팀 페이징

- **트리거** — B1.church: 새로운 양식 제출(기도 요청 양식 id로 필터링)
- **작업** — Clearstream: 목록에 텍스트 전송(목록은 대기 중인 목사 팀). 본문을 `새로운 기도 요청: {data.questions.0.answer}`로 작성합니다.

### 초방문자 팔로우업 시퀀스

- **트리거** — B1.church: 새 사람(B1 사람 태그 "초방문자"로 필터링)
- **작업** — Clearstream: 자동화 워크플로우에 구독자 추가. 워크플로우 id를 사전 구축된 7일 텍스트 드립에 매핑합니다.

### 키워드 기반 그룹 조인

- **트리거** — Clearstream: 새로운 수신 텍스트(키워드 `MENS`로 필터)
- **작업** — B1.church: 사람 찾기(전화로); 발견 안 됨에 분기 → 사람 생성
- **작업** — B1.church: 남성 사역 그룹에 그룹 멤버 추가

## 제한 및 주의사항

- **Clearstream은 SMS를 메시지별로 측정합니다.** 모든 텍스트 전송 작업은 길이 및 수신자 수에 따라 하나 이상의 크레딧을 소비합니다 — 계획의 허용량을 확인하세요.
- **전화는 E.164 형식이어야 합니다**(예: `+15555550199`) — *번호로 텍스트 전송*의 경우. B1의 사람 레코드는 입력된 내용을 저장합니다. 형식을 보장할 수 없으면 *Zapier 형식화 — 숫자 → 전화 번호 형식* 단계를 사용합니다.
- **B1 측에서 헤더가 필요하지 않습니다** — Clearstream의 인증은 완전히 Zapier 연결 내에 있습니다.

## 문제 해결

- **트리거가 실행되지 않음** — `설정 → 개발자 → 웹훅`은 Zap이 켜진 후 `Zapier — <event>` 행을 표시해야 합니다. 표시되지 않으면 B1 API 키에 `settings:write`가 없습니다. 다시 발급하고 다시 연결하세요.
- **Clearstream이 "잘못된 전화 번호" 반환** — 수신자 필드가 E.164 형식이 아닙니다. 전화 번호 형식 단계를 추가합니다.
- **목록에 텍스트 전송이 `403`으로 실패함** — Clearstream API 사용자가 해당 목록에 대한 권한이 없거나 목록 id가 잘못되었습니다. 목록 ID는 Clearstream 목록 세부 정보 페이지에 표시됩니다.

## 참고도 보기

- [Text In Church](./text-in-church) — 대체 SMS 플랫폼, 유사한 Zapier 형태
- [Mobile Message](./mobile-message) — US 외부의 교회의 경우
- [Zapier(개요)](../zapier) — 모든 Zapier 레시피의 B1 측
- [Clearstream API 문서](https://api-docs.clearstream.io/) — Zapier 앱을 넘어서는 맞춤 통합의 경우
