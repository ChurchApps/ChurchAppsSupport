---
title: "가이드: 어린이 사역 체크인 설정하기"
description: "B1 Admin에서 어린이 체크인을 설정하세요. 가족을 연결하고, 나이별 그룹을 만들고, 예배를 구성하고, B1 Checkin 키오스크용 이름표를 인쇄합니다."
---

# 어린이 사역 체크인 설정하기

<div class="article-intro">

이 가이드는 교회에 어린이 체크인 시스템을 가동하는 데 필요한 모든 단계를 안내합니다. 데이터베이스에 가족을 입력하는 것부터, 나이에 맞는 그룹을 구성하고, 주일 아침에 이름표를 인쇄하는 것까지 다룹니다. 가이드를 마치면 부모가 키오스크 태블릿에서 자녀를 체크인하고 짝이 되는 보안 태그를 받을 수 있게 됩니다.

</div>

## 교육 영상 {#training-video}

<YouTube id="Ep9CBUcJwPI" title="B1에서 어린이 체크인 설정하기" next="B1에서 출석 기록 및 추적하기" nextUrl="/docs/b1-admin/attendance/recording-attendance" />

<div class="prereqs">
<h4>시작하기 전에</h4>

- [admin.b1.church](https://admin.b1.church)에서 교회 계정을 만드세요.
- 관리자 권한이 있는지 확인하세요. 필요하면 [역할 및 권한](../people/roles-permissions.md)을 참조하세요.
- 선택 사항: 다른 시스템에서 옮기는 중이라면 가족 목록을 CSV 파일로 준비하세요.

</div>

## 1단계: 데이터베이스에 가족 추가하기 {#step-1-add-families-to-your-database}

체크인이 작동하려면 시스템이 가족을 알아야 합니다. 각 자녀는 세대(household) 기능을 통해 부모와 연결되어야 합니다.

[사람 추가하기](../people/adding-people.md) 가이드를 따라 가족을 최소 한 가족 이상 추가하세요. 다음 사항을 꼭 지키세요.

- 부모를 먼저 추가합니다.
- 각 자녀를 추가합니다.
- [세대 편집기](../people/adding-people.md#managing-households)를 사용하여 같은 세대로 연결합니다.

:::tip
추가할 가족이 몇 가정을 넘는다면, 하나씩 추가하는 대신 [CSV 가져오기](../people/importing-data.md) 도구를 사용하세요. 전체 명부를 몇 분 안에 가져올 수 있습니다.
:::

## 2단계: 어린이 그룹 만들기 {#step-2-create-childrens-groups}

그룹은 아이들이 체크인하는 반을 정의합니다. 보통 나이대마다 그룹을 하나씩 두게 됩니다.

[그룹 만들기](../groups/creating-groups.md) 가이드를 따라 다음과 같은 그룹을 만드세요.

- **영아반(Nursery)** (0–2세)
- **유치반(Preschool)** (3–5세)
- **초등반(Elementary)** (6–10세)

사역 구조에 맞게 이름과 나이 범위를 조정하세요. 그다음 각 그룹의 설정을 열고(그룹 페이지에서 **Edit**를 클릭합니다) 다음을 설정합니다.

- 그룹에 체크인할 수 있도록 **Track Attendance**를 **Yes**로 설정합니다.
- **Print Nametag**를 켭니다(픽업 태그를 인쇄한다면 **Parent Pickup**도 켭니다).
- 선택 사항으로 **Age & Grade** 제한을 설정하면 키오스크가 알맞은 방을 추천합니다. [체크인 안전](../attendance/checkin-safety.md)을 참조하세요.

## 3단계: 캠퍼스와 예배 구성하기 {#step-3-configure-campuses-and-services}

체크인은 특정 예배 시간에 연결됩니다. 캠퍼스와 예배를 최소 하나씩 구성해야 합니다.

[출석 설정](../attendance/setup.md) 가이드를 따라 다음을 하세요.

1. **People > Attendance**로 이동하여 **Setup**을 클릭합니다.
2. 캠퍼스를 추가합니다(예: "Main Campus").
3. 예배를 추가합니다(예: "Sunday Morning").
4. 예배 시간을 추가합니다(예: "9:00 AM"). 선택 사항으로 [체크인 일정](../attendance/setup.md#setting-a-check-in-schedule)을 설정하면 각 예배 전에 체크인이 자동으로 열리고 예배 후에 닫힙니다.
5. 각 어린이 그룹을 예배 시간에 연결합니다. 그룹을 열고 **Edit**를 클릭한 뒤, **Add Service Time**에서 시간을 고르고 더하기 버튼을 클릭하세요.

## 4단계: 체크인 앱 설정하기 {#step-4-set-up-the-check-in-app}

이제 태블릿에 체크인 앱을 설치해 모든 것을 연결합니다.

1. **B1 Checkin 앱**을 설치합니다. 다운로드 링크는 [체크인](../attendance/check-in.md) 문서를 참조하세요.
2. **Checkin** 출석 권한(또는 **Edit Attendance**)이 있는 계정으로 로그인합니다. [체크인 키오스크 계정](../settings/roles-permissions.md#check-in-kiosk-accounts)을 참조하세요.
3. 캠퍼스와 예배 시간을 고릅니다.

자세한 설정 단계는 전체 [체크인](../attendance/check-in.md) 문서를 참조하세요.

## 5단계: 하드웨어 준비하기 {#step-5-get-your-hardware}

키오스크용 태블릿이 필요하며, 이름표를 인쇄하려면 선택 사항으로 Brother 라벨 프린터가 필요합니다.

최소한 다음이 필요합니다.
- **iPad, Android, 또는 Amazon Fire 태블릿 한 대** — [권장 태블릿](../attendance/check-in.md#recommended-hardware)을 참조하세요.
- **Brother 라벨 프린터 한 대** — 블루투스와 WiFi를 지원하므로 QL-1110NWB를 권장합니다.
- **Brother DK-1201 라벨**(1-1/7" x 3-1/2")

:::warning
B1 Checkin 앱과 호환되는 것은 Brother 라벨 프린터뿐입니다. 다른 브랜드의 프린터는 작동하지 않습니다.
:::

## 6단계: 체크인 시험 실행하기 {#step-6-run-a-test-check-in}

주일 아침 전에 시험 운영을 해 보세요.

1. 태블릿에서 B1 Checkin 앱을 엽니다.
2. 캠퍼스와 올바른 예배 시간을 고릅니다.
3. 추가한 가족 중 한 가족을 검색합니다.
4. 자녀 한 명을 체크인하고 다음을 확인합니다.
   - B1 Admin의 **People > Attendance**에 출석이 나타나는지 확인합니다.
   - 프린터를 사용한다면 이름표가 올바르게 인쇄되는지 확인합니다.

:::tip
출시 전에 안내 데스크 봉사자에게 체크인 절차를 교육하세요. 보통 5분짜리 간단한 시연이면 충분합니다.
:::

## 완료! {#youre-done}

어린이 사역 체크인이 준비되었습니다. 부모는 가족을 검색하고, 자녀를 고른 뒤 키오스크에서 체크인하면 됩니다. 출석은 B1 Admin에 자동으로 기록됩니다.

## 관련 문서 {#related-articles}

- [사람 추가하기](../people/adding-people.md) — 방문하는 가족을 계속 추가
- [그룹 만들기](../groups/creating-groups.md) — 어린이 그룹 관리
- [출석 설정](../attendance/setup.md) — 캠퍼스와 예배 구성
- [체크인](../attendance/check-in.md) — 체크인 앱과 하드웨어 상세 설정
- [출석 추적하기](../attendance/tracking-attendance.md) — 체크인 보고서 확인
