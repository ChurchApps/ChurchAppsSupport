---
title: "가이드: 교회 웹사이트 출시하기"
description: "B1 Admin에서 교회 웹사이트를 설정하세요. 홈페이지를 만들고, 색상과 로고를 맞추고, 주요 페이지를 추가하고, 사용자 지정 도메인을 연결하고, 헌금 양식을 추가합니다."
---

# 교회 웹사이트 출시하기

<div class="article-intro">

B1.church에는 추가 비용 없이 쓸 수 있는 완전한 웹사이트 빌더가 포함되어 있습니다. 이 가이드는 교회 웹사이트를 처음부터 만드는 과정을 안내합니다. 홈페이지를 설정하고, 외관을 구성하고, 주요 페이지를 추가하며, 선택적으로 온라인 헌금과 이벤트 등록 양식을 연결합니다.

</div>

## 교육 영상 {#training-video}

<YouTube id="aA4UahZpmXg" title="B1에서 교회 웹사이트 출시하기" next="B1에서 페이지와 내비게이션 편집하기" nextUrl="/docs/b1-admin/website/page-editor" />

<div class="prereqs">
<h4>시작하기 전에</h4>

- 교회 로고를 준비하세요(배경이 투명한 PNG가 가장 좋습니다).
- 사이트에 쓸 브랜드 색상을 2~3개 고르세요.
- 사용자 지정 도메인(예: yourchurch.com)을 쓴다면 DNS 제공업체(GoDaddy, Cloudflare 등)에 접근할 수 있어야 합니다.
- 사이트에서 온라인 헌금을 받고 싶다면 먼저 [온라인 헌금 설정](../donations/online-giving-setup.md)(Stripe)을 완료하세요.

</div>

## 1단계: 웹사이트 초기 설정 {#step-1-initial-website-setup}

홈페이지와 기본 사이트 구조를 만드는 것부터 시작하세요.

[웹사이트 초기 설정](../website/initial-setup.md) 가이드를 따라 다음을 하세요.

1. [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)에서 **Website > Pages**를 선택합니다.
2. **Add Page**를 클릭하고 **Blank**를 고른 뒤, **Page Title**에 "Home"을 입력하고 **Save**를 클릭합니다. **Page Settings**에서 **URL Path**를 `/`로 설정합니다.
3. **Edit Content**를 클릭하고 **Section**을 추가한 뒤, 히어로 영역, 환영 메시지, 교회 이름과 슬로건, 그 밖의 핵심 정보를 넣습니다.

:::tip
처음부터 시작하시나요? [사이트 템플릿](../website/managing-pages.md#starting-from-a-site-template)을 쓰면 홈, 소개, 연결, 헌금 등의 페이지가 내비게이션 링크와 함께 미리 만들어집니다. 자리 표시자 내용을 여러분의 내용으로 바꾸세요.
:::

## 2단계: 외관 구성하기 {#step-2-configure-appearance}

사이트의 시각적 정체성을 설정하세요. 색상, 글꼴, 로고, 바닥글을 포함합니다.

[외관](../website/appearance.md) 가이드를 따라 다음을 하세요.

1. 점프 메뉴에서 **Website > Appearance**를 선택합니다.
2. **Logo** 아래에서 **Light Background Logo**와 **Dark Background Logo**를 업로드합니다.
3. **Color Palette** 아래에서 브랜드 색상을 설정하고 **Save Palette**를 클릭한 뒤, **Fonts**를 고릅니다.
4. **Navigation**으로 내비게이션 바의 모양을 정하고, **Site Footer**로 모든 페이지에 나타나는 바닥글을 만듭니다.

:::tip
색상 팔레트는 단순하게 유지하세요. 주 색상 하나와 강조 색상 하나면 보통 충분합니다. 나머지는 웹사이트 빌더가 처리합니다.
:::

## 3단계: 콘텐츠 페이지 추가하기 {#step-3-add-content-pages}

방문자에게 가장 필요한 페이지를 만드세요.

[페이지 관리](../website/managing-pages.md) 가이드를 따라 다음과 같은 페이지를 만드세요.

- **소개(About)** — 교회의 이야기, 신앙 고백, 지도부
- **설교(Sermons)** — [설교 라이브러리](../sermons/managing-sermons.md)로 연결
- **행사(Events)** — 다가오는 행사와 등록
- **헌금(Give)** — 온라인 헌금 페이지([Stripe 설정](../donations/online-giving-setup.md) 필요)
- **연락처(Contact)** — 위치, 예배 시간, 연락처 정보

## 4단계: 도메인 연결하기 {#step-4-connect-your-domain}

기본 B1 주소 대신 자체 도메인 이름(예: yourchurch.com)을 쓰고 싶다면:

[사용자 지정 도메인](../settings/custom-domain.md) 가이드를 따라 다음을 하세요.

1. 도메인 제공업체에서 `www`에 대해 `proxy.b1.church`를 가리키는 **CNAME** 레코드를 추가합니다(또는 루트 도메인에 대해 `3.23.251.61`을 가리키는 **A** 레코드를 추가합니다).
2. 점프 메뉴에서 **Settings > Settings**를 선택하고 **Domains** 섹션의 **Edit**를 클릭한 뒤, 도메인을 입력하고 **Save**를 클릭합니다.

:::info
DNS를 먼저 설정하세요. B1은 도메인을 바로 저장하지만, DNS가 B1을 가리키기 전까지는 사이트를 불러오지 않고 SSL 인증서도 받지 못합니다. DNS 변경은 몇 분에서 몇 시간이 걸릴 수 있습니다. 그동안에도 기본 B1 주소는 계속 작동합니다.
:::

## 5단계: 헌금과 양식 추가하기 {#step-5-add-giving-and-forms}

대화형 요소로 사이트를 풍성하게 만드세요.

- **온라인 헌금** — **Donation** 요소를 추가하면 구성원이 웹사이트에서 바로 헌금할 수 있습니다. 먼저 Stripe를 설정하려면 [온라인 헌금 설정](../donations/online-giving-setup.md)을 참조하세요.
- **등록 양식** — 이벤트 신청, 방문자 카드, 봉사 신청을 위해 [Stand Alone 양식](../forms/creating-forms.md)을 **Form** 요소로 넣으세요. 어떤 페이지에든 요소를 추가하는 방법은 [페이지 편집기](../website/page-editor.md)를 참조하세요.

## 완료! {#youre-done}

교회 웹사이트가 공개되었습니다. 주소를 구성원과 소셜 미디어에 공유하세요. 콘텐츠 수정, 새 페이지 추가, 외관 조정은 B1 Admin의 **Website** 섹션에서 언제든지 할 수 있습니다.

## 관련 문서 {#related-articles}

- [웹사이트 초기 설정](../website/initial-setup.md) — 자세한 설정 안내
- [페이지 관리](../website/managing-pages.md) — 페이지 추가와 편집
- [외관](../website/appearance.md) — 색상, 로고, 레이아웃
- [페이지 편집기](../website/page-editor.md) — 섹션, 텍스트, 이미지, 양식, 헌금 추가
- [사용자 지정 도메인](../settings/custom-domain.md) — 자체 웹 주소 사용
- [파일 관리](../website/files.md) — 이미지와 문서 업로드
- [온라인 헌금 설정](../donations/online-giving-setup.md) — Stripe 설정
- [양식 만들기](../forms/creating-forms.md) — 등록 및 설문 양식 만들기
