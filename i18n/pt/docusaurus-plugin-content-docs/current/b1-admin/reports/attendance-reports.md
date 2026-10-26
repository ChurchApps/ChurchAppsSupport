---
title: "Relatórios de presença"
---

# Relatórios de presença

<div class="article-intro">

O B1 Admin oferece três relatórios de presença para ajudar você a entender como as pessoas estão se engajando com os seus cultos e grupos. Cada relatório oferece uma perspectiva diferente dos seus dados de presença, de tendências gerais a detalhamentos diários.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Certifique-se de que a presença está sendo [registrada de forma consistente](../attendance/tracking-attendance.md) para os seus cultos e grupos
- Certifique-se de que os seus [grupos](../groups/creating-groups.md) e cultos estão configurados no B1 Admin
- Você precisa das [permissões](../settings/roles-permissions.md) adequadas para acessar os relatórios

</div>

## Tendência de presença

O relatório de Tendência de presença mostra como a presença muda ao longo do tempo nos seus cultos.

1. Acesse diretamente **admin.b1.church/reports/attendanceTrend** no seu navegador (os relatórios não têm entrada no menu de navegação — salvar o endereço nos favoritos é a forma mais fácil de voltar a ele). O mesmo relatório também está na página de Presença: clique em **Todos os anos** e depois escolha a aba **Tendência de presença**.
2. Opcionalmente, selecione um **Campus**, **Culto**, **Horário do culto** ou **Grupo** para filtrar os resultados.
3. Defina a **Data inicial** e a **Data final**. Por padrão, o relatório abrange o último ano, de um ano atrás até hoje, e a data final é incluída por completo. Clique em **Executar relatório**.
4. O relatório exibe um gráfico de barras e uma tabela com o total de visitas por semana. Cada semana é identificada pela data do domingo daquela semana, e a coluna **Datas das sessões** da tabela lista as datas reais dessa semana que tiveram presença (por exemplo, "9/27, 9/30").

Este relatório é útil para identificar padrões como quedas sazonais, tendências de crescimento ou o impacto de eventos especiais.

## Presença por grupo

O relatório de Presença por grupo mostra quem participou de cada sessão de grupo em um intervalo de datas.

1. Acesse diretamente **admin.b1.church/reports/groupAttendance** no seu navegador, ou, na página de Presença, clique em **Todos os anos** e escolha a aba **Presença por grupo**.
2. Opcionalmente, selecione um **Campus** e um **Culto**.
3. Defina a **Data inicial** e a **Data final**. Por padrão, o relatório abrange do último domingo até hoje, e a data final é incluída por completo.
4. Clique em **Executar relatório**.

Os resultados são agrupados por data da sessão, depois por horário do culto, depois por grupo, com as pessoas que participaram listadas abaixo de cada grupo. Horários de culto, grupos e nomes são ordenados em ordem alfabética. Ao lado do nome de cada pessoa, a coluna **Check-in** mostra o horário em que a presença foi registrada (em branco quando não há horário registrado) e a coluna **Situação de membro** mostra a situação dela, como Membro ou Visitante.

Para baixar uma planilha, clique em **Opções de download** e escolha **Resumo**. O CSV contém:

- Uma linha para cada membro de cada grupo que se reuniu no intervalo de datas, ordenada por grupo e depois por nome.
- O nome da pessoa e o nome do grupo nas primeiras colunas.
- Uma coluna para cada sessão com data, nomeada com o culto, o horário do culto e a data (por exemplo, "Domingo - 9:00 AM (2026-09-27)"), com cada pessoa marcada como **presente** ou **ausente**.

Use este relatório para comparar a presença entre grupos e identificar quais grupos estão crescendo ou precisam de atenção.

## Presença diária por grupo

O relatório de Presença diária por grupo (intitulado **Presença por grupo por dia**) apresenta a contagem dia a dia de quantas pessoas participaram de um grupo.

1. Acesse diretamente **admin.b1.church/reports/dailyGroupAttendance** no seu navegador.
2. Use as listas suspensas de **Campus**, **Culto** e **Horário do culto** para restringir a lista e depois escolha o **Grupo** que você quer analisar.
3. Execute o relatório. Ele lista todos os dias em que o grupo se reuniu, do mais antigo para o mais recente, com a **Data** e o número de **Participantes** registrados naquele dia.

Este relatório oferece um detalhamento granular, útil para entender variações de uma semana para outra ou identificar dias específicos com presença especialmente alta ou baixa.

:::tip
Use o relatório de Tendência de presença para uma visão geral e o relatório de Presença diária por grupo quando precisar detalhar datas específicas.
:::

## Usos práticos

- **Planejamento** -- Use as tendências de presença para planejar assentos, equipes e recursos dos próximos cultos.
- **Alcance** -- Identifique cedo os padrões de queda na presença para poder fazer um acompanhamento com os membros.
- **Relatórios para a diretoria** -- Inclua os dados de presença nos seus relatórios regulares de liderança para mostrar a saúde do ministério.
- **Avaliação de eventos** -- Compare a presença antes e depois de eventos especiais para medir o seu impacto.

:::warning
Os dados de presença são registrados pelos processos de check-in dos seus grupos e cultos. Se a presença não estiver sendo registrada de forma consistente, os seus relatórios não refletirão com precisão a participação real. Veja [Acompanhando a presença](../attendance/tracking-attendance.md) para as instruções de configuração.
:::
