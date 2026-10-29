---
title: "Relatórios de Presença"
---

# Relatórios de Presença

<div class="article-intro">

O B1 Admin oferece três relatórios de presença para ajudar você a entender como as pessoas estão participando dos seus cultos e grupos. Cada relatório oferece uma perspectiva diferente dos dados de presença, de tendências gerais a detalhamentos diários.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Certifique-se de que a presença está sendo [registrada de forma consistente](../attendance/tracking-attendance.md) para os seus cultos e grupos
- Verifique se os seus [grupos](../groups/creating-groups.md) e cultos estão configurados no B1 Admin
- Você precisa das [permissões](../settings/roles-permissions.md) adequadas para acessar os relatórios

</div>

## Tendência de Presença

O relatório de Tendência de Presença mostra como a presença muda ao longo do tempo nos seus cultos.

1. Acesse diretamente **admin.b1.church/reports/attendanceTrend** no seu navegador (os relatórios não têm entrada no menu de navegação -- salvar o endereço nos favoritos é a forma mais fácil de voltar a ele). O mesmo relatório também está na página Presença: clique em **Todos os anos** e escolha a aba **Tendência de Presença**.
2. Opcionalmente, selecione um **Campus**, **Culto**, **Horário de Serviço** ou **Grupo** para filtrar os resultados.
3. Defina a **Data inicial** e a **Data final**. Por padrão, o relatório abrange o último ano, de um ano atrás até hoje, e a data final é incluída por completo. Clique em **Gerar relatório**.
4. O relatório exibe um gráfico de barras e uma tabela com o total de visitas por semana. Cada semana é identificada pela data do domingo daquela semana, e a coluna **Datas das sessões** da tabela lista as datas reais dentro daquela semana que tiveram presença (por exemplo, "27/9, 30/9").

Este relatório é útil para identificar padrões como quedas sazonais, tendências de crescimento ou o impacto de eventos especiais.

## Presença por Grupo

O relatório de Presença por Grupo mostra quem participou de cada sessão de grupo em um intervalo de datas.

1. Acesse diretamente **admin.b1.church/reports/groupAttendance** no seu navegador, ou, na página Presença, clique em **Todos os anos** e escolha a aba **Presença por Grupo**.
2. Opcionalmente, selecione um **Campus** e um **Culto**.
3. Defina a **Data inicial** e a **Data final**. Por padrão, o relatório abrange do último domingo até hoje, e a data final é incluída por completo.
4. Clique em **Gerar relatório**.

Os resultados são agrupados por data da sessão, depois por horário de serviço, depois por grupo, com as pessoas que compareceram listadas abaixo de cada grupo. Horários de serviço, grupos e nomes são ordenados em ordem alfabética. Ao lado do nome de cada pessoa, a coluna **Check-in** mostra o horário em que a presença foi registrada (em branco quando não há horário registrado) e a coluna **Status de membro** mostra a situação dela, como Membro ou Visitante. Sessões de grupos que não se reúnem em um horário de serviço também são incluídas; elas aparecem sem horário de serviço.

Para baixar uma planilha, clique em **Opções de download** e escolha **Resumo**. O CSV contém:

- Uma linha por membro de cada grupo que se reuniu no intervalo de datas, ordenada por grupo e depois por nome.
- O nome da pessoa e o nome do grupo nas primeiras colunas.
- Uma coluna por sessão datada, nomeada com o culto, o horário de serviço e a data (por exemplo, "Domingo - 9h00 (2026-09-27)"), com cada pessoa marcada como **presente** ou **ausente**. Uma sessão sem horário de serviço é nomeada apenas pela data.

Use este relatório para comparar a presença entre grupos e identificar quais grupos estão crescendo ou precisam de atenção.

## Presença Diária por Grupo

O relatório de Presença Diária por Grupo (intitulado **Presença do grupo por dia**) mostra, dia a dia, quantas pessoas participaram de um grupo.

1. Acesse diretamente **admin.b1.church/reports/dailyGroupAttendance** no seu navegador.
2. Use os menus **Campus**, **Culto** e **Horário de Serviço** para restringir a lista e depois escolha o **Grupo** que deseja analisar.
3. Gere o relatório. Ele lista cada dia em que o grupo se reuniu, do mais antigo para o mais recente, com a **Data** e o número de **Participantes** registrados naquele dia.

Este relatório oferece um detalhe granular, útil para entender variações de uma semana para outra ou para identificar dias específicos com presença excepcionalmente alta ou baixa.

:::tip
Use o relatório de Tendência de Presença para uma visão geral e o relatório de Presença Diária por Grupo quando precisar investigar datas específicas.
:::

## Usos Práticos

- **Planejamento** -- use as tendências de presença para planejar a disposição dos assentos, a escala de equipes e os recursos dos próximos cultos.
- **Alcance** -- identifique cedo padrões de queda na presença para poder acompanhar os membros.
- **Relatórios para a diretoria** -- inclua dados de presença nos seus relatórios regulares de liderança para mostrar a saúde dos ministérios.
- **Avaliação de eventos** -- compare a presença antes e depois de eventos especiais para medir o impacto deles.

:::warning
Os dados de presença são registrados pelos processos de check-in dos seus grupos e cultos. Se a presença não for controlada de forma consistente, os relatórios não refletirão com precisão a participação real. Consulte [Rastreamento de Presença](../attendance/tracking-attendance.md) para as instruções de configuração.
:::
