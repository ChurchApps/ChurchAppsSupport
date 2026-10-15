---
title: "프로필 편집하기"
---

# 프로필 편집하기

<div class="article-intro">

회원 포털의 프로필 페이지에서 연락처 정보를 수정하고, 가구를 관리하고, 계정 이메일과 비밀번호를 변경하고, 주소, 전화번호, 이메일 주소를 누가 볼 수 있는지 설정할 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- [로그인](./logging-in.md)되어 있어야 합니다. 프로필 편집에는 계정이 필요합니다.

</div>

## 프로필 열기

상단 앱 바의 프로필 사진을 탭하거나, **More** 페이지 또는 [Me 페이지](./me-page.md) 상단의 **Edit Profile**을 탭하면 `/mobile/profileEdit`의 **Your profile**이 열립니다. 이 페이지는 **Photo & name**, **Contact**, **Household**, **Account**, **Privacy** 섹션으로 구성되어 있습니다. 각 섹션에는 현재 정보가 표시되고, 변경할 수 있는 패널을 여는 **Edit** 링크(또는 **Add Family Member** / **Change**)가 있습니다.

## 사진 및 이름, 연락처

이 섹션에는 교회가 회원의 사람 기록에서 보는 정보가 들어 있습니다.

- **Photo & name** -- **Change Photo**를 탭하여 새 사진을 업로드하고, 이름(First, Middle, Last)을 편집합니다.
- **Contact** -- 이메일, 휴대폰, 집 전화, 직장 전화, 생년월일, 주소(도로명, 도시, 주, 우편번호)입니다. [알림 설정](./notification-preferences.md)에서 문자 알림을 켜면 휴대폰 번호로 알림이 전송됩니다.

패널에서 변경한 후 **Save Changes**를 탭합니다.

:::info
교회가 디렉토리 변경에 승인을 요구한다면, 페이지에 "Changes to your profile go to church staff for approval."(프로필 변경 사항은 교회 직원의 승인을 위해 전달됩니다.)이 표시되고 버튼에는 **Submit for Approval**이 표시됩니다. 이 경우 변경 사항은 즉시 적용되지 않고 요청으로 제출됩니다. 교회가 이를 검토하는 방법은 [프로필 변경 승인하기](/docs/b1-admin/profile/approving-profile-changes)를 참조하세요.
:::

## 가구

가구 섹션에는 내 가구와 연결된 다른 사람들이 각자의 가구 역할(Head, Spouse, Child 등)과 함께 표시됩니다. 가구 구성원을 탭하면 그 사람의 세부 정보를 볼 수 있습니다.

아직 시스템에 없는 가족 구성원을 추가하려면 **Add Family Member**를 탭하고 이름을 입력한 다음 **Add**를 탭합니다. 새 가족 구성원은 보류 목록에 추가되며, 다른 프로필 변경 사항과 함께 교회 검토용으로 제출됩니다.

## 계정

계정 섹션은 교회 프로필이 아니라 로그인을 관리합니다. **Edit**를 탭하여 엽니다.

- **Display Name** -- 로그인 화면에 표시되는 이름(교회 프로필의 이름과는 별개입니다)입니다.
- **Change Email** -- 로그인에 사용하는 이메일 주소를 변경합니다.
- **Change Password** -- 현재 비밀번호를 입력한 다음 새 비밀번호를 두 번 입력합니다. 새 비밀번호는 8자 이상이어야 합니다.

각 항목에는 자체 **Save** 버튼이 있습니다.

## 개인정보 보호

개인정보 보호 섹션에서는 ChurchApps 전반에서 내 연락처 정보를 누가 볼 수 있는지 보여줍니다. **Change**를 탭하여 **Visibility Preferences**를 엽니다.

- **Hide me from the member directory** -- 켜면 [회원 디렉토리](../community/member-directory.md)에서 나를 완전히 제외하는 스위치입니다.
- **Address Visibility**, **Phone Visibility**, **Email Visibility** -- 각각 별도의 드롭다운이 있어, 예를 들어 이메일은 교회 전체에 공유하고 주소는 더 비공개로 유지할 수 있습니다. 선택지는 다음과 같습니다.

| 수준 | 볼 수 있는 사람 |
|---|---|
| **Everyone** | 디렉토리를 볼 수 있는 모든 사람이 볼 수 있습니다. |
| **Members Only** | 로그인한 다른 교회 회원이 볼 수 있습니다. |
| **My Groups Only** | 내가 속한 그룹의 회원만 볼 수 있습니다. |
| **My Group Leaders and Staff** | 교회 직원과 내가 속한 그룹의 리더만 볼 수 있습니다. |
| **Staff Only** | 교회 직원만 볼 수 있습니다. |

**Save**를 탭하여 선택을 적용합니다. 교회는 이 세 가지 필드 각각에 기본값을 설정해 두며 [모바일 앱 설정](/docs/b1-admin/settings/mobile-app)을 참조하세요. 하지만 여기서 선택한 내용은 내 기록에 대해 그 기본값보다 우선합니다.

:::tip
이 설정과 관계없이 나는 항상 내 정보를 볼 수 있으며, 사람 보기 권한이 있는 직원도 항상 볼 수 있습니다.
:::

## 관련 문서

- [Me 페이지](./me-page.md) -- 개인 대시보드입니다.
- [회원 디렉토리](../community/member-directory.md) -- 다른 회원을 둘러봅니다.
- [프로필 변경 승인하기](/docs/b1-admin/profile/approving-profile-changes) -- 교회가 제출된 변경 사항을 검토하는 방법입니다.
