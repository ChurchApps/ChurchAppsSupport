---
title: "Configuração de doações online"
---

# Configuração de doações online

<div class="article-intro">

O B1 Admin se integra ao **Stripe**, **PayPal**, **Kingdom Funding** e **Paystack** (para igrejas na África) para que seus membros possam contribuir online pelo seu site B1.church. Depois de configurado, as doações online aparecem automaticamente nos seus registros de doações, junto com as ofertas lançadas manualmente, mantendo tudo em um único sistema.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Configure seus [fundos de doação](funds.md) para que os doadores possam direcionar suas contribuições
- Crie uma conta no Stripe em [stripe.com](https://stripe.com) e ative-a (saia do modo de teste)
- Tenha em mãos suas credenciais de acesso ao B1 Admin

</div>

## Configurando o Stripe

1. Crie uma conta em [stripe.com](https://stripe.com) se ainda não tiver uma. Certifique-se de **ativar sua conta** e de sair do modo de teste.
2. No Stripe, acesse **Desenvolvedores > Chaves de API**.
3. Copie sua **Chave publicável**.
4. Faça login no [B1 Admin](https://admin.b1.church/).
5. Acesse **Configurações** e abra a seção **Doações**.
6. Clique em **Editar** na seção **Doações**.
7. Defina o **Provedor** como **Stripe**.
8. Cole sua Chave publicável no campo **Chave pública**.
9. Volte ao Stripe e revele sua **Chave secreta** (ela só pode ser visualizada uma vez, então salve uma cópia de segurança).
10. Cole a Chave secreta no campo **Chave secreta** e clique em **Salvar**.

:::warning
Sua Chave secreta do Stripe só é exibida uma vez. Copie-a para um local seguro antes de sair do painel do Stripe. Se você perdê-la, será necessário gerar uma nova chave.
:::

## Escolhendo sua moeda

Depois de selecionar o Stripe como provedor, uma lista suspensa **Moeda** aparece ao lado das suas chaves de API. Escolha a moeda que corresponde à moeda de liquidação da sua conta no Stripe para que as doações sejam cobradas corretamente.

As moedas suportadas incluem USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN e BRL. Você pode confirmar ou alterar a moeda padrão da sua conta no [Painel do Stripe](https://dashboard.stripe.com/settings/currencies).

:::info
A moeda selecionada aqui é usada para doações avulsas, assinaturas recorrentes, cálculos de taxas e relatórios de doações. Se você trocar de moeda depois, somente as novas doações e assinaturas usarão a nova moeda — as doações recorrentes já existentes continuam na moeda em que foram criadas.
:::

:::warning
Certifique-se de que sua conta no Stripe está configurada para aceitar a moeda escolhida. Se a sua conta no Stripe não suportar a moeda selecionada, as doações falharão no checkout.
:::

## Apple Pay e Google Pay

As igrejas que usam o Stripe recebem automaticamente os botões Apple Pay e Google Pay na página pública de doações. Os botões aparecem acima dos campos do cartão para doações avulsas, assim que o doador escolher um fundo e um valor, e somente quando o navegador ou o dispositivo do doador tiver uma carteira configurada. Doações recorrentes continuam usando os campos de cartão ou de conta bancária.

O Google Pay não precisa de configuração. O Apple Pay exige que o domínio da sua página de doações esteja registrado no Stripe; o B1 faz esse registro na primeira vez que a página de doações é carregada no seu domínio. Se o botão Apple Pay não aparecer em um iPhone, verifique **Configurações > Domínios de métodos de pagamento** no seu Painel do Stripe e confirme que o seu domínio `seusubdominio.b1.church` (ou personalizado) está listado e verificado.

## Doações anônimas

Os doadores na página pública de doações podem marcar **Doar anonimamente**. Uma doação anônima é registrada sem nenhum doador associado, ainda vai para o fundo escolhido pelo doador e aparece como **Anônima** nos seus lotes e relatórios. O e-mail do doador ainda é obrigatório para que o recibo possa ser enviado, mas nenhum registro de pessoa é criado. Doações anônimas são somente avulsas e não aparecem em nenhum extrato de doações.

## Doações recorrentes com falha

Quando uma doação recorrente no Stripe falha (por exemplo, um cartão vencido ou recusado), a cobrança com falha aparece em **Doações > Doações com falha** com o doador, o valor, a data e o motivo informado pelo gateway. Clique em **Tentar novamente** para repetir a cobrança depois que o doador tiver atualizado a forma de pagamento.

O B1 também envia um e-mail ao doador quando a cobrança falha, e novamente três e sete dias depois, caso ela ainda não tenha sido concluída, com um link para atualizar a forma de pagamento no B1.church.

:::info
Se a sua igreja configurou o Stripe antes de este recurso existir, abra **Configurações** > **Doações**, clique em editar e clique em **Salvar** uma vez. Isso atualiza o webhook do Stripe para que as cobranças com falha sejam informadas ao B1.
:::

## Adicionando uma página de doações ao seu site B1.church

1. Acesse [b1.church](https://b1.church/) e faça login.
2. Clique no ícone **Configurações**.
3. Clique em **Adicionar aba**.
4. Escolha **Doação** como tipo.
5. Digite um nome para a aba (por exemplo, "Contribua") e clique em **Salvar**.
6. Opcionalmente, altere o ícone da aba -- digite "Doa" na busca de ícones para encontrar um ícone relacionado a doações.

Sua página de doações já está no ar. Os membros podem acessá-la em `seusubdominio.b1.church/donate`.

## Compartilhando seu link de doações

Para encontrar o endereço de doações, acesse o **B1 Admin** e clique no ícone **Configurações** para ver seu subdomínio. Seu link de doações segue este formato:

`https://seusubdominio.b1.church/donate`

Compartilhe este link no seu site, em e-mails ou no seu boletim para que os membros saibam onde contribuir online.

### Links com fundo e valor predefinidos

Para enviar os doadores diretamente a um fundo específico, acesse **Doações > Fundos** e clique em **Link de doação** no fundo. Opcionalmente, informe um valor e depois copie o link. A janela também mostra um QR code para o mesmo link; clique em **Baixar PNG** para salvá-lo para um boletim, slide ou cartaz. Quando um doador abre o link ou escaneia o código, o fundo e o valor já vêm selecionados na página de doações. O link tem a seguinte forma:

`https://seusubdominio.b1.church/donate?fundId=ID_DO_FUNDO&amount=25`

Os mesmos parâmetros funcionam no elemento **Link de doação** do criador de sites.

## Notificações de doação

O Stripe envia uma notificação por e-mail sempre que uma doação é recebida. Para alterar o endereço de e-mail das notificações, acesse o painel do Stripe, clique no seu perfil no canto superior direito, escolha **Perfil** e atualize seu endereço de e-mail.

## Opções de taxa de processamento

Você pode configurar sua página de doações para permitir que os doadores cubram opcionalmente as taxas de processamento, para que a sua igreja receba o valor integral da doação. Essa configuração é gerenciada nas configurações da igreja dentro do B1 Admin.

:::tip
Após a configuração, faça uma pequena doação de teste para confirmar que tudo está funcionando antes de anunciar as doações online para a sua congregação.
:::

## Configurando o Kingdom Funding

O Kingdom Funding é um processador de pagamentos cristão que aceita cartões de crédito/débito e transferências bancárias ACH. Se a sua igreja estiver cadastrada no Kingdom Funding, você pode conectá-lo como seu gateway de doações.

:::info
A integração com o Kingdom Funding está atualmente em beta. Entre em contato com o seu representante de conta B1 para habilitá-la na sua igreja.
:::

1. Cadastre-se ou faça login em [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply).
2. Obtenha sua **Chave de segurança** (pública) e sua **Chave privada** no portal de comerciante do Kingdom Funding.
3. No B1 Admin, acesse **Configurações**, abra a seção **Doações** e clique em editar.
4. Defina o **Provedor** como **Kingdom Funding**.
5. Cole sua Chave de segurança no campo **Chave de segurança** e sua Chave privada no campo **Chave privada**.
6. Defina a **Chave do webhook** que você recebeu do Kingdom Funding e copie a URL do webhook exibida para as configurações do seu comerciante no Kingdom Funding, para que o Kingdom Funding possa notificar o B1 sobre as transações concluídas.
7. Salve.

Depois de conectado, os membros verão uma alternância cartão/conta bancária na página de doações e poderão contribuir com cartão de crédito ou transferência ACH.

## Botões do PayPal e do Venmo

As igrejas que usam o **PayPal** como provedor recebem os botões **PayPal** e **Venmo** acima dos campos do cartão na página de doações, para doações avulsas. Os doadores que clicam em um deles concluem o pagamento em uma janela do PayPal, e a doação é registrada como qualquer outra doação online. O Venmo aparece somente para doadores nos Estados Unidos em dispositivos que o PayPal considera elegíveis. Doações recorrentes continuam usando os campos de cartão.

## Configurando o Paystack (África)

O Stripe não abre contas para igrejas em Gana, Nigéria, Quênia, África do Sul ou Costa do Marfim. O [Paystack](https://paystack.com) abre, e aceita cartões locais, **dinheiro móvel** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), transferência bancária e USSD — os doadores pagam na moeda local (GHS, NGN, KES, ZAR, XOF).

1. Cadastre-se em [paystack.com](https://paystack.com) com o certificado de registro empresarial da sua igreja e uma conta bancária local, e conclua a análise de ativação (go-live) do Paystack.
2. No Painel do Paystack, abra **Configurações → Chaves de API e Webhooks** e copie a **Chave pública** e a **Chave secreta** (use as chaves de produção, não as de teste).
3. No B1 Admin, acesse **Configurações**, abra a seção **Doações** e clique em editar.
4. Defina o **Provedor** como **Paystack**, cole a Chave pública e a Chave secreta e escolha sua **Moeda**.
5. Copie a **URL do webhook** exibida abaixo do provedor, volte ao Painel do Paystack (**Configurações → Chaves de API e Webhooks**) e cole-a no campo **URL do webhook**. É assim que as doações recorrentes e os pagamentos por dinheiro móvel são registrados.
6. Salve.

Os doadores concluem o pagamento em uma janela segura do Paystack e podem escolher ali cartão, dinheiro móvel ou transferência bancária. Observações:

- **Doações recorrentes** exigem cartão; o dinheiro móvel não pode ser cobrado automaticamente de novo, então o Paystack só permite doações avulsas por dinheiro móvel.
- Doações recorrentes do Paystack podem ser canceladas pelo B1, mas não pausadas nem editadas — cancele e crie uma nova para alterar o valor.
- Os valores padrão de **Taxa de processamento** refletem as taxas do Paystack para cartões locais na sua moeda; edite-os se as taxas negociadas forem diferentes.

## Próximos passos

- Use a [Importação do Stripe](stripe-import.md) para trazer transações online para o B1 Admin caso elas não estejam sincronizando automaticamente
- Confira seus [Relatórios de doações](donation-reports.md) para verificar se as doações online estão aparecendo corretamente
- Gere [Extratos de doações](giving-statements.md) que incluam doações online e offline
