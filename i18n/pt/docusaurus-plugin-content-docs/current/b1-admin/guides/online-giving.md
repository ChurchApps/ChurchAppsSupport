---
title: "Guia: Configurar Doações Online"
---

# Configurar Doações Online

<div class="article-intro">

Acompanhe tudo o que é necessário para aceitar doações online na sua igreja — desde a criação de fundos de doação, até a conexão do Stripe para processamento de pagamentos, até o compartilhamento da página de doações com a sua congregação. Ao final, os membros poderão contribuir online através do seu site e aplicativo móvel.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Conta B1 Admin com acesso de administrador — veja [Funções e Permissões](../people/roles-permissions.md)
- Uma conta Stripe (crie uma gratuitamente em [stripe.com](https://stripe.com) se necessário)

</div>

## Passo 1: Criar Fundos de Doação

Fundos são as categorias para as quais os doadores podem contribuir. Você precisa de pelo menos um fundo antes de aceitar doações.

Siga o guia de [Fundos](../donations/funds.md) para configurar suas categorias de doação:

1. Crie seus fundos mais comuns (ex.: "Fundo Geral", "Fundo de Construção", "Missões")
2. Marque os fundos dedutíveis de impostos adequadamente — isso afeta os extratos de doações de final de ano

:::tip
Você pode adicionar mais fundos a qualquer momento. Comece com as categorias de doação mais comuns.
:::

## Passo 2: Conectar o Stripe

O Stripe cuida de todo o processamento de pagamentos. Você conectará sua conta Stripe ao B1 Admin para que as doações sejam depositadas na sua conta bancária.

Siga o guia de [Configuração de Doações Online](../donations/online-giving-setup.md) para conectar o Stripe:

1. Faça login no painel do Stripe e obtenha sua Chave Publicável e Chave Secreta
2. No B1 Admin, vá em Configurações e insira ambas as chaves

:::warning
O Stripe mostra sua Chave Secreta apenas uma vez. Copie e salve antes de sair do painel do Stripe. Se você perdê-la, precisará gerar uma nova.
:::

## Passo 3: Adicionar uma Página de Doações ao Seu Site

Torne as doações acessíveis adicionando uma página de doações ao seu site B1.

Siga os guias de [Configuração de Doações Online](../donations/online-giving-setup.md) e [Gerenciamento de Páginas](../website/managing-pages.md) para:

1. Adicionar uma aba "Doar" ao seu site B1.church
2. Sua URL de doações será: `https://seusubdominio.b1.church/donate`
3. Os membros podem contribuir sem fazer login (página pública) ou fazer login para métodos de pagamento salvos e histórico de doações

## Passo 4: Fazer uma Doação de Teste

Antes de anunciar para sua congregação, verifique se tudo funciona.

1. Faça uma pequena doação de teste para verificar se o fluxo funciona de ponta a ponta
2. Verifique se a doação aparece no B1 Admin em Doações

:::tip
Use o modo de teste do Stripe primeiro se quiser verificar sem cobranças reais, depois mude para o modo ao vivo antes de anunciar para sua congregação.
:::

## Passo 5: Anunciar para Sua Congregação

Divulgue para que os membros saibam que podem contribuir online.

1. Compartilhe a URL de doações pelo seu site, boletins informativos por e-mail, informativos e redes sociais
2. Os membros também podem contribuir pelo [aplicativo B1 Mobile](../../b1-mobile/giving/) — o recurso de doações já está integrado

:::info
Membros que fazem login podem salvar métodos de pagamento, configurar doações recorrentes e visualizar seu histórico de doações. Doações anônimas também funcionam — não é necessário login.
:::

## Passo 6: Gerenciamento Contínuo

Mantenha seus registros de doações atualizados e gere relatórios ao longo do ano.

1. [Importe transações do Stripe](../donations/stripe-import.md) regularmente (semanal ou mensalmente) para manter seus registros atualizados
2. [Visualize relatórios de doações](../donations/donation-reports.md) para acompanhar tendências e totais por fundo
3. [Gere extratos de doações de final de ano](../donations/giving-statements.md) para os registros fiscais dos seus doadores

:::tip
Execute as importações do Stripe pelo menos mensalmente para que seus registros fiquem atualizados. Veja o [Guia de Relatórios de Final de Ano](./year-end-reports.md) para o processo completo de final de ano.
:::

## Pronto!

Sua igreja agora está aceitando doações online. Os membros podem contribuir pelo seu site, pelo aplicativo B1 Mobile ou por qualquer dispositivo com navegador web. Todas as doações são rastreadas automaticamente no B1 Admin.

## Artigos Relacionados

- [Fundos](../donations/funds.md) — criar e gerenciar categorias de doação
- [Lotes](../donations/batches.md) — organizar doações em grupos
- [Registrar Doações](../donations/recording-donations.md) — inserir manualmente doações em dinheiro e cheque
- [Importação do Stripe](../donations/stripe-import.md) — importar transações online para o B1 Admin
- [Relatórios de Doações](../donations/donation-reports.md) — visualizar tendências e totais de doações
- [Extratos de Doações](../donations/giving-statements.md) — gerar extratos fiscais de final de ano
- [Fazer Doações (Web)](../../b1-church/giving/making-donations.md) — a experiência de doação do membro
- [Fazer Doações (Móvel)](../../b1-mobile/giving/making-donations.md) — doações pelo aplicativo móvel
