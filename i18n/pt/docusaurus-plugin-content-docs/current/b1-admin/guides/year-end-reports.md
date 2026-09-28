---
title: "Guia: Gere Relatórios de Doações de Fim de Ano"
---

# Gere Relatórios de Doações de Fim de Ano

<div class="article-intro">

Percorra o processo de fim de ano de finalização de seus registros de doação, verificação de configurações de fundos e geração de declarações de doações dedutíveis do imposto para cada doador. Isso é normalmente feito no início de janeiro para o ano civil anterior.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Conta B1 Admin com acesso financeiro
- Doações registradas ao longo do ano (online via Stripe e/ou inseridas manualmente)
- Acesso à sua conta Stripe se você aceitar doações online

</div>

## Passo 1: Importe Transações Finais do Stripe

Certifique-se de que todas as doações online do final do ano estejam em seu sistema.

Siga o guia [Importação do Stripe](../donations/stripe-import.md) para:

1. Navegue até Doações > Lotes > Importação do Stripe
2. Selecione um intervalo de datas cobrindo o final do ano (por exemplo, 1 de dezembro - 31 de dezembro)
3. Clique em Visualizar primeiro para revisar e depois Importar Faltando para finalizar

:::warning
Execute esta importação antes de gerar declarações. Qualquer transação que você não tiver importado não aparecerá nas declarações do doador.
:::

## Passo 2: Revise Relatórios de Doações

Verifique se seus registros são precisos antes de gerar declarações.

Siga o guia [Relatórios de Doações](../donations/donation-reports.md) para:

1. Verifique a página de resumo de doações para o ano completo
2. Revise totalizações por fundo e compare com seus extratos bancários para capturar discrepâncias
3. Clique em lotes individuais para verificar detalhes em nível de doador, se necessário

## Passo 3: Verifique o Status Fiscal do Fundo

Certifique-se de que a configuração dedutível do imposto de cada fundo está correta para que as declarações sejam precisas.

Siga o guia [Fundos](../donations/funds.md) para:

1. Abra cada fundo e confirme se a configuração dedutível do imposto está correta

:::info
Apenas doações para fundos marcados como dedutíveis do imposto aparecerão nas declarações de doação. Se um fundo deve ser dedutível do imposto mas não estiver marcado dessa forma, atualize-o antes de gerar as declarações.
:::

## Passo 4: Gere Declarações de Doações

Crie as declarações oficiais de doação para seus doadores.

Siga o guia [Declarações de Doações](../donations/giving-statements.md) para:

1. Navegue até **Doações > Declarações de Doações**
2. Selecione o ano na lista suspensa e revise as estatísticas de resumo
3. Escolha seu método de download:
   - **Baixar ZIP** -- arquivos CSV individuais, um por doador
   - **Imprimir Tudo** -- visualização para impressão com cada declaração em uma nova página

:::tip
Gere declarações no início de janeiro enquanto os registros estão frescos. Isso lhe dá tempo para capturar problemas antes de enviá-los.
:::

## Passo 5: Distribua para Doadores

Coloque as declarações nas mãos de seus doadores.

1. Imprima e envie declarações por correio ou envie CSVs individuais por e-mail para os doadores
2. Os membros também podem visualizar seu próprio histórico de doações e imprimir declarações de [B1.church](../../b1-church/giving/donation-history.md) e do [aplicativo B1 Mobile](../../b1-mobile/giving/donation-history.md)

## Pronto!

Seus relatórios de doações de fim de ano estão completos. Os doadores têm suas declarações dedutíveis de impostos e seus registros financeiros estão finalizados para o ano.

## Artigos Relacionados

- [Importação do Stripe](../donations/stripe-import.md) -- importar transações online
- [Relatórios de Doações](../donations/donation-reports.md) -- visualizar tendências e totalizações de doações
- [Fundos](../donations/funds.md) -- gerenciar fundos e configurações dedutíveis de impostos
- [Declarações de Doações](../donations/giving-statements.md) -- gerar declarações de fim de ano
- [Registrando Doações](../donations/recording-donations.md) -- inserir manualmente doações em dinheiro/cheque
- [Histórico de Doações (Web)](../../b1-church/giving/donation-history.md) -- visualização de auto-serviço do membro
- [Guia de Configuração de Doações Online](./online-giving.md) -- configuração inicial de Stripe e doações
