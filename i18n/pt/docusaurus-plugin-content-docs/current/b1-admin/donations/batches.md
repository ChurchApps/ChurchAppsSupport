---
title: "Lotes de Doações"
---

# Lotes de Doações

<div class="article-intro">

Os lotes agrupam suas doações para facilitar o acompanhamento e a conciliação. Um lote típico representa uma única coleta, como a oferta de um domingo ou de um evento especial. Usar lotes ajuda você a se manter organizado e torna simples verificar se os seus registros conferem com os depósitos realizados.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Certifique-se de ter [configurado seus fundos](funds.md) para que estejam disponíveis ao registrar doações
- Você precisará da permissão **Ver Resumos de Doações**, **Editar Doações** ou **Inserir Doações** para ver a página de Lotes (veja [Quem Pode Alterar um Lote](#who-can-change-a-batch))

</div>

## A Página de Lotes

Ao navegar até **Doações > Lotes**, você verá uma lista dos seus lotes. Cada linha exibe:

- **Nome** -- o rótulo que você deu ao lote
- **Data** -- a data da coleta
- **Doações** -- o número de doações individuais no lote
- **Total** -- o valor total em dinheiro
- **Status** -- **Aberto** ou **Fechado** (veja [Fechando e Reabrindo um Lote](#closing-and-reopening-a-batch))

Acima da lista, botões de ano permitem mostrar apenas os lotes de um ano, ou **Todos** os lotes. Um resumo em uma linha mostra o número de lotes, o número de contribuições e o valor total dos lotes exibidos.

## Criando um Novo Lote

1. Clique em **Adicionar Lote** no topo da página.
2. Digite um nome descritivo (por exemplo, "Oferta de Domingo - 9 de fev").
3. Selecione a data da coleta.
4. Clique em **Salvar**.

Seu novo lote aparece na lista, pronto para você adicionar doações.

## Trabalhando com Lotes

- **Ver doações** -- clique no nome de um lote para abri-lo e ver todas as doações individuais que ele contém. A partir daí, você pode adicionar, editar ou remover doações.
- **Editar detalhes do lote** -- clique no botão **Editar** em uma linha de lote para alterar o nome ou a data. Somente pessoas com a permissão **Editar Doações** podem excluir um lote.
- **Ordenar** -- use os cabeçalhos das colunas para ordenar os lotes por nome ou data.
- **Exportar** -- clique em **Exportar** no topo da página para baixar os lotes exibidos como planilha (CSV).
- **Eventos com falha** -- se o seu gateway de pagamento tiver relatado problemas, um botão **Eventos com falha** (com o número de eventos não resolvidos) aparece no topo da página. Clique nele para mostrar ou ocultar a lista de eventos abaixo dos lotes.
- **Importar do Stripe** -- clique em **Importar transações do Stripe ausentes** no topo da página para abrir a ferramenta de [Importação do Stripe](stripe-import.md).

## Fechando e Reabrindo um Lote {#closing-and-reopening-a-batch}

Depois que um lote tiver sido contado e depositado, feche-o para que as doações permaneçam exatamente como estavam quando você o fechou.

1. Abra o lote.
2. Clique em **Fechar Lote** no topo da página.

O chip de status ao lado do nome do lote muda de **Aberto** para **Fechado**, o lote mostra **Fechado** na coluna **Status** da página de Lotes, e um aviso no topo do lote explica que ele está fechado. Enquanto um lote estiver fechado, as pessoas com a permissão **Inserir Doações** ainda podem visualizá-lo, mas não podem adicionar, editar ou excluir as suas doações nem alterar o nome ou a data do lote.

Para fazer alterações novamente, abra o lote e clique em **Reabrir Lote**. Novos lotes sempre começam abertos.

:::info
Somente pessoas com a permissão **Editar Doações** veem os botões **Fechar Lote** e **Reabrir Lote**. Elas também podem alterar doações em um lote fechado, caso seja necessária uma correção, sem precisar reabri-lo.
:::

## Quem Pode Alterar um Lote {#who-can-change-a-batch}

Duas [permissões de função](../settings/roles-permissions.md) permitem que alguém trabalhe com lotes:

- **Editar Doações** -- acesso total: adicionar e excluir lotes, fechá-los e reabri-los, e adicionar, editar ou excluir qualquer doação, esteja o lote aberto ou fechado.
- **Inserir Doações** -- para equipes de contagem e voluntários que lançam as ofertas. Podem adicionar lotes e adicionar, editar ou excluir doações, mas apenas enquanto o lote estiver aberto. Não podem excluir lotes, fechá-los ou reabri-los, nem alterar contribuições recebidas pela oferta online.

Quem tem **Inserir Doações**, mas não **Ver Resumos de Doações**, vê **Doações** no menu do B1 Admin, que leva diretamente à página de Lotes. **Resumo**, **Fundos**, **Campanhas** e **Extratos de Contribuição** ficam ocultos para essa pessoa. Para abrir um lote e ver as doações nele, a função também precisa da permissão **Ver Doações**.

:::tip
Uma configuração comum é uma função "Equipe de Contagem" com **Inserir Doações** e **Ver Doações**, e um tesoureiro com **Editar Doações** que fecha cada lote depois que o depósito é conciliado.
:::

## Imprimindo um Lote

Abra um lote e clique em **Imprimir** acima da lista de doações para imprimir uma cópia em papel para a sua equipe de contagem ou para os registros de depósito. A impressão inclui:

- O nome da sua igreja, o nome do lote e a data do lote
- Cada doação do lote, com o nome do doador, o método, as observações, a data e o valor (contribuições reembolsadas são riscadas e marcadas como reembolsadas)
- **Subtotais por Fundo** -- o total doado a cada fundo no lote
- **Total do Lote** -- o valor combinado de todo o lote

O botão **Imprimir** só aparece quando o lote tem pelo menos uma doação.

### Imprimindo Vários Lotes de Uma Vez

Para imprimir todos os lotes de um período de uma só vez -- por exemplo, todos os depósitos do mês passado -- clique em **Imprimir** no topo da página **Lotes**, ao lado de **Exportar**. A página **Imprimir Lotes** é aberta com uma **Data Inicial** e uma **Data Final** que, por padrão, cobrem os últimos 30 dias. Altere qualquer uma das datas para escolher outro intervalo.

Cada lote com data dentro do intervalo (incluindo as datas inicial e final) é impresso em ordem cronológica, um lote por página, usando o mesmo layout de uma impressão de lote único. Lotes sem doações ficam de fora, e, se nenhum dos lotes do intervalo tiver doações, você verá a mensagem "Nenhum lote com doações neste intervalo de datas." Clique em **Imprimir** para abrir a caixa de impressão do seu navegador, ou em **Fechar** para voltar à lista de lotes.

## Exportando um Lote para o QuickBooks Online

Abra um lote e clique em **Exportar para o QuickBooks** para baixar o lote como um lançamento contábil que o QuickBooks Online pode importar (**Configurações > Importar Dados > Lançamentos Contábeis**). O arquivo contém um débito em **Undeposited Funds** pelo total do lote e um crédito por fundo, usando o nome de cada fundo como nome da conta. Durante a importação, o QuickBooks pede que você associe esses nomes ao seu plano de contas, então nomeie seus fundos da mesma forma que o seu contador nomeia as contas de receita, ou faça o mapeamento uma vez na importação.

:::tip
Nomeie os seus lotes de forma consistente para que sejam fáceis de encontrar depois. Incluir a data e o tipo de coleta (por exemplo, "Culto da Manhã de Domingo - 2025-02-09") mantém a sua lista organizada conforme ela cresce.
:::

## Próximos Passos

Depois de ter um lote, veja [Registrando Doações](recording-donations.md) para aprender a adicionar doações individuais a ele. Você também pode [importar transações do Stripe](stripe-import.md) para criar lotes automaticamente a partir das ofertas online.
