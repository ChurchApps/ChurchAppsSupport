---
title: "Importação do Stripe"
---

# Importação do Stripe

<div class="article-intro">

Se você aceita doações online pelo Stripe, a ferramenta de Importação do Stripe permite importar essas transações para o B1 Admin para que todos os seus dados de contribuição fiquem em um só lugar. Isso é especialmente útil para capturar quaisquer transações que não foram sincronizadas automaticamente.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Conclua a [Configuração de Doações Online](online-giving-setup.md) para conectar sua conta Stripe ao B1 Admin
- Verifique se você tem doações no seu painel do Stripe para o intervalo de datas que deseja importar

</div>

## Como Funciona

O processo de importação usa um fluxo de trabalho em duas etapas: primeiro você visualiza o que seria importado, depois confirma a importação. Esta abordagem de simulação permite que você revise tudo antes que quaisquer dados sejam criados.

## Importando Transações

1. No **B1 Admin**, navegue até **Doações > Lotes**.
2. Clique no link **Importação do Stripe** na parte inferior da página de Lotes.
3. Selecione um **intervalo de datas** para as transações que deseja importar.
4. Clique em **Visualizar** para executar uma verificação de simulação.

## Revisando a Visualização

A visualização exibe cada transação do Stripe junto com um indicador de status:

- **Nova** -- esta transação ainda não foi importada e será incluída se você prosseguir.
- **Já Importada** -- esta transação já existe no B1 Admin e será ignorada.
- **Ignorada** -- esta transação foi excluída por outro motivo (por exemplo, um reembolso ou cobrança falha).

Uma seção de resumo no topo mostra o número total de transações em cada categoria e os valores em dólares envolvidos.

:::info
A etapa de visualização não cria nenhum registro. É uma verificação somente leitura para que você possa confirmar o que acontecerá antes de confirmar.
:::

## Concluindo a Importação

1. Revise os resultados da visualização e os totais do resumo.
2. Clique em **Importar Faltantes** para importar todas as transações marcadas como **Nova**.
3. Após a conclusão da importação, os indicadores de status ao lado de cada transação são atualizados para mostrar o resultado.

## Dicas para Usar a Importação do Stripe

- Execute a importação regularmente (semanal ou mensalmente) para manter seus registros atualizados.
- Se uma transação aparecer como **Já Importada**, significa que o B1 Admin já possui um registro correspondente -- nenhuma ação é necessária.
- Use o filtro de intervalo de datas para focar em um período específico se estiver procurando por transações particulares.

:::tip
Após a importação, visite a página de [Lotes](batches.md) para verificar se as doações importadas aparecem corretamente e se os totais correspondem ao que você vê no seu painel do Stripe.
:::

## Próximos Passos

- Confira os [Relatórios de Doações](donation-reports.md) para revisar as transações importadas junto com seus outros dados de contribuição
- Certifique-se de que as doações importadas estão atribuídas aos [fundos](funds.md) corretos para declarações de contribuições precisas através das [Declarações de Contribuições](giving-statements.md)
