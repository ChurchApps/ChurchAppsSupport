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
2. Clique em **Adicionar Lote** no topo da página.
3. Digite um nome para o lote (por exemplo, "Oferta de Domingo - 5 Jan") e selecione a data. Clique em **Salvar**.
4. Seu novo lote aparece na lista mostrando zero doações e $0,00.
5. Clique no **nome do lote** para abri-lo.

## Inserindo Doações Individuais

1. Na página de detalhes do lote, o painel de entrada de doações aparece ao lado da lista de doações. Em **Selecionar Pessoa ou Anônimo**, digite o nome do doador no campo de pesquisa para encontrá-lo, ou clique em **Anônimo**. (Clicar em **Adicionar Doação** no topo da página leva a este painel.)
2. Após selecionar uma pessoa, o formulário de entrada mostra campos para **Data**, **Método** (Cheque, Dinheiro, Cartão ou Em Espécie), **Fundo**, **Notas**, **Valor** e **Nº do Cheque** (ou **Últimos 4 dígitos** para ofertas em cartão). Clique em **Alterar** ao lado do nome do doador para escolher outra pessoa.
3. Preencha os detalhes e clique em **Adicionar Doação** (ou pressione Enter).
4. A doação é adicionada à lista de doações e o formulário é redefinido para que você possa inserir a próxima.

:::tip
Você pode inserir rapidamente várias doações em sequência sem deixar a página do lote. O formulário é redefinido após cada entrada para que você possa passar por uma pilha de cheques ou envelopes com eficiência.
:::

## Registrando uma Oferta a partir do Registro de uma Pessoa {#logging-a-gift-from-a-persons-record}

Para registrar uma única oferta sem abrir um lote, abra o registro do doador em **Pessoas** e clique em **Registrar oferta** (no resumo de ofertas, ou na visualização de ofertas da pessoa).

1. Defina a **Data** e o **Valor**.
2. Escolha o **Fundo** e o **Método** (Cheque, Dinheiro, Cartão ou Em Espécie) e digite o **Nº do Cheque** ou os **Últimos 4 dígitos**, se necessário.
3. Opcionalmente adicione **Notas**, depois clique em **Salvar**.

A oferta é salva no lote da data. Se ainda não existir um lote para essa data, um é criado automaticamente, com o nome da data.

## Dividindo uma Doação em Vários Fundos

Às vezes um único doador dá para mais de um fundo em uma transação. Para lidar com isso:

1. Abaixo do painel de entrada, clique no link **editor completo de doação** (ou clique em **Editar** na linha de uma doação existente).
2. No editor completo, adicione valores para diferentes fundos. O total será calculado automaticamente a partir dos valores de fundos individuais.
3. Clique em **Salvar** para atualizar a doação.

:::info
Dividir doações em fundos é comum quando um doador escreve um único cheque designado para vários fins, como Fundo Geral e Missões.
:::

## Editando ou Removendo Doações

Para editar uma doação, clique no botão **Editar** na sua linha no lote. Você pode alterar a data, valor, fundo, método de pagamento ou qualquer outro detalhe. Clique em **Salvar** quando terminar.

:::tip
A linha abaixo do nome do lote no topo da página é atualizada automaticamente para mostrar a data do lote, o número de ofertas e o valor total em dólar conforme você adiciona ou edita entradas. Use isso para reconciliar com seu comprovante de depósito.
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
