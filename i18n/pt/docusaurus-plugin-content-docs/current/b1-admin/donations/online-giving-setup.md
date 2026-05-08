---
title: "Configuração de Doações Online"
---

# Configuração de Doações Online

<div class="article-intro">

B1 Admin se integra com **Stripe** e **PayPal** para que seus membros possam fazer doações online através do seu site B1.church. Uma vez configurado, as doações online aparecem automaticamente em seus registros de doações junto com os presentes inseridos manualmente, mantendo tudo em um único sistema.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure seus [fundos de doação](funds.md) para que os doadores possam designar seus presentes
- Crie uma conta Stripe em [stripe.com](https://stripe.com) e ative-a (remova do modo teste)
- Tenha suas credenciais de login do B1 Admin prontas

</div>

## Configurando Stripe

1. Crie uma conta em [stripe.com](https://stripe.com) se você ainda não tiver uma. Certifique-se de **ativar sua conta** e remova-a do modo teste.
2. No Stripe, vá para **Developers > API Keys**.
3. Copie sua **Chave Publicável**.
4. Faça login em [B1 Admin](https://admin.b1.church/).
5. Clique em **Church** na navegação superior e clique em **Edit Church Settings**.
6. Clique no ícone de edição ao lado de **Church Settings**.
7. Desça até a seção **Giving**.
8. Defina o **Provider** como **Stripe**.
9. Cole sua Chave Publicável no campo **Public Key**.
10. Volte para Stripe e revele sua **Secret Key** (você pode visualizá-la apenas uma vez, então salve um backup).
11. Cole a Secret Key no campo **Secret Key** e clique em **Save**.

:::warning
Sua Chave Secreta do Stripe é mostrada apenas uma vez. Copie-a para um local seguro antes de navegar para fora do painel do Stripe. Se você a perder, precisará gerar uma nova chave.
:::

## Escolhendo Sua Moeda

Após selecionar Stripe como seu provedor, um menu suspenso **Currency** aparece ao lado de suas chaves de API. Escolha a moeda que corresponde à moeda de liquidação da sua conta Stripe para que as doações sejam cobradas corretamente.

As moedas suportadas incluem USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN e BRL. Você pode confirmar ou alterar a moeda padrão da sua conta no [Painel do Stripe](https://dashboard.stripe.com/settings/currencies).

:::info
A moeda que você seleciona aqui é usada para doações únicas, assinaturas recorrentes, cálculos de taxas e relatórios de doações. Se você mudar de moeda posteriormente, apenas novas doações e assinaturas usarão a nova moeda — os presentes recorrentes existentes continuam na moeda em que foram criados.
:::

:::warning
Certifique-se de que sua conta Stripe está configurada para aceitar a moeda que você escolhe. Se sua conta Stripe não suporta a moeda selecionada, as doações falharão no checkout.
:::

## Adicionando uma Página de Doação ao Seu Site B1.church

1. Vá para [b1.church](https://b1.church/) e faça login.
2. Clique no ícone **Settings**.
3. Clique em **Add Tab**.
4. Escolha **Donation** como o tipo.
5. Digite um nome para a aba (por exemplo, "Give") e clique em **Save**.
6. Opcionalmente, altere o ícone da aba -- digite "Giv" na pesquisa de ícones para encontrar um ícone relacionado a doações.

Sua página de doação está ao vivo. Os membros podem visitá-la em `yoursubdomain.b1.church/donate`.

## Compartilhando Seu Link de Doação

Para encontrar seu URL de doação, vá para **B1 Admin** e clique no ícone **Settings** para ver seu subdomínio. Seu link de doação segue o formato:

`https://yoursubdomain.b1.church/donate`

Compartilhe este link em seu site, em e-mails ou em seu boletim para que os membros saibam onde fazer doações online.

## Notificações de Doação

Stripe envia uma notificação por e-mail cada vez que uma doação é recebida. Para alterar o endereço de e-mail de notificação, vá para o painel do Stripe, clique em seu perfil no canto superior direito, escolha **Profile** e atualize seu endereço de e-mail.

## Opções de Taxa de Processamento

Você pode configurar sua página de doação para permitir que os doadores opcionalmente cubram as taxas de processamento para que sua igreja receba o valor total da doação. Esta configuração é gerenciada nas configurações da sua igreja dentro do B1 Admin.

:::tip
Após a configuração, faça uma pequena doação de teste para confirmar se tudo está funcionando antes de anunciar doações online para sua congregação.
:::

## Próximos Passos

- Use [Stripe Import](stripe-import.md) para extrair transações online para B1 Admin se não estiverem sincronizando automaticamente
- Verifique seus [Relatórios de Doação](donation-reports.md) para verificar se as doações online estão aparecendo corretamente
- Gere [Declarações de Doação](giving-statements.md) que incluem doações online e offline
