---
title: "가이드: B1로 교회 시작하기"
description: "B1 Admin에서 새 교회를 설정하는 과정을 안내합니다. 계정 만들기, 설정 구성, 역할 추가, 구성원 가져오기, 핵심 기능 출시까지 다룹니다."
---

# B1로 교회 시작하기

<div class="article-intro">

새 교회를 위한 전체 온보딩 가이드입니다. 계정을 만드는 것부터 구성원 명부를 가져오고 첫 기능을 설정하는 것까지 다룹니다. 이 단계를 순서대로 따라 하면 교회를 B1에서 가동할 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 유효한 이메일 주소
- 교회 로고와 브랜딩 자료(색상, 이미지). 시작하는 데 필수는 아니지만 권장합니다.

</div>

## 1단계: 계정 만들기 {#step-1-create-your-account}

교회를 등록하고 첫 관리자가 되세요.

[계정 만들기](../../getting-started/create-account.md) 가이드를 따라 다음을 하세요.

1. b1.church로 가서 이메일로 등록합니다.
2. 이메일 주소를 인증합니다.
3. "Create a new church"를 선택하고 교회 이름을 입력합니다.
4. 여러분은 자동으로 Domain Admin이 되어 모든 것에 대한 전체 권한을 갖습니다.

## 2단계: 교회 설정 구성하기 {#step-2-configure-church-settings}

교회의 기본 정보와 브랜딩을 입력하세요.

[교회 설정](../settings/church-settings.md) 가이드를 따라 다음을 하세요.

1. [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)에서 **Settings > Settings**를 선택하고 **Church Information** 섹션의 **Edit**를 클릭합니다.
2. 교회 이름과 주소를 입력하고, **Subdomain**(서브도메인)을 설정합니다. 이것이 yourchurch.b1.church가 됩니다.
3. **Website > Appearance**에서 교회 로고를 업로드하고 색상을 고릅니다([로고와 브랜딩](../website/appearance.md#logo-and-branding) 참조). B1 앱의 색상은 **Mobile > App Theme**에서 설정합니다.

:::tip
서브도메인은 웹사이트 주소와 헌금 페이지 주소에 나타나므로, 짧고 알아보기 쉬운 이름을 고르세요(예: Grace Community Church라면 "grace").
:::

## 3단계: 역할 설정하고 팀 초대하기 {#step-3-set-up-roles--invite-your-team}

누가 무엇에 접근할 수 있는지 조절하고 팀을 참여시키세요.

[역할 및 권한](../settings/roles-permissions.md) 가이드를 따라 다음을 하세요.

1. 점프 메뉴에서 **Settings > Roles**를 선택하고 팀을 위한 역할을 만듭니다(예: "Pastor", "Office Admin", "Finance Team", "Worship Leader").
2. 각 역할에 필요한 권한만 배정하여, 사람들이 필요한 것만 보게 합니다.
3. 역할의 **Members** 패널에서 **Add**를 클릭하여 팀원을 초대합니다. B1이 초대 이메일을 보내겠다고 제안합니다(아직 교회에 없는 사람에게는 **Create New User**를 사용하세요).

:::info
모든 일을 혼자 할 필요는 없습니다. 사무 직원, 목회자, 사역 리더를 일찍 초대하면 각자 맡은 영역을 설정하는 데 도움을 줄 수 있습니다.
:::

## 4단계: 사람들 가져오기 {#step-4-import-your-people}

기존 구성원 명부를 B1로 가져오세요.

[데이터 가져오기](../people/importing-data.md) 가이드를 따릅니다. **Settings**에서 **Import/Export**를 클릭하여 B1 Transfer 도구를 열고 원본을 고릅니다.

1. **Custom CSV / Excel** — 현재 시스템이나 스프레드시트에서 내보내고, 파일을 업로드한 뒤, 열을 B1 필드에 매핑합니다.
2. **다른 시스템에서 옮기기** — **Breeze**, **Planning Center**, **Tithe.ly**, **CCB / Pushpay**에서 내보낸 파일을 업로드합니다.

:::tip
Breeze에서 옮기는 중이라면, **People**, **Tags**, **Contributions** 파일을 내보낸 뒤 함께 zip으로 묶고, 그 zip을 **Breeze Import Zip**으로 업로드하세요. 사람, 그룹, 헌금 기록이 한 번에 넘어옵니다.
:::

## 5단계: 모바일 앱 구성하기 {#step-5-configure-the-mobile-app}

구성원의 경험에 맞게 B1 앱을 사용자 지정하세요.

[모바일 앱 설정](../settings/mobile-app.md) 가이드를 따라 다음을 하세요.

1. 점프 메뉴에서 **Mobile > Navigation**을 선택하고 **Add Tab**을 클릭하여 구성원에게 보일 탭을 고릅니다.
2. 각 탭의 이름, 아이콘, **Tab Type**(성경, 실시간 스트림, 설교, 헌금, 외부 URL, 내부 페이지 등)을 설정합니다.
3. 각 탭의 **Visibility**로 누가 그 탭을 볼 수 있는지 조절합니다.

## 6단계: 기능 설정 시작하기 {#step-6-start-setting-up-features}

기본 틀이 준비되었으니, 다음 가이드를 따라 개별 기능을 설정하세요.

- [온라인 헌금 설정하기](./online-giving.md) — 웹사이트와 앱에서 헌금 받기
- [교회 웹사이트 출시하기](./launch-website.md) — 교회 웹사이트 만들기
- [소그룹 운영하기](./small-groups.md) — 그룹, 성경 공부, 사역 정리
- [어린이 사역 체크인 설정하기](./childrens-checkin.md) — 아이들 사역을 위한 키오스크 체크인
- [주일 봉사자 관리하기](./sunday-volunteers.md) — 봉사팀 조율
- [설교 라이브러리 만들기](./sermon-library.md) — 설교를 온라인에 올리고 라이브 스트리밍 설정
- [출석 추적하기](./track-attendance.md) — 예배와 그룹에 누가 오는지 확인

## 완료! {#youre-done}

교회가 B1에 설정되었습니다. 팀이 접근할 수 있고, 사람들이 가져와졌으며, 사역에 가장 중요한 기능을 사용할 준비가 되었습니다. 위의 기능 가이드를 살펴보며 각 영역을 설정하세요.

## 관련 문서 {#related-articles}

- [계정 만들기](../../getting-started/create-account.md) — 계정 등록
- [초기 설정](../../getting-started/initial-setup.md) — 안내 온보딩 개요
- [교회 설정](../settings/church-settings.md) — 교회 정보와 브랜딩
- [역할 및 권한](../settings/roles-permissions.md) — 팀 접근 제어
- [데이터 가져오기](../people/importing-data.md) — 대량 데이터 가져오기
- [모바일 앱 설정](../settings/mobile-app.md) — 구성원 앱 사용자 지정
