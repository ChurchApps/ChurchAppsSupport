---
title: "Registrando Doações"
---

# Registrando Doações

<div class="article-intro">

Registrar doações no B1 Admin é feito através do sistema de Lotes. Você cria um lote para representar uma coleta (como uma oferta de domingo), depois adiciona doações individuais a esse lote. Isso mantém seus registros de doações organizados e fáceis de reconciliar.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure seus [fundos](funds.md) para poder atribuir doações às categorias corretas
- Crie um [lote](batches.md) para conter as doações que está prestes a inserir
- Certifique-se de que os doadores estão em seu [diretório de pessoas](../people/adding-people.md) para que você possa procurá-los ao inserir ofertas

</div>

## Criando um Lote e Adicionando Doações

1. Em **B1 Admin**, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Doações** e clique em **Lotes**.
2. Clique em **Adicionar Lote**.
3. Digite um nome para o lote (por exemplo, "Oferta de Domingo - 5 Jan") e selecione a data. Clique em **Salvar**.
4. Seu novo lote aparece na lista mostrando zero doações e $0,00.
5. Clique no **nome do lote** para abri-lo.

## Inserindo Doações Individuais

1. Na página de detalhes do lote, digite o nome do doador no **campo de pesquisa** para encontrá-lo.
2. Após selecionar uma pessoa, o formulário de entrada de doação aparece com campos para **Data**, **Método de Pagamento**, **Fundo**, **Valor** e **Número do Cheque**.
3. Preencha os detalhes e clique em **Adicionar Doação**.
4. A doação é adicionada à tabela abaixo e o formulário é redefinido para que você possa inserir a próxima.

:::tip
Você pode inserir rapidamente várias doações em sequência sem deixar a página do lote. O formulário é redefinido após cada entrada para que você possa passar por uma pilha de cheques ou envelopes com eficiência.
:::

## Dividindo uma Doação em Vários Fundos

Às vezes um único doador dá para mais de um fundo em uma transação. Para lidar com isso:

1. Clique no botão **Editar** na linha de doação.
2. No formulário de edição, adicione valores para diferentes fundos. O total será calculado automaticamente a partir dos valores de fundos individuais.
3. Clique em **Salvar** para atualizar a doação.

:::info
Dividir doações em fundos é comum quando um doador escreve um único cheque designado para vários fins, como Fundo Geral e Missões.
:::

## Editando ou Removendo Doações

Para editar uma doação, clique no botão **Editar** na sua linha no lote. Você pode alterar a data, valor, fundo, método de pagamento ou qualquer outro detalhe. Clique em **Salvar** quando terminar.

:::tip
O cabeçalho da página do lote é atualizado automaticamente para mostrar o número total de doações e o valor total em dólar conforme você adiciona ou edita entradas. Use isso para reconciliar com seu comprovante de depósito.
:::

## Reembolsando uma Doação

Se um doador foi cobrado por engano ou solicita devolver o dinheiro, você pode reembolsar uma doação concluída diretamente de sua tela de edição -- sem necessidade de ir ao dashboard do seu gateway de pagamento.

1. Abra a doação e clique em **Editar**.
2. Clique no botão **Reembolso** ao lado de Excluir na parte inferior do formulário.
3. Confirme o diálogo: "Reembolsar esta doação integralmente através do gateway de pagamento? Isso não pode ser desfeito."

A doação é reembolsada integralmente através do gateway de pagamento original e marcada como **Reembolsada** em suas listas de doações.

:::warning
Reembolsos são apenas reembolsos totais -- não há forma de reembolsar um valor parcial a partir do B1 Admin. O reembolso também não pode ser desfeito uma vez confirmado.
:::

:::info
O botão **Reembolso** aparece apenas para doações que foram pagas online (elas têm uma transação do gateway) e ainda estão em status **Completo**. Doações inseridas manualmente (dinheiro, cheque) não têm uma transação do gateway para reembolsar -- edite ou exclua essas em vez disso.
:::

## Próximos Passos

- Revise suas entradas usando [Relatórios de Doações](donation-reports.md) para verificar a precisão
- No final do ano, gere [Declarações de Doações](giving-statements.md) para seus doadores
