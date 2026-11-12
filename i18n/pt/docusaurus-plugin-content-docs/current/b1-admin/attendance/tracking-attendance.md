---
title: "Acompanhamento de Presença"
description: "Analise as tendências de presença, filtre os relatórios por unidade, culto ou grupo e exporte a presença dos grupos a partir da página de Presença no B1 Admin."
---

# Acompanhamento de Presença

<div class="article-intro">

Depois que suas unidades, horários de culto e grupos estiverem configurados, o B1 Admin facilita a análise dos dados de presença e a identificação de tendências. A página de Presença abre com um resumo da presença desta semana, e os seus relatórios **Todos os anos** oferecem duas visões principais -- a aba **Tendência de Presença** para as tendências de toda a igreja e a aba **Presença por Grupo** para o detalhe por grupo -- além de uma aba **Tendência de Contagem Total** para os [totais de contagem](headcount-entry.md). Use essas ferramentas para entender padrões de crescimento, identificar queda de engajamento e tomar decisões baseadas em dados para a sua igreja.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- A estrutura de presença precisa estar configurada com pelo menos uma unidade e um horário de culto. Veja [Configuração de Presença](setup.md) se você ainda não fez isso.
- Os dados de presença precisam ser registrados antes que os relatórios mostrem resultados. Os dados podem vir do [lançamento manual](recording-attendance.md) ou do [autoatendimento](check-in.md).

</div>

## Visualizando as Tendências de Presença {#viewing-attendance-trends}

1. Abra o **B1 Admin**, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo), expanda **Pessoas** e clique em **Presença**.
2. Clique em **Todos os anos** na coluna da esquerda. A aba **Tendência de Presença** vem selecionada por padrão.
3. O relatório é executado automaticamente quando a aba é aberta, mostrando a presença total de cada semana.

:::tip
Para uma visão rápida da semana atual, a página principal de Presença mostra quantas pessoas estão na sala nesta semana, a divisão por sala (grupo), os visitantes e um gráfico de barras de 13 semanas dos check-ins -- sem precisar de relatório.
:::

## Filtrando os Dados {#filtering-your-data}

Use os filtros na caixa **Filtrar relatório** para restringir os resultados e, em seguida, clique em **Executar relatório**:

- **Unidade** -- selecione uma unidade para ver a presença somente desse local.
- **Culto** -- limita o relatório a um culto.
- **Horário de culto** -- escolha um horário de culto para detalhar um encontro específico.
- **Grupo** -- mostra a presença de um único grupo.
- **Data inicial** e **Data final** -- o período a incluir. Por padrão, o relatório abrange o último ano, de um ano atrás até hoje, e a data final é incluída por completo.

O relatório mostra um gráfico de barras e uma tabela com o total de presenças por semana. Use o ícone de impressão para imprimi-lo ou **Opções de download** para salvar os dados. Cada semana é identificada pela data do domingo daquela semana. A tabela também tem uma coluna **Datas das sessões** com as datas reais, dentro daquela semana, que tiveram presença (por exemplo, "27/9, 30/9"), para que você veja quando um encontro de meio de semana é contado na mesma semana do domingo.

:::info
Os relatórios são executados automaticamente sempre que você abre a aba Tendência de Presença, então você sempre verá números atualizados sem precisar clicar em um botão de atualização.
:::

## Presença por Grupo {#group-attendance}

A aba **Presença por Grupo** mostra quem esteve presente em cada sessão de grupo. Isso é útil quando você quer acompanhar uma turma específica, uma equipe de ministério ou um pequeno grupo, em vez de olhar apenas os números gerais dos cultos.

1. Nos relatórios **Todos os anos**, selecione a aba **Presença por Grupo**.
2. Opcionalmente, escolha uma **Unidade** e um **Culto**.
3. Defina a **Data inicial** e a **Data final**. Por padrão, o relatório abrange do último domingo até hoje.
4. Clique em **Executar relatório**.

Os resultados são agrupados por data da sessão e, em seguida, por horário de culto e grupo, com as pessoas que estiveram presentes listadas em cada grupo. Horários de culto, grupos e nomes são ordenados em ordem alfabética, para que cada cabeçalho apareça uma única vez. A linha de cada pessoa também mostra uma coluna **Check-in feito** com o horário em que a presença foi registrada (em branco quando não há horário registrado) e uma coluna **Situação de membro** (por exemplo, Membro ou Visitante), para que você identifique visitantes de relance.

Para baixar os dados, clique em **Opções de download** e escolha **Resumo**. O CSV tem uma linha por integrante do grupo, ordenada por grupo e depois por nome, e uma coluna para cada sessão datada do período (por exemplo, "Domingo - 9:00 (2026-09-27)") marcada como **presente** ou **ausente**.

:::tip
A presença por grupo é especialmente valiosa para líderes de [pequenos grupos](../groups/creating-groups.md) que querem acompanhar o engajamento dentro do grupo ao longo do tempo.
:::

## Dicas para Usar os Dados de Presença {#tips-for-using-attendance-data}

- Analise as tendências mensalmente para identificar cedo os padrões sazonais.
- Compare os dados por unidade para entender quais locais estão crescendo.
- Use os relatórios por grupo para acompanhar os [grupos](../groups/group-members.md) que apresentam queda de presença.
- Combine as informações de presença com a ferramenta de [Pesquisa com IA](../people/ai-search.md) para encontrar pessoas que não frequentam há algum tempo.

## Páginas Relacionadas {#related-pages}

- [Registro de Presença](recording-attendance.md) -- lançar manualmente a presença de uma sessão de grupo
- [Lançamento de Contagem Total e Tendência](headcount-entry.md) -- uma alternativa mais simples de contagem total, com seu próprio gráfico de tendência semanal
- [Check-In](check-in.md) -- configurar o autoatendimento para que a presença seja registrada automaticamente
