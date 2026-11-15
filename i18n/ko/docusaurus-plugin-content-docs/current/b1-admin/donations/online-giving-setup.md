---
title: "온라인 헌금 설정"
description: "Stripe, Kingdom Funding, 또는 Paystack을 B1 Admin에 연결하면 성도가 B1.church 사이트에서 온라인으로 헌금하고, 헌금이 교회의 기록에 동기화됩니다."
---

# 온라인 헌금 설정

<div class="article-intro">

B1 Admin은 **Stripe**, **Kingdom Funding**, **Paystack**(아프리카의 교회용)과 연동되어 성도가 B1.church 사이트에서 온라인으로 헌금할 수 있게 합니다. 설정이 끝나면 온라인 헌금이 직접 입력한 헌금과 함께 헌금 기록에 자동으로 나타나, 모든 것이 한 시스템에 남습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 헌금자가 헌금을 지정할 수 있도록 [헌금 기금](funds.md)을 설정하세요.
- [stripe.com](https://stripe.com)에서 Stripe 계정을 만들고 활성화하세요(테스트 모드를 해제해야 합니다).
- B1 Admin 로그인 정보를 준비하세요.

</div>

## Stripe 설정하기 {#setting-up-stripe}

1. 아직 계정이 없다면 [stripe.com](https://stripe.com)에서 계정을 만드세요. **계정을 활성화**하고 테스트 모드를 해제해야 합니다.
2. Stripe에서 **Developers > API Keys**로 이동합니다.
3. **Publishable Key**를 복사합니다.
4. [B1 Admin](https://admin.b1.church/)에 로그인합니다.
5. **Settings**로 이동하여 **Giving** 섹션을 엽니다.
6. **Giving** 섹션에서 **Edit**를 클릭합니다.
7. **Provider**를 **Stripe**로 설정합니다.
8. Publishable Key를 **Public Key** 필드에 붙여 넣습니다.
9. Stripe로 돌아가 **Secret Key**를 표시합니다(한 번만 볼 수 있으니 백업해 두세요).
10. Secret Key를 **Secret Key** 필드에 붙여 넣고 **Save**를 클릭합니다.

:::warning
Stripe Secret Key는 한 번만 표시됩니다. Stripe 대시보드를 떠나기 전에 안전한 곳에 복사해 두세요. 잃어버리면 새 키를 생성해야 합니다.
:::

## 통화 선택하기 {#choosing-your-currency}

Stripe를 제공업체로 선택하면 API 키 옆에 **Currency** 드롭다운이 나타납니다. 헌금이 올바르게 청구되도록 Stripe 계정의 정산 통화와 맞는 통화를 고르세요.

아직 통화를 저장하지 않았다면 드롭다운은 미국 달러 대신 가입 시 입력한 교회 국가의 통화로 시작합니다. 저장하기 전에 Stripe 계정과 맞는지 확인하세요.

교회가 온라인으로 헌금을 받지 않는다면 **Provider**를 **None**으로 두고 **Currency**는 그대로 고르세요. 그러면 목록에 모든 통화가 나오며 "The currency your church records gifts in."(교회가 헌금을 기록하는 통화입니다.)이라는 안내가 표시됩니다. 배치에서 직접 입력한 헌금은 그 통화로 기록되며, 헌금 합계도 그 통화로 표시됩니다.

지원되는 통화에는 USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN, BRL, PHP가 포함됩니다. 계정의 기본 통화는 [Stripe 대시보드](https://dashboard.stripe.com/settings/currencies)에서 확인하거나 바꿀 수 있습니다.

:::info
여기에서 선택한 통화는 일회성 헌금, 정기 구독, 수수료 계산, 헌금 보고서에 사용됩니다. 나중에 통화를 바꾸면 새 헌금과 구독만 새 통화를 사용하며, 기존 정기 헌금은 생성될 때의 통화를 계속 사용합니다.
:::

:::warning
Stripe 계정이 선택한 통화를 받도록 설정되어 있는지 확인하세요. Stripe 계정이 선택한 통화를 지원하지 않으면 결제 시 헌금이 실패합니다.
:::

## Apple Pay와 Google Pay {#apple-pay-and-google-pay}

Stripe를 사용하는 교회에서는 공개 헌금 페이지에 Apple Pay와 Google Pay 버튼이 자동으로 표시됩니다. 일회성 헌금의 경우 헌금자가 기금과 금액을 고르면 카드 입력란 위에 버튼이 나타나며, 헌금자의 브라우저나 기기에 지갑이 설정되어 있을 때만 표시됩니다. 정기 헌금은 여전히 카드나 은행 입력란을 사용합니다.

Google Pay는 별도의 설정이 필요 없습니다. Apple Pay는 헌금 페이지의 도메인이 Stripe에 등록되어 있어야 하며, B1은 헌금 페이지가 처음 여러분의 도메인에서 로드될 때 이를 등록합니다. iPhone에서 Apple Pay 버튼이 보이지 않으면 Stripe 대시보드에서 **Settings > Payment method domains**를 확인하고, `yoursubdomain.b1.church`(또는 사용자 지정) 도메인이 목록에 있고 인증되었는지 확인하세요.

## 익명 헌금 {#anonymous-gifts}

공개 헌금 페이지의 헌금자는 **Give anonymously**(익명으로 헌금)를 체크할 수 있습니다. 익명 헌금은 헌금자가 연결되지 않은 채로 기록되며, 헌금자가 고른 기금으로는 그대로 들어가고, 배치와 보고서에는 **Anonymous**로 표시됩니다. 영수증을 보내려면 헌금자의 이메일은 여전히 필요하지만, 사람 기록은 만들어지지 않습니다. 익명 헌금은 일회성만 가능하며, 어떤 헌금 명세서에도 나타나지 않습니다.

## 실패한 정기 헌금 {#failed-recurring-gifts}

Stripe의 정기 헌금이 실패하면(예: 만료되었거나 거절된 카드) 실패한 청구가 **Donations > Failed Gifts**에 헌금자, 금액, 날짜, 게이트웨이가 알려 준 사유와 함께 나타납니다. 헌금자가 결제 수단을 업데이트하면 **Retry**를 클릭하여 청구를 다시 시도하세요.

청구가 실패하면 B1은 헌금자에게 이메일을 보내며, 여전히 진행되지 않으면 3일과 7일 뒤에 다시 보냅니다. 이 이메일에는 B1.church에서 결제 수단을 업데이트하는 링크가 있습니다.

:::info
이 기능이 생기기 전에 교회가 Stripe를 설정했다면 **Settings** > **Giving**을 열고 편집을 클릭한 뒤 한 번 **Save**를 클릭하세요. 그러면 Stripe 웹훅이 새로고침되어 실패한 청구가 B1에 보고됩니다.
:::

## B1.church 사이트에 헌금 페이지 추가하기 {#adding-a-donation-page-to-your-b1church-site}

1. [b1.church](https://b1.church/)로 가서 로그인합니다.
2. **Settings** 아이콘을 클릭합니다.
3. **Add Tab**을 클릭합니다.
4. 유형으로 **Donation**을 고릅니다.
5. 탭 이름을 입력합니다(예: "Give")하고 **Save**를 클릭합니다.
6. 선택 사항으로 탭 아이콘을 바꿀 수 있습니다. 아이콘 검색에 "Giv"를 입력하면 헌금과 관련된 아이콘이 나타납니다.

이제 헌금 페이지가 공개되었습니다. 성도는 `yoursubdomain.b1.church/donate`에서 헌금 페이지를 방문할 수 있습니다.

## 헌금 링크 공유하기 {#sharing-your-giving-link}

헌금 URL을 찾으려면 **B1 Admin**으로 가서 **Settings** 아이콘을 클릭하여 서브도메인을 확인하세요. 헌금 링크는 다음 형식입니다.

`https://yoursubdomain.b1.church/donate`

이 링크를 웹사이트, 이메일, 주보에 공유하여 성도가 온라인으로 어디에 헌금하면 되는지 알 수 있게 하세요.

### 기금과 금액이 미리 설정된 링크 {#links-with-a-preset-fund-and-amount}

헌금자를 특정 기금으로 바로 안내하려면 **Donations > Funds**로 가서 해당 기금의 **Giving Link**를 클릭하세요. 선택 사항으로 금액을 입력한 뒤 링크를 복사합니다. 대화상자에는 같은 링크의 QR 코드도 표시되며, **Download PNG**를 클릭하면 주보, 슬라이드, 포스터용으로 저장할 수 있습니다. 헌금자가 링크를 열거나 코드를 스캔하면 헌금 페이지에서 기금과 금액이 이미 선택되어 있습니다. 링크 형식은 다음과 같습니다.

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

같은 매개변수는 웹사이트 빌더의 **Donate Link** 요소에서도 작동합니다.

## 헌금 알림 {#donation-notifications}

Stripe는 헌금이 들어올 때마다 이메일 알림을 보냅니다. 알림 이메일 주소를 바꾸려면 Stripe 대시보드에서 오른쪽 상단의 프로필을 클릭하고 **Profile**을 선택한 뒤 이메일 주소를 업데이트하세요.

## 처리 수수료 옵션 {#processing-fee-options}

헌금자가 처리 수수료를 선택적으로 부담하게 하면 교회는 헌금 금액 전액을 받을 수 있습니다. **Settings > Giving**에서 편집을 클릭하고 키 옆의 **Transaction Fee** 스위치를 켜세요. 수수료 계산에 사용되는 비율은 **Fees & statements** 아래에 있습니다. 카드의 경우 **Flat Rate**와 **Transaction Fee**이며, Stripe 은행(ACH) 헌금의 경우 백분율과 **Hard limit**입니다. 기본값은 제공업체의 표준 요율이며, 협상한 요율이 다르면 바꾼 뒤 **Save**를 클릭하세요.

:::tip
설정이 끝나면 교회 전체에 온라인 헌금을 알리기 전에 소액 테스트 헌금을 해서 모든 것이 작동하는지 확인하세요.
:::

## Kingdom Funding 설정하기 {#setting-up-kingdom-funding}

Kingdom Funding은 신용/직불카드와 ACH 은행 이체를 지원하는 기독교 결제 처리 업체입니다. 교회가 Kingdom Funding에 가입되어 있다면 헌금 게이트웨이로 연결할 수 있습니다.

:::info
Kingdom Funding 연동은 현재 베타 단계입니다. 교회에서 사용하려면 B1 담당자에게 문의하여 활성화하세요.
:::

1. [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply)에서 가입하거나 로그인합니다.
2. Kingdom Funding 대시보드에서 **Tokenization Key**와 **Source Key**를 받습니다.
3. B1 Admin에서 **Settings**로 이동하여 **Giving** 섹션을 열고 편집을 클릭합니다.
4. **Provider**를 **Kingdom Funding**으로 설정합니다.
5. 키를 **Tokenization Key**와 **Source Key** 필드에 붙여 넣습니다.
6. **Webhook Key**(Kingdom Funding 관리 패널의 웹훅 서명 비밀키)를 입력하고, 제공업체 아래에 표시된 웹훅 URL을 복사하여 Kingdom Funding 설정에 붙여 넣으면 Kingdom Funding이 완료된 거래를 B1에 알릴 수 있습니다.
7. **Save**를 클릭합니다.

연결이 끝나면 성도는 헌금 페이지에서 카드/은행 전환 버튼을 보고, 신용카드 또는 ACH 이체로 헌금할 수 있습니다.

## PayPal과 Venmo 버튼 {#paypal-and-venmo-buttons}

PayPal은 새로 설정하는 교회의 **Provider** 목록에서 더 이상 제공되지 않습니다. 이미 **PayPal**을 연결한 교회에서는 헌금 페이지의 카드 입력란 위에 일회성 헌금용 **PayPal** 및 **Venmo** 버튼이 표시됩니다. 버튼을 클릭한 헌금자는 PayPal 창에서 결제를 마치며, 헌금은 다른 온라인 헌금과 같이 기록됩니다. Venmo는 PayPal이 자격이 있다고 판단한 기기에서 미국의 헌금자에게만 표시됩니다. 정기 헌금은 여전히 카드 입력란을 사용합니다.

## Paystack 설정하기(아프리카) {#setting-up-paystack-africa}

Stripe는 가나, 나이지리아, 케냐, 남아프리카공화국, 코트디부아르의 교회에 계정을 열어 주지 않습니다. [Paystack](https://paystack.com)은 계정을 열어 주며, 현지 카드, **모바일 머니**(MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), 은행 이체, USSD를 받습니다. 헌금자는 현지 통화(GHS, NGN, KES, ZAR, XOF)로 결제합니다.

1. 교회의 사업자 등록증과 현지 은행 계좌로 [paystack.com](https://paystack.com)에 등록하고, Paystack의 활성화(실제 운영 전환) 심사를 완료하세요.
2. Paystack 대시보드에서 **Settings → API Keys & Webhooks**를 열고 **Public Key**와 **Secret Key**를 복사합니다(테스트 키가 아닌 실제 키를 사용하세요).
3. B1 Admin에서 **Settings**로 이동하여 **Giving** 섹션을 열고 편집을 클릭합니다.
4. **Provider**를 **Paystack**으로 설정하고, Public Key와 Secret Key를 붙여 넣은 뒤 **Currency**를 고릅니다.
5. 제공업체 아래에 표시된 **webhook URL**을 복사하고, Paystack 대시보드(**Settings → API Keys & Webhooks**)로 돌아가 **Webhook URL** 필드에 붙여 넣습니다. 정기 헌금과 모바일 머니 결제가 이렇게 기록됩니다.
6. 저장합니다.

헌금자는 안전한 Paystack 창에서 결제를 마치며, 그 창에서 카드, 모바일 머니, 은행 이체 중 하나를 고를 수 있습니다. 참고 사항은 다음과 같습니다.

- **정기 헌금**에는 카드가 필요합니다. 모바일 머니는 자동으로 다시 청구할 수 없으므로, Paystack은 모바일 머니 헌금을 일회성으로만 허용합니다.
- Paystack 정기 헌금은 B1에서 취소할 수 있지만 일시 정지하거나 편집할 수는 없습니다. 금액을 바꾸려면 취소한 뒤 새로 만드세요.
- **처리 수수료** 기본값은 통화에 대한 Paystack의 현지 카드 요율을 반영합니다. 협상한 요율이 다르면 편집하세요.

## 다음 단계 {#next-steps}

- 온라인 헌금이 자동으로 동기화되지 않으면 [Stripe 가져오기](stripe-import.md)로 B1 Admin에 온라인 거래를 가져오세요.
- [헌금 보고서](donation-reports.md)에서 온라인 헌금이 올바르게 나타나는지 확인하세요.
- 온라인과 오프라인 헌금을 모두 포함하는 [헌금 명세서](giving-statements.md)를 생성하세요.
