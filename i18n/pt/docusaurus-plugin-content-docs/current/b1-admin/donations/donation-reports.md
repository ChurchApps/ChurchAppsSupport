---
title: "Relatórios de Doações"
description: "Analise os totais de doações, os doadores que deixaram de contribuir e os detalhes por lote no B1 Admin, com o painel de Resumo de Doações, a visão de Doadores Inativos e exportações em CSV."
---

# Relatórios de Doações

<div class="article-intro">

O B1 Admin oferece várias formas de visualizar e analisar os dados de doações da sua igreja. O painel de doações, na página **Resumo** de Doações, traz uma visão geral visual com gráficos e filtros, enquanto a seção de Relatórios oferece um relatório mais detalhado de Resumo de Doações. Use essas ferramentas para acompanhar as tendências de doação, preparar reuniões da diretoria ou conciliar os seus registros.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Certifique-se de que as doações foram [registradas em lotes](recording-donations.md) ou [importadas do Stripe](stripe-import.md)
- Verifique se os seus [fundos](funds.md) estão configurados corretamente, para que as doações sejam categorizadas de forma adequada

</div>

## Painel de Doações {#giving-dashboard}

O painel de doações é a visão **Painel** da página **Resumo**, a primeira página que você vê ao abrir a seção **Doações**.

1. Abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo do B1 Admin), expanda **Doações** e clique em **Resumo**. A página **Resumo** abre na visão **Painel**. A alternância **Visualização** no canto superior direito alterna entre **Painel** e **Doadores Inativos**.
2. Use a alternância **Semanal**, **Mensal** e **Trimestral** acima do relatório para escolher como as doações são agrupadas.
3. No painel **Filtrar relatório**, defina a **Data inicial** e a **Data final** (por padrão, do último ano até ontem) e, opcionalmente, escolha um **Fundo**; em seguida, clique em **Executar relatório**. O relatório é executado automaticamente com os padrões quando a página é aberta.
4. Quatro **cartões de indicadores** exibem as suas métricas de doação para o período selecionado:
   - **Total Doado** -- O valor total doado.
   - **Doação Média** -- O valor médio das doações.
   - **Doadores Únicos** -- O número de pessoas distintas que contribuíram.
   - **Total de Doações** -- O número total de doações individuais.
5. Abaixo dos indicadores, um gráfico de barras mostra as doações por semana, mês ou trimestre, separadas por fundo.
6. Clique em **Opções de download** e escolha **Resumo** para exportar um CSV com os totais por período e fundo, ou clique no ícone de impressão para imprimir o relatório. O logotipo da sua igreja (o **Logotipo para Fundo Claro** de [Site > Aparência](../website/appearance.md), se você tiver enviado um) e o nome aparecem centralizados no topo do relatório impresso. A impressão usa texto escuro e um gráfico claro, mesmo que você use o B1 Admin no modo escuro.

Se as doações do período tiverem sido feitas em mais de uma moeda, os totais dos indicadores são convertidos para a moeda da sua igreja, e uma nota **Convertido pelas taxas de câmbio atuais** aparece abaixo dos cartões. Veja [Suporte a Múltiplas Moedas](./multi-currency.md#converted-totals) para detalhes.

:::info
O painel mostra dados agregados de doações. Ele não inclui os nomes individuais dos doadores. Para os detalhes por doador, use a página de [Lotes](batches.md).
:::

## Doadores Inativos {#lapsed-givers}

Escolha **Doadores Inativos** na alternância **Visualização** para listar as pessoas que contribuíram em um período, mas não desde então. Por padrão, a comparação é entre o ano civil anterior e o ano atual até a data de hoje; altere a **Início do período anterior**, o **Fim do período anterior**, o **Início do período atual** ou o **Fim do período atual** no painel **Filtrar relatório** e clique em **Executar relatório** para ampliar ou restringir a busca. Esta visão exige a permissão **Visualizar Doações**. Cada linha mostra a pessoa, a data da última doação e o total dela no período anterior, e **Opções de download > Resumo** baixa a lista em CSV para uma mala direta ou uma lista de ligações de acompanhamento.

## Visualizando os Detalhes por Doador {#viewing-donor-level-details}

Para ver quem doou, quanto e para qual fundo:

1. Acesse **Doações > Lotes**.
2. Clique em um **nome de lote** para abri-lo.
3. A página de detalhes do lote lista cada doação com a forma de pagamento (e o número do cheque ou os últimos dígitos do cartão), o nome do doador, a data, as observações e o valor, com um total na parte inferior.
4. Clique em **Editar** em uma linha de doação para abrir todos os detalhes dessa doação individual, incluindo o fundo.
5. Clique em **Exportar** acima da lista para baixar um CSV com todas as informações de doadores e doações desse lote.

## Relatório de Resumo de Doações {#donation-summary-report}

Os relatórios de doações estão integrados à seção de Doações -- a página Resumo funciona como o seu relatório de resumo de doações:

1. No menu Jump, escolha **Doações > Resumo**.
2. Na visão **Painel**, defina a **Data inicial** e a **Data final** no painel **Filtrar relatório** e clique em **Executar relatório**.
3. Clique em **Opções de download** e escolha **Resumo** para exportar o relatório como um arquivo CSV.

## Exportando Dados {#exporting-data}

Você pode exportar os dados de doações a partir de vários lugares:

- **Página de Resumo** -- baixe um CSV com os totais de doações por semana, mês ou trimestre e por fundo
- **Página de detalhes do lote** -- baixe um CSV com as doações individuais e os dados dos doadores
- **Página de detalhes do fundo** -- baixe o histórico de doações de um fundo específico

:::tip
Para os relatórios de fim de ano, combine a exportação da página Resumo com a ferramenta de [Recibos de Doação](giving-statements.md) para obter tanto as tendências agregadas quanto os recibos individuais dos doadores.
:::

## Próximos Passos {#next-steps}

- Gere os [Recibos de Doação](giving-statements.md) para os seus doadores no fim do ano
- Revise os [lotes](batches.md) individuais para verificar os detalhes das doações
- Consulte as páginas de detalhes de cada [fundo](funds.md) para ver as doações por categoria
