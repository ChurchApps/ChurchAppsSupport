---
title: "Relatórios de doações"
---

# Relatórios de doações

<div class="article-intro">

O B1 Admin oferece várias formas de visualizar e analisar os dados de doações da sua igreja. O painel de doações na página **Resumo** de Doações traz uma visão geral visual com gráficos e filtros, enquanto a seção de Relatórios oferece um relatório de Resumo de doações mais detalhado. Use essas ferramentas para acompanhar tendências de contribuição, preparar reuniões do conselho ou conciliar seus registros.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Certifique-se de que as doações foram [registradas em lotes](recording-donations.md) ou [importadas do Stripe](stripe-import.md)
- Verifique se os seus [fundos](funds.md) estão configurados corretamente para que as doações sejam categorizadas adequadamente

</div>

## Painel de doações

O painel de doações é a visualização **Painel** da página **Resumo**, a primeira página que você vê ao abrir a seção **Doações**.

1. Abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo do B1 Admin), expanda **Doações** e clique em **Resumo**. A página **Resumo** abre na visualização **Painel**. A alternância **Visualização** no canto superior direito alterna entre **Painel** e **Doadores inativos**.
2. Use a alternância **Semanal**, **Mensal** e **Trimestral** acima do relatório para escolher como as contribuições são agrupadas.
3. No painel **Filtrar relatório**, defina a **Data inicial** e a **Data final** (por padrão, do último ano até ontem) e, opcionalmente, escolha um **Fundo**, depois clique em **Gerar relatório**. O relatório é gerado automaticamente com os padrões quando a página é aberta.
4. Quatro **cartões de indicadores** exibem as suas métricas de contribuição para o intervalo selecionado:
   - **Total arrecadado** -- O valor total doado.
   - **Doação média** -- O valor médio das doações.
   - **Doadores únicos** -- O número de pessoas distintas que contribuíram.
   - **Total de doações** -- O número total de doações individuais.
5. Abaixo dos indicadores, um gráfico de barras mostra as contribuições por semana, mês ou trimestre, separadas por fundo.
6. Clique em **Opções de download** e escolha **Resumo** para exportar um CSV com os totais por período e fundo, ou clique no ícone de impressora para imprimir o relatório. O logotipo da sua igreja (o **Logotipo para fundo claro** de [Site > Aparência](../website/appearance.md), caso você tenha enviado um) e o nome aparecem centralizados no topo do relatório impresso. A impressão usa texto escuro e um gráfico claro, mesmo que você use o B1 Admin no modo escuro.

Se as doações do período foram feitas em mais de uma moeda, os totais dos indicadores são convertidos para a moeda da sua igreja e uma nota **Convertido às taxas de câmbio atuais** aparece abaixo dos cartões. Consulte [Suporte a várias moedas](./multi-currency.md#converted-totals) para mais detalhes.

:::info
O painel mostra dados agregados de contribuições. Ele não inclui os nomes individuais dos doadores. Para detalhes por doador, use a página de [Lotes](batches.md).
:::

## Doadores inativos

Escolha **Doadores inativos** na alternância **Visualização** para listar pessoas que contribuíram em um período, mas não desde então. Por padrão, ela compara o último ano civil com o ano atual até a data de hoje; altere qualquer um dos intervalos de datas para ampliar ou restringir a busca. Cada linha mostra a pessoa, a data da última doação e o total dela no período anterior, e **Opções de download > Resumo** baixa a lista como CSV para uma mala direta de acompanhamento ou uma lista de ligações.

## Visualizando detalhes por doador

Para ver uma análise de quem contribuiu, quanto e para qual fundo:

1. Acesse **Doações > Lotes**.
2. Clique no **nome de um lote** para abri-lo.
3. A página de detalhes do lote lista cada doação com o método (e o número do cheque ou os últimos dígitos do cartão), o nome do doador, a data, as observações e o valor, com o total no final.
4. Clique em **Editar** na linha de uma doação para abrir os detalhes completos dessa doação individual, incluindo o seu fundo.
5. Clique em **Exportar** acima da lista para baixar um CSV com todas as informações de doadores e doações desse lote.

## Relatório de resumo de doações

O relatório de doações está integrado à seção Doações -- a página Resumo funciona como o seu relatório de resumo de doações:

1. No menu Jump, escolha **Doações > Resumo**.
2. Na visualização **Painel**, defina a **Data inicial** e a **Data final** no painel **Filtrar relatório** e clique em **Gerar relatório**.
3. Clique em **Opções de download** e escolha **Resumo** para exportar o relatório como um arquivo CSV.

## Exportando dados

Você pode exportar dados de doações a partir de vários lugares:

- **Página de resumo** -- baixe um CSV com os totais de contribuições por semana, mês ou trimestre e fundo
- **Página de detalhes do lote** -- baixe um CSV com as doações individuais e os dados dos doadores
- **Página de detalhes do fundo** -- baixe o histórico de doações de um fundo específico

:::tip
Para relatórios de fim de ano, combine a exportação da página de Resumo com a ferramenta de [Recibos de doação](giving-statements.md) para obter tanto as tendências agregadas quanto os recibos individuais dos doadores.
:::

## Próximos passos

- Gere os [Recibos de doação](giving-statements.md) para seus doadores no fim do ano
- Revise os [lotes](batches.md) individuais para verificar os detalhes das doações
- Confira as páginas de detalhes dos [fundos](funds.md) para ver as contribuições por categoria
