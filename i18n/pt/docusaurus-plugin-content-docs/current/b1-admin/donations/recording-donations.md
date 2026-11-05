---
title: "Registrando Doações"
---

# Registrando doações

<div class="article-intro">

Registrar doações no B1 Admin é feito pelo sistema de Lotes. Você cria um lote para representar uma coleta (como a oferta de domingo) e depois adiciona as doações individuais a esse lote. Isso mantém seus registros de ofertas organizados e fáceis de conferir.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Configure seus [fundos](funds.md) para poder atribuir as doações às categorias corretas
- Crie um [lote](batches.md) para armazenar as doações que você vai lançar
- Certifique-se de que os doadores estejam no seu [diretório de pessoas](../people/adding-people.md) para que você possa procurá-los ao lançar as ofertas
- Você precisa de **Editar doações**, ou de **Lançar doações** junto com **Ver doações**, para lançar ofertas em um lote (veja [Quem pode alterar um lote](batches.md#who-can-change-a-batch))

</div>

## Criando um lote e adicionando doações

1. No **B1 Admin**, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Doações** e clique em **Lotes**.
2. Clique em **Adicionar lote** no topo da página.
3. Digite um nome para o lote (por exemplo, "Oferta de domingo - 5 jan.") e selecione a data. Clique em **Salvar**.
4. Seu novo lote aparece na lista, mostrando zero doações e $0.00.
5. Clique no **nome do lote** para abri-lo.

## Lançando doações individuais

1. Na página de detalhes do lote, o painel de lançamento aparece ao lado da lista de doações. Em **Selecionar pessoa ou Anônimo**, digite o nome do doador no campo de busca para encontrá-lo, ou clique em **Anônimo**. (Clicar em **Adicionar doação** no topo da página leva direto a este painel.)
2. Depois de selecionar uma pessoa, o formulário de lançamento mostra os campos **Data**, **Método** (Cheque, Dinheiro, Cartão ou Em bens), **Fundo**, **Anotações**, **Valor** e **Nº do cheque** (ou **Últimos 4 dígitos** para doações com cartão, ou **Item** para descrever uma doação em bens). Clique em **Alterar** ao lado do nome do doador para escolher outra pessoa.
3. Preencha os dados e clique em **Adicionar doação** (ou pressione Enter).
4. A doação é adicionada à lista de doações, e o formulário é limpo para você lançar a próxima.

:::info
Se o lote tiver sido [fechado](batches.md#closing-and-reopening-a-batch), o painel de lançamento e os links **Editar** ficam ocultos para quem não tem **Editar doações**, e um aviso no topo do lote informa que ele está fechado. Peça a alguém com **Editar doações** para reabri-lo.
:::

:::tip
Você pode lançar várias doações seguidas sem sair da página do lote. O formulário é limpo após cada lançamento, para que você avance por uma pilha de cheques ou envelopes com eficiência.
:::

## Importando doações de um arquivo CSV {#importing-donations-from-a-csv-file}

Se as suas doações já estiverem em uma planilha -- por exemplo, uma exportação de outro sistema de ofertas ou a planilha de contagem de uma equipe --, você pode importá-las para um lote em vez de digitar cada uma.

1. Abra o lote e clique em **Importar CSV** no topo da página. (O botão aparece quando você pode alterar o lote e a sua igreja tem pelo menos um [fundo](funds.md).)
2. Clique em **Escolher arquivo CSV** e selecione o seu arquivo. O arquivo precisa de uma linha de cabeçalho, e as colunas podem estar em qualquer ordem:
   - **Valor** (obrigatório; `Total` também funciona) -- Símbolos de moeda e vírgulas são ignorados, então `$1,250.00` está correto. O valor precisa ser maior que zero.
   - **Data** -- Use um formato como `2026-10-25` ou `10/25/2026`. Se estiver em branco, usa-se a data do lote.
   - **Fundo** -- O nome do fundo, sem diferenciar maiúsculas de minúsculas. Se estiver em branco, usa-se o seu primeiro fundo.
   - **Método** -- **Cheque**, **Dinheiro**, **Cartão** ou **Em bens**. Se estiver em branco, usa-se **Cheque**.
   - **Número do cheque** -- O número do cheque (ou outro detalhe do pagamento).
   - **Anotações**
   - **E-mail**, **Nome**, ou **Primeiro nome** e **Sobrenome** -- Usados para associar o doador a alguém no seu banco de dados. Um nome escrito como "Smith, John" é lido como "John Smith".
3. Revise a prévia. Cada linha mostra o número da linha, o doador indicado no arquivo, a **Correspondência**, o fundo e o valor:
   - O nome de uma pessoa significa que o doador foi encontrado. O B1 faz a correspondência primeiro por e-mail, depois por nome exato, e somente quando exatamente uma pessoa se encaixa.
   - **Não encontrado — anônimo** significa que nenhuma correspondência única foi encontrada. A doação é importada como anônima, e "Importado como:" com o nome do doador é acrescentado às anotações para que você possa atribuí-la depois.
   - Uma mensagem em vermelho, como **Valor inválido**, **Fundo desconhecido**, **Método desconhecido** ou **Data inválida**, significa que aquela linha será ignorada. Corrija o arquivo e selecione-o novamente para incluí-la.
4. Clique em **Importar** (o botão mostra quantas linhas serão importadas). As doações são adicionadas ao lote.

:::tip
Depois de importar, use **Editar** em qualquer doação anônima para escolher a pessoa certa. A anotação "Importado como:" informa de quem o arquivo dizia que era a doação.
:::

## Lançando uma doação a partir do registro de uma pessoa

Para registrar uma única doação sem abrir um lote, abra o registro do doador em **Pessoas** e clique em **Lançar doação** (no resumo de doações ou na visão de doações da pessoa).

1. Defina a **Data** e o **Valor**.
2. Escolha o **Fundo** e o **Método** (Cheque, Dinheiro, Cartão ou Em bens), e informe o **Nº do cheque**, os **Últimos 4 dígitos** ou o **Item** (para doações em bens), se necessário.
3. Opcionalmente, adicione **Anotações**, depois clique em **Salvar**.

A doação é salva no lote daquela data. Se ainda não existir um lote para a data, um é criado automaticamente, com o nome da data.

## Dividindo uma doação entre vários fundos

Às vezes um único doador contribui para mais de um fundo em uma mesma transação. Para tratar isso:

1. Abaixo do painel de lançamento, clique no link **editor completo de doação** (ou clique em **Editar** na linha de uma doação existente).
2. No editor completo, adicione valores a diferentes fundos. O total será calculado automaticamente a partir dos valores de cada fundo.
3. Clique em **Salvar** para atualizar a doação.

:::info
Dividir doações entre fundos é comum quando um doador emite um único cheque destinado a vários fins, como Fundo Geral e Missões.
:::

## Editando ou removendo doações

Para editar uma doação, clique no botão **Editar** na linha dela no lote. Você pode alterar a data, o valor, o fundo, o método de pagamento (Cheque, Dinheiro, Cartão ou Em bens) ou qualquer outro detalhe. Para uma doação em bens, o editor rotula o campo de detalhe como **Item**, para que você descreva o que foi doado. Clique em **Salvar** quando terminar.

:::tip
A linha abaixo do nome do lote, no topo da página, é atualizada automaticamente e mostra a data do lote, o número de doações e o valor total conforme você adiciona ou edita lançamentos. Use-a para conferir com o seu comprovante de depósito.
:::

## Reembolsando uma doação

Se um doador foi cobrado por engano ou pede o dinheiro de volta, você pode reembolsar uma doação concluída diretamente da tela de edição -- sem precisar ir ao painel do seu gateway de pagamento.

1. Abra a doação e clique em **Editar**.
2. Clique no botão **Reembolsar**, ao lado de Excluir, na parte inferior do formulário.
3. Confirme a caixa de diálogo: "Reembolsar esta doação integralmente pelo gateway de pagamento? Isso não pode ser desfeito."

A doação é reembolsada integralmente pelo gateway de pagamento original e marcada como **Reembolsada** nas suas listas de doações.

:::warning
Os reembolsos são sempre integrais -- não há como reembolsar um valor parcial pelo B1 Admin. Além disso, o reembolso não pode ser desfeito depois de confirmado.
:::

:::info
O botão **Reembolsar** só aparece para doações pagas online (que têm uma transação no gateway) e que ainda estão com situação **Concluída**. Doações lançadas manualmente (dinheiro, cheque) não têm transação no gateway para reembolsar -- edite ou exclua essas doações.
:::

## Imprimindo um recibo de uma doação

Quando alguém entrega um cheque, paga por um evento ou camiseta, ou uma organização visitante traz uma doação, você pode imprimir um recibo apenas para essa doação, em vez de para um lote inteiro ou um extrato de fim de ano.

1. Abra o lote que contém a doação.
2. Clique em **Recibo** ao lado de **Editar** na linha da doação. Você também pode clicar em **Recibo** na parte inferior do formulário Editar doação.
3. Clique em **Imprimir**, ou em **Fechar** para voltar.

O recibo usa o mesmo layout do extrato de doações: sua igreja e o doador (ou "Anônimo"), a data e o método da doação, cada fundo e valor, a anotação, sua Nota de Doação e o bloco oficial de recibo, caso você tenha definido um **Formato do extrato** (veja [Extratos de doações](giving-statements.md)). O número do recibo nesse bloco é o ID da doação.

:::info
A frase "sem bens ou serviços" só é impressa quando todos os fundos da doação estão marcados como dedutíveis de impostos. Se qualquer parte da doação tiver ido para um fundo que não é dedutível, como uma taxa de evento ou uma compra, o recibo omite essa frase para que seja lido como um pagamento, e não como uma doação de caridade.
:::

:::tip
Doações online já recebem um e-mail automático de agradecimento, então o recibo é útil principalmente para doações que você lança manualmente.
:::

## Próximos passos

- Revise seus lançamentos usando [Relatórios de doações](donation-reports.md) para verificar a exatidão
- No fim do ano, gere [Extratos de doações](giving-statements.md) para seus doadores
