---
title: "Lotes de Doações"
description: "Agrupe as ofertas em lotes de doações no B1 Admin e, em seguida, feche, imprima ou exporte cada lote para que os totais batam com os depósitos bancários."
---

# Lotes de Doações {#donation-batches}

<div class="article-intro">

Os lotes agrupam as suas doações para facilitar o acompanhamento e a conciliação. Um lote típico representa uma única coleta, como a oferta de um domingo ou de um evento especial. Usar lotes ajuda a manter tudo organizado e torna simples verificar se os seus registros conferem com os depósitos efetivamente feitos.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Certifique-se de ter [configurado os seus fundos](funds.md) para que estejam disponíveis ao registrar as doações
- Você precisará da permissão **Visualizar Resumos de Doações**, **Editar Doações** ou **Lançar Doações** para ver a página de Lotes (veja [Quem Pode Alterar um Lote](#who-can-change-a-batch))

</div>

## A Página de Lotes {#the-batches-page}

Ao acessar **Doações > Lotes**, você verá uma lista dos seus lotes. Cada linha exibe:

- **Nome** -- o rótulo que você deu ao lote
- **Data** -- a data da coleta
- **Doações** -- o número de doações individuais no lote
- **Total** -- o valor total em dinheiro
- **Situação** -- **Aberto** ou **Fechado** (veja [Fechando e Reabrindo um Lote](#closing-and-reopening-a-batch))

Acima da lista, botões de ano permitem mostrar apenas os lotes de um ano específico, ou **Todos** os lotes. Ao lado deles, os botões de situação -- **Todos**, **Aberto** e **Fechado** -- restringem a lista aos lotes que ainda estão em andamento ou aos que você já concluiu. Os dois filtros funcionam em conjunto; assim, você pode escolher **2026** e **Aberto** para ver os lotes abertos deste ano. Um resumo em uma linha mostra a quantidade de lotes, o número de contribuições e o valor total dos lotes exibidos.

## Criando um Novo Lote {#creating-a-new-batch}

1. Clique em **Adicionar Lote** no topo da página.
2. Informe um nome descritivo (por exemplo, "Oferta de Domingo - 9 fev"). O nome é opcional, mas um nome claro facilita encontrar o lote depois.
3. Selecione a data da coleta. Ela começa com a data de hoje.
4. Clique em **Salvar**.

O seu novo lote aparece na lista, pronto para você adicionar doações.

## Trabalhando com Lotes {#working-with-batches}

- **Ver doações** -- clique no nome de um lote para abri-lo e ver todas as doações individuais que ele contém. A partir daí, você pode adicionar, editar ou remover doações, ou clicar em **Importar CSV** para adicionar muitas doações de uma só vez a partir de uma planilha (veja [Importando Doações de um Arquivo CSV](recording-donations.md#importing-donations-from-a-csv-file)).
- **Editar os dados do lote** -- clique no botão **Editar** em uma linha de lote (ou em **Editar Lote** no topo de um lote aberto) para alterar o nome ou a data. Somente quem tem a permissão **Editar Doações** vê o botão **Excluir** ali; excluir um lote remove as doações que ele contém, e, se você o excluir pela própria página do lote, volta para a lista de Lotes.
- **Ordenar** -- use os cabeçalhos das colunas para ordenar os lotes por nome ou data.
- **Exportar** -- clique em **Exportar** no topo da página para baixar os lotes exibidos como planilha (CSV).
- **Eventos com falha** -- se o seu gateway de pagamento tiver registrado problemas, um botão **Eventos com falha** (com a quantidade de eventos não resolvidos) aparece no topo da página. Clique nele para mostrar ou ocultar a lista de eventos abaixo dos lotes.
- **Importar do Stripe** -- clique em **Importar transações do Stripe ausentes** no topo da página para abrir a ferramenta de [Importação do Stripe](stripe-import.md). O botão só aparece quando o gateway de doações da sua igreja é o Stripe.

## Quem Lançou Cada Doação {#who-entered-each-gift}

Cada doação lançada em um lote mostra **Lançado por** e o nome da pessoa abaixo do nome do doador, para que você saiba quem a lançou sem precisar de uma folha de assinaturas. O B1 registra isso automaticamente, com base em quem estiver conectado, e editar a doação depois não altera essa informação. As doações trazidas pela opção **Importar CSV** mostram a pessoa que executou a importação.

As doações feitas online, as lançadas pela ferramenta de [Importação do Stripe](stripe-import.md) e as lançadas antes de este recurso ser adicionado, em novembro de 2026, não mostram nome.

## Fechando e Reabrindo um Lote {#closing-and-reopening-a-batch}

Assim que um lote tiver sido contado e depositado, feche-o para que as doações permaneçam exatamente como estavam quando você o fechou.

1. Abra o lote.
2. Clique em **Fechar Lote** no topo da página.

O selo de situação ao lado do nome do lote muda de **Aberto** para **Fechado**, o lote mostra **Fechado** na coluna **Situação** da página de Lotes, e um aviso no topo do lote explica que ele está fechado. Enquanto um lote estiver fechado, quem tem a permissão **Lançar Doações** ainda pode visualizá-lo, mas não pode adicionar, editar ou excluir as doações dele nem alterar o nome ou a data do lote.

Para fazer alterações novamente, abra o lote e clique em **Reabrir Lote**. Novos lotes sempre começam abertos.

:::info
Somente quem tem a permissão **Editar Doações** vê os botões **Fechar Lote** e **Reabrir Lote**. Essas pessoas também podem alterar as doações de um lote fechado quando for necessário fazer uma correção, sem precisar reabri-lo.
:::

## Quem Pode Alterar um Lote {#who-can-change-a-batch}

Duas [permissões de função](../settings/roles-permissions.md) permitem que alguém trabalhe com lotes:

- **Editar Doações** -- acesso completo: adicionar e excluir lotes, fechá-los e reabri-los, e adicionar, editar ou excluir qualquer doação, esteja o lote aberto ou fechado.
- **Lançar Doações** -- para equipes de contagem e voluntários que lançam as ofertas. Eles podem adicionar lotes e adicionar, editar ou excluir doações, mas somente enquanto o lote estiver aberto. Não podem excluir lotes, fechá-los ou reabri-los, nem alterar doações recebidas pelas doações online.

Quem tem a permissão **Lançar Doações**, mas não tem **Visualizar Resumos de Doações**, vê **Doações** no menu do B1 Admin, que leva diretamente à página de Lotes. **Resumo**, **Fundos**, **Campanhas** e **Recibos de Doação** ficam ocultos para essa pessoa. Para abrir um lote e ver as doações nele, a função também precisa da permissão **Visualizar Doações**.

:::tip
Uma configuração comum é uma função "Equipe de Contagem" com **Lançar Doações** e **Visualizar Doações**, e um tesoureiro com **Editar Doações** que fecha cada lote depois que o depósito é conciliado.
:::

## Imprimindo um Lote {#printing-a-batch}

Abra um lote e clique em **Imprimir** acima da lista de doações para imprimir uma cópia em papel para a sua equipe de contagem ou para os seus registros de depósito. A impressão inclui:

- O cabeçalho da sua igreja -- o seu logotipo (o **Logotipo para Fundo Claro** de [Site > Aparência](../website/appearance.md), se você tiver enviado um) com o nome da igreja abaixo dele -- seguido do nome do lote e da data do lote
- Cada doação do lote, com o nome do doador, quem a lançou, a forma de pagamento, as observações, a data e o valor (doações reembolsadas aparecem riscadas e marcadas como reembolsadas)
- **Subtotais por Fundo** -- o total doado a cada fundo no lote
- **Total do Lote** -- o valor somado de todo o lote

O botão **Imprimir** só aparece depois que o lote tem pelo menos uma doação.

### Imprimindo Vários Lotes de Uma Vez {#printing-several-batches-at-once}

Para imprimir todos os lotes de um período de uma só vez -- por exemplo, todos os depósitos do mês passado -- clique em **Imprimir** no topo da página **Lotes**, ao lado de **Exportar**. Abre-se a página **Imprimir Lotes**, com uma **Data inicial** e uma **Data final** correspondentes aos lotes na tela: de 1º de janeiro a 31 de dezembro do ano escolhido, ou da data do lote mais antigo à do mais recente quando **Todos** estiver selecionado. Altere qualquer uma das datas para escolher outro intervalo.

Todos os lotes com data dentro do intervalo (incluindo as datas inicial e final) são impressos em ordem cronológica, um lote por página, usando o mesmo layout de uma impressão de lote único. Lotes sem doações ficam de fora, e se nenhum lote do intervalo tiver doações, você verá a mensagem "Nenhum lote com doações neste período." Clique em **Imprimir** para abrir a caixa de impressão do navegador, ou em **Fechar** para voltar à lista de lotes.

## Exportando um Lote para o QuickBooks Online {#exporting-a-batch-to-quickbooks-online}

Abra um lote e clique em **Exportar para o QuickBooks** para baixar o lote como um lançamento de diário que o QuickBooks Online pode importar (**Configurações > Importar Dados > Lançamentos de Diário**). O arquivo contém um débito em **Fundos Não Depositados** pelo total do lote e um crédito por fundo, usando o nome de cada fundo como nome da conta. Durante a importação, o QuickBooks pede que você associe esses nomes ao seu plano de contas; por isso, dê aos seus fundos o mesmo nome que o seu contador usa para as contas de receita, ou faça o mapeamento uma vez na importação.

:::tip
Dê nomes consistentes aos seus lotes para encontrá-los facilmente depois. Incluir a data e o tipo de coleta (por exemplo, "Manhã de Domingo - 2025-02-09") mantém a lista organizada à medida que ela cresce.
:::

## Próximos Passos {#next-steps}

Depois de criar um lote, veja [Registrando Doações](recording-donations.md) para aprender a adicionar doações individuais a ele. Você também pode [importar transações do Stripe](stripe-import.md) para criar lotes automaticamente a partir das doações online.
