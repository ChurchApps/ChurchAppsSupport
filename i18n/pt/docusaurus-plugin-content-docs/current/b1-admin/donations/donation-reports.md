---
title: "Relatórios de Doações"
---

# Relatórios de Doações

<div class="article-intro">

O B1 Admin oferece várias maneiras de visualizar e analisar os dados de doações de sua igreja. A página de Resumo de Doações fornece uma visão geral visual com gráficos e filtros, enquanto a seção de Relatórios oferece um relatório mais detalhado do Resumo de Doações. Use estas ferramentas para rastrear tendências de doações, preparar-se para reuniões do conselho ou reconciliar seus registros.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Garanta que doações foram [registradas em lotes](recording-donations.md) ou [importadas do Stripe](stripe-import.md)
- Verifique que seus [fundos](funds.md) estão configurados corretamente para que as doações sejam categorizadas adequadamente

</div>

## Painel de Doações

O **Giving Dashboard** é a primeira coisa que você vê quando clica em **Donations** na barra lateral. Fornece uma visão de alto nível de sua atividade de doações com indicadores-chave de desempenho.

1. Navegue para **Donations** na barra lateral para abrir o painel.
2. No topo, quatro **cartões KPI** exibem suas métricas de doação em um relance:
   - **Total Giving** -- O valor total doado no período selecionado.
   - **Average Gift** -- O valor médio de doação.
   - **Unique Donors** -- O número de pessoas distintas que doaram.
   - **Total Donations** -- O número total de doações individuais.
3. Use o **period toggle** para alternar entre visualizações **Weekly**, **Monthly** e **Quarterly**.
4. Abaixo dos KPIs, um gráfico exibe tendências de doações para o período selecionado.
5. Clique em **Download** para exportar um arquivo CSV com totais de doações.

## Página de Resumo de Doações

A página **Summary** fornece dados de doações agregados mais detalhados.

1. Navegue para **Donations** na barra lateral para abrir a página de Resumo.
2. Use o **date range filter** para selecionar o período que deseja revisar. Defina a data anterior no topo e a data mais recente na parte inferior.
3. A página exibe um gráfico de doações semanais para que você possa ver tendências em um relance.
4. Clique em **Download** para exportar um arquivo CSV com o valor total dado, a semana em que foi dado e o fundo para o qual foi dado.

:::info
A página de Resumo mostra dados de doações agregados. Ela não inclui nomes de doadores individuais. Para detalhes em nível de doador, use a página [Batches](batches.md).
:::

## Visualizando Detalhes em Nível de Doador

Para um detalhamento de quem doou, quanto e para qual fundo:

1. Navegue para **Donations > Batches**.
2. Clique em um **batch name** para abri-lo.
3. A página de detalhes do lote lista cada doação com o nome do doador, valor, fundo, data e método de pagamento.
4. Clique em um **donor's name** para ver um detalhamento de quantas vezes ele doou e quanto cada vez.
5. Clique em uma **donation ID** para abrir um painel lateral com os detalhes completos para aquela doação individual.
6. Clique em **Download** para exportar um CSV com todas as informações de doador e doação para aquele lote.

## Relatório de Resumo de Doações

O B1 Admin também inclui um relatório **Donation Summary** na seção de Relatórios:

1. Clique em **Reports** na barra lateral.
2. Selecione o relatório **Donation Summary**.
3. Escolha seus filtros (intervalo de datas, fundo, campus, etc.) e execute o relatório.

## Exportando Dados

Você pode exportar dados de doação de vários lugares:

- **Página de Resumo** -- baixe um CSV de totais de doações semanais por fundo
- **Página de detalhes do lote** -- baixe um CSV de doações individuais com detalhes do doador
- **Página de detalhes do fundo** -- baixe o histórico de doações para um fundo específico

:::tip
Para relatório de fim de ano, combine a exportação da página de Resumo com a ferramenta [Giving Statements](giving-statements.md) para obter tendências agregadas e declarações de doadores individuais.
:::

## Próximas Etapas

- Gere [Giving Statements](giving-statements.md) para seus doadores no final do ano
- Revise [lotes](batches.md) individuais para verificar detalhes de doação
- Verifique as páginas de detalhes de [fundos](funds.md) para detalhamentos de doações por categoria
