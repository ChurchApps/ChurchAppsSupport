---
title: "Registrando Doações"
---

# Registrando Doações

<div class="article-intro">

Registrar doações no B1 Admin é feito pelo sistema de Lotes. Você cria um lote para representar uma coleta (como a oferta de domingo) e depois adiciona as doações individuais a esse lote. Isso mantém seus registros de contribuições organizados e fáceis de conciliar.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Configure seus [fundos](funds.md) para poder atribuir as doações às categorias corretas
- Crie um [lote](batches.md) para armazenar as doações que você está prestes a inserir
- Certifique-se de que os doadores estão no seu [diretório de pessoas](../people/adding-people.md) para poder localizá-los ao inserir as contribuições
- Você precisa da permissão **Editar Doações**, ou de **Inserir Doações** junto com **Ver Doações**, para inserir contribuições em um lote (veja [Quem Pode Alterar um Lote](batches.md#who-can-change-a-batch))

</div>

## Criando um lote e adicionando doações

1. No **B1 Admin**, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Doações** e clique em **Lotes**.
2. Clique em **Adicionar Lote** no topo da página.
3. Digite um nome para o lote (por exemplo, "Oferta de Domingo - 5 de jan.") e selecione a data. Clique em **Salvar**.
4. Seu novo lote aparece na lista, mostrando zero doações e R$ 0,00.
5. Clique no **nome do lote** para abri-lo.

## Inserindo doações individuais

1. Na página de detalhes do lote, o painel de entrada de doações aparece ao lado da lista de doações. Em **Selecionar Pessoa ou Anônimo**, digite o nome do doador no campo de busca para encontrá-lo, ou clique em **Anônimo**. (Clicar em **Adicionar Doação** no topo da página leva você até este painel.)
2. Depois de selecionar uma pessoa, o formulário de entrada mostra os campos **Data**, **Método** (Cheque, Dinheiro, Cartão ou Em Espécie), **Fundo**, **Observações**, **Valor** e **Nº do Cheque** (ou **Últimos 4 dígitos** para doações com cartão, ou **Item** para descrever uma doação em espécie). Clique em **Alterar** ao lado do nome do doador para escolher outra pessoa.
3. Preencha os dados e clique em **Adicionar Doação** (ou pressione Enter).
4. A doação é adicionada à lista de doações, e o formulário é limpo para que você possa inserir a próxima.

:::info
Se o lote tiver sido [fechado](batches.md#closing-and-reopening-a-batch), o painel de entrada e os links **Editar** ficam ocultos para quem não tem a permissão **Editar Doações**, e um aviso no topo do lote informa que ele está fechado. Peça a alguém com a permissão **Editar Doações** para reabri-lo.
:::

:::tip
Você pode inserir várias doações em sequência sem sair da página do lote. O formulário é limpo após cada registro, para que você possa passar por uma pilha de cheques ou envelopes com eficiência.
:::

## Importando doações de um arquivo CSV {#importing-donations-from-a-csv-file}

Se suas doações já estiverem em uma planilha, por exemplo, uma exportação de outro sistema de contribuições ou a planilha de contagem de uma equipe, você pode importá-las para um lote em vez de digitar cada uma.

1. Abra o lote e clique em **Importar CSV** no topo da página. (O botão aparece quando você pode alterar o lote e sua igreja tem pelo menos um [fundo](funds.md).)
2. Clique em **Escolher Arquivo CSV** e selecione seu arquivo. O arquivo precisa de uma linha de cabeçalho, e as colunas podem estar em qualquer ordem:
   - **Valor** (obrigatório; `Total` também funciona) -- Símbolos de moeda e vírgulas são ignorados, então `R$ 1.250,00` está correto. O valor deve ser maior que zero.
   - **Data** -- Use um formato como `2026-10-25` ou `25/10/2026`. Se estiver em branco, a data do lote é usada.
   - **Fundo** -- O nome do fundo, sem diferenciar maiúsculas de minúsculas. Se estiver em branco, o primeiro fundo da sua lista é usado.
   - **Método** -- **Cheque**, **Dinheiro**, **Cartão** ou **Em Espécie**. Se estiver em branco, **Cheque** é usado.
   - **Número do Cheque** -- O número do cheque (ou outro detalhe do pagamento).
   - **Observações**
   - **E-mail**, **Nome**, ou **Primeiro Nome** e **Sobrenome** -- Usados para encontrar o doador em seu banco de dados. Um nome escrito como "Silva, João" é lido como "João Silva".
3. Revise a prévia. Cada linha mostra seu número, o doador do arquivo, a **Correspondência**, o fundo e o valor:
   - O nome de uma pessoa significa que o doador foi encontrado. O B1 faz a correspondência primeiro por e-mail, depois por nome exato, e somente quando exatamente uma pessoa se encaixa.
   - **Não encontrado — anônimo** significa que nenhuma correspondência única foi encontrada. A contribuição é importada como anônima, e "Importado como:" com o nome do doador é adicionado às suas observações para que você possa atribuí-la depois.
   - Uma mensagem em vermelho, como **Valor inválido**, **Fundo desconhecido**, **Método desconhecido** ou **Data inválida**, significa que essa linha será ignorada. Corrija o arquivo e selecione-o novamente para incluí-la.
4. Clique em **Importar** (o botão mostra quantas linhas serão importadas). As doações são adicionadas ao lote.

:::tip
Após a importação, use **Editar** em qualquer doação anônima para escolher a pessoa certa. A observação "Importado como:" indica de quem o arquivo dizia que a doação era.
:::

## Registrando uma contribuição a partir do cadastro de uma pessoa

Para registrar uma única contribuição sem abrir um lote, abra o cadastro do doador em **Pessoas** e clique em **Registrar uma contribuição** (no resumo de contribuições ou na visualização de contribuições da pessoa).

1. Defina a **Data** e o **Valor**.
2. Escolha o **Fundo** e o **Método** (Cheque, Dinheiro, Cartão ou Em Espécie), e informe o **Nº do Cheque**, **Últimos 4 dígitos** ou **Item** (para doações em espécie), se necessário.
3. Opcionalmente, adicione **Observações** e clique em **Salvar**.

A contribuição é salva no lote da data informada. Se ainda não existir um lote para essa data, um é criado automaticamente, com a data como nome.

## Dividindo uma doação entre vários fundos

Às vezes, um único doador contribui para mais de um fundo em uma mesma transação. Para tratar isso:

1. Abaixo do painel de entrada, clique no link **editor completo de doação** (ou clique em **Editar** na linha de uma doação existente).
2. No editor completo, adicione valores a diferentes fundos. O total será calculado automaticamente a partir dos valores de cada fundo.
3. Clique em **Salvar** para atualizar a doação.

:::info
Dividir doações entre fundos é comum quando o doador emite um único cheque destinado a vários propósitos, como Fundo Geral e Missões.
:::

## Editando ou removendo doações

Para editar uma doação, clique no botão **Editar** na linha dela no lote. Você pode alterar a data, o valor, o fundo, o método de pagamento (Cheque, Dinheiro, Cartão ou Em Espécie) ou qualquer outro detalhe. Para uma doação em espécie, o editor rotula o campo de detalhe como **Item**, para que você possa descrever o que foi dado. Clique em **Salvar** quando terminar.

:::tip
A linha abaixo do nome do lote, no topo da página, é atualizada automaticamente para mostrar a data do lote, o número de contribuições e o valor total em dinheiro conforme você adiciona ou edita registros. Use-a para conferir com o comprovante de depósito.
:::

## Estornando uma doação

Se um doador foi cobrado por engano ou pede a devolução do dinheiro, você pode estornar uma doação concluída diretamente da tela de edição, sem precisar acessar o painel do seu gateway de pagamento.

1. Abra a doação e clique em **Editar**.
2. Clique no botão **Estornar**, ao lado de Excluir, na parte inferior do formulário.
3. Confirme a caixa de diálogo: "Estornar esta doação integralmente pelo gateway de pagamento? Esta ação não pode ser desfeita."

A doação é estornada integralmente pelo gateway de pagamento original e marcada como **Estornada** nas suas listas de doações.

:::warning
Os estornos são sempre integrais — não há como estornar um valor parcial pelo B1 Admin. Além disso, o estorno não pode ser desfeito após a confirmação.
:::

:::info
O botão **Estornar** só aparece para doações pagas online (que possuem uma transação no gateway) e que ainda estejam com status **Concluída**. Doações inseridas manualmente (dinheiro, cheque) não têm uma transação no gateway para estornar — edite ou exclua essas doações.
:::

## Próximos passos

- Revise seus registros usando os [Relatórios de Doações](donation-reports.md) para verificar a precisão
- No fim do ano, gere os [Comprovantes de Contribuição](giving-statements.md) para seus doadores
