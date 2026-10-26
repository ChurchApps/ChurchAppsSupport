---
title: "헌금 보고서"
---

# 헌금 보고서

<div class="article-intro">

B1 Admin은 교회의 헌금 데이터를 보고 분석하는 여러 방법을 제공합니다. 헌금 **Summary** 페이지의 헌금 대시보드는 차트와 필터가 있는 시각적 개요를 보여 주고, 보고서 영역에서는 더 자세한 헌금 요약 보고서를 볼 수 있습니다. 이 도구들로 헌금 추세를 추적하고, 이사회 회의를 준비하고, 기록을 대조할 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 헌금이 [배치에 기록되었거나](recording-donations.md) [Stripe에서 가져온](stripe-import.md) 상태인지 확인하세요.
- 헌금이 올바르게 분류되도록 [기금(fund)](funds.md)이 제대로 설정되어 있는지 확인하세요.

</div>

## 헌금 대시보드

헌금 대시보드는 **Donations** 영역을 열었을 때 처음 보게 되는 **Summary** 페이지의 **Dashboard** 화면입니다.

1. [Jump 메뉴](../introduction.md#getting-around-with-the-jump-menu)(B1 Admin 왼쪽 상단의 검색창)를 열고 **Donations**를 펼친 뒤 **Summary**를 클릭합니다. **Summary** 페이지는 **Dashboard** 화면으로 열립니다. 오른쪽 위의 **View** 전환 버튼으로 **Dashboard**와 **Lapsed Givers**를 바꿀 수 있습니다.
2. 보고서 위의 **Weekly**, **Monthly**, **Quarterly** 전환 버튼으로 헌금을 묶는 단위를 고릅니다.
3. **Filter Report** 패널에서 **Start Date**와 **End Date**를 설정합니다(기본값은 지난 1년부터 어제까지). 필요하면 **Fund**를 고른 뒤 **Run Report**를 클릭합니다. 페이지가 열리면 기본값으로 보고서가 자동으로 실행됩니다.
4. 선택한 기간의 헌금 지표를 보여 주는 네 개의 **KPI 카드**가 나타납니다.
   - **Total Giving**(총 헌금) -- 헌금된 총 금액입니다.
   - **Average Gift**(평균 헌금) -- 헌금의 평균 금액입니다.
   - **Unique Donors**(고유 헌금자) -- 헌금한 서로 다른 사람의 수입니다.
   - **Total Donations**(총 헌금 건수) -- 개별 헌금의 총 건수입니다.
5. KPI 아래에는 기금별로 나눈 주, 월, 분기별 헌금 막대 차트가 나타납니다.
6. **Download Options**를 클릭하고 **Summary**를 선택하면 기간과 기금별 합계를 CSV로 내려받을 수 있습니다. 또는 인쇄 아이콘을 클릭하여 보고서를 인쇄할 수 있습니다. [웹사이트 > 외관](../website/appearance.md)에서 **Light Background Logo**를 올려 두었다면 인쇄된 보고서 상단 가운데에 교회 로고와 이름이 나타납니다. 인쇄물은 B1 Admin을 다크 모드로 사용하더라도 어두운 글자와 밝은 차트를 사용합니다.

기간 내 헌금이 둘 이상의 통화로 이루어졌다면 KPI 합계는 교회 통화로 환산되며, 카드 아래에 **Converted at current exchange rates**(현재 환율로 환산) 안내가 나타납니다. 자세한 내용은 [다중 통화 지원](./multi-currency.md#converted-totals)을 참고하세요.

:::info
대시보드는 집계된 헌금 데이터를 보여 줍니다. 헌금자 개인의 이름은 포함하지 않습니다. 헌금자 단위의 세부 정보가 필요하면 [배치](batches.md) 페이지를 사용하세요.
:::

## 헌금 중단자(Lapsed Givers)

**View** 전환 버튼에서 **Lapsed Givers**를 선택하면 이전 기간에는 헌금했지만 그 이후로는 헌금하지 않은 사람들의 목록을 볼 수 있습니다. 기본값은 지난해와 올해 현재까지를 비교하는 것이며, 두 날짜 범위를 바꾸면 검색 범위를 넓히거나 좁힐 수 있습니다. 각 행에는 그 사람, 마지막 헌금 날짜, 이전 기간의 총 헌금액이 표시됩니다. **Download Options > Summary**를 누르면 이 목록을 CSV로 내려받아 후속 우편물이나 전화 연락 목록으로 쓸 수 있습니다.

## 헌금자 단위 세부 정보 보기

누가, 얼마를, 어느 기금에 헌금했는지 자세히 보려면 다음과 같이 합니다.

1. **Donations > Batches**로 이동합니다.
2. **배치 이름**을 클릭하여 엽니다.
3. 배치 상세 페이지에는 각 헌금의 방법(수표 번호나 카드 끝자리 포함), 헌금자 이름, 날짜, 메모, 금액이 나열되며 맨 아래에 합계가 표시됩니다.
4. 헌금 행의 **Edit**를 클릭하면 기금을 포함하여 해당 개별 헌금의 전체 세부 정보를 볼 수 있습니다.
5. 목록 위의 **Export**를 클릭하면 그 배치의 모든 헌금자 및 헌금 정보를 담은 CSV를 내려받을 수 있습니다.

## 헌금 요약 보고서

헌금 보고는 Donations 영역에 직접 들어 있습니다. Summary 페이지가 곧 헌금 요약 보고서입니다.

1. Jump 메뉴에서 **Donations > Summary**를 선택합니다.
2. **Dashboard** 화면에서 **Filter Report** 패널의 **Start Date**와 **End Date**를 설정하고 **Run Report**를 클릭합니다.
3. **Download Options**를 클릭하고 **Summary**를 선택하면 보고서를 CSV 파일로 내려받을 수 있습니다.

## 데이터 내보내기

여러 곳에서 헌금 데이터를 내보낼 수 있습니다.

- **Summary 페이지** -- 주, 월, 분기 및 기금별 헌금 합계를 CSV로 내려받습니다.
- **배치 상세 페이지** -- 헌금자 정보가 포함된 개별 헌금을 CSV로 내려받습니다.
- **기금 상세 페이지** -- 특정 기금의 헌금 내역을 내려받습니다.

:::tip
연말 보고를 위해서는 Summary 페이지 내보내기와 [헌금 명세서(Giving Statements)](giving-statements.md) 도구를 함께 사용하세요. 전체 추세와 개별 헌금자의 명세서를 모두 얻을 수 있습니다.
:::

## 다음 단계

- 연말에 헌금자를 위한 [헌금 명세서(Giving Statements)](giving-statements.md)를 생성하세요.
- 헌금 세부 정보를 확인하려면 개별 [배치](batches.md)를 검토하세요.
- 분류별 헌금 내역은 [기금](funds.md) 상세 페이지에서 확인하세요.
