---
title: "프로필 수정"
---

# 프로필 수정

<div class="article-intro">

회원 포털의 프로필 페이지에서 연락처를 업데이트하고, 가족 구성원을 관리하고, 계정 이메일과 비밀번호를 바꾸고, 주소, 전화번호, 이메일을 누가 볼 수 있는지 정할 수 있습니다.

</div>

## 교육 동영상

<YouTube id="SKqr2A_jdRQ" title="프로필과 알림 업데이트하기" next="그룹에 가입하고 대화하기" nextUrl="/docs/b1-church/groups/browsing-groups" />

<div class="prereqs">
<h4>시작하기 전에</h4>

- [로그인](./logging-in.md)되어 있어야 합니다. 프로필을 수정하려면 계정이 필요합니다.

</div>

## 프로필 열기

상단 앱 바에서 프로필 사진을 누르거나, **More** 페이지 위쪽이나 [내 페이지](./me-page.md)의 **Edit Profile**을 누르세요. `/mobile/profileEdit`에 있는 **Your profile**(내 프로필)이 열립니다. 이 페이지는 **Photo & name**(사진과 이름), **Contact**(연락처), **Household**(가족), **Account**(계정), **Privacy**(개인정보) 섹션으로 이루어진 한 장의 페이지입니다. 각 섹션에는 현재 정보가 표시되며, **Edit** 링크(또는 **Add Family Member** / **Change**)를 누르면 변경할 수 있는 패널이 열립니다.

## 사진 및 이름, 연락처

이 섹션들에는 교회가 본인의 사람 기록에서 확인하는 정보가 담겨 있습니다.

- **Photo & name**(사진과 이름) — **Change Photo**를 눌러 새 사진을 올리고, 이름(First, Middle, Last)을 수정하세요.
- **Contact**(연락처) — 이메일, 휴대폰, 집 전화, 직장 전화, 생년월일, 주소(도로명, 도시, 주, 우편번호)가 있습니다. [알림 설정](./notification-preferences.md)에서 문자 알림을 켜면 휴대폰 번호로 알림이 갑니다.

패널에서 변경한 뒤 **Save Changes**를 누르세요.

:::info
교회가 명단 변경에 승인을 요구하면, 페이지에 "Changes to your profile go to church staff for approval."(프로필 변경 사항은 교회 직원의 승인을 받습니다.)이 표시되고 버튼은 **Submit for Approval**(승인 요청)로 바뀝니다. 이 경우 수정 내용은 즉시 적용되지 않고 요청으로 제출됩니다. 교회가 이를 어떻게 검토하는지는 [프로필 변경 승인하기](/docs/b1-admin/profile/approving-profile-changes)를 참고하세요.
:::

## 가족

가족 섹션에는 본인의 가족 구성원이 각자의 가족 역할(Head, Spouse, Child 등)과 함께 표시됩니다. 가족 구성원을 누르면 세부 정보를 볼 수 있습니다.

아직 시스템에 없는 가족 구성원을 추가하려면 **Add Family Member**를 누르고, 이름을 입력한 뒤 **Add**를 누르세요. 새 가족 구성원은 대기 목록에 들어가며, 다른 프로필 변경 사항과 함께 교회의 검토를 위해 제출됩니다.

## 계정

계정 섹션은 교회 프로필이 아니라 로그인을 관리합니다. **Edit**를 눌러 여세요.

- **Display Name**(표시 이름) — 로그인 화면에 보이는 이름(성과 이름). 교회 프로필의 이름과는 별개입니다.
- **Change Email**(이메일 변경) — 로그인할 때 쓰는 이메일 주소를 바꿉니다.
- **Change Password**(비밀번호 변경) — 현재 비밀번호를 입력한 다음 새 비밀번호를 두 번 입력하세요. 새 비밀번호는 8자 이상이어야 합니다.

각 항목에는 자체 **Save** 버튼이 있습니다.

## 개인정보 {#privacy}

개인정보 섹션은 ChurchApps 전체에서 누가 본인의 연락처 정보를 볼 수 있는지 보여 줍니다. **Change**를 누르면 **Visibility Preferences**(공개 설정)가 열립니다.

- **Hide me from the member directory**(회원 디렉터리에서 나를 숨기기) — 이 스위치를 켜면 [회원 디렉터리](../community/member-directory.md)에서 본인이 완전히 빠집니다.
- **Address Visibility**(주소 공개), **Phone Visibility**(전화번호 공개), **Email Visibility**(이메일 공개) — 항목마다 드롭다운이 있어, 예를 들어 이메일은 교회 전체에 공개하면서 주소는 더 비공개로 둘 수 있습니다. 선택지는 다음과 같습니다.

| 수준 | 볼 수 있는 사람 |
|---|---|
| **Everyone**(모든 사람) | 디렉터리를 볼 수 있는 모든 사람에게 보입니다. |
| **Members Only**(회원만) | 로그인한 다른 교회 회원에게 보입니다. |
| **My Groups Only**(내 그룹만) | 내가 속한 그룹의 구성원에게만 보입니다. |
| **My Group Leaders and Staff**(내 그룹 리더와 직원) | 교회 직원과 내가 속한 그룹의 리더에게만 보입니다. |
| **Staff Only**(직원만) | 교회 직원(Staff 멤버십 상태이거나 People 보기 권한이 있는 사람)에게만 보입니다. |

**Save**를 눌러 선택을 적용하세요. 교회는 이 세 항목 각각에 기본값을 정해 둡니다. 자세한 내용은 [모바일 앱 설정](/docs/b1-admin/settings/mobile-app)을 참고하세요. 하지만 여기서 고른 설정은 본인의 기록에 대해 그 기본값을 덮어씁니다.

:::tip
이 설정과 관계없이 본인의 정보는 언제나 본인에게 보이며, People 보기 권한이 있는 직원도 언제나 볼 수 있습니다.
:::

## 관련 문서

- [내 페이지](./me-page.md) — 나만의 대시보드
- [회원 디렉터리](../community/member-directory.md) — 다른 회원 둘러보기
- [프로필 변경 승인하기](/docs/b1-admin/profile/approving-profile-changes) — 교회가 제출된 변경 사항을 검토하는 방법
