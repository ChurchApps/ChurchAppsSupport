---
title: "가이드: 연말 헌금 보고서 생성하기"
description: "B1 Admin에서 한 해의 헌금 기록을 마무리하고, 기금의 세금 설정을 확인하고, 모든 헌금자를 위한 세금 공제 헌금 명세서를 생성하세요."
---

# 연말 헌금 보고서 생성하기

<div class="article-intro">

헌금 기록을 마무리하고, 기금 설정을 확인하고, 모든 헌금자를 위한 세금 공제 헌금 명세서를 만드는 연말 절차를 안내합니다. 보통 이전 해의 헌금 정리는 1월 초에 진행합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 재무 권한이 있는 B1 Admin 계정
- 한 해 동안 기록된 헌금 (Stripe를 통한 온라인 헌금 및/또는 수동 입력)
- 온라인 헌금을 받는 경우 Stripe 계정 접근 권한

</div>

## 1단계: 최종 Stripe 거래 가져오기 {#step-1-import-final-stripe-transactions}

연말의 모든 온라인 헌금이 시스템에 들어와 있는지 확인하세요.

[Stripe 가져오기](../donations/stripe-import.md) 가이드를 따라 진행하세요:

1. [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)에서 **Donations > Stripe Import**를 선택하세요(헌금 제공자가 Stripe인 경우에만 표시됩니다)
2. 연말을 포함하도록 **Start Date**와 **End Date**를 설정하세요(예: 12월 1일 ~ 12월 31일)
3. 먼저 **Preview**를 클릭하여 검토한 다음, **Import Missing**을 클릭하여 마무리하세요

:::warning
명세서를 만들기 전에 이 가져오기를 실행하세요. 가져오지 않은 거래는 헌금자 명세서에 나타나지 않습니다.
:::

## 2단계: 헌금 보고서 검토하기 {#step-2-review-donation-reports}

명세서를 만들기 전에 기록이 정확한지 확인하세요.

[헌금 보고서](../donations/donation-reports.md) 가이드를 따라 진행하세요:

1. 점프 메뉴에서 **Donations > Summary**를 선택하고 **Filter Report**의 **Start Date**와 **End Date**를 연간 전체로 설정한 다음 **Run Report**를 클릭하세요
2. 기금별 합계를 검토하고 은행 명세서와 대조하여 불일치가 없는지 확인하세요. **Download Options**를 클릭하고 **Summary**를 선택하면 CSV로 받을 수 있습니다
3. 필요하다면 **Donations > Batches**에서 개별 배치를 열어 헌금자별 세부 내역을 확인하세요

## 3단계: 기금의 세금 상태 확인하기 {#step-3-verify-fund-tax-status}

명세서가 정확하도록 각 기금의 세금 공제 설정이 올바른지 확인하세요.

[기금](../donations/funds.md) 가이드를 따라 진행하세요:

1. 점프 메뉴에서 **Donations > Funds**를 선택하고 각 기금의 **Tax Status**를 확인하세요
2. 기금에서 **Edit**를 클릭하여 **Tax Deductible** 설정을 변경하세요

:::info
세금 공제 대상으로 표시된 기금에 대한 헌금만 헌금 명세서에 나타납니다. 세금 공제 대상이어야 하는 기금이 그렇게 표시되어 있지 않다면, 명세서를 만들기 전에 수정하세요.
:::

## 4단계: 헌금 명세서 생성하기 {#step-4-generate-giving-statements}

헌금자를 위한 공식 헌금 명세서를 만드세요.

[헌금 명세서](../donations/giving-statements.md) 가이드를 따라 진행하세요:

1. 점프 메뉴에서 **Donations > Giving Statements**를 선택하세요
2. **Year**를 선택하고 요약 통계를 검토하세요. 캐나다, 호주 또는 뉴질랜드의 교회는 **Statement format**을 클릭하여 해당 국가의 공식 영수증 양식으로 전환할 수 있습니다
3. 다운로드 방법을 선택하세요:
   - **Download ZIP** — 헌금자마다 한 개씩 있는 개별 CSV 파일
   - **Print All** — 각 명세서가 새 페이지에 있고, 교회 로고가 있으면 상단에 표시되는 인쇄용 보기

:::tip
기록이 생생할 때 1월 초에 명세서를 만드세요. 그래야 발송 전에 문제를 발견할 시간이 충분합니다.
:::

## 5단계: 헌금자에게 전달하기 {#step-5-distribute-to-donors}

명세서를 헌금자의 손에 전달하세요.

1. 명세서를 인쇄하여 우편으로 보내거나, 개별 CSV를 헌금자에게 이메일로 보내세요
2. 성도는 [B1.church 또는 B1 App](../../b1-church/giving/donation-history.md)에서 자신의 헌금 내역을 보고 명세서를 인쇄할 수도 있습니다

## 완료! {#youre-done}

연말 헌금 보고서가 완성되었습니다. 헌금자는 세금 공제용 명세서를 받았고, 교회의 재무 기록은 해당 연도를 위해 마무리되었습니다.

## 관련 문서 {#related-articles}

- [Stripe 가져오기](../donations/stripe-import.md) — 온라인 거래 가져오기
- [헌금 보고서](../donations/donation-reports.md) — 헌금 추세 및 합계 보기
- [기금](../donations/funds.md) — 기금 및 세금 공제 설정 관리
- [헌금 명세서](../donations/giving-statements.md) — 연말 명세서 생성
- [헌금 기록](../donations/recording-donations.md) — 현금/수표 헌금 수동 입력
- [헌금 내역 (웹)](../../b1-church/giving/donation-history.md) — 성도의 셀프 서비스 보기
- [온라인 헌금 설정 가이드](./online-giving.md) — 초기 Stripe 및 헌금 설정
