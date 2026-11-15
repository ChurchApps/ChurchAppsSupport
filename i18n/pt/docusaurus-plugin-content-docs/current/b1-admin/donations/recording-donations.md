---
title: "Registrando Doações"
description: "Registre as doações da igreja no B1 Admin criando um lote, lançando as contribuições uma a uma, importando um CSV ou registrando uma contribuição a partir do perfil do doador."
---

# Registrando Doações

<div class="article-intro">

Registrar doações no B1 Admin é feito pelo sistema de Lotes. Você cria um lote para representar uma coleta (como a oferta de um domingo) e, em seguida, adiciona as doações individuais a esse lote. Isso mantém os seus registros de doações organizados e fáceis de conciliar.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure os seus [fundos](funds.md) para que você possa atribuir as doações às categorias corretas
- Crie um [lote](batches.md) para armazenar as doações que você vai lançar
- Certifique-se de que os doadores estão no seu [cadastro de pessoas](../people/adding-people.md), para que você possa encontrá-los ao lançar as contribuições
- Você precisa da permissão **Editar Doações**, ou de **Lançar Doações** junto com **Visualizar Doações**, para lançar contribuições em um lote (veja [Quem Pode Alterar um Lote](batches.md#who-can-change-a-batch))

</div>

## Criando um Lote e Adicionando Doações {#creating-a-batch-and-adding-donations}

1. No **B1 Admin**, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo), expanda **Doações** e clique em **Lotes**.
2. Clique em **Adicionar Lote** no topo da página.
3. Informe um nome para o lote (por exemplo, "Oferta de Domingo - 5 jan") e selecione a data. Clique em **Salvar**.
4. O seu novo lote aparece na lista, mostrando zero doações e $0.00.
5. Clique no **nome do lote** para abri-lo.

## Lançando Doações Individuais {#entering-individual-donations}

1. Na página de detalhes do lote, o painel de lançamento de doações aparece ao lado da lista de doações. Em **Selecione a pessoa ou anônimo**, digite o nome do doador no campo de busca para encontrá-lo, ou clique em **Anônimo**. (Clicar em **Adicionar Doação** no topo da página leva a este painel.)
2. Depois de selecionar uma pessoa, o formulário de lançamento mostra os campos **Data** (começando na data do lote), **Forma** (Cheque, Dinheiro, Cartão ou Em bens), **Fundo** (exibido quando a sua igreja tem mais de um fundo), **Observações**, **Valor** e **Nº do cheque** (ou **Últimos 4 dígitos** para doações com cartão, ou **Item** para descrever uma doação em bens; as doações em dinheiro não têm campo de detalhe). Clique em **Alterar**, ao lado do nome do doador, para escolher outra pessoa.
3. Preencha os dados e clique em **Adicionar Doação** (ou pressione Enter). Se o valor estiver vazio ou for zero, o formulário pedirá um valor maior que zero em vez de salvar.
4. A doação é incluída na lista de doações, e o formulário é limpo para que você lance a próxima. A data, a forma, o fundo e as observações permanecem como você definiu, de modo que uma pilha de cheques semelhantes exige apenas o doador, o valor e o número do cheque.

:::info
Se o lote tiver sido [fechado](batches.md#closing-and-reopening-a-batch), o painel de lançamento e os links **Editar** ficam ocultos para quem não tem a permissão **Editar Doações**, e um aviso no topo do lote informa que ele está fechado. Peça a alguém com a permissão **Editar Doações** para reabri-lo.
:::

:::tip
Você pode lançar várias doações seguidas sem sair da página do lote. O formulário é limpo após cada lançamento, para que você avance com eficiência por uma pilha de cheques ou envelopes.
:::

## Importando Doações de um Arquivo CSV {#importing-donations-from-a-csv-file}

Se as suas doações já estiverem em uma planilha -- por exemplo, uma exportação de outro sistema de doações ou a planilha de contagem da equipe -- você pode importá-las para um lote, em vez de digitar uma a uma.

1. Abra o lote e clique em **Importar CSV** no topo da página. (O botão aparece quando você pode alterar o lote e a sua igreja tem pelo menos um [fundo](funds.md).)
2. Clique em **Escolher arquivo CSV** e selecione o seu arquivo. O arquivo precisa de uma linha de cabeçalho, e as colunas podem estar em qualquer ordem:
   - **Amount** (obrigatória; `Total` também funciona) -- Símbolos de moeda e vírgulas são ignorados, então `$1,250.00` é aceito. O valor precisa ser maior que zero.
   - **Date** -- Use um formato como `2026-10-25` ou `10/25/2026`. Se estiver em branco, é usada a data do lote.
   - **Fund** -- O nome do fundo, comparado sem diferenciar maiúsculas de minúsculas. Se estiver em branco, é usado o seu primeiro fundo.
   - **Method** -- **Check**, **Cash**, **Card** ou **In-Kind**. Se estiver em branco, é usado **Check**.
   - **Check Number** -- O número do cheque (ou outro detalhe do pagamento).
   - **Notes**
   - **Email**, **Name**, ou **First Name** e **Last Name** -- Usados para associar o doador a alguém do seu banco de dados. Um nome escrito como "Smith, John" é lido como "John Smith".
3. Revise a prévia. Cada linha mostra o seu número, o doador informado no arquivo, a **Associação**, o fundo e o valor:
   - O nome de uma pessoa significa que o doador foi associado. O B1 associa primeiro pelo e-mail e depois pelo nome exato, e somente quando exatamente uma pessoa corresponde.
   - **Não encontrado — anônimo** significa que não foi encontrada nenhuma correspondência única. A contribuição é importada como anônima, e "Importado como:" com o nome do doador é acrescentado às suas observações, para que você possa atribuí-la depois.
   - Uma mensagem em vermelho, como **Valor inválido**, **Fundo desconhecido**, **Forma desconhecida** ou **Data inválida**, significa que a linha será ignorada. Corrija o arquivo e selecione-o novamente para incluí-la.
4. Clique em **Importar** (o botão mostra quantas linhas serão importadas). As doações são adicionadas ao lote.

:::tip
Depois de importar, use **Editar** em qualquer doação anônima para escolher a pessoa correta. A observação "Importado como:" informa de quem o arquivo dizia que era a doação.
:::

## Lançando uma Contribuição a partir do Registro da Pessoa {#logging-a-gift-from-a-persons-record}

Para registrar uma única contribuição sem abrir um lote, abra o registro do doador em **Pessoas** e clique em **Registrar doação** (no resumo de doações ou na visão de doações da pessoa).

1. Defina a **Data** e o **Valor**.
2. Escolha o **Fundo** e a **Forma** (Cheque, Dinheiro, Cartão ou Em bens) e informe o **Nº do cheque**, os **Últimos 4 dígitos** ou o **Item** (para doações em bens), se necessário.
3. Opcionalmente, adicione **Observações** e clique em **Salvar**.

A contribuição é salva no lote dessa data. Se ainda não existir um lote para a data, um será criado automaticamente, com a data como nome.

## Dividindo uma Doação entre Vários Fundos {#splitting-a-donation-across-multiple-funds}

Às vezes, um mesmo doador contribui para mais de um fundo em uma única transação. Para lidar com isso:

1. Abaixo do painel de lançamento, clique no link do **editor completo de doações** (ou clique em **Editar** na linha de uma doação existente). Uma nova contribuição começa com a data do lote.
2. No editor completo, informe um valor e um fundo e clique em **Adicionar mais** para incluir outro fundo e outro valor. O total é calculado a partir dos valores de cada fundo.
3. Clique em **Salvar**. Uma contribuição sem valor em nenhum fundo não é salva; o editor pede um valor maior que zero.

:::info
Dividir doações entre fundos é comum quando um doador emite um único cheque destinado a várias finalidades, como Fundo Geral e Missões.
:::

## Editando ou Removendo Doações {#editing-or-removing-donations}

Para editar uma doação, clique no botão **Editar** na linha dela no lote. Você pode alterar a data, o valor, o fundo, a forma de pagamento (Cheque, Dinheiro, Cartão ou Em bens) ou qualquer outro detalhe. Para uma doação em bens, o editor rotula o campo de detalhe como **Item**, para que você descreva o que foi doado. Clique em **Salvar** quando terminar.

:::tip
A linha abaixo do nome do lote, no topo da página, é atualizada automaticamente para mostrar a data do lote, a quantidade de contribuições e o valor somado conforme você adiciona ou edita lançamentos. Use-a para conferir com o seu comprovante de depósito.
:::

## Estornando uma Doação {#refunding-a-donation}

Se um doador foi cobrado por engano ou pede o dinheiro de volta, você pode estornar uma doação concluída diretamente na tela de edição -- sem precisar acessar o painel do seu gateway de pagamento.

1. Abra a doação e clique em **Editar**.
2. Clique no botão **Estornar**, ao lado de Excluir, na parte inferior do formulário.
3. Confirme a caixa de diálogo: "Estornar esta doação integralmente pelo gateway de pagamento? Esta ação não pode ser desfeita."

A doação é estornada integralmente pelo gateway de pagamento original e marcada como **Estornada** nas suas listas de doações.

:::warning
Os estornos são sempre integrais -- não há como estornar um valor parcial pelo B1 Admin. Além disso, o estorno não pode ser desfeito depois de confirmado.
:::

:::info
O botão **Estornar** só aparece para doações pagas online (que têm uma transação no gateway) e que ainda estejam com a situação **Concluída**. As doações lançadas manualmente (dinheiro, cheque) não têm uma transação no gateway para estornar -- edite ou exclua essas doações.
:::

## Imprimindo um Recibo de Uma Contribuição {#printing-a-receipt-for-one-gift}

Quando alguém entrega um cheque, paga por um evento ou uma camiseta, ou quando uma organização visitante traz uma doação, você pode imprimir um recibo apenas para essa contribuição, em vez de um lote inteiro ou um recibo de fim de ano.

1. Abra o lote que contém a doação.
2. Clique em **Recibo**, ao lado de **Editar**, na linha da doação. Você também pode clicar em **Recibo** na parte inferior do formulário Editar Doação.
3. Clique em **Imprimir**, ou em **Fechar** para voltar.

O recibo usa o mesmo layout do recibo de doação: a sua igreja e o doador (ou "Anônimo"), a data e a forma da contribuição, cada fundo e valor, a observação, a sua Observação de Doação e o bloco oficial de recibo, caso você tenha definido um **Formato do recibo** (veja [Recibos de Doação](giving-statements.md)). O número do recibo nesse bloco é o ID da doação.

:::info
A frase "sem bens ou serviços" só é impressa quando todos os fundos da contribuição são marcados como dedutíveis de impostos. Se qualquer parte da contribuição tiver ido para um fundo não dedutível, como uma taxa de evento ou uma compra, o recibo omite essa frase para que seja lido como um pagamento, e não como uma contribuição beneficente.
:::

:::tip
As doações online já recebem automaticamente um e-mail de agradecimento, por isso o recibo é mais útil principalmente para as contribuições que você lança manualmente.
:::

## Próximos Passos {#next-steps}

- Revise os seus lançamentos usando os [Relatórios de Doações](donation-reports.md) para verificar a precisão
- No fim do ano, gere os [Recibos de Doação](giving-statements.md) para os seus doadores
