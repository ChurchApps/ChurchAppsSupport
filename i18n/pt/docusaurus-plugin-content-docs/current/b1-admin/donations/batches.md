---
title: "Lotes de Doações"
---

# Lotes de Doações

<div class="article-intro">

Lotes agrupam suas doações juntas para rastreamento e reconciliação mais fáceis. Um lote típico representa uma única coleta, como uma oferta de domingo ou um evento especial. O uso de lotes ajuda você a se manter organizado e torna simples verificar se seus registros correspondem aos depósitos reais.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Certifique-se de ter [configurado seus fundos](funds.md) para que estejam disponíveis ao registrar doações
- Você precisará de acesso à seção **Doações** em B1 Admin

</div>

## A Página de Lotes

Quando você navega para **Doações > Lotes**, você verá uma lista de todos os seus lotes. Cada linha exibe:

- **Nome** -- o rótulo que você deu ao lote
- **Data** -- a data da coleta
- **Doações** -- o número de doações individuais no lote
- **Total** -- o valor em dólares combinado

O cabeçalho no topo mostra estatísticas resumidas incluindo o número total de lotes, o número total de doações em todos os lotes, e o valor em dólares geral.

## Criando um Novo Lote

1. Clique em **Adicionar Lote** no topo da página.
2. Digite um nome descritivo (ex: "Oferta de Domingo - 9 de Fev").
3. Selecione a data da coleta.
4. Clique em **Salvar**.

Seu novo lote aparece na lista, pronto para você adicionar doações.

## Trabalhando com Lotes

- **Ver doações** -- clique em um nome de lote para abri-lo e ver todas as doações individuais que contém. De lá você pode adicionar, editar ou remover doações.
- **Editar detalhes do lote** -- clique no botão **Editar** em uma linha de lote para alterar seu nome ou data.
- **Ordenar** -- use os cabeçalhos de coluna para ordenar lotes por nome ou data.
- **Exportar** -- clique em **Exportar** para baixar sua lista de lotes como uma planilha (CSV).

## Imprimindo um Lote

Abra um lote e clique no ícone **Imprimir** (impressora) no topo da lista de doações para imprimir uma cópia em papel para sua equipe de contagem ou registros de depósito. O impresso inclui:

- O nome da sua igreja, o nome do lote e a data do lote
- Cada doação no lote, com o nome do doador, método, notas, data e valor (doações reembolsadas são riscadas e marcadas como reembolsadas)
- **Subtotais de Fundos** -- o total dado a cada fundo no lote
- **Total do Lote** -- o valor combinado para o lote inteiro

O ícone de Imprimir só aparece uma vez que o lote tem pelo menos uma doação.

### Imprimindo Vários Lotes de Uma Vez

Para imprimir todos os lotes de um período de uma só vez -- por exemplo, todos os depósitos do mês passado -- clique no ícone **Imprimir** (impressora) no cabeçalho da lista **Lotes**, ao lado de **Exportar**. A página **Imprimir Lotes** abre com uma **Data Inicial** e uma **Data Final** que, por padrão, cobrem os últimos 30 dias. Altere qualquer uma das datas para escolher um intervalo diferente.

Todos os lotes com data dentro do intervalo (incluindo as datas inicial e final) são impressos em ordem de data, um lote por página, usando o mesmo layout da impressão de um único lote. Lotes sem doações ficam de fora, e se nenhum dos lotes do intervalo tiver doações você verá "Nenhum lote com doações neste intervalo de datas." Clique em **Imprimir** para abrir a caixa de diálogo de impressão do seu navegador, ou em **Fechar** para voltar à lista de lotes.

## Exportando um Lote para QuickBooks Online

Abra um lote e clique em **Exportar para QuickBooks** para baixar o lote como uma entrada de diário que o QuickBooks Online pode importar (**Configurações > Importar Dados > Entradas de Diário**). O arquivo contém um débito para **Fundos Não Depositados** para o total do lote e um crédito por fundo, usando o nome de cada fundo como o nome da conta. O QuickBooks solicita que você corresponda esses nomes ao seu plano de contas durante a importação, então nomeie seus fundos da maneira que seu contador nomeia as contas de renda, ou mapeie-os uma vez na importação.

:::tip
Nomeie seus lotes consistentemente para que sejam fáceis de encontrar depois. Incluindo a data e tipo de coleta (ex: "Domingo AM - 2025-02-09") mantém sua lista organizada conforme cresce.
:::

## Próximas Etapas

Uma vez que você tem um lote, veja [Registrando Doações](recording-donations.md) para aprender como adicionar doações individuais a ele. Você também pode [importar transações Stripe](stripe-import.md) para criar automaticamente lotes de doações online.
