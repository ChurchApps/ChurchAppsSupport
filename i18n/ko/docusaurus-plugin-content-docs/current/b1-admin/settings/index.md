---
title: "설정"
description: "B1 Admin의 설정을 둘러보세요. 교회 정보, 브랜딩, 캠퍼스, 사용자 지정 필드, 사용자 역할, B1.church 앱 탐색을 다룹니다."
---

# 설정

<div class="article-intro">

설정 섹션에서는 B1 Admin의 교회 계정, 브랜딩, 관리 옵션을 구성합니다. 여기에서 교회 이름과 하위 도메인부터 사용자 권한, 모바일 앱 구성까지 모든 것을 관리할 수 있습니다.

</div>

## 여기서 찾을 수 있는 것 {#what-you-will-find-here}

설정 영역은 다음 하위 섹션으로 구성되어 있습니다.

1. **Settings**(설정) -- 교회의 기본 정보, 하위 도메인, 지역(날짜 및 전화번호 형식), 헌금, 문자 서비스 제공자, 파일 저장소 등을 설정합니다. 자세한 내용은 [교회 설정](./church-settings.md)을 참고하세요. 자체 도메인 이름(예: yourchurch.org)을 사용하려면 [사용자 지정 도메인](./custom-domain.md)을 참고하세요.
2. **Campuses**(캠퍼스) -- 교회의 여러 실제 장소를 추가하고 관리합니다. 캠퍼스를 만들면 사람 프로필, 출석 설정, 인구통계 대시보드에 나타납니다. 별도의 탐색 항목이 아니라 기본 설정 페이지의 한 섹션으로 접근합니다. 자세한 내용은 [캠퍼스](./campuses.md)를 참고하세요.
3. **Custom Fields**(사용자 지정 필드) -- 사람에 대해 추적할 자체 필드(날짜, 숫자, 예/아니요 답변, 선택 목록)를 정의한 다음, 프로필에 값을 입력하고 그 필드로 검색합니다. 이 역시 기본 설정 페이지의 한 섹션으로 접근합니다. 자세한 내용은 [사용자 지정 필드](./custom-fields.md)를 참고하세요.
4. **Roles**(역할) -- 직원과 자원봉사자 각자가 볼 수 있고 바꿀 수 있는 것을 제어합니다. [역할 및 권한](./roles-permissions.md)을 참고하세요.
5. **Email Templates**(이메일 템플릿) -- 수동으로 보내거나 워크플로에서 보낼 재사용 가능한 이메일 내용을 저장합니다. 자세한 내용은 [이메일 템플릿](./email-templates.md)을 참고하세요.
6. **Audit Log**(감사 로그)와 **Batches**(일괄 작업) -- 계정 전반에서 이루어진 변경 사항을 검토합니다([감사 로그](../reports/audit-log.md)). 일괄 가져오기와 작업을 검토하거나 되돌릴 수 있습니다(**Batches**).
7. **Server Admin**(서버 관리) -- 고급 관리 도구입니다. ChurchApps 서버 관리자에게만 표시됩니다.

:::info
**Mobile Apps**(모바일 앱) 설정과 **Forms**(양식)는 이제 설정 안이 아니라 각각 최상위 탐색 항목인 **Mobile**(모바일)과 **Forms**(양식)(**People**(사람) 아래)에 있습니다. 자세한 내용은 [모바일 앱 설정](./mobile-app.md)과 [양식 만들기](/docs/b1-admin/forms/creating-forms)를 참고하세요.
:::

## 기본 설정 페이지 {#the-main-settings-page}

설정 페이지를 처음 열면 왼쪽 패널에 **교회 이름**, **하위 도메인**, 주소가 표시되며, 시스템 간 데이터를 옮기는 가져오기/내보내기 도구를 여는 **Import/Export**(가져오기/내보내기) 링크도 있습니다.

그 아래의 **Configuration**(구성) 목록에는 각 설정 섹션으로 가는 링크가 있습니다. **Church Information**(교회 정보), **General**(일반), **Region**(지역), **Giving**(헌금), **Texting**(문자 서비스), **File Storage**(파일 저장소), **Domains**(도메인), **Grade Promotion**(학년 진급), **Check-In**(체크인), **Volunteer Signup**(자원봉사 신청), **Giving privacy**(헌금 개인정보 보호), **Campuses**(캠퍼스), **Custom Fields**(사용자 지정 필드), **Developer**(개발자)입니다. 각 항목에는 현재 설정의 한 줄 요약이 표시되며, 아직 설정이 필요한 섹션(예: 헌금, 문자 서비스, 도메인)에는 작은 점이 표시됩니다. **Giving**은 헌금 설정을 편집할 수 있는 사람에게만 나타납니다. 휴대폰에서는 목록이 숨겨지므로, 페이지를 스크롤하여 각 섹션으로 가세요. 모든 섹션은 한 페이지에 있습니다. 목록에서 이름을 클릭하면 해당 위치로 스크롤되며, 그냥 아래로 스크롤해도 됩니다. 각 섹션에는 현재 설정이 표시되며, 변경하려면 섹션에서 **Edit**를 클릭하세요.

**Developer** 섹션에는 **API Keys**(API 키), **Webhooks**(웹훅), **Connected Apps**(연결된 앱)의 세 탭이 있습니다. [API 키](../../developer/api/api-keys.md), [웹훅](../../developer/api/webhooks.md), [연결된 앱](../../developer/api/connected-apps.md)을 참고하세요.

**Email Templates**, **Audit Log**, **Batches**는 별도의 페이지입니다. [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)의 **Settings** 아래에서 여세요.

**Church Information**(교회 정보) 섹션에서 시작하여 교회의 이름, 주소, 연락처 정보를 편집하세요. [교회 설정](./church-settings.md)을 참고하세요. 사용자 역할을 관리하려면 [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)를 열고 **Settings > Roles**(설정 > 역할)를 선택하세요. [역할 및 권한](./roles-permissions.md)을 참고하세요.

:::tip
먼저 **Church Information**에서 교회 이름과 브랜딩을 설정하세요. 그다음 [역할](./roles-permissions.md)을 설정하여 팀원을 적절한 접근 수준으로 초대하세요.
:::

:::info
데이터가 어떻게 보호되는지에 대해서는 [데이터 보안](./data-security.md)을 참고하세요.
:::

## 다음 단계 {#next-steps}

- [교회 설정](./church-settings.md) -- 교회 정보와 브랜딩 구성
- [캠퍼스](./campuses.md) -- 여러 장소를 운영하는 교회를 위한 위치 추가
- [역할 및 권한](./roles-permissions.md) -- 사용자 역할과 접근 제어 설정
- [모바일 앱 설정](./mobile-app.md) -- B1.church PWA의 탐색 탭과 앱 테마 색상 맞춤 설정
- [푸시 알림](./mobile-app.md#push-notifications) -- 앱 사용자에게 푸시 알림 보내기 또는 예약하기
- [데이터 보안](./data-security.md) -- 데이터가 어떻게 보호되는지 알아보기
