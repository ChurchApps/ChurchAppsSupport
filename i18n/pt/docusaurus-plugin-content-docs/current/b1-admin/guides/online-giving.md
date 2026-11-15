---
title: "Guia: Configure as Doações Online"
description: "Configure as doações online no B1 Admin criando os fundos de doação, conectando o Stripe e adicionando uma página de doação ao seu site B1.church para os membros."
---

# Configure as Doações Online

<div class="article-intro">

Veja tudo o que é necessário para receber doações online na sua igreja -- desde a criação dos fundos de doação, passando pela conexão com o Stripe para o processamento de pagamentos, até o compartilhamento da página de doações com a sua congregação. Ao final, os membros poderão contribuir online pelo seu site e pelo aplicativo móvel.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Conta do B1 Admin com acesso de administrador -- veja [Funções e Permissões](../people/roles-permissions.md)
- Uma conta no Stripe (crie uma gratuitamente em [stripe.com](https://stripe.com), se necessário)

</div>

## Passo 1: Crie os Fundos de Doação {#step-1-create-donation-funds}

Os fundos são as categorias às quais os doadores podem contribuir. Você precisa de pelo menos um fundo antes de receber doações.

Siga o guia [Fundos](../donations/funds.md) para configurar as suas categorias de doação:

1. No [menu Jump](../introduction.md#getting-around-with-the-jump-menu), escolha **Doações > Fundos** e clique em **Adicionar Fundo**
2. Crie os fundos mais comuns (por exemplo, "Fundo Geral", "Fundo de Construção", "Missões")
3. Marque **Dedutível de impostos** nos fundos cujas contribuições devem constar nos recibos de doação de fim de ano, e mantenha **Visível para doadores** marcada nos fundos que os doadores devem poder escolher online

:::tip
Você pode adicionar mais fundos a qualquer momento. Comece pelas categorias de doação mais comuns.
:::

## Passo 2: Conecte o Stripe {#step-2-connect-stripe}

O Stripe cuida de todo o processamento de pagamentos. Você conectará a sua conta do Stripe ao B1 Admin para que as doações cheguem à sua conta bancária.

Siga o guia [Configuração de Doações Online](../donations/online-giving-setup.md) para conectar o Stripe:

1. Faça login no seu painel do Stripe e acesse **Desenvolvedores > Chaves de API** para encontrar a sua Chave Publicável e a sua Chave Secreta
2. No B1 Admin, acesse **Configurações**, clique em **Editar** na seção **Doações** e defina o **Provedor** como **Stripe**
3. Cole a Chave Publicável em **Chave pública** e a Chave Secreta em **Chave secreta**, confira a **Moeda** e clique em **Salvar**

O B1 também oferece suporte ao **Kingdom Funding** e ao **Paystack** (para igrejas na África) como provedores de doações -- veja [Configuração de Doações Online](../donations/online-giving-setup.md).

:::warning
O Stripe mostra a sua Chave Secreta apenas uma vez. Copie-a e salve-a antes de sair do painel do Stripe. Se você a perder, será necessário gerar uma nova.
:::

## Passo 3: Adicione uma Página de Doações ao Seu Site {#step-3-add-a-giving-page-to-your-website}

Facilite a contribuição adicionando uma página de doações ao seu site B1.

Siga os guias [Configuração de Doações Online](../donations/online-giving-setup.md) e [Gerenciando Páginas](../website/managing-pages.md) para:

1. Adicionar uma aba **Doação** ao seu site B1.church (ou um elemento **Doação** a uma página no criador de sites)
2. O endereço da sua página de doações será: `https://yoursubdomain.b1.church/donate`
3. Os membros podem contribuir sem fazer login (página pública) ou fazer login para usar formas de pagamento salvas e ver o histórico de doações
4. Para direcionar os doadores diretamente a um único fundo, clique em **Link de doação** nesse fundo, em **Doações > Fundos**, para copiar um link (ou baixar um QR code) com o fundo e o valor já preenchidos

## Passo 4: Faça uma Doação de Teste {#step-4-make-a-test-donation}

Antes de anunciar à sua congregação, verifique se tudo funciona.

1. Faça uma pequena doação de teste para confirmar que o fluxo funciona de ponta a ponta
2. Confira se a doação aparece no B1 Admin, em **Doações > Lotes**

:::tip
Para testar sem cobranças reais, você pode salvar primeiro as chaves de teste do Stripe e, depois, substituí-las pelas suas chaves de produção em **Configurações > Doações**, antes de anunciar à congregação.
:::

## Passo 5: Anuncie à Sua Congregação {#step-5-announce-to-your-congregation}

Divulgue para que os membros saibam que podem contribuir online.

1. Compartilhe o endereço de doações pelo seu site, pelos boletins informativos por e-mail, pelos boletins da igreja e pelas redes sociais
2. Os membros também podem contribuir pelo [Aplicativo B1](../../b1-church/giving/index.md) -- a função de doações já vem integrada

:::info
Os membros que fazem login podem salvar formas de pagamento, configurar doações recorrentes e ver o histórico de doações. As doações anônimas também funcionam -- sem necessidade de login.
:::

## Passo 6: Manutenção Contínua {#step-6-ongoing-management}

Mantenha os seus registros de doações atualizados e gere relatórios ao longo do ano.

1. As doações online são registradas automaticamente. Use a [Importação do Stripe](../donations/stripe-import.md) para capturar transações do Stripe que não foram sincronizadas -- clique em **Visualizar** para ver o que está faltando e, depois, em **Importar ausentes**
2. [Veja os relatórios de doações](../donations/donation-reports.md) em **Doações > Resumo** para acompanhar as tendências de doação e os totais por fundo
3. Confira **Doações > Doações não concluídas** para as doações recorrentes cujo cartão foi recusado, e clique em **Tentar novamente** quando o doador atualizar a forma de pagamento
4. [Gere os recibos de doação de fim de ano](../donations/giving-statements.md) para os registros fiscais dos seus doadores

:::tip
Execute uma visualização da Importação do Stripe antes de fechar cada mês, para que os seus registros batam com o Stripe. Veja o [Guia de Relatórios de Fim de Ano](./year-end-reports.md) para o processo completo de fim de ano.
:::

## Pronto! {#youre-done}

A sua igreja já está recebendo doações online. Os membros podem contribuir pelo seu site, pelo Aplicativo B1 ou por qualquer dispositivo com navegador da web. Todas as doações são registradas automaticamente no B1 Admin.

## Artigos Relacionados {#related-articles}

- [Fundos](../donations/funds.md) — crie e gerencie as categorias de doação
- [Lotes](../donations/batches.md) — organize as doações em grupos
- [Registrando Doações](../donations/recording-donations.md) — lance manualmente as doações em dinheiro e em cheque
- [Importação do Stripe](../donations/stripe-import.md) — traga as transações online para o B1 Admin
- [Relatórios de Doações](../donations/donation-reports.md) — veja as tendências e os totais de doação
- [Recibos de Doação](../donations/giving-statements.md) — gere os recibos fiscais de fim de ano
- [Fazendo Doações](../../b1-church/giving/making-donations.md) — a experiência de doação dos membros no B1.church e no Aplicativo B1
