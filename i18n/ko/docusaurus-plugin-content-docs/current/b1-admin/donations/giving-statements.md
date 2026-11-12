---
title: "헌금 명세서"
description: "B1 Admin에서 모든 헌금자를 위한 연말 헌금 명세서를 만든 뒤, 세금 공제 합계가 포함된 CSV 파일로 내려받거나 우편 발송을 위해 인쇄하세요."
---

# 헌금 명세서

<div class="article-intro">

매년 말에 헌금자들은 기록을 위해 세금 공제 대상 헌금 요약이 필요합니다. B1 Admin에서는 모든 헌금자의 명세서를 한 번에 쉽게 만들 수 있어, 수작업에 드는 몇 시간을 아낄 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- [기금](funds.md)이 **Tax Deductible**(세금 공제)로 올바르게 표시되어 있는지 확인하세요. 세금 공제 기금에 대한 헌금만 명세서에 나타납니다.
- 모든 헌금이 [기록되었고](recording-donations.md), 온라인 거래가 [Stripe에서 가져와졌는지](stripe-import.md) 확인하세요.

</div>

## 헌금 명세서 열기 {#accessing-giving-statements}

1. **B1 Admin**에서 [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 상단의 검색창)를 열고 **Donations**를 펼칩니다.
2. **Giving Statements**를 클릭합니다. **Batch Giving Statements** 페이지가 열립니다.

## 명세서 만들기 {#generating-statements}

1. **Select Year** 패널에서 드롭다운으로 **Year**를 고릅니다. 올해 또는 지난 다섯 해 중 하나를 고를 수 있습니다.
2. 페이지는 그 해(1월 1일부터 12월 31일까지)에 날짜가 있는 헌금만 불러오므로, 교회의 헌금 이력이 여러 해라도 빠르게 열립니다. 다른 해를 고르면 요약이 그 해의 헌금으로 갱신됩니다. 연도 아래의 **Summary** 패널에는 그 해의 통계가 나오며, 명세서에 포함되는 것과 같은 헌금을 셉니다(세금 비공제 기금에만 한 헌금은 제외합니다).
   - **Total Donors** -- 헌금한 사람의 수입니다.
   - **Total Donations** -- 개별 헌금 기록의 수입니다.
   - **Total Amount** -- 그들의 헌금 합계입니다.

## 명세서 내려받기 {#downloading-statements}

**Download Options** 패널은 헌금자에게 명세서를 전달하는 두 가지 방법을 제공합니다.

### CSV 파일로 내려받기 {#download-as-csv-files}

**Individual CSV Files** 아래의 **Download ZIP**(버튼에 파일 수가 표시됩니다)을 클릭하면 헌금자마다 개별 CSV 파일이 들어 있는 ZIP 파일을 내려받습니다. 명세서를 개별적으로 이메일로 보내거나 다른 시스템으로 가져오려 할 때 유용합니다.

### 명세서 전체 인쇄하기 {#print-all-statements}

**Printable Statements** 아래의 **Print All**(버튼에 명세서 수가 표시됩니다)을 클릭하면 선택한 해의 모든 헌금자 명세서를 인쇄용 화면으로 브라우저에서 엽니다. 여기에서 브라우저의 인쇄 기능으로 프린터에 보내면 됩니다. 각 명세서는 새 페이지에서 시작하므로 접어서 바로 우편으로 보낼 수 있으며, 명세서는 헌금자의 성, 이름 순으로 정렬됩니다.

[웹사이트 > 외관](../website/appearance.md)에서 **Light Background Logo**를 올렸다면, 로고가 각 명세서 제목 위 가운데에 인쇄됩니다. 이는 **Print All**, 헌금자 기록에서 한 명의 명세서를 인쇄할 때, 그리고 성도가 B1.church의 **Giving** 페이지에서 직접 인쇄하는 명세서에도 적용됩니다.

:::tip
기록이 생생할 때 1월 초에 명세서를 실행하세요. 명세서를 만들기 전에 기금이 세금 공제 대상으로 올바르게 표시되었는지 다시 확인하세요. 세금 공제 기금에 대한 헌금만 포함됩니다.
:::

:::info
헌금 명세서에는 **Tax Deductible** 설정이 켜진 기금에 배정된 헌금만 포함됩니다. 기금이 세금 공제 대상으로 표시되지 않았다면 그 기금의 헌금은 명세서에 나타나지 않습니다. 이 설정은 [기금](funds.md) 페이지에서 관리할 수 있습니다.
:::

## 캐나다, 호주, 뉴질랜드의 영수증 형식 {#receipt-formats-for-canada-australia-and-new-zealand}

미국 밖의 교회는 명세서를 해당 국가의 공식 영수증 양식으로 바꿀 수 있습니다. 헌금 명세서 페이지 상단의 **Statement format**을 클릭하거나(또는 **Settings**로 가서 **Giving** 섹션을 엽니다), **Statement Format**(기본값은 **Standard**)을 **Canada - CRA official receipt**, **Australia**, 또는 **New Zealand**로 설정한 뒤, 나타나는 항목을 입력합니다. 등록 번호(**CRA Registration Number**, **ABN**, 또는 **NZ Charity Registration Number**), **Organization Address**, **Authorized Signatory Name**, 캐나다의 경우 **City of Issue**입니다. **Save**를 클릭하세요.

그러면 명세서에는 세무 당국이 요구하는 문구가 담깁니다(캐나다의 경우 CRA 참조 번호와 함께 "Official Receipt for Income Tax Purposes"). 또한 `YEAR-DONORID` 형식의 영수증 번호, 세금 공제 기금에서만 집계된 공제 가능 금액, 세금 비공제 기금 헌금을 위한 별도 줄이 포함됩니다. 헌금자가 B1.church에서 직접 명세서를 인쇄하면 같은 영수증 블록이 표시됩니다.

## 성도가 B1.church에서 보는 내용 {#what-members-see-in-b1church}

같은 **Giving** 설정 섹션이 B1.church에서 성도가 자기 헌금 페이지에서 보는 내용도 제어합니다.

- **Member Giving History**는 성도가 볼 수 있는 연도를 정합니다. 기본값은 **All years**입니다. **Through 2025**(또는 다른 연도)를 고르면 그 연도까지만 볼 수 있으므로, 여러분이 허용하기 전까지 성도는 이후 연도를 보거나 인쇄할 수 없습니다. 정정과 환불을 마무리하는 동안 올해 내역을 보류하고 싶을 때 이 설정을 사용하세요. **Hidden**을 고르면 헌금 이력, 연간 합계, 명세서 인쇄 기능이 모두 제거됩니다. 성도는 여전히 헌금할 수 있습니다.
- **Giving Note**는 성도의 헌금 페이지와 헌금 이력에 표시되는 짧은 메시지이며, 여기에서 인쇄하는 명세서를 포함한 모든 헌금 명세서 하단에 인쇄됩니다. 환불 정책 같은 내용을 넣는 데 사용하세요.

이 설정은 성도가 보는 내용만 바꿉니다. 여러분은 이 페이지에서 여전히 어느 연도든 인쇄할 수 있습니다.

## 다음 단계 {#next-steps}

명세서를 만들기 전에 헌금 세부 정보를 검토해야 한다면 [헌금 보고서](donation-reports.md) 페이지를 확인하거나 개별 [배치](batches.md)를 살펴보세요.
