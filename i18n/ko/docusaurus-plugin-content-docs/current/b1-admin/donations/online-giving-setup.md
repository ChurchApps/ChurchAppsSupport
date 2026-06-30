---
title: "온라인 헌금 설정"
---

# 온라인 헌금 설정

<div class="article-intro">

B1 Admin은 **Stripe**, **PayPal**, **Kingdom Funding**과 통합되어 교인들이 B1.church 사이트를 통해 온라인으로 헌금할 수 있습니다. 설정이 완료되면 온라인 헌금은 수동으로 입력된 선물과 함께 자동으로 헌금 기록에 나타나 모든 것이 한 시스템에서 관리됩니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- [헌금 기금](funds.md)을 설정하여 기증자들이 자신의 헌금을 지정할 수 있도록 합니다
- [stripe.com](https://stripe.com)에서 Stripe 계정을 만들고 활성화합니다(테스트 모드 해제)
- B1 Admin 로그인 자격증명을 준비합니다

</div>

## Stripe 설정

1. 아직 계정이 없으면 [stripe.com](https://stripe.com)에서 계정을 만듭니다. **계정을 활성화하고** 테스트 모드를 해제했는지 확인합니다.
2. Stripe에서 **Developers > API Keys**로 이동합니다.
3. **Publishable Key**를 복사합니다.
4. [B1 Admin](https://admin.b1.church/)에 로그인합니다.
5. 상단 네비게이션에서 **Church**를 클릭한 후 **Edit Church Settings**를 클릭합니다.
6. **Church Settings** 옆의 편집 아이콘을 클릭합니다.
7. **Giving** 섹션까지 아래로 스크롤합니다.
8. **Provider**를 **Stripe**로 설정합니다.
9. Publishable Key를 **Public Key** 필드에 붙여넣습니다.
10. Stripe로 돌아가 **Secret Key**를 표시합니다(이는 한 번만 볼 수 있으므로 백업을 저장합니다).
11. Secret Key를 **Secret Key** 필드에 붙여넣고 **Save**를 클릭합니다.

:::warning
Stripe Secret Key는 한 번만 표시됩니다. Stripe 대시보드에서 나가기 전에 안전한 위치에 복사해 두십시오. 잃어버리면 새 키를 생성해야 합니다.
:::

## 통화 선택

Stripe를 공급자로 선택한 후, API 키 옆에 **Currency** 드롭다운이 나타납니다. Stripe 계정의 결제 통화와 일치하는 통화를 선택하여 헌금이 올바르게 청구되도록 합니다.

지원되는 통화는 USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN, BRL입니다. [Stripe Dashboard](https://dashboard.stripe.com/settings/currencies)에서 계정의 기본 통화를 확인하거나 변경할 수 있습니다.

:::info
여기서 선택한 통화는 일회성 헌금, 반복 구독, 수수료 계산 및 헌금 보고서에 사용됩니다. 나중에 통화를 변경하면 새로운 헌금과 구독만 새 통화를 사용합니다. 기존의 반복 선물은 생성되었던 통화로 계속 진행됩니다.
:::

:::warning
선택한 통화를 수락하도록 Stripe 계정이 구성되었는지 확인합니다. Stripe 계정이 선택한 통화를 지원하지 않으면 체크아웃 시 헌금이 실패합니다.
:::

## B1.church 사이트에 헌금 페이지 추가

1. [b1.church](https://b1.church/)로 이동하여 로그인합니다.
2. **Settings** 아이콘을 클릭합니다.
3. **Add Tab**을 클릭합니다.
4. 유형으로 **Donation**을 선택합니다.
5. 탭의 이름을 입력합니다(예: "Give"). **Save**를 클릭합니다.
6. 선택적으로 탭 아이콘을 변경합니다 -- 아이콘 검색에서 "Giv"를 입력하여 기부 관련 아이콘을 찾습니다.

이제 헌금 페이지가 실시간으로 운영됩니다. 교인들은 `yoursubdomain.b1.church/donate`에서 액세스할 수 있습니다.

## 헌금 링크 공유

헌금 URL을 찾으려면 **B1 Admin**으로 이동하여 **Settings** 아이콘을 클릭하여 서브도메인을 확인합니다. 헌금 링크는 다음 형식을 따릅니다:

`https://yoursubdomain.b1.church/donate`

웹사이트, 이메일 또는 주보에서 이 링크를 공유하여 교인들이 온라인 헌금 장소를 알 수 있도록 합니다.

## 헌금 알림

Stripe는 헌금이 수령될 때마다 이메일 알림을 보냅니다. 알림 이메일 주소를 변경하려면 Stripe 대시보드로 이동하여 오른쪽 상단의 프로필을 클릭하고 **Profile**을 선택한 후 이메일 주소를 업데이트합니다.

## 처리 수수료 옵션

기증자들이 처리 수수료를 선택적으로 부담하도록 헌금 페이지를 구성하여 교회가 전체 헌금을 받을 수 있도록 할 수 있습니다. 이 설정은 B1 Admin 내의 교회 설정에서 관리됩니다.

:::tip
설정 후 교회에 온라인 헌금을 공지하기 전에 작은 시험 헌금을 해서 모든 것이 작동하는지 확인합니다.
:::

## Kingdom Funding 설정

Kingdom Funding은 신용/직불 카드 및 ACH 은행 이체를 지원하는 기독교 결제 처리업체입니다. 교회가 Kingdom Funding에 등록되어 있으면 이를 헌금 게이트웨이로 연결할 수 있습니다.

:::info
Kingdom Funding 통합은 현재 베타 버전입니다. 교회에 이를 활성화하려면 B1 계정 담당자에게 문의하십시오.
:::

1. [kingdomfunding.org](https://kingdomfunding.org)에서 가입하거나 로그인합니다.
2. Kingdom Funding 머천트 포털에서 **Security Key**(공개)와 **Private Key**를 얻습니다.
3. B1 Admin에서 **Settings**로 이동하여 **Church Settings**를 엽니다.
4. **Giving** 섹션에서 **Provider**를 **Kingdom Funding**으로 설정합니다.
5. Security Key를 **Security Key** 필드에, Private Key를 **Private Key** 필드에 붙여넣습니다.
6. Kingdom Funding에서 받은 **Webhook Key**를 설정하고, 표시되는 웹훅 URL을 Kingdom Funding 머천트 설정에 복사하여 Kingdom Funding이 완료된 거래를 B1에 알릴 수 있도록 합니다.
7. 저장합니다.

연결되면 교인들은 헌금 페이지에서 카드/은행 토글을 보고 신용 카드 또는 ACH 이체로 헌금할 수 있습니다.

## 다음 단계

- [Stripe Import](stripe-import.md)를 사용하여 자동으로 동기화되지 않는 경우 온라인 거래를 B1 Admin으로 가져옵니다
- [Donation Reports](donation-reports.md)를 확인하여 온라인 헌금이 올바르게 나타나는지 확인합니다
- 온라인과 오프라인 헌금을 모두 포함하는 [Giving Statements](giving-statements.md)를 생성합니다
