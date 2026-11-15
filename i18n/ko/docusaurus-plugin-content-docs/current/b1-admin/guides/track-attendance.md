---
title: "가이드: 교회 출석 기록하기"
description: "캠퍼스와 예배 시간을 설정하고, 수동 또는 셀프 체크인으로 출석을 기록하고, 보고서를 확인하여 B1 Admin에서 출석을 추적하세요."
---

# 교회 출석 기록하기

<div class="article-intro">

예배와 그룹의 출석 추적을 설정하세요. 캠퍼스와 예배 시간을 구성하고, 수동으로 또는 셀프 서비스 체크인 앱을 통해 출석을 기록하고, 보고서에서 추세를 확인하는 것까지 다룹니다. 완료하면 누가 언제 출석했는지 전체적인 현황을 파악할 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 관리자 권한이 있는 B1 Admin 계정
- [디렉터리에 등록된 사람](../people/adding-people.md)
- 추적하려는 사역을 위해 [만들어진 그룹](../groups/creating-groups.md)

</div>

## 1단계: 캠퍼스 및 예배 설정하기 {#step-1-configure-campuses--services}

교회가 어디에서, 언제 모이는지 정의하세요.

[출석 설정](../attendance/setup.md) 가이드를 따라 진행하세요:

1. [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)에서 **People > Attendance**를 선택하고 **Setup**을 클릭하세요
2. 캠퍼스(예: "Main Campus")와 그 예배를 추가하세요
3. 예배 시간을 추가하세요(예: "Sunday 9:00 AM", "Sunday 11:00 AM", "Wednesday 7:00 PM")

## 2단계: 그룹 출석 추적 켜기 {#step-2-enable-group-attendance-tracking}

추적하려는 그룹에 대해 출석 추적을 켜세요.

[그룹 만들기](../groups/creating-groups.md) 가이드를 따라 진행하세요:

1. 추적할 그룹을 각각 열고 **Edit**를 클릭한 다음 **Track Attendance**를 **Yes**로 설정하세요
2. 그룹이 예배 중에 모인다면 **Add Service Time**에서 시간을 고르고 더하기 버튼을 클릭하여 올바른 예배에 출석이 기록되도록 하세요. 그다음 **Save**를 클릭하세요

:::info
모든 그룹에 출석 추적이 필요한 것은 아닙니다. 참여도를 확인하고 싶은 그룹, 예를 들어 어린이 반, 소그룹, 주일학교 등에 대해서만 켜세요.
:::

## 3단계: 수동으로 출석 기록하기 {#step-3-record-attendance-manually}

예배와 그룹마다 누가 참석했는지 체크하세요.

[출석 기록](../attendance/recording-attendance.md) 가이드를 따라 진행하세요:

1. 그룹을 열고 **Sessions** 섹션에서 **All sessions**를 클릭한 다음 **New**를 클릭하고 **Service Time**과 **Session Date**를 선택하세요. **Also add for the other _N_ groups in _service time_**를 체크하면 해당 예배 시간의 모든 반에 대한 모임을 한 번에 만들 수 있습니다.
2. 참석한 사람을 체크하고 **Save Attendance**를 클릭하세요

이름이 아니라 총인원만 필요하다면(예: 주일 대예배), 대신 **Attendance** 페이지에서 **Enter headcount**를 클릭하세요. 자세한 내용은 [인원수 입력](../attendance/headcount-entry.md)을 참고하세요.

:::tip
수동 추적은 성인 예배, 소그룹, 체크인 키오스크를 사용하기 어려운 모든 상황에 잘 맞습니다.
:::

## 4단계: 셀프 체크인 설정하기 (선택 사항) {#step-4-set-up-self-check-in-optional}

태블릿 키오스크를 사용하여 성도가 직접 체크인하도록 하세요.

[체크인](../attendance/check-in.md) 가이드를 따라 진행하세요:

1. 셀프 서비스 체크인을 위해 태블릿에 B1 Checkin 앱을 설치하세요
2. 성도는 자신의 이름을 검색하여 본인과 가족을 직접 체크인할 수 있습니다
3. 체크인으로 기록된 출석은 수동으로 입력한 기록과 함께 표시됩니다. 데이터상 차이는 없습니다

:::info
하드웨어와 프린터 설정을 포함한 어린이 사역의 전체 설정은 [어린이 체크인 가이드](./childrens-checkin.md)를 참고하세요.
:::

## 5단계: 출석 보고서 확인하기 {#step-5-view-attendance-reports}

교회 전체의 참여 현황을 한눈에 살펴보세요.

[출석 보고서](../reports/attendance-reports.md) 가이드를 따라 진행하세요. **Attendance** 페이지에서 **All years**를 클릭하면 다음 보고서가 탭으로 나타납니다:

1. **Attendance Trend** — 시간에 따른 출석을 확인하여 성장이나 감소를 파악하세요
2. **Headcount Trend** — 직접 입력한 총인원을 차트로 확인하세요
3. **Group Attendance** — 날짜 범위 내 각 그룹 모임에 누가 참석했는지 확인하세요. CSV로 다운로드할 수 있습니다

한 그룹의 일별 인원을 보려면 **admin.b1.church/reports/dailyGroupAttendance**에서 **Daily Group Attendance** 보고서를 여세요.

:::info
출석 보고서에는 수동으로 기록한 출석과 셀프 체크인 출석이 모두 포함됩니다. 두 방식 모두 같은 보고서에 반영되므로 데이터가 표시되는 방식에 차이가 없습니다.
:::

## 완료! {#youre-done}

출석 추적이 설정되었습니다. 수동으로 기록하든, 체크인 앱을 사용하든, 또는 둘 다 사용하든 모든 데이터는 같은 보고서로 모이므로 교회 전체의 참여 현황을 명확하게 파악할 수 있습니다.

## 관련 문서 {#related-articles}

- [출석 설정](../attendance/setup.md) — 캠퍼스와 예배 설정
- [인원수 입력](../attendance/headcount-entry.md) — 이름 없이 총인원 기록
- [출석 기록](../attendance/recording-attendance.md) — 수동으로 출석 기록
- [출석 추적](../attendance/tracking-attendance.md) — 출석 추세 검토
- [체크인](../attendance/check-in.md) — 셀프 서비스 체크인 앱
- [그룹 만들기](../groups/creating-groups.md) — 출석 추적을 포함한 그룹 설정
- [출석 보고서](../reports/attendance-reports.md) — 출석 추세 보기
- [어린이 체크인 가이드](./childrens-checkin.md) — 어린이 사역 체크인 전체 설정
