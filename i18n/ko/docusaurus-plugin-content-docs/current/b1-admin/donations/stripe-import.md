---
title: "Stripe 가져오기"
description: "미리 보기 우선 가져오기로 Stripe 헌금을 B1 Admin에 가져오세요. 확정하기 전에 각 결제를 새 항목, 이미 가져온 항목, 건너뜀으로 표시합니다."
---

# Stripe 가져오기

<div class="article-intro">

Stripe로 온라인 헌금을 받는다면, Stripe 가져오기 도구로 그 거래를 B1 Admin으로 가져와 모든 헌금 데이터를 한곳에 둘 수 있습니다. 자동으로 동기화되지 않은 거래를 찾아내는 데 특히 유용합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- [온라인 헌금 설정](online-giving-setup.md)을 완료하여 Stripe 계정을 B1 Admin에 연결하세요. **Stripe Import** 메뉴 항목과 배치 페이지의 버튼은 교회의 헌금 게이트웨이가 Stripe일 때만, 그리고 헌금을 편집할 수 있는 사람에게만 나타납니다.
- 가져오려는 기간의 헌금이 Stripe 대시보드에 있는지 확인하세요.

</div>

## 작동 방식 {#how-it-works}

가져오기는 두 단계로 진행됩니다. 먼저 가져올 내용을 미리 보고, 그다음 가져오기를 확정합니다. 이 시험 실행 방식은 데이터가 생성되기 전에 모든 내용을 검토할 수 있게 합니다.

## 거래 가져오기 {#importing-transactions}

1. **B1 Admin**에서 **Donations > Stripe Import**로 이동합니다. (**Batches** 페이지 상단의 **Import missing Stripe transactions**를 클릭해도 됩니다.)
2. **Import Stripe Transactions** 페이지가 열립니다.
3. **Select Date Range**에서 가져올 거래의 **Start Date**와 **End Date**를 설정합니다. 범위는 올해 1월 1일부터 오늘까지가 기본입니다.
4. **Preview**를 클릭하여 시험 실행 확인을 합니다. 미리 보기에서 새 거래가 발견되기 전까지 **Import Missing**은 비활성화되어 있으며, 두 날짜 중 하나를 바꾸면 미리 보기가 지워지므로 새 범위를 먼저 미리 봐야 합니다.

## 미리 보기 검토하기 {#reviewing-the-preview}

미리 보기에는 각 Stripe 이벤트가 **Event ID**, **Type**, **Amount**, **Date**, **Status**와 함께 나열됩니다.

- **New** -- 아직 가져오지 않은 거래이며, 계속 진행하면 포함됩니다.
- **Already Imported** -- 이 거래는 이미 B1 Admin에 있으므로 건너뜁니다.
- **Skipped** -- 다른 이유(예: 환불 또는 실패한 청구)로 제외된 거래입니다.

맨 위의 요약에는 이벤트의 **Total** 건수와 **New**, **Already Imported**, **Skipped** 건수가 표시됩니다. 읽을 수 없는 이벤트가 있으면 **Errors** 건수가 나타나고, 그 이벤트의 행 **Notes** 열에 메시지가 표시됩니다.

:::info
미리 보기 단계에서는 어떤 기록도 만들지 않습니다. 확정하기 전에 무엇이 일어날지 확인할 수 있도록 읽기 전용으로 검사하는 것입니다.
:::

## 가져오기 완료하기 {#completing-the-import}

1. 미리 보기 결과와 요약 합계를 검토합니다.
2. **Import Missing**을 클릭하여 **New**로 표시된 모든 거래를 가져옵니다.
3. 가져오기가 끝나면 목록은 **Import Results**가 됩니다. 추가된 각 거래에는 **Imported**가 표시되며, 요약에 **Imported** 건수가 추가됩니다.

## Stripe 가져오기 팁 {#tips-for-using-stripe-import}

- 기록을 최신으로 유지하려면 정기적으로(매주 또는 매월) 가져오세요.
- 거래가 **Already Imported**로 표시되면 B1 Admin에 이미 일치하는 기록이 있다는 뜻이므로 조치가 필요 없습니다.
- 특정 거래를 찾고 있다면 날짜 범위 필터로 특정 기간에 집중하세요.

:::tip
가져온 뒤에는 [배치](batches.md) 페이지를 방문하여 가져온 헌금이 올바르게 나타나는지, 그리고 합계가 Stripe 대시보드에서 보는 것과 일치하는지 확인하세요.
:::

## 다음 단계 {#next-steps}

- [헌금 보고서](donation-reports.md)에서 가져온 거래를 다른 헌금 데이터와 함께 확인하세요.
- 가져온 헌금이 올바른 [기금](funds.md)에 배정되어 있어야 정확한 [헌금 명세서](giving-statements.md)가 나옵니다.
