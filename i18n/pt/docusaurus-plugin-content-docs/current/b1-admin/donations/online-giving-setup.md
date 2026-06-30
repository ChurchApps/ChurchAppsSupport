---
title: "Configuração de Doações Online"
---

# Configuração de Doações Online

<div class="article-intro">

B1 Admin integra com **Stripe**, **PayPal** e **Kingdom Funding** para que seus membros possam fazer doações online através do seu site B1.church. Uma vez configurado, as doações online aparecem automaticamente nos seus registros de doações junto com presentes inseridos manualmente, mantendo tudo em um único sistema.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure seus [fundos de doação](funds.md) para que os doadores possam designar seus presentes
- Crie uma conta Stripe em [stripe.com](https://stripe.com) e ative-a (saia do modo de teste)
- Tenha suas credenciais de login B1 Admin prontas

</div>

## Configurando o Stripe

1. Crie uma conta em [stripe.com](https://stripe.com) se ainda não tiver uma. Certifique-se de **ativar sua conta** e sair do modo de teste.
2. No Stripe, vá para **Developers > API Keys**.
3. Copie sua **Publishable Key**.
4. Faça login em [B1 Admin](https://admin.b1.church/).
5. Clique em **Church** na navegação superior e clique em **Edit Church Settings**.
6. Clique no ícone de edição ao lado de **Church Settings**.
7. Role para baixo até a seção **Giving**.
8. Defina o **Provider** para **Stripe**.
9. Cole sua Publishable Key no campo **Public Key**.
10. Volte ao Stripe e revele sua **Secret Key** (você pode visualizar isso apenas uma vez, então salve um backup).
11. Cole a Secret Key no campo **Secret Key** e clique em **Save**.

:::warning
Sua Stripe Secret Key é exibida apenas uma vez. Copie-a para um local seguro antes de sair do painel Stripe. Se você perdê-la, precisará gerar uma nova chave.
:::

## Escolhendo Sua Moeda

Após selecionar Stripe como seu provedor, um menu suspenso de **Currency** aparece ao lado de suas chaves de API. Escolha a moeda que corresponde à moeda de liquidação da sua conta Stripe para que as doações sejam cobradas corretamente.

As moedas suportadas incluem USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN e BRL. Você pode confirmar ou alterar a moeda padrão da sua conta em seu [Stripe Dashboard](https://dashboard.stripe.com/settings/currencies).

:::info
A moeda que você seleciona aqui é usada para doações únicas, assinaturas recorrentes, cálculos de taxa e relatórios de doação. Se você mudar de moeda mais tarde, apenas novas doações e assinaturas usarão a nova moeda — presentes recorrentes existentes continuam na moeda em que foram criados.
:::

:::warning
Certifique-se de que sua conta Stripe está configurada para aceitar a moeda escolhida. Se sua conta Stripe não suportar a moeda selecionada, as doações falharão no checkout.
:::

## Adicionando uma Página de Doação ao Seu Site B1.church

1. Vá para [b1.church](https://b1.church/) e faça login.
2. Clique no ícone de **Settings**.
3. Clique em **Add Tab**.
4. Escolha **Donation** como o tipo.
5. Insira um nome para a aba (por exemplo, "Give") e clique em **Save**.
6. Opcionalmente, altere o ícone da aba -- digite "Giv" na busca de ícones para encontrar um ícone relacionado a doações.

Sua página de doação agora está ativa. Os membros podem acessá-la em `seusubdominio.b1.church/donate`.

## Compartilhando Seu Link de Doação

Para encontrar sua URL de doação, vá para **B1 Admin** e clique no ícone de **Settings** para ver seu subdomínio. Seu link de doação segue o formato:

`https://seusubdominio.b1.church/donate`

Compartilhe este link no seu site, em emails ou no seu boletim para que os membros saibam onde fazer doações online.

## Notificações de Doação

Stripe envia uma notificação de email cada vez que uma doação é recebida. Para alterar o endereço de email de notificação, vá para o painel Stripe, clique em seu perfil no canto superior direito, escolha **Profile** e atualize seu endereço de email.

## Opções de Taxa de Processamento

Você pode configurar sua página de doação para permitir que os doadores opcionalmente cobrem taxas de processamento para que sua igreja receba o valor total da doação. Esta configuração é gerenciada em suas configurações de igreja no B1 Admin.

:::tip
Após a configuração, faça uma pequena doação de teste para confirmar se tudo está funcionando antes de anunciar doações online à sua congregação.
:::

## Configurando Kingdom Funding

Kingdom Funding é um processador de pagamento cristão que suporta cartões de crédito/débito e transferências ACH bancárias. Se sua igreja está inscrita no Kingdom Funding, você pode conectá-lo como seu gateway de doação.

:::info
A integração Kingdom Funding está atualmente em beta. Entre em contato com seu representante de conta B1 para ativá-lo para sua igreja.
:::

1. Inscreva-se ou faça login em [kingdomfunding.org](https://kingdomfunding.org).
2. Obtenha sua **Security Key** (pública) e **Private Key** do portal de comerciante Kingdom Funding.
3. No B1 Admin, vá para **Settings** e abra **Church Settings**.
4. Na seção **Giving**, defina o **Provider** para **Kingdom Funding**.
5. Cole sua Security Key no campo **Security Key** e sua Private Key no campo **Private Key**.
6. Defina a **Webhook Key** que você recebeu do Kingdom Funding e copie a URL de webhook exibida para suas configurações de comerciante Kingdom Funding para que Kingdom Funding possa notificar B1 sobre transações concluídas.
7. Salve.

Uma vez conectado, os membros verão um toggle de cartão/banco na página de doação e poderão fazer doações por cartão de crédito ou transferência ACH.

## Próximas Etapas

- Use [Stripe Import](stripe-import.md) para puxar transações online para B1 Admin se elas não estiverem sincronizando automaticamente
- Verifique seus [Donation Reports](donation-reports.md) para verificar se as doações online estão aparecendo corretamente
- Gere [Giving Statements](giving-statements.md) que incluam doações online e offline
