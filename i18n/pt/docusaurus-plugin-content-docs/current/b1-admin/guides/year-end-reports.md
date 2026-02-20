---
title: "Guia: Gerar Relatórios de Doações de Final de Ano"
---

# Gerar Relatórios de Doações de Final de Ano

<div class="article-intro">

Acompanhe o processo de final de ano para finalizar seus registros de doações, verificar as configurações dos fundos e gerar extratos de doações dedutíveis de impostos para cada doador. Isso é normalmente feito no início de janeiro referente ao ano calendário anterior.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Conta B1 Admin com acesso financeiro
- Doações registradas ao longo do ano (online via Stripe e/ou inseridas manualmente)
- Acesso à sua conta Stripe se você aceita doações online

</div>

## Passo 1: Importar as Últimas Transações do Stripe

Certifique-se de que todas as doações online do final do ano estejam no seu sistema.

Siga o guia de [Importação do Stripe](../donations/stripe-import.md) para:

1. Navegar até Doações > Lotes > Importação do Stripe
2. Selecionar um intervalo de datas cobrindo o final do ano (ex.: 1 de dezembro - 31 de dezembro)
3. Clicar em Visualizar primeiro para revisar, depois em Importar Faltantes para finalizar

:::warning
Execute esta importação antes de gerar os extratos. Quaisquer transações que você não importou não aparecerão nos extratos dos doadores.
:::

## Passo 2: Revisar Relatórios de Doações

Verifique se seus registros estão precisos antes de gerar os extratos.

Siga o guia de [Relatórios de Doações](../donations/donation-reports.md) para:

1. Verificar a página de resumo de doações do ano inteiro
2. Revisar os totais por fundo e comparar com seus extratos bancários para identificar quaisquer discrepâncias
3. Clicar em lotes individuais para verificar detalhes por doador, se necessário

## Passo 3: Verificar o Status Fiscal dos Fundos

Certifique-se de que a configuração de dedutibilidade fiscal de cada fundo esteja correta para que os extratos sejam precisos.

Siga o guia de [Fundos](../donations/funds.md) para:

1. Abrir cada fundo e confirmar se a configuração de dedutibilidade fiscal está correta

:::info
Somente doações para fundos marcados como dedutíveis de impostos aparecerão nos extratos de doações. Se um fundo deveria ser dedutível de impostos mas não está marcado dessa forma, atualize-o antes de gerar os extratos.
:::

## Passo 4: Gerar Extratos de Doações

Crie os extratos oficiais de doações para seus doadores.

Siga o guia de [Extratos de Doações](../donations/giving-statements.md) para:

1. Navegar até Doações > Extratos
2. Selecionar o ano no menu suspenso e revisar as estatísticas resumidas
3. Escolher o método de download:
   - **Baixar ZIP** — arquivos CSV individuais, um por doador
   - **Imprimir Todos** — visualização para impressão com cada extrato em uma nova página

:::tip
Gere os extratos no início de janeiro enquanto os registros estão frescos. Isso lhe dá tempo para identificar quaisquer problemas antes de enviá-los pelo correio.
:::

## Passo 5: Distribuir aos Doadores

Entregue os extratos aos seus doadores.

1. Imprima e envie os extratos pelo correio, ou envie os CSVs individuais por e-mail aos doadores
2. Os membros também podem visualizar seu próprio histórico de doações e imprimir extratos no [B1.church](../../b1-church/giving/donation-history.md) e no [aplicativo B1 Mobile](../../b1-mobile/giving/donation-history.md)

## Pronto!

Seus relatórios de doações de final de ano estão completos. Os doadores têm seus extratos dedutíveis de impostos e seus registros financeiros estão finalizados para o ano.

## Artigos Relacionados

- [Importação do Stripe](../donations/stripe-import.md) — importar transações online
- [Relatórios de Doações](../donations/donation-reports.md) — visualizar tendências e totais de doações
- [Fundos](../donations/funds.md) — gerenciar fundos e configurações de dedutibilidade fiscal
- [Extratos de Doações](../donations/giving-statements.md) — gerar extratos de final de ano
- [Registrar Doações](../donations/recording-donations.md) — inserir manualmente doações em dinheiro/cheque
- [Histórico de Doações (Web)](../../b1-church/giving/donation-history.md) — visualização de autoatendimento do membro
- [Guia de Configuração de Doações Online](./online-giving.md) — configuração inicial do Stripe e doações
