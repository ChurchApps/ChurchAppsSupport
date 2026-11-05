---
title: "가이드: 교회 웹사이트 출시"
---

# 교회 웹사이트 출시

<div class="article-intro">

B1.church에는 추가 비용 없이 사용할 수 있는 완전한 웹사이트 빌더가 포함되어 있습니다. 이 가이드는 처음부터 교회 웹사이트를 만드는 과정을 안내합니다. 홈 페이지를 설정하고, 디자인과 느낌을 구성하고, 주요 페이지를 추가하며, 필요하면 온라인 헌금과 행사 등록 양식을 연결합니다.

</div>

## 교육 동영상

<YouTube id="aA4UahZpmXg" title="B1에서 교회 웹사이트 시작하기" next="B1에서 페이지와 내비게이션 편집하기" nextUrl="/docs/b1-admin/website/page-editor" />

<div class="prereqs">
<h4>시작하기 전에</h4>

- 교회 로고를 준비하세요(배경이 투명한 PNG가 가장 좋습니다).
- 사이트에 사용할 브랜드 색상을 2~3개 고르세요.
- 사용자 지정 도메인(예: yourchurch.com)을 쓸 계획이라면 DNS 제공업체(GoDaddy, Cloudflare 등)에 접근할 수 있어야 합니다.
- 웹사이트에서 온라인 헌금을 받으려면 먼저 [온라인 헌금 설정](../donations/online-giving-setup.md)(Stripe)을 완료하세요.

</div>

## 단계 1: 초기 웹사이트 설정

먼저 홈 페이지와 기본 사이트 구조를 만듭니다.

[웹사이트 초기 설정](../website/initial-setup.md) 가이드를 따라 다음을 진행하세요.

1. B1 Admin에서 **Website**로 이동하세요.
2. 히어로 섹션, 환영 메시지, 주요 정보를 담은 홈 페이지를 만드세요.
3. 교회 이름과 슬로건을 추가하세요.

## 단계 2: 디자인 구성

사이트의 시각적 정체성(색상, 글꼴, 로고, 바닥글)을 설정합니다.

[Appearance](../website/appearance.md) 가이드를 따라 다음을 진행하세요.

1. 교회 로고를 업로드하세요.
2. 기본 색상과 강조 색상을 설정하세요.
3. 내비게이션 바와 바닥글을 구성하세요.
4. 변경 사항을 미리 보세요.

:::tip
색상 팔레트는 단순하게 유지하세요. 기본 색상 하나와 강조 색상 하나면 보통 충분합니다. 나머지는 웹사이트 빌더가 알아서 처리합니다.
:::

## 단계 3: 콘텐츠 페이지 추가

방문자에게 가장 필요한 페이지를 만드세요.

[페이지 관리하기](../website/managing-pages.md) 가이드를 따라 다음과 같은 페이지를 만드세요.

- **About** — 교회의 이야기, 신앙 고백, 지도자 소개
- **Sermons** — [설교 라이브러리](../sermons/managing-sermons.md)로 연결
- **Events** — 다가오는 행사와 등록 안내
- **Give** — 온라인 헌금 페이지([Stripe 설정](../donations/online-giving-setup.md)이 필요합니다)
- **Contact** — 위치, 예배 시간, 연락처 정보

## 단계 4: 도메인 연결

기본 B1 주소 대신 자신의 도메인 이름(예: yourchurch.com)을 사용하려면 다음과 같이 하세요.

1. B1 Admin에서 **Settings**로 이동하고 **Domains** 섹션을 여세요.
2. 사용자 지정 도메인을 입력하세요.
3. 도메인 제공업체에서 DNS 레코드를 B1을 가리키도록 수정하세요.

:::info
DNS 변경이 반영되기까지 최대 48시간이 걸릴 수 있습니다. 사용자 지정 도메인으로 사이트가 바로 열리지 않을 수 있습니다. 이 기간에도 기본 B1 주소는 계속 작동합니다.
:::

## 단계 5: 헌금 및 양식 추가

상호작용 요소로 사이트를 강화하세요.

- **Online Giving** — 교인이 웹사이트에서 바로 헌금할 수 있도록 헌금 섹션을 추가하세요. 먼저 [온라인 헌금 설정](../donations/online-giving-setup.md)에서 Stripe를 구성하세요.
- **Registration Forms** — 행사 신청, 방문자 카드, 봉사 신청을 위해 [Stand Alone 양식](../forms/creating-forms.md)을 넣으세요. 어느 페이지에든 양식 요소를 추가하는 방법은 [페이지 관리하기](../website/managing-pages.md)를 참고하세요.

## 완료했습니다!

교회 웹사이트가 공개되었습니다. 교인과 소셜 미디어에 URL을 공유하세요. 콘텐츠를 업데이트하고, 새 페이지를 추가하고, 디자인을 조정하는 일은 언제든지 B1 Admin 대시보드에서 할 수 있습니다.

## 관련 문서

- [웹사이트 초기 설정](../website/initial-setup.md) — 자세한 설정 안내
- [페이지 관리하기](../website/managing-pages.md) — 페이지 추가 및 편집
- [Appearance](../website/appearance.md) — 색상, 로고, 레이아웃
- [파일 관리하기](../website/files.md) — 이미지와 문서 업로드
- [온라인 헌금 설정](../donations/online-giving-setup.md) — Stripe 설정
- [양식 만들기](../forms/creating-forms.md) — 등록 및 설문 양식 만들기
