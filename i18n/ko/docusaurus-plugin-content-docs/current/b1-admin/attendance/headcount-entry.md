---
title: "인원수 입력 및 추이"
description: "B1 Admin에서 명단 없이 예배나 그룹의 총 인원수를 입력하고, 인원수 추이 보고서에서 주별 합계를 확인하세요."
---

# 인원수 입력 및 추이

<div class="article-intro">

인원수 기능을 사용하면 성도 명단을 체크인하지 않고도 예배, 예배 시간, 또는 그룹의 총 출석 수를 간단히 기록할 수 있습니다. "몇 명이 참석했는지"만 알면 되는 경우에 사용하고, 인원수 추이 보고서와 함께 사용하면 시간에 따른 변화를 볼 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 캠퍼스, 예배, 예배 시간이 설정되어 있어야 합니다. [출석 설정](setup.md)을 참조하세요.
- 인원수를 입력하려면 **Attendance &gt; Edit** 권한이 필요하며, 추이 보고서를 보려면 **Attendance &gt; View** 권한이 필요합니다. [역할 및 권한](../settings/roles-permissions.md)을 참조하세요.

</div>

:::info
인원수는 [출석 기록](recording-attendance.md)의 총계만 남기는 대안입니다. **누가** 참석했는지 알아야 한다면(예: 한동안 나오지 않은 사람에게 연락하는 경우) 그룹의 Sessions에서 개인별 출석을 계속 사용하세요. 인원수에는 숫자만 저장됩니다.
:::

## 인원수 기록하기 {#recording-a-headcount}

1. **B1 Admin**을 열고 [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 상단의 검색창)를 연 뒤 **People**을 펼치고 **Attendance**를 클릭합니다.
2. 왼쪽 열에서 **Enter headcount**를 클릭합니다.
3. 양식을 작성합니다.
   - **Service** *(필수)*
   - **Service Time** -- **All service times**를 그대로 두면 해당 예배의 모든 시간을 합산하여 기록합니다.
   - **Group** -- 선택 사항이며, Track Attendance가 켜진 그룹만 목록에 나타납니다. "No group (whole service)"(그룹 없음, 예배 전체)로 하려면 비워 둡니다.
   - **Date**
   - **Headcount** -- 참석한 총 인원수(0 이상의 정수)
4. **Save**를 클릭합니다.

양식 옆의 **Recent Headcounts** 표에는 최근 입력한 몇 건이 날짜, 예배, 예배 시간, 그룹, 인원수와 함께 표시됩니다. 수정하거나 삭제해야 한다면 행을 클릭하여 양식에 다시 불러올 수 있습니다.

## 인원수 추이 보고서 {#headcount-trend-report}

1. 같은 **Attendance** 페이지의 왼쪽 열에서 **All years**를 클릭한 뒤 **Headcount Trend** 탭을 선택합니다.
2. 탭을 열면 보고서가 실행됩니다. 범위를 좁히려면 **Campus**, **Service**, **Service Time**, 또는 **Group**을 고르고 **Run Report**를 클릭합니다. 날짜 필터는 없으며, 보고서에는 인원수가 입력된 모든 주가 포함됩니다.

보고서에는 기록한 인원수를 주별로 합산한 결과가 꺾은선 그래프와 표로 표시됩니다. 스타일은 [출석 추이 및 그룹 출석 탭](tracking-attendance.md)과 같은 보고서 형식입니다. 이번 주에 입력한 인원수는 Attendance 메인 페이지의 **Headcounts this week**에도 표시됩니다.

## 관련 페이지 {#related-pages}

- [출석 기록하기](recording-attendance.md) -- 이름이 있는 개인별 세션 출석
- [출석 추적하기](tracking-attendance.md) -- 출석 및 그룹 추이 보고서
- [출석 설정](setup.md) -- 캠퍼스, 예배, 예배 시간 구성
