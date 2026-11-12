---
title: "Importação do Stripe"
description: "Importe doações do Stripe para o B1 Admin com uma importação que começa por uma prévia e marca cada cobrança como nova, já importada ou ignorada antes de você confirmar."
---

# Importação do Stripe

<div class="article-intro">

Se você aceita doações online pelo Stripe, a ferramenta de Importação do Stripe permite trazer essas transações para o B1 Admin, para que todos os seus dados de doações fiquem em um só lugar. Isso é especialmente útil para capturar transações que não foram sincronizadas automaticamente.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Conclua a [Configuração de Doações Online](online-giving-setup.md) para conectar a sua conta do Stripe ao B1 Admin. O item de menu **Importação do Stripe** e o botão da página de Lotes só aparecem quando o gateway de doações da sua igreja é o Stripe, e somente para quem pode editar doações
- Verifique se há doações no seu painel do Stripe para o período que você quer importar

</div>

## Como Funciona {#how-it-works}

O processo de importação usa um fluxo em duas etapas: primeiro você visualiza o que seria importado e, depois, confirma a importação. Essa abordagem de simulação permite revisar tudo antes que qualquer dado seja criado.

## Importando Transações {#importing-transactions}

1. No **B1 Admin**, acesse **Doações > Importação do Stripe**. (Você também pode clicar em **Importar transações do Stripe ausentes** no topo da página de **Lotes**.)
2. A página **Importar Transações do Stripe** é aberta.
3. Em **Selecionar período**, defina a **Data inicial** e a **Data final** das transações que você quer importar. O período começa em 1º de janeiro deste ano até hoje.
4. Clique em **Visualizar** para executar uma verificação de simulação. **Importar ausentes** permanece desabilitado até que uma visualização encontre transações novas, e alterar qualquer uma das datas limpa a visualização, para que você visualize primeiro o novo período.

## Revisando a Prévia {#reviewing-the-preview}

A prévia lista cada evento do Stripe com o seu **ID do evento**, o **Tipo**, o **Valor**, a **Data** e uma **Situação**:

- **Nova** -- esta transação ainda não foi importada e será incluída se você prosseguir.
- **Já importada** -- esta transação já existe no B1 Admin e será ignorada.
- **Ignorada** -- esta transação foi excluída por outro motivo (por exemplo, um estorno ou uma cobrança com falha).

Um resumo no topo mostra o número **Total** de eventos e quantos estão **Novos**, **Já importados** e **Ignorados**. Se algum evento não puder ser lido, aparece uma contagem de **Erros**, e a linha do evento exibe a mensagem na coluna **Observações**.

:::info
A etapa de prévia não cria nenhum registro. É uma verificação somente de leitura, para que você confira o que vai acontecer antes de confirmar.
:::

## Concluindo a Importação {#completing-the-import}

1. Revise os resultados da prévia e os totais do resumo.
2. Clique em **Importar ausentes** para importar todas as transações marcadas como **Nova**.
3. Depois que a importação for concluída, a lista passa a ser **Resultados da importação**: cada transação adicionada mostra **Importada**, e o resumo ganha uma contagem de **Importadas**.

## Dicas para Usar a Importação do Stripe {#tips-for-using-stripe-import}

- Execute a importação regularmente (semanal ou mensalmente) para manter os seus registros atualizados.
- Se uma transação aparecer como **Já importada**, significa que o B1 Admin já tem um registro correspondente -- não é necessária nenhuma ação.
- Use o filtro de período para se concentrar em um período específico, caso esteja procurando transações determinadas.

:::tip
Depois de importar, visite a página de [Lotes](batches.md) para verificar se as doações importadas aparecem corretamente e se os totais conferem com o que você vê no seu painel do Stripe.
:::

## Próximos Passos {#next-steps}

- Confira os [Relatórios de Doações](donation-reports.md) para revisar as transações importadas junto com os seus outros dados de doações
- Certifique-se de que as doações importadas estão atribuídas aos [fundos](funds.md) corretos, para que os [recibos de doação](giving-statements.md) sejam precisos
