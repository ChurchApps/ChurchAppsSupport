---
title: "온라인 헌금 설정"
---

# 온라인 헌금 설정

<div class="article-intro">

B1 Admin은 **Stripe** 및 **PayPal**과 통합되어 교인들이 B1.church 사이트를 통해 온라인으로 헌금할 수 있습니다. 구성이 완료되면 온라인 헌금이 수동으로 입력한 헌금과 함께 자동으로 기록에 나타나므로 모든 것을 한 시스템에서 관리할 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 기부자가 헌금을 지정할 수 있도록 [헌금 기금](funds.md)을 설정하세요
- [stripe.com](https://stripe.com)에서 Stripe 계정을 만들고 활성화하세요 (테스트 모드에서 벗어나세요)
- B1 Admin 로그인 자격 증명을 준비하세요

</div>

## Stripe 설정

1. 아직 계정이 없다면 [stripe.com](https://stripe.com)에서 계정을 만드세요. **계정을 활성화**하고 테스트 모드에서 벗어나야 합니다.
2. Stripe에서 **Developers > API Keys**로 이동합니다.
3. **Publishable Key**를 복사합니다.
4. [B1 Admin](https://admin.b1.church/)에 로그인합니다.
5. 상단 내비게이션에서 **Church**를 클릭한 다음 **Edit Church Settings**를 클릭합니다.
6. **Church Settings** 옆의 편집 아이콘을 클릭합니다.
7. **Giving** 섹션까지 아래로 스크롤합니다.
8. **Provider**를 **Stripe**로 설정합니다.
9. Publishable Key를 **Public Key** 필드에 붙여넣습니다.
10. Stripe로 돌아가서 **Secret Key**를 표시합니다 (한 번만 볼 수 있으므로 백업을 저장하세요).
11. Secret Key를 **Secret Key** 필드에 붙여넣고 **Save**를 클릭합니다.

:::warning
Stripe Secret Key는 한 번만 표시됩니다. Stripe 대시보드에서 나가기 전에 안전한 곳에 복사해 두세요. 분실한 경우 새 키를 생성해야 합니다.
:::

## B1.church 사이트에 헌금 페이지 추가

1. [b1.church](https://b1.church/)로 이동하여 로그인합니다.
2. **설정** 아이콘을 클릭합니다.
3. **탭 추가**를 클릭합니다.
4. 유형으로 **Donation**을 선택합니다.
5. 탭 이름을 입력하고 (예: "헌금") **Save**를 클릭합니다.
6. 선택적으로 탭 아이콘을 변경합니다 -- 아이콘 검색에서 "Giv"를 입력하면 헌금 관련 아이콘을 찾을 수 있습니다.

헌금 페이지가 이제 운영됩니다. 교인들은 `yoursubdomain.b1.church/donate`에서 방문할 수 있습니다.

## 헌금 링크 공유

헌금 URL을 찾으려면 **B1 Admin**에서 **설정** 아이콘을 클릭하여 서브도메인을 확인하세요. 헌금 링크는 다음 형식을 따릅니다:

`https://yoursubdomain.b1.church/donate`

이 링크를 웹사이트, 이메일 또는 주보에 공유하여 교인들이 온라인 헌금 위치를 알 수 있도록 하세요.

## 헌금 알림

Stripe는 헌금이 수신될 때마다 이메일 알림을 보냅니다. 알림 이메일 주소를 변경하려면 Stripe 대시보드에서 오른쪽 상단의 프로필을 클릭하고 **Profile**을 선택한 후 이메일 주소를 업데이트하세요.

## 수수료 처리 옵션

기부자가 선택적으로 수수료를 부담하여 교회가 전체 헌금 금액을 받을 수 있도록 헌금 페이지를 구성할 수 있습니다. 이 설정은 B1 Admin의 교회 설정에서 관리합니다.

:::tip
설정 후 교인들에게 온라인 헌금을 공지하기 전에 소액 테스트 헌금을 하여 모든 것이 올바르게 작동하는지 확인하세요.
:::

## 다음 단계

- 온라인 거래가 자동으로 동기화되지 않는 경우 [Stripe 가져오기](stripe-import.md)를 사용하여 B1 Admin으로 가져오기
- [헌금 보고서](donation-reports.md)에서 온라인 헌금이 올바르게 표시되는지 확인
- 온라인 및 오프라인 헌금을 모두 포함하는 [헌금 명세서](giving-statements.md) 생성
