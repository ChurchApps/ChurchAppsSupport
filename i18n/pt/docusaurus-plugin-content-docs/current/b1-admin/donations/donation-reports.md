---
title: "Relatórios de Doações"
---

# Relatórios de Doações

<div class="article-intro">

B1 Admin oferece várias maneiras de visualizar e analisar os dados de doações de sua igreja. O painel de doações na página **Resumo** das Doações fornece uma visão geral visual com gráficos e filtros, enquanto a seção de Relatórios oferece um relatório mais detalhado de Resumo de Doações. Use essas ferramentas para rastrear tendências de doações, se preparar para reuniões do conselho ou reconciliar seus registros.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Certifique-se de que as doações foram [registradas em lotes](recording-donations.md) ou [importadas do Stripe](stripe-import.md)
- Verifique se seus [fundos](funds.md) estão configurados corretamente para que as doações sejam categorizadas adequadamente

</div>

## Painel de Doações

O painel de doações é a aba **Painel** da página **Resumo**, a primeira página que você vê quando abre a seção **Doações**.

1. Abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo de B1 Admin), expanda **Doações** e clique em **Resumo**. A página **Resumo** abre na aba **Painel**.
2. Use o toggle **Semanal**, **Mensal** e **Trimestral** acima do relatório para escolher como as doações são agrupadas.
3. No painel **Filtrar Relatório**, defina a **Data de Início** e **Data de Término** (por padrão, o ano passado até ontem) e opcionalmente escolha um **Fundo**, depois clique em **Executar Relatório**. O relatório é executado automaticamente com os padrões quando a página abre.
4. Quatro **cards KPI** exibem suas métricas de doações para o intervalo selecionado:
   - **Total de Doações** -- O valor total doado.
   - **Doação Média** -- O valor da doação média.
   - **Doadores Únicos** -- O número de pessoas distintas que doaram.
   - **Total de Doações** -- O número total de doações individuais.
5. Abaixo dos KPIs, um gráfico de barras mostra doações por semana, mês ou trimestre, dividido por fundo.
6. Clique em **Opções de Download** e escolha **Resumo** para exportar um CSV dos totais por período e fundo, ou clique no ícone de impressão para imprimir o relatório. O nome de sua igreja aparece no topo do relatório impresso.

Se as doações no período foram dadas em mais de uma moeda, os totais de KPI são convertidos para a moeda de sua igreja e uma nota **Convertido às taxas de câmbio atuais** aparece abaixo dos cards. Veja [Suporte Multimoeda](./multi-currency.md#converted-totals) para detalhes.

:::info
O painel mostra dados de doações agregadas. Não inclui nomes individuais de doadores. Para detalhes em nível de doador, use a página [Lotes](batches.md).
:::

## Doadores Inativos

A aba **Doadores Inativos** ao lado da aba **Painel** lista pessoas que doaram durante um período mas não desde então. Por padrão, compara o ano calendário passado com este ano até a data; altere qualquer intervalo de data para ampliar ou estreitar a pesquisa. Cada linha mostra a pessoa, a data de seu último presente e seu total para o período anterior, e **Opções de Download > Resumo** baixa a lista como um CSV para uma correspondência de acompanhamento ou lista de chamadas.

## Visualizando Detalhes em Nível de Doador

Para uma divisão de quem doou, quanto e para qual fundo:

1. Navegue para **Doações > Lotes**.
2. Clique em um **nome de lote** para abri-lo.
3. A página de detalhes do lote lista cada doação com o nome do doador, valor, fundo, data e método de pagamento.
4. Clique em um **nome de doador** para ver uma divisão de quantas vezes eles doaram e quanto cada vez.
5. Clique em um **ID de doação** para abrir um painel lateral com os detalhes completos para essa doação individual.
6. Clique em **Baixar** para exportar um CSV com todas as informações de doador e doação para esse lote.

## Relatório de Resumo de Doações

Os relatórios de doações são construídos diretamente na seção de Doações -- a página Resumo serve como seu relatório de resumo de doações:

1. No menu Jump, escolha **Doações > Resumo**.
2. Na aba **Painel**, defina a **Data de Início** e **Data de Término** no painel **Filtrar Relatório** e clique em **Executar Relatório**.
3. Clique em **Opções de Download** e escolha **Resumo** para exportar o relatório como um arquivo CSV.

## Exportando Dados

Você pode exportar dados de doações de vários lugares:

- **Página de Resumo** -- baixe um CSV dos totais de doações por semana, mês ou trimestre e fundo
- **Página de detalhes do lote** -- baixe um CSV de doações individuais com detalhes do doador
- **Página de detalhes do fundo** -- baixe o histórico de doações para um fundo específico

:::tip
Para relatórios de fim de ano, combine a exportação da página Resumo com a ferramenta [Declarações de Doações](giving-statements.md) para obter tendências agregadas e declarações de doadores individuais.
:::

## Próximas Etapas

- Gere [Declarações de Doações](giving-statements.md) para seus doadores no final do ano
- Revise [lotes](batches.md) individuais para verificar detalhes de doações
- Verifique as páginas de detalhes de [fundos](funds.md) para divisões de doações por categoria
