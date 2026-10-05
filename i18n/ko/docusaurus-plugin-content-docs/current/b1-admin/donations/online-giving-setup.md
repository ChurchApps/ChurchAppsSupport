---
title: "온라인 기부 설정"
---

# 온라인 기부 설정

<div class="article-intro">

B1 Admin은 **Stripe**, **PayPal**, **Kingdom Funding**, 그리고 **Paystack**(아프리카의 교회)과 통합되어 교인들이 B1.church 사이트를 통해 온라인으로 기부할 수 있습니다. 설정이 완료되면 온라인 기부가 자동으로 수동으로 입력한 헌금과 함께 기부 기록에 나타나 모든 것이 하나의 시스템에 유지됩니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 기부자들이 헌금을 지정할 수 있도록 [기부 기금](funds.md)을 설정합니다
- [stripe.com](https://stripe.com)에서 Stripe 계정을 만들고 활성화합니다(테스트 모드에서 벗어남)
- B1 Admin 로그인 자격 증명을 준비합니다

</div>

## Stripe 설정

1. [stripe.com](https://stripe.com)에서 계정을 만듭니다(아직 없는 경우). **계정을 활성화**하고 테스트 모드에서 벗어나야 합니다.
2. Stripe에서 **Developers > API Keys**로 이동합니다.
3. **Publishable Key**를 복사합니다.
4. [B1 Admin](https://admin.b1.church/)에 로그인합니다.
5. **Settings**로 이동하고 **Giving** 섹션을 엽니다.
6. **Giving** 섹션의 편집 아이콘을 클릭합니다.
7. **Provider**를 **Stripe**로 설정합니다.
8. Publishable Key를 **Public Key** 필드에 붙여넣습니다.
9. Stripe로 돌아가 **Secret Key**를 표시합니다(이것은 한 번만 볼 수 있으므로 백업을 저장합니다).
10. Secret Key를 **Secret Key** 필드에 붙여넣고 **Save**를 클릭합니다.

:::warning
당신의 Stripe Secret Key는 한 번만 표시됩니다. Stripe 대시보드에서 벗어나기 전에 안전한 위치에 복사하십시오. 잃어버린 경우 새 키를 생성해야 합니다.
:::

## 통화 선택

Stripe를 제공자로 선택한 후 **Currency** 드롭다운이 API 키 옆에 나타납니다. Stripe 계정의 결제 통화와 일치하는 통화를 선택하여 기부가 올바르게 청구되는지 확인합니다.

지원되는 통화에는 USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN 및 BRL이 포함됩니다. [Stripe Dashboard](https://dashboard.stripe.com/settings/currencies)에서 계정의 기본 통화를 확인하거나 변경할 수 있습니다.

:::info
여기서 선택하는 통화는 일회성 기부, 정기적 구독, 수수료 계산 및 기부 보고서에 사용됩니다. 나중에 통화를 전환하면 새로운 기부와 구독만 새 통화를 사용합니다. 기존 정기적 헌금은 생성된 통화로 계속됩니다.
:::

:::warning
Stripe 계정이 선택한 통화를 수락하도록 구성되어 있는지 확인합니다. Stripe 계정이 선택한 통화를 지원하지 않으면 체크아웃 시 기부가 실패합니다.
:::

## Apple Pay 및 Google Pay

Stripe를 사용하는 교회는 공개 기부 페이지에서 자동으로 Apple Pay 및 Google Pay 버튼을 받습니다. 버튼은 기부자가 기금과 금액을 선택한 후 일회성 헌금에 대한 카드 필드 위에 나타나며 기부자의 브라우저 또는 장치에 지갑이 설정되어 있을 때만 나타납니다. 정기적 헌금은 여전히 카드 또는 은행 필드를 사용합니다.

Google Pay는 설정이 필요하지 않습니다. Apple Pay는 기부 페이지의 도메인이 Stripe에 등록되어야 합니다. B1은 기부 페이지가 도메인에서 처음 로드될 때 등록합니다. Apple Pay 버튼이 iPhone에 나타나지 않으면 Stripe Dashboard의 **Settings > Payment method domains**를 확인하고 `yoursubdomain.b1.church`(또는 사용자 지정) 도메인이 나열되어 있고 확인되었는지 확인합니다.

## 익명 기부

공개 기부 페이지의 기부자는 **Give anonymously**를 확인할 수 있습니다. 익명 기부는 기부자가 첨부되지 않은 상태로 기록되며 기부자가 선택한 기금으로 이동하고 배치 및 보고서에 **Anonymous**로 표시됩니다. 기부자의 이메일은 여전히 필수이므로 영수증을 보낼 수 있지만 사람 기록은 생성되지 않습니다. 익명 기부는 일회성만 가능하며 기부 명세서에 나타나지 않습니다.

## 실패한 정기 기부

Stripe에서 정기적 헌금이 실패할 때(예: 만료되었거나 거부된 카드), 실패한 청구가 **Donations > Failed Gifts**에 기부자, 금액, 날짜 및 게이트웨이가 제공한 이유와 함께 나타납니다. **Retry**를 클릭하여 기부자가 결제 방법을 업데이트한 후 청구를 다시 시도합니다.

B1은 또한 청구가 실패할 때 기부자에게 이메일을 보내고 3일과 7일 후에도 여전히 진행되지 않았으면 B1.church에서 결제 방법을 업데이트할 수 있는 링크와 함께 다시 보냅니다.

:::info
교회가 이 기능이 존재하기 전에 Stripe를 설정한 경우 **Settings** > **Giving**을 열고 편집을 클릭한 후 **Save**를 한 번 클릭합니다. 이것은 실패한 청구가 B1에 보고되도록 Stripe 웹훅을 새로 고칩니다.
:::

## B1.church 사이트에 기부 페이지 추가

1. [b1.church](https://b1.church/)로 이동하여 로그인합니다.
2. **Settings** 아이콘을 클릭합니다.
3. **Add Tab**을 클릭합니다.
4. **Donation**을 유형으로 선택합니다.
5. 탭의 이름을 입력하고(예: "Give") **Save**를 클릭합니다.
6. 선택적으로 탭 아이콘을 변경합니다. 아이콘 검색에 "Giv"를 입력하여 기부 관련 아이콘을 찾습니다.

기부 페이지가 이제 라이브 상태입니다. 교인들은 `yoursubdomain.b1.church/donate`에서 방문할 수 있습니다.

## 기부 링크 공유

기부 URL을 찾으려면 **B1 Admin**으로 이동하여 **Settings** 아이콘을 클릭하여 하위 도메인을 확인합니다. 기부 링크는 다음 형식을 따릅니다:

`https://yoursubdomain.b1.church/donate`

이 링크를 웹사이트, 이메일 또는 게시판에 공유하여 교인들이 온라인으로 기부할 수 있는 위치를 알 수 있도록 합니다.

### 사전 설정된 기금 및 금액이 있는 링크

기부자를 특정 기금으로 직접 보내려면 **Donations > Funds**로 이동하여 기금의 **Giving Link**를 클릭합니다. 선택적으로 금액을 입력한 후 링크를 복사합니다. 기부자가 열면 기금과 금액이 이미 기부 페이지에서 선택되어 있습니다. 링크는 다음 형식을 취합니다:

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

동일한 매개변수가 웹사이트 빌더의 **Donate Link** 요소에서 작동합니다.

## 기부 알림

Stripe는 기부가 수신될 때마다 이메일 알림을 보냅니다. 알림 이메일 주소를 변경하려면 Stripe 대시보드로 이동하여 오른쪽 상단의 프로필을 클릭하고 **Profile**을 선택한 후 이메일 주소를 업데이트합니다.

## 처리 수수료 옵션

기부 페이지를 구성하여 기부자들이 선택적으로 처리 수수료를 부담할 수 있도록 하여 교회가 전체 기부 금액을 받을 수 있습니다. 이 설정은 B1 Admin의 교회 설정에서 관리됩니다.

:::tip
설정 후 교중에 온라인 기부를 발표하기 전에 작은 테스트 기부를 하여 모든 것이 작동하는지 확인합니다.
:::

## Kingdom Funding 설정

Kingdom Funding은 신용/직불 카드 및 ACH 은행 이체를 지원하는 기독교 결제 처리자입니다. 교회가 Kingdom Funding에 등록되어 있으면 기부 게이트웨이로 연결할 수 있습니다.

:::info
Kingdom Funding 통합은 현재 베타 버전입니다. 교회에 대해 활성화하려면 B1 계정 담당자에게 문의합니다.
:::

1. [kingdomfunding.org](https://kingdomfunding.org)에서 가입하거나 로그인합니다.
2. Kingdom Funding 판매자 포털에서 **Security Key**(공개) 및 **Private Key**를 얻습니다.
3. B1 Admin에서 **Settings**로 이동하고 **Giving** 섹션을 열고 편집을 클릭합니다.
4. **Provider**를 **Kingdom Funding**으로 설정합니다.
5. Security Key를 **Security Key** 필드에 붙여넣고 Private Key를 **Private Key** 필드에 붙여넣습니다.
6. Kingdom Funding에서 받은 **Webhook Key**를 설정하고 표시된 웹훅 URL을 Kingdom Funding 판매자 설정에 복사하여 Kingdom Funding이 완료된 거래를 B1에 알릴 수 있습니다.
7. 저장합니다.

연결되면 교인들은 기부 페이지에서 카드/은행 토글을 보고 신용 카드 또는 ACH 이체로 기부할 수 있습니다.

## PayPal 및 Venmo 버튼

**PayPal**을 공급자로 사용하는 교회는 일회성 헌금의 기부 페이지 카드 필드 위에 **PayPal** 및 **Venmo** 버튼을 받습니다. 클릭하는 기부자는 PayPal 창에서 결제를 완료하고 기부는 다른 온라인 기부처럼 기록됩니다. Venmo는 미국의 기부자와 PayPal이 적합하다고 간주하는 장치에서만 나타납니다. 정기적 헌금은 여전히 카드 필드를 사용합니다.

## Paystack(아프리카) 설정

Stripe는 가나, 나이지리아, 케냐, 남아프리카 또는 코트디부아르의 교회에 대한 계정을 열지 않습니다. [Paystack](https://paystack.com)은 열며 현지 카드, **mobile money**(MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), 은행 이체 및 USSD를 수락합니다. 기부자들은 현지 통화(GHS, NGN, KES, ZAR, XOF)로 기부합니다.

1. 교회의 사업 등록 증명서 및 현지 은행 계좌로 [paystack.com](https://paystack.com)에 등록하고 Paystack의 활성화(go-live) 검토를 완료합니다.
2. Paystack Dashboard에서 **Settings → API Keys & Webhooks**를 열고 **Public Key** 및 **Secret Key**(테스트 키가 아닌 라이브 키 사용)를 복사합니다.
3. B1 Admin에서 **Settings**로 이동하고 **Giving** 섹션을 열고 편집을 클릭합니다.
4. **Provider**를 **Paystack**으로 설정하고 Public Key 및 Secret Key를 붙여넣고 **Currency**를 선택합니다.
5. 공급자 아래에 표시된 **webhook URL**을 복사하고 Paystack Dashboard(**Settings → API Keys & Webhooks**)로 돌아가 **Webhook URL** 필드에 붙여넣습니다. 이것이 정기적 헌금과 모바일 머니 기부가 기록되는 방식입니다.
6. 저장합니다.

기부자들은 안전한 Paystack 창에서 결제를 완료하고 카드, 모바일 머니 또는 은행 이체를 선택할 수 있습니다. 참고:

- **정기적 헌금**은 카드가 필요합니다. 모바일 머니는 자동으로 다시 청구될 수 없으므로 Paystack은 일회성 모바일 머니 기부만 허용합니다.
- Paystack 정기적 헌금은 B1에서 취소할 수 있지만 일시 중지하거나 편집할 수 없습니다. 취소하고 새로 만들어 금액을 변경합니다.
- **Processing Fee** 기본값은 통화에 대한 Paystack의 현지 카드 요금을 반영합니다. 협상된 요금이 다르면 편집합니다.

## 다음 단계

- [Stripe Import](stripe-import.md)를 사용하여 자동으로 동기화되지 않는 경우 온라인 거래를 B1 Admin으로 가져옵니다
- [Donation Reports](donation-reports.md)를 확인하여 온라인 기부가 올바르게 나타나고 있는지 확인합니다
- 온라인 및 오프라인 기부를 모두 포함하는 [Giving Statements](giving-statements.md)를 생성합니다
