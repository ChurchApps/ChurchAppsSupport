---
title: "Relatórios de Presença"
---

# Relatórios de Presença

<div class="article-intro">

O B1 Admin fornece três relatórios de presença para ajudá-lo a entender como as pessoas estão se engajando com seus serviços e grupos. Cada relatório oferece uma perspectiva diferente sobre seus dados de presença, desde tendências de alto nível até análises diárias.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Certifique-se de que a presença está sendo [rastreada consistentemente](../attendance/tracking-attendance.md) para seus serviços e grupos
- Certifique-se de que seus [grupos](../groups/creating-groups.md) e serviços estão configurados no B1 Admin
- Você precisa das [permissões](../settings/roles-permissions.md) apropriadas para acessar relatórios

</div>

## Tendência de Presença

O relatório Tendência de Presença mostra como a presença muda ao longo do tempo para seus serviços.

1. Vá diretamente para **admin.b1.church/reports/attendanceTrend** em seu navegador (relatórios não têm entrada no menu de navegação -- marcar o endereço é a maneira mais fácil de voltar a ele). O mesmo relatório também está na aba **Tendência de Presença** da página Presença.
2. Opcionalmente selecione um **Campus**, **Serviço**, **Horário do Serviço** ou **Grupo** para filtrar os resultados.
3. Defina a **Data de Início** e a **Data de Término**. Por padrão, o relatório cobre o ano passado, de um ano atrás até hoje, e a data final é incluída completamente. Clique em **Executar Relatório**.
4. O relatório exibe um gráfico de barras e uma tabela de visitas totais por semana. Cada semana é rotulada com a data do domingo daquela semana, e a coluna **Datas da Sessão** da tabela lista as datas reais naquela semana que tiveram presença (por exemplo, "27/9, 30/9").

Este relatório é útil para detectar padrões como quedas sazonais, tendências de crescimento ou o impacto de eventos especiais.

## Presença de Grupo

O relatório de Presença de Grupo mostra quem compareceu a cada sessão de grupo em um intervalo de datas.

1. Vá diretamente para **admin.b1.church/reports/groupAttendance** em seu navegador, ou abra a aba **Presença de Grupo** da página Presença.
2. Opcionalmente selecione um **Campus** e **Serviço**.
3. Defina a **Data de Início** e a **Data de Término**. Por padrão, o relatório cobre o último domingo até hoje, e a data final é incluída completamente.
4. Clique em **Executar Relatório**.

Os resultados são agrupados por data de sessão, depois horário do serviço, depois grupo, com as pessoas que compareceram listadas sob cada grupo. Os horários dos serviços, grupos e nomes são classificados alfabeticamente. Ao lado do nome de cada pessoa, a coluna **Entrada** mostra a hora em que sua presença foi registrada (em branco quando não há horário no arquivo) e a coluna **Status de Associação** mostra seu status, como Membro ou Visitante.

Para baixar uma planilha, clique em **Opções de Download** e escolha **Resumo**. O CSV contém:

- Uma linha por membro de cada grupo que se reuniu no intervalo de datas, classificado por grupo e depois nome.
- O nome da pessoa e o nome do grupo nas primeiras colunas.
- Uma coluna por sessão datada, nomeada com o serviço, horário do serviço e data (por exemplo, "Domingo - 9:00 AM (2026-09-27)"), com cada pessoa marcada como **presente** ou **ausente**.

Use este relatório para comparar presença entre grupos e identificar quais grupos estão crescendo ou precisam de atenção.

## Presença de Grupo Diária

O relatório de Presença de Grupo Diária fornece uma análise dia a dia dos dados de presença de seus grupos.

1. Vá diretamente para **admin.b1.church/reports/dailyGroupAttendance** em seu navegador.
2. Defina o **intervalo de datas** para o relatório.
3. Selecione o(s) **grupo(s)** que você deseja revisar.
4. O relatório mostra os números de presença para cada dia individual dentro do intervalo.

Este relatório fornece detalhes granulares, que é útil para entender a variação de semana para semana ou identificar dias específicos com presença incomumente alta ou baixa.

:::tip
Use o relatório Tendência de Presença para uma visão geral de alto nível e o relatório Presença de Grupo Diária quando você precisar investigar datas específicas.
:::

## Usos Práticos

- **Planejamento** -- Use as tendências de presença para planejar assentos, pessoal e recursos para os próximos serviços.
- **Alcance** -- Identifique os padrões de presença em declínio no início para que você possa acompanhar os membros.
- **Relatórios de diretoria** -- Inclua dados de presença em seus relatórios de liderança regulares para mostrar a saúde do ministério.
- **Avaliação de eventos** -- Compare a presença antes e depois de eventos especiais para medir seu impacto.

:::warning
Os dados de presença são registrados através de seus processos de entrada de grupo e serviço. Se a presença não estiver sendo rastreada consistentemente, seus relatórios não refletirão com precisão a participação real. Consulte [Rastreando Presença](../attendance/tracking-attendance.md) para instruções de configuração.
:::
