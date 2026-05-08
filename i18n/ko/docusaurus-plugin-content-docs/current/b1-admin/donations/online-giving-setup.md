---
title: "온라인 헌금 설정"
---

# 온라인 헌금 설정

<div class="article-intro">

B1 Admin은 **Stripe**와 **PayPal**과 통합되어 회원들이 B1.church 사이트를 통해 온라인으로 헌금할 수 있도록 합니다. 설정 후 온라인 헌금은 수동으로 입력된 헌금과 함께 헌금 기록에 자동으로 나타나므로 모든 것이 한 시스템에 통합됩니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 기부자들이 헌금을 지정할 수 있도록 [헌금 기금](funds.md)을 설정해주세요
- [stripe.com](https://stripe.com)에서 Stripe 계정을 만들고 활성화하세요(테스트 모드 해제)
- B1 Admin 로그인 자격증명을 준비해주세요

</div>

## Stripe 설정하기

1. 아직 계정이 없다면 [stripe.com](https://stripe.com)에서 계정을 만드세요. **계정을 활성화**하고 테스트 모드를 해제했는지 확인하세요.
2. Stripe에서 **Developers > API Keys**로 이동하세요.
3. **Publishable Key**를 복사하세요.
4. [B1 Admin](https://admin.b1.church/)에 로그인하세요.
5. 상단 네비게이션에서 **Church**를 클릭한 후 **Edit Church Settings**를 클릭하세요.
6. **Church Settings** 옆의 편집 아이콘을 클릭하세요.
7. **Giving** 섹션까지 스크롤하세요.
8. **Provider**를 **Stripe**로 설정하세요.
9. Publishable Key를 **Public Key** 필드에 붙여넣으세요.
10. Stripe로 돌아가 **Secret Key**를 표시하세요(이 키는 한 번만 표시되므로 백업본을 저장하세요).
11. Secret Key를 **Secret Key** 필드에 붙여넣고 **Save**를 클릭하세요.

:::warning
Stripe Secret Key는 한 번만 표시됩니다. Stripe 대시보드에서 이동하기 전에 안전한 위치에 복사해두세요. 잃어버리면 새 키를 생성해야 합니다.
:::

## 통화 선택하기

Stripe를 공급자로 선택한 후, API 키 옆에 **Currency** 드롭다운이 나타납니다. 헌금이 정확하게 청구되도록 Stripe 계정의 결제 통화와 일치하는 통화를 선택하세요.

지원하는 통화는 USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN 및 BRL입니다. 계정의 기본 통화는 [Stripe 대시보드](https://dashboard.stripe.com/settings/currencies)에서 확인하거나 변경할 수 있습니다.

:::info
여기서 선택한 통화는 일회성 헌금, 정기 구독, 수수료 계산 및 헌금 보고서에 사용됩니다. 나중에 통화를 변경하면 새로운 헌금과 구독만 새 통화를 사용하게 되고, 기존 정기 헌금은 생성된 통화로 계속 진행됩니다.
:::

:::warning
Stripe 계정이 선택한 통화를 수락하도록 설정되어 있는지 확인하세요. Stripe 계정이 선택한 통화를 지원하지 않으면 체크아웃 시 헌금이 실패합니다.
:::

## B1.church 사이트에 헌금 페이지 추가하기

1. [b1.church](https://b1.church/)로 이동하여 로그인하세요.
2. **Settings** 아이콘을 클릭하세요.
3. **Add Tab**을 클릭하세요.
4. 유형으로 **Donation**을 선택하세요.
5. 탭의 이름을 입력하고(예: "Give") **Save**를 클릭하세요.
6. 선택적으로 탭 아이콘을 변경하세요 -- 아이콘 검색에서 "Giv"를 입력하면 헌금 관련 아이콘을 찾을 수 있습니다.

이제 헌금 페이지가 활성화되었습니다. 회원들은 yoursubdomain.b1.church/donate에서 접근할 수 있습니다.

## 헌금 링크 공유하기

헌금 URL을 찾으려면 **B1 Admin**으로 이동하여 **Settings** 아이콘을 클릭하면 서브도메인을 볼 수 있습니다. 헌금 링크의 형식은 다음과 같습니다:

https://yoursubdomain.b1.church/donate

회원들이 온라인으로 헌금할 수 있는 위치를 알 수 있도록 이 링크를 웹사이트, 이메일 또는 주보에 공유하세요.

## 헌금 알림

Stripe는 헌금을 받을 때마다 이메일 알림을 보냅니다. 알림 이메일 주소를 변경하려면 Stripe 대시보드로 이동하여 우측 상단의 프로필을 클릭하고 **Profile**을 선택한 후 이메일 주소를 업데이트하세요.

## 처리 수수료 옵션

헌금 페이지를 설정하여 기부자들이 선택적으로 처리 수수료를 부담하도록 할 수 있으므로 교회가 전액을 받게 됩니다. 이 설정은 B1 Admin의 교회 설정에서 관리됩니다.

:::tip
설정 후 작은 규모의 테스트 헌금을 하여 모든 것이 정상적으로 작동하는지 확인한 후 교인들에게 온라인 헌금을 공지하세요.
:::

## 다음 단계

- [Stripe Import](stripe-import.md)를 사용하여 자동으로 동기화되지 않는 경우 온라인 거래를 B1 Admin으로 가져오세요
- [Donation Reports](donation-reports.md)에서 온라인 헌금이 올바르게 나타나는지 확인하세요
- 온라인 및 오프라인 헌금이 포함된 [Giving Statements](giving-statements.md)를 생성하세요
