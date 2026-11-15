---
title: "가이드: 온라인 헌금 설정하기"
description: "B1 Admin에서 헌금 기금을 만들고, Stripe를 연결하고, 성도를 위한 B1.church 웹사이트에 헌금 페이지를 추가하여 온라인 헌금을 설정하세요."
---

# 온라인 헌금 설정하기

<div class="article-intro">

교회에서 온라인 헌금을 받는 데 필요한 모든 과정을 안내합니다. 헌금 기금 만들기, 결제 처리를 위한 Stripe 연결, 헌금 페이지를 성도와 공유하기까지 다룹니다. 가이드를 마치면 구성원이 웹사이트와 모바일 앱에서 온라인으로 헌금할 수 있게 됩니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 관리자 권한이 있는 B1 Admin 계정 — [역할 및 권한](../people/roles-permissions.md)을 참조하세요.
- Stripe 계정(필요하면 [stripe.com](https://stripe.com)에서 무료로 만드세요).

</div>

## 1단계: 헌금 기금 만들기 {#step-1-create-donation-funds}

기금은 헌금자가 헌금할 수 있는 범주입니다. 헌금을 받으려면 기금이 최소 하나는 있어야 합니다.

[기금](../donations/funds.md) 가이드를 따라 헌금 범주를 설정하세요.

1. [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)에서 **Donations > Funds**를 선택하고 **Add Fund**를 클릭합니다.
2. 가장 흔한 기금을 만듭니다(예: "General Fund", "Building Fund", "Missions").
3. 연말 헌금 명세서에 들어가야 할 헌금이 있는 기금에는 **Tax Deductible**을 체크하고, 헌금자가 온라인에서 고를 수 있어야 하는 기금에는 **Visible to Donors**를 체크한 상태로 둡니다.

:::tip
기금은 언제든지 더 추가할 수 있습니다. 가장 흔한 헌금 범주부터 시작하세요.
:::

## 2단계: Stripe 연결하기 {#step-2-connect-stripe}

결제 처리는 모두 Stripe가 맡습니다. Stripe 계정을 B1 Admin에 연결하면 헌금이 은행 계좌로 들어갑니다.

[온라인 헌금 설정](../donations/online-giving-setup.md) 가이드를 따라 Stripe를 연결하세요.

1. Stripe 대시보드에 로그인하고 **Developers > API Keys**로 가서 Publishable Key와 Secret Key를 찾습니다.
2. B1 Admin에서 **Settings**로 이동하고 **Giving** 섹션의 **Edit**를 클릭한 뒤, **Provider**를 **Stripe**로 설정합니다.
3. Publishable Key를 **Public Key**에, Secret Key를 **Secret Key**에 붙여 넣고, **Currency**를 확인한 뒤 **Save**를 클릭합니다.

B1은 아프리카의 교회를 위해 **Kingdom Funding**과 **Paystack**도 헌금 제공업체로 지원합니다. [온라인 헌금 설정](../donations/online-giving-setup.md)을 참조하세요.

:::warning
Stripe는 Secret Key를 한 번만 보여 줍니다. Stripe 대시보드를 떠나기 전에 복사하여 저장하세요. 잃어버리면 새로 만들어야 합니다.
:::

## 3단계: 웹사이트에 헌금 페이지 추가하기 {#step-3-add-a-giving-page-to-your-website}

헌금을 쉽게 할 수 있도록 B1 웹사이트에 헌금 페이지를 추가하세요.

[온라인 헌금 설정](../donations/online-giving-setup.md)과 [페이지 관리](../website/managing-pages.md) 가이드를 따라 다음을 하세요.

1. B1.church 사이트에 **Donation** 탭을 추가하거나(또는 웹사이트 빌더의 페이지에 **Donation** 요소를 추가합니다).
2. 헌금 주소는 `https://yoursubdomain.b1.church/donate`입니다.
3. 구성원은 로그인하지 않고도 헌금할 수 있고(공개 페이지), 저장된 결제 수단과 헌금 이력을 쓰려면 로그인할 수 있습니다.
4. 헌금자를 특정 기금으로 바로 안내하려면 **Donations > Funds**에서 그 기금의 **Giving Link**를 클릭하여, 기금과 금액이 미리 설정된 링크를 복사하거나(또는 QR 코드를 내려받습니다).

## 4단계: 테스트 헌금 해보기 {#step-4-make-a-test-donation}

구성원에게 알리기 전에 모든 것이 작동하는지 확인하세요.

1. 소액 테스트 헌금을 해서 전체 흐름이 작동하는지 확인합니다.
2. 헌금이 B1 Admin의 **Donations > Batches**에 나타나는지 확인합니다.

:::tip
실제 결제 없이 확인하려면 먼저 Stripe 테스트 키를 저장한 뒤, 교회 전체에 알리기 전에 **Settings > Giving**에서 실제 키로 바꾸세요.
:::

## 5단계: 교회 구성원에게 알리기 {#step-5-announce-to-your-congregation}

구성원이 온라인으로 헌금할 수 있다는 것을 알리세요.

1. 헌금 주소를 웹사이트, 이메일 소식지, 주보, 소셜 미디어에 공유합니다.
2. 구성원은 [B1 앱](../../b1-church/giving/index.md)을 통해서도 헌금할 수 있습니다. 헌금 기능은 앱에 내장되어 있습니다.

:::info
로그인한 구성원은 결제 수단을 저장하고, 정기 헌금을 설정하고, 헌금 이력을 볼 수 있습니다. 익명 헌금도 가능하며, 로그인이 필요 없습니다.
:::

## 6단계: 지속적인 관리 {#step-6-ongoing-management}

연중 헌금 기록을 최신으로 유지하고 보고서를 만드세요.

1. 온라인 헌금은 자동으로 기록됩니다. 동기화되지 않은 Stripe 거래가 있다면 [Stripe 가져오기](../donations/stripe-import.md)를 사용하세요. **Preview**를 클릭하여 빠진 항목을 본 뒤 **Import Missing**을 클릭합니다.
2. **Donations > Summary**에서 [헌금 보고서](../donations/donation-reports.md)를 확인하여 헌금 추이와 기금별 합계를 추적하세요.
3. 카드가 거절된 정기 헌금은 **Donations > Failed Gifts**에서 확인하고, 헌금자가 결제 수단을 업데이트하면 **Retry**를 클릭하세요.
4. 헌금자의 세금 기록을 위해 [연말 헌금 명세서를 생성](../donations/giving-statements.md)하세요.

:::tip
매달 마감하기 전에 Stripe 가져오기 미리 보기를 실행하여 기록이 Stripe와 일치하도록 하세요. 연말 절차 전체는 [연말 보고서 가이드](./year-end-reports.md)를 참조하세요.
:::

## 완료! {#youre-done}

이제 교회가 온라인 헌금을 받고 있습니다. 구성원은 웹사이트, B1 앱, 또는 웹 브라우저가 있는 어떤 기기에서든 헌금할 수 있습니다. 모든 헌금은 B1 Admin에 자동으로 기록됩니다.

## 관련 문서 {#related-articles}

- [기금](../donations/funds.md) — 헌금 범주 만들기와 관리
- [배치](../donations/batches.md) — 헌금을 그룹으로 정리
- [헌금 기록하기](../donations/recording-donations.md) — 현금과 수표 헌금을 수동으로 입력
- [Stripe 가져오기](../donations/stripe-import.md) — 온라인 거래를 B1 Admin으로 가져오기
- [헌금 보고서](../donations/donation-reports.md) — 헌금 추이와 합계 보기
- [헌금 명세서](../donations/giving-statements.md) — 연말 세금 명세서 생성
- [헌금하기](../../b1-church/giving/making-donations.md) — B1.church와 B1 앱에서 구성원이 경험하는 헌금 과정
