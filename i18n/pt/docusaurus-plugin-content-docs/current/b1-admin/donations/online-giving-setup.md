---
title: "Configuração de Doações Online"
---

# Configuração de Doações Online

<div class="article-intro">

B1 Admin se integra com **Stripe**, **PayPal**, **Kingdom Funding** e **Paystack** (para igrejas na África) para que seus membros possam fazer doações online através do seu site B1.church. Uma vez configurado, as doações online aparecem automaticamente nos seus registros de doações junto com as ofertas inseridas manualmente, mantendo tudo em um único sistema.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure seus [fundos de doação](funds.md) para que os doadores possam designar suas ofertas
- Crie uma conta Stripe em [stripe.com](https://stripe.com) e ative-a (saia do modo de teste)
- Tenha suas credenciais de login do B1 Admin prontas

</div>

## Configurando o Stripe

1. Crie uma conta em [stripe.com](https://stripe.com) se ainda não tiver uma. Certifique-se de **ativar sua conta** e sair do modo de teste.
2. No Stripe, vá para **Developers > API Keys**.
3. Copie sua **Chave Publicável**.
4. Faça login em [B1 Admin](https://admin.b1.church/).
5. Vá para **Configurações** e abra a seção **Doações**.
6. Clique no ícone de edição na seção **Doações**.
7. Configure o **Provedor** para **Stripe**.
8. Cole sua Chave Publicável no campo **Chave Pública**.
9. Volte para o Stripe e revele sua **Chave Secreta** (você pode visualizá-la apenas uma vez, então salve um backup).
10. Cole a Chave Secreta no campo **Chave Secreta** e clique em **Salvar**.

:::warning
Sua Chave Secreta do Stripe é exibida apenas uma vez. Copie-a para um local seguro antes de sair do dashboard do Stripe. Se perder, será necessário gerar uma nova chave.
:::

## Escolhendo Sua Moeda

Após selecionar o Stripe como seu provedor, um menu suspenso de **Moeda** aparece ao lado de suas chaves de API. Escolha a moeda que corresponde à moeda de liquidação da sua conta Stripe para que as doações sejam cobradas corretamente.

As moedas suportadas incluem USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN e BRL. Você pode confirmar ou alterar a moeda padrão da sua conta no [Painel Stripe](https://dashboard.stripe.com/settings/currencies).

:::info
A moeda que você seleciona aqui é usada para doações únicas, assinaturas recorrentes, cálculos de taxas e relatórios de doações. Se mudar de moeda mais tarde, apenas novas doações e assinaturas usarão a nova moeda — as ofertas recorrentes existentes continuam na moeda em que foram criadas.
:::

:::warning
Certifique-se de que sua conta Stripe está configurada para aceitar a moeda que você escolher. Se sua conta Stripe não aceitar a moeda selecionada, as doações falharão no checkout.
:::

## Apple Pay e Google Pay

Igrejas no Stripe recebem botões Apple Pay e Google Pay na página de doações pública automaticamente. Os botões aparecem acima dos campos de cartão para doações únicas assim que o doador escolhe um fundo e um valor, e apenas quando o navegador ou dispositivo do doador tiver uma carteira configurada. As ofertas recorrentes ainda usam os campos de cartão ou banco.

Google Pay não precisa de configuração. Apple Pay exige que o domínio da sua página de doações seja registrado no Stripe; B1 o registra na primeira vez que a página de doações carrega no seu domínio. Se o botão Apple Pay não aparecer em um iPhone, verifique **Configurações > Domínios de método de pagamento** no seu Painel Stripe e confirme que seu domínio `yoursubdomain.b1.church` (ou personalizado) está listado e verificado.

## Ofertas Anônimas

Os doadores na página de doações pública podem marcar **Dar anonimamente**. Uma oferta anônima é registrada sem doador associado, ainda vai para o fundo que o doador escolheu e aparece como **Anônima** em seus lotes e relatórios. O email do doador ainda é necessário para que o recibo possa ser enviado, mas nenhum registro de pessoa é criado. As ofertas anônimas são apenas uma vez e não aparecem em nenhuma declaração de doação.

## Ofertas Recorrentes Falhadas

Quando uma oferta recorrente no Stripe falha (um cartão expirado ou recusado, por exemplo), a cobrança falhada aparece sob **Doações > Ofertas Falhadas** com o doador, valor, data e o motivo dado pelo gateway. Clique em **Tentar Novamente** para tentar a cobrança novamente assim que o doador tiver atualizado seu método de pagamento.

B1 também envia um email para o doador quando a cobrança falha, e novamente três e sete dias depois se ainda não tiver sido realizada, com um link para atualizar seu método de pagamento em B1.church.

:::info
Se sua igreja configurou o Stripe antes deste recurso existir, abra **Configurações** > **Doações**, clique em editar e clique em **Salvar** uma vez. Isso atualiza o webhook do Stripe para que cobranças falhadas sejam reportadas a B1.
:::

## Adicionando uma Página de Doações ao Seu Site B1.church

1. Vá para [b1.church](https://b1.church/) e faça login.
2. Clique no ícone **Configurações**.
3. Clique em **Adicionar Aba**.
4. Escolha **Doação** como o tipo.
5. Digite um nome para a aba (por exemplo, "Doar") e clique em **Salvar**.
6. Opcionalmente, altere o ícone da aba — digite "Doar" na busca de ícones para um ícone relacionado a doações.

Sua página de doações agora está ativa. Os membros podem visitá-la em `yoursubdomain.b1.church/donate`.

## Compartilhando Seu Link de Doações

Para encontrar sua URL de doações, vá para **B1 Admin** e clique no ícone **Configurações** para ver seu subdomínio. Seu link de doação segue o formato:

`https://yoursubdomain.b1.church/donate`

Compartilhe este link no seu website, em emails ou no seu boletim para que os membros saibam onde fazer doações online.

### Links com Fundo e Valor Predefinidos

Para levar os doadores direto para um fundo específico, vá para **Doações > Fundos** e clique em **Link de Doação** no fundo. Opcionalmente digite um valor e copie o link. Quando um doador o abre, o fundo e o valor já estão selecionados na página de doações. O link segue o formato:

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

Os mesmos parâmetros funcionam no elemento **Link de Doação** do construtor de websites.

## Notificações de Doação

O Stripe envia uma notificação por email cada vez que uma doação é recebida. Para alterar o endereço de email de notificação, vá para o dashboard do Stripe, clique no seu perfil no canto superior direito, escolha **Perfil** e atualize seu endereço de email.

## Opções de Taxa de Processamento

Você pode configurar sua página de doações para permitir que os doadores opcionalmente cubram as taxas de processamento para que sua igreja receba o valor integral da doação. Esta configuração é gerenciada nas configurações da sua igreja dentro do B1 Admin.

:::tip
Após a configuração, faça uma pequena doação de teste para confirmar que tudo está funcionando antes de anunciar doações online para sua congregação.
:::

## Configurando Kingdom Funding

Kingdom Funding é um processador de pagamentos cristão que suporta cartões de crédito/débito e transferências bancárias ACH. Se sua igreja está inscrita no Kingdom Funding, você pode conectá-lo como seu gateway de doações.

:::info
A integração do Kingdom Funding está atualmente em beta. Entre em contato com seu representante de conta B1 para habilitá-lo para sua igreja.
:::

1. Inscreva-se ou faça login em [kingdomfunding.org](https://kingdomfunding.org).
2. Obtenha sua **Chave de Segurança** (pública) e **Chave Privada** no portal de comerciante do Kingdom Funding.
3. Em B1 Admin, vá para **Configurações**, abra a seção **Doações** e clique em editar.
4. Configure o **Provedor** para **Kingdom Funding**.
5. Cole sua Chave de Segurança no campo **Chave de Segurança** e sua Chave Privada no campo **Chave Privada**.
6. Configure a **Chave Webhook** que você recebeu do Kingdom Funding e copie a URL do webhook exibida nas configurações de comerciante do Kingdom Funding para que o Kingdom Funding possa notificar B1 de transações concluídas.
7. Salve.

Uma vez conectado, os membros verão um alternador de cartão/banco na página de doações e podem dar por cartão de crédito ou transferência ACH.

## Botões PayPal e Venmo

Igrejas usando **PayPal** como seu provedor recebem botões **PayPal** e **Venmo** acima dos campos de cartão na página de doações para doações únicas. Os doadores que clicam em um completam o pagamento em uma janela PayPal, e a oferta é registrada como qualquer outra doação online. O Venmo aparece apenas para doadores nos Estados Unidos em dispositivos que o PayPal considera elegíveis. As ofertas recorrentes ainda usam os campos de cartão.

## Configurando Paystack (África)

Stripe não abre contas para igrejas em Gana, Nigéria, Quênia, África do Sul ou Costa do Marfim. [Paystack](https://paystack.com) faz, e aceita cartões locais, **dinheiro móvel** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), transferência bancária e USSD — os doadores pagam em sua moeda local (GHS, NGN, KES, ZAR, XOF).

1. Registre-se em [paystack.com](https://paystack.com) com o certificado de registro comercial da sua igreja e conta bancária local, e complete a revisão de ativação (go-live) do Paystack.
2. No Painel Paystack abra **Configurações → Chaves de API e Webhooks** e copie a **Chave Pública** e **Chave Secreta** (use as chaves de produção, não as chaves de teste).
3. Em B1 Admin, vá para **Configurações**, abra a seção **Doações** e clique em editar.
4. Configure o **Provedor** para **Paystack**, cole a Chave Pública e Chave Secreta e escolha sua **Moeda**.
5. Copie a **URL do webhook** exibida sob o provedor, volte para o Painel Paystack (**Configurações → Chaves de API e Webhooks**) e cole-a no campo **URL do Webhook**. Assim é como as ofertas recorrentes e os pagamentos de dinheiro móvel são registrados.
6. Salve.

Os doadores completam seu pagamento em uma janela Paystack segura e podem escolher cartão, dinheiro móvel ou transferência bancária lá. Observações:

- **Ofertas recorrentes** precisam de um cartão; dinheiro móvel não pode ser cobrado novamente automaticamente, então Paystack apenas permite ofertas de dinheiro móvel únicas.
- As ofertas recorrentes do Paystack podem ser canceladas do B1 mas não pausadas ou editadas — cancele e crie uma nova para alterar o valor.
- A **Taxa de Processamento** padrão reflete as taxas de cartão local do Paystack para sua moeda; edite se suas taxas negociadas forem diferentes.

## Próximos Passos

- Use [Importação Stripe](stripe-import.md) para extrair transações online para B1 Admin se elas não estiverem sincronizando automaticamente
- Verifique seus [Relatórios de Doações](donation-reports.md) para verificar que as doações online estão aparecendo corretamente
- Gere [Declarações de Doações](giving-statements.md) que incluam doações online e offline
