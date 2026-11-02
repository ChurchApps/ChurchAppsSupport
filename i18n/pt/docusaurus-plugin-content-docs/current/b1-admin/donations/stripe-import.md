---
title: "Importação do Stripe"
---

# Importação do Stripe

<div class="article-intro">

Se você aceita doações online pelo Stripe, a ferramenta de Importação do Stripe permite trazer essas transações para o B1 Admin, para que todos os seus dados de doações fiquem em um só lugar. Isso é especialmente útil para capturar transações que não foram sincronizadas automaticamente.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Conclua a [Configuração de doações online](online-giving-setup.md) para conectar sua conta do Stripe ao B1 Admin. O item de menu **Importação do Stripe** e o botão da página de Lotes só aparecem quando o gateway de doações da sua igreja é o Stripe, e somente para pessoas que podem editar doações
- Verifique se você tem doações no seu painel do Stripe para o intervalo de datas que deseja importar

</div>

## Como funciona

O processo de importação usa um fluxo em duas etapas: primeiro você visualiza o que seria importado, depois confirma a importação. Essa abordagem de simulação permite revisar tudo antes que qualquer dado seja criado.

## Importando transações

1. No **B1 Admin**, acesse **Doações > Importação do Stripe**. (Você também pode clicar em **Importar transações do Stripe ausentes** no topo da página **Lotes**.)
2. A página **Importação do Stripe** é aberta.
3. Selecione um **intervalo de datas** para as transações que deseja importar.
4. Clique em **Visualizar** para executar uma verificação de simulação.

## Revisando a visualização

A visualização exibe cada transação do Stripe junto com um indicador de situação:

- **Novo** -- esta transação ainda não foi importada e será incluída se você prosseguir.
- **Já importado** -- esta transação já existe no B1 Admin e será ignorada.
- **Ignorado** -- esta transação foi excluída por outro motivo (por exemplo, um reembolso ou uma cobrança com falha).

Uma seção de resumo no topo mostra o número total de transações em cada categoria e os valores em dinheiro envolvidos.

:::info
A etapa de visualização não cria nenhum registro. É uma verificação somente de leitura para que você confira o que vai acontecer antes de confirmar.
:::

## Concluindo a importação

1. Revise os resultados da visualização e os totais do resumo.
2. Clique em **Importar ausentes** para importar todas as transações marcadas como **Novo**.
3. Depois que a importação for concluída, os selos de situação ao lado de cada transação são atualizados para mostrar o resultado.

## Dicas para usar a Importação do Stripe

- Execute a importação regularmente (semanalmente ou mensalmente) para manter seus registros atualizados.
- Se uma transação aparecer como **Já importado**, significa que o B1 Admin já tem um registro correspondente -- nenhuma ação é necessária.
- Use o filtro de intervalo de datas para focar em um período específico se estiver procurando transações particulares.

:::tip
Depois de importar, visite a página de [Lotes](batches.md) para verificar se as doações importadas aparecem corretamente e se os totais conferem com o que você vê no seu painel do Stripe.
:::

## Próximos passos

- Confira os [Relatórios de doações](donation-reports.md) para revisar as transações importadas junto com seus outros dados de doações
- Certifique-se de que as doações importadas estão atribuídas aos [fundos](funds.md) corretos para [extratos de doações](giving-statements.md) precisos
