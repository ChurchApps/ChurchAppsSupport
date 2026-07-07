---
title: "Plans Overview"
---

# Plans Overview

<div class="article-intro">

Plans Overview는 한 번에 여러 예배 날짜에 걸친 모든 자원봉사자 배정을 한눈에 볼 수 있게 해줍니다. 각 계획을 개별적으로 열 필요 없이 한 그리드에서 다가오는 주들의 모든 위치에서 누가 예배하는지 볼 수 있습니다. 아직 채워야 할 공석을 빠르게 찾을 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- Serving 영역에서 최소 1개의 Ministry 및 Plan Type 생성
- 날짜와 자원봉사자 배정이 포함된 [service plans](./plans.md) 생성
- 자원봉사자가 [people directory](../people/adding-people.md)에 추가되었는지 확인

</div>

## Accessing the Overview

1. B1 Admin의 주 메뉴에서 **Serving**로 이동합니다.
2. 페이지 위쪽의 **ministry tab**을 선택합니다.
3. **plan type**을 클릭하여 계획 목록을 엽니다.
4. 페이지 위쪽 근처의 **Overview** 버튼을 클릭합니다.

## Reading the Overview Grid

개요는 다음과 같이 그리드를 표시합니다:

- **행** -- 각 위치(예: "Music: Guitar", "Tech: Projection")를 카테고리별로 그룹화
- **열** -- 다가오는 예배 날짜(예: "Apr 14", "Apr 21")
- **셀** -- 해당 날짜에 해당 위치에 배정된 자원봉사자의 이름

**빨강**으로 강조된 셀은 채워지지 않음입니다. 자원봉사자가 아직 배정되지 않았습니다. 이를 통해 각 계획을 개별적으로 열지 않고도 인력 공석을 한눈에 볼 수 있습니다.

:::tip
자원봉사자 이름은 축약된 형식(이름과 성 머리글자, 예: "John D.")으로 표시되어 위치가 많을 때 그리드를 간결하게 유지합니다.
:::

## Assigning Volunteers Directly from the Overview

개별 계획을 열어서 빈 슬롯을 채울 필요가 없습니다. 그리드의 셀을 클릭하여 해당 위치 및 날짜에 대한 배정 패널을 엽니다. 여기서 다음을 수행할 수 있습니다:

- 팀에서 위치에 배정할 사람 선택
- 이미 배정된 사람 옆의 **Remove**를 클릭하여 슬롯에서 제거
- 개요를 떠나지 않고 변경 사항 저장

이를 통해 전체 일정을 한 번에 배정할 수 있습니다. 개별 계획을 열고 닫지 않고도 주와 위치 전체에서 작업할 수 있습니다.

## Auto-Scheduling from the Overview

**Auto-Schedule**을 클릭하여 B1이 현재 그리드의 모든 열려 있고 채워지지 않은 슬롯을 한 번에 채우도록 합니다. 보기의 각 계획에 대해 각 위치에 연결된 그룹에서 후보를 끌어와서 빈 슬롯을 자동으로 채우며, 채울 수 있었던 표시된 계획의 수를 보고합니다. 같은 자원봉사자가 같은 패스에서 두 날짜에 이중 예약되지 않도록 계획이 한 번에 하나씩 채워집니다.

:::info
Auto-Schedule은 이미 비어 있는 슬롯만 채웁니다. 기존 배정을 절대 대체하지 않습니다.
:::

## Emailing Everyone Scheduled

**Email Volunteers**를 클릭하여 현재 필터링된 날짜 범위 및 ministry 어디에든 배정된 모든 자원봉사자에게 알림을 보냅니다. 계획별로 이메일을 보내는 대신 한 번의 작업으로 합니다. B1은 보낸 이메일 수와 실패한 수를 보고합니다.

## Highlighting a Volunteer's Schedule

**Highlight** 드롭다운을 사용하여 팀의 사람을 선택하면. 배정된 모든 셀이 그리드에서 강조표시되어 다른 슬롯에 추가하기 전에 이미 예배하는 모든 곳을 볼 수 있습니다. **Everyone**을 선택하여 강조표시를 끕니다.

## Filtering the Overview

위쪽의 필터 컨트롤을 사용하여 개요에서 표시되는 내용을 조정할 수 있습니다:

- **Start Date / End Date** -- 기본적으로 개요는 향후 12주를 표시합니다. 범위를 확대하거나 좁히려면 사용자 정의 날짜를 입력합니다.
- **Ministry** -- 개요를 떠나지 않고 다른 ministry로 전환합니다.
- **Plan Type** -- 선택한 ministry 내의 특정 plan type으로 필터링합니다.
- **Unfilled only** -- 이를 켜면 모든 날짜가 이미 채워진 행을 숨기므로 아직 자원봉사자가 필요한 위치에만 집중할 수 있습니다.

변경 후 **Filter**를 클릭하여 그리드를 업데이트합니다.

## Exporting to CSV

**Export CSV**를 클릭하여 현재 그리드를 스프레드시트로 다운로드합니다. 내보내기에는 필터링된 날짜 범위의 모든 위치 및 자원봉사자 배정이 포함되어 있어 ministry 리더와 공유하거나 계획 회의용으로 인쇄하기 쉬우므로 내보내기에 포함됩니다.

:::info
CSV 내보내기는 현재 적용된 모든 필터를 반영합니다. 그리드에 표시된 날짜와 plan type만 다운로드에 포함됩니다.
:::

## Related Articles

- [Service Plans](./plans.md) -- 개별 서비스 계획 생성 및 관리
- [Service Order](./service-order.md) -- 계획 내 예배 순서 작성
- [Scheduling Lessons](./scheduling-lessons.md) -- 서비스 계획과 함께 레슨 예약
