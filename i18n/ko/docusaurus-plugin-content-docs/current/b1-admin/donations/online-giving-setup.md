---
title: "온라인 헌금 설정"
---

# 온라인 헌금 설정

<div class="article-intro">

B1 Admin은 **Stripe**, **PayPal**, **Kingdom Funding**, 그리고 아프리카 교회를 위한 **Paystack**과 연동되어, 교인이 B1.church 사이트를 통해 온라인으로 헌금할 수 있게 합니다. 설정이 끝나면 온라인 헌금이 직접 입력한 헌금과 함께 헌금 기록에 자동으로 나타나므로, 모든 것을 하나의 시스템에서 관리할 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 헌금자가 헌금을 지정할 수 있도록 [헌금 펀드](funds.md)를 먼저 설정하세요.
- [stripe.com](https://stripe.com)에서 Stripe 계정을 만들고 활성화하세요(테스트 모드에서 벗어나야 함).
- B1 Admin 로그인 정보를 준비하세요.

</div>

## Stripe 설정하기

1. 아직 계정이 없다면 [stripe.com](https://stripe.com)에서 계정을 만드세요. 반드시 **계정을 활성화**하고 테스트 모드에서 벗어나게 하세요.
2. Stripe에서 **Developers > API Keys**로 이동하세요.
3. **Publishable Key**(공개 가능 키)를 복사하세요.
4. [B1 Admin](https://admin.b1.church/)에 로그인하세요.
5. **Settings**로 이동해 **Giving** 섹션을 여세요.
6. **Giving** 섹션의 **Edit**를 클릭하세요.
7. **Provider**를 **Stripe**로 설정하세요.
8. **Public Key** 필드에 Publishable Key를 붙여 넣으세요.
9. Stripe로 돌아가 **Secret Key**(비밀 키)를 표시하세요. 이 키는 한 번만 볼 수 있으므로 백업해 두세요.
10. **Secret Key** 필드에 비밀 키를 붙여 넣고 **Save**를 클릭하세요.

:::warning
Stripe 비밀 키는 한 번만 표시됩니다. Stripe 대시보드를 떠나기 전에 안전한 곳에 복사해 두세요. 잃어버리면 새 키를 만들어야 합니다.
:::

## 통화 선택하기

Stripe를 제공자로 고르면, API 키 옆에 **Currency** 드롭다운이 나타납니다. 헌금이 올바르게 청구되도록 Stripe 계정의 정산 통화와 같은 통화를 고르세요.

지원되는 통화에는 USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN, BRL이 포함됩니다. 계정의 기본 통화는 [Stripe 대시보드](https://dashboard.stripe.com/settings/currencies)에서 확인하거나 바꿀 수 있습니다.

:::info
여기서 선택한 통화는 일회성 헌금, 정기 구독, 수수료 계산, 헌금 보고서에 쓰입니다. 나중에 통화를 바꾸면 새 헌금과 구독에만 새 통화가 적용되며, 기존 정기 헌금은 만들어졌을 때의 통화를 계속 사용합니다.
:::

:::warning
Stripe 계정이 선택한 통화를 받도록 설정되어 있는지 확인하세요. Stripe 계정이 선택한 통화를 지원하지 않으면 결제 과정에서 헌금이 실패합니다.
:::

## Apple Pay와 Google Pay

Stripe를 쓰는 교회는 공개 헌금 페이지에 Apple Pay와 Google Pay 버튼이 자동으로 나타납니다. 일회성 헌금에서 헌금자가 펀드와 금액을 고르면 카드 입력란 위에 버튼이 나타나며, 헌금자의 브라우저나 기기에 전자 지갑이 설정되어 있을 때만 보입니다. 정기 헌금은 여전히 카드나 은행 입력란을 사용합니다.

Google Pay는 따로 설정할 필요가 없습니다. Apple Pay는 헌금 페이지의 도메인이 Stripe에 등록되어 있어야 하며, B1은 헌금 페이지가 도메인에서 처음 로드될 때 이를 등록합니다. iPhone에서 Apple Pay 버튼이 보이지 않는다면, Stripe 대시보드의 **Settings > Payment method domains**를 확인해 `yoursubdomain.b1.church`(또는 사용자 지정) 도메인이 목록에 있고 인증되었는지 확인하세요.

## 익명 헌금

공개 헌금 페이지의 헌금자는 **Give anonymously**를 선택할 수 있습니다. 익명 헌금은 헌금자 정보 없이 기록되지만, 헌금자가 고른 펀드로는 그대로 들어가며, 묶음과 보고서에서는 **Anonymous**로 표시됩니다. 영수증을 보내기 위해 헌금자의 이메일은 여전히 필요하지만, 교인 기록은 만들어지지 않습니다. 익명 헌금은 일회성만 가능하며, 어떤 헌금 명세서에도 나타나지 않습니다.

## 실패한 정기 헌금

Stripe의 정기 헌금이 실패하면(예: 만료되었거나 거절된 카드), 실패한 청구가 **Donations > Failed Gifts**에 헌금자, 금액, 날짜, 게이트웨이가 알려 준 실패 사유와 함께 나타납니다. 헌금자가 결제 수단을 업데이트하면 **Retry**를 클릭해 다시 청구를 시도하세요.

청구가 실패하면 B1은 헌금자에게도 이메일을 보내며, 3일과 7일이 지나도 여전히 완료되지 않았다면 다시 보냅니다. 이메일에는 B1.church에서 결제 수단을 업데이트하는 링크가 있습니다.

:::info
이 기능이 생기기 전에 교회가 Stripe를 설정했다면, **Settings** > **Giving**을 열고 edit를 클릭한 다음 **Save**를 한 번 누르세요. 그러면 Stripe 웹훅이 새로 고쳐져 실패한 청구가 B1에 보고됩니다.
:::

## B1.church 사이트에 헌금 페이지 추가하기

1. [b1.church](https://b1.church/)로 이동해 로그인하세요.
2. **Settings** 아이콘을 클릭하세요.
3. **Add Tab**을 클릭하세요.
4. 유형으로 **Donation**을 고르세요.
5. 탭 이름(예: "Give")을 입력하고 **Save**를 클릭하세요.
6. 선택 사항으로 탭 아이콘을 바꾸세요. 아이콘 검색에 "Giv"를 입력하면 헌금 관련 아이콘을 찾을 수 있습니다.

이제 헌금 페이지가 공개되었습니다. 교인은 `yoursubdomain.b1.church/donate`에서 헌금 페이지를 방문할 수 있습니다.

## 헌금 링크 공유하기

헌금 URL을 찾으려면 **B1 Admin**에서 **Settings** 아이콘을 클릭해 서브도메인을 확인하세요. 헌금 링크는 다음 형식을 따릅니다.

`https://yoursubdomain.b1.church/donate`

교인이 온라인으로 어디에 헌금하면 되는지 알 수 있도록, 이 링크를 웹사이트, 이메일, 주보에 공유하세요.

### 펀드와 금액이 미리 설정된 링크

헌금자를 특정 펀드로 바로 안내하려면 **Donations > Funds**로 이동해 해당 펀드의 **Giving Link**를 클릭하세요. 선택 사항으로 금액을 입력한 다음 링크를 복사하세요. 대화상자에는 같은 링크의 QR 코드도 표시됩니다. 주보, 슬라이드, 포스터에 쓰려면 **Download PNG**를 클릭해 저장하세요. 헌금자가 링크를 열거나 코드를 스캔하면, 헌금 페이지에서 펀드와 금액이 이미 선택되어 있습니다. 링크 형식은 다음과 같습니다.

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

같은 매개변수는 웹사이트 빌더의 **Donate Link** 요소에서도 쓸 수 있습니다.

## 헌금 알림

헌금이 들어올 때마다 Stripe가 이메일 알림을 보냅니다. 알림 이메일 주소를 바꾸려면 Stripe 대시보드에서 오른쪽 위의 프로필을 클릭하고 **Profile**을 고른 다음 이메일 주소를 업데이트하세요.

## 처리 수수료 옵션

헌금 페이지에서 헌금자가 선택적으로 처리 수수료를 부담하도록 설정할 수 있으므로, 교회는 헌금 금액 전체를 받을 수 있습니다. 이 설정은 B1 Admin의 교회 설정에서 관리합니다.

:::tip
설정이 끝나면 교인에게 온라인 헌금을 알리기 전에 소액의 테스트 헌금을 해 보고 모든 것이 작동하는지 확인하세요.
:::

## Kingdom Funding 설정하기

Kingdom Funding은 신용/체크카드와 ACH 은행 이체를 지원하는 기독교 결제 처리 업체입니다. 교회가 Kingdom Funding에 가입되어 있다면, 이를 헌금 게이트웨이로 연결할 수 있습니다.

:::info
Kingdom Funding 연동은 현재 베타 단계입니다. 교회에서 사용하려면 B1 담당자에게 문의해 활성화하세요.
:::

1. [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply)에서 가입하거나 로그인하세요.
2. Kingdom Funding 가맹점 포털에서 **Security Key**(공개 키)와 **Private Key**(비공개 키)를 받으세요.
3. B1 Admin에서 **Settings**로 이동해 **Giving** 섹션을 열고 edit를 클릭하세요.
4. **Provider**를 **Kingdom Funding**으로 설정하세요.
5. **Security Key** 필드에 Security Key를, **Private Key** 필드에 Private Key를 붙여 넣으세요.
6. Kingdom Funding에서 받은 **Webhook Key**를 설정하고, 표시된 웹훅 URL을 Kingdom Funding 가맹점 설정에 복사해 넣으세요. 그래야 Kingdom Funding이 완료된 거래를 B1에 알릴 수 있습니다.
7. 저장하세요.

연결되면 교인은 헌금 페이지에서 카드/은행 전환 버튼을 보고, 신용카드나 ACH 이체로 헌금할 수 있습니다.

## PayPal과 Venmo 버튼

제공자로 **PayPal**을 쓰는 교회는, 헌금 페이지의 일회성 헌금에서 카드 입력란 위에 **PayPal**과 **Venmo** 버튼이 나타납니다. 버튼을 누른 헌금자는 PayPal 창에서 결제를 마치며, 헌금은 다른 온라인 헌금과 똑같이 기록됩니다. Venmo는 미국에 있는 헌금자가 PayPal이 사용 가능하다고 판단한 기기에서 쓸 때만 나타납니다. 정기 헌금은 여전히 카드 입력란을 사용합니다.

## Paystack 설정하기(아프리카)

Stripe는 가나, 나이지리아, 케냐, 남아프리카, 코트디부아르의 교회에 계정을 열어 주지 않습니다. [Paystack](https://paystack.com)은 계정을 열어 주며, 현지 카드, **모바일 머니**(MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), 은행 이체, USSD를 받습니다. 헌금자는 현지 통화(GHS, NGN, KES, ZAR, XOF)로 결제합니다.

1. 교회의 사업자 등록증과 현지 은행 계좌로 [paystack.com](https://paystack.com)에 등록하고, Paystack의 활성화(실제 운영 시작) 심사를 마치세요.
2. Paystack 대시보드에서 **Settings → API Keys & Webhooks**를 열고 **Public Key**와 **Secret Key**를 복사하세요(테스트 키가 아니라 실제 운영 키를 쓰세요).
3. B1 Admin에서 **Settings**로 이동해 **Giving** 섹션을 열고 edit를 클릭하세요.
4. **Provider**를 **Paystack**으로 설정하고, Public Key와 Secret Key를 붙여 넣은 뒤, **Currency**를 고르세요.
5. 제공자 아래에 표시된 **webhook URL**을 복사해, Paystack 대시보드(**Settings → API Keys & Webhooks**)로 돌아가 **Webhook URL** 필드에 붙여 넣으세요. 정기 헌금과 모바일 머니 결제가 기록되는 방식이 이것입니다.
6. 저장하세요.

헌금자는 안전한 Paystack 창에서 결제를 마치며, 그곳에서 카드, 모바일 머니, 은행 이체 중 하나를 고를 수 있습니다. 참고 사항은 다음과 같습니다.

- **정기 헌금**에는 카드가 필요합니다. 모바일 머니는 자동으로 다시 청구할 수 없으므로, Paystack은 모바일 머니로는 일회성 헌금만 허용합니다.
- Paystack 정기 헌금은 B1에서 취소할 수 있지만, 일시 중지하거나 수정할 수는 없습니다. 금액을 바꾸려면 취소한 뒤 새로 만드세요.
- **Processing Fee** 기본값은 해당 통화의 Paystack 현지 카드 요율을 따릅니다. 협의한 요율이 다르다면 수정하세요.

## 다음 단계

- 온라인 거래가 자동으로 동기화되지 않는다면 [Stripe 가져오기](stripe-import.md)로 B1 Admin에 가져오세요.
- [헌금 보고서](donation-reports.md)를 확인해 온라인 헌금이 올바르게 나타나는지 검증하세요.
- 온라인 헌금과 오프라인 헌금을 모두 포함하는 [헌금 명세서](giving-statements.md)를 만드세요.
