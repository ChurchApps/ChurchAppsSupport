---
title: "헌금 보고서"
description: "B1 Admin의 헌금 요약 대시보드, 이탈 헌금자 보기, CSV 내보내기로 헌금 합계, 헌금자 이탈, 배치 단위 세부 정보를 확인하세요."
---

# 헌금 보고서

<div class="article-intro">

B1 Admin에는 교회의 헌금 데이터를 보고 분석하는 여러 방법이 있습니다. 헌금 **Summary** 페이지의 헌금 대시보드는 차트와 필터가 있는 시각적 개요를 제공하고, 보고서 섹션은 더 자세한 헌금 요약 보고서를 제공합니다. 이 도구들로 헌금 추이를 추적하고, 이사회 회의를 준비하거나, 기록을 대조할 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 헌금이 [배치에 기록](recording-donations.md)되었거나 [Stripe에서 가져왔는지](stripe-import.md) 확인하세요.
- [기금](funds.md)이 올바르게 설정되어 헌금이 제대로 분류되는지 확인하세요.

</div>

## 헌금 대시보드 {#giving-dashboard}

헌금 대시보드는 **Summary** 페이지의 **Dashboard** 화면입니다. 헌금 섹션을 열면 처음 보게 되는 페이지입니다.

1. [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(B1 Admin 왼쪽 상단의 검색창)를 열고 **Donations**를 펼친 뒤 **Summary**를 클릭합니다. **Summary** 페이지가 **Dashboard** 화면으로 열립니다. 오른쪽 상단의 **View** 전환 버튼으로 **Dashboard**와 **Lapsed Givers**를 전환할 수 있습니다.
2. 보고서 위의 **Weekly**, **Monthly**, **Quarterly** 전환 버튼으로 헌금을 묶는 단위를 고릅니다.
3. **Filter Report** 패널에서 **Start Date**와 **End Date**를 설정합니다(기본값은 지난 1년부터 어제까지). 선택 사항으로 **Fund**를 고른 뒤 **Run Report**를 클릭합니다. 페이지를 열면 기본값으로 보고서가 자동 실행됩니다.
4. 선택한 기간의 헌금 지표를 보여 주는 네 개의 **KPI 카드**가 나타납니다.
   - **Total Giving** -- 헌금된 총액입니다.
   - **Average Gift** -- 헌금의 평균 금액입니다.
   - **Unique Donors** -- 헌금한 서로 다른 사람의 수입니다.
   - **Total Donations** -- 개별 헌금의 총 건수입니다.
5. KPI 아래에는 주, 월, 또는 분기별 헌금을 기금별로 나눈 막대 그래프가 나타납니다.
6. **Download Options**를 클릭하고 **Summary**를 선택하면 기간과 기금별 합계를 담은 CSV를 내려받을 수 있습니다. 인쇄 아이콘을 클릭하면 보고서를 인쇄합니다. 교회 로고([웹사이트 > 외관](../website/appearance.md)에서 올린 **Light Background Logo**가 있는 경우)와 이름이 인쇄물 상단 가운데에 나타납니다. B1 Admin을 다크 모드로 사용하더라도 인쇄물은 어두운 글씨와 밝은 차트를 사용합니다.

선택한 기간의 헌금이 둘 이상의 통화로 이루어졌다면 KPI 합계는 교회의 통화로 환산되며, 카드 아래에 **Converted at current exchange rates**(현재 환율로 환산) 안내가 나타납니다. 자세한 내용은 [다중 통화 지원](./multi-currency.md#converted-totals)을 참조하세요.

:::info
대시보드는 집계된 헌금 데이터를 보여 줍니다. 개별 헌금자의 이름은 포함되지 않습니다. 헌금자 단위의 세부 정보가 필요하다면 [배치](batches.md) 페이지를 사용하세요.
:::

## 이탈 헌금자 {#lapsed-givers}

**View** 전환 버튼에서 **Lapsed Givers**를 선택하면, 한 기간에는 헌금했지만 그 이후로는 헌금하지 않은 사람들의 목록이 나타납니다. 기본적으로 지난 달력 연도와 올해 현재까지를 비교합니다. **Filter Report** 패널에서 **Previous Period Start**, **Previous Period End**, **Current Period Start**, **Current Period End**를 바꾸고 **Run Report**를 클릭하면 검색 범위를 넓히거나 좁힐 수 있습니다. 이 화면은 **View Donations** 권한이 필요합니다. 각 행에는 사람, 마지막 헌금 날짜, 이전 기간의 총액이 표시되며, **Download Options > Summary**를 선택하면 후속 우편물이나 전화 연락용 목록을 CSV로 내려받을 수 있습니다.

## 헌금자 단위 세부 정보 보기 {#viewing-donor-level-details}

누가, 얼마를, 어느 기금에 헌금했는지 자세히 보려면 다음과 같이 하세요.

1. **Donations > Batches**로 이동합니다.
2. **배치 이름**을 클릭해 엽니다.
3. 배치 세부 페이지에는 각 헌금이 방법(수표 번호나 카드 끝자리 포함), 헌금자 이름, 날짜, 메모, 금액과 함께 나열되며, 맨 아래에 합계가 나옵니다.
4. 개별 헌금 행의 **Edit**를 클릭하면 그 헌금의 기금을 포함한 전체 세부 정보가 열립니다.
5. 목록 위의 **Export**를 클릭하면 그 배치의 모든 헌금자와 헌금 정보를 담은 CSV를 내려받을 수 있습니다.

## 헌금 요약 보고서 {#donation-summary-report}

헌금 보고는 헌금 섹션에 직접 들어 있습니다. **Summary** 페이지가 곧 헌금 요약 보고서입니다.

1. 점프 메뉴에서 **Donations > Summary**를 선택합니다.
2. **Dashboard** 화면에서 **Filter Report** 패널의 **Start Date**와 **End Date**를 설정하고 **Run Report**를 클릭합니다.
3. **Download Options**를 클릭하고 **Summary**를 선택하면 보고서를 CSV 파일로 내보낼 수 있습니다.

## 데이터 내보내기 {#exporting-data}

여러 곳에서 헌금 데이터를 내보낼 수 있습니다.

- **Summary 페이지** -- 주, 월, 분기와 기금별 헌금 합계를 CSV로 내려받습니다.
- **배치 세부 페이지** -- 헌금자 세부 정보가 포함된 개별 헌금의 CSV를 내려받습니다.
- **기금 세부 페이지** -- 특정 기금의 헌금 내역을 내려받습니다.

:::tip
연말 보고에는 Summary 페이지 내보내기와 [헌금 명세서](giving-statements.md) 도구를 함께 사용하세요. 그러면 전체 추이와 개별 헌금자 명세서를 모두 얻을 수 있습니다.
:::

## 다음 단계 {#next-steps}

- 연말에 헌금자를 위한 [헌금 명세서](giving-statements.md)를 생성하세요.
- 헌금 세부 정보를 확인하려면 개별 [배치](batches.md)를 검토하세요.
- 범주별 헌금 내역은 [기금](funds.md) 세부 페이지에서 확인하세요.
