---
title: "Registrando Doações"
---

# Registrando Doações

<div class="article-intro">

Registrar doações no B1 Admin é feito pelo sistema de Lotes. Você cria um lote para representar uma coleta (como a oferta de domingo) e depois adiciona as doações individuais a esse lote. Isso mantém seus registros de ofertas organizados e fáceis de conciliar.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure seus [fundos](funds.md) para poder atribuir as doações às categorias corretas
- Crie um [lote](batches.md) para armazenar as doações que você está prestes a inserir
- Certifique-se de que os doadores estão no seu [diretório de pessoas](../people/adding-people.md) para poder localizá-los ao inserir as ofertas
- Você precisa de **Editar Doações**, ou de **Inserir Doações** junto com **Ver Doações**, para inserir ofertas em um lote (veja [Quem Pode Alterar um Lote](batches.md#who-can-change-a-batch))

</div>

## Criando um Lote e Adicionando Doações

1. No **B1 Admin**, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Doações** e clique em **Lotes**.
2. Clique em **Adicionar Lote** no topo da página.
3. Informe um nome para o lote (por exemplo, "Oferta de Domingo - 5 de Jan") e selecione a data. Clique em **Salvar**.
4. Seu novo lote aparece na lista, mostrando zero doações e R$ 0,00.
5. Clique no **nome do lote** para abri-lo.

## Inserindo Doações Individuais

1. Na página de detalhes do lote, o painel de inserção de doações aparece ao lado da lista de doações. Em **Selecionar Pessoa ou Anônimo**, digite o nome do doador no campo de busca para encontrá-lo, ou clique em **Anônimo**. (Clicar em **Adicionar Doação** no topo da página leva você até este painel.)
2. Depois de selecionar uma pessoa, o formulário de inserção mostra os campos **Data**, **Método** (Cheque, Dinheiro, Cartão ou Em Espécie), **Fundo**, **Anotações**, **Valor** e **Nº do Cheque** (ou **Últimos 4 dígitos** para doações em cartão, ou **Item** para descrever uma doação em espécie). Clique em **Alterar** ao lado do nome do doador para escolher outra pessoa.
3. Preencha os detalhes e clique em **Adicionar Doação** (ou pressione Enter).
4. A doação é adicionada à lista de doações, e o formulário é limpo para que você possa inserir a próxima.

:::info
Se o lote tiver sido [fechado](batches.md#closing-and-reopening-a-batch), o painel de inserção e os links **Editar** ficam ocultos para quem não tem **Editar Doações**, e um aviso no topo do lote informa que ele está fechado. Peça a alguém com **Editar Doações** para reabri-lo.
:::

:::tip
Você pode inserir várias doações em sequência rapidamente, sem sair da página do lote. O formulário é limpo após cada inserção, para que você avance com eficiência por uma pilha de cheques ou envelopes.
:::

## Registrando uma Oferta a Partir do Registro de uma Pessoa

Para registrar uma única oferta sem abrir um lote, abra o registro do doador em **Pessoas** e clique em **Registrar uma oferta** (no resumo de contribuições ou na visualização de doações da pessoa).

1. Defina a **Data** e o **Valor**.
2. Escolha o **Fundo** e o **Método** (Cheque, Dinheiro, Cartão ou Em Espécie) e informe o **Nº do Cheque**, os **Últimos 4 dígitos** ou o **Item** (para ofertas em espécie), se necessário.
3. Opcionalmente, adicione **Anotações** e clique em **Salvar**.

A oferta é salva no lote daquela data. Se ainda não existir um lote para essa data, um será criado automaticamente, com a data como nome.

## Dividindo uma Doação Entre Vários Fundos

Às vezes, um único doador contribui para mais de um fundo em uma mesma transação. Para tratar esse caso:

1. Abaixo do painel de inserção, clique no link **editor completo de doação** (ou clique em **Editar** na linha de uma doação existente).
2. No editor completo, adicione valores a diferentes fundos. O total será calculado automaticamente a partir dos valores de cada fundo.
3. Clique em **Salvar** para atualizar a doação.

:::info
Dividir doações entre fundos é comum quando um doador emite um único cheque destinado a vários fins, como Fundo Geral e Missões.
:::

## Editando ou Removendo Doações

Para editar uma doação, clique no botão **Editar** na linha dela no lote. Você pode alterar a data, o valor, o fundo, a forma de pagamento (Cheque, Dinheiro, Cartão ou Em Espécie) ou qualquer outro detalhe. Para uma doação em espécie, o editor rotula o campo de detalhe como **Item**, para que você descreva o que foi doado. Clique em **Salvar** quando terminar.

:::tip
A linha abaixo do nome do lote no topo da página é atualizada automaticamente para mostrar a data do lote, o número de ofertas e o valor total em dinheiro conforme você adiciona ou edita lançamentos. Use-a para conferir com o seu comprovante de depósito.
:::

## Estornando uma Doação

Se um doador foi cobrado por engano ou pede o dinheiro de volta, você pode estornar uma doação concluída diretamente na tela de edição -- sem precisar acessar o painel do seu gateway de pagamento.

1. Abra a doação e clique em **Editar**.
2. Clique no botão **Estornar**, ao lado de Excluir, na parte inferior do formulário.
3. Confirme a caixa de diálogo: "Estornar esta doação integralmente pelo gateway de pagamento? Esta ação não pode ser desfeita."

A doação é estornada integralmente pelo gateway de pagamento original e marcada como **Estornada** nas suas listas de doações.

:::warning
Os estornos são sempre integrais -- não há como estornar um valor parcial pelo B1 Admin. Além disso, o estorno não pode ser desfeito depois de confirmado.
:::

:::info
O botão **Estornar** só aparece para doações pagas online (que possuem uma transação no gateway) e que ainda estão com status **Concluída**. Doações lançadas manualmente (dinheiro, cheque) não têm uma transação no gateway para estornar -- edite ou exclua essas doações.
:::

## Próximos Passos

- Revise seus lançamentos usando os [Relatórios de Doações](donation-reports.md) para verificar a precisão
- No fim do ano, gere os [Comprovantes de Contribuição](giving-statements.md) para seus doadores
