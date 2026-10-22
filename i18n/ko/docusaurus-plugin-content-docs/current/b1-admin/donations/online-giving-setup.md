---
title: "온라인 헌금 설정"
---

# 온라인 헌금 설정 {#online-giving-setup}

<div class="article-intro">

B1 Admin은 **Stripe**, **PayPal**, **Kingdom Funding**, **Paystack**(아프리카 교회용)과 연동되어, 회원이 B1.church 사이트를 통해 온라인으로 헌금할 수 있게 해 줍니다. 설정을 마치면 온라인 헌금이 수기로 입력한 헌금과 함께 헌금 기록에 자동으로 나타나므로, 모든 것을 한 시스템에서 관리할 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 헌금자가 헌금의 용도를 지정할 수 있도록 [헌금 재정 항목](funds.md)을 설정하세요
- [stripe.com](https://stripe.com)에서 Stripe 계정을 만들고 활성화하세요(테스트 모드를 해제합니다)
- B1 Admin 로그인 정보를 준비해 두세요

</div>

## Stripe 설정하기 {#setting-up-stripe}

1. 아직 계정이 없다면 [stripe.com](https://stripe.com)에서 계정을 만드세요. 반드시 **계정을 활성화**하고 테스트 모드를 해제하세요.
2. Stripe에서 **Developers > API Keys**로 이동합니다.
3. **Publishable Key**를 복사합니다.
4. [B1 Admin](https://admin.b1.church/)에 로그인합니다.
5. **설정**으로 이동하여 **헌금** 섹션을 엽니다.
6. **헌금** 섹션에서 **편집**을 클릭합니다.
7. **제공업체**를 **Stripe**로 설정합니다.
8. Publishable Key를 **공개 키** 입력란에 붙여 넣습니다.
9. Stripe로 돌아가 **Secret Key**를 표시합니다(한 번만 볼 수 있으므로 백업을 보관해 두세요).
10. Secret Key를 **Secret Key** 입력란에 붙여 넣고 **저장**을 클릭합니다.

:::warning
Stripe Secret Key는 한 번만 표시됩니다. Stripe 대시보드를 벗어나기 전에 안전한 곳에 복사해 두세요. 잃어버리면 새 키를 생성해야 합니다.
:::

## 통화 선택하기 {#choosing-your-currency}

Stripe를 제공업체로 선택하면 API 키 옆에 **통화** 드롭다운이 나타납니다. 헌금이 올바르게 청구되도록 Stripe 계정의 정산 통화와 일치하는 통화를 고르세요.

지원되는 통화는 USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN, BRL입니다. 계정의 기본 통화는 [Stripe 대시보드](https://dashboard.stripe.com/settings/currencies)에서 확인하거나 변경할 수 있습니다.

:::info
여기서 선택한 통화는 일회성 헌금, 정기 구독, 수수료 계산, 헌금 보고서에 사용됩니다. 나중에 통화를 바꾸면 새 헌금과 구독에만 새 통화가 적용됩니다. 기존 정기 헌금은 생성될 때의 통화를 계속 사용합니다.
:::

:::warning
Stripe 계정이 선택한 통화를 받도록 설정되어 있는지 확인하세요. Stripe 계정이 선택한 통화를 지원하지 않으면 결제 시 헌금이 실패합니다.
:::

## Apple Pay와 Google Pay {#apple-pay-and-google-pay}

Stripe를 사용하는 교회는 공개 헌금 페이지에 Apple Pay와 Google Pay 버튼이 자동으로 나타납니다. 일회성 헌금의 경우 헌금자가 재정 항목과 금액을 선택하면 카드 입력란 위에 버튼이 나타나며, 헌금자의 브라우저나 기기에 지갑이 설정되어 있을 때만 표시됩니다. 정기 헌금은 여전히 카드나 은행 입력란을 사용합니다.

Google Pay는 별도의 설정이 필요 없습니다. Apple Pay는 헌금 페이지의 도메인이 Stripe에 등록되어 있어야 하며, B1은 도메인에서 헌금 페이지가 처음 로드될 때 이를 등록합니다. iPhone에서 Apple Pay 버튼이 보이지 않는다면 Stripe 대시보드의 **Settings > Payment method domains**를 확인하고, `yoursubdomain.b1.church`(또는 사용자 지정) 도메인이 목록에 있고 확인되었는지 살펴보세요.

## 익명 헌금 {#anonymous-gifts}

공개 헌금 페이지의 헌금자는 **익명으로 헌금**을 체크할 수 있습니다. 익명 헌금은 헌금자가 연결되지 않은 채 기록되며, 헌금자가 선택한 재정 항목으로 여전히 들어가고, 배치와 보고서에 **익명**으로 표시됩니다. 영수증을 보내기 위해 헌금자의 이메일은 여전히 필요하지만, 사람 기록은 만들어지지 않습니다. 익명 헌금은 일회성만 가능하며 어떤 헌금 명세서에도 나타나지 않습니다.

## 실패한 정기 헌금 {#failed-recurring-gifts}

Stripe의 정기 헌금이 실패하면(예: 만료되었거나 거절된 카드), 실패한 결제는 **헌금 > 실패한 헌금**에 헌금자, 금액, 날짜, 결제 게이트웨이가 알려 준 사유와 함께 나타납니다. 헌금자가 결제 수단을 업데이트한 후 **다시 시도**를 클릭하면 결제를 다시 시도합니다.

B1은 결제가 실패하면 헌금자에게 이메일을 보내며, 여전히 결제가 완료되지 않았다면 3일 후와 7일 후에 다시 보냅니다. 이 이메일에는 B1.church에서 결제 수단을 업데이트할 수 있는 링크가 포함됩니다.

:::info
이 기능이 생기기 전에 교회가 Stripe를 설정했다면, **설정** > **헌금**을 열고 편집을 클릭한 다음 **저장**을 한 번 클릭하세요. 그러면 Stripe 웹훅이 새로 고쳐져 실패한 결제가 B1에 보고됩니다.
:::

## B1.church 사이트에 헌금 페이지 추가하기 {#adding-a-donation-page-to-your-b1church-site}

1. [b1.church](https://b1.church/)에 방문하여 로그인합니다.
2. **설정** 아이콘을 클릭합니다.
3. **탭 추가**를 클릭합니다.
4. 유형으로 **헌금**을 선택합니다.
5. 탭 이름(예: "헌금하기")을 입력하고 **저장**을 클릭합니다.
6. 원하면 탭 아이콘을 바꿉니다. 아이콘 검색에 "Giv"를 입력하면 헌금과 관련된 아이콘을 찾을 수 있습니다.

이제 헌금 페이지가 공개되었습니다. 회원은 `yoursubdomain.b1.church/donate`에서 페이지를 방문할 수 있습니다.

## 헌금 링크 공유하기 {#sharing-your-giving-link}

헌금 URL을 찾으려면 **B1 Admin**으로 가서 **설정** 아이콘을 클릭하여 서브도메인을 확인하세요. 헌금 링크는 다음 형식을 따릅니다.

`https://yoursubdomain.b1.church/donate`

이 링크를 웹사이트, 이메일, 주보에 공유하여 회원이 온라인으로 어디에 헌금하면 되는지 알 수 있게 하세요.

### 재정 항목과 금액을 미리 지정한 링크 {#links-with-a-preset-fund-and-amount}

헌금자를 특정 재정 항목으로 바로 안내하려면 **헌금 > 재정 항목**으로 가서 해당 항목의 **헌금 링크**를 클릭하세요. 원하면 금액을 입력한 다음 링크를 복사합니다. 헌금자가 링크를 열면 헌금 페이지에서 재정 항목과 금액이 이미 선택되어 있습니다. 링크는 다음 형식입니다.

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

같은 매개변수는 웹사이트 빌더의 **헌금 링크** 요소에서도 사용할 수 있습니다.

## 헌금 알림 {#donation-notifications}

Stripe는 헌금이 들어올 때마다 이메일 알림을 보냅니다. 알림 이메일 주소를 바꾸려면 Stripe 대시보드에서 오른쪽 상단의 프로필을 클릭하고 **Profile**을 선택한 다음 이메일 주소를 업데이트하세요.

## 처리 수수료 옵션 {#processing-fee-options}

헌금 페이지를 설정하여 헌금자가 원하면 처리 수수료를 부담하도록 할 수 있으며, 그러면 교회는 헌금 전액을 받게 됩니다. 이 설정은 B1 Admin의 교회 설정에서 관리합니다.

:::tip
설정을 마친 후에는 온라인 헌금을 회중에게 알리기 전에 소액 테스트 헌금을 보내 모든 것이 정상적으로 작동하는지 확인하세요.
:::

## Kingdom Funding 설정하기 {#setting-up-kingdom-funding}

Kingdom Funding은 신용/체크카드와 ACH 은행 이체를 지원하는 기독교 결제 처리업체입니다. 교회가 Kingdom Funding에 가입되어 있다면 이를 헌금 게이트웨이로 연결할 수 있습니다.

:::info
Kingdom Funding 연동은 현재 베타 버전입니다. 교회에서 이를 사용하려면 B1 담당자에게 문의하여 활성화하세요.
:::

1. [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply)에서 가입하거나 로그인합니다.
2. Kingdom Funding 가맹점 포털에서 **Security Key**(공개)와 **Private Key**를 확인합니다.
3. B1 Admin에서 **설정**으로 이동하여 **헌금** 섹션을 열고 편집을 클릭합니다.
4. **제공업체**를 **Kingdom Funding**으로 설정합니다.
5. Security Key를 **Security Key** 입력란에, Private Key를 **Private Key** 입력란에 붙여 넣습니다.
6. Kingdom Funding에서 받은 **Webhook Key**를 설정하고, 표시된 웹훅 URL을 복사하여 Kingdom Funding 가맹점 설정에 붙여 넣으세요. 그래야 Kingdom Funding이 완료된 거래를 B1에 알릴 수 있습니다.
7. 저장합니다.

연결되면 회원은 헌금 페이지에서 카드/은행 전환 버튼을 보고, 신용카드나 ACH 이체로 헌금할 수 있습니다.

## PayPal과 Venmo 버튼 {#paypal-and-venmo-buttons}

제공업체로 **PayPal**을 사용하는 교회는 헌금 페이지의 카드 입력란 위에 일회성 헌금을 위한 **PayPal**과 **Venmo** 버튼이 나타납니다. 이 버튼을 클릭한 헌금자는 PayPal 창에서 결제를 완료하며, 헌금은 다른 온라인 헌금과 똑같이 기록됩니다. Venmo는 미국의 헌금자가 PayPal이 사용 가능하다고 판단한 기기에서 접속한 경우에만 나타납니다. 정기 헌금은 여전히 카드 입력란을 사용합니다.

## Paystack 설정하기(아프리카) {#setting-up-paystack-africa}

Stripe는 가나, 나이지리아, 케냐, 남아프리카공화국, 코트디부아르의 교회에 계정을 열어 주지 않습니다. 이 지역에서는 [Paystack](https://paystack.com)이 계정을 열어 주며, 현지 카드, **모바일 머니**(MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), 은행 이체, USSD를 받습니다. 헌금자는 현지 통화(GHS, NGN, KES, ZAR, XOF)로 결제합니다.

1. 교회의 사업자 등록증과 현지 은행 계좌로 [paystack.com](https://paystack.com)에 등록하고, Paystack의 활성화(운영 시작) 심사를 완료하세요.
2. Paystack 대시보드에서 **설정 → API Keys & Webhooks**를 열고 **Public Key**와 **Secret Key**를 복사합니다(테스트 키가 아닌 라이브 키를 사용하세요).
3. B1 Admin에서 **설정**으로 이동하여 **헌금** 섹션을 열고 편집을 클릭합니다.
4. **제공업체**를 **Paystack**으로 설정하고, Public Key와 Secret Key를 붙여 넣은 다음 **통화**를 선택합니다.
5. 제공업체 아래에 표시된 **웹훅 URL**을 복사하고, Paystack 대시보드(**설정 → API Keys & Webhooks**)로 돌아가 **Webhook URL** 입력란에 붙여 넣습니다. 정기 헌금과 모바일 머니 결제가 기록되는 방식이 바로 이것입니다.
6. 저장합니다.

헌금자는 안전한 Paystack 창에서 결제를 완료하며, 그 자리에서 카드, 모바일 머니, 은행 이체 중 하나를 선택할 수 있습니다. 참고 사항은 다음과 같습니다.

- **정기 헌금**은 카드가 필요합니다. 모바일 머니는 자동으로 다시 청구할 수 없으므로, Paystack은 일회성 모바일 머니 헌금만 허용합니다.
- Paystack 정기 헌금은 B1에서 취소할 수 있지만 일시 중지하거나 편집할 수는 없습니다. 금액을 바꾸려면 취소한 후 새로 만드세요.
- **처리 수수료** 기본값은 해당 통화의 Paystack 현지 카드 요율을 반영합니다. 협상된 요율이 다르다면 직접 수정하세요.

## 다음 단계 {#next-steps}

- 온라인 거래가 자동으로 동기화되지 않는다면 [Stripe 가져오기](stripe-import.md)를 사용하여 B1 Admin으로 가져오세요
- [헌금 보고서](donation-reports.md)를 확인하여 온라인 헌금이 올바르게 나타나는지 검증하세요
- 온라인 헌금과 오프라인 헌금을 모두 포함하는 [헌금 명세서](giving-statements.md)를 만드세요
