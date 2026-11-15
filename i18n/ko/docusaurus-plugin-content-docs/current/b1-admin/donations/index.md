---
title: "헌금"
description: "배치, 기금, 캠페인부터 연말 명세서와 온라인 헌금까지, B1 Admin에서 교회 헌금을 기록하고 정리하고 보고하세요."
---

# 헌금

<div class="article-intro">

B1 Admin의 헌금 섹션에는 교회의 헌금을 관리하는 데 필요한 모든 것이 있습니다. 주간 헌금 기록부터 연말 세금 명세서 생성까지, 모든 헌금 도구가 한곳에 정리되어 있어 교회의 재정을 놓치지 않고 파악할 수 있습니다.

</div>

## 하위 섹션 {#sub-sections}

헌금 섹션에는 다음 페이지가 있습니다.

### 요약 {#summary}

**Summary** 페이지는 모든 헌금 활동을 시각적으로 보여 줍니다. 차트와 필터가 있는 보고서를 통해 교회 전체의 헌금 추이를 빠르게 볼 수 있습니다. 요약 및 보고 도구 사용법은 [헌금 보고서](donation-reports.md)를 참조하세요.

### 배치 {#batches}

**[배치](batches.md)** 는 헌금을 묶는 기능입니다. 예를 들어 주일 헌금에서 모은 모든 수표와 현금을 한 배치로 묶을 수 있습니다. 각 배치는 헌금 건수와 합계를 추적하여 대사를 쉽게 해 줍니다. 배치 집계가 끝나면 **Edit Donations** 권한이 있는 사람이 배치를 마감하여, 집계 봉사자가 더 이상 바꾸지 못하게 할 수 있습니다. **Enter Donations** 권한이 있는 봉사자는 헌금 섹션의 나머지를 보지 않고도 열린 배치에 헌금을 추가할 수 있습니다.

### 기금 {#funds}

**[기금](funds.md)** 은 헌금을 목적별로 분류합니다. 일반 기금, 건축 기금, 선교 등이 흔한 예입니다. 각 기금을 세금 공제 대상으로 표시하거나 표시하지 않을 수 있습니다.

### 캠페인 {#campaigns}

**[캠페인](campaigns.md)** 은 목표를 향한 모금을 추적합니다. 성도의 약정을 캠페인 기금으로 들어온 실제 헌금과 함께 보여 줍니다.

### 헌금 명세서 {#giving-statements}

**[헌금 명세서](giving-statements.md)** 페이지는 헌금자를 위한 연말 헌금 명세서를 만듭니다. 개별 CSV 파일을 내려받거나 모든 명세서를 한 번에 인쇄할 수 있습니다.

### 실패한 헌금 {#failed-gifts}

**실패한 헌금(Failed Gifts**)에는 결제 게이트웨이가 청구하지 못한 정기 온라인 헌금이 헌금자, 금액, 날짜, 게이트웨이 메시지와 함께 나열되며, **Retry** 버튼이 있습니다. [정기 헌금 실패 처리](online-giving-setup.md#failed-recurring-gifts)를 참조하세요.

### Stripe 가져오기 {#stripe-import}

Stripe로 온라인 헌금을 받는다면 **[Stripe 가져오기](stripe-import.md)** 도구로 그 거래를 B1 Admin으로 가져와 모든 데이터를 한 시스템에 둘 수 있습니다.

## 온라인 헌금 {#online-giving}

B1 Admin은 온라인 헌금을 받기 위해 **Stripe**, **Kingdom Funding**, **Paystack**과 연동됩니다. 설정이 끝나면 성도는 B1.church 사이트를 통해 헌금할 수 있으며, 그 헌금은 자동으로 교회의 기록에 나타납니다. 시작하려면 [온라인 헌금 설정](online-giving-setup.md)을 참조하세요.

:::tip
B1 Admin의 헌금이 처음이라면 [기금을 먼저 설정](funds.md)한 뒤, [첫 배치를 만들고](batches.md) 그 안에 [헌금을 기록](recording-donations.md)하세요.
:::

## 다음 단계 {#next-steps}

- [헌금 기록하기](recording-donations.md) -- 배치에 헌금 입력
- [헌금 배치](batches.md) -- 헌금을 그룹으로 정리
- [기금 관리](funds.md) -- 헌금 범주 설정 및 관리
- [헌금 명세서](giving-statements.md) -- 헌금자를 위한 세금 명세서 생성
- [온라인 헌금 설정](online-giving-setup.md) -- Stripe, Kingdom Funding, Paystack 연결
- [Stripe 가져오기](stripe-import.md) -- 온라인 거래 가져오기
- [헌금 보고서](donation-reports.md) -- 헌금 요약 보기 및 필터링
