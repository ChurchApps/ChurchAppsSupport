---
title: "Fazendo doações no portal de membros do B1.church"
sidebar_label: "Fazendo uma doação"
description: "Faça uma contribuição única ou recorrente para a sua igreja pelo B1.church, com ou sem conta, e revise seu histórico de ofertas depois."
---

# Fazendo uma doação

<div class="article-intro">

Há duas formas de fazer uma doação pelo site do B1.church da sua igreja: a página pública de doação (sem necessidade de login) e a página de doação para membros (com login). Ambas usam um formulário seguro do provedor de pagamentos da sua igreja (a maioria das igrejas usa o Stripe).

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Para doações públicas, não é necessária conta -- basta acessar a página **Doar** da sua igreja.
- Para doações de membros com histórico e formas de pagamento salvas, [entre](../getting-started/logging-in.md) na sua conta primeiro.

</div>

## Página pública de doação (sem login) {#public-donation-page-no-login-required}

Qualquer pessoa pode fazer uma doação sem criar uma conta:

1. Acesse a página **Doar** da sua igreja.
2. O formulário de doação aparece do lado esquerdo da página. Escolha **Fazer uma doação** para uma contribuição única ou **Fazer uma doação recorrente** para contribuir em um cronograma (escolha a frequência e a data de início).
3. Informe seu **Nome**, **Sobrenome** e **E-mail**, depois os dados do seu cartão.
4. Em **Fundos**, informe um **Valor** e escolha o **Fundo**. Clique em **Adicionar mais** para dividir sua contribuição entre vários fundos.
5. Opcionalmente, adicione um **Memorando**. Se sua igreja permitir, você pode marcar a caixa para cobrir as taxas da transação.
6. Clique em **Doar** para concluir sua doação.

Para contribuir sem que seu nome apareça na doação, marque **Doar anonimamente (somente contribuições únicas)**. Os campos de nome e a opção recorrente desaparecem.

No lado direito da página, em **Gerenciar doações**, você verá um link para **Instruções para pagamento por ACH** se preferir contribuir por transferência bancária. Também há um botão **Login** (e um link **Entre para gerenciar doações existentes** abaixo do formulário) caso queira entrar para acessar recursos adicionais, como o histórico de doações.

A página **Ofertas** no portal de membros (`/mobile/donate`) mostra o mesmo formulário quando você não está conectado, com um link **Entre para gerenciar contribuições recorrentes e ver o histórico** logo abaixo.

:::tip
Se você já estiver conectado ao visitar a página pública de doação, será redirecionado automaticamente para a página de doação para membros, onde tem acesso ao seu histórico completo de ofertas e às formas de pagamento salvas.
:::

## Página de doação para membros (conectado) {#member-donation-page-logged-in}

Quando você está conectado, a página **Ofertas** no portal de membros mostra um botão **Doar** e um botão **Imprimir extrato** no topo, seguidos destas seções:

- **Este ano** (com o ano atual no título) -- Seu total de ofertas do ano até o momento e o número de contribuições, com um link **Todo o histórico**. Veja [Histórico de doações](./donation-history.md) para detalhes.
- **Recorrentes** -- Suas contribuições agendadas, com um link **Gerenciar**.
- **Atividade recente** -- Suas três últimas contribuições, com um link **Repetir última doação** que abre o formulário de doação.
- **Formas de pagamento** -- Seus cartões e contas bancárias salvos, com um link **Gerenciar** para adicionar um cartão ou conta bancária e editar ou remover os salvos.
- Um cartão de progresso de campanha, se sua igreja tiver uma campanha ativa.

Para doar:

1. Abra a página Ofertas pela aba **Doar** da sua igreja, pelo botão **Doar** na seção **Ofertas** do seu [painel Início](../getting-started/navigating.md#home), ou pelo **Histórico** na seção **Ofertas** da sua [página Eu](../getting-started/me-page.md). Na página Ofertas, toque em **Doar** para abrir o formulário de doação.
2. Escolha **Fazer uma doação** ou **Fazer uma doação recorrente**.
3. Selecione uma forma de pagamento salva ou informe os dados de um novo cartão. Ao informar um novo cartão, marque **Salvar este cartão para doações futuras** para mantê-lo para a próxima vez (se o provedor da sua igreja oferecer suporte a cartões salvos).
4. Escolha o **Fundo** para o qual quer contribuir e informe o **Valor**; clique em **Adicionar mais** para contribuir com mais de um fundo. A lista mostra apenas os fundos que sua igreja oferece aos doadores, mesmo que você seja um membro da equipe que pode ver outros fundos no B1 Admin.
5. Clique em **Visualizar doação** para revisar sua contribuição e depois em **Doar** para concluí-la. **Cancelar** volta à página Ofertas.

Depois que sua doação for processada, uma mensagem de sucesso aparece, e sua doação passa a aparecer no seu [histórico de doações](./donation-history.md).

:::info
Se as doações que você fez foram registradas em mais de uma moeda, seu total do ano até o momento e o total do Histórico são convertidos para a moeda da sua igreja, com a nota **Convertido às taxas de câmbio atuais** abaixo. As doações individuais no seu histórico continuam mostrando a moeda original.
:::

## Formas de pagamento {#payment-methods}

As doações são processadas com segurança pelo provedor de pagamentos conectado pela sua igreja. Com o que você pode pagar depende desse provedor:

- **Stripe** -- cartão de crédito ou débito, ou conta bancária (ACH).
- **Kingdom Funding** -- cartão de crédito ou débito, ou conta bancária (ACH).
- **Paystack** (igrejas na África) -- cartões locais e dinheiro móvel, na sua moeda local.
- **PayPal e Venmo** -- igrejas que já tinham o PayPal configurado exibem os botões **PayPal** e **Venmo** acima dos campos de cartão para contribuições únicas. As contribuições recorrentes usam os campos de cartão.

Quando você está conectado, suas formas de pagamento podem ser salvas para uso futuro, o que torna a contribuição mais rápida na próxima vez.

:::info Doação por conta bancária sem entrar
Se você contribuir como convidado (sem entrar) por conta bancária, a conta precisa ser verificada instantaneamente entrando no seu banco. Se isso não for possível, você verá: "Não foi possível verificar esta conta bancária instantaneamente. Doe com cartão ou entre e adicione a conta bancária no seu perfil de ofertas." Contas bancárias que precisam de alguns dias de verificação só podem ser adicionadas depois que você entrar.
:::

:::warning
Se a sua doação não for concluída, confira os seus dados de pagamento e tente novamente. Se o problema persistir, entre em contato com a secretaria da sua igreja para obter ajuda.
:::

## Próximos passos {#next-steps}

- [Histórico de doações](./donation-history.md) -- Veja suas doações anteriores e imprima extratos de ofertas
