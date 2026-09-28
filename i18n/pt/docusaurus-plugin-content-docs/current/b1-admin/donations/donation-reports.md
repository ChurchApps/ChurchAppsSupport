---
title: "Relatórios de Doações"
---

# Relatórios de Doações

<div class="article-intro">

O B1 Admin oferece várias maneiras de visualizar e analisar dados de doações da sua igreja. A página Resumo de Doações oferece uma visão geral visual com gráficos e filtros, enquanto a seção Relatórios oferece um relatório Resumo de Doações mais detalhado. Use estas ferramentas para rastrear tendências de doações, preparar para reuniões de conselho ou reconciliar seus registros.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Certifique-se de que as doações foram [registradas em lotes](recording-donations.md) ou [importadas do Stripe](stripe-import.md)
- Verifique se seus [fundos](funds.md) estão configurados corretamente para que as doações sejam categorizadas adequadamente

</div>

## Painel de Doações

O **Painel de Doações** é a primeira coisa que você vê ao abrir a seção **Doações**. Ele fornece uma visão de alto nível de sua atividade de doações com indicadores-chave de desempenho.

1. Abra o **menu de seção** no canto superior esquerdo e escolha **Doações** para abrir o painel.
2. No topo, quatro **cartões de KPI** exibem suas métricas de doações em um relance:
   - **Total de Doações** -- O valor total doado no período selecionado.
   - **Doação Média** -- O valor médio de doação.
   - **Doadores Únicos** -- O número de pessoas distintas que doaram.
   - **Total de Doações** -- O número total de doações individuais.
3. Use o **alternador de período** para alternar entre visualizações **Semanais**, **Mensais** e **Trimestrais**.
4. Abaixo dos KPIs, um gráfico exibe tendências de doações para o período selecionado.
5. Clique em **Baixar** para exportar um arquivo CSV com totais de doações.

Se as doações no período foram feitas em mais de uma moeda, os totais de KPI são convertidos para a moeda da sua igreja e uma nota de **Convertido para as taxas de câmbio atuais** aparece abaixo dos cartões. Consulte [Suporte Multi-Moeda](./multi-currency.md#converted-totals) para detalhes.

## Doadores Inativos

A guia **Doadores Inativos** ao lado do painel lista pessoas que doaram durante um período, mas não desde então. Por padrão, compara o ano calendário anterior com o ano atual até agora; altere qualquer intervalo de datas para ampliar ou restringir a pesquisa. Cada linha mostra a pessoa, a data de sua última doação e seu total do período anterior, e **Exportar** baixa a lista como CSV para correspondência de acompanhamento ou lista de chamadas.

## Página de Resumo de Doações

A página de **Resumo** fornece dados de doações agregados mais detalhados.

1. Abra o **menu de seção** no canto superior esquerdo e escolha **Doações** para abrir a página de Resumo.
2. Use o **filtro de intervalo de datas** para selecionar o período que deseja revisar. Defina a data anterior no topo e a data mais recente na parte inferior.
3. A página exibe um gráfico de doações semanais para que você possa ver tendências em um relance.
4. Clique em **Baixar** para exportar um arquivo CSV com o valor total doado, a semana em que foi doado e o fundo para o qual foi doado.

:::info
A página de Resumo mostra dados de doações agregados. Não inclui nomes individuais de doadores. Para detalhes em nível de doador, use a página [Lotes](batches.md).
:::

## Visualizando Detalhes em Nível de Doador

Para um detalhamento de quem doou, quanto doou e para qual fundo:

1. Navegue até **Doações > Lotes**.
2. Clique em um **nome de lote** para abri-lo.
3. A página de detalhes do lote lista cada doação com o nome do doador, valor, fundo, data e método de pagamento.
4. Clique no **nome de um doador** para ver um detalhamento de quantas vezes ele doou e quanto em cada vez.
5. Clique em um **ID de doação** para abrir um painel lateral com os detalhes completos dessa doação individual.
6. Clique em **Baixar** para exportar um CSV com todas as informações de doador e doação para esse lote.

## Relatório de Resumo de Doações

O relatório de doações é incorporado diretamente na seção Doações -- a página de Resumo funciona como seu relatório de resumo de doações:

1. Abra o **menu de seção** no canto superior esquerdo e escolha **Doações** para abrir a página de Resumo.
2. Use o **filtro de intervalo de datas** para selecionar o período sobre o qual deseja reportar.
3. Clique em **Baixar** para exportar o relatório como um arquivo CSV.

## Exportando Dados

Você pode exportar dados de doações de vários locais:

- **Página de Resumo** -- baixe um CSV de totais de doações semanais por fundo
- **Página de detalhes do lote** -- baixe um CSV de doações individuais com detalhes do doador
- **Página de detalhes de fundo** -- baixe histórico de doações para um fundo específico

:::tip
Para relatório de final de ano, combine a exportação da página de Resumo com a ferramenta [Declarações de Doações](giving-statements.md) para obter tendências agregadas e declarações individuais de doadores.
:::

## Próximos Passos

- Gere [Declarações de Doações](giving-statements.md) para seus doadores no final do ano
- Revise [lotes](batches.md) individuais para verificar detalhes de doações
- Verifique as páginas de detalhes de [fundo](funds.md) para detalhamentos de doações por categoria
