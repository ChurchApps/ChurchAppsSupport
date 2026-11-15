---
title: "Configuração de Doações Online"
description: "Conecte o Stripe, o Kingdom Funding ou o Paystack ao B1 Admin para que os membros possam contribuir online pelo seu site B1.church e as doações sejam sincronizadas com os seus registros."
---

# Configuração de Doações Online

<div class="article-intro">

O B1 Admin se integra ao **Stripe**, ao **Kingdom Funding** e ao **Paystack** (para igrejas na África), para que os seus membros possam contribuir online pelo seu site B1.church. Depois de configuradas, as doações online aparecem automaticamente nos seus registros de doações, ao lado das contribuições lançadas manualmente, mantendo tudo em um único sistema.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure os seus [fundos de doação](funds.md) para que os doadores possam direcionar as suas contribuições
- Crie uma conta no Stripe em [stripe.com](https://stripe.com) e ative-a (tire-a do modo de teste)
- Tenha em mãos as suas credenciais de acesso ao B1 Admin

</div>

## Configurando o Stripe {#setting-up-stripe}

1. Crie uma conta em [stripe.com](https://stripe.com), caso ainda não tenha uma. Certifique-se de **ativar a sua conta** e de tirá-la do modo de teste.
2. No Stripe, acesse **Desenvolvedores > Chaves de API**.
3. Copie a sua **Chave Publicável**.
4. Faça login no [B1 Admin](https://admin.b1.church/).
5. Acesse **Configurações** e abra a seção **Doações**.
6. Clique em **Editar** na seção **Doações**.
7. Defina o **Provedor** como **Stripe**.
8. Cole a sua Chave Publicável no campo **Chave pública**.
9. Volte ao Stripe e revele a sua **Chave Secreta** (ela só pode ser visualizada uma vez, por isso salve uma cópia de segurança).
10. Cole a Chave Secreta no campo **Chave secreta** e clique em **Salvar**.

:::warning
A sua Chave Secreta do Stripe só é exibida uma vez. Copie-a para um local seguro antes de sair do painel do Stripe. Se você a perder, será necessário gerar uma nova chave.
:::

## Escolhendo a Sua Moeda {#choosing-your-currency}

Depois de selecionar o Stripe como provedor, um menu suspenso **Moeda** aparece ao lado das suas chaves de API. Escolha a moeda que corresponde à moeda de liquidação da sua conta do Stripe, para que as doações sejam cobradas corretamente.

Se você ainda não salvou uma moeda, o menu começa com a moeda do país da sua igreja informado no cadastro, em vez de dólares americanos. Confirme se ela corresponde à sua conta do Stripe antes de salvar.

Se a sua igreja não recebe doações online, deixe o **Provedor** em **Nenhum**, mas ainda escolha uma **Moeda** -- a lista passa a incluir todas as moedas, com a observação "A moeda em que a sua igreja registra as doações." As doações lançadas manualmente em lotes são registradas nessa moeda, e os totais de doações são exibidos nela.

As moedas suportadas incluem USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN, BRL e PHP. Você pode confirmar ou alterar a moeda padrão da sua conta no [Painel do Stripe](https://dashboard.stripe.com/settings/currencies).

:::info
A moeda que você seleciona aqui é usada nas doações avulsas, nas assinaturas recorrentes, no cálculo de taxas e nos relatórios de doações. Se você trocar de moeda depois, somente as novas doações e assinaturas usarão a nova moeda -- as doações recorrentes já existentes continuam na moeda com que foram criadas.
:::

:::warning
Certifique-se de que a sua conta do Stripe está configurada para aceitar a moeda escolhida. Se a sua conta não suportar a moeda selecionada, as doações falharão no checkout.
:::

## Apple Pay e Google Pay {#apple-pay-and-google-pay}

As igrejas que usam o Stripe recebem automaticamente os botões do Apple Pay e do Google Pay na página pública de doações. Os botões aparecem acima dos campos do cartão nas doações avulsas, depois que o doador escolhe um fundo e um valor, e somente quando o navegador ou o dispositivo do doador tem uma carteira configurada. As doações recorrentes continuam usando os campos de cartão ou de conta bancária.

O Google Pay não precisa de configuração. O Apple Pay exige que o domínio da sua página de doações esteja registrado no Stripe; o B1 faz esse registro na primeira vez em que a página de doações é carregada no seu domínio. Se o botão do Apple Pay não aparecer em um iPhone, verifique **Configurações > Domínios de métodos de pagamento** no seu Painel do Stripe e confirme se o seu domínio `yoursubdomain.b1.church` (ou personalizado) está listado e verificado.

## Doações Anônimas {#anonymous-gifts}

Os doadores da página pública de doações podem marcar **Doar anonimamente**. Uma doação anônima é registrada sem nenhum doador associado, ainda é destinada ao fundo escolhido pelo doador e aparece como **Anônima** nos seus lotes e relatórios. O e-mail do doador continua obrigatório para que o recibo possa ser enviado, mas nenhum registro de pessoa é criado. As doações anônimas são somente avulsas e não aparecem em nenhum recibo de doação.

## Doações Recorrentes Não Concluídas {#failed-recurring-gifts}

Quando uma doação recorrente no Stripe falha (por exemplo, por um cartão vencido ou recusado), a cobrança com falha aparece em **Doações > Doações não concluídas**, com o doador, o valor, a data e o motivo informado pelo gateway. Clique em **Tentar novamente** para refazer a cobrança depois que o doador atualizar a forma de pagamento.

O B1 também envia um e-mail ao doador quando a cobrança falha e, novamente, três e sete dias depois, caso ela ainda não tenha sido concluída, com um link para atualizar a forma de pagamento no B1.church.

:::info
Se a sua igreja configurou o Stripe antes de este recurso existir, acesse **Configurações** > **Doações**, clique em editar e clique em **Salvar** uma vez. Isso atualiza o webhook do Stripe para que as cobranças com falha sejam informadas ao B1.
:::

## Adicionando uma Página de Doações ao Seu Site B1.church {#adding-a-donation-page-to-your-b1church-site}

1. Acesse [b1.church](https://b1.church/) e faça login.
2. Clique no ícone de **Configurações**.
3. Clique em **Adicionar aba**.
4. Escolha **Doação** como tipo.
5. Informe um nome para a aba (por exemplo, "Contribua") e clique em **Salvar**.
6. Opcionalmente, altere o ícone da aba -- digite "Doa" na busca de ícones para encontrar um ícone relacionado a doações.

A sua página de doações já está no ar. Os membros podem acessá-la em `yoursubdomain.b1.church/donate`.

## Compartilhando o Seu Link de Doação {#sharing-your-giving-link}

Para encontrar o endereço da sua página de doações, acesse o **B1 Admin** e clique no ícone de **Configurações** para ver o seu subdomínio. O seu link de doação segue este formato:

`https://yoursubdomain.b1.church/donate`

Compartilhe este link no seu site, em e-mails ou no seu boletim, para que os membros saibam onde contribuir online.

### Links com Fundo e Valor Pré-definidos {#links-with-a-preset-fund-and-amount}

Para enviar os doadores diretamente a um fundo específico, acesse **Doações > Fundos** e clique em **Link de doação** no fundo. Opcionalmente, informe um valor e, em seguida, copie o link. A caixa também exibe um QR code para o mesmo link; clique em **Baixar PNG** para salvá-lo em um boletim, slide ou cartaz. Quando um doador abre o link ou escaneia o código, o fundo e o valor já vêm selecionados na página de doações. O link tem a seguinte forma:

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

Os mesmos parâmetros funcionam no elemento **Link de doação** do criador de sites.

## Notificações de Doação {#donation-notifications}

O Stripe envia uma notificação por e-mail sempre que uma doação é recebida. Para alterar o endereço de e-mail das notificações, acesse o painel do Stripe, clique no seu perfil no canto superior direito, escolha **Perfil** e atualize o seu endereço de e-mail.

## Opções de Taxa de Processamento {#processing-fee-options}

Você pode permitir que os doadores cubram opcionalmente as taxas de processamento, para que a sua igreja receba o valor integral da doação. Em **Configurações > Doações**, clique em editar e ative o botão **Taxa de transação** ao lado das suas chaves. As taxas usadas para calcular o valor são exibidas em **Taxas e recibos**: **Taxa fixa** e **Taxa de transação** para cartões e, para as doações por conta bancária do Stripe (ACH), um percentual e um **Limite máximo**. Elas começam com as taxas padrão do seu provedor; altere-as se as suas taxas negociadas forem diferentes e clique em **Salvar**.

:::tip
Depois da configuração, faça uma pequena doação de teste para confirmar que tudo funciona antes de anunciar as doações online à sua congregação.
:::

## Configurando o Kingdom Funding {#setting-up-kingdom-funding}

O Kingdom Funding é um processador de pagamentos cristão que aceita cartões de crédito e débito e transferências bancárias ACH. Se a sua igreja estiver cadastrada no Kingdom Funding, você pode conectá-lo como gateway de doações.

:::info
A integração com o Kingdom Funding está atualmente em beta. Entre em contato com o seu representante de conta B1 para habilitá-la na sua igreja.
:::

1. Cadastre-se ou faça login em [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply).
2. Obtenha a sua **Chave de Tokenização** e a sua **Chave de Origem** no painel do Kingdom Funding.
3. No B1 Admin, acesse **Configurações**, abra a seção **Doações** e clique em editar.
4. Defina o **Provedor** como **Kingdom Funding**.
5. Cole as chaves nos campos **Chave de Tokenização** e **Chave de Origem**.
6. Informe a **Chave do Webhook** (o segredo de assinatura do webhook no painel de controle do Kingdom Funding) e copie a URL do webhook exibida abaixo do provedor para as configurações do Kingdom Funding, para que o Kingdom Funding possa notificar o B1 sobre as transações concluídas.
7. Clique em **Salvar**.

Depois de conectado, os membros verão uma alternância cartão/conta bancária na página de doações e poderão contribuir por cartão de crédito ou transferência ACH.

## Botões do PayPal e do Venmo {#paypal-and-venmo-buttons}

O PayPal não é mais oferecido na lista de **Provedor** para novas configurações. As igrejas que já estão conectadas ao **PayPal** recebem os botões **PayPal** e **Venmo** acima dos campos de cartão na página de doações, para as doações avulsas. Os doadores que clicam em um deles concluem o pagamento em uma janela do PayPal, e a doação é registrada como qualquer outra doação online. O Venmo aparece somente para doadores dos Estados Unidos, em dispositivos que o PayPal considera elegíveis. As doações recorrentes continuam usando os campos de cartão.

## Configurando o Paystack (África) {#setting-up-paystack-africa}

O Stripe não abre contas para igrejas em Gana, Nigéria, Quênia, África do Sul ou Costa do Marfim. O [Paystack](https://paystack.com) abre, e aceita cartões locais, **dinheiro móvel** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), transferência bancária e USSD -- os doadores pagam na sua moeda local (GHS, NGN, KES, ZAR, XOF).

1. Cadastre-se em [paystack.com](https://paystack.com) com o certificado de registro empresarial da sua igreja e uma conta bancária local, e conclua a revisão de ativação (entrada em operação) do Paystack.
2. No Painel do Paystack, abra **Configurações → Chaves de API e Webhooks** e copie a **Chave Pública** e a **Chave Secreta** (use as chaves de produção, não as de teste).
3. No B1 Admin, acesse **Configurações**, abra a seção **Doações** e clique em editar.
4. Defina o **Provedor** como **Paystack**, cole a Chave Pública e a Chave Secreta e escolha a sua **Moeda**.
5. Copie a **URL do webhook** exibida abaixo do provedor, volte ao Painel do Paystack (**Configurações → Chaves de API e Webhooks**) e cole-a no campo **URL do webhook**. É assim que as doações recorrentes e os pagamentos por dinheiro móvel são registrados.
6. Salve.

Os doadores concluem o pagamento em uma janela segura do Paystack e podem escolher ali cartão, dinheiro móvel ou transferência bancária. Observações:

- **Doações recorrentes** precisam de cartão; o dinheiro móvel não pode ser cobrado automaticamente de novo, por isso o Paystack só permite doações avulsas por dinheiro móvel.
- As doações recorrentes do Paystack podem ser canceladas pelo B1, mas não pausadas nem editadas -- para alterar o valor, cancele e crie uma nova.
- As **Taxas de processamento** padrão refletem as taxas do Paystack para cartões locais na sua moeda; edite-as se as suas taxas negociadas forem diferentes.

## Próximos Passos {#next-steps}

- Use a [Importação do Stripe](stripe-import.md) para trazer transações online para o B1 Admin, caso elas não estejam sendo sincronizadas automaticamente
- Confira os seus [Relatórios de Doações](donation-reports.md) para verificar se as doações online estão aparecendo corretamente
- Gere os [Recibos de Doação](giving-statements.md) que incluem tanto as doações online quanto as offline
